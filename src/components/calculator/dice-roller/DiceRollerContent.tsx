"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, Sparkles, ArrowRight, Dices } from "lucide-react";
import { dice_rollerFaqs } from "@/app/calculators/dice-roller/faq";

export function DiceRollerContent() {
  // All 23 FAQs open by default as specified (unfolded)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 23 }, (_, i) => i))
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
    <article className="mt-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10">
      {/* ========================================================================= */}
      {/* 1. TOP RELATED CALCULATORS — DIRECTLY ABOVE THE ARTICLE                   */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Related Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <Link
            href="/calculators/random-number-generator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Random Number Generator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate random values for games, testing and general-purpose use.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/probability-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Probability Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Work with probability calculations beyond individual dice distributions.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/permutation-combination-calculator"
            className="group p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center justify-between">
                <span>Permutation &amp; Combination Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculate permutations and combinations for combinatorics and probability problems.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN EDUCATIONAL ARTICLE                                               */}
      {/* ========================================================================= */}
      <div className="space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
        {/* Section: Introduction */}
        <section className="space-y-4 pt-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Dice Roller &amp; TTRPG Probability Calculator
          </h2>
          <p>
            Dice are one of the simplest ways to introduce controlled randomness into a game, but the mathematics behind a dice roll can become surprisingly rich.
          </p>
          <p>
            A single d6 is easy:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-serif text-base text-slate-900 dark:text-slate-100 font-medium">
            1, 2, 3, 4, 5, 6
          </div>
          <p>
            Each face of a fair six-sided die has probability:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-serif text-base text-slate-900 dark:text-slate-100 font-medium">
            1 / 6
          </div>
          <p>
            But once you start rolling several dice, adding modifiers, keeping the highest rolls, dropping the lowest die, exploding on maximum results, or comparing Advantage and Disadvantage, the distribution changes.
          </p>
          <p>
            This Dice Roller &amp; TTRPG Probability Calculator is designed for both sides of that problem:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Roll the dice</strong> when you simply need a result.</li>
            <li><strong>Analyze the dice</strong> when you want to understand the probability behind the result.</li>
          </ul>
          <p>
            The calculator supports standard polyhedral dice, custom-sided dice, TTRPG notation, modifiers, keep-highest and keep-lowest mechanics, Advantage/Disadvantage-style rolls, exploding dice, percentile rolls, session history and probability visualization. Its internal testing covers exact distributions for advanced mechanics as well as secure random sampling.
          </p>
        </section>

        {/* Section: How Dice Notation Works */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            How Dice Notation Works
          </h2>
          <p>
            The standard notation is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-600 dark:text-blue-400">
            NdM
          </div>
          <p>
            where:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>N</strong> = number of dice</li>
            <li><strong>M</strong> = number of sides on each die</li>
          </ul>
          <p>
            For example:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-sm font-bold text-slate-900 dark:text-slate-100">
            2d6
          </div>
          <p>
            means: roll two six-sided dice and add the results.
          </p>
          <p>
            Similarly, <strong>1d20</strong> means one twenty-sided die, while <strong>4d6</strong> means four six-sided dice.
          </p>
          <p>
            This general notation is used across many tabletop systems. For example, Pathfinder&apos;s rules also describe notation such as 4d6 as four six-sided dice.
          </p>
          <p>
            The notation becomes more powerful when operators are added. Examples include:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs sm:text-sm text-center">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-slate-100">
              2d6+3
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-slate-100">
              2d20kh1
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-slate-100">
              4d6kh3
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-slate-100">
              3d6!
            </div>
          </div>
          <p>
            The exact meaning of those modifiers depends on the dice notation supported by the calculator or the game system using the notation.
          </p>
        </section>

        {/* Section: What Does 2d6 Mean? */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            What Does 2d6 Mean?
          </h2>
          <p>
            When you roll <strong>2d6</strong>, you get two independent results between 1 and 6.
          </p>
          <p>
            The smallest possible total is 1 + 1 = 2. The largest is 6 + 6 = 12. So:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-serif text-base text-slate-900 dark:text-slate-100 font-bold">
            2 ≤ X ≤ 12
          </div>
          <p>
            There are 6 × 6 = 36 equally likely ordered outcomes. That makes it possible to calculate the exact probability of every total.
          </p>
          <p>
            For example, a total of 7 can happen in six ways:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center text-slate-800 dark:text-slate-200">
            1 + 6 &nbsp;|&nbsp; 2 + 5 &nbsp;|&nbsp; 3 + 4 &nbsp;|&nbsp; 4 + 3 &nbsp;|&nbsp; 5 + 2 &nbsp;|&nbsp; 6 + 1
          </div>
          <p>
            Therefore:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-serif text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
            P(X = 7) = 6 / 36 = 1 / 6 ≈ 16.67%
          </div>
          <p>
            The calculator&apos;s exact PMF regression verifies the 2d6 distribution and its 7-point peak.
          </p>
        </section>

        {/* Section: Why 2d6 Forms a Bell-Shaped Distribution */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Why 2d6 Forms a Bell-Shaped Distribution
          </h2>
          <p>
            A single d6 has a uniform distribution: every result is equally likely.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center text-slate-800 dark:text-slate-200">
            1 &nbsp;&nbsp; 2 &nbsp;&nbsp; 3 &nbsp;&nbsp; 4 &nbsp;&nbsp; 5 &nbsp;&nbsp; 6<br />
            ▉ &nbsp;&nbsp; ▉ &nbsp;&nbsp; ▉ &nbsp;&nbsp; ▉ &nbsp;&nbsp; ▉ &nbsp;&nbsp; ▉
          </div>
          <p>
            But when two dice are added, middle totals have more combinations than extreme totals. That produces a triangular, bell-like peak:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center text-slate-700 dark:text-slate-300 leading-relaxed overflow-x-auto">
            <pre className="inline-block text-left font-mono">
{`Probability
        /\\
       /  \\
      /    \\
_____/      \\_____
 2  3  4  5  6  7  8  9 10 11 12`}
            </pre>
          </div>
          <p>
            The peak occurs at <strong>7</strong>, while <strong>2</strong> and <strong>12</strong> are the rarest totals. This is why a pool such as 2d6 feels very different from a single d20 even though both involve familiar polyhedral dice.
          </p>
        </section>

        {/* Section: Dice Probability Formula & Internal Anchor 1 */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Dice Probability Formula
          </h2>
          <p>
            For one fair <em>n</em>-sided die:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-serif text-base font-semibold text-slate-900 dark:text-slate-100">
            P(X = k) = 1 / n &emsp; for every &nbsp; k ∈ &#123;1, ..., n&#125;
          </div>
          <p>
            That means a d20 has P(X = k) = 1 / 20 = 5% for each individual face. A d100 similarly gives each integer from 1 through 100 a probability of 1%. The calculator&apos;s mathematical audit confirms these uniform-die relationships.
          </p>
          {/* CONTEXTUAL INTERNAL ANCHOR 1 */}
          <div className="p-3.5 bg-blue-50/50 dark:bg-slate-800/50 rounded-xl border border-blue-200/60 dark:border-slate-700 text-xs sm:text-sm">
            <p className="text-slate-700 dark:text-slate-300">
              For probability problems that are not limited to dice, the{" "}
              <Link
                href="/calculators/probability-calculator"
                className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700 transition-colors"
              >
                Probability Calculator
              </Link>{" "}
              can handle the broader probability calculation.
            </p>
          </div>
        </section>

        {/* Section: Expected Value of a Die */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Expected Value of a Die
          </h2>
          <p>
            The expected value of a fair <em>n</em>-sided die is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-serif text-base font-bold text-blue-600 dark:text-blue-400">
            E[X] = (n + 1) / 2
          </div>
          <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
            <li>For a d6: E[X] = (6 + 1) / 2 = <strong>3.5</strong></li>
            <li>For a d20: E[X] = (20 + 1) / 2 = <strong>10.5</strong></li>
          </ul>
          <p>
            These are averages over many rolls, not predictions of an individual roll. A single d20 can only produce integers 1, 2, ..., 20, so it cannot literally roll 10.5. Instead, over a very large number of fair rolls, the sample average approaches the theoretical expected value. The calculator independently verifies both values.
          </p>
        </section>

        {/* Section: Variance of a Fair Die */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Variance of a Fair Die
          </h2>
          <p>
            Variance measures the spread of a random variable around its expected value:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-serif text-base font-bold text-blue-600 dark:text-blue-400">
            Var(X) = (n² - 1) / 12
          </div>
          <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
            <li>For d6: Var(X) = (36 - 1) / 12 = 35 / 12 ≈ <strong>2.9167</strong></li>
            <li>For d20: Var(X) = (400 - 1) / 12 = 399 / 12 = <strong>33.25</strong></li>
          </ul>
          <p>
            The calculator verifies these analytic values as part of its mathematical regression.
          </p>
        </section>

        {/* Section: Expected Value and Variance for Multiple Dice */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Expected Value and Variance for Multiple Dice
          </h2>
          <p>
            For <em>m</em> independent identical <em>n</em>-sided dice:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center font-serif text-sm sm:text-base">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              E[S] = m × (n + 1) / 2
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              Var(S) = m × (n² - 1) / 12
            </div>
          </div>
          <p>
            For <strong>3d6</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
            <li>E[S] = 3 × 3.5 = <strong>10.5</strong></li>
            <li>Var(S) = 3 × (35 / 12) = <strong>8.75</strong></li>
          </ul>
          <p>
            For <strong>2d20</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
            <li>E[S] = 2 × 10.5 = <strong>21</strong></li>
            <li>Var(S) = 2 × 33.25 = <strong>66.5</strong></li>
          </ul>
          <p>
            These formulas describe the ordinary sum of independent dice. They do not automatically apply unchanged to keep-highest, keep-lowest or other order-statistic mechanics.
          </p>
        </section>

        {/* Section: What Is a Probability Mass Function? & Internal Anchor 2 */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            What Is a Probability Mass Function?
          </h2>
          <p>
            A Probability Mass Function (PMF) gives the probability associated with each possible value of a discrete random variable. For 2d6:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse border border-slate-200 dark:border-slate-700">
              <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Total</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Probability</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-700">Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono">
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">2</td><td className="p-2 border border-slate-200 dark:border-slate-700">1 / 36</td><td className="p-2 border border-slate-200 dark:border-slate-700">2.78%</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">3</td><td className="p-2 border border-slate-200 dark:border-slate-700">2 / 36</td><td className="p-2 border border-slate-200 dark:border-slate-700">5.56%</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">4</td><td className="p-2 border border-slate-200 dark:border-slate-700">3 / 36</td><td className="p-2 border border-slate-200 dark:border-slate-700">8.33%</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">5</td><td className="p-2 border border-slate-200 dark:border-slate-700">4 / 36</td><td className="p-2 border border-slate-200 dark:border-slate-700">11.11%</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">6</td><td className="p-2 border border-slate-200 dark:border-slate-700">5 / 36</td><td className="p-2 border border-slate-200 dark:border-slate-700">13.89%</td></tr>
                <tr className="bg-blue-50/60 dark:bg-slate-800 font-bold text-blue-700 dark:text-blue-300">
                  <td className="p-2 border border-slate-200 dark:border-slate-700">7 (Peak)</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">6 / 36</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">16.67%</td>
                </tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">8</td><td className="p-2 border border-slate-200 dark:border-slate-700">5 / 36</td><td className="p-2 border border-slate-200 dark:border-slate-700">13.89%</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">9</td><td className="p-2 border border-slate-200 dark:border-slate-700">4 / 36</td><td className="p-2 border border-slate-200 dark:border-slate-700">11.11%</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">10</td><td className="p-2 border border-slate-200 dark:border-slate-700">3 / 36</td><td className="p-2 border border-slate-200 dark:border-slate-700">8.33%</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">11</td><td className="p-2 border border-slate-200 dark:border-slate-700">2 / 36</td><td className="p-2 border border-slate-200 dark:border-slate-700">5.56%</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700">12</td><td className="p-2 border border-slate-200 dark:border-slate-700">1 / 36</td><td className="p-2 border border-slate-200 dark:border-slate-700">2.78%</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The probabilities must satisfy the normalization axiom: ∑ P(X = x) = 1. The calculator keeps its internal PMF probabilities at full precision and rounds values only for presentation, so display rounding does not corrupt the mathematical total.
          </p>
          {/* CONTEXTUAL INTERNAL ANCHOR 2 */}
          <div className="p-3.5 bg-blue-50/50 dark:bg-slate-800/50 rounded-xl border border-blue-200/60 dark:border-slate-700 text-xs sm:text-sm">
            <p className="text-slate-700 dark:text-slate-300">
              When a dice problem requires broader combinatorial counting, the{" "}
              <Link
                href="/calculators/permutation-combination-calculator"
                className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700 transition-colors"
              >
                Permutation &amp; Combination Calculator
              </Link>{" "}
              can be used alongside the dice analysis.
            </p>
          </div>
        </section>

        {/* Section: How the Dice Probability Curve Changes */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            How the Dice Probability Curve Changes as You Add Dice
          </h2>
          <p>
            With one d6, the distribution is flat. With 2d6, the distribution becomes triangular. With 3d6, it becomes more concentrated around the middle. With even more independent dice, the shape becomes increasingly bell-like.
          </p>
          <p>
            This is related to the Central Limit Theorem, which describes how normalized sums of many independent random variables tend toward a normal distribution under suitable conditions.
          </p>
          <p>
            It is important not to overstate this: 2d6 is not a continuous normal distribution; 3d6 is not a continuous normal distribution. They remain discrete distributions with finite support. The calculator&apos;s educational model makes that distinction explicit.
          </p>
        </section>

        {/* Section: What Is Advantage? */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            What Is Advantage?
          </h2>
          <p>
            In systems such as modern D&amp;D, Advantage means rolling two d20s and using the higher result. The current 2024 D&amp;D Basic Rules explicitly describe this procedure.
          </p>
          <p>
            The equivalent dice notation is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-600 dark:text-blue-400">
            2d20kh1
          </div>
          <p>
            where <strong>kh1</strong> means keep the highest one. For example:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300 font-mono text-xs sm:text-sm">
            <li>First d20: 7</li>
            <li>Second d20: 15</li>
          </ul>
          <p>
            Advantage keeps <strong>15</strong> and drops <strong>7</strong>. The calculator verifies this exact case.
          </p>
        </section>

        {/* Section: Advantage Probability */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Advantage Probability
          </h2>
          <p>
            For a d20 without Advantage:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 font-serif text-center text-sm">
            P(X ≥ k) = (21 - k) / 20
          </div>
          <p>
            With Advantage, both dice must fail to reach <em>k</em> for the final result to be below <em>k</em>. Therefore:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-serif text-base font-bold text-blue-600 dark:text-blue-400">
            P(Advantage ≥ k) = 1 - ((k - 1) / 20)²
          </div>
          <p>
            For a natural 20:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-serif text-sm sm:text-base text-slate-900 dark:text-slate-100">
            P(at least one 20) = 1 - (19 / 20)² = 39 / 400 = <strong>9.75%</strong>
          </div>
          <p>
            A normal d20 has only a <strong>5%</strong> chance of rolling a 20. The calculator independently verifies the 9.75% Advantage value.
          </p>
        </section>

        {/* Section: What Is Disadvantage? */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            What Is Disadvantage?
          </h2>
          <p>
            Disadvantage uses two d20s and keeps the lower result. Current D&amp;D Basic Rules describe exactly that procedure, and also specify that Advantage and Disadvantage cancel when both apply to the same D20 Test.
          </p>
          <p>
            The corresponding notation is <strong>2d20kl1</strong>, where <strong>kl1</strong> means keep the lowest one.
          </p>
          <p>
            For d20 #1 = 7 and d20 #2 = 15, Disadvantage produces <strong>7</strong>. The calculator&apos;s deterministic test confirms that result.
          </p>
        </section>

        {/* Section: Advantage vs. Disadvantage Probability */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Advantage vs. Disadvantage Probability
          </h2>
          <p>
            For a natural 20:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs uppercase font-bold text-slate-500 block mb-1">Normal d20</span>
              <span className="font-mono text-lg font-bold text-slate-900 dark:text-slate-100">5.00%</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs uppercase font-bold text-slate-500 block mb-1">Advantage</span>
              <span className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">9.75%</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs uppercase font-bold text-slate-500 block mb-1">Disadvantage</span>
              <span className="font-mono text-lg font-bold text-rose-600 dark:text-rose-400">0.25%</span>
            </div>
          </div>
          <p>
            Under Disadvantage, both dice must be 20 to produce a natural 20: (1 / 20)² = 1 / 400 = 0.25%. The calculator verifies all three values.
          </p>
        </section>

        {/* Section: Advantage Does Not Mean "Roll a Higher d20" */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Advantage Does Not Mean “Roll a Higher d20”
          </h2>
          <p>
            This distinction is important. Advantage does not change a d20 into a larger die. You still roll d20 twice. The mechanic changes how the two results are selected:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Normal:</strong> one d20 → keep it</li>
            <li><strong>Advantage:</strong> two d20 → keep highest</li>
            <li><strong>Disadvantage:</strong> two d20 → keep lowest</li>
          </ul>
          <p>
            That is why Advantage produces a different probability distribution without creating results above 20.
          </p>
        </section>

        {/* Section: What Is 4d6 Drop Lowest? */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            What Is 4d6 Drop Lowest?
          </h2>
          <p>
            A common TTRPG ability-score method is <strong>4d6 keep highest 3</strong>, or <strong>4d6kh3</strong>. You roll four six-sided dice, discard the lowest one, and add the remaining three.
          </p>
          <p>
            The current 2024 D&amp;D Basic Rules use exactly this random-generation method for ability scores. For example:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center text-slate-800 dark:text-slate-200">
            Rolled: 6, 4, 3, 2 &emsp;→&emsp; Drop: 2 &emsp;→&emsp; Keep: 6 + 4 + 3 = <strong>13</strong>
          </div>
          <p>
            The calculator independently verifies this exact sequence.
          </p>
        </section>

        {/* Section: The Probability Distribution of 4d6kh3 */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            The Probability Distribution of 4d6kh3
          </h2>
          <p>
            The ordinary 4d6 sum ranges from 4 to 24. But 4d6kh3 ranges from <strong>3 to 18</strong> because the lowest die is discarded.
          </p>
          <p>
            The exact mean is approximately <strong>12.2446</strong>. The calculator&apos;s exact combinatorial PMF verifies:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300 font-mono text-xs sm:text-sm">
            <li>support: 3–18</li>
            <li>mean: 12.2446</li>
            <li>PMF sum: 1.0</li>
          </ul>
        </section>

        {/* Section: Chance of Getting 13 or Higher with 4d6kh3 */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            What Is the Chance of Getting 13 or Higher with 4d6kh3?
          </h2>
          <p>
            There are 6⁴ = 1,296 equally likely ordered four-die outcomes. Exactly <strong>632</strong> produce a final keep-highest-three total of at least 13.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-serif text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
            P(S ≥ 13) = 632 / 1296 ≈ 48.765% &emsp; (or 48.8%)
          </div>
          <p>
            This is the corrected probability used by the calculator after its mathematical audit.
          </p>
        </section>

        {/* Section: Why 4d6kh3 Is Different from 4d6 */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Why 4d6kh3 Is Different from 4d6
          </h2>
          <p>
            Consider <strong>4d6</strong>: you add all four dice. Now consider <strong>4d6kh3</strong>: you throw away the lowest die before summing. That changes minimum, maximum, mean, variance, PMF shape, and the probability of every total.
          </p>
          <p>
            Therefore, a probability graph for 4d6 cannot be reused for 4d6kh3. The calculator now computes the correct order-statistic distribution for keep-highest and keep-lowest formulas.
          </p>
        </section>

        {/* Section: Keep Highest and Keep Lowest */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Keep Highest and Keep Lowest
          </h2>
          <p>
            The notation can be generalized:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>Keep Highest (4d6kh3):</strong> keep the three highest results.</li>
            <li><strong>Keep Lowest (4d6kl3):</strong> keep the three lowest results.</li>
            <li><strong>2d20kh1:</strong> the familiar Advantage-style maximum.</li>
            <li><strong>2d20kl1:</strong> the Disadvantage-style minimum.</li>
          </ul>
          <p>
            These mechanics are order statistics, not ordinary dice sums, so their probability distributions must be calculated differently.
          </p>
        </section>

        {/* Section: What Are Modifiers? */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            What Are Modifiers?
          </h2>
          <p>
            A modifier changes the final dice result by a constant amount. For <strong>2d6+3</strong>, if the dice roll 5 + 4 = 9, then 9 + 3 = 12. So 2d6+3 = 12. The calculator verifies this exact deterministic case.
          </p>
          <p>
            A negative modifier works similarly: for <strong>2d6-3</strong>, if the dice total 9, then 9 - 3 = 6.
          </p>
        </section>

        {/* Section: How a Modifier Changes a Probability Distribution */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            How a Modifier Changes a Probability Distribution
          </h2>
          <p>
            A constant modifier does not change the probability shape of the underlying dice. It shifts the support.
          </p>
          <p>
            For example, <strong>4d6kh3</strong> has support 3...18. Adding 5 gives <strong>4d6kh3+5</strong> with support 8...23. The mean shifts from 12.2446 to 17.2446, while the variance remains 7.0075 because adding a constant changes location, not spread. The calculator verifies this exact relationship.
          </p>
        </section>

        {/* Section: What Are Exploding Dice? */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            What Are Exploding Dice?
          </h2>
          <p>
            Exploding dice are a common TTRPG mechanic in which rolling the maximum value triggers another roll of the same die. A typical notation is <strong>1d6!</strong>.
          </p>
          <p>
            Suppose the die produces 6. Because 6 is the maximum, another d6 is rolled. If the next roll is 4, the total is 6 + 4 = 10. The calculator verifies this deterministic sequence.
          </p>
        </section>

        {/* Section: Multiple Explosions */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Multiple Explosions
          </h2>
          <p>
            If the next roll is also the maximum, the process can continue. For example: first roll 6, second roll 6, third roll 2 → 6 + 6 + 2 = 14.
          </p>
          <p>
            The calculator includes an explicit safety limit so pathological repeated maximum rolls cannot create an infinite execution loop.
          </p>
        </section>

        {/* Section: Exact vs. Simulated Probability for Exploding Dice */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Exact vs. Simulated Probability for Exploding Dice
          </h2>
          <p>
            Exploding dice are different from ordinary finite dice distributions because repeated explosions create a theoretically extended tail.
          </p>
          <p>
            The calculator therefore distinguishes between exact PMF (where it mathematically derives the distribution) and simulated probability (where repeated rolls are sampled to estimate the distribution).
          </p>
          <p>
            For exploding-dice probability visualization, the current implementation labels the result as:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            Simulated Probability Distribution (N=50,000)
          </div>
          <p>
            rather than pretending a finite Monte Carlo simulation is an exact PMF. That distinction is important when interpreting the curve.
          </p>
        </section>

        {/* Section: What Is a d100? */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            What Is a d100?
          </h2>
          <p>
            A percentile die represents values from 1 to 100. The calculator treats d100 as a discrete uniform distribution over those integers.
          </p>
          <p>
            A percentile convention often uses two d10-style positional dice (tens and ones):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center text-slate-800 dark:text-slate-200">
            00 + 1 → 1 &emsp;|&emsp; 10 + 4 → 14 &emsp;|&emsp; 70 + 4 → 74 &emsp;|&emsp; 90 + 9 → 99 &emsp;|&emsp; 00 + 0 → 100
          </div>
          <p>
            The important property for the calculator is 1 ≤ d100 ≤ 100 with a uniform discrete distribution.
          </p>
        </section>

        {/* Section: Natural 20 Probability */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Natural 20 Probability
          </h2>
          <p>
            For one fair d20: P(20) = 1 / 20 = 5%. The term natural 20 generally refers to the die result itself being 20, rather than a total reached after adding modifiers.
          </p>
          <p>
            Current 2024 D&amp;D rules specify that a 20 on a d20 attack roll is a critical hit, while a 1 is an automatic miss on that attack roll. Those game-specific consequences should not be generalized to every tabletop system.
          </p>
        </section>

        {/* Section: Consecutive Natural 20s */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Consecutive Natural 20s
          </h2>
          <p>
            Independent d20 rolls multiply their probabilities:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Two consecutive 20s:</strong> (1 / 20) × (1 / 20) = 1 / 400 = <strong>0.25%</strong></li>
            <li><strong>Three consecutive 20s:</strong> (1 / 20)³ = 1 / 8000 = <strong>0.0125%</strong></li>
          </ul>
          <p>
            The calculator&apos;s content audit independently confirms these values.
          </p>
        </section>

        {/* Section: Why Dice Probability Is Useful for TTRPG Game Design */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Why Dice Probability Is Useful for TTRPG Game Design
          </h2>
          <p>
            Probability analysis can answer questions such as:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
            <li>How often will players hit a target number?</li>
            <li>How often will a character get a high ability score?</li>
            <li>How much does Advantage change success probability?</li>
            <li>How powerful is a modifier?</li>
            <li>How much does dropping the lowest die shift an ability-score method?</li>
            <li>How extreme are exploding-dice results?</li>
            <li>How concentrated is a dice pool around its mean?</li>
          </ul>
          <p>
            For example, comparing 1d20 with 3d6 shows two completely different risk profiles: a d20 gives a flat probability to every face, while a 3d6 sum strongly favors the middle. That distinction can materially change how a game feels.
          </p>
        </section>

        {/* Section: Dice as Probability Distributions */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Dice as Probability Distributions
          </h2>
          <p>
            The same formula can be understood at three levels:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center text-slate-700 dark:text-slate-300 overflow-x-auto">
            <pre className="inline-block text-left font-mono">
{`              DICE EXPRESSION
                     │
                     ▼
              RANDOM OUTCOMES
                     │
                     ▼
              PROBABILITY PMF
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
        Mean      Variance     Shape`}
            </pre>
          </div>
          <p>
            The roller gives you one sample. The PMF describes all possible samples. The expected value and variance summarize the distribution. A strong dice tool keeps those concepts separate.
          </p>
        </section>

        {/* Section: Fairness, Randomness & Internal Anchor 3 */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Why One Dice Roll Proves Almost Nothing About Fairness
          </h2>
          <p>
            Suppose a d6 produces 6. That does not mean the die is unfair. A fair die can produce any of its allowed outcomes on any individual roll. Likewise, ten rolls that happen to contain many 6s do not establish bias.
          </p>
          <p>
            Statistical fairness is about behavior across many independent trials. The calculator&apos;s randomness audit therefore uses large samples and a chi-square goodness-of-fit check rather than drawing conclusions from a few visible rolls. Its latest audit tested 100,000 rolls for each supported die configuration.
          </p>
        </section>

        {/* Section: Cryptographically Secure Randomness */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Cryptographically Secure Randomness
          </h2>
          <p>
            The calculator uses the browser&apos;s Web Crypto random source when available. MDN describes <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">crypto.getRandomValues()</code> as providing cryptographically strong random values, and distinguishes it from <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">Math.random()</code>, which is not cryptographically secure.
          </p>
          <p>
            The important distinction is: <em>cryptographically secure pseudo-random generation</em> is not the same thing as <em>physical hardware randomness</em>. The calculator therefore uses the more accurate interface language: <strong>Cryptographically Secure Randomness</strong> rather than claiming that every browser roll is literally generated by a hardware random-number generator.
          </p>
          {/* CONTEXTUAL INTERNAL ANCHOR 3 */}
          <div className="p-3.5 bg-blue-50/50 dark:bg-slate-800/50 rounded-xl border border-blue-200/60 dark:border-slate-700 text-xs sm:text-sm">
            <p className="text-slate-700 dark:text-slate-300">
              For general random integer generation outside a dice expression, use the{" "}
              <Link
                href="/calculators/random-number-generator"
                className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700 transition-colors"
              >
                Random Number Generator
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Section: Why Rejection Sampling Matters */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Why Rejection Sampling Matters
          </h2>
          <p>
            A simple implementation might obtain a random integer and use <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">random % N</code> to map it to <em>N</em> sides. That can introduce modulo bias when the size of the underlying random space is not evenly divisible by <em>N</em>.
          </p>
          <p>
            The calculator instead uses rejection sampling for its secure random integer mapping. Its audit explicitly verifies modulo-bias rejection and reports zero out-of-range results across the tested rolls.
          </p>
        </section>

        {/* Section: Does a CSPRNG Make a Die "Fair"? */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Does a CSPRNG Make a Die “Fair”?
          </h2>
          <p>
            It makes the software&apos;s random-number generation method substantially more appropriate for unbiased digital randomness than using an ordinary non-cryptographic generator. It does not make a physical die fair. Those are different questions:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-blue-600 dark:text-blue-400 block">Digital Roller</strong>
              <p>Random-number generation → Distribution correctness</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-blue-600 dark:text-blue-400 block">Physical Die</strong>
              <p>Geometry / mass / manufacturing → Physical rolling behavior</p>
            </div>
          </div>
        </section>

        {/* Section: Saltwater Test */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Can You Test a Physical Die in Saltwater?
          </h2>
          <p>
            A saltwater float test can provide a rough indication of density or mass asymmetry, but it cannot certify that a physical die is perfectly fair. Floating behavior does not completely evaluate face geometry, corner curvature, edge wear, pip distribution, aerodynamic effects, or surface properties. The calculator explicitly qualifies the test rather than presenting it as proof of fairness.
          </p>
        </section>

        {/* Section: Law of Large Numbers */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Dice Probability and the Law of Large Numbers
          </h2>
          <p>
            A theoretical probability describes long-run behavior. For a fair d6: P(6) = 1/6. In 6 rolls, you should not expect exactly one 6; you might get zero, one, two, or more. The proportion tends toward the theoretical probability as the number of trials becomes very large. That is why probability should not be confused with certainty.
          </p>
        </section>

        {/* Section: PMF vs Roll History */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Why a PMF Is Different from a Roll History
          </h2>
          <p>
            A PMF is theoretical; a roll log is observed. An empirical session does not redefine the theoretical distribution. The calculator keeps its roll history and theoretical PMF as separate concepts.
          </p>
        </section>

        {/* Section: TTRPG Formulas and System-Specific Rules */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            TTRPG Formulas and System-Specific Rules
          </h2>
          <p>
            The calculator supports generic dice mathematics, but some mechanics are game-system conventions. For example, Advantage/Disadvantage is strongly associated with D&amp;D, while 4d6 keep-highest-three is a recognized D&amp;D ability-score generation method. Other tabletop games may use different advantage mechanics, reroll rules, critical rules, or success thresholds. A dice expression should always be interpreted in the context of the ruleset using it.
          </p>
        </section>

        {/* Section: Common Dice Notation Examples */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Common Dice Notation Examples
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-mono">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-blue-600 dark:text-blue-400 font-bold block mb-1">2d6</strong>
              <span className="font-sans text-slate-700 dark:text-slate-300">Roll two d6 and add them.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-blue-600 dark:text-blue-400 font-bold block mb-1">2d6+3</strong>
              <span className="font-sans text-slate-700 dark:text-slate-300">Roll two d6 and add 3.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-blue-600 dark:text-blue-400 font-bold block mb-1">2d20kh1</strong>
              <span className="font-sans text-slate-700 dark:text-slate-300">Roll two d20 and keep highest (Advantage).</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-blue-600 dark:text-blue-400 font-bold block mb-1">2d20kl1</strong>
              <span className="font-sans text-slate-700 dark:text-slate-300">Roll two d20 and keep lowest (Disadvantage).</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-blue-600 dark:text-blue-400 font-bold block mb-1">4d6kh3</strong>
              <span className="font-sans text-slate-700 dark:text-slate-300">Roll four d6 and keep the highest three.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-blue-600 dark:text-blue-400 font-bold block mb-1">3d6!</strong>
              <span className="font-sans text-slate-700 dark:text-slate-300">Roll three d6 with exploding rule on maximum face.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 sm:col-span-2">
              <strong className="text-blue-600 dark:text-blue-400 font-bold block mb-1">d100</strong>
              <span className="font-sans text-slate-700 dark:text-slate-300">Generate a percentile result from 1 through 100.</span>
            </div>
          </div>
          <p>
            The calculator&apos;s parser and deterministic regression tests verify these supported forms and reject malformed expressions instead of silently converting them into an unrelated default roll.
          </p>
        </section>

        {/* Section: Strict Validation */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            What Happens When a Formula Is Invalid?
          </h2>
          <p>
            A good formula parser should not quietly transform an invalid expression into another formula. Inputs such as <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">2d</code>, <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">2.5d6</code>, <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">0d6</code>, or <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs">2d6++</code> should not silently become 1d20.
          </p>
          <p>
            The calculator performs strict validation and returns a controlled error for malformed expressions, ensuring you always know if an expression cannot be parsed.
          </p>
        </section>

        {/* Section: Probability of Success in a TTRPG */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Probability of Success in a TTRPG
          </h2>
          <p>
            Suppose you need a result of at least 15 on a d20:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Without Advantage:</strong> P(X ≥ 15) = 6 / 20 = <strong>30%</strong> (faces 15, 16, 17, 18, 19, 20).</li>
            <li><strong>With Advantage:</strong> P(Advantage ≥ 15) = 1 - (14 / 20)² = 1 - 0.49 = <strong>51%</strong>.</li>
          </ul>
          <p>
            That is a significant increase without changing the die itself. This is one reason probability calculators are useful for encounter balancing and understanding the practical impact of game mechanics.
          </p>
        </section>

        {/* Section: Expected Value vs Most Likely */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Expected Value Is Not the “Most Likely” Result
          </h2>
          <p>
            For 2d6, E[X] = 7, and 7 is also the single most probable total. But that is not always true for every dice mechanic. For example, the mean of 2d20kh1 is <strong>13.825</strong>, but individual results remain integers from 1 through 20. The expected value is a statistical center, not necessarily an actual roll or the single most likely outcome.
          </p>
        </section>

        {/* Section: Practical Workflow */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            A Practical Dice Probability Workflow
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center text-slate-700 dark:text-slate-300 overflow-x-auto">
            <pre className="inline-block text-left font-mono">
{`Choose the dice → Enter the formula → Parse modifiers
      ↓
Generate random outcome → Apply keep/drop/explosion rules
      ↓
Calculate final total → Inspect individual dice
      ↓
Compare with theoretical PMF → Review mean / variance / distribution`}
            </pre>
          </div>
        </section>

        {/* Section: What Calculator Can & Cannot Tell You */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            What This Calculator Can &amp; Cannot Determine
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <strong className="text-emerald-700 dark:text-emerald-400 block font-bold">What It Can Determine</strong>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                <li>Expected value of 3d6 (10.5)</li>
                <li>Chance of natural 20 (5%)</li>
                <li>Advantage natural-20 probability (9.75%)</li>
                <li>Exact mean of 4d6kh3 (12.2446)</li>
                <li>Probability of 4d6kh3 ≥ 13 (48.8%)</li>
                <li>Exact roll totals with modifiers</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <strong className="text-rose-700 dark:text-rose-400 block font-bold">What It Cannot Determine</strong>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                <li>Whether your physical dice are balanced</li>
                <li>Whether a specific game mechanic is &quot;fair&quot;</li>
                <li>Whether one TTRPG&apos;s house rules apply</li>
                <li>Whether a random outcome is &quot;due&quot; after a streak</li>
                <li>Predictions of the next individual roll</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Final Takeaway */}
        <section className="space-y-4 pt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Final Takeaway
          </h2>
          <p>
            A dice roller can be as simple as 1d20. But once you add 4d6kh3, 2d20kh1, or 1d6!, you are no longer dealing with simple uniform dice—you are dealing with probability transformations.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-2">
            <div className="font-serif text-base font-bold text-blue-600 dark:text-blue-400">
              What did I roll? &emsp; &amp; &emsp; What is the probability distribution?
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The first gives you the immediate game result; the second explains the behavior of the mechanic over time.
            </p>
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 3. FREQUENTLY ASKED QUESTIONS (23 UNFOLDED FAQS)                          */}
      {/* ========================================================================= */}
      <section className="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {dice_rollerFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/50 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between hover:bg-slate-100/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-mono text-xs font-bold shrink-0">
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal bg-white/60 dark:bg-slate-900/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SOURCES / REFERENCES                                                   */}
      {/* ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Sources &amp; References
          </h2>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <ol className="list-decimal pl-4 space-y-1.5">
            <li>
              <strong>Wizards of the Coast (2024):</strong> <em>D&amp;D Basic Rules</em> – D20 Tests, Advantage/Disadvantage mechanics, and Ability Score Generation (4d6 drop lowest).
            </li>
            <li>
              <strong>MDN Web Docs:</strong> <em>Web Cryptography API – <code className="font-mono text-[11px]">Crypto.getRandomValues()</code></em>. Cryptographically strong random integer generation.
            </li>
            <li>
              <strong>NIST Special Publication 800-22:</strong> <em>A Statistical Test Suite for Random and Pseudorandom Number Generators for Cryptographic Applications</em>.
            </li>
            <li>
              <strong>Feller, W. (1968):</strong> <em>An Introduction to Probability Theory and Its Applications</em>, Vol. 1. John Wiley &amp; Sons. (Discrete uniform distributions and generating functions).
            </li>
            <li>
              <strong>Paizo Inc.:</strong> <em>Pathfinder Core Rulebook</em> – Tabletop dice notation conventions and dice pool mechanics.
            </li>
          </ol>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BOTTOM RELATED CALCULATORS — PLACED ONLY ONCE AT THE VERY BOTTOM       */}
      {/* ========================================================================= */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Related Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Random Number Generator
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Generate random values for games, experiments and general-purpose tasks.
              </p>
            </div>
            <Link
              href="/calculators/random-number-generator"
              className="inline-block mt-3 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors w-fit"
            >
              Open Random Number Generator &rarr;
            </Link>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Probability Calculator
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Calculate probabilities for problems beyond dice.
              </p>
            </div>
            <Link
              href="/calculators/probability-calculator"
              className="inline-block mt-3 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors w-fit"
            >
              Open Probability Calculator &rarr;
            </Link>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Permutation &amp; Combination Calculator
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Solve broader counting and combinatorial problems.
              </p>
            </div>
            <Link
              href="/calculators/permutation-combination-calculator"
              className="inline-block mt-3 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors w-fit"
            >
              Open Permutation &amp; Combination &rarr;
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

export default DiceRollerContent;
