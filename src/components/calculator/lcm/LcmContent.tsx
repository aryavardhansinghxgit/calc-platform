"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Layers,
  ShieldCheck,
  Target,
  Award,
  ChevronDown,
  ChevronUp,
  Table,
  Compass,
  FileSpreadsheet
} from "lucide-react";

export function LcmContent() {
  // All 14 FAQs unfolded/open by default in executive 401(k) layout
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 14 }, (_, i) => i))
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

  const faqs = [
    {
      q: "What is the LCM?",
      a: "The Least Common Multiple (LCM) is the smallest positive integer that is evenly divisible by every number in the input set without leaving a remainder."
    },
    {
      q: "How do you calculate the LCM of two numbers?",
      a: "You can list sequential multiples until finding the first match, extract highest prime factor powers, or divide their product by their Greatest Common Factor using the formula LCM(a, b) = (a × b) / GCF(a, b)."
    },
    {
      q: "What is the LCM of 12 and 18?",
      a: "The LCM of 12 and 18 is 36. Their prime factorizations are 12 = 2² × 3 and 18 = 2 × 3², yielding 2² × 3² = 4 × 9 = 36. Alternatively, GCF(12, 18) = 6, so (12 × 18) / 6 = 216 / 6 = 36."
    },
    {
      q: "What is the LCM of 12, 18 and 30?",
      a: "The LCM of 12, 18, and 30 is 180. Taking the highest power of each prime across the three factorizations yields 2² × 3² × 5 = 4 × 9 × 5 = 180."
    },
    {
      q: "How do I find LCM using prime factorization?",
      a: "Decompose each number into prime factors with exponents, list every unique prime that appears in any of the factorizations, assign each prime its highest observed exponent, and multiply these prime powers together."
    },
    {
      q: "What is the difference between GCF and LCM?",
      a: "The GCF (Greatest Common Factor) is the largest integer that divides evenly into all inputs (it is always ≤ the smallest number). The LCM is the smallest integer that all inputs divide into (it is always ≥ the largest number)."
    },
    {
      q: "Is the LCM always greater than or equal to the original numbers?",
      a: "Yes. For any collection of positive integers, the LCM can never be smaller than the largest input in the set: LCM(a₁, ..., aₙ) ≥ max(a₁, ..., aₙ)."
    },
    {
      q: "What is the LCM of coprime numbers?",
      a: "For two coprime positive integers (numbers whose GCF is 1), their LCM is simply their direct product: LCM(a, b) = a × b."
    },
    {
      q: "Is LCM used for fractions?",
      a: "Yes. The Least Common Denominator (LCD) of a group of fractions is precisely the LCM of their denominators, ensuring the smallest possible common base for addition and subtraction."
    },
    {
      q: "Can I calculate the LCM of more than two numbers?",
      a: "Yes. The maximum prime exponent rule works seamlessly for three, ten, or 15+ numbers. Alternatively, you can apply pairwise reduction iteratively: LCM(a, b, c) = LCM(LCM(a, b), c)."
    },
    {
      q: "Does changing the order of the numbers change the LCM?",
      a: "No. The LCM satisfies the commutative and associative algebraic properties: LCM(12, 18, 30) = LCM(30, 12, 18) = 180."
    },
    {
      q: "Do duplicate numbers change the LCM?",
      a: "No. Repeating an integer does not add new prime factors or increase existing exponent requirements: LCM(12, 12, 18) = LCM(12, 18) = 36."
    },
    {
      q: "Which is faster for large numbers: listing multiples or prime factorization?",
      a: "Listing multiples quickly becomes impractical for large integers. Prime factorization or iterative Euclidean GCF reduction provides a fast, mathematically scalable solution."
    },
    {
      q: "What is the relationship between LCM and GCF?",
      a: "For two positive integers a and b, the product of their LCM and GCF equals the product of the two numbers: LCM(a, b) × GCF(a, b) = a × b. This identity holds strictly for pairs."
    }
  ];

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      
      {/* ========================================================================= */}
      {/* 1. QUICK-ACCESS RELATED CALCULATORS BAR (PLACED ONCE BEFORE CONTENT) */}
      {/* ========================================================================= */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          Related Calculators:
        </span>
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <Link
            href="/calculators/gcf-calculator"
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-bold hover:border-blue-500 transition-colors shadow-2xs"
          >
            Greatest Common Factor (GCF) Calculator
          </Link>
          <Link
            href="/calculators/factor-calculator"
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-bold hover:border-blue-500 transition-colors shadow-2xs"
          >
            Factor Calculator &amp; Prime Factorization
          </Link>
          <Link
            href="/calculators/fraction-calculator"
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-bold hover:border-blue-500 transition-colors shadow-2xs"
          >
            Fraction Calculator
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. IN-CONTENT TABLE OF CONTENTS (ANCHOR LINKS) */}
      {/* ========================================================================= */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Compass className="h-4 w-4" />
          <span>Table of Contents &amp; Quick Navigation</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1.5 text-xs">
          <a href="#what-is-lcm" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            1. LCM: Definition &amp; Meaning
          </a>
          <a href="#how-to-use" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            2. How to Use This Calculator
          </a>
          <a href="#lcm-formula" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            3. Core LCM Formulas &amp; Duality
          </a>
          <a href="#prime-factorization" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            4. Prime Factorization Method
          </a>
          <a href="#listing-multiples" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            5. Listing Multiples Method
          </a>
          <a href="#division-ladder" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            6. Division Ladder (Cake) Method
          </a>
          <a href="#lcm-three-numbers" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            7. LCM of 3+ Numbers
          </a>
          <a href="#lcm-vs-gcf" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            8. LCM vs GCF Differences
          </a>
          <a href="#lcm-fractions" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            9. Fractions &amp; LCD Connection
          </a>
          <a href="#coprime-lcm" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            10. LCM of Coprime Numbers
          </a>
          <a href="#worked-example" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            11. Worked Example (12, 18, 30)
          </a>
          <a href="#real-world-uses" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            12. Real-World Applications
          </a>
          <a href="#five-ways-to-check" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            13. Five Ways to Check an LCM
          </a>
          <a href="#sanity-checks" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            14. Mathematical Sanity Rules
          </a>
          <a href="#common-mistakes" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            15. Common LCM Mistakes
          </a>
          <a href="#choosing-method" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            16. Choosing the Right Method
          </a>
          <a href="#terminology" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            17. Terminology (GCF/GCD/HCF/LCD)
          </a>
          <a href="#faq" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            18. Frequently Asked Questions
          </a>
          <a href="#verification" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
            19. Verifying Your Work
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. 20 COMPREHENSIVE EDUCATIONAL CONTENT SECTIONS */}
      {/* ========================================================================= */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1 */}
        <section id="what-is-lcm" className="space-y-3 pt-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Least Common Multiple (LCM): Definition and Meaning
          </h2>
          <p>
            The <strong>Least Common Multiple (LCM)</strong> of two or more positive integers is the smallest positive integer that is divisible by every number in the set. In other words, the LCM is the first positive value that all of the input numbers can divide into evenly without leaving a remainder.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono font-bold text-blue-600 dark:text-blue-400 text-center">
            LCM(12, 18) = 36
          </div>
          <p>
            This holds because 36 is divisible by both 12 (36 ÷ 12 = 3) and 18 (36 ÷ 18 = 2), while no smaller positive integer can claim this common divisibility.
          </p>
          <p>
            The concept becomes essential when multiple repeating cycles must synchronize. If one process recurs every 12 units of time and another repeats every 18 units, their first simultaneous recurrence after starting together occurs precisely at their LCM: 36 units.
          </p>
          <p>
            The same fundamental principle extends naturally to three or more numbers:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono font-bold text-blue-600 dark:text-blue-400 text-center">
            LCM(12, 18, 30) = 180
          </div>
          <p>
            The result must be divisible by 12, 18, and 30, and 180 is the smallest positive integer satisfying all three requirements simultaneously.
          </p>
          <p>
            This calculator accepts multiple integers and delivers far more than an isolated number. It simultaneously calculates the associated GCF, shows prime factor reasoning, provides 5 distinct mathematical derivation methods, and includes a direct LCD conversion helper for fraction arithmetic.
          </p>
        </section>

        {/* Section 2 */}
        <section id="how-to-use" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How to Use the LCM Calculator
          </h2>
          <p>
            Enter two or more positive integers into the primary input field. The computational parser accepts numbers separated by commas, spaces, or semicolons (for example: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">12, 18, 30</code>).
          </p>
          <p>
            The calculation suite dynamically generates:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Least Common Multiple (LCM):</strong> Primary integer result and canonical prime power form.</li>
            <li><strong>Greatest Common Factor (GCF):</strong> Dual evaluation showing the largest shared divisor.</li>
            <li><strong>Prime Factorization Breakdown:</strong> Unique prime powers for each input integer.</li>
            <li><strong>Common Division Grid (Ladder Matrix):</strong> Step-by-step prime reduction table.</li>
            <li><strong>Euclidean / GCF Iterative Chain:</strong> Pairwise formula verification steps.</li>
            <li><strong>Listing Multiples:</strong> Finite multiple search highlighting the first common match.</li>
            <li><strong>Interactive Prime Factor Venn Diagram:</strong> Visual breakdown of exclusive vs shared factors.</li>
            <li><strong>Fraction LCD Assistant:</strong> Automatic demonstration converting unit fractions to a common base.</li>
            <li><strong>Calculation History &amp; Persistence:</strong> Save, inspect, and reload previous solves.</li>
            <li><strong>Copy &amp; Export Features:</strong> Instant clipboard copying, LaTeX export, and print/PDF formatting.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section id="lcm-formula" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. LCM Formula
          </h2>
          <p>
            For two positive integers <span className="font-mono font-bold">a</span> and <span className="font-mono font-bold">b</span>, the LCM can be computed directly from their product and their Greatest Common Factor:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center font-bold text-base text-blue-600 dark:text-blue-400">
            LCM(a, b) = (a × b) / GCF(a, b)
          </div>
          <p>
            Equivalently, this relation can be stated as the classic <strong>LCM-GCF Duality Theorem</strong>:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center font-bold text-base text-blue-600 dark:text-blue-400">
            LCM(a, b) × GCF(a, b) = a × b
          </div>
          <p>
            This identity serves as a powerful arithmetic verification check.
          </p>
          
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Worked Verification: LCM of 48 and 60
            </h3>
            <p>1. Find the GCF of the pair: <span className="font-mono font-bold">GCF(48, 60) = 12</span>.</p>
            <p>2. Apply the product formula:</p>
            <p className="font-mono font-bold pl-4">LCM(48, 60) = (48 × 60) / 12 = 2880 / 12 = 240</p>
            <p>3. Verify using the identity product:</p>
            <p className="font-mono font-bold pl-4">48 × 60 = 2880</p>
            <p className="font-mono font-bold pl-4">240 × 12 = 2880</p>
            <p className="text-emerald-600 dark:text-emerald-400 font-bold">
              ✓ Identity holds: 48 × 60 = LCM(48, 60) × GCF(48, 60) = 2880.
            </p>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-900 dark:text-amber-200 text-xs">
            <strong>Important Multi-Number Boundary:</strong> The identity <code className="font-bold">a × b = LCM × GCF</code> is strictly a <strong>two-number relationship</strong>. It must never be generalized to three or more numbers as <code className="font-bold">a × b × c = LCM × GCF</code>, because pairwise shared factors would distort the product.
          </div>
        </section>

        {/* Section 4 */}
        <section id="prime-factorization" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. How to Find the LCM Using Prime Factorization
          </h2>
          <p>
            Prime factorization is the most structured and mathematically universal method for determining an LCM.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold">
            <strong>The Maximum Exponent Rule:</strong> To find the LCM, decompose every integer into primes and take the highest exponent observed for every unique prime factor appearing across any of the inputs.
          </div>
          <p>
            Consider the integer triplet <span className="font-mono font-bold">[12, 18, 30]</span>:
          </p>
          <ul className="font-mono text-xs pl-5 space-y-1">
            <li>12 = 2² × 3¹</li>
            <li>18 = 2¹ × 3²</li>
            <li>30 = 2¹ × 3¹ × 5¹</li>
          </ul>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Prime Factor</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Power in 12</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Power in 18</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Power in 30</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700 text-blue-600">Highest Power Selected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono">
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold">2</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">2²</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">2¹</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">2¹</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold text-blue-600">2² = 4</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold">3</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">3¹</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">3²</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">3¹</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold text-blue-600">3² = 9</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold">5</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">—</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">—</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">5¹</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold text-blue-600">5¹ = 5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Multiplying the highest selected prime powers yields:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono font-bold text-blue-600 dark:text-blue-400 text-center">
            LCM(12, 18, 30) = 2² × 3² × 5 = 4 × 9 × 5 = 180
          </div>
          <p>
            This explains why simple raw multiplication (12 × 18 × 30 = 6480) yields an inflated result: raw products count shared prime factors multiple times instead of once at their peak power.
          </p>
        </section>

        {/* Section 5 */}
        <section id="listing-multiples" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. How to Find the LCM by Listing Multiples
          </h2>
          <p>
            The brute-force listing method is intuitive for introductory arithmetic and small numbers.
          </p>
          <p>Take numbers 4 and 6:</p>
          <ul className="font-mono text-xs pl-5 space-y-1">
            <li>Multiples of 4: 4, 8, <span className="font-bold text-emerald-600">12</span>, 16, 20, 24, 28...</li>
            <li>Multiples of 6: 6, <span className="font-bold text-emerald-600">12</span>, 18, 24, 30...</li>
          </ul>
          <p>
            The very first integer appearing simultaneously in both sequences is <span className="font-mono font-bold text-emerald-600">12</span>. Therefore, <span className="font-mono font-bold">LCM(4, 6) = 12</span>.
          </p>
          <p>
            While listing multiples provides immediate visual intuition, it becomes cumbersome and computationally inefficient for large integers or multi-number sets where the first common multiple exceeds hundreds or thousands.
          </p>
        </section>

        {/* Section 6 */}
        <section id="division-ladder" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. LCM Using the Division or Ladder Method
          </h2>
          <p>
            The division ladder method (frequently known as the cake or grid method) places the numbers in a horizontal row and divides them repeatedly by prime divisors that divide at least two of the values.
          </p>
          <p>For inputs <span className="font-mono font-bold">12, 18, 30</span>:</p>
          <ol className="list-decimal pl-5 space-y-1 font-mono text-xs">
            <li>Divide by 2: [12, 18, 30] → [6, 9, 15]</li>
            <li>Divide by 3: [6, 9, 15] → [2, 3, 5]</li>
            <li>The quotients [2, 3, 5] are pairwise coprime (no further common prime divisors).</li>
          </ol>
          <p>
            The final LCM is obtained by multiplying all outer divisors and remaining quotients:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono font-bold text-blue-600 dark:text-blue-400 text-center">
            LCM = 2 × 3 × (2 × 3 × 5) = 180
          </div>
          <p>
            This calculator provides a live <strong>Division Grid</strong> tab showing every intermediate step and quotient matrix dynamically.
          </p>
        </section>

        {/* Section 7 */}
        <section id="lcm-three-numbers" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. LCM of Three or More Numbers
          </h2>
          <p>
            The Least Common Multiple is not restricted to pairs. For three numbers <span className="font-mono font-bold">[8, 12, 20]</span>:
          </p>
          <ul className="font-mono text-xs pl-5 space-y-1">
            <li>8 = 2³</li>
            <li>12 = 2² × 3¹</li>
            <li>20 = 2² × 5¹</li>
          </ul>
          <p>Extracting the highest power of each observed prime factor:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono font-bold text-blue-600 dark:text-blue-400 text-center">
            LCM(8, 12, 20) = 2³ × 3¹ × 5¹ = 8 × 3 × 5 = 120
          </div>
          <p>
            The same maximum-exponent rule holds true whether calculating 3, 10, or 15+ numbers.
          </p>
        </section>

        {/* Section 8 */}
        <section id="lcm-vs-gcf" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. LCM vs GCF: What Is the Difference?
          </h2>
          <p>
            LCM and GCF answer complementary, opposing questions regarding integer relationships:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>LCM (Least Common Multiple):</strong> The smallest positive integer that is divisible by all numbers in the set (e.g., LCM(12, 18) = 36).</li>
            <li><strong>GCF (Greatest Common Factor):</strong> The largest integer that divides into all numbers in the set evenly (e.g., GCF(12, 18) = 6).</li>
          </ul>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Property</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700 text-blue-600">Greatest Common Factor (GCF)</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700 text-emerald-600">Least Common Multiple (LCM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold">Core Question</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">What is the largest shared divisor?</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">What is the smallest shared multiple?</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold">Prime Exponents</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Minimum shared exponents across all inputs</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Maximum exponent appearing in any input</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold">Value Boundary</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Always ≤ smallest input</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Always ≥ largest input</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold">Primary Application</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Simplifying fractions, factoring polynomials</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Adding fractions (LCD), cycle synchronization</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-bold">Pairwise Identity</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-mono" colSpan={2}>
                    GCF(a, b) × LCM(a, b) = a × b
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 9 */}
        <section id="lcm-fractions" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. LCM and Fractions: Why the LCD Is an LCM
          </h2>
          <p>
            When adding or subtracting fractions with different denominators, you must convert them to a common denominator. The most efficient choice is the <strong>Least Common Denominator (LCD)</strong>, which is precisely the LCM of the denominators.
          </p>
          <p>Consider the summation:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono font-bold text-center">
            1/12 + 1/18 + 1/30
          </div>
          <p>The denominators are 12, 18, and 30, whose LCM is 180. Scaling each fraction:</p>
          <ul className="font-mono text-xs pl-5 space-y-1">
            <li>1/12 = (1 × 15) / 180 = 15/180</li>
            <li>1/18 = (1 × 10) / 180 = 10/180</li>
            <li>1/30 = (1 × 6) / 180 = 6/180</li>
          </ul>
          <p>Combining the numerators:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono font-bold text-blue-600 dark:text-blue-400 text-center">
            1/12 + 1/18 + 1/30 = (15 + 10 + 6) / 180 = 31/180
          </div>
          <p>
            Using the LCM avoids inflated products (12 × 18 × 30 = 6480) and eliminates the need for extensive post-simplification.
          </p>
        </section>

        {/* Section 10 */}
        <section id="coprime-lcm" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. LCM of Coprime Numbers
          </h2>
          <p>
            Two integers are <strong>coprime (relatively prime)</strong> when their GCF is 1: GCF(a, b) = 1.
          </p>
          <p>
            For example, 8 and 15 share no prime factors:
          </p>
          <ul className="font-mono text-xs pl-5 space-y-1">
            <li>8 = 2³</li>
            <li>15 = 3 × 5</li>
          </ul>
          <p>Because there are zero shared factors, the LCM must incorporate every prime power from both numbers:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono font-bold text-blue-600 dark:text-blue-400 text-center">
            LCM(8, 15) = 2³ × 3 × 5 = 120 = 8 × 15
          </div>
          <p>
            Whenever GCF(a, b) = 1, the pairwise formula simplifies to: <span className="font-mono font-bold">LCM(a, b) = a × b</span>.
          </p>
        </section>

        {/* Section 11 */}
        <section id="worked-example" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. A Worked LCM Example: 12, 18, and 30
          </h2>
          <p>
            Let us trace the complete mathematical derivation for <span className="font-mono font-bold">[12, 18, 30]</span> from start to finish:
          </p>
          <div className="space-y-2 font-mono text-xs bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="font-bold text-blue-600">Step 1: Factor each number into primes</p>
            <p className="pl-4">12 = 2² × 3¹</p>
            <p className="pl-4">18 = 2¹ × 3²</p>
            <p className="pl-4">30 = 2¹ × 3¹ × 5¹</p>
            <p className="font-bold text-blue-600 pt-2">Step 2: Collect every unique prime</p>
            <p className="pl-4">Primes present: 2, 3, 5</p>
            <p className="font-bold text-blue-600 pt-2">Step 3: Select the highest exponent for each prime</p>
            <p className="pl-4">Prime 2: max(2, 1, 1) = 2² = 4</p>
            <p className="pl-4">Prime 3: max(1, 2, 1) = 3² = 9</p>
            <p className="pl-4">Prime 5: max(0, 0, 1) = 5¹ = 5</p>
            <p className="font-bold text-blue-600 pt-2">Step 4: Multiply the prime powers</p>
            <p className="pl-4 font-bold text-slate-900 dark:text-slate-100">LCM = 2² × 3² × 5¹ = 4 × 9 × 5 = 180</p>
            <p className="font-bold text-blue-600 pt-2">Step 5: Verify divisibility</p>
            <p className="pl-4">180 ÷ 12 = 15 (integer ✓)</p>
            <p className="pl-4">180 ÷ 18 = 10 (integer ✓)</p>
            <p className="pl-4">180 ÷ 30 = 6  (integer ✓)</p>
          </div>
        </section>

        {/* Section 12 */}
        <section id="real-world-uses" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Why the LCM Is Useful in Real Problems
          </h2>
          <p>
            LCM algorithms govern synchronization across independent repeating cycles:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">Periodic Scheduling</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                If Bus Line A departs every 15 minutes and Bus Line B departs every 20 minutes, both buses depart together every LCM(15, 20) = 60 minutes.
              </p>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">Packaging &amp; Inventory</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                If hot dogs are sold in packs of 10 and buns in packs of 8, purchasing LCM(10, 8) = 40 units guarantees zero leftover food.
              </p>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">Mechanical Gear Train Timing</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                For meshed gears with 16 and 24 teeth, specific tooth pairings realign after exactly LCM(16, 24) = 48 teeth pass the contact point.
              </p>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">Computer Science &amp; Concurrency</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Operating system task schedulers use LCM to determine hyper-periods for periodic real-time threads running at different frequencies.
              </p>
            </div>
          </div>
        </section>

        {/* Section 13 */}
        <section id="five-ways-to-check" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Five Ways to Check an LCM
          </h2>
          <p>
            Reliable mathematics does not depend on a single opaque computation. This suite provides 5 cross-verifiable methods:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>Prime Factorization:</strong> Confirms maximum prime powers and exposes structural factors.</li>
            <li><strong>Division Ladder (Cake Grid):</strong> Demonstrates physical arithmetic reductions row by row.</li>
            <li><strong>GCF Euclidean Formula:</strong> Evaluates pairwise reductions efficiently: (a × b) / GCF(a, b).</li>
            <li><strong>Listing Multiples:</strong> Confirms the first intersecting multiple visually for smaller sets.</li>
            <li><strong>SVG Prime Factor Venn Diagrams:</strong> Visually segregates shared GCF primes from set-exclusive prime powers.</li>
          </ol>
        </section>

        {/* Section 14 */}
        <section id="sanity-checks" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. LCM Mathematical Rules and Sanity Checks
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Divisibility Criterion:</strong> The LCM must divide evenly by every input: <code className="font-bold">LCM mod x = 0</code> for all inputs x. If any remainder is non-zero, the result is invalid.
            </li>
            <li>
              <strong>Lower Bound Condition:</strong> For positive integers, the LCM is always greater than or equal to the largest input: <code className="font-bold">LCM(a₁, ..., aₙ) ≥ max(a₁, ..., aₙ)</code>.
            </li>
            <li>
              <strong>Duplicate Invariance:</strong> Repeating an integer does not alter the LCM: <code className="font-bold">LCM(12, 12, 18) = LCM(12, 18) = 36</code>.
            </li>
            <li>
              <strong>Order Invariance (Commutativity):</strong> Shuffling the input order produces identical results: <code className="font-bold">LCM(12, 18, 30) = LCM(30, 12, 18) = 180</code>.
            </li>
          </ul>
        </section>

        {/* Section 15 */}
        <section id="common-mistakes" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Common LCM Mistakes
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl space-y-1">
              <h4 className="font-bold text-amber-900 dark:text-amber-200 text-xs">Mistake 1: Multiplying All Numbers Directly</h4>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                For [12, 18, 30], raw multiplication yields 12 × 18 × 30 = 6480, which is 36 times larger than the true LCM of 180.
              </p>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl space-y-1">
              <h4 className="font-bold text-amber-900 dark:text-amber-200 text-xs">Mistake 2: Using Minimum Instead of Maximum Prime Exponents</h4>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                Minimum exponents determine the GCF. LCM calculations require the <strong>maximum exponent</strong> observed for each prime.
              </p>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl space-y-1">
              <h4 className="font-bold text-amber-900 dark:text-amber-200 text-xs">Mistake 3: Generalizing Pairwise Identity to 3+ Numbers</h4>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                The formula <code className="font-bold">a × b = LCM × GCF</code> holds strictly for two numbers. For three numbers, GCF(a,b,c) × LCM(a,b,c) ≠ a × b × c due to pairwise shared factors.
              </p>
            </div>
          </div>
        </section>

        {/* Section 16 */}
        <section id="choosing-method" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. When Should You Use Each LCM Method?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Scenario</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700 text-blue-600">Recommended Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Small numbers (&lt; 20)</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-semibold">Listing Multiples</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Exam / Classroom homework showing prime work</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-semibold">Prime Factorization</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Multiple composite numbers</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-semibold">Division Ladder Grid</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Two numbers with known GCF</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-semibold">GCF Formula: (a × b) / GCF</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Visualizing shared vs exclusive factors</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700 font-semibold">Venn Diagram Visualization</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 17 */}
        <section id="terminology" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. LCM, GCF, GCD, HCF and LCD: Terminology
          </h2>
          <p>Different curricula and international textbooks use varying terms for identical concepts:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>GCF (Greatest Common Factor):</strong> Standard North American terminology for the greatest shared divisor.</li>
            <li><strong>GCD (Greatest Common Divisor):</strong> Standard higher mathematics and computer science terminology (identical to GCF).</li>
            <li><strong>HCF (Highest Common Factor):</strong> Common UK, Indian, and Commonwealth curriculum terminology (identical to GCF).</li>
            <li><strong>LCM (Least Common Multiple / Lowest Common Multiple):</strong> Universal term for the lowest shared multiple.</li>
            <li><strong>LCD (Least Common Denominator):</strong> The LCM applied specifically to the denominators of rational fractions.</li>
          </ul>
        </section>

        {/* Section 18: FREQUENTLY ASKED QUESTIONS (UNFOLDED BY DEFAULT) */}
        <section id="faq" className="space-y-4 pt-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <span>18. Frequently Asked Questions About LCM</span>
            </h2>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {openFaqIndices.size} of {faqs.length} Expanded
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndices.has(idx);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 text-slate-900 dark:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-xs sm:text-sm">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/60 dark:border-slate-800/60 pt-3 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 19 */}
        <section id="verification" className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. How This LCM Calculator Helps You Verify Your Work
          </h2>
          <p>
            An online calculator that reports only a raw integer solves the arithmetic problem but fails to teach the mathematical concept. This suite is engineered around <strong>cross-verification and educational transparency</strong>.
          </p>
          <p>
            When you enter an integer sequence like <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">12, 18, 30</code>, you instantly receive:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The confirmed answer: <span className="font-mono font-bold">LCM = 180</span>.</li>
            <li>The prime power product: <span className="font-mono font-bold">2² × 3² × 5</span>.</li>
            <li>The counterpart divisor: <span className="font-mono font-bold">GCF = 6</span>.</li>
            <li>Interactive visualizations and division ladder matrices.</li>
          </ul>
          <p>
            This dual focus on speed and transparent derivations empowers students, engineers, and educators to verify calculations with absolute mathematical certainty.
          </p>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* 4. EXPLORE RELATED CALCULATORS (PLACED ONCE AFTER THE CONTENT) */}
      {/* ========================================================================= */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          20. Explore Related Math Calculators
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Complement your integer factorization and arithmetic problem solving with these dedicated solvers:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <Link
            href="/calculators/gcf-calculator"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-blue-500 hover:shadow-sm transition-all group"
          >
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm group-hover:underline mb-1">
              Greatest Common Factor (GCF) Calculator
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Calculate the largest shared divisor across multiple numbers with Euclidean steps and Bézout identities.
            </p>
          </Link>
          <Link
            href="/calculators/factor-calculator"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-blue-500 hover:shadow-sm transition-all group"
          >
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm group-hover:underline mb-1">
              Factor Calculator &amp; Prime Factorization
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Decompose any integer into prime factor trees, find all factor pairs, and test for primality.
            </p>
          </Link>
          <Link
            href="/calculators/fraction-calculator"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-blue-500 hover:shadow-sm transition-all group"
          >
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm group-hover:underline mb-1">
              Fraction Calculator
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Add, subtract, multiply, and divide fractions with automated common denominator conversion.
            </p>
          </Link>
        </div>
      </section>

    </article>
  );
}

export default LcmContent;
