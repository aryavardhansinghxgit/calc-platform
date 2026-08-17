"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  Calculator,
  TrendingDown,
  Percent,
  CheckCircle2,
  DollarSign,
  CalendarCheck,
  Building,
  ArrowRight,
} from "lucide-react";

export function AmortizationContentSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is loan amortization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Amortization is the process of spreading out a loan into a series of equal periodic payments over a fixed term. Each payment covers both interest charges and principal balance reduction."
        }
      },
      {
        "@type": "Question",
        "name": "How does extra principal payment shorten an amortization schedule?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Extra principal payments go 100% toward reducing the remaining loan principal. Because monthly interest is calculated on the remaining balance, reducing principal faster lowers compounding interest and accelerates your payoff date."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between an amortization schedule and a regular payment list?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An amortization schedule details the exact breakdown of every payment into principal reduction, interest paid, beginning balance, and ending balance for every period throughout the loan term."
        }
      },
      {
        "@type": "Question",
        "name": "Can I amortize a loan with variable interest rates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, but when interest rates fluctuate on variable or adjustable-rate loans (ARMs), the monthly payment and schedule must be recalculated at each rate adjustment period."
        }
      }
    ]
  };

  return (
    <div className="space-y-10 py-4 text-zinc-700 dark:text-zinc-300">
      {/* FAQ Schema Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Internal Links Quick Navigation Header */}
      <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-200 flex items-center gap-1.5">Related Financial Calculators
        </h4>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/mortgage-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-zinc-700 font-medium transition-colors"
          >
            Mortgage Calculator
          </Link>
          <Link
            href="/calculators/loan-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-zinc-700 font-medium transition-colors"
          >
            Loan Calculator
          </Link>
          <Link
            href="/calculators/emi-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-zinc-700 font-medium transition-colors"
          >
            EMI Calculator
          </Link>
          <Link
            href="/calculators/interest-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-zinc-700 font-medium transition-colors"
          >
            Interest Calculator
          </Link>
          <Link
            href="/calculators/auto-loan-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-zinc-700 font-medium transition-colors"
          >
            Auto Loan Calculator
          </Link>
          <Link
            href="/calculators/personal-loan-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-zinc-700 font-medium transition-colors"
          >
            Personal Loan Calculator
          </Link>
        </div>
      </div>

      {/* 1. What is Amortization */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">1. What is Amortization?
        </h2>
        <p className="text-sm leading-relaxed">
          <strong>Amortization</strong> is an accounting and financial concept that describes the step-by-step liquidation of a financial obligation or asset over time according to a predefined schedule. In personal finance and lending, loan amortization refers to paying off a debt (such as a mortgage, auto loan, or personal loan) through regular, equal monthly installments over a specified duration.
        </p>
        <p className="text-sm leading-relaxed">
          Unlike interest-only loans or balloon-payment mortgages—where borrowers pay only interest charges during the term and owe a giant lump sum at the end—an <strong>amortized loan</strong> ensures that every single payment you make contributes both to paying off accrued interest and to reducing the underlying debt principal. By the time you make your final scheduled payment, your remaining balance is exactly <strong>$0.00</strong>.
        </p>
      </section>

      {/* 2. How Amortization Works */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">2. How Amortization Works
        </h2>
        <p className="text-sm leading-relaxed">
          The mechanics of amortization are governed by compounding mathematical principles. Although your total monthly payment remains constant on a fixed-rate loan, the internal composition of that payment shifts dramatically over the life of the loan:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">Early Loan Years (Interest-Heavy)
            </h3>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
              Because your starting principal balance is at its absolute highest, the interest owed each month is large. Consequently, in the early years of a 15-year or 30-year loan, <strong>60% to 80% of your monthly payment goes toward interest</strong>, while only a small fraction pays down principal.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">Later Loan Years (Principal-Heavy)
            </h3>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
              As principal is gradually paid off, the outstanding balance decreases. Since interest is calculated only on the remaining balance, monthly interest charges plummet. In the final years, <strong>90%+ of your payment goes directly toward principal equity</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Principal vs Interest */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">3. Principal vs Interest Breakdown
        </h2>
        <p className="text-sm leading-relaxed">
          Understanding the distinction between <strong>Principal</strong> and <strong>Interest</strong> is critical for strategic financial planning:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm pl-2">
          <li>
            <strong>Loan Principal:</strong> The actual capital borrowed from the financial institution. Reducing principal builds net worth and equity in property.
          </li>
          <li>
            <strong>Loan Interest:</strong> The fee or cost charged by the lender for renting their money. Interest is an expense that builds no equity for the borrower.
          </li>
        </ul>
      </section>

      {/* 4. Amortization Formula */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">4. The Mathematical Amortization Formula
        </h2>
        <p className="text-sm leading-relaxed">
          The monthly payment on a standard amortized loan is computed using the standard Annuity Payment formula:
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums text-xs sm:text-sm text-center border border-zinc-800 shadow-md">
          PMT = P × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <strong>PMT:</strong> Total Fixed Monthly Payment
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <strong>P:</strong> Principal Loan Amount ($)
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <strong>r:</strong> Monthly Interest Rate (Annual Rate / 12)
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <strong>n:</strong> Total Number of Monthly Payments (Years × 12)
          </div>
        </div>
      </section>

      {/* 5. Extra Payments Explained */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">5. Extra Payments Explained
        </h2>
        <p className="text-sm leading-relaxed">
          When you make an <strong>extra principal payment</strong>—whether monthly, annually, or as a single one-time lump sum—the entirety of that extra money is applied directly to reducing your principal balance.
        </p>
        <p className="text-sm leading-relaxed">
          Because interest in subsequent months is calculated on a lower remaining balance, extra payments trigger a powerful compounding domino effect: you pay significantly less interest every remaining month, and your loan reaches full payoff months or years ahead of schedule.
        </p>
      </section>

      {/* 6. Benefits of Early Payoff */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">6. Key Benefits of Early Loan Payoff
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Massive Interest Savings</h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Paying off a 30-year $300,000 mortgage just 5 years early can save over $70,000 in interest charges.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Rapid Equity Growth</h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Accelerating principal payments builds home equity, increasing your financial safety net and borrowing power.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Financial Peace of Mind</h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Becoming completely debt-free reduces monthly overhead, freeing up cash flow for investments or retirement.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Fixed vs Variable Loans */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">7. Fixed-Rate vs. Variable-Rate Amortization
        </h2>
        <p className="text-sm leading-relaxed">
          On a <strong>fixed-rate loan</strong>, the interest rate and monthly payment remain static for the entire loan life. On a <strong>variable-rate (ARM) loan</strong>, interest rates adjust periodically based on market benchmarks (such as SOFR), causing the required monthly payment to adjust up or down.
        </p>
      </section>

      {/* 8. Amortization Schedule Guide */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">8. How to Read Your Amortization Schedule
        </h2>
        <p className="text-sm leading-relaxed">
          Your amortization schedule is divided into standard columns:
        </p>
        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div><strong>Payment Number:</strong> Sequential month index (1, 2, 3... N).</div>
            <div><strong>Payment Date:</strong> Expected calendar date of payment.</div>
            <div><strong>Beginning Balance:</strong> Remaining principal owed before payment.</div>
            <div><strong>Payment Amount:</strong> Total out-of-pocket payment amount.</div>
            <div><strong>Principal Paid:</strong> Dollar amount reducing loan principal.</div>
            <div><strong>Interest Paid:</strong> Dollar amount covering interest expense.</div>
            <div><strong>Ending Balance:</strong> Principal balance remaining after payment.</div>
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">9. Frequently Asked Questions (FAQ)
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">
              What is loan amortization?
            </h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Amortization is the process of spreading out a loan into a series of equal periodic payments over a fixed term. Each payment covers both interest charges and principal balance reduction.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">
              How does an extra principal payment shorten an amortization schedule?
            </h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Extra principal payments go 100% toward reducing the remaining loan principal. Because monthly interest is calculated on the remaining balance, reducing principal faster lowers compounding interest and accelerates your payoff date.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">
              What is the difference between an amortization schedule and a regular payment list?
            </h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              An amortization schedule details the exact breakdown of every payment into principal reduction, interest paid, beginning balance, and ending balance for every period throughout the loan term.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">
              Can I amortize a loan with variable interest rates?
            </h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Yes, but when interest rates fluctuate on variable or adjustable-rate loans (ARMs), the monthly payment and schedule must be recalculated at each rate adjustment period.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Links Footer Grid */}
      <div className="pt-6  dark:border-zinc-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
          Explore Other Financial Tools on CalcPlatform
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <Link
            href="/calculators/mortgage-calculator"
            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between group transition-colors"
          >
            <span>Mortgage Calculator</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-500" />
          </Link>
          <Link
            href="/calculators/loan-calculator"
            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between group transition-colors"
          >
            <span>Loan Calculator</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-500" />
          </Link>
          <Link
            href="/calculators/emi-calculator"
            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between group transition-colors"
          >
            <span>EMI Calculator</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-500" />
          </Link>
          <Link
            href="/calculators/interest-calculator"
            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between group transition-colors"
          >
            <span>Interest Calculator</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-500" />
          </Link>
          <Link
            href="/calculators/auto-loan-calculator"
            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between group transition-colors"
          >
            <span>Auto Loan Calculator</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-500" />
          </Link>
          <Link
            href="/calculators/personal-loan-calculator"
            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between group transition-colors"
          >
            <span>Personal Loan Calculator</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AmortizationContentSection;
