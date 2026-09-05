"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";
import { pythagorean_theorem_calculatorFaqs } from "@/app/calculators/pythagorean-theorem-calculator/faq";

export function PythagoreanContent() {
  // All 12 FAQs open / unfolded by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: pythagorean_theorem_calculatorFaqs.length }, (_, i) => i))
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
      {/* 1. MAIN BODY CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is the Pythagorean Theorem?
          </h2>
          <p>
            The Pythagorean theorem is one of the fundamental results of Euclidean geometry. It describes the relationship between the three side lengths of a right triangle.
          </p>
          <p>
            For a right triangle, the two sides that meet at the 90&deg; angle are called the legs, while the side opposite the 90&deg; angle is the hypotenuse. The hypotenuse is always the longest side.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-blue-700 dark:text-blue-300">
            a&sup2; + b&sup2; = c&sup2;
          </div>
          <p>where:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>a</strong> = length of one leg</li>
            <li><strong>b</strong> = length of the other leg</li>
            <li><strong>c</strong> = length of the hypotenuse</li>
          </ul>
          <p>
            Because the theorem relates the three side lengths algebraically, knowing any two appropriate side lengths is enough to determine the third.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>3&sup2; + 4&sup2; = c&sup2;</p>
            <p>9 + 16 = c&sup2;</p>
            <p>25 = c&sup2;</p>
            <p>c = &radic;25 = 5</p>
          </div>
          <p>
            So the missing hypotenuse is 5. This is the classic 3-4-5 right triangle and is one of the most useful Pythagorean triples.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How to Use This Pythagorean Theorem Calculator
          </h2>
          <p>
            The main solver is designed for the most common right-triangle calculation: finding one missing side when two side lengths are known.
          </p>
          <p>Enter any two valid side lengths.</p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>To find the hypotenuse: c = &radic;(a&sup2; + b&sup2;)</p>
            <p>To find leg a: a = &radic;(c&sup2; &minus; b&sup2;)</p>
            <p>To find leg b: b = &radic;(c&sup2; &minus; a&sup2;)</p>
          </div>
          <p>
            The calculator then reports the solved side and additional right-triangle measurements when they can be determined.
          </p>
          <p>
            For a right triangle with legs a and b, the area is: <code>A = &frac12;ab</code>.
          </p>
          <p>
            The perimeter is: <code>P = a + b + c</code>.
          </p>
          <p>
            The altitude from the right angle to the hypotenuse can be calculated from the relationship: <code>h_c = ab/c</code>.
          </p>
          <p>
            The result is displayed numerically and, when appropriate, in exact radical form.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. When Can You Use the Pythagorean Theorem?
          </h2>
          <p>
            The Pythagorean theorem is specifically a right-triangle theorem. That means the triangle must contain a 90&deg; angle. It should not be applied directly to an arbitrary acute or obtuse triangle simply because three side lengths are available.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
            <p className="font-semibold">For a valid right triangle:</p>
            <p className="font-mono">a &gt; 0, b &gt; 0, c &gt; 0</p>
            <p className="font-mono">a&sup2; + b&sup2; = c&sup2;</p>
          </div>
          <p>
            The hypotenuse must also be the longest side. For example: <code>5&sup2; + 12&sup2; = 13&sup2;</code> (<code>25 + 144 = 169</code>), so 5-12-13 forms a valid right triangle.
          </p>
          <p>
            By contrast, the side lengths 3, 4, and 6 do not form a right triangle because:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>3&sup2; + 4&sup2; = 25</p>
            <p>but 6&sup2; = 36</p>
            <p>Since 25 &ne; 36, those three values cannot satisfy the Pythagorean theorem.</p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Solve for the Missing Hypotenuse
          </h2>
          <p>
            When both legs are known, the hypotenuse is found by taking the square root of the sum of the squared legs:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-blue-700 dark:text-blue-300">
            c = &radic;(a&sup2; + b&sup2;)
          </div>
          <p>Example:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>a = 6, b = 8</p>
            <p>c = &radic;(6&sup2; + 8&sup2;)</p>
            <p>c = &radic;(36 + 64)</p>
            <p>c = &radic;100</p>
            <p>c = 10</p>
          </div>
          <p>
            Therefore, a right triangle with legs 6 and 8 has a hypotenuse of 10. The calculator also identifies whether the resulting integer sides form a familiar Pythagorean triple.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Solve for a Missing Leg
          </h2>
          <p>
            When the hypotenuse and one leg are known, rearrange the theorem instead of adding the squared values.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>To find a: a = &radic;(c&sup2; &minus; b&sup2;)</p>
            <p>To find b: b = &radic;(c&sup2; &minus; a&sup2;)</p>
          </div>
          <p>Example:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>c = 13, b = 12</p>
            <p>a = &radic;(13&sup2; &minus; 12&sup2;)</p>
            <p>a = &radic;(169 &minus; 144)</p>
            <p>a = &radic;25</p>
            <p>a = 5</p>
          </div>
          <p>
            So the three sides are 5, 12, and 13. A common mistake is subtracting the wrong squared quantity. The hypotenuse must appear in the positive c&sup2; term, because the theorem is <code>a&sup2; + b&sup2; = c&sup2;</code>.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Exact Radical Results vs Decimal Results
          </h2>
          <p>
            Not every right-triangle calculation produces an integer answer. For example: <code>a = 1, b = 1</code>.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>c = &radic;(1&sup2; + 1&sup2;)</p>
            <p>c = &radic;2</p>
            <p>Decimal approximation: c &approx; 1.4142</p>
          </div>
          <p>
            The exact answer is &radic;2, while its decimal approximation is approximately 1.4142. Exact radical form is mathematically valuable because it preserves the exact result rather than replacing it with a rounded decimal. Use the calculator&apos;s precision controls when you need a shorter decimal presentation, while retaining the exact radical where supported.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Right Triangle Side + Acute Angle Solver
          </h2>
          <p>
            When one side and an acute angle are known, trigonometric ratios can determine the remaining sides. This calculator uses the following explicit convention:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Leg a</strong> = opposite the selected acute angle &theta;</li>
            <li><strong>Leg b</strong> = adjacent to &theta;</li>
            <li><strong>Hypotenuse c</strong> = opposite the 90&deg; angle</li>
          </ul>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>sin(&theta;) = a/c</p>
            <p>cos(&theta;) = b/c</p>
            <p>tan(&theta;) = a/b</p>
          </div>
          <p>For example, if <code>c = 10, &theta; = 30&deg;</code>:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>a = c &times; sin(30&deg;) = 10 &times; 0.5 = 5</p>
            <p>b = c &times; cos(30&deg;) &approx; 10 &times; 0.866025 &approx; 8.66025</p>
          </div>
          <p>
            The result should always be checked against the Pythagorean theorem: <code>5&sup2; + 8.66025&sup2; &approx; 10&sup2;</code>. The two acute angles in a right triangle also add to 90&deg;.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Pythagorean Theorem and Trigonometry
          </h2>
          <p>
            The Pythagorean theorem and right-triangle trigonometry complement one another. The theorem uses side lengths: <code>a&sup2; + b&sup2; = c&sup2;</code>. Trigonometry connects angles and side ratios:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>sin &theta; = opposite / hypotenuse</p>
            <p>cos &theta; = adjacent / hypotenuse</p>
            <p>tan &theta; = opposite / adjacent</p>
          </div>
          <p>
            This means a right triangle can often be solved from combinations of side and angle information. For example, if the hypotenuse and one acute angle are known, sine and cosine provide the missing legs. Once the legs are known, the Pythagorean theorem provides an independent mathematical check. This cross-checking is particularly useful in engineering, surveying, geometry, physics, navigation, and technical drawing.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Pythagorean Triples
          </h2>
          <p>
            A Pythagorean triple is a set of positive integers satisfying <code>a&sup2; + b&sup2; = c&sup2;</code>. Common examples include:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>3, 4, 5</p>
            <p>5, 12, 13</p>
            <p>8, 15, 17 (8&sup2; + 15&sup2; = 64 + 225 = 289 = 17&sup2;)</p>
            <p>7, 24, 25</p>
          </div>
          <p>
            These triples are useful because they produce exact integer side lengths without requiring square-root approximations. The calculator includes a Pythagorean triple generator based on Euclid&apos;s parameterization:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>a = m&sup2; &minus; n&sup2;</p>
            <p>b = 2mn</p>
            <p>c = m&sup2; + n&sup2;</p>
            <p>with: m &gt; n &gt; 0</p>
          </div>
          <p>
            For suitable integer values of m and n, this generates Pythagorean triples. For example, <code>m = 2, n = 1</code> gives <code>a = 2&sup2; - 1&sup2; = 3</code>, <code>b = 2(2)(1) = 4</code>, <code>c = 2&sup2; + 1&sup2; = 5</code>, resulting in (3, 4, 5).
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. 3D Pythagorean Distance
          </h2>
          <p>
            The same idea extends naturally from two dimensions to three dimensions. For coordinate differences x, y, z, the Euclidean distance from one point to another is:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-blue-700 dark:text-blue-300">
            d = &radic;(x&sup2; + y&sup2; + z&sup2;)
          </div>
          <p>For example, <code>x = 3, y = 4, z = 12</code>:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>First calculate the 2D base distance: d₂ = &radic;(3&sup2; + 4&sup2;) = &radic;25 = 5</p>
            <p>Then: d = &radic;(5&sup2; + 12&sup2;) = &radic;(25 + 144) = &radic;169 = 13</p>
          </div>
          <p>
            This makes the 3D solver useful for coordinate geometry, spatial measurements, computer graphics, navigation, and other applications involving Cartesian distance.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Area, Perimeter and Altitude of a Right Triangle
          </h2>
          <p>
            Once the three side lengths are known, several additional geometric quantities become available.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Area</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">A = &frac12;ab</p>
              <p>For 3-4-5: A = &frac12;(3)(4) = 6 square units.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Perimeter</span>
              <p className="font-mono text-emerald-600 dark:text-emerald-400">P = a + b + c</p>
              <p>For 3-4-5: P = 3 + 4 + 5 = 12 units.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Altitude (h_c)</span>
              <p className="font-mono text-purple-600 dark:text-purple-400">h = ab/c</p>
              <p>For 3-4-5: h = (3 &times; 4)/5 = 2.4 units.</p>
            </div>
          </div>
          <p>
            These calculations turn a simple missing-side solver into a more complete right-triangle geometry tool.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. How to Check Whether a Triangle Is Right-Angled
          </h2>
          <p>
            The converse of the Pythagorean theorem provides a useful test. Given three positive side lengths, identify the longest side as c. Then calculate <code>a&sup2; + b&sup2;</code> and compare it with <code>c&sup2;</code>. If <code>a&sup2; + b&sup2; = c&sup2;</code>, the triangle is right-angled.
          </p>
          <p>Example: <code>a = 7, b = 24, c = 25</code>:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>7&sup2; + 24&sup2; = 49 + 576 = 625</p>
            <p>25&sup2; = 625</p>
            <p>Therefore, 7-24-25 is a right triangle.</p>
          </div>
          <p>
            This is also why the calculator validates side relationships instead of treating every set of three numbers as a valid right triangle.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Common Pythagorean Theorem Mistakes
          </h2>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong>Mistake 1: Using the formula on a non-right triangle.</strong> The standard relation a&sup2; + b&sup2; = c&sup2; applies exclusively to right triangles.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong>Mistake 2: Treating a leg as the hypotenuse.</strong> The hypotenuse is always opposite the 90&deg; angle and is strictly the longest side.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong>Mistake 3: Forgetting the square root.</strong> If c&sup2; = 100, then c = &radic;100 = 10, not 100.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong>Mistake 4: Subtracting in the wrong direction.</strong> To find a missing leg: a = &radic;(c&sup2; &minus; b&sup2;). The hypotenuse term is the larger squared quantity.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong>Mistake 5: Rounding too early.</strong> When working through several calculations, premature rounding can introduce avoidable error. Retain sufficient precision during intermediate calculations and round the final result for display.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong>Mistake 6: Confusing angle-side orientation.</strong> In a right triangle, &ldquo;opposite&rdquo; and &ldquo;adjacent&rdquo; depend on which acute angle is being considered. Always identify the reference angle before applying sine, cosine, or tangent.
            </div>
          </div>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Practical Applications of the Pythagorean Theorem
          </h2>
          <p>
            The Pythagorean theorem is used far beyond classroom exercises:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Carpentry and Construction</span>
              <p>Builders use right-triangle relationships to check whether corners, frames, foundations, and layouts are square. The 3-4-5 relationship is especially useful because multiplying all three values by the same factor preserves the right angle (e.g. 6-8-10, 9-12-15).</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Engineering &amp; Surveying</span>
              <p>Engineers and surveyors resolve distances, vertical/horizontal offsets, dimensions, and topography coordinates using right-triangle geometry.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Navigation &amp; GPS</span>
              <p>Straight-line distance between locations represented by coordinate differences is calculated using Euclidean distance norms.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Computer Graphics &amp; Physics</span>
              <p>Vector magnitudes are computed via <code>|v| = &radic;(x&sup2; + y&sup2; + z&sup2;)</code>, and orthogonal force components are synthesized in mechanics.</p>
            </div>
          </div>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Pythagorean Theorem with Units
          </h2>
          <p>
            The side lengths of a triangle must use compatible units before applying the theorem. For example, suppose <code>a = 3 m</code> and <code>b = 400 cm</code>. The second measurement must first be converted:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>400 cm = 4 m</p>
            <p>c = &radic;(3&sup2; + 4&sup2;) = 5 m</p>
          </div>
          <p>
            The calculator includes a length-unit conversion tool so that measurements can be expressed consistently before further geometric calculations. Common conversions include:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>1 m = 100 cm</p>
            <p>1 m = 1000 mm</p>
            <p>1 m &approx; 3.28084 ft</p>
            <p>1 m &approx; 39.3701 in</p>
            <p>1 m &approx; 1.09361 yd</p>
          </div>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Worked Examples
          </h2>
          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-blue-600 dark:text-blue-400 block text-sm">Example 1 &mdash; Find the Hypotenuse</strong>
              <p>Given: a = 9, b = 12</p>
              <p className="font-mono">c = &radic;(9&sup2; + 12&sup2;) = &radic;(81 + 144) = &radic;225 = 15</p>
              <p><strong>Answer: c = 15</strong></p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-blue-600 dark:text-blue-400 block text-sm">Example 2 &mdash; Find a Missing Leg</strong>
              <p>Given: b = 8, c = 17</p>
              <p className="font-mono">a = &radic;(17&sup2; &minus; 8&sup2;) = &radic;(289 &minus; 64) = &radic;225 = 15</p>
              <p><strong>Answer: a = 15</strong></p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-blue-600 dark:text-blue-400 block text-sm">Example 3 &mdash; Irrational Hypotenuse</strong>
              <p>Given: a = 2, b = 3</p>
              <p className="font-mono">c = &radic;(2&sup2; + 3&sup2;) = &radic;13 &approx; 3.6055</p>
              <p><strong>Answer: The exact answer is &radic;13.</strong></p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-blue-600 dark:text-blue-400 block text-sm">Example 4 &mdash; Side and Angle</strong>
              <p>Given: c = 10, &theta; = 60&deg;</p>
              <p className="font-mono">If a is opposite &theta;: a = 10 &times; sin(60&deg;) &approx; 8.6603</p>
              <p className="font-mono">If b is adjacent: b = 10 &times; cos(60&deg;) = 5</p>
              <p className="font-mono">Check: 8.6603&sup2; + 5&sup2; &approx; 100</p>
              <p><strong>Answer: Therefore the calculations are consistent.</strong></p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-blue-600 dark:text-blue-400 block text-sm">Example 5 &mdash; 3D Distance</strong>
              <p>Given coordinate differences: x = 6, y = 8, z = 10</p>
              <p className="font-mono">First: d₂ = &radic;(6&sup2; + 8&sup2;) = 10</p>
              <p className="font-mono">Then: d = &radic;(10&sup2; + 10&sup2;) = &radic;200 = 10&radic;2 &approx; 14.1421</p>
              <p><strong>Answer: d &approx; 14.1421</strong></p>
            </div>
          </div>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Pythagorean Theorem vs. Other Triangle Methods
          </h2>
          <p>Use the Pythagorean theorem when:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>the triangle is right-angled</li>
            <li>two side lengths are known</li>
            <li>you need the third side</li>
          </ul>
          <p>Use trigonometric ratios when:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>one acute angle and one side are known</li>
            <li>you need an unknown side</li>
            <li>you need an angle from side ratios</li>
          </ul>
          <p>
            For non-right triangles, the Law of Sines or Law of Cosines may be more appropriate.
          </p>
          <p>
            For broader triangle calculations, see the{" "}
            <Link href="/calculators/triangle-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Triangle Calculator
            </Link>
            , and for coordinate-based measurements, use the{" "}
            <Link href="/calculators/distance-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Distance Calculator
            </Link>
            .
          </p>
          <p>
            For right-triangle-specific calculations, this{" "}
            <Link href="/calculators/pythagorean-theorem-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Pythagorean Theorem Calculator
            </Link>{" "}
            is designed to keep the side relationships, derived metrics, and validation in one place.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Quick Reference Formula Sheet
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="font-sans block text-slate-900 dark:text-white">Pythagorean Theorem</strong>
              <p className="text-blue-600 dark:text-blue-400 font-bold">a&sup2; + b&sup2; = c&sup2;</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="font-sans block text-slate-900 dark:text-white">Missing Hypotenuse</strong>
              <p className="text-blue-600 dark:text-blue-400 font-bold">c = &radic;(a&sup2; + b&sup2;)</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="font-sans block text-slate-900 dark:text-white">Missing Leg a</strong>
              <p className="text-blue-600 dark:text-blue-400 font-bold">a = &radic;(c&sup2; &minus; b&sup2;)</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="font-sans block text-slate-900 dark:text-white">Missing Leg b</strong>
              <p className="text-blue-600 dark:text-blue-400 font-bold">b = &radic;(c&sup2; &minus; a&sup2;)</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="font-sans block text-slate-900 dark:text-white">Right-Triangle Area</strong>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold">A = &frac12;ab</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="font-sans block text-slate-900 dark:text-white">Perimeter</strong>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold">P = a + b + c</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="font-sans block text-slate-900 dark:text-white">Altitude to Hypotenuse</strong>
              <p className="text-purple-600 dark:text-purple-400 font-bold">h_c = ab/c</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="font-sans block text-slate-900 dark:text-white">Trigonometric Ratios</strong>
              <p>sin &theta; = a/c | cos &theta; = b/c | tan &theta; = a/b</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="font-sans block text-slate-900 dark:text-white">3D Euclidean Distance</strong>
              <p className="text-blue-600 dark:text-blue-400 font-bold">d = &radic;(x&sup2; + y&sup2; + z&sup2;)</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="font-sans block text-slate-900 dark:text-white">Euclid&apos;s Triple Formulas</strong>
              <p>a = m&sup2; &minus; n&sup2;, b = 2mn, c = m&sup2; + n&sup2;</p>
            </div>
          </div>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Final Summary
          </h2>
          <p>
            The Pythagorean theorem provides a direct relationship between the side lengths of a right triangle: <code>a&sup2; + b&sup2; = c&sup2;</code>.
          </p>
          <p>
            From that single relationship, you can solve for a missing hypotenuse or leg, verify whether side lengths form a right triangle, and calculate other measurements such as area, perimeter, and altitude.
          </p>
          <p>
            This calculator extends those core ideas with a side-and-angle right-triangle solver, exact and decimal results, 3D Euclidean distance, Euclid&apos;s Pythagorean triple generator, and length-unit conversion.
          </p>
          <p>
            The most important rule to remember is simple: if the triangle is right-angled, identify the two legs and the hypotenuse correctly before applying the formula.
          </p>
          <p>
            For broader geometry work, use the{" "}
            <Link href="/calculators/triangle-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Triangle Calculator
            </Link>{" "}
            and{" "}
            <Link href="/calculators/area-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Area Calculator
            </Link>
            . For coordinate-based measurements, use the{" "}
            <Link href="/calculators/distance-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Distance Calculator
            </Link>
            .
          </p>
          <p>
            The Pythagorean Theorem Calculator is designed to make those calculations faster while still showing the underlying mathematical relationships so you can verify the result rather than treating the answer as a black box.
          </p>
        </section>

        {/* TRUST / SOURCES (Structured like 401(k) Methodology / Disclaimer) */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Trust &amp; Mathematical Sources
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Educational Standards &amp; Verification
              </div>
              <p>
                Mathematical definitions and core relationships were checked against established educational references including OpenStax&apos;s treatments of the Pythagorean theorem and right-triangle trigonometry.
              </p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>OpenStax, Prealgebra &mdash; Use Properties of Angles, Triangles, and the Pythagorean Theorem.</li>
                <li>OpenStax, Contemporary Mathematics &mdash; Right Triangle Trigonometry.</li>
              </ul>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Computational Integrity
              </div>
              <p>
                All calculations run locally within your browser using IEEE 754 double-precision floating-point arithmetic with rational radical reduction, verified against independent mathematical reference models.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (Section 18, Unfolded By Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            18. Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {pythagorean_theorem_calculatorFaqs.map((faq, idx) => {
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
    </article>
  );
}

export default PythagoreanContent;
