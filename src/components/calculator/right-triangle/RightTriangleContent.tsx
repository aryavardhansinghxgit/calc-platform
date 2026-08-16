"use client";

import React from "react";

export function RightTriangleContent() {
  return (
    <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          1. Introduction to Right Triangles &amp; Trigonometry
        </h2>
        <p>
          A <strong>Right Triangle</strong> is a polygon with three sides containing exactly one 90&deg; right angle. Right triangles form the foundational basis of trigonometry, surveying, structural engineering, vector navigation, and computer graphics.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. Mathematical Anatomy of a Right Triangle
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Legs (a &amp; b)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The two perpendicular side lengths that meet at the 90&deg; right angle corner.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Hypotenuse (c)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The longest side of the right triangle, directly opposing the 90&deg; right angle.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Complementary Angles</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The two non-right acute angles always sum to 90&deg; (&alpha; + &beta; = 90&deg;).
            </p>
          </div>
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Complete Right Triangle &amp; Trigonometric Formulas Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Concept / Metric</th>
                <th className="p-3">Formula</th>
                <th className="p-3">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-3 font-bold font-sans">Pythagorean Theorem</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">c = &radic;(a&sup2; + b&sup2;)</td>
                <td className="p-3 font-sans">Hypotenuse from legs</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Sine (&sin;)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">sin(&alpha;) = a / c</td>
                <td className="p-3 font-sans">Opposite over Hypotenuse</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Cosine (&cos;)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">cos(&alpha;) = b / c</td>
                <td className="p-3 font-sans">Adjacent over Hypotenuse</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Tangent (&tan;)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">tan(&alpha;) = a / b</td>
                <td className="p-3 font-sans">Opposite over Adjacent</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Altitude (h_c)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">h_c = (a &middot; b) / c</td>
                <td className="p-3 font-sans">Height from 90&deg; vertex to hypotenuse</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Inradius (r)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">r = (a + b - c) / 2</td>
                <td className="p-3 font-sans">Radius of inscribed circle</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          4. How Step-by-Step Derivation Works
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 1: Solve Missing Side via Pythagorean Theorem</h3>
            <p>Calculate third side c = &radic;(a&sup2; + b&sup2;) or b = &radic;(c&sup2; - a&sup2;).</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 2: Solve Acute Angles via SOH CAH TOA</h3>
            <p>Compute &alpha; = arctan(a/b) and &beta; = 90&deg; - &alpha;.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 3: Calculate Invariants &amp; Trig Matrix</h3>
            <p>Derive Area K = &frac12;ab, Perimeter P = a + b + c, Altitude h_c = ab/c, and all 6 trigonometric ratios.</p>
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
              Example 1: Solving 5-12-13 Right Triangle
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> Given leg a = 5 cm and leg b = 12 cm, solve all metrics.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              1. Hypotenuse c = &radic;(5&sup2; + 12&sup2;) = &radic;(25 + 144) = &radic;169 = 13 cm.<br />
              2. Angle &alpha; = arctan(5/12) &approx; 22.62&deg;.<br />
              3. Angle &beta; = 90&deg; - 22.62&deg; = 67.38&deg;.<br />
              4. Area K = &frac12; &times; 5 &times; 12 = 30 cm&sup2;.<br />
              5. Altitude h_c = (5 &times; 12) / 13 = 60/13 &approx; 4.615 cm.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Visual SOH CAH TOA &amp; Geometric Lines
        </h2>
        <p className="text-xs">
          The altitude to the hypotenuse divides the original right triangle into two smaller similar right triangles. Thales's theorem dictates that the hypotenuse c is always the diameter of the circumcircle with circumradius R = c/2.
        </p>
      </section>

      {/* 7. MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Common Pitfalls &amp; Frequent User Errors
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li>
            <strong>Mixing Degrees and Radians:</strong> Forgetting to set calculator mode when calculating sin(&alpha;) or cos(&alpha;).
          </li>
          <li>
            <strong>Swapping Opposite and Adjacent:</strong> Using tan(&alpha;) = b/a instead of a/b relative to angle &alpha;.
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
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Roofing &amp; Civil Engineering</h3>
            <p>Calculating roof pitches, wheelchair ramp slopes (1:12 ADA compliance), and stair stringers.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Land Surveying</h3>
            <p>Triangulating terrain heights and distances using clinometer angle measurements.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Aviation Navigation</h3>
            <p>Resolving ground speed and wind drift vectors into perpendicular components.</p>
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
            Pythagorean Theorem Calculator
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
          Right triangles combine the Pythagorean theorem with SOH CAH TOA trigonometric functions. Solving side and angle relationships enables essential applications across carpentry, surveying, and physics.
        </p>
      </section>
    </article>
  );
}

export default RightTriangleContent;
