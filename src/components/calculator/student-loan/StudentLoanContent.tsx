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
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

export function StudentLoanContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is the difference between subsidized and unsubsidized student loans?",
      a: "Direct Subsidized Loans are need-based federal loans where the U.S. Department of Education pays the interest while you are enrolled in school at least half-time, during the 6-month grace period, and during deferment. Direct Unsubsidized Loans accrue interest from the date of disbursement.",
    },
    {
      q: "What is Public Service Loan Forgiveness (PSLF)?",
      a: "PSLF forgives the remaining balance on your Direct Loans after you make 120 qualifying monthly payments under an accepted income-driven repayment plan while working full-time for a qualifying U.S. federal, state, local government, or 501(c)(3) non-profit employer.",
    },
    {
      q: "How does making extra monthly payments accelerate student loan payoff?",
      a: "Extra payments reduce your principal balance directly, lowering total interest accrual over time. For example, paying an extra $150/month on a $30,000 loan at 6.8% reduces your payoff horizon from 10 years down to 6 years 2 months, saving $4,421 in interest.",
    },
    {
      q: "What is an Income-Driven Repayment (IDR) plan?",
      a: "IDR plans set your monthly payment based on your income and family size (typically 5% to 15% of discretionary income). Remaining balances are forgiven after 20 to 25 years of qualifying payments.",
    },
    {
      q: "Should I refinance my federal student loans into private student loans?",
      a: "Refinancing can lower your interest rate if you have strong credit and income. However, refinancing federal loans into private loans permanently waives federal protections, including PSLF eligibility, IDR plans, deferment, and forbearance.",
    },
    {
      q: "What is interest capitalization?",
      a: "Interest capitalization occurs when unpaid accrued interest is added to your principal loan balance. This increases the total principal balance upon which future interest is calculated.",
    },
    {
      q: "What is the student loan grace period?",
      a: "A grace period is a set time (usually 6 months) after you graduate, leave school, or drop below half-time enrollment before you must begin making required monthly loan payments.",
    },
    {
      q: "Can student loans be discharged in bankruptcy?",
      a: "Discharging student loans in bankruptcy is difficult and requires proving 'undue hardship' through an adversary proceeding in bankruptcy court.",
    },
    {
      q: "What is Direct PLUS Loan financing?",
      a: "PLUS loans are federal loans available to graduate students (Grad PLUS) and parents of dependent undergraduate students (Parent PLUS) to cover educational expenses not met by other financial aid.",
    },
    {
      q: "What is the 0.25% interest rate discount for auto-debit?",
      a: "Most federal and private loan servicers offer a 0.25% interest rate deduction when you sign up for automatic recurring monthly payments from your checking account.",
    },
    {
      q: "How does the SAVE (Saving on a Valuable Education) plan work?",
      a: "The SAVE plan is an income-driven repayment plan that caps undergraduate payments at 5% of discretionary income, eliminates unpaid monthly interest accumulation, and forgives small initial balances in 10 years.",
    },
    {
      q: "Is student loan interest tax deductible?",
      a: "Yes. You may deduct up to $2,500 of eligible student loan interest paid per year as an above-the-line tax deduction, subject to MAGI income limits.",
    },
    {
      q: "What is a Student Loan Consolidation?",
      a: "Direct Consolidation allows you to combine multiple federal education loans into a single Direct Consolidation Loan with a fixed interest rate equal to the weighted average of your existing rates rounded up to the nearest 1/8th of 1%.",
    },
    {
      q: "What happens if I default on my student loans?",
      a: "Defaulting on federal student loans (270 days past due) triggers collections, wage garnishment, tax refund offset, loss of eligibility for federal student aid, and credit score damage.",
    },
    {
      q: "How does expected salary relate to student loan borrowing?",
      a: "A financial rule of thumb is to limit total undergraduate debt to less than your expected first-year starting salary post-graduation.",
    },
  ];

  return (
    <div className="mt-12 space-y-12  dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200">
      {/* Article Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Higher Education Financial Guide
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Student Loan Calculator Guide: Repayment Plans, Forgiveness &amp; Projections
        </h1>
        <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl">
          Student loans are significant long-term financial commitments. Understanding federal loan programs, in-school interest accrual, grace periods, extra payment payoff acceleration, federal repayment options, and refinancing strategies allows borrowers to minimize interest costs and achieve financial freedom.
        </p>
      </section>

      {/* Main Educational Content with Required Headings */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">What Is a Student Loan?</h2>
          <p>
            A student loan is money borrowed from the federal government or private financial institutions to pay for post-secondary education costs, including tuition, fees, room and board, books, and educational supplies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">How Student Loans Work</h2>
          <p>
            Student loans disburse funds per academic term. Repayment begins after a post-graduation grace period. Monthly payments are calculated based on principal, interest rate, and chosen repayment plan length.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Federal Student Loans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border space-y-1">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Direct Subsidized Loans</span>
              <p className="text-xs">Need-based federal loans for undergraduates. The U.S. government pays accrued interest while enrolled at least half-time, during grace periods, and during deferment.</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border space-y-1">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Direct Unsubsidized Loans</span>
              <p className="text-xs">Non-need-based loans available to undergraduate and graduate students. Interest accrues continuously from the date of disbursement.</p>
            </div>
          </div>
        </section>

        {/* Federal Repayment Plans Table matching Calculator.net PDF Page 3! */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Student Loan Repayment Options (Calculator.net Reference Table)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <thead className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                <tr>
                  <th className="p-3">Plans</th>
                  <th className="p-3">Loan Length</th>
                  <th className="p-3">Monthly Payment</th>
                  <th className="p-3">Qualified For</th>
                  <th className="p-3">Loan Forgiveness?</th>
                </tr>
              </thead>
              <tbody className=" dark:divide-zinc-800">
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40">
                  <td className="p-3 font-bold">Standard</td>
                  <td className="p-3">10 years</td>
                  <td className="p-3">Fixed</td>
                  <td className="p-3">All borrowers</td>
                  <td className="p-3 font-semibold text-blue-600">No</td>
                </tr>
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40">
                  <td className="p-3 font-bold">Graduated</td>
                  <td className="p-3">10 years</td>
                  <td className="p-3">Increase every two years</td>
                  <td className="p-3">All borrowers</td>
                  <td className="p-3 font-semibold text-blue-600">No</td>
                </tr>
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40">
                  <td className="p-3 font-bold">Extended</td>
                  <td className="p-3">25 years</td>
                  <td className="p-3">10% or 15% of discretionary income</td>
                  <td className="p-3">Direct loans with &gt;$30,000 balance</td>
                  <td className="p-3 font-semibold text-blue-600">No</td>
                </tr>
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40">
                  <td className="p-3 font-bold">Income-Based (IBR)</td>
                  <td className="p-3">20 or 25 years</td>
                  <td className="p-3">10% or 15% of discretionary income, capped at Standard plan</td>
                  <td className="p-3">Partial financial hardship</td>
                  <td className="p-3 font-semibold text-blue-600">Yes</td>
                </tr>
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40">
                  <td className="p-3 font-bold">PAYE / SAVE</td>
                  <td className="p-3">20 years</td>
                  <td className="p-3">5% to 10% of discretionary income</td>
                  <td className="p-3">Direct loan borrowers with financial hardship</td>
                  <td className="p-3 font-semibold text-blue-600">Yes</td>
                </tr>
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40">
                  <td className="p-3 font-bold">Income-Contingent (ICR)</td>
                  <td className="p-3">25 years</td>
                  <td className="p-3">Lesser of 20% of discretionary income or 12-year fixed plan</td>
                  <td className="p-3">Any Direct Loan borrower</td>
                  <td className="p-3 font-semibold text-blue-600">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Baseline Calculation Examples</h2>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border font-sans tabular-nums text-xs space-y-1">
            <div className="font-bold font-sans text-blue-600">Section A Baseline ($30,000 @ 6.8% 10 Yrs):</div>
            <div>Monthly Repayment = $345.24/mo | Total Interest = $11,428.92 | Total Payments = $41,428.92</div>
            <div className="font-bold font-sans text-blue-600 pt-2">Section B Baseline Extra Payments ($350/mo + $150 extra):</div>
            <div>Accelerated Payoff = 6 Years 2 Months (Saved 3 Yrs 8 Mos) | Interest Saved = $4,421.28</div>
            <div className="font-bold font-sans text-blue-600 pt-2">Section C Projection ($20k bal + $10k/yr x 2 yrs @ 6.8%):</div>
            <div>Balance at Grad = $44,263.99 | Balance After Grace = $45,790.44 | Monthly = $526.96</div>
          </div>
        </section>
      </div>

      {/* 15+ FAQ Accordion Section */}
      <section className="space-y-6  dark:border-zinc-800 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions (15 Key Student Loan Insights)
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
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Related Educational &amp; Financial Calculators</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link href="/calculators/personal-loan-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Personal Loan Calculator
          </Link>
          <Link href="/calculators/loan-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Loan Calculator
          </Link>
          <Link href="/calculators/budget-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Budget Calculator
          </Link>
          <Link href="/calculators/savings-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Savings Calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
