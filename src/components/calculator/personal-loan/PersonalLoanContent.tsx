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
  CreditCard,
} from "lucide-react";
import Link from "next/link";

export function PersonalLoanContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is a personal loan?",
      a: "A personal loan is an installment loan provided by a bank, credit union, or online lender that gives you a lump sum of money upfront. You pay it back in fixed monthly installments over a set term (typically 2 to 7 years) with interest.",
    },
    {
      q: "What is the difference between an unsecured and a secured personal loan?",
      a: "An unsecured personal loan requires no collateral and is approved based on your credit score, income, and debt-to-income ratio. A secured personal loan requires collateral (such as a savings account, vehicle, or certificate of deposit) to back the loan.",
    },
    {
      q: "How does a personal loan help with debt consolidation?",
      a: "Personal loans often carry significantly lower interest rates than high-interest credit cards (e.g. 10% to 14% vs. 20% to 25%+). Consolidating multiple credit card balances into a single personal loan lowers monthly interest costs, simplifies payments, and establishes a clear payoff timeline.",
    },
    {
      q: "What is an origination fee?",
      a: "An origination fee is an upfront processing fee charged by lenders, typically ranging from 1% to 8% of the total loan amount. It is deducted from the loan proceeds or added to the principal balance, increasing the effective Annual Percentage Rate (APR).",
    },
    {
      q: "Does applying for a personal loan affect my credit score?",
      a: "Pre-qualifying for a personal loan typically involves a soft credit check which does not impact your credit score. Submitting a formal application triggers a hard credit inquiry, which may temporarily lower your score by a few points.",
    },
    {
      q: "What credit score do I need to qualify for a personal loan?",
      a: "While minimum requirements vary, a credit score of 670 or higher generally qualifies you for favorable interest rates. Lenders also offer loans for fair credit (580–669) or bad credit, though interest rates will be higher.",
    },
    {
      q: "Can I pay off a personal loan early?",
      a: "Most reputable personal loan lenders allow early payoff without prepayment penalties. Making extra principal payments accelerates your payoff date and saves money on cumulative interest.",
    },
    {
      q: "What is the difference between interest rate and APR?",
      a: "The interest rate is the percentage charged on the principal amount borrowed. The Annual Percentage Rate (APR) includes both the interest rate and mandatory lender fees (such as origination fees), reflecting the true annual cost of borrowing.",
    },
    {
      q: "What can I use a personal loan for?",
      a: "Personal loans can be used for debt consolidation, home improvements, major medical expenses, wedding expenses, moving costs, or emergency repairs. They generally cannot be used for higher education tuition or illegal activities.",
    },
    {
      q: "How fast can I get funds from a personal loan?",
      a: "Online lenders and fintech platforms can approve applications instantly and deposit funds into your checking account within 24 to 48 hours. Traditional bank approval may take 3 to 7 business days.",
    },
    {
      q: "What is a peer-to-peer (P2P) personal loan?",
      a: "P2P lending connects individual borrowers directly with investors through online platforms, bypassing traditional banks to offer competitive interest rates.",
    },
    {
      q: "What happens if I miss a personal loan payment?",
      a: "Missing a payment can incur late fees (flat dollar amount or percentage of monthly payment). Payments overdue by 30 days or more will be reported to credit bureaus, damaging your credit score.",
    },
    {
      q: "What is a co-signer and do I need one?",
      a: "A co-signer is a creditworthy individual who agrees to assume legal responsibility for repayment if you default. Adding a co-signer can help you qualify for lower interest rates if your credit score is limited.",
    },
    {
      q: "How does fixed vs variable interest rate affect personal loans?",
      a: "Fixed interest rates remain constant throughout the loan term, ensuring predictable monthly payments. Variable rates fluctuate with benchmark market indexes (like the Prime Rate), making payments less predictable.",
    },
    {
      q: "What alternatives exist to taking out a personal loan?",
      a: "Alternatives include 0% intro APR balance transfer credit cards, home equity lines of credit (HELOC), 401(k) loans, borrowing from family, or seeking financial counseling from non-profit agencies.",
    },
  ];

  return (
    <div className="mt-12 space-y-12  dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200">
      {/* Article Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Complete Personal Loan &amp; Borrowing Guide
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Personal Loan Calculator Guide: Amortization, Interest &amp; Debt Consolidation
        </h1>
        <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl">
          Personal loans are popular financial tools for consolidating high-interest credit card debt, funding home renovations, or financing major expenses. Understanding monthly amortization payments, origination fees, interest costs, and APR empowers borrowers to make informed financial decisions.
        </p>
      </section>

      {/* Main Educational Content with Required Headings */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">What Are Personal Loans?</h2>
          <p>
            A personal loan is a fixed-rate installment loan repaid in equal monthly payments over a predetermined period (typically 12 to 84 months). Unlike auto loans or mortgages, unsecured personal loans do not require collateral.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">How Personal Loans Work</h2>
          <p>
            When approved for a personal loan, the lender disburses a lump sum into your bank account. Each monthly payment is divided into principal reduction and interest charges according to an amortization schedule.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Personal Loan Payment Formula</h2>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border font-sans tabular-nums text-xs space-y-1">
            <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 block">Monthly Payment Formula</span>
            <div>PMT = [ Principal × r × (1 + r)^n ] / [ (1 + r)^n - 1 ]</div>
            <div>Where: r = Monthly Interest Rate (APR / 12), n = Total Months (Years × 12)</div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Baseline Calculation Example ($20,000 @ 10% for 5 Years)</h2>
          <p>
            For a $20,000 personal loan at 10.0% APR over 5 years (60 monthly payments):
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border font-sans tabular-nums text-xs space-y-1">
            <div>• Monthly Payment: $424.94</div>
            <div>• Total Payments (60 months): $25,496.45</div>
            <div>• Total Interest Paid: $5,496.45</div>
            <div>• Payoff Horizon: 5 Years (e.g. Aug 2026 to Aug 2031)</div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Debt Consolidation Strategy Case Study</h2>
          <p>
            Consider a borrower carrying $8,000 on Card A at 19.99% APR ($240/mo) and $7,000 on Card B at 24.99% APR ($225/mo), totaling $15,000 in credit card debt.
          </p>
          <p>
            Consolidating both cards into a single $15,000 personal loan at 12.0% APR over 5 years (with a 5% origination fee) reduces monthly payments to $355.91, saving thousands of dollars in high-interest charges.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-zinc-200 dark:border-zinc-800 py-6 text-xs">
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Unsecured vs Secured</h3>
            <p>Unsecured loans rely on credit history; secured loans require backing assets like CDs or home equity.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Origination Fees</h3>
            <p>Upfront processing fees (1% to 8%) deducted from total loan proceeds upon funding.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Early Payoff Benefits</h3>
            <p>Paying extra principal each month reduces overall loan duration and cumulative interest expenses.</p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Common Personal Loan Mistakes to Avoid</h2>
          <p>
            Avoid borrowing more than necessary, ignoring origination fees, choosing terms that are too long, or failing to shop around with multiple lenders to compare pre-qualified APR offers.
          </p>
        </section>
      </div>

      {/* 15+ FAQ Accordion Section */}
      <section className="space-y-6  dark:border-zinc-800 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions (15 Key Personal Loan Insights)
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
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-900 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed  dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Calculators */}
      <section className="space-y-3  dark:border-zinc-800 pt-6">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Related Financial &amp; Debt Calculators</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link href="/calculators/loan-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Loan Calculator
          </Link>
          <Link href="/calculators/credit-card-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Credit Card Calculator
          </Link>
          <Link href="/calculators/debt-consolidation-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Debt Consolidation Calculator
          </Link>
          <Link href="/calculators/debt-payoff-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Debt Payoff Calculator
          </Link>
          <Link href="/calculators/auto-loan-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Auto Loan Calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
