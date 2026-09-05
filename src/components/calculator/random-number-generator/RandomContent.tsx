"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, ArrowRight } from "lucide-react";
import { random_number_generatorFaqs } from "@/app/calculators/random-number-generator/faq";

export function RandomContent() {
  // All 13 FAQs open/unfolded by default per 401(k) template specification
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 13 }, (_, i) => i))
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
      {/* 1. RELATED CALCULATORS BLOCK — ABOVE THE MAIN CONTENT ONLY */}
      <div className="pb-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
            Related Calculators
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/calculators/exponent-calculator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-semibold hover:border-blue-500 transition-colors"
            >
              <span>Exponent Calculator</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/calculators/scientific-calculator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-semibold hover:border-blue-500 transition-colors"
            >
              <span>Scientific Calculator</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/calculators/rounding-calculator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-semibold hover:border-blue-500 transition-colors"
            >
              <span>Rounding Calculator</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="pt-6 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Random Number Generator: Generate Random Integers and Decimals Online
          </h2>
          <p>
            A random number generator produces a number selected from a specified range according to the rules of the generator. A simple example is generating one integer from 1 to 100, but a practical random number generator may also need to create negative values, decimal values, multiple results, or very large integers.
          </p>
          <p>
            This Random Number Generator is designed for those different situations. You can enter a lower and upper limit, choose whether you want integers or decimals, control decimal precision, and generate one or multiple values. The calculator also provides result copying, CSV and JSON export, saved calculations, restoration of previous settings, and a frequency visualization for generated datasets.
          </p>
          <p>
            For normal browser-based generation, the tool uses the Web Crypto API rather than <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400 font-mono text-xs">Math.random()</code>. The Web Crypto <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400 font-mono text-xs">getRandomValues()</code> method is intended to provide cryptographically strong random values, while <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400 font-mono text-xs">Math.random()</code> is explicitly not considered cryptographically secure.
          </p>
          <p>
            The important distinction is that a cryptographically secure pseudo-random number generator is still algorithmic. It should not be described as a physical or &ldquo;true&rdquo; random-number source.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Can This Random Number Generator Do?
          </h2>
          <p>
            This calculator covers several common random-number tasks in one place.
          </p>
          <p>
            You can generate a single random integer, generate multiple integers at once, create decimal values between fractional limits, work with negative ranges, and generate values with substantially more decimal precision than ordinary floating-point display typically provides.
          </p>
          <p>For example:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>1 to 100:</strong> generate a whole number such as 57.</li>
            <li><strong>-50 to 50:</strong> generate positive, negative, or zero values.</li>
            <li><strong>42 to 42:</strong> every generated value is 42.</li>
            <li><strong>0.5 to 1.2:</strong> generate decimal values inside that interval.</li>
            <li><strong>Large integer ranges:</strong> preserve the exact decimal digits instead of converting the value into scientific notation.</li>
          </ul>
          <p>
            The current implementation also supports exact large-integer handling through arbitrary-precision integer arithmetic rather than reducing every endpoint to JavaScript&apos;s ordinary floating-point Number type. This is important when the requested numbers contain dozens or hundreds of digits. If your project involves exponential calculations or scientific scales, you can analyze your bounds using our{" "}
            <Link href="/calculators/scientific-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Scientific Calculator
            </Link>{" "}
            and{" "}
            <Link href="/calculators/exponent-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Exponent Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use the Random Number Generator
          </h2>
          <p>Using a random number generator is straightforward:</p>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>Enter the lower limit:</strong> The lower limit is the smallest value the generator is allowed to return. For example, <code>1</code> means the generated value cannot be less than 1.
            </li>
            <li>
              <strong>Enter the upper limit:</strong> The upper limit defines the largest allowed value. For example, <code>100</code> creates an inclusive range from 1 through 100.
            </li>
            <li>
              <strong>Choose the generation type:</strong> Use <em>Integer</em> when you need whole numbers such as 4, 17, 83, or 100. Use <em>Decimal</em> when fractional values are required, such as 4.218, 17.500, or 83.004. Integer mode deliberately rejects fractional limits rather than silently truncating them. This avoids a common source of incorrect random values.
            </li>
            <li>
              <strong>Choose how many numbers to generate:</strong> For a single random value, use a count of 1. For sampling, testing, simulation, or visual inspection, you can request multiple values.
            </li>
            <li>
              <strong>Set decimal precision when using decimal mode:</strong> The precision setting controls how many digits are retained after the decimal point. For example, Precision = 2 displays <code>37.42</code>, while Precision = 10 preserves a much more detailed decimal representation. The generator has been tested with very high precision, including 999 fractional digits. If you need to truncate or round subsequent calculations to standard decimal formats, consult our{" "}
              <Link href="/calculators/rounding-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Rounding Calculator
              </Link>
              .
            </li>
            <li>
              <strong>Generate and inspect the result:</strong> After generation, the calculator displays the values and, when multiple results are produced, the visualization shows the observed frequency distribution.
            </li>
          </ol>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Random Integer Generator
          </h2>
          <p>
            A random integer generator selects whole numbers from a defined inclusive interval.
          </p>
          <p>
            If the minimum is \(L\) and the maximum is \(U\), the valid integer set is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/70 font-mono text-center text-xs">
            L, L + 1, L + 2, ..., U
          </div>
          <p>
            provided that \(L \le U\). For example, a range of 1 to 6 represents the six possible integer outcomes:
          </p>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/70 font-mono text-center text-xs">
            {"{1, 2, 3, 4, 5, 6}"}
          </div>
          <p>
            Every valid outcome is treated as an equal candidate result.
          </p>
          <p>
            The calculator handles ranges that cross zero as well. For example, \(-50 \le X \le 50\) allows negative values, zero, and positive values. The production QA verified that such ranges stay strictly inside their requested bounds.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Random Number Generator 1 to 100
          </h2>
          <p>
            One of the most common uses is generating a value between 1 and 100.
          </p>
          <p>Enter:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Lower limit: 1</li>
            <li>Upper limit: 100</li>
            <li>Type: Integer</li>
            <li>Count: 1</li>
          </ul>
          <p>
            The result is always an integer between 1 and 100, inclusive.
          </p>
          <p>
            This is useful for simple simulations, classroom demonstrations, randomized test inputs, choosing a number from a fixed range, and other general tasks.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Random Decimal Generator
          </h2>
          <p>
            A decimal random number generator is useful when whole numbers are too restrictive.
          </p>
          <p>
            Suppose the requested interval is \(0.5 \le X \le 1.2\). A valid output might be <code>0.7368</code> or <code>1.0142</code> depending on the selected precision.
          </p>
          <p>
            The important implementation detail is that the calculator does not generate an invalid floating-point value and then repeatedly clamp values below the lower bound. Instead, decimal generation is performed through scaled integer arithmetic, allowing the requested interval to be represented exactly at the chosen precision.
          </p>
          <p>
            This matters because naive decimal generation can create an artificial concentration at the boundary. The pre-fix implementation exhibited exactly that problem, with more than half of one tested interval collapsing to the lower endpoint; the corrected implementation reported zero boundary-clamp artifacts for that test.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Random Number Generator With a Custom Range
          </h2>
          <p>
            A custom range lets you control exactly which values are eligible. Examples include:
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700/70">10 to 20</span>
            <span className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700/70">-10 to 10</span>
            <span className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700/70">0 to 1</span>
            <span className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700/70">0.000000000000000001 to 0.000000000000000009</span>
          </div>
          <p>
            The general rule is simple: \(L \le X \le U\), where \(L\) is the lower limit and \(U\) is the upper limit.
          </p>
          <p>
            If the lower limit is greater than the upper limit, the calculator rejects the request instead of silently swapping the numbers.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Generate Multiple Random Numbers
          </h2>
          <p>
            A single result is useful for simple selections, but many applications require a batch of random values. For example, you might request:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Count: 10</li>
            <li>Range: 1 to 100</li>
            <li>Type: Integer</li>
          </ul>
          <p>and receive ten independently generated values.</p>
          <p>Multiple outputs are useful for:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Simulation:</strong> create sample observations for demonstrations or experiments.</li>
            <li><strong>Software testing:</strong> generate varied input values without manually entering every test case.</li>
            <li><strong>Teaching probability:</strong> produce repeated outcomes and compare observed frequencies with expected behavior.</li>
            <li><strong>Data exploration:</strong> create a sample dataset for testing calculations or visualization.</li>
            <li><strong>Random selection:</strong> choose values from a defined numeric interval.</li>
          </ul>
          <p>
            The visualization in this calculator uses the generated dataset itself, so when the dataset changes, the displayed distribution changes with it. The implementation also limits the scatter visualization to a manageable subset while calculating histogram statistics from the generated data.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Random Number Generation Works
          </h2>
          <p>At a high level, the process has three stages:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/70 font-mono text-center text-xs">
            Random source &rarr; unbiased range selection &rarr; formatted result
          </div>
          <p>
            The first stage obtains random bits. The second stage maps those bits into the requested interval. The third stage formats the result according to the selected integer/decimal mode and precision.
          </p>
          <p>
            For browser-side secure random generation, the Web Crypto API provides <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono text-xs">crypto.getRandomValues()</code>. MDN describes this method as generating cryptographically strong random values using a pseudo-random generator seeded with sufficient entropy.
          </p>
          <p>
            That is different from simply writing <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono text-xs">Math.random()</code> and scaling the result. <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono text-xs">Math.random()</code> is suitable for many ordinary non-security uses, but it is specifically not a cryptographically secure source.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Rejection Sampling Matters
          </h2>
          <p>
            Generating a bounded random number is not always as simple as taking \(R \bmod N\).
          </p>
          <p>
            A direct modulo operation can create modulo bias when the random source&apos;s possible values are not an exact multiple of the requested range. For example, if a source can produce 0 through 15 but you need a value from 0 through 5, the 16 possible source states do not divide evenly among six outputs.
          </p>
          <p>
            A sound bounded algorithm therefore rejects unsuitable source values and samples again until the remaining domain maps evenly onto the requested interval.
          </p>
          <p>
            The current calculator uses byte-level power-of-two masking and rejection sampling for arbitrary-size integer ranges, specifically to avoid the modulo-bias problem identified in the earlier audit. This is one reason the implementation is more robust than a minimal <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono text-xs">Math.random() * range</code> formula.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Large Random Integers
          </h2>
          <p>
            Ordinary JavaScript floating-point numbers have finite precision. That becomes important when users work with integers containing many digits. For example, consider:
          </p>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700/70 font-mono text-xs break-all">
            123456789012345678901234567890123456789
          </div>
          <p>
            Converting that directly to a floating-point Number can destroy exact integer precision. The generator therefore preserves large integer bounds as arbitrary-precision integers.
          </p>
          <p>The production test suite verified exact output for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>JavaScript MAX_SAFE_INTEGER boundary values</li>
            <li>39-digit integer ranges</li>
            <li>100-digit integer ranges</li>
            <li>999-digit integer ranges</li>
          </ul>
          <p>
            with the output preserved as exact decimal digits rather than converted into <code>e+...</code> scientific notation. This makes the tool useful when ordinary browser-number precision is not enough.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Random Number Generator vs. True Random Number Generator
          </h2>
          <p>These terms should not be treated as synonyms.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Pseudo-Random Number Generator (PRNG):</strong> Uses an algorithm to produce a sequence that is designed to have random-like statistical properties.
            </li>
            <li>
              <strong>Cryptographically Secure Pseudo-Random Number Generator (CSPRNG):</strong> Adds security properties intended to make outputs difficult to predict without knowledge of the generator&apos;s internal state.
            </li>
            <li>
              <strong>True Random Number Generator (TRNG):</strong> Uses a physical entropy source rather than relying solely on deterministic algorithmic generation.
            </li>
          </ul>
          <p>
            The Web Crypto API provides cryptographically strong pseudo-random generation. It should therefore be described as a CSPRNG-backed mechanism, not as a physical true-random source. MDN explicitly notes that <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono text-xs">getRandomValues()</code> uses a pseudo-random algorithm seeded with sufficient entropy.
          </p>
          <p>
            For security-sensitive software, random-bit generation is a broader engineering topic with dedicated NIST guidance covering DRBG mechanisms, entropy sources, and random-bit-generator constructions.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Is This Random Number Generator Secure?
          </h2>
          <p>
            For browser-side generation, the calculator uses the Web Crypto API&apos;s <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono text-xs">crypto.getRandomValues()</code> mechanism and unbiased range sampling. The production audit specifically verified that <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono text-xs">Math.random()</code> was removed from the generation paths and that the UI language was changed to remove misleading &ldquo;hardware random&rdquo; and &ldquo;true random&rdquo; claims.
          </p>
          <p>
            That makes the generator appropriate for cryptographically stronger random-number generation than ordinary <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono text-xs">Math.random()</code>.
          </p>
          <p>
            However, the tool should not be represented as a substitute for a complete security architecture, audited cryptographic protocol, hardware entropy appliance, or certified random-number service. That distinction improves both technical accuracy and user trust.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Distribution Visualization &amp; Statistical Caution
          </h2>
          <p>
            Generating many values is different from generating one value. For a range from 1 to 10, repeated samples should produce varying counts for each number. In a sufficiently large sample, those counts should tend to approach the underlying uniform distribution, but a finite sample will never contain exactly equal frequencies every time.
          </p>
          <p>The calculator includes a visualization that displays:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Observed frequency bins</li>
            <li>Sample dispersion plot</li>
            <li>Mean (\(\mu\))</li>
            <li>Standard deviation (\(\sigma\))</li>
          </ul>
          <p>
            and updates dynamically when a new dataset is generated.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider block">
              A Useful Statistical Caution
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A histogram is a diagnostic, not proof that a generator is secure or perfectly random. For example, the production validation used a 100,000-sample chi-square test on values 1 through 10. The observed statistic was 8.6332 with a reported p-value of 0.4718, which did not provide evidence of a departure from the tested uniform model at the 0.05 level. That is useful evidence for a particular statistical test, but it is not a universal certification of randomness or security.
            </p>
          </div>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Uses for a Random Number Generator
          </h2>
          <p>A random number generator can be useful in many ordinary situations:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Education and probability:</strong> Teachers and students can generate repeated values to explore frequency, expected outcomes, distributions, and sampling.
            </li>
            <li>
              <strong>Software testing:</strong> Developers can generate varied numerical inputs, including negative values, boundary values, decimals, and large integers.
            </li>
            <li>
              <strong>Simulations:</strong> Random values are frequently used as model inputs when demonstrating stochastic processes or testing numerical algorithms.
            </li>
            <li>
              <strong>Random selection:</strong> A simple range such as 1 to 100 can be used to select a numerical value from a predefined set.
            </li>
            <li>
              <strong>Demonstrations and experiments:</strong> Generating several batches makes it easy to compare one random sample with another.
            </li>
            <li>
              <strong>High-precision numerical work:</strong> The decimal generator can preserve much greater displayed precision than a typical basic random-number widget.
            </li>
          </ul>
        </section>

        {/* Section 16 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Random Number Generator Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-1.5">
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">Example 1: Random integer from 1 to 100</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <strong>Input:</strong> Lower = 1, Upper = 100, Type = Integer, Count = 1<br />
                <strong>Possible result:</strong> <code>73</code> (freshly drawn each click)
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-1.5">
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">Example 2: Five random integers from -20 to 20</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <strong>Input:</strong> Lower = -20, Upper = 20, Count = 5, Type = Integer<br />
                <strong>Possible result:</strong> <code>-7, 14, 0, 19, -12</code>
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-1.5">
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">Example 3: High-precision decimal values</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <strong>Input:</strong> Lower = 0.5, Upper = 1.2, Type = Decimal, Precision = 10, Count = 3<br />
                <strong>Possible result:</strong> <code>0.7431829451, 1.1063742058, 0.5918460237</code>
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-1.5">
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">Example 4: A large integer range</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <strong>Input:</strong> 39-digit integer range<br />
                <strong>Result:</strong> Exact arbitrary-precision integer string without scientific notation collapse.
              </p>
            </div>
          </div>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Mistakes When Using a Random Number Generator
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Mistake 1: Reversing the limits.</strong> A request such as 100 to 1 is not a valid ordered interval. The tool rejects the request rather than guessing what the user intended.
            </li>
            <li>
              <strong>Mistake 2: Using fractional limits in integer mode.</strong> Entering 1.5 to 9.8 while requesting integers creates an ambiguity. The calculator rejects the input and asks the user to use decimal mode instead.
            </li>
            <li>
              <strong>Mistake 3: Assuming every random-looking result is secure.</strong> A value can look random without coming from a cryptographically secure generator. This is why the distinction between Math.random() and Web Crypto matters.
            </li>
            <li>
              <strong>Mistake 4: Treating a small sample histogram as proof.</strong> Ten or twenty generated values are too few to visually establish a stable distribution. Larger samples provide more useful statistical evidence.
            </li>
            <li>
              <strong>Mistake 5: Losing precision in very large numbers.</strong> Large integer values should not be casually converted through ordinary floating-point arithmetic. The calculator avoids that conversion for supported arbitrary-precision integer generation.
            </li>
          </ul>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Practical Note About Randomness &amp; Summary
          </h2>
          <p>
            Randomness is contextual. For a classroom activity, game prototype, simulation, or ordinary input generation, the main concerns may be range correctness, distribution, and reproducibility of the workflow.
          </p>
          <p>
            For security-sensitive applications, additional requirements become important, including the random-bit source, entropy, generator construction, implementation security, and the surrounding cryptographic protocol. NIST&apos;s SP 800-90 series addresses random-bit-generator mechanisms, entropy sources, and constructions for cryptographic applications. That is why this calculator carefully distinguishes random generation, statistical behavior, and cryptographic strength rather than treating them as the same property.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider block">
              Summary
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              This Random Number Generator provides a practical way to generate integers and high-precision decimal numbers from user-defined ranges. It supports negative ranges, multiple outputs, arbitrary-precision integers, precision control, distribution visualization, saved configurations, copying, CSV export, and JSON export.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The underlying browser generation mechanism uses the Web Crypto API&apos;s cryptographically strong random-value facility, combined with rejection-based range selection to avoid modulo bias. The workflow is simple:
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 font-mono text-center text-xs text-blue-600 dark:text-blue-400 font-bold">
              Choose range &rarr; Choose type &rarr; Generate &rarr; Inspect or export
            </div>
          </div>
        </section>

      </div>

      {/* 3. FAQ SECTION (All 13 Approved FAQs, Unfolded / Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {random_number_generatorFaqs.map((faq, idx) => {
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

      {/* 4. RELATED CALCULATORS BLOCK — BOTTOM OF CONTENT ONLY */}
      <div className="pt-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
            Related Calculators
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/calculators/exponent-calculator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-semibold hover:border-blue-500 transition-colors"
            >
              <span>Exponent Calculator</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/calculators/scientific-calculator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-semibold hover:border-blue-500 transition-colors"
            >
              <span>Scientific Calculator</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/calculators/rounding-calculator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-semibold hover:border-blue-500 transition-colors"
            >
              <span>Rounding Calculator</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

    </article>
  );
}

export default RandomContent;
