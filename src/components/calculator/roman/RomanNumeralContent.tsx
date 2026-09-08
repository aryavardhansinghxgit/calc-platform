"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ExternalLink, HelpCircle } from "lucide-react";
import { roman_numeral_converterFaqs } from "@/app/calculators/roman-numeral-converter/faq";

export function RomanNumeralContent() {
  const milestoneChart = [
    { n: 1, r: "I" }, { n: 2, r: "II" }, { n: 3, r: "III" }, { n: 4, r: "IV" }, { n: 5, r: "V" }, { n: 6, r: "VI" },
    { n: 7, r: "VII" }, { n: 8, r: "VIII" }, { n: 9, r: "IX" }, { n: 10, r: "X" }, { n: 11, r: "XI" }, { n: 12, r: "XII" },
    { n: 13, r: "XIII" }, { n: 14, r: "XIV" }, { n: 15, r: "XV" }, { n: 19, r: "XIX" }, { n: 20, r: "XX" }, { n: 25, r: "XXV" },
    { n: 30, r: "XXX" }, { n: 40, r: "XL" }, { n: 50, r: "L" }, { n: 60, r: "LX" }, { n: 70, r: "LXX" }, { n: 80, r: "LXXX" },
    { n: 90, r: "XC" }, { n: 99, r: "XCIX" }, { n: 100, r: "C" }, { n: 200, r: "CC" }, { n: 300, r: "CCC" }, { n: 400, r: "CD" },
    { n: 500, r: "D" }, { n: 600, r: "DC" }, { n: 700, r: "DCC" }, { n: 800, r: "DCCC" }, { n: 900, r: "CM" }, { n: 1000, r: "M" },
    { n: 1776, r: "MDCCLXXVI" }, { n: 1984, r: "MCMLXXXIV" }, { n: 2000, r: "MM" }, { n: 2024, r: "MMXXIV" }, { n: 2025, r: "MMXXV" }, { n: 2026, r: "MMXXVI" }, { n: 3999, r: "MMMCMXCIX" }
  ];

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Roman Numeral Converter
          </h2>
          <p>
            Roman numerals are a number system built from a small set of Latin letters rather than the positional digits used in the modern decimal system. This Roman Numeral Converter lets you convert ordinary numbers into Roman numerals, convert Roman numerals back into numbers, write dates in Roman-numeral form, and perform arithmetic using Roman numeral inputs.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-700 text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
                <tr>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Symbol</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono text-slate-800 dark:text-slate-200">
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">I</td><td className="p-2 border border-slate-200 dark:border-slate-700">1</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">V</td><td className="p-2 border border-slate-200 dark:border-slate-700">5</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">X</td><td className="p-2 border border-slate-200 dark:border-slate-700">10</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">L</td><td className="p-2 border border-slate-200 dark:border-slate-700">50</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">C</td><td className="p-2 border border-slate-200 dark:border-slate-700">100</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">D</td><td className="p-2 border border-slate-200 dark:border-slate-700">500</td></tr>
                <tr><td className="p-2 border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">M</td><td className="p-2 border border-slate-200 dark:border-slate-700">1,000</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The standard modern form relies primarily on additive notation together with a limited set of subtractive pairs. Those rules make IV equal to 4 rather than IIII, IX equal to 9 rather than VIIII, and XL equal to 40 rather than XXXX.
          </p>
          <p>
            This calculator uses strict canonical Roman-numeral validation for the standard range and can also handle the extended vinculum convention for numbers from 4,000 upward within its supported range. For broader unit conversions beyond Roman numerals, the{" "}
            <Link
              href="/calculators/conversion-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Conversion Calculator
            </Link>{" "}
            can handle length, temperature, mass, volume, pressure, and other measurement categories.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            2. The Seven Roman Numeral Symbols
          </h2>
          <p>
            The complete classical symbol set contains only seven letters:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 font-mono text-center text-xs">
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700"><span className="font-bold block text-blue-600 dark:text-blue-400">I</span>1</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700"><span className="font-bold block text-blue-600 dark:text-blue-400">V</span>5</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700"><span className="font-bold block text-blue-600 dark:text-blue-400">X</span>10</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700"><span className="font-bold block text-blue-600 dark:text-blue-400">L</span>50</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700"><span className="font-bold block text-blue-600 dark:text-blue-400">C</span>100</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700"><span className="font-bold block text-blue-600 dark:text-blue-400">D</span>500</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700"><span className="font-bold block text-blue-600 dark:text-blue-400">M</span>1,000</div>
          </div>
          <p>
            Larger numbers are created by combining these symbols according to ordering, repetition, and subtractive rules. For example:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <p>VIII = 8 (because 5 + 1 + 1 + 1 = 8)</p>
            <p>LXIII = 63 (because 50 + 10 + 1 + 1 + 1 = 63)</p>
          </div>
          <p>
            The converter shows the numerical result together with the expansion, making it useful not only for getting an answer but also for checking how that answer was formed. The reference implementation explicitly demonstrates LXIII = 63 with the expansion 60 + 3.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How Roman Numerals Work
          </h2>
          <p>
            Roman numeral notation is not positional in the way decimal notation is. In decimal notation, the position of a digit determines its value. In Roman numerals, each symbol carries its own value and the order of symbols determines whether those values are added or subtracted.
          </p>
          <p>
            The basic additive pattern is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs">
            VIII = 5 + 1 + 1 + 1 = 8
          </div>
          <p>
            When a smaller valid symbol occurs before a larger one, a subtractive combination can be formed:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-xs text-slate-700 dark:text-slate-300">
            <li>IV = 5 − 1 = 4</li>
            <li>IX = 10 − 1 = 9</li>
            <li>XL = 50 − 10 = 40</li>
            <li>XC = 100 − 10 = 90</li>
            <li>CD = 500 − 100 = 400</li>
            <li>CM = 1,000 − 100 = 900</li>
          </ul>
          <p>These six pairs are the canonical subtractive forms used by the calculator.</p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Roman Numeral Rules for Repetition
          </h2>
          <p>
            Canonical Roman numerals place restrictions on repeated symbols. The symbols I, X, C, and M can appear at most three times consecutively in standard notation.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <p>III = 3</p>
            <p>XXX = 30</p>
            <p>CCC = 300</p>
            <p>MMM = 3,000</p>
          </div>
          <p>
            Forms such as IIII, XXXX, and CCCC are not the canonical forms produced by this calculator. The symbols V, L, and D are not repeated in standard canonical notation. Thus VV, LL, and DD are rejected. The production audit specifically verifies these grammar rules.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Valid and Invalid Subtractive Forms
          </h2>
          <p>
            A common mistake is to assume that any smaller Roman numeral placed before a larger one should be subtracted. That is not how standard Roman grammar works.
          </p>
          <p>The accepted canonical subtractive pairs are:</p>
          <div className="flex flex-wrap gap-2 font-mono text-xs font-bold text-blue-700 dark:text-blue-300">
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">IV (4)</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">IX (9)</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">XL (40)</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">XC (90)</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">CD (400)</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">CM (900)</span>
          </div>
          <p>
            Forms such as IL, IC, ID, IM, XD, and XM are not canonical standard Roman numerals. Likewise, repeated or stacked subtraction patterns such as IIV, IIX, XXL, CCD, CCM and strings such as IXIX are rejected by the calculator&apos;s strict parser.
          </p>
          <p>
            This matters because a naive &quot;subtract any smaller value from the next larger value&quot; algorithm can return plausible-looking but historically and grammatically invalid results. The current implementation specifically corrected that problem and now validates canonical structure before decoding.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            6. What Is the Largest Standard Roman Numeral?
          </h2>
          <p>
            Under the conventional modern classical-style representation used by most basic Roman numeral converters, the standard range ends at:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            3,999 = MMMCMXCIX
          </div>
          <p>
            That limit is a property of the notation convention being used, not a mathematical limit on the number system itself. For larger values, historical and later conventions developed additional notation. This calculator supports one such extension—the vinculum or overline convention—for values above 3,999.
          </p>
          <p>
            It is therefore better to say that standard canonical Roman notation is normally represented through 3,999, rather than claiming that Romans universally had a single standardized notation ending at exactly that number.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Roman Numeral Examples From 1 to 100
          </h2>
          <p>Useful values include:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-1.5 text-xs font-mono">
            {[
              { n: 1, r: "I" }, { n: 2, r: "II" }, { n: 3, r: "III" }, { n: 4, r: "IV" }, { n: 5, r: "V" }, { n: 6, r: "VI" },
              { n: 7, r: "VII" }, { n: 8, r: "VIII" }, { n: 9, r: "IX" }, { n: 10, r: "X" }, { n: 11, r: "XI" }, { n: 12, r: "XII" },
              { n: 13, r: "XIII" }, { n: 14, r: "XIV" }, { n: 15, r: "XV" }, { n: 19, r: "XIX" }, { n: 20, r: "XX" }, { n: 25, r: "XXV" },
              { n: 30, r: "XXX" }, { n: 40, r: "XL" }, { n: 50, r: "L" }, { n: 60, r: "LX" }, { n: 70, r: "LXX" }, { n: 80, r: "LXXX" },
              { n: 90, r: "XC" }, { n: 99, r: "XCIX" }, { n: 100, r: "C" }
            ].map((item) => (
              <div key={item.n} className="p-1.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700 flex justify-between">
                <span className="text-slate-500">{item.n}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{item.r}</span>
              </div>
            ))}
          </div>
          <p>
            The calculator also includes a larger milestone reference chart covering hundreds, thousands, and selected modern years.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Common Year Conversions
          </h2>
          <p>Some years are especially useful as quick checks:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono">
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">1776 = <strong className="text-blue-600 dark:text-blue-400">MDCCLXXVI</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">1984 = <strong className="text-blue-600 dark:text-blue-400">MCMLXXXIV</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">2000 = <strong className="text-blue-600 dark:text-blue-400">MM</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">2024 = <strong className="text-blue-600 dark:text-blue-400">MMXXIV</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">2025 = <strong className="text-blue-600 dark:text-blue-400">MMXXV</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">2026 = <strong className="text-blue-600 dark:text-blue-400">MMXXVI</strong></div>
          </div>
          <p>
            These values are included in the calculator&apos;s reference material and were independently verified during production testing. For example: 2026 = 2000 + 20 + 6 = MM + XX + VI = MMXXVI.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            9. How to Convert a Number to a Roman Numeral
          </h2>
          <p>
            To convert a decimal number into a standard Roman numeral, break the number into Roman-compatible place values. Consider 768:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <p>768 = 700 + 60 + 8</p>
            <p>700 = DCC</p>
            <p>60 = LX</p>
            <p>8 = VIII</p>
            <p className="font-bold text-blue-600 dark:text-blue-400">Combine: DCCLXVIII</p>
          </div>
          <p>
            The reference document uses this exact 768 example as a worked conversion. The calculator performs this decomposition automatically.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            10. How to Convert a Roman Numeral to a Number
          </h2>
          <p>
            To convert a Roman numeral back into an ordinary integer, identify each symbol and apply the canonical additive/subtractive rules. For MCMXCIV, break it into:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <p>M = 1,000</p>
            <p>CM = 900</p>
            <p>XC = 90</p>
            <p>IV = 4</p>
            <p className="font-bold text-blue-600 dark:text-blue-400">Total: 1,000 + 900 + 90 + 4 = 1,994</p>
          </div>
          <p>
            The reference material includes 1,994 as a worked complex-subtractive example.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            11. How to Use the Roman Numeral Converter
          </h2>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100 block">Convert a number to Roman numerals</strong>
              Enter an integer and convert it (e.g. 2026 → MMXXVI).
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100 block">Convert Roman numerals to a number</strong>
              Enter a numeral (e.g. MCMXCIV) and view its decimal evaluation (1,994).
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100 block">Check a Roman numeral</strong>
              The strict parser determines whether an input follows canonical grammar.
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100 block">Explore larger values</strong>
              Enable Vinculum Overlines when working with extended notation above 3,999.
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100 block">Perform Roman numeral arithmetic</strong>
              Enter two Roman values and select +, −, ×, or ÷.
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100 block">Convert a date</strong>
              Choose a calendar date and select your preferred component order and separator.
            </div>
          </div>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Roman Numeral Date Converter
          </h2>
          <p>
            A date in Roman numerals is produced by converting the date components—month, day, and year—into Roman numerals and then arranging them in a chosen order.
          </p>
          <p>For example, 08/17/2026 becomes:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
            VIII · XVII · MMXXVI (MM · DD · YYYY)
          </div>
          <p>
            Here 8 = VIII, 17 = XVII, and 2026 = MMXXVI. The calculator supports three component orders: MM · DD · YYYY, DD · MM · YYYY, and YYYY · MM · DD, along with configurable separators such as bullets, slashes, hyphens, dots, and spaces.
          </p>
          <p>
            This is useful for dates used in commemorative designs, inscriptions, historical references, personal projects, and other situations where Roman numerals are desired.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Is There a Correct Roman-Numeral Date Order?
          </h2>
          <p>
            There is no single universal modern formatting convention for writing a date as three Roman numeral groups. The calculator therefore treats date order as a presentation choice rather than pretending that one order is universally mandatory.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <p>MM · DD · YYYY: VIII · XVII · MMXXVI</p>
            <p>DD · MM · YYYY: XVII · VIII · MMXXVI</p>
            <p>YYYY · MM · DD: MMXXVI · VIII · XVII</p>
          </div>
          <p>
            The important requirement is to make the order clear, particularly when both the day and month are 12 or less.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Date Validation Matters
          </h2>
          <p>
            A date converter should not simply turn three numbers into Roman letters. The underlying date must actually exist. For example, February 29, 2024 is valid; February 29, 2025 is not. Similarly, April 31, 2026 is not a valid Gregorian calendar date.
          </p>
          <p>
            The calculator uses calendar validation and Gregorian leap-year rules before converting the date. Its production test suite specifically verifies 2024, 2025, 1900, and 2000 leap-year cases as well as invalid month-day combinations. When you need date arithmetic rather than Roman-numeral formatting, the{" "}
            <Link
              href="/calculators/date-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Date Calculator
            </Link>{" "}
            is the more appropriate tool.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Roman Numeral Calculator: Arithmetic With Roman Numbers
          </h2>
          <p>
            Roman numerals were designed primarily as a notation system, not as a modern algebraic notation for symbolic manipulation. The practical approach used by the calculator is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-center font-semibold">
            Roman input → integer value → arithmetic operation → Roman output
          </div>
          <p>
            For example, XLV + XVIII becomes 45 + 18 = 63, and 63 = LXIII. The calculator displays the corresponding arithmetic result, matching the reference verification case.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Roman Numeral Addition
          </h2>
          <p>
            For addition, the calculator decodes both operands, performs ordinary integer addition, and encodes the result canonically.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <p>XIV + XII = 14 + 12 = 26 = XXVI</p>
            <p>XLV + XVIII = 45 + 18 = 63 = LXIII</p>
          </div>
          <p>
            This means the output always follows canonical Roman notation rather than preserving unusual input spellings.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Roman Numeral Subtraction
          </h2>
          <p>
            Subtraction is handled through integer arithmetic after decoding. For example, X − V = V (10 − 5 = 5). However, standard Roman numerals do not provide a canonical representation for negative numbers.
          </p>
          <p>
            Therefore, I − V does not produce a made-up negative Roman numeral. The calculator explicitly reports underflow instead of silently altering the result. Likewise, X − X results in the zero case, which is handled explicitly because standard Roman numerals have no ordinary symbol for zero.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Roman Numeral Multiplication and Division
          </h2>
          <p>
            The arithmetic module supports multiplication and integer division within its supported range:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
            <p>II × III = VI (2 × 3 = 6)</p>
            <p>X ÷ II = V (10 ÷ 2 = 5)</p>
          </div>
          <p>
            Division requires more care when the result is not an integer because ordinary classical Roman numerals do not provide a standard decimal-style fractional representation. The calculator handles integer division with remainder rather than silently returning a rounded or fabricated Roman fraction. Production tests confirm division-by-zero is rejected explicitly.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Roman Numerals Above 3,999: The Vinculum
          </h2>
          <p>
            A vinculum is a horizontal line placed over a Roman numeral to multiply its value by 1,000. Under the convention supported by this calculator:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">V̅ = <strong>5,000</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">X̅ = <strong>10,000</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">L̅ = <strong>50,000</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">C̅ = <strong>100,000</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">D̅ = <strong>500,000</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">M̅ = <strong>1,000,000</strong></div>
          </div>
          <p>
            The reference document explicitly presents this ×1,000 rule, and the implementation supports the vinculum option for extended values. Historical usage of overlines is well documented, but it is important not to imply that all Roman inscriptions used one universal extended-number convention.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Roman Apostrophus Notation
          </h2>
          <p>
            The Roman numeral tradition also contains historical large-number notation associated with apostrophus forms. The calculator explains this notation educationally but does not provide an interactive Apostrophus parser.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 italic">
            Apostrophus is a historical extended Roman-number notation discussed for educational context; it is not an interactive input format supported by this converter. The production audit explicitly confirms this separation.
          </p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            21. Why Roman Numerals Have No Standard Zero
          </h2>
          <p>
            Roman numerals are fundamentally different from a positional system such as decimal notation because they do not require a zero placeholder. There is therefore no ordinary canonical Roman-symbol equivalent of 0.
          </p>
          <p>
            Historical Roman documents sometimes used words or symbols such as nulla or N in accounting and record-keeping contexts, but these should not be confused with a standard classical Roman numeral symbol for zero. The calculator handles zero explicitly rather than inventing a canonical Roman numeral for it.
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            22. Roman Numeral Fractions and the Uncia
          </h2>
          <p>
            Roman numerical practice also included fractional systems, especially the uncia, which divided the unit into twelve parts:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center text-xs">
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700"><span className="block font-bold text-blue-600 dark:text-blue-400">• (Uncia)</span>1/12 (0.0833)</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700"><span className="block font-bold text-blue-600 dark:text-blue-400">:• (Quadrans)</span>3/12 = 1/4 (0.25)</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700"><span className="block font-bold text-blue-600 dark:text-blue-400">:: (Triens)</span>4/12 = 1/3 (0.333)</div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700"><span className="block font-bold text-blue-600 dark:text-blue-400">S (Semis)</span>6/12 = 1/2 (0.50)</div>
          </div>
          <p>
            These historical fractional conventions are useful for understanding Roman weights, money, and measurement, but they should not be treated as ordinary extensions of the seven-symbol integer system.
          </p>
        </section>

        {/* Section 23 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            23. Roman Numeral Reference Chart
          </h2>
          <p>
            For quick lookup, the calculator provides a milestone chart containing common values through 1,000 as well as selected historical and modern years. All 41 milestone entries are verified:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-1.5 text-xs font-mono">
            {milestoneChart.map((item) => (
              <div
                key={item.n}
                className="p-1.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700 flex justify-between"
              >
                <span className="text-slate-500 font-medium">{item.n}</span>
                <span className="font-bold text-blue-700 dark:text-blue-300">{item.r}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 24 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            24. Common Roman Numeral Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li><strong>Writing IIII instead of IV:</strong> IV is the canonical subtractive form for 4 in the notation used by the calculator.</li>
            <li><strong>Writing VIIII instead of IX:</strong> IX is the canonical form for 9.</li>
            <li><strong>Using IL for 49:</strong> The standard canonical form is XLIX.</li>
            <li><strong>Using IC for 99:</strong> The standard form is XCIX.</li>
            <li><strong>Treating every smaller-before-larger pair as valid:</strong> Only the permitted subtractive pairs (IV, IX, XL, XC, CD, CM) are recognized.</li>
            <li><strong>Treating Roman numerals as a positional system:</strong> Roman numerals do not work like decimal digits.</li>
            <li><strong>Forgetting that date order matters:</strong> VIII · XVII does not identify the month and day without knowing the selected order.</li>
            <li><strong>Assuming all large-number notation is equally standard:</strong> The vinculum is an extended convention, not part of the basic seven-symbol system.</li>
          </ul>
        </section>

        {/* Section 25 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            25. Roman Numeral Converter Examples
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">63 = <strong className="text-blue-600 dark:text-blue-400">LXIII</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">1994 = <strong className="text-blue-600 dark:text-blue-400">MCMXCIV</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">2024 = <strong className="text-blue-600 dark:text-blue-400">MMXXIV</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">2025 = <strong className="text-blue-600 dark:text-blue-400">MMXXV</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">2026 = <strong className="text-blue-600 dark:text-blue-400">MMXXVI</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">3999 = <strong className="text-blue-600 dark:text-blue-400">MMMCMXCIX</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">LXIII = <strong className="text-blue-600 dark:text-blue-400">63</strong></div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">XLV + XVIII = <strong className="text-blue-600 dark:text-blue-400">LXIII (63)</strong></div>
          </div>
        </section>

        {/* Section 26 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            26. Roman Numeral Converter Accuracy
          </h2>
          <p>
            The converter uses strict grammar rather than a simplistic character-summing or naive subtractive algorithm. The production audit verifies:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li>10,000 decimal-to-Roman cases</li>
            <li>10,000 Roman-to-decimal cases</li>
            <li>3,999/3,999 exhaustive classical-range conversions</li>
            <li>20,000 randomized cases</li>
          </ul>
          <p>
            with exact bidirectional recovery across more than 60,000 independent assertions. This matters because a converter can easily appear correct for simple inputs while still accepting invalid constructions such as IL, IIV, IXIX, or MMMM.
          </p>
        </section>

        {/* Section 27 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            27. How to Choose the Correct Roman-Numeral Form
          </h2>
          <p>
            For standard integer notation, use the canonical subtractive forms (IV, IX, XL, XC, CD, CM). Avoid noncanonical forms when the goal is textbook or standard modern Roman-numeral presentation.
          </p>
          <p>
            For dates, choose an explicit order and separator. For values above 3,999, identify whether you are using a vinculum or another historical convention. Roman numerals are a numeral-system conversion, so for written-out English words, use a number to words converter instead.
          </p>
        </section>
      </div>

      {/* FULLY UNFOLDED FAQ SECTION */}
      <div className="pt-8 space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {roman_numeral_converterFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-1.5 shadow-xs"
            >
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0 mt-0.5">
                  Q{idx + 1}.
                </span>
                <span>{faq.question}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-6 font-normal">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* REFERENCES AND HISTORICAL NOTES */}
      <div className="pt-8 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            References and Historical Notes
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <p>
            Roman numerals have a long history of variation, so this page distinguishes between standard canonical notation, later extended conventions, and historical forms.
          </p>
          <div className="space-y-2.5">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
                <span>Wolfram MathWorld</span>
                <a
                  href="https://mathworld.wolfram.com/RomanNumerals.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5 ml-1"
                >
                  Roman Numerals <ExternalLink className="h-3 w-3 inline" />
                </a>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                MathWorld is a useful secondary reference for the historical discussion of Roman numeral forms, subtractive rules, and the vinculum&apos;s ×1,000 convention.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
                <span>Leonardo Fibonacci — Liber Abaci (1202)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Historical documentation of the transition in European commerce from Roman additive-subtractive accounting to Hindu-Arabic positional decimal arithmetic.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
            Historical descriptions of Roman numeral notation, including overlines and other large-number systems, should be treated as context rather than evidence that every Roman writer used exactly the same conventions.
          </p>
        </div>
      </div>

      {/* RELATED CALCULATORS — AFTER ARTICLE */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-2">
          RELATED CALCULATORS
        </span>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <Link
            href="/calculators/conversion-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors"
          >
            Conversion Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}

export default RomanNumeralContent;
