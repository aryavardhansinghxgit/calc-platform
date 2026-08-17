"use client";

import React from "react";
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, Layers, ShieldCheck, Target, Award } from "lucide-react";

export function FactorContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span>1. Introduction to the Factor & Prime Factorization Suite</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Factor Calculator & Prime Factorization Suite</strong> is a computational number theory application designed to analyze the multiplicative divisors of any integer. Factorization is a pillar of discrete mathematics, algebra, computer science, and public-key cryptography.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This suite provides complete enumeration of positive and negative factor pairs, canonical exponential prime factorizations, interactive factor tree visualizations, quadratic trinomial factoring, and advanced divisor analytics ($d(n), \sigma(n), s(n)$).
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          <span>2. Mathematical Concept, Definitions & Terminology</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Formally, an integer a is defined as a <strong>factor (divisor)</strong> of an integer b (written a | b) if there exists an integer k such that b = a &middot; k (meaning b mod a = 0).
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          {"a | b ⟺ b = a · k  for some integer k"}
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
          Key Terminology & Distinctions
        </h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
          <li>
            <strong>Factor / Divisor:</strong> A number that divides another evenly without leaving a remainder (e.g., factors of 12 are &plusmn;1, &plusmn;2, &plusmn;3, &plusmn;4, &plusmn;6, &plusmn;12).
          </li>
          <li>
            <strong>Factor Pair:</strong> Two integers that multiply together to yield N (e.g., for 12: 1&times;12, 2&times;6, 3&times;4, (-1)&times;(-12)...).
          </li>
          <li>
            <strong>Prime Factorization:</strong> Decomposing a composite number into a unique product of prime numbers.
          </li>
        </ul>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" />
          <span>3. Core Formulas & The Fundamental Theorem of Arithmetic</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Fundamental Theorem of Arithmetic</strong> dictates that every integer N &gt; 1 can be represented uniquely as a product of prime powers:
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          {"N = p₁^(α₁) · p₂^(α₂) ... pₖ^(αₖ)"}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">1. Divisor Count Function d(N)</h4>
            <p className="font-mono text-sm font-bold">{"d(N) = (α₁ + 1)(α₂ + 1)...(αₖ + 1)"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Calculates the total number of positive factors.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">2. Sum of Divisors σ(N)</h4>
            <p className="font-mono text-sm font-bold">{"σ(N) = ∏ [ (pᵢ^(αᵢ+1) - 1) / (pᵢ - 1) ]"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Sum of all positive divisors of N.</p>
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
          When an integer N is submitted, the calculator performs four analytical steps:
        </p>

        <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-4 list-decimal">
          <li className="pl-2">
            <strong>&radic;N Trial Division Rule:</strong> Testing integers d up to &lfloor;&radic;N&rfloor;. If d divides N, both d and N/d are added to the factor set.
          </li>
          <li className="pl-2">
            <strong>Prime Factor Decomposition:</strong> Iteratively dividing out small prime factors (2, 3, 5, 7...) to build canonical prime-power forms.
          </li>
          <li className="pl-2">
            <strong>Factor Tree Construction:</strong> Recursively splitting N into non-trivial binary branches until all leaf nodes terminate in prime numbers.
          </li>
          <li className="pl-2">
            <strong>Number Classification:</strong> Computing Aliquot Sum s(N) = &sigma;(N) - N to classify the number as Perfect, Abundant, or Deficient.
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
              Example 1 (Factor Pairs & Prime Factors): Find Factors of 120
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Trial Division up to &lfloor;&radic;120&rfloor; = 10:</strong><br />
              Pairs: (1, 120), (2, 60), (3, 40), (4, 30), (5, 24), (6, 20), (8, 15), (10, 12).<br />
              <strong>All Factors (16 Total):</strong> [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60, 120].<br />
              <strong>Prime Factorization:</strong> 120 = 2&#173;&#179; &middot; 3&#185; &middot; 5&#185;.
            </p>
          </div>

          {/* Example 2 */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600">
              Example 2 (Quadratic Trinomial Factoring): Factor x&#178; - 5x + 6
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Step 1:</strong> Find two integers that multiply to +6 and add to -5: -2 and -3.<br />
              <strong>Step 2:</strong> Rewrite expression: (x - 2)(x - 3).
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

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5">Integer N</th>
                <th className="p-2.5">Prime Factorization</th>
                <th className="p-2.5">Divisor Count d(N)</th>
                <th className="p-2.5">Aliquot Sum s(N)</th>
                <th className="p-2.5">Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <td className="p-2 font-bold">6</td>
                <td className="p-2 font-mono">2 &middot; 3</td>
                <td className="p-2 font-mono font-bold text-blue-600">4</td>
                <td className="p-2 font-mono">6 (1+2+3)</td>
                <td className="p-2 font-bold text-emerald-600">Perfect Number</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">12</td>
                <td className="p-2 font-mono">2&#178; &middot; 3</td>
                <td className="p-2 font-mono font-bold text-blue-600">6</td>
                <td className="p-2 font-mono">16 (s &gt; 12)</td>
                <td className="p-2 font-bold text-amber-600">Abundant Number</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">997</td>
                <td className="p-2 font-mono">997 (prime)</td>
                <td className="p-2 font-mono font-bold text-blue-600">2</td>
                <td className="p-2 font-mono">1 (s &lt; 997)</td>
                <td className="p-2 font-bold text-blue-600">Prime Number</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <span>7. Common Errors & Edge Cases in Factorization</span>
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 1: Omitting Negative Factor Pairs
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Every positive integer N has corresponding negative factor pairs because (-a) &times; (-b) = +N.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 2: Considering 1 as a Prime Number
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              1 is defined as a <strong>Unit</strong>, not a prime number. Including 1 as a prime would violate the unique prime factorization property of the Fundamental Theorem of Arithmetic.
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
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">RSA Public-Key Cryptography</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Cybersecurity encryption relies on the computational hardness of factoring large semiprime numbers N = p &middot; q.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Algebraic Expression Simplification</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Factoring polynomials into linear factors to solve quadratic equations and reduce algebraic expressions.
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
          <li><strong>Greatest Common Factor (GCF) & LCM:</strong> Calculating shared prime factor subsets across multiple integers.</li>
          <li><strong>Prime Number Theory:</strong> Sieve of Eratosthenes and prime distribution algorithms.</li>
        </ul>
      </section>

      {/* 10. SUMMARY */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
        <h2 className="text-lg font-extrabold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The <strong>Factor Calculator & Prime Factorization Suite</strong> integrates classical number theory with modern visual interactive UI. By delivering factor pairs, exponential prime decompositions, factor tree diagrams, and divisor functions, this suite functions as an authoritative calculation and learning resource.
        </p>
      </section>

    </div>
  );
}
