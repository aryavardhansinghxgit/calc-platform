"use client";

import React from "react";

export function PythagoreanContent() {
  return (
    <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          1. Introduction to the Pythagorean Theorem
        </h2>
        <p>
          The <strong>Pythagorean Theorem</strong> is a fundamental principle in Euclidean geometry stating that in any right-angled triangle, the area of the square whose side is the hypotenuse (the side opposite the right angle) is equal to the sum of the areas of the squares on the other two legs.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. Mathematical Concept &amp; Core Definitions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Legs (a &amp; b)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The two shorter sides of a right triangle that intersect at a 90&deg; right angle.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Hypotenuse (c)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The longest side of a right triangle, situated directly opposite the 90&deg; right angle.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Pythagorean Triple</h3>
            <p className="text-slate-600 dark:text-slate-400">
              A set of three positive integers (a, b, c) that perfectly satisfy a&sup2; + b&sup2; = c&sup2; (e.g., 3-4-5, 5-12-13).
            </p>
          </div>
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Pythagorean Theorem Formula Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Unknown Parameter</th>
                <th className="p-3">Formula</th>
                <th className="p-3">Exact Radical Form</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-3 font-bold font-sans">Hypotenuse c</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">c = &radic;(a&sup2; + b&sup2;)</td>
                <td className="p-3 font-sans">&radic;(a&sup2; + b&sup2;) simplified</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Leg a</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">a = &radic;(c&sup2; - b&sup2;)</td>
                <td className="p-3 font-sans">&radic;(c&sup2; - b&sup2;) simplified</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Leg b</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">b = &radic;(c&sup2; - a&sup2;)</td>
                <td className="p-3 font-sans">&radic;(c&sup2; - a&sup2;) simplified</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Area A</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = &frac12;ab</td>
                <td className="p-3 font-sans">Half product of legs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          4. How Step-by-Step Solving Works
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 1: Identify Known Sides</h3>
            <p>Determine whether two legs (a, b) or one leg and the hypotenuse (a, c) are known.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 2: Square Known Values &amp; Subtract/Add</h3>
            <p>Compute a&sup2; and b&sup2;. Sum them for hypotenuse c&sup2; = a&sup2; + b&sup2;, or subtract for a leg: a&sup2; = c&sup2; - b&sup2;.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 3: Simplify Radical &amp; Solve Metrics</h3>
            <p>Extract the square root to get exact radical form and decimal approximations for hypotenuse, area, perimeter, and acute angles.</p>
          </div>
        </div>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          5. Worked Step-by-Step Examples
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 1: Classic 3-4-5 Right Triangle
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> Given leg a = 3 cm and leg b = 4 cm, find hypotenuse c and area A.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              1. c&sup2; = 3&sup2; + 4&sup2; = 9 + 16 = 25.<br />
              2. c = &radic;25 = 5 cm.<br />
              3. Area A = &frac12; &times; 3 &times; 4 = 6 cm&sup2;.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Visual Proof &amp; Geometric Understanding
        </h2>
        <p className="text-xs">
          Constructing squares on each of the three sides of a right triangle provides a visual proof: the combined area of the square built on leg a (a&sup2;) and the square built on leg b (b&sup2;) exactly equals the area of the large square built on hypotenuse c (c&sup2;).
        </p>
      </section>

      {/* 7. MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Common Pitfalls &amp; Frequent User Errors
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li>
            <strong>Applying Theorem to Non-Right Triangles:</strong> Using a&sup2; + b&sup2; = c&sup2; on oblique (acute or obtuse) triangles without a 90&deg; right angle.
          </li>
          <li>
            <strong>Subtracting in Wrong Order when Solving for a Leg:</strong> Writing b = &radic;(a&sup2; - c&sup2;) instead of b = &radic;(c&sup2; - a&sup2;).
          </li>
        </ul>
      </section>

      {/* 8. APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          8. Practical &amp; Professional Applications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Carpentry &amp; Construction</h3>
            <p>Squaring foundation walls using the 3-4-5 rule to ensure perfect 90&deg; corners.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Navigation &amp; GPS</h3>
            <p>Computing straight-line 2D/3D Euclidean distance between coordinates.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Computer Graphics</h3>
            <p>Determining vector magnitudes and distance fields in 2D and 3D rendering engines.</p>
          </div>
        </div>
      </section>

      {/* 9. RELATED CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          9. Related Mathematical Concepts
        </h2>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Right Triangle Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Triangle Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Distance Calculator
          </span>
        </div>
      </section>

      {/* 10. SUMMARY */}
      <section className="p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h2 className="text-base font-bold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          The Pythagorean Theorem (a&sup2; + b&sup2; = c&sup2;) is the cornerstone of Euclidean geometry and trigonometry. Solving right triangles accurately enables precise spatial calculations across engineering, architecture, and physics.
        </p>
      </section>
    </article>
  );
}

export default PythagoreanContent;
