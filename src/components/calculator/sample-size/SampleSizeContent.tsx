"use client";

import React from "react";
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, Layers, ShieldCheck, Target, Award } from "lucide-react";

export function SampleSizeContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span>1. Introduction to the Sample Size Suite</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Sample Size Calculator & Statistical Power Analysis Suite</strong> is a computational biostatistics tool designed to estimate minimum respondent counts and statistical power across survey research, clinical trials, A/B conversion experiments, and continuous mean estimations.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This suite supports 6 dedicated calculation modes (Survey & Proportion Mode + FPC, Continuous Mean / SD Mode, Hypothesis Testing & Power Analysis, Two Proportions A/B Testing, Non-Response Attrition Adjuster, and Reverse Margin of Error Solver) with interactive SVG statistical power curves and APA justification generators.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          <span>2. Mathematical Concept & Sampling Theory</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Sample size determination calculates the minimum number of observations required to draw statistically valid inferences about a larger population. Grounded in the <strong>Central Limit Theorem (CLT)</strong>, random sampling ensures that sample statistics converge toward true population parameters as sample size increases.
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          {"Higher Sample Size (n) = Narrower Margin of Error (±e) & Greater Power (1 - β)"}
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" />
          <span>3. Core Sample Size Formulas</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">1. Cochran's Infinite Population Formula</h4>
            <p className="font-mono text-sm font-bold">{"n₀ = [ Z² · p(1 - p) ] / e²"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Standard benchmark formula for large survey populations.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">2. Finite Population Correction (FPC)</h4>
            <p className="font-mono text-sm font-bold">{"n = n₀ / [ 1 + (n₀ - 1) / N ]"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Adjusts sample size downward when sampling from a known finite population N.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">3. Continuous Mean Sample Size</h4>
            <p className="font-mono text-sm font-bold">{"n = [ (Z · σ) / E ]²"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Used when estimating continuous parameters (e.g. height, income, blood pressure).</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">4. A/B Testing Conversion Formula</h4>
            <p className="font-mono text-sm font-bold">{"n = [ (Z_α/2 + Z_β)² · [p₁(1-p₁) + p₂(1-p₂)] ] / (p₁ - p₂)²"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Determines required visitors per variant in website A/B conversion tests.</p>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600" />
          <span>4. How the Calculation Works (4 Operational Steps)</span>
        </h2>

        <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-4 list-decimal">
          <li className="pl-2">
            <strong>Determine Critical Z-Score:</strong> Map chosen confidence level (e.g. 95% &rArr; Z = 1.960).
          </li>
          <li className="pl-2">
            <strong>Compute Base Uncorrected Sample (n₀):</strong> Apply Cochran's proportion formula using maximum variance (p = 0.5).
          </li>
          <li className="pl-2">
            <strong>Apply Finite Population Correction (FPC):</strong> If population N is finite, scale sample size downward.
          </li>
          <li className="pl-2">
            <strong>Adjust for Response & Attrition Rates:</strong> Divide clean sample size by expected response rate to get gross recruitment target.
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
            Example: Survey with 95% Confidence, &plusmn;5% MOE, Population N = 1,000
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            Step 1: Z = 1.960 for 95% Confidence Level.<br />
            Step 2: Base n₀ = (1.960&sup2; &middot; 0.5 &middot; 0.5) / (0.05&sup2;) = 384.16 &approx; 385.<br />
            Step 3: FPC Adjustment for N = 1,000:<br />
            n = 385 / [ 1 + (384 / 1000) ] = 385 / 1.384 = <strong>278 Respondents</strong>.
          </p>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & BENCHMARK MATRIX */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-blue-600" />
          <span>6. Visual Understanding & Sample Size Benchmark Matrix</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5">Population (N)</th>
                <th className="p-2.5">95% Conf, &plusmn;5% MOE</th>
                <th className="p-2.5">95% Conf, &plusmn;3% MOE</th>
                <th className="p-2.5">99% Conf, &plusmn;1% MOE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50 font-mono">
              <tr>
                <td className="p-2 font-bold text-slate-900 dark:text-slate-100">100</td>
                <td className="p-2 text-blue-600 font-bold">80</td>
                <td className="p-2">92</td>
                <td className="p-2">99</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-slate-900 dark:text-slate-100">1,000</td>
                <td className="p-2 text-blue-600 font-bold">278</td>
                <td className="p-2">516</td>
                <td className="p-2">906</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-slate-900 dark:text-slate-100">100,000+ (Infinite)</td>
                <td className="p-2 text-blue-600 font-bold">384</td>
                <td className="p-2">1,067</td>
                <td className="p-2">16,587</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <span>7. Common Errors in Sample Size Determination</span>
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 1: Overestimating the Importance of Large Population Sizes (N)
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Sample size plateaus once population N exceeds 50,000. A sample of ~384 is equally valid for 100,000 people as it is for 300 million people.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 2: Ignoring Survey Non-Response and Participant Attrition
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              If your calculated sample is n = 384 and expected response rate is 20%, you must invite 1,920 people to reach your target.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="h-6 w-6 text-blue-600" />
          <span>8. Real-World Applications Across Fields</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Political Polling & Market Research</h4>
            <p className="text-slate-600 dark:text-slate-400">
              National public presidential polls survey 1,000 to 2,000 voters to achieve a &plusmn;2% to &plusmn;3% margin of error.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Clinical Trials & FDA Approvals</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Phase II/III pharmaceutical trials require 80% to 90% statistical power to detect drug efficacy without exposing excess patients.
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
          <li><strong>Type I (&alpha;) & Type II (&beta;) Errors:</strong> Balancing false positives (&alpha; = 0.05) vs false negatives (&beta; = 0.20).</li>
          <li><strong>Statistical Power (1 - &beta;):</strong> The probability of detecting a true effect when one exists.</li>
        </ul>
      </section>

      {/* 10. SUMMARY */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
        <h2 className="text-lg font-extrabold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The <strong>Sample Size Calculator & Statistical Power Analysis Suite</strong> equips researchers, biostatisticians, and product managers to design experimental studies with rigorous statistical power. Featuring Cochran's formula, FPC adjustments, SVG power curves, and APA methodology text generators, this suite functions as an authoritative reference.
        </p>
      </section>

    </div>
  );
}
