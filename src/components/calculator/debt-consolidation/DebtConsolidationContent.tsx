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
  Landmark,
} from "lucide-react";

export function DebtConsolidationContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Debt Consolidation?",
      answer: "Debt consolidation combines multiple high-interest debts (credit cards, store cards, personal loans) into a single new loan with one fixed monthly payment, ideally at a lower APR.",
    },
    {
      question: "What is Real APR (Effective APR) vs. Nominal APR?",
      answer: "Nominal APR is the advertised annual interest rate on the loan. Real APR (Effective APR) includes upfront origination fees or points amortized over the loan term, giving you the true total borrowing cost.",
    },
    {
      question: "Will consolidating my debt hurt my credit score?",
      answer: "Applying for a consolidation loan causes a temporary 3 to 5 point drop from a hard inquiry. However, paying off revolving credit cards lowers your credit utilization ratio (30% of FICO score), often raising your score by 30 to 80+ points within 60 days.",
    },
    {
      question: "What is a 0% Intro APR Balance Transfer Card?",
      answer: "A balance transfer card allows you to move existing credit card debt to a new card offering 0% APR for 12 to 21 months, usually charging an upfront 3% to 5% transfer fee.",
    },
    {
      question: "Is a Home Equity Loan (HELOC) safe for debt consolidation?",
      answer: "A HELOC offers low interest rates because your house is used as collateral. However, if you default, you risk foreclosure. Unsecured personal loans carry slightly higher interest rates but do not risk your home.",
    },
    {
      question: "What is the Origination Fee / Point threshold for consolidation?",
      answer: "Origination fees range from 1% to 8% of the loan amount. If upfront fees exceed your interest savings over the loan term, consolidating will cost you more money than keeping existing debts.",
    },
    {
      question: "What is Debt Consolidation vs. Debt Settlement?",
      answer: "Debt consolidation pays back 100% of principal at a lower interest rate, protecting your credit score. Debt settlement negotiates with creditors to pay less than balance (45%-50%), causing severe credit score damage and IRS tax liabilities.",
    },
    {
      question: "Can I consolidate federal and private student loans together?",
      answer: "Yes, via private student loan refinancing. However, refinancing federal student loans into a private consolidation loan forfeits federal benefits such as Public Service Loan Forgiveness (PSLF) and Income-Driven Repayment (IDR).",
    },
    {
      question: "What is the Debt-to-Income (DTI) ratio requirement for consolidation?",
      answer: "Most consolidation loan lenders require a Debt-to-Income (DTI) ratio under 36% to 43%, calculating total monthly debt payments divided by gross monthly income.",
    },
    {
      question: "Why does extending the loan term increase total interest?",
      answer: "Even if your monthly payment decreases significantly, stretching debt over 60 or 72 months allows interest to compound over a longer duration, often increasing total lifetime interest paid.",
    },
    {
      question: "Can I consolidate credit card debt with bad credit (below 600 FICO)?",
      answer: "Yes, but lenders may charge higher origination fees (up to 8%) and interest rates (20%+). In such cases, a non-profit Debt Management Plan (DMP) may offer lower interest rates (0%-8%) without credit approval.",
    },
    {
      question: "What is a Debt Management Plan (DMP)?",
      answer: "A DMP is administered by a non-profit credit counseling agency (e.g. NFCC). The agency negotiates reduced interest rates with your credit card companies and combines payments into one monthly draft.",
    },
    {
      question: "Should I close my credit card accounts after consolidating?",
      answer: "Generally no. Closing credit card accounts reduces your total available credit limit and shortens average credit history age, both of which lower your credit score.",
    },
    {
      question: "What is Cash-Out Refinancing for debt consolidation?",
      answer: "Cash-out refinancing replaces your existing mortgage with a larger mortgage, paying you the difference in cash to pay off high-interest consumer debt.",
    },
    {
      question: "Can medical debts be consolidated into a personal loan?",
      answer: "Yes, but medical providers often offer 0% interest monthly payment plans directly, which are cheaper than taking out a personal consolidation loan.",
    },
    {
      question: "What happens if I accumulate new credit card debt after consolidating?",
      answer: "This is known as 're-loading'. Consolidating clears your credit card balances, creating available credit. Without strict budgeting, you risk doubling your total debt load.",
    },
    {
      question: "How long does a Debt Consolidation Loan approval take?",
      answer: "Online personal loan lenders approve and fund consolidation loans in 1 to 3 business days. HELOCs and home equity loans take 2 to 4 weeks.",
    },
    {
      question: "Are consolidation loan origination fees tax deductible?",
      answer: "Origination fees on personal consolidation loans are not tax deductible. Points paid on home equity loans used to substantially improve a home may be deductible.",
    },
    {
      question: "What credit score is needed for a 0% balance transfer card?",
      answer: "Most 0% intro APR balance transfer cards require good to excellent credit scores (typically 670 to 740+ FICO).",
    },
    {
      question: "Why use an online Debt Consolidation Calculator?",
      answer: "An online debt consolidation calculator compares your current multi-debt interest against a consolidation loan, factors in origination fees, solves Real Effective APR, and checks fee sensitivity thresholds instantly.",
    },
  ];

  return (
    <div className="space-y-10 mt-8  dark:border-zinc-800 pt-8 text-zinc-700 dark:text-zinc-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
          <Landmark className="h-4 w-4" /> Debt Consolidation &amp; Refinance Masterclass
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          The Science of Debt Consolidation: Real APR, Fees &amp; Savings Math
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
          Debt consolidation simplifies high-interest credit card and loan payments into a single fixed monthly payment. 
          However, evaluating a consolidation offer requires calculating the <strong>Real APR (Effective APR)</strong> including upfront origination fees and points, 
          and checking whether term extension offsets your lower interest rate.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Section 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <TrendingDown className="h-5 w-5" /> 1. Real APR vs. Nominal APR
            </div>
            <p>
              Nominal APR is the interest rate advertised by the lender. <strong>Real APR (Effective APR)</strong> accounts for upfront origination fees or points amortized across the loan term:
            </p>
            <ul className="text-xs space-y-2 text-slate-900 dark:text-slate-100">
              <li>• <strong>Upfront Origination Fees:</strong> 1% to 8% deducted from loan proceeds or added to balance.</li>
              <li>• <strong>Fee Threshold:</strong> If upfront fees exceed total interest savings over the loan term, consolidation will cost you more money.</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <ShieldCheck className="h-5 w-5" /> 2. Secured vs. Unsecured Consolidation
            </div>
            <p>
              Choosing between personal loans and home equity options:
            </p>
            <ul className="text-xs space-y-1.5 text-slate-900 dark:text-slate-100">
              <li>• <strong>Unsecured Personal Loans:</strong> Fixed rates, no collateral required, fast funding (1-3 days).</li>
              <li>• <strong>Home Equity Loans / HELOCs:</strong> Lower APRs, but uses your home as collateral (foreclosure risk if defaulting).</li>
              <li>• <strong>0% Balance Transfer Cards:</strong> 0% APR for 12-21 months, 3%-5% fee, ideal for small balances ($3k-$15k).</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Relief Comparison Table */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">3. Comparing Financial Options
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Option</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Typical APR</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Credit Score Impact</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Best For</th>
                </tr>
              </thead>
              <tbody className=" dark:divide-zinc-800">
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Personal Consolidation Loan</td>
                  <td className="p-3">6.99% – 19.99%</td>
                  <td className="p-3 font-bold text-blue-600">Positive (+30 to +80 pts)</td>
                  <td className="p-3 text-slate-900">Good credit (660+), fixed monthly budget</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">0% Balance Transfer Card</td>
                  <td className="p-3">0% (12-21 mos)</td>
                  <td className="p-3 font-bold text-blue-600">Positive (Lowers utilization)</td>
                  <td className="p-3 text-slate-900">Excellent credit (700+), aggressive 1-2 yr payoff</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Debt Management Plan (DMP)</td>
                  <td className="p-3">0% – 8%</td>
                  <td className="p-3 text-blue-600 font-medium">Mild Drop (Accounts closed)</td>
                  <td className="p-3 text-slate-900">Fair/Poor credit (below 640), structured counseling</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-red-600">Debt Settlement</td>
                  <td className="p-3">Settles 45%-50% bal</td>
                  <td className="p-3 text-red-600 font-bold">Severe Drop (-100 to -150 pts)</td>
                  <td className="p-3 text-slate-900">Severe financial hardship, alternative to bankruptcy</td>
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
          <h3 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
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
                  <div className="p-4 pt-0 text-xs text-slate-900 dark:text-slate-100  dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 leading-relaxed">
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
