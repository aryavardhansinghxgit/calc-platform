"use client";

import React from "react";

export function PercentageContent() {
  return (
    <article className="prose dark:prose-invert max-w-none space-y-8 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed pt-6  dark:border-zinc-800">
      {/* 1. INTRODUCTION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>1.</span> What Is A Percentage?
        </h2>
        <p>
          A <strong>percentage</strong> is a mathematical number or ratio expressed as a fraction of 100. It is denoted using the percent sign ({"%"}) or the abbreviation {"pct"}. The word originates from the Latin <em>per centum</em>, meaning {"by the hundred"}.
        </p>
        <p>
          Percentages provide a standardized baseline for comparing proportions, growth rates, discounts, interest yields, and statistical distributions across sets of different sizes.
        </p>
      </section>

      {/* 2. CORE CONCEPT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>2.</span> Core Mathematical Concept
        </h2>
        <p>
          At its core, a percentage is simply a dimensionless ratio with a constant denominator of 100. Any fraction {"a / b"} can be converted to a percentage by multiplying the ratio by 100:
        </p>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold">
          {"Percentage P = (Part / Whole) × 100%"}
        </div>
      </section>

      {/* 3. FORMULA EXPLANATION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>3.</span> Fundamental Percentage Formulas
        </h2>
        <p>There are three core algebraic variations of the percentage equation:</p>
        <ul className="list-disc pl-6 space-y-2 font-sans tabular-nums text-xs">
          <li>
            <strong>1. Finding the Part (V2):</strong> {"V2 = (P / 100) × V1"} (e.g. What is 15% of 200? ➔ 30)
          </li>
          <li>
            <strong>2. Finding the Percentage (P%):</strong> {"P = (V2 / V1) × 100%"} (e.g. 50 is what % of 200? ➔ 25%)
          </li>
          <li>
            <strong>3. Finding the Whole Base (V1):</strong> {"V1 = V2 / (P / 100)"} (e.g. 30 is 15% of what? ➔ 200)
          </li>
        </ul>
      </section>

      {/* 4. FORMULA BREAKDOWN */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>4.</span> Percentage Difference vs Percentage Change
        </h2>
        <p>
          It is critical to distinguish between <strong>Percentage Change</strong> and <strong>Percentage Difference</strong>:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400">Percentage Change (Directional Growth)</h3>
            <p className="text-[11px]">
              Measures relative change from an initial starting value V1 to a final value V2.
            </p>
            <div className="font-sans tabular-nums text-xs text-blue-600 font-bold">{"% Change = [(V2 - V1) / V1] × 100%"}</div>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400">Percentage Difference (Un-directional Comparison)</h3>
            <p className="text-[11px]">
              Measures relative difference between two values compared against their average baseline.
            </p>
            <div className="font-sans tabular-nums text-xs text-blue-600 font-bold">{"% Difference = [|V1 - V2| / ((V1 + V2)/2)] × 100%"}</div>
          </div>
        </div>
      </section>

      {/* 5. HOW CALCULATION WORKS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>5.</span> Step-by-Step Calculation Process
        </h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Identify the known variables (Percentage P, Part V2, or Total V1).</li>
          <li>Convert any percentage rates to decimal format by dividing by 100.</li>
          <li>Substitute the values into the target algebraic equation.</li>
          <li>Perform cross-multiplication and simplify the numerical result.</li>
        </ol>
      </section>

      {/* 6. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>6.</span> Worked Mathematical Examples
        </h2>

        <div className="space-y-4">
          {/* BASIC EXAMPLE */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">Basic Example: Calculate 20% of $450</h3>
            <ol className="list-decimal pl-6 space-y-1 text-xs">
              <li>Convert 20% to decimal: 20 ÷ 100 = 0.20.</li>
              <li>Multiply decimal by base value: 0.20 × 450 = 90.</li>
            </ol>
            <div className="text-xs font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">Final Result: $90</div>
          </div>

          {/* INTERMEDIATE EXAMPLE */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">Intermediate Example: Percentage Increase from $80 to $100</h3>
            <ol className="list-decimal pl-6 space-y-1 text-xs">
              <li>Calculate net increase: $100 - $80 = $20.</li>
              <li>Divide net increase by original starting price: 20 ÷ 80 = 0.25.</li>
              <li>Convert to percentage: 0.25 × 100% = +25%.</li>
            </ol>
            <div className="text-xs font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">Final Result: +25% Increase</div>
          </div>

          {/* ADVANCED EXAMPLE */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">Advanced Example: Cumulative Percentage Changes (+10% then -10%)</h3>
            <ol className="list-decimal pl-6 space-y-1 text-xs">
              <li>Start with base value 100. Increase by 10%: 100 × 1.10 = 110.</li>
              <li>Decrease 110 by 10%: 110 × (1 - 0.10) = 110 × 0.90 = 99.</li>
              <li>Compare final 99 with initial 100: (99 - 100) / 100 = -1%.</li>
            </ol>
            <div className="text-xs font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">Final Result: Net -1% Decrease (Not 0%)</div>
          </div>
        </div>
      </section>

      {/* 7. VISUAL UNDERSTANDING */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>7.</span> Visual Understanding & Proportions
        </h2>
        <p>
          Visualizing percentages on a 100-grid or doughnut chart helps demonstrate part-to-whole relationships. For instance, 25% corresponds to exactly 1/4 of a circle, while 50% equals 1/2.
        </p>
      </section>

      {/* 8. COMMON MISTAKES */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>8.</span> Common Percentage Mistakes
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Assuming Reversibility:</strong> Increasing a price by 20% and then decreasing it by 20% does NOT return to the original price (e.g. 100 ➔ 120 ➔ 96).
          </li>
          <li>
            <strong>Confusing Percentage Points vs Percent Change:</strong> An interest rate rising from 4% to 5% is a 1 percentage point increase, but a 25% relative increase!
          </li>
          <li>
            <strong>Dividing by the Final Value:</strong> Percentage change must ALWAYS divide by the original starting value V1, not V2.
          </li>
        </ul>
      </section>

      {/* 9. REAL-WORLD APPLICATIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>9.</span> Practical Applications
        </h2>
        <p>
          Percentages are utilized daily in financial interest calculations (APR, APY), sales tax (VAT/GST), retail discounts, investment returns (ROI, CAGR), medical diagnostic test accuracy (sensitivity and specificity), and macroeconomic statistics (inflation rates).
        </p>
      </section>

      {/* 10. ADVANCED CONCEPTS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>10.</span> Advanced Concepts: Basis Points & Elasticity
        </h2>
        <p>
          In finance and institutional economics:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Basis Points (BPS):</strong> 1 basis point equals 1/100th of 1% (0.01% or 0.0001 decimal). 100 bps = 1.00%.</li>
          <li><strong>Compound Annual Growth Rate (CAGR):</strong> Calculates smoothed annual percentage yields across multi-year periods.</li>
        </ul>
      </section>

      {/* 11. RELATED CONCEPTS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>11.</span> Related Mathematical Concepts
        </h2>
        <p>
          Explore related topics: <a href="/calculators/fraction-calculator" className="text-blue-600 dark:text-blue-400 font-bold underline">Fraction Calculator</a>, <a href="/calculators/ratio-calculator" className="text-blue-600 dark:text-blue-400 font-bold underline">Ratio Calculator</a>, and <a href="/calculators/discount-calculator" className="text-blue-600 dark:text-blue-400 font-bold underline">Discount Calculator</a>.
        </p>
      </section>

      {/* 12. SUMMARY */}
      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Educational Summary</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Percentages serve as a universal language for proportional comparison. Mastery of percentage formulas, relative change vs absolute difference, and decimal conversions ensures precision in mathematical, financial, and scientific analysis.
        </p>
      </section>
    </article>
  );
}
