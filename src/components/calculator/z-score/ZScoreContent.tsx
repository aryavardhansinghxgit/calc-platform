"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Sliders, BookOpen, ShieldAlert, Search } from "lucide-react";
import { normalCDF } from "@/app/calculators/z-score-calculator/z-score-logic";
import { z_score_calculatorFaqs } from "@/app/calculators/z-score-calculator/faq";

export function ZScoreContent() {
  // Unfolded FAQ Accordion State (open by default)
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>(() => {
    const initialState: Record<number, boolean> = {};
    z_score_calculatorFaqs.forEach((_, idx) => {
      initialState[idx] = true;
    });
    return initialState;
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Interactive Z-Table State
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
    <article className="space-y-12 text-slate-800 dark:text-slate-200 leading-relaxed font-sans max-w-4xl mx-auto pt-4">
      {/* 401(k)-STYLE RELATED CALCULATORS MID-BAR */}
      <section className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Related Statistical Solvers
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/calculators/standard-deviation-calculator"
            className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-xs group"
          >
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Standard Deviation
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Population &amp; sample dispersion
              </p>
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">&rarr;</span>
          </Link>

          <Link
            href="/calculators/confidence-interval-calculator"
            className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-xs group"
          >
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Confidence Interval
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Margin of error &amp; bounds
              </p>
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">&rarr;</span>
          </Link>

          <Link
            href="/calculators/statistics-calculator"
            className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-xs group"
          >
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Statistics Calculator
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Full descriptive summary suite
              </p>
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* INTRO */}
      <section className="space-y-4">
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          A z-score tells you how far a value is from the mean when the distance is measured in standard deviations. It is one of the most useful ways to standardize a numerical observation so that values from different normal distributions can be compared on the same scale.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          This Z-Score Calculator lets you calculate a standard or sample z-score, convert a z-score into a normal-distribution percentile, find left-tail, right-tail and two-tail probabilities, calculate critical z-values from confidence levels or probabilities, find the area between two raw values, and analyze a complete dataset row by row.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The calculator also provides an interactive standard-normal bell curve so the numerical result can be interpreted visually. For batch data, it reports summary statistics together with individual z-scores and percentile ranks.
        </p>
        <p className="text-xs text-slate-500 leading-relaxed italic">
          The important distinction is that the z-score itself is a standardization calculation, while the conversion of that z-score into a probability or percentile uses the normal-distribution model. A z-score can be calculated for a numerical observation, but interpreting its percentile through the standard normal CDF requires the corresponding normal-distribution assumption.
        </p>
      </section>

      {/* WHAT IS A Z-SCORE? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          What Is a Z-Score?
        </h2>
        <p>
          A z-score, also called a <em>standard score</em>, measures the position of an observation relative to a mean in units of standard deviation.
        </p>
        <p>For a population distribution:</p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-lg">
          z = (x − μ) / σ
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          where: <strong>x</strong> = observed or raw value, <strong>μ</strong> = population mean, and <strong>σ</strong> = population standard deviation.
        </p>
        <p>
          The result tells you the standardized distance between the observation and the mean. A positive z-score means the observation is above the mean. A negative z-score means it is below the mean. A z-score of zero means the observation is exactly equal to the mean.
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm">
          For x = 85, μ = 70, σ = 10 &rarr; z = (85 − 70) / 10 = 1.5
        </div>
        <p className="text-sm">
          The value 85 is therefore 1.5 standard deviations above the mean.
        </p>
      </section>

      {/* EDUCATIONAL RESPONSIVE SVG FLOWCHART DIAGRAM */}
      <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          How a Raw Score Becomes a Z-Score
        </h3>
        <div className="w-full overflow-x-auto flex justify-center py-2">
          <svg
            viewBox="0 0 540 330"
            className="w-full max-w-xl h-auto"
            role="img"
            aria-label="Flowchart demonstrating how a raw score is converted to a standardized z-score"
          >
            <title>How a Raw Score Becomes a Z-Score</title>
            <desc>Diagram showing the sequence: Raw Score X, subtract mean mu to get deviation X minus mu, divide by standard deviation sigma to get Z = (X - mu) / sigma, and interpret as standard deviations from center.</desc>

            {/* Step 1: Raw Score */}
            <rect x="180" y="10" width="180" height="38" rx="8" fill="#2563eb" />
            <text x="270" y="34" fill="#ffffff" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              Raw Score (X)
            </text>

            <line x1="270" y1="48" x2="270" y2="70" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Step 2: Subtract Mean */}
            <rect x="180" y="70" width="180" height="38" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="270" y="94" fill="#1e3a8a" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              Subtract Mean (μ)
            </text>

            <line x1="270" y1="108" x2="270" y2="130" stroke="#94a3b8" strokeWidth="2" />

            {/* Step 3: Raw Deviation */}
            <rect x="195" y="130" width="150" height="34" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="270" y="152" fill="#0f172a" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="monospace">
              Deviation = X − μ
            </text>

            <line x1="270" y1="164" x2="270" y2="186" stroke="#94a3b8" strokeWidth="2" />

            {/* Step 4: Divide by SD */}
            <rect x="160" y="186" width="220" height="38" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="270" y="210" fill="#1e3a8a" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              Divide by Standard Deviation (σ)
            </text>

            <line x1="270" y1="224" x2="270" y2="246" stroke="#94a3b8" strokeWidth="2" />

            {/* Step 5: Standardized Z-Score */}
            <rect x="170" y="246" width="200" height="38" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
            <text x="270" y="270" fill="#1e40af" textAnchor="middle" fontSize="14" fontWeight="bold" fontFamily="monospace">
              Z = (X − μ) / σ
            </text>

            <line x1="270" y1="284" x2="270" y2="298" stroke="#94a3b8" strokeWidth="2" />

            {/* Interpretation */}
            <text x="270" y="316" fill="#64748b" textAnchor="middle" fontSize="11" fontFamily="sans-serif">
              Interpret as Standard Deviations Above / Below the Mean
            </text>
          </svg>
        </div>
        <p className="text-xs text-center text-slate-500 dark:text-slate-400 italic">
          A z-score converts a raw observation into a unitless measure of its distance from the mean.
        </p>
      </section>

      {/* HOW TO CALCULATE A Z-SCORE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          How to Calculate a Z-Score
        </h2>
        <p>The calculation has three basic steps:</p>
        <div className="space-y-3 font-medium text-sm">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Step 1: Find the difference from the mean</h3>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400 mt-1">
              x − μ &nbsp;&rarr;&nbsp; For x = 85 and μ = 70: 85 − 70 = 15
            </p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Step 2: Divide by the standard deviation</h3>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400 mt-1">
              (x − μ) / σ &nbsp;&rarr;&nbsp; 15 / 10 = 1.5
            </p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Step 3: Interpret the sign</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Because the result is positive (z = +1.5), the observation lies 1.5 standard deviations above the mean.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          The calculator displays the substitution directly, so you can verify how the result was obtained instead of receiving only a final number.
        </p>
      </section>

      {/* POSITIVE, NEGATIVE, AND ZERO Z-SCORES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Interpreting Positive, Negative &amp; Zero Z-Scores
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Positive Z-Score (z &gt; 0)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Indicates the observation is above the mean. For example, z = +2 means 2 standard deviations above the mean. Does not mean the value is automatically anomalous; interpretation depends on context.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Zero Z-Score (z = 0)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Indicates x = μ exactly. For a standard normal curve, P(Z &lt; 0) = 0.5 and P(Z &gt; 0) = 0.5. Exactly 50% of the distribution lies below zero.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-sm text-amber-600">Negative Z-Score (z &lt; 0)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Indicates the observation is below the mean. For x = 55, μ = 70, σ = 10: z = (55 − 70) / 10 = −1.5. Lies to the left of the mean on the bell curve.
            </p>
          </div>
        </div>
      </section>

      {/* Z-SCORE AND PERCENTILE ARE NOT THE SAME THING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Z-Score and Percentile Are Not the Same Thing
        </h2>
        <p>
          A common mistake is to describe a z-score as a percentile. They are related, but they are different quantities:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li><strong>A z-score</strong> expresses a distance in standard deviation units.</li>
          <li><strong>A percentile</strong> expresses a cumulative position under a specified distribution.</li>
        </ul>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-base">
          Percentile = Φ(z)
        </div>
        <p className="text-sm">
          where Φ is the standard normal cumulative distribution function. For example, z = 1.50 corresponds to approximately Φ(1.50) = 0.9332, or about the <strong>93.32nd percentile</strong> under the standard normal model.
        </p>
      </section>

      {/* WORKED EXAMPLE: Z = 1.50 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Worked Example: Z = 1.50
        </h2>
        <p>Suppose a test score has Raw score: 85, Mean: 70, Standard deviation: 10:</p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm">
          z = (85 − 70) / 10 = 1.5000
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Left Tail P(Z &lt; z)</span>
            <span className="text-lg font-bold font-mono text-blue-600">93.32%</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Right Tail P(Z &gt; z)</span>
            <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">6.68%</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Two-Tail P(|Z| &gt; |z|)</span>
            <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">13.36%</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Central P(-z &lt; Z &lt; z)</span>
            <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">86.64%</span>
          </div>
        </div>
      </section>

      {/* TAIL PROBABILITIES & CENTRAL PROBABILITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Tail Probabilities &amp; Central Empirical Rule
        </h2>
        <p>
          The central probability is the area between two symmetric z-values: P(−z &lt; Z &lt; z) = 1 − P(|Z| &gt; z).
        </p>
        <p>
          The familiar <strong>68–95–99.7 empirical rule</strong> comes directly from the standard normal distribution:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm font-mono">
          <li>P(−1 &lt; Z &lt; 1) ≈ 68.27% (within ±1 standard deviation)</li>
          <li>P(−1.96 &lt; Z &lt; 1.96) ≈ 95.00% (within ±2 standard deviations is ≈ 95.45%)</li>
          <li>P(−3 &lt; Z &lt; 3) ≈ 99.73% (within ±3 standard deviations)</li>
        </ul>

        {/* MID-CONTENT INTERNAL LINK #1 */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          When your analysis also requires direct calculation of variance and standard deviation, continue to the{" "}
          <Link
            href="/calculators/standard-deviation-calculator"
            className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700"
          >
            Standard Deviation Calculator
          </Link>{" "}
          for a dedicated dispersion calculation.
        </div>
      </section>

      {/* STANDARD NORMAL DISTRIBUTION & STANDARDIZATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          What Is the Standard Normal Distribution &amp; Why Standardize?
        </h2>
        <p>
          The standard normal distribution has parameters <strong>μ = 0</strong> and <strong>σ = 1</strong>, commonly written as <strong>Z ~ N(0, 1)</strong>. The curve is symmetric around zero and has its maximum density at zero.
        </p>
        <p>
          Standardization removes the original measurement scale so that different distributions can be compared on a common metric. Suppose two tests use different scales:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="font-bold text-slate-500 block">Test A (Mean 100, SD 20)</span>
            <span className="text-sm font-bold text-blue-600">XA = 135 &rarr; zA = (135 − 100) / 20 = 1.75</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="font-bold text-slate-500 block">Test B (Mean 70, SD 10)</span>
            <span className="text-sm font-bold text-blue-600">XB = 88 &rarr; zB = (88 − 70) / 10 = 1.80</span>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          The standardized positions are 1.75 and 1.80 standard deviations above their respective means, allowing an objective comparison.
        </p>
      </section>

      {/* SAMPLE DATA & NON-ZERO SD */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Sample Data &amp; Why Standard Deviation Cannot Be Zero
        </h2>
        <p>
          When parameters come from a sample, the formula uses sample mean x̄ and sample standard deviation s:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-base">
          z = (x − x̄) / s
        </div>
        <p className="text-sm">
          Because the formula divides by standard deviation, if σ = 0 division by zero occurs, making the standard z-score mathematically undefined. A standard deviation must be strictly positive (σ &gt; 0). The calculator explicitly flags non-positive SD inputs as invalid rather than silently replacing them.
        </p>
      </section>

      {/* CRITICAL Z-VALUES & 95% CONFIDENCE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Critical Z-Values &amp; Confidence Intervals
        </h2>
        <p>
          A critical z-value is a threshold on the standard normal distribution associated with a specified tail probability, percentile, or confidence level.
        </p>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">95% Two-Sided Confidence Level Example</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            α = 0.05 &rarr; α/2 = 0.025 &rarr; Critical z* ≈ ±1.959964 (commonly rounded to ±1.96)
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            For μ = 100, σ = 15: Margin of Error = 1.959964 × 15 ≈ 29.3995.
          </p>
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
            Symmetric bounds: [100 − 29.3995, 100 + 29.3995] &rarr; [70.6005, 129.3995]
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="font-bold block text-slate-700 dark:text-slate-300">Two-Tail 95%:</span>
            <span className="font-mono text-blue-600">z* ≈ ±1.96</span> (divides 5% into 2.5% each tail)
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="font-bold block text-slate-700 dark:text-slate-300">One-Tail 95%:</span>
            <span className="font-mono text-blue-600">z ≈ +1.645 (upper) / −1.645 (lower)</span>
          </div>
        </div>
      </section>

      {/* REVERSING: FINDING RAW SCORE & PERCENTILES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Finding Raw Scores &amp; Inverse Percentiles
        </h2>
        <p>The z-score formula can be rearranged to solve for the original raw observation:</p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-base">
          x = μ + z·σ
        </div>
        <p className="text-sm">
          For μ = 100, σ = 15, and z = 1.96: x = 100 + (1.96)(15) ≈ <strong>129.4</strong>.
        </p>
      </section>

      {/* INTERVAL PROBABILITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Interval Probability: Area Between Two Raw Values
        </h2>
        <p>The calculator determines normal-distribution probability between two arbitrary boundaries:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="font-bold text-slate-500 block">Symmetric: X1=60, X2=80 (μ=70, σ=10)</span>
            <span>Z1 = −1.00, Z2 = +1.00</span>
            <span className="block font-bold text-blue-600">Area Between = 68.27% | Outside = 31.73%</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="font-bold text-slate-500 block">Non-Symmetric: X1=61, X2=81 (μ=73, σ=10)</span>
            <span>Z1 = −1.20, Z2 = +0.80</span>
            <span className="block font-bold text-blue-600">Area Between = 67.31% | Outside = 32.69%</span>
          </div>
        </div>

        {/* MID-CONTENT INTERNAL LINK #2 */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          If your interval calculation is part of a confidence-interval or estimation problem, use the{" "}
          <Link
            href="/calculators/confidence-interval-calculator"
            className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700"
          >
            Confidence Interval Calculator
          </Link>{" "}
          to continue from the probability/critical-value calculation to the corresponding interval estimate.
        </div>
      </section>

      {/* INTERACTIVE Z-TABLE */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-2">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Standard Normal Cumulative Probability Table (Z-Table)
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTableMode("positive")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                tableMode === "positive" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600"
              }`}
            >
              Positive (+Z)
            </button>
            <button
              type="button"
              onClick={() => setTableMode("negative")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                tableMode === "negative" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600"
              }`}
            >
              Negative (−Z)
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search Z value or probability (e.g. 1.96, 0.975)..."
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono font-medium"
          />
        </div>

        <div className="overflow-x-auto max-h-72 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="w-full text-left text-[11px] font-mono border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold sticky top-0">
              <tr>
                <th className="p-2 border-b border-slate-200 dark:border-slate-700">Z</th>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => (
                  <th key={c} className="p-2 border-b border-slate-200 dark:border-slate-700">
                    .0{c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredRows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50/50 dark:bg-slate-900/40"}>
                  <td className="p-2 font-bold text-blue-600">{row.rowHeader}</td>
                  {row.cols.map((col, cIdx) => (
                    <td key={cIdx} className="p-2 text-slate-600 dark:text-slate-400">
                      {col.probStr}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* BATCH DATASET & EXTREME Z-SCORES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Batch Dataset Standardization &amp; Extreme Z-Scores
        </h2>
        <p>
          For multiple observations, the Batch Dataset Analyzer automates row-level calculations. For dataset 65, 70, 72, 75, 80, 85, 90, 92, 95, 100 (N = 10, Mean = 82.4, Sample SD ≈ 11.79):
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs">
          Observation X = 65 &rarr; z = (65 − 82.4) / 11.7870 ≈ −1.48 (Percentile: 6.99%)
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          For extreme values (e.g. x = 854, μ = 70, σ = 10 &rarr; z = 78.4000), cumulative probability numerically saturates at 100.00% without generating NaN or Infinity.
        </p>
      </section>

      {/* COMMON PITFALLS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Common Z-Score Mistakes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Using the wrong mean or SD</h3>
            <p className="text-slate-600 dark:text-slate-400">Mean and SD must correspond to the same underlying population or sample reference distribution.</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Forgetting the negative sign</h3>
            <p className="text-slate-600 dark:text-slate-400">Values below the mean must produce a negative z-score.</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Confusing z-score with probability</h3>
            <p className="text-slate-600 dark:text-slate-400">A z-score is a distance in standard deviations; it is not itself a probability.</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Using 1.96 for every problem</h3>
            <p className="text-slate-600 dark:text-slate-400">Critical values depend on confidence level (e.g. 90%, 95%, 99%) and one-tail vs two-tail specifications.</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Assuming all data is normal</h3>
            <p className="text-slate-600 dark:text-slate-400">Standardization can be computed for any data, but normal-CDF percentile interpretations assume normality.</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Division by zero standard deviation</h3>
            <p className="text-slate-600 dark:text-slate-400">Z-score requires division by SD; standard deviation must be strictly greater than zero.</p>
          </div>
        </div>
      </section>

      {/* SINGLE COMPARISON TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Z-Score vs Percentile vs Critical Value
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3 border-b border-slate-200 dark:border-slate-800">Quantity</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-800">Meaning</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-800">Typical calculation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Z-Score</td>
                <td className="p-3">Standardized distance from the mean</td>
                <td className="p-3 font-mono">(x − μ) / σ</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Percentile</td>
                <td className="p-3">Cumulative position under a reference distribution</td>
                <td className="p-3 font-mono">Φ(z)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Critical Z-Value</td>
                <td className="p-3">Threshold associated with a specified tail probability or confidence level</td>
                <td className="p-3 font-mono">Φ⁻¹(p)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Raw Score</td>
                <td className="p-3">Original measurement in physical units</td>
                <td className="p-3 font-mono">μ + z·σ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* WORKFLOW & EXPORT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Practical Workflow, Saving &amp; PDF Export
        </h2>
        <p className="text-sm">
          A reliable workflow: (1) Identify raw value X, (2) Identify appropriate mean μ or x̄, (3) Identify SD σ or s, (4) Calculate z, (5) Evaluate required tail or central probability, (6) Interpret in analytical context.
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          The Master Action Toolbar supports saving immutable calculation records, copying summaries and LaTeX equations, downloading structured batch CSV files, and launching the 2-page executive print report.
        </p>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (UNFOLDED BY DEFAULT) */}
      <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Verified answers to common questions about z-scores, critical values, normal CDFs, and probability calculations.
          </p>
        </div>

        <div className="space-y-3">
          {z_score_calculatorFaqs.map((faq, idx) => {
            const isOpen = Boolean(openFaqs[idx]);
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* RELATED CALCULATORS CARDS (BOTTOM) */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Related Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Standard Deviation Calculator</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Calculate population and sample variance and standard deviation directly from raw data series.
              </p>
            </div>
            <Link
              href="/calculators/standard-deviation-calculator"
              className="inline-block mt-3 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-slate-200 transition-colors w-fit"
            >
              Open Standard Deviation &rarr;
            </Link>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Confidence Interval Calculator</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Construct two-sided and one-sided confidence intervals using critical z-values and margin of error.
              </p>
            </div>
            <Link
              href="/calculators/confidence-interval-calculator"
              className="inline-block mt-3 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-slate-200 transition-colors w-fit"
            >
              Open Confidence Interval &rarr;
            </Link>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Statistics Calculator</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Comprehensive descriptive statistics, quartile analysis, interquartile ranges, and summary metrics.
              </p>
            </div>
            <Link
              href="/calculators/statistics-calculator"
              className="inline-block mt-3 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-slate-200 transition-colors w-fit"
            >
              Open Statistics &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* STATISTICAL REFERENCES */}
      <section className="space-y-2 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-4">
        <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>Statistical Reference Notes &amp; Academic Sources</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-[11px]">
          <li>OpenStax Introductory Statistics (Section 6.1: The Standard Normal Distribution, Z-Scores &amp; Probabilities).</li>
          <li>Penn State Eberly College of Science, STAT 200 (Elementary Statistics: Standardization &amp; Empirical Rule).</li>
          <li>NIST/SEMATECH e-Handbook of Statistical Methods (Section 1.3.6.6.1: Cumulative Distribution Function of the Standard Normal Distribution).</li>
        </ul>
      </section>

      {/* STATISTICAL DISCLAIMER */}
      <section className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
          <span>Statistical Disclaimer</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          This calculator provides mathematical and probability calculations based on the values and statistical assumptions supplied by the user. A numerical z-score does not by itself establish that a dataset is normally distributed, that an observation is erroneous, or that a statistical result is significant. Percentiles and tail probabilities produced from the normal CDF assume that the normal-distribution model is appropriate for the interpretation being made. For academic, scientific, engineering, financial or other consequential analysis, verify the underlying data, population/sample assumptions, units, distributional assumptions and statistical method appropriate to the problem.
        </p>
      </section>
    </article>
  );
}

export default ZScoreContent;
