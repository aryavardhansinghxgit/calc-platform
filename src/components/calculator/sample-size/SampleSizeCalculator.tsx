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
  Users,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import {
  computeSurveySampleSize,
  computeABTestSampleSize,
  computeReverseMarginOfError,
  generatePowerCurvePoints,
  generateAPAMethodologyParagraph
} from "@/app/calculators/sample-size-calculator/sample-size-logic";

export type VisualTab = "curve" | "benchmark";

export interface SavedSampleSizeItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function SampleSizeCalculator() {
  // Card 1 Inputs: Survey Sample Size
  const [confLevel, setConfLevel] = useState<number>(95);
  const [marginOfError, setMarginOfError] = useState<number>(5);
  const [popProp, setPopProp] = useState<number>(50);
  const [populationN, setPopulationN] = useState<string>("");
  const [respRate, setRespRate] = useState<number>(80);
  const [activeVisual, setActiveVisual] = useState<VisualTab>("curve");

  // Card 2 Inputs: A/B Test Sample Size
  const [p1Pct, setP1Pct] = useState<number>(3.0);
  const [p2Pct, setP2Pct] = useState<number>(3.5);
  const [powerPct, setPowerPct] = useState<number>(80);

  // Card 3 Inputs: Reverse MOE Calculator
  const [revSampleN, setRevSampleN] = useState<number>(400);
  const [revConfLevel, setRevConfLevel] = useState<number>(95);
  const [revPopN, setRevPopN] = useState<string>("");

  // Action feedback states
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedApa, setCopiedApa] = useState<boolean>(false);

  // Saved calculation states for Card 1, 2, 3
  const [savedSurveyItems, setSavedSurveyItems] = useState<SavedSampleSizeItem[]>([]);
  const [justSavedSurvey, setJustSavedSurvey] = useState<boolean>(false);

  const [savedABItems, setSavedABItems] = useState<SavedSampleSizeItem[]>([]);
  const [justSavedAB, setJustSavedAB] = useState<boolean>(false);

  const [savedRevItems, setSavedRevItems] = useState<SavedSampleSizeItem[]>([]);
  const [justSavedRev, setJustSavedRev] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedSurvey = localStorage.getItem("saved_samplesize_survey");
      if (storedSurvey) setSavedSurveyItems(JSON.parse(storedSurvey));

      const storedAB = localStorage.getItem("saved_samplesize_ab");
      if (storedAB) setSavedABItems(JSON.parse(storedAB));

      const storedRev = localStorage.getItem("saved_samplesize_reverse");
      if (storedRev) setSavedRevItems(JSON.parse(storedRev));
    } catch (e) {}
  }, []);

  // Card 1 Calculations: Survey Sample Size
  const parsedPopN = useMemo(() => {
    const p = parseInt(populationN.replace(/,/g, ""), 10);
    return !Number.isNaN(p) && p > 0 ? p : undefined;
  }, [populationN]);

  const surveyResult = useMemo(() => {
    return computeSurveySampleSize(confLevel, marginOfError, popProp, parsedPopN, respRate);
  }, [confLevel, marginOfError, popProp, parsedPopN, respRate]);

  const apaText = useMemo(() => {
    return generateAPAMethodologyParagraph(surveyResult);
  }, [surveyResult]);

  // Card 2 Calculations: A/B Test Sample Size
  const abResult = useMemo(() => {
    return computeABTestSampleSize(p1Pct, p2Pct, 5, powerPct);
  }, [p1Pct, p2Pct, powerPct]);

  // Card 3 Calculations: Reverse MOE
  const parsedRevPopN = useMemo(() => {
    const p = parseInt(revPopN.replace(/,/g, ""), 10);
    return !Number.isNaN(p) && p > 0 ? p : undefined;
  }, [revPopN]);

  const revMOE = useMemo(() => {
    return computeReverseMarginOfError(revSampleN, revConfLevel, 50, parsedRevPopN);
  }, [revSampleN, revConfLevel, parsedRevPopN]);

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      navigator.clipboard.writeText(text);
      setFn(true);
      setTimeout(() => setFn(false), 2000);
    } catch (e) {}
  };

  // Save Card 1 Handler
  const handleSaveSurvey = () => {
    const inputsStr = `Conf: ${confLevel}%, MOE: ±${marginOfError}%, Pop N: ${populationN || "Infinite"}, Resp Rate: ${respRate}%`;
    const opStr = `Survey Sample Size Calculation`;
    const resList = [
      `Required Sample Size (n) = ${surveyResult.sampleSize.toLocaleString()}`,
      `Invites Target = ${surveyResult.invitedTarget.toLocaleString()}`,
      `Critical z-score = ${surveyResult.zScore}`,
      `FPC Applied = ${surveyResult.fpcApplied ? "Yes" : "No"}`
    ];

    const newItem: SavedSampleSizeItem = {
      id: Date.now().toString(),
      title: `Survey (n=${surveyResult.sampleSize.toLocaleString()})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Sample n = ${surveyResult.sampleSize.toLocaleString()}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedSurveyItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedSurveyItems(updated);
    try {
      localStorage.setItem("saved_samplesize_survey", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedSurvey(true);
    setTimeout(() => setJustSavedSurvey(false), 2000);
  };

  // Save Card 2 Handler
  const handleSaveAB = () => {
    const inputsStr = `Baseline P1: ${p1Pct}%, Variant P2: ${p2Pct}%, Power: ${powerPct}%`;
    const opStr = `A/B Testing Sample Size Calculation`;
    const resList = [
      `Sample Size per Variant (nA = nB) = ${abResult.sampleSizePerVariant.toLocaleString()}`,
      `Total A/B Test Sample = ${abResult.totalSampleSize.toLocaleString()}`,
      `Relative Uplift / MDE = ${abResult.mdePct}%`,
      `Statistical Power = ${powerPct}%`
    ];

    const newItem: SavedSampleSizeItem = {
      id: Date.now().toString(),
      title: `A/B Test (${abResult.sampleSizePerVariant.toLocaleString()}/variant)`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Total N = ${abResult.totalSampleSize.toLocaleString()}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedABItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedABItems(updated);
    try {
      localStorage.setItem("saved_samplesize_ab", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedAB(true);
    setTimeout(() => setJustSavedAB(false), 2000);
  };

  // Save Card 3 Handler
  const handleSaveRev = () => {
    const inputsStr = `Sample Size n: ${revSampleN}, Conf Level: ${revConfLevel}%, Pop N: ${revPopN || "Infinite"}`;
    const opStr = `Reverse Margin of Error Calculation`;
    const resList = [
      `Achieved Margin of Error = ±${revMOE}%`,
      `Sample Size n = ${revSampleN}`,
      `Confidence Level = ${revConfLevel}%`
    ];

    const newItem: SavedSampleSizeItem = {
      id: Date.now().toString(),
      title: `Reverse MOE (±${revMOE}%)`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `MOE = ±${revMOE}%`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedRevItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedRevItems(updated);
    try {
      localStorage.setItem("saved_samplesize_reverse", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedRev(true);
    setTimeout(() => setJustSavedRev(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: SURVEY & POLLING SAMPLE SIZE ENGINE (COCHRAN'S FORMULA & FPC) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Survey &amp; Polling Sample Size Engine (Cochran's Formula &amp; FPC)</span>
          <button
            type="button"
            onClick={handleSaveSurvey}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSurvey ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT FORM */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  <span>Statistical Parameters &amp; Survey Options</span>
                </h2>
              </div>

              <div className="space-y-4">
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
                        {lvl}% Conf
                      </button>
                    ))}
                  </div>
                </div>

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
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT DISPLAY */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Recommended Completed Sample
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {surveyResult.confidenceLevelPct}% Confidence
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">
                  {surveyResult.sampleSize.toLocaleString()}
                </div>
                <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  Estimated Invites Needed (at {respRate}% Response): {surveyResult.invitedTarget.toLocaleString()}
                </p>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Critical Z</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{surveyResult.zScore}</span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">FPC Status</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">
                      {surveyResult.fpcApplied ? "Applied" : "Infinite"}
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Margin of Error</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">&plusmn;{surveyResult.marginOfErrorPct}%</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    APA Methodology Paragraph:
                  </span>
                  <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-sans leading-relaxed text-slate-700 dark:text-slate-300">
                    {apaText}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(apaText, setCopiedApa)}
                    className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-1.5 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700 mt-2"
                  >
                    {copiedApa ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <BookOpen className="w-3.5 h-3.5 text-blue-600" />}
                    <span>{copiedApa ? "Copied APA!" : "Copy APA Justification"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL ANALYTICS & BENCHMARK MATRIX */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Interactive Statistical Power Curve &amp; Benchmark Matrix</span>
              </h3>

              <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveVisual("curve")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual === "curve" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Statistical Power Curve
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisual("benchmark")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual === "benchmark" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Benchmark Matrix
                </button>
              </div>
            </div>

            {/* TAB 1: POWER CURVE SVG */}
            {activeVisual === "curve" && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Statistical Power (1 - &beta;) vs. Sample Size (n per group):
                </h4>
                <div className="w-full flex justify-center py-2 overflow-x-auto">
                  <svg viewBox="0 0 500 160" className="w-full max-w-xl h-auto">
                    <line x1="40" y1="130" x2="480" y2="130" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="40" y1="130" x2="40" y2="20" stroke="#94a3b8" strokeWidth="2" />
                    <path d="M 40,125 C 150,120 220,40 480,25" fill="none" stroke="#2563eb" strokeWidth="3" />
                    <line x1="40" y1="50" x2="480" y2="50" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="475" y="45" textAnchor="end" className="text-[9px] font-mono font-bold fill-emerald-600">
                      80% Power Benchmark
                    </text>
                  </svg>
                </div>
              </div>
            )}

            {/* TAB 2: BENCHMARK MATRIX TABLE */}
            {activeVisual === "benchmark" && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Sample Size Reference Matrix across Populations (N):
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead>
                      <tr className="bg-blue-600 text-white font-bold">
                        <th className="p-2">Population Size (N)</th>
                        <th className="p-2">95% Conf, &plusmn;5% MOE</th>
                        <th className="p-2">95% Conf, &plusmn;3% MOE</th>
                        <th className="p-2">99% Conf, &plusmn;1% MOE</th>
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

          {/* EMBEDDED SAVED SURVEY CALCULATIONS INSIDE CARD 1 */}
          {savedSurveyItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Survey Sample Calculations ({savedSurveyItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSurveyItems([]);
                    try { localStorage.removeItem("saved_samplesize_survey"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedSurveyItems.map((item) => {
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
                            const updated = savedSurveyItems.filter(i => i.id !== item.id);
                            setSavedSurveyItems(updated);
                            try { localStorage.setItem("saved_samplesize_survey", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 2: A/B TESTING & CONVERSION RATE SAMPLE SIZE CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>A/B Testing &amp; Conversion Rate Sample Size Calculator</span>
          <button
            type="button"
            onClick={handleSaveAB}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedAB ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                A/B Test Parameters
              </h2>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Baseline Rate P1 (%):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={p1Pct}
                      onChange={(e) => setP1Pct(parseFloat(e.target.value) || 0)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Variant Rate P2 (%):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={p2Pct}
                      onChange={(e) => setP2Pct(parseFloat(e.target.value) || 0)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Statistical Power (%):</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPowerPct(80)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        powerPct === 80 ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 border-slate-300"
                      }`}
                    >
                      80% Power (Standard)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPowerPct(90)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        powerPct === 90 ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 border-slate-300"
                      }`}
                    >
                      90% Power (High)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: A/B TEST OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Sample Size per Variation (nA = nB)
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {abResult.sampleSizePerVariant.toLocaleString()} / variant
                  </div>
                  <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    Total A/B Test Sample: {abResult.totalSampleSize.toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Relative Uplift / MDE</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{abResult.mdePct}%</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Statistical Power</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{powerPct}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED A/B TEST CALCULATIONS INSIDE CARD 2 */}
          {savedABItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved A/B Test Calculations ({savedABItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedABItems([]);
                    try { localStorage.removeItem("saved_samplesize_ab"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedABItems.map((item) => {
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
                            const updated = savedABItems.filter(i => i.id !== item.id);
                            setSavedABItems(updated);
                            try { localStorage.setItem("saved_samplesize_ab", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 3: REVERSE MARGIN OF ERROR CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Reverse Margin of Error Calculator</span>
          <button
            type="button"
            onClick={handleSaveRev}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedRev ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Reverse MOE Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Completed Sample Size (n):</label>
                  <input
                    type="number"
                    min="1"
                    value={revSampleN}
                    onChange={(e) => setRevSampleN(parseInt(e.target.value, 10) || 1)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Confidence Level (%):</label>
                  <select
                    value={revConfLevel}
                    onChange={(e) => setRevConfLevel(parseInt(e.target.value, 10))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold text-xs"
                  >
                    <option value={90}>90% Confidence</option>
                    <option value={95}>95% Confidence</option>
                    <option value={99}>99% Confidence</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Population N (Optional):</label>
                  <input
                    type="text"
                    value={revPopN}
                    onChange={(e) => setRevPopN(e.target.value)}
                    placeholder="Leave blank for infinite"
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: REVERSE MOE OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Achieved Margin of Error
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    &plusmn;{revMOE}%
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Precision Quality Rating</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">
                    {revMOE <= 3 ? "High Precision (±3% or better)" : revMOE <= 5 ? "Standard Survey Precision (±5%)" : "Low Precision (±5%+)"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED REVERSE MOE SOLVES INSIDE CARD 3 */}
          {savedRevItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Reverse MOE Calculations ({savedRevItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedRevItems([]);
                    try { localStorage.removeItem("saved_samplesize_reverse"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedRevItems.map((item) => {
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
                            const updated = savedRevItems.filter(i => i.id !== item.id);
                            setSavedRevItems(updated);
                            try { localStorage.setItem("saved_samplesize_reverse", JSON.stringify(updated)); } catch(e){}
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

export default SampleSizeCalculator;
