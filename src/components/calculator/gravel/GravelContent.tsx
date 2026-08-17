import React from "react";

export function GravelContent() {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Introduction to Aggregate Engineering &amp; Sub-Base Mechanics
        </h2>
        <p className="text-sm leading-relaxed">
          Gravel and crushed stone are foundational aggregate materials utilized in civil construction, residential driveways, patio sub-bases, and subsurface drainage systems. Unlike solid materials, loose aggregates compact under mechanical vibratory tamping or vehicular rolling, reducing their initial bulk volume by 5% to 20%. Accurate estimation requires factoring in aggregate density, grading, and compaction settling.
        </p>
      </section>

      {/* 2. Mathematical Concept & Formulations */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. Mathematical Formulas for Volume, Weight &amp; Compaction
        </h2>
        
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-3 text-xs font-mono">
          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              A. Volume &amp; Compaction Adjustment
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Net Volume (Cubic Feet) = Area (sq ft) × [Depth (inches) / 12]"}<br />
              {"Net Volume (Cubic Yards) = Volume (cu ft) / 27"}<br />
              {"Adjusted Volume = Net Volume × (1 + Compaction% / 100) × (1 + Waste% / 100)"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              B. Weight &amp; Tonnage Formulas
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Weight (lbs) = Adjusted Volume (cu yd) × Density (lbs/cu yd)"}<br />
              {"Weight (Short Tons) = Weight (lbs) / 2,000"}<br />
              {"Weight (Metric Tonnes) = [Weight (lbs) × 0.453592] / 1,000"}<br />
              {"Application Rate = Weight (kg) / Area (m²) [in kg/m²]"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              C. French Drain Trench Pipe Displacement
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Net Gravel Volume = [L_trench × W_trench × D_trench] - [π × (r_pipe)² × L_trench]"}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Aggregate Material Reference Table */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. Gravel &amp; Crushed Stone Material Reference Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Aggregate Type</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Density (Tons/yd³)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Compaction %</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Best Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold text-blue-700 dark:text-blue-300">Pea Gravel (3/8&quot;)</td>
                <td className="p-2">1.39 tons (2,780 lbs)</td>
                <td className="p-2">5%</td>
                <td className="p-2">Footpaths, garden borders, dog runs, decorative accents</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-emerald-700 dark:text-emerald-300">Crushed Stone #57 (3/4&quot;)</td>
                <td className="p-2">1.42 tons (2,840 lbs)</td>
                <td className="p-2">8%</td>
                <td className="p-2">Driveway top layer, French drains, concrete aggregate</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-amber-700 dark:text-amber-300">Crusher Run / Road Base</td>
                <td className="p-2">1.60 tons (3,200 lbs)</td>
                <td className="p-2">20%</td>
                <td className="p-2">Driveway sub-bases, paver foundation, heavy vehicle pads</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-purple-700 dark:text-purple-300">River Rock (1&quot;–3&quot;)</td>
                <td className="p-2">1.50 tons (3,000 lbs)</td>
                <td className="p-2">5%</td>
                <td className="p-2">Dry creek beds, downspout splash zones, erosion control</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-zinc-700 dark:text-zinc-300">Decomposed Granite (DG)</td>
                <td className="p-2">1.45 tons (2,900 lbs)</td>
                <td className="p-2">15%</td>
                <td className="p-2">Compacted pathways, courtyards, bocce ball courts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Recommended Depth by Application */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. Recommended Aggregate Depth by Construction Application
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">Vehicular Driveway (6&quot;–10&quot; Total)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              4&quot;–6&quot; compacted Crusher Run base layer + 2&quot;–3&quot; angular #57 crushed limestone wearing surface.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-emerald-700 dark:text-emerald-300 block">Pedestrian Walkway (2&quot;–4&quot; Total)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              2&quot; compacted road base + 1.5&quot;–2&quot; pea gravel or decomposed granite over non-woven geotextile fabric.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-purple-700 dark:text-purple-300 block">French Drainage Trench (12&quot;–24&quot;)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              Clean 3/4&quot; washed stone (#57) completely surrounding a 4&quot; perforated pipe wrapped in filter fabric.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Step-by-Step Worked Calculation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Step-by-Step Worked Calculation Example
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 font-mono text-xs">
          <p className="font-sans font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            <strong>Problem:</strong> Calculate the volume, tons, and cost of #57 Crushed Stone ($45/ton) needed for a 50 ft × 12 ft residential driveway at a 4-inch depth with 8% compaction and 5% waste.
          </p>

          <p><strong>Step 1: Calculate Surface Area</strong><br />
          {"Area = 50 ft × 12 ft = 600 sq ft (55.74 m²)"}</p>

          <p><strong>Step 2: Calculate Net Volume</strong><br />
          {"Depth = 4 inches / 12 = 0.333 ft"}<br />
          {"Net Volume = 600 sq ft × 0.333 ft = 200 cu ft"}<br />
          {"Net Cubic Yards = 200 / 27 = 7.41 cu yd"}</p>

          <p><strong>Step 3: Apply Compaction (8%) &amp; Waste (5%)</strong><br />
          {"Adjusted Volume = 7.41 × 1.08 × 1.05 = 8.40 Cubic Yards (6.42 m³)"}</p>

          <p><strong>Step 4: Calculate Tonnage &amp; Metric Tonnes</strong><br />
          {"Weight = 8.40 cu yd × 2,840 lbs/yd³ = 23,856 lbs"}<br />
          {"Short Tons = 23,856 / 2,000 = 11.93 Tons (~12 Tons)"}<br />
          {"Metric Tonnes = 10.82 Tonnes (Application Rate: 194.1 kg/m²)"}<br />
          {"Material Cost = 11.93 Tons × $45/ton = $536.85"}</p>
        </div>
      </section>

      {/* 6. Summary Checklist */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          6. Professional Quarry Ordering &amp; Delivery Checklist
        </h2>
        <ul className="list-disc list-inside text-xs space-y-1 text-zinc-700 dark:text-zinc-300">
          <li>Always install a commercial-grade non-woven geotextile fabric beneath gravel to prevent stone migration into native subgrade soil.</li>
          <li>Quarries sell aggregate in whole or half-ton increments; round up to the nearest full ton to ensure complete depth coverage.</li>
          <li>A standard tandem axle dump truck delivers up to 10 to 14 tons per load; verify driveway overhead utility line clearance before scheduling tail-gate spreading.</li>
        </ul>
      </section>
    </div>
  );
}
