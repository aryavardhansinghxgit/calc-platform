"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";
import { hex_calculatorFaqs } from "@/app/calculators/hex-calculator/faq";

export function HexContent() {
  // All 14 FAQs open by default (unfolded accordion style)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: hex_calculatorFaqs.length }, (_, i) => i))
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
      {/* 1. INTRODUCTORY COPY */}
      <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Hex Calculator for Hexadecimal Math, Bitwise Operations and Base Conversion
        </h2>
        <p>
          A hex calculator is useful when you need to work directly with hexadecimal values instead of repeatedly converting them into decimal first. This calculator combines hexadecimal arithmetic, bitwise operations, fixed-width register analysis, and multi-base conversion in one unified workspace.
        </p>
        <p>
          Enter hexadecimal values such as <code>8AB</code>, <code>B78</code>, or <code>FF</code>, select the operation you need, and inspect the result in hexadecimal, decimal, binary, and octal. The calculator can also show the underlying bit pattern, carry or borrow behavior, overflow status, signed two&apos;s complement interpretation, and step-by-step calculation.
        </p>
        <p>
          Hexadecimal is particularly convenient for computer-oriented work because one hexadecimal digit corresponds to four binary bits, so two hexadecimal digits map naturally to one byte.
        </p>
      </div>

      {/* 2. RELATED CALCULATORS (BEFORE MAIN CONTENT) */}
      <div className="pt-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">
            Related Calculators:
          </span>
          <Link
            href="/calculators/binary-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            Advanced Binary Calculator &amp; Multi-Base Converter
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link
            href="/calculators/ip-subnet-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            IP Subnet Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link
            href="/calculators/scientific-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            Scientific Calculator
          </Link>
        </div>
      </div>

      {/* 3. MAIN EDUCATIONAL BODY */}
      <div className="space-y-8 pt-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1: What is Hexadecimal? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is Hexadecimal?
          </h2>
          <p>
            The hexadecimal number system, usually called <strong>hex</strong> or <strong>base 16</strong>, represents numbers using sixteen distinct symbols:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 font-mono font-bold text-blue-700 dark:text-blue-300 text-xs">
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F
          </div>
          <p>The letters represent values 10 through 15:</p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-center border-collapse text-xs font-sans tabular-nums">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-bold">
                  <th className="p-2.5 text-left">Hex Digit</th>
                  <th className="p-2.5 text-left">Decimal Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-2.5 text-left font-bold font-mono">0–9</td>
                  <td className="p-2.5 text-left">0–9</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-left font-bold font-mono">A</td>
                  <td className="p-2.5 text-left">10</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-left font-bold font-mono">B</td>
                  <td className="p-2.5 text-left">11</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-left font-bold font-mono">C</td>
                  <td className="p-2.5 text-left">12</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-left font-bold font-mono">D</td>
                  <td className="p-2.5 text-left">13</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-left font-bold font-mono">E</td>
                  <td className="p-2.5 text-left">14</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-left font-bold font-mono">F</td>
                  <td className="p-2.5 text-left">15</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Unlike decimal, whose place values are powers of 10, hexadecimal uses powers of 16. For example:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 font-mono text-xs space-y-1">
            <div>2A₁₆ = 2 × (16¹) + 10 × (16⁰)</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 32 + 10</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 42₁₀</div>
          </div>
          <p>
            A hexadecimal value is often written with a <code>0x</code> prefix in programming environments, so <code>0x2A</code> means the hexadecimal number 2A, which equals decimal 42. JavaScript, Python, C++, and Rust documentation likewise use <code>0x</code> to denote hexadecimal integer literals.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            Why Hexadecimal Is Useful
          </h3>
          <p>
            Hexadecimal is not simply another way of writing numbers. It is useful because it provides a compact, human-readable representation of binary information.
          </p>
          <p>
            Four binary bits can represent 16 possibilities (2⁴ = 16). That means each hexadecimal digit corresponds exactly to one group of four bits, often called a <strong>nibble</strong>. Two hexadecimal digits therefore represent eight bits, or one <strong>byte</strong>.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 font-mono text-xs space-y-1">
            <div>F₁₆ = 1111₂</div>
            <div>A₁₆ = 1010₂</div>
            <div>Therefore: 2A₁₆ = 0010 1010₂</div>
          </div>
          <p>
            This direct relationship is why hexadecimal is widely used when reading machine-level data, memory pointers, instruction opcodes, color codes, processor registers, debugging output, and binary protocols. When working with binary representations, the{" "}
            <Link
              href="/calculators/binary-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Advanced Binary Calculator &amp; Multi-Base Converter
            </Link>{" "}
            provides a complementary bit-level workflow.
          </p>
        </section>

        {/* Section 2: How to Use This Hex Calculator */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How to Use This Hex Calculator
          </h2>
          <p>
            This calculator is designed to handle several related computer-systems tasks in one workspace rather than forcing you to juggle separate utility tools:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Hexadecimal arithmetic:</strong> Enter two hexadecimal operands and select an arithmetic operator such as Addition (+), Subtraction (-), Multiplication (×), Division (÷), or Modulo (MOD). For example, <code>0x8AB + 0xB78</code> returns <code>0x1423</code>, which is decimal 5155, alongside its binary and octal equivalents.
            </li>
            <li>
              <strong>Bitwise operations:</strong> Select bitwise AND, OR, XOR, NOT, Left Shift (≪), Arithmetic Right Shift (≫), or Logical Zero-Fill Right Shift (⋙) to evaluate bit-level logic across 8, 16, 32, or 64-bit word registers.
            </li>
            <li>
              <strong>Multi-base conversion:</strong> The independent base converter translates numbers between arbitrary bases (from Base 2 through Base 36) with exact BigInt precision, providing step-by-step Euclidean division derivations without register clipping.
            </li>
          </ul>
        </section>

        {/* Section 3: Hex to Decimal */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Hex to Decimal: How the Conversion Works
          </h2>
          <p>
            To convert hexadecimal to decimal, multiply each digit by its corresponding positional power of 16 and sum the products.
          </p>
          <p>Consider <strong>0x2F</strong>. The rightmost digit occupies the 16⁰ column and the digit 2 occupies the 16¹ column:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 font-mono text-xs space-y-1">
            <div>2F₁₆ = 2 × (16¹) + 15 × (16⁰)</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 32 + 15 = 47₁₀</div>
            <div>Therefore: 0x2F = 47</div>
          </div>
          <p>For a longer number such as <strong>0x1423</strong>:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 font-mono text-xs space-y-1">
            <div>1 × (16³) + 4 × (16²) + 2 × (16¹) + 3 × (16⁰)</div>
            <div>= 4096 + 1024 + 32 + 3 = 5155₁₀</div>
            <div>Therefore: 0x1423 = 5155</div>
          </div>
          <p>
            The calculator performs this conversion directly and displays the decimal value alongside the original hexadecimal representation. For calculations involving scientific notation and powers of ten, the{" "}
            <Link
              href="/calculators/scientific-calculator"
              className="text-blue-600 dark:text-blue-400 font-medium underline"
            >
              Scientific Calculator
            </Link>{" "}
            is more appropriate.
          </p>
        </section>

        {/* Section 4: Hex to Binary */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Hex to Binary: The Fastest Manual Method
          </h2>
          <p>
            Because one hex digit represents exactly four bits, hexadecimal-to-binary conversion can be performed digit by digit without calculating powers or division remainders:
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-center border-collapse text-xs font-sans tabular-nums font-bold">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">
                  <th className="p-2">Hex</th>
                  <th className="p-2">Binary</th>
                  <th className="p-2">Hex</th>
                  <th className="p-2">Binary</th>
                  <th className="p-2">Hex</th>
                  <th className="p-2">Binary</th>
                  <th className="p-2">Hex</th>
                  <th className="p-2">Binary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                <tr>
                  <td className="p-2 text-blue-600">0</td><td className="p-2">0000</td>
                  <td className="p-2 text-blue-600">4</td><td className="p-2">0100</td>
                  <td className="p-2 text-blue-600">8</td><td className="p-2">1000</td>
                  <td className="p-2 text-blue-600">C</td><td className="p-2">1100</td>
                </tr>
                <tr>
                  <td className="p-2 text-blue-600">1</td><td className="p-2">0001</td>
                  <td className="p-2 text-blue-600">5</td><td className="p-2">0101</td>
                  <td className="p-2 text-blue-600">9</td><td className="p-2">1001</td>
                  <td className="p-2 text-blue-600">D</td><td className="p-2">1101</td>
                </tr>
                <tr>
                  <td className="p-2 text-blue-600">2</td><td className="p-2">0010</td>
                  <td className="p-2 text-blue-600">6</td><td className="p-2">0110</td>
                  <td className="p-2 text-blue-600">A</td><td className="p-2">1010</td>
                  <td className="p-2 text-blue-600">E</td><td className="p-2">1110</td>
                </tr>
                <tr>
                  <td className="p-2 text-blue-600">3</td><td className="p-2">0011</td>
                  <td className="p-2 text-blue-600">7</td><td className="p-2">0111</td>
                  <td className="p-2 text-blue-600">B</td><td className="p-2">1011</td>
                  <td className="p-2 text-blue-600">F</td><td className="p-2">1111</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>For example, <strong>AB₁₆</strong> becomes:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 font-mono text-xs">
            A = 1010, B = 1011 &rarr; AB₁₆ = 1010 1011₂
          </div>
          <p>
            This nibble-based mapping is drastically simpler and faster to inspect than converting a large hexadecimal value through decimal intermediate stages.
          </p>
        </section>

        {/* Section 5: Hex Addition Explained */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Hex Addition Explained
          </h2>
          <p>
            Hexadecimal addition works much like decimal column addition, except that each digit rolls over when reaching 16 (0x10) rather than after 9.
          </p>
          <p>For example, <code>A + 7</code> means <code>10 + 7 = 17₁₀</code>. Since 17 is 16 + 1, it equals hexadecimal <code>11₁₆</code> (write 1, carry 1).</p>
          <p><strong>Multi-Digit Addition Example: 0x8AB + 0xB78</strong></p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 font-mono text-xs space-y-1.5">
            <div>• Rightmost Column: B (11) + 8 = 19₁₀. Since 19 ≥ 16: 19 - 16 = 3 (Carry 1).</div>
            <div>• Middle Column: A (10) + 7 + 1 (Carry) = 18₁₀. Since 18 ≥ 16: 18 - 16 = 2 (Carry 1).</div>
            <div>• Leftmost Column: 8 + B (11) + 1 (Carry) = 20₁₀. Since 20 ≥ 16: 20 - 16 = 4 (Carry 1).</div>
            <div>• Highest Overflow Column: 1 (from previous carry) &rarr; 0x1423.</div>
            <div className="font-bold text-blue-600 dark:text-blue-400 pt-1">
              Final Sum: 0x8AB + 0xB78 = 0x1423 (Decimal: 5155)
            </div>
          </div>
          <p>
            The calculator goes beyond the final answer by exposing the corresponding decimal value, the bit-level carry structure, and explicit hardware carry-out flags.
          </p>
        </section>

        {/* Section 6: Hex Subtraction & Two's Complement */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Hex Subtraction, Borrow and Two&apos;s Complement
          </h2>
          <p>
            Subtraction is especially critical in computer arithmetic because fixed-width registers do not behave like unbounded mathematical integers.
          </p>
          <p>Consider an 8-bit signed calculation: <code>5 - 8 = -3</code>.</p>
          <p>The unrestricted mathematical answer is -3. In an 8-bit register, the bit pattern corresponding to -3 using two&apos;s complement is:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 font-mono text-xs">
            11111101₂ = 0xFD
          </div>
          <p>
            The identical eight physical bits can be interpreted differently depending on whether they are treated as unsigned or signed:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Unsigned 8-bit integer:</strong> 0xFD = 253</li>
            <li><strong>Signed two&apos;s complement integer:</strong> 0xFD = -3</li>
          </ul>
          <p>
            That distinction matters in systems programming, embedded firmware, processor registers, packet headers, and memory debugging. The calculator explicitly separates the mathematical result, stored register result, and signed/unsigned interpretations, preventing these concepts from being confused.
          </p>
        </section>

        {/* Section 7: Bitwise Operations */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Hex and Bitwise Operations (AND, OR, XOR, NOT)
          </h2>
          <p>
            Bitwise operations examine and transform individual bits of an integer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Bitwise AND</h3>
              <p className="text-xs">Produces 1 only when both corresponding bits are 1. Commonly used for bit masks to isolate or clear flags.</p>
              <div className="p-2.5 rounded bg-white dark:bg-slate-900 font-mono text-xs border border-slate-200 dark:border-slate-800">
                &nbsp;&nbsp;1100 (0xC)<br />
                &amp; 1010 (0xA)<br />
                &nbsp;-------<br />
                &nbsp;&nbsp;1000 (0x8)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Bitwise OR</h3>
              <p className="text-xs">Produces 1 whenever at least one corresponding bit is 1. Used for setting bit flags.</p>
              <div className="p-2.5 rounded bg-white dark:bg-slate-900 font-mono text-xs border border-slate-200 dark:border-slate-800">
                &nbsp;&nbsp;1100 (0xC)<br />
                | 1010 (0xA)<br />
                &nbsp;-------<br />
                &nbsp;&nbsp;1110 (0xE)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Bitwise XOR</h3>
              <p className="text-xs">Produces 1 when the two bits differ. Used for toggling bits, fast comparisons, parity checks, and cryptography.</p>
              <div className="p-2.5 rounded bg-white dark:bg-slate-900 font-mono text-xs border border-slate-200 dark:border-slate-800">
                &nbsp;&nbsp;1100 (0xC)<br />
                ^ 1010 (0xA)<br />
                &nbsp;-------<br />
                &nbsp;&nbsp;0110 (0x6)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Bitwise NOT (~)</h3>
              <p className="text-xs">Inverts all bits. NOT is strictly dependent on the selected register width.</p>
              <div className="p-2.5 rounded bg-white dark:bg-slate-900 font-mono text-xs border border-slate-200 dark:border-slate-800">
                8-Bit: ~0x0F = 0xF0 (1111 0000₂)<br />
                16-Bit: ~0x000F = 0xFFF0
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Shifts */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Left Shift, Right Shift and Logical Right Shift
          </h2>
          <p>
            Shift operations reposition bits within the register:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Left Shift (≪):</strong> Moves bits toward higher-order positions, filling vacated low-order bits with 0. A 1-bit left shift corresponds to multiplying by 2 when no overflow occurs: <code>0x03 &lt;&lt; 1 = 0x06</code>.
            </li>
            <li>
              <strong>Arithmetic Right Shift (≫):</strong> Shifts bits right while preserving the sign bit (MSB) for signed two&apos;s complement values. This ensures that negative values remain negative during rightward division.
            </li>
            <li>
              <strong>Logical Right Shift (⋙):</strong> Zero-fill right shift that always shifts zeros into vacated high-order positions regardless of the sign bit. For example, in an 8-bit register: <code>0x80 &gt;&gt;&gt; 1 = 0x40</code>.
            </li>
          </ul>
        </section>

        {/* Section 9: Fixed-Width Hex and Overflow */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Fixed-Width Hex and Hardware Overflow
          </h2>
          <p>
            A frequent source of errors is assuming that a register can always hold the unrestricted mathematical answer. In an 8-bit unsigned register (range 0 to 255):
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 font-mono text-xs space-y-1">
            <div>&nbsp;&nbsp;11111111 (0xFF = 255)</div>
            <div>+ 00000001 (0x01 = 1)</div>
            <div>----------</div>
            <div>1 00000000 (Mathematical: 256 / 0x100)</div>
          </div>
          <p>
            Because the register holds only 8 bits, the stored value wraps to <code>0x00</code>, and the 9th bit becomes <strong>Carry-Out = 1</strong> and <strong>Unsigned Overflow = YES</strong>. The calculator makes this separation explicit on its Hardware Register panel.
          </p>
        </section>

        {/* Section 10: Signed vs Unsigned */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Signed vs. Unsigned Hex Values
          </h2>
          <p>
            A hexadecimal string does not inherently specify whether it is signed or unsigned. For an N-bit word, the representable ranges are:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80">
              <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs mb-1 font-sans">Unsigned Range (0 to 2ⁿ - 1)</span>
              • 8-Bit: 0 to 255<br />
              • 16-Bit: 0 to 65,535<br />
              • 32-Bit: 0 to 4,294,967,295<br />
              • 64-Bit: 0 to 18,446,744,073,709,551,615
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80">
              <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs mb-1 font-sans">Signed 2&apos;s Complement (-2ⁿ⁻¹ to 2ⁿ⁻¹ - 1)</span>
              • 8-Bit: -128 to +127<br />
              • 16-Bit: -32,768 to +32,767<br />
              • 32-Bit: -2,147,483,648 to +2,147,483,647<br />
              • 64-Bit: -9,223,372,036,854,775,808 to +9,223,372,036,854,775,807
            </div>
          </div>
        </section>

        {/* Section 11: Arbitrary Precision BigInt */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Why Arbitrary-Precision Hex Calculation Matters
          </h2>
          <p>
            Standard browser calculators rely on JavaScript <code>Number</code>, which loses integer precision above 2⁵³ - 1 (9,007,199,254,740,991). That creates serious corruption for 64-bit values such as <code>0xFFFFFFFFFFFFFFFF</code> (18,446,744,073,709,551,615).
          </p>
          <p>
            This calculator is built on exact <code>BigInt</code> arithmetic and Horner accumulation for arbitrary bases (2 through 36), guaranteeing zero rounding error even for large integer cryptographic calculations.
          </p>
        </section>

        {/* Section 12: Bytes and Nibbles */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Hex, Bytes and Nibbles
          </h2>
          <p>Three core terminology units define digital architecture:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Bit:</strong> A single binary digit (0 or 1).</li>
            <li><strong>Nibble:</strong> A group of 4 binary bits (exactly 1 hexadecimal character).</li>
            <li><strong>Byte:</strong> A group of 8 binary bits (exactly 2 hexadecimal characters, spanning 0x00 to 0xFF).</li>
          </ul>
        </section>

        {/* Section 13: Applications */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. When to Use a Hex Calculator
          </h2>
          <p>Typical engineering and computing applications include:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li><strong>Low-level programming &amp; debugging:</strong> Inspecting RAM pointers, instruction field offsets, and register flags in C, C++, Rust, and Assembly.</li>
            <li><strong>Networking:</strong> Parsing Ethernet MAC addresses and 128-bit IPv6 headers. For networking calculations that depend on addresses and masks, use the{" "}
              <Link href="/calculators/ip-subnet-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
                IP Subnet Calculator
              </Link>.
            </li>
            <li><strong>Embedded systems:</strong> Configuring microcontroller peripheral registers and bitmasks.</li>
            <li><strong>Web development:</strong> Inspecting #RRGGBB and #RRGGBBAA CSS color intensities.</li>
          </ul>
        </section>

        {/* Section 14: Quick Reference Table */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Hex Calculator Quick Reference Guide
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-bold">
                  <th className="p-2.5">Task / Operation</th>
                  <th className="p-2.5">Methodology &amp; Principle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="p-2.5 font-bold">Hex &rarr; Decimal</td>
                  <td className="p-2.5">Sum of digit &times; 16ⁿ (where n is the column position from right to left).</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Decimal &rarr; Hex</td>
                  <td className="p-2.5">Repeated division by 16; read remainders from bottom to top.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Hex &rarr; Binary</td>
                  <td className="p-2.5">Substitute each hex digit with its exact 4-bit binary nibble.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Binary &rarr; Hex</td>
                  <td className="p-2.5">Group binary bits into 4-bit nibbles from right to left and map to hex symbols.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Bitwise AND</td>
                  <td className="p-2.5">Retains bits set in both operands (1 &amp; 1 = 1).</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Bitwise OR</td>
                  <td className="p-2.5">Sets bits present in either operand (1 | 0 = 1).</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Bitwise XOR</td>
                  <td className="p-2.5">Sets bits where operands differ (1 ^ 0 = 1, 1 ^ 1 = 0).</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Bitwise NOT</td>
                  <td className="p-2.5">Inverts all bits within the selected register bit-width mask.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Logical Shift (&gt;&gt;&gt;)</td>
                  <td className="p-2.5">Zero-fill shift right; always introduces zeros into vacated MSB positions.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Arithmetic Shift (&gt;&gt;)</td>
                  <td className="p-2.5">Sign-preserving shift right; duplicates MSB into vacated high-order bits.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 15: Methodology & Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Calculation Methodology &amp; Mathematical Reference
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Calculation Standards
              </div>
              <p>
                Calculations conform to IEEE-754 floating-point specifications, ISO/IEC 9899 standard two&apos;s complement integer arithmetic conventions, and RFC-4180 export guidelines. Arbitrary base conversions employ Horner accumulation and exact Euclidean division. Calculations execute client-side in your local browser runtime.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Engineering Verification Notice
              </div>
              <p>
                This calculator provides deterministic mathematical verification for educational, software engineering, and systems development purposes. When working on mission-critical embedded hardware, verify hardware-specific signed overflow trap behaviors and memory alignment boundaries with your processor architecture manual.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 4. RELATED CALCULATORS (AFTER MAIN CONTENT / BEFORE FAQ) */}
      <div className="pt-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] font-bold">
            Continue Calculating:
          </span>
          <Link
            href="/calculators/binary-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            Advanced Binary Calculator &amp; Multi-Base Converter
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link
            href="/calculators/ip-subnet-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            IP Subnet Calculator
          </Link>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <Link
            href="/calculators/scientific-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
          >
            Scientific Calculator
          </Link>
        </div>
      </div>

      {/* 5. FAQ SECTION (UNFOLDED ACCORDION STYLE) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {hex_calculatorFaqs.map((faq, idx) => {
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
    </article>
  );
}

export default HexContent;
