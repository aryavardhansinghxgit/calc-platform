import React from "react";

export function RomanNumeralContent() {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          Introduction to Roman Numerals
        </h2>
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong>Roman Numerals</strong> comprise the ancient additive-subtractive numeral system developed in ancient Rome, derived from Etruscan tally marks and finger hand gestures around the 8th to 9th century BCE. Unlike the modern Hindu-Arabic decimal positional notation ($0-9$), Roman numerals rely on <strong>seven distinct Latin alphabet letters</strong> arranged in specific sequence to represent quantities.
        </p>
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          While Europe transitioned to Hindu-Arabic numerals following the publication of Fibonacci&apos;s <em>Liber Abaci</em> in 1202, Roman numerals remain extensively utilized today across horology (luxury clock and watch dials), monument cornerstones, legal volume indexing, movie copyright publication dates, Super Bowl editions, Olympic Games designations, monarchical regnal titles (e.g., King Charles III), and commemorative tattoo dates.
        </p>
      </section>

      {/* 2. The 7 Fundamental Symbols & Value Mapping */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          The 7 Classical Roman Numeral Symbols
        </h2>
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          The entire standard classical system is constructed from combinations of these seven capital letters:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-700 text-xs font-sans">
            <thead className="bg-blue-900 text-white font-bold">
              <tr>
                <th className="p-2 border border-zinc-300 dark:border-zinc-700">Symbol</th>
                <th className="p-2 border border-zinc-300 dark:border-zinc-700">Latin Etymology / Derivation</th>
                <th className="p-2 border border-zinc-300 dark:border-zinc-700 text-right">Arabic Decimal Value</th>
                <th className="p-2 border border-zinc-300 dark:border-zinc-700">Repeatable?</th>
                <th className="p-2 border border-zinc-300 dark:border-zinc-700">Subtractable?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/50">
                <td className="p-2 font-black text-blue-700 dark:text-blue-400 font-mono text-sm">I</td>
                <td className="p-2"><em>Unus</em> (single raised finger / vertical tally notch)</td>
                <td className="p-2 text-right font-bold font-mono">1</td>
                <td className="p-2 text-emerald-600 font-semibold">Yes (Max 3)</td>
                <td className="p-2 text-emerald-600 font-semibold">Yes (Before V, X)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/50">
                <td className="p-2 font-black text-blue-700 dark:text-blue-400 font-mono text-sm">V</td>
                <td className="p-2"><em>Quinque</em> (open hand showing 5 fingers in a V-notch)</td>
                <td className="p-2 text-right font-bold font-mono">5</td>
                <td className="p-2 text-rose-600 font-semibold">No (Never repeated)</td>
                <td className="p-2 text-rose-600 font-semibold">No (Never subtracted)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/50">
                <td className="p-2 font-black text-blue-700 dark:text-blue-400 font-mono text-sm">X</td>
                <td className="p-2"><em>Decem</em> (two crossed hands or doubled V-notches)</td>
                <td className="p-2 text-right font-bold font-mono">10</td>
                <td className="p-2 text-emerald-600 font-semibold">Yes (Max 3)</td>
                <td className="p-2 text-emerald-600 font-semibold">Yes (Before L, C)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/50">
                <td className="p-2 font-black text-blue-700 dark:text-blue-400 font-mono text-sm">L</td>
                <td className="p-2"><em>Quinquaginta</em> (evolved from the Chalcidian letter psi)</td>
                <td className="p-2 text-right font-bold font-mono">50</td>
                <td className="p-2 text-rose-600 font-semibold">No (Never repeated)</td>
                <td className="p-2 text-rose-600 font-semibold">No (Never subtracted)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/50">
                <td className="p-2 font-black text-blue-700 dark:text-blue-400 font-mono text-sm">C</td>
                <td className="p-2"><em>Centum</em> (Latin word for one hundred)</td>
                <td className="p-2 text-right font-bold font-mono">100</td>
                <td className="p-2 text-emerald-600 font-semibold">Yes (Max 3)</td>
                <td className="p-2 text-emerald-600 font-semibold">Yes (Before D, M)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/50">
                <td className="p-2 font-black text-blue-700 dark:text-blue-400 font-mono text-sm">D</td>
                <td className="p-2"><em>Quingenti</em> (half of the ancient Greek/Etruscan phi symbol)</td>
                <td className="p-2 text-right font-bold font-mono">500</td>
                <td className="p-2 text-rose-600 font-semibold">No (Never repeated)</td>
                <td className="p-2 text-rose-600 font-semibold">No (Never subtracted)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/50">
                <td className="p-2 font-black text-blue-700 dark:text-blue-400 font-mono text-sm">M</td>
                <td className="p-2"><em>Mille</em> (Latin word for one thousand)</td>
                <td className="p-2 text-right font-bold font-mono">1,000</td>
                <td className="p-2 text-emerald-600 font-semibold">Yes (Max 3 in standard form)</td>
                <td className="p-2 text-rose-600 font-semibold">No (Never subtracted)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. The Core Grammar Rules of Roman Numerals */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          Mathematical Grammar &amp; Formation Rules
        </h2>

        <div className="space-y-3 text-xs leading-relaxed">
          <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 space-y-1.5">
            <h3 className="font-bold text-blue-900 dark:text-blue-200 text-sm">
              1. The Additive Principle (Left-to-Right Descending Order)
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              When symbols appear in non-increasing value from left to right, their values are directly added together.
            </p>
            <div className="font-mono bg-white dark:bg-zinc-900 p-2 rounded border border-blue-100 dark:border-blue-900 text-zinc-800 dark:text-zinc-200">
              MCLVII = 1,000 (M) + 100 (C) + 50 (L) + 5 (V) + 1 (I) + 1 (I) = 1,157
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
              2. The Subtractive Principle (Preceding Smaller Value)
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              When a smaller value symbol immediately precedes a larger value symbol, the smaller value is <strong>subtracted</strong> from the larger value. Only six subtractive pairs are canonically permitted:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400">
              <li><strong>IV</strong> = 5 - 1 = <strong>4</strong></li>
              <li><strong>IX</strong> = 10 - 1 = <strong>9</strong></li>
              <li><strong>XL</strong> = 50 - 10 = <strong>40</strong></li>
              <li><strong>XC</strong> = 100 - 10 = <strong>90</strong></li>
              <li><strong>CD</strong> = 500 - 100 = <strong>400</strong></li>
              <li><strong>CM</strong> = 1000 - 100 = <strong>900</strong></li>
            </ul>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
              3. Strict Subtractive &amp; Repetitive Limitations
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400">
              <li><strong>The 3-Repetition Limit:</strong> Symbols I, X, C, and M cannot be repeated more than 3 consecutive times (e.g., 4 is IV, never IIII; 40 is XL, never XXXX).</li>
              <li><strong>V, L, and D are Never Repeated or Subtracted:</strong> There is no VV (10 is X), no LL (100 is C), and no DD (1000 is M). Furthermore, VX (10 - 5) or LC (100 - 50) do not exist.</li>
              <li><strong>Distance Rule for Subtraction:</strong> A subtractive symbol can only subtract from the next two larger symbols in powers of 10. Thus, I can subtract from V and X, but <em>never</em> from L, C, D, or M (e.g., 99 is <strong>XCIX</strong>, never <em>IC</em>; 999 is <strong>CMXCIX</strong>, never <em>IM</em>).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Large Numbers: Vinculum (Overline) & Apostrophus Methods */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          Large Numbers: Vinculum &amp; Apostrophus Notation
        </h2>
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          Because standard Roman numerals max out at 3,999 (MMMCMXCIX) without repeating M four times, the Romans and Medieval scholars developed two standardized systems to denote values above 4,000:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-blue-50/40 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800 space-y-2">
            <h3 className="font-bold text-blue-900 dark:text-blue-200 text-sm">
              The Vinculum (Overline Multiplier ×1,000)
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              A horizontal bar drawn over a Roman numeral multiplies its underlying decimal value by <strong>1,000</strong>. A double overline multiplies by 1,000,000.
            </p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-zinc-800 dark:text-zinc-200">
              <li>V̅ (_V) = 5 × 1,000 = <strong>5,000</strong></li>
              <li>X̅ (_X) = 10 × 1,000 = <strong>10,000</strong></li>
              <li>L̅ (_L) = 50 × 1,000 = <strong>50,000</strong></li>
              <li>C̅ (_C) = 100 × 1,000 = <strong>100,000</strong></li>
              <li>D̅ (_D) = 500 × 1,000 = <strong>500,000</strong></li>
              <li>M̅ (_M) = 1,000 × 1,000 = <strong>1,000,000</strong></li>
            </ul>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-2">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
              The Apostrophus Method (Epigraphic C &amp; Ɔ)
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Used in classical stone inscriptions and early Renaissance printing, this system used concentric parentheses-like arcs:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-zinc-800 dark:text-zinc-200">
              <li>I) = 500 (D)</li>
              <li>(I) = 1,000 (M)</li>
              <li>I)) = 5,000</li>
              <li>((I)) = 10,000</li>
              <li>I))) = 50,000</li>
              <li>(((I))) = 100,000</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Why There is No Zero (Nulla) & Roman Fractions */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          Why Roman Numerals Lack a Zero (Nulla) &amp; Duodecimal Fractions
        </h2>

        <div className="space-y-3 text-xs leading-relaxed">
          <p className="text-zinc-700 dark:text-zinc-300">
            The concept of zero ($0$) as both a numerical quantity and a positional placeholder was unnecessary in Roman arithmetic. Because Roman numerals are <strong>strictly additive</strong> based on specific letter values rather than positional exponents of 10 (as in 204 = 2×10² + 0×10¹ + 4×10⁰), absent place values are simply omitted (204 = CCIV). When Roman accountants recorded empty balances, they wrote the Latin word <em>nulla</em> (meaning &quot;nothing&quot;) or used the letter <strong>N</strong>.
          </p>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1.5">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
              Roman Duodecimal (Base-12) Fractions (The Uncia System)
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              For commercial weights and currency, Romans divided the unit (<em>as</em> or <em>libra</em>) into 12 parts called <em>unciae</em> (the linguistic ancestor of both &quot;ounce&quot; and &quot;inch&quot;):
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1 font-mono">
              <div className="p-1.5 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-700">
                <span className="font-bold block text-blue-700 dark:text-blue-400">• (Uncia)</span>
                <span className="text-[10px] text-zinc-500">1/12 (0.0833)</span>
              </div>
              <div className="p-1.5 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-700">
                <span className="font-bold block text-blue-700 dark:text-blue-400">:• (Quadrans)</span>
                <span className="text-[10px] text-zinc-500">3/12 = 1/4 (0.25)</span>
              </div>
              <div className="p-1.5 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-700">
                <span className="font-bold block text-blue-700 dark:text-blue-400">:: (Triens)</span>
                <span className="text-[10px] text-zinc-500">4/12 = 1/3 (0.333)</span>
              </div>
              <div className="p-1.5 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-700">
                <span className="font-bold block text-blue-700 dark:text-blue-400">S (Semis)</span>
                <span className="text-[10px] text-zinc-500">6/12 = 1/2 (0.50)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Step-by-Step Worked Conversion Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          Step-by-Step Worked Conversion Examples
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Example 1 */}
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 space-y-2">
            <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 block">
              Example 1: Basic Number (768)
            </span>
            <div className="space-y-1 text-zinc-700 dark:text-zinc-300">
              <p><strong>Step 1:</strong> Decompose by place value:</p>
              <div className="font-mono bg-zinc-50 dark:bg-zinc-800 p-1.5 rounded">
                768 = 700 + 60 + 8
              </div>
              <p><strong>Step 2:</strong> Convert each component:</p>
              <ul className="list-disc pl-4 font-mono">
                <li>700 = D + C + C = DCC</li>
                <li>60 = L + X = LX</li>
                <li>8 = V + I + I + I = VIII</li>
              </ul>
              <p className="font-bold text-blue-900 dark:text-blue-200 pt-1">
                Result: DCCLXVIII
              </p>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 space-y-2">
            <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 block">
              Example 2: Complex Subtractive (1,994)
            </span>
            <div className="space-y-1 text-zinc-700 dark:text-zinc-300">
              <p><strong>Step 1:</strong> Decompose by place value:</p>
              <div className="font-mono bg-zinc-50 dark:bg-zinc-800 p-1.5 rounded">
                1994 = 1000 + 900 + 90 + 4
              </div>
              <p><strong>Step 2:</strong> Convert each component:</p>
              <ul className="list-disc pl-4 font-mono">
                <li>1000 = M</li>
                <li>900 = CM (1000 - 100)</li>
                <li>90 = XC (100 - 10)</li>
                <li>4 = IV (5 - 1)</li>
              </ul>
              <p className="font-bold text-blue-900 dark:text-blue-200 pt-1">
                Result: MCMXCIV
              </p>
            </div>
          </div>

          {/* Example 3 */}
          <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 space-y-2">
            <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 block">
              Example 3: Decoding (MMMDCCXXVIII)
            </span>
            <div className="space-y-1 text-zinc-700 dark:text-zinc-300">
              <p><strong>Step 1:</strong> Identify symbol groups:</p>
              <ul className="list-disc pl-4 font-mono">
                <li>MMM = 3,000</li>
                <li>DCC = 500 + 200 = 700</li>
                <li>XX = 20</li>
                <li>VIII = 5 + 3 = 8</li>
              </ul>
              <p><strong>Step 2:</strong> Sum the components:</p>
              <div className="font-mono bg-zinc-50 dark:bg-zinc-800 p-1.5 rounded">
                3000 + 700 + 20 + 8 = 3,728
              </div>
              <p className="font-bold text-blue-900 dark:text-blue-200 pt-1">
                Result: 3,728
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Comprehensive Reference Lookup Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          Roman Numerals Master Reference Chart (1 to 100, 500, 1000)
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs font-sans">
          {[
            { n: 1, r: "I" }, { n: 2, r: "II" }, { n: 3, r: "III" }, { n: 4, r: "IV" }, { n: 5, r: "V" }, { n: 6, r: "VI" },
            { n: 7, r: "VII" }, { n: 8, r: "VIII" }, { n: 9, r: "IX" }, { n: 10, r: "X" }, { n: 11, r: "XI" }, { n: 12, r: "XII" },
            { n: 13, r: "XIII" }, { n: 14, r: "XIV" }, { n: 15, r: "XV" }, { n: 19, r: "XIX" }, { n: 20, r: "XX" }, { n: 25, r: "XXV" },
            { n: 30, r: "XXX" }, { n: 40, r: "XL" }, { n: 50, r: "L" }, { n: 60, r: "LX" }, { n: 70, r: "LXX" }, { n: 80, r: "LXXX" },
            { n: 90, r: "XC" }, { n: 99, r: "XCIX" }, { n: 100, r: "C" }, { n: 200, r: "CC" }, { n: 300, r: "CCC" }, { n: 400, r: "CD" },
            { n: 500, r: "D" }, { n: 600, r: "DC" }, { n: 700, r: "DCC" }, { n: 800, r: "DCCC" }, { n: 900, r: "CM" }, { n: 1000, r: "M" },
            { n: 1776, r: "MDCCLXXVI" }, { n: 1984, r: "MCMLXXXIV" }, { n: 2000, r: "MM" }, { n: 2024, r: "MMXXIV" }, { n: 2025, r: "MMXXV" }, { n: 2026, r: "MMXXVI" }
          ].map((item) => (
            <div
              key={item.n}
              className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 flex items-center justify-between"
            >
              <span className="font-mono text-zinc-500 font-medium">{item.n}</span>
              <span className="font-mono font-bold text-blue-700 dark:text-blue-300">{item.r}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Summary */}
      <section className="p-4 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800 space-y-2">
        <h3 className="font-bold text-blue-950 dark:text-blue-100 text-sm">
          Summary &amp; Key Takeaways
        </h3>
        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Mastering Roman numerals requires understanding place-value decomposition into thousands, hundreds, tens, and units, applying subtractive notation strictly where permitted (IV, IX, XL, XC, CD, CM), and using overline vinculum multipliers for numbers of 4,000 and beyond.
        </p>
      </section>
    </div>
  );
}
