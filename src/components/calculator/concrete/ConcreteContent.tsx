"use client";

import React from "react";

export function ConcreteContent() {
  return (
    <article className="prose prose-sm dark:prose-invert max-w-none space-y-6">
      {/* ── 1. Introduction ── */}
      <section>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          What Is a Concrete Calculator?
        </h2>
        <p>
          A concrete calculator estimates the volume of concrete needed for a construction project,
          expressed in cubic feet, cubic yards, and cubic meters. It then converts that volume into
          the number of pre-mixed bags required (40-, 50-, 60-, or 80-pound sizes) and the number
          of ready-mix truck deliveries needed.
        </p>
        <p>
          <strong>Who uses it:</strong> General contractors, civil engineers, homeowners building
          patios and driveways, masons, landscape designers, and municipal infrastructure planners.
          Accurate concrete estimation prevents costly over-ordering (wasted material) and
          dangerous under-ordering (cold joints and structural weakness from interrupted pours).
        </p>
        <p>
          <strong>Why it matters:</strong> Concrete is a perishable product once mixed — ready-mix
          concrete must be placed within 60–90 minutes. Ordering too little forces an emergency
          second delivery, creating a cold joint that weakens the structure. Ordering too much
          wastes material that costs $125–$150 per cubic yard. A reliable calculator eliminates
          both risks.
        </p>
      </section>

      {/* ── 2. Mathematical Concepts ── */}
      <section>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Mathematical Concepts Behind Concrete Volume
        </h2>
        <p>
          Every concrete volume estimation reduces to computing the volume of a geometric solid:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Rectangular prism</strong> — slabs, walls, and square footings. Volume equals
            length × width × height.
          </li>
          <li>
            <strong>Right circular cylinder</strong> — columns, round footings, and post holes.
            Volume equals π × radius² × height.
          </li>
          <li>
            <strong>Hollow cylinder (annulus)</strong> — tubes and circular slabs with a central
            void. Volume equals the difference between two concentric cylinders.
          </li>
          <li>
            <strong>L-shaped cross-section</strong> — curbs and gutters. The cross-sectional area
            is computed as the sum of two rectangles (the vertical curb face and the horizontal
            gutter flag), then extruded along the length.
          </li>
          <li>
            <strong>Stepped wedge</strong> — stairs. Each riser adds a rectangular block whose
            height increases cumulatively, plus an optional platform slab on top.
          </li>
        </ul>
        <p>
          All dimensions must be converted to a consistent unit (feet) before computing volume.
          The calculator supports feet, inches, yards, meters, and centimeters.
        </p>
      </section>

      {/* ── 3. Formulas ── */}
      <section>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Formulas
        </h2>

        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-4">
          Slab, Wall, or Square Footing
        </h3>
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 font-mono text-sm text-blue-800 dark:text-blue-300">
          V = L × W × H × Qty × (1 + Wastage% / 100)
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
          Where <em>L</em> = length, <em>W</em> = width, <em>H</em> = thickness or height, all in
          feet. Result is in cubic feet. Divide by 27 for cubic yards.
        </p>

        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-4">
          Column, Hole, or Round Footing
        </h3>
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 font-mono text-sm text-blue-800 dark:text-blue-300">
          V = π × (d / 2)² × H × Qty × (1 + Wastage% / 100)
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
          Where <em>d</em> = diameter, <em>H</em> = depth or height, both in feet.
        </p>

        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-4">
          Circular Slab or Tube
        </h3>
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 font-mono text-sm text-blue-800 dark:text-blue-300">
          V = π × [(d₁/2)² − (d₂/2)²] × H × Qty × (1 + Wastage% / 100)
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
          Where <em>d₁</em> = outer diameter, <em>d₂</em> = inner diameter. The inner diameter
          must be smaller than the outer diameter; otherwise the result is zero.
        </p>

        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-4">
          Curb & Gutter Barrier
        </h3>
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 font-mono text-sm text-blue-800 dark:text-blue-300">
          V = [(CurbDepth × CurbHeight) + (GutterWidth × FlagThickness)] × Length × Qty
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
          The cross-section is modelled as two adjacent rectangles forming an L-shape.
        </p>

        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-4">
          Stairs
        </h3>
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 font-mono text-sm text-blue-800 dark:text-blue-300">
          V = Width × Run × Rise × n(n+1)/2 + Width × PlatformDepth × (Rise × n)
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
          Where <em>n</em> = number of risers. The first term sums the cumulative step blocks
          (each successive step is one rise taller). The second term adds the landing platform.
        </p>
      </section>

      {/* ── 4. How the Calculation Works ── */}
      <section>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          How the Calculation Works: Step by Step
        </h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Enter dimensions</strong> — Provide length, width, height (or diameter, depth)
            in your preferred unit system. The calculator converts everything to feet internally.
          </li>
          <li>
            <strong>Set quantity and wastage</strong> — If you are pouring multiple identical
            footings, increase the quantity. Add 5–10% wastage to account for spillage, uneven
            sub-grade, and formwork absorption.
          </li>
          <li>
            <strong>Compute raw volume</strong> — The appropriate geometric formula is applied.
            The result is expressed in ft³, yd³, and m³.
          </li>
          <li>
            <strong>Estimate weight</strong> — Volume is multiplied by concrete density (default:
            133 lbs/ft³ for standard pre-mixed concrete, adjustable for lightweight or heavyweight
            mixes).
          </li>
          <li>
            <strong>Count bags</strong> — A standard 80-lb bag covers 0.60 ft³, a 60-lb bag covers
            0.45 ft³, a 50-lb bag covers 0.375 ft³, and a 40-lb bag covers 0.30 ft³. The
            calculator rounds up to the next whole bag.
          </li>
          <li>
            <strong>Estimate truck deliveries</strong> — For large pours, divide the total cubic
            yards by the truck capacity (typically 9–10 yd³ per ready-mix truck) and round up.
          </li>
        </ol>
      </section>

      {/* ── 5. Worked Examples ── */}
      <section>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Worked Examples
        </h2>

        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-3">
          Basic: Simple Patio Slab
        </h3>
        <p>
          A homeowner wants to pour a 10 ft × 10 ft patio slab, 4 inches thick, with 5% wastage.
        </p>
        <div className="bg-slate-50 dark:bg-zinc-800 rounded-lg p-3 text-xs space-y-1 font-sans tabular-nums">
          <p>Convert thickness: 4 in ÷ 12 = 0.333 ft</p>
          <p>Raw volume: 10 × 10 × 0.333 = 33.33 ft³</p>
          <p>With 5% wastage: 33.33 × 1.05 = 35.0 ft³</p>
          <p>Cubic yards: 35.0 ÷ 27 = <strong>1.30 yd³</strong></p>
          <p>80-lb bags needed: ⌈35.0 ÷ 0.60⌉ = <strong>59 bags</strong></p>
          <p>Weight: 35.0 × 133 = <strong>4,655 lbs</strong> (2,112 kg)</p>
        </div>

        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-4">
          Intermediate: Fence Post Holes
        </h3>
        <p>
          A contractor needs to fill 20 post holes, each 10 inches in diameter and 3 feet deep.
        </p>
        <div className="bg-slate-50 dark:bg-zinc-800 rounded-lg p-3 text-xs space-y-1 font-sans tabular-nums">
          <p>Convert diameter: 10 in ÷ 12 = 0.833 ft → radius = 0.417 ft</p>
          <p>Volume per hole: π × 0.417² × 3.0 = 1.636 ft³</p>
          <p>Total for 20 holes: 1.636 × 20 = 32.72 ft³</p>
          <p>Cubic yards: 32.72 ÷ 27 = <strong>1.21 yd³</strong></p>
          <p>80-lb bags: ⌈32.72 ÷ 0.60⌉ = <strong>55 bags</strong></p>
        </div>

        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-4">
          Advanced: Concrete Staircase
        </h3>
        <p>
          An engineer designs a 5-step staircase with 12-inch run, 6-inch rise, 50-inch width,
          and a 5-inch deep landing platform.
        </p>
        <div className="bg-slate-50 dark:bg-zinc-800 rounded-lg p-3 text-xs space-y-1 font-sans tabular-nums">
          <p>Convert to feet: run = 1.0 ft, rise = 0.5 ft, width = 4.167 ft, platform = 0.417 ft</p>
          <p>Steps volume: 4.167 × 1.0 × 0.5 × (5 × 6) / 2 = 4.167 × 1.0 × 0.5 × 15 = 31.25 ft³</p>
          <p>Platform volume: 4.167 × 0.417 × (0.5 × 5) = 4.167 × 0.417 × 2.5 = 4.34 ft³</p>
          <p>Total: 31.25 + 4.34 = <strong>35.59 ft³</strong> = <strong>1.32 yd³</strong></p>
        </div>
      </section>

      {/* ── 6. Visual Understanding ── */}
      <section>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Reference Tables
        </h2>

        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-3">
          Bag Coverage Reference
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-950/30">
                <th className="border border-blue-200 dark:border-blue-800 px-3 py-1.5 text-left font-bold">Bag Size</th>
                <th className="border border-blue-200 dark:border-blue-800 px-3 py-1.5 text-left font-bold">Coverage (ft³)</th>
                <th className="border border-blue-200 dark:border-blue-800 px-3 py-1.5 text-left font-bold">Bags per yd³</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: "40 lb", coverage: "0.30", bags: "90" },
                { size: "50 lb", coverage: "0.375", bags: "72" },
                { size: "60 lb", coverage: "0.45", bags: "60" },
                { size: "80 lb", coverage: "0.60", bags: "45" },
              ].map((row) => (
                <tr key={row.size}>
                  <td className="border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 font-semibold">{row.size}</td>
                  <td className="border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 font-sans tabular-nums">{row.coverage}</td>
                  <td className="border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 font-sans tabular-nums">{row.bags}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mt-4">
          Recommended Slab Thickness by Application
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-950/30">
                <th className="border border-blue-200 dark:border-blue-800 px-3 py-1.5 text-left font-bold">Application</th>
                <th className="border border-blue-200 dark:border-blue-800 px-3 py-1.5 text-left font-bold">Minimum Thickness</th>
                <th className="border border-blue-200 dark:border-blue-800 px-3 py-1.5 text-left font-bold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                { app: "Sidewalk / Pathway", thickness: "4 inches", notes: "Light foot traffic only" },
                { app: "Patio / Residential driveway", thickness: "4–5 inches", notes: "Passenger vehicles" },
                { app: "Garage floor", thickness: "5–6 inches", notes: "Reinforce with wire mesh" },
                { app: "Commercial parking lot", thickness: "6–8 inches", notes: "Heavy vehicles, rebar grid" },
                { app: "Industrial slab", thickness: "8–12 inches", notes: "Forklift & heavy equipment loads" },
                { app: "Foundation footing", thickness: "12+ inches", notes: "Below frost line, per engineer" },
              ].map((row) => (
                <tr key={row.app}>
                  <td className="border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 font-semibold">{row.app}</td>
                  <td className="border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 font-sans tabular-nums">{row.thickness}</td>
                  <td className="border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-zinc-500">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 7. Common Mistakes ── */}
      <section>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Common Mistakes to Avoid
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Mixing inches and feet without converting.</strong> Entering "4" for a
            4-inch slab thickness while the unit selector is set to "feet" produces a volume 12×
            too large. Always verify your unit selections.
          </li>
          <li>
            <strong>Ignoring wastage.</strong> A zero-wastage estimate assumes perfectly level
            sub-grade, zero spillage, and ideal formwork. Real-world pours typically waste 5–10%
            of the ordered volume. For irregularly shaped excavations, use 10–15%.
          </li>
          <li>
            <strong>Using standard density for lightweight concrete.</strong> Lightweight
            aggregate concrete weighs 90–105 lbs/ft³, not 133 lbs/ft³. If your mix uses expanded
            shale, clay, or slate aggregates, adjust the density setting.
          </li>
          <li>
            <strong>Forgetting the inner diameter for tubes.</strong> When calculating annular
            shapes (pipes, ring footings), failing to subtract the inner volume produces a
            dramatically inflated estimate.
          </li>
          <li>
            <strong>Under-estimating stair volume.</strong> Stairs are solid concrete, not hollow
            steps. The volume increases quadratically with the number of risers because each
            successive step sits atop all previous ones.
          </li>
        </ul>
      </section>

      {/* ── 8. Practical Applications ── */}
      <section>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Practical Applications
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Residential construction:</strong> Driveways, patios, garage floors,
            sidewalks, and foundation slabs. Homeowners can use bag-count estimates for small
            DIY projects under 2 cubic yards.
          </li>
          <li>
            <strong>Commercial and industrial:</strong> Warehouse floors, loading docks, parking
            structures, and equipment pads. These projects typically use ready-mix trucks and
            require pump-truck coordination.
          </li>
          <li>
            <strong>Infrastructure:</strong> Curb and gutter construction for road projects,
            concrete barriers, and bridge abutment footings. Municipal projects often require
            volume estimates in metric (m³).
          </li>
          <li>
            <strong>Landscaping:</strong> Retaining wall footings, fence post holes, and raised
            garden bed foundations. Round footing estimates are especially useful for post and
            column installations.
          </li>
          <li>
            <strong>Engineering estimation:</strong> Structural engineers use concrete volume as
            the basis for reinforcing steel (rebar) schedules, formwork design, and project
            budgeting. Accurate volume is the starting point for all downstream calculations.
          </li>
        </ul>
      </section>

      {/* ── 9. Related Concepts ── */}
      <section>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Related Construction Concepts
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Curing time:</strong> Concrete reaches approximately 70% of its design
            strength after 7 days and 99% after 28 days under standard curing conditions
            (68°F, moist-cured). Do not load the slab before it has cured sufficiently.
          </li>
          <li>
            <strong>Compaction factor:</strong> When estimating gravel or crushed stone
            sub-base volume, apply a compaction factor of 1.3–1.5× to account for the
            reduction in volume after mechanical compaction.
          </li>
          <li>
            <strong>Rebar spacing:</strong> For a 4-inch residential slab, #3 rebar at 18-inch
            centers in both directions is typical. Thicker slabs and structural applications
            require engineering design per ACI 318.
          </li>
          <li>
            <strong>Slump test:</strong> Standard slump for residential concrete is 4–5 inches.
            Higher slump (more water) makes pouring easier but reduces strength. Never add
            water to ready-mix concrete beyond the specified water-cement ratio.
          </li>
          <li>
            <strong>Concrete strength classes:</strong> Residential projects typically specify
            2,500–3,000 PSI (17–21 MPa). Structural elements like columns and beams may require
            4,000–6,000 PSI (28–41 MPa). Higher strength mixes use more cement per cubic yard.
          </li>
        </ul>
      </section>

      {/* ── 10. Summary ── */}
      <section>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Summary
        </h2>
        <p>
          Concrete volume estimation applies basic geometric volume formulas — rectangular
          prisms for slabs and walls, cylinders for columns and footings, annular cylinders
          for tubes, L-profiles for curbs, and stepped wedges for stairs. The critical steps
          are: (1) consistent unit conversion, (2) applying a realistic wastage margin, and
          (3) converting volume to practical quantities (bag counts or truck loads).
        </p>
        <p>
          For small projects (under 2 yd³), purchasing pre-mixed bags is cost-effective.
          For projects exceeding 2–3 yd³, ready-mix delivery becomes both cheaper and
          produces a superior monolithic pour with no cold joints. Always verify your
          quantity estimate with a 5–10% wastage allowance before ordering.
        </p>
      </section>
    </article>
  );
}
