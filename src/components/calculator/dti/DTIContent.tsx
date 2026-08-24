"use client";

import React from "react";
import Link from "next/link";

export function DTIContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* SECTION 2: WHAT IT MEASURES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. DTI Calculator: What It Measures
        </h2>
        <p className="text-sm leading-relaxed">
          A debt-to-income ratio, commonly abbreviated DTI, compares monthly debt obligations with gross monthly income. It is one of the most common ratios used when evaluating household debt relative to income, and mortgage underwriting often considers DTI alongside credit history, assets, loan-to-value, reserves, property details, loan program rules and automated-underwriting results. A DTI calculator helps you organize the inputs and see how the ratio changes before you approach a lender.
        </p>
        <p className="text-sm leading-relaxed">
          This calculator separates housing-related obligations from other recurring debts. That distinction allows it to calculate both a front-end DTI and a back-end DTI. It also includes reverse-planning tools: you can solve for the income needed to reach a target DTI, estimate a maximum housing budget from an assumed DTI, simulate how paying off a debt changes the ratio, and explore a two-year self-employed income calculation.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <p>
            <strong>Planning Notice:</strong> The result is a planning estimate, not a loan approval. A lender can calculate a different qualifying ratio because lender guidelines, loan programs, documentation, debt treatment, income treatment, automated underwriting, and borrower circumstances can differ. Use the calculator to understand the arithmetic and test scenarios, not to assume that a particular DTI guarantees approval.
          </p>
        </div>
      </section>

      {/* SECTION 3: HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. How to Use the DTI Calculator
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">1. Income Frequency</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Choose whether your income inputs are being entered as annual or monthly figures.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">2. Gross Income Streams</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Enter your primary income and any supported co-borrower, bonus/commission, or dividend/alimony income.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">3. Monthly Housing Costs</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Enter monthly housing costs, such as mortgage or rent, property taxes, and hazard insurance.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">4. Recurring Monthly Debts</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Enter recurring monthly debt obligations, including supported auto loans, student loans and credit-card minimums.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">5. Review Ratios</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Review the front-end DTI and back-end DTI shown in the results area.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">6. Underwriting Matrix</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Open the underwriting or program-comparison section to review the calculator's modeled benchmarks.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">7. Reverse Income Solver</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Use the reverse income solver when you know your target DTI and want to estimate the gross income required.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">8. Maximum Housing Budget</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Use the maximum housing-budget solver when you know your income, existing debt and target DTI and want to estimate a housing-payment ceiling.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">9. Debt Payoff Simulator</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Use the debt-payoff simulator to see how removing one or more monthly debt obligations changes your back-end DTI.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">10. Self-Employed Averaging</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Use the self-employed income tool when you need the calculator's two-year averaging model.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">11. Save Scenario</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Save the scenario when you want to compare it with another income, housing, or debt configuration.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400">12. Re-run Sensitivity</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Re-run the scenario after changing one assumption at a time so you can see which variable has the largest effect.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: ANNUAL VS MONTHLY TOGGLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Annual vs Monthly Income: Use the Toggle Correctly
        </h2>
        <p className="text-sm leading-relaxed">
          Income frequency matters because DTI is calculated using gross monthly income. The calculator includes an annual/monthly toggle so the same income can be entered in either form without changing its underlying economic meaning. When annual income is selected, the engine converts the amount to a monthly equivalent by dividing by 12. When monthly income is selected, it converts the amount to an annual equivalent by multiplying by 12.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <p className="font-mono text-blue-600 dark:text-blue-400">
            For example, $75,000 per year corresponds to $6,250 per month. Conversely, $6,250 per month corresponds to $75,000 per year.
          </p>
          <p className="text-slate-600 dark:text-slate-400 font-normal">
            The calculator was specifically tested for bidirectional, lossless conversion so switching the toggle does not leave stale values or create a hidden twelve-times error.
          </p>
          <p className="text-slate-600 dark:text-slate-400 font-normal">
            This distinction is particularly important because a value of $75,000 entered as monthly income would represent $900,000 of annual income. That is a completely different DTI scenario from $75,000 annual income. Always confirm the input label before interpreting the result.
          </p>
        </div>
      </section>

      {/* SECTION 5: FRONT-END VS BACK-END */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Front-End DTI vs Back-End DTI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-sm">5.1 Front-End DTI</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
              Front-end DTI focuses on housing-related monthly costs. In the calculator's model, the ratio is calculated as total monthly housing costs divided by gross monthly income, multiplied by 100. It answers a simple question: what share of gross monthly income is being allocated to housing under the selected inputs?
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
              Front-End DTI = (Total Monthly Housing Costs / Gross Monthly Income) × 100
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-sm">5.2 Back-End DTI</h3>
            <p className="text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
              Back-end DTI adds recurring non-housing debt obligations to the housing costs. It therefore captures a broader measure of the household's monthly debt burden. In the calculator's model, this includes the supported debt inputs entered in the debt section.
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
              Back-End DTI = ((Total Monthly Housing Costs + Total Recurring Debt) / Gross Monthly Income) × 100
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">5.3 Why Both Ratios Matter</h3>
          <p className="text-slate-600 dark:text-slate-400 font-normal">
            Two households can have the same housing payment and very different back-end DTI ratios if one household has substantially more car loans, student loans or credit-card minimum payments. Looking at only housing can therefore miss an important part of the overall monthly debt burden.
          </p>
        </div>
      </section>

      {/* SECTION 6: WORKED EXAMPLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Worked Example: $75,000 Annual Income
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
          <p className="text-slate-700 dark:text-slate-300">
            Consider the validated baseline with $75,000 of annual gross income. Converting the income to monthly terms gives $6,250 per month.
          </p>
          <div className="font-mono bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 text-[11px]">
            <div>Gross Monthly Income = $75,000 / 12 = $6,250.00/mo</div>
            <div>Monthly Housing Costs: Mortgage/Rent P&amp;I ($1,800) + Property Taxes ($200) + Hazard Insurance ($100) = $2,100.00/mo</div>
            <div>Recurring Monthly Debt: Auto Loan ($350) + Student Loans ($250) + Credit Card Minimums ($150) = $750.00/mo</div>
            <div className="pt-1 text-blue-600 dark:text-blue-400 font-bold">Front-End DTI = ($2,100 / $6,250) × 100 = 33.60%</div>
            <div className="text-blue-600 dark:text-blue-400 font-bold">Back-End DTI = (($2,100 + $750) / $6,250) × 100 = 45.60%</div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-normal">
            These values illustrate why the front-end and back-end ratios should be read together. Housing consumes 33.6% of gross monthly income in the modeled scenario, while housing plus recurring debt consumes 45.6%.
          </p>
        </div>
      </section>

      {/* SECTION 7 & 8: HOUSING COSTS & RECURRING DEBT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. What Counts as Housing Cost? &amp; 8. What Counts as Recurring Debt?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">7. What Counts as Housing Cost?</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The calculator aggregates the housing inputs available in the interface. These may include the mortgage or rent payment, property taxes, hazard insurance, and other supported housing obligations such as HOA costs or mortgage insurance when the implementation exposes them. Always use the calculator's current input fields as the authoritative definition of what is included in its modeled housing total.
            </p>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              This matters because mortgage principal and interest alone are not the same thing as the complete housing obligation. A DTI calculation that intentionally includes taxes and insurance can produce a meaningfully different result from a calculation based only on principal and interest.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">8. What Counts as Recurring Debt?</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The debt side of the calculator is designed for recurring monthly obligations that contribute to the modeled back-end DTI. The standard inputs include auto loans, student loans and credit-card minimum payments, with additional supported debt fields depending on the current interface.
            </p>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Do not add ordinary living expenses simply because they leave your bank account every month. DTI is a debt-to-income measure, not a complete household-budget ratio. Expenses such as groceries, utilities, subscriptions or everyday insurance may be important to affordability, but they are not automatically interchangeable with recurring debt obligations in a DTI calculation.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: HOW TO CALCULATE DTI MANUALLY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. How to Calculate DTI Manually
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <p className="text-slate-700 dark:text-slate-300">
            The calculation is straightforward once the inputs are normalized to monthly amounts. First, convert annual income to monthly gross income if necessary. Next, add the monthly housing obligations. Then add the recurring debt obligations. Finally, divide the appropriate total by gross monthly income and multiply by 100.
          </p>
          <p className="text-slate-600 dark:text-slate-400 font-normal">
            For example, if gross monthly income is $6,250 and housing is $2,100, the front-end ratio is 33.6%. If recurring debt adds another $750, the back-end ratio becomes 45.6%. The calculator automates those steps, but understanding the formula helps you audit the result and identify input errors.
          </p>
        </div>
      </section>

      {/* SECTION 10 & 11: REVERSE SOLVERS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Reverse Income Solver &amp; 11. Maximum Housing Budget Solver
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">10. Reverse Income Solver</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The reverse income solver works backward from a desired DTI. If your monthly housing cost and recurring debt are known, the required gross monthly income can be estimated by dividing the total modeled debt burden by the target DTI expressed as a decimal.
            </p>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg font-mono text-[11px]">
              <div>Housing: $1,800 | Debt: $600 | Target DTI: 36%</div>
              <div className="font-bold text-blue-600 dark:text-blue-400 mt-1">Required Income = ($1,800 + $600) / 0.36 = $6,666.67/mo ($80,000/yr)</div>
            </div>
            <p className="text-slate-500 font-normal text-[11px] italic">
              This is a mathematical target under the selected ratio. It does not mean a lender will approve a borrower solely because income reaches this figure. Actual underwriting can involve additional requirements.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">11. Maximum Housing Budget Solver</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The maximum housing-budget solver reverses the DTI equation in another direction. Given gross monthly income, existing recurring debt and a target DTI, it estimates how much monthly housing cost remains available within that target.
            </p>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg font-mono text-[11px]">
              <div>Gross Income: $6,500 | Debt: $500 | Target DTI: 43%</div>
              <div className="font-bold text-blue-600 dark:text-blue-400 mt-1">Max Housing = ($6,500 × 0.43) - $500 = $2,795 - $500 = $2,295/mo</div>
            </div>
            <p className="text-slate-500 font-normal text-[11px] italic">
              This is a planning ceiling based on the chosen ratio. It is not a lender approval limit.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 12, 13, 14: PRICE CEILING, DEBT PAYOFF, SELF-EMPLOYED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. Price Ceiling, 13. Debt Payoff Simulator, &amp; 14. Self-Employed Averaging
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">12. Estimated Purchase Price Ceiling</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The calculator also uses a purchase-price factor to translate a modeled housing-payment budget into an estimated home-price ceiling. In the validated example, a $2,295 monthly housing budget and a factor of $6.50 per month per $1,000 borrowed produce approximately $353,077.
            </p>
            <p className="text-slate-500 font-normal text-[11px] italic">
              This conversion is an approximation tied to the calculator's selected assumptions. A different interest rate, loan term, down payment, tax amount, insurance amount, or mortgage insurance assumption can materially change the relationship between a monthly housing budget and a home purchase price.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">13. Debt Payoff Simulator</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              The debt-payoff simulator is useful when you want to understand the effect of eliminating a monthly obligation. In the validated example, gross monthly income is $6,500, housing is $1,800, and debts are $350 auto + $250 student + $150 credit card.
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg font-mono text-[11px]">
              <div>Before: $2,550 / $6,500 = 39.23%</div>
              <div>After paying $150: $2,400 / $6,500 = 36.92%</div>
              <div className="text-emerald-600 font-bold mt-0.5">DTI Reduction: 2.31 percentage points</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">14. Self-Employed Averaging</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Income documentation can be more complex for self-employed borrowers, and the calculator includes a simplified two-year averaging tool. In the validated example, Year 1 net income is $85,000 with a $5,000 add-back, while Year 2 is $92,000 with a $6,000 add-back.
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg font-mono text-[11px]">
              <div>Modeled Annual: ($90,000 + $98,000) / 2 = $94,000</div>
              <div className="text-blue-600 font-bold">Monthly: $7,833/mo</div>
            </div>
            <p className="text-slate-500 font-normal text-[11px] italic">
              This is the calculator's mathematical model and should not be treated as a complete underwriting determination.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 15, 16, 17, 18, 19, 20: BENCHMARKS, CREDIT SCORE, STUDENT LOANS, CO-SIGNED, AFFORDABILITY, LABELS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. DTI and Mortgage Program Benchmarks &amp; 16. Credit Score Impact
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">15. Mortgage Program Benchmarks</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Mortgage programs may publish or use different DTI benchmarks, and automated underwriting systems can evaluate a broader set of risk factors than a simple ratio table. The calculator therefore presents its program matrix as a modeled underwriting reference rather than a guarantee of approval.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 font-normal">
              <li><strong>Conventional:</strong> the calculator uses 28% / 36% as a benchmark and may show higher automated-underwriting ranges in supported scenarios.</li>
              <li><strong>FHA:</strong> the calculator displays 31% / 43% as a benchmark and recognizes that automated underwriting may evaluate higher ratios depending on the overall file.</li>
              <li><strong>VA:</strong> the calculator treats the back-end ratio as a guideline context and separately recognizes residual-income considerations.</li>
              <li><strong>USDA:</strong> the calculator includes program-specific benchmark values that should be treated as model inputs rather than universal approval rules.</li>
              <li><strong>Jumbo / non-conforming:</strong> the calculator may display broader DTI ranges depending on the modeled program assumptions.</li>
            </ul>
            <p className="text-slate-500 font-normal text-[11px] italic">
              The correct way to read these values is: they are useful reference points within the calculator. They are not promises that a lender will approve a borrower at a given DTI. Mortgage underwriting can incorporate credit history, reserves, loan-to-value, property characteristics, loan type, automated-underwriting findings and other compensating factors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">16. Does Credit Score Affect DTI?</h3>
              <p className="text-slate-600 dark:text-slate-400 font-normal">
                Credit score and DTI are different risk measures. A credit score reflects credit-history factors, while DTI measures debt obligations relative to gross income. The calculator's program-matrix logic uses credit score as an active input in its modeled eligibility classification, but users should not interpret that as a universal rule that one credit score automatically changes every lender's allowable DTI.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">17. Student Loans and DTI</h3>
              <p className="text-slate-600 dark:text-slate-400 font-normal">
                Student-loan obligations can affect DTI because a recurring monthly payment may be included in the debt numerator. The exact treatment of a student loan can vary by loan program and underwriting method, especially when a documented payment is very low or zero. The calculator's educational content distinguishes program-specific treatment such as documented $0 income-driven repayment treatment under one framework and percentage-of-balance under another.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">18. Co-Signed Debt &amp; VA Residual</h3>
              <p className="text-slate-600 dark:text-slate-400 font-normal">
                A co-signed debt can create a special underwriting question when another borrower makes the payment. The calculator presents this as educational context rather than an automatic exclusion. Similarly, VA underwriting considers residual income in addition to DTI.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">19. DTI vs Affordability</h3>
              <p className="text-slate-600 dark:text-slate-400 font-normal">
                DTI is not the same thing as household affordability. DTI focuses on debt obligations relative to gross income, whereas a true affordability analysis may also include groceries, utilities, transportation, childcare, savings, emergency reserves, and other living costs.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">20. Boundaries &amp; Risk Labels</h3>
              <p className="text-slate-600 dark:text-slate-400 font-normal">
                The calculator uses configurable risk tiers for planning. The validated classification includes a Borderline / Stretched band for DTI above 43% through 49%. These labels are explanatory, not legal or underwriting guarantees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 21: COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          21. Common DTI Calculation Mistakes
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300 list-disc list-inside font-normal">
            <li>Entering annual income as though it were monthly income.</li>
            <li>Forgetting to convert annual salary into a monthly gross amount.</li>
            <li>Using net take-home pay instead of gross income.</li>
            <li>Leaving out recurring debt payments that the selected model includes.</li>
            <li>Adding ordinary living expenses to DTI simply because they are monthly expenses.</li>
            <li>Counting the same debt twice.</li>
            <li>Assuming credit score and DTI are interchangeable.</li>
            <li>Treating a program benchmark as a guaranteed approval limit.</li>
            <li>Ignoring student-loan treatment differences across underwriting models.</li>
            <li>Interpreting a reverse-income or maximum-housing result as an actual lender approval.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 22: DTI CALCULATION METHODOLOGY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          22. DTI Calculation Methodology
        </h2>
        <div className="space-y-3 text-xs font-mono">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400 font-sans">Front-End DTI Formula</div>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg text-center font-bold">
              Front-End DTI = (Housing Costs / Gross Monthly Income) × 100
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400 font-sans">Back-End DTI Formula</div>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg text-center font-bold">
              Back-End DTI = ((Housing Costs + Recurring Debt) / Gross Monthly Income) × 100
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400 font-sans">Reverse Target Income Formula</div>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg text-center font-bold">
              Required Gross Monthly Income = (Housing Costs + Existing Debt) / Target DTI
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400 font-sans">Maximum Housing Budget Formula</div>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg text-center font-bold">
              Maximum Housing Budget = (Gross Monthly Income × Target DTI) - Existing Debt
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-bold text-blue-600 dark:text-blue-400 font-sans">Self-Employed Two-Year Average Formula</div>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg text-center font-bold">
              Qualifying Annual Income = (Year 1 Income + Year 1 Add-backs + Year 2 Income + Year 2 Add-backs) / 2
            </div>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 font-normal italic">
          These formulas describe the calculator's mathematical model. They do not replace a lender's underwriting methodology, which may apply additional rules.
        </p>
      </section>

      {/* SECTION 25 & 29: APPROVED BASELINE FACTS & INTERNAL LINKING STRATEGY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-4 text-xs">
        <div>
          <h3 className="font-extrabold text-sm text-blue-700 dark:text-blue-300 mb-1">
            25. Internal Planning Links
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300 font-medium">
            <li>• <Link href="/calculators/house-affordability-calculator" className="text-blue-600 hover:underline font-bold">House Affordability</Link>: connect debt burden with maximum home-price planning.</li>
            <li>• <Link href="/calculators/mortgage-calculator" className="text-blue-600 hover:underline font-bold">Mortgage Calculator</Link>: move from ratio analysis to payment and amortization details.</li>
            <li>• <Link href="/calculators/debt-payoff-calculator" className="text-blue-600 hover:underline font-bold">Debt Payoff</Link>: explore how reducing recurring debt changes monthly obligations.</li>
            <li>• <Link href="/calculators/down-payment-calculator" className="text-blue-600 hover:underline font-bold">Down Payment</Link>: connect cash contribution with mortgage and housing planning.</li>
            <li>• <Link href="/calculators/refinance-calculator" className="text-blue-600 hover:underline font-bold">Refinance</Link>: examine how changing loan terms may change the monthly payment.</li>
            <li>• <Link href="/calculators/loan-calculator" className="text-blue-600 hover:underline font-bold">Loan Calculator</Link>: compare general debt-service scenarios.</li>
            <li>• <Link href="/calculators/rent-calculator" className="text-blue-600 hover:underline font-bold">Rent Calculator</Link>: evaluate housing cost independently from mortgage underwriting.</li>
          </ul>
        </div>
        <div className="pt-2 border-t border-blue-200 dark:border-blue-900/60 text-slate-600 dark:text-slate-400 font-normal">
          <p>
            <strong>Validated Baseline Facts:</strong> $75,000 annual gross income converts to $6,250 monthly; housing totals $2,100; recurring debt totals $750; front-end DTI is 33.60%; and back-end DTI is 45.60%. The reverse-income baseline requires $6,666.67 monthly or $80,000 annual income for $1,800 housing plus $600 debt at a 36% target DTI. The maximum-housing baseline produces $2,295 monthly from $6,500 gross income, $500 existing debt and a 43% target DTI. The validated self-employed model averages $94,000 annual qualifying income from the two-year example. These are calculator scenarios, not individualized underwriting decisions.
          </p>
        </div>
      </section>
    </div>
  );
}
