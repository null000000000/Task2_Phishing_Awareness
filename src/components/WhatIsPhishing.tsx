import React, { useState } from 'react';
import { Mail, Target, Smartphone, PhoneCall, Building2, Globe, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { PHISHING_TYPES, Language } from '../data/trainingData';

interface WhatIsPhishingProps {
  lang: Language;
}

export const WhatIsPhishing: React.FC<WhatIsPhishingProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail':
        return <Mail className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'Target':
        return <Target className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <section id="what" className="py-16 md:py-20 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-teal-600 dark:text-teal-400 mb-2">
            {isAr ? 'المحور الأول: المفهوم والأنواع' : 'Module 01: Concept & Attack Vectors'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 [text-wrap:balance]">
            {isAr ? 'ما هو التصيد الاحتيالي (Phishing)؟' : 'What is Phishing?'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'التصيد هو هجوم إلكتروني يتظاهر فيه المعتدي بأنه جهة أو شخص موثوق (بنك، مديرك في العمل، شركة شحن، أو جهة حكومية) للإيقاع بك ودفعك لتسليم كلمات المرور، أو الأموال، أو البيانات الشخصية، أو لتثبيت برمجيات خبيثة على جهازك. وعلى الرغم من أنه يبدأ غالباً عبر البريد، إلا أن الحيل تتكرر عبر مسارات وقنوات متعددة.'
              : 'Phishing is a social engineering cyber attack where an adversary masquerades as a trusted entity (a bank, your employer, a shipping carrier, or IT support) to manipulate you into relinquishing credentials, confidential financial data, or deploying malware. While historically delivered via email, modern threat actors exploit multi-channel deception.'}
          </p>
        </div>

        {/* 6 Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PHISHING_TYPES.map((type, idx) => {
            const isExpanded = selectedType === type.id;
            return (
              <div
                key={type.id}
                className={`bg-white dark:bg-slate-900 border rounded-xl transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-teal-500 dark:border-teal-400 shadow-md ring-1 ring-teal-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
                }`}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      {getIcon(type.icon)}
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {isAr ? type.titleAr : type.titleEn}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {isAr ? type.summaryAr : type.summaryEn}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedType(isExpanded ? null : type.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded py-1"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? (isAr ? 'إخفاء المثال' : 'Hide Scenario') : (isAr ? 'عرض مثال واقعي' : 'View Real Scenario')}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-800/50 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        {isAr ? 'سيناريو الهجوم النموذجي:' : 'Typical Attack Scenario:'}
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                        {isAr ? type.exampleAr : type.exampleEn}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
