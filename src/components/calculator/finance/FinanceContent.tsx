"use client";

import React from "react";

export function FinanceContent() {
  return (
    <div className="space-y-6 text-black dark:text-white font-medium leading-normal max-w-4xl mx-auto text-xs">
      {/* H1 Title */}
      <div className="border-b border-slate-300 dark:border-slate-700 pb-2">
        <h1 className="text-xl font-black text-black dark:text-white tracking-tight">
          Finance Calculator — Time Value of Money (TVM) Solvers
        </h1>
        <p className="text-xs text-black dark:text-white mt-0.5">
          Complete 5-Variable TVM Decision Engine, Compound Interest Growth Visualizer & Inflation-Adjusted Wealth Modeling.
        </p>
      </div>

      {/* SECTION 1: UNDERSTANDING TVM */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          Understanding the Time Value of Money (TVM)
        </h2>
        <p className="leading-relaxed">
          The <strong>Time Value of Money (TVM)</strong> is the foundational principle of financial engineering. It dictates that a dollar available today is worth more than a dollar promised in the future because today's dollar can be invested to earn interest or investment returns over time.
        </p>

        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-1.5 font-mono">
          <div className="font-bold text-black dark:text-white text-xs font-sans text-center">Fundamental TVM Governing Equation</div>
          
          <div className="p-2 bg-white dark:bg-slate-950 rounded text-xs font-bold text-black dark:text-white text-center">
            <div>{"PV + PMT \\cdot \\left[ \\frac{1 - (1+i)^{-N}}{i} \\right] \\cdot (1 + i \\cdot type) + FV \\cdot (1+i)^{-N} = 0"}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
            <span className="font-bold text-black dark:text-white block">PV (Present Value)</span>
            <span className="text-black dark:text-white">The current starting principal or initial lump sum deposit.</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
            <span className="font-bold text-black dark:text-white block">FV (Future Value)</span>
            <span className="text-black dark:text-white">The final accumulated balance after compound interest and payments.</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
            <span className="font-bold text-black dark:text-white block">PMT (Periodic Payment)</span>
            <span className="text-black dark:text-white">The recurring contribution added or loan installment paid per period.</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPOUND INTEREST */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          The Power of Compound Interest
        </h2>
        <p className="leading-relaxed">
          Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, compound interest accelerates wealth exponentially over long durations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-black dark:text-white text-xs">Simple Interest Formula</h3>
            <p className="text-black dark:text-white font-mono">{"FV = PV \\cdot (1 + r \\cdot t)"}</p>
            <p className="text-black dark:text-white">Interest is earned only on the initial principal amount.</p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-black dark:text-white text-xs">Compound Interest Formula</h3>
            <p className="text-black dark:text-white font-mono">{"FV = PV \\cdot \\left(1 + \\frac{r}{m}\\right)^{m \\cdot t}"}</p>
            <p className="text-black dark:text-white">Interest is earned on principal plus accumulated interest.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: ANNUITY DUE VS ORDINARY ANNUITY */}
      <section className="space-y-2">
        <h2 className="text-base font-bold text-black dark:text-white tracking-tight">
          Deposit Timing: Beginning vs. End of Period (Annuity Due vs. Ordinary Annuity)
        </h2>
        <p className="leading-relaxed">
          The timing of periodic contributions changes the final balance. 
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Ordinary Annuity (End of Period):</strong> Contributions occur at the end of each payment cycle. The final deposit earns zero interest in the final period.</li>
          <li><strong>Annuity Due (Beginning of Period):</strong> Contributions occur at the start of each cycle. Every deposit earns one extra compounding cycle of interest.</li>
        </ul>
      </section>

      {/* SECTION 4: INFLATION AND TAX DRAG */}
      <section className="space-y-2">
        <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight">
          Impact of Inflation and Taxes on Wealth Accumulation
        </h2>
        <p className="leading-relaxed">
          Gross nominal returns do not reflect true purchasing power. To evaluate real wealth accumulation, investors must adjust for <strong>Inflation Drag</strong> and <strong>Capital Gains Tax Drag</strong>.
        </p>

        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-1 font-mono">
          <div className="font-bold text-black dark:text-white font-sans">Real Inflation Purchasing Power Formula</div>
          <div className="bg-white dark:bg-slate-950 p-2 rounded text-black dark:text-white text-center font-bold">
            {"Real FV = \\frac{FV}{(1 + i_{inflation})^t}"}
          </div>
        </div>
      </section>

      {/* SECTION 5: SUMMARY */}
      <section className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-1">
        <h2 className="font-bold text-xs text-black dark:text-white">
          Educational Summary
        </h2>
        <p className="text-black dark:text-white leading-relaxed font-medium">
          Mastering TVM mathematics allows investors, students, and loan underwriters to compute precise future values, periodic payments, and required interest rates across any financial horizon.
        </p>
      </section>
    </div>
  );
}
