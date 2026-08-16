"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Zap,
  Triangle as TriangleIcon,
  Maximize2,
  Compass,
  CheckCircle2
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
  const [convUnit, setConvUnit] = useState<"meters" | "cm" | "mm" | "feet" | "inches">("meters");

  const [precision1, setPrecision1] = useState<number>(4);

  // Saved calculation states
  const [savedCoreItems, setSavedCoreItems] = useState<SavedRightTriItem[]>([]);
  const [justSavedCore, setJustSavedCore] = useState<boolean>(false);

  const [savedTrigItems, setSavedTrigItems] = useState<SavedRightTriItem[]>([]);
  const [justSavedTrig, setJustSavedTrig] = useState<boolean>(false);

  const [savedSpecialItems, setSavedSpecialItems] = useState<SavedRightTriItem[]>([]);
  const [justSavedSpecial, setJustSavedSpecial] = useState<boolean>(false);

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
      const s3 = localStorage.getItem("saved_rt_special"); if (s3) setSavedSpecialItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_rt_geom"); if (s4) setSavedGeomItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_rt_slope"); if (s5) setSavedSlopeItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_rt_conv"); if (s6) setSavedConvItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Card 1 Calculations
  const resultCore: RightTriangleResult = useMemo(() => {
    const numA = parseFloat(coreA);
    const numB = parseFloat(coreB);
    const numC = parseFloat(coreC);
    const numAlpha = parseFloat(coreAlpha);
    const numArea = parseFloat(coreArea);

    const valA = !isNaN(numA) && numA > 0 ? numA : undefined;
    const valB = !isNaN(numB) && numB > 0 ? numB : undefined;
    const valC = !isNaN(numC) && numC > 0 ? numC : undefined;
    const valAlpha = !isNaN(numAlpha) && numAlpha > 0 ? numAlpha : undefined;
    const valArea = !isNaN(numArea) && numArea > 0 ? numArea : undefined;

    return computeRightTriangleUniversal(valA, valB, valC, valAlpha, undefined, valArea, undefined, precision1);
  }, [coreA, coreB, coreC, coreAlpha, coreArea, precision1]);

  // Converter Calculations
  const resultConv = useMemo(() => {
    let m = convVal;
    if (convUnit === "cm") m = convVal / 100;
    else if (convUnit === "mm") m = convVal / 1000;
    else if (convUnit === "feet") m = convVal * 0.3048;
    else if (convUnit === "inches") m = convVal * 0.0254;
    return convertRightTriangleUnits(m, precision1);
  }, [convVal, convUnit, precision1]);

  // Presets Handlers
  const handleApplyPreset = (a: string, b: string, c: string, alpha: string = "") => {
    setCoreA(a); setCoreB(b); setCoreC(c); setCoreAlpha(alpha); setCoreArea("");
  };

  // Save Handlers
  const handleSaveCore = () => {
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
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedCoreItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedCoreItems(updated);
    try { localStorage.setItem("saved_rt_core", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCore(true); setTimeout(() => setJustSavedCore(false), 2000);
  };

  const handleSaveTrig = () => {
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
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedTrigItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedTrigItems(updated);
    try { localStorage.setItem("saved_rt_trig", JSON.stringify(updated)); } catch (e) {}
    setJustSavedTrig(true); setTimeout(() => setJustSavedTrig(false), 2000);
  };

  const handleSaveGeom = () => {
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
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedGeomItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedGeomItems(updated);
    try { localStorage.setItem("saved_rt_geom", JSON.stringify(updated)); } catch (e) {}
    setJustSavedGeom(true); setTimeout(() => setJustSavedGeom(false), 2000);
  };

  const handleSaveSlope = () => {
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
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedSlopeItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedSlopeItems(updated);
    try { localStorage.setItem("saved_rt_slope", JSON.stringify(updated)); } catch (e) {}
    setJustSavedSlope(true); setTimeout(() => setJustSavedSlope(false), 2000);
  };

  const handleSaveConv = () => {
    const inputsStr = `Length = ${convVal} ${convUnit}`;
    const resList = [
      `${resultConv.meters} meters`,
      `${resultConv.feet} feet`,
      `${resultConv.inches} inches`
    ];
    const newItem: SavedRightTriItem = {
      id: Date.now().toString(),
      title: `Converted Length = ${resultConv.meters} m`,
      inputs: inputsStr,
      operation: `Right Triangle Unit Matrix`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConvItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedConvItems(updated);
    try { localStorage.setItem("saved_rt_conv", JSON.stringify(updated)); } catch (e) {}
    setJustSavedConv(true); setTimeout(() => setJustSavedConv(false), 2000);
  };

  // Render Interactive True-to-Scale Vector SVG
  const renderTriangleSVG = () => {
    const width = 280; const height = 220;
    const ox = 50; const oy = 170;

    const clampedA = Math.min(6, Math.max(1.5, resultCore.a));
    const clampedB = Math.min(6, Math.max(1.5, resultCore.b));
    const scale = 20;

    const ax = ox; const ay = oy - clampedA * scale;
    const bx = ox + clampedB * scale; const by = oy;

    // Altitude foot D on hypotenuse AB
    const cVal = Math.sqrt(clampedA * clampedA + clampedB * clampedB);
    const projLen = (clampedB * clampedB) / cVal; // distance along base to projection
    const footX = ox + (projLen / clampedB) * (clampedB * scale);
    const footY = oy - (projLen / clampedB) * (clampedA * scale);

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-64 h-52">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />

        {/* Circumcircle Overlay */}
        {showCircumcircle && (
          <circle cx={(ox + bx) / 2} cy={(ay + by) / 2} r={(cVal * scale) / 2} fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3,3" />
        )}

        {/* Incircle Overlay */}
        {showIncircle && (
          <circle cx={ox + (resultCore.inradius * scale * 0.8)} cy={oy - (resultCore.inradius * scale * 0.8)} r={resultCore.inradius * scale * 0.8} fill="#16a34a" fillOpacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
        )}

        {/* Right Angle Box */}
        <path d={`M ${ox} ${oy - 12} L ${ox + 12} ${oy - 12} L ${ox + 12} ${oy}`} fill="none" stroke="#2563eb" strokeWidth="1.5" />

        {/* Triangle Polygon */}
        <polygon points={`${ox},${oy} ${ox},${ay} ${bx},${by}`} fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2.5" />

        {/* Altitude Overlay */}
        {showAltitude && (
          <line x1={ox} y1={oy} x2={footX} y2={footY} stroke="#dc2626" strokeWidth="2" strokeDasharray="2,2" />
        )}

        {/* Labels */}
        <text x={ox - 10} y={(oy + ay) / 2} textAnchor="end" className="text-[11px] font-mono font-bold fill-blue-600 dark:fill-blue-400">a={resultCore.a}</text>
        <text x={(ox + bx) / 2} y={oy + 16} textAnchor="middle" className="text-[11px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">b={resultCore.b}</text>
        <text x={(ox + bx) / 2 + 10} y={(ay + by) / 2 - 5} textAnchor="start" className="text-[11px] font-mono font-bold fill-purple-600 dark:fill-purple-400">c={resultCore.c}</text>

        <text x={ox + 6} y={ay + 20} className="text-[9px] font-mono font-bold fill-slate-500">α={resultCore.alphaDeg}°</text>
        <text x={bx - 28} y={by - 6} className="text-[9px] font-mono font-bold fill-slate-500">β={resultCore.betaDeg}°</text>
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
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
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
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                    title="Delete saved calculation"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
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
      {/* ========================================================================= */}
      {/* CARD 1: UNIVERSAL 2-PARAMETER RIGHT TRIANGLE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Universal 2-Parameter Right Triangle Solver</span>
          <button type="button" onClick={handleSaveCore} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCore ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className="text-slate-500 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" /> Quick Presets:
            </span>
            <button type="button" onClick={()=>handleApplyPreset("3","4","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">3-4-5</button>
            <button type="button" onClick={()=>handleApplyPreset("5","12","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">5-12-13</button>
            <button type="button" onClick={()=>handleApplyPreset("1","1","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">45°-45°-90°</button>
            <button type="button" onClick={()=>handleApplyPreset("1","","2")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">30°-60°-90°</button>
            <button type="button" onClick={()=>handleApplyPreset("1","12","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">1:12 ADA Ramp</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <p className="font-bold text-slate-500 mb-1">Enter any 2 parameters below:</p>
              <div><label className="font-bold block mb-1">Leg a (Opposite):</label><input type="number" step="any" placeholder="e.g. 5" value={coreA} onChange={(e)=>setCoreA(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              <div><label className="font-bold block mb-1">Leg b (Adjacent):</label><input type="number" step="any" placeholder="e.g. 12" value={coreB} onChange={(e)=>setCoreB(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              <div><label className="font-bold block mb-1">Hypotenuse c:</label><input type="number" step="any" placeholder="e.g. 13" value={coreC} onChange={(e)=>setCoreC(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              <div><label className="font-bold block mb-1">Angle α (°):</label><input type="number" step="any" placeholder="e.g. 22.62" value={coreAlpha} onChange={(e)=>setCoreAlpha(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Leg a</span><span className="text-blue-600 dark:text-blue-400">{resultCore.a}</span></div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Leg b</span><span className="text-emerald-600 dark:text-emerald-400">{resultCore.b}</span></div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Hypotenuse c</span><span className="text-purple-600 dark:text-purple-400">{resultCore.c}</span></div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-xs font-mono font-bold">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Angle α</span><span>{resultCore.alphaDeg}°</span></div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Angle β</span><span>{resultCore.betaDeg}°</span></div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Area K</span><span>{resultCore.area}</span></div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Perimeter P</span><span>{resultCore.perimeter}</span></div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                <label className="flex items-center gap-1 cursor-pointer font-bold text-slate-700 dark:text-slate-300"><input type="checkbox" checked={showAltitude} onChange={(e)=>setShowAltitude(e.target.checked)} className="rounded text-blue-600"/><span>Altitude (h_c)</span></label>
                <label className="flex items-center gap-1 cursor-pointer font-bold text-slate-700 dark:text-slate-300"><input type="checkbox" checked={showIncircle} onChange={(e)=>setShowIncircle(e.target.checked)} className="rounded text-blue-600"/><span>Incircle (r)</span></label>
                <label className="flex items-center gap-1 cursor-pointer font-bold text-slate-700 dark:text-slate-300"><input type="checkbox" checked={showCircumcircle} onChange={(e)=>setShowCircumcircle(e.target.checked)} className="rounded text-blue-600"/><span>Circumcircle (R)</span></label>
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
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Trigonometric Functions &amp; Ratios Matrix (SOH CAH TOA)</span>
          <button type="button" onClick={handleSaveTrig} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
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
                  <th className="p-2.5">Angle α ({resultCore.alphaDeg}°)</th>
                  <th className="p-2.5">Angle β ({resultCore.betaDeg}°)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
                <tr><td className="p-2 font-bold font-sans">Sine (sin = opp/hyp)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultCore.trigRatiosAlpha.sin} ({resultCore.trigRatiosAlpha.sinFrac})</td><td className="p-2 font-bold">{resultCore.trigRatiosBeta.sin}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Cosine (cos = adj/hyp)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultCore.trigRatiosAlpha.cos} ({resultCore.trigRatiosAlpha.cosFrac})</td><td className="p-2 font-bold">{resultCore.trigRatiosBeta.cos}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Tangent (tan = opp/adj)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultCore.trigRatiosAlpha.tan} ({resultCore.trigRatiosAlpha.tanFrac})</td><td className="p-2 font-bold">{resultCore.trigRatiosBeta.tan}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Cosecant (csc = hyp/opp)</td><td className="p-2 font-bold">{resultCore.trigRatiosAlpha.csc}</td><td className="p-2 font-bold">{resultCore.trigRatiosBeta.csc}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Secant (sec = hyp/adj)</td><td className="p-2 font-bold">{resultCore.trigRatiosAlpha.sec}</td><td className="p-2 font-bold">{resultCore.trigRatiosBeta.sec}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Cotangent (cot = adj/opp)</td><td className="p-2 font-bold">{resultCore.trigRatiosAlpha.cot}</td><td className="p-2 font-bold">{resultCore.trigRatiosBeta.cot}</td></tr>
              </tbody>
            </table>
          </div>

          {renderSavedCardsGroup("Saved Trig Calculations", savedTrigItems, ()=>setSavedTrigItems([]), (id)=>setSavedTrigItems(savedTrigItems.filter(i=>i.id!==id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: GEOMETRIC INVARIANTS & LINES */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Geometric Invariants &amp; Lines Module</span>
          <button type="button" onClick={handleSaveGeom} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedGeom ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono font-bold">
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Altitude h_c</span>
              <span className="text-red-600 dark:text-red-400 text-base">{resultCore.altitudeHc}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Inradius r</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-base">{resultCore.inradius}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Circumradius R</span>
              <span className="text-purple-600 dark:text-purple-400 text-base">{resultCore.circumradius}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Median m_c</span>
              <span className="text-blue-600 dark:text-blue-400 text-base">{resultCore.medianMc}</span>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Geometric Invariants", savedGeomItems, ()=>setSavedGeomItems([]), (id)=>setSavedGeomItems(savedGeomItems.filter(i=>i.id!==id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: SLOPE, GRADE & ROOF PITCH CONVERTER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Slope, Grade, and Roof Pitch Converter</span>
          <button type="button" onClick={handleSaveSlope} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSlope ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono font-bold">
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Grade / Incline %</span>
              <span className="text-blue-600 dark:text-blue-400 text-xl">{resultCore.gradePercent}%</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Roof Pitch (Rise:Run)</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-xl">{resultCore.roofPitch}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-sans">Angle of Elevation</span>
              <span className="text-purple-600 dark:text-purple-400 text-xl">{resultCore.alphaDeg}°</span>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Slope Calculations", savedSlopeItems, ()=>setSavedSlopeItems([]), (id)=>setSavedSlopeItems(savedSlopeItems.filter(i=>i.id!==id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 6: MASTER RIGHT TRIANGLE UNIT CONVERTER MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Master Right Triangle Unit Converter Matrix</span>
          <button type="button" onClick={handleSaveConv} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedConv ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold mb-1">Length Value:</label>
              <input type="number" step="any" value={convVal} onChange={(e)=>setConvVal(parseFloat(e.target.value)||0)} className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"/>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Base Unit:</label>
              <select value={convUnit} onChange={(e)=>setConvUnit(e.target.value as any)} className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm">
                <option value="meters">Meters (m)</option>
                <option value="cm">Centimeters (cm)</option>
                <option value="mm">Millimeters (mm)</option>
                <option value="feet">Feet (ft)</option>
                <option value="inches">Inches (in)</option>
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
