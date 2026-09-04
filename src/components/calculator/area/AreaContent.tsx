"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Compass,
  Maximize,
  Grid,
  ExternalLink
} from "lucide-react";
import { areaFaqs } from "@/app/calculators/area-calculator/faq";

export function AreaContent() {
  // All 16 FAQs open by default (401(k) style unfolded accordions)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 16 }, (_, i) => i))
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10">
      {/* ========================================================================= */}
      {/* 1. RELATED CALCULATORS — DIRECTLY ABOVE EDUCATIONAL CONTENT */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          Related Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <Link
            href="/calculators/triangle-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Triangle Area Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Solve triangle area using base and height, Heron&apos;s formula, SAS trigonometry, or coordinate geometry.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/volume-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Volume Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Extend 2D floor and base areas into 3D volume, liquid capacity, and container storage calculations.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/surface-area-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Surface Area Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculate total boundary and exterior surface area for prisms, cylinders, pyramids, cones, and spheres.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. INTRODUCTION & OVERVIEW */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Calculate the Area of 2D Shapes
        </h2>
        <p>
          Area is the amount of two-dimensional space enclosed by a shape. It is measured in square units, such as square meters (m²), square centimeters (cm²), square feet (ft²), square inches (in²), acres, and other area units.
        </p>
        <p>
          This <strong>area calculator</strong> lets you calculate the area of common geometric shapes by entering the dimensions you already know. Depending on the shape, you can also see related measurements such as perimeter, circumference, diagonals, apothem, unit conversions, and material requirements.
        </p>
        <p>
          Instead of remembering a different formula for every shape, choose the geometry you need, enter its measurements, and check the calculation. The tool supports standard shapes as well as more specialized cases such as Heron&apos;s formula triangles, circular sectors, annuli, regular polygons, and irregular polygons defined by coordinates.
        </p>
        <p>
          For simple shapes, the calculation is usually direct. For more complex shapes, the calculator applies the corresponding geometric formula and shows the result in the selected unit system.
        </p>

        {/* Quick Navigation Anchor Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5">
          <div className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Quick Navigation</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Use these links to jump directly to the mathematical method you need:
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            <a href="#rectangle-area" className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:underline">Rectangle area</a>
            <a href="#triangle-area" className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:underline">Triangle area</a>
            <a href="#circle-area" className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:underline">Circle area</a>
            <a href="#sector-and-annulus-area" className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:underline">Sector &amp; annulus area</a>
            <a href="#trapezoid-and-parallelogram-area" className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:underline">Trapezoid &amp; parallelogram</a>
            <a href="#rhombus-and-kite-area" className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:underline">Rhombus &amp; kite</a>
            <a href="#regular-polygon-area" className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:underline">Regular polygon</a>
            <a href="#irregular-polygon-area" className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:underline">Irregular polygon (coordinates)</a>
            <a href="#how-to-choose-the-correct-area-formula" className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:underline">Choose correct formula</a>
            <a href="#area-units-and-conversions" className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:underline">Units &amp; conversions</a>
            <a href="#worked-examples" className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:underline">Worked examples</a>
            <a href="#common-area-calculation-mistakes" className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:underline">Common mistakes</a>
            <a href="#frequently-asked-questions" className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:underline">FAQs</a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHAT DOES AREA MEAN? */}
      {/* ========================================================================= */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          What Does Area Mean?
        </h2>
        <p>
          Area describes how much surface a two-dimensional figure covers.
        </p>
        <p>
          A rectangle measuring 4 meters by 5 meters covers:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-center">
          4 × 5 = 20 m²
        </div>
        <p>
          The answer is expressed in square meters because the dimensions are measured in meters and two dimensions are multiplied together.
        </p>
        <p>
          This distinction matters:
        </p>
        <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-sm">
          <li><strong>Length</strong> is one-dimensional.</li>
          <li><strong>Perimeter</strong> measures the boundary of a shape.</li>
          <li><strong>Area</strong> measures the enclosed surface.</li>
          <li><strong>Volume</strong> measures three-dimensional space (explored further in our <Link href="/calculators/volume-calculator" className="text-blue-600 dark:text-blue-400 underline font-medium">Volume Calculator</Link>).</li>
        </ul>
        <p>
          For example, a room may have a floor area of 20 m² while its perimeter is measured in linear meters. Those are fundamentally different physical quantities and should not be confused.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 4. RECTANGLE AREA */}
      {/* ========================================================================= */}
      <section id="rectangle-area" className="space-y-3 pt-2">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Rectangle Area
        </h2>
        <p>
          A rectangle is one of the simplest shapes for calculating area because its opposite sides are equal and its angles are right angles.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">Formula</div>
          <div className="font-mono text-base font-bold text-blue-700 dark:text-blue-300">
            A = l × w
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            where <em>A</em> = area, <em>l</em> = length, and <em>w</em> = width.
          </p>
        </div>
        <p>
          The same basic relationship applies to a square. Because all sides of a square are equal:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-center">
          A = s²
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs sm:text-sm">
          <span className="font-bold text-slate-900 dark:text-white block">Example</span>
          <p>Suppose a rectangular floor is Length = 8 m, Width = 5 m.</p>
          <p className="font-mono font-semibold text-blue-600 dark:text-blue-400">
            A = 8 × 5 = 40 m²
          </p>
          <p>So the floor covers 40 square meters.</p>
        </div>
        <p>
          The rectangle and related elementary area formulas are standard geometry results documented by OpenStax.
        </p>
        <div className="space-y-1.5 text-xs sm:text-sm">
          <strong className="block text-slate-900 dark:text-white">Practical use:</strong>
          <p className="text-slate-600 dark:text-slate-400">
            Rectangle area is useful for floors, walls, rooms, gardens, sheets of material, rectangular lots, panels, tiles, and boards. When estimating materials, the geometric area may need to be increased to account for cutting waste, unusable sections, or installation losses.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TRIANGLE AREA */}
      {/* ========================================================================= */}
      <section id="triangle-area" className="space-y-3 pt-2">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Triangle Area
        </h2>
        <p>
          The most common triangle area formula uses the base and its perpendicular height. For solving complete triangles with side angles and trigonometric relationships, visit our dedicated <Link href="/calculators/triangle-calculator" className="text-blue-600 dark:text-blue-400 underline font-medium">Triangle Area Calculator</Link>.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">Formula</div>
          <div className="font-mono text-base font-bold text-blue-700 dark:text-blue-300">
            A = ½ × b × h
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            where <em>b</em> = base and <em>h</em> = perpendicular height.
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs sm:text-sm">
          <span className="font-bold text-slate-900 dark:text-white block">Example</span>
          <p>For a triangle with Base = 10 m and Height = 6 m:</p>
          <p className="font-mono font-semibold text-blue-600 dark:text-blue-400">
            A = ½ × 10 × 6 = 30 m²
          </p>
        </div>
        <div className="space-y-2 text-xs sm:text-sm">
          <strong className="block text-slate-900 dark:text-white">Why is there a one-half?</strong>
          <p className="text-slate-600 dark:text-slate-400">
            A triangle with a given base and perpendicular height occupies half the area of a parallelogram with the same base and height. That is the geometric reason for the factor of ½.
          </p>
          <strong className="block text-slate-900 dark:text-white">Important: height is not necessarily a side</strong>
          <p className="text-slate-600 dark:text-slate-400">
            For an angled triangle, the height is the perpendicular distance from the base to the opposite vertex. Using a sloping side as the height produces an incorrect area.
          </p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Triangle Area When All Three Sides Are Known (Heron&apos;s Formula)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            When the three side lengths are known but the height is not, Heron&apos;s formula can be used. First calculate the semiperimeter:
          </p>
          <div className="font-mono text-sm font-bold text-center py-1">
            s = (a + b + c) / 2
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">Then evaluate:</p>
          <div className="font-mono text-sm font-bold text-center py-1 text-blue-600 dark:text-blue-400">
            A = √[s(s - a)(s - b)(s - c)]
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For example, for sides 7, 8, and 9: <em>s</em> = (7 + 8 + 9)/2 = 12, so <em>A</em> = √[12(12-7)(12-8)(12-9)] = √720 ≈ 26.8328 square units.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CIRCLE AREA */}
      {/* ========================================================================= */}
      <section id="circle-area" className="space-y-3 pt-2">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Circle Area
        </h2>
        <p>
          For a circle, area depends on the radius.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">Formula</div>
          <div className="font-mono text-base font-bold text-blue-700 dark:text-blue-300">
            A = π × r²
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            where <em>A</em> = area, <em>r</em> = radius, and π ≈ 3.14159265359.
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs sm:text-sm">
          <span className="font-bold text-slate-900 dark:text-white block">Example</span>
          <p>For a circle with radius 5 m:</p>
          <p className="font-mono font-semibold text-blue-600 dark:text-blue-400">
            A = π × (5)² = 25π ≈ 78.5398 m²
          </p>
          <p>
            The corresponding circumference is <em>C = 2πr</em>, so for <em>r</em> = 5 m, <em>C</em> ≈ 31.4159 m.
          </p>
        </div>
        <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm space-y-1">
          <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Radius versus Diameter Warning
          </div>
          <p className="text-amber-900 dark:text-amber-200">
            A frequent mistake is entering the diameter as though it were the radius. If diameter is <em>d</em>, then <em>r = d / 2</em> and <em>A = π(d/2)²</em>. Do not substitute the full diameter into πr², which would overestimate area by a factor of 4.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SECTOR AND ANNULUS AREA */}
      {/* ========================================================================= */}
      <section id="sector-and-annulus-area" className="space-y-3 pt-2">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Sector and Annulus Area
        </h2>
        <p>
          A circular sector is a portion of a circle bounded by two radii and an arc. For an angle measured in degrees:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">Sector Formula</div>
          <div className="font-mono text-base font-bold text-blue-700 dark:text-blue-300">
            A_sector = (θ / 360°) × πr²
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The corresponding arc length is <em>L = (θ / 360°) × (2πr)</em>.
          </p>
        </div>
        <p className="text-xs sm:text-sm">
          For <em>r</em> = 10 m and θ = 90°: <em>A</em> = (90/360) × π(10)² = 25π ≈ 78.5398 m², and arc length <em>L</em> = 5π ≈ 15.7080 m.
        </p>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Annulus Area (Concentric Ring)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            An annulus is the ring-shaped region between two concentric circles. Its area is:
          </p>
          <div className="font-mono text-sm font-bold text-center py-1 text-blue-600 dark:text-blue-400">
            A = π(R² - r²)
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            where <em>R</em> = outer radius and <em>r</em> = inner radius. The inner radius must be smaller than the outer radius (0 &lt; r &lt; R). For <em>R</em> = 10 m and <em>r</em> = 5 m: <em>A</em> = π(10² - 5²) = 75π ≈ 235.6194 m².
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. TRAPEZOID AND PARALLELOGRAM AREA */}
      {/* ========================================================================= */}
      <section id="trapezoid-and-parallelogram-area" className="space-y-3 pt-2">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Trapezoid and Parallelogram Area
        </h2>
        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Trapezoid</h3>
          <p>
            A trapezoid has two parallel bases. If the bases are <em>b₁</em> and <em>b₂</em>, and perpendicular height is <em>h</em>:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-center">
            A = ½ × (b₁ + b₂) × h
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            For example, <em>b₁</em> = 10, <em>b₂</em> = 6, <em>h</em> = 4 yields <em>A</em> = ½(10 + 6)(4) = 32 square units. Do not use the slanted side as height; height is strictly the perpendicular distance between the parallel bases.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Parallelogram</h3>
          <p>
            The area of a parallelogram is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-center">
            A = b × h
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            For <em>b</em> = 10 and <em>h</em> = 6, <em>A</em> = 10 × 6 = 60 square units. Even when tilted, area depends on base and perpendicular height rather than the sloping side.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. RHOMBUS AND KITE AREA */}
      {/* ========================================================================= */}
      <section id="rhombus-and-kite-area" className="space-y-3 pt-2">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Rhombus and Kite Area
        </h2>
        <p>
          For a rhombus or kite, a convenient formula uses its perpendicular diagonals:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">Diagonal Formula</div>
          <div className="font-mono text-base font-bold text-blue-700 dark:text-blue-300 text-center">
            A = ½ × d₁ × d₂
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For example, if diagonals are <em>d₁</em> = 10 and <em>d₂</em> = 8, then <em>A</em> = (10 × 8) / 2 = 40 square units. Be careful to use actual diagonal lengths rather than arbitrary side lengths.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. REGULAR POLYGON AREA */}
      {/* ========================================================================= */}
      <section id="regular-polygon-area" className="space-y-3 pt-2">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Regular Polygon Area
        </h2>
        <p>
          A regular polygon has equal side lengths and equal interior angles (equilateral triangles, squares, regular pentagons, hexagons, octagons). For a regular polygon, area can be calculated with the apothem and perimeter:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="font-mono text-base font-bold text-blue-700 dark:text-blue-300 text-center">
            A = ½ × a × p
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            where <em>a</em> = apothem (inradius perpendicular from center to side midpoint), and <em>p = n × s</em> is perimeter.
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs sm:text-sm">
          <span className="font-bold text-slate-900 dark:text-white block">Example: Regular Hexagon</span>
          <p>For <em>n</em> = 6 sides with side length <em>s</em> = 5 m:</p>
          <p>Perimeter <em>p</em> = 6 × 5 = 30 m.</p>
          <p>Apothem <em>a</em> = 5 / [2 tan(π/6)] ≈ 4.3301 m.</p>
          <p className="font-mono font-semibold text-blue-600 dark:text-blue-400">
            A = ½ × 4.3301 × 30 ≈ 64.9519 m²
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. IRREGULAR POLYGON AREA (SHOELACE FORMULA) */}
      {/* ========================================================================= */}
      <section id="irregular-polygon-area" className="space-y-3 pt-2">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Irregular Polygon Area (Shoelace Formula)
        </h2>
        <p>
          Irregular polygons do not have one simple formula based only on a small number of side lengths. When the vertices are known as Cartesian coordinates, the Shoelace Formula provides a systematic way to calculate the area of a simple polygon.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">Gauss Area / Shoelace Algorithm</div>
          <div className="font-mono text-base font-bold text-blue-700 dark:text-blue-300 text-center">
            {"A = ½ |∑(x_i y_{i+1} - x_{i+1} y_i)|"}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            with the last vertex connected back to the first vertex. This method is documented by Wolfram MathWorld as Gauss&apos;s area formula or the surveyor&apos;s formula.
          </p>
        </div>
        <p className="text-xs sm:text-sm">
          For vertices (0,0), (10,0), (10,6), (4,10), and (0,6), the calculator evaluates the signed coordinate determinants directly to return an exact area of <strong>80 square units</strong> and perimeter of approximately <strong>34.87 units</strong>.
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
          <strong className="text-slate-900 dark:text-white block">Important condition:</strong>
          <p className="text-slate-600 dark:text-slate-400">
            Vertices should describe the boundary in sequence (either clockwise or counterclockwise) and form a non-self-intersecting simple polygon.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. HOW TO CHOOSE THE CORRECT AREA FORMULA (COMPARISON TABLE) */}
      {/* ========================================================================= */}
      <section id="how-to-choose-the-correct-area-formula" className="space-y-3 pt-2">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          How to Choose the Correct Area Formula
        </h2>
        <p>
          The easiest way to select a formula is to start with the geometric information you actually know:
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Shape</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Typical Inputs</th>
                <th className="p-3 border-b border-slate-200 dark:border-slate-700">Area Formula</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-xs">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold">Rectangle</td>
                <td className="p-3 font-sans">length, width</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = l × w</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold">Square</td>
                <td className="p-3 font-sans">side (s)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = s²</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold">Triangle</td>
                <td className="p-3 font-sans">base, perpendicular height</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = ½ × b × h</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold">Triangle (3 sides)</td>
                <td className="p-3 font-sans">sides a, b, c</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">Heron: √[s(s-a)(s-b)(s-c)]</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold">Circle</td>
                <td className="p-3 font-sans">radius (r)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = π × r²</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold">Circular Sector</td>
                <td className="p-3 font-sans">radius, central angle θ</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = (θ / 360°) × πr²</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold">Annulus (Ring)</td>
                <td className="p-3 font-sans">outer R, inner r</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = π(R² - r²)</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold">Trapezoid</td>
                <td className="p-3 font-sans">bases b₁, b₂, height h</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = ½(b₁ + b₂)h</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold">Parallelogram</td>
                <td className="p-3 font-sans">base b, height h</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = b × h</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold">Rhombus / Kite</td>
                <td className="p-3 font-sans">diagonals d₁, d₂</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = ½ × d₁ × d₂</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold">Regular Polygon</td>
                <td className="p-3 font-sans">side count n, side s / apothem a</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">A = ½ × a × p</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold">Irregular Polygon</td>
                <td className="p-3 font-sans">Cartesian vertices (x, y)</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">{"Shoelace: ½|∑(x_i y_{i+1} - x_{i+1} y_i)|"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. AREA UNITS AND CONVERSIONS */}
      {/* ========================================================================= */}
      <section id="area-units-and-conversions" className="space-y-3 pt-2">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Area Units and Conversions
        </h2>
        <p>
          Area units are squared because area measures two dimensions:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center">
          1 m = 100 cm, but 1 m² = 100 cm × 100 cm = 10,000 cm²
        </div>
        <p>
          Similarly, 1 ft² is an area unit (144 in²), not a linear foot measurement. Key international standards (NIST SP 811) include:
        </p>
        <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-mono">
          <li>1 m² ≈ 10.7639 ft²</li>
          <li>1 ft² = 0.09290304 m²</li>
          <li>1 acre = 43,560 ft² = 4,046.8564 m²</li>
          <li>1 hectare (ha) = 10,000 m² ≈ 2.47105 acres</li>
          <li>1 square mile (sq mi) = 640 acres ≈ 2,589,988.11 m²</li>
        </ul>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <strong>Why you should not convert dimensions incorrectly:</strong> If a rectangle is 2 m × 3 m, its area is 6 m². To express this in square feet, multiply by the area factor (6 × 10.7639 ≈ 64.58 ft²). Do not convert 2 m to feet and then multiply by an area factor again, which would double-count the conversion.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 14. WORKED EXAMPLES */}
      {/* ========================================================================= */}
      <section id="worked-examples" className="space-y-4 pt-2">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Worked Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs sm:text-sm">
            <span className="font-bold text-slate-900 dark:text-white block">Example 1: Rectangular Room</span>
            <p className="text-slate-600 dark:text-slate-400">Length = 4.5 m, Width = 3.2 m.</p>
            <p className="font-mono font-bold text-blue-600 dark:text-blue-400">A = 4.5 × 3.2 = 14.4 m²</p>
            <p className="text-slate-500 text-xs">The room has 14.4 m² of floor area.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs sm:text-sm">
            <span className="font-bold text-slate-900 dark:text-white block">Example 2: Circular Garden</span>
            <p className="text-slate-600 dark:text-slate-400">Radius = 4 m.</p>
            <p className="font-mono font-bold text-blue-600 dark:text-blue-400">A = π × (4)² = 16π ≈ 50.2655 m²</p>
            <p className="text-slate-500 text-xs">Approximately 50.27 m² of ground is enclosed.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs sm:text-sm">
            <span className="font-bold text-slate-900 dark:text-white block">Example 3: Triangular Panel</span>
            <p className="text-slate-600 dark:text-slate-400">Base = 12 ft, Height = 7 ft.</p>
            <p className="font-mono font-bold text-blue-600 dark:text-blue-400">A = ½ × 12 × 7 = 42 ft²</p>
            <p className="text-slate-500 text-xs">Enclosed panel area is 42 square feet.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs sm:text-sm">
            <span className="font-bold text-slate-900 dark:text-white block">Example 4: Trapezoid</span>
            <p className="text-slate-600 dark:text-slate-400">Parallel sides = 12 m and 8 m, Height = 5 m.</p>
            <p className="font-mono font-bold text-blue-600 dark:text-blue-400">A = ½(12 + 8)(5) = 50 m²</p>
            <p className="text-slate-500 text-xs">Enclosed trapezoidal surface is 50 square meters.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs sm:text-sm">
            <span className="font-bold text-slate-900 dark:text-white block">Example 5: Regular Hexagon</span>
            <p className="text-slate-600 dark:text-slate-400">Side = 5 m, Perimeter = 30 m, Apothem ≈ 4.3301 m.</p>
            <p className="font-mono font-bold text-blue-600 dark:text-blue-400">A = ½ × 4.3301 × 30 ≈ 64.9519 m²</p>
            <p className="text-slate-500 text-xs">Hexagon area is approximately 64.95 m².</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs sm:text-sm">
            <span className="font-bold text-slate-900 dark:text-white block">Example 6: Coordinate Irregular Polygon</span>
            <p className="text-slate-600 dark:text-slate-400">Points (0,0), (10,0), (10,6), (4,10), (0,6).</p>
            <p className="font-mono font-bold text-blue-600 dark:text-blue-400">Shoelace Area = 80 m² (P ≈ 34.87 m)</p>
            <p className="text-slate-500 text-xs">Evaluates signed vertex determinant sums directly.</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 15. AREA VS PERIMETER & MATERIAL ESTIMATES */}
      {/* ========================================================================= */}
      <section id="area-vs-perimeter" className="space-y-4 pt-2">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Area vs Perimeter: What Is the Difference?
        </h2>
        <p>
          Area and perimeter answer fundamentally different questions:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-500">Area</span>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">How much surface does the shape cover?</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Measured in 2D squared units (m², ft², in²).</p>
            <p className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">10m × 5m → A = 50 m²</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-500">Perimeter</span>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">How long is the complete boundary?</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Measured in 1D linear units (m, ft, in).</p>
            <p className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">2(10 + 5) → P = 30 m</p>
          </div>
        </div>

        <div id="material-estimates" className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 pt-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Using Area for Material Estimates
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Geometric area is often the first step in estimating material quantities. Suppose a floor has an area of 50 m² and you anticipate a 10% cutting waste margin:
          </p>
          <div className="font-mono text-xs font-bold text-center py-1">
            Total Material = 50 × (1 + 0.10) = 55 m²
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            At a unit cost of $20 per square meter, the total estimated cost is 55 × $20 = <strong>$1,100</strong>. This planning estimate provides transparency before purchasing materials.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 16. COMMON MISTAKES & VALIDATION */}
      {/* ========================================================================= */}
      <section id="common-area-calculation-mistakes" className="space-y-3 pt-2">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Common Area-Calculation Mistakes
        </h2>
        <div className="space-y-2.5 text-xs sm:text-sm">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-red-600 dark:text-red-400">1. Using the wrong height</span>
            <p className="text-slate-600 dark:text-slate-400">For triangles, parallelograms, and trapezoids, height strictly denotes the perpendicular distance, never an arbitrary sloping edge.</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-red-600 dark:text-red-400">2. Confusing radius and diameter</span>
            <p className="text-slate-600 dark:text-slate-400">Substituting diameter into πr² produces an area four times too large because the radius is squared.</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-red-600 dark:text-red-400">3. Mixing incompatible units</span>
            <p className="text-slate-600 dark:text-slate-400">Calculating length in meters and width in feet without converting to a common unit causes substantial mathematical error.</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-red-600 dark:text-red-400">4. Forgetting that area is squared</span>
            <p className="text-slate-600 dark:text-slate-400">Linear unit conversions cannot be directly applied to area results without squaring the conversion ratio.</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-red-600 dark:text-red-400">5. Using the wrong polygon method</span>
            <p className="text-slate-600 dark:text-slate-400">Regular polygons use side count and apothem, whereas irregular plots require Cartesian coordinates and the Shoelace formula.</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-red-600 dark:text-red-400">6. Ignoring geometric domain validity</span>
            <p className="text-slate-600 dark:text-slate-400">An annulus requires r &lt; R, triangle sides must satisfy the triangle inequality, and polygons require n ≥ 3. The calculator explicitly rejects invalid inputs rather than silently clamping.</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 17. FORMULA REFERENCE BOX */}
      {/* ========================================================================= */}
      <section className="space-y-3 pt-2">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Core Formulas at a Glance
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs font-bold text-center">
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">Rectangle: A = lw</div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">Square: A = s²</div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">Triangle: A = ½bh</div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">Circle: A = πr²</div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">Sector: A = (θ/360)πr²</div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">Annulus: A = π(R² - r²)</div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">Trapezoid: A = ½(b₁+b₂)h</div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">Parallelogram: A = bh</div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">Rhombus: A = ½d₁d₂</div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">Regular: A = ½ap</div>
          <div className="col-span-2 sm:col-span-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">
            Shoelace: A = ½|∑(x_i y_{`{i+1}`} - x_{`{i+1}`} y_i)|
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 18. FAQS ACCORDION SECTION (16 APPROVED FAQS, OPEN BY DEFAULT) */}
      {/* ========================================================================= */}
      <section id="frequently-asked-questions" className="pt-4 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {areaFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs"
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50 font-normal border-t border-slate-100 dark:border-slate-800/60 mt-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 19. REFERENCES & METHODOLOGY */}
      {/* ========================================================================= */}
      <section className="pt-4 space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          References and Methodology
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <p>
            For additional mathematical background and verification standards, consult the following authoritative references:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>OpenStax — Geometric Formulas:</strong> Describes standard elementary area relationships for rectangles, triangles, circles, parallelograms, trapezoids, rhombi, and regular polygons.
            </li>
            <li>
              <strong>Wolfram MathWorld — Shoelace Formula:</strong> Authoritative reference for the coordinate-based polygon area formula, also known as Gauss&apos;s area formula or the surveyor&apos;s formula.
            </li>
            <li>
              <strong>NIST (National Institute of Standards and Technology) — Special Publication 811:</strong> Official conversion factors for U.S. customary measures and SI metric area units (square meters, square feet, square yards, acres, and hectares).
            </li>
          </ul>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 20. BOTTOM RELATED CALCULATORS — PLACED ONCE AFTER ARTICLE */}
      {/* ========================================================================= */}
      <section className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Related Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <Link
            href="/calculators/triangle-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Triangle Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Solve sides, angles, area, perimeter, inradius, and circumradius step by step.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/volume-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Volume Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculate 3D volumes and tank capacities with exact unit conversions.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/surface-area-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Surface Area Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculate surface area and nets for polyhedra and curved 3D solids.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </article>
  );
}

export default AreaContent;
