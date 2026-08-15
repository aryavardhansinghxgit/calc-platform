"use client";

import React, { useState } from "react";
import {
  BookOpen,
  HelpCircle,
  TrendingUp,
  DollarSign,
  PieChart as PieIcon,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Award,
  Clock,
  Layers,
  Globe,
  Lock,
  Landmark,
} from "lucide-react";

export function RothIraContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // EXACTLY 10 FAQs as required by user prompt
  const faqs = [
    {
      question: "What is a Roth IRA and how does it work?",
      answer: "A Roth IRA is an individual retirement account allowing after-tax contributions to grow 100% tax-free. Unlike Traditional IRAs, qualified withdrawals in retirement (after age 59½ and 5 years) are completely free from federal, state, and local income taxes.",
    },
    {
      question: "What are the 2025 and 2026 Roth IRA contribution limits?",
      answer: "For 2025, the annual Roth IRA contribution limit is $7,000 ($8,000 for individuals aged 50 and older). For 2026, the limit increases to $7,500 ($8,600 for age 50+ catch-up).",
    },
    {
      question: "What are the 2025 and 2026 MAGI income limits for a Roth IRA?",
      answer: "For single filers in 2025, the MAGI phase-out range is $146,000 to $161,000 ($165,000 to $180,000 in 2026). For married couples filing jointly, the 2025 phase-out range is $230,000 to $240,000 ($252,000 for 2026). Above these thresholds, direct contributions are ineligible.",
    },
    {
      question: "What is a Backdoor Roth IRA conversion?",
      answer: "High earners above MAGI limits can legally make non-deductible contributions to a Traditional IRA and immediately convert those funds into a Roth IRA. This creates a Backdoor Roth IRA, granting high earners full tax-free growth benefits.",
    },
    {
      question: "What is the 5-Year Holding Rule for Roth IRAs?",
      answer: "To withdraw investment earnings tax-free, 5 tax years must pass from the first tax year a contribution was made to any Roth IRA owned by the taxpayer, in addition to reaching age 59½ or meeting a qualified exemption.",
    },
    {
      question: "Can I withdraw my original Roth IRA contributions at any time?",
      answer: "Yes! Because Roth IRA contributions are made with after-tax dollars, you can withdraw 100% of your original contributed principal at any time, for any reason, completely tax-free and penalty-free without waiting for age 59½.",
    },
    {
      question: "Do Roth IRAs have Required Minimum Distributions (RMDs)?",
      answer: "No. Original Roth IRA owners are never required to take mandatory distributions during their lifetime. Funds can compound tax-free indefinitely and be passed down to heirs 100% tax-free.",
    },
    {
      question: "What is IRS Form 8880 Saver's Credit for Roth IRAs?",
      answer: "The Retirement Savings Contributions Credit (Saver's Credit) offers low-to-moderate income taxpayers a non-refundable tax credit of 10%, 20%, or 50% on the first $2,000 contributed to a Roth IRA ($1,000 max credit).",
    },
    {
      question: "How does a Roth IRA affect FAFSA college financial aid?",
      answer: "Assets held inside a Roth IRA are not reported as parental assets on the FAFSA (Free Application for Federal Student Aid), protecting eligibility for college financial aid.",
    },
    {
      question: "Why use an online Roth IRA Calculator?",
      answer: "An online Roth IRA calculator models compound tax-free accumulation against regular taxable accounts, computes tax savings ($0 tax on Roth vs $150k+ tax on taxable savings), enforces IRS limits, and projects retirement wealth.",
    },
  ];

  return (
    <div className="space-y-10 mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8 text-zinc-700 dark:text-zinc-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 text-emerald-400 font-semibold text-xs tracking-wider uppercase mb-2">
          <BookOpen className="h-4 w-4" /> The Tax-Free Wealth Masterclass
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          Roth IRA Compound Growth, Backdoor Conversions &amp; Tax-Free Income
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
          Created under the Taxpayer Relief Act of 1997 and named after Senator William Roth of Delaware, the Roth IRA is the premier vehicle for building tax-free multi-generational wealth. 
          Paying taxes on contributions today locks in 100% tax-free capital gains, dividends, and retirement distributions forever.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Section 1: History & Core Mechanics */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-600" /> 1. What Is a Roth IRA &amp; How It Works
          </h3>
          <p>
            Unlike Traditional IRAs or 401(k)s where contributions are tax-deductible up front but taxable upon withdrawal, a Roth IRA operates in reverse. 
            You contribute after-tax dollars today. In exchange, every single dollar of future compounding interest, stock appreciation, and dividend payout grows 100% tax-free.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-300 text-sm block">100% Tax-Free Earnings</span>
              <p className="text-zinc-600 dark:text-zinc-400">Withdraw capital gains and interest with zero federal, state, or local tax after age 59½.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl border border-blue-200 dark:border-blue-800 space-y-1">
              <span className="font-bold text-blue-700 dark:text-blue-300 text-sm block">Emergency Principal Access</span>
              <p className="text-zinc-600 dark:text-zinc-400">Withdraw 100% of your original principal contributions at any time without penalty or tax.</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-xl border border-purple-200 dark:border-purple-800 space-y-1">
              <span className="font-bold text-purple-700 dark:text-purple-300 text-sm block">No Lifetime RMDs</span>
              <p className="text-zinc-600 dark:text-zinc-400">Original owners are never forced to take mandatory distributions, preserving compound growth for life.</p>
            </div>
          </div>
        </div>

        {/* Section 2: 2025/2026 Contribution & MAGI Income Limits */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" /> 2. 2025 &amp; 2026 Contribution &amp; MAGI Income Thresholds
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Tax Year</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Base Cap (Under Age 50)</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Catch-Up Cap (Age 50+)</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Single MAGI Phase-Out</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Married Joint MAGI Phase-Out</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-sans tabular-nums">
                <tr>
                  <td className="p-3 font-bold text-blue-600">2025 Tax Year</td>
                  <td className="p-3">$7,000</td>
                  <td className="p-3 font-bold text-emerald-600">$8,000</td>
                  <td className="p-3">$146,000 – $161,000</td>
                  <td className="p-3">$230,000 – $240,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-600">2026 Tax Year</td>
                  <td className="p-3">$7,500</td>
                  <td className="p-3 font-bold text-emerald-600">$8,600</td>
                  <td className="p-3">$168,000 – $183,000</td>
                  <td className="p-3">$252,000 – $262,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Backdoor Roth Conversions */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" /> 3. Backdoor Roth IRA Strategy for High Income Earners
          </h3>
          <p>
            Taxpayers whose income exceeds IRS MAGI phase-out limits ($161k single / $240k married in 2025) cannot make direct Roth IRA contributions. 
            However, under current IRS tax code, high earners can use the <strong>Backdoor Roth IRA strategy</strong>:
          </p>
          <ol className="list-decimal list-inside text-xs space-y-1 text-zinc-600 dark:text-zinc-400 pl-2">
            <li>Contribute up to $7,000 / $8,000 to a non-deductible Traditional IRA (no income limits apply).</li>
            <li>Immediately convert the Traditional IRA balance into a Roth IRA.</li>
            <li>Pay income tax only on pre-tax earnings (if converted immediately, tax is $0).</li>
            <li>Enjoy 100% tax-free growth and tax-free distributions in retirement!</li>
          </ol>
        </div>
      </div>

      {/* EXACTLY 10 FAQs Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Frequently Asked Questions (10 Essential Roth IRA FAQs)
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 flex items-center justify-between font-semibold text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold min-w-[20px]">
                      Q{index + 1}.
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
