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

export default function App() {
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

  // Enforce English lang and ltr
  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []);

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

  const handleToggleDark = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar
        isDark={isDark}
        onToggleDark={handleToggleDark}
        activeSection={activeSection}
      />

      <main className="flex-1">
        <Hero />
        <WhatIsPhishing />
        <EmailSimulator />
        <DomainInspector />
        <SocialEngineering />
        <CaseStudies />
        <SafetyChecklist />
        <QuizSection />
      </main>

      <Footer />
    </div>
  );
}
