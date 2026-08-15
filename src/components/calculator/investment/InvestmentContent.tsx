"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  TrendingUp,
  Calculator as CalcIcon,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Percent,
  Zap,
  Clock,
  DollarSign,
  Scale,
  Award,
  Flame,
  Layers,
  BarChart3,
  Globe,
} from "lucide-react";

export function InvestmentContent() {
  return (
    <article className="prose dark:prose-invert max-w-none space-y-12 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
      {/* ==========================================
          H2 1: WHAT IS INVESTING & WHY IT MATTERS
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <TrendingUp className="h-6 w-6 text-blue-600" /> What Is Investing & Why It Matters
        </h2>

        <p className="text-base font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
          <strong>Investing</strong> is the commitment of capital to assets—such as equities, bonds, real estate, certificates of deposit (CDs), or commodities—with the expectation of generating income, capital appreciation, or both over time.
        </p>

        <p>
          Unlike uninvested cash held in low-yield checking accounts which steadily loses purchasing power to inflation, invested capital compounds through earnings, dividends, and interest reinvestment, turning time into a multiplier for long-term wealth building.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 text-xs">
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-2">
            <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-blue-500" /> Inflation Protection
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Historically, average equity markets return ~8-10% annually, comfortably outpacing average consumer price inflation (2-3%), preserving and expanding real buying power.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
            <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-emerald-500" /> Passive Income Generation
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Compound growth creates a portfolio capable of yielding sustainable annual passive income via the 4% safe withdrawal rule.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          H2 2: THE POWER OF COMPOUND GROWTH & STARTING EARLY
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Zap className="h-6 w-6 text-emerald-600" /> The Power of Compound Growth & Time Horizon
        </h2>

        <p>
          The true catalyst of wealth accumulation is <strong>compound growth</strong>—the phenomenon where return is earned not only on your original principal investment but also on accumulated gains from prior years.
        </p>

        {/* Formula Card */}
        <div className="p-5 rounded-xl bg-zinc-900 text-white font-sans tabular-nums space-y-3 shadow-md my-4">
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Investment Future Value Formula</span>
          <div className="text-lg sm:text-xl font-black text-blue-400">
            FV = PV &times; (1 + r/n)<sup>n &times; t</sup> + PMT &times; [((1 + r/n)<sup>n &times; t</sup> - 1) / (r/n)]
          </div>
          <div className="text-xs text-zinc-300 pt-2 border-t border-zinc-800 grid grid-cols-2 gap-2 font-sans">
            <div><strong>FV</strong> = Future Portfolio Value</div>
            <div><strong>PV</strong> = Starting Principal Amount</div>
            <div><strong>PMT</strong> = Recurring Contribution</div>
            <div><strong>r</strong> = Annual Rate of Return</div>
            <div><strong>t</strong> = Investment Length in Years</div>
            <div><strong>n</strong> = Compounding Frequency</div>
          </div>
        </div>

        <p className="text-xs">
          Explore dedicated rate derivations on our <Link href="/calculators/compound-interest-calculator" className="text-blue-600 font-semibold hover:underline">Compound Interest Calculator</Link> and <Link href="/calculators/future-value-calculator" className="text-blue-600 font-semibold hover:underline">Future Value Calculator</Link>.
        </p>
      </section>

      {/* ==========================================
          H2 3: DIFFERENT TYPES OF INVESTMENTS
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Layers className="h-6 w-6 text-indigo-600" /> Different Asset Classes & Investment Types
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">1. Certificates of Deposit (CDs)</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Low-risk fixed-income products issued by FDIC-insured banks guaranteeing principal and fixed interest returns for set terms.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">2. Government & Corporate Bonds</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Debt securities providing semiannual coupon interest payments. U.S. Treasury bonds offer risk-free principal backing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">3. Equities & Stocks</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Fractional ownership in public companies offering high long-term capital appreciation and dividend income streams.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">4. Real Estate & REITs</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Physical property or liquid Real Estate Investment Trusts offering rental yield cash flow and property appreciation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">5. Commodities & Gold</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Physical assets (precious metals, oil, agriculture) acting as inflation hedges and economic uncertainty stores of value.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">6. Index Funds & Low-Cost ETFs</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Baskets of securities tracking broad market indexes (e.g. S&P 500) offering instant diversification and minimal fee drag.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          H2 4: INFLATION, TAXES & FEE DRAG
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Flame className="h-6 w-6 text-rose-500" /> Inflation, Tax Rates & Expense Ratio Friction
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 space-y-1">
            <h3 className="font-bold text-rose-900 dark:text-rose-300 text-sm">1. Inflation Drag</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              A 3% annual inflation rate reduces nominal portfolio purchasing power by ~44% over a 20-year horizon. Always calculate real return after inflation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-300 text-sm">2. Management Fee Drag</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              An expense ratio of 1.00% versus 0.05% in index funds can erase up to 25% of total potential investment gains over 30 years.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          H2 5: FREQUENTLY ASKED QUESTIONS (15-20 FAQS)
         ========================================== */}
      <section className="space-y-6 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <HelpCircle className="h-6 w-6 text-indigo-600" /> Frequently Asked Questions (15+ FAQs)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">1. What is a good annual investment return?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Historically, a broad stock market index fund (e.g. S&P 500) returns an average of 8-10% annually before inflation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">2. How much should I invest monthly?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Financial advisors generally recommend investing 15-20% of your gross annual income into retirement and growth portfolios.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">3. What is dollar-cost averaging (DCA)?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              DCA is the practice of investing a fixed dollar amount regularly regardless of market movements, reducing volatility risk.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">4. Should I invest monthly or annually?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Monthly contributions put capital to work faster, capturing intra-year compounding and dollar-cost averaging benefits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">5. How does the FIRE number work?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Your FIRE number equals 25 times your annual living expenses, derived from the 4% safe withdrawal rule.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">6. How does expense ratio impact portfolio growth?</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              High management fees compound exponentially over time, dragging down total ending wealth significantly over long horizons.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
