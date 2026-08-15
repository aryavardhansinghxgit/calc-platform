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
} from "lucide-react";

export function CreditCardContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is a credit card and how does revolving credit work?",
      answer: "A credit card is a financial payment card issued by banks that provides a revolving line of credit. Cardholders can borrow funds up to an approved credit limit to make purchases or cash advances. If the full balance is paid off before the statement due date, no interest is charged.",
    },
    {
      question: "What is Annual Percentage Rate (APR) on credit cards?",
      answer: "APR is the annualized interest rate charged on unpaid credit card balances carried past the grace period. Credit card APRs are typically variable rates tied to the U.S. Prime Rate (ranging from 14% to 29.99%).",
    },
    {
      question: "How is monthly credit card interest calculated?",
      answer: "Most credit card issuers use the Average Daily Balance (ADB) method: Daily Periodic Rate (DPR) = APR / 365. Monthly Interest = DPR × Average Daily Balance × Number of Days in Billing Cycle.",
    },
    {
      question: "Why does paying only the minimum monthly payment take so long?",
      answer: "Minimum monthly payments are calculated as a small percentage of your balance (usually 1% to 2% plus interest). As your balance decreases, the minimum payment shrinks, causing most of your payment to go toward interest rather than principal reduction.",
    },
    {
      question: "What is a 0% Intro APR Balance Transfer Card?",
      answer: "A balance transfer credit card allows you to move high-interest debt from existing cards to a new card offering a 0% introductory APR for 12 to 21 months. A one-time balance transfer fee (typically 3% to 5%) applies.",
    },
    {
      question: "What is the difference between Debt Avalanche and Debt Snowball?",
      answer: "Debt Avalanche pays off debts in order of highest APR first, mathematically minimizing total interest paid. Debt Snowball pays off debts from smallest balance to largest balance, building psychological momentum.",
    },
    {
      question: "What happens if I miss a credit card payment?",
      answer: "Missing a payment incurs a late payment fee (up to $41), triggers a penalty APR (up to 29.99%), and if overdue by 30+ days, is reported to major credit bureaus, dropping your FICO score by 60 to 110 points.",
    },
    {
      question: "What is credit utilization ratio and why does it matter?",
      answer: "Credit utilization is the percentage of your total available credit limit that you are currently using. Keeping total credit utilization below 30% (ideally under 10%) is critical for maintaining a high credit score.",
    },
    {
      question: "How does a credit card grace period work?",
      answer: "The grace period is the window (typically 21 to 25 days) between your statement closing date and your payment due date. If you paid your previous monthly statement balance in full, new purchases incur zero interest during this grace period.",
    },
    {
      question: "What is the Fair Credit Billing Act (FCBA) fraud protection?",
      answer: "Under federal FCBA law, your maximum legal liability for unauthorized fraudulent charges on a stolen credit card is $50. Most major card issuers provide 0% fraud liability guarantees.",
    },
    {
      question: "What is a Cash Advance on a credit card?",
      answer: "A cash advance allows you to withdraw physical cash using your credit card at an ATM or bank branch. Cash advances carry higher APRs, have NO grace period (interest begins compounding immediately), and incur cash advance fees (3% to 5%).",
    },
    {
      question: "What is a Secured Credit Card?",
      answer: "A secured credit card requires a refundable cash security deposit (e.g. $200) that serves as your credit limit. It is designed for individuals with poor or limited credit history to rebuild their credit score.",
    },
    {
      question: "What is the difference between a Credit Card and a Charge Card?",
      answer: "Credit cards allow you to carry a revolving balance month-to-month with interest charges. Charge cards (like traditional Amex cards) require the full statement balance to be paid in full every month with no preset spending limit.",
    },
    {
      question: "How much extra should I pay each month to pay off debt faster?",
      answer: "Adding even $50 to $100 per month above your minimum payment can shave years off your payoff timeline and save thousands of dollars in compounding interest.",
    },
    {
      question: "Is a Personal Loan better than a Credit Card for debt consolidation?",
      answer: "Fixed-rate personal loans usually offer significantly lower APRs (6% to 14%) than credit cards (18% to 28%) and have fixed payoff dates (2 to 5 years), making them an effective consolidation tool.",
    },
    {
      question: "What is the Average Daily Balance (ADB) interest formula?",
      answer: "ADB = (Sum of daily balances during billing cycle) / (Number of days in billing cycle). Monthly Interest = ADB × (APR / 365) × Days.",
    },
    {
      question: "Does closing an unused credit card hurt your credit score?",
      answer: "Yes. Closing a credit card reduces your total available credit limit (raising your credit utilization ratio) and eventually shortens your average age of credit accounts.",
    },
    {
      question: "What are credit card rewards, cashback, and points?",
      answer: "Card issuers pass back a portion of merchant interchange fees to cardholders as cashback (1% to 5%), travel miles, or rewards points on eligible purchases.",
    },
    {
      question: "How do I negotiate a lower credit card APR with my bank?",
      answer: "Call your card issuer's customer service, highlight your consistent on-time payment history, mention competing card offers, and politely request a reduced interest rate.",
    },
    {
      question: "Why should I use an online Credit Card Payoff Calculator?",
      answer: "An online payoff calculator simulates exact payoff dates, calculates total interest costs under different payment strategies, models balance transfers, and generates printable PDF debt elimination plans.",
    },
  ];

  return (
    <div className="space-y-10 mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8 text-zinc-700 dark:text-zinc-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
          <BookOpen className="h-4 w-4" /> Debt Elimination &amp; Credit Masterclass
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          Mastering Credit Card Payoff: APR Calculations, Strategies &amp; Balance Transfers
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
          Credit cards are the most accessible revolving credit instruments in modern finance, but carrying a balance at double-digit APRs 
          can create compounding debt traps. Understanding Daily Periodic Rates (DPR), minimum payment rules, balance transfer mechanics, 
          and debt acceleration methods (Avalanche vs. Snowball) is the fastest path to financial freedom.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Section 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <CardIcon className="h-5 w-5" /> 1. How Credit Card Interest Compound Mechanics Work
            </div>
            <p>
              Credit card interest is compounded daily using the <strong>Average Daily Balance (ADB)</strong> method:
            </p>
            <ul className="text-xs space-y-2 text-zinc-600 dark:text-zinc-400 font-sans tabular-nums bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <li>• <strong>Daily Periodic Rate (DPR):</strong> DPR = APR / 365</li>
              <li>• <strong>Average Daily Balance (ADB):</strong> Sum of Daily Balances / Days in Cycle</li>
              <li>• <strong>Monthly Interest Charged:</strong> Interest = DPR × ADB × Days in Billing Cycle</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
              <Zap className="h-5 w-5" /> 2. Debt Avalanche vs. Debt Snowball Method
            </div>
            <p>
              When tackling credit card debt, choose between mathematical optimization or psychological momentum:
            </p>
            <ul className="text-xs space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>• <strong>Debt Avalanche (Highest APR First):</strong> Pay minimums on all cards, then throw extra cash at the card with the highest interest rate. Mathematically minimizes total interest paid.</li>
              <li>• <strong>Debt Snowball (Lowest Balance First):</strong> Pay off the card with the smallest balance first for quick psychological wins, building momentum as accounts reach $0 balance.</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Credit Card Types Matrix */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-600" /> 3. Types of Credit Cards Comparison Matrix
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Card Category</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Typical APR Range</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Primary Features / Benefits</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Best Suited For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Balance Transfer Card</td>
                  <td className="p-3 font-sans tabular-nums">0% Intro APR (12–21 mos), then 18%–28%</td>
                  <td className="p-3">0% interest period; 3%–5% transfer fee</td>
                  <td className="p-3 font-medium">Consolidating high-interest debt</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-indigo-600">Cashback Rewards Card</td>
                  <td className="p-3 font-sans tabular-nums">18% – 26%</td>
                  <td className="p-3">1.5% to 5% cash rebates on purchases</td>
                  <td className="p-3 font-medium">Cardholders who pay balance in full monthly</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-emerald-600">Secured Credit Card</td>
                  <td className="p-3 font-sans tabular-nums">22% – 29%</td>
                  <td className="p-3">Requires cash deposit equal to credit limit</td>
                  <td className="p-3 font-medium">Rebuilding bad credit or zero credit history</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-amber-600">Travel Rewards Card</td>
                  <td className="p-3 font-sans tabular-nums">20% – 28%</td>
                  <td className="p-3">Airline miles, hotel upgrades, lounge access</td>
                  <td className="p-3 font-medium">Frequent travelers who pay monthly in full</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-World Advantages & Disadvantages */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Award className="h-5 w-5 text-indigo-600" /> Advantages vs. Disadvantages of Credit Cards
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2 p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-emerald-900 dark:text-emerald-200 block">Advantages</span>
              <ul className="space-y-1 text-zinc-600 dark:text-zinc-300">
                <li>• Federal FCBA fraud protection ($50 max legal liability).</li>
                <li>• Complimentary rental car collision insurance &amp; trip protection.</li>
                <li>• Earn 1.5% to 5% cashback or travel points on spending.</li>
                <li>• Build positive credit history &amp; higher FICO credit scores.</li>
              </ul>
            </div>
            <div className="space-y-2 p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <span className="font-bold text-amber-900 dark:text-amber-200 block">Disadvantages &amp; Risks</span>
              <ul className="space-y-1 text-zinc-600 dark:text-zinc-300">
                <li>• High compounding interest rates (18% to 29.99% APR).</li>
                <li>• Minimum payment traps extending debt for 10 to 20+ years.</li>
                <li>• Late payment penalties ($41 fee + 30-day credit score impact).</li>
                <li>• Risk of impulsive spending and over-indebtedness.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 20 SEO FAQs Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 flex items-center justify-between font-semibold text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold min-w-[20px]">
                      Q{index + 1}.
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
