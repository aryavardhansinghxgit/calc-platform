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
  BarChart2,
  TrendingUp,
  Table
} from "lucide-react";
import {
  parseSequenceInput,
  detectSequencePattern,
  generateFiniteDifferenceTable
} from "@/app/calculators/number-sequence-calculator/sequence-logic";

export type SequenceTab = "auto" | "arithmetic" | "geometric" | "fibonacci" | "finite";
export type VisualTab = "plot" | "table" | "terms";

export function SequenceCalculator() {
  const [rawInput, setRawInput] = useState<string>("2, 5, 10, 17, 26");
  const [targetN, setTargetN] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<SequenceTab>("auto");
  const [activeVisual, setActiveVisual] = useState<VisualTab>("plot");

  // Feedback states
  const [copiedFormula, setCopiedFormula] = useState<boolean>(false);
  const [copiedTerms, setCopiedTerms] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const terms = useMemo(() => parseSequenceInput(rawInput), [rawInput]);
  const analysis = useMemo(() => detectSequencePattern(terms, targetN), [terms, targetN]);
  const diffTable = useMemo(() => generateFiniteDifferenceTable(terms), [terms]);

  // Presets
  const presets = [
    { label: "Arithmetic (3, 7, 11...)", data: "3, 7, 11, 15, 19, 23" },
    { label: "Geometric (2, 6, 18...)", data: "2, 6, 18, 54, 162" },
    { label: "Quadratic (2, 5, 10...)", data: "2, 5, 10, 17, 26, 37" },
    { label: "Fibonacci (1, 1, 2, 3...)", data: "1, 1, 2, 3, 5, 8, 13, 21" },
    { label: "Cubic (1, 8, 27, 64...)", data: "1, 8, 27, 64, 125" }
  ];

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("seq", rawInput);
    params.set("n", targetN.toString());
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
              <span>Input Sequence & Target Index</span>
            </h2>
            <button
              type="button"
              onClick={() => {
                setRawInput("2, 5, 10, 17, 26");
                setTargetN(10);
              }}
              className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Raw Sequence Textarea */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Sequence Terms (Separated by commas or spaces):
              </label>
              <textarea
                rows={3}
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                placeholder="e.g. 2, 5, 10, 17, 26"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none"
              />
            </div>

            {/* Target Term Index N */}
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

            {/* QUICK PRESETS */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Pattern Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setRawInput(preset.data)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD: HERO RESULT DISPLAY */}
        <div className="md:col-span-6 bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-slate-50 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 border border-blue-200 dark:border-slate-700 rounded-2xl p-6 space-y-5 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-blue-200/80 dark:border-slate-800 pb-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Sequence Analysis Engine</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              {analysis.typeName}
            </span>
          </div>

          {/* MAIN HERO NUMERIC RESULT & FORMULA */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Explicit Formula (a_n):
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight break-all">
              {analysis.explicitFormula}
            </div>
            <p className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 pt-1">
              Target Term a_{targetN} = {analysis.targetTerm}
            </p>
          </div>

          {/* STAT CHIPS */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-blue-200/80 dark:border-slate-800">
            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">First Term (a₁)</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{analysis.firstTerm}</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Diff / Ratio</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">
                {analysis.commonDiff !== undefined ? `d = ${analysis.commonDiff}` : analysis.commonRatio !== undefined ? `r = ${analysis.commonRatio}` : "N/A"}
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Partial Sum (S_{targetN})</span>
              <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{analysis.partialSum}</p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleCopy(analysis.explicitFormula, setCopiedFormula)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedFormula ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedFormula ? "Copied!" : "Copy Formula"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(terms.join(", "), setCopiedTerms)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedTerms ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <BookOpen className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedTerms ? "Copied!" : "Copy Terms"}</span>
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

      {/* VISUAL ANALYTICS & SEGMENTED TABS SUITE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Interactive 2D Visualizer & Finite Differences Table</span>
          </h3>

          {/* VISUAL TAB BUTTONS */}
          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveVisual("plot")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeVisual === "plot"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>2D Coordinate Scatter Plot</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveVisual("table")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeVisual === "table"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Table className="h-3.5 w-3.5" />
              <span>Finite Differences Table</span>
            </button>
          </div>
        </div>

        {/* TAB 1: 2D COORDINATE SCATTER PLOT (SVG) */}
        {activeVisual === "plot" && (
          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Discrete Coordinate Plot (n vs a_n):
            </h4>

            <div className="w-full flex justify-center py-2 overflow-x-auto">
              <svg viewBox="0 0 500 160" className="w-full max-w-xl h-auto">
                {/* Axes */}
                <line x1="40" y1="130" x2="480" y2="130" stroke="#94a3b8" strokeWidth="2" />
                <line x1="40" y1="130" x2="40" y2="20" stroke="#94a3b8" strokeWidth="2" />

                {/* Terms Plot Points */}
                {terms.slice(0, 10).map((t, idx) => {
                  const x = 40 + (idx + 1) * 40;
                  const maxVal = Math.max(...terms.slice(0, 10), 1);
                  const y = 130 - (t / maxVal) * 100;
                  return (
                    <g key={idx}>
                      <circle cx={x} cy={y} r="4" fill="#2563eb" />
                      <text x={x} y="145" textAnchor="middle" className="text-[9px] font-mono fill-slate-600">
                        {idx + 1}
                      </text>
                      <text x={x} y={y - 8} textAnchor="middle" className="text-[9px] font-mono font-bold fill-blue-700">
                        {t}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {/* TAB 2: METHOD OF FINITE DIFFERENCES TABLE */}
        {activeVisual === "table" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Method of Finite Differences Table:
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-blue-600 text-white font-bold">
                    <th className="p-2.5">Level</th>
                    <th className="p-2.5">Difference Layer</th>
                    <th className="p-2.5">Values</th>
                    <th className="p-2.5">Constant Status</th>
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
    </div>
  );
}
