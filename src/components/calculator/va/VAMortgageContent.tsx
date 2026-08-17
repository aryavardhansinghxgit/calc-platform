"use client";

import React from "react";

export function VAMortgageContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* H1 Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Advanced VA Mortgage Calculator (with Funding Fee & Amortization)
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Comprehensive Military Home Financing Guide, 2026 VA Funding Fee Tiers, Entitlement Logic & 3-Way Program Comparisons.
        </p>
      </div>

      {/* SECTION 1: HOW VA PAYMENTS ARE CALCULATED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. How VA Mortgage Payments Are Calculated (The Formula)
        </h2>
        <p className="text-sm leading-relaxed">
          A VA home loan is a mortgage guaranteed by the U.S. Department of Veterans Affairs. Designed exclusively for qualified active-duty service members, military veterans, National Guard/Reserve personnel, and surviving spouses, VA loans offer significant financial advantages—most notably <strong>$0 down payment requirements</strong> and <strong>$0 ongoing monthly mortgage insurance (PMI)</strong>.
        </p>
        <p className="text-sm leading-relaxed">
          The monthly Principal and Interest (P&I) payment for a VA loan is computed using the standard fixed-rate amortization equation:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-center font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans">Monthly Principal & Interest Equation</div>
          <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-sm font-bold text-blue-600 dark:text-blue-400">
            {"M = P \\frac{r(1 + r)^n}{(1 + r)^n - 1}"}
          </div>
          <div className="text-[11px] text-slate-500 font-sans text-left space-y-1 pt-1">
            <div>• <strong>M:</strong> Monthly Principal & Interest Payment</div>
            <div>• <strong>P:</strong> Total Financed Loan Amount (Base Loan + Financed VA Funding Fee)</div>
            <div>• <strong>r:</strong> Monthly Interest Rate (Annual Rate / 12)</div>
            <div>• <strong>n:</strong> Total Number of Monthly Payments (Loan Term Years × 12)</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FUNDING FEE CHART */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Complete VA Funding Fee Chart (Updated Tiers)
        </h2>
        <p className="text-sm leading-relaxed">
          The VA funding fee is a mandatory one-time government fee that offsets the cost of the loan guaranty program to taxpayers. The fee percentage varies based on your down payment amount, whether you have used a VA loan previously, and whether you meet statutory disability exemption criteria.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Down Payment Tier</th>
                <th className="p-3">First-Time Use Rate</th>
                <th className="p-3">Subsequent Use Rate</th>
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

        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs space-y-1">
          <span className="font-extrabold text-blue-700 dark:text-blue-300">VA Funding Fee Exemptions (0% Fee):</span>
          <p className="text-slate-600 dark:text-slate-400">
            The VA funding fee is automatically waived if you receive VA disability compensation (10% or higher rating), are an active-duty Purple Heart recipient, or are a surviving spouse of a service member who died in service or from service-connected disabilities.
          </p>
        </div>
      </section>

      {/* SECTION 3: SERVICE REQUIREMENTS & COE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. VA Loan Eligibility & Service Requirements
        </h2>
        <p className="text-sm leading-relaxed">
          To qualify for a VA loan, borrowers must meet minimum active service requirements established by federal law:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Wartime Active Duty</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              90 consecutive days of active duty during WWII, Korean War, Vietnam War, or Gulf War / Post-9/11 eras.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Peacetime Service</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              181 continuous days of active duty during peacetime military periods.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">National Guard & Reserves</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              At least 6 creditable years of service, or 90 days under Title 10/Title 32 active duty orders.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: VA VS CONVENTIONAL & FHA MATRIX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. VA Loan vs. Conventional & FHA Loans Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Feature</th>
                <th className="p-3">VA Loan</th>
                <th className="p-3">FHA Loan</th>
                <th className="p-3 rounded-tr-xl">Conventional Loan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              <tr>
                <td className="p-3 font-bold text-blue-600">Min Down Payment</td>
                <td className="p-3 font-bold text-emerald-600">0% Down</td>
                <td className="p-3">3.5% Down</td>
                <td className="p-3">3.0% – 5.0% Down</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">Monthly Mortgage Insurance</td>
                <td className="p-3 font-bold text-emerald-600">$0 (No PMI)</td>
                <td className="p-3 text-red-500">0.55% Annual MIP (Permanent)</td>
                <td className="p-3">PMI required under 20% down</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600">Upfront Government Fee</td>
                <td className="p-3">1.25% – 3.30% Funding Fee</td>
                <td className="p-3">1.75% Upfront MIP</td>
                <td className="p-3 font-bold text-emerald-600">$0 Upfront Fee</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">Credit Score Minimum</td>
                <td className="p-3 font-bold text-emerald-600">No VA Min (580–620 typical)</td>
                <td className="p-3">500 – 580</td>
                <td className="p-3">620 – 740+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: WORKED EXAMPLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Worked Step-by-Step Derivation Example
        </h2>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
            Scenario: $500,000 Purchase, 0% Down, 6.5% Interest Rate (First-Time Active Duty)
          </h3>
          <div className="font-mono bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
            <div>Base Loan Amount = $500,000</div>
            <div>VA Funding Fee (2.15% First Use) = $500,000 × 2.15% = $10,750</div>
            <div>Total Financed Loan Amount = $500,000 + $10,750 = $510,750</div>
            <div>Monthly P&I Payment (6.5% 30-Yr Fixed) = $3,228.30/mo</div>
            <div>Monthly Property Tax ($500/mo) + Insurance ($208.33/mo) = $708.33/mo</div>
            <div>Monthly Mortgage Insurance (PMI) = $0.00/mo</div>
            <div><strong>Total Monthly PITI Payment = $3,936.63/mo</strong></div>
          </div>
        </div>
      </section>

      {/* SECTION 6: SUMMARY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <h2 className="font-extrabold text-sm text-blue-700 dark:text-blue-300">
          6. Educational Summary
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          The VA home loan program provides unmatched financing power for military service members and veterans. By eliminating down payment hurdles and monthly PMI premiums, VA borrowers save thousands compared to conventional and FHA mortgages.
        </p>
      </section>
    </div>
  );
}
