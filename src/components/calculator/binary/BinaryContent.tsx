"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, Binary, Cpu, Network, Calculator, ArrowRight, ShieldCheck, BookOpen } from "lucide-react";
import { binary_calculatorFaqs } from "@/app/calculators/binary-calculator/faq";

export function BinaryContent() {
  // All 14 approved FAQs unfolded (open by default)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 14 }, (_, i) => i))
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
      {/* ======================================================== */}
      {/* RELATED TOOLS SECTION 1 (Before Educational Content)     */}
      {/* ======================================================== */}
      <div className="space-y-3 pb-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" /> Related Computer Architecture &amp; Math Calculators
          </span>
          <span className="text-[11px] text-slate-400 font-medium">Explore Specialized Tools</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/calculators/hex-calculator"
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 dark:bg-slate-800/60 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700/80 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-1">
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                <span>Hex Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Advanced Hexadecimal Math, Bitwise &amp; Converter for 8-bit to 64-bit memory addressing.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/ip-subnet-calculator"
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 dark:bg-slate-800/60 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700/80 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-1">
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                <span>IP Subnet Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Calculate CIDR notation, subnet masks, wildcard bits, and host address ranges.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/scientific-calculator"
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 dark:bg-slate-800/60 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700/80 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-1">
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                <span>Scientific Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                High-precision engineering functions, logarithmic scales, and exponential arithmetic.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN EDUCATIONAL CONTENT SECTIONS                     */}
      {/* ======================================================== */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 pt-6">
        {/* ABOVE-THE-FOLD INTRODUCTION */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Binary Calculator for Arithmetic, Bitwise Operations &amp; Base Conversion
          </h2>
          <p>
            A binary calculator works with numbers represented in base 2, where every digit is either 0 or 1. This calculator goes beyond simple binary-to-decimal conversion: it can perform binary arithmetic, bitwise operations, logical shifts, signed two&apos;s-complement calculations, modulo operations, and conversions between bases from 2 through 36.
          </p>
          <p>
            Use the calculator to add, subtract, multiply, divide, or find the remainder of binary values; evaluate AND, OR, XOR, and NOT operations; perform left and right shifts; and inspect the result at the bit level. The converter also shows decimal, hexadecimal, and octal representations alongside the requested base.
          </p>
          <p>
            For computer-science and engineering work, representation matters as much as arithmetic. A bit pattern such as <code>11111101</code> can represent 253 as unsigned 8-bit data but −3 as signed 8-bit two&apos;s-complement data. The calculator therefore separates the mathematical result, fixed-width register representation, and signed interpretation instead of treating them as the same quantity.
          </p>
          <p>
            Large integer conversions are handled with exact arbitrary-precision integer arithmetic rather than forcing values into ordinary floating-point precision. This is especially important beyond JavaScript&apos;s <code>Number.MAX_SAFE_INTEGER</code>, which is 2⁵³ − 1 (9,007,199,254,740,991); JavaScript&apos;s BigInt type is designed for integers outside that exact range.
          </p>
        </section>

        {/* SECTION 1: WHAT IS A BINARY CALCULATOR? */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is a Binary Calculator?
          </h2>
          <p>
            A binary calculator is a computational tool designed to work with the base-2 number system used extensively in digital electronics and computer systems. Unlike decimal notation, which uses the digits 0 through 9, binary uses only 0 and 1.
          </p>
          <p>
            Each binary position represents a power of two:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            …, 2⁴, 2³, 2², 2¹, 2⁰
          </div>
          <p>
            For example:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs sm:text-sm space-y-1 text-slate-800 dark:text-slate-200">
            <div>1011₂ = 1(2³) + 0(2²) + 1(2¹) + 1(2⁰)</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 8 + 0 + 2 + 1</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 11₁₀</div>
          </div>
          <p>
            This positional structure is one reason binary arithmetic fits digital hardware so naturally. NIST material on mathematics and engineering in computer science describes binary as a positional number system in which each digit corresponds to a power of two, and notes its close relationship with computer arithmetic.
          </p>
          <p>
            A useful binary calculator should therefore answer more than &ldquo;what is this number in decimal?&rdquo; It should help users understand the relationship between the bit pattern, the numeric value, the operation being performed, and, where relevant, the fixed-width representation. That is the purpose of this calculator.
          </p>
        </section>

        {/* SECTION 2: BINARY PLACE VALUE */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How Binary Numbers Work
          </h2>
          <p>
            Every binary digit is called a bit. Starting from the rightmost bit, the positions have weights:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-sans tabular-nums">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-blue-700 dark:text-blue-400">
                  <th className="p-2 font-bold">Bit Position</th>
                  <th className="p-2 font-bold">Power of 2</th>
                  <th className="p-2 font-bold">Positional Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr><td className="p-2">0</td><td className="p-2 font-mono">2⁰</td><td className="p-2 font-bold">1</td></tr>
                <tr><td className="p-2">1</td><td className="p-2 font-mono">2¹</td><td className="p-2 font-bold">2</td></tr>
                <tr><td className="p-2">2</td><td className="p-2 font-mono">2²</td><td className="p-2 font-bold">4</td></tr>
                <tr><td className="p-2">3</td><td className="p-2 font-mono">2³</td><td className="p-2 font-bold">8</td></tr>
                <tr><td className="p-2">4</td><td className="p-2 font-mono">2⁴</td><td className="p-2 font-bold">16</td></tr>
                <tr><td className="p-2">5</td><td className="p-2 font-mono">2⁵</td><td className="p-2 font-bold">32</td></tr>
                <tr><td className="p-2">6</td><td className="p-2 font-mono">2⁶</td><td className="p-2 font-bold">64</td></tr>
                <tr><td className="p-2">7</td><td className="p-2 font-mono">2⁷</td><td className="p-2 font-bold">128</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            So <code>11001010₂</code> becomes:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm">
            128 + 64 + 8 + 2 = 202
          </div>
          <p>
            The important distinction is that the binary string itself is a representation, while its interpretation depends on the context. For example, the eight-bit pattern <code>11111101₂</code> has an unsigned value of <strong>253</strong>, but under signed two&apos;s-complement interpretation it represents <strong>−3</strong>. The same bits therefore do not automatically imply the same signed numeric value.
          </p>
        </section>

        {/* SECTION 3: BINARY ARITHMETIC */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Binary Arithmetic: Addition, Subtraction, Multiplication, Division and Modulo
          </h2>
          <p>
            Binary arithmetic follows the same broad mathematical principles as decimal arithmetic, but every column contains only the digits 0 and 1.
          </p>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Binary Addition</h3>
            <p>The basic rules are:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs text-center">
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">0 + 0 = 0</div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">0 + 1 = 1</div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">1 + 0 = 1</div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">1 + 1 = 10₂ (carry 1)</div>
            </div>
            <p>For example, adding 170 and 15:</p>
            <pre className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs overflow-x-auto">
{`  10101010
+ 00001111
----------
  10111001`}
            </pre>
            <p>
              The result is <code>10111001₂ = 185₁₀</code>. The calculator exposes the carry chain so users can inspect how each column contributed to the final result.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Binary Subtraction</h3>
            <p>
              Binary subtraction can be performed with borrowing, but computer systems commonly implement subtraction through two&apos;s-complement addition. For <code>5 − 8</code>, the eight-bit forms are:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
              <div>5 &nbsp;= 00000101</div>
              <div>8 &nbsp;= 00001000</div>
              <div className="text-indigo-600 dark:text-indigo-400">Invert the bits of 8 (1&apos;s complement): 11110111</div>
              <div className="text-purple-600 dark:text-purple-400">Add 1 (2&apos;s complement of 8): 11111000</div>
              <div className="pt-1 border-t border-slate-200 dark:border-slate-700">
                {`  00000101
+ 11111000
----------
  11111101`}
              </div>
            </div>
            <p>
              Interpreted as signed 8-bit two&apos;s complement: <code>11111101₂ = −3</code>. This approach is consistent with computer arithmetic conventions; NIST&apos;s computer-science material describes subtraction through adding the two&apos;s complement of the subtrahend.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Binary Multiplication</h3>
            <p>
              Binary multiplication is particularly simple because each multiplier bit is either 0 or 1:
            </p>
            <pre className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs overflow-x-auto">
{`      1011  (11 in decimal)
×      101  (5 in decimal)
----------
      1011
     0000
+ 101100
----------
    110111  (55 in decimal)`}
            </pre>
            <p>The same shift-and-add structure is fundamental to digital arithmetic hardware.</p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Binary Division and Modulo</h3>
            <p>
              Binary division follows repeated quotient and remainder operations, analogous to long division in decimal notation. For <code>255 ÷ 2</code>, the quotient is 127 with remainder 1. That remainder is important when converting a decimal integer to binary because repeated division by 2 generates the binary digits.
            </p>
            <p>
              Binary modulo returns the remainder after division: <code>13 mod 5 = 3</code>, which in binary is <code>1101₂ mod 101₂ = 11₂</code>. The calculator explicitly validates modulo-by-zero rather than returning an invalid numerical result.
            </p>
          </div>
        </section>

        {/* SECTION 4: BITWISE OPERATIONS */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Bitwise AND, OR, XOR and NOT
          </h2>
          <p>
            Bitwise operations act on corresponding bits rather than treating an entire value as a single decimal quantity.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-blue-600 dark:text-blue-400">AND (&amp;)</h3>
              <p className="text-xs">Produces 1 only when both input bits are 1.</p>
              <pre className="font-mono text-xs">
{`  11001100
& 10101010
----------
  10001000`}
              </pre>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-blue-600 dark:text-blue-400">OR (|)</h3>
              <p className="text-xs">Produces 1 when at least one corresponding bit is 1.</p>
              <pre className="font-mono text-xs">
{`  11001100
| 10101010
----------
  11101110`}
              </pre>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-blue-600 dark:text-blue-400">XOR (^)</h3>
              <p className="text-xs">Produces 1 when corresponding bits are different.</p>
              <pre className="font-mono text-xs">
{`  11001100
^ 10101010
----------
  01100110`}
              </pre>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-blue-600 dark:text-blue-400">NOT (~)</h3>
              <p className="text-xs">Reverses each bit within the register width.</p>
              <pre className="font-mono text-xs">
{`~ 00001111
----------
  11110000`}
              </pre>
            </div>
          </div>
          <p>
            XOR is widely used in low-level systems, masking, and cryptography. A crucial point is that NOT depends on the chosen width when interpreted as a fixed-size register. An eight-bit NOT operation and an unrestricted mathematical complement are not the same concept. For dedicated hexadecimal bitwise manipulation, examine our{" "}
            <Link href="/calculators/hex-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Hex Calculator
            </Link>
            .
          </p>
        </section>

        {/* SECTION 5: BINARY SHIFTS */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Left Shift and Right Shift
          </h2>
          <p>
            A binary shift moves bits to the left or right. A left shift by one position is equivalent to multiplication by 2 when no significant information is discarded:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm">
            00000101₂ &lt;&lt; 1 = 00001010₂ &nbsp;(5 × 2 = 10)
          </div>
          <p>
            For fixed-width registers, however, bits shifted beyond the register width are discarded. That is why shift operations can create overflow or loss of high-order bits.
          </p>
          <p>
            A right shift corresponds to integer division by a power of two for unsigned values: <code>10000000₂ &gt;&gt; 1 = 01000000₂</code>. Signed right shifts require additional care: an arithmetic right shift preserves the sign bit (MSB) to maintain correct negative integer values, whereas a logical right shift injects leading zeros. The calculator explicitly distinguishes the operation from its resulting fixed-width representation rather than hiding the discarded or inserted bits.
          </p>
        </section>

        {/* SECTION 6: SIGNED VS UNSIGNED BINARY */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Signed and Unsigned Binary Numbers
          </h2>
          <p>
            A binary value has no inherent &ldquo;negative&rdquo; meaning until a representation convention is chosen.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Unsigned Representation</h3>
              <p className="text-xs">With an 8-bit unsigned register, range is 0 to 255:</p>
              <div className="font-mono text-xs">00000000₂ = 0 &nbsp;|&nbsp; 11111111₂ = 255</div>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Signed Two&apos;s Complement</h3>
              <p className="text-xs">For an n-bit signed register, range is −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1 (−128 to +127 for 8-bit):</p>
              <div className="font-mono text-xs">10000000₂ = −128 &nbsp;|&nbsp; 01111111₂ = +127</div>
            </div>
          </div>
          <p>
            Under 8-bit signed two&apos;s complement: <code>11111111₂ = −1</code>, <code>11111110₂ = −2</code>, and <code>11111101₂ = −3</code>. This distinction is especially important when a binary calculator shows both a bitstream and a decimal answer.
          </p>
        </section>

        {/* SECTION 7: TWO'S COMPLEMENT */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            7. How Two&apos;s Complement Works
          </h2>
          <p>
            Two&apos;s complement is a fixed-width representation used to encode signed integers in digital hardware. To find the two&apos;s complement of a positive binary value:
          </p>
          <ol className="list-decimal list-inside space-y-1 pl-2">
            <li>Write the binary representation at the required register width.</li>
            <li>Invert every bit (1&apos;s complement).</li>
            <li>Add 1 to the least significant bit.</li>
          </ol>
          <p>For example, using eight bits for +3:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <div>+3 = 00000011</div>
            <div>Invert: 11111100</div>
            <div>Add 1: 11111101 &rarr; −3</div>
          </div>
          <p>
            The highest-order bit acts as the sign indicator in a fixed-width signed representation. The calculator&apos;s visualizer displays these stages explicitly during subtraction so the user can distinguish one&apos;s complement, adding 1, two&apos;s complement, and the final signed interpretation.
          </p>
        </section>

        {/* SECTION 8: OVERFLOW AND CARRY */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Binary Overflow and Carry-Out
          </h2>
          <p>
            Overflow is one of the easiest parts of fixed-width binary arithmetic to misunderstand. Suppose an unsigned eight-bit register contains <code>255 = 11111111₂</code> and we add <code>1 = 00000001₂</code>. The mathematical result is <strong>256</strong>, but 256 cannot be represented in eight unsigned bits.
          </p>
          <p>
            The register therefore retains <code>00000000</code> while a carry-out of 1 indicates that a ninth bit was generated. A useful calculator shows both:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-1 font-sans">
            <div><strong>Mathematical result:</strong> 256</div>
            <div><strong>8-bit register result:</strong> 00000000</div>
            <div><strong>Carry-out:</strong> 1</div>
            <div><strong>Overflow:</strong> YES</div>
          </div>
          <p>
            Signed overflow is a related but distinct concept. For an eight-bit signed two&apos;s-complement register, the maximum positive number is 127. Therefore <code>127 + 1</code> has mathematical result 128, which is outside the signed range [−128, 127]. The resulting bit pattern <code>10000000</code> represents −128. The calculator reports signed overflow rather than allowing the wrapped result to look like an ordinary successful calculation. NIST material specifically discusses overflow detection in computer arithmetic and fixed-point representations.
          </p>
        </section>

        {/* SECTION 9: BINARY, DECIMAL, HEX AND OCTAL */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Binary to Decimal, Hexadecimal and Octal Conversion
          </h2>
          <p>
            Binary, hexadecimal and octal are closely related because their bases are powers of two:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>
              <strong>Binary to Decimal:</strong> Evaluate each bit as a power of two: <code>1011₂ = 11₁₀</code>.
            </li>
            <li>
              <strong>Binary to Hexadecimal:</strong> Because 16 = 2⁴, every hexadecimal digit corresponds to four binary bits: <code>1011 1001₂ = B9₁₆</code>. For complex 64-bit word masking, consult the{" "}
              <Link href="/calculators/hex-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                Advanced Hexadecimal Math, Bitwise &amp; Converter
              </Link>
              .
            </li>
            <li>
              <strong>Binary to Octal:</strong> Because 8 = 2³, binary digits can be grouped into sets of three: <code>101 110 01₂ &rarr; 271₈</code>.
            </li>
            <li>
              <strong>Hexadecimal to Binary:</strong> Reverse the process: <code>B₁₆ = 1011₂</code> and <code>9₁₆ = 1001₂</code>, so <code>B9₁₆ = 10111001₂</code>.
            </li>
          </ul>
          <p>
            The calculator provides these representations together, making it easier to cross-check a result without manually performing every conversion.
          </p>
        </section>

        {/* SECTION 10: ARBITRARY BASE CONVERSION */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Convert Numbers Between Bases 2 Through 36
          </h2>
          <p>
            The calculator supports base conversion beyond the common binary, octal, decimal and hexadecimal systems, spanning bases from 2 through 36:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm">
            2 &le; b &le; 36
          </div>
          <p>
            For bases above 10, additional alphanumeric symbols are used (0–9 followed by A–Z). The conversion principle relies on exact positional polynomial evaluation:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm">
            d_k &middot; b^k + d_{`{k-1}`} &middot; b^{`{k-1}`} + &hellip; + d_1 &middot; b + d_0
          </div>
          <p>
            For large integers, exact integer arithmetic is especially important. Ordinary floating-point types cannot represent all integers above 2⁵³ − 1 exactly, while BigInt is intended for arbitrary-magnitude integers. This calculator preserves integer values using exact BigInt arithmetic rather than passing them through floating-point Number conversions.
          </p>
        </section>

        {/* SECTION 11: WHY BIGINT PRECISION MATTERS */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Why Large Binary Calculations Need Exact Integer Arithmetic
          </h2>
          <p>
            JavaScript&apos;s standard Number type uses IEEE 754 double-precision floating-point format and guarantees exact integer representation only through:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm">
            2⁵³ − 1 = 9,007,199,254,740,991
          </div>
          <p>
            Beyond that point, different consecutive integers collapse into the exact same floating-point value. MDN explicitly documents this limitation and recommends BigInt for larger exact integers. For example, the 64-bit unsigned integer maximum is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-bold break-all">
            2⁶⁴ − 1 = 18,446,744,073,709,551,615
          </div>
          <p>
            This exactness matters for 64-bit registers, memory pointers, bit masks, cryptographic hashes, protocol headers, and network masks. For networking-specific bit manipulation and subnet calculations, use our{" "}
            <Link href="/calculators/ip-subnet-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              IP Subnet Calculator
            </Link>
            .
          </p>
        </section>

        {/* SECTION 12: WORKED EXAMPLE */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Example: Calculate 170 + 15 in Binary
          </h2>
          <p>
            Suppose <code>170₁₀ = 10101010₂</code> and <code>15₁₀ = 00001111₂</code>. Add them:
          </p>
          <pre className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs overflow-x-auto">
{`   10101010  (170 in decimal)
 + 00001111  (15 in decimal)
 ----------
   10111001  (185 in decimal)`}
          </pre>
          <p>
            Convert the result back to decimal: <code>128 + 32 + 16 + 8 + 1 = 185</code>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">Binary: 10111001₂</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">Hex: B9₁₆</div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">Octal: 271₈</div>
          </div>
          <p>
            The calculator presents these equivalent forms together so that the user can verify the result through multiple representations.
          </p>
        </section>

        {/* SECTION 13: PRACTICAL USES */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Practical Uses of a Binary Calculator
          </h2>
          <p>
            Binary arithmetic appears in many areas of computing and engineering because digital hardware stores and manipulates information as bits:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Computer science:</strong> understanding binary arithmetic, bitwise operators, shifts, masks, and integer representations.</li>
            <li><strong>Programming:</strong> checking results of AND, OR, XOR, NOT, shifts, modulo, and fixed-width register operations.</li>
            <li><strong>Digital electronics:</strong> reasoning about ALU registers, logic operations, carry propagation, and binary encodings.</li>
            <li><strong>Networking:</strong> examining binary representations of IP addresses, subnet masks, and protocol header flags.</li>
            <li><strong>Systems programming:</strong> verifying signed versus unsigned values, register wrap, and word size boundaries.</li>
            <li><strong>Data representation:</strong> converting values among binary, hexadecimal, octal, and decimal notation.</li>
            <li><strong>Education:</strong> verifying hand-worked binary arithmetic and learning two&apos;s-complement representation step by step.</li>
          </ul>
          <p>
            For advanced scientific formulas and numerical computations, you can also consult our{" "}
            <Link href="/calculators/scientific-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Scientific Calculator
            </Link>
            .
          </p>
        </section>

        {/* SECTION 14: COMMON MISTAKES */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Common Binary Calculation Mistakes
          </h2>
          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Mistake 1: Treating binary digits like decimal digits</strong>
              <p className="text-xs">1010 is not one thousand ten; it means 1(2³) + 0(2²) + 1(2¹) + 0(2⁰) = 10 in decimal.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Mistake 2: Forgetting register width</strong>
              <p className="text-xs">The result of an unrestricted integer calculation is not necessarily the same as the result stored in a fixed-size 8-bit or 16-bit register.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Mistake 3: Confusing unsigned and signed values</strong>
              <p className="text-xs">11111101 is 253 unsigned, but represents −3 as signed eight-bit two&apos;s complement.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Mistake 4: Ignoring overflow</strong>
              <p className="text-xs">A wrapped register result can look perfectly valid unless the carry or overflow condition is examined.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Mistake 5: Losing precision in large integer conversions</strong>
              <p className="text-xs">Converting a large integer through an ordinary floating-point number can silently truncate its exact value beyond 53 bits.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Mistake 6: Treating hexadecimal as unrelated to binary</strong>
              <p className="text-xs">Each hexadecimal digit corresponds directly to four binary bits, which makes hexadecimal a compact representation of binary data.</p>
            </div>
          </div>
        </section>

        {/* SECTION 15: BINARY CALCULATOR FEATURES */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            15. What This Binary Calculator Can Do
          </h2>
          <p>
            This calculator combines several functions that are commonly separated across different tools:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong>Binary Arithmetic:</strong>
              <p>Addition (+), Subtraction (−), Multiplication (×), Division (÷), and Modulo (%).</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong>Bitwise Operations:</strong>
              <p>Bitwise AND, OR, XOR, and NOT with responsive column mapping.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong>Bit Shifts:</strong>
              <p>Logical Left Shift (&lt;&lt;) and Arithmetic/Logical Right Shift (&gt;&gt;).</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong>Register-Width Modes:</strong>
              <p>Configurable 8-bit, 16-bit, 32-bit, and 64-bit register widths.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong>Signed Interpretation:</strong>
              <p>Unsigned pure binary alongside signed two&apos;s-complement decoding.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
              <strong>Arbitrary Base Conversion:</strong>
              <p>Bijective conversions across any base from 2 through 36 with BigInt precision.</p>
            </div>
          </div>
        </section>

        {/* SECTION 16: HOW TO USE */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            16. How to Use the Binary Calculator
          </h2>
          <p>
            Start by choosing the register size and whether the value should be interpreted as unsigned or signed two&apos;s complement.
          </p>
          <p>
            Enter the first binary or decimal operand and, where required, enter the second operand. Choose the operation such as addition, subtraction, multiplication, division, modulo, AND, OR, XOR, NOT or a shift.
          </p>
          <p>
            The result panel provides the calculated bit pattern together with equivalent numeric representations. For arithmetic operations, the derivation section explains the calculation and the bit visualizer shows how the individual columns behave.
          </p>
          <p>
            For base conversion, select the source and target bases and enter the value exactly as written in that base. For large integers, the calculator preserves integer precision instead of passing the value through a standard floating-point representation.
          </p>
          <p>
            Use Save / Restore when you want to revisit a previous calculation, and use the copy or export controls when the result needs to be transferred into notes, code documentation, spreadsheets or another workflow.
          </p>
        </section>

        {/* SECTION 17: ENDING SECTION / NATURAL CTA */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Use the Binary Calculator to Check the Whole Representation
          </h2>
          <p>
            Binary arithmetic becomes much easier to verify when the calculation, representation and interpretation are shown together.
          </p>
          <p>
            Instead of calculating a result in binary and then manually checking it in decimal or hexadecimal, you can inspect the binary result, decimal value, hexadecimal form, octal form, bit-level operation, signed interpretation and overflow state in one place.
          </p>
          <p>
            That makes the calculator useful both as a fast conversion tool and as a learning reference for binary arithmetic, computer architecture and low-level programming.
          </p>
        </section>
      </div>

      {/* ======================================================== */}
      {/* 3. FREQUENTLY ASKED QUESTIONS (14 Approved FAQs Unfolded)*/}
      {/* ======================================================== */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {binary_calculatorFaqs.map((faq, idx) => {
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-850/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. RELATED TOOLS SECTION 2 (After Educational Content)   */}
      {/* ======================================================== */}
      <div className="pt-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" /> Continue Your Calculations
          </span>
          <span className="text-[11px] text-slate-400 font-medium">Recommended Tools</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/calculators/hex-calculator"
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 dark:bg-slate-800/60 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700/80 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-1">
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                <span>Hex Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Perform hexadecimal arithmetic, bitwise shifts, masks, and conversions.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/ip-subnet-calculator"
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 dark:bg-slate-800/60 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700/80 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-1">
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                <span>IP Subnet Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Analyze IPv4 network address prefixes, subnets, and broadcast boundaries.
              </p>
            </div>
          </Link>

          <Link
            href="/calculators/scientific-calculator"
            className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 dark:bg-slate-800/60 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700/80 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-1">
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                <span>Scientific Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Solve complex mathematical expressions, logarithms, powers, and trigonometry.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BinaryContent;
