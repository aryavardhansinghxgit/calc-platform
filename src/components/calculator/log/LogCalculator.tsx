"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  Eye,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Share2,
  RotateCcw,
  FileSpreadsheet,
  Printer
} from "lucide-react";
import { LogReportModal } from "./LogReportModal";

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

export function parseLogInput(valStr: string): number {
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

  // Card 3: 3-Variable Equation Solver Inputs
  const [bTarget, setBTarget] = useState<BidirectionalTarget>("y");
  const [bBase, setBBase] = useState<string>("2");
  const [bArgX, setBArgX] = useState<string>("64");
  const [bLogY, setBLogY] = useState<string>("6");

  // Interactive Graph Base Slider & Synchronization
  const [graphBase, setGraphBase] = useState<number>(10);

  // Master Action Toolbar States
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

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
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Restore saved calculations and parse shared URL search params on mount
  useEffect(() => {
    try {
      const storedLog = localStorage.getItem("saved_log_calculations");
      if (storedLog) setSavedLogItems(JSON.parse(storedLog));

      const storedAnti = localStorage.getItem("saved_antilog_calculations");
      if (storedAnti) setSavedAntilogItems(JSON.parse(storedAnti));

      const storedBi = localStorage.getItem("saved_log_bidirectional");
      if (storedBi) setSavedBidirItems(JSON.parse(storedBi));

      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const urlBase = params.get("base");
        const urlX = params.get("x");
        const urlTarget = params.get("target") as BidirectionalTarget;

        if (urlBase !== null) {
          setBaseStr(urlBase);
          const parsedB = parseLogInput(urlBase);
          if (!isNaN(parsedB) && parsedB > 0 && parsedB !== 1) {
            setGraphBase(parsedB);
          }
        }
        if (urlX !== null) setXStr(urlX);
        if (urlTarget && ["y", "x", "b"].includes(urlTarget)) setBTarget(urlTarget);
      }
    } catch (e) {}
  }, []);

  // SYNCHRONIZATION: Whenever baseStr changes to a valid number, sync graphBase!
  const handleBaseChange = (val: string) => {
    setBaseStr(val);
    const parsed = parseLogInput(val);
    if (!isNaN(parsed) && parsed > 0 && parsed !== 1) {
      setGraphBase(parsed);
    }
  };

  // Slider change: updates both graphBase and baseStr!
  const handleSliderChange = (newVal: number) => {
    setGraphBase(newVal);
    setBaseStr(newVal.toString());
  };

  // --- CARD 1 CALCULATION: General Logarithm log_b(x) ---
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

  // --- CARD 2 CALCULATION: Antilogarithm b^y ---
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
      latex: `\\text{antilog}_{${antilogBaseStr}}(${exponentYStr}) = ${antilogBaseStr}^{${exponentYStr}} = ${resX}`,
      steps,
      error: null
    };
  }, [antilogBaseStr, exponentYStr]);

  // --- CARD 3 CALCULATION: 3-Variable Equation Solver ---
  const bidirCalc = useMemo(() => {
    const bVal = parseLogInput(bBase);
    const xVal = parseLogInput(bArgX);
    const yVal = parseLogInput(bLogY);

    const steps: string[] = [];

    if (bTarget === "y") {
      if (isNaN(bVal) || isNaN(xVal)) {
        return { error: "Please enter valid base b and argument x." };
      }
      if (xVal <= 0) {
        return { error: "Argument x must be strictly positive (x > 0)." };
      }
      if (bVal <= 0 || Math.abs(bVal - 1) < 1e-7) {
        return { error: "Base b must be strictly positive and not equal to 1." };
      }
      const yCalc = Math.log(xVal) / Math.log(bVal);
      steps.push(`Solve for y = log_b(x): log_${bBase}(${bArgX}) = ${yCalc.toFixed(6)}`);
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
      // Solve for base: b^y = x -> b = x^(1/y)
      if (isNaN(xVal) || isNaN(yVal) || yVal === 0) {
        return { error: "Please enter valid argument x and non-zero exponent y." };
      }

      if (xVal === 0) {
        if (yVal > 0) {
          steps.push(`Solve for base b: 0^(1/${yVal}) = 0`);
          return { resY: 0, formatted: "0", latex: `b = 0`, steps, error: null };
        } else {
          return { error: "Division by zero (0 raised to negative power is undefined)." };
        }
      }

      if (xVal < 0) {
        // Check if 1/y is an odd integer
        const invY = 1 / yVal;
        if (Number.isInteger(invY) && Math.abs(invY) % 2 === 1) {
          const bCalc = -Math.pow(Math.abs(xVal), 1 / yVal);
          steps.push(`Solve for real negative base: b = -|${xVal}|^(1/${yVal}) = ${bCalc.toFixed(6)}`);
          return {
            resY: bCalc,
            formatted: bCalc.toFixed(8),
            latex: `b = \\sqrt[${bLogY}]{${bArgX}} = ${bCalc.toFixed(6)}`,
            steps,
            error: null
          };
        } else {
          return { error: `No real base b satisfies b^(${yVal}) = ${xVal} (even power/root of negative quantity).` };
        }
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

  // --- SVG LOGARITHMIC CURVE VISUALIZER (SYNCHRONIZED WITH ACTIVE BASE & ARGUMENT) ---
  const svgChart = useMemo(() => {
    const width = 450;
    const height = 240;
    const padding = 40;

    // Use active graphBase (synchronized with baseStr)
    const b = graphBase > 0 && Math.abs(graphBase - 1) > 1e-7 ? graphBase : 2;
    const isIncreasing = b > 1;

    // Dynamic viewport domain
    const currentArg = parseLogInput(xStr);
    const hasValidArg = !isNaN(currentArg) && currentArg > 0;

    // Determine horizontal domain
    let maxX = 10;
    if (b <= 30) maxX = Math.max(maxX, Math.ceil(b * 1.2));
    if (hasValidArg && currentArg <= 30) maxX = Math.max(maxX, Math.ceil(currentArg * 1.2));
    if (maxX > 30) maxX = 30;

    const minX = 0.1;
    const minY = -3;
    const maxY = 3;

    const toSvgX = (x: number) =>
      parseFloat((padding + ((x - minX) / (maxX - minX)) * (width - padding * 2)).toFixed(2));
    const toSvgY = (y: number) =>
      parseFloat((padding + ((maxY - y) / (maxY - minY)) * (height - padding * 2)).toFixed(2));

    // Sample active curve f(x) = log_b(x)
    const points: [number, number][] = [];
    const sampleCount = 90;
    for (let i = 0; i <= sampleCount; i++) {
      const xVal = minX + (i / sampleCount) * (maxX - minX);
      const yVal = Math.log(xVal) / Math.log(b);
      if (yVal >= minY && yVal <= maxY) {
        points.push([toSvgX(xVal), toSvgY(yVal)]);
      }
    }
    const pathD = points.reduce(
      (acc, curr, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${curr[0].toFixed(2)} ${curr[1].toFixed(2)}`,
      ""
    );

    // Reference curve: Natural log ln(x)
    const pointsLn: [number, number][] = [];
    for (let i = 0; i <= sampleCount; i++) {
      const xVal = minX + (i / sampleCount) * (maxX - minX);
      const yVal = Math.log(xVal);
      if (yVal >= minY && yVal <= maxY) {
        pointsLn.push([toSvgX(xVal), toSvgY(yVal)]);
      }
    }
    const pathLnD = pointsLn.reduce(
      (acc, curr, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${curr[0].toFixed(2)} ${curr[1].toFixed(2)}`,
      ""
    );

    // Key points
    const p1 = [toSvgX(1), toSvgY(0)];
    const pB = b <= maxX ? [toSvgX(b), toSvgY(1)] : null;
    const zeroX = toSvgX(0.1);
    const zeroY = toSvgY(0);

    // Current argument point
    let pCurrent: [number, number] | null = null;
    let currentYVal: number = 0;
    if (hasValidArg && currentArg >= minX && currentArg <= maxX) {
      currentYVal = Math.log(currentArg) / Math.log(b);
      if (currentYVal >= minY && currentYVal <= maxY) {
        pCurrent = [toSvgX(currentArg), toSvgY(currentYVal)];
      }
    }

    return (
      <svg
        suppressHydrationWarning
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto text-xs font-sans tabular-nums"
        role="img"
        aria-label={`Logarithmic curve y = log_${b}(x). Monotonicity: ${isIncreasing ? "increasing" : "decreasing"}. Asymptote at x=0.`}
      >
        {/* Horizontal axis (y=0) */}
        <line
          suppressHydrationWarning
          x1={padding}
          y1={zeroY}
          x2={width - padding}
          y2={zeroY}
          stroke="currentColor"
          strokeOpacity={0.25}
          strokeWidth={1.5}
        />

        {/* Vertical Asymptote at x = 0 (dashed red line) */}
        <line
          suppressHydrationWarning
          x1={zeroX}
          y1={padding}
          x2={zeroX}
          y2={height - padding}
          stroke="#ef4444"
          strokeDasharray="3 3"
          strokeWidth={1.5}
        />
        <text
          x={zeroX + 4}
          y={height - padding - 4}
          className="fill-red-500 font-bold text-[9px]"
        >
          x = 0
        </text>

        {/* Natural log reference path */}
        <path
          suppressHydrationWarning
          d={pathLnD}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.25}
          strokeWidth={1.5}
        />

        {/* Active curve f(x) = log_b(x) */}
        <path
          suppressHydrationWarning
          d={pathD}
          fill="none"
          stroke="#2563eb"
          strokeWidth={2.5}
          className="dark:stroke-blue-400"
        />

        {/* Universal point (1, 0) */}
        <circle cx={p1[0]} cy={p1[1]} r={4} fill="#10b981" />
        <text
          x={p1[0] + 6}
          y={p1[1] + 12}
          className="fill-emerald-600 dark:fill-emerald-400 font-bold text-[10px]"
        >
          (1, 0)
        </text>

        {/* Base point (b, 1) if within viewport */}
        {pB && (
          <g>
            <circle cx={pB[0]} cy={pB[1]} r={4} fill="#2563eb" />
            <text
              x={pB[0] + 6}
              y={pB[1] - 6}
              className="fill-blue-600 dark:fill-blue-400 font-bold text-[10px]"
            >
              ({b <= 100 ? b.toFixed(1) : b.toString()}, 1)
            </text>
          </g>
        )}

        {/* Active calculation argument point (x, y) if within viewport */}
        {pCurrent && (
          <g>
            <circle cx={pCurrent[0]} cy={pCurrent[1]} r={5} fill="#8b5cf6" stroke="#ffffff" strokeWidth={1.5} />
            <text
              x={pCurrent[0] + 6}
              y={pCurrent[1] - 8}
              className="fill-purple-600 dark:fill-purple-400 font-extrabold text-[10px]"
            >
              ({currentArg <= 100 ? currentArg : currentArg.toFixed(1)}, {currentYVal.toFixed(2)})
            </text>
          </g>
        )}
      </svg>
    );
  }, [graphBase, xStr]);

  // --- ACTIONS: COPY, SHARE, CSV, RESET, PRINT ---
  const handleCopyText = (text: string, key: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {}
  };

  const handleCopySummary = () => {
    const summary = [
      `=== LOG CALCULATOR ANALYSIS ===`,
      `[1] Primary Logarithm (log_b x):`,
      `    Base: ${baseStr} | Argument: ${xStr}`,
      `    Evaluated Result = ${genCalc.formatted || "N/A"}`,
      `    Natural Log ln(x) = ${genCalc.lnX?.toFixed(8) || "N/A"}`,
      `    Common Log log10(x) = ${genCalc.log10X?.toFixed(8) || "N/A"}`,
      `    Binary Log log2(x) = ${genCalc.log2X?.toFixed(8) || "N/A"}`,
      ``,
      `[2] Antilogarithm Solver:`,
      `    Base: ${antilogBaseStr} | Exponent: ${exponentYStr}`,
      `    Evaluated Antilog = ${antiCalc.formatted || "N/A"} (Scientific: ${antiCalc.scientific || "N/A"})`,
      ``,
      `[3] 3-Variable Equation Solver:`,
      `    Target: ${bTarget} | Base: ${bBase} | Argument: ${bArgX} | Exponent: ${bLogY}`,
      `    Solved Result = ${bidirCalc.formatted || "N/A"}`,
      `Generated by CalcPlatform Log Calculator`
    ].join("\n");

    handleCopyText(summary, "summary");
  };

  const handleShareLink = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("base", baseStr);
      url.searchParams.set("x", xStr);
      url.searchParams.set("target", bTarget);
      navigator.clipboard.writeText(url.toString());
      setCopiedKey("share");
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {}
  };

  const handleExportCSV = () => {
    const rows = [
      ["Module", "Input 1", "Input 2", "Evaluated Result", "Formula / LaTeX", "Precision / Related"],
      [
        "Primary Logarithm",
        `Base: ${baseStr}`,
        `Argument: ${xStr}`,
        `"${genCalc.formatted || ""}"`,
        `"${genCalc.latex || ""}"`,
        `"ln(x)=${genCalc.lnX?.toFixed(8) || ""}, log10(x)=${genCalc.log10X?.toFixed(8) || ""}"`
      ],
      [
        "Antilogarithm",
        `Base: ${antilogBaseStr}`,
        `Exponent: ${exponentYStr}`,
        `"${antiCalc.formatted || ""}"`,
        `"${antiCalc.latex || ""}"`,
        `"Scientific=${antiCalc.scientific || ""}"`
      ],
      [
        `3-Variable Solver (${bTarget})`,
        `Base: ${bBase}`,
        `Argument: ${bArgX}, Exp: ${bLogY}`,
        `"${bidirCalc.formatted || ""}"`,
        `"${bidirCalc.latex || ""}"`,
        `"Target=${bTarget}"`
      ]
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `log_calculator_${baseStr}_${xStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetDefaults = () => {
    setBaseStr("10");
    setXStr("100");
    setGraphBase(10);

    setAntilogBaseStr("10");
    setExponentYStr("2");

    setBTarget("y");
    setBBase("2");
    setBArgX("64");
    setBLogY("6");

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url.toString());
    }
  };

  // --- SAVE HANDLERS ---
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

    const updated = [newItem, ...savedLogItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedLogItems(updated);
    try {
      localStorage.setItem("saved_log_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedLog(true);
    setTimeout(() => setJustSavedLog(false), 2000);
  };

  const handleSaveAntilog = () => {
    if (antiCalc.error || antiCalc.resX === undefined) return;

    const inputsStr = `Antilog Base (b): ${antilogBaseStr}, Exponent (y): ${exponentYStr}`;
    const opStr = `Antilogarithm Calculation (antilog_${antilogBaseStr}(${exponentYStr}) = ${antilogBaseStr}^${exponentYStr})`;
    const resList = [`Evaluated Result = ${antiCalc.resX}`, `Scientific Notation = ${antiCalc.scientific}`];

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

    const updated = [newItem, ...savedAntilogItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedAntilogItems(updated);
    try {
      localStorage.setItem("saved_antilog_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedAntilog(true);
    setTimeout(() => setJustSavedAntilog(false), 2000);
  };

  const handleSaveBidir = () => {
    if (bidirCalc.error || !bidirCalc.formatted) return;

    const inputsStr = `Target: ${bTarget}, Base (b): ${bBase}, Argument (x): ${bArgX}, Exponent (y): ${bLogY}`;
    const opStr = `3-Variable Log Solve (${bBase}^${bLogY} = ${bArgX})`;
    const resList = [`Solved Target (${bTarget}) = ${bidirCalc.formatted}`];

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

    const updated = [newItem, ...savedBidirItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedBidirItems(updated);
    try {
      localStorage.setItem("saved_log_bidirectional", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedBidir(true);
    setTimeout(() => setJustSavedBidir(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* MASTER ACTION TOOLBAR */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedKey === "summary" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === "summary" ? "Summary Copied!" : "Copy Summary"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleCopyText(genCalc.latex || "", "latex_m")}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedKey === "latex_m" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
            <span>{copiedKey === "latex_m" ? "LaTeX Copied!" : "Copy LaTeX"}</span>
          </button>

          <button
            type="button"
            onClick={handleShareLink}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedKey === "share" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-blue-600" />}
            <span>{copiedKey === "share" ? "Link Copied!" : "Share Calculation"}</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

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
                    onChange={(e) => handleBaseChange(e.target.value)}
                    placeholder="e.g. 10, e, 2, 1049"
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
                    placeholder="e.g. 100, 2.71828, 105, 1/2"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* QUICK BASE PRESETS */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Quick Base Presets:
                  </span>
                  <div className="grid grid-cols-4 gap-1.5 text-xs font-bold font-sans">
                    <button
                      type="button"
                      onClick={() => handleBaseChange("10")}
                      className={`py-1.5 rounded-lg border transition-colors cursor-pointer ${
                        baseStr === "10"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      log₁₀ (10)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBaseChange("e")}
                      className={`py-1.5 rounded-lg border transition-colors cursor-pointer ${
                        baseStr.toLowerCase() === "e"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      ln (e)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBaseChange("2")}
                      className={`py-1.5 rounded-lg border transition-colors cursor-pointer ${
                        baseStr === "2"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      log₂ (2)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBaseChange("0.5")}
                      className={`py-1.5 rounded-lg border transition-colors cursor-pointer ${
                        baseStr === "0.5"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      log₀.₅ (0.5)
                    </button>
                  </div>
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
                      onClick={() => genCalc.latex && handleCopyText(genCalc.latex, "latex_card1")}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                    >
                      {copiedKey === "latex_card1" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                      <span>{copiedKey === "latex_card1" ? "LaTeX Copied!" : "Copy LaTeX"}</span>
                    </button>
                  </div>

                  {genCalc.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {genCalc.error}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
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

                {/* SYNCHRONIZED 2D GRAPH VISUALIZER */}
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> Logarithmic Curve f(x) = log_{baseStr}(x)
                    </span>

                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span className="text-slate-500">Base Slider:</span>
                      <input
                        type="range"
                        min={0.25}
                        max={10}
                        step={0.25}
                        value={graphBase <= 10 && graphBase >= 0.25 ? graphBase : 2}
                        onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                        className="w-24 accent-blue-600 cursor-pointer"
                        title="Adjust logarithm base"
                      />
                      <span className="font-sans tabular-nums text-blue-600 font-extrabold">
                        {graphBase}
                      </span>
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
                    try {
                      localStorage.removeItem("saved_log_calculations");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedLogItems.map((item) => {
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
                            const updated = savedLogItems.filter((i) => i.id !== item.id);
                            setSavedLogItems(updated);
                            try {
                              localStorage.setItem("saved_log_calculations", JSON.stringify(updated));
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
                    try {
                      localStorage.removeItem("saved_antilog_calculations");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedAntilogItems.map((item) => {
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
                            const updated = savedAntilogItems.filter((i) => i.id !== item.id);
                            setSavedAntilogItems(updated);
                            try {
                              localStorage.setItem("saved_antilog_calculations", JSON.stringify(updated));
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
      {/* CARD 3: 3-VARIABLE LOGARITHMIC EQUATION SOLVER */}
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
                  Select Target Variable to Solve (bʸ = x)
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setBTarget("y")}
                    className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                      bTarget === "y" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    Log y
                  </button>
                  <button
                    type="button"
                    onClick={() => setBTarget("x")}
                    className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                      bTarget === "x" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    Arg x
                  </button>
                  <button
                    type="button"
                    onClick={() => setBTarget("b")}
                    className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                      bTarget === "b" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    Base b
                  </button>
                </div>
              </div>

              {bTarget !== "b" && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Base (b)
                  </label>
                  <input
                    type="text"
                    value={bBase}
                    onChange={(e) => setBBase(e.target.value)}
                    placeholder="e.g. 2"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}

              {bTarget !== "x" && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Argument (x)
                  </label>
                  <input
                    type="text"
                    value={bArgX}
                    onChange={(e) => setBArgX(e.target.value)}
                    placeholder="e.g. 64"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}

              {bTarget !== "y" && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Logarithm Value (y)
                  </label>
                  <input
                    type="text"
                    value={bLogY}
                    onChange={(e) => setBLogY(e.target.value)}
                    placeholder="e.g. 6"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: LIVE 3-VARIABLE OUTPUT MATRIX */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Solved Target Variable ({bTarget.toUpperCase()})
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

                {/* STEP-BY-STEP DERIVATION */}
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

          {/* EMBEDDED SAVED 3-VARIABLE CALCULATIONS INSIDE CARD 3 */}
          {savedBidirItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved 3-Variable Calculations ({savedBidirItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedBidirItems([]);
                    try {
                      localStorage.removeItem("saved_log_bidirectional");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedBidirItems.map((item) => {
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
                            const updated = savedBidirItems.filter((i) => i.id !== item.id);
                            setSavedBidirItems(updated);
                            try {
                              localStorage.setItem("saved_log_bidirectional", JSON.stringify(updated));
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

      {/* EXECUTIVE PRINT / PDF REPORT MODAL */}
      <LogReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        baseStr={baseStr}
        xStr={xStr}
        genCalc={genCalc}
        antilogBaseStr={antilogBaseStr}
        exponentYStr={exponentYStr}
        antiCalc={antiCalc}
        bTarget={bTarget}
        bBase={bBase}
        bArgX={bArgX}
        bLogY={bLogY}
        bidirCalc={bidirCalc}
        svgChart={svgChart}
      />
    </div>
  );
}

export default LogCalculator;
