"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Calculator,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sliders,
  Layers,
  BarChart2,
  Activity,
  CheckCircle2,
  TrendingUp,
  Split,
  Table
} from "lucide-react";
import {
  parseDataset,
  computeUnivariateStats,
  computeGroupedStats,
  computeBivariateRegression,
  computeHypothesisTest,
  computeConfidenceInterval,
  approximateNormCDF
} from "@/app/calculators/statistics-calculator/statistics-logic";

export type UnivariateVisualTab = "hist" | "box" | "qq" | "table";

export interface SavedStatsItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function StatisticsCalculator() {
  // Card 1 Inputs: Univariate Descriptive Statistics
  const [rawInput, setRawInput] = useState<string>("4, 8, 6, 5, 3, 2, 8, 9, 2, 5, 12, 15");
  const [isSample, setIsSample] = useState<boolean>(true);
  const [activeVisual1, setActiveVisual1] = useState<UnivariateVisualTab>("hist");

  // Card 2 Inputs: Frequency Table / Grouped Data
  const [groupedVals, setGroupedVals] = useState<string>("10, 20, 30, 40, 50");
  const [groupedFreqs, setGroupedFreqs] = useState<string>("5, 12, 18, 10, 5");

  // Card 3 Inputs: Bivariate Correlation & Regression
  const [regX, setRegX] = useState<string>("60, 62, 64, 65, 68, 70, 72");
  const [regY, setRegY] = useState<string>("130, 135, 142, 150, 160, 168, 175");
  const [fitType, setFitType] = useState<"linear" | "exp" | "power">("linear");

  // Card 4 Inputs: Hypothesis Testing
  const [testType, setTestType] = useState<"ttest" | "ztest">("ttest");
  const [hypMu0, setHypMu0] = useState<string>("50");
  const [hypMean, setHypMean] = useState<string>("53.2");
  const [hypSD, setHypSD] = useState<string>("8.5");
  const [hypN, setHypN] = useState<number>(35);
  const [hypAlpha, setHypAlpha] = useState<number>(0.05);
  const [hypTail, setHypTail] = useState<"two" | "left" | "right">("two");

  // Card 5 Inputs: Confidence Interval
  const [ciParam, setCiParam] = useState<"mean" | "prop">("mean");
  const [ciLevel, setCiLevel] = useState<number>(95);
  const [ciVal, setCiVal] = useState<string>("105.4");
  const [ciSD, setCiSD] = useState<string>("15.2");
  const [ciN, setCiN] = useState<number>(50);

  // Card 6 Inputs: Probability Distribution
  const [distType, setDistType] = useState<"normal" | "t">("normal");
  const [distX, setDistX] = useState<string>("1.96");
  const [distDF, setDistDF] = useState<number>(20);

  // Saved calculation states for Card 1 to 6
  const [savedUnivariateItems, setSavedUnivariateItems] = useState<SavedStatsItem[]>([]);
  const [justSavedUnivariate, setJustSavedUnivariate] = useState<boolean>(false);

  const [savedGroupedItems, setSavedGroupedItems] = useState<SavedStatsItem[]>([]);
  const [justSavedGrouped, setJustSavedGrouped] = useState<boolean>(false);

  const [savedRegressionItems, setSavedRegressionItems] = useState<SavedStatsItem[]>([]);
  const [justSavedRegression, setJustSavedRegression] = useState<boolean>(false);

  const [savedHypothesisItems, setSavedHypothesisItems] = useState<SavedStatsItem[]>([]);
  const [justSavedHypothesis, setJustSavedHypothesis] = useState<boolean>(false);

  const [savedCIItems, setSavedCIItems] = useState<SavedStatsItem[]>([]);
  const [justSavedCI, setJustSavedCI] = useState<boolean>(false);

  const [savedDistItems, setSavedDistItems] = useState<SavedStatsItem[]>([]);
  const [justSavedDist, setJustSavedDist] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_stats_univariate");
      if (s1) setSavedUnivariateItems(JSON.parse(s1));

      const s2 = localStorage.getItem("saved_stats_grouped");
      if (s2) setSavedGroupedItems(JSON.parse(s2));

      const s3 = localStorage.getItem("saved_stats_regression");
      if (s3) setSavedRegressionItems(JSON.parse(s3));

      const s4 = localStorage.getItem("saved_stats_hypothesis");
      if (s4) setSavedHypothesisItems(JSON.parse(s4));

      const s5 = localStorage.getItem("saved_stats_ci");
      if (s5) setSavedCIItems(JSON.parse(s5));

      const s6 = localStorage.getItem("saved_stats_dist");
      if (s6) setSavedDistItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Card 1 Calculations
  const data1 = useMemo(() => parseDataset(rawInput), [rawInput]);
  const stats1 = useMemo(() => computeUnivariateStats(data1, isSample), [data1, isSample]);
  const activeSD1 = isSample ? stats1.sampleSD : stats1.popSD;
  const activeVar1 = isSample ? stats1.sampleVar : stats1.popVar;

  // Dynamic Box Plot Scale for Card 1
  const chartScales1 = useMemo(() => {
    const minVal = stats1.min;
    const maxVal = stats1.max;
    const rangeVal = maxVal - minVal > 0 ? maxVal - minVal : 1;

    const scaleX = (val: number) => {
      return 50 + ((val - minVal) / rangeVal) * 400;
    };

    return {
      minVal,
      maxVal,
      rangeVal,
      scaleX,
      xMin: scaleX(stats1.min),
      xQ1: scaleX(stats1.q1),
      xMed: scaleX(stats1.median),
      xQ3: scaleX(stats1.q3),
      xMax: scaleX(stats1.max)
    };
  }, [stats1]);

  // Card 2 Calculations
  const groupedResult = useMemo(() => computeGroupedStats(groupedVals, groupedFreqs), [groupedVals, groupedFreqs]);

  // Card 3 Calculations
  const regResult = useMemo(() => computeBivariateRegression(regX, regY, fitType), [regX, regY, fitType]);

  // Card 4 Calculations
  const hypResult = useMemo(() => {
    const mu0 = parseFloat(hypMu0) || 0;
    const m = parseFloat(hypMean) || 0;
    const s = parseFloat(hypSD) || 1;
    return computeHypothesisTest(testType, mu0, m, s, hypN, hypAlpha, hypTail);
  }, [testType, hypMu0, hypMean, hypSD, hypN, hypAlpha, hypTail]);

  // Card 5 Calculations
  const ciResult = useMemo(() => {
    const val = parseFloat(ciVal) || 0;
    const sd = parseFloat(ciSD) || 1;
    return computeConfidenceInterval(ciParam, ciLevel, val, sd, ciN);
  }, [ciParam, ciLevel, ciVal, ciSD, ciN]);

  // Card 6 Calculations
  const distResult = useMemo(() => {
    const x = parseFloat(distX) || 0;
    const cdf = approximateNormCDF(x);
    return {
      cdf: parseFloat(cdf.toFixed(4)),
      tailProb: parseFloat((1 - cdf).toFixed(4))
    };
  }, [distX]);

  // Save Handlers
  const handleSaveUnivariate = () => {
    const inputsStr = `Data (N=${stats1.count}), Mode: ${isSample ? "Sample (n-1)" : "Population (N)"}`;
    const opStr = `Univariate Descriptive Statistics`;
    const resList = [
      `Mean x̄ = ${stats1.mean}`,
      `Median = ${stats1.median}`,
      `SD (${isSample ? "s" : "σ"}) = ${activeSD1}`,
      `Variance (${isSample ? "s²" : "σ²"}) = ${activeVar1}`,
      `IQR = ${stats1.iqr}`,
      `Min / Max = [${stats1.min}, ${stats1.max}]`,
      `Skewness = ${stats1.skewness}`
    ];

    const newItem: SavedStatsItem = {
      id: Date.now().toString(),
      title: `Univariate (Mean=${stats1.mean}, SD=${activeSD1})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `x̄ = ${stats1.mean}, s = ${activeSD1}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedUnivariateItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedUnivariateItems(updated);
    try { localStorage.setItem("saved_stats_univariate", JSON.stringify(updated)); } catch (e) {}
    setJustSavedUnivariate(true);
    setTimeout(() => setJustSavedUnivariate(false), 2000);
  };

  const handleSaveGrouped = () => {
    const inputsStr = `Midpoints (${groupedVals.substring(0, 15)}...), Frequencies (${groupedFreqs.substring(0, 15)}...)`;
    const opStr = `Grouped Data Frequency Analysis`;
    const resList = [
      `Total N = ${groupedResult.totalN}`,
      `Grouped Mean = ${groupedResult.groupedMean}`,
      `Grouped Variance = ${groupedResult.groupedVar}`,
      `Grouped SD = ${groupedResult.groupedSD}`,
      `Modal Class = ${groupedResult.modalClass}`
    ];

    const newItem: SavedStatsItem = {
      id: Date.now().toString(),
      title: `Grouped Data (Mean=${groupedResult.groupedMean})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Mean = ${groupedResult.groupedMean}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedGroupedItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedGroupedItems(updated);
    try { localStorage.setItem("saved_stats_grouped", JSON.stringify(updated)); } catch (e) {}
    setJustSavedGrouped(true);
    setTimeout(() => setJustSavedGrouped(false), 2000);
  };

  const handleSaveRegression = () => {
    const inputsStr = `X: (${regX.substring(0, 15)}...), Y: (${regY.substring(0, 15)}...)`;
    const opStr = `Bivariate OLS Linear Regression`;
    const resList = [
      `Equation = ${regResult.equationStr}`,
      `Pearson r = ${regResult.pearsonR}`,
      `R² = ${regResult.rSquaredPct}%`,
      `Covariance Cov(X,Y) = ${regResult.covXY}`,
      `SSE = ${regResult.sse}`
    ];

    const newItem: SavedStatsItem = {
      id: Date.now().toString(),
      title: `Regression (${regResult.equationStr})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: regResult.equationStr,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedRegressionItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedRegressionItems(updated);
    try { localStorage.setItem("saved_stats_regression", JSON.stringify(updated)); } catch (e) {}
    setJustSavedRegression(true);
    setTimeout(() => setJustSavedRegression(false), 2000);
  };

  const handleSaveHypothesis = () => {
    const inputsStr = `Test: ${testType.toUpperCase()}, H0: μ0=${hypMu0}, x̄=${hypMean}, s=${hypSD}, n=${hypN}, α=${hypAlpha}`;
    const opStr = `Hypothesis Decision Engine`;
    const resList = [
      `Decision = ${hypResult.decision}`,
      `Statistic (${testType === "ttest" ? "t" : "z"}) = ${hypResult.statistic}`,
      `p-value = ${hypResult.pValue}`,
      `Critical Value = ${hypResult.criticalValue}`,
      `df = ${hypResult.df}`
    ];

    const newItem: SavedStatsItem = {
      id: Date.now().toString(),
      title: `Hypothesis (${hypResult.decision}, p=${hypResult.pValue})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${hypResult.decision} (p=${hypResult.pValue})`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedHypothesisItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedHypothesisItems(updated);
    try { localStorage.setItem("saved_stats_hypothesis", JSON.stringify(updated)); } catch (e) {}
    setJustSavedHypothesis(true);
    setTimeout(() => setJustSavedHypothesis(false), 2000);
  };

  const handleSaveCI = () => {
    const inputsStr = `Type: ${ciParam}, Level: ${ciLevel}%, Value: ${ciVal}, SD: ${ciSD}, n: ${ciN}`;
    const opStr = `Confidence Interval Estimation`;
    const resList = [
      `Confidence Interval = [${ciResult.lowerBound}, ${ciResult.upperBound}]`,
      `Margin of Error (ME) = ±${ciResult.marginOfError}`,
      `Critical z* = ${ciResult.criticalZOrT}`
    ];

    const newItem: SavedStatsItem = {
      id: Date.now().toString(),
      title: `CI ${ciLevel}% [${ciResult.lowerBound}, ${ciResult.upperBound}]`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `[${ciResult.lowerBound}, ${ciResult.upperBound}]`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedCIItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedCIItems(updated);
    try { localStorage.setItem("saved_stats_ci", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCI(true);
    setTimeout(() => setJustSavedCI(false), 2000);
  };

  const handleSaveDist = () => {
    const inputsStr = `Dist: Standard Normal Z, Value x: ${distX}`;
    const opStr = `Probability Distribution Evaluator`;
    const resList = [
      `P(Z <= ${distX}) = ${distResult.cdf}`,
      `P(Z > ${distX}) = ${distResult.tailProb}`
    ];

    const newItem: SavedStatsItem = {
      id: Date.now().toString(),
      title: `Normal Z (${distX}) -> P=${distResult.cdf}`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `P(Z <= ${distX}) = ${distResult.cdf}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedDistItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedDistItems(updated);
    try { localStorage.setItem("saved_stats_dist", JSON.stringify(updated)); } catch (e) {}
    setJustSavedDist(true);
    setTimeout(() => setJustSavedDist(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: UNIVARIATE DESCRIPTIVE STATISTICS ENGINE (SINGLE DATASET) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Univariate Descriptive Statistics Engine (Single Dataset)</span>
          <button
            type="button"
            onClick={handleSaveUnivariate}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedUnivariate ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT FORM */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  <span>Input Dataset &amp; Sample/Population Toggle</span>
                </h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Raw Data (Separated by commas, spaces, or lines):
                  </label>
                  <textarea
                    rows={4}
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    placeholder="e.g. 4, 8, 6, 5, 3, 2, 8, 9, 2, 5"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Variance Type (Bessel's Correction):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSample(true)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        isSample
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isSample ? "text-white" : "opacity-0"}`} />
                      <span>Sample SD (s, n - 1)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsSample(false)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        !isSample
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${!isSample ? "text-white" : "opacity-0"}`} />
                      <span>Population SD (&sigma;, N)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT DISPLAY */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Arithmetic Mean (x̄)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    N = {stats1.count}
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">
                  {stats1.mean}
                </div>
                <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  Standard Deviation ({isSample ? "s" : "σ"}): {activeSD1} | Variance ({isSample ? "s²" : "σ²"}): {activeVar1}
                </p>

                <div className="grid grid-cols-4 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Median</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{stats1.median}</span>
                  </div>

                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">IQR</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{stats1.iqr}</span>
                  </div>

                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Std Error</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{stats1.stdError}</span>
                  </div>

                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Skewness</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{stats1.skewness}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABBED VISUAL ANALYTICS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Interactive Visual Analytics &amp; Step Derivation Table</span>
              </h3>

              <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveVisual1("hist")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual1 === "hist" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Histogram &amp; Bell Curve
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisual1("box")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual1 === "box" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Box Plot
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisual1("table")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual1 === "table" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Variance Step Table
                </button>
              </div>
            </div>

            {/* TAB 1: HISTOGRAM SVG */}
            {activeVisual1 === "hist" && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Auto-Binned Histogram Frequency Distribution:
                </h4>
                <div className="w-full flex justify-center py-2 overflow-x-auto">
                  <svg viewBox="0 0 500 160" className="w-full max-w-xl h-auto">
                    <line x1="40" y1="130" x2="480" y2="130" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="40" y1="130" x2="40" y2="20" stroke="#94a3b8" strokeWidth="2" />
                    {stats1.histogramBins.map((bin, idx) => {
                      const maxCount = Math.max(...stats1.histogramBins.map(b => b.count), 1);
                      const barWidth = 420 / stats1.histogramBins.length;
                      const x = 40 + idx * barWidth;
                      const h = (bin.count / maxCount) * 100;
                      const y = 130 - h;
                      return (
                        <g key={idx}>
                          <rect x={x + 2} y={y} width={barWidth - 4} height={h} fill="#3b82f6" opacity="0.7" rx="2" />
                          <text x={x + barWidth / 2} y={y - 4} textAnchor="middle" className="text-[9px] font-mono font-bold fill-blue-700">{bin.count}</text>
                          <text x={x + barWidth / 2} y="145" textAnchor="middle" className="text-[8px] font-mono fill-slate-500">{bin.binMin}</text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            )}

            {/* TAB 2: DYNAMIC BOX PLOT SVG */}
            {activeVisual1 === "box" && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Five-Number Summary Box &amp; Whisker Plot (Min, Q1, Median, Q3, Max):
                </h4>
                <div className="w-full flex justify-center py-3 overflow-x-auto">
                  <svg viewBox="0 0 500 110" className="w-full max-w-xl h-auto">
                    {/* Whisker Line */}
                    <line x1={chartScales1.xMin} y1="50" x2={chartScales1.xMax} y2="50" stroke="#475569" strokeWidth="2" />
                    <line x1={chartScales1.xMin} y1="35" x2={chartScales1.xMin} y2="65" stroke="#475569" strokeWidth="2" />
                    <line x1={chartScales1.xMax} y1="35" x2={chartScales1.xMax} y2="65" stroke="#475569" strokeWidth="2" />

                    {/* Box */}
                    <rect
                      x={chartScales1.xQ1}
                      y="30"
                      width={Math.max(4, chartScales1.xQ3 - chartScales1.xQ1)}
                      height="40"
                      fill="#3b82f6"
                      opacity="0.3"
                      stroke="#1d4ed8"
                      strokeWidth="2"
                      rx="2"
                    />

                    {/* Median Line */}
                    <line x1={chartScales1.xMed} y1="30" x2={chartScales1.xMed} y2="70" stroke="#1e40af" strokeWidth="3" />

                    {/* Labels */}
                    <text x={chartScales1.xMin} y="92" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">Min: {stats1.min}</text>
                    <text x={chartScales1.xQ1} y="92" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">Q1: {stats1.q1}</text>
                    <text x={chartScales1.xMed} y="92" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-400">Med: {stats1.median}</text>
                    <text x={chartScales1.xQ3} y="92" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">Q3: {stats1.q3}</text>
                    <text x={chartScales1.xMax} y="92" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">Max: {stats1.max}</text>
                  </svg>
                </div>
              </div>
            )}

            {/* TAB 3: VARIANCE STEP TABLE */}
            {activeVisual1 === "table" && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Complete Step-by-Step Variance Derivation Table (N = {stats1.count}, Mean x̄ = {stats1.mean}):
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
                      {stats1.stepTable.map((row) => (
                        <tr key={row.index}>
                          <td className="p-2 font-bold text-slate-500">{row.index}</td>
                          <td className="p-2 font-bold text-slate-900 dark:text-slate-100">{row.val}</td>
                          <td className="p-2">{row.dev >= 0 ? `+${row.dev}` : row.dev}</td>
                          <td className="p-2 text-blue-600 font-bold">{row.devSq}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* EMBEDDED SAVED UNIVARIATE CALCULATIONS INSIDE CARD 1 */}
          {savedUnivariateItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Univariate Calculations ({savedUnivariateItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedUnivariateItems([]);
                    try { localStorage.removeItem("saved_stats_univariate"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedUnivariateItems.map((item) => {
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
                            const updated = savedUnivariateItems.filter(i => i.id !== item.id);
                            setSavedUnivariateItems(updated);
                            try { localStorage.setItem("saved_stats_univariate", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 2: FREQUENCY TABLE & GROUPED DATA CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Frequency Table &amp; Grouped Data Calculator</span>
          <button
            type="button"
            onClick={handleSaveGrouped}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedGrouped ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Grouped Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Values / Midpoints (x_i):</label>
                  <textarea
                    rows={2}
                    value={groupedVals}
                    onChange={(e) => setGroupedVals(e.target.value)}
                    placeholder="e.g. 10, 20, 30, 40, 50"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Frequencies (f_i):</label>
                  <textarea
                    rows={2}
                    value={groupedFreqs}
                    onChange={(e) => setGroupedFreqs(e.target.value)}
                    placeholder="e.g. 5, 12, 18, 10, 5"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: GROUPED DATA OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Grouped Mean (x̄_grouped)
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {groupedResult.groupedMean}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Total N (∑f)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{groupedResult.totalN}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Grouped SD (s)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{groupedResult.groupedSD}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Grouped Var (s²)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{groupedResult.groupedVar}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED GROUPED DATA CALCULATIONS INSIDE CARD 2 */}
          {savedGroupedItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Grouped Data Calculations ({savedGroupedItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedGroupedItems([]);
                    try { localStorage.removeItem("saved_stats_grouped"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedGroupedItems.map((item) => {
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
                            const updated = savedGroupedItems.filter(i => i.id !== item.id);
                            setSavedGroupedItems(updated);
                            try { localStorage.setItem("saved_stats_grouped", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 3: BIVARIATE CORRELATION & LINEAR REGRESSION ENGINE (X, Y) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Bivariate Correlation &amp; Linear Regression Engine (X, Y)</span>
          <button
            type="button"
            onClick={handleSaveRegression}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedRegression ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Paired Coordinates (X, Y)
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">X Values:</label>
                  <textarea
                    rows={2}
                    value={regX}
                    onChange={(e) => setRegX(e.target.value)}
                    placeholder="e.g. 60, 62, 64, 65, 68"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Y Values:</label>
                  <textarea
                    rows={2}
                    value={regY}
                    onChange={(e) => setRegY(e.target.value)}
                    placeholder="e.g. 130, 135, 142, 150, 160"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: REGRESSION OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Best-Fit Line Equation
                  </span>
                  <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {regResult.equationStr}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Pearson (r)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{regResult.pearsonR}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">R² (%)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{regResult.rSquaredPct}%</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Covariance</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{regResult.covXY}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED REGRESSION CALCULATIONS INSIDE CARD 3 */}
          {savedRegressionItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Regression Calculations ({savedRegressionItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedRegressionItems([]);
                    try { localStorage.removeItem("saved_stats_regression"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedRegressionItems.map((item) => {
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
                            const updated = savedRegressionItems.filter(i => i.id !== item.id);
                            setSavedRegressionItems(updated);
                            try { localStorage.setItem("saved_stats_regression", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 4: HYPOTHESIS TESTING & INFERENTIAL DECISION ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Hypothesis Testing &amp; Inferential Decision Engine</span>
          <button
            type="button"
            onClick={handleSaveHypothesis}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedHypothesis ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Hypothesis Test Parameters
              </h2>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Null Mean (μ₀):</label>
                    <input
                      type="number"
                      step="any"
                      value={hypMu0}
                      onChange={(e) => setHypMu0(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Sample Mean (x̄):</label>
                    <input
                      type="number"
                      step="any"
                      value={hypMean}
                      onChange={(e) => setHypMean(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Sample SD (s):</label>
                    <input
                      type="number"
                      step="any"
                      value={hypSD}
                      onChange={(e) => setHypSD(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Sample Size (n):</label>
                    <input
                      type="number"
                      min="1"
                      value={hypN}
                      onChange={(e) => setHypN(parseInt(e.target.value, 10) || 1)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HYPOTHESIS TEST OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Statistical Decision (α = {hypAlpha})
                  </span>
                  <div className={`text-3xl font-mono font-extrabold ${hypResult.decision === "Reject H0" ? "text-emerald-600" : "text-amber-600"}`}>
                    {hypResult.decision}
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                    {hypResult.summaryText}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Statistic (t/z)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{hypResult.statistic}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">p-value</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{hypResult.pValue}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Critical Value</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{hypResult.criticalValue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED HYPOTHESIS TESTS INSIDE CARD 4 */}
          {savedHypothesisItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Hypothesis Tests ({savedHypothesisItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedHypothesisItems([]);
                    try { localStorage.removeItem("saved_stats_hypothesis"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedHypothesisItems.map((item) => {
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
                            const updated = savedHypothesisItems.filter(i => i.id !== item.id);
                            setSavedHypothesisItems(updated);
                            try { localStorage.setItem("saved_stats_hypothesis", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 5: CONFIDENCE INTERVAL & PARAMETER ESTIMATION SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Confidence Interval &amp; Parameter Estimation Suite</span>
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
                Estimation Parameters
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Confidence Level (%):</label>
                  <select
                    value={ciLevel}
                    onChange={(e) => setCiLevel(parseInt(e.target.value, 10))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-xs"
                  >
                    <option value={90}>90% Confidence (z* = 1.645)</option>
                    <option value={95}>95% Confidence (z* = 1.960)</option>
                    <option value={99}>99% Confidence (z* = 2.576)</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Mean (x̄):</label>
                    <input
                      type="number"
                      step="any"
                      value={ciVal}
                      onChange={(e) => setCiVal(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Std Dev (s):</label>
                    <input
                      type="number"
                      step="any"
                      value={ciSD}
                      onChange={(e) => setCiSD(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Sample (n):</label>
                    <input
                      type="number"
                      min="1"
                      value={ciN}
                      onChange={(e) => setCiN(parseInt(e.target.value, 10) || 1)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CI OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Confidence Interval Range [{ciLevel}%]
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    [{ciResult.lowerBound}, {ciResult.upperBound}]
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Margin of Error (ME)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">&plusmn;{ciResult.marginOfError}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Critical Value (z*)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{ciResult.criticalZOrT}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED CONFIDENCE INTERVALS INSIDE CARD 5 */}
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
                    try { localStorage.removeItem("saved_stats_ci"); } catch(e){}
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
                            try { localStorage.setItem("saved_stats_ci", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 6: PROBABILITY DISTRIBUTION EVALUATOR & AREA SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Probability Distribution Evaluator &amp; Area Solver</span>
          <button
            type="button"
            onClick={handleSaveDist}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedDist ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Distribution Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Standard Normal Z score:</label>
                  <input
                    type="number"
                    step="any"
                    value={distX}
                    onChange={(e) => setDistX(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: DISTRIBUTION OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Cumulative Probability P(Z &le; {distX})
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {distResult.cdf}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Tail Probability P(Z &gt; {distX})</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{distResult.tailProb}</span>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED PROBABILITY SOLVES INSIDE CARD 6 */}
          {savedDistItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Probability Solves ({savedDistItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedDistItems([]);
                    try { localStorage.removeItem("saved_stats_dist"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedDistItems.map((item) => {
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
                            const updated = savedDistItems.filter(i => i.id !== item.id);
                            setSavedDistItems(updated);
                            try { localStorage.setItem("saved_stats_dist", JSON.stringify(updated)); } catch(e){}
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

export default StatisticsCalculator;
