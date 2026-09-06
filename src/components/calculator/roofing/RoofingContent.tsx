"use client";

import React from "react";
import Link from "next/link";
import { Layers, ShieldCheck, CheckCircle2 } from "lucide-react";

export function RoofingContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* ── RELATED CALCULATORS (ABOVE CONTENT) ── */}
      <div className="no-print p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Related Calculators
          </span>
        </div>
        <div className="flex flex-wrap gap-2.5 pt-1">
          <Link
            href="/calculators/square-footage-calculator"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 shadow-xs transition-colors"
          >
            Square Footage Calculator
          </Link>
          <Link
            href="/calculators/concrete-calculator"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 shadow-xs transition-colors"
          >
            Concrete Calculator
          </Link>
        </div>
      </div>

      {/* ── MAIN EDUCATIONAL CONTENT BODY (16 COMPLETE SECTIONS) ── */}
      <div className="pt-8 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Roofing Area Calculator: What It Measures and Why Roof Area Is Different From House Footprint
          </h2>
          <p>
            A roofing calculator estimates the actual surface area of a roof rather than simply treating the building footprint as the amount of material required. The distinction matters because a sloped roof covers more surface than its horizontal projection.
          </p>
          <p>
            For a simple rectangular footprint, the starting point is the horizontal area:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Base Area = Length × Width
          </div>
          <p>
            A roof with pitch then requires a slope adjustment. For a conventional roof whose slope is expressed as rise per 12 inches of horizontal run, the pitch multiplier is:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Pitch Multiplier = √[1 + (Rise / 12)²]
          </div>
          <p>
            The pitch-adjusted roof surface area is then:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Roof Surface Area = Horizontal Roof Area × Pitch Multiplier
          </div>
          <p>
            For example, a 6/12 roof rises 6 inches for every 12 inches of horizontal run. Its slope multiplier is approximately 1.118, meaning the sloped roof surface is about 11.8% greater than the corresponding horizontal area before additional waste or geometry-specific adjustments.
          </p>
          <p>
            That difference is why using only the floor-plan dimensions can underestimate roofing material.
          </p>
          <p>
            This calculator separates these concepts so that you can work from either house dimensions or an already-known ground/base area. The latest production implementation specifically keeps Ground Base Area mode independent from eave and gable overhang inputs, preventing those measurements from being accidentally added twice.
          </p>
          <p>
            For more general floor, land, and room-area calculations, see the{" "}
            <Link
              href="/calculators/square-footage-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Square Footage Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Roof Pitch Explained: Rise, Run, Angle and the Surface-Area Multiplier
          </h2>
          <p>
            Roof pitch describes how much a roof rises vertically over a 12-inch horizontal run. A roof described as 6/12 rises 6 inches for each 12 inches of run.
          </p>
          <p>
            The calculator supports both pitch and roof-angle approaches.
          </p>
          <p>
            The relationship between pitch and slope angle is:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Angle = arctan(Rise / 12)
          </div>
          <p>
            For example:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
                <tr>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Roof pitch</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Approx. slope angle</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Surface multiplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                <tr>
                  <td className="p-2 font-semibold">1/12</td>
                  <td className="p-2">4.8°</td>
                  <td className="p-2">1.003</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">3/12</td>
                  <td className="p-2">14.0°</td>
                  <td className="p-2">1.031</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">4/12</td>
                  <td className="p-2">18.4°</td>
                  <td className="p-2">1.054</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">6/12</td>
                  <td className="p-2">26.6°</td>
                  <td className="p-2">1.118</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">8/12</td>
                  <td className="p-2">33.7°</td>
                  <td className="p-2">1.202</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">10/12</td>
                  <td className="p-2">39.8°</td>
                  <td className="p-2">1.302</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">12/12</td>
                  <td className="p-2">45.0°</td>
                  <td className="p-2">1.414</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            These values come directly from the geometric relationship between horizontal run and sloped roof length. The production audit verified the complete 1/12 through 12/12 matrix against the square-root and arctangent formulas.
          </p>
          <p>
            The practical consequence is important: as pitch increases, the roof surface becomes progressively larger relative to the horizontal footprint. A 12/12 roof has a slope multiplier of √2, or about 1.414.
          </p>
          <p>
            That is why a roofing estimate based only on a building&apos;s footprint may understate the actual roof surface.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How to Calculate Roof Square Footage
          </h2>
          <p>
            For a simple rectangular roof, calculate the horizontal area first:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Area = Length × Width
          </div>
          <p>
            Then account for slope:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Sloped Area = Horizontal Area × Pitch Multiplier
          </div>
          <p>
            For a uniformly pitched roof with a 6/12 slope:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Pitch Multiplier = √[1 + (6/12)²] ≈ 1.118
          </div>
          <p>
            Suppose the horizontal roof area is 2,000 ft².
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            True Roof Area ≈ 2,000 × 1.118034 = 2,236.07 ft²
          </div>
          <p>
            If a 10% material allowance is then applied:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Material Planning Area ≈ 2,236.07 × 1.10 = 2,459.67 ft²
          </div>
          <p>
            The calculator converts the resulting area into roofing squares automatically.
          </p>
          <p>
            This is especially useful when comparing a roof measurement obtained from a survey, plan, satellite measurement, or other source with a pitch-adjusted estimate.
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100 pt-2">
            A critical distinction: footprint versus roof surface
          </p>
          <p>
            A house that occupies 2,000 ft² on the ground does not necessarily have a 2,000 ft² roof surface. Pitch increases the sloping surface, and architectural features can change the geometry further.
          </p>
          <p>
            The calculator therefore provides separate workflows for:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 pl-2">
            <li>house length and width;</li>
            <li>known ground/base area;</li>
            <li>multiple roof planes;</li>
            <li>roof architecture;</li>
            <li>material quantities;</li>
            <li>cost estimation.</li>
          </ul>
          <p>
            That makes it more useful than a single multiplication-based roof-area calculator.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. What Is a Roofing Square?
          </h2>
          <p>
            A roofing square is a standard roofing measurement equal to 100 square feet of roof area. GAF and NRCA materials use the same 100-ft² definition.
          </p>
          <p>
            The conversion is:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Roofing Squares = Roof Area ÷ 100
          </div>
          <p>
            Examples:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
                <tr>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Roof area</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Roofing squares</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                <tr>
                  <td className="p-2 font-semibold">1,000 ft²</td>
                  <td className="p-2">10 squares</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">1,500 ft²</td>
                  <td className="p-2">15 squares</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">2,000 ft²</td>
                  <td className="p-2">20 squares</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">2,500 ft²</td>
                  <td className="p-2">25 squares</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">3,000 ft²</td>
                  <td className="p-2">30 squares</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Roofing squares simplify estimating because shingles, underlayment, labor and other roofing components are commonly discussed or priced using square-based quantities. GAF specifically notes that roofing squares are used to estimate material quantities and cost, while its current guidance also emphasizes that product packaging and bundle coverage can vary.
          </p>
          <p>
            A roofing square is therefore not the same thing as a bundle of shingles.
          </p>
          <p>
            A square describes area. A bundle describes packaging.
          </p>
          <p>
            The number of bundles required to cover one square depends on the specific shingle product. For many standard asphalt products, three bundles approximately cover one square, but the manufacturer&apos;s packaging and stated coverage should always be checked.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. How Many Shingles or Bundles Do You Need?
          </h2>
          <p>
            Once the required roofing squares are known, material quantities can be estimated from the manufacturer&apos;s coverage specification.
          </p>
          <p>
            A simplified relationship is:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Bundles Required = Roofing Squares × Bundles per Square
          </div>
          <p>
            For example, if a project requires 27.1 squares and the selected product is rated at three bundles per square:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            27.1 × 3 = 81.3 bundles
          </div>
          <p>
            Because shingles are purchased in whole packages, the purchasing quantity would normally be rounded according to the product&apos;s packaging and the contractor&apos;s material takeoff procedure.
          </p>
          <p>
            This calculator&apos;s material estimator accounts for different shingle configurations and uses the selected coverage assumptions rather than assuming every roofing product has identical packaging.
          </p>
          <p>
            That distinction matters. GAF notes that many standard asphalt shingles use about three bundles per roofing square, while also emphasizing that heavier or different products can have different package coverage.
          </p>
          <p>
            For an actual installation, always compare the calculator&apos;s estimated quantity against the selected manufacturer&apos;s installation instructions and package coverage.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Waste Allowance: Why Roofing Estimates Need More Than the Exact Geometric Area
          </h2>
          <p>
            Theoretical roof area is not necessarily equal to the amount of material that must be purchased.
          </p>
          <p>
            Cutting, trimming, starter courses, ridge treatment, roof complexity, valleys, penetrations, damaged material and installation losses can increase material requirements.
          </p>
          <p>
            A simple planning formula is:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Waste-Adjusted Area = True Roof Area × (1 + Waste % / 100)
          </div>
          <p>
            For example, using a 2,236.07 ft² roof:
          </p>
          <div className="space-y-2">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100">With 5%:</span> 2,236.07 × 1.05 ≈ 2,347.87 ft²
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100">With 10%:</span> 2,236.07 × 1.10 ≈ 2,459.67 ft²
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100">With 15%:</span> 2,236.07 × 1.15 ≈ 2,571.48 ft²
            </div>
          </div>
          <p>
            The appropriate allowance depends on roof complexity, material, installation method and estimating practice. GAF&apos;s current roofing guidance notes that contractors commonly include a waste factor and that roof features such as rakes, valleys, eaves and dormers can increase material requirements.
          </p>
          <p>
            The calculator lets the user choose the allowance rather than hiding it inside an unexplained result.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Gable, Hip, Shed, Gambrel and Mansard Roof Calculations
          </h2>
          <p>
            Not all roofs can be represented adequately by one generic triangle.
          </p>
          <div className="space-y-2 pl-1">
            <p>
              <strong>Gable roof:</strong> A gable roof normally has two sloped planes meeting at a ridge. The calculator can estimate the roof footprint and pitch-adjusted area for this common configuration.
            </p>
            <p>
              <strong>Hip roof:</strong> A hip roof slopes toward the eaves on all major sides. Its perimeter geometry differs from a gable roof, so ridge, eave and roof-edge measurements must be interpreted differently.
            </p>
            <p>
              <strong>Shed roof:</strong> A shed roof has one primary sloping plane. Its geometry can often be represented efficiently using a single pitch-adjusted surface.
            </p>
            <p>
              <strong>Gambrel roof:</strong> A gambrel roof contains multiple slope changes. Treating it as a simple single-pitch roof can misrepresent the actual geometry.
            </p>
            <p>
              <strong>Mansard roof:</strong> A mansard roof also uses multiple slope sections. The roof cannot be accurately represented by assuming one uniform slope across the entire exterior.
            </p>
          </div>
          <p>
            The calculator therefore includes distinct parametric visualizations for all five roof styles rather than showing the same generic roof drawing for every selection. The production audit specifically verified Gable, Hip, Shed, Gambrel and Mansard geometry.
          </p>
          <p>
            For complicated roofs, the Multi-Pitch &amp; Complex Roof Plane Calculator is particularly useful because the roof can be represented as separate planes and summed.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Multi-Pitch Roofs: Why Roof Planes Should Be Calculated Separately
          </h2>
          <p>
            Complex residential roofs often contain more than one slope or roof plane.
          </p>
          <p>
            Instead of treating the entire structure as one rectangle, break it into measurable planes:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Total Roof Area = Area₁ + Area₂ + Area₃ + …
          </div>
          <p>
            Each plane can then use its own dimensions and pitch.
          </p>
          <p>
            This approach is useful for roofs containing:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 pl-2">
            <li>different pitch sections;</li>
            <li>additions;</li>
            <li>multiple ridges;</li>
            <li>valleys;</li>
            <li>intersecting roof planes;</li>
            <li>extensions;</li>
            <li>architectural transitions.</li>
          </ul>
          <p>
            The calculator&apos;s multi-pitch module supports arbitrary slope planes and also produces associated takeoff measurements such as starter-strip and drip-edge quantities. The latest regression audit verified those calculations independently.
          </p>
          <p>
            A useful estimating workflow is therefore:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            Measure → divide into planes → calculate each plane → sum → subtract valid deductions → add material allowance → convert to squares → estimate materials and cost.
          </div>
          <p>
            This is usually more defensible than forcing a complex roof into one simplified rectangle.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Ground Base Area vs. House Dimensions: Which Input Should You Use?
          </h2>
          <p>
            The calculator provides two different ways to begin.
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Use House Dimensions when:
          </p>
          <p>
            You know the building&apos;s length and width and want the calculator to derive the horizontal footprint. This is useful for straightforward building footprints.
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Use Ground Base Area when:
          </p>
          <p>
            You already know the horizontal footprint area from a survey, plan, measurement, or another trusted source.
          </p>
          <p>
            For example, if the known ground area is 2,000 ft², enter 2,000 directly rather than inventing a length and width that happen to multiply to 2,000.
          </p>
          <p>
            This distinction prevents accidental double-counting. The current implementation was specifically corrected so that Ground Base Area mode does not synthesize dimensions and add eave or gable overhangs on top of the entered area.
          </p>
          <p>
            That makes the mode appropriate when a user already has a measured footprint and wants to apply roof pitch.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Roofing Material Takeoff: Shingles, Underlayment, Water Protection and Fasteners
          </h2>
          <p>
            A roof-material estimate is broader than shingles alone. Depending on the roofing system, the takeoff may include:
          </p>
          <div className="space-y-2 pl-1">
            <p>
              <strong>Shingles:</strong> Estimated from roofing squares and the selected product&apos;s coverage.
            </p>
            <p>
              <strong>Underlayment:</strong> Calculated from the roof area and the selected coverage basis.
            </p>
            <p>
              <strong>Ice and water protection:</strong> Coverage depends on the selected product and estimator assumption.
            </p>
            <p>
              <strong>Ridge-cap material:</strong> Required for applicable roof configurations and calculated separately from the main field-shingle quantity.
            </p>
            <p>
              <strong>Fasteners:</strong> Fastener requirements can vary with shingle type and installation conditions. This calculator distinguishes standard and high-wind fastening assumptions.
            </p>
          </div>
          <p>
            The current implementation verifies standard and high-wind nail quantities separately, including the resulting weight estimates.
          </p>
          <p>
            These outputs should be treated as a planning takeoff, not as a replacement for the manufacturer&apos;s installation instructions.
          </p>
          <p>
            Always verify package coverage, required fastening patterns, underlayment requirements and local code requirements before ordering or installing materials.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Roofing Cost Estimation: From Squares to a Replacement Budget
          </h2>
          <p>
            Once roofing squares are known, a preliminary replacement estimate can be constructed from several cost components.
          </p>
          <p>
            A simplified square-based estimate can be represented as:
          </p>
          <div className="space-y-1.5 font-mono text-xs sm:text-sm font-semibold">
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 text-zinc-900 dark:text-zinc-100">
              Material Cost = Roofing Squares × Material Rate
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 text-zinc-900 dark:text-zinc-100">
              Tear-Off Cost = Roofing Squares × Tear-Off Rate
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 text-zinc-900 dark:text-zinc-100">
              Labor Cost = Roofing Squares × Labor Rate
            </div>
          </div>
          <p>
            Then fixed project costs can be added:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Estimated Subtotal = Material + Tear-Off + Labor + Fixed Costs
          </div>
          <p>
            The calculator can then apply its configured tax basis and produce an overall estimate.
          </p>
          <p>
            For example, the verified production case uses:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 text-xs sm:text-sm">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Verified Case Parameters:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 font-mono">
              <li>27.1 roofing squares</li>
              <li>$160/square materials</li>
              <li>$50/square tear-off</li>
              <li>$200/square labor</li>
              <li>$650 fixed dumpster/permit allowance</li>
              <li>7% material sales tax</li>
            </ul>
            <div className="pt-2 border-t border-slate-200 dark:border-zinc-700 space-y-1 font-mono text-xs">
              <p>Materials = 27.1 × $160 = $4,336.00</p>
              <p>Tear-Off = 27.1 × $50 = $1,355.00</p>
              <p>Labor = 27.1 × $200 = $5,420.00</p>
              <p>Fixed Costs = $650.00</p>
              <p>Material Tax = 7% of $4,336.00 = $303.52</p>
              <p className="font-bold text-blue-600 dark:text-blue-400 pt-1">
                Estimated Total = $12,064.52
              </p>
            </div>
          </div>
          <p>
            These figures are the calculator&apos;s demonstration inputs, not universal market prices. The production audit confirms the arithmetic and specifically verifies that the configured 7% tax is applied to materials only.
          </p>
          <p>
            Actual roofing prices vary substantially with location, material selection, labor market, roof complexity, accessibility, permits and project conditions. GAF likewise identifies roof size, material type, slope, location, labor and local requirements as important cost factors.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. How to Use the Roofing Calculator
          </h2>
          <p>
            For the most reliable result, enter information that corresponds to the physical roof rather than relying on broad guesses.
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                Step 1: Choose the roof measurement method
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Use House Dimensions when length and width are known. Use Ground Base Area when the horizontal footprint is already known.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                Step 2: Select the roof pitch or angle
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Choose a pitch such as 4/12, 6/12 or 8/12, or use the available angle-based input.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                Step 3: Enter applicable overhang information
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                For house-dimension calculations, enter measured eave and gable overhangs when applicable. Do not add those values again when working from a known ground/base area.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                Step 4: Select the waste allowance
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Use a project-appropriate percentage instead of assuming that exact theoretical area equals purchase quantity.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                Step 5: Review the geometric result
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Check true roof area, waste-adjusted area, roofing squares, pitch multiplier, and perimeter measurements where applicable.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                Step 6: Use the material estimator
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Select the roofing material configuration and review estimated bundles, underlayment, water-protection material, ridge caps and fasteners.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                Step 7: Estimate project cost
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Enter your local material, tear-off and labor rates rather than assuming the example defaults represent your market.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                Step 8: Review and export
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The calculator supports saving estimates, restoring saved configurations, copying formatted results, copying mathematical formulas, CSV export, TXT/report generation and print/PDF output. These features were verified in the production QA audit.
              </p>
            </div>
          </div>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Worked Example: 50 ft × 40 ft Roof at 6/12 Pitch
          </h2>
          <p>
            Consider a simple gable-roof example:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 text-xs sm:text-sm font-mono">
            <p>House length = 50 ft</p>
            <p>House width = 40 ft</p>
            <p>Eave overhang = 12 in (1 ft)</p>
            <p>Gable overhang = 12 in (1 ft)</p>
            <p>Pitch = 6/12</p>
            <p>Waste = 10%</p>
          </div>
          <p>
            The production regression case first adjusts the horizontal footprint for the applicable overhangs:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm space-y-1 text-zinc-900 dark:text-zinc-100">
            <p>Adjusted length = 50 + 2(1) = 52 ft</p>
            <p>Adjusted width = 40 + 2(1) = 42 ft</p>
            <p>Flat area = 52 × 42 = 2,184 ft²</p>
          </div>
          <p>
            For a 6/12 roof:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
            Multiplier = √[1 + (6/12)²] ≈ 1.118034
          </div>
          <p>
            True roof area:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
            2,184 × 1.118034 ≈ 2,441.78 ft²
          </div>
          <p>
            With 10% waste:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
            2,441.78 × 1.10 ≈ 2,685.96 ft²
          </div>
          <p>
            Roofing squares:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
            2,685.96 ÷ 100 ≈ 26.86 squares (Displayed: 26.9 roofing squares)
          </div>
          <p>
            The calculator&apos;s independent regression test verifies these values, including the 52 ft ridge, 104 ft eave perimeter and 94 ft rake perimeter used by the example configuration.
          </p>
          <p>
            This example also illustrates why &quot;50 × 40 = 2,000 ft²&quot; is not sufficient by itself for a pitched-roof material estimate. The roof surface follows the slope and, in this particular setup, the overhang geometry also changes the horizontal covered area.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Roofing Calculator Limitations and Professional Verification
          </h2>
          <p>
            A calculator is useful for estimating, planning and checking arithmetic, but roofing projects can involve geometry and installation conditions that cannot be inferred from two dimensions alone.
          </p>
          <p>
            Important factors may include:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 pl-2">
            <li>valleys;</li>
            <li>dormers;</li>
            <li>penetrations;</li>
            <li>cricket and saddle details;</li>
            <li>complex intersections;</li>
            <li>unusual roof framing;</li>
            <li>flashing requirements;</li>
            <li>local code requirements;</li>
            <li>ventilation requirements;</li>
            <li>manufacturer-specific installation details;</li>
            <li>access and staging conditions;</li>
            <li>existing roof layers;</li>
            <li>substrate condition.</li>
          </ul>
          <p>
            For a complex roof, measure each roof plane separately whenever practical instead of forcing the project into one simplified footprint.
          </p>
          <p>
            Material coverage also varies by product. The roofing square itself is standardized at 100 ft², but bundle coverage, fastening specifications and accessory requirements are product-specific.
          </p>
          <p>
            The calculator&apos;s cost estimator should similarly be treated as a planning estimate. Actual contractor pricing can differ because regional labor, disposal, permits, roof complexity, material choice and site conditions affect the final price.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
            <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              Construction Estimating Disclaimer
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Calculator outputs are planning estimates and should be verified against site measurements, manufacturer specifications, project plans and applicable local building requirements. This tool does not replace a professional roof inspection, engineering analysis, code review or contractor takeoff.
            </p>
          </div>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Roofing Measurement Quick Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans">
              <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
                <tr>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Quantity</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Formula / Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                <tr>
                  <td className="p-2 font-semibold">Horizontal rectangular area</td>
                  <td className="p-2 font-mono">Length × Width</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Pitch multiplier</td>
                  <td className="p-2 font-mono">√[1 + (Rise / 12)²]</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Pitch angle</td>
                  <td className="p-2 font-mono">arctan(Rise / 12)</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Sloped roof area</td>
                  <td className="p-2 font-mono">Horizontal area × pitch multiplier</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Waste-adjusted area</td>
                  <td className="p-2 font-mono">Roof area × (1 + waste %)</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Roofing squares</td>
                  <td className="p-2 font-mono">Roof area ÷ 100</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Bundle estimate</td>
                  <td className="p-2 font-mono">Squares × product bundles/square</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Material cost</td>
                  <td className="p-2 font-mono">Squares × material rate</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Tear-off cost</td>
                  <td className="p-2 font-mono">Squares × tear-off rate</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Labor cost</td>
                  <td className="p-2 font-mono">Squares × labor rate</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The 100 ft² roofing-square convention is an industry measurement rather than a claim that every roofing product package covers one exact square. Product-specific packaging should always be checked.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Why Use This Roofing Calculator?
          </h2>
          <p>
            A useful roofing calculator should do more than multiply length by width.
          </p>
          <p>
            This calculator combines several stages of the estimating process:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-semibold text-xs sm:text-sm text-center text-slate-800 dark:text-slate-200">
            Geometry → Pitch → Roof Surface → Waste → Roofing Squares → Materials → Fasteners → Cost
          </div>
          <p>
            It also supports different roof architectures, multiple slope planes, measured ground-area input, dynamic diagrams, saved estimates and exportable results.
          </p>
          <p>
            The production implementation currently verifies all major calculation categories, including roof pitch, roof types, multi-pitch areas, materials, fasteners, costs, SVG diagrams, save/restore, exports, PDF output and responsive behavior.
          </p>
          <p>
            That makes it useful for homeowners performing preliminary planning, students studying roof geometry, estimators checking takeoff arithmetic, and contractors or project managers creating an initial material-and-cost scenario before final field verification.
          </p>
          <p>
            For broader geometric area calculations, use the{" "}
            <Link
              href="/calculators/square-footage-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Square Footage Calculator
            </Link>
            . For concrete quantities associated with slabs, footings or other construction work, use the{" "}
            <Link
              href="/calculators/concrete-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Concrete Calculator
            </Link>
            .
          </p>
        </section>
      </div>

      {/* ── RELATED CALCULATORS (AFTER CONTENT) ── */}
      <div className="no-print pt-6">
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Related Calculators
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <Link
              href="/calculators/square-footage-calculator"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 shadow-xs transition-colors"
            >
              Square Footage Calculator
            </Link>
            <Link
              href="/calculators/concrete-calculator"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 shadow-xs transition-colors"
            >
              Concrete Calculator
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default RoofingContent;
