/**
 * Pure business logic for Phishing Awareness Training.
 * Decoupled from React UI for fast, deterministic unit testing.
 */

export interface ParsedUrlAnalysis {
  originalInput: string;
  protocol: string;
  hostname: string;
  subdomain: string;
  registeredDomain: string;
  tld: string;
  path: string;
  isHttps: boolean;
  riskLevel: 'safe' | 'warning' | 'danger';
  riskScore: number; // 0 (extreme danger) to 100 (safe)
  flags: Array<{
    id: string;
    title: string;
    description: string;
    severity: 'danger' | 'warning' | 'info';
  }>;
}

const COMMON_TARGETED_BRANDS = [
  'paypal',
  'microsoft',
  'google',
  'apple',
  'amazon',
  'facebook',
  'netflix',
  'bankofamerica',
  'chase',
  'wellsfargo',
  'instagram',
  'whatsapp',
  'twitter',
  'github',
];

const SUSPICIOUS_TLDS = ['xyz', 'top', 'ru', 'tk', 'ml', 'ga', 'cf', 'gq', 'zip', 'mov', 'click', 'work', 'loan'];

export function parseDomainUrl(input: string): ParsedUrlAnalysis {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      originalInput: '',
      protocol: 'none',
      hostname: '',
      subdomain: '',
      registeredDomain: '',
      tld: '',
      path: '',
      isHttps: false,
      riskLevel: 'safe',
      riskScore: 100,
      flags: [],
    };
  }

  let formatted = trimmed;
  if (!/^https?:\/\//i.test(formatted)) {
    formatted = 'http://' + formatted;
  }

  let parsed: URL;
  try {
    parsed = new URL(formatted);
  } catch {
    return {
      originalInput: trimmed,
      protocol: 'invalid',
      hostname: trimmed,
      subdomain: '',
      registeredDomain: trimmed,
      tld: '',
      path: '',
      isHttps: false,
      riskLevel: 'danger',
      riskScore: 10,
      flags: [
        {
          id: 'invalid-url',
          title: 'Malformed Address',
          description: 'The address format is invalid and could be an obfuscated exploit.',
          severity: 'danger',
        },
      ],
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const protocol = parsed.protocol.replace(':', '');
  const isHttps = protocol === 'https';
  const path = parsed.pathname + parsed.search;

  const parts = hostname.split('.');
  let tld = '';
  let registeredDomain = '';
  let subdomain = '';

  if (parts.length >= 2) {
    tld = parts[parts.length - 1];
    if (parts.length >= 3 && ['co', 'com', 'org', 'net', 'edu', 'gov'].includes(parts[parts.length - 2])) {
      tld = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
      registeredDomain = `${parts[parts.length - 3]}.${tld}`;
      subdomain = parts.slice(0, parts.length - 3).join('.');
    } else {
      registeredDomain = `${parts[parts.length - 2]}.${tld}`;
      subdomain = parts.slice(0, parts.length - 2).join('.');
    }
  } else {
    registeredDomain = hostname;
  }

  const flags: ParsedUrlAnalysis['flags'] = [];
  let score = 100;

  // 1. Protocol check
  if (!isHttps) {
    flags.push({
      id: 'no-https',
      title: 'Unencrypted HTTP Connection',
      description: 'Credentials entered here travel in plaintext and can be intercepted.',
      severity: 'warning',
    });
    score -= 20;
  }

  // 2. IP Address as host
  const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  if (isIp) {
    flags.push({
      id: 'ip-address',
      title: 'Raw IP Address Used',
      description: 'Legitimate services use branded domain names, not direct IP addresses.',
      severity: 'danger',
    });
    score -= 40;
  }

  // 3. Subdomain brand spoofing
  const regDomainName = registeredDomain.split('.')[0] || '';
  for (const brand of COMMON_TARGETED_BRANDS) {
    if (subdomain.includes(brand) && !regDomainName.includes(brand)) {
      flags.push({
        id: `brand-subdomain-${brand}`,
        title: `Deceptive Subdomain (${brand})`,
        description: `The attacker placed '${brand}' in the subdomain to trick you. The REAL domain is '${registeredDomain}'.`,
        severity: 'danger',
      });
      score -= 50;
      break;
    }
  }

  // 4. Look-alike characters
  const typosquatMap: Record<string, string[]> = {
    paypal: ['paypa1', 'pay-pal', 'paypa-l', 'paypall'],
    microsoft: ['micros0ft', 'micro-soft', 'm1crosoft'],
    google: ['goog1e', 'g00gle', 'go-ogle'],
    apple: ['app1e', 'app-le'],
    amazon: ['amaz0n', 'amaz-on'],
  };

  for (const [realBrand, fakes] of Object.entries(typosquatMap)) {
    for (const fake of fakes) {
      if (regDomainName.includes(fake)) {
        flags.push({
          id: `typosquat-${fake}`,
          title: `Look-alike Brand Typosquatting (${fake})`,
          description: `Swapped characters (e.g. number 1 for letter l, or 0 for o) mimicking '${realBrand}'.`,
          severity: 'danger',
        });
        score -= 50;
        break;
      }
    }
  }

  // 5. Suspicious TLD check
  if (SUSPICIOUS_TLDS.some((stld) => tld.endsWith(stld))) {
    flags.push({
      id: 'suspicious-tld',
      title: `High-Risk Top Level Domain (.${tld})`,
      description: `The .${tld} extension is frequently favored by mass phishing campaigns.`,
      severity: 'warning',
    });
    score -= 25;
  }

  // 6. Excessive hyphens
  const hyphenCount = (regDomainName.match(/-/g) || []).length;
  if (hyphenCount >= 2) {
    flags.push({
      id: 'excessive-hyphens',
      title: 'Excessive Hyphens in Domain',
      description: 'Phishers often string words together (e.g., brand-secure-login-verify).',
      severity: 'warning',
    });
    score -= 15;
  }

  score = Math.max(0, Math.min(100, score));

  let riskLevel: ParsedUrlAnalysis['riskLevel'] = 'safe';
  if (score < 50 || flags.some((f) => f.severity === 'danger')) {
    riskLevel = 'danger';
  } else if (score < 80 || flags.some((f) => f.severity === 'warning')) {
    riskLevel = 'warning';
  }

  return {
    originalInput: trimmed,
    protocol,
    hostname,
    subdomain: subdomain || '(none)',
    registeredDomain,
    tld: `.${tld}`,
    path: path || '/',
    isHttps,
    riskLevel,
    riskScore: score,
    flags,
  };
}

export interface QuizEvaluation {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  statusLevel: 'expert' | 'proficient' | 'needs_practice';
  title: string;
  feedback: string;
}

export function calculateQuizResult(score: number, total: number): QuizEvaluation {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 75;

  if (score === total) {
    return {
      score,
      total,
      percentage,
      passed: true,
      statusLevel: 'expert',
      title: 'Cyber Defense Specialist',
      feedback: 'Outstanding! You identified all phishing vectors, deceptive domains, and psychological traps perfectly.',
    };
  }

  if (passed) {
    return {
      score,
      total,
      percentage,
      passed: true,
      statusLevel: 'proficient',
      title: 'Phishing Aware Defender',
      feedback: 'Good job! You have solid awareness of deceptive tactics. Review the questions you missed for total mastery.',
    };
  }

  return {
    score,
    total,
    percentage,
    passed: false,
    statusLevel: 'needs_practice',
    title: 'Vulnerable to Phishing Bait',
    feedback: 'Phishers exploit subtle details. Re-read the email red flags and domain rules before attempting again.',
  };
}

export interface ChecklistStatus {
  completedCount: number;
  totalCount: number;
  percentage: number;
  level: string;
}

export function calculateChecklistProgress(completedCount: number, totalCount: number): ChecklistStatus {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  let level = 'Vulnerable';

  if (percentage === 100) {
    level = 'Fortified & Resilient';
  } else if (percentage >= 75) {
    level = 'High Security Posture';
  } else if (percentage >= 50) {
    level = 'Moderate Defense';
  } else if (percentage > 0) {
    level = 'Basic Measures Active';
  }

  return {
    completedCount,
    totalCount,
    percentage,
    level,
  };
}
