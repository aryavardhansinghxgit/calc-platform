"use client";

import React from "react";

export function QuadraticContent() {
  return (
    <div className="space-y-8 text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
      {/* SECTION 1: HOW TO SOLVE QUADRATIC EQUATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          How to Solve Quadratic Equations (Step-by-Step)
        </h2>
        <p className="text-sm leading-relaxed">
          A <strong>quadratic equation</strong> is a second-order polynomial equation involving a single variable <code>x</code>, expressed in standard form as:
        </p>
        
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-bold text-center text-base font-sans tabular-nums">
          {"ax² + bx + c = 0  (where a ≠ 0)"}
        </div>

        <p className="text-sm leading-relaxed">
          Where <strong>a</strong> is the quadratic coefficient, <strong>b</strong> is the linear coefficient, and <strong>c</strong> is the constant term. The condition <code>a ≠ 0</code> is essential; if <code>a = 0</code>, the equation degenerates into the linear equation <code>bx + c = 0</code>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Historical Foundations</h3>
            <p className="leading-relaxed font-medium">
              Ancient Babylonian mathematicians solved quadratic problems as early as 2000 BCE. The complete general solution formula was formalized by Persian mathematician Muhammad ibn Musa al-Khwarizmi in 820 CE.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Zero Product Property</h3>
            <p className="leading-relaxed font-medium">
              States that if <code>A × B = 0</code>, then either <code>A = 0</code> or <code>B = 0</code>. This forms the mathematical basis for solving quadratic equations via factoring.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Fundamental Theorem of Algebra</h3>
            <p className="leading-relaxed font-medium">
              Guarantees that every quadratic polynomial equation degree 2 has exactly two complex roots (which may be distinct real, repeated real, or complex conjugates).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE QUADRATIC FORMULA & DISCRIMINANT EXPLAINED */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          The Quadratic Formula &amp; The Discriminant Explained
        </h2>
        <p className="text-sm leading-relaxed">
          The universal solution for any quadratic equation <code>ax² + bx + c = 0</code> is given by the <strong>Quadratic Formula</strong>:
        </p>

        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-bold text-center text-base font-sans tabular-nums">
          {"x = [-b ± √(b² - 4ac)] / (2a)"}
        </div>

        <div className="space-y-3 text-xs font-medium pt-1">
          <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
            Discriminant Classification Matrix (Δ = b² - 4ac)
          </h3>
          <p className="leading-relaxed">
            The term inside the radical, <code>b² - 4ac</code>, is called the <strong>Discriminant (Δ)</strong>. Its numerical sign determines the nature and quantity of the roots:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1 font-sans tabular-nums">
              <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400">Δ &gt; 0 (Positive)</h4>
              <p className="leading-relaxed font-medium text-slate-900 dark:text-slate-100">
                Two distinct real roots. The parabola intersects the horizontal x-axis at two distinct coordinate points.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1 font-sans tabular-nums">
              <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">Δ = 0 (Zero)</h4>
              <p className="leading-relaxed font-medium text-slate-900 dark:text-slate-100">
                One repeated real root (<code>x = -b / 2a</code>). The parabola&apos;s vertex touches the x-axis tangentially.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1 font-sans tabular-nums">
              <h4 className="font-bold text-sm text-purple-600 dark:text-purple-400">Δ &lt; 0 (Negative)</h4>
              <p className="leading-relaxed font-medium text-slate-900 dark:text-slate-100">
                Two complex conjugate roots (<code>u ± vi</code>). The parabola does not cross the real x-axis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ALTERNATIVE METHODS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          Alternative Methods: Completing the Square &amp; Factoring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">Completing the Square Step-by-Step</h3>
            <p className="leading-relaxed">
              Completing the square transforms <code>ax² + bx + c = 0</code> into a perfect binomial square <code>(x + h)² = k</code>:
            </p>
            <ol className="list-decimal pl-5 space-y-1 font-sans tabular-nums font-bold">
              <li>Divide through by a: <code>x² + (b/a)x = -c/a</code>.</li>
              <li>Add <code>(b / 2a)²</code> to both sides.</li>
              <li>Factor left side into <code>(x + b/2a)²</code>.</li>
              <li>Take square roots: <code>x + b/2a = ±√(b² - 4ac) / 2a</code>.</li>
            </ol>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">Factoring / FOIL Method</h3>
            <p className="leading-relaxed">
              When roots are rational, express <code>ax² + bx + c</code> as a product of linear factors <code>(px + q)(rx + s) = 0</code>:
            </p>
            <div className="font-sans tabular-nums font-bold text-blue-700 dark:text-blue-400 p-2.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
              {"Example: x² - 5x + 6 = (x - 2)(x - 3) = 0 => x = 2 or x = 3"}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PARABOLA GEOMETRY */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          Parabola Geometry: Vertex, Focus, and Axis of Symmetry
        </h2>
        <p className="text-sm leading-relaxed">
          The graph of any quadratic function <code>f(x) = ax² + bx + c</code> forms a smooth symmetrical curve called a <strong>parabola</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 font-sans tabular-nums">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Vertex Form &amp; Extrema</h3>
            <div>{"y = a(x - h)² + k"}</div>
            <div>{"Vertex (h, k) = (-b / 2a, c - b² / 4a)"}</div>
            <p className="text-slate-700 dark:text-slate-300 pt-1">
              If <code>a &gt; 0</code>, the parabola opens upwards and vertex is global minimum. If <code>a &lt; 0</code>, it opens downwards and vertex is global maximum.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 font-sans tabular-nums">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Focus &amp; Directrix</h3>
            <div>{"Focus Point: (-b / 2a, k + 1 / 4a)"}</div>
            <div>{"Directrix Line: y = k - 1 / 4a"}</div>
            <p className="text-slate-700 dark:text-slate-300 pt-1">
              Every point on a parabola is strictly equidistant from its focus point and directrix line.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: REAL-WORLD APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          Real-World Applications of Quadratic Equations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Physics &amp; Ballistics</h3>
            <p className="leading-relaxed">
              Gravity trajectory equations follow <code>h(t) = -16t² + v₀t + h₀</code> (in feet) or <code>h(t) = -4.9t² + v₀t + h₀</code> (in meters).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Business &amp; Profit Curves</h3>
            <p className="leading-relaxed">
              Revenue and profit functions are parabolic. Finding the vertex identifies the optimal product pricing for maximum profit.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Engineering &amp; Optics</h3>
            <p className="leading-relaxed">
              Satellite dishes, headlight reflectors, and suspension bridge cables use parabolic curves to reflect light/sound rays to a single focus point.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default QuadraticContent;
