import React, { useState } from 'react';
import { Mail, CheckCircle2, RotateCcw, Eye, AlertTriangle, Paperclip, ShieldAlert, Sparkles } from 'lucide-react';
import { EMAIL_FLAGS, Language, RedFlagItem } from '../data/trainingData';

interface EmailSimulatorProps {
  lang: Language;
}

export const EmailSimulator: React.FC<EmailSimulatorProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [foundFlags, setFoundFlags] = useState<number[]>([]);
  const [activeFlag, setActiveFlag] = useState<RedFlagItem | null>(null);

  const toggleFlag = (id: number) => {
    const item = EMAIL_FLAGS.find((f) => f.id === id);
    if (!item) return;

    if (!foundFlags.includes(id)) {
      setFoundFlags((prev) => [...prev, id]);
    }
    setActiveFlag(item);
  };

  const handleRevealAll = () => {
    setFoundFlags(EMAIL_FLAGS.map((f) => f.id));
    setActiveFlag(EMAIL_FLAGS[0]);
  };

  const handleReset = () => {
    setFoundFlags([]);
    setActiveFlag(null);
  };

  const totalFlags = EMAIL_FLAGS.length;
  const foundCount = foundFlags.length;
  const isAllFound = foundCount === totalFlags;

  return (
    <section id="email" className="py-16 md:py-20 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-teal-600 dark:text-teal-400 mb-2">
            {isAr ? 'المحور الثاني: فحص رسائل البريد الإلكتروني' : 'Module 02: Interactive Email Inspection'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 [text-wrap:balance]">
            {isAr ? 'كيف تكتشف رسالة البريد الاحتيالية؟' : 'How to Recognize a Phishing Email'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'أمامك نموذج واقعي لرسالة تصيد نموذجية. انقر على الأجزاء المشبوهة (المحددة بخطوط متقطعة) لتشريح علامات الخطر واكتشاف الثغرات التي يعتمد عليها المهاجم.'
              : 'Below is a replica of a deceptive phishing attack. Tap or click every suspicious element (underlined with dashed marks) to uncover why security analysts flag it as dangerous.'}
          </p>
        </div>

        {/* Progress & Controls Header */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 mb-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <span>
                  {isAr ? 'علامات الخطر المكتشفة:' : 'Red Flags Identified:'}{' '}
                  <strong className="font-mono text-rose-600 dark:text-rose-400">
                    {foundCount} / {totalFlags}
                  </strong>
                </span>
              </span>
              {isAllFound && (
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>{isAr ? 'أحسنت! كشفت كل الحيل' : 'All flags detected!'}</span>
                </span>
              )}
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isAllFound ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
                style={{ width: `${(foundCount / totalFlags) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRevealAll}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isAr ? 'كشف الكل' : 'Reveal All'}</span>
            </button>
            <button
              onClick={handleReset}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isAr ? 'إعادة تعيين' : 'Reset'}</span>
            </button>
          </div>
        </div>

        {/* Email Client Layout & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Email Container (8 Cols) */}
          <div dir="ltr" className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden text-left">
            {/* Mail Client Header / Top Bar */}
            <div className="px-5 py-3.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Inbox · PayPal Notifications</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
              </div>
            </div>

            {/* Email Meta Headers (Sender, Subject) */}
            <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 w-16 shrink-0 font-mono">
                  From:
                </span>
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => toggleFlag(0)}
                    className={`text-left inline-block px-1.5 py-0.5 rounded transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 font-mono text-xs sm:text-sm ${
                      foundFlags.includes(0)
                        ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-b-2 border-rose-500'
                        : 'border-b-2 border-dashed border-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    PayPal Support &lt;service@paypa1-security.com&gt;
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 w-16 shrink-0 font-mono">
                  Subject:
                </span>
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => toggleFlag(1)}
                    className={`text-left inline-block px-1.5 py-0.5 rounded transition-all font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                      foundFlags.includes(1)
                        ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-b-2 border-rose-500'
                        : 'border-b-2 border-dashed border-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-900 dark:text-white'
                    }`}
                  >
                    URGENT: Your account will be closed in 24 hours!
                  </button>
                </div>
              </div>
            </div>

            {/* Email Body Content */}
            <div className="p-5 sm:p-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
              <p>
                <button
                  type="button"
                  onClick={() => toggleFlag(2)}
                  className={`px-1.5 py-0.5 rounded transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                    foundFlags.includes(2)
                      ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-b-2 border-rose-500'
                      : 'border-b-2 border-dashed border-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                  }`}
                >
                  Dear Customer,
                </button>
              </p>

              <p>
                We noticed unusual activity on your account.{' '}
                <button
                  type="button"
                  onClick={() => toggleFlag(3)}
                  className={`text-left inline px-1.5 py-0.5 rounded transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                    foundFlags.includes(3)
                      ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-b-2 border-rose-500'
                      : 'border-b-2 border-dashed border-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                  }`}
                >
                  Failure to verify your identity immediately will result in permanent suspension.
                </button>
              </p>

              <p>
                Please{' '}
                <button
                  type="button"
                  onClick={() => toggleFlag(4)}
                  className={`text-left font-mono text-xs sm:text-sm break-all px-1.5 py-0.5 rounded transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                    foundFlags.includes(4)
                      ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-b-2 border-rose-500'
                      : 'border-b-2 border-dashed border-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-teal-600 dark:text-teal-400 underline'
                  }`}
                >
                  click here: http://paypal.secure-login.verify-now.ru/account
                </button>{' '}
                and confirm your password and card number.
              </p>

              <div className="pt-2">
                <span className="text-slate-600 dark:text-slate-400 text-xs block mb-1.5">
                  {isAr ? 'المرفقات المرفقة مع الرسالة:' : 'Email Attachment:'}
                </span>
                <button
                  type="button"
                  onClick={() => toggleFlag(5)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                    foundFlags.includes(5)
                      ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border-rose-500'
                      : 'bg-slate-50 dark:bg-slate-800 border-dashed border-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <Paperclip className="w-3.5 h-3.5 text-rose-500" />
                  <span>Account_Statement.zip</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold text-[10px]">(340 KB)</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <p>{isAr ? 'شكراً لتعاونكم،' : 'Thank you,'}</p>
                <p className="font-semibold">{isAr ? 'فريق أمان الحسابات' : 'Security Team'}</p>
              </div>
            </div>
          </div>

          {/* Inspector Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  {isAr ? 'لوحة تحليل علامة الخطر' : 'Threat Intelligence Analysis'}
                </h3>
              </div>

              {activeFlag ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                      {isAr ? activeFlag.labelAr : activeFlag.labelEn}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Flag 0{activeFlag.id + 1}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 break-all">
                    "{activeFlag.textEn}"
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isAr ? activeFlag.explanationAr : activeFlag.explanationEn}
                  </p>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isAr ? 'تم تسجيل هذه النقطة في رصيدك' : 'Verified by defense prober'}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
                  <p className="mb-2">
                    {isAr
                      ? 'حدد أو انقر على أي جزء متقطع بالرسالة لعرض التحليل الأمني.'
                      : 'Click any dashed element inside the email client to inspect why it triggers an alert.'}
                  </p>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {isAr ? 'ابدأ بالمرسل أو الموضوع أو الرابط' : 'Try checking the sender address or link'}
                  </span>
                </div>
              )}
            </div>

            {/* Red Flag List Summary */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                {isAr ? 'قائمة المؤشرات الستة:' : 'The 6 Suspicious Indicators:'}
              </h4>
              <div className="space-y-2">
                {EMAIL_FLAGS.map((flag) => {
                  const isFound = foundFlags.includes(flag.id);
                  return (
                    <button
                      key={flag.id}
                      type="button"
                      onClick={() => toggleFlag(flag.id)}
                      className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        isFound
                          ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-medium'
                          : 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate pr-2">
                        {isAr ? flag.labelAr : flag.labelEn}
                      </span>
                      {isFound ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      ) : (
                        <span className="text-[10px] text-slate-400 shrink-0">Click</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Email Verification (from original assignment) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {isAr ? '1. فحص عنوان المرسل' : '1. Check the Sender'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'انظر إلى عنوان البريد الفعلي وليس الاسم المعروض فقط. راقب الأحرف المستبدلة (مثل paypa1) والنطاقات الغريبة أو الحسابات المجانية.'
                : 'Scrutinize the actual email address, not just the display name. Watch out for swapped letters (paypa1 instead of paypal) and non-corporate domains.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {isAr ? '2. فحص النبرة والأسلوب' : '2. Check the Tone'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'الاستعجال المبالغ فيه، التهديد بغلق الحساب خلال 24 ساعة، أو الوعود بالجوائز مصممة لدفعك لاتخاذ قرار سريع دون تفكير متأنٍ.'
                : 'Urgency, imminent deadlines, threats of closure, and unexpected prizes are psychological levers designed to bypass calm evaluation.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {isAr ? '3. فحص الروابط والملفات' : '3. Check Links & Files'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'مرر الفأرة فوق الروابط لمعرفة النطاق الحقيقي قبل النقر. وكن حذراً للغاية من ملفات ZIP وEXE ومستندات Office التي تطلب تفعيل الماكرو.'
                : 'Hover over hyperlinks before clicking to read destination hosts. Exercise extreme caution with ZIP archives, EXE installers, and macro-enabled documents.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
