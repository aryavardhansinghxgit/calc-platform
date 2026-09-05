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
  ChevronUp,
  RotateCcw,
  FileSpreadsheet,
  Code,
  AlertCircle
} from "lucide-react";
import {
  computeFactorSummary,
  factorQuadraticTrinomial,
  checkDivisibilityRules,
  getAllPositiveFactors,
  generateFactorTree,
  FactorTreeNode
} from "@/app/calculators/factor-calculator/factor-logic";

export type FactorTab = "pairs" | "tree" | "divisibility";

export interface SavedFactorItem {
  id: string;
  title: string;
  inputs: string;
  rawInput?: string;
  rawInputs?: { a: string; b: string; c: string };
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
  const [copiedFactorResult, setCopiedFactorResult] = useState<boolean>(false);
  const [copiedFactorLatex, setCopiedFactorLatex] = useState<boolean>(false);
  const [copiedCommonResult, setCopiedCommonResult] = useState<boolean>(false);
  const [copiedCommonLatex, setCopiedCommonLatex] = useState<boolean>(false);
  const [copiedQuadResult, setCopiedQuadResult] = useState<boolean>(false);
  const [copiedQuadLatex, setCopiedQuadLatex] = useState<boolean>(false);
  const [restoredToast, setRestoredToast] = useState<string | null>(null);

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

  // Card 1 Validation and Calculations
  const validationError = useMemo(() => {
    const trimmed = numInput.trim();
    if (trimmed === "") {
      return "Please enter a positive integer (N ≥ 1) to factor.";
    }
    if (trimmed.includes(".")) {
      return "Please enter a whole integer. Decimal numbers are not supported.";
    }
    const val = Number(trimmed);
    if (!Number.isInteger(val) || isNaN(val) || !isFinite(val)) {
      return "Please enter a valid positive integer.";
    }
    if (val === 0) {
      return "Please enter a positive integer (N ≥ 1). Zero has infinitely many divisors.";
    }
    if (val < 0) {
      return "Please enter a positive integer (N ≥ 1). Negative numbers are not supported.";
    }
    if (val > 100000000) {
      return "Please enter an integer ≤ 100,000,000 for safe real-time factorization.";
    }
    return null;
  }, [numInput]);

  const numVal = useMemo(() => {
    const trimmed = numInput.trim();
    if (trimmed === "" || trimmed.includes(".")) return null;
    const val = Number(trimmed);
    if (!Number.isInteger(val) || isNaN(val) || !isFinite(val) || val <= 0 || val > 100000000) {
      return null;
    }
    return val;
  }, [numInput]);

  const summary = useMemo(() => {
    if (numVal === null) return null;
    return computeFactorSummary(numVal);
  }, [numVal]);

  const factorTree = useMemo(() => {
    if (numVal === null) return null;
    return generateFactorTree(numVal);
  }, [numVal]);

  const divisibilityRules = useMemo(() => {
    if (numVal === null) return [];
    return checkDivisibilityRules(numVal);
  }, [numVal]);

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
    const a = parseFloat(quadA) || 0;
    const b = parseFloat(quadB) || 0;
    const c = parseFloat(quadC) || 0;
    return factorQuadraticTrinomial(a, b, c);
  }, [quadA, quadB, quadC]);

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setFn(true);
        setTimeout(() => setFn(false), 2000);
      }).catch(() => {
        // Fallback
        setFn(true);
        setTimeout(() => setFn(false), 2000);
      });
    } else {
      setFn(true);
      setTimeout(() => setFn(false), 2000);
    }
  };

  const triggerToast = (msg: string) => {
    setRestoredToast(msg);
    setTimeout(() => setRestoredToast(null), 2500);
  };

  // Card 1 Exports
  const handleCopyFactorResult = () => {
    if (!summary || numVal === null) return;
    const text = [
      `Factors of ${numVal} (${summary.factors.length} total):`,
      summary.factors.join(", "),
      "",
      "Prime Factorization:",
      summary.exponentialPrimeProduct,
      "",
      "Divisor Count:",
      `d(${numVal}) = ${summary.analytics.divisorCount}`,
      "",
      "Sum of Divisors:",
      `σ(${numVal}) = ${summary.analytics.divisorSum}`,
      "",
      "Aliquot Sum:",
      `s(${numVal}) = ${summary.analytics.aliquotSum}`,
      "",
      "Classification:",
      summary.analytics.abundanceCategory,
      "",
      "Square-Free:",
      summary.analytics.isSquareFree ? "Yes" : "No"
    ].join("\n");
    handleCopy(text, setCopiedFactorResult);
  };

  const handleCopyFactorLatex = () => {
    if (!summary || numVal === null) return;
    const latexCanonical = summary.primeFactors.length > 0
      ? summary.primeFactors.map(p => p.count > 1 ? `${p.factor}^${p.count}` : `${p.factor}`).join(" \\times ")
      : `${numVal}`;
    const text = [
      `${numVal} = ${latexCanonical}`,
      `d(${numVal}) = ${summary.analytics.divisorCount}`,
      `\\sigma(${numVal}) = ${summary.analytics.divisorSum}`,
      `s(${numVal}) = ${summary.analytics.aliquotSum}`
    ].join("\n\n");
    handleCopy(text, setCopiedFactorLatex);
  };

  const handleExportFactorCsv = () => {
    if (!summary || numVal === null) return;
    const headers = "Number,Factors,FactorCount,PrimeFactorization,DivisorCount,DivisorSum,AliquotSum,Classification,SquareFree,Timestamp";
    const factorsEscaped = `"${summary.factors.join(", ")}"`;
    const primeEscaped = `"${summary.exponentialPrimeProduct.replace(/"/g, '""')}"`;
    const classification = summary.analytics.abundanceCategory;
    const squareFree = summary.analytics.isSquareFree ? "Yes" : "No";
    const timestamp = `"${new Date().toISOString()}"`;
    const row = `${numVal},${factorsEscaped},${summary.factors.length},${primeEscaped},${summary.analytics.divisorCount},${summary.analytics.divisorSum},${summary.analytics.aliquotSum},${classification},${squareFree},${timestamp}`;
    const blob = new Blob([`${headers}\n${row}\n`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `factor-calculation-${numVal}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Save Card 1 Handler
  const handleSaveFactor = () => {
    if (!summary || numVal === null) return;
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
      rawInput: numInput,
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

  const handleRestoreFactor = (item: SavedFactorItem) => {
    if (item.rawInput) {
      setNumInput(item.rawInput);
      triggerToast(`Restored N = ${item.rawInput}`);
    }
  };

  // Card 2 Exports & Handlers
  const handleCopyCommonResult = () => {
    if (commonNumbers.length === 0) return;
    const text = [
      `Common factors of ${commonNumbers.join(", ")}:`,
      commonFactors.join(", "),
      "",
      `GCF = ${gcfVal}`
    ].join("\n");
    handleCopy(text, setCopiedCommonResult);
  };

  const handleCopyCommonLatex = () => {
    if (commonNumbers.length === 0) return;
    const text = `\\operatorname{GCF}(${commonNumbers.join(",")})=${gcfVal}`;
    handleCopy(text, setCopiedCommonLatex);
  };

  const handleExportCommonCsv = () => {
    if (commonNumbers.length === 0) return;
    const headers = "Input Set,Common Factors,GCF,Timestamp";
    const inputEscaped = `"${commonNumbers.join(", ")}"`;
    const commonEscaped = `"${commonFactors.join(", ")}"`;
    const timestamp = `"${new Date().toISOString()}"`;
    const row = `${inputEscaped},${commonEscaped},${gcfVal},${timestamp}`;
    const blob = new Blob([`${headers}\n${row}\n`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `common-factors.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
      rawInput: commonNumsInput,
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

  const handleRestoreCommon = (item: SavedFactorItem) => {
    if (item.rawInput) {
      setCommonNumsInput(item.rawInput);
      triggerToast(`Restored [${item.rawInput}]`);
    }
  };

  // Card 3 Exports & Handlers
  const handleCopyQuadResult = () => {
    const a = parseFloat(quadA) || 0;
    const b = parseFloat(quadB) || 0;
    const c = parseFloat(quadC) || 0;
    const origExpr = `${a !== 1 ? (a === -1 ? "-" : a) : ""}x² ${b >= 0 ? "+ " + b : "- " + Math.abs(b)}x ${c >= 0 ? "+ " + c : "- " + Math.abs(c)}`;
    const text = [
      `${origExpr} = ${quadResult.factoredString}`,
      "",
      "Roots:",
      quadResult.roots.length > 0 ? quadResult.roots.join(", ") : "None"
    ].join("\n");
    handleCopy(text, setCopiedQuadResult);
  };

  const handleCopyQuadLatex = () => {
    const a = parseFloat(quadA) || 0;
    const b = parseFloat(quadB) || 0;
    const c = parseFloat(quadC) || 0;
    const origExpr = `${a !== 1 ? (a === -1 ? "-" : a) : ""}x^2 ${b >= 0 ? "+ " + b : "- " + Math.abs(b)}x ${c >= 0 ? "+ " + c : "- " + Math.abs(c)}`;
    const text = `${origExpr} = ${quadResult.factoredString}`;
    handleCopy(text, setCopiedQuadLatex);
  };

  const handleExportQuadCsv = () => {
    const headers = "A,B,C,Original Expression,Factored Expression,Roots,Discriminant,Status,Timestamp";
    const a = parseFloat(quadA) || 0;
    const b = parseFloat(quadB) || 0;
    const c = parseFloat(quadC) || 0;
    const orig = `"${a}x^2 + ${b}x + ${c}"`;
    const factored = `"${quadResult.factoredString.replace(/"/g, '""')}"`;
    const roots = `"[${quadResult.roots.join(", ")}]"`;
    const status = quadResult.isFactorable ? "Factorable" : "Not Factorable over Integers";
    const timestamp = `"${new Date().toISOString()}"`;
    const disc = b * b - 4 * a * c;
    const row = `${a},${b},${c},${orig},${factored},${roots},${disc},"${status}",${timestamp}`;
    const blob = new Blob([`${headers}\n${row}\n`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `quadratic-factoring.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
      rawInputs: { a: quadA, b: quadB, c: quadC },
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

  const handleRestoreQuad = (item: SavedFactorItem) => {
    if (item.rawInputs) {
      setQuadA(item.rawInputs.a);
      setQuadB(item.rawInputs.b);
      setQuadC(item.rawInputs.c);
      triggerToast(`Restored quadratic coefficients`);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* RESTORED TOAST NOTIFICATION */}
      {restoredToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 no-print"
        >
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{restoredToast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CARD 1: INTEGER FACTOR & PRIME FACTORIZATION ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <span>Integer Factor &amp; Prime Factorization Engine</span>
          <div className="flex items-center gap-1.5 no-print">
            <button
              type="button"
              onClick={handleCopyFactorResult}
              disabled={numVal === null}
              aria-label="Copy Result"
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy formatted result summary"
            >
              {copiedFactorResult ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedFactorResult ? "Copied!" : "Copy Result"}</span>
            </button>
            <button
              type="button"
              onClick={handleCopyFactorLatex}
              disabled={numVal === null}
              aria-label="Copy LaTeX"
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy LaTeX mathematical formula"
            >
              {copiedFactorLatex ? <Check className="w-3 h-3 text-emerald-300" /> : <Code className="w-3 h-3 text-white" />}
              <span>{copiedFactorLatex ? "Copied!" : "Copy LaTeX"}</span>
            </button>
            <button
              type="button"
              onClick={handleExportFactorCsv}
              disabled={numVal === null}
              aria-label="Export CSV"
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Download RFC CSV file"
            >
              <FileSpreadsheet className="w-3 h-3 text-white" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={handleSaveFactor}
              disabled={numVal === null}
              aria-label="Save Calculation"
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedFactor ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT FORM */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-extrabold text-xs uppercase tracking-wider">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Input Integer to Factor</span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="factor-n-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Positive Integer (N):
                </label>
                <input
                  id="factor-n-input"
                  type="text"
                  inputMode="numeric"
                  value={numInput}
                  onChange={(e) => setNumInput(e.target.value)}
                  placeholder="e.g. 120"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                />
              </div>

              {/* VALIDATION BANNER */}
              {validationError && (
                <div
                  role="alert"
                  className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2 leading-relaxed"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <span className="font-bold block">Input Notice:</span>
                    <span>{validationError}</span>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: HERO RESULTS OR GUIDANCE */}
            <div className="md:col-span-6 space-y-4">
              {summary && numVal !== null ? (
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Total Factors Count d(N)
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                        {summary.analytics.classification} ({summary.analytics.abundanceCategory})
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-extrabold font-sans tabular-nums tracking-tight text-slate-900 dark:text-slate-100">
                        {summary.analytics.divisorCount}
                      </span>
                      <span className="text-lg font-bold text-slate-600 dark:text-slate-400">Factors</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        Prime Exponent Product: {summary.exponentialPrimeProduct}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                      <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">Divisor Sum σ(N)</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">{summary.analytics.divisorSum}</span>
                      </div>
                      <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">Aliquot Sum s(N)</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">{summary.analytics.aliquotSum}</span>
                      </div>
                      <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-bold">Square-Free</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">{summary.analytics.isSquareFree ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center space-y-2">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400 block">
                    Please enter a positive integer (N ≥ 1) on the left to view the factor decomposition.
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 block">
                    Example: 120 produces 16 divisors, prime factorization 2³ × 3 × 5, and interactive factor trees.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* INTERACTIVE SUITE TABS & DERIVATIONS */}
          {summary && numVal !== null && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Interactive Derivations &amp; Factor Tree Suite</span>
                </h3>

                <div role="tablist" aria-label="Factor views" className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl space-x-1 border border-slate-200 dark:border-slate-700 no-print">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "pairs"}
                    onClick={() => setActiveTab("pairs")}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeTab === "pairs"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    Factors &amp; Pairs
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "tree"}
                    onClick={() => setActiveTab("tree")}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeTab === "tree"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    Factor Tree
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "divisibility"}
                    onClick={() => setActiveTab("divisibility")}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeTab === "divisibility"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    Divisibility Rules
                  </button>
                </div>
              </div>

              {/* TAB 1: ALL FACTORS & FACTOR PAIRS */}
              {activeTab === "pairs" && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
                      All Positive Factors of {numVal} ({summary.factors.length} Total):
                    </span>
                    <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                      {summary.factors.map((f) => (
                        <span
                          key={f}
                          className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg border border-slate-200 dark:border-slate-700 font-bold"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
                      Factor Pairs (Positive and Negative):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {summary.factorPairs.map((pair, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs font-mono"
                        >
                          <div className="font-bold text-blue-600 dark:text-blue-400">{pair.formattedPositive}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">{pair.formattedNegative}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: INTERACTIVE FACTOR TREE */}
              {activeTab === "tree" && factorTree && (
                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto flex justify-center animate-in fade-in duration-150">
                  <RenderFactorTreeNode node={factorTree} />
                </div>
              )}

              {/* TAB 3: DIVISIBILITY RULES CHECKER */}
              {activeTab === "divisibility" && (
                <div className="space-y-2 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {divisibilityRules.map((rule) => (
                      <div
                        key={rule.divisor}
                        className={`p-3 rounded-xl border flex items-start justify-between gap-3 ${
                          rule.isDivisible
                            ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60"
                            : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="font-bold text-slate-900 dark:text-slate-100 block">
                            Rule for {rule.divisor}: {rule.isDivisible ? "Divisible ✓" : "Not Divisible"}
                          </span>
                          <span className="text-[11px] text-slate-600 dark:text-slate-400 block leading-tight">
                            {rule.ruleExplanation}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] shrink-0 ${
                            rule.isDivisible
                              ? "bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200"
                              : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {rule.isDivisible ? "YES" : "NO"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* EMBEDDED SAVED FACTOR CALCULATIONS INSIDE CARD 1 */}
          {savedFactorItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 print:break-inside-avoid">
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
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1 no-print"
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
                        <div className="flex items-center gap-2 no-print">
                          <button
                            type="button"
                            onClick={() => handleRestoreFactor(item)}
                            className="text-slate-400 hover:text-blue-600 p-0.5 transition-colors cursor-pointer flex items-center gap-0.5 text-[11px] font-semibold"
                            title="Restore calculation to input"
                            aria-label={`Restore ${item.title}`}
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Load</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedFactorItems.filter(i => i.id !== item.id);
                              setSavedFactorItems(updated);
                              try { localStorage.setItem("saved_factor_calculations", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                            aria-label={`Delete ${item.title}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / N: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer no-print"
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
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <span>Common Factors Finder for Multiple Numbers</span>
          <div className="flex items-center gap-1.5 no-print">
            <button
              type="button"
              onClick={handleCopyCommonResult}
              disabled={commonNumbers.length === 0}
              aria-label="Copy Common Result"
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy common factors summary"
            >
              {copiedCommonResult ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedCommonResult ? "Copied!" : "Copy Result"}</span>
            </button>
            <button
              type="button"
              onClick={handleCopyCommonLatex}
              disabled={commonNumbers.length === 0}
              aria-label="Copy Common LaTeX"
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy LaTeX GCF formula"
            >
              {copiedCommonLatex ? <Check className="w-3 h-3 text-emerald-300" /> : <Code className="w-3 h-3 text-white" />}
              <span>{copiedCommonLatex ? "Copied!" : "Copy LaTeX"}</span>
            </button>
            <button
              type="button"
              onClick={handleExportCommonCsv}
              disabled={commonNumbers.length === 0}
              aria-label="Export Common CSV"
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Download RFC CSV file"
            >
              <FileSpreadsheet className="w-3 h-3 text-white" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={handleSaveCommon}
              disabled={commonNumbers.length === 0}
              aria-label="Save Common Factors"
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedCommon ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Multi-Number Inputs
              </h2>

              <div className="space-y-2">
                <label htmlFor="common-nums-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Integers (Comma or Space Separated):
                </label>
                <input
                  id="common-nums-input"
                  type="text"
                  value={commonNumsInput}
                  onChange={(e) => setCommonNumsInput(e.target.value)}
                  placeholder="e.g. 24, 36, 60"
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  <div className="flex flex-wrap gap-1.5">
                    {commonFactors.length > 0 ? (
                      commonFactors.map((f) => (
                        <span
                          key={f}
                          className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold text-xs rounded-lg border border-blue-200 dark:border-blue-800 font-mono"
                        >
                          {f}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">No common factors found.</span>
                    )}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block uppercase">
                    Greatest Common Factor (GCF)
                  </span>
                  <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                    {gcfVal}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED COMMON FACTORS INSIDE CARD 2 */}
          {savedCommonItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 print:break-inside-avoid">
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
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1 no-print"
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
                        <div className="flex items-center gap-2 no-print">
                          <button
                            type="button"
                            onClick={() => handleRestoreCommon(item)}
                            className="text-slate-400 hover:text-blue-600 p-0.5 transition-colors cursor-pointer flex items-center gap-0.5 text-[11px] font-semibold"
                            title="Restore calculation to input"
                            aria-label={`Restore ${item.title}`}
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Load</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedCommonItems.filter(i => i.id !== item.id);
                              setSavedCommonItems(updated);
                              try { localStorage.setItem("saved_factor_common", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                            aria-label={`Delete ${item.title}`}
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
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer no-print"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Shared Details:
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
      {/* CARD 3: QUADRATIC TRINOMIAL FACTORING */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <span>Quadratic Trinomial Factoring (a x² + b x + c)</span>
          <div className="flex items-center gap-1.5 no-print">
            <button
              type="button"
              onClick={handleCopyQuadResult}
              aria-label="Copy Quadratic Result"
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy factored expression and roots"
            >
              {copiedQuadResult ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedQuadResult ? "Copied!" : "Copy Result"}</span>
            </button>
            <button
              type="button"
              onClick={handleCopyQuadLatex}
              aria-label="Copy Quadratic LaTeX"
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy LaTeX formula"
            >
              {copiedQuadLatex ? <Check className="w-3 h-3 text-emerald-300" /> : <Code className="w-3 h-3 text-white" />}
              <span>{copiedQuadLatex ? "Copied!" : "Copy LaTeX"}</span>
            </button>
            <button
              type="button"
              onClick={handleExportQuadCsv}
              aria-label="Export Quadratic CSV"
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Download RFC CSV file"
            >
              <FileSpreadsheet className="w-3 h-3 text-white" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={handleSaveQuad}
              aria-label="Save Quadratic Factoring"
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedQuad ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Quadratic Coefficients
              </h2>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label htmlFor="quad-a-input" className="text-[11px] font-bold text-slate-500">Coeff a:</label>
                  <input
                    id="quad-a-input"
                    type="number"
                    value={quadA}
                    onChange={(e) => setQuadA(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="quad-b-input" className="text-[11px] font-bold text-slate-500">Coeff b:</label>
                  <input
                    id="quad-b-input"
                    type="number"
                    value={quadB}
                    onChange={(e) => setQuadB(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="quad-c-input" className="text-[11px] font-bold text-slate-500">Coeff c:</label>
                  <input
                    id="quad-c-input"
                    type="number"
                    value={quadC}
                    onChange={(e) => setQuadC(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 print:break-inside-avoid">
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
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1 no-print"
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
                        <div className="flex items-center gap-2 no-print">
                          <button
                            type="button"
                            onClick={() => handleRestoreQuad(item)}
                            className="text-slate-400 hover:text-blue-600 p-0.5 transition-colors cursor-pointer flex items-center gap-0.5 text-[11px] font-semibold"
                            title="Restore calculation to input"
                            aria-label={`Restore ${item.title}`}
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Load</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedQuadItems.filter(i => i.id !== item.id);
                              setSavedQuadItems(updated);
                              try { localStorage.setItem("saved_factor_quadratic", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                            aria-label={`Delete ${item.title}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Coefficients: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer no-print"
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
