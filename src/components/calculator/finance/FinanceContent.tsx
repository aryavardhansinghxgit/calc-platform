"use client";

import React from "react";

export function FinanceContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* H1 Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Finance Calculator — Time Value of Money (TVM) Solvers
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Complete 5-Variable TVM Decision Engine, Compound Interest Growth Visualizer & Inflation-Adjusted Wealth Modeling.
        </p>
      </div>

      {/* SECTION 1: UNDERSTANDING TVM */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Understanding the Time Value of Money (TVM)
        </h2>
        <p className="text-sm leading-relaxed">
          The <strong>Time Value of Money (TVM)</strong> is the foundational principle of financial engineering. It dictates that a dollar available today is worth more than a dollar promised in the future because today's dollar can be invested to earn interest or investment returns over time.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans text-center">Fundamental TVM Governing Equation</div>
          
          <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 space-y-2 text-center">
            <div>{"PV + PMT \\cdot \\left[ \\frac{1 - (1+i)^{-N}}{i} \\right] \\cdot (1 + i \\cdot type) + FV \\cdot (1+i)^{-N} = 0"}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="font-extrabold text-blue-600 block">PV (Present Value)</span>
            <span className="text-slate-600 dark:text-slate-400">The current starting principal or initial lump sum deposit.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="font-extrabold text-blue-600 block">FV (Future Value)</span>
            <span className="text-slate-600 dark:text-slate-400">The final accumulated balance after compound interest and payments.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="font-extrabold text-blue-600 block">PMT (Periodic Payment)</span>
            <span className="text-slate-600 dark:text-slate-400">The recurring contribution added or loan installment paid per period.</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPOUND INTEREST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          The Power of Compound Interest
        </h2>
        <p className="text-sm leading-relaxed">
          Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, compound interest accelerates wealth exponentially over long durations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-900 border border-blue-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">Simple Interest Formula</h3>
            <p className="text-slate-600 dark:text-slate-400 font-mono">{"FV = PV \\cdot (1 + r \\cdot t)"}</p>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Interest is earned only on the initial principal amount.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-emerald-600 text-sm">Compound Interest Formula</h3>
            <p className="text-slate-600 dark:text-slate-400 font-mono">{"FV = PV \\cdot \\left(1 + \\frac{r}{m}\\right)^{m \\cdot t}"}</p>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Interest is earned on principal plus accumulated interest.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: ANNUITY DUE VS ORDINARY ANNUITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Deposit Timing: Beginning vs. End of Period (Annuity Due vs. Ordinary Annuity)
        </h2>
        <p className="text-sm leading-relaxed">
          The timing of periodic contributions changes the final balance. 
        </p>
        <ul className="list-disc pl-5 text-xs space-y-2">
          <li><strong>Ordinary Annuity (End of Period):</strong> Contributions occur at the end of each payment cycle (e.g. monthly paycheck savings). The final deposit earns zero interest in the final period.</li>
          <li><strong>Annuity Due (Beginning of Period):</strong> Contributions occur at the start of each cycle (e.g. rent or lease payments). Every deposit earns one extra compounding cycle of interest.</li>
        </ul>
      </section>

      {/* SECTION 4: INFLATION AND TAX DRAG */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Impact of Inflation and Taxes on Wealth Accumulation
        </h2>
        <p className="text-sm leading-relaxed">
          Gross nominal returns do not reflect true purchasing power. To evaluate real wealth accumulation, investors must adjust for <strong>Inflation Drag</strong> and <strong>Capital Gains Tax Drag</strong>.
        </p>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2 font-mono">
          <div className="font-bold text-blue-600 font-sans">Real Inflation Purchasing Power Formula</div>
          <div className="bg-white dark:bg-slate-950 p-2.5 rounded-lg text-slate-800 dark:text-slate-200 text-center font-bold">
            {"Real FV = \\frac{FV}{(1 + i_{inflation})^t}"}
          </div>
        </div>
      </section>

      {/* SECTION 5: SUMMARY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <h2 className="font-extrabold text-sm text-blue-700 dark:text-blue-300">
          Educational Summary
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Mastering TVM mathematics allows investors, students, and loan underwriters to compute precise future values, periodic payments, and required interest rates across any financial horizon.
        </p>
      </section>
    </div>
  );
}
