"use client";

import React from "react";
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, Layers, ShieldCheck, Target, Award } from "lucide-react";

export function BigNumberContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span>1. Introduction to the Big Number & Arbitrary-Precision Suite</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Big Number Calculator & Arbitrary-Precision Math Suite</strong> is a computational number theory application designed to execute mathematical calculations on integers exceeding standard 64-bit hardware limits without floating-point roundoff errors.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This suite supports 6 dedicated calculation modes (Arbitrary-Precision Arithmetic, Modular Exponentiation Aᵇ mod M, Large Factorials N! & Combinatorics, Primality Testing, Named Big Numbers & Googology Explorer, and Digit Inspector Analytics) handling integers with thousands of digits.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          <span>2. Mathematical Concept, Computer Science Limits & Arbitrary Precision</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          In standard 64-bit IEEE 754 floating-point representations, exact integer precision is strictly capped at 2&#8309;&#179; - 1 = 9,007,199,254,740,991 (MAX_SAFE_INTEGER). Beyond this limit, standard calculators lose exact digits and switch to approximate scientific notation.
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          {"MAX_SAFE_INTEGER = 2⁵³ - 1 = 9,007,199,254,740,991"}
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
          What is Arbitrary-Precision (Bignum) Arithmetic?
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Arbitrary-precision arithmetic stores numbers as dynamic arrays of digits or binary words in RAM, allowing software algorithms to perform exact addition, multiplication, and exponentiation across thousands or millions of digits.
        </p>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" />
          <span>3. Core Formulas & Legendre's Factorial Trailing Zeros Formula</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">1. Legendre's Trailing Zeros Formula</h4>
            <p className="font-mono text-sm font-bold">{"Z(n) = ∑ ⌊n / 5ᵏ⌋ for k = 1, 2, 3..."}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Exact count of trailing zeros in N! by counting prime factors of 5.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">2. Modular Exponentiation Algorithm</h4>
            <p className="font-mono text-sm font-bold">{"Aᵇ mod M = [ (A mod M) · (Aᵇ⁻¹ mod M) ] mod M"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Binary square-and-multiply algorithm essential for RSA cryptography.</p>
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
          The calculation engine processes large numbers in four stages:
        </p>

        <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-4 list-decimal">
          <li className="pl-2">
            <strong>BigInt String Parsing:</strong> Input textareas are tokenized into native JavaScript BigInt objects.
          </li>
          <li className="pl-2">
            <strong>Binary Square-and-Multiply:</strong> Modular exponentiation Aᵇ mod M performs bit-shifts to compute powers without memory overflow.
          </li>
          <li className="pl-2">
            <strong>Miller-Rabin Primality Evaluation:</strong> Probabilistic Fermat test rounds verify if massive odd integers are prime.
          </li>
          <li className="pl-2">
            <strong>Digit Frequency Analytics:</strong> Counting total digits, digit sums, and 0-9 distribution.
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
              Example 1 (Legendre's Formula): Find Trailing Zeros of 100!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              Z(100) = &lfloor;100/5&rfloor; + &lfloor;100/25&rfloor; + &lfloor;100/125&rfloor;...<br />
              Z(100) = 20 + 4 + 0 = <strong>24 Trailing Zeros</strong>.
            </p>
          </div>

          {/* Example 2 */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600">
              Example 2 (Modular Exponentiation): Find 7&#185;&#8307; mod 13
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              Using Fermat's Little Theorem: 7&#185;&#178; &equiv; 1 (mod 13).<br />
              7&#185;&#8307; = (7&#185;&#178;) &middot; 7&#8309; &equiv; 7&#8309; mod 13.<br />
              7&#178; = 49 &equiv; 10 (mod 13); 7&#8308; &equiv; 100 &equiv; 9 (mod 13).<br />
              7&#8309; &equiv; 9 &middot; 7 = 63 &equiv; <strong>11 (mod 13)</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-blue-600" />
          <span>6. Visual Understanding & Short vs. Long Scale Reference Matrix</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5">Power of 10</th>
                <th className="p-2.5">Short Scale (US / Modern UK)</th>
                <th className="p-2.5">Long Scale (Traditional European)</th>
                <th className="p-2.5">Total Digits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50 font-mono">
              <tr>
                <td className="p-2 font-bold font-sans">10⁶</td>
                <td className="p-2 text-blue-600 font-bold">Million</td>
                <td className="p-2">Million</td>
                <td className="p-2">7 Digits</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">10⁹</td>
                <td className="p-2 text-blue-600 font-bold">Billion</td>
                <td className="p-2">Thousand Million</td>
                <td className="p-2">10 Digits</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">10¹²</td>
                <td className="p-2 text-blue-600 font-bold">Trillion</td>
                <td className="p-2">Billion</td>
                <td className="p-2">13 Digits</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">10¹⁰⁰</td>
                <td className="p-2 text-emerald-600 font-bold">Googol</td>
                <td className="p-2">Googol</td>
                <td className="p-2">101 Digits</td>
              </tr>
              <tr>
                <td className="p-2 font-bold font-sans">10³⁰³</td>
                <td className="p-2 text-emerald-600 font-bold">Centillion</td>
                <td className="p-2">Centillion (10⁶⁰⁰)</td>
                <td className="p-2">304 Digits</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <span>7. Common Errors & Edge Cases in Big Number Arithmetic</span>
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 1: Relying on Standard 64-Bit Float Data Types
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Standard JavaScript numbers lose precision above 2&#8309;&#179; - 1. Arbitrary-precision BigInt engines are required for exact arithmetic.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 2: Evaluating Aᵇ Before Applying Modulo M
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Attempting to compute Aᵇ first causes memory exhaustion. Binary square-and-multiply keeps intermediate values mod M at each step.
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
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Public-Key RSA Cryptography</h4>
            <p className="text-slate-600 dark:text-slate-400">
              2048-bit modular exponentiation algorithms form the foundation of secure web HTTPS and TLS encryption.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Combinatorial State Space Complexity</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Evaluating exact permutation counts and state spaces in game theory (e.g. Chess Shannon number ~10&#185;&#178;&#8070;).
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
          <li><strong>Miller-Rabin Primality Test:</strong> Probabilistic prime verification for large integers.</li>
          <li><strong>Stirling's Factorial Approximation:</strong> Estimating massive factorials N! via asymptotic exponential bounds.</li>
        </ul>
      </section>

      {/* 10. SUMMARY */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
        <h2 className="text-lg font-extrabold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The <strong>Big Number Calculator & Arbitrary-Precision Math Suite</strong> combines computational number theory with interactive Web UI design. Supporting exact BigInt arithmetic, modular exponentiation, Legendre trailing zero counts, and Googology presets, this suite functions as an authoritative calculation and learning resource.
        </p>
      </section>

    </div>
  );
}
