"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calculator,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Info,
  ExternalLink,
  Layers,
  Divide,
  Sigma,
  Workflow
} from "lucide-react";
import { log_calculatorFaqs } from "@/app/calculators/log-calculator/faq";

export function LogContent() {
  // FAQs unfolded by default with accordion toggles
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    log_calculatorFaqs.forEach((_, idx) => {
      initial[idx] = true;
    });
    return initial;
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Structured Data (JSON-LD FAQPage)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: log_calculatorFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 leading-relaxed font-sans max-w-7xl mx-auto pt-4">
      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ========================================================================= */}
      {/* RELATED CALCULATORS MID-BAR (401k STYLE - BETWEEN CALCULATOR & CONTENT) */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Related Mathematical &amp; Calculation Tools
            </span>
          </div>
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            Algebra &amp; Scientific Suite
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Link
            href="/calculators/exponent-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors block">
                Exponent Calculator
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Evaluate integer, fractional &amp; negative powers with exponent laws.
              </p>
            </div>
            <div className="mt-2.5 text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 text-[11px]">
              <span>Calculate Powers</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            href="/calculators/scientific-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors block">
                Scientific Calculator
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Trigonometric, logarithmic &amp; advanced exponential expressions.
              </p>
            </div>
            <div className="mt-2.5 text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 text-[11px]">
              <span>Scientific Suite</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            href="/calculators/root-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors block">
                Root Calculator &amp; Radical Simplifier
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Square roots, cube roots &amp; nth radical simplifications with steps.
              </p>
            </div>
            <div className="mt-2.5 text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 text-[11px]">
              <span>Simplify Roots</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            href="/calculators/scientific-notation-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors block">
                Scientific Notation Calculator
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Convert standard decimal numbers to scientific, engineering &amp; power of 10.
              </p>
            </div>
            <div className="mt-2.5 text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 text-[11px]">
              <span>Notation Tools</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO INTRODUCTION */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Log Calculator
        </h1>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          Logarithms are the inverse operation of exponentiation. A logarithm answers the question: &quot;What exponent must a base be raised to in order to produce a given number?&quot;
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          This Log Calculator evaluates logarithms with custom bases as well as natural, common and binary logarithms. It can also calculate antilogarithms, solve logarithmic equations for different variables, demonstrate the change-of-base formula, and show the calculation step by step.
        </p>

        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 text-blue-800 dark:text-blue-300 font-mono text-sm sm:text-base font-bold text-center">
          {"log_b(x) = y  ⇔  b^y = x  (for b > 0, b ≠ 1, x > 0)"}
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          For a real logarithm <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">log_b(x) = y</code>, the equivalent exponential statement is <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">b^y = x</code>. The calculator uses this fundamental relationship throughout its logarithm, antilogarithm and three-variable solving tools.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: WHAT IS A LOGARITHM? */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          What Is a Logarithm?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A logarithm is the inverse of an exponential operation. The statement <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">log_b(x) = y</code> means exactly the same thing as:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-sm font-bold text-slate-900 dark:text-slate-100">
          b^y = x
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Here <em>b</em> is the base, <em>x</em> is the argument, and <em>y</em> is the logarithm. For example, <code className="font-mono text-xs">log_2(8) = 3</code> because <code className="font-mono text-xs">2^3 = 8</code>. Similarly, <code className="font-mono text-xs">log_10(100) = 2</code> because <code className="font-mono text-xs">10^2 = 100</code>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Thinking of a logarithm as &quot;the exponent required to produce a number&quot; makes the connection between logarithms and exponential equations much easier to understand.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: HOW TO USE THIS LOG CALCULATOR */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          How to Use This Log Calculator
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Enter the logarithm base and the argument in the main logarithm calculator. For <code className="font-mono text-xs">log_b(x)</code>, enter:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300 pl-2">
          <li><strong>Base</strong> = <em>b</em> (any positive real number other than 1)</li>
          <li><strong>Argument</strong> = <em>x</em> (any strictly positive real number)</li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator then provides:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-blue-600 block mb-1">Evaluated Logarithm Result</span>
            <span>High-precision output formatted to 10 decimal places and scientific notation.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-blue-600 block mb-1">Natural, Common &amp; Binary Logs</span>
            <span>Automatic multi-base conversion showing ln(x), log₁₀(x) and log₂(x) simultaneously.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-blue-600 block mb-1">Synchronized 2D Log Curve</span>
            <span>Interactive graph displaying asymptote x=0, root (1,0), base point (b,1) and active argument point.</span>
          </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The other sections handle inverse and equation-solving tasks. Use the <strong>Antilogarithm &amp; Exponential Solver</strong> when you know a base and exponent and want to calculate the resulting value. Use the <strong>3-Variable Logarithm Equation Solver</strong> when the relationship is <code className="font-mono text-xs">log_b(x) = y</code> and you want to solve for <em>y</em>, <em>x</em>, or <em>b</em>.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: LOGARITHM DOMAIN */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Logarithm Domain: Which Values Are Allowed?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For a real logarithm <code className="font-mono text-xs">log_b(x)</code>, the standard domain conditions are:
        </p>
        <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono font-bold">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-900/60">b &gt; 0</div>
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-900/60">b ≠ 1</div>
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-900/60">x &gt; 0</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          These restrictions are part of the definition of a real logarithm. The argument <em>x</em> must be positive. A logarithm of zero is undefined in the real numbers, and a logarithm of a negative argument is not a real-valued logarithm. The base must also be positive and cannot equal 1. If the base were 1, then <code className="font-mono text-xs">1^y</code> would always equal 1, so it could not uniquely produce arbitrary positive arguments.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator validates these domain conditions rather than silently forcing invalid inputs into a numerical formula.
        </p>

        {/* TABLE 2: DOMAIN TABLE */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3 font-bold">Quantity</th>
                <th className="p-3 font-bold">Requirement</th>
                <th className="p-3 font-bold">Mathematical Justification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-slate-800 dark:text-slate-200">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-3 font-bold">Base b</td>
                <td className="p-3 text-blue-600 dark:text-blue-400">b &gt; 0</td>
                <td className="p-3 font-sans">Standard real logarithm; negative bases cannot sustain arbitrary real powers without complex numbers.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-3 font-bold">Base b</td>
                <td className="p-3 text-blue-600 dark:text-blue-400">b ≠ 1</td>
                <td className="p-3 font-sans">Base 1 cannot uniquely generate x, because 1ʸ = 1 for all real exponents y.</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-3 font-bold">Argument x</td>
                <td className="p-3 text-blue-600 dark:text-blue-400">x &gt; 0</td>
                <td className="p-3 font-sans">Real logarithm domain; raising a positive base to any real exponent always yields a positive result.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: CALCULATE A LOGARITHM WITH ANY BASE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Calculate a Logarithm With Any Base
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A logarithm does not have to use base 10 or base <em>e</em>. For example, <code className="font-mono text-xs">log_5(125) = 3</code> because <code className="font-mono text-xs">5^3 = 125</code>. You can also evaluate <code className="font-mono text-xs">log_3(81) = 4</code> and <code className="font-mono text-xs">log_2(64) = 6</code>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The ability to enter a custom base is one of the main advantages of this calculator over a standard calculator that may expose only ln and log buttons.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: CHANGE OF BASE FORMULA */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Change of Base Formula
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          When a calculator does not directly provide log base <em>b</em>, the change-of-base formula converts it into a quotient of logarithms that are easier to evaluate. The formula is:
        </p>
        <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50 font-mono text-center text-sm font-bold text-blue-800 dark:text-blue-300">
          {"log_b(x) = \\frac{\\ln(x)}{\\ln(b)} = \\frac{\\log_{10}(x)}{\\log_{10}(b)}"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          It can also be written with any common reference base where the same base is used in the numerator and denominator. For example, <code className="font-mono text-xs">log_5(36)</code> can be evaluated as <code className="font-mono text-xs">ln(36) / ln(5) ≈ 3.583519 / 1.609438 ≈ 2.2266</code>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator uses this relationship for arbitrary-base logarithms and shows the intermediate natural-log calculations in its step-by-step derivation.
        </p>

        {/* EDUCATIONAL SVG DIAGRAM: FROM LOGARITHM TO EXPONENTIAL FORM */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Educational Diagram: From Logarithm to Exponential Form
            </span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex justify-center">
            <svg
              viewBox="0 0 600 240"
              className="w-full max-w-xl h-auto text-xs font-sans"
              role="img"
              aria-label="Flowchart demonstrating transformation between logarithmic form log_b(x)=y, exponential form b^y=x, and change of base ln(x)/ln(b)."
            >
              {/* Box 1: Logarithm Form */}
              <rect x="20" y="20" width="160" height="50" rx="10" fill="#2563eb" />
              <text x="100" y="42" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="12">
                log_b(x) = y
              </text>
              <text x="100" y="58" fill="#dbeafe" textAnchor="middle" fontSize="10">
                Logarithmic Form
              </text>

              {/* Arrow Down: Definition */}
              <line x1="100" y1="70" x2="100" y2="110" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="110" y="95" fill="#64748b" fontSize="9" fontWeight="bold">
                Definition
              </text>

              {/* Box 2: Exponential Form */}
              <rect x="20" y="110" width="160" height="50" rx="10" fill="#10b981" />
              <text x="100" y="132" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="12">
                b^y = x
              </text>
              <text x="100" y="148" fill="#d1fae5" textAnchor="middle" fontSize="10">
                Exponential Power Form
              </text>

              {/* Arrow Right to 3-Variable Solver */}
              <line x1="180" y1="135" x2="260" y2="135" stroke="#10b981" strokeWidth="2" />
              <text x="220" y="125" fill="#64748b" textAnchor="middle" fontSize="9" fontWeight="bold">
                Choose Target
              </text>

              {/* 3 Outcome Branches */}
              <rect x="260" y="90" width="140" height="30" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
              <text x="330" y="110" fill="#0f172a" textAnchor="middle" fontSize="10" fontWeight="bold">
                Solve for y = log_b(x)
              </text>

              <rect x="260" y="130" width="140" height="30" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
              <text x="330" y="150" fill="#0f172a" textAnchor="middle" fontSize="10" fontWeight="bold">
                Solve for x = b^y
              </text>

              <rect x="260" y="170" width="140" height="30" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
              <text x="330" y="190" fill="#0f172a" textAnchor="middle" fontSize="10" fontWeight="bold">
                Solve for b = x^(1/y)
              </text>

              {/* Side Branch: Change of Base */}
              <line x1="180" y1="45" x2="440" y2="45" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 3" />
              <rect x="440" y="20" width="140" height="50" rx="10" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="510" y="42" fill="#1e293b" textAnchor="middle" fontWeight="bold" fontSize="11">
                ln(x) / ln(b)
              </text>
              <text x="510" y="58" fill="#64748b" textAnchor="middle" fontSize="9">
                Change-of-Base Quotient
              </text>

              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="text-xs text-slate-500 text-center italic">
            &quot;Logarithms and exponentials describe the same relationship from opposite directions.&quot;
          </p>
        </div>

        {/* MID-CONTENT INTERNAL LINK #1 */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Working with powers and exponential rules?</span>
            <p className="text-slate-600 dark:text-slate-400 mt-0.5">
              When your problem involves powers or exponent rules rather than logarithms, the{" "}
              <Link href="/calculators/exponent-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Exponent Calculator
              </Link>{" "}
              provides a dedicated workflow for evaluating powers, fractional exponents and exponent laws.
            </p>
          </div>
          <Link
            href="/calculators/exponent-calculator"
            className="shrink-0 ml-4 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs transition-colors"
          >
            Exponent Calculator
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: WORKED EXAMPLES */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Worked Example: log₁₀(100)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Consider <code className="font-mono text-xs">log_10(100)</code>. The logarithmic definition tells us that <code className="font-mono text-xs">10^y = 100</code>. Since <code className="font-mono text-xs">10^2 = 100</code>, the result is:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-sm font-bold text-slate-900 dark:text-slate-100">
          log_10(100) = 2
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator also verifies this using change of base:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-medium text-slate-900 dark:text-slate-100">
          log_10(100) = ln(100) / ln(10) ≈ 4.605170186 / 2.302585093 = 2
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The final step converts the logarithmic answer back to exponential form: <code className="font-mono text-xs">10^2 = 100</code>. This is a useful check because logarithms and exponentials are inverse operations.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-4">
          Worked Example: log₁₀₄₉(105)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A custom base does not have to be a familiar value such as 2, 10 or <em>e</em>. Consider:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-bold text-slate-900 dark:text-slate-100">
          log_1049(105) = ln(105) / ln(1049) ≈ 4.653960350 / 6.955592608 ≈ 0.6690961665
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Therefore, <code className="font-mono text-xs">log_1049(105) ≈ 0.6690961665</code>. The calculator&apos;s interactive graph uses the same active base and marks the current argument point, so the visualization remains connected to the calculation rather than displaying a fixed demonstration curve.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: LOG TYPES TABLE & DESCRIPTIONS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Natural Logarithm ln(x)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The natural logarithm is the logarithm with base <em>e</em>: <code className="font-mono text-xs">ln(x) = log_e(x)</code>, where Euler&apos;s constant <code className="font-mono text-xs">e ≈ 2.718281828459...</code> Examples include <code className="font-mono text-xs">ln(1) = 0</code>, <code className="font-mono text-xs">ln(e) = 1</code>, and <code className="font-mono text-xs">ln(e^2) = 2</code>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Natural logarithms are especially common in calculus, differential equations, continuous growth and decay, and scientific models involving exponential functions. The calculator reports <code className="font-mono text-xs">ln(x)</code> alongside arbitrary-base logarithms so that you can compare different logarithmic representations of the same argument.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Common Logarithm log₁₀(x)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The common logarithm uses base 10: <code className="font-mono text-xs">log_10(x)</code>. Examples: <code className="font-mono text-xs">log_10(10) = 1</code>, <code className="font-mono text-xs">log_10(100) = 2</code>, <code className="font-mono text-xs">log_10(1000) = 3</code>, and <code className="font-mono text-xs">log_10(0.01) = -2</code>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The last example illustrates an important point: a logarithm can be negative even though its argument is positive. A negative logarithm means the argument lies between 0 and 1 when the base is greater than 1.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Binary Logarithm log₂(x)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The binary logarithm uses base 2: <code className="font-mono text-xs">log_2(x)</code>. It appears frequently in computer science, information theory and algorithms. Examples include <code className="font-mono text-xs">log_2(2) = 1</code>, <code className="font-mono text-xs">log_2(8) = 3</code>, <code className="font-mono text-xs">log_2(64) = 6</code>, and <code className="font-mono text-xs">log_2(1024) = 10</code>. Binary logarithms are especially useful when quantities grow or shrink by factors of two.
        </p>

        {/* TABLE 1: LOG TYPES TABLE */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3 font-bold">Type</th>
                <th className="p-3 font-bold text-right">Base</th>
                <th className="p-3 font-bold">Common Use</th>
                <th className="p-3 font-bold">Canonical Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-slate-800 dark:text-slate-200">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-3 font-bold font-sans">Common log</td>
                <td className="p-3 text-right">10</td>
                <td className="p-3 font-sans">General / scientific notation contexts &amp; engineering magnitude</td>
                <td className="p-3 text-blue-600 dark:text-blue-400">log₁₀(100) = 2</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-3 font-bold font-sans">Natural log</td>
                <td className="p-3 text-right">e ≈ 2.718</td>
                <td className="p-3 font-sans">Calculus, continuous models, physics &amp; differential equations</td>
                <td className="p-3 text-blue-600 dark:text-blue-400">ln(e²) = 2</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-3 font-bold font-sans">Binary log</td>
                <td className="p-3 text-right">2</td>
                <td className="p-3 font-sans">Computing, binary search trees, bit depth &amp; information theory</td>
                <td className="p-3 text-blue-600 dark:text-blue-400">log₂(64) = 6</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-3 font-bold font-sans">Custom-base log</td>
                <td className="p-3 text-right">b</td>
                <td className="p-3 font-sans">General logarithmic calculations &amp; arbitrary base change proofs</td>
                <td className="p-3 text-blue-600 dark:text-blue-400">log₅(125) = 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: NEGATIVE LOGARITHM RESULTS & ANTILOG */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Negative Logarithm Results
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A logarithm can be negative without being invalid. For a base greater than 1, <code className="font-mono text-xs">log_b(x) &lt; 0</code> whenever <code className="font-mono text-xs">0 &lt; x &lt; 1</code>. For example, <code className="font-mono text-xs">log_10(0.01) = -2</code> because <code className="font-mono text-xs">10^-2 = 0.01</code>. The sign of the logarithm therefore depends on the argument relative to 1 and the base being used.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Antilogarithm: The Inverse of a Logarithm
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          An antilogarithm reverses a logarithm. If <code className="font-mono text-xs">log_b(x) = y</code>, then <code className="font-mono text-xs">x = b^y</code>. Therefore, <code className="font-mono text-xs">antilog_b(y) = b^y</code>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For example, <code className="font-mono text-xs">antilog_10(2) = 10^2 = 100</code>. The calculator&apos;s Antilogarithm &amp; Exponential Solver performs this inverse calculation and also shows the exponential relationship used to obtain the result.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Antilog Example
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Suppose <code className="font-mono text-xs">y = 2</code> and <code className="font-mono text-xs">b = 10</code>. Then <code className="font-mono text-xs">antilog_10(2) = 10^2 = 100</code>. We can verify the answer with a logarithm: <code className="font-mono text-xs">log_10(100) = 2</code>. This inverse relationship is one of the most important connections between logarithms and exponentials.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: THREE-VARIABLE LOGARITHM EQUATION SOLVER */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Three-Variable Logarithm Equation Solver
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The equation <code className="font-mono text-xs">log_b(x) = y</code> can be rewritten as <code className="font-mono text-xs">b^y = x</code>. This means any one of the three quantities can be solved when the other two are known. The calculator provides three target modes:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Solve for y</h3>
            <p className="text-slate-600 dark:text-slate-400">Given base <em>b</em> and argument <em>x</em>, evaluate <code className="font-mono">y = log_b(x)</code>. Example: log₂(64) = 6.</p>
          </div>
          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Solve for x</h3>
            <p className="text-slate-600 dark:text-slate-400">Given base <em>b</em> and exponent <em>y</em>, evaluate <code className="font-mono">x = b^y</code>. Example: 2⁶ = 64.</p>
          </div>
          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Solve for b</h3>
            <p className="text-slate-600 dark:text-slate-400">Given argument <em>x</em> and exponent <em>y</em>, solve <code className="font-mono">b = x^(1/y)</code> when real roots exist.</p>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Three-Variable Example: Solve for y
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Given <code className="font-mono text-xs">b = 2</code> and <code className="font-mono text-xs">x = 64</code>, we have <code className="font-mono text-xs">log_2(64) = y</code>. Since <code className="font-mono text-xs">2^6 = 64</code>, the answer is <code className="font-mono text-xs">y = 6</code>. The calculator verifies the result by converting the logarithmic equation back into exponential form.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Three-Variable Example: Solve for x
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Given <code className="font-mono text-xs">b = 2</code> and <code className="font-mono text-xs">y = 6</code>, start with <code className="font-mono text-xs">log_2(x) = 6</code>. Convert to exponential form: <code className="font-mono text-xs">x = 2^6 = 64</code>. The calculator displays this relationship as part of its step-by-step equation solution.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Three-Variable Example: Solve for b
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Given <code className="font-mono text-xs">x = 64</code> and <code className="font-mono text-xs">y = 6</code>, we have <code className="font-mono text-xs">b^6 = 64</code>. Taking the sixth root gives <code className="font-mono text-xs">b = 64^(1/6) = 2</code>. The result can be checked by substitution: <code className="font-mono text-xs">2^6 = 64</code>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For negative arguments and odd integer exponents, a negative real base can also be mathematically valid. For example, <code className="font-mono text-xs">b^3 = -8</code> gives <code className="font-mono text-xs">b = -2</code>. The calculator distinguishes valid real-domain cases from cases with no real solution.
        </p>

        {/* MID-CONTENT INTERNAL LINK #2 */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Directly evaluating fractional powers and exponent laws?</span>
            <p className="text-slate-600 dark:text-slate-400 mt-0.5">
              When the main task is evaluating a power or fractional exponent rather than solving a logarithmic equation, use the{" "}
              <Link href="/calculators/exponent-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Exponent Calculator
              </Link>{" "}
              for the direct exponentiation workflow.
            </p>
          </div>
          <Link
            href="/calculators/exponent-calculator"
            className="shrink-0 ml-4 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs transition-colors"
          >
            Exponent Calculator
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11: THE LOGARITHMIC CURVE & GRAPH */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          The Logarithmic Curve
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The graph of <code className="font-mono text-xs">y = log_b(x)</code> provides a visual interpretation of the logarithm. For a valid real base <code className="font-mono text-xs">b &gt; 0</code> and <code className="font-mono text-xs">b ≠ 1</code>, the graph has several important characteristics:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300 pl-2">
          <li><strong>Domain:</strong> Strictly positive real numbers <code className="font-mono text-xs">x &gt; 0</code>.</li>
          <li><strong>Range:</strong> All real numbers <code className="font-mono text-xs">(-∞, +∞)</code>.</li>
          <li><strong>Vertical Asymptote:</strong> The y-axis line <code className="font-mono text-xs">x = 0</code>.</li>
          <li><strong>Universal x-Intercept:</strong> The point <code className="font-mono text-xs">(1, 0)</code>.</li>
          <li><strong>Base Key Point:</strong> The point <code className="font-mono text-xs">(b, 1)</code>.</li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          When <code className="font-mono text-xs">b &gt; 1</code>, the logarithmic curve is strictly increasing. When <code className="font-mono text-xs">0 &lt; b &lt; 1</code>, the curve is strictly decreasing. The calculator&apos;s graph updates its base dynamically rather than remaining a fixed base-2 illustration.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          How the Base Slider Changes the Graph
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The base determines the shape and direction of a logarithmic curve. For <code className="font-mono text-xs">b = 2</code>, the graph passes through <code className="font-mono text-xs">(1, 0)</code> and <code className="font-mono text-xs">(2, 1)</code>. For <code className="font-mono text-xs">b = 10</code>, the corresponding base point becomes <code className="font-mono text-xs">(10, 1)</code>. For <code className="font-mono text-xs">0 &lt; b &lt; 1</code>, the curve is decreasing instead of increasing.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator&apos;s base slider is synchronized with the active logarithm. Moving the slider changes the graph&apos;s base, while valid changes to the main base input update the graph as well. This synchronization is important because a graph showing <code className="font-mono text-xs">log_2(x)</code> while the calculation uses another base would be mathematically misleading.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          The Active Argument Point
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          In addition to the universal point <code className="font-mono text-xs">(1, 0)</code> and the base point <code className="font-mono text-xs">(b, 1)</code>, the calculator can display the current calculation point. If <code className="font-mono text-xs">y = log_b(x)</code>, then the point is <code className="font-mono text-xs">(x, y)</code>. For example, with <code className="font-mono text-xs">b = 1049</code> and <code className="font-mono text-xs">x = 105</code>, the point is approximately <code className="font-mono text-xs">(105, 0.6691)</code>. This connects the numerical result directly to the plotted logarithmic curve.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Why x = 0 Is a Vertical Asymptote
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The logarithmic function is defined only for positive arguments. As <em>x</em> approaches zero from the positive side, the logarithm decreases without bound when <code className="font-mono text-xs">b &gt; 1</code>. Therefore, <code className="font-mono text-xs">x = 0</code> acts as a vertical asymptote. The graph does not cross the y-axis because zero is outside the domain of the real logarithm.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12: LOGARITHMIC PROPERTIES & RULES */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Logarithmic Properties
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For appropriate positive real arguments and valid base <em>b</em>, logarithms obey several important algebraic properties:
        </p>
        <div className="space-y-2 text-xs font-mono font-medium">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="font-bold font-sans">Product rule:</span>
            <span>{"log_b(xy) = log_b(x) + log_b(y)"}</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="font-bold font-sans">Quotient rule:</span>
            <span>{"log_b(x/y) = log_b(x) - log_b(y)"}</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="font-bold font-sans">Power rule:</span>
            <span>{"log_b(x^k) = k \\cdot log_b(x)"}</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="font-bold font-sans">Base identity:</span>
            <span>{"log_b(b) = 1"}</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="font-bold font-sans">Zero-value identity:</span>
            <span>{"log_b(1) = 0"}</span>
          </div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          These rules make it possible to expand products, condense logarithmic expressions and solve equations more efficiently. The domain requirements still apply. For real logarithms, the arguments of the individual logarithms must be positive.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
          Product Rule Example
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Consider <code className="font-mono text-xs">log_10(10 × 100)</code>. Using the product rule: <code className="font-mono text-xs">log_10(10 × 100) = log_10(10) + log_10(100) = 1 + 2 = 3</code>. Since <code className="font-mono text-xs">10 × 100 = 1000</code>, we can verify <code className="font-mono text-xs">log_10(1000) = 3</code>.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
          Quotient Rule Example
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Consider <code className="font-mono text-xs">log_10(1000/10)</code>. Using the quotient rule: <code className="font-mono text-xs">log_10(1000/10) = log_10(1000) - log_10(10) = 3 - 1 = 2</code>. And <code className="font-mono text-xs">1000/10 = 100</code>, so <code className="font-mono text-xs">log_10(100) = 2</code>.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
          Power Rule Example
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For <code className="font-mono text-xs">log_b(x^k)</code>, the power can move in front: <code className="font-mono text-xs">log_b(x^k) = k log_b(x)</code>. For example: <code className="font-mono text-xs">log_10(100²) = 2 log_10(100) = 2 × 2 = 4</code>, which agrees with <code className="font-mono text-xs">10^4 = 10000</code>.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 13: LOGARITHM VS NATURAL LOG VS BINARY LOG */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Logarithm vs Natural Log vs Binary Log
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          &quot;Logarithm&quot; describes the general operation, while the notation often identifies a particular base. Common logarithm: <code className="font-mono text-xs">log_10(x)</code>. Natural logarithm: <code className="font-mono text-xs">ln(x) = log_e(x)</code>. Binary logarithm: <code className="font-mono text-xs">log_2(x)</code>.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The base changes the numerical value of the logarithm, but all three functions share the same inverse relationship with their corresponding exponential functions. For example: <code className="font-mono text-xs">log_10(100) = 2</code>, <code className="font-mono text-xs">ln(e²) = 2</code>, and <code className="font-mono text-xs">log_2(64) = 6</code>.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 14: MATHEMATICAL EDGE CASES & REASONS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Why Is log(1) Always Zero?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For any valid logarithm base, <code className="font-mono text-xs">log_b(1) = 0</code> because <code className="font-mono text-xs">b^0 = 1</code>. Therefore the logarithm of 1 is zero for every base satisfying <code className="font-mono text-xs">b &gt; 0</code> and <code className="font-mono text-xs">b ≠ 1</code>. The graph of every parent logarithmic function therefore passes through <code className="font-mono text-xs">(1, 0)</code>.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Can a Logarithm Be Negative?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Yes. For a base greater than 1, arguments between 0 and 1 produce negative logarithms. For example, <code className="font-mono text-xs">log_10(0.1) = -1</code> because <code className="font-mono text-xs">10^-1 = 0.1</code>, and <code className="font-mono text-xs">log_10(0.01) = -2</code> because <code className="font-mono text-xs">10^-2 = 0.01</code>. A negative result does not mean that the argument was invalid.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Why Can&apos;t the Base Be 1?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A logarithm requires <code className="font-mono text-xs">b &gt; 0</code> and <code className="font-mono text-xs">b ≠ 1</code>. The reason 1 is excluded is that <code className="font-mono text-xs">1^y = 1</code> for every real <em>y</em>. Therefore, the equation <code className="font-mono text-xs">1^y = x</code> cannot uniquely produce arbitrary positive values of <em>x</em>. A logarithm therefore cannot use 1 as its base.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Why Can&apos;t a Real Logarithm Have a Negative Base?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          In the real-number definition of a logarithm, the base must be positive. The exponential function <code className="font-mono text-xs">b^y</code> with a positive base is defined for every real <em>y</em> and produces positive outputs. A negative base does not have a corresponding real-valued exponential function for every real exponent, so it is excluded from the standard real logarithm definition. The calculator therefore rejects negative logarithm bases in its real-domain logarithm calculation.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Why Is the Logarithm of Zero Undefined?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          There is no real number <em>y</em> satisfying <code className="font-mono text-xs">b^y = 0</code> when <code className="font-mono text-xs">b &gt; 0</code>. A positive base raised to any finite real power remains strictly positive. Therefore, <code className="font-mono text-xs">log_b(0)</code> is undefined in the real numbers. Graphically, this is connected to the vertical asymptote <code className="font-mono text-xs">x = 0</code>.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Why Is the Logarithm of a Negative Number Undefined in Real Numbers?
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          For a real logarithm, <code className="font-mono text-xs">b^y = x</code> with positive base <em>b</em> produces a positive result. Therefore it cannot produce a negative <em>x</em>. For example, <code className="font-mono text-xs">log_2(-8)</code> has no real-valued result. The calculator identifies this as a real-domain error instead of silently returning an incorrect numerical value.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 15: LOGARITHMS AS INVERSE FUNCTIONS & SOLVING EQUATIONS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Logarithms as Inverse Functions
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The exponential function <code className="font-mono text-xs">y = b^x</code> and logarithmic function <code className="font-mono text-xs">y = log_b(x)</code> are inverse functions for valid bases. This means:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-bold text-slate-900 dark:text-slate-100">
          log_b(b^x) = x  and  b^(log_b(x)) = x
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          within their respective domains. Their graphs are reflections across <code className="font-mono text-xs">y = x</code> when the corresponding functions are plotted together. This inverse relationship explains why logarithms are useful for solving equations in which the unknown appears in an exponent.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Solving Exponential Equations With Logarithms
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Suppose <code className="font-mono text-xs">2^x = 20</code>. Because 20 is not an obvious power of 2, logarithms can isolate <em>x</em>. Take logarithms: <code className="font-mono text-xs">log(2^x) = log(20)</code>. Apply the power rule: <code className="font-mono text-xs">x · log(2) = log(20)</code>. Therefore:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-bold text-slate-900 dark:text-slate-100">
          x = log(20) / log(2) = ln(20) / ln(2) ≈ 4.321928095
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The same result can be obtained using natural logarithms. This is the main reason logarithms are important for solving exponential equations.
        </p>

        {/* MID-CONTENT INTERNAL LINK #3 */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Checking complex numerical multi-step calculations?</span>
            <p className="text-slate-600 dark:text-slate-400 mt-0.5">
              When a logarithm is being used to isolate an exponent, a dedicated{" "}
              <Link href="/calculators/scientific-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Scientific Calculator
              </Link>{" "}
              can also be useful for checking the resulting numerical expression and trigonometric ratios.
            </p>
          </div>
          <Link
            href="/calculators/scientific-calculator"
            className="shrink-0 ml-4 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs transition-colors"
          >
            Scientific Calculator
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 16: POWERS OF TEN & SCIENTIFIC NOTATION */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Powers of Ten and Scientific Notation
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Logarithms are closely connected to powers of ten. For example, <code className="font-mono text-xs">log_10(1000) = 3</code> because <code className="font-mono text-xs">10^3 = 1000</code>. Scientific notation uses this same power-of-ten structure to represent very large and very small numbers. For example, <code className="font-mono text-xs">5,400,000 = 5.4 × 10^6</code> and <code className="font-mono text-xs">0.0000054 = 5.4 × 10^-6</code>. A logarithm can therefore be interpreted as a way of measuring the exponent associated with a particular base.
        </p>

        {/* MID-CONTENT INTERNAL LINK #4 */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Converting large numbers to scientific and engineering notation?</span>
            <p className="text-slate-600 dark:text-slate-400 mt-0.5">
              Explore the{" "}
              <Link href="/calculators/scientific-notation-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Scientific Notation Calculator &amp; Converter
              </Link>{" "}
              for direct base-10 exponential form and engineering scale formatting.
            </p>
          </div>
          <Link
            href="/calculators/scientific-notation-calculator"
            className="shrink-0 ml-4 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs transition-colors"
          >
            Notation Calculator
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 17: REAL-WORLD APPLICATIONS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Logarithms in Real-World Applications
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Logarithmic relationships appear whenever quantities span a wide range or change multiplicatively rather than additively.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-normal">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Sound Levels (Decibels)</h3>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              Decibel formulas use logarithms to express ratios of physical quantities over a convenient scale. For power or intensity ratios, a common form is <code className="font-mono">L = 10 log₁₀(P/P₀)</code>. The exact formula depends on the physical quantity being measured, so power, intensity and pressure-amplitude formulas should not be mixed.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Chemistry (pH Scale)</h3>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              pH is logarithmically related to hydrogen-ion activity, commonly represented in introductory contexts by <code className="font-mono">pH = -log₁₀[H⁺]</code>. This means a change of one pH unit corresponds to a tenfold change in the hydrogen-ion concentration under the simplified concentration relationship.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Computing &amp; Algorithm Analysis</h3>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              Binary logarithms appear naturally in algorithms such as binary search: <code className="font-mono">O(log₂ n)</code>. The logarithm base does not change the asymptotic Big-O class because changing the logarithm base only introduces a constant multiplying factor.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Scientific Measurement</h3>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              Logarithmic scales can make extremely large or small ratios easier to describe and compare. The important point is that the logarithmic formula must match the physical quantity and measurement convention being used.
            </p>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Logarithms and Earthquake Magnitude
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Earthquake magnitude scales are logarithmic, but different magnitude measures and physical quantities do not all use the same numerical relationship. For this reason, statements such as &quot;one magnitude unit means X times more energy&quot; should always identify what physical quantity and magnitude scale are being discussed.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A logarithmic scale generally means that equal changes in the reported magnitude correspond to multiplicative changes in the underlying measured quantity. Do not interpret a logarithmic scale as though each unit were a fixed additive increase in the physical quantity.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 18: COMMON MISTAKES */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Common Mistakes When Using Logarithms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Forgetting the base</span>
            <span className="text-slate-600 dark:text-slate-400">log₂(8) = 3 and log₁₀(8) ≈ 0.903 are completely different values. Always check the base.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Using zero as an argument</span>
            <span className="text-slate-600 dark:text-slate-400">log_b(0) is undefined in real numbers. The curve approaches -∞ as x → 0⁺.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Using a negative argument</span>
            <span className="text-slate-600 dark:text-slate-400">log_b(-x) is not a real logarithm because bʸ &gt; 0 for all real exponents y.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Using base 1</span>
            <span className="text-slate-600 dark:text-slate-400">log₁(x) is undefined because 1ʸ = 1 for all y, so base 1 cannot generate other numbers.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Using a negative base</span>
            <span className="text-slate-600 dark:text-slate-400">Negative bases are outside the standard real logarithm definition to avoid complex outputs.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Confusing log and ln</span>
            <span className="text-slate-600 dark:text-slate-400">In common mathematical usage, log denotes base 10 while ln denotes base e (Euler&apos;s number).</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 19: VERIFICATION, EXACT VS DECIMAL & SEVEN FACTS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          How to Check a Logarithm Result
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The simplest verification is to return to exponential form. If <code className="font-mono text-xs">log_b(x) = y</code>, then check <code className="font-mono text-xs">b^y = x</code>.
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300 pl-2">
          <li>For <code className="font-mono text-xs">log_2(64) = 6</code>: check <code className="font-mono text-xs">2^6 = 64</code>.</li>
          <li>For <code className="font-mono text-xs">log_10(0.01) = -2</code>: check <code className="font-mono text-xs">10^-2 = 0.01</code>.</li>
          <li>For <code className="font-mono text-xs">log_1049(105) ≈ 0.6690961665</code>: check <code className="font-mono text-xs">1049^0.6690961665 ≈ 105</code>.</li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator also performs this kind of exponential-form verification in its step-by-step derivation.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Exact Values vs Decimal Approximations
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Some logarithms have simple exact values like <code className="font-mono text-xs">log_2(64) = 6</code> and <code className="font-mono text-xs">log_10(100) = 2</code>. But many logarithms are irrational numbers and must be represented numerically, such as <code className="font-mono text-xs">log_2(10) ≈ 3.32192809489</code>. A displayed decimal is therefore an approximation of the exact mathematical quantity. The calculator retains higher precision internally and formats the displayed result for readability.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Seven Useful Logarithm Facts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-mono">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-blue-600 block mb-0.5">1. log_b(1) = 0</span>
            <span className="font-sans text-slate-600 dark:text-slate-400 text-[11px]">Any base raised to zero equals 1.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-blue-600 block mb-0.5">2. log_b(b) = 1</span>
            <span className="font-sans text-slate-600 dark:text-slate-400 text-[11px]">Any base raised to power 1 equals itself.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-blue-600 block mb-0.5">3. log_b(xy) = log_b(x) + log_b(y)</span>
            <span className="font-sans text-slate-600 dark:text-slate-400 text-[11px]">Log of product equals sum of logs.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-blue-600 block mb-0.5">4. log_b(x/y) = log_b(x) - log_b(y)</span>
            <span className="font-sans text-slate-600 dark:text-slate-400 text-[11px]">Log of quotient equals difference of logs.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-blue-600 block mb-0.5">5. log_b(x^k) = k log_b(x)</span>
            <span className="font-sans text-slate-600 dark:text-slate-400 text-[11px]">Power inside log becomes outer factor.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-blue-600 block mb-0.5">6. log_b(x) = ln(x) / ln(b)</span>
            <span className="font-sans text-slate-600 dark:text-slate-400 text-[11px]">Universal change-of-base formula.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 col-span-1 sm:col-span-2 lg:col-span-3">
            <span className="font-bold text-blue-600 block mb-0.5">7. log_b(x) = y  ⇔  b^y = x</span>
            <span className="font-sans text-slate-600 dark:text-slate-400 text-[11px]">Equivalence between logarithmic equation and exponential power.</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 20: LOG CALCULATOR EXAMPLES */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Log Calculator Examples
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-500 font-sans block text-[10px]">Example 1</span>
            <span className="font-bold">log₁₀(100) = 2</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-500 font-sans block text-[10px]">Example 2</span>
            <span className="font-bold">ln(100) ≈ 4.605170</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-500 font-sans block text-[10px]">Example 3</span>
            <span className="font-bold">log₂(64) = 6</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-500 font-sans block text-[10px]">Example 4</span>
            <span className="font-bold">log₃(81) = 4</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-500 font-sans block text-[10px]">Example 5</span>
            <span className="font-bold">log₅(125) = 3</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-500 font-sans block text-[10px]">Example 6</span>
            <span className="font-bold">log₁₀(0.01) = -2</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-500 font-sans block text-[10px]">Example 7</span>
            <span className="font-bold">log₁₀₄₉(105) ≈ 0.669096</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-500 font-sans block text-[10px]">Example 8</span>
            <span className="font-bold">antilog₁₀(2) = 100</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-500 font-sans block text-[10px]">Example 9</span>
            <span className="font-bold">antilog₂(6) = 64</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          These examples cover common-base, natural, binary, custom-base and inverse logarithmic calculations represented by the calculator.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 21: HOW THE GRAPH RELATES & SAVING/EXPORTING */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          How the Interactive Graph Relates to the Calculation
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The graph is not a decorative image. It represents <code className="font-mono text-xs">y = log_b(x)</code> using the calculator&apos;s current base. Three important points help connect the formula with the graph: <code className="font-mono text-xs">(1, 0)</code>, <code className="font-mono text-xs">(b, 1)</code>, and <code className="font-mono text-xs">(x, log_b(x))</code>. The first point is universal. The second depends directly on the selected base. The third corresponds to the user&apos;s current argument. Changing the base therefore changes both the numerical logarithm and the geometry of the displayed curve.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
          Saving, Copying and Exporting Results
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator includes tools for preserving calculations after they have been completed:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Save &amp; Load</span>
            <span className="text-slate-500 text-[11px]">Store calculations locally and expand history cards.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Copy LaTeX</span>
            <span className="text-slate-500 text-[11px]">Formatted LaTeX equations for academic papers &amp; notes.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Copy Summary</span>
            <span className="text-slate-500 text-[11px]">Multi-card human-readable text calculation report.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Export CSV</span>
            <span className="text-slate-500 text-[11px]">Download structured spreadsheet data files.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">PDF / Print</span>
            <span className="text-slate-500 text-[11px]">Executive 2-page print modal without blank pages.</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Share &amp; Reset</span>
            <span className="text-slate-500 text-[11px]">Instant URL parameter sharing and default restoration.</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 22: MATHEMATICAL REFERENCES */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Mathematical References
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The core mathematical concepts used by this calculator are standard properties of real logarithmic and exponential functions. The definition <code className="font-mono text-xs">log_b(x) = y ⇔ b^y = x</code>, domain conditions <code className="font-mono text-xs">b &gt; 0, b ≠ 1, x &gt; 0</code>, change-of-base relationship <code className="font-mono text-xs">log_b(x) = ln(x)/ln(b)</code>, and graph characteristics are covered extensively in standard textbooks.
        </p>
        <ul className="space-y-1.5 text-xs text-blue-600 dark:text-blue-400 pl-2">
          <li>
            <a
              href="https://openstax.org/books/algebra-and-trigonometry/pages/6-3-logarithmic-functions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              <span>OpenStax Algebra and Trigonometry — Logarithmic Functions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li>
            <a
              href="https://openstax.org/books/algebra-and-trigonometry/pages/6-5-logarithmic-properties"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              <span>OpenStax Algebra and Trigonometry — Logarithmic Properties</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li>
            <a
              href="https://openstax.org/books/precalculus/pages/4-4-graphs-of-logarithmic-functions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              <span>OpenStax Precalculus — Graphs of Logarithmic Functions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li>
            <a
              href="https://openstax.org/books/calculus-volume-1/pages/1-5-exponential-and-logarithmic-functions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              <span>OpenStax Calculus — Exponential and Logarithmic Functions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
        </ul>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 23: FREQUENTLY ASKED QUESTIONS (UNFOLDED BY DEFAULT) */}
      {/* ========================================================================= */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Frequently Asked Questions ({log_calculatorFaqs.length})</span>
          </h2>
          <span className="text-xs text-slate-500 font-semibold">Unfolded by Default</span>
        </div>

        <div className="space-y-3">
          {log_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqs[idx] !== false;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-sm leading-snug">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 24: RELATED CALCULATORS CARDS */}
      {/* ========================================================================= */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <span>Related Calculators</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between shadow-xs">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Exponent Calculator</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Evaluate powers, exponential bases, fractional exponents and algebraic exponent rules with full derivations.
              </p>
            </div>
            <Link
              href="/calculators/exponent-calculator"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 pt-2"
            >
              <span>Open Calculator</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between shadow-xs">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Scientific Calculator</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Advanced numerical calculator supporting trigonometric, inverse trigonometric, exponential and multi-step expressions.
              </p>
            </div>
            <Link
              href="/calculators/scientific-calculator"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 pt-2"
            >
              <span>Open Calculator</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between shadow-xs">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Root Calculator &amp; Radical Simplifier</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Calculate square roots, cube roots and general nth roots while breaking down rads into prime factorizations.
              </p>
            </div>
            <Link
              href="/calculators/root-calculator"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 pt-2"
            >
              <span>Open Calculator</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between shadow-xs">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Scientific Notation Calculator</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Convert standard decimal numbers to power-of-ten scientific notation, engineering notation and e-notation formats.
              </p>
            </div>
            <Link
              href="/calculators/scientific-notation-calculator"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 pt-2"
            >
              <span>Open Calculator</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 25: MATHEMATICAL DISCLAIMER */}
      {/* ========================================================================= */}
      <section className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <h2 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Mathematical Disclaimer</span>
        </h2>
        <p className="leading-relaxed">
          This calculator applies standard real-number logarithm and exponential relationships to the values entered by the user. A mathematically valid calculation does not by itself determine whether a particular real-world model or equation is appropriate.
        </p>
        <p className="leading-relaxed">
          For important academic, scientific or professional work, verify the result against the assumptions, domain, units and definitions appropriate to the problem.
        </p>
      </section>
    </div>
  );
}

export default LogContent;
