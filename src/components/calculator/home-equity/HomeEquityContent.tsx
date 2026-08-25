"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";

export function HomeEquityContent() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Home Equity Loan Calculator
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Calculate home equity loan payments, maximum borrowing power, combined loan-to-value (CLTV), true APR, two-phase amortization, extra-payment savings, debt-to-income (DTI) qualification readiness, IRS tax deductibility estimates, and renovation value-add equity.
        </p>
      </div>

      {/* 2. WHAT IS A HOME EQUITY LOAN CALCULATOR? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. What Is a Home Equity Loan Calculator?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A home equity loan calculator estimates how much you may be able to borrow against the equity in a property and models the monthly payment for a fixed-rate second mortgage. The calculator combines the home's market value, existing first-mortgage balance, selected CLTV limit, requested second-loan amount, interest rate, loan term, and closing-cost assumptions.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          This is different from a HELOC. A home equity loan is generally modeled as a fixed lump-sum second mortgage with a defined repayment schedule, while a HELOC is a revolving line that may have a variable rate and separate draw and repayment phases. Users comparing those structures can use the Home Equity Loan Calculator alongside the{" "}
          <Link href="/calculators/heloc-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            HELOC Calculator
          </Link>{" "}
          to see how the payment structure changes under the same equity assumptions.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Underwriting Model Notice</span>
          </div>
          <p>
            A calculator result is a mathematical scenario, not a lender commitment. Actual credit limits, interest rates, underwriting criteria, appraisal valuations, fees, and approval requirements vary by lender and individual borrower circumstances.
          </p>
        </div>
      </section>

      {/* 3. HOW TO USE THE HOME EQUITY LOAN CALCULATOR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. How to Use the Home Equity Loan Calculator
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Follow these sequential steps to evaluate your second mortgage borrowing options:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            "1. Enter the current estimated home market value.",
            "2. Enter the balance of the existing first mortgage.",
            "3. Select the maximum CLTV limit used by the model (e.g. 80% Standard, 85%, or 90%).",
            "4. Choose Mode A to enter a desired second-loan amount or Mode B to calculate maximum borrowing capacity.",
            "5. Enter the fixed interest rate and loan term (e.g. 15 or 30 years).",
            "6. Enter estimated upfront closing costs.",
            "7. Select the closing-cost treatment used by the calculator (Upfront in Cash, Deducted, or Financed).",
            "8. Review the fixed monthly payment.",
            "9. Check maximum borrowable equity, new post-loan CLTV, protected equity, and true APR.",
            "10. Inspect the annual and monthly second mortgage amortization schedule and export to CSV.",
            "11. Test extra monthly payments or annual lump sums in the prepayment simulator.",
            "12. Compare the fixed second mortgage with the calculator's HELOC and cash-out refinance scenarios.",
            "13. Review DTI, tax, and home-renovation ROI outputs separately under their respective assumptions.",
            "14. Save the calculation scenario to your local history drawer before testing alternative values.",
          ].map((step, idx) => (
            <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOME EQUITY AND CLTV */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Home Equity and Combined Loan-to-Value (CLTV)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator's core borrowing-power formula begins with the maximum allowable total debt permitted by the selected CLTV cap:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"Maximum Allowable Debt = Home Value × Maximum CLTV"}</div>
          <div>{"Maximum Borrowable Equity = Maximum Allowable Debt - Existing First Mortgage"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For the validated baseline: a $500,000 home with a $275,000 first mortgage and an 80% maximum CLTV limit supports up to $400,000 of combined debt ($500,000 × 80%). Subtracting the $275,000 first mortgage leaves a maximum borrowable second mortgage of <strong>$125,000</strong>. The resulting current first-mortgage LTV is 55.0%, the post-loan CLTV is <strong>80.0%</strong>, and protected unencumbered equity is <strong>20.0% ($100,000)</strong>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Users who are still determining whether the overall property is affordable can also use the{" "}
          <Link href="/calculators/house-affordability-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            House Affordability Calculator
          </Link>{" "}
          to separate overall property purchase affordability from the narrower question of how much existing equity might support a second-lien loan.
        </p>
      </section>

      {/* 5. MODE A VS MODE B */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Mode A vs. Mode B: Specified Loan vs. Maximum Capacity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">Mode A — Specified Loan Amount</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Mode A calculates the payment and CLTV using a user-entered desired second-loan amount (e.g. $125,000). The calculator safely limits the funded loan to the maximum borrowing capacity permitted by the equity cap.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">Mode B — Maximum LTV Capacity</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Mode B automatically uses the maximum second-loan amount supported by the selected CLTV limit and existing first-mortgage balance ($125,000 under the baseline).
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Under the validated baseline, both modes converge on a $125,000 second mortgage when the requested loan equals the maximum permitted borrowing capacity.
        </p>
      </section>

      {/* 6. MONTHLY PAYMENT FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Monthly Payment Formula
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The fixed monthly payment uses standard fixed-rate amortization mathematics:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"M = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}"}</div>
          <div className="text-[11px] text-slate-500 pt-1">
            Where: P = financed loan amount, r = monthly interest rate (annual rate ÷ 12), n = total number of monthly payments.
          </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For $125,000 at 8.0% over 15 years (180 months), the monthly payment is approximately $1,194.896, rounded to <strong>$1,195/month</strong>. Over the 15-year term, the borrower makes 180 payments totaling $215,081, resulting in <strong>$90,081</strong> of total lifetime interest.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For a comprehensive principal-and-interest breakdown, users can also explore the{" "}
          <Link href="/calculators/amortization-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Amortization Calculator
          </Link>{" "}
          to inspect monthly balance trajectories.
        </p>
      </section>

      {/* 7. IMPORTANT ZERO-INTEREST EDGE CASE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Zero-Interest Engine Behavior
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The current production engine contains a conditional check requiring positive interest. At a 0% interest rate, the calculator returns $0/month rather than the standard linear loan ÷ months division ($1,000/mo on $120,000 over 120 months).
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This is an explicitly documented engine edge behavior from the master regression audit. It is preserved for exact mathematical consistency with the production runtime.
        </p>
      </section>

      {/* 8. AMORTIZATION SCHEDULE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Second Mortgage Amortization Schedule
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator tracks beginning balance, payment, principal, interest, and ending balance across every period. For the validated Year 1 baseline:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Beginning Balance: $125,000</div>
          <div>• Annual Payment Displayed: $14,335</div>
          <div>• Principal Paid: $4,497</div>
          <div>• Interest Paid: $9,837</div>
          <div>• Ending Balance: $120,503</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The loan reaches exactly <strong>$0.00</strong> ending balance at Month 180 / Year 15. The annual summary accumulates unrounded internal cash flows ($1,194.896 × 12 = $14,338.75 → $14,335), while individual monthly rows display integer-rounded values ($1,195 × 12 = $14,340), with both reconciling to the exact same terminal balance.
        </p>
      </section>

      {/* 9. TRUE APR AND CLOSING COSTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. True APR and Closing Costs
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The calculator models a true APR that incorporates upfront closing costs rather than reporting the nominal interest rate alone:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Financed Loan: $125,000 | Nominal Rate: 8.0% | Term: 15 Years</div>
          <div>• Closing Costs: $2,500</div>
          <div>• Displayed True APR: <strong>8.10%</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The engine computes fee impact over the loan term. When comparing financing options, users should treat "true APR" as the calculator's modeled rate rather than assuming identity with a specific lender's Truth in Lending disclosure.
        </p>
      </section>

      {/* 10. CLOSING-COST TREATMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Closing-Cost Treatment Modes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">Paid Upfront in Cash</div>
            <p className="text-slate-600 dark:text-slate-400">
              The borrower receives the full $125,000 proceeds, and the $2,500 closing cost is paid separately out of pocket.
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">Deducted from Proceeds</div>
            <p className="text-slate-600 dark:text-slate-400">
              The loan remains $125,000, but net cash received is reduced to $122,500 after deducting the closing fees.
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">Financed into 2nd Mortgage</div>
            <p className="text-slate-600 dark:text-slate-400">
              The second-mortgage balance becomes $127,500, raising the monthly payment to $1,219/mo and post-loan CLTV to 80.5%.
            </p>
          </div>
        </div>
      </section>

      {/* 11. DTI QUALIFICATION CHECKER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Debt-to-Income (DTI) Qualification Readiness
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The DTI module uses the proposed second-mortgage payment and existing monthly obligations to estimate the back-end debt-to-income ratio:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"\\text{Back-End DTI \\%} = \\frac{\\text{Proposed Housing Payment} + \\text{Other Monthly Debts}}{\\text{Gross Monthly Income}} \\times 100"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          In the validated baseline ($8,500 gross income, $800 other debts, $1,195 second-mortgage payment), total monthly obligations equal $1,995, producing a back-end DTI of <strong>23.5%</strong>. The engine classifies this as "Excellent DTI (Under 36% Benchmark)."
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For a broader debt-burden analysis across all revolving and installment liabilities, contextualize this result with the{" "}
          <Link href="/calculators/dti-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Debt-to-Income (DTI) Ratio Calculator
          </Link>.
        </p>
      </section>

      {/* 12. CREDIT SCORE AND CLTV QUALIFICATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. Credit Score and CLTV Qualification Tiers
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Lenders use credit scores and CLTV limits to establish underwriting eligibility. A 620–680 credit score represents a typical minimum qualifying threshold, while 740+ scores generally unlock the most competitive interest rates and highest borrowing caps (up to 85%–90% CLTV).
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          These tiers are educational benchmarks rather than statutory rules. Actual lender overlays, appraisal requirements, loan-to-value ceilings, and underwriting requirements vary by institution.
        </p>
      </section>

      {/* 13. HOME EQUITY LOAN VS HELOC */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. Home Equity Loan vs. HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A fixed home equity loan is a lump-sum second mortgage with a fixed repayment schedule, whereas a HELOC is a revolving credit line with variable rates and separate draw and repayment phases. In our $75,000 cash-needed comparison:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Fixed Second Mortgage (8.0%, 15-Yr): <strong>$717/month</strong> (5-Yr Cost: $43,020)</div>
          <div>• HELOC (9.25% Interest-Only Draw): <strong>$578/month</strong> (5-Yr Cost: $34,680)</div>
          <div>• Cash-Out Refinance (6.75%, 30-Yr): <strong>$2,296/month</strong> (5-Yr Cost: $137,760)</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Users evaluating revolving lines should also explore the{" "}
          <Link href="/calculators/heloc-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            HELOC Calculator
          </Link>{" "}
          to review two-phase payment shock and rate stress scenarios.
        </p>
      </section>

      {/* 14. HOME EQUITY LOAN VS CASH-OUT REFINANCE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Home Equity Loan vs. Cash-Out Refinance
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A cash-out refinance replaces your existing first mortgage with a new, larger loan, whereas a home equity loan adds a second lien while keeping your original first mortgage untouched.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          When an existing first mortgage carries a low rate (e.g. 3.5%), preserving that low rate on the $275,000 balance is often far more cost-effective than refinancing the entire $350,000+ debt at today's higher interest rates. For a dedicated first-mortgage replacement analysis, use the{" "}
          <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Refinance Calculator
          </Link>.
        </p>
      </section>

      {/* 15. EXTRA PRINCIPAL PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Extra Principal Payments & Prepayment Savings
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Making extra principal payments reduces the outstanding second mortgage balance faster and eliminates future interest charges. In our validated example ($125,000 loan @ 8.0%, 15-year term):
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Extra Monthly Payment: $150/month</div>
          <div>• Original Term: 180 months (15.0 years) → Accelerated Term: 146 months (12.2 years)</div>
          <div>• Time Saved: <strong>34 months (2.8 years shaved off)</strong></div>
          <div>• Lifetime Interest Saved: <strong>$19,341</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Borrowers comparing prepayment strategies across multiple liabilities can also utilize the{" "}
          <Link href="/calculators/debt-payoff-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Debt Payoff Calculator
          </Link>{" "}
          and{" "}
          <Link href="/calculators/amortization-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Amortization Calculator
          </Link>.
        </p>
      </section>

      {/* 16. TAX DEDUCTIBILITY ESTIMATOR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. IRS Tax Deductibility Estimator (Current Rules)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Under the Tax Cuts and Jobs Act (TCJA), interest paid on a second mortgage is tax-deductible only if the proceeds are used to buy, build, or substantially improve the home securing the loan:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"\\text{Projected Annual Tax Savings} = \\text{Annual Deductible Interest} \\times \\text{Marginal Tax Rate}"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For our validated baseline with $6,000 in average annual deductible interest at a 24% federal tax bracket, projected tax savings equal <strong>$1,440/year</strong>, lowering the effective after-tax interest rate to <strong>6.08%</strong>. If used for personal expenses or debt consolidation, the interest is non-deductible ($0 savings).
        </p>
        <p className="text-xs text-slate-500 italic">
          *Notice: Tax deductibility depends on individual tax filing status, aggregate mortgage debt limits ($750k MFJ), itemization, and documentation. This is an illustrative planning estimate, not formal tax advice.
        </p>
      </section>

      {/* 17. RENOVATION AND VALUE-ADD FORECASTER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          16. Home Renovation & Value-Add Equity Forecaster
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The renovation module estimates post-project home value and net equity based on project cost and expected value ROI:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Current Value: $500,000 | 1st Mortgage: $275,000 | Project Cost: $50,000 @ 70% ROI</div>
          <div>• Value Added to Home: $35,000 ($50,000 × 70%)</div>
          <div>• Projected Post-Remodel Value: <strong>$535,000</strong></div>
          <div>• Renovation Loan Payment (15 Yrs @ 8%): <strong>$478/month</strong></div>
          <div>• Resulting Net Home Equity: <strong>$210,000</strong> ($535,000 - $325,000 Total Liens)</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Expected ROI is a modeling assumption; actual appraised resale values depend on local market conditions. For overall home purchase budgeting, explore the{" "}
          <Link href="/calculators/house-affordability-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            House Affordability Calculator
          </Link>.
        </p>
      </section>

      {/* 18. RISKS OF A HOME EQUITY LOAN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          17. Risks of a Home Equity Loan
        </h2>
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1 text-xs text-slate-700 dark:text-slate-300">
          <div className="font-extrabold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Collateral Security & Foreclosure Warning</span>
          </div>
          <p>
            Because a home equity loan is secured by your home, failure to meet payment obligations can result in second-lien foreclosure. Borrowers should consider closing costs (2%–5%), potential overleveraging if property values decline, and the added cash-flow obligation alongside their primary mortgage.
          </p>
        </div>
      </section>

      {/* 19. UNDERWATER / NEGATIVE EQUITY SCENARIO */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          18. Underwater / Negative Equity Scenarios
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          If combined mortgage balances exceed the home's market value, the property enters negative equity (underwater state). While regular monthly payments remain unchanged, selling or refinancing requires bringing cash to closing to satisfy all outstanding lien balances. The calculator safely clamps borrowing capacity to $0 in negative equity scenarios.
        </p>
      </section>

      {/* 20. PREPAYMENT PENALTIES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          19. Prepayment Penalties
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Many modern second mortgage products allow early payoff without penalty, but prepayment terms remain loan-specific. Borrowers should always verify early payoff terms directly within their loan agreement.
        </p>
      </section>

      {/* 21. CLOSING COSTS AND TIMELINES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          20. Closing Costs & Funding Timelines
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Second mortgage closing costs typically range from 2% to 5% of the loan amount ($1,500–$4,000), covering appraisal fees, title searches, credit reports, and origination charges. Loan approval and funding usually require 2 to 6 weeks, depending on documentation, appraisal turnaround, and lender processing capacity.
        </p>
      </section>

      {/* 22. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          21. Common Home Equity Loan Calculator Mistakes to Avoid
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li><strong>Confusing total home equity with available borrowing capacity:</strong> Lenders require an equity buffer (typically 15%–20%), so you cannot borrow 100% of equity.</li>
            <li><strong>Forgetting that the first mortgage remains part of CLTV:</strong> Second mortgage limits are calculated after subtracting the full first-mortgage balance.</li>
            <li><strong>Assuming 80% CLTV is a universal ceiling:</strong> Some credit unions allow 85%–90% CLTV for high-credit borrowers.</li>
            <li><strong>Treating 620–680 credit score tiers as guaranteed approval thresholds:</strong> Debt ratios, income history, and appraisal values also determine eligibility.</li>
            <li><strong>Comparing a second-mortgage payment with a cash-out refinance without accounting for first-mortgage replacement:</strong> Refinancing resets your entire balance to today's rates.</li>
            <li><strong>Ignoring closing costs when comparing APR:</strong> Upfront fees increase the true effective borrowing cost.</li>
            <li><strong>Assuming all interest is automatically tax-deductible:</strong> TCJA requires funds to be used for substantial home improvements.</li>
            <li><strong>Assuming renovation ROI equals guaranteed appraised value:</strong> Resale value increases depend on market demand and property condition.</li>
            <li><strong>Ignoring negative-equity risk:</strong> Overleveraging equity reduces financial cushion if property values decline.</li>
            <li><strong>Treating model comparison recommendations as universal financial advice:</strong> Optimal financing depends on individual cash-flow needs and existing mortgage rates.</li>
          </ul>
        </div>
      </section>

      {/* 23. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          22. Core Formulas Summary
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>Maximum Allowable Debt:</strong> Home Value × Maximum CLTV</div>
          <div>• <strong>Maximum Borrowable Equity:</strong> max(0, Maximum Allowable Debt - 1st Mortgage Balance)</div>
          <div>• <strong>Post-Loan CLTV:</strong> (1st Mortgage Balance + 2nd Mortgage Balance) ÷ Home Value × 100</div>
          <div>• <strong>Protected Equity:</strong> 100% - Post-Loan CLTV</div>
          <div>• <strong>Monthly Payment:</strong> P × [r(1+r)^n] ÷ [(1+r)^n - 1]</div>
          <div>• <strong>Back-End DTI:</strong> (New Housing Payment + Other Monthly Debts) ÷ Gross Monthly Income × 100</div>
          <div>• <strong>Projected Tax Savings:</strong> Annual Deductible Interest × Marginal Tax Rate</div>
        </div>
      </section>

      {/* 24. YMYL AND REGULATORY GUIDANCE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Educational Guidance & Regulatory Notice</span>
        </div>
        <p>
          Home equity loans and second mortgages are governed by the Truth in Lending Act (TILA), Real Estate Settlement Procedures Act (RESPA), and IRS Publication 936. This calculator generates mathematical simulations based on user inputs and does not constitute a commitment to lend, financial advice, or formal tax counsel.
        </p>
      </section>
    </div>
  );
}

export default HomeEquityContent;
