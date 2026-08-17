"use client";

import React from "react";

export function HELOCContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* H1 Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          HELOC Calculator — Home Equity Line of Credit Payments & Draw Limits
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Complete Revolving Credit Guide, Two-Phase Payment Amortization, Variable Rate Stress Testing & Tax Rules.
        </p>
      </div>

      {/* SECTION 1: HOW PAYMENTS ARE CALCULATED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          How to Calculate HELOC Payments (Draw Period vs. Repayment Period)
        </h2>
        <p className="text-sm leading-relaxed">
          A Home Equity Line of Credit (HELOC) is a revolving credit facility secured by the equity in your home. Unlike a standard single-phase mortgage, a HELOC operates in two distinct phases—the <strong>Draw Period</strong> and the <strong>Repayment Period</strong>. Monthly payment mechanics differ fundamentally between these two stages.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans text-center">Core HELOC Financial Formulas</div>
          
          <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 space-y-2">
            <div><strong>1. Draw Period Payment (Interest-Only Phase):</strong></div>
            <div className="text-center font-mono">{"M_{draw} = Balance (B) \\times \\frac{r}{12}"}</div>
            
            <div className="pt-2"><strong>2. Repayment Period Payment (Fully Amortizing Phase):</strong></div>
            <div className="text-center font-mono">{"M_{repay} = B \\cdot \\frac{\\frac{r}{12}\\left(1 + \\frac{r}{12}\\right)^{n_{repay}}}{\\left(1 + \\frac{r}{12}\\right)^{n_{repay}} - 1}"}</div>

            <div className="pt-2"><strong>3. Maximum Credit Line Limit (CLTV Method):</strong></div>
            <div className="text-center font-mono">{"Max Line = (Appraised Home Value \\times CLTV \\%) - 1st Mortgage Balance"}</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT IS A HELOC */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          What is a Home Equity Line of Credit (HELOC)? How It Works
        </h2>
        <p className="text-sm leading-relaxed">
          A HELOC functions like a high-limit credit card backed by residential real estate collateral. Borrowers receive an approved maximum credit line (e.g. $100,000) and can draw funds, repay principal, and redraw as needed during the initial draw window.
        </p>
        <p className="text-sm leading-relaxed">
          Because a HELOC is recorded as a second lien subordinate to your primary mortgage, default carries the severe risk of second-lien foreclosure. However, because property acts as collateral, interest rates are substantially lower than unsecured credit cards (8%–10% vs. 20%–28%).
        </p>
      </section>

      {/* SECTION 3: DRAW VS REPAYMENT PERIOD */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Understanding the Draw Period vs. Repayment Period
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">1. The Draw Period (Typically 10 Years)</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Borrowers can withdraw funds up to the credit limit at any time via check or card. Most lenders require interest-only minimum payments on the active balance. Principal repayments are voluntary and replenish available credit.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">2. The Repayment Period (Typically 20 Years)</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              The borrowing window closes permanently; no additional funds can be drawn. The outstanding principal balance amortizes over the remaining term (usually 240 months) with mandatory principal and interest installment payments.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-1 text-xs">
          <h3 className="font-extrabold text-amber-700 dark:text-amber-400">Managing "Payment Shock"</h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            Payment shock refers to the abrupt jump in monthly obligation when transitioning from Month 120 (interest-only draw end) to Month 121 (repayment start). Payments frequently rise by 25% to 50%+ as principal repayment kicks in.
          </p>
        </div>
      </section>

      {/* SECTION 4: 3-WAY COMPARISON MATRIX TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          HELOC vs. Home Equity Loan vs. Cash-Out Refinance: Full Comparison
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Feature</th>
                <th className="p-3">Variable HELOC</th>
                <th className="p-3">Fixed Home Equity Loan</th>
                <th className="p-3 rounded-tr-xl">Cash-Out Refinance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              <tr>
                <td className="p-3 font-bold text-blue-600">Interest Rate Type</td>
                <td className="p-3 text-amber-600">Variable (WSJ Prime + Margin)</td>
                <td className="p-3 font-bold text-emerald-600">Fixed Rate</td>
                <td className="p-3 font-bold text-emerald-600">Fixed Rate</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">Payout Structure</td>
                <td className="p-3 font-bold text-emerald-600">Revolving Line of Credit</td>
                <td className="p-3">Single Lump Sum</td>
                <td className="p-3">Single Lump Sum</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600">Primary Mortgage Effect</td>
                <td className="p-3 font-bold text-emerald-600">Keeps original 1st rate</td>
                <td className="p-3 font-bold text-emerald-600">Keeps original 1st rate</td>
                <td className="p-3 text-red-500">Replaces 1st mortgage</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">Closing Costs</td>
                <td className="p-3 font-bold text-emerald-600">Low ($0 to $500)</td>
                <td className="p-3">Moderate (2%–5%)</td>
                <td className="p-3 text-red-500">High (2%–6% on total debt)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: VARIABLE RATES AND CAPS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          How Variable Interest Rates and Caps Work on HELOCs (Prime + Margin)
        </h2>
        <p className="text-sm leading-relaxed">
          HELOC interest rates are variable and calculated using the benchmark formula:
        </p>
        <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50 font-mono text-center text-xs font-bold text-blue-600 dark:text-blue-400">
          HELOC Interest Rate (APR) = Wall Street Journal Prime Rate + Lender Margin
        </div>
        <p className="text-sm leading-relaxed">
          To protect borrowers from runaway inflation, HELOC agreements contain two rate caps: <strong>Periodic Adjustment Caps</strong> (limiting rate changes per adjustment period) and <strong>Lifetime Rate Ceilings</strong> (the absolute maximum APR allowed over the loan, typically 18.0%).
        </p>
      </section>

      {/* SECTION 6: TAX DEDUCTIBILITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Is HELOC Interest Tax-Deductible? (Current IRS Rules)
        </h2>
        <p className="text-sm leading-relaxed">
          Under the Tax Cuts and Jobs Act (TCJA), interest paid on HELOCs is tax-deductible <strong>ONLY IF</strong> the funds are used to "buy, build, or substantially improve" the home securing the credit line.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-1">
            <h3 className="font-extrabold text-emerald-700 dark:text-emerald-400">Deductible Uses</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Adding a new room addition or bathroom</li>
              <li>Replacing a roof or HVAC system</li>
              <li>Kitchen or master suite remodeling</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-1">
            <h3 className="font-extrabold text-rose-700 dark:text-rose-400">Non-Deductible Uses</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Paying off high-interest credit card debt</li>
              <li>Purchasing a new vehicle or vacation</li>
              <li>Funding college tuition</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 7: WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Worked Step-by-Step Practical Examples
        </h2>

        <div className="space-y-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Example 1: Calculating Maximum Credit Line ($500,000 Home Value)
            </h3>
            <div className="font-mono bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
              <div>Appraised Home Value = $500,000 | 1st Mortgage = $260,000 | Max CLTV Cap = 80%</div>
              <div>Max Allowable Total Debt = $500,000 × 80% = $400,000</div>
              <div><strong>Max HELOC Credit Line = $400,000 - $260,000 = $140,000</strong></div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              Example 2: Two-Phase Payments on a $50,000 Drawn Balance @ 8.0% Rate
            </h3>
            <div className="font-mono bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
              <div>Draw Phase (10 Years, Interest-Only): $50,000 × (8.0% / 12) = <strong>$333.33/mo</strong></div>
              <div>Repayment Phase (20 Years, Amortizing P&I): P = $50,000, r = 8.0%/12, n = 240 = <strong>$418.22/mo</strong></div>
              <div>Payment Shock Jump = +$84.89/mo (+25.5% increase)</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: SUMMARY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <h2 className="font-extrabold text-sm text-blue-700 dark:text-blue-300">
          Educational Summary
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          A HELOC provides unparalleled revolving credit flexibility backed by home equity. By understanding draw vs. repayment phases, preparing for payment shock, and stress-testing variable rates, homeowners can manage home equity credit lines effectively.
        </p>
      </section>
    </div>
  );
}
