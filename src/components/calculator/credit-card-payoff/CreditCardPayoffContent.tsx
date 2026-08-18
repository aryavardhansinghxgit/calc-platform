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
    <div className="space-y-3 text-black dark:text-zinc-100 font-sans leading-relaxed">
      {/* SECTION 1: CREDIT CARD DYNAMICS & MULTI-CARD ADVANTAGES */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Credit Card Debt Elimination: Principles & Repayment Mechanics
        </h2>
        <p className="text-xs text-black dark:text-zinc-200">
          Credit cards are revolving unsecured debt instruments where compound interest accrues daily on unpaid balances. Multiple cards offer distinct benefits such as travel perks, retail cashback, and higher aggregate credit limits, but require a disciplined payoff strategy:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Credit Utilization (CUR)</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Total balance divided by total credit limit. Maintaining utilization below 10% to 30% maximizes credit scores.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Daily Compounding (DPR)</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Interest calculated daily as (APR ÷ 365) × Average Daily Balance. Earlier mid-cycle payments save money.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Debt Avalanche</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Focuses excess cash on highest APR balances first. Mathematically guarantees lowest total interest paid.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-[11px] uppercase text-black dark:text-zinc-100 block">Debt Snowball</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Focuses excess cash on smallest balance accounts first. Creates fast behavioral momentum and eliminates bills.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: AVALANCHE VS SNOWBALL VS MINIMUM PAYMENTS */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Comparing Debt Elimination Strategies: Avalanche vs. Snowball vs. Minimum Payment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-xs uppercase text-blue-600 dark:text-blue-400 block">1. Debt Avalanche (Math-First)</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Target Card: Highest APR (e.g. 24.99% card). Once paid, roll payment to next highest APR card. Best for saving the maximum dollar amount in finance charges.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-xs uppercase text-emerald-600 dark:text-emerald-400 block">2. Debt Snowball (Psychology-First)</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Target Card: Smallest dollar balance (e.g. $800 card). Rapidly knocks out individual accounts to build confidence and streamline monthly obligations.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-xs uppercase text-red-600 dark:text-red-400 block">3. Minimum Payment Trap</span>
            <p className="text-[11px] text-black dark:text-zinc-300">
              Paying only 1%–2% of balance causes loan terms to exceed 20 to 30 years with interest costs exceeding 150% to 300% of the original principal.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: WORKED MATHEMATICAL CASE STUDIES */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Worked Mathematical Example ($14,500 Total Debt Across 3 Cards with $500/Month Budget)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">Starting Card Profile</h3>
            <div className="font-mono text-[11px] text-black dark:text-zinc-300 space-y-0.5">
              <div>• Card 1: $4,600 Balance @ 18.99% APR ($100 Min Pmt)</div>
              <div>• Card 2: $3,900 Balance @ 19.99% APR ($90 Min Pmt)</div>
              <div>• Card 3: $6,000 Balance @ 15.99% APR ($120 Min Pmt)</div>
              <div>• Total Debt: <strong>$14,500.00</strong> (Total Minimum: $310/mo)</div>
              <div>• Monthly Debt Budget: <strong>$500.00/month</strong></div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">Avalanche Payoff Results</h3>
            <div className="font-mono text-[11px] text-black dark:text-zinc-300 space-y-0.5">
              <div>• Target Order: Card 2 (19.99%) → Card 1 (18.99%) → Card 3 (15.99%)</div>
              <div>• Debt-Free Timeline: <strong>38 Months (~3.2 Years)</strong></div>
              <div>• Total Payments: $18,720.00</div>
              <div>• Total Interest Paid: <strong>$4,220.00</strong></div>
              <div>• vs. Minimum Only: Saved 18+ Years & $8,500+ in Interest!</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: 12 FAQS ALWAYS OPEN CARDS */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-3.5 shadow-xs space-y-2.5">
        <h2 className="text-sm font-extrabold text-black dark:text-zinc-100">
          Frequently Asked Questions (12 Key Credit Card Payoff FAQs)
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
