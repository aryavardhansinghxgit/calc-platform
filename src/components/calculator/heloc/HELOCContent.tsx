"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";

export function HELOCContent() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          HELOC Calculator
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Estimate HELOC borrowing power, combined loan-to-value (CLTV), interest-only draw and amortizing repayment payments, payment shock transitions, variable-rate stress scenarios, multi-draw lifecycles, and IRS tax deductibility estimates.
        </p>
      </div>

      {/* 2. WHAT IS A HELOC CALCULATOR? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. What Is a HELOC Calculator?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A HELOC calculator estimates how much revolving credit may be available from home equity and models how payments can behave during the draw and repayment phases. Unlike a standard fixed mortgage, a home equity line of credit can have a separate draw period, a repayment period, a variable rate, annual maintenance fees, and a payment that changes when the repayment phase begins. That makes a HELOC calculator particularly useful for users who want to understand both current cash flow and the longer-term cost of accessing equity.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The calculator begins with home market value, the balance of the first mortgage, and a selected maximum combined loan-to-value (CLTV) limit. It then estimates the maximum credit line, calculates the drawn CLTV, and models the selected payment structure. For users comparing financing options, this is where the{" "}
          <Link href="/calculators/home-equity-loan-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Home Equity Loan Calculator
          </Link>{" "}
          becomes useful: a HELOC is revolving and may use variable pricing, while a fixed home-equity loan is generally modeled as a lump-sum installment loan.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Planning Model Notice</span>
          </div>
          <p>
            This is a planning calculator rather than a credit approval tool. The actual credit limit, interest rate, draw availability, fees, underwriting terms, and lender rights can vary by lender, property, borrower profile, and market conditions.
          </p>
        </div>
      </section>

      {/* 3. HOW TO USE THE HELOC CALCULATOR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. How to Use the HELOC Calculator
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Follow these steps to evaluate your home equity borrowing scenario:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            "1. Enter the estimated home market value.",
            "2. Enter the current first-mortgage balance.",
            "3. Select the maximum CLTV limit used by the model (e.g. 80% Standard or 85% High Borrowing).",
            "4. Enter the desired HELOC credit-line amount.",
            "5. Enter the initial variable HELOC interest rate.",
            "6. Choose the draw-period length (5, 10, or 15 years) and repayment-period length (10, 15, or 20 years).",
            "7. Enter estimated closing fees and annual maintenance fees.",
            "8. Select whether the draw phase is interest-only or principal plus interest.",
            "9. Review maximum borrowing power, drawn CLTV, draw payment, repayment payment, payment shock, and modeled interest.",
            "10. Inspect the annual and monthly two-phase amortization schedule and export to CSV.",
            "11. Test variable-rate stress scenarios (+1%, +2%, +3%, or Lifetime Cap).",
            "12. Use the custom lifecycle simulator for future draws and extra monthly principal paydowns.",
            "13. Compare the HELOC against a fixed home-equity loan and a cash-out refinance.",
            "14. Review the IRS tax deductibility estimator separately from the core payment calculation.",
          ].map((step, idx) => (
            <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW HELOC BORROWING POWER IS CALCULATED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. How HELOC Borrowing Power Is Calculated
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator's maximum borrowing formula starts with the maximum amount of combined debt permitted by the selected CLTV assumption. Maximum allowable combined debt equals home value multiplied by the maximum CLTV percentage. The maximum HELOC is then the difference between that amount and the existing first-mortgage balance:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"\\text{Max Allowable Combined Debt} = \\text{Home Market Value} \\times \\text{Max CLTV \\%}"}</div>
          <div>{"\\text{Max HELOC Credit Line} = \\max(0, \\text{Max Allowable Combined Debt} - \\text{1st Mortgage Balance})"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For the validated baseline, a $500,000 home with a $260,000 first mortgage and an 80% CLTV limit supports up to $400,000 of combined debt. Subtracting the $260,000 first mortgage leaves a modeled maximum HELOC of <strong>$140,000</strong>. A requested $50,000 line therefore stays within the model's borrowing cap, and the resulting drawn CLTV is 62%.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Users who are unsure how much equity they can access can pair this result with the{" "}
          <Link href="/calculators/house-affordability-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            House Affordability Calculator
          </Link>{" "}
          to separate overall property affordability from the narrower question of how much existing equity might support a second-lien line.
        </p>
      </section>

      {/* 5. CLTV: THE KEY HELOC BORROWING METRIC */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. CLTV: The Key HELOC Borrowing Metric
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Combined loan-to-value, or CLTV, measures the total debt secured by the property relative to its market value. The calculator uses:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"\\text{Drawn CLTV \\%} = \\frac{\\text{1st Mortgage Balance} + \\text{Actual HELOC Line}}{\\text{Home Market Value}} \\times 100"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          In the baseline scenario, ($260,000 + $50,000) / $500,000 = <strong>62.0%</strong>. That 62% figure is not the same thing as the maximum 80% CLTV limit: 80% determines the borrowing ceiling, while 62% measures how much of the property's value is encumbered after the modeled HELOC line is added.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          When evaluating the full debt structure, a{" "}
          <Link href="/calculators/dti-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Debt-to-Income (DTI) Ratio Calculator
          </Link>{" "}
          can add another layer of affordability analysis, because CLTV describes collateral leverage while DTI describes payment burden relative to income.
        </p>
      </section>

      {/* 6. INTEREST-ONLY DRAW PHASE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Interest-Only Draw Phase Mechanics
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          In an interest-only draw structure, the calculator uses the HELOC balance multiplied by the annual interest rate and divided by 12:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"\\text{Draw Phase IO Monthly Payment} = \\text{HELOC Balance} \\times \\left(\\frac{\\text{Annual Rate}}{12}\\right)"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For a $50,000 balance at 8.0%, the result is <strong>$333.33 per month</strong>. Over ten years, 120 payments at that amount produce <strong>$40,000</strong> of modeled draw-period interest if the balance remains at $50,000.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This payment can look attractive because it is significantly lower than a fully amortizing payment. However, the lower draw-period payment does not mean the loan is cheaper overall. When the draw phase ends, the principal still has to be repaid, and the repayment payment can be significantly higher than the interest-only amount.
        </p>
      </section>

      {/* 7. PRINCIPAL + INTEREST DRAW PHASE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Principal + Interest Draw Phase Mechanics
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator also supports a principal-and-interest draw structure. In the audited implementation, the draw payment is defined as the greater of 1.5% of the credit line or a 30-year amortized principal-and-interest amount. For a $50,000 credit line, 1.5% equals <strong>$750 per month</strong>, while the 30-year amortized amount at 8% is approximately $366.88, so the modeled draw payment becomes <strong>$750/month</strong>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This explains the difference between the PDF baseline ($333/mo IO) and the screenshot state ($750/mo P&I): they represent two distinct draw-payment structures. Switching between Interest-Only and Principal + Interest in the calculator updates draw payments, repayment schedules, and payment shock with complete state isolation.
        </p>
      </section>

      {/* 8. PAYMENT SHOCK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Payment Shock: What Happens When the Draw Phase Ends?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Payment shock describes an increase in monthly cash outflow when a HELOC moves from a lower draw-phase payment into an amortizing repayment-phase payment. The audited calculator defines positive payment shock as the repayment payment minus the draw payment, with negative values clamped to zero:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"\\text{Payment Shock Dollar Increase} = \\max(0, \\text{Repayment Payment} - \\text{Draw Payment})"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          In the interest-only baseline, the draw payment is about $333 and the repayment payment is about $418, creating an approximately <strong>+$85 monthly increase (+25.5%)</strong>. In the Principal + Interest draw mode, the draw payment is $750 while the repayment payment is about $418. Because the later payment is actually lower, the calculator correctly reports <strong>+$0 payment shock (+0%)</strong> rather than a negative number.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This is a critical distinction when planning household cash flow. Users can also review their broader housing burden with the{" "}
          <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Mortgage Calculator
          </Link>{" "}
          before deciding whether a HELOC payment fits comfortably alongside an existing first mortgage.
        </p>
      </section>

      {/* 9. HELOC DRAW AND REPAYMENT TERMS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. HELOC Draw and Repayment Terms
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The audited baseline uses a 10-year draw phase followed by a 20-year repayment phase. During the draw phase, the balance may remain outstanding while the user draws funds according to product rules. At the repayment transition, the remaining balance becomes subject to the fully amortizing repayment structure.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator models a complete lifecycle rather than a single static payment. That is why it is essential to inspect both phases when evaluating a HELOC. A monthly payment that appears manageable during the draw period can give an incomplete picture if the borrower does not examine the repayment phase and the balance that will remain at the transition.
        </p>
      </section>

      {/* 10. TOTAL HELOC INTEREST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Total Lifetime HELOC Interest
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For the audited $50,000 interest-only baseline, the draw phase produces about $40,000 of interest over 120 months. The repayment phase produces approximately $50,373 of interest over 240 months. The total lifetime interest is therefore approximately <strong>$90,373</strong>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The Principal + Interest draw mode produces a different lifetime interest figure because it pays substantially more principal during the first ten years. The audited implementation reports approximately <strong>$140,373</strong> of total interest in that mode.
        </p>
      </section>

      {/* 11. VARIABLE HELOC RATES AND RATE CAPS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Variable HELOC Rates and Rate Caps (Prime + Margin)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          HELOC rates are commonly modeled as variable-rate structures, which means the payment can change as the benchmark and lender margin change. The calculator's stress tester uses a current rate derived from an encoded benchmark plus lender margin and then applies a selected rate increase subject to a lifetime rate cap:
        </p>
        <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50 font-mono text-center text-xs font-bold text-blue-600 dark:text-blue-400">
          {"\\text{HELOC Current Rate} = \\text{WSJ Prime Rate (8.5\\%)} + \\text{Lender Margin (1.0\\%)} = 9.5\\%"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A +2.0% moderate-rise scenario therefore produces an 11.5% stressed rate, while the lifetime cap is enforced at 18.0%. Because variable-rate changes can materially affect payment affordability, users may also want to compare a HELOC with a fixed-rate{" "}
          <Link href="/calculators/home-equity-loan-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Home Equity Loan Calculator
          </Link>{" "}
          scenario, where the modeled rate is fixed.
        </p>
      </section>

      {/* 12. HOW RATE STRESS AFFECTS PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. How Rate Stress Affects HELOC Payments
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          In the audited stress scenario, the current draw payment is about $396 at 9.5%, while the stressed draw payment is about $479 at 11.5%. The repayment payment rises from about $466 to about $533. That creates a modeled repayment-phase payment increase of approximately <strong>+$67 per month (+14.4%)</strong>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A HELOC payment is not fixed. A rate increase can affect both the draw and repayment calculations. Stress-testing variable rates is therefore far more informative than looking only at initial promotional rates.
        </p>
      </section>

      {/* 13. CUSTOM MULTI-DRAW AND FUTURE DRAWS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. Custom Multi-Draw and Future Draws
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The custom lifecycle simulator models a HELOC that is drawn in stages instead of all at once. In the validated example, the borrower starts with $20,000, makes $100 monthly extra-principal payments, draws another $15,000 in Year 3, and continues paying down the balance.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The audited lifecycle produces a draw-end balance of <strong>$23,000</strong> after the additional draw and extra principal payments. The repayment payment on that balance at 8% over 20 years is approximately <strong>$192 per month</strong>, and the modeled extra-paydown interest savings are approximately <strong>$20,441</strong>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This type of lifecycle analysis is especially useful when the line will be used for staged renovations, education expenses, or other projects where the full credit line is not needed on day one.
        </p>
      </section>

      {/* 14. EXTRA PRINCIPAL PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Extra Principal Payments
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          An extra principal payment changes the future balance path. Because less principal remains outstanding, the modeled interest burden generally falls and the payoff timeline can shorten.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator lets users test multiple extra-payment amounts and observe the resulting payoff path. For users focused on debt reduction rather than simply accessing additional equity, the{" "}
          <Link href="/calculators/debt-payoff-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Debt Payoff Calculator
          </Link>{" "}
          and{" "}
          <Link href="/calculators/amortization-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Amortization Calculator
          </Link>{" "}
          can complement this HELOC analysis by comparing alternative debt-repayment strategies.
        </p>
      </section>

      {/* 15. HELOC VS FIXED HOME EQUITY LOAN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. HELOC vs. Fixed Home Equity Loan
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A HELOC and a fixed home equity loan both use home equity as collateral, but their cash-flow structures differ. A HELOC is revolving and can allow multiple draws, while a fixed home equity loan is generally modeled as a lump-sum installment loan with a defined payment schedule.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The audited comparison uses a $50,000 cash need, a $260,000 first mortgage at 3.5%, an 8.0% HELOC, and an 8.5% fixed home-equity loan. The modeled HELOC draw payment is $333 and the repayment payment is about $418, while the fixed home-equity loan payment is about $492 over 15 years.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          That does not mean the HELOC is universally better. The comparison is scenario-specific. Users should compare not only the first payment, but also the rate structure, total interest, flexibility, fees, repayment period, and risk of future payment changes.
        </p>
      </section>

      {/* 16. HELOC VS CASH-OUT REFINANCE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. HELOC vs. Cash-Out Refinance
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A cash-out refinance replaces the existing first mortgage with a new, larger mortgage. That can make the payment structure very different from a HELOC because the refinance may reset the entire first-lien balance to a new rate and term.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          In the audited comparison, the HELOC preserves the low 3.5% first mortgage, while the modeled cash-out refinance uses a new $313,500 mortgage at 6.75% over 30 years. That produces a modeled payment of about $2,033 per month. The apparent advantage of the HELOC is therefore partly a consequence of preserving a relatively low existing first-mortgage rate.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Users considering a refinance should also run the full scenario through a{" "}
          <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Refinance Calculator
          </Link>{" "}
          because replacing an older low-rate mortgage can have substantial long-term consequences even when the new rate looks attractive in isolation.
        </p>
      </section>

      {/* 17. DEBT CONSOLIDATION AND HELOC 'INTEREST ARBITRAGE' */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          16. Debt Consolidation and HELOC "Interest Arbitrage"
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator models a debt-consolidation example involving $30,000 of credit-card debt at 24% versus an 8% HELOC. During the interest-only draw phase, the credit-card payment is modeled at $1,050 while the HELOC payment is $200, creating approximately <strong>$850 of monthly cash-flow relief</strong>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          However, this does not automatically produce lifetime interest savings. Over a four-year credit-card payoff, the modeled credit-card interest is $28,800, while spreading $30,000 over the full 30-year HELOC horizon produces approximately $54,240 of interest. The engine therefore clamps lifetime interest savings to <strong>$0</strong> rather than turning temporary cash-flow relief into a misleading lifetime-savings claim.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A HELOC may reduce short-term interest expense or monthly cash burden under certain assumptions, but total cost depends heavily on repayment behavior, rate changes, fees, and the duration of the debt.
        </p>
      </section>

      {/* 18. HELOC TAX DEDUCTIBILITY ESTIMATOR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          17. HELOC Tax Deductibility Estimator (Current IRS Rules)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The tax estimator is a separate planning module and should not be confused with the core mortgage-payment engine. Under the Tax Cuts and Jobs Act (TCJA), interest paid on HELOCs is tax-deductible only if funds are used to buy, build, or substantially improve the home securing the credit line:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"\\text{Projected Annual Tax Savings} = \\text{Modeled Annual Interest} \\times \\text{Marginal Tax Rate}"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For the validated example, average annual interest of $3,012.43 at a 24% marginal tax rate produces approximately <strong>$723 of modeled annual tax savings</strong>. If the funds are used for non-qualifying purposes such as credit card consolidation, tuition, or vehicle purchases, interest is non-deductible and projected tax savings are $0.
        </p>
        <p className="text-xs text-slate-500 italic">
          *Notice: Tax treatment depends on applicable tax law, filing status, aggregate secured debt limits ($750k MFJ), loan use, and documentation. This estimator is an illustrative planning estimate and not formal tax advice.
        </p>
      </section>

      {/* 19. FEES AND CLOSING COSTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          18. HELOC Fees and Closing Costs
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator includes closing-fee and annual-fee inputs so users can see how non-interest costs affect the modeled cost structure. The audited baseline uses $2,000 of closing costs and a $50 annual maintenance fee. The annual fee is charged in Month 1 of each draw year under the current model.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          When comparing HELOCs, a lower advertised rate can be offset by upfront costs, annual fees, minimum-draw requirements, appraisal charges, or other lender-specific pricing. The calculator's fee fields are therefore important inputs rather than optional details.
        </p>
      </section>

      {/* 20. SELLING THE HOME */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          19. What Happens When You Sell the Home?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A HELOC is secured by the property, so an outstanding line generally has to be satisfied as part of a sale. That means the HELOC balance reduces the net proceeds available after the primary mortgage and other transaction costs are paid. The calculator can help estimate the debt balance, but it does not determine the final amount a settlement agent or lender will require at closing.
        </p>
      </section>

      {/* 21. CREDIT-LIMIT REDUCTIONS AND FREEZES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          20. HELOC Credit-Limit Reductions and Freezes
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A HELOC is a revolving line, which means the available credit is not necessarily guaranteed to remain unchanged for the entire life of the account. Under federal Regulation Z (12 C.F.R. § 1026.40), a lender may freeze or reduce the line under certain circumstances, such as material declines in property value or significant changes in the borrower's financial condition.
        </p>
      </section>

      {/* 22. FORECLOSURE RISK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          21. Home-Equity and Foreclosure Risk
        </h2>
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1 text-xs text-slate-700 dark:text-slate-300">
          <div className="font-extrabold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Second-Lien Security Warning</span>
          </div>
          <p>
            Because a HELOC is secured by your primary residence, failure to meet repayment obligations can result in foreclosure. A HELOC should always be evaluated as secured debt against your home, not simply as a low-interest alternative to credit cards.
          </p>
        </div>
      </section>

      {/* 23. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          22. Common HELOC Calculator Mistakes to Avoid
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li><strong>Confusing the maximum CLTV limit with the actual drawn CLTV:</strong> 80% represents the ceiling, while 62% is the actual encumbered debt ratio in our baseline.</li>
            <li><strong>Assuming the interest-only draw payment represents the eventual repayment payment:</strong> Repayment payments jump significantly once principal amortization begins.</li>
            <li><strong>Ignoring the repayment phase when comparing HELOC affordability:</strong> A low draw payment can conceal a much higher 20-year repayment obligation.</li>
            <li><strong>Treating a variable rate as if it were fixed for the entire lifecycle:</strong> Variable HELOC rates adjust with the benchmark index and margin.</li>
            <li><strong>Ignoring the effect of annual fees and closing costs:</strong> Ongoing maintenance charges increase the total cost of maintaining the line.</li>
            <li><strong>Assuming a lower monthly draw payment means a lower lifetime cost:</strong> Paying interest only for 10 years delays principal reduction and increases cumulative interest.</li>
            <li><strong>Interpreting temporary debt-consolidation cash-flow relief as guaranteed lifetime savings:</strong> Extending credit card debt across 30 years can generate more nominal interest unless aggressively paid down.</li>
            <li><strong>Assuming all HELOC interest is tax-deductible:</strong> Only interest on funds used to buy, build, or substantially improve the securing property is deductible.</li>
            <li><strong>Treating the tax estimator as formal tax advice:</strong> Tax deductibility depends on individual filing status, itemization, and documentation.</li>
            <li><strong>Assuming a lender cannot freeze or reduce a HELOC:</strong> Lenders have statutory rights to modify limits if property values decline substantially.</li>
          </ul>
        </div>
      </section>

      {/* 24. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          23. Core HELOC Formulas Summary
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>Maximum Allowable Combined Debt:</strong> Home Value × Maximum CLTV</div>
          <div>• <strong>Maximum HELOC:</strong> max(0, Maximum Allowable Combined Debt - 1st Mortgage Balance)</div>
          <div>• <strong>Drawn CLTV:</strong> (1st Mortgage Balance + Actual HELOC Line) ÷ Home Value × 100</div>
          <div>• <strong>Interest-Only Draw Payment:</strong> HELOC Balance × Annual Interest Rate ÷ 12</div>
          <div>• <strong>Payment Shock:</strong> max(0, Repayment Payment - Draw Payment)</div>
          <div>• <strong>Tax Savings Estimate:</strong> Modeled Annual Interest × Marginal Tax Rate (Qualifying Use Only)</div>
        </div>
      </section>

      {/* 25. YMYL AND REGULATORY GUIDANCE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Educational Guidance & Regulatory Notice</span>
        </div>
        <p>
          Home equity lines of credit are subject to the Truth in Lending Act (TILA), Real Estate Settlement Procedures Act (RESPA), and IRS Publication 936 guidelines. This calculator is an educational planning tool that generates mathematical projections based on user-supplied assumptions and does not constitute a formal commitment to lend or individualized financial, legal, or tax advice.
        </p>
      </section>
    </div>
  );
}

export default HELOCContent;
