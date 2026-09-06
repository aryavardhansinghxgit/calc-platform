"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown } from "lucide-react";
import { right_triangle_calculatorFaqs } from "@/app/calculators/right-triangle-calculator/faq";

export function RightTriangleContent() {
  // All 12 FAQs open by default (unfolded)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: right_triangle_calculatorFaqs.length }, (_, i) => i))
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
      {/* 1. RELATED CALCULATORS — ABOVE CONTENT */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800/80">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          RELATED CALCULATORS:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Link
            href="/calculators/pythagorean-theorem-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            Pythagorean Theorem Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link
            href="/calculators/triangle-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            Triangle Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link
            href="/calculators/distance-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            Distance Calculator
          </Link>
        </div>
      </div>

      {/* 2. MAIN EDUCATIONAL BODY */}
      <div className="pt-6 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Right Triangle Calculator: Complete Guide to Sides, Angles, Area, Perimeter &amp; Trigonometry
          </h2>
          <p>
            A right triangle is one of the most useful shapes in mathematics, engineering, construction, surveying, physics, navigation, and everyday measurement. It is defined by one angle of exactly 90°, and once enough information is known, every other important measurement can be determined from the relationships between its sides and angles.
          </p>
          <p>
            This Right Triangle Calculator is designed to solve a complete right triangle rather than returning only a single missing value. Enter two suitable known measurements and the calculator can determine the remaining side lengths, both acute angles, area, perimeter, altitude to the hypotenuse, inradius, circumradius, median, trigonometric ratios, and related slope or grade values.
          </p>
          <p>
            The calculator also provides a visual triangle, step-by-step mathematical results, unit conversion, and validation for contradictory or physically impossible inputs. To explore foundational relationships between right-triangle sides, compare with our dedicated{" "}
            <Link
              href="/calculators/pythagorean-theorem-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline"
            >
              Pythagorean Theorem Calculator
            </Link>
            .
          </p>
        </section>

        {/* How to Use */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use the Right Triangle Calculator
          </h2>
          <p>
            For a standard right triangle, the two legs meet at the 90° angle and the hypotenuse is opposite the 90° angle.
          </p>
          <p>
            Use the calculator by entering the measurements you already know. Common starting combinations include:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>two legs</li>
            <li>a leg and the hypotenuse</li>
            <li>a leg and an acute angle</li>
            <li>the hypotenuse and an acute angle</li>
          </ul>
          <p>
            For example, entering a = 5 and b = 12 produces the classic 5-12-13 right triangle:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
            <div>c = 13</div>
            <div>α ≈ 22.6199°</div>
            <div>β ≈ 67.3801°</div>
            <div>Area = 30</div>
            <div>Perimeter = 30</div>
            <div>Altitude to the hypotenuse ≈ 4.6154</div>
            <div>Inradius = 2</div>
            <div>Circumradius = 6.5</div>
          </div>
          <p>
            The calculator keeps these quantities synchronized so that the displayed triangle, trigonometric values, geometric invariants, and derived measurements describe the same geometry. For non-right triangles or arbitrary polygons, visit our comprehensive{" "}
            <Link
              href="/calculators/triangle-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline"
            >
              Triangle Calculator
            </Link>
            .
          </p>
        </section>

        {/* What Is a Right Triangle */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Right Triangle?
          </h2>
          <p>
            A right triangle is a triangle containing exactly one right angle, measuring 90°. The other two angles are acute, so each is greater than 0° and less than 90°.
          </p>
          <p>The three sides are conventionally described as:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Leg a:</strong> the side opposite angle α</li>
            <li><strong>Leg b:</strong> the side opposite angle β</li>
            <li><strong>Hypotenuse c:</strong> the side opposite the 90° angle</li>
          </ul>
          <p>The hypotenuse is always the longest side of a right triangle.</p>
          <p>The three interior angles satisfy:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs">
            α + β + 90° = 180° ⇒ α + β = 90°
          </div>
          <p>
            This complementary-angle relationship is one of the quickest checks for a right-triangle calculation.
          </p>
        </section>

        {/* Pythagorean Theorem */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Pythagorean Theorem
          </h2>
          <p>
            The fundamental relationship between the three sides is the Pythagorean theorem:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
            a² + b² = c²
          </div>
          <p>where a and b are the legs and c is the hypotenuse.</p>
          <p>When both legs are known, the hypotenuse is:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs">
            c = √(a² + b²)
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Example: Finding the Hypotenuse
          </h3>
          <p>Suppose a = 3 and b = 4:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
            <div>c = √(3² + 4²)</div>
            <div>c = √(9 + 16)</div>
            <div>c = √25</div>
            <div>c = 5</div>
          </div>
          <p>
            So a triangle with legs 3 and 4 has a hypotenuse of 5. This is the well-known 3-4-5 Pythagorean triple. Coordinate distance on a Cartesian plane uses the exact same formulation; test this with our{" "}
            <Link
              href="/calculators/distance-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline"
            >
              Distance Calculator
            </Link>
            .
          </p>
        </section>

        {/* Finding a Missing Leg */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Finding a Missing Leg
          </h2>
          <p>
            If the hypotenuse and one leg are known, rearrange the Pythagorean theorem:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              For missing leg a: a = √(c² − b²)
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              For missing leg b: b = √(c² − a²)
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Example: 5-12-13 Triangle
          </h3>
          <p>Given b = 12 and c = 13:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
            <div>a = √(13² − 12²)</div>
            <div>a = √(169 − 144)</div>
            <div>a = √25</div>
            <div>a = 5</div>
          </div>
          <p>
            The hypotenuse must be greater than either leg. For example, c = 10 cannot be used with a = 15 because a side of length 15 cannot be longer than the hypotenuse of the same right triangle. The calculator explicitly validates contradictory side combinations instead of silently replacing them with another triangle.
          </p>
        </section>

        {/* Right Triangle Angles */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Right Triangle Angles
          </h2>
          <p>
            Because one angle is always 90°, only the two acute angles need to be determined:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs">
            α + β = 90°
          </div>
          <p>
            When the three sides are known, inverse trigonometric functions can be used to find the acute angles:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
            <div>α = arctan(a / b)</div>
            <div>or: α = arcsin(a / c)</div>
            <div>or: α = arccos(b / c)</div>
            <div>Once α is known: β = 90° − α</div>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Example: 5-12-13 Triangle
          </h3>
          <p>For a = 5, b = 12, c = 13:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
            <div>α = arctan(5 / 12) ≈ 22.6199°</div>
            <div>β = 90° − 22.6199° ≈ 67.3801°</div>
          </div>
          <p>The two acute angles therefore add to exactly 90°.</p>
        </section>

        {/* SOH-CAH-TOA */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            SOH-CAH-TOA for Right Triangles
          </h2>
          <p>
            The three primary right-triangle trigonometric ratios are sine, cosine, and tangent. A common mnemonic is SOH-CAH-TOA.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold block text-blue-600 dark:text-blue-400">Sine (SOH)</span>
              sin(α) = opposite / hypotenuse = a / c
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold block text-emerald-600 dark:text-emerald-400">Cosine (CAH)</span>
              cos(α) = adjacent / hypotenuse = b / c
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold block text-purple-600 dark:text-purple-400">Tangent (TOA)</span>
              tan(α) = opposite / adjacent = a / b
            </div>
          </div>
          <p>The calculator also evaluates the reciprocal trigonometric functions:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
            <div>cosecant: csc(α) = c / a</div>
            <div>secant: sec(α) = c / b</div>
            <div>cotangent: cot(α) = b / a</div>
          </div>
          <p>
            For the other acute angle β, the opposite and adjacent legs switch roles. These relationships follow directly from the side positions relative to the selected acute angle.
          </p>
        </section>

        {/* Area */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Area of a Right Triangle
          </h2>
          <p>
            The area of a right triangle is especially simple because the two perpendicular legs can be used as base and height:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
            A = 1/2 ab
          </div>
          <p>where a and b are the two legs.</p>
          <p>For a = 5, b = 12: A = 1/2 × 5 × 12 = 30 square units.</p>
          <p>
            If the side lengths are measured in meters, the area is in square meters. If they are measured in feet, the area is in square feet.
          </p>
        </section>

        {/* Perimeter */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Perimeter of a Right Triangle
          </h2>
          <p>The perimeter is the sum of all three side lengths:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
            P = a + b + c
          </div>
          <p>For a 5-12-13 triangle: P = 5 + 12 + 13 = 30 units.</p>
          <p>
            Perimeter and area measure different properties. Perimeter measures total boundary length, while area measures the two-dimensional region enclosed by the triangle.
          </p>
        </section>

        {/* Altitude to the Hypotenuse */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Altitude to the Hypotenuse
          </h2>
          <p>
            The altitude from the right-angle vertex to the hypotenuse is another important right-triangle quantity. If the legs are a and b and the hypotenuse is c, then:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
            h_c = ab / c
          </div>
          <p>For a 5-12-13 triangle: h_c = (5 × 12) / 13 = 60 / 13 ≈ 4.6154.</p>
          <p>
            The altitude can also be understood by equating two expressions for the same triangle area: 1/2 ab = 1/2 c h_c, which gives h_c = ab / c. This is useful when a problem asks for the perpendicular height to the hypotenuse rather than the height represented by either leg.
          </p>
        </section>

        {/* Inradius */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Inradius of a Right Triangle
          </h2>
          <p>
            The inradius is the radius of the circle that fits inside the triangle and touches all three sides. For a right triangle:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
            r = (a + b − c) / 2
          </div>
          <p>For a 5-12-13 triangle: r = (5 + 12 − 13) / 2 = 4 / 2 = 2.</p>
          <p>
            There is also a useful area relationship: A = r s, where s is the semiperimeter s = (a + b + c) / 2. For the 5-12-13 triangle, s = 30 / 2 = 15, and A = 2 × 15 = 30. This provides an independent check on the area.
          </p>
        </section>

        {/* Circumradius */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Circumradius of a Right Triangle
          </h2>
          <p>
            The circumradius is the radius of the circle passing through all three vertices. For every right triangle, a particularly simple relationship applies:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
            R = c / 2
          </div>
          <p>
            because the hypotenuse is the diameter of the circumcircle (Thales&apos;s Theorem). For c = 13: R = 13 / 2 = 6.5. This is one of the special geometric properties that makes right triangles especially convenient to analyze.
          </p>
        </section>

        {/* Median to the Hypotenuse */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Median to the Hypotenuse
          </h2>
          <p>
            The median drawn from the right-angle vertex to the midpoint of the hypotenuse also has a simple result:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
            m_c = c / 2
          </div>
          <p>
            Therefore, in a right triangle, the median to the hypotenuse has the same length as the circumradius: m_c = R = 6.5 for c = 13.
          </p>
        </section>

        {/* Slope, Grade, Roof Pitch */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Right Triangle Slope, Grade and Roof Pitch
          </h2>
          <p>
            Right triangles are closely related to slope and grade calculations. If rise is the vertical change and run is the horizontal change:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
            <div>slope = rise / run</div>
            <div>grade = (rise / run) × 100%</div>
            <div>θ = arctan(rise / run)</div>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Example: 1:12 Slope (ADA Ramp)
          </h3>
          <p>
            For a rise of 1 and a run of 12: slope = 1 / 12, grade ≈ 8.3333%, and angle = arctan(1 / 12) ≈ 4.7636°. The corresponding rise-to-run ratio is written as 1:12. The same geometry appears in roof pitch, ramps, accessibility calculations, surveying, and construction layout.
          </p>
        </section>

        {/* Special Right Triangles */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Special Right Triangles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">45°-45°-90° Triangle</h3>
              <p className="text-xs">
                A 45°-45°-90° triangle has two equal legs. If each leg has length x, the hypotenuse is c = x√2. For x = 1: a = 1, b = 1, c = √2 ≈ 1.4142. Both acute angles are 45°.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">30°-60°-90° Triangle</h3>
              <p className="text-xs">
                The side ratios are 1 : √3 : 2, where the shortest leg is opposite 30°, the longer leg is opposite 60°, and the hypotenuse is opposite 90°. For a shortest leg of 1: a = 1, b = √3 ≈ 1.7321, c = 2.
              </p>
            </div>
          </div>
        </section>

        {/* Pythagorean Triples */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Pythagorean Triples
          </h2>
          <p>
            A Pythagorean triple consists of three positive integers satisfying a² + b² = c². Common examples include 3-4-5, 5-12-13, 8-15-17, and 7-24-25.
          </p>
          <p>
            For example: 5² + 12² = 13² (25 + 144 = 169). These integer triangles are useful in construction and geometric layout because they can create exact right angles without requiring decimal measurements.
          </p>
        </section>

        {/* Input Validation */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Input Validation Matters
          </h2>
          <p>
            Not every combination of numbers represents a valid right triangle. For three side lengths, the defining condition is a² + b² = c².
          </p>
          <p>
            For example: a = 5, b = 12, c = 10 would imply 5² + 12² = 169, but 10² = 100. Since 169 ≠ 100, these values cannot describe one right triangle. Likewise, the hypotenuse cannot be equal to or smaller than a leg. Instead of silently changing the numbers, the calculator reports a validation error.
          </p>
        </section>

        {/* Units */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Units and Measurement Consistency
          </h2>
          <p>
            A right triangle can be calculated in any consistent length unit. For example, if a = 3 m and b = 4 m, then c = 5 m, and Area = 6 m². The unit of area is squared because area is two-dimensional.
          </p>
          <p>
            The calculator&apos;s conversion tools support common units including meters, centimeters, millimeters, feet, inches, and yards (e.g. 10 yd = 9.144 m and 10 m ≈ 10.9361 yd). When comparing or combining dimensions, make sure the input lengths use compatible units.
          </p>
        </section>

        {/* Worked Example */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Worked Example: Complete 5-12-13 Right Triangle
          </h2>
          <p>Suppose the known legs are a = 5 and b = 12:</p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono text-xs">
            <div><strong>Step 1 (Hypotenuse):</strong> c = √(5² + 12²) = √169 = 13</div>
            <div><strong>Step 2 (Angle α):</strong> α = arctan(5 / 12) ≈ 22.6199°</div>
            <div><strong>Step 3 (Angle β):</strong> β = 90° − 22.6199° ≈ 67.3801°</div>
            <div><strong>Step 4 (Area):</strong> A = 1/2 × 5 × 12 = 30</div>
            <div><strong>Step 5 (Perimeter):</strong> P = 5 + 12 + 13 = 30</div>
            <div><strong>Step 6 (Altitude):</strong> h_c = (5 × 12) / 13 ≈ 4.6154</div>
            <div><strong>Step 7 (Inradius):</strong> r = (5 + 12 − 13) / 2 = 2</div>
            <div><strong>Step 8 (Circumradius):</strong> R = 13 / 2 = 6.5</div>
            <div><strong>Step 9 (Median):</strong> m_c = 13 / 2 = 6.5</div>
          </div>
          <p>
            All independent relationships agree: 5² + 12² = 13², 22.6199° + 67.3801° = 90°, and A = r · s = 2 × 15 = 30.
          </p>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Right Triangle Calculation Mistakes
          </h2>
          <div className="space-y-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <strong>Mistake 1: Choosing the wrong hypotenuse.</strong> The hypotenuse is always opposite the 90° angle, not simply the vertical or horizontal side.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <strong>Mistake 2: Applying the Pythagorean theorem to a non-right triangle.</strong> The equation a² + b² = c² is specifically valid for right triangles.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <strong>Mistake 3: Using the wrong sides in SOH-CAH-TOA.</strong> Opposite and adjacent depend on which acute angle is being considered.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <strong>Mistake 4: Forgetting complementary angles.</strong> The two acute angles of a right triangle must always add to 90°.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <strong>Mistake 5: Mixing units.</strong> Using 5 meters and 12 feet directly produces an erroneous result; convert to uniform units first.
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Applications of Right Triangles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Construction &amp; Framing</h3>
              <p>Checking corners for 90° squareness using 3-4-5 rules, stair stringer rise/run, and rafters.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Roofing &amp; Ramps</h3>
              <p>Expressing roof pitch (e.g. 5:12) and ADA wheelchair ramp compliance (1:12 ratio, 8.33% grade).</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Surveying &amp; Physics</h3>
              <p>Triangulating elevation differences, vector decomposition, and navigation bearings.</p>
            </div>
          </div>
        </section>
      </div>

      {/* 3. FAQ SECTION (All 12 Approved FAQs, Open / Unfolded by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {right_triangle_calculatorFaqs.map((faq, idx) => {
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. RELATED CALCULATORS — AFTER CONTENT */}
      <div className="pt-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800/80">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
            RELATED CALCULATORS:
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Link
              href="/calculators/pythagorean-theorem-calculator"
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
            >
              Pythagorean Theorem Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Link
              href="/calculators/triangle-calculator"
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
            >
              Triangle Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <Link
              href="/calculators/distance-calculator"
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
            >
              Distance Calculator
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default RightTriangleContent;
