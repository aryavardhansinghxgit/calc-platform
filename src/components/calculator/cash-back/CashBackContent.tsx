"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Car, Scale, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, TrendingUp, ShieldCheck, DollarSign, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cashBackFaqs } from "@/app/calculators/cash-back-or-low-interest-calculator/faq";

export function CashBackContent() {
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(new Set([0, 1]));

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
  return (
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <Car className="w-4 h-4" />
          <span>Automotive Financing Strategy</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          1. Introduction: Customer Cash Rebate vs. Low-APR Promotional Financing
        </h2>
        <p>
          When purchasing a new car, truck, or SUV, automotive manufacturers frequently offer two mutually exclusive buyer incentives: an upfront <strong>Customer Cash Back Rebate</strong> (e.g., $1,500 to $4,500 off the vehicle price) or a <strong>Special Low-Interest Financing APR</strong> (e.g., 0.0%, 0.9%, or 1.9% subsidized dealer financing).
        </p>
        <p>
          Because buyers are forced to choose only one incentive, determining the optimal financial decision requires evaluating more than just the monthly payment. It requires analyzing the total lifetime borrowing cost across the entire loan duration, factoring in state sales tax laws on rebates, outside credit union loan rates, loan term lengths, and planned vehicle holding periods.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Option A: Customer Cash Back Rebate
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Reduces the financed vehicle purchase price immediately. You secure standard auto financing through an independent bank, credit union, or regular dealer rate (e.g., 5.5%–7.5% APR).
            </p>
          </div>
          <div className="p-4 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              Option B: Low-APR Subsidized Financing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Subsidizes interest across the loan term via the automaker&apos;s captive finance company (e.g., Toyota Financial, Ford Credit), but forfeits the upfront cash discount. Requires prime credit approval (720+ FICO).
            </p>
          </div>
        </div>
      </section>

      {/* 2. MATHEMATICAL FOUNDATIONS */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <Scale className="w-4 h-4" />
          <span>Underlying Financial Mathematics</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          2. Mathematical Foundations of Auto Loan Amortization
        </h2>
        <p>
          Auto loans are fixed-rate installment contracts with monthly compounding. The monthly payment is governed by the standard annuity amortization formula:
        </p>

        <div className="p-5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm space-y-3 shadow-inner">
          <div className="text-slate-400 font-sans text-xs uppercase tracking-wider border-b border-slate-700 pb-1">
            Monthly Debt Service Equation
          </div>
          <div>
            <span className="text-blue-400">Monthly Payment (M)</span> = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
          </div>
          <div className="text-slate-300 text-xs font-sans">
            Where: <strong>P</strong> = Financed Principal, <strong>r</strong> = Monthly Interest Rate (Annual Rate / 12), <strong>n</strong> = Loan Term in Months.
          </div>
        </div>

        <p>
          When comparing the two incentive pathways, the financed principal <em>P</em> differs fundamentally:
        </p>
        <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm pl-1">
          <li>
            <strong>Low Interest Principal (P_low):</strong> Vehicle Price + Sales Tax + Document &amp; Registration Fees - Down Payment - Trade-In Equity.
          </li>
          <li>
            <strong>Cash Back Principal (P_cash):</strong> Vehicle Price - Cash Rebate + Sales Tax (calculated on taxable base) + Fees - Down Payment - Trade-In Equity.
          </li>
        </ul>
      </section>

      {/* 3. FORMULA SECTION & BREAKEVEN APR */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <Calculator className="w-4 h-4" />
          <span>Formulas &amp; Breakeven Analysis</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          3. Total Cost Formula &amp; The Breakeven Interest Rate
        </h2>
        <p>
          The total cost of each vehicle financing option encompasses all upfront out-of-pocket cash plus total cumulative monthly payments:
        </p>

        <div className="p-5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm space-y-3 shadow-inner">
          <div className="text-slate-400 font-sans text-xs uppercase tracking-wider border-b border-slate-700 pb-1">
            Total Lifetime Vehicle Cost Equations
          </div>
          <div>
            <span className="text-emerald-400">Total Cost (Cash Back)</span> = Down Payment + Upfront Fees + (M_cash × n)
          </div>
          <div>
            <span className="text-blue-400">Total Cost (Low APR)</span> = Down Payment + Upfront Fees + (M_low × n)
          </div>
          <div>
            <span className="text-amber-400">Net Financial Savings</span> = | Total Cost (Low APR) - Total Cost (Cash Back) |
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            What is the Breakeven Interest Rate?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            The <strong>Breakeven APR</strong> is the exact outside market loan rate at which the total lifetime cost of the Cash Back Rebate equals the total lifetime cost of the Low APR promotion.
          </p>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs text-blue-600 dark:text-blue-400">
            • If Outside Market Rate &lt; Breakeven APR → <strong>Choose Cash Back Rebate</strong> (Better Deal)<br />
            • If Outside Market Rate &gt; Breakeven APR → <strong>Choose Low APR Financing</strong> (Better Deal)
          </div>
        </div>
      </section>

      {/* 4. STEP BY STEP PROCEDURE */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>Step-by-Step Procedure</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          4. How the Calculation Works (Execution Sequence)
        </h2>
        <ol className="list-decimal list-inside space-y-3 pl-2 text-xs sm:text-sm">
          <li>
            <strong>Gross Purchase Price Determination:</strong> Establishes the negotiated vehicle selling price before incentives.
          </li>
          <li>
            <strong>Sales Tax Assessment:</strong> Applies local state sales tax rules. In pre-tax rebate states, tax is applied to the full vehicle price; in post-tax rebate states, tax is computed on price minus rebate.
          </li>
          <li>
            <strong>Principal Balance Computation:</strong> Subtracts down payments, trade-in equity allowances, and upfront cash rebates from gross financed balances.
          </li>
          <li>
            <strong>Amortization Schedule Generation:</strong> Computes the exact monthly payment (M) and total interest charges across the selected loan term (e.g., 36, 48, 60, or 72 months).
          </li>
          <li>
            <strong>Total Cost Summation:</strong> Adds initial down payment cash, trade-in value, and all scheduled monthly payments for both options.
          </li>
          <li>
            <strong>Breakeven Solving &amp; Recommendation:</strong> Numerically solves for the breakeven rate and outputs the winning incentive with total net dollar savings.
          </li>
        </ol>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <FileText className="w-4 h-4" />
          <span>Detailed Numerical Demonstrations</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          5. Worked Examples: Step-by-Step Mathematical Solutions
        </h2>

        <div className="space-y-6">
          {/* Example 1 */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center justify-between">
              <span>Example 1: $35,000 Midsize Sedan — 60-Month Loan ($2,500 Rebate @ 6.5% vs. 0.9% APR)</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xs bg-blue-100 dark:bg-blue-950/40 px-2 py-1 rounded-md">Low APR Wins</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Vehicle price: $35,000, Down payment: $5,000, Loan term: 60 months.
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1.5">
              <div>• <strong>Cash Back Option:</strong> Loan Principal = $35,000 - $2,500 (rebate) - $5,000 = $27,500.</div>
              <div>&nbsp;&nbsp;Monthly Payment @ 6.5% = <strong>$538.25</strong> | Total Payments = <strong>$32,295</strong> | Total Cost = <strong>$37,295</strong></div>
              <div>• <strong>0.9% Low APR Option:</strong> Loan Principal = $35,000 - $5,000 = $30,000.</div>
              <div>&nbsp;&nbsp;Monthly Payment @ 0.9% = <strong>$511.45</strong> | Total Payments = <strong>$30,687</strong> | Total Cost = <strong>$35,687</strong></div>
              <div className="text-blue-600 dark:text-blue-400 font-bold">
                ★ Winner: 0.9% Low APR saves $1,608 over 60 months! (Breakeven APR is 3.12%)
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center justify-between">
              <span>Example 2: Same Vehicle with Short 36-Month Loan</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-100 dark:bg-emerald-950/40 px-2 py-1 rounded-md">Cash Back Wins</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Same $35,000 car and $2,500 rebate, but financed over 36 months instead of 60.
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1.5">
              <div>• <strong>Cash Back Option (36 mos @ 6.5% on $27,500):</strong> Total Interest = $2,842 | Total Cost = <strong>$35,342</strong></div>
              <div>• <strong>0.9% Low APR Option (36 mos @ 0.9% on $30,000):</strong> Total Interest = $418 | Total Cost = <strong>$35,418</strong></div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                ★ Winner: Cash Back Rebate saves $76 because interest has less time to compound over 36 months!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SENSITIVITY TABLE & DECISION MATRIX */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <TrendingUp className="w-4 h-4" />
          <span>Decision Matrix</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          6. Visual Decision Matrix: Loan Term Length vs. Incentive Value
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Loan Term</th>
                <th className="p-3">Typical Winner</th>
                <th className="p-3">Breakeven Outside APR</th>
                <th className="p-3">Core Financial Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="p-2.5 font-bold">24 – 36 Months</td>
                <td className="p-2.5 font-semibold text-emerald-600 dark:text-emerald-400">Cash Back Rebate</td>
                <td className="p-2.5 font-mono">6.5% – 8.5%</td>
                <td className="p-2.5">Short repayment window limits total interest savings of low APR.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">48 Months</td>
                <td className="p-2.5 font-semibold text-amber-600 dark:text-amber-400">Close Toss-Up</td>
                <td className="p-2.5 font-mono">4.5% – 5.5%</td>
                <td className="p-2.5">Depends heavily on outside credit union rate vs. rebate amount.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">60 Months</td>
                <td className="p-2.5 font-semibold text-blue-600 dark:text-blue-400">0%–1.9% Low APR</td>
                <td className="p-2.5 font-mono">3.0% – 4.0%</td>
                <td className="p-2.5">Interest compounding over 5 years exceeds most standard rebates.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">72 – 84 Months</td>
                <td className="p-2.5 font-semibold text-blue-600 dark:text-blue-400">0%–1.9% Low APR</td>
                <td className="p-2.5 font-mono">2.0% – 2.8%</td>
                <td className="p-2.5">Long-term financing generates massive interest savings under 0% APR.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. STRATEGIC PITFALLS & EDGE CASES */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-semibold text-xs tracking-wider uppercase">
          <AlertCircle className="w-4 h-4" />
          <span>Pitfalls &amp; Edge Cases</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          7. Common Pitfalls &amp; Strategic Edge Cases
        </h2>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="text-amber-600 font-extrabold">✕</span>
              Early Loan Payoff / Trading in Early
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              If you plan to trade in or pay off the car after 2 to 3 years, choosing 0% APR leaves money on the table because you never realize the interest savings of years 4 and 5. The cash rebate delivers 100% of its benefit on day one.
            </p>
          </div>

          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="text-amber-600 font-extrabold">✕</span>
              State Sales Tax Rebate Calculation Rules
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              In most states (California, Florida, New York, Ohio), sales tax is assessed on the full purchase price <em>before</em> subtracting the rebate. In Texas, Missouri, and Oklahoma, sales tax is assessed <em>after</em> the rebate, making cash back even more cost-effective.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="text-emerald-600 font-extrabold">✓</span>
              Pro-Strategy: Take Cash Rebate + Immediate Credit Union Refinance
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Many smart buyers capture the $3,000+ upfront manufacturer cash rebate at standard dealer rates, and then immediately refinance the lower loan balance with a credit union at 4.9% within 30 to 60 days, getting the best of both worlds!
            </p>
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE FAQ SECTION */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <HelpCircle className="w-4 h-4 text-blue-500" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          8. Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Click any question below to expand or collapse detailed guidance on choosing between manufacturer cash back rebates and low-APR promotional financing.
        </p>

        <div className="space-y-3 pt-2">
          {cashBackFaqs.map((faq, index) => {
            const isOpen = openFaqIndices.has(index);
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-xs sm:text-sm gap-3"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. PRACTICAL APPLICATIONS & RELATED CALCULATORS */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>Related Auto &amp; Loan Calculators</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          9. Related Financial Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <Link
            href="/calculators/auto-loan-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">Auto Loan Calculator</div>
            <p className="text-slate-600 dark:text-slate-300">Model complete monthly car payments, amortization schedules, and sales tax.</p>
          </Link>

          <Link
            href="/calculators/auto-lease-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">Auto Lease Calculator</div>
            <p className="text-slate-600 dark:text-slate-300">Compare buying vs. leasing with money factor and residual value modeling.</p>
          </Link>

          <Link
            href="/calculators/down-payment-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">Down Payment Calculator</div>
            <p className="text-slate-600 dark:text-slate-300">Evaluate the impact of upfront cash and trade-in equity on interest savings.</p>
          </Link>
        </div>
      </section>

      {/* 10. EDUCATIONAL SUMMARY */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
          <CheckCircle2 className="w-4 h-4" />
          <span>Educational Key Takeaways</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          10. Educational Key Takeaways
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Loan Term Determines the Winner:</strong> Longer terms (60–84 months) favor 0% Low APR; shorter terms (24–36 months) favor Cash Back.</li>
            <li><strong>Check Outside Credit Union Rates:</strong> Securing an outside loan rate below the breakeven APR makes Cash Back the superior option.</li>
            <li><strong>Early Payoff Favors Rebates:</strong> Paying off the vehicle early or refinancing captures 100% of the cash rebate upfront without paying future interest.</li>
            <li><strong>Total Cost Trumps Monthly Payment:</strong> Always compare the total sum of all payments plus down payments, not just the monthly installment.</li>
          </ul>
        </div>
      </section>

    </article>
  );
}

export default CashBackContent;
