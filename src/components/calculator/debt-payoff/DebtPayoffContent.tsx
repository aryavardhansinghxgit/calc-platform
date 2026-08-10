"use client";

import React, { useState } from "react";
import {
  BookOpen,
  HelpCircle,
  TrendingDown,
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

export function DebtPayoffContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the difference between Debt Avalanche and Debt Snowball?",
      answer: "Debt Avalanche orders debt elimination by highest interest rate (APR) first, mathematically minimizing total interest paid. Debt Snowball orders debts by lowest balance first, providing fast psychological wins as individual accounts reach zero balance.",
    },
    {
      question: "What is the Snowball Reallocation (Rollover) effect?",
      answer: "When you pay off Debt #1, you don't reduce your total monthly debt budget. Instead, you add Debt #1's minimum payment to the extra payment pool targeting Debt #2, accelerating payoff like a rolling snowball.",
    },
    {
      question: "Should I pay off high-interest debt or invest in stocks first?",
      answer: "Paying off high-interest consumer debt (e.g. credit cards at 18% to 29% APR) yields a guaranteed tax-free return equal to your APR. This far exceeds historical stock market returns (8% to 10%), so high-interest debt should almost always be paid off first.",
    },
    {
      question: "What is a Debt Consolidation Loan?",
      answer: "A debt consolidation loan replaces multiple high-interest debts (credit cards, store cards, personal loans) with a single new loan at a lower fixed APR and fixed monthly payment.",
    },
    {
      question: "How does Credit Counseling & Debt Management Plans (DMP) work?",
      answer: "Non-profit credit counseling agencies (approved by the U.S. Department of Justice) negotiate reduced interest rates (often 0% to 8%) with card issuers and consolidate your monthly payments into one single payment managed by the agency.",
    },
    {
      question: "What is Debt Settlement and what are the risks?",
      answer: "Debt settlement involves negotiating with creditors to settle accounts for less than full balance (often 45% to 50%). Risks include severe credit score damage, late fees during negotiation, and federal income tax liability on forgiven debt.",
    },
    {
      question: "What is Chapter 7 vs. Chapter 13 Bankruptcy?",
      answer: "Chapter 7 is liquidation bankruptcy (liquidating non-exempt assets to erase eligible debts in 3 to 6 months). Chapter 13 is wage-earner reorganization (a 3 to 5 year court-supervised repayment plan allowing you to keep property).",
    },
    {
      question: "How long does bankruptcy stay on a credit report?",
      answer: "Chapter 7 bankruptcy remains on your credit report for 10 years from the filing date. Chapter 13 bankruptcy remains for 7 years.",
    },
    {
      question: "How does paying off debt affect my credit score?",
      answer: "Paying off revolving credit card debt lowers your overall credit utilization ratio (which accounts for 30% of your FICO score), often increasing your credit score by 40 to 100+ points.",
    },
    {
      question: "What is Debt-to-Income (DTI) ratio and why is it important?",
      answer: "DTI is the percentage of your gross monthly income that goes toward monthly debt payments. Lenders require a DTI ratio below 36% to 43% for mortgage approval.",
    },
    {
      question: "Should I keep an emergency fund while paying off debt?",
      answer: "Yes. Financial experts recommend maintaining a small starter emergency fund ($1,000 to $2,000) to cover unexpected car or medical expenses without accumulating new credit card debt.",
    },
    {
      question: "Can extra annual or lump-sum payments accelerate debt payoff?",
      answer: "Yes. Directing tax refunds, annual work bonuses, or inheritance lump sums directly toward debt principal dramatically reduces total interest and cuts years off your debt-free date.",
    },
    {
      question: "What is a Balance Transfer Card?",
      answer: "A balance transfer card offers 0% introductory APR for 12 to 21 months on transferred credit card balances, allowing 100% of your payments to go toward principal reduction.",
    },
    {
      question: "Are medical debts treated differently than credit cards?",
      answer: "Yes. Major U.S. credit bureaus (Equifax, Experian, TransUnion) no longer report paid medical debt or unpaid medical debt under $500, giving consumers extra leverage to negotiate interest-free payment plans.",
    },
    {
      question: "What is a Hybrid Debt Payoff Strategy?",
      answer: "A hybrid strategy combines Snowball and Avalanche: you pay off one or two small balances first for motivation, then switch to high-APR debts to maximize mathematical interest savings.",
    },
    {
      question: "What should I do if my monthly payment is less than monthly interest?",
      answer: "If your monthly payment doesn't cover interest, your balance grows indefinitely (negative amortization). You must increase your payment, negotiate a lower rate, or seek debt counseling immediately.",
    },
    {
      question: "Do student loans qualify for Debt Avalanche?",
      answer: "Yes. Private and federal student loans can be included in your debt avalanche or snowball payoff schedule alongside credit cards and personal loans.",
    },
    {
      question: "What is the 50/30/20 Budgeting Rule?",
      answer: "The 50/30/20 rule allocates 50% of net income to Needs (rent, utilities, groceries), 30% to Wants, and 20% to Savings and Debt Elimination.",
    },
    {
      question: "Can I negotiate a lower interest rate with my credit card company?",
      answer: "Yes. Calling customer service and requesting a rate reduction based on on-time payment history or hardship programs often results in temporary or permanent APR drops.",
    },
    {
      question: "Why use an online Debt Payoff Calculator?",
      answer: "An online debt payoff calculator handles complex multi-debt interest math, compares Avalanche vs Snowball side-by-side, models payment rollover reallocation, and generates printable PDF debt-free roadmaps.",
    },
  ];

  return (
    <div className="space-y-10 mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8 text-zinc-700 dark:text-zinc-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
          <BookOpen className="h-4 w-4" /> Financial Freedom &amp; Debt Elimination Masterclass
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          The Science of Becoming Debt-Free: Strategies, Mathematics &amp; Relief
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
          Carrying multiple debts across credit cards, auto loans, personal loans, and student debt creates compounding interest drag. 
          Understanding the mathematical difference between Debt Avalanche and Debt Snowball, payment rollover reallocation, 
          consolidation loan economics, and formal relief options empowers you to achieve total financial freedom years ahead of schedule.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Section 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <TrendingDown className="h-5 w-5" /> 1. Debt Avalanche vs. Debt Snowball Comparison
            </div>
            <p>
              Both methods eliminate debt, but target different human motivators:
            </p>
            <ul className="text-xs space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>• <strong>Debt Avalanche (Highest APR First):</strong> Pays off debts starting with the highest interest rate. Mathematically minimizes interest paid and achieves debt freedom in the absolute shortest time.</li>
              <li>• <strong>Debt Snowball (Lowest Balance First):</strong> Pays off debts starting with the smallest balance. Creates quick psychological wins, building emotional momentum to stick with your plan.</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
              <Zap className="h-5 w-5" /> 2. The Snowball Payment Rollover Effect
            </div>
            <p>
              The key engine of rapid debt elimination is payment rollover reallocation:
            </p>
            <ul className="text-xs space-y-1.5 text-zinc-600 dark:text-zinc-400">
              <li>• When a debt (e.g. $150/mo minimum) is paid off to $0, <strong>do not spend that $150</strong>.</li>
              <li>• Reallocate that $150 directly into the monthly payment for your next target debt.</li>
              <li>• Your monthly debt budget remains constant while your principal reduction power compounds exponentially!</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Alternative Relief Options */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-purple-600" /> 3. Overview of Debt Relief &amp; Bankruptcy Options
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Relief Mechanism</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">How It Works</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Credit Score Impact</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Key Trade-offs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Debt Consolidation Loan</td>
                  <td className="p-3">Refinances multiple debts into 1 low-rate loan</td>
                  <td className="p-3 font-bold text-emerald-600">Positive (Lowers utilization)</td>
                  <td className="p-3 text-zinc-500">Requires good credit score (660+)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-indigo-600">Debt Management Plan (DMP)</td>
                  <td className="p-3">Non-profit agency negotiates 0%–8% interest rates</td>
                  <td className="p-3 text-amber-600 font-medium">Mild Temporary Drop</td>
                  <td className="p-3 text-zinc-500">Credit accounts closed during plan</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-amber-600">Debt Settlement</td>
                  <td className="p-3">Negotiates paying 45%–50% of balance to settle</td>
                  <td className="p-3 text-red-600 font-bold">Severe Drop (-100 to -150 pts)</td>
                  <td className="p-3 text-zinc-500">Forgiven debt is taxable income to IRS</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-red-600">Chapter 7 Bankruptcy</td>
                  <td className="p-3">Court-ordered liquidation of debts in 3–6 mos</td>
                  <td className="p-3 text-red-600 font-bold">Maximum Damage (10 yrs on report)</td>
                  <td className="p-3 text-zinc-500">May lose non-exempt personal assets</td>
                </tr>
              </tbody>
            </table>
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
