"use client";

import React from "react";

export function APRContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* SECTION 1: INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. Introduction: What is Annual Percentage Rate (APR) & Why it Matters
        </h2>
        <p className="text-sm leading-relaxed">
          The <strong>Annual Percentage Rate (APR)</strong> is the standardized, all-inclusive financial metric measuring the true annual cost of borrowing money. While nominal interest rates reflect only the baseline interest fee charged on the loan balance, the APR incorporates both the nominal interest rate AND mandatory upfront financing fees—such as origination charges, processing fees, broker commissions, and loan discount points.
        </p>
        <p className="text-sm leading-relaxed">
          Established under the federal <strong>Truth in Lending Act (TILA)</strong>, APR disclosures prevent lenders from advertising misleadingly low interest rates while hiding significant upfront financing costs. By standardizing total borrowing cost into a single annualized percentage, APR enables consumers to make direct, side-by-side comparisons between competing loan offers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">Nominal Rate</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The basic periodic interest percentage charged on the remaining principal loan balance.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">Real APR</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The true effective interest rate factoring in mandatory upfront origination fees and closing costs.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">APY (Yield)</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Reflects intra-year compounding effects (monthly or daily) on savings balances or revolving credit debt.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Mathematical Concept: Solving for Internal Rate of Return (IRR)
        </h2>
        <p className="text-sm leading-relaxed">
          Calculating APR requires solving for the internal periodic discount rate \(r\) that equates the net amount financed (Loan Amount minus Upfront Fees) to the present value of all future periodic monthly payments:
        </p>

        <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-3 text-xs">
          <div className="font-bold text-blue-700 dark:text-blue-400 text-sm">Truth in Lending Act (TILA) Present Value Identity:</div>
          <div className="p-3 bg-white dark:bg-slate-950 rounded-xl text-center font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
            {"P_{financed} = P_{gross} - Fees = \\sum_{t=1}^{N} \\frac{C}{(1 + r)^t}"}
          </div>
          <p className="text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
            {"Where P_gross is the nominal loan amount, Fees represents mandatory upfront lender charges, C is the periodic payment, N is total payment periods, and r is the internal periodic rate solved via Newton-Raphson iteration."}
          </p>
        </div>
      </section>

      {/* SECTION 3: FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Core Loan Payment & APR Equations
        </h2>
        <div className="space-y-3 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="font-bold text-blue-600 font-sans text-sm">1. Periodic Monthly Loan Payment (PMT)</div>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-center font-bold text-sm text-blue-600 dark:text-blue-400">
              {"C = P \\times \\frac{i(1 + i)^N}{(1 + i)^N - 1}"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="font-bold text-blue-600 font-sans text-sm">2. Annualized Real APR Conversion</div>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-center font-bold text-sm text-blue-600 dark:text-blue-400">
              {"APR = r \\times k \\times 100\\%"}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. How the Calculation Works: Step-by-Step Numerical Process
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 1: Compute Base Monthly Payment</span>
            <p className="text-slate-600 dark:text-slate-400">
              Using the nominal interest rate and total loan term, compute standard monthly payment C.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 2: Determine Net Amount Financed</span>
            <p className="text-slate-600 dark:text-slate-400">
              {"Subtract mandatory upfront lender fees from gross loan principal (Amount Financed = Gross Principal - Fees)."}
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 3: Solve Periodic Discount Rate \(r\)</span>
            <p className="text-slate-600 dark:text-slate-400">
              Execute Newton-Raphson numerical approximation to find exact rate \(r\) satisfying present value equation.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 4: Multiply by Periods Per Year</span>
            <p className="text-slate-600 dark:text-slate-400">
              Multiply periodic rate \(r\) by 12 (monthly) or 26 (bi-weekly) to yield official annual APR.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Worked Step-by-Step Benchmark Examples
        </h2>

        <div className="space-y-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Example 1: Standard Personal Loan ($100,000, 10 Years, 6.0% Rate, $2,500 Fees)
            </h3>
            <div className="font-mono bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
              <div>Loan Amount = $100,000 | Upfront Fees = $2,500 | Amount Financed = $97,500</div>
              <div>Monthly Rate \(i = 6.0\% / 12 = 0.5\%\) per month</div>
              <div>Monthly Payment \(C = \$1,110.21\) / month</div>
              <div>Total Payments over 120 Months = $133,224.60</div>
              <div>{"Solve r where sum( $1,110.21 / (1+r)^t ) = $97,500 -> r = 0.5469% / mo"}</div>
              <div><strong>Real APR = 0.5469% × 12 = 6.563%</strong> (0.563% gap above nominal rate)</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Example 2: Mortgage Loan ($350,000 House, 20% Down, 6.2% Rate, $3,500 Fees + 0.5 Points)
            </h3>
            <div className="font-mono bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
              <div>Loan Amount = $280,000 | Down Payment = $70,000</div>
              <div>Points Fee (0.5%) = $1,400 | Total Upfront Fees = $3,500 + $1,400 = $4,900</div>
              <div>Amount Financed = $280,000 - $4,900 = $275,100</div>
              <div>Base Monthly Payment \(C = \$1,714.91\) / month</div>
              <div><strong>Real Mortgage APR = 6.367%</strong></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: INCLUDED VS EXCLUDED FEES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Included vs. Excluded Fees in TILA Mortgage APR
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">Fees INCLUDED in APR</h3>
            <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-inside font-normal">
              <li>Lender origination & processing fees</li>
              <li>Discount points (paid to buy down rate)</li>
              <li>Underwriting and document preparation fees</li>
              <li>Private Mortgage Insurance (PMI / MIP)</li>
              <li>Escrow administration & broker fees</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Fees EXCLUDED from APR</h3>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside font-normal">
              <li>Home appraisal and pest inspection fees</li>
              <li>Title insurance and title search fees</li>
              <li>Attorney fees and notary charges</li>
              <li>Property taxes and hazard insurance reserves</li>
              <li>Recording and government transfer taxes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 7: COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Common APR Misconceptions & Early Payoff Pitfalls
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-rose-600 dark:text-rose-400">Comparing APRs Across Different Terms</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Comparing a 15-year mortgage APR to a 30-year mortgage APR is misleading because upfront fees are amortized over half the duration, distorting relative cost.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-rose-600 dark:text-rose-400">Early Refinancing / Selling Impact</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Disclosed APR assumes you hold the loan for its full term. If you sell or refinance after 5 years, your actual realized APR will be significantly higher due to unamortized upfront points.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: RELATED CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Related Financial Concepts: APY & Compounding
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Annual Percentage Yield (APY)</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Measures total annual interest earned on savings or charged on revolving debt including compounding intra-year frequency.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Mortgage Discount Points</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Upfront cash paid to the lender at closing in exchange for a permanently reduced nominal interest rate.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: SUMMARY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <h2 className="font-extrabold text-sm text-blue-700 dark:text-blue-300">
          9. Educational Summary
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          The Annual Percentage Rate (APR) provides the ultimate objective benchmark for comparing loan offers by combining nominal interest rates with upfront financing fees. Evaluating both nominal rate and real APR empowers borrowers to choose the most cost-effective financing structure based on expected holding duration.
        </p>
      </section>
    </div>
  );
}
