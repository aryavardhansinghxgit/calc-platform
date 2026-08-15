"use client";

import React from "react";

export function RandomContent() {
  return (
    <article className="prose dark:prose-invert max-w-none space-y-8 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed pt-6  dark:border-zinc-800">
      {/* 1. INTRODUCTION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <span>1.</span> What Is A Random Number Generator?
        </h2>
        <p>
          A <strong>Random Number Generator (RNG)</strong> is a computational algorithm or hardware device designed to generate a sequence of numbers or symbols that lack any discernible pattern, predictability, or deterministic trend.
        </p>
        <p>
          Random number generation is a foundational pillar of computer science, cryptography, statistical sampling, video gaming, financial modeling, and scientific research.
        </p>
      </section>

      {/* 2. CORE CONCEPT */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <span>2.</span> Core Mathematical Concept
        </h2>
        <p>
          In a true uniform random distribution over an interval [a, b], every single number in the range has an equal probability density function:
        </p>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold">
          {"f(x) = 1 / (b - a)   for a ≤ x ≤ b"}
        </div>
      </section>

      {/* 3. ALGORITHMIC EXPLANATION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <span>3.</span> PRNG vs TRNG & WebCrypto
        </h2>
        <p>Random number generators fall into two primary architectural classifications:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400">Pseudo-Random Number Generators (PRNG)</h3>
            <p className="text-[11px]">
              Algorithms (such as Mersenne Twister or Linear Congruential Generators) that use deterministic mathematical formulas starting from an initial seed value. They are fast, reproducible, and suitable for simulation.
            </p>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400">Cryptographically Secure PRNG (CSPRNG)</h3>
            <p className="text-[11px]">
              Uses hardware entropy sources (thermal noise, CPU timing jitter, OS entropy pools) via the Web Crypto API ({"crypto.getRandomValues"}). Unpredictable even if past outputs are known.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FORMULA BREAKDOWN */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <span>4.</span> Range Scaling Formula
        </h2>
        <p>
          To map a uniform random proportion r ∈ [0, 1) into an arbitrary range [Min, Max]:
        </p>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold">
          {"Random Value = Min + [r × (Max - Min)]"}
        </div>
        <p>
          For integers, the floor function is applied: {"Math.floor(Min + r × (Max - Min + 1))"}.
        </p>
      </section>

      {/* 5. HOW CALCULATION WORKS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <span>5.</span> Step-by-Step Generation Process
        </h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Initialize range boundaries (Min, Max) and desired sample count (N).</li>
          <li>Query entropy pool or PRNG algorithm for uniform float proportion r.</li>
          <li>Scale float using range formula and round to specified precision or integer.</li>
          <li>Enforce unique set constraint if unique sampling is requested.</li>
          <li>Calculate sample mean (μ), standard deviation (σ), and bin frequencies.</li>
        </ol>
      </section>

      {/* 6. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <span>6.</span> Worked Mathematical Examples
        </h2>

        <div className="space-y-4">
          {/* BASIC EXAMPLE */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">Basic Example: Roll a 6-Sided Die (Min=1, Max=6)</h3>
            <ol className="list-decimal pl-6 space-y-1 text-xs">
              <li>Random float r = 0.7321.</li>
              <li>Scale range: 1 + Math.floor(0.7321 × 6) = 1 + Math.floor(4.3926) = 1 + 4 = 5.</li>
            </ol>
            <div className="text-xs font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">Result: 5</div>
          </div>

          {/* INTERMEDIATE EXAMPLE */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">Intermediate Example: Generate 5 Unique Lottery Numbers (1 to 49)</h3>
            <ol className="list-decimal pl-6 space-y-1 text-xs">
              <li>Initialize set = {"{}"}. Repeatedly sample integers between 1 and 49.</li>
              <li>Generated sample values: 7, 14, 23, 38, 42. No duplicate entries.</li>
            </ol>
            <div className="text-xs font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">Result: 7, 14, 23, 38, 42</div>
          </div>

          {/* ADVANCED EXAMPLE */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">Advanced Example: Box-Muller Gaussian Normal Transform</h3>
            <ol className="list-decimal pl-6 space-y-1 text-xs">
              <li>Given independent uniform floats u1 = 0.45, u2 = 0.82.</li>
              <li>Transform: Z = √(-2 ln 0.45) × cos(2π × 0.82) = 1.2636 × 0.3812 = +0.4817.</li>
              <li>Scale by desired mean (100) and std dev (15): 100 + (0.4817 × 15) = 107.23.</li>
            </ol>
            <div className="text-xs font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">Result: 107.23 (Gaussian IQ Sample)</div>
          </div>
        </div>
      </section>

      {/* 7. VISUAL UNDERSTANDING */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <span>7.</span> Visualizing Random Frequency Histograms
        </h2>
        <p>
          In a fair uniform random generator, as the sample count N grows large (e.g. N = 10,000), the height of every bin in a frequency histogram approaches an equal flat height. Deviations from flatness reveal bias or non-uniformity.
        </p>
      </section>

      {/* 8. COMMON MISTAKES */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <span>8.</span> Common Fallacies & Misconceptions
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>The Gambler's Fallacy:</strong> Believing that if an outcome (like Heads) has occurred repeatedly, Tails is {"due"} to occur next. True random events have no memory.
          </li>
          <li>
            <strong>The Clustering Illusion:</strong> Expecting random samples to look evenly spaced. True randomness naturally forms spatial and temporal clusters.
          </li>
          <li>
            <strong>Modulo Bias:</strong> Using {"Math.random() % N"} which distorts uniform probability if the range is not an exact power of 2.
          </li>
        </ul>
      </section>

      {/* 9. REAL-WORLD APPLICATIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <span>9.</span> Practical Applications
        </h2>
        <p>
          RNGs power AES/RSA key generation in cryptography, Monte Carlo financial simulations (option pricing), randomized clinical trial drug assignments, procedural game world generation, and A/B testing user assignment.
        </p>
      </section>

      {/* 10. ADVANCED CONCEPTS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <span>10.</span> Advanced Statistical Tests: Kolmogorov-Smirnov Test
        </h2>
        <p>
          To rigorously verify whether a random generator produces a true uniform distribution, statisticians evaluate the <strong>Kolmogorov-Smirnov (K-S) Test</strong> and the <strong>Diehard Battery of Tests</strong>.
        </p>
      </section>

      {/* 11. RELATED CONCEPTS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <span>11.</span> Related Mathematical Topics
        </h2>
        <p>
          Explore related topics: <a href="/calculators/probability-calculator" className="text-blue-600 dark:text-blue-400 font-bold underline">Probability Calculator</a>, <a href="/calculators/statistics-calculator" className="text-blue-600 dark:text-blue-400 font-bold underline">Statistics Calculator</a>, and <a href="/calculators/standard-deviation-calculator" className="text-blue-600 dark:text-blue-400 font-bold underline">Standard Deviation Calculator</a>.
        </p>
      </section>

      {/* 12. SUMMARY */}
      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Educational Summary</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Random number generators convert hardware entropy or pseudo-random mathematical algorithms into uniform, unpredictable sequences. Understanding PRNG vs WebCrypto CSPRNG ensures both statistical validity in simulations and unbreakable security in cryptography.
        </p>
      </section>
    </article>
  );
}
