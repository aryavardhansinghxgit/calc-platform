"use client";

import React, { useState, useMemo } from "react";
import { Copy, Check, Sparkles, HelpCircle, RefreshCw, BarChart2, Eye, Sliders } from "lucide-react";

type CalcMode = "general" | "antilog" | "bidirectional" | "laws";
type BidirectionalTarget = "y" | "x" | "b";

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
  const [calcMode, setCalcMode] = useState<CalcMode>("general");
  const [bTarget, setBTarget] = useState<BidirectionalTarget>("y");

  // General Log Inputs
  const [baseStr, setBaseStr] = useState<string>("10");
  const [xStr, setXStr] = useState<string>("100");

  // Antilog Inputs
  const [antilogBaseStr, setAntilogBaseStr] = useState<string>("10");
  const [exponentYStr, setExponentYStr] = useState<string>("2");

  // Bidirectional Inputs
  const [bBase, setBBase] = useState<string>("2");
  const [bArgX, setBArgX] = useState<string>("64");
  const [bLogY, setBLogY] = useState<string>("6");

  // Laws Expander Inputs
  const [termA, setTermA] = useState<string>("x");
  const [termB, setTermB] = useState<string>("y");
  const [termC, setTermC] = useState<string>("z");

  // Interactive Graph Base Slider
  const [graphBase, setGraphBase] = useState<number>(2);

  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);

  // Quick Preset Helper
  const applyPreset = (preset: "common" | "natural" | "binary" | "decibel" | "ph") => {
    setCalcMode("general");
    if (preset === "common") {
      setBaseStr("10");
      setXStr("1000");
    } else if (preset === "natural") {
      setBaseStr("e");
      setXStr("2.718281828459");
    } else if (preset === "binary") {
      setBaseStr("2");
      setXStr("1024");
    } else if (preset === "decibel") {
      setBaseStr("10");
      setXStr("100"); // 20 dB gain
    } else if (preset === "ph") {
      setBaseStr("10");
      setXStr("0.001"); // pH 3
    }
  };

  // Main Calculation Engine
  const calculation = useMemo(() => {
    const b = parseLogInput(baseStr);
    const x = parseLogInput(xStr);

    const steps: string[] = [];

    if (calcMode === "general") {
      // Validate Domain: x > 0, b > 0, b != 1
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

      // log_b(x) = ln(x) / ln(b)
      const lnX = Math.log(x);
      const lnB = Math.log(b);
      const resY = lnX / lnB;

      const log10X = Math.log10(x);
      const log10B = Math.log10(b);
      const log2X = Math.log2(x);

      steps.push(`Logarithmic Identity: log_b(x) = y  ⇔  b^y = x`);
      steps.push(`Change of Base Formula: log_${b === Math.E ? "e" : b}(${x}) = ln(${x}) / ln(${b === Math.E ? "e" : b})`);
      steps.push(`1. Calculate Natural Log of Argument: ln(${x}) = ${lnX.toFixed(8)}`);
      steps.push(`2. Calculate Natural Log of Base: ln(${b === Math.E ? "e" : b}) = ${lnB.toFixed(8)}`);
      steps.push(`3. Divide Ratios: ${lnX.toFixed(8)} / ${lnB.toFixed(8)} = ${resY.toFixed(10)}`);
      steps.push(`Exponential Form Verification: (${b === Math.E ? "2.71828..." : b})^(${resY.toFixed(6)}) = ${Math.pow(b, resY).toFixed(6)}`);

      return {
        resY,
        formatted: resY.toFixed(10),
        scientific: resY.toExponential(6),
        lnX,
        lnB,
        log10X,
        log2X,
        latex: `\\log_{${baseStr}}(${x}) = \\frac{\\ln(${x})}{\\ln(${baseStr})} = ${resY.toFixed(6)}`,
        steps
      };

    } else if (calcMode === "antilog") {
      const bAnti = parseLogInput(antilogBaseStr);
      const yAnti = parseLogInput(exponentYStr);

      if (isNaN(bAnti) || isNaN(yAnti) || bAnti <= 0) {
        return { error: "Antilog base b must be positive (b > 0)." };
      }

      const resX = Math.pow(bAnti, yAnti);

      steps.push(`Antilogarithm Definition: x = antilog_b(y) = b^y`);
      steps.push(`1. Base b = ${bAnti}, Exponent y = ${yAnti}`);
      steps.push(`2. Evaluate Exponential Power: (${bAnti})^(${yAnti}) = ${resX}`);
      steps.push(`Logarithmic Equivalence: log_${bAnti}(${resX}) = ${yAnti}`);

      return {
        resY: resX,
        formatted: resX.toString(),
        scientific: resX.toExponential(6),
        latex: `\\text{antilog}_{${antilogBaseStr}}(${yAnti}) = ${antilogBaseStr}^{${yAnti}} = ${resX}`,
        steps
      };

    } else if (calcMode === "bidirectional") {
      const bVal = parseLogInput(bBase);
      const xVal = parseLogInput(bArgX);
      const yVal = parseLogInput(bLogY);

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
          steps
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
          steps
        };
      } else {
        // solve for base b = x^(1/y)
        if (isNaN(xVal) || isNaN(yVal) || xVal <= 0 || yVal === 0) {
          return { error: "Please enter valid x > 0 and non-zero y." };
        }
        const bCalc = Math.pow(xVal, 1 / yVal);
        steps.push(`Solve for base b = x^(1/y): (${xVal})^(1/${yVal}) = ${bCalc.toFixed(6)}`);
        return {
          resY: bCalc,
          formatted: bCalc.toFixed(8),
          latex: `b = \\sqrt[${bLogY}]{${bArgX}} = ${bCalc.toFixed(6)}`,
          steps
        };
      }
    } else {
      // LAWS & LAWS EXPANDER DISPLAY
      steps.push(`1. Product Rule: log_b(x · y) = log_b(x) + log_b(y)`);
      steps.push(`2. Quotient Rule: log_b(x / y) = log_b(x) - log_b(y)`);
      steps.push(`3. Power Rule: log_b(x^k) = k · log_b(x)`);
      steps.push(`4. Combined Expansion: log_b(${termA} · ${termB} / ${termC}³) = log_b(${termA}) + log_b(${termB}) - 3·log_b(${termC})`);

      return {
        resY: 0,
        formatted: `log_b(${termA}) + log_b(${termB}) - 3·log_b(${termC})`,
        latex: `\\log_b\\left(\\frac{${termA} \\cdot ${termB}}{${termC}^3}\\right) = \\log_b(${termA}) + \\log_b(${termB}) - 3\\log_b(${termC})`,
        steps
      };
    }
  }, [calcMode, baseStr, xStr, antilogBaseStr, exponentYStr, bTarget, bBase, bArgX, bLogY, termA, termB, termC]);

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

    // Current Log Curve Points: f(x) = log_b(x)
    const points: [number, number][] = [];
    for (let i = 0; i <= 80; i++) {
      const xVal = minX + (i / 80) * (maxX - minX);
      const yVal = Math.log(xVal) / Math.log(b);
      if (yVal >= minY && yVal <= maxY) {
        points.push([toSvgX(xVal), toSvgY(yVal)]);
      }
    }
    const pathD = points.reduce((acc, curr, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${curr[0].toFixed(2)} ${curr[1].toFixed(2)}`, "");

    // Overlay Curve 1: Natural Log ln(x)
    const pointsLn: [number, number][] = [];
    for (let i = 0; i <= 80; i++) {
      const xVal = minX + (i / 80) * (maxX - minX);
      const yVal = Math.log(xVal);
      if (yVal >= minY && yVal <= maxY) {
        pointsLn.push([toSvgX(xVal), toSvgY(yVal)]);
      }
    }
    const pathLnD = pointsLn.reduce((acc, curr, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${curr[0].toFixed(2)} ${curr[1].toFixed(2)}`, "");

    // Key points: (1, 0) and (b, 1)
    const p1 = [toSvgX(1), toSvgY(0)];
    const pB = b <= maxX ? [toSvgX(b), toSvgY(1)] : null;
    const zeroX = toSvgX(0.1);
    const zeroY = toSvgY(0);

    return (
      <svg suppressHydrationWarning viewBox={`0 0 ${width} ${height}`} className="w-full h-auto text-xs font-sans tabular-nums">
        {/* Axes */}
        <line suppressHydrationWarning x1={padding} y1={zeroY} x2={width - padding} y2={zeroY} stroke="currentColor" strokeOpacity={0.25} strokeWidth={1.5} />
        <line suppressHydrationWarning x1={zeroX} y1={padding} x2={zeroX} y2={height - padding} stroke="#ef4444" strokeDasharray="3 3" strokeWidth={1.5} />

        {/* Natural Log Overlay Curve (Gray) */}
        <path suppressHydrationWarning d={pathLnD} fill="none" stroke="currentColor" strokeOpacity={0.25} strokeWidth={1.5} />

        {/* Current Log_b(x) Curve (Blue) */}
        <path suppressHydrationWarning d={pathD} fill="none" stroke="#2563eb" strokeWidth={2.5} className="dark:stroke-blue-400" />

        {/* Key Point (1, 0) */}
        <circle cx={p1[0]} cy={p1[1]} r={4} fill="#10b981" />
        <text x={p1[0] + 6} y={p1[1] - 6} className="fill-emerald-600 dark:fill-emerald-400 font-bold text-[10px]">
          (1, 0)
        </text>

        {/* Key Point (b, 1) */}
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. TABS & QUICK PRESETS SUITE */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {[
            { id: "general", label: "General Log (log_b x)" },
            { id: "antilog", label: "Antilogarithm (b^y)" },
            { id: "bidirectional", label: "3-Variable Solver" },
            { id: "laws", label: "Log Laws Expander" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCalcMode(tab.id as CalcMode)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                calcMode === tab.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-600" /> Presets:
          </span>
          <button
            onClick={() => applyPreset("common")}
            className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 cursor-pointer"
          >
            log₁₀(1000)
          </button>
          <button
            onClick={() => applyPreset("natural")}
            className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 cursor-pointer"
          >
            ln(e)
          </button>
          <button
            onClick={() => applyPreset("binary")}
            className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 cursor-pointer"
          >
            log₂(1024)
          </button>
        </div>
      </div>

      {/* 2. MAIN SPLIT-PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: INPUT CONTROLS */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Logarithm &amp; Exponent Inputs
            </h2>

            {calcMode === "general" && (
              <>
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
              </>
            )}

            {calcMode === "antilog" && (
              <>
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
              </>
            )}

            {calcMode === "bidirectional" && (
              <>
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
              </>
            )}
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
                  onClick={() => calculation.latex && handleCopyText(calculation.latex)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                >
                  {copiedLatex ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                  <span>{copiedLatex ? "LaTeX Copied!" : "Copy LaTeX"}</span>
                </button>
              </div>

              {calculation.error ? (
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {calculation.error}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
                    {calculation.formatted}
                  </div>

                  {calcMode === "general" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold pt-1">
                      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <span className="text-[10px] text-slate-400 block uppercase">Natural Log (ln x)</span>
                        <span className="font-sans tabular-nums">{calculation.lnX?.toFixed(6)}</span>
                      </div>
                      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <span className="text-[10px] text-slate-400 block uppercase">Common Log (log₁₀ x)</span>
                        <span className="font-sans tabular-nums">{calculation.log10X?.toFixed(6)}</span>
                      </div>
                      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-slate-400 block uppercase">Binary Log (log₂ x)</span>
                        <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{calculation.log2X?.toFixed(6)}</span>
                      </div>
                    </div>
                  )}
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

              {!calculation.error && calculation.steps && (
                <div className="space-y-2 text-xs font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                  {calculation.steps.map((step, idx) => (
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
    </div>
  );
}

export default LogCalculator;
