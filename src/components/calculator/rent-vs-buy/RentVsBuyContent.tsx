"use client";

import React from "react";

export function RentVsBuyContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* H1 Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Rent vs. Buy Calculator — Should You Buy a Home or Continue Renting?
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Complete Housing Investment Suite, Opportunity Cost Modeling, Ben Felix 5% Rule & TCJA Tax Limits.
        </p>
      </div>

      {/* SECTION 1: HOW BREAKEVEN HORIZON IS CALCULATED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          How the Rent vs. Buy Breakeven Horizon is Calculated (Step-by-Step)
        </h2>
        <p className="text-sm leading-relaxed">
          Evaluating whether to rent or buy a home goes far beyond comparing a monthly mortgage payment to a monthly rent check. A true financial evaluation requires tracking cumulative <strong>unrecoverable costs</strong> and <strong>opportunity costs</strong> over your planned stay horizon.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans text-center">Core Housing Decision Formulas</div>
          
          <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 space-y-2">
            <div><strong>1. Ben Felix 5% Unrecoverable Owning Cost Rule:</strong></div>
            <div className="text-center font-mono">{"Unrecoverable Cost_{Annual} \\approx Home Value \\times (r_{mortgage} + 1\\%_{tax} + 1\\%_{maint})"}</div>
            
            <div className="pt-2"><strong>2. Opportunity Cost of Invested Down Payment Capital:</strong></div>
            <div className="text-center font-mono">{"Future Value_{Stock Portfolio} = Down Payment \\times (1 + r_{investment})^t"}</div>

            <div className="pt-2"><strong>3. Price-to-Rent Ratio Market Indicator:</strong></div>
            <div className="text-center font-mono">{"Price-to-Rent Ratio = \\frac{Home Purchase Price}{Annual Target Rent}"}</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE TRUE COSTS OF HOMEOWNERSHIP VS RENTING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          The True Costs of Homeownership vs. Renting
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">1. Unrecoverable Costs of Owning</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Money lost permanently to non-equity housing expenses: Mortgage Interest, Property Taxes, Homeowners Insurance, HOA Dues, Maintenance/Repairs, and Upfront/Selling Closing Commissions (8%–10% total).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">2. Unrecoverable Costs of Renting</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Money paid directly to your landlord: Monthly Rent, Annual Rent Escalation (typically 3%–5%/yr), Renter's Insurance, and Application/Move-in Fees. Zero equity accumulates.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">3. Opportunity Cost of Down Payment</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              The $100,000 down payment used to buy a home cannot compound in a diversified stock market index fund (e.g. S&P 500 averaging 8%–10% CAGR).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: PRICE TO RENT RATIO BENCHMARKING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          The Price-to-Rent Ratio: How to Evaluate Your Local Housing Market
        </h2>
        <p className="text-sm leading-relaxed">
          The Price-to-Rent Ratio is a classic real estate metric that compares local property prices directly against prevailing rental rates:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-1">
            <h3 className="font-extrabold text-emerald-700 dark:text-emerald-400">Ratio 1 to 15 (Green)</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal">
              Buying is significantly favored. Property purchase prices are low relative to annual rent checks.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1">
            <h3 className="font-extrabold text-amber-700 dark:text-amber-400">Ratio 16 to 20 (Yellow)</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal">
              Balanced housing market. The optimal decision depends on your planned stay horizon and local appreciation.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-1">
            <h3 className="font-extrabold text-rose-700 dark:text-rose-400">Ratio 21+ (Red)</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal">
              Renting is strongly favored. High property prices make renting and investing the surplus capital far richer.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: BEN FELIX 5% RULE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          The 5% Rule: Quick Mental Math for the Rent vs. Buy Decision
        </h2>
        <p className="text-sm leading-relaxed">
          Popularized by portfolio manager Ben Felix, the 5% Rule provides a quick heuristic to estimate the unrecoverable monthly cost of owning a home:
        </p>
        <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50 text-xs space-y-1">
          <div>• <strong>3% Cost of Capital:</strong> Mortgage interest rate or equity opportunity cost</div>
          <div>• <strong>1% Property Tax:</strong> National average municipal property tax rate</div>
          <div>• <strong>1% Maintenance:</strong> Annual routine upkeep and capital repairs</div>
          <div className="pt-2 font-bold text-blue-600 dark:text-blue-400">
            Rule: If monthly rent is less than (Home Value × 5% / 12), renting is mathematically superior.
          </div>
        </div>
      </section>

      {/* SECTION 5: REAL-WORLD CASE STUDIES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Real-World Case Studies: 3-Year, 7-Year, and 15-Year Scenarios
        </h2>

        <div className="space-y-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Scenario 1: 3-Year Stay ($400,000 Home vs. $2,200/mo Rent)
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              <strong>Winner: Renting.</strong> Buying incurs $8,000 in upfront closing costs and $28,000 in selling fees (7%). Early mortgage payments consist almost entirely of interest. Renting saves ~$22,000 over 3 years.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Scenario 2: 10-Year Stay ($400,000 Home vs. $2,200/mo Rent)
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              <strong>Winner: Buying.</strong> Annual 3.5% home appreciation grows property value to $564,000, creating $164,000 in equity. Meanwhile, 3.5% rent inflation raises rent to $2,950/mo. Buying outpaces renting by Year 5.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: SUMMARY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <h2 className="font-extrabold text-sm text-blue-700 dark:text-blue-300">
          Educational Summary
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          The decision to rent or buy depends heavily on your planned length of stay, local price-to-rent ratio, and discipline in investing surplus rental savings. Using precise multi-year pro-forma modeling ensures a clear, objective housing choice.
        </p>
      </section>
    </div>
  );
}
