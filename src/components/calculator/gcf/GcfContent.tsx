"use client";

import React from "react";
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, Layers, ShieldCheck, Target, Award } from "lucide-react";

export function GcfContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span>1. Introduction to the Greatest Common Factor (GCF) Suite</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Greatest Common Factor (GCF) Calculator & Factorization Suite</strong> is an advanced computational mathematics tool engineered to compute the largest integer that divides two or more numbers completely without leaving a remainder. GCF evaluation is fundamental to algebraic fraction reduction, polynomial simplification, modular arithmetic, and modern public-key cryptography.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This suite provides simultaneous dual outputs for both the <strong>Greatest Common Factor (GCF)</strong> and the <strong>Least Common Multiple (LCM)</strong>, alongside 6 interactive derivation methods: Exponential Prime Factorization, Euclidean Division & Subtraction Algorithm, Extended Euclidean Bézout's Identity, Division Grid (Ladder Method), Factor Set Intersection, and Interactive SVG Venn Diagrams.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          <span>2. Mathematical Concept, Global Terminology & Definitions</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          In global educational systems and mathematics literature, the Greatest Common Factor is known under three equivalent terms:
        </p>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
          <li>
            <strong>GCF (Greatest Common Factor):</strong> Standard terminology in American and Canadian mathematics curricula.
          </li>
          <li>
            <strong>GCD (Greatest Common Divisor):</strong> Standard terminology in computer science, abstract algebra, and number theory.
          </li>
          <li>
            <strong>HCF (Highest Common Factor):</strong> Standard terminology in British, Indian, Australian, and Singaporean mathematics curricula.
          </li>
        </ul>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          {"g = GCF(a, b) ⟺ g | a  AND  g | b, and g is the largest positive integer"}
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" />
          <span>3. Core Formulas & The 5 Mathematical Properties of GCF</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The Greatest Common Factor satisfies rigid algebraic properties governing integer division and modular congruence:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">1. Commutative Property</h4>
            <p className="font-mono text-sm font-bold">{"GCF(a, b) = GCF(b, a)"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Order of operands does not change the resulting factor.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">2. Associative Property</h4>
            <p className="font-mono text-sm font-bold">{"GCF(a, GCF(b, c)) = GCF(GCF(a, b), c)"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Allows computing GCF iteratively across N integers.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">3. Distributive Property</h4>
            <p className="font-mono text-sm font-bold">{"GCF(k·a, k·b) = |k| · GCF(a, b)"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Factoring out multiplier k scales the GCF by |k|.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">4. GCF-LCM Duality Theorem</h4>
            <p className="font-mono text-sm font-bold">{"GCF(a, b) × LCM(a, b) = |a × b|"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              For two positive integers a and b, the product of their greatest common factor and least common multiple equals the product of the two integers.
            </p>
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
          When an integer set is provided, the calculation engine runs through four processing phases:
        </p>

        <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-4 list-decimal">
          <li className="pl-2">
            <strong>Input Parsing & Domain Normalization:</strong> Input strings are tokenized into absolute positive integers.
          </li>
          <li className="pl-2">
            <strong>Euclidean Remainder Division:</strong> The engine executes repeated integer division (a = b &middot; q + r). The last non-zero remainder r is identified as the exact GCF.
          </li>
          <li className="pl-2">
            <strong>Prime Power Minimum Selection:</strong> Prime factor powers are compared across all numbers, taking the minimum exponent count for each common prime.
          </li>
          <li className="pl-2">
            <strong>Bézout Coefficient Evaluation:</strong> The Extended Euclidean Algorithm solves for integer coefficients x and y satisfying a &middot; x + b &middot; y = GCF(a, b).
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
              Example 1 (Prime Factorization Method): Find GCF(36, 54)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Step 1:</strong> Factorize into prime powers: 36 = 2&#178; &middot; 3&#178;, 54 = 2&#185; &middot; 3&#179;.<br />
              <strong>Step 2:</strong> Select minimum power for shared primes: min(2&#178;, 2&#185;) = 2&#185;, min(3&#178;, 3&#179;) = 3&#178;.<br />
              <strong>Step 3:</strong> Multiply: GCF = 2&#185; &middot; 3&#178; = 2 &middot; 9 = <strong>18</strong>.
            </p>
          </div>

          {/* Example 2 */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600">
              Example 2 (Euclidean Division Method): Find GCF(268442, 178296)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              268442 = 178296 &middot; 1 + 90146<br />
              178296 = 90146 &middot; 1 + 88150<br />
              90146 = 88150 &middot; 1 + 1996<br />
              88150 = 1996 &middot; 44 + 326<br />
              1996 = 326 &middot; 6 + 40<br />
              326 = 40 &middot; 8 + 6<br />
              40 = 6 &middot; 6 + 4<br />
              6 = 4 &middot; 1 + 2<br />
              4 = 2 &middot; 2 + 0 ⟹ Last non-zero remainder = <strong>2</strong>.
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
                <th className="p-2.5">Integer Set</th>
                <th className="p-2.5">Prime Factorization</th>
                <th className="p-2.5">GCF</th>
                <th className="p-2.5">LCM</th>
                <th className="p-2.5">Coprime Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <td className="p-2 font-bold">(36, 54)</td>
                <td className="p-2 font-mono">36=2&#178;&middot;3&#178;, 54=2&middot;3&#179;</td>
                <td className="p-2 font-mono font-bold text-emerald-600">18</td>
                <td className="p-2 font-mono">108</td>
                <td className="p-2 font-bold text-slate-500">No</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">(17, 31)</td>
                <td className="p-2 font-mono">17 (prime), 31 (prime)</td>
                <td className="p-2 font-mono font-bold text-emerald-600">1</td>
                <td className="p-2 font-mono">527</td>
                <td className="p-2 font-bold text-emerald-600">Yes (Coprime)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">(16, 88, 104)</td>
                <td className="p-2 font-mono">16=2&#8308;, 88=2&#173;&#179;&middot;11, 104=2&#179;&middot;13</td>
                <td className="p-2 font-mono font-bold text-emerald-600">8</td>
                <td className="p-2 font-mono">22,880</td>
                <td className="p-2 font-bold text-slate-500">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <span>7. Common Errors & Edge Cases in GCF Calculations</span>
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 1: Confusing GCF with LCM (Least Common Multiple)
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              GCF is the largest common divisor dividing into all numbers (&le; smallest number). LCM is the smallest common multiple divisible by all numbers (&ge; largest number).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 2: Handling Zero [GCF(a, 0) = |a|]
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Every non-zero integer divides 0. Thus, GCF(a, 0) = |a|. However, GCF(0, 0) is mathematically undefined.
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
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Simplifying Rational Fractions & Ratios</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Dividing numerator and denominator by their GCF reduces rational fractions to simplest irreducible form.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Cryptography & RSA Encryption</h4>
            <p className="text-slate-600 dark:text-slate-400">
              The Extended Euclidean Algorithm computes modular multiplicative inverses required for RSA public/private key generation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Room Tiling & Grid Geometry</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Determining the largest square tile size that covers an M &times; N rectangular floor without cutting tiles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Equal Distribution Logistics</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Distributing different quantities of supplies into identical containers without leftover items.
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
          <li><strong>Least Common Multiple (LCM):</strong> The complementary common multiple metric.</li>
          <li><strong>Bézout's Identity:</strong> Expression of GCF as a linear combination of two integers.</li>
          <li><strong>Prime Number Factorization:</strong> Unique prime power decomposition of integers.</li>
        </ul>
      </section>

      {/* 10. SUMMARY */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
        <h2 className="text-lg font-extrabold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The <strong>Greatest Common Factor (GCF) Calculator & Factorization Suite</strong> integrates fundamental arithmetic and advanced number theory. Combining 6 distinct derivation methods—from Euclidean remainders to Bézout coefficients and Venn diagrams—the suite offers clear problem solving and mathematical authority.
        </p>
      </section>

    </div>
  );
}
