"use client";

import React from "react";

export function RandomContent() {
  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-4">

      {/* 1. WHAT IS A RANDOM NUMBER? */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          What is a random number?
        </h2>
        <p>
          A random number is a value selected from a defined pool or sample space where every possible candidate number possesses a mathematically predictable likelihood of selection, yet individual selections exhibit zero discernible pattern or deterministic predictability. In a standard uniform random number pool, every individual candidate within the lower and upper bounds shares an equal probability of being chosen, and successive draws are statistically independent—meaning past selections exert no influence on future draws.
        </p>
        <p>
          However, real-world random phenomena do not always follow a uniform distribution. For instance, measuring student heights in a high school yields data clustered around a median baseline, producing a symmetric normal (bell-curve) distribution rather than a flat probability spread. The generators above operate under a uniform distribution assumption, delivering independently sampled numbers evenly distributed across the designated numerical boundaries.
        </p>
      </section>

      {/* 2. PSEUDO-RANDOM NUMBER GENERATORS (PRNGs) IN COMPUTER SCIENCE */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Pseudo-Random Number Generators (PRNGs) in Computer Science
        </h2>
        <p>
          Digital computers are fundamentally deterministic state machines, incapable of producing non-deterministic randomness purely through algorithmic code. Instead, computer software relies on <strong>Pseudo-Random Number Generators (PRNGs)</strong>—mathematical algorithms (such as the Mersenne Twister or Linear Congruential Generators) that process an initial numeric seed to generate long sequences of numbers whose statistical properties closely approximate true randomness.
        </p>
        <p>
          While PRNG sequences satisfy statistical randomness tests for general simulations and modeling, they remain inherently deterministic: re-initializing the algorithm with the exact same seed reproduces the identical sequence. In contrast, <strong>True Random Number Generators (TRNGs)</strong> measure non-deterministic physical entropy, such as thermal micro-noise, atmospheric interference, or quantum radioactive decay. Modern web browsers incorporate Cryptographically Secure Pseudo-Random Number Generators (CSPRNGs) via WebCrypto APIs (such as <code>crypto.getRandomValues()</code>), combining physical hardware entropy with algorithmic expansion to safeguard encryption keys and token generation.
        </p>
      </section>

      {/* 3. UNIFORM DISTRIBUTIONS VS. NORMAL DISTRIBUTIONS */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Uniform Distributions vs. Normal Distributions
        </h2>
        <p>
          Understanding the difference between uniform and normal probability distributions is crucial when working with random sampling:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs">Uniform Distribution</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Every value within the interval [Min, Max] has an identical probability density: <strong>f(x) = 1 / (Max - Min)</strong>. Common in dice rolls, lottery draws, and unbiased random selection tools.
            </p>
          </div>
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs">Normal (Gaussian) Distribution</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Values cluster symmetrically around the mean (μ) in a bell-shaped curve governed by standard deviation (σ). Extreme outliers are rare, making it ideal for physical measurements, test scores, and biological traits.
            </p>
          </div>
        </div>
      </section>

      {/* 4. APPLICATIONS OF RANDOM NUMBERS */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Applications of Random Numbers
        </h2>
        <p>
          Random number generators serve as foundational tools across technical and scientific disciplines:
        </p>
        <ul className="list-disc pl-5 space-y-2 font-sans text-xs">
          <li>
            <strong>Monte Carlo Simulations:</strong> Executing millions of randomized iterations to model risk, financial option pricing, thermodynamic particle physics, and weather forecasting.
          </li>
          <li>
            <strong>Cryptography & Security:</strong> Generating nonces, salt values, session tokens, and public/private keypairs resistant to brute-force attacks.
          </li>
          <li>
            <strong>Statistical Sampling:</strong> Drawing unbiased subset samples from large population datasets for polling, clinical trials, and machine learning validation.
          </li>
          <li>
            <strong>Gaming & Lotteries:</strong> Ensuring fair, non-deterministic procedural generation, card shuffling, dice rolls, and prize drawings.
          </li>
        </ul>
      </section>

      {/* 5. SUMMARY */}
      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Educational Summary</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Random number generation provides essential non-deterministic inputs for digital modeling, statistical inference, and cryptographic security. Whether constructing simple integer draws or high-precision multi-digit decimal streams, understanding uniform probability distribution parameters ensures accurate application.
        </p>
      </section>

    </article>
  );
}
