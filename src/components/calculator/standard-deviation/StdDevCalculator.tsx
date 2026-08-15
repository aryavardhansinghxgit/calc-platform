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
  parseDataset,
  computeDescriptiveStats,
  computeFrequencyStats,
  compareTwoDatasets
} from "@/app/calculators/standard-deviation-calculator/std-dev-logic";

export type StdDevTab = "raw" | "freq" | "summary" | "compare" | "ci";
export type VisualTab = "bell" | "box" | "steps" | "matrix";

export function StdDevCalculator() {
  const [rawInput, setRawInput] = useState<string>("10, 12, 23, 23, 16, 23, 21, 16");
  const [isSample, setIsSample] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<StdDevTab>("raw");
  const [activeVisual, setActiveVisual] = useState<VisualTab>("bell");

  // Two Dataset inputs
  const [rawInputA, setRawInputA] = useState<string>("10, 12, 15, 18, 20");
  const [rawInputB, setRawInputB] = useState<string>("14, 16, 19, 22, 25");

  // Feedback states
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedTable, setCopiedTable] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const data = useMemo(() => parseDataset(rawInput), [rawInput]);
  const stats = useMemo(() => computeDescriptiveStats(data, isSample), [data, isSample]);

  const comparison = useMemo(() => {
    const dA = parseDataset(rawInputA);
    const dB = parseDataset(rawInputB);
    return compareTwoDatasets(dA, dB);
  }, [rawInputA, rawInputB]);

  // Presets
  const presets = [
    { label: "Classroom Test Scores", data: "78, 85, 92, 64, 88, 73, 90, 81, 95, 68" },
    { label: "Manufacturing Heights", data: "172.4, 175.1, 169.8, 171.2, 174.0, 173.5" },
    { label: "Stock Returns (%)", data: "4.2, -1.8, 8.5, 3.1, -0.4, 12.0, -5.2, 6.7" },
    { label: "Outlier Dataset", data: "10, 12, 14, 11, 13, 15, 95" }
  ];

  const activeSD = isSample ? stats.sampleSD : stats.popSD;
  const activeVar = isSample ? stats.sampleVar : stats.popVar;

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("d", rawInput.substring(0, 100));
    params.set("s", isSample ? "1" : "0");
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    handleCopy(shareableUrl, setCopiedUrl);
  };

  return (
    <div className="space-y-6">
      {/* INPUT & HERO RESULT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* LEFT CARD: INPUT FORM & SAMPLE VS POPULATION TOGGLE */}
        <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-600" />
              <span>Input Data & Variance Type</span>
            </h2>
            <button
              type="button"
              onClick={() => {
                setRawInput("10, 12, 23, 23, 16, 23, 21, 16");
                setIsSample(true);
              }}
              className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Raw Dataset Textarea */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Numbers (Separated by commas, spaces, or lines):
              </label>
              <textarea
                rows={4}
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                placeholder="e.g. 10, 12, 23, 23, 16, 23, 21, 16"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              />
            </div>

            {/* Sample vs Population Radio Toggle */}
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

            {/* QUICK PRESET CHIPS */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Sample Datasets:
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
              <span>Descriptive Statistics Dashboard</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              {isSample ? "Sample (N - 1)" : "Population (N)"}
            </span>
          </div>

          {/* MAIN HERO NUMERIC RESULT (SD & VARIANCE) */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Standard Deviation ({isSample ? "s" : "σ"}):
            </span>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">
              {activeSD.toFixed(4)}
            </div>
            <p className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 pt-1">
              Variance ({isSample ? "s²" : "σ²"}): {activeVar.toFixed(4)}
            </p>
          </div>

          {/* STAT CHIPS */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-blue-200/80 dark:border-slate-800">
            <div className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Count (N)</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{stats.count}</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Mean (x̄)</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{stats.mean.toFixed(2)}</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Std Error</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{stats.stdError.toFixed(2)}</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">CV %</span>
              <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{stats.coeffVar.toFixed(1)}%</p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleCopy(`Count: ${stats.count}, Mean: ${stats.mean}, SD: ${activeSD}, Variance: ${activeVar}`, setCopiedSummary)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedSummary ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedSummary ? "Copied!" : "Copy Summary"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(stats.stepTable.map(r => `${r.index},${r.val},${r.dev},${r.devSq}`).join("\n"), setCopiedTable)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedTable ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <BookOpen className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedTable ? "Copied!" : "Copy Table"}</span>
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
            <span>Visual Analytics & Step-by-Step Derivation</span>
          </h3>

          {/* VISUAL TAB BUTTONS */}
          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveVisual("bell")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeVisual === "bell"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Bell Curve (Empirical Rule)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveVisual("box")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeVisual === "box"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <BarChart2 className="h-3.5 w-3.5" />
              <span>Box & Whisker Plot</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveVisual("steps")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeVisual === "steps"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Table className="h-3.5 w-3.5" />
              <span>Variance Step Table</span>
            </button>
          </div>
        </div>

        {/* TAB 1: BELL CURVE NORMAL DISTRIBUTION CHART (SVG) */}
        {activeVisual === "bell" && (
          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Gaussian Normal Distribution Shaded Bands (Empirical Rule 68–95–99.7%):
            </h4>

            <div className="w-full flex justify-center py-2 overflow-x-auto">
              <svg viewBox="0 0 500 160" className="w-full max-w-xl h-auto">
                {/* 68% Shaded Region */}
                <path d="M 175,140 Q 250,20 325,140 Z" fill="#bfdbfe" opacity="0.6" />
                {/* 95% Shaded Region */}
                <path d="M 100,140 Q 250,10 400,140 Z" fill="#dbeafe" opacity="0.3" />

                {/* Bell Curve Stroke */}
                <path
                  d="M 20,140 C 100,140 160,20 250,20 C 340,20 400,140 480,140"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                />

                {/* Mean Line (x̄) */}
                <line x1="250" y1="20" x2="250" y2="140" stroke="#1e40af" strokeWidth="2" strokeDasharray="4 2" />
                <text x="250" y="155" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                  x̄ = {stats.mean.toFixed(2)}
                </text>

                {/* -1SD & +1SD Ticks */}
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

            <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
              68.27% of values fall within &plusmn;1SD ({(stats.mean - activeSD).toFixed(2)} to {(stats.mean + activeSD).toFixed(2)}).
            </p>
          </div>
        )}

        {/* TAB 2: BOX & WHISKER PLOT (SVG) */}
        {activeVisual === "box" && (
          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Five-Number Summary Box & Whisker Plot:
            </h4>

            <div className="w-full flex justify-center py-4 overflow-x-auto">
              <svg viewBox="0 0 500 100" className="w-full max-w-xl h-auto">
                {/* Horizontal Whisker Line */}
                <line x1="50" y1="50" x2="450" y2="50" stroke="#475569" strokeWidth="2" />

                {/* Box (Q1 to Q3) */}
                <rect x="150" y="30" width="200" height="40" fill="#3b82f6" opacity="0.3" stroke="#1d4ed8" strokeWidth="2" />

                {/* Median Line */}
                <line x1="250" y1="30" x2="250" y2="70" stroke="#1e40af" strokeWidth="3" />

                {/* Labels */}
                <text x="50" y="85" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700">Min: {stats.min}</text>
                <text x="150" y="85" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700">Q1: {stats.q1}</text>
                <text x="250" y="85" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-700">Med: {stats.median}</text>
                <text x="350" y="85" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700">Q3: {stats.q3}</text>
                <text x="450" y="85" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700">Max: {stats.max}</text>
              </svg>
            </div>
          </div>
        )}

        {/* TAB 3: STEP-BY-STEP VARIANCE TABLE */}
        {activeVisual === "steps" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Complete Step-by-Step Variance Table (N = {stats.count}, Mean x̄ = {stats.mean.toFixed(2)}):
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-blue-600 text-white font-bold">
                    <th className="p-2.5">Index (i)</th>
                    <th className="p-2.5">Data Value (x_i)</th>
                    <th className="p-2.5">Deviation (x_i - x̄)</th>
                    <th className="p-2.5">Squared Deviation (x_i - x̄)²</th>
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
                    <td className="p-2.5" colSpan={3}>Sum of Squared Deviations (SS):</td>
                    <td className="p-2.5 text-blue-700 dark:text-blue-300 text-sm">{stats.sumSqDev.toFixed(4)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
