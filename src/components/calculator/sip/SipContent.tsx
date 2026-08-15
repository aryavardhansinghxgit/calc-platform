"use client";

import React from "react";
import { TrendingUp, Award, Zap, AlertTriangle, CheckCircle2, DollarSign, Calculator, HelpCircle, ShieldCheck, PieChart, Layers, ArrowRight } from "lucide-react";

export function SipContent() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-xs leading-relaxed">
      {/* 1. INTRODUCTION */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          What is a Systematic Investment Plan (SIP) & How Does It Work?
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          A <strong>Systematic Investment Plan (SIP)</strong> is a disciplined wealth-building approach offered by mutual funds that allows investors to contribute a fixed dollar or rupee amount at regular periodic intervals (typically monthly) into chosen mutual fund schemes. Rather than attempting to time equity market peaks and troughs with a large one-time lump sum, SIPs harness the dual forces of <strong>Rupee/Dollar-Cost Averaging</strong> and <strong>Exponential Compound Interest</strong>.
        </p>
        <p className="text-zinc-600 dark:text-zinc-400">
          By automating fixed monthly contributions over extended horizons (5, 10, 20, or 30 years), investors build substantial retirement nest eggs, home purchase down payments, and financial independence wealth without market-timing stress.
        </p>
      </section>

      {/* 2. SIP VS LUMPSUM COMPARISON TABLE */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Layers className="h-4 w-4 text-purple-600" />
          SIP vs. Lumpsum Investment Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-[11px]">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold">Feature</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">Systematic Investment Plan (SIP)</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-emerald-600 dark:text-emerald-400">Lumpsum Investment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-400">
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Investment Style</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Recurring periodic contributions (Monthly/Quarterly)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">One-time single upfront capital deployment</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Market Volatility Impact</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Mitigated by Cost Averaging (buys more units when prices drop)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Highly sensitive to market entry timing & market corrections</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Capital Requirement</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Low entry threshold (starts at $50 or ₹500/month)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Requires significant liquid cash reserves upfront</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Ideal User Profile</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Salaried earners, disciplined long-term goal planners</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Windfall recipients, bonus earners, experienced investors</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Flexibility</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Pause, increase (Step-up), or alter monthly amount anytime</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Fixed at execution; subsequent additions require new orders</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. MATHEMATICAL FORMULAS & DERIVATIONS */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-emerald-600" />
          Mathematical SIP Return Formula & Compounding Derivation
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          The future maturity value of a standard Systematic Investment Plan is calculated using the Future Value of an Annuity Due formula:
        </p>

        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl space-y-2 text-center font-sans tabular-nums text-xs">
          <div className="font-bold text-blue-600 dark:text-blue-400 text-sm">
            M = P × [((1 + i)^n - 1) / i] × (1 + i)
          </div>
          <p className="text-[11px] text-zinc-500 font-sans">
            Where each symbol represents the following variable:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-[11px] font-sans pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <div><strong>M</strong> = Expected Total Maturity Corpus Value ($ or ₹)</div>
            <div><strong>P</strong> = Recurring Monthly Investment Amount</div>
            <div><strong>i</strong> = Periodic Monthly Rate of Return = Annual Return / (12 × 100)</div>
            <div><strong>n</strong> = Total Number of Monthly Payments = Tenure Years × 12</div>
          </div>
        </div>

        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 pt-2">Step-Up (Top-Up) SIP Formula</h4>
        <p className="text-zinc-600 dark:text-zinc-400">
          When an investor increases their monthly SIP by an annual percentage (S%) each year to match income raises, the maturity value is calculated as the sum of yearly compounding series:
        </p>
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl font-sans tabular-nums text-[11px] text-center text-purple-600 dark:text-purple-400">
          M_StepUp = Σ [ P × (1 + S)^(y-1) × (((1+i)^12 - 1) / i) × (1+i) × (1+r_annual)^(Y-y) ]
        </div>
      </section>

      {/* 4. WORKED STEP-BY-STEP EXAMPLE */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-500" />
          Step-by-Step Worked Calculation Example
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          Let us walk through an explicit real-world numerical calculation:
        </p>
        <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 rounded-xl space-y-2 text-xs">
          <div className="font-bold text-blue-900 dark:text-blue-200">Scenario Inputs:</div>
          <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300 space-y-1">
            <li>Monthly SIP Deposit (P) = $500</li>
            <li>Expected Annual Return Rate = 12% p.a.</li>
            <li>Monthly Interest Rate (i) = 12% / 12 / 100 = 0.01 (1% per month)</li>
            <li>Tenure = 10 Years (n = 10 × 12 = 120 monthly contributions)</li>
          </ul>

          <div className="font-bold text-blue-900 dark:text-blue-200 pt-2">Formula Evaluation:</div>
          <div className="font-sans tabular-nums text-[11px] space-y-1 bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-blue-100 dark:border-blue-950">
            <div>1. Base Compounding Factor: (1 + 0.01)^120 = (1.01)^120 ≈ 3.30038</div>
            <div>2. Accumulated Annuity Growth: (3.30038 - 1) / 0.01 = 230.038</div>
            <div>3. Beginning-of-Period Adjustment: 230.038 × 1.01 = 232.338</div>
            <div>4. Total Maturity Value: M = $500 × 232.338 = $116,169</div>
            <div>5. Total Invested Capital: $500 × 120 = $60,000</div>
            <div>6. Net Estimated Wealth Returns: $116,169 - $60,000 = $56,169</div>
          </div>
        </div>
      </section>

      {/* 5. POWER OF STEP-UP SIP & INFLATION DEFENSE */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Award className="h-4 w-4 text-emerald-600" />
          The Power of Step-Up SIP & Inflation Defense
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          A common mistake among investors is maintaining a flat SIP for 15-20 years. Because inflation erodes purchasing power by 3-5% annually, a fixed $500 monthly investment buys significantly fewer mutual fund units over time in real terms.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1.5">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 10% Annual Step-Up Advantage
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
              Increasing a $500 SIP by just 10% each year (e.g., $500 in Yr 1, $550 in Yr 2, $605 in Yr 3) over 20 years at 12% yield increases your total maturity corpus from <strong>$499,574</strong> to an astounding <strong>$1,087,542</strong> — more than double the wealth!
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1.5">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-500" /> Inflation Adjustment (Real Purchasing Power)
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
              If inflation averages 4% per year, a $500,000 nominal balance in 20 years has an effective purchasing power of <strong>$228,193</strong> in today's dollars. Always factor in real returns when setting long-term retirement targets.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TAX IMPLICATIONS & CAPITAL GAINS RULES */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <PieChart className="h-4 w-4 text-rose-500" />
          Tax Drag & Mutual Fund Capital Gains Taxation
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          When redeeming mutual fund units from a SIP, taxes apply only to the capital gains (earnings), not the invested principal. In many tax jurisdictions:
        </p>
        <ul className="list-disc pl-5 text-zinc-600 dark:text-zinc-400 space-y-1">
          <li><strong>Long-Term Capital Gains (LTCG):</strong> Applies to equity fund units held for more than 12 months. Tax rates are generally lower (e.g., 10-15%), often with initial annual exemption thresholds.</li>
          <li><strong>Short-Term Capital Gains (STCG):</strong> Applies to units redeemed within 12 months of purchase. Tax rates are usually higher (e.g., 15-20%).</li>
          <li><strong>First-In, First-Out (FIFO) Rule:</strong> In a SIP, each monthly installment is treated as an independent investment batch with its own 12-month holding clock for LTCG classification.</li>
        </ul>
      </section>

      {/* 7. PRACTICAL TIPS & COMMON MISTAKES */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Top Investor Mistakes to Avoid in SIP Investing
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-600 dark:text-zinc-400">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">1. Stopping SIPs During Market Downturns</span>
            <p className="text-[11px]">Market pullbacks are when Rupee/Dollar-cost averaging works best, accumulating maximum fund units at discount prices.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">2. Expecting Linear Annual Returns</span>
            <p className="text-[11px]">Markets deliver non-linear return clusters (+25% one year, -10% another). Long-term CAGR averages smooth out short-term noise.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">3. Delaying the Start Date</span>
            <p className="text-[11px]">Starting a $500 monthly SIP at age 25 vs age 35 leads to a 3x difference in retirement wealth due to lost compounding years.</p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-xs">4. Ignoring Expense Ratios</span>
            <p className="text-[11px]">Opt for low-cost Direct Mutual Funds or Index Funds to avoid paying 1-1.5% extra recurring distributor commissions.</p>
          </div>
        </div>
      </section>
    </article>
  );
}
