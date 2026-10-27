export type Language = 'en' | 'ar';

export interface PhishingType {
  id: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  exampleEn: string;
  exampleAr: string;
  dangerLevel: 'High' | 'Critical';
}

export interface RedFlagItem {
  id: number;
  labelEn: string;
  labelAr: string;
  textEn: string;
  textAr: string;
  explanationEn: string;
  explanationAr: string;
  category: 'sender' | 'urgency' | 'greeting' | 'threat' | 'link' | 'attachment';
}

export interface DomainExample {
  trickEn: string;
  trickAr: string;
  fake: string;
  real: string;
  whyEn: string;
  whyAr: string;
}

export interface SocialTactic {
  id: string;
  titleEn: string;
  titleAr: string;
  quoteEn: string;
  quoteAr: string;
  descriptionEn: string;
  descriptionAr: string;
  defenseEn: string;
  defenseAr: string;
}

export interface CaseStudy {
  id: string;
  titleEn: string;
  titleAr: string;
  year: string;
  impactEn: string;
  impactAr: string;
  descriptionEn: string;
  descriptionAr: string;
  keyTakeawayEn: string;
  keyTakeawayAr: string;
  vector: string;
}

export interface SafetyChecklistItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  categoryEn: string;
  categoryAr: string;
}

export interface QuizQuestion {
  id: number;
  questionEn: string;
  questionAr: string;
  optionsEn: string[];
  optionsAr: string[];
  answerIndex: number;
  explanationEn: string;
  explanationAr: string;
}

export const PHISHING_TYPES: PhishingType[] = [
  {
    id: 'email',
    icon: 'Mail',
    titleEn: 'Email Phishing',
    titleAr: 'التصيد عبر البريد الإلكتروني',
    summaryEn: 'Mass fraudulent emails imitating legitimate banks, online shops, or cloud services.',
    summaryAr: 'رسائل بريد جماعية مضللة تنتحل هوية البنوك، المتاجر الإلكترونية، أو الخدمات السحابية.',
    exampleEn: 'Generic notifications claiming "Suspicious activity detected on your bank card".',
    exampleAr: 'إشعارات عامة تزعم "اكتشاف نشاط مشبوه على بطاقتك البنكية، يرجى الدخول للتأكيد".',
    dangerLevel: 'High',
  },
  {
    id: 'spear',
    icon: 'Target',
    titleEn: 'Spear Phishing',
    titleAr: 'التصيد الموجه (Spear Phishing)',
    summaryEn: 'Highly customized, targeted attacks crafted using your name, job title, and company details.',
    summaryAr: 'هجمات مخصصة بدقة عالية تستهدف فرداً بعينه باستخدام اسمه، منصبه الوظيفي، وبيانات زملائه.',
    exampleEn: 'An email referencing an ongoing company project with a customized malicious PDF link.',
    exampleAr: 'رسالة تشير إلى مشروع حقيقي تعمل عليه الشركة وتحتوي على رابط ملف PDF ملغوم.',
    dangerLevel: 'Critical',
  },
  {
    id: 'smishing',
    icon: 'Smartphone',
    titleEn: 'Smishing (SMS Phishing)',
    titleAr: 'التصيد عبر الرسائل القصيرة (Smishing)',
    summaryEn: 'Deceptive text messages containing shortened links demanding immediate action.',
    summaryAr: 'رسائل نصية قصيرة احتيالية تحتوي على روابط مختصرة تطلب اتخاذ إجراء فوري.',
    exampleEn: '"Your parcel delivery has been suspended. Pay $1.50 clearance fee now: tiny.cc/pkg".',
    exampleAr: '"تم تعليق تسليم طردك البريدي. سدد رسوم جمركية بقيمة 10 جنيهات فوراً عبر الرابط: bit.ly/trk".',
    dangerLevel: 'High',
  },
  {
    id: 'vishing',
    icon: 'PhoneCall',
    titleEn: 'Vishing (Voice Phishing)',
    titleAr: 'التصيد الصوتي (Vishing)',
    summaryEn: 'Fraudulent voice phone calls impersonating banks, IT helpdesks, or police requesting security codes.',
    summaryAr: 'مكالمات هاتفية مخادعة يدعي فيها المتصل أنه من خدمة عملاء البنك أو الدعم الفني لسرقة رموز OTP.',
    exampleEn: 'A caller claiming to be fraud detection asking you to read back the SMS code just received.',
    exampleAr: 'متصل يدعي أنه من إدارة مكافحة الاحتيال في البنك ويطلب منك قراءة الرمز المرسل لهاتفك حالاً.',
    dangerLevel: 'Critical',
  },
  {
    id: 'whaling',
    icon: 'Building2',
    titleEn: 'Whaling & BEC',
    titleAr: 'صيد الحيتان واختراق بريد الشركات (BEC)',
    summaryEn: 'Impersonation of C-suite executives targeting finance and HR staff to initiate unauthorized wire transfers.',
    summaryAr: 'انتحال شخصيات كبار المدراء التنفيذيين لخداع موظفي الحسابات والموارد البشرية لتحويل أموال.',
    exampleEn: 'A spoofed email from the CEO asking finance for an urgent confidential acquisition wire.',
    exampleAr: 'رسالة منتحلة لاسم الرئيس التنفيذي يطلب فيها من المحاسب تحويل مبلغ مستعجل لصفقة سرية.',
    dangerLevel: 'Critical',
  },
  {
    id: 'clone',
    icon: 'Globe',
    titleEn: 'Clone & Fake Sites',
    titleAr: 'المواقع المستنسخة والمزيفة',
    summaryEn: 'Pixel-perfect replica login pages built specifically to harvest usernames, passwords, and 2FA tokens.',
    summaryAr: 'صفحات تسجيل دخول مطابقة للأصل بنسبة 100% صُممت لسرقة أسماء المستخدمين وكلمات المرور.',
    exampleEn: 'A login page that looks exactly like Microsoft 365 or Google Workspace on a look-alike domain.',
    exampleAr: 'صفحة تسجيل دخول تبدو تماماً مثل Google أو Microsoft على نطاق يشبه النطاق الأصلي.',
    dangerLevel: 'Critical',
  },
];

export const EMAIL_FLAGS: RedFlagItem[] = [
  {
    id: 0,
    category: 'sender',
    labelEn: 'Spoofed Sender Address',
    labelAr: 'عنوان المرسل المزيف',
    textEn: 'PayPal Support <service@paypa1-security.com>',
    textAr: 'دعم PayPal <service@paypa1-security.com>',
    explanationEn: 'The domain is "paypa1-security.com" with a digit "1" instead of the letter "l". Attackers register deceptive domains that look identical at a quick glance.',
    explanationAr: 'النطاق المستخدم هو "paypa1-security.com" برقم 1 بدلاً من حرف l. المهاجمون يعتمدون على تشابه الحروف لخداع العين المتسرعة.',
  },
  {
    id: 1,
    category: 'urgency',
    labelEn: 'Urgent Closure Threat',
    labelAr: 'تهديد بالإغلاق الفوري',
    textEn: 'URGENT: Your account will be closed in 24 hours!',
    textAr: 'عاجل: سيتم إغلاق حسابك نهائياً خلال 24 ساعة!',
    explanationEn: 'Extreme urgency and short deadlines are engineered to induce panic, bypassing critical thinking so you act before verifying.',
    explanationAr: 'استخدام أسلوب الاستعجال والتهديد يهدف لإثارة القلق والخوف، مما يجعلك تتصرف بسرعة دون تدقيق أو تفكير منطقي.',
  },
  {
    id: 2,
    category: 'greeting',
    labelEn: 'Impersonal Generic Greeting',
    labelAr: 'تحية عامة غير مخصصة',
    textEn: 'Dear Customer,',
    textAr: 'عزيزي العميل،',
    explanationEn: 'Legitimate institutions you do business with know your full registered name and address you directly (e.g., "Dear John"). Mass phishers do not.',
    explanationAr: 'المؤسسات والبنوك التي تتعامل معها تعرف اسمك المسجل مسبقاً وتخاطبك به شخصياً، بينما رسائل الاحتيال الجماعية تستخدم تحيات مبهمة.',
  },
  {
    id: 3,
    category: 'threat',
    labelEn: 'Coercive Penalty Language',
    labelAr: 'لغة التهديد بالعقوبة',
    textEn: 'Failure to verify your identity immediately will result in permanent suspension.',
    textAr: 'عدم التحقق من هويتك فوراً سيؤدي إلى تجميد حسابك بشكل دائم وغير قابل للاسترداد.',
    explanationEn: 'Real payment services do not permanently cancel accounts over email without formal multi-channel notices and grace periods.',
    explanationAr: 'الخدمات المالية الحقيقية لا تهدد بإلغاء الحسابات فوراً عبر رسالة بريد واحدة دون إشعارات رسمية متعددة وفترات سماح.',
  },
  {
    id: 4,
    category: 'link',
    labelEn: 'Deceptive URL with Subdomain Trick',
    labelAr: 'رابط مضلل بنطاق روسي مشبوه',
    textEn: 'http://paypal.secure-login.verify-now.ru/account',
    textAr: 'http://paypal.secure-login.verify-now.ru/account',
    explanationEn: 'Read from right to left before the slash: the actual domain is "verify-now.ru". "paypal" is only a harmless-looking subdomain prefixed to deceive. Notice it is also unencrypted HTTP!',
    explanationAr: 'اقرأ الرابط من اليمين إلى اليسار قبل أول شرطة مائلة: النطاق الفعلي هو "verify-now.ru" بينما كلمة paypal مجرد اسم نطاق فرعي للتمويه! كما أنه بروتوكول HTTP غير مشفر.',
  },
  {
    id: 5,
    category: 'attachment',
    labelEn: 'Dangerous Compressed Archive (.zip)',
    labelAr: 'مرفق مضغوط عالي الخطورة (.zip)',
    textEn: 'Account_Statement.zip',
    textAr: 'Account_Statement.zip',
    explanationEn: 'Financial statements are issued in PDF, never in .zip or executable files. ZIP archives often conceal keyloggers, Trojans, or ransomware payloads.',
    explanationAr: 'كشوف الحسابات الرسمية ترسل بصيغة PDF فقط، ولا ترسل أبداً كملفات مضغوطة .zip لأنها غالباً ما تخفي برمجيات خبيثة أو فيروسات فدية.',
  },
];

export const DOMAIN_EXAMPLES: DomainExample[] = [
  {
    trickEn: 'Look-alike letters (Typosquatting)',
    trickAr: 'استبدال الأحرف المتشابهة (Typosquatting)',
    fake: 'paypa1.com',
    real: 'paypal.com',
    whyEn: 'Digit 1 substitutes the letter l. Hard to detect without close reading.',
    whyAr: 'استبدال حرف l بالرقم 1، وهو ما يصعب ملاحظته عند القراءة السريعة.',
  },
  {
    trickEn: 'Brand placed in a Subdomain',
    trickAr: 'وضع اسم العلامة التجارية في النطاق الفرعي',
    fake: 'paypal.secure-login.com',
    real: 'www.paypal.com',
    whyEn: 'The actual domain is secure-login.com. Anyone can name a subdomain "paypal".',
    whyAr: 'النطاق الحقيقي المسجل هو secure-login.com وليس paypal، فأي شخص يمكنه إنشاء نطاق فرعي بأي اسم.',
  },
  {
    trickEn: 'Extra words & hyphens',
    trickAr: 'إضافة كلمات إضافية وشرطات',
    fake: 'microsoft-support-center.net',
    real: 'support.microsoft.com',
    whyEn: 'Legitimate brands keep their domain clean and use official subdomains, not hyphenated combos.',
    whyAr: 'الشركات الكبرى لا تستخدم نطاقات مليئة بالشرطات بل تضع الأقسام كنطاقات فرعية لنطاقها الأصلي.',
  },
  {
    trickEn: 'Wrong or Suspicious TLD Ending',
    trickAr: 'امتداد نطاق خاطئ أو غير معتاد',
    fake: 'amazon-deals.xyz',
    real: 'amazon.com',
    whyEn: 'Attackers purchase cheap, high-churn extensions like .xyz, .top, or .ru.',
    whyAr: 'المحتالون يشترون امتدادات رخيصة وغير مألوفة مثل .xyz أو .top بدلاً من الامتداد الرسمي .com.',
  },
];

export const SOCIAL_TACTICS: SocialTactic[] = [
  {
    id: 'urgency',
    titleEn: 'Artificial Urgency',
    titleAr: 'الاستعجال المصطنع',
    quoteEn: '"Your account will be suspended within 60 minutes. Act now."',
    quoteAr: '"سيتم تجميد حسابك خلال 60 دقيقة فقط. تصرف الآن."',
    descriptionEn: 'Forces your brain into fight-or-flight mode. When rushed, humans rely on emotional heuristics rather than analytical verification.',
    descriptionAr: 'يضع عقلك تحت ضغط زمني خانق. عندما نشعر بالاستعجال نتصرف بعاطفة ونتجاوز التفكير النقدي وفحص التفاصيل.',
    defenseEn: 'Rule: Legitimate crises rarely happen on an arbitrary 60-minute email timer. Take a deep breath and verify through an independent channel.',
    defenseAr: 'القاعدة: الطوارئ الحقيقية لا تُحل بمهلة 60 دقيقة في رسالة بريد. توقف وتنفس، وتحقق عبر وسيلة اتصال رسمية منفصلة.',
  },
  {
    id: 'fear',
    titleEn: 'Fear & Legal Threats',
    titleAr: 'إثارة الخوف والتهديد القانوني',
    quoteEn: '"Unpaid tax subpoena detected. Federal marshals are en route."',
    quoteAr: '"إشعار قضائي عاجل بشأن تهرب ضريبي. سيتم اتخاذ إجراءات ضبط فوري."',
    descriptionEn: 'Exploits the fear of getting into trouble, losing employment, or facing criminal charges to elicit obedience.',
    descriptionAr: 'يستغل خوف الإنسان الطبيعي من المشاكل القانونية، أو فقدان الوظيفة، أو تشويه السمعة لفرض الانصياع الأعمى.',
    defenseEn: 'Rule: Courts and police do not serve warrants or ask for cryptocurrency fines via casual email or phone calls.',
    defenseAr: 'القاعدة: الجهات القضائية والرسمية لا ترسل استدعاءات عبر البريد الإلكتروني أو تطلب دفع غرامات عبر روابط عشوائية.',
  },
  {
    id: 'authority',
    titleEn: 'Fabricated Authority',
    titleAr: 'انتحال السلطة والنفوذ',
    quoteEn: '"This is CEO Mark. I am in a board meeting and need you to pay this supplier."',
    quoteAr: '"معك المدير التنفيذي.. أنا باجتماع مجلس إدارة مغلق، حوّل هذا المبلغ للمورد فوراً."',
    descriptionEn: 'Subordinates are conditioned to follow executive requests without questioning to avoid appearing uncooperative.',
    descriptionAr: 'الموظفون يميلون طبيعياً لتنفيذ أوامر كبار المدراء بسرعة لتجنب المشاكل أو إبداء التقصير.',
    defenseEn: 'Rule: Always require out-of-band verbal or dual-authorization verification for any financial transaction, regardless of executive title.',
    defenseAr: 'القاعدة: اتبع دائماً سياسة التحقق المزدوج والتأكيد الشفهي المباشر لأي تحويل مالي مهما كانت رتبة الطالب.',
  },
  {
    id: 'greed',
    titleEn: 'Greed & Curiosity Bait',
    titleAr: 'إغراء الطمع والفضول',
    quoteEn: '"Congratulations! You won an unclaimed $2,500 Amazon Gift Voucher."',
    quoteAr: '"تهانينا! لقد ربحت قسيمة شراء بقيمة 5000 دولار. اضغط لاستلامها."',
    descriptionEn: 'Offers something unexpectedly valuable for free, or dangles juicy gossip ("See who viewed your private photos").',
    descriptionAr: 'يقدم وعوداً بجوائز ضخمة أو هدايا مجانية غير منطقية، أو يثير الفضول لمعرفة أسرار أو صور مسربة.',
    defenseEn: 'Rule: If an offer looks too good to be true, it is 100% a malicious trap. You cannot win a lottery you never entered.',
    defenseAr: 'القاعدة: إذا كان العرض مغرياً لدرجة لا تصدق، فهو فخ مؤكد بنسبة 100%. لا يمكنك ربح مسابقة لم تشترك بها.',
  },
  {
    id: 'trust',
    titleEn: 'Exploiting Trust & Helpfulness',
    titleAr: 'استغلال الثقة وحب المساعدة',
    quoteEn: '"Hi! I locked myself out of the office portal, could you send me the SMS code?"',
    quoteAr: '"مرحباً زميلي! أواجه مشكلة في تسجيل الدخول، هل ترسل لي رمز التحقق الذي وصلك؟"',
    descriptionEn: 'Preys on common human empathy and the natural impulse to assist coworkers or friendly strangers.',
    descriptionAr: 'يستغل الرغبة الفطرية لدى الإنسان في مساعدة زملائه وتقديم يد العون لتجاوز عقبات العمل.',
    defenseEn: 'Rule: Never share OTPs, passcodes, or credentials with anyone, even someone claiming to be your closest coworker.',
    defenseAr: 'القاعدة: رموز التحقق المؤقتة (OTP) وكلمات المرور سرية تماماً ولا تشارك مع أي شخص تحت أي ظرف.',
  },
  {
    id: 'pretexting',
    titleEn: 'Pretexting & Physical Baiting',
    titleAr: 'اصطناع الذرائع وإلقاء الطعوم (Baiting)',
    quoteEn: 'A labelled USB drive marked "Executive Bonuses 2026" left in the elevator lobby.',
    quoteAr: 'فلاش ميموري (USB) مكتوب عليه "مكافآت الإدارة 2026" متروك عمداً في بهو الشركة.',
    descriptionEn: 'Inventing an elaborate background scenario or using physical media to lure curious targets into compromising machines.',
    descriptionAr: 'اختلاق قصة واقعية مفصلة أو ترك وسائط تخزين ملغومة في أماكن عامة لإغراء الضحية بتوصيلها بجهازه.',
    defenseEn: 'Rule: Never plug an unknown USB device into your computer. Treat untrusted media as active malware carriers.',
    defenseAr: 'القاعدة: لا تقم مطلقاً بتوصيل أي فلاش ميموري مجهول بجهازك، وسلمه فوراً لفريق أمن المعلومات.',
  },
];

export const REAL_CASES: CaseStudy[] = [
  {
    id: 'tech-giants',
    titleEn: 'Google & Facebook Invoice Fraud',
    titleAr: 'احتيال فواتير جوجل وفيسبوك الكبرى',
    year: '2013 – 2015',
    impactEn: '$100M+ stolen via BEC',
    impactAr: 'سرقة أكثر من 100 مليون دولار',
    vector: 'Business Email Compromise (BEC)',
    descriptionEn: 'A Lithuanian scammer created a fake company with the identical name of Quanta Computer (a real hardware supplier to both tech giants). For two years, he sent forged invoices, contracts, and letters stamped with fake corporate seals. Accounting departments routinely approved and wired over $100 million into offshore bank accounts.',
    descriptionAr: 'أنشأ محتال شركة وهمية بنفس اسم شركة Quanta Computer (مورد عتاد حقيقي لكل من جوجل وفيسبوك). على مدار عامين أرسل فواتير وعقود مزورة بأختام بنكية مقلدة، وقام قسم الحسابات في كلا العملاقين بتحويل أكثر من 100 مليون دولار لحسابات خارجية!',
    keyTakeawayEn: 'Even the world’s leading technology companies can be deceived if account payment details are changed without independent telephone verification.',
    keyTakeawayAr: 'حتى أكبر عمالقة التكنولوجيا في العالم يمكن خداعهم إذا تم تغيير بيانات الحساب البنكي دون تدقيق وتأكيد هاتفي مستقل.',
  },
  {
    id: 'twitter',
    titleEn: 'The Twitter VIP Account Takeover',
    titleAr: 'اختراق حسابات تويتر المشهورة',
    year: 'July 2020',
    impactEn: '130 High-Profile Accounts Hijacked',
    impactAr: 'اختراق 130 حساباً لأبرز قادة العالم',
    vector: 'Phone Vishing & Credential Harvesting',
    descriptionEn: 'Teenage attackers conducted targeted voice phishing (vishing) calls to Twitter customer service employees while working remotely during lockdowns. Posing as Twitter internal IT support, they guided employees to clone login pages, intercepted their credentials and two-factor tokens, and gained access to internal administrative tools to hijack accounts of Barack Obama, Elon Musk, and Apple.',
    descriptionAr: 'قام مهاجمون بإجراء مكالمات هاتفية تصيدية (Vishing) لموظفي خدمة عملاء تويتر أثناء العمل عن بُعد، مدعين أنهم من الدعم الفني الداخلي، وقادوهم لصفحات مزيفة لسرقة بيانات الدخول وأدوات التحكم الإدارية، مما مكنهم من الاستيلاء على حسابات إيلون ماسك، أوباما، وأبل للترويج لعمليات احتيال بيتكوين.',
    keyTakeawayEn: 'Internal IT staff will never cold-call you demanding your credentials or MFA security codes. Always hang up and call back via verified directories.',
    keyTakeawayAr: 'فرق الدعم الفني الحقيقية لا تتصل بالموظف لتطلب منه إعطاء كلمة مروره أو رمز الأمان. يجب دائماً إنهاء المكالمة وإعادة الاتصال بالرقم الداخلي المعتمد.',
  },
  {
    id: 'rsa',
    titleEn: 'The RSA SecurID Security Breach',
    titleAr: 'اختراق شركة أمن المعلومات RSA',
    year: '2011',
    impactEn: 'Compromise of SecurID 2FA Token Seeds',
    impactAr: 'تسريب أكواد رموز الحماية الثنائية SecurID',
    vector: 'Spear Phishing with Malicious Excel File',
    descriptionEn: 'Attackers sent two targeted spear-phishing emails with the subject "2011 Recruitment Plan" containing an attached Excel spreadsheet called "2011 Recruitment plan.xls". One employee retrieved it from the Junk mail folder and opened it. An embedded Adobe Flash zero-day vulnerability executed, giving attackers deep command and control access to SecurID authentication tokens.',
    descriptionAr: 'أرسل المهاجمون رسالتين موجهتين بعنوان "خطة التوظيف لعام 2011" مرفقاً معها ملف إكسل ملغوم. قام أحد الموظفين بسحب الرسالة من مجلد المهملات وفتح الملف، مما أدى لتشغيل ثغرة برمجية مكنت المهاجمين من التسلل وسرقة أسرار رموز التوثيق الثنائي الشهيرة عالمياً.',
    keyTakeawayEn: 'Never retrieve suspicious emails from Spam/Junk folders. Spam filters flag them for legitimate reasons, and opening unknown Office macros can compromise entire corporate backbones.',
    keyTakeawayAr: 'لا تستعد أبداً رسائل مشبوهة من مجلد الرسائل المزعجة (Spam)؛ ففلاتر البريد وضعتها هناك لسبب وجيه، وفتح ماكرو ملغوم قد يسقط شبكة المؤسسة بالكامل.',
  },
  {
    id: 'target',
    titleEn: 'The Target Retail Mega-Breach',
    titleAr: 'اختراق متاجر Target الشهيرة',
    year: '2013',
    impactEn: '40 Million Payment Cards Compromised',
    impactAr: 'سرقة بيانات 40 مليون بطاقة دفع',
    vector: 'Supply Chain Vendor Phishing',
    descriptionEn: 'The attackers did not breach Target directly. Instead, they sent a phishing email containing Citadel malware to a small heating and air-conditioning (HVAC) contractor in Pennsylvania. Once the vendor’s network credentials were stolen, attackers used the vendor’s billing portal access to pivot laterally into Target’s point-of-sale (POS) systems.',
    descriptionAr: 'لم يخترق القراصنة أنظمة Target مباشرة، بل أرسلوا بريداً تصيدياً لشركة تكييف وتبريد صغيرة متعاقدة معهم. بمجرد سرقة بيانات حساب الشركة المتعاقدة، استخدموا صلاحياتها للنفاذ تدريجياً إلى أجهزة نقاط البيع وسرقة بيانات ملايين العملاء.',
    keyTakeawayEn: 'Security is only as strong as the weakest link in your supply chain. Vendors must adhere to the same zero-trust network segmentation as internal systems.',
    keyTakeawayAr: 'الأمن السيبراني قوي بقوة أضعف حلقة في السلسلة. لا تمنح أي طرف خارجي أو مورد وصولاً غير مقيد لشبكتك الداخلية دون عزل كامل.',
  },
];

export const SAFETY_CHECKLIST: SafetyChecklistItem[] = [
  {
    id: 'pause',
    titleEn: 'Pause and Verify',
    titleAr: 'التوقف والتحقق المستقل',
    descEn: 'Contact senders through official directory phone numbers, never via details provided in the suspicious message.',
    descAr: 'تواصل مع الجهة المرسلة عبر أرقام هواتفها الرسمية المنشورة مسبقاً، ولا تستخدم أبداً الأرقام المذكورة بالرسالة.',
    categoryEn: 'Habits',
    categoryAr: 'عادات يومية',
  },
  {
    id: 'hover',
    titleEn: 'Inspect Links Before Clicking',
    titleAr: 'فحص الروابط قبل النقر',
    descEn: 'Hover over hyperlinks on desktop or long-press on mobile to inspect the actual destination domain address.',
    descAr: 'مرر مؤشر الفأرة على الرابط أو اضغط مطولاً في الهاتف لقراءة النطاق الحقيقي الذي ستتوجه إليه قبل فتحه.',
    categoryEn: 'Web Safety',
    categoryAr: 'أمان الويب',
  },
  {
    id: 'never_share',
    titleEn: 'Never Disclose Credentials or OTPs',
    titleAr: 'عدم مشاركة كلمات المرور أو رموز OTP',
    descEn: 'Legitimate service providers will never request your password, PIN, or one-time security code over chat, phone, or email.',
    descAr: 'لن يطلب منك أي بنك أو جهة موثوقة كلمة مرورك أو الرمز المؤقت عبر مكالمة هاتفية أو رسالة بريد إلكتروني.',
    categoryEn: 'Credentials',
    categoryAr: 'إدارة الحسابات',
  },
  {
    id: 'mfa',
    titleEn: 'Activate Multi-Factor Authentication',
    titleAr: 'تفعيل التوثيق الثنائي (MFA)',
    descEn: 'Enable app-based authenticator (like Google Authenticator) or hardware security keys on all critical accounts.',
    descAr: 'فعّل التوثيق الثنائي عبر تطبيقات المصادقة أو مفاتيح الأمان الفيزيائية لجميع حساباتك الهامة.',
    categoryEn: 'Defense',
    categoryAr: 'الدفاع الفني',
  },
  {
    id: 'password_manager',
    titleEn: 'Deploy a Dedicated Password Manager',
    titleAr: 'استخدام مدير كلمات مرور موثوق',
    descEn: 'Password managers only auto-fill credentials on exact matching registered domains, instantly nullifying fake phishing sites.',
    descAr: 'مدير كلمات المرور يرفض التعبئة التلقائية للبيانات إذا كان النطاق مزيفاً حتى لو كانت الصفحة نسخة طبق الأصل.',
    categoryEn: 'Credentials',
    categoryAr: 'إدارة الحسابات',
  },
  {
    id: 'attachments',
    titleEn: 'Quarantine Unexpected Attachments',
    titleAr: 'الامتناع عن فتح المرفقات المفاجئة',
    descEn: 'Treat ZIP, EXE, ISO, and macro-enabled documents (.docm, .xlsm) with extreme caution. Verify sender authenticity first.',
    descAr: 'تعامل بحذر شديد مع الملفات المضغوطة ZIP والملفات التنفيذية وتلك التي تطلب تفعيل الماكرو (Enable Content).',
    categoryEn: 'Malware Prevention',
    categoryAr: 'مكافحة البرمجيات الخبيثة',
  },
  {
    id: 'updates',
    titleEn: 'Keep Browsers and OS Updated',
    titleAr: 'تحديث الأنظمة والمتصفحات بانتظام',
    descEn: 'Modern browsers include built-in anti-phishing telemetry (Google Safe Browsing, Microsoft SmartScreen) updated daily.',
    descAr: 'المتصفحات الحديثة تحتوي على تقنيات فحص استباقية تحجب المواقع المشبوهة بمجرد اكتشافها عالمياً.',
    categoryEn: 'Defense',
    categoryAr: 'الدفاع الفني',
  },
  {
    id: 'report',
    titleEn: 'Report Suspicious Activity Promptly',
    titleAr: 'الإبلاغ الفوري عن الرسائل المشبوهة',
    descEn: 'Use your email client’s "Report Phishing" button or notify your corporate Security Operations Center (SOC) immediately.',
    descAr: 'استخدم زر "الإبلاغ عن تصيد" في بريدك أو أبلغ فريق أمن المعلومات في مؤسستك لحماية زملائك.',
    categoryEn: 'Response',
    categoryAr: 'الاستجابة للحوادث',
  },
];

export const EMERGENCY_STEPS = [
  {
    step: 1,
    titleEn: 'Sever Network Connections Immediately',
    titleAr: 'افصل اتصال الجهاز بالشبكة فوراً',
    descEn: 'Unplug the Ethernet cable and disable Wi-Fi/Bluetooth. This halts active malware command & control communication and stops lateral network spread.',
    descAr: 'افصل كابل الشبكة وأغلق الواي فاي والبلوتوث حالاً لمنع البرمجيات الخبيثة من الاتصال بالخادم والانتشار للأجهزة الأخرى.',
  },
  {
    step: 2,
    titleEn: 'Change Passwords from a Known Safe Device',
    titleAr: 'غيّر كلمات المرور من جهاز آخر آمن',
    descEn: 'Do not use the compromised computer. Use your smartphone or another clean machine to reset affected passwords and terminate active sessions.',
    descAr: 'لا تستخدم الجهاز الذي تعرض للاختراق؛ بل استخدم هاتفك أو جهازاً آخر نظيفاً لتغيير كلمات المرور وإنهاء الجلسات المفتوحة.',
  },
  {
    step: 3,
    titleEn: 'Notify Security Team or Financial Institution',
    titleAr: 'أبلغ فريق الأمن أو البنك المختص مباشرة',
    descEn: 'Contact your organization’s IT Security department or your bank’s fraud emergency line to freeze credit cards and flag unauthorized transactions.',
    descAr: 'اتصل بقسم أمن المعلومات في شركتك أو بالخط الساخن للبنك لتجميد البطاقات ومتابعة أي محاولات تحويل غير مصرح بها.',
  },
  {
    step: 4,
    titleEn: 'Monitor Accounts & Audit Authentication Logs',
    titleAr: 'راقب الحسابات وسجلات تسجيل الدخول',
    descEn: 'Inspect email forwarding rules, new registered login locations, and bank transaction statements over the following weeks.',
    descAr: 'راجع قواعد إعادة توجيه البريد، وجلسات الدخول الحديثة، وكشوف الحسابات البنكية بدقة خلال الأسابيع التالية.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionEn: 'You receive an email from "your bank" asking you to confirm your password through a provided link. What should you do?',
    questionAr: 'تلقيت رسالة بريد إلكتروني من "البنك الذي تتعامل معه" يطلب منك تأكيد كلمة مرورك عبر رابط مرفق. ما هو التصرف الصحيح؟',
    optionsEn: [
      'Click the link and sign in quickly to avoid penalties',
      'Reply to the email with a question to test them',
      'Do not click. Open the official banking app or type the verified URL yourself',
      'Forward the email to friends as a general warning',
    ],
    optionsAr: [
      'النقر على الرابط وتسجيل الدخول فوراً لتفادي أي عقوبات أو غرامات',
      'الرد على البريد الإلكتروني بسؤال للتأكد من هويتهم',
      'عدم النقر إطلاقاً، وفتح تطبيق البنك الرسمي أو كتابة عنوان الموقع بنفسك',
      'إعادة توجيه الرسالة لأصدقائك لتحذيرهم',
    ],
    answerIndex: 2,
    explanationEn: 'Banks and financial institutions will never ask for your password via email. Always navigate to the official verified website independently.',
    explanationAr: 'البنوك والمؤسسات المالية لا تطلب كلمات المرور عبر البريد إطلاقاً. توجه للموقع الرسمي المعتمد بنفسك دائماً.',
  },
  {
    id: 2,
    questionEn: 'Which of the following web addresses is most likely a deceptive phishing site?',
    questionAr: 'أي من عناوين الويب التالية يُعد على الأرجح موقعاً احتيالياً مضللاً؟',
    optionsEn: [
      'support.microsoft.com',
      'accounts.google.com',
      'paypal.secure-login.com',
      'www.amazon.com',
    ],
    optionsAr: [
      'support.microsoft.com',
      'accounts.google.com',
      'paypal.secure-login.com',
      'www.amazon.com',
    ],
    answerIndex: 2,
    explanationEn: 'In "paypal.secure-login.com", the registered root domain is "secure-login.com". "paypal" is merely a deceptive subdomain string.',
    explanationAr: 'في الرابط "paypal.secure-login.com"، النطاق الحقيقي المسجل هو "secure-login.com" بينما كلمة paypal مجرد نطاق فرعي وضعه المحتال لخداعك.',
  },
  {
    id: 3,
    questionEn: 'A website displays a secure padlock icon and HTTPS in the address bar. Does this guarantee that the website is safe and legitimate?',
    questionAr: 'يظهر في شريط المتصفح رمز القفل المشفر وكلمة HTTPS بجانب العنوان. هل هذا يضمن أن الموقع آمن وموثوق بنسبة 100%؟',
    optionsEn: [
      'Yes, always. The padlock proves the company identity was verified',
      'No, HTTPS only means communication is encrypted; phishing sites can easily obtain SSL certificates too',
      'Yes, as long as the padlock turns green',
      'Only on desktop computers, not on mobile screens',
    ],
    optionsAr: [
      'نعم دائماً؛ رمز القفل يثبت أن هوية الشركة قد تم فحصها رسمياً',
      'لا؛ HTTPS يعني فقط أن الاتصال مشفر، ويمكن للمواقع الاحتيالية استخراج شهادة أمان مجانية بسهولة',
      'نعم بشرط أن يكون لون القفل أخضر',
      'يضمن الأمان على أجهزة الكمبيوتر فقط وليس على الهواتف',
    ],
    answerIndex: 1,
    explanationEn: 'HTTPS encrypts the transit pipe between you and the server, preventing eavesdropping. Attackers can obtain free SSL certificates for fake phishing domains just as easily as legitimate sites.',
    explanationAr: 'شهادة HTTPS تعني فقط تشفير البيانات بينك وبين الخادم لحمايتها من التنصت، ولكنها لا تضمن نزاهة صاحب الموقع؛ فالمحتالون يحصلون على شهادات أمان مجانية لمواقعهم الخبيثة بكل سهولة.',
  },
  {
    id: 4,
    questionEn: 'Your "manager" emails from a free Gmail address urgently demanding you purchase electronic gift cards for client gifts. What is this?',
    questionAr: 'أرسل "مديرك المباشر" بريداً من حساب Gmail مجاني يطلب منك شراء بطاقات هدايا رقمية عاجلة للعملاء. ماذا يمثل هذا؟',
    optionsEn: [
      'A normal request if your manager is travelling out of office',
      'A classic Whaling / Business Email Compromise (BEC) attack',
      'A routine quarterly IT network latency test',
      'Completely safe if the manager’s profile photo matches',
    ],
    optionsAr: [
      'طلب اعتيادي وطبيعي إذا كان المدير مسافراً في مهمة عمل',
      'هجوم كلاسيكي لانتحال هوية المسؤولين (Whaling / Business Email Compromise)',
      'اختبار روتيني تجريه إدارة الشبكات لقياس سرعة الاستجابة',
      'طلب آمن تماماً طالما أن الصورة الشخصية مطابقة لصورة المدير',
    ],
    answerIndex: 1,
    explanationEn: 'Urgency, unusual payment mechanisms (gift cards or wire transfers), and an external free webmail address are textbook signs of executive impersonation scams.',
    explanationAr: 'الاستعجال الشديد، وطلب وسائل دفع غير قابلة للاسترداد كبطاقات الهدايا، واستخدام بريد إلكتروني مجاني خارجي هي العلامات النموذجية لهجمات انتحال المدراء (BEC).',
  },
  {
    id: 5,
    questionEn: 'Which of the following is LEAST likely to be a typical red flag for phishing?',
    questionAr: 'أي من الخيارات التالية يُعد الأقل احتمالاً لأن يكون علامة خطر تدل على التصيد؟',
    optionsEn: [
      'A generic greeting such as "Dear valued user"',
      'A threatening deadline warning of imminent account termination',
      'An expected message from a known colleague linking to your company’s official internal portal',
      'A misspelled company name such as "Netfl1x Support"',
    ],
    optionsAr: [
      'تحية عامة مبهمة مثل "عزيزنا المستخدم المقدر"',
      'تهديد عاجل بإغلاق الحساب خلال مهلة قصيرة',
      'رسالة منتظرة ومتوقعة من زميل معروف تحتوي على رابط البوابة الداخلية الرسمية لشركتكم',
      'اسم شركة مكتوب بحروف مشوهة مثل "Netfl1x Support"',
    ],
    answerIndex: 2,
    explanationEn: 'While vigilance is always prudent, an expected communication from a recognized colleague directing to your authenticated internal corporate domain is the safest scenario.',
    explanationAr: 'رغم ضرورة الحذر الدائم، فإن رسالة متوقعة من زميل عمل معروف تشير إلى النطاق الداخلي الرسمي المعتمد للشركة هي الخيار الأكثر أماناً.',
  },
  {
    id: 6,
    questionEn: 'Someone calls your desk phone claiming to be internal IT support and requests the one-time passcode (OTP) just sent to your phone. What should you do?',
    questionAr: 'اتصل بك شخص يدعي أنه من الدعم الفني الداخلي وطلب منك قراءة رمز التحقق المؤقت (OTP) الذي وصل لهاتفك الآن. ما هو الإجراء السليم؟',
    optionsEn: [
      'Provide it immediately because IT created the corporate accounts',
      'Refuse, hang up immediately, and report the call to the official security hotline',
      'Give them only the first three numbers of the six-digit code',
      'Ask them to email you the request first before telling them',
    ],
    optionsAr: [
      'إعطاؤه الرمز فوراً لأن الدعم الفني هو من أنشأ الحساب من الأساس',
      'الرفض فوراً، وإنهاء المكالمة، وإبلاغ الخط الساخن المعتمد لأمن المعلومات',
      'إعطاؤه نصف الرمز فقط (أول ثلاثة أرقام) للتأكد من حسن نيته',
      'مطالبته بإرسال طلب رسمي عبر البريد قبل إخباره بالرمز شفهياً',
    ],
    answerIndex: 1,
    explanationEn: 'One-time passwords are meant solely for the end user and should NEVER be shared with anyone over voice or chat. This is a voice phishing (vishing) credential harvesting attempt.',
    explanationAr: 'رموز التحقق المؤقتة مخصصة لك وحدك فقط ولا يجوز مشاركتها مع أي شخص سواء كان يدعي أنه دعم فني أو مدير. هذه محاولة تصيد صوتي (Vishing).',
  },
  {
    id: 7,
    questionEn: 'You accidentally clicked a suspicious link and typed your corporate password before realizing it was fake. What is your critical FIRST action?',
    questionAr: 'نقرت بالخطأ على رابط مريب وأدخلت كلمة مرورك قبل أن تنتبه إلى أن الموقع مزيف. ما هو أول إجراء عاجل يجب اتخاذه؟',
    optionsEn: [
      'Ignore it and hope the malicious server crashed',
      'Simply delete the phishing email from your inbox',
      'Immediately change the password from a secure device, enable MFA, and alert the IT security team',
      'Restart your computer and shut down the monitor',
    ],
    optionsAr: [
      'تجاهل الأمر والأمل في أن الخادم الخبيث لم يسجل البيانات',
      'حذف الرسالة الاحتيالية فقط من صندوق البريد',
      'تغيير كلمة المرور فوراً من جهاز آمن، وتفعيل التوثيق الثنائي، وإبلاغ فريق أمن المعلومات',
      'إعادة تشغيل الكمبيوتر وإطفاء الشاشة',
    ],
    answerIndex: 2,
    explanationEn: 'Time is critical. Attackers often automate credential usage within minutes. Changing your password from a clean device invalidates the stolen token, and notifying IT allows them to revoke active tokens.',
    explanationAr: 'عامل الوقت حاسم؛ فالمهاجمون يستخدمون البيانات المسروقة خلال دقائق. تغيير كلمة المرور فوراً من جهاز آمن يبطل مفعول البيانات المسروقة، وإبلاغ فريق الأمن يتيح لهم عزل أي جلسات مشبوهة.',
  },
  {
    id: 8,
    questionEn: 'Which combination of habits provides the strongest personal defense against modern phishing threats?',
    questionAr: 'أي من الممارسات التالية توفر أقوى درع حماية شخصي ضد هجمات التصيد الحديثة؟',
    optionsEn: [
      'Using the same complex password across all accounts so you never forget it',
      'Enabling Multi-Factor Authentication (MFA), deploying a password manager, and inspecting URL domains before clicking',
      'Opening email attachments quickly before virus definitions update',
      'Trusting any email where the sender display name matches a recognized brand logo',
    ],
    optionsAr: [
      'استخدام نفس كلمة المرور المعقدة في كل المواقع حتى لا تنساها',
      'تفعيل التوثيق الثنائي (MFA)، واستخدام مدير كلمات المرور، والتحقق من النطاق الحقيقي قبل النقر',
      'فتح مرفقات البريد بسرعة قبل أن تتغير تعريفات الفيروسات',
      'الوثوق بأي رسالة طالما أن اسم العرض وشعار الشركة يبدوان مطابقين للأصل',
    ],
    answerIndex: 1,
    explanationEn: 'MFA ensures stolen passwords cannot be used alone, password managers refuse to fill credentials on spoofed domains, and inspecting URLs stops you from walking into traps.',
    explanationAr: 'التوثيق الثنائي يمنع استغلال كلمة المرور بمفردها، ومدير كلمات المرور يرفض التعبئة في النطاقات المزيفة، وفحص الروابط يحميك من الوقوع في الفخاخ من البداية.',
  },
];
