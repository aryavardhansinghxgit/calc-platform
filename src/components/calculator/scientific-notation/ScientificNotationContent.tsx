"use client";

import React from "react";
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, Layers, ShieldCheck, Target, Award } from "lucide-react";

export function ScientificNotationContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span>1. Introduction to the Scientific Notation Suite</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Scientific Notation Calculator & Converter Suite</strong> is an advanced computational mathematics tool engineered to calculate and convert numbers across scientific notation, engineering notation, standard decimal form, E-notation, and short scale word representations.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This suite supports 4 dedicated calculation modes (Arithmetic Solver, Instant Multi-Format Converter, Significant Figures Mode, and Physical Constants Library) with adjustable precision (1 to 16 decimal places) and complete step-by-step mathematical derivations.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          <span>2. Mathematical Concept, Definitions & Standard Form</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Scientific notation is a standardized representation for expressing real numbers that are either extremely large or extremely small:
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          {"N = a × 10^b  where 1 ≤ |a| < 10 and b ∈ ℤ"}
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
          The Anatomy of Scientific Notation
        </h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
          <li>
            <strong>Significand / Mantissa (a):</strong> The real coefficient whose absolute value satisfies 1 &le; |a| &lt; 10.
          </li>
          <li>
            <strong>Exponent / Order of Magnitude (b):</strong> An integer specifying the power of 10 by which the mantissa is multiplied.
          </li>
        </ul>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" />
          <span>3. Core Arithmetic Formulas & Laws of Exponents</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">1. Multiplication Rule</h4>
            <p className="font-mono text-sm font-bold">{"(a × 10ᵐ) × (c × 10ⁿ) = (a · c) × 10ᵐ⁺ⁿ"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Multiply mantissas and add exponents.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">2. Division Rule</h4>
            <p className="font-mono text-sm font-bold">{"(a × 10ᵐ) / (c × 10ⁿ) = (a / c) × 10ᵐ⁻ⁿ"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Divide mantissas and subtract exponents.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">3. Addition & Subtraction Alignment</h4>
            <p className="font-mono text-sm font-bold">{"a × 10ᵏ ± c × 10ᵏ = (a ± c) × 10ᵏ"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Exponents must be aligned to the same power of 10 prior to adding.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">4. Engineering Notation Rule</h4>
            <p className="font-mono text-sm font-bold">{"a × 10ᵇ  where b mod 3 = 0"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Exponent b must be a multiple of 3 to align with SI metric prefixes.</p>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600" />
          <span>4. How the Calculation Works (Step-by-Step Breakdown)</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculation engine executes four analytical stages:
        </p>

        <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-4 list-decimal">
          <li className="pl-2">
            <strong>Input Parsing & Exponent Extraction:</strong> Raw strings, decimal numbers, or E-notation values are parsed into Mantissa (a) and Exponent (b).
          </li>
          <li className="pl-2">
            <strong>Exponent Alignment (Addition/Subtraction):</strong> Terms are scaled to share the highest common exponent.
          </li>
          <li className="pl-2">
            <strong>Arithmetic Evaluation:</strong> Operating on mantissas and exponents according to exponent laws.
          </li>
          <li className="pl-2">
            <strong>Re-Normalization:</strong> Adjusting the resulting mantissa so 1 &le; |a| &lt; 10 and incrementing/decrementing exponent b accordingly.
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
              Example 1 (Multiplication): (1.432 &times; 10&#178;) &times; (8.0 &times; 10&#185;)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              Step 1: Multiply mantissas: 1.432 &times; 8.0 = 11.456<br />
              Step 2: Add exponents: 10&#178;&#43;&#185; = 10&#179;<br />
              Step 3: Normalize: 11.456 &times; 10&#179; = <strong>1.1456 &times; 10&#8308;</strong>.
            </p>
          </div>

          {/* Example 2 */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600">
              Example 2 (Addition): (1.432 &times; 10&#178;) + (8.0 &times; 10&#185;)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              Step 1: Align exponents to 10&#178;: 8.0 &times; 10&#185; = 0.80 &times; 10&#178;<br />
              Step 2: Add mantissas: 1.432 + 0.80 = 2.232<br />
              Step 3: Combine: <strong>2.232 &times; 10&#178;</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & SI METRIC PREFIX MATRIX */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-blue-600" />
          <span>6. SI Metric Prefixes & Powers of 10 Matrix</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5">Power of 10</th>
                <th className="p-2.5">SI Prefix Name</th>
                <th className="p-2.5">Symbol</th>
                <th className="p-2.5">Decimal Notation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50 font-mono">
              <tr>
                <td className="p-2 font-bold font-sans">10⁹</td>
                <td className="p-2 text-blue-600 font-bold">Giga</td>
                <td className="p-2 font-bold">G</td>
                <td className="p-2">1,000,000,000</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">10⁶</td>
                <td className="p-2 text-blue-600 font-bold">Mega</td>
                <td className="p-2 font-bold">M</td>
                <td className="p-2">1,000,000</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">10³</td>
                <td className="p-2 text-blue-600 font-bold">Kilo</td>
                <td className="p-2 font-bold">k</td>
                <td className="p-2">1,000</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">10⁻³</td>
                <td className="p-2 text-emerald-600 font-bold">Milli</td>
                <td className="p-2 font-bold">m</td>
                <td className="p-2">0.001</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">10⁻⁶</td>
                <td className="p-2 text-emerald-600 font-bold">Micro</td>
                <td className="p-2 font-bold">&mu;</td>
                <td className="p-2">0.000001</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">10⁻⁹</td>
                <td className="p-2 text-emerald-600 font-bold">Nano</td>
                <td className="p-2 font-bold">n</td>
                <td className="p-2">0.000000001</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <span>7. Common Errors & Edge Cases in Scientific Notation</span>
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 1: Leaving Mantissa Out of 1 &le; |a| &lt; 10 Range
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Expressions like 15.6 &times; 10&#8308; are not normalized scientific notation. They must be re-normalized to 1.56 &times; 10&#8309;.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 2: Adding Mantissas Without Aligning Exponents
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              (2 &times; 10&#179;) + (3 &times; 10&#178;) is NOT 5 &times; 10&#181;. You must align exponents first: (2 &times; 10&#179;) + (0.3 &times; 10&#179;) = 2.3 &times; 10&#179;.
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
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Astronomy & Cosmology</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Interstellar distances (1 light-year &approx; 9.46 &times; 10&#185;&#178; km) and solar mass (1.989 &times; 10&#179;&#8070; kg).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Quantum Mechanics & Particle Physics</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Subatomic mass of electron (9.1094 &times; 10&#8722;&#179;&sup1; kg) and Planck's constant (6.6261 &times; 10&#8722;&#179;&#8308; J&middot;s).
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
          <li><strong>Significant Figures (Sig Figs):</strong> Precision rules governing physical laboratory measurements.</li>
          <li><strong>Orders of Magnitude & Logarithms:</strong> Logarithmic scaling and power laws.</li>
        </ul>
      </section>

      {/* 10. SUMMARY */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
        <h2 className="text-lg font-extrabold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The <strong>Scientific Notation Calculator & Converter Suite</strong> bridges extreme scales of physical reality with mathematical precision. Supporting normalized scientific form, engineering SI prefixes, E-notation, and physical constants presets, this suite functions as an authoritative calculation and learning resource.
        </p>
      </section>

    </div>
  );
}
