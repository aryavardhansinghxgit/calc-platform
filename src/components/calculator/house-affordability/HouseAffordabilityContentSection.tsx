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

export function HouseAffordabilityContentSection() {
  const faqList = [
    {
      question: "How much house can I afford on my annual household income?",
      answer: "Lenders generally recommend that your total monthly housing costs (principal, interest, property taxes, insurance, HOA fees) do not exceed 28% of your gross monthly income, and total monthly debts do not exceed 36%."
    },
    {
      question: "What is the 28/36 Debt-to-Income (DTI) rule?",
      answer: "The 28/36 rule is the standard qualification benchmark used by conventional mortgage lenders. It mandates that a homebuyer spend a maximum of 28% of gross monthly income on housing costs (Front-End Ratio) and a maximum of 36% on total recurring debt obligations (Back-End Ratio)."
    },
    {
      question: "What is the difference between Front-End and Back-End DTI ratio?",
      answer: "The Front-End Ratio measures housing expenses alone (mortgage P&I, property tax, home insurance, HOA) against gross monthly income. The Back-End Ratio measures housing expenses plus all other recurring debts (auto loans, student loans, credit card minimums) against gross income."
    },
    {
      question: "How do FHA loan DTI rules differ from Conventional loans?",
      answer: "FHA loans permit higher debt-to-income limits under the 31/43 rule (31% Front-End housing limit and 43% Back-End total debt limit), making homeownership accessible for buyers with higher existing debt or lower credit scores."
    },
    {
      question: "What are VA loan DTI rules for eligible veterans?",
      answer: "VA loans do not enforce a rigid Front-End ratio limit, but instead utilize a 41% Back-End DTI benchmark. Additionally, VA lenders evaluate residual income (cash remaining after all monthly expenses) to ensure financial stability."
    },
    {
      question: "How does my down payment impact house affordability?",
      answer: "A larger down payment increases your home purchasing power dollar-for-dollar. Reaching a 20% down payment eliminates mandatory Private Mortgage Insurance (PMI), saving $100 to $300+ per month and increasing your maximum affordable price."
    },
    {
      question: "What risk levels are associated with custom DTI ratios?",
      answer: "A 20% DTI is Conservative (leaves ample cash flow for savings). A 30% DTI is Moderate (standard for most households). A 40% DTI is Aggressive (stretches monthly budgets). A 50% DTI is High Risk (creates vulnerability to unexpected financial emergencies)."
    },
    {
      question: "Why might a lender approve a lower loan amount than I expected?",
      answer: "Lenders reduce maximum loan approvals if you carry high existing monthly debt payments (credit cards, car payments), if local property tax or HOA fees are unusually high, or if your credit score falls into subprime tiers."
    },
    {
      question: "How can I increase the home purchase price I can afford?",
      answer: "You can boost affordability by: 1) Paying off existing credit cards or car loans to lower your Back-End DTI, 2) Saving a larger down payment, 3) Improving your credit score to secure a lower interest rate, or 4) Shopping in areas with lower property taxes."
    },
    {
      question: "Does property tax and HOA fees affect my mortgage borrowing limit?",
      answer: "Yes! Every dollar allocated toward property tax, home insurance, or monthly HOA fees reduces the dollar amount available for principal and interest mortgage payments under your Front-End/Back-End DTI ceiling."
    },
    {
      question: "What hidden costs should I budget for when buying a home?",
      answer: "In addition to your monthly mortgage, home buyers should budget 1% to 2% of the home price annually for ongoing home maintenance, plus closing costs (2% to 5% of loan amount) paid at purchase."
    },
    {
      question: "Should I buy a home at the maximum price I am approved for?",
      answer: "Financial experts advise against buying at your maximum loan approval limit. Spending 20% to 25% of gross income on housing provides a comfortable buffer for investments, emergency savings, and lifestyle choices."
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
        "name": "House Affordability Calculator",
        "item": "https://calcplatform.com/calculators/house-affordability-calculator"
      }
    ]
  };

  // 3. FinancialService Schema
  const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "CalcPlatform House Affordability Advisory",
    "description": "Professional house affordability analysis evaluating income, DTI ratios, property taxes, HOA fees, and monthly budgets."
  };

  // 4. WebApplication Schema
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcPlatform House Affordability Calculator",
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

      {/* Related Financial Tools Header */}
      <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-200 flex items-center gap-1.5">Related Home Buying Tools
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
            href="/calculators/refinance-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Refinancing Calculator
          </Link>
          <Link
            href="/calculators/amortization-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Amortization Calculator
          </Link>
          <Link
            href="/calculators/rent-vs-buy-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Rent vs Buy Calculator
          </Link>
          <Link
            href="/calculators/down-payment-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Down Payment Calculator
          </Link>
          <Link
            href="/calculators/debt-to-income-calculator"
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-medium transition-colors"
          >
            Debt-To-Income Calculator
          </Link>
        </div>
      </div>

      {/* 1. What Is House Affordability */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">1. What Is House Affordability?
        </h2>
        <p className="text-sm leading-relaxed">
          <strong>House Affordability</strong> is an evaluation of the maximum home purchase price and loan amount you can comfortably take on without straining your household finances or risking mortgage default. Lenders determine home affordability by measuring your gross household income against recurring debt obligations using <strong>Debt-to-Income (DTI) ratios</strong>.
        </p>
      </section>

      {/* 2. Front-End Ratio Explained */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">2. Front-End Ratio (Housing Ratio) Explained
        </h2>
        <p className="text-sm leading-relaxed">
          The <strong>Front-End Ratio</strong> calculates the percentage of your gross monthly income that goes toward housing expenses alone (including mortgage principal & interest, property taxes, home insurance, and HOA fees).
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums text-xs sm:text-sm text-center border border-zinc-800 shadow-md">
          Front-End Ratio = ( Monthly Housing Costs / Monthly Gross Income ) × 100
        </div>
      </section>

      {/* 3. Back-End Ratio Explained */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">3. Back-End Ratio (Total Debt Ratio) Explained
        </h2>
        <p className="text-sm leading-relaxed">
          The <strong>Back-End Ratio</strong> calculates the percentage of your gross monthly income required to cover housing expenses plus all other recurring debt payments (car loans, student loans, minimum credit card payments).
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums text-xs sm:text-sm text-center border border-zinc-800 shadow-md">
          Back-End Ratio = [ ( Housing Costs + Other Monthly Debts ) / Monthly Gross Income ] × 100
        </div>
      </section>

      {/* 4. Conventional Loans and the 28/36 Rule */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">4. Conventional Loans and the 28/36 Rule
        </h2>
        <p className="text-sm leading-relaxed">
          Conventional mortgage underwriters strictly enforce the <strong>28/36 Rule</strong>:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm pl-2">
          <li>
            <strong>28% Housing Limit:</strong> Total monthly housing costs should not exceed 28% of gross monthly income.
          </li>
          <li>
            <strong>36% Total Debt Limit:</strong> Total monthly debt payments (housing + debt) should not exceed 36% of gross monthly income.
          </li>
        </ul>
      </section>

      {/* 5. FHA Loans */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">5. FHA Loans and the 31/43 Rule
        </h2>
        <p className="text-sm leading-relaxed">
          Government-backed <strong>FHA loans</strong> offer more lenient debt-to-income limits under the <strong>31/43 Rule</strong> (31% Front-End housing limit and 43% Back-End total debt limit). FHA loans require an upfront Mortgage Insurance Premium (MIP) and annual MIP fees.
        </p>
      </section>

      {/* 6. VA Loans */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">6. VA Loans and the 41% Back-End Rule
        </h2>
        <p className="text-sm leading-relaxed">
          Eligible military veterans and active-duty service members can qualify for zero-down-payment <strong>VA loans</strong>. VA guidelines utilize a <strong>41% Back-End DTI benchmark</strong> without enforcing a rigid Front-End ratio cap.
        </p>
      </section>

      {/* 7. Custom Debt-To-Income Ratios */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">7. Custom DTI Risk Levels Explained
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400">20% DTI — Conservative</strong>
            <p className="text-slate-900 dark:text-slate-100">Leaves significant leftover income for aggressive retirement savings and investments.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400">30% DTI — Moderate</strong>
            <p className="text-slate-900 dark:text-slate-100">Standard balanced allocation for average household budgets.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400">40% DTI — Aggressive</strong>
            <p className="text-slate-900 dark:text-slate-100">Stretches monthly budgets; requires strict discipline on discretionary spending.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400">50% DTI — High Risk</strong>
            <p className="text-slate-900 dark:text-slate-100">Creates vulnerability to unexpected job loss or medical emergencies.</p>
          </div>
        </div>
      </section>

      {/* 8. Why You May Not Afford a House */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">8. Why You May Not Afford a House & How to Improve
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm pl-2">
          <li><strong>Reduce Existing Monthly Debt:</strong> Pay off car loans or credit cards to lower your Back-End DTI.</li>
          <li><strong>Improve Credit Score:</strong> Higher credit scores lower your mortgage interest rate, decreasing monthly payments.</li>
          <li><strong>Increase Down Payment:</strong> Saving a larger down payment reduces your loan principal and eliminates PMI.</li>
          <li><strong>Increase Household Income:</strong> Adding secondary income sources expands your allowable housing budget.</li>
        </ul>
      </section>

      {/* 9. FAQs Section (12 Questions) */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">9. Frequently Asked Questions (FAQ)
        </h2>

        <div className="space-y-3 text-xs">
          {faqList.map((item, idx) => (
            <div
              key={`faq-house-${idx}`}
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

      {/* Internal Links Grid */}
      <div className="pt-6  dark:border-zinc-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
          Explore Related Financial Calculators on CalcPlatform
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
        </div>
      </div>
    </div>
  );
}

export default HouseAffordabilityContentSection;
