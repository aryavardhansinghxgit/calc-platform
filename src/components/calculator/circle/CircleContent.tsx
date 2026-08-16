"use client";

import React from "react";

export function CircleContent() {
  return (
    <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          1. Introduction to Circular Geometry
        </h2>
        <p>
          A <strong>circle</strong> is a two-dimensional closed geometric shape defined as the locus of all points in a plane that are at a constant fixed distance (the <strong>radius $r$</strong>) from a central point $O$.
        </p>
        <p>
          Circular geometry forms the backbone of civil engineering, mechanical drive systems, optics, telematics, and celestial orbits.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. Anatomical Elements &amp; Parts of a Circle
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Center &amp; Radius</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Center $O$ is the fixed point. Radius $r$ is the straight distance from $O$ to any point on the boundary.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Diameter &amp; Circumference</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Diameter $d = 2r$ passes through center $O$. Circumference $C = 2\pi r = \pi d$ is the perimeter length.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Arc, Chord &amp; Sagitta</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Chord $c$ connects any 2 boundary points. Sagitta $h$ is the height from chord midpoint to arc apex.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Complete Circle Formulas Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Circle Property</th>
                <th className="p-3">Mathematical Formula</th>
                <th className="p-3">Exact Symbolic Form ($\pi$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-3 font-bold font-sans">Diameter ($d$)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">d = 2r = C / &pi;</td>
                <td className="p-3 font-sans">2r</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Circumference ($C$)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">C = 2&pi;r = &pi;d = 2&radic;(&pi;A)</td>
                <td className="p-3 font-sans">2r &pi;</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Circle Area ($A$)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = &pi;r&sup2; = &frac14;&pi;d&sup2; = C&sup2; / (4&pi;)</td>
                <td className="p-3 font-sans">r&sup2; &pi;</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Sector Arc Length ($L$)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">L = (&theta;&deg; / 360&deg;) &times; 2&pi;r</td>
                <td className="p-3 font-sans font-mono">r &theta;<sub>rad</sub></td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Annulus Ring Area</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = &pi;(R&sup2; - r&sup2;)</td>
                <td className="p-3 font-sans">(R&sup2; - r&sup2;) &pi;</td>
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
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 1: Extract Radius $r$</h3>
            <p>From Area A: r = &radic;(A / &pi;). From Circumference C: r = C / (2&pi;). From Diameter d: r = d / 2.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 2: Solve Primary Boundary Metrics</h3>
            <p>Compute Circumference $C = 2\pi r$ and Area $A = \pi r^2$.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 3: Sector &amp; Chord Integration</h3>
            <p>For sector angle $\theta$, multiply full circle metrics by the fraction $(\theta / 360^\circ)$.</p>
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
              Example 1: Solving Circle from Area A = 78.54 cm²
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> Given Area A = 78.54 cm², find r, d, C.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              1. r = &radic;(78.54 / &pi;) = &radic;(25) = 5 cm.<br />
              2. d = 2 &times; 5 = 10 cm.<br />
              3. C = 2&pi;(5) = 10&pi; &approx; 31.42 cm.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 2: 12-Inch Pizza Slice (Sector Arc &amp; Area)
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> 12-inch diameter pizza cut into 8 equal slices ($\theta = 45^\circ$). Find slice area and crust arc length.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              1. r = 12 / 2 = 6 in.<br />
              2. Crust Arc L = (45/360) &times; 2&pi;(6) = 1.5&pi; &approx; 4.71 inches.<br />
              3. Slice Area = (45/360) &times; &pi;(6&sup2;) = 4.5&pi; &approx; 14.14 sq in.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Visual Understanding &amp; Parts of a Circle
        </h2>
        <p className="text-xs">
          The table below describes all anatomical elements depicted in circular diagrams:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Circle Element</th>
                <th className="p-3">Geometric Definition</th>
                <th className="p-3">Key Property</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900">
              <tr>
                <td className="p-2.5 font-bold">Chord</td>
                <td className="p-2.5">Straight line joining any two points on boundary</td>
                <td className="p-2.5 font-mono">c = 2r sin(&theta;/2)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Sagitta (Height)</td>
                <td className="p-2.5">Perpendicular distance from chord midpoint to arc apex</td>
                <td className="p-2.5 font-mono">h = r - &radic;(r&sup2; - (c/2)&sup2;)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Annulus</td>
                <td className="p-2.5">Ring-shaped region between concentric circles</td>
                <td className="p-2.5 font-mono">A = &pi;(R&sup2; - r&sup2;)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Common Pitfalls &amp; Frequent User Errors
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li>
            <strong>Confusing Radius and Diameter:</strong> Forgetting to divide diameter by 2 before applying $A = \pi r^2$.
          </li>
          <li>
            <strong>Mixing Degrees and Radians:</strong> Using degree values directly in L = r &times; &theta; instead of converting to radians (&theta;<sub>rad</sub> = &theta;&deg; &times; &pi; / 180).
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
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Mechanical Engineering</h3>
            <p>Sizing circular gears, pulleys, and engine piston cross-sections.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Civil Infrastructure</h3>
            <p>Designing circular roundabouts, water storage tanks, and pipe flow areas.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Optics &amp; Photography</h3>
            <p>Calculating camera lens aperture areas ($f$-stop ratios) and telescope light capture.</p>
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
            Area Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Volume Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Triangle Calculator
          </span>
        </div>
      </section>

      {/* 10. SUMMARY */}
      <section className="p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h2 className="text-base font-bold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          Circles represent symmetrical planar geometry governed by the constant $\pi$. Given any single dimension ($r, d, C, A$), all other properties can be solved through algebraic inversion.
        </p>
      </section>
    </article>
  );
}

export default CircleContent;
