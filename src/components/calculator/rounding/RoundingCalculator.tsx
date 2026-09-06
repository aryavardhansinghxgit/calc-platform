"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Sliders,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  RotateCcw,
  Download,
  FileText,
  DollarSign,
  Grid,
  Sparkles,
  ArrowRight,
  Info,
  Layers,
  AlertCircle
} from "lucide-react";
import {
  RoundingMethod,
  roundExactDecimal,
  roundBySigFigs,
  roundToNearestFraction,
  roundToNearestMultiple,
  roundCurrencyCash,
  computeErrorDelta,
  generateNumberLineData,
  explainRoundingStepByStep,
  parseNumberInput,
  parseAndRoundBulkCSV,
  generateRFC4180CSV
} from "@/app/calculators/rounding-calculator/rounding-logic";

export interface SavedRoundingItem {
  id: string;
  title: string;
  category: "place" | "sigfig" | "multiple" | "cash";
  rawInputs: {
    number: string;
    decimals?: number;
    method: RoundingMethod;
    sigFigs?: number;
    mode?: "fraction" | "multiple";
    fractionDenom?: number;
    nearestMultiple?: number;
    cashDenom?: number;
  };
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function RoundingCalculator() {
  // ===========================================================================
  // STATE MANAGEMENT
  // ===========================================================================

  // Card 1: Decimal & Place Value
  const [numInput, setNumInput] = useState<string>("12.34567");
  const [method, setMethod] = useState<RoundingMethod>("halfUp");
  const [decimals, setDecimals] = useState<number>(2);

  // Card 2: Significant Figures
  const [sigNumInput, setSigNumInput] = useState<string>("12.34567");
  const [sigFigs, setSigFigs] = useState<number>(3);
  const [sigMethod, setSigMethod] = useState<RoundingMethod>("halfUp");

  // Card 3: Custom Multiple / Fraction
  const [multNumInput, setMultNumInput] = useState<string>("12.34567");
  const [multMode, setMultMode] = useState<"fraction" | "multiple">("fraction");
  const [fractionDenom, setFractionDenom] = useState<number>(8);
  const [nearestMultiple, setNearestMultiple] = useState<number>(5);
  const [multMethod, setMultMethod] = useState<RoundingMethod>("halfUp");

  // Card 4: Swedish Cash Rounding
  const [cashInput, setCashInput] = useState<string>("14.83");
  const [cashDenom, setCashDenom] = useState<number>(0.05);
  const [cashMethod, setCashMethod] = useState<RoundingMethod>("halfUp");

  // Card 5: Bulk Column CSV Rounding
  const [csvInput, setCsvInput] = useState<string>(
    "Item,Unit Price,Quantity,Tax Rate\nLaptop,1249.995,3,0.0825\nDesk Chair,149.494,12,0.0825\nMonitor,299.999,6,0.0825\nUSB Cable,12.3456,25,0.05"
  );
  const [csvDelimiter, setCsvDelimiter] = useState<string>(",");
  const [csvHasHeader, setCsvHasHeader] = useState<boolean>(true);
  const [csvDecimals, setCsvDecimals] = useState<number>(2);
  const [csvMethod, setCsvMethod] = useState<RoundingMethod>("halfUp");

  // Active Copy / Feedback Indicators
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Saved Calculations
  const [savedItems, setSavedItems] = useState<SavedRoundingItem[]>([]);
  const [justSavedCard, setJustSavedCard] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  // Restore feedback banner
  const [restoredMsg, setRestoredMsg] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_rounding_suite_items");
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const triggerCopy = (key: string, text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {}
  };

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const persistSavedItems = (items: SavedRoundingItem[]) => {
    setSavedItems(items);
    try {
      localStorage.setItem("saved_rounding_suite_items", JSON.stringify(items));
    } catch (e) {}
  };

  const clearAllSaved = () => {
    persistSavedItems([]);
  };

  const deleteSavedItem = (id: string) => {
    persistSavedItems(savedItems.filter(item => item.id !== id));
  };

  // Restore saved calculation into active controls
  const handleRestore = (item: SavedRoundingItem) => {
    if (item.category === "place") {
      setNumInput(item.rawInputs.number);
      if (item.rawInputs.decimals !== undefined) setDecimals(item.rawInputs.decimals);
      setMethod(item.rawInputs.method);
      setRestoredMsg(`Loaded Place Value calculation: ${item.rawInputs.number}`);
    } else if (item.category === "sigfig") {
      setSigNumInput(item.rawInputs.number);
      if (item.rawInputs.sigFigs !== undefined) setSigFigs(item.rawInputs.sigFigs);
      setSigMethod(item.rawInputs.method);
      setRestoredMsg(`Loaded Significant Figures calculation: ${item.rawInputs.number}`);
    } else if (item.category === "multiple") {
      setMultNumInput(item.rawInputs.number);
      if (item.rawInputs.mode) setMultMode(item.rawInputs.mode);
      if (item.rawInputs.fractionDenom !== undefined) setFractionDenom(item.rawInputs.fractionDenom);
      if (item.rawInputs.nearestMultiple !== undefined) setNearestMultiple(item.rawInputs.nearestMultiple);
      setMultMethod(item.rawInputs.method);
      setRestoredMsg(`Loaded Fraction/Multiple calculation: ${item.rawInputs.number}`);
    } else if (item.category === "cash") {
      setCashInput(item.rawInputs.number);
      if (item.rawInputs.cashDenom !== undefined) setCashDenom(item.rawInputs.cashDenom);
      setCashMethod(item.rawInputs.method);
      setRestoredMsg(`Loaded Swedish Cash calculation: ${item.rawInputs.number}`);
    }
    setTimeout(() => setRestoredMsg(null), 3000);
  };

  // ===========================================================================
  // COMPUTED CALCULATIONS
  // ===========================================================================

  // Card 1 Calculations
  const parsedPlaceInput = useMemo(() => parseNumberInput(numInput), [numInput]);
  const placeResult = useMemo(() => roundExactDecimal(numInput, decimals, method), [numInput, decimals, method]);
  const explanation = useMemo(() => explainRoundingStepByStep(numInput, decimals, method), [numInput, decimals, method]);
  const numberLine = useMemo(
    () => generateNumberLineData(parsedPlaceInput.value, placeResult.numericValue, decimals),
    [parsedPlaceInput.value, placeResult.numericValue, decimals]
  );

  // Card 2 Calculations
  const parsedSigInput = useMemo(() => parseNumberInput(sigNumInput), [sigNumInput]);
  const sigFigResult = useMemo(() => roundBySigFigs(sigNumInput, sigFigs, sigMethod), [sigNumInput, sigFigs, sigMethod]);
  const sigErrorDelta = useMemo(
    () => computeErrorDelta(parsedSigInput.value, sigFigResult.roundedValue),
    [parsedSigInput.value, sigFigResult.roundedValue]
  );

  // Card 3 Calculations
  const parsedMultInput = useMemo(() => parseNumberInput(multNumInput), [multNumInput]);
  const fractionResult = useMemo(
    () => roundToNearestFraction(multNumInput, fractionDenom, multMethod),
    [multNumInput, fractionDenom, multMethod]
  );
  const multipleResult = useMemo(
    () => roundToNearestMultiple(multNumInput, nearestMultiple, multMethod),
    [multNumInput, nearestMultiple, multMethod]
  );

  // Card 4 Calculations
  const parsedCashInput = useMemo(() => parseNumberInput(cashInput), [cashInput]);
  const cashResult = useMemo(
    () => roundCurrencyCash(cashInput, cashDenom, cashMethod),
    [cashInput, cashDenom, cashMethod]
  );

  // Card 5 Calculations
  const bulkResult = useMemo(
    () => parseAndRoundBulkCSV(csvInput, csvDecimals, csvMethod, csvDelimiter, csvHasHeader),
    [csvInput, csvDecimals, csvMethod, csvDelimiter, csvHasHeader]
  );

  // ===========================================================================
  // SAVE HANDLERS
  // ===========================================================================

  const savePlaceCalculation = () => {
    const inputsStr = `Number: ${numInput}, Decimals: ${decimals}, Method: ${method}`;
    const opStr = `Place Value Rounding (${decimals} d.p.)`;
    const resList = [
      `Rounded Value = ${placeResult.formattedString}`,
      `Difference (Δ) = ${placeResult.exactDifference >= 0 ? "+" : ""}${parseFloat(placeResult.exactDifference.toFixed(6))}`,
      `Error % = ${placeResult.percentageError.toFixed(4)}%`,
      `Target Digit = ${placeResult.targetDigit}`,
      `Deciding Digit = ${placeResult.decidingDigit}`
    ];

    const newItem: SavedRoundingItem = {
      id: Date.now().toString(),
      title: `Round (${numInput} ➔ ${placeResult.formattedString})`,
      category: "place",
      rawInputs: {
        number: numInput,
        decimals,
        method
      },
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${numInput} ➔ ${placeResult.formattedString}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    persistSavedItems([newItem, ...savedItems.filter(item => item.inputs !== inputsStr)].slice(0, 20));
    setJustSavedCard("place");
    setTimeout(() => setJustSavedCard(null), 2000);
  };

  const saveSigFigCalculation = () => {
    const inputsStr = `Number: ${sigNumInput}, Sig Figs: ${sigFigs}, Method: ${sigMethod}`;
    const opStr = `Significant Figures (${sigFigs} Sig Figs)`;
    const resList = [
      `Rounded Value = ${sigFigResult.formattedString}`,
      `Scientific Notation = ${sigFigResult.scientificNotation}`,
      `Difference (Δ) = ${sigErrorDelta.exactDifference >= 0 ? "+" : ""}${parseFloat(sigErrorDelta.exactDifference.toFixed(6))}`,
      `Error % = ${sigErrorDelta.percentageError.toFixed(4)}%`
    ];

    const newItem: SavedRoundingItem = {
      id: Date.now().toString(),
      title: `SigFigs (${sigNumInput} ➔ ${sigFigResult.formattedString})`,
      category: "sigfig",
      rawInputs: {
        number: sigNumInput,
        sigFigs,
        method: sigMethod
      },
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${sigNumInput} ➔ ${sigFigResult.formattedString}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    persistSavedItems([newItem, ...savedItems.filter(item => item.inputs !== inputsStr)].slice(0, 20));
    setJustSavedCard("sigfig");
    setTimeout(() => setJustSavedCard(null), 2000);
  };

  const saveMultCalculation = () => {
    const targetVal = multMode === "fraction" ? fractionResult.fractionString : multipleResult.formattedString;
    const decVal = multMode === "fraction" ? fractionResult.roundedValue : multipleResult.roundedValue;
    const inputsStr = `Number: ${multNumInput}, Mode: ${multMode}, Denom/Mult: ${multMode === "fraction" ? `1/${fractionDenom}` : nearestMultiple}`;
    const opStr = `Fraction/Multiple Rounding`;
    const resList = [
      `Rounded Result = ${targetVal}`,
      `Decimal Value = ${decVal}`
    ];

    const newItem: SavedRoundingItem = {
      id: Date.now().toString(),
      title: `Multiple/Frac (${multNumInput} ➔ ${targetVal})`,
      category: "multiple",
      rawInputs: {
        number: multNumInput,
        mode: multMode,
        fractionDenom,
        nearestMultiple,
        method: multMethod
      },
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${multNumInput} ➔ ${targetVal}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    persistSavedItems([newItem, ...savedItems.filter(item => item.inputs !== inputsStr)].slice(0, 20));
    setJustSavedCard("multiple");
    setTimeout(() => setJustSavedCard(null), 2000);
  };

  const saveCashCalculation = () => {
    const inputsStr = `Amount: ${cashInput}, Coin Increment: $${cashDenom.toFixed(2)}, Method: ${cashMethod}`;
    const opStr = `Swedish Cash Rounding`;
    const resList = [
      `Payable Cash = ${cashResult.formattedPayable}`,
      `Rounding Adjustment = ${cashResult.difference >= 0 ? "+" : ""}$${cashResult.difference.toFixed(2)}`,
      `Customer Impact = ${cashResult.explanation}`
    ];

    const newItem: SavedRoundingItem = {
      id: Date.now().toString(),
      title: `Cash (${cashResult.formattedOriginal} ➔ ${cashResult.formattedPayable})`,
      category: "cash",
      rawInputs: {
        number: cashInput,
        cashDenom,
        method: cashMethod
      },
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${cashResult.formattedOriginal} ➔ ${cashResult.formattedPayable}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    persistSavedItems([newItem, ...savedItems.filter(item => item.inputs !== inputsStr)].slice(0, 20));
    setJustSavedCard("cash");
    setTimeout(() => setJustSavedCard(null), 2000);
  };

  // CSV Export for Bulk Processor
  const downloadBulkCSV = () => {
    const dataRows = bulkResult.rows.map(r => r.roundedValues);
    const csvContent = generateRFC4180CSV(bulkResult.headers, dataRows);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rounded_data_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // CSV Export for Saved History
  const downloadSavedHistoryCSV = () => {
    const headers = ["ID", "Title", "Category", "Inputs", "Operation", "Result", "Timestamp"];
    const rows = savedItems.map(item => [
      item.id,
      item.title,
      item.category,
      item.inputs,
      item.operation,
      item.result,
      item.timestamp
    ]);
    const csvContent = generateRFC4180CSV(headers, rows);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rounding_history_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Number line SVG marker coordinates
  const svgLineStart = 50;
  const svgLineEnd = 350;
  const svgTrackWidth = svgLineEnd - svgLineStart;
  const origMarkerX = svgLineStart + numberLine.originalProgress * svgTrackWidth;
  const roundMarkerX = svgLineStart + numberLine.roundedProgress * svgTrackWidth;
  const midpointMarkerX = svgLineStart + 0.5 * svgTrackWidth;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* RESTORE NOTIFICATION BANNER */}
      {restoredMsg && (
        <div className="bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-white" />
            <span>{restoredMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setRestoredMsg(null)}
            className="text-white/80 hover:text-white text-xs font-bold px-2 py-0.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CARD 1: DECIMAL & PLACE VALUE ROUNDING CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            <span>Decimal &amp; Place Value Rounding Calculator</span>
          </span>
          <div className="flex items-center gap-2 no-print">
            <button
              type="button"
              onClick={savePlaceCalculation}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              title="Save this place value calculation"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedCard === "place" ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT FORM */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-blue-600" />
                <span>Input Number &amp; Place Value Parameters</span>
              </h2>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="place-input-number"
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Number to Round (Decimal, Integer, or Fraction):
                  </label>
                  <input
                    id="place-input-number"
                    type="text"
                    inputMode="decimal"
                    value={numInput}
                    onChange={(e) => setNumInput(e.target.value)}
                    placeholder="e.g. 12.34567, 12 3/8, or 25/2"
                    className={`w-full bg-white dark:bg-slate-900 border ${
                      parsedPlaceInput.isValid ? "border-slate-300 dark:border-slate-700" : "border-red-500"
                    } rounded-xl px-4 py-2 text-sm font-mono font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 outline-none`}
                  />
                  {!parsedPlaceInput.isValid && (
                    <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{parsedPlaceInput.errorMessage}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="place-rounding-algorithm"
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Rounding Algorithm / Rule:
                  </label>
                  <select
                    id="place-rounding-algorithm"
                    value={method}
                    onChange={(e) => setMethod(e.target.value as RoundingMethod)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                  >
                    <option value="halfUp">Round Half Up (Standard Arithmetic / School)</option>
                    <option value="halfDown">Round Half Down</option>
                    <option value="halfEven">Banker&apos;s Rounding (Round Half to Even / IEEE 754)</option>
                    <option value="halfOdd">Round Half to Odd</option>
                    <option value="up">Round Up (Ceiling ⌈x⌉)</option>
                    <option value="down">Round Down (Floor ⌊x⌋)</option>
                    <option value="towardZero">Round Toward Zero (Truncate / Chop)</option>
                    <option value="awayFromZero">Round Away from Zero</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="place-target-precision"
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Target Decimal Places / Place Value:
                  </label>
                  <select
                    id="place-target-precision"
                    value={decimals}
                    onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-slate-100 outline-none cursor-pointer"
                  >
                    <option value={2}>Hundredths (0.01 / 2 decimal places)</option>
                    <option value={1}>Tenths (0.1 / 1 decimal place)</option>
                    <option value={0}>Ones / Whole Number (1)</option>
                    <option value={3}>Thousandths (0.001 / 3 decimal places)</option>
                    <option value={4}>Ten-Thousandths (0.0001 / 4 decimal places)</option>
                    <option value={5}>Hundred-Thousandths (0.00001 / 5 d.p.)</option>
                    <option value={6}>Millionths (0.000001 / 6 d.p.)</option>
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

                <div
                  aria-live="polite"
                  className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight break-all"
                >
                  {placeResult.formattedString}
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Difference (Δ)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">
                      {placeResult.exactDifference >= 0 ? "+" : ""}
                      {parseFloat(placeResult.exactDifference.toFixed(6))}
                    </span>
                  </div>

                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Error %</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">
                      {placeResult.percentageError.toFixed(4)}%
                    </span>
                  </div>

                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Deciding Digit</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">
                      {placeResult.decidingDigit}
                      {placeResult.isExactMidpoint ? " (Tie)" : ""}
                    </span>
                  </div>
                </div>

                {/* USER-FACING COPY CONTROLS */}
                <div className="pt-2 flex flex-wrap items-center gap-2 no-print border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => triggerCopy("card1-res", placeResult.formattedString)}
                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "card1-res" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === "card1-res" ? "Copied!" : "Copy Result"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      triggerCopy(
                        "card1-sum",
                        `${numInput} rounded to ${explanation.placeName} using ${explanation.methodName} = ${placeResult.formattedString} (Difference: ${
                          placeResult.exactDifference >= 0 ? "+" : ""
                        }${parseFloat(placeResult.exactDifference.toFixed(6))})`
                      )
                    }
                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "card1-sum" ? <Check className="w-3 h-3 text-emerald-600" /> : <FileText className="w-3 h-3" />}
                    <span>{copiedKey === "card1-sum" ? "Copied!" : "Copy Summary"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerCopy("card1-latex", explanation.latexFormula)}
                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "card1-latex" ? <Check className="w-3 h-3 text-emerald-600" /> : <Sparkles className="w-3 h-3" />}
                    <span>{copiedKey === "card1-latex" ? "Copied!" : "Copy LaTeX"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC 2D NUMBER LINE SNAP VISUALIZER */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Interactive Number Line Snap Visualization:
              </h4>
              <span className="text-[11px] font-mono text-slate-500">
                Precision Interval: [{numberLine.lowerBoundStr} ➔ {numberLine.upperBoundStr}]
              </span>
            </div>

            <div className="w-full flex items-center justify-center py-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <svg viewBox="0 0 400 90" className="w-full max-w-xl h-auto">
                {/* Main Axis Track */}
                <line x1={svgLineStart} y1="45" x2={svgLineEnd} y2="45" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />

                {/* Lower Bound Tick */}
                <line x1={svgLineStart} y1="35" x2={svgLineStart} y2="55" stroke="#475569" strokeWidth="2.5" />
                <text x={svgLineStart} y="72" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                  {numberLine.lowerBoundStr}
                </text>

                {/* Midpoint Tick (Tie-Breaker Threshold) */}
                <line x1={midpointMarkerX} y1="38" x2={midpointMarkerX} y2="52" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2 2" />
                <text x={midpointMarkerX} y="72" textAnchor="middle" className="text-[8px] font-mono fill-slate-400 dark:fill-slate-500">
                  {numberLine.midpointStr} (Mid)
                </text>

                {/* Upper Bound Tick */}
                <line x1={svgLineEnd} y1="35" x2={svgLineEnd} y2="55" stroke="#475569" strokeWidth="2.5" />
                <text x={svgLineEnd} y="72" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
                  {numberLine.upperBoundStr}
                </text>

                {/* Snap Transition Connecting Line / Arrow */}
                {Math.abs(origMarkerX - roundMarkerX) > 1 && (
                  <line
                    x1={origMarkerX}
                    y1="45"
                    x2={roundMarkerX}
                    y2="45"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="4 2"
                  />
                )}

                {/* Original Point Marker */}
                <circle cx={origMarkerX} cy="45" r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
                <text x={origMarkerX} y="22" textAnchor="middle" className="text-[9px] font-mono font-extrabold fill-blue-600 dark:fill-blue-400">
                  Original ({parsedPlaceInput.normalizedStr})
                </text>

                {/* Rounded Destination Snap Marker */}
                <circle cx={roundMarkerX} cy="45" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <text x={roundMarkerX} y="33" textAnchor="middle" className="text-[8px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">
                  ▲ Rounded
                </text>
              </svg>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 text-center font-semibold">
              {explanation.decisionRule}
            </p>
          </div>

          {/* EMBEDDED SAVED PLACE VALUE ROUNDING */}
          {savedItems.filter(i => i.category === "place").length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Place Value Calculations ({savedItems.filter(i => i.category === "place").length})</span>
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={downloadSavedHistoryCSV}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </button>
                  <button
                    type="button"
                    onClick={clearAllSaved}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedItems.filter(i => i.category === "place").map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleRestore(item)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors cursor-pointer"
                            title="Restore / Load inputs into calculator"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteSavedItem(item.id)}
                            className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
                              Calculated Answers:
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
            onClick={saveSigFigCalculation}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer no-print"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCard === "sigfig" ? "Saved!" : "Save"}</span>
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
                  <label htmlFor="sigfig-input-number" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Number to Round
                  </label>
                  <input
                    id="sigfig-input-number"
                    type="text"
                    inputMode="decimal"
                    value={sigNumInput}
                    onChange={(e) => setSigNumInput(e.target.value)}
                    placeholder="e.g. 12.34567, 0.009995, 12345.67"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="sigfig-target-count" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Target Significant Figures
                  </label>
                  <input
                    id="sigfig-target-count"
                    type="number"
                    min="1"
                    max="10"
                    value={sigFigs}
                    onChange={(e) => setSigFigs(parseInt(e.target.value, 10) || 1)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="sigfig-algorithm" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Rounding Algorithm
                  </label>
                  <select
                    id="sigfig-algorithm"
                    value={sigMethod}
                    onChange={(e) => setSigMethod(e.target.value as RoundingMethod)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans font-bold text-xs cursor-pointer"
                  >
                    <option value="halfUp">Round Half Up (Standard)</option>
                    <option value="halfEven">Banker&apos;s Rounding (Half to Even)</option>
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
                  <div
                    aria-live="polite"
                    className="text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all"
                  >
                    {sigFigResult.formattedString}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Scientific Notation</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{sigFigResult.scientificNotation}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Error %</span>
                    <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">
                      {sigErrorDelta.percentageError.toFixed(4)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 no-print">
                  <button
                    type="button"
                    onClick={() => triggerCopy("card2-res", sigFigResult.formattedString)}
                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "card2-res" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === "card2-res" ? "Copied!" : "Copy Value"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerCopy("card2-sci", sigFigResult.scientificNotation)}
                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "card2-sci" ? <Check className="w-3 h-3 text-emerald-600" /> : <Sparkles className="w-3 h-3" />}
                    <span>{copiedKey === "card2-sci" ? "Copied!" : "Copy Scientific"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
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
            onClick={saveMultCalculation}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer no-print"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCard === "multiple" ? "Saved!" : "Save"}</span>
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
                  <label htmlFor="mult-input-number" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Number to Round
                  </label>
                  <input
                    id="mult-input-number"
                    type="text"
                    inputMode="decimal"
                    value={multNumInput}
                    onChange={(e) => setMultNumInput(e.target.value)}
                    placeholder="e.g. 12.34567, 12.5, 0.375"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Rounding Tool Mode
                  </span>
                  <div className="grid grid-cols-2 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans">
                    <button
                      type="button"
                      onClick={() => setMultMode("fraction")}
                      className={`py-1.5 rounded-lg cursor-pointer ${
                        multMode === "fraction" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Nearest Fraction
                    </button>
                    <button
                      type="button"
                      onClick={() => setMultMode("multiple")}
                      className={`py-1.5 rounded-lg cursor-pointer ${
                        multMode === "multiple" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Nearest Multiple
                    </button>
                  </div>
                </div>

                {multMode === "fraction" ? (
                  <div>
                    <label htmlFor="fraction-denominator-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Nearest Fractional Denominator
                    </label>
                    <select
                      id="fraction-denominator-select"
                      value={fractionDenom}
                      onChange={(e) => setFractionDenom(parseInt(e.target.value, 10))}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans font-bold text-xs cursor-pointer"
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
                    <label htmlFor="custom-multiple-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Nearest Custom Multiple
                    </label>
                    <input
                      id="custom-multiple-input"
                      type="number"
                      step="any"
                      value={nearestMultiple}
                      onChange={(e) => setNearestMultiple(parseFloat(e.target.value) || 1)}
                      placeholder="e.g. 5, 0.05, 10, 25"
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
                    Rounded Result ({multMode === "fraction" ? `Reduced 1/${fractionDenom}` : `Multiple of ${nearestMultiple}`})
                  </span>
                  <div
                    aria-live="polite"
                    className="text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all"
                  >
                    {multMode === "fraction" ? fractionResult.fractionString : multipleResult.formattedString}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Decimal Representation</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">
                    {multMode === "fraction" ? fractionResult.roundedValue : multipleResult.roundedValue}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 no-print">
                  <button
                    type="button"
                    onClick={() =>
                      triggerCopy(
                        "card3-res",
                        multMode === "fraction" ? fractionResult.fractionString : multipleResult.formattedString
                      )
                    }
                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "card3-res" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === "card3-res" ? "Copied!" : "Copy Result"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: SWEDISH CASH ROUNDING MODULE (NEW) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Swedish Cash Rounding Calculator (Commercial / Cash Register)</span>
          </span>
          <button
            type="button"
            onClick={saveCashCalculation}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer no-print"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCard === "cash" ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Cash Transaction Parameters
              </h2>

              <div className="space-y-3">
                <div>
                  <label htmlFor="cash-input-amount" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Exact Bill Total ($)
                  </label>
                  <input
                    id="cash-input-amount"
                    type="text"
                    inputMode="decimal"
                    value={cashInput}
                    onChange={(e) => setCashInput(e.target.value)}
                    placeholder="e.g. 14.83, 29.99"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="cash-denomination-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Cash Rounding Increment (Smallest Coin in Circulation)
                  </label>
                  <select
                    id="cash-denomination-select"
                    value={cashDenom}
                    onChange={(e) => setCashDenom(parseFloat(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans font-bold text-xs cursor-pointer"
                  >
                    <option value={0.05}>$0.05 (Nickel / 5 Cents - Canada, Australia, NZ)</option>
                    <option value={0.1}>$0.10 (Dime / 10 Cents - Sweden 10-Öre Standard)</option>
                    <option value={0.25}>$0.25 (Quarter / 25 Cents)</option>
                    <option value={1.0}>$1.00 (Whole Dollar / 1-Krona Standard)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cash-algorithm-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Tie-Breaker Method
                  </label>
                  <select
                    id="cash-algorithm-select"
                    value={cashMethod}
                    onChange={(e) => setCashMethod(e.target.value as RoundingMethod)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans font-bold text-xs cursor-pointer"
                  >
                    <option value="halfUp">Round Half Up (Standard Cash Register)</option>
                    <option value="halfEven">Banker&apos;s Rounding (Half to Even)</option>
                    <option value="halfDown">Round Half Down</option>
                  </select>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CASH OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Cash Payable Amount (Rounded to Nearest ${cashDenom.toFixed(2)})
                  </span>
                  <div
                    aria-live="polite"
                    className="text-4xl font-sans tabular-nums font-black text-slate-900 dark:text-slate-100 break-all"
                  >
                    {cashResult.formattedPayable}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Original Amount</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{cashResult.formattedOriginal}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Cash Adjustment</span>
                    <span
                      className={`font-mono ${
                        cashResult.difference > 0
                          ? "text-amber-600 dark:text-amber-400"
                          : cashResult.difference < 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-500"
                      }`}
                    >
                      {cashResult.difference >= 0 ? "+" : ""}
                      ${cashResult.difference.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-xs text-blue-900 dark:text-blue-200 font-medium">
                  <p>
                    <strong>Policy Note:</strong> {cashResult.explanation} Cash rounding applies only to physical cash
                    settlement at point of sale when physical 1-cent coins are phased out. Credit/debit and electronic
                    payments remain charged at the exact cent total.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 no-print">
                  <button
                    type="button"
                    onClick={() => triggerCopy("card4-res", cashResult.formattedPayable)}
                    className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "card4-res" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === "card4-res" ? "Copied!" : "Copy Payable"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: BULK COLUMN CSV ROUNDING PROCESSOR (NEW) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Grid className="w-3.5 h-3.5" />
            <span>Bulk Column CSV Rounding &amp; RFC-4180 Exporter</span>
          </span>
          <div className="flex items-center gap-2 no-print">
            <button
              type="button"
              onClick={downloadBulkCSV}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3 text-white" />
              <span>Download Rounded CSV</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: CSV INPUT TEXTAREA & SETTINGS */}
            <div className="md:col-span-6 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Paste Multiline / CSV Data
                </h2>
                <span className="text-[11px] text-slate-500 font-mono">
                  {bulkResult.totalRows} Rows | {bulkResult.numericCount} Numbers Rounded
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <textarea
                    id="bulk-csv-textarea"
                    rows={6}
                    value={csvInput}
                    onChange={(e) => setCsvInput(e.target.value)}
                    placeholder="Item, Price, Quantity..."
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono text-xs focus:ring-2 focus:ring-blue-600 outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold">
                  <div>
                    <label htmlFor="csv-delimiter-select" className="text-slate-700 dark:text-slate-300 block mb-1">
                      Delimiter
                    </label>
                    <select
                      id="csv-delimiter-select"
                      value={csvDelimiter}
                      onChange={(e) => setCsvDelimiter(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                    >
                      <option value=",">Comma (,)</option>
                      <option value="&#9;">Tab (\t)</option>
                      <option value=";">Semicolon (;)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="csv-precision-select" className="text-slate-700 dark:text-slate-300 block mb-1">
                      Precision
                    </label>
                    <select
                      id="csv-precision-select"
                      value={csvDecimals}
                      onChange={(e) => setCsvDecimals(parseInt(e.target.value, 10))}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                    >
                      <option value={2}>2 Decimals (0.01)</option>
                      <option value={1}>1 Decimal (0.1)</option>
                      <option value={0}>Whole (1)</option>
                      <option value={3}>3 Decimals (0.001)</option>
                      <option value={-1}>Tens (10)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="csv-method-select" className="text-slate-700 dark:text-slate-300 block mb-1">
                      Algorithm
                    </label>
                    <select
                      id="csv-method-select"
                      value={csvMethod}
                      onChange={(e) => setCsvMethod(e.target.value as RoundingMethod)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                    >
                      <option value="halfUp">Half Up</option>
                      <option value="halfEven">Banker&apos;s</option>
                      <option value="up">Ceil</option>
                      <option value="down">Floor</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="csv-has-header-checkbox"
                    type="checkbox"
                    checked={csvHasHeader}
                    onChange={(e) => setCsvHasHeader(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="csv-has-header-checkbox" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                    First row contains column headers
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE TABLE PREVIEW */}
            <div className="md:col-span-6 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Processed Table Preview
                  </span>
                  <button
                    type="button"
                    onClick={downloadBulkCSV}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer no-print"
                  >
                    <Download className="w-3.5 h-3.5" /> Download CSV
                  </button>
                </div>

                <div className="overflow-x-auto max-h-56 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <table className="w-full text-left text-xs font-mono">
                    {bulkResult.headers.length > 0 && (
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold sticky top-0">
                        <tr>
                          <th className="p-2 border-b border-slate-200 dark:border-slate-700">#</th>
                          {bulkResult.headers.map((h, i) => (
                            <th key={i} className="p-2 border-b border-slate-200 dark:border-slate-700">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                    )}
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {bulkResult.rows.slice(0, 10).map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-2 text-slate-400">{row.rowNumber}</td>
                          {row.roundedValues.map((val, cIdx) => (
                            <td key={cIdx} className="p-2 text-slate-900 dark:text-slate-100 font-bold">
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoundingCalculator;
