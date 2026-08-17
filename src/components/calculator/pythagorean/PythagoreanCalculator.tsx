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
  CheckCircle2,
  Sparkles
} from "lucide-react";
import {
  computePythagoreanCore,
  compute3DPythagorean,
  convertPythagoreanUnits,
  PythagoreanCoreResult,
  Pythagorean3DResult
} from "@/app/calculators/pythagorean-theorem-calculator/pythagorean-logic";

export interface SavedPythagoreanItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  timestamp: string;
}

export function PythagoreanCalculator() {
  // Card 1: Core Inputs (Enter any 2 of a, b, c)
  const [coreA, setCoreA] = useState<string>("3");
  const [coreB, setCoreB] = useState<string>("4");
  const [coreC, setCoreC] = useState<string>("");
  const [showSquares, setShowSquares] = useState<boolean>(true);

  // Card 2: Side + Angle Inputs
  const [saSideType, setSaSideType] = useState<"a" | "b" | "c">("a");
  const [saSideVal, setSaSideVal] = useState<number>(5);
  const [saAngleDeg, setSaAngleDeg] = useState<number>(30);

  // Card 3: 3D Distance Inputs
  const [distX, setDistX] = useState<number>(3);
  const [distY, setDistY] = useState<number>(4);
  const [distZ, setDistZ] = useState<number>(12);

  // Card 4: Euclid Generator Inputs
  const [euclidM, setEuclidM] = useState<number>(2);
  const [euclidN, setEuclidN] = useState<number>(1);

  // Card 5: Converter Inputs
  const [convVal, setConvVal] = useState<number>(5);
  const [convUnit, setConvUnit] = useState<"meters" | "cm" | "mm" | "feet" | "inches">("meters");

  const [precision1, setPrecision1] = useState<number>(4);

  // Saved items states
  const [savedCoreItems, setSavedCoreItems] = useState<SavedPythagoreanItem[]>([]);
  const [justSavedCore, setJustSavedCore] = useState<boolean>(false);

  const [savedSaItems, setSavedSaItems] = useState<SavedPythagoreanItem[]>([]);
  const [justSavedSa, setJustSavedSa] = useState<boolean>(false);

  const [saved3DItems, setSaved3DItems] = useState<SavedPythagoreanItem[]>([]);
  const [justSaved3D, setJustSaved3D] = useState<boolean>(false);

  const [savedGenItems, setSavedGenItems] = useState<SavedPythagoreanItem[]>([]);
  const [justSavedGen, setJustSavedGen] = useState<boolean>(false);

  const [savedConvItems, setSavedConvItems] = useState<SavedPythagoreanItem[]>([]);
  const [justSavedConv, setJustSavedConv] = useState<boolean>(false);

  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_pyth_core"); if (s1) setSavedCoreItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_pyth_sa"); if (s2) setSavedSaItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_pyth_3d"); if (s3) setSaved3DItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_pyth_gen"); if (s4) setSavedGenItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_pyth_conv"); if (s5) setSavedConvItems(JSON.parse(s5));
    } catch (e) {}
  }, []);

  // Card 1 Calculations
  const resultCore: PythagoreanCoreResult = useMemo(() => {
    const numA = parseFloat(coreA);
    const numB = parseFloat(coreB);
    const numC = parseFloat(coreC);

    const valA = !isNaN(numA) && numA > 0 ? numA : undefined;
    const valB = !isNaN(numB) && numB > 0 ? numB : undefined;
    const valC = !isNaN(numC) && numC > 0 ? numC : undefined;

    return computePythagoreanCore(valA, valB, valC, precision1);
  }, [coreA, coreB, coreC, precision1]);

  // Card 2 Calculations (Side + Angle)
  const resultSA: PythagoreanCoreResult = useMemo(() => {
    const rad = (saAngleDeg * Math.PI) / 180.0;
    let a = 0; let b = 0; let c = 0;

    if (saSideType === "c") {
      c = saSideVal;
      a = c * Math.sin(rad);
      b = c * Math.cos(rad);
    } else if (saSideType === "a") {
      a = saSideVal;
      c = a / Math.sin(rad);
      b = Math.sqrt(Math.max(0, c * c - a * a));
    } else {
      b = saSideVal;
      c = b / Math.cos(rad);
      a = Math.sqrt(Math.max(0, c * c - b * b));
    }

    return computePythagoreanCore(a, b, c, precision1);
  }, [saSideType, saSideVal, saAngleDeg, precision1]);

  // Card 3 Calculations
  const result3D: Pythagorean3DResult = useMemo(() => {
    return compute3DPythagorean(distX, distY, distZ, precision1);
  }, [distX, distY, distZ, precision1]);

  // Card 4 Euclid Triple Calculations
  const resultEuclid = useMemo(() => {
    const m = Math.max(2, Math.round(euclidM));
    const n = Math.max(1, Math.min(m - 1, Math.round(euclidN)));
    const a = m * m - n * n;
    const b = 2 * m * n;
    const c = m * m + n * n;
    return { m, n, a, b, c };
  }, [euclidM, euclidN]);

  // Card 5 Converter Calculations
  const resultConv = useMemo(() => {
    let m = convVal;
    if (convUnit === "cm") m = convVal / 100;
    else if (convUnit === "mm") m = convVal / 1000;
    else if (convUnit === "feet") m = convVal * 0.3048;
    else if (convUnit === "inches") m = convVal * 0.0254;
    return convertPythagoreanUnits(m, precision1);
  }, [convVal, convUnit, precision1]);

  // Presets Handlers
  const handleApplyPreset = (aStr: string, bStr: string, cStr: string) => {
    setCoreA(aStr); setCoreB(bStr); setCoreC(cStr);
  };

  // Save Handlers
  const handleSaveCore = () => {
    const inputsStr = `a = ${resultCore.a}, b = ${resultCore.b}, c = ${resultCore.c}`;
    const resList = [
      `Hypotenuse c = ${resultCore.c} (${resultCore.exactRadicalC || resultCore.c})`,
      `Area A = ${resultCore.area}`,
      `Perimeter P = ${resultCore.perimeter}`,
      `Angles α = ${resultCore.alphaDeg}°, β = ${resultCore.betaDeg}°`,
      `Altitude h_c = ${resultCore.altitudeHc}`,
      `Inradius r = ${resultCore.inradius}, Circumradius R = ${resultCore.circumradius}`
    ];
    const newItem: SavedPythagoreanItem = {
      id: Date.now().toString(),
      title: `Right Triangle (${resultCore.a}, ${resultCore.b}, ${resultCore.c})`,
      inputs: inputsStr,
      operation: `Core Pythagorean Theorem`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedCoreItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedCoreItems(updated);
    try { localStorage.setItem("saved_pyth_core", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCore(true); setTimeout(() => setJustSavedCore(false), 2000);
  };

  const handleSaveSA = () => {
    const inputsStr = `${saSideType.toUpperCase()} = ${saSideVal}, Angle θ = ${saAngleDeg}°`;
    const resList = [
      `Solved a = ${resultSA.a}, b = ${resultSA.b}, c = ${resultSA.c}`,
      `Area = ${resultSA.area}`,
      `Perimeter = ${resultSA.perimeter}`
    ];
    const newItem: SavedPythagoreanItem = {
      id: Date.now().toString(),
      title: `Side-Angle c = ${resultSA.c}`,
      inputs: inputsStr,
      operation: `Side + Acute Angle Solver`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedSaItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedSaItems(updated);
    try { localStorage.setItem("saved_pyth_sa", JSON.stringify(updated)); } catch (e) {}
    setJustSavedSa(true); setTimeout(() => setJustSavedSa(false), 2000);
  };

  const handleSave3D = () => {
    const inputsStr = `X = ${distX}, Y = ${distY}, Z = ${distZ}`;
    const resList = [
      `3D Space Distance d_3D = ${result3D.spaceDiag3D} (${result3D.exactRadical3D})`,
      `2D Base Diagonal d_2D = ${result3D.baseDiag2D}`
    ];
    const newItem: SavedPythagoreanItem = {
      id: Date.now().toString(),
      title: `3D Distance d = ${result3D.spaceDiag3D}`,
      inputs: inputsStr,
      operation: `3D Pythagorean Distance`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...saved3DItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSaved3DItems(updated);
    try { localStorage.setItem("saved_pyth_3d", JSON.stringify(updated)); } catch (e) {}
    setJustSaved3D(true); setTimeout(() => setJustSaved3D(false), 2000);
  };

  const handleSaveGen = () => {
    const inputsStr = `m = ${resultEuclid.m}, n = ${resultEuclid.n}`;
    const resList = [
      `Generated Triple: (${resultEuclid.a}, ${resultEuclid.b}, ${resultEuclid.c})`,
      `a² + b² = ${resultEuclid.a * resultEuclid.a} + ${resultEuclid.b * resultEuclid.b} = ${resultEuclid.c * resultEuclid.c}`
    ];
    const newItem: SavedPythagoreanItem = {
      id: Date.now().toString(),
      title: `Triple (${resultEuclid.a}, ${resultEuclid.b}, ${resultEuclid.c})`,
      inputs: inputsStr,
      operation: `Euclid Triple Generator`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedGenItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedGenItems(updated);
    try { localStorage.setItem("saved_pyth_gen", JSON.stringify(updated)); } catch (e) {}
    setJustSavedGen(true); setTimeout(() => setJustSavedGen(false), 2000);
  };

  const handleSaveConv = () => {
    const inputsStr = `Length = ${convVal} ${convUnit}`;
    const resList = [
      `${resultConv.meters} meters`,
      `${resultConv.feet} feet`,
      `${resultConv.inches} inches`
    ];
    const newItem: SavedPythagoreanItem = {
      id: Date.now().toString(),
      title: `Converted Length = ${resultConv.meters} m`,
      inputs: inputsStr,
      operation: `Pythagorean Unit Matrix`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConvItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedConvItems(updated);
    try { localStorage.setItem("saved_pyth_conv", JSON.stringify(updated)); } catch (e) {}
    setJustSavedConv(true); setTimeout(() => setJustSavedConv(false), 2000);
  };

  // Render Interactive Dynamic SVG Right Triangle (with optional a², b², c² proof squares)
  const renderTriangleSVG = () => {
    const width = 280; const height = 220;
    const isSquares = showSquares;

    // Fixed base origin
    const ox = isSquares ? 90 : 50;
    const oy = isSquares ? 150 : 170;

    // Scaled dimensions
    const scale = isSquares ? 12 : 20;
    const clampedA = Math.min(6, Math.max(1.5, resultCore.a));
    const clampedB = Math.min(6, Math.max(1.5, resultCore.b));

    const ax = ox; const ay = oy - clampedA * scale; // top vertex
    const bx = ox + clampedB * scale; const by = oy; // right vertex

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-64 h-52">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />

        {/* Proof Squares if enabled */}
        {isSquares && (
          <>
            {/* Square on side a (left) */}
            <rect x={ox - clampedA * scale} y={ay} width={clampedA * scale} height={clampedA * scale} fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3,3" />
            {/* Square on side b (bottom) */}
            <rect x={ox} y={oy} width={clampedB * scale} height={clampedB * scale} fill="#16a34a" fillOpacity="0.15" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3,3" />
          </>
        )}

        {/* Right Angle Corner Box */}
        <path d={`M ${ox} ${oy - 12} L ${ox + 12} ${oy - 12} L ${ox + 12} ${oy}`} fill="none" stroke="#2563eb" strokeWidth="1.5" />

        {/* Triangle Polygon */}
        <polygon points={`${ox},${oy} ${ox},${ay} ${bx},${by}`} fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2.5" />

        {/* Side Labels */}
        <text x={ox - 10} y={(oy + ay) / 2} textAnchor="end" className="text-[11px] font-mono font-bold fill-blue-600 dark:fill-blue-400">a = {resultCore.a}</text>
        <text x={(ox + bx) / 2} y={oy + 16} textAnchor="middle" className="text-[11px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">b = {resultCore.b}</text>
        <text x={(ox + bx) / 2 + 10} y={(ay + by) / 2 - 5} textAnchor="start" className="text-[11px] font-mono font-bold fill-purple-600 dark:fill-purple-400">c = {resultCore.c}</text>

        {/* Angle Labels */}
        <text x={ox + 6} y={ay + 20} className="text-[9px] font-mono font-bold fill-slate-500">α={resultCore.alphaDeg}°</text>
        <text x={bx - 28} y={by - 6} className="text-[9px] font-mono font-bold fill-slate-500">β={resultCore.betaDeg}°</text>
      </svg>
    );
  };

  const renderSavedCardsGroup = (
    title: string,
    items: SavedPythagoreanItem[],
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
      {/* CARD 1: CORE PYTHAGOREAN THEOREM SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Core Pythagorean Theorem Solver (a² + b² = c²)</span>
          <button type="button" onClick={handleSaveCore} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCore ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className="text-slate-500 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" /> Presets:
            </span>
            <button type="button" onClick={()=>handleApplyPreset("3","4","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">3-4-5</button>
            <button type="button" onClick={()=>handleApplyPreset("5","12","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">5-12-13</button>
            <button type="button" onClick={()=>handleApplyPreset("8","15","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">8-15-17</button>
            <button type="button" onClick={()=>handleApplyPreset("7","24","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">7-24-25</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <p className="font-bold text-slate-500 mb-1">Enter any 2 values to compute the 3rd side:</p>
              <div><label className="font-bold block mb-1">Side a (Leg):</label><input type="number" step="any" placeholder="e.g. 3" value={coreA} onChange={(e)=>setCoreA(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              <div><label className="font-bold block mb-1">Side b (Leg):</label><input type="number" step="any" placeholder="e.g. 4" value={coreB} onChange={(e)=>setCoreB(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              <div><label className="font-bold block mb-1">Side c (Hypotenuse):</label><input type="number" step="any" placeholder="e.g. 5" value={coreC} onChange={(e)=>setCoreC(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              <button type="button" onClick={()=>handleApplyPreset("","","")} className="text-xs text-red-600 font-semibold cursor-pointer">Clear Inputs</button>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Side a</span><span className="text-blue-600 dark:text-blue-400">{resultCore.a}</span></div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Side b</span><span className="text-emerald-600 dark:text-emerald-400">{resultCore.b}</span></div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Hypotenuse c</span><span className="text-purple-600 dark:text-purple-400">{resultCore.c}</span><span className="text-[9px] text-slate-400 block font-sans">({resultCore.exactRadicalC || resultCore.exactRadicalLeg || resultCore.c})</span></div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Area A</span><span>{resultCore.area}</span></div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Perimeter P</span><span>{resultCore.perimeter}</span></div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Altitude h_c</span><span>{resultCore.altitudeHc}</span></div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-700 dark:text-slate-300">
                  <input type="checkbox" checked={showSquares} onChange={(e)=>setShowSquares(e.target.checked)} className="rounded text-blue-600"/>
                  <span>Show a², b², c² Proof Squares</span>
                </label>
                {resultCore.isTriple && (
                  <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3"/> {resultCore.isPrimitiveTriple ? "Primitive Triple" : "Pythagorean Triple"}
                  </span>
                )}
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
      {/* CARD 2: SIDE + ACUTE ANGLE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Side + Acute Angle Right Triangle Solver</span>
          <button type="button" onClick={handleSaveSA} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSa ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Known Side:</label>
                <select value={saSideType} onChange={(e)=>setSaSideType(e.target.value as any)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                  <option value="a">Leg a</option>
                  <option value="b">Leg b</option>
                  <option value="c">Hypotenuse c</option>
                </select>
              </div>

              <div><label className="font-bold block mb-1">Side Length:</label><input type="number" step="any" value={saSideVal} onChange={(e)=>setSaSideVal(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              <div><label className="font-bold block mb-1">Acute Angle θ (°):</label><input type="number" step="any" value={saAngleDeg} onChange={(e)=>setSaAngleDeg(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Solved Triangle Metrics</span>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Side a</span><span className="text-blue-600 dark:text-blue-400">{resultSA.a}</span></div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Side b</span><span className="text-emerald-600 dark:text-emerald-400">{resultSA.b}</span></div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Hypotenuse c</span><span className="text-purple-600 dark:text-purple-400">{resultSA.c}</span></div>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Area = {resultSA.area} | Perimeter = {resultSA.perimeter}
              </p>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Side-Angle Calculations", savedSaItems, ()=>setSavedSaItems([]), (id)=>setSavedSaItems(savedSaItems.filter(i=>i.id!==id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: 3D PYTHAGOREAN DISTANCE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>3D Pythagorean Distance Solver (d = √(x² + y² + z²))</span>
          <button type="button" onClick={handleSave3D} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSaved3D ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div><label className="font-bold block mb-1">X Offset:</label><input type="number" value={distX} onChange={(e)=>setDistX(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
                <div><label className="font-bold block mb-1">Y Offset:</label><input type="number" value={distY} onChange={(e)=>setDistY(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
                <div><label className="font-bold block mb-1">Z Offset:</label><input type="number" value={distZ} onChange={(e)=>setDistZ(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">3D Space Distance</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {result3D.spaceDiag3D} <span className="text-base text-blue-600">({result3D.exactRadical3D})</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                2D Base Diagonal d_2D = {result3D.baseDiag2D}
              </p>
            </div>
          </div>

          {renderSavedCardsGroup("Saved 3D Calculations", saved3DItems, ()=>setSaved3DItems([]), (id)=>setSaved3DItems(saved3DItems.filter(i=>i.id!==id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: PYTHAGOREAN TRIPLE GENERATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Euclid Pythagorean Triple Generator (a = m² - n², b = 2mn, c = m² + n²)</span>
          <button type="button" onClick={handleSaveGen} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedGen ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div><label className="font-bold block mb-1">Parameter m (m &gt; n):</label><input type="number" value={euclidM} onChange={(e)=>setEuclidM(parseFloat(e.target.value)||2)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
                <div><label className="font-bold block mb-1">Parameter n:</label><input type="number" value={euclidN} onChange={(e)=>setEuclidN(parseFloat(e.target.value)||1)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Generated Primitive Triple</span>
              <div className="text-2xl font-mono font-black text-slate-900 dark:text-slate-100">
                ({resultEuclid.a}, {resultEuclid.b}, {resultEuclid.c})
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                {resultEuclid.a}² + {resultEuclid.b}² = {resultEuclid.a * resultEuclid.a} + {resultEuclid.b * resultEuclid.b} = {resultEuclid.c * resultEuclid.c} ({resultEuclid.c}²)
              </p>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Generated Triples", savedGenItems, ()=>setSavedGenItems([]), (id)=>setSavedGenItems(savedGenItems.filter(i=>i.id!==id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: MASTER PYTHAGOREAN UNIT CONVERTER MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Master Pythagorean Unit Converter Matrix</span>
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

export default PythagoreanCalculator;
