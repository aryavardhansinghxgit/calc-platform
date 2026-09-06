"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, ArrowRight, Activity, Calculator, CheckCircle2 } from "lucide-react";
import { half_life_calculatorFaqs } from "@/app/calculators/half-life-calculator/faq";

export function HalfLifeContent() {
  // All 15 FAQs open by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 15 }, (_, i) => i))
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
      {/* 3. RELATED CALCULATORS — TOP BLOCK */}
      <div className="pb-4">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Related Calculators:
          </span>
          <Link
            href="/calculators/exponent-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-0.5"
          >
            Exponent Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-600 font-bold">|</span>
          <Link
            href="/calculators/log-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-0.5"
          >
            Log Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-600 font-bold">|</span>
          <Link
            href="/calculators/scientific-notation-calculator"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-0.5"
          >
            Scientific Notation Calculator
          </Link>
        </div>
      </div>

      {/* 4. MAIN LONG-FORM EDUCATIONAL ARTICLE */}
      <div className="pt-8 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1: What Is Half-Life? */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is Half-Life?
          </h2>
          <p>
            Half-life is the amount of time required for the quantity or activity of a radioactive substance to decrease to one-half of its initial value. For a particular radionuclide, the radiological half-life is a characteristic property of the isotope. Individual radioactive decay events are unpredictable, but the statistical behavior of a large population of radioactive atoms follows a predictable decay law.
          </p>
          <p>
            This distinction is important. A half-life does not mean that every individual atom waits exactly the same amount of time before decaying. Instead, after one half-life, about half of the original radioactive population remains; after two half-lives, one-quarter remains; after three, one-eighth remains, and so on.
          </p>
          <p>
            That repeated halving is why a half-life calculator is useful. Rather than calculating each decay interval manually, you can enter an initial quantity, half-life, and elapsed time and obtain the remaining quantity immediately. This calculator can also work backward to determine an unknown initial quantity, half-life, or elapsed time.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
              Half-Life in One Simple Example
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Suppose a radioactive sample starts with 100 g and has a half-life of 10 years:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans tabular-nums text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-bold">
                    <th className="py-1.5 pr-4">Time Elapsed</th>
                    <th className="py-1.5 pr-4">Half-Lives Elapsed</th>
                    <th className="py-1.5">Amount Remaining</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  <tr><td className="py-1.5 pr-4">0 years</td><td className="py-1.5 pr-4">0</td><td className="py-1.5 text-blue-600 dark:text-blue-400 font-bold">100 g</td></tr>
                  <tr><td className="py-1.5 pr-4">10 years</td><td className="py-1.5 pr-4">1</td><td className="py-1.5">50 g</td></tr>
                  <tr><td className="py-1.5 pr-4">20 years</td><td className="py-1.5 pr-4">2</td><td className="py-1.5">25 g</td></tr>
                  <tr><td className="py-1.5 pr-4">30 years</td><td className="py-1.5 pr-4">3</td><td className="py-1.5">12.5 g</td></tr>
                  <tr><td className="py-1.5 pr-4">40 years</td><td className="py-1.5 pr-4">4</td><td className="py-1.5">6.25 g</td></tr>
                  <tr><td className="py-1.5 pr-4">50 years</td><td className="py-1.5 pr-4">5</td><td className="py-1.5">3.125 g</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 italic">
              Notice that the same fraction (50%) is removed during each half-life, but the absolute amount removed becomes smaller over time.
            </p>
          </div>
        </section>

        {/* Section 2: Half-Life Formula and Radioactive Decay Equation */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Half-Life Formula and Radioactive Decay Equation
          </h2>
          <p>
            The standard half-life form of the exponential decay equation is:
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-center text-sm font-bold text-blue-600 dark:text-blue-400">
            N(t) = N₀ × (1/2)^(t / t½)
          </div>
          <p>where:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li><strong>N(t)</strong> = quantity remaining after time <em>t</em></li>
            <li><strong>N₀</strong> = initial starting quantity</li>
            <li><strong>t</strong> = elapsed time</li>
            <li><strong>t½ (or T₁/₂)</strong> = half-life duration</li>
          </ul>
          <p>
            The exponent <strong>n = t / t½</strong> represents the number of half-lives that have elapsed. The calculator explicitly exposes this quantity because it gives the easiest physical interpretation of the calculation.
          </p>
          <p>
            For example, if <strong>N₀ = 100</strong>, <strong>t½ = 5,730 years</strong>, and <strong>t = 11,460 years</strong>, then:
          </p>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <div>n = 11,460 / 5,730 = 2 cycles</div>
            <div>N(t) = 100 × (1/2)² = 100 × 0.25 = 25 g (25% remaining)</div>
          </div>
          <p>
            The calculator verifies exactly this type of calculation and reports the half-lives elapsed, remaining quantity, and remaining percentage together.
          </p>
        </section>

        {/* Section 3: Half-Life as Repeated Halving */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Half-Life as Repeated Halving
          </h2>
          <p>
            One of the easiest ways to understand radioactive decay is to think in terms of repeated halving rather than a continuously changing exponential equation:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">1 half-life</span> 50% remains
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">2 half-lives</span> 25% remains
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">3 half-lives</span> 12.5% remains
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">4 half-lives</span> 6.25% remains
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">5 half-lives</span> 3.125% remains
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">10 half-lives</span> 0.0977% remains
            </div>
          </div>
          <p>
            The general percentage remaining is given by: <strong>Percent remaining = 100 × (1/2)ⁿ</strong>, where <em>n</em> is the number of elapsed half-lives.
          </p>
          <p>
            This is why a substance may become extremely small without becoming exactly zero. For ideal exponential radioactive decay, <strong>N(t) &gt; 0</strong> for every finite <em>t</em>, while <strong>N(t) → 0</strong> only as <strong>t → ∞</strong>. The calculator therefore uses adaptive scientific notation for extremely small non-zero quantities rather than incorrectly displaying them as zero. For very large or very small decay quantities, our{" "}
            <Link href="/calculators/scientific-notation-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Scientific Notation Calculator
            </Link>{" "}
            can help with alternate number representations.
          </p>
        </section>

        {/* Section 4: How to Calculate Remaining Quantity */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            4. How to Calculate Remaining Quantity
          </h2>
          <p>
            To calculate the amount remaining, you need three input parameters: Initial quantity (<em>N₀</em>), Half-life (<em>t½</em>), and Elapsed time (<em>t</em>).
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
              Example: Carbon-14 Decay
            </h3>
            <p className="text-xs">
              Carbon-14 has a commonly used half-life of approximately 5,730 years. NIST describes carbon-14 decay as the physical basis of radiocarbon dating. Suppose a sample initially contains 100 g of carbon-14 and 11,460 years have passed:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-xs font-mono">
              <li>Calculate number of half-lives: n = 11,460 / 5,730 = 2</li>
              <li>Apply exponential factor: (1/2)² = 0.25</li>
              <li>Evaluate remaining mass: N(t) = 100 × 0.25 = 25 g (25% remaining)</li>
            </ol>
          </div>
          <p>
            The same method works with quantities measured as mass (g, mg, kg), number of atoms, activity (Bq, Ci), or moles, provided the underlying quantity follows exponential radioactive decay. To work with exponential powers directly, see our{" "}
            <Link href="/calculators/exponent-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Exponent Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 5: Solving for Half-Life */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Solving for Half-Life
          </h2>
          <p>
            When the half-life itself is the unknown variable, take the natural logarithm of both sides of the decay formula:
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-center text-sm font-bold text-blue-600 dark:text-blue-400">
            t½ = t × ln(2) / ln(N₀ / N(t))
          </div>
          <p>
            For example, suppose an initial sample of <strong>N₀ = 100</strong> decays to <strong>N(t) = 25</strong> after <strong>t = 20 years</strong>:
          </p>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <div>t½ = 20 × ln(2) / ln(100 / 25) = 20 × 0.693147 / 1.386294 = 10 years</div>
          </div>
          <p>
            The calculator&apos;s inverse solver determines this directly and automatically converts the result into your chosen time unit (seconds, minutes, hours, days, or years). For logarithmic rearrangements of the half-life equation, use our{" "}
            <Link href="/calculators/log-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline">
              Log Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 6: Solving for Elapsed Time */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Solving for Elapsed Time
          </h2>
          <p>
            The elapsed time can also be calculated when initial quantity, remaining quantity, and half-life are known:
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-center text-sm font-bold text-blue-600 dark:text-blue-400">
            t = t½ × [ln(N₀ / N(t)) / ln(2)]
          </div>
          <p>
            For example, if <strong>N₀ = 100</strong>, <strong>N(t) = 12.5</strong>, and <strong>t½ = 10 years</strong>:
          </p>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs">
            Since 12.5 / 100 = 1/8 = (1/2)³, exactly 3 half-lives have passed: t = 3 × 10 = 30 years.
          </div>
        </section>

        {/* Section 7: Solving for the Initial Quantity */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Solving for the Initial Quantity
          </h2>
          <p>
            If the remaining quantity after an elapsed period is known, working backward yields the initial starting amount:
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-center text-sm font-bold text-blue-600 dark:text-blue-400">
            N₀ = N(t) × 2^(t / t½)
          </div>
          <p>
            For example, if 25 g remains after 20 years and the isotope&apos;s half-life is 10 years, exactly <strong>20 / 10 = 2 half-lives</strong> have occurred: <strong>N₀ = 25 × (2²) = 100 g</strong>.
          </p>
        </section>

        {/* Section 8: Decay Constant and the Exponential Form */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Decay Constant and the Exponential Form
          </h2>
          <p>
            Radioactive decay is commonly written in continuous exponential form using the decay constant <strong>λ</strong> (lambda):
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-center text-sm font-bold text-blue-600 dark:text-blue-400">
            N(t) = N₀ × e^(-λt)
          </div>
          <p>
            The fundamental relationship between half-life and decay constant is:
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-center text-sm font-bold text-blue-600 dark:text-blue-400">
            λ = ln(2) / t½ ≈ 0.693147 / t½
          </div>
          <p>
            The units of λ are reciprocal time. When half-life is measured in years, λ has units of <strong>year⁻¹</strong>; in seconds, it is <strong>s⁻¹</strong>. For a half-life of 10 years, <strong>λ = ln(2) / 10 ≈ 0.0693147 year⁻¹</strong>. This calculator includes a dedicated Decay Constant &amp; Mean Lifetime Converter card to convert between units automatically.
          </p>
        </section>

        {/* Section 9: Half-Life and Mean Lifetime */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Half-Life and Mean Lifetime
          </h2>
          <p>
            The mean lifetime <strong>τ</strong> (tau) represents the average lifespan of an individual radioactive nucleus before it decays:
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-center text-sm font-bold text-blue-600 dark:text-blue-400">
            τ = 1 / λ = t½ / ln(2) ≈ 1.4427 × t½
          </div>
          <p>
            Mean lifetime is approximately 44.27% longer than half-life. For Carbon-14 (t½ ≈ 5,730 years), the mean lifetime is approximately 8,267 years. The IAEA highlights this fundamental distinction:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li><strong>Half-Life (t½):</strong> Time required for half of the sample nuclei to decay.</li>
            <li><strong>Mean Lifetime (τ):</strong> Mathematical expectation value of lifetime for an unstable nucleus.</li>
          </ul>
        </section>

        {/* Section 10: Understanding the Half-Life Decay Graph */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Understanding the Half-Life Decay Graph
          </h2>
          <p>
            The decay graph is exponential rather than linear. At t = 0, N(0) = N₀. After one cycle, N(t½) = N₀/2; after two, N(2t½) = N₀/4. The curve decreases steeply at first, then becomes progressively flatter as the remaining quantity shrinks.
          </p>
          <p>
            This calculator&apos;s interactive SVG chart dynamically scales its horizontal axis between 5 and 20 half-lives based on your input. Calculations beyond 20 half-lives receive an explicit out-of-scale indicator rather than a falsely clamped marker, ensuring visual fidelity.
          </p>
        </section>

        {/* Section 11: Half-Life Decay Table */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Half-Life Decay Table (0 to 10 Cycles)
          </h2>
          <p>
            For an initial amount <strong>N₀ = 100</strong>, the remaining quantity follows exact powers of 1/2:
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left border-collapse font-sans tabular-nums text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-bold">
                  <th className="p-2.5">Half-Lives (n)</th>
                  <th className="p-2.5">Fraction Remaining</th>
                  <th className="p-2.5">Percentage Remaining</th>
                  <th className="p-2.5">Amount (N₀ = 100)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr><td className="p-2.5 font-bold">0 t½</td><td className="p-2.5">1</td><td className="p-2.5">100%</td><td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">100.00</td></tr>
                <tr><td className="p-2.5 font-bold">1 t½</td><td className="p-2.5">1/2</td><td className="p-2.5">50%</td><td className="p-2.5">50.00</td></tr>
                <tr><td className="p-2.5 font-bold">2 t½</td><td className="p-2.5">1/4</td><td className="p-2.5">25%</td><td className="p-2.5">25.00</td></tr>
                <tr><td className="p-2.5 font-bold">3 t½</td><td className="p-2.5">1/8</td><td className="p-2.5">12.5%</td><td className="p-2.5">12.50</td></tr>
                <tr><td className="p-2.5 font-bold">4 t½</td><td className="p-2.5">1/16</td><td className="p-2.5">6.25%</td><td className="p-2.5">6.25</td></tr>
                <tr><td className="p-2.5 font-bold">5 t½</td><td className="p-2.5">1/32</td><td className="p-2.5">3.125%</td><td className="p-2.5">3.125</td></tr>
                <tr><td className="p-2.5 font-bold">6 t½</td><td className="p-2.5">1/64</td><td className="p-2.5">1.5625%</td><td className="p-2.5">1.5625</td></tr>
                <tr><td className="p-2.5 font-bold">7 t½</td><td className="p-2.5">1/128</td><td className="p-2.5">0.78125%</td><td className="p-2.5">0.7813</td></tr>
                <tr><td className="p-2.5 font-bold">8 t½</td><td className="p-2.5">1/256</td><td className="p-2.5">0.390625%</td><td className="p-2.5">0.3906</td></tr>
                <tr><td className="p-2.5 font-bold">9 t½</td><td className="p-2.5">1/512</td><td className="p-2.5">0.1953125%</td><td className="p-2.5">0.1953</td></tr>
                <tr><td className="p-2.5 font-bold">10 t½</td><td className="p-2.5">1/1024</td><td className="p-2.5">0.09765625%</td><td className="p-2.5">0.0977</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            After 10 half-lives, the original quantity has not reached zero, but less than 1/1000th of the original radioactive material remains.
          </p>
        </section>

        {/* Section 12: Random Decay vs Population Predictability */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Radioactive Decay Is Random for Individual Atoms but Predictable for Populations
          </h2>
          <p>
            A common misconception is that radioactive decay behaves like a countdown clock for each individual atom. In quantum reality, you cannot predict the exact moment a specific unstable nucleus will undergo decay. What physics can predict with remarkable precision is the statistical behavior of a macroscopic ensemble of billions of nuclei.
          </p>
          <p>
            The IAEA emphasizes this distinction: although quantum decay events are inherently stochastic, the collective decay rate follows an exact statistical law.
          </p>
        </section>

        {/* Section 13: Half-Life of Common Radioisotopes */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Half-Life of Common Radioisotopes
          </h2>
          <p>
            The calculator includes ten authoritative isotope presets so common values can be selected instantly:
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left border-collapse font-sans tabular-nums text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-bold">
                  <th className="p-2.5">Radioisotope</th>
                  <th className="p-2.5">Approximate Half-Life</th>
                  <th className="p-2.5">Main Decay Mode</th>
                  <th className="p-2.5">Primary Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                <tr><td className="p-2.5 font-bold">Carbon-14 (¹⁴C)</td><td className="p-2.5 text-blue-600 dark:text-blue-400">5,730 years</td><td className="p-2.5">Beta-minus (β⁻)</td><td className="p-2.5">Radiocarbon dating of organic matter</td></tr>
                <tr><td className="p-2.5 font-bold">Uranium-238 (²³⁸U)</td><td className="p-2.5 text-blue-600 dark:text-blue-400">4.468 billion years</td><td className="p-2.5">Alpha (α)</td><td className="p-2.5">Geological rock dating &amp; nuclear power</td></tr>
                <tr><td className="p-2.5 font-bold">Iodine-131 (¹³¹I)</td><td className="p-2.5 text-blue-600 dark:text-blue-400">8.02 days</td><td className="p-2.5">Beta-minus &amp; Gamma</td><td className="p-2.5">Thyroid ablation &amp; cancer radiotherapy</td></tr>
                <tr><td className="p-2.5 font-bold">Cesium-137 (¹³⁷Cs)</td><td className="p-2.5 text-blue-600 dark:text-blue-400">30.17 years</td><td className="p-2.5">Beta-minus &amp; Gamma</td><td className="p-2.5">Industrial gauges &amp; environmental fallout tracing</td></tr>
                <tr><td className="p-2.5 font-bold">Radium-226 (²²⁶Ra)</td><td className="p-2.5 text-blue-600 dark:text-blue-400">1,600 years</td><td className="p-2.5">Alpha (α)</td><td className="p-2.5">Historical luminescence &amp; brachytherapy</td></tr>
                <tr><td className="p-2.5 font-bold">Technetium-99m (⁹⁹ᵐTc)</td><td className="p-2.5 text-blue-600 dark:text-blue-400">6.006 hours</td><td className="p-2.5">Gamma (γ)</td><td className="p-2.5">Medical SPECT diagnostic scintigraphy</td></tr>
                <tr><td className="p-2.5 font-bold">Tritium (³H)</td><td className="p-2.5 text-blue-600 dark:text-blue-400">12.32 years</td><td className="p-2.5">Beta-minus (β⁻)</td><td className="p-2.5">Fusion research &amp; self-powered lighting</td></tr>
                <tr><td className="p-2.5 font-bold">Radon-222 (²²²Rn)</td><td className="p-2.5 text-blue-600 dark:text-blue-400">3.823 days</td><td className="p-2.5">Alpha (α)</td><td className="p-2.5">Indoor environmental air safety hazard</td></tr>
                <tr><td className="p-2.5 font-bold">Cobalt-60 (⁶⁰Co)</td><td className="p-2.5 text-blue-600 dark:text-blue-400">5.27 years</td><td className="p-2.5">Beta-minus &amp; Gamma</td><td className="p-2.5">Industrial radiography &amp; medical sterilization</td></tr>
                <tr><td className="p-2.5 font-bold">Potassium-40 (⁴⁰K)</td><td className="p-2.5 text-blue-600 dark:text-blue-400">1.248 billion years</td><td className="p-2.5">Beta &amp; Electron Capture</td><td className="p-2.5">Geochronology (Potassium-Argon rock dating)</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 14: Radiological vs Biological and Effective Half-Life */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Radioactive Half-Life vs Biological and Effective Half-Life
          </h2>
          <p>
            The term half-life carries distinct meanings across nuclear physics, pharmacology, and radiation protection:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
              <h3 className="font-bold text-blue-600 dark:text-blue-400 text-xs sm:text-sm">Radiological Half-Life</h3>
              <p className="text-xs">
                The fixed physical time required for nuclear decay to reduce activity by 50%. Unaffected by temperature, pressure, or chemical bonds.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
              <h3 className="font-bold text-blue-600 dark:text-blue-400 text-xs sm:text-sm">Biological Half-Life</h3>
              <p className="text-xs">
                The time required for an organism to eliminate 50% of a substance via metabolic, renal, or hepatic pathways.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
              <h3 className="font-bold text-blue-600 dark:text-blue-400 text-xs sm:text-sm">Effective Half-Life</h3>
              <p className="text-xs font-mono">
                1/t_eff = 1/t_phys + 1/t_biol. Combines both physical decay and biological excretion in nuclear medicine.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            This tool is primarily a mathematical radiological half-life calculator and should not be used as a clinical dosing or patient-specific tool.
          </p>
        </section>

        {/* Section 15: Unit Consistency Matters */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Unit Consistency Matters
          </h2>
          <p>
            Half-life calculations depend strictly on the ratio <strong>n = t / t½</strong>. Consequently, elapsed time and half-life must share compatible dimensions. For instance, <strong>30 days / 10 days = 3 cycles</strong>, while <strong>720 hours / 240 hours = 3 cycles</strong>. The calculator automatically converts seconds, minutes, hours, days, weeks, months, and years into unified seconds internally to eliminate manual conversion mistakes.
          </p>
        </section>

        {/* Section 16: How to Use This Half-Life Calculator */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            16. How to Use This Half-Life Calculator
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">Step 1: Choose an Isotope</span>
              <p>Select a built-in isotope preset (e.g. Carbon-14) or select Custom Isotope to enter your own parameters.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">Step 2: Choose Variable to Solve</span>
              <p>Select Remaining Quantity N(t), Initial Quantity N₀, Half-Life t½, or Elapsed Time t.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">Step 3: Enter Known Values &amp; Units</span>
              <p>Input the known numerical values and pick your preferred units from the dropdown menus.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">Step 4: Inspect Result &amp; Derivations</span>
              <p>Review the calculated answer, elapsed cycles, decay constant λ, mean lifetime τ, and decay curve.</p>
            </div>
          </div>
        </section>

        {/* Section 17: Worked Example: Finding Remaining Quantity */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Worked Example: Finding Remaining Quantity
          </h2>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
            <p className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
              Problem: A 500 g sample of an isotope has a half-life of 12 years. Calculate the remaining mass after 30 years.
            </p>
            <div className="space-y-1 font-mono text-xs text-slate-700 dark:text-slate-300">
              <div>Step 1: Calculate half-lives elapsed: n = t / t½ = 30 / 12 = 2.5 cycles</div>
              <div>Step 2: Apply half-life equation: N(t) = 500 × (1/2)^(2.5)</div>
              <div>Step 3: Evaluate exponential: (0.5)^2.5 ≈ 0.1767767</div>
              <div className="font-bold text-blue-600 dark:text-blue-400 pt-1">
                Final Result: N(t) ≈ 88.3883 g (17.68% remaining)
              </div>
            </div>
          </div>
          <p className="text-xs">
            This demonstrates that cycles do not have to be integers. Fractional cycles like 0.5, 1.25, and 2.5 are handled with complete floating-point precision.
          </p>
        </section>

        {/* Section 18: Why a Half-Life Calculator Can Be Better Than Manual Calculation */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Why a Half-Life Calculator Can Be Better Than Manual Calculation
          </h2>
          <p>
            Manual calculation with logarithms is valid, but becomes tedious and error-prone when solving inverse variables, converting time scales across days and millennia, evaluating decay constants, or plotting multi-cycle curves. This calculator combines all these tasks with instant live recalculation, step-by-step mathematical proofs, and local history persistence.
          </p>
        </section>

        {/* Section 19: Important Limitations and Interpretation */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Important Limitations and Interpretation
          </h2>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              Scientific &amp; Radiation Safety Notice
            </div>
            <p>
              This is an educational and mathematical modeling tool, not a clinical radiopharmaceutical dosing or nuclear waste licensing system. Remaining quantity does not directly equate to radiation dose or biological hazard, which depends heavily on decay mode (alpha, beta, gamma), energy spectrum, shielding, and exposure pathway. Consult official regulatory bodies (NRC, IAEA, EPA) for health physics and radiation protection protocols.
            </p>
          </div>
        </section>

        {/* Section 21: Key Half-Life Formulas at a Glance */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            21. Key Half-Life Formulas at a Glance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 font-sans block uppercase font-bold">Remaining Quantity</span>
              <div className="font-bold text-blue-600 dark:text-blue-400">N(t) = N₀(1/2)^(t/t½)</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 font-sans block uppercase font-bold">Exponential Form</span>
              <div className="font-bold text-blue-600 dark:text-blue-400">N(t) = N₀e^(-λt)</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 font-sans block uppercase font-bold">Decay Constant (λ)</span>
              <div className="font-bold text-blue-600 dark:text-blue-400">λ = ln(2) / t½</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 font-sans block uppercase font-bold">Mean Lifetime (τ)</span>
              <div className="font-bold text-blue-600 dark:text-blue-400">τ = 1/λ = t½/ln(2)</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 font-sans block uppercase font-bold">Elapsed Cycles</span>
              <div className="font-bold text-blue-600 dark:text-blue-400">n = t / t½</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 font-sans block uppercase font-bold">Percent Remaining</span>
              <div className="font-bold text-blue-600 dark:text-blue-400">P = 100 × (1/2)ⁿ</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 font-sans block uppercase font-bold">Solve for Time</span>
              <div className="font-bold text-blue-600 dark:text-blue-400">t = t½ ln(N₀/Nt)/ln2</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 font-sans block uppercase font-bold">Solve for Half-Life</span>
              <div className="font-bold text-blue-600 dark:text-blue-400">t½ = t ln2 / ln(N₀/Nt)</div>
            </div>
          </div>
        </section>

        {/* Section 22: Final Takeaway */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            22. Final Takeaway
          </h2>
          <p>
            Half-life is fundamentally an exponential-decay concept: once you know the initial quantity and half-life, the number of elapsed cycles dictates the remaining fraction (<strong>Remaining fraction = 2^(-t/t½)</strong>). This Half-Life Calculator combines verified four-way forward and inverse solving with dynamic multi-cycle graphs, ten nuclear isotope presets, unit conversion engines, scientific underflow handling, step-by-step mathematical proofs, and persistent calculation history.
          </p>
        </section>
      </div>

      {/* 20. FREQUENTLY ASKED QUESTIONS SECTION (15 Approved Questions, Unfolded by Default) */}
      <div className="pt-8 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            20. Frequently Asked Questions About Half-Life
          </h2>
        </div>

        <div className="space-y-3">
          {half_life_calculatorFaqs.map((faq, idx) => {
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 23. RELATED CALCULATORS — BOTTOM BLOCK */}
      <div className="pt-8">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Explore Related Calculators:
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              href="/calculators/exponent-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Exponent Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600 font-bold">|</span>
            <Link
              href="/calculators/log-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Log Calculator
            </Link>
            <span className="text-slate-300 dark:text-slate-600 font-bold">|</span>
            <Link
              href="/calculators/scientific-notation-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Scientific Notation Calculator
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default HalfLifeContent;
