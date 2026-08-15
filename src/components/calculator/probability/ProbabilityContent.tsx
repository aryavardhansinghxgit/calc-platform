"use client";

import React from "react";
import { BookOpen, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, Layers, ShieldCheck, Target, Award } from "lucide-react";

export function ProbabilityContent() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span>1. Introduction to the Probability Suite</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The <strong>Probability Calculator & Combinatorics Suite</strong> is an advanced mathematical application engineered to model single-event, two-event, and multi-trial probabilities, conditional Bayes' theorem diagnostic tests, discrete distributions (Binomial and Poisson), and combinatorial permutations and combinations.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          This suite features 6 dedicated calculation modes with proportional SVG Venn diagrams, probability tree visualizers, PMF histograms, and automatic fraction-to-odds converters.
        </p>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600" />
          <span>2. Mathematical Concept & Kolmogorov's Axioms</span>
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Probability quantifies the likelihood of an event occurring on a real scale between 0 (impossible) and 1 (certainty). Formulated by Andrey Kolmogorov in 1933, modern probability theory rests on three foundational axioms:
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center font-mono text-base font-bold text-blue-700 dark:text-blue-300">
          {"1. Non-negativity: P(E) ≥ 0   |   2. Unit Measure: P(Ω) = 1   |   3. Disjoint Additivity: P(A ∪ B) = P(A) + P(B)"}
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" />
          <span>3. Core Mathematical Probability Laws</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">1. General Addition Rule (Union)</h4>
            <p className="font-mono text-sm font-bold">{"P(A ∪ B) = P(A) + P(B) - P(A ∩ B)"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Subtracts intersection overlap to prevent double counting.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">2. General Multiplication Rule (Intersection)</h4>
            <p className="font-mono text-sm font-bold">{"P(A ∩ B) = P(A) · P(B | A)"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Simplifies to P(A) &middot; P(B) for independent events.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">3. Bayes' Theorem Formula</h4>
            <p className="font-mono text-sm font-bold">{"P(A | B) = [ P(B | A) · P(A) ] / P(B)"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Inverts conditional probabilities using prior base rates.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-blue-600 uppercase">4. Binomial Distribution PMF</h4>
            <p className="font-mono text-sm font-bold">{"P(X = k) = (ⁿₖ) pᵏ (1 - p)ⁿ⁻ᵏ"}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Probability of exactly k successes in n independent trials.</p>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600" />
          <span>4. How the Calculation Works (4 Operational Steps)</span>
        </h2>

        <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 pl-4 list-decimal">
          <li className="pl-2">
            <strong>Input Parsing & Normalization:</strong> Raw text inputs (fractions `1/6`, percentages `50%`, or decimals `0.5`) are parsed into normalized floating point values $0 \le P \le 1$.
          </li>
          <li className="pl-2">
            <strong>Identify Event Dependency:</strong> Evaluate whether events are Independent, Mutually Exclusive, or Dependent.
          </li>
          <li className="pl-2">
            <strong>Apply Set Operation Laws:</strong> Compute Union $P(A \cup B)$, Intersection $P(A \cap B)$, Complements $P(A')$, and Conditionals $P(A \mid B)$.
          </li>
          <li className="pl-2">
            <strong>Format Output Representations:</strong> Render decimal value, percentage, simplified fraction, and odds ratio.
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
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-blue-600">
              Example 1: Probability of Rolling at least one 6 in 4 Die Rolls
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              Step 1: P(No 6 on single roll) = 5/6 = 0.8333.<br />
              Step 2: P(No 6 in 4 rolls) = (5/6)&#8308; = 625 / 1296 &approx; 0.4823.<br />
              Step 3: P(At least one 6) = 1 - 0.4823 = <strong>0.5177 (51.77%)</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-blue-600" />
          <span>6. Visual Understanding & Venn Set Regions</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-2.5">Set Region</th>
                <th className="p-2.5">Mathematical Notation</th>
                <th className="p-2.5">Independent Formula</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800/50 font-mono">
              <tr>
                <td className="p-2 font-bold text-blue-600">Intersection</td>
                <td className="p-2">P(A &cap; B)</td>
                <td className="p-2">P(A) &middot; P(B)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-blue-600">Union</td>
                <td className="p-2">P(A &cup; B)</td>
                <td className="p-2">P(A) + P(B) - P(A &cap; B)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-blue-600">Exclusive OR</td>
                <td className="p-2">P(A &Delta; B)</td>
                <td className="p-2">P(A) + P(B) - 2P(A &cap; B)</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-blue-600">Neither</td>
                <td className="p-2">P((A &cup; B)')</td>
                <td className="p-2">(1 - P(A)) &middot; (1 - P(B))</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <span>7. Common Errors in Probability Analysis</span>
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 1: Confusing Independent Events with Mutually Exclusive Events
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Independent events can occur together (P(A &cap; B) = P(A)P(B)). Mutually exclusive events CANNOT occur together (P(A &cap; B) = 0).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-200">
              Mistake 2: The Gambler's Fallacy
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300">
              Believing past independent trials influence future trials. Flipping 5 heads in a row does NOT increase the odds of tails on the 6th flip.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="h-6 w-6 text-blue-600" />
          <span>8. Real-World Applications Across Industries</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Artificial Intelligence & Naive Bayes</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Spam filters and medical diagnostic engines use Bayes' theorem to update classification probabilities based on incoming feature words.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Quantitative Finance & Risk Management</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Monte Carlo simulations model portfolio Value at Risk (VaR) and options pricing under uncertainty.
            </p>
          </div>
        </div>
      </section>

      {/* 9. RELATED MATHEMATICAL CONCEPTS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <span>9. Related Mathematical Concepts & Prerequisites</span>
        </h2>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pl-4 list-disc">
          <li><strong>Combinatorics:</strong> Permutations P(n,r) and Combinations C(n,r) for counting sample spaces.</li>
          <li><strong>Binomial Distribution:</strong> Discrete probability modeling fixed Bernoulli success trials.</li>
        </ul>
      </section>

      {/* 10. SUMMARY */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
        <h2 className="text-lg font-extrabold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          The <strong>Probability Calculator & Combinatorics Suite</strong> delivers mathematical precision across single, two-event, and multi-trial experiments. Featuring proportional SVG Venn diagrams, Bayes' diagnostic matrix, and binomial PMF histograms, this suite serves as an authoritative computational reference.
        </p>
      </section>

    </div>
  );
}
