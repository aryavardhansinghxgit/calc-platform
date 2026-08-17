"use client";

import React from "react";

export function RentContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* SECTION 1: INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. Introduction: Understanding Housing Affordability & Budgeting
        </h2>
        <p className="text-sm leading-relaxed">
          Housing expenditure represents the single largest recurring financial commitment for most non-homeowning individuals and families worldwide. Determining how much rent you can safely afford is a foundational exercise in personal risk management, wealth preservation, and cash-flow optimization.
        </p>
        <p className="text-sm leading-relaxed">
          This comprehensive calculator suite provides multi-engine financial modeling to evaluate lease affordability across multiple paradigms: pre-tax income rules (the 30% Gross Rule and 40x Landlord Rule), post-tax budget distributions (the 50/30/20 Rule), Front-End and Back-End Debt-to-Income (DTI) metrics, itemized utility cost overhead, upfront lease liquidity requirements, fair room-size roommate splitting, and 10-year rent vs. buy net worth comparisons.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">For Tenants & Renters</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Establishes realistic monthly housing price ceilings that preserve funds for savings, debt elimination, and discretionary living.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">For Landlords & Managers</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Provides objective income qualification benchmarks (40x salary rule, 28% front-end DTI) to minimize tenant default risk.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">For Financial Advisors</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Evaluates structural debt-to-income balance and opportunity costs of leasing vs. long-term residential property ownership.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Underlying Mathematical Theory & Core Definitions
        </h2>
        <p className="text-sm leading-relaxed">
          The concept of official housing cost burden originated in the United States with the Brooke Amendment of 1969, which capped public housing rent at 25% of tenant income, later raised to 30% by Congress in 1981. Today, the U.S. Department of Housing and Urban Development (HUD) formalizes housing stress classifications:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-1">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">Cost-Burdened Threshold (&gt;30%)</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal">
              Households spending more than 30% of gross income on housing costs (rent + utilities) are classified as cost-burdened, signifying an elevated risk of financial distress during unexpected income drops.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-1">
            <h3 className="font-bold text-rose-700 dark:text-rose-400 text-sm">Severely Cost-Burdened Threshold (&gt;50%)</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal">
              Households allocating over 50% of pre-tax income to housing face severe cost burden, severely restricting access to healthcare, nutritious food, retirement funding, and liquid emergency reserves.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Core Mathematical Formulas & Variable Definitions
        </h2>
        <p className="text-sm leading-relaxed">
          The following core algebraic expressions govern rent affordability, DTI constraints, and net budget distribution:
        </p>

        <div className="space-y-3 text-xs font-mono">
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <div className="font-bold text-blue-700 dark:text-blue-300 text-sm font-sans">1. The 30% Gross Income Formula</div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg text-center font-bold text-sm text-blue-600 dark:text-blue-400">
              {"Max Monthly Rent = (Gross Annual Salary / 12) × 0.30"}
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-sans text-[11px] leading-relaxed">
              Where <code>Gross Annual Salary</code> is pre-tax earned income. For hourly earners: <code>Gross Annual = Wage ($/hr) × Hours/Week × 52</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <div className="font-bold text-blue-700 dark:text-blue-300 text-sm font-sans">2. The 40x Landlord Qualification Rule</div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg text-center font-bold text-sm text-blue-600 dark:text-blue-400">
              {"Max Monthly Rent = Gross Annual Salary / 40"}
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-sans text-[11px] leading-relaxed">
              Equivalently: <code>Minimum Required Income = Monthly Rent × 40</code>. Mathematically identical to 30% gross income limit: <code>(Salary / 12) × 0.30 = Salary / 40</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <div className="font-bold text-blue-700 dark:text-blue-300 text-sm font-sans">3. Back-End Debt-to-Income (DTI) Limitation Formula</div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg text-center font-bold text-sm text-blue-600 dark:text-blue-400">
              {"Max Allowable Housing + Debt = Monthly Gross Income × 0.43"}
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg text-center font-bold text-sm text-blue-600 dark:text-blue-400 mt-1">
              {"Allowable Rent = (Monthly Gross × 0.43) - Monthly Recurring Debt"}
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-sans text-[11px] leading-relaxed">
              Where <code>Monthly Recurring Debt</code> includes minimum payments for student loans, auto loans, credit cards, and personal loans.
            </p>
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
            <span className="font-extrabold text-blue-600">Step 1: Normalize Gross Income</span>
            <p className="text-slate-600 dark:text-slate-400">
              Convert input pay (annual salary, monthly income, or hourly rate × hours/week) into standardized pre-tax monthly gross income.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 2: Apply Selected Rule & Ratio Cap</span>
            <p className="text-slate-600 dark:text-slate-400">
              Calculate unconstrained rent cap based on selected preset (25%, 30%, 35%, 40x rule, or custom slider percentage).
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 3: Evaluate Back-End Debt Constraints</span>
            <p className="text-slate-600 dark:text-slate-400">
              Deduct recurring debt obligations from the maximum allowed total debt capacity (43% of gross income) to ensure financial stability.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 4: Compute Target Range & Discretionary Residual</span>
            <p className="text-slate-600 dark:text-slate-400">
              Calculate target conservative-to-standard rent bounds (20% to 30% of gross) and remaining disposable income after rent and debt.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Worked Examples: Step-by-Step Calculation Demonstrations
        </h2>

        <div className="space-y-4 text-xs">
          {/* Example 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Example 1: Entry-Level Single Earner ($72,000 Salary, $300 Debt)
            </h3>
            <div className="font-mono bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
              <div>Gross Monthly = $72,000 / 12 = $6,000/mo</div>
              <div>30% Standard Rule Cap = $6,000 × 0.30 = $1,800/mo</div>
              <div>Front-End Ratio = ($1,800 / $6,000) × 100% = 30.0%</div>
              <div>Back-End DTI = (($1,800 + $300) / $6,000) × 100% = 35.0% (Comfortable)</div>
              <div>Discretionary Residual = $6,000 - $1,800 - $300 = $3,900/mo</div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Example 2: High Debt Burden Earner ($60,000 Salary, $800 Debt)
            </h3>
            <div className="font-mono bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
              <div>Gross Monthly = $60,000 / 12 = $5,000/mo</div>
              <div>Standard 30% Cap = $5,000 × 0.30 = $1,500/mo</div>
              <div>43% Max Back-End Debt Capacity = $5,000 × 0.43 = $2,150/mo</div>
              <div>Allowable Rent after Debt = $2,150 - $800 = $1,350/mo</div>
              <div><strong>Conclusion:</strong> Standard 30% rent ($1,500) pushes Back-End DTI to 46% (Rent-Burdened). Recommended max rent capped at $1,350/mo.</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: SALARY REFERENCE TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Salary-to-Rent Quick Reference Guide
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans tabular-nums">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Annual Salary</th>
                <th className="p-3">Monthly Gross</th>
                <th className="p-3">25% Conservative</th>
                <th className="p-3">30% Standard</th>
                <th className="p-3">35% HCOL</th>
                <th className="p-3 rounded-tr-xl">40x Rule Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              <tr>
                <td className="p-3 font-bold text-blue-600">$35,000</td>
                <td className="p-3">$2,917</td>
                <td className="p-3">$729</td>
                <td className="p-3">$875</td>
                <td className="p-3">$1,021</td>
                <td className="p-3 font-bold">$875/mo</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">$50,000</td>
                <td className="p-3">$4,167</td>
                <td className="p-3">$1,042</td>
                <td className="p-3">$1,250</td>
                <td className="p-3">$1,458</td>
                <td className="p-3 font-bold">$1,250/mo</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600">$75,000</td>
                <td className="p-3">$6,250</td>
                <td className="p-3">$1,563</td>
                <td className="p-3">$1,875</td>
                <td className="p-3">$2,188</td>
                <td className="p-3 font-bold">$1,875/mo</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">$100,000</td>
                <td className="p-3">$8,333</td>
                <td className="p-3">$2,083</td>
                <td className="p-3">$2,500</td>
                <td className="p-3">$2,917</td>
                <td className="p-3 font-bold">$2,500/mo</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600">$150,000</td>
                <td className="p-3">$12,500</td>
                <td className="p-3">$3,125</td>
                <td className="p-3">$3,750</td>
                <td className="p-3">$4,375</td>
                <td className="p-3 font-bold">$3,750/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 7: COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Common Budgeting Mistakes & Pitfalls to Avoid
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-rose-600 dark:text-rose-400">Ignoring Utility Overhead</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Focusing exclusively on base rent while ignoring electricity, water, internet, trash, and parking fees (which typically add 15% to 25% above base rent).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-rose-600 dark:text-rose-400">Confusing Gross vs. Net Income</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Landlords screen using pre-tax gross income, but personal lifestyle sustainability depends on net take-home pay after taxes, insurance, and retirement contributions.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Practical Applications Across Real Estate & Financial Planning
        </h2>
        <p className="text-sm leading-relaxed">
          Rent affordability metrics are critical tools used by tenant applicant screeners, wealth advisors, urban economists, and roommate split managers to structure sustainable living arrangements and prevent lease default risks.
        </p>
      </section>

      {/* SECTION 9: RELATED CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Related Financial Concepts & Advanced Ratios
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Front-End DTI Ratio</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Percentage of monthly gross income spent strictly on housing overhead (Rent + Utilities). Target ceiling: 28% to 30%.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Back-End DTI Ratio</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Percentage of monthly gross income spent on Housing + All recurring minimum debt obligations. Target ceiling: 36% to 43%.
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
          A healthy rental budget balances landlord screening criteria (30% gross rule, 40x salary rule) with personal financial realities (50/30/20 take-home rule and Back-End DTI limits). By accounting for all-in utility overhead, upfront liquid move-in cash, and fair roommate amenity splits, renters can secure housing that enhances quality of life while maintaining robust savings and debt payoff trajectories.
        </p>
      </section>
    </div>
  );
}
