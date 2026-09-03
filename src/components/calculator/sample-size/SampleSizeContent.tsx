"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Layers,
  ShieldCheck,
  Target,
  ArrowRight,
  TrendingUp,
  BarChart2,
  Table,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from "lucide-react";
import { sample_size_calculatorFaqs } from "@/app/calculators/sample-size-calculator/faq";

export function SampleSizeContent() {
  return (
    <article className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* ========================================================================= */}
      {/* RELATED CALCULATORS — TOP OF ARTICLE */}
      {/* ========================================================================= */}
      <section className="no-print p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-2">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
          Related Statistical Calculators:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <Link
            href="/calculators/standard-deviation-calculator"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 font-bold text-slate-800 dark:text-slate-200 transition-all shadow-2xs group"
          >
            <span>Standard Deviation Calculator</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/calculators/confidence-interval-calculator"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 font-bold text-slate-800 dark:text-slate-200 transition-all shadow-2xs group"
          >
            <span>Confidence Interval Calculator</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/calculators/z-score-calculator"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 font-bold text-slate-800 dark:text-slate-200 transition-all shadow-2xs group"
          >
            <span>Z-Score Calculator</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* OPENING CONTENT */}
      {/* ========================================================================= */}
      <section className="space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          Choosing the right sample size is one of the most important steps in planning a survey, experiment, or statistical study. A sample that is too small may produce estimates that are too imprecise or leave a study with insufficient power to detect a meaningful effect. A sample that is unnecessarily large can increase cost, recruitment time, and workload without providing proportional practical benefit.
        </p>
        <p>
          This Sample Size Calculator helps estimate the minimum number of observations, respondents, or participants needed for several common statistical designs. Depending on the calculation mode, you can account for confidence level, margin of error, population size, response rate, standard deviation, detectable differences, and statistical power.
        </p>
        <p>
          For survey proportions, the calculator uses a Cochran-style proportion sample-size approach and can apply a finite population correction when the population size is known. It also includes calculations for continuous means, two-proportion A/B tests, reverse margin of error, response-rate adjustment, statistical power visualization, and reference sample-size benchmarks.
        </p>
        <p>
          Sample-size calculations are design calculations rather than guarantees. The appropriate method depends on the research question, outcome variable, sampling design, statistical test, expected variability or proportion, target effect, significance level, and power. For complex clinical or experimental designs, a dedicated statistical analysis or biostatistical review may be appropriate.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* WHAT IS SAMPLE SIZE? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          What Is Sample Size?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Sample size is the number of observations included in a study or survey. In a simple survey, this might mean the number of people who provide usable responses. In an experiment, it may mean participants, observations, or measurements allocated to one or more groups.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The required sample size is determined by the statistical objective.
        </p>
        <div className="space-y-2 pl-4 border-l-2 border-blue-500 text-slate-700 dark:text-slate-300">
          <p>
            For a proportion survey, the objective may be to estimate a population proportion within a chosen margin of error at a specified confidence level.
          </p>
          <p>
            For a continuous outcome, the objective may be to estimate a population mean with a chosen precision.
          </p>
          <p>
            For hypothesis testing or A/B testing, the objective is often to have enough observations to detect a prespecified effect with an acceptable probability of success.
          </p>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          That is why there is no single universal &ldquo;correct sample size.&rdquo; Different study designs require different calculations. Sample-size planning generally starts by specifying the statistical question and the inputs relevant to that question.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* HOW THIS SAMPLE SIZE CALCULATOR WORKS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          How This Sample Size Calculator Works
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator contains several related sample-size methods rather than forcing every problem into one formula.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
              Survey and proportion sample size
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Use this mode when estimating a population proportion, such as the percentage of respondents with a particular opinion or characteristic. Inputs include confidence level, margin of error, population size when known, and response rate where recruitment planning is needed.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
              Continuous mean sample size
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Use this mode when the outcome is measured numerically and the study is designed around a mean, such as blood pressure, test scores, height, weight, or another continuous measurement.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
              A/B testing sample size
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Use this mode when comparing two conversion rates and planning the required sample per variant at a chosen statistical power.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
              Reverse margin of error
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Instead of asking how many observations are needed for a chosen precision, you can start with a completed sample size and calculate the margin of error achieved under the selected assumptions.
            </p>
          </div>
        </div>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator also provides a statistical power curve and a benchmark matrix so you can see how changing the design inputs affects the required sample.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SURVEY SAMPLE SIZE FORMULA */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Survey Sample Size Formula
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For a population proportion, a commonly used large-population formula is:
        </p>

        <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center font-mono text-lg font-bold text-blue-800 dark:text-blue-300">
          n₀ = [ Z² · p(1 - p) ] / E²
        </div>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          where:
        </p>
        <ul className="space-y-1.5 pl-6 list-disc text-sm text-slate-700 dark:text-slate-300 font-medium">
          <li><strong>n₀</strong> = preliminary sample size</li>
          <li><strong>Z</strong> = critical value associated with the confidence level</li>
          <li><strong>p</strong> = expected population proportion</li>
          <li><strong>E</strong> = margin of error expressed as a decimal</li>
        </ul>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For example, a 5% margin of error is:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          E = 0.05 (not 5)
        </div>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The sample-size formula shows why precision can become expensive. Because the margin of error is squared in the denominator, reducing the desired error requires a disproportionately larger sample.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Penn State gives the same general relationship for estimating a population proportion and notes that when no reasonable prior estimate of the proportion is available, <strong>p = 0.50</strong> is the conservative choice because it produces the largest sample-size requirement.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* WHY IS P = 0.50 USED? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Why Is p = 0.50 Used?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For the expression:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          p(1 - p)
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          the maximum value occurs at:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          p = 0.50
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          because:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          0.50(1 - 0.50) = 0.25
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Using 0.50 therefore produces the largest required sample under this simple proportion formula when the true proportion is unknown. That makes it a conservative planning assumption.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          It does not mean that every real population has a 50% proportion. If reliable prior information suggests a substantially different proportion, using that information may produce a more efficient sample-size estimate. Penn State&apos;s sample-size example explicitly shows that using a known proportion such as 0.25 produces a smaller required sample than the conservative 0.50 assumption.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 95% CONFIDENCE AND 5% MARGIN OF ERROR: A CLASSIC EXAMPLE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          95% Confidence and 5% Margin of Error: A Classic Example
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Consider a survey where:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          Confidence = 95%, E = 5% = 0.05
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          and no prior estimate of the population proportion is available, so:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          p = 0.50
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For a two-sided 95% confidence level:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          Z ≈ 1.96
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The preliminary sample size is:
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center font-mono font-bold text-base text-blue-900 dark:text-blue-300">
          n₀ = [ 1.96² × (0.50)(0.50) ] / 0.05² ≈ 384.15
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Because the goal is to obtain a minimum sufficient number of observations, the result is rounded up, giving:
        </p>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-600 text-center font-mono font-black text-2xl text-blue-600 shadow-xs">
          n = 385
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator&apos;s audited golden case independently produces 385. Penn State likewise demonstrates that a calculated minimum such as 600.25 must be rounded upward to 601 when determining the minimum sample required.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* DOES POPULATION SIZE AFFECT REQUIRED SAMPLE SIZE? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Does Population Size Affect Required Sample Size?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Yes, but not in a simple one-for-one relationship.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          When the population is extremely large compared with the sample, increasing the population further has relatively little impact on the required sample under the basic proportion formula.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          When the population itself is finite and not much larger than the required sample, a finite population correction can materially reduce the required sample.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          This is why a survey of a population of 1,000 does not necessarily require anything close to 1,000 respondents to achieve a specified precision.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* FINITE POPULATION CORRECTION */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Finite Population Correction
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          When the population size N is known and finite, the preliminary sample can be adjusted using the finite population correction:
        </p>

        <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center font-mono text-lg font-bold text-blue-800 dark:text-blue-300">
          n = n₀ / [ 1 + (n₀ - 1) / N ]
        </div>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          where:
        </p>
        <ul className="space-y-1.5 pl-6 list-disc text-sm text-slate-700 dark:text-slate-300 font-medium">
          <li><strong>n₀</strong> = uncorrected sample size</li>
          <li><strong>N</strong> = population size</li>
          <li><strong>n</strong> = corrected sample size</li>
        </ul>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For example, with a 95% confidence level, 5% margin of error, conservative p = 0.50, and:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          N = 1,000
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          the calculator&apos;s audited result is:
        </p>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-600 text-center font-mono font-black text-2xl text-blue-600 shadow-xs">
          278
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The implementation applies the FPC to the continuous unrounded preliminary sample and then rounds the final minimum upward. That corrected the previous double-ceiling defect in the calculation engine.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* WORKED EXAMPLE: POPULATION OF 1,000 */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Worked Example: Population of 1,000
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Start with:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          n₀ = 384.145
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Then:
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center font-mono font-bold text-base text-blue-900 dark:text-blue-300">
          n = 384.145 / [ 1 + 383.145 / 1000 ] ≈ 277.73
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Since the required sample must be an integer and must meet or exceed the calculated minimum:
        </p>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-600 text-center font-mono font-black text-2xl text-blue-600 shadow-xs">
          n = 278
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          This is why it is important to apply the finite population correction and rounding correctly rather than simply taking an already-rounded 385 and correcting that number.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* CONFIDENCE LEVEL VS MARGIN OF ERROR */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Confidence Level vs Margin of Error
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Confidence level and margin of error answer different questions.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Confidence level controls how much confidence is associated with the interval procedure and therefore determines the relevant critical-value multiplier.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Margin of error describes the desired precision of the estimate.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For a proportion estimate, the general structure is:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          estimate ± margin of error
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          and the margin of error depends on a multiplier and the standard error.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Increasing the confidence level generally increases the critical value and therefore increases the required sample size, assuming the other inputs remain fixed.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Reducing the margin of error also increases the required sample size, often substantially.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* WHY DOES A SMALLER MARGIN OF ERROR REQUIRE MORE PARTICIPANTS? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Why Does a Smaller Margin of Error Require More Participants?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Suppose a survey changes its target from ±5% to ±3%. The investigator is asking for a narrower interval.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Because sample-size formulas generally contain:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          1 / E²
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          in the relevant proportion calculation, reducing E can increase the required sample substantially.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          This relationship is not merely theoretical. Penn State&apos;s examples show that increasing sample size narrows the resulting confidence interval because standard error decreases as sample size increases.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SAMPLE SIZE FOR A CONTINUOUS MEAN */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Sample Size for a Continuous Mean
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Some studies are designed around a continuous measurement rather than a proportion. A common normal-approximation planning formula is:
        </p>

        <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center font-mono text-lg font-bold text-blue-800 dark:text-blue-300">
          n = [ (Z · σ) / E ]²
        </div>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          where:
        </p>
        <ul className="space-y-1.5 pl-6 list-disc text-sm text-slate-700 dark:text-slate-300 font-medium">
          <li><strong>Z</strong> = critical value</li>
          <li><strong>σ</strong> = estimated standard deviation</li>
          <li><strong>E</strong> = desired absolute margin of error</li>
        </ul>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The relationship is intuitive:
        </p>
        <div className="space-y-2 pl-4 border-l-2 border-blue-500 text-slate-700 dark:text-slate-300">
          <p>A larger standard deviation means greater uncertainty and therefore a larger required sample.</p>
          <p>A smaller desired margin of error requires a larger sample.</p>
          <p>A higher confidence level increases the critical value and therefore increases the required sample.</p>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The exact calculation should match the intended study design and assumptions rather than being treated as a universal formula for every continuous outcome.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* WORKED CONTINUOUS-MEAN EXAMPLE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Worked Continuous-Mean Example
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Suppose:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          σ = 10, E = 2, 95% confidence (Z ≈ 1.96)
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Then:
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center font-mono font-bold text-base text-blue-900 dark:text-blue-300">
          n = [ (1.96 × 10) / 2 ]² ≈ 96.04
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The minimum integer sample is therefore:
        </p>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-600 text-center font-mono font-black text-2xl text-blue-600 shadow-xs">
          n = 97
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The practical interpretation is that the planning calculation requires at least 97 observations under those assumptions. For an actual study, verify that the assumed standard deviation is appropriate and that the normal approximation matches the planned analysis.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SAMPLE SIZE AND STATISTICAL POWER */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Sample Size and Statistical Power
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Sample size is also central to hypothesis testing. Statistical power is commonly written as:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          1 - β
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          where β is the probability of a Type II error under the specified alternative.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          In practical terms, power is the probability of detecting the prespecified effect when that effect is present under the assumptions used in the calculation.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A common planning convention is 80% or 90% power. Increasing the target power generally increases the required sample size because the study is being designed with a lower probability of missing the prespecified effect.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* WHAT DOES 80% POWER MEAN? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          What Does 80% Power Mean?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          An 80% power calculation is designed so that, under the specified model and assumed effect, the statistical procedure has about an 80% probability of rejecting the null hypothesis when that effect is truly present.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Equivalently:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          β = 1 - 0.80 = 0.20
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculation is conditional on its assumptions. It is not a guarantee that an experiment will produce a statistically significant result.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Power depends on factors including effect size, variability, sample size, significance level, and test design. Clinical-study references describe 80% and 90% as common planning choices.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* WHAT HAPPENS WHEN YOU INCREASE STATISTICAL POWER? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          What Happens When You Increase Statistical Power?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Suppose all other inputs stay fixed. Moving from 80% power to 90% power normally requires a larger sample.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The reason is straightforward: the study is being designed to have a greater chance of detecting the prespecified effect if it exists.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator includes an interactive statistical power curve so this relationship can be viewed rather than inferred only from a final sample-size number.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* A/B TEST SAMPLE SIZE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          A/B Test Sample Size
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A/B testing compares two variants, such as control vs treatment, version A vs version B, or existing conversion rate vs proposed conversion rate.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For a conversion experiment, the key inputs are the expected baseline rate, the expected variant rate, and the desired statistical power. The difference between the rates determines how difficult the effect is to detect.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A small conversion-rate difference requires substantially more observations than a large difference, all else equal.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For two-proportion testing, the exact required sample also depends on the statistical model, significance level, allocation and other assumptions. Different sample-size methods can therefore produce different numerical answers.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* EXAMPLE: 3.0% VS 3.5% CONVERSION RATE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Example: 3.0% vs 3.5% Conversion Rate
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Suppose:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          p₁ = 3.0%, p₂ = 3.5%
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The absolute difference is:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          3.5% - 3.0% = 0.5 percentage points
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The relative uplift is:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          [ (3.5 - 3.0) / 3.0 ] × 100 ≈ 16.67%
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          These are not the same metric. The calculator&apos;s audited implementation explicitly distinguishes:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 text-sm font-mono">
          <p><strong>Absolute Difference (MDE):</strong> 0.50 percentage points</p>
          <p><strong>Relative Uplift:</strong> 16.67%</p>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          This removed a statistical terminology defect identified during the production audit.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Under the calculator&apos;s implemented A/B approximation, the 3.0% vs 3.5% example at 80% power produces:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center font-mono font-black text-xl">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-600 text-blue-600">
            19,740 per variant
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-600 text-blue-600">
            39,480 total
          </div>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The audit independently reproduced that value.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* WHY SMALL A/B EFFECTS NEED LARGE SAMPLES */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Why Small A/B Effects Need Large Samples
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A conversion-rate change from 3.0% to 3.5% may look substantial when expressed relatively, but its absolute difference is only 0.5 percentage points. Detecting a small absolute difference against the natural variation in binary outcomes requires a large number of observations.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          This is a central reason A/B tests with small conversion lifts can take much longer to reach a reliable sample size.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The general principle extends beyond website testing: a smaller target effect usually requires a larger sample when the desired power and statistical significance remain fixed.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* RESPONSE RATE AND RECRUITMENT TARGET */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Response Rate and Recruitment Target
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A statistical calculation may tell you how many completed responses are needed, but that is not necessarily the number of people you must contact.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          If the expected response rate is r, then a simple recruitment adjustment is:
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center font-mono font-bold text-base text-blue-900 dark:text-blue-300">
          Invitations = Required Completed Responses / r
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          where the response rate is expressed as a decimal.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For example, if 385 completed responses are required and the expected response rate is 80%:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          385 / 0.80 = 481.25
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Since you cannot recruit a fraction of a participant:
        </p>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-600 text-center font-mono font-black text-2xl text-blue-600 shadow-xs">
          482 invitations
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator&apos;s audited response-adjustment case produces exactly 482 invitations. This is a planning adjustment, not a guarantee that 80% of invited people will actually respond.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* REVERSE SAMPLE SIZE: WHAT MARGIN OF ERROR WILL MY SAMPLE ACHIEVE? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Reverse Sample Size: What Margin of Error Will My Sample Achieve?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Sometimes the number of participants is already fixed. For example:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          n = 400
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Instead of asking: &ldquo;How many participants do I need for ±5%?&rdquo; you may want to ask: &ldquo;What margin of error does a sample of 400 provide?&rdquo;
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Under the calculator&apos;s proportion assumptions, the reverse relationship is:
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center font-mono font-bold text-base text-blue-900 dark:text-blue-300">
          E = Z · √[ p(1 - p) / n ]
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          With:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          n = 400, p = 0.50, 95% confidence
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          the calculator produces:
        </p>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-600 text-center font-mono font-black text-2xl text-blue-600 shadow-xs">
          ±4.90%
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For 90% confidence, the same sample produces approximately:
        </p>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-600 text-center font-mono font-black text-2xl text-blue-600 shadow-xs">
          ±4.11%
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The audited engine independently verifies both reverse-MOE cases.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SAMPLE SIZE BENCHMARK EXAMPLES */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Sample Size Benchmark Examples
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator includes an audited reference matrix to show how confidence and precision affect sample size.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Population</th>
                <th className="p-3">95% confidence, ±5% MOE</th>
                <th className="p-3">95% confidence, ±3% MOE</th>
                <th className="p-3">99% confidence, ±1% MOE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <td className="p-3 font-bold text-slate-900 dark:text-slate-100">100</td>
                <td className="p-3 font-bold text-blue-600">80</td>
                <td className="p-3">92</td>
                <td className="p-3">100</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900 dark:text-slate-100">500</td>
                <td className="p-3 font-bold text-blue-600">218</td>
                <td className="p-3">341</td>
                <td className="p-3">486</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900 dark:text-slate-100">1,000</td>
                <td className="p-3 font-bold text-blue-600">278</td>
                <td className="p-3">517</td>
                <td className="p-3">944</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900 dark:text-slate-100">10,000</td>
                <td className="p-3 font-bold text-blue-600">370</td>
                <td className="p-3">965</td>
                <td className="p-3">6,240</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900 dark:text-slate-100">Large / effectively infinite</td>
                <td className="p-3 font-bold text-blue-600">385</td>
                <td className="p-3">1,068</td>
                <td className="p-3">16,588</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          These values are calculated from the implementation&apos;s audited methodology rather than copied from an external sample-size table.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The table also illustrates three important patterns:
        </p>
        <div className="space-y-2 pl-4 border-l-2 border-blue-500 text-slate-700 dark:text-slate-300">
          <p>A larger confidence level tends to increase sample size.</p>
          <p>A smaller margin of error can increase sample size dramatically.</p>
          <p>Once the population is sufficiently large, further increases in population size have progressively less influence on the basic survey sample requirement.</p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SAMPLE SIZE IS NOT DETERMINED BY POPULATION ALONE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Sample Size Is Not Determined by Population Alone
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A common misconception is that a population ten times larger automatically requires ten times the sample. That is not generally true for standard proportion estimates.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The required sample is driven by statistical precision and confidence as well as population size. For large populations, the basic infinite-population requirement approaches an asymptotic value under a fixed confidence level, margin of error and proportion assumption.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Finite population correction becomes increasingly relevant when the sample represents a meaningful fraction of the population.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* COMMON SAMPLE SIZE MISTAKES */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common Sample Size Mistakes
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Using 5 instead of 0.05 for a 5% margin of error</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Percent inputs must be converted correctly into decimal probability/precision values before entering the formula.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Rounding in the wrong direction</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">If the calculated minimum is 384.15, using 384 would leave the sample below the calculated requirement. Minimum sample sizes should be rounded upward.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Forgetting the finite population correction</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">A known finite population can change the required sample materially.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Applying FPC to an already rounded sample</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">This can introduce an avoidable rounding distortion. The underlying continuous value should be handled consistently with the selected methodology.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Confusing response rate with completion count</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">If 385 usable responses are required and only 80% are expected to respond, recruiting 385 people does not provide 385 completed observations.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Confusing relative uplift with percentage-point difference</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">A move from 3.0% to 3.5% is a 0.5-percentage-point absolute difference but approximately a 16.67% relative uplift.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Treating power as a guarantee</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">80% power does not guarantee an experiment will detect an effect. It is a design probability under specified assumptions.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Treating one formula as universal</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Sample-size methods differ by outcome type and study design. A simple proportion calculation should not automatically be substituted for a power calculation appropriate to a clinical trial or complex experiment.</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SURVEY SAMPLE SIZE VS A/B TEST SAMPLE SIZE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Survey Sample Size vs A/B Test Sample Size
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          These calculations look similar because both return a required number of observations, but their statistical purposes are different.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A survey sample-size calculation is often designed to estimate a population quantity with a specified confidence level and precision.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          An A/B sample-size calculation is generally designed to detect a prespecified difference between two variants with a chosen significance level and statistical power.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          That means you should select the calculation according to the question you are trying to answer, not simply according to which formula produces the smaller sample.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* WHEN SHOULD YOU USE A SAMPLE SIZE CALCULATOR? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          When Should You Use a Sample Size Calculator?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A sample-size calculator is useful before collecting data when you need to plan survey respondents, market-research participants, A/B test traffic, experimental observations, continuous measurements, research participants, prevalence estimates, proportion estimates, or hypothesis-testing studies.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculation should be performed before data collection whenever possible because changing the sample-size target after examining results can affect the statistical validity of the study design.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          In formal research, document the assumptions used to determine the sample size, including the target outcome, significance level, confidence level where applicable, power, expected variability or proportion, target difference, and any expected attrition or non-response. Sample-size planning is an explicit component of good study design.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SAMPLE SIZE AND STATISTICAL SIGNIFICANCE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Sample Size and Statistical Significance
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Sample size and statistical significance are related but are not interchangeable.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A very large sample can make a very small effect statistically detectable. Conversely, a small sample can fail to detect a meaningful effect because statistical uncertainty is large.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Therefore a sample-size calculation should begin with a meaningful target difference or acceptable precision, rather than choosing a large number simply because &ldquo;more data is always better.&rdquo;
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For clinical research, the target difference should represent the effect that matters for the research question, and the calculation should be based on the planned primary outcome and statistical test.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SAMPLE SIZE, MARGIN OF ERROR AND PRECISION */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Sample Size, Margin of Error and Precision
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Margin of error is related to the width of a confidence interval. For a confidence interval of the form:
        </p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-slate-900 dark:text-slate-100">
          estimate ± margin of error
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          the margin of error represents half of the interval width.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Increasing sample size reduces standard error and therefore generally makes the interval narrower when the other conditions remain comparable.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          This is why sample-size planning can be understood as a trade-off:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 text-center font-bold text-sm">
          <p className="text-blue-600 dark:text-blue-400">More observations → greater precision</p>
          <p className="text-slate-600 dark:text-slate-400">Fewer observations → less precision</p>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The best design is not necessarily the largest possible sample, but the sample that provides adequate precision or power for the intended question while remaining practical.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* HOW TO USE THIS CALCULATOR & CONTEXTUAL INTERNAL LINKS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          How to Use This Calculator
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Start by identifying the type of calculation you actually need.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For a survey proportion, enter the confidence level and desired margin of error. Enter the population size when you are sampling from a known finite population. Enter a response rate when you need to convert required completed responses into an estimated recruitment target.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          When the sample-size calculation depends on standard deviation and you need to inspect the underlying dispersion of your data first, continue to the{" "}
          <Link href="/calculators/standard-deviation-calculator" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Standard Deviation Calculator
          </Link>
          .
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          When the calculation is being used to build an interval from a sample estimate, the{" "}
          <Link href="/calculators/confidence-interval-calculator" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Confidence Interval Calculator
          </Link>{" "}
          can be used as the next step.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          When a standardized effect or normal-theory probability is part of the analysis, the{" "}
          <Link href="/calculators/z-score-calculator" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Z-Score Calculator
          </Link>{" "}
          can help with the corresponding standardized-value calculations.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For an A/B conversion experiment, enter the baseline and variant conversion rates and select the desired statistical power.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For reverse MOE, enter the completed sample size and confidence level to estimate the precision achieved.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Review the result together with the displayed assumptions and explanatory text rather than treating the final integer as a universal answer.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* EDUCATIONAL DIAGRAM: HOW SAMPLE SIZE PLANNING WORKS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span>How Sample Size Planning Works</span>
        </h3>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs font-bold">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Step 1</span>
              <span>Define Design Inputs</span>
              <p className="text-[10px] font-normal text-slate-500 mt-1">Confidence, MOE, Power, Pop</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Step 2</span>
              <span>Statistical Formula</span>
              <p className="text-[10px] font-normal text-slate-500 mt-1">Cochran, t-test, or Casagrande</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Step 3</span>
              <span>Minimum Completed Sample</span>
              <p className="text-[10px] font-normal text-slate-500 mt-1">Integer Ceiling (⌈n⌉)</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Step 4</span>
              <span>Recruitment Adjustment</span>
              <p className="text-[10px] font-normal text-slate-500 mt-1">Divide by Response Rate</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300">
              <span className="text-[10px] text-blue-400 block uppercase">Step 5</span>
              <span>Final Planning Target</span>
              <p className="text-[10px] font-normal text-slate-500 mt-1">Fieldwork Invitations</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
            Planning workflow: Design inputs determine the preliminary formula; the minimum required clean responses are ceiled; non-response rate adjustment calculates the gross invitation count.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STATISTICAL ASSUMPTIONS MATTER */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Statistical Assumptions Matter
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A sample-size result is only as meaningful as the assumptions behind it.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For surveys, consider whether the sampling method is consistent with the calculation. Complex designs such as cluster sampling can require a design effect and therefore a larger sample than simple random sampling. One clinical-research review specifically notes that design effects can increase the required sample when the sampling design differs from simple random sampling.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For experiments, specify the significance level, target effect, power, outcome variability, allocation, and statistical test.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For clinical studies, the primary outcome should drive the sample-size calculation. Expected variability for continuous outcomes and expected proportions for categorical outcomes can materially change the required sample.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* WHAT A SAMPLE SIZE RESULT DOES—AND DOES NOT—TELL YOU */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          What a Sample Size Result Does—and Does Not—Tell You
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A sample-size calculation tells you how many observations are required under the specified assumptions and statistical model.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          It does not tell you:
        </p>
        <ul className="space-y-1.5 pl-6 list-disc text-sm text-slate-700 dark:text-slate-300 font-medium">
          <li>whether the study will ultimately find a significant result</li>
          <li>whether the chosen effect size is scientifically meaningful</li>
          <li>whether participants will respond</li>
          <li>whether the sampling process is unbiased</li>
          <li>whether the population is normally distributed</li>
          <li>whether the planned statistical test is appropriate</li>
          <li>whether missing data will occur</li>
          <li>whether a clinical trial satisfies regulatory requirements</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Those are separate methodological questions. A good sample-size calculation is therefore one component of study design, not a substitute for study design.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-xs text-slate-500">
            Answers to 28 common questions about sample size determination, margin of error, and statistical power.
          </p>
        </div>

        <div className="space-y-4">
          {sample_size_calculatorFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-2xs space-y-2"
            >
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-start gap-2.5">
                <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 mt-0.5 shrink-0">
                  Q{idx + 1}
                </span>
                <span>{faq.question}</span>
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL TAKEAWAY */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Final Takeaway
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Sample size is a design decision built around a statistical objective.
        </p>
        <div className="space-y-2 pl-4 border-l-2 border-blue-500 text-slate-700 dark:text-slate-300">
          <p>For survey estimation, the major drivers are confidence level, margin of error, population size and the expected proportion.</p>
          <p>For continuous outcomes, variability and desired precision become central.</p>
          <p>For A/B testing and hypothesis testing, effect size, significance level and statistical power are essential.</p>
          <p>For recruitment planning, response rate or attrition may require an additional adjustment.</p>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The most useful sample-size calculation is therefore not simply the one that produces a number. It is the one whose formula, assumptions, inputs and interpretation match the question being studied.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          This calculator is designed to make those relationships visible: it provides the resulting sample size, supporting calculations, power visualization, benchmark comparisons and reverse margin-of-error analysis so the number can be understood rather than treated as a black-box recommendation.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* METHODOLOGY & DISCLAIMER */}
      {/* ========================================================================= */}
      <section className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-sm">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <span>Methodology &amp; Disclaimer</span>
        </div>
        <p>
          This calculator provides statistical estimates based on the selected calculation method and supplied assumptions. Results should be interpreted as planning values, not universal guarantees.
        </p>
        <p>
          For surveys, confirm that the sampling design and assumptions are appropriate for the intended population. For experiments and A/B tests, verify the statistical test, significance level, target difference, allocation and power assumptions. For clinical or regulated research, use the method required by the study protocol and applicable methodological guidance.
        </p>
        <p>
          A sample-size calculation does not guarantee response rate, representativeness, statistical significance, or scientific importance of an observed result.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* RELATED CALCULATORS — BOTTOM OF ARTICLE */}
      {/* ========================================================================= */}
      <section className="no-print p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-2">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
          Related Statistical Calculators:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <Link
            href="/calculators/standard-deviation-calculator"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 font-bold text-slate-800 dark:text-slate-200 transition-all shadow-2xs group"
          >
            <span>Standard Deviation Calculator</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/calculators/confidence-interval-calculator"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 font-bold text-slate-800 dark:text-slate-200 transition-all shadow-2xs group"
          >
            <span>Confidence Interval Calculator</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/calculators/z-score-calculator"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 font-bold text-slate-800 dark:text-slate-200 transition-all shadow-2xs group"
          >
            <span>Z-Score Calculator</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </article>
  );
}

export default SampleSizeContent;
