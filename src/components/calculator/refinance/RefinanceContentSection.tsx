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
  AlertTriangle,
  Building,
  ArrowRight,
  ShieldCheck,
  Zap,
  RefreshCw,
  CreditCard,
  Car,
  GraduationCap,
  FileText,
  Clock,
} from "lucide-react";

export function RefinanceContentSection() {
  const faqList = [
    {
      question: "What is loan refinancing?",
      answer: "Loan refinancing involves replacing an existing debt obligation with a new loan under different terms, interest rates, or repayment schedules. The new loan pays off the old balance completely."
    },
    {
      question: "How is the refinance break-even period calculated?",
      answer: "The break-even period is calculated by dividing total upfront refinancing costs (closing fees, appraisal fees, origination points) by your monthly payment savings. For example, $3,000 in closing costs with a $100/mo payment savings yields a 30-month break-even."
    },
    {
      question: "What is the difference between Rate-and-Term and Cash-Out refinancing?",
      answer: "Rate-and-Term refinancing alters your interest rate, loan duration, or monthly payment without increasing the principal loan balance. Cash-Out refinancing borrows a larger loan balance than what you owe, paying off the existing debt and providing the remaining difference to you in cash."
    },
    {
      question: "What closing costs are associated with refinancing a mortgage?",
      answer: "Refinancing closing costs typically range from 2% to 5% of the loan amount, including application fees, home appraisal, title search and title insurance, lender origination fees, recording fees, and document preparation fees."
    },
    {
      question: "Are mortgage discount points worth buying during a refinance?",
      answer: "Mortgage discount points allow you to pay upfront fees (1 point = 1% of loan amount) in exchange for a permanently lower interest rate. Points are beneficial if you intend to stay in the home longer than the point break-even period."
    },
    {
      question: "Does refinancing lower my credit score?",
      answer: "Refinancing may temporarily lower your credit score by 5 to 10 points due to the lender's hard credit inquiry and closing the old credit account. However, your score typically recovers quickly as you make on-time payments on the new loan."
    },
    {
      question: "Can I refinance a mortgage with low or zero home equity?",
      answer: "Most conventional refinances require at least 20% equity to avoid Private Mortgage Insurance (PMI). However, government-backed programs like FHA Streamline or VA Interest Rate Reduction Refinance Loans (IRRRL) allow zero or low-equity refinancing."
    },
    {
      question: "Should I refinance from a 30-year to a 15-year mortgage?",
      answer: "Refinancing to a 15-year mortgage significantly lowers your interest rate and saves tens of thousands in lifetime interest, but results in higher required monthly payments."
    },
    {
      question: "How does refinancing affect my income taxes?",
      answer: "Interest paid on refinanced mortgage loans up to $750,000 remains tax-deductible if used to buy, build, or substantially improve your home. Closing costs generally cannot be deducted immediately but may be amortized over the loan life."
    },
    {
      question: "When is refinancing NOT recommended?",
      answer: "Refinancing is not recommended if you plan to move before reaching your break-even point, if closing costs exceed lifetime interest savings, or if extending the loan duration increases total lifetime interest paid despite lower monthly payments."
    },
    {
      question: "Can I refinance auto loans or student loans?",
      answer: "Yes! Refinancing auto or student loans with a lower interest rate or shorter tenure reduces monthly payments and total borrowing costs without incurring heavy real estate closing fees."
    },
    {
      question: "What is a No-Closing-Cost Refinance?",
      answer: "A no-closing-cost refinance absorbs upfront closing fees by building them into the principal loan balance or offering a slightly higher interest rate in exchange for lender credits."
    },
    {
      question: "How does debt consolidation refinancing work?",
      answer: "Debt consolidation refinancing combines high-interest debts (credit cards, personal loans, car loans) into a single mortgage or personal refinance loan with a much lower interest rate, reducing total monthly debt payments."
    },
    {
      question: "What credit score is needed to refinance a mortgage?",
      answer: "Conventional mortgage refinances typically require a credit score of 620+, while FHA refinances accept scores down to 580 (or 500 with higher equity). Premium interest rates require 740+."
    }
  ];

  // 1. FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  // 2. Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://calcplatform.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Finance",
        "item": "https://calcplatform.com/category/finance"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Refinance Calculator",
        "item": "https://calcplatform.com/calculators/refinance-calculator"
      }
    ]
  };

  // 3. FinancialService Schema
  const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "CalcPlatform Refinancing Advisory",
    "description": "Comprehensive loan refinancing comparison tool evaluating monthly savings, interest reduction, closing costs, and break-even timelines."
  };

  // 4. WebApplication Schema
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcPlatform Refinance Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="space-y-10 py-4 text-zinc-700 dark:text-zinc-300">
      {/* Inject Structured Data Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(financialServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      {/* Internal Links Header Banner */}
      <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-200 flex items-center gap-1.5">Related Refinancing & Loan Calculators
        </h4>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/mortgage-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Mortgage Calculator
          </Link>
          <Link
            href="/calculators/mortgage-payoff-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Mortgage Payoff Calculator
          </Link>
          <Link
            href="/calculators/amortization-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Amortization Calculator
          </Link>
          <Link
            href="/calculators/loan-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Loan Calculator
          </Link>
          <Link
            href="/calculators/personal-loan-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Personal Loan Calculator
          </Link>
          <Link
            href="/calculators/student-loan-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Student Loan Calculator
          </Link>
        </div>
      </div>

      {/* 1. What Is Loan Refinancing */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">1. What Is Loan Refinancing?
        </h2>
        <p className="text-sm leading-relaxed">
          <strong>Loan Refinancing</strong> involves taking out a brand-new loan to replace an existing debt obligation. Terms and conditions of refinancing vary widely depending on whether you are refinancing a home mortgage, car loan, student loan, or personal credit card debt. In a successful refinance, the new loan completely pays off the old balance, allowing you to secure a lower interest rate, change loan duration, or tap into accumulated equity.
        </p>
      </section>

      {/* 2. Reasons To Refinance */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">2. Top Reasons to Refinance a Loan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 block">• Save Money</strong>
            <p className="text-slate-900 dark:text-slate-100">Reduce total lifetime borrowing costs by locking in a lower annual interest rate.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 block">• Lower Interest Rate</strong>
            <p className="text-slate-900 dark:text-slate-100">Capitalize on market interest rate drops or an upgraded personal credit score.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 block">• Need Cash (Cash-Out)</strong>
            <p className="text-slate-900 dark:text-slate-100">Convert home equity into lump-sum cash for home improvements or medical expenses.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 block">• Lower Monthly Payment</strong>
            <p className="text-slate-900 dark:text-slate-100">Extend your loan term to reduce immediate monthly out-of-pocket cash demands.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 block">• Shorten Loan Term</strong>
            <p className="text-slate-900 dark:text-slate-100">Switch from a 30-year to a 15-year mortgage to pay off debt years faster.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 block">• Consolidate Debt</strong>
            <p className="text-slate-900 dark:text-slate-100">Combine high-interest credit cards and personal loans into one low-interest mortgage.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1 sm:col-span-2">
            <strong className="text-blue-600 dark:text-blue-400 block">• Switch Variable to Fixed Rate</strong>
            <p className="text-slate-900 dark:text-slate-100">Convert an unpredictable Adjustable-Rate Mortgage (ARM) into a stable fixed monthly payment.</p>
          </div>
        </div>
      </section>

      {/* 3. Mortgage Refinancing Options */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">3. Mortgage Refinancing Types Explained
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Rate & Term Refinance</h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Adjusts your interest rate, loan duration, or monthly payment without altering your principal balance.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Cash-Out Refinance</h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Borrows more than you owe on your current home mortgage, providing the excess equity difference in cash.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Cash-In Refinance</h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Pays down principal upfront during refinancing to lower loan-to-value (LTV) below 80% and eliminate PMI.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">FHA Streamline Refinance</h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Allows existing FHA borrowers to reduce rates with minimal documentation and no home appraisal.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1 sm:col-span-2">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">ARM to Fixed Refinance</h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Locks in a predictable fixed interest rate before an adjustable-rate mortgage resets to higher market rates.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Mortgage Refinance Costs Breakdown */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">4. Itemized Mortgage Refinance Costs
        </h2>
        <p className="text-sm leading-relaxed">
          Refinancing a home mortgage incurs upfront closing fees typically equal to 2% to 5% of the loan principal:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <strong>Application Fee:</strong> $100–$500 for lender processing.
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <strong>Appraisal Fee:</strong> $300–$600 for professional property valuation.
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <strong>Origination Fee:</strong> 0.5%–1.5% of loan amount for underwriting.
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <strong>Discount Points:</strong> 1% per point to buy down interest rates.
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <strong>Title Search Fee:</strong> $400–$900 for deed verification & insurance.
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <strong>Recording Fee:</strong> $100–$250 paid to local county records office.
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <strong>Flood Certification:</strong> $20–$50 to verify flood zone hazard status.
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <strong>Inspection Fee:</strong> $150–$300 for home safety & pest inspections.
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <strong>Survey Fee:</strong> $200–$500 to verify official property boundaries.
          </div>
        </div>
      </section>

      {/* 5, 6, 7, 8. Non-Mortgage Refinancing (Student, Auto, Credit Card, Personal) */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">5–8. Refinancing Other Major Loan Types
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">5. Student Loan Refinancing
            </h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Consolidates multiple federal and private student loans into a single private loan with a lower interest rate, simplifying monthly billing.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">6. Auto Loan Refinancing
            </h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Replaces existing car loans to secure lower monthly payments when interest rates drop or your credit score improves after vehicle purchase.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">7. Credit Card Refinancing
            </h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Transfers high-APR credit card balances (18%–25%) onto 0% Intro APR balance transfer cards or low-rate personal loans.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">8. Personal Loan Refinancing
            </h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Replaces existing unsecured debt with a new fixed-rate personal loan, reducing monthly interest costs without requiring collateral.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions (14 FAQs) */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">9. Frequently Asked Questions (FAQ)
        </h2>

        <div className="space-y-3 text-xs">
          {faqList.map((item, idx) => (
            <div
              key={`faq-refinance-section-${idx}`}
              className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1"
            >
              <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">
                {idx + 1}. {item.question}
              </h3>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Internal Links Grid Section */}
      <div className="pt-6  dark:border-zinc-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
          10. Explore Related Financial Calculators on CalcPlatform
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
            href="/calculators/mortgage-payoff-calculator"
            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between group transition-colors"
          >
            <span>Mortgage Payoff Calculator</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-500" />
          </Link>
          <Link
            href="/calculators/amortization-calculator"
            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between group transition-colors"
          >
            <span>Amortization Calculator</span>
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
            href="/calculators/personal-loan-calculator"
            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between group transition-colors"
          >
            <span>Personal Loan Calculator</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-500" />
          </Link>
          <Link
            href="/calculators/student-loan-calculator"
            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between group transition-colors"
          >
            <span>Student Loan Calculator</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RefinanceContentSection;
