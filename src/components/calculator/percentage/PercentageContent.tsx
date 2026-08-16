"use client";

import React from "react";

export function PercentageContent() {
  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-4">

      {/* 1. WHAT IS A PERCENTAGE? */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          What is a percentage?
        </h2>
        <p>
          In mathematics, a percentage is a dimensionless ratio or number expressed as a fraction of 100. It serves as a standardized method to compare proportional parts relative to a fixed baseline total. Derived from the Latin term <em>per centum</em>, meaning &quot;by the hundred,&quot; percentages provide a universal language for analyzing ratios, growth rates, discounts, financial interest yields, and statistical distributions.
        </p>
        <p>
          Percentages are denoted by the percent sign &quot;%&quot; or abbreviated as &quot;pct.&quot; Any percentage can be converted into an equivalent decimal by dividing by 100, or expressed as a simplified fraction. For example, 35% corresponds to the decimal 0.35 and the simplified fraction <span className="inline-flex items-center align-middle mx-1"><sup>7</sup>&frasl;<sub>20</sub></span>.
        </p>
        <p>
          To compute a percentage from raw sample data, multiply the ratio of the part to the whole by 100. For instance, if 25 out of 50 students in a classroom are male, the proportion is <span className="inline-flex items-center align-middle mx-1"><sup>25</sup>&frasl;<sub>50</sub></span> = 0.5. Multiplying this proportion by 100 yields the percentage rate:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          0.5 × 100 = 50%
        </div>
      </section>

      {/* 2. PERCENTAGE FORMULA */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Percentage formula
        </h2>
        <p>
          The fundamental percentage relationship is expressed as a simple linear algebraic equation linking three core variables:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P × V<sub>1</sub> = V<sub>2</sub>
        </div>
        <p>
          Here, <strong>P</strong> is the percentage rate in decimal form (where 100% = 1.0), <strong>V<sub>1</sub></strong> represents the initial base value (100% whole), and <strong>V<sub>2</sub></strong> represents the resulting part value. Depending on which two variables are known, the formula reorganizes into three distinct operational forms:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 font-sans tabular-nums text-xs">
          <li><strong>Solving for Part (V<sub>2</sub>):</strong> V<sub>2</sub> = (P / 100) × V<sub>1</sub></li>
          <li><strong>Solving for Percentage Rate (P%):</strong> P = (V<sub>2</sub> / V<sub>1</sub>) × 100%</li>
          <li><strong>Solving for Whole Base (V<sub>1</sub>):</strong> V<sub>1</sub> = V<sub>2</sub> / (P / 100)</li>
        </ul>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1">
          <p>EX: P × 30 = 1.5</p>
          <p>P = <span className="inline-flex items-center align-middle mx-1"><sup>1.5</sup>&frasl;<sub>30</sub></span> = 0.05 × 100 = 5%</p>
        </div>
      </section>

      {/* 3. PERCENTAGE DIFFERENCE FORMULA */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Percentage difference formula
        </h2>
        <p>
          Percentage difference measures the relative variation between two numbers when neither number serves as an official baseline or starting reference point. Rather than comparing against an initial value, percentage difference evaluates the absolute distance between the two values relative to their arithmetic mean:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-2">
          <p>Percentage Difference = <span className="inline-flex items-center align-middle mx-1"><sup>|V<sub>1</sub> - V<sub>2</sub>|</sup>&frasl;<sub>(V<sub>1</sub> + V<sub>2</sub>)/2</sub></span> × 100%</p>
          <p>EX: <span className="inline-flex items-center align-middle mx-1"><sup>|10 - 6|</sup>&frasl;<sub>(10 + 6)/2</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>4</sup>&frasl;<sub>8</sub></span> = 0.5 = 50%</p>
        </div>
        <p>
          Using the average baseline ensures that the calculated percentage difference remains symmetric—producing the exact same result regardless of which number is designated as V<sub>1</sub> or V<sub>2</sub>.
        </p>
      </section>

      {/* 4. PERCENTAGE CHANGE FORMULA */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Percentage change formula
        </h2>
        <p>
          Percentage change quantifies the relative directional growth (increase) or decay (decrease) from an initial starting value V<sub>1</sub> to a final resulting value V<sub>2</sub>. Unlike percentage difference, percentage change strictly divides the net difference by the initial starting value V<sub>1</sub>:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1">
          <p>Percentage Change = <span className="inline-flex items-center align-middle mx-1"><sup>(V<sub>2</sub> - V<sub>1</sub>)</sup>&frasl;<sub>V<sub>1</sub></sub></span> × 100%</p>
        </div>
        <p>
          When applying a percentage increase or decrease directly to a base number V<sub>1</sub>, convert the percentage into a decimal factor (P / 100) and add or subtract it from 1:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1.5">
          <p>EX: 500 increased by 10% (0.1)</p>
          <p>500 × (1 + 0.1) = 550</p>
          <p>EX: 500 decreased by 10%</p>
          <p>500 × (1 - 0.1) = 450</p>
        </div>
      </section>

      {/* 5. COMMON PERCENTAGE CONVERSIONS REFERENCE TABLE */}
      <section className="space-y-3 pt-2">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Common Percentage Conversions Reference
        </h2>
        <p>
          Below is a reference table showing quick mathematical conversions for common benchmark fractions, decimals, and percentage equivalents:
        </p>
        <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded max-w-xl">
          <table className="w-full text-xs text-left border-collapse font-sans tabular-nums">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 font-bold">
                <th className="p-2 border-r border-slate-300 dark:border-slate-700">Fraction</th>
                <th className="p-2 border-r border-slate-300 dark:border-slate-700">Decimal</th>
                <th className="p-2">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/2</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.5</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">50%</td></tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30"><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/3</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.333333...</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">33.333...%</td></tr>
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/4</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.25</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">25%</td></tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30"><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/5</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.2</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">20%</td></tr>
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/8</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.125</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">12.5%</td></tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30"><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/10</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.1</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">10%</td></tr>
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">3/4</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.75</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">75%</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. SUMMARY */}
      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Educational Summary</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Percentages serve as a standard proportional tool for computing relative ratios, rate changes, directional growth, and absolute differences across science, finance, and everyday mathematics.
        </p>
      </section>

    </article>
  );
}
