"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
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
  HelpCircle,
  Clock,
  Layers,
  ArrowUpRight,
  Scale,
  RefreshCw,
} from "lucide-react";

export function EmiContentSection() {
  const faqList = [
    {
      question: "What is an Equated Monthly Installment (EMI)?",
      answer: "An Equated Monthly Installment (EMI) is a fixed monthly payment made by a borrower to a financial institution on a specified date each month until a loan is fully paid off. Each installment combines partial principal repayment and periodic interest charges.",
    },
    {
      question: "What is the difference between an EMI and a standard monthly loan payment?",
      answer: "There is no mathematical difference. 'EMI' is the standard term used internationally (particularly in India, the UK, and the GCC), while US lenders and borrowers conventionally use 'monthly loan payment' or 'fixed installment payment.' Both describe the exact same compounding annuity debt service.",
    },
    {
      question: "How is a monthly loan payment calculated mathematically?",
      answer: "It is calculated using the universal compounding annuity formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the borrowed principal balance, r is the periodic monthly interest rate (Annual Rate / 12 / 100), and n is the total number of monthly payment periods.",
    },
    {
      question: "How does loan tenure affect my monthly payment versus total interest?",
      answer: "A longer loan tenure (e.g. 7 years vs 3 years) lowers your required monthly payment by distributing principal repayment across more periods, but significantly increases cumulative lifetime interest. Shorter tenures raise monthly payments but maximize total interest savings.",
    },
    {
      question: "What happens if a loan carries a 0% interest rate?",
      answer: "Under a 0% promotional rate, the compounding annuity equation resolves linearly to M = P / n (principal divided by total months), resulting in exactly $0.00 in lifetime interest charges.",
    },
    {
      question: "How do extra principal prepayments reduce total loan interest?",
      answer: "Extra prepayments are credited directly against your unpaid principal balance. Lowering the outstanding principal balance immediately reduces future compounding interest in all subsequent billing periods.",
    },
    {
      question: "What is the difference between Reduce Term and Lower Monthly Payment?",
      answer: "'Reduce Term' keeps your scheduled monthly payment constant, directing extra capital toward principal to eliminate the debt months or years early. 'Reduce Payment' maintains the original maturity date and recalculates lower future monthly payments, improving immediate cash-flow flexibility.",
    },
    {
      question: "Why are flat-rate loans more expensive than reducing-balance loans?",
      answer: "Flat-rate loans calculate interest on the full initial principal for the entire loan life, even when 90% of the loan has already been repaid. Reducing-balance loans charge interest strictly on the remaining unpaid principal balance.",
    },
    {
      question: "How do processing fees and origination charges affect total borrowing cost?",
      answer: "Upfront administrative fees increase your overall cash outflow. Total loan cost is the sum of Principal + Cumulative Accrued Interest + Processing / Origination Fees.",
    },
    {
      question: "Can I estimate my borrowing capacity from a desired monthly budget?",
      answer: "Yes. The reverse loan solver inverts the annuity equation to estimate the maximum loan principal corresponding to your target monthly payment. Note that this is a mathematical estimation, not an official lender pre-approval.",
    },
  ];

  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200">
      {/* 1. What Is an Equated Monthly Installment (EMI)? */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            1. What Is an Equated Monthly Installment (EMI)?
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          An <strong className="text-slate-900 dark:text-slate-100">Equated Monthly Installment (EMI)</strong> is a fixed, periodic cash payment made by a borrower to a financial institution on a designated date each calendar month until a debt facility is fully amortized. Each installment represents a structured blend of two components:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Principal Repayment
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              The portion of the payment that directly reduces the outstanding principal balance owed to the lender, building equity and clearing the underlying debt.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Percent className="h-4 w-4" /> Interest Charges
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              The periodic cost of borrowing charged by the lender on the unpaid principal balance, calculated according to the note interest rate.
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs leading-relaxed text-blue-950 dark:text-blue-200 space-y-1">
          <strong className="block font-semibold">International vs. United States Terminology:</strong>
          <span>
            While the acronym <strong className="text-blue-700 dark:text-blue-300">EMI</strong> is standard banking terminology across India, the United Kingdom, the GCC, and Southeast Asia, United States retail banking conventionally refers to the exact same compounding mechanism as a <strong className="text-blue-700 dark:text-blue-300">fixed monthly loan payment</strong>, <strong className="text-blue-700 dark:text-blue-300">installment payment</strong>, or <strong className="text-blue-700 dark:text-blue-300">amortizing debt service</strong>. For debt facilities with custom non-monthly payment schedules, explore our{" "}
            <Link
              href="/calculators/loan-calculator"
              className="font-bold underline text-blue-700 dark:text-blue-300 hover:text-blue-800"
            >
              general loan payment calculator
            </Link>.
          </span>
        </div>
      </section>

      {/* 2. The Mathematical Loan Payment Formula */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Calculator className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            2. The Mathematical Loan Payment Formula
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Standard fixed-rate amortizing loans operate on compounding interest where periodic interest is assessed strictly against the unpaid principal balance. Under the fixed-rate reducing-balance model used by this calculator, the required periodic installment is determined by the universal compounding annuity equation:
        </p>

        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white font-mono text-center text-lg sm:text-xl font-bold tracking-wider shadow-md overflow-x-auto">
          {"M = P × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]"}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 font-mono text-sm block">M</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Monthly Payment (EMI)</span>
            <span className="text-slate-500 text-[11px] block">Periodic debt service paid every month</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm block">P</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Principal Loan Amount</span>
            <span className="text-slate-500 text-[11px] block">Total borrowed balance disbursed</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-amber-600 dark:text-amber-400 font-mono text-sm block">r</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Periodic Monthly Rate</span>
            <span className="text-slate-500 text-[11px] block">Annual Note Rate ÷ 12 ÷ 100</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-purple-600 dark:text-purple-400 font-mono text-sm block">n</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Total Periods (Months)</span>
            <span className="text-slate-500 text-[11px] block">(Years × 12) + Months</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">
            Zero-Interest Boundary Limit (r = 0.0%):
          </span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            When a loan carries a 0% promotional rate, the compounding annuity equation approaches a linear division limit:
          </p>
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono font-bold text-blue-600 dark:text-blue-400 text-center">
            {"lim_{r → 0} M = P / n"}
          </div>
          <p className="text-slate-500 text-[11px]">
            Under zero interest, the monthly payment is strictly equal to principal divided by the total number of periods, with cumulative lifetime interest equaling exactly $0.00. To inspect full ledger schedules, visit our{" "}
            <Link
              href="/calculators/amortization-calculator"
              className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
            >
              detailed loan amortization ledger
            </Link>.
          </p>
        </div>
      </section>

      {/* 3. Step-by-Step Worked Mathematical Calculation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Layers className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            3. Step-by-Step Worked Mathematical Calculation
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          To illustrate how compounding mechanics function in practice, let us calculate the monthly payment and total lifetime interest for a standard consumer installment loan:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">Baseline Loan Inputs:</span>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
            <li><strong>Principal Loan Amount (P):</strong> $20,000.00</li>
            <li><strong>Annual Nominal Interest Rate:</strong> 9.00%</li>
            <li><strong>Loan Tenure:</strong> 5 Years (n = 60 months)</li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 1: Compute Periodic Monthly Rate (r)</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">r = 9.00 / 12 / 100 = 0.0075</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 2: Compute Compounding Factor (1 + r)ⁿ</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">(1 + 0.0075)⁶⁰ = (1.0075)⁶⁰ ≈ 1.56568102</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 3: Solve Monthly Payment (M)</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">
              M = 20,000 × [ 0.0075 × 1.56568102 ] / [ 1.56568102 - 1 ] = 234.85215 / 0.56568102 ≈ <strong>$415.17</strong>
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 4: Total Lifetime Scheduled Outflow & Interest</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">
              Total Scheduled Outflow = $24,910.03 (using unrounded monthly debt service)
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
              Total Lifetime Interest = $24,910.03 - $20,000.00 = $4,910.03
            </span>
          </div>
        </div>
      </section>

      {/* 4. Reducing Balance vs. Flat Rate Interest */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Scale className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            4. Reducing Balance vs. Flat Rate Interest (The Hidden Cost Trap)
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          A critical lending distinction lies between <strong className="text-slate-900 dark:text-slate-100">Reducing-Balance Interest</strong> and <strong className="text-slate-900 dark:text-slate-100">Flat-Rate Interest</strong>. Flat-rate loans calculate interest on the full original principal for the entire loan term, regardless of how much debt has already been paid off.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
              <tr>
                <th className="p-3">Comparison Metric ($100k Loan, 10% Rate, 5 Years)</th>
                <th className="p-3 text-blue-600 dark:text-blue-400">Reducing-Balance (Standard)</th>
                <th className="p-3 text-red-600 dark:text-red-400">Flat-Rate Method (Expensive)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-medium">Interest Calculation Basis</td>
                <td className="p-3">Unpaid principal balance each month</td>
                <td className="p-3">Full initial $100,000 principal every year</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Monthly Installment Payment</td>
                <td className="p-3 font-bold font-mono text-emerald-600 dark:text-emerald-400">$2,124.70</td>
                <td className="p-3 font-bold font-mono text-red-600 dark:text-red-400">$2,500.00</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Total Lifetime Interest Paid</td>
                <td className="p-3 font-bold font-mono text-emerald-600 dark:text-emerald-400">$27,482.27</td>
                <td className="p-3 font-bold font-mono text-red-600 dark:text-red-400">$50,000.00</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Total Cost of Borrowing</td>
                <td className="p-3 font-mono font-bold">$127,482.27</td>
                <td className="p-3 font-mono font-bold text-red-600 dark:text-red-400">$150,000.00</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Extra Interest Penalty</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">Baseline</td>
                <td className="p-3 font-bold text-red-600 dark:text-red-400">+$22,517.73 (+81.9%)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-1">
          <span className="font-bold block">Important Effective Rate Qualification:</span>
          <span>
            Under a 5-year loan using the assumptions in this example, the flat-rate cost corresponds to an approximate effective reducing annualized rate of <strong className="text-amber-800 dark:text-amber-300">17.9%</strong>. The equivalent rate changes with loan term and compounding frequency. If you are considering balance transfers or lower interest rate refinancing, evaluate your numbers with our{" "}
            <Link
              href="/calculators/refinance-calculator"
              className="font-bold underline text-amber-800 dark:text-amber-300 hover:text-amber-900"
            >
              mortgage and loan refinance calculator
            </Link>.
          </span>
        </div>
      </section>

      {/* 5. Strategic Prepayments (Reduce Term vs. Lower Payment) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <TrendingDown className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            5. Strategic Prepayments (Shortening Term vs. Lowering Monthly Payment)
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          When making extra principal prepayments, borrowers can choose between two main strategies in our calculation engine:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
              Strategy A: Reduce Tenure (Shorten Term)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Your monthly scheduled payment remains unchanged. Extra funds reduce the outstanding principal balance immediately, eliminating future billing periods and finishing your debt months or years ahead of schedule.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
              Strategy B: Reduce EMI (Lower Monthly Payment)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Your original maturity date remains unchanged. The lender re-amortizes the smaller remaining principal balance over the remaining term, lowering your future required monthly payments and freeing up immediate cash flow.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">
            Mathematical Prepayment Comparison ($100k Loan @ 8.0% over 10 Years, $10k Lump Sum at Month 12):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-semibold text-slate-500 block">Baseline (No Prepay)</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 block font-mono">EMI: $1,213.28</span>
              <span className="text-slate-500 block font-mono">Interest: $45,593.11</span>
              <span className="text-slate-400 text-[10px] block">Duration: 120 Months</span>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-semibold text-blue-600 dark:text-blue-400 block">Reduce Tenure</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 block font-mono">EMI: $1,213.28</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block font-mono">Saves $9,485.61</span>
              <span className="text-blue-600 dark:text-blue-400 text-[10px] font-semibold block">Saves 16 Months (Payoff: 104 mo)</span>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">Reduce Monthly Payment</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block font-mono">New EMI: $1,083.09</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block font-mono">Saves $4,060.21</span>
              <span className="text-slate-500 text-[10px] block">Saves $130.19/mo (120 Months)</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            For the same loan and extra-payment amount, keeping the scheduled payment unchanged while directing extra capital to principal produces greater total interest savings than re-amortizing to a lower payment because the loan is paid off sooner. If you are balancing multiple loan obligations, use our{" "}
            <Link
              href="/calculators/debt-payoff-calculator"
              className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
            >
              multi-debt elimination and snowball calculator
            </Link>{" "}
            to accelerate paydown.
          </p>
        </div>
      </section>

      {/* 6. Processing Fees & Total Cost Accounting */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            6. Processing Fees, Origination Charges, and Total Cost Accounting
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Lenders often assess upfront administrative charges, such as loan origination fees, application costs, or documentation fees. In our calculation engine, processing fees are additive:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">Additive Total Cost Formula:</span>
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono font-bold text-center text-blue-600 dark:text-blue-400">
            {"Total Cost = Principal + Total Interest + (Principal × Fee Rate %) + Flat Fee"}
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Depending on the lender and loan program, origination fees may be deducted upfront from loan proceeds, paid out of pocket at closing, or financed into the loan balance. The calculator models fees additively into total borrowing cost without capitalizing them into ongoing interest. Borrowers evaluating fixed-rate personal debt can model origination fees using our{" "}
            <Link
              href="/calculators/personal-loan-calculator"
              className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
            >
              unsecured personal loan repayment calculator
            </Link>.
          </p>
        </div>
      </section>

      {/* 7. Loan Term Trade-offs (3-Year vs. 5-Year vs. 7-Year) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Clock className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            7. Loan Term Trade-offs (Monthly Cash Flow vs. Total Interest)
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Extending loan tenure compresses monthly required payments by spreading principal repayment across more periods, but creates a non-linear surge in cumulative interest charges:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
              <tr>
                <th className="p-3">Loan Term ($30k Loan @ 7.50% Fixed Rate)</th>
                <th className="p-3">Monthly Payment</th>
                <th className="p-3">Total Lifetime Interest</th>
                <th className="p-3">Total Lifetime Cost</th>
                <th className="p-3">Trade-off Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">3 Years (36 mo)</td>
                <td className="p-3 font-mono font-bold">$933.19</td>
                <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">$3,594.72</td>
                <td className="p-3 font-mono">$33,594.72</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Lowest total cost</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">5 Years (60 mo)</td>
                <td className="p-3 font-mono font-bold">$601.14</td>
                <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">$6,068.31</td>
                <td className="p-3 font-mono">$36,068.31</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Saves $332.05/mo; adds +$2,473.59 interest (+68.8%)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">7 Years (84 mo)</td>
                <td className="p-3 font-mono font-bold">$460.15</td>
                <td className="p-3 font-mono font-bold text-red-600 dark:text-red-400">$8,652.46</td>
                <td className="p-3 font-mono">$38,652.46</td>
                <td className="p-3 text-red-600 dark:text-red-400 font-semibold">Saves $473.04/mo; adds +$5,057.74 interest (+140.7%)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500">
          To include dealer documentation fees and vehicle trade-in equity, use our{" "}
          <Link
            href="/calculators/auto-loan-calculator"
            className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
          >
            auto financing and sales tax calculator
          </Link>.
        </p>
      </section>

      {/* 8. Reverse Loan Calculation & Affordability Rules */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <RefreshCw className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            8. Reverse Loan Calculation & Affordability Rules
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          When budgeting backward from a fixed monthly cash-flow limit, our reverse solver inverts the annuity equation to estimate maximum borrowing principal:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono font-bold text-center text-blue-600 dark:text-blue-400">
            {"P_max = M_desired × [ (1 + r)ⁿ - 1 ] / [ r(1 + r)ⁿ ]"}
          </div>
          <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800/60 text-blue-950 dark:text-blue-200 space-y-1">
            <strong className="block font-semibold">Underwriting Benchmarks (Debt-to-Income):</strong>
            <span>
              The 28% front-end and 36%–43% back-end DTI benchmarks represent standard underwriting reference ranges. They do not constitute formal lending qualification or guaranteed loan approval. If you are financing residential property with property taxes and PMI, use our{" "}
              <Link
                href="/calculators/mortgage-calculator"
                className="font-bold underline text-blue-700 dark:text-blue-300 hover:text-blue-800"
              >
                comprehensive real estate mortgage calculator
              </Link>.
            </span>
          </div>
        </div>
      </section>

      {/* 9. Common Calculation Mistakes */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            9. Common Borrowing & Calculation Pitfalls
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="font-semibold text-slate-900 dark:text-slate-100 block">1. Confusing Flat Rate with Reducing APR</strong>
            <p className="text-slate-600 dark:text-slate-300">
              Assuming a 10% flat rate is identical to a 10% reducing APR. As proven above, flat rates cost nearly twice as much in total interest.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="font-semibold text-slate-900 dark:text-slate-100 block">2. Overlooking Origination Deductions</strong>
            <p className="text-slate-600 dark:text-slate-300">
              Failing to account for upfront fees deducted from gross disbursement, resulting in less actual net cash in your bank account.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="font-semibold text-slate-900 dark:text-slate-100 block">3. Focusing Only on Monthly Payment</strong>
            <p className="text-slate-600 dark:text-slate-300">
              Extending loan terms to lower monthly payments while ignoring the dramatic increase in lifetime compounding interest.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <strong className="font-semibold text-slate-900 dark:text-slate-100 block">4. Prepayment Allocation Errors</strong>
            <p className="text-slate-600 dark:text-slate-300">
              Failing to instruct your lender that extra payments must be applied strictly to principal reduction rather than advancing scheduled payments.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Related Financial Calculators */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <ArrowUpRight className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            10. Explore Related Financial Calculators
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <Link
            href="/calculators/loan-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Loan Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Multi-schedule debt facility modeling</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/personal-loan-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Personal Loan Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Unsecured borrowing & origination fees</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/auto-loan-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Auto Loan Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Vehicle trade-in & sales tax accounting</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/mortgage-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Mortgage Calculator
              </span>
              <span className="text-slate-500 text-[11px]">PITI, PMI cancellation, and escrow</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/amortization-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Amortization Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Granular period-by-period ledgers</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/calculators/debt-payoff-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                Debt Payoff Calculator
              </span>
              <span className="text-slate-500 text-[11px]">Snowball and avalanche payoff plans</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* 11. Frequently Asked Questions */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            11. Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqList.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5"
            >
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {faq.question}
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Methodology & Financial Disclaimer */}
      <section className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-[11px] leading-relaxed text-slate-500 space-y-1.5">
        <strong className="block font-semibold text-slate-700 dark:text-slate-300">
          Calculation Methodology & Disclaimers:
        </strong>
        <p>
          Calculations execute 100% client-side in your browser using standard IEEE 754 floating-point reducing-balance compounding annuity equations. No financial input data is transmitted to external servers. This calculator is provided for educational and analytical purposes only and does not constitute formal credit underwriting, financial planning, or a guarantee of loan approval.
        </p>
      </section>
    </div>
  );
}

export default EmiContentSection;
