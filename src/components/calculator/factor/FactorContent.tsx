"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, HelpCircle } from "lucide-react";

export function FactorContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8">
      
      {/* INTERNAL LINK BLOCK — ABOVE CONTENT */}
      <nav aria-label="Related Calculators" className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 not-prose">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <span className="font-bold text-slate-700 dark:text-slate-300">Related calculators:</span>
          <Link href="/calculators/gcf-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Greatest Common Factor (GCF) Calculator
          </Link>
          <span className="text-slate-400">|</span>
          <Link href="/calculators/lcm-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Least Common Multiple (LCM) Calculator
          </Link>
          <span className="text-slate-400">|</span>
          <Link href="/calculators/fraction-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Fraction Calculator
          </Link>
        </div>
      </nav>

      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 divide-y divide-slate-100 dark:divide-slate-800">
        
        {/* SECTION 1 */}
        <section className="space-y-3 pt-6 first:pt-0">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Factor Calculator: Find Every Factor and Understand the Number
          </h2>
          <p>
            A factor calculator finds the positive integers that divide a given number exactly, with no remainder. For a number <em>n</em>, a positive integer <em>d</em> is a factor of <em>n</em> when <em>n ÷ d</em> is an integer, or equivalently when <em>n mod d = 0</em>.
          </p>
          <p>
            For example, the factors of 120 are:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center font-bold text-slate-900 dark:text-slate-100">
            1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60, 120
          </div>
          <p>
            So 120 has 16 positive factors.
          </p>
          <p>
            But finding the factors is only part of the number-theory picture. The same factorization can be used to determine the prime factorization, number of divisors, sum of divisors, sum of proper divisors, factor pairs, and whether the number is prime, composite, perfect, abundant, deficient, or square-free.
          </p>
          <p>
            This calculator brings those related results together instead of forcing you to perform each calculation separately. It also includes a common-factor finder and a quadratic trinomial factoring tool for algebraic expressions.
          </p>
          <p>
            A useful principle is that factors come in pairs:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center font-bold text-blue-700 dark:text-blue-300">
            a × b = n
          </div>
          <p>
            Whenever <em>a</em> divides <em>n</em>, the corresponding value <em>b = n / a</em> is also a factor. That is why factor pairs provide an efficient way to search for every divisor.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. What Is a Factor?
          </h2>
          <p>
            A factor is an integer that divides another integer exactly.
          </p>
          <p>
            For example:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center font-bold">
            3 × 40 = 120
          </div>
          <p>
            Therefore, both 3 and 40 are factors of 120. Similarly, 8 × 15 = 120, so 8 and 15 are also factors.
          </p>
          <p>
            For positive integers, the smallest positive factor is always 1 and the largest positive factor is the number itself:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center font-bold text-blue-600 dark:text-blue-400">
            1 | n &nbsp; and &nbsp; n | n
          </div>
          <p>
            A number can therefore be described through its factors rather than only through its decimal representation.
          </p>
          
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            Factors vs. Multiples
          </h3>
          <p>
            These terms are often confused. A factor divides a number (for example, 4 | 20). A multiple is produced by multiplying a number by an integer: 20, 40, 60, 80... are multiples of 20.
          </p>
          <p>
            Factors generally form a finite set for a positive integer, while a positive integer has infinitely many positive multiples.
          </p>
        </section>

        {/* SECTION 3 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How to Find All Factors of a Number
          </h2>
          <p>
            The simplest method is trial division: test integers and retain the ones that divide the target exactly.
          </p>
          <p>
            For a number <em>n</em>, it is unnecessary to test every integer through <em>n</em>. Factors occur in pairs around √n, so checking candidates through ⌊√n⌋ is enough to discover the complete positive factor set.
          </p>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Example: Factors of 36
          </h3>
          <p>
            Since √36 = 6, we test integers 1 through 6:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm space-y-1 text-center">
            <div>1 × 36 = 36</div>
            <div>2 × 18 = 36</div>
            <div>3 × 12 = 36</div>
            <div>4 × 9 = 36</div>
            <div>5 does not divide 36</div>
            <div>6 × 6 = 36</div>
          </div>
          <p>
            Therefore, the complete positive factors of 36 are: <strong>1, 2, 3, 4, 6, 9, 12, 18, 36</strong>.
          </p>
          <p>
            The factor pair 6 × 6 is special because the two members of the pair are identical. This is why a perfect square always has an odd number of positive divisors. The calculator automatically performs this process and presents the factors in ascending order.
          </p>
        </section>

        {/* SECTION 4 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Factor Pairs and Why They Matter
          </h2>
          <p>
            A factor pair consists of two integers whose product equals the target number.
          </p>
          <p>
            For 120, the positive factor pairs are:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <th className="p-2.5 font-bold">Factor</th>
                  <th className="p-2.5 font-bold">Partner</th>
                  <th className="p-2.5 font-bold">Product Check</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                <tr><td className="p-2">1</td><td className="p-2">120</td><td className="p-2 text-slate-500">1 × 120 = 120</td></tr>
                <tr><td className="p-2">2</td><td className="p-2">60</td><td className="p-2 text-slate-500">2 × 60 = 120</td></tr>
                <tr><td className="p-2">3</td><td className="p-2">40</td><td className="p-2 text-slate-500">3 × 40 = 120</td></tr>
                <tr><td className="p-2">4</td><td className="p-2">30</td><td className="p-2 text-slate-500">4 × 30 = 120</td></tr>
                <tr><td className="p-2">5</td><td className="p-2">24</td><td className="p-2 text-slate-500">5 × 24 = 120</td></tr>
                <tr><td className="p-2">6</td><td className="p-2">20</td><td className="p-2 text-slate-500">6 × 20 = 120</td></tr>
                <tr><td className="p-2">8</td><td className="p-2">15</td><td className="p-2 text-slate-500">8 × 15 = 120</td></tr>
                <tr><td className="p-2">10</td><td className="p-2">12</td><td className="p-2 text-slate-500">10 × 12 = 120</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The calculator also exposes the corresponding negative factor pairs:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm">
            (-a) × (-b) = 120, for example: (-6) × (-20) = 120
          </div>
          <p>
            The magnitude of the positive divisors remains unchanged. Factor pairs are useful because they give an immediate verification mechanism. If every small divisor has its corresponding partner, you can systematically account for the complete factor set.
          </p>
        </section>

        {/* SECTION 5 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Prime Factorization: Breaking a Number Into Its Building Blocks
          </h2>
          <p>
            A prime factorization expresses a positive integer as a product of prime numbers. For 120:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center font-bold text-base text-blue-700 dark:text-blue-300">
            120 = 2 × 2 × 2 × 3 × 5 = 2³ × 3 × 5
          </div>
          <p>
            Prime factorization is useful because prime numbers are the basic multiplicative building blocks of positive integers. Once the prime powers are known, many other properties of the number can be calculated directly.
          </p>
          <p>
            Example: for 60, 60 = 2 × 2 × 3 × 5, so <strong>60 = 2² × 3 × 5</strong>.
          </p>
          <p>
            The exponents also reveal information about the divisor structure of the number. For <em>n = 120</em>, 120 = 2³ × 3¹ × 5¹, so its exponent pattern is (3, 1, 1). That pattern is enough to determine the number of positive divisors.
          </p>
        </section>

        {/* SECTION 6 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Number of Factors: The Divisor-Count Formula
          </h2>
          <p>
            Suppose a positive integer has prime factorization <em>n = p₁<sup>a₁</sup> · p₂<sup>a₂</sup> ··· p<sub>k</sub><sup>a<sub>k</sub></sup></em>. Then the number of positive divisors is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center font-bold text-blue-700 dark:text-blue-300">
            d(n) = (a₁ + 1)(a₂ + 1) ··· (a<sub>k</sub> + 1)
          </div>
          <p>
            This works because a divisor can independently choose an exponent from 0 through <em>a<sub>i</sub></em> for every prime <em>p<sub>i</sub></em>.
          </p>
          <p>
            <strong>Example for 120:</strong> We have 120 = 2³ × 3¹ × 5¹. Therefore:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center">
            d(120) = (3 + 1)(1 + 1)(1 + 1) = 4 × 2 × 2 = 16
          </div>
          <p>
            So 120 has exactly 16 positive divisors. Instead of manually counting every divisor, the exponent structure gives the answer immediately. The divisor-function identity is standard number theory; <em>d(n)</em>, also written <em>τ(n)</em>, counts the positive divisors of <em>n</em>.
          </p>
        </section>

        {/* SECTION 7 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Sum of Divisors and Proper Divisors
          </h2>
          <p>
            The calculator also evaluates the sum of all positive divisors. This function is commonly written as <em>σ(n)</em>. If <em>n = p₁<sup>a₁</sup> ··· p<sub>k</sub><sup>a<sub>k</sub></sup></em>, then:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center font-bold text-blue-700 dark:text-blue-300">
            σ(n) = ∏ [(p<sub>i</sub><sup>a<sub>i</sub> + 1</sup> - 1) / (p<sub>i</sub> - 1)]
          </div>
          <p>
            For 120 (where 120 = 2³ × 3 × 5):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center space-y-1">
            <div>σ(120) = (1 + 2 + 4 + 8)(1 + 3)(1 + 5)</div>
            <div>σ(120) = 15 × 4 × 6 = <strong>360</strong></div>
          </div>
          <p>
            The aliquot sum, or sum of the proper divisors, excludes the number itself:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center font-bold text-blue-600 dark:text-blue-400">
            s(n) = σ(n) - n
          </div>
          <p>
            Therefore, for 120: <strong>s(120) = 360 - 120 = 240</strong>. The divisor-sum and restricted-divisor functions are standard arithmetic functions in number theory.
          </p>
        </section>

        {/* SECTION 8 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Prime, Composite, Perfect, Abundant, and Deficient Numbers
          </h2>
          <p>
            Knowing the factors of a number lets you classify it systematically:
          </p>
          
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Prime Number
          </h3>
          <p>
            A prime number greater than 1 has exactly two positive divisors: 1 and <em>p</em>. For example, 997 has only 1 and 997 as positive divisors, so 997 is prime.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Composite Number
          </h3>
          <p>
            A composite number greater than 1 has more than two positive divisors. For example, 120 has 16 positive divisors, so it is composite.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            The Special Case of 1
          </h3>
          <p>
            The number 1 has exactly one positive divisor, itself. Therefore, 1 is neither prime nor composite.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Perfect Number
          </h3>
          <p>
            A positive integer is perfect when the sum of its proper divisors equals the number itself. For 6: 1 + 2 + 3 = 6, so 6 is a perfect number.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Abundant Number
          </h3>
          <p>
            A number is abundant when the sum of its proper divisors is greater than the number. For 12: 1 + 2 + 3 + 4 + 6 = 16, and 16 &gt; 12, so 12 is abundant.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Deficient Number
          </h3>
          <p>
            A number is deficient when the sum of its proper divisors is less than the number. For 8: 1 + 2 + 4 = 7, and 7 &lt; 8, so 8 is deficient.
          </p>
        </section>

        {/* SECTION 9 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Square-Free Numbers and Prime Exponents
          </h2>
          <p>
            A number is square-free when no prime square divides it. Equivalently, in its prime factorization, every prime exponent is at most 1.
          </p>
          <p>
            For example:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center">
            30 = 2 × 3 × 5 (Square-Free: Yes)
          </div>
          <p>
            By contrast, 120 = 2³ × 3 × 5 contains repeated powers of 2 (specifically 2² = 4 divides 120), so 120 is not square-free. This property becomes particularly easy to see after prime factorization because the exponents expose repeated prime powers directly.
          </p>
        </section>

        {/* SECTION 10 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Finding Common Factors of Several Numbers
          </h2>
          <p>
            Sometimes the goal is not to factor one number but to determine the factors shared by several numbers. For example, 24, 36, and 60 have the common factors:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center font-bold text-blue-700 dark:text-blue-300">
            Common Factors: 1, 2, 3, 4, 6, 12 &nbsp;|&nbsp; GCF = 12
          </div>
          <p>
            The distinction matters:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Common factors:</strong> the complete set of factors shared by the numbers.</li>
            <li><strong>Greatest Common Factor (GCF):</strong> the largest factor shared by all of them. To compute this directly for any number of inputs with Euclidean steps, explore our dedicated <Link href="/calculators/gcf-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">Greatest Common Factor (GCF) Calculator</Link>.</li>
          </ul>
          <p>
            Prime factorization gives another way to understand the GCF. Shared primes are taken with the smallest exponent appearing across all numbers. For 36, 54, and 90:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm space-y-1 text-center">
            <div>36 = 2² × 3²</div>
            <div>54 = 2 × 3³</div>
            <div>90 = 2 × 3² × 5</div>
            <div className="font-bold text-blue-600 dark:text-blue-400 pt-1">GCF(36, 54, 90) = 2¹ × 3² = 18</div>
          </div>
        </section>

        {/* SECTION 11 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Factor Trees: A Visual Way to Prime-Factor a Number
          </h2>
          <p>
            A factor tree repeatedly splits a composite number into smaller factors until every terminal value is prime. For 120, one possible decomposition is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-center space-y-1">
            <div>120 = 12 × 10</div>
            <div>12 = 3 × 4 &nbsp;and&nbsp; 4 = 2 × 2</div>
            <div>10 = 2 × 5</div>
            <div className="font-bold text-blue-600 dark:text-blue-400 pt-1">Prime leaves: 2, 2, 2, 3, 5 → 120 = 2³ × 3 × 5</div>
          </div>
          <p>
            Different factor trees can have different intermediate branches, but when the process is completed, the prime factorization is the same apart from ordering. This is a practical demonstration of the Fundamental Theorem of Arithmetic. The interactive factor-tree visualization in this tool allows you to inspect each level dynamically.
          </p>
        </section>

        {/* SECTION 12 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Divisibility Rules as a Quick Factor Check
          </h2>
          <p>
            Divisibility rules can quickly identify common factors before doing complete factorization:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Divisible by 2:</strong> The last digit is even (0, 2, 4, 6, 8).</li>
            <li><strong>Divisible by 3:</strong> The sum of the digits is divisible by 3. For 120: 1 + 2 + 0 = 3, which is divisible by 3.</li>
            <li><strong>Divisible by 5:</strong> The last digit is 0 or 5.</li>
            <li><strong>Divisible by 10:</strong> The last digit is 0.</li>
          </ul>
          <p>
            These quick checks are useful for mental arithmetic, while complete factorization provides the full mathematical structure. The calculator&apos;s Divisibility Rules tab checks all standard tests automatically with step-by-step reasoning.
          </p>
        </section>

        {/* SECTION 13 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. How Prime Factorization Connects to the Number of Factors
          </h2>
          <p>
            There is a deeper combinatorial connection between prime exponents and divisors. Suppose <em>n = 2<sup>a</sup> · 3<sup>b</sup></em>. A divisor of <em>n</em> can contain 2 raised to any power from 0 through <em>a</em> (which is <em>a + 1</em> choices) and 3 raised to any power from 0 through <em>b</em> (which is <em>b + 1</em> choices). The total number of positive divisors is therefore:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center font-bold text-blue-600 dark:text-blue-400">
            d(n) = (a + 1)(b + 1)
          </div>
          <p>
            For example, 72 = 2³ × 3², so <em>d(72) = (3 + 1)(2 + 1) = 4 × 3 = 12</em> positive divisors.
          </p>
          <p>
            This also explains why a positive integer has an odd number of divisors exactly when it is a perfect square: all non-square divisors occur in distinct pairs <em>d</em> and <em>n / d</em>, whereas a square has one unpaired divisor at √n.
          </p>
        </section>

        {/* SECTION 14 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Factoring Quadratic Trinomials
          </h2>
          <p>
            Factorization is not limited to integers; algebraic polynomials can also be factored. A quadratic trinomial has the general form <em>ax² + bx + c</em>. When the expression factors over the integers or rationals, the goal is to rewrite it as a product of simpler binomials.
          </p>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Example: x² - 5x + 6
          </h3>
          <p>
            We need two numbers whose product is 6 and whose sum is -5: (-2) × (-3) = 6 and (-2) + (-3) = -5. Therefore:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center font-bold text-blue-700 dark:text-blue-300">
            x² - 5x + 6 = (x - 2)(x - 3)
          </div>
          <p>
            To verify the factorization, multiply the binomials back together: (x - 2)(x - 3) = x² - 3x - 2x + 6 = x² - 5x + 6. The original expression is recovered exactly.
          </p>
        </section>

        {/* SECTION 15 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. What Happens When the Leading Coefficient Is Zero?
          </h2>
          <p>
            A true quadratic equation requires a nonzero <em>x²</em> coefficient. If <em>a = 0</em>, then <em>ax² + bx + c</em> becomes <em>bx + c</em>, which is a linear expression, not a quadratic.
          </p>
          <p>
            For example, 0x² + 5x + 6 = 0 reduces to 5x + 6 = 0, giving the single linear root:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center font-bold">
            x = -6 / 5 = -1.2
          </div>
          <p>
            Treating that expression as an ordinary quadratic would introduce division by zero (2a = 0) into the quadratic formula. The calculator explicitly handles this case instead of returning meaningless values such as NaN or Infinity.
          </p>
        </section>

        {/* SECTION 16 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Worked Example: Complete Analysis of 120
          </h2>
          <p>
            Let&apos;s combine all the mathematical concepts for the primary reference integer, 120:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs sm:text-sm font-mono">
            <div><strong>Step 1 (Factor Pairs):</strong> (1, 120), (2, 60), (3, 40), (4, 30), (5, 24), (6, 20), (8, 15), (10, 12)</div>
            <div><strong>Step 2 (Prime Factorization):</strong> 120 = 2³ × 3 × 5</div>
            <div><strong>Step 3 (Number of Divisors):</strong> d(120) = (3 + 1)(1 + 1)(1 + 1) = 16</div>
            <div><strong>Step 4 (Sum of Divisors):</strong> σ(120) = (1 + 2 + 4 + 8)(1 + 3)(1 + 5) = 15 × 4 × 6 = 360</div>
            <div><strong>Step 5 (Aliquot Sum):</strong> s(120) = 360 - 120 = 240</div>
            <div><strong>Classification:</strong> Since 240 &gt; 120, 120 is <strong>Abundant</strong>. Since 2³ has exponent 3 &gt; 1, 120 is <strong>not square-free</strong>.</div>
          </div>
        </section>

        {/* SECTION 17 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. How to Use the Factor Calculator
          </h2>
          <p>
            Enter a positive integer into the main factor input. The calculator immediately returns the relevant factor information, including the complete positive factor list, factor pairs, canonical prime factorization, divisor statistics, and number classification.
          </p>
          <p>
            You can also switch tabs to inspect the interactive binary factor tree or step-by-step divisibility rules. Use the multi-number module when you need shared common factors and GCF, or the quadratic trinomial module when factoring second-degree polynomials. Export tools allow you to copy summaries, copy LaTeX formulas, or download complete CSV records with one click.
          </p>
        </section>

        {/* SECTION 18 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Why Use a Factor Calculator Instead of Factoring by Hand?
          </h2>
          <p>
            Manual factorization is valuable for learning, but it becomes tedious when a number has many divisors or when several related quantities must be calculated. Analyzing 120 by hand requires finding 16 divisors, 8 positive factor pairs, the prime factorization, divisor count, divisor sum, aliquot sum, and number classification.
          </p>
          <p>
            A calculator reduces repetitive arithmetic while preserving mathematical structure. It serves students checking homework, teachers designing problems, tutors demonstrating exponent properties, programmers validating number-theory algorithms, and engineers analyzing periodicities.
          </p>
        </section>

        {/* SECTION 19 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Common Mistakes When Finding Factors
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Mistake 1 (Forgetting 1):</strong> 1 divides every positive integer, so 1 is always a positive factor.</li>
            <li><strong>Mistake 2 (Forgetting the number itself):</strong> Every positive integer divides itself, so <em>n</em> is always a positive factor of <em>n</em>.</li>
            <li><strong>Mistake 3 (Counting a square-root factor twice):</strong> For a perfect square like 36 (6 × 6 = 36), 6 should appear only once in the sorted factor list.</li>
            <li><strong>Mistake 4 (Confusing prime factorization with the full factor list):</strong> For 60 = 2² × 3 × 5, the right side is the prime decomposition, not the list of all 12 divisors.</li>
            <li><strong>Mistake 5 (Assuming every integer has two or more factors):</strong> The number 1 is a unit with exactly one positive divisor.</li>
            <li><strong>Mistake 6 (Treating 0 like an ordinary factoring target):</strong> Zero has infinitely many divisors because every nonzero integer divides 0. The calculator explicitly rejects 0 with a guidance banner.</li>
          </ul>
        </section>

        {/* SECTION 20 */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Factors, GCF, and LCM: How the Ideas Fit Together
          </h2>
          <p>
            Factorization becomes especially useful when comparing numbers. The GCF is found from prime factors common to all numbers (using the smallest exponent), while the LCM uses every prime needed (using the largest exponent).
          </p>
          <p>
            For any two positive integers <em>a</em> and <em>b</em>, their product equals the product of their greatest common factor and least common multiple:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center font-bold text-blue-700 dark:text-blue-300">
            GCF(a, b) × LCM(a, b) = a × b
          </div>
          <p>
            For example, for 48 and 60: 48 = 2⁴ × 3 and 60 = 2² × 3 × 5. We find GCF(48, 60) = 2² × 3 = 12 and LCM(48, 60) = 2⁴ × 3 × 5 = 240. Checking the identity: 12 × 240 = 2,880 and 48 × 60 = 2,880. For multi-number multiples and steps, explore our <Link href="/calculators/lcm-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">Least Common Multiple (LCM) Calculator</Link>.
          </p>
        </section>

        {/* FAQ SECTION (ALL 20 FAQS UNFOLDED) */}
        <section className="space-y-6 pt-8 not-prose">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">What is a factor calculator?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A factor calculator finds the positive integers that divide a given positive integer exactly. It also displays factor pairs, prime factorization, divisor count, divisor sums, and number classifications.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">How do I find all the factors of a number?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Test candidate divisors and keep the values that divide the number with no remainder. An efficient approach checks candidates only through √n, because each divisor below the square root has a matching partner above it.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">What are the factors of 120?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The 16 positive factors of 120 are: 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60, and 120.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">What is the prime factorization of 120?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The canonical prime factorization is 120 = 2³ × 3 × 5. This expresses 120 as the product of three 2s, one 3, and one 5.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">How many factors does 120 have?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                120 has 16 positive factors. From its prime factorization 120 = 2³ × 3¹ × 5¹, the divisor-count formula gives (3 + 1)(1 + 1)(1 + 1) = 4 × 2 × 2 = 16.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Is 1 a prime number?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                No. The number 1 has exactly one positive factor (itself), while a prime number is defined as having exactly two distinct positive factors: 1 and itself.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">What is the difference between factors and multiples?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Factors divide a number exactly (e.g., 3 is a factor of 12). Multiples are produced by multiplying a number by integers (e.g., 12, 24, 36, and 48 are multiples of 12).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">What is a factor pair?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A factor pair consists of two numbers whose product equals the target number. For 24, factor pairs include 1 × 24, 2 × 12, 3 × 8, and 4 × 6.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Why does a perfect square have an odd number of factors?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Most factors occur in distinct pairs d and n / d. For a perfect square, √n pairs with itself, so one divisor is unpaired, making the total divisor count odd.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">What is the difference between a factor and a prime factor?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A factor can be any divisor of a number. A prime factor is specifically a factor that is a prime number. For 60, factors include 4, 6, and 10, but its prime factors are only 2, 3, and 5.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">What is the divisor-count formula?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                If n = p₁<sup>a₁</sup> · p₂<sup>a₂</sup> ··· p<sub>k</sub><sup>a<sub>k</sub></sup>, then d(n) = (a₁ + 1)(a₂ + 1) ··· (a<sub>k</sub> + 1). It gives the exact number of positive divisors.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">What is the sum-of-divisors formula?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                For the same prime factorization, σ(n) = ∏ [(p<sub>i</sub><sup>a<sub>i</sub> + 1</sup> - 1) / (p<sub>i</sub> - 1)]. It evaluates the sum of all positive divisors.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">What is an aliquot sum?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The aliquot sum is the sum of the proper divisors (all positive divisors excluding the number itself): s(n) = σ(n) - n. For 120, s(120) = 360 - 120 = 240.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">What makes a number perfect?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A positive integer is perfect when its proper divisors add up exactly to the number itself. The smallest example is 6 (1 + 2 + 3 = 6).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">What makes a number abundant?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A number is abundant when the sum of its proper divisors is greater than the number. For 12, 1 + 2 + 3 + 4 + 6 = 16 &gt; 12.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">What makes a number deficient?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A number is deficient when the sum of its proper divisors is less than the number. For 8, 1 + 2 + 4 = 7 &lt; 8.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">What is a square-free number?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A square-free number has no repeated prime factor in its canonical prime factorization. For example, 30 = 2 × 3 × 5 is square-free, while 36 = 2² × 3² is not.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Can the calculator find common factors of multiple numbers?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes. Enter two or more integers in the Multi-Number Inputs module to obtain the shared factor intersection and the greatest common factor.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">What is the difference between common factors and the GCF?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Common factors are every divisor shared by all input numbers. The GCF is the single largest number in that shared set. For 24, 36, and 60, common factors are 1, 2, 3, 4, 6, 12, and the GCF is 12.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Can this calculator factor quadratic expressions?</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes. The quadratic module accepts coefficients a, b, and c for ax² + bx + c and returns factored binomial forms and roots. If a = 0, it detects the linear equation bx + c = 0 without division by zero.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL SEO CONTENT SECTION */}
        <section className="space-y-3 pt-6">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            More Than a Simple Factor Finder
          </h2>
          <p>
            Factoring is one of the foundations of elementary and intermediate number theory. Once a number is expressed through its divisors and prime factors, many apparently different calculations become connected:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm text-center font-bold text-blue-700 dark:text-blue-300">
            Factors → Factor Pairs → Divisor Count → Divisor Sum → Classification
          </div>
          <p>
            It also provides the foundation for finding common factors, greatest common factors, least common multiples, simplifying fractions with our <Link href="/calculators/fraction-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">Fraction Calculator</Link>, and understanding algebraic expressions.
          </p>
          <p>
            For quadratic expressions, the same general idea applies: replace a complicated expression with a product of simpler factors, then verify the result by multiplication. The goal of this calculator is to make the mathematical structure behind factorization visible so that every answer can be checked, explained, and reused with confidence.
          </p>
        </section>

      </div>

      {/* INTERNAL LINK BLOCK — AFTER CONTENT */}
      <nav aria-label="Related Calculators" className="pt-6 border-t border-slate-200 dark:border-slate-700 not-prose">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <span className="font-bold text-slate-700 dark:text-slate-300">Related calculators:</span>
          <Link href="/calculators/gcf-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Greatest Common Factor (GCF) Calculator
          </Link>
          <span className="text-slate-400">|</span>
          <Link href="/calculators/lcm-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Least Common Multiple (LCM) Calculator
          </Link>
          <span className="text-slate-400">|</span>
          <Link href="/calculators/fraction-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Fraction Calculator
          </Link>
        </div>
      </nav>

    </article>
  );
}

export default FactorContent;
