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
          In mathematics, a percentage is a number or ratio that represents a fraction of 100. It is one of the ways to represent a dimensionless relationship between two numbers; other methods include ratios, fractions, and decimals. Percentages are often denoted by the symbol &quot;%&quot; written after the number. They can also be denoted by writing &quot;percent&quot; or &quot;pct&quot; after the number. For example, 35% is equivalent to the decimal 0.35, or the fractions <span className="inline-flex items-center align-middle mx-1"><sup>35</sup>&frasl;<sub>100</sub></span> and <span className="inline-flex items-center align-middle mx-1"><sup>7</sup>&frasl;<sub>20</sub></span>.
        </p>
        <p>
          Percentages are computed by multiplying the value of a ratio by 100. For example, if 25 out of 50 students in a classroom are male, <span className="inline-flex items-center align-middle mx-1"><sup>25</sup>&frasl;<sub>50</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>1</sup>&frasl;<sub>2</sub></span> = 0.5. The value of the ratio is therefore 0.5, and multiplying this by 100 yields:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          0.5 × 100 = 50
        </div>
        <p>
          In other words, the ratio of 25 males to students in the classroom is equivalent to 50% of students in the classroom being male.
        </p>
      </section>

      {/* 2. PERCENTAGE FORMULA */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Percentage formula
        </h2>
        <p>
          Although the percentage formula can be written in different forms, it is essentially an algebraic equation involving three values:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P × V<sub>1</sub> = V<sub>2</sub>
        </div>
        <p>
          <strong>P</strong> is the percentage, <strong>V<sub>1</sub></strong> is the first value that the percentage will modify, and <strong>V<sub>2</sub></strong> is the result of the percentage operating on <strong>V<sub>1</sub></strong>. The calculator provided automatically converts the input percentage into a decimal to compute the solution. However, if solving for the percentage, the value returned will be the actual percentage, not its decimal representation.
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1">
          <p>EX: P × 30 = 1.5</p>
          <p>P = <span className="inline-flex items-center align-middle mx-1"><sup>1.5</sup>&frasl;<sub>30</sub></span> = 0.05 × 100 = 5%</p>
        </div>
        <p>
          If solving manually, the formula requires the percentage in decimal form, so the solution for P needs to be multiplied by 100 in order to convert it to a percent. This is essentially what the calculator above does, except that it accepts inputs in percent rather than decimal form.
        </p>
      </section>

      {/* 3. PERCENTAGE DIFFERENCE FORMULA */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Percentage difference formula
        </h2>
        <p>
          The percentage difference between two values is calculated by dividing the absolute value of the difference between two numbers by the average of those two numbers. Multiplying the result by 100 will yield the solution in percent, rather than decimal form. Refer to the equation below for clarification:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-2">
          <p>Percentage Difference = <span className="inline-flex items-center align-middle mx-1"><sup>|V<sub>1</sub> - V<sub>2</sub>|</sup>&frasl;<sub>(V<sub>1</sub> + V<sub>2</sub>)/2</sub></span> × 100</p>
          <p>EX: <span className="inline-flex items-center align-middle mx-1"><sup>|10 - 6|</sup>&frasl;<sub>(10 + 6)/2</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>4</sup>&frasl;<sub>8</sub></span> = 0.5 = 50%</p>
        </div>
      </section>

      {/* 4. PERCENTAGE CHANGE FORMULA */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Percentage change formula
        </h2>
        <p>
          Percentage increase and decrease are calculated by computing the difference between two values and comparing that difference to the initial value. Mathematically, this involves using the absolute value of the difference between two values then dividing the result by the initial value, essentially calculating how much the initial value has changed.
        </p>
        <p>
          The percentage increase calculator above computes an increase or decrease of a specific percentage of the input number. It basically involves converting a percent into its decimal equivalent, and either subtracting (decrease) or adding (increase) the decimal equivalent from and to 1, respectively. Multiplying the original number by this value will result in either an increase or decrease of the number by the given percent. Refer to the example below for clarification:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-2">
          <p>EX: 500 increased by 10% (0.1)</p>
          <p>500 × (1 + 0.1) = 550</p>
          <p>500 decreased by 10%</p>
          <p>500 × (1 - 0.1) = 450</p>
        </div>
      </section>

      {/* 5. COMMON PERCENTAGE CONVERSIONS REFERENCE TABLE */}
      <section className="space-y-3 pt-2">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Common Percentage Conversions Reference
        </h2>
        <p>
          Below is a quick lookup table converting common benchmark fractions into their exact decimal and percentage equivalents:
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
          Percentages provide a standard proportional baseline for computing relative ratios, rate changes, directional growth, and absolute differences across science, finance, and everyday mathematics.
        </p>
      </section>

    </article>
  );
}
