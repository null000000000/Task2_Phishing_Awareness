import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, Printer, ShieldCheck, Sparkles, User } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/trainingData';
import { calculateQuizResult, QuizEvaluation } from '../utils/phishingLogic';

export const QuizSection: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [candidateName, setCandidateName] = useState<string>('Cybersecurity Trainee');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(userAnswers).length;
  const isCompleted = answeredCount === totalQuestions;

  // Calculate score
  const correctCount = QUIZ_QUESTIONS.reduce((acc, q) => {
    return userAnswers[q.id] === q.answerIndex ? acc + 1 : acc;
  }, 0);

  const evaluation: QuizEvaluation = calculateQuizResult(correctCount, totalQuestions);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (userAnswers[questionId] !== undefined) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowCertificate(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="quiz" className="py-16 md:py-20 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-teal-600 dark:text-teal-400 mb-2">
            Module 07: Knowledge Assessment & Certification
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 [text-wrap:balance]">
            Test Yourself: Phishing Defense Quiz
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Eight scenario-based questions. Select your answer to receive immediate analysis. Achieving 75% or higher unlocks your Certificate of Completion.
          </p>
        </div>

        {/* Quiz Progress & Score Header */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 mb-8 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              Questions Answered:{' '}
              <strong className="font-mono text-teal-600 dark:text-teal-400">
                {answeredCount} / {totalQuestions}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {answeredCount > 0 && (
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                Score: {correctCount} / {answeredCount}
              </span>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const userAnswer = userAnswers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = isAnswered && userAnswer === q.answerIndex;
            const options = q.options;

            return (
              <div
                key={q.id}
                className={`bg-white dark:bg-slate-900 border rounded-2xl p-5 sm:p-6 shadow-sm transition-all ${
                  isAnswered
                    ? isCorrect
                      ? 'border-emerald-300 dark:border-emerald-800/80'
                      : 'border-rose-300 dark:border-rose-800/80'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    <span className="text-teal-600 dark:text-teal-400 font-mono mr-2">
                      0{idx + 1}.
                    </span>
                    {q.question}
                  </h3>
                  {isAnswered && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      )}
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {options.map((optText, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    const isTheCorrectOption = optIdx === q.answerIndex;

                    let optionStyle =
                      'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';

                    if (isAnswered) {
                      if (isTheCorrectOption) {
                        optionStyle =
                          'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-semibold';
                      } else if (isSelected && !isTheCorrectOption) {
                        optionStyle =
                          'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-800 text-rose-900 dark:text-rose-200 line-through';
                      } else {
                        optionStyle =
                          'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        data-testid={`quiz-opt-${q.id}-${optIdx}`}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-colors flex items-center justify-between gap-3 ${optionStyle}`}
                      >
                        <span>{optText}</span>
                        {isAnswered && isTheCorrectOption && (
                          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                            Correct Answer
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation text */}
                {isAnswered && (
                  <div
                    className={`mt-4 pt-3.5 border-t text-xs sm:text-sm leading-relaxed ${
                      isCorrect
                        ? 'border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300'
                        : 'border-rose-100 dark:border-rose-900/40 text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    <strong>{isCorrect ? 'Correct! ' : 'Not quite. '}</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Results Banner when completed */}
        {isCompleted && (
          <div className="mt-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-teal-100 dark:bg-teal-950/50 flex items-center justify-center mb-4">
              <Award className="w-7 h-7 text-teal-600 dark:text-teal-400" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {evaluation.title}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-4">
              {evaluation.feedback}
            </p>

            <div className="font-mono text-3xl font-extrabold text-teal-600 dark:text-teal-400 mb-6 tabular-nums">
              {evaluation.score} / {evaluation.total} ({evaluation.percentage}%)
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {evaluation.passed && (
                <button
                  type="button"
                  data-testid="toggle-certificate-btn"
                  onClick={() => setShowCertificate(!showCertificate)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-xl shadow-sm transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {showCertificate ? 'Hide Certificate' : 'View & Print Certificate'}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}

        {/* Printable Certificate */}
        {isCompleted && evaluation.passed && showCertificate && (
          <div className="mt-8 space-y-4">
            {/* Candidate Name Input */}
            <div className="p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label htmlFor="student-name-input" className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Candidate Name on Certificate:</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="student-name-input"
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  placeholder="Enter your name"
                />
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-teal-500 dark:hover:bg-teal-600 dark:text-slate-950 rounded-lg shadow-sm transition-colors whitespace-nowrap"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
              </div>
            </div>

            {/* Certificate Frame */}
            <div
              id="printable-certificate"
              className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl border-4 border-double border-teal-800 shadow-xl relative overflow-hidden"
            >
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-teal-800" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-teal-800" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-teal-800" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-teal-800" />

              <div className="text-center space-y-4">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-teal-800 text-white flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                </div>

                <div className="text-xs font-mono font-bold tracking-widest text-teal-800 uppercase">
                  CodeAlpha Cyber Security Internship · Task 2
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  CERTIFICATE OF COMPLETION
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider">
                  This is proudly presented to
                </p>

                <div className="text-2xl sm:text-3xl font-bold text-teal-900 underline decoration-teal-500 underline-offset-8 py-1">
                  {candidateName || 'Cybersecurity Specialist'}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  for successfully mastering the Phishing Awareness Training curriculum, identifying email red flags, analyzing malicious domains, and passing the comprehensive cybersecurity assessment.
                </p>

                <div className="pt-6 mt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">Verification Seal: CA-PHISH-2026</div>
                    <div>Score Achieved: {evaluation.score} / {evaluation.total} ({evaluation.percentage}%)</div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-slate-800">Issued for: CodeAlpha Internship</div>
                    <div>Date: {new Date().toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
