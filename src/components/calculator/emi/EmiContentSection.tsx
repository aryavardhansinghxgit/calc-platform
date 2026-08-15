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
} from "lucide-react";

export function EmiContentSection() {
  const faqList = [
    {
      question: "What is an Equated Monthly Installment (EMI)?",
      answer: "An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified calendar date each month over a loan term. Each EMI consists of both principal balance repayment and interest charges."
    },
    {
      question: "How is EMI calculated mathematically?",
      answer: "EMI is calculated using the formula: EMI = P × r × (1+r)ⁿ / [(1+r)ⁿ - 1], where P is the principal loan amount, r is the periodic monthly interest rate (Annual Rate / 12 / 100), and n is the loan tenure in months."
    },
    {
      question: "What is the difference between Reducing Balance Rate and Flat Rate interest?",
      answer: "In a Reducing Balance loan, interest is calculated only on the outstanding principal balance after every monthly payment. In a Flat Rate loan, interest is charged on the original principal for the entire duration, making Flat Rate loans far more expensive."
    },
    {
      question: "How do prepayments affect EMI or loan tenure?",
      answer: "Prepayments reduce your principal balance directly. You can choose to: 1) Reduce Loan Tenure (keep EMI constant and finish loan months/years early), or 2) Reduce Monthly EMI (keep tenure constant and enjoy lower monthly out-of-pocket payments)."
    },
    {
      question: "What is a processing fee on a loan?",
      answer: "A processing fee is a one-time administrative charge levied by banks and lenders to evaluate, verify, and disburse your loan application, typically ranging from 0.5% to 2% of the principal loan amount."
    },
    {
      question: "Can I pay off my loan early (Pre-closure)?",
      answer: "Yes. Floating-rate home loans in India and many other jurisdictions carry zero prepayment or pre-closure charges by RBI guidelines. Fixed-rate personal or auto loans may carry a small pre-closure penalty fee (typically 2% to 5%)."
    },
    {
      question: "How does loan tenure affect monthly EMI vs total interest payable?",
      answer: "A longer loan tenure (e.g. 20-30 years) reduces your monthly EMI amount, making it more affordable month-to-month, but significantly increases the cumulative lifetime interest paid to the lender."
    },
    {
      question: "What is the 50/30/20 rule for EMI budgeting?",
      answer: "Financial advisors recommend that total monthly debt EMIs (housing, car, personal) should never exceed 40% to 50% of your net monthly take-home income to maintain healthy financial security."
    },
    {
      question: "What is a Moratorium Period in loans?",
      answer: "A moratorium period is a temporary grace period granted by lenders during which the borrower is not required to make monthly EMI payments. However, interest continues to accrue and compounds during the moratorium."
    },
    {
      question: "How does CIBIL / Credit Score impact EMI interest rates?",
      answer: "A high credit score (750+ CIBIL or 740+ FICO) signals low credit risk, enabling borrowers to negotiate prime interest rates, waived processing fees, and higher loan amounts."
    },
    {
      question: "What is an EMI Amortization Schedule?",
      answer: "An EMI Amortization Schedule is a detailed payment breakdown listing every month of the loan term, detailing beginning balance, EMI payment, principal paid, interest paid, and ending balance."
    },
    {
      question: "What happens if I miss an EMI payment date?",
      answer: "Missing an EMI results in late payment fees, bounce charges (ECS/NACH fees), additional default interest, and a negative mark on your credit report, lowering your credit score."
    },
    {
      question: "Is EMI paid in advance or in arrears?",
      answer: "Most consumer loans operate on EMI in Arrears (payment made at the end of the first billing month). Some auto loans operate on EMI in Advance, where the first EMI is deducted at disbursement."
    },
    {
      question: "Can EMI payments be claimed as tax deductions?",
      answer: "Yes! On home loans (e.g. Section 24b for interest up to ₹2 Lakh and Section 80C for principal up to ₹1.5 Lakh in India), EMI payments provide substantial annual income tax benefits."
    },
    {
      question: "How can I lower my existing loan EMI?",
      answer: "You can lower your EMI by making lump-sum principal prepayments, opting for a Balance Transfer to a bank offering lower interest rates, or requesting an extension of your remaining loan tenure."
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

  // 2. SoftwareApplication Schema
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CalcPlatform EMI Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Advanced production-grade EMI calculator for home, car, and personal loans featuring prepayment strategy analyzer, flat vs reducing rate comparison, and amortization schedules."
  };

  // 3. Breadcrumb Schema
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
        "name": "EMI Calculator",
        "item": "https://calcplatform.com/calculators/emi-calculator"
      }
    ]
  };

  // 4. Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Equated Monthly Installment (EMI) Guide: Calculations, Prepayments & Rate Methods",
    "description": "Comprehensive guide explaining EMI calculations, reducing balance vs flat interest rates, prepayment strategies, processing fees, and tax deductions.",
    "author": {
      "@type": "Organization",
      "name": "CalcPlatform Financial Advisory Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CalcPlatform"
    }
  };

  return (
    <div className="space-y-10 py-4 text-zinc-700 dark:text-zinc-300">
      {/* Inject Structured Data Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

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
            href="/calculators/interest-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Interest Calculator
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

      {/* 1. What is an EMI */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          1. What is an Equated Monthly Installment (EMI)?
        </h2>
        <p className="text-sm leading-relaxed">
          An <strong>Equated Monthly Installment (EMI)</strong> is a fixed dollar or rupee amount paid by a borrower to a financial institution on a fixed date every calendar month over a designated tenure. Every EMI installment combines two components: paying off part of the underlying <strong>principal debt</strong> and servicing accrued <strong>interest charges</strong>.
        </p>
      </section>

      {/* 2. The EMI Formula */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          2. The Mathematical EMI Formula
        </h2>
        <p className="text-sm leading-relaxed">
          The monthly EMI payment is calculated using the universal compounding annuity formula:
        </p>
        <div className="p-4 rounded-xl bg-zinc-900 text-zinc-100 dark:bg-zinc-950 font-sans tabular-nums text-xs sm:text-sm text-center border border-zinc-800 shadow-md">
          EMI = P × r × [ (1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <strong>P:</strong> Principal Loan Amount
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <strong>r:</strong> Monthly Interest Rate (Annual Rate / 12 / 100)
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <strong>n:</strong> Loan Tenure in Months (Years × 12)
          </div>
        </div>
      </section>

      {/* 3. Reducing Balance vs Flat Rate */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Percent className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          3. Reducing Balance Rate vs. Flat Interest Rate
        </h2>
        <p className="text-sm leading-relaxed">
          Understanding interest calculation methods is essential to avoid hidden borrowing costs:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> Reducing Balance Method (Standard)
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Interest is recalculated monthly on the remaining principal balance. As you pay off principal, monthly interest charges decrease continuously.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span> Flat Rate Method (Expensive)
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Interest is charged on the original starting principal balance for the entire loan life, even after 90% of principal has been paid. A 10% Flat Rate is equivalent to roughly 18% Reducing Balance!
            </p>
          </div>
        </div>
      </section>

      {/* 4. Prepayment Strategies */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          4. How Prepayments Work: Reduce Tenure vs. Reduce EMI
        </h2>
        <p className="text-sm leading-relaxed">
          When making an extra prepayment, borrowers can choose between two main strategies:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Strategy 1: Reduce Tenure (Recommended)</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Keep your monthly EMI constant. Extra prepayment accelerates principal payoff, finishing your loan months or years ahead of schedule and saving maximum interest.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Strategy 2: Reduce EMI</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Maintain your original loan payoff date. The lender recalculates a lower required monthly EMI on your smaller principal balance, improving monthly cash flow.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Processing Fees */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          5. Understanding Processing Fees & Preclosure Charges
        </h2>
        <p className="text-sm leading-relaxed">
          Banks charge a one-time <strong>processing fee</strong> (typically 0.5% to 2% of the principal) to cover loan underwriting, documentation, and credit verification. Always factor processing fees into your total cost of borrowing.
        </p>
      </section>

      {/* 6. Frequently Asked Questions (15 Questions) */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-amber-500" />
          6. Frequently Asked Questions (FAQ)
        </h2>

        <div className="space-y-3 text-xs">
          {faqList.map((item, idx) => (
            <div
              key={`faq-emi-${idx}`}
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

      {/* Internal Links Grid */}
      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Explore Other Financial Calculators on CalcPlatform
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
            href="/calculators/amortization-calculator"
            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between group transition-colors"
          >
            <span>Amortization Calculator</span>
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

export default EmiContentSection;
