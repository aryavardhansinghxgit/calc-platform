"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ShieldCheck, Grid, Layers, Calculator, ArrowDown } from "lucide-react";
import { tile_calculatorFaqs } from "@/app/calculators/tile-calculator/faq";

export function TileContent() {
  // All 10 FAQs open by default (unfolded, executive 401(k) style)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: tile_calculatorFaqs.length }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">

      {/* ── 0. RELATED CALCULATORS (BEFORE CONTENT BLOCK) ── */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 not-prose">
        <span className="text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px] font-bold">
          Related Calculators:
        </span>
        <Link
          href="/calculators/square-footage-calculator"
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
        >
          Square Footage Calculator
        </Link>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <Link
          href="/calculators/concrete-calculator"
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
        >
          Concrete Calculator
        </Link>
      </div>

      {/* ── 1. MAIN EDUCATIONAL CONTENT (14 COMPLETE SECTIONS) ── */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 pt-6">

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            1. How a Tile Calculator Works
          </h2>
          <p>
            A tile estimate starts with one basic question: how much surface area needs to be covered?
          </p>
          <p>
            For a rectangular floor or wall, calculate the area by multiplying length by width:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            Area = Length × Width
          </div>
          <p>
            For example, a room measuring 20 ft by 15 ft has:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            20 × 15 = 300 ft²
          </div>
          <p>
            Once the surface area is known, the next step is to determine how much area one tile covers. Tile dimensions are commonly given in inches, so the dimensions must be converted consistently before comparing them with a room measured in feet.
          </p>
          <p>
            A 12 in × 12 in tile measures 1 ft × 1 ft, giving a nominal coverage of 1 ft² per tile before accounting for grout joints, cuts, or waste.
          </p>
          <p>
            This calculator goes further than simply dividing room area by tile area. Depending on the inputs, it can account for grout-joint spacing, waste allowance, whole-tile quantities, package or box size, and additional material requirements.
          </p>
          <p>
            For projects involving several spaces, a single-room calculation may not be enough. A bathroom floor, kitchen floor, hallway, and backsplash can be entered as separate areas and combined with deductions. That approach gives you a project-level quantity rather than forcing every section into one rectangular measurement.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How Many Tiles Do I Need?
          </h2>
          <p>
            The simplest tile estimate is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            Number of Tiles = Surface Area ÷ Tile Area
          </div>
          <p>
            The result must be rounded up because you cannot purchase a fraction of a physical tile.
          </p>
          <p>
            For example, suppose a surface is 120 ft² and each tile covers 1 ft²:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            120 ÷ 1 = 120 tiles
          </div>
          <p>
            That is the theoretical quantity required to cover the area. It does not necessarily mean you should purchase exactly 120 tiles.
          </p>
          <p>
            Real installations involve cuts around walls, corners, doorways, fixtures, columns, drains, outlets, and other interruptions. Breakage and unusable offcuts can also create additional demand. That is why a waste allowance is normally added when estimating the quantity to purchase. Major retailers and industry standards commonly recommend allowing extra material for cuts and waste; 10% is a standard baseline starting point, although the appropriate allowance depends on room geometry and layout pattern.
          </p>
          <p>
            The Tile Calculator separates the base requirement from the purchased quantity so you can see where the additional material comes from rather than treating waste as a hidden adjustment.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Tile Waste: Why You Usually Need Extra
          </h2>
          <p>
            Tile waste is not simply &quot;extra tile for no reason.&quot; It is the material consumed by cuts, broken pieces, unusable offcuts, layout choices, and future replacement needs.
          </p>
          <p>
            A simple waste calculation is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            Purchased Quantity ≈ Base Quantity × (1 + Waste % ÷ 100)
          </div>
          <p>
            For example, using a base requirement of 294 tiles and a 10% waste allowance:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            294 × 1.10 = 323.4 → Rounded Up = 324 tiles
          </div>
          <p>
            If those tiles are sold in boxes containing 12 pieces:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            324 ÷ 12 = 27 boxes
          </div>
          <p>
            The calculator therefore reports 324 purchased tiles and 27 boxes.
          </p>
          <p>
            The waste percentage should be selected according to the actual project. A straightforward rectangular room with a repetitive grid pattern may require less cutting than a complicated room with many corners, diagonal layouts, niches, or numerous penetrations.
          </p>
          <p>
            Large-format installations can also have different planning considerations. Tile manufacturers and installation guidance emphasize proper substrate preparation, grout-joint planning, and mortar coverage rather than treating every tile installation as a simple area-division problem.
          </p>
          <p>
            Do not confuse a waste allowance with a manufacturer&apos;s required installation quantity. The calculator provides an estimating model; the tile manufacturer&apos;s installation instructions and actual layout should control the final purchase decision.
          </p>
        </section>

        {/* Visual Diagram 1: How Quantity is Calculated */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider block">
            Flow Diagram: How Tile Quantity Is Calculated
          </span>
          <div className="text-xs font-mono bg-white dark:bg-zinc-900 p-3 rounded border border-slate-200 dark:border-zinc-800 space-y-1 text-center">
            <div>Room Length × Room Width</div>
            <div className="text-blue-500 font-bold">↓</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">Surface Area (sq ft)</div>
            <div className="text-blue-500 font-bold">↓</div>
            <div>Tile Size + Grout Joint Module</div>
            <div className="text-blue-500 font-bold">↓</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">Net Tile Quantity</div>
            <div className="text-blue-500 font-bold">↓</div>
            <div>Waste Factor (+10% to +20%)</div>
            <div className="text-blue-500 font-bold">↓</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">Purchased Tile Quantity</div>
            <div className="text-blue-500 font-bold">↓</div>
            <div>Package / Tiles per Box</div>
            <div className="text-blue-500 font-bold">↓</div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400">Total Boxes to Purchase (Ceiling)</div>
          </div>
        </div>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Tile Size Changes the Number of Tiles
          </h2>
          <p>
            Two projects can have exactly the same floor area but require very different numbers of tiles because tile dimensions determine how many individual pieces are needed.
          </p>
          <p>
            Consider a 300 ft² room.
          </p>
          <p>
            With 12 in × 12 in tiles:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            1 ft × 1 ft = 1 ft² per tile → 300 ÷ 1 = 300 tiles
          </div>
          <p>
            Now consider 12 in × 24 in tiles:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            1 ft × 2 ft = 2 ft² per tile → 300 ÷ 2 = 150 tiles
          </div>
          <p>
            The covered area is the same, but the number of pieces is roughly half.
          </p>
          <p>
            This is why a good tile estimate should use the actual tile dimensions rather than relying only on room square footage.
          </p>
          <p>
            Tile dimensions should also be entered in their actual units. A tile advertised as 12 × 24 inches should not be entered as 12 × 24 feet. The calculator converts supported units so that the physical areas can be compared consistently.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Understanding Grout Joints and Effective Tile Coverage
          </h2>
          <p>
            Tile quantity is sometimes estimated using only the face area of the tile. That is useful for a basic estimate, but installations also contain grout joints.
          </p>
          <p>
            If the calculator accounts for the grout joint, the effective repeating module can be represented as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            Effective Module Area = (Tile Length + Grout Width) × (Tile Width + Grout Width)
          </div>
          <p>
            For example, with a 12 in × 12 in tile and a 1/8 in joint:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            (12 + 0.125) × (12 + 0.125) = 12.125 × 12.125 = 147.015625 in²
          </div>
          <p>
            Using an effective module means the calculation is describing the repeating tile-and-joint layout rather than assuming the tile faces touch edge to edge.
          </p>
          <p>
            This distinction is especially useful when comparing tile sizes or estimating a large installation where small differences in repeating dimensions accumulate across hundreds of tiles.
          </p>
          <p>
            Grout selection and joint dimensions should still follow the tile manufacturer&apos;s requirements and applicable installation standards. The TCNA Handbook specifically includes information on grout joint sizes, patterns, material specifications, workmanship, and installation methods.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Tile Boxes: Why the Calculator Rounds Up
          </h2>
          <p>
            Tile is commonly sold by the box or carton, so the number of boxes cannot be a decimal.
          </p>
          <p>
            The basic formula is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            Boxes = Ceiling(Total Tiles ÷ Tiles per Box)
          </div>
          <p>
            Suppose the project requires 324 tiles and the product contains 12 tiles per box:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            324 ÷ 12 = 27 boxes
          </div>
          <p>
            Now consider a project requiring 325 tiles:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            325 ÷ 12 = 27.0833... → 28 boxes
          </div>
          <p>
            You cannot purchase 27.0833 boxes, so the practical purchase quantity is 28 boxes.
          </p>
          <p>
            That means the calculator may show a purchased tile capacity greater than the exact number of tiles required. This is not a mathematical error; it is the consequence of buying complete packages.
          </p>
          <p>
            For example: 25 required tiles with 12 tiles per box yields 2.0833 boxes, which requires buying 3 boxes (36 tiles total), leaving 11 tiles above the calculated requirement for future attic stock and repairs.
          </p>
        </section>

        {/* Visual Diagram 2: Net vs Purchased Tiles */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider block">
            Comparison: Net Surface Tiles vs. Purchased Boxes
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-slate-200 dark:border-zinc-800">
              <span className="text-zinc-500 block text-[11px]">Net Area Coverage</span>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">294 Tiles</span>
              <span className="text-zinc-400 block text-[10px]">Exact fit for 300 sq ft</span>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-slate-200 dark:border-zinc-800">
              <span className="text-zinc-500 block text-[11px]">+10% Waste Factor</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400 font-sans tabular-nums">324 Tiles</span>
              <span className="text-zinc-400 block text-[10px]">+30 cutting scrap tiles</span>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-slate-200 dark:border-zinc-800">
              <span className="text-zinc-500 block text-[11px]">Package Rounding (12/box)</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums">27 Boxes</span>
              <span className="text-zinc-400 block text-[10px]">324 sq ft total coverage</span>
            </div>
          </div>
        </div>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Multi-Room Tile Calculations
          </h2>
          <p>
            A house or commercial space rarely consists of one perfect rectangle. A more realistic tile estimate may contain several separate areas.
          </p>
          <p>
            For example:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <div>• Master Bathroom: 12 ft × 10 ft = 120 ft² | Deduction: 15 ft² → Net: 105 ft²</div>
            <div>• Kitchen Floor: 18 ft × 14 ft = 252 ft² | Deduction: 25 ft² → Net: 227 ft²</div>
            <div>• Backsplash: 15 ft × 2.5 ft = 37.5 ft² | Deduction: 0 ft² → Net: 37.5 ft²</div>
            <div className="pt-1 font-bold text-blue-700 dark:text-blue-300">Total Net Area: 105 + 227 + 37.5 = 369.5 ft²</div>
          </div>
          <p>
            The multi-room approach prevents users from estimating each space separately and then manually adding results.
          </p>
          <p>
            It is also useful for projects where a doorway, island, shower opening, fireplace, built-in cabinet, or another excluded area should not be counted as tileable surface.
          </p>
          <p>
            The deduction should represent a genuine area that is not being tiled. Do not use arbitrary deductions simply to make the estimate smaller. When the exact geometry is irregular, measure the actual tileable area as accurately as possible.
          </p>
          <p>
            For a project where you need to compare tile coverage with a broader floor-area calculation, use the{" "}
            <Link href="/calculators/square-footage-calculator" className="text-blue-600 dark:text-blue-400 underline font-medium">
              square footage calculator
            </Link>{" "}
            alongside this tool.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Estimating Grout Quantity
          </h2>
          <p>
            Grout quantity depends on more than floor area. Important variables include tile length, tile width, tile thickness, grout-joint width, total tiled area, grout formulation or product, and installation conditions.
          </p>
          <p>
            A smaller tile generally creates more joints over the same surface area than a larger tile. Likewise, a wider joint can require more grout volume.
          </p>
          <p>
            The calculator&apos;s grout estimator uses the selected tile and joint dimensions to produce an estimate and then converts that requirement into practical bag quantities.
          </p>
          <p>
            For example, the verified calculator model uses the standard TCNA grout-weight relationship:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            Grout Weight (lbs) = [(L + W) × T × G × 0.065 × (Area × 144)] ÷ (L × W × 144)
          </div>
          <p className="text-xs text-slate-500">
            Where L = length (in), W = width (in), T = thickness (in), G = joint gap (in), and 0.065 is the dry cementitious grout density constant (lbs/in³).
          </p>
          <p>
            For a 300 ft² surface using 12 × 12 × 3/8 in tile with a 1/8 in joint, the calculator&apos;s verified raw grout estimate is 21.9375 lb. Its selected allowance produces approximately 25.2 lb, which is then translated into practical bag quantities (two 25-lb bags or three 10-lb bags).
          </p>
          <p>
            This should be treated as an estimate rather than a substitute for the coverage information supplied for the specific grout product. Actual consumption changes with tile dimensions, joint geometry, application technique, substrate conditions, and product characteristics.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Thin-Set Mortar and Trowel Selection
          </h2>
          <p>
            Thin-set or tile-setting mortar should not be estimated solely from room square footage. Coverage depends on the particular mortar, substrate, tile dimensions, trowel configuration, installation technique, and required mortar thickness.
          </p>
          <p>
            Manufacturer documentation is therefore more important than a generic &quot;bags per square foot&quot; rule.
          </p>
          <p>
            For example, standard commercial thin-set mortars list approximately 80 to 90 ft² of coverage per 50-lb bag when used with a 1/4 in × 1/4 in square-notched trowel, but dropping to 30 to 35 ft² per bag when using a 1/2 in × 1/2 in square notch for large-format tiles.
          </p>
          <p>
            Industry standards from MAPEI and TCNA emphasize choosing a trowel notch that provides sufficient mortar contact: greater than 80% mortar contact for dry interior residential floors, and greater than 95% for exterior, commercial-floor, and wet shower installations.
          </p>
          <p>
            For large-format tile (edges ≥ 15 inches), back-buttering (flat-troweling the back of each tile) is mandatory to eliminate voids. When preparing subfloors or concrete slabs before setting tile, refer to the{" "}
            <Link href="/calculators/concrete-calculator" className="text-blue-600 dark:text-blue-400 underline font-medium">
              concrete calculator
            </Link>{" "}
            for slab volume and sub-base estimation.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Choosing a Tile Layout Pattern
          </h2>
          <p>
            The same tile can produce different cutting requirements depending on the layout pattern:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Straight Grid / Stacked (10% Waste)</span>
              <p className="text-slate-600 dark:text-slate-400">
                Tiles align in continuous rows and columns parallel to perimeter walls. Lowest number of diagonal cuts.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Running Bond / Subway (10%–12% Waste)</span>
              <p className="text-slate-600 dark:text-slate-400">
                Each row is offset 50% or 1/3 from the previous row. Common for rectangular tiles; cut ends can be reused on opposite ends.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Diagonal / Diamond 45° (15% Waste)</span>
              <p className="text-slate-600 dark:text-slate-400">
                Tiles rotated 45 degrees relative to walls. Requires continuous diagonal cuts along all four perimeter boundaries.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Herringbone (15%–20% Waste)</span>
              <p className="text-slate-600 dark:text-slate-400">
                Interlocking directional V-shapes. High volume of angular edge cuts, point miters, and unusable offcut scrap.
              </p>
            </div>
          </div>
          <p>
            The live pattern preview in the calculator helps you visually verify the selected dimensions, grout spacing, and alignment before ordering materials.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Tile Cost: Materials, Labor and Sales Tax
          </h2>
          <p>
            A tile project&apos;s total cost is more than the price of the tile itself. A practical budget includes tile material, grout, thin-set mortar, spacers, sealant, professional tile-setter labor, and sales tax.
          </p>
          <p>
            For example, using a 300 ft² project with the calculator&apos;s standard reference rates:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <div>• Tile: 300 ft² × $4.50/sq ft = $1,350.00</div>
            <div>• Grout: 1 × $18.00/bag = $18.00</div>
            <div>• Thin-set: 9 × $22.00/bag = $198.00</div>
            <div>• Sundries Kit (spacers, sponge, sealer): $35.00</div>
            <div>• Material Subtotal: $1,601.00</div>
            <div>• Professional Setter Labor: 300 ft² × $9.00/sq ft = $2,700.00</div>
            <div>• Material Sales Tax (7% on materials): $1,601.00 × 7% = $112.07</div>
            <div className="pt-1 font-bold text-emerald-600 dark:text-emerald-400">
              • Estimated Total Project Investment: $4,413.07 ($14.71 per sq ft)
            </div>
          </div>
          <p>
            Notice that in professional construction budgeting, contractor labor is typically non-taxable, while physical materials are subject to local retail sales tax. The rates in the calculator are fully editable so you can customize the takeoff to your local bids.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Floor Tile vs Wall Tile vs Backsplash
          </h2>
          <p>
            Square footage is calculated from physical dimensions regardless of whether the surface is a floor or wall, but the installation requirements can be different:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Floor Tile:</strong> Requires heavier structural deflection limits (L/360 for ceramic, L/720 for natural stone), mortar coverage ≥ 80% to 95%, and higher abrasion/PEI wear ratings.</li>
            <li><strong>Wall Tile:</strong> Focuses on non-sag mortar adhesion, vertical alignment, corner waterproofing membranes, and lighter tile thicknesses (1/4&quot; vs 3/8&quot;).</li>
            <li><strong>Backsplashes:</strong> Involve smaller surface areas but require more perimeter cuts around cabinets, electrical receptacles, windows, and corners. A higher waste factor (12% to 15%) is recommended.</li>
          </ul>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Why a Tile Estimate Can Differ From the Final Installer Takeoff
          </h2>
          <p>
            A calculator estimates quantity from nominal dimensions and mathematical geometry. A professional installer may produce a slightly different final takeoff because field conditions account for:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
            <li>Out-of-square walls and uneven room perimeters.</li>
            <li>Centering the layout to avoid thin sliver cuts (less than half a tile) along focal walls.</li>
            <li>Movement expansion joints required every 20 to 25 feet (or 8 to 12 feet in direct sunlight) under TCNA EJ171 guidelines.</li>
            <li>Batch dye-lot variations requiring full box purchases from the same production run.</li>
          </ul>
          <p>
            Use this calculator for accurate preliminary material budgeting, contractor bid evaluation, and box quantity planning. For projects where you first need to establish or verify the total surface area, the{" "}
            <Link href="/calculators/square-footage-calculator" className="text-blue-600 dark:text-blue-400 underline font-medium">
              square footage calculator
            </Link>{" "}
            can be used alongside this tile estimator.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Worked Example: 20 × 15 ft Room With 12 × 12 in Tile
          </h2>
          <p>
            Suppose a rectangular kitchen floor measures 20 ft × 15 ft with 12&quot; × 12&quot; tiles, 1/8&quot; grout lines, 10% waste, and 12 tiles per box:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <div>Step 1: Calculate Surface Area = 20 ft × 15 ft = 300 ft² (43,200 in²)</div>
            <div>Step 2: Effective Tile Module = (12 + 0.125) × (12 + 0.125) = 147.016 in²</div>
            <div>Step 3: Net Tiles Needed = ⌈ 43,200 ÷ 147.016 ⌉ = ⌈ 293.85 ⌉ = 294 Net Tiles</div>
            <div>Step 4: Add 10% Waste = ⌈ 293.85 × 1.10 ⌉ = ⌈ 323.23 ⌉ = 324 Total Purchased Tiles</div>
            <div>Step 5: Calculate Boxes (12 pcs/box) = ⌈ 324 ÷ 12 ⌉ = 27 Boxes (324 ft² coverage)</div>
            <div>Step 6: TCNA Grout Requirement = 24.1 lbs Sanded Grout (1 × 25-lb Bag)</div>
            <div>Step 7: Thin-Set Mortar = 9 Bags (50-lb each, 1/4&quot; × 3/8&quot; Square Notch)</div>
          </div>
          <p>
            This example demonstrates why the number of physical tiles and number of boxes are not interchangeable. The mathematical requirement is one quantity; the purchasable package quantity is another.
          </p>
        </section>

        {/* ── 2. E-E-A-T TRUST & DISCLAIMER CARD ── */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Tile Quantity &amp; Cost Estimate Disclaimer
            </h3>
          </div>
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            This Tile Calculator is intended for planning and estimating purposes. Results depend on the measurements, tile dimensions, grout spacing, waste allowance, product coverage and pricing entered by the user. Material and installation requirements vary by product and project conditions. Always verify tile, grout, mortar, waterproofing, substrate preparation, movement-joint and installation requirements using the applicable manufacturer&apos;s technical documentation and project specifications. Calculator cost estimates are not contractor quotations and should not be treated as guaranteed market prices, labor rates, taxes, delivery charges or disposal costs. For structural, waterproofing, substrate or code-related decisions, consult a qualified tile contractor and applicable local building codes.
          </p>
        </div>

      </div>

      {/* ── 3. RELATED CALCULATORS (AFTER CONTENT BLOCK) ── */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 not-prose">
        <span className="text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px] font-bold">
          Related Calculators:
        </span>
        <Link
          href="/calculators/square-footage-calculator"
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
        >
          Square Footage Calculator
        </Link>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <Link
          href="/calculators/concrete-calculator"
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
        >
          Concrete Calculator
        </Link>
      </div>

      {/* ── 4. FAQ SECTION (Unfolded by Default, Executive 401(k) Style) ── */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {tile_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </article>
  );
}

export default TileContent;
