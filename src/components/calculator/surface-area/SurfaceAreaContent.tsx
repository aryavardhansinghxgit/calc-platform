"use client";

import React from "react";

export function SurfaceAreaContent() {
  return (
    <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          1. Introduction to 3D Surface Area
        </h2>
        <p>
          <strong>Surface Area</strong> is the total two-dimensional area bounding the exterior of a three-dimensional solid object. Measured in square units such as <strong>square meters (m&sup2;)</strong> or <strong>square feet (ft&sup2;)</strong>, surface area calculations are essential across manufacturing, industrial painting, chemical reaction kinetics, thermal radiation, and structural architecture.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. Total Surface Area (TSA) vs. Lateral Surface Area (LSA)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Total Surface Area (TSA)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The total area of all surfaces surrounding a 3D solid, including top and bottom bases plus lateral side walls.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Lateral / Curved Surface Area (LSA)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The surface area of the vertical side walls or curved boundaries, excluding top and bottom flat circular/polygonal bases.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Complete 3D Surface Area Formulas Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">3D Solid Shape</th>
                <th className="p-3">Total Surface Area (TSA) Formula</th>
                <th className="p-3">Lateral / Base Breakdown</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-3 font-bold font-sans">Sphere</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = 4&pi;r&sup2; = &pi;d&sup2;</td>
                <td className="p-3 font-sans">Curved area = 4&pi;r&sup2;</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Solid Cylinder</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = 2&pi;r(r + h)</td>
                <td className="p-3 font-sans">Bases: 2&pi;r&sup2; | Lateral: 2&pi;rh</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Right Cone</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = &pi;r(r + s)</td>
                <td className="p-3 font-sans">Base: &pi;r&sup2; | Lateral: &pi;rs (s = &radic;(r&sup2;+h&sup2;))</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Rectangular Prism</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = 2(lw + lh + wh)</td>
                <td className="p-3 font-sans">Open-Top: lw + 2(lh + wh)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Square Pyramid</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = a&sup2; + 2as</td>
                <td className="p-3 font-sans">Base: a&sup2; | Lateral: 2as</td>
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
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 1: Compute Slant Height / Intermediate Distances</h3>
            <p>For cones and pyramids, solve the slant height s = &radic;(r&sup2; + h&sup2;) using the Pythagorean theorem.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 2: Calculate Individual Face Areas</h3>
            <p>Compute flat polygonal/circular base areas and curved lateral wall areas separately.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 3: Sum Components &amp; Convert Units</h3>
            <p>Sum base and lateral face areas to get Total Surface Area (TSA) and output converted values across units.</p>
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
              Example 1: Cylindrical Water Tank (Radius 3.5 ft, Height 5.5 ft)
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> Find the total surface area of a closed cylindrical tank with r = 3.5 ft and h = 5.5 ft.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              1. Two Circular Bases Area = 2 &times; &pi; &times; 3.5&sup2; = 76.97 sq ft.<br />
              2. Curved Side Walls Area = 2 &times; &pi; &times; 3.5 &times; 5.5 = 120.95 sq ft.<br />
              3. Total Surface Area A = 76.97 + 120.95 = 197.92 sq ft.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Visualizing 3D Solids via 2D Nets
        </h2>
        <p className="text-xs">
          A <strong>2D Net</strong> is a two-dimensional pattern that folds up to form a three-dimensional solid. Unfolding a 3D solid into its net components demonstrates that surface area is simply the sum of all flat 2D shapes making up the solid.
        </p>
      </section>

      {/* 7. MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Common Pitfalls &amp; Frequent User Errors
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li>
            <strong>Confusing Height (h) with Slant Height (s):</strong> Using perpendicular height h instead of slant height s = &radic;(r&sup2; + h&sup2;) when calculating lateral cone area.
          </li>
          <li>
            <strong>Forgetting Open-Top Adjustments:</strong> Including 2 bases when calculating paint required for an open-top rectangular tank.
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
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Painting &amp; Coating</h3>
            <p>Estimating gallons of paint or waterproofing sealant needed for building walls and storage tanks.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Cardboard Packaging</h3>
            <p>Sizing sheet cardboard requirements to fold product shipping boxes with minimum material waste.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Thermal Radiation</h3>
            <p>Designing heat sinks and cooling fins based on effective heat-dissipating surface area.</p>
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
            Volume Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Area Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Circle Calculator
          </span>
        </div>
      </section>

      {/* 10. SUMMARY */}
      <section className="p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h2 className="text-base font-bold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          Surface Area measures the total 2D boundary bounding a 3D solid object. Calculating lateral and base area breakdowns allows precise material estimation across industrial engineering and construction.
        </p>
      </section>
    </article>
  );
}

export default SurfaceAreaContent;
