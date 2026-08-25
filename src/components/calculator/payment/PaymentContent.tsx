"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Landmark,
  Scale,
  Sparkles,
  PieChart,
  Clock,
  Calendar,
  FileText,
  Target,
  Layers,
  Percent,
  Shield,
  Briefcase,
  AlertTriangle,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import { paymentFaqs } from "@/app/calculators/payment-calculator/faq";

export function PaymentContent() {
  // All 12 FAQs open by default matching platform standard for SEO crawling & instant user readability
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const relatedCalculators = [
    {
      name: "Loan Calculator",
      slug: "/calculators/loan-calculator",
    },
    {
      name: "Amortization Calculator",
      slug: "/calculators/amortization-calculator",
    },
    {
      name: "Interest Calculator",
      slug: "/calculators/interest-calculator",
    },
    {
      name: "APR Calculator",
      slug: "/calculators/apr-calculator",
    },
    {
      name: "Mortgage Calculator",
      slug: "/calculators/mortgage-calculator",
    },
    {
      name: "Auto Loan Calculator",
      slug: "/calculators/auto-loan-calculator",
    },
    {
      name: "Debt Payoff Calculator",
      slug: "/calculators/debt-payoff-calculator",
    },
  ];

  return (
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
      {/* CANONICAL RELATED CALCULATORS BLOCK (AT TOP - Exactly 7 Verified Live Routes) */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Related Valuation &amp; Financing Tools
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          {relatedCalculators.map((calc, idx) => (
            <Link
              key={idx}
              href={calc.slug}
              className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              {calc.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 1. WHAT A PAYMENT CALCULATOR ACTUALLY TELLS YOU */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Loan Payment &amp; Debt Chapter
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          1. What a Payment Calculator Actually Tells You
        </h2>
        <p>
          A loan payment is more than one number displayed under a loan amount. It is the periodic result of three interacting variables: how much is borrowed, how quickly interest accumulates, and how many scheduled periods are available to repay the balance. A payment calculator turns those variables into a repeatable cash-flow model so that the borrower can see not only the required payment, but also how the debt evolves from the first installment to the final payoff.
        </p>
        <p>
          This distinction matters because a lower monthly payment is not automatically a lower-cost loan. Extending a loan can reduce the monthly obligation while increasing the number of periods during which interest accrues. Conversely, a higher payment can shorten the repayment period and reduce lifetime interest. A useful calculator therefore needs to show the payment together with total interest, total payments, and an amortization schedule rather than presenting the monthly number in isolation.
        </p>
        <p>
          For users who want the broader debt scenario first, the{" "}
          <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Loan Calculator
          </Link>{" "}
          can complement this payment-focused model by comparing loan structures and payment frequencies.
        </p>
      </section>

      {/* 2. THREE NUMBERS THAT DRIVE THE LOAN */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          2. Start With the Three Numbers That Drive the Loan
        </h2>
        <p>
          Most fixed-rate installment calculations begin with three core inputs: principal, interest rate, and term.
        </p>
        <p>
          The principal is the amount initially borrowed. The interest rate determines the cost of carrying that unpaid balance through time. The term determines how many scheduled payments are available to retire the principal.
        </p>
        <p>
          These variables interact. Borrowing more raises the payment. Raising the interest rate raises the payment. Extending the term generally lowers the periodic payment but increases the amount of time over which interest can accumulate.
        </p>
        <p>
          That relationship is why a payment calculator is more useful as a comparison tool than as a simple arithmetic widget. Change the term while holding the principal and rate constant and the monthly obligation moves one way while lifetime interest moves the other.
        </p>
      </section>

      {/* 3. THE CORE PAYMENT FORMULA */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          3. The Core Payment Formula
        </h2>
        <p>
          For a standard fixed-rate amortizing loan, the periodic payment is calculated using the annuity formula:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <code className="text-sm font-bold text-blue-600 dark:text-blue-400 block font-mono">
            M = P × [r(1 + r)^n] / [(1 + r)^n − 1]
          </code>
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <p>• <strong>M</strong> = periodic payment</p>
            <p>• <strong>P</strong> = original principal borrowed</p>
            <p>• <strong>r</strong> = periodic interest rate (e.g. 0.06 / 12 = 0.005 for a monthly 6% rate)</p>
            <p>• <strong>n</strong> = total number of payment periods (e.g. 15 years × 12 = 180 months)</p>
          </div>
        </div>
        <p>
          The calculator applies the formula using full double-precision floating point math before rounding the displayed payment to cents. If intermediate power calculations or periodic rates are rounded too early, small errors propagate into the amortization schedule and create artificial terminal drift.
        </p>
      </section>

      {/* 4. WORKED EXAMPLE: $200,000 AT 6% FOR 15 YEARS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          4. Worked Example: $200,000 at 6% for 15 Years
        </h2>
        <p>
          Consider an audited baseline loan of:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <li>Principal: <strong>$200,000</strong></li>
          <li>Annual rate: <strong>6.0%</strong> (Monthly periodic rate r = 0.06 / 12 = 0.005)</li>
          <li>Term: <strong>15 years</strong> (Total installments n = 15 × 12 = 180)</li>
          <li>Payment frequency: <strong>Monthly</strong></li>
        </ul>
        <p>
          Substituting those exact parameters into the standard amortization formula produces an exact monthly payment of:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div>
            <span className="text-slate-500 block text-xs">Monthly Installment:</span>
            <strong className="text-lg text-blue-600 dark:text-blue-400">$1,687.71</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-xs">Total Repaid (180 Mos):</span>
            <strong className="text-lg text-slate-900 dark:text-slate-100">$303,788.46</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-xs">Cumulative Interest:</span>
            <strong className="text-lg text-amber-600 dark:text-amber-400">$103,788.46</strong>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          This simple example illustrates an important principle: the monthly payment is only one layer of the borrowing cost. The full lifetime cost comes from the payment multiplied over the entire repayment period.
        </p>
      </section>

      {/* 5. WHY PAYMENT COMPOSITION CHANGES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          5. Why the Payment Does Not Stay the Same in Economic Composition
        </h2>
        <p>
          A fixed monthly payment does not mean each payment contains the same amount of interest and principal.
        </p>
        <p>
          At the beginning of the loan, the outstanding balance is largest. Since interest for the period is based on that balance, the early installments contain a relatively large interest component. As principal is gradually repaid, the balance falls. The next period&apos;s interest is therefore calculated on a smaller amount. More of the same fixed payment can then go toward principal.
        </p>
        <p>
          This produces the familiar amortization curve: interest starts high and generally declines, while principal repayment grows. The{" "}
          <Link href="/calculators/amortization-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Amortization Calculator
          </Link>{" "}
          is useful when the main purpose is to inspect that ledger period by period.
        </p>
      </section>

      {/* 6. READING AN AMORTIZATION SCHEDULE */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          6. Reading an Amortization Schedule
        </h2>
        <p>
          An amortization schedule tells the story of a loan one period at a time. Each row begins with the opening balance. The scheduled payment is then divided into interest and principal. Principal reduces the balance, while interest represents the financing cost for that period.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
          <p>Interest_t = BeginningBalance_t × PeriodicRate</p>
          <p>Principal_t = Payment_t − Interest_t</p>
          <p>EndingBalance_t = BeginningBalance_t − Principal_t</p>
          <p>BeginningBalance_(t+1) = EndingBalance_t</p>
        </div>
        <p>
          A mathematically correct schedule satisfies all of those relationships on every row, arriving at an ending balance of exactly <strong>$0.00</strong> at maturity.
        </p>
      </section>

      {/* 7. FIRST VS LAST PAYMENT */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          7. The First Payment vs. the Last Payment
        </h2>
        <p>
          Using the $200,000, 15-year, 6% example, the first payment of $1,687.71 contains <strong>$1,000.00 in interest</strong> and <strong>$687.71 in principal</strong>. By month 180, the final payment contains just <strong>$8.40 in interest</strong> and <strong>$1,679.31 in principal</strong>.
        </p>
        <p>
          That is why borrowers who are several years into a loan often notice that the balance does not appear to fall as quickly as they expected in the early years. The fixed payment is doing exactly what amortization requires, but the interest component is larger when the outstanding balance is larger.
        </p>
      </section>

      {/* 8. WHY LOAN TERM MATTERS SO MUCH */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          8. Why Loan Term Matters So Much
        </h2>
        <p>
          Loan term is one of the most important choices in an amortizing loan because it changes both the periodic payment and the lifetime interest. Holding principal and rate constant:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Shorter Term (e.g. 15 Years)</h3>
            <p>• Higher periodic monthly payment</p>
            <p>• Fewer total payments</p>
            <p>• Substantially less cumulative interest</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Longer Term (e.g. 30 Years)</h3>
            <p>• Lower periodic monthly payment</p>
            <p>• More total payment periods</p>
            <p>• Much greater cumulative interest</p>
          </div>
        </div>
        <p>
          This is not simply a budgeting decision. It is a time-allocation decision: a longer term spreads repayment across more periods, allowing the lender&apos;s interest charge to remain in the calculation for longer. For mortgage-specific comparisons, the{" "}
          <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Mortgage Calculator
          </Link>{" "}
          can incorporate housing-specific payment components beyond pure principal and interest.
        </p>
      </section>

      {/* 9. REVERSE DURATION SOLVER */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          9. The Reverse Question: How Long Will It Take to Pay Off the Loan?
        </h2>
        <p>
          Sometimes the borrower knows their available monthly payment rather than a target loan term. Given:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <li>Principal (P) = <strong>$200,000</strong></li>
          <li>Monthly Payment (M) = <strong>$2,000</strong></li>
          <li>Interest Rate = <strong>6.0%</strong> (r = 0.005)</li>
        </ul>
        <p>
          The reverse duration solver calculates the exact period count using the inverse amortization equation:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
          n = −ln[1 − (r × P) / M] / ln(1 + r)
        </div>
        <p>
          For this audited example, the formula yields <strong>139 months (approximately 11.5 years)</strong> with total interest paid of <strong>$77,951.44</strong> (saving $25,837.02 compared to the standard 15-year term).
        </p>
      </section>

      {/* 10. NON-AMORTIZING PAYMENT EDGE CASE */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          10. The Most Important Duration Edge Case (Interest Trap)
        </h2>
        <p>
          The duration solver must recognize when a payment is too small to ever amortize the loan. Suppose the periodic interest charge on the balance is $1,000 ($200,000 × 0.5%), but the borrower pays only $800. The payment does not even cover the interest accruing for that period.
        </p>
        <p>
          In that situation, the loan triggers negative amortization and does not have a finite payoff horizon. A robust calculator flags this condition immediately as an <em>interest trap</em> rather than inventing an impossible or misleadingly plausible payoff date.
        </p>
      </section>

      {/* 11. MAXIMUM AFFORDABLE LOAN */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          11. Maximum Affordable Loan: Work Backward From the Payment Budget
        </h2>
        <p>
          Borrowers often start from a monthly budget rather than a desired loan size. Suppose the maximum acceptable payment is <strong>$1,500 per month</strong> for <strong>15 years</strong> at <strong>6.0% annual interest</strong>.
        </p>
        <p>
          The calculator solves backward for the maximum principal that produces that exact target payment:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-purple-600 dark:text-purple-400 font-bold">
          P = M × [(1 + r)^n − 1] / [r(1 + r)^n]
        </div>
        <p>
          For the audited example, the maximum modeled loan is <strong>$177,755.27</strong> (total repayment of $270,000, with $92,244.73 in interest).
        </p>
      </section>

      {/* 12. PAYMENT BUDGET VS APPROVAL */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          12. Payment Budget vs. Loan Approval
        </h2>
        <p>
          A mathematical affordability result and an actual loan approval are different things. The calculator answers: <em>&ldquo;How much principal corresponds to this payment budget under these assumptions?&rdquo;</em>
        </p>
        <p>
          An actual lender separately considers income, existing debt obligations, credit score, property appraisal, documentation, debt-to-income caps, and lender overlays. For a broader household debt perspective, the{" "}
          <Link href="/calculators/dti-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            DTI Calculator
          </Link>{" "}
          can evaluate total debt-to-income capacity.
        </p>
      </section>

      {/* 13. REGULAR VS ACCELERATED BIWEEKLY */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          13. Biweekly Payments: Why the Term Is Frequently Misunderstood
        </h2>
        <p>
          &ldquo;Biweekly&rdquo; sounds simple, but two different payment conventions are commonly discussed:
        </p>
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong>Regular Biweekly:</strong> Takes the annual scheduled payment and divides it by 26 periods. It matches the annual monthly total without accelerating payoff.
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong>Accelerated Biweekly:</strong> Takes the monthly payment and divides it by two, paying that half-amount every 14 days. Because 52 weeks contain 26 pay periods, this produces 13 full monthly payments per year instead of 12.
          </div>
        </div>
      </section>

      {/* 14. AUDITED BIWEEKLY EXAMPLE */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          14. Audited Biweekly Example ($300,000 @ 6.5% for 30 Years)
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div>
            <span className="text-slate-500 block text-xs">Monthly Plan (30 Yrs):</span>
            <strong className="text-slate-900 dark:text-slate-100">$1,896.20/mo ($382,633.47 Int)</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-xs">Accelerated Biweekly:</span>
            <strong className="text-emerald-600 dark:text-emerald-400">$948.10/2wks ($295,377.18 Int)</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-xs">Total Savings:</span>
            <strong className="text-blue-600 dark:text-blue-400">$87,256.29 (5.8 Yrs Faster)</strong>
          </div>
        </div>
      </section>

      {/* 15. EXTRA PRINCIPAL PAYMENTS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          15. Extra Principal Payments: Small Changes Can Alter the Entire Schedule
        </h2>
        <p>
          An extra principal payment does something fundamentally different from paying interest early. When extra money is correctly credited to principal, the outstanding balance falls faster. Every subsequent interest calculation is then performed on a smaller balance.
        </p>
        <p>
          This creates a compounding effect in reverse: the borrower is not only paying extra principal today, but also eliminating some of the future interest that would have been charged on that principal. For users exploring this strategy, the{" "}
          <Link href="/calculators/debt-payoff-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Debt Payoff Calculator
          </Link>{" "}
          provides a broader multi-debt perspective.
        </p>
      </section>

      {/* 16. AUDITED $100 EXTRA PAYMENT EXAMPLE */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          16. Audited $100 Extra-Payment Example
        </h2>
        <p>
          On the audited $200,000 15-year 6% baseline, adding <strong>$100 per month</strong> in extra principal ($1,787.71 total) yields:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div>
            <span className="text-slate-500 block text-xs">Accelerated Payoff Horizon:</span>
            <strong className="text-slate-900 dark:text-slate-100">165 months (15 Months Faster)</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-xs">Total Interest Saved:</span>
            <strong className="text-emerald-600 dark:text-emerald-400">$10,028.47 Saved</strong>
          </div>
        </div>
      </section>

      {/* 17. HOW TO TEST EXTRA PAYMENTS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          17. How to Test Whether an Extra Payment Is Really Helping
        </h2>
        <p>
          Do not evaluate an extra-payment feature by looking only at the final balance. Compare two complete schedules (baseline vs. baseline plus extra principal) and verify that:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <li>The new payoff period is strictly no later than baseline;</li>
          <li>Total lifetime interest is strictly lower;</li>
          <li>Extra principal is credited 100% directly to principal with $0 interest fee overhead;</li>
          <li>The final balance reaches exactly zero at the accelerated month.</li>
        </ul>
      </section>

      {/* 18. LOAN COMPARISON: MONTHLY PAYMENT IS NOT ENOUGH */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          18. Loan Comparison: Monthly Payment Is Not Enough
        </h2>
        <p>
          A comparison tool should never rank loans using monthly payment alone. Consider two offers on a $300,000 loan:
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
              <tr>
                <th className="p-3">Offer</th>
                <th className="p-3">Term &amp; Rate</th>
                <th className="p-3">Monthly Payment</th>
                <th className="p-3">Total Interest</th>
                <th className="p-3">Total Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">Offer A</td>
                <td className="p-3">30 Years @ 6.50%</td>
                <td className="p-3 font-bold">$1,896.20</td>
                <td className="p-3 text-red-600 dark:text-red-400">$382,633.47</td>
                <td className="p-3">$682,633.47</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Offer B</td>
                <td className="p-3">15 Years @ 5.75%</td>
                <td className="p-3 font-bold">$2,491.23</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$148,421.45</td>
                <td className="p-3">$448,421.45</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500">
          Although Offer B requires $595.03 more per month, it saves $234,212.02 in total lifetime interest cost.
        </p>
      </section>

      {/* 19. FEES CHANGE THE TRUE COST OF BORROWING */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          19. Fees Change the True Cost of Borrowing
        </h2>
        <p>
          A loan with a lower nominal rate is not automatically cheaper if it requires significant upfront origination fees or discount points. Upfront closing costs reduce the net cash proceeds received while contractual repayment remains tied to the full face value.
        </p>
        <p>
          For a dedicated fee-adjusted borrowing cost analysis, the{" "}
          <Link href="/calculators/apr-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            APR Calculator
          </Link>{" "}
          evaluates the true annualized cost of credit.
        </p>
      </section>

      {/* 20. INTEREST RATE VS APR */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          20. Interest Rate vs. APR
        </h2>
        <p>
          The nominal interest rate answers: <em>&ldquo;What rate is being applied to the outstanding loan balance?&rdquo;</em> APR expresses a broader borrowing cost incorporating upfront finance charges under applicable disclosure rules. Therefore, <strong>interest rate ≠ APR</strong> when fees exist.
        </p>
      </section>

      {/* 21. WORKED EXAMPLE: $20,000 AUTO LOAN */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          21. Worked Example: $20,000 Auto Loan (5 Years @ 6.0%)
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-1">
          <p>• Principal (P) = $20,000 | Monthly Rate (r) = 0.005 | Periods (n) = 60</p>
          <p>• Compound Factor: (1.005)^60 = 1.348850</p>
          <p>• <strong>Monthly Payment = $386.66 / month</strong></p>
          <p>• Total Repaid = $23,199.36 | Total Interest = <strong>$3,199.36</strong></p>
        </div>
        <p className="text-xs text-slate-500">
          For vehicle-specific trade-in equity and sales tax financing, the{" "}
          <Link href="/calculators/auto-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Auto Loan Calculator
          </Link>{" "}
          models full automotive acquisition costs.
        </p>
      </section>

      {/* 22. LONGER-TERM COST */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          22. Why Longer Terms Can Cost More Even With a Lower Payment
        </h2>
        <p>
          Because each scheduled period generates interest on the outstanding balance, spreading payments over 30 years rather than 15 years keeps the balance active for 180 additional months. The extra periods of compound interest easily overwhelm the smaller monthly installment.
        </p>
      </section>

      {/* 23. INTEREST/PRINCIPAL CROSSOVER */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          23. How the Crossover From Interest to Principal Works
        </h2>
        <p>
          The &ldquo;crossover point&rdquo; is the specific month in which the principal portion of your fixed monthly payment finally surpasses the interest portion. On a 30-year 6.5% loan, this crossover occurs only in <strong>Year 19 (Month 225)</strong>, whereas on a 15-year 6.0% loan, the crossover occurs in <strong>Year 5 (Month 56)</strong>.
        </p>
      </section>

      {/* 24. WHAT HAPPENS AT 0% INTEREST */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          24. What Happens at 0% Interest?
        </h2>
        <p>
          At a 0% interest rate, no finance charges accrue. The periodic payment simplifies to exact linear division: <code>Payment = Principal / NumberOfPayments</code> (e.g. $60,000 over 60 months = exact <strong>$1,000.00 / month</strong>).
        </p>
      </section>

      {/* 25. NEGATIVE AND UNSUPPORTED INPUTS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          25. Negative Rates and Unsupported Inputs
        </h2>
        <p>
          A robust financial engine does not silently transform invalid negative loan terms or zero-term inputs into fake numbers. It validates inputs cleanly and maintains transparent mathematical boundaries.
        </p>
      </section>

      {/* 26. TOTAL BORROWING COST */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          26. How to Read Total Cost
        </h2>
        <p>
          A complete payment analysis distinguishes five related measures: <strong>Principal</strong> (face amount borrowed), <strong>Interest</strong> (contractual finance charges), <strong>Fees</strong> (origination/closing outlays), <strong>Total Payments</strong> (principal + interest cash outlay), and <strong>Total Cost</strong> (total payments + all upfront fees).
        </p>
      </section>

      {/* 27. PAYMENT VS AMORTIZATION CALCULATOR */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          27. Payment Calculator vs. Amortization Calculator
        </h2>
        <p>
          A Payment Calculator answers: <em>&ldquo;What periodic installment does this loan require and what is my payoff horizon?&rdquo;</em> An{" "}
          <Link href="/calculators/amortization-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Amortization Calculator
          </Link>{" "}
          emphasizes the period-by-period balance reduction ledger and annual tax summaries.
        </p>
      </section>

      {/* 28. PAYMENT VS LOAN CALCULATOR */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          28. Payment Calculator vs. Loan Calculator
        </h2>
        <p>
          The Payment Calculator focuses on installment mechanics, reverse duration solving, payment-based affordability, and extra prepayment acceleration. The broader{" "}
          <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Loan Calculator
          </Link>{" "}
          evaluates flexible loan terms across personal, business, and specialty debts.
        </p>
      </section>

      {/* 29. PAYMENT VS INTEREST CALCULATOR */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          29. Payment Calculator vs. Interest Calculator
        </h2>
        <p>
          An{" "}
          <Link href="/calculators/interest-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Interest Calculator
          </Link>{" "}
          isolates simple and compound interest accumulation in savings or non-amortizing debt, whereas the Payment Calculator embeds interest into a fully amortizing principal repayment framework.
        </p>
      </section>

      {/* 30. PRACTICAL DECISION FRAMEWORK */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          30. Practical Decision Framework (5 Key Questions)
        </h2>
        <div className="space-y-2 text-xs sm:text-sm">
          <p><strong>1. What payment can your monthly cash flow comfortably sustain?</strong></p>
          <p><strong>2. What loan amount does that payment support at market rates?</strong></p>
          <p><strong>3. How much total interest will that loan generate over its lifetime?</strong></p>
          <p><strong>4. How do the total cost and payment change if you shorten the term to 15 years?</strong></p>
          <p><strong>5. How much interest can a modest $50–$100/mo extra prepayment save?</strong></p>
        </div>
      </section>

      {/* 31. COMMON PAYMENT CALCULATOR MISTAKES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          31. Common Payment Calculator Mistakes to Avoid
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong>1. Looking only at the monthly payment:</strong> A lower payment on a 30-year loan often costs double the interest of a 15-year loan.
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong>2. Ignoring the amortization schedule:</strong> Check the schedule to verify how quickly principal is actually declining.
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong>3. Confusing biweekly with accelerated biweekly:</strong> Accelerated biweekly submits 13 full payments per year.
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong>4. Treating nominal rate and APR as identical:</strong> Upfront closing fees increase the true annualized borrowing cost.
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong>5. Assuming extra payments reduce interest immediately:</strong> Extra payments must be credited directly to principal to lower future interest bases.
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <strong>6. Assuming an affordability result is an approval:</strong> The calculator models mathematical capacity; lenders apply separate underwriting rules.
          </div>
        </div>
      </section>

      {/* 32. FORMULA REFERENCE TOOLKIT */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          32. Complete Mathematical Formula Reference
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 font-sans block">Fixed-Rate Monthly Payment</span>
            <code className="text-blue-600 dark:text-blue-400 block">M = P × [r(1+r)^n] / [(1+r)^n − 1]</code>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 font-sans block">Reverse Duration Solver</span>
            <code className="text-emerald-600 dark:text-emerald-400 block">n = −ln[1 − rP/M] / ln(1+r)</code>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 font-sans block">Maximum Affordable Principal</span>
            <code className="text-purple-600 dark:text-purple-400 block">P = M × [(1+r)^n − 1] / [r(1+r)^n]</code>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 font-sans block">Total Lifetime Interest</span>
            <code className="text-amber-600 dark:text-amber-400 block">Total Interest = (M × n) − P</code>
          </div>
        </div>
      </section>

      {/* 33. FREQUENTLY ASKED QUESTIONS (12 CANONICAL FAQS OPEN BY DEFAULT) */}
      <section className="pt-8 space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Frequently Asked Questions (12 Essential Loan Payment Insights)
          </h2>
        </div>

        <div className="space-y-3">
          {paymentFaqs.map((faq, index) => {
            const isOpen = openFaqIndices.has(index);
            return (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 flex items-center justify-between font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold min-w-[24px]">
                      Q{index + 1}.
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}

export default PaymentContent;
