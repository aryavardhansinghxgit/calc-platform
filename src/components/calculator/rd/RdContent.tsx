"use client";

import React from "react";
import { RefreshCw, ShieldCheck, Zap, AlertTriangle, CheckCircle2, DollarSign, Calculator, PieChart, Layers, ArrowRight, Award } from "lucide-react";

export function RdContent() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-xs leading-relaxed">
      {/* 1. INTRODUCTION */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          What is a Recurring Deposit (RD) & How Does It Work?
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          A <strong>Recurring Deposit (RD)</strong> is a term investment product offered by commercial banks, non-banking financial companies (NBFCs), and post offices that allows individuals to deposit a fixed monthly sum over a chosen tenure (ranging from 6 months up to 10 years). RDs combine the high guaranteed interest rates of Fixed Deposits with the budget-friendly installment structure of a Systematic Investment Plan (SIP).
        </p>
        <p className="text-zinc-600 dark:text-zinc-400">
          For salaried earners who cannot commit a large upfront lump sum for an FD, an RD enforces financial discipline by building a substantial guaranteed capital pool through steady monthly savings.
        </p>
      </section>

      {/* 2. RD VS FD VS SIP COMPARISON TABLE */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Layers className="h-4 w-4 text-purple-600" />
          Recurring Deposit (RD) vs. FD vs. Equity SIP Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-[11px]">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold">Feature</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">Recurring Deposit (RD)</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-purple-600 dark:text-purple-400">Fixed Deposit (FD)</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-emerald-600 dark:text-emerald-400">Equity Mutual Fund SIP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-400">
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Deposit Frequency</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Fixed Monthly Installments</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">One-Time Lumpsum Upfront</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Fixed Periodic Installments</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Return Guarantee</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">100% Guaranteed Fixed Return</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">100% Guaranteed Fixed Return</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Market Linked (NAV Variable)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Compounding Frequency</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Quarterly Compounding</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Quarterly Compounding</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Continuous Compounding</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Principal Risk</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Zero Principal Risk</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Zero Principal Risk</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Equity Market Risk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. MATHEMATICAL FORMULAS & DERIVATIONS */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-emerald-600" />
          Mathematical Recurring Deposit Formulas & Compounding Mechanics
        </h3>

        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">1. Quarterly Compounded RD Formula</h4>
        <p className="text-zinc-600 dark:text-zinc-400">
          Commercial bank RDs compound interest on a quarterly basis ($n = 4$). Since monthly deposits enter at different times, each installment ($k$) compounds for its remaining tenure:
        </p>

        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl space-y-2 text-center font-mono text-xs">
          <div className="font-bold text-blue-600 dark:text-blue-400 text-sm">
            A = Σ [ P × (1 + R / 400)^(4 × (N - k + 1) / 12) ]
          </div>
          <p className="text-[11px] text-zinc-500 font-sans">
            Where each variable represents:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-[11px] font-sans pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <div><strong>A</strong> = Total Final Maturity Amount ($ or ₹)</div>
            <div><strong>P</strong> = Monthly Recurring Installment Deposit</div>
            <div><strong>R</strong> = Annual Interest Rate Percentage (e.g. 6.8%)</div>
            <div><strong>N</strong> = Total Number of Monthly Deposits (Tenure Months)</div>
            <div><strong>k</strong> = Installment Month Number (1 to N)</div>
          </div>
        </div>

        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 pt-2">2. Simple Interest RD Approximation Formula</h4>
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl font-mono text-[11px] text-center text-purple-600 dark:text-purple-400">
          Interest = P × [ N × (N + 1) / 2 ] × (R / 1200)
        </div>
      </section>

      {/* 4. WORKED STEP-BY-STEP EXAMPLE */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-500" />
          Step-by-Step Worked Calculation Example
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          Let us walk through a 1-year (12-month) bank Recurring Deposit calculation:
        </p>
        <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 rounded-xl space-y-2 text-xs">
          <div className="font-bold text-blue-900 dark:text-blue-200">Scenario Inputs:</div>
          <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300 space-y-1">
            <li>Monthly Deposit (P) = $5,000 / month</li>
            <li>Interest Rate (R) = 8.25% p.a.</li>
            <li>Tenure = 12 Months (N = 12)</li>
          </ul>

          <div className="font-bold text-blue-900 dark:text-blue-200 pt-2">Formula Evaluation:</div>
          <div className="font-mono text-[11px] space-y-1 bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-blue-100 dark:border-blue-950">
            <div>1. Total Principal Deposited: 5,000 × 12 = $60,000</div>
            <div>2. Total Month-Product Factor: N(N+1)/2 = (12 × 13) / 2 = 78 month-units</div>
            <div>3. Estimated Interest Earned: 5,000 × 78 × (0.0825 / 12) = $2,681.25</div>
            <div>4. Total Final Maturity Amount: $60,000 + $2,681.25 = $62,681.25</div>
            <div>5. Effective Yield: 4.47% net return on total cash flow</div>
          </div>
        </div>
      </section>

      {/* 5. SENIOR CITIZEN & TDS TAX RULES */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Award className="h-4 w-4 text-emerald-600" />
          Senior Citizen Privileges & Tax Deducted at Source (TDS)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1.5">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 text-xs">
              <Award className="h-3.5 w-3.5 text-emerald-500" /> Senior Citizen Rate Premium (+0.50%)
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
              Commercial banks offer an extra <strong>+0.50% to +0.75% per annum</strong> bonus interest rate on Recurring Deposits for senior citizens (age 60+). Over a $500 monthly RD for 5 years, senior citizens earn over <strong>$1,200+ extra interest</strong>.
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1.5">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-500" /> TDS Deductions (Section 194A)
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
              TDS applies to RD interest earnings exceeding statutory thresholds ($500 / ₹40,000 for regular investors; ₹50,000 for senior citizens). Submit Form 15G or Form 15H at the start of the year if your total taxable income is below the tax slab limit.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TOP INVESTOR MISTAKES TO AVOID */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Top RD Investor Mistakes to Avoid
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-600 dark:text-zinc-400">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">1. Missing Monthly Installment Deadlines</span>
            <p className="text-[11px]">Failing to pay monthly RD installments on time incurs bank penalty charges (typically ₹1.50 per ₹100 per month) and lowers total interest.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">2. Premature Closure Penalties</span>
            <p className="text-[11px]">Closing an RD before the full tenure reduces the effective interest rate by 0.5%–1.0% below the applicable rate for the elapsed time.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">3. Keeping Monthly RD Flat for 10 Years</span>
            <p className="text-[11px]">Use Step-Up RDs to increase monthly deposits by 10% each year as your income grows, accelerating your guaranteed wealth creation.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">4. Forgetting Form 15G / 15H Filings</span>
            <p className="text-[11px]">Failing to file Form 15G/15H results in unnecessary 10% TDS deductions that require manual tax refund claims.</p>
          </div>
        </div>
      </section>
    </article>
  );
}
