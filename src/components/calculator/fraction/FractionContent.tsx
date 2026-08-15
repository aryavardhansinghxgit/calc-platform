"use client";

import React from "react";

export function FractionContent() {
  return (
    <article className="prose dark:prose-invert max-w-none space-y-8 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed pt-6 border-t border-zinc-200 dark:border-zinc-800">
      {/* 1. WHAT IS A FRACTION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>1.</span> What Is A Fraction?
        </h2>
        <p>
          In mathematics, a <strong>fraction</strong> represents a numerical quantity that is not a whole number. It expresses a part of a whole or, more generally, any number of equal parts. A fraction is written in the form {"\\(a / b\\)"}, where {"\\(a\\)"} and {"\\(b\\)"} are integers, and {"\\(b \\neq 0\\)"}.
        </p>
        <p>
          Fractions are fundamental to arithmetic, algebra, geometry, and real-world measurements. Whether dividing a pizza among friends, measuring architectural dimensions in inches, or computing probability in statistics, fractions provide an exact mathematical representation of rational proportions.
        </p>
      </section>

      {/* 2. PARTS OF A FRACTION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>2.</span> Parts Of A Fraction
        </h2>
        <p>Every standard fraction consists of three distinct mathematical components:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Numerator ({"a"}):</strong> The top number in a fraction. It indicates how many equal parts are selected or being considered.
          </li>
          <li>
            <strong>Fraction Bar (Vinculum):</strong> The horizontal line separating the top and bottom numbers, representing mathematical division ({"a ÷ b"}).
          </li>
          <li>
            <strong>Denominator ({"b"}):</strong> The bottom number in a fraction. It indicates the total number of equal parts into which the whole is divided. The denominator can never equal zero.
          </li>
        </ul>
      </section>

      {/* 3. PROPER FRACTIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>3.</span> Proper Fractions
        </h2>
        <p>
          A <strong>proper fraction</strong> is a fraction in which the absolute value of the numerator is strictly less than the absolute value of the denominator ({"|a| < |b|"}).
        </p>
        <p>
          Because the numerator is smaller than the denominator, the absolute value of a proper fraction is always strictly less than 1 (for example, 3/4 = 0.75, 5/8 = 0.625, and 1/2 = 0.5).
        </p>
      </section>

      {/* 4. IMPROPER FRACTIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>4.</span> Improper Fractions
        </h2>
        <p>
          An <strong>improper fraction</strong> is a fraction in which the absolute value of the numerator is greater than or equal to the absolute value of the denominator ({"|a| ≥ |b|"}).
        </p>
        <p>
          An improper fraction represents a value greater than or equal to 1. For instance, 7/4 = 1.75 and 11/3 = 3.666... In advanced algebra and calculus, improper fractions are preferred over mixed numbers because they simplify polynomial and matrix calculations.
        </p>
      </section>

      {/* 5. MIXED NUMBERS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>5.</span> Mixed Numbers
        </h2>
        <p>
          A <strong>mixed number</strong> (or mixed fraction) combines a non-zero whole number and a proper fraction, written as {"w a/b"}. It represents the sum {"w + a/b"}.
        </p>
        <p>
          To convert a mixed number {"w a/b"} to an improper fraction:
        </p>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold">
          {"Improper Fraction = [(Whole × Denominator) + Numerator] / Denominator"}
        </div>
      </section>

      {/* 6. EQUIVALENT FRACTIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>6.</span> Equivalent Fractions
        </h2>
        <p>
          <strong>Equivalent fractions</strong> are different fractions that name the exact same numerical value. Multiplying or dividing both the numerator and denominator by the same non-zero integer generates an equivalent fraction.
        </p>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold">
          {"a / b = (a × k) / (b × k)   for any k ≠ 0"}
        </div>
        <p>For example: 1/2 = 2/4 = 3/6 = 4/8 = 5/10 = 0.5.</p>
      </section>

      {/* 7. FRACTION SIMPLIFICATION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>7.</span> Fraction Simplification (Lowest Terms)
        </h2>
        <p>
          Simplifying a fraction (reducing it to lowest terms) means dividing both the numerator and denominator by their <strong>Greatest Common Divisor (GCD)</strong> until no integer other than 1 can divide both numbers evenly.
        </p>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold">
          {"Simplified Fraction = [Numerator ÷ GCD] / [Denominator ÷ GCD]"}
        </div>
      </section>

      {/* 8. FRACTION ADDITION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>8.</span> Fraction Addition
        </h2>
        <p>
          To add two fractions with different denominators, you must first convert them to equivalent fractions sharing a <strong>Least Common Denominator (LCD)</strong>:
        </p>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold">
          {"a/b + c/d = (a·d + b·c) / (b·d)"}
        </div>
      </section>

      {/* 9. FRACTION SUBTRACTION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>9.</span> Fraction Subtraction
        </h2>
        <p>
          Fraction subtraction follows the exact same LCD principles as addition:
        </p>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold">
          {"a/b - c/d = (a·d - b·c) / (b·d)"}
        </div>
      </section>

      {/* 10. FRACTION MULTIPLICATION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>10.</span> Fraction Multiplication
        </h2>
        <p>
          Unlike addition, fraction multiplication does NOT require a common denominator. Simply multiply top times top and bottom times bottom:
        </p>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold">
          {"(a/b) × (c/d) = (a × c) / (b × d)"}
        </div>
      </section>

      {/* 11. FRACTION DIVISION */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>11.</span> Fraction Division
        </h2>
        <p>
          To divide by a fraction, multiply by its <strong>reciprocal</strong> (flip the second fraction):
        </p>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold">
          {"(a/b) ÷ (c/d) = (a/b) × (d/c) = (a × d) / (b × c)"}
        </div>
      </section>

      {/* 12. CONVERTING FRACTIONS TO DECIMALS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>12.</span> Converting Fractions To Decimals
        </h2>
        <p>
          To convert a fraction a/b into a decimal, perform long division: divide numerator a by denominator b. If the prime factors of the simplified denominator contain only 2 and 5, the decimal terminates (e.g. 3/8 = 0.375). Otherwise, it produces a repeating decimal (e.g. 1/3 = 0.333...).
        </p>
      </section>

      {/* 13. CONVERTING DECIMALS TO FRACTIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>13.</span> Converting Decimals To Fractions
        </h2>
        <p>
          For terminating decimals, count the decimal places (d) and set the denominator to 10^d, then simplify. For repeating decimals, set up an algebraic equation (10^k · x - x) to eliminate the recurring digits.
        </p>
      </section>

      {/* 14. FRACTIONS AND PERCENTAGES */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>14.</span> Fractions And Percentages
        </h2>
        <p>
          A percentage is simply a fraction with a denominator of 100. To convert a fraction a/b to a percentage, multiply by 100%:
        </p>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold">
          {"Percentage = (a / b) × 100%"}
        </div>
      </section>

      {/* 15. COMMON FRACTION MISTAKES */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>15.</span> Common Fraction Mistakes
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Adding Denominators:</strong> Incorrectly writing 1/3 + 1/4 = 2/7. Correct method requires converting to common denominator 12: 4/12 + 3/12 = 7/12.
          </li>
          <li>
            <strong>Dividing Zero Denominators:</strong> Attempting to evaluate 5/0, which is undefined in mathematics.
          </li>
          <li>
            <strong>Forgetting Reciprocal in Division:</strong> Multiplying across without flipping the divisor.
          </li>
        </ul>
      </section>

      {/* 16. FRACTION APPLICATIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>16.</span> Practical Applications
        </h2>
        <p>
          Fractions are used in structural engineering (beam tolerances), culinary arts (recipe scaling), finance (interest rates and stock yields), carpentry (fractional inch measurements), and medicine (dosage calculations).
        </p>
      </section>

      {/* 17. ADVANCED FRACTION CONCEPTS */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>17.</span> Advanced Fraction Concepts
        </h2>
        <p>
          Advanced mathematical topics include <strong>Continued Fractions</strong> (used to approximate irrational constants like π and e), <strong>Partial Fraction Decomposition</strong> (used in calculus integration), and <strong>Algebraic Rational Expressions</strong>.
        </p>
      </section>

      {/* 18. WORKED EXAMPLES SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>18.</span> Worked Mathematical Examples
        </h2>

        <div className="space-y-4">
          {/* BASIC EXAMPLE */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">Basic Example: Add 3/4 + 1/6</h3>
            <ol className="list-decimal pl-6 space-y-1 text-xs">
              <li>Find LCM of denominators 4 and 6: LCM(4, 6) = 12.</li>
              <li>Convert to equivalent fractions: (3 × 3)/(4 × 3) = 9/12 and (1 × 2)/(6 × 2) = 2/12.</li>
              <li>Add numerators: (9 + 2)/12 = 11/12.</li>
            </ol>
            <div className="text-xs font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">Final Answer: 11/12</div>
          </div>

          {/* INTERMEDIATE EXAMPLE */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">Intermediate Example: Divide 2 1/3 ÷ 1 1/2</h3>
            <ol className="list-decimal pl-6 space-y-1 text-xs">
              <li>Convert to improper fractions: 2 1/3 = 7/3 and 1 1/2 = 3/2.</li>
              <li>Multiply by reciprocal: (7/3) × (2/3) = 14/9.</li>
              <li>Convert to mixed number: 14 ÷ 9 = 1 remainder 5 ➔ 1 5/9.</li>
            </ol>
            <div className="text-xs font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">Final Answer: 1 5/9</div>
          </div>

          {/* ADVANCED EXAMPLE */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">Advanced Example: Convert Repeating Decimal 0.142857142857...</h3>
            <ol className="list-decimal pl-6 space-y-1 text-xs">
              <li>Let x = 0.142857... Repeating block length is 6 digits.</li>
              <li>Multiply by 10^6: 1000000x = 142857.142857...</li>
              <li>Subtract: 999999x = 142857 ➔ x = 142857 / 999999.</li>
              <li>Simplify by GCD 142857: (142857 ÷ 142857) / (999999 ÷ 142857) = 1/7.</li>
            </ol>
            <div className="text-xs font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">Final Answer: 1/7</div>
          </div>
        </div>
      </section>

      {/* SUMMARY RECAP */}
      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Educational Summary</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Fractions express exact rational relationships that decimals cannot always represent concisely. Understanding proper vs improper forms, common denominators, and simplification provides the essential foundation for algebra, engineering, and scientific computation.
        </p>
      </section>
    </article>
  );
}
