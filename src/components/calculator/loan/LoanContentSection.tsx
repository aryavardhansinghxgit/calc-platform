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

export function LoanContentSection() {
  const faqList = [
    {
      question: "What is a loan and how does borrowing money work?",
      answer: "A loan is a contractual financial arrangement where a lender provides a principal sum of money to a borrower. The borrower agrees to repay the principal along with interest charges over a specified period through regular periodic installments."
    },
    {
      question: "How is a monthly loan payment calculated?",
      answer: "Monthly loan payments are calculated using the standard amortized payment formula: P = L * [r(1+r)^n] / [(1+r)^n - 1], where L is the loan principal, r is the periodic monthly interest rate, and n is the total number of payment periods."
    },
    {
      question: "What is the difference between interest rate and APR?",
      answer: "The interest rate represents the baseline annual fee charged by the lender to borrow principal. The Annual Percentage Rate (APR) includes both the interest rate plus additional lender origination fees, closing costs, and broker points into a broader annual percentage cost."
    },
    {
      question: "What is the difference between a secured loan and an unsecured loan?",
      answer: "A secured loan requires the borrower to pledge collateral asset (e.g. house or car), which the lender can repossess if payments default. An unsecured loan (e.g. personal loan or credit card) requires no collateral collateral asset, relying solely on borrower creditworthiness."
    },
    {
      question: "How do extra monthly payments save money on a loan?",
      answer: "100% of any extra monthly payment goes directly toward reducing the remaining principal balance. Lowering principal faster reduces the monthly interest accrued in subsequent periods, shortening your overall loan term and saving thousands in interest."
    },
    {
      question: "Can I pay off a loan early without penalties?",
      answer: "Most modern consumer loans, auto loans, and residential mortgages allow penalty-free early payoff. However, some commercial loans or subprime mortgages contain prepayment penalty clauses, so always review your loan agreement."
    },
    {
      question: "What is fixed-rate vs variable-rate interest?",
      answer: "A fixed-rate loan maintains an identical interest rate and monthly payment for the entire loan life. A variable-rate (or adjustable-rate) loan fluctuates periodically based on market benchmark indexes (such as SOFR or the Prime Rate)."
    },
    {
      question: "What loan term should I choose: 15-year or 30-year?",
      answer: "A 15-year loan features higher monthly payments but significantly lower interest rates and total lifetime interest costs. A 30-year loan offers lower required monthly payments, providing greater monthly cash flow flexibility."
    },
    {
      question: "How does my credit score impact loan interest rates?",
      answer: "Lenders use credit scores (FICO/VantageScore) to measure default risk. Higher credit scores (740+) qualify for prime benchmark interest rates, saving borrowers tens of thousands compared to subprime tiers."
    },
    {
      question: "What is an amortization schedule?",
      answer: "An amortization schedule is a complete accounting table detailing every payment date over the loan term, showing exact dollar allocations toward interest charges, principal reduction, and ending balance."
    },
    {
      question: "What happens if I miss a loan payment?",
      answer: "Missing a payment incurs late fees and, if overdue past 30 days, gets reported to credit bureaus (Equifax, Experian, TransUnion), lowering your credit score. Severe default leads to collections, repossession, or legal proceedings."
    },
    {
      question: "How does payment frequency (Biweekly vs Monthly) affect loan payoff?",
      answer: "Making biweekly payments results in 26 half-payments per year—the equivalent of 13 full monthly payments per year. This extra annual payment reduces principal faster and shortens a 30-year loan by roughly 4 to 5 years."
    },
    {
      question: "What is loan refinancing?",
      answer: "Refinancing involves replacing an existing debt obligation with a new loan under different interest rates, term lengths, or payment terms—often done when market interest rates drop or credit score improves."
    },
    {
      question: "What is debt consolidation?",
      answer: "Debt consolidation combines multiple high-interest debts (such as credit cards) into a single lower-interest personal loan with one fixed monthly payment, simplifying budgeting."
    },
    {
      question: "How much can I borrow based on my income?",
      answer: "Lenders evaluate your Debt-to-Income (DTI) ratio. Most lenders mandate that total monthly debt payments (including mortgage, auto, and student loans) should not exceed 36% to 43% of gross monthly income."
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

  // 2. Calculator / SoftwareApplication Schema
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CalcPlatform Loan Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Comprehensive production-grade loan calculator for computing monthly payment, maximum loan affordability, loan term, and estimated interest rates."
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
        "name": "Loan Calculator",
        "item": "https://calcplatform.com/calculators/loan-calculator"
      }
    ]
  };

  // 4. Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Loan Calculator Guide: Monthly Payments, Loan Amount & Interest Rates",
    "description": "Learn how loan amortization works, what factors influence interest rates, secured vs unsecured debt, and strategies to pay off loans early.",
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
      {/* Inject Structured Data JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Related Financial Tools Header */}
      <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-200 flex items-center gap-1.5">Related Financial Tools
        </h4>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/mortgage-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Mortgage Calculator
          </Link>
          <Link
            href="/calculators/amortization-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Amortization Calculator
          </Link>
          <Link
            href="/calculators/emi-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            EMI Calculator
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

      {/* 1. What Is A Loan */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">1. What Is A Loan?
        </h2>
        <p className="text-sm leading-relaxed">
          A <strong>loan</strong> is a binding financial contract between a borrower and a lender (such as a bank, credit union, or online financial institution). The lender agrees to disburse an upfront principal sum of money, and the borrower agrees to pay back that principal plus accrued interest over a defined term.
        </p>
        <p className="text-sm leading-relaxed">
          Loans empower consumers and businesses to make substantial investments—such as purchasing a residential home, buying a motor vehicle, funding higher education, or expanding business operations—without having to pay 100% of the cash upfront.
        </p>
      </section>

      {/* 2. How Loan Payments Work */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">2. How Loan Payments Work (Amortization Mechanics)
        </h2>
        <p className="text-sm leading-relaxed">
          Standard consumer loans use an <strong>amortized payment structure</strong>. This means your required total payment remains fixed every month, but the distribution between interest and principal changes with every payment made:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">Principal Reduction
            </h3>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
              The portion of your payment that directly reduces your remaining loan debt. Paying down principal builds equity and reduces future compounding interest.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">Interest Charge
            </h3>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
              The fee charged by the bank for lending money. Monthly interest is calculated by multiplying your remaining principal balance by the monthly interest rate.
            </p>
          </div>
        </div>
      </section>

      {/* 3. What Affects Loan Interest */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">3. What Factors Affect Your Loan Interest Rate?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong>1. Credit Score (FICO/Vantage)</strong>
            <p className="text-slate-900 dark:text-slate-100">Higher scores (740+) signify lower default risk, unlocking lower interest rates.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong>2. Debt-to-Income (DTI) Ratio</strong>
            <p className="text-slate-900 dark:text-slate-100">Lenders prefer DTI ratios below 36%, proving you have cash flow to support debt.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong>3. Loan Term Duration</strong>
            <p className="text-slate-900 dark:text-slate-100">Shorter loan terms (e.g. 15-year vs 30-year) carry lower interest rates than longer terms.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong>4. Central Bank Benchmark Rates</strong>
            <p className="text-slate-900 dark:text-slate-100">Federal Reserve or central bank rate decisions influence overall market borrowing rates.</p>
          </div>
        </div>
      </section>

      {/* 4. Secured vs Unsecured Loans */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">4. Secured vs. Unsecured Loans
        </h2>
        <p className="text-sm leading-relaxed">
          Understanding debt collateral is vital before signing any loan agreement:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Secured Loans</h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Backed by tangible collateral (e.g. home mortgage, auto loan). If payments default, the lender can seize the property. In exchange, interest rates are lower.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Unsecured Loans</h3>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Requires no collateral (e.g. personal loans, student loans, credit cards). Lenders rely on credit history. Rates are higher due to increased lender risk.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Fixed vs Variable Rate Loans */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">5. Fixed-Rate vs. Variable-Rate Loans
        </h2>
        <p className="text-sm leading-relaxed">
          A <strong>fixed-rate loan</strong> locks in an exact interest rate and monthly payment for the full term, offering maximum budget stability. A <strong>variable-rate loan</strong> adjusts periodically according to benchmark indexes, which can lower payments when rates drop or increase payments when market rates rise.
        </p>
      </section>

      {/* 6. How To Reduce Loan Interest */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">6. How To Reduce Total Loan Interest Charges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong className="text-zinc-900 dark:text-zinc-100">1. Make Extra Monthly Payments</strong>
            <p className="text-slate-900 dark:text-slate-100">Adding $50-$200 extra each month directly pays down principal, slashing cumulative interest.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong className="text-zinc-900 dark:text-zinc-100">2. Switch to Biweekly Payments</strong>
            <p className="text-slate-900 dark:text-slate-100">Paying biweekly equals 13 full payments per year, shaving years off long-term debt schedules.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong className="text-zinc-900 dark:text-zinc-100">3. Refinance at Lower Rates</strong>
            <p className="text-slate-900 dark:text-slate-100">If your credit score improves or market rates drop, refinancing can lower your APR significantly.</p>
          </div>
        </div>
      </section>

      {/* 7. Common Loan Mistakes */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">7. Common Borrower Mistakes To Avoid
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm pl-2">
          <li>
            <strong>Focusing Only on Monthly Payment:</strong> Extending loan terms lowers monthly payments but dramatically inflates total interest paid over time.
          </li>
          <li>
            <strong>Ignoring Fees & Add-Ons:</strong> Origination fees, prepayment penalties, and unnecessary credit insurance add hidden costs to loans.
          </li>
          <li>
            <strong>Not Shopping Multiple Lenders:</strong> Rates vary significantly between banks; comparing at least 3-5 quotes can save thousands.
          </li>
        </ul>
      </section>

      {/* 8. FAQ Section (15+ Questions) */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">8. Frequently Asked Questions (FAQ)
        </h2>

        <div className="space-y-3 text-xs">
          {faqList.map((item, idx) => (
            <div
              key={`faq-${idx}`}
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

      {/* Internal Links Footer Grid */}
      <div className="pt-6  dark:border-zinc-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
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
            href="/calculators/amortization-calculator"
            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between group transition-colors"
          >
            <span>Amortization Calculator</span>
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

export default LoanContentSection;
