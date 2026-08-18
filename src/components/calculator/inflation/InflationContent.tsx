"use client";

import React from "react";

export function InflationContent() {
  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. WHAT IS INFLATION */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. What is Inflation? (Definitions &amp; Purchasing Power Erosion)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          <strong>Inflation</strong> is the quantitative economic measure of the rate at which the aggregate price level of a standardized basket of consumer goods and services in an economy increases over a given time horizon.
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Because currency notes possess no intrinsic physical value beyond legal sovereign decree (fiat), as general price levels rise, each unit of currency buys a progressively smaller quantity of real goods. Inflation is fundamentally the <em>inverse reciprocal of currency purchasing power</em>.
        </p>
      </section>

      {/* 2. THE THREE MAIN TYPES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. The Three Primary Macroeconomic Causes of Inflation
        </h2>
        <div className="space-y-3 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Demand-Pull Inflation (&quot;Too Much Money Chasing Too Few Goods&quot;)
            </h3>
            <p className="text-black dark:text-slate-100">
              Occurs when aggregate economic demand for goods and services outpaces an economy&apos;s productive capacity. During periods of rapid fiscal stimulus, low interest rates, or consumer credit expansion, buyers compete vigorously for fixed supply, bidding up market equilibrium prices.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Cost-Push Inflation (Supply-Side Disruptions &amp; Commodity Spikes)
            </h3>
            <p className="text-black dark:text-slate-100">
              Occurs when aggregate supply decreases due to sharp increases in the costs of production inputs—such as crude oil shocks, agricultural fertilizer shortages, or international maritime supply chain bottlenecks. Businesses pass these elevated production costs directly onto consumers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. Built-In Inflation (The Wage-Price Spiral)
            </h3>
            <p className="text-black dark:text-slate-100">
              Driven by circular adaptive expectations. When workers anticipate ongoing price inflation, they demand higher nominal wages to preserve their living standards. Employers pay these higher wages and subsequently raise product retail prices to maintain corporate operating margins, perpetuating a continuous upward spiral.
            </p>
          </div>
        </div>
      </section>

      {/* 3. QUANTITY THEORY OF MONEY */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. Monetary Policy &amp; The Equation of Exchange ($MV = PY$)
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs font-medium">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
            The Classical Quantity Theory of Money
          </h3>
          <p className="text-black dark:text-slate-100">
            Monetarist economic theory (pioneered by Milton Friedman) establishes that inflation is ultimately a monetary phenomenon dictated by the <strong>Equation of Exchange</strong>:
          </p>
          <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-center font-bold text-sm text-black dark:text-slate-100">
            M &times; V = P &times; Y
          </div>
          <p className="text-black dark:text-slate-100">
            Where <strong>M</strong> is the total Money Supply (e.g. M2), <strong>V</strong> is the Velocity of Money circulation, <strong>P</strong> is the Price Level, and <strong>Y</strong> is Real Economic Output (Real GDP). If central banks expand the money supply ($M$) at a pace exceeding real productivity growth ($Y$) while velocity ($V$) remains stable, the general price level ($P$) must mathematically increase to balance the equation.
          </p>
        </div>
      </section>

      {/* 4. HOW CPI IS MEASURED */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. How the Consumer Price Index (CPI) is Measured by the BLS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              CPI-U (All Urban Consumers)
            </h3>
            <p className="text-black dark:text-slate-100">
              The headline index published monthly by the U.S. Bureau of Labor Statistics (BLS). It samples approximately 80,000 price quotes across 8 major spending categories representing ~93% of the U.S. population: Housing (~44%), Transportation (~17%), Food &amp; Beverages (~15%), Medical Care (~8%), Recreation (~6%), Education (~3%), Apparel (~3%), and Other (~4%).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Core CPI (CPILFENS)
            </h3>
            <p className="text-black dark:text-slate-100">
              Excludes volatile Food and Energy components from the calculation. Because oil and agricultural produce fluctuate wildly due to geopolitics and unseasonal weather, central banks utilize Core CPI to gauge underlying structural macroeconomic inflation trends.
            </p>
          </div>
        </div>
      </section>

      {/* 5. STRATEGIES TO BEAT INFLATION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          5. Proven Strategies to Protect Wealth Against Inflation Drag
        </h2>
        <ul className="list-disc list-inside space-y-1.5 text-xs text-black dark:text-slate-100">
          <li><strong>Equities &amp; Index Funds (S&amp;P 500):</strong> Productive corporations possess pricing power, enabling them to raise product prices to match inflation and deliver historic long-term real returns of 6.5%–7.0% above inflation.</li>
          <li><strong>Real Estate &amp; Physical Land:</strong> Real property provides dual inflation protection through asset appreciation and periodic rental income increases.</li>
          <li><strong>Treasury Inflation-Protected Securities (TIPS):</strong> U.S. government bonds whose principal balance adjusts semi-annually in direct tandem with changes in the CPI-U index.</li>
          <li><strong>Fixed-Rate Long-Term Debt:</strong> Borrowers with fixed 30-year low-interest mortgages repay their fixed nominal debt balances over time using inflated, cheaper future dollars.</li>
        </ul>
      </section>

      {/* 6. FAQS (12 FAQS) */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {/* FAQ 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. How does the inflation calculator use the Consumer Price Index (CPI) to calculate dollar purchasing power?
            </h3>
            <p className="text-black dark:text-slate-100">
              The calculator computes the ratio between the target period CPI and start period CPI: Target Value = Amount &times; (Target CPI &divide; Start CPI). This reflects the exact dollar amount required today to match the real purchasing power of the baseline sum.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. What is the difference between headline CPI and Core CPI?
            </h3>
            <p className="text-black dark:text-slate-100">
              Headline CPI tracks all goods in the consumer basket including food and energy. Core CPI strips out food and energy due to their extreme short-term commodity price volatility, providing monetary policymakers with a clearer signal of long-term underlying inflation.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. What is the Rule of 72 and how does it calculate the halving time of purchasing power?
            </h3>
            <p className="text-black dark:text-slate-100">
              The Rule of 72 estimates how many years it takes for cash purchasing power to lose 50% of its real value: Years to Halve = 72 &divide; Annual Inflation Rate (%). For example, at a 3% inflation rate, money loses half its buying power in approximately 24 years (72 &divide; 3 = 24).
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. Why is inflation called the &quot;hidden tax&quot; on cash savings?
            </h3>
            <p className="text-black dark:text-slate-100">
              Inflation diminishes the real purchasing power of uninvested currency sitting in cash accounts without requiring an explicit legislative tax bill. Holding $100,000 cash at 4% annual inflation results in a silent $4,000 loss in real economic purchasing power every year.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              5. What is the difference between inflation, deflation, disinflation, and stagflation?
            </h3>
            <p className="text-black dark:text-slate-100">
              Inflation is rising prices; deflation is falling price levels; disinflation is a slowing rate of positive inflation (e.g. dropping from 8% to 3%); and stagflation is the toxic combination of high inflation coupled with stagnant GDP growth and high unemployment.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              6. How does the Federal Reserve control inflation through interest rate hikes?
            </h3>
            <p className="text-black dark:text-slate-100">
              By raising the Federal Funds Rate, the central bank increases borrowing costs for mortgages, auto loans, and corporate debt. This slows consumer spending and business capital investment, reducing aggregate demand and cooling price pressures.
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              7. What causes hyperinflation and how is it different from normal inflation?
            </h3>
            <p className="text-black dark:text-slate-100">
              Hyperinflation is defined as price increases exceeding 50% per month. It occurs when a government monetizes extreme deficits by printing excessive quantities of unbacked money, triggering a complete collapse in confidence in the sovereign currency (e.g. Weimar Germany, Zimbabwe).
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              8. How do I calculate if my salary raise kept pace with inflation?
            </h3>
            <p className="text-black dark:text-slate-100">
              Calculate your percentage nominal salary raise and subtract the cumulative CPI inflation percentage over the same period. If your salary rose by 4% while inflation was 6%, your real purchasing power experienced a net 2% decline (a real wage cut).
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              9. What assets historically serve as the best hedge against high inflation?
            </h3>
            <p className="text-black dark:text-slate-100">
              Historically, diversified broad-market equities (S&amp;P 500), real estate properties with adjustable rents, Treasury Inflation-Protected Securities (TIPS), and energy/industrial commodities have provided the most durable inflation protection.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              10. Why do central banks target a 2% inflation rate instead of 0%?
            </h3>
            <p className="text-black dark:text-slate-100">
              A 2% inflation target provides a safety buffer against economic deflation (which triggers recessionary spending freezes and debt defaults) and allows central banks room to adjust real interest rates during economic downturns.
            </p>
          </div>

          {/* FAQ 11 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              11. What is the Fisher Equation and why does real return matter for investors?
            </h3>
            <p className="text-black dark:text-slate-100">
              The Fisher Equation states that Real Return = (1 + Nominal Return) &divide; (1 + Inflation Rate) &minus; 1. It reveals that an investment yielding 8% nominal return in a 5% inflation environment generates only ~2.86% in true real wealth accumulation.
            </p>
          </div>

          {/* FAQ 12 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              12. How does inflation affect fixed-rate mortgage borrowers vs lenders?
            </h3>
            <p className="text-black dark:text-slate-100">
              Inflation strongly benefits fixed-rate mortgage borrowers because their monthly payment remains nominal and constant while household wages typically inflate over time, reducing the real economic burden of servicing the debt.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InflationContent;
