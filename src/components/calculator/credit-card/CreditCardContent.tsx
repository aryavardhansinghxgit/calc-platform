"use client";

import React, { useState } from "react";
import {
  BookOpen,
  HelpCircle,
  CreditCard as CardIcon,
  DollarSign,
  PieChart as PieIcon,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Award,
  Clock,
  Layers,
  Globe,
  Lock,
  Target,
} from "lucide-react";

export function CreditCardContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
    <div className="space-y-6 text-black dark:text-zinc-100 font-sans leading-relaxed">
      {/* SECTION 1: INTRODUCTION & REVOLVING CREDIT MECHANICS */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 p-5 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-black dark:text-zinc-100">
          What is Credit Card Debt? How Revolving Credit Works
        </h2>
        <p className="text-sm text-black dark:text-zinc-200">
          Credit cards represent an unsecured form of revolving consumer credit. Unlike installment loans (such as auto loans or mortgages) which have fixed principal amounts, fixed monthly payments, and a predetermined maturity date, revolving credit permits cardholders to continuously borrow against a pre-approved credit ceiling, repay part or all of the outstanding balance, and borrow again indefinitely.
        </p>
        <p className="text-sm text-black dark:text-zinc-200">
          When cardholders carry an unpaid balance past their monthly due date, the credit card issuer levies finance charges based on the Annual Percentage Rate (APR). Because credit card debt is unsecured—meaning no physical collateral guarantees the loan—issuers offset default risk by charging substantially higher interest rates (typically 18% to 29.99%) than secured lending products.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">The 21-Day Grace Period</h3>
            <p className="text-xs text-black dark:text-zinc-300">
              Federal law mandates a minimum 21-day grace period between the statement closing date and due date. Paying 100% of the statement balance eliminates all interest charges.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">Forfeiting the Grace Period</h3>
            <p className="text-xs text-black dark:text-zinc-300">
              Carrying even a $1 balance past the due date forfeits the grace period. All subsequent purchases begin accruing interest immediately from the exact transaction date.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">Daily Compounding (ADB)</h3>
            <p className="text-xs text-black dark:text-zinc-300">
              Finance charges compound daily based on your Daily Periodic Rate (APR ÷ 365) multiplied across your cumulative Average Daily Balance.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: HOW CREDIT CARD INTEREST IS CALCULATED (AVERAGE DAILY BALANCE) */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 p-5 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-black dark:text-zinc-100">
          How Credit Card Interest is Compounded: The Average Daily Balance Formula
        </h2>
        <p className="text-sm text-black dark:text-zinc-200">
          Most credit card issuers calculate monthly finance charges using the Average Daily Balance (ADB) method. Rather than calculating interest on the beginning or ending monthly balance alone, the issuer tracks your precise balance on each individual day of the billing cycle.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2 text-black dark:text-zinc-200">
          <div className="font-bold font-sans text-sm text-black dark:text-zinc-100">Mathematical Formulas:</div>
          <div>1. Daily Periodic Rate (DPR) = APR ÷ 365</div>
          <div>2. Average Daily Balance (ADB) = (Sum of Daily Balances for All Days in Billing Cycle) ÷ (Days in Cycle)</div>
          <div>3. Monthly Interest Charge = ADB × DPR × (Number of Days in Billing Cycle)</div>
        </div>

        <p className="text-sm text-black dark:text-zinc-200">
          <strong>Step-by-Step Numerical Example:</strong> Assume you carry a credit card with an 18% APR (DPR = 0.18 ÷ 365 = 0.00049315) across a 30-day billing cycle:
        </p>
        <ul className="list-disc pl-5 text-xs text-black dark:text-zinc-300 space-y-1 font-mono">
          <li>Days 1 to 15 (15 days): Ending balance is $5,000 → Sum = 15 × $5,000 = $75,000</li>
          <li>Day 16: You make a $1,000 payment, reducing balance to $4,000</li>
          <li>Days 16 to 30 (15 days): Ending balance is $4,000 → Sum = 15 × $4,000 = $60,000</li>
          <li>Total Cumulative Daily Balance = $75,000 + $60,000 = $135,000</li>
          <li>Average Daily Balance (ADB) = $135,000 ÷ 30 = $4,500</li>
          <li>Monthly Interest Charge = $4,500 × 0.00049315 × 30 = <strong>$66.58</strong></li>
        </ul>
      </div>

      {/* SECTION 3: THE MINIMUM PAYMENT TRAP */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 p-5 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-black dark:text-zinc-100">
          The Dangers of the Minimum Payment Trap Explained
        </h2>
        <p className="text-sm text-black dark:text-zinc-200">
          Card issuers establish minimum payment formulas designed to minimize short-term default risk while maximizing lifetime interest income. Standard issuer minimum formulas require the greater of:
        </p>
        <ul className="list-disc pl-5 text-xs text-black dark:text-zinc-300 space-y-1">
          <li><strong>Formula A:</strong> 1% of the current principal balance + accrued monthly interest charges + any late fees.</li>
          <li><strong>Formula B:</strong> 2.0% to 2.5% of the total statement balance.</li>
          <li><strong>Floor Amount:</strong> A minimum floor of $25.00 to $35.00 (or the full balance if less than the floor).</li>
        </ul>
        <p className="text-sm text-black dark:text-zinc-200">
          <strong>Why the Minimum Payment Trap is Asymptotic:</strong> Because the required payment is a percentage of the remaining balance, the dollar amount required drops every single month. In the early years, nearly 85% of your payment is consumed by interest, leaving only a tiny fraction to reduce principal. Repayment stretches across 15 to 30 years, costing thousands more than the original purchases.
        </p>
      </div>

      {/* SECTION 4: DEBT ELIMINATION STRATEGIES (AVALANCHE VS SNOWBALL) */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 p-5 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-black dark:text-zinc-100">
          Debt Elimination Strategies: Debt Avalanche vs. Debt Snowball
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-sm text-black dark:text-zinc-100 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-600" /> 1. The Debt Avalanche Method (Lowest Total Interest)
            </h3>
            <p className="text-xs text-black dark:text-zinc-300">
              Under the Debt Avalanche method, you make minimum payments on all credit accounts, then channel every available dollar of your extra budget toward the account with the <strong>highest interest rate (APR)</strong>.
            </p>
            <p className="text-xs text-black dark:text-zinc-300">
              <strong>Mathematical Advantage:</strong> This is provably the optimal strategy for minimizing total finance charges and eliminating debt in the fewest total months.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-sm text-black dark:text-zinc-100 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-600" /> 2. The Debt Snowball Method (Psychological Momentum)
            </h3>
            <p className="text-xs text-black dark:text-zinc-300">
              Under the Debt Snowball method, you make minimum payments on all accounts and focus extra funds on the account with the <strong>smallest balance</strong>, regardless of APR.
            </p>
            <p className="text-xs text-black dark:text-zinc-300">
              <strong>Behavioral Advantage:</strong> Completely eliminating accounts quickly provides psychological motivation and reduces the cognitive overload of managing multiple monthly bills.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: WORKED MATHEMATICAL CASE STUDIES */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 p-5 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-black dark:text-zinc-100">
          Worked Mathematical Examples: $6,000 Balance @ 21.99% APR
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">Scenario A: Fixed $200 Monthly Payment</h3>
            <div className="font-mono text-xs text-black dark:text-zinc-300 space-y-1">
              <div>Balance (B) = $6,000 | APR = 21.99% (i = 0.018325/mo)</div>
              <div>Fixed Monthly Payment (PMT) = $200.00</div>
              <div>Logarithmic Payoff Formula:</div>
              <div>N = -ln(1 - (B × i)/PMT) ÷ ln(1 + i)</div>
              <div>N = -ln(1 - 0.54975) ÷ ln(1.018325) = <strong>44 Months (3.7 Years)</strong></div>
              <div>Total Interest Paid = <strong>$2,787.21</strong></div>
              <div>Total Repaid = <strong>$8,787.21</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase text-black dark:text-zinc-100">Scenario B: Minimum Payments Only</h3>
            <div className="font-mono text-xs text-black dark:text-zinc-300 space-y-1">
              <div>Formula = Monthly Interest + 1% Balance (Floor: $25)</div>
              <div>Month 1 Payment = $109.95 + $60.00 = $169.95</div>
              <div>Month 60 Payment = $62.30</div>
              <div>Month 120 Payment = $31.80</div>
              <div>Total Payoff Time = <strong>214 Months (17.8 Years)</strong></div>
              <div>Total Interest Paid = <strong>$7,642.10</strong></div>
              <div>Total Repaid = <strong>$13,642.10</strong> (Over 2.2× original principal!)</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6: 12 SIMPLE, RELEVANT, MOST-SEARCHED FAQS (STRICTLY IN BLACK) */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 p-5 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-black dark:text-zinc-100 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-black dark:text-zinc-100" />
          Frequently Asked Questions (12 Key Credit Card Payoff FAQs)
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800/50"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full px-4 py-3 text-left font-bold text-xs sm:text-sm text-black dark:text-zinc-100 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span>{faq.question}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-4 h-4 text-black dark:text-zinc-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-black dark:text-zinc-400 shrink-0" />
                )}
              </button>

              {openFaq === index && (
                <div className="px-4 pb-3.5 pt-1 text-xs text-black dark:text-zinc-200 border-t border-slate-200/60 dark:border-slate-700/60">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
