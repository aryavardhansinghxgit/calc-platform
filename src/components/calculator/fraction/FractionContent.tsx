"use client";

import React from "react";

export function FractionContent() {
  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-4">

      {/* 1. WHAT IS A FRACTION? */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          What is a fraction?
        </h2>
        <p>
          In mathematics, a fraction represents a numerical quantity that is a part of a whole or, more generally, any number of equal parts. Expressed in the form <span className="inline-flex items-center align-middle mx-1"><sup>a</sup>&frasl;<sub>b</sub></span> (where a and b are integers and b ≠ 0), a fraction defines a dimensionless ratio between the numerator (<strong>a</strong>), representing the number of chosen equal parts, and the denominator (<strong>b</strong>), representing the total number of equal parts comprising the whole.
        </p>
        <p>
          For example, in the fraction <span className="inline-flex items-center align-middle mx-1"><sup>3</sup>&frasl;<sub>8</sub></span>, the numerator is 3 and the denominator is 8. A practical visual model is a circular pie cut into 8 equal slices: taking 3 slices leaves 5 slices remaining, representing <span className="inline-flex items-center align-middle mx-1"><sup>5</sup>&frasl;<sub>8</sub></span> of the total pie. The denominator can never equal 0, as division by zero is mathematically undefined.
        </p>
      </section>

      {/* 2. PROPER VS. IMPROPER FRACTIONS AND MIXED NUMBERS */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Proper vs. Improper Fractions and Mixed Numbers
        </h2>
        <p>
          Fractions are categorized into three primary structural forms depending on the relative magnitude of the numerator and denominator:
        </p>
        <ul className="list-disc pl-5 space-y-2 font-sans text-xs">
          <li>
            <strong>Proper Fractions:</strong> Fractions where the absolute value of the numerator is strictly less than the denominator (|a| &lt; |b|). Proper fractions always represent a quantity strictly less than 1 (e.g., <span className="inline-flex items-center align-middle mx-1"><sup>3</sup>&frasl;<sub>4</sub></span> = 0.75, <span className="inline-flex items-center align-middle mx-1"><sup>5</sup>&frasl;<sub>8</sub></span> = 0.625).
          </li>
          <li>
            <strong>Improper Fractions:</strong> Fractions where the numerator is greater than or equal to the denominator (|a| ≥ |b|). Improper fractions represent values greater than or equal to 1 (e.g., <span className="inline-flex items-center align-middle mx-1"><sup>11</sup>&frasl;<sub>4</sub></span> = 2.75).
          </li>
          <li>
            <strong>Mixed Numbers:</strong> A combination of an integer whole number and a proper fraction (e.g., 2<span className="inline-flex items-center align-middle mx-1"><sup>3</sup>&frasl;<sub>4</sub></span>). Mixed numbers provide intuitive real-world representations for measurements.
          </li>
        </ul>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1">
          <p>Converting Mixed Number (w <span className="inline-flex items-center align-middle mx-1"><sup>a</sup>&frasl;<sub>b</sub></span>) to Improper Fraction:</p>
          <p>Improper Numerator = (w × b) + a &nbsp;&rarr;&nbsp; Result = <span className="inline-flex items-center align-middle mx-1"><sup>(w × b) + a</sup>&frasl;<sub>b</sub></span></p>
          <p>EX: 3<span className="inline-flex items-center align-middle mx-1"><sup>5</sup>&frasl;<sub>7</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>(3 × 7) + 5</sup>&frasl;<sub>7</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>26</sup>&frasl;<sub>7</sub></span></p>
        </div>
      </section>

      {/* 3. HOW TO ADD AND SUBTRACT FRACTIONS */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          How to Add and Subtract Fractions
        </h2>
        <p>
          Adding or subtracting fractions requires a common denominator baseline before performing arithmetic on the numerators. If the fractions already possess identical denominators (like denominators), simply add or subtract the numerators while retaining the common denominator.
        </p>
        <p>
          When denominators differ (unlike denominators), convert the fractions into equivalent fractions possessing a common denominator—preferably the Least Common Multiple (LCM) of the denominators:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-2">
          <p><span className="inline-flex items-center align-middle mx-1"><sup>a</sup>&frasl;<sub>b</sub></span> + <span className="inline-flex items-center align-middle mx-1"><sup>c</sup>&frasl;<sub>d</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>(a × d) + (c × b)</sup>&frasl;<sub>b × d</sub></span></p>
          <p>EX: <span className="inline-flex items-center align-middle mx-1"><sup>2</sup>&frasl;<sub>7</sub></span> + <span className="inline-flex items-center align-middle mx-1"><sup>3</sup>&frasl;<sub>8</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>(2 × 8) + (3 × 7)</sup>&frasl;<sub>7 × 8</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>16 + 21</sup>&frasl;<sub>56</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>37</sup>&frasl;<sub>56</sub></span></p>
        </div>
      </section>

      {/* 4. HOW TO MULTIPLY AND DIVIDE FRACTIONS */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          How to Multiply and Divide Fractions
        </h2>
        <p>
          Unlike addition and subtraction, multiplying fractions does not require finding a common denominator. Multiply the numerators together to form the new numerator, and multiply the denominators together to form the new denominator:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs">
          <span className="inline-flex items-center align-middle mx-1"><sup>a</sup>&frasl;<sub>b</sub></span> × <span className="inline-flex items-center align-middle mx-1"><sup>c</sup>&frasl;<sub>d</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>a × c</sup>&frasl;<sub>b × d</sub></span>
        </div>
        <p>
          To divide one fraction by another, multiply the first fraction (dividend) by the reciprocal of the second fraction (divisor). The reciprocal of a fraction is obtained by swapping its numerator and denominator:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1">
          <p><span className="inline-flex items-center align-middle mx-1"><sup>a</sup>&frasl;<sub>b</sub></span> ÷ <span className="inline-flex items-center align-middle mx-1"><sup>c</sup>&frasl;<sub>d</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>a</sup>&frasl;<sub>b</sub></span> × <span className="inline-flex items-center align-middle mx-1"><sup>d</sup>&frasl;<sub>c</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>a × d</sup>&frasl;<sub>b × c</sub></span></p>
          <p>EX: <span className="inline-flex items-center align-middle mx-1"><sup>3</sup>&frasl;<sub>4</sub></span> ÷ <span className="inline-flex items-center align-middle mx-1"><sup>1</sup>&frasl;<sub>6</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>3</sup>&frasl;<sub>4</sub></span> × <span className="inline-flex items-center align-middle mx-1"><sup>6</sup>&frasl;<sub>1</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>18</sup>&frasl;<sub>4</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>9</sup>&frasl;<sub>2</sub></span> = 4<span className="inline-flex items-center align-middle mx-1"><sup>1</sup>&frasl;<sub>2</sub></span></p>
        </div>
      </section>

      {/* 5. ADVANCED TOPICS: SIMPLIFYING LARGE FRACTIONS AND BIG NUMBER ARITHMETIC */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Advanced Topics: Simplifying Large Fractions and Big Number Arithmetic
        </h2>
        <p>
          Simplifying a fraction into its lowest terms involves dividing both the numerator and denominator by their Greatest Common Divisor (GCD). For large integer values, computing the GCD efficiently requires the Euclidean Algorithm, which repeatedly calculates remainder quotients:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1">
          <p>GCD(a, b) = GCD(b, a mod b)</p>
          <p>EX: Simplifying <span className="inline-flex items-center align-middle mx-1"><sup>217</sup>&frasl;<sub>98</sub></span> &rarr; GCD(217, 98) = 7 &rarr; <span className="inline-flex items-center align-middle mx-1"><sup>217 ÷ 7</sup>&frasl;<sub>98 ÷ 7</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>31</sup>&frasl;<sub>14</sub></span> = 2<span className="inline-flex items-center align-middle mx-1"><sup>3</sup>&frasl;<sub>14</sub></span></p>
        </div>
        <p>
          When handling multi-digit extreme integers that exceed standard double-precision floating-point limits (greater than 2<sup>53</sup> - 1), arbitrary precision <code>BigInt</code> arithmetic ensures zero loss of precision during cross-multiplication and reduction operations.
        </p>
      </section>

      {/* 6. COMMON FRACTION BENCHMARK REFERENCE TABLE */}
      <section className="space-y-3 pt-2">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Common Fraction Benchmark Reference
        </h2>
        <p>
          Below is a quick lookup table converting benchmark fractions into exact decimal and percentage equivalents:
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

      {/* 7. SUMMARY */}
      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Educational Summary</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Fractions express exact rational proportions without rounding errors. Mastering fraction reduction, Least Common Multiple baselines, and reciprocal division is essential for algebra, engineering, and quantitative analysis.
        </p>
      </section>

    </article>
  );
}
