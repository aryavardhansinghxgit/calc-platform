"use client";

import React from "react";

export function HexContent() {
  return (
    <div className="space-y-8 text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
      {/* SECTION 1: WHAT IS THE HEXADECIMAL SYSTEM */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          What is the Hexadecimal Number System?
        </h2>
        <p className="text-sm leading-relaxed">
          The <strong>hexadecimal number system</strong> (commonly shortened to <strong>Hex</strong>) is a base-16 positional numeral system. While the standard decimal system uses ten digits (0–9) and binary uses two digits (0–1), hexadecimal uses sixteen distinct symbols: <code>0, 1, 2, 3, 4, 5, 6, 7, 8, 9</code> and letters <code>A, B, C, D, E, F</code> (representing decimal values 10 through 15).
        </p>
        <p className="text-sm leading-relaxed">
          Hexadecimal is widely used in computer science because one hex digit represents exactly 4 binary bits (a <strong>nibble</strong>), and two hex digits represent a full 8-bit <strong>byte</strong> (0x00 to 0xFF = 0 to 255). This makes long binary strings drastically easier for humans to read, write, and debug.
        </p>

        {/* BASE CONVERSION REFERENCE TABLE */}
        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
            Complete Base Conversion Reference Table (0–15)
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <table className="w-full text-center border-collapse text-xs font-sans tabular-nums font-bold">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">
                  <th className="p-2.5 text-left">Decimal (Base 10)</th>
                  <th className="p-2.5">Hexadecimal (Base 16)</th>
                  <th className="p-2.5">4-Bit Binary Nibble (Base 2)</th>
                  <th className="p-2.5">Octal (Base 8)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {[
                  { dec: 0, hex: "0", bin: "0000", oct: "0" },
                  { dec: 1, hex: "1", bin: "0001", oct: "1" },
                  { dec: 2, hex: "2", bin: "0010", oct: "2" },
                  { dec: 3, hex: "3", bin: "0011", oct: "3" },
                  { dec: 4, hex: "4", bin: "0100", oct: "4" },
                  { dec: 5, hex: "5", bin: "0101", oct: "5" },
                  { dec: 6, hex: "6", bin: "0110", oct: "6" },
                  { dec: 7, hex: "7", bin: "0111", oct: "7" },
                  { dec: 8, hex: "8", bin: "1000", oct: "10" },
                  { dec: 9, hex: "9", bin: "1001", oct: "11" },
                  { dec: 10, hex: "A", bin: "1010", oct: "12" },
                  { dec: 11, hex: "B", bin: "1011", oct: "13" },
                  { dec: 12, hex: "C", bin: "1100", oct: "14" },
                  { dec: 13, hex: "D", bin: "1101", oct: "15" },
                  { dec: 14, hex: "E", bin: "1110", oct: "16" },
                  { dec: 15, hex: "F", bin: "1111", oct: "17" },
                ].map((row) => (
                  <tr key={row.dec} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-2.5 text-left text-slate-900 dark:text-slate-100">{row.dec}</td>
                    <td className="p-2.5 text-blue-600 dark:text-blue-400">0x{row.hex}</td>
                    <td className="p-2.5 text-slate-700 dark:text-slate-300">{row.bin}</td>
                    <td className="p-2.5 text-slate-700 dark:text-slate-300">0o{row.oct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW TO CALCULATE IN HEXADECIMAL */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          How to Calculate in Hexadecimal (Step-by-Step Guides)
        </h2>

        {/* Addition */}
        <div className="space-y-2">
          <h3 className="text-base font-extrabold text-blue-600 dark:text-blue-400">
            Hex Addition &amp; Carrying Rules
          </h3>
          <p className="text-sm leading-relaxed">
            Hex addition follows standard column addition. When a column sum reaches or exceeds 16₁₀ (0x10), subtract 16₁₀ from the sum to get the result digit, and carry 1 to the next higher-order column.
          </p>
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs font-sans tabular-nums font-bold text-blue-700 dark:text-blue-400 space-y-1">
            <div>Example: 0x8AB + 0xB78</div>
            <div>• Right Column: B (11) + 8 = 19. Since 19 ≥ 16, 19 - 16 = 3 (Carry 1).</div>
            <div>• Middle Column: A (10) + 7 + 1 (Carry) = 18. Since 18 ≥ 16, 18 - 16 = 2 (Carry 1).</div>
            <div>• Left Column: 8 + B (11) + 1 (Carry) = 20. Since 20 ≥ 16, 20 - 16 = 4 (Carry 1).</div>
            <div>• Final Result = 0x1423</div>
          </div>
        </div>

        {/* Subtraction */}
        <div className="space-y-2">
          <h3 className="text-base font-extrabold text-blue-600 dark:text-blue-400">
            Hex Subtraction &amp; Borrowing Rules
          </h3>
          <p className="text-sm leading-relaxed">
            When subtracting in Hex, if a minuend column digit is smaller than the subtrahend digit, borrow 1 from the adjacent left column. In Base-16, a borrowed 1 adds <strong>16₁₀</strong> to the current column digit.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-sans tabular-nums font-bold space-y-1">
            <div>Example: 0x5DC - 0x3AF</div>
            <div>• Right Column: C (12) - F (15). Borrow 1 from D (13 → 12). Add 16 to 12 = 28. Then 28 - 15 = 13 (D).</div>
            <div>• Middle Column: D (now 12) - A (10) = 2.</div>
            <div>• Left Column: 5 - 3 = 2.</div>
            <div>• Final Result = 0x22D</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CONVERSION FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          Hex to Decimal &amp; Decimal to Hex Conversion Formulas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">Hex to Decimal Positional Formula</h3>
            <p className="leading-relaxed font-medium">
              Multiply each hex digit by 16 raised to its column position power (starting at 0 from the right) and sum the products:
            </p>

            <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 font-sans tabular-nums font-bold text-blue-700 dark:text-blue-400">
              {"0x2AA = (2 × 16²) + (10 × 16¹) + (10 × 16⁰)"}
              <br />
              {"= (2 × 256) + (160) + (10) = 512 + 160 + 10 = 682₁₀"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">Decimal to Hex Successive Division</h3>
            <p className="leading-relaxed font-medium">
              Repeatedly divide the decimal number by 16. The remainders recorded from bottom to top form the hexadecimal result:
            </p>
            <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 font-sans tabular-nums font-bold text-blue-700 dark:text-blue-400">
              {"Convert 1500₁₀:"}
              <br />
              {"1500 ÷ 16 = 93 Remainder 12 (C)"}
              <br />
              {"93 ÷ 16 = 5 Remainder 13 (D)"}
              <br />
              {"5 ÷ 16 = 0 Remainder 5"}
              <br />
              {"Result = 0x5DC"}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: REAL-WORLD APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          Real-World Applications of Hexadecimal
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Web Color Codes (#RRGGBB)</h3>
            <p className="leading-relaxed">
              HTML/CSS color codes use 6 hex digits to specify Red, Green, and Blue intensity (00 to FF = 0 to 255). For example, <code>#FF5733</code> specifies 255 Red, 87 Green, 51 Blue.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Memory Pointers &amp; Dumps</h3>
            <p className="leading-relaxed">
              Operating systems and low-level debuggers (C/C++, Rust, Assembly) display RAM memory addresses in hex format (e.g. <code>0x7FFF5FBFF0B0</code>) for concise memory alignment inspection.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Networking (MAC &amp; IPv6)</h3>
            <p className="leading-relaxed">
              Ethernet MAC addresses (e.g. <code>00:1A:2B:3C:4D:5E</code>) and 128-bit IPv6 addresses (e.g. <code>2001:0db8:85a3::8a2e:0370:7334</code>) are formatted in hexadecimal groupings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Machine Code &amp; Bytecode</h3>
            <p className="leading-relaxed">
              Compiled executable binary files (.exe, .so, Java .class bytecode) are inspected in hex editors to view machine instruction opcodes (e.g. <code>0x90</code> for NOP).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HexContent;
