import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, ShieldCheck, AlertOctagon, RotateCcw } from 'lucide-react';
import { SAFETY_CHECKLIST, EMERGENCY_STEPS, Language } from '../data/trainingData';
import { calculateChecklistProgress } from '../utils/phishingLogic';

interface SafetyChecklistProps {
  lang: Language;
}

const STORAGE_KEY = 'codealpha_phish_checklist';

export const SafetyChecklist: React.FC<SafetyChecklistProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['pause', 'hover', 'never_share'];
    } catch {
      return ['pause', 'hover', 'never_share'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    } catch {
      // ignore
    }
  }, [checkedIds]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setCheckedIds(SAFETY_CHECKLIST.map((c) => c.id));
  };

  const handleReset = () => {
    setCheckedIds([]);
  };

  const progress = calculateChecklistProgress(checkedIds.length, SAFETY_CHECKLIST.length);

  return (
    <section id="tips" className="py-16 md:py-20 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-teal-600 dark:text-teal-400 mb-2">
            {isAr ? 'المحور السادس: أفضل الممارسات وطوارئ الاختراق' : 'Module 06: Best Practices & Incident Response'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 [text-wrap:balance]">
            {isAr ? 'إجراءات الحماية وقائمة الأمان اليومية' : 'Best Practices to Stay Safe'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'الأمن السيبراني عادة مستمرة وليس إجراءً لمرة واحدة. حدد الإجراءات التي تطبقها في حياتك اليومية لمعرفة مستوى مناعتك الرقمية، واطلع على خطة الطوارئ الفورية إذا نقرت على رابط مشبوه بالخطأ.'
              : 'Cyber hygiene is an active operational discipline. Check off the security defenses you currently maintain to benchmark your cyber defense posture, and review the immediate incident response protocol below.'}
          </p>
        </div>

        {/* Interactive Checklist Dashboard */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAr ? 'قائمة الفحص والتحصين الشخصي' : 'Personal Security Health Score'}
                </h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'مستوى الحماية الحالي:' : 'Current Defense Posture:'}{' '}
                <strong className="text-teal-600 dark:text-teal-400">
                  {isAr ? progress.levelAr : progress.levelEn}
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xl font-bold text-slate-900 dark:text-white tabular-nums">
                {progress.completedCount} / {progress.totalCount} ({progress.percentage}%)
              </span>
              <button
                type="button"
                onClick={handleSelectAll}
                className="px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
              >
                {isAr ? 'تحديد الكل' : 'Select All'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors"
                title={isAr ? 'إعادة ضبط' : 'Reset'}
                aria-label={isAr ? 'إعادة ضبط' : 'Reset'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-teal-600 dark:bg-teal-500 rounded-full transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>

          {/* Checklist Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAFETY_CHECKLIST.map((item) => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? 'bg-teal-50/50 dark:bg-teal-950/20 border-teal-300 dark:border-teal-800/80 shadow-xs'
                      : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300'
                  }`}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleItem(item.id);
                    }
                  }}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isChecked ? 'text-teal-950 dark:text-teal-200' : 'text-slate-900 dark:text-white'}`}>
                      {isAr ? item.titleAr : item.titleEn}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                      {isAr ? item.descAr : item.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Emergency Protocol ("If you already clicked") */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {isAr ? 'ماذا تفعل إذا وقعت في الفخ ونقرت بالفعل؟' : 'Incident Response: If You Already Clicked'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EMERGENCY_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm relative overflow-hidden"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-mono font-bold text-xs flex items-center justify-center mb-3">
                  0{step.step}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  {isAr ? step.titleAr : step.titleEn}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isAr ? step.descAr : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
