"use client";

import React from "react";
import { normalCDF } from "@/app/calculators/probability-calculator/probability-logic";

export function ProbabilityContent() {
  // Pre-generate Z Table from Mean (0 to Z) for z = 0.0 to 4.0
  const zTableRows = Array.from({ length: 41 }, (_, i) => {
    const zVal = i / 10;
    const zStr = zVal.toFixed(1);
    const cols = Array.from({ length: 10 }, (_, j) => {
      const fullZ = zVal + j * 0.01;
      const val = normalCDF(fullZ) - 0.5;
      if (val <= 0) return "0";
      return val.toFixed(5);
    });
    return { zStr, cols };
  });

  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-4">

      {/* 1. PROBABILITY OF TWO EVENTS */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Probability of Two Events
        </h2>
        <p>
          Probability quantifies the likelihood of a specific event occurring within a defined sample space of possible outcomes. Expressed as a real number on the closed interval [0, 1], a probability of 0 indicates an impossible outcome, whereas 1 represents absolute certainty. In classical probability theory, the probability of an event E is determined by the ratio of favorable outcomes to the total number of equiprobable outcomes in the sample space:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P(E) = n(E) / n(S)
        </div>
        <p>
          When analyzing two distinct events, A and B, the relationship between them depends heavily on whether they are independent (the occurrence of one does not alter the likelihood of the other), mutually exclusive (they cannot occur simultaneously), or conditionally dependent. The calculator above evaluates all primary joint set operations for two independent events, including complementary probabilities, intersections, inclusive unions, symmetric differences (exclusive OR), and un-occurred complements.
        </p>
      </section>

      {/* 2. COMPLEMENT OF A AND B */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Complement of A and B
        </h2>
        <p>
          The complement of an event A, denoted as <strong>P(A&apos;)</strong> or <strong>P(Aᶜ)</strong>, represents the probability that event A does NOT occur. By the fundamental law of total probability, the sum of an event and its complement across the entire sample space must equal 1:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P(A&apos;) = 1 - P(A)
        </div>
        <p>
          For instance, if a manufacturing line has a quality defect probability of <strong>P(A) = 0.04</strong> (a 4% defect rate), the probability that a randomly sampled unit is non-defective is calculated as:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P(A&apos;) = 1 - 0.04 = 0.96 (or 96%)
        </div>
        <p>
          Similarly, the complement of event B is computed as <strong>P(B&apos;) = 1 - P(B)</strong>. It is important to recognize that unless A and B form a complete two-set partition of the sample space, P(A) and P(B) operate independently, so P(A&apos;) and P(B&apos;) measure separate non-occurrence probabilities.
        </p>
      </section>

      {/* 3. INTERSECTION OF A AND B */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Intersection of A and B
        </h2>
        <p>
          The intersection of two events A and B, written as <strong>P(A ∩ B)</strong> or <strong>P(A AND B)</strong>, evaluates the joint probability that both event A and event B occur concurrently. If A and B are mutually exclusive, they share no sample points, rendering <strong>P(A ∩ B) = 0</strong> (such as rolling a single die and landing on both 2 and 5 simultaneously).
        </p>
        <p>
          When events A and B are statistically independent, the joint probability simplifies to the product of their individual probabilities:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P(A ∩ B) = P(A) × P(B)
        </div>

        {/* Intersection Venn SVG */}
        <div className="flex justify-center py-2">
          <svg width="200" height="120" viewBox="0 0 200 120" className="border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
            <circle cx="80" cy="60" r="45" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
            <circle cx="120" cy="60" r="45" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
            <path d="M 100 20 A 45 45 0 0 1 100 100 A 45 45 0 0 1 100 20 Z" fill="#2563eb" />
            <text x="60" y="65" textAnchor="middle" className="font-bold text-xs font-sans fill-slate-900 dark:fill-slate-100">A</text>
            <text x="140" y="65" textAnchor="middle" className="font-bold text-xs font-sans fill-slate-900 dark:fill-slate-100">B</text>
          </svg>
        </div>

        <p>
          For dependent events, conditional probability governs the outcome: <strong>P(A ∩ B) = P(A) × P(B|A)</strong>, where P(B|A) represents the probability of B occurring given that A has already transpired. Consider an urn containing 12 balls: 8 red and 4 blue. If two balls are drawn sequentially without replacement:
        </p>
        <div className="font-sans tabular-nums font-medium text-xs pl-4 space-y-1">
          <p>Probability of first ball being red: P(A) = 8/12 = 2/3</p>
          <p>Probability of second ball being blue given first was red: P(B|A) = 4/11</p>
          <p>Joint intersection probability P(A ∩ B) = (8/12) × (4/11) = 32/132 ≈ 0.2424</p>
        </div>
      </section>

      {/* 4. UNION OF A AND B */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Union of A and B
        </h2>
        <p>
          The union of two events, denoted by <strong>P(A ∪ B)</strong> or <strong>P(A OR B)</strong>, measures the probability that at least one of the events occurs. In standard probability theory, this represents the inclusive OR condition—meaning event A occurs, event B occurs, or both occur simultaneously.
        </p>
        <p>
          For mutually exclusive events where no overlap exists:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P(A ∪ B) = P(A) + P(B)
        </div>

        {/* Mutually Exclusive Union SVG */}
        <div className="flex justify-center py-2">
          <svg width="220" height="110" viewBox="0 0 220 110" className="border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
            <circle cx="65" cy="55" r="40" fill="#2563eb" opacity="0.8" stroke="#334155" strokeWidth="1.5" />
            <circle cx="155" cy="55" r="40" fill="#2563eb" opacity="0.8" stroke="#334155" strokeWidth="1.5" />
            <text x="65" y="60" textAnchor="middle" className="font-bold text-xs font-sans fill-white">A</text>
            <text x="155" y="60" textAnchor="middle" className="font-bold text-xs font-sans fill-white">B</text>
          </svg>
        </div>

        <p>
          For non-mutually exclusive events, simply adding P(A) and P(B) double-counts the overlapping intersection region. To correct for this, the general Principle of Inclusion-Exclusion is applied:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
        </div>

        {/* Overlapping Union SVG */}
        <div className="flex justify-center py-2">
          <svg width="200" height="120" viewBox="0 0 200 120" className="border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
            <circle cx="80" cy="60" r="45" fill="#2563eb" opacity="0.8" stroke="#334155" strokeWidth="1.5" />
            <circle cx="120" cy="60" r="45" fill="#2563eb" opacity="0.8" stroke="#334155" strokeWidth="1.5" />
            <text x="65" y="65" textAnchor="middle" className="font-bold text-xs font-sans fill-white">A</text>
            <text x="135" y="65" textAnchor="middle" className="font-bold text-xs font-sans fill-white">B</text>
          </svg>
        </div>

        <p>
          For example, when rolling a fair 6-sided die (sample space S = &#123;1,2,3,4,5,6&#125;), let event A be rolling an even number (P(A) = 3/6) and event B be rolling a number greater than 3 (P(B) = 3/6 = &#123;4,5,6&#125;). The intersection is &#123;4,6&#125; (P(A ∩ B) = 2/6). The union probability is calculated as:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P(A ∪ B) = 3/6 + 3/6 - 2/6 = 4/6 = 2/3 ≈ 0.6667
        </div>
      </section>

      {/* 5. EXCLUSIVE OR OF A AND B */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Exclusive OR of A and B
        </h2>
        <p>
          The Exclusive OR operation, denoted as <strong>P(A Δ B)</strong> or <strong>P(A XOR B)</strong>, measures the probability that exactly one of the two events occurs, excluding the possibility of both occurring simultaneously. Mathematically, it subtracts twice the joint intersection from the sum of the individual probabilities:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P(A Δ B) = P(A) + P(B) - 2 × P(A ∩ B)
        </div>

        {/* XOR Venn SVG */}
        <div className="flex justify-center py-2">
          <svg width="200" height="120" viewBox="0 0 200 120" className="border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
            <circle cx="80" cy="60" r="45" fill="#2563eb" opacity="0.8" stroke="#334155" strokeWidth="1.5" />
            <circle cx="120" cy="60" r="45" fill="#2563eb" opacity="0.8" stroke="#334155" strokeWidth="1.5" />
            <path d="M 100 20 A 45 45 0 0 1 100 100 A 45 45 0 0 1 100 20 Z" fill="#ffffff" stroke="#334155" strokeWidth="1" />
            <text x="65" y="65" textAnchor="middle" className="font-bold text-xs font-sans fill-white">A</text>
            <text x="135" y="65" textAnchor="middle" className="font-bold text-xs font-sans fill-white">B</text>
          </svg>
        </div>

        <p>
          Consider a dual-server cloud infrastructure where Server A has an uptime probability of <strong>P(A) = 0.95</strong> and Server B has an uptime probability of <strong>P(B) = 0.90</strong>. Assuming independent operation, the joint uptime is <strong>P(A ∩ B) = 0.95 × 0.90 = 0.855</strong>. The probability that exactly one server is running while the other is down is:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P(A Δ B) = 0.95 + 0.90 - 2 × 0.855 = 1.85 - 1.71 = 0.14 (or 14%)
        </div>
      </section>

      {/* 6. PROBABILITY OF A SERIES OF INDEPENDENT EVENTS */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Probability of a Series of Independent Events
        </h2>
        <p>
          Evaluating repeated trials of independent events involves exponential power laws. If event A has a single-trial probability p and is repeated n times, and event B has a single-trial probability q and is repeated m times, the compound outcomes follow distinct binomial probability rules:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 font-sans tabular-nums text-xs">
          <li><strong>All n trials of A succeed:</strong> P(A<sup>n</sup>) = p<sup>n</sup></li>
          <li><strong>Zero trials of A succeed:</strong> P(A&apos;)<sup>n</sup> = (1 - p)<sup>n</sup></li>
          <li><strong>At least one trial of A succeeds:</strong> 1 - (1 - p)<sup>n</sup></li>
          <li><strong>Both A succeeds n times and B succeeds m times:</strong> p<sup>n</sup> × q<sup>m</sup></li>
          <li><strong>Neither series succeeds:</strong> (1 - p)<sup>n</sup> × (1 - q)<sup>m</sup></li>
        </ul>
      </section>

      {/* 7. NORMAL DISTRIBUTION */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Normal Distribution
        </h2>
        <p>
          The normal distribution, or Gaussian distribution, is a continuous probability distribution characterized by a symmetric, bell-shaped curve defined by its mean (<strong>μ</strong>) and variance (<strong>σ²</strong>). The probability density function (PDF) is given by:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          f(x) = (1 / (σ √(2π))) × e<sup>-0.5 × ((x - μ) / σ)²</sup>
        </div>
        <p>
          In standard normal form where <strong>μ = 0</strong> and <strong>σ = 1</strong>, raw data values X are transformed into standard Z-scores representing the distance from the mean in units of standard deviation:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          Z = (X - μ) / σ
        </div>

        {/* Normal Curve Graphic */}
        <div className="flex justify-center py-2">
          <svg width="240" height="110" viewBox="0 0 240 110" className="border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
            <path d="M 20 90 L 48.5 90 L 48.5 86.8 L 77.1 79.5 L 105.7 45 L 134.3 45 L 162.8 79.5 L 162.8 90 L 220 90 Z" fill="#93c5fd" opacity="0.6" />
            <line x1="10" y1="90" x2="230" y2="90" stroke="#334155" strokeWidth="1.5" />
            <path d="M 10 90 Q 60 90 90 50 Q 120 10 150 50 Q 180 90 230 90" fill="none" stroke="#2563eb" strokeWidth="2" />
            <line x1="120" y1="20" x2="120" y2="90" stroke="#2563eb" strokeDasharray="3 3" />
            <text x="48.5" y="105" textAnchor="middle" className="text-[10px] font-sans tabular-nums font-bold fill-slate-700">-2</text>
            <text x="84.2" y="105" textAnchor="middle" className="text-[10px] font-sans tabular-nums font-bold fill-slate-700">-1</text>
            <text x="120" y="105" textAnchor="middle" className="text-[10px] font-sans tabular-nums font-bold fill-slate-700">0</text>
            <text x="162.8" y="105" textAnchor="middle" className="text-[10px] font-sans tabular-nums font-bold fill-slate-700">1</text>
            <text x="191.4" y="105" textAnchor="middle" className="text-[10px] font-sans tabular-nums font-bold fill-slate-700">2</text>
            <text x="220" y="105" textAnchor="middle" className="text-[10px] font-sans tabular-nums font-bold fill-slate-700">3</text>
          </svg>
        </div>

        <p>
          According to the empirical rule (68-95-99.7 rule), approximately 68.27% of all observations fall within 1 standard deviation of the mean (-1 ≤ Z ≤ 1), 95.45% fall within 2 standard deviations (-2 ≤ Z ≤ 2), and 99.73% fall within 3 standard deviations (-3 ≤ Z ≤ 3).
        </p>
      </section>

      {/* 8. Z TABLE FROM MEAN (0 TO Z) */}
      <section className="space-y-3 pt-2">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Z Table from Mean (0 to Z)
        </h2>
        <p>
          The lookup table below displays the cumulative area under the standard normal curve between the mean (Z = 0) and positive values of Z up to 4.0:
        </p>
        <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded">
          <table className="w-full text-[11px] font-sans tabular-nums text-center border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 font-bold">
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">z</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.01</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.02</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.03</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.04</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.05</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.06</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.07</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.08</th>
                <th className="p-1">0.09</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {zTableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-slate-50/50 dark:bg-slate-800/30" : ""}>
                  <td className="p-1 font-bold bg-slate-100 dark:bg-slate-800 border-r border-slate-300 dark:border-slate-700">{row.zStr}</td>
                  {row.cols.map((val, j) => (
                    <td key={j} className="p-1 border-r border-slate-200 dark:border-slate-800 last:border-r-0">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </article>
  );
}
