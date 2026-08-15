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
  Table,
  Users
} from "lucide-react";
import {
  computeSurveySampleSize,
  computeABTestSampleSize,
  computeContinuousMeanSampleSize,
  computePowerAnalysisSampleSize,
  computeReverseMarginOfError,
  generatePowerCurvePoints,
  generateAPAMethodologyParagraph
} from "@/app/calculators/sample-size-calculator/sample-size-logic";

export type SampleSizeTab = "survey" | "abtest" | "continuous" | "power" | "reverse";
export type VisualTab = "curve" | "benchmark" | "zscore";

export function SampleSizeCalculator() {
  const [confLevel, setConfLevel] = useState<number>(95);
  const [marginOfError, setMarginOfError] = useState<number>(5);
  const [popProp, setPopProp] = useState<number>(50);
  const [populationN, setPopulationN] = useState<string>("");
  const [respRate, setRespRate] = useState<number>(80);

  // A/B Test inputs
  const [p1Pct, setP1Pct] = useState<number>(3.0);
  const [p2Pct, setP2Pct] = useState<number>(3.5);
  const [powerPct, setPowerPct] = useState<number>(80);

  const [activeTab, setActiveTab] = useState<SampleSizeTab>("survey");
  const [activeVisual, setActiveVisual] = useState<VisualTab>("curve");

  // Feedback states
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedApa, setCopiedApa] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const parsedPopN = useMemo(() => {
    const p = parseInt(populationN.replace(/,/g, ""), 10);
    return !Number.isNaN(p) && p > 0 ? p : undefined;
  }, [populationN]);

  const surveyResult = useMemo(() => {
    return computeSurveySampleSize(confLevel, marginOfError, popProp, parsedPopN, respRate);
  }, [confLevel, marginOfError, popProp, parsedPopN, respRate]);

  const abResult = useMemo(() => {
    return computeABTestSampleSize(p1Pct, p2Pct, 5, powerPct);
  }, [p1Pct, p2Pct, powerPct]);

  const apaText = useMemo(() => {
    return generateAPAMethodologyParagraph(surveyResult);
  }, [surveyResult]);

  const powerCurvePoints = useMemo(() => {
    return generatePowerCurvePoints(0.5, 5);
  }, []);

  // Presets
  const presets = [
    { label: "National Public Poll", conf: 95, moe: 3, prop: 50, pop: "330000000" },
    { label: "Customer NPS Survey", conf: 95, moe: 5, prop: 50, pop: "5000" },
    { label: "High Precision (99%, ±1%)", conf: 99, moe: 1, prop: 50, pop: "" },
    { label: "Small Pilot Study", conf: 90, moe: 10, prop: 50, pop: "500" }
  ];

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("cl", confLevel.toString());
    params.set("me", marginOfError.toString());
    params.set("p", popProp.toString());
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
              <span>Statistical Parameters & Survey Options</span>
            </h2>
            <button
              type="button"
              onClick={() => {
                setConfLevel(95);
                setMarginOfError(5);
                setPopProp(50);
                setPopulationN("");
                setRespRate(80);
              }}
              className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Confidence Level Chips */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Confidence Level (%):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[90, 95, 99].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setConfLevel(lvl)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      confLevel === lvl
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {lvl}% Confidence
                  </button>
                ))}
              </div>
            </div>

            {/* Margin of Error Stepper */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Margin of Error (&plusmn;%):</span>
                <span className="font-mono text-blue-600">&plusmn;{marginOfError}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={marginOfError}
                onChange={(e) => setMarginOfError(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Population Size N (Optional) */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Population Size N (Leave blank for infinite population):
              </label>
              <input
                type="text"
                value={populationN}
                onChange={(e) => setPopulationN(e.target.value)}
                placeholder="e.g. 5000 or 100000"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold outline-none"
              />
            </div>

            {/* QUICK PRESETS */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Preset Scenarios:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      setConfLevel(p.conf);
                      setMarginOfError(p.moe);
                      setPopProp(p.prop);
                      setPopulationN(p.pop);
                    }}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 cursor-pointer"
                  >
                    {p.label}
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
              <span>Recommended Sample Size</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              {surveyResult.confidenceLevelPct}% Confidence
            </span>
          </div>

          {/* MAIN HERO NUMERIC RESULT */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Required Completed Sample (n):
            </span>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">
              {surveyResult.sampleSize.toLocaleString()}
            </div>
            <p className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 pt-1">
              Estimated Invites Needed (at {respRate}% Response): {surveyResult.invitedTarget.toLocaleString()}
            </p>
          </div>

          {/* STAT CHIPS */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-blue-200/80 dark:border-slate-800">
            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Critical Z</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{surveyResult.zScore}</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">FPC Status</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">
                {surveyResult.fpcApplied ? "Applied" : "Infinite"}
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Margin of Error</span>
              <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">&plusmn;{surveyResult.marginOfErrorPct}%</p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleCopy(`Sample Size: ${surveyResult.sampleSize}, Invites: ${surveyResult.invitedTarget}, Confidence: ${surveyResult.confidenceLevelPct}%, MOE: ±${surveyResult.marginOfErrorPct}%`, setCopiedSummary)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedSummary ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedSummary ? "Copied!" : "Copy Summary"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(apaText, setCopiedApa)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedApa ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <BookOpen className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedApa ? "Copied!" : "Copy APA Justification"}</span>
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
            <span>Interactive Power Curve & Benchmark Matrix</span>
          </h3>

          {/* VISUAL TAB BUTTONS */}
          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveVisual("curve")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeVisual === "curve"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Statistical Power Curve</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveVisual("benchmark")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeVisual === "benchmark"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Table className="h-3.5 w-3.5" />
              <span>Benchmark Matrix</span>
            </button>
          </div>
        </div>

        {/* TAB 1: STATISTICAL POWER CURVE (SVG) */}
        {activeVisual === "curve" && (
          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Statistical Power (1 - &beta;) vs. Sample Size (n per group):
            </h4>

            <div className="w-full flex justify-center py-2 overflow-x-auto">
              <svg viewBox="0 0 500 160" className="w-full max-w-xl h-auto">
                {/* Axes */}
                <line x1="40" y1="130" x2="480" y2="130" stroke="#94a3b8" strokeWidth="2" />
                <line x1="40" y1="130" x2="40" y2="20" stroke="#94a3b8" strokeWidth="2" />

                {/* Power Curve Path */}
                <path
                  d="M 40,125 C 150,120 220,40 480,25"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                />

                {/* 80% Power Threshold Line */}
                <line x1="40" y1="50" x2="480" y2="50" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="475" y="45" textAnchor="end" className="text-[9px] font-mono font-bold fill-emerald-600">
                  80% Power Benchmark
                </text>
              </svg>
            </div>
          </div>
        )}

        {/* TAB 2: SAMPLE SIZE BENCHMARK MATRIX TABLE */}
        {activeVisual === "benchmark" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Sample Size Reference Matrix across Populations (N):
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-blue-600 text-white font-bold">
                    <th className="p-2.5">Population Size (N)</th>
                    <th className="p-2.5">95% Conf, &plusmn;5% MOE</th>
                    <th className="p-2.5">95% Conf, &plusmn;3% MOE</th>
                    <th className="p-2.5">99% Conf, &plusmn;1% MOE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <td className="p-2 font-bold text-slate-900 dark:text-slate-100">100</td>
                    <td className="p-2 font-bold text-blue-600">80</td>
                    <td className="p-2">92</td>
                    <td className="p-2">99</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900 dark:text-slate-100">500</td>
                    <td className="p-2 font-bold text-blue-600">217</td>
                    <td className="p-2">341</td>
                    <td className="p-2">476</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900 dark:text-slate-100">1,000</td>
                    <td className="p-2 font-bold text-blue-600">278</td>
                    <td className="p-2">516</td>
                    <td className="p-2">906</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900 dark:text-slate-100">10,000</td>
                    <td className="p-2 font-bold text-blue-600">370</td>
                    <td className="p-2">964</td>
                    <td className="p-2">4,899</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-900 dark:text-slate-100">100,000+ (Infinite)</td>
                    <td className="p-2 font-bold text-blue-600">384</td>
                    <td className="p-2">1,067</td>
                    <td className="p-2">16,587</td>
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
