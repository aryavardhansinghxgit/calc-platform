"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Copy, Check, Sparkles, HelpCircle, RefreshCw, BarChart2, Eye, Sliders, Bookmark, Trash2, ChevronDown, ChevronUp } from "lucide-react";

type BidirectionalTarget = "y" | "x" | "b";

export interface SavedLogItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

function parseLogInput(valStr: string): number {
  if (!valStr) return NaN;
  const trimmed = valStr.trim().toLowerCase();
  if (trimmed === "e") return Math.E;
  if (trimmed === "pi" || trimmed === "π") return Math.PI;
  if (trimmed.includes("/")) {
    const parts = trimmed.split("/");
    if (parts.length === 2) {
      const num = parseLogInput(parts[0]);
      const den = parseLogInput(parts[1]);
      if (!isNaN(num) && !isNaN(den) && den !== 0) return num / den;
    }
  }
  return parseFloat(trimmed);
}

export function LogCalculator() {
  // Card 1: General Log Inputs
  const [baseStr, setBaseStr] = useState<string>("10");
  const [xStr, setXStr] = useState<string>("100");

  // Card 2: Antilog Inputs
  const [antilogBaseStr, setAntilogBaseStr] = useState<string>("10");
  const [exponentYStr, setExponentYStr] = useState<string>("2");

  // Card 3: Bidirectional Inputs
  const [bTarget, setBTarget] = useState<BidirectionalTarget>("y");
  const [bBase, setBBase] = useState<string>("2");
  const [bArgX, setBArgX] = useState<string>("64");
  const [bLogY, setBLogY] = useState<string>("6");

  // Interactive Graph Base Slider
  const [graphBase, setGraphBase] = useState<number>(2);

  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);

  // Saved calculation states for Card 1, Card 2, Card 3
  const [savedLogItems, setSavedLogItems] = useState<SavedLogItem[]>([]);
  const [justSavedLog, setJustSavedLog] = useState<boolean>(false);

  const [savedAntilogItems, setSavedAntilogItems] = useState<SavedLogItem[]>([]);
  const [justSavedAntilog, setJustSavedAntilog] = useState<boolean>(false);

  const [savedBidirItems, setSavedBidirItems] = useState<SavedLogItem[]>([]);
  const [justSavedBidir, setJustSavedBidir] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedLog = localStorage.getItem("saved_log_calculations");
      if (storedLog) setSavedLogItems(JSON.parse(storedLog));

      const storedAnti = localStorage.getItem("saved_antilog_calculations");
      if (storedAnti) setSavedAntilogItems(JSON.parse(storedAnti));

      const storedBi = localStorage.getItem("saved_log_bidirectional");
      if (storedBi) setSavedBidirItems(JSON.parse(storedBi));
    } catch (e) {}
  }, []);

  // Card 1 Calculation: General Logarithm log_b(x)
  const genCalc = useMemo(() => {
    const b = parseLogInput(baseStr);
    const x = parseLogInput(xStr);

    const steps: string[] = [];

    if (isNaN(b) || isNaN(x)) {
      return { error: "Please enter valid numeric values for Base (b) and Argument (x)." };
    }
    if (x <= 0) {
      return { error: "Logarithm argument x must be strictly positive (x > 0)." };
    }
    if (b <= 0) {
      return { error: "Logarithm base b must be strictly positive (b > 0)." };
    }
    if (Math.abs(b - 1) < 0.0000001) {
      return { error: "Logarithm base b cannot equal 1 (b ≠ 1), because 1^y = 1 for all y." };
    }

    const lnX = Math.log(x);
    const lnB = Math.log(b);
    const resY = lnX / lnB;

    const log10X = Math.log10(x);
    const log10B = Math.log10(b);
    const log2X = Math.log2(x);

    steps.push(`Logarithmic Identity: log_b(x) = y  ⇔  b^y = x`);
    steps.push(`Change of Base Formula: log_${baseStr}(${x}) = ln(${x}) / ln(${baseStr})`);
    steps.push(`1. Calculate Natural Log of Argument: ln(${x}) = ${lnX.toFixed(8)}`);
    steps.push(`2. Calculate Natural Log of Base: ln(${baseStr}) = ${lnB.toFixed(8)}`);
    steps.push(`3. Divide Ratios: ${lnX.toFixed(8)} / ${lnB.toFixed(8)} = ${resY.toFixed(10)}`);
    steps.push(`Exponential Form Verification: (${baseStr})^(${resY.toFixed(6)}) = ${Math.pow(b, resY).toFixed(6)}`);

    return {
      resY,
      formatted: resY.toFixed(10),
      scientific: resY.toExponential(6),
      lnX,
      lnB,
      log10X,
      log2X,
      latex: `\\log_{${baseStr}}(${x}) = \\frac{\\ln(${x})}{\\ln(${baseStr})} = ${resY.toFixed(6)}`,
      steps,
      error: null
    };
  }, [baseStr, xStr]);

  // Card 2 Calculation: Antilogarithm b^y
  const antiCalc = useMemo(() => {
    const bAnti = parseLogInput(antilogBaseStr);
    const yAnti = parseLogInput(exponentYStr);

    const steps: string[] = [];

    if (isNaN(bAnti) || isNaN(yAnti) || bAnti <= 0) {
      return { error: "Antilog base b must be positive (b > 0)." };
    }

    const resX = Math.pow(bAnti, yAnti);

    steps.push(`Antilogarithm Definition: x = antilog_b(y) = b^y`);
    steps.push(`1. Base b = ${bAnti}, Exponent y = ${yAnti}`);
    steps.push(`2. Evaluate Exponential Power: (${bAnti})^(${yAnti}) = ${resX}`);
    steps.push(`Logarithmic Equivalence: log_${bAnti}(${resX}) = ${yAnti}`);

    return {
      resX,
      formatted: resX.toString(),
      scientific: resX.toExponential(6),
      latex: `\\text{antilog}_{${antilogBaseStr}}(${yAnti}) = ${antilogBaseStr}^{${yAnti}} = ${resX}`,
      steps,
      error: null
    };
  }, [antilogBaseStr, exponentYStr]);

  // Card 3 Calculation: 3-Variable Solver
  const bidirCalc = useMemo(() => {
    const bVal = parseLogInput(bBase);
    const xVal = parseLogInput(bArgX);
    const yVal = parseLogInput(bLogY);

    const steps: string[] = [];

    if (bTarget === "y") {
      if (isNaN(bVal) || isNaN(xVal) || xVal <= 0 || bVal <= 0 || bVal === 1) {
        return { error: "Please enter valid b > 0 (b ≠ 1) and x > 0." };
      }
      const yCalc = Math.log(xVal) / Math.log(bVal);
      steps.push(`Solve for y = log_b(x): log_${bVal}(${xVal}) = ${yCalc.toFixed(6)}`);
      return {
        resY: yCalc,
        formatted: yCalc.toFixed(8),
        latex: `y = \\log_{${bBase}}(${bArgX}) = ${yCalc.toFixed(6)}`,
        steps,
        error: null
      };
    } else if (bTarget === "x") {
      if (isNaN(bVal) || isNaN(yVal) || bVal <= 0) {
        return { error: "Please enter valid base b > 0 and exponent y." };
      }
      const xCalc = Math.pow(bVal, yVal);
      steps.push(`Solve for x = b^y: (${bVal})^(${yVal}) = ${xCalc}`);
      return {
        resY: xCalc,
        formatted: xCalc.toString(),
        latex: `x = ${bBase}^{${bLogY}} = ${xCalc}`,
        steps,
        error: null
      };
    } else {
      if (isNaN(xVal) || isNaN(yVal) || xVal <= 0 || yVal === 0) {
        return { error: "Please enter valid x > 0 and non-zero y." };
      }
      const bCalc = Math.pow(xVal, 1 / yVal);
      steps.push(`Solve for base b = x^(1/y): (${xVal})^(1/${yVal}) = ${bCalc.toFixed(6)}`);
      return {
        resY: bCalc,
        formatted: bCalc.toFixed(8),
        latex: `b = \\sqrt[${bLogY}]{${bArgX}} = ${bCalc.toFixed(6)}`,
        steps,
        error: null
      };
    }
  }, [bTarget, bBase, bArgX, bLogY]);

  // Card 1 Save Handler
  const handleSaveLog = () => {
    if (genCalc.error || genCalc.resY === undefined) return;

    const inputsStr = `Base (b): ${baseStr}, Argument (x): ${xStr}`;
    const opStr = `Logarithm Calculation (log_${baseStr}(${xStr}))`;
    const resList = [
      `Evaluated Log = ${genCalc.resY.toFixed(10)}`,
      `Natural Log (ln x) = ${genCalc.lnX?.toFixed(6)}`,
      `Common Log (log₁₀ x) = ${genCalc.log10X?.toFixed(6)}`,
      `Binary Log (log₂ x) = ${genCalc.log2X?.toFixed(6)}`
    ];

    const newItem: SavedLogItem = {
      id: Date.now().toString(),
      title: `Logarithm log_${baseStr}(${xStr})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `log_${baseStr}(${xStr}) = ${genCalc.resY.toFixed(6)}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedLogItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedLogItems(updated);
    try {
      localStorage.setItem("saved_log_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedLog(true);
    setTimeout(() => setJustSavedLog(false), 2000);
  };

  // Card 2 Save Handler
  const handleSaveAntilog = () => {
    if (antiCalc.error || antiCalc.resX === undefined) return;

    const inputsStr = `Antilog Base (b): ${antilogBaseStr}, Exponent (y): ${exponentYStr}`;
    const opStr = `Antilogarithm Calculation (antilog_${antilogBaseStr}(${exponentYStr}) = ${antilogBaseStr}^${exponentYStr})`;
    const resList = [
      `Evaluated Result = ${antiCalc.resX}`,
      `Scientific Notation = ${antiCalc.scientific}`
    ];

    const newItem: SavedLogItem = {
      id: Date.now().toString(),
      title: `Antilog (${antilogBaseStr}^${exponentYStr})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${antilogBaseStr}^${exponentYStr} = ${antiCalc.resX}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedAntilogItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedAntilogItems(updated);
    try {
      localStorage.setItem("saved_antilog_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedAntilog(true);
    setTimeout(() => setJustSavedAntilog(false), 2000);
  };

  // Card 3 Save Handler
  const handleSaveBidir = () => {
    if (bidirCalc.error || !bidirCalc.formatted) return;

    const inputsStr = `Target: ${bTarget}, Base (b): ${bBase}, Argument (x): ${bArgX}, Exponent (y): ${bLogY}`;
    const opStr = `3-Variable Log Solve (${bBase}^${bLogY} = ${bArgX})`;
    const resList = [
      `Solved Target (${bTarget}) = ${bidirCalc.formatted}`
    ];

    const newItem: SavedLogItem = {
      id: Date.now().toString(),
      title: `Log Equation Solve (${bTarget})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `b^y = x`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedBidirItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedBidirItems(updated);
    try {
      localStorage.setItem("saved_log_bidirectional", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedBidir(true);
    setTimeout(() => setJustSavedBidir(false), 2000);
  };

  // SVG Logarithmic Curve Visualizer
  const svgChart = useMemo(() => {
    const width = 450;
    const height = 240;
    const padding = 40;

    const b = graphBase > 0 && graphBase !== 1 ? graphBase : 2;

    const minX = 0.1;
    const maxX = 10;
    const minY = -3;
    const maxY = 3;

    const toSvgX = (x: number) => parseFloat((padding + ((x - minX) / (maxX - minX)) * (width - padding * 2)).toFixed(2));
    const toSvgY = (y: number) => parseFloat((padding + ((maxY - y) / (maxY - minY)) * (height - padding * 2)).toFixed(2));

    const points: [number, number][] = [];
    for (let i = 0; i <= 80; i++) {
      const xVal = minX + (i / 80) * (maxX - minX);
      const yVal = Math.log(xVal) / Math.log(b);
      if (yVal >= minY && yVal <= maxY) {
        points.push([toSvgX(xVal), toSvgY(yVal)]);
      }
    }
    const pathD = points.reduce((acc, curr, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${curr[0].toFixed(2)} ${curr[1].toFixed(2)}`, "");

    const pointsLn: [number, number][] = [];
    for (let i = 0; i <= 80; i++) {
      const xVal = minX + (i / 80) * (maxX - minX);
      const yVal = Math.log(xVal);
      if (yVal >= minY && yVal <= maxY) {
        pointsLn.push([toSvgX(xVal), toSvgY(yVal)]);
      }
    }
    const pathLnD = pointsLn.reduce((acc, curr, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${curr[0].toFixed(2)} ${curr[1].toFixed(2)}`, "");

    const p1 = [toSvgX(1), toSvgY(0)];
    const pB = b <= maxX ? [toSvgX(b), toSvgY(1)] : null;
    const zeroX = toSvgX(0.1);
    const zeroY = toSvgY(0);

    return (
      <svg suppressHydrationWarning viewBox={`0 0 ${width} ${height}`} className="w-full h-auto text-xs font-sans tabular-nums">
        <line suppressHydrationWarning x1={padding} y1={zeroY} x2={width - padding} y2={zeroY} stroke="currentColor" strokeOpacity={0.25} strokeWidth={1.5} />
        <line suppressHydrationWarning x1={zeroX} y1={padding} x2={zeroX} y2={height - padding} stroke="#ef4444" strokeDasharray="3 3" strokeWidth={1.5} />

        <path suppressHydrationWarning d={pathLnD} fill="none" stroke="currentColor" strokeOpacity={0.25} strokeWidth={1.5} />

        <path suppressHydrationWarning d={pathD} fill="none" stroke="#2563eb" strokeWidth={2.5} className="dark:stroke-blue-400" />

        <circle cx={p1[0]} cy={p1[1]} r={4} fill="#10b981" />
        <text x={p1[0] + 6} y={p1[1] - 6} className="fill-emerald-600 dark:fill-emerald-400 font-bold text-[10px]">
          (1, 0)
        </text>

        {pB && (
          <g>
            <circle cx={pB[0]} cy={pB[1]} r={4} fill="#2563eb" />
            <text x={pB[0] + 6} y={pB[1] - 6} className="fill-blue-600 dark:fill-blue-400 font-bold text-[10px]">
              ({b.toFixed(1)}, 1)
            </text>
          </g>
        )}
      </svg>
    );
  }, [graphBase]);

  const handleCopyText = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedLatex(true);
      setTimeout(() => setCopiedLatex(false), 2000);
    } catch (e) {}
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: LOGARITHM CALCULATOR & MULTI-BASE CONVERTER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Logarithm Calculator &amp; Multi-Base Converter (log_b x)</span>
          <button
            type="button"
            onClick={handleSaveLog}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedLog ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT CONTROLS */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Logarithm Inputs
                </h2>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Logarithm Base (b) [b &gt; 0, b ≠ 1]
                  </label>
                  <input
                    type="text"
                    value={baseStr}
                    onChange={(e) => setBaseStr(e.target.value)}
                    placeholder="e.g. 10, e, 2"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Number / Argument (x) [x &gt; 0]
                  </label>
                  <input
                    type="text"
                    value={xStr}
                    onChange={(e) => setXStr(e.target.value)}
                    placeholder="e.g. 100, 2.71828, 1/2"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT CARD & GRAPH */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
                {/* HERO RESULT CARD */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Evaluated Result
                    </span>
                    <button
                      type="button"
                      onClick={() => genCalc.latex && handleCopyText(genCalc.latex)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                    >
                      {copiedLatex ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                      <span>{copiedLatex ? "LaTeX Copied!" : "Copy LaTeX"}</span>
                    </button>
                  </div>

                  {genCalc.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {genCalc.error}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
                        {genCalc.formatted}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold pt-1">
                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">Natural Log (ln x)</span>
                          <span className="font-sans tabular-nums">{genCalc.lnX?.toFixed(6)}</span>
                        </div>
                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">Common Log (log₁₀ x)</span>
                          <span className="font-sans tabular-nums">{genCalc.log10X?.toFixed(6)}</span>
                        </div>
                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl col-span-2 sm:col-span-1">
                          <span className="text-[10px] text-slate-400 block uppercase">Binary Log (log₂ x)</span>
                          <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{genCalc.log2X?.toFixed(6)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* INTERACTIVE 2D GRAPH VISUALIZER */}
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> Logarithmic Curve f(x) = log_b(x)
                    </span>

                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span className="text-slate-500">Base Slider:</span>
                      <input
                        type="range"
                        min={0.5}
                        max={10}
                        step={0.5}
                        value={graphBase}
                        onChange={(e) => setGraphBase(parseFloat(e.target.value))}
                        className="w-24 accent-blue-600 cursor-pointer"
                      />
                      <span className="font-sans tabular-nums text-blue-600">{graphBase}</span>
                    </div>
                  </div>
                  {svgChart}
                </div>

                {/* STEP-BY-STEP BREAKDOWN */}
                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Step-by-Step Mathematical Derivation
                  </h3>

                  {!genCalc.error && genCalc.steps && (
                    <div className="space-y-2 text-xs font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                      {genCalc.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                          <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">{idx + 1}.</span>
                          <span className="font-sans tabular-nums">{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED LOG CALCULATIONS INSIDE CARD 1 */}
          {savedLogItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Log Calculations ({savedLogItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedLogItems([]);
                    try { localStorage.removeItem("saved_log_calculations"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedLogItems.map((item) => {
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
                            const updated = savedLogItems.filter(i => i.id !== item.id);
                            setSavedLogItems(updated);
                            try { localStorage.setItem("saved_log_calculations", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Expression: </span>
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
      {/* CARD 2: ANTILOGARITHM & EXPONENTIAL POWER SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Antilogarithm &amp; Exponential Solver (antilog_b y = bʸ)</span>
          <button
            type="button"
            onClick={handleSaveAntilog}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedAntilog ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Antilog Inputs
              </h2>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Antilog Base (b)
                </label>
                <input
                  type="text"
                  value={antilogBaseStr}
                  onChange={(e) => setAntilogBaseStr(e.target.value)}
                  placeholder="e.g. 10, e, 2"
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Exponent / Logarithm Value (y)
                </label>
                <input
                  type="text"
                  value={exponentYStr}
                  onChange={(e) => setExponentYStr(e.target.value)}
                  placeholder="e.g. 2, -3"
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: LIVE ANTILOG OUTPUT MATRIX */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Evaluated Antilog / Exponential Result
                  </span>
                  {antiCalc.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {antiCalc.error}
                    </div>
                  ) : (
                    <div className="text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                      {antiCalc.formatted}
                    </div>
                  )}
                </div>

                {!antiCalc.error && (
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Scientific Notation</span>
                    <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{antiCalc.scientific}</span>
                  </div>
                )}

                {/* STEP-BY-STEP DERIVATION */}
                {antiCalc.steps && antiCalc.steps.length > 0 && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block text-[10px]">
                      Step-by-Step Antilog Derivation
                    </span>
                    <div className="space-y-1 font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      {antiCalc.steps.map((step, idx) => (
                        <div key={idx} className="p-1.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED ANTILOG CALCULATIONS INSIDE CARD 2 */}
          {savedAntilogItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Antilog Calculations ({savedAntilogItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedAntilogItems([]);
                    try { localStorage.removeItem("saved_antilog_calculations"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedAntilogItems.map((item) => {
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
                            const updated = savedAntilogItems.filter(i => i.id !== item.id);
                            setSavedAntilogItems(updated);
                            try { localStorage.setItem("saved_antilog_calculations", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Expression: </span>
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
      {/* CARD 3: 3-VARIABLE LOGARITHM SOLVER (bʸ = x) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>3-Variable Logarithm Equation Solver (bʸ = x)</span>
          <button
            type="button"
            onClick={handleSaveBidir}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBidir ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Variable Inputs
              </h2>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Select Target Variable to Solve (b^y = x)
                </label>
                <div className="grid grid-cols-3 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans tabular-nums">
                  <button
                    onClick={() => setBTarget("y")}
                    className={`py-1.5 rounded-lg cursor-pointer ${bTarget === "y" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    Log y
                  </button>
                  <button
                    onClick={() => setBTarget("x")}
                    className={`py-1.5 rounded-lg cursor-pointer ${bTarget === "x" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    Arg x
                  </button>
                  <button
                    onClick={() => setBTarget("b")}
                    className={`py-1.5 rounded-lg cursor-pointer ${bTarget === "b" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    Base b
                  </button>
                </div>
              </div>

              {bTarget !== "b" && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Base (b)</label>
                  <input
                    type="text"
                    value={bBase}
                    onChange={(e) => setBBase(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
              )}

              {bTarget !== "x" && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Argument (x)</label>
                  <input
                    type="text"
                    value={bArgX}
                    onChange={(e) => setBArgX(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
              )}

              {bTarget !== "y" && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Logarithm Value (y)</label>
                  <input
                    type="text"
                    value={bLogY}
                    onChange={(e) => setBLogY(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: LIVE SOLVED OUTPUT & STEPS */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Solved Target Variable ({bTarget})
                  </span>
                  {bidirCalc.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {bidirCalc.error}
                    </div>
                  ) : (
                    <div className="text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                      {bidirCalc.formatted}
                    </div>
                  )}
                </div>

                {bidirCalc.steps && bidirCalc.steps.length > 0 && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block text-[10px]">
                      Step-by-Step Equation Solution
                    </span>
                    <div className="space-y-1 font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      {bidirCalc.steps.map((step, idx) => (
                        <div key={idx} className="p-1.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED 3-VARIABLE SOLVES INSIDE CARD 3 */}
          {savedBidirItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved 3-Variable Solves ({savedBidirItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedBidirItems([]);
                    try { localStorage.removeItem("saved_log_bidirectional"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedBidirItems.map((item) => {
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
                            const updated = savedBidirItems.filter(i => i.id !== item.id);
                            setSavedBidirItems(updated);
                            try { localStorage.setItem("saved_log_bidirectional", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Target: </span>
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
                              Complete Solved Result:
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

export default LogCalculator;
