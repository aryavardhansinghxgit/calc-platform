"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, Calculator } from "lucide-react";

export const concreteFaqs = [
  {
    question: "How many 80-lb bags of concrete make a cubic yard?",
    answer: "It takes exactly 45 bags of 80-lb concrete premix to yield 1 cubic yard. An 80-lb bag yields approximately 0.60 cubic feet of mixed concrete. Because 1 cubic yard contains 27 cubic feet, dividing 27 by 0.60 gives 45 bags.",
  },
  {
    question: "How many 60-lb bags of concrete make a cubic yard?",
    answer: "It takes 60 bags of 60-lb concrete premix to yield 1 cubic yard. A standard 60-lb bag yields approximately 0.45 cubic feet of mixed concrete (27 ft³ ÷ 0.45 ft³/bag = 60 bags).",
  },
  {
    question: "How do you convert square feet to cubic yards of concrete?",
    answer: "You cannot convert square feet directly into cubic yards without knowing thickness. Multiply your square footage by the concrete thickness in feet (thickness in inches ÷ 12) to get cubic feet, then divide by 27. For example, a 300 sq ft patio at 4 inches thick (0.333 ft) is: 300 × 0.333 = 100 cu ft ÷ 27 ≈ 3.70 cubic yards.",
  },
  {
    question: "How thick should a concrete slab or patio be?",
    answer: "Standard non-structural residential slabs (patios, walkways, shed floors) are poured 4 inches thick. Residential driveways and heavy equipment pads are poured 5 to 6 inches thick with reinforcement. Local building codes and soil conditions dictate final requirements.",
  },
  {
    question: "What percentage of concrete should be added for waste and spillage?",
    answer: "A standard waste allowance is 5% to 8% for well-braced, uniform wooden forms on a level subgrade, and 10% to 15% for rough earthen excavations, post holes, sonotube piers, or uneven ground.",
  },
  {
    question: "Can you pour concrete directly on dirt without gravel?",
    answer: "Pouring directly on dirt is strongly discouraged. A compacted 4-inch layer of crushed gravel (3/4-inch minus with fines) provides a stable, uniform sub-base, improves drainage, and prevents frost heave and premature cracking.",
  },
  {
    question: "How much does a cubic yard of concrete weigh?",
    answer: "Standard normal-weight concrete weighs approximately 3,600 to 4,050 lbs (1.8 to 2.0 tons) per cubic yard, assuming a standard unit weight of 133 to 150 lbs per cubic foot.",
  },
  {
    question: "How many cubic yards are in a standard ready-mix concrete truck?",
    answer: "A full-size commercial transit-mix truck typically carries 9 to 11 cubic yards of wet concrete, with 10 cubic yards being the standard full load.",
  },
  {
    question: "How long must concrete cure before walking or driving on it?",
    answer: "Light foot traffic is generally safe after 24 to 48 hours. Passenger vehicles and driveways require a minimum of 7 full days of moist curing before use. Concrete reaches its specified 28-day compressive design strength at 28 days.",
  },
  {
    question: "Why must the inner diameter be strictly less than the outer diameter for tube pours?",
    answer: "An annular or hollow tube represents a hollow cylinder where concrete fills the solid ring between two concentric circles. If the inner diameter is equal to or greater than the outer diameter, the wall thickness is zero or negative, which is physically impossible geometry.",
  },
];

export function ConcreteContent() {
  // All 10 FAQs open by default matching the 401(k) format
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 10 }, (_, i) => i)),
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
    <article className="mt-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* ── TOP RELATED CALCULATORS BAR ── */}
      <div className="no-print pb-2">
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calculator className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            RELATED CALCULATORS:
          </span>
          <div className="flex flex-wrap items-center gap-3 font-semibold text-blue-600 dark:text-blue-400">
            <Link href="/calculators/square-footage-calculator" className="hover:underline">
              Square Footage Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Link href="/calculators/gravel-calculator" className="hover:underline">
              Gravel Calculator
            </Link>
          </div>
        </div>
      </div>

      {/* ── 1. MAIN EDUCATIONAL CONTENT ── */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 pt-6">
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Concrete Calculator
          </h2>
          <p>
            Estimate how much concrete you need for slabs, square footings, walls, round columns, tubes, circular pours, curb and gutter sections, and concrete stairs. Enter the dimensions of the shape, choose the appropriate units, and calculate the required concrete volume from the geometry of the pour.
          </p>
          <p>
            This concrete calculator converts the calculated volume into practical construction quantities, including cubic feet and cubic yards, and can also estimate concrete weight and material quantities where the selected module supports them. You can include a waste allowance to account for differences between the theoretical volume and the amount of material that may actually be required on site.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold text-blue-700 dark:text-blue-300 block mb-1">Rectangular Volume Formula</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0 font-mono">
                Concrete volume = Length × Width × Thickness
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold text-blue-700 dark:text-blue-300 block mb-1">Cylindrical Volume Formula</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0 font-mono">
                Concrete volume = π × (Radius)² × Height
              </p>
            </div>
          </div>
          <p>
            The calculator handles unit conversions automatically so that measurements such as feet and inches can be entered without manually converting every dimension first. For bulk concrete ordering, remember that 1 cubic yard equals exactly 27 cubic feet, because a cubic yard is a cube measuring 3 feet by 3 feet by 3 feet.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Concrete Volume &amp; Material Estimation Fundamentals
          </h2>
          <p>
            Concrete quantity estimation begins with geometry. Before thinking about truck loads, bags, cost, or waste, determine the volume occupied by the finished concrete element.
          </p>
          <p>
            For a rectangular slab, pad, wall section, or similarly shaped footing, volume is calculated from three dimensions:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-blue-700 dark:text-blue-300">
            V = L × W × H
          </div>
          <p>
            where <em>V</em> is concrete volume, <em>L</em> is length, <em>W</em> is width, and <em>H</em> is thickness or height.
          </p>
          <p>
            All three dimensions must represent the same unit system before multiplication. For example, if length and width are in feet while thickness is given in inches, convert the thickness to feet first: <code>H(ft) = H(in) ÷ 12</code>. So a 4-inch thickness is <code>4 ÷ 12 = 0.3333 ft</code>. That conversion is one of the most common sources of manual estimating mistakes. The calculator performs the unit conversion before calculating the volume.
          </p>
          <p>
            The same principle extends beyond flat rectangular slabs. A round column uses circular geometry, a tube or annular section uses the difference between two circular areas, and stairs are assembled from multiple rectangular or step-shaped portions. The calculator chooses the appropriate geometric model for the selected construction element instead of applying a single formula to every project.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Cubic Feet vs. Cubic Yards of Concrete
          </h2>
          <p>
            Concrete is commonly estimated and purchased in cubic yards in U.S. construction, while many individual dimensions are measured in feet and inches. This makes cubic-foot-to-cubic-yard conversion especially important.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">1 yd³ = 27 ft³</span>
              <span className="text-slate-500">Cubic yards = Cubic feet ÷ 27</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">1 ft³ = 0.03704 yd³</span>
              <span className="text-slate-500">Cubic feet = Cubic yards × 27</span>
            </div>
          </div>
          <p>
            For example, if a slab requires 54 cubic feet: <code>54 ÷ 27 = 2 yd³</code>.
          </p>
          <p>
            The distinction between area and volume also matters. Square feet describe a two-dimensional surface, while cubic feet and cubic yards describe three-dimensional volume. You cannot convert square feet directly to cubic yards unless the concrete thickness is known. For a rectangular slab, <code>Area = L × W</code>, and <code>Volume = Area × Thickness</code>. This is why a &ldquo;square-foot&rdquo; concrete estimate is incomplete until thickness is included.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How to Calculate Concrete for a Slab
          </h2>
          <p>
            A concrete slab is usually one of the simplest construction shapes to estimate. Suppose a slab measures 20 ft × 12 ft × 4 in.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Convert thickness: <code>4 in = 4/12 ft = 0.3333 ft</code></li>
            <li>Calculate volume: <code>V = 20 × 12 × 0.3333 ≈ 80 ft³</code></li>
            <li>Convert to cubic yards: <code>80 ÷ 27 ≈ 2.963 yd³</code></li>
          </ul>
          <p>
            The result is the theoretical geometric volume before any project-specific allowance.
          </p>
          <p>
            The important lesson is that thickness matters just as much as length and width. A small change in slab thickness can materially change the quantity of concrete required. For this reason, thickness should be based on the actual project design rather than a generic online recommendation.
          </p>
          <p>
            Current construction references also distinguish estimation from structural design. For example, footing dimensions in residential construction depend on loads and soil-bearing conditions; they are not determined solely from a volume calculation. The 2024 IRC tables tie footing sizing to factors such as story configuration and allowable soil bearing value. This calculator tells you how much material corresponds to the geometry you enter; it does not determine whether that geometry is structurally adequate.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. How to Calculate Concrete for Round Columns and Footings
          </h2>
          <p>
            Round columns, piers, cylindrical footings, and tube forms require a cylindrical formula. The cross-sectional area of a circle is <code>A = πr²</code>. Multiplying by the height gives:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-blue-700 dark:text-blue-300">
            V = π × r² × h = π × (d ÷ 2)² × h
          </div>
          <p>
            For example, consider a round column with a diameter of 2.5 ft and a height of 6 ft:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Radius: <code>r = 2.5 ÷ 2 = 1.25 ft</code></li>
            <li>Volume: <code>V = π × 1.25² × 6 ≈ 29.45 ft³</code></li>
            <li>Cubic yards: <code>29.45 ÷ 27 ≈ 1.09 yd³</code></li>
          </ul>
          <p>
            This same geometry is useful for estimating concrete in cylindrical forms such as sonotubes or round pier forms.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Circular Slabs, Tubes &amp; Annular Concrete Sections
          </h2>
          <p>
            Not every circular construction element is solid. A tube or annular section has an outer diameter and an inner diameter. The concrete occupies the solid ring between those two circles.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-blue-700 dark:text-blue-300">
            V = π × (R² − r²) × h
          </div>
          <p>
            where <em>R</em> is the outer radius and <em>r</em> is the inner radius. This is particularly useful when estimating a hollow concrete section or any cylindrical element where the center is intentionally open.
          </p>
          <p>
            The relationship between the two diameters is critical: <strong>inner diameter must be strictly less than outer diameter</strong>. The calculator explicitly validates and rejects inverted geometry rather than silently changing it or emitting a misleading zero result.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Concrete Curb and Gutter Volume
          </h2>
          <p>
            Curb-and-gutter construction is not a simple rectangular block. Different portions of the section have different widths and heights, so its volume must be derived from the actual L-shaped cross-sectional geometry:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-blue-700 dark:text-blue-300">
            Cross-Section Area = (Curb Depth × Curb Height) + (Gutter Width × Flag Thickness)
            <br />
            Volume = Cross-Section Area × Length × Quantity
          </div>
          <p>
            When estimating a long curb-and-gutter run, ensure all dimensions are converted to feet before multiplying by length. The appropriate dimensions must come from the project&apos;s architectural plans, municipal specifications, or applicable civil engineering design requirements.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Estimating Concrete for Stairs
          </h2>
          <p>
            Concrete stairs require more care than a flat slab because the volume accumulates with every step. A flight of solid concrete stairs is modeled as a series of stacked rectangular steps plus any top landing platform:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-blue-700 dark:text-blue-300">
            V_steps = Width × Run × Rise × [n(n + 1) ÷ 2]
            <br />
            V_platform = Width × Platform Depth × (n × Rise)
            <br />
            Total Volume = V_steps + V_platform
          </div>
          <p>
            where <em>n</em> is the total number of risers. The calculator dynamically renders a stair visualization based on the entered riser count and dimensions, ensuring the visual diagram and mathematical calculations remain synchronized.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. How Much Extra Concrete Should You Order?
          </h2>
          <p>
            Theoretical volume and ordering quantity are not identical. The mathematical calculation assumes the entered geometry is exact, whereas actual job sites involve irregular subgrades, small measurement discrepancies, formwork deflection, spillage, and placement losses.
          </p>
          <p>
            The calculator lets you configure a transparent waste percentage instead of hiding an arbitrary assumption inside the result. For example, if the theoretical volume is 5.00 yd³ and the selected allowance is 10%:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-slate-700 dark:text-slate-300">
            Adjusted Volume = 5.00 × (1 + 0.10) = 5.50 yd³
          </div>
          <p>
            A waste factor is an estimating allowance, not a structural rule. The appropriate percentage depends on site conditions, subgrade leveling, and placement methods.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Concrete Bags vs. Ready-Mix Concrete
          </h2>
          <p>
            For smaller jobs, bagged premixed concrete is practical and economical. Larger placements are evaluated using ready-mixed concrete transit delivery in cubic yards.
          </p>
          <p>
            Bag quantities must be calculated from the manufacturer&apos;s stated volumetric yield, not simply from the dry bag weight:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2 text-center text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">40-lb Bag</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold font-mono">0.30 ft³ yield</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">50-lb Bag</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold font-mono">0.375 ft³ yield</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">60-lb Bag</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold font-mono">0.45 ft³ yield</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">80-lb Bag</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold font-mono">0.60 ft³ yield</span>
            </div>
          </div>
          <p>
            The general formula is: <code>Number of bags = Required volume (ft³) ÷ Yield per bag (ft³)</code>. Always round up to the nearest whole bag when purchasing.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Concrete Weight and Density
          </h2>
          <p>
            Volume tells you how much physical space the concrete occupies, while density converts that volume into estimated weight:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-slate-700 dark:text-slate-300">
            Weight (lbs) = Volume (ft³) × Density (lbs/ft³)
          </div>
          <p>
            The calculator exposes density as an input (defaulting to 133 lbs/ft³ for standard premixed concrete) rather than pretending every mix has identical weight. Concrete density varies based on aggregate type, water content, and entrained air.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Concrete Mix Design Is Different From Volume Estimation
          </h2>
          <p>
            A concrete volume calculator answers: <em>How much finished concrete volume is required?</em> It does not answer: <em>What exact mix design should be used?</em>
          </p>
          <p>
            Concrete performance depends on mix proportioning and properties such as the water-cement ratio, aggregate gradation, paste content, workability, and curing. The American Concrete Institute (ACI) emphasizes that careful proportioning and maintaining a low water-cement ratio (typically 0.40 to 0.45) are central to producing durable, crack-resistant concrete. Use this calculator as a quantity-estimation layer to determine volume, then communicate that requirement with your ready-mix supplier or project engineer.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Why Curing Matters After the Concrete Is Placed
          </h2>
          <p>
            Estimating the correct volume is only the first step in a successful pour. Concrete develops strength through hydration—an exothermic chemical reaction between Portland cement and water.
          </p>
          <p>
            Curing is the process of maintaining adequate moisture and temperature conditions so hydration can continue. Proper curing for at least 7 days (via wet burlap, plastic sheeting, or curing compound) allows concrete to reach approximately 70% of its design strength, reaching full specified compressive strength at 28 days.
          </p>
        </section>

        {/* Worked Example */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Worked Concrete Calculation Example
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 m-0">
              Example: 20 ft × 10 ft Slab at 4 Inches Thick
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
              Suppose you need concrete for a rectangular slab measuring Length = 20 ft, Width = 10 ft, and Thickness = 4 in:
            </p>
            <ol className="list-decimal pl-5 text-xs space-y-1 text-slate-700 dark:text-slate-300 font-mono">
              <li>Convert thickness: 4 in ÷ 12 = 0.3333 ft</li>
              <li>Calculate cubic feet: V = 20 × 10 × 0.3333 = 66.67 ft³</li>
              <li>Convert to cubic yards: 66.67 ÷ 27 = 2.47 yd³</li>
              <li>Add 10% estimating allowance: 2.47 × 1.10 = 2.72 yd³</li>
              <li>Pre-mixed 80-lb bag equivalent: 66.67 ÷ 0.60 = 112 bags (123 bags with 10% waste)</li>
            </ol>
          </div>
        </section>

        {/* Why this calculator is useful */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why This Calculator Is Useful for Real Construction Estimation
          </h2>
          <p>
            A basic slab-only calculator answers one common question, but real construction projects rarely consist of only one geometry. A single foundation pour may require a rectangular slab, round column footings, sonotube piers, a curb-and-gutter barrier, and access stairs. Using the appropriate geometric formula for each element eliminates guessing.
          </p>
          <p>
            For related quantity estimating work, you can use our{" "}
            <Link href="/calculators/square-footage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Square Footage Calculator
            </Link>{" "}
            to establish base surface area before adding thickness. For projects where the concrete slab rests on a compacted sub-base, the{" "}
            <Link href="/calculators/gravel-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Gravel Calculator
            </Link>{" "}
            can be used separately to determine aggregate tonnage.
          </p>
        </section>

        {/* Estimation Checklist */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Concrete Estimation Checklist
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 dark:text-blue-400">1.</span>
                <span><strong>Measure finished geometry:</strong> Use the internal dimensions of the forms, not the rough excavation hole.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 dark:text-blue-400">2.</span>
                <span><strong>Convert units consistently:</strong> Ensure linear dimensions are converted to feet before area/volume computation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 dark:text-blue-400">3.</span>
                <span><strong>Check thickness carefully:</strong> A 1/2-inch variation across a 500 sq ft slab changes volume by nearly 1 cubic yard.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 dark:text-blue-400">4.</span>
                <span><strong>Radius vs. diameter:</strong> For round piers and sonotubes, verify whether your measurement is diameter or radius.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 dark:text-blue-400">5.</span>
                <span><strong>Check hollow geometry:</strong> For tubes and annular pours, verify that the inner diameter is strictly smaller than the outer diameter.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 dark:text-blue-400">6.</span>
                <span><strong>Account for repeated elements:</strong> Use the quantity multiplier for multiple identical columns or footings.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 dark:text-blue-400">7.</span>
                <span><strong>Include a realistic waste margin:</strong> Add 5% to 10% to prevent cold joints caused by running short.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 dark:text-blue-400">8.</span>
                <span><strong>Verify manufacturer bag yield:</strong> Check the printed product yield on the bag (0.60 ft³ for 80-lb, 0.45 ft³ for 60-lb).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 dark:text-blue-400">9.</span>
                <span><strong>Confirm structural requirements separately:</strong> Volume calculations determine material quantities, not structural adequacy.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Engineering Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Engineering &amp; Code Compliance Disclaimer
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Compliance Notice
            </div>
            <p>
              This calculator provides estimates of concrete volume and material quantities for planning and estimating purposes. Results do not constitute structural engineering design, specifications, or code approval. Slab thickness, reinforcement, footing dimensions, mix design, curing requirements, and other construction details must be verified against project-specific conditions, applicable local building codes, applicable standards, project drawings, and qualified professional advice.
            </p>
            <p>
              For structural work, do not select footing dimensions, reinforcement, concrete strength, or other design parameters solely from an online material calculator. Applicable code provisions depend on factors such as loads, soil conditions, building configuration, exposure, and seismic conditions. For example, the International Residential Code (IRC) footing provisions tie footing sizing to building characteristics and allowable soil-bearing value.
            </p>
          </div>
        </section>

        {/* Closing section */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Get a Concrete Quantity Estimate from Your Project Dimensions
          </h2>
          <p>
            Concrete estimating becomes straightforward once the project is broken down into correct geometric shapes. Start with the dimensions, convert units consistently, calculate the theoretical volume, and include an appropriate job site allowance. From there, cubic-yard quantities, bag estimates, and approximate material weight provide a practical basis for planning and supplier conversations.
          </p>
          <p>
            Use the calculator above for slabs, footings, walls, round columns, tubes, circular sections, curb and gutter, and stairs, then review the formulas and checklist in this guide before ordering material.
          </p>
        </section>
      </div>

      {/* ── 2. FAQ SECTION (10 Unfolded FAQs Matching 401(k) Format) ── */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {concreteFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/30 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. BOTTOM RELATED CALCULATORS SECTION ── */}
      <div className="no-print pt-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Calculator className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            RELATED CONSTRUCTION CALCULATORS
          </span>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Planning a multi-stage construction project? Calculate your foundational aggregate and surface requirements with these tools:
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1 font-semibold text-blue-600 dark:text-blue-400">
            <Link href="/calculators/square-footage-calculator" className="hover:underline flex items-center gap-1">
              → Square Footage Calculator
            </Link>
            <Link href="/calculators/gravel-calculator" className="hover:underline flex items-center gap-1">
              → Gravel Calculator
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ConcreteContent;
