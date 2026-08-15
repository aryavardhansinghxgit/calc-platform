"use client";

import React from "react";

export function LogContent() {
  return (
    <div className="space-y-8 text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
      {/* SECTION 1: HOW TO CALCULATE LOGARITHMS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          How to Calculate Logarithms (Step-by-Step)
        </h2>
        <p className="text-sm leading-relaxed">
          A <strong>logarithm</strong> is the inverse mathematical operation of exponentiation. It answers the fundamental question: <em>&quot;To what exponent power must the base <code>b</code> be raised to produce the number <code>x</code>?&quot;</em>
        </p>

        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-bold text-center text-base font-sans tabular-nums">
          {"log_b(x) = y  ⇔  b^y = x  (where b > 0, b ≠ 1, x > 0)"}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Historical Origins (1614)</h3>
            <p className="leading-relaxed font-medium">
              Invented by Scottish mathematician John Napier in 1614, logarithms simplified complex multiplication and division in astronomy and navigation into straightforward addition and subtraction before digital computers existed.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Antilogarithm (Inverse Log)</h3>
            <p className="leading-relaxed font-medium">
              The antilogarithm is the inverse function of a logarithm: <code>antilog_b(y) = b^y</code>. For example, <code>antilog₁₀(3) = 10³ = 1000</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Domain &amp; Asymptotes</h3>
            <p className="leading-relaxed font-medium">
              The logarithm function is defined strictly for positive arguments <code>x &gt; 0</code> and possesses a vertical asymptote at <code>x = 0</code> where <code>lim (x → 0⁺) log_b(x) = -∞</code>.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE CORE RULES & PROPERTIES */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          The Core Rules &amp; Properties of Logarithms
        </h2>
        <p className="text-sm leading-relaxed">
          Logarithms obey 7 fundamental algebraic properties that allow complex expressions to be expanded or condensed:
        </p>

        <div className="space-y-3 text-xs font-medium pt-1 font-sans tabular-nums">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">1. Product Rule</h3>
            <div>{"log_b(x · y) = log_b(x) + log_b(y)"}</div>
            <p className="text-slate-700 dark:text-slate-300 font-normal pt-1">The log of a product equals the sum of individual logs. Example: log₁₀(10 × 100) = log₁₀(10) + log₁₀(100) = 1 + 2 = 3.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">2. Quotient Rule</h3>
            <div>{"log_b(x / y) = log_b(x) - log_b(y)"}</div>
            <p className="text-slate-700 dark:text-slate-300 font-normal pt-1">The log of a quotient equals the difference of numerator and denominator logs.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">3. Power Rule</h3>
            <div>{"log_b(x^k) = k · log_b(x)"}</div>
            <p className="text-slate-700 dark:text-slate-300 font-normal pt-1">An exponent power inside a log argument moves outside as a multiplying coefficient.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">4. Identity &amp; Zero-Power Rules</h3>
            <div>{"log_b(b) = 1  and  log_b(1) = 0"}</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: COMMON VS NATURAL VS BINARY LOGARITHMS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          Common vs. Natural vs. Binary Logarithms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 font-sans tabular-nums">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Common Logarithm (log₁₀ or lg)</h3>
            <div>Base: 10</div>
            <p className="text-slate-700 dark:text-slate-300">Standard for human base-10 counting, engineering magnitude scales (decibels, Richter scale, pH).</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 font-sans tabular-nums">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Natural Logarithm (ln or log_e)</h3>
            <div>Base: e ≈ 2.718281828459</div>
            <p className="text-slate-700 dark:text-slate-300">Fundamental to calculus, physics, continuous growth/decay, and differential equations (d/dx ln x = 1/x).</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 font-sans tabular-nums">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Binary Logarithm (log₂ or lb)</h3>
            <div>Base: 2</div>
            <p className="text-slate-700 dark:text-slate-300">Standard for computer science, data structures, binary trees, information theory, and Big-O algorithm analysis.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: CHANGE OF BASE FORMULA */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          Change of Base Formula &amp; Mathematical Proofs
        </h2>
        <p className="text-sm leading-relaxed">
          Standard scientific calculators often only possess buttons for <code>log₁₀</code> and <code>ln</code>. The <strong>Change of Base Formula</strong> allows evaluating a logarithm with any custom base <code>b</code> using natural logs or common logs:
        </p>

        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs font-sans tabular-nums font-bold text-blue-700 dark:text-blue-400 space-y-1">
          <div>{"log_b(x) = ln(x) / ln(b) = log₁₀(x) / log₁₀(b)"}</div>
          <p className="text-slate-700 dark:text-slate-300 pt-1 font-normal">
            {"Example: log₅(125) = ln(125) / ln(5) = 4.8283137 / 1.6094379 = 3.0."}
          </p>
        </div>
      </section>

      {/* SECTION 5: REAL-WORLD APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          Real-World Applications of Logarithmic Scales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Acoustics &amp; Audio (Decibels)</h3>
            <p className="leading-relaxed">
              Sound pressure levels are measured on a base-10 logarithmic scale: <code>dB = 10 log₁₀(P / P₀)</code>. An increase of 10 dB represents a tenfold increase in acoustic sound intensity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Chemistry &amp; Acidity (pH Scale)</h3>
            <p className="leading-relaxed">
              Solution acidity is defined as the negative log of hydrogen ion concentration: <code>pH = -log₁₀[H⁺]</code>. A liquid with pH 3 is 10 times more acidic than pH 4.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Seismology (Richter Scale)</h3>
            <p className="leading-relaxed">
              Earthquake energy release scales logarithmically: <code>M = log₁₀(A / A₀)</code>. A magnitude 7 earthquake releases ~31.6 times more energy than a magnitude 6 earthquake.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Computer Science (Big-O Complexity)</h3>
            <p className="leading-relaxed">
              Binary search algorithms divide search spaces in half each step, exhibiting <code>O(log₂ n)</code> time complexity—allowing searching 1 billion items in just ~30 operations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LogContent;
