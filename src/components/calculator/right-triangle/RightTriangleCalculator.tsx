"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Zap,
  RotateCcw,
  Copy,
  FileText,
  FileSpreadsheet,
  Printer,
  Code,
  Check,
  AlertTriangle
} from "lucide-react";
import {
  computeRightTriangleUniversal,
  convertRightTriangleUnits,
  RightTriangleResult
} from "@/app/calculators/right-triangle-calculator/right-triangle-logic";

export interface SavedRightTriItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  rawInputs?: {
    a?: string;
    b?: string;
    c?: string;
    alpha?: string;
    area?: string;
    convVal?: number;
    convUnit?: "meters" | "cm" | "mm" | "feet" | "inches" | "yards";
    module?: "core" | "trig" | "geom" | "slope" | "conv";
  };
  timestamp: string;
}

export function RightTriangleCalculator() {
  // Card 1: Core Inputs
  const [coreA, setCoreA] = useState<string>("5");
  const [coreB, setCoreB] = useState<string>("12");
  const [coreC, setCoreC] = useState<string>("");
  const [coreAlpha, setCoreAlpha] = useState<string>("");
  const [coreArea, setCoreArea] = useState<string>("");

  // Visual Overlay Toggles
  const [showAltitude, setShowAltitude] = useState<boolean>(true);
  const [showIncircle, setShowIncircle] = useState<boolean>(false);
  const [showCircumcircle, setShowCircumcircle] = useState<boolean>(false);

  // Card 6: Converter Inputs
  const [convVal, setConvVal] = useState<number>(10);
  const [convUnit, setConvUnit] = useState<"meters" | "cm" | "mm" | "feet" | "inches" | "yards">("meters");

  const [precision1] = useState<number>(4);

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Saved calculation states
  const [savedCoreItems, setSavedCoreItems] = useState<SavedRightTriItem[]>([]);
  const [justSavedCore, setJustSavedCore] = useState<boolean>(false);

  const [savedTrigItems, setSavedTrigItems] = useState<SavedRightTriItem[]>([]);
  const [justSavedTrig, setJustSavedTrig] = useState<boolean>(false);

  const [savedGeomItems, setSavedGeomItems] = useState<SavedRightTriItem[]>([]);
  const [justSavedGeom, setJustSavedGeom] = useState<boolean>(false);

  const [savedSlopeItems, setSavedSlopeItems] = useState<SavedRightTriItem[]>([]);
  const [justSavedSlope, setJustSavedSlope] = useState<boolean>(false);

  const [savedConvItems, setSavedConvItems] = useState<SavedRightTriItem[]>([]);
  const [justSavedConv, setJustSavedConv] = useState<boolean>(false);

  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_rt_core"); if (s1) setSavedCoreItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_rt_trig"); if (s2) setSavedTrigItems(JSON.parse(s2));
      const s4 = localStorage.getItem("saved_rt_geom"); if (s4) setSavedGeomItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_rt_slope"); if (s5) setSavedSlopeItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_rt_conv"); if (s6) setSavedConvItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Card 1 Calculations
  const resultCore: RightTriangleResult = useMemo(() => {
    const numA = coreA.trim() !== "" ? parseFloat(coreA) : undefined;
    const numB = coreB.trim() !== "" ? parseFloat(coreB) : undefined;
    const numC = coreC.trim() !== "" ? parseFloat(coreC) : undefined;
    const numAlpha = coreAlpha.trim() !== "" ? parseFloat(coreAlpha) : undefined;
    const numArea = coreArea.trim() !== "" ? parseFloat(coreArea) : undefined;

    return computeRightTriangleUniversal(numA, numB, numC, numAlpha, undefined, numArea, undefined, precision1);
  }, [coreA, coreB, coreC, coreAlpha, coreArea, precision1]);

  // Converter Calculations
  const resultConv = useMemo(() => {
    let m = convVal;
    if (convUnit === "cm") m = convVal * 0.01;
    else if (convUnit === "mm") m = convVal * 0.001;
    else if (convUnit === "feet") m = convVal * 0.3048;
    else if (convUnit === "inches") m = convVal * 0.0254;
    else if (convUnit === "yards") m = convVal * 0.9144;
    return convertRightTriangleUnits(m, precision1);
  }, [convVal, convUnit, precision1]);

  // Presets Handlers
  const handleApplyPreset = (a: string, b: string, c: string, alpha: string = "") => {
    setCoreA(a); setCoreB(b); setCoreC(c); setCoreAlpha(alpha); setCoreArea("");
  };

  // Restore Handler
  const handleRestore = (item: SavedRightTriItem) => {
    if (!item.rawInputs) {
      // Fallback parsing from inputs string for legacy items
      const aMatch = item.inputs.match(/a\s*=\s*([0-9.]+)/i);
      const bMatch = item.inputs.match(/b\s*=\s*([0-9.]+)/i);
      const cMatch = item.inputs.match(/c\s*=\s*([0-9.]+)/i);
      if (aMatch && bMatch) {
        setCoreA(aMatch[1]);
        setCoreB(bMatch[1]);
        setCoreC(cMatch ? cMatch[1] : "");
        setCoreAlpha("");
        setCoreArea("");
        showToast(`Restored calculation: a=${aMatch[1]}, b=${bMatch[1]}`);
      }
      return;
    }

    const { a, b, c, alpha, area, convVal: sConvVal, convUnit: sConvUnit, module } = item.rawInputs;

    if (module === "conv" && sConvVal !== undefined && sConvUnit) {
      setConvVal(sConvVal);
      setConvUnit(sConvUnit);
      showToast(`Restored converter: ${sConvVal} ${sConvUnit}`);
      return;
    }

    if (a !== undefined) setCoreA(a);
    if (b !== undefined) setCoreB(b);
    if (c !== undefined) setCoreC(c);
    if (alpha !== undefined) setCoreAlpha(alpha);
    if (area !== undefined) setCoreArea(area);

    showToast(`Restored ${item.title}`);
  };

  // Save Handlers
  const handleSaveCore = () => {
    if (!resultCore.isValid) return;
    const inputsStr = `a = ${resultCore.a}, b = ${resultCore.b}, c = ${resultCore.c}`;
    const resList = [
      `Leg a = ${resultCore.a}, Leg b = ${resultCore.b}, Hypotenuse c = ${resultCore.c}`,
      `Angle α = ${resultCore.alphaDeg}°, Angle β = ${resultCore.betaDeg}°`,
      `Area K = ${resultCore.area}, Perimeter P = ${resultCore.perimeter}`,
      `Altitude h_c = ${resultCore.altitudeHc}`,
      `Inradius r = ${resultCore.inradius}, Circumradius R = ${resultCore.circumradius}`
    ];
    const newItem: SavedRightTriItem = {
      id: Date.now().toString(),
      title: `Right Tri (${resultCore.a}, ${resultCore.b}, ${resultCore.c})`,
      inputs: inputsStr,
      operation: `Universal Right Triangle Solver`,
      result: resList.join(" | "),
      resultsList: resList,
      rawInputs: {
        a: coreA,
        b: coreB,
        c: coreC,
        alpha: coreAlpha,
        area: coreArea,
        module: "core"
      },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedCoreItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedCoreItems(updated);
    try { localStorage.setItem("saved_rt_core", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCore(true); setTimeout(() => setJustSavedCore(false), 2000);
    showToast("Calculation saved to history");
  };

  const handleSaveTrig = () => {
    if (!resultCore.isValid) return;
    const inputsStr = `Angle α = ${resultCore.alphaDeg}°`;
    const resList = [
      `sin(α) = ${resultCore.trigRatiosAlpha.sin} (${resultCore.trigRatiosAlpha.sinFrac})`,
      `cos(α) = ${resultCore.trigRatiosAlpha.cos} (${resultCore.trigRatiosAlpha.cosFrac})`,
      `tan(α) = ${resultCore.trigRatiosAlpha.tan} (${resultCore.trigRatiosAlpha.tanFrac})`,
      `csc(α) = ${resultCore.trigRatiosAlpha.csc}, sec(α) = ${resultCore.trigRatiosAlpha.sec}, cot(α) = ${resultCore.trigRatiosAlpha.cot}`
    ];
    const newItem: SavedRightTriItem = {
      id: Date.now().toString(),
      title: `Trig Ratios α = ${resultCore.alphaDeg}°`,
      inputs: inputsStr,
      operation: `Trigonometric Functions Matrix`,
      result: resList.join(" | "),
      resultsList: resList,
      rawInputs: {
        a: coreA,
        b: coreB,
        c: coreC,
        alpha: coreAlpha,
        area: coreArea,
        module: "trig"
      },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedTrigItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedTrigItems(updated);
    try { localStorage.setItem("saved_rt_trig", JSON.stringify(updated)); } catch (e) {}
    setJustSavedTrig(true); setTimeout(() => setJustSavedTrig(false), 2000);
    showToast("Trig ratios saved to history");
  };

  const handleSaveGeom = () => {
    if (!resultCore.isValid) return;
    const inputsStr = `a = ${resultCore.a}, b = ${resultCore.b}, c = ${resultCore.c}`;
    const resList = [
      `Altitude h_c = ${resultCore.altitudeHc}`,
      `Hypotenuse Segments p = ${resultCore.hypSegmentP}, q = ${resultCore.hypSegmentQ}`,
      `Inradius r = ${resultCore.inradius}`,
      `Circumradius R = ${resultCore.circumradius}`,
      `Median m_c = ${resultCore.medianMc}`
    ];
    const newItem: SavedRightTriItem = {
      id: Date.now().toString(),
      title: `Invariants h_c = ${resultCore.altitudeHc}`,
      inputs: inputsStr,
      operation: `Geometric Invariants & Lines`,
      result: resList.join(" | "),
      resultsList: resList,
      rawInputs: {
        a: coreA,
        b: coreB,
        c: coreC,
        alpha: coreAlpha,
        area: coreArea,
        module: "geom"
      },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedGeomItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedGeomItems(updated);
    try { localStorage.setItem("saved_rt_geom", JSON.stringify(updated)); } catch (e) {}
    setJustSavedGeom(true); setTimeout(() => setJustSavedGeom(false), 2000);
    showToast("Geometric invariants saved to history");
  };

  const handleSaveSlope = () => {
    if (!resultCore.isValid) return;
    const inputsStr = `Rise a = ${resultCore.a}, Run b = ${resultCore.b}`;
    const resList = [
      `Grade / Incline = ${resultCore.gradePercent}%`,
      `Roof Pitch = ${resultCore.roofPitch}`,
      `Angle of Elevation = ${resultCore.alphaDeg}°`
    ];
    const newItem: SavedRightTriItem = {
      id: Date.now().toString(),
      title: `Slope Grade = ${resultCore.gradePercent}%`,
      inputs: inputsStr,
      operation: `Slope & Roof Pitch Converter`,
      result: resList.join(" | "),
      resultsList: resList,
      rawInputs: {
        a: coreA,
        b: coreB,
        c: coreC,
        alpha: coreAlpha,
        area: coreArea,
        module: "slope"
      },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedSlopeItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedSlopeItems(updated);
    try { localStorage.setItem("saved_rt_slope", JSON.stringify(updated)); } catch (e) {}
    setJustSavedSlope(true); setTimeout(() => setJustSavedSlope(false), 2000);
    showToast("Slope metrics saved to history");
  };

  const handleSaveConv = () => {
    const inputsStr = `Length = ${convVal} ${convUnit}`;
    const resList = [
      `${resultConv.meters} meters`,
      `${resultConv.feet} feet`,
      `${resultConv.inches} inches`,
      `${resultConv.yards} yards`
    ];
    const newItem: SavedRightTriItem = {
      id: Date.now().toString(),
      title: `Converted Length = ${resultConv.meters} m`,
      inputs: inputsStr,
      operation: `Right Triangle Unit Matrix`,
      result: resList.join(" | "),
      resultsList: resList,
      rawInputs: {
        convVal,
        convUnit,
        module: "conv"
      },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConvItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedConvItems(updated);
    try { localStorage.setItem("saved_rt_conv", JSON.stringify(updated)); } catch (e) {}
    setJustSavedConv(true); setTimeout(() => setJustSavedConv(false), 2000);
    showToast("Unit conversion saved to history");
  };

  // Export Actions
  const handleCopyResult = async () => {
    if (!resultCore.isValid) return;
    const text = [
      `--- Right Triangle Calculation Summary ---`,
      `Leg a: ${resultCore.a}`,
      `Leg b: ${resultCore.b}`,
      `Hypotenuse c: ${resultCore.c}`,
      `Angle α: ${resultCore.alphaDeg}° (${resultCore.alphaRad} rad)`,
      `Angle β: ${resultCore.betaDeg}° (${resultCore.betaRad} rad)`,
      `Area K: ${resultCore.area}`,
      `Perimeter P: ${resultCore.perimeter}`,
      `Altitude h_c: ${resultCore.altitudeHc}`,
      `Inradius r: ${resultCore.inradius}`,
      `Circumradius R: ${resultCore.circumradius}`,
      `Median m_c: ${resultCore.medianMc}`,
      `Grade: ${resultCore.gradePercent}%`,
      `Roof Pitch: ${resultCore.roofPitch}`,
      `Angle of Elevation: ${resultCore.alphaDeg}°`
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      showToast("Result summary copied to clipboard!");
    } catch {
      showToast("Failed to copy result.");
    }
  };

  const handleCopyLatex = async () => {
    if (!resultCore.isValid) return;
    const latex = [
      `% Right Triangle Formulas & Numerical Result`,
      `c = \\sqrt{a^2 + b^2} = \\sqrt{${resultCore.a}^2 + ${resultCore.b}^2} = ${resultCore.c}`,
      `\\alpha = \\arctan\\left(\\frac{a}{b}\\right) = \\arctan\\left(\\frac{${resultCore.a}}{${resultCore.b}}\\right) \\approx ${resultCore.alphaDeg}^\\circ`,
      `\\beta = 90^\\circ - \\alpha = ${resultCore.betaDeg}^\\circ`,
      `A = \\frac{a \\cdot b}{2} = \\frac{${resultCore.a} \\cdot ${resultCore.b}}{2} = ${resultCore.area}`,
      `P = a + b + c = ${resultCore.a} + ${resultCore.b} + ${resultCore.c} = ${resultCore.perimeter}`,
      `h_c = \\frac{a \\cdot b}{c} = \\frac{${resultCore.a} \\cdot ${resultCore.b}}{${resultCore.c}} = ${resultCore.altitudeHc}`,
      `r = \\frac{a + b - c}{2} = ${resultCore.inradius}`,
      `R = \\frac{c}{2} = ${resultCore.circumradius}`
    ].join("\n");

    try {
      await navigator.clipboard.writeText(latex);
      showToast("LaTeX formulas copied to clipboard!");
    } catch {
      showToast("Failed to copy LaTeX.");
    }
  };

  const handleExportCSV = () => {
    if (!resultCore.isValid) return;
    const headers = [
      "Parameter",
      "Symbol",
      "Value",
      "Unit / Expression"
    ];
    const rows = [
      ["Leg a", "a", resultCore.a.toString(), "Opposite"],
      ["Leg b", "b", resultCore.b.toString(), "Adjacent"],
      ["Hypotenuse", "c", resultCore.c.toString(), "Hypotenuse"],
      ["Acute Angle A", "alpha", resultCore.alphaDeg.toString(), "degrees"],
      ["Acute Angle B", "beta", resultCore.betaDeg.toString(), "degrees"],
      ["Area", "K", resultCore.area.toString(), "sq units"],
      ["Perimeter", "P", resultCore.perimeter.toString(), "linear units"],
      ["Altitude to Hypotenuse", "h_c", resultCore.altitudeHc.toString(), "linear units"],
      ["Inradius", "r", resultCore.inradius.toString(), "linear units"],
      ["Circumradius", "R", resultCore.circumradius.toString(), "linear units"],
      ["Median to Hypotenuse", "m_c", resultCore.medianMc.toString(), "linear units"],
      ["Grade / Incline", "Grade", resultCore.gradePercent.toString(), "%"],
      ["Roof Pitch", "Pitch", resultCore.roofPitch, "rise:run"],
      ["Angle of Elevation", "theta", resultCore.alphaDeg.toString(), "degrees"]
    ];

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.map(f => `"${f.replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `right_triangle_${resultCore.a}_${resultCore.b}_${resultCore.c}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV file downloaded!");
  };

  const handleExportTXT = () => {
    if (!resultCore.isValid) return;
    const txt = [
      "============================================================",
      "RIGHT TRIANGLE CALCULATION & TRIGONOMETRIC REPORT",
      "============================================================",
      `Date Generated: ${new Date().toLocaleString()}`,
      "",
      "1. PRIMARY DIMENSIONS",
      `   - Leg a (Opposite)   : ${resultCore.a}`,
      `   - Leg b (Adjacent)   : ${resultCore.b}`,
      `   - Hypotenuse c       : ${resultCore.c}`,
      `   - Acute Angle α      : ${resultCore.alphaDeg}° (${resultCore.alphaRad} rad)`,
      `   - Acute Angle β      : ${resultCore.betaDeg}° (${resultCore.betaRad} rad)`,
      "",
      "2. GEOMETRIC INVARIANTS",
      `   - Area (K = ½ab)     : ${resultCore.area}`,
      `   - Perimeter (P=a+b+c): ${resultCore.perimeter}`,
      `   - Altitude (h_c=ab/c): ${resultCore.altitudeHc}`,
      `   - Inradius (r)       : ${resultCore.inradius}`,
      `   - Circumradius (R)   : ${resultCore.circumradius}`,
      `   - Median (m_c = c/2) : ${resultCore.medianMc}`,
      "",
      "3. TRIGONOMETRIC MATRIX (Angle α)",
      `   - sin(α)             : ${resultCore.trigRatiosAlpha.sin} (${resultCore.trigRatiosAlpha.sinFrac})`,
      `   - cos(α)             : ${resultCore.trigRatiosAlpha.cos} (${resultCore.trigRatiosAlpha.cosFrac})`,
      `   - tan(α)             : ${resultCore.trigRatiosAlpha.tan} (${resultCore.trigRatiosAlpha.tanFrac})`,
      `   - csc(α)             : ${resultCore.trigRatiosAlpha.csc}`,
      `   - sec(α)             : ${resultCore.trigRatiosAlpha.sec}`,
      `   - cot(α)             : ${resultCore.trigRatiosAlpha.cot}`,
      "",
      "4. SLOPE & ROOF PITCH",
      `   - Grade / Incline    : ${resultCore.gradePercent}%`,
      `   - Roof Pitch         : ${resultCore.roofPitch}`,
      `   - Elevation Angle    : ${resultCore.alphaDeg}°`,
      "============================================================"
    ].join("\n");

    const blob = new Blob([txt], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `right_triangle_report_${resultCore.a}_${resultCore.b}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("TXT report downloaded!");
  };

  const handlePrint = () => {
    window.print();
  };

  // Render True Aspect-Ratio Proportional SVG
  const renderTriangleSVG = () => {
    if (!resultCore.isValid) {
      return (
        <div className="w-64 h-52 flex flex-col items-center justify-center text-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-slate-500 text-xs">
          <AlertTriangle className="w-8 h-8 text-amber-500 mb-2" />
          <span>Invalid triangle dimensions. Please adjust inputs to view SVG geometry.</span>
        </div>
      );
    }

    const width = 280;
    const height = 220;
    const ox = 45;
    const oy = 175;
    const maxAvailW = 190;
    const maxAvailH = 135;

    const aVal = resultCore.a > 0 ? resultCore.a : 5;
    const bVal = resultCore.b > 0 ? resultCore.b : 12;

    // Proportional scale factor
    const scale = Math.min(maxAvailW / bVal, maxAvailH / aVal);
    const drawnW = Math.max(16, bVal * scale);
    const drawnH = Math.max(16, aVal * scale);

    const ax = ox;
    const ay = oy - drawnH;
    const bx = ox + drawnW;
    const by = oy;

    // Exact Altitude Foot D projection of right angle vertex (ox, oy) onto hypotenuse AB
    const hypDrawn = Math.sqrt(drawnW * drawnW + drawnH * drawnH);
    const footX = ox + (drawnW * drawnW * drawnW) / (hypDrawn * hypDrawn);
    const footY = oy - (drawnW * drawnW * drawnH) / (hypDrawn * hypDrawn);

    // Exact Incircle in SVG viewport
    const rSvg = (drawnW + drawnH - hypDrawn) / 2.0;
    const inCx = ox + rSvg;
    const inCy = oy - rSvg;

    // Exact Circumcircle in SVG viewport
    const circCx = (ax + bx) / 2.0;
    const circCy = (ay + by) / 2.0;
    const circR = hypDrawn / 2.0;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-64 h-52" role="img" aria-label="Geometrically scaled right triangle diagram">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />

        {/* Circumcircle Overlay */}
        {showCircumcircle && (
          <circle cx={circCx} cy={circCy} r={circR} fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3,3" />
        )}

        {/* Incircle Overlay */}
        {showIncircle && (
          <circle cx={inCx} cy={inCy} r={rSvg} fill="#16a34a" fillOpacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
        )}

        {/* Right Angle Corner Box */}
        <path d={`M ${ox} ${oy - 10} L ${ox + 10} ${oy - 10} L ${ox + 10} ${oy}`} fill="none" stroke="#2563eb" strokeWidth="1.5" />

        {/* Triangle Polygon */}
        <polygon points={`${ox},${oy} ${ox},${ay} ${bx},${by}`} fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2.5" />

        {/* Altitude Overlay */}
        {showAltitude && (
          <line x1={ox} y1={oy} x2={footX} y2={footY} stroke="#dc2626" strokeWidth="2" strokeDasharray="2,2" />
        )}

        {/* Dimension Labels */}
        <text x={ox - 8} y={(oy + ay) / 2} textAnchor="end" className="text-[11px] font-mono font-bold fill-blue-600 dark:fill-blue-400">
          a={resultCore.a}
        </text>
        <text x={(ox + bx) / 2} y={oy + 16} textAnchor="middle" className="text-[11px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">
          b={resultCore.b}
        </text>
        <text x={(ox + bx) / 2 + 10} y={(ay + by) / 2 - 6} textAnchor="start" className="text-[11px] font-mono font-bold fill-purple-600 dark:fill-purple-400">
          c={resultCore.c}
        </text>

        {/* Angle Labels */}
        <text x={ox + 6} y={ay + 18} className="text-[9px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
          α={resultCore.alphaDeg}°
        </text>
        <text x={bx - 26} y={by - 6} className="text-[9px] font-mono font-bold fill-slate-700 dark:fill-slate-300">
          β={resultCore.betaDeg}°
        </text>
      </svg>
    );
  };

  const renderSavedCardsGroup = (
    title: string,
    items: SavedRightTriItem[],
    onClear: () => void,
    onDelete: (id: string) => void
  ) => {
    if (items.length === 0) return null;
    return (
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 print:hidden no-print">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-blue-600" />
            <span>{title} ({items.length})</span>
          </h3>
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item) => {
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
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleRestore(item)}
                      className="text-slate-400 hover:text-blue-600 p-1 transition-colors cursor-pointer"
                      title="Restore calculation into inputs"
                      aria-label="Restore saved calculation"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                      title="Delete saved calculation"
                      aria-label="Delete saved calculation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                  <div>
                    <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs}</span>
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
                        Calculation Details:
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
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-lg text-xs font-bold flex items-center gap-2 animate-fade-in" role="status" aria-live="polite">
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs print:hidden no-print">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopyResult}
            className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold text-xs hover:bg-blue-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label="Copy result summary"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Result</span>
          </button>
          <button
            type="button"
            onClick={handleCopyLatex}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label="Copy LaTeX equations"
          >
            <Code className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Copy LaTeX</span>
          </button>
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label="Export calculations as CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={handleExportTXT}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label="Export text report"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Export TXT</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          aria-label="Print or save as PDF"
        >
          <Printer className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Print / PDF</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: UNIVERSAL 2-PARAMETER RIGHT TRIANGLE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Universal 2-Parameter Right Triangle Solver</span>
          <button
            type="button"
            onClick={handleSaveCore}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer print:hidden no-print"
            aria-label="Save calculation"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCore ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Quick Presets Toolbar */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold print:hidden no-print">
            <span className="text-slate-500 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" /> Quick Presets:
            </span>
            <button type="button" onClick={()=>handleApplyPreset("3","4","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">3-4-5</button>
            <button type="button" onClick={()=>handleApplyPreset("5","12","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">5-12-13</button>
            <button type="button" onClick={()=>handleApplyPreset("1","1","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">45°-45°-90°</button>
            <button type="button" onClick={()=>handleApplyPreset("1","","2")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">30°-60°-90°</button>
            <button type="button" onClick={()=>handleApplyPreset("1","12","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">1:12 ADA Ramp</button>
          </div>

          {/* Validation Alert */}
          {!resultCore.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2" role="alert">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{resultCore.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <p className="font-bold text-slate-500 mb-1">Enter any 2 parameters below:</p>
              <div>
                <label htmlFor="rt-leg-a" className="font-bold block mb-1">Leg a (Opposite):</label>
                <input
                  id="rt-leg-a"
                  type="number"
                  step="any"
                  placeholder="e.g. 5"
                  value={coreA}
                  onChange={(e)=>setCoreA(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
              <div>
                <label htmlFor="rt-leg-b" className="font-bold block mb-1">Leg b (Adjacent):</label>
                <input
                  id="rt-leg-b"
                  type="number"
                  step="any"
                  placeholder="e.g. 12"
                  value={coreB}
                  onChange={(e)=>setCoreB(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
              <div>
                <label htmlFor="rt-hyp-c" className="font-bold block mb-1">Hypotenuse c:</label>
                <input
                  id="rt-hyp-c"
                  type="number"
                  step="any"
                  placeholder="e.g. 13"
                  value={coreC}
                  onChange={(e)=>setCoreC(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
              <div>
                <label htmlFor="rt-angle-alpha" className="font-bold block mb-1">Angle α (°):</label>
                <input
                  id="rt-angle-alpha"
                  type="number"
                  step="any"
                  placeholder="e.g. 22.62"
                  value={coreAlpha}
                  onChange={(e)=>setCoreAlpha(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[9px] text-slate-400 uppercase block font-sans">Leg a</span>
                  <span className="text-blue-600 dark:text-blue-400">{resultCore.isValid ? resultCore.a : "—"}</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[9px] text-slate-400 uppercase block font-sans">Leg b</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{resultCore.isValid ? resultCore.b : "—"}</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[9px] text-slate-400 uppercase block font-sans">Hypotenuse c</span>
                  <span className="text-purple-600 dark:text-purple-400">{resultCore.isValid ? resultCore.c : "—"}</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-xs font-mono font-bold">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[9px] text-slate-400 uppercase block font-sans">Angle α</span>
                  <span>{resultCore.isValid ? `${resultCore.alphaDeg}°` : "—"}</span>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[9px] text-slate-400 uppercase block font-sans">Angle β</span>
                  <span>{resultCore.isValid ? `${resultCore.betaDeg}°` : "—"}</span>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[9px] text-slate-400 uppercase block font-sans">Area K</span>
                  <span>{resultCore.isValid ? resultCore.area : "—"}</span>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[9px] text-slate-400 uppercase block font-sans">Perimeter P</span>
                  <span>{resultCore.isValid ? resultCore.perimeter : "—"}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs pt-1 print:hidden no-print">
                <label className="flex items-center gap-1 cursor-pointer font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showAltitude}
                    onChange={(e)=>setShowAltitude(e.target.checked)}
                    className="rounded text-blue-600"
                    aria-label="Toggle altitude overlay"
                  />
                  <span>Altitude (h_c)</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showIncircle}
                    onChange={(e)=>setShowIncircle(e.target.checked)}
                    className="rounded text-blue-600"
                    aria-label="Toggle incircle overlay"
                  />
                  <span>Incircle (r)</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showCircumcircle}
                    onChange={(e)=>setShowCircumcircle(e.target.checked)}
                    className="rounded text-blue-600"
                    aria-label="Toggle circumcircle overlay"
                  />
                  <span>Circumcircle (R)</span>
                </label>
              </div>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderTriangleSVG()}
              </div>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Core Calculations", savedCoreItems, ()=>setSavedCoreItems([]), (id)=>setSavedCoreItems(savedCoreItems.filter(i=>i.id!==id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: TRIGONOMETRIC FUNCTIONS & RATIOS MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Trigonometric Functions &amp; Ratios Matrix (SOH CAH TOA)</span>
          <button
            type="button"
            onClick={handleSaveTrig}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer print:hidden no-print"
            aria-label="Save trig calculations"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedTrig ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-blue-600 text-white font-bold">
                  <th className="p-2.5">Trig Function</th>
                  <th className="p-2.5">Angle α ({resultCore.isValid ? `${resultCore.alphaDeg}°` : "—"})</th>
                  <th className="p-2.5">Angle β ({resultCore.isValid ? `${resultCore.betaDeg}°` : "—"})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
                <tr>
                  <td className="p-2 font-bold font-sans">Sine (sin = opp/hyp)</td>
                  <td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultCore.isValid ? `${resultCore.trigRatiosAlpha.sin} (${resultCore.trigRatiosAlpha.sinFrac})` : "—"}</td>
                  <td className="p-2 font-bold">{resultCore.isValid ? resultCore.trigRatiosBeta.sin : "—"}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold font-sans">Cosine (cos = adj/hyp)</td>
                  <td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultCore.isValid ? `${resultCore.trigRatiosAlpha.cos} (${resultCore.trigRatiosAlpha.cosFrac})` : "—"}</td>
                  <td className="p-2 font-bold">{resultCore.isValid ? resultCore.trigRatiosBeta.cos : "—"}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold font-sans">Tangent (tan = opp/adj)</td>
                  <td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultCore.isValid ? `${resultCore.trigRatiosAlpha.tan} (${resultCore.trigRatiosAlpha.tanFrac})` : "—"}</td>
                  <td className="p-2 font-bold">{resultCore.isValid ? resultCore.trigRatiosBeta.tan : "—"}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold font-sans">Cosecant (csc = hyp/opp)</td>
                  <td className="p-2 font-bold">{resultCore.isValid ? resultCore.trigRatiosAlpha.csc : "—"}</td>
                  <td className="p-2 font-bold">{resultCore.isValid ? resultCore.trigRatiosBeta.csc : "—"}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold font-sans">Secant (sec = hyp/adj)</td>
                  <td className="p-2 font-bold">{resultCore.isValid ? resultCore.trigRatiosAlpha.sec : "—"}</td>
                  <td className="p-2 font-bold">{resultCore.isValid ? resultCore.trigRatiosBeta.sec : "—"}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold font-sans">Cotangent (cot = adj/opp)</td>
                  <td className="p-2 font-bold">{resultCore.isValid ? resultCore.trigRatiosAlpha.cot : "—"}</td>
                  <td className="p-2 font-bold">{resultCore.isValid ? resultCore.trigRatiosBeta.cot : "—"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {renderSavedCardsGroup("Saved Trig Calculations", savedTrigItems, ()=>setSavedTrigItems([]), (id)=>setSavedTrigItems(savedTrigItems.filter(i=>i.id!==id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: GEOMETRIC INVARIANTS & LINES */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Geometric Invariants &amp; Lines Module</span>
          <button
            type="button"
            onClick={handleSaveGeom}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer print:hidden no-print"
            aria-label="Save geometric invariants"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedGeom ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono font-bold">
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Altitude h_c</span>
              <span className="text-red-600 dark:text-red-400 text-base">{resultCore.isValid ? resultCore.altitudeHc : "—"}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Inradius r</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-base">{resultCore.isValid ? resultCore.inradius : "—"}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Circumradius R</span>
              <span className="text-purple-600 dark:text-purple-400 text-base">{resultCore.isValid ? resultCore.circumradius : "—"}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Median m_c</span>
              <span className="text-blue-600 dark:text-blue-400 text-base">{resultCore.isValid ? resultCore.medianMc : "—"}</span>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Geometric Invariants", savedGeomItems, ()=>setSavedGeomItems([]), (id)=>setSavedGeomItems(savedGeomItems.filter(i=>i.id!==id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: SLOPE, GRADE & ROOF PITCH CONVERTER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Slope, Grade, and Roof Pitch Converter</span>
          <button
            type="button"
            onClick={handleSaveSlope}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer print:hidden no-print"
            aria-label="Save slope metrics"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSlope ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono font-bold">
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Grade / Incline %</span>
              <span className="text-blue-600 dark:text-blue-400 text-xl">{resultCore.isValid ? `${resultCore.gradePercent}%` : "—"}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Roof Pitch (Rise:Run)</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-xl">{resultCore.isValid ? resultCore.roofPitch : "—"}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Angle of Elevation</span>
              <span className="text-purple-600 dark:text-purple-400 text-xl">{resultCore.isValid ? `${resultCore.alphaDeg}°` : "—"}</span>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Slope Calculations", savedSlopeItems, ()=>setSavedSlopeItems([]), (id)=>setSavedSlopeItems(savedSlopeItems.filter(i=>i.id!==id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: MASTER RIGHT TRIANGLE UNIT CONVERTER MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Master Right Triangle Unit Converter Matrix</span>
          <button
            type="button"
            onClick={handleSaveConv}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer print:hidden no-print"
            aria-label="Save converter values"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedConv ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label htmlFor="rt-conv-val" className="block text-xs font-bold mb-1">Length Value:</label>
              <input
                id="rt-conv-val"
                type="number"
                step="any"
                value={convVal}
                onChange={(e)=>setConvVal(parseFloat(e.target.value)||0)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
              />
            </div>
            <div>
              <label htmlFor="rt-conv-unit" className="block text-xs font-bold mb-1">Base Unit:</label>
              <select
                id="rt-conv-unit"
                value={convUnit}
                onChange={(e)=>setConvUnit(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm"
              >
                <option value="meters">Meters (m)</option>
                <option value="cm">Centimeters (cm)</option>
                <option value="mm">Millimeters (mm)</option>
                <option value="feet">Feet (ft)</option>
                <option value="inches">Inches (in)</option>
                <option value="yards">Yards (yd)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-blue-600 text-white font-bold">
                  <th className="p-2.5">Unit</th>
                  <th className="p-2.5">Converted Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
                <tr><td className="p-2 font-bold font-sans">Meters (m)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultConv.meters}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Centimeters (cm)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultConv.cm}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Millimeters (mm)</td><td className="p-2 font-bold">{resultConv.mm}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Feet (ft)</td><td className="p-2 font-bold">{resultConv.feet}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Inches (in)</td><td className="p-2 font-bold">{resultConv.inches}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Yards (yd)</td><td className="p-2 font-bold">{resultConv.yards}</td></tr>
              </tbody>
            </table>
          </div>

          {renderSavedCardsGroup("Saved Converter Calculations", savedConvItems, ()=>setSavedConvItems([]), (id)=>setSavedConvItems(savedConvItems.filter(i=>i.id!==id)))}
        </div>
      </div>
    </div>
  );
}

export default RightTriangleCalculator;
