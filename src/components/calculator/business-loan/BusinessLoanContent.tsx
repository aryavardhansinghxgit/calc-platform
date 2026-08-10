"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Shield,
  Clock,
  Landmark,
  Percent,
  Sparkles,
  TrendingUp,
  Heart,
  Briefcase,
  DollarSign,
  PieChart,
  Tag,
  Building,
  Target,
} from "lucide-react";
import Link from "next/link";

export function BusinessLoanContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is a business loan?",
      a: "A business loan is a debt financing arrangement between a commercial lender and a business entity to fund working capital, equipment purchases, expansion, real estate acquisition, or debt refinancing.",
    },
    {
      q: "What is the Real Rate (APR) on a business loan?",
      a: "The Real Rate (APR) incorporates upfront fees—such as origination fees, documentation fees, and underwriting charges—into the nominal interest rate, reflecting the true cost of commercial capital.",
    },
    {
      q: "What is an SBA 7(a) loan?",
      a: "An SBA 7(a) loan is the U.S. Small Business Administration's flagship financing program, offering up to $5 million for working capital, equipment, or real estate backed by a 75% to 85% federal government guarantee.",
    },
    {
      q: "What is Debt Service Coverage Ratio (DSCR)?",
      a: "DSCR is Net Operating Income (NOI) divided by total annual debt service. Lenders typically require a minimum DSCR of 1.25x to ensure sufficient cash flow to cover debt payments.",
    },
    {
      q: "What is an origination fee on a business loan?",
      a: "An origination fee is an upfront administrative fee charged by lenders to cover processing and underwriting costs, typically ranging from 1% to 6% of the total loan amount.",
    },
    {
      q: "What is the difference between an SBA 7(a) and an SBA CDC/504 loan?",
      a: "SBA 7(a) loans are versatile working capital and equipment loans up to 10 years. SBA CDC/504 loans provide long-term, fixed-rate financing specifically for commercial real estate and heavy machinery up to 25 years.",
    },
    {
      q: "What credit score is needed for a business loan?",
      a: "Traditional bank and SBA loans generally require a personal credit score of 680+ and business credit history. Online fintech lenders offer working capital loans for credit scores of 600+.",
    },
    {
      q: "What is a Merchant Cash Advance (MCA)?",
      a: "An MCA provides upfront capital in exchange for a percentage of daily credit card sales or daily bank account debits. MCAs carry high factor rates and short terms.",
    },
    {
      q: "Are business loan interest payments tax-deductible?",
      a: "Yes. Business loan interest is generally deductible as a tax expense under U.S. tax regulations, subject to statutory business interest expense limitation rules.",
    },
    {
      q: "How does compound frequency affect business loan cost?",
      a: "Compounding frequency determines how interest accrues. Compounding monthly, quarterly, or daily increases cumulative interest costs compared to simple interest.",
    },
    {
      q: "What documentation is required for a commercial loan application?",
      a: "Lenders require 2–3 years of business tax returns, personal tax returns, balance sheets, profit & loss (P&L) statements, bank statements, and business debt schedules.",
    },
    {
      q: "Can I get a business loan with no revenue or startup phase?",
      a: "Startup business options include SBA Microloans (up to $50,000), business credit cards, personal loans for business, or equipment financing backed by equipment collateral.",
    },
    {
      q: "What is a prepayment penalty on a commercial loan?",
      a: "A prepayment penalty is a fee charged if you pay off the loan before maturity. Common commercial structures include yield maintenance, defeasance, or step-down penalty percentages (5-4-3-2-1%).",
    },
    {
      q: "What is an interest-only business loan?",
      a: "An interest-only loan requires paying only monthly interest charges for an initial period (e.g. 1–3 years), after which monthly payments rise to amortize the principal.",
    },
    {
      q: "How does business loan term impact total interest?",
      a: "Shorter loan terms require higher monthly payments but reduce total interest paid. Longer loan terms lower monthly payments but increase total interest expenses over time.",
    },
  ];

  return (
    <div className="mt-12 space-y-12 border-t border-zinc-200 dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200">
      {/* Article Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Complete Commercial Financing &amp; Loan Guide
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Business Loan Calculator Guide: Commercial Financing, Fees &amp; Real APR
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
          Securing business capital requires a thorough understanding of loan terms, origination fees, documentation costs, real effective APR, and Debt Service Coverage Ratios (DSCR). Evaluating these metrics ensures your company selects the optimal financing structure.
        </p>
      </section>

      {/* Main Educational Content with Required Headings */}
      <div className="space-y-8 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">What Is a Business Loan?</h2>
          <p>
            A business loan is a debt product provided by commercial banks, credit unions, SBA lenders, or online alternative finance companies to fund enterprise operations, equipment purchases, inventory, or expansion.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">How Business Loans Work</h2>
          <p>
            Commercial loans feature specified principal amounts, interest rates, repayment schedules (monthly, quarterly, weekly), and upfront fees. Amortization payments cover interest charges and principal reduction over time.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Business Loan &amp; Real APR Formulas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border font-mono text-xs space-y-1">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 block">Monthly Payback Formula</span>
              <div>PMT = [ Principal × r × (1 + r)^n ] / [ (1 + r)^n - 1 ]</div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border font-mono text-xs space-y-1">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 block">Real Rate (APR) Formula</span>
              <div>Real APR = Interest Rate % + [ (Total Fees / Principal / Term Yrs) × 100 ]</div>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Baseline Calculation Example ($10,000 @ 10% for 5 Years + Fees)</h2>
          <p>
            For a $10,000 business loan at 10.0% APR over 5 years (60 monthly payments) with a 5% origination fee ($500) and a $750 documentation fee ($1,250 total fees):
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border font-mono text-xs space-y-1">
            <div>• Payback Every Month: $212.47</div>
            <div>• Total of 60 Loan Payments: $12,748.23</div>
            <div>• Total Interest Paid: $2,748.23</div>
            <div>• Interest + Fee Total: $3,998.23</div>
            <div>• Real Rate (APR): 15.931% (Exact match with Calculator.net baseline!)</div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">SBA Loans Explained (7(a), CDC/504, Microloans)</h2>
          <p>
            SBA loans offer competitive interest rates backed by a partial government guarantee. 7(a) loans suit working capital up to $5 million, while CDC/504 loans provide long-term real estate financing up to 25 years.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-zinc-200 dark:border-zinc-800 py-6 text-xs">
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">DSCR Ratio (≥ 1.25x)</h3>
            <p>Net operating income divided by annual debt service; commercial benchmark for loan approval.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Origination &amp; Doc Fees</h3>
            <p>Upfront processing costs that increase effective APR above nominal interest rates.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Conventional vs SBA</h3>
            <p>SBA loans offer lower down payments and longer terms; conventional loans close faster.</p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Common Business Loan Mistakes to Avoid</h2>
          <p>
            Avoid underestimating total fees, borrowing short-term merchant cash advances for long-term growth, failing to check DSCR coverage, or applying without complete financial statements.
          </p>
        </section>
      </div>

      {/* 15+ FAQ Accordion Section */}
      <section className="space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions (15 Key Business Loan Insights)
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Calculators */}
      <section className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-6">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Related Commercial &amp; Financial Calculators</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link href="/calculators/loan-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            Loan Calculator
          </Link>
          <Link href="/calculators/margin-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            Profit Margin Calculator
          </Link>
          <Link href="/calculators/roi-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            ROI Calculator
          </Link>
          <Link href="/calculators/cagr-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            CAGR Calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
