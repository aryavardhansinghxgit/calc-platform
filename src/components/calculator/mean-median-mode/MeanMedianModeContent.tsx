"use client";

import React from "react";

export function MeanMedianModeContent() {
  return (
    <article className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans max-w-4xl mx-auto pt-6">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Introduction to Central Tendency &amp; Dispersion
        </h2>
        <p>
          In statistical analysis, <strong>measures of central tendency</strong> are summary metrics that identify a single central point representing an entire distribution of quantitative data. Alongside central tendency, <strong>measures of dispersion</strong> quantify how closely individual data points cluster around or spread away from that center.
        </p>
        <p>
          The four fundamental summary metrics are:
        </p>
        <ul className="list-disc pl-6 space-y-2 font-medium">
          <li><strong>Arithmetic Mean:</strong> The numerical center of gravity or balance point of all values.</li>
          <li><strong>Median:</strong> The physical midpoint separating the upper 50% of sorted data from the lower 50%.</li>
          <li><strong>Mode:</strong> The value(s) occurring with the highest frequency.</li>
          <li><strong>Range:</strong> The total numerical span between the maximum and minimum values.</li>
        </ul>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. Mathematical Theory &amp; Classification
        </h2>
        <p>
          The selection of an appropriate central tendency measure depends heavily on variable measurement scales and distribution symmetry:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Symmetric Distributions</h4>
            <p className="text-xs">
              In perfectly symmetrical bell-shaped distributions (Normal Distribution), <strong>Mean = Median = Mode</strong>. The arithmetic mean is the most mathematically efficient estimator.
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Skewed Distributions &amp; Outliers</h4>
            <p className="text-xs">
              In right-skewed (Mean &gt; Median) or left-skewed (Mean &lt; Median) distributions, extreme outliers pull the arithmetic mean away from typical values. The <strong>Median</strong> provides a robust non-parametric summary.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. Core Formulas &amp; Equations
        </h2>

        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-sans font-bold text-slate-900 dark:text-slate-100 text-sm">Arithmetic Mean (x̄)</h4>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-sm">
              x̄ = (1 / n) ∑_{`i=1`}^{`n`} x_i
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-sans font-bold text-slate-900 dark:text-slate-100 text-sm">Median (Odd vs. Even Sample Size)</h4>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-sm">
              Odd n: Median = x_((n+1)/2) &nbsp;&nbsp;|&nbsp;&nbsp; Even n: Median = [ x_(n/2) + x_(n/2 + 1) ] / 2
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-sans font-bold text-slate-900 dark:text-slate-100 text-sm">Weighted Mean (x̄_w)</h4>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-sm">
              x̄_w = ∑ (w_i · x_i) / ∑ w_i
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. How Step-by-Step Derivation Works
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm font-medium">
          <li><strong>Sorting:</strong> Reorder raw numerical elements into ascending sequence x₁ ≤ x₂ ≤ ... ≤ x_n.</li>
          <li><strong>Summation &amp; Mean:</strong> Sum all elements ∑x_i and divide by total count n to get arithmetic mean x̄.</li>
          <li><strong>Position Location:</strong> Determine physical median position using (n + 1) / 2 for odd datasets or average of middle pair for even datasets.</li>
          <li><strong>Frequency Mapping:</strong> Count occurrence frequencies for each unique value to classify Mode (Unimodal, Bimodal, Multimodal, or No Mode).</li>
          <li><strong>Range Evaluation:</strong> Subtract min from max: Range = x_n - x_1.</li>
        </ol>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Step-by-Step Worked Numerical Example
        </h2>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Dataset: [3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29]</h4>
          <p>1. Count n = 15, Sum = 326</p>
          <p>2. Arithmetic Mean x̄ = 326 / 15 = 21.7333</p>
          <p>3. Sorted Data: [3, 5, 7, 12, 13, 14, 20, 23, 23, 23, 23, 29, 39, 40, 56]</p>
          <p>4. Median = 8th value = 23</p>
          <p>5. Mode = 23 (Unimodal, frequency = 4)</p>
          <p>6. Range = 56 - 3 = 53</p>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          6. Specialized Means &amp; Metric Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5">Mean Type</th>
                <th className="p-2.5">Formula</th>
                <th className="p-2.5">Primary Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <td className="p-2 font-bold">Geometric Mean</td>
                <td className="p-2">ⁿ√(∏ x_i)</td>
                <td className="p-2 font-sans">Compounding growth rates, financial returns, inflation indices</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Harmonic Mean</td>
                <td className="p-2">n / ∑ (1 / x_i)</td>
                <td className="p-2 font-sans">Averaging rates, speeds (mph), density, price-to-earnings ratios</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Trimmed Mean</td>
                <td className="p-2">x̄_(k%)</td>
                <td className="p-2 font-sans">Removing top/bottom k% extreme outliers (Olympic scoring)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          7. Common Pitfalls &amp; Misinterpretations
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm">
          <li><strong>Over-relying on Mean in Housing Markets:</strong> Reporting mean home price instead of median causes luxury mansions to heavily distort average real estate reality.</li>
          <li><strong>Assuming Mode Always Exists:</strong> Datasets with all unique values have No Mode.</li>
          <li><strong>Confusing Range with Interquartile Range (IQR):</strong> Range is sensitive to extreme outliers; IQR covers middle 50% spread.</li>
        </ul>
      </section>

      {/* 8. SUMMARY */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
          8. Educational Summary
        </h2>
        <p className="text-sm">
          The <strong>Mean, Median, Mode, Range &amp; Central Tendency Suite</strong> delivers comprehensive analytical accuracy across raw stream datasets, weighted and specialized averages, grouped frequency distributions, target score solvers, two-dataset comparisons, and outlier skewness inspections.
        </p>
      </section>
    </article>
  );
}

export default MeanMedianModeContent;
