import React from 'react';
import { ArrowRight, ShieldCheck, MailCheck, Terminal, Award } from 'lucide-react';
import { Language } from '../data/trainingData';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-100/60 via-slate-50 to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Academic / Internship Context Kicker (Zero-Pill Discipline: clean inline text) */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-teal-700 dark:text-teal-400 mb-4">
          <span>{isAr ? 'برنامج التدريب الأمني' : 'CodeAlpha Cyber Security Internship'}</span>
          <span aria-hidden="true">·</span>
          <span>{isAr ? 'المهمة الثانية: التوعية بالتصيد' : 'Task 2: Phishing Awareness'}</span>
          <span aria-hidden="true">·</span>
          <span>{isAr ? 'وحدة تفاعلية شاملة' : 'Interactive Training Lab'}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-5 [text-wrap:balance]">
              {isAr
                ? 'لا تبتلع الطعم: دليلك العملي لاكتشاف التصيد والاحتيال الرقمي'
                : 'Don’t Take the Bait: Modern Phishing Defense & Awareness'}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl">
              {isAr
                ? 'وحدة تدريبية تفاعلية مصممة لتمكينك من فحص رسائل البريد المشبوهة، وتحليل النطاقات المزيفة، وفهم الدوافع النفسية التي يستغلها المهاجمون، مع خطة طوارئ عملية واختبار للحصول على شهادة إتمام.'
                : 'An interactive hands-on training module exploring email indicators, deceptive domain dissection, attacker psychology, historic high-impact breaches, and an emergency response protocol with a verified certificate.'}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#email"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg shadow-sm hover:shadow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                <MailCheck className="w-4 h-4" />
                <span>{isAr ? 'جرب فحص الإيميل التفاعلي' : 'Launch Email Simulator'}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </a>

              <a
                href="#quiz"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{isAr ? 'اختبر معلوماتك واحصل على الشهادة' : 'Test Knowledge & Certify'}</span>
              </a>
            </div>
          </div>

          {/* Quick Interactive Preview Card (Cyber Lab Console) */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {isAr ? 'ملخص محاور التدريب' : 'Curriculum Modules'}
                  </span>
                </div>
                <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                  {isAr ? '7 محاور رئيسية' : '7 Core Axes'}
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="w-5 h-5 rounded-md bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 font-mono font-semibold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {isAr ? 'تشريح هجمات التصيد ومساراتها' : 'Anatomy & Attack Vectors'}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      {isAr ? '6 أنواع من التصيد (بريد، موجه، صوتي، رسائل، حيتان، مواقع مستنسخة).' : '6 attack vectors covering email, spear, smishing, vishing, whaling, & clone sites.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="w-5 h-5 rounded-md bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 font-mono font-semibold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {isAr ? 'محاكي فحص الرسائل والروابط الحية' : 'Live Interactive Inspection'}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      {isAr ? '6 علامات خطر تفاعلية ومحلل نطاقات فوري لفحص الخداع البصري.' : '6 clickable red flags in realistic mail client + live domain parsing sandbox.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="w-5 h-5 rounded-md bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 font-mono font-semibold flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {isAr ? 'سيكولوجية الهجوم والدروس التاريخية' : 'Psychology & Historic Cases'}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      {isAr ? 'الدوافع الـ 6، وتحليل اختراق جوجل وفيسبوك وتويتر وRSA.' : '6 psychological triggers + lessons from Google, Twitter, RSA, & Target breaches.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{isAr ? 'معتمد وفق معايير أمن المعلومات' : 'Aligned with Cybersecurity Best Practices'}</span>
                </span>
                <span className="font-mono text-teal-600 dark:text-teal-400 font-semibold">100% Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Stat Metric Row (Zero Pill Discipline: tabular numbers with natural labels) */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              6
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              {isAr ? 'أنماط تصيد رئيسية' : 'Phishing Vectors'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              6/6
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              {isAr ? 'علامات خطر تفاعلية' : 'Interactive Red Flags'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              4
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              {isAr ? 'قضايا اختراق واقعية' : 'Historic Case Studies'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400 font-mono tabular-nums">
              8 Qs
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              {isAr ? 'اختبار وشهادة إتمام' : 'Quiz & Certificate'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
