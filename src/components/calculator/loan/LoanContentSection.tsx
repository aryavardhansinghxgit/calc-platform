"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Percent,
  Layers,
  Clock,
  Zap,
  TrendingDown,
  DollarSign,
  Scale,
  ShieldCheck,
  HelpCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export function LoanContentSection() {
  const faqList = [
    {
      question: "What is an amortized loan?",
      answer: "An amortized loan is an installment debt structure where a borrower repays borrowed principal along with interest charges through regularly scheduled payments over a fixed duration. Each payment covers the interest accrued during the period, with the remainder reducing the outstanding principal balance until the debt is fully retired."
    },
    {
      question: "How is a monthly loan payment calculated?",
      answer: "Monthly payments are calculated using the standard amortization formula: PMT = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the principal loan amount, r is the monthly interest rate (annual rate / 12 / 100), and n is the total number of payment months (years × 12)."
    },
    {
      question: "What is the difference between nominal interest rate and APR?",
      answer: "The nominal interest rate is the base percentage charged on the outstanding loan balance. The Annual Percentage Rate (APR) is a standardized regulatory metric under U.S. Truth in Lending Act (TILA) Regulation Z that measures the total cost of credit, incorporating both the nominal rate and applicable prepaid finance charges (such as origination points and processing fees)."
    },
    {
      question: "What is the difference between Regular Biweekly and Accelerated Biweekly payments?",
      answer: "Under Regular Biweekly payments (calculated in this tool's frequency dropdown), the annual interest rate is divided across 26 equal periods, amortizing the debt over the full scheduled term. Under Accelerated Biweekly payments, the borrower pays exactly half of the standard monthly payment every two weeks, generating 26 half-payments (equal to 13 full payments per year) to pay off the loan years early."
    },
    {
      question: "How do extra monthly payments reduce total loan interest?",
      answer: "In this calculator's model, extra payments apply directly to the outstanding principal balance. By reducing principal ahead of schedule, less interest accrues in subsequent compounding cycles, shortening the required repayment term and lowering cumulative interest charges."
    },
    {
      question: "How does loan term length affect monthly payment and total interest?",
      answer: "Shorter loan terms require higher monthly payments but generate significantly lower total interest charges because principal is retired faster. Longer loan terms lower required monthly payments, enhancing short-term cash flow flexibility, but increase total interest paid over the life of the debt."
    },
    {
      question: "Can I estimate how much loan principal I can afford?",
      answer: "Mode 2 (Loan Amount Solver) calculates the estimated loan principal corresponding mathematically to a selected monthly budget, interest rate, and term length. However, this is a mathematical reverse calculation and does not evaluate income, debt-to-income (DTI) ratios, or lender underwriting qualification criteria."
    },
    {
      question: "Does a 740+ credit score guarantee prime interest rates?",
      answer: "A credit score of 740 or higher is a commonly referenced benchmark for prime credit tiers, which frequently corresponds to competitive loan pricing. However, credit scores do not guarantee approval or specific rate tiers; lenders evaluate additional underwriting factors including income stability, employment history, collateral value, and debt obligations."
    },
    {
      question: "Can I pay off a consumer loan early without prepayment penalties?",
      answer: "Whether a loan permits penalty-free early repayment depends on the loan agreement, credit product, lender, and applicable state or federal statutes. While federal regulations restrict prepayment penalties on most qualified residential mortgages, borrowers should always review the specific prepayment provisions in their promissory note."
    },
    {
      question: "Does refinancing a loan always save money?",
      answer: "Refinancing may lower monthly payments, reduce interest rates, or decrease total lifetime borrowing costs depending on new loan terms, closing costs, borrower credit standing, and prevailing market rates. Borrowers should evaluate closing costs against monthly interest savings to determine the financial break-even timeline."
    }
  ];

  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 mt-6">
      {/* 1. What Is an Amortized Installment Loan? */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            1. What Is an Amortized Installment Loan?
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          An installment loan is a contractual financial arrangement where a borrower receives an upfront sum of capital (the loan principal) from a lender and agrees to repay the debt through regularly scheduled periodic installments over a defined term.
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          For a standard amortizing installment loan, each scheduled payment remains fixed in total dollar amount, but the underlying mathematical composition shifts with every compounding cycle:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Principal Allocation:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The portion of the payment that directly reduces the outstanding loan balance. Paying down principal builds equity and diminishes future interest accrual.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Interest Allocation:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The fee charged by the lender for borrowing capital, calculated by multiplying the outstanding principal balance by the periodic interest rate.
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          As previous payments systematically reduce the remaining principal balance, less interest accrues in subsequent cycles. Consequently, an increasingly larger percentage of each subsequent payment is directed toward principal reduction until the debt is fully retired at maturity.
        </p>
      </section>

      {/* 2. Core Amortization Payment Formula */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Calculator className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            2. The Core Amortization Payment Formula
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          The standard mathematical formula used to calculate the fixed periodic payment on an amortized installment loan is:
        </p>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
          <div className="font-mono text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400">
            {"PMT = P × [r(1 + r)ⁿ] / [(1 + r)ⁿ − 1]"}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 font-mono text-sm block">PMT</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Periodic Payment</span>
            <span className="text-slate-500 text-[11px] block">Fixed payment per cycle</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm block">P</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Loan Principal</span>
            <span className="text-slate-500 text-[11px] block">Initial amount borrowed</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-purple-600 dark:text-purple-400 font-mono text-sm block">r</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Periodic Rate</span>
            <span className="text-slate-500 text-[11px] block">Annual rate / periods per yr</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 font-mono text-sm block">n</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Total Periods</span>
            <span className="text-slate-500 text-[11px] block">Years × periods per yr</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">
            Zero-Interest Limit Case (r = 0.0%):
          </span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            When borrowing capital at a zero-percent interest rate (r = 0), the equation simplifies to equal division of principal across all payment cycles:
          </p>
          <div className="p-2 rounded-lg bg-white dark:bg-slate-900 font-mono font-bold text-blue-600 dark:text-blue-400 text-center">
            {"lim_{r → 0} PMT = P / n"}
          </div>
          <p className="text-slate-500 text-[11px]">
            Under a 0% interest rate, total interest is identically $0.00, and total repayment exactly equals the original loan principal.
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
          To illustrate amortization mechanics, let us evaluate the mathematical model under a verified baseline scenario:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">Verified Calculator Scenario:</span>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
            <li><strong>Loan Principal (P):</strong> $25,000.00</li>
            <li><strong>Annual Nominal Interest Rate:</strong> 7.50% (0.075)</li>
            <li><strong>Loan Term:</strong> 5 Years (60 Months)</li>
            <li><strong>Payment Frequency:</strong> Monthly (12 cycles/year)</li>
            <li><strong>Extra Monthly Payment:</strong> $0.00</li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 1: Compute Periodic Monthly Rate (r)</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">r = 0.075 / 12 = 0.00625 (0.625% per month)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 2: Compute Compounding Factor (1 + r)ⁿ</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">(1 + 0.00625)⁶⁰ ≈ 1.453294</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 3: Solve Monthly Payment (PMT)</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">
              PMT = $25,000 × (0.00625 × 1.453294) / (1.453294 − 1) = <strong>$500.95</strong>
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 font-bold block">Step 4: Decompose Total Repayment & Interest</strong>
            <span className="font-mono text-slate-700 dark:text-slate-300 block">
              Using the calculator&apos;s full-precision amortization schedule, total scheduled repayment is <strong>$30,056.92</strong>.
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
              Total Interest Paid = $30,056.92 − $25,000.00 = <strong>$5,056.92</strong> (Interest Share: 16.8%)
            </span>
          </div>
        </div>

        {/* First Year Amortization Table */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
            First-Year Amortization Schedule (Months 1–12):
          </span>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
                <tr>
                  <th className="p-2.5">Period</th>
                  <th className="p-2.5">Date</th>
                  <th className="p-2.5">Beginning Balance</th>
                  <th className="p-2.5">Payment</th>
                  <th className="p-2.5">Principal Paid</th>
                  <th className="p-2.5">Interest Paid</th>
                  <th className="p-2.5">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-mono">
                <tr>
                  <td className="p-2.5 font-sans font-semibold">Month 1</td>
                  <td className="p-2.5 font-sans">Sep 2026</td>
                  <td className="p-2.5">$25,000.00</td>
                  <td className="p-2.5 font-bold">$500.95</td>
                  <td className="p-2.5">$344.70</td>
                  <td className="p-2.5 text-amber-600 dark:text-amber-400">$156.25</td>
                  <td className="p-2.5 font-semibold">$24,655.30</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold">Month 2</td>
                  <td className="p-2.5 font-sans">Oct 2026</td>
                  <td className="p-2.5">$24,655.30</td>
                  <td className="p-2.5 font-bold">$500.95</td>
                  <td className="p-2.5">$346.85</td>
                  <td className="p-2.5 text-amber-600 dark:text-amber-400">$154.10</td>
                  <td className="p-2.5 font-semibold">$24,308.45</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold">Month 3</td>
                  <td className="p-2.5 font-sans">Nov 2026</td>
                  <td className="p-2.5">$24,308.45</td>
                  <td className="p-2.5 font-bold">$500.95</td>
                  <td className="p-2.5">$349.02</td>
                  <td className="p-2.5 text-amber-600 dark:text-amber-400">$151.93</td>
                  <td className="p-2.5 font-semibold">$23,959.43</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold">Month 4</td>
                  <td className="p-2.5 font-sans">Dec 2026</td>
                  <td className="p-2.5">$23,959.43</td>
                  <td className="p-2.5 font-bold">$500.95</td>
                  <td className="p-2.5">$351.20</td>
                  <td className="p-2.5 text-amber-600 dark:text-amber-400">$149.75</td>
                  <td className="p-2.5 font-semibold">$23,608.22</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold">Month 5</td>
                  <td className="p-2.5 font-sans">Jan 2027</td>
                  <td className="p-2.5">$23,608.22</td>
                  <td className="p-2.5 font-bold">$500.95</td>
                  <td className="p-2.5">$353.40</td>
                  <td className="p-2.5 text-amber-600 dark:text-amber-400">$147.55</td>
                  <td className="p-2.5 font-semibold">$23,254.83</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold">Month 6</td>
                  <td className="p-2.5 font-sans">Feb 2027</td>
                  <td className="p-2.5">$23,254.83</td>
                  <td className="p-2.5 font-bold">$500.95</td>
                  <td className="p-2.5">$355.61</td>
                  <td className="p-2.5 text-amber-600 dark:text-amber-400">$145.34</td>
                  <td className="p-2.5 font-semibold">$22,899.22</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold">Month 7</td>
                  <td className="p-2.5 font-sans">Mar 2027</td>
                  <td className="p-2.5">$22,899.22</td>
                  <td className="p-2.5 font-bold">$500.95</td>
                  <td className="p-2.5">$357.83</td>
                  <td className="p-2.5 text-amber-600 dark:text-amber-400">$143.12</td>
                  <td className="p-2.5 font-semibold">$22,541.39</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold">Month 8</td>
                  <td className="p-2.5 font-sans">Apr 2027</td>
                  <td className="p-2.5">$22,541.39</td>
                  <td className="p-2.5 font-bold">$500.95</td>
                  <td className="p-2.5">$360.07</td>
                  <td className="p-2.5 text-amber-600 dark:text-amber-400">$140.88</td>
                  <td className="p-2.5 font-semibold">$22,181.33</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold">Month 9</td>
                  <td className="p-2.5 font-sans">May 2027</td>
                  <td className="p-2.5">$22,181.33</td>
                  <td className="p-2.5 font-bold">$500.95</td>
                  <td className="p-2.5">$362.32</td>
                  <td className="p-2.5 text-amber-600 dark:text-amber-400">$138.63</td>
                  <td className="p-2.5 font-semibold">$21,819.01</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold">Month 10</td>
                  <td className="p-2.5 font-sans">Jun 2027</td>
                  <td className="p-2.5">$21,819.01</td>
                  <td className="p-2.5 font-bold">$500.95</td>
                  <td className="p-2.5">$364.58</td>
                  <td className="p-2.5 text-amber-600 dark:text-amber-400">$136.37</td>
                  <td className="p-2.5 font-semibold">$21,454.43</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold">Month 11</td>
                  <td className="p-2.5 font-sans">Jul 2027</td>
                  <td className="p-2.5">$21,454.43</td>
                  <td className="p-2.5 font-bold">$500.95</td>
                  <td className="p-2.5">$366.86</td>
                  <td className="p-2.5 text-amber-600 dark:text-amber-400">$134.09</td>
                  <td className="p-2.5 font-semibold">$21,087.57</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold">Month 12</td>
                  <td className="p-2.5 font-sans">Aug 2027</td>
                  <td className="p-2.5">$21,087.57</td>
                  <td className="p-2.5 font-bold">$500.95</td>
                  <td className="p-2.5">$369.15</td>
                  <td className="p-2.5 text-amber-600 dark:text-amber-400">$131.80</td>
                  <td className="p-2.5 font-semibold">$20,718.42</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Payment Frequency: Monthly vs Biweekly vs Weekly */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Percent className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            4. Payment Frequency: Monthly vs. Regular Biweekly vs. Weekly
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Payment frequency determines how often payments are submitted and how frequently accrued interest is reconciled against the outstanding principal. Under identical principal ($25,000.00), interest rate (7.50%), and loan duration (5 years), the mathematical engine models the following schedules:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
              <tr>
                <th className="p-3">Compounding Schedule</th>
                <th className="p-3">Periods / Year (m)</th>
                <th className="p-3">Periodic Payment</th>
                <th className="p-3">Total Payments Count</th>
                <th className="p-3">Total Repayment</th>
                <th className="p-3">Cumulative Interest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-mono">
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Monthly</td>
                <td className="p-3">12</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">$500.95</td>
                <td className="p-3">60</td>
                <td className="p-3">$30,056.92</td>
                <td className="p-3 text-amber-600 dark:text-amber-400">$5,056.92</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Regular Biweekly</td>
                <td className="p-3">26</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">$230.89</td>
                <td className="p-3">130</td>
                <td className="p-3">$30,015.41</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$5,015.41</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">Weekly</td>
                <td className="p-3">52</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">$115.38</td>
                <td className="p-3">260</td>
                <td className="p-3">$29,997.60</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$4,997.60</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500">
          Switching from monthly to regular biweekly payments reduces lifetime interest charges by <strong>$41.51</strong> over 5 years. Because interest is compounded and principal is reduced every 14 days rather than every 30 days, the average balance subjected to interest charges is marginally lower.
        </p>
      </section>

      {/* 5. Regular Biweekly vs Accelerated Biweekly */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Zap className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            5. Regular Biweekly vs. Accelerated Biweekly Payments
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          A common point of confusion in consumer lending is the operational difference between <strong>Regular Biweekly</strong> and <strong>Accelerated Biweekly</strong> payment structures:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">1. Regular Biweekly (In Dropdown):</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The annual nominal rate is divided across 26 periods (r / 26), and the payment is amortized over the full loan term (26 × Years). For our baseline loan, this payment is <strong>$230.89</strong>, taking exactly 5.0 years (130 payments) to retire.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">2. Accelerated Biweekly (Strategy):</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The borrower divides the standard monthly payment in half ($500.95 / 2 = <strong>$250.48</strong>) and pays that every two weeks. Because there are 26 biweekly periods, paying 26 half-payments equals <strong>13 full monthly payments per year</strong>, paying off the loan in ~51 months and saving <strong>$823.40</strong> in interest.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs leading-relaxed text-blue-950 dark:text-blue-200">
          <strong>Implementation Note:</strong> This calculator&apos;s frequency dropdown models <strong>Regular Biweekly</strong> ($230.89). Using a monthly schedule with an additional principal amount can approximate the annual principal contribution of an accelerated-biweekly strategy, but it does not change the payment timing to biweekly.
        </div>
      </section>

      {/* 6. How Extra Monthly Payments Reduce Total Cost */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <TrendingDown className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            6. How Extra Monthly Payments Reduce Total Interest
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          In this calculator&apos;s model, the extra payment is applied to the remaining principal. By reducing the balance ahead of schedule, less interest accrues in subsequent compounding cycles, shortening the repayment term and lowering cumulative borrowing costs. Actual lender treatment of additional payments depends on the loan agreement and servicing rules.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
              <tr>
                <th className="p-3">Extra Monthly Payment</th>
                <th className="p-3">Actual Payoff Time</th>
                <th className="p-3">Total Interest Paid</th>
                <th className="p-3">Total Interest Saved</th>
                <th className="p-3">Time Saved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-mono">
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">+$0 / month</td>
                <td className="p-3">60 Months</td>
                <td className="p-3">$5,056.92</td>
                <td className="p-3">$0.00</td>
                <td className="p-3">0 Months</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">+$50 / month</td>
                <td className="p-3">54 Months</td>
                <td className="p-3">$4,582.14</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$474.78</td>
                <td className="p-3 font-bold">6 Months</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">+$100 / month</td>
                <td className="p-3">50 Months</td>
                <td className="p-3">$4,196.40</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$860.52</td>
                <td className="p-3 font-bold">10 Months</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">+$200 / month</td>
                <td className="p-3">43 Months</td>
                <td className="p-3">$3,588.92</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$1,468.00</td>
                <td className="p-3 font-bold">17 Months</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">+$500 / month</td>
                <td className="p-3">27 Months</td>
                <td className="p-3">$2,197.80</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+$2,859.12</td>
                <td className="p-3 font-bold">33 Months</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500">
          To analyze multi-debt payoff acceleration across credit cards and loans using Snowball or Avalanche strategies, explore our{" "}
          <Link
            href="/calculators/debt-payoff-calculator"
            className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
          >
            debt payoff calculator
          </Link>.
        </p>
      </section>

      {/* 7. Nominal Interest Rate vs Regulatory APR */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Scale className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            7. Nominal Interest Rate vs. Regulatory APR
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Borrowers often encounter two distinct rate metrics on loan estimates and credit agreements:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Nominal Interest Rate (Fee-Free):</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The contracted annual percentage charged on the outstanding principal balance. In this calculator, the metric labeled <strong>Nominal APR (Fee-Free)</strong> represents this nominal rate before upfront financing charges are incorporated.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Regulatory Consumer APR (TILA / Reg Z):</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Under U.S. federal lending regulations enforced by the Consumer Financial Protection Bureau (CFPB), the Annual Percentage Rate (APR) measures the standardized annual cost of credit. Applicable finance charges included under Regulation Z (such as origination points and processing fees) can affect the disclosed APR.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Because this general calculator does not accept inputs for origination points or closing charges, its output should not be interpreted as an official regulatory loan disclosure. To model exact actuarial APR including upfront points and closing fees, use our dedicated{" "}
          <Link
            href="/calculators/apr-calculator"
            className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700"
          >
            APR calculator
          </Link>.
        </p>
      </section>

      {/* 8. Loan Term and Total Interest Trade-off */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Clock className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            8. Loan Term Length: Cash Flow vs. Lifetime Interest Cost
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Selecting a loan term involves a direct financial trade-off between monthly cash flow obligation and total lifetime borrowing cost:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
              <tr>
                <th className="p-3">Loan Term Duration ($50,000 at 7.00%)</th>
                <th className="p-3">Monthly Payment</th>
                <th className="p-3">Total Repayment</th>
                <th className="p-3">Cumulative Lifetime Interest</th>
                <th className="p-3">Interest as % of Principal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-mono">
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">3 Years (36 Mos)</td>
                <td className="p-3 font-bold">$1,543.85</td>
                <td className="p-3">$55,578.78</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">$5,578.78</td>
                <td className="p-3">11.2%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">5 Years (60 Mos)</td>
                <td className="p-3 font-bold">$990.06</td>
                <td className="p-3">$59,403.60</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">$9,403.60</td>
                <td className="p-3">18.8%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">7 Years (84 Mos)</td>
                <td className="p-3 font-bold">$754.85</td>
                <td className="p-3">$63,407.30</td>
                <td className="p-3 text-amber-600 dark:text-amber-400 font-semibold">$13,407.30</td>
                <td className="p-3">26.8%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">10 Years (120 Mos)</td>
                <td className="p-3 font-bold">$580.54</td>
                <td className="p-3">$69,665.04</td>
                <td className="p-3 text-amber-600 dark:text-amber-400 font-semibold">$19,665.04</td>
                <td className="p-3">39.3%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold font-sans text-slate-900 dark:text-slate-100">15 Years (180 Mos)</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">$449.41</td>
                <td className="p-3">$80,894.49</td>
                <td className="p-3 text-rose-600 dark:text-rose-400 font-bold">$30,894.49</td>
                <td className="p-3 font-bold">61.8%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500">
          Extending the term from 3 to 15 years reduces the monthly payment by <strong>$1,094.44/month</strong>, providing cash flow flexibility, but increases lifetime interest costs by <strong>+$25,315.71</strong>. Shorter-term loans often receive lower rates in some mortgage markets, but actual pricing varies by lender and market conditions.
        </p>
      </section>

      {/* 9. Reverse Solver Modes */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            9. Reverse Solver Modes: Solving for Amount, Term, or Rate
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          In addition to calculating standard payments, this tool provides three algebraic reverse-solver modes:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Mode 2: Loan Amount Solver</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Estimates the loan principal corresponding mathematically to a selected periodic payment, interest rate, and term:
            </p>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 font-mono font-bold text-center text-blue-600 dark:text-blue-400">
              {"P = PMT × [(1+r)ⁿ − 1] / [r(1+r)ⁿ]"}
            </div>
            <p className="text-[11px] text-slate-500">
              *A mathematical annuity reverse calculation; does not evaluate income, debt-to-income (DTI) ratios, or lender underwriting criteria.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Mode 3: Loan Term Solver</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Solves for the exact repayment duration required to retire a debt balance given a fixed payment budget:
            </p>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 font-mono font-bold text-center text-blue-600 dark:text-blue-400">
              {"n = ln[PMT / (PMT − P·r)] / ln(1+r)"}
            </div>
            <p className="text-[11px] text-slate-500">
              Requires PMT &gt; P × r to ensure positive amortization.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Mode 4: Interest Rate Solver</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Determines the implied annual interest rate when principal, payment, and term are known:
            </p>
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 font-mono font-bold text-center text-blue-600 dark:text-blue-400">
              {"Binary Search (40 Iterations)"}
            </div>
            <p className="text-[11px] text-slate-500">
              Numerically isolates the periodic rate within 0.0001% precision.
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
            10. Explore Related Borrowing & Amortization Calculators
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Complement your installment loan analysis with specialized calculators across our financial suite:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <Link
            href="/calculators/amortization-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors block space-y-1"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Amortization Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Generate a detailed amortization schedule with annual and monthly views.
            </span>
          </Link>

          <Link
            href="/calculators/personal-loan-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors block space-y-1"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Personal Loan Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Estimate unsecured borrowing costs and net loan proceeds.
            </span>
          </Link>

          <Link
            href="/calculators/auto-loan-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors block space-y-1"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Auto Loan Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Model car payments with trade-in value, down payment, and sales tax.
            </span>
          </Link>

          <Link
            href="/calculators/mortgage-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors block space-y-1"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Mortgage Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Calculate home purchase payments with property taxes, insurance, and PMI.
            </span>
          </Link>

          <Link
            href="/calculators/debt-payoff-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors block space-y-1"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Debt Payoff Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Model debt elimination strategies using Snowball or Avalanche methods.
            </span>
          </Link>

          <Link
            href="/calculators/debt-consolidation-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors block space-y-1"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Debt Consolidation Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Merge multiple credit cards into a single fixed installment payment.
            </span>
          </Link>

          <Link
            href="/calculators/refinance-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors block space-y-1"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Refinance Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Evaluate loan refinancing savings, new monthly terms, and break-even timelines.
            </span>
          </Link>

          <Link
            href="/calculators/apr-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors block space-y-1"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              APR Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Calculate official annual percentage rate including upfront lender fees and points.
            </span>
          </Link>

          <Link
            href="/calculators/emi-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors block space-y-1"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              EMI Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Compare international Equated Monthly Installment borrowing conventions.
            </span>
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
        <div className="space-y-3 text-xs">
          {faqList.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5"
            >
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                {item.question}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Methodology, Privacy & Limitations */}
      <section className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>Mathematical Methodology & Client-Side Privacy</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          This calculator executes double-precision floating-point arithmetic using standard discrete amortization algorithms. 100% of mathematical evaluations execute locally within your browser; no financial inputs, loan parameters, or personal data are stored or transmitted to external servers.
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          <strong>Educational Disclaimer:</strong> This calculator is designed for educational, analytical, and illustrative purposes only and does not constitute formal financial, legal, tax, or lending advice. Final loan terms, annual percentage rates, closing fees, and qualification requirements are established exclusively by licensed financial institutions following formal credit underwriting.
        </p>
      </section>
    </div>
  );
}

export default LoanContentSection;
