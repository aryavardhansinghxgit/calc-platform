"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, BookOpen, Calculator, Layers, ShieldCheck, CheckCircle2, Lightbulb, AlertTriangle, Award } from "lucide-react";
import { scientific_notation_calculatorFaqs } from "@/app/calculators/scientific-notation-calculator/config";

export function ScientificNotationContent() {
  // All 15 FAQs open by default (unfolded)
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
      
      {/* ========================================================================= */}
      {/* RELATED CALCULATORS — ABOVE CONTENT ONLY */}
      {/* ========================================================================= */}
      <div className="no-print pb-2 space-y-1.5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
          RELATED CALCULATORS:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
          <Link
            href="/calculators/exponent-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Exponent Calculator
          </Link>
          <span>|</span>
          <Link
            href="/calculators/big-number-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Big Number Calculator
          </Link>
          <span>|</span>
          <Link
            href="/calculators/rounding-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Rounding Calculator
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EXPANDED MAIN EDUCATIONAL CONTENT (SECTIONS 1 TO 20) */}
      {/* ========================================================================= */}
      <div className="pt-8 space-y-10 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Introduction to Scientific Notation
          </h2>
          <p>
            Scientific notation is a compact way to write extremely large or extremely small numbers without relying on long strings of zeros. It is widely used in mathematics, physics, chemistry, engineering, astronomy, electronics, computing, and other STEM fields where numerical values can span many orders of magnitude.
          </p>
          <p>
            A number written in normalized scientific notation has the form:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center font-bold text-blue-700 dark:text-blue-300">
            a &times; 10ⁿ
          </div>
          <p>
            where <em>a</em> is the coefficient or significand and <em>n</em> is an integer exponent. For a nonzero value in normalized form, the magnitude of the coefficient is at least 1 and less than 10.
          </p>
          <p>
            For example:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>4,243,500,000 = 4.2435 &times; 10⁹</li>
            <li>0.00000625 = 6.25 &times; 10⁻⁶</li>
          </ul>
          <p>
            The exponent tells you the scale of the number. A positive exponent represents a value larger than 1, while a negative exponent represents a value between 0 and 1.
          </p>
          <p>
            This Scientific Notation Calculator &amp; Converter is designed for both learning and practical calculation. It can perform arithmetic directly on scientific-notation values, convert ordinary decimal numbers into scientific notation, display engineering notation and E-notation, and provide useful representations of physical constants.
          </p>
          <p>
            Instead of giving only a final number, the calculator can also show the mathematical reasoning behind operations such as multiplication, division, addition, subtraction, powers, and square roots.
          </p>
          <p>
            For calculations involving powers rather than scientific notation itself, an{" "}
            <Link href="/calculators/exponent-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              Exponent Calculator
            </Link>{" "}
            can be useful as a complementary tool.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. What Is Scientific Notation?
          </h2>
          <p>
            Scientific notation expresses a number as a coefficient multiplied by a power of ten:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center font-bold text-blue-700 dark:text-blue-300">
            N = a &times; 10ⁿ
          </div>
          <p>
            The defining normalization rule is:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center font-bold text-slate-900 dark:text-slate-100">
            1 &le; |a| &lt; 10
          </div>
          <p>
            For example:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>7.25 &times; 10⁴</strong> is valid normalized scientific notation.</li>
            <li><strong>0.725 &times; 10⁵</strong> is mathematically equivalent to the same number, but it is not normalized scientific notation because the coefficient is less than 1.</li>
            <li><strong>72.5 &times; 10³</strong> is also mathematically equivalent, but it is not normalized because the coefficient is greater than or equal to 10.</li>
          </ul>
          <p>
            The normalized form is therefore: <strong>7.25 &times; 10⁴</strong>.
          </p>
          <p>
            This standardization is important because it gives every nonzero number a consistent representation. The coefficient contains the significant numerical digits of the leading part of the value, while the exponent records its order of magnitude.
          </p>
          <p>
            Scientific notation is especially useful when ordinary decimal notation becomes cumbersome. Compare:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <p>Ordinary decimal: 0.0000000000000000000000000000000000016</p>
            <p className="font-bold text-blue-600 dark:text-blue-400">Scientific notation: 1.6 &times; 10⁻³⁶</p>
          </div>
          <p>
            The second representation communicates the scale much more clearly.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How to Convert a Number to Scientific Notation
          </h2>
          <p>
            To convert an ordinary decimal number into scientific notation, move the decimal point until exactly one nonzero digit remains to the left of the decimal point. The number of places moved becomes the exponent of 10.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Large numbers
          </h3>
          <p>
            Consider: <strong>4,560,000</strong>
          </p>
          <p>
            Move the decimal point six places to the left: 4,560,000 &rarr; 4.56
          </p>
          <p className="font-mono font-semibold text-blue-600 dark:text-blue-400">
            4,560,000 = 4.56 &times; 10⁶
          </p>
          <p>
            The exponent is positive because the original value is greater than 1.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Small numbers
          </h3>
          <p>
            Consider: <strong>0.00000456</strong>
          </p>
          <p>
            Move the decimal point six places to the right: 0.00000456 &rarr; 4.56
          </p>
          <p className="font-mono font-semibold text-blue-600 dark:text-blue-400">
            0.00000456 = 4.56 &times; 10⁻⁶
          </p>
          <p>
            The exponent is negative because the original value is less than 1.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            A useful checking rule
          </h3>
          <p>
            After conversion, verify two things:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>The coefficient has a magnitude from 1 up to, but not including, 10.</li>
            <li>Multiplying that coefficient by the corresponding power of 10 reconstructs the original number.</li>
          </ol>
          <p>
            For example:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>2.75 &times; 10⁶ = 2,750,000</li>
            <li>2.75 &times; 10⁻⁶ = 0.00000275</li>
          </ul>
          <p>
            The sign of the exponent therefore carries important scale information.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Positive and Negative Exponents Explained
          </h2>
          <p>
            The exponent determines how far the decimal point moves when a scientific-notation value is converted to ordinary decimal form.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Positive exponent
          </h3>
          <p>
            A positive exponent moves the decimal point to the right.
          </p>
          <p>
            For example: <strong>3.2 &times; 10⁵ = 320,000</strong> because 10⁵ = 100,000 and 3.2 &times; 100,000 = 320,000.
          </p>
          <p>
            Another example is: <strong>6.04 &times; 10³ = 6,040</strong>.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Negative exponent
          </h3>
          <p>
            A negative exponent moves the decimal point to the left.
          </p>
          <p>
            For example: <strong>3.2 &times; 10⁻⁵ = 0.000032</strong> because 10⁻⁵ = 1/100,000.
          </p>
          <p>
            Similarly: <strong>6.04 &times; 10⁻³ = 0.00604</strong>.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            What the exponent means
          </h3>
          <p>
            The exponent is not merely a formatting feature. It expresses the scale of the number:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>10⁸ is one hundred million.</li>
            <li>10⁻⁸ is one hundred-millionth.</li>
          </ul>
          <p>
            This makes scientific notation particularly effective for quantities such as distances between astronomical objects, particle masses, electrical charges, wavelengths, frequencies, and microscopic measurements.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Rules for Multiplying Scientific Notation
          </h2>
          <p>
            Multiplication is one of the simplest scientific-notation operations because the powers of ten do not need to have matching exponents.
          </p>
          <p>
            For: <strong>(a &times; 10ᵐ)(b &times; 10ⁿ)</strong>, multiply the coefficients and add the exponents:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center font-bold text-blue-700 dark:text-blue-300">
            (a &times; b) &times; 10ᵐ⁺ⁿ
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Example
          </h3>
          <p>
            Calculate: <strong>(1.23 &times; 10⁷)(3.45 &times; 10²)</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>First multiply the coefficients: 1.23 &times; 3.45 = 4.2435</li>
            <li>Then add the exponents: 7 + 2 = 9</li>
          </ul>
          <p className="font-mono font-bold text-blue-600 dark:text-blue-400">
            (1.23 &times; 10⁷)(3.45 &times; 10²) = 4.2435 &times; 10⁹
          </p>
          <p>
            The result is already normalized because 4.2435 lies between 1 and 10.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Example requiring normalization
          </h3>
          <p>
            Consider: <strong>(8 &times; 10⁵)(4 &times; 10³)</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Multiply the coefficients: 8 &times; 4 = 32</li>
            <li>Add the exponents: 5 + 3 = 8</li>
            <li>This gives: 32 &times; 10⁸</li>
          </ul>
          <p>
            The coefficient is not normalized because 32 is greater than 10. Move the decimal point one place left:
          </p>
          <p className="font-mono font-bold text-blue-600 dark:text-blue-400">
            32 &times; 10⁸ = 3.2 &times; 10⁹
          </p>
          <p>
            Therefore: <strong>(8 &times; 10⁵)(4 &times; 10³) = 3.2 &times; 10⁹</strong>. The calculator automatically performs this normalization so the final result follows the standard scientific-notation convention.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Rules for Dividing Scientific Notation
          </h2>
          <p>
            For division: <strong>(a &times; 10ᵐ) / (b &times; 10ⁿ)</strong>, divide the coefficients and subtract the denominator exponent from the numerator exponent:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center font-bold text-blue-700 dark:text-blue-300">
            (a / b) &times; 10ᵐ⁻ⁿ
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Example
          </h3>
          <p>
            Calculate: <strong>(8.4 &times; 10⁹) / (2.1 &times; 10³)</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>First divide the coefficients: 8.4 / 2.1 = 4</li>
            <li>Then subtract the exponents: 9 &minus; 3 = 6</li>
          </ul>
          <p className="font-mono font-bold text-blue-600 dark:text-blue-400">
            (8.4 &times; 10⁹) / (2.1 &times; 10³) = 4 &times; 10⁶
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Why the subtraction occurs
          </h3>
          <p>
            The rule follows directly from the laws of exponents: 10ᵐ / 10ⁿ = 10ᵐ⁻ⁿ.
          </p>
          <p>
            The calculator keeps the coefficient and exponent calculations separate, which makes the process easier to inspect and verify. When the coefficient obtained after division is outside the normalized range, the answer must be renormalized before it is displayed.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Adding and Subtracting Numbers in Scientific Notation
          </h2>
          <p>
            Addition and subtraction are slightly different from multiplication and division. The exponents must first be aligned before the coefficients can be directly added or subtracted.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Addition with the same exponent
          </h3>
          <p>
            Consider: <strong>(2.5 &times; 10⁴) + (3.2 &times; 10⁴)</strong>
          </p>
          <p>
            Because both values already use 10⁴: (2.5 + 3.2) &times; 10⁴ = <strong>5.7 &times; 10⁴</strong>.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Addition with different exponents
          </h3>
          <p>
            Consider: <strong>(2 &times; 10⁵) + (3 &times; 10³)</strong>
          </p>
          <p>
            The exponents are different, so rewrite the smaller-scale number using 10⁵:
          </p>
          <p className="font-mono text-slate-700 dark:text-slate-300">
            3 &times; 10³ = 0.03 &times; 10⁵
          </p>
          <p>
            Now add: (2 + 0.03) &times; 10⁵ = <strong>2.03 &times; 10⁵</strong>.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Subtraction with different exponents
          </h3>
          <p>
            Consider: <strong>(5 &times; 10⁶) &minus; (2 &times; 10⁴)</strong>
          </p>
          <p>
            Rewrite the second number with 10⁶: 2 &times; 10⁴ = 0.02 &times; 10⁶.
          </p>
          <p>
            Then: (5 &minus; 0.02) &times; 10⁶ = <strong>4.98 &times; 10⁶</strong>.
          </p>
          <p>
            This alignment step is one of the most common places students make mistakes. The calculator explicitly demonstrates the exponent-alignment process so that the final answer is not treated as a black box.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Powers, Squares, and Square Roots in Scientific Notation
          </h2>
          <p>
            Scientific notation also works naturally with powers and roots.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Squaring a scientific-notation value
          </h3>
          <p>
            For: <strong>(a &times; 10ᵐ)&sup2;</strong>, square the coefficient and multiply the exponent by 2:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center font-bold text-blue-700 dark:text-blue-300">
            a&sup2; &times; 10&sup2;ᵐ
          </div>
          <p>
            Example: (2.5 &times; 10⁴)&sup2;
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>First square the coefficient: 2.5&sup2; = 6.25</li>
            <li>Then double the exponent: 2 &times; 4 = 8</li>
            <li>Therefore: (2.5 &times; 10⁴)&sup2; = <strong>6.25 &times; 10⁸</strong></li>
          </ul>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-1">
            Square root
          </h3>
          <p>
            For a square root, both the coefficient and power of ten must be handled. For example:
          </p>
          <p className="font-mono text-slate-700 dark:text-slate-300">
            &radic;(9 &times; 10⁶) = &radic;9 &times; &radic;10⁶ = 3 &times; 10³
          </p>
          <p>
            For a non-perfect result such as &radic;(2 &times; 10⁶), the calculator evaluates the numerical value (&asymp; 1414.213562) and then presents it in normalized scientific notation (1.4142 &times; 10&sup3;).
          </p>
          <p>
            This is particularly useful when working with quantities whose magnitude is much easier to express through powers of ten than by writing a complete decimal expansion.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Scientific Notation vs Engineering Notation
          </h2>
          <p>
            Scientific notation and engineering notation are closely related, but they are not identical.
          </p>
          <p>
            Scientific notation normally requires <strong>1 &le; |a| &lt; 10</strong> with an integer exponent.
          </p>
          <p>
            Engineering notation instead restricts the exponent to <strong>multiples of three</strong>: ..., &minus;9, &minus;6, &minus;3, 0, 3, 6, 9, ...
          </p>
          <p>
            This structure is useful in engineering because powers of 10&sup3; correspond naturally to common SI prefixes.
          </p>
          <p>
            For example:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>1,230,000</strong> in scientific notation is 1.23 &times; 10⁶; in engineering notation it is also 1.23 &times; 10⁶ (Mega, M).</li>
            <li><strong>123,000</strong> in scientific notation is 1.23 &times; 10⁵, while engineering notation represents it as <strong>123 &times; 10&sup3;</strong> (Kilo, k).</li>
          </ul>
          <p>
            The engineering form is often convenient when working with quantities expressed using kilo-, mega-, milli-, micro-, and similar prefixes.
          </p>
          <p>
            The SI system uses prefixes to create decimal multiples and submultiples of units. For example, kilo corresponds to 10&sup3;, mega to 10⁶, giga to 10⁹, milli to 10⁻&sup3;, micro to 10⁻⁶, and nano to 10⁻⁹. NIST also documents the modern SI prefix system extending across much larger and smaller powers of ten.
          </p>
          <p>
            This distinction matters in electrical engineering, physics, electronics, laboratory work, mechanical engineering, and technical specifications.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. What Is E-Notation?
          </h2>
          <p>
            E-notation is a computer-friendly representation of scientific notation.
          </p>
          <p>
            For example:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>4.2435 &times; 10⁹ can be written as <strong>4.2435E+9</strong></li>
            <li>4.25 &times; 10⁻⁶ can be written as <strong>4.25E-6</strong></li>
          </ul>
          <p>
            The letter E means &quot;times ten raised to the following exponent.&quot; It does not mean that the number is being raised to the power of <em>e</em>, Euler&apos;s number.
          </p>
          <p>
            E-notation is common in calculators, spreadsheets, programming languages, scientific software, data files, and engineering instruments.
          </p>
          <p>
            For example, 6.02214076E23 represents 6.02214076 &times; 10&sup2;&sup3;. The calculator converts between ordinary decimal notation, scientific notation, engineering notation, and E-notation so the same quantity can be interpreted across different contexts.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Decimal Precision vs Significant Figures
          </h2>
          <p>
            An important distinction is the difference between decimal-place precision and significant figures.
          </p>
          <p>
            Decimal precision specifies how many digits are displayed after the decimal point. For example, &radic;2 can be displayed as:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>1.4 (1 place)</li>
            <li>1.41 (2 places)</li>
            <li>1.4142 (4 places)</li>
            <li>1.414214 (6 places)</li>
          </ul>
          <p>
            Significant figures are different. They describe the meaningful digits of a measured or stated quantity and depend on the precision of the original measurement.
          </p>
          <p>
            This calculator provides adjustable decimal-place output precision from 1 to 16 places. That setting changes the displayed representation; it should not be interpreted as a complete laboratory significant-figure uncertainty analysis.
          </p>
          <p>
            For experimental science, chemistry, and measurement work, significant figures should be determined from the measurement data and the conventions appropriate to the problem.
          </p>
          <p>
            A separate{" "}
            <Link href="/calculators/rounding-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              Rounding Calculator
            </Link>{" "}
            can be useful when you need to round a numerical result to a specified number of decimal places or another explicitly defined rounding rule.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Scientific Notation and Order of Magnitude
          </h2>
          <p>
            The exponent in normalized scientific notation gives an immediate indication of a number&apos;s scale:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>For 7.4 &times; 10⁶, the exponent is 6.</li>
            <li>For 7.4 &times; 10⁻⁶, the exponent is &minus;6.</li>
          </ul>
          <p>
            This provides a quick way to compare quantities separated by many powers of ten.
          </p>
          <p>
            For example, <strong>8.5 &times; 10⁸</strong> is much larger than <strong>2.1 &times; 10⁵</strong> because the first value is on the order of hundreds of millions while the second is on the order of hundreds of thousands.
          </p>
          <p>
            When the leading coefficients are similar, comparing exponents is especially straightforward. This way of thinking is valuable in physics, astronomy, chemistry, engineering, computing, and data analysis because many scientific quantities differ more in scale than in their leading digits.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Worked Scientific Notation Examples
          </h2>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Example 1: Convert an integer</h4>
              <p>Convert 1,568,938 &rarr; Move decimal point 6 places left: 1.568938 &times; 10⁶ (or <strong>1.5689 &times; 10⁶</strong> at 4 decimal places).</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Example 2: Convert a small decimal</h4>
              <p>Convert 0.00000425 &rarr; Move decimal point 6 places right: <strong>4.25 &times; 10⁻⁶</strong>.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Example 3: Multiplication</h4>
              <p>Calculate: (2 &times; 10⁻⁴)(3 &times; 10&sup2;) &rarr; (2 &times; 3) &times; 10⁻⁴⁺&sup2; = <strong>6 &times; 10⁻&sup2;</strong>.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Example 4: Division</h4>
              <p>Calculate: (9 &times; 10⁸) / (3 &times; 10⁴) &rarr; (9 / 3) &times; 10⁸⁻⁴ = <strong>3 &times; 10⁴</strong>.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Example 5: Addition</h4>
              <p>Calculate: (2 &times; 10⁵) + (3 &times; 10&sup3;) &rarr; Align: 3 &times; 10&sup3; = 0.03 &times; 10⁵ &rarr; (2 + 0.03) &times; 10⁵ = <strong>2.03 &times; 10⁵</strong>.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Example 6: Subtraction</h4>
              <p>Calculate: (5 &times; 10⁶) &minus; (2 &times; 10⁴) &rarr; Align: 2 &times; 10⁴ = 0.02 &times; 10⁶ &rarr; (5 &minus; 0.02) &times; 10⁶ = <strong>4.98 &times; 10⁶</strong>.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Example 7: Square</h4>
              <p>Calculate: (2.5 &times; 10⁴)&sup2; &rarr; 2.5&sup2; &times; 10⁴ˣ&sup2; = <strong>6.25 &times; 10⁸</strong>.</p>
            </div>
          </div>
          <p>
            These examples illustrate why multiplication and division can usually be performed directly on the coefficients and exponents, while addition and subtraction require exponent alignment first.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Common Scientific Notation Mistakes
          </h2>
          <div className="space-y-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-slate-900 dark:text-slate-100">Mistake 1: Using a coefficient outside the normalized range</p>
              <p className="text-slate-600 dark:text-slate-400">Writing 45 &times; 10&sup3; instead of 4.5 &times; 10⁴. Both represent the same quantity, but only the second follows normalized scientific notation.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-slate-900 dark:text-slate-100">Mistake 2: Using the wrong exponent sign</p>
              <p className="text-slate-600 dark:text-slate-400">A very small value such as 0.00032 must use a negative exponent: 3.2 &times; 10⁻⁴. A positive exponent represents a number greater than 1.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-slate-900 dark:text-slate-100">Mistake 3: Adding exponents during addition</p>
              <p className="text-slate-600 dark:text-slate-400">Exponents are not added during addition. 2 &times; 10⁵ + 3 &times; 10⁵ equals 5 &times; 10⁵, not 5 &times; 10¹⁰.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-slate-900 dark:text-slate-100">Mistake 4: Forgetting exponent alignment</p>
              <p className="text-slate-600 dark:text-slate-400">For 2 &times; 10⁵ + 3 &times; 10&sup3;, the coefficients cannot be added directly because the powers of ten are different.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-slate-900 dark:text-slate-100">Mistake 5: Forgetting normalization after multiplication</p>
              <p className="text-slate-600 dark:text-slate-400">(8 &times; 10⁵)(4 &times; 10&sup3;) gives 32 &times; 10⁸, which must be re-normalized to 3.2 &times; 10⁹.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-slate-900 dark:text-slate-100">Mistake 6: Confusing E with Euler&apos;s number</p>
              <p className="text-slate-600 dark:text-slate-400">In 4.2E6, the E means 4.2 &times; 10⁶. It is not the mathematical constant e &asymp; 2.71828.</p>
            </div>
          </div>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Scientific Notation in Science and Engineering
          </h2>
          <p>
            Scientific notation is more than a classroom formatting technique. It is a practical language for communicating quantities that span many orders of magnitude.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Physics</h4>
              <p className="text-slate-600 dark:text-slate-400">Physical constants such as the speed of light (2.9979 &times; 10⁸ m/s), Planck&apos;s constant (6.6261 &times; 10⁻&sup3;⁴ J&middot;s), and electron mass (9.1094 &times; 10⁻&sup3;&sup1; kg).</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Chemistry</h4>
              <p className="text-slate-600 dark:text-slate-400">Atomic-scale quantities and fundamental constants, including Avogadro&apos;s number (6.0221 &times; 10&sup2;&sup3; mol⁻&sup1;), making atomic calculations manageable.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Electronics &amp; Electrical Engineering</h4>
              <p className="text-slate-600 dark:text-slate-400">Charge, resistance, capacitance, and signal frequencies naturally benefit from engineering notation and SI metric prefixes (k, M, G, m, &mu;, n, p).</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Astronomy &amp; Cosmology</h4>
              <p className="text-slate-600 dark:text-slate-400">Distances across space (1 light-year &asymp; 9.46 &times; 10&sup1;&sup2; km) and solar masses (1.989 &times; 10&sup3;&#8070; kg) span tremendous orders of magnitude.</p>
            </div>
          </div>
          <p>
            NIST notes that scientific and technical work relies heavily on SI conventions for communicating quantities consistently, including the use of decimal prefixes to indicate scale.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Using the Scientific Notation Calculator
          </h2>
          <p>
            This calculator is organized into three practical modules:
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Scientific Notation Arithmetic Solver</h4>
              <p>Enter the coefficient and exponent for the first value and second value. Select the operation: Multiplication, Division, Addition, Subtraction, Power, Square root, or Square. The step-by-step section explains the underlying arithmetic rather than simply displaying the answer.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Single Number Scientific &amp; Engineering Converter</h4>
              <p>Enter standard decimal values or E-notation inputs (e.g. 1568938, 0.00000425, 6.25e8). The converter returns normalized scientific form, engineering notation with SI prefixes, E-notation, decimal expansion, and readable short-scale word forms.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Physical Constants Library</h4>
              <p>Browse commonly referenced fundamental constants (Speed of light, Avogadro&apos;s number, Planck&apos;s constant, Gravitational constant, Elementary charge, Electron mass) with units, descriptions, and educational representations.</p>
            </div>
          </div>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Quick Reference: Scientific Notation Rules
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <p><strong>Scientific notation:</strong> N = a &times; 10ⁿ  where 1 &le; |a| &lt; 10 and n &isin; &Zopf;</p>
            <p><strong>Multiplication:</strong> (a &times; 10ᵐ)(b &times; 10ⁿ) = ab &times; 10ᵐ⁺ⁿ</p>
            <p><strong>Division:</strong> (a &times; 10ᵐ) / (b &times; 10ⁿ) = (a/b) &times; 10ᵐ⁻ⁿ</p>
            <p><strong>Power:</strong> (a &times; 10ᵐ)ᵏ = aᵏ &times; 10ᵐᵏ</p>
            <p><strong>Addition / Subtraction:</strong> First align exponents to the same power of 10, then add/subtract coefficients.</p>
            <p><strong>Normalization:</strong> If resulting coefficient |a| is outside [1, 10), shift decimal point and adjust exponent accordingly.</p>
            <p><strong>E-notation:</strong> a &times; 10ⁿ = aEn</p>
            <p><strong>Engineering notation:</strong> Exponent n is restricted to integer multiples of three (n mod 3 = 0).</p>
          </div>
        </section>

        {/* Section 18: Unfolded FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>18. Frequently Asked Questions About Scientific Notation</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            All questions and answers below are directly referenced in the page structured data schema.
          </p>

          <div className="space-y-3">
            {scientific_notation_calculatorFaqs.map((faq, idx) => {
              const isOpen = openFaqIndices.has(idx);
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between text-xs sm:text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-blue-600 dark:text-blue-400 transition-transform duration-200 shrink-0 ml-2 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700/60">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Final Scientific Notation Checklist
          </h2>
          <p>
            Before accepting a scientific-notation result, check:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Is there exactly one nonzero digit before the decimal point?</li>
            <li>Is the coefficient&apos;s magnitude at least 1 and less than 10?</li>
            <li>Does the exponent have the correct sign?</li>
            <li>For multiplication, were the exponents added?</li>
            <li>For division, was the denominator exponent subtracted?</li>
            <li>For addition or subtraction, were the exponents aligned first?</li>
            <li>Was the final result normalized?</li>
            <li>Is the displayed precision appropriate for the purpose of the calculation?</li>
            <li>If using engineering notation, is the exponent a multiple of three?</li>
            <li>If using E notation, does E correctly represent the power of ten?</li>
          </ol>
          <p>
            Using these checks catches most common scientific-notation errors before the value is used in a larger calculation.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Scientific Notation Calculator: Practical Summary
          </h2>
          <p>
            Scientific notation provides a compact and standardized way to work with quantities across a very wide numerical range. The central form is <em>a &times; 10ⁿ</em>, with a normalized coefficient whose magnitude is at least 1 and less than 10.
          </p>
          <p>
            The key arithmetic rules are straightforward:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Multiply coefficients and add exponents for multiplication.</li>
            <li>Divide coefficients and subtract exponents for division.</li>
            <li>Align exponents before addition or subtraction.</li>
            <li>Square the coefficient and double the exponent when taking a square.</li>
            <li>Handle powers and roots according to the corresponding exponent rules.</li>
            <li>Normalize every nonzero result before presenting the final scientific form.</li>
          </ul>
          <p>
            The calculator combines these rules with direct conversion between decimal values, scientific notation, engineering notation, and E-notation. Its step-by-step output is intended to make the calculation auditable and easier to learn, while its physical-constant reference provides convenient examples of scientific notation in real STEM contexts.
          </p>
          <p>
            For values involving powers, roots, and more general exponent calculations, the{" "}
            <Link href="/calculators/exponent-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              Exponent Calculator
            </Link>{" "}
            can provide a useful next step. For numerical rounding, the{" "}
            <Link href="/calculators/rounding-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              Rounding Calculator
            </Link>{" "}
            can help apply a specified display rule without confusing rounding with scientific-notation normalization.
          </p>
          <p>
            Scientific notation is most useful when it improves clarity. The goal is not simply to replace zeros with an exponent, but to communicate numerical scale accurately, consistently, and efficiently.
          </p>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* RELATED CALCULATORS — AFTER CONTENT ONLY */}
      {/* ========================================================================= */}
      <div className="no-print pt-6 border-t border-slate-200/60 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-2">
          RELATED CALCULATORS:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
          <Link
            href="/calculators/exponent-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Exponent Calculator
          </Link>
          <span>|</span>
          <Link
            href="/calculators/big-number-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Big Number Calculator
          </Link>
          <span>|</span>
          <Link
            href="/calculators/rounding-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Rounding Calculator
          </Link>
        </div>
      </div>

    </article>
  );
}

export default ScientificNotationContent;
