"use client";

import React from "react";
import Link from "next/link";

export function DownPaymentContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* H1 Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Down Payment Calculator — Mortgage Down Payment &amp; PMI Payoff Suite
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Comprehensive Guide to Home Purchase Equity, Loan Program Minimums, 78% LTV PMI Removal &amp; Cash-to-Close.
        </p>
      </div>

      {/* SECTION 1: WHAT IS A DOWN PAYMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          What is a Down Payment &amp; How Does it Work?
        </h2>
        <p className="text-sm leading-relaxed">
          A down payment is the upfront cash contribution paid by a homebuyer toward the total purchase price of real estate. The remaining balance is financed through a primary mortgage loan secured by the property. The down payment establishes your initial home equity position and directly dictates your Loan-to-Value (LTV) ratio. For evaluating overall borrowing limits, use our <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Mortgage Calculator</Link> or <Link href="/calculators/house-affordability-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">House Affordability Calculator</Link>.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans text-center">Core Mortgage Down Payment Formulas</div>
          
          <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 space-y-2">
            <div><strong>1. Down Payment Amount ($):</strong></div>
            <div className="text-center font-mono">{"Down Payment = Purchase Price (P) \\times \\frac{Down \\%}{100}"}</div>
            
            <div className="pt-2"><strong>2. Loan Principal Financed ($):</strong></div>
            <div className="text-center font-mono">{"Loan Amount = Purchase Price - Down Payment"}</div>

            <div className="pt-2"><strong>3. Total Cash Required at Closing ($):</strong></div>
            <div className="text-center font-mono">{"Cash to Close = Down Payment + Upfront Closing Costs (2\\% - 5\\%)"}</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW MUCH DOWN PAYMENT DO YOU REALLY NEED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          How Much Down Payment Do You Really Need?
        </h2>
        <p className="text-sm leading-relaxed">
          The required down payment varies based on loan program guidelines, borrower credit score, occupancy type, and property classification:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">0% Down Payment</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Available via government-backed <Link href="/calculators/va-mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">VA loans</Link> (eligible military veterans) and USDA Rural Development loans (qualifying rural properties).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">3% – 3.5% Down Payment</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Conventional 97 programs require 3% down for qualifying first-time buyers with 620+ credit scores. <Link href="/calculators/fha-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">FHA loans</Link> require 3.5% down for scores 580+.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">20% Down Payment</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              The standard threshold to eliminate Private Mortgage Insurance (PMI) on conventional financing and minimize lifetime interest expense.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE 20% DOWN PAYMENT MYTH VS REALITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          The 20% Down Payment Myth vs. Reality
        </h2>
        <p className="text-sm leading-relaxed">
          While putting 20% down eliminates PMI, waiting years to accumulate 20% involves trade-offs regarding market entry timing and capital liquidity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <h3 className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">Pros of 20% Down</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Instant $0 Private Mortgage Insurance (PMI) saving $100–$300/mo</li>
              <li>Lower monthly principal &amp; interest (P&amp;I) payment</li>
              <li>Lower lifetime interest expense over the loan term</li>
              <li>Stronger offer competitiveness in seller markets</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <h3 className="font-extrabold text-amber-700 dark:text-amber-400 text-sm">Cons &amp; Opportunity Costs of 20% Down</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Depletes liquid cash reserves and emergency safety nets</li>
              <li>Delaying purchase while saving can expose buyers to market price shifts</li>
              <li>Opportunity cost of allocating capital away from other diversified investment assets</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: LOAN PROGRAM COMPARISON MATRIX TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Mortgage Programs &amp; Minimum Down Payment Requirements
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Loan Program</th>
                <th className="p-3">Min Down %</th>
                <th className="p-3">Min Credit Score</th>
                <th className="p-3">Mortgage Insurance Rules</th>
                <th className="p-3 rounded-tr-xl">Upfront Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              <tr>
                <td className="p-3 font-bold text-blue-600">Conventional 97</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">3.0%</td>
                <td className="p-3">620</td>
                <td className="p-3 text-emerald-600 font-bold">Cancels at 78%–80% LTV</td>
                <td className="p-3">$0</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">FHA Loan</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">3.5%</td>
                <td className="p-3">580</td>
                <td className="p-3 text-red-500 font-bold">Life of Loan (if &lt;10% down)</td>
                <td className="p-3 text-amber-600">1.75% UFMIP</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600">VA Loan (Veteran)</td>
                <td className="p-3 font-bold text-emerald-600">0.0%</td>
                <td className="p-3">580+ (Lender)</td>
                <td className="p-3 text-emerald-600 font-bold">$0 Monthly PMI Benefit!</td>
                <td className="p-3 text-amber-600">1.4%–2.15% Funding Fee</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">USDA Rural</td>
                <td className="p-3 font-bold text-emerald-600">0.0%</td>
                <td className="p-3">640</td>
                <td className="p-3 text-amber-600">0.35% Annual Guarantee Fee</td>
                <td className="p-3 text-amber-600">1.0% Guarantee Fee</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: PMI REMOVAL GUIDELINES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Private Mortgage Insurance (PMI) &amp; How to Remove It (80% vs. 78% LTV)
        </h2>
        <p className="text-sm leading-relaxed">
          Federal protections under the <strong>Homeowners Protection Act of 1998</strong> dictate when Private Mortgage Insurance (PMI) on conventional loans must be cancelled:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">80% LTV Borrower Cancellation Request</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              When your principal balance drops to 80% of the original purchase price or appraised value, you have the right to submit a written cancellation request to your loan servicer.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">78% LTV Automatic Lender Termination</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Lenders are legally required to automatically terminate PMI once your loan balance reaches 78% of original value based on the scheduled amortization table. If you are considering refinancing to remove PMI, check our <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Refinance Calculator</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: DOWN PAYMENT ASSISTANCE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Down Payment Assistance (DPA) Programs
        </h2>
        <p className="text-sm leading-relaxed">
          Numerous state, county, and municipal Down Payment Assistance (DPA) programs exist across the U.S. to help qualified buyers cover upfront cash needs:
        </p>
        <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
          <li><strong>DPA Grants:</strong> Outright gift funds that never require repayment.</li>
          <li><strong>Forgivable 2nd Loans:</strong> Zero-interest secondary liens forgiven after residing in the property for a specified period (typically 3 to 5 years).</li>
          <li><strong>Deferred Payment Loans:</strong> Second liens with 0% interest repaid when the home is sold, refinanced, or the first mortgage is satisfied. To evaluate home equity lines, see our <Link href="/calculators/home-equity-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Home Equity Loan Calculator</Link>.</li>
        </ul>
      </section>

      {/* SECTION 7: SUMMARY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <h2 className="font-extrabold text-sm text-blue-700 dark:text-blue-300">
          Educational Summary
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Understanding down payment requirements, PMI drop-off milestones, closing costs, and investment opportunity costs allows buyers to choose a balanced down payment strategy tailored to their personal financial goals. For general financing calculations, explore our <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Loan Calculator</Link>.
        </p>
      </section>
    </div>
  );
}

export default DownPaymentContent;
