"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
  BarChart2,
  Table,
  Layers,
  ArrowRight
} from "lucide-react";
import { standard_deviation_calculatorFaqs } from "@/app/calculators/standard-deviation-calculator/faq";

export function StdDevContent() {
  // All 30 FAQs unfolded (open by default)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 30 }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      
      {/* ========================================================================= */}
      {/* 1. HERO / INTRODUCTION */}
      {/* ========================================================================= */}
      <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        <div className="space-y-3">
          <p>
            Standard deviation measures how much numerical values vary around their mean. It is one of the most widely used measures of dispersion in statistics, research, finance, quality control and data analysis.
          </p>
          <p>
            This Standard Deviation Calculator lets you enter a dataset and calculate either sample or population standard deviation, variance, standard error and coefficient of variation. It also provides a step-by-step variance table, interactive visualizations, a box plot for distribution and outlier analysis, and additional tools for comparing two datasets and calculating a confidence interval.
          </p>
          <p>
            The important distinction is whether your numbers represent an entire population or a sample drawn from a larger population. A sample standard deviation uses n − 1 in the denominator, while population standard deviation uses N. The calculator keeps those two methods separate so you can see exactly how the choice affects the result.
          </p>
        </div>

        {/* VISUAL DIAGRAM */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            How Standard Deviation Is Calculated
          </h3>
          <div className="w-full flex justify-center py-2 overflow-x-auto">
            <svg viewBox="0 0 680 100" className="w-full max-w-2xl h-auto" role="img" aria-label="Step by step standard deviation calculation workflow diagram">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb" />
                </marker>
              </defs>

              {/* Node 1 */}
              <rect x="5" y="30" width="75" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
              <text x="42" y="55" textAnchor="middle" className="text-[10px] font-bold fill-slate-800">Raw Data</text>
              <line x1="80" y1="50" x2="95" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* Node 2 */}
              <rect x="100" y="30" width="75" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
              <text x="137" y="50" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Arithmetic</text>
              <text x="137" y="62" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Mean (x̄)</text>
              <line x1="175" y1="50" x2="190" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* Node 3 */}
              <rect x="195" y="30" width="80" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
              <text x="235" y="50" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Deviation</text>
              <text x="235" y="62" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">(xᵢ − x̄)</text>
              <line x1="275" y1="50" x2="290" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* Node 4 */}
              <rect x="295" y="30" width="80" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
              <text x="335" y="50" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Square Each</text>
              <text x="335" y="62" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">(xᵢ − x̄)²</text>
              <line x1="375" y1="50" x2="390" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* Node 5 */}
              <rect x="395" y="30" width="80" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
              <text x="435" y="50" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Sum Squares</text>
              <text x="435" y="62" textAnchor="middle" className="text-[8px] font-bold fill-blue-600">(SS)</text>
              <line x1="475" y1="50" x2="490" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* Node 6 */}
              <rect x="495" y="30" width="80" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
              <text x="535" y="50" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Divide By</text>
              <text x="535" y="62" textAnchor="middle" className="text-[8px] font-bold fill-slate-800">n−1 or N</text>
              <line x1="575" y1="50" x2="590" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* Node 7 */}
              <rect x="595" y="30" width="80" height="40" rx="6" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
              <text x="635" y="50" textAnchor="middle" className="text-[9px] font-bold fill-white">Square Root</text>
              <text x="635" y="62" textAnchor="middle" className="text-[8px] font-bold fill-blue-100">(SD: s or σ)</text>
            </svg>
          </div>
          <p className="text-xs text-slate-500 italic text-center">
            Sample and population standard deviation use the same basic sequence but different denominators.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Standard Deviation?
          </h2>
          <p>
            Standard deviation is a measure of the spread of a dataset around its mean.
          </p>
          <p>
            A small standard deviation means the observations tend to stay relatively close to the mean. A larger standard deviation means the observations are more widely spread.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500 block uppercase">For a Population:</span>
              <p className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100 pt-1">σ = √[Σ(xᵢ − μ)² / N]</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500 block uppercase">For a Sample:</span>
              <p className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100 pt-1">s = √[Σ(xᵢ − x̄)² / (n − 1)]</p>
            </div>
          </div>
          <p>
            The resulting standard deviation is expressed in the same units as the original data, unlike variance, which is expressed in squared units.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use the Standard Deviation Calculator
          </h2>
          <p>
            Enter your numerical observations in the input box. Values can be separated by commas, spaces or line breaks.
          </p>
          <p>
            Then choose:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-semibold text-slate-700 dark:text-slate-300">
            <li>Sample SD (n − 1)</li>
            <li>Population SD (σ, N)</li>
          </ul>
          <p>
            The calculator immediately derives the mean, variance, standard deviation and other available statistics from the same dataset.
          </p>
          <p>
            You can then inspect the variance table to see each observation&apos;s deviation from the mean and its squared deviation.
          </p>
          <p>
            Use the visual tabs to inspect the Bell Curve or Box Plot, and use the additional analytical sections when you need a two-dataset comparison or a confidence interval.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Sample Standard Deviation vs Population Standard Deviation
          </h2>
          <p>
            The choice between sample and population standard deviation is not just a different display setting. It changes the denominator used to estimate variance.
          </p>
          <p>
            Population standard deviation assumes the dataset contains the entire population of interest:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            σ² = Σ(xᵢ − μ)² / N
          </div>
          <p>
            Sample standard deviation is used when the observed values are treated as a sample from a larger population:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            s² = Σ(xᵢ − x̄)² / (n − 1)
          </div>
          <p>
            The n − 1 denominator is commonly called Bessel&apos;s correction. It compensates for the fact that the sample mean is estimated from the same observations being used to measure variability.
          </p>
          <p>
            That distinction is why a sample standard deviation is normally slightly larger than the population standard deviation for the same non-degenerate dataset.
          </p>

          {/* TABLE 1 */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Table 1: Sample vs Population Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700">
                <thead>
                  <tr className="bg-blue-600 text-white font-bold">
                    <th className="p-2.5">Feature</th>
                    <th className="p-2.5">Sample</th>
                    <th className="p-2.5">Population</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <td className="p-2.5 font-bold">Notation</td>
                    <td className="p-2.5 font-mono">s</td>
                    <td className="p-2.5 font-mono">σ</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Denominator</td>
                    <td className="p-2.5 font-mono">n − 1 (Bessel&apos;s correction)</td>
                    <td className="p-2.5 font-mono">N (Census count)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Use</td>
                    <td className="p-2.5">Sample drawn from a larger population</td>
                    <td className="p-2.5">Entire population of interest</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Units</td>
                    <td className="p-2.5">Original measurement units</td>
                    <td className="p-2.5">Original measurement units</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* MID-CONTENT INTERNAL LINK #1 */}
          <div className="p-4 bg-blue-50/70 dark:bg-slate-800/70 rounded-xl border border-blue-200 dark:border-slate-700 text-xs mt-3">
            <p className="text-slate-700 dark:text-slate-300">
              If you need a broader set of descriptive statistics in addition to standard deviation and variance, use the{" "}
              <Link href="/calculators/statistics-calculator" className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-800">
                Statistics Calculator
              </Link>.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why the Mean Comes First
          </h2>
          <p>
            Standard deviation is calculated from deviations around the arithmetic mean, so the mean is the starting point for the calculation.
          </p>
          <p>
            For n observations:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            x̄ = (x₁ + x₂ + ... + xₙ) / n
          </div>
          <p>
            The mean represents the arithmetic center of the dataset.
          </p>
          <p>
            Every observation is then compared with that center. Observations farther from the mean contribute more strongly to the variance because their deviations are squared.
          </p>
          <p>
            For example, a deviation of 2 contributes 4 to the sum of squared deviations, while a deviation of 10 contributes 100.
          </p>
          <p>
            This is why a few extreme values can have a substantial effect on standard deviation.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Is Standard Deviation Calculated Step by Step?
          </h2>
          <p>
            The calculation follows a repeatable sequence.
          </p>
          <ol className="space-y-2 text-xs sm:text-sm pl-5 list-decimal">
            <li>
              <strong>Calculate the mean:</strong> Add all observations and divide by the number of observations.
            </li>
            <li>
              <strong>Calculate each deviation:</strong> Subtract the mean from every observation: <span className="font-mono">xᵢ − x̄</span>.
            </li>
            <li>
              <strong>Square each deviation:</strong> <span className="font-mono">(xᵢ − x̄)²</span>. Squaring removes negative signs and gives larger deviations greater weight.
            </li>
            <li>
              <strong>Add the squared deviations:</strong> This total is commonly called the sum of squared deviations, or SS.
            </li>
            <li>
              <strong>Divide by the appropriate denominator:</strong> For a sample, <span className="font-mono">SS / (n − 1)</span>; for a population, <span className="font-mono">SS / N</span>.
            </li>
            <li>
              <strong>Take the square root:</strong> The square root of variance gives standard deviation.
            </li>
          </ol>
          <p>
            The calculator exposes this process in its step-by-step variance table so you can audit how the final number was produced.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Standard Deviation Example
          </h2>
          <p>
            Consider the dataset:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            10, 12, 16, 22, 25
          </div>
          <p>
            There are 5 observations.
          </p>
          <p>
            <strong>Mean:</strong> (10 + 12 + 16 + 22 + 25) / 5 = 17
          </p>
          <p>
            The deviations from the mean are: −7, −5, −1, +5, +8
          </p>
          <p>
            Squaring them gives: 49, 25, 1, 25, 64
          </p>
          <p>
            <strong>Sum of squared deviations:</strong> 49 + 25 + 1 + 25 + 64 = 164
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border">
              <span className="font-bold text-xs uppercase text-slate-500 block">Sample Calculation:</span>
              <p className="font-mono text-xs pt-1">Sample variance: 164 / (5 − 1) = 41</p>
              <p className="font-mono text-xs font-bold text-blue-600">Sample SD: √41 ≈ 6.4031</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border">
              <span className="font-bold text-xs uppercase text-slate-500 block">Population Calculation:</span>
              <p className="font-mono text-xs pt-1">Population variance: 164 / 5 = 32.8</p>
              <p className="font-mono text-xs font-bold text-blue-600">Population SD: √32.8 ≈ 5.7271</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">
            The PDF&apos;s worked example uses this same five-value dataset, making it a useful regression example for the live calculator.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Variance?
          </h2>
          <p>
            Variance is the average squared distance from the mean, using the appropriate sample or population denominator.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono text-xs font-bold">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border">
              Sample variance: s² = Σ(xᵢ − x̄)² / (n − 1)
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border">
              Population variance: σ² = Σ(xᵢ − μ)² / N
            </div>
          </div>
          <p>
            Variance is useful because it is the quantity directly produced after summing squared deviations. However, because the deviations were squared, variance is expressed in squared units.
          </p>
          <p>
            If the original data is measured in meters, standard deviation is measured in meters while variance is measured in square meters.
          </p>
          <p>
            Taking the square root of variance returns the measure to the original units.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Standard Error?
          </h2>
          <p>
            Standard deviation describes variability among observations. Standard error describes the variability of a sample statistic, such as the sample mean, across repeated samples.
          </p>
          <p>
            For a sample mean, the commonly used standard error is:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            SE = s / √n
          </div>
          <p>
            where <span className="font-mono">s</span> is sample standard deviation and <span className="font-mono">n</span> is sample size.
          </p>
          <p>
            As sample size increases, the standard error generally decreases because the mean becomes more stable across repeated samples.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border space-y-1 text-xs">
            <p><strong>Standard deviation:</strong> How spread out are the observations?</p>
            <p><strong>Standard error:</strong> How variable is the estimated sample mean?</p>
          </div>
          <p>
            Do not use standard error as a synonym for standard deviation.
          </p>

          {/* TABLE 2 */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Table 2: Core Statistics Overview
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700">
                <thead>
                  <tr className="bg-blue-600 text-white font-bold">
                    <th className="p-2.5">Statistic</th>
                    <th className="p-2.5">What It Describes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <td className="p-2.5 font-bold">Mean</td>
                    <td className="p-2.5">Arithmetic center of the observations</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Variance</td>
                    <td className="p-2.5">Average squared spread from the mean</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Standard Deviation</td>
                    <td className="p-2.5">Average dispersion in original measurement units</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Standard Error</td>
                    <td className="p-2.5">Sampling variability/uncertainty of an estimated statistic</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Coefficient of Variation (CV)</td>
                    <td className="p-2.5">Relative variability expressed as a percentage of the mean</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 9 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is the Coefficient of Variation?
          </h2>
          <p>
            The coefficient of variation, or CV, expresses variability relative to the magnitude of the mean.
          </p>
          <p>
            A common sample form is:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            CV = (s / |x̄|) × 100%
          </div>
          <p>
            This produces a percentage rather than a value in the original measurement units.
          </p>
          <p>
            CV can be useful when comparing relative variability across datasets measured on the same ratio scale but with substantially different means.
          </p>
          <p>
            CV becomes undefined when the mean is zero, because division by zero is not meaningful. This calculator therefore displays N/A rather than producing an infinite or misleading percentage.
          </p>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-900 dark:text-amber-200">
            <strong>Important:</strong> Coefficient of variation is not appropriate for every type of variable, especially measurements where zero does not represent a meaningful absence.
          </div>

          {/* MID-CONTENT INTERNAL LINK #2 */}
          <div className="p-4 bg-blue-50/70 dark:bg-slate-800/70 rounded-xl border border-blue-200 dark:border-slate-700 text-xs mt-3">
            <p className="text-slate-700 dark:text-slate-300">
              For a broader view of location statistics such as mean, median and mode, use the{" "}
              <Link href="/calculators/mean-median-mode-calculator" className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-800">
                Mean, Median, Mode &amp; Range Calculator
              </Link>.
            </p>
          </div>
        </section>

        {/* Section 10 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Does the Bell Curve Show?
          </h2>
          <p>
            The Bell Curve visualization provides a visual reference for standard-deviation distance around the mean.
          </p>
          <p>
            For a normal distribution, observations are approximately distributed around the center in a characteristic symmetric shape.
          </p>
          <p>
            The visualization can show the mean and standard-deviation boundaries so you can see how far observations lie from the center.
          </p>
          <p>
            The important limitation is that the familiar 68–95–99.7 rule applies to data that are approximately normally distributed.
          </p>
          <p>
            It does not mean that every dataset automatically has:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300">
            <li>68% within ±1 SD</li>
            <li>95% within ±2 SD</li>
            <li>99.7% within ±3 SD</li>
          </ul>
          <p>
            For arbitrary distributions, those percentages are not guaranteed by the standard deviation alone.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is the 68–95–99.7 Rule?
          </h2>
          <p>
            For an approximately normal distribution:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>About 68% of observations fall within one standard deviation of the mean.</li>
            <li>About 95% fall within two standard deviations.</li>
            <li>About 99.7% fall within three standard deviations.</li>
          </ul>
          <p>
            This is known as the empirical rule.
          </p>
          <p>
            It is a property of the normal distribution, not a universal rule for every dataset.
          </p>
          <p>
            For strongly skewed, heavy-tailed or otherwise non-normal data, relying on the empirical rule can be misleading.
          </p>
          <p>
            The calculator&apos;s Bell Curve visualization is therefore best treated as a normal-distribution reference rather than proof that your dataset itself is normally distributed.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What If the Data Is Not Normally Distributed?
          </h2>
          <p>
            When the distribution is not approximately normal, Chebyshev&apos;s inequality provides a distribution-free lower bound.
          </p>
          <p>
            For k &gt; 1 standard deviations from the mean, at least:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            1 − 1/k²
          </div>
          <p>
            of observations must lie within k standard deviations of the mean.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono">
              For k = 2: At least 75% [1 − 1/4]
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono">
              For k = 3: At least 88.89% [1 − 1/9]
            </div>
          </div>
          <p>
            These are guarantees under the inequality and are much weaker than the 68–95–99.7 rule for a normal distribution.
          </p>
          <p>
            That distinction is important when interpreting standard-deviation bands for real-world data.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Does the Box Plot Help?
          </h2>
          <p>
            A box plot summarizes the center and spread of a dataset using the median, quartiles and range-related information.
          </p>
          <p>
            The key components are:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm font-medium">
            <li><strong>Q1:</strong> lower quartile (25th percentile)</li>
            <li><strong>Median:</strong> middle value (50th percentile)</li>
            <li><strong>Q3:</strong> upper quartile (75th percentile)</li>
            <li><strong>IQR:</strong> Q3 − Q1 (Interquartile Range)</li>
          </ul>
          <p>
            The box spans Q1 to Q3, while the median appears inside the box.
          </p>
          <p>
            A commonly used outlier rule marks observations outside:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
            Q1 − 1.5 × IQR &nbsp;or&nbsp; Q3 + 1.5 × IQR
          </div>
          <p>
            as potential outliers.
          </p>
          <p>
            The box plot is useful because it emphasizes the middle of the distribution while also making extreme observations easier to spot.
          </p>
          <p>
            A box plot and standard deviation therefore complement each other rather than being interchangeable summaries.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Do Outliers Affect Standard Deviation?
          </h2>
          <p>
            Standard deviation is sensitive to extreme observations because the calculation squares each deviation from the mean.
          </p>
          <p>
            Suppose most values are close together but one observation is extremely large. That observation can contribute a disproportionately large amount to the sum of squared deviations.
          </p>
          <p>
            As a result:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>mean can shift</li>
            <li>variance can increase</li>
            <li>standard deviation can increase</li>
          </ul>
          <p>
            This is why visual tools such as the Box Plot are useful alongside numerical standard deviation.
          </p>
          <p>
            An outlier is not automatically an error.
          </p>
          <p>
            It may represent a legitimate observation, a rare event, a different population or a data-entry problem.
          </p>
          <p>
            Always investigate the observation before removing it.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Is Standard Deviation Related to a Z-Score?
          </h2>
          <p>
            A z-score expresses how far an observation is from the mean in standard deviation units.
          </p>
          <p>
            For a population-style formulation:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            z = (x − μ) / σ
          </div>
          <p>
            For a sample-based context, the appropriate estimated standard deviation may be used depending on the analysis.
          </p>
          <p>
            For example, <span className="font-mono">z = 2</span> means the observation is two standard deviations above the reference mean.
          </p>
          <p>
            A z-score therefore uses standard deviation as a scale for comparing distances from the center.
          </p>

          {/* MID-CONTENT INTERNAL LINK #3 */}
          <div className="p-4 bg-blue-50/70 dark:bg-slate-800/70 rounded-xl border border-blue-200 dark:border-slate-700 text-xs mt-3">
            <p className="text-slate-700 dark:text-slate-300">
              When you need to convert observations into standardized z-scores or work with the normal distribution, use the{" "}
              <Link href="/calculators/z-score-calculator" className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-800">
                Z-Score Calculator &amp; Normal Distribution Suite
              </Link>.
            </p>
          </div>
        </section>

        {/* Section 16 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Can You Compare the Variability of Two Datasets?
          </h2>
          <p>
            Yes.
          </p>
          <p>
            The calculator includes a two-dataset comparison mode.
          </p>
          <p>
            You can enter Dataset A and Dataset B and compare their:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>means</li>
            <li>sample standard deviations</li>
            <li>variance ratio</li>
            <li>pooled standard deviation</li>
          </ul>
          <p>
            The comparison is useful when two groups need to be examined side by side before further statistical analysis.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border text-xs font-mono space-y-1">
            <p><strong>Dataset A:</strong> 10, 12, 15, 18, 20 &rarr; Mean = 15, Sample var = 17, Sample SD ≈ 4.1231</p>
            <p><strong>Dataset B:</strong> 14, 16, 19, 22, 25 &rarr; Mean = 19.2, Sample var = 19.7, Sample SD ≈ 4.4385</p>
            <p><strong>Variance ratio:</strong> F = 17 / 19.7 ≈ 0.8629</p>
            <p><strong>Pooled standard deviation:</strong> ≈ 4.2837</p>
          </div>
          <p>
            These are descriptive comparison quantities. An F ratio by itself is not a complete hypothesis test.
          </p>

          {/* TABLE 3 */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Table 3: Dual Dataset Metrics
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700">
                <thead>
                  <tr className="bg-blue-600 text-white font-bold">
                    <th className="p-2.5">Metric</th>
                    <th className="p-2.5">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <td className="p-2.5 font-bold">Mean A / B</td>
                    <td className="p-2.5">Arithmetic center of each respective dataset</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">SD A / B</td>
                    <td className="p-2.5">Within-dataset spread of each group</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">F ratio</td>
                    <td className="p-2.5">Ratio of sample variances (s₁² / s₂²)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Pooled SD</td>
                    <td className="p-2.5">Weighted common SD estimate under the equal-variance model</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 17 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is the Variance Ratio?
          </h2>
          <p>
            The calculator defines its displayed variance ratio as:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            F = s₁² / s₂²
          </div>
          <p>
            where s₁² and s₂² are the selected sample variances.
          </p>
          <p>
            The ratio compares the magnitude of variability in Dataset A with Dataset B.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>An F ratio near 1 indicates that the two sample variances are similar in magnitude.</li>
            <li>A ratio below 1 means the numerator variance is smaller than the denominator variance.</li>
            <li>A ratio above 1 means the numerator variance is larger.</li>
          </ul>
          <p>
            The interpretation of an F statistic as a formal statistical test requires additional assumptions and an appropriate reference distribution. A displayed variance ratio should not automatically be interpreted as proof that two population variances differ.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Pooled Standard Deviation?
          </h2>
          <p>
            Pooled standard deviation combines information from two samples to estimate a common within-group standard deviation when the equal-variance model is appropriate.
          </p>
          <p>
            For two independent samples:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            sₚ = √[ ((n₁ − 1)s₁² + (n₂ − 1)s₂²) / (n₁ + n₂ − 2) ]
          </div>
          <p>
            The weighting depends on each sample&apos;s degrees of freedom rather than simply averaging the two standard deviations.
          </p>
          <p>
            Pooled standard deviation is therefore appropriate only when the statistical model supports a common variance assumption.
          </p>
          <p>
            When equal variances are doubtful, an analysis designed for unequal variances may be more appropriate.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Does the Confidence Interval Calculator Work?
          </h2>
          <p>
            The confidence-interval section estimates a range for a population mean from a sample mean, sample standard deviation and sample size.
          </p>
          <p>
            For the calculator&apos;s z-based 95% example:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-xs space-y-1">
            <p>Mean = 50 | Standard deviation = 10 | N = 30</p>
            <p>Critical z-score = 1.96</p>
            <p>Standard error: 10 / √30 ≈ 1.82574</p>
            <p>Margin of error: 1.96 × 1.82574 ≈ 3.5785</p>
            <p className="font-bold text-blue-600">Interval: 50 ± 3.5785 = [46.4215, 53.5785]</p>
          </div>
          <p>
            A confidence interval should not be interpreted as a 95% probability that the fixed population mean is inside this particular interval.
          </p>
          <p>
            The 95% refers to the long-run coverage property of the interval-producing method under its assumptions.
          </p>
          <p>
            For small samples or situations where population variability is estimated from the sample, a t-based interval may be more appropriate than a fixed z critical value. The calculator&apos;s displayed method should therefore be interpreted according to the model and confidence option selected.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Margin of Error?
          </h2>
          <p>
            The margin of error describes the amount added and subtracted from the point estimate to construct the reported interval.
          </p>
          <p>
            For a z-based mean interval:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            ME = z × SE
          </div>
          <p>
            A larger standard error produces a wider margin of error.
          </p>
          <p>
            A larger sample size generally reduces the standard error, which tends to make the interval narrower when other quantities are held constant.
          </p>
          <p>
            A more variable dataset produces a larger standard error and therefore a wider interval.
          </p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Standard Deviation Can — and Cannot — Tell You
          </h2>
          <p>
            Standard deviation describes spread.
          </p>
          <p>
            It does not by itself tell you:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>whether a difference is statistically significant</li>
            <li>whether a measurement is clinically important</li>
            <li>whether one treatment is better</li>
            <li>whether a process is acceptable</li>
            <li>whether a result proves causation</li>
          </ul>
          <p>
            Those conclusions require an appropriate statistical design and, when relevant, formal inference.
          </p>
          <p>
            The calculator is designed to make the arithmetic transparent, not to replace the statistical reasoning required for a study.
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Does Sample Size Matter?
          </h2>
          <p>
            Sample size affects several statistical quantities.
          </p>
          <p>
            For the sample standard error of the mean:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            SE = s / √n
          </div>
          <p>
            As n increases, the standard error decreases, all else equal.
          </p>
          <p>
            Standard deviation itself measures spread in the observed values and does not simply become smaller because more observations are collected. What generally becomes more precise with more observations is an estimate such as the sample mean.
          </p>
          <div className="p-3 bg-blue-50 dark:bg-slate-800/60 rounded-lg border text-xs">
            <strong>Fundamental Distinction:</strong> More data can improve the precision of an estimate without changing the actual variability of the underlying measurements.
          </div>
        </section>

        {/* Section 23 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Units Does Standard Deviation Use?
          </h2>
          <p>
            Standard deviation uses the same units as the original observations.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>If the data is in centimeters, standard deviation is in centimeters.</li>
            <li>If the data is in dollars, standard deviation is in dollars.</li>
            <li>If the data is in kilograms, standard deviation is in kilograms.</li>
          </ul>
          <p>
            Variance uses squared units (centimeters², dollars², kilograms²).
          </p>
          <p>
            This is one reason standard deviation is often easier to interpret directly than variance.
          </p>
        </section>

        {/* Section 24 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            When Should You Use Standard Deviation?
          </h2>
          <p>
            Standard deviation is useful when you want to quantify the overall spread of numerical observations around their mean.
          </p>
          <p>
            Common uses include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">Descriptive statistics</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">Quality-control measurements</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">Experimental data</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">Finance and return variability</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">Manufacturing measurements</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">Laboratory measurements</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">Education and test-score analysis</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">Process monitoring</div>
          </div>
          <p>
            It is especially useful when observations are measured on a meaningful numeric scale and the mean is an appropriate center.
          </p>
        </section>

        {/* Section 25 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            When Is Standard Deviation Not Enough?
          </h2>
          <p>
            Standard deviation is only one summary of a dataset.
          </p>
          <p>
            It can be misleading when:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>the distribution is strongly skewed</li>
            <li>the data contains major outliers</li>
            <li>the measurement scale makes the mean inappropriate</li>
            <li>multiple populations have been mixed together</li>
            <li>the sample is too small to support the intended inference</li>
          </ul>
          <p>
            For skewed distributions, consider reporting the median and interquartile range alongside standard deviation.
          </p>
          <p>
            For unusual distributions, visualize the data before interpreting a single spread statistic.
          </p>
        </section>

        {/* Section 26 */}
        <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Where Is Standard Deviation Used?
          </h2>
          <p>
            Standard deviation appears across many fields because nearly every quantitative discipline needs a way to describe variability.
          </p>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Finance</h3>
              <p>Standard deviation can describe variability in investment returns and is commonly used as a volatility measure.</p>
              <p>It can also appear in risk calculations and portfolio analysis.</p>
              <p className="text-slate-500 italic">However, a Sharpe ratio is not calculated from standard deviation alone; it combines excess return with a measure of return variability [(R_p − R_f) / σ_p].</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Manufacturing and Quality Control</h3>
              <p>Measurements such as product dimensions, process times and material properties can be summarized with standard deviation to understand process consistency.</p>
              <p className="text-slate-500 italic">Six Sigma uses standard-deviation-based process terminology, but actual process capability analysis involves additional quantities such as specification limits and process capability indices.</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Science and Research</h3>
              <p>Researchers use standard deviation to describe variation in measured observations and to summarize experimental datasets.</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Education</h3>
              <p>Test scores and assessment measurements can be summarized using mean and standard deviation to describe central tendency and spread.</p>
            </div>
          </div>
        </section>

        {/* Section 27 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Standard Deviation Mistakes
          </h2>
          <div className="space-y-2 text-xs sm:text-sm">
            <p><strong>Using N instead of N − 1 for a sample:</strong> This changes the sample variance and standard deviation.</p>
            <p><strong>Calling standard deviation standard error:</strong> They measure different concepts (raw spread vs mean uncertainty).</p>
            <p><strong>Applying the 68–95–99.7 rule to every dataset:</strong> The empirical rule depends on approximate normality.</p>
            <p><strong>Removing every outlier:</strong> An unusual observation is not automatically incorrect.</p>
            <p><strong>Rounding too early:</strong> Intermediate rounding can change the final result. The calculator&apos;s step table therefore keeps the underlying arithmetic precise and rounds primarily for display.</p>
            <p><strong>Mixing sample and population formulas:</strong> Always identify whether the dataset represents the complete population or a sample from a larger population.</p>
          </div>
        </section>

        {/* Section 28 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Worked Example With Eight Values
          </h2>
          <p>
            Use the dataset:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            10, 12, 23, 16, 23, 21, 16, 16
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono pt-1">
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">N = 8</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">Sum = 137</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">Mean = 17.125</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">SS = 164.875</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border space-y-1">
              <span className="font-sans font-bold uppercase text-slate-500 block">Sample Statistics:</span>
              <p>Sample variance: 164.875 / 7 = 23.553571...</p>
              <p className="font-bold text-blue-600">Sample SD: ≈ 4.853202</p>
              <p>Sample standard error: ≈ 1.715866</p>
              <p>Sample CV: ≈ 28.3399%</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border space-y-1">
              <span className="font-sans font-bold uppercase text-slate-500 block">Population Statistics:</span>
              <p>Population variance: 164.875 / 8 = 20.609375</p>
              <p className="font-bold text-blue-600">Population SD: ≈ 4.539755</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">
            This example is useful because it demonstrates why sample and population standard deviations differ even though the underlying observations are identical.
          </p>
        </section>

        {/* Section 29 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Read the Variance Table
          </h2>
          <p>
            The variance table exposes the intermediate calculations rather than hiding them behind a single final result.
          </p>
          <p>
            For each observation it shows the relationship between:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>value</li>
            <li>deviation from mean</li>
            <li>squared deviation</li>
          </ul>
          <p>
            For the default dataset, the first row is:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-xs">
            Value = 10 | Mean = 17.125 | Deviation = −7.125 | Squared deviation = 50.765625
          </div>
          <p>
            The next row is:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-xs">
            Value = 12 | Deviation = −5.125 | Squared deviation = 26.265625
          </div>
          <p>
            Adding every squared deviation produces:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border font-mono text-xs font-bold text-blue-600">
            SS = 164.875
          </div>
          <p>
            That same SS then feeds both the sample and population variance calculations.
          </p>
        </section>

        {/* Section 30 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Does Your Calculator Show Different Decimal Places?
          </h2>
          <p>
            Statistical calculations are performed using full numerical precision, while the interface may round values for readability.
          </p>
          <p>
            For example, <span className="font-mono">17.125</span> may be displayed as <span className="font-mono">17.13</span> depending on the field.
          </p>
          <p>
            That does not mean the underlying calculation has changed.
          </p>
          <p>
            Exported results and step-by-step calculations may use more decimal places so that the arithmetic remains auditable.
          </p>
        </section>

        {/* Section 31 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Data Can I Enter?
          </h2>
          <p>
            The calculator accepts numerical observations separated by commas, spaces, or line breaks.
          </p>
          <p>
            For example, these forms represent the same five observations:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">10, 12, 16, 22, 25</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">10 12 16 22 25</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">10<br/>12<br/>16<br/>22<br/>25</div>
          </div>
          <p>
            The calculator normalizes valid delimiter variations before calculation.
          </p>
          <p>
            Non-numeric entries should be rejected or handled through the calculator&apos;s validation behavior rather than silently converted into zero.
          </p>
        </section>

        {/* Section 32 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Can I Save or Export a Calculation?
          </h2>
          <p>
            The calculator provides several ways to keep a record of your work.
          </p>
          <div className="space-y-1 text-xs sm:text-sm">
            <p><strong>Save:</strong> stores a calculation for later reference.</p>
            <p><strong>Copy:</strong> creates a text summary of the current result.</p>
            <p><strong>CSV:</strong> exports structured numerical information for use in spreadsheet software.</p>
            <p><strong>Share:</strong> preserves the calculation state where supported.</p>
            <p><strong>PDF / Print:</strong> creates a printable report of the calculation.</p>
          </div>
          <p className="text-xs text-slate-500 italic">
            These exports should represent the current calculator state rather than an old example dataset.
          </p>

          {/* MID-CONTENT INTERNAL LINK #4 */}
          <div className="p-4 bg-blue-50/70 dark:bg-slate-800/70 rounded-xl border border-blue-200 dark:border-slate-700 text-xs mt-3">
            <p className="text-slate-700 dark:text-slate-300">
              If your analysis starts with standard deviation but you need a broader descriptive-statistics workflow, the{" "}
              <Link href="/calculators/statistics-calculator" className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-800">
                Statistics Calculator
              </Link>{" "}
              can provide a wider set of summary measures.
            </p>
          </div>
        </section>

        {/* Section 33 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Should I Use Sample or Population Standard Deviation?
          </h2>
          <p>
            Use population standard deviation when the values represent the complete population you are describing.
          </p>
          <p>
            Use sample standard deviation when the observed values are treated as a sample from a larger population and you want the usual unbiased estimator of population variance.
          </p>
          <div className="space-y-2 pt-1 text-xs sm:text-sm">
            <p><strong>All machines produced in a complete production run:</strong> population may be appropriate.</p>
            <p><strong>100 machines selected from ongoing production:</strong> sample may be appropriate.</p>
            <p><strong>Every employee in a company:</strong> population may be appropriate.</p>
            <p><strong>A survey sample of employees:</strong> sample may be appropriate.</p>
          </div>
          <p>
            The correct choice depends on how the data was collected and what population you intend to describe.
          </p>
        </section>

        {/* Section 34: Statistical References */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Statistical References
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The mathematical definitions, unbiased estimators, and distributional properties implemented in this calculator adhere to established national and academic standards:
          </p>
          <ul className="space-y-2 text-xs">
            <li className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <a
                  href="https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:underline block"
                >
                  NIST/SEMATECH e-Handbook of Statistical Methods — Measures of Dispersion
                </a>
                <span className="text-slate-500">National Institute of Standards and Technology. Explains sample standard deviation, variance, and degrees of freedom.</span>
              </div>
            </li>
            <li className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <a
                  href="https://online.stat.psu.edu/stat500/lesson/1/1.4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:underline block"
                >
                  Penn State Online Statistics — Sample Mean / Standard Deviation
                </a>
                <span className="text-slate-500">Pennsylvania State University STAT 500 course notes on sample variability, Bessel&apos;s correction, and sum of squares.</span>
              </div>
            </li>
            <li className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <a
                  href="https://online.stat.psu.edu/stat500/lesson/4/4.1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:underline block"
                >
                  Penn State Online Statistics — Sampling Distributions / Standard Error
                </a>
                <span className="text-slate-500">Distinguishes sample standard deviation from the standard error of the mean across repeated sampling.</span>
              </div>
            </li>
            <li className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <a
                  href="https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:underline block"
                >
                  NIST — Exploratory Data Analysis / Box Plots
                </a>
                <span className="text-slate-500">Tukey 1.5×IQR outlier detection methodology and five-number order summary properties.</span>
              </div>
            </li>
            <li className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <a
                  href="https://www.itl.nist.gov/div898/handbook/prc/section1/prc14.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:underline block"
                >
                  NIST — Confidence Limits for the Mean
                </a>
                <span className="text-slate-500">Formulations for margin of error and interval bounds under normal and t-distributions.</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Section 35: Standard Deviation Calculator FAQ (UNFOLDED BY DEFAULT) */}
        <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>Standard Deviation Calculator FAQ</span>
            </h2>
            <span className="text-xs text-slate-500 font-semibold">
              {standard_deviation_calculatorFaqs.length} Answers
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {standard_deviation_calculatorFaqs.map((faq, idx) => {
              const isOpen = openFaqIndices.has(idx);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-3.5 sm:p-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-blue-600 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-3.5 sm:p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-700/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 36: Related Statistics Calculators */}
        <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Related Statistics Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <Link
              href="/calculators/statistics-calculator"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-blue-600 group-hover:underline">
                  Statistics Calculator
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Calculate a broader set of descriptive statistics from your dataset.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 pt-3">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              href="/calculators/z-score-calculator"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-blue-600 group-hover:underline">
                  Z-Score Calculator &amp; Normal Distribution Suite
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Standardize observations with z-scores and explore normal-distribution calculations.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 pt-3">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              href="/calculators/mean-median-mode-calculator"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-blue-600 group-hover:underline">
                  Mean, Median, Mode &amp; Range Calculator
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Calculate common measures of central tendency and basic numerical range.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 pt-3">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* Section 37: Disclaimer */}
        <section className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <p className="font-bold uppercase tracking-wider text-[10px] text-slate-400">
            Mathematical &amp; Educational Reference Notice:
          </p>
          <p>
            This calculator is provided for computational, research, and educational purposes. Statistical modeling and inferences derived from sample data require verifying underlying distributional assumptions (such as independence, normality, and homoscedasticity) appropriate to the specific study design.
          </p>
        </section>

      </div>
    </article>
  );
}

export default StdDevContent;
