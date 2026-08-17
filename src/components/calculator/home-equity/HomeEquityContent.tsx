"use client";

import React from "react";

export function HomeEquityContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* H1 Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Home Equity Loan Calculator — Monthly Payments & Borrowing Power
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Complete Second Mortgage Guide, Combined Loan-to-Value (CLTV) Underwriting, HELOC vs. Refinance Comparison & Tax Rules.
        </p>
      </div>

      {/* SECTION 1: WHAT IS A HOME EQUITY LOAN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. What is a Home Equity Loan?
        </h2>
        <p className="text-sm leading-relaxed">
          A <strong>home equity loan</strong> (also known as a second mortgage) is a one-time installment loan that allows homeowners to borrow against the unencumbered equity built up in their primary residence. Unlike a revolving line of credit, a home equity loan disburses a single lump sum at closing, which is repaid over a fixed term (typically 5 to 30 years) with fixed interest rates and predictable monthly payments.
        </p>
        <p className="text-sm leading-relaxed">
          Because the loan is secured by your property as collateral, interest rates are significantly lower than unsecured personal loans or credit cards. However, because it is a second lien subordinate to your primary mortgage, default carries the strategic risk of second-lien foreclosure.
        </p>
      </section>

      {/* SECTION 2: HOW TO CALCULATE HOME EQUITY AND CLTV */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. How to Calculate Home Equity and Combined LTV (CLTV)
        </h2>
        <p className="text-sm leading-relaxed">
          Home equity is the financial difference between your home’s current fair market value and the balance of all outstanding mortgages:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-center font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans">Core Home Equity & CLTV Formulas</div>
          <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-sm font-bold text-blue-600 dark:text-blue-400 space-y-1">
            <div>{"Home Equity = Market Value - Total Existing Liens"}</div>
            <div>{"CLTV = \\frac{1st Mortgage Balance + Home Equity Loan}{Appraised Home Value} \\times 100"}</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: COMPARISON TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Home Equity Loan vs. HELOC vs. Cash-Out Refinance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Feature</th>
                <th className="p-3">Fixed Home Equity Loan</th>
                <th className="p-3">HELOC</th>
                <th className="p-3 rounded-tr-xl">Cash-Out Refinance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              <tr>
                <td className="p-3 font-bold text-blue-600">Interest Rate Type</td>
                <td className="p-3 font-bold text-emerald-600">Fixed Rate</td>
                <td className="p-3 text-amber-600">Variable (Prime + Margin)</td>
                <td className="p-3 font-bold text-emerald-600">Fixed Rate</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">Payout Method</td>
                <td className="p-3">Single Lump Sum</td>
                <td className="p-3">Revolving Credit Line</td>
                <td className="p-3">Single Lump Sum</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600">Effect on 1st Mortgage</td>
                <td className="p-3 font-bold text-emerald-600">Keeps original 1st rate</td>
                <td className="p-3 font-bold text-emerald-600">Keeps original 1st rate</td>
                <td className="p-3 text-red-500">Replaces 1st mortgage</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">Ideal Use Case</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">Fixed major expense / Remodel</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">Ongoing expenses / Contingency</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">Refinancing higher 1st rates</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: QUALIFICATION REQUIREMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Qualification Requirements & Underwriting Criteria
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Credit Score (620–680+)</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Minimum 620 credit score required; 740+ required for maximum 85%–90% CLTV borrowing limits.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Max CLTV Limits (80%–85%)</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Lenders require 15%–20% equity buffer to remain untouched in the property.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">DTI Cap (≤ 43%)</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Total monthly debt payments including the new home equity loan should not exceed 43% of gross income.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: PROS, CONS & RISKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Pros, Cons, and Strategic Risks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-1">
            <h3 className="font-extrabold text-emerald-700 dark:text-emerald-400">Advantages</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Predictable fixed monthly payments</li>
              <li>Lower interest rates than credit cards</li>
              <li>Tax-deductible interest if used for home improvement</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-1">
            <h3 className="font-extrabold text-rose-700 dark:text-rose-400">Strategic Risks</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Home serves as collateral (foreclosure risk)</li>
              <li>Closing costs of 2% to 5%</li>
              <li>Risk of becoming underwater if market values drop</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 6: SUMMARY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <h2 className="font-extrabold text-sm text-blue-700 dark:text-blue-300">
          Educational Summary
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Home equity loans provide a powerful, fixed-rate financing method to convert home equity into capital without refinancing low first-mortgage interest rates.
        </p>
      </section>
    </div>
  );
}
