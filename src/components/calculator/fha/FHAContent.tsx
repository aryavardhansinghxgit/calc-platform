"use client";

import React from "react";

export function FHAContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* SECTION 1: INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. Introduction: What is an FHA Loan & How Does it Work?
        </h2>
        <p className="text-sm leading-relaxed">
          An <strong>FHA loan</strong> is a government-backed mortgage insured by the Federal Housing Administration (HUD). Established under the National Housing Act of 1934, the FHA program was created to expand homeownership opportunities for first-time buyers, moderate-income families, and borrowers with limited down payment savings or lower credit scores.
        </p>
        <p className="text-sm leading-relaxed">
          The FHA does not directly lend money to home buyers. Instead, it provides federal mortgage insurance to approved private lenders (banks, credit unions, and mortgage companies). This insurance guarantees that if a borrower defaults on their loan, the federal government will cover the lender’s financial losses. Because lender risk is mitigated, banks can offer competitive interest rates with down payments as low as 3.5%.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">3.5% Down Payment</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Qualified buyers with a credit score of 580 or higher need only a 3.5% down payment at closing.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">Flexible Credit</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Borrowers with credit scores between 500 and 579 can qualify with a 10% down payment.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 dark:text-blue-400">Seller Concessions</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Sellers can contribute up to 6% of the purchase price toward buyer closing costs and prepaid items.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. FHA Mortgage Insurance Premium (MIP) Structure
        </h2>
        <p className="text-sm leading-relaxed">
          To fund the government insurance pool, FHA guidelines require borrowers to pay two distinct types of mortgage insurance:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-sm">1. Upfront MIP (UFMIP)</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
              A mandatory flat fee equal to <strong>1.75%</strong> of the base loan amount. UFMIP is charged at closing and is almost universally financed directly into the principal loan balance rather than paid in cash.
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono text-[11px] font-bold text-blue-600">
              UFMIP = Base Loan Amount × 1.75%
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-sm">2. Annual MIP (Paid Monthly)</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
              An ongoing annual fee calculated as a percentage of the base loan amount (standard <strong>0.55%</strong> for 30-year loans with 3.5% down) divided into 12 equal monthly payments added to your mortgage PITI bill.
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono text-[11px] font-bold text-blue-600">
              Monthly MIP = (Base Loan Amount × Annual MIP Rate) / 12
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Core FHA Loan Formulas & Derivations
        </h2>
        <div className="space-y-3 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="font-bold text-blue-600 font-sans text-sm">1. Total Financed Loan Amount</div>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-center font-bold text-sm text-blue-600 dark:text-blue-400">
              {"Total \\ Loan = (Home \\ Price - Down \\ Payment) \\times (1 + 0.0175)"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="font-bold text-blue-600 font-sans text-sm">2. Total Monthly PITI Payment</div>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-center font-bold text-sm text-blue-600 dark:text-blue-400">
              {"Total \\ PITI = P\\&I + \\frac{Taxes}{12} + \\frac{Insurance}{12} + \\frac{Base \\ Loan \\times MIP\\%}{12} + HOA"}
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
            <span className="font-extrabold text-blue-600">Step 1: Compute Base Loan & Down Payment</span>
            <p className="text-slate-600 dark:text-slate-400">
              Multiply home purchase price by 3.5% (or 10%) to establish down payment, then subtract from price to determine base loan amount.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 2: Apply 1.75% Upfront MIP (UFMIP)</span>
            <p className="text-slate-600 dark:text-slate-400">
              Calculate 1.75% of base loan amount and add to base principal if financed.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 3: Determine Annual MIP Rate & Duration</span>
            <p className="text-slate-600 dark:text-slate-400">
              Check loan term and down payment tier to apply 0.55% or 0.50% annual MIP rate, and flag whether MIP cancels after 11 years or stays for life of loan.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Step 4: Sum Principal, Interest, Escrow & HOA</span>
            <p className="text-slate-600 dark:text-slate-400">
              Compute monthly mortgage P&I using total financed loan amount, then sum monthly taxes, insurance, MIP, and HOA to get total PITI.
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
              Example 1: Standard 3.5% Down ($350,000 Home Purchase)
            </h3>
            <div className="font-mono bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
              <div>Home Price = $350,000 | Down Payment (3.5%) = $12,250</div>
              <div>Base Loan Amount = $350,000 - $12,250 = $337,750</div>
              <div>Upfront MIP (1.75%) = $337,750 × 1.75% = $5,910.63</div>
              <div>Total Financed Loan Amount = $337,750 + $5,910.63 = $343,660.63</div>
              <div>Monthly P&I Payment (6.5% 30-Yr Fixed) = $2,172.17/mo</div>
              <div>Monthly FHA Annual MIP (0.55%) = ($337,750 × 0.55%) / 12 = $154.80/mo</div>
              <div>Property Taxes ($300/mo) + Insurance ($116.67/mo) = $416.67/mo</div>
              <div><strong>Total Monthly PITI Payment = $2,743.64/mo</strong> (MIP Duration: Life of Loan)</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Example 2: 10% Down Payment ($400,000 Purchase with 11-Year MIP Drop-off)
            </h3>
            <div className="font-mono bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
              <div>Home Price = $400,000 | Down Payment (10.0%) = $40,000</div>
              <div>Base Loan Amount = $360,000</div>
              <div>Upfront MIP (1.75%) = $360,000 × 1.75% = $6,300</div>
              <div>Total Financed Loan = $366,300</div>
              <div>{"Annual MIP Rate = 0.50% (Lower rate for >= 10% down)"}</div>
              <div>Monthly MIP = ($360,000 × 0.50%) / 12 = $150.00/mo</div>
              <div><strong>MIP Duration: Drops off automatically after 11 Years!</strong></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: MIP RATES TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. HUD Official FHA Annual MIP Rates & Duration Schedule
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Loan Term</th>
                <th className="p-3">Down Payment (LTV)</th>
                <th className="p-3">Annual MIP Rate</th>
                <th className="p-3 rounded-tr-xl">MIP Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              <tr>
                <td className="p-3 font-bold text-blue-600">30-Year Term (&gt; 15 Yrs)</td>
                <td className="p-3 font-mono">3.5% Down (LTV &gt; 90%)</td>
                <td className="p-3 font-mono font-bold text-red-500">0.55%</td>
                <td className="p-3 font-bold">Life of Loan (30 Years)</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">30-Year Term (&gt; 15 Yrs)</td>
                <td className="p-3 font-mono">10%+ Down (LTV ≤ 90%)</td>
                <td className="p-3 font-mono font-bold text-emerald-600">0.50%</td>
                <td className="p-3 font-bold text-emerald-600">11 Years</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600">15-Year Term (≤ 15 Yrs)</td>
                <td className="p-3 font-mono">&lt; 10% Down (LTV &gt; 90%)</td>
                <td className="p-3 font-mono font-bold">0.40%</td>
                <td className="p-3 font-bold">Life of Loan (15 Years)</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">15-Year Term (≤ 15 Yrs)</td>
                <td className="p-3 font-mono">10%+ Down (LTV ≤ 90%)</td>
                <td className="p-3 font-mono font-bold text-emerald-600">0.15%</td>
                <td className="p-3 font-bold text-emerald-600">11 Years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 7: COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Common FHA Misconceptions & Underwriting Pitfalls
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-rose-600 dark:text-rose-400">Expecting FHA MIP to Cancel at 80% LTV</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Unlike Conventional PMI, FHA annual MIP does NOT automatically cancel when home equity reaches 20% unless you put down 10% at closing (which cancels after 11 years).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-rose-600 dark:text-rose-400">Assuming FHA is Only for First-Time Buyers</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              FHA loans are available to repeat home buyers, provided the home will serve as your primary residence.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: RELATED CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Related Government Loan Programs: VA & USDA
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">VA Loans (0% Down for Veterans)</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Backed by the Department of Veterans Affairs. Offers 0% down payment and zero ongoing monthly mortgage insurance for eligible service members.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">USDA Loans (Rural Development)</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              0% down payment financing for homes in designated rural areas for low-to-moderate income households.
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
          FHA loans remain one of the most powerful wealth-building tools for home buyers with modest down payment savings or credit scores between 500 and 680. Understanding the two-part MIP structure (1.75% UFMIP + annual MIP) ensures you make informed financing decisions and plan future refinancing strategies as your home equity grows.
        </p>
      </section>
    </div>
  );
}
