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

export function RetirementContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the 4% Rule for retirement withdrawals?",
      answer: "Originating from the Trinity Study, the 4% Rule suggests withdrawing 4% of your total retirement nest egg in your first year of retirement, then adjusting that dollar amount annually for inflation, allowing your nest egg to last at least 30 years.",
    },
    {
      question: "What is the 80% Rule of pre-retirement income replacement?",
      answer: "The 80% Rule estimates that retirees need approximately 70% to 80% of their pre-retirement annual income to maintain their standard of living, accounting for eliminated work-related expenses and payroll taxes.",
    },
    {
      question: "What is the 10% Rule for retirement savings?",
      answer: "The 10% Rule suggests saving 10% to 15% of your pre-tax income each year starting in your 20s. Consistently saving 10%-15% over a 35-40 year career generally builds a sufficient retirement nest egg.",
    },
    {
      question: "How does inflation impact my retirement savings?",
      answer: "Inflation erodes purchasing power over time. At a standard 3% annual inflation rate, prices double roughly every 24 years, meaning $1,000,000 at age 67 will purchase what $500,000 purchases today.",
    },
    {
      question: "What is the difference between Traditional IRA and Roth IRA?",
      answer: "Traditional IRAs allow tax-deductible contributions today, but withdrawals in retirement are taxed as ordinary income. Roth IRAs are funded with after-tax dollars today, but all future investment growth and retirement withdrawals are 100% tax-free.",
    },
    {
      question: "How does an employer 401(k) match work?",
      answer: "An employer match is free money offered by your company (e.g. matching 100% of your contributions up to 3% to 6% of your salary). You should always contribute enough to get the full employer match.",
    },
    {
      question: "What is Full Retirement Age (FRA) for Social Security?",
      answer: "In the United States, Full Retirement Age (FRA) is between age 66 and 67 depending on birth year. Claiming Social Security at age 62 reduces monthly benefits by up to 30%, while delaying to age 70 increases monthly benefits by 8% per year.",
    },
    {
      question: "What is a Defined Benefit Pension vs. Defined Contribution Plan?",
      answer: "A defined benefit pension guarantees a fixed monthly payout for life paid by the employer. A defined contribution plan (like a 401k or 403b) depends on individual contributions and market investment performance.",
    },
    {
      question: "What is an Immediate Annuity vs. Deferred Annuity?",
      answer: "An immediate annuity converts a lump-sum payment into instant monthly guaranteed income for life. A deferred annuity accumulates interest tax-deferred until an agreed future start date.",
    },
    {
      question: "Should I count Social Security when calculating my nest egg?",
      answer: "Yes, Social Security acts as guaranteed inflation-indexed monthly income, reducing the net annual withdrawal needed directly from your personal investment portfolio.",
    },
    {
      question: "What is a Reverse Mortgage for retirees?",
      answer: "A Reverse Mortgage (HECM) allows homeowners aged 62+ to convert part of their home equity into tax-free cash payments without monthly mortgage payments, repaid when the home is sold or owner passes away.",
    },
    {
      question: "What is Sequence of Returns Risk?",
      answer: "Sequence of returns risk occurs when poor stock market returns happen right before or in the early years of retirement, accelerating portfolio depletion if fixed withdrawals continue.",
    },
    {
      question: "What is the FIRE Movement (Financial Independence, Retire Early)?",
      answer: "FIRE practitioners save 50%+ of their income to accumulate 25x their annual expenses by age 30 to 50, achieving financial freedom decades ahead of traditional retirement age.",
    },
    {
      question: "How does asset allocation change as you approach retirement?",
      answer: "Investors typically shift from aggressive growth (80%+ stocks in early career) to conservative capital preservation (40%-60% bonds and cash reserves near retirement) to guard against market crashes.",
    },
    {
      question: "What is a Required Minimum Distribution (RMD)?",
      answer: "IRS rules require traditional 401(k) and traditional IRA owners to begin taking mandatory annual taxable withdrawals (RMDs) starting at age 73 or 75.",
    },
    {
      question: "Can I withdraw from my 401(k) or IRA without penalty before age 59½?",
      answer: "Premature withdrawals before age 59½ incur a 10% IRS penalty plus income taxes, with exceptions for qualified first-time home purchases, higher education, or Rule 72(t) SEPP withdrawals.",
    },
    {
      question: "How much healthcare expense should I plan for in retirement?",
      answer: "Fidelity estimates that an average 65-year-old retired couple in 2026 will need approximately $315,000-$350,000 for out-of-pocket medical and healthcare expenses throughout retirement.",
    },
    {
      question: "What is a Health Savings Account (HSA) for retirement?",
      answer: "HSAs offer triple-tax advantages: tax-deductible contributions, tax-free growth, and tax-free withdrawals for medical expenses. After age 65, funds can be withdrawn for non-medical expenses taxed as ordinary income.",
    },
    {
      question: "What is the Catch-up Contribution limit?",
      answer: "Taxpayers aged 50 and older can make extra 'catch-up' contributions to 401(k)s ($7,500+) and IRAs ($1,000+) to accelerate savings in the decade prior to retirement.",
    },
    {
      question: "Why use an online Retirement Calculator?",
      answer: "An online retirement calculator projects compounding wealth growth, accounts for inflation and income increases, models post-retirement withdrawals, tests nest egg longevity, and generates printable roadmaps.",
    },
  ];

  return (
    <div className="space-y-10 mt-8  dark:border-zinc-800 pt-8 text-zinc-700 dark:text-zinc-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
          <BookOpen className="h-4 w-4" /> Retirement &amp; Wealth Independence Masterclass
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          The Mathematics of Financial Freedom: Rules of Thumb, Inflation &amp; Decumulation
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
          Building a secure retirement nest egg requires balancing compounding investment growth during working years 
          against inflation, income replacement target ratios, Social Security benefits, and safe decumulation rates in retirement.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Section 1: Rules of Thumb */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">1. Core Retirement Rules of Thumb
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-2">
              <span className="font-bold text-blue-600 text-sm block">The 10% Savings Rule</span>
              <p className="text-slate-900 dark:text-slate-100">
                Save 10% to 15% of your pre-tax income every year starting in your 20s. Over a 35-40 year career, this builds a multi-million dollar nest egg.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-2">
              <span className="font-bold text-blue-600 text-sm block">The 80% Income Rule</span>
              <p className="text-slate-900 dark:text-slate-100">
                Aim to replace 70% to 80% of your pre-retirement annual salary to maintain your current lifestyle after retiring.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-2">
              <span className="font-bold text-blue-600 text-sm block">The 4% Trinity Rule</span>
              <p className="text-slate-900 dark:text-slate-100">
                Withdraw 4% of your nest egg in Year 1 of retirement (adjusted for inflation thereafter). Historically guarantees portfolio survival for 30+ years.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Sources of Retirement Income */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">2. Sources of Retirement Income &amp; Vehicles
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Account / Vehicle</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Tax Advantage</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Withdrawal Rules</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Key Benefit</th>
                </tr>
              </thead>
              <tbody className=" dark:divide-zinc-800">
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Employer 401(k) / 403(b)</td>
                  <td className="p-3">Pre-tax contributions, tax-deferred growth</td>
                  <td className="p-3">Taxable as ordinary income (RMDs at 73+)</td>
                  <td className="p-3 text-slate-900">Employer match (100% instant return)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Roth IRA</td>
                  <td className="p-3">After-tax dollars, 100% tax-free growth</td>
                  <td className="p-3 font-bold text-blue-600">Tax-free withdrawals after age 59½</td>
                  <td className="p-3 text-slate-900">No RMDs during owner lifetime</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Social Security</td>
                  <td className="p-3">FICA payroll tax funded, CPI inflation-indexed</td>
                  <td className="p-3">Available age 62-70 (Max benefit at 70)</td>
                  <td className="p-3 text-slate-900">Guaranteed government lifetime payout</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Health Savings Account (HSA)</td>
                  <td className="p-3 font-bold text-blue-600">Triple-tax-advantaged</td>
                  <td className="p-3">Tax-free for medical expenses at any age</td>
                  <td className="p-3 text-slate-900">Acts like Traditional IRA after age 65</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 20 SEO FAQs Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
            Frequently Asked Questions (FAQ)
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
                  <div className="p-4 pt-0 text-xs text-slate-900 dark:text-slate-100  dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 leading-relaxed">
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
