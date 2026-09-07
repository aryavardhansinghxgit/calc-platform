"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ShieldCheck, Layers, Calculator } from "lucide-react";
import { stair_calculatorFaqs } from "@/app/calculators/stair-calculator/faq";

export function StairContent() {
  // All 12 FAQs open by default (unfolded, executive 401(k) style)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: stair_calculatorFaqs.length }, (_, i) => i))
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
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 not-prose no-print">
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

      {/* ── 1. MAIN EDUCATIONAL CONTENT (19 COMPLETE SECTIONS) ── */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 pt-6">

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Stair Calculator: Riser, Tread, Run, Stringer &amp; Headroom
          </h2>
          <p>
            A staircase looks simple, but its layout depends on several dimensions that must work together. The total vertical rise determines how many risers are needed, the tread depth determines how much horizontal space the staircase consumes, and those two dimensions establish the staircase angle and stringer length.
          </p>
          <p>
            This Stair Calculator is designed to connect those quantities instead of treating them as isolated measurements. Enter the total rise and a target riser height to determine a practical riser count and exact riser height, or use a fixed number of steps when the design requires a specific step count. You can then calculate tread count, total horizontal run, stair angle, stringer length, and related carpentry dimensions.
          </p>
          <p>
            The calculator also includes a headroom and stair-opening calculation, material and lumber cost estimation, fraction-friendly dimension input, visual stair diagrams, saved calculations, and downloadable reports.
          </p>
          <p>
            For construction work, the calculator should be treated as a planning and estimating tool rather than a substitute for a site measurement, structural design, permit review, or the building code adopted by the local authority having jurisdiction.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            2. The Basic Anatomy of a Staircase
          </h2>
          <p>
            Several terms are used repeatedly in stair layout:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-slate-200 dark:border-slate-700 not-prose">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
                <tr>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Term</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="p-2 font-semibold text-blue-600 dark:text-blue-400">Total rise</td>
                  <td className="p-2">The complete vertical distance from the lower finished floor or landing to the upper floor or landing.</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-blue-600 dark:text-blue-400">Riser</td>
                  <td className="p-2">The vertical height of one step.</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-blue-600 dark:text-blue-400">Tread</td>
                  <td className="p-2">The horizontal walking surface of one step.</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-blue-600 dark:text-blue-400">Run</td>
                  <td className="p-2">The horizontal depth associated with one tread.</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-blue-600 dark:text-blue-400">Total run</td>
                  <td className="p-2">The horizontal distance occupied by the staircase flight.</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-blue-600 dark:text-blue-400">Stringer</td>
                  <td className="p-2">The inclined structural member that supports the treads and risers.</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-blue-600 dark:text-blue-400">Nosing</td>
                  <td className="p-2">The front projection of a tread beyond the riser below.</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-blue-600 dark:text-blue-400">Headroom</td>
                  <td className="p-2">The vertical clearance available above the stair walking line.</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-blue-600 dark:text-blue-400">Incline angle</td>
                  <td className="p-2">The angle of the stair flight relative to the horizontal.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The distinction between riser count and tread count matters. In the common straight-flight arrangement where the upper floor acts as the final landing, there is typically one fewer tread than risers. The calculator therefore treats tread count according to the selected mounting/drop configuration rather than assuming every riser automatically creates another separate tread.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How to Calculate Stair Riser Height
          </h2>
          <p>
            The first major decision is the number of risers.
          </p>
          <p>
            When the user provides a target maximum or target design riser height, the safe mathematical approach is to calculate:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            N_risers = ceil(H / R_target)
          </div>
          <p>
            where:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li><strong>H</strong> = total vertical rise</li>
            <li><strong>R_target</strong> = target riser height</li>
            <li><strong>N_risers</strong> = calculated integer number of risers</li>
          </ul>
          <p>
            The ceiling operation is important. Suppose the total rise is 108 inches and the target riser is 7.5 inches:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            108 ÷ 7.5 = 14.4
          </div>
          <p>
            A staircase cannot use 14.4 risers, so the count must be rounded up to:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            N_risers = ceil(14.4) = 15 risers
          </div>
          <p>
            The exact riser then becomes:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            R = 108 ÷ 15 = 7.20 in (7 3/16 in)
          </div>
          <p>
            This is fundamentally different from rounding 14.4 down to 14, which would produce:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            108 ÷ 14 = 7.714 in
          </div>
          <p>
            That increases the actual riser above the 7.5-inch target. The calculator therefore separates the target riser from the final exact riser. The target helps determine the count; the exact riser is calculated from the actual total rise and final integer count.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            4. How to Calculate Treads and Total Stair Run
          </h2>
          <p>
            Once the riser count is known, tread count depends on how the stair terminates at the top.
          </p>
          <p>
            For the common standard-drop configuration:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            N_treads = N_risers - 1
          </div>
          <p>
            If there are 15 risers:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            15 - 1 = 14 treads
          </div>
          <p>
            With a 10-inch tread/run:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            Total Run = 14 × 10 = 140 in (11 ft 8 in)
          </div>
          <p>
            This is one of the most useful results for planning a stair opening because a staircase needs both vertical space and horizontal space. Increasing tread depth makes the staircase more comfortable in many situations, but it also increases the total run. Conversely, reducing tread depth decreases the footprint but can make the stair steeper and may conflict with applicable code requirements.
          </p>
          <p>
            The calculator&apos;s Use One Run and Use Total Run modes allow the same geometry to be approached from different design inputs.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Stair Angle, Stringer Length and the Pythagorean Relationship
          </h2>
          <p>
            Once total rise and total run are known, the staircase angle can be calculated using:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            θ = arctan(H / Total Run)
          </div>
          <p>
            For the 108-inch rise and 140-inch run example:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            θ = arctan(108 / 140) ≈ 37.62°
          </div>
          <p>
            The geometric length of the inclined stair line is found with the Pythagorean theorem:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            L = √(H² + Total Run²)
          </div>
          <p>
            Therefore:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            L = √(108² + 140²) = √(11,664 + 19,600) = √31,264 ≈ 176.82 in (14.74 ft)
          </div>
          <p>
            This relationship is useful because it provides an independent geometric check. If the calculated stringer length does not agree with the rise/run triangle, something is wrong with the underlying dimensions or unit conversion. The calculator therefore treats the staircase as a geometric system rather than simply producing a step count.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Stair Stringer Layout and Carpentry Dimensions
          </h2>
          <p>
            A stringer is cut to follow the repeating rise-and-run geometry of the staircase. For a conventional straight stair, each repeated step is defined by:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>a vertical rise cut</li>
            <li>a horizontal run cut</li>
            <li>a consistent relationship between adjacent steps</li>
          </ul>
          <p>
            The calculator also distinguishes between tread/nosing configurations and mounting approaches so that the resulting cut information is not treated as generic text.
          </p>
          <p>
            For example, changing the tread thickness affects the bottom cut or other carpentry compensation depending on the selected construction method. Without trimming the bottom stringer foot by the tread thickness (e.g., 1.0 in), adding a 1.0 in tread would make the bottom step 1.0 in too tall, while the top step would be 1.0 in too short. Likewise, a standard-drop top condition and a flush-top mounting approach do not use identical tread-count assumptions.
          </p>
          <p>
            The result is best thought of as a layout aid. Actual stringer fabrication still requires the builder to account for finished floor thickness, finish materials, framing, tread construction, landing geometry, and how the stringer is fastened. Never fabricate a structural stair stringer solely from a calculator without confirming the actual site dimensions and construction details.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Fractions Matter in Real Stair Construction
          </h2>
          <p>
            Construction dimensions are often written as fractions rather than decimals:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>7.5 inches = 7 1/2 inches</li>
            <li>10.25 inches = 10 1/4 inches</li>
            <li>0.75 inches = 3/4 inch</li>
            <li>7.1875 inches = 7 3/16 inches</li>
          </ul>
          <p>
            The calculator supports decimal, fraction, and mixed-number dimension entry so a carpenter can work with familiar tape-measure notation without first converting every value manually:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            7 1/2 = 7.500 in  |  7 3/16 = 7.1875 in
          </div>
          <p>
            The result retains full floating-point precision internally while providing practical fractional representations rounded to the nearest 1/16 inch for field layout. This is especially useful when a computed exact riser is something such as 7.3846 inches: the decimal result can be used for mathematical verification, while a practical fractional representation helps with framing.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            8. How Headroom and Stair Openings Work
          </h2>
          <p>
            Headroom is not determined simply by ceiling height. A stair passes beneath a floor opening, and the available clearance depends on:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>total rise</li>
            <li>total run</li>
            <li>stair angle</li>
            <li>tread/nosing position</li>
            <li>floor or joist thickness</li>
            <li>stairwell opening length</li>
            <li>the point at which the stair intersects the overhead ceiling header</li>
          </ul>
          <p>
            The headroom calculation therefore evaluates the actual geometric intersection between the sloping stair plane and the opening rather than assuming a single fixed distance.
          </p>
          <p>
            For a reference residential-code calculation, the 2021 IRC states a minimum stair headroom of 6 feet 8 inches (80 inches / 2032 mm), measured vertically from the sloped line adjoining the tread nosing or from the landing surface in the applicable portion of the stairway. The 2024 IBC likewise specifies 80 inches of stair headroom in its applicable stair provisions.
          </p>
          <p>
            Because these rules are code- and occupancy-specific, the calculator&apos;s result should be interpreted as a reference check, not automatic legal approval.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Stair Riser and Tread Code References
          </h2>
          <p>
            One reason stair calculators need careful labeling is that different code families establish different dimensional requirements:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>
              <strong>2021 International Residential Code (IRC):</strong> Specifies a maximum riser height of 7¾ inches (197 mm), a minimum rectangular tread depth of 10 inches (254 mm), and a maximum variation of 3/8 inch (9.5 mm) between the greatest and smallest riser within a flight.
            </li>
            <li>
              <strong>2024 International Building Code (IBC):</strong> Section 1011.5.2 specifies risers between 4 inches minimum and 7 inches maximum (178 mm), and rectangular tread depth of at least 11 inches (279 mm) for applicable commercial stairs.
            </li>
            <li>
              <strong>OSHA 29 CFR 1910.25:</strong> Standard workplace stairs must have an angle between 30° and 50° from horizontal, a maximum riser of 9.5 inches, and a minimum tread depth of 9.5 inches.
            </li>
          </ul>
          <p>
            This is why the calculator uses the wording: <em>Model Code Reference Check — verify with your local adopted code.</em> A state, province, municipality, occupancy type, existing-building condition, or local amendment may change the governing requirements.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Stair Angle: What the Number Actually Tells You
          </h2>
          <p>
            The staircase angle summarizes the relationship between rise and run:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li><strong>Steeper stair:</strong> more vertical rise per unit of horizontal travel, shorter floor footprint, larger incline angle.</li>
            <li><strong>Shallower stair:</strong> more horizontal travel, smaller incline angle, larger floor footprint.</li>
          </ul>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            tan(θ) = Rise / Run  →  θ = arctan(Rise / Run)
          </div>
          <p>
            For example, a 7.5-inch rise with a 10-inch run gives:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            θ = arctan(7.5 / 10) ≈ 36.87°
          </div>
          <p>
            The angle should not be used by itself to decide whether a stair is acceptable. Riser height, tread depth, headroom, stairway width, landings, handrails, guards, and governing code provisions all matter.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Blondel&apos;s Formula and Stair Comfort
          </h2>
          <p>
            A commonly discussed ergonomic relationship published in 1675 by French architect François Blondel connects riser height (R) and tread depth (T):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            2R + T = 24 to 25 inches (61 to 64 cm)
          </div>
          <p>
            For a 7.5-inch riser and a 10-inch tread:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            2(7.5) + 10 = 25.0 in (Ideal ergonomic comfort)
          </div>
          <p>
            This relationship is useful as a stair-design heuristic because it connects the vertical and horizontal dimensions of a step with human stride length. However, it should not be confused with a universal statutory building-code rule. The practical objective is consistency: a flight with uniform risers and treads generally provides a more predictable walking rhythm than one with noticeable variation.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            12. A Complete Worked Stair Example
          </h2>
          <p>
            Consider a staircase with:
          </p>
          <ul className="list-disc list-inside space-y-0.5 pl-1 font-mono text-xs">
            <li>Total rise = 108 inches (9 ft)</li>
            <li>Target riser = 7.5 inches</li>
            <li>Unit run = 10 inches</li>
          </ul>
          
          <div className="space-y-2 font-mono text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700/60">
              <strong>Step 1: Determine riser count</strong><br />
              N = ceil(108 / 7.5) = ceil(14.4) = 15 risers
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700/60">
              <strong>Step 2: Determine exact riser height</strong><br />
              R = 108 / 15 = 7.20 in ≈ 7 3/16 in (meets IRC max 7.75 in)
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700/60">
              <strong>Step 3: Determine tread count (Standard drop)</strong><br />
              T_count = 15 - 1 = 14 treads
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700/60">
              <strong>Step 4: Determine total run</strong><br />
              Total Run = 14 × 10 = 140 in = 11 ft 8 in
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700/60">
              <strong>Step 5: Determine staircase angle</strong><br />
              θ = arctan(108 / 140) = arctan(0.7714) ≈ 37.62°
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700/60">
              <strong>Step 6: Determine geometric stringer length</strong><br />
              L = √(108² + 140²) = √(11,664 + 19,600) = √31,264 ≈ 176.82 in (14.74 ft)
            </div>
          </div>

          <div className="overflow-x-auto pt-1">
            <table className="w-full text-left text-xs border-collapse border border-slate-200 dark:border-slate-700 not-prose">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
                <tr>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Measurement</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="p-2 font-semibold">Total rise</td>
                  <td className="p-2">108 in</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Number of risers</td>
                  <td className="p-2">15</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Exact riser</td>
                  <td className="p-2">7.20 in</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Number of treads</td>
                  <td className="p-2">14</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Tread/run</td>
                  <td className="p-2">10.00 in</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Total run</td>
                  <td className="p-2">140 in</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Stair angle</td>
                  <td className="p-2">37.62°</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Geometric stringer length</td>
                  <td className="p-2">176.82 in (14.74 ft)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            This illustrates why the staircase should be solved as one connected geometry problem. A change in riser count changes the exact riser height, tread count, total run, angle, and stringer length together.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            13. How the Stair Calculator Helps With Material Planning
          </h2>
          <p>
            After the staircase geometry is established, the material estimator translates the design into approximate quantities and costs. Depending on the selected configuration, the estimator accounts for stringer boards, tread boards, riser boards, brackets and fasteners, handrails or extras, material pricing, and sales tax.
          </p>
          <p>
            For example, a reference estimate might contain:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            3 stringers × $35 = $105<br />
            15 treads × $24 = $360<br />
            16 risers × $14 = $224<br />
            Hardware &amp; fasteners = $45<br />
            Materials subtotal = $734<br />
            Sales tax (7%) = $51.38<br />
            Total estimated project cost = $785.38
          </div>
          <p>
            These are estimating values, not contractor quotations. Lumber species, board dimensions, grade, regional pricing, waste, fasteners, finish materials, labor, delivery, and structural requirements can change the actual project cost.
          </p>
          <p>
            When estimating the surrounding floor or landing area, you can also use our{" "}
            <Link
              href="/calculators/square-footage-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Square Footage Calculator
            </Link>
            . For concrete stairs, pads, or related site work, the{" "}
            <Link
              href="/calculators/concrete-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Concrete Calculator
            </Link>{" "}
            can help estimate concrete volume.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Stair Headroom, Openings and Existing Floors
          </h2>
          <p>
            For an existing building, the stair calculation becomes more complicated because the finished floor and structure may already be fixed. An opening that looks adequate in plan view may still produce insufficient headroom once the stair slope is considered.
          </p>
          <p>
            The headroom workflow should therefore be used to test combinations of stair rise, stair run, opening length, floor thickness, and target clearance. The recommended workflow is iterative:
          </p>
          <ol className="list-decimal list-inside space-y-1 pl-1">
            <li>Establish the floor-to-floor rise.</li>
            <li>Select a reasonable target riser.</li>
            <li>Calculate the number of risers.</li>
            <li>Determine the exact riser.</li>
            <li>Select a workable tread/run.</li>
            <li>Calculate total run and angle.</li>
            <li>Test the opening.</li>
            <li>Check headroom.</li>
            <li>Recheck all dimensional constraints after any change.</li>
          </ol>
          <p>
            This is much safer than choosing a stair angle first and attempting to force the remaining dimensions into the available opening.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Stairs vs. Ramps: Do Not Mix the Two
          </h2>
          <p>
            The calculator includes a 1:12 ramp reference preset, but ramps and stairs are not interchangeable design categories.
          </p>
          <p>
            The U.S. Access Board&apos;s ADA Standards specify that ramp runs on accessible routes generally have a running slope no steeper than 1:12, with a 1:48 maximum cross slope and a maximum rise of 30 inches per run under the cited provisions. A 1:12 slope means 1 unit of vertical rise for every 12 units of horizontal run:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            Slope = Rise / Run = 1 / 12 ≈ 8.33% (4.76°)
          </div>
          <p>
            That does not make a 1:12 slope a stair requirement. It is a ramp/accessibility reference. The calculator therefore labels the preset as a ramp reference, not a stair-code recommendation.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Why Uniformity Matters
          </h2>
          <p>
            A staircase can satisfy a nominal average dimension while still being uncomfortable or unsafe if individual steps vary. For this reason, stair rules control variation between risers and treads in addition to setting minimums or maximums.
          </p>
          <p>
            For example, the 2021 IRC limits the difference between the greatest and smallest riser height within a flight to 3/8 inch. This highlights an important construction principle: do not lay out every step independently from rounded measurements. Instead:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Calculate the exact total rise.</li>
            <li>Determine the final integer riser count.</li>
            <li>Calculate the exact riser from that count.</li>
            <li>Transfer the same layout dimension consistently through the flight.</li>
          </ul>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            17. When to Recalculate a Staircase
          </h2>
          <p>
            Recalculate the entire flight whenever one of the major dimensions changes. You should not change only one displayed result manually. For example, increasing the target riser can change riser count, exact riser, tread count, total run, angle, stringer length, headroom intersection, and material quantities.
          </p>
          <p>
            Likewise, changing the unit run can alter total run, incline angle, stringer length, available headroom, and opening requirements. This is why the calculator continuously links the geometry rather than presenting isolated formulas.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Practical Workflow for Designing a Straight Stair
          </h2>
          <ol className="list-decimal list-inside space-y-1 pl-1">
            <li><strong>Start with the actual floor-to-floor rise:</strong> Measure the complete vertical distance rather than estimating from nominal floor heights.</li>
            <li><strong>Select a target riser:</strong> Choose a target that makes sense for the intended building type and verify it against the applicable code.</li>
            <li><strong>Calculate the riser count:</strong> Use <code>N = ceil(H / R_target)</code>.</li>
            <li><strong>Calculate the exact riser:</strong> Use <code>R = H / N</code>.</li>
            <li><strong>Select the tread/run:</strong> Evaluate total run and available floor space.</li>
            <li><strong>Check angle and stringer:</strong> Use <code>θ = arctan(H / Run)</code> and <code>L = √(H² + Run²)</code>.</li>
            <li><strong>Check headroom:</strong> Verify the actual stair opening geometry.</li>
            <li><strong>Check code references:</strong> Determine which code applies to the project rather than assuming one generic rule.</li>
            <li><strong>Calculate materials and cost:</strong> Only after the geometry is settled should you estimate lumber, hardware, labor, and other project costs.</li>
          </ol>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Important Construction Disclaimer
          </h2>
          <p>
            This Stair Calculator provides mathematical geometry, planning calculations, reference checks, and estimating assistance. It does not replace an architect, structural engineer, licensed contractor, building official, accessibility professional, or the requirements of the authority having jurisdiction.
          </p>
          <p>
            Code requirements vary by jurisdiction, adopted code edition, occupancy, residential vs. commercial use, new construction vs. existing work, local amendments, special stair configurations, and accessibility requirements. Use the calculator&apos;s code output as a model-code reference check, then verify the final design with the locally adopted requirements before construction.
          </p>
        </section>

      </div>

      {/* ── 2. FREQUENTLY ASKED QUESTIONS (12 ACCORDION ITEMS, OPEN BY DEFAULT) ── */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            Frequently Asked Questions About Stair Calculations
          </h2>
        </div>

        <div className="space-y-3 not-prose">
          {stair_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-50/50 dark:bg-slate-800/30"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{idx + 1}. {faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. RELATED CALCULATORS (AFTER CONTENT / FAQ BLOCK) ── */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 not-prose no-print">
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

    </article>
  );
}
