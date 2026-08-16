"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import {
  parseNumbersInput,
  computeLcmSummary,
  generateDivisionGridMethod,
  generateListMultiplesMethod,
  generateGCFFormulaMethod
} from "@/app/calculators/lcm-calculator/lcm-logic";

export type MethodTab = "prime" | "ladder" | "gcf" | "list" | "venn";

export interface SavedLcmItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function LcmCalculator() {
  // Card 1 Inputs: Multi-number LCM
  const [inputStr, setInputStr] = useState<string>("12, 18, 30");
  const [activeTab, setActiveTab] = useState<MethodTab>("prime");

  // Card 2 Inputs: Pairwise LCM & GCF Identity
  const [pairA, setPairA] = useState<string>("48");
  const [pairB, setPairB] = useState<string>("60");

  // Feedback states
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedTable, setCopiedTable] = useState<boolean>(false);
  const [copiedExplanation, setCopiedExplanation] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Saved calculation states for Card 1 & Card 2
  const [savedLcmItems, setSavedLcmItems] = useState<SavedLcmItem[]>([]);
  const [justSavedLcm, setJustSavedLcm] = useState<boolean>(false);

  const [savedPairItems, setSavedPairItems] = useState<SavedLcmItem[]>([]);
  const [justSavedPair, setJustSavedPair] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedLcm = localStorage.getItem("saved_lcm_calculations");
      if (storedLcm) setSavedLcmItems(JSON.parse(storedLcm));

      const storedPair = localStorage.getItem("saved_lcm_pairwise");
      if (storedPair) setSavedPairItems(JSON.parse(storedPair));
    } catch (e) {}
  }, []);

  // Parse input & calculate Card 1
  const numbers = useMemo(() => parseNumbersInput(inputStr), [inputStr]);
  const summary = useMemo(() => computeLcmSummary(numbers), [numbers]);
  const divisionGrid = useMemo(() => generateDivisionGridMethod(numbers), [numbers]);
  const listMultiplesData = useMemo(() => generateListMultiplesMethod(numbers, 10), [numbers]);
  const gcfFormulaData = useMemo(() => generateGCFFormulaMethod(numbers), [numbers]);

  // Card 2 Pairwise Calculation
  const pairNumbers = useMemo(() => {
    const a = parseInt(pairA, 10);
    const b = parseInt(pairB, 10);
    const list: number[] = [];
    if (!isNaN(a) && a > 0) list.push(a);
    if (!isNaN(b) && b > 0) list.push(b);
    return list;
  }, [pairA, pairB]);

  const pairSummary = useMemo(() => computeLcmSummary(pairNumbers), [pairNumbers]);

  // Presets
  const presets = [
    { label: "Small Integers", value: "8, 12, 30" },
    { label: "Pair", value: "48, 60" },
    { label: "Large Primes", value: "21, 14, 38" },
    { label: "Fraction Denominators", value: "3, 5, 7" },
    { label: "Quadruplet", value: "15, 25, 35, 45" }
  ];

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      navigator.clipboard.writeText(text);
      setFn(true);
      setTimeout(() => setFn(false), 2000);
    } catch (e) {}
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("q", inputStr);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    handleCopy(shareableUrl, setCopiedUrl);
  };

  // Save Card 1 Handler
  const handleSaveLcm = () => {
    if (numbers.length === 0) return;

    const inputsStr = `Integers: [${numbers.join(", ")}]`;
    const opStr = `Least Common Multiple Calculation`;
    const resList = [
      `Least Common Multiple (LCM) = ${summary.lcm}`,
      `Prime Factor Form = ${summary.lcmPrimeExpression}`,
      `Greatest Common Factor (GCF) = ${summary.gcf}`,
      `Product Identity = ${summary.productEqualsLcmGcf ? "a×b = LCM×GCF ✓" : `Product = ${summary.product}`}`
    ];

    const newItem: SavedLcmItem = {
      id: Date.now().toString(),
      title: `LCM([${numbers.join(", ")}])`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `LCM = ${summary.lcm}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedLcmItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedLcmItems(updated);
    try {
      localStorage.setItem("saved_lcm_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedLcm(true);
    setTimeout(() => setJustSavedLcm(false), 2000);
  };

  // Save Card 2 Handler
  const handleSavePair = () => {
    if (pairNumbers.length < 2) return;

    const inputsStr = `a: ${pairA}, b: ${pairB}`;
    const opStr = `Pairwise LCM & GCF Relation (a × b = LCM × GCF)`;
    const resList = [
      `LCM(${pairA}, ${pairB}) = ${pairSummary.lcm}`,
      `GCF(${pairA}, ${pairB}) = ${pairSummary.gcf}`,
      `Product a × b = ${pairSummary.product}`,
      `Product LCM × GCF = ${pairSummary.lcm * pairSummary.gcf}`,
      `Identity Valid = ${pairSummary.productEqualsLcmGcf ? "Yes (a × b = LCM × GCF)" : "No"}`
    ];

    const newItem: SavedLcmItem = {
      id: Date.now().toString(),
      title: `Pairwise LCM(${pairA}, ${pairB})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${pairA} × ${pairB} = ${pairSummary.lcm} × ${pairSummary.gcf}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedPairItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedPairItems(updated);
    try {
      localStorage.setItem("saved_lcm_pairwise", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedPair(true);
    setTimeout(() => setJustSavedPair(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: LEAST COMMON MULTIPLE (LCM) & GCF SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Least Common Multiple (LCM) &amp; GCF Solver</span>
          <button
            type="button"
            onClick={handleSaveLcm}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedLcm ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT FORM */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  <span>Input Integers (Comma or Space Separated)</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setInputStr("12, 18, 30")}
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
                  placeholder="e.g. 12, 18, 30 or 24 36 60"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm font-mono font-semibold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 outline-none resize-none"
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

            {/* RIGHT COLUMN: HERO RESULT DISPLAY */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Least Common Multiple (LCM)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    Evaluated
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight break-all">
                  {summary.lcm}
                </div>
                <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  Prime Factor Form: {summary.lcmPrimeExpression}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-400 block uppercase">GCF Result</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{summary.gcf}</span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-400 block uppercase">Identity Test</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">
                      {numbers.length === 2 ? (
                        summary.productEqualsLcmGcf ? "a×b = LCM×GCF ✓" : "a×b ≠ LCM×GCF"
                      ) : (
                        `Prod = ${summary.product}`
                      )}
                    </span>
                  </div>
                </div>

                {numbers.length >= 2 && (
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold space-y-1">
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                      Fraction LCD Helper Example:
                    </span>
                    <p className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {summary.lcdFractionExample}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MULTI-METHOD DERIVATION TABS SUITE */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Multi-Method Mathematical Derivations</span>
              </h3>

              <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab("prime")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeTab === "prime" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Prime Factorization
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("ladder")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeTab === "ladder" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Division Grid
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("gcf")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeTab === "gcf" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  GCF Formula
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("list")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeTab === "list" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  List Multiples
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("venn")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeTab === "venn" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Venn Diagram
                </button>
              </div>
            </div>

            {/* TAB 1: PRIME FACTORIZATION METHOD */}
            {activeTab === "prime" && (
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-slate-700 dark:text-slate-300">
                  Method 1: Exponential Prime Factorization Breakdown
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {summary.factorizations.map((item) => (
                    <div key={item.num} className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">Number {item.num}</span>
                      <p className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
                        {item.num} = {item.formatted}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <h5 className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Maximum Exponent Rule for LCM:</span>
                  </h5>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Take the highest power of every unique prime factor appearing in any number:
                  </p>
                  <div className="font-mono text-xs font-bold bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400">
                    LCM = {summary.lcmPrimeExpression} = {summary.lcm}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DIVISION GRID / LADDER METHOD */}
            {activeTab === "ladder" && (
              <div className="space-y-3 overflow-x-auto text-xs">
                <h4 className="font-bold text-slate-700 dark:text-slate-300">
                  Method 2: Common Division / Ladder Matrix
                </h4>
                {divisionGrid.rows.length > 0 ? (
                  <div className="space-y-3">
                    <table className="w-full text-left border-collapse font-mono">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                          <th className="p-2 border-r border-slate-200 dark:border-slate-700 text-blue-600">Prime Divisor</th>
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

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono">
                      <span>Multiply outer divisors and remaining quotients: </span>
                      <span className="font-bold text-blue-600">{divisionGrid.lcmProductExpression} = {summary.lcm}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 italic">Enter numbers to generate division ladder grid.</p>
                )}
              </div>
            )}

            {/* TAB 3: GCF FORMULA METHOD */}
            {activeTab === "gcf" && (
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-slate-700 dark:text-slate-300">
                  Method 3: Greatest Common Factor (GCF / Euclidean) Iterative Chain
                </h4>
                <div className="space-y-2">
                  {gcfFormulaData.pairwiseCalculations.map((calc, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1 font-mono">
                      <span className="text-blue-600 font-bold">Step {idx + 1}: Pair ({calc.a}, {calc.b})</span>
                      <p>GCF({calc.a}, {calc.b}) = {calc.gcf}</p>
                      <p className="font-bold text-slate-900 dark:text-slate-100">{calc.formula}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: LIST MULTIPLES METHOD */}
            {activeTab === "list" && (
              <div className="space-y-3 text-xs font-mono">
                <h4 className="font-bold text-slate-700 dark:text-slate-300 font-sans">
                  Method 4: Listing Multiples (Brute Force Search)
                </h4>
                <div className="space-y-2">
                  {listMultiplesData.listData.map((item) => (
                    <div key={item.num} className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                      <span className="font-bold text-blue-600">Multiples of {item.num}:</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.multiples.map((m, idx) => {
                          const isMatch = m === listMultiplesData.targetLcm;
                          return (
                            <span
                              key={idx}
                              className={`px-2 py-0.5 rounded text-xs font-bold ${
                                isMatch
                                  ? "bg-emerald-600 text-white shadow-xs"
                                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              {m}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: VENN DIAGRAM VISUAL REPRESENTATION */}
            {activeTab === "venn" && (
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-slate-700 dark:text-slate-300">
                  Method 5: Interactive SVG Prime Factor Venn Diagram
                </h4>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-3">
                  <svg viewBox="0 0 400 240" className="w-full max-w-md h-auto">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.25" />
                      </linearGradient>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#047857" stopOpacity="0.25" />
                      </linearGradient>
                    </defs>

                    <circle cx="150" cy="120" r="85" fill="url(#grad1)" stroke="#2563eb" strokeWidth="2.5" />
                    <circle cx="250" cy="120" r="85" fill="url(#grad2)" stroke="#059669" strokeWidth="2.5" />

                    <text x="110" y="60" textAnchor="middle" className="text-xs font-bold fill-blue-600 font-sans">
                      {numbers[0] ? `Num (${numbers[0]})` : "Set A"}
                    </text>
                    <text x="290" y="60" textAnchor="middle" className="text-xs font-bold fill-emerald-600 font-sans">
                      {numbers[1] ? `Num (${numbers[1]})` : "Set B"}
                    </text>

                    <text x="200" y="115" textAnchor="middle" className="text-xs font-bold fill-slate-900 dark:fill-slate-100 font-mono">
                      GCF ({summary.gcf})
                    </text>
                    <text x="200" y="135" textAnchor="middle" className="text-[10px] fill-slate-600 dark:fill-slate-400 font-mono">
                      Primes: {summary.gcfPrimeExpression}
                    </text>

                    <text x="200" y="225" textAnchor="middle" className="text-xs font-bold fill-blue-700 dark:fill-blue-400 font-sans">
                      Union Product = LCM ({summary.lcm})
                    </text>
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* EMBEDDED SAVED LCM CALCULATIONS INSIDE CARD 1 */}
          {savedLcmItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved LCM Calculations ({savedLcmItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedLcmItems([]);
                    try { localStorage.removeItem("saved_lcm_calculations"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedLcmItems.map((item) => {
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
                            const updated = savedLcmItems.filter(i => i.id !== item.id);
                            setSavedLcmItems(updated);
                            try { localStorage.setItem("saved_lcm_calculations", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 2: PAIRWISE LCM & GCF PRODUCT IDENTITY (a × b = LCM × GCF) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Pairwise LCM &amp; GCF Product Identity (a × b = LCM × GCF)</span>
          <button
            type="button"
            onClick={handleSavePair}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedPair ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Pairwise Integer Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">First Integer (a)</label>
                  <input
                    type="number"
                    value={pairA}
                    onChange={(e) => setPairA(e.target.value)}
                    placeholder="e.g. 48"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Second Integer (b)</label>
                  <input
                    type="number"
                    value={pairB}
                    onChange={(e) => setPairB(e.target.value)}
                    placeholder="e.g. 60"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: LIVE PAIRWISE MATRIX */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    LCM({pairA}, {pairB})
                  </span>
                  <div className="text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {pairSummary.lcm}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">GCF({pairA}, {pairB})</span>
                    <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{pairSummary.gcf}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Product a × b</span>
                    <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{pairSummary.product}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">LCM × GCF</span>
                    <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{pairSummary.lcm * pairSummary.gcf}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Identity Valid</span>
                    <span className="font-sans tabular-nums text-emerald-600">{pairSummary.productEqualsLcmGcf ? "a×b = LCM×GCF ✓" : "Invalid"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED PAIRWISE LCM SOLVES INSIDE CARD 2 */}
          {savedPairItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Pairwise Solves ({savedPairItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPairItems([]);
                    try { localStorage.removeItem("saved_lcm_pairwise"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedPairItems.map((item) => {
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
                            const updated = savedPairItems.filter(i => i.id !== item.id);
                            setSavedPairItems(updated);
                            try { localStorage.setItem("saved_lcm_pairwise", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Pair: </span>
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

export default LcmCalculator;
