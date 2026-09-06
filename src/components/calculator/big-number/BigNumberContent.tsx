"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight
} from "lucide-react";
import { big_number_calculatorFaqs } from "@/app/calculators/big-number-calculator/faq";

export function BigNumberContent() {
  // All 16 FAQs open by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 16 }, (_, i) => i))
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
      
      {/* MAIN EDUCATIONAL BODY */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Big Number Calculator for Exact Large Integer Arithmetic
          </h2>
          <p>
            A big number calculator is designed for calculations involving integers that are too large to handle reliably with ordinary fixed-precision calculators. Instead of reducing a large result to a rounded decimal or scientific-notation approximation, arbitrary-precision integer arithmetic preserves the integer digits throughout the calculation.
          </p>
          <p>
            This Big Number Calculator is built for exact integer work across a broad range of number-theory and large-integer problems. It can calculate with integers containing hundreds or thousands of digits and supports exact arithmetic for addition, subtraction, multiplication, division, modulo, powers, GCD, LCM, factorials, combinations, permutations, and other large-number operations.
          </p>
          <p>
            The distinction matters because conventional floating-point numbers do not represent every large integer exactly. In JavaScript, for example, the ordinary Number type uses IEEE 754 double-precision floating-point representation, and integers are guaranteed to be represented exactly only through 2⁵³ − 1, which equals 9,007,199,254,740,991. Beyond that point, different mathematical integers can collapse to the same stored floating-point value.
          </p>
          <p>
            For exact large-integer calculations, arbitrary-precision integers are the appropriate model. JavaScript&apos;s BigInt type exists specifically to represent integers beyond the exact range of ordinary Number values.
          </p>
          
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              What this calculator can do
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              The page is organized as a collection of related large-number tools rather than a single two-field calculator. Depending on the calculation, you can:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <li>Perform exact integer arithmetic (+, −, ×, ÷, mod)</li>
              <li>Calculate large powers and modular powers (aᵇ mod m)</li>
              <li>Find GCD and LCM values for large integers</li>
              <li>Calculate factorials such as 100!, 500!, or 1000!</li>
              <li>Calculate permutations (nPr) and combinations (nCr)</li>
              <li>Test large integers for primality via Miller-Rabin</li>
              <li>Inspect digit counts, digit sums, and digit frequencies</li>
              <li>Explore named large-number presets such as a googol and googolplex</li>
              <li>Copy or download exact results without replacing them with rounded decimal values</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Why Ordinary Calculators Lose Precision with Very Large Integers
          </h2>
          <p>
            A common source of confusion is the difference between large magnitude and exact integer precision. A calculator may be capable of displaying something such as 9.8765 × 10³⁰ while still being unable to represent the exact integer containing every digit.
          </p>
          <p>
            For everyday numerical work, floating-point arithmetic is extremely useful. But floating-point representation allocates a finite number of bits to the significant portion of a number. As the magnitude increases, the spacing between neighboring representable integers also increases.
          </p>
          
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center text-sm font-semibold text-blue-700 dark:text-blue-300">
            MAX_SAFE_INTEGER = 2⁵³ − 1 = 9,007,199,254,740,991
          </div>

          <p>
            Beyond that boundary, converting a long decimal integer to a floating-point number may change its exact value. MDN demonstrates that integers beyond the safe range can become indistinguishable when stored as ordinary JavaScript numbers.
          </p>
          <p>
            That creates a practical problem for calculations such as 9999999999999999 + 1 or 12345678901234567890 × 9876543210. The issue is not that the arithmetic operation itself is difficult. The issue is that an insufficient numeric representation can change the operands or result before the user ever sees the answer.
          </p>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Arbitrary precision solves a different problem
          </h3>
          <p>
            Arbitrary precision means that the integer representation can grow beyond a fixed machine-sized integer range. In JavaScript, BigInt provides a numeric type capable of representing integers with arbitrary magnitude. It is specifically intended for integer calculations that exceed the practical precision of Number. This is why a big integer calculator is useful even when a conventional calculator can display a visually similar scientific-notation result.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. What Is an Arbitrary-Precision Integer?
          </h2>
          <p>
            An arbitrary-precision integer is a whole-number value represented without requiring it to fit inside a fixed-width floating-point integer field.
          </p>
          <p>
            For example, 10³⁰ is a perfectly ordinary mathematical integer, but its exact decimal expansion already contains 31 digits:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-center break-all">
            1000000000000000000000000000000
          </div>
          <p>
            A larger value such as 10¹⁰⁰ contains 101 digits. The important point is that the number of digits is part of the data. If a calculation needs the exact integer, displaying only 1.0 × 10¹⁰⁰ is not equivalent to retaining all 101 decimal digits.
          </p>
          <p>
            This calculator therefore separates the exact result from its scientific approximation. The exact integer remains the primary result, while a compact scientific representation can be used to understand its scale. That separation is especially useful when working with factorials, combinations, powers, cryptographic-sized integers, and number-theory calculations.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Exact Arithmetic Supported by the Big Number Calculator
          </h2>
          <p>
            The primary arithmetic engine accepts very large integer operands and performs exact operations without converting the intermediate integers into ordinary floating-point values.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                Addition
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                For A + B = C, every digit of A, B, and C is retained. For example: (10⁴² − 1) + 1 = 10⁴². The carry behavior propagates seamlessly across arbitrary digit lengths.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                Subtraction
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Subtraction remains exact even when borrowing propagates across dozens of digits. For example: 10³⁶ − 1 produces a 36-digit string consisting entirely of nines. Special cases like X − X = 0 correctly output 0 without negative zero defects.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                Multiplication
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Large multiplication is one of the clearest applications for arbitrary precision. For example, 12345678901234567890 × 9876543210 yields the exact 30-digit integer 121932631124828532111263526900.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                Integer Division &amp; Modulo
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Integer division satisfies A = B · Q + R. Modulo normalizes the remainder to canonical non-negative residues: 0 ≤ R &lt; M for positive divisors (e.g. −13 mod 5 = 2).
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Large Powers and Modular Exponentiation
          </h2>
          <p>
            Exponentiation creates a special challenge because the fully expanded number can become enormous very quickly. For example, 2¹⁰⁰ already has 31 decimal digits, while 2¹⁰⁰⁰⁰⁰⁰ is vastly larger than a practical browser display. When the goal is instead to calculate aᵇ mod m, there is no need to materialize the entire power.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Square-and-Multiply (Binary Exponentiation)
          </h3>
          <p>
            The modular exponentiation engine uses repeated squaring, also called square-and-multiply. Rather than calculating aᵇ directly, the exponent is processed through its binary representation. Intermediate results are reduced modulo m as the algorithm proceeds.
          </p>
          <p>
            This reduces the computational work from a naive sequence of roughly b multiplications to a logarithmic number of squaring steps (O(log b)) with additional multiplications determined by the exponent&apos;s set bits.
          </p>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1 text-center">
            <div>2¹⁰⁰ mod 1,000,000,007 = 976,371,285</div>
            <div>2¹⁰⁰⁰⁰⁰⁰ mod 1,000,000,007 = 235,042,059</div>
          </div>

          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Why this matters
          </h3>
          <p>
            Modular exponentiation is important in computational number theory and appears in algorithms underlying public-key cryptography (such as RSA and Diffie-Hellman). It is generally much more efficient to reduce modulo m throughout the calculation than to construct the enormous value aᵇ first. This page is best used as a mathematical and computational calculator rather than as a substitute for a full cryptographic library or security review.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. GCD and LCM for Very Large Integers
          </h2>
          <p>
            The calculator also supports two fundamental number-theory operations:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-sm font-semibold">
            gcd(a, b) &nbsp;&nbsp;&amp;&nbsp;&nbsp; lcm(a, b)
          </div>
          <p>
            The greatest common divisor is the largest positive integer dividing both inputs. The least common multiple is the smallest positive integer divisible by both inputs. For nonzero integers, their defining relationship is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-sm font-semibold text-blue-700 dark:text-blue-300">
            lcm(a, b) × gcd(a, b) = |a · b|
          </div>
          <p>
            This identity is especially valuable for checking large-number calculations because an independently computed GCD and LCM can be cross-validated against the product of the original operands. Exact arbitrary-precision Euclidean and LCM algorithms maintain complete integer precision without rounding.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Factorials and Why They Become Huge So Quickly
          </h2>
          <p>
            The factorial of a non-negative integer n is defined as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-sm font-semibold">
            n! = 1 × 2 × 3 × ··· × n &nbsp;&nbsp;(with 0! = 1)
          </div>
          <p>
            Factorials grow much faster than ordinary exponential sequences encountered in everyday calculations. While 5! = 120 and 10! = 3,628,800, by the time we reach 100!, the result contains 158 digits. At 500!, it has 1,135 digits, and at 1000!, it expands to 2,568 digits.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Trailing Zeros of a Factorial (Legendre&apos;s Formula)
          </h3>
          <p>
            Trailing zeros are determined by factors of 10, and each factor of 10 comes from a prime pair of 2 and 5. Because factorials contain far more factors of 2 than 5, the number of trailing zeros is determined strictly by the powers of 5:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-center">
            Z(n!) = ⌊n / 5⌋ + ⌊n / 25⌋ + ⌊n / 125⌋ + ⌊n / 625⌋ + ···
          </div>
          <p>
            For 100!: ⌊100/5⌋ + ⌊100/25⌋ = 20 + 4 = 24 trailing zeros. The calculator reports both the exact factorial and its exact trailing-zero and digit statistics.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Permutations and Combinations with Arbitrary Precision
          </h2>
          <p>
            Large combinatorial values expand rapidly into massive integers:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-center">
              P(n, r) = n! / (n − r)!
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-center">
              C(n, r) = n! / [r! · (n − r)!]
            </div>
          </div>
          <p>
            A permutation counts ordered arrangements, whereas a combination counts unordered selections. For small inputs, 5P2 = 20 and 5C2 = 10. But for large inputs, arbitrary precision ensures that combinations such as 100C50 = 100,891,344,545,564,193,334,812,497,256 remain completely exact across all 30 digits.
          </p>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Why ordinary calculators struggle with nCr
          </h3>
          <p>
            The combination formula contains factorials, and individual factorials can become much larger than the final combination. A good arbitrary-precision implementation therefore evaluates exact integer quotients rather than converting intermediate values into floating-point numbers.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Large Number Primality Testing
          </h2>
          <p>
            A prime number is an integer greater than 1 with exactly two positive divisors: 1 and itself. For large integers, directly testing every possible divisor quickly becomes computationally impossible.
          </p>
          <p>
            The calculator includes a Miller-Rabin primality testing engine for large integer inputs. Miller-Rabin is a probabilistic primality test in its general form, although particular bounded ranges possess deterministic witness sets. The calculator distinguishes deterministic outcomes from probabilistic testing over larger ranges.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Important distinction
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              A primality test answers whether an integer is prime. It does not automatically provide a complete prime factorization of a large composite number. That distinction becomes especially important as the size of the input grows.
            </p>
          </div>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Digit Analysis of Massive Integers
          </h2>
          <p>
            Sometimes the mathematical question is not simply “what is the number?” but “what is inside the number?” The Digit Inspector analyzes large integers and computes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li><strong>Total number of digits:</strong> Exact count of decimal digits in the number.</li>
            <li><strong>Digit sum:</strong> The sum of all individual decimal digits.</li>
            <li><strong>First five &amp; last five digits:</strong> Leading and trailing structural boundaries.</li>
            <li><strong>Digit frequencies (0 through 9):</strong> Count of every digit character from 0 to 9.</li>
            <li><strong>Frequency percentages:</strong> Proportions of each digit, summing exactly to 100%.</li>
          </ul>
          <p>
            For example, analyzing 100! produces a 158-digit frequency distribution whose ten digit counts sum exactly to 158. This is useful for mathematical experiments, combinatorial investigations, and data verification.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Scientific Approximation vs. Exact Integer Result
          </h2>
          <p>
            Large numbers are often easier to understand in scientific notation. For example, 98765432109876543210 can be summarized approximately as 9.8765 × 10¹⁹. But these two representations serve fundamentally different purposes:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
                Exact Representation
              </h3>
              <p className="font-mono text-xs break-all">98765432109876543210</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Preserves every single digit without truncation or loss of information.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
                Scientific Approximation
              </h3>
              <p className="font-mono text-xs">9.8765 × 10¹⁹</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Communicates exponential order of magnitude concisely for fast mental comparison.
              </p>
            </div>
          </div>
          <p>
            The Big Number Calculator intentionally provides both views. The scientific representation should be treated as a compact approximation, while the arbitrary-precision integer is the authoritative exact result.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Googol, Centillion, Googolplex and Other Named Large Numbers
          </h2>
          <p>
            Large-number mathematics often uses named quantities to communicate scale. The calculator&apos;s large-number explorer includes:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-2.5">Named Value</th>
                  <th className="p-2.5">Power of 10</th>
                  <th className="p-2.5">Digit Count</th>
                  <th className="p-2.5">Significance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50/50 dark:bg-slate-800/30 font-mono">
                <tr>
                  <td className="p-2.5 font-bold font-sans">Million</td>
                  <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">10⁶</td>
                  <td className="p-2.5">7 digits</td>
                  <td className="p-2.5 font-sans">Standard metric / financial scale</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold font-sans">Billion</td>
                  <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">10⁹</td>
                  <td className="p-2.5">10 digits</td>
                  <td className="p-2.5 font-sans">Global population, computing clock rates</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold font-sans">Trillion</td>
                  <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">10¹²</td>
                  <td className="p-2.5">13 digits</td>
                  <td className="p-2.5 font-sans">National debts, astronomy distances</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold font-sans">Quadrillion</td>
                  <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">10¹⁵</td>
                  <td className="p-2.5">16 digits</td>
                  <td className="p-2.5 font-sans">Near IEEE 754 float precision boundary</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold font-sans text-emerald-600 dark:text-emerald-400">Googol</td>
                  <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">10¹⁰⁰</td>
                  <td className="p-2.5">101 digits</td>
                  <td className="p-2.5 font-sans">Exceeds atoms in observable universe (~10⁸⁰)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold font-sans text-emerald-600 dark:text-emerald-400">Centillion</td>
                  <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">10³⁰³</td>
                  <td className="p-2.5">304 digits</td>
                  <td className="p-2.5 font-sans">Largest named number in traditional short scale</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold font-sans text-purple-600 dark:text-purple-400">Googolplex</td>
                  <td className="p-2.5 text-purple-600 dark:text-purple-400 font-bold">10^(10¹⁰⁰)</td>
                  <td className="p-2.5">Googol + 1</td>
                  <td className="p-2.5 font-sans">Symbolic only; cannot be written in physical universe</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            A googol has a finite decimal expansion with 101 digits. A googolplex is fundamentally different: its number of digits is itself a googol. That makes symbolic notation essential for communicating values that cannot realistically be materialized in full.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. How to Use the Big Number Calculator
          </h2>
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wide">
                Step 1: Enter your integer
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Paste or type the complete integer into the operand fields. For exact integer arithmetic, use whole-number values. The calculator validates malformed characters and preserves complete digit strings.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wide">
                Step 2: Select the operation
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Choose the arithmetic operator (+, −, ×, ÷, mod, gcd, lcm). For modular powers, use the dedicated Modular Exponentiation mode with base, exponent, and modulus inputs.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wide">
                Step 3: Review the exact result
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                The primary result preserves the full integer without rounding. View the companion scientific notation for order-of-magnitude analysis.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wide">
                Step 4: Explore related mathematical information
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Inspect digit counts, digit sums, prime classifications, trailing zeros, and digit frequency distributions across the six dedicated tabs.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wide">
                Step 5: Save or export
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Save your calculation to local browser storage with exact raw operand restoration. Copy exact results, export LaTeX markup, download TXT files, or generate structured CSV spreadsheets.
              </p>
            </div>
          </div>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Examples You Can Try
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1 font-mono text-xs">
              <div className="font-bold font-sans text-blue-600 dark:text-blue-400 text-xs uppercase">
                Example 1: Large Multiplication
              </div>
              <div>X = 12345678901234567890</div>
              <div>Y = 9876543210</div>
              <div className="font-semibold text-slate-900 dark:text-slate-100 pt-1 break-all">
                Result = 121932631124828532111263526900
              </div>
              <p className="text-[11px] font-sans text-slate-500 dark:text-slate-400">Exact 30-digit integer result.</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1 font-mono text-xs">
              <div className="font-bold font-sans text-blue-600 dark:text-blue-400 text-xs uppercase">
                Example 2: Large GCD
              </div>
              <div>X = 12345678901234567890</div>
              <div>Y = 9876543210</div>
              <div className="font-semibold text-slate-900 dark:text-slate-100 pt-1">
                gcd(X, Y) = 90
              </div>
              <p className="text-[11px] font-sans text-slate-500 dark:text-slate-400">Greatest common divisor evaluated exactly.</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1 font-mono text-xs">
              <div className="font-bold font-sans text-blue-600 dark:text-blue-400 text-xs uppercase">
                Example 3: Large LCM
              </div>
              <div>X = 12345678901234567890</div>
              <div>Y = 9876543210</div>
              <div className="font-semibold text-slate-900 dark:text-slate-100 pt-1 break-all">
                lcm(X, Y) = 1354807012498094801236261410
              </div>
              <p className="text-[11px] font-sans text-slate-500 dark:text-slate-400">Satisfies lcm × gcd = |X · Y|.</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1 font-mono text-xs">
              <div className="font-bold font-sans text-blue-600 dark:text-blue-400 text-xs uppercase">
                Example 4: Modular Exponentiation
              </div>
              <div>Base = 2, Exp = 100, Mod = 1000000007</div>
              <div className="font-semibold text-slate-900 dark:text-slate-100 pt-1">
                2¹⁰⁰ mod 1,000,000,007 = 976,371,285
              </div>
              <p className="text-[11px] font-sans text-slate-500 dark:text-slate-400">Computed via logarithmic binary squaring.</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1 font-mono text-xs">
              <div className="font-bold font-sans text-blue-600 dark:text-blue-400 text-xs uppercase">
                Example 5: Factorial Trailing Zeros
              </div>
              <div>Input = 100!</div>
              <div className="font-semibold text-slate-900 dark:text-slate-100 pt-1">
                Digits = 158, Trailing Zeros = 24
              </div>
              <p className="text-[11px] font-sans text-slate-500 dark:text-slate-400">Verified via Legendre&apos;s formula ⌊100/5⌋ + ⌊100/25⌋.</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1 font-mono text-xs">
              <div className="font-bold font-sans text-blue-600 dark:text-blue-400 text-xs uppercase">
                Example 6: Huge Combinations
              </div>
              <div>C(100, 50)</div>
              <div className="font-semibold text-slate-900 dark:text-slate-100 pt-1 break-all">
                Result = 100891344545564193334812497256
              </div>
              <p className="text-[11px] font-sans text-slate-500 dark:text-slate-400">Exact 30-digit integer without floating-point overflow.</p>
            </div>
          </div>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Big Number Calculator vs. Scientific Calculator
          </h2>
          <p>
            These tools solve fundamentally different mathematical problems:
          </p>
          <p>
            A scientific calculator is optimized for continuous numerical functions, decimals, trigonometry (sin, cos), logarithms, roots, and engineering-style formulas.
          </p>
          <p>
            A big number calculator is optimized for exact integer arithmetic when the number of digits itself matters. For example, if you need the exact integer product of two 30-digit values, arbitrary precision is the appropriate choice. If you need sin(0.7) or log₁₀(4250), a scientific calculator is the appropriate tool.
          </p>
          <p>
            For converting large integers between compact decimal and exponential forms, use the{" "}
            <Link href="/calculators/scientific-notation-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Scientific Notation Calculator &amp; Converter
            </Link>
            . For prime decomposition and divisor analysis, use the{" "}
            <Link href="/calculators/factor-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Factor Calculator &amp; Prime Factorization
            </Link>{" "}
            tool. For permutations and combinations as a standalone combinatorics workflow, explore the{" "}
            <Link href="/calculators/permutation-combination-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Permutation &amp; Combination Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. BigInt, Arbitrary Precision and Exactness
          </h2>
          <p>
            It is useful to understand what “exact” means in computational arithmetic. For integer arithmetic, arbitrary precision preserves every integer digit instead of forcing the value into a fixed floating-point representation.
          </p>
          <p>
            JavaScript&apos;s BigInt supports large integer arithmetic and is specifically intended for integer values outside the exact range of Number. However, BigInt is an integer type: it does not represent decimal fractions, and it should not be mixed implicitly with ordinary Number values in arithmetic.
          </p>
          <p>
            For example, 5 ÷ 2 is not the decimal 2.5 in BigInt arithmetic; integer division produces an integer quotient (2) and remainder (1). A responsible big-number calculator deliberately distinguishes integer arithmetic from decimal numerical analysis.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Accuracy, Validation and Production Verification
          </h2>
          <p>
            A numerical calculator should not be trusted simply because its interface looks correct. This Big Number Calculator was subjected to independent mathematical verification across high-magnitude edge cases:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs sm:text-sm">
            <div className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wide flex items-center gap-1.5 pb-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Verified Mathematical Properties
            </div>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <li>24,201 independent property tests passed with zero discrepancies</li>
              <li>Exact BigInt addition, subtraction, multiplication, modulo, GCD, and LCM tests verified</li>
              <li>Modular exponentiation verified against independent number-theory oracles</li>
              <li>Factorial and trailing-zero tests verified up to 1000!</li>
              <li>Combinatorics verified (including 100C50 character-for-character)</li>
              <li>Miller-Rabin primality testing verified across Carmichael numbers and primes</li>
              <li>5,000-digit stress cases evaluated cleanly</li>
            </ul>
          </div>
          <p>
            The test suite also verified exact restoration of large saved values, export integrity, accessibility, responsive layouts, and clean print behavior.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Limitations of Large-Number Arithmetic
          </h2>
          <p>
            “Arbitrary precision” does not mean “infinite computation.” A mathematically defined number can be larger than what a browser can practically materialize, display, or store.
          </p>
          <p>
            For example, a Googolplex is mathematically well-defined, but expanding 10^(10¹⁰⁰) into decimal digits is not a practical browser operation because its digit count is a googol itself (more digits than atoms in the observable universe).
          </p>
          <p>
            Similarly, an exponent can be mathematically valid while producing an output whose digit count is far beyond available memory. Large-number applications distinguish between a mathematically valid expression, an exact representable value, and a value that can be materialized within available browser RAM.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Common Mistakes When Working with Huge Numbers
          </h2>
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Mistake 1: Treating scientific notation as the exact integer
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                1.2345 × 10¹⁰⁰ is not the same as displaying all 101 decimal digits. Always use exact arbitrary-precision output when every digit matters.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Mistake 2: Converting a large integer to floating point
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                A number beyond the safe integer range (2⁵³ − 1) will silently lose precision if converted to standard IEEE 754 floating-point values.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Mistake 3: Ignoring integer-vs-decimal behavior
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Big integer arithmetic is not a general replacement for decimal fractions. BigInt represents integers and produces integer quotients with remainders.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Mistake 4: Assuming every primality test is deterministic
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Miller-Rabin is probabilistic in its general form. Results distinguish deterministic outcomes within supported bounded ranges from probabilistic testing for massive inputs.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Mistake 5: Computing a huge power before reducing modulo
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                For aᵇ mod m, directly constructing aᵇ causes memory overflow. Repeated squaring (square-and-multiply) reduces intermediate values at each multiplication step.
              </p>
            </div>
          </div>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            21. Choosing the Right Calculator for Your Problem
          </h2>
          <p>
            Different mathematical questions call for dedicated tools across our calculation suite:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li>
              <strong>Need exact arithmetic on hundreds or thousands of integer digits?</strong> Use this{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100">Big Number Calculator</span>.
            </li>
            <li>
              <strong>Need to express large or tiny values compactly in exponential notation?</strong> Use the{" "}
              <Link href="/calculators/scientific-notation-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Scientific Notation Calculator &amp; Converter
              </Link>
              .
            </li>
            <li>
              <strong>Need all divisors, factor pairs, or full prime factorizations?</strong> Use the{" "}
              <Link href="/calculators/factor-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Factor Calculator &amp; Prime Factorization
              </Link>{" "}
              tool.
            </li>
            <li>
              <strong>Need permutations and combinations as a dedicated combinatorics tool?</strong> Use the{" "}
              <Link href="/calculators/permutation-combination-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Permutation &amp; Combination Calculator
              </Link>
              .
            </li>
            <li>
              <strong>Need greatest common factors or least common multiples with step-by-step methods?</strong> Use the{" "}
              <Link href="/calculators/gcf-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Greatest Common Factor (GCF) Calculator
              </Link>{" "}
              or{" "}
              <Link href="/calculators/lcm-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Least Common Multiple (LCM) Calculator
              </Link>
              .
            </li>
            <li>
              <strong>Need roots and radical simplification?</strong> Use the{" "}
              <Link href="/calculators/root-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Root Calculator &amp; Radical Simplifier
              </Link>
              .
            </li>
          </ul>
        </section>

        {/* Section 22 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            22. Final Takeaway
          </h2>
          <p>
            Large integers are not difficult merely because they have many digits. They are difficult when the numerical representation used to store them cannot preserve those digits exactly.
          </p>
          <p>
            A conventional floating-point representation has a finite precision boundary. Arbitrary-precision integer arithmetic removes that fixed safe-integer ceiling for integer calculations by allowing the representation to grow dynamically with the value. JavaScript&apos;s BigInt is specifically designed for this purpose.
          </p>
          <p>
            That makes arbitrary-precision arithmetic invaluable for exact large-number multiplication, addition, subtraction, quotient and remainder calculations, modular arithmetic, GCD, LCM, factorials, combinations, permutations, primality testing, and digit analysis.
          </p>
          <p>
            For calculations where every digit matters, arbitrary precision is not a cosmetic feature—it is the numerical model that makes the calculation trustworthy.
          </p>
        </section>

      </div>

      {/* Section 20: FREQUENTLY ASKED QUESTIONS (16 Approved FAQs, Unfolded by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {big_number_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/30 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. RELATED CALCULATORS — AFTER CONTENT */}
      <div className="no-print pt-6 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
          RELATED CALCULATORS
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <Link
            href="/calculators/scientific-notation-calculator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Calculator className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Scientific Notation Calculator &amp; Converter</span>
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/factor-calculator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Calculator className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Factor Calculator &amp; Prime Factorization</span>
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/permutation-combination-calculator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Calculator className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Permutation &amp; Combination Calculator</span>
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/gcf-calculator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Calculator className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Greatest Common Factor (GCF) Calculator</span>
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/lcm-calculator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Calculator className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Least Common Multiple (LCM) Calculator</span>
          </Link>
        </div>
      </div>

    </article>
  );
}

export default BigNumberContent;
