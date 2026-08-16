"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Zap,
  Circle as CircleIcon,
  PieChart,
  Maximize2,
  Layers,
  Compass
} from "lucide-react";
import {
  computeCoreCircle,
  computeSector,
  computeSegment,
  computeAnnulus,
  computeCircleEquation,
  computeThreePointCircle,
  convertCircleUnits,
  CoreCircleResult,
  SectorResult,
  SegmentResult,
  AnnulusResult,
  CircleEquationResult,
  ThreePointCircleResult
} from "@/app/calculators/circle-calculator/circle-logic";

export interface SavedCircleItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  timestamp: string;
}

export function CircleCalculator() {
  // Card 1: Core Circle Inputs
  const [coreMode, setCoreMode] = useState<"r" | "d" | "c" | "a">("r");
  const [coreVal, setCoreVal] = useState<number>(5);
  const [precision1, setPrecision1] = useState<number>(4);

  // Card 2: Sector Inputs
  const [secRadius, setSecRadius] = useState<number>(6);
  const [secAngleDeg, setSecAngleDeg] = useState<number>(60);

  // Card 3: Segment Inputs
  const [segRadius, setSegRadius] = useState<number>(10);
  const [segChord, setSegChord] = useState<number>(12);

  // Card 4: Annulus Inputs
  const [annOuterR, setAnnOuterR] = useState<number>(10);
  const [annInnerR, setAnnInnerR] = useState<number>(6);

  // Card 5: Circle Equation Inputs
  const [eqH, setEqH] = useState<number>(2);
  const [eqK, setEqK] = useState<number>(-3);
  const [eqR, setEqR] = useState<number>(5);

  // Card 6: 3 Points Circle Inputs
  const [p1x, setP1x] = useState<number>(0);
  const [p1y, setP1y] = useState<number>(0);
  const [p2x, setP2x] = useState<number>(4);
  const [p2y, setP2y] = useState<number>(0);
  const [p3x, setP3x] = useState<number>(0);
  const [p3y, setP3y] = useState<number>(3);

  // Card 7: Unit Converter Inputs
  const [convRadius, setConvRadius] = useState<number>(1);
  const [convUnit, setConvUnit] = useState<"meters" | "cm" | "mm" | "feet" | "inches" | "yards">("meters");

  // Saved items states
  const [savedCoreItems, setSavedCoreItems] = useState<SavedCircleItem[]>([]);
  const [justSavedCore, setJustSavedCore] = useState<boolean>(false);

  const [savedSecItems, setSavedSecItems] = useState<SavedCircleItem[]>([]);
  const [justSavedSec, setJustSavedSec] = useState<boolean>(false);

  const [savedSegItems, setSavedSegItems] = useState<SavedCircleItem[]>([]);
  const [justSavedSeg, setJustSavedSeg] = useState<boolean>(false);

  const [savedAnnItems, setSavedAnnItems] = useState<SavedCircleItem[]>([]);
  const [justSavedAnn, setJustSavedAnn] = useState<boolean>(false);

  const [savedEqItems, setSavedEqItems] = useState<SavedCircleItem[]>([]);
  const [justSavedEq, setJustSavedEq] = useState<boolean>(false);

  const [saved3PItems, setSaved3PItems] = useState<SavedCircleItem[]>([]);
  const [justSaved3P, setJustSaved3P] = useState<boolean>(false);

  const [savedConvItems, setSavedConvItems] = useState<SavedCircleItem[]>([]);
  const [justSavedConv, setJustSavedConv] = useState<boolean>(false);

  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_circle_core"); if (s1) setSavedCoreItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_circle_sec"); if (s2) setSavedSecItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_circle_seg"); if (s3) setSavedSegItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_circle_ann"); if (s4) setSavedAnnItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_circle_eq"); if (s5) setSavedEqItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_circle_3p"); if (s6) setSaved3PItems(JSON.parse(s6));
      const s7 = localStorage.getItem("saved_circle_conv"); if (s7) setSavedConvItems(JSON.parse(s7));
    } catch (e) {}
  }, []);

  // Card 1 Calculations
  const resultCore: CoreCircleResult = useMemo(() => {
    return computeCoreCircle(coreMode, coreVal, precision1);
  }, [coreMode, coreVal, precision1]);

  // Card 2 Calculations
  const resultSec: SectorResult = useMemo(() => {
    return computeSector(secRadius, secAngleDeg, precision1);
  }, [secRadius, secAngleDeg, precision1]);

  // Card 3 Calculations
  const resultSeg: SegmentResult = useMemo(() => {
    return computeSegment(segRadius, segChord, "chord", precision1);
  }, [segRadius, segChord, precision1]);

  // Card 4 Calculations
  const resultAnn: AnnulusResult = useMemo(() => {
    return computeAnnulus(annOuterR, annInnerR, precision1);
  }, [annOuterR, annInnerR, precision1]);

  // Card 5 Calculations
  const resultEq: CircleEquationResult = useMemo(() => {
    return computeCircleEquation(eqH, eqK, eqR, precision1);
  }, [eqH, eqK, eqR, precision1]);

  // Card 6 Calculations
  const result3P: ThreePointCircleResult = useMemo(() => {
    return computeThreePointCircle(p1x, p1y, p2x, p2y, p3x, p3y, precision1);
  }, [p1x, p1y, p2x, p2y, p3x, p3y, precision1]);

  // Card 7 Calculations
  const resultConv = useMemo(() => {
    let rMeters = convRadius;
    if (convUnit === "cm") rMeters = convRadius / 100;
    else if (convUnit === "mm") rMeters = convRadius / 1000;
    else if (convUnit === "feet") rMeters = convRadius * 0.3048;
    else if (convUnit === "inches") rMeters = convRadius * 0.0254;
    else if (convUnit === "yards") rMeters = convRadius * 0.9144;
    return convertCircleUnits(rMeters, precision1);
  }, [convRadius, convUnit, precision1]);

  // Presets Handlers
  const handleApplyPresetCore = (preset: "unit" | "pizza" | "wheel" | "earth") => {
    if (preset === "unit") { setCoreMode("r"); setCoreVal(1); }
    else if (preset === "pizza") { setCoreMode("d"); setCoreVal(12); }
    else if (preset === "wheel") { setCoreMode("d"); setCoreVal(26); }
    else if (preset === "earth") { setCoreMode("r"); setCoreVal(6378.137); }
  };

  // Save Handlers
  const handleSaveCore = () => {
    const inputsStr = `${coreMode.toUpperCase()} = ${coreVal}`;
    const resList = [
      `Radius r = ${resultCore.radius}`,
      `Diameter d = ${resultCore.diameter}`,
      `Circumference C = ${resultCore.circumference} (${resultCore.exactCircumferencePi})`,
      `Area A = ${resultCore.area} (${resultCore.exactAreaPi})`
    ];
    const newItem: SavedCircleItem = {
      id: Date.now().toString(),
      title: `Circle r = ${resultCore.radius}`,
      inputs: inputsStr,
      operation: `Core Circle Solver`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedCoreItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedCoreItems(updated);
    try { localStorage.setItem("saved_circle_core", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCore(true); setTimeout(() => setJustSavedCore(false), 2000);
  };

  const handleSaveSec = () => {
    const inputsStr = `r = ${secRadius}, θ = ${secAngleDeg}°`;
    const resList = [
      `Arc Length L = ${resultSec.arcLength}`,
      `Sector Area = ${resultSec.sectorArea}`,
      `Perimeter = ${resultSec.sectorPerimeter}`
    ];
    const newItem: SavedCircleItem = {
      id: Date.now().toString(),
      title: `Sector Arc L = ${resultSec.arcLength}`,
      inputs: inputsStr,
      operation: `Circular Sector Solver`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedSecItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedSecItems(updated);
    try { localStorage.setItem("saved_circle_sec", JSON.stringify(updated)); } catch (e) {}
    setJustSavedSec(true); setTimeout(() => setJustSavedSec(false), 2000);
  };

  const handleSaveSeg = () => {
    const inputsStr = `r = ${segRadius}, chord c = ${segChord}`;
    const resList = [
      `Sagitta h = ${resultSeg.sagitta}`,
      `Segment Area = ${resultSeg.segmentArea}`,
      `Central Angle = ${resultSeg.centralAngleDeg}°`
    ];
    const newItem: SavedCircleItem = {
      id: Date.now().toString(),
      title: `Segment Area = ${resultSeg.segmentArea}`,
      inputs: inputsStr,
      operation: `Circular Segment Solver`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedSegItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedSegItems(updated);
    try { localStorage.setItem("saved_circle_seg", JSON.stringify(updated)); } catch (e) {}
    setJustSavedSeg(true); setTimeout(() => setJustSavedSeg(false), 2000);
  };

  const handleSaveAnn = () => {
    const inputsStr = `R = ${annOuterR}, r = ${annInnerR}`;
    const resList = [
      `Annulus Area = ${resultAnn.annulusArea}`,
      `Wall Thickness t = ${resultAnn.wallThickness}`,
      `Average Radius = ${resultAnn.avgRadius}`
    ];
    const newItem: SavedCircleItem = {
      id: Date.now().toString(),
      title: `Annulus Area = ${resultAnn.annulusArea}`,
      inputs: inputsStr,
      operation: `Annulus Ring Solver`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedAnnItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedAnnItems(updated);
    try { localStorage.setItem("saved_circle_ann", JSON.stringify(updated)); } catch (e) {}
    setJustSavedAnn(true); setTimeout(() => setJustSavedAnn(false), 2000);
  };

  const handleSaveEq = () => {
    const inputsStr = `Center (${eqH}, ${eqK}), r = ${eqR}`;
    const resList = [
      `Standard Form: ${resultEq.standardForm}`,
      `General Form: ${resultEq.generalForm}`
    ];
    const newItem: SavedCircleItem = {
      id: Date.now().toString(),
      title: `Equation: ${resultEq.standardForm}`,
      inputs: inputsStr,
      operation: `Circle Equation Solver`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedEqItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedEqItems(updated);
    try { localStorage.setItem("saved_circle_eq", JSON.stringify(updated)); } catch (e) {}
    setJustSavedEq(true); setTimeout(() => setJustSavedEq(false), 2000);
  };

  const handleSave3P = () => {
    const inputsStr = `P1(${p1x},${p1y}), P2(${p2x},${p2y}), P3(${p3x},${p3y})`;
    const resList = [
      `Circumcenter = (${result3P.center.h}, ${result3P.center.k})`,
      `Circumradius R = ${result3P.radius}`,
      `Area = ${result3P.area}`
    ];
    const newItem: SavedCircleItem = {
      id: Date.now().toString(),
      title: `Circumradius R = ${result3P.radius}`,
      inputs: inputsStr,
      operation: `3-Point Circumcircle`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...saved3PItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSaved3PItems(updated);
    try { localStorage.setItem("saved_circle_3p", JSON.stringify(updated)); } catch (e) {}
    setJustSaved3P(true); setTimeout(() => setJustSaved3P(false), 2000);
  };

  const handleSaveConv = () => {
    const inputsStr = `r = ${convRadius} ${convUnit}`;
    const resList = [
      `Area = ${resultConv.meters.a} m²`,
      `Circumference = ${resultConv.meters.c} m`
    ];
    const newItem: SavedCircleItem = {
      id: Date.now().toString(),
      title: `Converted r = ${convRadius} ${convUnit}`,
      inputs: inputsStr,
      operation: `Unit Conversion Matrix`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConvItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedConvItems(updated);
    try { localStorage.setItem("saved_circle_conv", JSON.stringify(updated)); } catch (e) {}
    setJustSavedConv(true); setTimeout(() => setJustSavedConv(false), 2000);
  };

  // Render Core Circle Vector SVG
  const renderCoreSVG = () => {
    const width = 240; const height = 180;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        <circle cx="120" cy="90" r="60" fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="2.5" />
        <circle cx="120" cy="90" r="3" fill="#1d4ed8" />
        <text x="123" y="103" className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-300">O (center)</text>

        {/* Radius line */}
        <line x1="120" y1="90" x2="180" y2="90" stroke="#dc2626" strokeWidth="2" />
        <text x="145" y="85" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">r</text>

        {/* Diameter line */}
        <line x1="60" y1="90" x2="120" y2="90" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3,3" />
        <text x="85" y="85" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">d (2r)</text>

        <text x="120" y="24" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">Circumference C = 2πr</text>
      </svg>
    );
  };

  // Render Sector Vector SVG
  const renderSectorSVG = (angle: number) => {
    const width = 240; const height = 180;
    const rad = (angle * Math.PI) / 180.0;
    const endX = 120 + 60 * Math.cos(rad);
    const endY = 90 - 60 * Math.sin(rad);
    const largeArc = angle > 180 ? 1 : 0;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        <circle cx="120" cy="90" r="60" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />

        {/* Sector Path */}
        <path
          d={`M 120 90 L 180 90 A 60 60 0 ${largeArc} 0 ${endX} ${endY} Z`}
          fill="#3b82f6"
          fillOpacity="0.3"
          stroke="#2563eb"
          strokeWidth="2.5"
        />

        <circle cx="120" cy="90" r="3" fill="#1d4ed8" />
        <text x="140" y="105" className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-300">θ = {angle}°</text>
        <text x="175" y="75" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">L (arc)</text>
      </svg>
    );
  };

  // Render Segment Vector SVG
  const renderSegmentSVG = () => {
    const width = 240; const height = 180;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        <circle cx="120" cy="90" r="60" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Segment Arc & Chord */}
        <path d="M 70 50 A 60 60 0 0 1 170 50 Z" fill="#dc2626" fillOpacity="0.25" stroke="#dc2626" strokeWidth="2" />
        <line x1="70" y1="50" x2="170" y2="50" stroke="#2563eb" strokeWidth="2.5" />
        <text x="120" y="44" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">Chord (c)</text>

        {/* Sagitta height */}
        <line x1="120" y1="50" x2="120" y2="30" stroke="#16a34a" strokeWidth="2" />
        <text x="126" y="40" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">h (sagitta)</text>
      </svg>
    );
  };

  // Render Annulus Vector SVG
  const renderAnnulusSVG = () => {
    const width = 240; const height = 180;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        {/* Outer Circle */}
        <circle cx="120" cy="90" r="65" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2" />
        {/* Inner Circle hole */}
        <circle cx="120" cy="90" r="35" fill="#f8fafc" stroke="#1d4ed8" strokeWidth="2" className="dark:fill-slate-900" />

        <line x1="120" y1="90" x2="155" y2="90" stroke="#dc2626" strokeWidth="2" />
        <text x="135" y="85" className="text-[9px] font-mono font-bold fill-red-600 dark:fill-red-400">r</text>

        <line x1="120" y1="90" x2="185" y2="90" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="2,2" />
        <text x="168" y="85" className="text-[9px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">R</text>
      </svg>
    );
  };

  // Render Circle Equation SVG
  const renderEquationSVG = () => {
    const width = 240; const height = 180;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        {/* Axes */}
        <line x1="20" y1="130" x2="220" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="70" y1="10" x2="70" y2="170" stroke="#94a3b8" strokeWidth="1.5" />

        {/* Circle */}
        <circle cx="140" cy="70" r="45" fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="2" />
        <circle cx="140" cy="70" r="3" fill="#dc2626" />
        <text x="145" y="65" className="text-[9px] font-mono font-bold fill-red-600 dark:fill-red-400">(h, k)</text>
      </svg>
    );
  };

  // Render 3 Points Circumcircle SVG
  const render3PointSVG = () => {
    const width = 240; const height = 180;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        <circle cx="120" cy="95" r="55" fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="2" />
        {/* Triangle */}
        <polygon points="75,130 165,130 90,45" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3,3" />

        <circle cx="75" cy="130" r="4" fill="#dc2626" />
        <circle cx="165" cy="130" r="4" fill="#dc2626" />
        <circle cx="90" cy="45" r="4" fill="#dc2626" />
        <text x="120" y="24" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">Circumcircle</text>
      </svg>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: CORE BIDIRECTIONAL CIRCLE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Core Bidirectional Circle Solver</span>
          <button
            type="button"
            onClick={handleSaveCore}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCore ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className="text-slate-500 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" /> Presets:
            </span>
            <button type="button" onClick={()=>handleApplyPresetCore("unit")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">Unit Circle (r = 1)</button>
            <button type="button" onClick={()=>handleApplyPresetCore("pizza")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">Pizza (12" Diameter)</button>
            <button type="button" onClick={()=>handleApplyPresetCore("wheel")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">Bicycle Wheel (26")</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs text-xs">
              <div>
                <label className="block font-bold mb-1">Select Parameter to Input:</label>
                <select value={coreMode} onChange={(e)=>setCoreMode(e.target.value as any)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                  <option value="r">Radius (r)</option>
                  <option value="d">Diameter (d)</option>
                  <option value="c">Circumference (C)</option>
                  <option value="a">Circle Area (A)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Enter Value:</label>
                <input type="number" step="any" value={coreVal} onChange={(e)=>setCoreVal(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs font-mono font-bold">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Radius (r)</span>
                  <span className="text-xl text-blue-600 dark:text-blue-400">{resultCore.radius}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Diameter (d)</span>
                  <span className="text-xl text-slate-900 dark:text-slate-100">{resultCore.diameter}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Circumference (C)</span>
                  <span className="text-xl text-emerald-600 dark:text-emerald-400">{resultCore.circumference}</span>
                  <span className="text-[10px] text-slate-400 block font-sans">({resultCore.exactCircumferencePi})</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Circle Area (A)</span>
                  <span className="text-xl text-purple-600 dark:text-purple-400">{resultCore.area}</span>
                  <span className="text-[10px] text-slate-400 block font-sans">({resultCore.exactAreaPi})</span>
                </div>
              </div>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderCoreSVG()}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED CORE CALCULATIONS */}
          {savedCoreItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Core Circle Calculations ({savedCoreItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => { setSavedCoreItems([]); try { localStorage.removeItem("saved_circle_core"); } catch(e){} }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedCoreItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div key={item.id} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                        <button type="button" onClick={() => { const updated = savedCoreItems.filter(i => i.id !== item.id); setSavedCoreItems(updated); try { localStorage.setItem("saved_circle_core", JSON.stringify(updated)); } catch(e){} }} className="text-slate-400 hover:text-red-600 p-0.5"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div><span className="font-bold text-slate-500">Inputs: </span><span className="font-semibold">{item.inputs}</span></div>
                        <button type="button" onClick={() => toggleExpand(item.id)} className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px]">
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>
                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60">{resLine}</div>
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
      {/* CARD 2: CIRCULAR SECTOR & ARC LENGTH SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Circular Sector &amp; Arc Length Solver</span>
          <button type="button" onClick={handleSaveSec} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSec ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div><label className="font-bold block mb-1">Radius (r):</label><input type="number" step="any" value={secRadius} onChange={(e)=>setSecRadius(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              <div><label className="font-bold block mb-1">Central Angle θ (°):</label><input type="number" step="any" value={secAngleDeg} onChange={(e)=>setSecAngleDeg(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Arc Length L</span><span className="text-emerald-600 dark:text-emerald-400">{resultSec.arcLength}</span></div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Sector Area</span><span className="text-blue-600 dark:text-blue-400">{resultSec.sectorArea}</span></div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Perimeter P</span><span className="text-slate-900 dark:text-slate-100">{resultSec.sectorPerimeter}</span></div>
              </div>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderSectorSVG(secAngleDeg)}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED SECTOR CALCULATIONS */}
          {savedSecItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2"><Bookmark className="w-4 h-4 text-blue-600" /><span>Saved Sector Calculations ({savedSecItems.length})</span></h3>
                <button type="button" onClick={() => { setSavedSecItems([]); try { localStorage.removeItem("saved_circle_sec"); } catch(e){} }} className="text-xs text-red-600 font-semibold flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Clear All</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedSecItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans space-y-2">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400 block">{item.title}</span>
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 block">{item.result}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: CIRCULAR SEGMENT & CHORD / SAGITTA SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Circular Segment &amp; Chord / Sagitta Solver</span>
          <button type="button" onClick={handleSaveSeg} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSeg ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div><label className="font-bold block mb-1">Radius (r):</label><input type="number" step="any" value={segRadius} onChange={(e)=>setSegRadius(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              <div><label className="font-bold block mb-1">Chord Length (c):</label><input type="number" step="any" value={segChord} onChange={(e)=>setSegChord(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Sagitta (Height h)</span><span className="text-emerald-600 dark:text-emerald-400">{resultSeg.sagitta}</span></div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Segment Area</span><span className="text-red-600 dark:text-red-400">{resultSeg.segmentArea}</span></div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Central Angle θ</span><span className="text-blue-600 dark:text-blue-400">{resultSeg.centralAngleDeg}°</span></div>
              </div>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderSegmentSVG()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: ANNULUS & CIRCULAR RING SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Annulus &amp; Circular Ring Solver</span>
          <button type="button" onClick={handleSaveAnn} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedAnn ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div><label className="font-bold block mb-1">Outer Radius (R):</label><input type="number" step="any" value={annOuterR} onChange={(e)=>setAnnOuterR(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              <div><label className="font-bold block mb-1">Inner Radius (r):</label><input type="number" step="any" value={annInnerR} onChange={(e)=>setAnnInnerR(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Annulus Area</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {resultAnn.annulusArea}
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Wall Thickness t = {resultAnn.wallThickness} | Avg Radius = {resultAnn.avgRadius}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderAnnulusSVG()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: CIRCLE EQUATION & COORDINATE GEOMETRY */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Circle Equation &amp; Coordinate Geometry Solver</span>
          <button type="button" onClick={handleSaveEq} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedEq ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div><label className="font-bold block mb-1">Center X (h):</label><input type="number" value={eqH} onChange={(e)=>setEqH(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
                <div><label className="font-bold block mb-1">Center Y (k):</label><input type="number" value={eqK} onChange={(e)=>setEqK(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              </div>
              <div><label className="font-bold block mb-1">Radius (r):</label><input type="number" value={eqR} onChange={(e)=>setEqR(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3 text-xs font-mono">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block font-sans font-extrabold">Standard Form (Center-Radius)</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{resultEq.standardForm}</span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block font-sans font-extrabold">General Form</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold text-sm">{resultEq.generalForm}</span>
              </div>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-sans">
                {renderEquationSVG()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 6: CIRCLE THROUGH 3 POINTS (CIRCUMCIRCLE) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Circle Through 3 Points (Circumcircle Solver)</span>
          <button type="button" onClick={handleSave3P} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSaved3P ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2"><div><label className="font-bold">P1 X:</label><input type="number" value={p1x} onChange={(e)=>setP1x(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"/></div><div><label className="font-bold">P1 Y:</label><input type="number" value={p1y} onChange={(e)=>setP1y(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"/></div></div>
              <div className="grid grid-cols-2 gap-2"><div><label className="font-bold">P2 X:</label><input type="number" value={p2x} onChange={(e)=>setP2x(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"/></div><div><label className="font-bold">P2 Y:</label><input type="number" value={p2y} onChange={(e)=>setP2y(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"/></div></div>
              <div className="grid grid-cols-2 gap-2"><div><label className="font-bold">P3 X:</label><input type="number" value={p3x} onChange={(e)=>setP3x(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"/></div><div><label className="font-bold">P3 Y:</label><input type="number" value={p3y} onChange={(e)=>setP3y(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"/></div></div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Circumcircle Properties</span>
              <div className="text-2xl font-mono font-black text-slate-900 dark:text-slate-100">
                Circumradius R = {result3P.radius}
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Circumcenter = ({result3P.center.h}, {result3P.center.k}) | Area = {result3P.area}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {render3PointSVG()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 7: MASTER CIRCLE UNIT CONVERTER MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Master Circle Unit Converter Matrix</span>
          <button type="button" onClick={handleSaveConv} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedConv ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold mb-1">Radius Value:</label>
              <input type="number" step="any" value={convRadius} onChange={(e)=>setConvRadius(parseFloat(e.target.value)||0)} className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"/>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Base Unit:</label>
              <select value={convUnit} onChange={(e)=>setConvUnit(e.target.value as any)} className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm">
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
                  <th className="p-2.5">Radius (r)</th>
                  <th className="p-2.5">Diameter (d)</th>
                  <th className="p-2.5">Circumference (C)</th>
                  <th className="p-2.5">Area (A)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
                <tr><td className="p-2 font-bold font-sans">Meters (m)</td><td className="p-2">{resultConv.meters.r}</td><td className="p-2">{resultConv.meters.d}</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultConv.meters.c}</td><td className="p-2 text-emerald-600 dark:text-emerald-400 font-bold">{resultConv.meters.a} m²</td></tr>
                <tr><td className="p-2 font-bold font-sans">Centimeters (cm)</td><td className="p-2">{resultConv.cm.r}</td><td className="p-2">{resultConv.cm.d}</td><td className="p-2 font-bold">{resultConv.cm.c}</td><td className="p-2 font-bold">{resultConv.cm.a} cm²</td></tr>
                <tr><td className="p-2 font-bold font-sans">Feet (ft)</td><td className="p-2">{resultConv.feet.r}</td><td className="p-2">{resultConv.feet.d}</td><td className="p-2 font-bold">{resultConv.feet.c}</td><td className="p-2 font-bold">{resultConv.feet.a} ft²</td></tr>
                <tr><td className="p-2 font-bold font-sans">Inches (in)</td><td className="p-2">{resultConv.inches.r}</td><td className="p-2">{resultConv.inches.d}</td><td className="p-2 font-bold">{resultConv.inches.c}</td><td className="p-2 font-bold">{resultConv.inches.a} in²</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CircleCalculator;
