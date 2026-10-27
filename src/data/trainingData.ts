export interface PhishingType {
  id: string;
  icon: string;
  title: string;
  summary: string;
  example: string;
  dangerLevel: 'High' | 'Critical';
}

export interface RedFlagItem {
  id: number;
  label: string;
  text: string;
  explanation: string;
  category: 'sender' | 'urgency' | 'greeting' | 'threat' | 'link' | 'attachment';
}

export interface DomainExample {
  trick: string;
  fake: string;
  real: string;
  why: string;
}

export interface SocialTactic {
  id: string;
  title: string;
  quote: string;
  description: string;
  defense: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  year: string;
  impact: string;
  description: string;
  keyTakeaway: string;
  vector: string;
}

export interface SafetyChecklistItem {
  id: string;
  title: string;
  desc: string;
  category: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export const PHISHING_TYPES: PhishingType[] = [
  {
    id: 'email',
    icon: 'Mail',
    title: 'Email Phishing',
    summary: 'Mass fraudulent emails imitating legitimate banks, online shops, or cloud services.',
    example: 'Generic notifications claiming "Suspicious activity detected on your bank card. Sign in now to confirm".',
    dangerLevel: 'High',
  },
  {
    id: 'spear',
    icon: 'Target',
    title: 'Spear Phishing',
    summary: 'Highly customized, targeted attacks crafted using your name, job title, and company details.',
    example: 'An email referencing an ongoing company project with a customized malicious PDF link.',
    dangerLevel: 'Critical',
  },
  {
    id: 'smishing',
    icon: 'Smartphone',
    title: 'Smishing (SMS Phishing)',
    summary: 'Deceptive text messages containing shortened links demanding immediate action.',
    example: '"Your parcel delivery has been suspended. Pay $1.50 clearance fee now: tiny.cc/pkg".',
    dangerLevel: 'High',
  },
  {
    id: 'vishing',
    icon: 'PhoneCall',
    title: 'Vishing (Voice Phishing)',
    summary: 'Fraudulent voice phone calls impersonating banks, IT helpdesks, or police requesting security codes.',
    example: 'A caller claiming to be fraud detection asking you to read back the SMS code just received.',
    dangerLevel: 'Critical',
  },
  {
    id: 'whaling',
    icon: 'Building2',
    title: 'Whaling & BEC',
    summary: 'Impersonation of C-suite executives targeting finance and HR staff to initiate unauthorized wire transfers.',
    example: 'A spoofed email from the CEO asking finance for an urgent confidential acquisition wire.',
    dangerLevel: 'Critical',
  },
  {
    id: 'clone',
    icon: 'Globe',
    title: 'Clone & Fake Sites',
    summary: 'Pixel-perfect replica login pages built specifically to harvest usernames, passwords, and 2FA tokens.',
    example: 'A login page that looks exactly like Microsoft 365 or Google Workspace on a look-alike domain.',
    dangerLevel: 'Critical',
  },
];

export const EMAIL_FLAGS: RedFlagItem[] = [
  {
    id: 0,
    category: 'sender',
    label: 'Spoofed Sender Address',
    text: 'PayPal Support <service@paypa1-security.com>',
    explanation: 'The domain is "paypa1-security.com" with a digit "1" instead of the letter "l". Attackers register deceptive domains that look identical at a quick glance.',
  },
  {
    id: 1,
    category: 'urgency',
    label: 'Urgent Closure Threat',
    text: 'URGENT: Your account will be closed in 24 hours!',
    explanation: 'Extreme urgency and short deadlines are engineered to induce panic, bypassing critical thinking so you act before verifying.',
  },
  {
    id: 2,
    category: 'greeting',
    label: 'Impersonal Generic Greeting',
    text: 'Dear Customer,',
    explanation: 'Legitimate institutions you do business with know your full registered name and address you directly (e.g., "Dear John"). Mass phishers do not.',
  },
  {
    id: 3,
    category: 'threat',
    label: 'Coercive Penalty Language',
    text: 'Failure to verify your identity immediately will result in permanent suspension.',
    explanation: 'Real payment services do not permanently cancel accounts over email without formal multi-channel notices and grace periods.',
  },
  {
    id: 4,
    category: 'link',
    label: 'Deceptive URL with Subdomain Trick',
    text: 'http://paypal.secure-login.verify-now.ru/account',
    explanation: 'Read from right to left before the slash: the actual domain is "verify-now.ru". "paypal" is only a harmless-looking subdomain prefixed to deceive. Notice it is also unencrypted HTTP!',
  },
  {
    id: 5,
    category: 'attachment',
    label: 'Dangerous Compressed Archive (.zip)',
    text: 'Account_Statement.zip',
    explanation: 'Financial statements are issued in PDF, never in .zip or executable files. ZIP archives often conceal keyloggers, Trojans, or ransomware payloads.',
  },
];

export const DOMAIN_EXAMPLES: DomainExample[] = [
  {
    trick: 'Look-alike letters (Typosquatting)',
    fake: 'paypa1.com',
    real: 'paypal.com',
    why: 'Digit 1 substitutes the letter l. Hard to detect without close reading.',
  },
  {
    trick: 'Brand placed in a Subdomain',
    fake: 'paypal.secure-login.com',
    real: 'www.paypal.com',
    why: 'The actual domain is secure-login.com. Anyone can name a subdomain "paypal".',
  },
  {
    trick: 'Extra words & hyphens',
    fake: 'microsoft-support-center.net',
    real: 'support.microsoft.com',
    why: 'Legitimate brands keep their domain clean and use official subdomains, not hyphenated combos.',
  },
  {
    trick: 'Wrong or Suspicious TLD Ending',
    fake: 'amazon-deals.xyz',
    real: 'amazon.com',
    why: 'Attackers purchase cheap, high-churn extensions like .xyz, .top, or .ru.',
  },
];

export const SOCIAL_TACTICS: SocialTactic[] = [
  {
    id: 'urgency',
    title: 'Artificial Urgency',
    quote: '"Your account will be suspended within 60 minutes. Act now."',
    description: 'Forces your brain into fight-or-flight mode. When rushed, humans rely on emotional heuristics rather than analytical verification.',
    defense: 'Rule: Legitimate crises rarely happen on an arbitrary 60-minute email timer. Take a deep breath and verify through an independent channel.',
  },
  {
    id: 'fear',
    title: 'Fear & Legal Threats',
    quote: '"Unpaid tax subpoena detected. Federal marshals are en route."',
    description: 'Exploits the fear of getting into trouble, losing employment, or facing criminal charges to elicit obedience.',
    defense: 'Rule: Courts and police do not serve warrants or ask for cryptocurrency fines via casual email or phone calls.',
  },
  {
    id: 'authority',
    title: 'Fabricated Authority',
    quote: '"This is CEO Mark. I am in a board meeting and need you to pay this supplier."',
    description: 'Subordinates are conditioned to follow executive requests without questioning to avoid appearing uncooperative.',
    defense: 'Rule: Always require out-of-band verbal or dual-authorization verification for any financial transaction, regardless of executive title.',
  },
  {
    id: 'greed',
    title: 'Greed & Curiosity Bait',
    quote: '"Congratulations! You won an unclaimed $2,500 Amazon Gift Voucher."',
    description: 'Offers something unexpectedly valuable for free, or dangles juicy gossip ("See who viewed your private photos").',
    defense: 'Rule: If an offer looks too good to be true, it is 100% a malicious trap. You cannot win a lottery you never entered.',
  },
  {
    id: 'trust',
    title: 'Exploiting Trust & Helpfulness',
    quote: '"Hi! I locked myself out of the office portal, could you send me the SMS code?"',
    description: 'Preys on common human empathy and the natural impulse to assist coworkers or friendly strangers.',
    defense: 'Rule: Never share OTPs, passcodes, or credentials with anyone, even someone claiming to be your closest coworker.',
  },
  {
    id: 'pretexting',
    title: 'Pretexting & Physical Baiting',
    quote: 'A labelled USB drive marked "Executive Bonuses 2026" left in the elevator lobby.',
    description: 'Inventing an elaborate background scenario or using physical media to lure curious targets into compromising machines.',
    defense: 'Rule: Never plug an unknown USB device into your computer. Treat untrusted media as active malware carriers.',
  },
];

export const REAL_CASES: CaseStudy[] = [
  {
    id: 'tech-giants',
    title: 'Google & Facebook Invoice Fraud',
    year: '2013 – 2015',
    impact: '$100M+ stolen via BEC',
    vector: 'Business Email Compromise (BEC)',
    description: 'A Lithuanian scammer created a fake company with the identical name of Quanta Computer (a real hardware supplier to both tech giants). For two years, he sent forged invoices, contracts, and letters stamped with fake corporate seals. Accounting departments routinely approved and wired over $100 million into offshore bank accounts.',
    keyTakeaway: 'Even the world’s leading technology companies can be deceived if account payment details are changed without independent telephone verification.',
  },
  {
    id: 'twitter',
    title: 'The Twitter VIP Account Takeover',
    year: 'July 2020',
    impact: '130 High-Profile Accounts Hijacked',
    vector: 'Phone Vishing & Credential Harvesting',
    description: 'Teenage attackers conducted targeted voice phishing (vishing) calls to Twitter customer service employees while working remotely during lockdowns. Posing as Twitter internal IT support, they guided employees to clone login pages, intercepted their credentials and two-factor tokens, and gained access to internal administrative tools to hijack accounts of Barack Obama, Elon Musk, and Apple.',
    keyTakeaway: 'Internal IT staff will never cold-call you demanding your credentials or MFA security codes. Always hang up and call back via verified directories.',
  },
  {
    id: 'rsa',
    title: 'The RSA SecurID Security Breach',
    year: '2011',
    impact: 'Compromise of SecurID 2FA Token Seeds',
    vector: 'Spear Phishing with Malicious Excel File',
    description: 'Attackers sent two targeted spear-phishing emails with the subject "2011 Recruitment Plan" containing an attached Excel spreadsheet called "2011 Recruitment plan.xls". One employee retrieved it from the Junk mail folder and opened it. An embedded Adobe Flash zero-day vulnerability executed, giving attackers deep command and control access to SecurID authentication tokens.',
    keyTakeaway: 'Never retrieve suspicious emails from Spam/Junk folders. Spam filters flag them for legitimate reasons, and opening unknown Office macros can compromise entire corporate backbones.',
  },
  {
    id: 'target',
    title: 'The Target Retail Mega-Breach',
    year: '2013',
    impact: '40 Million Payment Cards Compromised',
    vector: 'Supply Chain Vendor Phishing',
    description: 'The attackers did not breach Target directly. Instead, they sent a phishing email containing Citadel malware to a small heating and air-conditioning (HVAC) contractor in Pennsylvania. Once the vendor’s network credentials were stolen, attackers used the vendor’s billing portal access to pivot laterally into Target’s point-of-sale (POS) systems.',
    keyTakeaway: 'Security is only as strong as the weakest link in your supply chain. Vendors must adhere to the same zero-trust network segmentation as internal systems.',
  },
];

export const SAFETY_CHECKLIST: SafetyChecklistItem[] = [
  {
    id: 'pause',
    title: 'Pause and Verify',
    desc: 'Contact senders through official directory phone numbers, never via details provided in the suspicious message.',
    category: 'Habits',
  },
  {
    id: 'hover',
    title: 'Inspect Links Before Clicking',
    desc: 'Hover over hyperlinks on desktop or long-press on mobile to inspect the actual destination domain address.',
    category: 'Web Safety',
  },
  {
    id: 'never_share',
    title: 'Never Disclose Credentials or OTPs',
    desc: 'Legitimate service providers will never request your password, PIN, or one-time security code over chat, phone, or email.',
    category: 'Credentials',
  },
  {
    id: 'mfa',
    title: 'Activate Multi-Factor Authentication',
    desc: 'Enable app-based authenticator (like Google Authenticator) or hardware security keys on all critical accounts.',
    category: 'Defense',
  },
  {
    id: 'password_manager',
    title: 'Deploy a Dedicated Password Manager',
    desc: 'Password managers only auto-fill credentials on exact matching registered domains, instantly nullifying fake phishing sites.',
    category: 'Credentials',
  },
  {
    id: 'attachments',
    title: 'Quarantine Unexpected Attachments',
    desc: 'Treat ZIP, EXE, ISO, and macro-enabled documents (.docm, .xlsm) with extreme caution. Verify sender authenticity first.',
    category: 'Malware Prevention',
  },
  {
    id: 'updates',
    title: 'Keep Browsers and OS Updated',
    desc: 'Modern browsers include built-in anti-phishing telemetry (Google Safe Browsing, Microsoft SmartScreen) updated daily.',
    category: 'Defense',
  },
  {
    id: 'report',
    title: 'Report Suspicious Activity Promptly',
    desc: 'Use your email client’s "Report Phishing" button or notify your corporate Security Operations Center (SOC) immediately.',
    category: 'Response',
  },
];

export const EMERGENCY_STEPS = [
  {
    step: 1,
    title: 'Sever Network Connections Immediately',
    desc: 'Unplug the Ethernet cable and disable Wi-Fi/Bluetooth. This halts active malware command & control communication and stops lateral network spread.',
  },
  {
    step: 2,
    title: 'Change Passwords from a Known Safe Device',
    desc: 'Do not use the compromised computer. Use your smartphone or another clean machine to reset affected passwords and terminate active sessions.',
  },
  {
    step: 3,
    title: 'Notify Security Team or Financial Institution',
    desc: 'Contact your organization’s IT Security department or your bank’s fraud emergency line to freeze credit cards and flag unauthorized transactions.',
  },
  {
    step: 4,
    title: 'Monitor Accounts & Audit Authentication Logs',
    desc: 'Inspect email forwarding rules, new registered login locations, and bank transaction statements over the following weeks.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'You receive an email from "your bank" asking you to confirm your password through a provided link. What should you do?',
    options: [
      'Click the link and sign in quickly to avoid penalties',
      'Reply to the email with a question to test them',
      'Do not click. Open the official banking app or type the verified URL yourself',
      'Forward the email to friends as a general warning',
    ],
    answerIndex: 2,
    explanation: 'Banks and financial institutions will never ask for your password via email. Always navigate to the official verified website independently.',
  },
  {
    id: 2,
    question: 'Which of the following web addresses is most likely a deceptive phishing site?',
    options: [
      'support.microsoft.com',
      'accounts.google.com',
      'paypal.secure-login.com',
      'www.amazon.com',
    ],
    answerIndex: 2,
    explanation: 'In "paypal.secure-login.com", the registered root domain is "secure-login.com". "paypal" is merely a deceptive subdomain string.',
  },
  {
    id: 3,
    question: 'A website displays a secure padlock icon and HTTPS in the address bar. Does this guarantee that the website is safe and legitimate?',
    options: [
      'Yes, always. The padlock proves the company identity was verified',
      'No, HTTPS only means communication is encrypted; phishing sites can easily obtain SSL certificates too',
      'Yes, as long as the padlock turns green',
      'Only on desktop computers, not on mobile screens',
    ],
    answerIndex: 1,
    explanation: 'HTTPS encrypts the transit pipe between you and the server, preventing eavesdropping. Attackers can obtain free SSL certificates for fake phishing domains just as easily as legitimate sites.',
  },
  {
    id: 4,
    question: 'Your "manager" emails from a free Gmail address urgently demanding you purchase electronic gift cards for client gifts. What is this?',
    options: [
      'A normal request if your manager is travelling out of office',
      'A classic Whaling / Business Email Compromise (BEC) attack',
      'A routine quarterly IT network latency test',
      'Completely safe if the manager’s profile photo matches',
    ],
    answerIndex: 1,
    explanation: 'Urgency, unusual payment mechanisms (gift cards or wire transfers), and an external free webmail address are textbook signs of executive impersonation scams.',
  },
  {
    id: 5,
    question: 'Which of the following is LEAST likely to be a typical red flag for phishing?',
    options: [
      'A generic greeting such as "Dear valued user"',
      'A threatening deadline warning of imminent account termination',
      'An expected message from a known colleague linking to your company’s official internal portal',
      'A misspelled company name such as "Netfl1x Support"',
    ],
    answerIndex: 2,
    explanation: 'While vigilance is always prudent, an expected communication from a recognized colleague directing to your authenticated internal corporate domain is the safest scenario.',
  },
  {
    id: 6,
    question: 'Someone calls your desk phone claiming to be internal IT support and requests the one-time passcode (OTP) just sent to your phone. What should you do?',
    options: [
      'Provide it immediately because IT created the corporate accounts',
      'Refuse, hang up immediately, and report the call to the official security hotline',
      'Give them only the first three numbers of the six-digit code',
      'Ask them to email you the request first before telling them',
    ],
    answerIndex: 1,
    explanation: 'One-time passwords are meant solely for the end user and should NEVER be shared with anyone over voice or chat. This is a voice phishing (vishing) credential harvesting attempt.',
  },
  {
    id: 7,
    question: 'You accidentally clicked a suspicious link and typed your corporate password before realizing it was fake. What is your critical FIRST action?',
    options: [
      'Ignore it and hope the malicious server crashed',
      'Simply delete the phishing email from your inbox',
      'Immediately change the password from a secure device, enable MFA, and alert the IT security team',
      'Restart your computer and shut down the monitor',
    ],
    answerIndex: 2,
    explanation: 'Time is critical. Attackers often automate credential usage within minutes. Changing your password from a clean device invalidates the stolen token, and notifying IT allows them to revoke active tokens.',
  },
  {
    id: 8,
    question: 'Which combination of habits provides the strongest personal defense against modern phishing threats?',
    options: [
      'Using the same complex password across all accounts so you never forget it',
      'Enabling Multi-Factor Authentication (MFA), deploying a password manager, and inspecting URL domains before clicking',
      'Opening email attachments quickly before virus definitions update',
      'Trusting any email where the sender display name matches a recognized brand logo',
    ],
    answerIndex: 1,
    explanation: 'MFA ensures stolen passwords cannot be used alone, password managers refuse to fill credentials on spoofed domains, and inspecting URLs stops you from walking into traps.',
  },
];
