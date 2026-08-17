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
  BarChart2,
  TrendingUp,
  Table,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Flame
} from "lucide-react";
import {
  parseSequenceInput,
  detectSequencePattern,
  generateFiniteDifferenceTable,
  computeFibonacciBinet
} from "@/app/calculators/number-sequence-calculator/sequence-logic";

export type VisualTab = "plot" | "table";

export interface SavedSequenceItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function SequenceCalculator() {
  // Card 1 Inputs: Auto Sequence Pattern Recognition
  const [rawInput, setRawInput] = useState<string>("2, 5, 10, 17, 26");
  const [targetN, setTargetN] = useState<number>(10);
  const [activeVisual, setActiveVisual] = useState<VisualTab>("plot");

  // Card 2 Inputs: Arithmetic & Geometric Progression
  const [progType, setProgType] = useState<"arithmetic" | "geometric">("arithmetic");
  const [progA1, setProgA1] = useState<string>("3");
  const [progDiffRatio, setProgDiffRatio] = useState<string>("4");
  const [progN, setProgN] = useState<number>(10);

  // Card 3 Inputs: Fibonacci & Lucas Recurrence Engine
  const [fibMode, setFibMode] = useState<"fibonacci" | "lucas">("fibonacci");
  const [fibN, setFibN] = useState<number>(12);

  // Action feedback states
  const [copiedFormula, setCopiedFormula] = useState<boolean>(false);
  const [copiedTerms, setCopiedTerms] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Saved calculation states for Card 1, 2, 3
  const [savedAutoItems, setSavedAutoItems] = useState<SavedSequenceItem[]>([]);
  const [justSavedAuto, setJustSavedAuto] = useState<boolean>(false);

  const [savedProgItems, setSavedProgItems] = useState<SavedSequenceItem[]>([]);
  const [justSavedProg, setJustSavedProg] = useState<boolean>(false);

  const [savedFibItems, setSavedFibItems] = useState<SavedSequenceItem[]>([]);
  const [justSavedFib, setJustSavedFib] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedAuto = localStorage.getItem("saved_seq_auto");
      if (storedAuto) setSavedAutoItems(JSON.parse(storedAuto));

      const storedProg = localStorage.getItem("saved_seq_progression");
      if (storedProg) setSavedProgItems(JSON.parse(storedProg));

      const storedFib = localStorage.getItem("saved_seq_fibonacci");
      if (storedFib) setSavedFibItems(JSON.parse(storedFib));
    } catch (e) {}
  }, []);

  // Card 1 Calculations
  const terms = useMemo(() => parseSequenceInput(rawInput), [rawInput]);
  const analysis = useMemo(() => detectSequencePattern(terms, targetN), [terms, targetN]);
  const diffTable = useMemo(() => generateFiniteDifferenceTable(terms), [terms]);

  // Card 2 Calculations: Explicit Progression Solver
  const { progTargetTerm, progSum, progFormula, progTermsList } = useMemo(() => {
    const a1 = parseFloat(progA1) || 0;
    const dr = parseFloat(progDiffRatio) || 0;
    const n = Math.max(1, Math.min(100, progN));

    let targetTerm = 0;
    let sum = 0;
    let formula = "";
    const list: number[] = [];

    if (progType === "arithmetic") {
      targetTerm = a1 + (n - 1) * dr;
      sum = (n / 2) * (2 * a1 + (n - 1) * dr);
      formula = `a_n = ${a1} + (n - 1) × (${dr})`;
      for (let i = 1; i <= Math.min(n, 12); i++) {
        list.push(a1 + (i - 1) * dr);
      }
    } else {
      targetTerm = a1 * Math.pow(dr, n - 1);
      sum = dr === 1 ? a1 * n : a1 * (1 - Math.pow(dr, n)) / (1 - dr);
      formula = `a_n = ${a1} × (${dr})^(n - 1)`;
      for (let i = 1; i <= Math.min(n, 12); i++) {
        list.push(a1 * Math.pow(dr, i - 1));
      }
    }

    return { progTargetTerm: targetTerm, progSum: sum, progFormula: formula, progTermsList: list };
  }, [progType, progA1, progDiffRatio, progN]);

  // Card 3 Calculations: Fibonacci & Lucas Recurrence Engine
  const { fibTerm, fibTermsList, fibPhiApprox } = useMemo(() => {
    const n = Math.max(1, Math.min(40, fibN));
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
        fibPhiApprox: prev === 0 ? 1.61803398 : current / prev
      };
    } else {
      // Lucas numbers: L1=1, L2=3, L_n = L_{n-1} + L_{n-2}
      let l1 = 1, l2 = 3;
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
        fibPhiApprox: prev === 0 ? 1.61803398 : current / prev
      };
    }
  }, [fibMode, fibN]);

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      navigator.clipboard.writeText(text);
      setFn(true);
      setTimeout(() => setFn(false), 2000);
    } catch (e) {}
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("seq", rawInput);
    params.set("n", targetN.toString());
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    handleCopy(shareableUrl, setCopiedUrl);
  };

  // Save Card 1 Handler
  const handleSaveAuto = () => {
    const inputsStr = `Terms: [${terms.slice(0, 5).join(", ")}...], Target Index n = ${targetN}`;
    const opStr = `Sequence Pattern Recognition`;
    const resList = [
      `Type = ${analysis.typeName}`,
      `Explicit Formula a_n = ${analysis.explicitFormula}`,
      `Target Term a_${targetN} = ${analysis.targetTerm}`,
      `First Term a_1 = ${analysis.firstTerm}`,
      `Partial Sum S_${targetN} = ${analysis.partialSum}`
    ];

    const newItem: SavedSequenceItem = {
      id: Date.now().toString(),
      title: `${analysis.typeName} (${analysis.explicitFormula})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: analysis.explicitFormula,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedAutoItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedAutoItems(updated);
    try {
      localStorage.setItem("saved_seq_auto", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedAuto(true);
    setTimeout(() => setJustSavedAuto(false), 2000);
  };

  // Save Card 2 Handler
  const handleSaveProg = () => {
    const inputsStr = `Type: ${progType}, a1: ${progA1}, ${progType === "arithmetic" ? "d" : "r"}: ${progDiffRatio}, n: ${progN}`;
    const opStr = `Explicit Progression Calculation`;
    const resList = [
      `Formula = ${progFormula}`,
      `Target Term a_${progN} = ${progTargetTerm.toFixed(4)}`,
      `Sum S_${progN} = ${progSum.toFixed(4)}`,
      `Generated Terms = [${progTermsList.join(", ")}]`
    ];

    const newItem: SavedSequenceItem = {
      id: Date.now().toString(),
      title: `${progType.toUpperCase()} (a_${progN}=${progTargetTerm.toFixed(2)})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: progFormula,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedProgItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedProgItems(updated);
    try {
      localStorage.setItem("saved_seq_progression", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedProg(true);
    setTimeout(() => setJustSavedProg(false), 2000);
  };

  // Save Card 3 Handler
  const handleSaveFib = () => {
    const inputsStr = `Recurrence: ${fibMode === "fibonacci" ? "Fibonacci (F_n)" : "Lucas (L_n)"}, Term Index n: ${fibN}`;
    const opStr = `Recurrence Relation Computation`;
    const resList = [
      `n-th Term = ${fibTerm}`,
      `Golden Ratio φ Approx = ${fibPhiApprox.toFixed(8)}`,
      `Sequence = [${fibTermsList.join(", ")}]`
    ];

    const newItem: SavedSequenceItem = {
      id: Date.now().toString(),
      title: `${fibMode === "fibonacci" ? "Fibonacci" : "Lucas"} (${fibMode === "fibonacci" ? "F" : "L"}_${fibN}=${fibTerm})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Term ${fibN} = ${fibTerm}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedFibItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedFibItems(updated);
    try {
      localStorage.setItem("saved_seq_fibonacci", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedFib(true);
    setTimeout(() => setJustSavedFib(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: AUTOMATED SEQUENCE PATTERN RECOGNITION & EXPLICIT FORMULA FINDER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Automated Sequence Pattern Recognition &amp; Explicit Formula Finder</span>
          <button
            type="button"
            onClick={handleSaveAuto}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedAuto ? "Saved!" : "Save"}</span>
          </button>
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
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Sequence Terms (Separated by commas or spaces):
                  </label>
                  <textarea
                    rows={3}
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    placeholder="e.g. 2, 5, 10, 17, 26"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Target Term Index (n):</span>
                    <span className="font-mono text-blue-600">n = {targetN}</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={targetN}
                    onChange={(e) => setTargetN(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold outline-none"
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

                <div className="grid grid-cols-3 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">First Term (a₁)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{analysis.firstTerm}</span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Diff / Ratio</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">
                      {analysis.commonDiff !== undefined ? `d = ${analysis.commonDiff}` : analysis.commonRatio !== undefined ? `r = ${analysis.commonRatio}` : "N/A"}
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Partial Sum (S_n)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{analysis.partialSum}</span>
                  </div>
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

              <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveVisual("plot")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual === "plot" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  2D Coordinate Scatter Plot
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisual("table")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual === "table" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Finite Differences Table
                </button>
              </div>
            </div>

            {/* TAB 1: 2D SCATTER PLOT SVG */}
            {activeVisual === "plot" && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Discrete Coordinate Plot (n vs a_n):
                </h4>
                <div className="w-full flex justify-center py-2 overflow-x-auto">
                  <svg viewBox="0 0 500 160" className="w-full max-w-xl h-auto">
                    <line x1="40" y1="130" x2="480" y2="130" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="40" y1="130" x2="40" y2="20" stroke="#94a3b8" strokeWidth="2" />
                    {terms.slice(0, 10).map((t, idx) => {
                      const x = 40 + (idx + 1) * 40;
                      const maxVal = Math.max(...terms.slice(0, 10), 1);
                      const y = 130 - (t / maxVal) * 100;
                      return (
                        <g key={idx}>
                          <circle cx={x} cy={y} r="4" fill="#2563eb" />
                          <text x={x} y="145" textAnchor="middle" className="text-[9px] font-mono fill-slate-600">{idx + 1}</text>
                          <text x={x} y={y - 8} textAnchor="middle" className="text-[9px] font-mono font-bold fill-blue-700">{t}</text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            )}

            {/* TAB 2: FINITE DIFFERENCES TABLE */}
            {activeVisual === "table" && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Method of Finite Differences Table:
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
                          <td className="p-2 text-blue-600 font-bold">{row.values.join(", ")}</td>
                          <td className="p-2 font-sans font-bold">
                            {row.isConstant ? (
                              <span className="text-emerald-600">✓ Constant Difference</span>
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

          {/* EMBEDDED SAVED AUTOMATED SEQUENCE CALCULATIONS INSIDE CARD 1 */}
          {savedAutoItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Sequence Pattern Solves ({savedAutoItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedAutoItems([]);
                    try { localStorage.removeItem("saved_seq_auto"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedAutoItems.map((item) => {
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
                            const updated = savedAutoItems.filter(i => i.id !== item.id);
                            setSavedAutoItems(updated);
                            try { localStorage.setItem("saved_seq_auto", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
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
      {/* CARD 2: EXPLICIT ARITHMETIC & GEOMETRIC PROGRESSION SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Explicit Arithmetic &amp; Geometric Progression Solver</span>
          <button
            type="button"
            onClick={handleSaveProg}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
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
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Progression Type</label>
                  <div className="grid grid-cols-2 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans">
                    <button
                      type="button"
                      onClick={() => setProgType("arithmetic")}
                      className={`py-1.5 rounded-lg cursor-pointer ${progType === "arithmetic" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      Arithmetic AP
                    </button>
                    <button
                      type="button"
                      onClick={() => setProgType("geometric")}
                      className={`py-1.5 rounded-lg cursor-pointer ${progType === "geometric" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      Geometric GP
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">First Term (a₁):</label>
                    <input
                      type="number"
                      step="any"
                      value={progA1}
                      onChange={(e) => setProgA1(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">{progType === "arithmetic" ? "Diff (d):" : "Ratio (r):"}</label>
                    <input
                      type="number"
                      step="any"
                      value={progDiffRatio}
                      onChange={(e) => setProgDiffRatio(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Terms (n):</label>
                    <input
                      type="number"
                      min="1"
                      value={progN}
                      onChange={(e) => setProgN(parseInt(e.target.value, 10) || 1)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs"
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
                      <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-900 dark:text-slate-100">
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED PROGRESSIONS INSIDE CARD 2 */}
          {savedProgItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Progression Solves ({savedProgItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedProgItems([]);
                    try { localStorage.removeItem("saved_seq_progression"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedProgItems.map((item) => {
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
                            const updated = savedProgItems.filter(i => i.id !== item.id);
                            setSavedProgItems(updated);
                            try { localStorage.setItem("saved_seq_progression", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
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
      {/* CARD 3: FIBONACCI & LUCAS RECURRENCE SEQUENCE ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Fibonacci &amp; Lucas Recurrence Sequence Engine</span>
          <button
            type="button"
            onClick={handleSaveFib}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
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
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Sequence Family</label>
                  <div className="grid grid-cols-2 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans">
                    <button
                      type="button"
                      onClick={() => setFibMode("fibonacci")}
                      className={`py-1.5 rounded-lg cursor-pointer ${fibMode === "fibonacci" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      Fibonacci (F_n)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFibMode("lucas")}
                      className={`py-1.5 rounded-lg cursor-pointer ${fibMode === "lucas" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      Lucas (L_n)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Term Index (n):</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={fibN}
                    onChange={(e) => setFibN(parseInt(e.target.value, 10) || 1)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm"
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
                  <span className="text-[10px] text-slate-400 block uppercase">Golden Ratio φ Ratio Approximation</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">φ ≈ {fibPhiApprox.toFixed(8)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED FIBONACCI SOLVES INSIDE CARD 3 */}
          {savedFibItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Recurrence Solves ({savedFibItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedFibItems([]);
                    try { localStorage.removeItem("saved_seq_fibonacci"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedFibItems.map((item) => {
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
                            const updated = savedFibItems.filter(i => i.id !== item.id);
                            setSavedFibItems(updated);
                            try { localStorage.setItem("saved_seq_fibonacci", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
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

export default SequenceCalculator;
