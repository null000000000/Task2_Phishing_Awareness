/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatIsPhishing } from './components/WhatIsPhishing';
import { EmailSimulator } from './components/EmailSimulator';
import { DomainInspector } from './components/DomainInspector';
import { SocialEngineering } from './components/SocialEngineering';
import { CaseStudies } from './components/CaseStudies';
import { SafetyChecklist } from './components/SafetyChecklist';
import { QuizSection } from './components/QuizSection';
import { Footer } from './components/Footer';
import { Language } from './data/trainingData';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('phish_lang');
      return saved === 'en' || saved === 'ar' ? saved : 'ar';
    } catch {
      return 'ar';
    }
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('phish_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [activeSection, setActiveSection] = useState<string>('what');

  // Sync RTL / LTR and HTML lang
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('phish_lang', lang);
    } catch {
      // ignore
    }
  }, [lang]);

  // Sync Dark mode class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('phish_theme', 'dark');
      } catch {
        // ignore
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('phish_theme', 'light');
      } catch {
        // ignore
      }
    }
  }, [isDark]);

  // Section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['what', 'email', 'web', 'social', 'cases', 'tips', 'quiz'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleToggleDark = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        isDark={isDark}
        onToggleDark={handleToggleDark}
        activeSection={activeSection}
      />

      <main className="flex-1">
        <Hero lang={lang} />
        <WhatIsPhishing lang={lang} />
        <EmailSimulator lang={lang} />
        <DomainInspector lang={lang} />
        <SocialEngineering lang={lang} />
        <CaseStudies lang={lang} />
        <SafetyChecklist lang={lang} />
        <QuizSection lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
