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
  ArrowRight,
  HelpCircle,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp
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

export interface SavedRoundingItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function RoundingCalculator() {
  // Card 1 Inputs: Place Value Rounding
  const [numInput, setNumInput] = useState<string>("12.34567");
  const [method, setMethod] = useState<RoundingMethod>("halfUp");
  const [decimals, setDecimals] = useState<number>(2);

  // Card 2 Inputs: Significant Figures
  const [sigNumInput, setSigNumInput] = useState<string>("12.34567");
  const [sigFigs, setSigFigs] = useState<number>(3);
  const [sigMethod, setSigMethod] = useState<RoundingMethod>("halfUp");

  // Card 3 Inputs: Custom Multiple / Fraction
  const [multNumInput, setMultNumInput] = useState<string>("12.34567");
  const [multMode, setMultMode] = useState<"fraction" | "multiple">("fraction");
  const [fractionDenom, setFractionDenom] = useState<number>(8);
  const [nearestMultiple, setNearestMultiple] = useState<number>(5);
  const [multMethod, setMultMethod] = useState<RoundingMethod>("halfUp");

  // Action feedback states
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedSteps, setCopiedSteps] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Saved calculation states for Card 1, 2, 3
  const [savedPlaceItems, setSavedPlaceItems] = useState<SavedRoundingItem[]>([]);
  const [justSavedPlace, setJustSavedPlace] = useState<boolean>(false);

  const [savedSigFigItems, setSavedSigFigItems] = useState<SavedRoundingItem[]>([]);
  const [justSavedSigFig, setJustSavedSigFig] = useState<boolean>(false);

  const [savedMultItems, setSavedMultItems] = useState<SavedRoundingItem[]>([]);
  const [justSavedMult, setJustSavedMult] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedPlace = localStorage.getItem("saved_rounding_place");
      if (storedPlace) setSavedPlaceItems(JSON.parse(storedPlace));

      const storedSig = localStorage.getItem("saved_rounding_sigfigs");
      if (storedSig) setSavedSigFigItems(JSON.parse(storedSig));

      const storedMult = localStorage.getItem("saved_rounding_multiple");
      if (storedMult) setSavedMultItems(JSON.parse(storedMult));
    } catch (e) {}
  }, []);

  // Card 1 Calculation
  const numVal = parseFloat(numInput) || 0;
  const placeResult = useMemo(() => roundByPlaceValue(numVal, decimals, method), [numVal, decimals, method]);
  const errorDelta = useMemo(() => computeErrorDelta(numVal, placeResult), [numVal, placeResult]);
  const explanation = useMemo(() => explainRoundingStepByStep(numVal, decimals, method), [numVal, decimals, method]);
  const numberLine = useMemo(() => generateNumberLineData(numVal, placeResult, 1), [numVal, placeResult]);

  // Card 2 Calculation
  const sigNumVal = parseFloat(sigNumInput) || 0;
  const sigFigResult = useMemo(() => roundBySigFigs(sigNumVal, sigFigs, sigMethod), [sigNumVal, sigFigs, sigMethod]);
  const sigErrorDelta = useMemo(() => computeErrorDelta(sigNumVal, sigFigResult.roundedValue), [sigNumVal, sigFigResult]);

  // Card 3 Calculation
  const multNumVal = parseFloat(multNumInput) || 0;
  const fractionResult = useMemo(() => roundToNearestFraction(multNumVal, fractionDenom, multMethod), [multNumVal, fractionDenom, multMethod]);
  const multipleResult = useMemo(() => roundToNearestMultiple(multNumVal, nearestMultiple, multMethod), [multNumVal, nearestMultiple, multMethod]);

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      navigator.clipboard.writeText(text);
      setFn(true);
      setTimeout(() => setFn(false), 2000);
    } catch (e) {}
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("n", numInput);
    params.set("m", method);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    handleCopy(shareableUrl, setCopiedUrl);
  };

  // Save Card 1 Handler
  const handleSavePlace = () => {
    const inputsStr = `Number: ${numVal}, Decimals: ${decimals}, Method: ${method}`;
    const opStr = `Place Value Rounding (${decimals} d.p.)`;
    const resList = [
      `Rounded Value = ${placeResult}`,
      `Difference (Δ) = ${errorDelta.exactDifference >= 0 ? "+" : ""}${parseFloat(errorDelta.exactDifference.toFixed(6))}`,
      `Error % = ${errorDelta.percentageError.toFixed(4)}%`,
      `Deciding Digit = ${explanation.decidingDigit}`
    ];

    const newItem: SavedRoundingItem = {
      id: Date.now().toString(),
      title: `Round (${numVal} ➔ ${placeResult})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${numVal} ➔ ${placeResult}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedPlaceItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedPlaceItems(updated);
    try {
      localStorage.setItem("saved_rounding_place", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedPlace(true);
    setTimeout(() => setJustSavedPlace(false), 2000);
  };

  // Save Card 2 Handler
  const handleSaveSigFig = () => {
    const inputsStr = `Number: ${sigNumVal}, Sig Figs: ${sigFigs}, Method: ${sigMethod}`;
    const opStr = `Significant Figures Rounding (${sigFigs} Sig Figs)`;
    const resList = [
      `Rounded Value = ${sigFigResult.roundedValue}`,
      `Scientific Notation = ${sigFigResult.scientificNotation}`,
      `Difference (Δ) = ${sigErrorDelta.exactDifference >= 0 ? "+" : ""}${parseFloat(sigErrorDelta.exactDifference.toFixed(6))}`,
      `Error % = ${sigErrorDelta.percentageError.toFixed(4)}%`
    ];

    const newItem: SavedRoundingItem = {
      id: Date.now().toString(),
      title: `SigFigs (${sigNumVal} ➔ ${sigFigResult.roundedValue})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${sigNumVal} ➔ ${sigFigResult.roundedValue}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedSigFigItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedSigFigItems(updated);
    try {
      localStorage.setItem("saved_rounding_sigfigs", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedSigFig(true);
    setTimeout(() => setJustSavedSigFig(false), 2000);
  };

  // Save Card 3 Handler
  const handleSaveMult = () => {
    const targetVal = multMode === "fraction" ? fractionResult.fractionString : multipleResult;
    const decVal = multMode === "fraction" ? fractionResult.roundedValue : multipleResult;
    const inputsStr = `Number: ${multNumVal}, Mode: ${multMode}, Setting: ${multMode === "fraction" ? `1/${fractionDenom}` : nearestMultiple}`;
    const opStr = `Fraction / Multiple Rounding`;
    const resList = [
      `Rounded Result = ${targetVal}`,
      `Decimal Value = ${decVal}`
    ];

    const newItem: SavedRoundingItem = {
      id: Date.now().toString(),
      title: `Multiple/Frac (${multNumVal} ➔ ${targetVal})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${multNumVal} ➔ ${targetVal}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedMultItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedMultItems(updated);
    try {
      localStorage.setItem("saved_rounding_multiple", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedMult(true);
    setTimeout(() => setJustSavedMult(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: DECIMAL & PLACE VALUE ROUNDING CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Decimal &amp; Place Value Rounding Calculator</span>
          <button
            type="button"
            onClick={handleSavePlace}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedPlace ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT FORM */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  <span>Input Number &amp; Place Value Parameters</span>
                </h2>
              </div>

              <div className="space-y-4">
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
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-mono font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Rounding Algorithm / Rule:
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value as RoundingMethod)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
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

                <div className="space-y-1.5">
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
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT DISPLAY */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Rounded Value ({explanation.methodName})
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    Evaluated
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight break-all">
                  {placeResult}
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Difference (Δ)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">
                      {errorDelta.exactDifference >= 0 ? "+" : ""}{parseFloat(errorDelta.exactDifference.toFixed(6))}
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Error %</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">
                      {errorDelta.percentageError.toFixed(4)}%
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Deciding Digit</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{explanation.decidingDigit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE 2D NUMBER LINE VISUALIZER */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-xs">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Interactive Number Line Snap Visualization:
            </h4>
            <div className="w-full flex items-center justify-center py-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <svg viewBox="0 0 400 80" className="w-full max-w-lg h-auto">
                <line x1="30" y1="40" x2="370" y2="40" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                <line x1="60" y1="30" x2="60" y2="50" stroke="#475569" strokeWidth="2" />
                <text x="60" y="65" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                  {numberLine.lowerBound}
                </text>

                <line x1="340" y1="30" x2="340" y2="50" stroke="#475569" strokeWidth="2" />
                <text x="340" y="65" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                  {numberLine.upperBound}
                </text>

                <circle cx="180" cy="40" r="6" fill="#3b82f6" />
                <text x="180" y="22" textAnchor="middle" className="text-[10px] font-mono font-extrabold fill-blue-600">
                  Original ({numVal})
                </text>
              </svg>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 text-center font-semibold">
              {explanation.decisionRule}
            </p>
          </div>

          {/* EMBEDDED SAVED PLACE VALUE ROUNDING INSIDE CARD 1 */}
          {savedPlaceItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Place Value Rounding ({savedPlaceItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPlaceItems([]);
                    try { localStorage.removeItem("saved_rounding_place"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedPlaceItems.map((item) => {
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
                            const updated = savedPlaceItems.filter(i => i.id !== item.id);
                            setSavedPlaceItems(updated);
                            try { localStorage.setItem("saved_rounding_place", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Operation: </span>
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
      {/* CARD 2: SIGNIFICANT FIGURES (SIG FIGS) ROUNDING CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Significant Figures (Sig Figs) Rounding Calculator</span>
          <button
            type="button"
            onClick={handleSaveSigFig}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSigFig ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Sig Figs Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Number to Round</label>
                  <input
                    type="number"
                    step="any"
                    value={sigNumInput}
                    onChange={(e) => setSigNumInput(e.target.value)}
                    placeholder="e.g. 12.34567"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Significant Figures</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={sigFigs}
                    onChange={(e) => setSigFigs(parseInt(e.target.value, 10) || 1)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Rounding Algorithm</label>
                  <select
                    value={sigMethod}
                    onChange={(e) => setSigMethod(e.target.value as RoundingMethod)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans font-bold text-xs"
                  >
                    <option value="halfUp">Round Half Up (Standard)</option>
                    <option value="halfEven">Banker's Rounding (Half to Even)</option>
                    <option value="up">Round Up (Ceiling)</option>
                    <option value="down">Round Down (Floor)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SIG FIGS OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Rounded Value ({sigFigs} Sig Figs)
                  </span>
                  <div className="text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {sigFigResult.roundedValue}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Scientific Notation</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{sigFigResult.scientificNotation}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Error %</span>
                    <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{sigErrorDelta.percentageError.toFixed(4)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED SIG FIG SOLVES INSIDE CARD 2 */}
          {savedSigFigItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Sig Fig Rounding ({savedSigFigItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSigFigItems([]);
                    try { localStorage.removeItem("saved_rounding_sigfigs"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedSigFigItems.map((item) => {
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
                            const updated = savedSigFigItems.filter(i => i.id !== item.id);
                            setSavedSigFigItems(updated);
                            try { localStorage.setItem("saved_rounding_sigfigs", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / SigFigs: </span>
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
      {/* CARD 3: CUSTOM MULTIPLE & NEAREST FRACTION ROUNDING */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Custom Multiple &amp; Nearest Fraction Rounding</span>
          <button
            type="button"
            onClick={handleSaveMult}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedMult ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Fraction / Multiple Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Number to Round</label>
                  <input
                    type="number"
                    step="any"
                    value={multNumInput}
                    onChange={(e) => setMultNumInput(e.target.value)}
                    placeholder="e.g. 12.34567"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Rounding Tool Mode</label>
                  <div className="grid grid-cols-2 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans">
                    <button
                      type="button"
                      onClick={() => setMultMode("fraction")}
                      className={`py-1.5 rounded-lg cursor-pointer ${multMode === "fraction" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      Nearest Fraction
                    </button>
                    <button
                      type="button"
                      onClick={() => setMultMode("multiple")}
                      className={`py-1.5 rounded-lg cursor-pointer ${multMode === "multiple" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      Nearest Multiple
                    </button>
                  </div>
                </div>

                {multMode === "fraction" ? (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Nearest Fractional Denominator</label>
                    <select
                      value={fractionDenom}
                      onChange={(e) => setFractionDenom(parseInt(e.target.value, 10))}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans font-bold text-xs"
                    >
                      <option value={2}>Nearest Half (1/2)</option>
                      <option value={4}>Nearest Quarter (1/4)</option>
                      <option value={8}>Nearest Eighth (1/8)</option>
                      <option value={16}>Nearest Sixteenth (1/16)</option>
                      <option value={32}>Nearest Thirty-Second (1/32)</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Nearest Custom Multiple</label>
                    <input
                      type="number"
                      step="any"
                      value={nearestMultiple}
                      onChange={(e) => setNearestMultiple(parseFloat(e.target.value) || 1)}
                      placeholder="e.g. 5, 0.05, 10"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: FRACTION / MULTIPLE OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Rounded Result ({multMode === "fraction" ? `1/${fractionDenom}` : `Multiple of ${nearestMultiple}`})
                  </span>
                  <div className="text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {multMode === "fraction" ? fractionResult.fractionString : multipleResult}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Decimal Representation</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">
                    {multMode === "fraction" ? fractionResult.roundedValue : multipleResult}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED FRACTION & MULTIPLE SOLVES INSIDE CARD 3 */}
          {savedMultItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Fraction &amp; Multiple Rounding ({savedMultItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedMultItems([]);
                    try { localStorage.removeItem("saved_rounding_multiple"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedMultItems.map((item) => {
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
                            const updated = savedMultItems.filter(i => i.id !== item.id);
                            setSavedMultItems(updated);
                            try { localStorage.setItem("saved_rounding_multiple", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Operation: </span>
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

export default RoundingCalculator;
