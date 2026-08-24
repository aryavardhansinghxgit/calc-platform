"use client";

import React from "react";
import Link from "next/link";

export function ScientificCalculatorContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      
      {/* 1. INTRODUCTION */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introduction
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          A <strong>scientific calculator</strong> is an advanced mathematical computing tool designed to evaluate continuous, transcendental, trigonometric, logarithmic, exponential, and combinatorial functions beyond elementary arithmetic. It enables students, engineers, and scientists to compute complex multi-step mathematical expressions with exact operator precedence and high floating-point precision.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-4 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-xl">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 text-xs uppercase tracking-wider mb-1">
              What It Does
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Evaluates non-linear functions, trigonometric ratios, natural &amp; base logarithms, arbitrary roots, factorials, and angle transformations with 64-bit precision.
            </p>
          </div>
          <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 rounded-xl">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 text-xs uppercase tracking-wider mb-1">
              Who Uses It
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Students, engineers, physicists, quantitative analysts, researchers, and data scientists solving algebraic, geometric, calculus, and physical equations.
            </p>
          </div>
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-xl">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-300 text-xs uppercase tracking-wider mb-1">
              Why It Matters
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Bridges discrete numeric counting and continuous mathematical modeling—essential for analyzing physical waveforms, growth curves, structural vectors, and probabilities.
            </p>
          </div>
        </div>
      </div>

      {/* 2. MATHEMATICAL CONCEPT & THEORETICAL FOUNDATION */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Mathematical Concept &amp; Theoretical Foundation
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Scientific computation extends elementary operations (+, −, ×, ÷) into real and complex analysis. The underlying theory relies on several core mathematical frameworks:
        </p>

        <div className="space-y-3 mt-4">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">Core Definitions</h3>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Transcendental Functions:</strong> Functions that cannot be expressed as a finite sequence of algebraic operations (e.g., sin(x), cos(x), ln(x), e<sup>x</sup>).
            </li>
            <li>
              <strong>Unit Circle Trigonometry:</strong> Defines trigonometric ratios (sin, cos, tan) on a cartesian circle x<sup>2</sup> + y<sup>2</sup> = 1 where angle &theta; maps to coordinates (x, y) = (cos &theta;, sin &theta;).
            </li>
            <li>
              <strong>Natural Exponent and Logarithm:</strong> Euler&apos;s constant e &approx; 2.718281828 serves as the unique continuous growth base where d/dx(e<sup>x</sup>) = e<sup>x</sup>. The natural logarithm ln(x) is its inverse function: ln(e<sup>x</sup>) = x.
            </li>
            <li>
              <strong>Radian vs. Degree Measures:</strong> 1 radian is the angle subtended at the center of a circle by an arc equal in length to the radius (2&pi; rad = 360&deg; &rArr; 1 rad = 180&deg;/&pi; &approx; 57.2958&deg;).
            </li>
          </ul>
        </div>

        <div className="space-y-2 mt-4">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">Fundamental Principles &amp; Identities</h3>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 font-mono text-xs">
            <div>• <strong>Pythagorean Trigonometric Identity:</strong> sin²(&theta;) + cos²(&theta;) = 1</div>
            <div>• <strong>Euler&apos;s Identity:</strong> e^(i&pi;) + 1 = 0</div>
            <div>• <strong>Logarithmic Base Change:</strong> log<sub>b</sub>(x) = ln(x) / ln(b)</div>
            <div>• <strong>Inverse Exponential Rule:</strong> x<sup>y</sup> = e^(y · ln(x)) (for x &gt; 0)</div>
          </div>
        </div>
      </div>

      {/* 3. FORMULAS & SERIES EXPANSIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Formulas &amp; Series Expansions
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Scientific functions rely on analytical definitions and infinite series representations for high-precision numerical evaluation:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Trigonometric Taylor Series
            </h3>
            <div className="font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <p>sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + ...</p>
              <p>cos(x) = 1 - x²/2! + x⁴/4! - x⁶/6! + ...</p>
              <p>tan(x) = sin(x) / cos(x)</p>
            </div>
            <p className="text-slate-500 dark:text-slate-400">Variables: x in radians. Taylor expansion converges for all real x.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
            <h3 className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Exponential &amp; Logarithmic Series
            </h3>
            <div className="font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <p>e^x = 1 + x + x²/2! + x³/3! + ...</p>
              <p>ln(x) = &int;₁ˣ (1/t) dt (for x &gt; 0)</p>
              <p>log₁₀(x) = ln(x) / ln(10)</p>
            </div>
            <p className="text-slate-500 dark:text-slate-400">Variables: x &gt; 0 for logarithms; all real x for exponents.</p>
          </div>
        </div>
      </div>

      {/* 4. BUTTON & FUNCTION GUIDE */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Scientific Calculator Button &amp; Function Guide
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          This section explains the exact purpose, syntax, and operational workflow of every primary button family on the scientific calculator:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.1 Number Keys &amp; Decimal Point</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Use keys 0 through 9 to enter values and the decimal point for fractions (e.g., 25, 3.14, 0.005). Keep the decimal point inside the number without thousands separators.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.2 Arithmetic (+, −, ×, ÷)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Standard arithmetic operations. Combine with parentheses for grouping: 250 × 0.18 computes an 18% rate, while (250 + 50) × 0.18 applies the rate to the sum.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.3 Parentheses ( )</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Explicitly controls evaluation order. For instance, 2 × (15 + 5) = 40, whereas 2 × 15 + 5 = 35 because multiplication precedes addition.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.4 Power / Exponent (^)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Raises numbers to any power: 2^10 = 1024, 10^-3 = 0.001. When raising a negative base, wrap it in parentheses: (-3)^2 = 9, whereas -3^2 = -9. Explore the{" "}
              <Link href="/calculators/exponent-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Exponent Calculator
              </Link>.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.5 Square Root &amp; General Roots</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Evaluates square roots (sqrt(144) = 12), cube roots (cbrt(27) = 3), and arbitrary nth roots (yroot(81, 4) = 3). For advanced radical simplification, check the{" "}
              <Link href="/calculators/root-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Root Calculator
              </Link>.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.6 Factorial (!)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Computes products of descending positive integers: 5! = 120, 10! = 3,628,800. Values above 170! safely report floating-point overflow.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.7 Sine, Cosine &amp; Tangent</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Calculates primary trigonometric ratios. Select DEG mode for degrees (sin(30) = 0.5), RAD for radians (sin(&pi;/6) = 0.5), or GRAD for gradians (sin(100) = 1).
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.8 Inverse Trig (asin, acos, atan)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Finds angles from side ratios: atan(1) yields 45° in DEG, &pi;/4 in RAD, and 50 grads in GRAD mode.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.9 Logarithms (log &amp; ln)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Common base-10 log (log(1000) = 3) and natural log (ln(e) = 1). For custom bases, use ln(x)/ln(b) or visit the{" "}
              <Link href="/calculators/log-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Log Calculator
              </Link>.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.10 Constants (&pi; &amp; e)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Exact mathematical constants: &pi; &approx; 3.141592653589793 and e &approx; 2.718281828459045, maintaining full precision throughout multi-step chains.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.11 Memory (M+, M-, MR, MC)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              M+ accumulates into memory, M- subtracts, MR recalls stored value, and MC clears the register. Store/Recall enables caching intermediate coefficients.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.12 FIX &amp; SCI Display Modes</h3>
            <p className="text-slate-600 dark:text-slate-300">
              FIX formats fixed decimal places for standard numbers, while SCI represents values in normalized scientific notation (a × 10<sup>b</sup>).
            </p>
          </div>
        </div>
      </div>

      {/* 5. HOW TO USE FOR COMMON MATH PROBLEMS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          5. How to Use the Scientific Calculator for Common Math Problems
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          A step-by-step problem-solving guide showing exact expression structures, required modes, and expected mathematical outputs:
        </p>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.1 Basic Arithmetic Expression: (25 + 15) × 0.18
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Workflow:</strong> Enter &apos;(&apos;, 25, &apos;+&apos;, 15, &apos;)&apos;, &apos;*&apos;, 0.18, &apos;=&apos;.<br />
              • <strong>Result:</strong> <strong>7.2</strong> (Parentheses force addition before multiplication).
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.2 Percentage Calculation: Find 18% of 250
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Workflow:</strong> 250 * 18 / 100 or 250 * 0.18.<br />
              • <strong>Result:</strong> <strong>45</strong>. For more percentage workflows, explore the{" "}
              <Link href="/calculators/percentage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Percentage Calculator
              </Link>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.3 Pythagorean Theorem: Right triangle with legs 3 and 4
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Workflow:</strong> sqrt(3^2 + 4^2).<br />
              • <strong>Result:</strong> <strong>5</strong>. For geometric solutions, visit the{" "}
              <Link href="/calculators/pythagorean-theorem-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Pythagorean Theorem Calculator
              </Link> and{" "}
              <Link href="/calculators/triangle-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Triangle Calculator
              </Link>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.4 Find a Missing Right-Triangle Angle: Opposite = 3, Adjacent = 4
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Workflow in DEG mode:</strong> atan(3 / 4).<br />
              • <strong>Result:</strong> <strong>&approx; 36.8699°</strong> (In RAD mode, yields &approx; 0.6435 rad).
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.5 Compound Interest: $2,000 at 5% annually for 10 years
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Workflow:</strong> 2000 * (1.05)^10.<br />
              • <strong>Result:</strong> <strong>&approx; $3,257.79</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.6 Exponential Decay: 100 × e^(-0.05 × 10)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Workflow:</strong> 100 * exp(-0.05 * 10).<br />
              • <strong>Result:</strong> <strong>&approx; 60.6531</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.7 Scientific Notation / Very Small Values: 3.2 × 10^-7
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Workflow:</strong> 3.2 * 10^(-7) (Select SCI display for normalized output).<br />
              • <strong>Result:</strong> <strong>3.2000e-7</strong> (0.00000032).
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.8 Logarithmic Base Conversion: log₂(32)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Workflow:</strong> ln(32) / ln(2) or log(32) / log(2).<br />
              • <strong>Result:</strong> <strong>5</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.9 Combinatorics &amp; Probability: 10 Choose 3
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Workflow:</strong> 10! / (3! * 7!) or nCr(10, 3).<br />
              • <strong>Result:</strong> <strong>120</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.10 Weighted Average: (80×2 + 90×3) ÷ (2 + 3)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Workflow:</strong> (80*2 + 90*3) / (2 + 3).<br />
              • <strong>Result:</strong> <strong>86</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.11 Unit-Conversion Arithmetic: 72 km/h to m/s
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Workflow:</strong> 72 * 1000 / 3600.<br />
              • <strong>Result:</strong> <strong>20 m/s</strong>. For exact fraction representations, try the{" "}
              <Link href="/calculators/fraction-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Fraction Calculator
              </Link>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.12 Multi-Step Engineering Formula: v = d / t = 150 / 12.5
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Workflow:</strong> 150 / 12.5 = 12; subsequent sqrt(12^2 + 3^2) &approx; <strong>12.3693</strong> without intermediate rounding.
            </p>
          </div>
        </div>
      </div>

      {/* 6. HOW TO USE IT FOR EQUATIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          6. How to Use It for Equations — What It Can and Cannot Do
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          A scientific calculator and a symbolic equation solver are related but distinct tools. This scientific calculator is a high-precision <strong>numerical expression evaluator</strong>: it computes numerical values once numbers and functions are entered.
        </p>
        <div className="space-y-3 mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <p>
            • <strong>Linear Equations (e.g., 3x + 7 = 25):</strong> Rearrange the equation algebraically by hand (3x = 18 &rArr; x = 18 ÷ 3). Use the scientific calculator to compute the numerical division 18 ÷ 3 = 6.
          </p>
          <p>
            • <strong>Quadratic Equations (e.g., x² - 5x + 6 = 0):</strong> Factor manually as (x - 2)(x - 3) = 0, and use the calculator to verify candidate roots by substitution: 2^2 - 5*2 + 6 = 0 and 3^2 - 5*3 + 6 = 0.
          </p>
          <p>
            • <strong>Iterative Approximations:</strong> Evaluate trial values to inspect function residuals. Note that the calculator evaluates expressions and does not autonomously perform symbolic equation rearranging.
          </p>
        </div>
      </div>

      {/* 7. HOW TO COMBINE FUNCTIONS IN ONE EXPRESSION */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          7. How to Combine Functions in One Expression
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 font-mono text-xs">
          <div>• <strong>Geometry:</strong> sqrt(a^2 + b^2)</div>
          <div>• <strong>Trigonometry:</strong> atan(opposite / adjacent)</div>
          <div>• <strong>Compound Growth:</strong> P * (1 + r)^n</div>
          <div>• <strong>Continuous Growth / Decay:</strong> P * exp(k * t)</div>
          <div>• <strong>Custom Base Logarithm:</strong> ln(x) / ln(b)</div>
          <div>• <strong>Weighted Average:</strong> (x1*w1 + x2*w2) / (w1 + w2)</div>
          <div>• <strong>Scientific Notation:</strong> a * 10^n</div>
          <div>• <strong>Probability / Combinatorics:</strong> n! / (r! * (n-r)!)</div>
        </div>
      </div>

      {/* 8. REPEATABLE WORKFLOW */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          8. A Repeatable Workflow for Any Scientific-Calculator Problem
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Identify the problem type:</strong> Arithmetic, angle, logarithm, exponent, root, probability, geometry, or rate calculation.</li>
          <li><strong>Write down the formula</strong> before entering values into the calculator.</li>
          <li><strong>Select the angle mode:</strong> Choose DEG, RAD, or GRAD before computing trigonometric functions.</li>
          <li><strong>Add parentheses</strong> around numerators, denominators, powers, and composite radicands.</li>
          <li><strong>Enter the complete expression</strong> without rounding intermediate numbers.</li>
          <li><strong>Evaluate and review</strong> the result in FIX or SCI display mode.</li>
          <li><strong>Sanity-check</strong> the magnitude, unit scale, and signage of the final answer.</li>
        </ol>
      </div>

      {/* 9. DETAILED MATHEMATICAL CONTENT & EDGE CASES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          9. Detailed Mathematical Content &amp; Edge Cases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">9.1 Order of Operations &amp; Negative Powers</h3>
            <p className="text-slate-600 dark:text-slate-300">
              The parser enforces strict standard precedence: exponentiation occurs before unary negation. Thus, -3^2 = -(3^2) = -9, while (-3)^2 = 9. Always wrap negative bases in parentheses when squaring.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">9.2 Trig Domains &amp; Asymptotes</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Sine and cosine are defined for all real numbers with range [-1, 1]. Tangent is undefined at odd multiples of 90° (&pi;/2). Real inverse sine/cosine accept inputs only in [-1, 1].
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">9.3 Logarithm Domains</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Real logarithms require strictly positive inputs (x &gt; 0). Inputs such as ln(0) or log(-5) produce clear undefined domain errors.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">9.4 Floating-Point IEEE-754 Precision</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Uses standard 64-bit IEEE-754 double precision (53 mantissa bits, &approx; 15–17 decimal digits), eliminating display artifacts through clean output rounding.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 sm:col-span-2">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">9.5 Factorial Growth &amp; Overflow Limits</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Factorial grows super-exponentially: 170! &approx; 7.2574 × 10<sup>306</sup> is the largest representable double-precision factorial. Values &ge; 171! exceed 1.7977 × 10<sup>308</sup> and safely trigger overflow handling.
            </p>
          </div>
        </div>
      </div>

      {/* 10. VISUAL UNDERSTANDING & REFERENCE TABLES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          10. Visual Understanding &amp; Reference Tables
        </h2>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-slate-800 rounded-lg">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Function</th>
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Domain (Input x)</th>
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Range (Output y)</th>
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Asymptotes / Key Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-3 font-mono font-medium">sin(x), cos(x)</td>
                <td className="py-2 px-3 font-mono">(-∞, +∞)</td>
                <td className="py-2 px-3 font-mono">[-1, 1]</td>
                <td className="py-2 px-3">Periodic (2&pi;), continuous everywhere</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-medium">tan(x)</td>
                <td className="py-2 px-3 font-mono">x &ne; &pi;/2 + k&pi;</td>
                <td className="py-2 px-3 font-mono">(-∞, +∞)</td>
                <td className="py-2 px-3">Vertical asymptotes at odd multiples of &pi;/2</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-medium">arcsin(x), arccos(x)</td>
                <td className="py-2 px-3 font-mono">[-1, 1]</td>
                <td className="py-2 px-3 font-mono">[-&pi;/2, &pi;/2] / [0, &pi;]</td>
                <td className="py-2 px-3">Principal branch real outputs</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-medium">ln(x), log₁₀(x)</td>
                <td className="py-2 px-3 font-mono">(0, +∞)</td>
                <td className="py-2 px-3 font-mono">(-∞, +∞)</td>
                <td className="py-2 px-3">Vertical asymptote at x = 0, ln(1) = 0</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-medium">e^x</td>
                <td className="py-2 px-3 font-mono">(-∞, +∞)</td>
                <td className="py-2 px-3 font-mono">(0, +∞)</td>
                <td className="py-2 px-3">Horizontal asymptote at y = 0, e^0 = 1</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-medium">x! (Factorial)</td>
                <td className="py-2 px-3 font-mono">Non-negative integers</td>
                <td className="py-2 px-3 font-mono">[1, +∞)</td>
                <td className="py-2 px-3">Double float overflow at n &gt; 170</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 11. WORKED EXAMPLES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          11. Worked Examples
        </h2>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Worked Example 1: Evaluating Trigonometric Ratio sin(30°)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Step 1:</strong> Convert 30° to radians: &theta; = 30 × (&pi; / 180) = &pi; / 6 &approx; 0.52359877 rad.<br />
              • <strong>Step 2:</strong> Evaluate sine series: sin(&pi;/6) = 0.5.<br />
              → <strong>Result: 0.5</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Worked Example 2: Logarithmic Base Change &amp; Power: log₁₀(500) + 2^5
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Step 1:</strong> log₁₀(500) = ln(500) / ln(10) &approx; 6.2146081 / 2.3025851 &approx; 2.6989700.<br />
              • <strong>Step 2:</strong> 2^5 = 32.<br />
              • <strong>Step 3:</strong> Sum: 2.6989700 + 32 = 34.6989700.<br />
              → <strong>Result: 34.69897</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Worked Example 3: Radioactive Decay Half-Life: N(t) = N₀ e^(-&lambda;t)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Problem:</strong> N₀ = 100 g, N(t) = 25 g, &lambda; = 0.05 day⁻¹. Find elapsed time t.<br />
              • <strong>Step 1:</strong> Ratio: N(t)/N₀ = 25 / 100 = 0.25.<br />
              • <strong>Step 2:</strong> Take natural log: ln(0.25) = -&lambda;t &rArr; -1.38629436 = -0.05 t.<br />
              • <strong>Step 3:</strong> Solve for t: t = -1.38629436 / -0.05 &approx; 27.725887 days.<br />
              → <strong>Result: t &approx; 27.726 days</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 12. METHODOLOGY & PRIVACY */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          12. Methodology, Privacy and Limitations
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>Computation Engine:</strong> All mathematical evaluations are executed entirely client-side inside your web browser using JavaScript IEEE-754 64-bit double-precision floating-point arithmetic. Calculation history and memory registers are stored in local browser memory.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          <strong>Limitations:</strong> This tool is an analytical and educational numerical expression evaluator, not a substitute for professional engineering or symbolic computer algebra systems (CAS). For dedicated specialized calculations, use the verified related modules listed below.
        </p>
      </div>
    </article>
  );
}

export default ScientificCalculatorContent;
