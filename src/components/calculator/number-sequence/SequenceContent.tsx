"use client";

import React from "react";
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, Layers, ShieldCheck, Target, Award } from "lucide-react";

export function SequenceContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span>1. Introduction to the Number Sequence & Series Suite</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Number Sequence Calculator & Series Suite</strong> is a computational discrete mathematics tool engineered to identify, analyze, and evaluate numerical patterns across arithmetic, geometric, quadratic polynomial, Fibonacci recurrence, and harmonic progressions.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This suite features 6 dedicated calculation modes (Automatic Pattern Detector, Arithmetic Suite, Geometric Suite, Fibonacci & Recurrence Solver, Custom Function Evaluator a_n = f(n), and Infinite Convergence Checker) with interactive 2D coordinate scatter plots and method of finite differences tables.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          <span>2. Mathematical Concept & Formal Definitions</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A <strong>Number Sequence</strong> is an ordered set of elements governed by a specific mathematical rule: {"{aₙ} = a₁, a₂, a₃, ..., aₙ"}. A <strong>Series</strong> represents the cumulative summation of a sequence's terms: {"Sₙ = ∑ aₖ"}.
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          {"Explicit Formula: aₙ = f(n)   vs.   Recursive Formula: aₙ = f(aₙ₋₁)"}
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" />
          <span>3. Core Sequence & Series Formulas</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">1. Arithmetic Sequence & Series</h4>
            <p className="font-mono text-sm font-bold">{"aₙ = a₁ + (n - 1)d  |  Sₙ = (n/2)[2a₁ + (n - 1)d]"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Constant common difference d between consecutive terms.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">2. Geometric Sequence & Series</h4>
            <p className="font-mono text-sm font-bold">{"aₙ = a₁ · rⁿ⁻¹  |  S_∞ = a₁ / (1 - r)  for |r| < 1"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Constant common ratio r between consecutive terms.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">3. Fibonacci Binet's Formula</h4>
            <p className="font-mono text-sm font-bold">{"Fₙ = [ Φⁿ - ψⁿ ] / √5  where Φ = (1+√5)/2"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Computes the N-th Fibonacci term using the Golden Ratio.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">4. Quadratic Finite Differences</h4>
            <p className="font-mono text-sm font-bold">{"aₙ = an² + bn + c  where 2a = Δ²"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Constant 2nd difference indicates quadratic growth.</p>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600" />
          <span>4. How the Calculation Works (Pattern Recognition Steps)</span>
        </h2>

        <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-4 list-decimal">
          <li className="pl-2">
            <strong>Check 1st Differences (&Delta;&sup1;):</strong> Subtract consecutive terms. If constant, pattern is Arithmetic.
          </li>
          <li className="pl-2">
            <strong>Check Consecutive Ratios (r):</strong> Divide consecutive terms. If constant, pattern is Geometric.
          </li>
          <li className="pl-2">
            <strong>Check Higher-Order Differences (&Delta;&#178;, &Delta;&#179;):</strong> Calculate successive differences to identify quadratic or polynomial degree.
          </li>
          <li className="pl-2">
            <strong>Formulate Closed-Form Expression (a_n):</strong> Solve coefficient system of equations to output explicit formula.
          </li>
        </ol>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-blue-600" />
          <span>5. Worked Calculation Example</span>
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <h3 className="text-sm font-bold text-blue-600">
            Example: Quadratic Sequence (2, 5, 10, 17, 26)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            Level 0 Terms: 2, 5, 10, 17, 26<br />
            Level 1 Differences (&Delta;&sup1;): 3, 5, 7, 9<br />
            Level 2 Differences (&Delta;&#178;): 2, 2, 2 (Constant!)<br />
            Since 2a = &Delta;&#178; = 2 &rArr; a = 1.<br />
            3a + b = &Delta;&sup1;&#8321; = 3 &rArr; 3(1) + b = 3 &rArr; b = 0.<br />
            a + b + c = a&#8321; = 2 &rArr; 1 + 0 + c = 2 &rArr; c = 1.<br />
            Explicit Formula: <strong>a_n = n&#178; + 1</strong>.
          </p>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-blue-600" />
          <span>6. Visual Understanding & Sequence Classification Matrix</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5">Sequence Type</th>
                <th className="p-2.5">Constant Property</th>
                <th className="p-2.5">Explicit Closed Form</th>
                <th className="p-2.5">Growth Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50 font-mono">
              <tr>
                <td className="p-2 font-bold text-blue-600">Arithmetic</td>
                <td className="p-2">1st Difference (d)</td>
                <td className="p-2">a_n = a₁ + (n-1)d</td>
                <td className="p-2 font-sans">Linear Growth</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-blue-600">Geometric</td>
                <td className="p-2">Consecutive Ratio (r)</td>
                <td className="p-2">a_n = a₁ · rⁿ⁻¹</td>
                <td className="p-2 font-sans">Exponential Growth</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-blue-600">Quadratic</td>
                <td className="p-2">2nd Difference (&Delta;&#178;)</td>
                <td className="p-2">a_n = an² + bn + c</td>
                <td className="p-2 font-sans">Parabolic Curve</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-blue-600">Fibonacci</td>
                <td className="p-2">Sum of 2 Prior Terms</td>
                <td className="p-2">Binet's Formula</td>
                <td className="p-2 font-sans">Golden Ratio (&Phi;) Growth</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <span>7. Common Errors & Edge Cases in Sequences</span>
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 1: Confusing Sequence Terms with Partial Series Sums
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              a_n is the specific value of term n, whereas S_n is the cumulative sum of all terms from 1 to n.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 2: Summing Infinite Geometric Series when |r| &ge; 1
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              The formula S_&infin; = a&#8321; / (1 - r) applies strictly when |r| &lt; 1. If |r| &ge; 1, the series diverges to infinity.
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
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Finance & Compound Interest</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Simple interest grows as an arithmetic sequence; compound interest and loan amortization grow geometrically.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Computer Science & Algorithms</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Recurrence relations govern algorithmic time complexity (e.g. Merge Sort O(n log n), Binary Search).
            </p>
          </div>
        </div>
      </section>

      {/* 9. RELATED MATHEMATICAL CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <span>9. Related Mathematical Concepts & Prerequisites</span>
        </h2>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
          <li><strong>Limits & Convergence:</strong> Assessing asymptotic behavior as term index n approaches infinity.</li>
          <li><strong>The Golden Ratio (&Phi;):</strong> Limit of consecutive Fibonacci term ratios (&approx; 1.618033).</li>
        </ul>
      </section>

      {/* 10. SUMMARY */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
        <h2 className="text-lg font-extrabold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The <strong>Number Sequence Calculator & Series Suite</strong> combines pattern recognition algorithms with interactive 2D coordinate plotting. Supporting arithmetic, geometric, quadratic, and Fibonacci sequences, this suite functions as an authoritative computational learning resource.
        </p>
      </section>

    </div>
  );
}
