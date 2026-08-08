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

      {/* Internal Links Quick Navigation */}
      <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
          <Calculator className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Related Financial Tools
        </h4>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/mortgage-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Mortgage Calculator
          </Link>
          <Link
            href="/calculators/loan-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Loan Calculator
          </Link>
          <Link
            href="/calculators/amortization-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Amortization Calculator
          </Link>
          <Link
            href="/calculators/house-affordability-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            House Affordability Calculator
          </Link>
          <Link
            href="/calculators/auto-loan-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Auto Loan Calculator
          </Link>
          <Link
            href="/calculators/personal-loan-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Personal Loan Calculator
          </Link>
        </div>
      </div>

      {/* 1. What Is Loan Refinancing */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          1. What Is Loan Refinancing?
        </h2>
        <p className="text-sm leading-relaxed">
          <strong>Loan Refinancing</strong> involves taking out a new loan, usually with more favorable terms, to pay off an existing debt obligation. Terms and conditions of refinancing vary widely depending on whether you are refinancing a home mortgage, car loan, student loan, or personal debt.
        </p>
      </section>

      {/* 2. Reasons to Refinance */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          2. Primary Reasons Borrowers Refinance
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm pl-2">
          <li><strong>Save Money on Interest:</strong> Secure a lower annual interest rate when market rates decline or your credit score improves.</li>
          <li><strong>Lower Monthly Payments:</strong> Extend loan duration to reduce immediate monthly cash outflows.</li>
          <li><strong>Shorten Loan Term:</strong> Switch from a 30-year to a 15-year mortgage to pay off debt years faster and save tens of thousands in interest.</li>
          <li><strong>Extract Cash Equity:</strong> Perform a Cash-Out refinance to fund home renovations, medical expenses, or high-interest debt consolidation.</li>
          <li><strong>Switch Rate Structure:</strong> Convert an Adjustable-Rate Mortgage (ARM) into a predictable Fixed-Rate mortgage.</li>
        </ul>
      </section>

      {/* 3. Refinance Costs */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          3. Understanding Mortgage Refinance Costs
        </h2>
        <p className="text-sm leading-relaxed">
          Refinancing involves several administrative fees that should be factored into your break-even analysis:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <strong>Mortgage Application Fee:</strong> $100 to $500 charged by lenders to process applications.
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <strong>Home Appraisal Fee:</strong> $300 to $600 to evaluate current property market value.
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <strong>Loan Origination & Points:</strong> 0.5% to 2% of the loan amount.
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <strong>Title Search & Insurance:</strong> $500 to $1,000 to verify clear property ownership.
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions (12 Questions) */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-amber-500" />
          4. Frequently Asked Questions (FAQ)
        </h2>

        <div className="space-y-3 text-xs">
          {faqList.map((item, idx) => (
            <div
              key={`faq-refinance-${idx}`}
              className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1"
            >
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                {idx + 1}. {item.question}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RefinanceContentSection;
