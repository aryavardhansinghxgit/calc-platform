"use client";

import React from "react";

export function CreditCardContent() {
  const faqs = [
    {
      question: "1. How is credit card interest calculated on a daily balance?",
      answer:
        "Credit card issuers calculate interest using the Average Daily Balance (ADB) method. First, the Annual Percentage Rate (APR) is divided by 365 to determine the Daily Periodic Rate (DPR). At the end of each billing cycle, your daily ending balances are summed and divided by the number of days in the cycle to find your ADB. The monthly interest charge equals ADB × DPR × Number of Days in the billing cycle.",
    },
    {
      question: "2. What is the credit card minimum payment trap and how does it work?",
      answer:
        "The minimum payment trap occurs when a cardholder pays only the minimum amount required by the issuer (typically 1% to 2% of the balance plus monthly interest, or a flat floor of $25–$35). Because the required dollar amount decreases as the balance shrinks, repayment stretches across 15 to 30+ years, forcing borrowers to repay two to three times the original principal in interest charges alone.",
    },
    {
      question: "3. Which debt elimination strategy is better: Debt Avalanche or Debt Snowball?",
      answer:
        "Mathematically, the Debt Avalanche method is superior because it channels extra payments to the debt with the highest APR, minimizing total interest paid and clearing balances in the shortest possible time. The Debt Snowball method prioritizes the smallest balance first, which provides psychological quick-wins but results in slightly higher lifetime interest costs.",
    },
    {
      question: "4. How does a 0% APR balance transfer save money on credit card debt?",
      answer:
        "A 0% balance transfer credit card freezes interest charges for an introductory promotional window (usually 12 to 21 months). By transferring high-APR balances (e.g. 24%), 100% of your monthly payments go directly toward principal reduction. After deducting the upfront transfer fee (typically 3% to 5%), borrowers often save thousands of dollars in interest.",
    },
    {
      question: "5. What happens if my monthly payment is less than the monthly interest charge?",
      answer:
        "If your monthly payment is less than the monthly finance charge, your debt experiences negative amortization. Unpaid interest is added to your principal balance, causing the debt to grow indefinitely regardless of how many payments you make.",
    },
    {
      question: "6. How does my credit card balance affect my credit utilization score?",
      answer:
        "Credit utilization measures the percentage of your total revolving credit limit currently in use (Total Balances ÷ Total Limits). Revolving credit utilization accounts for 30% of your FICO score. Maintaining utilization below 30% is standard, but keeping it below 10% is recommended for achieving top-tier credit scores above 760.",
    },
    {
      question: "7. Why do credit card cash advances cost significantly more than purchases?",
      answer:
        "Cash advances do not have a 21-day grace period; interest begins compounding immediately upon withdrawal. Furthermore, cash advances carry higher APRs (typically 25% to 29.99%), require an upfront transaction fee of 3% to 5% (or a $10 minimum), and incur separate third-party ATM surcharges.",
    },
    {
      question: "8. How does making bi-weekly payments help pay off credit card debt faster?",
      answer:
        "Making a bi-weekly payment of half your monthly amount results in 26 half-payments per year, which equals 13 full monthly payments instead of 12. This extra payment per year directly reduces principal, accelerates debt-free timelines, and lowers the Average Daily Balance (ADB) across every billing cycle.",
    },
    {
      question: "9. Can I lower my credit card APR by negotiating directly with my card issuer?",
      answer:
        "Yes. Cardholders with an established track record of on-time payments can frequently call their card issuer's retention department to request an APR reduction, a temporary hardship plan, or a promotional interest freeze. Studies indicate over 70% of cardholders who request an APR reduction receive a 1% to 5% rate drop.",
    },
    {
      question: "10. What is a Penalty APR and how is it triggered?",
      answer:
        "A Penalty APR is a punitive interest rate (frequently 29.99%) that issuers apply when a payment is 60 or more days past due. Under the CARD Act, the issuer must review your account after 6 months of consecutive on-time payments to consider restoring your standard rate.",
    },
    {
      question: "11. When should I consider a personal consolidation loan over credit cards?",
      answer:
        "A fixed-rate personal debt consolidation loan is beneficial when you can secure an interest rate substantially lower than your current credit card APRs (e.g. 9%–13% vs. 22%–28%) and want a fixed monthly payment with an unambiguous debt-free date (typically 2 to 5 years).",
    },
    {
      question: "12. What is the credit card grace period and how do I forfeit it?",
      answer:
        "The grace period is the interval (minimum 21 days) between your statement closing date and your payment due date where no interest is charged on new purchases. If you carry any unpaid balance past the due date, you forfeit the grace period, and interest immediately accrues on all new purchases from the date of the transaction.",
    },
  ];

  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. REVOLVING CREDIT MECHANICS */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. What is Credit Card Debt? Revolving Credit Mechanics
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Credit cards represent an unsecured form of revolving consumer credit. Unlike installment loans (such as auto loans or mortgages) which have fixed principal amounts, fixed monthly payments, and a predetermined maturity date, revolving credit permits cardholders to continuously borrow against a pre-approved credit ceiling, repay part or all of the outstanding balance, and borrow again indefinitely.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-sm text-black dark:text-slate-100 block">The 21-Day Grace Period</span>
            <p className="text-black dark:text-slate-100">
              Federal law mandates a minimum 21-day grace period between the statement closing date and due date. Paying 100% of the statement balance eliminates all interest charges.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-sm text-black dark:text-slate-100 block">Forfeiting the Grace Period</span>
            <p className="text-black dark:text-slate-100">
              Carrying even a $1 balance past the due date forfeits the grace period. All subsequent purchases begin accruing interest immediately from the exact transaction date.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-sm text-black dark:text-slate-100 block">Daily Compounding (ADB)</span>
            <p className="text-black dark:text-slate-100">
              Finance charges compound daily based on your Daily Periodic Rate (APR ÷ 365) multiplied across your cumulative Average Daily Balance.
            </p>
          </div>
        </div>
      </section>

      {/* 2. AVERAGE DAILY BALANCE FORMULA */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. How Credit Card Interest is Compounded: The ADB Formula
        </h2>
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-3 text-xs font-medium">
          <p className="text-black dark:text-slate-100">
            Most credit card issuers calculate monthly finance charges using the Average Daily Balance (ADB) method:
          </p>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
            <div>1. Daily Periodic Rate (DPR) = APR ÷ 365</div>
            <div>2. Average Daily Balance (ADB) = (Sum of Daily Balances for All Days in Billing Cycle) ÷ (Days in Cycle)</div>
            <div>3. Monthly Interest Charge = ADB × DPR × (Number of Days in Billing Cycle)</div>
          </div>
        </div>
      </section>

      {/* 3. DANGERS OF MINIMUM PAYMENT TRAP */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. The Dangers of the Minimum Payment Trap Explained
        </h2>
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-3 text-xs font-medium">
          <p className="text-black dark:text-slate-100">
            Card issuers establish minimum payment formulas designed to minimize short-term default risk while maximizing lifetime interest income. Because the required payment is a percentage of the remaining balance, the dollar amount drops every single month, stretching repayment across 15 to 30 years and costing two to three times the original debt in interest.
          </p>
        </div>
      </section>

      {/* 4. STRATEGY COMPARISON */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. Debt Elimination Strategies: Avalanche vs. Snowball
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Debt Avalanche Method (Highest APR First)
            </h3>
            <p className="text-black dark:text-slate-100">
              Make minimum payments on all credit accounts, then channel every available dollar of extra budget toward the account with the <strong>highest interest rate (APR)</strong>. Provably minimizes total finance charges and eliminates debt in the fewest total months.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Debt Snowball Method (Smallest Balance First)
            </h3>
            <p className="text-black dark:text-slate-100">
              Make minimum payments on all accounts and focus extra funds on the account with the <strong>smallest balance</strong>, regardless of APR. Completely eliminating accounts quickly provides psychological motivation and momentum.
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
