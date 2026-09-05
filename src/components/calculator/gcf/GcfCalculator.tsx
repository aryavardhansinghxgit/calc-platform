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
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  RotateCcw
} from "lucide-react";
import {
  parseGcfNumbersInput,
  computeGcfSummary,
  generateEuclideanDivisionSteps,
  generateBezoutIdentity,
  generateDivisionGridMethod
} from "@/app/calculators/gcf-calculator/gcf-logic";

export type GcfMethodTab = "prime" | "euclidean" | "ladder" | "list" | "bezout" | "venn";

export interface SavedGcfItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
  rawInput?: string;
  rawA?: string;
  rawB?: string;
}

export function formatPrimeSuperscript(expr: string): string {
  if (!expr) return "";
  const superscripts: Record<string, string> = {
    "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
    "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹"
  };
  return expr.replace(/\^(\d+)/g, (_, digits) =>
    digits.split("").map((d: string) => superscripts[d] || d).join("")
  );
}

export function formatGcfLatex(nums: number[], gcf: number, primeExpr?: string): string {
  const numList = nums.join(",");
  if (primeExpr && primeExpr !== `${gcf}` && primeExpr !== "1") {
    const latexPrime = primeExpr
      .replace(/\s*×\s*/g, "\\times")
      .replace(/\^(\d+)/g, "^$1");
    return `\\operatorname{GCF}(${numList})=${latexPrime}=${gcf}`;
  }
  return `\\operatorname{GCF}(${numList})=${gcf}`;
}

export function GcfCalculator() {
  // Card 1 Inputs: Multi-number GCF / HCF
  const [inputStr, setInputStr] = useState<string>("36, 54, 90");
  const [activeTab, setActiveTab] = useState<GcfMethodTab>("prime");

  // Card 2 Inputs: Pairwise GCF & Bezout Coefficients
  const [pairA, setPairA] = useState<string>("48");
  const [pairB, setPairB] = useState<string>("180");

  // Feedback states
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);
  const [copiedPairResult, setCopiedPairResult] = useState<boolean>(false);
  const [copiedPairLatex, setCopiedPairLatex] = useState<boolean>(false);
  const [copiedTable, setCopiedTable] = useState<boolean>(false);
  const [copiedExplanation, setCopiedExplanation] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Saved calculation states for Card 1 & Card 2
  const [savedGcfItems, setSavedGcfItems] = useState<SavedGcfItem[]>([]);
  const [justSavedGcf, setJustSavedGcf] = useState<boolean>(false);

  const [savedPairItems, setSavedPairItems] = useState<SavedGcfItem[]>([]);
  const [justSavedPair, setJustSavedPair] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedGcf = localStorage.getItem("saved_gcf_calculations");
      if (storedGcf) setSavedGcfItems(JSON.parse(storedGcf));

      const storedPair = localStorage.getItem("saved_gcf_pairwise");
      if (storedPair) setSavedPairItems(JSON.parse(storedPair));
    } catch (e) {}
  }, []);

  // Parse input & calculate Card 1
  const numbers = useMemo(() => parseGcfNumbersInput(inputStr), [inputStr]);
  const summary = useMemo(() => computeGcfSummary(numbers), [numbers]);
  const euclideanData = useMemo(() => generateEuclideanDivisionSteps(numbers), [numbers]);
  const bezoutDataCard1 = useMemo(() => {
    if (numbers.length >= 2) {
      return generateBezoutIdentity(numbers[0], numbers[1]);
    }
    return null;
  }, [numbers]);
  const divisionGrid = useMemo(() => generateDivisionGridMethod(numbers), [numbers]);

  // Card 2 Pairwise Calculation & Bezout Identity
  const pairNumbers = useMemo(() => {
    const a = parseInt(pairA, 10);
    const b = parseInt(pairB, 10);
    const list: number[] = [];
    if (!isNaN(a) && a > 0) list.push(a);
    if (!isNaN(b) && b > 0) list.push(b);
    return list;
  }, [pairA, pairB]);

  const pairSummary = useMemo(() => computeGcfSummary(pairNumbers), [pairNumbers]);

  const bezoutDataCard2 = useMemo(() => {
    if (pairNumbers.length >= 2) {
      return generateBezoutIdentity(pairNumbers[0], pairNumbers[1]);
    }
    return null;
  }, [pairNumbers]);

  const fallbackCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setFn(true);
      setTimeout(() => setFn(false), 2000);
    } catch (err) {}
  };

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      if (typeof navigator !== "undefined" && navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(
          () => {
            setFn(true);
            setTimeout(() => setFn(false), 2000);
          },
          () => {
            fallbackCopy(text, setFn);
          }
        );
      } else {
        fallbackCopy(text, setFn);
      }
    } catch (e) {
      fallbackCopy(text, setFn);
    }
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("q", inputStr);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    handleCopy(shareableUrl, setCopiedUrl);
  };

  const handleExportCsv = () => {
    if (numbers.length === 0) return;
    const primeStr = formatPrimeSuperscript(summary.gcfPrimeExpression);
    const now = new Date().toISOString();

    const headers = ["Input Set", "GCF", "LCM", "Prime Factorization", "Method", "Timestamp"];
    const row = [
      `[${numbers.join(", ")}]`,
      `${summary.gcf}`,
      `${summary.lcm}`,
      `${primeStr}`,
      "GCF Calculator",
      now
    ];

    const escapeCsv = (val: string) => `"${val.replace(/"/g, '""')}"`;
    const csvContent = [
      headers.map(escapeCsv).join(","),
      row.map(escapeCsv).join(",")
    ].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute("download", `gcf-calculation-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Save Card 1 Handler
  const handleSaveGcf = () => {
    if (numbers.length === 0) return;

    const inputsStr = `Integers: [${numbers.join(", ")}]`;
    const opStr = `Greatest Common Factor (GCF / HCF) Calculation`;
    const resList = [
      `Greatest Common Factor (GCF / HCF) = ${summary.gcf}`,
      `Prime Factor Form = ${summary.gcfPrimeExpression}`,
      `Least Common Multiple (LCM) = ${summary.lcm}`,
      `Simplified Ratio = ${summary.simplifiedRatio || "1 : 1"}`,
      `Shared Factors Intersection = [${summary.sharedFactorsIntersection.join(", ")}]`
    ];

    const newItem: SavedGcfItem = {
      id: Date.now().toString(),
      title: `GCF/HCF([${numbers.join(", ")}])`,
      inputs: inputsStr,
      rawInput: inputStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `GCF = ${summary.gcf}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedGcfItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedGcfItems(updated);
    try {
      localStorage.setItem("saved_gcf_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedGcf(true);
    setTimeout(() => setJustSavedGcf(false), 2000);
  };

  const handleRestoreGcf = (item: SavedGcfItem) => {
    if (item.rawInput !== undefined) {
      setInputStr(item.rawInput);
    } else {
      const match = item.inputs.match(/\[(.*?)\]/) || item.title.match(/\[(.*?)\]/);
      if (match && match[1]) {
        setInputStr(match[1]);
      }
    }
  };

  // Save Card 2 Handler
  const handleSavePair = () => {
    if (pairNumbers.length < 2) return;

    const inputsStr = `a: ${pairA}, b: ${pairB}`;
    const opStr = `Pairwise GCF & Bézout Coefficients (a·x + b·y = GCF)`;
    const resList = [
      `GCF(${pairA}, ${pairB}) = ${pairSummary.gcf}`,
      `LCM(${pairA}, ${pairB}) = ${pairSummary.lcm}`,
      `Bézout Equation = ${bezoutDataCard2 ? bezoutDataCard2.identityStr : "N/A"}`,
      `Coefficients = x = ${bezoutDataCard2 ? bezoutDataCard2.x : "N/A"}, y = ${bezoutDataCard2 ? bezoutDataCard2.y : "N/A"}`,
      `Coprime Status = ${pairSummary.isCoprime ? "Yes (Coprime)" : "No"}`
    ];

    const newItem: SavedGcfItem = {
      id: Date.now().toString(),
      title: `Pairwise GCF(${pairA}, ${pairB})`,
      inputs: inputsStr,
      rawA: pairA,
      rawB: pairB,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `GCF(${pairA}, ${pairB}) = ${pairSummary.gcf}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedPairItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedPairItems(updated);
    try {
      localStorage.setItem("saved_gcf_pairwise", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedPair(true);
    setTimeout(() => setJustSavedPair(false), 2000);
  };

  const handleRestorePair = (item: SavedGcfItem) => {
    if (item.rawA !== undefined && item.rawB !== undefined) {
      setPairA(item.rawA);
      setPairB(item.rawB);
    } else {
      const match = item.inputs.match(/a:\s*(\d+),\s*b:\s*(\d+)/);
      if (match) {
        setPairA(match[1]);
        setPairB(match[2]);
      }
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: GREATEST COMMON FACTOR (GCF / HCF / GCD) SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Greatest Common Factor (GCF / HCF / GCD) Solver</span>
          <button
            type="button"
            onClick={handleSaveGcf}
            className="no-print bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedGcf ? "Saved!" : "Save"}</span>
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
              </div>

              <div className="space-y-2">
                <textarea
                  rows={3}
                  value={inputStr}
                  onChange={(e) => setInputStr(e.target.value)}
                  placeholder="e.g. 36, 54, 90 or 48 180"
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
            </div>

            {/* RIGHT COLUMN: HERO RESULT DISPLAY */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Greatest Common Factor (GCF / HCF)
                  </span>
                  {summary.isCoprime ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> Coprime (GCF = 1)
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      Evaluated
                    </span>
                  )}
                </div>

                <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight break-all">
                  {summary.gcf}
                </div>
                <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  Prime Factor Form: {summary.gcfPrimeExpression}
                </p>

                {/* USER-FACING CONTROLS: COPY RESULT, COPY LATEX, EXPORT CSV */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 no-print">
                  <button
                    type="button"
                    onClick={() => {
                      const primeFormatted = formatPrimeSuperscript(summary.gcfPrimeExpression);
                      const copyStr = [
                        `GCF(${numbers.join(", ")}) = ${summary.gcf}`,
                        `LCM(${numbers.join(", ")}) = ${summary.lcm}`,
                        `Prime factorization of GCF: ${primeFormatted}`
                      ].join("\n");
                      handleCopy(copyStr, setCopiedResult);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                    aria-label="Copy Result"
                    title="Copy calculation summary to clipboard"
                  >
                    {copiedResult ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copiedResult ? "Copied!" : "Copy Result"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const latexStr = formatGcfLatex(numbers, summary.gcf, summary.gcfPrimeExpression);
                      handleCopy(latexStr, setCopiedLatex);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                    aria-label="Copy LaTeX"
                    title="Copy LaTeX formula to clipboard"
                  >
                    {copiedLatex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <FileText className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copiedLatex ? "Copied LaTeX!" : "Copy LaTeX"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 transition-colors cursor-pointer"
                    aria-label="Export CSV"
                    title="Export calculation as CSV"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Export CSV</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-400 block uppercase">LCM Result</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{summary.lcm}</span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-400 block uppercase">Simplified Ratio</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{summary.simplifiedRatio || "1 : 1"}</span>
                  </div>
                </div>

                {summary.sharedFactorsIntersection.length > 0 && (
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold space-y-1">
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                      Shared Common Factors Intersection (F₁ ∩ F₂):
                    </span>
                    <p className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      [{summary.sharedFactorsIntersection.join(", ")}]
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
                  onClick={() => setActiveTab("euclidean")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeTab === "euclidean" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Euclidean Algorithm
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
                  onClick={() => setActiveTab("list")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeTab === "list" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  List Factors
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("bezout")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeTab === "bezout" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Bézout's Identity
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
                    <span>Minimum Exponent Rule for GCF:</span>
                  </h5>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Take the lowest common power of every shared prime factor present across all numbers:
                  </p>
                  <div className="font-mono text-xs font-bold bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400">
                    GCF = {summary.gcfPrimeExpression} = {summary.gcf}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: EUCLIDEAN ALGORITHM */}
            {activeTab === "euclidean" && (
              <div className="space-y-3 overflow-x-auto text-xs">
                <h4 className="font-bold text-slate-700 dark:text-slate-300">
                  Method 2: Euclidean Algorithm (Division &amp; Remainder Method)
                </h4>
                <div className="space-y-3 font-mono">
                  <table className="w-full text-left border-collapse">
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
              <div className="space-y-3 overflow-x-auto text-xs">
                <h4 className="font-bold text-slate-700 dark:text-slate-300">
                  Method 3: Common Division / Ladder Matrix
                </h4>
                {divisionGrid.rows.length > 0 ? (
                  <div className="space-y-3">
                    <table className="w-full text-left border-collapse font-mono">
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

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono">
                      <span>Multiply vertical common prime divisors: </span>
                      <span className="font-bold text-blue-600">{divisionGrid.gcfProductExpression} = {summary.gcf}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 italic font-sans">No shared common prime factors. GCF = 1 (Coprime).</p>
                )}
              </div>
            )}

            {/* TAB 4: LIST ALL FACTORS METHOD */}
            {activeTab === "list" && (
              <div className="space-y-3 overflow-x-auto text-xs font-mono">
                <h4 className="font-bold text-slate-700 dark:text-slate-300 font-sans">
                  Method 4: Listing All Factors &amp; Shared Set Intersection (F₁ ∩ F₂)
                </h4>
                <div className="space-y-2">
                  {summary.factorizations.map((item) => (
                    <div key={item.num} className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                      <div className="flex justify-between items-center font-sans">
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

                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 font-sans">
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
              <div className="space-y-3 text-xs font-mono">
                <h4 className="font-bold text-slate-700 dark:text-slate-300 font-sans">
                  Method 5: Extended Euclidean Algorithm &amp; Bézout's Identity [a·x + b·y = GCF(a, b)]
                </h4>
                {bezoutDataCard1 ? (
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <h5 className="font-bold text-blue-600 font-sans">Bézout's Equation:</h5>
                    <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                      {bezoutDataCard1.identityStr}
                    </p>
                    <p className="text-[11px] text-slate-500 font-sans">
                      Bézout coefficients for pair ({bezoutDataCard1.a}, {bezoutDataCard1.b}): x = {bezoutDataCard1.x}, y = {bezoutDataCard1.y}
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-500 italic font-sans">Bézout's identity is computed for the primary pair of numbers.</p>
                )}
              </div>
            )}

            {/* TAB 6: VENN DIAGRAM VISUAL REPRESENTATION */}
            {activeTab === "venn" && (
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-slate-700 dark:text-slate-300">
                  Method 6: Interactive SVG Prime Factor Venn Diagram
                </h4>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-3">
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

                    <circle cx="150" cy="120" r="85" fill="url(#gcfGrad1)" stroke="#2563eb" strokeWidth="2.5" />
                    <circle cx="250" cy="120" r="85" fill="url(#gcfGrad2)" stroke="#059669" strokeWidth="2.5" />

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

          {/* EMBEDDED SAVED GCF CALCULATIONS INSIDE CARD 1 */}
          {savedGcfItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved GCF / HCF Calculations ({savedGcfItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedGcfItems([]);
                    try { localStorage.removeItem("saved_gcf_calculations"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedGcfItems.map((item) => {
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
                        <div className="flex items-center gap-1.5 no-print">
                          <button
                            type="button"
                            onClick={() => handleRestoreGcf(item)}
                            className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                            title="Load this calculation into active inputs"
                            aria-label="Load calculation"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Load</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedGcfItems.filter(i => i.id !== item.id);
                              setSavedGcfItems(updated);
                              try { localStorage.setItem("saved_gcf_calculations", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                            aria-label="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
      {/* CARD 2: PAIRWISE GCF & BÉZOUT COEFFICIENTS (a·x + b·y = GCF) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Pairwise GCF &amp; Bézout Coefficients (a·x + b·y = GCF)</span>
          <button
            type="button"
            onClick={handleSavePair}
            className="no-print bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
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
                    placeholder="e.g. 180"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: LIVE PAIRWISE MATRIX & BEZOUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      GCF({pairA}, {pairB})
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      Evaluated
                    </span>
                  </div>
                  <div className="text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {pairSummary.gcf}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 no-print">
                    <button
                      type="button"
                      onClick={() => {
                        const copyStr = [
                          `GCF(${pairA}, ${pairB}) = ${pairSummary.gcf}`,
                          `LCM(${pairA}, ${pairB}) = ${pairSummary.lcm}`,
                          bezoutDataCard2 ? `Bézout identity: ${bezoutDataCard2.identityStr}` : ""
                        ].filter(Boolean).join("\n");
                        handleCopy(copyStr, setCopiedPairResult);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                      aria-label="Copy Pairwise Result"
                      title="Copy pairwise calculation summary"
                    >
                      {copiedPairResult ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{copiedPairResult ? "Copied!" : "Copy Result"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        let latex = `\\operatorname{GCF}(${pairA},${pairB})=${pairSummary.gcf}`;
                        if (bezoutDataCard2) {
                          const yFormatted = bezoutDataCard2.y < 0 ? `(${bezoutDataCard2.y})` : `${bezoutDataCard2.y}`;
                          const bezoutLatex = `${bezoutDataCard2.a}\\times${bezoutDataCard2.x}+${bezoutDataCard2.b}\\times${yFormatted}=${bezoutDataCard2.gcf}`;
                          latex += `\n${bezoutLatex}`;
                        }
                        handleCopy(latex, setCopiedPairLatex);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                      aria-label="Copy Pairwise LaTeX"
                      title="Copy LaTeX formula"
                    >
                      {copiedPairLatex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <FileText className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{copiedPairLatex ? "Copied LaTeX!" : "Copy LaTeX"}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">LCM({pairA}, {pairB})</span>
                    <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{pairSummary.lcm}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Coprime Status</span>
                    <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{pairSummary.isCoprime ? "Coprime (GCF=1)" : "Not Coprime"}</span>
                  </div>
                </div>

                {bezoutDataCard2 && (
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                      Bézout Identity Equation:
                    </span>
                    <p className="font-mono text-slate-900 dark:text-slate-100">
                      {bezoutDataCard2.identityStr}
                    </p>
                    <p className="text-[11px] text-slate-500 font-sans">
                      Coefficients: x = {bezoutDataCard2.x}, y = {bezoutDataCard2.y}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED PAIRWISE GCF SOLVES INSIDE CARD 2 */}
          {savedPairItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Pairwise GCF Solves ({savedPairItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPairItems([]);
                    try { localStorage.removeItem("saved_gcf_pairwise"); } catch(e){}
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
                        <div className="flex items-center gap-1.5 no-print">
                          <button
                            type="button"
                            onClick={() => handleRestorePair(item)}
                            className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                            title="Load this pairwise calculation into active inputs"
                            aria-label="Load pairwise calculation"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Load</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedPairItems.filter(i => i.id !== item.id);
                              setSavedPairItems(updated);
                              try { localStorage.setItem("saved_gcf_pairwise", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                            aria-label="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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

export default GcfCalculator;
