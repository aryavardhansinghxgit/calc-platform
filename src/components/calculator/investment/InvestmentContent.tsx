"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Zap,
  Layers,
  Scale,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function InvestmentContent() {
  const faqs = [
    {
      question: "1. What is a good annual investment return?",
      answer:
        "Historically, a broad stock market index fund (e.g. S&P 500) returns an average of 8–10% annually before inflation. Balanced portfolios with fixed-income bonds generally target 5–7% nominal annual returns.",
    },
    {
      question: "2. How much should I invest monthly?",
      answer:
        "Financial advisors generally recommend investing 15–20% of your gross annual income into retirement and growth portfolios to build long-term financial independence.",
    },
    {
      question: "3. What is dollar-cost averaging (DCA)?",
      answer:
        "Dollar-cost averaging (DCA) is the disciplined practice of investing a fixed dollar amount at recurring intervals regardless of market fluctuations, reducing timing risk and emotional volatility.",
    },
    {
      question: "4. Should I invest monthly or annually?",
      answer:
        "Monthly contributions put capital to work faster, capturing intra-year compound returns and dollar-cost averaging benefits compared to a single annual lump-sum deposit at year-end.",
    },
    {
      question: "5. How does the FIRE number work?",
      answer:
        "Your Financial Independence, Retire Early (FIRE) number typically equals 25 times your anticipated annual living expenses, derived from the academic 4% safe withdrawal rule.",
    },
    {
      question: "6. How does expense ratio impact portfolio growth?",
      answer:
        "High management fees compound exponentially over time. An expense ratio of 1.00% versus 0.05% in low-cost index funds can erase up to 25% of total potential investment wealth over a 30-year horizon.",
    },
  ];

  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-sm">
      {/* 1. WHAT IS INVESTING & WHY IT MATTERS */}
      <section id="what-is-investing" className="space-y-4 pt-2">
        <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-900">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            1. What Is Investing &amp; Why It Matters
          </h2>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong>Investing</strong> is the commitment of capital to assets—such as equities, bonds, real estate, certificates of deposit (CDs), or commodities—with the expectation of generating income, capital appreciation, or both over time.
        </p>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Unlike uninvested cash held in low-yield checking accounts which steadily loses purchasing power to inflation, invested capital compounds through earnings, dividends, and interest reinvestment, turning time into a multiplier for long-term wealth building.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-1.5 shadow-2xs">
            <strong className="text-sm font-bold text-blue-900 dark:text-blue-300 block">
              Inflation Protection
            </strong>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Historically, average equity markets return ~8–10% annually, comfortably outpacing average consumer price inflation (2–3%), preserving and expanding real buying power.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-1.5 shadow-2xs">
            <strong className="text-sm font-bold text-emerald-900 dark:text-emerald-300 block">
              Passive Income Generation
            </strong>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Compound growth creates a portfolio capable of yielding sustainable annual passive income via the 4% safe withdrawal rule.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE POWER OF COMPOUND GROWTH & TIME HORIZON */}
      <section id="compound-growth-time-horizon" className="space-y-4 pt-2">
        <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-900">
            <Zap className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            2. The Power of Compound Growth &amp; Time Horizon
          </h2>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The true catalyst of wealth accumulation is <strong>compound growth</strong>—the phenomenon where return is earned not only on your original principal investment but also on accumulated gains from prior years.
        </p>

        {/* Strong Formula Card */}
        <div className="p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-l-blue-600 border border-blue-200 dark:border-blue-800 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <strong className="text-xs text-blue-700 dark:text-blue-300 font-extrabold uppercase tracking-wider block">
              Investment Future Value Formula
            </strong>
            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded-full">
              Discrete Compounding Model
            </span>
          </div>

          <div className="text-base sm:text-lg font-sans font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-blue-200 dark:border-blue-800/80 overflow-x-auto">
            FV = PV &times; (1 + r/n)<sup>n &times; t</sup> + PMT &times; [((1 + r/n)<sup>n &times; t</sup> - 1) / (r/n)]
          </div>

          <div className="text-xs text-slate-700 dark:text-slate-300 pt-2 grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-sans">
            <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-blue-100 dark:border-blue-900">
              <strong>FV</strong> = Future Portfolio Value
            </div>
            <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-blue-100 dark:border-blue-900">
              <strong>PV</strong> = Starting Principal Amount
            </div>
            <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-blue-100 dark:border-blue-900">
              <strong>PMT</strong> = Recurring Contribution
            </div>
            <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-blue-100 dark:border-blue-900">
              <strong>r</strong> = Annual Rate of Return
            </div>
            <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-blue-100 dark:border-blue-900">
              <strong>t</strong> = Investment Length in Years
            </div>
            <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-blue-100 dark:border-blue-900">
              <strong>n</strong> = Compounding Frequency
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400">
          Explore dedicated rate derivations on our{" "}
          <Link
            href="/calculators/compound-interest-calculator"
            className="text-blue-600 dark:text-blue-400 font-bold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Compound Interest Calculator
          </Link>{" "}
          and{" "}
          <Link
            href="/calculators/future-value-calculator"
            className="text-blue-600 dark:text-blue-400 font-bold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Future Value Calculator
          </Link>
          .
        </p>
      </section>

      {/* 3. DIFFERENT ASSET CLASSES & INVESTMENT TYPES */}
      <section id="asset-classes-investment-types" className="space-y-4 pt-2">
        <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-900">
            <Layers className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            3. Different Asset Classes &amp; Investment Types
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
            <strong className="font-bold text-blue-600 dark:text-blue-400 text-sm block">1. Certificates of Deposit (CDs)</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Low-risk fixed-income products issued by FDIC-insured banks guaranteeing principal and fixed interest returns for set terms.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
            <strong className="font-bold text-blue-600 dark:text-blue-400 text-sm block">2. Government &amp; Corporate Bonds</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Debt securities providing semiannual coupon interest payments. U.S. Treasury bonds offer risk-free principal backing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
            <strong className="font-bold text-blue-600 dark:text-blue-400 text-sm block">3. Equities &amp; Stocks</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Fractional ownership in public companies offering high long-term capital appreciation and dividend income streams.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
            <strong className="font-bold text-blue-600 dark:text-blue-400 text-sm block">4. Real Estate &amp; REITs</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Physical property or liquid Real Estate Investment Trusts offering rental yield cash flow and property appreciation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
            <strong className="font-bold text-blue-600 dark:text-blue-400 text-sm block">5. Commodities &amp; Gold</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Physical assets (precious metals, oil, agriculture) acting as inflation hedges and economic uncertainty stores of value.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs">
            <strong className="font-bold text-blue-600 dark:text-blue-400 text-sm block">6. Index Funds &amp; Low-Cost ETFs</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Baskets of securities tracking broad market indexes (e.g. S&amp;P 500) offering instant diversification and minimal fee drag.
            </p>
          </div>
        </div>
      </section>

      {/* 4. INFLATION, TAXES & FEE DRAG */}
      <section id="inflation-taxes-fee-drag" className="space-y-4 pt-2">
        <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-900">
            <Scale className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            4. Inflation, Tax Rates &amp; Expense Ratio Friction
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-1.5 shadow-2xs">
            <strong className="font-bold text-rose-800 dark:text-rose-300 text-sm block">1. Inflation Drag</strong>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              A 3% annual inflation rate reduces nominal portfolio purchasing power by ~44% over a 20-year horizon. Always calculate real return after inflation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-1.5 shadow-2xs">
            <strong className="font-bold text-amber-800 dark:text-amber-300 text-sm block">2. Management Fee Drag</strong>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              An expense ratio of 1.00% versus 0.05% in index funds can erase up to 25% of total potential investment gains over 30 years.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS (OPEN BY DEFAULT) */}
      <section id="faqs" className="space-y-4 pt-2">
        <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-900">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            5. Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3.5 text-xs">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-2xs"
            >
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                {faq.question}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. METHODOLOGY, SOURCES & DISCLAIMER */}
      <section className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-xs text-slate-600 dark:text-slate-400 space-y-2.5 leading-relaxed shadow-2xs">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
          <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Financial Planning Methodology &amp; Educational Disclaimer</span>
        </div>
        <p>
          <strong>Methodology &amp; Mathematical Principles:</strong> Future value projections apply discrete compounding annuity formulations with user-configured compounding frequencies, cash flow timing conventions (annuity due vs. ordinary annuity), and optional inflation-drag adjustments.
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          <strong>Educational Disclaimer:</strong> This investment calculator provides mathematical simulations and hypothetical projections for general educational and personal financial planning purposes. Past performance is no guarantee of future results. Market investments are subject to market risks, including the possible loss of principal. Tax and inflation treatments represent generalized modeling assumptions. This platform does not provide personalized legal, accounting, tax, or investment advice. Consult a registered investment advisor (RIA) or certified financial planner (CFP) for personalized financial advisory guidance.
        </p>
      </section>
    </div>
  );
}

export default InvestmentContent;
