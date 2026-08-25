"use client";

import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, AlertCircle, Info, ArrowRight } from "lucide-react";

export function VAMortgageContent() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          VA Mortgage Calculator
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Estimate VA mortgage payments, funding fees, PITI, entitlement purchasing power, bi-weekly acceleration, extra-payment payoff schedules, IRRRL streamline refinance savings, and 3-way VA vs. FHA vs. Conventional loan comparisons.
        </p>
      </div>

      {/* 2. WHAT IS A VA MORTGAGE CALCULATOR? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. What Is a VA Mortgage Calculator?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A VA mortgage calculator estimates the monthly and long-term cost of a VA-backed home loan under a selected set of assumptions. A comprehensive VA calculator does far more than compute simple principal and interest: it accurately models the mandatory VA funding fee, annual property taxes, homeowners hazard insurance, HOA dues, upfront closing cash, 30-year amortization schedules, entitlement limits, accelerated payment scenarios, and streamline refinancing economics.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Planning Model Notice</span>
          </div>
          <p>
            This calculator is an educational planning model, not an official VA eligibility determination or lender pre-approval. Actual loan eligibility and pricing depend on verifiable military service history, an official Certificate of Eligibility (COE), remaining guaranty entitlement, credit score, debt obligations, residual income requirements, property appraisal standards, and lender underwriting guidelines.
          </p>
        </div>
      </section>

      {/* 3. HOW TO USE THE CALCULATOR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. How to Use the VA Mortgage Calculator
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Follow this step-by-step workflow to evaluate your military home financing scenario:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            "1. Enter the target home purchase price.",
            "2. Enter your planned down-payment percentage (0% to 100%).",
            "3. Select your military category (Active Duty/Veteran, Guard/Reserve, or Surviving Spouse).",
            "4. Choose whether you have used a VA home loan before (1st Use vs. Subsequent).",
            "5. Enter the fixed interest rate and loan term (e.g., 30 or 15 years).",
            "6. Choose whether the VA funding fee is financed into the loan or paid in cash at closing.",
            "7. Select the disability-related funding-fee exemption toggle when applicable.",
            "8. Review the computed base loan, funding fee, financed balance, P&I, taxes, insurance, and total monthly PITI.",
            "9. Inspect the full annual or monthly amortization schedule and export to CSV.",
            "10. Compare the VA loan against the modeled FHA (3.5% down) and Conventional (5% down) scenarios.",
            "11. Use the Entitlement Module to evaluate remaining guaranty and modeled 0%-down purchasing power.",
            "12. Test bi-weekly payment acceleration to view interest and payoff time saved.",
            "13. Model recurring extra monthly principal payments in the accelerated payoff forecaster.",
            "14. Use the IRRRL Streamline Refinance simulator to evaluate rate reduction savings and break-even periods.",
          ].map((step, idx) => (
            <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CORE MORTGAGE FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Core Mortgage Formula & Payment Derivation
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The monthly Principal and Interest (P&I) payment for a VA loan is computed using the standard fixed-rate amortization equation:
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-center font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans">Monthly Principal & Interest Equation</div>
          <div className="p-3 bg-white dark:bg-slate-950 rounded-xl text-base font-bold text-blue-600 dark:text-blue-400 shadow-inner">
            {"M = P \\times \\frac{r(1 + r)^n}{(1 + r)^n - 1}"}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-sans text-left space-y-1.5 pt-1">
            <div>• <strong>M:</strong> Monthly Principal & Interest payment</div>
            <div>• <strong>P:</strong> Total financed loan amount (Base Loan + Financed VA Funding Fee)</div>
            <div>• <strong>r:</strong> Monthly interest rate (Annual Interest Rate / 12 / 100)</div>
            <div>• <strong>n:</strong> Total number of scheduled monthly payments (Loan Term Years × 12)</div>
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300">
          Total monthly housing expense (PITI) combines the amortized P&I payment with recurring escrowed costs:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"\\text{Total Monthly PITI} = \\text{P&I} + \\frac{\\text{Annual Property Taxes}}{12} + \\frac{\\text{Annual Hazard Insurance}}{12} + \\text{Monthly HOA}"}
        </div>
      </section>

      {/* 5. VA FUNDING FEE: THE KEY VA-SPECIFIC VARIABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. VA Funding Fee: The Key VA-Specific Variable
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The VA funding fee is a mandatory one-time government charge established by federal statute (38 U.S.C. § 3729) that offsets the cost of the loan guaranty program to taxpayers. Because VA loans do not require a down payment or ongoing monthly mortgage insurance (PMI), the funding fee serves as the program's primary risk-pooling reserve.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Borrowers can choose to <strong>finance the funding fee</strong> directly into the loan balance or pay it as <strong>cash at closing</strong>. When financed, the fee increases the starting loan balance and total monthly P&I, but keeps out-of-pocket cash requirements to a minimum.
        </p>
      </section>

      {/* 6. FIRST USE VS SUBSEQUENT USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. First-Time Use vs. Subsequent VA Loan Use
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Prior usage of the VA loan benefit materially affects the applicable funding fee on low-down-payment loans:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">First-Time Use (0% Down)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              For a $500,000 purchase with 0% down, the statutory first-time rate is <strong>2.15% ($10,750)</strong>. The financed loan balance becomes <strong>$510,750</strong>, producing a monthly P&I of <strong>$3,228.29</strong> and a total PITI of approximately <strong>$3,936.62/mo</strong>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">Subsequent Use (0% Down)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              For repeat VA borrowers with 0% down, the statutory rate increases to <strong>3.30% ($16,500)</strong>. The financed loan balance becomes <strong>$516,500</strong>, producing a monthly P&I of <strong>$3,264.80</strong> and a total PITI of approximately <strong>$3,973.13/mo</strong>.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic">
          *Note: When putting down 5% or more, the subsequent use rate drops to match the first-time rate (1.50% for 5%–9.99% down, and 1.25% for 10%+ down).
        </p>
      </section>

      {/* 7. FUNDING FEE RATE TIERS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Complete VA Funding Fee Rate Tiers (Statutory Matrix)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Down Payment Tier</th>
                <th className="p-3">First-Time Use</th>
                <th className="p-3">Subsequent Use</th>
                <th className="p-3 rounded-tr-xl">Disability Exempt Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              <tr>
                <td className="p-3 font-bold text-blue-600">&lt; 5% Down ($0 Down)</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">2.15%</td>
                <td className="p-3 font-mono font-bold text-red-500">3.30%</td>
                <td className="p-3 font-mono font-bold text-emerald-600">0.00% (Exempt)</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">5% – 9.99% Down</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">1.50%</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">1.50%</td>
                <td className="p-3 font-mono font-bold text-emerald-600">0.00% (Exempt)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600">≥ 10% Down</td>
                <td className="p-3 font-mono font-bold text-emerald-600">1.25%</td>
                <td className="p-3 font-mono font-bold text-emerald-600">1.25%</td>
                <td className="p-3 font-mono font-bold text-emerald-600">0.00% (Exempt)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. FUNDING FEE EXEMPTIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Statutory Funding Fee Exemptions (0% Fee)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Under federal law (38 U.S.C. § 3729(c)), qualifying borrowers may be fully exempt from the VA funding fee. In the calculator model, activating the disability exemption sets the fee to <strong>$0 (0.00%)</strong>, reducing the starting loan balance and lowering monthly P&I.
        </p>
        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs space-y-2 text-slate-700 dark:text-slate-300">
          <span className="font-extrabold text-emerald-700 dark:text-emerald-300 block">Who May Qualify for an Exemption:</span>
          <ul className="space-y-1 list-disc list-inside">
            <li>Veterans receiving VA compensation for a service-connected disability (10% rating or higher).</li>
            <li>Veterans entitled to receive disability compensation who are receiving military retirement pay in lieu of compensation.</li>
            <li>Active-duty service members who provide documentation of receiving the Purple Heart.</li>
            <li>Surviving spouses of veterans who died in service or from a service-connected disability (receiving DIC).</li>
          </ul>
        </div>
      </section>

      {/* 9. CASH VS FINANCED FUNDING FEE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Cash vs. Financed Funding Fee Comparison
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The decision to finance the funding fee versus paying it in cash involves a trade-off between upfront liquidity and long-term interest expense:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-blue-600">Financed into Loan</h3>
            <p className="text-slate-600 dark:text-slate-400">
              For a $500,000 purchase with subsequent use (3.30%), financing the $16,500 fee results in a <strong>$516,500 loan balance</strong> and <strong>$3,264.80/mo P&I</strong>. Upfront cash remains at <strong>$12,500</strong> (estimated closing costs).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-blue-600">Paid in Cash at Closing</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Paying the $16,500 fee at closing leaves the loan balance at <strong>$500,000</strong>, lowering monthly P&I to <strong>$3,160.34/mo</strong> (saving ~$104/mo). Upfront cash increases to <strong>$29,000</strong> ($16,500 fee + $12,500 closing costs).
            </p>
          </div>
        </div>
      </section>

      {/* 10. 3-WAY COMPARISON: VA VS FHA VS CONVENTIONAL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. 3-Way Program Comparison: VA vs. FHA vs. Conventional
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Loan Program</th>
                <th className="p-3">Min. Down Payment</th>
                <th className="p-3">Monthly Mortgage Insurance</th>
                <th className="p-3">Upfront Government Fee</th>
                <th className="p-3 rounded-tr-xl">Modeled 30-Yr Total Outlay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              <tr>
                <td className="p-3 font-bold text-blue-600">VA Loan</td>
                <td className="p-3 font-bold text-emerald-600">0% Down ($0)</td>
                <td className="p-3 font-bold text-emerald-600">$0 (No PMI)</td>
                <td className="p-3">2.15% Financed Fee ($10,750)</td>
                <td className="p-3 font-mono font-bold text-blue-600">$1,357,200 ($3,770/mo)</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">FHA Loan</td>
                <td className="p-3">3.5% Down ($17,500)</td>
                <td className="p-3 text-red-500">0.55% Annual MIP (Permanent)</td>
                <td className="p-3">1.75% Upfront MIP ($8,444)</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">$1,421,640 ($3,949/mo)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600">Conventional Loan</td>
                <td className="p-3">5.0% Down ($25,000)</td>
                <td className="p-3">0.60% PMI (Cancels at 20% equity)</td>
                <td className="p-3 font-bold text-emerald-600">$0 Upfront Fee</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">$1,356,903 ($3,943/mo Yrs 1-8)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          <strong>Understanding the Lifetime Comparison:</strong> Under this modeled baseline, VA saves <strong>$64,440 vs. FHA</strong> due to FHA's permanent monthly MIP. When compared to Conventional financing, Conventional PMI drops off after 96 months (8 years) and starts with a lower loan balance ($475k vs $510.75k), resulting in nearly identical 30-year total outlays ($-297 difference). However, VA achieves this with <strong>$0 down payment</strong> compared to $25,000 cash down on the Conventional loan.
        </p>
      </section>

      {/* 11. ENTITLEMENT & PURCHASING POWER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. VA Entitlement & Purchasing Power Derivation
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          VA loan guaranty entitlement determines how much a qualified borrower can purchase with $0 down payment:
        </p>
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600">Full Entitlement ($0 Prior Used Entitlement)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Pursuant to the <em>Blue Water Navy Vietnam Veterans Act of 2019</em>, eligible veterans with full entitlement have <strong>no maximum loan limits</strong> for $0-down financing. Lenders will approve financing up to the amount the borrower qualifies for based on income and credit.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600">Partial Entitlement (Active Prior VA Loan)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              If an existing VA loan remains open, county conforming loan limits apply to determine remaining secondary entitlement:
            </p>
            <div className="font-mono bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-0.5 text-[11px] text-slate-700 dark:text-slate-300">
              <div>{"\\text{Remaining Guaranty} = \\max(0, \\text{County Limit} \\times 25\\% - \\text{Prior Entitlement Used})"}</div>
              <div>{"\\text{Max \\$0-Down Purchase Price} = \\text{Remaining Guaranty} \\times 4"}</div>
              <div>{"\\text{Required Down Payment} = \\max(0, (\\text{Target Price} - \\text{Max \\$0-Down Price}) \\times 25\\%)"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. ACCELERATED PAYOFF & BI-WEEKLY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. Accelerated Payoff: Bi-Weekly & Extra Payments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600">Bi-Weekly Payment Schedule</h3>
            <p className="text-slate-600 dark:text-slate-400">
              By paying half the monthly payment every two weeks (26 periods/yr), you make the equivalent of 13 full payments annually. On a $510,750 balance at 6.5%, bi-weekly payments of <strong>$1,614/2-weeks</strong> save approximately <strong>$150,027 in interest</strong> and shorten the term by <strong>5.8 years (70 months)</strong>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600">Extra Monthly Principal Payments</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Adding a fixed <strong>$200/month</strong> directly to principal on the same $510,750 loan saves approximately <strong>$118,241 in lifetime interest</strong> and eliminates <strong>55 months (4.6 years)</strong> from your loan schedule.
            </p>
          </div>
        </div>
      </section>

      {/* 13. VA IRRRL STREAMLINE REFINANCE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. VA IRRRL Streamline Refinance Economics
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The VA Interest Rate Reduction Refinance Loan (IRRRL) is a streamlined refinance option that allows existing VA loan holders to lower their interest rate with no appraisal, minimal documentation, and a statutory <strong>0.50% funding fee</strong>.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <span className="font-bold text-blue-600 block">IRRRL Refinance Example ($350,000 Balance, 7.25% → 6.00%):</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-center">
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Monthly Savings</span>
              <span className="text-emerald-600 font-extrabold">$279 / month</span>
            </div>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Break-Even Period</span>
              <span className="text-blue-600 font-extrabold">17 Months</span>
            </div>
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">5-Yr Net Savings</span>
              <span className="text-emerald-600 font-extrabold">$11,990</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic pt-1">
            *Implementation disclosure: The model evaluates payment savings based on a reset 360-month term. If refinancing late in a loan term, extending the loan duration can increase total lifetime interest despite lowering the monthly payment.
          </p>
        </div>
      </section>

      {/* 14. SERVICE & ELIGIBILITY REQUIREMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. VA Loan Eligibility & Minimum Service Standards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Wartime Active Duty</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              At least 90 consecutive days of active service during wartime periods (WWII, Korean War, Vietnam War, Gulf War / Post-9/11).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Peacetime Active Duty</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              At least 181 continuous days of active service during peacetime military periods.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Guard & Reserves</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              At least 6 creditable years of service, or 90 days of active service under Title 10 or Title 32 orders.
            </p>
          </div>
        </div>
      </section>

      {/* 15. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Common VA Mortgage Calculation Mistakes to Avoid
        </h2>
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li><strong>Leaving the First-Use/Subsequent toggle in the wrong state:</strong> Subsequent use increases the funding fee by 1.15% ($5,750 on a $500k loan).</li>
            <li><strong>Assuming every borrower pays the same funding fee:</strong> Higher down payments (5% and 10%) drop the fee to 1.50% and 1.25%.</li>
            <li><strong>Forgetting that a financed funding fee increases the principal:</strong> Financing the fee adds to monthly interest over the entire 30-year term.</li>
            <li><strong>Comparing VA P&I only against another loan's full PITI:</strong> Always compare full PITI to PITI for an apples-to-apples evaluation.</li>
            <li><strong>Treating the county loan limit default ($766,550) as evergreen:</strong> Conforming loan limits adjust annually and vary in designated high-cost counties.</li>
            <li><strong>Treating the calculator output as an official Certificate of Eligibility (COE):</strong> Lenders must pull an official COE from the VA WebLGY portal.</li>
            <li><strong>Assuming bi-weekly savings are guaranteed by every servicer:</strong> Some lenders hold bi-weekly payments in suspense until a full monthly payment is accumulated.</li>
            <li><strong>Overlooking the term reset in an IRRRL refinance:</strong> Extending the amortization schedule back to 30 years can offset monthly payment reductions.</li>
            <li><strong>Treating the exemption selector as legal proof:</strong> Disability exemption requires an official rating decision or COE exemption code.</li>
            <li><strong>Assuming VA is always the lowest-cost program in all scenarios:</strong> When putting down 20%+ with excellent credit, conventional loans with $0 upfront fees may be competitive.</li>
          </ul>
        </div>
      </section>

      {/* 16. POLICY & YMYL RULES */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Educational Notice & Regulatory Guidance</span>
        </div>
        <p>
          VA home loan underwriting guidelines, funding fee percentages, county loan limits, and exemption rules are governed by Title 38 of the United States Code and the VA Lenders Handbook (VA Pamphlet 26-7). This calculator provides mathematical simulations for educational comparison only and does not constitute a commitment to lend or an official government determination.
        </p>
      </section>
    </div>
  );
}

export default VAMortgageContent;
