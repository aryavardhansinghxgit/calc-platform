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
      question: "12. How does inflation reduce the real economic burden of fixed-rate debt?",
      answer:
        "Inflation erodes the purchasing power of money over time. When you hold a fixed-rate loan, your monthly payment remains unchanged in nominal dollars while your wages and living costs rise with inflation, meaning each future payment represents a smaller percentage of your real economic purchasing power.",
    },
  ];

  return (
    <div className="space-y-3 text-black dark:text-zinc-100 font-sans leading-relaxed">
      {/* SECTION 1: WHAT IS LOAN REPAYMENT */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          What is Debt Repayment? Understanding Principal, Interest & Obligations
        </h2>
        <p className="text-xs text-black dark:text-zinc-200">
          Loan repayment is the contractual process of settling borrowed money through structured periodic payments consisting of principal amortization and accrued finance charges. Making on-time repayments builds credit health (FICO and VantageScore), prevents costly collections or legal judgments, and minimizes cumulative lifetime borrowing expenses.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Principal Reduction</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              The exact portion of your installment that directly pays down the outstanding loan balance, creating equity and lowering future interest.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Interest Finance Charges</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              The fee charged by the lender for borrowing capital, calculated by multiplying your periodic interest rate by your remaining balance.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Amortization Mechanics</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Early payments are heavily weighted toward interest, while later payments shift rapidly toward paying down principal.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: FIXED TERM VS FIXED INSTALLMENT */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Choosing Your Repayment Plan: Fixed Term vs. Fixed Installment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-xs text-black dark:text-zinc-100">
              1. Mode A: Fixed Loan Term (Target Date Budgeting)
            </h3>
            <p className="text-[11px] text-black dark:text-zinc-300">
              You choose the exact lifespan of the loan (e.g. 5-year auto loan, 15-year or 30-year mortgage), and the formula calculates the precise monthly payment required:
            </p>
            <div className="font-mono text-[11px] bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700">
              PMT = P × [i(1+i)^n] ÷ [(1+i)^n - 1]
            </div>
            <p className="text-[11px] text-black dark:text-zinc-300">
              <strong>Best For:</strong> Structured loans with rigid contractual maturity dates.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-xs text-black dark:text-zinc-100">
              2. Mode B: Fixed Installment (Cash Flow Budgeting)
            </h3>
            <p className="text-[11px] text-black dark:text-zinc-300">
              You specify a fixed dollar amount from your disposable income (e.g. $400/month), and the formula solves for total periods (n) logarithmically:
            </p>
            <div className="font-mono text-[11px] bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700">
              n = -ln(1 - (P × i)/PMT) ÷ ln(1 + i)
            </div>
            <p className="text-[11px] text-black dark:text-zinc-300">
              <strong>Best For:</strong> Accelerating credit cards, personal loans, and debt elimination.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: THE 4 MAJOR CONSUMER DEBT CATEGORIES */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          The 4 Most Common Types of Consumer Loan Repayments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">1. Mortgages</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Secured long-term real estate loans amortized over 15 to 30 years with fixed or adjustable interest rates.
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">2. Auto Loans</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Secured medium-term consumer vehicle loans typically repaid monthly over 36 to 84 months.
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">3. Student Loans</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Federal IDR/Standard vs. Private student loans with 5-to-25-year repayment terms and deferment rules.
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">4. Credit Cards</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Revolving debt with floating APRs and dropping minimum payments designed to maximize lender interest.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: COMPOUNDING & PAYMENT FREQUENCY INTERACTION */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          How Compounding Frequency and Repayment Intervals Work Together
        </h2>
        <p className="text-xs text-black dark:text-zinc-200">
          When loan interest compounds on a different schedule than your repayment frequency (e.g., daily compounding with monthly payments, or semi-annual compounding with bi-weekly payments), the mathematical effective periodic rate is computed as:
        </p>

        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-[11px] space-y-1 text-black dark:text-zinc-200">
          <div>• Discrete Compounding: i = (1 + r / m)^(m / k) - 1</div>
          <div>• Continuous Compounding: i = e^(r / k) - 1</div>
          <div className="text-[10px] text-slate-500 font-sans">
            Where r = nominal annual rate, m = compounding periods/year, k = repayment periods/year.
          </div>
        </div>
      </div>

      {/* SECTION 5: WORKED MATHEMATICAL CASE STUDIES */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Worked Mathematical Examples: $25,000 Personal Loan @ 8.0% APR
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">Example 1: Fixed 5-Year Term (60 Months)</h3>
            <div className="font-mono text-[11px] text-black dark:text-zinc-300 space-y-0.5">
              <div>• Principal (P) = $25,000 | i = 0.08 / 12 = 0.006667</div>
              <div>• Total Periods (n) = 60 Months</div>
              <div>• Monthly Payment = $25,000 × [0.006667(1.006667)^60] / [(1.006667)^60 - 1] = <strong>$506.91/mo</strong></div>
              <div>• Total Paid = <strong>$30,414.60</strong></div>
              <div>• Total Interest = <strong>$5,414.60</strong></div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">Example 2: Fixed Installment of $700/mo</h3>
            <div className="font-mono text-[11px] text-black dark:text-zinc-300 space-y-0.5">
              <div>• Principal (P) = $25,000 | Payment (PMT) = $700.00</div>
              <div>• n = -ln(1 - (25000 × 0.006667)/700) ÷ ln(1.006667) = <strong>41.1 Months (3.4 Yrs)</strong></div>
              <div>• Total Interest = <strong>$3,546.20</strong></div>
              <div>• Interest Savings = <strong>$1,868.40</strong> and 19 months shaved off!</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6: 12 FAQS ALWAYS OPEN CARDS */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Frequently Asked Questions (12 Key Loan Repayment FAQs)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-800/50 space-y-1"
            >
              <h3 className="font-bold text-xs text-black dark:text-zinc-100">
                {faq.question}
              </h3>
              <p className="text-[11px] text-black dark:text-zinc-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
