"use client";

import React from "react";

export function BinaryContent() {
  return (
    <div className="space-y-8 text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
      {/* SECTION 1: HOW TO USE THE BINARY CALCULATOR */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          How to Use the Binary Calculator
        </h2>
        <p className="text-sm leading-relaxed">
          The <strong>Binary Calculator &amp; Multi-Base Converter</strong> empowers software engineers, computer science students, and electrical engineers to perform rapid binary arithmetic, bitwise operations, signed number representations, and multi-base conversions instantly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">1. Input Binary Terms</h3>
            <p className="leading-relaxed font-medium">
              Enter binary bit streams (consisting exclusively of <code>0</code> and <code>1</code>) into Input A and Input B fields. Use the Swap button to reverse operands.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">2. Select Operation &amp; Bit Width</h3>
            <p className="leading-relaxed font-medium">
              Choose arithmetic operators (<code>+</code>, <code>-</code>, <code>×</code>, <code>÷</code>) or bitwise functions (<code>AND</code>, <code>OR</code>, <code>XOR</code>, <code>NOT</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>) along with 8-bit to 64-bit register widths.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">3. Multi-Base Live Outputs</h3>
            <p className="leading-relaxed font-medium">
              View real-time converted values across Binary, Decimal (Base-10), Hexadecimal (Base-16), Octal (Base-8), and ASCII characters, paired with column carry proofs.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: UNDERSTANDING THE BINARY SYSTEM */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          Understanding the Binary System (Base-2)
        </h2>
        <p className="text-sm leading-relaxed">
          The <strong>binary number system</strong> is a positional base-2 numerical system that uses only two distinct symbols: <code>0</code> and <code>1</code>. While the everyday decimal system uses base-10 with digits 0 through 9, binary aligns directly with physical electronic transistors, logic gates, and memory cells that operate in two discrete electrical states: <em>OFF</em> (0 Volts) and <em>ON</em> (+5V / +3.3V).
        </p>

        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs font-medium space-y-2">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400">Binary Place Values &amp; Positional Weights</h3>
          <p className="leading-relaxed">
            In binary, every bit position moving leftwards represents an increasing power of 2:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-xs font-sans tabular-nums font-bold">
              <thead>
                <tr className="border-b border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300">
                  <th className="p-2">Bit Position</th>
                  <th className="p-2">Bit 7</th>
                  <th className="p-2">Bit 6</th>
                  <th className="p-2">Bit 5</th>
                  <th className="p-2">Bit 4</th>
                  <th className="p-2">Bit 3</th>
                  <th className="p-2">Bit 2</th>
                  <th className="p-2">Bit 1</th>
                  <th className="p-2">Bit 0</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-100 dark:border-blue-900/40">
                  <td className="p-2 text-left font-semibold">Power of 2</td>
                  <td className="p-2">2⁷</td>
                  <td className="p-2">2⁶</td>
                  <td className="p-2">2⁵</td>
                  <td className="p-2">2⁴</td>
                  <td className="p-2">2³</td>
                  <td className="p-2">2²</td>
                  <td className="p-2">2¹</td>
                  <td className="p-2">2⁰</td>
                </tr>
                <tr>
                  <td className="p-2 text-left font-semibold">Decimal Weight</td>
                  <td className="p-2 text-blue-600 dark:text-blue-400">128</td>
                  <td className="p-2 text-blue-600 dark:text-blue-400">64</td>
                  <td className="p-2 text-blue-600 dark:text-blue-400">32</td>
                  <td className="p-2 text-blue-600 dark:text-blue-400">16</td>
                  <td className="p-2 text-blue-600 dark:text-blue-400">8</td>
                  <td className="p-2 text-blue-600 dark:text-blue-400">4</td>
                  <td className="p-2 text-blue-600 dark:text-blue-400">2</td>
                  <td className="p-2 text-blue-600 dark:text-blue-400">1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 3: BINARY ARITHMETIC OPERATIONS EXPLAINED */}
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          Binary Arithmetic Operations Explained
        </h2>

        {/* H3 Addition */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-blue-600 dark:text-blue-400">
            Binary Addition &amp; Carry Bits
          </h3>
          <p className="text-sm leading-relaxed">
            Binary addition follows identical column principles to decimal addition. However, because base-2 has only 0 and 1, a sum of 2 (1 + 1) generates a result bit of 0 and a carry bit of 1 to the next column.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans tabular-nums font-bold">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
              <h4 className="font-extrabold text-xs text-blue-600 dark:text-blue-400">Addition Truth Rules</h4>
              <ul className="space-y-1 text-slate-900 dark:text-slate-100">
                <li>0 + 0 = 0 (Carry 0)</li>
                <li>0 + 1 = 1 (Carry 0)</li>
                <li>1 + 0 = 1 (Carry 0)</li>
                <li>1 + 1 = 0 (Carry 1 → 10₂)</li>
                <li>1 + 1 + 1 = 1 (Carry 1 → 11₂)</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-1 text-blue-700 dark:text-blue-400">
              <h4 className="font-extrabold text-xs">Addition Example</h4>
              <div>Carry Row: &nbsp;1 1 1 0 0 0</div>
              <div>&nbsp; Term A: &nbsp; 1 0 1 0 1 0 1 0 (170)</div>
              <div>+ Term B: &nbsp; 0 0 0 0 1 1 1 1 (15)</div>
              <div className="border-t border-blue-300 dark:border-blue-700 pt-1">
                = Sum: &nbsp; &nbsp;1 0 1 1 1 0 0 1 (185)
              </div>
            </div>
          </div>
        </div>

        {/* H3 Subtraction */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-blue-600 dark:text-blue-400">
            Binary Subtraction &amp; 2&apos;s Complement Method
          </h3>
          <p className="text-sm leading-relaxed">
            In digital hardware arithmetic logic units (ALUs), binary subtraction is executed by adding the <strong>two&apos;s complement</strong> of the subtrahend to the minuend: <code>A - B = A + (~B + 1)</code>.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-medium space-y-2">
            <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">Two&apos;s Complement Step-by-Step Procedure</h4>
            <ol className="list-decimal pl-5 space-y-1 font-sans tabular-nums font-bold">
              <li>Invert all bits of B (0 becomes 1, 1 becomes 0) to obtain 1&apos;s complement.</li>
              <li>Add 1 to the 1&apos;s complement to form 2&apos;s complement (<code>~B + 1</code>).</li>
              <li>Add A to 2&apos;s complement of B: <code>Result = A + (~B + 1)</code>.</li>
              <li>Discard any overflow carry bit past the designated register width.</li>
            </ol>
          </div>
        </div>

        {/* H3 Multiplication & Division */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-blue-600 dark:text-blue-400">
            Binary Multiplication &amp; Division Rules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 font-medium">
              <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">Multiplication (AND &amp; Shift)</h4>
              <p className="leading-relaxed">
                Binary multiplication is simpler than decimal multiplication because multiplying by 1 keeps the number unchanged, while multiplying by 0 yields zero.
              </p>
              <div className="font-sans tabular-nums font-bold text-blue-700 dark:text-blue-400">
                Rules: 0×0=0, 0×1=0, 1×0=0, 1×1=1.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 font-medium">
              <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">Division (Quotient &amp; Remainder)</h4>
              <p className="leading-relaxed">
                Binary long division follows subtract-and-shift steps. At each position, compare the divisor with the current partial dividend to output a 1 or 0 quotient bit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CONVERSION REFERENCE TABLE */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          Binary to Decimal, Hex, and Octal Conversion Reference Table
        </h2>
        <p className="text-sm leading-relaxed">
          Below is a reference lookup table comparing binary values 0 through 15 with their decimal, hexadecimal, octal, and ASCII equivalents.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <table className="w-full text-left border-collapse text-xs font-sans tabular-nums font-bold">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">
                <th className="p-3">Decimal (Base-10)</th>
                <th className="p-3">4-Bit Binary (Base-2)</th>
                <th className="p-3">Hexadecimal (Base-16)</th>
                <th className="p-3">Octal (Base-8)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {[
                { dec: 0, bin: "0000", hex: "0", oct: "0" },
                { dec: 1, bin: "0001", hex: "1", oct: "1" },
                { dec: 2, bin: "0010", hex: "2", oct: "2" },
                { dec: 3, bin: "0011", hex: "3", oct: "3" },
                { dec: 4, bin: "0100", hex: "4", oct: "4" },
                { dec: 5, bin: "0101", hex: "5", oct: "5" },
                { dec: 6, bin: "0110", hex: "6", oct: "6" },
                { dec: 7, bin: "0111", hex: "7", oct: "7" },
                { dec: 8, bin: "1000", hex: "8", oct: "10" },
                { dec: 9, bin: "1001", hex: "9", oct: "11" },
                { dec: 10, bin: "1010", hex: "A", oct: "12" },
                { dec: 11, bin: "1011", hex: "B", oct: "13" },
                { dec: 12, bin: "1100", hex: "C", oct: "14" },
                { dec: 13, bin: "1101", hex: "D", oct: "15" },
                { dec: 14, bin: "1110", hex: "E", oct: "16" },
                { dec: 15, bin: "1111", hex: "F", oct: "17" },
              ].map((row) => (
                <tr key={row.dec} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 text-slate-900 dark:text-slate-100">{row.dec}</td>
                  <td className="p-3 text-blue-600 dark:text-blue-400">{row.bin}</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">0x{row.hex}</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">0o{row.oct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default BinaryContent;
