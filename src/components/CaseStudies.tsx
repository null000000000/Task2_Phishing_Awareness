import React, { useState } from 'react';
import { History, DollarSign, Building, AlertCircle, ShieldAlert, Award } from 'lucide-react';
import { REAL_CASES, Language } from '../data/trainingData';

interface CaseStudiesProps {
  lang: Language;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [activeCaseId, setActiveCaseId] = useState<string>(REAL_CASES[0].id);

  const activeCase = REAL_CASES.find((c) => c.id === activeCaseId) || REAL_CASES[0];

  return (
    <section id="cases" className="py-16 md:py-20 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-teal-600 dark:text-teal-400 mb-2">
            {isAr ? 'المحور الخامس: قضايا واقعية من كبرى الشركات' : 'Module 05: Historic Real-World Breach Cases'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 [text-wrap:balance]">
            {isAr ? 'حتى عمالقة التكنولوجيا يسقطون في الفخ!' : 'Even Giants Fall: Real-World Case Studies'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'قد تظن أن التصيد ينطلي على المبتدئين فقط، لكن الواقع يثبت أن أكثر الشركات تقدماً وأفضلها تأميناً خسرت مئات الملايين بسبب نقرة واحدة متسرعة أو مكالمة هاتفية تم الوثوق بها دون تدقيق.'
              : 'Phishing is not confined to careless individuals. The most technologically sophisticated enterprises have lost hundreds of millions of dollars to a single rushed click or an unauthorized voice call.'}
          </p>
        </div>

        {/* Case Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {REAL_CASES.map((cs) => {
            const isActive = cs.id === activeCaseId;
            return (
              <button
                key={cs.id}
                type="button"
                onClick={() => setActiveCaseId(cs.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all border ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-teal-500 dark:text-slate-950 border-transparent shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span>{isAr ? cs.titleAr : cs.titleEn}</span>
                <span className="opacity-60 ml-1.5 text-xs font-mono">({cs.year})</span>
              </button>
            );
          })}
        </div>

        {/* Case Study Deep Dive Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold mb-1">
                <span>{activeCase.year}</span>
                <span aria-hidden="true">·</span>
                <span>{activeCase.vector}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {isAr ? activeCase.titleAr : activeCase.titleEn}
              </h3>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 shrink-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-500 dark:text-rose-400 block mb-0.5">
                {isAr ? 'حجم الخسائر والأثر:' : 'Documented Impact:'}
              </span>
              <span className="text-sm sm:text-base font-bold text-rose-700 dark:text-rose-300 font-mono">
                {isAr ? activeCase.impactAr : activeCase.impactEn}
              </span>
            </div>
          </div>

          {/* Narrative */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              {isAr ? 'تفاصيل الاختراق والمسار الهجومي:' : 'Breach Execution & Attack Sequence:'}
            </h4>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {isAr ? activeCase.descriptionAr : activeCase.descriptionEn}
            </p>
          </div>

          {/* Key Security Takeaway */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-1.5 flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>{isAr ? 'الدرس المستفاد للمؤسسات والأفراد:' : 'Core Defensive Takeaway:'}</span>
            </h4>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
              {isAr ? activeCase.keyTakeawayAr : activeCase.keyTakeawayEn}
            </p>
          </div>
        </div>

        {/* Global Lesson Callout (from assignment) */}
        <div className="mt-8 p-5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
            <strong>{isAr ? 'الخلاصة المستخلصة:' : 'Universal Lesson:'}</strong>{' '}
            {isAr
              ? 'الأنظمة التقنية المعقدة يمكن حمايتها بجدران نارية، لكن الخطأ البشري يظل المنفذ المفضل لكل المخترقين. نقرة واحدة متهورة أو مكالمة هاتفية واحدة دون تحقق تكفي لإسقاط منظومة بأكملها.'
              : 'Technical infrastructure can be reinforced with firewalls, but human fallibility remains an adversary’s highest-ROI attack surface. One careless click or trusted phone call is all it takes.'}
          </div>
        </div>
      </div>
    </section>
  );
};
