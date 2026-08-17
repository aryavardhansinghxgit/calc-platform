"use client";

import React, { useState, useMemo } from "react";
import { normalCDF } from "@/app/calculators/z-score-calculator/z-score-logic";
import { Search } from "lucide-react";

export function ZScoreContent() {
  const [tableSearch, setTableSearch] = useState<string>("");
  const [tableMode, setTableMode] = useState<"positive" | "negative">("positive");

  // Generate Z-Table rows (0.0 to 3.9 for positive, -3.9 to 0.0 for negative)
  const zTableData = useMemo(() => {
    const rows: { rowHeader: string; cols: { zVal: number; probStr: string }[] }[] = [];
    const step = 0.1;

    const rowStart = tableMode === "positive" ? 0.0 : -3.9;
    const rowEnd = tableMode === "positive" ? 3.9 : 0.0;

    for (let r = rowStart; tableMode === "positive" ? r <= rowEnd + 0.01 : r <= rowEnd + 0.01; r += step) {
      const rowHeader = r.toFixed(1);
      const cols: { zVal: number; probStr: string }[] = [];

      for (let c = 0; c <= 9; c++) {
        const hundredth = c * 0.01;
        const zVal = r >= 0 ? r + hundredth : r - hundredth;
        const prob = normalCDF(zVal);
        cols.push({
          zVal: parseFloat(zVal.toFixed(2)),
          probStr: prob.toFixed(5)
        });
      }

      rows.push({ rowHeader, cols });
    }
    return rows;
  }, [tableMode]);

  // Filter rows based on search query
  const filteredRows = useMemo(() => {
    if (!tableSearch.trim()) return zTableData;
    const q = tableSearch.trim().toLowerCase();
    return zTableData.filter(r =>
      r.rowHeader.includes(q) || r.cols.some(c => c.probStr.includes(q) || c.zVal.toString().includes(q))
    );
  }, [zTableData, tableSearch]);

  return (
    <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          1. Introduction to Z-Scores &amp; Standard Normal Distribution
        </h2>
        <p>
          A <strong>Z-score</strong> (also known as a <em>standard score</em>) measures exactly how many standard deviations a raw data point (X) lies above or below the population mean (&mu;). In statistical inference and data science, standardization maps arbitrary normal distributions N(&mu;, &sigma;&sup2;) directly onto the standard normal distribution N(0, 1).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-1">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 text-xs">Positive Z-Score (Z &gt; 0)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The observed raw value is strictly above average. For example, Z = +2.0 means the score is 2 full standard deviations above the mean.
            </p>
          </div>

          <div className="p-4 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs">Zero Z-Score (Z = 0)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The raw value equals the exact population mean (X = &mu;). Exactly 50% of the distribution lies below this point.
            </p>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60 space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-amber-300 text-xs">Negative Z-Score (Z &lt; 0)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The observed value lies below average. For example, Z = -1.5 indicates the value is 1.5 standard deviations below average.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. Underlying Theory &amp; Standardization Principles
        </h2>
        <p>
          Standardization removes units of measurement (such as inches, dollars, or test points) to allow direct comparison between entirely different datasets. For example, comparing a score of 1350 on the SAT (&mu; = 1000, &sigma; = 200) to a 30 on the ACT (&mu; = 21, &sigma; = 5) requires standardizing both into Z-scores:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
          <div>SAT Z-Score = (1350 - 1000) / 200 = +1.75</div>
          <div>ACT Z-Score = (30 - 21) / 5 = +1.80</div>
          <div className="text-blue-600 dark:text-blue-400 font-bold font-sans pt-1">
            Conclusion: The ACT score of 30 (+1.80 SD) represents a higher percentile rank than the SAT score of 1350 (+1.75 SD).
          </div>
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Complete Z-Score Formula Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Calculation Type</th>
                <th className="p-3">Formula</th>
                <th className="p-3">Variable Definitions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-3 font-bold font-sans">Population Z-Score</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">Z = (X - &mu;) / &sigma;</td>
                <td className="p-3 font-sans">X = Raw score, &mu; = Population mean, &sigma; = Population standard deviation</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Sample Z-Score</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">Z = (X - x̄) / s</td>
                <td className="p-3 font-sans">X = Raw score, x̄ = Sample mean, s = Sample standard deviation</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Standard Error of Mean</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">Z = (x̄ - &mu;) / (&sigma; / &radic;n)</td>
                <td className="p-3 font-sans">x̄ = Sample mean, &mu; = Population mean, &sigma; = SD, n = Sample size</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Inverse Z (Raw Value)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">X = &mu; + Z &times; &sigma;</td>
                <td className="p-3 font-sans">Reconstructs raw score X from critical Z-score and parameters</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          4. How Step-by-Step Derivation Works
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 1: Compute Deviation Score</h3>
            <p>Subtract the mean (&mu;) from the raw score (X) to find the raw distance: &Delta; = X - &mu;.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 2: Scale by Standard Deviation</h3>
            <p>Divide the deviation score by &sigma;: Z = &Delta; / &sigma;.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 3: Lookup Probability &amp; Percentile</h3>
            <p>
              Evaluate the cumulative distribution function (CDF) to obtain left-tail cumulative probability and percentile rank.
            </p>
          </div>
        </div>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          5. Comprehensive Worked Examples
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 1: Test Score Percentile
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> A student scores 85 on an exam with mean &mu; = 70 and standard deviation &sigma; = 10. Find the Z-score and percentile.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              Z = (85 - 70) / 10 = 15 / 10 = +1.50.<br />
              CDF &Phi;(1.50) = 0.93319 &rarr; Percentile Rank = 93.32%.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 2: 95% Confidence Interval Critical Value
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> Find the critical Z* value for a 95% two-tailed confidence interval.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              Alpha &alpha; = 1 - 0.95 = 0.05. Split into two tails: &alpha;/2 = 0.025.<br />
              Look up 1 - 0.025 = 0.9750 cumulative probability &rarr; Z* = &plusmn;1.96.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & SEARCHABLE Z-TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Interactive Searchable Standard Normal Z-Table Matrix
        </h2>
        <p className="text-xs">
          Use the interactive table below to look up cumulative probabilities P(Z &le; z) from 0.00 to 3.99 (Positive Z-Table) or -3.99 to 0.00 (Negative Z-Table).
        </p>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setTableMode("positive")}
                className={`px-3 py-1.5 rounded-lg cursor-pointer ${tableMode === "positive" ? "bg-blue-600 text-white" : ""}`}
              >
                Positive Z-Table (+0.00 to +3.99)
              </button>
              <button
                type="button"
                onClick={() => setTableMode("negative")}
                className={`px-3 py-1.5 rounded-lg cursor-pointer ${tableMode === "negative" ? "bg-blue-600 text-white" : ""}`}
              >
                Negative Z-Table (-3.99 to 0.00)
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search Z or Prob..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold"
              />
            </div>
          </div>

          <div className="overflow-x-auto max-h-80 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-center text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-blue-600 text-white font-bold sticky top-0">
                  <th className="p-2 border-r border-blue-500">Z</th>
                  {Array.from({ length: 10 }).map((_, c) => (
                    <th key={c} className="p-2">.0{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
                {filteredRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-blue-50 dark:hover:bg-blue-950/40">
                    <td className="p-2 font-bold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-r border-slate-200 dark:border-slate-700">
                      {row.rowHeader}
                    </td>
                    {row.cols.map((col, cIdx) => (
                      <td key={cIdx} className="p-2 text-[11px] text-slate-700 dark:text-slate-300">
                        {col.probStr}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Common Pitfalls &amp; Frequent User Errors
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li>
            <strong>Confusing Left-Tail and Right-Tail Probabilities:</strong> Standard Z-tables output left-tail area P(Z &lt; z). To find the right-tail probability P(Z &gt; z), subtract from 1: 1 - P(Z &lt; z).
          </li>
          <li>
            <strong>Using Sample Formula for Individual Observations:</strong> Do not divide by &radic;n when standardizing a single observation (X). Only use &sigma; / &radic;n when dealing with sampling distributions of the mean (x̄).
          </li>
          <li>
            <strong>Assuming Non-Normal Data:</strong> Z-score probabilities strictly apply to normally distributed variables. If the underlying population is heavily skewed, standard normal percentiles will be inaccurate.
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
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Quality Control (Six Sigma)</h3>
            <p>Evaluating component defect rates where tolerance limits fall at &plusmn;3&sigma; (99.73% yield) or &plusmn;6&sigma; (3.4 DPMO).</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Finance &amp; Risk Metrics</h3>
            <p>Calculating Value at Risk (VaR) and Altman Z-score corporate bankruptcy probability indicators.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Medical Diagnostics</h3>
            <p>Interpreting bone density DEXA T-scores and pediatric height/weight growth charts.</p>
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
            Standard Deviation Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Confidence Interval Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            T-Test &amp; Hypothesis Calculator
          </span>
        </div>
      </section>

      {/* 10. SUMMARY */}
      <section className="p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h2 className="text-base font-bold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          The Z-score standardizes raw observations by scaling deviations relative to the mean by the standard deviation (Z = (X - &mu;) / &sigma;). Using the standard normal distribution N(0, 1), Z-scores enable instant determination of percentile ranks, tail probabilities, critical values for hypothesis testing, and multi-variable comparisons.
        </p>
      </section>
    </article>
  );
}

export default ZScoreContent;
