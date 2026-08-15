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
} from "lucide-react";

export function SimpleInterestContent() {
  return (
    <article className="prose dark:prose-invert max-w-none space-y-12 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
      {/* ==========================================
          H2 1: WHAT IS SIMPLE INTEREST?
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">What Is Simple Interest?
        </h2>

        <p className="text-base font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
          <strong>Simple interest</strong> is a straightforward method of calculating the interest charge on a loan or the interest yield earned on a deposit. Unlike compound interest, simple interest is calculated <em>strictly on the original principal sum</em> throughout the entire duration of the loan or investment.
        </p>

        <p>
          Because simple interest does not reinvest earned interest back into the principal base, annual interest earnings remain completely constant year after year. This linear growth pattern makes simple interest exceptionally transparent and predictable for both borrowers and lenders.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-2">
            <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">Simple Interest for Borrowers
            </h3>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              Highly advantageous for borrowers! Because interest does not compound on accrued interest, borrowing costs remain lower over time compared to compounding loans like credit cards.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-50/30 border border-amber-100 dark:border-amber-900/40 space-y-2">
            <h3 className="text-sm font-bold text-amber-900 dark:text-blue-400 flex items-center gap-1.5">Simple Interest for Investors
            </h3>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              Investors receive fixed linear payouts, but miss out on long-term exponential asset growth. For long-term wealth accumulation, explore our <Link href="/calculators/compound-interest-calculator" className="text-blue-600 font-semibold hover:underline">Compound Interest Calculator</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          H2 2: SIMPLE INTEREST FORMULA
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">Simple Interest Formula
        </h2>

        <p>
          The mathematical formula for simple interest requires multiplying the principal amount by the annual interest rate and the time duration in years.
        </p>

        {/* Formula Box */}
        <div className="p-5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums space-y-3 shadow-md my-4">
          <span className="text-xs text-blue-400 font-bold uppercase tracking-wider block">1. Total Simple Interest Formula</span>
          <div className="text-xl sm:text-2xl font-black text-blue-400">
            I = P &times; r &times; t
          </div>
          <span className="text-xs text-blue-400 font-bold uppercase tracking-wider block pt-2 ">
            2. Ending Final Balance Formula
          </span>
          <div className="text-xl sm:text-2xl font-black text-blue-400">
            A = P + I = P &times; (1 + r &times; t)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300 pt-2 ">
            <div><strong>I</strong> = Total Simple Interest ($)</div>
            <div><strong>A</strong> = Ending Total Balance ($)</div>
            <div><strong>P</strong> = Initial Principal Amount ($)</div>
            <div><strong>r</strong> = Annual Interest Rate (decimal, e.g. 5% = 0.05)</div>
            <div><strong>t</strong> = Time Duration in Years</div>
          </div>
        </div>
      </section>

      {/* ==========================================
          H2 3: HOW SIMPLE INTEREST WORKS
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">How Simple Interest Works: Step-by-Step Walkthrough
        </h2>

        <p>
          Consider a <strong>$20,000 principal loan</strong> at a <strong>3% annual simple interest rate</strong> over <strong>10 years</strong>:
        </p>

        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-xs space-y-2">
          <div className="font-bold text-zinc-900 dark:text-zinc-100">Step 1: Calculate Total Interest</div>
          <div className="text-blue-600 dark:text-blue-400">
            I = $20,000 &times; 0.03 &times; 10 = $6,000
          </div>
          <div className="font-bold text-zinc-900 dark:text-zinc-100 pt-2">Step 2: Calculate Ending Balance</div>
          <div className="text-blue-600 dark:text-blue-400">
            A = $20,000 + $6,000 = $26,000
          </div>
        </div>

        <p className="text-xs">
          Each year, exactly <strong>$600</strong> in interest is generated ($20,000 &times; 3%). Over 10 years, 10 &times; $600 = $6,000 total interest.
        </p>
      </section>

      {/* ==========================================
          H2 4: SIMPLE INTEREST FOR DIFFERENT FREQUENCIES
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">Simple Interest for Different Frequencies (Years, Months, Weeks, Days)
        </h2>

        <p>
          When loan durations or deposit terms are expressed in months, weeks, or days, convert the time term into fractional years before applying I = P &times; r &times; t, or use I = P &times; r_period &times; n:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans tabular-nums my-3">
          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <span className="font-bold font-sans text-zinc-800 dark:text-zinc-200 block">1. Monthly Term (m months)</span>
            <div className="text-blue-600 dark:text-blue-400 font-bold">t = m / 12</div>
            <p className="font-sans text-[11px] text-slate-900">Example: 18 months = 18/12 = 1.5 years</p>
          </div>

          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <span className="font-bold font-sans text-zinc-800 dark:text-zinc-200 block">2. Weekly Term (w weeks)</span>
            <div className="text-blue-600 dark:text-blue-400 font-bold">t = w / 52</div>
            <p className="font-sans text-[11px] text-slate-900">Example: 26 weeks = 26/52 = 0.5 years</p>
          </div>

          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1 sm:col-span-2">
            <span className="font-bold font-sans text-zinc-800 dark:text-zinc-200 block">3. Daily Term (d days)</span>
            <div className="text-blue-600 dark:text-blue-400 font-bold">t = d / 365</div>
            <p className="font-sans text-[11px] text-slate-900">Example: 90 days = 90/365 = 0.24657 years</p>
          </div>
        </div>
      </section>

      {/* ==========================================
          H2 5: SIMPLE INTEREST EXAMPLES
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">Practical Simple Interest Examples
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-1">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 text-sm">Example 1: Short-Term Savings Certificate</h3>
            <p className="text-slate-900 dark:text-slate-100">
              You invest $5,000 into a 9-month simple interest deposit paying 4.5% per annum.
            </p>
            <div className="font-sans tabular-nums text-blue-600 dark:text-blue-400 pt-1 font-semibold">
              I = $5,000 &times; 0.045 &times; (9/12) = $168.75 Interest | Total = $5,168.75
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-50/30 border border-emerald-100 dark:border-emerald-900/40 space-y-1">
            <h3 className="font-bold text-emerald-900 dark:text-blue-400 text-sm">Example 2: Auto Loan Interest</h3>
            <p className="text-slate-900 dark:text-slate-100">
              You borrow $15,000 for a simple interest car loan at 6% annual rate over 5 years.
            </p>
            <div className="font-sans tabular-nums text-blue-600 dark:text-blue-400 pt-1 font-semibold">
              I = $15,000 &times; 0.06 &times; 5 = $4,500 Total Interest | Total Repaid = $19,500
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          H2 6: WHAT FINANCIAL INSTRUMENTS USE SIMPLE INTEREST?
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">What Financial Instruments Use Simple Interest?
        </h2>

        <ul className="list-disc pl-5 space-y-2 text-xs text-slate-900 dark:text-slate-100">
          <li><strong>U.S. Treasury Bills (T-Bills):</strong> Short-term government securities sold at a discount that mature at face value using simple discount yields.</li>
          <li><strong>Auto Loans:</strong> Most standard auto loans use simple interest calculated daily based on remaining principal.</li>
          <li><strong>Short-Term Personal Loans:</strong> Fixed-term personal notes often calculate total repayment using simple interest formulas.</li>
          <li><strong>Bonds & Coupon Payments:</strong> Corporate and municipal bonds pay periodic simple interest coupon payments based on par value.</li>
        </ul>
      </section>

      {/* ==========================================
          H2 7: SIMPLE INTEREST VS COMPOUND INTEREST
         ========================================== */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">Simple Interest vs. Compound Interest Comparison
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
                <td className="p-3 font-bold">Mathematical Formula</td>
                <td className="p-3 font-sans tabular-nums">I = P &times; r &times; t</td>
                <td className="p-3 font-sans tabular-nums text-blue-600 font-bold">A = P &times; (1 + r/n)<sup>nt</sup></td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold">Growth Pattern</td>
                <td className="p-3">Linear (constant annual dollars)</td>
                <td className="p-3 font-bold text-blue-600">Exponential (accelerating annual dollars)</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold">Investment Returns</td>
                <td className="p-3">Lower long-term accumulated wealth</td>
                <td className="p-3 font-bold text-blue-600">Substantially higher long-term wealth</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="p-3 font-bold">Loan Costs for Borrowers</td>
                <td className="p-3 font-bold text-blue-600">Lower total interest cost</td>
                <td className="p-3 text-blue-600">Higher total interest cost if unpaid</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs">
          For detailed multi-period growth analysis, try our <Link href="/calculators/investment-calculator" className="text-blue-600 font-semibold hover:underline">Investment Calculator</Link> and <Link href="/calculators/future-value-calculator" className="text-blue-600 font-semibold hover:underline">Future Value Calculator</Link>.
        </p>
      </section>

      {/* ==========================================
          H2 8: FREQUENTLY ASKED QUESTIONS (FAQ)
         ========================================== */}
      <section className="space-y-6 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-3">Frequently Asked Questions (15+ FAQs)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">1. What is simple interest?</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Simple interest is an interest calculation method performed exclusively on the initial principal sum.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">2. How is simple interest calculated?</h3>
            <p className="text-slate-900 dark:text-slate-100">
              By multiplying principal (P) by annual rate (r) and time in years (t): I = P &times; r &times; t.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">3. Is simple interest better than compound interest?</h3>
            <p className="text-slate-900 dark:text-slate-100">
              For borrowers, simple interest is better because interest doesn't compound. For investors, compound interest is far superior.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">4. Can simple interest be negative?</h3>
            <p className="text-slate-900 dark:text-slate-100">
              In real-world nominal finance, interest rates are non-negative. However, net real simple interest can be negative if inflation exceeds the nominal rate.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">5. How do banks calculate monthly simple interest?</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Monthly simple interest equals principal multiplied by annual rate divided by 12 (I = P &times; r / 12).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">6. Do car loans use simple interest?</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Yes, the vast majority of auto loans use simple interest calculated daily on the remaining principal balance.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">7. How to calculate simple interest for days?</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Divide the number of days by 365: I = P &times; r &times; (days / 365).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">8. What is the formula to find principal?</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Principal P = I / (r &times; t), or from final balance P = A / (1 + r &times; t).
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
