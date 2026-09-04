"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Calculator,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Compass,
  Layers,
  BookOpen
} from "lucide-react";
import { triangleFaqs } from "@/app/calculators/triangle-calculator/faq";

export function TriangleContent() {
  // All 10 FAQs open / unfolded by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: triangleFaqs.length }, (_, i) => i))
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
      {/* ========================================================================= */}
      {/* 1. RELATED CALCULATORS — ABOVE THE MAIN CONTENT                           */}
      {/* ========================================================================= */}
      <div className="pb-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <Calculator className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Related Calculators</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <Link
              href="/calculators/pythagorean-theorem-calculator"
              className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700/70 hover:border-blue-500 hover:shadow-xs transition-all flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 group"
            >
              <span>Pythagorean Theorem Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1.5" />
            </Link>
            <Link
              href="/calculators/right-triangle-calculator"
              className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700/70 hover:border-blue-500 hover:shadow-xs transition-all flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 group"
            >
              <span>Right Triangle Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1.5" />
            </Link>
            <Link
              href="/calculators/area-calculator"
              className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700/70 hover:border-blue-500 hover:shadow-xs transition-all flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 group"
            >
              <span>Area Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN EDUCATIONAL CONTENT                                               */}
      {/* ========================================================================= */}
      <div className="space-y-8 pt-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1: Main Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Introduction to the Triangle Calculator
          </h2>
          <p>
            A triangle calculator helps you solve the unknown measurements of a triangle from the sides and angles you already know. Depending on the information provided, you can determine missing side lengths, missing angles, area, perimeter, semiperimeter, altitudes, medians, inradius, and circumradius.
          </p>
          <p>
            This calculator is designed as a complete triangle solver rather than a single-purpose formula tool. Enter the known measurements, and it determines the appropriate geometric relationships, checks whether the values can form a valid triangle, and presents the calculated measurements with step-by-step mathematical details.
          </p>
          <p>
            For a general triangle, the three sides are commonly written as <em>a</em>, <em>b</em>, and <em>c</em>, while the opposite angles are <em>A</em>, <em>B</em>, and <em>C</em>. The standard correspondence is important: side <em>a</em> is opposite angle <em>A</em>, side <em>b</em> is opposite angle <em>B</em>, and side <em>c</em> is opposite angle <em>C</em>. The three interior angles of a Euclidean triangle always add to 180°.
          </p>
          <p>
            The calculator can also be used when you already know all three sides, when you know two sides and an included angle, or when your problem gives angles together with one or more sides. The underlying methods include the Law of Sines, Law of Cosines, the Pythagorean theorem for right triangles, and Heron&apos;s formula for area.
          </p>
        </section>

        {/* Section 2: How to Use the Calculator */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How to Use the Triangle Calculator
          </h2>
          <p>
            Start by entering the measurements you know. The calculator works from valid side and angle combinations and determines the remaining quantities when the information is sufficient.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
              Step-by-Step Procedure:
            </h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <li>Enter the known side lengths and/or angle measurements.</li>
              <li>Make sure each measurement is associated with the correct side or opposite angle.</li>
              <li>Select degrees or radians when entering angles.</li>
              <li>Review the solved sides and angles in real time.</li>
              <li>Check the calculated area, perimeter, and other geometric measurements.</li>
              <li>Use the step-by-step derivation and interactive triangle diagram to verify the result.</li>
            </ol>
          </div>
          <p>
            For example, if the three sides are <strong>3</strong>, <strong>4</strong>, and <strong>5</strong>, the calculator identifies a right triangle. The resulting angles are approximately <strong>36.8699°</strong>, <strong>53.1301°</strong>, and <strong>90°</strong>, the area is <strong>6</strong>, the perimeter is <strong>12</strong>, the inradius is <strong>1</strong>, and the circumradius is <strong>2.5</strong>.
          </p>
          <p>
            Because rounding is a presentation choice rather than a change to the underlying geometry, increasing the display precision changes the number of digits shown without altering the mathematical calculation.
          </p>
        </section>

        {/* Section 3: Which Triangle Information Do You Need? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Which Triangle Information Do You Need?
          </h2>
          <p>
            A triangle has six primary dimensions (three sides and three angles). To uniquely define a Euclidean triangle, you generally require at least three independent measurements, with at least one being a side length.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {/* SSS */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono text-[11px]">SSS</span>
                Three Sides Known
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                When all three sides are known, the triangle is determined if the side lengths satisfy the triangle inequality:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-center text-blue-700 dark:text-blue-300">
                a + b &gt; c, &nbsp; a + c &gt; b, &nbsp; b + c &gt; a
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Angles are calculated via the Law of Cosines, and area is found using Heron&apos;s formula.
              </p>
            </div>

            {/* SAS */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-[11px]">SAS</span>
                Two Sides and Included Angle
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                When two sides and the angle between them are known, the Law of Cosines computes the missing third side:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-center text-emerald-700 dark:text-emerald-300">
                c = &radic;(a&sup2; + b&sup2; &minus; 2ab&middot;cos C)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The remaining angles are solved using the Law of Sines or Law of Cosines.
              </p>
            </div>

            {/* ASA & AAS */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono text-[11px]">ASA / AAS</span>
                Two Angles and One Side
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                First find the third angle via the angle sum rule (A + B + C = 180°), then calculate missing sides using the Law of Sines:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-center text-amber-800 dark:text-amber-300">
                a / sin A = b / sin B = c / sin C
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                This yields a unique triangle whenever the angle sum is strictly below 180°.
              </p>
            </div>

            {/* SSA */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono text-[11px]">SSA</span>
                Two Sides and Non-Included Angle
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                SSA is known as the <em>ambiguous case</em>. Depending on the geometry, it may yield:
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-0.5">
                <li>No triangle (side too short to reach base)</li>
                <li>Exactly one unique triangle</li>
                <li>Two distinct valid triangles</li>
              </ul>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                This calculator evaluates the altitude <em>h = b&middot;sin A</em> to identify and present both solutions when two exist.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Fundamental Triangle Formulas */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Core Triangle Formulas
          </h2>
          <p>
            Every triangle problem relies on three fundamental relationships connecting angles and boundary dimensions:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 text-center space-y-1">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Angle Sum</div>
              <div className="font-mono text-base font-bold text-blue-600 dark:text-blue-400 py-1">A + B + C = 180°</div>
              <div className="text-[11px] text-slate-500">Interior angles add to 180° (&pi; rad)</div>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 text-center space-y-1">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Perimeter</div>
              <div className="font-mono text-base font-bold text-blue-600 dark:text-blue-400 py-1">P = a + b + c</div>
              <div className="text-[11px] text-slate-500">Total boundary length around triangle</div>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 text-center space-y-1">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Semiperimeter</div>
              <div className="font-mono text-base font-bold text-blue-600 dark:text-blue-400 py-1">s = (a + b + c) / 2</div>
              <div className="text-[11px] text-slate-500">Used in Heron&apos;s formula and inradius</div>
            </div>
          </div>
        </section>

        {/* Section 5: Area of a Triangle */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Calculating Triangle Area
          </h2>
          <p>
            Triangle area (denoted <em>K</em> or <em>Area</em>) can be evaluated using different mathematical formulations depending on the available information:
          </p>
          <div className="space-y-3 pt-1">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                Base and Height Method
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The classical triangle area formula is:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-sm font-bold text-center text-blue-600 dark:text-blue-400">
                K = &frac12; &middot; b &middot; h
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The height <em>h</em> must be strictly perpendicular to the chosen base <em>b</em>. For general multi-polygon area computations, you can also refer to our{" "}
                <Link href="/calculators/area-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                  Area Calculator
                </Link>
                .
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                Heron&apos;s Formula (SSS Area)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                When all three side lengths are known without an altitude, Heron&apos;s formula calculates the area directly using the semiperimeter <em>s = (a + b + c) / 2</em>:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-sm font-bold text-center text-blue-600 dark:text-blue-400">
                K = &radic;[ s(s &minus; a)(s &minus; b)(s &minus; c) ]
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                For a 5-6-7 triangle, the semiperimeter is <em>s = (5 + 6 + 7) / 2 = 9</em>, giving:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-xs text-center text-slate-700 dark:text-slate-300">
                K = &radic;[ 9 &middot; (9 &minus; 5) &middot; (9 &minus; 6) &middot; (9 &minus; 7) ] = &radic;[ 9 &middot; 4 &middot; 3 &middot; 2 ] = &radic;216 &approx; 14.6969
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Law of Sines */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. The Law of Sines
          </h2>
          <p>
            The Law of Sines establishes that the ratio of each side length to the sine of its opposite angle is constant and equals twice the circumradius <em>R</em>:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 text-center font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
            a / sin A = b / sin B = c / sin C = 2R
          </div>
          <p>
            Matching lowercase sides with uppercase opposite angles is essential: side <em>a</em> faces angle <em>A</em>, <em>b</em> faces <em>B</em>, and <em>c</em> faces <em>C</em>.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
              Worked Example:
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Suppose <em>A = 40°</em>, <em>B = 60°</em>, and <em>a = 10</em>. First, find the third angle:
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-xs text-center text-slate-700 dark:text-slate-300">
              C = 180° &minus; 40° &minus; 60° = 80°
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Then apply the Law of Sines to solve for side <em>b</em>:
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-xs text-center text-slate-700 dark:text-slate-300">
              10 / sin(40°) = b / sin(60°) &implies; b = 10 &middot; sin(60°) / sin(40°) &approx; 13.4729
            </div>
          </div>
        </section>

        {/* Section 7: Law of Cosines */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. The Law of Cosines
          </h2>
          <p>
            The Law of Cosines generalizes the Pythagorean theorem to any oblique or obtuse triangle. It relates all three sides to one interior angle:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs text-center pt-1">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 text-blue-600 dark:text-blue-400 font-bold">
              a&sup2; = b&sup2; + c&sup2; &minus; 2bc&middot;cos A
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 text-blue-600 dark:text-blue-400 font-bold">
              b&sup2; = a&sup2; + c&sup2; &minus; 2ac&middot;cos B
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 text-blue-600 dark:text-blue-400 font-bold">
              c&sup2; = a&sup2; + b&sup2; &minus; 2ab&middot;cos C
            </div>
          </div>
          <p>
            When solving an SSS triangle for an angle, the formula is rearranged into:
          </p>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-bold text-center text-slate-800 dark:text-slate-200">
            cos C = (a&sup2; + b&sup2; &minus; c&sup2;) / (2ab) &implies; C = arccos(cos C)
          </div>
          <p>
            When <em>C = 90°</em>, <em>cos 90° = 0</em>, and the expression simplifies directly to <em>c&sup2; = a&sup2; + b&sup2;</em>, reproducing the Pythagorean theorem. Explore our{" "}
            <Link href="/calculators/pythagorean-theorem-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Pythagorean Theorem Calculator
            </Link>{" "}
            for dedicated right-triangle hypotenuse modeling.
          </p>
        </section>

        {/* Section 8: Right Triangles & Pythagorean Theorem */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Right Triangles and Trigonometric Ratios
          </h2>
          <p>
            A right triangle has one interior angle equal to exactly 90°. For legs <em>a</em> and <em>b</em> with hypotenuse <em>c</em>:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 text-center font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
            a&sup2; + b&sup2; = c&sup2; &implies; c = &radic;(a&sup2; + b&sup2;)
          </div>
          <p>
            For a triangle with legs <em>6</em> and <em>8</em>:
          </p>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-center text-slate-700 dark:text-slate-300">
            c = &radic;(6&sup2; + 8&sup2;) = &radic;(36 + 64) = &radic;100 = 10, &nbsp; Area = &frac12;&middot;6&middot;8 = 24, &nbsp; Perimeter = 6 + 8 + 10 = 24
          </div>
          <p>
            The fundamental trigonometric ratios for angle <em>A</em> in this 6-8-10 triangle are:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs text-center pt-1">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 block text-[10px]">SINE</span>
              sin A = 6 / 10 = <strong>0.6000</strong>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 block text-[10px]">COSINE</span>
              cos A = 8 / 10 = <strong>0.8000</strong>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-500 block text-[10px]">TANGENT</span>
              tan A = 6 / 8 = <strong>0.7500</strong>
            </div>
          </div>
          <p>
            For dedicated right-triangle calculations, you can also use the{" "}
            <Link href="/calculators/right-triangle-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Right Triangle Calculator
            </Link>{" "}
            available on this site.
          </p>
        </section>

        {/* Section 9: Altitudes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Triangle Altitudes
          </h2>
          <p>
            An altitude is a perpendicular line segment dropped from a vertex to the opposite side. Because area <em>K = &frac12;&middot;a&middot;h<sub>a</sub></em>, the three altitudes are:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs text-center pt-1">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 text-blue-600 dark:text-blue-400 font-bold">
              h<sub>a</sub> = 2K / a
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 text-blue-600 dark:text-blue-400 font-bold">
              h<sub>b</sub> = 2K / b
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 text-blue-600 dark:text-blue-400 font-bold">
              h<sub>c</sub> = 2K / c
            </div>
          </div>
          <p>
            For a 3-4-5 triangle with area <em>K = 6</em>:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-center text-slate-700 dark:text-slate-300">
            h<sub>a</sub> = 12 / 3 = <strong>4.0000</strong>, &nbsp; h<sub>b</sub> = 12 / 4 = <strong>3.0000</strong>, &nbsp; h<sub>c</sub> = 12 / 5 = <strong>2.4000</strong>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Internal consistency check: &frac12;&middot;a&middot;h<sub>a</sub> = &frac12;&middot;b&middot;h<sub>b</sub> = &frac12;&middot;c&middot;h<sub>c</sub> = K.
          </p>
        </section>

        {/* Section 10: Medians */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Triangle Medians
          </h2>
          <p>
            A median is a line segment connecting a vertex to the midpoint of the opposite side. By Apollonius&apos;s theorem, the lengths of the three medians are:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs text-center pt-1">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 text-blue-600 dark:text-blue-400 font-bold">
              m<sub>a</sub> = &frac12;&radic;(2b&sup2; + 2c&sup2; &minus; a&sup2;)
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 text-blue-600 dark:text-blue-400 font-bold">
              m<sub>b</sub> = &frac12;&radic;(2a&sup2; + 2c&sup2; &minus; b&sup2;)
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 text-blue-600 dark:text-blue-400 font-bold">
              m<sub>c</sub> = &frac12;&radic;(2a&sup2; + 2b&sup2; &minus; c&sup2;)
            </div>
          </div>
          <p>
            For a 5-6-7 triangle, the median to side <em>a = 5</em> is:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-center text-slate-700 dark:text-slate-300">
            m<sub>a</sub> = &frac12;&radic;[2(6&sup2;) + 2(7&sup2;) &minus; 5&sup2;] = &frac12;&radic;[72 + 98 &minus; 25] = &frac12;&radic;145 &approx; <strong>6.0208</strong>
          </div>
        </section>

        {/* Section 11: Inradius and Circumradius */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Inradius (r) and Circumradius (R)
          </h2>
          <p>
            Every triangle has two unique concentric circles associated with its boundary geometry:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                Inradius (r = Area / s)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The inradius <em>r</em> is the radius of the incircle inscribed inside the triangle, tangent to all three sides:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-sm font-bold text-center text-blue-600 dark:text-blue-400">
                r = K / s
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                For a 3-4-5 triangle: <em>K = 6</em>, <em>s = 6</em> &implies; <strong>r = 6 / 6 = 1.0000</strong>.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                Circumradius (R = abc / 4K)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The circumradius <em>R</em> is the radius of the circumcircle passing through all three vertices:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 font-mono text-sm font-bold text-center text-blue-600 dark:text-blue-400">
                R = (a &middot; b &middot; c) / (4K)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                For a 3-4-5 triangle: <em>(3 &middot; 4 &middot; 5) / (4 &middot; 6) = 60 / 24</em> &implies; <strong>R = 2.5000</strong>.
              </p>
            </div>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200">
            <strong>Standard Notation:</strong> Always use lowercase <em>r</em> for inradius and uppercase <em>R</em> for circumradius. By Euler&apos;s inequality, <em>R &ge; 2r</em> for all planar triangles, with equality holding if and only if the triangle is equilateral.
          </div>
        </section>

        {/* Section 12: Triangle Inequality Verification */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Triangle Inequality &amp; Existence Verification
          </h2>
          <p>
            Not every triplet of positive numbers can form a geometric triangle. For three segments to connect and form a closed polygon, they must strictly satisfy the <strong>Triangle Inequality</strong>:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 text-center font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            a + b &gt; c &nbsp;|&nbsp; a + c &gt; b &nbsp;|&nbsp; b + c &gt; a
          </div>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 dark:text-slate-300">
            <li>
              <strong>Degenerate Case (1, 2, 3):</strong> 1 + 2 = 3. Because the sum equals the third side, the vertices collapse into a single straight line with zero area.
            </li>
            <li>
              <strong>Impossible Case (1, 2, 4):</strong> 1 + 2 &lt; 4. The two shorter sides cannot span the distance between the endpoints of side 4.
            </li>
          </ul>
          <p>
            A robust mathematical engine must cleanly reject degenerate and impossible inputs rather than returning distorted zero-area configurations.
          </p>
        </section>

        {/* Section 13: Degrees vs Radians */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Degrees vs. Radians &amp; Exact Expressions
          </h2>
          <p>
            Angles may be represented in degrees (°) or radians (rad). A full circle corresponds to 360° = 2&pi; radians:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs pt-1">
            <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700/60">
              &pi; / 6 = <strong>30°</strong>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700/60">
              &pi; / 4 = <strong>45°</strong>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700/60">
              &pi; / 3 = <strong>60°</strong>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700/60">
              &pi; / 2 = <strong>90°</strong>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700/60">
              2&pi; / 3 = <strong>120°</strong>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700/60">
              3&pi; / 4 = <strong>135°</strong>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700/60">
              5&pi; / 6 = <strong>150°</strong>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700/60">
              2&pi; = <strong>360°</strong>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            When entering radians, numerator coefficients are crucial: <code>2*pi/3</code> evaluates to 120°, whereas <code>pi/3</code> evaluates to 60°.
          </p>
        </section>

        {/* Section 14: Triangle Classifications */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Complete Triangle Classification Guide
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                Classification by Side Lengths:
              </h3>
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 list-disc pl-4">
                <li><strong>Equilateral:</strong> All 3 sides are equal (a = b = c), all angles 60°.</li>
                <li><strong>Isosceles:</strong> 2 sides are equal, with equal opposite base angles.</li>
                <li><strong>Scalene:</strong> All 3 sides have distinct lengths (a &ne; b &ne; c).</li>
              </ul>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                Classification by Interior Angles:
              </h3>
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 list-disc pl-4">
                <li><strong>Acute:</strong> All three angles are strictly less than 90°.</li>
                <li><strong>Right:</strong> Exactly one interior angle equals 90° (&pi;/2 rad).</li>
                <li><strong>Obtuse:</strong> Exactly one interior angle is greater than 90°.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 15: Worked Golden Example: 3-4-5 Triangle */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Complete Worked Example: Solving the 3-4-5 Triangle
          </h2>
          <p>
            Consider a triangle with side lengths <strong>a = 3</strong>, <strong>b = 4</strong>, and <strong>c = 5</strong>:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
            <div className="space-y-1">
              <strong>Step 1: Check Triangle Inequality:</strong> 3 + 4 &gt; 5 (7 &gt; 5). A valid closed triangle exists.
            </div>
            <div className="space-y-1">
              <strong>Step 2: Identify Triangle Type:</strong> 3&sup2; + 4&sup2; = 9 + 16 = 25 = 5&sup2;. By the converse of Pythagoras, it is a right triangle with right angle at <em>C = 90°</em>.
            </div>
            <div className="space-y-1">
              <strong>Step 3: Solve Angles:</strong> sin A = 3/5 = 0.6 &implies; <em>A &approx; 36.8699°</em>; sin B = 4/5 = 0.8 &implies; <em>B &approx; 53.1301°</em>.
            </div>
            <div className="space-y-1">
              <strong>Step 4: Area &amp; Perimeter:</strong> Area <em>K = &frac12;&middot;3&middot;4 = 6</em>; Perimeter <em>P = 3 + 4 + 5 = 12</em>; Semiperimeter <em>s = 12 / 2 = 6</em>.
            </div>
            <div className="space-y-1">
              <strong>Step 5: Altitudes:</strong> h<sub>a</sub> = 12/3 = 4, &nbsp; h<sub>b</sub> = 12/4 = 3, &nbsp; h<sub>c</sub> = 12/5 = 2.4.
            </div>
            <div className="space-y-1">
              <strong>Step 6: Inradius &amp; Circumradius:</strong> Inradius <em>r = 6 / 6 = 1.0000</em>; Circumradius <em>R = (3 &middot; 4 &middot; 5) / (4 &middot; 6) = 2.5000</em>.
            </div>
            <div className="mt-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
              A &approx; 36.8699°, &nbsp; B &approx; 53.1301°, &nbsp; C = 90.0000° &nbsp;|&nbsp; Area = 6, &nbsp; P = 12, &nbsp; r = 1, &nbsp; R = 2.5
            </div>
          </div>
        </section>

        {/* Section 16: Verification & Cross-Checking */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. How to Verify a Triangle Calculation
          </h2>
          <p>
            Even with an automated solver, cross-checking results ensures geometric consistency:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 dark:text-slate-300">
            <li><strong>Angle Sum:</strong> Sum computed angles: <em>A + B + C = 180°</em> within numerical rounding.</li>
            <li><strong>Side-Angle Ordering:</strong> The largest angle must always face the longest side, and the smallest angle faces the shortest side.</li>
            <li><strong>Area Consistency:</strong> Verify that <em>K = &frac12;&middot;a&middot;h<sub>a</sub> = &frac12;&middot;b&middot;h<sub>b</sub> = &frac12;&middot;c&middot;h<sub>c</sub></em> matches Heron&apos;s formula.</li>
            <li><strong>Radius Cross-Check:</strong> Confirm that Euler&apos;s inequality holds: <em>R &ge; 2r</em>.</li>
          </ul>
        </section>

        {/* Section 17: Interactive Vector Diagram */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Geometric Vector Visualization
          </h2>
          <p>
            Numerical outputs alone can mask transposition errors. The interactive SVG visualizer in this calculator uses uniform isometric scaling—meaning angles, side proportions, and circular tangencies are rendered true to scale without anisotropic distortion.
          </p>
          <p>
            When toggled, the circumcircle accurately intersects all three vertices (A, B, C), and the incircle maintains precise internal tangency to all three sides.
          </p>
        </section>

        {/* Section 18: Common Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Common Triangle-Calculation Mistakes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 text-xs">Transposing Opposite Pairs:</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Associating side <em>a</em> with angle <em>B</em> or <em>C</em> invalidates the Law of Sines and Law of Cosines. Side <em>a</em> must always face angle <em>A</em>.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 text-xs">Applying Pythagoras to Non-Right Triangles:</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <em>a&sup2; + b&sup2; = c&sup2;</em> holds strictly when <em>C = 90°</em>. For general acute or obtuse triangles, use the Law of Cosines.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 text-xs">Ignoring the SSA Ambiguous Case:</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Two sides and a non-included angle can produce two valid geometric configurations. Ensure both solutions are reviewed.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 text-xs">Confusing Inradius (r) with Circumradius (R):</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Lowercase <em>r</em> is the internal tangent circle (r = K / s); uppercase <em>R</em> is the external circumcircle passing through vertices (R = abc / 4K).
              </p>
            </div>
          </div>
        </section>

        {/* Section 19: Practical Applications */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Applications in Surveying, Engineering &amp; Physics
          </h2>
          <p>
            Triangulation forms the foundation of modern geodesy, global navigation (GPS), robotics kinematics, and structural engineering. In static mechanics, truss systems are decomposed into triangular networks because the triangle is the only rigid 2D polygon whose angles cannot deform without changing side lengths. In physics, vector addition and orthogonal force decomposition rely directly on right-triangle and oblique-triangle trigonometry.
          </p>
        </section>

        {/* Section 20: Precision, Rounding and Units */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Precision, Rounding, and Units
          </h2>
          <p>
            Geometrical solutions often involve irrational numbers such as &radic;3 or non-terminating decimals. This calculator maintains full 64-bit IEEE floating-point precision internally and rounds strictly at the display layer according to the user&apos;s active precision setting (2, 4, or 6 decimals), preserving exact trailing zeros. Physical units are preserved: if input sides are in meters, perimeter and radii are in meters, and area is in square meters.
          </p>
        </section>

        {/* Section 21: Practical Workflow */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            21. Systematic Method for Solving Any Triangle
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <li><strong>Identify Knowns:</strong> List all given sides and angles with their corresponding opposite pairs (a-A, b-B, c-C).</li>
              <li><strong>Classify Case:</strong> Identify whether the problem is SSS, SAS, ASA, AAS, or SSA.</li>
              <li><strong>Select Theorem:</strong> Use the Law of Cosines for SSS/SAS, the Law of Sines for ASA/AAS, and the Pythagorean theorem for right triangles.</li>
              <li><strong>Verify Bounds:</strong> Confirm triangle inequality and angle sums.</li>
              <li><strong>Compute Metrics:</strong> Calculate secondary metrics: area, perimeter, altitudes, medians, inradius <em>r</em>, and circumradius <em>R</em>.</li>
            </ol>
          </div>
        </section>

        {/* Section 22: Final Educational Summary */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            22. Summary &amp; Key Takeaways
          </h2>
          <p>
            Solving a triangle is an exercise in identifying the geometric dependencies between given parameters. Use the triangle inequality to verify physical possibility, the Law of Cosines for three sides or two sides with an included angle, the Law of Sines when side-angle pairs are available, and Heron&apos;s formula for robust area calculations. Once the core boundary is determined, all secondary properties—from altitudes and medians to inradii and circumradii—follow deterministically.
          </p>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 3. FAQ SECTION (Unfolded by Default, Interactive Accordion)                */}
      {/* ========================================================================= */}
      <div className="pt-8">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {triangleFaqs.map((faq, idx) => {
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
                    <span className="text-blue-600 dark:text-blue-400 font-mono tabular-nums text-xs font-bold shrink-0">
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

      {/* ========================================================================= */}
      {/* 4. RELATED CALCULATORS — AFTER MAIN CONTENT & FAQ                         */}
      {/* ========================================================================= */}
      <div className="pt-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <Calculator className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Related Calculators</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <Link
              href="/calculators/pythagorean-theorem-calculator"
              className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700/70 hover:border-blue-500 hover:shadow-xs transition-all flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 group"
            >
              <span>Pythagorean Theorem Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1.5" />
            </Link>
            <Link
              href="/calculators/right-triangle-calculator"
              className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700/70 hover:border-blue-500 hover:shadow-xs transition-all flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 group"
            >
              <span>Right Triangle Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1.5" />
            </Link>
            <Link
              href="/calculators/area-calculator"
              className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700/70 hover:border-blue-500 hover:shadow-xs transition-all flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 group"
            >
              <span>Area Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TriangleContent;
