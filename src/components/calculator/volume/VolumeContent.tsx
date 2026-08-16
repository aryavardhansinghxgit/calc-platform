"use client";

import React from "react";

export function VolumeContent() {
  return (
    <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          1. Introduction to 3D Volume &amp; Capacity Measurement
        </h2>
        <p>
          <strong>Volume</strong> is the quantification of three-dimensional space enclosed by a closed surface or occupied by a solid body, liquid, or gas. In the International System of Units (SI), volume is expressed in <strong>cubic meters (m&sup3;)</strong> or <strong>liters (L)</strong>, where 1 m&sup3; equals exactly 1,000 liters.
        </p>
        <p>
          Calculating 3D volume is critical across manufacturing, civil engineering, logistics, fluid dynamics, and packaging design to determine liquid storage capacities, shipping container requirements, and material mass density.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. Core 3D Geometry Principles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Prisms &amp; Cylinders</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Cross-sectional area multiplied by height: <strong>V = Base Area &times; Height</strong>.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Cones &amp; Pyramids</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Tapering 3D solids occupy exactly one-third of their enclosing cylinder/prism: <strong>V = (1/3) &times; Base Area &times; Height</strong>.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Spheres &amp; Ellipsoids</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Symmetrical revolution solids governed by radial powers: <strong>V = (4/3) &times; &pi; &times; r&sup3;</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Complete 3D Shape Volume Formula Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">3D Geometric Shape</th>
                <th className="p-3">Primary Volume Formula</th>
                <th className="p-3">Surface Area Formula</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-3 font-bold font-sans">Sphere</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">V = (4/3) &times; &pi; &times; r&sup3;</td>
                <td className="p-3 font-sans">A = 4 &times; &pi; &times; r&sup2;</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Cylinder</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">V = &pi; &times; r&sup2; &times; h</td>
                <td className="p-3 font-sans">A = 2&pi;r(r + h)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Cone</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">V = (1/3) &times; &pi; &times; r&sup2; &times; h</td>
                <td className="p-3 font-sans">A = &pi;r(r + &radic;[r&sup2;+h&sup2;])</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Cube</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">V = a&sup3;</td>
                <td className="p-3 font-sans">A = 6 &times; a&sup2;</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Rectangular Prism</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">V = l &times; w &times; h</td>
                <td className="p-3 font-sans">A = 2(lw + lh + wh)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Capsule</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">V = &pi;r&sup2;h + (4/3)&pi;r&sup3;</td>
                <td className="p-3 font-sans">A = 2&pi;rh + 4&pi;r&sup2;</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Conical Frustum</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">V = (1/3)&pi;h(r&sup2; + rR + R&sup2;)</td>
                <td className="p-3 font-sans">Lateral A = &pi;(r+R)s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          4. How Step-by-Step Volume Derivation Works
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 1: Dimension Normalization</h3>
            <p>Convert all linear dimension inputs (length, width, radius, height) into a unified base length unit (e.g. meters or feet).</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 2: Geometric Integration Formula</h3>
            <p>Apply the exact 3D volume formula for the target shape (e.g., V = &pi;r&sup2;h for cylinders or V = l&middot;w&middot;h for rectangular tanks).</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 3: Multi-Unit Unit Conversion</h3>
            <p>Multiply base volume by unit conversion factors to compute equivalent capacities in Liters, US Gallons, Imperial Gallons, and Cubic Feet.</p>
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
              Example 1: Cylindrical Water Tank Capacity
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> A cylindrical tank has base radius r = 3 ft and height h = 4 ft. Find its volume and liquid capacity.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              V = &pi; &times; (3)&sup2; &times; 4 = &pi; &times; 9 &times; 4 = 36&pi; &approx; 113.0973 ft&sup3;.<br />
              1 ft&sup3; = 7.48052 US Gallons &rarr; Capacity = 113.0973 &times; 7.48052 = 846.03 US Gallons.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 2: Conical Waffle Cone Volume
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> An ice cream cone has radius r = 1.5 in and height h = 5 in. Find its volume.
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              V = (1/3) &times; &pi; &times; (1.5)&sup2; &times; 5 = (1/3) &times; &pi; &times; 2.25 &times; 5 = 3.75&pi; &approx; 11.781 in&sup3;.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & UNIT CONVERSION MATRIX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Common Volume Unit Conversion Reference Matrix
        </h2>
        <p className="text-xs">
          The reference table below lists standard conversion factors for 1 unit of cubic volume:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Unit Name</th>
                <th className="p-3">Cubic Meters (m&sup3;)</th>
                <th className="p-3">Liters (L)</th>
                <th className="p-3">US Gallons (gal)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-2.5 font-bold font-sans">1 Cubic Meter (m&sup3;)</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1.0000</td>
                <td className="p-2.5">1,000 L</td>
                <td className="p-2.5 font-bold">264.172 gal</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-sans">1 Liter (L)</td>
                <td className="p-2.5">0.0010</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1.000 L</td>
                <td className="p-2.5">0.2642 gal</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-sans">1 Cubic Foot (ft&sup3;)</td>
                <td className="p-2.5">0.0283</td>
                <td className="p-2.5">28.317 L</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">7.4805 gal</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-sans">1 US Gallon (gal)</td>
                <td className="p-2.5">0.003785</td>
                <td className="p-2.5">3.7854 L</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">1.0000 gal</td>
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
            <strong>Mixing Linear Units:</strong> Multiplying radius in inches by height in feet without converting to a common unit first.
          </li>
          <li>
            <strong>Confusing US vs Imperial Gallons:</strong> 1 US Gallon = 3.785 L, whereas 1 UK Imperial Gallon = 4.546 L (a 20% difference).
          </li>
          <li>
            <strong>Confusing Radius and Diameter:</strong> Entering a pipe&apos;s diameter in place of radius doubles the calculated radius and quadruples the calculated volume.
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
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Freight Logistics &amp; Shipping</h3>
            <p>Determining cargo container volumetric weight limits (CBM).</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Chemical &amp; Petroleum Storage</h3>
            <p>Sizing spherical and cylindrical pressure vessels and storage tanks.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Civil &amp; Hydraulic Engineering</h3>
            <p>Calculating reservoir water holdback and concrete pour volume requirements.</p>
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
            Surface Area Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Area Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Density Calculator
          </span>
        </div>
      </section>

      {/* 10. SUMMARY */}
      <section className="p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h2 className="text-base font-bold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          3D Volume measures three-dimensional space occupancy across geometrical solids. Through formula integration and linear unit normalization, shapes such as spheres, cylinders, cones, prisms, and capsules can be calculated and converted into Liters, Gallons, and Cubic Feet.
        </p>
      </section>
    </article>
  );
}

export default VolumeContent;
