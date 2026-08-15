"use client";

import React from "react";

export function RatioContent() {
  return (
    <div className="space-y-8 text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
      {/* SECTION 1: HOW TO SOLVE AND CALCULATE RATIOS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          How to Solve and Calculate Ratios (Step-by-Step)
        </h2>
        <p className="text-sm leading-relaxed">
          A <strong>ratio</strong> is a mathematical comparison of two or more quantities indicating how many times one value contains another. Ratios can be expressed in three equivalent notations:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1 font-sans tabular-nums">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Colon Notation</h3>
            <div className="font-bold text-base text-blue-700 dark:text-blue-300">A : B</div>
            <p className="leading-relaxed font-normal text-slate-700 dark:text-slate-300">
              The standard notation separating ratio terms with a colon (e.g., <code>3 : 4</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1 font-sans tabular-nums">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Fraction Notation</h3>
            <div className="font-bold text-base text-blue-700 dark:text-blue-300">A / B</div>
            <p className="leading-relaxed font-normal text-slate-700 dark:text-slate-300">
              Expresses the ratio as a mathematical quotient division (e.g., <code>3/4 = 0.75</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1 font-sans tabular-nums">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Word Notation</h3>
            <div className="font-bold text-base text-blue-700 dark:text-blue-300">&quot;A to B&quot;</div>
            <p className="leading-relaxed font-normal text-slate-700 dark:text-slate-300">
              Verbal phrase commonly used in recipe mixing and financial equity statements.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: CORE MATHEMATICAL RULES & PROPORTIONS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          Understanding Ratios and Proportions: Core Mathematical Rules
        </h2>
        <p className="text-sm leading-relaxed">
          A <strong>proportion</strong> is an algebraic equation stating that two ratios are strictly equivalent:
        </p>

        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-bold text-center text-base font-sans tabular-nums">
          {"A / B = C / D   ⇒   A × D = B × C  (Cross-Multiplication Theorem)"}
        </div>

        <p className="text-sm leading-relaxed">
          To solve for any single missing variable <code>X</code> in a proportion, cross-multiply the known diagonal terms and divide by the remaining term:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium font-sans tabular-nums">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Solving for D</h3>
            <div>{"A / B = C / D   ⇒   D = (B × C) / A"}</div>
            <p className="text-slate-700 dark:text-slate-300 font-normal pt-1">
              {"Example: 3 / 4 = 6 / D  ⇒  D = (4 × 6) / 3 = 24 / 3 = 8."}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Solving for C</h3>
            <div>{"A / B = C / D   ⇒   C = (A × D) / B"}</div>
            <p className="text-slate-700 dark:text-slate-300 font-normal pt-1">
              {"Example: 5 / 10 = C / 50  ⇒  C = (5 × 50) / 10 = 250 / 10 = 25."}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: PART-TO-PART VS PART-TO-WHOLE */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          Part-to-Part vs. Part-to-Whole Ratios Explained
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 font-sans tabular-nums">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Part-to-Part Ratios</h3>
            <p className="leading-relaxed">
              Compares one individual component to another component (e.g., 2 red balls to 3 blue balls = <code>2 : 3</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 font-sans tabular-nums">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Part-to-Whole Ratios</h3>
            <p className="leading-relaxed">
              Compares one component to the entire group total: <code>Share % = [A / (A + B + C)] × 100%</code>.
            </p>
            <div className="p-2.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 font-bold text-blue-700 dark:text-blue-300">
              {"Example: 2 red balls out of 5 total = 2/5 = 40%."}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SIMPLIFYING MULTI-TERM RATIOS USING GCD */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          How to Simplify Multi-Term Ratios Using Greatest Common Divisor (GCD)
        </h2>
        <p className="text-sm leading-relaxed">
          To reduce a multi-term ratio (e.g., <code>12 : 18 : 24</code>) to its simplest whole-integer form:
        </p>

        <ol className="list-decimal pl-5 space-y-2 text-xs font-medium font-sans tabular-nums">
          <li><strong>Eliminate Decimals:</strong> If terms contain decimals, multiply all terms by 10, 100, or 1000 to convert to integers.</li>
          <li><strong>Calculate GCD:</strong> Find the Greatest Common Divisor of all integer terms (e.g., <code>GCD(12, 18, 24) = 6</code>).</li>
          <li><strong>Divide Each Term:</strong> Divide every term by the GCD: <code>12/6 : 18/6 : 24/6 = 2 : 3 : 4</code>.</li>
        </ol>
      </section>

      {/* SECTION 5: REAL-WORLD APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
          Real-World Applications: Aspect Ratios, Finance, Recipes, and Scaling
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Digital Display Aspect Ratios</h3>
            <p className="leading-relaxed">
              Displays use standard aspect ratios: <code>16:9</code> (1920×1080 FHD, 3840×2160 4K UHD), <code>4:3</code> (legacy monitors), <code>21:9</code> (ultrawide), and <code>9:16</code> (mobile vertical video).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Financial Ratios &amp; Equity</h3>
            <p className="leading-relaxed">
              Investors analyze debt-to-equity ratios, P/E ratios, and distribute partnership dividends proportionally based on equity share ratios.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 font-sans tabular-nums">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">The Golden Ratio (Φ ≈ 1.618)</h3>
            <p className="leading-relaxed">
              Found in classical Greek architecture (Parthenon), Renaissance art, and natural spiral shell patterns where <code>(A + B) / A = A / B = 1.618034</code>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RatioContent;
