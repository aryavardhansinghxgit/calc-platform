"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, Layers, CheckCircle2 } from "lucide-react";

export function SurfaceAreaContent() {
  // All 17 FAQs unfolded/open by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 17 }, (_, i) => i))
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
      q: "What is a surface area calculator?",
      a: "A surface area calculator is a specialized geometric tool that uses the dimensions of a three-dimensional object to determine the area of its exterior surfaces. The required formula depends on the solid shape and on whether all surfaces, only lateral/curved surfaces, or selected open faces are included."
    },
    {
      q: "How do I calculate surface area?",
      a: "First identify the shape, then enter its required dimensions and apply the corresponding formula. For example, the surface area of a sphere is 4πr², while a closed cylinder uses 2πr(r + h)."
    },
    {
      q: "What is the formula for surface area of a sphere?",
      a: "The surface area of a sphere is A = 4πr² = πd², where r is the radius and d is the diameter."
    },
    {
      q: "What is the formula for surface area of a cylinder?",
      a: "For a closed solid cylinder: A = 2πr² + 2πrh = 2πr(r + h). The curved lateral surface area alone is 2πrh, while the two circular base ends contribute 2πr²."
    },
    {
      q: "What is the surface area of a cone?",
      a: "For a right circular cone: A = πr(r + s), where s = √(r² + h²) is the slant height. The lateral area is πrs and the circular base is πr²."
    },
    {
      q: "What is the difference between total and lateral surface area?",
      a: "Total surface area (TSA) includes all surfaces bounding the solid, including top and bottom bases. Lateral surface area (LSA) refers strictly to the vertical side walls or curved boundaries, excluding base ends."
    },
    {
      q: "How do I calculate the surface area of a cube?",
      a: "For a cube with side length a: A = 6a², because a cube consists of six congruent square faces of area a²."
    },
    {
      q: "How do I calculate the surface area of a rectangular prism?",
      a: "For a rectangular box with length l, width w, and height h: A = 2(lw + lh + wh). An open-top container uses A = lw + 2(lh + wh)."
    },
    {
      q: "What is the surface area of a hemisphere?",
      a: "For the curved dome portion alone: A_curved = 2πr². For a closed solid hemisphere including its circular base: A_closed = 3πr²."
    },
    {
      q: "How is the surface area of a hollow pipe calculated?",
      a: "A hollow pipe has both outer and inner cylindrical surfaces plus two annular end rings: A = 2πRh + 2πrh + 2π(R² - r²), where R is the outer radius and r is the inner radius."
    },
    {
      q: "Can I calculate the surface area of a conical frustum?",
      a: "Yes. For larger radius R, smaller radius r, and height h, the slant height is s = √((R - r)² + h²), and the total surface area is A = π(R + r)s + πR² + πr²."
    },
    {
      q: "Is ellipsoid surface area exact?",
      a: "For a general triaxial ellipsoid, there is no simple elementary exact formula. This calculator uses the Knud Thomsen approximation with exponent p = 1.6075, achieving a maximum relative error under 1.061%."
    },
    {
      q: "What units does surface area use?",
      a: "Surface area uses squared units such as square meters (m²), square centimeters (cm²), square feet (ft²), square inches (in²), and square yards (yd²). Large land areas are commonly expressed in acres or hectares."
    },
    {
      q: "Why can surface area and volume have similar-looking formulas but different units?",
      a: "Surface area measures a two-dimensional boundary and therefore scales with r² and uses squared units. Volume measures the three-dimensional space enclosed and scales with r³, using cubic units."
    },
    {
      q: "Can I save my surface area calculations?",
      a: "Yes. The calculator supports saved calculation history with instant Load/Restore functionality so previously entered values can be reloaded into the active inputs with a single click."
    },
    {
      q: "Can I export a surface area calculation?",
      a: "The calculator supports copying mathematical text summaries, copying LaTeX formulas, CSV spreadsheet export, and clean printable reports."
    },
    {
      q: "How does the square pyramid slant height differ from vertical height?",
      a: "The vertical height h is perpendicular to the center of the base, while the slant height s is measured along the triangular face from the apex to the edge midpoint: s = √((a/2)² + h²)."
    }
  ];

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* ========================================================================= */}
      {/* QUICK-ACCESS RELATED CALCULATORS BAR (PLACED ONCE BEFORE CONTENT) */}
      {/* ========================================================================= */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          Related Calculators:
        </span>
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <Link
            href="/calculators/volume-calculator"
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-bold hover:border-blue-500 transition-colors shadow-2xs"
          >
            Volume Calculator
          </Link>
          <Link
            href="/calculators/area-calculator"
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-bold hover:border-blue-500 transition-colors shadow-2xs"
          >
            Area Calculator
          </Link>
          <Link
            href="/calculators/circle-calculator"
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-bold hover:border-blue-500 transition-colors shadow-2xs"
          >
            Circle Calculator
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 19 COMPREHENSIVE EDUCATIONAL CONTENT SECTIONS */}
      {/* ========================================================================= */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Surface Area Calculator: Find the Area of 3D Shapes
          </h2>
          <p>
            Surface area is the total area covering the outside of a three-dimensional object. It is measured in square units such as square meters (m²), square centimeters (cm²), square feet (ft²), or square inches (in²). A surface area calculator makes it possible to find the required area directly from the dimensions of a solid while also showing the underlying formulas, intermediate calculations, and related measurements.
          </p>
          <p>
            This calculator is designed as a multi-shape surface area suite rather than a single-formula tool. It can calculate the surface area of common solids including spheres, hemispheres, cones, conical frustums, cylinders, hollow pipes, rectangular prisms, cubes, square pyramids, capsules and ellipsoids. It also includes an integrated surface-area unit conversion matrix and complements spatial tools such as our{" "}
            <Link href="/calculators/volume-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Volume Calculator
            </Link>{" "}
            and{" "}
            <Link href="/calculators/area-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Area Calculator
            </Link>.
          </p>
          <p>
            For many practical engineering and trade problems, the important question is not simply &quot;What is the surface area?&quot; but which specific surfaces should be included? A closed cylinder, for example, has two circular ends and a curved side, while an open container excludes one of those surfaces. The calculator therefore distinguishes between total, lateral, curved and component areas wherever that distinction matters.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. What Does Surface Area Mean?
          </h2>
          <p>
            Surface area measures the total area of the two-dimensional surfaces that bound a three-dimensional object. Think of a solid as if it were covered with a thin layer of paint: the exact amount of exposed two-dimensional area that would need to be coated represents its surface area.
          </p>
          <p>
            For a solid composed of multiple planar or curved faces:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 font-mono font-bold text-blue-600 dark:text-blue-400">
            A_total = A₁ + A₂ + A₃ + ...
          </div>
          <p>
            The exact formula depends entirely on the geometry:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A sphere has one continuous curved surface.</li>
            <li>A cylinder has two circular bases plus one curved lateral surface.</li>
            <li>A rectangular prism has six rectangular faces arranged in opposite congruent pairs.</li>
            <li>A cone has one circular base and one curved lateral surface tapering to an apex.</li>
            <li>A hollow pipe has both an outer cylindrical surface and an inner cylindrical surface, plus two annular ring ends.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Total Surface Area vs. Lateral or Curved Surface Area
          </h2>
          <p>
            One of the most common pitfalls in practical geometry is confusing total surface area with lateral surface area.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 block">Total Surface Area (TSA)</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Includes every exterior surface belonging to the chosen solid. For a closed cylinder:
              </p>
              <div className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                A_TSA = 2πr² + 2πrh = 2πr(r + h)
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 block">Lateral Surface Area (LSA)</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Includes only the vertical side surface and strictly excludes flat base ends:
              </p>
              <div className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                A_LSA = 2πrh (Cylinder) | A_LSA = πrs (Cone)
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            <strong>Why the distinction matters:</strong> If a cylindrical storage tank is closed, its top and bottom must be included in the total area. If you are calculating insulation or sheet metal to wrap only around the curved side walls, you need the lateral area instead.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Surface Area Formulas for Common 3D Shapes
          </h2>
          <p>
            The calculator covers several fundamental solids, each with its own rigorous geometric relationship:
          </p>

          {/* Sphere */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Sphere</h3>
            <p className="text-xs">
              For a sphere of radius r (diameter d = 2r):
            </p>
            <div className="font-mono font-bold text-blue-600 dark:text-blue-400">
              A = 4πr² = πd²
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Example: For r = 5, A = 4π(5²) = 100π ≈ 314.1593 square units.
            </p>
          </div>

          {/* Hemisphere */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Hemisphere</h3>
            <p className="text-xs">
              A hemisphere is half of a sphere geometrically, but its surface area depends on whether the circular base is included:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
              <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                Curved Surface: A_curved = 2πr²
              </div>
              <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                Closed Hemisphere: A_closed = 3πr²
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              For r = 5: A_curved = 50π ≈ 157.0796, while A_closed = 75π ≈ 235.6194.
            </p>
          </div>

          {/* Cylinder */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Cylinder &amp; Hollow Pipe</h3>
            <p className="text-xs">
              For a closed solid cylinder with radius r and height h:
            </p>
            <div className="font-mono font-bold text-blue-600 dark:text-blue-400">
              A_TSA = 2πr(r + h) = 2πr² + 2πrh
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              For a hollow pipe with outer radius R, inner radius r, and height h (where R &gt; r &gt; 0):
            </p>
            <div className="font-mono font-bold text-blue-600 dark:text-blue-400">
              A_pipe = 2πRh + 2πrh + 2π(R² - r²)
            </div>
          </div>

          {/* Cone & Frustum */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Right Cone &amp; Conical Frustum</h3>
            <p className="text-xs">
              For a right circular cone, slant height s = √(r² + h²), giving:
            </p>
            <div className="font-mono font-bold text-blue-600 dark:text-blue-400">
              A_TSA = πr(r + s) = πr² + πrs
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              For a conical frustum with base radius R, top radius r, and height h:
            </p>
            <div className="font-mono font-bold text-blue-600 dark:text-blue-400">
              s = √((R - r)² + h²) | A_TSA = π(R + r)s + πR² + πr²
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Rectangular Prism and Cube Surface Area
          </h2>
          <p>
            A rectangular prism (box) has length l, width w, and height h:
          </p>
          <div className="font-mono font-bold text-blue-600 dark:text-blue-400 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            A_closed = 2(lw + lh + wh)
          </div>
          <p>
            For open-top containers or tanks:
          </p>
          <div className="font-mono font-bold text-blue-600 dark:text-blue-400 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            A_open = lw + 2(lh + wh) | 4 Side Walls: A_walls = 2h(l + w)
          </div>
          <p>
            For a cube where all six faces are congruent squares of side a:
          </p>
          <div className="font-mono font-bold text-blue-600 dark:text-blue-400 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            A_cube = 6a²
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Square Pyramid &amp; Tetrahedron Surface Area
          </h2>
          <p>
            For a regular square pyramid with base side a and vertical height h, the slant height s of each triangular face is:
          </p>
          <div className="font-mono font-bold text-blue-600 dark:text-blue-400 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            s = √((a/2)² + h²) | A_TSA = a² + 2as
          </div>
          <p>
            For a regular tetrahedron with 4 congruent equilateral triangular faces of edge a:
          </p>
          <div className="font-mono font-bold text-blue-600 dark:text-blue-400 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            A_tetra = √3 a²
          </div>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Capsule Surface Area
          </h2>
          <p>
            A capsule consists of a cylindrical body of radius r and height h capped by two hemispherical ends. Together, the two ends form one complete sphere of area 4πr², while the cylindrical wall contributes 2πrh:
          </p>
          <div className="font-mono font-bold text-blue-600 dark:text-blue-400 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            A = 4πr² + 2πrh = 2πr(2r + h) | Total Length: L = h + 2r
          </div>
          <p className="text-xs text-slate-500">
            Note: Dimension h in the capsule model represents the cylindrical middle section length, not the total tip-to-tip length L.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Ellipsoid Surface Area (Knud Thomsen Approximation)
          </h2>
          <p>
            Unlike a sphere, a general triaxial ellipsoid with distinct semi-axes a, b, and c cannot be expressed with elementary functions. The calculator applies the widely acclaimed Knud Thomsen formula:
          </p>
          <div className="font-mono font-bold text-blue-600 dark:text-blue-400 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            A ≈ 4π · [((ab)^p + (ac)^p + (bc)^p) / 3]^(1/p) (where p = 1.6075)
          </div>
          <p className="text-xs text-slate-500">
            This approximation achieves a maximum relative error under 1.061% compared to numerical elliptic integrals and is clearly designated as an approximation in the suite.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. How to Use the Surface Area Calculator
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Choose the appropriate shape:</strong> Select Sphere, Cone, Cylinder, Box, Pyramid, Capsule, Ellipsoid, or the Unit Converter.</li>
            <li><strong>Enter valid dimensions:</strong> Input real positive numbers without silent coercion or clamping.</li>
            <li><strong>Inspect intermediate metrics:</strong> Review lateral area, base area, slant height, volume, and exact π representations.</li>
            <li><strong>Select precision:</strong> Toggle between 2, 4, or 6 decimal places according to your engineering needs.</li>
            <li><strong>Use dynamic visual diagrams:</strong> Check the reactive SVG diagram to confirm your dimensional proportions.</li>
            <li><strong>Save or export:</strong> Restore previous calculations with one click or export clean CSV reports.</li>
          </ol>
        </section>

        {/* Section 10 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Worked Surface Area Examples
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 block">Example 1: Sphere (r = 5)</strong>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-0.5">
                <div>A = 4πr² = 4π(25) = 100π</div>
                <div className="text-blue-600 dark:text-blue-400 font-bold">A ≈ 314.1593</div>
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 block">Example 2: Cylinder (r = 4, h = 10)</strong>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-0.5">
                <div>A = 2π(4)(4 + 10) = 112π</div>
                <div className="text-blue-600 dark:text-blue-400 font-bold">A ≈ 351.8584</div>
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 block">Example 3: Prism (l = 6, w = 4, h = 5)</strong>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-0.5">
                <div>A = 2(24 + 30 + 20)</div>
                <div className="text-blue-600 dark:text-blue-400 font-bold">A = 148</div>
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 block">Example 4: Pyramid (a = 6, h = 4)</strong>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-0.5">
                <div>s = √(3² + 4²) = 5 | A = 36 + 2(6)(5)</div>
                <div className="text-blue-600 dark:text-blue-400 font-bold">A = 96</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Surface Area Units and Conversion
          </h2>
          <p>
            Because surface area measures a two-dimensional boundary, linear conversion factors must always be squared:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              1 m² = 10.7639 ft²
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              1 m² = 10,000 cm²
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              1 m² = 1,550.003 in²
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Converting 5 m² to cm² requires multiplying by 100² (10,000) to yield 50,000 cm², not 500 cm².
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. When to Use Total Surface Area, Lateral Area or Base Area
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Painting a closed object:</strong> Use Total Surface Area (TSA).</li>
            <li><strong>Insulating or wrapping cylindrical pipes:</strong> Use Lateral Surface Area (LSA).</li>
            <li><strong>Fabricating an open-top tank:</strong> Use the open-top formula (exclude the top base).</li>
            <li><strong>Evaluating internal pipe friction or fluid contact:</strong> Use the inner cylindrical surface area.</li>
          </ul>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Common Surface Area Mistakes
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Confusing radius and diameter:</strong> Substituting d = 10 into A = 4πr² instead of r = 5 quadruples the true area.</li>
            <li><strong>Forgetting open-top adjustments:</strong> Including 2 bases when ordering paint for an open water trough or tank.</li>
            <li><strong>Mixing linear and area conversions:</strong> Forgetting to square conversion factors.</li>
            <li><strong>Treating hollow pipes as solid cylinders:</strong> Omitting the internal bore wall area.</li>
          </ul>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Surface Area for Engineering, Construction and Everyday Problems
          </h2>
          <p>
            Surface area calculations are critical when sizing industrial coatings, architectural waterproofing, heat exchangers, cooling fins, cardboard packaging blanks, and aerospace thermal protection systems.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Surface Area vs. Volume
          </h2>
          <p>
            Surface area scales with length squared (L²), whereas volume scales with length cubed (L³). When a shape doubles in linear dimensions, its surface area quadruples (×4), while its volume octuples (×8). To compute three-dimensional capacities, pair your results with our{" "}
            <Link href="/calculators/volume-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Volume Calculator
            </Link>{" "}
            or explore planar sections with the{" "}
            <Link href="/calculators/circle-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Circle Calculator
            </Link>.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. How to Check Whether a Surface Area Answer Is Reasonable
          </h2>
          <p>
            Perform a quick mental scale check: doubling every linear dimension must increase surface area by exactly 2² = 4. If an answer differs by an unexpected factor of 10 or 100, verify radius vs. diameter or check squared unit conversions.
          </p>
        </section>

        {/* Section 17: FAQs (Unfolded by default) */}
        <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              17. Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndices.has(idx);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-blue-600 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800 pt-2.5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Surface Area Calculation Checklist
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>The selected geometric shape matches the physical object.</li>
            <li>Radius and diameter are not confused.</li>
            <li>All dimensions use consistent linear units.</li>
            <li>Total, lateral, or open-top definitions are selected deliberately.</li>
            <li>Hollow items use separate inner and outer radii.</li>
          </ul>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Final Takeaway
          </h2>
          <p>
            A reliable surface area calculator should make clear which geometric model is being solved, which surfaces are included, what formula produced the result, and which units apply. By pairing 8 complete calculation modules with reactive 3D diagrams, formula breakdowns, and export capabilities, this suite ensures both mathematical rigor and practical usability.
          </p>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* EXPLORE RELATED CALCULATORS (PLACED ONCE AFTER THE CONTENT) */}
      {/* ========================================================================= */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Explore Related Calculators
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Complement your 3D surface area calculations with these dedicated geometric, volumetric, and dimensional solvers:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <Link
            href="/calculators/volume-calculator"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-blue-500 hover:shadow-sm transition-all group"
          >
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm group-hover:underline mb-1">
              Volume Calculator
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Calculate the 3D capacity and internal displacement of spheres, cylinders, cones, and prisms.
            </p>
          </Link>
          <Link
            href="/calculators/area-calculator"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-blue-500 hover:shadow-sm transition-all group"
          >
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm group-hover:underline mb-1">
              Area Calculator
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Find the 2D surface area of composite planar shapes, polygons, and irregular figures.
            </p>
          </Link>
          <Link
            href="/calculators/circle-calculator"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-blue-500 hover:shadow-sm transition-all group"
          >
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm group-hover:underline mb-1">
              Circle Calculator
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Solve radius, diameter, circumference, and circular sector areas with step-by-step steps.
            </p>
          </Link>
        </div>
      </section>
    </article>
  );
}

export default SurfaceAreaContent;
