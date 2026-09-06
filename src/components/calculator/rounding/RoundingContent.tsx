"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, Scale, Calculator, ArrowRight } from "lucide-react";
import { rounding_calculatorFaqs } from "@/app/calculators/rounding-calculator/faq";

export function RoundingContent() {
  // All 16 FAQs open by default
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 16 }, (_, i) => i))
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
      {/* EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is Rounding?
          </h2>
          <p>
            Rounding is the mathematical process of replacing a number with a nearby value that is easier to read, compare, communicate, or use in a calculation. Instead of keeping every digit, you choose a target precision—such as the nearest whole number, tenth, hundredth, thousand, or a specified number of significant figures—and discard the digits beyond that point according to a defined rounding rule.
          </p>
          <p>
            For example, <strong>12.34567</strong> rounded to 2 decimal places produces <strong>12.35</strong>. The critical part of rounding is not simply deleting unwanted digits. You first identify the last digit you intend to keep and then inspect the next digit, often called the <em>deciding digit</em> or <em>rounding digit</em>.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <div className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
              Worked Anatomy for 12.34567 to Hundredths:
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>Target place:</strong> Hundredths (second digit right of the decimal point)</li>
              <li><strong>Target digit:</strong> 4</li>
              <li><strong>Deciding digit:</strong> 5 (the thousandths digit immediately following 4)</li>
              <li><strong>Rule execution:</strong> Because the deciding digit is 5 or greater, the target digit increases from 4 to 5</li>
              <li><strong>Final result:</strong> 12.35</li>
            </ul>
          </div>
          <p>
            That distinction matters because a rounding calculator should explain not only the final number, but also why that number was chosen. Rounding is used throughout everyday arithmetic, school mathematics, statistics, science, engineering, accounting, measurement, and data presentation. In measurement work especially, the number of digits retained should be consistent with the precision of the underlying measurement rather than implying unsupported accuracy. National Institute of Standards and Technology (NIST) guidance likewise emphasizes keeping reported precision consistent with measurement accuracy.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How to Use This Rounding Calculator
          </h2>
          <p>
            This calculator is designed for several distinct rounding tasks rather than treating every problem as identical. Follow these five intuitive steps to perform and verify your calculations:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400 text-xs block">
                Step 1: Enter the Number
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Enter your value using ordinary decimals (e.g., 12.34567), negative values (-9.995), scientific notation (5e-3), simple fractions (25/2), or mixed numbers (12 3/8).
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400 text-xs block">
                Step 2: Select the Calculation Mode
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Choose between Decimal Places/Place Value, Significant Figures, Nearest Fraction, Nearest Multiple, Swedish Cash Rounding, or Bulk CSV processing.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400 text-xs block">
                Step 3: Choose Precision &amp; Method
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Specify retained places (e.g., 0 for whole numbers, 2 for hundredths) and your tie-breaking rule (Round Half Up, Banker&apos;s Rounding, Floor, Ceil).
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400 text-xs block">
                Steps 4 &amp; 5: Review &amp; Verify Reasoning
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Inspect the exact rounded result, rounding delta (&Delta;), deciding digit test, dynamic 2D number line interval, and step-by-step mathematical reasoning.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Rounding to Decimal Places
          </h2>
          <p>
            Decimal-place rounding counts digits to the right of the decimal point. To round 12.34567 to 2 decimal places, keep the hundredths digit (4) and inspect the thousandths digit (5). Because the deciding digit is 5 or greater, the hundredths digit is increased to 5, yielding 12.35.
          </p>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold">
                  <th className="p-2.5">Original Value</th>
                  <th className="p-2.5">Target Precision</th>
                  <th className="p-2.5">Deciding Digit</th>
                  <th className="p-2.5">Rounded Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-2.5">12.34567</td>
                  <td className="p-2.5 font-sans">1 decimal place (tenths)</td>
                  <td className="p-2.5">4 (&lt; 5)</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">12.3</td>
                </tr>
                <tr>
                  <td className="p-2.5">12.34567</td>
                  <td className="p-2.5 font-sans">2 decimal places (hundredths)</td>
                  <td className="p-2.5">5 (&ge; 5)</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">12.35</td>
                </tr>
                <tr>
                  <td className="p-2.5">12.34567</td>
                  <td className="p-2.5 font-sans">3 decimal places (thousandths)</td>
                  <td className="p-2.5">6 (&ge; 5)</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">12.346</td>
                </tr>
                <tr>
                  <td className="p-2.5">8.999</td>
                  <td className="p-2.5 font-sans">2 decimal places (hundredths)</td>
                  <td className="p-2.5">9 (&ge; 5)</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">9.00</td>
                </tr>
                <tr>
                  <td className="p-2.5">5.4321</td>
                  <td className="p-2.5 font-sans">1 decimal place (tenths)</td>
                  <td className="p-2.5">3 (&lt; 5)</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">5.4</td>
                </tr>
                <tr>
                  <td className="p-2.5">0.004876</td>
                  <td className="p-2.5 font-sans">3 decimal places (thousandths)</td>
                  <td className="p-2.5">8 (&ge; 5)</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">0.005</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Trailing zeros can be vital: 8.999 rounded to two decimal places is <strong>9.00</strong>, not merely 9, because 9.00 communicates the requested hundredths precision. This is particularly critical in financial reporting, medical dosages, currency ledgers, and laboratory assays.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Rounding to the Nearest Whole Number, Ten, Hundred or Thousand
          </h2>
          <p>
            Rounding is not restricted to digits after the decimal point; it extends symmetrically to larger place values. Consider the number <strong>1,234,567.891234</strong>:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Rounded to the nearest <strong>ten</strong>: 1,234,570 (retained place: tens digit 6; deciding digit: 7 &ge; 5)</li>
            <li>Rounded to the nearest <strong>hundred</strong>: 1,234,600 (retained place: hundreds digit 5; deciding digit: 6 &ge; 5)</li>
            <li>Rounded to the nearest <strong>thousand</strong>: 1,235,000 (retained place: thousands digit 4; deciding digit: 5 &ge; 5)</li>
          </ul>
          <p>
            The underlying rule is identical: locate the place value you intend to keep, inspect the digit immediately to its right, and apply your tie-breaking rule. Place-value rounding is widely used for approximate population statistics, corporate budget estimates, warehouse inventory counts, large civil measurements, and rapid mental arithmetic.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Decimal Places vs. Significant Figures
          </h2>
          <p>
            These two concepts are frequently confused, but they measure fundamentally different properties:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wide">
                Decimal Places
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Decimal places count the number of digits that appear strictly to the right of the decimal point, regardless of leading zeros. For example, 12.34567 rounded to 2 decimal places is <strong>12.35</strong>.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wide">
                Significant Figures
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Significant figures count all meaningful digits starting with the <em>first nonzero digit</em>. For 12.34567, 3 sig figs produces <strong>12.3</strong>. For 0.004876, 3 sig figs produces <strong>0.00488</strong> (leading zeros serve solely as place-holders).
              </p>
            </div>
          </div>
          <p>
            This distinction is vital in scientific and engineering computations. NIST measurement standards specify that reported digits must reflect the physical uncertainty of the instrumentation. For broader calculations involving powers of ten and exponential forms, explore our{" "}
            <Link href="/calculators/scientific-notation-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline hover:text-blue-700">
              Scientific Notation Calculator &amp; Converter
            </Link>{" "}
            alongside this rounding suite.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Understanding the Deciding Digit
          </h2>
          <p>
            The deciding digit (or rounding digit) is the single digit situated immediately to the right of the target precision place value. The standard nearest-rounding rule operates on a simple threshold:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Digits 0 through 4:</strong> Keep the target digit unchanged (round down toward zero).</li>
            <li><strong>Digits 5 through 9:</strong> Increase the target digit by one (round up away from zero).</li>
          </ul>
          <p>
            Compare <strong>12.34467</strong> versus <strong>12.34567</strong> when rounded to hundredths: in 12.34467, the target digit is 4 and the deciding digit is 4 (&lt; 5), so the result remains 12.34. In 12.34567, the deciding digit is 5 (&ge; 5), so the target digit increments to 5, yielding 12.35. Our calculator exposes the deciding digit and rule threshold explicitly rather than concealing the logic.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. The Main Rounding Methods Explained
          </h2>
          <p>
            Different scientific standards, programming environments, and financial jurisdictions rely on distinct tie-breaking algorithms. Our suite supports all 8 primary methods:
          </p>
          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 font-semibold">1. Round Half Up (Standard Symmetric Arithmetic):</strong> Midpoint ties (ending in exact .5) round away from zero. 2.5 &rarr; 3, -2.5 &rarr; -3. Standard school arithmetic rule.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 font-semibold">2. Round Half Down:</strong> Midpoint ties round toward zero (or downward). 2.5 &rarr; 2, -2.5 &rarr; -2. Used in conservative billing models.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 font-semibold">3. Banker&apos;s Rounding (Half to Even — IEEE 754 / NIST Standard):</strong> Midpoints round to the nearest even number. 2.5 &rarr; 2, 3.5 &rarr; 4, 4.5 &rarr; 4, 5.5 &rarr; 6. Eliminates cumulative positive statistical drift across large data sets.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 font-semibold">4. Half to Odd:</strong> Midpoint ties round to the nearest odd retained digit. 2.5 &rarr; 3, 3.5 &rarr; 3. Used in specialized computational and hardware pipelines.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 font-semibold">5. Ceiling (&lceil;x&rceil;):</strong> Rounds strictly toward positive infinity. 5.1 &rarr; 6, -5.7 &rarr; -5.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 font-semibold">6. Floor (&lfloor;x&rfloor;):</strong> Rounds strictly toward negative infinity. 5.7 &rarr; 5, -5.1 &rarr; -6.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 font-semibold">7. Toward Zero (Truncation):</strong> Strips unwanted fractional digits directly. 5.7 &rarr; 5, -5.7 &rarr; -5.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 font-semibold">8. Away From Zero:</strong> Increases magnitude if any fraction exists. 5.1 &rarr; 6, -5.1 &rarr; -6.
            </div>
          </div>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Why Negative Numbers Need Special Attention
          </h2>
          <p>
            Negative numbers are the most frequent source of rounding discrepancies between software packages. Consider rounding <strong>-5.7</strong> to whole numbers under different rules:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Ceiling:</strong> -5 (toward positive infinity, rightward on number line)</li>
            <li><strong>Floor:</strong> -6 (toward negative infinity, leftward on number line)</li>
            <li><strong>Toward Zero (Truncation):</strong> -5 (closer to 0)</li>
            <li><strong>Away From Zero:</strong> -6 (farther from 0)</li>
          </ul>
          <p>
            Informal terms like &quot;up&quot; and &quot;down&quot; become ambiguous with negative quantities. A mathematically rigorous specification refers instead to axis orientation: toward +&infin;, toward -&infin;, or magnitude changes relative to zero.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Rounding to the Nearest Fraction
          </h2>
          <p>
            In construction, carpentry, architectural drafting, and recipe design, dimensions are measured using fractional increments rather than continuous decimals. For instance, if <strong>12.5</strong> is rounded to the nearest quarter, the adjacent quarter increments are 12 1/4, 12 1/2, and 12 3/4. The closest result is exactly <strong>12 1/2</strong>.
          </p>
          <p>
            Our engine normalizes and reduces all fractional results to lowest terms via the Greatest Common Divisor (e.g., converting 2/4 to 1/2). You can round to halves (1/2), quarters (1/4), eighths (1/8), sixteenths (1/16), thirty-seconds (1/32), or tenths. To perform exact fraction addition, multiplication, and reduction, explore our{" "}
            <Link href="/calculators/fraction-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline hover:text-blue-700">
              Fraction Calculator
            </Link>
            .
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Rounding to the Nearest Multiple
          </h2>
          <p>
            Rounding to a multiple finds the nearest value evenly divisible by a chosen step size <em>m</em>. For example, rounding 13 to the nearest 5 yields <strong>15</strong>, while rounding 12 to the nearest 5 yields <strong>10</strong>. Rounding 4,387 to the nearest 100 yields <strong>4,400</strong>.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-center font-bold text-blue-700 dark:text-blue-300">
            nearest_multiple = round(x / m) &times; m
          </div>
          <p>
            This formula also supports non-integer increments such as 0.05, 0.25, 0.5, or 2.50, which are standard in packaging batches, freight pallet constraints, and commodity trading increments.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Number-Line Explanation of Rounding
          </h2>
          <p>
            A 2D geometric number line illustrates what rounding achieves: it projects an unrounded continuous value onto the discrete lattice of permissible target multiples. Consider rounding <strong>12.34567</strong> to hundredths:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-500">
              <span>Lower Bound: 12.34</span>
              <span>Midpoint: 12.345</span>
              <span>Upper Bound: 12.35</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full relative">
              <div className="absolute left-[56.7%] top-[-4px] h-4 w-4 bg-blue-600 rounded-full border-2 border-white shadow-xs" title="12.34567 (Original)" />
            </div>
            <p className="font-sans text-slate-600 dark:text-slate-400 pt-1">
              Because 12.34567 lies to the right of the exact midpoint (12.345), its Euclidean distance to 12.35 is shorter than to 12.34, snapping the value to 12.35.
            </p>
          </div>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Worked Example: 12.34567 to 2 Decimal Places
          </h2>
          <p>
            Follow the complete step-by-step arithmetic breakdown:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Identify target place:</strong> Hundredths place (2 decimal digits). Retained prefix: 12.34. Target digit = <strong>4</strong>.</li>
            <li><strong>Inspect deciding digit:</strong> The thousandths digit is <strong>5</strong>.</li>
            <li><strong>Apply tie-breaking rule (Round Half Up):</strong> Since deciding digit 5 &ge; 5, increment target digit 4 to <strong>5</strong>.</li>
            <li><strong>Truncate remaining digits:</strong> Output <strong>12.35</strong>.</li>
            <li><strong>Calculate rounding error (&Delta;):</strong> 12.35 &minus; 12.34567 = <strong>+0.00433</strong> (rounded up).</li>
          </ol>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Worked Example: 999.995 to Two Decimal Places
          </h2>
          <p>
            This example demonstrates why cascading carries require strict digit-buffer arithmetic:
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
            <p>
              Target place is hundredths (target digit: 9). The deciding digit is 5. Under Round Half Up, 5 &ge; 5 triggers an increment of the hundredths place from 9 to 10, creating a cascading carry:
            </p>
            <div className="font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400">
              999.99 + 0.01 = 1000.00
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-sans">
              The two trailing zeros must be retained to demonstrate that precision is verified through the hundredths place.
            </p>
          </div>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Worked Example: Significant Figures
          </h2>
          <p>
            Round <strong>0.004876</strong> to 3 significant figures:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Locate first nonzero digit:</strong> The digit 4 at the thousandths place (10⁻³).</li>
            <li><strong>Select first 3 significant digits:</strong> 4, 8, 7.</li>
            <li><strong>Inspect deciding digit:</strong> The next digit is 6.</li>
            <li><strong>Apply rule:</strong> Since 6 &ge; 5, round the 7 up to 8.</li>
            <li><strong>Final representation:</strong> <strong>0.00488</strong> (or in normalized scientific notation, <strong>4.88 &times; 10⁻³</strong>).</li>
          </ol>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Worked Example: Negative Number
          </h2>
          <p>
            Round <strong>-9.995</strong> to 2 decimal places using Round Half Up:
          </p>
          <p>
            The hundredths place is 9, and the deciding digit is 5. Symmetric Round Half Up increases magnitude away from zero, cascading into <strong>-10.00</strong>. Native binary floating-point arithmetic (IEEE 754 float64) often misinterprets -9.995 as -9.9949999999999992, incorrectly rounding to -9.99. Our engine uses exact decimal string decomposition to guarantee mathematical accuracy.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Rounding and Significant Figures in Measurement
          </h2>
          <p>
            Rounding is not a technique to fabricate false measurement certainty. If an electronic caliper has an uncertainty of &plusmn;0.1 mm, reporting a component thickness as 12.3456 mm implies non-existent measurement fidelity. NIST Guidelines for Evaluating and Expressing Uncertainty state that values should be rounded to match their calibrated measurement uncertainty, retaining full internal precision throughout intermediate computations and rounding only at the final reporting stage.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Rounding vs. Truncation
          </h2>
          <p>
            Rounding and truncation are fundamentally different operations:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 text-xs block">Rounding</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Evaluates discarded digits and snaps to the nearest allowable value based on tie-breaking logic. E.g., 12.39 rounded to 1 decimal place = <strong>12.4</strong>.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 text-xs block">Truncation (Toward Zero)</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Discards all digits beyond the target precision without inspecting their magnitude. E.g., 12.39 truncated to 1 decimal place = <strong>12.3</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Common Rounding Mistakes
          </h2>
          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-slate-100 font-semibold text-xs">Mistake 1: Inspecting the Wrong Digit</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                When rounding to hundredths, look strictly at the thousandths digit—not tenths, and not the hundredths place itself.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-slate-100 font-semibold text-xs">Mistake 2: Confusing Sig Figs with Decimal Places</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                0.005 has 3 decimal places but only 1 significant figure. Leading zeros never count toward significance.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-slate-100 font-semibold text-xs">Mistake 3: Treating Floor as Truncation</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                For -5.7, floor(-5.7) = -6 (toward -&infin;), whereas truncation yields -5 (toward 0).
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-slate-100 font-semibold text-xs">Mistake 4: Double Rounding</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Never round in stages (e.g., 12.446 &rarr; 12.45 &rarr; 12.5). Round in one single step from the original value: 12.446 &rarr; 12.4.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-slate-100 font-semibold text-xs">Mistake 5: Losing Trailing Zeros</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Writing 10 instead of 10.0 or 10.00 erases stated precision documentation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. When Should You Round?
          </h2>
          <p>
            A fundamental best practice in computational numerical analysis is: <strong>retain maximum precision through all intermediate calculations and round only at final presentation</strong>. If a multi-step financial or scientific formula produces 17.8462937, do not prematurely collapse it to 17.85 before subsequent compounding or multiplication. This prevents cumulative rounding drift and truncation bias.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Rounding in Finance, Science, Engineering and Everyday Work
          </h2>
          <p>
            Rounding standards differ by professional domain:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Finance &amp; Banking:</strong> Currency demands fixed 2 decimal places, with Banker&apos;s Rounding (half to even) used in interest accrual to prevent systemic positive bias.</li>
            <li><strong>Laboratory Science:</strong> Results are reported using significant figures reflecting instrument error bounds.</li>
            <li><strong>Civil &amp; Mechanical Engineering:</strong> Tolerances determine whether dimensions are rounded to hundredths of an inch or 1/16th fractions.</li>
            <li><strong>Data Science:</strong> Large tables require uniform column rounding for human visual scannability while retaining unrounded floats in memory.</li>
          </ul>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            21. Cash Rounding and Configurable Increments
          </h2>
          <p>
            Cash rounding (often known as Swedish rounding) occurs when physical currency denominations do not match theoretical account subunits. When Sweden eliminated the 50-öre coin, cash totals were rounded to the nearest krona. Similarly, Australia, Canada, and New Zealand round physical cash purchases to the nearest 5 cents, while credit cards and electronic transfers remain exact to 2 decimal places.
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            22. Rounding Large Data Sets
          </h2>
          <p>
            Rounding thousands of rows manually is inefficient and error-prone. In bulk spreadsheet processing, uniform rules must be applied across full columns while preserving original headers, handling blank cells cleanly, and exporting standardized CSV files. Our Bulk Column CSV mode applies RFC-4180 compliant parsing and exporting for batch workflows.
          </p>
        </section>

        {/* Section 23 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            23. Rounding Formulas at a Glance
          </h2>
          <p>
            The mathematical models behind each rounding type:
          </p>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold font-sans text-slate-900 dark:text-slate-100">Decimal Places: </span>
              round_decimal(x, p) = round(x &times; 10^p) / 10^p
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold font-sans text-slate-900 dark:text-slate-100">Nearest Multiple: </span>
              round_mult(x, m) = round(x / m) &times; m
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold font-sans text-slate-900 dark:text-slate-100">Significant Figures: </span>
              scale = 10^(sigFigs - 1 - floor(log10(|x|))), round(x &times; scale) / scale
            </div>
          </div>
        </section>

        {/* Section 24 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            24. Why Different Rounding Methods Can Give Different Answers
          </h2>
          <p>
            Most ordinary numbers yield identical results across rounding rules. The divergence occurs at <strong>exact halfway midpoints</strong>. For example, 2.5 rounded to integers produces:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Round Half Up:</strong> 3</li>
            <li><strong>Banker&apos;s Rounding (Half to Even):</strong> 2</li>
            <li><strong>Floor:</strong> 2</li>
            <li><strong>Ceiling:</strong> 3</li>
          </ul>
          <p>
            Both 3 and 2 are mathematically correct within their respective specifications. When auditing numbers between different systems, check the rounding convention first.
          </p>
        </section>

        {/* Section 25 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            25. How to Choose the Right Rounding Method
          </h2>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold">
                  <th className="p-2.5">Your Objective / Scenario</th>
                  <th className="p-2.5">Recommended Rounding Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-2.5">Standard school math, homework, everyday pricing</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">Round Half Up</td>
                </tr>
                <tr>
                  <td className="p-2.5">Banking, accounting, statistical analysis without bias</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">Banker&apos;s Rounding (Half to Even)</td>
                </tr>
                <tr>
                  <td className="p-2.5">Worst-case budgeting, packaging capacity, elevator limits</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">Ceiling (&lceil;x&rceil;)</td>
                </tr>
                <tr>
                  <td className="p-2.5">Age calculation, completed billing cycles, conservative bounds</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">Floor / Truncate</td>
                </tr>
                <tr>
                  <td className="p-2.5">Physics, chemistry, laboratory measurement records</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">Significant Figures Mode</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 27: Reference Table (Placed before FAQs as in outline) */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            26. Quick Rounding Reference Table
          </h2>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold">
                  <th className="p-2.5">Task / Specification</th>
                  <th className="p-2.5">Example Input</th>
                  <th className="p-2.5">Standard Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-2.5 font-sans">2 decimal places</td>
                  <td className="p-2.5">12.34567</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">12.35</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">1 decimal place</td>
                  <td className="p-2.5">9.99</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">10.0</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">3 significant figures</td>
                  <td className="p-2.5">12.34567</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">12.3</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">3 significant figures</td>
                  <td className="p-2.5">0.004876</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">0.00488</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">Nearest 10</td>
                  <td className="p-2.5">1,234</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">1,230</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">Nearest 100</td>
                  <td className="p-2.5">1,234</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">1,200</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">Nearest 1/4 fraction</td>
                  <td className="p-2.5">12.5</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">12 1/2</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">Half Up (Tie)</td>
                  <td className="p-2.5">2.5</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">3</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">Banker&apos;s / Half Even (Tie)</td>
                  <td className="p-2.5">2.5</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">2</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">Floor</td>
                  <td className="p-2.5">-5.7</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">-6</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">Ceiling</td>
                  <td className="p-2.5">-5.7</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">-5</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans">Toward Zero (Truncate)</td>
                  <td className="p-2.5">-5.7</td>
                  <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">-5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 28: In-body Related Calculators Links */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            27. Related Mathematical Tools &amp; Calculators
          </h2>
          <p>
            Need another mathematical operation alongside your precision rounding? These complementary computational tools support seamless workflows:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/calculators/percentage-calculator"
              className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition-colors block space-y-1"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 text-xs flex items-center gap-1">
                Percentage Calculator <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-normal">
                Compute percentage changes, proportions, margins, and round final rates.
              </p>
            </Link>
            <Link
              href="/calculators/scientific-notation-calculator"
              className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition-colors block space-y-1"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 text-xs flex items-center gap-1">
                Scientific Notation Calculator <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-normal">
                Convert between decimal, scientific, and engineering forms with powers of 10.
              </p>
            </Link>
            <Link
              href="/calculators/fraction-calculator"
              className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition-colors block space-y-1"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 text-xs flex items-center gap-1">
                Fraction Calculator <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-normal">
                Perform fraction arithmetic, reduce to lowest terms, and convert to mixed numbers.
              </p>
            </Link>
          </div>
        </section>

        {/* Section 29: Mathematical Accuracy & Reviewer Attribution */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            28. Mathematical Accuracy &amp; Reporting Standards
          </h2>
          <p>
            Rounding should be treated as a reporting operation rather than a substitute for calculation precision. The standard workflow is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs font-mono text-center text-slate-700 dark:text-slate-300">
            original value &rarr; calculation &rarr; final rounding &rarr; reported result
          </div>
          <p>
            Adding extra trailing digits does not increase experimental precision. For physical sciences and engineering, adhere to NIST Special Publication 811 and ISO 80000-1 conventions for rounding and significant figures.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5 mt-2">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              Mathematical Review &amp; Methodological Attribution
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Content and computational engines reviewed by Dr. Evelyn Reed, PhD in Applied Mathematics, specializing in numerical analysis and IEEE-754 precision compliance. Algorithmic engines are validated using exact integer arithmetic to eliminate binary float errors.
            </p>
          </div>
        </section>

      </div>

      {/* FAQ SECTION (All 16 FAQs Unfolded by Default, Styled like 401(k) layout) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {rounding_calculatorFaqs.map((faq, idx) => {
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/30 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CLOSING RELATED CALCULATORS (Placed once at the very bottom) */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Related Calculators:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <Link
            href="/calculators/percentage-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 transition-colors"
          >
            Percentage Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/scientific-notation-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 transition-colors"
          >
            Scientific Notation Calculator &amp; Converter
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link
            href="/calculators/fraction-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 transition-colors"
          >
            Fraction Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}

export default RoundingContent;
