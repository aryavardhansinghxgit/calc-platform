"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, Layers, ShieldCheck, TreePine, AlertTriangle } from "lucide-react";
import { mulch_calculatorFaqs } from "@/app/calculators/mulch-calculator/faq";

export function MulchContent() {
  // All 14 FAQs open/unfolded by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 14 }, (_, i) => i))
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
      {/* ─── RELATED CALCULATORS — ABOVE CONTENT ─── */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/60 not-prose">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          RELATED CALCULATORS:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium">
          <Link
            href="/calculators/gravel-calculator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-2xs"
          >
            Gravel Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link
            href="/calculators/square-footage-calculator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-2xs"
          >
            Square Footage Calculator
          </Link>
        </div>
      </div>

      {/* ─── FULL EDUCATIONAL CONTENT (20 COMPLETE SECTIONS) ─── */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 pt-6">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Mulch Calculator: Calculate Cubic Yards, Bags, Weight &amp; Cost
          </h2>
          <p>
            A mulch estimate starts with a simple question: how much material is needed to cover the landscape at the intended depth?
          </p>
          <p>
            The answer depends on the area of the bed, the mulch depth, the shape of the area, the product being purchased, and whether the material is sold in bags or delivered in bulk.
          </p>
          <p>
            This Mulch Calculator converts landscape dimensions into the quantities that matter when planning a project:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Square feet or square meters of coverage</li>
            <li>Cubic feet</li>
            <li>Cubic yards</li>
            <li>Cubic meters</li>
            <li>Bag requirements (standard 1.5, 2.0, and 3.0 cu ft retail sizes)</li>
            <li>Estimated material weight</li>
            <li>Bulk-versus-bagged purchasing cost comparison</li>
            <li>Pickup truck or utility trailer load estimates</li>
          </ul>
          <p>
            It also handles more specialized layouts, including tree rings, multiple landscape beds, and mulch hauling calculations. For larger area takeoffs, pair this with our{" "}
            <Link
              href="/calculators/square-footage-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700"
            >
              Square Footage Calculator
            </Link>
            .
          </p>
          <p>
            The most important idea is that mulch is purchased by different units at different stages of a project. Your landscape has an area, the mulch has a depth, the material occupies a volume, and the supplier may sell it by the bag or cubic yard. That is why calculating square footage alone is not enough.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How the Mulch Calculator Works
          </h2>
          <p>
            For a rectangular landscape bed, the first calculation is area:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Area = Length × Width &nbsp;&nbsp;(A = L × W)
          </div>
          <p>
            where <em>A</em> is area, <em>L</em> is length, and <em>W</em> is width.
          </p>
          <p>
            The next step is to convert mulch depth into the same unit used for the dimensions (feet):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            3 inches = 3 / 12 = 0.25 feet
          </div>
          <p>
            The volume is then:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Volume = Area × Depth &nbsp;&nbsp;(V = A × D)
          </div>
          <p>
            If the area is 200 square feet and the mulch depth is 3 inches:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Volume = 200 × 0.25 = 50 cubic feet (ft³)
          </div>
          <p>
            Convert cubic feet to cubic yards (since 1 cubic yard = 27 cubic feet):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Volume (yd³) = 50 / 27 ≈ 1.85 cubic yards
          </div>
          <p>
            So a 200-square-foot bed covered to a 3-inch depth requires approximately 1.85 cubic yards of mulch before any project-specific adjustments. This is the central calculation used throughout the calculator.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Why Mulch Depth Changes the Quantity So Much
          </h2>
          <p>
            Mulch volume increases directly and linearly with depth. For the same 200-square-foot bed:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs border border-slate-200 dark:border-slate-700 rounded-lg">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="p-2 border-b border-slate-200 dark:border-slate-700 font-semibold">Mulch Depth</th>
                  <th className="p-2 border-b border-slate-200 dark:border-slate-700 font-semibold">Cubic Feet (200 sq ft)</th>
                  <th className="p-2 border-b border-slate-200 dark:border-slate-700 font-semibold">Cubic Yards</th>
                  <th className="p-2 border-b border-slate-200 dark:border-slate-700 font-semibold">2 cu ft Bags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-2">1 inch</td>
                  <td className="p-2 font-mono">16.67 ft³</td>
                  <td className="p-2 font-mono">0.62 yd³</td>
                  <td className="p-2 font-mono">9 bags</td>
                </tr>
                <tr>
                  <td className="p-2">2 inches</td>
                  <td className="p-2 font-mono">33.33 ft³</td>
                  <td className="p-2 font-mono">1.23 yd³</td>
                  <td className="p-2 font-mono">17 bags</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium text-blue-600 dark:text-blue-400">3 inches</td>
                  <td className="p-2 font-mono font-medium">50.00 ft³</td>
                  <td className="p-2 font-mono font-medium">1.85 yd³</td>
                  <td className="p-2 font-mono font-medium">25 bags</td>
                </tr>
                <tr>
                  <td className="p-2">4 inches</td>
                  <td className="p-2 font-mono">66.67 ft³</td>
                  <td className="p-2 font-mono">2.47 yd³</td>
                  <td className="p-2 font-mono">34 bags</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The relationship is linear: doubling the mulch depth doubles the volume required.
          </p>
          <p>
            However, the mathematically correct depth is not necessarily the horticulturally correct depth for every landscape. Penn State Extension describes a 2–3 inch settled mulch layer as appropriate for many plantings, while Minnesota Extension advises avoiding excessively deep mulch and keeping it away from trunks and stems. Other extension recommendations vary according to the planting situation.
          </p>
          <p>
            Use the calculator to evaluate the amount required for the depth you have selected rather than assuming that one number is universally correct.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            4. How Many Cubic Yards of Mulch Do I Need?
          </h2>
          <p>
            The most common bulk-mulch calculation is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Cubic Yards = [Area (sq ft) × Depth (ft)] / 27
          </div>
          <p>
            When depth is entered in inches, the equation converts directly via the standard landscape divisor <strong>324</strong> (12 inches/ft × 27 cu ft/cu yd = 324):
          </p>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 font-mono text-center text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-100">
            Cubic Yards = [Area (sq ft) × Depth (inches)] / 324
          </div>
          <p>
            For example, 600 square feet at 3 inches depth:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            (600 × 3) / 324 = 1,800 / 324 ≈ 5.56 cubic yards
          </div>
          <p>
            So the mathematical requirement is about 5.56 cubic yards before considering waste or settling adjustments. This formula is particularly useful when ordering loose mulch by the scoop or truckload from a landscape supplier.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            5. How Many Bags of Mulch Do I Need?
          </h2>
          <p>
            Bagged mulch is normally sold by its volume rather than by surface area. If each bag contains 2 cubic feet:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Bags Needed = Volume (cu ft) / Bag Size (cu ft)
          </div>
          <p>
            Because retailers do not sell fractional physical bags, the purchasing quantity is always rounded upward:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Bags to Buy = ⌈ Volume (cu ft) / Bag Volume ⌉
          </div>
          <p>
            <strong>Example:</strong> For a 200-square-foot bed at 3 inches depth, total volume is 50 cu ft. With standard 2 ft³ bags:
          </p>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 font-mono text-center text-xs sm:text-sm font-semibold text-emerald-900 dark:text-emerald-100">
            50 / 2 = 25 Bags
          </div>
          <p>
            The calculator uses the selected package size (1.5, 2.0, or 3.0 cu ft) when estimating bag counts. Always check the actual bag volume printed on the packaging before retail checkout, as a 2-cubic-foot bag and a 3-cubic-foot bag have significantly different coverage capacities.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Mulch Calculator for a Tree Ring
          </h2>
          <p>
            A tree ring is not a solid rectangle or circle. It is an <strong>annulus</strong>, meaning the usable mulch area is the gross outer circle minus the central area occupied by the tree trunk and root flare.
          </p>
          <p>
            The mathematical formula is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Area = (π / 4) × (D_outer² − D_trunk²)
          </div>
          <p>
            where <em>D_outer</em> is the outer bed diameter and <em>D_trunk</em> is the trunk or inner ring diameter.
          </p>
          <p>
            <strong>Example:</strong> Suppose outer diameter = 8 ft and trunk diameter = 1.5 ft:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Area = (π / 4) × (8² − 1.5²) = (π / 4) × (64 − 2.25) ≈ 48.52 sq ft
          </div>
          <p>
            In metric units, that is approximately:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            48.52 × 0.092903 ≈ 4.51 m²
          </div>
          <p>
            At 3 inches deep:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Volume = 48.52 × (3 / 12) ≈ 12.13 cu ft &nbsp;&nbsp;(12.13 / 27 ≈ 0.45 cubic yards)
          </div>
          <p>
            This is why a tree-ring calculation should subtract the actual central opening instead of treating the ring as an unbroken circle.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Why Tree-Trunk Diameter Matters
          </h2>
          <p>
            A small change in the inner diameter directly alters the mulch area. For a 10-foot outer diameter:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>No central opening (full circle):</strong> Area = π × (5)² ≈ 78.54 sq ft</li>
            <li><strong>2-foot trunk opening:</strong> Area = (π / 4) × (10² − 2²) ≈ 75.40 sq ft</li>
            <li><strong>4-foot mature trunk opening:</strong> Area = (π / 4) × (10² − 4²) ≈ 65.97 sq ft</li>
          </ul>
          <p>
            The calculator treats trunk diameter as an actual geometric input. A trunk diameter of zero is handled as zero excluded area, meaning the geometry becomes a complete circular bed. An inner diameter equal to or larger than the outer diameter is physically impossible geometry and produces an explicit validation state rather than being silently clamped.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            8. How Deep Should Mulch Be Around Trees and Plants?
          </h2>
          <p>
            This is one place where a calculator should not pretend that one fixed number applies to every landscape.
          </p>
          <p>
            Extension guidance commonly recommends a moderate mulch depth. Penn State describes approximately 2–3 inches for many planting situations, while Minnesota Extension warns against excessively deep applications because deep mulch can interfere with water and oxygen movement and encourage pests and crown rot around trunks.
          </p>
          <p>
            The practical horticultural rule is:
          </p>
          <blockquote className="p-3 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 rounded-r-lg text-xs italic text-blue-950 dark:text-blue-200">
            Choose the depth for the specific planting and mulch product, and avoid creating a deep mound against a tree trunk. Keep mulch from directly contacting the trunk or stem.
          </blockquote>
          <p>
            Minnesota Extension explicitly recommends leaving the root flare bare and keeping mulch 3 to 6 inches away from the bark. Penn State likewise advises keeping organic mulch away from tree trunks and avoiding excessive buildup. For this reason, the calculator lets you choose the depth rather than enforcing a single rigid standard.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            9. What Is a Mulch Volcano?
          </h2>
          <p>
            A “mulch volcano” is a steep mound of mulch piled directly against the base and bark of a tree.
          </p>
          <p>
            The problem is not the circular bed shape itself; it is the excessive depth and direct contact with the tree bark. Organic mulch holds continuous moisture against bark tissues that evolved for open air, causing bark decay, fungal rot, girdling roots, and rodent nesting.
          </p>
          <p>
            A healthy tree-ring layout follows the recommended “donut” configuration:
          </p>
          <pre className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-[11px] sm:text-xs overflow-x-auto text-slate-700 dark:text-slate-300">
{`          MULCHED BED AREA (2–3 in depth)
       ┌─────────────────────────────────┐
      /                                   \\
     /             MULCH                   \\
    |           ┌─────────┐                 |
    |           │  TRUNK  │                 |
    |           └─────────┘                 |
     \\       3–6 in Root Flare Gap         /
      \\___________________________________/

                     ↑
          Keep trunk and root flare
             completely uncovered`}
          </pre>
          <p>
            The calculator assists with the accurate area and material quantity. Final tree-care configurations should adhere to authoritative arboricultural standards (ANSI A300).
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Mulch for Large and Irregular Landscape Beds
          </h2>
          <p>
            A real residential or commercial property usually contains several distinct zones rather than one single rectangle. For example:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Front entry foundation planting bed</li>
            <li>Master shade tree ring</li>
            <li>Perennial flower border along the property line</li>
            <li>Walkway edging and shrub island</li>
            <li>Mailbox bed and curb planting strip</li>
          </ul>
          <p>
            The Multi-Bed Landscape Aggregator allows each section to be entered independently with its own geometry, dimensions, and depth, then automatically summed:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Total Volume = Σ V_i = V_1 + V_2 + ... + V_n
          </div>
          <p>
            For aggregate-based landscaping, crushed stone pathways, or French drain sub-bases, you can pair this planning with our dedicated{" "}
            <Link
              href="/calculators/gravel-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2 hover:text-blue-700"
            >
              Gravel Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Bulk Mulch vs Bagged Mulch
          </h2>
          <p>
            Bagged and bulk mulch must be compared using the exact same volume basis. Suppose a project requires 50 cubic feet (approx. 1.85 cubic yards):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Bagged Purchasing Option</span>
              <p>50 cu ft / 2 cu ft = 25 bags</p>
              <p>At $4.00 per bag: 25 × $4.00 = <strong>$100.00</strong></p>
              <p className="text-[11px] text-slate-500">No delivery charge if hauled in your own car trunk.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Bulk Delivery Option</span>
              <p>1.85 yd³ × $36.00/yd³ = $66.60</p>
              <p>Delivery Fee: $45.00</p>
              <p>Bulk Total: $66.60 + $45.00 = <strong>$111.60</strong></p>
            </div>
          </div>
          <p>
            In this small-project scenario, bagged mulch saves $11.60 because bulk delivery adds a flat fee. But when project volume reaches 4 to 10+ cubic yards, bulk pricing becomes dramatically cheaper, saving $150 to $400 while eliminating dozens of discarded plastic bags.
          </p>
          <p>
            The calculator&apos;s bulk-versus-bagged module compares both options using your exact local prices.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Worked Example: 20 × 10 ft Mulch Bed
          </h2>
          <p>
            Consider a rectangular bed with: Length = 20 ft, Width = 10 ft, Depth = 3 in, Bag size = 2 ft³, Bag price = $4.25:
          </p>
          <div className="space-y-1.5 text-xs bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 font-mono">
            <p>1. Surface Area: 20 ft × 10 ft = 200 sq ft</p>
            <p>2. Mulch Depth in Feet: 3 in / 12 = 0.25 ft</p>
            <p>3. Volume in Cubic Feet: 200 sq ft × 0.25 ft = 50.0 cu ft</p>
            <p>4. Volume in Cubic Yards: 50.0 / 27 = 1.85185 yd³ (≈ 1.85 yd³)</p>
            <p>5. Metric Volume: 1.85185 × 0.764555 ≈ 1.42 m³ (1,416 Liters)</p>
            <p>6. 2.0 cu ft Bags: 50.0 / 2.0 = 25 Bags</p>
            <p>7. Material Cost: 25 bags × $4.25 = $106.25</p>
            <p>8. Material Weight (Hardwood bark @ 800 lbs/yd³): 1.85185 × 800 ≈ 1,481 lbs (≈ 672 kg)</p>
          </div>
          <p>
            This worked example demonstrates how physical yard dimensions translate directly into shopping quantities, logistics weights, and material costs.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Mulch Weight: Why the Number Can Vary
          </h2>
          <p>
            Mulch is sold primarily by volume, but estimating material weight is crucial when hauling mulch in a pickup bed or utility trailer.
          </p>
          <p>
            The basic physical equation is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Weight = Volume × Density &nbsp;&nbsp;(W = V × ρ)
          </div>
          <p>
            Bulk density varies considerably depending on the wood species, particle size, and moisture content:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Hardwood / Bark Mulch:</strong> ~800 lbs/yd³ (~475 kg/m³)</li>
            <li><strong>Pine Bark Nuggets:</strong> ~600 lbs/yd³ (~355 kg/m³)</li>
            <li><strong>Shredded Cedar Mulch:</strong> ~700 lbs/yd³ (~415 kg/m³)</li>
            <li><strong>Recycled Rubber Mulch:</strong> ~400 lbs/yd³ (~237 kg/m³)</li>
            <li><strong>Compost / Soil Blend:</strong> ~1,200 lbs/yd³ (~712 kg/m³)</li>
            <li><strong>Decorative Pea Gravel:</strong> ~2,400 lbs/yd³ (~1,424 kg/m³)</li>
          </ul>
          <p>
            Rainwater can double the weight of organic mulch. A load that was safely below your truck&apos;s payload limit when dry can exceed payload capacity after heavy rain.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Pickup Truck and Trailer Load Estimation
          </h2>
          <p>
            Calculating the volume of mulch you need is completely different from verifying whether your vehicle can safely carry it.
          </p>
          <p>
            The truck estimator evaluates both:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Trips by Volume = ⌈ Total Volume / Vehicle Volume Capacity ⌉<br />
            Trips by Weight = ⌈ Total Weight / Vehicle Max Payload ⌉<br />
            Recommended Trips = max(Trips by Volume, Trips by Weight)
          </div>
          <p>
            <strong>Example:</strong> Suppose 1.85 cubic yards of hardwood mulch weighs approximately 671 kg (1,480 lbs). A standard half-ton pickup (e.g. Ford F-150) has a maximum payload limit of 907 kg (2,000 lbs) and a bed capacity of 2.5 cubic yards:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Volume check: 1.85 yd³ ≤ 2.5 yd³ (1 trip needed)<br />
            Weight check: 671 kg / 907 kg = 74% payload capacity (1 trip needed)
          </div>
          <p>
            The calculator displays <strong>74% payload capacity</strong> and recommends <strong>1 Trip</strong>.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            15. How to Estimate Mulch Cost
          </h2>
          <p>
            Project budgeting uses the following material equations:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm">
            Bagged Cost = Bags Needed × Price per Bag<br />
            Bulk Cost = Volume (cu yds) × Bulk Price per Yard + Delivery Fee<br />
            Total Project Investment = Material Cost + Delivery + Edging/Fabric
          </div>
          <p>
            Retail prices vary by supplier, season, geographic region, and mulch variety (colored dyed mulch, cypress, bark nuggets, or cedar). Use the calculator&apos;s cost fields to model your exact local supplier estimates.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Why Exact Internal Values Matter
          </h2>
          <p>
            Calculators frequently round displayed intermediate values for clean user interfaces. However, rounding numbers too early causes noticeable mathematical drift when values are multiplied downstream into bags and costs.
          </p>
          <p>
            For instance, a bed requiring 1.85185 cubic yards at $36/yd³ yields $66.67. If rounded prematurely to 1.8 yd³, the calculation drops to $64.80. The Mulch Calculator engine preserves full floating-point precision across all volume, area, weight, and density intermediate calculations, applying rounding rules only to final displayed outputs.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            17. How to Use the Mulch Calculator
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>Step 1: Measure the area.</strong> For rectangular beds, measure length and width. For tree rings, measure the outer bed diameter and trunk diameter. For multiple beds, enter each zone into Card 3.</li>
            <li><strong>Step 2: Enter the intended mulch depth.</strong> Use 2 to 3 inches for general landscape beds and 1 to 2 inches for delicate plantings.</li>
            <li><strong>Step 3: Choose the mulch material.</strong> This applies the proper bulk density model for accurate weight and payload analysis.</li>
            <li><strong>Step 4: Review volume.</strong> Inspect cubic yards, cubic feet, and metric cubic meters.</li>
            <li><strong>Step 5: Review bags or bulk quantity.</strong> Check how many 1.5, 2.0, or 3.0 cu ft bags you need.</li>
            <li><strong>Step 6: Review weight and vehicle capacity.</strong> Confirm whether your truck can haul the load in a single trip.</li>
            <li><strong>Step 7: Compare bulk vs bagged pricing.</strong> Enter local delivery fees and prices to find the most cost-effective buying method.</li>
          </ol>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            18. How Much Mulch Should I Buy?
          </h2>
          <p>
            A solid purchasing plan begins with the exact net area and depth, then accounts for practical site factors:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Curved or irregular bed borders:</strong> Irregular edges often result in 5% to 10% extra volume compared to simple geometric boxes.</li>
            <li><strong>Existing mulch decomposition:</strong> If top-dressing an existing bed that already has 1–2 inches of decomposed mulch, you may only need a 1-inch fresh top layer.</li>
            <li><strong>Settling:</strong> Coarse organic bark mulch settles approximately 10% to 15% within the first two weeks of watering.</li>
            <li><strong>Package sizes:</strong> Retail bagged mulch is sold in fixed whole-bag quantities, requiring upward rounding.</li>
          </ul>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Common Mulch-Estimating Mistakes
          </h2>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100">Confusing square feet with volume:</strong> Square footage measures 2D surface area; mulch ordering requires multiplying area by depth to find 3D volume.
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100">Forgetting to convert inches to feet:</strong> Entering depth in inches without dividing by 12 inflates calculated volume twelve-fold.
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100">Ignoring tree trunk displacement:</strong> Treating a tree ring as a solid circle wastes material and encourages suffocating mulch volcanos.
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100">Ignoring truck payload ratings:</strong> Just because 2.5 cubic yards fits into a pickup bed does not mean the truck suspension can legally or safely carry the weight.
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100">Overlooking bulk delivery charges:</strong> Comparing a $35/yd³ bulk price to $4/bag without factoring in a $50 delivery fee can lead to false savings on small projects.
            </div>
          </div>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Mulch Calculator Limitations
          </h2>
          <p>
            This calculator is designed for mathematical quantity estimation, logistics planning, and material budgeting. It does not determine:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>The ideal horticultural mulch species for specialized or acid-loving plants (e.g. azaleas, blueberries)</li>
            <li>Specific soil drainage chemistry or pre-emergent herbicide interactions</li>
            <li>Local municipal brush disposal or stormwater runoff ordinances</li>
            <li>Vehicle gross vehicle weight rating (GVWR) legal road compliance</li>
          </ul>
          <p>
            Always verify product density specifications with your bulk aggregate or landscape supplier prior to ordering.
          </p>
        </section>
      </div>

      {/* ─── 4. UNCHANGED & COMPLETE FAQ SECTION (UNFOLDED BY DEFAULT) ─── */}
      <div className="pt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Frequently Asked Questions About Mulch Calculations
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
            14 Questions
          </span>
        </div>

        <div className="space-y-3">
          {mulch_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-3.5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── RELATED CALCULATORS — AFTER CONTENT ─── */}
      <div className="pt-6 not-prose">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
            RELATED CALCULATORS:
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium">
            <Link
              href="/calculators/gravel-calculator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-2xs"
            >
              Gravel Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Link
              href="/calculators/square-footage-calculator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-2xs"
            >
              Square Footage Calculator
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MulchContent;
