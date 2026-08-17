"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Zap,
  Maximize2,
  Compass,
  GitBranch
} from "lucide-react";
import {
  computeTwoPointSlope,
  computePointSlopeDistance,
  computeParallelPerpLine,
  TwoPointSlopeResult
} from "@/app/calculators/slope-calculator/slope-logic";

export interface SavedSlopeItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function SlopeCalculator() {
  // Card 1: Two-Point Slope Inputs
  const [x1, setX1] = useState<number>(1);
  const [y1, setY1] = useState<number>(1);
  const [x2, setX2] = useState<number>(4);
  const [y2, setY2] = useState<number>(7);
  const [precision1, setPrecision1] = useState<number>(4);

  // Card 2: Point, Slope & Distance Inputs
  const [ptX1, setPtX1] = useState<number>(1);
  const [ptY1, setPtY1] = useState<number>(1);
  const [dist, setDist] = useState<number>(5);
  const [ptKnownType, setPtKnownType] = useState<"slope" | "angle">("slope");
  const [ptVal, setPtVal] = useState<number>(0.75);

  // Card 3: Parallel & Perpendicular Line Inputs
  const [parM, setParM] = useState<number>(2);
  const [targetX, setTargetX] = useState<number>(3);
  const [targetY, setTargetY] = useState<number>(4);

  // Card 4: Angle Between 2 Intersecting Lines Inputs
  const [lineM1, setLineM1] = useState<number>(1);
  const [lineM2, setLineM2] = useState<number>(-2);

  // Saved calculation states
  const [savedTwoPtItems, setSavedTwoPtItems] = useState<SavedSlopeItem[]>([]);
  const [justSavedTwoPt, setJustSavedTwoPt] = useState<boolean>(false);

  const [savedPtDistItems, setSavedPtDistItems] = useState<SavedSlopeItem[]>([]);
  const [justSavedPtDist, setJustSavedPtDist] = useState<boolean>(false);

  const [savedParItems, setSavedParItems] = useState<SavedSlopeItem[]>([]);
  const [justSavedPar, setJustSavedPar] = useState<boolean>(false);

  const [savedAngleItems, setSavedAngleItems] = useState<SavedSlopeItem[]>([]);
  const [justSavedAngle, setJustSavedAngle] = useState<boolean>(false);

  // Expand state
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_slope_twopt"); if (s1) setSavedTwoPtItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_slope_ptdist"); if (s2) setSavedPtDistItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_slope_par"); if (s3) setSavedParItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_slope_angle"); if (s4) setSavedAngleItems(JSON.parse(s4));
    } catch (e) {}
  }, []);

  // Card 1 Calculation
  const twoPtResult: TwoPointSlopeResult = useMemo(() => {
    return computeTwoPointSlope(x1, y1, x2, y2, precision1);
  }, [x1, y1, x2, y2, precision1]);

  // Card 2 Calculation
  const ptDistResult = useMemo(() => {
    return computePointSlopeDistance(ptX1, ptY1, dist, ptKnownType, ptVal, precision1);
  }, [ptX1, ptY1, dist, ptKnownType, ptVal, precision1]);

  // Card 3 Calculation
  const parResult = useMemo(() => {
    return computeParallelPerpLine(parM, targetX, targetY, precision1);
  }, [parM, targetX, targetY, precision1]);

  // Card 4 Calculation (Angle between 2 lines)
  const angleBetweenResult = useMemo(() => {
    const denom = 1 + lineM1 * lineM2;
    let acuteRad = 0;
    if (Math.abs(denom) < 1e-9) {
      acuteRad = Math.PI / 2.0;
    } else {
      const tanTheta = Math.abs((lineM2 - lineM1) / denom);
      acuteRad = Math.atan(tanTheta);
    }
    const acuteDeg = (acuteRad * 180.0) / Math.PI;
    const obtuseDeg = 180.0 - acuteDeg;

    return {
      acuteDeg: acuteDeg.toFixed(precision1),
      obtuseDeg: obtuseDeg.toFixed(precision1),
      acuteRad: acuteRad.toFixed(precision1),
      tanTheta: Math.abs(denom) < 1e-9 ? "Undefined (90°)" : Math.abs((lineM2 - lineM1) / denom).toFixed(precision1)
    };
  }, [lineM1, lineM2, precision1]);

  // Presets Handler
  const handleApplyPreset = (preset: "steep" | "diagonal" | "down" | "vertical") => {
    if (preset === "steep") {
      setX1(1); setY1(1); setX2(4); setY2(7);
    } else if (preset === "diagonal") {
      setX1(0); setY1(0); setX2(5); setY2(5);
    } else if (preset === "down") {
      setX1(2); setY1(8); setX2(6); setY2(0);
    } else if (preset === "vertical") {
      setX1(3); setY1(4); setX2(3); setY2(10);
    }
  };

  // Save Handlers
  const handleSaveTwoPt = () => {
    const inputsStr = `Point 1 (${x1}, ${y1}), Point 2 (${x2}, ${y2})`;
    const resList = [
      `Slope m = ${twoPtResult.isVertical ? "Undefined" : twoPtResult.slope}`,
      `Angle θ = ${twoPtResult.angleDeg}°`,
      `Distance d = ${twoPtResult.distance}`,
      `Line Equation: ${twoPtResult.slopeInterceptForm}`
    ];
    const newItem: SavedSlopeItem = {
      id: Date.now().toString(),
      title: `Slope m = ${twoPtResult.isVertical ? "Undefined" : twoPtResult.slope}`,
      inputs: inputsStr,
      operation: `Two-Point Slope`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedTwoPtItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedTwoPtItems(updated);
    try { localStorage.setItem("saved_slope_twopt", JSON.stringify(updated)); } catch (e) {}
    setJustSavedTwoPt(true); setTimeout(() => setJustSavedTwoPt(false), 2000);
  };

  const handleSavePtDist = () => {
    const inputsStr = `Point (${ptX1}, ${ptY1}), d = ${dist}, ${ptKnownType} = ${ptVal}`;
    const resList = [
      `Endpoint (x2, y2) = (${ptDistResult.x2}, ${ptDistResult.y2})`,
      `Slope m = ${ptDistResult.slope}`,
      `Angle θ = ${ptDistResult.angleDeg}°`
    ];
    const newItem: SavedSlopeItem = {
      id: Date.now().toString(),
      title: `Endpoint (${ptDistResult.x2}, ${ptDistResult.y2})`,
      inputs: inputsStr,
      operation: `Point-Slope Distance`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedPtDistItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedPtDistItems(updated);
    try { localStorage.setItem("saved_slope_ptdist", JSON.stringify(updated)); } catch (e) {}
    setJustSavedPtDist(true); setTimeout(() => setJustSavedPtDist(false), 2000);
  };

  const handleSavePar = () => {
    const inputsStr = `Original Slope m = ${parM}, Point (${targetX}, ${targetY})`;
    const resList = [
      `Parallel: ${parResult.parallelEq}`,
      `Perpendicular: ${parResult.perpEq}`
    ];
    const newItem: SavedSlopeItem = {
      id: Date.now().toString(),
      title: `Parallel Line: ${parResult.parallelEq}`,
      inputs: inputsStr,
      operation: `Parallel & Perpendicular`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedParItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedParItems(updated);
    try { localStorage.setItem("saved_slope_par", JSON.stringify(updated)); } catch (e) {}
    setJustSavedPar(true); setTimeout(() => setJustSavedPar(false), 2000);
  };

  const handleSaveAngle = () => {
    const inputsStr = `m1 = ${lineM1}, m2 = ${lineM2}`;
    const resList = [
      `Acute Angle = ${angleBetweenResult.acuteDeg}°`,
      `Obtuse Angle = ${angleBetweenResult.obtuseDeg}°`
    ];
    const newItem: SavedSlopeItem = {
      id: Date.now().toString(),
      title: `Angle Between Lines = ${angleBetweenResult.acuteDeg}°`,
      inputs: inputsStr,
      operation: `Angle Between Lines`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedAngleItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedAngleItems(updated);
    try { localStorage.setItem("saved_slope_angle", JSON.stringify(updated)); } catch (e) {}
    setJustSavedAngle(true); setTimeout(() => setJustSavedAngle(false), 2000);
  };

  // Render 2D Cartesian Coordinate Plane SVG Diagram with Notation
  const renderCartesianSVG = (px1: number, py1: number, px2: number, py2: number) => {
    const width = 240; const height = 180;
    const padding = 25;

    const minX = Math.min(px1, px2, 0) - 2;
    const maxX = Math.max(px1, px2, 0) + 2;
    const minY = Math.min(py1, py2, 0) - 2;
    const maxY = Math.max(py1, py2, 0) + 2;

    const scaleX = (x: number) => padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);
    const scaleY = (y: number) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);

    const x1Svg = scaleX(px1); const y1Svg = scaleY(py1);
    const x2Svg = scaleX(px2); const y2Svg = scaleY(py2);
    const originX = scaleX(0); const originY = scaleY(0);

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />

        {/* X and Y Axes */}
        <line x1={padding} y1={originY} x2={width - padding} y2={originY} stroke="#94a3b8" strokeWidth="1.5" />
        <line x1={originX} y1={padding} x2={originX} y2={height - padding} stroke="#94a3b8" strokeWidth="1.5" />
        <text x={width - padding + 5} y={originY + 4} className="text-[9px] font-mono font-bold fill-slate-500">X</text>
        <text x={originX - 3} y={padding - 5} className="text-[9px] font-mono font-bold fill-slate-500">Y</text>

        {/* Rise (Δy) line */}
        <line x1={x2Svg} y1={y1Svg} x2={x2Svg} y2={y2Svg} stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
        <text x={x2Svg + 6} y={(y1Svg + y2Svg) / 2} className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">Δy</text>

        {/* Run (Δx) line */}
        <line x1={x1Svg} y1={y1Svg} x2={x2Svg} y2={y1Svg} stroke="#2563eb" strokeWidth="2" strokeDasharray="3,3" />
        <text x={(x1Svg + x2Svg) / 2} y={y1Svg + 12} textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">Δx</text>

        {/* Hypotenuse (Distance d) / Slope Line */}
        <line x1={x1Svg} y1={y1Svg} x2={x2Svg} y2={y2Svg} stroke="#16a34a" strokeWidth="2.5" />
        <text x={(x1Svg + x2Svg) / 2 - 8} y={(y1Svg + y2Svg) / 2 - 8} className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">d</text>

        {/* Point 1 */}
        <circle cx={x1Svg} cy={y1Svg} r="4" fill="#2563eb" />
        <text x={x1Svg - 12} y={y1Svg - 6} className="text-[9px] font-mono font-bold fill-blue-700 dark:fill-blue-300">(x1, y1)</text>

        {/* Point 2 */}
        <circle cx={x2Svg} cy={y2Svg} r="4" fill="#16a34a" />
        <text x={x2Svg + 6} y={y2Svg - 6} className="text-[9px] font-mono font-bold fill-emerald-700 dark:fill-emerald-300">(x2, y2)</text>
      </svg>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: TWO-POINT SLOPE & LINE EQUATION ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Two-Point Slope &amp; Line Equation Engine</span>
          <button
            type="button"
            onClick={handleSaveTwoPt}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedTwoPt ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* QUICK PRESETS BAR */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className="text-slate-500 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" /> Presets:
            </span>
            <button
              type="button"
              onClick={() => handleApplyPreset("steep")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (1, 1) to (4, 7) [m = 2]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("diagonal")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (0, 0) to (5, 5) [45° Incline]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("down")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (2, 8) to (6, 0) [Negative Slope]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("vertical")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (3, 4) to (3, 10) [Vertical Line]
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: POINT INPUTS */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span>Known 2D Coordinates</span>
              </h2>

              <div className="space-y-4 text-xs">
                {/* POINT 1 INPUTS */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-extrabold text-blue-600 dark:text-blue-400 block">Point 1 Coordinates (X₁, Y₁)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">X₁:</label>
                      <input
                        type="number"
                        step="any"
                        value={x1}
                        onChange={(e) => setX1(parseFloat(e.target.value) || 0)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Y₁:</label>
                      <input
                        type="number"
                        step="any"
                        value={y1}
                        onChange={(e) => setY1(parseFloat(e.target.value) || 0)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* POINT 2 INPUTS */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block">Point 2 Coordinates (X₂, Y₂)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">X₂:</label>
                      <input
                        type="number"
                        step="any"
                        value={x2}
                        onChange={(e) => setX2(parseFloat(e.target.value) || 0)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Y₂:</label>
                      <input
                        type="number"
                        step="any"
                        value={y2}
                        onChange={(e) => setY2(parseFloat(e.target.value) || 0)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* PRECISION TOGGLE */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Display Decimals:</span>
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

            {/* RIGHT COLUMN: DASHBOARD & CARTESIAN SVG */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Calculated Slope (m)
                  </span>
                  <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-slate-100 break-all">
                    {twoPtResult.isVertical ? "UNDEFINED (Vertical Line)" : twoPtResult.slope}
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Line Equation: <span className="text-blue-600 dark:text-blue-400">{twoPtResult.slopeInterceptForm}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Incline Angle θ</span>
                    <span className="text-slate-900 dark:text-slate-100">{twoPtResult.angleDeg}°</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Distance (d)</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{twoPtResult.distance}</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Rise (Δy)</span>
                    <span className="text-red-600 dark:text-red-400">{twoPtResult.deltaY}</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Run (Δx)</span>
                    <span className="text-blue-600 dark:text-blue-400">{twoPtResult.deltaX}</span>
                  </div>
                </div>

                {/* 2D CARTESIAN SVG VISUALIZER WITH NOTATION */}
                <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  {renderCartesianSVG(x1, y1, x2, y2)}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED CALCULATIONS INSIDE CARD 1 */}
          {savedTwoPtItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Two-Point Slope Calculations ({savedTwoPtItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedTwoPtItems([]);
                    try { localStorage.removeItem("saved_slope_twopt"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedTwoPtItems.map((item) => {
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
                            const updated = savedTwoPtItems.filter(i => i.id !== item.id);
                            setSavedTwoPtItems(updated);
                            try { localStorage.setItem("saved_slope_twopt", JSON.stringify(updated)); } catch(e){}
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
                              Complete Derivation Details:
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
      {/* CARD 2: POINT, SLOPE & DISTANCE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Point, Slope &amp; Distance Endpoint Solver</span>
          <button
            type="button"
            onClick={handleSavePtDist}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedPtDist ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <Compass className="h-4 w-4 text-blue-600" />
                <span>Known Point &amp; Slope Input</span>
              </h2>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">X₁:</label>
                  <input
                    type="number"
                    step="any"
                    value={ptX1}
                    onChange={(e) => setPtX1(parseFloat(e.target.value) || 0)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Y₁:</label>
                  <input
                    type="number"
                    step="any"
                    value={ptY1}
                    onChange={(e) => setPtY1(parseFloat(e.target.value) || 0)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Line Distance (d):</label>
                <input
                  type="number"
                  step="any"
                  value={dist}
                  onChange={(e) => setDist(parseFloat(e.target.value) || 0.1)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold mb-1">Select Known Vector Type:</label>
                <div className="flex bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setPtKnownType("slope")}
                    className={`flex-1 py-1 rounded cursor-pointer ${ptKnownType === "slope" ? "bg-blue-600 text-white" : ""}`}
                  >
                    Slope (m)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPtKnownType("angle")}
                    className={`flex-1 py-1 rounded cursor-pointer ${ptKnownType === "angle" ? "bg-blue-600 text-white" : ""}`}
                  >
                    Incline Angle (θ°)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Enter {ptKnownType === "slope" ? "Slope (m)" : "Angle (θ°)"}:</label>
                <input
                  type="number"
                  step="any"
                  value={ptVal}
                  onChange={(e) => setPtVal(parseFloat(e.target.value) || 0)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Solved Endpoint (X₂, Y₂)</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                ({ptDistResult.x2}, {ptDistResult.y2})
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Slope m = {ptDistResult.slope} | Incline Angle θ = {ptDistResult.angleDeg}°
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderCartesianSVG(ptX1, ptY1, ptDistResult.x2, ptDistResult.y2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: PARALLEL & PERPENDICULAR LINE GENERATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Parallel &amp; Perpendicular Line Generator</span>
          <button
            type="button"
            onClick={handleSavePar}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedPar ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <GitBranch className="h-4 w-4 text-blue-600" />
                <span>Line &amp; Target Point Input</span>
              </h2>

              <div>
                <label className="block font-bold mb-1">Original Line Slope (m):</label>
                <input
                  type="number"
                  step="any"
                  value={parM}
                  onChange={(e) => setParM(parseFloat(e.target.value) || 0)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Target X₀:</label>
                  <input
                    type="number"
                    step="any"
                    value={targetX}
                    onChange={(e) => setTargetX(parseFloat(e.target.value) || 0)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Target Y₀:</label>
                  <input
                    type="number"
                    step="any"
                    value={targetY}
                    onChange={(e) => setTargetY(parseFloat(e.target.value) || 0)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs font-extrabold text-blue-600 uppercase block">Parallel Line Equation</span>
                <div className="text-xl font-mono font-black text-slate-900 dark:text-slate-100">{parResult.parallelEq}</div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs font-extrabold text-emerald-600 uppercase block">Perpendicular Line Equation</span>
                <div className="text-xl font-mono font-black text-slate-900 dark:text-slate-100">{parResult.perpEq}</div>
                <p className="text-xs font-mono font-bold text-slate-500">Perpendicular Slope m⊥ = {parResult.perpSlope}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: ANGLE BETWEEN 2 INTERSECTING LINES ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Angle Between 2 Intersecting Lines Engine</span>
          <button
            type="button"
            onClick={handleSaveAngle}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedAngle ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <label className="block font-bold mb-1">Line 1 Slope (m₁):</label>
              <input
                type="number"
                step="any"
                value={lineM1}
                onChange={(e) => setLineM1(parseFloat(e.target.value) || 0)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Line 2 Slope (m₂):</label>
              <input
                type="number"
                step="any"
                value={lineM2}
                onChange={(e) => setLineM2(parseFloat(e.target.value) || 0)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <span className="text-xs font-extrabold uppercase text-blue-600 block">Acute Intersection Angle</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">{angleBetweenResult.acuteDeg}°</div>
              <span className="text-xs font-mono font-bold text-slate-400">{angleBetweenResult.acuteRad} radians</span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <span className="text-xs font-extrabold uppercase text-purple-600 block">Obtuse Intersection Angle</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">{angleBetweenResult.obtuseDeg}°</div>
              <span className="text-xs font-mono font-bold text-slate-400">tan(θ) = {angleBetweenResult.tanTheta}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlopeCalculator;
