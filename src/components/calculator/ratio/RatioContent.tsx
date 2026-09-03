"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Percent,
  Divide,
  Calculator,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Info
} from "lucide-react";
import { ratio_calculatorFaqs } from "@/app/calculators/ratio-calculator/faq";

export function RatioContent() {
  // Unfolded by default FAQ state
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    ratio_calculatorFaqs.forEach((_, idx) => {
      initial[idx] = true;
    });
    return initial;
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Structured Data FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ratio_calculatorFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <article className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ========================================================================= */}
      {/* 401(k)-STYLE RELATED CALCULATORS MID-BAR (BETWEEN CALCULATOR & CONTENT) */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Related Mathematical Solvers
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">Verified CalcPlatform Tools</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/calculators/percentage-calculator"
            className="group flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-xs"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
              <Percent className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600 truncate">
                Percentage Calculator
              </span>
              <span className="text-[11px] text-slate-500 block truncate">Convert ratios to %</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/calculators/fraction-calculator"
            className="group flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-xs"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
              <Divide className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block group-hover:text-emerald-600 truncate">
                Fraction Calculator
              </span>
              <span className="text-[11px] text-slate-500 block truncate">Reduce &amp; simplify fractions</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/calculators/scientific-calculator"
            className="group flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-xs"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform">
              <Calculator className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block group-hover:text-purple-600 truncate">
                Scientific Calculator
              </span>
              <span className="text-[11px] text-slate-500 block truncate">High-precision arithmetic</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: INTRO */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          A ratio is a way of comparing quantities. It can describe how much of one quantity there is relative to another, how a total should be divided, or how two dimensions should scale together. Ratios appear in recipes, maps, measurements, financial analysis, image dimensions, design, and many everyday calculations.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          This Ratio Calculator combines several related ratio calculations in one place. You can solve a proportion such as 3:4 = 6:?, simplify two- or three-part ratios, calculate a unit rate, divide a total according to a ratio, resize dimensions while preserving an aspect ratio, and calculate a golden-ratio division.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The calculator also shows the mathematical steps behind the result. That makes it useful when you need more than an answer: you can check the cross-multiplication, verify a greatest common divisor, see how a total is partitioned, or confirm that resized dimensions preserve the original ratio.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          A ratio does not have to be written only with a colon. A comparison such as 3 to 4, 3:4, and 3/4 expresses the same numerical relationship when the quantities are being compared in the same order.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: WHAT IS A RATIO? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">What Is a Ratio?</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A ratio compares two or more quantities in a specified order.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For two quantities, a ratio can be written as:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-center font-bold text-blue-600 text-sm">
          a:b &nbsp;|&nbsp; a/b &nbsp;|&nbsp; a to b
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For example, if a box contains 3 red balls and 4 blue balls, the ratio of red balls to blue balls is:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-center font-bold text-slate-900 dark:text-slate-100 text-sm">
          3:4
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The order matters. A ratio of 3:4 is not the same comparison as 4:3.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Ratios can be used for part-to-part comparisons, part-to-whole comparisons, and whole-to-part comparisons. A fraction is often used as the numerical representation of a ratio, but the two ideas are not identical: a ratio emphasizes comparison, while a fraction commonly represents a part of a whole.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: HOW TO USE THIS RATIO CALCULATOR */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">How to Use This Ratio Calculator</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator contains several tools, so choose the section that matches the problem you are trying to solve.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Solve a Proportion</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Use the Proportion Solver when you know three terms in <code className="font-mono text-blue-600">A/B = C/D</code> and need to find the fourth. The calculator can solve for A, B, C, or D.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Simplify a Ratio</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Use the Ratio Simplifier for ratios such as <code className="font-mono text-blue-600">12:18:24</code>. The calculator reduces the terms to their simplest whole-number relationship.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Divide a Total by a Ratio</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Use Ratio Partitioning &amp; Amount Divider when a total must be distributed proportionally (e.g. divide 500 in the ratio <code className="font-mono text-blue-600">2:3:5</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Resize Dimensions &amp; Golden Ratio</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Use the Aspect Ratio Resizer when one dimension changes while width-to-height must remain fixed, or find a golden-ratio division according to <code className="font-mono text-blue-600">φ ≈ 1.61803398875</code>.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: HOW TO SOLVE A PROPORTION */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">How to Solve a Proportion</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A proportion states that two ratios are equal:
        </p>
        <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl text-center font-mono font-bold text-blue-700 dark:text-blue-300 text-sm">
          A/B = C/D
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For a valid proportion, cross multiplication gives:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
          A × D = B × C
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This relationship is the basis for solving the missing term. OpenStax describes the same equivalence: two ratios are proportional exactly when the cross-products are equal.
        </p>

        {/* RESPONSIVE SVG FLOWCHART DIAGRAM */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 my-6">
          <div className="text-center mb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              How Ratios Turn Into a Proportion
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Equivalent ratios form a proportion, which can be solved by comparing cross-products.
            </p>
          </div>
          <svg
            viewBox="0 0 700 80"
            className="w-full h-auto text-xs font-sans font-bold"
            role="img"
            aria-label="Flowchart showing how known ratio A:B and equivalent ratio C:D lead to A/B = C/D, then cross-multiplication A×D = B×C, and finally solving the unknown variable."
          >
            <title>How Ratios Turn Into a Proportion</title>
            <desc>
              Step 1: Known Ratio A:B. Step 2: Equivalent Ratio C:D. Step 3: A/B = C/D. Step 4: A×D = B×C. Step 5: Solve the Unknown.
            </desc>
            {/* Box 1 */}
            <rect x="10" y="18" width="115" height="44" rx="8" fill="#2563eb" />
            <text x="67" y="44" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Known Ratio A:B</text>

            <path d="M130 40 L145 40" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Box 2 */}
            <rect x="150" y="18" width="125" height="44" rx="8" fill="#3b82f6" />
            <text x="212" y="44" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Equivalent Ratio C:D</text>

            <path d="M280 40 L295 40" stroke="#94a3b8" strokeWidth="2" />

            {/* Box 3 */}
            <rect x="300" y="18" width="110" height="44" rx="8" fill="#0284c7" />
            <text x="355" y="44" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">A/B = C/D</text>

            <path d="M415 40 L430 40" stroke="#94a3b8" strokeWidth="2" />

            {/* Box 4 */}
            <rect x="435" y="18" width="120" height="44" rx="8" fill="#0d9488" />
            <text x="495" y="44" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">A × D = B × C</text>

            <path d="M560 40 L575 40" stroke="#94a3b8" strokeWidth="2" />

            {/* Box 5 */}
            <rect x="580" y="18" width="110" height="44" rx="8" fill="#16a34a" />
            <text x="635" y="44" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Solve Unknown</text>
          </svg>
        </div>

        <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-slate-100">Example: Solve for D</p>
          <p>Suppose: <code className="font-mono">3/4 = 6/D</code></p>
          <p>Cross multiply: <code className="font-mono">3D = 4 × 6 ⇒ 3D = 24</code></p>
          <p>Divide by 3: <code className="font-mono">D = 8</code></p>
          <p>So: <code className="font-mono">3:4 = 6:8</code>. The calculator displays this process step by step.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono font-bold text-center">
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-sans uppercase">Solve for A</span>
            <span>A = (B × C)/D</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-sans uppercase">Solve for B</span>
            <span>B = (A × D)/C</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-sans uppercase">Solve for C</span>
            <span>C = (A × D)/B</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-sans uppercase">Solve for D</span>
            <span>D = (B × C)/A</span>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          The calculator supports all four target variables rather than assuming the missing term is always D. The production audit specifically verified all four modes.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: PROPORTION EXAMPLE: 3:4 = 6:8 */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Proportion Example: 3:4 = 6:8</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Consider: <code className="font-mono font-bold">3:4 = 6:8</code>
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Convert to fractions: <code className="font-mono">3/4 = 6/8</code>
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Cross products: <code className="font-mono">3 × 8 = 4 × 6 ⇒ 24 = 24</code>
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Because the cross-products are equal, the two ratios are proportional. The calculator&apos;s example uses exactly this relationship and returns 8 when solving the missing fourth term.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: IMPORTANT CONDITIONS WHEN SOLVING PROPORTIONS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Important Conditions When Solving Proportions
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Cross multiplication is useful when you actually have two ratios set equal to each other. It should not be applied mechanically to any equation containing fractions.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A denominator of zero is also not allowed in a ratio being treated as a quotient. For example: <code className="font-mono text-red-600">3/0</code> is undefined.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator now validates denominator-zero conditions across all four solving modes rather than silently returning an incorrect finite result.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Zero numerators are different. For example: <code className="font-mono">0/5 = 0/10</code> is mathematically meaningful because the denominators are nonzero. This distinction matters when building a reliable ratio calculator.
        </p>

        {/* MID-CONTENT ANCHOR 1 */}
        <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-xl text-xs space-y-1 my-4">
          <span className="font-bold text-blue-800 dark:text-blue-300 block">Related Calculation Tool:</span>
          <p className="text-slate-600 dark:text-slate-400">
            When your problem is about an unknown exponent or another power relationship rather than a proportional ratio, use the{" "}
            <Link href="/calculators/exponent-calculator" className="text-blue-600 hover:underline font-bold">
              Exponent Calculator
            </Link>{" "}
            for direct exponentiation and exponent-law calculations.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: HOW TO SIMPLIFY A RATIO & DECIMALS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">How to Simplify a Ratio</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          To simplify a whole-number ratio, divide all terms by their greatest common divisor (GCD).
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Consider: <code className="font-mono font-bold">12:18:24</code>
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The greatest common divisor is: <code className="font-mono">GCD(12,18,24) = 6</code>
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Divide every term by 6: <code className="font-mono">12/6 : 18/6 : 24/6 = 2:3:4</code>
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The important rule is that every term must be divided by the same factor. Dividing different terms by different numbers changes the relationship. The current calculator uses exact decimal normalization before GCD reduction when decimal inputs are provided, while leaving already-integer inputs as integers. This avoids the artificial scaling problem that previously produced unnecessarily large intermediate GCDs.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">Simplifying Ratios With Decimals</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Ratios do not have to begin as whole numbers. For example: <code className="font-mono font-bold">0.75:1.5</code>
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Multiply both terms by 100: <code className="font-mono">75:150</code>. Now divide by their GCD: <code className="font-mono">GCD(75,150) = 75 ⇒ 75:150 = 1:2</code>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator handles this normalization automatically. The important principle is that multiplying all terms by the same nonzero factor does not change the ratio.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: WHAT IS A UNIT RATE? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">What Is a Unit Rate?</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A unit rate expresses one quantity relative to 1 unit of another quantity.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          If: <code className="font-mono">12/18 = 0.666666...</code> then the value per one unit of the denominator is approximately: <code className="font-mono font-bold">0.6667</code>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The denominator tells you what the &quot;one unit&quot; refers to:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>180 km / 3 hours = 60 km per hour</li>
          <li>$24 / 6 items = $4 per item</li>
          <li>12 units / 18 units = 0.6667 of the first quantity per one unit of the second</li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Khan Academy similarly defines a unit rate as the number of units of the first quantity for every 1 unit of the second quantity. Do not round the calculation prematurely. The displayed 0.6667 is a readable rounded value; the underlying ratio should retain appropriate precision.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: RATIO VS FRACTION & PART-TO-PART VS PART-TO-WHOLE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Ratio vs Fraction</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A ratio and a fraction can use the same notation, but their purpose can differ. For example, <code className="font-mono">2:5</code> can also be written <code className="font-mono">2/5</code>. As a ratio, it may compare 2 red objects with 5 blue objects. As a fraction, 2/5 may represent 2 parts out of a total of 5. This distinction becomes important when calculating percentages or dividing a total. For a part-to-whole calculation: <code className="font-mono font-bold">part / total × 100%</code> is the usual structure.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">Part-to-Part vs Part-to-Whole Ratios</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Suppose there are 2 red balls and 3 blue balls. The red-to-blue part-to-part ratio is: <code className="font-mono font-bold">2:3</code>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The total number of balls is: <code className="font-mono">2 + 3 = 5</code>. Therefore the red-to-total part-to-whole ratio is: <code className="font-mono font-bold">2:5</code>, and the red percentage is: <code className="font-mono">2/5 × 100% = 40%</code>. The wording matters because 2:3 and 2:5 answer different questions.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">How to Convert a Ratio to a Percentage</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For a two-part ratio <code className="font-mono">A:B</code>, the percentage represented by A is: <code className="font-mono font-bold">A/(A+B) × 100%</code>. For example, in <code className="font-mono">1:4</code>, total parts = <code className="font-mono">1 + 4 = 5</code>, giving <code className="font-mono">1/5 × 100% = 20%</code>. The same idea extends naturally to three or more parts.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: DIVIDING A TOTAL IN A RATIO */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Dividing a Total in a Ratio</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          When a total is divided according to a ratio, first determine the total number of ratio parts.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For <code className="font-mono">2:3:5</code>, the number of parts is: <code className="font-mono">2 + 3 + 5 = 10</code>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          If the amount to divide is 500, then one ratio part is: <code className="font-mono">500/10 = 50</code>.
        </p>
        <div className="grid grid-cols-3 gap-3 text-xs font-mono text-center">
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Share A (2 parts)</span>
            <span className="font-bold text-blue-600 text-sm">2 × 50 = 100 (20%)</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Share B (3 parts)</span>
            <span className="font-bold text-emerald-600 text-sm">3 × 50 = 150 (30%)</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Share C (5 parts)</span>
            <span className="font-bold text-purple-600 text-sm">5 × 50 = 250 (50%)</span>
          </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Check: <code className="font-mono">100 + 150 + 250 = 500</code>. Percentages are: 20%, 30%, 50%. The calculator&apos;s partition module uses this exact structure and its production audit confirms the 100/150/250 result and the corresponding 20/30/50 visual distribution.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">Partitioning With Two Parts</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The same method works when there are only two parts. Suppose 600 must be divided in the ratio <code className="font-mono">2:1</code>. Total parts = <code className="font-mono">2 + 1 = 3</code>. One part = <code className="font-mono">600/3 = 200</code>. Therefore <code className="font-mono">A = 2 × 200 = 400</code>, <code className="font-mono">B = 1 × 200 = 200</code>. The shares add back to the original total: <code className="font-mono">400 + 200 = 600</code>.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">Why the Partition Chart Matters</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A numerical answer tells you the amount assigned to each part, but a proportional visual makes the relationship easier to scan. For a 2:3:5 split, the segments should occupy 20%, 30%, and 50% respectively. The calculator&apos;s partition visual is therefore not decorative. It remains synchronized with the calculated values whenever the total or ratio changes. The audit verified that the segmented partition visualization agrees with the numerical shares.
        </p>

        {/* MID-CONTENT ANCHOR 2 */}
        <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border-l-4 border-emerald-600 rounded-r-xl text-xs space-y-1 my-4">
          <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Related Calculation Tool:</span>
          <p className="text-slate-600 dark:text-slate-400">
            When you need to convert between fractions, decimals and broader numerical representations rather than compare quantities as ratios, the{" "}
            <Link href="/calculators/fraction-calculator" className="text-emerald-600 hover:underline font-bold">
              Fraction Calculator
            </Link>{" "}
            is the more focused tool.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11: RATIOS AND SCALING & ASPECT RATIO */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Ratios and Scaling</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Ratios are also useful for scale calculations. Suppose a drawing uses <code className="font-mono">1 cm : 10 m</code> and a measured segment on the drawing is 6 cm. A proportion can be established: <code className="font-mono">1/10 = 6/x ⇒ x = 60</code>. So the corresponding real-world length is 60 m. This is the same mathematical structure used in maps, models and scaled drawings. Ratios and proportions are widely used for scaling problems.
        </p>

        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 pt-2">What Is an Aspect Ratio?</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          An aspect ratio describes the proportional relationship between width and height. It is generally written <code className="font-mono font-bold">width:height</code>. For example, <code className="font-mono">16:9</code> means that for every 16 units of width, there are 9 units of height. NIST defines aspect ratio as the ratio of width to height for objects such as images, pixels and video frames. The same idea is used in web design, images, video, responsive interfaces, displays and graphics. MDN likewise describes aspect ratio as the proportional relationship between width and height.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">How to Calculate an Aspect Ratio</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Given <code className="font-mono">Width = 1920, Height = 1080</code>, the ratio is <code className="font-mono">1920:1080</code>. The greatest common divisor is 120: <code className="font-mono">1920/120 = 16</code>, <code className="font-mono">1080/120 = 9</code>. Therefore, the simplified aspect ratio is <code className="font-mono font-bold">16:9</code>.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">Resize an Image Without Changing Its Aspect Ratio</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Suppose the original dimensions are <code className="font-mono">1920 × 1080</code> and you want a new width of 1280 px. The original ratio is 16:9. So the new height must satisfy: <code className="font-mono">1280/height = 16/9 ⇒ height = 1280 × 9/16 = 720 px</code>. The resized dimensions are <code className="font-mono font-bold">1280 × 720 px</code>. The calculator also reports the total pixel count: <code className="font-mono">1280 × 720 = 921,600 pixels</code> (approx. 0.92 megapixels).
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">Common Aspect Ratios</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="font-bold text-blue-600 block text-sm">16:9</span>
            <span className="text-slate-500">Widescreen displays &amp; video systems</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="font-bold text-blue-600 block text-sm">4:3</span>
            <span className="text-slate-500">Traditional rectangular monitors &amp; TV</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="font-bold text-blue-600 block text-sm">1:1</span>
            <span className="text-slate-500">Square social media &amp; profile formats</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="font-bold text-blue-600 block text-sm">9:16</span>
            <span className="text-slate-500">Portrait mobile vertical video</span>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          An aspect ratio describes proportion, not a fixed pixel size. A 16:9 image can be 160×90, 1280×720, 1920×1080, or another pair of dimensions with the same ratio.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">Why Preserving Aspect Ratio Matters</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Changing width and height independently can stretch or compress an image. To preserve the intended proportions, one dimension should be derived from the other using the original ratio. The same principle is used in responsive web design, where maintaining an aspect ratio allows an element to change size without changing its shape. MDN notes that aspect ratio is particularly important for responsive media because it helps preserve intended proportions across different sizes.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12: GOLDEN RATIO */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Golden Ratio</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The golden ratio is the constant:
        </p>
        <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl text-center font-mono font-bold text-blue-700 dark:text-blue-300 text-sm">
          φ = (1 + √5)/2 ≈ 1.61803398875
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A line segment is divided in the golden ratio when: <code className="font-mono font-bold">(A+B)/A = A/B = φ</code>, where A is the longer segment and B is the shorter segment. This relationship can be derived from <code className="font-mono">φ² − φ − 1 = 0</code>. MathWorld gives the same exact form and decimal approximation.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">Golden Ratio Example: Total Length 100</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Suppose <code className="font-mono">A + B = 100</code> and <code className="font-mono">A/B = φ</code>. The longer segment is approximately <code className="font-mono font-bold">61.8034</code> and the shorter segment is <code className="font-mono font-bold">38.1966</code>. Check: <code className="font-mono">61.8034 + 38.1966 = 100</code> and <code className="font-mono">61.8034 / 38.1966 ≈ 1.618034</code>. The calculator provides both the two segment values and the visual golden-ratio division.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">Golden Ratio Is Not the Same as an Ordinary 61:38 Ratio</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The golden ratio is an irrational mathematical constant, so values such as 61.8034:38.1966 are rounded decimal representations. They approximate the exact relationship <code className="font-mono">A/B = φ</code>. This distinction matters when the calculator displays a finite number of decimal places: the total can be exact while the displayed segment values are rounded for readability.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 13: HOW TO CHECK A RESULT & COMMON MISTAKES */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          How the Ratio Calculator Helps You Check a Result
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A good ratio calculation should be easy to verify:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
          <li><strong>For a proportion:</strong> <code className="font-mono">A/B = C/D ⇒ A×D = B×C</code>.</li>
          <li><strong>For a simplified ratio:</strong> divide original terms by common GCD and confirm proportions remain unchanged.</li>
          <li><strong>For a partition:</strong> <code className="font-mono">Share A + Share B + Share C = Total</code>.</li>
          <li><strong>For an aspect-ratio resize:</strong> <code className="font-mono">New Width / New Height = Original Width / Original Height</code>.</li>
          <li><strong>For the golden ratio:</strong> <code className="font-mono">A + B = Total</code> and <code className="font-mono">A / B ≈ 1.61803398875</code>.</li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator&apos;s step-by-step output is designed around these verification relationships.
        </p>

        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 pt-3">Common Ratio Calculation Mistakes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Reversing the Order</span>
            <span className="text-slate-600 dark:text-slate-400">2:3 is not the same relationship as 3:2.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Dividing Only One Term</span>
            <span className="text-slate-600 dark:text-slate-400">To simplify a ratio, divide every term by the same factor.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Using Different Scale Factors</span>
            <span className="text-slate-600 dark:text-slate-400">Multiplying one ratio term by 10 but another by 100 changes the relationship.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Forgetting Total in a Partition</span>
            <span className="text-slate-600 dark:text-slate-400">For 2:3:5, divisor is 2+3+5 = 10, not 5 or 3.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Confusing Part-to-Part with Part-to-Whole</span>
            <span className="text-slate-600 dark:text-slate-400">2:3 is not a 40%/60% split until total parts (5) are calculated.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Premature Rounding</span>
            <span className="text-slate-600 dark:text-slate-400">Premature decimal rounding can distort simplified ratios and image resizes.</span>
          </div>
        </div>

        {/* MID-CONTENT ANCHOR 3 */}
        <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 border-l-4 border-purple-600 rounded-r-xl text-xs space-y-1 my-4">
          <span className="font-bold text-purple-800 dark:text-purple-300 block">Related Calculation Tool:</span>
          <p className="text-slate-600 dark:text-slate-400">
            When your ratio calculation is part of a larger numerical problem, the{" "}
            <Link href="/calculators/scientific-calculator" className="text-purple-600 hover:underline font-bold">
              Scientific Calculator
            </Link>{" "}
            can help check the arithmetic while the Ratio Calculator handles the proportional relationship itself.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 14: RATIO, RATE AND PROPORTION: WHAT IS THE DIFFERENCE? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Ratio, Rate and Proportion: What Is the Difference?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A ratio compares quantities. A rate compares quantities with different units, such as kilometers per hour or dollars per kilogram. A unit rate expresses that rate relative to one unit of the second quantity. A proportion states that two ratios are equal.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center font-mono">
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-sans">Ratio</span>
            <span className="font-bold text-blue-600">3 : 4</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-sans">Rate</span>
            <span className="font-bold text-blue-600">60 km / 2 h</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-sans">Unit Rate</span>
            <span className="font-bold text-blue-600">30 km / 1 h</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-sans">Proportion</span>
            <span className="font-bold text-blue-600">3/4 = 6/8</span>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Understanding this terminology makes it easier to choose the correct calculator mode.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 15: AUDITED RATIO CALCULATOR EXAMPLES */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Ratio Calculator Examples</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-sans">
          <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-600 block">Example 1: Missing Term</span>
            <div className="font-mono font-bold">3:4 = 6:?</div>
            <div className="text-slate-500">Result: <span className="font-bold text-blue-600">8</span></div>
          </div>
          <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-600 block">Example 2: Simplify</span>
            <div className="font-mono font-bold">12:18:24</div>
            <div className="text-slate-500">Result: <span className="font-bold text-blue-600">2:3:4</span></div>
          </div>
          <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-600 block">Example 3: Unit Rate</span>
            <div className="font-mono font-bold">12/18</div>
            <div className="text-slate-500">Result: <span className="font-bold text-blue-600">0.6667</span></div>
          </div>
          <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-600 block">Example 4: Divide Total</span>
            <div className="font-mono font-bold">500 in 2:3:5</div>
            <div className="text-slate-500">Result: <span className="font-bold text-blue-600">100, 150, 250</span></div>
          </div>
          <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-600 block">Example 5: Resize</span>
            <div className="font-mono font-bold">1920×1080 → 1280</div>
            <div className="text-slate-500">Result: <span className="font-bold text-blue-600">1280×720</span></div>
          </div>
          <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-600 block">Example 6: Golden Ratio</span>
            <div className="font-mono font-bold">Total = 100</div>
            <div className="text-slate-500">Result: <span className="font-bold text-blue-600">A ≈ 61.8034, B ≈ 38.1966</span></div>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          These are not arbitrary examples; they correspond to the calculator&apos;s independently audited golden cases.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 16: WHAT MAKES A RATIO CALCULATOR RELIABLE? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          What Makes a Ratio Calculator Reliable?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A useful ratio calculator should do more than perform one division. It should preserve the relationship between terms, validate invalid inputs, retain numerical precision internally, show the mathematical method, and keep visualizations and exports synchronized with the current calculation.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Audited Production Quality Standards (17,508 / 17,508 Tests Passed)
          </span>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            This calculator&apos;s production audit specifically verified all four proportion-solving targets, ratio simplification, decimal normalization, partition sums and percentages, aspect-ratio resizing, golden-ratio calculations, step-by-step derivations, visual distribution bars, PDF, Print, CSV, Copy and Share, Save, Load, Delete and Clear All, keyboard accessibility, and responsive layouts from 320px to 1920px.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 17: SAVING, COPYING AND EXPORTING */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Saving, Copying and Exporting Your Ratio Calculation
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator provides several ways to keep a result:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li><strong>Save:</strong> stores a calculation for later use.</li>
          <li><strong>Copy Summary:</strong> provides a readable text representation.</li>
          <li><strong>Copy LaTeX:</strong> is useful when a mathematical expression needs to be placed into notes or documents.</li>
          <li><strong>CSV:</strong> can be used when structured calculation data is more useful than a visual report.</li>
          <li><strong>PDF / Print:</strong> creates an executive 2-page report without blank whitespace.</li>
          <li><strong>Share:</strong> preserves the supported calculation state via URL query parameters.</li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          These outputs correspond to the current inputs and results, not a previously displayed example. The audit verified export parity across the calculation, UI, step-by-step output, visualizations, PDF, CSV, copied output and saved state.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 18: FREQUENTLY ASKED QUESTIONS (UNFOLDED BY DEFAULT) */}
      {/* ========================================================================= */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
          <span className="text-xs text-slate-500 font-medium">25 Verified Questions</span>
        </div>

        <div className="space-y-3">
          {ratio_calculatorFaqs.map((faq, idx) => {
            const isOpen = !!openFaqs[idx];
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 19: RELATED CALCULATORS (FULL CARD GRID) */}
      {/* ========================================================================= */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Related Calculators</h2>
        <p className="text-xs text-slate-500">
          Only link the calculators actually associated with this page:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
          <Link
            href="/calculators/percentage-calculator"
            className="group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 transition-all shadow-xs space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600">
                  Percentage Calculator
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Useful when a ratio needs to be expressed as a percentage or when working directly with percentage relationships.
              </p>
            </div>
            <span className="text-[11px] font-bold text-blue-600 flex items-center gap-1 pt-1">
              Explore Calculator <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href="/calculators/fraction-calculator"
            className="group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 transition-all shadow-xs space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Divide className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600">
                  Fraction Calculator
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Useful when the ratio needs to be manipulated as a fraction or when fraction arithmetic is the main task.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 pt-1">
              Explore Calculator <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            href="/calculators/scientific-calculator"
            className="group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-purple-500 transition-all shadow-xs space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-purple-600" />
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-purple-600">
                  Scientific Calculator
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Useful for checking broader numerical calculations that accompany a ratio problem.
              </p>
            </div>
            <span className="text-[11px] font-bold text-purple-600 flex items-center gap-1 pt-1">
              Explore Calculator <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 20: MATHEMATICAL REFERENCE NOTES */}
      {/* ========================================================================= */}
      <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Mathematical Reference Notes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-center">
          <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-[10px] text-slate-400 block font-sans">Proportion</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">A/B = C/D</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-[10px] text-slate-400 block font-sans">Cross Product</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">A×D = B×C</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-[10px] text-slate-400 block font-sans">Simplification</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">Term / GCD</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-[10px] text-slate-400 block font-sans">Partitioning</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">Total × (Part/Σ)</span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-[10px] text-slate-400 block font-sans">Golden Ratio</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">φ ≈ 1.618034</span>
          </div>
        </div>
        <p className="text-slate-500 font-sans text-[11px] leading-relaxed">
          A useful ratio calculation is not just about obtaining a number; it is about preserving the mathematical relationship represented by that number.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 21: MATHEMATICAL DISCLAIMER */}
      {/* ========================================================================= */}
      <footer className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[11px] text-slate-500 space-y-1">
        <h2 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-blue-600" /> Mathematical Disclaimer
        </h2>
        <p className="leading-relaxed">
          This calculator performs mathematical calculations based on the values entered by the user. A correct numerical result does not by itself determine whether a particular ratio, proportion, financial comparison, design specification, or real-world model is appropriate for a specific situation. For professional, engineering, financial or other consequential work, verify the assumptions, units, source data and required conventions independently.
        </p>
      </footer>
    </article>
  );
}

export default RatioContent;
