"use client";

import React from "react";

export function PaymentContent() {
  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. WHAT IS A LOAN PAYMENT */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. What is a Loan Payment? (Foundations, Anatomy &amp; Legal Definitions)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          A <strong>Loan Payment</strong> (also referred to as a periodic debt service installment) is the contractually mandated sum of money that a borrower pays to a financial institution or lender at recurring intervals (typically monthly, bi-weekly, or weekly) to satisfy an outstanding credit facility over a predetermined maturity horizon.
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Every standard amortized installment payment is composed of two primary financial elements—and in the case of collateralized residential loans, up to four distinct components (collectively referred to in mortgage lending as <strong>PITI</strong>):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Principal Repayment
            </h3>
            <p className="text-black dark:text-slate-100">
              The principal represents the original face value of funds advanced by the creditor. Every dollar allocated toward principal directly reduces the remaining outstanding balance of the debt on a 1:1 basis, increasing the borrower's equity in the underlying collateral or net worth.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Interest (Finance Charge)
            </h3>
            <p className="text-black dark:text-slate-100">
              Interest is the contractual borrowing fee charged by the creditor for the temporary use of capital and risk assumption. In simple interest amortized debts, the periodic interest fee is computed strictly on the remaining unpaid principal balance as:
            </p>
            <p className="font-bold text-black dark:text-slate-100">
              {"Periodic Interest = Remaining Principal × (Annual Nominal Rate / Payment Frequency)"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. Escrow (Property Taxes &amp; Insurance)
            </h3>
            <p className="text-black dark:text-slate-100">
              In residential mortgage lending, lenders often collect one-twelfth of the annual municipal property taxes, homeowners hazard insurance premiums, and flood insurance into an escrow custodial reserve account to disburse on behalf of the borrower when statutory bills come due.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. Private Mortgage Insurance (PMI / MIP)
            </h3>
            <p className="text-black dark:text-slate-100">
              When a homebuyer puts down less than 20% equity (loan-to-value ratio &gt; 80%), lenders assess monthly PMI (conventional) or Mortgage Insurance Premiums (FHA) to protect the creditor against default loss. This fee is eliminated once loan-to-value drops to 78–80%.
            </p>
          </div>
        </div>
      </section>

      {/* 2. HOW LOAN AMORTIZATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. How Loan Amortization Works (The Front-Loaded Interest Reality)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          The defining characteristic of a fully amortizing fixed-rate loan is that the <strong>total payment amount remains perfectly identical each month</strong>, while the internal distribution between principal reduction and interest charges changes with every single payment made:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Why Are Early Loan Payments Almost Entirely Interest?
            </h3>
            <p className="text-black dark:text-slate-100">
              Because monthly interest is charged against the <em>remaining unamortized balance</em>, the loan balance is at its absolute peak during Year 1. Consequently, the interest portion consumes the majority of your installment. For instance, on a $300,000 30-year mortgage at 6.5%, the first month's payment of $1,896.20 consists of <strong>$1,625.00 in pure interest (85.7%)</strong> and only <strong>$271.20 in principal (14.3%)</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              The Crossover Point
            </h3>
            <p className="text-black dark:text-slate-100">
              As principal is gradually chipped away over time, the dollar interest charge shrinks each month. This forces a larger portion of the fixed monthly installment toward principal. On a 30-year loan at 6.5%, the borrower reaches the "crossover point"—where more than 50% of the monthly payment goes to principal rather than interest—only in <strong>Year 19 (Payment 225)</strong>!
            </p>
          </div>
        </div>
      </section>

      {/* 3. MATHEMATICAL FORMULAS MATRIX */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. Complete Loan Payment Mathematical Derivations &amp; Formulas
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Consumer credit, banking, and mortgage institutions use exact algebraic equations to model debt service:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 font-sans">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Standard Amortization Monthly Payment Equation
            </h3>
            <p className="text-black dark:text-slate-100 font-bold">
              {"M = P × [r(1 + r)^n] / [(1 + r)^n - 1]"}
            </p>
            <ul className="list-disc list-inside space-y-0.5 text-black dark:text-slate-100">
              <li><strong>M:</strong> Periodic payment installment amount ($)</li>
              <li><strong>P:</strong> Original principal borrowed ($)</li>
              <li><strong>r:</strong> Periodic nominal interest rate (Annual Rate / Payment Frequency, e.g. 0.06 / 12 = 0.005)</li>
              <li><strong>n:</strong> Total number of payment periods across the loan lifetime (e.g. 15 years × 12 = 180 months)</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 font-sans">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Term Duration Solving Equation (Logarithmic Derivation)
            </h3>
            <p className="text-black dark:text-slate-100 font-bold">
              {"n = -ln[1 - (P × r) / M] / ln(1 + r)"}
            </p>
            <p className="text-black dark:text-slate-100">
              Used when you have a fixed monthly budget (M) and want to determine exactly how many months (n) are required to eliminate the principal balance (P) at rate (r).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 font-sans">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. Maximum Affordable Borrowing Principal Equation
            </h3>
            <p className="text-black dark:text-slate-100 font-bold">
              {"P = M × [(1 - (1 + r)^(-n)) / r]"}
            </p>
            <p className="text-black dark:text-slate-100">
              Calculates the maximum loan size a consumer can qualify for given a target maximum monthly installment budget (M), term length (n), and market interest rate (r).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 font-sans">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. True Annual Percentage Rate (APR) Formulation
            </h3>
            <p className="text-black dark:text-slate-100 font-bold">
              {"P - Upfront Fees = ∑ [ M / (1 + APR/12)^t ] from t=1 to n"}
            </p>
            <p className="text-black dark:text-slate-100">
              Solved via numerical iteration (Newton-Raphson method) to determine the true annualized effective cost of borrowing after accounting for origination points, processing fees, and mandatory upfront closing charges.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ACCELERATED BI-WEEKLY STRATEGY */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. Accelerated Bi-Weekly Payment Strategy (The 13th Payment Hack)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          In an <strong>Accelerated Bi-Weekly</strong> payment schedule, you take your standard monthly payment, divide it by 2, and pay that half-amount every 14 calendar days.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              The Math of 26 Half-Payments
            </h3>
            <p className="text-black dark:text-slate-100">
              Because a calendar year contains 52 weeks (26 bi-weekly periods), you submit 26 half-payments over 12 months. This equals <strong>13 full monthly payments per year</strong> (an entire extra monthly payment every 12 months).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Compounding Interest Savings
            </h3>
            <p className="text-black dark:text-slate-100">
              Because the 13th payment is applied 100% directly toward principal reduction with $0 interest overhead, it permanently shrinks future compounding. On a $350,000 30-year mortgage at 6.5%, accelerated bi-weekly payments shave <strong>5.2 years off the loan</strong> and save over <strong>$82,000 in total interest</strong>!
            </p>
          </div>
        </div>
      </section>

      {/* 5. COMPARING MAJOR LOAN CATEGORIES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          5. Comparing Major Loan Categories: Mortgages, Auto, Personal &amp; Student Loans
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-300 dark:border-slate-700 text-xs">
          <table className="w-full text-center border-collapse font-sans">
            <thead className="bg-slate-100 dark:bg-slate-800 text-black dark:text-slate-100 font-bold border-b border-slate-300 dark:border-slate-700">
              <tr>
                <th className="p-2.5 text-left">Loan Type</th>
                <th className="p-2.5">Typical Term</th>
                <th className="p-2.5">Collateral</th>
                <th className="p-2.5">Interest Range</th>
                <th className="p-2.5 text-left">Key Structural Features</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-2.5 text-left font-bold text-black dark:text-slate-100">Residential Mortgage</td>
                <td className="p-2.5">15 – 30 Years</td>
                <td className="p-2.5">Real Estate Property</td>
                <td className="p-2.5">5.5% – 7.5%</td>
                <td className="p-2.5 text-left">Includes Escrow (Taxes/Insurance); tax-deductible interest in many jurisdictions.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-2.5 text-left font-bold text-black dark:text-slate-100">Auto Installment Loan</td>
                <td className="p-2.5">36 – 84 Months</td>
                <td className="p-2.5">Vehicle Title</td>
                <td className="p-2.5">4.5% – 12.0%</td>
                <td className="p-2.5 text-left">Depreciating asset collateral; terms beyond 60 months risk negative equity.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-2.5 text-left font-bold text-black dark:text-slate-100">Personal Term Loan</td>
                <td className="p-2.5">12 – 60 Months</td>
                <td className="p-2.5">Unsecured (None)</td>
                <td className="p-2.5">7.5% – 32.0%</td>
                <td className="p-2.5 text-left">Fixed installment for debt consolidation; rate heavily dependent on credit score.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-2.5 text-left font-bold text-black dark:text-slate-100">Student Loan</td>
                <td className="p-2.5">10 – 25 Years</td>
                <td className="p-2.5">Unsecured</td>
                <td className="p-2.5">4.0% – 9.0%</td>
                <td className="p-2.5 text-left">Federal loans feature income-driven repayment (IDR) and forgiveness pathways.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. PREPAYMENT ACCELERATION STRATEGIES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          6. Prepayment Strategies: How Small Extra Contributions Eliminate Debt
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. The Fixed Monthly Boost (+$100/mo)
            </h3>
            <p className="text-black dark:text-slate-100">
              Adding just $100 every month on a $250,000 30-year mortgage cuts over 4.5 years off your term and saves approximately $43,000 in interest charges without straining cash flow.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Annual Tax Refund Windfall
            </h3>
            <p className="text-black dark:text-slate-100">
              Applying a single $3,000 annual bonus or tax refund directly to principal each spring delivers massive compound savings because it immediately reduces the balance that future months compute interest upon.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. Round-Up Payments
            </h3>
            <p className="text-black dark:text-slate-100">
              Rounding your monthly payment up to the nearest hundred (e.g. paying $1,700 instead of $1,623) creates seamless, automated prepayment discipline that compounds over a multi-year horizon.
            </p>
          </div>
        </div>
      </section>

      {/* 7. STEP-BY-STEP MATHEMATICAL WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          7. Step-by-Step Mathematical Worked Examples
        </h2>
        <div className="space-y-3 text-xs">
          {/* Example 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Example 1: $20,000 5-Year Auto Loan @ 6.0% Annual Interest
            </h3>
            <ul className="list-disc list-inside space-y-1 text-black dark:text-slate-100">
              <li>Principal (P) = $20,000 | Monthly Rate (r) = 0.06 / 12 = 0.005 | Total Payments (n) = 5 × 12 = 60 months</li>
              <li>Compound Factor: (1 + 0.005)^60 = 1.348850</li>
              <li>Monthly Payment = $20,000 × [0.005 × 1.348850] / [1.348850 - 1] = $20,000 × [0.006744 / 0.348850] = <strong>$386.66 / month</strong></li>
              <li>Total Amount Repaid = 60 × $386.66 = <strong>$23,199.36</strong></li>
              <li>Total Interest Paid = $23,199.36 - $20,000 = <strong>$3,199.36</strong></li>
            </ul>
          </div>

          {/* Example 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Example 2: $200,000 15-Year Fixed Loan @ 6.0% vs. Extra $100/mo
            </h3>
            <ul className="list-disc list-inside space-y-1 text-black dark:text-slate-100">
              <li>Standard Monthly Payment = $200,000 × [0.005(1.005)^180] / [(1.005)^180 - 1] = <strong>$1,687.71 / month</strong></li>
              <li>Standard Total Repaid = 180 × $1,687.71 = <strong>$303,788.46</strong> (Total Interest: <strong>$103,788.46</strong>)</li>
              <li>With Extra $100/mo ($1,787.71 total): Paid off in <strong>164 months (13.7 years)</strong></li>
              <li>Total Interest Paid with Extra = <strong>$91,946.31</strong> &rarr; Net Interest Saved = <strong>$11,842.15</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. FAQS (12 DETAILED FAQS) */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {/* FAQ 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. How is my monthly loan payment calculated?
            </h3>
            <p className="text-black dark:text-slate-100">
              Monthly loan payments are calculated using standard amortization mathematics factoring in your principal balance, annual interest rate divided by 12, and the total number of monthly payments across the loan term. The formula multiplies the principal balance by the periodic rate compounded over the term, divided by the compound growth factor minus one.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. What is the difference between principal and interest in a loan payment?
            </h3>
            <p className="text-black dark:text-slate-100">
              Principal represents the actual borrowed money you are returning to the lender to lower your debt, while interest is the finance charge fee paid to the lender for the privilege of borrowing those funds. In the beginning of an amortized loan, interest represents the majority of each installment; over time, the payment shifts heavily toward principal.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. How do extra payments shorten the loan payoff time and save interest?
            </h3>
            <p className="text-black dark:text-slate-100">
              Any extra payment made above your contractually scheduled installment is applied 100% directly to the remaining principal balance. Reducing the principal immediately lowers the balance that future months' interest calculations are based upon, creating a compounding acceleration that shortens the term and saves thousands in total finance charges.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. What is an accelerated bi-weekly payment and how does it save money?
            </h3>
            <p className="text-black dark:text-slate-100">
              Accelerated bi-weekly payments divide your regular monthly payment in half and charge it every 14 calendar days. With 52 weeks (26 pay periods) in a year, you submit 26 half-payments, which equals 13 full payments per year instead of 12. That single extra payment each year reduces principal directly, shaving 4 to 6 years off a 30-year mortgage.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              5. What happens if my monthly payment is smaller than the monthly interest?
            </h3>
            <p className="text-black dark:text-slate-100">
              This triggers negative amortization (commonly known as an interest trap). Because the payment fails to cover the monthly accrued finance charge, the unpaid interest is capitalized and added directly onto the loan principal. As a result, the borrower's total debt balance grows larger each month rather than shrinking.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              6. How do upfront origination fees and discount points affect the true APR of a loan?
            </h3>
            <p className="text-black dark:text-slate-100">
              Upfront fees, discount points, and closing charges reduce the net cash proceeds you receive from the lender while maintaining the full scheduled repayment burden. This increases the Annual Percentage Rate (APR) above the stated nominal interest rate, reflecting the true annualized total cost of credit.
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              7. Can I pay off my loan early without incurring prepayment penalties?
            </h3>
            <p className="text-black dark:text-slate-100">
              Under federal regulations, almost all modern residential conforming mortgages, federal student loans, and reputable consumer auto and personal loans are prohibited from charging prepayment penalties. However, commercial loans, subprime mortgages, and specialized hard-money facilities may still carry prepayment clauses.
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              8. Why is more interest paid during the first few years of an amortization schedule?
            </h3>
            <p className="text-black dark:text-slate-100">
              Because monthly interest is calculated as a percentage of the remaining principal balance, high initial balances generate large interest fees. As the principal drops, monthly interest charges decline in tandem, allowing an increasingly larger percentage of each subsequent payment to pay down the remaining principal.
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              9. How do I calculate how much house or car I can afford based on my monthly budget?
            </h3>
            <p className="text-black dark:text-slate-100">
              Use the Maximum Affordable Loan solver by entering your comfortable monthly budget, interest rate, and term length to reverse-engineer your maximum borrowing power. For example, at a 6.5% interest rate and 30-year term, an $1,800 monthly payment supports a maximum borrowing capacity of approximately $284,700.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              10. What is the difference between fixed-rate and adjustable-rate loan payments?
            </h3>
            <p className="text-black dark:text-slate-100">
              Fixed-rate loans maintain an identical interest rate and principal/interest payment throughout the entire term, insulating borrowers from interest rate spikes. Adjustable-rate mortgages (ARMs) offer a lower initial teaser rate for an introductory period (e.g. 5 or 7 years) and then reset periodically based on benchmark market indices.
            </p>
          </div>

          {/* FAQ 11 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              11. How does loan term length affect monthly payment vs total interest paid?
            </h3>
            <p className="text-black dark:text-slate-100">
              Shorter terms (e.g. 15 years) require higher monthly installments but save massive amounts of interest over the life of the loan. Longer terms (e.g. 30 years) lower monthly payments to improve monthly cash-flow affordability but significantly increase the total cumulative interest paid to the lender.
            </p>
          </div>

          {/* FAQ 12 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              12. How can I lower my monthly loan payment if my budget changes?
            </h3>
            <p className="text-black dark:text-slate-100">
              You can lower your monthly loan payment by refinancing into a new loan with a lower interest rate or longer amortization term, or by requesting loan recasting from your existing servicer if you have already made a large lump-sum principal prepayment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PaymentContent;
