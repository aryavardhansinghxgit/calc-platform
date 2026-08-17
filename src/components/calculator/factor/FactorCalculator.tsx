"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Calculator,
  Copy,
  Check,
  Share2,
  Sparkles,
  Sliders,
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
  GitBranch,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import {
  computeFactorSummary,
  factorQuadraticTrinomial,
  checkDivisibilityRules,
  getAllPositiveFactors,
  FactorTreeNode
} from "@/app/calculators/factor-calculator/factor-logic";

export type FactorTab = "pairs" | "tree" | "divisibility";

export interface SavedFactorItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function FactorCalculator() {
  // Card 1 Inputs: Integer Factorization Engine
  const [numInput, setNumInput] = useState<string>("120");
  const [activeTab, setActiveTab] = useState<FactorTab>("pairs");

  // Card 2 Inputs: Multi-number common factors
  const [commonNumsInput, setCommonNumsInput] = useState<string>("24, 36, 60");

  // Card 3 Inputs: Quadratic Trinomial
  const [quadA, setQuadA] = useState<string>("1");
  const [quadB, setQuadB] = useState<string>("-5");
  const [quadC, setQuadC] = useState<string>("6");

  // Feedback states
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedPairs, setCopiedPairs] = useState<boolean>(false);
  const [copiedPrimes, setCopiedPrimes] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Saved calculation states for Card 1, 2, 3
  const [savedFactorItems, setSavedFactorItems] = useState<SavedFactorItem[]>([]);
  const [justSavedFactor, setJustSavedFactor] = useState<boolean>(false);

  const [savedCommonItems, setSavedCommonItems] = useState<SavedFactorItem[]>([]);
  const [justSavedCommon, setJustSavedCommon] = useState<boolean>(false);

  const [savedQuadItems, setSavedQuadItems] = useState<SavedFactorItem[]>([]);
  const [justSavedQuad, setJustSavedQuad] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedFactor = localStorage.getItem("saved_factor_calculations");
      if (storedFactor) setSavedFactorItems(JSON.parse(storedFactor));

      const storedCommon = localStorage.getItem("saved_factor_common");
      if (storedCommon) setSavedCommonItems(JSON.parse(storedCommon));

      const storedQuad = localStorage.getItem("saved_factor_quadratic");
      if (storedQuad) setSavedQuadItems(JSON.parse(storedQuad));
    } catch (e) {}
  }, []);

  // Card 1 Calculations
  const numVal = parseInt(numInput, 10) || 120;
  const summary = useMemo(() => computeFactorSummary(numVal), [numVal]);
  const divisibilityRules = useMemo(() => checkDivisibilityRules(numVal), [numVal]);

  // Card 2 Calculations: Multi-number Common Factors
  const commonNumbers = useMemo(() => {
    return commonNumsInput
      .split(/[,;\s]+/)
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n) && n > 0);
  }, [commonNumsInput]);

  const { commonFactors, gcfVal } = useMemo(() => {
    if (commonNumbers.length === 0) return { commonFactors: [], gcfVal: 1 };
    const factorSets = commonNumbers.map(n => getAllPositiveFactors(n));
    const firstSet = factorSets[0];
    const common = firstSet.filter(f => factorSets.every(set => set.includes(f)));
    const gcf = common.length > 0 ? Math.max(...common) : 1;
    return { commonFactors: common, gcfVal: gcf };
  }, [commonNumbers]);

  // Card 3 Calculations: Quadratic Trinomial
  const quadResult = useMemo(() => {
    const a = parseFloat(quadA) || 1;
    const b = parseFloat(quadB) || 0;
    const c = parseFloat(quadC) || 0;
    return factorQuadraticTrinomial(a, b, c);
  }, [quadA, quadB, quadC]);

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      navigator.clipboard.writeText(text);
      setFn(true);
      setTimeout(() => setFn(false), 2000);
    } catch (e) {}
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("n", numInput);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    handleCopy(shareableUrl, setCopiedUrl);
  };

  // Save Card 1 Handler
  const handleSaveFactor = () => {
    const inputsStr = `Positive Integer (N): ${numVal}`;
    const opStr = `Integer Factorization Engine`;
    const resList = [
      `Factors Count d(n) = ${summary.analytics.divisorCount}`,
      `Prime Factor Product = ${summary.exponentialPrimeProduct}`,
      `All Factors = [${summary.factors.join(", ")}]`,
      `Divisor Sum σ(n) = ${summary.analytics.divisorSum}`,
      `Aliquot Sum s(n) = ${summary.analytics.aliquotSum}`,
      `Square Free = ${summary.analytics.isSquareFree ? "Yes" : "No"}`
    ];

    const newItem: SavedFactorItem = {
      id: Date.now().toString(),
      title: `Factors of ${numVal}`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Factors(${numVal}) = [${summary.factors.join(", ")}]`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedFactorItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedFactorItems(updated);
    try {
      localStorage.setItem("saved_factor_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedFactor(true);
    setTimeout(() => setJustSavedFactor(false), 2000);
  };

  // Save Card 2 Handler
  const handleSaveCommon = () => {
    if (commonNumbers.length === 0) return;

    const inputsStr = `Integers: [${commonNumbers.join(", ")}]`;
    const opStr = `Common Factors Calculation`;
    const resList = [
      `Common Factors = [${commonFactors.join(", ")}]`,
      `Greatest Common Factor (GCF) = ${gcfVal}`
    ];

    const newItem: SavedFactorItem = {
      id: Date.now().toString(),
      title: `Common Factors ([${commonNumbers.join(", ")}])`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Common = [${commonFactors.join(", ")}]`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedCommonItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedCommonItems(updated);
    try {
      localStorage.setItem("saved_factor_common", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedCommon(true);
    setTimeout(() => setJustSavedCommon(false), 2000);
  };

  // Save Card 3 Handler
  const handleSaveQuad = () => {
    const inputsStr = `a: ${quadA}, b: ${quadB}, c: ${quadC}`;
    const opStr = `Quadratic Trinomial Factoring (${quadA}x² + ${quadB}x + ${quadC})`;
    const resList = [
      `Factored Form = ${quadResult.factoredString}`,
      `Is Factorable = ${quadResult.isFactorable ? "Yes" : "No"}`,
      `Roots = ${quadResult.roots.join(", ")}`
    ];

    const newItem: SavedFactorItem = {
      id: Date.now().toString(),
      title: `Factored (${quadA}x² + ${quadB}x + ${quadC})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: quadResult.factoredString,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedQuadItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedQuadItems(updated);
    try {
      localStorage.setItem("saved_factor_quadratic", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedQuad(true);
    setTimeout(() => setJustSavedQuad(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: INTEGER FACTOR & PRIME FACTORIZATION ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Integer Factor &amp; Prime Factorization Engine</span>
          <button
            type="button"
            onClick={handleSaveFactor}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedFactor ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT FORM */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  <span>Input Integer to Factor</span>
                </h2>
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
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-mono font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 outline-none"
                />
                {numVal <= 0 && (
                  <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                    <Info className="h-3.5 w-3.5" />
                    <span>Please enter a positive integer greater than 0.</span>
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT DISPLAY */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Total Factors Count d(n)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {summary.analytics.classification} ({summary.analytics.abundanceCategory})
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">
                  {summary.analytics.divisorCount} Factors
                </div>
                <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  Prime Exponent Product: {summary.exponentialPrimeProduct}
                </p>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Divisor Sum σ(n)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{summary.analytics.divisorSum}</span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Aliquot Sum s(n)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{summary.analytics.aliquotSum}</span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Square-Free</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{summary.analytics.isSquareFree ? "Yes ✓" : "No"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MULTI-TAB DERIVATIONS & TREE SUITE */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Interactive Derivations &amp; Factor Tree Suite</span>
              </h3>

              <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab("pairs")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeTab === "pairs" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Factors &amp; Pairs
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("tree")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeTab === "tree" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Factor Tree
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("divisibility")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeTab === "divisibility" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Divisibility Rules
                </button>
              </div>
            </div>

            {/* TAB 1: FACTORS & FACTOR PAIRS */}
            {activeTab === "pairs" && (
              <div className="space-y-3 text-xs">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-700 dark:text-slate-300">
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
                  <h4 className="font-bold text-slate-700 dark:text-slate-300">
                    Factor Pairs (Positive and Negative):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 font-mono">
                    {summary.factorPairs.map((pair, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-0.5">
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
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-slate-700 dark:text-slate-300">
                  Hierarchical Factor Tree Diagram for {summary.number}:
                </h4>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-center items-center overflow-x-auto min-h-[200px]">
                  {summary.treeRoot && <RenderFactorTreeNode node={summary.treeRoot} />}
                </div>
              </div>
            )}

            {/* TAB 3: DIVISIBILITY RULES CHECKER */}
            {activeTab === "divisibility" && (
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-slate-700 dark:text-slate-300">
                  Divisibility Tests for {summary.number} (Divisors 2 through 13):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  {divisibilityRules.map((rule) => (
                    <div
                      key={rule.divisor}
                      className={`p-2.5 rounded-xl border flex items-start justify-between gap-2 ${
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

          {/* EMBEDDED SAVED FACTOR CALCULATIONS INSIDE CARD 1 */}
          {savedFactorItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Factor Calculations ({savedFactorItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedFactorItems([]);
                    try { localStorage.removeItem("saved_factor_calculations"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedFactorItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedFactorItems.filter(i => i.id !== item.id);
                            setSavedFactorItems(updated);
                            try { localStorage.setItem("saved_factor_calculations", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / N: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Calculated Answers:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: MULTI-NUMBER COMMON FACTORS FINDER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Common Factors Finder for Multiple Numbers</span>
          <button
            type="button"
            onClick={handleSaveCommon}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCommon ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Multi-Number Inputs
              </h2>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Integers (Comma or Space Separated):
                </label>
                <input
                  type="text"
                  value={commonNumsInput}
                  onChange={(e) => setCommonNumsInput(e.target.value)}
                  placeholder="e.g. 24, 36, 60"
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: COMMON FACTORS OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Shared Common Factors Intersection
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1 font-mono font-bold text-sm">
                    {commonFactors.map((f) => (
                      <span key={f} className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Greatest Common Factor (GCF)</span>
                  <span className="font-mono text-xl text-blue-600 dark:text-blue-400">{gcfVal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED COMMON FACTORS SOLVES INSIDE CARD 2 */}
          {savedCommonItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Common Factors ({savedCommonItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCommonItems([]);
                    try { localStorage.removeItem("saved_factor_common"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedCommonItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedCommonItems.filter(i => i.id !== item.id);
                            setSavedCommonItems(updated);
                            try { localStorage.setItem("saved_factor_common", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Integers: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: QUADRATIC TRINOMIAL FACTORING (a x² + b x + c) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Quadratic Trinomial Factoring (a x² + b x + c)</span>
          <button
            type="button"
            onClick={handleSaveQuad}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedQuad ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Quadratic Coefficients
              </h2>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500">Coeff a:</label>
                  <input
                    type="number"
                    value={quadA}
                    onChange={(e) => setQuadA(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500">Coeff b:</label>
                  <input
                    type="number"
                    value={quadB}
                    onChange={(e) => setQuadB(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500">Coeff c:</label>
                  <input
                    type="number"
                    value={quadC}
                    onChange={(e) => setQuadC(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: QUADRATIC FACTORED OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Factored Expression
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {quadResult.factoredString}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Factorable</span>
                    <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{quadResult.isFactorable ? "Yes ✓" : "No"}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Roots</span>
                    <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">[{quadResult.roots.join(", ")}]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED QUADRATIC FACTORING INSIDE CARD 3 */}
          {savedQuadItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Quadratic Factoring ({savedQuadItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedQuadItems([]);
                    try { localStorage.removeItem("saved_factor_quadratic"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedQuadItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedQuadItems.filter(i => i.id !== item.id);
                            setSavedQuadItems(updated);
                            try { localStorage.setItem("saved_factor_quadratic", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Coefficients: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
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

export default FactorCalculator;
