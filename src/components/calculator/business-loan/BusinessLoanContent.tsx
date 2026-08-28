"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Briefcase,
  DollarSign,
  Layers,
  Building,
  Target,
  TrendingUp,
  Percent,
  Calculator,
  ArrowRight,
  Scale,
  Award,
  AlertTriangle,
  Landmark,
} from "lucide-react";
import { businessLoanFaqs } from "@/calculators/finance/business-loan/faq";

export function BusinessLoanContent() {
  // All 15 FAQs open by default (matching 401(k) / Traditional IRA / Pension standard)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: businessLoanFaqs.length }, (_, i) => i))
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

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1: Title & Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Business Loan Calculator – Payment, Interest, Fees, APR &amp; Commercial Loan Analysis
          </h2>
          <p>
            A business loan can look inexpensive when you compare only its advertised interest rate. The actual cost can be materially different once the repayment term, origination charges, documentation fees, and other financing costs are included. A useful business loan analysis therefore needs to answer several questions at the same time: What will the monthly payment be? How much interest will the business pay? How much do fees add to the cost? What is the annualized cost of the financing? And can the business cash flow support the debt?
          </p>
          <p>
            This Business Loan Calculator brings those calculations together in one place. Enter the loan amount, interest rate, term, and applicable fees to estimate the periodic payment, total interest, total financing cost, and amortization schedule. The calculator also includes an SBA loan estimator, a debt service coverage ratio (DSCR) analysis, and visual tools for understanding how the balance changes over time.
          </p>
          <p>
            The results are estimates for planning and comparison. Actual loan pricing, fees, eligibility, repayment terms, SBA charges, collateral requirements, and underwriting decisions depend on the lender, loan product, borrower, transaction, and applicable rules.
          </p>
        </section>

        {/* Section 2: What Is a Business Loan? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Business Loan?
          </h2>
          <p>
            A business loan is financing obtained primarily for commercial purposes such as working capital, equipment, inventory, expansion, real estate, acquisition, renovation, refinancing eligible business debt, or other operating needs.
          </p>
          <p>
            Business financing can take many forms. A traditional commercial term loan generally provides a fixed amount that is repaid through scheduled installments. A line of credit allows a business to draw funds as needed, while SBA-backed financing uses government guarantees to reduce lender risk on qualifying transactions. SBA&apos;s 7(a) program, for example, can support working capital, real estate, equipment, business acquisition, refinancing of eligible debt, and other permitted business purposes.
          </p>
          <p>
            The financing structure matters because two loans with the same principal and nominal interest rate can have different economic costs when their fees, payment frequencies, terms, or cash-flow characteristics differ.
          </p>
        </section>

        {/* Section 3: How Payment Is Calculated & Formulas */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How a Business Loan Payment Is Calculated
          </h2>
          <p>
            For a fully amortizing loan with equal periodic payments, the payment is based on the present value of an annuity. The standard payment formula is:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            PMT = [ P &times; r &times; (1 + r)<sup>n</sup> ] / [ (1 + r)<sup>n</sup> &minus; 1 ]
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Where: <strong>P</strong> = original loan principal, <strong>r</strong> = periodic interest rate (Annual Rate &divide; 12), <strong>n</strong> = total number of payments (Loan Term in Years &times; 12), and <strong>PMT</strong> = periodic payment.
          </p>
          <p>
            This means the repayment term is just as important as the interest rate. Extending the term generally reduces the required payment but increases the amount of interest paid over the life of the loan.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs">
            <strong className="text-slate-900 dark:text-slate-100 font-bold block">
              Worked Example: $10,000 Loan @ 10% for 5 Years (60 Monthly Payments)
            </strong>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
              <li><strong>Monthly Payment (PMT):</strong> approximately <strong>$212.47 per month</strong></li>
              <li><strong>Total Scheduled Payments (60 months):</strong> 60 &times; $212.4704 = <strong>$12,748.23</strong></li>
              <li><strong>Principal Repaid:</strong> $10,000.00</li>
              <li><strong>Total Interest Paid:</strong> $2,748.23</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Total Cost Is More Than Interest */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Total Business Loan Cost Is More Than Interest
          </h2>
          <p>
            One of the most important distinctions in commercial borrowing is the difference between interest expense and total financing cost. A lender may charge: origination fees, documentation fees, underwriting or processing charges, guarantee-related fees for certain government-backed programs, and other transaction-specific costs.
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">Cost Component</th>
                  <th className="p-2.5 border-b text-right">Amount ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-2.5 font-bold">Principal</td>
                  <td className="p-2.5 text-right">$10,000.00</td>
                </tr>
                <tr>
                  <td className="p-2.5">Total Interest Paid</td>
                  <td className="p-2.5 text-right text-rose-600 font-semibold">$2,748.23</td>
                </tr>
                <tr>
                  <td className="p-2.5">Origination Fee (5.0%)</td>
                  <td className="p-2.5 text-right text-amber-600">$500.00</td>
                </tr>
                <tr>
                  <td className="p-2.5">Documentation Fee</td>
                  <td className="p-2.5 text-right text-amber-600">$750.00</td>
                </tr>
                <tr>
                  <td className="p-2.5">Other Fees</td>
                  <td className="p-2.5 text-right">$0.00</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5">Total Commercial Fees:</td>
                  <td className="p-2.5 text-right text-amber-600">$1,250.00</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5">Total Financing Cost (Interest + Fees):</td>
                  <td className="p-2.5 text-right text-indigo-600">$3,998.23</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Thus, although the nominal interest rate is 10%, the financing produces approximately $3,998.23 of interest and fees combined over the modeled term. This is why comparing loans by interest rate alone can be misleading.
          </p>
        </section>

        {/* Section 5: Nominal Rate vs Actuarial Cost (APR) */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Business Loan APR: Nominal Rate vs. Effective Financing Cost
          </h2>
          <p>
            APR terminology needs particular care for commercial financing. The calculator distinguishes two measurements:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Scale className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Nominal Interest Rate (10.00%)
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                This is the quoted annual interest rate applied to the outstanding loan balance according to the loan&apos;s repayment schedule.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Calculator className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Actuarial Annualized Cost (15.933%)
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                The calculator&apos;s actuarial APR calculation treats the actual funds received by the borrower ($8,750 net proceeds) and the scheduled repayments ($212.47/mo for 60 months) as cash flows and solves for the annualized rate (IRR) that makes those cash flows economically equivalent.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Those two numbers are deliberately shown separately from the simplified fee-load rate (12.500%) because the fee-load approximation is not the same thing as a cash-flow IRR calculation.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            This distinction is especially important for business borrowing because Regulation Z generally exempts credit primarily for business, commercial, agricultural, or organizational purposes from its consumer-credit provisions. The existence and required disclosure of an APR therefore depends on the transaction and applicable law; the calculator&apos;s actuarial figure should be understood as an annualized financing-cost comparison, not as a claim that every commercial loan is subject to consumer APR disclosure requirements.
          </p>
        </section>

        {/* Section 6: How Amortization Works */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Commercial Loan Amortization Works
          </h2>
          <p>
            Amortization describes how each payment is divided between interest and principal. At the beginning of a fully amortizing loan, the outstanding balance is larger, so the interest portion of the payment is generally larger. As principal is repaid, the balance falls and subsequent interest charges decline:
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">Period</th>
                  <th className="p-2.5 border-b">Beginning Balance</th>
                  <th className="p-2.5 border-b text-rose-600">Interest Portion</th>
                  <th className="p-2.5 border-b text-emerald-600">Principal Reduction</th>
                  <th className="p-2.5 border-b">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-2.5 font-bold">Month 1</td>
                  <td className="p-2.5">$10,000.00</td>
                  <td className="p-2.5 text-rose-600 font-semibold">$83.33</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">$129.14</td>
                  <td className="p-2.5 font-bold">$9,870.86</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Month 2</td>
                  <td className="p-2.5">$9,870.86</td>
                  <td className="p-2.5 text-rose-600 font-semibold">$82.26</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">$130.21</td>
                  <td className="p-2.5 font-bold">$9,740.65</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Month 3</td>
                  <td className="p-2.5">$9,740.65</td>
                  <td className="p-2.5 text-rose-600 font-semibold">$81.17</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">$131.30</td>
                  <td className="p-2.5 font-bold">$9,609.35</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5">Month 60 (Final)</td>
                  <td className="p-2.5">$210.71</td>
                  <td className="p-2.5 text-rose-600 font-semibold">$1.76</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">$210.71</td>
                  <td className="p-2.5 font-bold text-emerald-600">$0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            By the final scheduled payment, the modeled balance reaches $0.00. The calculator verifies that the beginning balance of each period equals the ending balance of the preceding period, and that cumulative principal and interest reconcile with the loan totals.
          </p>
        </section>

        {/* Section 7: Shorter Term vs Longer Term */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Shorter Term vs. Longer Term Business Loan
          </h2>
          <p>
            The loan term changes both cash flow and total borrowing cost:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li><strong>Shorter loan term:</strong> Higher periodic payments + lower total interest paid.</li>
            <li><strong>Longer loan term:</strong> Lower periodic payments + higher total interest paid over the life of the loan.</li>
          </ul>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The best term depends on the business&apos;s cash generation, liquidity requirements, expected return on the financed asset, and tolerance for debt-service pressure. A business should not automatically choose the longest available term simply because it produces the lowest monthly payment.
          </p>
        </section>

        {/* Section 8: What Is DSCR? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Debt Service Coverage Ratio (DSCR)?
          </h2>
          <p>
            Debt Service Coverage Ratio (DSCR) measures the relationship between the cash flow available for debt service and annual debt obligations:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            DSCR = Net Operating Income (NOI) / Annual Debt Service
          </div>
          <p>
            For example, suppose a business has: Annual NOI of $150,000, existing annual debt service of $30,000, and new loan annual debt service of $25,000:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1 font-sans tabular-nums text-xs">
            <p><strong>Total Annual Debt Service:</strong> $30,000 + $25,000 = <strong>$55,000.00/yr</strong></p>
            <p><strong>Calculated DSCR:</strong> $150,000 &divide; $55,000 = <strong>2.73x</strong></p>
            <p><strong>Maximum Annual Debt Service (at 1.25x threshold):</strong> $150,000 &divide; 1.25 = <strong>$120,000.00/yr</strong></p>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            A higher DSCR generally indicates more operating cash flow relative to required debt payments. However, 1.25&times; should be treated as an analytical benchmark, not as a universal underwriting requirement. Actual lender requirements vary by product, institution, property/business characteristics, and risk profile.
          </p>
        </section>

        {/* Section 9: Small Business Administration (SBA) Loans */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How an SBA Business Loan Differs (7(a), CDC/504 &amp; Microloans)
          </h2>
          <p>
            The U.S. Small Business Administration does not simply operate as a conventional bank. In programs such as 7(a), SBA generally provides a guarantee to participating lenders, helping lenders extend credit to qualifying small businesses:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">SBA 7(a) Program</strong>
              <p className="text-slate-600 dark:text-slate-400">
                Primary business loan program up to $5M for working capital, equipment, real estate, acquisitions, and debt refinancing.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">SBA 504 Real Estate</strong>
              <p className="text-slate-600 dark:text-slate-400">
                Long-term, fixed-rate financing up to $5.5M for major fixed assets delivered through Certified Development Companies (CDCs).
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">SBA Microloans</strong>
              <p className="text-slate-600 dark:text-slate-400">
                Designed for smaller funding needs up to $50,000 administered through approved intermediary lenders.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For 7(a) loans, lenders pay an upfront guarantee fee to the SBA and may pass that cost on to the borrower. The calculator&apos;s SBA module is best used as an estimate and planning tool, not as an official SBA eligibility determination or lender quotation.
          </p>
        </section>

        {/* Section 10: Common Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Business Loan Calculation Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li><strong>Comparing only nominal interest rates:</strong> Fees can materially change the economics of otherwise similar loans.</li>
            <li><strong>Ignoring the loan term:</strong> A lower monthly payment can result from a longer term, not a cheaper loan.</li>
            <li><strong>Treating every APR figure as equivalent:</strong> An actuarial cash-flow annualized rate, a fee-load approximation, and a legally disclosed consumer APR are not necessarily the same metric.</li>
            <li><strong>Assuming a benchmark DSCR is universal:</strong> Different lenders and financing products apply different underwriting standards.</li>
            <li><strong>Forgetting that SBA rules change:</strong> SBA programs, guarantee fees, and eligibility requirements are updated periodically.</li>
          </ul>
        </section>

        {/* Section 11: Related Calculators */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Related Business &amp; Loan Calculators
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Explore these companion financial tools for comprehensive commercial planning:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <Link
              href="/calculators/loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Loan Calculator</span>
              <span className="text-slate-500 text-[11px]">General loan amortization &amp; payment modeling.</span>
            </Link>
            <Link
              href="/calculators/personal-loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Personal Loan</span>
              <span className="text-slate-500 text-[11px]">Compare consumer loans &amp; personal debt.</span>
            </Link>
            <Link
              href="/calculators/mortgage-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Mortgage Calculator</span>
              <span className="text-slate-500 text-[11px]">Commercial &amp; residential real estate loans.</span>
            </Link>
            <Link
              href="/calculators/auto-loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Auto Loan</span>
              <span className="text-slate-500 text-[11px]">Vehicle fleet and commercial auto financing.</span>
            </Link>
            <Link
              href="/calculators/roi-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">ROI Calculator</span>
              <span className="text-slate-500 text-[11px]">Evaluate business capital return on investment.</span>
            </Link>
            <Link
              href="/calculators/payback-period-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Payback Period</span>
              <span className="text-slate-500 text-[11px]">Determine breakeven time on capital projects.</span>
            </Link>
            <Link
              href="/calculators/margin-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Margin Calculator</span>
              <span className="text-slate-500 text-[11px]">Calculate profit margins &amp; cost markup.</span>
            </Link>
            <Link
              href="/calculators/compound-interest-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Compound Interest</span>
              <span className="text-slate-500 text-[11px]">Model commercial investment compounding.</span>
            </Link>
          </div>
        </section>
      </div>

      {/* 2. FAQ SECTION (All 15 FAQs, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {businessLoanFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default BusinessLoanContent;
