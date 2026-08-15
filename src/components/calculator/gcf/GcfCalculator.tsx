"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  Copy,
  Check,
  Share2,
  Sparkles,
  Sliders,
  RotateCcw,
  BookOpen,
  Zap,
  Grid,
  ListOrdered,
  Layers,
  PieChart,
  CheckCircle2,
  Info,
  ShieldCheck,
  Split
} from "lucide-react";
import {
  parseGcfNumbersInput,
  computeGcfSummary,
  generateEuclideanDivisionSteps,
  generateBezoutIdentity,
  generateDivisionGridMethod
} from "@/app/calculators/gcf-calculator/gcf-logic";

export type GcfMethodTab = "prime" | "euclidean" | "ladder" | "list" | "bezout" | "venn";

export function GcfCalculator() {
  const [inputStr, setInputStr] = useState<string>("36, 54, 90");
  const [activeTab, setActiveTab] = useState<GcfMethodTab>("prime");

  // Feedback states
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedTable, setCopiedTable] = useState<boolean>(false);
  const [copiedExplanation, setCopiedExplanation] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Parse input & calculate
  const numbers = useMemo(() => parseGcfNumbersInput(inputStr), [inputStr]);
  const summary = useMemo(() => computeGcfSummary(numbers), [numbers]);
  const euclideanData = useMemo(() => generateEuclideanDivisionSteps(numbers), [numbers]);
  const bezoutData = useMemo(() => {
    if (numbers.length >= 2) {
      return generateBezoutIdentity(numbers[0], numbers[1]);
    }
    return null;
  }, [numbers]);
  const divisionGrid = useMemo(() => generateDivisionGridMethod(numbers), [numbers]);

  // Presets
  const presets = [
    { label: "Two Numbers", value: "36, 54" },
    { label: "Three Numbers", value: "16, 88, 104" },
    { label: "Large Numbers", value: "268442, 178296" },
    { label: "Coprime Primes", value: "17, 31" },
    { label: "Fraction Simplification", value: "48, 180" }
  ];

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("q", inputStr);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    handleCopy(shareableUrl, setCopiedUrl);
  };

  return (
    <div className="space-y-6">
      {/* INPUT & HERO RESULT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* LEFT CARD: INPUT FORM */}
        <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-600" />
              <span>Input Integers (Comma or Space Separated)</span>
            </h2>
            <button
              type="button"
              onClick={() => setInputStr("36, 54, 90")}
              className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-2">
            <textarea
              rows={3}
              value={inputStr}
              onChange={(e) => setInputStr(e.target.value)}
              placeholder="e.g. 36, 54, 90 or 48 180"
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3.5 text-sm font-mono font-semibold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none resize-none"
            />
            {numbers.length === 0 && (
              <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                <Info className="h-3.5 w-3.5" />
                <span>Please enter at least one valid positive integer.</span>
              </p>
            )}
            {numbers.length > 0 && (
              <p className="text-[11px] text-slate-500 font-medium">
                Parsed {numbers.length} integer{numbers.length > 1 ? "s" : ""}:{" "}
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  [{numbers.join(", ")}]
                </span>
              </p>
            )}
          </div>

          {/* QUICK PRESET CHIPS */}
          <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Quick Input Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setInputStr(preset.value)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    inputStr === preset.value
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500"
                  }`}
                >
                  {preset.label} ({preset.value})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT CARD: HERO RESULT DISPLAY */}
        <div className="md:col-span-6 bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-slate-50 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 border border-blue-200 dark:border-slate-700 rounded-2xl p-6 space-y-5 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-blue-200/80 dark:border-slate-800 pb-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Simultaneous GCF & LCM Dashboard</span>
            </h2>
            {summary.isCoprime && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                Coprime (GCF = 1)
              </span>
            )}
          </div>

          {/* MAIN HERO NUMERIC RESULT (GCF) */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Greatest Common Factor (GCF / GCD / HCF):
            </span>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight break-all">
              {summary.gcf}
            </div>
            <p className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300">
              Prime Factor Form: {summary.gcfPrimeExpression}
            </p>
          </div>

          {/* DUAL LCM & RATIO REDUCER METRICS */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-blue-200/80 dark:border-slate-800">
            <div className="bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-blue-100 dark:border-slate-700 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Least Common Multiple (LCM)</span>
              <p className="text-base font-mono font-black text-slate-900 dark:text-slate-100">
                {summary.lcm}
              </p>
              <span className="text-[10px] font-mono text-slate-500 block">Primes: {summary.lcmPrimeExpression}</span>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-blue-100 dark:border-slate-700 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Simplified Ratio</span>
              <p className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 truncate">
                {summary.simplifiedRatio || "1 : 1"}
              </p>
              <span className="text-[10px] text-slate-500 block">Reduced by GCF ({summary.gcf})</span>
            </div>
          </div>

          {/* SHARED FACTORS INTERSECTION BADGE */}
          {summary.sharedFactorsIntersection.length > 0 && (
            <div className="bg-white/90 dark:bg-slate-800/90 p-3 rounded-xl border border-blue-100 dark:border-slate-700 space-y-1">
              <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
                Shared Common Factors Intersection (F₁ ∩ F₂):
              </span>
              <p className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200">
                [{summary.sharedFactorsIntersection.join(", ")}]
              </p>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleCopy(summary.gcf.toString(), setCopiedResult)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedResult ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedResult ? "Copied!" : "Copy GCF"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(summary.factorizations.map((f) => `${f.num}: [${f.allFactors.join(", ")}]`).join("\n"), setCopiedTable)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedTable ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <BookOpen className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedTable ? "Copied!" : "Copy Factors"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(`GCF(${numbers.join(", ")}) = ${summary.gcf} (LCM = ${summary.lcm})`, setCopiedExplanation)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedExplanation ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedExplanation ? "Copied!" : "Copy Steps"}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl px-2 py-2 text-xs shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copiedUrl ? "Link Copied!" : "Share URL"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* MULTI-METHOD DERIVATION TABS SUITE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Multi-Method Mathematical Derivations</span>
          </h3>

          {/* TAB BUTTONS */}
          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab("prime")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "prime"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Prime Factorization</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("euclidean")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "euclidean"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Euclidean Algorithm</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("ladder")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "ladder"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span>Division Grid (Ladder)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("list")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "list"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <ListOrdered className="h-3.5 w-3.5" />
              <span>List Factors</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("bezout")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "bezout"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Split className="h-3.5 w-3.5" />
              <span>Bézout's Identity</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("venn")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "venn"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <PieChart className="h-3.5 w-3.5" />
              <span>Venn Diagram</span>
            </button>
          </div>
        </div>

        {/* TAB 1: PRIME FACTORIZATION METHOD */}
        {activeTab === "prime" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Method 1: Exponential Prime Factorization Breakdown
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {summary.factorizations.map((item) => (
                <div key={item.num} className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">Number {item.num}</span>
                  <p className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
                    {item.num} = {item.formatted}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 p-4 rounded-xl space-y-2">
              <h5 className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                <span>Minimum Exponent Rule for GCF:</span>
              </h5>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Take the lowest common power of every shared prime factor present across all numbers:
              </p>
              <div className="font-mono text-xs font-bold bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-blue-200 dark:border-slate-800 text-blue-700 dark:text-blue-300">
                GCF = {summary.gcfPrimeExpression} = {summary.gcf}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EUCLIDEAN ALGORITHM */}
        {activeTab === "euclidean" && (
          <div className="space-y-4 overflow-x-auto">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Method 2: Euclidean Algorithm (Division & Remainder Method)
            </h4>
            <div className="space-y-3 font-mono text-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                    <th className="p-2">Step</th>
                    <th className="p-2">Dividend (a)</th>
                    <th className="p-2">Divisor (b)</th>
                    <th className="p-2">Quotient (q)</th>
                    <th className="p-2">Remainder (r)</th>
                    <th className="p-2">Equation (a = b·q + r)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {euclideanData.divisionSteps.map((step) => (
                    <tr key={step.step} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-2 font-bold text-blue-600">{step.step}</td>
                      <td className="p-2">{step.dividend}</td>
                      <td className="p-2">{step.divisor}</td>
                      <td className="p-2">{step.quotient}</td>
                      <td className={`p-2 font-bold ${step.remainder === 0 ? "text-emerald-600 font-extrabold" : "text-slate-800 dark:text-slate-200"}`}>
                        {step.remainder}
                      </td>
                      <td className="p-2 font-bold text-blue-700 dark:text-blue-300">{step.equation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {euclideanData.overallSummaryText.length > 0 && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  {euclideanData.overallSummaryText.map((t, idx) => (
                    <p key={idx} className="text-slate-700 dark:text-slate-300">{t}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: DIVISION GRID / LADDER METHOD */}
        {activeTab === "ladder" && (
          <div className="space-y-4 overflow-x-auto">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Method 3: Common Division / Ladder (Cake) Matrix
            </h4>
            {divisionGrid.rows.length > 0 ? (
              <div className="space-y-3">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                      <th className="p-2 border-r border-slate-200 dark:border-slate-700 text-blue-600">Shared Prime Divisor</th>
                      {numbers.map((n, idx) => (
                        <th key={idx} className="p-2 text-center font-bold">Number {n}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {divisionGrid.rows.map((row) => (
                      <tr key={row.step} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-2 font-bold text-blue-600 border-r border-slate-200 dark:border-slate-700">
                          {row.divisor}
                        </td>
                        {row.quotients.map((q, qIdx) => (
                          <td key={qIdx} className="p-2 text-center font-bold">
                            {q}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold border-t-2 border-emerald-500">
                      <td className="p-2 border-r border-slate-200 dark:border-slate-700">Final Quotients:</td>
                      {divisionGrid.finalQuotients.map((fq, fqIdx) => (
                        <td key={fqIdx} className="p-2 text-center">{fq}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs">
                  <span>Multiply vertical common prime divisors: </span>
                  <span className="font-bold text-blue-600">{divisionGrid.gcfProductExpression} = {summary.gcf}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No shared common prime factors. GCF = 1 (Coprime).</p>
            )}
          </div>
        )}

        {/* TAB 4: LIST ALL FACTORS METHOD */}
        {activeTab === "list" && (
          <div className="space-y-4 overflow-x-auto">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Method 4: Listing All Factors & Shared Set Intersection (F₁ ∩ F₂)
            </h4>
            <div className="space-y-3 font-mono text-xs">
              {summary.factorizations.map((item) => (
                <div key={item.num} className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-600">Factors of {item.num} ({item.allFactors.length} total):</span>
                    <span className="text-[10px] text-slate-500">{item.isSquareFree ? "Square-free" : "Square factor"}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.allFactors.map((f, idx) => {
                      const isShared = summary.sharedFactorsIntersection.includes(f);
                      const isMaxGcf = f === summary.gcf;
                      return (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 rounded text-xs font-bold ${
                            isMaxGcf
                              ? "bg-blue-600 text-white shadow-xs scale-105"
                              : isShared
                              ? "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300"
                              : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {f}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs">
                <span className="font-bold text-emerald-900 dark:text-emerald-200">Common Factors Intersection: </span>
                <span className="font-mono font-bold">[{summary.sharedFactorsIntersection.join(", ")}]</span>
                <span className="block text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5">
                  Greatest value in common factor set = <strong>{summary.gcf}</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BÉZOUT'S IDENTITY & EXTENDED EUCLIDEAN ALGORITHM */}
        {activeTab === "bezout" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Method 5: Extended Euclidean Algorithm & Bézout's Identity [a·x + b·y = GCF(a, b)]
            </h4>
            {bezoutData ? (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <h5 className="font-bold text-blue-600">Bézout's Equation:</h5>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {bezoutData.identityStr}
                  </p>
                  <p className="text-[11px] text-slate-500 font-sans">
                    Bézout coefficients for pair ({bezoutData.a}, {bezoutData.b}): x = {bezoutData.x}, y = {bezoutData.y}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">Bézout's identity is computed for the primary pair of numbers.</p>
            )}
          </div>
        )}

        {/* TAB 6: VENN DIAGRAM VISUAL REPRESENTATION */}
        {activeTab === "venn" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Method 6: Interactive SVG Prime Factor Venn Diagram
            </h4>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-4">
              <svg viewBox="0 0 400 240" className="w-full max-w-md h-auto">
                <defs>
                  <linearGradient id="gcfGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.25" />
                  </linearGradient>
                  <linearGradient id="gcfGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.25" />
                  </linearGradient>
                </defs>

                {/* Left Circle */}
                <circle cx="150" cy="120" r="85" fill="url(#gcfGrad1)" stroke="#2563eb" strokeWidth="2.5" />
                {/* Right Circle */}
                <circle cx="250" cy="120" r="85" fill="url(#gcfGrad2)" stroke="#059669" strokeWidth="2.5" />

                {/* Labels */}
                <text x="110" y="60" textAnchor="middle" className="text-xs font-bold fill-blue-600 font-sans">
                  {numbers[0] ? `Num (${numbers[0]})` : "Set A"}
                </text>
                <text x="290" y="60" textAnchor="middle" className="text-xs font-bold fill-emerald-600 font-sans">
                  {numbers[1] ? `Num (${numbers[1]})` : "Set B"}
                </text>

                {/* Intersection Text (GCF) */}
                <text x="200" y="115" textAnchor="middle" className="text-xs font-bold fill-slate-900 dark:fill-slate-100 font-mono">
                  GCF ({summary.gcf})
                </text>
                <text x="200" y="135" textAnchor="middle" className="text-[10px] fill-slate-600 dark:fill-slate-400 font-mono">
                  Primes: {summary.gcfPrimeExpression}
                </text>

                {/* Union Label (LCM) */}
                <text x="200" y="225" textAnchor="middle" className="text-xs font-bold fill-blue-700 dark:fill-blue-400 font-sans">
                  Union Product = LCM ({summary.lcm})
                </text>
              </svg>

              <p className="text-xs text-slate-600 dark:text-slate-400 text-center max-w-lg leading-relaxed">
                The central intersection highlights the shared prime factors forming the Greatest Common Factor (GCF = {summary.gcf}), while the complete union forms the Least Common Multiple (LCM = {summary.lcm}).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
