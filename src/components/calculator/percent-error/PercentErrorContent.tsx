"use client";

import React from "react";
import Link from "next/link";

export function PercentErrorContent() {
  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-4">

      {/* 1. WHAT IS PERCENTAGE ERROR? */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          What is percentage error?
        </h2>
        <p>
          Percentage error (or percent error) is a dimensionless mathematical metric used to quantify the discrepancy between an experimentally observed or measured value and a known, accepted, or theoretical true value. In scientific experiments, engineering calibrations, and industrial quality control, measurements are rarely exact due to instrument precision limits, environmental fluctuations, or human estimation errors.
        </p>
        <p>
          Calculating the percentage error provides a standardized scale-independent metric. By expressing the measurement deviation as a percentage of the reference value, researchers can meaningfully evaluate accuracy whether measuring microscopic atomic dimensions or planetary orbital distances. A lower percentage error indicates closer agreement with the reference value, while a larger percentage error indicates a larger relative discrepancy. The underlying cause of any discrepancy (such as systematic bias or random noise) requires separate experimental investigation.
        </p>
      </section>

      {/* 2. THE PERCENTAGE ERROR FORMULA */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          The Percentage Error Formula
        </h2>
        <p>
          The standard non-directional percentage error formula computes the absolute magnitude of the error relative to the true accepted value:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1">
          <p>Percentage Error = <span className="inline-flex items-center align-middle mx-1"><sup>|V<sub>observed</sub> - V<sub>true</sub>|</sup>&frasl;<sub>|V<sub>true</sub>|</sub></span> × 100%</p>
        </div>
        <p>
          Alternatively, if evaluating directionality (whether the observation overestimated or underestimated the true value), the signed percentage error formula omits the absolute value operator:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1">
          <p>Signed Percentage Error = <span className="inline-flex items-center align-middle mx-1"><sup>(V<sub>observed</sub> - V<sub>true</sub>)</sup>&frasl;<sub>V<sub>true</sub></sub></span> × 100%</p>
        </div>
      </section>

      {/* 3. HOW TO CALCULATE PERCENTAGE ERROR */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          How to Calculate Percentage Error
        </h2>
        <p>
          Computing percentage error involves four systematic steps:
        </p>
        <ol className="list-decimal pl-5 space-y-2 font-sans text-xs">
          <li>
            <strong>Determine baseline values:</strong> Express both the observed (measured) value and the true (accepted) value in identical physical units.
          </li>
          <li>
            <strong>Calculate the error difference:</strong> Subtract the true value from the observed value (V<sub>observed</sub> - V<sub>true</sub>).
          </li>
          <li>
            <strong>Compute relative error:</strong> Divide the error difference by the true value. For absolute percentage error, take the absolute value of the numerator before dividing.
          </li>
          <li>
            <strong>Scale to percentage:</strong> Multiply the decimal quotient by 100 and append the &quot;%&quot; symbol using our <Link href="/calculators/percentage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Percentage Calculator</Link> principles.
          </li>
        </ol>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1">
          <p>EX: Observed = 10, True = 11</p>
          <p>Difference = 10 - 11 = -1</p>
          <p>Signed Percent Error = <span className="inline-flex items-center align-middle mx-1"><sup>-1</sup>&frasl;<sub>11</sub></span> × 100% = -9.090909%</p>
          <p>Absolute Percent Error = <span className="inline-flex items-center align-middle mx-1"><sup>|-1|</sup>&frasl;<sub>11</sub></span> × 100% = 9.090909% error</p>
        </div>
      </section>

      {/* 4. ABSOLUTE ERROR VS. PERCENTAGE ERROR */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Absolute Error vs. Percentage Error
        </h2>
        <p>
          It is essential to distinguish between absolute error and percentage error:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs">Absolute Error</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The raw physical magnitude of the difference: <strong>|V<sub>observed</sub> - V<sub>true</sub>|</strong>. Absolute error retains the original measurement units (e.g., ±0.5 grams or ±2 meters).
            </p>
          </div>
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs">Percentage Error</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The relative proportion of error normalized against the accepted reference size. Percentage error is unitless and expressed per hundred, enabling direct accuracy comparisons across different scales. Use the <Link href="/calculators/rounding-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Rounding Calculator</Link> to round final percentages to significant figures.
            </p>
          </div>
        </div>
      </section>

      {/* 5. NEGATIVE PERCENTAGE ERROR */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Negative Percentage Error
        </h2>
        <p>
          When using the signed formula, a negative percentage error simply indicates that the observed measurement fell below the accepted true value (an underestimate). Conversely, a positive signed percentage error indicates an overestimate. In most standard academic reporting, absolute percentage error (without sign) is preferred unless directionality is explicitly required. For broader statistical distribution analyses, visit the <Link href="/calculators/statistics-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Statistics Calculator</Link> or <Link href="/calculators/standard-deviation-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Standard Deviation Calculator</Link>.
        </p>
      </section>

      {/* 6. SUMMARY */}
      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Educational Summary</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Percentage error measures the accuracy of an experimental observation relative to an accepted true value. Dividing the difference by the true value and multiplying by 100 provides a universal metric for evaluating measurement precision across science, mathematics, and engineering. For advanced computations, explore our <Link href="/calculators/scientific-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Scientific Calculator</Link>.
        </p>
      </section>

    </article>
  );
}

export default PercentErrorContent;
