"use client";

import React from "react";

export function CashBackContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* H1 Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Cash Back vs. Low Interest Calculator — Auto Loan Incentive Comparison
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Complete Auto Loan Decision Suite, Rebate Taxability, Breakeven Interest Rate Solving & Opportunity Cost Modeling.
        </p>
      </div>

      {/* SECTION 1: STEP-BY-STEP CALCULATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          How to Calculate Cash Back Rebate vs. Low APR Financing (Step-by-Step)
        </h2>
        <p className="text-sm leading-relaxed">
          When purchasing a new vehicle, auto manufacturers frequently force buyers to choose between two mutually exclusive incentives: an upfront <strong>Customer Cash Back Rebate</strong> (e.g. $1,500–$3,500) or a <strong>Special Low-Interest APR</strong> (e.g. 0%, 0.9%, 1.9%). Calculating which option produces the lowest total lifetime cost requires modeling loan principal, sales tax treatment, and interest compounding over time.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans text-center">Core Auto Loan Underwriting Formulas</div>
          
          <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 space-y-2">
            <div><strong>1. Financed Principal (Low Interest Offer):</strong></div>
            <div className="text-center font-mono">{"P_{low} = Vehicle Price + Sales Tax + Fees - Down Payment - TradeIn"}</div>
            
            <div className="pt-2"><strong>2. Financed Principal (Cash Back Offer):</strong></div>
            <div className="text-center font-mono">{"P_{cash} = Vehicle Price - Cash Rebate + Sales Tax + Fees - Down Payment - TradeIn"}</div>

            <div className="pt-2"><strong>3. Monthly Amortization Formula:</strong></div>
            <div className="text-center font-mono">{"M = P \\times \\frac{r(1 + r)^n}{(1 + r)^n - 1}"}</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: REBATES VS SPECIAL APR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Understanding Manufacturer Auto Incentives: Rebates vs. Special APR
        </h2>
        <p className="text-sm leading-relaxed">
          Car manufacturers use captive finance companies (such as Toyota Financial Services, Ford Credit, or GM Financial) to offer subsidized financing deals. The fundamental trade-off is:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-900 border border-blue-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">Customer Cash Back Rebate</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Reduces the initial purchase price upfront. You must secure financing at standard market interest rates through a bank, credit union, or regular dealer loan.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-emerald-600 text-sm">Low-Interest Promotional APR (0%–2.9%)</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Subsidizes the ongoing interest charge over the entire loan term, but forfeits the upfront cash discount. Requires prime credit approval (720+ FICO).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: 4 CRUCIAL FACTORS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          How to Choose Between Cash Back and Low-Interest Auto Financing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">1. Loan Term Length (36 vs 60 vs 72 Months)</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Shorter terms (24–48 months) strongly favor <strong>Cash Back</strong> because interest has less time to compound. Longer terms (60–84 months) favor <strong>Low APR</strong> as cumulative interest savings outpace the rebate.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">2. Outside Credit Union Loan Rates</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              If your credit union offers 4.5%–5.5% outside rates, combining that rate with a $2,500 cash rebate will often beat a dealer's 0% APR offer.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">3. State Sales Tax Rules on Car Rebates</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Most states compute sales tax on the <em>pre-rebate price</em>. A few states (e.g. Texas, Missouri) compute tax <em>after subtracting the rebate</em>, giving cash back an extra tax advantage.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">4. Early Loan Payoff Effects</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              If you plan to pay off the car in 2–3 years or refinance, taking the <strong>Cash Rebate</strong> guarantees 100% of the discount upfront without paying future unaccrued interest.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: BREAKEVEN FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          The Breakeven Interest Rate Formula Explained
        </h2>
        <p className="text-sm leading-relaxed">
          The <strong>Breakeven Interest Rate</strong> is the maximum outside loan APR you can accept before the low-rate dealer financing becomes cheaper. If an outside bank loan offers an APR below the breakeven rate, choose the Cash Back Rebate.
        </p>
      </section>

      {/* SECTION 5: REAL WORLD CASE STUDIES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Real-World Case Studies: Economy Sedan vs. Full-Size Truck Financing
        </h2>

        <div className="space-y-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Scenario 1: $30,000 Purchase, 60-Month Term ($2,000 Rebate @ 6.5% vs 0.9% APR)
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              <strong>Winner: 0.9% APR Low Interest.</strong> Total interest on the $28,000 rebate balance @ 6.5% is $4,912, whereas 0.9% APR on $30,000 incurs only $692 interest. The low rate saves $2,220 net.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Scenario 2: Same Vehicle Paid Off in 24 Months
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              <strong>Winner: Cash Back Rebate.</strong> Early payoff eliminates 36 months of interest charges. Interest paid drops to $1,940, allowing the $2,000 upfront rebate to win by $752.
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
          Choosing between a cash rebate and low-interest APR requires matching your planned holding period, outside loan rates, and state tax rules against total lifetime costs. Using exact amortization math ensures the most profitable automotive financing decision.
        </p>
      </section>
    </div>
  );
}
