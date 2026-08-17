import React from "react";

export function ScientificCalculatorContent() {
  return (
    <div className="space-y-10 text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed">
      
      {/* 1. Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400  dark:border-zinc-800 pb-2">
          1. Introduction
        </h2>
        <p>
          A <strong>scientific calculator</strong> is an advanced mathematical computing tool designed to evaluate continuous, transcendental, trigonometric, logarithmic, exponential, and combinatorial functions beyond basic arithmetic.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-xl">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 text-xs uppercase tracking-wider mb-1">
              What It Does
            </h3>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              Evaluates non-linear functions, trigonometric ratios, natural & base logarithms, arbitrary roots, factorials, and angle transformations with high floating-point precision.
            </p>
          </div>
          <div className="p-3.5 bg-blue-50/50 dark:bg-blue-50/30 border border-indigo-100 dark:border-indigo-900/40 rounded-xl">
            <h3 className="font-semibold text-indigo-900 dark:text-blue-400 text-xs uppercase tracking-wider mb-1">
              Who Uses It
            </h3>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              Students, engineers, physicists, quantitative analysts, researchers, and data scientists solving algebraic, calculus, and physical system equations.
            </p>
          </div>
          <div className="p-3.5 bg-blue-50/50 dark:bg-blue-50/30 border border-emerald-100 dark:border-emerald-900/40 rounded-xl">
            <h3 className="font-semibold text-emerald-900 dark:text-blue-400 text-xs uppercase tracking-wider mb-1">
              Why It Matters
            </h3>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              Bridges discrete numeric counting and continuous mathematical modeling—essential for analyzing physical waves, growth curves, structural forces, and probabilities.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Mathematical Concept */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400  dark:border-zinc-800 pb-2">
          2. Mathematical Concept & Theoretical Foundation
        </h2>
        <p>
          Scientific computation extends elementary operations (+, −, ×, ÷) into real and complex analysis. The underlying theory relies on several core mathematical frameworks:
        </p>

        <div className="space-y-3">
          <h3 className="font-semibold text-blue-600 dark:text-blue-400">Core Definitions</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Transcendental Functions:</strong> Functions that cannot be expressed as a finite sequence of algebraic operations (e.g., sin(x), cos(x), ln(x), e<sup>x</sup>).
            </li>
            <li>
              <strong>Unit Circle Trigonometry:</strong> Defines trigonometric ratios (sin, cos, tan) on a cartesian circle x<sup>2</sup> + y<sup>2</sup> = 1 where angle &theta; maps to coordinates (x, y) = (cos &theta;, sin &theta;).
            </li>
            <li>
              <strong>Natural Exponent and Logarithm:</strong> Euler&apos;s constant e &approx; 2.718281828 serves as the unique continuous growth base where d/dx(e<sup>x</sup>) = e<sup>x</sup>. The natural logarithm ln(x) is its inverse function: ln(e<sup>x</sup>) = x.
            </li>
            <li>
              <strong>Radian vs. Degree Measures:</strong> 1 radian is the angle subtended at the center of a circle by an arc equal in length to the radius (2&pi; rad = 360&deg; &rArr; 1 rad = 180&deg;/&pi; &approx; 57.2958&deg;).
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-blue-600 dark:text-blue-400">Fundamental Principles & Identities</h3>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2 font-sans tabular-nums text-xs">
            <div>• <strong>Pythagorean Trigonometric Identity:</strong> sin²(&theta;) + cos²(&theta;) = 1</div>
            <div>• <strong>Euler&apos;s Identity:</strong> e^(i&pi;) + 1 = 0</div>
            <div>• <strong>Logarithmic Base Change:</strong> log<sub>b</sub>(x) = ln(x) / ln(b)</div>
            <div>• <strong>Inverse Exponential Rule:</strong> x<sup>y</sup> = e^(y · ln(x))  (for x &gt; 0)</div>
          </div>
        </div>
      </section>

      {/* 3. Formula Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400  dark:border-zinc-800 pb-2">
          3. Formulas & Series Expansions
        </h2>
        <p>
          Scientific functions rely on analytical definitions and infinite series representations for high-precision numerical evaluation:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wider">
              Trigonometric Taylor Series
            </h3>
            <div className="font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 space-y-1">
              <p>sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + ...</p>
              <p>cos(x) = 1 - x²/2! + x⁴/4! - x⁶/6! + ...</p>
              <p>tan(x) = sin(x) / cos(x)</p>
            </div>
            <p className="text-xs text-slate-900">Variables: x in radians. Taylor expansion converges for all real x.</p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wider">
              Exponential & Logarithmic Series
            </h3>
            <div className="font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 space-y-1">
              <p>e^x = 1 + x + x²/2! + x³/3! + ...</p>
              <p>ln(x) = &int;₁ⁿ (1/t) dt   (for x &gt; 0)</p>
              <p>log₁₀(x) = ln(x) / ln(10)</p>
            </div>
            <p className="text-xs text-slate-900">Variables: x &gt; 0 for logarithms; all real x for exponents.</p>
          </div>
        </div>

        <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
          <h3 className="font-bold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wider">
            Factorial & Power Definitions
          </h3>
          <div className="font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 space-y-1">
            <p>Factorial: n! = n × (n-1) × (n-2) × ... × 1   (where 0! = 1)</p>
            <p>General Power: x^y = e^(y · ln(x))</p>
            <p>General Root: ⁿ√x = x^(1/n)</p>
          </div>
        </div>
      </section>

      {/* 4. How the Calculation Works */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400  dark:border-zinc-800 pb-2">
          4. How the Calculation Works (Step-by-Step Algorithm)
        </h2>
        <p>
          When you execute a calculation on this scientific calculator, the underlying engine processes the input through a strict five-stage mathematical pipeline:
        </p>

        <ol className="list-decimal pl-5 space-y-3 font-medium">
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Step 1: Input Validation & Domain Check</strong>
            <p className="font-normal text-xs text-slate-900 dark:text-slate-100 mt-0.5">
              The engine checks whether the input falls within the valid domain (e.g., verifying x &gt; 0 for natural logs, |x| &le; 1 for arcsin/arccos, and integer n &ge; 0 for factorials).
            </p>
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Step 2: Angle Unit Normalization</strong>
            <p className="font-normal text-xs text-slate-900 dark:text-slate-100 mt-0.5">
              If operating in Degrees mode, input angle &theta;<sub>deg</sub> is converted to radians via &theta;<sub>rad</sub> = &theta;<sub>deg</sub> &times; (&pi; / 180) before evaluating trigonometric functions.
            </p>
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Step 3: Numerical Computation</strong>
            <p className="font-normal text-xs text-slate-900 dark:text-slate-100 mt-0.5">
              The engine evaluates the function using IEEE 754 64-bit double-precision floating-point arithmetic (supporting 53 bits of mantissa precision, or approximately 15–17 decimal digits).
            </p>
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Step 4: Output Unit Formatting</strong>
            <p className="font-normal text-xs text-slate-900 dark:text-slate-100 mt-0.5">
              For inverse trigonometric functions, the calculated angle in radians is mapped back to degrees if Degrees mode is active.
            </p>
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Step 5: Precision Rounding & Representation</strong>
            <p className="font-normal text-xs text-slate-900 dark:text-slate-100 mt-0.5">
              Results are rounded to significant figures or floating decimals while generating explicit step summary notes.
            </p>
          </li>
        </ol>
      </section>

      {/* 5. Worked Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400  dark:border-zinc-800 pb-2">
          5. Worked Examples
        </h2>
        
        {/* Basic Example */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 dark:bg-blue-950 dark:text-blue-300 rounded">
            Basic Example
          </span>
          <h3 className="font-bold text-blue-600 dark:text-blue-400">
            Evaluating Trigonometric Ratio: sin(30°)
          </h3>
          <div className="text-xs space-y-1 font-sans tabular-nums">
            <p><strong>Step 1 (Unit Conversion):</strong> Convert 30° to radians: &theta; = 30 × (&pi; / 180) = &pi; / 6 &approx; 0.52359877 rad.</p>
            <p><strong>Step 2 (Function Evaluation):</strong> Apply sine series: sin(&pi;/6) = 0.5.</p>
            <p><strong>Result:</strong> 0.5</p>
          </div>
        </div>

        {/* Intermediate Example */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-50 dark:text-blue-400 rounded">
            Intermediate Example
          </span>
          <h3 className="font-bold text-blue-600 dark:text-blue-400">
            Logarithmic Change of Base & Exponentiation: log₁₀(500) + 2⁵
          </h3>
          <div className="text-xs space-y-1 font-sans tabular-nums">
            <p><strong>Step 1 (Base-10 Log):</strong> log₁₀(500) = ln(500) / ln(10) = 6.2146081 / 2.3025851 &approx; 2.6989700.</p>
            <p><strong>Step 2 (Power Evaluation):</strong> 2⁵ = 2 × 2 × 2 × 2 × 2 = 32.</p>
            <p><strong>Step 3 (Addition):</strong> 2.6989700 + 32 = 34.6989700.</p>
            <p><strong>Result:</strong> 34.69897</p>
          </div>
        </div>

        {/* Advanced Example */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-50 dark:text-blue-400 rounded">
            Advanced Example
          </span>
          <h3 className="font-bold text-blue-600 dark:text-blue-400">
            Radioactive Decay Half-Life Equation: N(t) = N₀ · e^(-λt)
          </h3>
          <p className="text-xs text-slate-900 dark:text-slate-100">
            Problem: Initial mass N<sub>0</sub> = 100 g, remaining mass N(t) = 25 g, decay constant &lambda; = 0.05 day<sup>-1</sup>. Find time t.
          </p>
          <div className="text-xs space-y-1 font-sans tabular-nums">
            <p><strong>Step 1 (Ratio setup):</strong> N(t) / N₀ = 25 / 100 = 0.25.</p>
            <p><strong>Step 2 (Exponential equation):</strong> e^(-0.05t) = 0.25.</p>
            <p><strong>Step 3 (Take Natural Log):</strong> ln(e^(-0.05t)) = ln(0.25) &rArr; -0.05t = -1.38629436.</p>
            <p><strong>Step 4 (Solve for t):</strong> t = -1.38629436 / -0.05 = 27.725887 days.</p>
            <p><strong>Result:</strong> t &approx; 27.726 days</p>
          </div>
        </div>
      </section>

      {/* 6. Visual Understanding */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400  dark:border-zinc-800 pb-2">
          6. Visual Understanding & Reference Tables
        </h2>
        <p>
          Understanding mathematical function behaviors requires knowing their exact domains, ranges, and geometric identities.
        </p>

        {/* Function Domain & Range Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-zinc-200 dark:border-zinc-800">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Function</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Domain (Input x)</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Range (Output y)</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Asymptotes / Key Points</th>
              </tr>
            </thead>
            <tbody>
              <tr className=" dark:border-zinc-800">
                <td className="p-2 border font-sans tabular-nums">sin(x), cos(x)</td>
                <td className="p-2 border font-sans tabular-nums">(-&infin;, +&infin;)</td>
                <td className="p-2 border font-sans tabular-nums">[-1, 1]</td>
                <td className="p-2 border">Periodic (2&pi;), continuous everywhere</td>
              </tr>
              <tr className=" dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
                <td className="p-2 border font-sans tabular-nums">tan(x)</td>
                <td className="p-2 border font-sans tabular-nums">x &ne; &pi;/2 + k&pi;</td>
                <td className="p-2 border font-sans tabular-nums">(-&infin;, +&infin;)</td>
                <td className="p-2 border">Vertical asymptotes at odd multiples of &pi;/2</td>
              </tr>
              <tr className=" dark:border-zinc-800">
                <td className="p-2 border font-sans tabular-nums">arcsin(x), arccos(x)</td>
                <td className="p-2 border font-sans tabular-nums">[-1, 1]</td>
                <td className="p-2 border font-sans tabular-nums">[-&pi;/2, &pi;/2] / [0, &pi;]</td>
                <td className="p-2 border">Inverse functions bounded by principal branches</td>
              </tr>
              <tr className=" dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
                <td className="p-2 border font-sans tabular-nums">ln(x), log₁₀(x)</td>
                <td className="p-2 border font-sans tabular-nums">(0, +&infin;)</td>
                <td className="p-2 border font-sans tabular-nums">(-&infin;, +&infin;)</td>
                <td className="p-2 border">Vertical asymptote at x = 0, ln(1) = 0</td>
              </tr>
              <tr className=" dark:border-zinc-800">
                <td className="p-2 border font-sans tabular-nums">e^x</td>
                <td className="p-2 border font-sans tabular-nums">(-&infin;, +&infin;)</td>
                <td className="p-2 border font-sans tabular-nums">(0, +&infin;)</td>
                <td className="p-2 border">Horizontal asymptote at y = 0, e⁰ = 1</td>
              </tr>
              <tr className=" dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
                <td className="p-2 border font-sans tabular-nums">x! (Factorial)</td>
                <td className="p-2 border font-sans tabular-nums">Non-negative integers &#123;0, 1, 2, ...&#125;</td>
                <td className="p-2 border font-sans tabular-nums">[1, +&infin;)</td>
                <td className="p-2 border">Super-exponential growth (171! &gt; 10<sup>308</sup>)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Common Mistakes */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400  dark:border-zinc-800 pb-2">
          7. Common Mistakes & Edge Cases
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50/50 dark:bg-blue-50/30 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-blue-400 text-xs">
              1. Degree vs. Radian Misconfiguration
            </h3>
            <p className="text-xs text-zinc-700 dark:text-zinc-300">
              Evaluating sin(90) in Radians mode yields &approx; 0.89399 instead of the intended 1.0 (in Degrees). Always verify your target angle unit before executing trigonometric calculations.
            </p>
          </div>

          <div className="p-4 bg-blue-50/50 dark:bg-blue-50/30 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-blue-400 text-xs">
              2. Logarithm of Non-Positive Numbers
            </h3>
            <p className="text-xs text-zinc-700 dark:text-zinc-300">
              Attempting ln(0) or ln(-5) produces an undefined result because logarithms are only defined on the strictly positive domain (0, &infin;) in real analysis.
            </p>
          </div>

          <div className="p-4 bg-blue-50/50 dark:bg-blue-50/30 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-blue-400 text-xs">
              3. Parentheses in Exponentiation Signage
            </h3>
            <p className="text-xs text-zinc-700 dark:text-zinc-300">
              -3² = -(3²) = -9, whereas (-3)² = 9. Be explicit with negative signs when evaluating powers.
            </p>
          </div>

          <div className="p-4 bg-blue-50/50 dark:bg-blue-50/30 border border-amber-200 dark:border-amber-900/40 rounded-xl space-y-1">
            <h3 className="font-bold text-amber-900 dark:text-blue-400 text-xs">
              4. Factorial Floating-Point Limit
            </h3>
            <p className="text-xs text-zinc-700 dark:text-zinc-300">
              Standard 64-bit IEEE floating-point numbers overflow for n &gt; 170 (171! &approx; 1.74 &times; 10<sup>309</sup>, exceeding double max float).
            </p>
          </div>
        </div>
      </section>

      {/* 8. Practical Applications */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400  dark:border-zinc-800 pb-2">
          8. Practical Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">School Mathematics & Physics</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Solving right-triangle trigonometry, projectile motion trajectories, wave amplitude analysis, and calculus integration.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Electrical Engineering</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Calculating AC circuit impedance Z = R + jX, phase angles &theta; = arctan(X/R), and Fourier signal frequency decompositions.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Chemistry & Biology</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Calculating pH concentration (pH = -log₁₀[H⁺]), bacterial population growth models (N(t) = N₀ 2<sup>t/d</sup>), and enzyme kinetics.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Finance & Data Science</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Continuous compound interest (A = P e<sup>rt</sup>), log-transformations for normalizing skewed statistical distributions, and machine learning logistic activations.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Related Mathematical Concepts */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400  dark:border-zinc-800 pb-2">
          9. Related Mathematical Concepts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-1">Prerequisites</h3>
            <ul className="list-disc pl-4 text-slate-900 dark:text-slate-100 space-y-1">
              <li>Algebraic Manipulation</li>
              <li>Exponent & Power Rules</li>
              <li>Unit Circle Basics</li>
            </ul>
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-1">Advanced Topics</h3>
            <ul className="list-disc pl-4 text-slate-900 dark:text-slate-100 space-y-1">
              <li>Complex Numbers (i = &radic;-1)</li>
              <li>Euler&apos;s Formula (e<sup>ix</sup> = cos x + i sin x)</li>
              <li>Differential Equations</li>
            </ul>
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-1">Related Calculators</h3>
            <ul className="list-disc pl-4 text-slate-900 dark:text-slate-100 space-y-1">
              <li>Exponent Calculator</li>
              <li>Logarithm Calculator</li>
              <li>Triangle Calculator</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10. Summary */}
      <section className="p-4 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-xl space-y-2">
        <h2 className="text-base font-bold text-blue-900 dark:text-blue-300">
          10. Educational Summary
        </h2>
        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
          The scientific calculator expands standard arithmetic into continuous mathematics. By combining unit circle trigonometry, Taylor series expansions, logarithms, and power laws, users can model physical phenomena, evaluate analytical functions, and solve continuous equations with mathematical rigor.
        </p>
      </section>

    </div>
  );
}

export default ScientificCalculatorContent;
