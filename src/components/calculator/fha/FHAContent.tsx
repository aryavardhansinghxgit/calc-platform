"use client";

import React from "react";
import Link from "next/link";

export function FHAContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto font-sans">
      {/* SECTION 2: WHAT IT DOES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. FHA Loan Calculator: What It Does
        </h2>
        <p className="text-sm leading-relaxed">
          An FHA loan calculator estimates the monthly and long-term costs of an FHA-insured mortgage using the assumptions you enter. Instead of showing only principal and interest, the calculator can combine the mortgage payment with property taxes, homeowners insurance, monthly mortgage insurance premium (MIP), and HOA dues to produce a modeled total monthly PITI payment. It also separates base loan amount, upfront mortgage insurance premium (UFMIP), financed loan amount, and upfront cash so you can understand how the financing structure affects the payment.
        </p>
        <p className="text-sm leading-relaxed">
          The calculator is designed as a planning and education tool. It does not issue a mortgage, make a binding underwriting decision, or guarantee that a borrower will qualify for an FHA loan. Actual approval can depend on the complete application, lender overlays, credit history, debt obligations, documentation, property eligibility, loan limits, automated underwriting, and current FHA/HUD requirements.
        </p>
      </section>

      {/* SECTION 3: HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. How to Use the FHA Loan Calculator
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">1. Home Purchase Price</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Enter the target home purchase price.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">2. Down Payment %</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Enter the planned down-payment percentage (e.g. 3.5%, 5%, 10%).</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">3. Credit Score Band</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Select the credit-score band used by the calculator (580+ or 500-579).</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">4. Interest Rate &amp; Term</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Enter the mortgage interest rate and loan term in years.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">5. Finance UFMIP Toggle</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Choose whether UFMIP is paid in cash at closing or financed into the mortgage.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">6. Taxes &amp; Insurance</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Enter annual property taxes and annual homeowners hazard insurance.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">7. Monthly HOA Dues</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Enter monthly HOA or condo association dues if applicable.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">8. Review Results</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Review base loan amount, financed loan amount, P&amp;I, monthly MIP, upfront cash and total PITI.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">9. Amortization Schedule</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Inspect the annual or monthly amortization breakdown and export to CSV.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">10. Conventional 97 Comparison</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Compare FHA with the calculator's modeled Conventional 97 cost crossover.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">11. County Limit Tool</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Use the county-limit tool as a time-sensitive reference rather than an evergreen database.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">12. Advanced Modules</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Use the DTI checker, 203(k) renovation tool and extra-payment simulator for scenario analysis.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: UNDERSTANDING CORE INPUTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Understanding the Core FHA Inputs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Home Purchase Price</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The home price is the starting point for almost every other calculation. Down payment is derived from the selected percentage, the base loan is the purchase price minus that down payment, and UFMIP and mortgage payments are then calculated from the loan structure.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Down Payment</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The calculator models down payment as a percentage of the purchase price. Under the supplied reference scenario, 3.5% on a $350,000 purchase produces a $12,250 down payment and a $337,750 base loan.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Credit Score Band</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The credit-score selector is used by the calculator's FHA logic to distinguish scenarios such as the 580+ band and the 500-579 band. The score band should be interpreted as a modeled eligibility context rather than a universal lender approval rule.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Interest Rate and Term</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The interest rate and loan term determine the fixed-rate principal-and-interest payment. A lower interest rate generally lowers the modeled payment, while a longer term generally lowers the required periodic payment but extends the period over which interest accrues.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: DOWN PAYMENT AND BASE LOAN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. FHA Down Payment and Base Loan
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <p className="text-slate-700 dark:text-slate-300">
            The base loan is calculated as the purchase price minus the down payment. For a $350,000 home with 3.5% down: $350,000 × 0.035 = $12,250 down payment; $350,000 - $12,250 = $337,750 base loan.
          </p>
          <p className="text-slate-600 dark:text-slate-400 font-normal">
            That base loan is the foundation for the calculator's UFMIP and annual-MIP calculations. It is important to distinguish the base loan from the total financed loan when UFMIP is rolled into the mortgage.
          </p>
        </div>
      </section>

      {/* SECTION 6: UFMIP CASH VS FINANCED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. UFMIP: Cash vs. Financed
        </h2>
        <p className="text-sm leading-relaxed">
          FHA UFMIP is modeled in the calculator at 1.75% of the base loan. The important practical choice is whether that UFMIP is paid at closing or financed into the mortgage. The reference material contains two different screenshots because those two states produce different principal balances and therefore different monthly P&amp;I payments.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-400">Cash UFMIP Example ($2,707 / mo)</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal">
              With a $337,750 base loan, 1.75% UFMIP is $5,910.63. If paid in cash, the financed loan remains $337,750. The validated example produces approximately $2,134.80 P&amp;I and total monthly PITI of about $2,706.27, displayed around $2,707 after rounding. Upfront cash required is approximately $28,661.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-400">Financed UFMIP Example ($2,744 / mo)</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal">
              If the $5,910.63 UFMIP is financed, the modeled loan becomes approximately $343,660.63. The validated example produces approximately $2,172.17 P&amp;I and total PITI of about $2,743.64, displayed around $2,744. Upfront cash required drops to $22,750.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic">
          This is why the reference's $2,707 and $2,744 values are not a defect. They represent different UFMIP financing states. The production QA specifically reconciled the two modes.
        </p>
      </section>

      {/* SECTION 7: MONTHLY FHA PITI PAYMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Monthly FHA PITI Payment
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
            Total PITI = Principal &amp; Interest + Property Taxes / 12 + Insurance / 12 + Monthly MIP + HOA
          </div>
          <p className="text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
            Using the financed-UFMIP baseline, the components are approximately $2,172.17 P&amp;I, $300 monthly property taxes, $116.67 monthly insurance, $154.80 monthly MIP, and $0 HOA. Together they produce approximately $2,743.64 per month.
          </p>
          <p className="text-slate-600 dark:text-slate-400 font-normal">
            This distinction matters because a mortgage payment is not necessarily the same as total housing cash outflow. Comparing only principal and interest can materially understate the monthly payment when taxes, insurance, MIP and HOA are part of the modeled obligation.
          </p>
        </div>
      </section>

      {/* SECTION 8, 9, 10: MIP STRUCTURE, RATES & 10% TRANSITION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. FHA Mortgage Insurance Premium (MIP) &amp; 9. Rates and Duration
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">8. Monthly MIP Formula</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The calculator separates FHA mortgage insurance into UFMIP and the ongoing annual MIP. The reference formula calculates monthly MIP as the base loan multiplied by the selected annual MIP rate, divided by 12.
            </p>
            <div className="p-2 bg-white dark:bg-slate-950 rounded-lg font-mono text-[11px]">
              Monthly MIP = Base Loan × Annual MIP Rate / 12
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              For the $337,750 base loan and a 0.55% annual MIP rate, the monthly result is approximately $154.80. The QA audit confirms that the production model uses the base loan for this calculation rather than accidentally applying the annual rate to the UFMIP-financed balance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">9. FHA MIP Rates &amp; Policy Duration</h3>
              <p className="text-slate-600 dark:text-slate-400 font-normal">
                The supplied reference encodes different annual MIP rates and durations depending on loan term and down payment:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 font-normal">
                <li><strong>30-year (&lt;10% down):</strong> 0.55% annual MIP, Life of Loan.</li>
                <li><strong>30-year (≥10% down):</strong> 0.50% annual MIP, 11-year duration.</li>
                <li><strong>15-year (&lt;10% down):</strong> 0.40% annual MIP, Life of Loan.</li>
                <li><strong>15-year (≥10% down):</strong> 0.15% annual MIP, 11-year duration.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">10. The 10% Down Payment MIP Transition</h3>
              <p className="text-slate-600 dark:text-slate-400 font-normal">
                A major behavior to test is the 10% down-payment boundary. The calculator switches to the appropriate MIP rate and duration when the input crosses from below 10% down to 10% or more.
              </p>
              <p className="text-slate-600 dark:text-slate-400 font-normal">
                For example, the reference shows that a 30-year modeled FHA loan at 10% down uses a 0.50% annual MIP rate and an 11-year MIP duration, whereas a comparable loan below 10% down uses a 0.55% rate and a life-of-loan duration under the encoded assumptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11 & 12: AMORTIZATION & DTI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. Amortization Schedule &amp; 12. DTI Qualification Checker
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">11. FHA Amortization Schedule</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The amortization schedule breaks the loan into beginning balance, payment, principal, interest, annual MIP and ending balance. The production regression gate verified the schedule against independent mathematical calculations and confirmed that the terminal balance reaches exactly $0.00 without overpayment.
            </p>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The schedule is useful because it shows why mortgage payments do not remain economically identical over time. Interest is calculated from the outstanding balance, so the principal share generally changes as the balance falls. MIP duration is tracked separately according to the selected FHA assumptions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">12. DTI Qualification Checker</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The FHA DTI module in the validated implementation uses total modeled PITI rather than principal and interest alone for its front-end housing ratio. This explains a key reference anomaly: the example displays 36.6% Front / 44.6% Back with $7,500 gross monthly income and $600 of other monthly debt.
            </p>
            <div className="p-2 bg-white dark:bg-slate-950 rounded-lg font-mono text-[11px] space-y-1">
              <div>Front-End DTI = $2,743.64 / $7,500 × 100 = 36.6%</div>
              <div>Back-End DTI = ($2,743.64 + $600) / $7,500 × 100 = 44.6%</div>
            </div>
            <p className="text-slate-500 font-normal text-[11px] italic">
              This is a mathematical model output, not an approval determination. The actual underwriting decision may depend on the full loan file and the applicable underwriting path.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 13, 14, 15, 16: CONV COMPARISON, COUNTY LIMITS, 203K, EXTRA PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. FHA vs Conventional, 14. County Limits, 15. 203(k) &amp; 16. Extra Payments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">13. FHA vs Conventional Comparison</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The calculator includes a side-by-side FHA versus Conventional 97 comparison. The supplied example uses a borrower credit score of 700 and a conventional rate of 6.75%, then displays modeled FHA ($2,777) and conventional ($2,852) PITI values and a crossover month (Month 79).
            </p>
            <p className="text-slate-500 font-normal text-[11px] italic">
              The important SEO explanation is that this is a scenario comparison. FHA may have different mortgage-insurance and upfront-cost behavior, while a conventional loan can have different private-mortgage-insurance treatment, pricing and cancellation rules.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">14. FHA County Loan Limits (Time-Sensitive)</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The reference includes an FHA county-limit verification tool and displays a 2024 single-family low-cost floor of $498,257 and high-cost ceiling of $1,149,825. The calculator then checks whether the proposed loan falls within the selected limit.
            </p>
            <p className="text-slate-500 font-normal text-[11px] italic">
              These values are explicitly year-specific in the supplied reference and should not be presented as evergreen current FHA limits. The production content labels this section as time-sensitive.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">15. FHA 203(k) Rehabilitation Calculator</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The 203(k) section models a renovation project by adding a contingency reserve to the repair budget and incorporating the resulting renovation escrow into the loan structure. For the validated reference example, the repair budget is $35,000 and the contingency is 15%, producing a $5,250 reserve and a $40,250 total renovation budget.
            </p>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The validated scenario produces a total financed 203(k) loan of approximately $383,181.60 and a monthly payment of approximately $2,594.55, displayed around $2,595.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">16. Extra Payments &amp; Early Payoff</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The extra-payment simulator shows what can happen when you pay more than the scheduled mortgage amount. In the reference scenario, an extra $150 per month produces a modeled $86,639 of interest and MIP savings, shortens the payoff time by 60 months, and reduces modeled MIP by $9,451.
            </p>
            <p className="text-slate-500 font-normal text-[11px] italic">
              The exact savings depend on the outstanding balance, rate, MIP duration and timing of the extra payments.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 17, 18, 19, 20, 21, 22: CASH TO CLOSE, ELIGIBILITY, SELLER, MULTI-UNIT, COMPARISONS, MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          17. Upfront Cash, 18. Eligibility, 19. Seller Contributions &amp; 22. Common Mistakes
        </h2>
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">17. Upfront Cash to Close</h3>
              <p className="text-slate-600 dark:text-slate-400 font-normal">
                Upfront cash is different from the financed loan amount. In the validated 3.5% down example, cash UFMIP creates a substantially larger upfront requirement ($28,661) than financed UFMIP ($22,750), while financed UFMIP increases the mortgage balance instead.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">18. Eligibility &amp; Credit</h3>
              <p className="text-slate-600 dark:text-slate-400 font-normal">
                The reference explains the calculator's credit-score bands: 580+ is associated with a 3.5% minimum down, while 500-579 is associated with a 10% minimum down. These are program-reference assumptions, not guaranteed approval outcomes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">19. Seller Contributions &amp; 20. Multi-Unit</h3>
              <p className="text-slate-600 dark:text-slate-400 font-normal">
                The reference states a 6% seller-contribution ceiling and notes financing for up to 4 units under primary residency rules. These remain policy-sensitive educational context.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">22. Common FHA Calculator Mistakes</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300 list-disc list-inside font-normal">
              <li>Treating P&amp;I as the complete monthly FHA payment.</li>
              <li>Forgetting that UFMIP can change the financed loan amount when financed.</li>
              <li>Assuming monthly MIP is based on the UFMIP-financed balance.</li>
              <li>Assuming MIP always cancels at 20% equity.</li>
              <li>Using outdated FHA county limits as though they are current.</li>
              <li>Treating a calculator DTI result as a guaranteed approval.</li>
              <li>Assuming the credit-score selector changes the interest rate when it does not.</li>
              <li>Ignoring the difference between upfront cash and financed costs.</li>
              <li>Assuming the FHA-vs-Conventional crossover is universal.</li>
              <li>Treating a 203(k) renovation estimate as a guaranteed loan amount.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 23: CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          23. Core Formulas
        </h2>
        <div className="space-y-3 text-xs font-mono">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400 font-sans">Base Loan Formula</div>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg text-center font-bold">
              Base Loan = Home Purchase Price - Down Payment
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400 font-sans">UFMIP Formula</div>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg text-center font-bold">
              UFMIP = Base Loan × 1.75%
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400 font-sans">Financed Loan Formula</div>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg text-center font-bold">
              Financed Loan = Base Loan + UFMIP (when financed)
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400 font-sans">Monthly MIP Formula</div>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg text-center font-bold">
              Monthly MIP = Base Loan × Annual MIP Rate / 12
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400 font-sans">Total Monthly PITI Formula</div>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg text-center font-bold">
              Total PITI = P&amp;I + Property Taxes / 12 + Insurance / 12 + Monthly MIP + HOA
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 25 & 26: APPROVED RELATED CALCULATORS & BASELINE FACTS */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-4 text-xs">
        <div>
          <h3 className="font-extrabold text-sm text-blue-700 dark:text-blue-300 mb-1">
            25. Related Mortgage &amp; Loan Calculators
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300 font-medium">
            <li>• <Link href="/calculators/mortgage-calculator" className="text-blue-600 hover:underline font-bold">Mortgage Calculator</Link>: general amortization and payment modeling.</li>
            <li>• <Link href="/calculators/dti-calculator" className="text-blue-600 hover:underline font-bold">DTI Calculator</Link>: broader debt-to-income scenario analysis.</li>
            <li>• <Link href="/calculators/house-affordability-calculator" className="text-blue-600 hover:underline font-bold">House Affordability</Link>: purchase-price planning and budget ceilings.</li>
            <li>• <Link href="/calculators/rent-calculator" className="text-blue-600 hover:underline font-bold">Rent Calculator</Link>: rental-payment context versus home buying.</li>
            <li>• <Link href="/calculators/down-payment-calculator" className="text-blue-600 hover:underline font-bold">Down Payment</Link>: cash contribution and savings planning.</li>
            <li>• <Link href="/calculators/amortization-calculator" className="text-blue-600 hover:underline font-bold">Amortization Calculator</Link>: detailed principal and interest schedules.</li>
            <li>• <Link href="/calculators/loan-calculator" className="text-blue-600 hover:underline font-bold">Loan Calculator</Link>: general debt-service comparisons.</li>
          </ul>
        </div>
        <div className="pt-2 border-t border-blue-200 dark:border-blue-900/60 text-slate-600 dark:text-slate-400 font-normal">
          <p>
            <strong>Approved Baseline Facts:</strong> $350,000 home, 3.5% down, 6.5% rate, 30 years, $3,600 taxes, $1,400 insurance. Base loan is $337,750. In cash-UFMIP mode, UFMIP is $5,910.63, P&amp;I is $2,134.80, and total PITI is $2,706.27 (~$2,707). In financed-UFMIP mode, financed loan is $343,660.63, P&amp;I is $2,172.17, and total PITI is $2,743.64 (~$2,744). The validated DTI example uses $7,500 income and $600 debt, yielding 36.6% front-end and 44.6% back-end DTI. The 203(k) example uses $35,000 repairs and 15% contingency, yielding $40,250 renovation budget and $383,181.60 total financed loan. These are scenario outputs, not universal FHA quotes or loan approvals.
          </p>
        </div>
      </section>
    </div>
  );
}
