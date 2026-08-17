import React from "react";

export function MulchContent() {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Introduction to Landscape Mulching &amp; Soil Thermodynamics
        </h2>
        <p className="text-sm leading-relaxed">
          Mulch serves as a protective organic or inorganic layer applied to topsoil to suppress weed germination, regulate root-zone soil temperatures, reduce moisture evaporation, and prevent erosion. Estimating mulch requirements precisely prevents under-mulching (which allows weed penetration) and over-mulching (which suffocates plant root systems).
        </p>
      </section>

      {/* 2. Mathematical Concept */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. Mathematical Formulas for Landscape Volume &amp; Packaging
        </h2>
        
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-3 text-xs font-mono">
          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              A. Cubic Yards &amp; Cubic Feet Volume Derivation
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Volume (Cubic Feet) = Surface Area (sq ft) × [Depth (inches) / 12]"}<br />
              {"Volume (Cubic Yards) = Volume (Cubic Feet) / 27"}<br />
              {"Volume (Cubic Yards) = [Area (sq ft) × Depth (in)] / 324"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              B. Bag Packaging Formulas
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"2.0 Cu Ft Bags = ⌈ Volume (cu ft) / 2.0 ⌉ = ⌈ Volume (cu yd) × 13.5 ⌉"}<br />
              {"3.0 Cu Ft Bags = ⌈ Volume (cu ft) / 3.0 ⌉ = ⌈ Volume (cu yd) × 9.0 ⌉"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              C. Circular Tree Ring Net Area Formula
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Net Ring Area (sq ft) = π × [(D_outer / 2)² - (D_trunk / 2)²]"}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Recommended Mulch Depths */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. Ideal Mulch Depth Guidelines by Landscape Zone
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-emerald-700 dark:text-emerald-300 block">Annual &amp; Perennial Flower Beds (2&quot; – 3&quot;)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              Fine to medium shredded bark. Retains shallow moisture without smothering delicate perennial crowns.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">Trees &amp; Shrub Borders (3&quot; – 4&quot;)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              Coarse wood chips or bark nuggets. Long-lasting weed suppression and insulation for deep woody root systems.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-300 block">Vegetable &amp; Herb Gardens (1&quot; – 2&quot;)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              Clean straw, shredded leaves, or finished compost. Decomposes rapidly and enriches the soil food web.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Tree Ring "Donut vs Volcano" Safety Guide */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. Arboricultural Standards: The &quot;Donut vs. Volcano&quot; Rule (ANSI A300)
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2.5 text-xs">
          <p className="leading-relaxed">
            Piling mulch against the base of a tree trunk (known as <strong>&quot;Mulch Volcanoing&quot;</strong>) is the leading cause of premature urban tree mortality:
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300">
            <li><strong>Bark Rot &amp; Fungal Infection:</strong> Trapped constant moisture rots the phloem layer beneath tree bark.</li>
            <li><strong>Girdling Roots:</strong> Roots grow upward into the moist mulch cone and circle around the trunk, eventually choking the tree&apos;s vascular system.</li>
            <li><strong>The Correct &quot;Donut&quot; Technique:</strong> Spread a flat 3-inch layer of mulch out to the drip line, but maintain a clear <strong>3- to 6-inch bare gap</strong> around the root flare and trunk base.</li>
          </ul>
        </div>
      </section>

      {/* 5. Material Comparison Matrix */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Organic vs. Inorganic Mulch Material Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Mulch Material</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Density (lbs/yd³)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Lifespan</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Best Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold text-blue-700 dark:text-blue-300">Hardwood Bark</td>
                <td className="p-2">~800 lbs</td>
                <td className="p-2">1 – 2 Years</td>
                <td className="p-2">General landscape beds, slopes, flower gardens</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-emerald-700 dark:text-emerald-300">Pine Bark Nuggets</td>
                <td className="p-2">~600 lbs</td>
                <td className="p-2">2 – 3 Years</td>
                <td className="p-2">Acid-loving plants (Azaleas, Blueberries, Hydrangeas)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-amber-700 dark:text-amber-300">Shredded Cedar</td>
                <td className="p-2">~700 lbs</td>
                <td className="p-2">2 – 4 Years</td>
                <td className="p-2">Pest deterrence (contains natural thujone insect repellent)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-purple-700 dark:text-purple-300">Recycled Rubber</td>
                <td className="p-2">~400 lbs</td>
                <td className="p-2">6 – 10+ Years</td>
                <td className="p-2">Playground fall zones, non-vegetative pathways</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Step-by-Step Worked Calculation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          6. Step-by-Step Worked Calculation Example
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 font-mono text-xs">
          <p className="font-sans font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            <strong>Problem:</strong> Calculate the cubic yards, 2-cu-ft bags, and weight of hardwood mulch required for a 30 ft × 15 ft shrub bed at a 3-inch depth.
          </p>

          <p><strong>Step 1: Calculate Bed Surface Area</strong><br />
          {"Area = 30 ft × 15 ft = 450 sq ft"}</p>

          <p><strong>Step 2: Calculate Cubic Feet &amp; Cubic Yards</strong><br />
          {"Depth (ft) = 3 inches / 12 = 0.25 ft"}<br />
          {"Volume (cu ft) = 450 sq ft × 0.25 ft = 112.5 cu ft"}<br />
          {"Volume (cu yd) = 112.5 / 27 = 4.17 Cubic Yards"}</p>

          <p><strong>Step 3: Calculate Bag Count</strong><br />
          {"2.0 Cu Ft Bags = ⌈ 112.5 / 2.0 ⌉ = 57 Bags"}</p>

          <p><strong>Step 4: Calculate Total Material Weight</strong><br />
          {"Weight = 4.17 cu yd × 800 lbs/yd³ = 3,336 lbs (1.67 Tons)"}<br />
          {"Requires 2 trips in a standard 1/2-ton pickup (2,000 lbs max payload)."}</p>
        </div>
      </section>

      {/* 7. Bulk vs. Bagged Purchasing Economics */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          7. Bulk Delivery vs. Bagged Purchasing Decision Rules
        </h2>
        <ul className="list-disc list-inside text-xs space-y-1 text-zinc-700 dark:text-zinc-300">
          <li><strong>Under 2 Cubic Yards (&lt; 27 Bags):</strong> Buying bagged mulch in a passenger SUV or trunk is generally cheaper and avoids bulk delivery drop fees.</li>
          <li><strong>3 to 5+ Cubic Yards (40+ Bags):</strong> Bulk scoop delivery ($32–$42/yd³ + $40 delivery) saves 30%–50% over bagged retail prices and eliminates dozens of plastic bags.</li>
        </ul>
      </section>
    </div>
  );
}
