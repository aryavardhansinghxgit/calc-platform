"use client";

import React from "react";

export function PaymentContent() {
  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. WHAT IS A LOAN PAYMENT */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. What is a Loan Payment? (Principal vs. Interest Anatomy)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          A <strong>Loan Payment</strong> (or periodic installment) is the scheduled fixed or variable amount a borrower pays to a lender to satisfy an outstanding debt obligation over a specified maturity schedule.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Principal Component
            </h3>
            <p className="text-black dark:text-slate-100">
              The direct repayment of the original borrowed money. Every dollar of principal paid reduces your remaining loan balance dollar-for-dollar.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Interest Component (Finance Charge)
            </h3>
            <p className="text-black dark:text-slate-100">
              The fee charged by the lender for borrowing funds, calculated each period on the remaining unamortized principal balance: {"Interest = Remaining Principal × (Annual Rate / Frequency)"}.
            </p>
          </div>
        </div>
      </section>

      {/* 2. HOW LOAN AMORTIZATION WORKS */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. How Loan Amortization Works (Front-Loaded Interest)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          On an amortized loan, the total payment amount remains constant throughout the term, but the internal allocation between principal and interest shifts dramatically over time:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs space-y-2 font-sans">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">The Standard Amortization Formula:</h3>
          <p className="text-black dark:text-slate-100 font-bold">
            {"Payment (M) = Principal × [r(1 + r)^n] / [(1 + r)^n - 1]"}
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            Where <em>P</em> is initial principal balance, <em>r</em> is periodic interest rate (Annual Rate / 12), and <em>n</em> is total number of monthly payments.
          </p>
        </div>
      </section>

      {/* 3. BI-WEEKLY PAYMENT ACCELERATION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. Accelerated Bi-Weekly Payment Strategy (The 13th Payment Hack)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          In an <strong>Accelerated Bi-Weekly</strong> payment structure, you pay exactly half of your regular monthly payment every two weeks. Because there are 52 weeks in a year, you make 26 half-payments, which equals <strong>13 full monthly payments per year</strong> instead of 12.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs space-y-1.5 font-sans">
          <p className="text-black dark:text-slate-100 font-bold">
            This extra full payment each year applies 100% directly toward principal reduction, typically shaving 4 to 6 years off a 30-year mortgage and saving tens of thousands of dollars in interest charges.
          </p>
        </div>
      </section>

      {/* 4. WORKED MATHEMATICAL EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. Step-by-Step Mathematical Worked Examples
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Example 1: Calculating Monthly Payment on a $200,000 15-Year Loan @ 6.0%
            </h3>
            <ul className="list-disc list-inside space-y-1 text-black dark:text-slate-100">
              <li>Principal (P) = $200,000</li>
              <li>Monthly Interest Rate (r) = 0.06 / 12 = 0.005</li>
              <li>Total Months (n) = 15 × 12 = 180</li>
              <li>Monthly Payment = $200,000 × [0.005(1.005)^180] / [(1.005)^180 - 1] = <strong>$1,687.71 / month</strong></li>
              <li>Total Amount Repaid = 180 × $1,687.71 = <strong>$303,788.46</strong> (Total Interest = $103,788.46)</li>
            </ul>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Example 2: Adding an Extra $100 / Month Principal Prepayment
            </h3>
            <ul className="list-disc list-inside space-y-1 text-black dark:text-slate-100">
              <li>New Monthly Payment = $1,787.71</li>
              <li>New Payoff Time = <strong>164 months (13.7 years)</strong> instead of 180 months</li>
              <li>Total Interest Saved = <strong>$11,842.15</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. FAQS (12 FAQS) */}
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
              Monthly loan payments are calculated using standard amortization mathematics factoring in your principal balance, annual interest rate divided by 12, and the total number of monthly payments across the loan term.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. What is the difference between principal and interest in a loan payment?
            </h3>
            <p className="text-black dark:text-slate-100">
              Principal represents the actual borrowed money you are returning to the lender, while interest is the finance charge fee paid to the lender for the privilege of borrowing those funds.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. How do extra payments shorten the loan payoff time and save interest?
            </h3>
            <p className="text-black dark:text-slate-100">
              Any extra payment made above your scheduled installment is applied directly to the remaining principal balance. Reducing the principal immediately lowers future interest charges across all subsequent months.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. What is an accelerated bi-weekly payment and how does it save money?
            </h3>
            <p className="text-black dark:text-slate-100">
              Accelerated bi-weekly payments divide your regular monthly payment in half and charge it every 14 days. With 26 pay periods per year, you make 13 full payments instead of 12, accelerating payoff by years.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              5. What happens if my monthly payment is smaller than the monthly interest?
            </h3>
            <p className="text-black dark:text-slate-100">
              This creates negative amortization (an interest trap). Unpaid interest is added to the principal balance, causing your total debt to grow each month instead of shrink.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              6. How do upfront origination fees and discount points affect the true APR of a loan?
            </h3>
            <p className="text-black dark:text-slate-100">
              Upfront fees and closing costs reduce the net proceeds of your loan while maintaining the same payment obligations, effectively increasing the Annual Percentage Rate (APR) above the nominal interest rate.
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              7. Can I pay off my loan early without incurring prepayment penalties?
            </h3>
            <p className="text-black dark:text-slate-100">
              Most modern consumer loans, auto loans, and residential mortgages do not have prepayment penalties. However, always review your loan agreement to ensure extra payments are permitted without penalty.
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              8. Why is more interest paid during the first few years of an amortization schedule?
            </h3>
            <p className="text-black dark:text-slate-100">
              Because monthly interest is calculated as a percentage of the remaining principal balance, high initial balances generate large interest fees. As the principal drops, monthly interest charges decline in tandem.
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              9. How do I calculate how much house or car I can afford based on my monthly budget?
            </h3>
            <p className="text-black dark:text-slate-100">
              Use the Maximum Affordable Loan solver by entering your comfortable monthly budget, interest rate, and term length to reverse-engineer your maximum borrowing power.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              10. What is the difference between fixed-rate and adjustable-rate loan payments?
            </h3>
            <p className="text-black dark:text-slate-100">
              Fixed-rate loans maintain an identical interest rate and payment throughout the entire term. Adjustable-rate loans (ARMs) reset periodically based on benchmark market interest indices.
            </p>
          </div>

          {/* FAQ 11 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              11. How does loan term length affect monthly payment vs total interest paid?
            </h3>
            <p className="text-black dark:text-slate-100">
              Shorter terms (e.g. 15 years) require higher monthly installments but save massive amounts of interest. Longer terms (e.g. 30 years) lower monthly payments but increase total interest over the life of the loan.
            </p>
          </div>

          {/* FAQ 12 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              12. How can I lower my monthly loan payment if my budget changes?
            </h3>
            <p className="text-black dark:text-slate-100">
              You can refinance the loan at a lower interest rate, extend the repayment term duration, or request loan recasting if you have made substantial principal prepayments.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PaymentContent;
