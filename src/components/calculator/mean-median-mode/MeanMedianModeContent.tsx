"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Sliders, Activity, BarChart2, BookOpen, ShieldAlert } from "lucide-react";
import { mean_median_mode_calculatorFaqs } from "@/app/calculators/mean-median-mode-calculator/faq";

export function MeanMedianModeContent() {
  // Unfolded FAQ Accordion State (open by default)
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>(() => {
    const initialState: Record<number, boolean> = {};
    mean_median_mode_calculatorFaqs.forEach((_, idx) => {
      initialState[idx] = true;
    });
    return initialState;
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/calculators/statistics-calculator"
            className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-xs group"
          >
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Statistics Calculator
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Broader descriptive statistics, quartiles &amp; distributions
              </p>
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">Explore &rarr;</span>
          </Link>

          <Link
            href="/calculators/standard-deviation-calculator"
            className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors shadow-xs group"
          >
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Standard Deviation Calculator
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dedicated variance, Bessel&apos;s correction &amp; dispersion
              </p>
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">Explore &rarr;</span>
          </Link>
        </div>
      </section>

      {/* SHORT INTRO */}
      <section className="space-y-4">
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Use this Mean, Median, Mode &amp; Range Calculator to summarize a dataset with the
          statistics that describe its center and spread. Enter raw numbers to calculate
          the arithmetic mean, median, mode, range, sum, count, variance and standard
          deviation, then use the additional tools for weighted, geometric, harmonic and
          trimmed means, grouped data, target-score calculations, dataset comparisons,
          and outlier and skewness analysis.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The calculator is designed to show the calculation rather than only the final
          number. Depending on the module, you can inspect frequency distributions,
          box-plot information, step-by-step derivations, comparison metrics, Tukey
          outlier fences and other supporting results.
        </p>
      </section>

      {/* WHAT ARE MEAN, MEDIAN, MODE AND RANGE? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          What Are Mean, Median, Mode and Range?
        </h2>
        <p>
          Mean, median, mode and range are four basic ways to summarize a dataset.
        </p>
        <p>
          The arithmetic mean, commonly called the average, is found by adding all
          observations and dividing by the number of observations:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-base">
          x̄ = Σx / n
        </div>
        <p>
          The median is the middle value after the observations have been arranged in
          ascending or descending order. With an odd number of observations, it is the
          single middle value. With an even number of observations, it is the average of
          the two middle values.
        </p>
        <p>
          The mode is the value that occurs most frequently. A dataset can have one mode,
          more than one mode, or no repeated value at all.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-base">
          Range = Maximum − Minimum
        </div>
        <p>
          These measures answer different questions. The mean uses every observation,
          the median identifies the central position of ordered data, the mode identifies
          the most frequent value, and the range gives the total distance between the
          smallest and largest observations.
        </p>
      </section>

      {/* HOW TO CALCULATE THE MEAN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          How to Calculate the Mean
        </h2>
        <p>
          To calculate the arithmetic mean, add every value and divide the total by the
          number of values.
        </p>
        <p>For example, consider:</p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm">
          10, 20, 30, 40, 50
        </div>
        <p>The sum is:</p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm">
          10 + 20 + 30 + 40 + 50 = 150
        </div>
        <p>There are:</p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm">
          n = 5 values
        </div>
        <p>Therefore:</p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-base">
          x̄ = 150 / 5 = 30
        </div>
        <p>
          The mean is <strong>30</strong>. The calculator performs the same operation automatically
          for the complete dataset you enter.
        </p>
        <p>
          For a sample, the arithmetic mean is usually written x̄. For a population, the
          corresponding notation is μ. The arithmetic formula for the average itself is
          the same; the distinction between sample and population becomes important when
          estimating population quantities and when calculating measures such as
          variance and standard deviation.
        </p>
      </section>

      {/* HOW TO FIND THE MEDIAN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          How to Find the Median
        </h2>
        <p>
          The median depends on the <strong>ORDER</strong> of the data. First arrange the observations
          from smallest to largest.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Odd Number of Values</h3>
            <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              Median = middle ordered value at position (n + 1) / 2
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Example: 3, 8, 12, 15, 21 &rarr; Middle value is <strong>12</strong>.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Even Number of Values</h3>
            <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              Median = average of the two middle ordered values
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Example: 3, 8, 12, 15 &rarr; (8 + 12) / 2 = <strong>10</strong>.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          The calculator sorts the data as needed for the median calculation without
          requiring you to manually reorder the values first.
        </p>
      </section>

      {/* HOW TO FIND THE MODE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          How to Find the Mode
        </h2>
        <p>
          The mode is the value that occurs most often in a dataset. For example:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm">
          2, 4, 4, 6, 7 &rarr; Mode = 4 (appears twice)
        </div>
        <p>
          A dataset does not have to have a unique mode. If two values share the highest
          frequency, the dataset is <strong>bimodal</strong>. If several values share the highest
          frequency, it is <strong>multimodal</strong>. For example:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm">
          1, 1, 2, 2, 3 &rarr; Bimodal (Modes: 1 and 2)
        </div>
        <p>
          A dataset in which every observation occurs only once has no repeated mode.
          The calculator therefore reports the actual frequency structure rather
          than assuming that every dataset has exactly one mode.
        </p>
      </section>

      {/* HOW TO CALCULATE RANGE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          How to Calculate Range
        </h2>
        <p>
          Range is the simplest measure of spread:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-base">
          Range = Maximum − Minimum
        </div>
        <p>Suppose the dataset is: 5, 8, 12, 20, 25. The maximum is 25 and the minimum is 5.</p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm">
          Range = 25 − 5 = 20
        </div>
        <p>
          The range is easy to calculate, but it uses only the two extreme observations.
          It does not describe how the rest of the observations are distributed between
          those extremes. That is why range is often interpreted alongside the mean, median,
          variance, standard deviation or other measures of spread.
        </p>
      </section>

      {/* MEAN VS MEDIAN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Mean vs Median — Which Should You Use?
        </h2>
        <p>
          There is no single measure of center that is best for every dataset.
        </p>
        <p>
          The mean incorporates every numerical observation. This makes it useful when
          the arithmetic average is meaningful, but it also makes the mean sensitive to
          extreme values and skewed distributions.
        </p>
        <p>
          The median is based on position after ordering the observations. Because it does
          not depend on the precise magnitude of the most extreme observations, it is
          often more resistant to outliers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Without Outlier</h3>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">10, 11, 12, 13, 14</p>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">Mean = 12, Median = 12</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">With Extreme Outlier</h3>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">10, 11, 12, 13, 100</p>
            <p className="text-xs font-bold text-amber-600">Mean = 29.2, Median = 12</p>
          </div>
        </div>
        <p>
          For a roughly symmetric distribution without influential outliers, the mean is
          often an informative center. For skewed data or data containing extreme
          observations, the median can provide a more robust description of a typical
          value.
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          When you need to examine variability more deeply, the{" "}
          <Link
            href="/calculators/standard-deviation-calculator"
            className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700"
          >
            Standard Deviation Calculator
          </Link>{" "}
          can be used for a dedicated standard-deviation calculation and sample/population comparison.
        </p>
      </section>

      {/* RESPONSIVE SVG FLOWCHART DIAGRAM: CHOOSING A MEASURE OF CENTER */}
      <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Choosing a Measure of Center
        </h3>
        <div className="w-full overflow-x-auto flex justify-center py-2">
          <svg
            viewBox="0 0 680 340"
            className="w-full max-w-2xl h-auto"
            role="img"
            aria-label="Flowchart for choosing between mean, median, and mode"
          >
            <title>Choosing a Measure of Center Flowchart</title>
            <desc>Diagram showing how data characteristics determine whether mean, median, or mode is the most suitable central tendency metric.</desc>

            {/* Top Node: Dataset */}
            <rect x="260" y="10" width="160" height="40" rx="10" fill="#2563eb" />
            <text x="340" y="35" fill="#ffffff" textAnchor="middle" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
              DATASET
            </text>

            {/* Connecting Lines to 3 Branches */}
            <line x1="340" y1="50" x2="340" y2="75" stroke="#94a3b8" strokeWidth="2" />
            <line x1="120" y1="75" x2="560" y2="75" stroke="#94a3b8" strokeWidth="2" />
            <line x1="120" y1="75" x2="120" y2="100" stroke="#94a3b8" strokeWidth="2" />
            <line x1="340" y1="75" x2="340" y2="100" stroke="#94a3b8" strokeWidth="2" />
            <line x1="560" y1="75" x2="560" y2="100" stroke="#94a3b8" strokeWidth="2" />

            {/* Branch 1: Mean */}
            <rect x="40" y="100" width="160" height="50" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="120" y="122" fill="#1e3a8a" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              Mean (x̄)
            </text>
            <text x="120" y="140" fill="#3b82f6" textAnchor="middle" fontSize="11" fontFamily="sans-serif">
              Arithmetic Average
            </text>

            {/* Branch 2: Median */}
            <rect x="260" y="100" width="160" height="50" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
            <text x="340" y="122" fill="#14532d" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              Median
            </text>
            <text x="340" y="140" fill="#16a34a" textAnchor="middle" fontSize="11" fontFamily="sans-serif">
              Positional Midpoint
            </text>

            {/* Branch 3: Mode */}
            <rect x="480" y="100" width="160" height="50" rx="8" fill="#faf5ff" stroke="#a855f7" strokeWidth="1.5" />
            <text x="560" y="122" fill="#581c87" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              Mode
            </text>
            <text x="560" y="140" fill="#9333ea" textAnchor="middle" fontSize="11" fontFamily="sans-serif">
              Highest Frequency
            </text>

            {/* Rejoining Lines to Distribution Shape Check */}
            <line x1="120" y1="150" x2="120" y2="185" stroke="#94a3b8" strokeWidth="2" />
            <line x1="340" y1="150" x2="340" y2="185" stroke="#94a3b8" strokeWidth="2" />
            <line x1="560" y1="150" x2="560" y2="185" stroke="#94a3b8" strokeWidth="2" />
            <line x1="120" y1="185" x2="560" y2="185" stroke="#94a3b8" strokeWidth="2" />
            <line x1="340" y1="185" x2="340" y2="210" stroke="#94a3b8" strokeWidth="2" />

            {/* Evaluation Node */}
            <rect x="230" y="210" width="220" height="36" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
            <text x="340" y="233" fill="#0f172a" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
              Evaluate Distribution Shape
            </text>

            {/* Decision Splits */}
            <line x1="340" y1="246" x2="340" y2="265" stroke="#94a3b8" strokeWidth="2" />
            <line x1="200" y1="265" x2="480" y2="265" stroke="#94a3b8" strokeWidth="2" />
            <line x1="200" y1="265" x2="200" y2="285" stroke="#94a3b8" strokeWidth="2" />
            <line x1="480" y1="265" x2="480" y2="285" stroke="#94a3b8" strokeWidth="2" />

            {/* Outcome 1: Symmetric */}
            <rect x="110" y="285" width="180" height="46" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
            <text x="200" y="304" fill="#1e3a8a" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
              Symmetric Distribution
            </text>
            <text x="200" y="322" fill="#2563eb" textAnchor="middle" fontSize="10" fontFamily="sans-serif">
              Arithmetic Mean is Most Informative
            </text>

            {/* Outcome 2: Skewed / Outliers */}
            <rect x="390" y="285" width="180" height="46" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
            <text x="480" y="304" fill="#991b1b" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
              Skewed / Extreme Outliers
            </text>
            <text x="480" y="322" fill="#dc2626" textAnchor="middle" fontSize="10" fontFamily="sans-serif">
              Median is Robust &amp; Resistant
            </text>
          </svg>
        </div>
        <p className="text-xs text-center text-slate-500 dark:text-slate-400 italic">
          Mean, median and mode describe different aspects of the same dataset, so the
          best choice depends on the distribution and analytical purpose.
        </p>
      </section>

      {/* A WORKED MEAN, MEDIAN, MODE AND RANGE EXAMPLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          A Worked Mean, Median, Mode and Range Example
        </h2>
        <p>Consider the dataset used in the calculator&apos;s standard example:</p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm">
          3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29
        </div>
        <div className="space-y-2 text-sm font-medium">
          <p><strong>Step 1: Count &amp; Sum</strong></p>
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
            N = 15 observations. Sum = 3 + 7 + 5 + ... + 29 = 330.
          </p>

          <p><strong>Step 2: Arithmetic Mean</strong></p>
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
            Mean = 330 / 15 = 22.
          </p>

          <p><strong>Step 3: Ordered Dataset for Median</strong></p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded border border-slate-200 dark:border-slate-800 font-mono text-xs">
            3, 5, 7, 12, 13, 14, 20, <strong>23</strong>, 23, 23, 23, 29, 39, 40, 56
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Because there are 15 observations, the eighth observation is the median: <strong>Median = 23</strong>.
          </p>

          <p><strong>Step 4: Frequency &amp; Mode</strong></p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The value 23 occurs four times, more frequently than any other value: <strong>Mode = 23</strong>.
          </p>

          <p><strong>Step 5: Range</strong></p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The minimum is 3 and the maximum is 56: Range = 56 − 3 = <strong>53</strong>.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Mean</span>
            <span className="text-lg font-bold font-mono text-blue-600">22</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Median</span>
            <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">23</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Mode</span>
            <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">23</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Range</span>
            <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">53</span>
          </div>
        </div>
      </section>

      {/* WHY AN OUTLIER CAN CHANGE THE MEAN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Why an Outlier Can Change the Mean
        </h2>
        <p>
          The arithmetic mean uses every observation, so an unusually large or small
          value can move the mean substantially. Consider:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm">
          10, 12, 14, 15, 15, 16, 18, 20, 22, 100
        </div>
        <p>
          The value 100 is much larger than the other observations. The median remains tied
          to the middle positions of the ordered dataset, while the mean is pulled upward
          by the extreme value.
        </p>
        <p>
          This is why comparing mean and median can help identify the effect of skewness
          or extreme observations. An outlier is not automatically an error; it may
          represent a legitimate observation. The appropriate response depends on the
          context and on why the observation is unusually large or small.
        </p>
      </section>

      {/* VARIANCE AND STANDARD DEVIATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Variance and Standard Deviation
        </h2>
        <p>
          Variance and standard deviation describe how dispersed observations are around their mean.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Population Metrics</h3>
            <p className="font-mono text-xs">σ² = Σ(xᵢ − μ)² / N</p>
            <p className="font-mono text-xs">σ = √σ²</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Sample Metrics (Bessel&apos;s Correction)</h3>
            <p className="font-mono text-xs">s² = Σ(xᵢ − x̄)² / (n − 1)</p>
            <p className="font-mono text-xs">s = √s²</p>
          </div>
        </div>
        <p>
          The distinction between N and n−1 matters. The calculator allows the applicable
          sample/population selection so the resulting variance and standard deviation can
          be interpreted using the chosen statistical convention.
        </p>
        <p>For example, for 1, 2, 3, 4, 5 (Mean = 3):</p>
        <ul className="list-disc pl-6 space-y-1 text-sm font-mono">
          <li>Population Variance: 2 | Population SD: √2 ≈ 1.4142</li>
          <li>Sample Variance: 2.5 | Sample SD: √2.5 ≈ 1.5811</li>
        </ul>
        <p className="text-xs text-slate-500">
          Changing sample/population mode should not change the mean, median, mode or
          range; it changes the corresponding dispersion calculation.
        </p>
      </section>

      {/* FREQUENCY DISTRIBUTION & READING CHART */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Frequency Distribution and the Mean
        </h2>
        <p>
          A frequency distribution shows how often each distinct value occurs. Instead of
          writing all observations separately, the same information can be represented
          using values and frequencies. The arithmetic mean can then be written as:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-base">
          x̄ = Σ(fx) / Σf
        </div>
        <p>
          The calculator&apos;s frequency chart plots each distinct data value against its frequency.
          A taller bar means that the corresponding value occurs more often. The calculator
          also marks Mean and Median on the distribution to help show why the arithmetic
          mean and median need not coincide.
        </p>
      </section>

      {/* ADVANCED MEANS: WEIGHTED, GEOMETRIC, HARMONIC, TRIMMED */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Advanced Means: Weighted, Geometric, Harmonic &amp; Trimmed
        </h2>

        {/* Weighted */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">What Is a Weighted Mean?</h3>
          <p className="text-sm">
            A weighted mean gives some observations more influence than others:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-center font-bold text-blue-600 text-sm">
            x̄w = Σ(wᵢxᵢ) / Σwᵢ
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For values 10, 15, 18, 20, 22, 25, 150 with weights 1, 2, 3, 4, 5, 6, 7:
            Total weight = 28, Weighted sum = 1484 &rarr; <strong>Weighted Mean = 53</strong>.
          </p>
        </div>

        {/* Geometric */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">What Is a Geometric Mean?</h3>
          <p className="text-sm">
            The geometric mean combines positive values multiplicatively rather than additively:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-center font-bold text-blue-600 text-sm">
            GM = (x₁ · x₂ · ... · xₙ)^(1/n)
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For 2 and 8: GM = √(2 × 8) = √16 = <strong>4</strong>. Especially useful when
            quantities combine by multiplication or when proportional growth factors are summarized.
          </p>
        </div>

        {/* Harmonic */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">What Is a Harmonic Mean?</h3>
          <p className="text-sm">
            The harmonic mean is based on reciprocals:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-center font-bold text-blue-600 text-sm">
            HM = n / Σ(1/xᵢ)
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For 2 and 4: HM = 2 / (1/2 + 1/4) = 2 / 0.75 ≈ <strong>2.6667</strong>.
            Useful in situations where rates or ratios are being combined.
          </p>
        </div>

        {/* Trimmed */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">What Is a Trimmed Mean?</h3>
          <p className="text-sm">
            A trimmed mean reduces the influence of extreme observations by removing a specified
            proportion of the smallest and largest values before calculating the mean.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For 10, 15, 18, 20, 22, 25, 150 with a 15% trim: extreme tail values 10 and 150
            are removed, leaving 15, 18, 20, 22, 25 &rarr; <strong>Trimmed Mean = 20</strong>.
          </p>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          If the dataset&apos;s main question is variability rather than central tendency, the{" "}
          <Link
            href="/calculators/standard-deviation-calculator"
            className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700"
          >
            Standard Deviation Calculator
          </Link>{" "}
          provides a focused workflow for standard deviation and variance.
        </p>
      </section>

      {/* GROUPED DATA MEAN & MODAL CLASS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Grouped Data Mean &amp; Modal Class
        </h2>
        <p>
          When individual observations are unavailable but class midpoints and frequencies
          are known, the grouped mean can be estimated using:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-base">
          x̄grouped = Σ(fᵢxᵢ) / Σfᵢ
        </div>
        <p>
          For midpoints 15, 25, 35, 45, 55 with frequencies 4, 8, 15, 7, 2:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm font-mono">
          <li>Total Frequency: 4 + 8 + 15 + 7 + 2 = 36</li>
          <li>Weighted Sum: 15(4) + 25(8) + 35(15) + 45(7) + 55(2) = 1210</li>
          <li>Grouped Mean: 1210 / 36 ≈ <strong>33.6111</strong></li>
          <li>Modal Class: <strong>35</strong> (highest frequency = 15)</li>
        </ul>
        <p className="text-xs text-slate-500">
          An important limitation is that grouped data does not preserve every original
          observation. The resulting grouped mean is therefore an estimate based on the
          available grouped representation rather than necessarily the exact mean of the
          underlying raw observations.
        </p>
      </section>

      {/* TARGET MEAN SOLVER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Target Mean Solver — What Score Do I Need?
        </h2>
        <p>
          The Target Mean Solver answers a practical question: &quot;What score do I need on the
          remaining test to reach my target average?&quot;
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-blue-600 dark:text-blue-400 text-base">
          Required Score = Target Average × Total Tests − Current Sum
        </div>
        <p>
          Example: Current scores 85, 90, 88, 92 (Sum = 355), Desired average = 90, Total tests = 5.
          Target total = 90 × 5 = 450. Required score = 450 − 355 = <strong>95%</strong> (Achievable).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs font-bold text-emerald-600 block">0% to 100%</span>
            <span className="text-xs text-slate-600 dark:text-slate-400">Achievable on standard exam scale.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs font-bold text-amber-600 block">&gt; 100%</span>
            <span className="text-xs text-slate-600 dark:text-slate-400">Unattainable on standard 0-100% scale.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs font-bold text-blue-600 block">&lt; 0%</span>
            <span className="text-xs text-slate-600 dark:text-slate-400">Target Already Exceeded (Can score 0%).</span>
          </div>
        </div>
      </section>

      {/* COMPARING TWO DATASETS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Comparing Two Datasets
        </h2>
        <p>
          Sometimes the useful question is not &quot;What is the center of this dataset?&quot; but
          &quot;How do these two datasets differ?&quot;
        </p>
        <p>
          The calculator&apos;s two-dataset comparison places Dataset A and Dataset B side by side
          and reports Count, Mean, Median, Range, and Standard Deviation, alongside Delta (B − A).
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs">
          Dataset A: 12, 15, 18, 22, 25, 28 (Mean = 20, Med = 20, Range = 16, s ≈ 6.0992) <br />
          Dataset B: 10, 14, 19, 24, 30, 35 (Mean = 22, Med = 21.5, Range = 25, s ≈ 9.5289) <br />
          Delta (B − A): ΔMean = +2.00, ΔMedian = +1.50, ΔRange = +9.00, Δs ≈ +3.4297
        </div>
      </section>

      {/* SKEWNESS & OUTLIERS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Skewness, IQR &amp; Outlier Detection
        </h2>
        <p>
          Skewness describes asymmetry in a distribution. A right-skewed distribution has
          a longer upper tail, pulling the mean higher than the median.
        </p>
        <p>
          The Outlier Detection module uses the <strong>Tukey 1.5×IQR rule</strong>:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <span className="font-bold text-slate-500 block">Lower Fence</span>
            <span className="text-sm font-bold text-blue-600">Q1 − 1.5 × IQR</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <span className="font-bold text-slate-500 block">Upper Fence</span>
            <span className="text-sm font-bold text-blue-600">Q3 + 1.5 × IQR</span>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          For dataset 10, 12, 14, 15, 15, 16, 18, 20, 22, 100: Tukey fences are [6.375, 27.375].
          The observation <strong>100</strong> lies above the upper fence and is identified as an outlier,
          with Pearson skewness ≈ 2.5802 (Right-Skewed).
        </p>
      </section>

      {/* COMPARISON TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Mean vs Median vs Mode vs Range
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3 border-b border-slate-200 dark:border-slate-800">Measure</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-800">What it describes</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-800">Main calculation</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-800">Outlier sensitivity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Mean</td>
                <td className="p-3">Arithmetic center</td>
                <td className="p-3 font-mono">Σx / n</td>
                <td className="p-3 text-red-600 font-semibold">High</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Median</td>
                <td className="p-3">Positional center</td>
                <td className="p-3 font-mono">Middle ordered value(s)</td>
                <td className="p-3 text-emerald-600 font-semibold">Lower</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Mode</td>
                <td className="p-3">Most frequent value</td>
                <td className="p-3 font-mono">Highest frequency</td>
                <td className="p-3">Context-dependent</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Range</td>
                <td className="p-3">Total span</td>
                <td className="p-3 font-mono">Max − Min</td>
                <td className="p-3 text-red-600 font-semibold">High</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          For calculations centered on standard deviation, variance and dispersion rather
          than the complete central-tendency suite, see the{" "}
          <Link
            href="/calculators/standard-deviation-calculator"
            className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700"
          >
            Standard Deviation Calculator
          </Link>.
        </p>
      </section>

      {/* COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Common Mistakes When Calculating Mean, Median, Mode and Range
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Forgetting to count every observation</h3>
            <p className="text-slate-600 dark:text-slate-400">A single omitted observation changes the sum, count and mean.</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Finding the median without sorting</h3>
            <p className="text-slate-600 dark:text-slate-400">The median is positional, so the observations must be considered in order.</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Assuming every dataset has one mode</h3>
            <p className="text-slate-600 dark:text-slate-400">Some datasets are bimodal, multimodal or have no repeated mode.</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Confusing range with standard deviation</h3>
            <p className="text-slate-600 dark:text-slate-400">Range is max minus min. Standard deviation summarizes squared deviations from mean.</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Ignoring influential outliers</h3>
            <p className="text-slate-600 dark:text-slate-400">An extreme value may significantly pull the mean away from the true center.</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Misreading negative target-score results</h3>
            <p className="text-slate-600 dark:text-slate-400">A negative required score means the target is already exceeded; it does not require a negative grade.</p>
          </div>
        </div>
      </section>

      {/* HOW TO USE, EXPORT, SAVE AND REUSE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          Export, Save and Reuse Your Results
        </h2>
        <p className="text-sm">
          When calculations need to be retained, the calculator provides unified toolbar actions:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-xs text-slate-600 dark:text-slate-400">
          <li><strong>Save:</strong> Stores an immutable snapshot of calculation results in browser memory.</li>
          <li><strong>Copy Summary &amp; Copy LaTeX:</strong> Copies full analytical summaries or LaTeX equations to clipboard.</li>
          <li><strong>Export CSV:</strong> Downloads multi-module structured spreadsheet data.</li>
          <li><strong>Print / Save PDF:</strong> Launches a compact 2-page executive summary report with zero blank whitespace.</li>
          <li><strong>Share:</strong> Generates a permalink preserving active dataset parameters in the URL.</li>
        </ul>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (UNFOLDED BY DEFAULT) */}
      <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Verified answers to common questions about mean, median, mode, range and advanced statistics.
          </p>
        </div>

        <div className="space-y-3">
          {mean_median_mode_calculatorFaqs.map((faq, idx) => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Statistics Calculator</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Use a broader statistics workflow when your analysis extends beyond measures of center and requires additional descriptive statistics.
              </p>
            </div>
            <Link
              href="/calculators/statistics-calculator"
              className="inline-block mt-3 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-slate-200 transition-colors w-fit"
            >
              Open Statistics Calculator &rarr;
            </Link>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Standard Deviation Calculator</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Calculate variance and standard deviation in a dedicated statistical workflow.
              </p>
            </div>
            <Link
              href="/calculators/standard-deviation-calculator"
              className="inline-block mt-3 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-slate-200 transition-colors w-fit"
            >
              Open Standard Deviation Calculator &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* STATISTICAL REFERENCES */}
      <section className="space-y-2 text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-4">
        <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>Statistical References &amp; Academic Sources</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-[11px]">
          <li>OpenStax Introductory Statistics (Chapter 2: Descriptive Statistics, Measures of Central Tendency &amp; Spread).</li>
          <li>Penn State Eberly College of Science, STAT 200 (Measures of Center: Mean, Median, Mode &amp; Skewness).</li>
          <li>NIST/SEMATECH e-Handbook of Statistical Methods (Section 1.3.5: Quantitative Measures of Location and Dispersion).</li>
        </ul>
      </section>

      {/* STATISTICAL DISCLAIMER */}
      <section className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
          <span>Statistical Disclaimer</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          This calculator provides descriptive statistical calculations based on the
          data and options entered by the user. The numerical result should be interpreted
          in the context of the dataset, measurement process, sampling method and
          statistical convention being used. Grouped-data results may be estimates because
          the individual observations are not available. Outlier flags identify observations
          under the selected statistical rule; they do not by themselves establish that an
          observation is incorrect. Descriptive differences between datasets do not by themselves
          prove statistical significance or causation. For academic, scientific, engineering
          or professional analysis, verify the assumptions and statistical method appropriate
          to the specific problem.
        </p>
      </section>
    </article>
  );
}

export default MeanMedianModeContent;
