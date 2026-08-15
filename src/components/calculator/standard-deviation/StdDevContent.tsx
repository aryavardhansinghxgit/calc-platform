"use client";

import React from "react";
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, Layers, ShieldCheck, Target, Award } from "lucide-react";

export function StdDevContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span>1. Introduction to the Standard Deviation Suite</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Standard Deviation Calculator & Descriptive Statistics Suite</strong> is an advanced statistical analysis application engineered to calculate, analyze, and visualize measures of dispersion, central tendency, quartiles, and confidence intervals across real-world datasets.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This suite supports 5 dedicated calculation modes (Raw Dataset Stream, Frequency Table / Grouped Data Mode, Summary Statistics Reverse Solver, Two-Dataset Comparison, and Confidence Intervals) with interactive SVG Gaussian Bell Curve visualizations and step-by-step variance tables.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          <span>2. Mathematical Concept & Statistical Intuition</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Standard deviation measures the extent to which numerical data values spread out or cluster around their arithmetic mean (&mu; or x̄). Introduced by Karl Pearson in 1893, standard deviation provides an intuitive metric expressed in the exact same measurement units as the original data points.
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          {"Low Standard Deviation = Tightly Clustered Data Near Mean"}
          <br />
          {"High Standard Deviation = Widely Dispersed Data Across Range"}
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" />
          <span>3. Core Mathematical Formulas & Bessel's Correction</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">1. Sample Standard Deviation (s)</h4>
            <p className="font-mono text-sm font-bold">{"s = √[ ∑(xᵢ - x̄)² / (n - 1) ]"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Uses Bessel's correction (n - 1) to eliminate sample bias.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">2. Population Standard Deviation (σ)</h4>
            <p className="font-mono text-sm font-bold">{"σ = √[ ∑(xᵢ - μ)² / N ]"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Used when data encompasses the entire census population N.</p>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
          Why Divide by n - 1? (Bessel's Correction)
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          When sampling a small subset of a larger population, calculating deviations from the sample mean (x̄) slightly underestimates true population variance. Dividing by n - 1 corrects for this bias, ensuring that E[s²] = &sigma;&sup2;.
        </p>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600" />
          <span>4. How the Calculation Works (6 Operational Steps)</span>
        </h2>

        <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-4 list-decimal">
          <li className="pl-2">
            <strong>Calculate the Arithmetic Mean (x̄):</strong> Sum all values and divide by count n.
          </li>
          <li className="pl-2">
            <strong>Compute Deviations (xᵢ - x̄):</strong> Subtract the mean from each data value.
          </li>
          <li className="pl-2">
            <strong>Square Deviations (xᵢ - x̄)²:</strong> Square each difference to eliminate negative signs.
          </li>
          <li className="pl-2">
            <strong>Sum of Squared Deviations (SS):</strong> Add all squared differences together.
          </li>
          <li className="pl-2">
            <strong>Divide by Degrees of Freedom:</strong> Divide SS by n - 1 (sample) or N (population) to determine Variance.
          </li>
          <li className="pl-2">
            <strong>Square Root Extraction:</strong> Take the positive square root of Variance to get Standard Deviation.
          </li>
        </ol>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-blue-600" />
          <span>5. Worked Calculation Example</span>
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <h3 className="text-sm font-bold text-blue-600">
            Dataset: 10, 12, 16, 22, 25 (n = 5)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            Step 1: Mean x̄ = (10 + 12 + 16 + 22 + 25) / 5 = 17.0<br />
            Step 2: Deviations: -7, -5, -1, +5, +8<br />
            Step 3: Squared Deviations: 49, 25, 1, 25, 64<br />
            Step 4: Sum SS = 49 + 25 + 1 + 25 + 64 = 164<br />
            Step 5: Sample Variance s² = 164 / (5 - 1) = 41.0<br />
            Step 6: Sample Standard Deviation s = &radic;41.0 = <strong>6.4031</strong>.
          </p>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & EMPIRICAL RULE */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-blue-600" />
          <span>6. Visual Understanding & The Empirical Rule (68–95–99.7%)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5">Standard Deviation Band</th>
                <th className="p-2.5">Percentage of Normal Data Covered</th>
                <th className="p-2.5">Statistical Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50 font-mono">
              <tr>
                <td className="p-2 font-bold text-blue-600">&mu; &plusmn; 1&sigma;</td>
                <td className="p-2 font-bold">68.27%</td>
                <td className="p-2 font-sans">Typical central variation zone</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-blue-600">&mu; &plusmn; 2&sigma;</td>
                <td className="p-2 font-bold">95.45%</td>
                <td className="p-2 font-sans">95% statistical confidence threshold</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-blue-600">&mu; &plusmn; 3&sigma;</td>
                <td className="p-2 font-bold">99.73%</td>
                <td className="p-2 font-sans">Three-sigma quality control limit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <span>7. Common Errors in Standard Deviation Analysis</span>
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 1: Confusing Sample SD (s) with Population SD (&sigma;)
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Dividing sample data by N instead of N - 1 underestimates variability. Always use sample SD for surveyed data.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 2: Confusing Standard Deviation with Standard Error (SE)
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Standard deviation measures raw data spread; Standard Error measures the precision of the sample mean estimate across repeated samples.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="h-6 w-6 text-blue-600" />
          <span>8. Real-World Applications Across Industries</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Finance & Volatility</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Measuring stock price volatility, computing Sharpe ratios, and plotting Bollinger bands in algorithmic trading.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Six Sigma Manufacturing</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Process control targeting product dimensions within &plusmn;6&sigma; (3.4 defects per million parts).
            </p>
          </div>
        </div>
      </section>

      {/* 9. RELATED MATHEMATICAL CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <span>9. Related Mathematical Concepts & Prerequisites</span>
        </h2>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
          <li><strong>Variance (s&sup2; or &sigma;&sup2;):</strong> Average squared deviation from the mean.</li>
          <li><strong>Z-Score:</strong> Standardized distance of a data point from the mean in SD units: Z = (x - &mu;) / &sigma;.</li>
        </ul>
      </section>

      {/* 10. SUMMARY */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
        <h2 className="text-lg font-extrabold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The <strong>Standard Deviation Calculator & Descriptive Statistics Suite</strong> empowers researchers, analysts, and students to analyze dataset dispersion with statistical accuracy. Featuring Sample vs Population toggles, SVG Bell Curve visualizers, and complete step-by-step variance tables, this suite serves as an authoritative computational reference.
        </p>
      </section>

    </div>
  );
}
