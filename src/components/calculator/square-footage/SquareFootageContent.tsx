"use client";

import React from "react";

export function SquareFootageContent() {
  return (
    <article className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-zinc-800 dark:text-zinc-200">
      {/* ── 1. Introduction & Mathematical Definition ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          1. Understanding Square Footage: Core Mathematical Definition
        </h2>
        <p>
          <strong>Square footage (sq ft or ft²)</strong> is the standard Imperial unit of surface area measurement equal to the area of a square with sides measuring exactly one foot (12 inches or 0.3048 meters). In construction, architecture, and real estate, square footage quantifies two-dimensional surface areas including floor space, wall cladding, roofing planes, ceiling spans, and land parcels.
        </p>
        <p>
          Accurate area estimation is the baseline foundation for computing material quantities (flooring planks, ceramic tiles, drywall sheets, exterior siding, sod turf, and paint volume) and estimating project trade labor costs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 not-prose my-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800/60">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300 block mb-1">1 Square Foot (ft²)</span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400">144 in² = 0.111 sq yds = 0.0929 m² = 929.03 cm²</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800/60">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300 block mb-1">1 Square Yard (yd²)</span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400">9 ft² = 1,296 in² = 0.8361 m² (used for carpet)</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800/60">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300 block mb-1">1 Square Meter (m²)</span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400">10.7639 ft² = 1.196 yd² = 10,000 cm²</span>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800/60">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300 block mb-1">1 Acre</span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400">43,560 ft² = 4,840 yd² = 4,046.86 m²</span>
          </div>
        </div>
      </section>

      {/* ── 2. Geometric Area Formulas ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          2. Mathematical Formulas Across All Geometric Shapes
        </h2>

        {/* Rectangle & Square */}
        <div className="bg-slate-50 dark:bg-zinc-800/60 rounded-lg p-4 border border-slate-200 dark:border-zinc-700/60 space-y-2">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 m-0">
            A. Rectangle &amp; Square Area
          </h3>
          <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400">
            Area = Length × Width
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
            When dimensions are entered in inches, divide total square inches by 144: <code>Area (ft²) = (Length_in × Width_in) / 144</code>.
          </p>
        </div>

        {/* Rectangular Border / Frame */}
        <div className="bg-slate-50 dark:bg-zinc-800/60 rounded-lg p-4 border border-slate-200 dark:border-zinc-700/60 space-y-2">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 m-0">
            B. Rectangular Border &amp; Picture Frame
          </h3>
          <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400">
            Area_border = (OuterLength × OuterWidth) − [(OuterLength − 2 × BorderWidth) × (OuterWidth − 2 × BorderWidth)]
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
            Computes the border surface area around walkways, patios, picture frames, and pool coping.
          </p>
        </div>

        {/* Circle & Ring */}
        <div className="bg-slate-50 dark:bg-zinc-800/60 rounded-lg p-4 border border-slate-200 dark:border-zinc-700/60 space-y-2">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 m-0">
            C. Circle, Ring (Annulus) &amp; Circular Sector
          </h3>
          <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400">
            Area_circle = π × r² = π × (d / 2)²
            <br />
            Area_ring = π × (R_outer² − R_inner²) = (π / 4) × (D_outer² − D_inner²)
            <br />
            Area_sector = (θ / 360°) × π × r²
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
            Where <em>r</em> is radius, <em>d</em> is diameter, and <em>θ</em> is the central angle in degrees.
          </p>
        </div>

        {/* Triangles */}
        <div className="bg-slate-50 dark:bg-zinc-800/60 rounded-lg p-4 border border-slate-200 dark:border-zinc-700/60 space-y-2">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 m-0">
            D. Triangular Areas (Base &amp; Height vs. Heron&apos;s 3-Side Formula)
          </h3>
          <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400">
            Standard: Area = 0.5 × Base × Height
            <br />
            Heron&apos;s: s = (a + b + c) / 2
            <br />
            Area = √[s × (s − a) × (s − b) × (s − c)]
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
            Heron&apos;s formula allows calculating exact room area without measuring perpendicular height, requiring only the three outer wall measurements. The triangle inequality theorem requires <code>a + b &gt; c</code> for all side pairs.
          </p>
        </div>

        {/* Trapezoid & Parallelogram */}
        <div className="bg-slate-50 dark:bg-zinc-800/60 rounded-lg p-4 border border-slate-200 dark:border-zinc-700/60 space-y-2">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 m-0">
            E. Trapezoid &amp; Parallelogram Area
          </h3>
          <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-zinc-200 dark:border-zinc-800 text-blue-600 dark:text-blue-400">
            Trapezoid: Area = [(Base₁ + Base₂) / 2] × Height
            <br />
            Parallelogram: Area = Base × Perpendicular Height
          </div>
        </div>
      </section>

      {/* ── 3. Multi-Room Decomposition Technique ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          3. How to Measure Complex &amp; Irregular Floor Plans (Composite Decomposition)
        </h2>
        <p>
          Most real-world rooms are not perfect rectangles; they feature alcoves, bay windows, closets, and L-shaped corridors. To accurately compute square footage:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-xs">
          <li>
            <strong>Subdivide the Floor Plan:</strong> Draw virtual lines dividing the irregular room into simple non-overlapping sub-shapes (Rectangles $A_1, A_2$, Triangles $T_1$, and Semicircles $C_1$).
          </li>
          <li>
            <strong>Measure Each Section Independently:</strong> Record length and width in feet and inches for each sub-rectangle.
          </li>
          <li>
            <strong>Compute Sub-Areas:</strong> Calculate $A_1 = L_1 \times W_1$ and $A_2 = L_2 \times W_2$.
          </li>
          <li>
            <strong>Sum All Components:</strong> Total Net Area $= A_1 + A_2 + T_1 + \dots$
          </li>
          <li>
            <strong>Subtract Obstacles &amp; Cutouts:</strong> Deduct unfloored areas such as kitchen islands, fireplaces, stairwells, and structural columns.
          </li>
        </ol>
      </section>

      {/* ── 4. Material Waste Margins & Estimator Reference ── */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          4. Material Waste Margins &amp; Packaging Conversion Guidelines
        </h2>
        <p>
          Never order the exact net square footage. Cutting around corners, door jambs, end-of-row waste, and transit breakage consumes additional material:
        </p>
        <div className="overflow-x-auto not-prose">
          <table className="w-full text-xs border-collapse border border-zinc-200 dark:border-zinc-700">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-950/40 text-zinc-800 dark:text-zinc-200 font-bold">
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">Trade / Material</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">Standard Waste %</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">Typical Packaging Unit</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left">Coverage Estimation Formula</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2.5 font-semibold">Hardwood Flooring (Straight Lay)</td>
                <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">10%</td>
                <td className="p-2.5">Cartons (approx. 20–25 sq ft/box)</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">⌈(Sq Ft × 1.10) ÷ Box Coverage⌉</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">Ceramic / Porcelain Tile (Diagonal Lay)</td>
                <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">15%</td>
                <td className="p-2.5">Boxes (approx. 10–15 sq ft/box)</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">⌈(Sq Ft × 1.15) ÷ Box Coverage⌉</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">Interior Wall Paint (1 Coat)</td>
                <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">5% (Roller absorption)</td>
                <td className="p-2.5">1-Gallon &amp; 5-Gallon Pails</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">⌈(Wall Sq Ft × 1.05) ÷ 350 sq ft/gal⌉</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">Lawn Sod Turf</td>
                <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">5 – 8%</td>
                <td className="p-2.5">Rolls (2 ft × 5 ft = 10 sq ft) or Pallets</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">⌈(Lawn Sq Ft × 1.05) ÷ 10 sq ft/roll⌉</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">Broadloom Wall-to-Wall Carpet</td>
                <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400 font-bold">10% (Seam alignment)</td>
                <td className="p-2.5">Square Yards (12-ft or 15-ft rolls)</td>
                <td className="p-2.5 text-zinc-600 dark:text-zinc-400">(Sq Ft × 1.10) ÷ 9</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Worked Examples ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          5. Worked Step-by-Step Practical Calculations
        </h2>

        {/* Example 1: Multi-room flooring */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 m-0">
            Example 1: L-Shaped Living Room &amp; Dining Room Hardwood Flooring
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
            An open-concept living area consists of a Main Living Section (20 ft × 16 ft) and an adjoining Dining Alcove (12 ft × 10 ft). Hardwood costs $4.50/sq ft with a recommended 10% waste factor. Each carton covers 22 sq ft.
          </p>
          <div className="bg-slate-50 dark:bg-zinc-800 rounded-lg p-3 text-xs space-y-1 font-sans tabular-nums border border-zinc-200 dark:border-zinc-700">
            <p>1. Living Area: 20 × 16 = <strong>320.0 sq ft</strong></p>
            <p>2. Dining Area: 12 × 10 = <strong>120.0 sq ft</strong></p>
            <p>3. Total Net Area: 320 + 120 = <strong>440.0 sq ft</strong> (48.89 sq yds / 40.88 m²)</p>
            <p>4. With 10% Waste Factor: 440 × 1.10 = <strong>484.0 sq ft</strong></p>
            <p>5. Cartons Needed: ⌈484 ÷ 22⌉ = <strong>22 cartons</strong> (484 sq ft purchased)</p>
            <p>6. Total Material Cost: 484 × $4.50 = <strong>$2,178.00</strong></p>
          </div>
        </div>

        {/* Example 2: Circular Patio with Border */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 m-0">
            Example 2: Circular Fire Pit Paver Ring (Annulus Border)
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 m-0">
            A circular stone patio has an outer diameter of 16 feet with a 3-foot wide paver ring surrounding a central gravel fire circle (inner diameter = 10 feet).
          </p>
          <div className="bg-slate-50 dark:bg-zinc-800 rounded-lg p-3 text-xs space-y-1 font-sans tabular-nums border border-zinc-200 dark:border-zinc-700">
            <p>1. Outer Radius: R = 16 ÷ 2 = 8 ft → Outer Area = π × 8² = <strong>201.06 sq ft</strong></p>
            <p>2. Inner Radius: r = 10 ÷ 2 = 5 ft → Inner Area = π × 5² = <strong>78.54 sq ft</strong></p>
            <p>3. Paver Ring Net Area: 201.06 − 78.54 = <strong>122.52 sq ft</strong> (13.61 sq yds)</p>
            <p>4. With 8% Waste Factor: 122.52 × 1.08 = <strong>132.32 sq ft</strong></p>
          </div>
        </div>
      </section>

      {/* ── 6. Summary Checklist ── */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          6. Summary &amp; Measurement Best Practices
        </h2>
        <p className="text-xs leading-relaxed">
          Always measure room boundaries at the widest points, double-check that tape measurements are converted into decimal feet before multiplication, apply proper trade waste allowances (10% to 15%), and round up packaging units to full boxes to ensure sufficient dye-lot consistency across all floor surfaces.
        </p>
      </section>
    </article>
  );
}
