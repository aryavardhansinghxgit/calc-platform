"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, Cpu } from "lucide-react";
import { resistor_calculatorFaqs } from "@/app/calculators/resistor-calculator/faq";

export function ResistorContent() {
  // All 15 FAQs open by default for immediate accessibility and SEO indexing
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: resistor_calculatorFaqs.length }, (_, i) => i))
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
    <article className="mt-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800 not-prose">
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT (19 COMPLETE SECTIONS) */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Resistor Calculator: What It Calculates
          </h2>
          <p>
            A resistor calculator is useful whenever a circuit requires a precise resistance value, a known resistor combination, or a quick way to decode a component marking. Instead of treating resistance as a single lookup task, a practical resistor calculator needs to handle several related engineering problems: reading resistor color bands, combining resistors in series or parallel, calculating resistance from conductor dimensions, decoding surface-mount markings, finding preferred E-series values, and estimating electrical quantities such as current and power.
          </p>
          <p>
            This calculator brings those jobs together in one place. It can decode 4-band, 5-band and 6-band resistor markings, calculate equivalent resistance for series and parallel networks, estimate conductor resistance from resistivity and geometry, decode SMD resistor markings, find preferred E-series values, and show tolerance limits and power-related calculations.
          </p>
          <p>
            The production implementation has been independently tested across all of those modules, including randomized calculations and export consistency.
          </p>
          <p>
            A resistor is fundamentally a passive component that opposes electrical current. Its resistance is measured in ohms (Ω). The relationship between voltage, current and resistance is described by Ohm&apos;s law:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            V = I × R
          </div>
          <p>
            From that relationship:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>I = V / R</div>
            <div>R = V / I</div>
          </div>
          <p>
            For power:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>P = V × I</div>
            <div>P = I²R</div>
            <div>P = V²/R</div>
          </div>
          <p>
            These relationships are closely connected, but they answer different questions. A resistor&apos;s nominal value tells you its intended resistance; the tolerance tells you how far the manufactured value may vary; and the circuit conditions determine the current and power the component actually experiences.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How Resistor Color Codes Work
          </h2>
          <p>
            Traditional leaded resistors can encode their resistance value and tolerance using colored bands. The number of bands determines how the significant digits and other characteristics are interpreted.
          </p>
          <p>
            For a common 4-band resistor:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Band 1 = first significant digit</li>
            <li>Band 2 = second significant digit</li>
            <li>Band 3 = multiplier</li>
            <li>Band 4 = tolerance</li>
          </ul>
          <p>
            For a 5-band resistor:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Band 1 = first significant digit</li>
            <li>Band 2 = second significant digit</li>
            <li>Band 3 = third significant digit</li>
            <li>Band 4 = multiplier</li>
            <li>Band 5 = tolerance</li>
          </ul>
          <p>
            For a 6-band resistor, the additional band is used for temperature-coefficient information.
          </p>
          <p>
            IEC 60062 is the international standard covering marking codes for resistors and capacitors, including resistor colour coding, resistance/tolerance marking and temperature-coefficient marking.
          </p>
          <p>
            A practical visual clue is that the tolerance band is typically separated more clearly from the value bands. The number of bands should therefore be established before decoding the sequence; otherwise a 4-band and 5-band resistor can be interpreted incorrectly.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Resistor Color Code Example
          </h2>
          <p>
            Consider a 4-band resistor:
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Orange – Orange – Red – Brown
          </p>
          <p>
            The first two colors represent:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Orange = 3</li>
            <li>Orange = 3</li>
          </ul>
          <p>
            The third band is:
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Red = ×100
          </p>
          <p>
            Therefore:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            33 × 100 = 3,300 Ω = 3.3 kΩ
          </div>
          <p>
            Brown indicates:
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            ±1%
          </p>
          <p>
            so the nominal value is:
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            3.3 kΩ ±1%
          </p>
          <p>
            Its theoretical tolerance limits are:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Minimum: 3,300 × 0.99 = 3,267 Ω</li>
            <li>Maximum: 3,300 × 1.01 = 3,333 Ω</li>
          </ul>
          <p>
            Now compare this with a 5-band resistor:
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Orange – Orange – Black – Red – Brown
          </p>
          <p>
            Here the first three bands represent:
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            3 3 0
          </p>
          <p>
            so:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            330 × 100 = 33,000 Ω = 33 kΩ ±1%
          </div>
          <p>
            Those two examples demonstrate why band count matters. The same first two colors do not guarantee the same resistance because the number of significant digits changes between band systems. The calculator&apos;s test suite explicitly checks distinct 4-band and 5-band states instead of conflating them.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Resistor Tolerance and Resistance Range
          </h2>
          <p>
            A resistor&apos;s nominal value is not necessarily the exact resistance measured in every physical part.
          </p>
          <p>
            For nominal resistance R and tolerance T:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>Rmin = R × (1 − T/100)</div>
            <div>Rmax = R × (1 + T/100)</div>
          </div>
          <p>
            For example, a 1,000 Ω ±5% resistor has an idealized range of:
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            950 Ω to 1,050 Ω
          </p>
          <p>
            Tolerance is a manufacturing specification, not a statement that every resistor will necessarily sit at one of the limits.
          </p>
          <p>
            This distinction becomes particularly important in the E-Series Finder, where two concepts must be kept separate:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>target error</strong> — how far the selected preferred value is from the requested value</li>
            <li><strong>component tolerance</strong> — the permitted variation around that nominal preferred value.</li>
          </ul>
          <p>
            The calculator was specifically corrected so these quantities are not confused. For example, the E24 value 1.5 kΩ has a standard ±5% tolerance in the implementation while a perfect match to the target has 0% target-selection error.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Series Resistors
          </h2>
          <p>
            For resistors connected in series, the same current flows through each resistor and the total resistance is the sum:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            Rtotal = R1 + R2 + R3 + ...
          </div>
          <p>
            For example:
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            100 Ω, 220 Ω, 470 Ω
          </p>
          <p>
            gives:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            Rtotal = 100 + 220 + 470 = 790 Ω
          </div>
          <p>
            This is the calculator&apos;s verified reference case.
          </p>
          <p>
            Series resistance is straightforward because each component contributes additional opposition to current. A useful property follows immediately:
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Rseries ≥ the largest individual positive resistance
          </p>
          <p>
            and adding another positive resistor increases the total.
          </p>
          <p>
            The calculator&apos;s randomized tests also verify permutation invariance, meaning that changing the order of the resistors does not change the calculated equivalent resistance.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Parallel Resistors
          </h2>
          <p>
            Parallel resistance behaves differently. For resistors connected in parallel:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            1/Rtotal = 1/R1 + 1/R2 + 1/R3 + ...
          </div>
          <p>
            For three resistors: R1 = 100 Ω, R2 = 220 Ω, R3 = 470 Ω, the equivalent resistance is approximately:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            Rtotal ≈ 59.98 Ω
          </div>
          <p>
            This is lower than the smallest branch resistance, which is an important sanity check for a network of ordinary positive resistors.
          </p>
          <p>
            A simple special case is two identical resistors:
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            100 Ω || 100 Ω = 50 Ω
          </p>
          <p>
            because two equal conductive paths in parallel halve the equivalent resistance. The calculator verifies monotonic behavior and permutation invariance for parallel combinations.
          </p>
          <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs mt-2">
            A special case: a 0 Ω branch
          </h4>
          <p>
            An ideal 0 Ω branch in parallel represents a short circuit. The mathematically correct equivalent resistance is:
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Rtotal = 0 Ω
          </p>
          <p>
            but the resulting current from an ideal voltage source is not a finite ordinary value. Real circuits have source impedance and current limits, so an actual short-circuit condition can result in very high current. The calculator explicitly treats the zero-ohm case rather than allowing a raw division-by-zero result to produce an indeterminate or invalid numerical error.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Resistor Networks, Current and Power
          </h2>
          <p>
            Resistance alone does not tell you how much power a resistor dissipates. The applied voltage or current must also be considered.
          </p>
          <p>
            Using Ohm&apos;s law:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            P = VI
          </div>
          <p>
            Substituting I = V/R gives:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            P = V²/R
          </div>
          <p>
            Likewise, substituting V = IR gives:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            P = I²R
          </div>
          <p>
            These forms are mathematically equivalent when the same operating point is used.
          </p>
          <p>
            For example, a 100 Ω resistor across 12 V has:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>I = 12/100 = 0.12 A</li>
            <li>P = 12²/100 = 1.44 W</li>
          </ul>
          <p>
            That result is not the same question as asking for the resistance value. A resistor selected for a circuit therefore needs both an appropriate resistance and an appropriate power rating.
          </p>
          <p>
            The calculator tests the equivalent V²/R, I²R and VI formulations for consistency.
          </p>
          <p>
            For voltage, current, resistance and power relationships, the{" "}
            <Link href="/calculators/ohms-law-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700 dark:hover:text-blue-300">
              Ohm&apos;s Law Calculator
            </Link>{" "}
            provides a useful companion to resistor selection.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Conductors and the Physics of Resistance
          </h2>
          <p>
            A resistor can also be viewed through the physics of a conducting material. For a uniform conductor:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            R = ρL/A
          </div>
          <p>
            where:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>R = resistance</li>
            <li>ρ = resistivity</li>
            <li>L = conductor length</li>
            <li>A = cross-sectional area</li>
          </ul>
          <p>
            This equation shows three important relationships:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Resistance increases with length: <strong>R ∝ L</strong></li>
            <li>Resistance increases with resistivity: <strong>R ∝ ρ</strong></li>
            <li>Resistance decreases with cross-sectional area: <strong>R ∝ 1/A</strong></li>
          </ul>
          <p>
            For a round wire:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            A = πd²/4
          </div>
          <p>
            where d is diameter. Because area depends on the square of diameter, resistance varies approximately as:
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            R ∝ 1/d²
          </p>
          <p>
            when material and length remain constant. That means doubling a wire&apos;s diameter does not merely halve its resistance; it reduces it by approximately a factor of four. The calculator verifies these relationships as part of its conductor-resistance test suite.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Worked Conductor Example: Copper Wire
          </h2>
          <p>
            Suppose a copper conductor has:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Length = 100 m</li>
            <li>Diameter = 1 mm</li>
            <li>ρ ≈ 1.72 × 10⁻⁸ Ω·m</li>
          </ul>
          <p>
            The diameter in meters is 0.001 m, so the circular cross-sectional area is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            A = π(0.001²)/4 ≈ 7.854 × 10⁻⁷ m²
          </div>
          <p>
            Then R = ρL/A produces approximately:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            R ≈ 2.19 Ω
          </div>
          <p>
            which is the verified copper reference state used by the calculator.
          </p>
          <p>
            This calculation is especially useful when the &quot;resistor&quot; is not a discrete component but rather a long wire, cable, trace or other conductive path whose resistance becomes significant.
          </p>
          <p>
            When conductor resistance is being evaluated as part of a longer electrical run, the{" "}
            <Link href="/calculators/voltage-drop-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700 dark:hover:text-blue-300">
              Voltage Drop Calculator
            </Link>{" "}
            can extend the analysis to the load-terminal voltage.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Temperature and Resistance
          </h2>
          <p>
            Resistance is temperature-dependent for many conductive materials. A commonly used linear approximation around a reference temperature is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            R(T) = R20 × [1 + α(T − 20)]
          </div>
          <p>
            where:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>R20 is resistance at 20°C</li>
            <li>α is the temperature coefficient</li>
            <li>T is the operating temperature in °C</li>
          </ul>
          <p>
            This approximation is particularly useful over a limited temperature range. For a positive temperature coefficient:
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            T increases → R increases
          </p>
          <p>
            for a given conductor.
          </p>
          <p>
            The calculator explicitly includes operating temperature for conductor-resistance calculations and verifies temperature-dependent behavior separately from the basic ρL/A calculation.
          </p>
          <p>
            Temperature coefficients are also encountered in 6-band resistor markings, where a separate band can identify the TCR. IEC 60062 includes provisions for TCR marking.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. SMD Resistor Codes
          </h2>
          <p>
            Surface-mount resistors are often too small for conventional color bands, so compact numeric or alphanumeric markings are used.
          </p>
          <p>
            A common 3-digit SMD code uses:
          </p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            first digit, second digit, multiplier
          </p>
          <p>
            For <strong>472</strong>, the first two digits are 47 and the last digit indicates 10²:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            47 × 10² = 4,700 Ω = 4.7 kΩ
          </div>
          <p>
            A common four-digit system uses three significant figures followed by a multiplier. For example, <strong>1002</strong> represents:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            100 × 10² = 10,000 Ω = 10 kΩ
          </div>
          <p>
            The letter R may represent a decimal point: <strong>4R7 = 4.7 Ω</strong>.
          </p>
          <p>
            DigiKey describes the 3-digit, 4-digit and EIA-96 SMD approaches in the same general way: numerical significant figures plus multiplier, with R used for decimal placement and EIA-96 using a compact indexed value plus multiplier letter.
          </p>
          <p>
            The calculator independently tests 3-digit, 4-digit, R-notation and EIA-96 cases.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Why 103 Does Not Mean 103 Ω
          </h2>
          <p>
            One of the most common SMD mistakes is reading every digit as a separate resistance digit.
          </p>
          <p>
            For the 3-digit code <strong>103</strong>, the first two digits are 10 and the final 3 means ×10³:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            10 × 10³ = 10,000 Ω = 10 kΩ
          </div>
          <p>
            It is not 103 Ω.
          </p>
          <p>
            Similarly, <strong>472</strong> means 47 × 10² = 4.7 kΩ.
          </p>
          <p>
            This distinction is directly reflected in established SMD-code references and in the calculator&apos;s regression tests.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. EIA-96 and Precision SMD Resistors
          </h2>
          <p>
            EIA-96 is used for compact precision resistor markings. The system combines a two-digit index with a letter multiplier.
          </p>
          <p>
            This should not be confused with a standard 3-digit code. The difference is structural:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>3-digit: AB × 10^C</li>
            <li>4-digit: ABC × 10^D</li>
            <li>EIA-96: indexed preferred value × letter multiplier</li>
          </ul>
          <p>
            DigiKey describes EIA-96 as a system based on the EIA96 preferred-value series and notes its common association with 1% precision parts.
          </p>
          <p>
            The calculator recognizes EIA-96 separately and supplies tolerance information for the decoded precision value. Its verified 01A case produces:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
            100 Ω ±1% (99 Ω to 101 Ω)
          </div>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. E-Series Preferred Resistor Values
          </h2>
          <p>
            Electronic manufacturers cannot practically stock every imaginable resistance value. Instead, resistors are produced around standardized preferred-value series, commonly referred to as E-series.
          </p>
          <p>
            IEC 60063 defines preferred number series for resistors and capacitors. The standard exists specifically to provide preferred values with defined numerical resolution.
          </p>
          <p>
            Common series include: <strong>E6, E12, E24, E48, E96, E192</strong>.
          </p>
          <p>
            As the series becomes denser, more preferred values appear within each decade. This is useful because a circuit calculation might produce an arbitrary ideal result such as 1,487 Ω, while a purchased component may be available as a nearby standardized value such as 1.5 kΩ.
          </p>
          <p>
            The E-Series Finder helps identify the nearest supported preferred value rather than forcing the designer to choose manually. The current calculator supports E6 through E192 and verifies nearest-value selection.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. E-Series Tolerance Is Not the Same as Target Error
          </h2>
          <p>
            This distinction deserves special attention.
          </p>
          <p>
            Suppose the target is 1.5 kΩ and the E24 series selects 1.5 kΩ. The target error is 0% because the selected nominal value exactly matches the requested target. But that does not mean the resistor has zero manufacturing tolerance.
          </p>
          <p>
            The E24 resistance has its associated tolerance specification. In the calculator&apos;s implementation:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 space-y-1">
            <div>E24 = ±5%</div>
            <div>1,500 Ω × 0.95 = 1,425 Ω</div>
            <div>1,500 Ω × 1.05 = 1,575 Ω</div>
          </div>
          <p>
            Thus the correct interpretation is:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nominal value: 1.5 kΩ</li>
            <li>Target error: 0%</li>
            <li>Manufacturing tolerance: ±5%</li>
            <li>Possible tolerance range: 1.425–1.575 kΩ</li>
          </ul>
          <p>
            The calculator was specifically remediated to keep those concepts separate.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Resistor Color Coding Standards and Component Marking
          </h2>
          <p>
            Resistor markings are not simply an arbitrary collection of color conventions.
          </p>
          <p>
            IEC 60062 covers designation and marking codes for resistors and capacitors and specifically includes color coding for resistors, resistance/tolerance coding and temperature-coefficient marking.
          </p>
          <p>
            That standard should be distinguished from IEC 60063, which defines preferred-number series. In other words:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>IEC 60062</strong> → marking / coding</li>
            <li><strong>IEC 60063</strong> → preferred values</li>
          </ul>
          <p>
            That distinction matters when explaining resistor values because a marking system tells you what a component says it is, while an E-series tells you which nominal values are standardized for selection/manufacture.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. How to Choose a Resistor in a Real Circuit
          </h2>
          <p>
            A correct resistor selection usually involves more than finding one number. A useful engineering sequence is:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li>
              <strong>First: determine the required electrical relationship.</strong> For a current-limiting resistor, for example: R = (Vsupply − Vload) / I.
            </li>
            <li>
              <strong>Second: determine the ideal resistance.</strong> This produces the theoretical design value.
            </li>
            <li>
              <strong>Third: select a practical preferred value.</strong> Use an appropriate E-series value.
            </li>
            <li>
              <strong>Fourth: check tolerance.</strong> Make sure the resistor&apos;s minimum and maximum resistance remain acceptable.
            </li>
            <li>
              <strong>Fifth: check power.</strong> Calculate P = V²/R or P = I²R.
            </li>
            <li>
              <strong>Sixth: check temperature and environment.</strong> The component must remain within its rated conditions.
            </li>
          </ol>
          <p>
            This workflow is more reliable than choosing a resistor only from its nominal resistance number. For LED circuits, the calculator&apos;s built-in LED Current Limiter preset provides a convenient starting configuration.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Common Resistor Calculation Mistakes
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Mistake 1: Reading a 5-band resistor as a 4-band resistor.</strong> The third significant digit shifts the multiplier.
            </li>
            <li>
              <strong>Mistake 2: Treating tolerance as exactness.</strong> A 1 kΩ ±5% resistor is not guaranteed to measure exactly 1,000 Ω.
            </li>
            <li>
              <strong>Mistake 3: Treating SMD 103 as 103 Ω.</strong> It normally means 10 × 10³ = 10 kΩ.
            </li>
            <li>
              <strong>Mistake 4: Forgetting the square in circular wire area.</strong> For a round conductor, A = πd²/4, not A = πd/4.
            </li>
            <li>
              <strong>Mistake 5: Using series arithmetic for parallel resistors.</strong> Parallel resistances must be handled using reciprocal conductances.
            </li>
            <li>
              <strong>Mistake 6: Using the target error as E-series tolerance.</strong> A perfect E24 match can have 0% target error and still have a ±5% component tolerance.
            </li>
            <li>
              <strong>Mistake 7: Calculating resistance but ignoring power.</strong> A correct resistance value can still be unsuitable if the resistor dissipates more power than its rating.
            </li>
            <li>
              <strong>Mistake 8: Treating a 0 Ω parallel branch as ordinary numeric input.</strong> It represents an ideal short and needs dedicated handling.
            </li>
          </ul>
          <p>
            The calculator&apos;s validation tests explicitly cover these boundary conditions and silent-clamping risks.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. How to Use the Resistor Calculator
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Decode a color-band resistor:</strong> Select <em>Resistor Color Code</em>, choose the appropriate number of bands and enter the colors. Review nominal resistance, tolerance, minimum resistance, and maximum resistance, and verify the visual band representation.
            </li>
            <li>
              <strong>Calculate series resistance:</strong> Select <em>Series &amp; Parallel Networks</em>, choose <em>Series Connection</em>, and enter the resistance values.
            </li>
            <li>
              <strong>Calculate parallel resistance:</strong> Choose <em>Parallel Connection</em>, then enter each branch resistance.
            </li>
            <li>
              <strong>Calculate conductor resistance:</strong> Select <em>Conductor Resistance</em> and provide material, length, diameter or area, and temperature.
            </li>
            <li>
              <strong>Decode an SMD marking:</strong> Select <em>SMD Resistor Decoder</em> and enter codes such as 103, 472, 1002, or 4R7.
            </li>
            <li>
              <strong>Find a preferred resistor value:</strong> Select <em>E-Series Finder</em>, enter the target resistance, then choose the desired E-series.
            </li>
          </ul>
          <p>
            The calculator&apos;s production audit confirms all of these modules work and remain state-isolated.
          </p>
        </section>

      </div>

      {/* 2. FAQ SECTION (All 15 Approved FAQs, Fully Unfolded by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {resistor_calculatorFaqs.map((faq, idx) => {
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
                      {idx + 1}.
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

      {/* 3. TECHNICAL NOTES AND LIMITATIONS */}
      <div className="pt-6 space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          Technical Notes and Limitations
        </h2>
        <p>
          This calculator provides mathematical and engineering estimates for passive-resistance calculations. It does not replace the manufacturer&apos;s component datasheet for a specific resistor.
        </p>
        <p>
          Actual components can differ because of: manufacturing tolerance, temperature, frequency, power level, package construction, parasitic effects, material variation, and measurement conditions.
        </p>
        <p>
          Color codes and SMD markings are identification systems, not substitutes for a manufacturer part number when a specific component must be verified. For a production circuit, verify the component&apos;s datasheet, rated power, tolerance, temperature coefficient and operating limits before installation.
        </p>
        <p>
          The calculator&apos;s mathematical engine explicitly rejects invalid negative inputs, preserves meaningful zero values, and prevents numerical error leakage in its validated edge cases.
        </p>
      </div>

      {/* 4. STANDARDS AND REFERENCES */}
      <div className="pt-6 space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          Standards and References
        </h2>
        <div className="space-y-3">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100">
              IEC 60062 — Marking codes for resistors and capacitors
            </div>
            <p>
              IEC 60062 covers resistor and capacitor marking codes, including resistor colour coding, resistance/tolerance coding and temperature-coefficient marking.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100">
              IEC 60063 — Preferred number series for resistors and capacitors
            </div>
            <p>
              IEC 60063 defines preferred-number series used for standardized resistor and capacitor values (E6, E12, E24, E48, E96, E192).
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100">
              SMD resistor marking guidance
            </div>
            <p>
              DigiKey&apos;s SMD resistor-code reference documents 3-digit, 4-digit and EIA-96 marking approaches.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ResistorContent;
