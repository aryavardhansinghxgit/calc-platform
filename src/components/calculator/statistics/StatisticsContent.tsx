"use client";

import React from "react";
import Link from "next/link";

export function StatisticsContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      
      {/* 1. INTRODUCTION TO STATISTICS & DATA ANALYSIS */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introduction to Statistics &amp; Data Analysis
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Statistics is the mathematical discipline dedicated to the collection, organization, analysis, interpretation, and presentation of quantitative and qualitative data. Statistical methodology is structured into two fundamental branches:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3">
          <li>
            <strong>Descriptive Statistics:</strong> Techniques for summarizing, organizing, and visualizing the key characteristics of an observed dataset without drawing conclusions beyond the immediate data. Core metrics include central tendency (<Link href="/calculators/mean-median-mode-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">mean, median, mode</Link>) and dispersion (<Link href="/calculators/standard-deviation-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">standard deviation</Link>, variance, IQR).
          </li>
          <li>
            <strong>Inferential Statistics:</strong> Analytical frameworks for making predictions, estimating population parameters, and testing empirical hypotheses using representative sample observations.
          </li>
        </ul>
      </div>

      {/* 2. WHAT THIS STATISTICS CALCULATOR CAN DO */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. What This Statistics Calculator Can Do
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          This comprehensive statistical analysis workspace integrates six specialized analytical modules:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3 text-xs sm:text-sm">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Univariate Descriptive Statistics</span>
            <p className="text-slate-600 dark:text-slate-300">Mean, median, mode, range, sample/population variance, standard deviation, standard error, skewness, and kurtosis.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Distribution Summaries &amp; Outliers</span>
            <p className="text-slate-600 dark:text-slate-300">Quartiles (Q1, Q3), interquartile range (IQR), five-number summary, and Tukey 1.5×IQR outlier detection fences.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Grouped &amp; Frequency Table Data</span>
            <p className="text-slate-600 dark:text-slate-300">Class midpoints, cumulative frequencies, grouped mean, grouped sample variance, and grouped standard deviation.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Bivariate Correlation &amp; Linear Regression</span>
            <p className="text-slate-600 dark:text-slate-300">Covariance, Pearson correlation coefficient (r), coefficient of determination (R²), OLS best-fit slope, intercept, and prediction engine.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Hypothesis Testing &amp; Decision Engine</span>
            <p className="text-slate-600 dark:text-slate-300">Z/t test statistic, p-value calculation, critical value derivation, and decision reporting with configurable tail directions.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Confidence Intervals &amp; Normal Distribution</span>
            <p className="text-slate-600 dark:text-slate-300">Margin of error, interval bounds for 90%/95%/99% confidence, cumulative probability Φ(z), and tail probabilities with <Link href="/calculators/z-score-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Z-Score</Link> integration.</p>
          </div>
        </div>
      </div>

      {/* 3. START HERE: HOW TO USE */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Start Here: How to Use the Statistics Calculator
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Identify your data structure:</strong> Choose single dataset (univariate), grouped/frequency data, or paired X-Y observations.</li>
          <li><strong>Enter numerical data:</strong> Paste or type values separated by commas, spaces, or newlines.</li>
          <li><strong>Select Sample vs. Population:</strong> Toggle Bessel&apos;s correction (n - 1) for sample data or N for complete population censuses.</li>
          <li><strong>Review summary metrics:</strong> Inspect observation count (n), sums, central tendency, spread, and critical values.</li>
          <li><strong>Inspect visual analytics:</strong> Toggle between the auto-binned histogram, standard bell curve overlay, five-number box plot, and deviation step table.</li>
          <li><strong>Configure inferential parameters:</strong> For hypothesis testing and confidence intervals, specify null mean, alpha level (α), and tail direction.</li>
          <li><strong>Save and audit calculations:</strong> Calculations persist in local browser storage for easy comparison across research sessions.</li>
        </ol>
      </div>

      {/* 4. MODULE GUIDE: DESCRIPTIVE STATISTICS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Module Guide: Descriptive Statistics
        </h2>
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div>
            <strong className="text-slate-900 dark:text-white">4.1 Arithmetic Mean (x̄ or μ):</strong>
            <p>The sum of all observations divided by the total count: x̄ = (∑xᵢ) / n. For the dataset [1, 2, 3, 4, 5], mean = 3. For the reference dataset [4, 8, 6, 5, 3, 2, 8, 9, 2, 5, 12, 15] (n = 12), sum = 79 and mean = 6.5833.</p>
          </div>
          <div>
            <strong className="text-slate-900 dark:text-white">4.2 Median:</strong>
            <p>The geometric middle value of sorted data. For odd counts, it is the center item; for even counts, it is the average of the two middle items. For [1, 2, 3, 4, 5], median = 3; for [1, 2, 3, 4], median = 2.5; for the 12-item dataset, median = (5 + 6)/2 = 5.5.</p>
          </div>
          <div>
            <strong className="text-slate-900 dark:text-white">4.3 Mode &amp; Multimodality:</strong>
            <p>The most frequently occurring observation(s). Datasets can be unimodal, bimodal, multimodal, or have no mode if all frequencies equal 1. For example, dataset [4, 8, 6, 5, 3, 2, 8, 9, 2, 5] has modes 2, 5, and 8 (frequency 2 each).</p>
          </div>
          <div>
            <strong className="text-slate-900 dark:text-white">4.4 Range:</strong>
            <p>The absolute span between extreme values: Range = Max - Min. For [2, 4, 7, 10], range = 8. For [-5, -2, -1], range = 4.</p>
          </div>
          <div>
            <strong className="text-slate-900 dark:text-white">4.5 Variance and Standard Deviation:</strong>
            <p>The average squared deviation from the mean. Sample variance uses Bessel&apos;s correction: s² = ∑(xᵢ - x̄)² / (n - 1). Population variance divides by N: σ² = ∑(xᵢ - μ)² / N. Standard deviation is the positive square root of variance, expressed in original measurement units.</p>
          </div>
          <div>
            <strong className="text-slate-900 dark:text-white">4.6 Standard Error (SE):</strong>
            <p>Measures the sampling variability of the sample mean: SE = s / √n. For sample SD = 4.0104 and n = 12, SE = 4.0104 / √12 ≈ 1.1577. For study design and sample sizing, explore the <Link href="/calculators/sample-size-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Sample Size Calculator</Link>.</p>
          </div>
          <div>
            <strong className="text-slate-900 dark:text-white">4.7 Skewness:</strong>
            <p>Measures distribution asymmetry using the standardized third central moment: m₃ / s³. Positive skew indicates a right tail; negative skew indicates a left tail. For the 12-item reference dataset, skewness = 0.7523.</p>
          </div>
        </div>
      </div>

      {/* 5. QUARTILES, IQR & OUTLIERS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          5. Quartiles, IQR, Five-Number Summary &amp; Outlier Detection
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Quartiles divide sorted datasets into four equal quarters. Using linear interpolation:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
          <li><strong>Q1 (First Quartile / 25th Percentile):</strong> Median of the lower half (Q1 = 3.75 for reference data).</li>
          <li><strong>Median (Q2 / 50th Percentile):</strong> Central midpoint (Median = 5.50).</li>
          <li><strong>Q3 (Third Quartile / 75th Percentile):</strong> Median of the upper half (Q3 = 8.25).</li>
          <li><strong>Interquartile Range (IQR):</strong> Middle 50% statistical spread: IQR = Q3 - Q1 = 8.25 - 3.75 = <strong>4.50</strong>.</li>
        </ul>
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs mt-3 space-y-1">
          <p className="font-semibold text-slate-900 dark:text-white font-sans">Tukey&apos;s 1.5×IQR Outlier Screening Fences:</p>
          <p>Lower Fence = Q1 - 1.5 × IQR &nbsp;|&nbsp; Upper Fence = Q3 + 1.5 × IQR</p>
          <p className="text-slate-600 dark:text-slate-400 font-sans">Observations outside [Q1 - 1.5×IQR, Q3 + 1.5×IQR] are flagged as potential outliers for data audit.</p>
        </div>
      </div>

      {/* 6. GROUPED & FREQUENCY DATA */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          6. How to Use the Grouped / Frequency Data Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          When raw individual observations are unavailable, data grouped into class intervals and frequencies can be analyzed using midpoints (xᵢ) and frequencies (fᵢ):
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs mt-3 space-y-1 text-center">
          <p className="font-semibold text-slate-900 dark:text-white">x̄_grouped = ∑(fᵢ × xᵢ) / ∑fᵢ &nbsp;|&nbsp; s²_grouped = ∑[fᵢ × (xᵢ - x̄_grouped)²] / (∑fᵢ - 1)</p>
          <p className="text-blue-600 dark:text-blue-400">Example: Midpoints [10, 20, 30, 40, 50] with Frequencies [5, 12, 18, 10, 5] &rarr; Total N = 50, Mean = 29.6, Sample SD = 11.2413</p>
        </div>
      </div>

      {/* 7. CORRELATION & LINEAR REGRESSION */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          7. How to Use Correlation &amp; Linear Regression
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          For paired observations (X, Y), the ordinary least squares (OLS) regression line minimizes vertical squared residuals:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs mt-3 space-y-1">
          <p className="font-semibold text-slate-900 dark:text-white font-sans">Linear Regression Model: ŷ = mx + b</p>
          <p>Slope: m = ∑[(x - x̄)(y - ȳ)] / ∑(x - x̄)² &nbsp;|&nbsp; Intercept: b = ȳ - m × x̄</p>
          <p>Pearson r = ∑[(x - x̄)(y - ȳ)] / √[∑(x - x̄)² × ∑(y - ȳ)²] &nbsp;|&nbsp; R² = r²</p>
          <p className="text-blue-600 dark:text-blue-400">Reference: X=[60..72], Y=[130..175] &rarr; ŷ = 3.8937x - 104.9975, r = 0.9963, R² = 99.26%</p>
        </div>
        <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-900/40 mt-3">
          <strong>Important YMYL Rule:</strong> Correlation measures linear association; it does not prove causation or physical dependency. For measuring percentage deviation, see the <Link href="/calculators/percent-error-calculator" className="font-semibold hover:underline">Percent Error Calculator</Link>.
        </p>
      </div>

      {/* 8. HYPOTHESIS TESTING */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          8. How to Use the Hypothesis Test Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Evaluates sample evidence against a null hypothesis (H₀: μ = μ₀):
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs mt-3 space-y-1 text-center">
          <p className="font-semibold text-slate-900 dark:text-white">Test Statistic: z = (x̄ - μ₀) / (s / √n)</p>
          <p>Validated Input: μ₀ = 50, x̄ = 53.2, s = 8.5, n = 35 &rarr; Test Statistic = <strong>2.2272</strong></p>
          <p className="text-blue-600 dark:text-blue-400">Right-Tailed: p = 0.0130 (Crit = 1.645) &nbsp;|&nbsp; Two-Tailed: p = 0.0259 (Crit = 1.960) &rarr; Decision: Reject H₀ at α = 0.05</p>
        </div>
      </div>

      {/* 9. CONFIDENCE INTERVALS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          9. How to Use the Confidence Interval Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Constructs parameter estimation intervals using critical multipliers (z*):
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs mt-3 space-y-1 text-center">
          <p className="font-semibold text-slate-900 dark:text-white">Confidence Interval: x̄ ± z* × (s / √n)</p>
          <p className="text-blue-600 dark:text-blue-400">Example: Mean=105.4, SD=15.2, n=50, 95% Conf (z*=1.96) &rarr; ME = 4.2141 &rarr; Interval: [101.1859, 109.6141]</p>
        </div>
      </div>

      {/* 10. NORMAL DISTRIBUTION & PROBABILITY */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          10. How to Use the Normal Distribution &amp; Probability Module
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Computes cumulative probability Φ(z) and tail areas for standard normal scores:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 font-mono">
          <li>For z = 1.96: Cumulative P(Z &le; 1.96) &approx; <strong>0.9750</strong>, Upper Tail P(Z &gt; 1.96) &approx; <strong>0.0250</strong>.</li>
          <li>For z = 0.00: Cumulative P(Z &le; 0) = <strong>0.5000</strong>.</li>
          <li>Symmetry property: Φ(-z) = 1 - Φ(z). For general probability math, explore the <Link href="/calculators/probability-calculator" className="font-sans text-blue-600 dark:text-blue-400 font-semibold hover:underline">Probability Calculator</Link>.</li>
        </ul>
      </div>

      {/* 11. VISUAL ANALYTICS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          11. How to Read the Histogram, Bell Curve and Box Plot
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
          <strong>Histogram:</strong> Uses Sturges&apos; rule to bin continuous data into discrete frequency columns, revealing distribution skewness and modal clusters.
          <br /><br />
          <strong>Bell Curve Overlay:</strong> Overlays a theoretical Gaussian normal density curve scaled to the sample mean and variance.
          <br /><br />
          <strong>Box &amp; Whisker Plot:</strong> Visually renders the five-number summary (Min, Q1, Median, Q3, Max) along with Tukey outlier flags.
        </p>
      </div>

      {/* 12. SAMPLE VS POPULATION MODE */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          12. Why Sample vs. Population Mode Matters
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The distinction centers on whether data represents a sample subset or an entire population. Sample variance uses (n - 1) in the denominator to correct for downward bias in variance estimation (Bessel&apos;s correction). For [1, 2, 3, 4, 5]:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs sm:text-sm font-mono">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1 font-sans">Sample Statistics (n - 1)</span>
            <p>Variance: s² = 2.5000</p>
            <p>Standard Deviation: s = 1.5811</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1 font-sans">Population Statistics (N)</span>
            <p>Variance: σ² = 2.0000</p>
            <p>Standard Deviation: σ = 1.4142</p>
          </div>
        </div>
      </div>

      {/* 13. MEASUREMENT SCALES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          13. Measurement Scales: Nominal, Ordinal, Interval and Ratio
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-white block mb-1">Nominal Scale</strong>
            <p className="text-slate-600 dark:text-slate-300">Qualitative category labels with no inherent ranking (e.g., blood type, nationality). Mode is the only valid central tendency.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-white block mb-1">Ordinal Scale</strong>
            <p className="text-slate-600 dark:text-slate-300">Ordered ranks with non-uniform intervals (e.g., customer satisfaction ratings, stage ranks). Median is the primary measure.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-white block mb-1">Interval Scale</strong>
            <p className="text-slate-600 dark:text-slate-300">Ordered numerical data with equal intervals but an arbitrary zero point (e.g., Temperature in °C/°F). Mean and SD are meaningful.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-white block mb-1">Ratio Scale</strong>
            <p className="text-slate-600 dark:text-slate-300">Numerical data with equal intervals and a true absolute zero (e.g., distance, mass, revenue). All mathematical operations are valid.</p>
          </div>
        </div>
      </div>

      {/* 14. TWO REFERENCE ANOMALIES DOCUMENTED */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          14. Reference Anomalies &amp; Correct Engine Implementation
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900/40">
            <strong className="text-blue-950 dark:text-blue-200 block mb-0.5">Anomaly 1 — Hypothesis Test Tail Consistency:</strong>
            <p>Reference PDF page 6 displayed p = 0.0130 alongside two-tailed critical value 1.960. The engine resolves this by providing distinct, synchronized tail modes: right-tailed (p &approx; 0.0130, crit = 1.645) and two-tailed (p &approx; 0.0259, crit = 1.960).</p>
          </div>
          <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900/40">
            <strong className="text-blue-950 dark:text-blue-200 block mb-0.5">Anomaly 2 — Page 11 Worked Variance Sum of Squares:</strong>
            <p>Reference PDF page 11 listed SS = 55.6 for dataset [4, 8, 6, 5, 3, 2, 8, 9, 2, 5]. Exact arithmetic evaluation proves ∑(xᵢ - 5.2)² = <strong>57.60</strong>, yielding true sample variance s² = 57.6 / 9 = <strong>6.4000</strong> and sample SD s = <strong>2.5298</strong>. The production engine computes the exact values.</p>
          </div>
        </div>
      </div>

      {/* 15. METHODOLOGY & PRIVACY */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          15. Methodology, Privacy and Limitations
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
          <strong>100% Client-Side Privacy:</strong> All statistical analyses, regressions, matrix evaluations, and chart renderings run locally within your browser. Saved records are stored in browser localStorage. For complex matrix or trigonometric functions, use the{" "}
          <Link href="/calculators/scientific-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Scientific Calculator
          </Link>.
        </p>
      </div>

    </article>
  );
}

export default StatisticsContent;
