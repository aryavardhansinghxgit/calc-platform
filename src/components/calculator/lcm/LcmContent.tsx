"use client";

import React from "react";
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, Layers, ShieldCheck, Target, Award } from "lucide-react";

export function LcmContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span>1. Introduction to the Least Common Multiple (LCM) Suite</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Least Common Multiple (LCM) Calculator & Factorization Suite</strong> is a computational mathematics application designed to determine the lowest positive integer evenly divisible by a set of two or more numbers. LCM calculation is foundational to rational fraction arithmetic, periodic system synchronization, gear transmission ratios, and algorithmic number theory.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          While traditional tools only calculate a single numeric result, this suite offers simultaneous dual outputs for both the <strong>Least Common Multiple (LCM)</strong> and the <strong>Greatest Common Factor (GCF)</strong>, coupled with full step-by-step derivations across five standard mathematical methods: Prime Factorization, Common Division (Ladder Grid), GCF Euclidean Formula, Multiples Search, and Interactive SVG Venn Diagrams.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          <span>2. Mathematical Concept, Definitions & Terminology</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Formal mathematical notation represents the Least Common Multiple of integers a and b as <strong>LCM(a, b)</strong> or <strong>[a, b]</strong>. It satisfies the strict divisibility criteria:
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          {"m = LCM(a, b) ⟺ a | m  AND  b | m, and m is the smallest positive integer"}
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
          Key Terminology & Distinctions
        </h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
          <li>
            <strong>Multiple:</strong> The product of an integer and any whole number (e.g., multiples of 6 are 6, 12, 18, 24, 30...).
          </li>
          <li>
            <strong>Factor / Divisor:</strong> An integer that divides another integer completely without leaving a remainder (e.g., factors of 12 are 1, 2, 3, 4, 6, 12).
          </li>
          <li>
            <strong>Least Common Denominator (LCD):</strong> The LCM of the denominators of a set of rational fractions, used to establish a common base for addition and subtraction.
          </li>
          <li>
            <strong>Coprime Integers:</strong> Two numbers a and b with no shared prime factors, where GCF(a, b) = 1. For coprime numbers, LCM(a, b) = a &middot; b.
          </li>
        </ul>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" />
          <span>3. Core Formulas & The 5 Mathematical Properties of LCM</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The Least Common Multiple satisfies fundamental algebraic properties that govern integer arithmetic and prime decomposition:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">1. Commutative Property</h4>
            <p className="font-mono text-sm font-bold">{"LCM(a, b) = LCM(b, a)"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Order of operands does not alter the common multiple.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">2. Associative Property</h4>
            <p className="font-mono text-sm font-bold">{"LCM(a, LCM(b, c)) = LCM(LCM(a, b), c)"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Allows computing LCM iteratively across N numbers.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">3. Distributive Property</h4>
            <p className="font-mono text-sm font-bold">{"LCM(k·a, k·b) = k · LCM(a, b)"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Scaling inputs by factor k scales the resulting LCM by k.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">4. LCM-GCF Duality Theorem</h4>
            <p className="font-mono text-sm font-bold">{"LCM(a, b) × GCF(a, b) = |a · b|"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">The product of two numbers equals their LCM times GCF.</p>
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
          When a series of integers is provided, the computational engine executes four sequential processing phases:
        </p>

        <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-4 list-decimal">
          <li className="pl-2">
            <strong>Input Parsing & Tokenization:</strong> Raw strings are split across delimiters (commas, spaces), stripped of non-numeric characters, and parsed into an array of positive integers.
          </li>
          <li className="pl-2">
            <strong>Prime Factorization Extraction:</strong> Each number is decomposed into unique prime factors and their associated exponent counts:
            <div className="my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-center font-bold">
              {"n = p₁ᵉ¹ · p₂ᵉ² · p₃ᵉ³ ..."}
            </div>
          </li>
          <li className="pl-2">
            <strong>Maximum Exponent Selection:</strong> For every unique prime factor p across all numbers, the engine identifies the maximum exponent max(e<sub>i</sub>) and computes their exponential product.
          </li>
          <li className="pl-2">
            <strong>Multi-Method Synchronization:</strong> The engine simultaneously generates division ladder matrices, Euclidean GCF step pairs, and Venn set intersections to provide cross-verified derivations.
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
              Example 1 (Prime Factorization Method): Find LCM(12, 18, 30)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Step 1 (Prime Factorization):</strong><br />
              12 = 2&#178; &middot; 3&#185;<br />
              18 = 2&#185; &middot; 3&#178;<br />
              30 = 2&#185; &middot; 3&#185; &middot; 5&#185;<br />
              <strong>Step 2 (Select Max Exponents):</strong> Prime 2: max(2,1,1) = 2&#178;. Prime 3: max(1,2,1) = 3&#178;. Prime 5: max(0,0,1) = 5&#185;.<br />
              <strong>Step 3 (Multiply):</strong> LCM = 2&#178; &middot; 3&#178; &middot; 5&#185; = 4 &middot; 9 &middot; 5 = <strong>180</strong>.
            </p>
          </div>

          {/* Example 2 */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600">
              Example 2 (GCF Formula Method): Find LCM(48, 60)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Step 1 (Find GCF):</strong> GCF(48, 60) = 12.<br />
              <strong>Step 2 (Apply Formula):</strong> LCM(48, 60) = (48 &middot; 60) / 12 = 2880 / 12 = <strong>240</strong>.<br />
              <strong>Verification:</strong> 48 &middot; 60 = 2880, and LCM &middot; GCF = 240 &middot; 12 = 2880 &#10003;.
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
          The table below demonstrates the relationship between numbers, their GCF, LCM, and product:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5">Integer Set</th>
                <th className="p-2.5">Prime Factorization</th>
                <th className="p-2.5">GCF</th>
                <th className="p-2.5">LCM</th>
                <th className="p-2.5">Product (a &middot; b)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <td className="p-2 font-bold">(8, 12)</td>
                <td className="p-2 font-mono">8=2&#179;, 12=2&#178;&middot;3</td>
                <td className="p-2 font-mono font-bold text-emerald-600">4</td>
                <td className="p-2 font-mono font-bold text-blue-600">24</td>
                <td className="p-2 font-mono">96 (24&middot;4)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">(15, 25)</td>
                <td className="p-2 font-mono">15=3&middot;5, 25=5&#178;</td>
                <td className="p-2 font-mono font-bold text-emerald-600">5</td>
                <td className="p-2 font-mono font-bold text-blue-600">75</td>
                <td className="p-2 font-mono">375 (75&middot;5)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">(21, 14, 38)</td>
                <td className="p-2 font-mono">21=3&middot;7, 14=2&middot;7, 38=2&middot;19</td>
                <td className="p-2 font-mono font-bold text-emerald-600">1</td>
                <td className="p-2 font-mono font-bold text-blue-600">798</td>
                <td className="p-2 font-mono">11,172</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <span>7. Common Errors & Edge Cases in LCM Calculations</span>
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 1: Confusing LCM with GCF (Greatest Common Factor)
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              GCF is the largest divisor that divides into all numbers (it is always &le; the smallest number). LCM is the smallest multiple shared by all numbers (it is always &ge; the largest number).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 2: Assuming Product Formula [a &middot; b &middot; c = LCM &middot; GCF] Holds for 3+ Numbers
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              The direct identity a &middot; b = LCM &middot; GCF holds <strong>strictly for two numbers</strong>. For three numbers, GCF(a,b,c) &middot; LCM(a,b,c) &ne; a &middot; b &middot; c due to pairwise shared factors.
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
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Rational Fraction Arithmetic</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Determining the Least Common Denominator (LCD) to add or subtract fractions with distinct denominators (e.g., 1/12 + 1/18).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Periodic Scheduling & Synchronization</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Calculating when recurring events with different cycle times align simultaneously (e.g., bus arrival intervals, planetary alignment).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Mechanical Engineering & Gearing</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Computing tooth contact frequency and rotational cycles for meshed gears with different tooth counts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Packaging & Inventory Optimization</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Solving product bundling problems (e.g., items sold in packs of 8 vs packs of 12 $\to$ minimum quantity 24).
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
          <li><strong>Greatest Common Factor (GCF / GCD):</strong> The counterpart operational metric finding the largest shared divisor.</li>
          <li><strong>Prime Number Decomposition:</strong> Fundamental Theorem of Arithmetic stating every integer &gt; 1 is uniquely factorizable into primes.</li>
          <li><strong>Modular Arithmetic:</strong> Congruence relations and remainder cycles in cyclic groups.</li>
        </ul>
      </section>

      {/* 10. SUMMARY */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
        <h2 className="text-lg font-extrabold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The <strong>Least Common Multiple (LCM) Calculator & Factorization Suite</strong> empowers users to unpack multi-number factorizations through 5 distinct mathematical methods. By integrating prime power tables, division grids, Euclidean formulas, and interactive Venn diagrams, this suite serves as both a problem-solving tool and a visual learning resource.
        </p>
      </section>

    </div>
  );
}
