"use client";

import React from "react";

export function ConfidenceIntervalContent() {
  return (
    <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          1. Introduction to Confidence Intervals &amp; Interval Estimation
        </h2>
        <p>
          In statistical inference, a <strong>confidence interval (CI)</strong> provides a plausible range of values for an unknown population parameter (such as a population mean &mu; or population proportion p) calculated from sample observations at a designated <em>confidence level (1 - &alpha;)</em>.
        </p>
        <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
          <h3 className="font-bold text-blue-900 dark:text-blue-300 text-sm">
            Frequentist Interpretation (Avoiding the Common Fallacy)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <strong>Common Misconception:</strong> &quot;There is a 95% probability that the true population mean lies within this specific calculated interval.&quot;<br />
            <strong>Statistically Accurate Definition:</strong> &quot;If independent random samples of size n are repeatedly drawn from the same population and a 95% confidence interval is constructed for each sample, approximately 95% of those calculated intervals will contain the fixed, unknown population parameter.&quot;
          </p>
        </div>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. The 3 Key Components of Confidence Intervals
        </h2>
        <p>
          Every confidence interval structure is built upon three core components:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">1. Point Estimate</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The single best sample statistic estimating the population parameter (Sample mean x̄ or sample proportion p̂).
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">2. Critical Value (Z* / t*)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The multiplier determined by the probability distribution and confidence level (e.g. Z* = 1.960 for 95% CL).
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">3. Standard Error (SE)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The estimated standard deviation of the sampling distribution (SE = s / &radic;n).
            </p>
          </div>
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Complete Confidence Interval Formula Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Parameter Type</th>
                <th className="p-3">Assumptions / Method</th>
                <th className="p-3">Formula</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-3 font-bold font-sans">Single Mean (&mu;)</td>
                <td className="p-3 font-sans">Known &sigma; or n &ge; 30 (Normal Z)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">CI = x̄ &plusmn; Z<sub>&alpha;/2</sub> &times; (&sigma; / &radic;n)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Single Mean (&mu;)</td>
                <td className="p-3 font-sans">Unknown &sigma; (Student&apos;s t, df = n - 1)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">CI = x̄ &plusmn; t<sub>&alpha;/2, df</sub> &times; (s / &radic;n)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Proportion (p)</td>
                <td className="p-3 font-sans">Wilson Score Interval</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">[p̂ + Z&sup2;/2n &plusmn; Z&radic;(p̂(1-p̂)/n + Z&sup2;/4n&sup2;)] / (1 + Z&sup2;/n)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Two Means Difference (&mu;1 - &mu;2)</td>
                <td className="p-3 font-sans">Welch&apos;s t-Interval (Unequal Variance)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">CI = (x̄1 - x̄2) &plusmn; t* &times; &radic;(s1&sup2;/n1 + s2&sup2;/n2)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Population Variance (&sigma;&sup2;)</td>
                <td className="p-3 font-sans">Chi-Square Distribution (df = n - 1)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">[(n-1)s&sup2; / &chi;&sup2;<sub>upper</sub>, (n-1)s&sup2; / &chi;&sup2;<sub>lower</sub>]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          4. Step-by-Step Calculation Breakdown
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 1: Determine Alpha &amp; Critical Score</h3>
            <p>Compute &alpha; = 1 - CL (e.g., 1 - 0.95 = 0.05). Divide by 2 for two-tailed tests (&alpha;/2 = 0.025) and find Z* or t*.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 2: Calculate Standard Error</h3>
            <p>Divide sample standard deviation by square root of sample size: SE = s / &radic;n.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 3: Synthesize Margin of Error &amp; Bounds</h3>
            <p>Multiply Critical Score by SE to get Margin of Error ME = Critical &times; SE. Lower Bound = x̄ - ME, Upper Bound = x̄ + ME.</p>
          </div>
        </div>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          5. Worked Real-World Examples
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 1: Small Sample Mean Estimation (t-Distribution)
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> A sample of n = 16 students has mean score x̄ = 24.5 with sample SD s = 4.0. Find the 95% confidence interval.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              df = 16 - 1 = 15. Critical t<sub>0.025, 15</sub> = 2.131.<br />
              SE = 4.0 / &radic;16 = 1.0.<br />
              ME = 2.131 &times; 1.0 = &plusmn;2.131.<br />
              CI = [24.5 - 2.131, 24.5 + 2.131] = [22.369, 26.631].
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 2: Public Polling Proportion Survey
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> In a sample of n = 1000 voters, x = 520 favor a policy. Find the 95% confidence interval.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              Sample proportion p̂ = 520 / 1000 = 0.52.<br />
              Critical Z* = 1.960.<br />
              SE = &radic;[(0.52 &times; 0.48) / 1000] = 0.0158.<br />
              ME = 1.960 &times; 0.0158 = &plusmn;0.031 (&plusmn;3.1%).<br />
              CI = [48.9%, 55.1%].
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & CRITICAL VALUES TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Common Critical Values (Z*) Reference Table
        </h2>
        <p className="text-xs">
          The reference table below summarizes standard Z* multipliers for common confidence levels:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Confidence Level (CL)</th>
                <th className="p-3">Alpha (&alpha;)</th>
                <th className="p-3">Tail Probability (&alpha;/2)</th>
                <th className="p-3">Critical Score (Z*)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-2.5 font-bold font-sans">80%</td>
                <td className="p-2.5">0.20</td>
                <td className="p-2.5">0.100</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1.282</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-sans">90%</td>
                <td className="p-2.5">0.10</td>
                <td className="p-2.5">0.050</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1.645</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-sans">95%</td>
                <td className="p-2.5">0.05</td>
                <td className="p-2.5">0.025</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1.960</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-sans">98%</td>
                <td className="p-2.5">0.02</td>
                <td className="p-2.5">0.010</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">2.326</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-sans">99%</td>
                <td className="p-2.5">0.01</td>
                <td className="p-2.5">0.005</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">2.576</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-sans">99.9%</td>
                <td className="p-2.5">0.001</td>
                <td className="p-2.5">0.0005</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">3.291</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Common Pitfalls &amp; Frequent User Errors
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li>
            <strong>Using Z-Score for Small Samples with Unknown &sigma;:</strong> Always use Student&apos;s t-distribution when &sigma; is unknown and sample size is small (n &lt; 30).
          </li>
          <li>
            <strong>Confusing Confidence Level with Interval Width:</strong> Higher confidence levels (e.g. 99% vs 95%) result in <em>wider</em> intervals, not narrower ones.
          </li>
          <li>
            <strong>Misinterpreting Two-Sample Difference Intervals:</strong> If a difference interval contains 0 (e.g. [-1.5, 4.2]), the difference is not statistically significant at that confidence level.
          </li>
        </ul>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          8. Practical &amp; Professional Applications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Political Polling</h3>
            <p>Reporting national election survey bounds with margins of error (&plusmn;3%).</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Pharmaceutical Testing</h3>
            <p>Establishing drug treatment efficacy bounds over placebos.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">A/B Website Experimentation</h3>
            <p>Verifying true conversion uplift in digital marketing campaigns.</p>
          </div>
        </div>
      </section>

      {/* 9. RELATED CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          9. Related Mathematical Concepts
        </h2>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Sample Size Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Z-Score Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Standard Deviation Calculator
          </span>
        </div>
      </section>

      {/* 10. SUMMARY */}
      <section className="p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h2 className="text-base font-bold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          A confidence interval quantifies the margin of uncertainty in statistical estimation. Computed as Point Estimate &plusmn; (Critical Score &times; Standard Error), it provides a plausible range for population parameters like means, proportions, and variances across research disciplines.
        </p>
      </section>
    </article>
  );
}

export default ConfidenceIntervalContent;
