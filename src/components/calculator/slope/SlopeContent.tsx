"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Compass,
  ArrowRight,
  TrendingUp
} from "lucide-react";

export function SlopeContent() {
  // All 10 FAQs unfolded / open by default as requested
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 10 }, (_, i) => i))
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

  const slopeFaqs = [
    {
      question: "What is the formula for slope?",
      answer:
        "The slope formula is m = (y₂ - y₁) / (x₂ - x₁). It is also called rise over run because the numerator represents the vertical change (Δy) and the denominator represents the horizontal change (Δx)."
    },
    {
      question: "How do you find the slope between two points?",
      answer:
        "Subtract the first y-coordinate from the second y-coordinate to find the rise: Δy = y₂ - y₁. Then subtract the first x-coordinate from the second x-coordinate to find the run: Δx = x₂ - x₁. Finally, divide the rise by the run: m = Δy / Δx."
    },
    {
      question: "What does a positive slope mean?",
      answer:
        "A positive slope (m > 0) means the line rises from left to right. As x increases, y increases proportionally along the incline."
    },
    {
      question: "What does a negative slope mean?",
      answer:
        "A negative slope (m < 0) means the line falls from left to right. As x increases, y decreases proportionally along the decline."
    },
    {
      question: "What is the slope of a horizontal line?",
      answer:
        "A horizontal line has a slope of exactly zero (m = 0) because its vertical change is zero (Δy = 0). Its equation is written as y = c, where c is a constant."
    },
    {
      question: "What is the slope of a vertical line?",
      answer:
        "A vertical line has an undefined slope because the horizontal run is zero (Δx = 0), which requires division by zero. Its equation is written as x = c rather than y = mx + b."
    },
    {
      question: "Does reversing the two points change the slope?",
      answer:
        "No. Reversing the points negates both the rise and the run: (y₁ - y₂) / (x₁ - x₂) = -(y₂ - y₁) / -(x₂ - x₁) = (y₂ - y₁) / (x₂ - x₁). The negative signs cancel, leaving the geometric slope unchanged."
    },
    {
      question: "How do I find the equation of a line from two points?",
      answer:
        "First calculate the slope m. Then substitute either point (x₁, y₁) into slope-intercept form y = mx + b to solve for the y-intercept b = y₁ - m·x₁. Alternatively, use point-slope form (y - y₁) = m(x - x₁) and simplify to y = mx + b."
    },
    {
      question: "What is the perpendicular slope?",
      answer:
        "For a nonvertical, nonhorizontal line, the perpendicular slope is the negative reciprocal: m⊥ = -1 / m. Horizontal and vertical lines are special cases: the perpendicular to a horizontal line (m = 0) is vertical (undefined slope), and the perpendicular to a vertical line is horizontal (m⊥ = 0)."
    },
    {
      question: "Can two identical points determine a slope?",
      answer:
        "No. If both points are identical (coincident, P₁ = P₂), Δx = 0 and Δy = 0. Infinitely many lines pass through a single point, so two identical points do not uniquely define a straight line. The calculation is degenerate."
    }
  ];

  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
      {/* 1. RELATED CALCULATORS — ABOVE CONTENT (SINGLE SIDE SECTION) */}
      <div className="pb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          Related Calculators:
        </span>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <Link
            href="/calculators/distance-calculator"
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Distance Calculator
          </Link>
          <Link
            href="/calculators/triangle-calculator"
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Triangle Calculator
          </Link>
          <Link
            href="/calculators/pythagorean-calculator"
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Pythagorean Calculator
          </Link>
        </div>
      </div>

      {/* 2. SHORT INTRO & ON-PAGE ANCHOR NAVIGATION */}
      <div className="pt-6 space-y-6">
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Calculate the slope of a line from two points using the rise-over-run formula. This Slope Calculator also determines the horizontal and vertical change, distance between points, incline angle, y-intercept, and line equation. Use the additional tools to find a missing endpoint, construct parallel and perpendicular lines, or calculate the angle between two intersecting lines.
          </p>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Enter coordinates directly and the calculator shows the result, formula, and geometric relationships so you can check not only the answer, but also how it was obtained.
          </p>
        </div>

        {/* On-Page Navigation Table of Contents */}
        <nav aria-label="Slope Calculator guide" className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span>Table of Contents</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <a href="#what-is-slope" className="hover:underline">1. What Is Slope?</a>
            <a href="#slope-between-two-points" className="hover:underline">2. Slope Between Two Points</a>
            <a href="#positive-negative-zero-undefined" className="hover:underline">4. 4 Basic Slope Cases</a>
            <a href="#line-equation" className="hover:underline">5. Equation of a Line</a>
            <a href="#parallel-perpendicular" className="hover:underline">8. Parallel &amp; Perpendicular</a>
            <a href="#angle-between-lines" className="hover:underline">10. Angle Between Two Lines</a>
            <a href="#common-mistakes" className="hover:underline">17. Common Slope Mistakes</a>
            <a href="#slope-faq" className="hover:underline">Frequently Asked Questions</a>
          </div>
        </nav>
      </div>

      {/* 3. HOW TO USE SECTION */}
      <div id="how-to-use" className="pt-6 space-y-4 text-xs sm:text-sm">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
          How to Use the Slope Calculator
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300">
          <li><strong>Enter the coordinates of the first point</strong>, (x₁, y₁).</li>
          <li><strong>Enter the coordinates of the second point</strong>, (x₂, y₂).</li>
          <li><strong>The calculator determines the rise Δy and run Δx</strong> automatically.</li>
          <li><strong>Read the slope, distance, incline angle, and line equation</strong> across slope-intercept, point-slope, and standard forms.</li>
          <li><strong>Use the additional tools</strong> when you need a missing endpoint, a parallel or perpendicular line, or the angle between two lines.</li>
          <li><strong>Use the copy, save, CSV, PDF, or print options</strong> when you need to keep or share the calculation.</li>
        </ol>
      </div>

      {/* 4. EXPANDED MAIN EDUCATIONAL CONTENT (19 COMPLETE SECTIONS) */}
      <div className="pt-6 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section id="what-is-slope" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is Slope?
          </h2>
          <p>
            Slope measures how a straight line changes vertically relative to how far it changes horizontally. In coordinate geometry, slope is usually represented by <em>m</em> and is defined as rise divided by run:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-slate-900 dark:text-slate-100">
            m = Δy / Δx
          </div>
          <p>
            For two points (x₁, y₁) and (x₂, y₂), the slope is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-slate-900 dark:text-slate-100">
            m = (y₂ - y₁) / (x₂ - x₁)
          </div>
          <p>
            The numerator is the rise, or vertical change. The denominator is the run, or horizontal change. This is the standard slope formula used in algebra and coordinate geometry.
          </p>
          <p>
            A positive slope means the line rises as you move from left to right. A negative slope means it falls. A zero slope describes a horizontal line, while a vertical line has an undefined slope because its horizontal change is zero.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">A useful way to think about slope:</h3>
            <p>
              Suppose a line has slope <strong>m = 2</strong>. That means every increase of 1 unit in x corresponds to an increase of 2 units in y. For <strong>m = -1/2</strong>, the line falls by 1 unit vertically for every 2 units of horizontal movement to the right.
            </p>
            <p>
              So slope is not simply “how steep a line looks.” It is a numerical description of the relationship between horizontal and vertical change.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="slope-between-two-points" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How to Calculate Slope Between Two Points
          </h2>
          <p>
            To calculate slope from two coordinates, use the three-step coordinate relationship:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Step 1: Find the rise:</strong> Δy = y₂ - y₁</li>
            <li><strong>Step 2: Find the run:</strong> Δx = x₂ - x₁</li>
            <li><strong>Step 3: Divide rise by run:</strong> m = Δy / Δx</li>
          </ul>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Worked Example:</h3>
            <p>Take the points (1, 1) and (4, 7):</p>
            <p className="font-mono">
              The rise is: 7 - 1 = 6<br />
              The run is: 4 - 1 = 3<br />
              Therefore: m = 6 / 3 = 2
            </p>
            <p>
              The calculator uses exactly this coordinate relationship and also calculates the distance and incline angle from the same two points. The standard formula is independently documented in OpenStax&apos;s treatment of slope.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="rise-over-run" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Rise Over Run: What Slope Actually Represents
          </h2>
          <p>
            The phrase <em>rise over run</em> is a compact way to remember the slope formula: slope = rise / run, where rise = y₂ - y₁ and run = x₂ - x₁. This interpretation is useful when working from a graph.
          </p>
          <p>
            For example, if a line moves 4 units upward while moving 2 units to the right: m = 4 / 2 = 2. If it moves 4 units downward while moving 2 units to the right: m = -4 / 2 = -2. The magnitude tells you the rate of vertical change; the sign tells you the direction.
          </p>
          <p>
            When reading slope visually from a graph, rely on the coordinate values rather than the apparent steepness of the picture. A graph whose horizontal and vertical scales are different can make a line look steeper or flatter than its numerical slope suggests.
          </p>
        </section>

        {/* Section 4 */}
        <section id="positive-negative-zero-undefined" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Positive, Negative, Zero, and Undefined Slope
          </h2>
          <p>There are four basic slope cases in coordinate geometry:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-emerald-600 dark:text-emerald-400">Positive slope (m &gt; 0)</h3>
              <p className="text-slate-600 dark:text-slate-400">
                The line rises from left to right (e.g. m = 2). As x increases, y increases.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-red-600 dark:text-red-400">Negative slope (m &lt; 0)</h3>
              <p className="text-slate-600 dark:text-slate-400">
                The line falls from left to right (e.g. m = -2). As x increases, y decreases.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-blue-600 dark:text-blue-400">Zero slope (m = 0)</h3>
              <p className="text-slate-600 dark:text-slate-400">
                The line is horizontal. Its equation can be written as y = c, where c is a constant.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-purple-600 dark:text-purple-400">Undefined slope</h3>
              <p className="text-slate-600 dark:text-slate-400">
                A vertical line has x = c. For a vertical line, x₂ - x₁ = 0, so the formula requires division by zero. The slope is undefined, not zero.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            This distinction is especially important: Horizontal line → slope 0 | Vertical line → undefined slope. The calculator handles both cases explicitly rather than replacing an undefined slope with an artificial numerical value.
          </p>
        </section>

        {/* Section 5 */}
        <section id="line-equation" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            5. How to Find the Equation of a Line From Two Points
          </h2>
          <p>
            Once the slope is known, the equation of a nonvertical line can be written in slope-intercept form:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-slate-900 dark:text-slate-100">
            y = mx + b
          </div>
          <p>
            where <em>m</em> is the slope and <em>b</em> is the y-intercept. The point-slope form is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-slate-900 dark:text-slate-100">
            y - y₁ = m(x - x₁)
          </div>
          <p>
            This form is especially useful when you know one point and the slope. It can then be rearranged into slope-intercept form.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Example:</h3>
            <p>Using (1, 1) and (4, 7), we found m = 2. Substituting (1, 1) into y = mx + b gives 1 = 2(1) + b, so b = -1. Therefore the line equation is:</p>
            <p className="font-mono font-bold text-blue-600 dark:text-blue-400">y = 2x - 1</p>
            <p>The same equation can be verified using the second point: 7 = 2(4) - 1, which is correct.</p>
            <p>For vertical lines, slope-intercept form is not appropriate. A vertical line is written directly as x = c because its slope is undefined.</p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="incline-angle" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Slope, Incline Angle, and Direction
          </h2>
          <p>
            Slope can also be related to the angle a line makes with the positive horizontal axis. For a nonvertical line:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-slate-900 dark:text-slate-100">
            m = tan(θ)  ⇒  θ = arctan(m)
          </div>
          <p>
            The calculator reports the corresponding incline angle and uses the defined geometric convention consistently for negative-sloping lines as well. For example, m = 2 gives θ = arctan(2) ≈ 63.4349°.
          </p>
          <p>
            The angle tells you the line&apos;s orientation, while the slope gives its vertical change per unit horizontal change. These are related measurements, but they are not interchangeable:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Slope</strong> is a dimensionless ratio.</li>
            <li><strong>Incline angle</strong> is an angle measured in degrees and radians.</li>
            <li><strong>Distance</strong> is a linear length.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section id="distance-between-points" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Distance Between Two Points
          </h2>
          <p>
            The same two coordinates can be used to calculate the straight-line distance between the points using the Euclidean distance formula:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-slate-900 dark:text-slate-100">
            d = √[(x₂ - x₁)² + (y₂ - y₁)²]
          </div>
          <p>
            This can be understood as the hypotenuse of the right triangle formed by the rise and run. For (1, 1) and (4, 7), we have Δx = 3 and Δy = 6, therefore:
          </p>
          <p className="font-mono text-center">
            d = √[3² + 6²] = √[9 + 36] = √45 ≈ 6.7082
          </p>
          <p>
            Notice that slope and distance answer different questions. Slope describes direction and rate of change, while distance describes how far apart the points are. For dedicated geodesic and multidimensional distance calculations, explore our{" "}
            <Link href="/calculators/distance-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Distance Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 8 */}
        <section id="parallel-perpendicular" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Parallel and Perpendicular Lines
          </h2>
          <p>
            The relationship between slopes becomes particularly useful when constructing lines.
          </p>
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-blue-600 dark:text-blue-400">Parallel Lines:</h3>
              <p>
                Two nonvertical parallel lines have identical slopes: <strong>m₁ = m₂</strong>. For example, if m = 2, every nonvertical line parallel to it also has slope 2. The actual line equation changes according to the target point through which the new line must pass.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-emerald-600 dark:text-emerald-400">Perpendicular Lines:</h3>
              <p>
                For two nonvertical lines, perpendicular slopes satisfy <strong>m₁ · m₂ = -1</strong>, so the perpendicular slope is the negative reciprocal: <strong>m₂ = -1 / m₁</strong>. For m = 2, the perpendicular slope is -1/2 = -0.5.
              </p>
            </div>
          </div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">Geometric Boundary Special Cases:</p>
          <p>
            A horizontal line has <strong>m = 0</strong>, and its perpendicular is vertical: <strong>x = c</strong>. A vertical line has undefined slope, and its perpendicular is horizontal: <strong>y = c</strong>. These cases cannot be handled correctly by blindly calculating -1/m; they require separate geometric treatment. This calculator explicitly handles these special cases.
          </p>
        </section>

        {/* Section 9 */}
        <section id="missing-endpoint" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            9. How to Find a Missing Endpoint
          </h2>
          <p>
            Sometimes one point, a distance, and a slope are known while the second point is not. Suppose (x₁, y₁) is known, along with distance <em>d</em> and slope <em>m</em>.
          </p>
          <p>
            The slope determines the direction of the line, while the distance determines how far along that direction the second point lies. For example: P₁ = (1, 1), d = 5, m = 0.75. Since tan(θ) = 0.75, the corresponding directional ratios are cos(θ) = 0.8 and sin(θ) = 0.6.
          </p>
          <p className="font-mono text-center">
            x₂ = 1 + 5(0.8) = 5,  y₂ = 1 + 5(0.6) = 4  ⇒  (5, 4)
          </p>
          <p>
            The opposite collinear direction gives (-3, -2). The calculator exposes both directional possibilities instead of hiding the geometric ambiguity.
          </p>
        </section>

        {/* Section 10 */}
        <section id="angle-between-lines" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Angle Between Two Lines
          </h2>
          <p>
            For two nonvertical lines with slopes m₁ and m₂, the acute intersection angle between them can be found using:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-slate-900 dark:text-slate-100">
            tan(θ) = | (m₂ - m₁) / (1 + m₁·m₂) |
          </div>
          <p>
            This allows the calculator to determine both the acute and supplementary obtuse intersection angles. For m₁ = 1 and m₂ = -2, we get tan(θ) = 3, so θ ≈ 71.5651°. The supplementary obtuse angle is 180° - 71.5651° ≈ 108.4349°. To solve general triangular angles and side relationships, see our{" "}
            <Link href="/calculators/triangle-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Triangle Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 11 */}
        <section id="worked-example" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Worked Example: Finding Slope, Distance, Angle, and Equation
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <p>Consider P₁ = (1, 1) and P₂ = (4, 7):</p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-xs sm:text-sm">
              <li>Rise: Δy = 7 - 1 = 6</li>
              <li>Run: Δx = 4 - 1 = 3</li>
              <li>Slope: m = 6 / 3 = 2</li>
              <li>Distance: d = √[3² + 6²] = √45 ≈ 6.7082</li>
              <li>Incline angle: θ = arctan(2) ≈ 63.4349°</li>
              <li>Equation: Substituting (1, 1) into y = mx + b yields 1 = 2(1) + b ⇒ b = -1 ⇒ <strong>y = 2x - 1</strong></li>
            </ul>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              The calculator produces the same complete set of results with visual Cartesian right-triangle guides.
            </p>
          </div>
        </section>

        {/* Section 12 */}
        <section id="reversing-points" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Why Reversing the Two Points Does Not Change the Slope
          </h2>
          <p>
            Suppose the points are entered in the opposite order: (4, 7) then (1, 1). The differences become Δy = 1 - 7 = -6 and Δx = 1 - 4 = -3. Therefore:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-slate-900 dark:text-slate-100">
            m = (-6) / (-3) = 2
          </div>
          <p>
            Both numerator and denominator change sign, so their ratio remains unchanged. The rise and run individually change signs, but the geometric slope does not.
          </p>
        </section>

        {/* Section 13 */}
        <section id="same-x-coordinate" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            13. What Happens When the Two Points Have the Same x-Coordinate?
          </h2>
          <p>
            Consider (3, 1) and (3, 9). Then Δx = 3 - 3 = 0 and Δy = 9 - 1 = 8. The slope calculation would require m = 8 / 0. Division by zero is undefined, so the slope is undefined.
          </p>
          <p>
            The line itself is perfectly valid: <strong>x = 3</strong>. This is a vertical line. It is therefore better to say <em>undefined slope</em> rather than “infinite slope” when describing the mathematical result. The equation x = 3 is the exact representation of the line.
          </p>
        </section>

        {/* Section 14 */}
        <section id="coincident-points" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            14. What Happens When the Two Points Are Identical?
          </h2>
          <p>
            Consider P₁ = (5, 5) and P₂ = (5, 5). Here Δx = 0 and Δy = 0. This is fundamentally different from an ordinary vertical line.
          </p>
          <p>
            A pair of identical points does not uniquely define a straight line. Infinitely many lines pass through the same single point. Therefore the correct result is not x = 5 and not a numerical slope. It is an invalid or degenerate two-point line definition. The calculator explicitly identifies coincident points and reports that they do not define a unique line.
          </p>
        </section>

        {/* Section 15 */}
        <section id="practical-applications" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Slope in Practical Applications
          </h2>
          <p>Slope is used whenever a change in one quantity is compared with a change in another:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Road &amp; Ramp Grades</h3>
              <p className="text-slate-600 dark:text-slate-400">
                A road rising 2 metres for every 20 metres horizontally has a slope of 2/20 = 0.10, or 10% grade. Wheelchair ramps require ADA compliance (1:12 slope).
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Roof Pitch</h3>
              <p className="text-slate-600 dark:text-slate-400">
                A roof&apos;s rise-to-run relationship (inches of rise per 12 inches of run) governs drainage, snow load distribution, and roofing materials.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Physics &amp; Data Science</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Slope represents velocity on position-time graphs, acceleration on velocity-time graphs, and marginal cost in economics regression models.
              </p>
            </div>
          </div>
        </section>

        {/* Section 16 */}
        <section id="slope-vs-grade" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Slope vs. Percent Grade
          </h2>
          <p>
            Slope and percent grade are closely related but should not be confused. If m = rise / run, then percent grade is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-slate-900 dark:text-slate-100">
            Grade = 100 × m%
          </div>
          <p>
            For example, m = 0.05 corresponds to a 5% grade. A slope of m = 1 (a 45° incline) corresponds to a 100% grade. Percent grade is commonly used for ramps and roads, while slope is the more general mathematical ratio.
          </p>
        </section>

        {/* Section 17 */}
        <section id="common-mistakes" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Common Slope Mistakes
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Mixing the order of differences:</strong> Calculating (y₂ - y₁) / (x₁ - x₂) causes an erroneous sign flip. The exact same point order must be used in both numerator and denominator: (y₂ - y₁) / (x₂ - x₁).
            </li>
            <li>
              <strong>Confusing zero slope with undefined slope:</strong> Horizontal lines have m = 0 (run is nonzero, rise is 0). Vertical lines have undefined slope (run is 0, requiring division by zero).
            </li>
            <li>
              <strong>Assuming a vertical line fits y = mx + b:</strong> A vertical line cannot be expressed in slope-intercept form. Its true equation is x = c.
            </li>
            <li>
              <strong>Relying on visual steepness instead of coordinates:</strong> Unscaled browser windows or unequal Cartesian aspect ratios can make a line appear steeper or flatter than its numerical slope.
            </li>
            <li>
              <strong>Treating coincident points as a line:</strong> Two identical points do not form a unique line; they provide only one point, leaving orientation indeterminate.
            </li>
          </ul>
        </section>

        {/* Section 18 */}
        <section id="frequently-used-formulas" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Frequently Used Slope Formulas Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-slate-100">
                  <th className="p-3">Measurement / Concept</th>
                  <th className="p-3 font-mono">Mathematical Formula</th>
                  <th className="p-3">Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                <tr>
                  <td className="p-3 font-sans font-semibold">Slope from two points</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">m = (y₂ - y₁) / (x₂ - x₁)</td>
                  <td className="p-3 font-sans">Ratio of rise to run</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold">Horizontal Run</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">Δx = x₂ - x₁</td>
                  <td className="p-3 font-sans">Change in horizontal position</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold">Vertical Rise</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">Δy = y₂ - y₁</td>
                  <td className="p-3 font-sans">Change in vertical position</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold">Euclidean Distance</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">d = √[(Δx)² + (Δy)²]</td>
                  <td className="p-3 font-sans">Hypotenuse between coordinates</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold">Slope-Intercept Form</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">y = mx + b</td>
                  <td className="p-3 font-sans">m = slope, b = y-intercept</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold">Point-Slope Form</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">y - y₁ = m(x - x₁)</td>
                  <td className="p-3 font-sans">Formulated from known point</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold">Angle of Inclination</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">θ = arctan(m)</td>
                  <td className="p-3 font-sans">Angle with positive X-axis</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold">Perpendicular Slope</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">m⊥ = -1 / m</td>
                  <td className="p-3 font-sans">Negative reciprocal slope</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-semibold">Angle Between Lines</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">tan(θ) = |(m₂ - m₁) / (1 + m₁·m₂)|</td>
                  <td className="p-3 font-sans">Acute angle of intersection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 19 */}
        <section id="when-to-use" className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            19. When to Use This Slope Calculator
          </h2>
          <p>Use this calculator when you need to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Find the slope between any two known 2D coordinates.</li>
            <li>Determine complete line equations in slope-intercept, point-slope, or standard forms.</li>
            <li>Evaluate rise, run, Euclidean distance, and exact incline angles.</li>
            <li>Solve for a missing second endpoint from a starting point, distance, and slope or angle.</li>
            <li>Generate parallel and perpendicular line equations through any target point.</li>
            <li>Calculate the intersection angle between two intersecting lines.</li>
          </ul>
          <p>
            The calculator distinguishes normal, horizontal, vertical, and coincident-point cases instead of forcing all inputs through the same generic formula.
          </p>
          <div className="pt-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              For a textbook-level treatment of slope, point-slope form, and related line equations, see the{" "}
              <a
                href="https://openstax.org/books/elementary-algebra-2e/pages/4-4-slope-of-a-line"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-800"
              >
                OpenStax material on the slope of a line
              </a>{" "}
              and equations of lines.
            </p>
          </div>
        </section>
      </div>

      {/* 5. FAQ SECTION (10 Unfolded FAQs, Open by Default) */}
      <div id="slope-faq" className="pt-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions About Slope
          </h2>
        </div>

        <div className="space-y-3">
          {slopeFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-mono font-bold shrink-0">
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. RELATED CALCULATORS — AFTER CONTENT (SINGLE SIDE SECTION) */}
      <div className="pt-6">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          Related Calculators:
        </span>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <Link
            href="/calculators/distance-calculator"
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Distance Calculator
          </Link>
          <Link
            href="/calculators/triangle-calculator"
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Triangle Calculator
          </Link>
          <Link
            href="/calculators/pythagorean-calculator"
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Pythagorean Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}

export default SlopeContent;
