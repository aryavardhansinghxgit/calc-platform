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
} from "lucide-react";

export function InterestContent() {
  return (
    <article className="prose dark:prose-invert max-w-none space-y-12 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
      {/* ==========================================
          H2 1: WHAT IS INTEREST?
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">What Is Interest?
        </h2>

        <p className="text-base font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
          <strong>Interest</strong> is the monetary fee paid for the use of borrowed money, or the yield earned on capital deposited into financial institutions or investment vehicles. In modern global finance, interest serves as the fundamental price of capital and time value of money.
        </p>

        <p>
          Whether expressed as an annual rate on a high-yield savings account, a corporate bond coupon, a mortgage loan APR, or an auto financing contract, interest compensates lenders for inflation, liquidity risk, and opportunity cost.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-2">
            <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">Interest for Borrowers
            </h3>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              The cost of accessing capital today (loans, mortgages, credit cards). Borrowers pay interest to lenders as part of monthly debt amortization.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-50/30 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
            <h3 className="text-sm font-bold text-emerald-900 dark:text-blue-400 flex items-center gap-1.5">Interest for Investors
            </h3>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              The passive return earned on deposited assets (CDs, savings accounts, bonds). Investors leverage compounding to build long-term wealth.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          H2 2: SIMPLE INTEREST
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">Understanding Simple Interest
        </h2>

        <p>
          <strong>Simple interest</strong> is calculated strictly on the original principal sum for the entire duration of the loan or investment. Accumulated interest is never added back into the principal base.
        </p>

        <div className="p-5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums space-y-2 shadow-md my-4">
          <span className="text-xs text-blue-400 font-bold uppercase tracking-wider block">Simple Interest Formula</span>
          <div className="text-xl sm:text-2xl font-black text-blue-400">
            I = P &times; r &times; t
          </div>
          <div className="text-xs text-zinc-400 pt-2  grid grid-cols-2 gap-2">
            <div><strong>I</strong> = Total Interest ($)</div>
            <div><strong>P</strong> = Principal Deposit ($)</div>
            <div><strong>r</strong> = Annual Rate (%)</div>
            <div><strong>t</strong> = Time in Years</div>
          </div>
        </div>

        <p className="text-xs">
          Explore dedicated simple interest derivations on our <Link href="/calculators/simple-interest-calculator" className="text-blue-600 font-semibold hover:underline">Simple Interest Calculator</Link>.
        </p>
      </section>

      {/* ==========================================
          H2 3: COMPOUND INTEREST
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">Understanding Compound Interest
        </h2>

        <p>
          <strong>Compound interest</strong> (often called "interest on interest") occurs when earned interest is periodically added back to the principal base, allowing subsequent interest to be calculated on a continuously growing total balance.
        </p>

        <div className="p-5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums space-y-3 shadow-md my-4">
          <span className="text-xs text-blue-400 font-bold uppercase tracking-wider block">Compound Interest Formulas</span>
          <div className="text-lg sm:text-xl font-black text-blue-400">
            Discrete: A = P &times; (1 + r / n)<sup>n &times; t</sup>
          </div>
          <div className="text-lg sm:text-xl font-black text-blue-400  pt-2">
            Continuous: A = P &times; e<sup>r &times; t</sup>
          </div>
        </div>

        <p className="text-xs">
          For dedicated compounding analytics, use our <Link href="/calculators/compound-interest-calculator" className="text-blue-600 font-semibold hover:underline">Compound Interest Calculator</Link>.
        </p>
      </section>

      {/* ==========================================
          H2 4: SIMPLE VS COMPOUND INTEREST COMPARISON
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">Simple Interest vs. Compound Interest
        </h2>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-800 dark:text-zinc-200  dark:border-zinc-700">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3">Simple Interest</th>
                <th className="p-3">Compound Interest</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800">
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold">Formula</td>
                <td className="p-3 font-sans tabular-nums">I = P &times; r &times; t</td>
                <td className="p-3 font-sans tabular-nums text-blue-600 font-bold">A = P &times; (1 + r/n)<sup>nt</sup></td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold">Growth Pattern</td>
                <td className="p-3">Linear (Constant per year)</td>
                <td className="p-3 font-bold text-blue-600">Exponential (Accelerating)</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold">Investor Returns</td>
                <td className="p-3">Modest long-term growth</td>
                <td className="p-3 font-bold text-blue-600">Maximized exponential wealth</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold">Borrower Costs</td>
                <td className="p-3 font-bold text-blue-600">Cheaper for loans</td>
                <td className="p-3 text-blue-600">Higher borrowing cost if unpaid</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ==========================================
          H2 5: COMPOUNDING FREQUENCIES EXPLAINED
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">Compounding Frequencies Explained (Daily to Continuous)
        </h2>

        <p>
          The frequency at which interest is calculated and added to the principal base determines your effective annual yield (APY). Higher compounding frequencies generate faster wealth accumulation:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs my-3">
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block">Annual (n = 1)</strong>
            <span className="text-slate-900 text-[11px]">Compounded once per year. Standard for long-term bonds.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block">Semi-Annual (n = 2)</strong>
            <span className="text-slate-900 text-[11px]">Compounded twice a year. Typical for U.S. Treasury Notes.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block">Quarterly (n = 4)</strong>
            <span className="text-slate-900 text-[11px]">Compounded 4 times a year. Standard for dividend stocks & CDs.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block">Monthly (n = 12)</strong>
            <span className="text-slate-900 text-[11px]">Compounded 12 times a year. Standard for savings accounts & loans.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block">Daily (n = 365)</strong>
            <span className="text-slate-900 text-[11px]">Compounded every single day. Maximum standard bank compounding.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <strong className="text-zinc-900 dark:text-zinc-100 block">Continuous (n = &infin;)</strong>
            <span className="text-slate-900 text-[11px]">Compounded infinitely using Euler's number e &approx; 2.71828.</span>
          </div>
        </div>
      </section>

      {/* ==========================================
          H2 6: THE RULE OF 72
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">The Rule of 72
        </h2>

        <p>
          The <strong>Rule of 72</strong> is a quick mental shortcut used to estimate the number of years required for an investment to double in value at a fixed annual interest rate.
        </p>

        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-50/30 border border-amber-200 dark:border-amber-900/40 text-xs font-sans tabular-nums space-y-1">
          <div className="font-bold text-amber-900 dark:text-blue-400 text-sm">Years to Double &approx; 72 / Interest Rate (%)</div>
          <div className="text-slate-900 dark:text-slate-100 font-sans pt-1">
            Example: At an 8% annual return, your money doubles in approximately <strong>72 / 8 = 9 years</strong>.
          </div>
        </div>
      </section>

      {/* ==========================================
          H2 7: INFLATION AND INTEREST
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">Inflation and Interest: Real Purchasing Power
        </h2>

        <p>
          Nominal interest rates reflect dollar gains without accounting for rising consumer prices. <strong>Real rate of return</strong> calculates your true purchasing power after discounting inflation:
        </p>

        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-sans tabular-nums">
          <span className="font-bold text-zinc-800 dark:text-zinc-200">Fisher Equation: Real Return &approx; Nominal Rate - Inflation Rate</span>
        </div>
      </section>

      {/* ==========================================
          H2 8: TAXATION OF INTEREST INCOME
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">Taxation of Interest Income
        </h2>

        <p className="text-xs">
          Interest earned on standard bank savings accounts, CDs, and corporate bonds is typically taxed as ordinary income at your marginal tax rate. Utilizing tax-advantaged accounts like IRAs or 401(ks) protects compounding from tax drag.
        </p>
      </section>

      {/* ==========================================
          H2 9: FREQUENTLY ASKED QUESTIONS (12+ FAQS)
         ========================================== */}
      <section className="space-y-6 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">Frequently Asked Questions (12+ FAQs)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">1. What is the interest rate?</h3>
            <p className="text-slate-900 dark:text-slate-100">
              The percentage charged by lenders or paid to investors per year relative to principal capital.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">2. What is the difference between APR and APY?</h3>
            <p className="text-slate-900 dark:text-slate-100">
              APR is nominal annual interest without intra-year compounding. APY is effective annual yield taking compounding into account.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">3. How does compounding frequency impact returns?</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Higher compounding frequencies (e.g. daily vs annual) generate more frequent interest additions, yielding higher total ending wealth.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">4. What is the Rule of 72?</h3>
            <p className="text-slate-900 dark:text-slate-100">
              A quick rule of thumb estimating doubling time by dividing 72 by the annual return percentage.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
