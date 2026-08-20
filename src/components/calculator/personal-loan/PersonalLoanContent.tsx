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
  AlertTriangle,
  FileText,
} from "lucide-react";

export function PersonalLoanContent() {
  const faqs = [
    {
      q: "What is a personal loan?",
      a: "A personal loan is a closed-end installment loan provided by a bank, credit union, or online lender that disburses a lump sum of money upfront. Borrowers repay the debt in fixed monthly payments over a predetermined term (commonly 12 to 84 months, or 1 to 7 years) with interest.",
    },
    {
      q: "How is a personal loan payment calculated?",
      a: "Personal loan payments are calculated using the ordinary annuity formula: PMT = P × [r(1 + r)ⁿ] / [(1 + r)ⁿ − 1], where P is principal, r is the monthly periodic interest rate (APR / 12 / 100), and n is total months.",
    },
    {
      q: "How does an origination fee affect the net amount I receive?",
      a: "When an origination fee (commonly 1% to 8% in illustrative market tiers) is deducted from proceeds, net cash received equals the gross loan amount minus the fee. For example, a 5% fee on a $20,000 loan reduces net disbursed cash to $19,000 while monthly payments remain based on the full $20,000 principal.",
    },
    {
      q: "What is the difference between nominal interest rate and APR?",
      a: "The nominal interest rate reflects the basic annualized percentage charged on the principal balance. The Annual Percentage Rate (APR) incorporates both the nominal interest rate and prepaid lender finance charges (such as origination fees), reflecting the true annualized cost of borrowing.",
    },
    {
      q: "How does this calculator estimate fee-inclusive APR?",
      a: "This calculator estimates fee-inclusive APR using an actuarial cash-flow discounting model that solves for the internal rate of return (i) equating net disbursed proceeds to the present value of scheduled monthly payments: Net Proceeds = Σ [PMT_t / (1 + i)^t].",
    },
    {
      q: "Can a personal loan consolidate high-interest credit card debt?",
      a: "Yes. Consolidating multiple high-interest credit cards into a single fixed-rate personal loan combines balances into one monthly payment, often at a lower interest rate, establishing a structured payoff timeline.",
    },
    {
      q: "Does a lower monthly payment always mean I am saving money?",
      a: "Not necessarily. A lower monthly payment can result simply from extending the repayment term over more years. While this provides monthly cash-flow relief, it can increase total cumulative interest paid over the life of the loan.",
    },
    {
      q: "How does loan term length affect total borrowing cost?",
      a: "Shorter loan terms require higher monthly payments but minimize total interest charges. Longer loan terms lower monthly payments but increase total lifetime interest expenses because interest compounds over a longer duration.",
    },
    {
      q: "Can extra principal payments reduce personal loan interest?",
      a: "In this calculator's model, extra monthly payments reduce principal balance faster, which shortens the remaining repayment duration and reduces future interest charges. Borrowers should always verify specific prepayment provisions with their lender.",
    },
    {
      q: "Are personal loans always unsecured?",
      a: "No. While many personal loans are unsecured (requiring no collateral), lenders also offer secured personal loans backed by pledged assets such as savings accounts, certificates of deposit (CDs), or vehicles.",
    },
  ];

  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 mt-6">
      {/* 1. What Is a Personal Loan? */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            1. What Is a Personal Loan?
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          A <strong>personal loan</strong> is a closed-end installment loan in which a borrower receives a lump-sum principal amount upfront and agrees to repay the debt through predetermined, periodic payments over a defined maturity horizon.
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Many consumer personal loans are structured as <strong>fixed-rate installment credit</strong>, where the nominal interest rate and scheduled monthly payments remain constant throughout the borrowing term. While personal loans are frequently <strong>unsecured</strong> (issued based primarily on credit history, verifiable income, and debt-to-income ratio without collateral), lenders also offer <strong>secured personal loans</strong> backed by pledged collateral such as savings accounts, certificates of deposit (CDs), or vehicles.
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Personal loan terms commonly range from about <strong>12 to 84 months (1 to 7 years)</strong>, although available terms, minimums, maximums, and interest rate tiers vary by lender, loan product, and individual creditworthiness.
        </p>
      </section>

      {/* 2. How Personal Loan Payments Work */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Layers className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            2. How Personal Loan Payments Work
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          When an installment loan is funded, repayment occurs according to a structured <strong>amortization schedule</strong>. Each scheduled monthly payment is split into two distinct financial components:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">1. Monthly Interest Charge:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The fee paid to the lender for borrowing the remaining balance during the monthly billing cycle (Interest = Prior Balance × Monthly Rate). In the early stages of a loan, interest comprises the largest portion of your monthly payment.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">2. Principal Reduction:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The remainder of your payment applied directly toward reducing the outstanding debt balance (Principal Reduction = Payment − Interest). As the principal balance drops, consecutive monthly interest charges decrease, accelerating equity payoff.
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          As previous payments systematically reduce the remaining principal balance, less interest accrues in subsequent cycles. Consequently, an increasingly larger percentage of each subsequent payment is directed toward principal reduction until the debt is fully retired at maturity. To review the principal and interest allocation across every payment, see our{" "}
          <Link
            href="/calculators/amortization-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            loan amortization calculator
          </Link>
          .
        </p>
      </section>

      {/* 3. Personal Loan Payment Formula */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Calculator className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            3. Personal Loan Payment Formula
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          The fixed monthly installment for an ordinary amortizing personal loan is calculated using the standard closed-end annuity formula. For broader installment-loan scenarios and alternative payment frequencies, see our{" "}
          <Link
            href="/calculators/loan-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            general installment loan calculator
          </Link>
          :
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
            <span className="text-slate-500 text-[11px] block">Fixed monthly installment</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm block">P</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Loan Principal</span>
            <span className="text-slate-500 text-[11px] block">Gross amount borrowed</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-purple-600 dark:text-purple-400 font-mono text-sm block">r</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Monthly Rate</span>
            <span className="text-slate-500 text-[11px] block">Annual rate / 12 / 100</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 font-mono text-sm block">n</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Total Periods</span>
            <span className="text-slate-500 text-[11px] block">Years × 12 + Months</span>
          </div>
        </div>
      </section>

      {/* 4. Verified Worked Example */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Percent className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            4. Verified Calculation Example ($20,000 @ 10.0% for 5 Years)
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Consider a consumer borrowing $20,000.00 at a 10.0% stated APR over a 5-year term (60 monthly payments) starting in August 2026 with no upfront fees:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 font-mono text-sm block">$424.94</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Monthly Payment</span>
            <span className="text-slate-500 text-[11px] block">Fixed per month</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 font-mono text-sm block">$25,496.45</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Total Repayment</span>
            <span className="text-slate-500 text-[11px] block">All 60 payments</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm block">$5,496.45</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Total Interest</span>
            <span className="text-slate-500 text-[11px] block">Cumulative cost</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-purple-600 dark:text-purple-400 font-mono text-sm block">Aug 2031</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 block">Payoff Date</span>
            <span className="text-slate-500 text-[11px] block">Zero-balance date</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <strong>Calculation Invariant:</strong> Using the calculator&apos;s full-precision amortization schedule, total scheduled repayment is <strong>$25,496.45</strong> (where each unrounded monthly payment of $424.9409... is amortized over exactly 60 periods).
        </p>
      </section>

      {/* 5. Origination Fees & Net Disbursed Proceeds */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            5. Origination Fees &amp; Net Disbursed Proceeds
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Some lenders charge upfront origination fees, and the fee amount and treatment vary by lender and loan product. In illustrative market tiers, origination fees commonly range from <strong>1% to 8%</strong> of the gross borrowed principal.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <strong className="text-slate-900 dark:text-slate-100 block font-semibold text-sm">
            Gross Financed Loan vs. Net Cash Received (5% Fee Example):
          </strong>
          <ul className="space-y-1 text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>• <strong>Gross Loan Amount Borrowed:</strong> $20,000.00</li>
            <li>• <strong>Illustrative Origination Fee (5.0%):</strong> $20,000 × 0.05 = $1,000.00</li>
            <li>• <strong>Net Cash Disbursed to Borrower:</strong> $20,000 − $1,000 = <strong>$19,000.00</strong></li>
            <li>• <strong>Repayment Obligation:</strong> The borrower makes 60 monthly payments of <strong>$424.94</strong> based on the full $20,000 balance.</li>
          </ul>
          <p className="text-slate-500 text-[11px] pt-1">
            Because $1,000 is deducted upfront, borrowing $19,000 in net usable cash while repaying $25,496.45 increases the true annualized borrowing cost above the 10.0% nominal rate. Because fees can change the effective borrowing cost, our{" "}
            <Link
              href="/calculators/apr-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              APR calculator
            </Link>{" "}
            can be used to explore fee-inclusive APR calculations.
          </p>
        </div>
      </section>

      {/* 6. Nominal Interest Rate vs. Fee-Inclusive Actuarial APR */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Scale className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            6. Nominal Interest Rate vs. Fee-Inclusive Actuarial APR
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          This calculator estimates fee-inclusive APR using an actuarial cash-flow discounting model for the payment structure and fee inputs supported by the tool. Borrowers can{" "}
          <Link
            href="/calculators/apr-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            calculate fee-inclusive APR
          </Link>{" "}
          to evaluate how different upfront closing charges impact overall financing expenses:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Fee Scenario ($20,000 @ 10% 5Y)</th>
                <th className="p-3">Origination Fee</th>
                <th className="p-3">Net Disbursed Cash</th>
                <th className="p-3">Monthly Payment</th>
                <th className="p-3">Total Repaid</th>
                <th className="p-3 text-blue-600 dark:text-blue-400">Estimated Actuarial APR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-sans tabular-nums text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Fee-Free Baseline</td>
                <td className="p-3">$0.00 (0%)</td>
                <td className="p-3">$20,000.00</td>
                <td className="p-3">$424.94</td>
                <td className="p-3">$25,496.45</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">10.000%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">1.0% Origination Fee</td>
                <td className="p-3">$200.00</td>
                <td className="p-3">$19,800.00</td>
                <td className="p-3">$424.94</td>
                <td className="p-3">$25,696.45</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">10.435%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">5.0% Origination Fee</td>
                <td className="p-3">$1,000.00</td>
                <td className="p-3">$19,000.00</td>
                <td className="p-3">$424.94</td>
                <td className="p-3">$26,496.45</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">12.239%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">8.0% Origination Fee</td>
                <td className="p-3">$1,600.00</td>
                <td className="p-3">$18,400.00</td>
                <td className="p-3">$424.94</td>
                <td className="p-3">$27,096.45</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">13.664%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          *Note: U.S. Regulation Z provides prescribed calculation methods for closed-end consumer credit disclosures. The calculator provides an educational mathematical estimate and is not a formal substitute for official lender-provided Truth in Lending Act (TILA) disclosures.
        </p>
      </section>

      {/* 7. Loan-Term & Total-Interest Trade-Offs */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Clock className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            7. Loan-Term &amp; Total-Interest Trade-Offs
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Selecting a personal loan duration requires balancing immediate monthly budget constraints against cumulative lifetime interest expenses:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Term Horizon</th>
                <th className="p-3">Monthly Payment ($PMT$)</th>
                <th className="p-3">Total Interest Paid</th>
                <th className="p-3">Total Repayment Cost</th>
                <th className="p-3">Interest % of Principal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-sans tabular-nums text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">2 Years (24 Months)</td>
                <td className="p-3 font-bold text-slate-900 dark:text-slate-100">$922.90</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$2,149.57</td>
                <td className="p-3">$22,149.57</td>
                <td className="p-3">10.7%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">3 Years (36 Months)</td>
                <td className="p-3 font-bold text-slate-900 dark:text-slate-100">$645.34</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$3,232.37</td>
                <td className="p-3">$23,232.37</td>
                <td className="p-3">16.2%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">4 Years (48 Months)</td>
                <td className="p-3 font-bold text-slate-900 dark:text-slate-100">$507.25</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$4,348.06</td>
                <td className="p-3">$24,348.06</td>
                <td className="p-3">21.7%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">5 Years (60 Months)</td>
                <td className="p-3 font-bold text-slate-900 dark:text-slate-100">$424.94</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$5,496.45</td>
                <td className="p-3">$25,496.45</td>
                <td className="p-3">27.5%</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">7 Years (84 Months)</td>
                <td className="p-3 font-bold text-slate-900 dark:text-slate-100">$332.61</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">$7,939.26</td>
                <td className="p-3">$27,939.26</td>
                <td className="p-3">39.7%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. Debt Consolidation: Monthly Relief vs Total Cost */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <TrendingDown className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            8. Debt Consolidation: Monthly Relief vs. Total Cost
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Consolidating multiple revolving credit cards into a single fixed-rate personal loan is a common consumer strategy. Use a{" "}
          <Link
            href="/calculators/debt-consolidation-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            debt consolidation calculator
          </Link>{" "}
          to compare multiple balances, interest rates, payment obligations, and consolidation scenarios. If the goal is specifically to eliminate revolving card balances, a{" "}
          <Link
            href="/calculators/credit-card-payoff-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            credit card payoff calculator
          </Link>{" "}
          can show alternative repayment timelines.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">Current Credit Card Status:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">• Card A: $8,000 @ 19.99% ($240.00/mo; ~49.1 mo payoff)</p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">• Card B: $7,000 @ 24.99% ($225.00/mo; ~50.6 mo payoff)</p>
            <p className="font-semibold text-slate-900 dark:text-slate-100 pt-1">Total: $15,000 debt @ $465.00/mo</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-blue-600 dark:text-blue-400 block font-semibold">Consolidated Personal Loan:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">• $15,000 balance + $750 (5% financed fee) = $15,750 principal</p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">• Rate: 12.0% APR over 5 Years (60 Months)</p>
            <p className="font-semibold text-blue-600 dark:text-blue-400 pt-1">New Payment: $350.35/mo (14.170% Actuarial APR)</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <strong className="text-slate-900 dark:text-slate-100 block font-semibold text-sm">Four-Part Mathematical Breakdown:</strong>
          <ul className="space-y-1 text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>• <strong>Monthly Cash-Flow Relief:</strong> Dropping from $465.00/mo to $350.35/mo frees up <strong>$114.65/month</strong> in immediate monthly cash flow.</li>
            <li>• <strong>Actual Existing-Card Payoff Baseline:</strong> At current $465/mo payments, the cards pay off in ~50 months with $8,165.60 in total interest ($23,165.60 total card outlays).</li>
            <li>• <strong>Consolidated Loan Total Cost:</strong> The 5-year personal loan incurs $5,271.00 in interest and a $750 fee ($6,021.00 total borrowing cost, $21,021.00 total outlays).</li>
            <li>• <strong>Modeled Cost Difference:</strong> Under the primary card payoff baseline, consolidation saves <strong>$2,144.60 in total lifetime borrowing cost</strong>. Under a hypothetical 60-month card amortization assumption ($10,039.49 card interest), the modeled cost difference is <strong>$4,018.49</strong>.</li>
          </ul>
          <p className="text-amber-700 dark:text-amber-400 text-[11px] pt-1 font-medium">
            <strong>Critical Guardrail:</strong> Lower monthly payment does not automatically mean lower total cost. When consolidating revolving debt, borrowers must evaluate both immediate monthly payment relief and total lifetime borrowing cost across the full repayment horizon.
          </p>
        </div>
      </section>

      {/* 9. Extra Monthly Payments & Accelerated Early Payoff */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Zap className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            9. Extra Payments &amp; Early Payoff
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          In this calculator&apos;s model, additional principal payments reduce the outstanding principal faster, shortening the modeled repayment period and reducing future interest. For broader payoff-strategy comparisons, use a{" "}
          <Link
            href="/calculators/debt-payoff-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            debt payoff calculator
          </Link>{" "}
          to model accelerated repayment approaches:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <strong className="text-slate-900 dark:text-slate-100 block font-semibold text-sm">
            Accelerated Payoff Walkthrough ($20,000 @ 10% 5Y Loan):
          </strong>
          <ul className="space-y-1 text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>• <strong>Scheduled Baseline Payment:</strong> $424.94/month (60 Months, $5,496.45 Total Interest).</li>
            <li>• <strong>With +$100.00/Month Extra Principal ($524.94 Total):</strong> Repayment finishes in <strong>47 Months</strong> (shortened by <strong>13 Months</strong>).</li>
            <li>• <strong>New Total Interest Paid:</strong> $4,162.65.</li>
            <li>• <strong>Total Interest Saved:</strong> <strong>$1,333.80</strong> ($5,496.45 − $4,162.65).</li>
          </ul>
          <p className="text-slate-500 text-[11px] pt-1">
            *Prepayment Note: Whether early payoff is penalty-free depends on the loan agreement, lender, loan product, and applicable law. Borrowers should verify the specific prepayment provisions in their promissory note.
          </p>
        </div>
      </section>

      {/* 10. Common Personal Loan Mistakes to Avoid */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            10. Common Personal Loan Mistakes to Avoid
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">1. Borrowing More Than Necessary:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Borrowing excess funds increases cumulative interest charges and raises upfront percentage-based origination fees.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">2. Focusing Solely on Monthly Payment:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Extending loan duration to reduce monthly payments increases the total lifetime interest paid over the life of the loan.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">3. Overlooking Origination Fee Deductions:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Failing to factor in upfront fee deductions can leave you short of the net cash required for your planned expense.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">4. Ignoring Potential Autopay Discounts:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Some lenders may offer rate discounts for automatic electronic payments depending on lender policy.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 sm:col-span-2">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">5. Overlooking Refinancing Break-Even Horizons:</strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              When comparing a replacement loan against your existing balance, a{" "}
              <Link
                href="/calculators/refinance-calculator"
                className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                personal loan refinance calculator
              </Link>{" "}
              can help evaluate the break-even point after factoring in new closing fees and revised interest rates.
            </p>
          </div>
        </div>
      </section>

      {/* 11. Related Financial & Debt Calculators */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            11. Related Financial &amp; Debt Calculators
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <Link
            href="/calculators/loan-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors space-y-1 block"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              General Installment Loan Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Calculate installment loan payments across multiple frequencies.
            </span>
          </Link>
          <Link
            href="/calculators/debt-consolidation-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors space-y-1 block"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Debt Consolidation Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Compare consolidation scenarios across multiple credit balances.
            </span>
          </Link>
          <Link
            href="/calculators/debt-payoff-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors space-y-1 block"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Debt Payoff Strategy Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Estimate payoff timing using Snowball vs Avalanche methods.
            </span>
          </Link>
          <Link
            href="/calculators/credit-card-payoff-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors space-y-1 block"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Credit Card Payoff Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Model revolving credit card payoff timing and interest.
            </span>
          </Link>
          <Link
            href="/calculators/apr-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors space-y-1 block"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              APR Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Calculate fee-inclusive APR and finance charge impacts.
            </span>
          </Link>
          <Link
            href="/calculators/amortization-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors space-y-1 block"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Loan Amortization Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              View detailed multi-year amortization schedules and balance curves.
            </span>
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors space-y-1 block"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Personal Loan Refinance Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Evaluate refinancing break-even thresholds and interest savings.
            </span>
          </Link>
          <Link
            href="/calculators/auto-loan-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors space-y-1 block"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Auto Loan Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Model vehicle installment payments, sales tax, and loan terms.
            </span>
          </Link>
          <Link
            href="/calculators/credit-card-calculator"
            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors space-y-1 block"
          >
            <strong className="font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between">
              Credit Card Calculator
              <ArrowUpRight className="h-3.5 w-3.5" />
            </strong>
            <span className="text-slate-500 block text-[11px]">
              Calculate revolving credit interest and daily compounding charges.
            </span>
          </Link>
        </div>
      </section>

      {/* 12. Frequently Asked Questions */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            12. Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3 text-xs">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5"
            >
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                {item.q}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 13. Methodology, Privacy & Limitations */}
      <section className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>Mathematical Methodology &amp; Client-Side Privacy</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          This calculator executes double-precision floating-point arithmetic using standard discrete amortization algorithms and bisection root-finding for actuarial APR cash-flow discounting. 100% of mathematical evaluations execute locally within your browser; no financial inputs, loan parameters, or personal data are stored or transmitted to external servers.
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          <strong>Educational Disclaimer:</strong> This calculator is designed for educational, analytical, and illustrative purposes only and does not constitute formal financial, legal, tax, or lending advice. Final loan terms, annual percentage rates, closing fees, and qualification requirements are established exclusively by licensed financial institutions following formal credit underwriting.
        </p>
      </section>
    </div>
  );
}

export default PersonalLoanContent;
