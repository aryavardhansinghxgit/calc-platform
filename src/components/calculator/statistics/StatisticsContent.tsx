"use client";

import React from "react";

export function StatisticsContent() {
  return (
    <article className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans max-w-4xl mx-auto pt-6">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Introduction to Statistics &amp; Data Analysis
        </h2>
        <p>
          <strong>Statistics</strong> is the mathematical science of collecting, organizing, analyzing, interpreting, and presenting quantitative and qualitative data. Whether analyzing clinical trial outcomes, evaluating financial portfolio volatility, or optimizing machine learning algorithms, statistical methods provide the foundation for empirical reasoning.
        </p>
        <p>
          Statistical methodology is divided into two fundamental branches:
        </p>
        <ul className="list-disc pl-6 space-y-2 font-medium">
          <li>
            <strong>Descriptive Statistics:</strong> Techniques for summarizing, visualizing, and describing the essential characteristics of an observed dataset without drawing inferences beyond the data itself.
          </li>
          <li>
            <strong>Inferential Statistics:</strong> Methods for making predictions, testing hypotheses, and generalizing findings from an observed sample to an unobserved target population.
          </li>
        </ul>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. Mathematical Theory &amp; Measurement Scales
        </h2>
        <p>
          Data variables are classified by measurement scale, which dictates the mathematical operations permitted:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Nominal &amp; Ordinal (Categorical)</h4>
            <p className="text-xs">
              <strong>Nominal:</strong> Discrete qualitative labels with no inherent order (e.g., blood type, nationality).<br />
              <strong>Ordinal:</strong> Ranked categories with meaningful order but non-uniform intervals (e.g., Likert scales, customer satisfaction tiers).
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Interval &amp; Ratio (Numerical)</h4>
            <p className="text-xs">
              <strong>Interval:</strong> Ordered numeric data with equal intervals but an arbitrary zero point (e.g., Temperature in °C/°F).<br />
              <strong>Ratio:</strong> Numerical data with a true absolute zero, enabling meaningful ratio comparisons (e.g., mass, revenue, sample size).
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
            <h4 className="font-sans font-bold text-slate-900 dark:text-slate-100 text-sm">Arithmetic Mean (Sample vs. Population)</h4>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-sm">
              x̄ = (1 / n) ∑_{`i=1`}^{`n`} x_i &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; μ = (1 / N) ∑_{`i=1`}^{`N`} x_i
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-sans font-bold text-slate-900 dark:text-slate-100 text-sm">Variance &amp; Standard Deviation (Bessel's Correction)</h4>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-sm">
              s² = (1 / (n - 1)) ∑ (x_i - x̄)² &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; σ² = (1 / N) ∑ (x_i - μ)²
            </p>
            <p className="font-sans text-slate-600 dark:text-slate-400 text-xs">
              Dividing sample variance by (n - 1) corrects for bias in estimating population variance from small sample sizes.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-sans font-bold text-slate-900 dark:text-slate-100 text-sm">Pearson Correlation Coefficient (r)</h4>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-sm">
              r = ∑ (x_i - x̄)(y_i - ȳ) / √[ ∑ (x_i - x̄)² ∑ (y_i - ȳ)² ]
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. How Step-by-Step Variance &amp; Regression Works
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm font-medium">
          <li><strong>Data Tokenization:</strong> Clean input raw numbers into a sorted numerical array {`[x₁, x₂, ..., xₙ]`}.</li>
          <li><strong>Mean Evaluation:</strong> Compute arithmetic mean x̄ by dividing total sum ∑x_i by sample count n.</li>
          <li><strong>Deviation Matrix:</strong> Compute deviation for every data point {`(x_i - x̄)`} and square each deviation {`(x_i - x̄)²`}.</li>
          <li><strong>Sum of Squares (SS):</strong> Sum squared deviations to calculate Sum of Squares SS = ∑(x_i - x̄)².</li>
          <li><strong>Sample Variance:</strong> Divide SS by degrees of freedom (n - 1) to derive sample variance s². Take square root to get sample standard deviation s.</li>
        </ol>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Step-by-Step Worked Examples
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Example: Dataset = [4, 8, 6, 5, 3, 2, 8, 9, 2, 5]</h4>
            <p>1. Count N = 10, Sum = 52</p>
            <p>2. Mean x̄ = 52 / 10 = 5.2</p>
            <p>3. Sorted Data: [2, 2, 3, 4, 5, 5, 6, 8, 8, 9]</p>
            <p>4. Median = (5 + 5) / 2 = 5.0</p>
            <p>5. Modes = 2, 5, 8 (Multimodal, frequency = 2)</p>
            <p>6. Sum of Squares SS = 55.6</p>
            <p>7. Sample Variance s² = 55.6 / (10 - 1) = 6.1778</p>
            <p>8. Sample Standard Deviation s = √6.1778 = 2.4855</p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          6. Five-Number Summary &amp; Outlier Detection Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5">Metric</th>
                <th className="p-2.5">Definition</th>
                <th className="p-2.5">Formula</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <td className="p-2 font-bold">Q1 (1st Quartile)</td>
                <td className="p-2 font-sans">25th Percentile of sorted data</td>
                <td className="p-2">Median of lower half</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Q3 (3rd Quartile)</td>
                <td className="p-2 font-sans">75th Percentile of sorted data</td>
                <td className="p-2">Median of upper half</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">IQR</td>
                <td className="p-2 font-sans">Middle 50% spread</td>
                <td className="p-2">Q3 - Q1</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Tukey Outliers</td>
                <td className="p-2 font-sans">Extreme value detection bounds</td>
                <td className="p-2">[Q1 - 1.5×IQR, Q3 + 1.5×IQR]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          7. Common Statistical Pitfalls &amp; Mistakes
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm">
          <li><strong>Confusing Sample SD (s) with Population SD (σ):</strong> Using N instead of (n - 1) underestimates true population variance when working with samples.</li>
          <li><strong>Relying solely on Mean in Skewed Distributions:</strong> Heavy outliers pull the mean away from typical values; use median for skewed data (e.g. household income).</li>
          <li><strong>Assuming Correlation Implies Causation:</strong> High Pearson r indicates linear association, not direct causal dependency.</li>
        </ul>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          8. Real-World Applications Across Industries
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="font-bold text-blue-600 dark:text-blue-400">Data Science &amp; Machine Learning</h4>
            <p>Feature normalization, Z-score standardization, linear regression baseline modeling, exploratory data analysis.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="font-bold text-blue-600 dark:text-blue-400">Finance &amp; Portfolio Optimization</h4>
            <p>Risk-adjusted performance, Sharpe ratio calculations, asset return volatility, CAPM beta covariance.</p>
          </div>
        </div>
      </section>

      {/* 9. SUMMARY */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
          9. Educational Summary
        </h2>
        <p className="text-sm">
          The <strong>Statistics Calculator &amp; Statistical Analysis Suite</strong> provides complete computational accuracy across descriptive statistics, frequency tables, bivariate linear regression, hypothesis testing, confidence intervals, and probability distributions. Using step-by-step derivations and visual analytics, this tool empowers students, researchers, and data professionals to master discrete data modeling.
        </p>
      </section>
    </article>
  );
}

export default StatisticsContent;
