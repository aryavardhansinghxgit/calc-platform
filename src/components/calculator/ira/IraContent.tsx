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

export function IraContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // EXACTLY 10 FAQs as required by user prompt
  const faqs = [
    {
      question: "What is the difference between a Traditional IRA and a Roth IRA?",
      answer: "Traditional IRAs allow tax-deductible contributions today, lowering your taxable income now, but withdrawals in retirement are taxed as ordinary income. Roth IRAs are funded with after-tax dollars today, but all future investment growth and retirement withdrawals are 100% tax-free.",
    },
    {
      question: "What are the 2025 and 2026 IRA contribution limits?",
      answer: "For 2025, the total combined IRA annual contribution limit is $7,000 across all Traditional and Roth IRAs ($8,000 for individuals aged 50 and older making catch-up contributions). For 2026, limits increase to $7,000 / $8,000.",
    },
    {
      question: "What is a SEP IRA and who qualifies?",
      answer: "A Simplified Employee Pension (SEP) IRA allows self-employed individuals and small business owners to contribute up to 25% of net self-employment income or $70,000 (2025 limit), significantly higher than standard IRA limits.",
    },
    {
      question: "What is a SIMPLE IRA?",
      answer: "A Savings Incentive Match Plan for Employees (SIMPLE) IRA is designed for small businesses with under 100 employees, allowing employee deferrals up to $16,500 ($19,500 for age 50+) plus mandatory employer matching (up to 3%).",
    },
    {
      question: "How does the IRS 60-day rollover rule work?",
      answer: "The 60-day rollover rule allows you to withdraw funds from an IRA tax-free as long as 100% of the funds are deposited into another qualifying IRA or retirement account within 60 calendar days (permitted once per 12-month period).",
    },
    {
      question: "What is a Required Minimum Distribution (RMD) for an IRA?",
      answer: "IRS rules mandate that Traditional, SEP, and SIMPLE IRA owners must start taking annual taxable withdrawals (RMDs) beginning at age 73 (age 75 starting in 2033). Roth IRAs have no RMDs during the original owner's lifetime.",
    },
    {
      question: "Can I contribute to both a 401(k) and an IRA in the same year?",
      answer: "Yes. You can maximize your employer 401(k) ($23,500/$24,500 limit) and also contribute to a Traditional or Roth IRA ($7,000/$8,000 limit) in the same tax year, subject to MAGI income deductibility limits.",
    },
    {
      question: "What is a Self-Directed IRA (SD-IRA)?",
      answer: "A Self-Directed IRA allows investors to hold non-traditional assets such as real estate, private equity, precious metals, land, tax liens, and cryptocurrency, managed through a specialized IRA custodian.",
    },
    {
      question: "What is the 10% IRS early withdrawal penalty for an IRA?",
      answer: "Withdrawing earnings from a Traditional or Roth IRA before age 59½ incurs a 10% IRS early withdrawal penalty fee plus ordinary income taxes, unless an exception applies (e.g. $10k first-time home purchase, higher education, medical expenses).",
    },
    {
      question: "How do I choose between a Traditional IRA and a Roth IRA?",
      answer: "Choose a Traditional IRA if your tax bracket is high today and expected to be lower in retirement. Choose a Roth IRA if your current tax bracket is low or if you desire tax-free income, no RMDs, and tax-free legacy inheritance.",
    },
  ];

  return (
    <div className="space-y-10 mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8 text-zinc-700 dark:text-zinc-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
          <BookOpen className="h-4 w-4" /> Individual Retirement Accounts (IRS Pub 590) Masterclass
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          Traditional IRA vs. Roth IRA vs. SEP &amp; SIMPLE IRA Optimization
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
          Individual Retirement Accounts (IRAs) offer powerful tax shelters created by the US Treasury under IRS Publication 590. 
          Understanding pre-tax deductible growth versus tax-free Roth withdrawals determines how hundreds of thousands of dollars in compound returns are taxed at retirement.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Section 1: Account Comparison Overview */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-600" /> 1. Overview of IRA Vehicles (IRS Pub 590)
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Account Type</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Annual Contribution Cap</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Tax Treatment Today</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Retirement Withdrawal Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Traditional IRA</td>
                  <td className="p-3 font-mono">$7,000 ($8,000 age 50+)</td>
                  <td className="p-3">Pre-tax tax deductible</td>
                  <td className="p-3 text-amber-600 font-semibold">Taxed as ordinary income</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-emerald-600">Roth IRA</td>
                  <td className="p-3 font-mono">$7,000 ($8,000 age 50+)</td>
                  <td className="p-3">After-tax dollars</td>
                  <td className="p-3 font-bold text-emerald-600">100% Tax-Free</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-indigo-600">SEP IRA</td>
                  <td className="p-3 font-mono">Up to $70,000 (25% net income)</td>
                  <td className="p-3">Pre-tax tax deductible</td>
                  <td className="p-3 text-amber-600 font-semibold">Taxed as ordinary income</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-purple-600">SIMPLE IRA</td>
                  <td className="p-3 font-mono">$16,500 ($19,500 age 50+)</td>
                  <td className="p-3">Pre-tax tax deductible</td>
                  <td className="p-3 text-amber-600 font-semibold">Taxed as ordinary income</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: IRA Investment Strategies & Self-Directed IRAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-base">
              <TrendingUp className="h-5 w-5" /> 2. IRA Investment Strategies
            </div>
            <p>
              Standard IRAs allow investing in index funds, mutual funds, individual stocks, corporate bonds, and ETFs. Low-cost Broad Market Index Funds (e.g. S&amp;P 500 or Total Stock Market) historically yield 7%-10% average annual returns over long time horizons.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-base">
              <Landmark className="h-5 w-5" /> 3. Self-Directed IRAs (SD-IRA)
            </div>
            <p>
              For investors seeking alternative assets, Self-Directed IRAs allow tax-sheltered investing in commercial real estate, land, private equity, tax liens, precious metals (gold/silver bullion), and cryptocurrency.
            </p>
          </div>
        </div>
      </div>

      {/* EXACTLY 10 FAQs Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Frequently Asked Questions (10 Essential IRA FAQs)
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
