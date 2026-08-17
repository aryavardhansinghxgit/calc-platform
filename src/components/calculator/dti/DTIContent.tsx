"use client";

import React from "react";

export function DTIContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* SECTION 1: INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. Introduction: What is Debt-to-Income (DTI) & Why Underwriters Care
        </h2>
        <p className="text-sm leading-relaxed">
          The <strong>Debt-to-Income (DTI) ratio</strong> is a foundational financial metric used by mortgage underwriters, banks, and lending institutions to measure a borrower’s ability to manage monthly payments and repay borrowed debt. Expressed as a percentage, DTI compares your total monthly recurring debt obligations to your gross monthly income (pre-tax).
        </p>
        <p className="text-sm leading-relaxed">
          Along with your credit score, employment history, and liquid cash reserves, DTI is one of the three primary pillars of residential mortgage qualification. A low DTI ratio signals strong financial health and cash-flow flexibility, whereas a high DTI ratio indicates potential over-leverage and heightened risk of default during unexpected economic downturns.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">For Homebuyers</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Determines maximum home purchasing budget and mortgage loan qualification thresholds across Conventional, FHA, VA, and Jumbo programs.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">For Underwriters</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Provides standardized risk assessment benchmarks enforced by Fannie Mae, Freddie Mac, FHA TOTAL Scorecard, and VA guidelines.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">For Debt Planning</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Evaluates the exact monthly debt reduction required to qualify for target loan balances or lower interest rate tiers.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Front-End vs. Back-End DTI Ratios: Core Definitions
        </h2>
        <p className="text-sm leading-relaxed">
          Mortgage underwriting evaluates two distinct DTI metrics—the Front-End Ratio and the Back-End Ratio:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-sm">1. Front-End DTI (Housing Ratio)</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
              Measures proposed monthly housing expenses alone relative to gross monthly income. Housing expenses consist of Principal, Interest, Property Taxes, Hazard Insurance, PMI/MIP, and HOA fees (collectively known as <strong>PITI</strong>).
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono text-[11px] font-bold text-blue-600">
              Front-End = (Total Housing Costs / Gross Income) × 100%
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-sm">2. Back-End DTI (Total Debt Ratio)</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
              Measures proposed housing expenses PLUS all recurring minimum debt payments relative to gross monthly income. Back-End DTI is the ultimate binding constraint in mortgage approval.
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono text-[11px] font-bold text-blue-600">
              Back-End = ((Housing + All Recurring Debts) / Gross Income) × 100%
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Core Underwriting Formulas & Variables
        </h2>
        <div className="space-y-3 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="font-bold text-blue-600 font-sans text-sm">Front-End Ratio Equation</div>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-center font-bold text-sm text-blue-600 dark:text-blue-400">
              {"Front-End DTI = \\frac{P + I + T + I_{hazard} + PMI + HOA}{Gross \\ Monthly \\ Income} \\times 100\\%"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="font-bold text-blue-600 font-sans text-sm">Back-End Ratio Equation</div>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-center font-bold text-sm text-blue-600 dark:text-blue-400">
              {"Back-End DTI = \\frac{PITI + Debt_{auto} + Debt_{student} + Debt_{cards} + Debt_{other}}{Gross \\ Monthly \\ Income} \\times 100\\%"}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. How the Calculation Works: Step-by-Step Execution
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 1: Calculate Standardized Gross Monthly Income</span>
            <p className="text-slate-600 dark:text-slate-400">
              Aggregate primary salary, co-borrower income, 2-year averaged bonuses/commissions, dividends, and alimony received into gross monthly income.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 2: Aggregate Total PITI Housing Expenses</span>
            <p className="text-slate-600 dark:text-slate-400">
              Sum mortgage principal & interest (or rent), property taxes, hazard insurance, mortgage insurance (PMI/MIP), and monthly HOA dues.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 3: Itemize Minimum Monthly Recurring Debts</span>
            <p className="text-slate-600 dark:text-slate-400">
              Add minimum payments for auto loans, student loans, credit card minimums, installment loans, and court-ordered obligations.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 4: Compute Ratios & Evaluate Program Matrix</span>
            <p className="text-slate-600 dark:text-slate-400">
              Divide housing costs and total obligations by gross income to compute Front-End and Back-End DTI ratios, then evaluate against Conventional, FHA, VA, USDA, and Jumbo guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Worked Real-World Underwriting Examples
        </h2>

        <div className="space-y-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Scenario A: Strong Applicant ($6,500 Monthly Gross, $1,800 Housing, $750 Debt)
            </h3>
            <div className="font-mono bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
              <div>Gross Monthly Income = $6,500/mo</div>
              <div>Front-End DTI = ($1,800 / $6,500) × 100% = 27.69% (Under 28% benchmark)</div>
              <div>Total Monthly Outflow = $1,800 + $750 = $2,550/mo</div>
              <div>Back-End DTI = ($2,550 / $6,500) × 100% = 39.23% (Under 43% cap)</div>
              <div><strong>Status:</strong> Fully eligible for Conventional, FHA, and VA financing.</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Scenario B: High-Debt Applicant ($5,000 Monthly Gross, $1,700 Housing, $1,000 Debt)
            </h3>
            <div className="font-mono bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
              <div>Gross Monthly Income = $5,000/mo</div>
              <div>Front-End DTI = ($1,700 / $5,000) × 100% = 34.00%</div>
              <div>Total Outflow = $1,700 + $1,000 = $2,700/mo</div>
              <div>Back-End DTI = ($2,700 / $5,000) × 100% = 54.00%</div>
              <div><strong>Status:</strong> Exceeds Conventional 45% limit. Requires FHA loan with AUS approval or paying off $500/mo of credit card debt to drop Back-End DTI below 44%.</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: PROGRAM MATRIX TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Mortgage Program DTI Guidelines Comparison Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Loan Type</th>
                <th className="p-3">Benchmark Front-End</th>
                <th className="p-3">Benchmark Back-End</th>
                <th className="p-3 rounded-tr-xl">Max Cap with AUS Compensating Factors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              <tr>
                <td className="p-3 font-bold text-blue-600">Conventional (Fannie/Freddie)</td>
                <td className="p-3 font-mono">28%</td>
                <td className="p-3 font-mono">36%</td>
                <td className="p-3 font-bold">45% (Up to 50% with AUS approval)</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">FHA Loan</td>
                <td className="p-3 font-mono">31%</td>
                <td className="p-3 font-mono">43%</td>
                <td className="p-3 font-bold">46.9% / 56.9% (TOTAL Scorecard)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600">VA Loan</td>
                <td className="p-3 font-mono">No Cap</td>
                <td className="p-3 font-mono">41%</td>
                <td className="p-3 font-bold">Flexible (Requires VA Residual Income test)</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">USDA Rural Loan</td>
                <td className="p-3 font-mono">29%</td>
                <td className="p-3 font-mono">41%</td>
                <td className="p-3 font-bold">44% (With high credit score & reserves)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600">Jumbo / Non-Conforming</td>
                <td className="p-3 font-mono">28%</td>
                <td className="p-3 font-mono">38% - 43%</td>
                <td className="p-3 font-bold">Strict 43% Max Limit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 7: INCLUDED VS EXCLUDED DEBTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Included vs. Excluded Debts in DTI Calculations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">Included Obligations</h3>
            <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-inside font-normal">
              <li>Auto loan & lease payments</li>
              <li>Student loan monthly minimums (or 0.5% FHA rule)</li>
              <li>Credit card minimum monthly payments</li>
              <li>Personal installment loans & co-signed debts</li>
              <li>Court-ordered child support & alimony paid</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Excluded Expenses</h3>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside font-normal">
              <li>Utilities (electricity, gas, water, internet)</li>
              <li>Auto and health insurance premiums</li>
              <li>Cell phone bills & subscription services</li>
              <li>Groceries and daily living expenses</li>
              <li>401(k) retirement loan repayments</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 8: COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Common DTI Misconceptions & Underwriting Pitfalls
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-rose-600 dark:text-rose-400">Assuming Net Income is Used</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Underwriters always use pre-tax Gross Monthly Income, not net take-home pay, when calculating official qualification DTI ratios.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-rose-600 dark:text-rose-400">Ignoring Student Loan Rules</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Deferred student loans or $0 IDR payments are calculated using agency specific rules (0.5% balance for FHA if $0, or documented IDR for Fannie Mae).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: RELATED CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Related Underwriting Metrics: LTV & Residual Income
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Loan-to-Value (LTV) Ratio</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Measures loan amount relative to appraised home value. Lower LTV (larger down payment) provides compensating strength for higher DTIs.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">VA Residual Income Benchmark</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Measures net discretionary dollars remaining for family living costs after all housing, taxes, and debt payments are made.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: SUMMARY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <h2 className="font-extrabold text-sm text-blue-700 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          A healthy Debt-to-Income ratio is the key gateway to securing mortgage approval and favorable interest rates. Keeping your Front-End DTI under 28% and Back-End DTI under 36% ensures maximum eligibility across Conventional, FHA, VA, USDA, and Jumbo mortgage programs while maintaining strong long-term financial stability.
        </p>
      </section>
    </div>
  );
}
