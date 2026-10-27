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
    titleEn: string;
    titleAr: string;
    descriptionEn: string;
    descriptionAr: string;
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
          titleEn: 'Malformed Address',
          titleAr: 'عنوان غير صالح',
          descriptionEn: 'The address format is invalid and could be an obfuscated exploit.',
          descriptionAr: 'صيغة العنوان غير صالحة وقد تكون محاولة تمويه خبيثة.',
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
    // Check for two-part TLD like .co.uk
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
      titleEn: 'Unencrypted HTTP Connection',
      titleAr: 'اتصال غير مشفر (HTTP)',
      descriptionEn: 'Credentials entered here travel in plaintext and can be intercepted.',
      descriptionAr: 'البيانات المرسلة عبر هذا الرابط غير مشفرة ويمكن اعتراضها بسهولة.',
      severity: 'warning',
    });
    score -= 20;
  }

  // 2. IP Address as host
  const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  if (isIp) {
    flags.push({
      id: 'ip-address',
      titleEn: 'Raw IP Address Used',
      titleAr: 'استخدام عنوان IP مباشر',
      descriptionEn: 'Legitimate services use branded domain names, not direct IP addresses.',
      descriptionAr: 'الخدمات الرسمية تستخدم نطاقات معتمدة بدلاً من أرقام IP المباشرة.',
      severity: 'danger',
    });
    score -= 40;
  }

  // 3. Subdomain brand spoofing (brand appears in subdomain, but not in registered domain)
  const regDomainName = registeredDomain.split('.')[0] || '';
  for (const brand of COMMON_TARGETED_BRANDS) {
    if (subdomain.includes(brand) && !regDomainName.includes(brand)) {
      flags.push({
        id: `brand-subdomain-${brand}`,
        titleEn: `Deceptive Subdomain (${brand})`,
        titleAr: `اسم علامة تجارية في النطاق الفرعي (${brand})`,
        descriptionEn: `The attacker placed '${brand}' in the subdomain to trick you. The REAL domain is '${registeredDomain}'.`,
        descriptionAr: `قام المهاجم بوضع '${brand}' في النطاق الفرعي لخداعك، بينما النطاق الفعلي الحقيقي هو '${registeredDomain}'.`,
        severity: 'danger',
      });
      score -= 50;
      break;
    }
  }

  // 4. Look-alike characters (homoglyphs / typosquatting like paypa1, micros0ft, goog1e)
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
          titleEn: `Look-alike Brand Typosquatting (${fake})`,
          titleAr: `تشابه مضلل في الأحرف (${fake})`,
          descriptionEn: `Swapped characters (e.g. number 1 for letter l, or 0 for o) mimicking '${realBrand}'.`,
          descriptionAr: `استبدال أحرف متطابقة بصرياً (مثل الرقم 1 بدلاً من حرف l) لانتحال '${realBrand}'.`,
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
      titleEn: `High-Risk Top Level Domain (.${tld})`,
      titleAr: `امتداد نطاق عالي الخطورة (.${tld})`,
      descriptionEn: `The .${tld} extension is frequently favored by mass phishing campaigns.`,
      descriptionAr: `الامتداد .${tld} يُستخدم بكثرة في حملات التصيد الجماعية والمواقع الاحتيالية.`,
      severity: 'warning',
    });
    score -= 25;
  }

  // 6. Excessive hyphens
  const hyphenCount = (regDomainName.match(/-/g) || []).length;
  if (hyphenCount >= 2) {
    flags.push({
      id: 'excessive-hyphens',
      titleEn: 'Excessive Hyphens in Domain',
      titleAr: 'فواصل وشرطات متعددة بالنطاق',
      descriptionEn: 'Phishers often string words together (e.g., brand-secure-login-verify).',
      descriptionAr: 'المهاجمون يدمجون كلمات متعددة مثل support-security-update للتمويه.',
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
  titleEn: string;
  titleAr: string;
  feedbackEn: string;
  feedbackAr: string;
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
      titleEn: 'Cyber Defense Specialist',
      titleAr: 'خبير دفاع سيبراني متقدم',
      feedbackEn: 'Outstanding! You identified all phishing vectors, deceptive domains, and psychological traps perfectly.',
      feedbackAr: 'ممتاز جداً! لقد نجحت في كشف جميع أساليب التصيد والنطاقات المضللة والفخاخ النفسية بامتياز.',
    };
  }

  if (passed) {
    return {
      score,
      total,
      percentage,
      passed: true,
      statusLevel: 'proficient',
      titleEn: 'Phishing Aware Defender',
      titleAr: 'مدافع سيبراني واعي',
      feedbackEn: 'Good job! You have solid awareness of deceptive tactics. Review the questions you missed for total mastery.',
      feedbackAr: 'عمل رائع! تمتلك وعياً أمنياً قوياً يحميك من معظم الهجمات. راجع الأسئلة المتبقية للوصول للاحتراف الكامل.',
    };
  }

  return {
    score,
    total,
    percentage,
    passed: false,
    statusLevel: 'needs_practice',
    titleEn: 'Vulnerable to Phishing Bait',
    titleAr: 'تحتاج للمزيد من التدريب',
    feedbackEn: 'Phishers exploit subtle details. Re-read the email red flags and domain rules before attempting again.',
    feedbackAr: 'المهاجمون يعتمدون على التفاصيل الدقيقة. أعد قراءة علامات الخطر وتحليل النطاقات ثم أعد الاختبار.',
  };
}

export interface ChecklistStatus {
  completedCount: number;
  totalCount: number;
  percentage: number;
  levelEn: string;
  levelAr: string;
}

export function calculateChecklistProgress(completedCount: number, totalCount: number): ChecklistStatus {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  let levelEn = 'Vulnerable';
  let levelAr = 'معرض للخطر';

  if (percentage === 100) {
    levelEn = 'Fortified & Resilient';
    levelAr = 'محصن ومحمي بالكامل';
  } else if (percentage >= 75) {
    levelEn = 'High Security Posture';
    levelAr = 'مستوى أمان متقدم';
  } else if (percentage >= 50) {
    levelEn = 'Moderate Defense';
    levelAr = 'دفاع متوسط';
  } else if (percentage > 0) {
    levelEn = 'Basic Measures Active';
    levelAr = 'إجراءات أولية';
  }

  return {
    completedCount,
    totalCount,
    percentage,
    levelEn,
    levelAr,
  };
}
