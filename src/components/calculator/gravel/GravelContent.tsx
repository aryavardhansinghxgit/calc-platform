"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, Layers } from "lucide-react";
import { gravel_calculatorFaqs } from "@/app/calculators/gravel-calculator/faq";

export function GravelContent() {
  // All 12 FAQs open by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
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
      {/* RELATED CALCULATORS — ABOVE CONTENT */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/60 not-prose">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          RELATED CALCULATORS:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium">
          <Link
            href="/calculators/square-footage-calculator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-2xs"
          >
            Square Footage Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link
            href="/calculators/concrete-calculator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-2xs"
          >
            Concrete Calculator
          </Link>
        </div>
      </div>

      {/* EXPANDED MAIN EDUCATIONAL CONTENT (23 COMPLETE SECTIONS) */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 pt-6">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Gravel Calculator: Cubic Yards, Tons, Bags &amp; Cost
          </h2>
          <p>
            A gravel project is usually estimated in more than one unit. The area may be measured in square feet, the required layer in inches, material ordered in cubic yards or tons, and smaller landscaping projects may be purchased by the bag. That makes a simple area calculation insufficient when you are trying to determine how much aggregate to order.
          </p>
          <p>
            This Gravel Calculator converts the dimensions of a project into an estimated quantity of aggregate and can also account for compaction, waste, material density, quantity, bag equivalents, truckloads, and material cost.
          </p>
          <p>
            The calculator supports common project shapes including rectangular areas, circles, and triangles. It also includes a multi-zone estimator for projects with several sections, a gravel cost and delivery estimator, and a dedicated French drain and drainage-trench calculator.
          </p>
          <p>
            Use the result as a material estimate, then compare it with your supplier&apos;s product specifications, delivery terms, and the actual conditions at the job site.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            2. What Does a Gravel Calculator Calculate?
          </h2>
          <p>
            At its core, gravel estimating is a volume problem.
          </p>
          <p>
            The basic sequence is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            Area × depth = volume
          </div>
          <p>
            Then the volume can be converted into the units normally used for aggregate purchasing.
          </p>
          <p>
            For a rectangular area:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            A = L × W
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            where A = area, L = length, and W = width.
          </p>
          <p>
            For a gravel layer:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            V = A × D
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            where D is the layer depth expressed in the same length unit as the area dimensions.
          </p>
          <p>
            When measurements are entered in feet and the depth is entered in inches, convert the depth first:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            D_ft = D_in / 12
          </div>
          <p>
            Then:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            V_ft³ = L_ft × W_ft × D_ft
          </div>
          <p>
            Since 1 cubic yard = 27 cubic feet:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            V_yd³ = V_ft³ / 27
          </div>
          <p>
            That cubic-yard quantity is the starting point for converting the required volume into an approximate weight.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How to Calculate Gravel for a Rectangular Area
          </h2>
          <p>
            A driveway, path, parking area, patio, shed base, or rectangular landscaping bed can usually be estimated from three dimensions:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>length</li>
            <li>width</li>
            <li>gravel depth</li>
          </ul>
          <p>
            Suppose a driveway is 50 ft long, 12 ft wide, and 4 in deep.
          </p>
          <p>
            First calculate the surface area:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            50 × 12 = 600 ft²
          </div>
          <p>
            Convert 4 inches to feet:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            4 / 12 = 0.333333 ft
          </div>
          <p>
            Then calculate the raw volume:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            600 × 0.333333 ≈ 200 ft³
          </div>
          <p>
            Convert to cubic yards:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            200 / 27 ≈ 7.407 yd³
          </div>
          <p>
            So the project contains approximately 7.41 cubic yards before adjustments.
          </p>
          <p>
            The distinction between raw volume and ordered volume is important. If the project includes compaction or a waste allowance, the purchasing quantity can be higher than the geometric volume.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Compaction and Settling: Why the Order Quantity Can Be Higher
          </h2>
          <p>
            Loose aggregate does not necessarily occupy exactly the same volume after placement and compaction.
          </p>
          <p>
            This calculator therefore allows a compaction / settling percentage to be applied to the calculated base volume.
          </p>
          <p>
            A simplified adjustment can be represented as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            V_c = V × (1 + C / 100)
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            where V = base volume, C = compaction allowance in percent, and V_c = volume after the selected allowance.
          </p>
          <p>
            For example, an 8% allowance gives:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            V_c = V × 1.08
          </div>
          <p>
            A second adjustment may be used for waste:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            V_order = V_c × (1 + W / 100)
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            where W is the waste allowance percentage.
          </p>
          <p>
            This distinction matters because compaction and waste are not the same thing.
          </p>
          <p>
            Compaction is intended to account for settling or the difference between an initially loose material quantity and the final installed condition. Waste accounts for material that is lost or otherwise unavailable for placement because of handling, spillage, uneven edges, cutting, cleanup, or other project-specific causes.
          </p>
          <p>
            Do not automatically apply the same percentage to every project. The appropriate estimating allowance depends on the material, installation process, site conditions, and supplier practice.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            5. How Many Tons of Gravel Do I Need?
          </h2>
          <p>
            Cubic yards describe volume, while tons describe weight.
          </p>
          <p>
            To convert volume into weight, the calculator uses the selected aggregate density:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            W_tons = V_yd³ × ρ
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            where W_tons = estimated short tons, V_yd³ = adjusted volume, and ρ = material density in tons per cubic yard.
          </p>
          <p>
            This is why two materials occupying exactly the same cubic-yard volume can require different tonnages.
          </p>
          <p>
            For example, if a calculated order volume were 8.40 yd³ and the selected density were 1.42 tons/yd³:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            8.40 × 1.42 ≈ 11.93 tons
          </div>
          <p>
            The density is therefore a critical input.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-1">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              Do not treat gravel density as a universal constant
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              The actual weight of a cubic yard can vary with material type, gradation, moisture, packing, and the basis on which the supplier reports density. The calculator therefore uses a defined material reference value for each aggregate option rather than assuming one density for every gravel product.
            </p>
          </div>
          <p>
            For a commercial order, the supplier&apos;s current product specification or quoted bulk density should take precedence when available.
          </p>
          <p>
            Construction aggregates are widely used for road base, construction, and other infrastructure applications, but material requirements are application-specific.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Gravel Calculator for Driveways
          </h2>
          <p>
            A gravel driveway usually involves more than simply measuring the visible surface.
          </p>
          <p>
            A complete estimate should consider:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>the driveway footprint</li>
            <li>the depth of the aggregate layer</li>
            <li>the aggregate type</li>
            <li>compaction or settling</li>
            <li>waste</li>
            <li>traffic and subgrade conditions</li>
            <li>delivery constraints</li>
          </ul>
          <p>
            For a simple rectangular driveway:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            A = L × W
          </div>
          <p>
            Then:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            V = A × D  and  V_yd³ = V_ft³ / 27
          </div>
          <p>
            After the selected quantity adjustments, the calculator converts the result to tons and other purchasing units.
          </p>
          <p>
            The calculator can be particularly useful when comparing alternative materials such as crushed stone, road-base aggregate, pea gravel, or other selected products. For concrete pads, slabs, footings or related concrete quantities, use the{" "}
            <Link href="/calculators/concrete-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Concrete Calculator
            </Link>
            .
          </p>
          <p>
            However, the calculator does not determine the correct structural pavement section for every driveway. A driveway carrying passenger cars, delivery vehicles, RVs, or heavy trucks can require different design considerations.
          </p>
          <p>
            The Federal Highway Administration&apos;s gravel-road guidance, for example, discusses gravel thickness in relation to subgrade condition, rainfall, traffic-related effects and maintenance requirements rather than relying on one universal thickness.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Gravel for Patios, Walkways and Landscaping
          </h2>
          <p>
            For a patio or walkway, the geometric calculation is the same:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            Volume = Area × Depth
          </div>
          <p>
            The practical difference is usually the intended material and installation method. Decorative aggregate may be selected for appearance, while angular crushed aggregate may be selected where interlock and stability are more important.
          </p>
          <p>
            The calculator supports rectangular areas, circular areas, triangular areas, different aggregate selections, project quantities, waste allowances, and cost estimation. For a broader site-area estimate, use the{" "}
            <Link href="/calculators/square-footage-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Square Footage Calculator
            </Link>
            .
          </p>
          <p>
            For a circular project, first calculate area using:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            A = π × r²   or   A = (π × d²) / 4
          </div>
          <p>
            For a triangle with a known base and height:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            A = 0.5 × b × h
          </div>
          <p>
            Once area is known, the same volume and material-conversion process applies.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Circle Gravel Calculation
          </h2>
          <p>
            Suppose a circular patio has a diameter of 30 ft.
          </p>
          <p>
            The radius is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            r = 30 / 2 = 15 ft
          </div>
          <p>
            Area:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            A = π × (15)² ≈ 706.86 ft²
          </div>
          <p>
            If the gravel depth is 4 inches:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            D = 4 / 12 = 0.333333 ft
          </div>
          <p>
            Raw volume:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            706.86 × 0.333333 ≈ 235.62 ft³
          </div>
          <p>
            Cubic yards:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            235.62 / 27 ≈ 8.73 yd³
          </div>
          <p>
            The final order quantity can then be increased according to the selected compaction and waste allowances and converted to weight using the selected material density.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Triangle Gravel Calculation
          </h2>
          <p>
            For a triangular landscaping zone:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            A = 0.5 × b × h
          </div>
          <p>
            For example: base = 30 ft, height = 20 ft.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            A = 0.5 × 30 × 20 = 300 ft²
          </div>
          <p>
            At a depth of 4 inches:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            V = 300 × (4 / 12) = 100 ft³
          </div>
          <p>
            and:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            V_yd³ = 100 / 27 ≈ 3.70 yd³
          </div>
          <p>
            The same material-density conversion can then be applied to estimate tons. This is useful for wedge-shaped landscaping areas, triangular garden beds, drainage areas, and other non-rectangular sections.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Multi-Zone Gravel Projects
          </h2>
          <p>
            Many real projects are not one simple rectangle. A property may contain:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>a main driveway</li>
            <li>a separate driveway base</li>
            <li>a side path</li>
            <li>a garden walkway</li>
            <li>a parking pad</li>
            <li>a drainage strip</li>
            <li>several landscaping sections</li>
          </ul>
          <p>
            The Multi-Zone Project Master Aggregator lets each section be entered independently and then combines the project into a consolidated order.
          </p>
          <p>
            This is preferable to treating the entire site as one rectangle because each zone can have different dimensions, aggregate types, quantities, and application requirements.
          </p>
          <p>
            The general workflow is:
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Step 1 — Create each zone: </span>
              Enter the zone name and geometry.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Step 2 — Select the aggregate: </span>
              Different zones can use different products.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Step 3 — Calculate each zone: </span>
              Each zone receives its own quantity calculation.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Step 4 — Consolidate: </span>
              The calculator combines the project into overall volume, weight, and order information.
            </div>
          </div>
          <p>
            This can make a multi-area estimate easier to review before requesting a quarry or supplier quote.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            11. How to Convert Tons of Gravel to 50-lb Bags
          </h2>
          <p>
            The bag equivalent is useful for smaller projects.
          </p>
          <p>
            One short ton contains 2,000 lb. For 50-lb bags:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            Bags = ⌈ Weight (lb) / 50 ⌉
          </div>
          <p>
            For example, 5.96 short tons is approximately:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            5.96 × 2,000 = 11,920 lb
          </div>
          <p>
            Then:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            11,920 / 50 = 238.4
          </div>
          <p>
            Because partial bags cannot be ordered as a complete bag, the calculator rounds this requirement upward to 239 bags.
          </p>
          <p>
            The bag figure is therefore an equivalent purchasing estimate, not necessarily the way a quarry would sell bulk aggregate.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Gravel Truckload Estimates
          </h2>
          <p>
            Bulk gravel is commonly delivered in truckloads rather than individual bags. The calculator includes a truck-load estimate based on its configured load capacity.
          </p>
          <p>
            For a 10-ton capacity assumption:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            Loads = ⌈ Total Tons / 10 ⌉
          </div>
          <p>
            For example:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            5.96 / 10 = 0.596  →  1 truckload
          </div>
          <p>
            At:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            20.4 / 10 = 2.04  →  3 truckloads
          </div>
          <p>
            Actual hauling is subject to the supplier&apos;s truck capacity, legal weight limits, loading practices, road access, and delivery conditions. The calculator&apos;s load value should therefore be treated as an estimating quantity, not a transportation contract.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            13. French Drain Gravel Calculator
          </h2>
          <p>
            A French drain is different from a simple gravel surface.
          </p>
          <p>
            A typical French drain consists of a trench, drainage aggregate, and usually a perforated pipe surrounded by gravel, with filter fabric used to reduce migration of soil into the drainage media. Government and university guidance describes French drains in broadly this way and emphasizes site-specific design and proper discharge.
          </p>
          <p>
            The Gravel Calculator&apos;s French-drain module estimates:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>trench geometry</li>
            <li>pipe displacement</li>
            <li>net gravel volume</li>
            <li>gravel weight</li>
            <li>bag equivalent</li>
            <li>geotextile fabric area</li>
          </ul>
          <p>
            The gross trench volume can be approximated from:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            V_gross = L × W × D
          </div>
          <p>
            When a cylindrical pipe occupies part of the trench:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            V_pipe = π × (d / 2)² × L
          </div>
          <p>
            Then:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            V_net = V_gross − V_pipe
          </div>
          <p>
            The key reason for subtracting pipe volume is simple: the pipe occupies space that cannot simultaneously be filled with gravel.
          </p>
          <p>
            When No Pipe is selected, pipe displacement is zero:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            V_pipe = 0
          </div>
          <p>
            The calculator therefore treats the result as a gravel-filled drainage/swale configuration rather than inventing a pipe volume.
          </p>
          <p>
            A French drain should still be designed for actual site drainage conditions. The discharge point, trench slope, soil, groundwater, rainfall, pipe configuration and fabric requirements can all matter.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Geotextile Fabric for Drainage Applications
          </h2>
          <p>
            Filter fabric is often used around drainage trenches to help prevent surrounding soil from migrating into the gravel-filled system.
          </p>
          <p>
            The calculator estimates fabric area from the trench dimensions according to its configured model. That quantity should be treated as a takeoff estimate rather than a universal installation specification.
          </p>
          <p>
            Actual fabric width and overlap can depend on:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>trench dimensions</li>
            <li>installation method</li>
            <li>fabric product</li>
            <li>soil conditions</li>
            <li>whether the fabric wraps the entire gravel section</li>
            <li>manufacturer recommendations</li>
          </ul>
          <p>
            The WSU Extension drainage guidance, for example, describes lining a French-drain trench with geotextile fabric and wrapping the gravel before covering the system.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Gravel Depth: Why There Is No Universal Number
          </h2>
          <p>
            One of the most common gravel-estimating mistakes is assuming that every project should use the same thickness.
          </p>
          <p>
            A decorative garden path, residential driveway, drainage trench, road base, and heavy-duty access road do not necessarily have the same structural requirements.
          </p>
          <p>
            Depth depends on factors such as:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>intended use</li>
            <li>traffic</li>
            <li>subgrade strength</li>
            <li>drainage</li>
            <li>aggregate type</li>
            <li>whether a separate base layer is used</li>
            <li>climate and site conditions</li>
            <li>local specifications</li>
          </ul>
          <p>
            For that reason, the calculator intentionally asks the user to supply the intended material depth instead of declaring one universal depth to be correct.
          </p>
          <p>
            The Federal Highway Administration&apos;s gravel-road guidance illustrates this principle: required gravel structure can depend on subgrade condition, rainfall and other site factors.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Why Aggregate Type Matters
          </h2>
          <p>
            &ldquo;Gravel&rdquo; is not one single product. A project may use:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>crushed stone</li>
            <li>road-base aggregate</li>
            <li>pea gravel</li>
            <li>river rock</li>
            <li>decomposed granite</li>
            <li>other locally specified aggregate products</li>
          </ul>
          <p>
            The physical characteristics can differ substantially.
          </p>
          <p>
            Angular crushed material can behave differently from rounded stone. A product containing fines can compact differently from clean washed stone. Decorative river rock may be appropriate for appearance but not for the same structural role as a graded base aggregate.
          </p>
          <p>
            USGS describes crushed stone and construction sand and gravel as major construction aggregates with applications including roads, buildings and infrastructure.
          </p>
          <p>
            The calculator therefore lets the user select the aggregate type instead of applying a generic &ldquo;gravel weighs X tons per cubic yard&rdquo; assumption.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Gravel Cost Calculator: Material, Delivery, Labor and Tax
          </h2>
          <p>
            The material quantity is only one part of project budgeting.
          </p>
          <p>
            The cost estimator can combine:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            Material Cost = Tons × Price per Ton
          </div>
          <p>
            Then additional components may include delivery, spreading or grading labor, and sales tax:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            Pre-Tax Total = Material + Delivery + Labor
          </div>
          <p>
            and:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            Tax = Taxable Amount × (Tax Rate / 100)
          </div>
          <p>
            The calculator then produces an estimated total project investment.
          </p>
          <p>
            This is useful for comparing scenarios, but it should not be mistaken for a contractor quote. Quarry pricing, trucking, fuel, access, minimum-load fees, labor rates, taxes and regional market conditions can all change the actual price.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Worked Example: 600 Square Feet of Gravel
          </h2>
          <p>
            Consider a 50 ft × 12 ft rectangular area with:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>depth = 4 inches</li>
            <li>8% compaction allowance</li>
            <li>5% waste allowance</li>
            <li>aggregate density = 1.42 tons/yd³</li>
          </ul>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Area: </span>
              50 × 12 = 600 ft²
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Raw volume: </span>
              600 × (4 / 12) = 200 ft³
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Raw cubic yards: </span>
              200 / 27 ≈ 7.41 yd³
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Compaction and waste: </span>
              7.41 × 1.08 × 1.05 ≈ 8.40 yd³
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Weight: </span>
              8.40 × 1.42 ≈ 11.93 tons
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Material price example: </span>
              At $45 per ton, using the unrounded internal tonnage: 11.928 × 45 ≈ $536.76
            </div>
          </div>
          <p>
            The displayed tonnage may be rounded to 11.93 tons, but downstream cost calculations should use the underlying unrounded value when precision matters.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            19. How to Use the Gravel Calculator
          </h2>
          <p>
            For a straightforward rectangular project:
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Enter the dimensions: </span>
              Measure the length and width of the area.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Enter the layer depth: </span>
              Use the intended installed gravel depth.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Choose the units: </span>
              The calculator handles supported feet, inches, yards and metric dimensions.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Select the aggregate: </span>
              Choose the material closest to the product being purchased.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Set compaction and waste: </span>
              Use appropriate project assumptions rather than blindly copying percentages from another job.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Enter quantity: </span>
              Use the quantity field when several identical areas are being estimated.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Calculate: </span>
              Review area, volume, weight, bags, truckloads and cost.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Check the assumptions: </span>
              Compare the material density and pricing basis with the current supplier information.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Save or export: </span>
              Use the Save, Restore, Copy, CSV, TXT and report functions when you need a repeatable project record.
            </div>
          </div>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            20. How Much Gravel Should You Order?
          </h2>
          <p>
            The most useful number is not always the raw geometric volume.
          </p>
          <p>
            A practical order estimate is based on:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
            Order Quantity = Geometric Requirement + Project Allowances
          </div>
          <p>
            Those allowances may include settling, waste, irregular edges, handling losses, or other project-specific factors.
          </p>
          <p>
            For bulk purchasing, a small difference between the calculated and delivered amount can also arise from supplier loading, truck capacity, moisture and the basis used for material weight.
          </p>
          <p>
            For this reason, treat the calculator as a planning and estimating tool, then compare the final quantity with the supplier&apos;s ordering increments and recommendations.
          </p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            21. Common Gravel Estimating Mistakes
          </h2>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Mixing inches and feet: </span>
              A depth of 4 inches is not 4 feet. Always convert: 4 in = 4 / 12 ft.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Forgetting the cubic-yard conversion: </span>
              If your volume is in cubic feet, divide by 27: yd³ = ft³ / 27.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Using one density for every material: </span>
              Different aggregate products have different density assumptions ranging from 1.35 to 1.65 tons/yd³.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Applying waste twice: </span>
              Once an allowance has been incorporated in the tool, do not manually add the same percentage again.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Ignoring compaction: </span>
              A loose-volume estimate will understate the material required for the compacted, installed condition.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Using truck capacity as an exact delivery guarantee: </span>
              The calculator&apos;s truckload quantity is an estimating value. Actual hauling limits belong to the supplier.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-slate-100">Using a decorative aggregate as a structural base without checking suitability: </span>
              Appearance and structural performance are not interchangeable design criteria.
            </div>
          </div>
        </section>

        {/* Section 22 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            22. When a Gravel Estimate Should Be Verified
          </h2>
          <p>
            The calculator is useful for planning, purchasing and comparison, but certain projects deserve an additional technical review.
          </p>
          <p>
            Verify the estimate when:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>the area carries heavy traffic</li>
            <li>the site has weak or wet subgrade</li>
            <li>drainage is a major concern</li>
            <li>the project is unusually large</li>
            <li>retaining or structural elements are involved</li>
            <li>local specifications govern the installation</li>
            <li>runoff could affect neighboring property</li>
            <li>the material is being used as a structural road base</li>
            <li>the project connects to regulated drainage infrastructure</li>
          </ul>
          <p>
            The goal is not simply to order enough stone. The goal is to select an appropriate material and build-up for the actual application.
          </p>
        </section>

        {/* Section 23 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            23. Gravel Calculator Limitations and Engineering Disclaimer
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Calculation Scope &amp; Density Basis
              </div>
              <p>
                This calculator provides mathematical quantities and estimating assistance. It does not replace project-specific engineering, geotechnical evaluation, surveying, drainage design, contractor judgment, or the specifications issued by the applicable authority or material supplier.
              </p>
              <p>
                Material density values are estimating assumptions associated with the selected calculator material. Actual delivered weight per unit volume can differ depending on quarry moisture, grading, and settling.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Drainage &amp; Structural Disclaimer
              </div>
              <p>
                For drainage projects, the calculator does not by itself establish an adequate outlet, slope, infiltration capacity, erosion-control design, or regulatory compliance. French-drain guidance from public agencies emphasizes site-specific planning, appropriate discharge and maintenance. For road and driveway work, thickness and aggregate requirements should be selected for the actual traffic and subgrade conditions rather than from a generic internet rule.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ SECTION (Exactly 12 Approved FAQs, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions About Gravel Calculations
          </h2>
        </div>

        <div className="space-y-3">
          {gravel_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-800/60 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/30 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* RELATED CALCULATORS — AFTER CONTENT */}
      <div className="pt-6 not-prose">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
            RELATED CALCULATORS:
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium">
            <Link
              href="/calculators/square-footage-calculator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-2xs"
            >
              Square Footage Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Link
              href="/calculators/concrete-calculator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-2xs"
            >
              Concrete Calculator
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default GravelContent;
