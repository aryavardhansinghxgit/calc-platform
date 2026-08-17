import React from "react";

export function RoofingContent() {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Introduction to Roofing Geometry &amp; Measurement Units
        </h2>
        <p className="text-sm leading-relaxed">
          Roofing calculation is an essential engineering process in residential and commercial construction. Estimating roofing materials requires converting two-dimensional horizontal house footprints (plan views) into three-dimensional sloped surface areas. Because roofs are inclined to shed water and snow, a roof&apos;s true surface area is always substantially larger than the flat ground footprint beneath it.
        </p>
        <p className="text-sm leading-relaxed">
          In the United States and North American construction trades, roofing surface area is measured in <strong>Roofing Squares</strong>:
        </p>
        <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800 text-center font-mono font-bold text-sm text-blue-900 dark:text-blue-200">
          1 Roofing Square = 100 Square Feet (9.29 m²)
        </div>
      </section>

      {/* 2. Pitch & Slope Mathematics */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. Mathematical Derivation of the Pitch Multiplier
        </h2>
        <p className="text-sm leading-relaxed">
          Roof pitch is expressed as a ratio of vertical rise over a constant horizontal run of 12 inches (e.g., 6/12 indicates 6 inches of vertical rise for every 12 inches of horizontal run). By applying the Pythagorean theorem, the hypotenuse (rafter length) relative to the unit horizontal run yields the <strong>Slope Correction Factor (Multiplier)</strong>:
        </p>

        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-2 text-xs font-mono">
          <p className="font-bold text-blue-800 dark:text-blue-300">
            Multiplier (M) = √[1 + (Rise / 12)²] = 1 / cos(θ)
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Where θ is the pitch angle in degrees: θ = arctan(Rise / 12) × (180 / π).
          </p>
          <p className="text-zinc-800 dark:text-zinc-200 font-semibold pt-1">
            True Roof Area = (Ground Footprint Area + Eave/Gable Overhangs) × Multiplier
          </p>
        </div>
      </section>

      {/* 3. Pitch Conversion Reference Table */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. Standard Pitch, Angle &amp; Slope Correction Factors Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Pitch (Rise/12)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Angle (°)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Multiplier</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Pitch (Rise/12)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Angle (°)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Multiplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-1.5 font-semibold">1/12 (Low slope)</td><td>4.8°</td><td>1.003</td>
                <td className="p-1.5 font-semibold">7/12 (Standard)</td><td>30.3°</td><td>1.158</td>
              </tr>
              <tr>
                <td className="p-1.5 font-semibold">2/12</td><td>9.5°</td><td>1.014</td>
                <td className="p-1.5 font-semibold">8/12 (Steep)</td><td>33.7°</td><td>1.202</td>
              </tr>
              <tr>
                <td className="p-1.5 font-semibold">3/12</td><td>14.0°</td><td>1.031</td>
                <td className="p-1.5 font-semibold">9/12</td><td>36.9°</td><td>1.250</td>
              </tr>
              <tr>
                <td className="p-1.5 font-semibold">4/12 (Conventional)</td><td>18.4°</td><td>1.054</td>
                <td className="p-1.5 font-semibold">10/12</td><td>39.8°</td><td>1.302</td>
              </tr>
              <tr>
                <td className="p-1.5 font-semibold">5/12</td><td>22.6°</td><td>1.083</td>
                <td className="p-1.5 font-semibold">11/12</td><td>42.5°</td><td>1.357</td>
              </tr>
              <tr>
                <td className="p-1.5 font-semibold">6/12</td><td>26.6°</td><td>1.118</td>
                <td className="p-1.5 font-semibold">12/12 (45° Diagonal)</td><td>45.0°</td><td>1.414</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Waste Allowance Matrix */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. Recommended Waste Factor Allowances
        </h2>
        <p className="text-sm leading-relaxed">
          Cutting shingles around valleys, hips, gables, dormers, and starter courses generates scrap material that cannot be reused. Ordering exact net square footage inevitably leads to shortages.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-emerald-700 dark:text-emerald-300 block">Simple Gable (5% – 10% Waste)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              Two rectangular planes with minimal cuts. Straight rakes and clean ridge.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">Hip Roof (10% – 15% Waste)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              Four triangular/trapezoidal slopes. Frequent diagonal cuts along hip ridges.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-300 block">Complex / Cut-Up (15% – 20% Waste)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              Multiple intersecting valleys, dormers, skylights, chimneys, and multi-pitch changes.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Material Packaging & Standards */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Material Specifications &amp; Packaging Rules
        </h2>
        <div className="space-y-2 text-xs">
          <p className="leading-relaxed">
            • <strong>Asphalt Shingle Bundles</strong>: Standard 3-Tab and Architectural (dimensional) shingles are packaged with <strong>3 bundles per roofing square</strong> (33.3 sq ft per bundle). Heavyweight designer shingles require 4 to 5 bundles per square.
          </p>
          <p className="leading-relaxed">
            • <strong>Synthetic Underlayment</strong>: 1 roll typically covers 10 squares (1,000 sq ft). After accounting for 4-inch horizontal overlaps and 6-inch end laps, effective coverage is ~9.3 squares.
          </p>
          <p className="leading-relaxed">
            • <strong>Ice &amp; Water Shield (IRC R905.1.2)</strong>: In regions with history of ice damming (average daily temp &le; 25°F in January), self-adhering polymer-modified bitumen membrane must extend from the eave edge to a point at least 24 inches inside the interior warm wall line (typically 2 courses / 6 ft wide).
          </p>
          <p className="leading-relaxed">
            • <strong>Roofing Nails</strong>: Standard installation requires 4 galvanized nails per shingle (~320 nails per square). High-wind or steep-slope applications require 6 nails per shingle (~480 nails per square).
          </p>
        </div>
      </section>

      {/* 6. Step-by-Step Worked Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          6. Step-by-Step Worked Calculation Example
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-3 text-xs">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            <strong>Problem:</strong> Calculate the roofing squares, shingle bundles, and underlayment for a home with a 50 ft × 40 ft ground footprint, 6/12 pitch gable roof, 1-foot eave overhangs, and 1-foot gable overhangs with a 10% waste factor.
          </p>

          <div className="space-y-1.5 font-mono">
            <p><strong>Step 1: Calculate Total Horizontal Footprint with Overhangs</strong><br />
            {"Length with Overhangs = 50 + 2(1) = 52 ft"}<br />
            {"Width with Overhangs = 40 + 2(1) = 42 ft"}<br />
            {"Flat Plan Area = 52 × 42 = 2,184 sq ft"}</p>

            <p><strong>Step 2: Determine 6/12 Pitch Multiplier</strong><br />
            {"M = √[1 + (6/12)²] = √[1 + 0.25] = √1.25 = 1.1180"}</p>

            <p><strong>Step 3: Calculate True Roof Surface Area</strong><br />
            {"True Surface Area = 2,184 × 1.1180 = 2,441.7 sq ft"}</p>

            <p><strong>Step 4: Apply 10% Waste Factor</strong><br />
            {"Total Area with Waste = 2,441.7 × 1.10 = 2,685.9 sq ft"}<br />
            {"Roofing Squares = 2,685.9 / 100 = 26.9 Squares ≈ 27 Squares"}</p>

            <p><strong>Step 5: Calculate Material Bundles &amp; Rolls</strong><br />
            {"Shingle Bundles = 27 Squares × 3 bundles/sq = 81 Bundles"}<br />
            {"Synthetic Underlayment = ceil(2,685.9 / 930) = 3 Rolls"}<br />
            {"Roofing Nails = 27 Squares × 320 = 8,640 nails (~35 lbs of 1-1/4\" coil nails)"}</p>
          </div>
        </div>
      </section>

      {/* 7. Summary */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          7. Professional Roofing Takeoff Checklist
        </h2>
        <ul className="list-disc list-inside text-xs space-y-1 text-zinc-700 dark:text-zinc-300">
          <li>Measure rakes and eaves accurately, ensuring overhang depths match actual construction.</li>
          <li>Never install standard shingles on slopes less than 2/12 (use low-slope membrane or standing seam metal).</li>
          <li>Install ice and water shield in all valleys and along all eaves prior to felt/synthetic underlayment.</li>
          <li>Order starter strip shingles for eave and rake edges to provide wind-seal protection against uplift.</li>
        </ul>
      </section>
    </div>
  );
}
