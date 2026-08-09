"use client";

import React from "react";
import { Landmark, ShieldCheck, Zap, AlertTriangle, CheckCircle2, DollarSign, Calculator, PieChart, Layers, ArrowRight, Award } from "lucide-react";

export function FdContent() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-xs leading-relaxed">
      {/* 1. INTRODUCTION */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <Landmark className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          What is a Fixed Deposit (FD) & How Does It Work?
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          A <strong>Fixed Deposit (FD)</strong> is a low-risk financial instrument offered by commercial banks, non-banking financial companies (NBFCs), and post offices that guarantees a fixed rate of interest over a predetermined tenure ranging from 7 days up to 10 years. Unlike equity or mutual fund investments subject to daily market volatility, Fixed Deposits guarantee 100% principal safety along with predictable, assured returns.
        </p>
        <p className="text-zinc-600 dark:text-zinc-400">
          Upon committing capital into an FD, the interest rate remains locked throughout the tenure, shielding investors against falling interest rate cycles. FDs serve as foundational capital preservation vehicles for conservative savers, retirees seeking regular income payouts, and emergency fund reserves.
        </p>
      </section>

      {/* 2. CUMULATIVE VS NON-CUMULATIVE COMPARISON TABLE */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Layers className="h-4 w-4 text-purple-600" />
          Cumulative FD vs. Non-Cumulative FD Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-[11px]">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold">Feature</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">Cumulative FD (Compounded)</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-emerald-600 dark:text-emerald-400">Non-Cumulative FD (Periodic Payout)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-400">
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Interest Treatment</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Reinvested quarterly/monthly; paid at maturity</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Paid out periodically into user's bank account</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Compounding Effect</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">High compounding benefit (interest earns interest)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">No compounding on interest (principal remains static)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Maturity Corpus</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Maximum possible total payout (Principal + Compounded Interest)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Original principal amount returned at maturity</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Best For</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Wealth accumulators, long-term goal savers</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Retirees, individuals seeking monthly/quarterly cash flow</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. MATHEMATICAL FORMULAS & DERIVATIONS */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-emerald-600" />
          Mathematical Fixed Deposit Formulas & Compounding Mechanics
        </h3>

        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">1. Cumulative Compound Interest Formula</h4>
        <p className="text-zinc-600 dark:text-zinc-400">
          In standard bank FDs, interest compounds quarterly ($n = 4$). The total maturity value is calculated using:
        </p>

        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl space-y-2 text-center font-mono text-xs">
          <div className="font-bold text-blue-600 dark:text-blue-400 text-sm">
            A = P × (1 + r / n)^(n × t)
          </div>
          <p className="text-[11px] text-zinc-500 font-sans">
            Where each variable represents:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-[11px] font-sans pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <div><strong>A</strong> = Final Maturity Amount ($ or ₹)</div>
            <div><strong>P</strong> = Initial Principal Deposit</div>
            <div><strong>r</strong> = Annual Interest Rate in Decimal (e.g. 7.5% = 0.075)</div>
            <div><strong>n</strong> = Compounding Frequency per Year (4 for Quarterly)</div>
            <div><strong>t</strong> = Investment Tenure in Years</div>
          </div>
        </div>

        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 pt-2">2. Simple Interest Formula</h4>
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl font-mono text-[11px] text-center text-purple-600 dark:text-purple-400">
          M = P + (P × r × t / 100)
        </div>
      </section>

      {/* 4. WORKED STEP-BY-STEP EXAMPLE */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-500" />
          Step-by-Step Worked Calculation Example
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          Let us calculate the maturity value for a 5-year bank Fixed Deposit:
        </p>
        <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 rounded-xl space-y-2 text-xs">
          <div className="font-bold text-blue-900 dark:text-blue-200">Scenario Inputs:</div>
          <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300 space-y-1">
            <li>Principal Deposit (P) = $100,000</li>
            <li>Interest Rate (r) = 7.50% p.a. (r = 0.075)</li>
            <li>Compounding Frequency (n) = 4 (Quarterly)</li>
            <li>Tenure (t) = 5 Years</li>
          </ul>

          <div className="font-bold text-blue-900 dark:text-blue-200 pt-2">Formula Evaluation:</div>
          <div className="font-mono text-[11px] space-y-1 bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-blue-100 dark:border-blue-950">
            <div>1. Quarterly Interest Rate: r / n = 0.075 / 4 = 0.01875 (1.875% per quarter)</div>
            <div>2. Total Compounding Periods: n × t = 4 × 5 = 20 quarters</div>
            <div>3. Compounding Factor: (1 + 0.01875)^20 = (1.01875)^20 ≈ 1.449948</div>
            <div>4. Maturity Amount: A = $100,000 × 1.449948 = $144,995</div>
            <div>5. Total Interest Earned: $144,995 - $100,000 = $44,995</div>
            <div>6. Effective APY Yield: (1.01875^4 - 1) = 7.71% p.a.</div>
          </div>
        </div>
      </section>

      {/* 5. SENIOR CITIZENS & TAX SAVING FDS */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Award className="h-4 w-4 text-emerald-600" />
          Senior Citizen Privileges & Tax-Saving FDs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1.5">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 text-xs">
              <Award className="h-3.5 w-3.5 text-emerald-500" /> Senior Citizen Rate Boost (+0.50%)
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
              Most commercial banks offer an additional <strong>+0.50% to +0.75% per annum</strong> premium on FD rates for senior citizens (age 60+). Over a $100,000 deposit over 5 years, an extra 0.50% yields an extra <strong>$3,500+</strong> in risk-free interest earnings.
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1.5">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-500" /> Tax-Saving FDs (5-Year Lock-In)
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
              5-Year Tax Saving Fixed Deposits quality for tax deduction up to $1,500 / ₹1,50,000 under Section 80C. Note that premature withdrawals and loan facilities against Tax Saving FDs are strictly prohibited during the 5-year lock-in period.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TAX DEDUCTED AT SOURCE (TDS) RULES */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <PieChart className="h-4 w-4 text-rose-500" />
          Tax Deducted at Source (TDS) & Form 15G / 15H Guidance
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          Interest income earned from Fixed Deposits is fully taxable as per your income tax slab rates under "Income from Other Sources".
        </p>
        <ul className="list-disc pl-5 text-zinc-600 dark:text-zinc-400 space-y-1">
          <li><strong>TDS Threshold (Section 194A):</strong> Banks deduct 10% TDS if total FD interest across all branches exceeds statutory thresholds ($500 / ₹40,000 for regular investors; ₹50,000 for senior citizens).</li>
          <li><strong>PAN Non-Submission:</strong> If PAN card details are missing, banks are mandated to deduct TDS at a higher rate of 20%.</li>
          <li><strong>Form 15G & Form 15H:</strong> If your total annual income is below the taxable threshold, submit Form 15G (for individuals below 60) or Form 15H (for senior citizens) at the start of the financial year to prevent zero-TDS deductions.</li>
        </ul>
      </section>

      {/* 7. TOP MISTAKES TO AVOID */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Top FD Investing Mistakes to Avoid
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-600 dark:text-zinc-400">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">1. Locking All Capital in a Single Tenure</span>
            <p className="text-[11px]">Avoid single bulk deposits. Use FD Laddering (splitting cash into 1-yr, 2-yr, 3-yr, 5-yr buckets) to maintain liquidity and capture rising rate cycles.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">2. Ignoring Premature Withdrawal Penalty</span>
            <p className="text-[11px]">Breaking an FD prior to maturity usually incurs a 0.5%–1.0% interest rate penalty, lowering overall yield.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">3. Overlooking Real Returns vs. Inflation</span>
            <p className="text-[11px]">If an FD pays 7% interest and inflation is 6%, your real post-tax return may be negative. Balance FDs with growth assets.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">4. Forgetting Form 15G / 15H Submissions</span>
            <p className="text-[11px]">Failing to file Form 15G/15H results in unnecessary 10% TDS deductions that require manual tax refund claims.</p>
          </div>
        </div>
      </section>
    </article>
  );
}
