"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sliders,
  Layers,
  Copy,
  Download,
  TrendingUp,
  BarChart2,
  RotateCcw,
  Printer,
  ShieldAlert,
  AlertCircle
} from "lucide-react";
import {
  computeStandardZ,
  computeInverseZ,
  computeIntervalZ,
  computeBatchZ,
  normalPDF
} from "@/app/calculators/z-score-calculator/z-score-logic";
import { ZScoreReportModal } from "./ZScoreReportModal";

export interface SavedZItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function ZScoreCalculator() {
  // Card 1 Inputs: Standard Z-Score
  const [rawX, setRawX] = useState<number>(85);
  const [mean1, setMean1] = useState<number>(70);
  const [sd1, setSd1] = useState<number>(10);
  const [isSample1, setIsSample1] = useState<boolean>(false);
  const [precision1, setPrecision1] = useState<number>(4);
  const [activeTail1, setActiveTail1] = useState<"left" | "right" | "two">("left");

  // Card 2 Inputs: Inverse Z-Score
  const [invValue, setInvValue] = useState<number>(95);
  const [invProbType, setInvProbType] = useState<"conf" | "pct" | "prob">("conf");
  const [invTailType, setInvTailType] = useState<"two" | "left" | "right">("two");
  const [invMean, setInvMean] = useState<number>(100);
  const [invSD, setInvSD] = useState<number>(15);

  // Card 3 Inputs: Interval Z-Score
  const [intX1, setIntX1] = useState<number>(60);
  const [intX2, setIntX2] = useState<number>(80);
  const [intMean, setIntMean] = useState<number>(70);
  const [intSD, setIntSD] = useState<number>(10);

  // Card 4 Inputs: Batch Dataset
  const [batchInput, setBatchInput] = useState<string>("65, 70, 72, 75, 80, 85, 90, 92, 95, 100");
  const [copiedBatch, setCopiedBatch] = useState<boolean>(false);

  // Master Toolbar States
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  // Saved calculation states for Card 1 to 4
  const [savedStandardItems, setSavedStandardItems] = useState<SavedZItem[]>([]);
  const [justSavedStandard, setJustSavedStandard] = useState<boolean>(false);

  const [savedInverseItems, setSavedInverseItems] = useState<SavedZItem[]>([]);
  const [justSavedInverse, setJustSavedInverse] = useState<boolean>(false);

  const [savedIntervalItems, setSavedIntervalItems] = useState<SavedZItem[]>([]);
  const [justSavedInterval, setJustSavedInterval] = useState<boolean>(false);

  const [savedBatchItems, setSavedBatchItems] = useState<SavedZItem[]>([]);
  const [justSavedBatch, setJustSavedBatch] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Restore saved state and URL parameters on mount
  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_z_standard");
      if (s1) setSavedStandardItems(JSON.parse(s1));

      const s2 = localStorage.getItem("saved_z_inverse");
      if (s2) setSavedInverseItems(JSON.parse(s2));

      const s3 = localStorage.getItem("saved_z_interval");
      if (s3) setSavedIntervalItems(JSON.parse(s3));

      const s4 = localStorage.getItem("saved_z_batch");
      if (s4) setSavedBatchItems(JSON.parse(s4));
    } catch (e) {}

    if (typeof window !== "undefined" && window.location.search) {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.has("x")) setRawX(parseFloat(params.get("x")!) || 85);
        if (params.has("m")) setMean1(parseFloat(params.get("m")!) || 70);
        if (params.has("s")) setSd1(parseFloat(params.get("s")!) || 10);
        if (params.has("samp")) setIsSample1(params.get("samp") === "1");
        if (params.has("conf")) setInvValue(parseFloat(params.get("conf")!) || 95);
        if (params.has("x1")) setIntX1(parseFloat(params.get("x1")!) || 60);
        if (params.has("x2")) setIntX2(parseFloat(params.get("x2")!) || 80);
      } catch (e) {}
    }
  }, []);

  // Card 1 Calculations
  const stdResult = useMemo(
    () => computeStandardZ(rawX, mean1, sd1, isSample1, precision1),
    [rawX, mean1, sd1, isSample1, precision1]
  );

  // Card 2 Calculations
  const invResult = useMemo(
    () => computeInverseZ(invValue, invProbType, invTailType, invMean, invSD, precision1),
    [invValue, invProbType, invTailType, invMean, invSD, precision1]
  );

  // Card 3 Calculations
  const intResult = useMemo(
    () => computeIntervalZ(intX1, intX2, intMean, intSD, precision1),
    [intX1, intX2, intMean, intSD, precision1]
  );

  // Card 4 Calculations
  const batchResult = useMemo(
    () => computeBatchZ(batchInput, precision1),
    [batchInput, precision1]
  );

  // Master Toolbar Handlers
  const handleCopySummary = () => {
    const summaryText = `--- CALCPLATFORM Z-SCORE & NORMAL DISTRIBUTION REPORT ---
1. Standard Z-Score & Probability:
- Raw Score X = ${rawX}, Mean = ${mean1}, SD = ${sd1} (${isSample1 ? "Sample" : "Population"})
- Z-Score: ${stdResult.zScoreFormatted}
- Percentile Rank: ${stdResult.percentileRank}
- Left Tail P(Z < z): ${stdResult.leftTailPct}
- Right Tail P(Z > z): ${stdResult.rightTailPct}
- Two-Tail P(|Z| > |z|): ${stdResult.twoTailsPct}

2. Inverse Critical Value Solver:
- Parameter: ${invValue} (${invProbType.toUpperCase()}, ${invTailType} tail)
- Critical Z*: ${invResult.criticalZFormatted}
- Raw Score X: ${invResult.rawValueFormatted} (Margin of Error: ±${invResult.marginOfErrorFormatted})

3. Interval Area Analysis:
- Range: [${intResult.x1}, ${intResult.x2}] (μ=${intMean}, σ=${intSD})
- Area Between: ${intResult.areaBetweenPct} (${intResult.areaBetween})
- Area Outside: ${intResult.areaOutsidePct}

4. Batch Dataset (N = ${batchResult.count}):
- Mean = ${batchResult.mean}, SD (s) = ${batchResult.sd}, Variance (s²) = ${batchResult.variance}, Median = ${batchResult.median}`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleCopyLatex = () => {
    const latexText = `% Standard Z-Score Formula
Z = \\frac{X - \\mu}{\\sigma} = \\frac{${rawX} - ${mean1}}{${sd1}} = ${stdResult.zScoreFormatted}

% Cumulative Probability
\\Phi(Z) = P(Z \\le ${stdResult.zScoreFormatted}) = ${stdResult.leftTailP}

% Critical Value
Z^* = \\Phi^{-1}\\left(1 - \\frac{\\alpha}{2}\\right) = \\pm ${invResult.criticalZFormatted}`;

    navigator.clipboard.writeText(latexText);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  const handleShare = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("x", rawX.toString());
    url.searchParams.set("m", mean1.toString());
    url.searchParams.set("s", sd1.toString());
    url.searchParams.set("samp", isSample1 ? "1" : "0");
    url.searchParams.set("conf", invValue.toString());
    url.searchParams.set("x1", intX1.toString());
    url.searchParams.set("x2", intX2.toString());
    navigator.clipboard.writeText(url.toString());
    window.history.replaceState({}, "", url.toString());
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleResetDefaults = () => {
    setRawX(85);
    setMean1(70);
    setSd1(10);
    setIsSample1(false);
    setPrecision1(4);
    setActiveTail1("left");
    setInvValue(95);
    setInvProbType("conf");
    setInvTailType("two");
    setInvMean(100);
    setInvSD(15);
    setIntX1(60);
    setIntX2(80);
    setIntMean(70);
    setIntSD(10);
    setBatchInput("65, 70, 72, 75, 80, 85, 90, 92, 95, 100");
  };

  // Save Handlers
  const handleSaveStandard = () => {
    if (!stdResult.isValid) return;
    const inputsStr = `X = ${rawX}, ${isSample1 ? "x̄" : "μ"} = ${mean1}, ${isSample1 ? "s" : "σ"} = ${sd1}`;
    const opStr = `Standard Z-Score & Probability`;
    const resList = [
      `Z-Score = ${stdResult.zScoreFormatted}`,
      `Percentile Rank = ${stdResult.percentileRank}`,
      `P(Z < z) = ${stdResult.leftTailP} (${stdResult.leftTailPct})`,
      `P(Z > z) = ${stdResult.rightTailP} (${stdResult.rightTailPct})`,
      `P(|Z| > |z|) = ${stdResult.twoTailsP} (${stdResult.twoTailsPct})`
    ];

    const newItem: SavedZItem = {
      id: Date.now().toString(),
      title: `Z = ${stdResult.zScoreFormatted} (X=${rawX}, ${stdResult.percentileRank})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Z = ${stdResult.zScoreFormatted}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedStandardItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedStandardItems(updated);
    try { localStorage.setItem("saved_z_standard", JSON.stringify(updated)); } catch (e) {}
    setJustSavedStandard(true);
    setTimeout(() => setJustSavedStandard(false), 2000);
  };

  const handleSaveInverse = () => {
    if (!invResult.isValid) return;
    const inputsStr = `Value = ${invValue} (${invProbType}), Tail: ${invTailType}`;
    const opStr = `Inverse Z-Score & Critical Values`;
    const resList = [
      `Critical Z* = ${invResult.criticalZFormatted}`,
      `Raw Score X = ${invResult.rawValueFormatted}`,
      `Margin of Error = ±${invResult.marginOfErrorFormatted}`
    ];

    const newItem: SavedZItem = {
      id: Date.now().toString(),
      title: `Z* = ${invResult.criticalZFormatted} (X=${invResult.rawValueFormatted})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Z* = ${invResult.criticalZFormatted}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedInverseItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedInverseItems(updated);
    try { localStorage.setItem("saved_z_inverse", JSON.stringify(updated)); } catch (e) {}
    setJustSavedInverse(true);
    setTimeout(() => setJustSavedInverse(false), 2000);
  };

  const handleSaveInterval = () => {
    if (!intResult.isValid) return;
    const inputsStr = `Range [${intResult.x1}, ${intResult.x2}], μ = ${intMean}, σ = ${intSD}`;
    const opStr = `Interval & Range Area Calculator`;
    const resList = [
      `Area Between = ${intResult.areaBetweenPct} (${intResult.areaBetween})`,
      `Area Outside = ${intResult.areaOutsidePct} (${intResult.areaOutside})`,
      `Z1 = ${intResult.z1Formatted}, Z2 = ${intResult.z2Formatted}`
    ];

    const newItem: SavedZItem = {
      id: Date.now().toString(),
      title: `Range [${intResult.x1}, ${intResult.x2}] → Area = ${intResult.areaBetweenPct}`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Area = ${intResult.areaBetweenPct}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedIntervalItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedIntervalItems(updated);
    try { localStorage.setItem("saved_z_interval", JSON.stringify(updated)); } catch (e) {}
    setJustSavedInterval(true);
    setTimeout(() => setJustSavedInterval(false), 2000);
  };

  const handleSaveBatch = () => {
    if (batchResult.count === 0) return;
    const inputsStr = `Dataset N = ${batchResult.count}`;
    const opStr = `Batch Dataset & CSV Analyzer`;
    const resList = [
      `Mean = ${batchResult.mean}`,
      `Std Dev (s) = ${batchResult.sd}`,
      `Variance (s²) = ${batchResult.variance}`,
      `Median = ${batchResult.median}`
    ];

    const newItem: SavedZItem = {
      id: Date.now().toString(),
      title: `Batch (N=${batchResult.count}, Mean=${batchResult.mean})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Mean = ${batchResult.mean}, SD = ${batchResult.sd}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedBatchItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedBatchItems(updated);
    try { localStorage.setItem("saved_z_batch", JSON.stringify(updated)); } catch (e) {}
    setJustSavedBatch(true);
    setTimeout(() => setJustSavedBatch(false), 2000);
  };

  // Export CSV for Batch Data
  const handleDownloadBatchCSV = () => {
    if (batchResult.items.length === 0) return;
    const header = "Raw Value,Z-Score,Percentile Rank\n";
    const rows = batchResult.items.map(i => `${i.val},${i.zScoreFormatted},${i.percentilePct}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `z_scores_n${batchResult.count}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyBatch = () => {
    if (batchResult.items.length === 0) return;
    const text = batchResult.items.map(i => `X=${i.val} -> Z=${i.zScoreFormatted} (${i.percentilePct})`).join("\n");
    navigator.clipboard.writeText(text);
    setCopiedBatch(true);
    setTimeout(() => setCopiedBatch(false), 2000);
  };

  // Render SVG Bell Curve Helper
  const renderBellCurve = (targetZ: number, shadedMode: "left" | "right" | "two" | "interval", z2: number = 0) => {
    const width = 500;
    const height = 150;
    const padding = 40;
    const drawWidth = width - 2 * padding;

    // Z range from -3.5 to +3.5
    const zMin = -3.5;
    const zMax = 3.5;

    const scaleX = (z: number) => {
      const clampedZ = Math.max(zMin, Math.min(zMax, Number.isFinite(z) ? z : 0));
      return padding + ((clampedZ - zMin) / (zMax - zMin)) * drawWidth;
    };

    const scaleY = (pdf: number) => {
      const maxPDF = 0.42;
      return height - 25 - (pdf / maxPDF) * (height - 40);
    };

    // Generate Curve Path deterministically
    const totalSteps = 140; // from -3.5 to +3.5 with 0.05 step
    const points: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i <= totalSteps; i++) {
      const z = Number((-3.5 + i * 0.05).toFixed(2));
      const pdf = normalPDF(z);
      const px = Number(scaleX(z).toFixed(1));
      const py = Number(scaleY(pdf).toFixed(1));
      points.push({ x: px, y: py, z });
    }

    const curvePathStr = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

    // Generate Shaded Polygon Path
    let shadedPoints: { x: number; y: number }[] = [];
    if (Number.isFinite(targetZ)) {
      if (shadedMode === "left") {
        shadedPoints = points.filter(p => p.z <= targetZ + 1e-4);
      } else if (shadedMode === "right") {
        shadedPoints = points.filter(p => p.z >= targetZ - 1e-4);
      } else if (shadedMode === "two") {
        const absZ = Math.abs(targetZ);
        shadedPoints = points.filter(p => p.z <= -absZ + 1e-4 || p.z >= absZ - 1e-4);
      } else if (shadedMode === "interval" && Number.isFinite(z2)) {
        const minZ = Math.min(targetZ, z2);
        const maxZ = Math.max(targetZ, z2);
        shadedPoints = points.filter(p => p.z >= minZ - 1e-4 && p.z <= maxZ + 1e-4);
      }
    }

    let shadePathStr = "";
    if (shadedPoints.length > 0) {
      const firstX = shadedPoints[0].x.toFixed(1);
      const lastX = shadedPoints[shadedPoints.length - 1].x.toFixed(1);
      const baselineY = (height - 25).toFixed(1);

      const pathSegs = shadedPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
      shadePathStr = `${pathSegs} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
    }

    const xPosTarget = Number(scaleX(targetZ).toFixed(1));
    const xPosTarget2 = Number(scaleX(z2).toFixed(1));

    return (
      <svg viewBox="0 0 500 150" className="w-full max-w-xl h-auto" suppressHydrationWarning>
        {/* Baseline Axis */}
        <line x1={padding} y1={height - 25} x2={width - padding} y2={height - 25} stroke="#94a3b8" strokeWidth="2" />

        {/* Shaded Area */}
        {shadePathStr && (
          <path d={shadePathStr} fill="#3b82f6" opacity="0.35" suppressHydrationWarning />
        )}

        {/* Bell Curve Line */}
        <path d={curvePathStr} fill="none" stroke="#2563eb" strokeWidth="2.5" suppressHydrationWarning />

        {/* Standard Deviation Ticks & Labels (-3, -2, -1, 0, +1, +2, +3) */}
        {[-3, -2, -1, 0, 1, 2, 3].map((tickZ) => {
          const x = scaleX(tickZ);
          return (
            <g key={tickZ}>
              <line x1={x} y1={height - 25} x2={x} y2={height - 20} stroke="#64748b" strokeWidth="1.5" />
              <text x={x} y={height - 8} textAnchor="middle" className="text-[9px] font-mono fill-slate-500 font-bold">
                {tickZ === 0 ? "μ" : `${tickZ > 0 ? "+" : ""}${tickZ}σ`}
              </text>
            </g>
          );
        })}

        {/* Primary Target Z Vertical Indicator Line */}
        {Number.isFinite(targetZ) && (
          <g>
            <line x1={xPosTarget} y1="15" x2={xPosTarget} y2={height - 25} stroke="#1d4ed8" strokeWidth="2.5" strokeDasharray="3,3" />
            <circle cx={xPosTarget} cy="15" r="4" fill="#1d4ed8" />
            <text x={xPosTarget} y="10" textAnchor="middle" className="text-[10px] font-mono font-black fill-blue-700 dark:fill-blue-400">
              Z = {targetZ.toFixed(2)}
            </text>
          </g>
        )}

        {/* Secondary Z Indicator Line for Interval Mode */}
        {shadedMode === "interval" && Number.isFinite(z2) && (
          <g>
            <line x1={xPosTarget2} y1="15" x2={xPosTarget2} y2={height - 25} stroke="#10b981" strokeWidth="2.5" strokeDasharray="3,3" />
            <circle cx={xPosTarget2} cy="15" r="4" fill="#10b981" />
            <text x={xPosTarget2} y="10" textAnchor="middle" className="text-[10px] font-mono font-black fill-emerald-600 dark:fill-emerald-400">
              Z2 = {z2.toFixed(2)}
            </text>
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* MASTER ACTION TOOLBAR */}
      {/* ========================================================================= */}
      <section className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-slate-100">
              Normal Distribution Analysis Suite
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Standard scores, critical values, interval areas &amp; batch CSV dataset analyzer
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-blue-600" />
            <span>{copiedSummary ? "Copied!" : "Copy Summary"}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLatex}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>{copiedLatex ? "Copied LaTeX!" : "Copy LaTeX"}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>{shared ? "Link Copied!" : "Share"}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadBatchCSV}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => setIsReportOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CARD 1: STANDARD Z-SCORE & PROBABILITY ENGINE (x, μ, σ) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Standard Z-Score &amp; Probability Engine (x, &mu;, &sigma;)</span>
          <button
            type="button"
            onClick={handleSaveStandard}
            disabled={!stdResult.isValid}
            className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedStandard ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* VALIDATION ALERT FOR SD <= 0 */}
          {!stdResult.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-600 dark:text-red-400 font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{stdResult.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT FORM & CONFIGURATIONS */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-blue-600" />
                <span>Input Parameters &amp; Population Scope</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Raw Score (X):
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={rawX}
                    onChange={(e) => setRawX(e.target.value === "" ? 0 : parseFloat(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isSample1 ? "Sample Mean (x̄):" : "Population Mean (μ):"}
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={mean1}
                      onChange={(e) => setMean1(e.target.value === "" ? 0 : parseFloat(e.target.value))}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {isSample1 ? "Sample SD (s):" : "Population SD (σ):"}
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={sd1}
                      onChange={(e) => setSd1(e.target.value === "" ? 0 : parseFloat(e.target.value))}
                      className={`w-full h-10 px-3 rounded-xl border font-mono font-bold text-sm ${
                        sd1 <= 0
                          ? "border-red-500 bg-red-50/50 dark:bg-red-950/20"
                          : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                      }`}
                    />
                  </div>
                </div>

                {/* SCOPE TOGGLE & PRECISION */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Scope:</span>
                    <div className="flex bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setIsSample1(false)}
                        className={`px-2 py-0.5 rounded cursor-pointer ${!isSample1 ? "bg-blue-600 text-white" : ""}`}
                      >
                        Population (μ, σ)
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsSample1(true)}
                        className={`px-2 py-0.5 rounded cursor-pointer ${isSample1 ? "bg-blue-600 text-white" : ""}`}
                      >
                        Sample (x̄, s)
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 pt-1">
                    <span>Decimals:</span>
                    <div className="flex bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold">
                      {[2, 4, 6].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPrecision1(p)}
                          className={`px-2 py-0.5 rounded cursor-pointer ${precision1 === p ? "bg-blue-600 text-white" : ""}`}
                        >
                          {p} Dec
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT DISPLAY */}
            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Calculated Z-Score
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    Percentile: {stdResult.percentileRank}
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">
                  Z = {stdResult.zScoreFormatted}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">P(Z &lt; z) Left</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{stdResult.leftTailPct}</span>
                  </div>

                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">P(Z &gt; z) Right</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{stdResult.rightTailPct}</span>
                  </div>

                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">P(-|z| &lt; Z &lt; |z|)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{stdResult.betweenPct}</span>
                  </div>

                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">P(|Z| &gt; |z|) Two-Tail</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{stdResult.twoTailsPct}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC SVG BELL CURVE & DERIVATION TAB */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                <span>Interactive Standard Normal Distribution Bell Curve Visualizer</span>
              </h4>

              <div className="flex items-center gap-1 text-xs font-bold bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTail1("left")}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTail1 === "left" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Shade Left Tail
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTail1("right")}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTail1 === "right" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Shade Right Tail
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTail1("two")}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeTail1 === "two" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Shade Two Tails
                </button>
              </div>
            </div>

            <div className="w-full flex justify-center py-2 overflow-x-auto">
              {renderBellCurve(stdResult.zScore, activeTail1)}
            </div>

            {/* STEP-BY-STEP SUBSTITUTION FORMULA */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono space-y-1">
              <span className="font-bold text-slate-500 block uppercase">Step-by-Step Substitution Formula:</span>
              <p className="text-blue-600 dark:text-blue-400 font-bold">{stdResult.stepText}</p>
            </div>
          </div>

          {/* EMBEDDED SAVED STANDARD CALCULATIONS INSIDE CARD 1 */}
          {savedStandardItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Standard Z-Score Calculations ({savedStandardItems.length})</span>
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setSavedStandardItems([]);
                    try { localStorage.removeItem("saved_z_standard"); } catch(e){}
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
                            try { localStorage.setItem("saved_z_standard", JSON.stringify(updated)); } catch(e){}
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
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
      {/* CARD 2: INVERSE Z-SCORE & CRITICAL VALUE SOLVER (Zα) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Inverse Z-Score &amp; Critical Value Solver (Z&alpha;)</span>
          <button
            type="button"
            onClick={handleSaveInverse}
            disabled={!invResult.isValid}
            className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedInverse ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {!invResult.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-600 dark:text-red-400 font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{invResult.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Inverse Parameters
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Confidence Level / Percentile / Probability:
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={invValue}
                    onChange={(e) => setInvValue(e.target.value === "" ? 0 : parseFloat(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Input Type:</label>
                    <select
                      value={invProbType}
                      onChange={(e) => setInvProbType(e.target.value as any)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-xs"
                    >
                      <option value="conf">Confidence Level (%)</option>
                      <option value="pct">Percentile Rank (%)</option>
                      <option value="prob">Probability (0 to 1)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Tail Choice:</label>
                    <select
                      value={invTailType}
                      onChange={(e) => setInvTailType(e.target.value as any)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-xs"
                    >
                      <option value="two">Two-Tails (±Z*)</option>
                      <option value="left">Left-Tailed (&lt; Z)</option>
                      <option value="right">Right-Tailed (&gt; Z)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Mean (μ):</label>
                    <input
                      type="number"
                      step="any"
                      value={invMean}
                      onChange={(e) => setInvMean(e.target.value === "" ? 0 : parseFloat(e.target.value))}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Std Dev (σ):</label>
                    <input
                      type="number"
                      step="any"
                      value={invSD}
                      onChange={(e) => setInvSD(e.target.value === "" ? 0 : parseFloat(e.target.value))}
                      className={`w-full h-9 px-2 rounded-lg border font-mono font-bold text-xs ${
                        invSD <= 0
                          ? "border-red-500 bg-red-50/50 dark:bg-red-950/20"
                          : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: INVERSE OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Critical Z-Score (Z*)
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    Z* = {invTailType === "two" ? `±${invResult.criticalZFormatted}` : invResult.criticalZFormatted}
                  </div>
                  <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    Corresponding Raw Value X = {invResult.rawValueFormatted} | Margin of Error = ±{invResult.marginOfErrorFormatted}
                  </p>
                </div>

                <div className="w-full flex justify-center py-2 overflow-x-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  {renderBellCurve(invResult.criticalZ, invTailType)}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED INVERSE CALCULATIONS INSIDE CARD 2 */}
          {savedInverseItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Inverse Z Calculations ({savedInverseItems.length})</span>
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setSavedInverseItems([]);
                    try { localStorage.removeItem("saved_z_inverse"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedInverseItems.map((item) => {
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
                            const updated = savedInverseItems.filter(i => i.id !== item.id);
                            setSavedInverseItems(updated);
                            try { localStorage.setItem("saved_z_inverse", JSON.stringify(updated)); } catch(e){}
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
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
      {/* CARD 3: INTERVAL & RANGE AREA CALCULATOR (P(z1 <= Z <= z2)) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Interval &amp; Range Area Calculator (P(z1 &le; Z &le; z2))</span>
          <button
            type="button"
            onClick={handleSaveInterval}
            disabled={!intResult.isValid}
            className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedInterval ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {!intResult.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-600 dark:text-red-400 font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{intResult.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Interval Bounds (x1, x2)
              </h3>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Lower Bound (x1):</label>
                    <input
                      type="number"
                      step="any"
                      value={intX1}
                      onChange={(e) => setIntX1(e.target.value === "" ? 0 : parseFloat(e.target.value))}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Upper Bound (x2):</label>
                    <input
                      type="number"
                      step="any"
                      value={intX2}
                      onChange={(e) => setIntX2(e.target.value === "" ? 0 : parseFloat(e.target.value))}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Mean (μ):</label>
                    <input
                      type="number"
                      step="any"
                      value={intMean}
                      onChange={(e) => setIntMean(e.target.value === "" ? 0 : parseFloat(e.target.value))}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Std Dev (σ):</label>
                    <input
                      type="number"
                      step="any"
                      value={intSD}
                      onChange={(e) => setIntSD(e.target.value === "" ? 0 : parseFloat(e.target.value))}
                      className={`w-full h-9 px-2 rounded-lg border font-mono font-bold text-xs ${
                        intSD <= 0
                          ? "border-red-500 bg-red-50/50 dark:bg-red-950/20"
                          : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: INTERVAL OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Area Between [{intResult.x1}, {intResult.x2}]
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {intResult.areaBetweenPct} ({intResult.areaBetween})
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Z1 = {intResult.z1Formatted} | Z2 = {intResult.z2Formatted} | Area Outside = {intResult.areaOutsidePct}
                  </p>
                </div>

                <div className="w-full flex justify-center py-2 overflow-x-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  {renderBellCurve(intResult.z1, "interval", intResult.z2)}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED INTERVAL CALCULATIONS INSIDE CARD 3 */}
          {savedIntervalItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Interval Calculations ({savedIntervalItems.length})</span>
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setSavedIntervalItems([]);
                    try { localStorage.removeItem("saved_z_interval"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedIntervalItems.map((item) => {
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
                            const updated = savedIntervalItems.filter(i => i.id !== item.id);
                            setSavedIntervalItems(updated);
                            try { localStorage.setItem("saved_z_interval", JSON.stringify(updated)); } catch(e){}
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
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
      {/* CARD 4: BATCH DATASET & CSV Z-SCORE ANALYZER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Batch Dataset &amp; CSV Z-Score Analyzer</span>
          <button
            type="button"
            onClick={handleSaveBatch}
            disabled={batchResult.count === 0}
            className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBatch ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {batchResult.invalidTokens && batchResult.invalidTokens.length > 0 && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-xs text-amber-700 dark:text-amber-300 font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>
                Non-numeric entries ignored: {batchResult.invalidTokens.join(", ")}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Raw Dataset Input
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Raw Numbers (Comma, space, or line separated):
                  </label>
                  <textarea
                    rows={4}
                    value={batchInput}
                    onChange={(e) => setBatchInput(e.target.value)}
                    placeholder="e.g. 65, 70, 72, 75, 80, 85, 90"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: BATCH OUTPUT TABLE */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Dataset Summary (N = {batchResult.count})
                  </span>
                  {batchResult.items.length > 0 && (
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <button
                        type="button"
                        onClick={handleCopyBatch}
                        className="px-2.5 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedBatch ? "Copied!" : "Copy"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadBatchCSV}
                        className="px-2.5 py-1 rounded bg-slate-700 text-white hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>CSV</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2 text-xs font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Mean (x̄)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{batchResult.mean}</span>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Std Dev (s)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{batchResult.sd}</span>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Variance (s²)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{batchResult.variance}</span>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Median</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{batchResult.median}</span>
                  </div>
                </div>

                {/* BATCH TABLE */}
                <div className="overflow-x-auto max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead>
                      <tr className="bg-blue-600 text-white font-bold sticky top-0">
                        <th className="p-2">#</th>
                        <th className="p-2">Raw Value (X)</th>
                        <th className="p-2">Calculated Z-Score</th>
                        <th className="p-2">Percentile Rank</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono bg-white dark:bg-slate-900">
                      {batchResult.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-2 font-bold text-slate-400">{idx + 1}</td>
                          <td className="p-2 font-bold text-slate-900 dark:text-slate-100">{item.val}</td>
                          <td className="p-2 font-bold text-blue-600 dark:text-blue-400">{item.zScoreFormatted}</td>
                          <td className="p-2 text-slate-700 dark:text-slate-300">{item.percentilePct}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED BATCH CALCULATIONS INSIDE CARD 4 */}
          {savedBatchItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Batch Dataset Calculations ({savedBatchItems.length})</span>
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setSavedBatchItems([]);
                    try { localStorage.removeItem("saved_z_batch"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedBatchItems.map((item) => {
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
                            const updated = savedBatchItems.filter(i => i.id !== item.id);
                            setSavedBatchItems(updated);
                            try { localStorage.setItem("saved_z_batch", JSON.stringify(updated)); } catch(e){}
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
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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

      {/* DEDICATED 2-PAGE EXECUTIVE PRINT MODAL */}
      <ZScoreReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        standardResult={stdResult}
        inverseResult={invResult}
        intervalResult={intResult}
        batchResult={batchResult}
      />
    </div>
  );
}

export default ZScoreCalculator;
