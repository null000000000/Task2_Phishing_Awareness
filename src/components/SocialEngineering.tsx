import React, { useState } from 'react';
import { Brain, Clock, ShieldAlert, UserCheck, Gift, HeartHandshake, Disc, ChevronRight } from 'lucide-react';
import { SOCIAL_TACTICS } from '../data/trainingData';

export const SocialEngineering: React.FC = () => {
  const [activeTacticId, setActiveTacticId] = useState<string>(SOCIAL_TACTICS[0].id);

  const getTacticIcon = (id: string) => {
    switch (id) {
      case 'urgency':
        return <Clock className="w-4 h-4 text-rose-500" />;
      case 'fear':
        return <ShieldAlert className="w-4 h-4 text-amber-500" />;
      case 'authority':
        return <UserCheck className="w-4 h-4 text-blue-500" />;
      case 'greed':
        return <Gift className="w-4 h-4 text-purple-500" />;
      case 'trust':
        return <HeartHandshake className="w-4 h-4 text-emerald-500" />;
      case 'pretexting':
        return <Disc className="w-4 h-4 text-teal-500" />;
      default:
        return <Brain className="w-4 h-4 text-teal-500" />;
    }
  };

  const activeTactic = SOCIAL_TACTICS.find((t) => t.id === activeTacticId) || SOCIAL_TACTICS[0];

  return (
    <section id="social" className="py-16 md:py-20 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-teal-600 dark:text-teal-400 mb-2">
            Module 04: The Psychology of Social Engineering
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 [text-wrap:balance]">
            Social Engineering: Hacking the Human Mind
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Phishing exploits human cognitive vulnerabilities rather than software bugs. Threat actors weaponize psychological triggers to induce an emotional reflex that overrides logical suspicion. Understand these six cognitive levers.
          </p>
        </div>

        {/* Interactive Master-Detail Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Tactic Selector List (5 Cols) */}
          <div className="lg:col-span-5 space-y-2">
            {SOCIAL_TACTICS.map((tactic) => {
              const isSelected = tactic.id === activeTacticId;
              return (
                <button
                  key={tactic.id}
                  type="button"
                  onClick={() => setActiveTacticId(tactic.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-teal-500 dark:border-teal-400 shadow-sm ring-1 ring-teal-500/20'
                      : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      {getTacticIcon(tactic.id)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {tactic.title}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block truncate max-w-[200px] sm:max-w-xs">
                        {tactic.quote}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isSelected ? 'text-teal-600 dark:text-teal-400 transform translate-x-0.5' : ''
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center">
                  {getTacticIcon(activeTactic.id)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {activeTactic.title}
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                Behavioral Analysis
              </span>
            </div>

            {/* Attacker Bait Quote */}
            <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Attacker Bait Hook / Phrase:
              </span>
              <p className="text-sm sm:text-base font-semibold text-rose-600 dark:text-rose-400 italic">
                "{activeTactic.quote}"
              </p>
            </div>

            {/* Cognitive Mechanism */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Cognitive Vulnerability Targeted:
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeTactic.description}
                </p>
              </div>

              {/* Defensive Countermeasure */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">
                  The Golden Rule of Defense:
                </h4>
                <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
                  {activeTactic.defense}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
