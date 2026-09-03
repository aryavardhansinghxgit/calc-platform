"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
  Superscript,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { exponent_calculatorFaqs } from "@/app/calculators/exponent-calculator/faq";

export function ExponentContent() {
  // All 36 FAQs unfolded (open by default)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 36 }, (_, i) => i))
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
      {/* 1. HERO INTRODUCTION */}
      {/* ========================================================================= */}
      <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        <div className="space-y-3">
          <p>
            An exponent tells you how a quantity is raised to a power. Exponents appear throughout algebra, geometry, science, engineering, computing, finance and measurement because they provide a compact way to represent repeated multiplication, reciprocal relationships, roots and powers of ten.
          </p>
          <p>
            This Exponent Calculator combines several common exponent calculations in one tool. You can evaluate a power such as 2¹⁰, solve for an unknown base or exponent, work with fractional and radical exponents, apply the fundamental laws of exponents, and convert numbers between decimal, scientific, engineering and E notation.
          </p>
          <p>
            The calculator also shows step-by-step working instead of returning only a final number. This makes it useful for checking homework, learning exponent rules, verifying calculations and understanding why a result is correct.
          </p>
        </div>

        {/* Section: What Is an Exponent? */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is an Exponent?
          </h2>
          <p>
            An exponent indicates repeated multiplication of a base. For a positive integer exponent n:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-center text-slate-900 dark:text-slate-100">
            bⁿ = b × b × b × ... × b &nbsp;(n times)
          </div>
          <p>
            For example:
          </p>
          <div className="p-2.5 bg-blue-50/70 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900/50 font-mono text-xs font-bold text-center text-blue-900 dark:text-blue-300">
            2⁵ = 2 × 2 × 2 × 2 × 2 = 32
          </div>
          <p>
            In the expression 2⁵:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>2</strong> is the base.</li>
            <li><strong>5</strong> is the exponent.</li>
            <li><strong>32</strong> is the evaluated power.</li>
          </ul>
          <p>
            Exponents are useful because they compress repeated multiplication into a single mathematical expression. The meaning becomes broader for zero, negative and fractional exponents. Those cases do not simply mean &quot;multiply the base some number of times&quot;; they encode identities involving division and roots.
          </p>
        </section>

        {/* Section: How to Use */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use the Exponent Calculator
          </h2>
          <p>
            Start by choosing the type of calculation you need:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>General Power Solver:</strong> Enter the base and exponent to evaluate ordinary powers or solve backward for base or exponent.</li>
            <li><strong>Fractional &amp; Radical Exponents:</strong> Enter the base, numerator and denominator for expressions such as 27²⁄³.</li>
            <li><strong>Exponent Laws &amp; Operations:</strong> Apply and verify algebraic identities such as a³ × a⁴ = a⁷.</li>
            <li><strong>Scientific &amp; Engineering Converter:</strong> Convert values like 5.4 × 10⁶ into decimal, engineering, and E-notation.</li>
          </ul>
          <p>
            The calculator then shows the result and, where applicable, a step-by-step derivation explaining how the result was obtained.
          </p>
        </section>

        {/* Section: General Power Calculator: bⁿ */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            General Power Calculator: bⁿ
          </h2>
          <p>
            The basic power calculation is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-center text-blue-600">
            y = bⁿ
          </div>
          <p>
            where b is the base, n is the exponent, and y is the evaluated result. For example: 2¹⁰ = 1024.
          </p>
          <p>
            The calculator can also work backward:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>If the result and exponent are known, the unknown base is found from: <span className="font-mono font-bold">b = ⁿ√y</span>, provided the requested root is mathematically defined.</li>
            <li>If the base and result are known, the exponent is found using logarithms: <span className="font-mono font-bold">n = log_b(y)</span>.</li>
          </ul>
          <p>
            For positive real logarithmic bases, this requires: <span className="font-mono font-bold">b &gt; 0, b ≠ 1, y &gt; 0</span>. These domain conditions matter because logarithms are not defined over the positive-real setting for every possible base and target value.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Solving for the Result</h3>
              <p>To evaluate a power, enter the base and exponent. Example: b = 2, n = 10 &rarr; 2¹⁰ = 1024. The calculator&apos;s step-by-step result shows the inputs and evaluates the power from those values.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Solving for the Base</h3>
              <p>Suppose b³ = 8. The unknown base is b = ∛8 = 2. For an odd root, a negative result can also have a negative real base: b³ = −8 gives b = ∛(−8) = −2. The calculator explicitly handles this case rather than returning NaN from a generic floating-point power operation.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Solving for the Exponent</h3>
              <p>Suppose 2ⁿ = 1024. Since 1024 = 2¹⁰, the solution is n = 10. For cases where the relationship is not obvious from equal bases, logarithms provide the general real solution: n = ln(y) / ln(b) under the usual real-logarithm conditions: b &gt; 0, b ≠ 1, y &gt; 0. The calculator uses this logarithmic relationship when solving for an unknown exponent.</p>
            </div>
          </div>

          {/* MID-CONTENT INTERNAL LINK #1 */}
          <div className="p-4 bg-blue-50/70 dark:bg-slate-800/70 rounded-xl border border-blue-200 dark:border-slate-700 text-xs mt-3">
            <p className="text-slate-700 dark:text-slate-300">
              When solving exponential equations requires logarithms rather than direct power evaluation, the{" "}
              <Link href="/calculators/log-calculator" className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-800">
                Log Calculator
              </Link>{" "}
              provides a more focused logarithmic workflow.
            </p>
          </div>
        </section>

        {/* Section: Zero Exponents */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Zero Exponents
          </h2>
          <p>
            For every nonzero base: <span className="font-mono font-bold">a⁰ = 1</span>.
          </p>
          <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center pt-1">
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">2⁰ = 1</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">100⁰ = 1</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">(−5)⁰ = 1</div>
          </div>
          <p>
            This follows from the quotient law: <span className="font-mono">aᵐ / aᵐ = aᵐ⁻ᵐ = a⁰</span> and, because the numerator and denominator are identical nonzero quantities, the quotient is 1.
          </p>
          <p>
            The nonzero condition is important. You should not silently extend the rule to every expression involving zero.
          </p>
        </section>

        {/* Section: Negative Exponents */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Negative Exponents
          </h2>
          <p>
            A negative exponent represents a reciprocal. For a ≠ 0:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-center text-blue-600">
            a⁻ⁿ = 1 / aⁿ
          </div>
          <p>
            For example: <span className="font-mono">2⁻³ = 1/2³ = 1/8 = 0.125</span>. Similarly: <span className="font-mono">(2/3)⁻² = (3/2)² = 9/4 = 2.25</span>.
          </p>
          <p>
            A negative exponent does not make a number itself &quot;negative.&quot; It changes the expression into the reciprocal of the corresponding positive power.
          </p>
        </section>

        {/* Section: Fractional Exponents and Radicals */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Fractional Exponents and Radicals
          </h2>
          <p>
            A fractional exponent can represent a root. The standard relationship is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-center">
            a^(m/n) = (ⁿ√a)ᵐ = ⁿ√(aᵐ)
          </div>
          <p>
            The numerator m specifies the power. The denominator n specifies the root. For example, 27^(2/3) can be evaluated as (∛27)² = 3² = 9, or ∛(27²) = ∛729 = 9.
          </p>
          <p>
            The calculator displays both the decimal power interpretation and the radical relationship so that the connection between the two forms is explicit.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Fractional Exponent Example</h3>
              <p>Consider 27^(2/3):</p>
              <ul className="list-disc pl-5 space-y-0.5">
                <li>Step 1: 2/3 is the rational exponent.</li>
                <li>Step 2: The denominator 3 indicates a cube root.</li>
                <li>Step 3: The numerator 2 indicates the power.</li>
              </ul>
              <p className="font-mono font-bold text-blue-600">Therefore: 27^(2/3) = (∛27)² = 3² = 9.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Negative Bases with Fractional Exponents</h3>
              <p>Negative bases require additional care. For an odd root, a negative real result can exist: ∛(−8) = −2, so (−8)^(1/3) = −2 and (−8)^(2/3) = (∛−8)² = (−2)² = 4.</p>
              <p>However, an even root of a negative real number is not a real number: (−4)^(1/2) has no real value. Depending on the calculator&apos;s supported complex-number handling, the result may be represented as a complex value (2i). Do not assume that every fractional power of a negative number has a real result.</p>
            </div>
          </div>

          {/* MID-CONTENT INTERNAL LINK #2 */}
          <div className="p-4 bg-blue-50/70 dark:bg-slate-800/70 rounded-xl border border-blue-200 dark:border-slate-700 text-xs mt-3">
            <p className="text-slate-700 dark:text-slate-300">
              When you need to work specifically with radicals, square roots or exact radical simplification, use the{" "}
              <Link href="/calculators/root-calculator" className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-800">
                Root Calculator &amp; Radical Simplifier
              </Link>.
            </p>
          </div>
        </section>

        {/* Section: Why Fraction Reduction Matters */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Fraction Reduction Matters
          </h2>
          <p>
            A rational exponent should be interpreted consistently as a fraction. For example: 16^(2/4) has the same reduced exponent as 16^(1/2), so 16^(2/4) = 4.
          </p>
          <p>
            This is why reducing a rational exponent before interpreting its root can be important, particularly for negative bases. The calculator normalizes the fractional exponent before applying the appropriate real-domain logic.
          </p>
        </section>

        {/* Section: The Eight Fundamental Laws */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            The Eight Fundamental Laws of Exponents
          </h2>
          <p>
            Exponent laws allow complex expressions to be rewritten into simpler equivalent forms. The calculator supports eight fundamental operations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">1. Product of Powers</h3>
              <p className="font-mono text-blue-600 font-bold">aᵐ · aⁿ = aᵐ⁺ⁿ</p>
              <p>Example: 2³ · 2⁴ = 2⁷ = 128. Base remains unchanged and exponents are added.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">2. Quotient of Powers</h3>
              <p className="font-mono text-blue-600 font-bold">aᵐ / aⁿ = aᵐ⁻ⁿ (a ≠ 0)</p>
              <p>Example: 5⁸ / 5² = 5⁶ = 15,625. Exponents are subtracted as common factors cancel.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">3. Power of a Power</h3>
              <p className="font-mono text-blue-600 font-bold">(aᵐ)ⁿ = aᵐⁿ</p>
              <p>Example: (3²)⁴ = 3⁸ = 6,561. The exponents are multiplied.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">4. Power of a Product</h3>
              <p className="font-mono text-blue-600 font-bold">(ab)ⁿ = aⁿbⁿ</p>
              <p>Example: (2 × 4)³ = 2³ × 4³ = 8 × 64 = 512.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">5. Power of a Quotient</h3>
              <p className="font-mono text-blue-600 font-bold">(a/b)ⁿ = aⁿ / bⁿ (b ≠ 0)</p>
              <p>Example: (3/5)³ = 3³/5³ = 27/125 = 0.216.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">6. Zero Exponent Rule</h3>
              <p className="font-mono text-blue-600 font-bold">a⁰ = 1 (a ≠ 0)</p>
              <p>Examples: 7⁰ = 1, (−9)⁰ = 1, (1/4)⁰ = 1.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">7. Negative Exponent Rule</h3>
              <p className="font-mono text-blue-600 font-bold">a⁻ⁿ = 1 / aⁿ (a ≠ 0)</p>
              <p>Example: 2⁻³ = 1/8 = 0.125. Reciprocal notation.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">8. Fractional Exponent Rule</h3>
              <p className="font-mono text-blue-600 font-bold">a^(m/n) = (ⁿ√a)ᵐ = ⁿ√(aᵐ)</p>
              <p>Example: 64^(2/3) = (∛64)² = 4² = 16.</p>
            </div>
          </div>

          {/* TABLE 1 */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Table 1: The 8 Fundamental Exponent Laws &amp; Operational Examples
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700">
                <thead>
                  <tr className="bg-blue-600 text-white font-bold">
                    <th className="p-2.5">Rule Name</th>
                    <th className="p-2.5">Algebraic Formula</th>
                    <th className="p-2.5">Numerical Example</th>
                    <th className="p-2.5">Conditions &amp; Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50 font-mono">
                  <tr>
                    <td className="p-2.5 font-sans font-bold">Product of Powers</td>
                    <td className="p-2.5">aᵐ · aⁿ = aᵐ⁺ⁿ</td>
                    <td className="p-2.5">2³ × 2⁴ = 128</td>
                    <td className="p-2.5 font-sans">Bases must be identical</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-bold">Quotient of Powers</td>
                    <td className="p-2.5">aᵐ / aⁿ = aᵐ⁻ⁿ</td>
                    <td className="p-2.5">5⁸ / 5² = 15625</td>
                    <td className="p-2.5 font-sans">Base a ≠ 0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-bold">Power of a Power</td>
                    <td className="p-2.5">(aᵐ)ⁿ = aᵐⁿ</td>
                    <td className="p-2.5">(3²)⁴ = 6561</td>
                    <td className="p-2.5 font-sans">Multiply exponent powers</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-bold">Power of a Product</td>
                    <td className="p-2.5">(ab)ⁿ = aⁿbⁿ</td>
                    <td className="p-2.5">(2×4)³ = 512</td>
                    <td className="p-2.5 font-sans">Distribute power to all factors</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-bold">Power of a Quotient</td>
                    <td className="p-2.5">(a/b)ⁿ = aⁿ/bⁿ</td>
                    <td className="p-2.5">(3/5)³ = 0.216</td>
                    <td className="p-2.5 font-sans">Denominator b ≠ 0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-bold">Zero Exponent</td>
                    <td className="p-2.5">a⁰ = 1</td>
                    <td className="p-2.5">2⁰ = 1</td>
                    <td className="p-2.5 font-sans">Base a ≠ 0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-bold">Negative Exponent</td>
                    <td className="p-2.5">a⁻ⁿ = 1/aⁿ</td>
                    <td className="p-2.5">2⁻³ = 0.125</td>
                    <td className="p-2.5 font-sans">Reciprocal representation</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-bold">Fractional Exponent</td>
                    <td className="p-2.5">a^(m/n) = ⁿ√(aᵐ)</td>
                    <td className="p-2.5">27^(2/3) = 9</td>
                    <td className="p-2.5 font-sans">Root index n &gt; 0; real domain check</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* EDUCATIONAL FLOWCHART DIAGRAM */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 mt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              How an Exponent Expression Can Be Rewritten
            </h3>
            <div className="w-full flex justify-center py-2 overflow-x-auto">
              <svg viewBox="0 0 760 100" className="w-full max-w-3xl h-auto" role="img" aria-label="Step by step exponent simplification and evaluation flowchart">
                <defs>
                  <marker id="exp-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb" />
                  </marker>
                </defs>

                {/* Node 1: Exponent Expression */}
                <rect x="5" y="30" width="85" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
                <text x="47" y="48" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Exponent Expr</text>
                <text x="47" y="60" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">bⁿ or b^(p/q)</text>
                <line x1="90" y1="50" x2="103" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#exp-arrow)" />

                {/* Node 2: Identify Base & Exponent */}
                <rect x="107" y="30" width="95" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
                <text x="154" y="48" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Identify Terms</text>
                <text x="154" y="60" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">Base b, Power n</text>
                <line x1="202" y1="50" x2="215" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#exp-arrow)" />

                {/* Node 3: Check Domain */}
                <rect x="219" y="30" width="85" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
                <text x="261" y="48" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Check Domain</text>
                <text x="261" y="60" textAnchor="middle" className="text-[8px] font-mono fill-blue-600">b≠0, root index</text>
                <line x1="304" y1="50" x2="317" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#exp-arrow)" />

                {/* Node 4: Apply Relevant Exponent Rule */}
                <rect x="321" y="30" width="105" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
                <text x="373" y="48" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Apply Law / Rule</text>
                <text x="373" y="60" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">8 Exponent Laws</text>
                <line x1="426" y1="50" x2="439" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#exp-arrow)" />

                {/* Node 5: Simplify */}
                <rect x="443" y="30" width="85" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
                <text x="485" y="48" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Simplify</text>
                <text x="485" y="60" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">Combine Terms</text>
                <line x1="528" y1="50" x2="541" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#exp-arrow)" />

                {/* Node 6: Exact Form */}
                <rect x="545" y="30" width="95" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
                <text x="592" y="48" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Exact Form</text>
                <text x="592" y="60" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">ⁿ√(bᵐ) or Fraction</text>
                <line x1="640" y1="50" x2="653" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#exp-arrow)" />

                {/* Node 7: Decimal Approximation */}
                <rect x="657" y="30" width="98" height="40" rx="6" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
                <text x="706" y="48" textAnchor="middle" className="text-[9px] font-bold fill-white">Evaluated Result</text>
                <text x="706" y="60" textAnchor="middle" className="text-[8px] font-bold fill-blue-100">Decimal / Scientific</text>
              </svg>
            </div>
            <p className="text-xs text-slate-500 italic text-center">
              &quot;Exponent rules simplify expressions, but domain restrictions still apply to division, zero bases and fractional powers.&quot;
            </p>
          </div>
        </section>

        {/* Section: Why Exponent Laws Have Conditions */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Exponent Laws Have Conditions
          </h2>
          <p>
            Exponent rules are algebraic identities, but they are not permission to ignore mathematical domains. For example: <span className="font-mono">a⁻¹ = 1/a</span> requires <span className="font-mono">a ≠ 0</span>. Similarly, <span className="font-mono">a⁰ = 1</span> is stated for nonzero a. And <span className="font-mono">a^(1/n)</span> requires additional domain consideration when a is negative and n is even if the calculation is restricted to real numbers.
          </p>
          <p>
            These conditions explain why a calculator must distinguish valid expressions from undefined or non-real cases rather than applying one formula blindly.
          </p>
        </section>

        {/* Section: What Happens When the Base Is Zero? */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Happens When the Base Is Zero?
          </h2>
          <p>
            Zero bases require separate treatment. For positive integer n: <span className="font-mono font-bold">0ⁿ = 0</span> (e.g. 0² = 0). However, <span className="font-mono font-bold">0⁻¹</span> is undefined because it would require 1/0, which is division by zero.
          </p>
          <p>
            The expression <strong>0⁰</strong> is a special case whose treatment depends on mathematical context:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>In elementary algebra, discrete math, and combinatorics, many systems adopt a convention of assigning <strong>0⁰ = 1</strong> (to preserve empty product definitions, polynomial expansions, and power series like eˣ = ∑ xⁿ/n!).</li>
            <li>In calculus and real analysis, 0⁰ commonly appears as an <strong>indeterminate limit form</strong> when it arises as the limiting form of [f(x)]ᵍ⁽ˣ⁾ as x approaches a value.</li>
          </ul>
          <p>
            The calculator&apos;s displayed convention should therefore be interpreted as an evaluation convention, not as a universal statement that every occurrence of 0⁰ in every mathematical context has the same meaning.
          </p>
        </section>

        {/* Section: Negative Bases and Parentheses */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Negative Bases and Parentheses
          </h2>
          <p>
            Parentheses matter when a negative number is raised to a power. Compare:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs pt-1">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border">
              <strong className="text-emerald-600 font-sans block text-sm">Parentheses Included:</strong>
              (−3)² = (−3) × (−3) = +9
              <span className="text-[11px] font-sans text-slate-500 block mt-1">The negative sign is part of the base.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border">
              <strong className="text-blue-600 font-sans block text-sm">No Parentheses (Unary Negation):</strong>
              −3² = −(3 × 3) = −9
              <span className="text-[11px] font-sans text-slate-500 block mt-1">Exponentiation is performed before unary negation.</span>
            </div>
          </div>
          <p>
            This distinction is one of the most common sources of exponent mistakes. Always use parentheses when the negative quantity itself is the base.
          </p>
        </section>

        {/* Section: Scientific Notation */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Scientific Notation
          </h2>
          <p>
            Scientific notation represents a number in the form: <span className="font-mono font-bold">a × 10ᵏ</span>, where a is normally between 1 and 10 in normalized scientific notation and k is an integer.
          </p>
          <p>
            For example, 5,400,000 can be written as 5.4 × 10⁶ because moving the decimal six places to the left gives 5.4. A small number can be represented with a negative exponent: 0.0000054 = 5.4 × 10⁻⁶. The power of ten records how far the decimal point has moved.
          </p>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Scientific Notation Example</h3>
            <p>Take 5.4 × 10⁶:</p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>Step 1: Start with 5.4.</li>
              <li>Step 2: Multiply by 10⁶.</li>
              <li>Step 3: 10⁶ = 1,000,000.</li>
            </ul>
            <p className="font-mono font-bold text-blue-600">Therefore: 5.4 × 1,000,000 = 5,400,000.</p>
          </div>
        </section>

        {/* Section: Engineering Notation */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Engineering Notation
          </h2>
          <p>
            Engineering notation resembles scientific notation but restricts the exponent of 10 to a multiple of 3. Examples include 10³, 10⁶, 10⁹, 10⁻³, 10⁻⁶.
          </p>
          <p>
            Therefore, 5,400,000 can be expressed as 5.4 × 10⁶, while a smaller quantity can use a negative multiple of three. Engineering notation is useful in engineering because the powers of 10 align naturally with SI prefixes such as kilo, mega, micro and nano.
          </p>

          {/* MID-CONTENT INTERNAL LINK #3 */}
          <div className="p-4 bg-blue-50/70 dark:bg-slate-800/70 rounded-xl border border-blue-200 dark:border-slate-700 text-xs mt-3">
            <p className="text-slate-700 dark:text-slate-300">
              For a dedicated scientific-notation workflow and broader number-format conversions, use the{" "}
              <Link href="/calculators/scientific-notation-calculator" className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-800">
                Scientific Notation Calculator &amp; Converter
              </Link>.
            </p>
          </div>
        </section>

        {/* Section: E-Notation */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            E-Notation
          </h2>
          <p>
            E-notation is a compact text representation of scientific notation. For example, 5.4 × 10⁶ can be represented as 5.4e+6. Similarly, 5.4 × 10⁻⁶ becomes 5.4e-6.
          </p>
          <p>
            The &quot;e&quot; means &quot;times ten raised to.&quot; It does not mean Euler&apos;s number in this notation. E-notation is especially common in programming languages, spreadsheets, calculators and data files because it is easy for software to parse.
          </p>
        </section>

        {/* Section: Scientific vs Engineering vs E-Notation */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Scientific vs Engineering vs E-Notation
          </h2>
          <p>
            These three formats represent the same numerical quantity in different forms. The difference is mainly representational:
          </p>

          {/* TABLE 2 */}
          <div className="pt-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Table 2: Comparison of Notation Formats
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700">
                <thead>
                  <tr className="bg-blue-600 text-white font-bold">
                    <th className="p-2.5">Notation Format</th>
                    <th className="p-2.5">Example</th>
                    <th className="p-2.5">Meaning &amp; Formatting Convention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50 font-mono">
                  <tr>
                    <td className="p-2.5 font-sans font-bold">Scientific</td>
                    <td className="p-2.5">5.4 × 10⁶</td>
                    <td className="p-2.5 font-sans">Normalized power-of-ten form (1 &le; |mantissa| &lt; 10)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-bold">Engineering</td>
                    <td className="p-2.5">5.4 × 10⁶</td>
                    <td className="p-2.5 font-sans">Exponent restricted to multiples of 3 (aligns with SI prefixes)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-bold">E-Notation</td>
                    <td className="p-2.5">5.4e+6</td>
                    <td className="p-2.5 font-sans">Compact software-friendly ASCII text representation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section: Powers of Ten and SI Prefixes */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Powers of Ten and SI Prefixes
          </h2>
          <p>
            Powers of ten provide the foundation for decimal scaling: 10³ = 1,000 (kilo), 10⁶ = 1,000,000 (mega), 10⁹ = 1,000,000,000 (giga), 10⁻³ = 0.001 (milli), 10⁻⁶ = 0.000001 (micro).
          </p>
          <p>
            The distinction between powers of 10 and powers of 2 is important:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs font-mono">
            <li>1 kB = 1,000 bytes (SI Decimal)</li>
            <li>1 KiB = 1,024 bytes (Binary IEC)</li>
          </ul>
          <p>
            The prefixes k and M in the SI system represent decimal powers of ten, not powers of two.
          </p>
        </section>

        {/* Section: Powers of 2 in Computing */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Powers of 2 in Computing
          </h2>
          <p>
            Powers of 2 are fundamental to digital computing because binary systems use two possible states (0 and 1). Examples include: 2¹⁰ = 1,024 and 2²⁰ = 1,048,576.
          </p>
          <p>
            Be careful not to confuse these values with decimal SI prefixes: 1 KiB is 1,024 bytes, while 1 kB is 1,000 bytes. The numerical distinction becomes increasingly important for larger storage quantities such as Gibibytes vs Gigabytes.
          </p>
        </section>

        {/* Section: Euler's Number e */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Euler&apos;s Number e
          </h2>
          <p>
            Euler&apos;s number is the mathematical constant <span className="font-mono font-bold">e ≈ 2.718281828459...</span>. It is the natural base of exponential and logarithmic functions. A standard limiting definition is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-center">
            e = lim[n&rarr;&infin;] (1 + 1/n)ⁿ
          </div>
          <p>
            The constant e is especially important in continuous growth and decay, calculus, differential equations and many scientific models. Do not confuse eˣ with a × 10ˣ: scientific notation uses powers of 10, whereas natural exponential models use powers of e.
          </p>
        </section>

        {/* Section: Solving Exponential Equations */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Solving Exponential Equations
          </h2>
          <p>
            Some exponential equations can be solved by rewriting both sides with a common base. For example: 2ˣ = 32. Since 32 = 2⁵, we get 2ˣ = 2⁵, and therefore x = 5.
          </p>
          <p>
            When a common base is not convenient, logarithms can be used. For bˣ = y with the appropriate positive-real domain: <span className="font-mono font-bold">x = log_b(y) = ln(y) / ln(b)</span>. This is the basis of the calculator&apos;s solve-for-exponent functionality.
          </p>
        </section>

        {/* Section: Common Exponent Mistakes */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Exponent Mistakes
          </h2>
          <div className="space-y-2 text-xs">
            <p><strong>Forgetting parentheses around a negative base:</strong> (−2)² = 4, but −2² = −4.</p>
            <p><strong>Adding exponents when multiplying different bases:</strong> The rule aᵐaⁿ = aᵐ⁺ⁿ requires the same base. You cannot turn 2³ × 3⁴ into 6⁷.</p>
            <p><strong>Subtracting exponents without checking division:</strong> The quotient rule involves division by the same base and requires an appropriate nonzero denominator.</p>
            <p><strong>Treating a negative exponent as a negative number:</strong> 2⁻³ is positive: 2⁻³ = 1/8 = 0.125.</p>
            <p><strong>Ignoring the domain of fractional powers:</strong> A negative number does not necessarily have a real even root.</p>
            <p><strong>Rounding too early:</strong> Rounding intermediate values can introduce avoidable error.</p>
            <p><strong>Confusing scientific and engineering notation:</strong> Engineering notation restricts the exponent to multiples of three.</p>
          </div>
        </section>

        {/* Section: How to Check an Exponent Calculation */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Check an Exponent Calculation
          </h2>
          <p>
            A good way to verify an exponent result is to reverse the operation:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>For 2¹⁰ = 1024, check ¹⁰√1024 = 2.</li>
            <li>For 27^(2/3) = 9, check 9^(3/2) = 27.</li>
            <li>For 2⁻³ = 1/8, check 8 × (1/8) = 1.</li>
          </ul>
          <p>
            Reverse calculations are especially useful when a decimal approximation has been rounded.
          </p>
        </section>

        {/* Section: When Should I Use Exact Form vs Decimal Form? */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            When Should I Use Exact Form vs Decimal Form?
          </h2>
          <p>
            Use exact notation when preserving mathematical structure matters. For example, √2 contains more exact information than 1.4142. Likewise, a rational exponent or radical may be preferable to a rounded decimal when presenting algebraic work.
          </p>
          <p>
            Decimal notation is useful when you need a numerical approximation for measurement, comparison or further numerical calculations. A good workflow is to preserve the exact form as long as practical and round only at the final presentation stage when a decimal is required.
          </p>
        </section>

        {/* Section: Exponent Calculator Examples */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Exponent Calculator Examples
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono pt-1">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Integer Power:</strong> 2¹⁰ = 1024</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Fractional Power:</strong> 27^(2/3) = 9</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Product Rule:</strong> 2³ × 2⁴ = 128</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Quotient Rule:</strong> 5⁸ / 5² = 15,625</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Power of Power:</strong> (3²)⁴ = 6,561</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Negative Exp:</strong> 2⁻³ = 0.125</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Negative Base:</strong> (−2)³ = −8</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Scientific:</strong> 5.4×10⁶ = 5,400,000</div>
          </div>
          <p className="text-xs text-slate-500 italic">
            These examples are all independently verified golden cases in the calculator&apos;s production audit.
          </p>
        </section>

        {/* Section: What Can the Exponent Calculator Do? */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Can the Exponent Calculator Do?
          </h2>
          <p>
            The calculator can help with evaluating powers, solving for an unknown base, solving for an unknown exponent, fractional exponents, radical relationships, negative exponents, negative bases where a real result is supported, eight exponent laws, scientific notation, engineering notation, E-notation, and step-by-step mathematical explanations.
          </p>
        </section>

        {/* Section: What Can the Exponent Calculator Not Determine? */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Can the Exponent Calculator Not Determine?
          </h2>
          <p>
            The calculator evaluates mathematical expressions; it does not decide whether a mathematical model is appropriate for a real-world problem. For example, a calculation can be arithmetically correct while the equation used to describe a physical, financial or scientific system is inappropriate. Use the calculator to verify mathematical operations, not as a substitute for selecting a valid mathematical model.
          </p>
        </section>

        {/* Section: Exponent Laws Reference */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Exponent Laws Reference
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono pt-1">
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">aᵐaⁿ = aᵐ⁺ⁿ</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">aᵐ/aⁿ = aᵐ⁻ⁿ (a≠0)</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">(aᵐ)ⁿ = aᵐⁿ</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">(ab)ⁿ = aⁿbⁿ</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">(a/b)ⁿ = aⁿ/bⁿ (b≠0)</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">a⁰ = 1 (a≠0)</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">a⁻ⁿ = 1/aⁿ (a≠0)</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border">a^(m/n) = ⁿ√(aᵐ)</div>
          </div>
          <p className="text-xs text-slate-500 italic">
            These identities are most useful when their domain restrictions are kept visible rather than omitted.
          </p>
        </section>

        {/* Section: Real-World Applications */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Real-World Applications of Exponents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border space-y-1">
              <strong className="text-sm font-bold text-slate-900 dark:text-slate-100 block">Finance and Compound Growth</strong>
              <p>Compound growth can be represented using powers: A = P(1 + r/n)ⁿᵗ, where P is the initial principal, r is the annual rate as a decimal, n is compounding periods per year, and t is time in years.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border space-y-1">
              <strong className="text-sm font-bold text-slate-900 dark:text-slate-100 block">Scientific Measurement</strong>
              <p>Scientific notation makes extremely large and small measurements easier to write and compare: 5.4 × 10⁶ is substantially easier to interpret than writing all seven digits.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border space-y-1">
              <strong className="text-sm font-bold text-slate-900 dark:text-slate-100 block">Computing &amp; Memory</strong>
              <p>Binary quantities naturally involve powers of two: 2¹⁰ = 1,024 bytes (1 KiB) and 2²⁰ = 1,048,576 bytes (1 MiB).</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border space-y-1">
              <strong className="text-sm font-bold text-slate-900 dark:text-slate-100 block">Chemistry &amp; Seismology</strong>
              <p>The pH scale uses pH = −log₁₀[H⁺]. Earthquake magnitude scales are logarithmic, where differences in magnitude represent multiplicative differences in physical quantities.</p>
            </div>
          </div>

          {/* MID-CONTENT INTERNAL LINK #4 */}
          <div className="p-4 bg-blue-50/70 dark:bg-slate-800/70 rounded-xl border border-blue-200 dark:border-slate-700 text-xs mt-3">
            <p className="text-slate-700 dark:text-slate-300">
              For broader scientific and numerical calculations involving powers, logarithms, trigonometric functions and other operations, use the{" "}
              <Link href="/calculators/scientific-calculator" className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-800">
                Scientific Calculator
              </Link>.
            </p>
          </div>
        </section>

        {/* Section: How the Calculator's Step-by-Step Results Help */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How the Calculator&apos;s Step-by-Step Results Help
          </h2>
          <p>
            A numerical result is easier to trust when the intermediate algebra can be checked. For example, 27^(2/3) = 9 becomes: fractional exponent = 2/3 &rarr; cube root = ³√27 &rarr; ³√27 = 3 &rarr; 3² = 9.
          </p>
          <p>
            The step-by-step presentation makes it possible to locate an error without recalculating the entire problem from scratch.
          </p>
        </section>

        {/* Section: Saving and Exporting */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Saving and Exporting Exponent Calculations
          </h2>
          <p>
            The calculator provides several ways to preserve the calculation:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Save:</strong> stores calculations for later review.</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Copy LaTeX:</strong> copies mathematical notation suitable for notes.</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Copy Summary:</strong> copies a readable multi-module text summary.</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>CSV:</strong> exports structured calculation data for spreadsheets.</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>PDF / Print:</strong> creates a clean, zero-gap printable report.</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Share:</strong> encodes active calculation values into a shareable URL.</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Reset:</strong> returns all four modules to default states.</div>
          </div>
        </section>

        {/* Section: Mathematical References */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Mathematical References
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The exponent rules and notation discussed on this page are standard algebraic concepts. For further study, consult authoritative educational and standards resources:
          </p>
          <ul className="space-y-2 text-xs">
            <li className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <a
                  href="https://openstax.org/books/college-algebra-2e/pages/1-2-exponents-and-scientific-notation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:underline block"
                >
                  OpenStax College Algebra (2e) — Section 1.2: Exponents and Scientific Notation
                </a>
                <span className="text-slate-500">Covers product, quotient, and power rules, negative exponents, and scientific notation standards.</span>
              </div>
            </li>
            <li className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <a
                  href="https://openstax.org/books/college-algebra-2e/pages/1-3-radicals-and-rational-exponents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:underline block"
                >
                  OpenStax College Algebra (2e) — Section 1.3: Radicals and Rational Exponents
                </a>
                <span className="text-slate-500">Defines fractional powers, nth roots, real vs complex domains, and radical simplification.</span>
              </div>
            </li>
            <li className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <a
                  href="https://www.nist.gov/pml/owm/metric-si-prefixes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:underline block"
                >
                  NIST Guide to the SI — SI Prefixes and Powers of Ten
                </a>
                <span className="text-slate-500">Official National Institute of Standards and Technology guide to decimal powers of ten and metric prefixes.</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Section: FAQ (ALL 36 UNFOLDED BY DEFAULT) */}
        <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>Frequently Asked Questions About Exponents</span>
            </h2>
            <span className="text-xs text-slate-500 font-semibold">
              {exponent_calculatorFaqs.length} Answers
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {exponent_calculatorFaqs.map((faq, idx) => {
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

        {/* Section: Related Math Calculators */}
        <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Related Math Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            <Link
              href="/calculators/scientific-notation-calculator"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-blue-600 group-hover:underline">
                  Scientific Notation Calculator
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Use for dedicated scientific-notation and number-format conversion tasks.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 pt-3">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              href="/calculators/log-calculator"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-blue-600 group-hover:underline">
                  Log Calculator
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Use when solving logarithmic relationships or exponential equations involving unknown exponents.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 pt-3">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              href="/calculators/root-calculator"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-blue-600 group-hover:underline">
                  Root Calculator &amp; Radical Simplifier
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Use for square roots, radicals and exact root simplification.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 pt-3">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              href="/calculators/scientific-calculator"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-blue-600 group-hover:underline">
                  Scientific Calculator
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Use for broader scientific and mathematical calculations.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 pt-3">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* Section: Disclaimer */}
        <section className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <p className="font-bold uppercase tracking-wider text-[10px] text-slate-400">
            Mathematical Disclaimer:
          </p>
          <p>
            This calculator is an educational mathematical tool. It applies standard algebraic rules, radical algorithms and floating-point arithmetic to the inputs you provide. For critical scientific, financial, engineering, or coursework calculations, independently verify results against authoritative references.
          </p>
          <p>
            The calculator does not evaluate whether a particular mathematical model correctly represents a real-world system. An algebraically accurate power or conversion can still be physically inappropriate if the governing assumptions or domain restrictions are violated.
          </p>
        </section>

      </div>
    </article>
  );
}

export default ExponentContent;
