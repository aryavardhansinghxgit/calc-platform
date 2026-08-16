"use client";

import React from "react";

export function SlopeContent() {
  return (
    <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          1. Introduction to Slope &amp; Line Steepness
        </h2>
        <p>
          In coordinate geometry, the <strong>slope</strong> (often denoted by the variable <em>m</em>) measures the steepness, incline, or rate of change of a straight line relative to the horizontal axis. It is defined as the ratio of vertical change (the <strong>rise</strong>, &Delta;y) to horizontal change (the <strong>run</strong>, &Delta;x) between any two distinct points on the line.
        </p>
        <p>
          Slope is foundational across mathematics, physics, civil engineering, topography, and economics for calculating road grades, roof pitches, velocity vectors, structural loads, and marginal costs.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. Core Coordinate Geometry Principles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">Positive Slope (m &gt; 0)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The line moves upwards from left to right as x increases (&theta; between 0&deg; and 90&deg;).
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-red-600 dark:text-red-400 mb-1">Negative Slope (m &lt; 0)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              The line moves downwards from left to right as x increases (&theta; between 90&deg; and 180&deg;).
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-1">Zero Slope (m = 0)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              A perfectly horizontal line where y is constant (&Delta;y = 0, &theta; = 0&deg;).
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-purple-600 dark:text-purple-400 mb-1">Undefined Slope</h3>
            <p className="text-slate-600 dark:text-slate-400">
              A perfectly vertical line where x is constant (&Delta;x = 0, division by zero, &theta; = 90&deg;).
            </p>
          </div>
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Complete Line &amp; Slope Formulas Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Concept / Form</th>
                <th className="p-3">Primary Formula</th>
                <th className="p-3">Variable Definitions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-3 font-bold font-sans">Two-Point Slope</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">m = (y₂ - y₁) / (x₂ - x₁) = &Delta;y / &Delta;x</td>
                <td className="p-3 font-sans">Rise (&Delta;y), Run (&Delta;x), Coordinates (x₁, y₁) and (x₂, y₂)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Angle of Incline</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">m = tan(&theta;) &rArr; &theta; = arctan(m)</td>
                <td className="p-3 font-sans">&theta; = Incline angle with positive X-axis</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Euclidean Distance</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">d = &radic;[(x₂ - x₁)&sup2; + (y₂ - y₁)&sup2;]</td>
                <td className="p-3 font-sans">Hypotenuse distance between endpoints</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Slope-Intercept Form</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">y = mx + b</td>
                <td className="p-3 font-sans">m = slope, b = Y-intercept (0, b)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Point-Slope Form</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">(y - y₁) = m(x - x₁)</td>
                <td className="p-3 font-sans">m = slope, known point (x₁, y₁)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Perpendicular Slope</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">m&perp; = -1 / m</td>
                <td className="p-3 font-sans">Negative reciprocal slope of orthogonal lines</td>
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
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 1: Calculate Delta Values</h3>
            <p>Subtract coordinates to find horizontal run &Delta;x = x₂ - x₁ and vertical rise &Delta;y = y₂ - y₁.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 2: Evaluate Slope Ratio</h3>
            <p>Divide rise by run (m = &Delta;y / &Delta;x). Check if &Delta;x = 0 (vertical line with undefined slope).</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 3: Determine Line Equations &amp; Incline Angle</h3>
            <p>Compute Y-intercept b = y₁ - m&middot;x₁, formulate y = mx + b, and calculate &theta; = arctan(m).</p>
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
              Example 1: Slope Between (1, 1) and (4, 7)
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> Find the slope, incline angle, distance, and equation for the line passing through (1, 1) and (4, 7).
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              1. &Delta;x = 4 - 1 = 3, &Delta;y = 7 - 1 = 6.<br />
              2. Slope m = 6 / 3 = 2.<br />
              3. Distance d = &radic;[3&sup2; + 6&sup2;] = &radic;[9 + 36] = &radic;45 &approx; 6.7082.<br />
              4. Incline Angle &theta; = arctan(2) &approx; 63.4349&deg;.<br />
              5. Y-intercept b = 1 - 2(1) = -1 &rArr; Line Equation: y = 2x - 1.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 2: Perpendicular Line Through Target Point
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> Given line slope m = 2, find the equation of a perpendicular line through (3, 4).
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              1. Perpendicular slope m&perp; = -1 / 2 = -0.5.<br />
              2. Y-intercept b = 4 - (-0.5)(3) = 4 + 1.5 = 5.5.<br />
              3. Perpendicular Line Equation: y = -0.5x + 5.5.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Visual Understanding: The Slope Right-Triangle
        </h2>
        <p className="text-xs">
          The geometric relationship between two points on a line forms a right-angled triangle where:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li>The horizontal side is the <strong>Run (&Delta;x)</strong> along the X-axis.</li>
          <li>The vertical side is the <strong>Rise (&Delta;y)</strong> along the Y-axis.</li>
          <li>The hypotenuse is the <strong>Distance (d)</strong> between endpoints.</li>
          <li>The tangent of the incline angle equals the slope: <strong>tan(&theta;) = Rise / Run</strong>.</li>
        </ul>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Common Pitfalls &amp; Frequent User Errors
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li>
            <strong>Reversing Coordinates (Run/Rise error):</strong> Calculating &Delta;x / &Delta;y instead of &Delta;y / &Delta;x (inverting the slope).
          </li>
          <li>
            <strong>Mixing Point Order:</strong> Subtracting (y₂ - y₁) in the numerator but (x₁ - x₂) in the denominator, resulting in an incorrect sign flip.
          </li>
          <li>
            <strong>Dividing by Zero on Vertical Lines:</strong> Treating vertical lines (x₁ = x₂) as having slope 0 instead of being undefined.
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
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Civil &amp; Road Engineering</h3>
            <p>Designing highway incline grades, wheelchair ramps (ADA compliance 1:12 slope), and railway tracks.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Architecture &amp; Roof Construction</h3>
            <p>Calculating roof pitch ratios (rise per 12 inches of run) for drainage and snow load distribution.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Economics &amp; Data Science</h3>
            <p>Determining marginal revenue, cost gradients, and linear regression trendlines in scatter plots.</p>
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
            Distance Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Triangle Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Pythagorean Theorem Calculator
          </span>
        </div>
      </section>

      {/* 10. SUMMARY */}
      <section className="p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h2 className="text-base font-bold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          Slope measures the steepness of a line as the ratio of vertical change (rise) to horizontal change (run), m = &Delta;y / &Delta;x. Slope determines line equations in slope-intercept form (y = mx + b), incline angles (&theta; = arctan(m)), Euclidean distance between points, and orthogonal relationships (m&perp; = -1/m).
        </p>
      </section>
    </article>
  );
}

export default SlopeContent;
