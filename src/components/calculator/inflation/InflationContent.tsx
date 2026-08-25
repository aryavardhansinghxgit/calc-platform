"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, TrendingUp, Info } from "lucide-react";

export function InflationContent() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Inflation Calculator
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Calculate historical CPI purchasing power, future inflation projections, salary-adjusted values, real investment returns (Fisher Equation), personal lifestyle basket inflation, and cash purchasing-power decay.
        </p>
      </div>

      {/* 2. WHAT IS AN INFLATION CALCULATOR? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. What Is an Inflation Calculator?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          An inflation calculator estimates how the purchasing power of money changes over time as the general price level changes. Depending on the mode, the calculator can answer several distinct financial questions:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-700 dark:text-slate-300 pl-2">
          <li>How much would a past dollar amount be worth in today&apos;s purchasing power?</li>
          <li>How much will today&apos;s money need to grow to buy the identical basket of goods in the future?</li>
          <li>What would today&apos;s money have been worth under a constant historical flat-rate inflation assumption?</li>
          <li>Did my salary increase faster or slower than cumulative inflation?</li>
          <li>What is my investment&apos;s real rate of return after accounting for inflation and tax drag?</li>
          <li>How does inflation affect my specific household spending pattern?</li>
        </ul>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The historical CPI mode uses an empirical Consumer Price Index (CPI-U) comparison, while the forward and backward flat-rate modes use a user-selected annual rate assumption. For broader multi-year wealth accumulation, pair this tool with the{" "}
          <Link href="/calculators/future-value-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Future Value Calculator
          </Link>{" "}
          or the{" "}
          <Link href="/calculators/present-value-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Present Value Calculator
          </Link>.
        </p>
      </section>

      {/* 3. WHAT THIS INFLATION CALCULATOR CAN DO */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. What This Inflation Calculator Can Do
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Historical CPI Purchasing Power</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Compares dollar purchasing power across any two historical periods from 1913 through 2026 using official BLS CPI-U data.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Forward Future Inflation</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Projects future costs and calculates the eroding real purchasing power of uninvested cash under compound inflation.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Backward Flat-Rate Purchasing Power</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Determines what today&apos;s money would have represented in past equivalent purchasing power under a constant annual rate.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Real Wage &amp; Salary Adjustment</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Tests whether nominal pay raises outpaced inflation by converting past compensation into current real dollars.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Real Rate of Return (Fisher Equation)</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Separates nominal portfolio returns from tax drag and inflation drag to isolate real purchasing-power wealth creation.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Personal Lifestyle Basket Estimator</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Applies category-specific inflation rates to custom household budget weights (housing, food, energy, healthcare).
            </p>
          </div>
        </div>
      </section>

      {/* 4. HISTORICAL CPI PURCHASING POWER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Historical CPI Purchasing Power Baseline
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The historical CPI mode uses the official Bureau of Labor Statistics (BLS) Consumer Price Index for All Urban Consumers (CPI-U) dataset:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"Target Amount = Start Amount × (Target CPI / Start CPI)"}</div>
          <div className="text-[11px] text-slate-500 pt-1">
            Audited Baseline: $100 in Average 2016 (CPI = 240.007) to July 2026 (CPI = 333.918)
          </div>
          <div>• Equivalent Purchasing Power: <strong>$139.13</strong></div>
          <div>• Cumulative Inflation: <strong>+39.13%</strong> {"((333.918 - 240.007) / 240.007 × 100)"}</div>
          <div>• Annualized Inflation Rate: <strong>3.18% / year</strong> (over 10.54 years)</div>
          <div>• Cash Purchasing Power Loss: <strong>-28.12%</strong> {"((1 - 240.007 / 333.918) × 100)"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Notice that cumulative inflation (+39.13%) and purchasing-power loss (-28.12%) are not identical percentages. A 39.13% price increase corresponds to a 28.12% reduction in what an uninvested dollar can purchase.
        </p>
      </section>

      {/* 5. FORWARD FUTURE INFLATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Forward Future Inflation &amp; Purchasing Power Decay
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          When projecting into the future, compound inflation increases the future dollar cost of goods while diminishing the purchasing power of cash:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"• Future Cost = Current Amount × (1 + Inflation)^Years"}</div>
          <div>{"• Cash Purchasing Power = Current Amount ÷ (1 + Inflation)^Years"}</div>
          <div>• Baseline ($100 @ 3.0%/yr for 10 Years): Future Cost = <strong>$134.39</strong> (+34.4% increase)</div>
          <div>• Real Purchasing Power of $100 Cash: <strong>$74.41</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The backward flat-rate solver satisfies the exact round-trip invariant:{" "}
          <span className="font-mono text-xs font-bold">$74.41 × 1.03^10 = $100.00</span>.
        </p>
      </section>

      {/* 6. REAL WAGE & SALARY ADJUSTER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Real Wage &amp; Salary Growth Adjuster
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A nominal wage increase does not necessarily translate into higher purchasing power if general price levels rose faster during the same period:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Past Salary: $50,000 in 2015 (CPI = 237.017) vs. Current Salary: $75,000 in 2026 (CPI = 333.918)</div>
          <div>• Past Salary in Today&apos;s Dollars: <strong>$70,442.00</strong> {"($50,000 × 333.918 / 237.017)"}</div>
          <div>• Nominal Salary Raise: <strong>+$25,000 (+50.0%)</strong></div>
          <div>• Real Purchasing Power Change: <strong>+$4,558.00 / year</strong></div>
          <div>• Real Percentage Shift: <strong>+6.5% real raise above inflation</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          For detailed monthly paycheck and tax breakdowns, explore the{" "}
          <Link href="/calculators/salary-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Salary Calculator
          </Link>{" "}
          and the{" "}
          <Link href="/calculators/take-home-pay-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Take-Home Paycheck Calculator
          </Link>.
        </p>
      </section>

      {/* 7. REAL RATE OF RETURN (FISHER EQUATION) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Real Rate of Return &amp; Investment Inflation Drag
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Nominal investment growth can be deceptive when inflation and capital gains taxes erode wealth. The exact Fisher relationship isolates real purchasing-power growth:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"Real Return = [ (1 + After-Tax Nominal Return) ÷ (1 + Inflation) ] - 1"}</div>
          <div>• Principal: $100,000 | Nominal Return: 10.0% | Inflation: 3.5% | Tax Rate: 15.0% | Term: 20 Years</div>
          <div>• Nominal Future Balance (Pre-Tax): <strong>$672,750.00</strong></div>
          <div>• After-Tax Nominal Return: 10.0% × (1 - 0.15) = <strong>8.50%</strong></div>
          <div>• Real Annual Return (Fisher): (1.085 / 1.035) - 1 = <strong>4.83% ≈ 4.8% / year</strong></div>
          <div>• Real Purchasing Power Wealth: <strong>$256,914.00</strong> {"($100,000 × 1.0483^20)"}</div>
          <div>• Tax Drag Breakdown: <strong>-$161,545.00</strong> | Inflation Drag Breakdown: <strong>-$254,291.00</strong></div>
        </div>
      </section>

      {/* 8. PERSONAL LIFESTYLE BASKET INFLATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Personal Lifestyle Basket Inflation Estimator
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Official CPI measures a broad national average. Households spending a larger portion of income on rapidly inflating categories (such as housing or healthcare) experience a different personal inflation rate:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Housing (35% @ 4.8%) + Food (20% @ 3.2%) + Energy (10% @ 2.5%)</div>
          <div>• Transport (15% @ 3.0%) + Healthcare (10% @ 4.2%) + Education (10% @ 4.5%)</div>
          <div>• <strong>Weighted Personal Inflation Rate: 3.9% / year</strong></div>
          <div>• Official Headline CPI Benchmark: ~3.0% / year (Lifestyle Variance: <strong>+0.9%</strong>)</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          To build an accurate household budget before assigning category weights, use the{" "}
          <Link href="/calculators/budget-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Budget Calculator
          </Link>.
        </p>
      </section>

      {/* 9. MACROECONOMIC CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Macroeconomic Dynamics: CPI, Core CPI &amp; Causes of Inflation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">Headline CPI vs. Core CPI</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              <strong>Headline CPI</strong> samples ~80,000 consumer price quotes across 8 major expenditure categories. <strong>Core CPI</strong> strips out volatile food and energy prices to give central banks a clearer picture of underlying structural inflation trends.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">The Equation of Exchange ($MV = PY$)</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Classical monetary theory establishes that Money Supply ($M$) &times; Velocity ($V$) = Price Level ($P$) &times; Real Output ($Y$). If money supply expands faster than real economic output while velocity remains stable, general price levels rise.
            </p>
          </div>
        </div>
      </section>

      {/* 10. INFLATION HEDGES & FIXED DEBT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Inflation Hedges &amp; Fixed-Rate Debt Dynamics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Equities, Real Estate &amp; TIPS</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Productive companies possess pricing power, real estate benefits from rent escalation, and TIPS adjust principal directly with CPI-U. For international currency conversions, use our{" "}
              <Link href="/calculators/currency-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Currency Calculator
              </Link>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-extrabold text-blue-600">Fixed-Rate Mortgages</span>
            <p className="text-slate-600 dark:text-slate-400 font-normal">
              Borrowers repay fixed nominal mortgage payments over time with inflated, cheaper future dollars. Model loan obligations with the{" "}
              <Link href="/calculators/payment-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Payment Calculator
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* 11. RULE OF 72 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. The Rule of 72 Purchasing Power Halving Heuristic
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          {"The Rule of 72 provides a quick mental approximation for how long it takes cash purchasing power to decline by half: Years to Halve ≈ 72 ÷ Annual Inflation Rate. At 3.0% inflation, purchasing power is halved in approximately 72 ÷ 3 = 24 years. At 6.0% inflation, purchasing power is cut in half in just 12 years."}
        </p>
      </section>

      {/* 12. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. Common Inflation Calculator Mistakes to Avoid
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li><strong>Treating official national CPI as identical to your household&apos;s inflation:</strong> Spending weights vary significantly between families.</li>
            <li><strong>Confusing cumulative price increases with purchasing-power loss:</strong> A 50% price increase equals a 33.3% loss in cash buying power.</li>
            <li><strong>Using a flat future rate as a guaranteed forecast:</strong> Actual inflation rates fluctuate based on economic and monetary cycles.</li>
            <li><strong>Comparing nominal salary raises without adjusting for inflation:</strong> A 5% raise during 7% inflation is a 1.9% real wage reduction.</li>
            <li><strong>Evaluating investment returns on a nominal basis alone:</strong> Inflation drag and tax drag substantially reduce real wealth accumulation.</li>
            <li><strong>Treating the Rule of 72 as an exact formula:</strong> It is a simplified mental heuristic.</li>
            <li><strong>Assuming central bank interest rate hikes instantly reduce inflation:</strong> Monetary transmission lags and supply factors affect real-world outcomes.</li>
            <li><strong>Treating stocks, real estate, or TIPS as guaranteed hedges:</strong> Asset returns fluctuate across different market environments.</li>
            <li><strong>Assuming inflation universally benefits fixed-rate borrowers:</strong> Benefits depend on whether household wages keep pace with inflation.</li>
            <li><strong>Treating personal basket results as official government CPI data:</strong> Lifestyle baskets are personalized budgeting models.</li>
          </ul>
        </div>
      </section>

      {/* 13. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. Core Inflation Formulas Reference
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>{"• Historical Purchasing Power: Target Value = Amount × (Target CPI ÷ Start CPI)"}</div>
          <div>{"• Cumulative Inflation Rate: Cumulative % = ( (Target CPI - Start CPI) ÷ Start CPI ) × 100"}</div>
          <div>{"• Cash Purchasing Power Loss: Loss % = ( 1 - Start CPI ÷ Target CPI ) × 100"}</div>
          <div>{"• Future Basket Cost: Future Cost = Current Amount × (1 + Inflation)^Years"}</div>
          <div>{"• Future Cash Buying Power: Real Value = Current Amount ÷ (1 + Inflation)^Years"}</div>
          <div>{"• Adjusted Historical Salary: Adjusted Salary = Past Salary × (Current CPI ÷ Past CPI)"}</div>
          <div>{"• Fisher Real Return: Real Return = [ (1 + After-Tax Nominal Return) ÷ (1 + Inflation) ] - 1"}</div>
          <div>{"• Personal Lifestyle Inflation: Weighted Rate = Σ ( Category Weight × Category Inflation ) ÷ Total Weight"}</div>
        </div>
      </section>

      {/* 14. YMYL AND REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Macroeconomic &amp; Financial Guidance Notice</span>
        </div>
        <p>
          This inflation calculator is an educational mathematical modeling tool. Historical calculations use official Bureau of Labor Statistics (BLS) Consumer Price Index (CPI-U) data. Forward projections, tax drag models, and personal budget estimates represent hypothetical scenarios and do not constitute formal economic forecasts or individualized investment advice.
        </p>
      </section>
    </div>
  );
}

export default InflationContent;
