"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Sliders,
  Layers,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Copy,
  Share2,
  Download,
  RotateCcw,
  Printer,
  Check,
  BarChart2,
  ExternalLink,
} from "lucide-react";
import {
  parseDataset,
  computeDescriptiveStats,
  compareTwoDatasets,
  DescriptiveStats,
  TwoDatasetComparison
} from "@/app/calculators/standard-deviation-calculator/std-dev-logic";
import { StdDevReportModal } from "./StdDevReportModal";

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
  // Card 1 Inputs: Single Dataset (Golden Default: 10, 12, 23, 16, 23, 21, 16, 16)
  const [rawInput, setRawInput] = useState<string>("10, 12, 23, 16, 23, 21, 16, 16");
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

  // Action toolbar feedback states
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [resetFeedback, setResetFeedback] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Load saved state & parse URL query params if present
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const urlData = params.get("data");
        const urlMode = params.get("mode");
        const urlA = params.get("compA");
        const urlB = params.get("compB");
        const urlCiMean = params.get("ciMean");
        const urlCiSD = params.get("ciSD");
        const urlCiN = params.get("ciN");
        const urlCiLvl = params.get("ciLvl");

        if (urlData) setRawInput(urlData);
        if (urlMode) setIsSample(urlMode === "sample");
        if (urlA) setRawInputA(urlA);
        if (urlB) setRawInputB(urlB);
        if (urlCiMean) setCiMean(urlCiMean);
        if (urlCiSD) setCiSD(urlCiSD);
        if (urlCiN) setCiN(urlCiN);
        if (urlCiLvl) setCiLevel(parseInt(urlCiLvl, 10) || 95);
      }

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

  // Box plot dynamic scale calculations
  const boxPlotCoords = useMemo(() => {
    const range = stats.max - stats.min;
    const scaleX = (val: number) => {
      if (range <= 0) return 250;
      return 60 + ((val - stats.min) / range) * 380;
    };

    const xMin = scaleX(stats.min);
    const xQ1 = scaleX(stats.q1);
    const xMed = scaleX(stats.median);
    const xQ3 = scaleX(stats.q3);
    const xMax = scaleX(stats.max);
    const boxWidth = Math.max(2, xQ3 - xQ1);

    return { xMin, xQ1, xMed, xQ3, xMax, boxWidth, scaleX };
  }, [stats]);

  // Master Toolbar: Copy Summary Handler
  const handleCopySummary = () => {
    const text = [
      "==================================================",
      "STANDARD DEVIATION & DESCRIPTIVE STATISTICS REPORT",
      "==================================================",
      `Input Data: ${rawInput}`,
      `Calculation Mode: ${isSample ? "Sample SD (s, N-1)" : "Population SD (σ, N)"}`,
      `Sample Size (N): ${stats.count}`,
      `Sum: ${stats.sum.toFixed(4)}`,
      `Arithmetic Mean (x̄): ${stats.mean.toFixed(4)}`,
      `Sum of Squared Deviations (SS): ${stats.sumSqDev.toFixed(4)}`,
      `Sample Variance (s²): ${stats.sampleVar.toFixed(4)}`,
      `Sample Standard Deviation (s): ${stats.sampleSD.toFixed(4)}`,
      `Population Variance (σ²): ${stats.popVar.toFixed(4)}`,
      `Population Standard Deviation (σ): ${stats.popSD.toFixed(4)}`,
      `Standard Error (SE): ${stats.stdError.toFixed(4)}`,
      `Coefficient of Variation (CV): ${stats.coeffVar.toFixed(2)}%`,
      "--------------------------------------------------",
      "ORDER STATISTICS & FIVE-NUMBER SUMMARY:",
      `Minimum: ${stats.min.toFixed(4)}`,
      `First Quartile (Q1): ${stats.q1.toFixed(4)}`,
      `Median: ${stats.median.toFixed(4)}`,
      `Third Quartile (Q3): ${stats.q3.toFixed(4)}`,
      `Maximum: ${stats.max.toFixed(4)}`,
      `Interquartile Range (IQR): ${stats.iqr.toFixed(4)}`,
      "--------------------------------------------------",
      "DUAL DATASET COMPARISON (A vs B):",
      `Dataset A: ${rawInputA} (Mean = ${comparison.statsA.mean.toFixed(2)}, SD = ${comparison.statsA.sampleSD.toFixed(4)})`,
      `Dataset B: ${rawInputB} (Mean = ${comparison.statsB.mean.toFixed(2)}, SD = ${comparison.statsB.sampleSD.toFixed(4)})`,
      `Variance Ratio (F): ${comparison.fRatio.toFixed(4)}`,
      `Pooled SD (s_p): ${comparison.pooledSD.toFixed(4)}`,
      "--------------------------------------------------",
      `CONFIDENCE INTERVAL (${ciLevel}%):`,
      `Mean: ${ciMean} | SD: ${ciSD} | N: ${ciN}`,
      `Margin of Error: ±${marginOfError.toFixed(4)}`,
      `Confidence Interval: [${(ciMeanNum - marginOfError).toFixed(4)}, ${(ciMeanNum + marginOfError).toFixed(4)}]`,
      "=================================================="
    ].join("\n");

    try {
      navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    } catch (e) {}
  };

  // Master Toolbar: Share Link Handler
  const handleShare = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("data", rawInput);
      url.searchParams.set("mode", isSample ? "sample" : "population");
      url.searchParams.set("compA", rawInputA);
      url.searchParams.set("compB", rawInputB);
      url.searchParams.set("ciMean", ciMean);
      url.searchParams.set("ciSD", ciSD);
      url.searchParams.set("ciN", ciN);
      url.searchParams.set("ciLvl", ciLevel.toString());

      navigator.clipboard.writeText(url.toString());
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } catch (e) {}
  };

  // Master Toolbar: CSV Export Handler
  const handleExportCSV = () => {
    const csvRows: string[] = [];
    csvRows.push("STANDARD DEVIATION & STATISTICAL ANALYSIS EXPORT");
    csvRows.push(`Exported Date,${new Date().toISOString()}`);
    csvRows.push(`Mode,${isSample ? "Sample SD (n - 1)" : "Population SD (N)"}`);
    csvRows.push(`Dataset,"${rawInput.replace(/"/g, '""')}"`);
    csvRows.push("");
    csvRows.push("SUMMARY METRICS");
    csvRows.push(`Count (N),${stats.count}`);
    csvRows.push(`Sum,${stats.sum}`);
    csvRows.push(`Mean,${stats.mean}`);
    csvRows.push(`Sum of Squared Deviations (SS),${stats.sumSqDev}`);
    csvRows.push(`Sample Variance (s^2),${stats.sampleVar}`);
    csvRows.push(`Sample Standard Deviation (s),${stats.sampleSD}`);
    csvRows.push(`Population Variance (sigma^2),${stats.popVar}`);
    csvRows.push(`Population Standard Deviation (sigma),${stats.popSD}`);
    csvRows.push(`Standard Error (SE),${stats.stdError}`);
    csvRows.push(`Coefficient of Variation (CV %),${stats.coeffVar}`);
    csvRows.push(`Minimum,${stats.min}`);
    csvRows.push(`First Quartile (Q1),${stats.q1}`);
    csvRows.push(`Median,${stats.median}`);
    csvRows.push(`Third Quartile (Q3),${stats.q3}`);
    csvRows.push(`Maximum,${stats.max}`);
    csvRows.push(`IQR,${stats.iqr}`);
    csvRows.push("");
    csvRows.push("STEP-BY-STEP VARIANCE TABLE");
    csvRows.push("Index,Data Value (x_i),Deviation (x_i - Mean),Squared Deviation (x_i - Mean)^2");

    for (const row of stats.stepTable) {
      csvRows.push(`${row.index},${row.val},${row.dev},${row.devSq}`);
    }

    csvRows.push(`Sum of Squared Deviations (SS),,,${stats.sumSqDev}`);
    csvRows.push(`Sample Variance (s^2 = SS / (N - 1)),,,${stats.sampleVar}`);
    csvRows.push(`Population Variance (sigma^2 = SS / N),,,${stats.popVar}`);
    csvRows.push("");
    csvRows.push("DUAL DATASET COMPARISON");
    csvRows.push(`Dataset A,"${rawInputA}",Count,${comparison.statsA.count},Mean,${comparison.statsA.mean},Sample SD,${comparison.statsA.sampleSD}`);
    csvRows.push(`Dataset B,"${rawInputB}",Count,${comparison.statsB.count},Mean,${comparison.statsB.mean},Sample SD,${comparison.statsB.sampleSD}`);
    csvRows.push(`Variance Ratio (F = Var A / Var B),${comparison.fRatio}`);
    csvRows.push(`Pooled Standard Deviation (s_p),${comparison.pooledSD}`);
    csvRows.push("");
    csvRows.push("CONFIDENCE INTERVAL");
    csvRows.push(`Confidence Level,${ciLevel}%,z-score,${zScore}`);
    csvRows.push(`Mean,${ciMean},SD,${ciSD},Sample Size (N),${ciN}`);
    csvRows.push(`Margin of Error,${marginOfError}`);
    csvRows.push(`Lower Bound,${ciMeanNum - marginOfError}`);
    csvRows.push(`Upper Bound,${ciMeanNum + marginOfError}`);

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `standard_deviation_analysis_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Master Toolbar: Reset Defaults Handler
  const handleReset = () => {
    setRawInput("10, 12, 23, 16, 23, 21, 16, 16");
    setIsSample(true);
    setActiveVisual("bell");
    setRawInputA("10, 12, 15, 18, 20");
    setRawInputB("14, 16, 19, 22, 25");
    setCiMean("50");
    setCiSD("10");
    setCiN("30");
    setCiLevel(95);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url.toString());
    }

    setResetFeedback(true);
    setTimeout(() => setResetFeedback(false), 2000);
  };

  // Save Handlers for LocalStorage History
  const handleSaveSingle = () => {
    const inputsStr = `Data (N=${stats.count}): ${rawInput}`;
    const opStr = `Descriptive Statistics Engine (${isSample ? "Sample s" : "Population σ"})`;
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

    const updated = [newItem, ...savedSingleItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedSingleItems(updated);
    try {
      localStorage.setItem("saved_stddev_single", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedSingle(true);
    setTimeout(() => setJustSavedSingle(false), 2000);
  };

  const handleSaveComp = () => {
    const inputsStr = `A (N=${comparison.statsA.count}): ${rawInputA} | B (N=${comparison.statsB.count}): ${rawInputB}`;
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

    const updated = [newItem, ...savedCompItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedCompItems(updated);
    try {
      localStorage.setItem("saved_stddev_compare", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedComp(true);
    setTimeout(() => setJustSavedComp(false), 2000);
  };

  const handleSaveCI = () => {
    const inputsStr = `Mean: ${ciMean}, SD: ${ciSD}, N: ${ciN}, Confidence: ${ciLevel}%`;
    const opStr = `Confidence Interval Calculation`;
    const lower = (ciMeanNum - marginOfError).toFixed(4);
    const upper = (ciMeanNum + marginOfError).toFixed(4);
    const resList = [
      `Margin of Error (ME) = ±${marginOfError.toFixed(4)}`,
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

    const updated = [newItem, ...savedCIItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedCIItems(updated);
    try {
      localStorage.setItem("saved_stddev_ci", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedCI(true);
    setTimeout(() => setJustSavedCI(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* NATIVE PRINT INJECTION TO PREVENT BLANK PAGES */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .no-print-toolbar, .no-print-tabs { display: none !important; }
            .avoid-page-break { break-inside: avoid !important; page-break-inside: avoid !important; }
            .tight-print-grid { display: block !important; }
          }
        `
      }} />

      {/* MASTER ACTION TOOLBAR */}
      <div className="no-print-toolbar bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-blue-600" />
            <span>Analysis Tools</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Copy formatted statistical analysis to clipboard"
          >
            {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedSummary ? "Copied!" : "Copy Summary"}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Share stateful URL link"
          >
            {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedShare ? "Link Copied!" : "Share"}</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Download complete variance calculation table as CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Open printable executive statistical report"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset all fields to default values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{resetFeedback ? "Reset!" : "Reset"}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: SINGLE DATASET STANDARD DEVIATION & VARIANCE ENGINE */}
      {/* ========================================================================= */}
      <div className="avoid-page-break border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Single Dataset Standard Deviation &amp; Variance Engine</span>
          <button
            type="button"
            onClick={handleSaveSingle}
            className="no-print-toolbar bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSingle ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* LEFT COLUMN: INPUT FORM */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
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
                    placeholder="e.g. 10, 12, 23, 16, 23, 21, 16, 16"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Supports comma, space, tab, or newline separated numeric values.
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Calculation Type (Bessel&apos;s Correction):
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
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
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
                  {stats.count < 1 ? "0.0000" : (isSample && stats.count < 2 ? "Undefined (N < 2)" : activeSD.toFixed(4))}
                </div>
                <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  Variance ({isSample ? "s²" : "σ²"}): {stats.count < 1 ? "0.0000" : (isSample && stats.count < 2 ? "Undefined (N < 2)" : activeVar.toFixed(4))}
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
                    <span className="font-mono text-slate-900 dark:text-slate-100">
                      {isSample && stats.count < 2 ? "N/A" : stats.stdError.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">CV %</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">
                      {stats.mean === 0 || (isSample && stats.count < 2) ? "N/A" : `${stats.coeffVar.toFixed(1)}%`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL ANALYTICS SUITE */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Visual Analytics &amp; Step-by-Step Variance Table</span>
              </h3>

              <div className="no-print-tabs flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
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
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Gaussian Normal Distribution Shaded Bands (Empirical Rule 68–95–99.7%):
                </h4>
                {activeSD === 0 ? (
                  <div className="text-center py-8 text-xs font-mono text-slate-500 space-y-1">
                    <p className="font-bold text-slate-700 dark:text-slate-300">Zero Dispersion (SD = 0)</p>
                    <p>All data points are identical ({stats.mean}). Distribution collapses into a single spike.</p>
                  </div>
                ) : (
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
                )}
              </div>
            )}

            {/* TAB 2: BOX PLOT SVG WITH DYNAMIC NORMALIZATION */}
            {activeVisual === "box" && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Five-Number Summary Box &amp; Whisker Plot:
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Linear Interpolation Quartile Method (p(n-1))
                  </span>
                </div>
                <div className="w-full flex justify-center py-3 overflow-x-auto">
                  <svg viewBox="0 0 500 110" className="w-full max-w-xl h-auto">
                    {/* Left whisker */}
                    <line x1={boxPlotCoords.xMin} y1="50" x2={boxPlotCoords.xQ1} y2="50" stroke="#475569" strokeWidth="2" />
                    {/* Right whisker */}
                    <line x1={boxPlotCoords.xQ3} y1="50" x2={boxPlotCoords.xMax} y2="50" stroke="#475569" strokeWidth="2" />
                    {/* Box */}
                    <rect
                      x={boxPlotCoords.xQ1}
                      y="30"
                      width={boxPlotCoords.boxWidth}
                      height="40"
                      fill="#3b82f6"
                      opacity="0.35"
                      stroke="#1d4ed8"
                      strokeWidth="2"
                      rx="4"
                    />
                    {/* Median Line */}
                    <line x1={boxPlotCoords.xMed} y1="30" x2={boxPlotCoords.xMed} y2="70" stroke="#1e40af" strokeWidth="3" />
                    {/* Whiskers Ticks */}
                    <line x1={boxPlotCoords.xMin} y1="40" x2={boxPlotCoords.xMin} y2="60" stroke="#475569" strokeWidth="2" />
                    <line x1={boxPlotCoords.xMax} y1="40" x2={boxPlotCoords.xMax} y2="60" stroke="#475569" strokeWidth="2" />

                    {/* Outliers if any */}
                    {stats.outliers.map((outVal, idx) => (
                      <circle
                        key={idx}
                        cx={boxPlotCoords.scaleX(outVal)}
                        cy="50"
                        r="4"
                        fill="#ef4444"
                        stroke="#b91c1c"
                        strokeWidth="1.5"
                      />
                    ))}

                    {/* Text Labels */}
                    <text x={boxPlotCoords.xMin} y="90" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                      Min: {stats.min}
                    </text>
                    <text x={boxPlotCoords.xQ1} y="90" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                      Q1: {stats.q1}
                    </text>
                    <text x={boxPlotCoords.xMed} y="22" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-400">
                      Med: {stats.median}
                    </text>
                    <text x={boxPlotCoords.xQ3} y="90" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                      Q3: {stats.q3}
                    </text>
                    <text x={boxPlotCoords.xMax} y="90" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                      Max: {stats.max}
                    </text>
                  </svg>
                </div>
              </div>
            )}

            {/* TAB 3: VARIANCE STEP TABLE */}
            {activeVisual === "steps" && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Complete Step-by-Step Variance Table (N = {stats.count}, Mean x̄ = {stats.mean.toFixed(4)}):
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead>
                      <tr className="bg-blue-600 text-white font-bold">
                        <th className="p-2">Index (i)</th>
                        <th className="p-2">Data Value (xᵢ)</th>
                        <th className="p-2">Deviation (xᵢ − x̄)</th>
                        <th className="p-2">Squared Deviation (xᵢ − x̄)²</th>
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
                      <tr className="bg-slate-100 dark:bg-slate-800/80 font-bold">
                        <td className="p-2" colSpan={3}>Sample Variance [s² = SS / (N − 1) = {stats.sumSqDev.toFixed(3)} / {Math.max(1, stats.count - 1)}]:</td>
                        <td className="p-2 text-blue-700 dark:text-blue-300 text-sm">{stats.sampleVar.toFixed(4)}</td>
                      </tr>
                      <tr className="bg-slate-100 dark:bg-slate-800/80 font-bold">
                        <td className="p-2" colSpan={3}>Population Variance [σ² = SS / N = {stats.sumSqDev.toFixed(3)} / {stats.count}]:</td>
                        <td className="p-2 text-blue-700 dark:text-blue-300 text-sm">{stats.popVar.toFixed(4)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* EMBEDDED SAVED SINGLE DATASET CALCULATIONS INSIDE CARD 1 */}
          {savedSingleItems.length > 0 && (
            <div className="avoid-page-break bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Standard Deviation Calculations ({savedSingleItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSingleItems([]);
                    try {
                      localStorage.removeItem("saved_stddev_single");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedSingleItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
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
                            const updated = savedSingleItems.filter((i) => i.id !== item.id);
                            setSavedSingleItems(updated);
                            try {
                              localStorage.setItem("saved_stddev_single", JSON.stringify(updated));
                            } catch (e) {}
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
      {/* CARD 2: DUAL DATASET COMPARISON & VARIANCE RATIO SOLVER (A vs B) */}
      {/* ========================================================================= */}
      <div className="avoid-page-break border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Dual Dataset Comparison &amp; Variance Ratio Solver (A vs B)</span>
          <button
            type="button"
            onClick={handleSaveComp}
            className="no-print-toolbar bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedComp ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
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
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Comparative Metrics Breakdown
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono font-bold">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-0.5">
                      <span className="text-[10px] text-slate-400 block uppercase">Dataset A</span>
                      <p>Mean: {comparison.statsA.mean.toFixed(2)}</p>
                      <p className="text-blue-600">SD: {(isSample ? comparison.statsA.sampleSD : comparison.statsA.popSD).toFixed(4)}</p>
                      <p className="text-slate-500 text-[10px]">Var: {(isSample ? comparison.statsA.sampleVar : comparison.statsA.popVar).toFixed(4)}</p>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-0.5">
                      <span className="text-[10px] text-slate-400 block uppercase">Dataset B</span>
                      <p>Mean: {comparison.statsB.mean.toFixed(2)}</p>
                      <p className="text-blue-600">SD: {(isSample ? comparison.statsB.sampleSD : comparison.statsB.popSD).toFixed(4)}</p>
                      <p className="text-slate-500 text-[10px]">Var: {(isSample ? comparison.statsB.sampleVar : comparison.statsB.popVar).toFixed(4)}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Variance Ratio (F = Var A / Var B)</span>
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
            <div className="avoid-page-break bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Dataset Comparisons ({savedCompItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCompItems([]);
                    try {
                      localStorage.removeItem("saved_stddev_compare");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedCompItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
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
                            const updated = savedCompItems.filter((i) => i.id !== item.id);
                            setSavedCompItems(updated);
                            try {
                              localStorage.setItem("saved_stddev_compare", JSON.stringify(updated));
                            } catch (e) {}
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
      {/* CARD 3: CONFIDENCE INTERVAL & MARGIN OF ERROR CALCULATOR */}
      {/* ========================================================================= */}
      <div className="avoid-page-break border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Confidence Interval &amp; Margin of Error Calculator</span>
          <button
            type="button"
            onClick={handleSaveCI}
            className="no-print-toolbar bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCI ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
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
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Confidence Interval Range [{ciLevel}%]
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
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
            <div className="avoid-page-break bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Confidence Intervals ({savedCIItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCIItems([]);
                    try {
                      localStorage.removeItem("saved_stddev_ci");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedCIItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
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
                            const updated = savedCIItems.filter((i) => i.id !== item.id);
                            setSavedCIItems(updated);
                            try {
                              localStorage.setItem("saved_stddev_ci", JSON.stringify(updated));
                            } catch (e) {}
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

      {/* PRINT REPORT MODAL */}
      <StdDevReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        rawInput={rawInput}
        isSample={isSample}
        stats={stats}
        rawInputA={rawInputA}
        rawInputB={rawInputB}
        comparison={comparison}
        ciMean={ciMean}
        ciSD={ciSD}
        ciN={ciN}
        ciLevel={ciLevel}
        zScore={zScore}
        marginOfError={marginOfError}
      />
    </div>
  );
}

export default StdDevCalculator;
