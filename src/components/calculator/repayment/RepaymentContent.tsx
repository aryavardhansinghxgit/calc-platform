"use client";

import React from "react";

export function RepaymentContent() {
  const faqs = [
    {
      question: "1. What is the difference between a fixed term and fixed installment repayment plan?",
      answer:
        "A fixed term plan establishes a set maturity date (e.g., 5 years or 30 years) and calculates the exact periodic payment required to retire the principal and interest. A fixed installment plan allows the borrower to set a custom payment amount, and the calculator solves logarithmically for how many months or years it will take to become debt-free.",
    },
    {
      question: "2. How does compounding frequency affect my total loan repayment amount?",
      answer:
        "Compounding frequency dictates how often unpaid accrued interest is converted into principal. More frequent compounding (e.g., daily vs. annually) slightly increases the effective annual rate. When payment frequency differs from compounding frequency, the effective periodic interest rate is converted via the formula i = (1 + r/m)^(m/k) - 1.",
    },
    {
      question: "3. What happens if my fixed installment is less than the periodic interest charge?",
      answer:
        "Negative amortization occurs. When your payment is smaller than the accrued periodic interest (Payment < Balance × Rate), the unpaid interest is capitalized into the loan principal, causing the debt balance to grow indefinitely regardless of how many payments you make.",
    },
    {
      question: "4. How does making accelerated bi-weekly repayments shorten loan terms?",
      answer:
        "Accelerated bi-weekly payments split your monthly installment into two equal halves paid every 14 days. Because there are 52 weeks in a year, you make 26 half-payments, which equals 13 full monthly payments annually. That single extra monthly payment directly reduces principal and shaves 4 to 8 years off a 30-year mortgage.",
    },
    {
      question: "5. Can I pay off my loan early without incurring prepayment penalties?",
      answer:
        "Most consumer loans, mortgages, and credit cards in the United States do not carry prepayment penalties under federal regulations. However, certain subprime mortgages, commercial loans, or auto dealer contracts may specify a prepayment fee during the first 1 to 5 years. Always verify your loan agreement's prepayment disclosure clause.",
    },
    {
      question: "6. Why are early mortgage and loan payments mostly interest while later payments are mostly principal?",
      answer:
        "Under standard amortization, interest is calculated on the remaining loan balance. Because the principal balance is largest at the beginning of the term, interest charges consume the majority of early payments. As the principal balance declines, a progressively larger portion of each fixed payment goes toward principal repayment.",
    },
    {
      question: "7. How are student loan repayment plans structured differently than standard loans?",
      answer:
        "Federal student loans offer specialized income-driven repayment (IDR) plans where monthly payments are capped at a percentage of discretionary income rather than fixed loan balances. Private student loans operate like standard fixed-term installment loans with fixed or variable interest rates and set 5-to-20-year terms.",
    },
    {
      question: "8. Why does paying only the minimum on credit cards take decades to pay off?",
      answer:
        "Credit card minimum payments are calculated as a percentage of the remaining balance (e.g., 1% of balance + monthly interest). Because the required dollar payment drops each month as the balance falls, the debt repayment curve becomes asymptotic, stretching payback over 15 to 30 years and doubling or tripling total interest costs.",
    },
    {
      question: "9. How do extra lump-sum payments reduce total interest over the life of a loan?",
      answer:
        "Extra lump-sum payments apply 100% to the principal balance, instantly reducing the baseline against which future daily or monthly interest is calculated. This creates an immediate compounding savings effect, accelerating the debt-free date and eliminating significant lifetime interest.",
    },
    {
      question: "10. What is debt consolidation and when should I use it to repay multiple loans?",
      answer:
        "Debt consolidation merges multiple high-interest debts (such as credit cards or personal loans) into a single new loan with a lower interest rate and a structured repayment schedule. It is advantageous when the new APR is significantly lower than the weighted average rate of the original debts and you commit to not running up new balances.",
    },
    {
      question: "11. How does continuous compounding differ from discrete compounding?",
      answer:
        "Discrete compounding calculates interest at specific intervals (monthly, daily, quarterly), whereas continuous compounding assumes interest accumulates and compounds at every infinitesimal moment using the mathematical constant e. The periodic rate formula for continuous compounding is i = e^(r/k) - 1.",
    },
    {
      question: "12. What is the difference between simple interest and amortized installment loans?",
      answer:
        "Simple interest calculates finance charges strictly on the original principal balance (Interest = Principal × Rate × Time). In amortized installment loans, interest is recalculated at every payment interval against the declining remaining balance, with each installment paying accrued interest first and principal second.",
    },
  ];

  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. PRINCIPLES OF LOAN REPAYMENT */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. Principles of Debt Repayment &amp; Amortization Mathematics
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          A <strong>Loan Repayment Schedule</strong> (or amortization plan) is a structured financial mechanism that breaks down how a fixed borrowed principal balance, plus periodic compound interest charges, is systematically repaid over time through regular installments.
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Every loan payment is mathematically split into two distinct portions: <strong>accrued interest</strong> (the cost of borrowing paid to the creditor) and <strong>principal reduction</strong> (the equity portion that reduces the remaining debt balance).
        </p>
      </section>

      {/* 2. THE TWO PRIMARY REPAYMENT MODES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. Fixed Loan Term vs. Fixed Installment Amount
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Fixed Term Mode (Solving for Payment)
            </h3>
            <p className="text-black dark:text-slate-100">
              You specify the exact loan balance, interest rate, and desired duration (e.g. 5 years or 30 years). The amortization formula calculates the exact fixed periodic installment required to retire the loan balance to zero by the maturity date.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Fixed Installment Mode (Solving for Timeline)
            </h3>
            <p className="text-black dark:text-slate-100">
              You specify the budget you can afford to pay each month (e.g. $400/mo). The calculator solves logarithmically for the number of periods $N = -\ln(1 - (B \cdot i) / PMT) / \ln(1 + i)$ required to eliminate the debt.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MULTI-COMPOUNDING & FREQUENCY HARMONIZATION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. Multi-Compounding Frequency Harmonization Formula
        </h2>
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-3 text-xs font-medium">
          <p className="text-black dark:text-slate-100">
            When payment frequency ($k$) differs from compounding frequency ($m$), the effective periodic interest rate ($i$) is converted via the standard financial formula:
          </p>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs">
            i = (1 + r / m)^(m / k) - 1
          </div>
          <p className="text-black dark:text-slate-100">
            For continuous compounding, the periodic rate simplifies to <strong>i = e^(r / k) - 1</strong>. This ensures exact mathematical precision whether calculating mortgages, auto loans, or multi-compounding personal debt.
          </p>
        </div>
      </section>

      {/* 4. ACCELERATION STRATEGIES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. Debt Payoff Accelerators: Bi-Weekly &amp; Extra Principal Payments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Accelerated Bi-Weekly Payments
            </h3>
            <p className="text-black dark:text-slate-100">
              By paying half your monthly installment every 14 days, you make 26 half-payments per year (13 full payments). That 1 extra monthly payment per year directly reduces principal, saving thousands in interest and cutting years off your debt timeline.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Lump-Sum Prepayments
            </h3>
            <p className="text-black dark:text-slate-100">
              Applying tax refunds, work bonuses, or inheritance funds directly to principal reduces the baseline on which future interest is calculated, triggering immediate compounding interest savings.
            </p>
          </div>
        </div>
      </section>

      {/* 5. 12 FAQS */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5"
            >
              <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
                {faq.question}
              </h3>
              <p className="text-black dark:text-slate-100 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
