"use client";

import React from "react";
import {
  BookOpen,
  Calculator,
  Layers,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Percent,
  Scale,
  Sparkles,
  HelpCircle,
  Divide,
} from "lucide-react";

export function PercentageContent() {
  return (
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-slate-100 dark:divide-slate-800 font-sans">
      {/* 1. INTRODUCTION */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <BookOpen className="h-4 w-4" />
          Mathematical Reference &amp; Educational Guide
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 m-0">
          Complete Mathematical Guide to Percentage Calculations
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A percentage is a dimensionless mathematical ratio expressed as a fraction of 100. It provides a standardized framework for scaling, comparing, and analyzing proportions across disparate magnitudes. Whether calculating retail discounts, analyzing investment yields, tracking inflation rates, evaluating scientific measurement tolerances, or computing academic test scores, percentages translate complex relative quantities into an intuitive base-100 format.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          This comprehensive percentage calculator solves the full spectrum of percentage mathematics: standard 3-way proportional equations (P% × V₁ = V₂), directional percentage changes (Increase / Decrease), symmetric percentage differences, reverse base-value recovery, and common conversational phrasing models.
        </p>
      </div>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          1. Mathematical Concept &amp; Core Definitions
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          The word <em>percent</em> derives from the Latin <em>per centum</em>, meaning &quot;by the hundred.&quot; In algebra, percentages represent a specialized notation for rational fractions where the denominator is fixed at 100:
        </p>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center text-blue-900 dark:text-blue-300 font-bold space-y-1">
          <div>P% = P / 100 = P × 0.01</div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300">
          Percentages are dimensionless scalars; they do not carry physical units of measurement such as meters, seconds, or grams. When a percentage is applied to a physical quantity with units (for example, 15% of $80), the resulting value inherits the units of the original base quantity ($12).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
            <strong className="block text-pink-600 dark:text-pink-400 font-bold text-sm">
              Percentage as a Fraction
            </strong>
            <p className="text-slate-700 dark:text-slate-300">
              Any percentage P% equals the fraction P / 100. For example, 25% = 25 / 100 = 1/4, representing one out of four equal parts.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
            <strong className="block text-blue-600 dark:text-blue-400 font-bold text-sm">
              Percentage as a Decimal
            </strong>
            <p className="text-slate-700 dark:text-slate-300">
              Dividing by 100 shifts the decimal point two places to the left: 4.5% = 0.045, and 125% = 1.25.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
            <strong className="block text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              Percentage as a Multiplier
            </strong>
            <p className="text-slate-700 dark:text-slate-300">
              In linear scaling, an increase of r% corresponds to multiplying the base by the growth factor (1 + r / 100).
            </p>
          </div>
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          2. Mathematical Formulas &amp; Algebraic Transformations
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Depending on which values are known and what relationship is being evaluated, percentage problems utilize five primary algebraic formulations:
        </p>

        <div className="space-y-3 text-xs sm:text-sm">
          {/* Formula 1 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <span className="font-bold text-pink-600 dark:text-pink-400 text-sm block">
              1. The Fundamental 3-Way Proportional Equation
            </span>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs font-bold text-blue-900 dark:text-blue-300 text-center">
              P × V₁ = V₂  ⟺  (P / 100) × V₁ = V₂
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>Solving for Part (V₂):</strong> V₂ = (P / 100) × V₁</li>
              <li><strong>Solving for Rate (P%):</strong> P = (V₂ / V₁) × 100% (where V₁ ≠ 0)</li>
              <li><strong>Solving for Whole Base (V₁):</strong> V₁ = V₂ / (P / 100) = (V₂ × 100) / P (where P ≠ 0)</li>
            </ul>
          </div>

          {/* Formula 2 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <span className="font-bold text-blue-600 dark:text-blue-400 text-sm block">
              2. Percentage Change Formula (Directional Relative Growth)
            </span>
            <p className="text-slate-700 dark:text-slate-300">
              Percentage change measures the relative difference between a final value V₂ and an initial starting baseline V₁:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs font-bold text-blue-900 dark:text-blue-300 text-center">
              Percentage Change = [(V₂ - V₁) / |V₁|] × 100%
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs">
              If V₂ &gt; V₁, the percentage change is positive (Percentage Increase). If V₂ &lt; V₁, it is negative (Percentage Decrease). If V₁ = 0, percentage change is mathematically undefined.
            </p>
          </div>

          {/* Formula 3 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm block">
              3. Percentage Difference Formula (Symmetric Comparison)
            </span>
            <p className="text-slate-700 dark:text-slate-300">
              When comparing two numbers where neither serves as a chronological or conceptual baseline, percentage difference divides their absolute distance by their arithmetic mean:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs font-bold text-blue-900 dark:text-blue-300 text-center">
              Percentage Difference = [ |V₁ - V₂| / ((V₁ + V₂) / 2) ] × 100%
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs">
              Because the arithmetic mean serves as the common denominator, the formula is commutative: Diff(A, B) = Diff(B, A).
            </p>
          </div>

          {/* Formula 4 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <span className="font-bold text-purple-600 dark:text-purple-400 text-sm block">
              4. Direct Percentage Increase and Decrease
            </span>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs font-bold text-blue-900 dark:text-blue-300 text-center">
              V₂ = V₁ × (1 ± P / 100)
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs">
              Use (1 + P / 100) for markups, sales tax, and inflation; use (1 - P / 100) for commercial discounts and depreciations.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          3. How the Calculation Works (Step-by-Step Operations)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Our calculator engine processes mathematical operations using exact 64-bit IEEE 754 floating-point arithmetic across four deterministic phases:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <strong className="text-slate-900 dark:text-white font-bold block">
              Step 1: Input Normalization &amp; Validation
            </strong>
            <p className="text-slate-600 dark:text-slate-400">
              Values are parsed from strings into numeric scalars. Division-by-zero checks are evaluated immediately before fractional quotient construction.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <strong className="text-slate-900 dark:text-white font-bold block">
              Step 2: Conversion to Decimal Multipliers
            </strong>
            <p className="text-slate-600 dark:text-slate-400">
              Percentage values (P) are divided by 100 to yield pure decimal multipliers, eliminating intermediate scaling distortion.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <strong className="text-slate-900 dark:text-white font-bold block">
              Step 3: Algebraic Evaluation
            </strong>
            <p className="text-slate-600 dark:text-slate-400">
              The targeted variable is isolated via algebraic substitution and evaluated using exact intermediate arithmetic.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <strong className="text-slate-900 dark:text-white font-bold block">
              Step 4: Precision Formatting
            </strong>
            <p className="text-slate-600 dark:text-slate-400">
              Results are formatted without trailing decimal zeroes for clean integers, or rounded cleanly to avoid binary floating-point artifacts.
            </p>
          </div>
        </div>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          4. Worked Step-by-Step Mathematical Examples
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Examine five practical worked examples spanning basic, intermediate, and advanced percentage mathematics:
        </p>

        <div className="space-y-4 text-xs sm:text-sm">
          {/* Example 1 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <h3 className="font-bold text-pink-600 dark:text-pink-400 text-sm">
              Example 1 (Basic Proportions): What is 15% of $80?
            </h3>
            <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <div>1. Identify knowns: P = 15%, V₁ = 80</div>
              <div>2. Convert percentage to decimal: 15 ÷ 100 = 0.15</div>
              <div>3. Multiply decimal by base: V₂ = 0.15 × 80</div>
              <div>4. Final Result: <span className="font-bold text-blue-600 dark:text-blue-400">V₂ = $12.00</span></div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">
              Example 2 (Directional Asymmetry): Price Increase vs. Price Decrease
            </h3>
            <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <div><strong>Case A ($40 to $50):</strong> Change = (50 - 40) / 40 × 100% = 10 / 40 × 100% = <span className="font-bold text-emerald-600">+25% Increase</span></div>
              <div><strong>Case B ($50 to $40):</strong> Change = (40 - 50) / 50 × 100% = -10 / 50 × 100% = <span className="font-bold text-red-600">-20% Decrease</span></div>
              <div className="text-slate-500 text-[11px] pt-1">Insight: The absolute dollar difference is $10 in both directions, but the percentage changes differ because the starting base value changed.</div>
            </div>
          </div>

          {/* Example 3 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              Example 3 (Symmetric Comparison): Percentage Difference Between 120 and 150
            </h3>
            <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <div>1. Absolute difference: |120 - 150| = 30</div>
              <div>2. Arithmetic average: (120 + 150) / 2 = 270 / 2 = 135</div>
              <div>3. Ratio: 30 / 135 = 2 / 9 ≈ 0.222222...</div>
              <div>4. Final Result: <span className="font-bold text-emerald-600 dark:text-emerald-400">22.2222% Percentage Difference</span></div>
            </div>
          </div>

          {/* Example 4 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <h3 className="font-bold text-purple-600 dark:text-purple-400 text-sm">
              Example 4 (Reverse Base Recovery): Original Price Before 20% Discount
            </h3>
            <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <div>1. A jacket costs $64 after a 20% discount. Find original price V₁.</div>
              <div>2. Discounted price represents (100% - 20%) = 80% of original: 0.80 × V₁ = 64</div>
              <div>3. Solve for V₁: V₁ = 64 / 0.80 = 64 ÷ (4/5) = 64 × 1.25</div>
              <div>4. Final Result: <span className="font-bold text-purple-600 dark:text-purple-400">Original Price = $80.00</span></div>
            </div>
          </div>

          {/* Example 5 */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
            <h3 className="font-bold text-amber-600 dark:text-amber-400 text-sm">
              Example 5 (Chained Percentages): 20% Markup Followed by 20% Markdown
            </h3>
            <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <div>1. Initial Base: $100.00</div>
              <div>2. After +20% Markup: $100 × (1 + 0.20) = $120.00</div>
              <div>3. After -20% Markdown: $120 × (1 - 0.20) = $96.00</div>
              <div>4. Net Compounded Change: (96 - 100) / 100 × 100% = <span className="font-bold text-red-600">-4% Net Loss</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING & CONVERSION TABLES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          5. Visual Understanding: Fractions, Decimals &amp; Percentage Conversion Grid
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          This reference matrix lists standard rational fractions, exact decimal quotients, repeating decimal behaviors, and corresponding percentage values:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 my-4">
          <table className="w-full text-left text-xs sm:text-sm font-sans tabular-nums">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Fraction</th>
                <th className="p-3">Decimal Equivalent</th>
                <th className="p-3">Percentage Value</th>
                <th className="p-3">Common Multiplier Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              <tr>
                <td className="p-3 font-bold text-pink-600 dark:text-pink-400">1/1</td>
                <td className="p-3">1.0</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">100%</td>
                <td className="p-3">Whole Base Quantity</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td className="p-3 font-bold text-pink-600 dark:text-pink-400">1/2</td>
                <td className="p-3">0.5</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">50%</td>
                <td className="p-3">Half (50% discount)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-pink-600 dark:text-pink-400">1/3</td>
                <td className="p-3">0.333333... (repeating)</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">33.3333%</td>
                <td className="p-3">One-third share</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td className="p-3 font-bold text-pink-600 dark:text-pink-400">1/4</td>
                <td className="p-3">0.25</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">25%</td>
                <td className="p-3">Quarter (standard quartile)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-pink-600 dark:text-pink-400">1/5</td>
                <td className="p-3">0.20</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">20%</td>
                <td className="p-3">Standard retail discount / tip</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td className="p-3 font-bold text-pink-600 dark:text-pink-400">1/8</td>
                <td className="p-3">0.125</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">12.5%</td>
                <td className="p-3">One-eighth (half of a quarter)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-pink-600 dark:text-pink-400">1/10</td>
                <td className="p-3">0.10</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">10%</td>
                <td className="p-3">Decile / sales tax baseline</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <td className="p-3 font-bold text-pink-600 dark:text-pink-400">3/4</td>
                <td className="p-3">0.75</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">75%</td>
                <td className="p-3">Three-quarters (75% supermajority)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-pink-600 dark:text-pink-400">1/100</td>
                <td className="p-3">0.01</td>
                <td className="p-3 font-bold text-blue-600 dark:text-blue-400">1%</td>
                <td className="p-3">100 Basis Points (100 bps)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON MISTAKES & EDGE CASES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          6. Common Mathematical Pitfalls &amp; Edge Cases
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Avoid these frequent logical and arithmetic errors when computing percentages:
        </p>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white font-bold block">
                Mistake 1: Directly Adding Successive Percentage Changes
              </strong>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                A store offering &quot;50% off plus an extra 50% off&quot; does not make the item free (100% off). The second 50% discount applies to the remaining 50% balance, yielding a total discount of 50% + (0.50 × 50%) = 75%, with the customer paying 25% of the original retail price.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white font-bold block">
                Mistake 2: Confusing Percentage Points (p.p.) with Percentages (%)
              </strong>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                If an interest rate increases from 4% to 5%, the absolute increase is <strong>1 percentage point</strong>, but the relative percentage increase is (5 - 4) / 4 × 100% = <strong>+25%</strong>. Conflating these terms leads to major financial reporting misinterpretations.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white font-bold block">
                Mistake 3: The Base Asymmetry Fallacy (Loss Recovery)
              </strong>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                If an investment loses 50% of its value (for example, $100 to $50), a subsequent gain of 50% only brings it to $75, not $100. A portfolio must gain <strong>+100%</strong> to break even after a 50% decline.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white font-bold block">
                Mistake 4: Division by Zero in Growth Rates
              </strong>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                Calculating the percentage growth from $0 to $100 is mathematically undefined because dividing by zero produces no finite scalar quotient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          7. Practical Real-World Applications
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Percentage mathematics underpins critical decision-making across numerous professional disciplines:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
            <strong className="text-slate-900 dark:text-white font-bold block">
              1. Finance, Commerce &amp; Taxation
            </strong>
            <p className="text-slate-600 dark:text-slate-400">
              Calculating compound interest yields (APY), loan interest rates (APR), VAT/GST taxes, profit margins, and discount pricing.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
            <strong className="text-slate-900 dark:text-white font-bold block">
              2. Scientific Measurement &amp; Chemistry
            </strong>
            <p className="text-slate-600 dark:text-slate-400">
              Computing mass percentages in chemical solutions, relative percent error in lab experiments, and thermal efficiency ratings.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
            <strong className="text-slate-900 dark:text-white font-bold block">
              3. Data Science &amp; Statistical Modeling
            </strong>
            <p className="text-slate-600 dark:text-slate-400">
              Analyzing demographic distributions, sample confidence intervals, conversion rates, and year-over-year KPI revenue changes.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
            <strong className="text-slate-900 dark:text-white font-bold block">
              4. Education &amp; Academic Grading
            </strong>
            <p className="text-slate-600 dark:text-slate-400">
              Weighting exam scores, computing percentile ranks, and determining course grade averages from raw rubric points.
            </p>
          </div>
        </div>
      </section>

      {/* 9. RELATED MATHEMATICAL CONCEPTS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          8. Related Mathematical Concepts
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Deepen your mathematical understanding with these closely connected analytical concepts:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <strong className="text-pink-600 dark:text-pink-400 block font-bold">Ratios &amp; Proportions</strong>
            <p className="text-slate-600 dark:text-slate-400">Comparing relative quantities (A:B) without forcing a 100-unit baseline scale.</p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <strong className="text-blue-600 dark:text-blue-400 block font-bold">Percent Error</strong>
            <p className="text-slate-600 dark:text-slate-400">Quantifying experimental discrepancy relative to theoretical exact values.</p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <strong className="text-emerald-600 dark:text-emerald-400 block font-bold">Basis Points (bps)</strong>
            <p className="text-slate-600 dark:text-slate-400">Financially granular units where 1 bps = 0.01% = 1 / 10,000.</p>
          </div>
        </div>
      </section>

      {/* 10. SUMMARY */}
      <div className="pt-8">
        <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
          <div className="flex items-center gap-2 font-bold text-blue-950 dark:text-blue-200 text-sm">
            <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            Educational Summary
          </div>
          <p className="text-xs text-blue-900 dark:text-blue-300 leading-relaxed m-0">
            A percentage is a universal mathematical tool for expressing relative proportions on a normalized base-100 scale. Whether solving linear 3-way equations (P × V₁ = V₂), evaluating directional growth changes, or comparing symmetric differences, mastering base value selection and multiplicative decimal factors ensures precision in academic, commercial, and scientific analysis.
          </p>
        </section>
      </div>
    </article>
  );
}

export default PercentageContent;
