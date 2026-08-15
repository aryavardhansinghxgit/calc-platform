"use client";

import React from "react";
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, Layers, ShieldCheck, Target, Award } from "lucide-react";

export function RoundingContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span>1. Introduction to the Rounding & Numerical Precision Suite</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Rounding Calculator & Numerical Precision Suite</strong> is a computational mathematics application designed to replace exact numbers with simplified, rounded values based on international standard rounding rules. Rounding is essential in financial accounting, engineering, data science, and scientific reporting.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This suite supports 6 dedicated calculation modes (Place Value/Decimals, Significant Figures, Nearest Fraction, Nearest Multiple, Swedish Cash Rounding, and Bulk Column CSV Rounding) alongside all 8 international rounding algorithms (including Banker's Rounding, Ceiling, Floor, Truncate, and Round Half Up).
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          <span>2. Mathematical Concept, Definitions & Terminology</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Numerical rounding is the process of adjusting the least significant digits of a real number to produce an approximation that is easier to record, calculate, or interpret:
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          {"x_rounded = round(x, placeValue, algorithm)"}
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
          Key Terminology & Definitions
        </h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
          <li>
            <strong>Target Rounding Digit:</strong> The digit residing at the place value to which the number is being rounded.
          </li>
          <li>
            <strong>Deciding (Test) Digit:</strong> The single digit immediately to the right of the target digit that determines whether to round up or down.
          </li>
          <li>
            <strong>Rounding Error (Delta Δ):</strong> The exact numerical difference between the rounded value and the original value (&Delta; = x_rounded - x_original).
          </li>
        </ul>
      </section>

      {/* 3. FORMULA SECTION & PLACE VALUE MATRIX */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" />
          <span>3. Complete Place Value Matrix (Billions to Millionths)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5">Place Name</th>
                <th className="p-2.5">Power of 10</th>
                <th className="p-2.5">Decimal Notation</th>
                <th className="p-2.5">Worked Example (1,234,567.891234)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50 font-mono">
              <tr>
                <td className="p-2 font-bold font-sans">Millions</td>
                <td className="p-2">10⁶</td>
                <td className="p-2">1,000,000</td>
                <td className="p-2 text-blue-600 font-bold">1,000,000</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">Thousands</td>
                <td className="p-2">10³</td>
                <td className="p-2">1,000</td>
                <td className="p-2 text-blue-600 font-bold">1,235,000</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">Hundreds</td>
                <td className="p-2">10²</td>
                <td className="p-2">100</td>
                <td className="p-2 text-blue-600 font-bold">1,234,600</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">Ones / Units</td>
                <td className="p-2">10⁰</td>
                <td className="p-2">1</td>
                <td className="p-2 text-blue-600 font-bold">1,234,568</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">Tenths</td>
                <td className="p-2">10⁻¹</td>
                <td className="p-2">0.1</td>
                <td className="p-2 text-blue-600 font-bold">1,234,567.9</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">Hundredths</td>
                <td className="p-2">10⁻²</td>
                <td className="p-2">0.01</td>
                <td className="p-2 text-blue-600 font-bold">1,234,567.89</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">Thousandths</td>
                <td className="p-2">10⁻³</td>
                <td className="p-2">0.001</td>
                <td className="p-2 text-blue-600 font-bold">1,234,567.891</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600" />
          <span>4. How the Calculation Works (Step-by-Step Breakdown)</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculation engine executes four processing steps during rounding:
        </p>

        <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-4 list-decimal">
          <li className="pl-2">
            <strong>Target Digit Identification:</strong> Locate the digit residing at the selected place value or sig fig index.
          </li>
          <li className="pl-2">
            <strong>Deciding Digit Inspection:</strong> Inspect the single digit directly to the right of the target digit.
          </li>
          <li className="pl-2">
            <strong>Tie-Breaking Rule Application:</strong> Apply the chosen algorithm (e.g. Round Half Up vs. Banker's Rounding half to even).
          </li>
          <li className="pl-2">
            <strong>Cascading Carry & Truncation:</strong> Handle cascading carries (such as 9.99 rounding up to 10.00) and truncate trailing decimal places.
          </li>
        </ol>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-blue-600" />
          <span>5. Worked Calculation Examples</span>
        </h2>

        <div className="space-y-4">
          {/* Example 1 */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600">
              Example 1 (Standard Round Half Up): Round 12.34567 to 2 Decimal Places
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Target Digit:</strong> 4 (Hundredths place).<br />
              <strong>Deciding Digit:</strong> 5 (Thousandths place).<br />
              <strong>Rule:</strong> Since 5 &ge; 5, round the target digit 4 UP to 5.<br />
              <strong>Result:</strong> <strong>12.35</strong>.
            </p>
          </div>

          {/* Example 2 */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600">
              Example 2 (Banker's Rounding vs. Standard): Round 2.5 and 3.5 to Ones
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Standard Round Half Up:</strong> 2.5 &rarr; 3, and 3.5 &rarr; 4 (always rounds 0.5 away from zero).<br />
              <strong>Banker's Rounding (Half to Even):</strong> 2.5 &rarr; <strong>2</strong> (even), and 3.5 &rarr; <strong>4</strong> (even).
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & 8-METHOD COMPARISON TABLE */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-blue-600" />
          <span>6. Complete 8-Method Rounding Algorithm Comparison</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5">Rounding Algorithm</th>
                <th className="p-2.5">5.5 &rarr; Ones</th>
                <th className="p-2.5">6.5 &rarr; Ones</th>
                <th className="p-2.5">-5.5 &rarr; Ones</th>
                <th className="p-2.5">-6.5 &rarr; Ones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50 font-mono">
              <tr>
                <td className="p-2 font-bold font-sans">Round Half Up (Standard)</td>
                <td className="p-2 font-bold text-blue-600">6</td>
                <td className="p-2 font-bold text-blue-600">7</td>
                <td className="p-2 font-bold text-blue-600">-6</td>
                <td className="p-2 font-bold text-blue-600">-7</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">Banker's (Half to Even)</td>
                <td className="p-2 font-bold text-emerald-600">6</td>
                <td className="p-2 font-bold text-emerald-600">6</td>
                <td className="p-2 font-bold text-emerald-600">-6</td>
                <td className="p-2 font-bold text-emerald-600">-6</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">Round Up (Ceiling ⌈x⌉)</td>
                <td className="p-2">6</td>
                <td className="p-2">7</td>
                <td className="p-2">-5</td>
                <td className="p-2">-6</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">Round Down (Floor ⌊x⌋)</td>
                <td className="p-2">5</td>
                <td className="p-2">6</td>
                <td className="p-2">-6</td>
                <td className="p-2">-7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <span>7. Common Errors & Edge Cases in Rounding</span>
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 1: Double Rounding Errors
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Never round sequentially in steps (e.g. 12.446 &rarr; 12.45 &rarr; 12.5). Always inspect the single deciding digit from the original unrounded value (12.446 &rarr; 12.4).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 2: Ignoring Floating-Point Representation Quirks
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              In IEEE 754 double-precision arithmetic, 0.1 + 0.2 equals 0.30000000000000004. High-precision string logic is necessary to prevent false rounding triggers.
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
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Financial Markets & Swedish Cash Rounding</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Cash transactions in countries like Canada, Australia, and New Zealand round sales totals to the nearest 5 cents to eliminate 1-cent coins.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Civil Engineering & Construction Tolerances</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Measurement blueprints round dimensions to the nearest 1/8", 1/16", or 1/32" on physical tape measures.
            </p>
          </div>
        </div>
      </section>

      {/* 9. RELATED MATHEMATICAL CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <span>9. Related Mathematical Concepts & Prerequisite Topics</span>
        </h2>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
          <li><strong>Significant Figures (Sig Figs):</strong> Rules for maintaining measurement precision in scientific experiments.</li>
          <li><strong>IEEE 754 Floating-Point Standard:</strong> The hardware standard defining binary floating-point rounding modes.</li>
        </ul>
      </section>

      {/* 10. SUMMARY */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
        <h2 className="text-lg font-extrabold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The <strong>Rounding Calculator & Numerical Precision Suite</strong> combines numerical precision with 8 international rounding algorithms. By supporting place values, sig figs, nearest fractions, Swedish cash rounding, and 2D number line visualizers, this suite functions as an authoritative calculation and learning resource.
        </p>
      </section>

    </div>
  );
}
