import React from 'react';
import { Shield, Sun, Moon, Award } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleDark,
  activeSection,
}) => {
  const navLinks = [
    { id: 'what', label: 'Overview' },
    { id: 'email', label: 'Email Lab' },
    { id: 'web', label: 'Domains' },
    { id: 'social', label: 'Psychology' },
    { id: 'cases', label: 'Case Studies' },
    { id: 'tips', label: 'Checklist' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line) */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-600 dark:bg-teal-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4" />
          </div>
          <span>CodeAlpha PhishGuard</span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-teal-600 dark:hover:text-teal-400 py-1 ${
                  isActive
                    ? 'text-teal-600 dark:text-teal-400 font-semibold border-b-2 border-teal-600 dark:border-teal-400'
                    : ''
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary action + theme toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleDark}
            type="button"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <a
            href="#quiz"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Take Quiz</span>
          </a>
        </div>
      </div>
    </header>
  );
};
