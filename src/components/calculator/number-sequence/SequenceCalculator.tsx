"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Sliders,
  Layers,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Copy,
  Check,
  Download,
  Code,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  FunctionSquare
} from "lucide-react";
import {
  parseSequenceInputWithValidation,
  detectSequencePattern,
  generateFiniteDifferenceTable,
  computeFibonacciBinet,
  evaluateCustomFunction,
  analyzeSeriesConvergence
} from "@/app/calculators/number-sequence-calculator/sequence-logic";

export type VisualTab = "plot" | "table";

export interface SavedSequenceItem {
  id: string;
  module: "auto" | "progression" | "recurrence" | "custom";
  title: string;
  inputs: string;
  rawInputs: {
    rawInput?: string;
    targetN?: number;
    progType?: "arithmetic" | "geometric";
    progA1?: string;
    progDiffRatio?: string;
    progN?: number;
    fibMode?: "fibonacci" | "lucas";
    fibN?: number;
    customExpr?: string;
    customN?: number;
  };
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function SequenceCalculator() {
  // ---------------------------------------------------------------------------
  // Card 1 State: Auto Sequence Pattern Recognition
  // ---------------------------------------------------------------------------
  const [rawInput, setRawInput] = useState<string>("2, 5, 10, 17, 26");
  const [targetN, setTargetN] = useState<number>(10);
  const [activeVisual, setActiveVisual] = useState<VisualTab>("plot");

  // ---------------------------------------------------------------------------
  // Card 2 State: Arithmetic & Geometric Progression
  // ---------------------------------------------------------------------------
  const [progType, setProgType] = useState<"arithmetic" | "geometric">("arithmetic");
  const [progA1, setProgA1] = useState<string>("3");
  const [progDiffRatio, setProgDiffRatio] = useState<string>("4");
  const [progN, setProgN] = useState<number>(10);

  // ---------------------------------------------------------------------------
  // Card 3 State: Fibonacci & Lucas Recurrence Engine
  // ---------------------------------------------------------------------------
  const [fibMode, setFibMode] = useState<"fibonacci" | "lucas">("fibonacci");
  const [fibN, setFibN] = useState<number>(12);

  // ---------------------------------------------------------------------------
  // Card 4 State: Custom Function Evaluator & Series Convergence Checker
  // ---------------------------------------------------------------------------
  const [customExpr, setCustomExpr] = useState<string>("n^2 + 1");
  const [customN, setCustomN] = useState<number>(10);

  // ---------------------------------------------------------------------------
  // Copy / Notification State
  // ---------------------------------------------------------------------------
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // Saved calculation states
  // ---------------------------------------------------------------------------
  const [savedAutoItems, setSavedAutoItems] = useState<SavedSequenceItem[]>([]);
  const [justSavedAuto, setJustSavedAuto] = useState<boolean>(false);

  const [savedProgItems, setSavedProgItems] = useState<SavedSequenceItem[]>([]);
  const [justSavedProg, setJustSavedProg] = useState<boolean>(false);

  const [savedFibItems, setSavedFibItems] = useState<SavedSequenceItem[]>([]);
  const [justSavedFib, setJustSavedFib] = useState<boolean>(false);

  const [savedCustomItems, setSavedCustomItems] = useState<SavedSequenceItem[]>([]);
  const [justSavedCustom, setJustSavedCustom] = useState<boolean>(false);

  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedAuto = localStorage.getItem("saved_seq_auto");
      if (storedAuto) setSavedAutoItems(JSON.parse(storedAuto));

      const storedProg = localStorage.getItem("saved_seq_progression");
      if (storedProg) setSavedProgItems(JSON.parse(storedProg));

      const storedFib = localStorage.getItem("saved_seq_fibonacci");
      if (storedFib) setSavedFibItems(JSON.parse(storedFib));

      const storedCustom = localStorage.getItem("saved_seq_custom");
      if (storedCustom) setSavedCustomItems(JSON.parse(storedCustom));
    } catch (e) {}
  }, []);

  // ---------------------------------------------------------------------------
  // Card 1 Calculations
  // ---------------------------------------------------------------------------
  const { numbers: terms, ignoredTokens } = useMemo(
    () => parseSequenceInputWithValidation(rawInput),
    [rawInput]
  );
  const analysis = useMemo(
    () => detectSequencePattern(terms, targetN, ignoredTokens),
    [terms, targetN, ignoredTokens]
  );
  const diffTable = useMemo(() => generateFiniteDifferenceTable(terms), [terms]);

  // ---------------------------------------------------------------------------
  // Card 2 Calculations: Explicit Progression Solver
  // ---------------------------------------------------------------------------
  const { progTargetTerm, progSum, progFormula, progLatex, progTermsList } = useMemo(() => {
    const a1 = parseFloat(progA1) || 0;
    const dr = parseFloat(progDiffRatio) || 0;
    const n = Math.max(1, Math.min(100, progN));

    let targetTerm = 0;
    let sum = 0;
    let formula = "";
    let latex = "";
    const list: number[] = [];

    if (progType === "arithmetic") {
      targetTerm = a1 + (n - 1) * dr;
      sum = (n / 2) * (2 * a1 + (n - 1) * dr);
      formula = `a_n = ${a1} + (n - 1) × (${dr})`;
      latex = `a_n = ${a1} + (n - 1)(${dr})`;
      for (let i = 1; i <= Math.min(n, 12); i++) {
        list.push(parseFloat((a1 + (i - 1) * dr).toFixed(4)));
      }
    } else {
      targetTerm = a1 * Math.pow(dr, n - 1);
      sum = Math.abs(dr - 1) < 1e-9 ? a1 * n : (a1 * (1 - Math.pow(dr, n))) / (1 - dr);
      formula = `a_n = ${a1} × (${dr})^(n - 1)`;
      latex = `a_n = ${a1} \\cdot (${dr})^{n - 1}`;
      for (let i = 1; i <= Math.min(n, 12); i++) {
        list.push(parseFloat((a1 * Math.pow(dr, i - 1)).toFixed(4)));
      }
    }

    return {
      progTargetTerm: targetTerm,
      progSum: sum,
      progFormula: formula,
      progLatex: latex,
      progTermsList: list
    };
  }, [progType, progA1, progDiffRatio, progN]);

  // ---------------------------------------------------------------------------
  // Card 3 Calculations: Fibonacci & Lucas Recurrence Engine
  // ---------------------------------------------------------------------------
  const { fibTerm, fibTermsList, fibPhiApprox, fibLatex } = useMemo(() => {
    const n = Math.max(1, Math.min(50, fibN));
    const list: number[] = [];

    if (fibMode === "fibonacci") {
      for (let i = 1; i <= n; i++) {
        list.push(computeFibonacciBinet(i));
      }
      const current = list[list.length - 1] || 1;
      const prev = list[list.length - 2] || 1;
      return {
        fibTerm: current,
        fibTermsList: list,
        fibPhiApprox: prev === 0 ? 1.61803398 : current / prev,
        fibLatex: `F_{${n}} = \\frac{\\Phi^{${n}} - \\psi^{${n}}}{\\sqrt{5}} = ${current}`
      };
    } else {
      // Lucas numbers: L1 = 1, L2 = 3, L_n = L_{n-1} + L_{n-2} (Standard 1-indexed)
      let l1 = 1;
      let l2 = 3;
      list.push(l1);
      if (n >= 2) list.push(l2);
      for (let i = 3; i <= n; i++) {
        const next = l1 + l2;
        l1 = l2;
        l2 = next;
        list.push(next);
      }
      const current = list[list.length - 1] || 1;
      const prev = list[list.length - 2] || 1;
      return {
        fibTerm: current,
        fibTermsList: list,
        fibPhiApprox: prev === 0 ? 1.61803398 : current / prev,
        fibLatex: `L_{${n}} = L_{${n - 1}} + L_{${n - 2}} = ${current}`
      };
    }
  }, [fibMode, fibN]);

  // ---------------------------------------------------------------------------
  // Card 4 Calculations: Custom Function Evaluator & Convergence Checker
  // ---------------------------------------------------------------------------
  const customEvalResult = useMemo(() => {
    try {
      const n = Math.max(1, Math.min(100, customN));
      const targetVal = evaluateCustomFunction(customExpr, n);

      let sum = 0;
      const termsPreview: number[] = [];
      for (let i = 1; i <= Math.min(n, 15); i++) {
        const v = evaluateCustomFunction(customExpr, i);
        termsPreview.push(parseFloat(v.toFixed(4)));
      }
      for (let i = 1; i <= n; i++) {
        sum += evaluateCustomFunction(customExpr, i);
      }

      const convergence = analyzeSeriesConvergence((k) => evaluateCustomFunction(customExpr, k));

      return {
        targetVal: parseFloat(targetVal.toFixed(4)),
        sumVal: parseFloat(sum.toFixed(4)),
        termsPreview,
        convergence,
        error: null
      };
    } catch (err: any) {
      return {
        targetVal: 0,
        sumVal: 0,
        termsPreview: [],
        convergence: null,
        error: err.message || "Invalid expression"
      };
    }
  }, [customExpr, customN]);

  // ---------------------------------------------------------------------------
  // Universal Copy & CSV Handlers
  // ---------------------------------------------------------------------------
  const triggerCopy = (text: string, label: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopyStatus(label);
      setTimeout(() => setCopyStatus(null), 2000);
    } catch (e) {
      setCopyStatus("Error copying");
      setTimeout(() => setCopyStatus(null), 2000);
    }
  };

  const exportCSV = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const csvContent = [
      headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(","),
      ...rows.map((row) =>
        row
          .map((cell) => {
            const str = String(cell);
            return `"${str.replace(/"/g, '""')}"`;
          })
          .join(",")
      )
    ].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ---------------------------------------------------------------------------
  // Save Handlers with Raw Inputs
  // ---------------------------------------------------------------------------
  const handleSaveAuto = () => {
    const inputsStr = `Sequence: [${terms.slice(0, 5).join(", ")}...], Target n = ${targetN}`;
    const resList = [
      `Type = ${analysis.typeName}`,
      `Explicit Formula a_n = ${analysis.explicitFormula}`,
      `Target Term a_${targetN} = ${analysis.targetTerm}`,
      `First Term a_1 = ${analysis.firstTerm}`,
      `Partial Sum S_${targetN} = ${analysis.partialSum}`
    ];

    const newItem: SavedSequenceItem = {
      id: Date.now().toString(),
      module: "auto",
      title: `${analysis.typeName} (${analysis.explicitFormula})`,
      inputs: inputsStr,
      rawInputs: { rawInput, targetN },
      result: resList.join(" | "),
      resultsList: resList,
      expression: analysis.explicitFormula,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedAutoItems.filter((i) => i.inputs !== inputsStr)].slice(0, 15);
    setSavedAutoItems(updated);
    try {
      localStorage.setItem("saved_seq_auto", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedAuto(true);
    setTimeout(() => setJustSavedAuto(false), 2000);
  };

  const handleSaveProg = () => {
    const inputsStr = `Type: ${progType}, a1: ${progA1}, ${progType === "arithmetic" ? "d" : "r"}: ${progDiffRatio}, n: ${progN}`;
    const resList = [
      `Formula = ${progFormula}`,
      `Target Term a_${progN} = ${progTargetTerm.toFixed(4)}`,
      `Sum S_${progN} = ${progSum.toFixed(4)}`,
      `Generated Terms = [${progTermsList.join(", ")}]`
    ];

    const newItem: SavedSequenceItem = {
      id: Date.now().toString(),
      module: "progression",
      title: `${progType.toUpperCase()} (a_${progN}=${progTargetTerm.toFixed(2)})`,
      inputs: inputsStr,
      rawInputs: { progType, progA1, progDiffRatio, progN },
      result: resList.join(" | "),
      resultsList: resList,
      expression: progFormula,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedProgItems.filter((i) => i.inputs !== inputsStr)].slice(0, 15);
    setSavedProgItems(updated);
    try {
      localStorage.setItem("saved_seq_progression", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedProg(true);
    setTimeout(() => setJustSavedProg(false), 2000);
  };

  const handleSaveFib = () => {
    const inputsStr = `Recurrence: ${fibMode === "fibonacci" ? "Fibonacci (F_n)" : "Lucas (L_n)"}, n: ${fibN}`;
    const resList = [
      `n-th Term = ${fibTerm}`,
      `Golden Ratio φ Approx = ${fibPhiApprox.toFixed(8)}`,
      `Sequence = [${fibTermsList.join(", ")}]`
    ];

    const newItem: SavedSequenceItem = {
      id: Date.now().toString(),
      module: "recurrence",
      title: `${fibMode === "fibonacci" ? "Fibonacci" : "Lucas"} (${fibMode === "fibonacci" ? "F" : "L"}_${fibN}=${fibTerm})`,
      inputs: inputsStr,
      rawInputs: { fibMode, fibN },
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Term ${fibN} = ${fibTerm}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedFibItems.filter((i) => i.inputs !== inputsStr)].slice(0, 15);
    setSavedFibItems(updated);
    try {
      localStorage.setItem("saved_seq_fibonacci", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedFib(true);
    setTimeout(() => setJustSavedFib(false), 2000);
  };

  const handleSaveCustom = () => {
    if (customEvalResult.error) return;
    const inputsStr = `Function a_n = ${customExpr}, Target n = ${customN}`;
    const resList = [
      `Expression = ${customExpr}`,
      `Target a_${customN} = ${customEvalResult.targetVal}`,
      `Sum S_${customN} = ${customEvalResult.sumVal}`,
      `Convergence = ${customEvalResult.convergence?.summary || "N/A"}`
    ];

    const newItem: SavedSequenceItem = {
      id: Date.now().toString(),
      module: "custom",
      title: `Custom a_n = ${customExpr} (n=${customN})`,
      inputs: inputsStr,
      rawInputs: { customExpr, customN },
      result: resList.join(" | "),
      resultsList: resList,
      expression: `a_n = ${customExpr}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedCustomItems.filter((i) => i.inputs !== inputsStr)].slice(0, 15);
    setSavedCustomItems(updated);
    try {
      localStorage.setItem("saved_seq_custom", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedCustom(true);
    setTimeout(() => setJustSavedCustom(false), 2000);
  };

  // ---------------------------------------------------------------------------
  // Restore Handlers
  // ---------------------------------------------------------------------------
  const handleRestore = (item: SavedSequenceItem) => {
    if (item.module === "auto") {
      if (item.rawInputs.rawInput !== undefined) setRawInput(item.rawInputs.rawInput);
      if (item.rawInputs.targetN !== undefined) setTargetN(item.rawInputs.targetN);
    } else if (item.module === "progression") {
      if (item.rawInputs.progType !== undefined) setProgType(item.rawInputs.progType);
      if (item.rawInputs.progA1 !== undefined) setProgA1(item.rawInputs.progA1);
      if (item.rawInputs.progDiffRatio !== undefined) setProgDiffRatio(item.rawInputs.progDiffRatio);
      if (item.rawInputs.progN !== undefined) setProgN(item.rawInputs.progN);
    } else if (item.module === "recurrence") {
      if (item.rawInputs.fibMode !== undefined) setFibMode(item.rawInputs.fibMode);
      if (item.rawInputs.fibN !== undefined) setFibN(item.rawInputs.fibN);
    } else if (item.module === "custom") {
      if (item.rawInputs.customExpr !== undefined) setCustomExpr(item.rawInputs.customExpr);
      if (item.rawInputs.customN !== undefined) setCustomN(item.rawInputs.customN);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {copyStatus && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 rounded-xl shadow-lg text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-500" />
          <span>{copyStatus}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CARD 1: AUTOMATED SEQUENCE PATTERN RECOGNITION & EXPLICIT FORMULA FINDER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>1. Automated Sequence Pattern Recognition &amp; Explicit Formula Finder</span>
          <div className="flex items-center gap-2 no-print">
            <button
              type="button"
              onClick={handleSaveAuto}
              aria-label="Save sequence pattern calculation"
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedAuto ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT FORM */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  <span>Input Sequence &amp; Target Index</span>
                </h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="seq-raw-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Sequence Terms (Separated by commas or spaces):
                  </label>
                  <textarea
                    id="seq-raw-input"
                    rows={3}
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    placeholder="e.g. 2, 5, 10, 17, 26 or 1, 8, 27, 64, 125"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {ignoredTokens.length > 0 && (
                    <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>Note: Non-numeric token(s) ignored: {ignoredTokens.join(", ")}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                    <label htmlFor="seq-target-n">Target Term Index (n):</label>
                    <span className="font-mono text-blue-600">n = {targetN}</span>
                  </div>
                  <input
                    id="seq-target-n"
                    type="number"
                    min="1"
                    max="1000"
                    value={targetN}
                    onChange={(e) => setTargetN(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT DISPLAY */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Explicit Formula (a_n)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {analysis.typeName}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight break-all">
                  {analysis.explicitFormula}
                </div>
                <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 pt-1">
                  Target Term a_{targetN} = {analysis.targetTerm}
                </p>

                {analysis.notes && (
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                    {analysis.notes}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">First Term (a₁)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{analysis.firstTerm}</span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Diff / Ratio</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">
                      {analysis.commonDiff !== undefined
                        ? `d = ${analysis.commonDiff}`
                        : analysis.commonRatio !== undefined
                        ? `r = ${analysis.commonRatio}`
                        : "N/A"}
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Partial Sum (S_n)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{analysis.partialSum}</span>
                  </div>
                </div>

                {/* Quick Action Toolbar */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 text-xs no-print">
                  <button
                    type="button"
                    onClick={() => triggerCopy(analysis.explicitFormula, "Formula copied!")}
                    aria-label="Copy explicit formula"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Formula
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      triggerCopy(
                        `Sequence: [${terms.join(", ")}]\nType: ${analysis.typeName}\nFormula: ${analysis.explicitFormula}\na_${targetN} = ${analysis.targetTerm}\nS_${targetN} = ${analysis.partialSum}`,
                        "Results copied!"
                      )
                    }
                    aria-label="Copy result summary"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Copy Result
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const rows = terms.map((t, idx) => [idx + 1, t, analysis.explicitFormula]);
                      rows.push([targetN, analysis.targetTerm, "Target Term"]);
                      exportCSV("sequence_pattern", ["Index (n)", "Term (a_n)", "Formula"], rows);
                    }}
                    aria-label="Export sequence to CSV"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> CSV
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL ANALYTICS & FINITE DIFFERENCES */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Interactive 2D Visualizer &amp; Finite Differences Table</span>
              </h3>

              <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold no-print">
                <button
                  type="button"
                  onClick={() => setActiveVisual("plot")}
                  aria-label="Show 2D scatter plot"
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual === "plot" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  2D Coordinate Scatter Plot
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisual("table")}
                  aria-label="Show finite differences table"
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual === "table" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Finite Differences Table
                </button>
              </div>
            </div>

            {/* TAB 1: 2D SCATTER PLOT SVG (Negative & Positive Range Supported) */}
            {activeVisual === "plot" && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Discrete Coordinate Plot (n vs a_n) — Dynamic Negative &amp; Positive Scaling:
                </h4>
                <div className="w-full flex justify-center py-2 overflow-x-auto">
                  {(() => {
                    const plotTerms = terms.slice(0, 12);
                    if (plotTerms.length === 0) {
                      return <div className="text-xs text-slate-400 py-8">Enter sequence terms to view scatter plot.</div>;
                    }

                    const minVal = Math.min(...plotTerms, 0);
                    const maxVal = Math.max(...plotTerms, 0);
                    const range = Math.max(maxVal - minVal, 1);

                    const plotTop = 20;
                    const plotBottom = 130;
                    const plotHeight = plotBottom - plotTop;
                    const count = plotTerms.length;

                    // Zero axis position
                    const hasZeroCrossing = minVal < 0 && maxVal > 0;
                    const yZero = plotBottom - ((0 - minVal) / range) * plotHeight;

                    return (
                      <svg viewBox="0 0 500 160" className="w-full max-w-xl h-auto">
                        {/* Axes */}
                        <line x1="40" y1="130" x2="480" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
                        <line x1="40" y1="130" x2="40" y2="15" stroke="#94a3b8" strokeWidth="1.5" />

                        {/* Dashed Zero Line if crossing */}
                        {hasZeroCrossing && (
                          <line
                            x1="40"
                            y1={yZero}
                            x2="480"
                            y2={yZero}
                            stroke="#cbd5e1"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                          />
                        )}

                        {/* Plotted Points & Coordinates */}
                        {plotTerms.map((t, idx) => {
                          const x = 40 + (idx + 1) * ((480 - 40) / (count + 1));
                          const y = plotBottom - ((t - minVal) / range) * plotHeight;
                          return (
                            <g key={idx}>
                              <circle cx={x} cy={y} r="4.5" fill="#2563eb" />
                              <text
                                x={x}
                                y="145"
                                textAnchor="middle"
                                className="text-[9px] font-mono fill-slate-600 dark:fill-slate-400"
                              >
                                {idx + 1}
                              </text>
                              <text
                                x={x}
                                y={y < 35 ? y + 14 : y - 7}
                                textAnchor="middle"
                                className="text-[9px] font-mono font-bold fill-blue-700 dark:fill-blue-300"
                              >
                                {t}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* TAB 2: FINITE DIFFERENCES TABLE */}
            {activeVisual === "table" && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Method of Finite Differences Table (Δ¹, Δ², Δ³, Δ⁴):
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead>
                      <tr className="bg-blue-600 text-white font-bold">
                        <th className="p-2">Level</th>
                        <th className="p-2">Difference Layer</th>
                        <th className="p-2">Values</th>
                        <th className="p-2">Constant Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono bg-slate-50 dark:bg-slate-800/50">
                      {diffTable.map((row) => (
                        <tr key={row.level}>
                          <td className="p-2 font-bold text-slate-500">{row.level}</td>
                          <td className="p-2 font-bold text-slate-900 dark:text-slate-100">{row.name}</td>
                          <td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{row.values.join(", ")}</td>
                          <td className="p-2 font-sans font-bold">
                            {row.isConstant ? (
                              <span className="text-emerald-600 dark:text-emerald-400">✓ Constant Difference</span>
                            ) : (
                              <span className="text-slate-400">Varying</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* EMBEDDED SAVED CALCULATIONS (WITH FULL RESTORE) */}
          {savedAutoItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 print:break-inside-avoid">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Sequence Pattern Solves ({savedAutoItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedAutoItems([]);
                    try {
                      localStorage.removeItem("saved_seq_auto");
                    } catch (e) {}
                  }}
                  aria-label="Clear all saved sequence pattern calculations"
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1 no-print"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedAutoItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts =
                    item.resultsList ??
                    (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
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
                        <div className="flex items-center gap-1 no-print">
                          <button
                            type="button"
                            onClick={() => handleRestore(item)}
                            aria-label="Restore this calculation into inputs"
                            className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                            title="Restore calculation"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedAutoItems.filter((i) => i.id !== item.id);
                              setSavedAutoItems(updated);
                              try {
                                localStorage.setItem("saved_seq_auto", JSON.stringify(updated));
                              } catch (e) {}
                            }}
                            aria-label="Delete saved calculation"
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs}</span>
                        </div>

                        <div className="flex items-center gap-2 no-print">
                          <button
                            type="button"
                            onClick={() => handleRestore(item)}
                            aria-label="Restore calculation"
                            className="flex-1 py-1 px-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold text-[11px] hover:bg-blue-100 transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" /> Load
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleExpand(item.id)}
                            aria-label="Toggle calculation details"
                            className="py-1 px-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Calculated Answers:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
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
      {/* CARD 2: EXPLICIT ARITHMETIC & GEOMETRIC PROGRESSION SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>2. Explicit Arithmetic &amp; Geometric Progression Solver</span>
          <button
            type="button"
            onClick={handleSaveProg}
            aria-label="Save progression calculation"
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer no-print"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedProg ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Progression Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Progression Type
                  </span>
                  <div className="grid grid-cols-2 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans">
                    <button
                      type="button"
                      onClick={() => setProgType("arithmetic")}
                      aria-label="Select arithmetic progression"
                      className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                        progType === "arithmetic" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Arithmetic AP
                    </button>
                    <button
                      type="button"
                      onClick={() => setProgType("geometric")}
                      aria-label="Select geometric progression"
                      className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                        progType === "geometric" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Geometric GP
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label htmlFor="prog-a1" className="text-[11px] font-bold text-slate-500 block mb-1">
                      First Term (a₁):
                    </label>
                    <input
                      id="prog-a1"
                      type="number"
                      step="any"
                      value={progA1}
                      onChange={(e) => setProgA1(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="prog-diff-ratio" className="text-[11px] font-bold text-slate-500 block mb-1">
                      {progType === "arithmetic" ? "Diff (d):" : "Ratio (r):"}
                    </label>
                    <input
                      id="prog-diff-ratio"
                      type="number"
                      step="any"
                      value={progDiffRatio}
                      onChange={(e) => setProgDiffRatio(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="prog-n" className="text-[11px] font-bold text-slate-500 block mb-1">
                      Terms (n):
                    </label>
                    <input
                      id="prog-n"
                      type="number"
                      min="1"
                      max="1000"
                      value={progN}
                      onChange={(e) => setProgN(parseInt(e.target.value, 10) || 1)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PROGRESSION OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Formula: {progFormula}
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    a_{progN} = {progTargetTerm.toFixed(4)}
                  </div>
                  <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    Sum S_{progN} = {progSum.toFixed(4)}
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">First Few Generated Terms</span>
                  <div className="flex flex-wrap gap-1.5 pt-1 font-mono">
                    {progTermsList.map((val, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-900 dark:text-slate-100"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 text-xs no-print">
                  <button
                    type="button"
                    onClick={() => triggerCopy(progFormula, "Formula copied!")}
                    aria-label="Copy progression formula"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Formula
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerCopy(progLatex, "LaTeX copied!")}
                    aria-label="Copy progression LaTeX"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                  >
                    <Code className="w-3.5 h-3.5" /> Copy LaTeX
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const rows = progTermsList.map((t, idx) => [idx + 1, t]);
                      exportCSV(
                        `progression_${progType}`,
                        ["Index (n)", "Term (a_n)"],
                        rows
                      );
                    }}
                    aria-label="Export progression to CSV"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> CSV
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED PROGRESSIONS */}
          {savedProgItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 print:break-inside-avoid">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Progression Solves ({savedProgItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedProgItems([]);
                    try {
                      localStorage.removeItem("saved_seq_progression");
                    } catch (e) {}
                  }}
                  aria-label="Clear all saved progression calculations"
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1 no-print"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedProgItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts =
                    item.resultsList ??
                    (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
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
                        <div className="flex items-center gap-1 no-print">
                          <button
                            type="button"
                            onClick={() => handleRestore(item)}
                            aria-label="Restore progression calculation"
                            className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                            title="Restore calculation"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedProgItems.filter((i) => i.id !== item.id);
                              setSavedProgItems(updated);
                              try {
                                localStorage.setItem("saved_seq_progression", JSON.stringify(updated));
                              } catch (e) {}
                            }}
                            aria-label="Delete saved progression"
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs}</span>
                        </div>

                        <div className="flex items-center gap-2 no-print">
                          <button
                            type="button"
                            onClick={() => handleRestore(item)}
                            aria-label="Restore calculation"
                            className="flex-1 py-1 px-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold text-[11px] hover:bg-blue-100 transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" /> Load
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleExpand(item.id)}
                            aria-label="Toggle calculation details"
                            className="py-1 px-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
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
      {/* CARD 3: FIBONACCI & LUCAS RECURRENCE SEQUENCE ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>3. Fibonacci &amp; Lucas Recurrence Sequence Engine</span>
          <button
            type="button"
            onClick={handleSaveFib}
            aria-label="Save recurrence calculation"
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer no-print"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedFib ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Recurrence Parameters
              </h2>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Sequence Family
                  </span>
                  <div className="grid grid-cols-2 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans">
                    <button
                      type="button"
                      onClick={() => setFibMode("fibonacci")}
                      aria-label="Select Fibonacci family"
                      className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                        fibMode === "fibonacci" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Fibonacci (F_n)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFibMode("lucas")}
                      aria-label="Select Lucas family"
                      className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                        fibMode === "lucas" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Lucas (L_n)
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="fib-n" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Term Index (n):
                  </label>
                  <input
                    id="fib-n"
                    type="number"
                    min="1"
                    max="50"
                    value={fibN}
                    onChange={(e) => setFibN(parseInt(e.target.value, 10) || 1)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: RECURRENCE OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    {fibMode === "fibonacci" ? `Fibonacci Term F_${fibN}` : `Lucas Term L_${fibN}`}
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {fibTerm}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">
                    Golden Ratio φ Ratio Approximation (Fₙ₊₁ / Fₙ)
                  </span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">φ ≈ {fibPhiApprox.toFixed(8)}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 text-xs no-print">
                  <button
                    type="button"
                    onClick={() => triggerCopy(`${fibMode === "fibonacci" ? "F" : "L"}_${fibN} = ${fibTerm}`, "Term copied!")}
                    aria-label="Copy recurrence term"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Term
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerCopy(fibLatex, "LaTeX copied!")}
                    aria-label="Copy recurrence LaTeX"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                  >
                    <Code className="w-3.5 h-3.5" /> Copy LaTeX
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const rows = fibTermsList.map((t, idx) => [idx + 1, t]);
                      exportCSV(fibMode, ["Index (n)", "Term"], rows);
                    }}
                    aria-label="Export recurrence sequence to CSV"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> CSV
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED FIBONACCI SOLVES */}
          {savedFibItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 print:break-inside-avoid">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Recurrence Solves ({savedFibItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedFibItems([]);
                    try {
                      localStorage.removeItem("saved_seq_fibonacci");
                    } catch (e) {}
                  }}
                  aria-label="Clear all recurrence calculations"
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1 no-print"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedFibItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts =
                    item.resultsList ??
                    (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
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
                        <div className="flex items-center gap-1 no-print">
                          <button
                            type="button"
                            onClick={() => handleRestore(item)}
                            aria-label="Restore recurrence calculation"
                            className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                            title="Restore calculation"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedFibItems.filter((i) => i.id !== item.id);
                              setSavedFibItems(updated);
                              try {
                                localStorage.setItem("saved_seq_fibonacci", JSON.stringify(updated));
                              } catch (e) {}
                            }}
                            aria-label="Delete saved recurrence calculation"
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs}</span>
                        </div>

                        <div className="flex items-center gap-2 no-print">
                          <button
                            type="button"
                            onClick={() => handleRestore(item)}
                            aria-label="Restore calculation"
                            className="flex-1 py-1 px-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold text-[11px] hover:bg-blue-100 transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" /> Load
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleExpand(item.id)}
                            aria-label="Toggle calculation details"
                            className="py-1 px-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
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
      {/* CARD 4: CUSTOM FUNCTION EVALUATOR & INFINITE SERIES CONVERGENCE CHECKER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>4. Custom Function Evaluator (a_n = f(n)) &amp; Series Convergence Checker</span>
          <button
            type="button"
            onClick={handleSaveCustom}
            aria-label="Save custom function calculation"
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer no-print"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCustom ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Formula &amp; Target Parameters
              </h2>

              <div className="space-y-3">
                <div>
                  <label htmlFor="custom-expr" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Function Expression a_n = f(n):
                  </label>
                  <input
                    id="custom-expr"
                    type="text"
                    value={customExpr}
                    onChange={(e) => setCustomExpr(e.target.value)}
                    placeholder="e.g. n^2 + 1, 2^n - 1, 1/n, 3*n + 5"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {["n^2 + 1", "2^n - 1", "1/n", "3*n + 5", "1/(2^n)"].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setCustomExpr(preset)}
                        className="text-[10px] font-mono px-2 py-0.5 bg-slate-200 dark:bg-slate-800 hover:bg-blue-600 hover:text-white rounded cursor-pointer transition-colors"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="custom-n" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Target Term Index (n):
                  </label>
                  <input
                    id="custom-n"
                    type="number"
                    min="1"
                    max="100"
                    value={customN}
                    onChange={(e) => setCustomN(parseInt(e.target.value, 10) || 1)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CUSTOM OUTPUT & CONVERGENCE */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                {customEvalResult.error ? (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 font-bold">
                    Error: {customEvalResult.error}
                  </div>
                ) : (
                  <>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                        Evaluated Function: a_n = {customExpr}
                      </span>
                      <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                        a_{customN} = {customEvalResult.targetVal}
                      </div>
                      <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                        Partial Sum S_{customN} = {customEvalResult.sumVal}
                      </p>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                      <span className="text-[10px] text-slate-400 block uppercase">Generated Sequence Terms (1 to 15)</span>
                      <div className="flex flex-wrap gap-1.5 pt-1 font-mono">
                        {customEvalResult.termsPreview.map((val, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-900 dark:text-slate-100"
                          >
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>

                    {customEvalResult.convergence && (
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">
                          Infinite Series Convergence Analysis (∑ a_n)
                        </span>
                        <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          {customEvalResult.convergence.isConvergent === true ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">
                              Convergent Series
                            </span>
                          ) : customEvalResult.convergence.isConvergent === false ? (
                            <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-[11px]">
                              Divergent Series
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-[11px]">
                              Inconclusive
                            </span>
                          )}
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {customEvalResult.convergence.summary}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 text-xs no-print">
                      <button
                        type="button"
                        onClick={() => triggerCopy(`a_${customN} = ${customEvalResult.targetVal}, S_${customN} = ${customEvalResult.sumVal}`, "Copied!")}
                        aria-label="Copy custom evaluation result"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy Result
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const rows = customEvalResult.termsPreview.map((t, idx) => [idx + 1, t]);
                          exportCSV(`custom_function`, ["Index (n)", "Term (a_n)"], rows);
                        }}
                        aria-label="Export custom function terms to CSV"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> CSV
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED CUSTOM EVALUATIONS */}
          {savedCustomItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 print:break-inside-avoid">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Custom Function Solves ({savedCustomItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCustomItems([]);
                    try {
                      localStorage.removeItem("saved_seq_custom");
                    } catch (e) {}
                  }}
                  aria-label="Clear all custom calculations"
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1 no-print"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedCustomItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts =
                    item.resultsList ??
                    (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
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
                        <div className="flex items-center gap-1 no-print">
                          <button
                            type="button"
                            onClick={() => handleRestore(item)}
                            aria-label="Restore custom calculation"
                            className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                            title="Restore calculation"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedCustomItems.filter((i) => i.id !== item.id);
                              setSavedCustomItems(updated);
                              try {
                                localStorage.setItem("saved_seq_custom", JSON.stringify(updated));
                              } catch (e) {}
                            }}
                            aria-label="Delete saved custom calculation"
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs}</span>
                        </div>

                        <div className="flex items-center gap-2 no-print">
                          <button
                            type="button"
                            onClick={() => handleRestore(item)}
                            aria-label="Restore calculation"
                            className="flex-1 py-1 px-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold text-[11px] hover:bg-blue-100 transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" /> Load
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleExpand(item.id)}
                            aria-label="Toggle calculation details"
                            className="py-1 px-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
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

export default SequenceCalculator;
