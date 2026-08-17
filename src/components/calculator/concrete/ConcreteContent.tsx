"use client";

import React from "react";

export function ConcreteContent() {
  return (
    <article className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-zinc-800 dark:text-zinc-200">
      {/* ── 1. Introduction & Engineering Fundamentals ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          1. Concrete Volume & Material Estimation Fundamentals
        </h2>
        <p>
          Concrete is the world&apos;s most widely used composite building material, formed through the exothermic chemical hydration of hydraulic Portland cement, fine aggregate (sand), coarse aggregate (gravel or crushed stone), and water. Because fresh concrete begins to set within 60 to 90 minutes of batching, accurate volume calculation is a critical engineering requirement.
        </p>
        <p>
          Ordering too little concrete results in <strong>cold joints</strong> — structural fault lines formed when fresh concrete is poured against already-hardened concrete — compromising shear strength and water resistance. Conversely, over-ordering creates costly waste ($125 to $150+ per cubic yard) and disposal challenges, as ready-mix trucks cannot return leftover wet concrete.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 not-prose my-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800/60">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300 block mb-1">Cubic Foot (ft³)</span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400">1 ft³ = 1,728 in³ = 0.03704 yd³ = 0.0283 m³</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800/60">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300 block mb-1">Cubic Yard (yd³)</span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400">1 yd³ = 27 ft³ = 46,656 in³ = 0.7646 m³</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800/60">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300 block mb-1">Cubic Meter (m³)</span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400">1 m³ = 35.3147 ft³ = 1.30795 yd³</span>
          </div>
        </div>
      </section>

      {/* ── 2. Mathematical Formulas for Geometric Solids ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          2. Mathematical Formulas by Geometric Shape
        </h2>
        <p>
          Construction elements correspond to specific geometric solid volumes. All linear inputs must be converted into a common unit (feet) before computation:
        </p>

        {/* Slab */}
        <div className="bg-slate-50 dark:bg-zinc-800/60 rounded-lg p-4 border border-slate-200 dark:border-zinc-700/60 space-y-2">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 m-0">
            A. Slabs, Square Footings, Grade Beams &amp; Retaining Walls
          </h3>
          <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400">
            V (ft³) = Length (ft) × Width (ft) × Thickness (ft) × Quantity × [1 + (Wastage% / 100)]
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
            To obtain cubic yards: <code>V (yd³) = V (ft³) / 27</code>. Example: a 10 ft × 10 ft slab at 4 inches thick requires <code>(10 × 10 × 0.333) / 27 = 1.235 yd³</code>.
          </p>
        </div>

        {/* Column */}
        <div className="bg-slate-50 dark:bg-zinc-800/60 rounded-lg p-4 border border-slate-200 dark:border-zinc-700/60 space-y-2">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 m-0">
            B. Cylindrical Columns, Round Piers &amp; Sonotube Footings
          </h3>
          <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400">
            V (ft³) = π × [Diameter (ft) / 2]² × Depth (ft) × Quantity × [1 + (Wastage% / 100)]
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
            Calculates right circular cylinder volume. Radius equals <code>d / 2</code>.
          </p>
        </div>

        {/* Tube */}
        <div className="bg-slate-50 dark:bg-zinc-800/60 rounded-lg p-4 border border-slate-200 dark:border-zinc-700/60 space-y-2">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 m-0">
            C. Annular Cylinders, Hollow Tubes &amp; Ring Foundations
          </h3>
          <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400">
            V (ft³) = π × [(d₁ / 2)² − (d₂ / 2)²] × Height (ft) × Quantity × [1 + (Wastage% / 100)]
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
            Where <em>d₁</em> is outer diameter and <em>d₂</em> is inner diameter. Inner diameter must strictly satisfy <code>d₂ &lt; d₁</code>.
          </p>
        </div>

        {/* Curb & Gutter */}
        <div className="bg-slate-50 dark:bg-zinc-800/60 rounded-lg p-4 border border-slate-200 dark:border-zinc-700/60 space-y-2">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 m-0">
            D. Curb and Gutter Barriers (L-Shaped Extrusion)
          </h3>
          <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400">
            Cross-Section Area (ft²) = [CurbDepth (ft) × CurbHeight (ft)] + [GutterWidth (ft) × FlagThickness (ft)]
            <br />
            V (ft³) = Area (ft²) × Length (ft) × Quantity
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
            Models standard municipal L-curbs by summing the vertical curb stand and horizontal gutter apron.
          </p>
        </div>

        {/* Stairs */}
        <div className="bg-slate-50 dark:bg-zinc-800/60 rounded-lg p-4 border border-slate-200 dark:border-zinc-700/60 space-y-2">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 m-0">
            E. Solid Concrete Staircases
          </h3>
          <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400">
            V_steps (ft³) = Width (ft) × Run (ft) × Rise (ft) × [n × (n + 1) / 2]
            <br />
            V_platform (ft³) = Width (ft) × PlatformDepth (ft) × [n × Rise (ft)]
            <br />
            V_total = V_steps + V_platform
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
            Where <em>n</em> is the total number of risers. The arithmetic sum <code>n(n+1)/2</code> accounts for the cumulative monolithic volume beneath each ascending step.
          </p>
        </div>
      </section>

      {/* ── 3. Bagged vs Ready-Mix Decision Framework ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          3. Pre-Mixed Bag vs. Ready-Mix Truck Delivery Matrix
        </h2>
        <p>
          Determining whether to hand-mix bagged concrete or order ready-mix transit delivery depends on project scale, labor, and budget:
        </p>
        <div className="overflow-x-auto not-prose">
          <table className="w-full text-xs border-collapse border border-zinc-200 dark:border-zinc-700">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-950/40 text-zinc-800 dark:text-zinc-200 font-bold">
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">Volume Threshold</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">Recommended Method</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">80-lb Bag Equivalent</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">Key Practical Factors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2.5 font-semibold">&lt; 1.0 yd³ (&lt; 27 ft³)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">Pre-mixed bags (DIY)</td>
                <td className="p-2.5 font-mono">1 – 45 bags</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Cheaper than truck short-load fees; portable mixer or wheelbarrow.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">1.0 – 2.5 yd³ (27 – 67.5 ft³)</td>
                <td className="p-2.5 text-amber-600 dark:text-amber-400 font-semibold">Borderline / Site-Mix or Truck</td>
                <td className="p-2.5 font-mono">45 – 113 bags</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">High physical labor (mixing ~7,000 lbs by hand). Truck delivery often justified.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">&gt; 2.5 yd³ (&gt; 67.5 ft³)</td>
                <td className="p-2.5 text-blue-600 dark:text-blue-400 font-semibold">Ready-Mix Transit Truck</td>
                <td className="p-2.5 font-mono">&gt; 113 bags</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Monolithic pour without cold joints; precise slump control; lowest cost per yard.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 4. Concrete Mix Ratios & Strength Classes ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          4. Mix Ratios, Strength Classes &amp; Water-Cement Ratio
        </h2>
        <p>
          For site-mixed concrete, volumetric ratios specify parts of <strong>Cement : Sand (Fine Aggregate) : Stone (Coarse Aggregate)</strong>. The <em>water-cement ratio</em> ($w/c$) is the single most important factor governing final compressive strength (PSI / MPa) and permeability:
        </p>
        <div className="overflow-x-auto not-prose">
          <table className="w-full text-xs border-collapse border border-zinc-200 dark:border-zinc-700">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-950/40 text-zinc-800 dark:text-zinc-200 font-bold">
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">Mix Ratio</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">Designation</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">28-Day Strength</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">Standard Construction Use Cases</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2.5 font-bold font-mono">1 : 2 : 4</td>
                <td className="p-2.5">M15 / General Purpose</td>
                <td className="p-2.5 font-sans font-semibold">2,200 – 2,500 PSI (15 MPa)</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Garden walkways, light patio slabs, fence post anchors, non-load bearing work.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-mono">1 : 1.5 : 3</td>
                <td className="p-2.5">M20 / Structural Standard</td>
                <td className="p-2.5 font-sans font-semibold">3,000 – 3,500 PSI (20 MPa)</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Residential driveways, foundation footings, basement floors, exterior slabs.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-mono">1 : 2 : 3</td>
                <td className="p-2.5">M25 / High-Strength</td>
                <td className="p-2.5 font-sans font-semibold">3,600 – 4,000+ PSI (25 MPa)</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Heavy equipment pads, commercial driveways, structural beams, columns, stairs.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold font-mono">1 : 3 : 6</td>
                <td className="p-2.5">M10 / Lean Mass Concrete</td>
                <td className="p-2.5 font-sans font-semibold">1,450 – 1,800 PSI (10 MPa)</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">Sub-base leveling, pipe trench bedding, thick mass gravity retaining structures.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500 italic">
          * Note on water-cement ratio: An ideal $w/c$ is 0.40 to 0.45. Adding an extra gallon of water per bag reduces compressive strength by up to 250 PSI and increases drying shrinkage cracks.
        </p>
      </section>

      {/* ── 5. Sub-Base Preparation & Rebar Schedules ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          5. Sub-Base Engineering &amp; Reinforcement Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-2">
            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
              Sub-Base &amp; Soil Preparation
            </h4>
            <ul className="text-xs space-y-1.5 text-zinc-600 dark:text-zinc-400 list-disc pl-4">
              <li>Excavate all organic topsoil down to undisturbed, stable subgrade.</li>
              <li>Install a 4-inch layer of crushed gravel (3/4-inch minus with fines).</li>
              <li>Compaction reduces crushed aggregate volume by <strong>1.30 to 1.40×</strong>.</li>
              <li>Install a 10–15 mil polyethylene vapor barrier under interior basement and garage slabs.</li>
            </ul>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-2">
            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
              Rebar &amp; Wire Mesh Placement
            </h4>
            <ul className="text-xs space-y-1.5 text-zinc-600 dark:text-zinc-400 list-disc pl-4">
              <li><strong>4-inch slabs:</strong> #3 rebar (3/8&quot;) on 18&quot; grid or 6×6 W1.4/W1.4 welded wire mesh.</li>
              <li><strong>5–6 inch driveways:</strong> #4 rebar (1/2&quot;) placed on a 12&quot; to 16&quot; grid.</li>
              <li>Support all reinforcement on plastic or concrete chairs so it sits in the middle third of the slab depth.</li>
              <li>Cut control joints every 24 to 30 times the slab thickness (e.g., 8–10 ft for a 4-inch slab).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Temperature & Curing Rules ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          6. Temperature Management &amp; Curing Protocols (ACI 308)
        </h2>
        <p>
          Hydration is a temperature-sensitive chemical reaction. Proper curing retains moisture to allow maximum silicate hydration:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 not-prose">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60">
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block mb-1">Cold Weather (&lt; 40°F / 4°C)</span>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 m-0">
              Hydration slows dramatically below 40°F and ceases below freezing. Use insulated curing blankets, warm batch water, or Type III high-early cement. Never pour on frozen ground.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60">
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block mb-1">Standard (50°F to 85°F)</span>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 m-0">
              Keep moist for at least 7 days using wet burlap, plastic sheeting, or a liquid curing compound. Concrete reaches ~70% of design strength at 7 days, 100% at 28 days.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60">
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block mb-1">Hot Weather (&gt; 90°F / 32°C)</span>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 m-0">
              High evaporation causes rapid slump loss and plastic shrinkage cracking. Use chilled batch water, erect windbreaks/sunshades, and apply curing compounds immediately.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. Common Estimating & Pouring Mistakes ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          7. Critical Estimation &amp; Site Pitfalls to Avoid
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li>
            <strong>Zero-Wastage Assumption:</strong> Forms flex, excavations have uneven subgrades, and spillage occurs. Always add a <strong>5% to 8% margin</strong> for uniform formwork and <strong>10% to 15%</strong> for rough earthen excavations (post holes and trenches).
          </li>
          <li>
            <strong>Dimension Unit Mixing:</strong> Entering 4 inches as &quot;4&quot; with unit set to &quot;feet&quot; inflates the volume by 1200%. Verify all unit selectors before ordering.
          </li>
          <li>
            <strong>Underestimating Stairs:</strong> Solid concrete stairs contain volume in both the triangular stair wedge and the rectangular steps. Treating stairs as hollow steps under-orders material by 40% to 60%.
          </li>
          <li>
            <strong>Premature Loading:</strong> Walking on green concrete before 24–48 hours, or driving passenger vehicles before 7 days (and heavy trucks before 28 days), causes permanent subsurface microcracking.
          </li>
          <li>
            <strong>Placing Rebar on Bare Dirt:</strong> Rebar lying on the ground without chairs will corrode from moisture exposure and provides zero tensile reinforcement to the slab.
          </li>
        </ul>
      </section>

      {/* ── 8. Summary ── */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          8. Summary &amp; Ordering Checklist
        </h2>
        <p className="text-xs leading-relaxed">
          Accurate concrete planning begins with precise geometric volume calculation across your required shapes (slabs, columns, tubes, curbs, and stairs). Apply the appropriate wastage factor, select between pre-mixed bags (for jobs &lt; 1–2 yd³) or ready-mix delivery (for &gt; 2.5 yd³), and confirm your mix ratio and compressive strength specifications with your local supplier before placement.
        </p>
      </section>
    </article>
  );
}
