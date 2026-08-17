"use client";

import React from "react";

export function TriangleContent() {
  return (
    <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          1. Introduction to Triangle Geometry &amp; Trigonometric Solvers
        </h2>
        <p>
          A <strong>triangle</strong> is a fundamental three-sided polygon formed by joining three non-collinear vertices in a two-dimensional Euclidean plane. Denoted as &Delta;ABC, a triangle contains 6 core parameters: three side lengths (a, b, c) and three interior angles (A, B, C).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 text-sm">
              Classification by Sides
            </h3>
            <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 list-disc pl-4">
              <li><strong>Equilateral Triangle:</strong> All three sides are equal (a = b = c), and all angles equal 60&deg;.</li>
              <li><strong>Isosceles Triangle:</strong> Two sides are equal in length (a = b &ne; c), with equal base angles.</li>
              <li><strong>Scalene Triangle:</strong> All three sides have distinct lengths (a &ne; b &ne; c) and unique interior angles.</li>
            </ul>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 space-y-2">
            <h3 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">
              Classification by Angles
            </h3>
            <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 list-disc pl-4">
              <li><strong>Right Triangle:</strong> Exactly one interior angle equals 90&deg; (&pi;/2 rad).</li>
              <li><strong>Acute Triangle:</strong> All three interior angles are strictly less than 90&deg;.</li>
              <li><strong>Obtuse Triangle:</strong> Exactly one interior angle is strictly greater than 90&deg;.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. MATHEMATICAL CONCEPT & THEOREMS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. Core Geometric Theorems &amp; Laws
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Triangle Inequality Theorem</h3>
            <p>
              The sum of the lengths of any two sides of a triangle must strictly exceed the length of the remaining third side: <strong>a + b &gt; c</strong>, <strong>a + c &gt; b</strong>, and <strong>b + c &gt; a</strong>. If this condition is violated, no closed 2D triangle can exist.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Interior Angle Sum Theorem</h3>
            <p>
              The sum of all interior angles in any Euclidean plane triangle is identically 180&deg; (&pi; radians): <strong>A + B + C = 180&deg;</strong>.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Pythagorean Theorem &amp; Special Triangles</h3>
            <p>
              For right triangles (C = 90&deg;), <strong>a&sup2; + b&sup2; = c&sup2;</strong>. Special right triangles include 30&deg;-60&deg;-90&deg; (sides 1 : &radic;3 : 2) and 45&deg;-45&deg;-90&deg; (sides 1 : 1 : &radic;2).
            </p>
          </div>
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Complete Trigonometric Formula Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Theorem / Concept</th>
                <th className="p-3">Formula</th>
                <th className="p-3">Usage Condition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-3 font-bold font-sans">Law of Sines</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">a / sin(A) = b / sin(B) = c / sin(C) = 2R</td>
                <td className="p-3 font-sans">AAS, ASA, or SSA ambiguous cases</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Law of Cosines</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">c&sup2; = a&sup2; + b&sup2; - 2ab cos(C)</td>
                <td className="p-3 font-sans">SAS or SSS cases</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Heron&apos;s Area Formula</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">Area = &radic;[ s(s-a)(s-b)(s-c) ]</td>
                <td className="p-3 font-sans">Three sides (a, b, c) known, s = (a+b+c)/2</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Trigonometric Area</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">Area = (1/2) &times; a &times; b &times; sin(C)</td>
                <td className="p-3 font-sans">Two sides and included angle known (SAS)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Inradius (r)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">r = Area / s</td>
                <td className="p-3 font-sans">Radius of circle tangent to all 3 sides</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Circumradius (R)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">R = (a &times; b &times; c) / (4 &times; Area)</td>
                <td className="p-3 font-sans">Radius of circle passing through all 3 vertices</td>
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
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 1: Input Case Classification</h3>
            <p>Determine the input combination: SSS (3 sides), SAS (2 sides, included angle), ASA/AAS (angles &amp; side), or SSA (ambiguous case).</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 2: Trigonometric Solution Execution</h3>
            <p>Apply Law of Cosines (for SSS/SAS) or Law of Sines (for ASA/AAS). For SSA ambiguous cases, compute height h = b sin(A) to check for 0, 1, or 2 valid triangles.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 3: Secondary Metrics Computation</h3>
            <p>Evaluate semi-perimeter s, Area K via Heron&apos;s formula, altitudes h = 2K/side, medians m, inradius r = K/s, and circumradius R = abc/4K.</p>
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
              Example 1: SSS Case (3-4-5 Right Triangle)
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> Solve the triangle with sides a = 3, b = 4, c = 5.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              Cos(C) = (3&sup2; + 4&sup2; - 5&sup2;) / (2 &times; 3 &times; 4) = 0 / 24 = 0 &rarr; C = 90&deg;.<br />
              Cos(A) = (4&sup2; + 5&sup2; - 3&sup2;) / (2 &times; 4 &times; 5) = 32 / 40 = 0.8 &rarr; A = 36.87&deg;.<br />
              B = 180&deg; - 90&deg; - 36.87&deg; = 53.13&deg;.<br />
              Semi-perimeter s = (3+4+5)/2 = 6 &rarr; Area = &radic;[6 &times; 3 &times; 2 &times; 1] = 6.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 2: Law of Sines (Given b = 2, B = 90&deg;, C = 45&deg;)
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> Find side c given b = 2, B = 90&deg;, C = 45&deg;.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              c / sin(45&deg;) = 2 / sin(90&deg;) &rarr; c = 2 &times; sin(45&deg;) = 2 &times; (&radic;2 / 2) = &radic;2 &approx; 1.4142.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. The Ambiguous Case (SSA) &amp; Circles Overview
        </h2>
        <p className="text-xs">
          When given two sides and a non-included angle (SSA), there may be 0, 1, or 2 valid triangle solutions depending on the relationship between opposite side a and height h = b sin(A):
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
          <div>&bull; <strong>If a &lt; h:</strong> No triangle can be formed (opposite side is too short).</div>
          <div>&bull; <strong>If a = h:</strong> Exactly 1 right triangle is formed.</div>
          <div>&bull; <strong>If h &lt; a &lt; b:</strong> Exactly 2 distinct valid triangles exist (the ambiguous case).</div>
          <div>&bull; <strong>If a &ge; b:</strong> Exactly 1 triangle exists.</div>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Common Pitfalls &amp; Frequent User Errors
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li>
            <strong>Violating Triangle Inequality:</strong> Entering side lengths like 2, 3, 6 where 2 + 3 &le; 6 prevents a closed polygon.
          </li>
          <li>
            <strong>Confusing Angle Units:</strong> Computing sine/cosine with radian values when calculator mode is set to degrees.
          </li>
          <li>
            <strong>Overlooking the Second SSA Solution:</strong> Failing to check if a second valid triangle exists when h &lt; opp &lt; adj in the SSA configuration.
          </li>
        </ul>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          8. Practical &amp; Professional Applications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Land Surveying &amp; Architecture</h3>
            <p>Determining inaccessible boundary distances using the Law of Sines and triangulation.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">GPS &amp; Navigation</h3>
            <p>Calculating position fixes from satellite distance signals via spherical and planar trigonometry.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">3D Computer Graphics</h3>
            <p>Mesh triangulation, normal vector calculation, and barycentric coordinate interpolation.</p>
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
            Right Triangle Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Area Calculator
          </span>
        </div>
      </section>

      {/* 10. SUMMARY */}
      <section className="p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h2 className="text-base font-bold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          Triangle geometry provides the foundation for trigonometry. By providing any 3 parameters (including at least one side), the Law of Sines and Law of Cosines enable exact calculation of all missing sides, angles, area, altitudes, medians, inradius, and circumradius.
        </p>
      </section>
    </article>
  );
}

export default TriangleContent;
