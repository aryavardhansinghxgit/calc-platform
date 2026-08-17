"use client";

import React from "react";
import { TrendingUp, ShieldCheck, Zap, AlertTriangle, CheckCircle2, DollarSign, Calculator, PieChart, Layers, ArrowRight, Award } from "lucide-react";

export function CagrContent() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-xs leading-relaxed">
      {/* 1. INTRODUCTION */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-blue-600 dark:text-blue-400 flex items-center gap-2  dark:border-zinc-800 pb-2">What is Compound Annual Growth Rate (CAGR) & Why Does It Matter?
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          <strong>Compound Annual Growth Rate (CAGR)</strong> is the geometric mean growth rate of an investment over a specified time period longer than one year. It represents the hypothetical, smoothed constant annual rate at which an investment would have grown if it had compounded at a steady rate each year.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          In real-world financial markets, stock prices, mutual fund net asset values (NAVs), and real estate portfolios experience volatile, non-linear annual fluctuations. CAGR eliminates this market noise, providing investors, fund managers, and executives with a unified, standardized metric to evaluate performance across different assets, horizons, and capital sizes.
        </p>
      </section>

      {/* 2. ABSOLUTE RETURN VS CAGR VS IRR COMPARISON TABLE */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Absolute Return vs. CAGR vs. Internal Rate of Return (IRR)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-[11px]">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold">Metric</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">CAGR (Compound Annual)</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">Absolute Return</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">IRR / XIRR</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800 text-slate-900 dark:text-slate-100">
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Time Factor Included?</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">YES (Normalized per Year)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">NO (Ignores Duration)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">YES (Specific Cash Flow Dates)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Cash Flow Support</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Lumpsum (PV to FV)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Lumpsum Only</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Multiple Inflows & Outflows</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Volatility Representation</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Smoothed Growth Curve</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Point-to-Point Total % Change</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Time-Weighted Cash Yield</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Primary Use Case</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Comparing Funds & Stocks</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Short-Term (&lt;1 Year) Trades</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">SIPs & Private Equity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. MATHEMATICAL FORMULAS & DERIVATIONS */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Mathematical CAGR Formulas & Derivations
        </h3>

        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">1. Standard CAGR Formula</h4>
        <p className="text-slate-900 dark:text-slate-100">
          The standard CAGR formula isolates the annualized growth rate from the basic compound interest equation $FV = PV \times (1 + r)^N$:
        </p>

        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl space-y-2 text-center font-sans tabular-nums text-xs">
          <div className="font-bold text-blue-600 dark:text-blue-400 text-sm">
            CAGR = [ ( FV / PV )^( 1 / N ) - 1 ] × 100
          </div>
          <p className="text-[11px] text-slate-900 font-sans">
            Where each variable represents:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-[11px] font-sans pt-2  dark:border-zinc-800">
            <div><strong>FV</strong> = Final Investment Value (Ending Portfolio Balance)</div>
            <div><strong>PV</strong> = Present Value (Initial Principal Capital)</div>
            <div><strong>N</strong> = Total Time Duration (in Years, e.g., 5.5 Years)</div>
            <div><strong>CAGR</strong> = Compound Annual Growth Rate Percentage</div>
          </div>
        </div>

        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 pt-2">2. Inflation-Adjusted Real CAGR Formula</h4>
        <p className="text-slate-900 dark:text-slate-100">
          To measure actual purchasing power expansion, nominal CAGR must be adjusted using the Fisher Equation:
        </p>
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl font-sans tabular-nums text-[11px] text-center text-blue-600 dark:text-blue-400">
          Real CAGR = [ ( 1 + Nominal CAGR ) / ( 1 + Inflation Rate ) - 1 ] × 100
        </div>
      </section>

      {/* 4. WORKED STEP-BY-STEP EXAMPLES */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Step-by-Step Worked Calculation Examples
        </h3>
        
        {/* Example A: Positive Growth */}
        <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 rounded-xl space-y-2 text-xs">
          <div className="font-bold text-blue-900 dark:text-blue-200">Example A: 5-Year Stock Portfolio Investment</div>
          <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300 space-y-1">
            <li>Initial Investment (PV) = $10,000</li>
            <li>Final Portfolio Value (FV) = $25,000</li>
            <li>Time Horizon (N) = 5 Years</li>
          </ul>

          <div className="font-bold text-blue-900 dark:text-blue-200 pt-2">Step-by-Step Evaluation:</div>
          <div className="font-sans tabular-nums text-[11px] space-y-1 bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-blue-100 dark:border-blue-950">
            <div>1. Value Ratio: FV / PV = 25,000 / 10,000 = 2.50</div>
            <div>2. Exponent Power: 1 / N = 1 / 5 = 0.20</div>
            <div>3. Compound Growth Factor: (2.50)^0.20 = 1.2011</div>
            <div>4. Subtract 1: 1.2011 - 1 = 0.2011</div>
            <div>5. CAGR Percentage: 0.2011 × 100 = 20.11% per annum</div>
          </div>
        </div>

        {/* Example B: Negative Growth */}
        <div className="bg-blue-50/60 dark:bg-blue-50/20 border border-rose-200 dark:border-rose-900 p-4 rounded-xl space-y-2 text-xs">
          <div className="font-bold text-rose-900 dark:text-rose-200">Example B: Negative CAGR (Investment Loss Scenario)</div>
          <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300 space-y-1">
            <li>Initial Investment (PV) = $2,365,714</li>
            <li>Final Investment (FV) = $691,214</li>
            <li>Tenure (N) = 5 Years</li>
          </ul>

          <div className="font-sans tabular-nums text-[11px] space-y-1 bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-rose-100 dark:border-rose-950 text-blue-600 font-bold">
            CAGR = [ (691,214 / 2,365,714)^(0.20) - 1 ] × 100 = -21.81% per annum
          </div>
        </div>
      </section>

      {/* 5. TOP INVESTOR MISTAKES TO AVOID */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Top CAGR Analysis Mistakes to Avoid
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-900 dark:text-slate-100">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">1. Applying CAGR to SIP Cash Flows</span>
            <p className="text-[11px]">CAGR assumes a single initial lump sum deposit. For monthly SIP investments, use XIRR (Extended Internal Rate of Return) instead.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">2. Ignoring Intermediate Volatility</span>
            <p className="text-[11px]">CAGR presents a smooth geometric average, hiding dramatic market crashes and drawdowns between Year 1 and Year N.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">3. Confusing CAGR with Absolute Return</span>
            <p className="text-[11px]">A 100% absolute return over 10 years equals a 7.18% CAGR, not 10% per year due to compounding effects.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">4. Overlooking Inflation & Tax Drag</span>
            <p className="text-[11px]">A 10% nominal CAGR in a 5% inflation environment with 20% capital gains tax yields a real net return of under 3.5%.</p>
          </div>
        </div>
      </section>
    </article>
  );
}
