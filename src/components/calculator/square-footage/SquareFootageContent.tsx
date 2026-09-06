"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ShieldCheck, Layers, BookOpen } from "lucide-react";

export function SquareFootageContent() {
  // All 15 FAQs open (unfolded) by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 15 }, (_, i) => i)),
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

  const faqs = [
    {
      question: "How do I calculate square feet?",
      answer:
        "For a rectangle, multiply length by width after making sure both dimensions are in the same unit. For example: 20 ft × 12 ft = 240 ft². Other shapes use different formulas, such as πr² for a circle and 1/2bh for a triangle.",
    },
    {
      question: "How many square feet is a 10 × 10 room?",
      answer: "A 10 ft by 10 ft rectangular room has: 10 × 10 = 100 ft².",
    },
    {
      question: "How many square feet is a 12 × 10 room?",
      answer: "A 12 ft by 10 ft rectangular room has: 12 × 10 = 120 ft².",
    },
    {
      question: "How do I calculate square footage of multiple rooms?",
      answer:
        "Calculate each room individually and add the areas. For example: Room 1 = 120 ft², Room 2 = 180 ft², Room 3 = 80 ft², Total = 380 ft². The multi-room approach is particularly useful for L-shaped or irregular floor plans.",
    },
    {
      question: "How do I calculate square feet of a circle?",
      answer:
        "Use A = πr². If you know the diameter, divide it by 2 to obtain the radius. For a 30 ft diameter circle, the area is approximately 706.86 ft².",
    },
    {
      question: "How do I calculate square footage of a triangle?",
      answer:
        "When base and perpendicular height are known, use A = 1/2bh. When all three sides are known, Heron's formula can be used.",
    },
    {
      question: "How do I calculate the square footage of a border?",
      answer:
        "Calculate the outer area and subtract the inner area. For a rectangular border: Border Area = Outer Area − Inner Area. Remember that the border width is applied on both sides of each dimension.",
    },
    {
      question: "How do I calculate square feet from inches?",
      answer:
        "First convert the dimensions consistently into feet, or calculate in square inches and then divide by 144, because 1 ft² = 144 in².",
    },
    {
      question: "How do I convert square feet to square meters?",
      answer:
        "Multiply square feet by 0.09290304. For example: 600 ft² × 0.09290304 ≈ 55.7418 m².",
    },
    {
      question: "How many square feet are in an acre?",
      answer: "One acre contains exactly 43,560 ft².",
    },
    {
      question: "How many square feet are in a square yard?",
      answer: "One square yard contains 9 ft².",
    },
    {
      question: "Should I add waste to the square footage?",
      answer:
        "For material purchasing, an allowance may be appropriate because cuts, breakage, installation patterns and package sizes can increase the amount that must be purchased. The correct allowance depends on the material and project. Use the manufacturer's coverage guidance where available rather than treating one percentage as universal.",
    },
    {
      question: "Does square footage include the perimeter?",
      answer:
        "No. Square footage measures two-dimensional surface area. Perimeter measures the total distance around a two-dimensional boundary. For example, a 30 ft × 20 ft rectangle has Area = 600 ft² and Perimeter = 100 ft.",
    },
    {
      question: "What is the difference between square feet and linear feet?",
      answer:
        "Square feet measure area. Linear feet measure length. A 10 ft board is 10 linear feet long, while a 10 ft × 10 ft surface covers 100 square feet.",
    },
    {
      question: "Can I calculate irregular areas with a square footage calculator?",
      answer:
        "Yes, when the irregular shape can be decomposed into smaller regular shapes. Calculate the individual sections and add them together. For highly irregular or surveyed boundaries, a site plan, CAD model, measurement drawing or professional surveying workflow may be more suitable.",
    },
  ];

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
            href="/calculators/tile-calculator"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 shadow-xs transition-colors"
          >
            Tile Calculator
          </Link>
          <Link
            href="/calculators/roofing-calculator"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 shadow-xs transition-colors"
          >
            Roofing Calculator
          </Link>
        </div>
      </div>

      {/* ── MAIN EDUCATIONAL CONTENT BODY ── */}
      <div className="pt-8 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1: Understanding Square Footage */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Understanding Square Footage
          </h2>
          <p>
            Square footage is a measurement of area. It tells you how much two-dimensional surface is covered by a floor, room, slab, yard, wall section, countertop, patio, or another surface.
          </p>
          <p>
            One square foot is the area of a square measuring 1 foot by 1 foot.
          </p>
          <p>
            The basic idea is simple: measure the dimensions of the surface, choose the formula that matches its shape, and calculate the area in square feet.
          </p>
          <p>
            For a rectangular room, that means multiplying length by width:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-blue-700 dark:text-blue-300 font-bold">
            Area = length × width
          </div>
          <p>
            For example, a room that is 30 feet long and 20 feet wide has:
          </p>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            30 × 20 = 600 square feet
          </p>
          <p>
            This Square Footage Calculator expands that same principle to several common geometries, including rectangles, bordered rectangles, circles, rings, triangles, trapezoids, sectors and parallelograms. It can also combine multiple rooms and convert the result between common area units.
          </p>
          <p>
            The goal is not simply to return a number. A useful area estimate should make it clear which dimensions were used, which formula applies, what units the answer uses, and what the result means for planning.
          </p>
        </section>

        {/* Section 2: How to Calculate Square Feet */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Calculate Square Feet
          </h2>
          <p>
            The correct calculation depends on the geometry of the surface.
          </p>

          {/* Subsection: Rectangle */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Rectangle
            </h3>
            <p>
              A rectangle is the most common case for rooms, floors and other simple surfaces.
            </p>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-blue-700 dark:text-blue-300 font-bold">
              Area = length × width
            </div>
            <p>
              Example: Length = 30 ft, Width = 20 ft
            </p>
            <p className="font-semibold">
              Area = 30 × 20 = 600 ft²
            </p>
            <p>
              So a 30 ft × 20 ft rectangular surface contains 600 square feet. If you are measuring several separate rectangular rooms, calculate each room separately and then add the results. This avoids forcing an irregular floor plan into a single rectangle.
            </p>
          </div>

          {/* Subsection: Square */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Square Footage for a Square
            </h3>
            <p>
              A square is a special type of rectangle in which all four sides are equal.
            </p>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-blue-700 dark:text-blue-300 font-bold">
              Area = side²
            </div>
            <p>
              Example: Side = 15 ft → Area = 15² = 225 ft²
            </p>
            <p>
              The square formula is simply the rectangle formula with equal length and width.
            </p>
          </div>

          {/* Subsection: Circle */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Square Footage for a Circle
            </h3>
            <p>
              For a circular surface, area depends on the radius.
            </p>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-blue-700 dark:text-blue-300 font-bold">
              Area = πr²
            </div>
            <p>
              When the diameter is known, first divide it by 2: <code>r = diameter ÷ 2</code>.
            </p>
            <p>
              For example, consider a circle with a diameter of 30 ft. Radius = 30 ÷ 2 = 15 ft.
            </p>
            <p className="font-semibold">
              Area: π × 15² ≈ 706.86 ft²
            </p>
            <p>
              The circumference is a separate measurement: <code>Circumference = πd</code>. For a 30 ft diameter: <code>π × 30 ≈ 94.25 ft</code>. This distinction is important: circumference measures the distance around the circle, while square footage measures the area inside it.
            </p>
          </div>

          {/* Subsection: Triangle */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Square Footage for a Triangle
            </h3>
            <p>
              There are two common ways to calculate the area of a triangle.
            </p>

            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                1. Triangle with base and perpendicular height
              </h4>
              <div className="font-mono text-xs text-blue-700 dark:text-blue-300 font-bold">
                Area = 1/2 × base × height
              </div>
              <p>
                Example: Base = 30 ft, Height = 20 ft → Area = 1/2 × 30 × 20 = 300 ft². The height must be the perpendicular distance to the selected base. A slanted side is not automatically the height.
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                2. Triangle when all three sides are known (Heron&apos;s Formula)
              </h4>
              <p>
                When three side lengths are available, first calculate the semiperimeter: <code>s = (a + b + c) / 2</code>.
              </p>
              <div className="font-mono text-xs text-blue-700 dark:text-blue-300 font-bold">
                Area = √[s(s−a)(s−b)(s−c)]
              </div>
              <p>
                For example, for sides of 30 ft, 45 ft and 50 ft: s = (30 + 45 + 50) / 2 = 62.5 ft. Area = √[62.5 × 32.5 × 17.5 × 12.5] ≈ 666.59 ft². This is useful when there is no convenient perpendicular height to measure.
              </p>
            </div>
          </div>

          {/* Subsection: Trapezoid */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Square Footage for a Trapezoid
            </h3>
            <p>
              A trapezoid has two parallel sides, often called the bases. The height is the perpendicular distance between the parallel bases.
            </p>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-blue-700 dark:text-blue-300 font-bold">
              Area = ((base₁ + base₂) / 2) × height
            </div>
            <p>
              Example: Base 1 = 30 ft, Base 2 = 45 ft, Height = 20 ft
            </p>
            <p className="font-semibold">
              Area = ((30 + 45) / 2) × 20 = 37.5 × 20 = 750 ft²
            </p>
            <p>
              The formula uses the average of the two parallel sides multiplied by the perpendicular height.
            </p>
          </div>

          {/* Subsection: Parallelogram */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Square Footage for a Parallelogram
            </h3>
            <p>
              The area of a parallelogram is:
            </p>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-blue-700 dark:text-blue-300 font-bold">
              Area = base × perpendicular height
            </div>
            <p>
              Example: Base = 30 ft, Height = 20 ft → Area = 30 × 20 = 600 ft². A common mistake is using the slanted side as the height. The height must be measured perpendicular to the selected base.
            </p>
          </div>

          {/* Subsection: Circular Sector */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Square Footage for a Circular Sector
            </h3>
            <p>
              A sector is a portion of a circle defined by a central angle:
            </p>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-blue-700 dark:text-blue-300 font-bold">
              Area = (θ / 360) × πr²
            </div>
            <p>
              where θ is the central angle in degrees and r is the radius.
            </p>
            <p>
              Example: Radius = 30 ft, Angle = 90° → Area = (90 / 360) × π × 30² ≈ 706.86 ft². The corresponding arc length is <code>Arc length = (θ / 360) × 2πr</code>, which equals <code>(90 / 360) × 2π × 30 ≈ 47.12 ft</code>. Sector calculations are useful for curved patios, fan-shaped areas, circular sections and other layouts where the surface occupies only part of a circle.
            </p>
          </div>
        </section>

        {/* Section 3: Area of a Border or Frame */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Calculating the Area of a Border or Frame
          </h2>
          <p>
            Some surfaces are not the entire rectangle. Instead, the usable or required area is a border surrounding a smaller interior rectangle.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
            <p>Outer Area = L × W</p>
            <p>Inner Length = L − 2b</p>
            <p>Inner Width = W − 2b</p>
            <p className="font-bold text-blue-700 dark:text-blue-300">Border Area = Outer Area − Inner Area</p>
          </div>
          <p>
            Example: Outer length = 30 ft, Outer width = 20 ft, Border width = 2 ft.
          </p>
          <p>
            Outer area: 30 × 20 = 600 ft². Inner dimensions: 30 − 4 = 26 ft, 20 − 4 = 16 ft. Inner area: 26 × 16 = 416 ft². Border area: 600 − 416 = 184 ft².
          </p>
          <p>
            The border width must be geometrically possible. A border that reaches or exceeds half of either outside dimension leaves no positive interior dimension.
          </p>
        </section>

        {/* Section 4: Ring or Annulus */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Calculating a Ring or Annulus
          </h2>
          <p>
            A ring is the area between two concentric circles. If the outer radius is R and the inner radius is r:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-blue-700 dark:text-blue-300 font-bold">
            Area = π(R² − r²)
          </div>
          <p>
            The calculator can also determine the inner diameter when the outer diameter and border width are entered.
          </p>
          <p>
            Example: Outer diameter = 30 ft, Border width = 2 ft → Outer radius R = 15 ft, Inner radius r = 13 ft. Therefore: Area = π(15² − 13²) = 56π ≈ 175.93 ft². This type of calculation is useful for circular paths, landscaped rings, circular borders and other annular surfaces.
          </p>
        </section>

        {/* Section 5: Multi-Room Aggregator */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Measuring Several Rooms or Irregular Floor Plans
          </h2>
          <p>
            Real projects are often more complicated than one perfect rectangle. A practical approach is to divide the overall surface into smaller regular sections.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-1 text-xs">
            <p>Room 1: 10 × 12 = 120 ft²</p>
            <p>Room 2: 12 × 15 = 180 ft²</p>
            <p>Room 3: 8 × 10 = 80 ft²</p>
            <p className="font-bold text-blue-700 dark:text-blue-300">Total: 120 + 180 + 80 = 380 ft²</p>
          </div>
          <p>
            This method is often easier and more reliable than trying to estimate the entire irregular boundary at once. For an L-shaped floor plan, divide it into rectangles, calculate each rectangle independently, and add the areas. For a shape with a section that is missing, subtract the missing rectangle from the larger enclosing rectangle. For curved or highly irregular boundaries, divide the surface into smaller geometric regions or use a more appropriate surveying or CAD-based method when greater precision is required.
          </p>
        </section>

        {/* Section 6: Gross Area, Net Area and Bordered Area */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Gross Area, Net Area and Bordered Area
          </h2>
          <p>
            It is useful to distinguish between different meanings of &quot;area.&quot;
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Gross area:</strong> Generally refers to the area before subtracting internal regions or exclusions.
            </li>
            <li>
              <strong>Net area:</strong> The area remaining after specified exclusions are removed.
            </li>
            <li>
              <strong>Border area:</strong> For a rectangular frame or border: <code>Border area = outer area − inner area</code>.
            </li>
          </ul>
          <p>
            These terms are not interchangeable in every construction, architectural or real-estate context. The correct definition depends on what is being measured and the convention used for the project. For ordinary material planning, always make sure the dimensions entered into the calculator represent the exact physical surface you intend to cover.
          </p>
        </section>

        {/* Section 7: Square Feet to Other Area Units */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Square Feet to Other Area Units
          </h2>
          <p>
            Square footage is often converted when drawings, plans, supplier quotations or property information use different units. Useful relationships include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <strong>1 square yard</strong> = 9 square feet
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <strong>1 square foot</strong> = 144 square inches
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <strong>1 square foot</strong> = 0.09290304 square meters
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <strong>1 square meter</strong> ≈ 10.7639 square feet
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 col-span-1 sm:col-span-2">
              <strong>1 acre</strong> = 43,560 square feet
            </div>
          </div>
          <p>
            For example: 600 ft² ÷ 9 = 66.6667 yd², 600 ft² × 0.09290304 ≈ 55.7418 m², 600 ft² ÷ 43,560 ≈ 0.01377 acres. The important point is that area units must be converted as areas, not as ordinary one-dimensional lengths. Squaring the linear conversion factor is necessary when changing area units.
          </p>
        </section>

        {/* Section 8: Unit Consistency */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Unit Consistency Matters
          </h2>
          <p>
            Suppose a room is measured as: Length = 20 ft, Width = 12 ft. The area is 20 × 12 = 240 ft². If one dimension is accidentally entered in inches while the other remains in feet, the numerical result will be wrong by a large factor.
          </p>
          <p>
            Before calculating, confirm:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>every dimension uses the intended unit;</li>
            <li>diameter has not been mistaken for radius;</li>
            <li>height is perpendicular when a formula requires perpendicular height;</li>
            <li>a quantity greater than one is intentional;</li>
            <li>prices are expressed on the same area basis as the calculated area.</li>
          </ul>
          <p>
            The calculator&apos;s unit selectors help standardize dimensions before the geometric formula is evaluated.
          </p>
        </section>

        {/* Section 9: Using Quantity */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Using Quantity
          </h2>
          <p>
            If the same geometric surface occurs several times, calculate one surface and multiply by quantity. For example, one rectangular panel measuring 10 ft × 8 ft = 80 ft² with a quantity of 5 yields 80 × 5 = 400 ft².
          </p>
          <p>
            Quantity should represent the number of identical surfaces represented by the same dimensions. It should not be used as a substitute for measuring separate rooms with different dimensions.
          </p>
        </section>

        {/* Section 10: Estimating Cost Per Square Foot */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Estimating Cost Per Square Foot
          </h2>
          <p>
            Square footage is frequently used as the basis for material pricing. The simplest cost model is:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 font-mono text-xs text-blue-700 dark:text-blue-300 font-bold">
            Total Cost = Area × Price per Square Foot
          </div>
          <p>
            Example: Area = 600 ft², Price = $5 per ft² → Total Cost: 600 × $5 = $3,000.
          </p>
          <p>
            This is a planning calculation, not necessarily the final project price. Actual project costs may also include labor, delivery, surface preparation, waste allowance, demolition or removal, trim and accessories, taxes, minimum order quantities, contractor overhead, and site-specific complexity. Therefore, a square-foot price should be treated as an input assumption rather than a complete construction quote.
          </p>
        </section>

        {/* Section 11: Material Planning and Waste */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Material Planning and Waste
          </h2>
          <p>
            A calculated area is not always identical to the amount of material that must be purchased. Cutting, layout, breakage, pattern matching, installation requirements and package sizes can cause the required purchased quantity to exceed the bare geometric area.
          </p>
          <p>
            The correct waste allowance depends on the material and project. For example, a simple rectangular floor with a straightforward installation pattern may require 5% to 10% waste, whereas a diagonal, herringbone or highly cut-intensive layout typically requires 10% to 15% or more.
          </p>
          <p>
            When your area estimate is ready, a{" "}
            <Link
              href="/calculators/tile-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              tile calculator
            </Link>{" "}
            can help translate the measured floor area into a more specific flooring estimate.
          </p>
          <p>
            For roofing projects, a{" "}
            <Link
              href="/calculators/roofing-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              roofing calculator
            </Link>{" "}
            can be useful when the surface area depends on roof geometry and pitch.
          </p>
          <p>
            For purchased materials, always use the manufacturer&apos;s stated coverage or package yield whenever available. The material estimator on this page is best treated as a planning aid whose package quantities should be checked against actual product specifications before ordering.
          </p>
        </section>

        {/* Section 12: Worked Examples */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Worked Step-by-Step Examples
          </h2>

          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Worked Example: 30 ft × 20 ft Room
            </h3>
            <p>
              Consider a rectangular room with Length = 30 ft and Width = 20 ft.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Step 1 (Calculate Area):</strong> Area = 30 × 20 = 600 ft²</li>
              <li><strong>Step 2 (Convert to Square Yards):</strong> 600 ÷ 9 = 66.6667 yd²</li>
              <li><strong>Step 3 (Convert to Square Meters):</strong> 600 × 0.09290304 ≈ 55.7418 m²</li>
              <li><strong>Step 4 (Estimate Cost):</strong> At $5 per sq ft: 600 × 5 = $3,000.00</li>
            </ul>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Worked Example: Circular Surface
            </h3>
            <p>
              Suppose a circular patio has Diameter = 30 ft.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Radius:</strong> r = 30 ÷ 2 = 15 ft</li>
              <li><strong>Area:</strong> π × 15² ≈ 706.86 ft²</li>
              <li><strong>Circumference:</strong> C = π × 30 ≈ 94.25 ft</li>
              <li><strong>Quarter-Circle Sector (90°):</strong> 706.86 ÷ 4 ≈ 176.71 ft²</li>
            </ul>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Worked Example: Irregular Floor Plan
            </h3>
            <p>
              Suppose a floor plan can be separated into three rectangles:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Section A:</strong> 12 × 10 = 120 ft²</li>
              <li><strong>Section B:</strong> 15 × 12 = 180 ft²</li>
              <li><strong>Section C:</strong> 10 × 8 = 80 ft²</li>
              <li><strong>Total Floor Area:</strong> 120 + 180 + 80 = 380 ft²</li>
            </ul>
            <p className="text-xs">
              The key idea is decomposition: break a complicated outline into shapes whose areas you can calculate confidently, then combine the results.
            </p>
          </div>
        </section>

        {/* Section 13: Common Square Footage Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Square Footage Mistakes
          </h2>
          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <span className="font-bold text-xs text-red-600 dark:text-red-400 block">1. Using diameter instead of radius</span>
              <span className="text-xs">For a circle, Area = πr². If the input is diameter, divide it by 2 first.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <span className="font-bold text-xs text-red-600 dark:text-red-400 block">2. Using the wrong triangle height</span>
              <span className="text-xs">The height in A = 1/2bh must be perpendicular to the base, not the slanted side.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <span className="font-bold text-xs text-red-600 dark:text-red-400 block">3. Forgetting the second border width</span>
              <span className="text-xs">A border around all four sides removes 2b from each dimension, not just b.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <span className="font-bold text-xs text-red-600 dark:text-red-400 block">4. Mixing linear and area units</span>
              <span className="text-xs">Feet, inches and meters are length units. Square feet, square inches and square meters are area units. They cannot be substituted directly.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <span className="font-bold text-xs text-red-600 dark:text-red-400 block">5. Forgetting quantity</span>
              <span className="text-xs">If five identical surfaces are required, one calculated surface is not the same as the total project area.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <span className="font-bold text-xs text-red-600 dark:text-red-400 block">6. Treating material coverage as exact geometry</span>
              <span className="text-xs">A mathematical area does not automatically tell you how many boxes, rolls, cartons or gallons to purchase. Packaging, waste, coverage rates and installation conditions matter.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <span className="font-bold text-xs text-red-600 dark:text-red-400 block">7. Rounding too early</span>
              <span className="text-xs">Keep sufficient precision during intermediate calculations and round the final result to the level appropriate for the project.</span>
            </div>
          </div>
        </section>

        {/* Section 14: Choosing the Right Shape Formula Table */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Choosing the Right Shape Formula
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200 dark:border-zinc-700 rounded-lg">
              <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
                <tr>
                  <th className="p-2.5 border-b border-slate-200 dark:border-zinc-700">Shape</th>
                  <th className="p-2.5 border-b border-slate-200 dark:border-zinc-700">Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-zinc-700 font-sans">
                <tr>
                  <td className="p-2.5 font-medium">Square</td>
                  <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">A = s²</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Rectangle</td>
                  <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">A = L × W</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Circle</td>
                  <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">A = πr²</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Triangle (Base/Height)</td>
                  <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">A = 1/2bh</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Triangle from 3 sides</td>
                  <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">A = √[s(s−a)(s−b)(s−c)]</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Trapezoid</td>
                  <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">A = ((b₁ + b₂) / 2)h</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Parallelogram</td>
                  <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">A = bh</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Ring / Annulus</td>
                  <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">A = π(R² − r²)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Circular Sector</td>
                  <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">A = (θ / 360)πr²</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Rectangle Border</td>
                  <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">Outer area − Inner area</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 15: Why Square Footage Matters */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Square Footage Matters in Construction and Planning
          </h2>
          <p>
            Area is one of the most useful quantities in building and property work because many materials and services are specified on an area basis. Examples include flooring, carpet, tile, painting, roofing materials, insulation, landscaping, concrete surface treatments, wall coverings, and sheet goods.
          </p>
          <p>
            However, the measured geometric area is only the starting point. A reliable estimate connects the physical measurement to the actual scope of work. That means checking the unit, the shape, exclusions, quantity, material coverage, waste assumptions and pricing basis before placing an order.
          </p>
        </section>

        {/* Section 16: How to Use This Calculator */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use This Square Footage Calculator
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <strong>Step 1: Choose the shape</strong> — Select the geometric module that best matches the surface.
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <strong>Step 2: Enter dimensions</strong> — Enter lengths, widths, diameters, heights, radii, angles or side lengths.
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <strong>Step 3: Confirm units</strong> — Ensure each dimension uses the intended linear unit.
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <strong>Step 4: Enter quantity</strong> — Use quantity when identical surfaces repeat.
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <strong>Step 5: Add price when relevant</strong> — Enter cost per square foot for instant material totals.
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <strong>Step 6: Review secondary metrics</strong> — Inspect perimeter, circumference, or arc length.
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <strong>Step 7: Check packaging estimates</strong> — Inspect tile boxes, hardwood cartons, paint, and sod.
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60">
              <strong>Step 8: Verify physical measurements</strong> — Double-check dimensions against field plans.
            </div>
          </div>
        </section>

        {/* Section 17: Practical Measurement Checklist */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Practical Measurement Checklist
          </h2>
          <ol className="list-decimal pl-5 space-y-1 text-xs">
            <li>Length and width are measured at the correct locations.</li>
            <li>Units are consistent across all dimensions.</li>
            <li>Diameter has not been confused with radius.</li>
            <li>Triangle heights are strictly perpendicular to their bases.</li>
            <li>Border widths are applied on both sides of each dimension.</li>
            <li>Interior exclusions are accounted for where appropriate.</li>
            <li>Quantity reflects identical repetitions accurately.</li>
            <li>Material coverage assumptions match the actual product specification.</li>
            <li>Waste or cutting requirements are considered separately.</li>
            <li>Final dimensions are checked against the physical site or project plans.</li>
          </ol>
        </section>

        {/* Section 18: Core Idea */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Square Footage: The Core Idea
          </h2>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            Measure the correct dimensions, choose the correct geometric model, keep the units consistent, and calculate the area.
          </p>
          <p>
            A rectangle may need only length × width. A circle requires radius or diameter. A triangle may need a base and perpendicular height or all three sides. A trapezoid uses the average of its two parallel bases and the perpendicular height. A sector combines circular area with an angle. A bordered or ring-shaped surface requires subtraction. A complex floor plan may require decomposition into several smaller areas.
          </p>
          <p>
            Once the geometric area is known, the same number can be converted into other area units or used as a starting point for quantity and cost planning.
          </p>
        </section>

        {/* Section 19: Construction Disclaimer */}
        <section className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 rounded-xl space-y-1.5 not-prose text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <div className="font-bold text-sm text-amber-950 dark:text-amber-100 uppercase tracking-wide flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-amber-600" />
            Construction Estimating &amp; Engineering Disclaimer
          </div>
          <p>
            This calculator provides geometric area calculations and related planning estimates based on the dimensions and assumptions entered by the user. Results are intended for measurement, estimating and planning purposes. They do not determine structural adequacy, footing dimensions, reinforcement, allowable loads, slab thickness, foundation design or building-code compliance.
          </p>
          <p>
            Material quantities may also depend on product coverage, package size, installation method, waste, site conditions and manufacturer specifications. For construction work where accuracy, safety or regulatory compliance is critical, verify dimensions, project requirements and applicable specifications with project plans and qualified construction, architectural or engineering professionals as appropriate.
          </p>
        </section>

        {/* Section 20: Final Takeaway */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Final Takeaway
          </h2>
          <p>
            Square footage is straightforward when the geometry is understood, but accurate estimates depend on using the right formula and the right measurements. Use a rectangle formula for rectangular areas, circular formulas for circles and sectors, Heron&apos;s formula when three triangle sides are known, subtraction for borders and rings, and decomposition when a floor plan contains several different shapes.
          </p>
          <p>
            For practical projects, keep the geometric area separate from later decisions about waste, material coverage, labor and price. That gives you a clearer estimate, makes errors easier to find, and provides a more reliable foundation for planning the work.
          </p>
        </section>
      </div>

      {/* ── FAQ SECTION (15 Approved FAQs, Open / Unfolded by Default) ── */}
      <div className="pt-6 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
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
              href="/calculators/tile-calculator"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 shadow-xs transition-colors"
            >
              Tile Calculator
            </Link>
            <Link
              href="/calculators/roofing-calculator"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 shadow-xs transition-colors"
            >
              Roofing Calculator
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default SquareFootageContent;
