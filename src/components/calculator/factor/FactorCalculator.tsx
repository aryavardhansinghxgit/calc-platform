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
  Split,
  GitBranch
} from "lucide-react";
import {
  computeFactorSummary,
  factorQuadraticTrinomial,
  checkDivisibilityRules,
  FactorTreeNode
} from "@/app/calculators/factor-calculator/factor-logic";

export type FactorTab = "pairs" | "tree" | "common" | "quadratic" | "divisibility";

export function FactorCalculator() {
  const [numInput, setNumInput] = useState<string>("120");
  const [activeTab, setActiveTab] = useState<FactorTab>("pairs");

  // Quadratic input fields
  const [quadA, setQuadA] = useState<string>("1");
  const [quadB, setQuadB] = useState<string>("-5");
  const [quadC, setQuadC] = useState<string>("6");

  // Multi-number common factors input
  const [commonNumsInput, setCommonNumsInput] = useState<string>("24, 36, 60");

  // Feedback states
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedPairs, setCopiedPairs] = useState<boolean>(false);
  const [copiedPrimes, setCopiedPrimes] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const numVal = parseInt(numInput, 10) || 120;
  const summary = useMemo(() => computeFactorSummary(numVal), [numVal]);
  const divisibilityRules = useMemo(() => checkDivisibilityRules(numVal), [numVal]);

  const quadResult = useMemo(() => {
    const a = parseFloat(quadA) || 1;
    const b = parseFloat(quadB) || 0;
    const c = parseFloat(quadC) || 0;
    return factorQuadraticTrinomial(a, b, c);
  }, [quadA, quadB, quadC]);

  // Presets
  const presets = [
    { label: "Sample 120", value: "120" },
    { label: "Sample 360", value: "360" },
    { label: "Large 1024", value: "1024" },
    { label: "Prime 997", value: "997" },
    { label: "Perfect 496", value: "496" }
  ];

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("n", numInput);
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
              <span>Input Integer to Factor</span>
            </h2>
            <button
              type="button"
              onClick={() => setNumInput("120")}
              className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Positive Integer (N):
            </label>
            <input
              type="number"
              value={numInput}
              onChange={(e) => setNumInput(e.target.value)}
              placeholder="e.g. 120 or 360"
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-base font-mono font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
            />
            {numVal <= 0 && (
              <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                <Info className="h-3.5 w-3.5" />
                <span>Please enter a positive integer greater than 0.</span>
              </p>
            )}
          </div>

          {/* QUICK PRESET CHIPS */}
          <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Quick Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setNumInput(preset.value)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    numInput === preset.value
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500"
                  }`}
                >
                  {preset.label}
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
              <span>Factor Analytics Dashboard</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              {summary.analytics.classification} ({summary.analytics.abundanceCategory})
            </span>
          </div>

          {/* MAIN HERO RESULT (FACTOR COUNT & PRIME EXPONENT FORMULA) */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Total Factors Count d(n):
            </span>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">
              {summary.analytics.divisorCount} Factors
            </div>
            <p className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 pt-1">
              Prime Exponent Product: {summary.exponentialPrimeProduct}
            </p>
          </div>

          {/* STAT CHIPS */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-blue-200/80 dark:border-slate-800">
            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Divisor Sum σ(n)</span>
              <p className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100">{summary.analytics.divisorSum}</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Aliquot Sum s(n)</span>
              <p className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100">{summary.analytics.aliquotSum}</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Square-Free</span>
              <p className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                {summary.analytics.isSquareFree ? "Yes ✓" : "No"}
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleCopy(summary.factors.join(", "), setCopiedResult)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedResult ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedResult ? "Copied!" : "Copy Factors"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(summary.factorPairs.map((p) => p.formattedPositive).join("\n"), setCopiedPairs)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedPairs ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <BookOpen className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedPairs ? "Copied!" : "Copy Pairs"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(`${summary.number} = ${summary.exponentialPrimeProduct} = ${summary.expandedPrimeProduct}`, setCopiedPrimes)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedPrimes ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedPrimes ? "Copied!" : "Copy Primes"}</span>
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

      {/* MULTI-TAB DERIVATIONS & TREE SUITE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Interactive Derivations & Factor Tree Suite</span>
          </h3>

          {/* TAB BUTTONS */}
          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab("pairs")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "pairs"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span>Factors & Pairs</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("tree")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "tree"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <GitBranch className="h-3.5 w-3.5" />
              <span>Factor Tree</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("common")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "common"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Common Factors</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("quadratic")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "quadratic"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Split className="h-3.5 w-3.5" />
              <span>Quadratic Factoring</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("divisibility")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "divisibility"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Divisibility Rules</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FACTORS & FACTOR PAIRS */}
        {activeTab === "pairs" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                All Positive Factors of {summary.number} ({summary.factors.length} Total):
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {summary.factors.map((f) => (
                  <span
                    key={f}
                    className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Factor Pairs (Positive and Negative):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 font-mono text-xs">
                {summary.factorPairs.map((pair, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                    <p className="font-bold text-blue-600 dark:text-blue-400">{pair.formattedPositive}</p>
                    <p className="text-slate-500 text-[11px]">{pair.formattedNegative}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE FACTOR TREE */}
        {activeTab === "tree" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Hierarchical Factor Tree Diagram for {summary.number}:
            </h4>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-center items-center overflow-x-auto min-h-[220px]">
              {summary.treeRoot && <RenderFactorTreeNode node={summary.treeRoot} />}
            </div>
          </div>
        )}

        {/* TAB 3: COMMON FACTORS MULTI-NUMBER MODE */}
        {activeTab === "common" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Common Factors for Multiple Integers:
            </h4>
            <div className="space-y-2">
              <input
                type="text"
                value={commonNumsInput}
                onChange={(e) => setCommonNumsInput(e.target.value)}
                placeholder="Enter numbers separated by comma (e.g. 24, 36, 60)"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none"
              />
            </div>
          </div>
        )}

        {/* TAB 4: QUADRATIC TRINOMIAL FACTORING */}
        {activeTab === "quadratic" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Algebraic Quadratic Trinomial Factoring (a x² + b x + c):
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Coeff a:</label>
                <input
                  type="number"
                  value={quadA}
                  onChange={(e) => setQuadA(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-mono font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Coeff b:</label>
                <input
                  type="number"
                  value={quadB}
                  onChange={(e) => setQuadB(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-mono font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Coeff c:</label>
                <input
                  type="number"
                  value={quadC}
                  onChange={(e) => setQuadC(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
              <span className="text-blue-600 font-bold">Expression: {quadA}x² {parseFloat(quadB) >= 0 ? "+" : ""} {quadB}x {parseFloat(quadC) >= 0 ? "+" : ""} {quadC}</span>
              <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100 pt-1">
                Factored Form: {quadResult.factoredString}
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: DIVISIBILITY RULES CHECKER */}
        {activeTab === "divisibility" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Divisibility Tests for {summary.number} (Divisors 2 through 13):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans">
              {divisibilityRules.map((rule) => (
                <div
                  key={rule.divisor}
                  className={`p-3 rounded-xl border flex items-start justify-between gap-2 ${
                    rule.isDivisible
                      ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-900 dark:text-emerald-200"
                      : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs">Divisible by {rule.divisor}? {rule.isDivisible ? "Yes ✓" : "No ✗"}</span>
                    <p className="text-[11px] leading-relaxed">{rule.ruleExplanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RenderFactorTreeNode({ node }: { node: FactorTreeNode }) {
  if (!node.left || !node.right) {
    return (
      <div className="flex flex-col items-center">
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold border ${
            node.isPrime
              ? "bg-emerald-500 text-white border-emerald-600 shadow-sm"
              : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300"
          }`}
        >
          {node.value}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <span className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-blue-600 text-white shadow-sm mb-2">
        {node.value}
      </span>
      <div className="w-px h-3 bg-slate-300 dark:bg-slate-700" />
      <div className="flex gap-8 pt-1 border-t border-slate-300 dark:border-slate-700">
        <RenderFactorTreeNode node={node.left} />
        <RenderFactorTreeNode node={node.right} />
      </div>
    </div>
  );
}
