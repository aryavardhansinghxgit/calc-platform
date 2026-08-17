"use client";

import React from "react";

export function AreaContent() {
  return (
    <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          1. Introduction to 2D Area &amp; Planar Space Quantification
        </h2>
        <p>
          <strong>Area</strong> is the metric quantifying the two-dimensional spatial extent enclosed within a closed planar boundary. In the International System of Units (SI), area is expressed in <strong>square meters (m&sup2;)</strong>, where 1 m&sup2; represents the area of a square with side lengths of exactly 1 meter.
        </p>
        <p>
          Calculating 2D area is vital across civil engineering, architecture, land surveying, real estate valuation, interior design, and agriculture to estimate plot boundaries, flooring materials, paint coverage, sod requirements, and crop yields.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. Core 2D Geometry Principles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Quadrilaterals &amp; Polygons</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Bounded straight-edged shapes computed via product of orthogonal dimensions: <strong>A = Base &times; Height</strong>.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Triangles &amp; Irregular Polygons</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Triangular areas evaluated as half-parallelograms (<strong>A = &frac12;bh</strong>) or via <strong>Gauss&apos;s Shoelace Algorithm</strong> for Cartesian vertices.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Curved &amp; Conic Sections</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Smooth revolution surfaces governed by radial squared powers: <strong>A = &pi;r&sup2;</strong> for circles and <strong>A = &pi;ab</strong> for ellipses.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Complete 2D Shape Area Formula Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">2D Geometric Shape</th>
                <th className="p-3">Primary Area Formula</th>
                <th className="p-3">Perimeter / Boundary Formula</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-3 font-bold font-sans">Rectangle</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = l &times; w</td>
                <td className="p-3 font-sans">P = 2(l + w)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Triangle (Base &amp; Height)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = &frac12; &times; b &times; h</td>
                <td className="p-3 font-sans">P = a + b + c</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Triangle (Heron&apos;s 3 Sides)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = &radic;[s(s-a)(s-b)(s-c)]</td>
                <td className="p-3 font-sans">s = (a + b + c) / 2</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Circle</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = &pi; &times; r&sup2;</td>
                <td className="p-3 font-sans">C = 2 &times; &pi; &times; r</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Circular Sector</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = (&theta;&deg; / 360&deg;) &times; &pi;r&sup2;</td>
                <td className="p-3 font-sans">Arc Length L = (&theta;&deg;/360&deg;)2&pi;r</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Trapezoid</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = &frac12; &times; (a + b) &times; h</td>
                <td className="p-3 font-sans">P = a + b + c + d</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Ellipse</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = &pi; &times; a &times; b</td>
                <td className="p-3 font-sans">Ramanujan P &approx; &pi;[3(a+b) - &radic;((3a+b)(a+3b))]</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Regular Polygon (n-gon)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = &frac12; &times; Apothem &times; Perimeter</td>
                <td className="p-3 font-sans">P = n &times; s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          4. How Step-by-Step Area Derivation Works
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 1: Dimension Normalization</h3>
            <p>Convert all linear edge or radial inputs into a single unified length unit (e.g. meters or feet).</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 2: Geometric Integration Formula</h3>
            <p>Apply the exact 2D planar area equation for the selected shape (e.g. A = l&middot;w for rectangles, A = &pi;r&sup2; for circles).</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 3: Multi-Unit Matrix &amp; Material Cost Estimation</h3>
            <p>Multiply calculated base area by land and square unit conversion factors (Square Feet, Acres, Hectares, Sq Inches) and add optional cutting waste percentages (+10%).</p>
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
              Example 1: Football Pitch Area &amp; Acreage
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> A standard football pitch is length l = 105 m and width w = 68 m. Find its area in square meters and acres.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              A = 105 &times; 68 = 7,140 m&sup2;.<br />
              1 Acre = 4,046.856 m&sup2; &rarr; Pitch Area = 7,140 / 4,046.856 = 1.7643 Acres.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 2: Triangular Roof Gable Area (Heron&apos;s Formula)
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> A triangle has side lengths a = 7 ft, b = 8 ft, and c = 9 ft. Find its area.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              Semi-perimeter s = (7 + 8 + 9) / 2 = 12 ft.<br />
              A = &radic;[12 &times; (12 - 7) &times; (12 - 8) &times; (12 - 9)] = &radic;[12 &times; 5 &times; 4 &times; 3] = &radic;720 &approx; 26.8328 ft&sup2;.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & CONVERSION MATRIX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Common Area Unit Conversion Reference Matrix
        </h2>
        <p className="text-xs">
          The reference table below lists standard conversion factors relative to 1 Square Meter (m&sup2;):
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Unit Name</th>
                <th className="p-3">Square Meters (m&sup2;)</th>
                <th className="p-3">Square Feet (ft&sup2;)</th>
                <th className="p-3">Acres</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-2.5 font-bold font-sans">1 Square Meter (m&sup2;)</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1.0000</td>
                <td className="p-2.5 font-bold">10.7639 ft&sup2;</td>
                <td className="p-2.5">0.000247 ac</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-sans">1 Square Foot (ft&sup2;)</td>
                <td className="p-2.5">0.0929</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1.0000 ft&sup2;</td>
                <td className="p-2.5">0.000023 ac</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-sans">1 Acre (ac)</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">4,046.856 m&sup2;</td>
                <td className="p-2.5 font-bold">43,560 ft&sup2;</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1.0000 ac</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-sans">1 Hectare (ha)</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">10,000.00 m&sup2;</td>
                <td className="p-2.5">107,639 ft&sup2;</td>
                <td className="p-2.5 font-bold">2.47105 ac</td>
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
            <strong>Mixing Units Before Multiplication:</strong> Multiplying length in feet by width in inches without converting both dimensions to feet or inches first.
          </li>
          <li>
            <strong>Confusing Perimeter and Area:</strong> Adding sides (linear distance) instead of multiplying orthogonal dimensions (square spatial extent).
          </li>
          <li>
            <strong>Forgetting Waste Margins in Flooring Orders:</strong> Ordering exact net square footage without adding 5%–10% extra material for corner cuts and waste.
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
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Real Estate &amp; Land Surveying</h3>
            <p>Valuing property plots, computing acreage, and verifying usable room square footage.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Flooring, Tile &amp; Paint Estimation</h3>
            <p>Calculating hardwood rolls, ceramic tiles, and gallon paint coverage (1 gallon &approx; 350 sq ft).</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Agriculture &amp; Turf Management</h3>
            <p>Determining crop yield requirements, grass sod rolls, and fertilizer dispersion rates per acre.</p>
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
            Surface Area Calculator
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
          2D Area quantifies planar spatial extent across quadrilaterals, triangles, circles, polygons, and irregular plots. Through formula integration and linear unit normalization, areas can be solved and converted into Square Feet, Acres, Hectares, and Square Meters.
        </p>
      </section>
    </article>
  );
}

export default AreaContent;
