"use client";

import React from "react";

export function ExponentContent() {
  return (
    <div className="space-y-8 text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
      {/* SECTION 1: WHAT IS AN EXPONENT */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          1. What is an Exponent? (Base, Power & Terminology)
        </h2>
        <p className="text-sm leading-relaxed">
          An <strong>exponent</strong> (also referred to as an <em>index</em> or <em>power</em>) is a mathematical operation that indicates how many times a number, called the <strong>base</strong>, is multiplied by itself. The shorthand notation <code>bⁿ</code> encapsulates repeated multiplication into an elegant expression:
        </p>
        
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-bold text-center text-base font-sans tabular-nums">
          {"bⁿ = b × b × ... × b  (n times)"}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Base (b)</h3>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
              The core value that undergoes repeated multiplication. The base can be any real number, negative value, fraction, or complex quantity.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Exponent (n)</h3>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
              The superscript number specifying how many factors of the base are multiplied together. It can be positive, negative, zero, or a rational fraction.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Evaluated Power (y)</h3>
            <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
              The final product resulting from the exponentiation operation <code>y = bⁿ</code>. For example, in <code>2⁴ = 16</code>, 16 is the evaluated power.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 8 FUNDAMENTAL LAWS OF EXPONENTS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          2. The 8 Fundamental Laws of Exponents (With Proofs & Examples)
        </h2>
        <p className="text-sm leading-relaxed">
          Exponent laws provide universal algebraic rules for simplifying, multiplying, dividing, and manipulating expressions containing powers. Below are the 8 fundamental exponent laws with mathematical proofs and numerical examples.
        </p>

        <div className="space-y-4 pt-2">
          {/* Rule 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              1. Product of Powers Rule: bᵐ · bⁿ = bᵐ⁺ⁿ
            </h3>
            <p className="text-xs leading-relaxed font-medium">
              When multiplying expressions that share identical bases, retain the base and add the exponent powers together.
            </p>
            <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs font-bold text-blue-700 dark:text-blue-400 font-sans tabular-nums">
              Proof & Example: 2³ · 2⁴ = (2 × 2 × 2) · (2 × 2 × 2 × 2) = 2³⁺⁴ = 2⁷ = 128
            </div>
          </div>

          {/* Rule 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              2. Quotient of Powers Rule: bᵐ / bⁿ = bᵐ⁻ⁿ (b ≠ 0)
            </h3>
            <p className="text-xs leading-relaxed font-medium">
              When dividing expressions with identical non-zero bases, retain the base and subtract the denominator exponent from the numerator exponent.
            </p>
            <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs font-bold text-blue-700 dark:text-blue-400 font-sans tabular-nums">
              Proof & Example: 5⁶ / 5² = (5 × 5 × 5 × 5 × 5 × 5) / (5 × 5) = 5⁶⁻² = 5⁴ = 625
            </div>
          </div>

          {/* Rule 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              3. Power of a Power Rule: (bᵐ)ⁿ = bᵐ·ⁿ
            </h3>
            <p className="text-xs leading-relaxed font-medium">
              When an exponential expression is raised to another power, retain the base and multiply the exponents together.
            </p>
            <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs font-bold text-blue-700 dark:text-blue-400 font-sans tabular-nums">
              Proof & Example: (3²)⁴ = 3² × 3² × 3² × 3² = 3²ˣ⁴ = 3⁸ = 6,561
            </div>
          </div>

          {/* Rule 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              4. Power of a Product Rule: (a · b)ⁿ = aⁿ · bⁿ
            </h3>
            <p className="text-xs leading-relaxed font-medium">
              An exponent outside a product container distributes to every individual factor inside the parentheses.
            </p>
            <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs font-bold text-blue-700 dark:text-blue-400 font-sans tabular-nums">
              Proof & Example: (2 × 4)³ = 8³ = 512 ⇔ 2³ × 4³ = 8 × 64 = 512
            </div>
          </div>

          {/* Rule 5 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              5. Power of a Quotient Rule: (a / b)ⁿ = aⁿ / bⁿ (b ≠ 0)
            </h3>
            <p className="text-xs leading-relaxed font-medium">
              An exponent applied to a fraction distributes to both the numerator and the denominator independently.
            </p>
            <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs font-bold text-blue-700 dark:text-blue-400 font-sans tabular-nums">
              Proof & Example: (3 / 5)³ = 3³ / 5³ = 27 / 125 = 0.216
            </div>
          </div>

          {/* Rule 6 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              6. Zero Exponent Rule: b⁰ = 1 (b ≠ 0)
            </h3>
            <p className="text-xs leading-relaxed font-medium">
              Any non-zero real number raised to the 0 power equals 1. This follows logically from dividing a term by itself using the Quotient Rule.
            </p>
            <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs font-bold text-blue-700 dark:text-blue-400 font-sans tabular-nums">
              Proof: bⁿ / bⁿ = bⁿ⁻ⁿ = b⁰. Since any non-zero number divided by itself equals 1, b⁰ = 1. Example: 999⁰ = 1.
            </div>
          </div>

          {/* Rule 7 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              7. Negative Exponent Rule: b⁻ⁿ = 1 / bⁿ (b ≠ 0)
            </h3>
            <p className="text-xs leading-relaxed font-medium">
              A negative exponent represents division or the reciprocal of the base raised to the positive power.
            </p>
            <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs font-bold text-blue-700 dark:text-blue-400 font-sans tabular-nums">
              {"Proof & Example: 2⁻³ = 1 / (2³) = 1 / 8 = 0.125. For fractions: (2/3)⁻² = (3/2)² = 9 / 4 = 2.25."}
            </div>
          </div>

          {/* Rule 8 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
              {"8. Fractional / Rational Exponent Rule: bᵐ/ⁿ = ⁿ√(bᵐ) = (ⁿ√b)ᵐ"}
            </h3>
            <p className="text-xs leading-relaxed font-medium">
              In a fractional exponent m/n, the denominator n specifies the root index, while the numerator m specifies the power.
            </p>
            <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs font-bold text-blue-700 dark:text-blue-400 font-sans tabular-nums">
              {"Proof & Example: 27^(2/3) = (³√27)² = 3² = 9. Alternatively: ³√(27²) = ³√729 = 9."}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SPECIAL BASES & EXPONENTIAL CONSTANTS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          3. Special Bases & Exponential Constants
        </h2>
        <p className="text-sm leading-relaxed">
          Certain bases possess fundamental importance across mathematics, science, computing, and finance:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">Powers of 10 (10ᵏ)</h3>
            <p className="text-xs leading-relaxed font-medium">
              Forms the foundation of the decimal system, place value shifting, and <strong>Scientific Notation</strong>. Multiplying by 10ᵏ shifts the decimal point k places right, while 10⁻ᵏ shifts it left.
            </p>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 font-sans tabular-nums">
              Example: 5.4 × 10⁶ = 5,400,000
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">Powers of 2 (2ᵏ)</h3>
            <p className="text-xs leading-relaxed font-medium">
              Governs binary computer architecture, memory addressing, data structures, and algorithmic complexity. Memory sizes rely directly on powers of 2.
            </p>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 font-sans tabular-nums">
              Example: 2¹⁰ = 1,024 Bytes = 1 KiB
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">Euler&apos;s Number (e ≈ 2.71828)</h3>
            <p className="text-xs leading-relaxed font-medium">
              {"The natural exponential base defined as the limit lim (1 + 1/n)ⁿ as n → ∞. Essential for continuous compounding, calculus, and population dynamics."}
            </p>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 font-sans tabular-nums">
              Formula: A = P · eʳᵗ
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMMON PITFALLS & ORDER OF OPERATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          4. Common Pitfalls & Order of Operations (PEMDAS/BODMAS)
        </h2>
        <p className="text-sm leading-relaxed">
          Avoiding algebraic errors requires strict adherence to order of operations rules when evaluating powers and bases:
        </p>

        <div className="space-y-3 pt-1 text-xs">
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1.5">
            <h3 className="font-bold text-sm text-amber-800 dark:text-amber-300">
              Pitfall 1: Parentheses vs. Negation Sign ((-3)² vs. -3²)
            </h3>
            <p className="leading-relaxed font-medium text-slate-900 dark:text-slate-100">
              In standard order of operations (PEMDAS/BODMAS), exponentiation takes precedence over unary negation:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-sans tabular-nums">
              <li>(-3)² = (-3) × (-3) = +9 (Parentheses enclose the negative sign inside the base).</li>
              <li>-3² = -(3 × 3) = -9 (Exponent applies only to 3; negation is applied afterwards).</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">
              Pitfall 2: Fractional Base with Negative Powers
            </h3>
            <p className="leading-relaxed font-medium">
              To evaluate a negative exponent on a fraction, invert the numerator and denominator to make the power positive:
            </p>
            <div className="font-sans tabular-nums font-bold text-blue-700 dark:text-blue-400 p-2 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
              (2/3)⁻² = (3/2)² = 3² / 2² = 9 / 4 = 2.25
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">
              Pitfall 3: The Indeterminate Form 0⁰
            </h3>
            <p className="leading-relaxed font-medium">
              In combinatorics, set theory, and polynomial algebra, 0⁰ is universally defined as <strong>1</strong> (to preserve empty product definitions and power series expansions). However, in continuous calculus and mathematical analysis, 0⁰ represents an <strong>indeterminate limit form</strong> requiring L&apos;Hôpital&apos;s rule.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: REAL-WORLD APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          5. Real-World Applications of Exponents
        </h2>
        <p className="text-sm leading-relaxed">
          Exponential functions model rapid growth, decay, and logarithmic scaling phenomena across diverse disciplines:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Finance & Compound Interest</h3>
            <p className="leading-relaxed font-medium">
              Investment growth and debt accumulation follow exponential compound interest equations: A = P(1 + r/n)ⁿᵗ. Compounding allows interest earned in previous cycles to generate additional returns.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Seismology & Richter Scale</h3>
            <p className="leading-relaxed font-medium">
              {"Earthquake magnitude is measured on a base-10 logarithmic scale. A magnitude 7.0 earthquake releases 10^(1.5) ≈ 31.6 times more seismic energy than a magnitude 6.0 earthquake."}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Chemistry & pH Scale</h3>
            <p className="leading-relaxed font-medium">
              {"Acidity and alkalinity are measured via negative base-10 powers of hydrogen ion concentration: pH = -log₁₀[H⁺]. A solution with pH 3 is 10 times more acidic than pH 4."}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Computer Memory & Storage</h3>
            <p className="leading-relaxed font-medium">
              Transistor storage grids and binary addressing leverage powers of 2. A 64-bit operating system addresses up to 2⁶⁴ ≈ 18.4 quintillion unique RAM memory bytes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ExponentContent;
