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
  ChevronUp
} from "lucide-react";
import {
  parseDataset,
  computeDescriptiveStats,
  compareTwoDatasets
} from "@/app/calculators/standard-deviation-calculator/std-dev-logic";

export type VisualTab = "bell" | "box" | "steps";

export interface SavedStdDevItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function StdDevCalculator() {
  // Card 1 Inputs: Single Dataset
  const [rawInput, setRawInput] = useState<string>("10, 12, 23, 23, 16, 23, 21, 16");
  const [isSample, setIsSample] = useState<boolean>(true);
  const [activeVisual, setActiveVisual] = useState<VisualTab>("bell");

  // Card 2 Inputs: Two Dataset Comparison
  const [rawInputA, setRawInputA] = useState<string>("10, 12, 15, 18, 20");
  const [rawInputB, setRawInputB] = useState<string>("14, 16, 19, 22, 25");

  // Card 3 Inputs: Confidence Interval Calculator
  const [ciMean, setCiMean] = useState<string>("50");
  const [ciSD, setCiSD] = useState<string>("10");
  const [ciN, setCiN] = useState<string>("30");
  const [ciLevel, setCiLevel] = useState<number>(95);

  // Saved calculation states for Card 1, 2, 3
  const [savedSingleItems, setSavedSingleItems] = useState<SavedStdDevItem[]>([]);
  const [justSavedSingle, setJustSavedSingle] = useState<boolean>(false);

  const [savedCompItems, setSavedCompItems] = useState<SavedStdDevItem[]>([]);
  const [justSavedComp, setJustSavedComp] = useState<boolean>(false);

  const [savedCIItems, setSavedCIItems] = useState<SavedStdDevItem[]>([]);
  const [justSavedCI, setJustSavedCI] = useState<boolean>(false);

  // Action feedback states
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedTable, setCopiedTable] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedSingle = localStorage.getItem("saved_stddev_single");
      if (storedSingle) setSavedSingleItems(JSON.parse(storedSingle));

      const storedComp = localStorage.getItem("saved_stddev_compare");
      if (storedComp) setSavedCompItems(JSON.parse(storedComp));

      const storedCI = localStorage.getItem("saved_stddev_ci");
      if (storedCI) setSavedCIItems(JSON.parse(storedCI));
    } catch (e) {}
  }, []);

  // Card 1 Calculations
  const data = useMemo(() => parseDataset(rawInput), [rawInput]);
  const stats = useMemo(() => computeDescriptiveStats(data, isSample), [data, isSample]);
  const activeSD = isSample ? stats.sampleSD : stats.popSD;
  const activeVar = isSample ? stats.sampleVar : stats.popVar;

  // Card 2 Calculations: Dual Dataset Comparison
  const comparison = useMemo(() => {
    const dA = parseDataset(rawInputA);
    const dB = parseDataset(rawInputB);
    return compareTwoDatasets(dA, dB);
  }, [rawInputA, rawInputB]);

  // Card 3 Calculations: Confidence Interval
  const ciMeanNum = parseFloat(ciMean) || 0;
  const ciSDNum = parseFloat(ciSD) || 1;
  const ciNNum = parseInt(ciN, 10) || 1;

  const zScore = useMemo(() => {
    if (ciLevel === 90) return 1.645;
    if (ciLevel === 99) return 2.576;
    return 1.96; // 95% default
  }, [ciLevel]);

  const marginOfError = useMemo(() => {
    if (ciNNum <= 0) return 0;
    return zScore * (ciSDNum / Math.sqrt(ciNNum));
  }, [zScore, ciSDNum, ciNNum]);

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      navigator.clipboard.writeText(text);
      setFn(true);
      setTimeout(() => setFn(false), 2000);
    } catch (e) {}
  };

  // Save Card 1 Handler
  const handleSaveSingle = () => {
    const inputsStr = `Data (N=${stats.count}), Type: ${isSample ? "Sample (N-1)" : "Population (N)"}`;
    const opStr = `Descriptive Statistics Engine`;
    const resList = [
      `Standard Deviation (${isSample ? "s" : "σ"}) = ${activeSD.toFixed(4)}`,
      `Variance (${isSample ? "s²" : "σ²"}) = ${activeVar.toFixed(4)}`,
      `Count N = ${stats.count}`,
      `Mean x̄ = ${stats.mean.toFixed(4)}`,
      `Std Error = ${stats.stdError.toFixed(4)}`,
      `CV % = ${stats.coeffVar.toFixed(2)}%`
    ];

    const newItem: SavedStdDevItem = {
      id: Date.now().toString(),
      title: `StdDev (${isSample ? "s=" : "σ="}${activeSD.toFixed(2)})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `SD = ${activeSD.toFixed(4)}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedSingleItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedSingleItems(updated);
    try {
      localStorage.setItem("saved_stddev_single", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedSingle(true);
    setTimeout(() => setJustSavedSingle(false), 2000);
  };

  // Save Card 2 Handler
  const handleSaveComp = () => {
    const inputsStr = `Dataset A (N=${comparison.statsA.count}), Dataset B (N=${comparison.statsB.count})`;
    const opStr = `Dual Dataset Comparison & F-Test`;
    const sdA = isSample ? comparison.statsA.sampleSD : comparison.statsA.popSD;
    const sdB = isSample ? comparison.statsB.sampleSD : comparison.statsB.popSD;
    const resList = [
      `Mean A = ${comparison.statsA.mean.toFixed(2)}, Mean B = ${comparison.statsB.mean.toFixed(2)}`,
      `SD A = ${sdA.toFixed(4)}, SD B = ${sdB.toFixed(4)}`,
      `Variance Ratio F = ${comparison.fRatio.toFixed(4)}`,
      `Pooled SD = ${comparison.pooledSD.toFixed(4)}`
    ];

    const newItem: SavedStdDevItem = {
      id: Date.now().toString(),
      title: `Compare A vs B (F=${comparison.fRatio.toFixed(2)})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `F = ${comparison.fRatio.toFixed(4)}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedCompItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedCompItems(updated);
    try {
      localStorage.setItem("saved_stddev_compare", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedComp(true);
    setTimeout(() => setJustSavedComp(false), 2000);
  };

  // Save Card 3 Handler
  const handleSaveCI = () => {
    const inputsStr = `Mean: ${ciMean}, SD: ${ciSD}, N: ${ciN}, Confidence: ${ciLevel}%`;
    const opStr = `Confidence Interval Calculation`;
    const lower = (ciMeanNum - marginOfError).toFixed(4);
    const upper = (ciMeanNum + marginOfError).toFixed(4);
    const resList = [
      `Margin of Error (ME) = ${marginOfError.toFixed(4)}`,
      `Confidence Interval = [${lower}, ${upper}]`,
      `Critical z-score = ${zScore.toFixed(3)}`
    ];

    const newItem: SavedStdDevItem = {
      id: Date.now().toString(),
      title: `CI ${ciLevel}% [${lower}, ${upper}]`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `[${lower}, ${upper}]`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedCIItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedCIItems(updated);
    try {
      localStorage.setItem("saved_stddev_ci", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedCI(true);
    setTimeout(() => setJustSavedCI(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: SINGLE DATASET STANDARD DEVIATION & VARIANCE ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Single Dataset Standard Deviation &amp; Variance Engine</span>
          <button
            type="button"
            onClick={handleSaveSingle}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSingle ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT FORM */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  <span>Input Data &amp; Variance Type</span>
                </h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Numbers (Separated by commas, spaces, or lines):
                  </label>
                  <textarea
                    rows={4}
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    placeholder="e.g. 10, 12, 23, 23, 16, 23, 21, 16"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Calculation Type (Bessel's Correction):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      onClick={() => setIsSample(true)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                        isSample
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white dark:bg-slate-800 border-slate-300 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <input type="radio" checked={isSample} onChange={() => {}} className="sr-only" />
                      <span>Sample SD (s, N - 1)</span>
                    </label>

                    <label
                      onClick={() => setIsSample(false)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                        !isSample
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white dark:bg-slate-800 border-slate-300 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <input type="radio" checked={!isSample} onChange={() => {}} className="sr-only" />
                      <span>Population SD (&sigma;, N)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT DISPLAY */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Standard Deviation ({isSample ? "s" : "σ"})
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {isSample ? "Sample (N - 1)" : "Population (N)"}
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">
                  {activeSD.toFixed(4)}
                </div>
                <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  Variance ({isSample ? "s²" : "σ²"}): {activeVar.toFixed(4)}
                </p>

                <div className="grid grid-cols-4 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Count (N)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{stats.count}</span>
                  </div>

                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Mean (x̄)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{stats.mean.toFixed(2)}</span>
                  </div>

                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Std Error</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{stats.stdError.toFixed(2)}</span>
                  </div>

                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">CV %</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{stats.coeffVar.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL ANALYTICS SUITE */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Visual Analytics &amp; Step-by-Step Variance Table</span>
              </h3>

              <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveVisual("bell")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual === "bell" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Bell Curve (Empirical)
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisual("box")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual === "box" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Box Plot
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisual("steps")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual === "steps" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Variance Table
                </button>
              </div>
            </div>

            {/* TAB 1: BELL CURVE SVG */}
            {activeVisual === "bell" && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Gaussian Normal Distribution Shaded Bands (Empirical Rule 68–95–99.7%):
                </h4>
                <div className="w-full flex justify-center py-2 overflow-x-auto">
                  <svg viewBox="0 0 500 160" className="w-full max-w-xl h-auto">
                    <path d="M 175,140 Q 250,20 325,140 Z" fill="#bfdbfe" opacity="0.6" />
                    <path d="M 100,140 Q 250,10 400,140 Z" fill="#dbeafe" opacity="0.3" />
                    <path d="M 20,140 C 100,140 160,20 250,20 C 340,20 400,140 480,140" fill="none" stroke="#2563eb" strokeWidth="3" />
                    <line x1="250" y1="20" x2="250" y2="140" stroke="#1e40af" strokeWidth="2" strokeDasharray="4 2" />
                    <text x="250" y="155" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                      x̄ = {stats.mean.toFixed(2)}
                    </text>
                    <line x1="175" y1="130" x2="175" y2="140" stroke="#475569" strokeWidth="2" />
                    <text x="175" y="155" textAnchor="middle" className="text-[9px] font-mono fill-slate-600">
                      {(stats.mean - activeSD).toFixed(1)} (-1σ)
                    </text>
                    <line x1="325" y1="130" x2="325" y2="140" stroke="#475569" strokeWidth="2" />
                    <text x="325" y="155" textAnchor="middle" className="text-[9px] font-mono fill-slate-600">
                      {(stats.mean + activeSD).toFixed(1)} (+1σ)
                    </text>
                  </svg>
                </div>
              </div>
            )}

            {/* TAB 2: BOX PLOT SVG */}
            {activeVisual === "box" && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Five-Number Summary Box &amp; Whisker Plot:
                </h4>
                <div className="w-full flex justify-center py-3 overflow-x-auto">
                  <svg viewBox="0 0 500 100" className="w-full max-w-xl h-auto">
                    <line x1="50" y1="50" x2="450" y2="50" stroke="#475569" strokeWidth="2" />
                    <rect x="150" y="30" width="200" height="40" fill="#3b82f6" opacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
                    <line x1="250" y1="30" x2="250" y2="70" stroke="#1e40af" strokeWidth="3" />
                    <text x="50" y="85" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700">Min: {stats.min}</text>
                    <text x="150" y="85" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700">Q1: {stats.q1}</text>
                    <text x="250" y="85" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-700">Med: {stats.median}</text>
                    <text x="350" y="85" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700">Q3: {stats.q3}</text>
                    <text x="450" y="85" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700">Max: {stats.max}</text>
                  </svg>
                </div>
              </div>
            )}

            {/* TAB 3: VARIANCE STEP TABLE */}
            {activeVisual === "steps" && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Complete Step-by-Step Variance Table (N = {stats.count}, Mean x̄ = {stats.mean.toFixed(2)}):
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead>
                      <tr className="bg-blue-600 text-white font-bold">
                        <th className="p-2">Index (i)</th>
                        <th className="p-2">Data Value (x_i)</th>
                        <th className="p-2">Deviation (x_i - x̄)</th>
                        <th className="p-2">Squared Deviation (x_i - x̄)²</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono bg-slate-50 dark:bg-slate-800/50">
                      {stats.stepTable.map((row) => (
                        <tr key={row.index}>
                          <td className="p-2 font-bold text-slate-500">{row.index}</td>
                          <td className="p-2 font-bold text-slate-900 dark:text-slate-100">{row.val}</td>
                          <td className="p-2">{row.dev >= 0 ? `+${row.dev}` : row.dev}</td>
                          <td className="p-2 text-blue-600 font-bold">{row.devSq}</td>
                        </tr>
                      ))}
                      <tr className="bg-blue-50 dark:bg-slate-800 font-bold border-t-2 border-blue-600">
                        <td className="p-2" colSpan={3}>Sum of Squared Deviations (SS):</td>
                        <td className="p-2 text-blue-700 dark:text-blue-300 text-sm">{stats.sumSqDev.toFixed(4)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* EMBEDDED SAVED SINGLE DATASET CALCULATIONS INSIDE CARD 1 */}
          {savedSingleItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Standard Deviation Calculations ({savedSingleItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSingleItems([]);
                    try { localStorage.removeItem("saved_stddev_single"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedSingleItems.map((item) => {
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
                            const updated = savedSingleItems.filter(i => i.id !== item.id);
                            setSavedSingleItems(updated);
                            try { localStorage.setItem("saved_stddev_single", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 2: DUAL DATASET COMPARISON & VARIANCE RATIO SOLVER (A vs B) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Dual Dataset Comparison &amp; Variance Ratio Solver (A vs B)</span>
          <button
            type="button"
            onClick={handleSaveComp}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedComp ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Two Dataset Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Dataset A Numbers:</label>
                  <textarea
                    rows={2}
                    value={rawInputA}
                    onChange={(e) => setRawInputA(e.target.value)}
                    placeholder="e.g. 10, 12, 15, 18, 20"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Dataset B Numbers:</label>
                  <textarea
                    rows={2}
                    value={rawInputB}
                    onChange={(e) => setRawInputB(e.target.value)}
                    placeholder="e.g. 14, 16, 19, 22, 25"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: DUAL DATASET OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Comparative Metrics Breakdown
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono font-bold">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-0.5">
                      <span className="text-[10px] text-slate-400 block uppercase">Dataset A</span>
                      <p>Mean: {comparison.statsA.mean.toFixed(2)}</p>
                      <p className="text-blue-600">SD: {(isSample ? comparison.statsA.sampleSD : comparison.statsA.popSD).toFixed(4)}</p>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-0.5">
                      <span className="text-[10px] text-slate-400 block uppercase">Dataset B</span>
                      <p>Mean: {comparison.statsB.mean.toFixed(2)}</p>
                      <p className="text-blue-600">SD: {(isSample ? comparison.statsB.sampleSD : comparison.statsB.popSD).toFixed(4)}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Variance Ratio F</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{comparison.fRatio.toFixed(4)}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Pooled SD (s_p)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{comparison.pooledSD.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED DATASET COMPARISONS INSIDE CARD 2 */}
          {savedCompItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Dataset Comparisons ({savedCompItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCompItems([]);
                    try { localStorage.removeItem("saved_stddev_compare"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedCompItems.map((item) => {
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
                            const updated = savedCompItems.filter(i => i.id !== item.id);
                            setSavedCompItems(updated);
                            try { localStorage.setItem("saved_stddev_compare", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 3: CONFIDENCE INTERVAL & MARGIN OF ERROR CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Confidence Interval &amp; Margin of Error Calculator</span>
          <button
            type="button"
            onClick={handleSaveCI}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCI ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Confidence Parameters
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Confidence Level (%):</label>
                  <select
                    value={ciLevel}
                    onChange={(e) => setCiLevel(parseInt(e.target.value, 10))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold text-xs"
                  >
                    <option value={90}>90% Confidence (z = 1.645)</option>
                    <option value={95}>95% Confidence (z = 1.960)</option>
                    <option value={99}>99% Confidence (z = 2.576)</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Mean (x̄):</label>
                    <input
                      type="number"
                      step="any"
                      value={ciMean}
                      onChange={(e) => setCiMean(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Std Dev (s):</label>
                    <input
                      type="number"
                      step="any"
                      value={ciSD}
                      onChange={(e) => setCiSD(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Sample (N):</label>
                    <input
                      type="number"
                      min="1"
                      value={ciN}
                      onChange={(e) => setCiN(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CONFIDENCE INTERVAL OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Confidence Interval Range [{ciLevel}%]
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    [{(ciMeanNum - marginOfError).toFixed(4)}, {(ciMeanNum + marginOfError).toFixed(4)}]
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Margin of Error (ME)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">&plusmn;{marginOfError.toFixed(4)}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Critical z-score</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{zScore.toFixed(3)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED CONFIDENCE INTERVALS INSIDE CARD 3 */}
          {savedCIItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Confidence Intervals ({savedCIItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCIItems([]);
                    try { localStorage.removeItem("saved_stddev_ci"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedCIItems.map((item) => {
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
                            const updated = savedCIItems.filter(i => i.id !== item.id);
                            setSavedCIItems(updated);
                            try { localStorage.setItem("saved_stddev_ci", JSON.stringify(updated)); } catch(e){}
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

export default StdDevCalculator;
