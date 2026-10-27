import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 dark:bg-teal-500 text-white flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                CodeAlpha Cyber Security Internship
              </div>
              <div className="text-xs text-slate-500">
                Task 2: Phishing Awareness Training Module
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="#what" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Overview
            </a>
            <a href="#email" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Email Lab
            </a>
            <a href="#web" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Domain Lab
            </a>
            <a href="#quiz" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Quiz
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>
            Developed for the CodeAlpha Cyber Security Internship. All simulations are for educational security training purposes.
          </p>
          <p className="font-mono text-[11px] opacity-75">v2.0 · PhishAware</p>
        </div>
      </div>
    </footer>
  );
};
