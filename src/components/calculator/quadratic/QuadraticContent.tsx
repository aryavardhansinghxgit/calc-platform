"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
  Superscript,
  Table,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { quadratic_formula_calculatorFaqs } from "@/app/calculators/quadratic-formula-calculator/faq";

export function QuadraticContent() {
  // All 32 FAQs unfolded (open by default)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 32 }, (_, i) => i))
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
      {/* 1. HERO INTRODUCTION */}
      {/* ========================================================================= */}
      <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        <div className="space-y-3">
          <p>
            Solve quadratic equations quickly and see exactly how the answer is obtained. This quadratic formula calculator solves equations in the form ax² + bx + c = 0 and shows the discriminant, roots, vertex, axis of symmetry, y-intercept and vertex form of the corresponding parabola.
          </p>
          <p>
            Unlike a result-only calculator, this tool also provides a step-by-step quadratic formula solution and alternative methods where applicable, including completing the square and factoring. An interactive parabola graph connects the algebraic result to the geometry of the quadratic function.
          </p>
          <p>
            The calculator supports positive, zero and negative discriminants, so it can handle equations with two real roots, one repeated real root, and two complex conjugate roots. It also identifies the special case where a = 0 and the equation is no longer quadratic.
          </p>
        </div>

        {/* Section: What Is the Quadratic Formula? */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is the Quadratic Formula?
          </h2>
          <p>
            For a quadratic equation in standard form,
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-center text-slate-900 dark:text-slate-100">
            ax² + bx + c = 0
          </div>
          <p>
            with a ≠ 0, the quadratic formula is:
          </p>
          <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50 font-mono text-sm font-bold text-center text-blue-900 dark:text-blue-300">
            x = (-b ± √(b² - 4ac)) / (2a)
          </div>
          <p>
            The expression <span className="font-mono font-bold">b² - 4ac</span> is called the discriminant.
          </p>
          <p>
            The quadratic formula provides the solutions of any quadratic equation whose leading coefficient is nonzero. The discriminant also tells you what type of solutions to expect before the equation is fully solved.
          </p>
        </section>

        {/* Section: How to Use */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use This Quadratic Formula Calculator
          </h2>
          <p>
            Enter the three coefficients:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-semibold text-slate-700 dark:text-slate-300">
            <li><strong>a:</strong> Quadratic coefficient (must be nonzero for quadratic behavior)</li>
            <li><strong>b:</strong> Linear coefficient</li>
            <li><strong>c:</strong> Constant term</li>
          </ul>
          <p>
            The calculator automatically forms the equation: <span className="font-mono font-bold">ax² + bx + c = 0</span>.
          </p>
          <p>
            It then evaluates the discriminant and determines whether the equation has:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-medium text-slate-700 dark:text-slate-300">
            <li>two distinct real roots</li>
            <li>one repeated real root</li>
            <li>two complex conjugate roots</li>
          </ul>
          <p>
            The result area also provides geometric information about the corresponding parabola. Depending on the equation, you can inspect:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold pt-1">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border">Roots (x₁, x₂)</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border">Discriminant (Δ)</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border">Vertex Point (h, k)</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border">Axis of Symmetry</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border">Y-Intercept (0, c)</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border">Vertex Form Equation</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border">Focus Coordinate</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border">Directrix Line</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border">Parabola Orientation</div>
          </div>
          <p>
            The step-by-step section shows how the quadratic formula is applied rather than only displaying the final answer.
          </p>
        </section>

        {/* Section: Standard Form */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is the Standard Form of a Quadratic Equation?
          </h2>
          <p>
            A quadratic equation is commonly written as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-center text-slate-900 dark:text-slate-100">
            ax² + bx + c = 0
          </div>
          <p>
            where a, b and c are constants and: <span className="font-mono font-bold">a ≠ 0</span>.
          </p>
          <p>
            The coefficient a controls the quadratic term, b controls the linear term, and c is the constant term.
          </p>
          <p>
            The condition a ≠ 0 matters because setting a = 0 removes the x² term. The equation then becomes linear:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-xs font-bold text-center text-slate-900 dark:text-slate-100">
            bx + c = 0
          </div>
          <p>
            The calculator explicitly handles this degenerate case instead of incorrectly applying the quadratic formula to a linear equation.
          </p>
        </section>

        {/* Section: Discriminant */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Does the Discriminant Tell You?
          </h2>
          <p>
            The discriminant is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-center text-blue-600 dark:text-blue-400">
            Δ = b² - 4ac
          </div>
          <p>
            Its sign determines the nature of the roots:
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border">
              <h3 className="font-bold text-sm text-emerald-600 dark:text-emerald-400">Δ &gt; 0</h3>
              <p>There are two distinct real roots. The parabola intersects the x-axis at two different points.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border">
              <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Δ = 0</h3>
              <p>There is one repeated real root. The parabola touches the x-axis at exactly one point.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border">
              <h3 className="font-bold text-sm text-purple-600 dark:text-purple-400">Δ &lt; 0</h3>
              <p>There are no real roots. For a quadratic with real coefficients, the two roots are a complex-conjugate pair.</p>
            </div>
          </div>

          <p>
            The calculator uses the discriminant both to classify the roots and to select the appropriate result and graph behavior.
          </p>

          {/* TABLE 1 */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Table 1: Discriminant Root Classification &amp; Parabola Geometry
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700">
                <thead>
                  <tr className="bg-blue-600 text-white font-bold">
                    <th className="p-2.5">Discriminant</th>
                    <th className="p-2.5">Root Type</th>
                    <th className="p-2.5">Graph Behavior</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <td className="p-2.5 font-mono font-bold">Δ &gt; 0</td>
                    <td className="p-2.5">Two distinct real roots</td>
                    <td className="p-2.5">Crosses x-axis twice</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-bold">Δ = 0</td>
                    <td className="p-2.5">One repeated real root</td>
                    <td className="p-2.5">Touches x-axis once (tangent vertex)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-bold">Δ &lt; 0</td>
                    <td className="p-2.5">Two complex conjugate roots</td>
                    <td className="p-2.5">No real x-axis intersections</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* MID-CONTENT INTERNAL LINK #1 */}
          <div className="p-4 bg-blue-50/70 dark:bg-slate-800/70 rounded-xl border border-blue-200 dark:border-slate-700 text-xs mt-3">
            <p className="text-slate-700 dark:text-slate-300">
              If you need to simplify radicals that appear inside quadratic solutions, the{" "}
              <Link href="/calculators/root-calculator" className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-800">
                Root Calculator &amp; Radical Simplifier
              </Link>{" "}
              can help with exact radical expressions separately.
            </p>
          </div>
        </section>

        {/* Section: Step-by-Step */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Solve a Quadratic Equation Step-by-Step
          </h2>
          <p>
            The quadratic formula can be applied systematically. Consider:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            x² - 5x + 6 = 0
          </div>
          <div className="space-y-2 text-xs font-mono pt-1">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">
              <strong className="font-sans text-blue-600">Step 1: Identify the coefficients</strong><br/>
              a = 1, b = -5, c = 6
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">
              <strong className="font-sans text-blue-600">Step 2: Calculate the discriminant</strong><br/>
              Δ = b² - 4ac = (-5)² - 4(1)(6) = 25 - 24 = 1
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">
              <strong className="font-sans text-blue-600">Step 3: Substitute into the quadratic formula</strong><br/>
              x = [-(-5) ± √1] / [2(1)]
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">
              <strong className="font-sans text-blue-600">Step 4: Simplify</strong><br/>
              √1 = 1 &rarr; x = (5 ± 1) / 2
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">
              <strong className="font-sans text-blue-600">Step 5: Evaluate both solutions</strong><br/>
              x₁ = (5 + 1) / 2 = 3<br/>
              x₂ = (5 - 1) / 2 = 2
            </div>
          </div>
          <p>
            The calculator displays these transformations as individual steps so that the calculation can be checked line by line.
          </p>
        </section>

        {/* Section: Worked Example */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Quadratic Formula Example: x² − 5x + 6 = 0
          </h2>
          <p>
            Take the equation:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            x² - 5x + 6 = 0
          </div>
          <p>
            The coefficients are: a = 1, b = -5, c = 6.
          </p>
          <p>
            Discriminant: Δ = (-5)² - 4(1)(6) = 1. Since Δ &gt; 0, the equation has two distinct real roots.
          </p>
          <p>
            Using the quadratic formula: x = [5 ± 1] / 2 &rarr; <strong>x₁ = 3, x₂ = 2</strong>.
          </p>
          <p>
            The corresponding parabola is: <span className="font-mono font-bold">y = x² - 5x + 6</span>.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono pt-1">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">Vertex: (2.5, -0.25)</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">Axis: x = 2.5</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">Y-Intercept: (0, 6)</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border">Focus: (2.5, 0)</div>
          </div>
          <p className="font-mono text-xs">
            Vertex form: y = (x - 2.5)² - 0.25
          </p>
          <p>
            Because a = 1 &gt; 0, the parabola opens upward and the vertex is the global minimum.
          </p>
        </section>

        {/* Section: Complex Roots Example */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Example With Complex Roots: 16x² − 5x + 6 = 0
          </h2>
          <p>
            Consider:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            16x² - 5x + 6 = 0
          </div>
          <p>
            Here: a = 16, b = -5, c = 6.
          </p>
          <p>
            The discriminant is: Δ = (-5)² - 4(16)(6) = 25 - 384 = -359.
          </p>
          <p>
            Because the discriminant is negative, there are no real roots. The complex roots are:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-center text-blue-600">
            x = 0.15625 ± 0.5921i &nbsp;(0.1563 ± 0.5921i)
          </div>
          <p>
            The calculator displays the conjugate pair rather than incorrectly showing only one complex root.
          </p>
          <p>
            The corresponding parabola opens upward because a is positive, but it does not cross the real x-axis because the quadratic has no real x-intercepts.
          </p>
        </section>

        {/* Section: Repeated Root */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Happens When the Discriminant Is Zero?
          </h2>
          <p>
            Take:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            x² - 6x + 9 = 0
          </div>
          <p>
            The discriminant is: Δ = (-6)² - 4(1)(9) = 36 - 36 = 0.
          </p>
          <p>
            The two algebraic roots coincide: <strong>x₁ = x₂ = 3</strong>. This is a repeated root.
          </p>
          <p>
            The parabola: <span className="font-mono font-bold">y = x² - 6x + 9</span> has vertex: <strong>(3, 0)</strong> and touches the x-axis at that point.
          </p>
          <p>
            The calculator treats this as one geometric point of contact rather than drawing two duplicate root markers on top of each other.
          </p>
        </section>

        {/* Section: Ways to Solve */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Ways to Solve a Quadratic Equation
          </h2>
          <p>
            The quadratic formula is universal for quadratic equations with a ≠ 0, but it is not the only method. This calculator also explains two important alternatives:
          </p>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Factoring</h3>
              <p>When a quadratic can be factored conveniently, the equation can be written as a product of linear factors.</p>
              <p className="font-mono">x² - 5x + 6 = 0 &rarr; (x - 2)(x - 3) = 0 &rarr; x = 2 or x = 3</p>
              <p>Factoring is often the quickest method when the factors are easy to identify.</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Completing the Square</h3>
              <p>Completing the square rewrites a quadratic into a perfect-square expression.</p>
              <p className="font-mono">x² - 5x = -6 &rarr; x² - 5x + 25/4 = 1/4 &rarr; (x - 5/2)² = 1/4</p>
              <p>Taking square roots produces the same two solutions: x = 3 or x = 2.</p>
            </div>
          </div>

          <p>
            These are mathematically equivalent methods; the best choice depends on the equation and the goal of the calculation.
          </p>

          {/* MID-CONTENT INTERNAL LINK #2 */}
          <div className="p-4 bg-blue-50/70 dark:bg-slate-800/70 rounded-xl border border-blue-200 dark:border-slate-700 text-xs mt-3">
            <p className="text-slate-700 dark:text-slate-300">
              For broader numerical and scientific calculations beyond quadratic equations, see the{" "}
              <Link href="/calculators/scientific-calculator" className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-800">
                Scientific Calculator
              </Link>.
            </p>
          </div>
        </section>

        {/* Section: Vertex */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Do You Find the Vertex of a Quadratic?
          </h2>
          <p>
            For <span className="font-mono font-bold">y = ax² + bx + c</span>, the x-coordinate of the vertex is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-center">
            h = -b / (2a)
          </div>
          <p>
            The y-coordinate is obtained by evaluating the function at h:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-center">
            k = f(h) = c - b² / (4a)
          </div>
          <p>
            Therefore the vertex is <span className="font-mono font-bold">(h, k)</span>.
          </p>
          <p>
            For x² - 5x + 6: h = 5/2 = 2.5, k = -0.25, so Vertex = <strong>(2.5, -0.25)</strong>.
          </p>
          <p>
            The vertex is especially useful because it identifies the minimum when a &gt; 0 and the maximum when a &lt; 0.
          </p>

          {/* MID-CONTENT INTERNAL LINK #3 */}
          <div className="p-4 bg-blue-50/70 dark:bg-slate-800/70 rounded-xl border border-blue-200 dark:border-slate-700 text-xs mt-3">
            <p className="text-slate-700 dark:text-slate-300">
              If you need to analyze exponents more generally, including exponential rather than quadratic expressions, use the{" "}
              <Link href="/calculators/exponent-calculator" className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-800">
                Exponent Calculator
              </Link>.
            </p>
          </div>
        </section>

        {/* Section: Axis of Symmetry */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is the Axis of Symmetry?
          </h2>
          <p>
            Every parabola is symmetric about a vertical line through its vertex. The equation of that line is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-center text-blue-600">
            x = -b / (2a)
          </div>
          <p>
            which is the same as the x-coordinate of the vertex. For x² - 5x + 6, the axis is <strong>x = 2.5</strong>.
          </p>
          <p>
            The interactive graph displays this symmetry visually. Changing any coefficient updates the axis automatically because it is calculated from the active equation.
          </p>
        </section>

        {/* Section: Y-Intercept */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Do You Find the Y-Intercept?
          </h2>
          <p>
            The y-intercept occurs where <span className="font-mono font-bold">x = 0</span>. For y = ax² + bx + c, substituting x = 0 gives:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-center">
            y = c &rarr; Y-Intercept = (0, c)
          </div>
          <p>
            For x² - 5x + 6, the y-intercept is <strong>(0, 6)</strong>. The calculator displays this coordinate and uses the same value when plotting the parabola.
          </p>
        </section>

        {/* Section: Vertex Form */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Vertex Form?
          </h2>
          <p>
            A quadratic can also be written as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-center text-blue-600">
            y = a(x - h)² + k
          </div>
          <p>
            where <span className="font-mono font-bold">(h, k)</span> is the vertex. Vertex form makes the geometry of the parabola easier to read:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li><strong>a &gt; 0:</strong> opens upward, vertex gives global minimum</li>
            <li><strong>a &lt; 0:</strong> opens downward, vertex gives global maximum</li>
          </ul>
          <p>
            This is one reason vertex form is especially useful for optimization problems. The calculator converts the standard quadratic into vertex form automatically.
          </p>
        </section>

        {/* Section: Focus and Directrix */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Are the Focus and Directrix of a Parabola?
          </h2>
          <p>
            A parabola can be defined geometrically as the set of points that are equidistant from a fixed point called the focus and a fixed line called the directrix.
          </p>
          <p>
            For y = a(x - h)² + k, rewrite as: (x - h)² = 4p(y - k), which gives:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-center">
            p = 1 / (4a)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border">Focus Point: (h, k + p)</div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border">Directrix Line: y = k - p</div>
          </div>
          <p>
            For y = (x - 2.5)² - 0.25, we have p = 0.25, so the focus is <strong>(2.5, 0)</strong> and the directrix is <strong>y = -0.5</strong>.
          </p>
        </section>

        {/* Section: Parabola Orientation */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Does the Coefficient a Affect the Parabola?
          </h2>
          <p>
            The coefficient a controls whether the parabola opens upward or downward:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li><strong>If a &gt; 0:</strong> the parabola opens upward and the vertex is a minimum.</li>
            <li><strong>If a &lt; 0:</strong> the parabola opens downward and the vertex is a maximum.</li>
          </ul>
          <p>
            The magnitude of a also affects how narrow or wide the parabola appears relative to y = x². A larger |a| produces a tighter curve, while a smaller |a| produces a wider curve.
          </p>
        </section>

        {/* Section: Graph */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Does the Interactive Parabola Graph Work?
          </h2>
          <p>
            The graph plots the quadratic function: <span className="font-mono font-bold">y = ax² + bx + c</span> using the currently entered coefficients.
          </p>
          <p>
            It visually connects the algebraic solution with the geometry of the function by showing features such as the parabola curve, vertex marker, dashed axis of symmetry, x-intercepts when real roots exist, and y-intercept.
          </p>
          <p>
            When the discriminant is negative, the graph does not show imaginary roots as real x-axis intersections. When the discriminant is zero, the graph touches the x-axis at one point. When positive, it crosses at two real root locations.
          </p>
        </section>

        {/* Section: Roots vs X-Intercepts */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is the Difference Between a Root and an X-Intercept?
          </h2>
          <p>
            A root is a value of x that makes <span className="font-mono font-bold">f(x) = 0</span>. For a real root, the corresponding graph point is <span className="font-mono font-bold">(x, 0)</span>, which is an x-intercept.
          </p>
          <p>
            For example, x² - 5x + 6 = 0 has roots 2 and 3, and the graph has x-intercepts at (2, 0) and (3, 0).
          </p>
          <p>
            Complex roots are different. They solve the algebraic equation but are not points on the real xy-plane.
          </p>
        </section>

        {/* Section: Complex Numbers */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Do Complex Roots Appear in a Quadratic Equation?
          </h2>
          <p>
            If Δ &lt; 0, the square root of the discriminant involves a negative number. Using <span className="font-mono font-bold">i = √(-1)</span>, the roots can be written in the form:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border font-mono text-sm font-bold text-center text-blue-600">
            p ± qi
          </div>
          <p>
            where p and q are real numbers. The two roots form a complex-conjugate pair. For 16x² - 5x + 6 = 0, the roots are approximately:
          </p>
          <p className="font-mono text-xs font-bold text-center">
            0.1563 + 0.5921i &nbsp;and&nbsp; 0.1563 - 0.5921i
          </p>
          <p>
            The real parabola does not cross the x-axis because neither root is real.
          </p>
        </section>

        {/* Section: a = 0 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Happens If a Is Zero?
          </h2>
          <p>
            A quadratic requires <span className="font-mono font-bold">a ≠ 0</span>. If a = 0, the x² term disappears and the equation becomes <span className="font-mono font-bold">bx + c = 0</span>.
          </p>
          <p>
            If b ≠ 0, this is a linear equation with: <span className="font-mono font-bold">x = -c / b</span>.
          </p>
          <p>
            The calculator detects this situation instead of forcing the quadratic formula onto a linear equation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border">
              <strong>a = 0, b = 0, c = 0:</strong><br/>
              0 = 0 (Identity, infinitely many solutions)
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border">
              <strong>a = 0, b = 0, c ≠ 0:</strong><br/>
              c = 0 (Contradiction, no solution)
            </div>
          </div>
        </section>

        {/* Section: Fundamental Theorem of Algebra */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Many Solutions Can a Quadratic Have?
          </h2>
          <p>
            A degree-two polynomial has exactly two complex roots when multiplicity is counted. That can appear in three common ways for a quadratic with real coefficients:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>two distinct real roots</li>
            <li>one repeated real root</li>
            <li>two non-real complex conjugate roots</li>
          </ul>
          <p>
            So saying that a quadratic always has &quot;two real answers&quot; is incorrect. The discriminant distinguishes these cases directly.
          </p>
        </section>

        {/* Section: Vieta's Theorem */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Can You Check Quadratic Roots?
          </h2>
          <p>
            Vieta&apos;s relationships provide a powerful consistency check for ax² + bx + c = 0 with roots x₁ and x₂:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono font-bold text-center pt-1">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border">Sum of Roots: x₁ + x₂ = -b / a</div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border">Product of Roots: x₁x₂ = c / a</div>
          </div>
          <p>
            For x² - 5x + 6 = 0, the roots are 2 and 3. Their sum is 2 + 3 = 5 (-b/a = 5), and their product is 2 × 3 = 6 (c/a = 6).
          </p>
          <p className="text-xs text-slate-500 italic">
            The calculator&apos;s automated audit engine uses these relationships as regression checks.
          </p>
        </section>

        {/* Section: Numerical Precision */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Might My Quadratic Answer Have Decimals?
          </h2>
          <p>
            Some quadratic equations produce irrational roots that cannot be represented exactly as terminating decimals.
          </p>
          <p>
            For example: <span className="font-mono font-bold">2x² + 4x - 3 = 0</span> has Δ = 40, and √40 = 2√10.
          </p>
          <p>
            The exact roots can be written as: <span className="font-mono font-bold">(-2 ± √10) / 2</span>. A decimal approximation is about 0.5811 and about -2.5811.
          </p>
          <p>
            The exact radical form preserves more mathematical information than a rounded decimal.
          </p>
        </section>

        {/* Section: When to Use Each Method */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Quadratic Formula vs Factoring vs Completing the Square
          </h2>
          <div className="space-y-2 text-xs sm:text-sm">
            <p><strong>Use factoring:</strong> when the quadratic breaks naturally into simple linear factors.</p>
            <p><strong>Use completing the square:</strong> when you want to derive vertex form or understand the structure of the quadratic.</p>
            <p><strong>Use the quadratic formula:</strong> when you need a universal algebraic method that works for any quadratic with a ≠ 0.</p>
          </div>
          <p>
            For teaching and verification, seeing all available methods can be especially useful because equivalent methods provide independent confirmation of the same roots.
          </p>
        </section>

        {/* Section: Optimization */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Can a Quadratic Find a Maximum or Minimum?
          </h2>
          <p>
            The vertex gives the extremum of a quadratic function:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li><strong>If a &gt; 0:</strong> the parabola opens upward and the vertex is the global minimum.</li>
            <li><strong>If a &lt; 0:</strong> the parabola opens downward and the vertex is the global maximum.</li>
          </ul>
          <p>
            For y = ax² + bx + c, the vertex x-coordinate is x = -b / (2a). Then evaluate the function at that x-value to obtain the extremum.
          </p>
          <p>
            This makes quadratic functions useful in optimization problems involving area, revenue, projectile height and similar modeled relationships.
          </p>
        </section>

        {/* Section: Real-World Applications */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Where Are Quadratic Equations Used?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border space-y-1">
              <strong className="text-sm font-bold text-slate-900 dark:text-slate-100 block">Projectile Motion</strong>
              <p>Under simplified constant-gravity assumptions, vertical position can be modeled as a quadratic function of time. The vertex corresponds to maximum height.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border space-y-1">
              <strong className="text-sm font-bold text-slate-900 dark:text-slate-100 block">Business and Revenue Models</strong>
              <p>Simplified models of revenue, cost or profit can sometimes produce quadratic functions where the vertex identifies maximum profit.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border space-y-1">
              <strong className="text-sm font-bold text-slate-900 dark:text-slate-100 block">Geometry &amp; Area</strong>
              <p>Area and dimension problems often produce quadratic equations when one dimension depends linearly on another.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border space-y-1">
              <strong className="text-sm font-bold text-slate-900 dark:text-slate-100 block">Engineering and Physics</strong>
              <p>Quadratic relationships arise in acceleration, structural suspension cables, optics (parabolic reflectors) and energy equations.</p>
            </div>
          </div>
        </section>

        {/* Section: Common Mistakes */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Quadratic Formula Mistakes
          </h2>
          <div className="space-y-2 text-xs sm:text-sm">
            <p><strong>Forgetting that b can be negative:</strong> If b = -5, then b² = (-5)² = 25. Do not treat b² as -25.</p>
            <p><strong>Losing the ± sign:</strong> The quadratic formula contains ±√Δ, which represents the two branches that generate the two roots.</p>
            <p><strong>Using the wrong denominator:</strong> The denominator is 2a, not 2b.</p>
            <p><strong>Forgetting the discriminant:</strong> Calculate b² - 4ac before classifying the roots.</p>
            <p><strong>Applying the quadratic formula when a = 0:</strong> If a = 0, the equation is linear or degenerate, not quadratic.</p>
            <p><strong>Rounding too early:</strong> Premature rounding can change the final roots. Keep full precision until the final displayed result.</p>
            <p><strong>Assuming negative discriminant means &quot;no solutions&quot;:</strong> A negative discriminant means no REAL roots, but there are two complex roots for a real-coefficient quadratic.</p>
          </div>
        </section>

        {/* Section: Calculator Sync */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How the Calculator Keeps the Equation and Parabola in Sync
          </h2>
          <p>
            The calculator&apos;s quadratic solver and Parabola Geometry Analyzer use the same active coefficients. Changing a, b or c updates the equation, roots, discriminant, graph, vertex and geometric properties together.
          </p>
          <p>
            The geometry analyzer also provides a visible live-sync status badge so users know it is analyzing the same equation rather than a separate hidden example.
          </p>
          <p>
            This matters because changing only one section while leaving another section unchanged can produce misleading results.
          </p>
        </section>

        {/* Section: Save and Export */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Can I Save a Quadratic Calculation?
          </h2>
          <p>
            The calculator includes several ways to preserve or reuse your result:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Save:</strong> stores the calculation for later review.</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Copy LaTeX:</strong> copies mathematical syntax for notes/docs.</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Copy Summary:</strong> copies a clean text summary of all properties.</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Share Link:</strong> encodes calculation state in URL parameters.</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>CSV:</strong> exports structured numerical rows for spreadsheets.</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>PDF / Print:</strong> creates a clean, page-break-free report.</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border"><strong>Reset Defaults:</strong> reverts inputs to starting values (1, -5, 6).</div>
          </div>
          <p className="text-xs text-slate-500 italic">
            All exportable values correspond strictly to the current active equation.
          </p>
        </section>

        {/* Section: Quadratic Formula Reference */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Quadratic Formula Reference
          </h2>

          {/* TABLE 2 */}
          <div className="pt-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Table 2: Core Quantities, Formulas, and Geometric Meanings
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-700">
                <thead>
                  <tr className="bg-blue-600 text-white font-bold">
                    <th className="p-2.5">Quantity</th>
                    <th className="p-2.5">Formula</th>
                    <th className="p-2.5">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <td className="p-2.5 font-bold">Standard Form</td>
                    <td className="p-2.5 font-mono">ax² + bx + c = 0</td>
                    <td className="p-2.5">Fundamental quadratic polynomial</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Quadratic Formula</td>
                    <td className="p-2.5 font-mono">x = (-b ± √Δ) / 2a</td>
                    <td className="p-2.5">Universal algebraic root solutions</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Discriminant</td>
                    <td className="p-2.5 font-mono">Δ = b² - 4ac</td>
                    <td className="p-2.5">Root classification and real x-intercept count</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Axis of Symmetry</td>
                    <td className="p-2.5 font-mono">x = -b / (2a)</td>
                    <td className="p-2.5">Vertical axis dividing parabola symmetrically</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Vertex Point</td>
                    <td className="p-2.5 font-mono">(h, k) = (-b/2a, c - b²/4a)</td>
                    <td className="p-2.5">Global minimum (a &gt; 0) or maximum (a &lt; 0)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Vertex Form</td>
                    <td className="p-2.5 font-mono">y = a(x - h)² + k</td>
                    <td className="p-2.5">Transformation and geometry form</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Focus Coordinate</td>
                    <td className="p-2.5 font-mono">(h, k + 1/(4a))</td>
                    <td className="p-2.5">Geometric reflection focus point</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Directrix Line</td>
                    <td className="p-2.5 font-mono">y = k - 1/(4a)</td>
                    <td className="p-2.5">Geometric reference directrix line</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Y-Intercept</td>
                    <td className="p-2.5 font-mono">(0, c)</td>
                    <td className="p-2.5">Coordinate point where curve crosses y-axis</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">
            These formulas describe the same quadratic from complementary algebraic and geometric perspectives.
          </p>
        </section>

        {/* EDUCATIONAL FLOWCHART DIAGRAM */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            From Coefficients to Parabola
          </h3>
          <div className="w-full flex justify-center py-2 overflow-x-auto">
            <svg viewBox="0 0 760 100" className="w-full max-w-3xl h-auto" role="img" aria-label="Step by step quadratic formula and parabola derivation flowchart">
              <defs>
                <marker id="quad-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb" />
                </marker>
              </defs>

              {/* Node 1: Coefficients */}
              <rect x="5" y="30" width="70" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
              <text x="40" y="55" textAnchor="middle" className="text-[10px] font-bold fill-slate-800">a, b, c</text>
              <line x1="75" y1="50" x2="88" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#quad-arrow)" />

              {/* Node 2: Equation */}
              <rect x="92" y="30" width="90" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
              <text x="137" y="48" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Standard Form</text>
              <text x="137" y="60" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">ax²+bx+c=0</text>
              <line x1="182" y1="50" x2="195" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#quad-arrow)" />

              {/* Node 3: Discriminant */}
              <rect x="199" y="30" width="85" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
              <text x="241" y="48" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Discriminant</text>
              <text x="241" y="60" textAnchor="middle" className="text-[8px] font-mono fill-blue-600">Δ = b²−4ac</text>
              <line x1="284" y1="50" x2="297" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#quad-arrow)" />

              {/* Node 4: Classification */}
              <rect x="301" y="30" width="85" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
              <text x="343" y="48" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Root Nature</text>
              <text x="343" y="60" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">Δ&gt;0, Δ=0, Δ&lt;0</text>
              <line x1="386" y1="50" x2="399" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#quad-arrow)" />

              {/* Node 5: Quadratic Formula & Roots */}
              <rect x="403" y="30" width="90" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
              <text x="448" y="48" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Roots x₁, x₂</text>
              <text x="448" y="60" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">Formula / Proof</text>
              <line x1="493" y1="50" x2="506" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#quad-arrow)" />

              {/* Node 6: Geometry */}
              <rect x="510" y="30" width="105" height="40" rx="6" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
              <text x="562" y="48" textAnchor="middle" className="text-[9px] font-bold fill-slate-800">Vertex (h, k)</text>
              <text x="562" y="60" textAnchor="middle" className="text-[8px] font-mono fill-slate-600">Axis, Focus, Directrix</text>
              <line x1="615" y1="50" x2="628" y2="50" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#quad-arrow)" />

              {/* Node 7: Parabola Graph */}
              <rect x="632" y="30" width="115" height="40" rx="6" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
              <text x="689" y="48" textAnchor="middle" className="text-[9px] font-bold fill-white">Parabola Graph</text>
              <text x="689" y="60" textAnchor="middle" className="text-[8px] font-bold fill-blue-100">Interactive 2D Plot</text>
            </svg>
          </div>
          <p className="text-xs text-slate-500 italic text-center">
            &quot;The coefficients define both the algebraic solutions and the geometry of the corresponding quadratic function.&quot;
          </p>
        </div>

        {/* Section: Mathematical References */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Mathematical References
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The explanations and formulas on this page are based on standard algebra and quadratic-function concepts. For further study, use authoritative educational references such as OpenStax College Algebra, OpenStax Algebra 1 and OpenStax Precalculus:
          </p>
          <ul className="space-y-2 text-xs">
            <li className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <a
                  href="https://openstax.org/books/college-algebra-2e/pages/2-5-quadratic-equations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:underline block"
                >
                  OpenStax College Algebra (2e) — Section 2.5: Quadratic Equations
                </a>
                <span className="text-slate-500">Covers the quadratic formula, discriminant root classification, completing the square, and complex solutions.</span>
              </div>
            </li>
            <li className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <a
                  href="https://openstax.org/books/college-algebra-2e/pages/5-1-quadratic-functions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:underline block"
                >
                  OpenStax College Algebra (2e) — Section 5.1: Quadratic Functions &amp; Parabolas
                </a>
                <span className="text-slate-500">Explains standard form, vertex form, axis of symmetry, finding extrema (minima and maxima), and graphing.</span>
              </div>
            </li>
            <li className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start gap-2">
              <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <a
                  href="https://openstax.org/books/precalculus-2e/pages/10-1-the-ellipse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:underline block"
                >
                  OpenStax Precalculus (2e) — Conic Sections: The Parabola
                </a>
                <span className="text-slate-500">Geometric definitions of the parabola, focal distance p = 1/(4a), focus coordinates, and directrix lines.</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Section: FAQ (UNFOLDED BY DEFAULT) */}
        <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>Quadratic Formula Calculator FAQ</span>
            </h2>
            <span className="text-xs text-slate-500 font-semibold">
              {quadratic_formula_calculatorFaqs.length} Answers
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {quadratic_formula_calculatorFaqs.map((faq, idx) => {
              const isOpen = openFaqIndices.has(idx);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-3.5 sm:p-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-blue-600 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-3.5 sm:p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-700/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Related Calculators */}
        <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Related Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <Link
              href="/calculators/exponent-calculator"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-blue-600 group-hover:underline">
                  Exponent Calculator
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Calculate powers and exponent-based expressions.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 pt-3">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              href="/calculators/root-calculator"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-blue-600 group-hover:underline">
                  Root Calculator &amp; Radical Simplifier
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Simplify radicals and work with square-root expressions.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 pt-3">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              href="/calculators/scientific-calculator"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-blue-600 group-hover:underline">
                  Scientific Calculator
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Handle broader scientific and numerical calculations.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 pt-3">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* Section: Disclaimer */}
        <section className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <p className="font-bold uppercase tracking-wider text-[10px] text-slate-400">
            Mathematical Disclaimer:
          </p>
          <p>
            This calculator is an educational mathematical tool. It applies standard algebraic formulas to the coefficients you enter and presents the resulting solutions, graph and related quadratic properties.
          </p>
          <p>
            For coursework, research or professional applications, verify important results independently when the consequences of an error are significant. The calculator does not determine which mathematical model is appropriate for a real-world problem. A correct algebraic solution can still be inappropriate if the underlying equation, assumptions or domain are incorrect.
          </p>
        </section>

      </div>
    </article>
  );
}

export default QuadraticContent;
