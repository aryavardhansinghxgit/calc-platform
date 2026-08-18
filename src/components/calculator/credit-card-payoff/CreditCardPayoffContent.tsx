"use client";

import React from "react";

export function CreditCardPayoffContent() {
  const faqs = [
    {
      question: "1. What is the Debt Avalanche method for paying off credit cards?",
      answer:
        "The Debt Avalanche method allocates all discretionary debt payoff funds toward the credit card with the highest Annual Percentage Rate (APR) while paying minimum dues on the rest. Once the highest-rate card is cleared, the freed-up payment rolls down to the next highest APR. Mathematically, this minimizes total interest paid.",
    },
    {
      question: "2. What is the Debt Snowball method?",
      answer:
        "The Debt Snowball method directs all extra payments to the credit card with the smallest outstanding dollar balance, regardless of interest rate. Once that card is fully paid off, the payment 'snowballs' into the next smallest balance, providing fast psychological wins and momentum.",
    },
    {
      question: "3. What is the Minimum Payment Trap on credit cards?",
      answer:
        "Credit card issuers typically set minimum monthly payments at only 1% to 2% of the balance plus finance charges (or a minimum floor like $25). Paying only the minimum causes the vast majority of your payment to go toward interest, stretching a $5,000 balance over 20+ years and costing thousands in extra finance charges.",
    },
    {
      question: "4. How does Daily Periodic Rate (DPR) work on credit card balances?",
      answer:
        "Credit card interest is compounded daily using the Daily Periodic Rate (DPR = APR ÷ 365). Your DPR is multiplied each day by your Average Daily Balance, meaning making payments earlier in your billing cycle reduces accrued interest charges immediately.",
    },
    {
      question: "5. What is a 0% APR Balance Transfer and how does it save money?",
      answer:
        "A balance transfer card offers a 0% promotional interest rate for 12 to 21 months in exchange for an upfront transfer fee (typically 3% to 5%). During this interest-free promotional window, 100% of your monthly payments go directly toward reducing principal debt.",
    },
    {
      question: "6. Does paying off credit cards improve my credit score?",
      answer:
        "Yes. Paying down credit card balances directly lowers your Credit Utilization Ratio (CUR)—the percentage of total credit limit currently used. Keeping CUR below 30% (and ideally below 10%) is one of the fastest ways to increase FICO and VantageScore ratings.",
    },
    {
      question: "7. Should I close paid-off credit card accounts?",
      answer:
        "In most cases, keeping paid-off cards open helps your credit score by preserving your overall available credit limit (which lowers total utilization) and maintaining your average credit history length. You should generally only close cards that carry expensive annual fees.",
    },
    {
      question: "8. How does making bi-weekly credit card payments help?",
      answer:
        "Making bi-weekly payments splits your monthly payment in half every two weeks, resulting in 26 half-payments (equal to 13 full payments per year). Additionally, because credit card interest compounds daily, lowering your balance mid-cycle reduces daily finance charges.",
    },
    {
      question: "9. What is the difference between a Credit Card and a Debt Consolidation Loan?",
      answer:
        "A debt consolidation personal loan replaces multiple revolving credit card balances with a single fixed-rate installment loan (often 7% to 14% APR vs. 20% to 30% APR on cards), providing a set payoff end date and lower monthly payments.",
    },
    {
      question: "10. Can I negotiate lower interest rates with credit card companies?",
      answer:
        "Yes. Cardholders with good payment track records can call card issuers' retention departments and request an APR reduction, temporary hardship rate reduction, or fee waiver, especially if competitors offer lower promotional rates.",
    },
    {
      question: "11. What happens if I miss a minimum credit card payment?",
      answer:
        "A missed payment can trigger late fees (up to $41), forfeit promotional 0% APRs, impose a high penalty APR (up to 29.99%), and result in a negative delinquency report to credit bureaus if unpaid past 30 days.",
    },
    {
      question: "12. How much should I pay each month to become debt-free in 2 years?",
      answer:
        "To clear debt in 24 months, use an amortized installment formula that covers both monthly interest charges and steady principal reduction. For example, a $10,000 balance at 22% APR requires approximately $519/month to reach a zero balance in 24 months.",
    },
  ];

  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. PRINCIPLES OF REPAYMENT */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. Credit Card Debt Elimination: Principles &amp; Repayment Mechanics
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Credit cards are revolving unsecured debt instruments where compound interest accrues daily on unpaid balances. Multiple cards offer distinct benefits such as travel perks, retail cashback, and higher aggregate credit limits, but require a disciplined payoff strategy.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-sm text-black dark:text-slate-100 block">Credit Utilization Ratio (CUR)</span>
            <p className="text-black dark:text-slate-100">
              Total balance divided by total credit limit. Maintaining utilization below 10% to 30% maximizes credit scores.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-sm text-black dark:text-slate-100 block">Daily Periodic Rate (DPR)</span>
            <p className="text-black dark:text-slate-100">
              Interest calculated daily as (APR ÷ 365) × Average Daily Balance. Earlier mid-cycle payments save money immediately.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STRATEGY COMPARISON */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. Comparing Debt Elimination Strategies: Avalanche vs. Snowball
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Debt Avalanche Strategy
            </h3>
            <p className="text-black dark:text-slate-100">
              Target Card: Highest APR (e.g. 24.99% card). Once paid, roll payment to next highest APR card. Mathematically guarantees the lowest total interest paid.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Debt Snowball Strategy
            </h3>
            <p className="text-black dark:text-slate-100">
              Target Card: Smallest dollar balance (e.g. $800 card). Rapidly knocks out individual accounts to build confidence and streamline monthly obligations.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 12 FAQS */}
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
