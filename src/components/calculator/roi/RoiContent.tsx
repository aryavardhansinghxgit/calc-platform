"use client";

import React from "react";
import { TrendingUp, ShieldCheck, Zap, AlertTriangle, CheckCircle2, DollarSign, Calculator, PieChart, Layers, ArrowRight, Award } from "lucide-react";

export function RoiContent() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-xs leading-relaxed">
      {/* 1. INTRODUCTION */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2  dark:border-zinc-800 pb-2">
          <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          What is Return on Investment (ROI) & Why Does It Matter?
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          <strong>Return on Investment (ROI)</strong> is a popular, universally accepted financial metric used to evaluate the efficiency, profitability, and capital growth of an investment relative to its initial cost. Expressed as a percentage, ROI measures how effectively invested money produces profit or loss over time.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          Whether you are evaluating a stock trade, real estate property, business acquisition, marketing campaign, or capital expenditure, calculating ROI allows investors and business leaders to compare disparate financial opportunities on a standardized scale.
        </p>
      </section>

      {/* 2. ROI VS ROR VS CAGR VS IRR COMPARISON TABLE */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Layers className="h-4 w-4 text-blue-600" />
          ROI vs. Rate of Return (ROR) vs. CAGR vs. Internal Rate of Return (IRR)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-[11px]">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold">Metric</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">Simple ROI</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">Annualized ROI / CAGR</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">IRR / XIRR</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800 text-slate-900 dark:text-slate-100">
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Time Horizon Included?</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">NO (Point-to-Point Total %)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">YES (Normalized per Year)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">YES (Exact Cash Flow Dates)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Cash Flow Complexity</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Single Initial & Final Value</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Single Initial & Final Value</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Multiple Inflows & Outflows</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Compounding Effect</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Ignores Compounding</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Geometric Annual Compounding</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Time-Weighted Cash Yield</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Primary Use Case</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Quick Short-Term Performance</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Long-Term Multi-Year Assets</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">SIPs, PE & Complex Projects</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. MATHEMATICAL FORMULAS & DERIVATIONS */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-blue-600" />
          Mathematical ROI Formulas & Derivations
        </h3>

        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">1. Basic Return on Investment (ROI) Formula</h4>
        <p className="text-slate-900 dark:text-slate-100">
          The basic ROI formula measures total percentage profit relative to the initial cost of investment:
        </p>

        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl space-y-2 text-center font-sans tabular-nums text-xs">
          <div className="font-bold text-blue-600 dark:text-blue-400 text-sm">
            ROI = [ ( Amount Returned - Amount Invested ) / Amount Invested ] × 100
          </div>
          <p className="text-[11px] text-slate-900 font-sans">
            Where each variable represents:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-[11px] font-sans pt-2  dark:border-zinc-800">
            <div><strong>Amount Returned (FV)</strong> = Final Value / Total Proceeds Received</div>
            <div><strong>Amount Invested (PV)</strong> = Initial Cost of Capital / Deposit</div>
            <div><strong>Net Profit</strong> = Amount Returned - Amount Invested</div>
          </div>
        </div>

        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 pt-2">2. Annualized ROI Formula</h4>
        <p className="text-slate-900 dark:text-slate-100">
          Simple ROI ignores time. An ROI of 100% over 1 year is extraordinary, while 100% over 50 years is modest. Annualized ROI solves this by normalizing returns on a geometric annual compounding basis:
        </p>
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl font-sans tabular-nums text-[11px] text-center text-blue-600 dark:text-blue-400">
          Annualized ROI = [ ( Amount Returned / Amount Invested )^( 1 / Years ) - 1 ] × 100
        </div>
      </section>

      {/* 4. WORKED STEP-BY-STEP EXAMPLES */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Zap className="h-4 w-4 text-blue-600" />
          Step-by-Step Worked Calculation Examples
        </h3>
        
        {/* Example A: Positive Gain */}
        <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 rounded-xl space-y-2 text-xs">
          <div className="font-bold text-blue-900 dark:text-blue-200">Example A: Real Estate Property Investment</div>
          <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300 space-y-1">
            <li>Amount Invested (PV) = $1,000,000</li>
            <li>Amount Returned (FV) = $2,000,000</li>
            <li>Holding Period (N) = 4.395 Years (4 Years & 144 Days)</li>
          </ul>

          <div className="font-bold text-blue-900 dark:text-blue-200 pt-2">Step-by-Step Evaluation:</div>
          <div className="font-sans tabular-nums text-[11px] space-y-1 bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-blue-100 dark:border-blue-950">
            <div>1. Net Dollar Profit: $2,000,000 - $1,000,000 = $1,000,000</div>
            <div>2. Total ROI: ($1,000,000 / $1,000,000) × 100 = 100.00%</div>
            <div>3. Value Ratio: $2,000,000 / $1,000,000 = 2.00</div>
            <div>4. Exponent Factor: 1 / 4.395 = 0.22753</div>
            <div>5. Annualized ROI: (2.00)^0.22753 - 1 = 17.08% per annum</div>
          </div>
        </div>

        {/* Example B: Negative Return */}
        <div className="bg-blue-50/60 dark:bg-blue-50/20 border border-rose-200 dark:border-rose-900 p-4 rounded-xl space-y-2 text-xs">
          <div className="font-bold text-rose-900 dark:text-rose-200">Example B: Negative ROI (Investment Loss Scenario)</div>
          <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300 space-y-1">
            <li>Amount Invested = $50,000</li>
            <li>Amount Returned = $30,000</li>
            <li>Holding Period = 2 Years</li>
          </ul>

          <div className="font-sans tabular-nums text-[11px] space-y-1 bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-rose-100 dark:border-rose-950 text-blue-600 font-bold">
            <div>1. Net Dollar Loss: $30,000 - $50,000 = -$20,000</div>
            <div>2. Total ROI: (-$20,000 / $50,000) × 100 = -40.00%</div>
            <div>3. Annualized Loss: [(30,000 / 50,000)^(0.50) - 1] × 100 = -22.54% per annum</div>
          </div>
        </div>
      </section>

      {/* 5. TOP INVESTOR MISTAKES TO AVOID */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          Top ROI Calculation Mistakes to Avoid
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-900 dark:text-slate-100">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">1. Omitting Holding Period Duration</span>
            <p className="text-[11px]">Comparing a 50% ROI earned in 6 months to a 50% ROI earned over 10 years without annualizing distorts decision making.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">2. Ignoring Transaction & Holding Costs</span>
            <p className="text-[11px]">Failing to factor in maintenance, property taxes, legal fees, brokerage commissions, or interest drag overestimates true net ROI.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">3. Forgetting Capital Gains Taxes</span>
            <p className="text-[11px]">A 20% nominal ROI subject to 15%–20% capital gains tax reduces actual retained profit significantly.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">4. Applying Simple ROI to Recurring SIP Cash Flows</span>
            <p className="text-[11px]">For recurring monthly deposits, use XIRR instead of simple ROI, as capital enters the portfolio at different times.</p>
          </div>
        </div>
      </section>
    </article>
  );
}
