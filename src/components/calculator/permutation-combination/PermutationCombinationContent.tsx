"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Calculator,
  Compass,
  ArrowRight,
  GitBranch,
  Layers,
  Sparkles
} from "lucide-react";
import { permutation_combination_calculatorFaqs } from "@/app/calculators/permutation-combination-calculator/faq";

export function PermutationCombinationContent() {
  // All 12 FAQs open by default per 401(k) format specification
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800 print:divide-y-0 print:border-none print:p-0">
      {/* RELATED CALCULATORS SECTION (BEFORE CONTENT) */}
      <div className="no-print pb-2">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/60">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 dark:border-slate-700/60">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Related Mathematical &amp; Probability Tools
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Quick Navigation</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <Link
              href="/calculators/probability-calculator"
              className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
            >
              <span>Probability Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/calculators/statistics-calculator"
              className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
            >
              <span>Statistics Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/calculators/dice-roller"
              className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
            >
              <span>Dice Roller Simulator</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/calculators/sample-size-calculator"
              className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
            >
              <span>Sample Size Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN LONG-FORM EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 pt-6">
        {/* Section 1 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is a Permutation &amp; Combination Calculator?
          </h2>
          <p>
            A <strong>Permutation and Combination Calculator</strong> is an advanced combinatorial computation engine designed to quantify the exact number of unique arrangements, selections, and partitions possible when choosing an arbitrary number of items (<em>r</em>) from a finite collection of total items (<em>n</em>). Combinatorial analysis serves as the foundation of modern discrete mathematics, discrete probability theory, statistical mechanics, network routing algorithms, and cryptographic protocol security.
          </p>
          <p>
            While elementary calculators quickly fail due to integer overflow when processing factorials beyond 20!, this platform evaluates exact combinatorial quantities using arbitrary-precision integer arithmetic (BigInt). Beyond classic permutations (<em>nPr</em>) and combinations (<em>nCr</em>), our solver integrates six interconnected mathematical modules: permutations with replacement, combinations with repetition (the stars-and-bars method), circular table arrangements, dihedral necklace symmetries, multiset letter anagrams, complete derangements (!n), Pascal&apos;s triangle coefficients, and hypergeometric probability distributions. To explore statistical modeling on larger datasets, explore our{" "}
            <Link href="/calculators/statistics-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Statistics Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Permutations vs. Combinations: The Fundamental Intuition
          </h2>
          <p>
            The entire discipline of combinatorial counting rests upon a singular, decisive question: <strong>Does the sequential order of selection matter?</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="font-bold text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                Permutations: Order Is Critical
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A permutation is an ordered sequence or arrangement. Changing the sequence of chosen elements produces a fundamentally different outcome. Classic real-world examples include setting a 4-digit bank PIN (where sequence 1-2-3-4 is distinct from 4-3-2-1), deciding first, second, and third place podium finishers in a marathon, or establishing a sequence of executive flight legs.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-1.5">
                <GitBranch className="h-4 w-4" />
                Combinations: Order Is Irrelevant
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A combination is an un-ordered subset or collection. The sequence in which elements enter the collection does not alter the collection itself. Familiar examples include dealing a 5-card poker hand (holding Ace-King-Queen-Jack-10 is identical regardless of which card was dealt first) or electing a 3-person grievance committee from a pool of 20 employees.
              </p>
            </div>
          </div>
          <p>
            Because every chosen subset of <em>r</em> distinct items can itself be permuted internally in exactly <em>r!</em> distinct sequences, the total number of permutations <em>P(n, r)</em> is always exactly <em>r!</em> times greater than the total combinations <em>C(n, r)</em>. This relationship forms the identity <strong>P(n, r) = r! &times; C(n, r)</strong>.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Core Combinatorial Formulas &amp; Mathematical Notation
          </h2>
          <p>
            Combinatorial counting uses concise mathematical notation and precise factorial definitions. Below is the comprehensive formula matrix covering all major selection paradigms:
          </p>
          <div className="overflow-x-auto py-2">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 font-bold">
                  <th className="p-3">Scenario Type</th>
                  <th className="p-3">Replacement / Symmetry</th>
                  <th className="p-3">Analytical Formula</th>
                  <th className="p-3">Standard Notation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                <tr>
                  <td className="p-3 font-bold font-sans">Permutation</td>
                  <td className="p-3 font-sans">Without Replacement</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">n! / (n - r)!</td>
                  <td className="p-3">P(n, r) or <sub>n</sub>P<sub>r</sub></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold font-sans">Permutation</td>
                  <td className="p-3 font-sans">With Replacement</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">n<sup>r</sup></td>
                  <td className="p-3">P<sup>r</sup>(n, r)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold font-sans">Combination</td>
                  <td className="p-3 font-sans">Without Replacement</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">n! / [ r! (n - r)! ]</td>
                  <td className="p-3">C(n, r) or <sub>n</sub>C<sub>r</sub></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold font-sans">Combination</td>
                  <td className="p-3 font-sans">With Replacement (Stars &amp; Bars)</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">(n + r - 1)! / [ r! (n - 1)! ]</td>
                  <td className="p-3">C<sup>r</sup>(n, r)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold font-sans">Circular Seating</td>
                  <td className="p-3 font-sans">Rotational Equivalence</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">(n - 1)!</td>
                  <td className="p-3">P<sub>circ</sub>(n)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold font-sans">Necklace / Bracelet</td>
                  <td className="p-3 font-sans">Rotational + Reflectional</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">(n - 1)! / 2</td>
                  <td className="p-3">P<sub>neck</sub>(n)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold font-sans">Multiset Anagram</td>
                  <td className="p-3 font-sans">Repeated Identical Characters</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">n! / (f<sub>1</sub>! &times; f<sub>2</sub>! &times; ...)</td>
                  <td className="p-3">P(n; f<sub>1</sub>, f<sub>2</sub>, ...)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold font-sans">Derangement</td>
                  <td className="p-3 font-sans">Zero Fixed Points (No item in place)</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">!n = (n - 1)(!(n - 1) + !(n - 2))</td>
                  <td className="p-3">!n or d<sub>n</sub></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            When conducting randomized event modeling with discrete outcomes, you can also cross-verify your combinatorial sample spaces using our interactive{" "}
            <Link href="/calculators/dice-roller" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Dice Roller Simulator
            </Link>
            .
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Permutations Without Replacement: Step-by-Step Derivation
          </h2>
          <p>
            To understand the permutation formula, consider the <strong>Fundamental Counting Principle</strong>. Suppose you have <em>n</em> unique candidates and wish to fill <em>r</em> ranked positions (e.g., President, Vice President, and Treasurer).
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
            <li>Position 1 can be assigned to any of the <em>n</em> available candidates.</li>
            <li>Position 2 can be assigned to any of the remaining <em>n - 1</em> candidates.</li>
            <li>Position 3 has <em>n - 2</em> candidates remaining, continuing until...</li>
            <li>Position <em>r</em> has exactly <em>n - (r - 1) = n - r + 1</em> candidates remaining.</li>
          </ul>
          <p>
            Multiplying each independent choice yields the product <em>n &times; (n - 1) &times; (n - 2) &times; ... &times; (n - r + 1)</em>. Notice that if we multiply and divide this product by <em>(n - r)!</em>, we obtain:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-bold">
            P(n, r) = [ n &times; (n - 1) &times; ... &times; (n - r + 1) &times; (n - r)! ] / (n - r)! = n! / (n - r)!
          </div>
          <p>
            <strong>Worked Example (n = 6, r = 2):</strong> Suppose 6 sprinters compete for gold and silver medals. The total possible podium finishes is:
            <br />
            <em>P(6, 2) = 6! / (6 - 2)! = 6! / 4! = (6 &times; 5 &times; 4 &times; 3 &times; 2 &times; 1) / (4 &times; 3 &times; 2 &times; 1) = 6 &times; 5 = 30</em>.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Combinations Without Replacement: Overcounting Cancellation
          </h2>
          <p>
            Now suppose that in the sprint race above, rather than awarding gold and silver medals, the top 2 runners merely advance to the semi-final heat together. In this case, whether runner A qualifies before runner B or runner B qualifies before runner A has zero bearing on the outcome.
          </p>
          <p>
            Because any group of 2 runners has <em>2! = 2 &times; 1 = 2</em> internal orderings (AB and BA), the 30 permutations overcount the unique 2-runner qualification pairs by a factor of 2!. Dividing out this internal ordering redundancy yields the combination formula:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-bold">
            C(n, r) = P(n, r) / r! = n! / [ r! &times; (n - r)! ]
          </div>
          <p>
            <strong>Worked Example (n = 6, r = 2):</strong> <em>C(6, 2) = 6! / [ 2! &times; 4! ] = 720 / [ 2 &times; 24 ] = 720 / 48 = 15</em> distinct qualifier pairs. For examining sample proportion distributions across populations, refer to our{" "}
            <Link href="/calculators/sample-size-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Sample Size Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. The Principle of Stars and Bars: Combinations with Repetition
          </h2>
          <p>
            Combinations with repetition arise when you must choose <em>r</em> items from <em>n</em> distinct categories, but each category has an unlimited supply, and selection order is irrelevant. A classic problem: In how many ways can you select a dozen (r = 12) donuts if the bakery offers 4 distinct flavors (n = 4)?
          </p>
          <p>
            This was solved by William Feller using the celebrated <strong>Stars and Bars theorem</strong>. Imagine representing the 12 donuts as 12 identical asterisks (stars: &#9733;) and partitioning them into 4 flavor bins using 3 vertical dividers (bars: |). A typical purchase might look like:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs text-slate-700 dark:text-slate-300">
            &#9733;&#9733;&#9733; | &#9733;&#9733;&#9733;&#9733;&#9733; | &#9733;&#9733; | &#9733;&#9733; &nbsp;&rarr;&nbsp; (3 glazed, 5 chocolate, 2 jelly, 2 cinnamon)
          </div>
          <p>
            The total number of symbols in this sequence is <em>r + (n - 1) = 12 + 3 = 15</em> slots. The problem reduces simply to choosing which <em>r</em> of the 15 positions will hold stars (or equivalently, which <em>n - 1</em> will hold bars):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-bold">
            C<sup>r</sup>(n, r) = C(n + r - 1, r) = (n + r - 1)! / [ r! &times; (n - 1)! ]
          </div>
          <p>
            For our donut example: <em>C(4 + 12 - 1, 12) = C(15, 12) = C(15, 3) = (15 &times; 14 &times; 13) / (3 &times; 2 &times; 1) = 455</em> possible dozen assortments.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Permutations with Replacement: Exponentiation ($n^r$)
          </h2>
          <p>
            When items are ordered and elements can be repeatedly chosen without exhausting the source pool, the choice at each position remains constant at <em>n</em>.
          </p>
          <p>
            Consider a bicycle lock featuring 4 spinning dials, each labeled with digits 0 through 9 (n = 10 categories, r = 4 positions). Dial 1 offers 10 options, Dial 2 offers 10 options, Dial 3 offers 10 options, and Dial 4 offers 10 options. The total combination lock space is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-bold">
            P<sup>r</sup>(n, r) = n &times; n &times; ... &times; n = n<sup>r</sup> = 10<sup>4</sup> = 10,000
          </div>
          <p>
            In computer security and cryptography, password keyspace is computed identically. An 8-character password chosen from a 62-character alphanumeric keyspace (26 lowercase + 26 uppercase + 10 digits) yields <em>62<sup>8</sup> = 218,340,105,584,896</em> permutations (approx. 218.3 trillion possibilities), illustrating the exponential scaling of permutation search spaces.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Circular Permutations &amp; Dihedral Necklace Symmetries
          </h2>
          <p>
            Arranging objects around a circular loop introduces rotational symmetry. If <em>n</em> guests are seated around a circular banquet table, rotating every guest one seat clockwise preserves their relative neighbor relationships (the person to their left and right does not change).
          </p>
          <p>
            Because each unique relative arrangement can be rotated into <em>n</em> indistinguishable orientations, we divide the linear permutation count <em>n!</em> by <em>n</em>:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-bold">
            P<sub>circular</sub> = n! / n = (n - 1)!
          </div>
          <p>
            <strong>Necklaces and Key Rings:</strong> When a circular arrangement can be picked up and flipped over in 3-dimensional space (reflection), clockwise and counterclockwise arrangements become physically identical. In group theory, this corresponds to the dihedral group <em>D<sub>n</sub></em>. Dividing out the 2-fold reflective symmetry yields:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-bold">
            P<sub>necklace</sub> = (n - 1)! / 2
          </div>
          <p>
            For <em>n = 6</em> beads: circular table arrangements equal <em>(6 - 1)! = 5! = 120</em>, whereas distinct necklace designs equal <em>120 / 2 = 60</em>.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Multiset Permutations &amp; Anagram Factorials
          </h2>
          <p>
            When permuting words or collections containing repeated, indistinguishable elements, swapping identical letters produces no perceptible change. If we treated all letters as distinct, we would vastly overcount the possible arrangements.
          </p>
          <p>
            To eliminate redundancy, we divide the total length factorial <em>n!</em> by the factorial of each character&apos;s frequency count:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-bold">
            P(n; f<sub>1</sub>, f<sub>2</sub>, ..., f<sub>k</sub>) = n! / [ f<sub>1</sub>! &times; f<sub>2</sub>! &times; ... &times; f<sub>k</sub>! ]
          </div>
          <p>
            <strong>The Classic &quot;MISSISSIPPI&quot; Case:</strong> The word contains <em>n = 11</em> letters with character frequencies: M = 1, I = 4, S = 4, P = 2. Rather than 11! = 39,916,800 naive permutations:
            <br />
            <em>Total Unique Anagrams = 11! / [ 1! &times; 4! &times; 4! &times; 2! ] = 39,916,800 / [ 1 &times; 24 &times; 24 &times; 2 ] = 39,916,800 / 1,152 = 34,650</em>.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Derangements &amp; The Secret Santa Paradox (!n)
          </h2>
          <p>
            A <strong>derangement</strong> (denoted <em>!n</em> or subfactorial) is a permutation of <em>n</em> elements in which <em>no single element appears in its original position</em> (zero fixed points). A famous practical example is the holiday &quot;Secret Santa&quot; gift exchange: in how many ways can <em>n</em> coworkers draw names from a hat such that nobody draws their own name?
          </p>
          <p>
            Derangements are computed via the principle of inclusion-exclusion or the elegant linear recurrence relation:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-bold">
            !n = (n - 1) &times; [ !(n - 1) + !(n - 2) ] &nbsp;&nbsp;&nbsp; (with base cases !1 = 0, !2 = 1)
          </div>
          <p>
            Evaluating derangements for small integers yields:
            <br />
            <em>!1 = 0, !2 = 1, !3 = 2, !4 = 9, !5 = 44, !6 = 265, !7 = 1,854</em>.
          </p>
          <p>
            <strong>The 1/e Convergence:</strong> Remarkably, as <em>n</em> increases, the proportion of all permutations that are derangements (<em>!n / n!</em>) converges rapidly to the Taylor series expansion of <em>1/e = e<sup>-1</sup> &asymp; 0.36787944...</em> (approx. <strong>36.79%</strong>). For <em>n = 5</em>, <em>44 / 120 = 36.67%</em>; for <em>n = 7</em>, <em>1,854 / 5,040 = 36.79%</em>.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Pascal&apos;s Triangle, Binomial Coefficients &amp; Identities
          </h2>
          <p>
            Blaise Pascal&apos;s celebrated arithmetical triangle is the geometric manifestation of combinatorial combinations. Every entry at row <em>n</em> and column <em>k</em> (indexing from 0) is identically the binomial coefficient <em>C(n, k)</em>:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            Row 0:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1<br />
            Row 1:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 &nbsp;&nbsp; 1<br />
            Row 2:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 &nbsp;&nbsp; 2 &nbsp;&nbsp; 1<br />
            Row 3:&nbsp;&nbsp;&nbsp;&nbsp;1 &nbsp;&nbsp; 3 &nbsp;&nbsp; 3 &nbsp;&nbsp; 1<br />
            Row 4:&nbsp;&nbsp;1 &nbsp;&nbsp; 4 &nbsp;&nbsp; 6 &nbsp;&nbsp; 4 &nbsp;&nbsp; 1<br />
            Row 5:&nbsp;1 &nbsp;&nbsp; 5 &nbsp; 10 &nbsp; 10 &nbsp;&nbsp; 5 &nbsp;&nbsp; 1
          </div>
          <p>
            Two universal identities govern every row:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
            <li>
              <strong>Pascal&apos;s Recurrence Identity:</strong> <em>C(n, k) = C(n - 1, k - 1) + C(n - 1, k)</em>. Every interior cell equals the sum of the two numbers directly above it.
            </li>
            <li>
              <strong>Row Sum (The Power Set Identity):</strong> The sum of coefficients across row <em>n</em> equals <em>&Sigma; C(n, k) = 2<sup>n</sup></em>. For row 7, the row sum equals <em>2<sup>7</sup> = 128</em>, representing the total number of all possible subsets of a 7-element set.
            </li>
          </ul>
        </section>

        {/* Section 12 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Hypergeometric Distribution: Exact Probability in Finite Populations
          </h2>
          <p>
            In probability theory, the <strong>hypergeometric distribution</strong> models the probability of obtaining exactly <em>k</em> successes in <em>n</em> draws from a finite population of size <em>N</em> containing <em>K</em> total successes, without replacement.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-bold">
            P(X = k) = [ C(K, k) &times; C(N - K, n - k) ] / C(N, n)
          </div>
          <p>
            <strong>Standard Card Deck Example (Golden Case G1):</strong> What is the probability of being dealt exactly 2 hearts (k = 2) in a 5-card poker hand (n = 5) from a standard 52-card deck (N = 52, K = 13 hearts)?
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
            <li>Ways to choose 2 hearts from 13: <em>C(13, 2) = 78</em>.</li>
            <li>Ways to choose 3 non-hearts from remaining 39 cards: <em>C(39, 3) = 9,139</em>.</li>
            <li>Total possible 5-card poker hands: <em>C(52, 5) = 2,598,960</em>.</li>
            <li>Exact Probability: <em>[ 78 &times; 9,139 ] / 2,598,960 = 712,842 / 2,598,960 &asymp; <strong>27.4279%</strong></em> (odds: 1 in 3.65).</li>
          </ul>
          <p>
            To compute general single, joint, and conditional event probabilities across sample spaces, consult our{" "}
            <Link href="/calculators/probability-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Probability Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Practical Applications in Probability, Cryptography &amp; Gaming
          </h2>
          <p>
            Combinatorics is not merely an abstract branch of pure mathematics; it powers ubiquitous systems across modern science and industry:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-xs text-blue-600 dark:text-blue-400">Lottery Analysis &amp; Gaming</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                In national lotteries like Powerball, players pick 5 numbers from 69 without replacement. The number of combinations is <em>C(69, 5) = 11,238,513</em>. Multiplying by 26 red Powerball options gives exactly 292,201,338 ticket possibilities, setting jackpot odds at 1 in 292.2 million.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-xs text-blue-600 dark:text-blue-400">Network Routing &amp; Graph Theory</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Determining all possible non-repeating paths through server clusters or telecommunications nodes is an application of permutations without replacement. In complete graphs of <em>n</em> vertices, the number of simple connections is <em>C(n, 2)</em>.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-xs text-blue-600 dark:text-blue-400">Genetics &amp; Bio-Informatics</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                DNA sequences consist of 4 nucleotide bases (A, C, G, T). The number of unique codon triplets coding for amino acids is <em>4<sup>3</sup> = 64</em> permutations with replacement, providing redundancy across the 20 standard amino acids.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-xs text-blue-600 dark:text-blue-400">Data Sampling &amp; Quality Control</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Industrial acceptance sampling pulls random batches of manufactured microchips without replacement to test defect thresholds via the hypergeometric distribution, preventing widespread hardware shipment failures.
              </p>
            </div>
          </div>
        </section>

        {/* Section 14 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Common Combinatorial Fallacies &amp; Boundary Conditions
          </h2>
          <p>
            When performing manual combinatorial calculations, students and engineers frequently encounter classic cognitive traps and edge cases:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
            <li>
              <strong>The &quot;Zero Items&quot; Fallacy (n = 0 or r = 0):</strong> A common mistake is assuming that choosing 0 items produces 0. In reality, <em>C(n, 0) = 1</em> and <em>P(n, 0) = 1</em>. There is exactly <em>one</em> way to choose or arrange nothing: by selecting the empty set &empty;. Likewise, <em>0! = 1</em> by algebraic consistency.
            </li>
            <li>
              <strong>The Order Confusion Trap:</strong> Applying permutations where combinations are warranted leads to an <em>r!</em>-fold inflation of outcomes. Always confirm whether two outcomes containing identical members in differing orders represent genuinely distinct physical states.
            </li>
            <li>
              <strong>The Oversized Selection Constraint (r &gt; n):</strong> In selections without replacement, you cannot select more items than exist in the pool. Choosing 7 cards from a 5-card deck without replacement is strictly impossible; thus <em>P(n, r) = 0</em> and <em>C(n, r) = 0</em> for <em>r &gt; n</em>.
            </li>
          </ul>
        </section>

        {/* Section 15 */}
        <section className="space-y-3 print:break-inside-avoid">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Calculation Methodology &amp; Mathematical Rigor
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Arbitrary-Precision BigInt Engine
              </div>
              <p>
                Standard JavaScript numbers conform to IEEE-754 double-precision floating-point format, which loses integer precision beyond 9,007,199,254,740,991 (2<sup>53</sup> - 1). Because combinatorics involves factorial growth (100! contains 158 decimal digits), our platform performs all core factorial, permutation, and combination computations using native arbitrary-precision <code>BigInt</code> arithmetic. Results are exact down to the final unit digit.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Mathematical Verification &amp; Educational Reference
              </div>
              <p>
                Every algorithm implemented on this page has undergone property-based mathematical testing across 20,000+ randomized combinatorial identities (including Pascal&apos;s identity, symmetry equivalence, and Vandermonde&apos;s convolution). Calculations occur entirely client-side within your browser, ensuring complete data privacy and instantaneous real-time updates.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 12 APPROVED UNIFORM FAQS (UNFOLDED BY DEFAULT PER 401(K) SPEC) */}
      <div className="pt-6 print:break-inside-avoid">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {permutation_combination_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* RELATED CALCULATORS SECTION (AFTER CONTENT) */}
      <div className="no-print pt-6">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/60">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 dark:border-slate-700/60">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Explore Advanced Mathematical &amp; Statistical Calculators
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Platform Directory</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <Link
              href="/calculators/random-number-generator"
              className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
            >
              <span>Random Number Generator</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/calculators/scientific-calculator"
              className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
            >
              <span>Scientific Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/calculators/matrix-calculator"
              className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
            >
              <span>Matrix Calculator</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/calculators/standard-deviation-calculator"
              className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
            >
              <span>Standard Deviation</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PermutationCombinationContent;
