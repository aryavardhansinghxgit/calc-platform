"use client";

import React from "react";

export function PermutationCombinationContent() {
  return (
    <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          1. Introduction to Permutations &amp; Combinations
        </h2>
        <p>
          In mathematical combinatorics, <strong>permutations</strong> and <strong>combinations</strong> quantify the total number of distinct ways to choose and arrange subsets of items from a larger collection. The fundamental distinction between these two counting principles hinges on a single question: <em>Does the order of selection matter?</em>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 text-sm">
              Permutations (Order Matters)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Used when position, sequence, or rank is significant. For example, selecting 1st, 2nd, and 3rd place in a race, or setting a 4-digit security PIN lock (1-2-3-4 is distinct from 4-3-2-1).
            </p>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 space-y-2">
            <h3 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">
              Combinations (Order Ignored)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Used when only membership matters, regardless of sequence. For example, picking a 5-card poker hand or selecting a 3-person committee (Alice, Bob, Charlie is identical to Charlie, Alice, Bob).
            </p>
          </div>
        </div>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. Underlying Mathematical Theory &amp; Fundamental Principles
        </h2>
        <p>
          Combinatoric counting relies on the <strong>Fundamental Counting Principle</strong>, which states that if one task can be performed in m ways and a second independent task can be performed in n ways, both tasks together can be performed in m &times; n ways.
        </p>
        <p>
          When selecting r items from a total set of n distinct elements without replacement, there are n options for the first item, n - 1 options for the second, down to n - r + 1 options for the r-th item. The product of these choices forms the factorial ratio known as <em>Permutations</em>.
        </p>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Complete Combinatoric Formula Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3">Scenario Type</th>
                <th className="p-3">Repetition / Replacement</th>
                <th className="p-3">Formula</th>
                <th className="p-3">Mathematical Notation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
              <tr>
                <td className="p-3 font-bold font-sans">Permutations</td>
                <td className="p-3">Without Repetition</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">n! / (n - r)!</td>
                <td className="p-3">P(n, r) or <sub>n</sub>P<sub>r</sub></td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Permutations</td>
                <td className="p-3">With Repetition</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">n^r</td>
                <td className="p-3">P<sup>r</sup>(n, r)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Combinations</td>
                <td className="p-3">Without Repetition</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">n! / [ r! (n - r)! ]</td>
                <td className="p-3">C(n, r) or <sub>n</sub>C<sub>r</sub></td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Combinations</td>
                <td className="p-3">With Repetition</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">(n + r - 1)! / [ r! (n - 1)! ]</td>
                <td className="p-3">C<sup>r</sup>(n, r)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Circular Table Seating</td>
                <td className="p-3">Rotational Equivalence</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">(n - 1)!</td>
                <td className="p-3">P<sub>circ</sub>(n)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Necklace / Key Ring</td>
                <td className="p-3">Rotation + Reflection</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">(n - 1)! / 2</td>
                <td className="p-3">P<sub>neck</sub>(n)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold font-sans">Multiset / Anagrams</td>
                <td className="p-3">Duplicate Elements</td>
                <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">n! / (n₁! &times; n₂! &times; ...)</td>
                <td className="p-3">P(n; n₁, n₂, ...)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          4. How the Step-by-Step Calculation Works
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 1: Input Validation &amp; Range Checking</h3>
            <p>Verify that n &ge; 0 and r &ge; 0. For non-repetition modes, ensure r &le; n.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 2: Factorial Expansion &amp; Cancellation</h3>
            <p>
              Expand factorials. For P(6, 2), write 6! / (6 - 2)! = (6 &times; 5 &times; 4!) / 4! = 6 &times; 5 = 30. Notice how the trailing factorial (n - r)! cancels out.
            </p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Step 3: Redundancy Division for Combinations</h3>
            <p>
              For combinations, divide the permutation result by r! to eliminate the r! distinct ways of ordering the chosen elements.
            </p>
          </div>
        </div>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          5. Comprehensive Worked Real-World Examples
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 1: Lottery Odds (Combinations Without Replacement)
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> In a 6/49 lottery, a player chooses 6 distinct numbers from 1 to 49. How many unique tickets exist?
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              C(49, 6) = 49! / [ 6! &times; (49 - 6)! ] = 49! / [ 6! &times; 43! ] = (49 &times; 48 &times; 47 &times; 46 &times; 45 &times; 44) / (6 &times; 5 &times; 4 &times; 3 &times; 2 &times; 1) = 13,983,816 combinations.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 2: Anagrams of Word "MISSISSIPPI" (Multiset Permutations)
            </h3>
            <p className="text-xs">
              <strong>Problem:</strong> How many unique letter arrangements can be formed from "MISSISSIPPI"?
            </p>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800">
              n = 11 letters (M:1, I:4, S:4, P:2).<br />
              Permutations = 11! / (1! &times; 4! &times; 4! &times; 2!) = 39,916,800 / (24 &times; 24 &times; 2) = 34,650 unique anagrams.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Visualizing Combinatoric Trees &amp; Pascal's Triangle
        </h2>
        <p>
          Binomial coefficients C(n, k) align directly with row n of <strong>Pascal's Triangle</strong>:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-mono text-xs space-y-1">
          <div>Row 0: 1</div>
          <div>Row 1: 1 &nbsp; 1</div>
          <div>Row 2: 1 &nbsp; 2 &nbsp; 1</div>
          <div>Row 3: 1 &nbsp; 3 &nbsp; 3 &nbsp; 1</div>
          <div>Row 4: 1 &nbsp; 4 &nbsp; 6 &nbsp; 4 &nbsp; 1</div>
          <div>Row 5: 1 &nbsp; 5 &nbsp; 10 &nbsp; 10 &nbsp; 5 &nbsp; 1</div>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Common Pitfalls &amp; Frequent User Errors
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li>
            <strong>Misclassifying Order Requirement:</strong> Using permutations when order does not matter (e.g. counting committee choices as P(n, r) instead of C(n, r)) leads to results that are r! times too large.
          </li>
          <li>
            <strong>Confusing 0! Value:</strong> Assuming 0! = 0 instead of 0! = 1. By definition, there is exactly 1 way to arrange zero items.
          </li>
          <li>
            <strong>Ignoring Repetitions in Anagrams:</strong> Forgetting to divide by repeated letter factorials when calculating word permutations.
          </li>
        </ul>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          8. Practical &amp; Professional Applications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Cybersecurity</h3>
            <p>Estimating password entropy and PIN brute-force search spaces (10^4 for 4-digit PINs vs 62^12 for alphanumeric passwords).</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Genetics &amp; Biology</h3>
            <p>Calculating allele combinations, Punnett square probabilities, and DNA sequence alignments.</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Game Theory &amp; Poker</h3>
            <p>Deriving odds for Texas Hold'em 5-card hands out of 2,598,960 total possibilities.</p>
          </div>
        </div>
      </section>

      {/* 9. RELATED CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          9. Related Mathematical Concepts
        </h2>
        <p className="text-xs">
          Explore related mathematical suites on our platform:
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Probability Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Statistics Calculator
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Big Number Calculator
          </span>
        </div>
      </section>

      {/* 10. SUMMARY */}
      <section className="p-5 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h2 className="text-base font-bold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          Permutations and combinations form the backbone of discrete mathematics and probability. Use <strong>Permutations</strong> (nPr) when sequence and order matter, and <strong>Combinations</strong> (nCr) when grouping items regardless of order. For circular seating, use (n - 1)!, and for multiset anagrams, divide by individual character factorials.
        </p>
      </section>
    </article>
  );
}

export default PermutationCombinationContent;
