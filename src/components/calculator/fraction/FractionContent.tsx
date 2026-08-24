"use client";

import React from "react";
import Link from "next/link";

export function FractionContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      
      {/* 1. WHAT IS A FRACTION? */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. What Is a Fraction?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          In mathematics, a fraction represents a numerical quantity that is a part of a whole or, more generally, any number of equal parts. Expressed in the form <span className="font-mono font-semibold">a/b</span> (where <em>a</em> and <em>b</em> are integers and <em>b &ne; 0</em>), a fraction defines a dimensionless ratio between the numerator (<strong>a</strong>), representing the number of chosen equal parts, and the denominator (<strong>b</strong>), representing the total number of equal parts comprising the whole.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          For example, in the fraction <span className="font-mono font-semibold">3/8</span>, the numerator is 3 and the denominator is 8. A practical visual model is a circular pie cut into 8 equal slices: taking 3 slices leaves 5 slices remaining, representing <span className="font-mono font-semibold">5/8</span> of the total pie. The denominator can never equal 0, as division by zero is mathematically undefined. For proportions and part-to-part comparisons, explore the{" "}
          <Link href="/calculators/ratio-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Ratio Calculator
          </Link>.
        </p>
      </div>

      {/* 2. PROPER VS. IMPROPER FRACTIONS AND MIXED NUMBERS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Proper vs. Improper Fractions and Mixed Numbers
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Fractions are categorized into three primary structural forms depending on the relative magnitude of the numerator and denominator:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3">
          <li>
            <strong>Proper Fractions:</strong> Fractions where the absolute value of the numerator is strictly less than the denominator (|a| &lt; |b|). Proper fractions always represent a quantity strictly less than 1 (e.g., 3/4 = 0.75, 5/8 = 0.625).
          </li>
          <li>
            <strong>Improper Fractions:</strong> Fractions where the numerator is greater than or equal to the denominator (|a| &ge; |b|). Improper fractions represent values greater than or equal to 1 (e.g., 11/4 = 2.75).
          </li>
          <li>
            <strong>Mixed Numbers:</strong> A combination of an integer whole number and a proper fraction (e.g., 2 3/4). Mixed numbers provide intuitive real-world representations for physical measurements.
          </li>
        </ul>
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-center mt-3 space-y-1">
          <p className="font-semibold text-slate-900 dark:text-white">Converting Mixed Number (w a/b) to Improper Fraction:</p>
          <p>Improper Numerator = (w × b) + a &nbsp;&rarr;&nbsp; Result = (w × b + a) / b</p>
          <p className="text-blue-600 dark:text-blue-400">Example: 3 5/7 = (3 × 7 + 5) / 7 = 26/7</p>
        </div>
      </div>

      {/* 3. HOW TO ADD AND SUBTRACT FRACTIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. How to Add and Subtract Fractions
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Adding or subtracting fractions requires a common denominator baseline before performing arithmetic on the numerators. If the fractions already possess identical denominators (like denominators), simply add or subtract the numerators while retaining the common denominator.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          When denominators differ (unlike denominators), convert the fractions into equivalent fractions possessing a common denominator—preferably the Least Common Multiple (LCM) of the denominators:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-center mt-3 space-y-1">
          <p className="font-semibold text-slate-900 dark:text-white">a/b + c/d = (a × d + c × b) / (b × d)</p>
          <p className="text-blue-600 dark:text-blue-400">Example: 2/7 + 3/8 = (2 × 8 + 3 × 7) / (7 × 8) = (16 + 21) / 56 = 37/56</p>
        </div>
      </div>

      {/* 4. HOW TO MULTIPLY AND DIVIDE FRACTIONS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. How to Multiply and Divide Fractions
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Unlike addition and subtraction, multiplying fractions does not require finding a common denominator. Multiply the numerators together to form the new numerator, and multiply the denominators together to form the new denominator:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-center mt-3 space-y-1">
          <p className="font-semibold text-slate-900 dark:text-white">a/b × c/d = (a × c) / (b × d)</p>
          <p className="text-blue-600 dark:text-blue-400">Example: 2/3 × 3/4 = (2 × 3) / (3 × 4) = 6/12 = 1/2</p>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          To divide one fraction by another, multiply the first fraction (dividend) by the reciprocal of the second fraction (divisor). The reciprocal of a fraction is obtained by swapping its numerator and denominator:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-center mt-3 space-y-1">
          <p className="font-semibold text-slate-900 dark:text-white">a/b ÷ c/d = a/b × d/c = (a × d) / (b × c)</p>
          <p className="text-blue-600 dark:text-blue-400">Example: 3/4 ÷ 1/6 = 3/4 × 6/1 = 18/4 = 9/2 = 4 1/2</p>
        </div>
      </div>

      {/* 5. BUTTON & FUNCTION GUIDE */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          5. Fraction Calculator Button &amp; Function Guide
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">5.1 Numerator and Denominator Fields</h3>
            <p className="text-slate-600 dark:text-slate-300">
              The numerator is the number above the fraction bar and the denominator is the number below it. The denominator cannot be zero because division by zero is undefined.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">5.2 Addition (+)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Adds two fractions using the Least Common Denominator (LCD). Example: 2/7 + 3/8 becomes 16/56 + 21/56 = 37/56.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">5.3 Subtraction (−)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Subtracts fractions using a common denominator baseline. Example: 5/6 − 1/3 becomes 5/6 − 2/6 = 3/6 = 1/2.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">5.4 Multiplication (×)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Multiplies numerators and denominators straight across, then reduces. Example: 2/3 × 3/4 = 6/12 = 1/2.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">5.5 Division (÷)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Divides by multiplying by the reciprocal of the divisor. Example: 3/4 ÷ 1/6 = 3/4 × 6/1 = 18/4 = 9/2 = 4 1/2.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">5.6 Simplify</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Reduces fractions to lowest terms using the Greatest Common Divisor (GCD). Example: 217/98 reduces by 7 to 31/14 = 2 3/14.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">5.7 Mixed Number Input</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Accepts whole numbers and fractions: 2 3/4 converts to (2×4 + 3)/4 = 11/4. Negative mixed numbers like -2 3/4 are evaluated as -11/4.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">5.8 Decimal to Fraction</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Converts terminating decimals to exact fractions: 1.375 becomes 1375/1000 = 11/8 = 1 3/8.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">5.9 Fraction to Decimal</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Computes decimal approximations: 2/7 &approx; 0.28571428571429. For comprehensive decimal operations, see the{" "}
              <Link href="/calculators/scientific-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Scientific Calculator
              </Link>.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">5.10 Big Number Fraction Mode</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Uses arbitrary-precision <code>BigInt</code> arithmetic for 20+ digit integers, preventing precision loss beyond 2<sup>53</sup> - 1.
            </p>
          </div>
        </div>
      </div>

      {/* 6. HOW TO USE FOR DIFFERENT TYPES OF MATH */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          6. How to Use the Fraction Calculator for Different Types of Math
        </h2>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              6.1 Add Fractions with the Same Denominator: 3/8 + 2/8
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • Direct addition: (3 + 2) / 8 = <strong>5/8</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              6.2 Add Fractions with Different Denominators: 2/7 + 3/8
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • Convert to common denominator 56: 16/56 + 21/56 = <strong>37/56</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              6.3 Subtract Fractions: 5/6 − 1/3
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • Convert 1/3 to 2/6: 5/6 − 2/6 = 3/6 = <strong>1/2</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              6.4 Multiply Fractions: 2/3 × 9/10
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • Multiply straight across: 18/30, reduced by 6 = <strong>3/5</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              6.5 Divide Fractions: 3/4 ÷ 2/5
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • Multiply by reciprocal: 3/4 × 5/2 = 15/8 = <strong>1 7/8</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              6.6 Convert Mixed Number to Fraction: 3 5/7
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • Multiply whole number and add numerator: 3 × 7 + 5 = 26 &rarr; <strong>26/7</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              6.7 Convert Improper Fraction to Mixed Number: 31/14
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • Divide 31 by 14: quotient 2, remainder 3 &rarr; <strong>2 3/14</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              6.8 Simplify a Fraction: 84/126
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • GCD(84, 126) = 42 &rarr; 84÷42 / 126÷42 = <strong>2/3</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              6.9 Convert Decimal to Fraction: 1.375
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • 1375/1000 reduced by 125 = 11/8 = <strong>1 3/8</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              6.10 Work with Negative Fractions: -1/2 + 3/4
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • Convert -1/2 to -2/4 &rarr; -2/4 + 3/4 = <strong>1/4</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 7. USING FRACTIONS IN ALGEBRA, RATIOS & PERCENTAGES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          7. Using Fractions in Algebra, Ratios and Percentages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">7.1 Algebraic Simplification</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Simplifies constant coefficients in algebraic formulas (e.g., 3/4 + 5/8 = 11/8) while leaving variable manipulation exact. For powers and exponents, use the{" "}
              <Link href="/calculators/exponent-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Exponent Calculator
              </Link>.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">7.2 Ratio Calculations</h3>
            <p className="text-slate-600 dark:text-slate-300">
              A ratio such as 3:4 corresponds to 3/4. The fraction calculator simplifies ratios into exact reduced rational values.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">7.3 Percentage Calculations</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Converts fractions to percentages by multiplying decimal values by 100 (3/4 = 0.75 = 75%). For dedicated percentage solvers, try the{" "}
              <Link href="/calculators/percentage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Percentage Calculator
              </Link> or{" "}
              <Link href="/calculators/percent-error-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Percent Error Calculator
              </Link>.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">7.4 Geometry &amp; Right Triangles</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Slope and trigonometric ratios (rise/run) are rational proportions. For radical side lengths, see the{" "}
              <Link href="/calculators/root-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Root Calculator
              </Link> and{" "}
              <Link href="/calculators/pythagorean-theorem-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Pythagorean Theorem Calculator
              </Link>.
            </p>
          </div>
        </div>
      </div>

      {/* 8. MIXED NUMBERS, NEGATIVE VALUES & CANONICAL SIGN HANDLING */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          8. Mixed Numbers, Negative Values and Canonical Sign Handling
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Mixed numbers require special care because a leading whole number and fractional part form one unified quantity. A positive mixed number such as 2 3/4 means 2 + 3/4 = 11/4. A negative mixed number such as -2 3/4 represents -(2 + 3/4) = -11/4. It should not be misinterpreted as -2 + 3/4, which would equal -5/4.
        </p>
        <div className="bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-xl border border-blue-100 dark:border-blue-900/40 text-xs sm:text-sm mt-3 space-y-2">
          <p className="font-bold text-blue-900 dark:text-blue-300">
            Critical Negative Mixed Number Example: -2 3/4 + 3 5/7
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            • <strong>Convert to improper fractions:</strong> -2 3/4 = -11/4 and 3 5/7 = 26/7.<br />
            • <strong>Common denominator 28:</strong> (-11 × 7) / 28 + (26 × 4) / 28 = -77/28 + 104/28.<br />
            • <strong>Exact result:</strong> (-77 + 104) / 28 = <strong>27/28</strong> (Decimal: 0.9642857142857143).
          </p>
        </div>
      </div>

      {/* 9. GCD, LCM AND EXACT REDUCTION */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          9. GCD, LCM and Exact Reduction
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The greatest common divisor (GCD) is the largest positive integer that divides both the numerator and denominator without remainder. To simplify a fraction, divide both by the GCD. The Euclidean algorithm computes the GCD efficiently by repeatedly replacing a pair of integers with the smaller value and their remainder quotient: GCD(a, b) = GCD(b, a mod b).
        </p>
      </div>

      {/* 10. BIG NUMBER FRACTIONS AND WHY BIGINT MATTERS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          10. Big Number Fractions and Why BigInt Matters
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Standard JavaScript numbers lose exact integer precision once values exceed 2<sup>53</sup> - 1 (9,007,199,254,740,991). The Big Number Fraction module utilizes native arbitrary-precision <code>BigInt</code> arithmetic and an exact Euclidean reduction engine. This guarantees zero loss of precision during cross-multiplication, additions, and simplifications involving multi-digit extreme integers.
        </p>
      </div>

      {/* 11. DECIMAL CONVERSION: EXACT VS REPEATING */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          11. Decimal Conversion: Exact vs. Repeating
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Terminating decimals are represented exactly as fractions over powers of 10 before reduction (e.g., 1.375 = 1375/1000 = 11/8). In contrast, repeating fractions such as 1/3 (0.333333...) or 2/7 (0.285714...) have non-terminating decimal expansions. Keeping numbers in exact fractional form prevents the compounding rounding errors that occur when working with rounded decimals.
        </p>
      </div>

      {/* 12. BENCHMARK TABLE */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          12. Common Fraction Benchmark Reference Table
        </h2>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-slate-800 rounded-lg">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Fraction</th>
                <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Decimal Equivalent</th>
                <th className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              <tr><td className="py-2 px-3 font-bold">1/2</td><td className="py-2 px-3">0.5</td><td className="py-2 px-3 text-blue-600 dark:text-blue-400">50%</td></tr>
              <tr><td className="py-2 px-3 font-bold">1/3</td><td className="py-2 px-3">0.333333...</td><td className="py-2 px-3 text-blue-600 dark:text-blue-400">33.333...%</td></tr>
              <tr><td className="py-2 px-3 font-bold">1/4</td><td className="py-2 px-3">0.25</td><td className="py-2 px-3 text-blue-600 dark:text-blue-400">25%</td></tr>
              <tr><td className="py-2 px-3 font-bold">1/5</td><td className="py-2 px-3">0.2</td><td className="py-2 px-3 text-blue-600 dark:text-blue-400">20%</td></tr>
              <tr><td className="py-2 px-3 font-bold">1/8</td><td className="py-2 px-3">0.125</td><td className="py-2 px-3 text-blue-600 dark:text-blue-400">12.5%</td></tr>
              <tr><td className="py-2 px-3 font-bold">1/10</td><td className="py-2 px-3">0.1</td><td className="py-2 px-3 text-blue-600 dark:text-blue-400">10%</td></tr>
              <tr><td className="py-2 px-3 font-bold">3/4</td><td className="py-2 px-3">0.75</td><td className="py-2 px-3 text-blue-600 dark:text-blue-400">75%</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 13. METHODOLOGY & PRIVACY */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          13. Methodology, Privacy and Limitations
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>Client-Side Execution:</strong> All fraction calculations execute locally within your browser. Saved calculations are stored in browser localStorage on your local device.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          <strong>Educational Scope:</strong> The fraction calculator evaluates rational numbers and multi-digit BigInt proportions. It serves as an analytical learning tool and arithmetic verification engine.
        </p>
      </div>
    </article>
  );
}

export default FractionContent;
