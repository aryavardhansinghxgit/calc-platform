"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Layers,
  ShieldCheck,
  Target,
  Sliders,
  Sparkles,
  HelpCircle,
  Award,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Table as TableIcon
} from "lucide-react";

export function RootContent() {
  return (
    <article className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      
      {/* RELATED CALCULATORS BLOCK (ABOVE CONTENT) */}
      <div className="no-print bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 font-semibold space-y-1.5">
        <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block text-[11px]">
          RELATED CALCULATORS:
        </span>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-blue-600 dark:text-blue-400">
          <Link href="/calculators/exponent-calculator" className="hover:underline font-semibold">
            Exponent Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link href="/calculators/scientific-calculator" className="hover:underline font-semibold">
            Scientific Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link href="/calculators/pythagorean-theorem-calculator" className="hover:underline font-semibold">
            Pythagorean Theorem Calculator &amp; Right Triangle Solver
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link href="/calculators/factor-calculator" className="hover:underline font-semibold">
            Factor Calculator &amp; Prime Factorization
          </Link>
        </div>
      </div>

      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600 shrink-0" />
          <span>1. Introduction to Roots, Radicals, and the Root Calculator</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Roots are the inverse operation of powers. Instead of asking what a number becomes when it is raised to a power, a root asks which number produces the given value when raised to a specified power.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The general nth-root notation is:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          ⁿ√x
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Here, <em>x</em> is the radicand and <em>n</em> is the root index, or degree. The expression means that we are looking for a number <em>y</em> such that:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-slate-800 dark:text-slate-200">
          yⁿ = x
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For example:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
          √25 = 5 &nbsp; (because 5² = 25)
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Likewise:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
          ∛27 = 3 &nbsp; (because 3³ = 27)
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This Root Calculator handles square roots, cube roots, and higher-order roots from the same underlying idea. It can return a decimal approximation for a root, identify an exact simplified radical where one exists, and show the mathematical steps used to obtain the result.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For example:
        </p>
        <div className="bg-blue-50 dark:bg-blue-950/40 p-3.5 rounded-xl border border-blue-200 dark:border-blue-800 text-center font-mono text-sm font-extrabold text-blue-900 dark:text-blue-200">
          √72 = 6√2 ≈ 8.485281
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The exact form is often more useful in algebra because it preserves the mathematical structure of the answer, while the decimal form is useful when a numerical approximation is required.
        </p>
      </section>

      {/* 2. WHAT THE PARTS OF A RADICAL MEAN */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600 shrink-0" />
          <span>2. What the Parts of a Radical Mean</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A radical contains several important pieces:
        </p>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-5 list-disc">
          <li>
            In <strong>ⁿ√x</strong>, the number <strong>x</strong> is the <strong>radicand</strong>. It is the quantity under the radical sign.
          </li>
          <li>
            The small number <strong>n</strong> is the <strong>index</strong>. It determines which root is being taken.
          </li>
          <li>
            When <strong>n = 2</strong>, the index is normally omitted: <strong>√x</strong>. This is the square root.
          </li>
          <li>
            When <strong>n = 3</strong>: <strong>∛x</strong>. This is the cube root.
          </li>
          <li>
            For higher roots, the index is shown explicitly: <strong>⁴√x</strong>, <strong>⁵√x</strong>, <strong>⁶√x</strong>, and so on.
          </li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Understanding the index matters because the simplification rule depends on it. A square root extracts complete pairs of equal prime factors. A cube root extracts complete groups of three. A fourth root extracts groups of four, and the same pattern continues for higher indices.
        </p>
      </section>

      {/* 3. PRINCIPAL ROOTS VS. EQUATION SOLUTIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600 shrink-0" />
          <span>3. Principal Roots vs. Equation Solutions</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          One of the most common sources of confusion is the difference between a principal root and the solutions of an equation.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The principal square root is defined as the non-negative value:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm text-center font-bold">
          √25 = 5
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          However, the polynomial equation:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm text-center font-bold">
          x² = 25 &nbsp;⟶&nbsp; x = 5 and x = -5
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          because both values square to 25. Therefore:
        </p>
        <div className="bg-amber-50 dark:bg-amber-950/30 p-3.5 rounded-xl border border-amber-200 dark:border-amber-800 text-sm font-semibold text-amber-900 dark:text-amber-200">
          <strong>Fundamental Distinction:</strong> √25 = 5, but the equation x² = 25 yields x = ±5. The calculator&apos;s root result should not be confused with solving an equation for every possible value of x.
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For even roots, the principal real root is non-negative. For odd roots, negative inputs can have negative real roots. This distinction is especially important when moving between radicals, powers, and algebraic equations.
        </p>
      </section>

      {/* 4. HOW TO USE THE ROOT CALCULATOR */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sliders className="h-6 w-6 text-blue-600 shrink-0" />
          <span>4. How to Use the Root Calculator</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          1. <strong>Enter the radicand:</strong> The number under the radical (x).<br />
          2. <strong>Choose the root type or index:</strong><br />
          &nbsp;&nbsp;• For a square root, use index 2.<br />
          &nbsp;&nbsp;• For a cube root, use index 3.<br />
          &nbsp;&nbsp;• For a fourth root, use index 4.<br />
          &nbsp;&nbsp;• For any supported higher root, enter the corresponding integer index.<br />
          3. <strong>Inspect the output:</strong> The calculator provides the principal root as a decimal approximation and, when applicable, an exact radical representation.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For example, entering <strong>x = 72</strong> and <strong>n = 2</strong> produces:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm text-center font-bold">
          √72 = 6√2 ≈ 8.485281
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator also shows the factorization used to simplify the radical, making it possible to verify the result rather than relying only on a final decimal.
        </p>
      </section>

      {/* 5. HOW TO CALCULATE AN NTH ROOT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600 shrink-0" />
          <span>5. How to Calculate an nth Root</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          To calculate an nth root mathematically, think of the operation as reversing exponentiation. If <strong>yⁿ = x</strong>, then <strong>ⁿ√x = y</strong>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For a simple perfect power: <strong>⁵√32 = 2</strong>, because <strong>2⁵ = 32</strong>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For values that are not perfect powers, the result may not be an integer. For example, <strong>√72</strong> is not an integer, but it can be simplified exactly:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm space-y-1">
          <p>Since 72 = 36 × 2</p>
          <p>We get: √72 = √(36 × 2)</p>
          <p>Using the product property: √72 = √36 × √2</p>
          <p className="font-bold text-blue-600 dark:text-blue-400">Therefore: √72 = 6√2 ≈ 8.485281</p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This is why an exact radical form and a decimal approximation can both be useful representations of the same result.
        </p>
      </section>

      {/* 6. HOW TO SIMPLIFY RADICALS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-blue-600 shrink-0" />
          <span>6. How to Simplify Radicals</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Radical simplification is based on identifying complete groups of prime factors that match the root index.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For a square root, complete pairs can be removed from under the radical. Consider <strong>√72</strong>:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm space-y-1">
          <p>Prime factorization: 72 = 2³ × 3²</p>
          <p>The exponent of 3 is 2, so one complete pair of 3s moves outside: √(3² × 2³) = 3√(2³) = 6√2</p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator performs this factor-based simplification automatically. The same idea works for higher roots:
        </p>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-5 list-disc">
          <li>
            <strong>Cube Root (∛54):</strong> Since 54 = 2 × 3³, the complete group of three 3s extracts outside: <strong>∛54 = 3∛2</strong>.
          </li>
          <li>
            <strong>Fourth Root (⁴√80):</strong> Since 80 = 2⁴ × 5, the complete fourth power 2⁴ leaves the radical: <strong>⁴√80 = 2⁴√5</strong>.
          </li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A radical is in simplest form when no additional complete nth-power factor remains inside the radicand.
        </p>
      </section>

      {/* 7. PERFECT SQUARES, CUBES, AND POWERS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="h-6 w-6 text-blue-600 shrink-0" />
          <span>7. Perfect Squares, Perfect Cubes, and Perfect Powers</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A <strong>perfect square</strong> is an integer that can be expressed as the square of another integer:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center">
          1, 4, 9, 16, 25, 36, 49, 64, 81, 100 &nbsp;⟶&nbsp; √64 = 8
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A <strong>perfect cube</strong> is an integer that can be expressed as the cube of an integer:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center">
          1, 8, 27, 64, 125 &nbsp;⟶&nbsp; ∛125 = 5
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The same concept extends to higher powers. For example, <strong>⁴√625 = 5</strong>, because <strong>5⁴ = 625</strong>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          When the radicand is a perfect nth power, the radical can reduce completely to an integer. When it is not, the calculator can retain the irreducible radical and provide its decimal approximation.
        </p>
      </section>

      {/* REFERENCE TABLE (CONTENT ENHANCEMENT) */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <TableIcon className="h-4 w-4 text-blue-600" />
          <span>Core Operations &amp; Radical Reference Table</span>
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
                <th className="p-3 font-bold">Operation</th>
                <th className="p-3 font-bold">Equivalent Form</th>
                <th className="p-3 font-bold">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Square root</td>
                <td className="p-3 font-mono">x^(1/2)</td>
                <td className="p-3 font-mono text-blue-600 dark:text-blue-400">√25 = 5</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Cube root</td>
                <td className="p-3 font-mono">x^(1/3)</td>
                <td className="p-3 font-mono text-blue-600 dark:text-blue-400">∛27 = 3</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">nth root</td>
                <td className="p-3 font-mono">x^(1/n)</td>
                <td className="p-3 font-mono text-blue-600 dark:text-blue-400">⁵√32 = 2</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Rational exponent</td>
                <td className="p-3 font-mono">x^(m/n)</td>
                <td className="p-3 font-mono text-blue-600 dark:text-blue-400">8^(2/3) = 4</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-semibold">Simplified radical</td>
                <td className="p-3">Extract complete nth powers</td>
                <td className="p-3 font-mono text-blue-600 dark:text-blue-400">√72 = 6√2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. FRACTIONAL EXPONENTS AND RADICALS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600 shrink-0" />
          <span>8. Fractional Exponents and Radicals</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Roots can also be written using fractional exponents. The fundamental relationship is:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          x^(m/n) = ⁿ√(xᵐ) = (ⁿ√x)ᵐ
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The denominator of the exponent corresponds to the root index, while the numerator corresponds to the power. For example:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center">
          8^(2/3) = (∛8)² = 2² = 4
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This connection is useful because radicals and rational exponents are two different notations for closely related operations. The calculator includes a dedicated fractional-exponent solver so that you can evaluate expressions such as <strong>8^(2/3) = 4</strong>, <strong>32^(2/5) = 4</strong>, <strong>16^(3/4) = 8</strong>, and <strong>81^(3/4) = 27</strong>.
        </p>
      </section>

      {/* 9. NEGATIVE RADICANDS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-blue-600 shrink-0" />
          <span>9. What Happens When the Radicand Is Negative?</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Negative radicands require special attention:
        </p>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-5 list-disc">
          <li>
            <strong>Odd Root Indices:</strong> Negative real roots exist. For example, <strong>∛(-27) = -3</strong> because (-3)³ = -27. Likewise, <strong>⁵√(-32) = -2</strong> because (-2)⁵ = -32.
          </li>
          <li>
            <strong>Even Root Indices:</strong> A negative radicand does not have a real-valued root. For example, <strong>√(-16)</strong> does not have a real result. In complex-number mathematics, <strong>√(-16) = 4i</strong>, where i² = -1.
          </li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The distinction between real and complex roots is important because a calculator should not present a complex result as though it were an ordinary real number.
        </p>
      </section>

      {/* 10. EXACT RADICAL VS. DECIMAL */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600 shrink-0" />
          <span>10. Why Exact Radical Form Can Be Better Than a Decimal</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A decimal approximation is convenient, but it can hide exact mathematical structure. Compare <strong>√72 ≈ 8.485281</strong> with <strong>√72 = 6√2</strong>. The decimal tells you the approximate numerical size, while the radical form tells you exactly how the number is constructed.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Exact forms are particularly useful when:
        </p>
        <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 pl-5 list-disc">
          <li>Simplifying algebraic expressions</li>
          <li>Solving geometry problems and calculating triangle hypotenuses</li>
          <li>Applying the Pythagorean theorem</li>
          <li>Comparing symbolic expressions</li>
          <li>Performing later algebraic operations without premature rounding errors</li>
          <li>Checking textbook or examination problems</li>
        </ul>
      </section>

      {/* 11. STEP-BY-STEP EXAMPLE: √72 */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600 shrink-0" />
          <span>11. Step-by-Step Example: Simplifying √72</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Suppose the problem is to evaluate and simplify <strong>√72</strong>:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm font-mono">
          <p><strong>Step 1 (Factor radicand):</strong> 72 = 2³ × 3²</p>
          <p><strong>Step 2 (Identify complete squares):</strong> The factor 3² is a perfect square.</p>
          <p><strong>Step 3 (Extract outside):</strong> √72 = √(3² × 2³) = 3√(2³)</p>
          <p><strong>Step 4 (Simplify remaining):</strong> √(2³) = √(4 × 2) = 2√2</p>
          <p><strong>Step 5 (Multiply coefficients):</strong> √72 = 3 × 2√2 = 6√2</p>
          <p className="font-bold text-blue-600 dark:text-blue-400">Numerically: 6√2 ≈ 8.485281</p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This illustrates the difference between merely evaluating a root and simplifying a radical into a mathematically cleaner exact form.
        </p>
      </section>

      {/* 12. ROOT CALCULATION METHODS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-blue-600 shrink-0" />
          <span>12. Root Calculation Methods</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          There are several computational methods to obtain roots:
        </p>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-5 list-disc">
          <li>
            <strong>Direct Recognition:</strong> For simple perfect powers (e.g., √144 = 12, ∛216 = 6).
          </li>
          <li>
            <strong>Prime Factorization:</strong> Reveals which complete groups of factors can be extracted from the radical symbolically.
          </li>
          <li>
            <strong>Newton-Raphson Numerical Approximation:</strong> Iterative numerical algorithm solving f(y) = yⁿ - x = 0:
            <div className="my-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-xs text-center">
              yₖ₊₁ = ((n - 1)yₖ + x / yₖⁿ⁻¹) / n
            </div>
            Starting from a suitable scale approximation, repeating the iteration produces successively better estimates of the root, converging rapidly to machine precision.
          </li>
        </ul>
      </section>

      {/* 13. RULES TO REMEMBER */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-blue-600 shrink-0" />
          <span>13. Root Index Rules You Should Remember</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-blue-600 block mb-1">Square Root</span>
            √x = x^(1/2)
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-blue-600 block mb-1">Cube Root</span>
            ∛x = x^(1/3)
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-blue-600 block mb-1">General nth Root</span>
            ⁿ√x = x^(1/n)
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-blue-600 block mb-1">Rational Exponent</span>
            x^(m/n) = ⁿ√(xᵐ)
          </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For even roots, the principal real root is non-negative. For odd roots, negative real inputs produce negative real roots. These rules help you move between root notation, radical notation, and exponent notation without changing the underlying mathematical meaning.
        </p>
      </section>

      {/* 14. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0" />
          <span>14. Common Mistakes When Working With Roots</span>
        </h2>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-5 list-disc">
          <li>
            <strong>Assuming √(x²) = x for all real x:</strong> In reality, √(x²) = |x|, because principal square roots cannot be negative.
          </li>
          <li>
            <strong>Distributing radicals over addition:</strong> Treating √(a + b) as √a + √b. That rule is not valid.
          </li>
          <li>
            <strong>Confusing principal roots with equation solutions:</strong> √25 = 5, while x² = 25 has x = ±5.
          </li>
          <li>
            <strong>Rounding too early:</strong> Rounding intermediate numbers damages precision; maintain exact radical representations until the final calculation.
          </li>
        </ul>
      </section>

      {/* 15. ALREADY IN SIMPLEST FORM */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600 shrink-0" />
          <span>15. When a Radical Is Already in Simplest Form</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Not every radical can be simplified further. For example, <strong>√13</strong> cannot be reduced because 13 has no perfect-square factor greater than 1. Similarly, <strong>∛10</strong> has no perfect-cube factor greater than 1.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The fact that a radical cannot be simplified to an integer does not mean the calculation has failed. An exact irrational result can be completely correct.
        </p>
      </section>

      {/* 16. ROOT CALCULATOR VS. RADICAL SIMPLIFIER */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600 shrink-0" />
          <span>16. Root Calculator vs. Radical Simplifier</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A root calculator primarily answers: <em>What is ⁿ√x numerically?</em><br />
          A radical simplifier asks: <em>Can ⁿ√x be rewritten in a cleaner exact form?</em>
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For example, <strong>√72 ≈ 8.485281</strong> answers the numerical evaluation question, while <strong>√72 = 6√2</strong> answers the symbolic simplification question. Using both representations gives a more complete mathematical result.
        </p>
      </section>

      {/* 17. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="h-6 w-6 text-blue-600 shrink-0" />
          <span>17. Worked Examples</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-blue-600 block mb-1">Example 1: Square Root</span>
            x = 144, n = 2 ⟶ √144 = 12
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-blue-600 block mb-1">Example 2: Cube Root</span>
            x = 216, n = 3 ⟶ ∛216 = 6
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-blue-600 block mb-1">Example 3: Fourth Root</span>
            x = 625, n = 4 ⟶ ⁴√625 = 5
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-blue-600 block mb-1">Example 4: Simplified Square Root</span>
            x = 75, n = 2 ⟶ 75 = 25 × 3 ⟶ √75 = 5√3
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-blue-600 block mb-1">Example 5: Simplified Cube Root</span>
            x = 54, n = 3 ⟶ 54 = 27 × 2 ⟶ ∛54 = 3∛2
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-blue-600 block mb-1">Example 6: Fractional Exponent</span>
            x = 8, m = 2, n = 3 ⟶ 8^(2/3) = 4
          </div>
        </div>
      </section>

      {/* 18. APPLICATIONS & CONTEXTUAL INTERNAL LINKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600 shrink-0" />
          <span>18. Where Roots and Radicals Are Used</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Roots appear throughout mathematics, physics, computing, and applied science.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          When a square root comes from a right triangle, the{" "}
          <Link href="/calculators/pythagorean-theorem-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Pythagorean Theorem Calculator &amp; Right Triangle Solver
          </Link>{" "}
          can be used to calculate the missing side.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          When working with powers and rational exponents, the{" "}
          <Link href="/calculators/exponent-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Exponent Calculator
          </Link>{" "}
          provides a complementary way to evaluate exponential expressions.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For problems that require prime decomposition before simplifying a radical, the{" "}
          <Link href="/calculators/factor-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Factor Calculator &amp; Prime Factorization
          </Link>{" "}
          can help identify the underlying factors.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For broader scientific calculations involving powers, roots, and numerical expressions, the{" "}
          <Link href="/calculators/scientific-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Scientific Calculator
          </Link>{" "}
          is another useful companion tool.
        </p>
      </section>

      {/* 19. HOW TO READ THE RESULT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sliders className="h-6 w-6 text-blue-600 shrink-0" />
          <span>19. How to Read the Calculator&apos;s Result</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator may show several forms of the same mathematical result:
        </p>
        <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 pl-5 list-disc">
          <li><strong>Decimal Result:</strong> The numerical approximation.</li>
          <li><strong>Exact Radical Form:</strong> Preserves symbolic mathematical structure.</li>
          <li><strong>Fractional-Exponent Representation:</strong> Shows the equivalent rational-power notation.</li>
          <li><strong>Step-by-Step Derivation:</strong> Explains how the answer was obtained.</li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For a result such as <strong>√72 = 6√2 ≈ 8.485281</strong>, you can read it as: original expression √72, exact simplified form 6√2, and decimal approximation 8.485281.
        </p>
      </section>

      {/* 20. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 shrink-0" />
          <span>20. Frequently Asked Questions</span>
        </h2>

        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">What is a root?</h3>
            <p className="text-slate-600 dark:text-slate-400">A root reverses exponentiation. The nth root of x is the value that, when raised to the nth power, produces x.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">What is a radicand?</h3>
            <p className="text-slate-600 dark:text-slate-400">The radicand is the number or expression located under the radical symbol. In √72, the radicand is 72.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">What is the index of a radical?</h3>
            <p className="text-slate-600 dark:text-slate-400">The index is the small number that specifies which root is being taken. In ⁵√32, the index is 5.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">What is the square root of 72?</h3>
            <p className="text-slate-600 dark:text-slate-400">The exact simplified form is √72 = 6√2, and the decimal approximation is approximately 8.485281.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">What is the cube root of 54?</h3>
            <p className="text-slate-600 dark:text-slate-400">Since 54 = 27 × 2, ∛54 = 3∛2, and its decimal value is approximately 3.779763.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">How do you simplify a square root?</h3>
            <p className="text-slate-600 dark:text-slate-400">Factor the radicand and extract every complete square factor. For example: √72 = √(36 × 2) = 6√2.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">How do you simplify a cube root?</h3>
            <p className="text-slate-600 dark:text-slate-400">Extract complete groups of three identical prime factors. For example: ∛54 = ∛(27 × 2) = 3∛2.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">What is the difference between a root and a radical?</h3>
            <p className="text-slate-600 dark:text-slate-400">A root is the mathematical operation. A radical is the notation used to represent the root. For example, √49 is radical notation for the square-root operation.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">What is a principal square root?</h3>
            <p className="text-slate-600 dark:text-slate-400">The principal square root is the non-negative real square root. Therefore √36 = 6, even though the equation x² = 36 has both x = 6 and x = -6 as solutions.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Can an even root of a negative number be real?</h3>
            <p className="text-slate-600 dark:text-slate-400">No. A negative real number does not have a real even root. Such expressions can be interpreted using complex numbers instead.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Can an odd root of a negative number be real?</h3>
            <p className="text-slate-600 dark:text-slate-400">Yes. For example, ∛(-8) = -2, because (-2)³ = -8.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">What is a fractional exponent?</h3>
            <p className="text-slate-600 dark:text-slate-400">A fractional exponent is an exponent written as a fraction, such as x^(2/3). The denominator corresponds to the root index: x^(m/n) = ⁿ√(xᵐ).</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Is √72 an exact value?</h3>
            <p className="text-slate-600 dark:text-slate-400">Yes. √72 has the exact simplified form 6√2. The decimal 8.485281 is an approximation.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">When should I use the exact radical instead of the decimal?</h3>
            <p className="text-slate-600 dark:text-slate-400">Use the exact radical when performing symbolic algebra, geometry, or other calculations where preserving precision and structure matters. Use a decimal when a numerical approximation is required.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">What is the fourth root of 625?</h3>
            <p className="text-slate-600 dark:text-slate-400">The fourth root of 625 is 5 because 5⁴ = 625.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">What happens when the radicand is zero?</h3>
            <p className="text-slate-600 dark:text-slate-400">For every valid positive root index n, ⁿ√0 = 0.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Can roots be written as exponents?</h3>
            <p className="text-slate-600 dark:text-slate-400">Yes. The nth root can be written as a power with exponent 1/n: ⁿ√x = x^(1/n). More generally, ⁿ√(xᵐ) = x^(m/n).</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Why does √(x²) equal |x| rather than x?</h3>
            <p className="text-slate-600 dark:text-slate-400">Because the principal square root is non-negative. Squaring either x or -x produces x², so taking the principal square root gives the non-negative magnitude |x|.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">How accurate is the calculator&apos;s decimal result?</h3>
            <p className="text-slate-600 dark:text-slate-400">The calculator&apos;s displayed decimal accuracy depends on the selected precision and numerical representation. For exact simplifiable roots, the exact radical form should be preferred whenever available.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Can I use this calculator for higher-order roots?</h3>
            <p className="text-slate-600 dark:text-slate-400">Yes. The calculator supports general nth-root calculations through the root-index input, in addition to dedicated square- and cube-root modes.</p>
          </div>
        </div>
      </section>

      {/* 21. FINAL TAKEAWAY */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
        <h2 className="text-lg font-extrabold text-blue-900 dark:text-blue-300">
          21. Final Takeaway
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          Roots are best understood as the inverse of powers: <strong>ⁿ√x = x^(1/n)</strong> and <strong>x^(m/n) = ⁿ√(xᵐ)</strong>.
        </p>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          To simplify a radical, factor the radicand and extract complete groups of prime factors matching the root index: for square roots extract pairs, for cube roots extract groups of three, and for fourth roots extract groups of four.
        </p>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The result can often be expressed in two useful forms: an exact radical form and a decimal approximation (e.g. <strong>√72 = 6√2 ≈ 8.485281</strong>). The exact form preserves mathematical structure, while the decimal form communicates numerical magnitude. This Root Calculator combines those approaches so that you can calculate roots, simplify radicals, evaluate rational exponents, inspect the mathematical steps, and verify the result rather than relying on an unexplained number.
        </p>
      </section>

      {/* RELATED CALCULATORS BLOCK (BELOW CONTENT) */}
      <div className="no-print bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 font-semibold space-y-1.5 mt-8">
        <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block text-[11px]">
          RELATED CALCULATORS:
        </span>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-blue-600 dark:text-blue-400">
          <Link href="/calculators/exponent-calculator" className="hover:underline font-semibold">
            Exponent Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link href="/calculators/scientific-calculator" className="hover:underline font-semibold">
            Scientific Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link href="/calculators/pythagorean-theorem-calculator" className="hover:underline font-semibold">
            Pythagorean Theorem Calculator &amp; Right Triangle Solver
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link href="/calculators/factor-calculator" className="hover:underline font-semibold">
            Factor Calculator &amp; Prime Factorization
          </Link>
        </div>
      </div>

    </article>
  );
}

export default RootContent;
