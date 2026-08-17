"use client";

import React from "react";
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, Layers, ShieldCheck, Target, Award } from "lucide-react";

export function RootContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span>1. Introduction to the Root & Radical Suite</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Root Calculator & Radical Simplifier Suite</strong> is a comprehensive computational engine engineered for students, educators, engineers, financial analysts, and quantitative researchers. Root extraction is the inverse mathematical operation of exponentiation, allowing users to unpack exponential relationships and solve polynomial equations.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Whether evaluating standard square roots (&radic;x), cube roots (&root3;x), high-degree n-th roots (&root;x), or reducing arbitrary non-perfect radicals into exact simplified forms (a&root;b), this suite delivers arbitrary-precision floating-point approximations, exact radical reductions, and full step-by-step algorithmic derivations.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          <span>2. Underlying Mathematical Concept & Radical Anatomy</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Mathematically, an <strong>n-th root</strong> of a real number x is a number r such that raising r to the power n yields x:
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          {"ⁿ√x = r ⟺ rⁿ = x"}
        </div>
        
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
          Anatomy of Radical Notation (ⁿ√x)
        </h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
          <li>
            <strong>Radical Sign (&radic;):</strong> The mathematical symbol denoting root extraction (derived historically from the Latin word <em>radix</em>, meaning root).
          </li>
          <li>
            <strong>Radicand (x):</strong> The expression or value placed inside underneath the top bar of the radical sign.
          </li>
          <li>
            <strong>Index / Degree (n):</strong> The positive integer specifying the root degree (e.g., n = 2 for square root, n = 3 for cube root). When omitted, the index defaults implicitly to 2.
          </li>
          <li>
            <strong>Principal Root:</strong> For even indices (n = 2, 4, 6...), positive numbers possess both a positive and negative real root (e.g., (&plusmn;5)&#178; = 25). The positive value +5 is defined as the <em>Principal Square Root</em>.
          </li>
        </ul>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" />
          <span>3. Core Formulas & The 6 Laws of Radicals</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Radicals obey rigid algebraic laws derived directly from exponent rules (x<sup>1/n</sup>). Mastery of these six fundamental properties enables simplifying, multiplying, dividing, and rationalizing radical expressions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">1. Product Property</h4>
            <p className="font-mono text-sm font-bold">{"ⁿ√(a · b) = ⁿ√a · ⁿ√b"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Allows factoring out perfect powers from radicands.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">2. Quotient Property</h4>
            <p className="font-mono text-sm font-bold">{"ⁿ√(a / b) = (ⁿ√a) / (ⁿ√b)  (b ≠ 0)"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Splits radicals across numerators and denominators.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">3. Fractional Exponent Rule</h4>
            <p className="font-mono text-sm font-bold">{"xᵐ/ⁿ = ⁿ√(xᵐ) = (ⁿ√x)ᵐ"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Converts rational exponents into radical roots.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">4. Root of a Root (Nested)</h4>
            <p className="font-mono text-sm font-bold">{"ᵐ√(ⁿ√x) = ⁽ᵐ ⁿ⁾√x"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Multiplies indices when nesting radicals.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">5. Inverse Cancellation</h4>
            <p className="font-mono text-sm font-bold">{"ⁿ√(xⁿ) = |x| (even n),  x (odd n)"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Preserves absolute value for even powers.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">6. Zero & Identity Properties</h4>
            <p className="font-mono text-sm font-bold">{"ⁿ√0 = 0,  ⁿ√1 = 1"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Fixed invariant points for all positive indices.</p>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600" />
          <span>4. How the Calculation Works (Step-by-Step Breakdown)</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          When an input x and degree n are provided, the calculator processes the problem through four distinct operational stages:
        </p>

        <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-4 list-decimal">
          <li className="pl-2">
            <strong>Input Parsing & Domain Verification:</strong> The radicand x and degree n are checked for domain restrictions. If x &lt; 0 and n is even, the engine switches to the complex number module evaluating i = &radic;(-1).
          </li>
          <li className="pl-2">
            <strong>Prime Factorization Extraction:</strong> Integer radicands undergo prime factorization (x = p<sub>1</sub><sup>e<sub>1</sub></sup> &middot; p<sub>2</sub><sup>e<sub>2</sub></sup>...). Factors with exponents e<sub>i</sub> &ge; n are partitioned into outside coefficients &lfloor;e<sub>i</sub> / n&rfloor; and remaining inside powers e<sub>i</sub> mod n.
          </li>
          <li className="pl-2">
            <strong>Numerical Approximation (Newton-Raphson):</strong> High-precision decimal calculations utilize the iterative Newton-Raphson formula:
            <div className="my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center font-bold">
              {"xₖ₊₁ = (1/n) · [ (n - 1)·xₖ + S / (xₖⁿ⁻¹) ]"}
            </div>
            This converges quadratically, doubling accurate decimal places every iteration.
          </li>
          <li className="pl-2">
            <strong>Output Formatting & Rationalization:</strong> The engine formats outputs into exact radical strings (a&root;b), fractional power representations (x<sup>m/n</sup>), and rounded floating-point values formatted up to 16 decimal places.
          </li>
        </ol>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-blue-600" />
          <span>5. Worked Calculation Examples</span>
        </h2>

        <div className="space-y-4">
          {/* Example 1 */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600">
              Example 1 (Basic Radical Reduction): Simplify &radic;72
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Step 1:</strong> Factorize 72 into prime factors: 72 = 2&#179; &middot; 3&#178; = (2&#178; &middot; 3&#178;) &middot; 2.<br />
              <strong>Step 2:</strong> Apply product property: &radic;72 = &radic;(2&#178; &middot; 3&#178;) &middot; &radic;2 = (2 &middot; 3)&radic;2 = 6&radic;2.<br />
              <strong>Decimal Approximation:</strong> 6 &middot; 1.41421356... = 8.48528137.
            </p>
          </div>

          {/* Example 2 */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600">
              Example 2 (Cube Root Simplification): Simplify &#8731;108
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Step 1:</strong> Prime factorize 108: 108 = 2&#178; &middot; 3&#179;.<br />
              <strong>Step 2:</strong> Extract complete triplets (power of 3): &#8731;(3&#179; &middot; 2&#178;) = &#8731;(3&#179;) &middot; &#8731;(2&#178;) = 3&#8731;4.<br />
              <strong>Decimal Approximation:</strong> 3 &middot; 1.58740105... = 4.76220316.
            </p>
          </div>

          {/* Example 3 */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600">
              Example 3 (Fractional Exponent Evaluation): Evaluate 32<sup>3/5</sup>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Step 1:</strong> Rewrite fractional exponent as radical: 32<sup>3/5</sup> = (&#8309;&radic;32)&#179;.<br />
              <strong>Step 2:</strong> Evaluate the 5th root of 32: since 2&#8309; = 32, &#8309;&radic;32 = 2.<br />
              <strong>Step 3:</strong> Raise to numerator power 3: 2&#179; = 8.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-blue-600" />
          <span>6. Visual Understanding & Reference Comparison Tables</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The table below illustrates perfect powers and simplified radical forms across key integer radicands:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5">Radicand (x)</th>
                <th className="p-2.5">Square Root (&radic;x)</th>
                <th className="p-2.5">Simplified &radic;x</th>
                <th className="p-2.5">Cube Root (&#8731;x)</th>
                <th className="p-2.5">4th Root (&#8732;x)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <td className="p-2 font-bold">8</td>
                <td className="p-2">2.828427</td>
                <td className="p-2 font-mono font-bold text-blue-600">2&radic;2</td>
                <td className="p-2 font-mono font-bold text-emerald-600">2</td>
                <td className="p-2">1.681792</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">16</td>
                <td className="p-2 font-mono font-bold text-emerald-600">4</td>
                <td className="p-2 font-mono">4</td>
                <td className="p-2">2.519842</td>
                <td className="p-2 font-mono font-bold text-emerald-600">2</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">27</td>
                <td className="p-2">5.196152</td>
                <td className="p-2 font-mono font-bold text-blue-600">3&radic;3</td>
                <td className="p-2 font-mono font-bold text-emerald-600">3</td>
                <td className="p-2">2.279507</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">72</td>
                <td className="p-2">8.485281</td>
                <td className="p-2 font-mono font-bold text-blue-600">6&radic;2</td>
                <td className="p-2 font-mono">4.160167</td>
                <td className="p-2">2.912951</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">100</td>
                <td className="p-2 font-mono font-bold text-emerald-600">10</td>
                <td className="p-2 font-mono">10</td>
                <td className="p-2">4.641588</td>
                <td className="p-2 font-mono font-bold text-blue-600">&radic;10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <span>7. Common Errors & Edge Cases in Radical Algebra</span>
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 1: Incorrectly Distributing Radicals Over Addition [&radic;(a+b) &ne; &radic;a + &radic;b]
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Radicals distribute over multiplication and division, <strong>never over addition or subtraction</strong>. For instance, &radic;(9 + 16) = &radic;25 = 5, whereas &radic;9 + &radic;16 = 3 + 4 = 7 &ne; 5.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 2: Assuming Even Roots of Negative Numbers are Real
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              No real number multiplied by itself results in a negative value [(-4)&#178; = +16]. Therefore, &radic;(-16) yields imaginary 4i, not -4.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 3: Confusing Fractional Exponent Order (x<sup>m/n</sup>)
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              In x<sup>m/n</sup>, the denominator n represents the root degree, while the numerator m represents the exponent power. 8<sup>2/3</sup> = (&#8731;8)&#178; = 2&#178; = 4.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="h-6 w-6 text-blue-600" />
          <span>8. Real-World Applications Across Fields</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Geometry & Trigonometry</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Pythagorean distance c = &radic;(a&#178; + b&#178;), Euclidean vector magnitudes, and diagonal calculations in spatial dimensions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Statistics & Data Science</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Standard deviation &sigma; = &radic;[ (1/N) &sum; (x<sub>i</sub> - &mu;)&#178; ] and Root Mean Square (RMS) signal measurements.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Physics & Engineering</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Gravitational free-fall velocity v = &radic;(2gh), pendulum period T = 2&pi;&radic;(L/g), and AC voltage V<sub>rms</sub> = V<sub>peak</sub> / &radic;2.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Finance & Economics</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Compound Annual Growth Rate CAGR = ⁿ&radic;(EndValue / StartValue) - 1 and geometric mean returns.
            </p>
          </div>
        </div>
      </section>

      {/* 9. RELATED MATHEMATICAL CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <span>9. Related Mathematical Concepts & Prerequisite Topics</span>
        </h2>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
          <li><strong>Exponentiation & Exponent Laws:</strong> The direct inverse operation of root extraction (x<sup>n</sup>).</li>
          <li><strong>Prime Factorization & GCF/LCM:</strong> Fundamental arithmetic used to factorize radicands into prime powers.</li>
          <li><strong>Complex Numbers & De Moivre's Theorem:</strong> Evaluation of even roots of negative numbers using i = &radic;(-1) and polar coordinates (r &ang; &theta;).</li>
          <li><strong>Logarithmic Functions:</strong> Alternative analytical methods for solving general exponential equations b<sup>y</sup> = x.</li>
        </ul>
      </section>

      {/* 10. SUMMARY */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
        <h2 className="text-lg font-extrabold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The <strong>Root Calculator & Radical Simplifier Suite</strong> bridges abstract algebra and numerical computing. By combining exact radical factorization (a&root;b), arbitrary-precision floating point output, complex roots, and Newton-Raphson iteration derivations, this suite functions as both a calculation utility and an educational reference guide.
        </p>
      </section>

    </div>
  );
}
