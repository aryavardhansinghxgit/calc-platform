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
  Target,
  Copy,
  Check,
  Share2,
  FileSpreadsheet,
  RotateCcw,
  Printer
} from "lucide-react";
import { MMMReportModal } from "./MMMReportModal";
import {
  parseDataset,
  computeStandardMMM,
  computeAdvancedMeans,
  computeGroupedMMM,
  computeTargetMean,
  computeOutlierSkewness
} from "@/app/calculators/mean-median-mode-calculator/mmm-logic";

export type StandardVisualTab = "freq" | "box" | "steps";

export interface SavedMMMItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function MeanMedianModeCalculator() {
  // Card 1 Inputs: Standard Raw Data Stream Mode
  const [rawInput, setRawInput] = useState<string>("3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29");
  const [isSample, setIsSample] = useState<boolean>(true);
  const [activeVisual1, setActiveVisual1] = useState<StandardVisualTab>("freq");

  // Card 2 Inputs: Advanced Means Suite (Default asymmetric dataset with an outlier: 150)
  const [advValues, setAdvValues] = useState<string>("10, 15, 18, 20, 22, 25, 150");
  const [advWeights, setAdvWeights] = useState<string>("1, 2, 3, 4, 5, 6, 7");
  const [trimPct, setTrimPct] = useState<number>(10);

  // Card 3 Inputs: Grouped Data Mode
  const [groupedVals, setGroupedVals] = useState<string>("15, 25, 35, 45, 55");
  const [groupedFreqs, setGroupedFreqs] = useState<string>("4, 8, 15, 7, 2");

  // Card 4 Inputs: Target Mean Solver
  const [targetCurrent, setTargetCurrent] = useState<string>("85, 90, 88, 92");
  const [targetGoal, setTargetGoal] = useState<number>(90);
  const [targetTotalN, setTargetTotalN] = useState<number>(5);

  // Card 5 Inputs: Two-Dataset Comparison
  const [compareA, setCompareA] = useState<string>("12, 15, 18, 22, 25, 28");
  const [compareB, setCompareB] = useState<string>("10, 14, 19, 24, 30, 35");

  // Card 6 Inputs: Outlier Detection & Skewness Inspector
  const [outlierInput, setOutlierInput] = useState<string>("10, 12, 14, 15, 15, 16, 18, 20, 22, 100");

  // Saved calculation states for Card 1 to 6
  const [savedStandardItems, setSavedStandardItems] = useState<SavedMMMItem[]>([]);
  const [justSavedStandard, setJustSavedStandard] = useState<boolean>(false);

  const [savedAdvancedItems, setSavedAdvancedItems] = useState<SavedMMMItem[]>([]);
  const [justSavedAdvanced, setJustSavedAdvanced] = useState<boolean>(false);

  const [savedGroupedItems, setSavedGroupedItems] = useState<SavedMMMItem[]>([]);
  const [justSavedGrouped, setJustSavedGrouped] = useState<boolean>(false);

  const [savedTargetItems, setSavedTargetItems] = useState<SavedMMMItem[]>([]);
  const [justSavedTarget, setJustSavedTarget] = useState<boolean>(false);

  const [savedCompareItems, setSavedCompareItems] = useState<SavedMMMItem[]>([]);
  const [justSavedCompare, setJustSavedCompare] = useState<boolean>(false);

  const [savedOutlierItems, setSavedOutlierItems] = useState<SavedMMMItem[]>([]);
  const [justSavedOutlier, setJustSavedOutlier] = useState<boolean>(false);

  // Master Action Toolbar States
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_mmm_standard");
      if (s1) setSavedStandardItems(JSON.parse(s1));

      const s2 = localStorage.getItem("saved_mmm_advanced");
      if (s2) setSavedAdvancedItems(JSON.parse(s2));

      const s3 = localStorage.getItem("saved_mmm_grouped");
      if (s3) setSavedGroupedItems(JSON.parse(s3));

      const s4 = localStorage.getItem("saved_mmm_target");
      if (s4) setSavedTargetItems(JSON.parse(s4));

      const s5 = localStorage.getItem("saved_mmm_compare");
      if (s5) setSavedCompareItems(JSON.parse(s5));

      const s6 = localStorage.getItem("saved_mmm_outlier");
      if (s6) setSavedOutlierItems(JSON.parse(s6));

      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const urlRaw = params.get("raw");
        const urlSample = params.get("sample");
        if (urlRaw !== null) setRawInput(urlRaw);
        if (urlSample !== null) setIsSample(urlSample === "1");
      }
    } catch (e) {}
  }, []);

  // Card 1 Calculations
  const data1 = useMemo(() => parseDataset(rawInput), [rawInput]);
  const stats1 = useMemo(() => computeStandardMMM(data1, isSample), [data1, isSample]);
  const activeSD1 = isSample ? stats1.sampleSD : stats1.popSD;
  const activeVar1 = isSample ? stats1.sampleVar : stats1.popVar;

  // Card 2 Calculations
  const advResult = useMemo(() => computeAdvancedMeans(advValues, advWeights, trimPct), [advValues, advWeights, trimPct]);

  // Card 3 Calculations
  const groupedResult = useMemo(() => computeGroupedMMM(groupedVals, groupedFreqs), [groupedVals, groupedFreqs]);

  // Card 4 Calculations
  const targetResult = useMemo(() => computeTargetMean(targetCurrent, targetGoal, targetTotalN), [targetCurrent, targetGoal, targetTotalN]);

  // Card 5 Calculations
  const dataA = useMemo(() => parseDataset(compareA), [compareA]);
  const dataB = useMemo(() => parseDataset(compareB), [compareB]);
  const statsA = useMemo(() => computeStandardMMM(dataA, isSample), [dataA, isSample]);
  const statsB = useMemo(() => computeStandardMMM(dataB, isSample), [dataB, isSample]);

  // Card 6 Calculations
  const dataOutlier = useMemo(() => parseDataset(outlierInput), [outlierInput]);
  const outlierResult = useMemo(() => computeOutlierSkewness(dataOutlier), [dataOutlier]);

  // Actions: Copy, Share, CSV, Reset
  const handleCopyText = (text: string, key: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {}
  };

  const handleCopySummary = () => {
    const summary = [
      `=== CENTRAL TENDENCY & DISPERSION ANALYSIS ===`,
      `[1] Standard Raw Data (N=${stats1.count}, ${isSample ? "Sample" : "Population"}):`,
      `    Mean (x̄) = ${stats1.mean}`,
      `    Median = ${stats1.median}`,
      `    Mode(s) = ${stats1.modes.length > 0 ? stats1.modes.join(", ") : "None"} (${stats1.modeType})`,
      `    Range = ${stats1.range} [Min: ${stats1.min}, Max: ${stats1.max}]`,
      `    Variance = ${activeVar1}, Std Dev = ${activeSD1}`,
      ``,
      `[2] Advanced Means:`,
      `    Weighted Mean = ${advResult.weightedMean !== undefined ? advResult.weightedMean : "N/A"}`,
      `    Geometric Mean = ${advResult.geometricMean !== undefined ? advResult.geometricMean : "N/A"}`,
      `    Harmonic Mean = ${advResult.harmonicMean !== undefined ? advResult.harmonicMean : "N/A"}`,
      `    Trimmed Mean (${advResult.trimPct}%) = ${advResult.trimmedMean}`,
      ``,
      `[3] Grouped Data:`,
      `    Grouped Mean = ${groupedResult.groupedMean} (Total N = ${groupedResult.totalN})`,
      `    Modal Class = ${groupedResult.modalClass}`,
      ``,
      `[4] Target Solver:`,
      `    Needed Score = ${targetResult.neededScore}% (Goal: ${targetGoal}%, Tests: ${targetTotalN})`,
      ``,
      `[5] Comparison (B - A):`,
      `    ΔMean = ${(statsB.mean - statsA.mean).toFixed(2)}, ΔMedian = ${(statsB.median - statsA.median).toFixed(2)}`,
      ``,
      `[6] Outlier & Skewness:`,
      `    Shape: ${outlierResult.skewnessShape}, Skewness: ${outlierResult.skewness}`,
      `    Outliers: ${outlierResult.outliers.length > 0 ? outlierResult.outliers.join(", ") : "None"}`,
      `Generated by CalcPlatform Central Tendency Suite`
    ].join("\n");
    handleCopyText(summary, "summary");
  };

  const handleCopyLatex = () => {
    const latex = `\\bar{x} = \\frac{\\sum x_i}{n} = \\frac{${stats1.sum}}{${stats1.count}} = ${stats1.mean}, \\quad \\text{Median} = ${stats1.median}, \\quad s = ${activeSD1}`;
    handleCopyText(latex, "latex");
  };

  const handleShareLink = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("raw", rawInput);
      url.searchParams.set("sample", isSample ? "1" : "0");
      navigator.clipboard.writeText(url.toString());
      setCopiedKey("share");
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {}
  };

  const handleExportCSV = () => {
    const rows = [
      ["Module", "Parameters", "Primary Output", "Secondary Outputs", "Statistical Interpretation"],
      [
        "Standard Raw Data",
        `"Data (N=${stats1.count}), ${isSample ? "Sample" : "Population"}"`,
        `"Mean: ${stats1.mean}"`,
        `"Median: ${stats1.median}, Mode: ${stats1.modes.join("; ") || "None"}, Range: ${stats1.range}"`,
        `"SD: ${activeSD1}, Variance: ${activeVar1}"`
      ],
      [
        "Advanced Means",
        `"Values: ${advValues}, Weights: ${advWeights}, Trim: ${trimPct}%"`,
        `"Weighted Mean: ${advResult.weightedMean ?? "N/A"}"`,
        `"Trimmed: ${advResult.trimmedMean}, Geometric: ${advResult.geometricMean ?? "N/A"}, Harmonic: ${advResult.harmonicMean ?? "N/A"}"`,
        `"${advResult.trimExplanation}"`
      ],
      [
        "Grouped Data",
        `"Values: ${groupedVals}, Freqs: ${groupedFreqs}"`,
        `"Grouped Mean: ${groupedResult.groupedMean}"`,
        `"Total N: ${groupedResult.totalN}, Modal Class: ${groupedResult.modalClass}"`,
        `"Class Midpoint Weighted Estimation"`
      ],
      [
        "Target Mean Solver",
        `"Current: ${targetCurrent}, Goal: ${targetGoal}, Tests: ${targetTotalN}"`,
        `"Required Score: ${targetResult.neededScore}%"`,
        `"Current Mean: ${targetResult.currentMean}%, Needed Sum: ${targetResult.neededTotalSum}"`,
        `"${targetResult.neededScore < 0 ? "Target Already Exceeded" : targetResult.neededScore > 100 ? "Requires >100%" : "Achievable"}"`
      ],
      [
        "Two-Dataset Comparison",
        `"Data A vs Data B"`,
        `"Mean A: ${statsA.mean}, Mean B: ${statsB.mean}"`,
        `"ΔMean: ${(statsB.mean - statsA.mean).toFixed(2)}, ΔSD: ${(statsB.sampleSD - statsA.sampleSD).toFixed(4)}"`,
        `"Delta (B - A)"`
      ],
      [
        "Outlier & Skewness",
        `"Data: ${outlierInput}"`,
        `"Pearson Skewness: ${outlierResult.skewness}"`,
        `"Fences: [${outlierResult.lowerFence}, ${outlierResult.upperFence}], Outliers: ${outlierResult.outliers.join("; ") || "None"}"`,
        `"${outlierResult.skewnessShape}"`
      ]
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mean_median_mode_analysis.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetDefaults = () => {
    setRawInput("3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29");
    setIsSample(true);
    setActiveVisual1("freq");

    setAdvValues("10, 15, 18, 20, 22, 25, 150");
    setAdvWeights("1, 2, 3, 4, 5, 6, 7");
    setTrimPct(10);

    setGroupedVals("15, 25, 35, 45, 55");
    setGroupedFreqs("4, 8, 15, 7, 2");

    setTargetCurrent("85, 90, 88, 92");
    setTargetGoal(90);
    setTargetTotalN(5);

    setCompareA("12, 15, 18, 22, 25, 28");
    setCompareB("10, 14, 19, 24, 30, 35");

    setOutlierInput("10, 12, 14, 15, 15, 16, 18, 20, 22, 100");

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Dynamic SVG Chart Coordinates for Card 1
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
      xMax: scaleX(stats1.max),
      xMean: scaleX(stats1.mean)
    };
  }, [stats1]);

  // Save Handlers
  const handleSaveStandard = () => {
    const inputsStr = `Data (N=${stats1.count}), Mode: ${isSample ? "Sample (n-1)" : "Population (N)"}`;
    const opStr = `Standard Central Tendency`;
    const resList = [
      `Mean (x̄) = ${stats1.mean}`,
      `Median = ${stats1.median}`,
      `Mode(s) = ${stats1.modes.length > 0 ? stats1.modes.join(", ") : "None"} (${stats1.modeType})`,
      `Range = ${stats1.range}`,
      `IQR = ${stats1.iqr}`,
      `Min / Max = [${stats1.min}, ${stats1.max}]`,
      `SD (${isSample ? "s" : "σ"}) = ${activeSD1}`,
      `Variance (${isSample ? "s²" : "σ²"}) = ${activeVar1}`
    ];

    const newItem: SavedMMMItem = {
      id: Date.now().toString(),
      title: `Standard (Mean=${stats1.mean}, Med=${stats1.median})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `x̄=${stats1.mean}, Med=${stats1.median}, SD=${activeSD1}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedStandardItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedStandardItems(updated);
    try { localStorage.setItem("saved_mmm_standard", JSON.stringify(updated)); } catch (e) {}
    setJustSavedStandard(true);
    setTimeout(() => setJustSavedStandard(false), 2000);
  };

  const handleSaveAdvanced = () => {
    const inputsStr = `Values (${advValues.substring(0, 15)}...), Trim: ${trimPct}%`;
    const opStr = `Advanced Means Suite`;
    const resList = [
      `Weighted Mean = ${advResult.weightedMean !== undefined ? advResult.weightedMean : "N/A"}`,
      `Geometric Mean = ${advResult.geometricMean !== undefined ? advResult.geometricMean : "N/A"}`,
      `Harmonic Mean = ${advResult.harmonicMean !== undefined ? advResult.harmonicMean : "N/A"}`,
      `Trimmed Mean (${trimPct}%) = ${advResult.trimmedMean}`,
      `Original Untrimmed Mean = ${advResult.originalMean}`,
      `Midrange = ${advResult.midrange}`
    ];

    const newItem: SavedMMMItem = {
      id: Date.now().toString(),
      title: `Adv Means (Trim=${advResult.trimmedMean})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Trimmed=${advResult.trimmedMean}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedAdvancedItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedAdvancedItems(updated);
    try { localStorage.setItem("saved_mmm_advanced", JSON.stringify(updated)); } catch (e) {}
    setJustSavedAdvanced(true);
    setTimeout(() => setJustSavedAdvanced(false), 2000);
  };

  const handleSaveGrouped = () => {
    const inputsStr = `Values (${groupedVals.substring(0, 15)}...), Freqs (${groupedFreqs.substring(0, 15)}...)`;
    const opStr = `Grouped Data Frequency Mode`;
    const resList = [
      `Total N = ${groupedResult.totalN}`,
      `Grouped Mean = ${groupedResult.groupedMean}`,
      `Modal Class = ${groupedResult.modalClass}`
    ];

    const newItem: SavedMMMItem = {
      id: Date.now().toString(),
      title: `Grouped (Mean=${groupedResult.groupedMean})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Mean=${groupedResult.groupedMean}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedGroupedItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedGroupedItems(updated);
    try { localStorage.setItem("saved_mmm_grouped", JSON.stringify(updated)); } catch (e) {}
    setJustSavedGrouped(true);
    setTimeout(() => setJustSavedGrouped(false), 2000);
  };

  const handleSaveTarget = () => {
    const inputsStr = `Goal Avg: ${targetGoal}, Total N: ${targetTotalN}, Current: (${targetCurrent.substring(0, 15)}...)`;
    const opStr = `Target Mean Solver`;
    const resList = [
      `Required Score = ${targetResult.neededScore}`,
      `Current Mean = ${targetResult.currentMean}`,
      `Needed Total Sum = ${targetResult.neededTotalSum}`,
      `Status = ${targetResult.isAchievable ? "Achievable" : "Impossible (>100%)"}`
    ];

    const newItem: SavedMMMItem = {
      id: Date.now().toString(),
      title: `Target Score Needed (${targetResult.neededScore})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Needed Score = ${targetResult.neededScore}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedTargetItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedTargetItems(updated);
    try { localStorage.setItem("saved_mmm_target", JSON.stringify(updated)); } catch (e) {}
    setJustSavedTarget(true);
    setTimeout(() => setJustSavedTarget(false), 2000);
  };

  const handleSaveCompare = () => {
    const inputsStr = `Dataset A (N=${statsA.count}) vs Dataset B (N=${statsB.count})`;
    const opStr = `Two-Dataset Comparison`;
    const resList = [
      `Mean A = ${statsA.mean} | Mean B = ${statsB.mean} (Δ = ${(statsB.mean - statsA.mean).toFixed(2)})`,
      `Median A = ${statsA.median} | Median B = ${statsB.median}`,
      `Range A = ${statsA.range} | Range B = ${statsB.range}`,
      `SD A = ${statsA.sampleSD} | SD B = ${statsB.sampleSD}`
    ];

    const newItem: SavedMMMItem = {
      id: Date.now().toString(),
      title: `Dataset A vs B (ΔMean=${(statsB.mean - statsA.mean).toFixed(2)})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `A(Mean=${statsA.mean}) vs B(Mean=${statsB.mean})`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedCompareItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedCompareItems(updated);
    try { localStorage.setItem("saved_mmm_compare", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCompare(true);
    setTimeout(() => setJustSavedCompare(false), 2000);
  };

  const handleSaveOutlier = () => {
    const inputsStr = `Dataset (N=${dataOutlier.length})`;
    const opStr = `Outlier & Skewness Inspector`;
    const resList = [
      `Skewness = ${outlierResult.skewness}`,
      `Shape = ${outlierResult.skewnessShape}`,
      `Outliers = ${outlierResult.outliers.length > 0 ? outlierResult.outliers.join(", ") : "None"}`,
      `Fences = [${outlierResult.lowerFence}, ${outlierResult.upperFence}]`
    ];

    const newItem: SavedMMMItem = {
      id: Date.now().toString(),
      title: `Skewness (${outlierResult.skewnessShape})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Skew=${outlierResult.skewness}, Outliers=${outlierResult.outliers.length}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedOutlierItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedOutlierItems(updated);
    try { localStorage.setItem("saved_mmm_outlier", JSON.stringify(updated)); } catch (e) {}
    setJustSavedOutlier(true);
    setTimeout(() => setJustSavedOutlier(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* MASTER ACTION TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedKey === "summary" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedKey === "summary" ? "Copied!" : "Copy Summary"}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLatex}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedKey === "latex" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedKey === "latex" ? "Copied!" : "Copy LaTeX"}</span>
          </button>

          <button
            type="button"
            onClick={handleShareLink}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedKey === "share" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedKey === "share" ? "Link Copied!" : "Share"}</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsReportModalOpen(true)}
          className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer ml-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: STANDARD RAW DATA STREAM MODE (MEAN, MEDIAN, MODE & RANGE) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Standard Raw Data Stream Mode (Mean, Median, Mode &amp; Range)</span>
          <button
            type="button"
            onClick={handleSaveStandard}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedStandard ? "Saved!" : "Save"}</span>
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
                    Raw Data (Comma, space, or line separated):
                  </label>
                  <textarea
                    rows={4}
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    placeholder="e.g. 3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29"
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
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Mean (Average x̄)
                  </span>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {stats1.mean}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Median (Middle)
                  </span>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {stats1.median}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Mode(s) ({stats1.modeType})
                  </span>
                  <div className="text-2xl font-mono font-black text-blue-600 dark:text-blue-400">
                    {stats1.modes.length > 0 ? stats1.modes.join(", ") : "No Mode"}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Range (Max - Min)
                  </span>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {stats1.range}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-xs font-bold pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-0.5">
                  <span className="text-[10px] text-slate-400 block uppercase">Sum (∑x)</span>
                  <span className="font-mono text-slate-900 dark:text-slate-100">{stats1.sum}</span>
                </div>

                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-0.5">
                  <span className="text-[10px] text-slate-400 block uppercase">Count (n)</span>
                  <span className="font-mono text-slate-900 dark:text-slate-100">{stats1.count}</span>
                </div>

                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-0.5">
                  <span className="text-[10px] text-slate-400 block uppercase">
                    Variance ({isSample ? "s²" : "σ²"})
                  </span>
                  <span className="font-mono text-slate-900 dark:text-slate-100">{activeVar1}</span>
                </div>

                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-0.5">
                  <span className="text-[10px] text-slate-400 block uppercase">
                    {isSample ? "Std Dev (s)" : "Std Dev (σ)"}
                  </span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{activeSD1}</span>
                </div>
              </div>
            </div>
          </div>

          {/* TABBED VISUAL ANALYTICS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Interactive Visual Analytics &amp; Derivations</span>
              </h3>

              <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveVisual1("freq")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual1 === "freq" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Frequency Bar Chart
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
                  onClick={() => setActiveVisual1("steps")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual1 === "steps" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Step Derivations
                </button>
              </div>
            </div>

            {/* TAB 1: FREQUENCY BAR CHART SVG WITH MEAN (BLUE) & MEDIAN (GREEN) LINES */}
            {activeVisual1 === "freq" && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Value Frequency Distribution:</span>
                  <div className="flex items-center gap-4 text-[11px]">
                    <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                      <span className="w-3 h-0.5 bg-blue-600 inline-block"></span> Mean x̄ ({stats1.mean})
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <span className="w-3 h-0.5 bg-emerald-600 border-b border-dashed border-emerald-600 inline-block"></span> Median ({stats1.median})
                    </span>
                  </div>
                </div>

                <div className="w-full flex justify-center py-2 overflow-x-auto">
                  <svg viewBox="0 0 500 160" className="w-full max-w-xl h-auto">
                    {/* Axes */}
                    <line x1="40" y1="130" x2="480" y2="130" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="40" y1="130" x2="40" y2="20" stroke="#94a3b8" strokeWidth="2" />

                    {/* Bars */}
                    {stats1.freqTable.slice(0, 12).map((item, idx) => {
                      const maxFreq = Math.max(...stats1.freqTable.map(f => f.freq), 1);
                      const barWidth = 420 / Math.min(stats1.freqTable.length, 12);
                      const x = 40 + idx * barWidth;
                      const h = (item.freq / maxFreq) * 90;
                      const y = 130 - h;
                      return (
                        <g key={idx}>
                          <rect x={x + 4} y={y} width={barWidth - 8} height={h} fill="#3b82f6" opacity="0.7" rx="3" />
                          <text x={x + barWidth / 2} y={y - 4} textAnchor="middle" className="text-[9px] font-mono font-bold fill-blue-700 dark:fill-blue-300">{item.freq}</text>
                          <text x={x + barWidth / 2} y="145" textAnchor="middle" className="text-[8px] font-mono fill-slate-500">{item.val}</text>
                        </g>
                      );
                    })}

                    {/* Dynamic Mean Line (Solid Blue) */}
                    <line
                      x1={chartScales1.xMean}
                      y1="15"
                      x2={chartScales1.xMean}
                      y2="130"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                    />
                    <circle cx={chartScales1.xMean} cy="15" r="3" fill="#2563eb" />

                    {/* Dynamic Median Line (Dashed Green) */}
                    <line
                      x1={chartScales1.xMed}
                      y1="15"
                      x2={chartScales1.xMed}
                      y2="130"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeDasharray="4,3"
                    />
                    <circle cx={chartScales1.xMed} cy="15" r="3" fill="#10b981" />
                  </svg>
                </div>
              </div>
            )}

            {/* TAB 2: DYNAMIC SCALED BOX PLOT SVG */}
            {activeVisual1 === "box" && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Five-Number Summary Box Plot (Scaled Dynamically to Data Range [{stats1.min}, {stats1.max}]):
                </h4>
                <div className="w-full flex justify-center py-3 overflow-x-auto">
                  <svg viewBox="0 0 500 110" className="w-full max-w-xl h-auto">
                    {/* Main Whisker Horizontal Line */}
                    <line
                      x1={chartScales1.xMin}
                      y1="50"
                      x2={chartScales1.xMax}
                      y2="50"
                      stroke="#475569"
                      strokeWidth="2"
                    />

                    {/* Min End Vertical Cap */}
                    <line x1={chartScales1.xMin} y1="35" x2={chartScales1.xMin} y2="65" stroke="#475569" strokeWidth="2" />
                    
                    {/* Max End Vertical Cap */}
                    <line x1={chartScales1.xMax} y1="35" x2={chartScales1.xMax} y2="65" stroke="#475569" strokeWidth="2" />

                    {/* Box (Q1 to Q3) */}
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

                    {/* Median Vertical Line */}
                    <line
                      x1={chartScales1.xMed}
                      y1="30"
                      x2={chartScales1.xMed}
                      y2="70"
                      stroke="#1e40af"
                      strokeWidth="3"
                    />

                    {/* Dynamic Labels Below */}
                    <text x={chartScales1.xMin} y="92" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                      Min: {stats1.min}
                    </text>
                    <text x={chartScales1.xQ1} y="92" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                      Q1: {stats1.q1}
                    </text>
                    <text x={chartScales1.xMed} y="92" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-400">
                      Med: {stats1.median}
                    </text>
                    <text x={chartScales1.xQ3} y="92" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                      Q3: {stats1.q3}
                    </text>
                    <text x={chartScales1.xMax} y="92" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                      Max: {stats1.max}
                    </text>
                  </svg>
                </div>
              </div>
            )}

            {/* TAB 3: STEP DERIVATIONS */}
            {activeVisual1 === "steps" && (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans text-xs">Mean Derivation:</span>
                  <p>{stats1.meanStepText}</p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans text-xs">Median Derivation:</span>
                  <p>{stats1.medianStepText}</p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans text-xs">Mode Derivation:</span>
                  <p>{stats1.modeStepText}</p>
                </div>
              </div>
            )}
          </div>

          {/* EMBEDDED SAVED RAW DATA CALCULATIONS INSIDE CARD 1 */}
          {savedStandardItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Raw Data Calculations ({savedStandardItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedStandardItems([]);
                    try { localStorage.removeItem("saved_mmm_standard"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedStandardItems.map((item) => {
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
                            const updated = savedStandardItems.filter(i => i.id !== item.id);
                            setSavedStandardItems(updated);
                            try { localStorage.setItem("saved_mmm_standard", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 2: ADVANCED MEANS SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Advanced Means Suite (Weighted, Geometric, Harmonic, Trimmed &amp; Midrange)</span>
          <button
            type="button"
            onClick={handleSaveAdvanced}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedAdvanced ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Advanced Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Values (x_i) — Try adding an outlier like 150:
                  </label>
                  <textarea
                    rows={2}
                    value={advValues}
                    onChange={(e) => setAdvValues(e.target.value)}
                    placeholder="e.g. 10, 15, 18, 20, 22, 25, 150"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Weights (w_i):</label>
                  <textarea
                    rows={2}
                    value={advWeights}
                    onChange={(e) => setAdvWeights(e.target.value)}
                    placeholder="e.g. 1, 2, 3, 4, 5, 6, 7"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold"
                  />
                </div>

                {/* INTERACTIVE K% SELECTOR & SLIDER */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Trim Percentage (k%):</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono font-extrabold text-sm">{trimPct}%</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="5"
                    value={trimPct}
                    onChange={(e) => setTrimPct(parseInt(e.target.value, 10))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />

                  {/* QUICK PRESET BUTTONS FOR K% SELECTOR */}
                  <div className="grid grid-cols-5 gap-1 pt-1">
                    {[0, 5, 10, 15, 20].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setTrimPct(pct)}
                        className={`py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                          trimPct === pct
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ADVANCED MEANS OUTPUT & DETAILED TRIMMED MEAN DIAGNOSTIC */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Weighted Mean (x̄_w)
                    </span>
                    <div className="text-2xl font-mono font-black text-slate-900 dark:text-slate-100">
                      {advResult.weightedMean !== undefined ? advResult.weightedMean : "N/A"}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Trimmed Mean ({trimPct}%)
                    </span>
                    <div className="text-2xl font-mono font-black text-blue-600 dark:text-blue-400">
                      {advResult.trimmedMean}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Geometric Mean
                    </span>
                    <div className="text-2xl font-mono font-black text-slate-900 dark:text-slate-100">
                      {advResult.geometricMean !== undefined ? advResult.geometricMean : "N/A"}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Harmonic Mean
                    </span>
                    <div className="text-2xl font-mono font-black text-slate-900 dark:text-slate-100">
                      {advResult.harmonicMean !== undefined ? advResult.harmonicMean : "N/A"}
                    </div>
                  </div>
                </div>

                {/* DETAILED TRIMMED MEAN PURPOSE & DIAGNOSTIC CARD */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      Trimmed Mean Breakdown &amp; Purpose
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                      Untrimmed: {advResult.originalMean} &rarr; Trimmed: {advResult.trimmedMean}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                    <strong>Purpose of Trimmed Mean:</strong> Extreme outliers (like 150 in the dataset above) heavily distort the standard arithmetic mean ({advResult.originalMean}). Trimming the top and bottom {trimPct}% of values removes those extreme tail numbers, producing a robust average ({advResult.trimmedMean}) that accurately reflects typical data.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-2.5 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900/40 space-y-1">
                      <span className="font-sans font-bold text-red-700 dark:text-red-400 text-[11px] block">
                        Removed Extreme Outliers ({advResult.removedItems.length} values):
                      </span>
                      <span className="font-bold text-red-900 dark:text-red-200">
                        {advResult.removedItems.length > 0 ? `[${advResult.removedItems.join(", ")}]` : "None (0%)"}
                      </span>
                    </div>

                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/40 space-y-1">
                      <span className="font-sans font-bold text-emerald-700 dark:text-emerald-400 text-[11px] block">
                        Active Remaining Dataset ({advResult.remainingItems.length} values used):
                      </span>
                      <span className="font-bold text-emerald-900 dark:text-emerald-200">
                        [{advResult.remainingItems.join(", ")}]
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED ADVANCED MEANS INSIDE CARD 2 */}
          {savedAdvancedItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Advanced Means ({savedAdvancedItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedAdvancedItems([]);
                    try { localStorage.removeItem("saved_mmm_advanced"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedAdvancedItems.map((item) => {
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
                            const updated = savedAdvancedItems.filter(i => i.id !== item.id);
                            setSavedAdvancedItems(updated);
                            try { localStorage.setItem("saved_mmm_advanced", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 3: FREQUENCY DISTRIBUTION / GROUPED DATA MODE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Frequency Distribution / Grouped Data Mode</span>
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
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Values / Class Midpoints (x_i):</label>
                  <textarea
                    rows={2}
                    value={groupedVals}
                    onChange={(e) => setGroupedVals(e.target.value)}
                    placeholder="e.g. 15, 25, 35, 45, 55"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Frequencies (f_i):</label>
                  <textarea
                    rows={2}
                    value={groupedFreqs}
                    onChange={(e) => setGroupedFreqs(e.target.value)}
                    placeholder="e.g. 4, 8, 15, 7, 2"
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

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Total N (∑f)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{groupedResult.totalN}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Modal Class</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{groupedResult.modalClass}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED GROUPED DATA CALCULATIONS INSIDE CARD 3 */}
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
                    try { localStorage.removeItem("saved_mmm_grouped"); } catch(e){}
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
                            try { localStorage.setItem("saved_mmm_grouped", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 4: TARGET MEAN SOLVER ("WHAT SCORE DO I NEED?") */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Target Mean Solver ("What Score Do I Need?")</span>
          <button
            type="button"
            onClick={handleSaveTarget}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedTarget ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Target Solver Parameters
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Current Scores:</label>
                  <textarea
                    rows={2}
                    value={targetCurrent}
                    onChange={(e) => setTargetCurrent(e.target.value)}
                    placeholder="e.g. 85, 90, 88, 92"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Desired Target Avg:</label>
                    <input
                      type="number"
                      value={targetGoal}
                      onChange={(e) => setTargetGoal(parseFloat(e.target.value) || 0)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Total Tests (N):</label>
                    <input
                      type="number"
                      min="1"
                      value={targetTotalN}
                      onChange={(e) => setTargetTotalN(parseInt(e.target.value, 10) || 1)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: TARGET SOLVER OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Required Score on Final Test
                  </span>
                  <div className={`text-4xl font-mono font-extrabold ${targetResult.isAchievable ? "text-emerald-600" : targetResult.neededScore < 0 ? "text-blue-600" : "text-amber-600"}`}>
                    {targetResult.neededScore}%
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Status: {
                      targetResult.neededScore < 0
                        ? "Target Already Exceeded (Can score 0%)"
                        : targetResult.neededScore > 100
                        ? "Requires >100% score (Unattainable on standard 0-100 test)"
                        : "Achievable"
                    }
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Current Average</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{targetResult.currentMean}%</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Needed Total Sum</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{targetResult.neededTotalSum}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED TARGET SOLVES INSIDE CARD 4 */}
          {savedTargetItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Target Solves ({savedTargetItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedTargetItems([]);
                    try { localStorage.removeItem("saved_mmm_target"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedTargetItems.map((item) => {
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
                            const updated = savedTargetItems.filter(i => i.id !== item.id);
                            setSavedTargetItems(updated);
                            try { localStorage.setItem("saved_mmm_target", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 5: TWO-DATASET DIRECT COMPARISON (DATASET A VS DATASET B) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Two-Dataset Direct Comparison (Dataset A vs Dataset B)</span>
          <button
            type="button"
            onClick={handleSaveCompare}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCompare ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Paired Dataset Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Dataset A:</label>
                  <textarea
                    rows={2}
                    value={compareA}
                    onChange={(e) => setCompareA(e.target.value)}
                    placeholder="e.g. 12, 15, 18, 22"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Dataset B:</label>
                  <textarea
                    rows={2}
                    value={compareB}
                    onChange={(e) => setCompareB(e.target.value)}
                    placeholder="e.g. 10, 14, 19, 24"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: COMPARISON TABLE */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Side-by-Side Delta Metrics
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead>
                      <tr className="bg-blue-600 text-white font-bold">
                        <th className="p-2">Metric</th>
                        <th className="p-2">Dataset A</th>
                        <th className="p-2">Dataset B</th>
                        <th className="p-2">Delta (B - A)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono bg-white dark:bg-slate-900">
                      <tr>
                        <td className="p-2 font-bold font-sans text-slate-600">Count (N)</td>
                        <td className="p-2">{statsA.count}</td>
                        <td className="p-2">{statsB.count}</td>
                        <td className="p-2 text-slate-500">{statsB.count - statsA.count}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold font-sans text-slate-600">Mean (x̄)</td>
                        <td className="p-2 font-bold text-blue-600">{statsA.mean}</td>
                        <td className="p-2 font-bold text-blue-600">{statsB.mean}</td>
                        <td className="p-2 font-bold text-emerald-600">{(statsB.mean - statsA.mean).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold font-sans text-slate-600">Median</td>
                        <td className="p-2">{statsA.median}</td>
                        <td className="p-2">{statsB.median}</td>
                        <td className="p-2 text-slate-500">{(statsB.median - statsA.median).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold font-sans text-slate-600">Range</td>
                        <td className="p-2">{statsA.range}</td>
                        <td className="p-2">{statsB.range}</td>
                        <td className="p-2 text-slate-500">{(statsB.range - statsA.range).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold font-sans text-slate-600">Std Dev ({isSample ? "s" : "σ"})</td>
                        <td className="p-2">{isSample ? statsA.sampleSD : statsA.popSD}</td>
                        <td className="p-2">{isSample ? statsB.sampleSD : statsB.popSD}</td>
                        <td className="p-2 text-slate-500">{((isSample ? statsB.sampleSD : statsB.popSD) - (isSample ? statsA.sampleSD : statsA.popSD)).toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED COMPARISONS INSIDE CARD 5 */}
          {savedCompareItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Dataset Comparisons ({savedCompareItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCompareItems([]);
                    try { localStorage.removeItem("saved_mmm_compare"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedCompareItems.map((item) => {
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
                            const updated = savedCompareItems.filter(i => i.id !== item.id);
                            setSavedCompareItems(updated);
                            try { localStorage.setItem("saved_mmm_compare", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 6: OUTLIER DETECTION & SKEWNESS INSPECTOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Outlier Detection &amp; Skewness Inspector</span>
          <button
            type="button"
            onClick={handleSaveOutlier}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedOutlier ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Inspector Dataset Input
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Dataset:</label>
                  <textarea
                    rows={3}
                    value={outlierInput}
                    onChange={(e) => setOutlierInput(e.target.value)}
                    placeholder="e.g. 10, 12, 14, 15, 15, 16, 18, 20, 22, 100"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: OUTLIER / SKEWNESS OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Distribution Shape
                  </span>
                  <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                    {outlierResult.skewnessShape}
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Pearson Skewness: {outlierResult.skewness}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Tukey 1.5x IQR Fences</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">[{outlierResult.lowerFence}, {outlierResult.upperFence}]</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Identified Outliers</span>
                    <span className="font-mono text-red-600 dark:text-red-400">
                      {outlierResult.outliers.length > 0 ? outlierResult.outliers.join(", ") : "None Detected"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED OUTLIER INSPECTIONS INSIDE CARD 6 */}
          {savedOutlierItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Skewness &amp; Outlier Inspections ({savedOutlierItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedOutlierItems([]);
                    try { localStorage.removeItem("saved_mmm_outlier"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedOutlierItems.map((item) => {
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
                            const updated = savedOutlierItems.filter(i => i.id !== item.id);
                            setSavedOutlierItems(updated);
                            try { localStorage.setItem("saved_mmm_outlier", JSON.stringify(updated)); } catch(e){}
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

      {/* EXECUTIVE PRINT & PDF REPORT MODAL */}
      <MMMReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        rawInput={rawInput}
        isSample={isSample}
        stats1={stats1}
        advValues={advValues}
        advWeights={advWeights}
        advResult={advResult}
        groupedVals={groupedVals}
        groupedFreqs={groupedFreqs}
        groupedResult={groupedResult}
        targetCurrent={targetCurrent}
        targetGoal={targetGoal}
        targetTotalN={targetTotalN}
        targetResult={targetResult}
        compareA={compareA}
        compareB={compareB}
        statsA={statsA}
        statsB={statsB}
        outlierInput={outlierInput}
        outlierResult={outlierResult}
      />
    </div>
  );
}

export default MeanMedianModeCalculator;
