"use client";

import React from "react";

export function RentalPropertyContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* SECTION 1: INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. Introduction: Real Estate Investing & The 4 Wealth Generators
        </h2>
        <p className="text-sm leading-relaxed">
          Residential real estate investment involves acquiring, leasing, and managing residential property to produce recurring net operating income and long-term equity growth. Unlike paper financial assets like equities or fixed-income bonds, real estate is a multi-dimensional wealth generator that delivers return through four distinct mechanisms:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">1. Net Cash Flow</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Monthly spendable cash remaining after collecting all rental revenue and paying operational expenses and mortgage debt service.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">2. Loan Amortization</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Tenants pay down your mortgage principal each month, building equity dollar-for-dollar without out-of-pocket cash from the investor.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">3. Capital Appreciation</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Long-term increase in physical land and building market value driven by inflation, replacement costs, and localized demand.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">4. Tax Depreciation</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              IRS 27.5-year straight-line MACRS paper expense deductions that shield positive rental cash flows from current income taxes.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Core Return Metrics: Cap Rate, Cash-on-Cash & IRR
        </h2>
        <p className="text-sm leading-relaxed">
          Evaluating real estate deals requires analyzing return metrics across unleveraged operations, leveraged annual dividend returns, and multi-year compound performance:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-sm">Capitalization Rate (Cap Rate)</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
              Measures property operational yield as if bought 100% in cash. Used to compare property values across markets regardless of debt financing structure.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-sm">Cash-on-Cash (CoC) Return</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
              Measures the actual leveraged cash dividend percentage returned annually on out-of-pocket cash capital invested (Down Payment + Closing + Rehab).
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-sm">Internal Rate of Return (IRR)</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
              The annualized compounded return rate evaluating total cash flows across the entire holding horizon plus terminal net equity proceeds upon sale.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Core Real Estate Financial Equations
        </h2>
        <div className="space-y-3 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="font-bold text-blue-600 font-sans text-sm">1. Net Operating Income (NOI)</div>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-center font-bold text-sm text-blue-600 dark:text-blue-400">
              {"NOI = (Gross \\ Rent + Other \\ Income - Vacancy \\ Loss) - Total \\ Operating \\ Expenses"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="font-bold text-blue-600 font-sans text-sm">2. Capitalization Rate (Cap Rate)</div>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-center font-bold text-sm text-blue-600 dark:text-blue-400">
              {"Cap \\ Rate = \\frac{Annual \\ Net \\ Operating \\ Income \\ (NOI)}{Purchase \\ Price / Property \\ Value} \\times 100\\%"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="font-bold text-blue-600 font-sans text-sm">3. Cash-on-Cash Return (CoC)</div>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-center font-bold text-sm text-blue-600 dark:text-blue-400">
              {"Cash-on-Cash = \\frac{Annual \\ Pre-Tax \\ Cash \\ Flow}{Total \\ Out-of-Pocket \\ Cash \\ Invested} \\times 100\\%"}
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
            <span className="font-extrabold text-blue-600">Step 1: Determine Total Out-of-Pocket Initial Cash</span>
            <p className="text-slate-600 dark:text-slate-400">
              Calculate initial cash required: Down Payment (or full purchase price if cash) + Upfront Closing Costs + Initial Renovation/Rehab Costs.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 2: Compute Effective Gross Revenue & NOI</span>
            <p className="text-slate-600 dark:text-slate-400">
              Deduct expected vacancy loss from gross rental income, then subtract property taxes, insurance, maintenance, HOA, utilities, and management fees.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 3: Deduct Debt Service to Obtain Net Cash Flow</span>
            <p className="text-slate-600 dark:text-slate-400">
              Subtract annual mortgage principal & interest payments from NOI to establish net spendable cash flow.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 4: Simulate Multi-Year Compounding & IRR</span>
            <p className="text-slate-600 dark:text-slate-400">
              Project rent escalation, property appreciation, loan balance paydown, and terminal sale proceeds to solve exact Internal Rate of Return (IRR).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Worked Investment Case Studies
        </h2>

        <div className="space-y-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Case Study A: Turnkey Single-Family Rental ($200,000 Price, 20% Down)
            </h3>
            <div className="font-mono bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
              <div>Purchase Price = $200,000 | Down Payment (20%) = $40,000 | Closing Costs = $6,000</div>
              <div>Total Cash Invested = $40,000 + $6,000 = $46,000</div>
              <div>Monthly Rent = $2,000/mo ($24,000/yr) | Vacancy (5%) = -$100/mo</div>
              <div>Monthly Operating Expenses (Taxes, Ins, Maint) = $616/mo</div>
              <div>Monthly NOI = $1,900 - $616 = $1,284/mo ($15,408/yr)</div>
              <div>Monthly Mortgage Payment (6% 30-Yr) = $959/mo ($11,511/yr)</div>
              <div>Monthly Net Cash Flow = $1,284 - $959 = $325/mo ($3,897/yr)</div>
              <div>Cap Rate = ($15,408 / $200,000) × 100% = 7.70%</div>
              <div>Cash-on-Cash Return = ($3,897 / $46,000) × 100% = 8.47%</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Case Study B: BRRRR Value-Add Strategy ($150,000 Purchase, $40,000 Rehab, $260,000 ARV)
            </h3>
            <div className="font-mono bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
              <div>Initial Cash Outlay = $150,000 + $40,000 = $190,000</div>
              <div>Post-Rehab Appraised Value (ARV) = $260,000</div>
              <div>75% LTV Cash-Out Refinance Loan Amount = $260,000 × 0.75 = $195,000</div>
              <div>Cash Recouped at Refinance = $195,000</div>
              <div>Net Capital Remaining Trapped = $190,000 - $195,000 = -$5,000 (0 Cash Remaining)</div>
              <div><strong>Return:</strong> Infinite Cash-on-Cash Return with 100% capital recouped for next deal.</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: RULES OF THUMB MATRIX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Real Estate Rules of Thumb Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Rule Name</th>
                <th className="p-3">Formula / Threshold</th>
                <th className="p-3 rounded-tr-xl">Primary Strategic Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              <tr>
                <td className="p-3 font-bold text-blue-600">The 1% Rule</td>
                <td className="p-3 font-mono">Monthly Rent ≥ 1% of (Price + Rehab)</td>
                <td className="p-3">Fast initial filter for cash-flowing rental targets.</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">The 2% Rule</td>
                <td className="p-3 font-mono">Monthly Rent ≥ 2% of (Price + Rehab)</td>
                <td className="p-3">High-yield filter for lower cost Midwest/South markets.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600">The 50% Rule</td>
                <td className="p-3 font-mono">Operating Expenses ≈ 50% of Gross Income</td>
                <td className="p-3">Estimates operating expenses before itemizing taxes & ins.</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">The 70% Rule (MAO)</td>
                <td className="p-3 font-mono">Max Offer = (ARV × 70%) - Rehab</td>
                <td className="p-3">Establishes maximum purchase price for distressed flips/BRRRR.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 7: OPEX VS CAPEX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Operating Expenses (OpEx) vs. Capital Expenditures (CapEx)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600 text-sm">Operating Expenses (OpEx)</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
              Routine, ongoing costs required to keep the property operational (property taxes, hazard insurance, minor plumbing/repairs, property management fees, lawn care). Deducted in full each year.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600 text-sm">Capital Expenditures (CapEx)</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
              Infrequent, major structural replacements that extend the life of the property (roof replacement, HVAC unit, water heater, driveway paving). Funded via monthly CapEx reserve accounts.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Common Real Estate Investing Pitfalls
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-rose-600 dark:text-rose-400">Underestimating Maintenance & CapEx</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Failing to allocate 10% to 15% of gross rent for maintenance reserves causes major capital shortfalls when roofs or HVAC systems require replacement.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-rose-600 dark:text-rose-400">Ignoring Vacancy Loss</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Assuming 100% occupancy year-round ignores tenant turnover downtime, eviction risks, and lease-up timelines.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: RELATED CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Tax Shield & 1031 Exchange Concepts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">27.5-Year MACRS Depreciation</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Deducting 3.636% of building improvement value annually reduces taxable income without actual cash outlay.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">1031 Tax-Deferred Exchange</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Reinvesting net sale proceeds into a like-kind replacement property defers all capital gains and depreciation recapture taxes.
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
          Successful real estate analysis balances cash flow, loan amortization, tax depreciation, and long-term appreciation. Utilizing multi-mode modeling (Buy & Hold, BRRRR, Rent Rolls, and Sensitivity Matrix) empowers real estate investors to select profitable deals with predictable risk margins.
        </p>
      </section>
    </div>
  );
}
