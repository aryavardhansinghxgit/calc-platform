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
  ArrowRight,
  HelpCircle
} from "lucide-react";
import {
  RoundingMethod,
  roundByPlaceValue,
  roundBySigFigs,
  roundToNearestFraction,
  roundToNearestMultiple,
  roundCurrencyCash,
  computeErrorDelta,
  generateNumberLineData,
  explainRoundingStepByStep
} from "@/app/calculators/rounding-calculator/rounding-logic";

export type RoundingTab = "place" | "sigfigs" | "fraction" | "multiple" | "currency" | "bulk";

export function RoundingCalculator() {
  const [numInput, setNumInput] = useState<string>("12.34567");
  const [method, setMethod] = useState<RoundingMethod>("halfUp");
  const [activeTab, setActiveTab] = useState<RoundingTab>("place");

  // Mode specific inputs
  const [decimals, setDecimals] = useState<number>(2);
  const [sigFigs, setSigFigs] = useState<number>(3);
  const [fractionDenom, setFractionDenom] = useState<number>(8);
  const [nearestMultiple, setNearestMultiple] = useState<number>(5);
  const [cashDenom, setCashDenom] = useState<number>(0.05);
  const [bulkCsvInput, setBulkCsvInput] = useState<string>("12.345\n98.765\n4.555\n-8.499");

  // Feedback states
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedSteps, setCopiedSteps] = useState<boolean>(false);
  const [copiedCsv, setCopiedCsv] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const numVal = parseFloat(numInput) || 0;

  // Calculation Results
  const placeResult = useMemo(() => roundByPlaceValue(numVal, decimals, method), [numVal, decimals, method]);
  const sigFigResult = useMemo(() => roundBySigFigs(numVal, sigFigs, method), [numVal, sigFigs, method]);
  const fractionResult = useMemo(() => roundToNearestFraction(numVal, fractionDenom, method), [numVal, fractionDenom, method]);
  const multipleResult = useMemo(() => roundToNearestMultiple(numVal, nearestMultiple, method), [numVal, nearestMultiple, method]);
  const cashResult = useMemo(() => roundCurrencyCash(numVal, cashDenom, method), [numVal, cashDenom, method]);

  // Active Rounded Value based on active tab
  const activeRoundedValue = useMemo(() => {
    switch (activeTab) {
      case "place": return placeResult;
      case "sigfigs": return sigFigResult.roundedValue;
      case "fraction": return fractionResult.roundedValue;
      case "multiple": return multipleResult;
      case "currency": return cashResult.roundedValue;
      default: return placeResult;
    }
  }, [activeTab, placeResult, sigFigResult, fractionResult, multipleResult, cashResult]);

  const errorDelta = useMemo(() => computeErrorDelta(numVal, activeRoundedValue), [numVal, activeRoundedValue]);
  const explanation = useMemo(() => explainRoundingStepByStep(numVal, decimals, method), [numVal, decimals, method]);
  const numberLine = useMemo(() => generateNumberLineData(numVal, activeRoundedValue, 1), [numVal, activeRoundedValue]);

  // Bulk CSV Output
  const bulkOutputLines = useMemo(() => {
    const lines = bulkCsvInput.split(/\r?\n/);
    return lines.map((line) => {
      const v = parseFloat(line.trim());
      if (Number.isNaN(v)) return line;
      return roundByPlaceValue(v, decimals, method).toString();
    });
  }, [bulkCsvInput, decimals, method]);

  // Presets
  const presets = [
    { label: "12.34567", value: "12.34567" },
    { label: "π (3.14159)", value: "3.14159265" },
    { label: "-8.5", value: "-8.5" },
    { label: "$19.98", value: "19.98" },
    { label: "1,234,567", value: "1234567" }
  ];

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("n", numInput);
    params.set("m", method);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    handleCopy(shareableUrl, setCopiedUrl);
  };

  return (
    <div className="space-y-6">
      {/* INPUT & HERO RESULT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* LEFT CARD: INPUT FORM & METHOD SELECTOR */}
        <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-600" />
              <span>Input Number & Rounding Algorithm</span>
            </h2>
            <button
              type="button"
              onClick={() => {
                setNumInput("12.34567");
                setMethod("halfUp");
                setDecimals(2);
              }}
              className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Number Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Number to Round (Decimal, Integer, or Fraction):
              </label>
              <input
                type="number"
                step="any"
                value={numInput}
                onChange={(e) => setNumInput(e.target.value)}
                placeholder="e.g. 12.34567 or -8.5"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-base font-mono font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
              />
            </div>

            {/* Rounding Algorithm Selector Dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Rounding Algorithm / Rule:
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as RoundingMethod)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
              >
                <option value="halfUp">Round Half Up (Standard Arithmetic / School)</option>
                <option value="halfDown">Round Half Down</option>
                <option value="halfEven">Banker's Rounding (Round Half to Even / IEEE 754)</option>
                <option value="halfOdd">Round Half to Odd</option>
                <option value="up">Round Up (Ceiling ⌈x⌉)</option>
                <option value="down">Round Down (Floor ⌊x⌋)</option>
                <option value="towardZero">Round Toward Zero (Truncate / Chop)</option>
                <option value="awayFromZero">Round Away from Zero</option>
              </select>
            </div>

            {/* Mode Specific Controls */}
            {activeTab === "place" && (
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Target Decimal Places / Place Value:
                </label>
                <select
                  value={decimals}
                  onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-slate-100 outline-none"
                >
                  <option value={2}>Hundredths (0.01 / 2 decimal places)</option>
                  <option value={1}>Tenths (0.1 / 1 decimal place)</option>
                  <option value={0}>Ones / Whole Number (1)</option>
                  <option value={3}>Thousandths (0.001 / 3 d.p.)</option>
                  <option value={4}>Ten-Thousandths (0.0001 / 4 d.p.)</option>
                  <option value={-1}>Tens (10)</option>
                  <option value={-2}>Hundreds (100)</option>
                  <option value={-3}>Thousands (1,000)</option>
                  <option value={-6}>Millions (1,000,000)</option>
                </select>
              </div>
            )}

            {activeTab === "sigfigs" && (
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Significant Figures (Sig Figs):
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={sigFigs}
                  onChange={(e) => setSigFigs(parseInt(e.target.value, 10) || 1)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                />
              </div>
            )}

            {activeTab === "fraction" && (
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nearest Fractional Denominator:
                </label>
                <select
                  value={fractionDenom}
                  onChange={(e) => setFractionDenom(parseInt(e.target.value, 10))}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option value={2}>Nearest Half (1/2)</option>
                  <option value={4}>Nearest Quarter (1/4)</option>
                  <option value={8}>Nearest Eighth (1/8)</option>
                  <option value={16}>Nearest Sixteenth (1/16)</option>
                  <option value={32}>Nearest Thirty-Second (1/32)</option>
                </select>
              </div>
            )}

            {activeTab === "multiple" && (
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nearest Custom Multiple:
                </label>
                <input
                  type="number"
                  step="any"
                  value={nearestMultiple}
                  onChange={(e) => setNearestMultiple(parseFloat(e.target.value) || 1)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                />
              </div>
            )}

            {/* QUICK PRESET CHIPS */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Quick Input Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setNumInput(preset.value)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      numInput === preset.value
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500"
                    }`}
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
              <span>Rounded Output Dashboard</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              Instant
            </span>
          </div>

          {/* MAIN HERO NUMERIC RESULT */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Rounded Value ({explanation.methodName}):
            </span>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight break-all">
              {activeTab === "fraction" ? fractionResult.fractionString : activeRoundedValue}
            </div>
            {activeTab === "sigfigs" && (
              <p className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 pt-1">
                Scientific Notation: {sigFigResult.scientificNotation}
              </p>
            )}
          </div>

          {/* ERROR DELTA & METRICS GRID */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-blue-200/80 dark:border-slate-800">
            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Difference (Δ)</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">
                {errorDelta.exactDifference >= 0 ? "+" : ""}{parseFloat(errorDelta.exactDifference.toFixed(6))}
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Error %</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">
                {errorDelta.percentageError.toFixed(4)}%
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Deciding Digit</span>
              <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                {explanation.decidingDigit}
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleCopy(activeRoundedValue.toString(), setCopiedResult)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedResult ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedResult ? "Copied!" : "Copy Value"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(`${explanation.decisionRule} Original: ${numVal} -> Rounded: ${activeRoundedValue}`, setCopiedSteps)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedSteps ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <BookOpen className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedSteps ? "Copied!" : "Copy Steps"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(bulkOutputLines.join("\n"), setCopiedCsv)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedCsv ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedCsv ? "Copied!" : "Copy CSV"}</span>
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

      {/* MULTI-MODE TABS & INTERACTIVE NUMBER LINE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Calculation Mode & Number Line Visualizer</span>
          </h3>

          {/* TAB BUTTONS */}
          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab("place")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "place"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Place Value</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("sigfigs")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "sigfigs"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span>Sig Figs</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("fraction")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "fraction"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Split className="h-3.5 w-3.5" />
              <span>Nearest Fraction</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("multiple")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "multiple"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Nearest Multiple</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("bulk")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "bulk"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <ListOrdered className="h-3.5 w-3.5" />
              <span>Bulk Column (CSV)</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE 2D NUMBER LINE VISUALIZER */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Interactive Number Line Snap Visualization:
          </h4>
          <div className="w-full flex items-center justify-center py-4">
            <svg viewBox="0 0 400 80" className="w-full max-w-lg h-auto">
              {/* Main Line */}
              <line x1="30" y1="40" x2="370" y2="40" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />

              {/* Lower Bound Ticks */}
              <line x1="60" y1="30" x2="60" y2="50" stroke="#475569" strokeWidth="2" />
              <text x="60" y="65" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                {numberLine.lowerBound}
              </text>

              {/* Upper Bound Ticks */}
              <line x1="340" y1="30" x2="340" y2="50" stroke="#475569" strokeWidth="2" />
              <text x="340" y="65" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                {numberLine.upperBound}
              </text>

              {/* Original Point Marker */}
              <circle cx="180" cy="40" r="6" fill="#3b82f6" />
              <text x="180" y="22" textAnchor="middle" className="text-[10px] font-mono font-extrabold fill-blue-600">
                Original ({numVal})
              </text>

              {/* Directional Snap Arrow */}
              {numberLine.direction === "up" && (
                <path d="M 190 40 L 330 40" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 2" markerEnd="url(#arrow)" />
              )}
            </svg>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
            {explanation.decisionRule}
          </p>
        </div>

        {/* BULK CSV MODE TAB CONTENT */}
        {activeTab === "bulk" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Bulk Multi-Number Column Rounding:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Input Column / CSV Numbers:</label>
                <textarea
                  rows={6}
                  value={bulkCsvInput}
                  onChange={(e) => setBulkCsvInput(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 rounded-xl p-3 text-xs font-mono font-bold outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Rounded Output Column:</label>
                <textarea
                  rows={6}
                  readOnly
                  value={bulkOutputLines.join("\n")}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 rounded-xl p-3 text-xs font-mono font-bold outline-none text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
