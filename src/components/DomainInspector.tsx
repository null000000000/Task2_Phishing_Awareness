import React, { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, AlertTriangle, Lock, Unlock, HelpCircle } from 'lucide-react';
import { DOMAIN_EXAMPLES } from '../data/trainingData';
import { parseDomainUrl, ParsedUrlAnalysis } from '../utils/phishingLogic';

const PRESET_URLS = [
  'http://paypal.secure-login.verify-now.ru/account',
  'https://paypa1-security.com/login',
  'https://microsoft-support-center.net/case-3920',
  'https://amazon-deals.xyz/claim-prize',
  'https://accounts.google.com/signin',
  'https://www.paypal.com/signin',
];

export const DomainInspector: React.FC = () => {
  const [inputUrl, setInputUrl] = useState<string>(PRESET_URLS[0]);
  const analysis: ParsedUrlAnalysis = parseDomainUrl(inputUrl);

  return (
    <section id="web" className="py-16 md:py-20 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-teal-600 dark:text-teal-400 mb-2">
            Module 03: Fake Websites & Domain Anatomy
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 [text-wrap:balance]">
            How to Recognize a Fake Website
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Attackers replicate real website designs down to the exact pixel and font. The only attribute they cannot counterfeit is the legally registered root domain name. Read the URL from right to left, up to the first single slash.
          </p>
        </div>

        {/* Visual Right-to-Left Reading Guide */}
        <div className="mb-10 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>The Right-to-Left Domain Reading Rule:</span>
          </h3>

          <div dir="ltr" className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm sm:text-base overflow-x-auto flex flex-wrap items-center gap-1.5 text-left">
            <span className="text-slate-400 px-1 py-0.5 rounded bg-slate-50 dark:bg-slate-900">https://</span>
            <span className="text-rose-600 dark:text-rose-400 font-semibold px-1 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40">
              paypal.secure-login
            </span>
            <span className="text-slate-400">.</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-500/30">
              verify-now.ru
            </span>
            <span className="text-slate-400 px-1 py-0.5 rounded bg-slate-50 dark:bg-slate-900">/account/login</span>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
              <span>
                <strong>Subdomain:</strong> Deceptive bait string
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
              <span>
                <strong>Registered Root Domain:</strong> Where your data actually goes!
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-400 shrink-0" />
              <span>
                <strong>Path / Resource:</strong> Target page on server
              </span>
            </div>
          </div>
        </div>

        {/* Live URL Testing Sandbox */}
        <div className="mb-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>Live Domain Parser Sandbox</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Type any custom URL or click a preset sample below to dissect its structure in real-time.
              </p>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5">
              {PRESET_URLS.slice(0, 4).map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputUrl(sample)}
                  className="px-2.5 py-1 text-xs font-mono bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-colors whitespace-nowrap shrink-0"
                >
                  Sample 0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Input field */}
          <div className="relative mb-6">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://example.com/login"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 direction-ltr text-left"
            />
          </div>

          {/* Live Breakdown Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                Protocol
              </span>
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                {analysis.isHttps ? (
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Unlock className="w-3.5 h-3.5 text-rose-500" />
                )}
                <span>{analysis.protocol.toUpperCase()}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                Subdomain
              </span>
              <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 truncate block">
                {analysis.subdomain || '(none)'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                Registered Root Domain
              </span>
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 truncate block">
                {analysis.registeredDomain}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                Top Level Domain
              </span>
              <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                {analysis.tld}
              </span>
            </div>
          </div>

          {/* Assessment & Flags */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              analysis.riskLevel === 'danger'
                ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-rose-900 dark:text-rose-200'
                : analysis.riskLevel === 'warning'
                ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200'
                : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {analysis.riskLevel === 'danger' ? (
                <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
              ) : analysis.riskLevel === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              )}
              <div>
                <h4 className="text-sm font-bold">
                  {analysis.riskLevel === 'danger'
                    ? 'High Risk: Deceptive Phishing Indicators Detected!'
                    : analysis.riskLevel === 'warning'
                    ? 'Warning: Suspicious Indicators Present'
                    : 'Safe Domain: Structure Aligns with Legitimate Host'}
                </h4>
                {analysis.flags.length > 0 && (
                  <p className="text-xs mt-1 leading-relaxed opacity-90">
                    {analysis.flags[0].description}
                  </p>
                )}
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs opacity-75 block font-mono">Safety Score</span>
              <span className="text-xl font-bold font-mono tabular-nums">{analysis.riskScore} / 100</span>
            </div>
          </div>
        </div>

        {/* 4 Deception Tricks Comparison Table */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Common Domain Deception Tricks vs. Authentic Domains
          </h3>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  <th className="py-3.5 px-4">Deception Trick</th>
                  <th className="py-3.5 px-4">Fake Address</th>
                  <th className="py-3.5 px-4">Real Authentic Address</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Why it is dangerous</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs sm:text-sm">
                {DOMAIN_EXAMPLES.map((ex, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-sans font-semibold text-slate-900 dark:text-white">
                      {ex.trick}
                    </td>
                    <td className="py-3 px-4 text-rose-600 dark:text-rose-400 font-bold break-all">
                      {ex.fake}
                    </td>
                    <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold break-all">
                      {ex.real}
                    </td>
                    <td className="py-3 px-4 font-sans text-xs text-slate-500 dark:text-slate-400 hidden md:table-cell">
                      {ex.why}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3 Insights: Padlock Myth, Warning signs, Safe Habits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center mb-3">
              <Lock className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              The Padlock is NOT Proof of Safety
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              HTTPS only guarantees that the communication tunnel is encrypted against Wi-Fi sniffers. Threat actors acquire free SSL certificates for phishing sites in seconds. Always audit the root domain.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Secondary Warning Signs
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Pervasive grammatical typos, blurry low-resolution logos, aggressive pop-up overlays demanding credit card numbers, and landing pages reached solely via unverified links.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              The Safest Browsing Habit
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Never follow email links to sign in. Manually type the official address into your browser bar or use previously saved authenticated bookmarks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
