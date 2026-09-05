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
  Check,
  Download,
  AlertTriangle,
  Layers,
  Compass,
  PieChart,
  Circle as CircleIcon
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
  ThreePointCircleResult,
  UNIT_FACTORS_METERS
} from "@/app/calculators/circle-calculator/circle-logic";

export interface SavedCircleItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  rawInputs: Record<string, any>;
  timestamp: string;
}

export function CircleCalculator() {
  // Precision control: 2, 4, or 6 decimal places
  const [precision, setPrecision] = useState<number>(4);

  // Copied state indicator
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Card 1: Core Circle Inputs (String state to preserve typing "-" or ".")
  const [coreMode, setCoreMode] = useState<"r" | "d" | "c" | "a">("r");
  const [coreValStr, setCoreValStr] = useState<string>("5");
  const coreVal = parseFloat(coreValStr) || 0;

  // Card 2: Sector Inputs
  const [secRadiusStr, setSecRadiusStr] = useState<string>("6");
  const [secAngleStr, setSecAngleStr] = useState<string>("60");
  const [secAngleUnit, setSecAngleUnit] = useState<"deg" | "rad">("deg");
  const secRadius = parseFloat(secRadiusStr) || 0;
  const secAngle = parseFloat(secAngleStr) || 0;

  // Card 3: Segment Inputs
  const [segRadiusStr, setSegRadiusStr] = useState<string>("10");
  const [segChordStr, setSegChordStr] = useState<string>("12");
  const [segMode, setSegMode] = useState<"chord" | "angle">("chord");
  const segRadius = parseFloat(segRadiusStr) || 0;
  const segChord = parseFloat(segChordStr) || 0;

  // Card 4: Annulus Inputs
  const [annOuterRStr, setAnnOuterRStr] = useState<string>("10");
  const [annInnerRStr, setAnnInnerRStr] = useState<string>("6");
  const annOuterR = parseFloat(annOuterRStr) || 0;
  const annInnerR = parseFloat(annInnerRStr) || 0;

  // Card 5: Circle Equation Inputs
  const [eqHStr, setEqHStr] = useState<string>("2");
  const [eqKStr, setEqKStr] = useState<string>("-3");
  const [eqRStr, setEqRStr] = useState<string>("5");
  const eqH = parseFloat(eqHStr) || 0;
  const eqK = parseFloat(eqKStr) || 0;
  const eqR = parseFloat(eqRStr) || 0;

  // Card 6: 3 Points Circle Inputs
  const [p1xStr, setP1xStr] = useState<string>("0");
  const [p1yStr, setP1yStr] = useState<string>("0");
  const [p2xStr, setP2xStr] = useState<string>("4");
  const [p2yStr, setP2yStr] = useState<string>("0");
  const [p3xStr, setP3xStr] = useState<string>("0");
  const [p3yStr, setP3yStr] = useState<string>("3");
  const p1x = parseFloat(p1xStr) || 0;
  const p1y = parseFloat(p1yStr) || 0;
  const p2x = parseFloat(p2xStr) || 0;
  const p2y = parseFloat(p2yStr) || 0;
  const p3x = parseFloat(p3xStr) || 0;
  const p3y = parseFloat(p3yStr) || 0;

  // Card 7: Unit Converter Inputs
  const [convRadiusStr, setConvRadiusStr] = useState<string>("1");
  const [convUnit, setConvUnit] = useState<string>("meters");
  const convRadius = parseFloat(convRadiusStr) || 0;

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
    return computeCoreCircle(coreMode, coreVal, precision);
  }, [coreMode, coreVal, precision]);

  // Card 2 Calculations
  const resultSec: SectorResult = useMemo(() => {
    return computeSector(secRadius, secAngle, secAngleUnit, precision);
  }, [secRadius, secAngle, secAngleUnit, precision]);

  // Card 3 Calculations
  const resultSeg: SegmentResult = useMemo(() => {
    return computeSegment(segRadius, segChord, segMode, precision);
  }, [segRadius, segChord, segMode, precision]);

  // Card 4 Calculations
  const resultAnn: AnnulusResult = useMemo(() => {
    return computeAnnulus(annOuterR, annInnerR, precision);
  }, [annOuterR, annInnerR, precision]);

  // Card 5 Calculations
  const resultEq: CircleEquationResult = useMemo(() => {
    return computeCircleEquation(eqH, eqK, eqR, precision);
  }, [eqH, eqK, eqR, precision]);

  // Card 6 Calculations
  const result3P: ThreePointCircleResult = useMemo(() => {
    return computeThreePointCircle(p1x, p1y, p2x, p2y, p3x, p3y, precision);
  }, [p1x, p1y, p2x, p2y, p3x, p3y, precision]);

  // Card 7 Calculations
  const resultConv = useMemo(() => {
    return convertCircleUnits(convRadius, convUnit, precision);
  }, [convRadius, convUnit, precision]);

  // Presets Handlers
  const handleApplyPresetCore = (preset: "unit" | "pizza" | "wheel") => {
    if (preset === "unit") { setCoreMode("r"); setCoreValStr("1"); }
    else if (preset === "pizza") { setCoreMode("d"); setCoreValStr("12"); }
    else if (preset === "wheel") { setCoreMode("d"); setCoreValStr("26"); }
  };

  // Save Handlers
  const handleSaveCore = () => {
    if (!resultCore.isValid) return;
    const inputsStr = `${coreMode.toUpperCase()} = ${coreValStr}`;
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
      rawInputs: { coreMode, coreValStr },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedCoreItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedCoreItems(updated);
    try { localStorage.setItem("saved_circle_core", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCore(true); setTimeout(() => setJustSavedCore(false), 2000);
  };

  const handleSaveSec = () => {
    if (!resultSec.isValid) return;
    const inputsStr = `Radius r = ${secRadiusStr}, Angle θ = ${secAngleStr}${secAngleUnit === "rad" ? " rad" : "°"}`;
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
      rawInputs: { secRadiusStr, secAngleStr, secAngleUnit },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedSecItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedSecItems(updated);
    try { localStorage.setItem("saved_circle_sec", JSON.stringify(updated)); } catch (e) {}
    setJustSavedSec(true); setTimeout(() => setJustSavedSec(false), 2000);
  };

  const handleSaveSeg = () => {
    if (!resultSeg.isValid) return;
    const inputsStr = `Radius r = ${segRadiusStr}, Chord c = ${segChordStr}`;
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
      rawInputs: { segRadiusStr, segChordStr, segMode },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedSegItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedSegItems(updated);
    try { localStorage.setItem("saved_circle_seg", JSON.stringify(updated)); } catch (e) {}
    setJustSavedSeg(true); setTimeout(() => setJustSavedSeg(false), 2000);
  };

  const handleSaveAnn = () => {
    if (!resultAnn.isValid) return;
    const inputsStr = `Outer R = ${annOuterRStr}, Inner r = ${annInnerRStr}`;
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
      rawInputs: { annOuterRStr, annInnerRStr },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedAnnItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedAnnItems(updated);
    try { localStorage.setItem("saved_circle_ann", JSON.stringify(updated)); } catch (e) {}
    setJustSavedAnn(true); setTimeout(() => setJustSavedAnn(false), 2000);
  };

  const handleSaveEq = () => {
    if (!resultEq.isValid) return;
    const inputsStr = `Center (${eqHStr}, ${eqKStr}), Radius r = ${eqRStr}`;
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
      rawInputs: { eqHStr, eqKStr, eqRStr },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedEqItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedEqItems(updated);
    try { localStorage.setItem("saved_circle_eq", JSON.stringify(updated)); } catch (e) {}
    setJustSavedEq(true); setTimeout(() => setJustSavedEq(false), 2000);
  };

  const handleSave3P = () => {
    if (!result3P.isValid) return;
    const inputsStr = `P1(${p1xStr},${p1yStr}), P2(${p2xStr},${p2yStr}), P3(${p3xStr},${p3yStr})`;
    const resList = [
      `Circumcenter = (${result3P.center.h}, ${result3P.center.k})`,
      `Circumradius R = ${result3P.radius}`,
      `Circumcircle Area = ${result3P.area}`
    ];
    const newItem: SavedCircleItem = {
      id: Date.now().toString(),
      title: `Circumradius R = ${result3P.radius}`,
      inputs: inputsStr,
      operation: `3-Point Circumcircle`,
      result: resList.join(" | "),
      resultsList: resList,
      rawInputs: { p1xStr, p1yStr, p2xStr, p2yStr, p3xStr, p3yStr },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...saved3PItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSaved3PItems(updated);
    try { localStorage.setItem("saved_circle_3p", JSON.stringify(updated)); } catch (e) {}
    setJustSaved3P(true); setTimeout(() => setJustSaved3P(false), 2000);
  };

  const handleSaveConv = () => {
    const inputsStr = `Radius r = ${convRadiusStr} ${convUnit}`;
    const resList = [
      `Area = ${resultConv.meters.a} m²`,
      `Circumference = ${resultConv.meters.c} m`
    ];
    const newItem: SavedCircleItem = {
      id: Date.now().toString(),
      title: `Converted r = ${convRadiusStr} ${convUnit}`,
      inputs: inputsStr,
      operation: `Unit Conversion Matrix`,
      result: resList.join(" | "),
      resultsList: resList,
      rawInputs: { convRadiusStr, convUnit },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConvItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedConvItems(updated);
    try { localStorage.setItem("saved_circle_conv", JSON.stringify(updated)); } catch (e) {}
    setJustSavedConv(true); setTimeout(() => setJustSavedConv(false), 2000);
  };

  // Restore Handlers
  const handleRestore = (item: SavedCircleItem) => {
    if (!item.rawInputs) return;
    const r = item.rawInputs;
    if (item.operation === "Core Circle Solver") {
      if (r.coreMode) setCoreMode(r.coreMode);
      if (r.coreValStr !== undefined) setCoreValStr(r.coreValStr);
    } else if (item.operation === "Circular Sector Solver") {
      if (r.secRadiusStr !== undefined) setSecRadiusStr(r.secRadiusStr);
      if (r.secAngleStr !== undefined) setSecAngleStr(r.secAngleStr);
      if (r.secAngleUnit) setSecAngleUnit(r.secAngleUnit);
    } else if (item.operation === "Circular Segment Solver") {
      if (r.segRadiusStr !== undefined) setSegRadiusStr(r.segRadiusStr);
      if (r.segChordStr !== undefined) setSegChordStr(r.segChordStr);
      if (r.segMode) setSegMode(r.segMode);
    } else if (item.operation === "Annulus Ring Solver") {
      if (r.annOuterRStr !== undefined) setAnnOuterRStr(r.annOuterRStr);
      if (r.annInnerRStr !== undefined) setAnnInnerRStr(r.annInnerRStr);
    } else if (item.operation === "Circle Equation Solver") {
      if (r.eqHStr !== undefined) setEqHStr(r.eqHStr);
      if (r.eqKStr !== undefined) setEqKStr(r.eqKStr);
      if (r.eqRStr !== undefined) setEqRStr(r.eqRStr);
    } else if (item.operation === "3-Point Circumcircle") {
      if (r.p1xStr !== undefined) setP1xStr(r.p1xStr);
      if (r.p1yStr !== undefined) setP1yStr(r.p1yStr);
      if (r.p2xStr !== undefined) setP2xStr(r.p2xStr);
      if (r.p2yStr !== undefined) setP2yStr(r.p2yStr);
      if (r.p3xStr !== undefined) setP3xStr(r.p3xStr);
      if (r.p3yStr !== undefined) setP3yStr(r.p3yStr);
    } else if (item.operation === "Unit Conversion Matrix") {
      if (r.convRadiusStr !== undefined) setConvRadiusStr(r.convRadiusStr);
      if (r.convUnit) setConvUnit(r.convUnit);
    }
  };

  // CSV Export
  const handleExportCSV = (moduleName: string, inputs: string, results: string[]) => {
    const csvContent = [
      ["Module", "Inputs", "Results", "Timestamp"].map(c => `"${c}"`).join(","),
      [moduleName, inputs, results.join(" | "), new Date().toISOString()].map(c => `"${c.replace(/"/g, '""')}"`).join(",")
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `circle_${moduleName.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ==========================================
  // DYNAMIC SVG VISUALIZATIONS
  // ==========================================

  // 1. Core Circle Dynamic SVG
  const renderCoreSVG = () => {
    const width = 240; const height = 180;
    const cx = 120; const cy = 90;
    const rPix = 58;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        <circle cx={cx} cy={cy} r={rPix} fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="2.5" />
        <circle cx={cx} cy={cy} r="3" fill="#1d4ed8" />
        <text x={cx + 4} y={cy + 12} className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-300">O (center)</text>

        {/* Radius line */}
        <line x1={cx} y1={cy} x2={cx + rPix} y2={cy} stroke="#dc2626" strokeWidth="2" />
        <text x={cx + rPix / 2} y={cy - 5} textAnchor="middle" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">
          r = {resultCore.isValid ? resultCore.radius : coreValStr}
        </text>

        {/* Diameter line */}
        <line x1={cx - rPix} y1={cy} x2={cx} y2={cy} stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3,3" />
        <text x={cx - rPix / 2} y={cy - 5} textAnchor="middle" className="text-[9px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">
          d/2
        </text>

        <text x={cx} y="22" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">
          Circumference C = 2πr
        </text>
      </svg>
    );
  };

  // 2. Sector Dynamic SVG
  const renderSectorSVG = () => {
    const width = 240; const height = 180;
    const cx = 120; const cy = 90;
    const rPix = 58;

    const angleDeg = Math.min(360, Math.max(0, resultSec.angleDeg || 0));
    const rad = (angleDeg * Math.PI) / 180.0;
    const endX = cx + rPix * Math.cos(rad);
    const endY = cy - rPix * Math.sin(rad);
    const largeArc = angleDeg > 180 ? 1 : 0;

    const pathD = angleDeg >= 360
      ? `M ${cx - rPix} ${cy} A ${rPix} ${rPix} 0 1 0 ${cx + rPix} ${cy} A ${rPix} ${rPix} 0 1 0 ${cx - rPix} ${cy}`
      : `M ${cx} ${cy} L ${cx + rPix} ${cy} A ${rPix} ${rPix} 0 ${largeArc} 0 ${endX} ${endY} Z`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        <circle cx={cx} cy={cy} r={rPix} fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />

        {/* Sector Path */}
        <path
          d={pathD}
          fill="#3b82f6"
          fillOpacity="0.25"
          stroke="#2563eb"
          strokeWidth="2.5"
        />

        <circle cx={cx} cy={cy} r="3" fill="#1d4ed8" />
        <text x={cx + 15} y={cy + 14} className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-300">
          θ = {Math.round(angleDeg)}°
        </text>
        {angleDeg > 0 && angleDeg < 360 && (
          <text x={endX + 4} y={endY - 2} className="text-[9px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">
            L (arc)
          </text>
        )}
      </svg>
    );
  };

  // 3. Segment & Sagitta Dynamic SVG
  const renderSegmentSVG = () => {
    const width = 240; const height = 180;
    const cx = 120; const cy = 95;
    const rPix = 58;

    if (!resultSeg.isValid) {
      return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
          <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
          <circle cx={cx} cy={cy} r={rPix} fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x={cx} y={cy} textAnchor="middle" className="text-[11px] font-bold fill-red-500">Geometry Error</text>
        </svg>
      );
    }

    const r = segRadius > 0 ? segRadius : 10;
    const c = Math.min(2 * r, Math.max(0, resultSeg.chordLength));
    const halfChordPix = (c / (2 * r)) * rPix;
    const sagittaPix = (resultSeg.sagitta / r) * rPix;
    const chordY = cy - rPix + sagittaPix;

    const x1 = cx - halfChordPix;
    const x2 = cx + halfChordPix;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        <circle cx={cx} cy={cy} r={rPix} fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
        <circle cx={cx} cy={cy} r="3" fill="#1d4ed8" />
        <text x={cx + 4} y={cy + 12} className="text-[9px] font-mono font-bold fill-blue-700 dark:fill-blue-300">O</text>

        {/* Shaded Minor Segment */}
        {c > 0 && (
          <path
            d={`M ${x1} ${chordY} A ${rPix} ${rPix} 0 0 1 ${x2} ${chordY} Z`}
            fill="#dc2626"
            fillOpacity="0.25"
            stroke="#dc2626"
            strokeWidth="2"
          />
        )}

        {/* Chord Line */}
        <line x1={x1} y1={chordY} x2={x2} y2={chordY} stroke="#2563eb" strokeWidth="2.5" />
        <text x={cx} y={chordY + 12} textAnchor="middle" className="text-[9px] font-mono font-bold fill-blue-600 dark:fill-blue-400">
          Chord c = {resultSeg.chordLength}
        </text>

        {/* Sagitta Height Line */}
        {sagittaPix > 2 && (
          <>
            <line x1={cx} y1={chordY} x2={cx} y2={cy - rPix} stroke="#16a34a" strokeWidth="2" />
            <text x={cx + 4} y={cy - rPix + sagittaPix / 2} className="text-[9px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">
              h = {resultSeg.sagitta}
            </text>
          </>
        )}
      </svg>
    );
  };

  // 4. Annulus Dynamic SVG
  const renderAnnulusSVG = () => {
    const width = 240; const height = 180;
    const cx = 120; const cy = 90;
    const maxR = 64;

    const R = Math.max(0.1, annOuterR);
    const r = Math.max(0, annInnerR);
    const rInnerPix = Math.min(maxR - 5, Math.max(8, (r / R) * maxR));

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        
        {/* Outer Circle */}
        <circle cx={cx} cy={cy} r={maxR} fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2" />
        
        {/* Inner Circle hole */}
        <circle cx={cx} cy={cy} r={rInnerPix} fill="#f8fafc" stroke="#1d4ed8" strokeWidth="2" className="dark:fill-slate-900" />

        {/* Inner Radius line */}
        <line x1={cx} y1={cy} x2={cx + rInnerPix} y2={cy} stroke="#dc2626" strokeWidth="2" />
        <text x={cx + rInnerPix / 2} y={cy - 4} textAnchor="middle" className="text-[9px] font-mono font-bold fill-red-600 dark:fill-red-400">
          r={annInnerR}
        </text>

        {/* Outer Radius line */}
        <line x1={cx} y1={cy} x2={cx + maxR} y2={cy} stroke="#16a34a" strokeWidth="1.5" strokeDasharray="2,2" />
        <text x={cx + (maxR + rInnerPix) / 2} y={cy - 4} textAnchor="middle" className="text-[9px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">
          R={annOuterR}
        </text>
      </svg>
    );
  };

  // 5. Circle Equation Dynamic SVG
  const renderEquationSVG = () => {
    const width = 240; const height = 180;
    const originX = 120; const originY = 90;
    const scale = 8; // pixels per unit

    const cX = Math.min(220, Math.max(20, originX + eqH * scale));
    const cY = Math.min(160, Math.max(20, originY - eqK * scale));
    const rPix = Math.min(70, Math.max(10, eqR * scale));

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        
        {/* Coordinate Axes */}
        <line x1="15" y1={originY} x2="225" y2={originY} stroke="#94a3b8" strokeWidth="1.5" />
        <line x1={originX} y1="15" x2={originX} y2="165" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="220" y={originY - 5} className="text-[9px] font-mono font-bold fill-slate-400">x</text>
        <text x={originX + 5} y="22" className="text-[9px] font-mono font-bold fill-slate-400">y</text>

        {/* Circle */}
        <circle cx={cX} cy={cY} r={rPix} fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="2" />
        <circle cx={cX} cy={cY} r="3" fill="#dc2626" />
        <text x={cX + 5} y={cY - 5} className="text-[9px] font-mono font-bold fill-red-600 dark:fill-red-400">
          ({eqH}, {eqK})
        </text>
      </svg>
    );
  };

  // 6. 3-Points Circumcircle Dynamic SVG
  const render3PointSVG = () => {
    const width = 240; const height = 180;
    const cx = 120; const cy = 90;

    if (!result3P.isValid || result3P.isCollinear) {
      return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
          <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
          <line x1="40" y1="130" x2="200" y2="50" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />
          <text x={cx} y={cy} textAnchor="middle" className="text-[11px] font-bold fill-red-500">
            {result3P.errorMessage || "Collinear Points"}
          </text>
        </svg>
      );
    }

    const { h, k } = result3P.center;
    const R = result3P.radius;
    const scale = R > 0 ? Math.min(55 / R, 25) : 15;

    const toSvgX = (x: number) => cx + (x - h) * scale;
    const toSvgY = (y: number) => cy - (y - k) * scale;

    const s1x = toSvgX(p1x); const s1y = toSvgY(p1y);
    const s2x = toSvgX(p2x); const s2y = toSvgY(p2y);
    const s3x = toSvgX(p3x); const s3y = toSvgY(p3y);
    const rPix = R * scale;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        
        {/* Circumcircle */}
        <circle cx={cx} cy={cy} r={rPix} fill="#3b82f6" fillOpacity="0.12" stroke="#2563eb" strokeWidth="2" />
        
        {/* Triangle edges */}
        <polygon points={`${s1x},${s1y} ${s2x},${s2y} ${s3x},${s3y}`} fill="none" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3,3" />

        {/* Circumcenter */}
        <circle cx={cx} cy={cy} r="3" fill="#2563eb" />
        <text x={cx + 4} y={cy + 12} className="text-[8px] font-mono font-bold fill-blue-700 dark:fill-blue-300">
          C({h}, {k})
        </text>

        {/* Vertices */}
        <circle cx={s1x} cy={s1y} r="3.5" fill="#dc2626" />
        <circle cx={s2x} cy={s2y} r="3.5" fill="#dc2626" />
        <circle cx={s3x} cy={s3y} r="3.5" fill="#dc2626" />

        <text x={s1x + 4} y={s1y - 3} className="text-[8px] font-mono font-bold fill-slate-700 dark:fill-slate-300">P1</text>
        <text x={s2x + 4} y={s2y - 3} className="text-[8px] font-mono font-bold fill-slate-700 dark:fill-slate-300">P2</text>
        <text x={s3x + 4} y={s3y - 3} className="text-[8px] font-mono font-bold fill-slate-700 dark:fill-slate-300">P3</text>
      </svg>
    );
  };

  // Reusable Saved Cards Group with Restore / Load Functionality
  const renderSavedCardsGroup = (
    title: string,
    items: SavedCircleItem[],
    onClear: () => void,
    onDelete: (id: string) => void,
    storageKey: string
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
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleRestore(item)}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 p-1 rounded hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Load / Restore into Calculator"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Delete calculation"
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
      {/* GLOBAL PRECISION BAR */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs">
        <span className="font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-blue-600" /> Decimal Precision:
        </span>
        <div className="flex items-center gap-1">
          {[2, 4, 6].map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setPrecision(p)}
              className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                precision === p
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {p} Decimals
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: CORE BIDIRECTIONAL CIRCLE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Core Bidirectional Circle Solver</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopyText(resultCore.stepText, "core")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy mathematical steps"
            >
              {copiedId === "core" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "core" ? "Copied" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => handleExportCSV("Core Circle", `${coreMode} = ${coreValStr}`, [
                `Radius = ${resultCore.radius}`,
                `Diameter = ${resultCore.diameter}`,
                `Circumference = ${resultCore.circumference}`,
                `Area = ${resultCore.area}`
              ])}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export calculation to CSV"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={handleSaveCore}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedCore ? "Saved!" : "Save"}</span>
            </button>
          </div>
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

          {!resultCore.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{resultCore.errorMessage}</span>
            </div>
          )}

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
                <input
                  type="text"
                  inputMode="decimal"
                  value={coreValStr}
                  onChange={(e)=>setCoreValStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs font-mono font-bold">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Radius (r)</span>
                  <span className="text-xl text-blue-600 dark:text-blue-400">{resultCore.isValid ? resultCore.radius : "—"}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Diameter (d)</span>
                  <span className="text-xl text-slate-900 dark:text-slate-100">{resultCore.isValid ? resultCore.diameter : "—"}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Circumference (C)</span>
                  <span className="text-xl text-emerald-600 dark:text-emerald-400">{resultCore.isValid ? resultCore.circumference : "—"}</span>
                  <span className="text-[10px] text-slate-400 block font-sans">{resultCore.isValid ? `(${resultCore.exactCircumferencePi})` : ""}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Circle Area (A)</span>
                  <span className="text-xl text-purple-600 dark:text-purple-400">{resultCore.isValid ? resultCore.area : "—"}</span>
                  <span className="text-[10px] text-slate-400 block font-sans">{resultCore.isValid ? `(${resultCore.exactAreaPi})` : ""}</span>
                </div>
              </div>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderCoreSVG()}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED CORE CALCULATIONS */}
          {renderSavedCardsGroup(
            "Saved Core Circle Calculations",
            savedCoreItems,
            () => { setSavedCoreItems([]); try { localStorage.removeItem("saved_circle_core"); } catch(e){} },
            (id) => { const updated = savedCoreItems.filter(i => i.id !== id); setSavedCoreItems(updated); try { localStorage.setItem("saved_circle_core", JSON.stringify(updated)); } catch(e){} },
            "saved_circle_core"
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: CIRCULAR SECTOR & ARC LENGTH SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Circular Sector &amp; Arc Length Solver</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopyText(resultSec.stepText, "sec")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "sec" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "sec" ? "Copied" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => handleExportCSV("Sector", `r=${secRadiusStr}, angle=${secAngleStr}`, [
                `Arc Length = ${resultSec.arcLength}`,
                `Sector Area = ${resultSec.sectorArea}`,
                `Perimeter = ${resultSec.sectorPerimeter}`
              ])}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button type="button" onClick={handleSaveSec} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedSec ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {!resultSec.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{resultSec.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Radius (r):</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={secRadiusStr}
                  onChange={(e)=>setSecRadiusStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="font-bold block mb-1">Central Angle (θ):</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={secAngleStr}
                    onChange={(e)=>setSecAngleStr(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Unit:</label>
                  <select
                    value={secAngleUnit}
                    onChange={(e)=>setSecAngleUnit(e.target.value as any)}
                    className="w-full h-9 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  >
                    <option value="deg">Degrees (°)</option>
                    <option value="rad">Radians (rad)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Arc Length L</span><span className="text-emerald-600 dark:text-emerald-400">{resultSec.isValid ? resultSec.arcLength : "—"}</span></div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Sector Area</span><span className="text-blue-600 dark:text-blue-400">{resultSec.isValid ? resultSec.sectorArea : "—"}</span></div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Perimeter P</span><span className="text-slate-900 dark:text-slate-100">{resultSec.isValid ? resultSec.sectorPerimeter : "—"}</span></div>
              </div>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderSectorSVG()}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED SECTOR CALCULATIONS */}
          {renderSavedCardsGroup(
            "Saved Sector Calculations",
            savedSecItems,
            () => { setSavedSecItems([]); try { localStorage.removeItem("saved_circle_sec"); } catch(e){} },
            (id) => { const updated = savedSecItems.filter(i => i.id !== id); setSavedSecItems(updated); try { localStorage.setItem("saved_circle_sec", JSON.stringify(updated)); } catch(e){} },
            "saved_circle_sec"
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: CIRCULAR SEGMENT & CHORD / SAGITTA SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Circular Segment &amp; Chord / Sagitta Solver</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopyText(resultSeg.stepText, "seg")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "seg" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "seg" ? "Copied" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => handleExportCSV("Segment", `r=${segRadiusStr}, c=${segChordStr}`, [
                `Sagitta = ${resultSeg.sagitta}`,
                `Segment Area = ${resultSeg.segmentArea}`,
                `Central Angle = ${resultSeg.centralAngleDeg}°`
              ])}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button type="button" onClick={handleSaveSeg} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedSeg ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {!resultSeg.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{resultSeg.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Radius (r):</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={segRadiusStr}
                  onChange={(e)=>setSegRadiusStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Chord Length (c):</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={segChordStr}
                  onChange={(e)=>setSegChordStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Sagitta (Height h)</span><span className="text-emerald-600 dark:text-emerald-400">{resultSeg.isValid ? resultSeg.sagitta : "—"}</span></div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Segment Area</span><span className="text-red-600 dark:text-red-400">{resultSeg.isValid ? resultSeg.segmentArea : "—"}</span></div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center"><span className="text-[9px] text-slate-400 uppercase block font-sans">Central Angle θ</span><span className="text-blue-600 dark:text-blue-400">{resultSeg.isValid ? `${resultSeg.centralAngleDeg}°` : "—"}</span></div>
              </div>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderSegmentSVG()}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED SEGMENT CALCULATIONS */}
          {renderSavedCardsGroup(
            "Saved Segment Calculations",
            savedSegItems,
            () => { setSavedSegItems([]); try { localStorage.removeItem("saved_circle_seg"); } catch(e){} },
            (id) => { const updated = savedSegItems.filter(i => i.id !== id); setSavedSegItems(updated); try { localStorage.setItem("saved_circle_seg", JSON.stringify(updated)); } catch(e){} },
            "saved_circle_seg"
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: ANNULUS & CIRCULAR RING SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Annulus &amp; Circular Ring Solver</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopyText(resultAnn.stepText, "ann")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "ann" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "ann" ? "Copied" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => handleExportCSV("Annulus", `R=${annOuterRStr}, r=${annInnerRStr}`, [
                `Annulus Area = ${resultAnn.annulusArea}`,
                `Wall Thickness = ${resultAnn.wallThickness}`,
                `Avg Radius = ${resultAnn.avgRadius}`
              ])}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button type="button" onClick={handleSaveAnn} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedAnn ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {!resultAnn.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{resultAnn.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Outer Radius (R):</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={annOuterRStr}
                  onChange={(e)=>setAnnOuterRStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Inner Radius (r):</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={annInnerRStr}
                  onChange={(e)=>setAnnInnerRStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Annulus Area</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {resultAnn.isValid ? resultAnn.annulusArea : "—"}
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Wall Thickness t = {resultAnn.isValid ? resultAnn.wallThickness : "—"} | Avg Radius = {resultAnn.isValid ? resultAnn.avgRadius : "—"}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderAnnulusSVG()}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED ANNULUS CALCULATIONS */}
          {renderSavedCardsGroup(
            "Saved Annulus Calculations",
            savedAnnItems,
            () => { setSavedAnnItems([]); try { localStorage.removeItem("saved_circle_ann"); } catch(e){} },
            (id) => { const updated = savedAnnItems.filter(i => i.id !== id); setSavedAnnItems(updated); try { localStorage.setItem("saved_circle_ann", JSON.stringify(updated)); } catch(e){} },
            "saved_circle_ann"
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: CIRCLE EQUATION & COORDINATE GEOMETRY */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Circle Equation &amp; Coordinate Geometry Solver</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopyText(resultEq.stepText, "eq")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "eq" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "eq" ? "Copied" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => handleExportCSV("Equation", `h=${eqHStr}, k=${eqKStr}, r=${eqRStr}`, [
                `Standard = ${resultEq.standardForm}`,
                `General = ${resultEq.generalForm}`
              ])}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button type="button" onClick={handleSaveEq} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedEq ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {!resultEq.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{resultEq.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">Center X (h):</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={eqHStr}
                    onChange={(e)=>setEqHStr(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Center Y (k):</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={eqKStr}
                    onChange={(e)=>setEqKStr(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Radius (r):</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={eqRStr}
                  onChange={(e)=>setEqRStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3 text-xs font-mono">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block font-sans font-extrabold">Standard Form (Center-Radius)</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{resultEq.isValid ? resultEq.standardForm : "—"}</span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block font-sans font-extrabold">General Form</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold text-sm">{resultEq.isValid ? resultEq.generalForm : "—"}</span>
              </div>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-sans">
                {renderEquationSVG()}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED EQUATION CALCULATIONS */}
          {renderSavedCardsGroup(
            "Saved Circle Equations",
            savedEqItems,
            () => { setSavedEqItems([]); try { localStorage.removeItem("saved_circle_eq"); } catch(e){} },
            (id) => { const updated = savedEqItems.filter(i => i.id !== id); setSavedEqItems(updated); try { localStorage.setItem("saved_circle_eq", JSON.stringify(updated)); } catch(e){} },
            "saved_circle_eq"
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 6: CIRCLE THROUGH 3 POINTS (CIRCUMCIRCLE) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Circle Through 3 Points (Circumcircle Solver)</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopyText(result3P.stepText, "3p")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "3p" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "3p" ? "Copied" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => handleExportCSV("Circumcircle", `P1(${p1xStr},${p1yStr}), P2(${p2xStr},${p2yStr}), P3(${p3xStr},${p3yStr})`, [
                `Center = (${result3P.center.h}, ${result3P.center.k})`,
                `Radius = ${result3P.radius}`,
                `Area = ${result3P.area}`
              ])}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button type="button" onClick={handleSave3P} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSaved3P ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {(!result3P.isValid || result3P.isCollinear) && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{result3P.errorMessage || "Invalid or collinear points entered."}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div><label className="font-bold">P1 X:</label><input type="text" inputMode="decimal" value={p1xStr} onChange={(e)=>setP1xStr(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"/></div>
                <div><label className="font-bold">P1 Y:</label><input type="text" inputMode="decimal" value={p1yStr} onChange={(e)=>setP1yStr(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"/></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="font-bold">P2 X:</label><input type="text" inputMode="decimal" value={p2xStr} onChange={(e)=>setP2xStr(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"/></div>
                <div><label className="font-bold">P2 Y:</label><input type="text" inputMode="decimal" value={p2yStr} onChange={(e)=>setP2yStr(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"/></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="font-bold">P3 X:</label><input type="text" inputMode="decimal" value={p3xStr} onChange={(e)=>setP3xStr(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"/></div>
                <div><label className="font-bold">P3 Y:</label><input type="text" inputMode="decimal" value={p3yStr} onChange={(e)=>setP3yStr(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"/></div>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Circumcircle Properties</span>
              <div className="text-2xl font-mono font-black text-slate-900 dark:text-slate-100">
                {result3P.isValid ? `Circumradius R = ${result3P.radius}` : "Circumradius = —"}
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                {result3P.isValid
                  ? `Circumcenter = (${result3P.center.h}, ${result3P.center.k}) | Area = ${result3P.area}`
                  : "Circumcenter: Undefined (Collinear Points)"}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {render3PointSVG()}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED 3-POINT CALCULATIONS */}
          {renderSavedCardsGroup(
            "Saved 3-Point Circumcircles",
            saved3PItems,
            () => { setSaved3PItems([]); try { localStorage.removeItem("saved_circle_3p"); } catch(e){} },
            (id) => { const updated = saved3PItems.filter(i => i.id !== id); setSaved3PItems(updated); try { localStorage.setItem("saved_circle_3p", JSON.stringify(updated)); } catch(e){} },
            "saved_circle_3p"
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 7: MASTER CIRCLE UNIT CONVERTER MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Master Circle Unit Converter Matrix</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleExportCSV("Unit Converter", `Radius = ${convRadiusStr} ${convUnit}`, [
                `Meters Area = ${resultConv.meters.a} m²`,
                `Feet Area = ${resultConv.feet.a} ft²`,
                `Inches Area = ${resultConv.inches.a} in²`
              ])}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button type="button" onClick={handleSaveConv} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedConv ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold mb-1">Radius Value:</label>
              <input
                type="text"
                inputMode="decimal"
                value={convRadiusStr}
                onChange={(e)=>setConvRadiusStr(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Base Unit:</label>
              <select
                value={convUnit}
                onChange={(e)=>setConvUnit(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm"
              >
                <option value="meters">Meters (m)</option>
                <option value="cm">Centimeters (cm)</option>
                <option value="mm">Millimeters (mm)</option>
                <option value="feet">Feet (ft)</option>
                <option value="inches">Inches (in)</option>
                <option value="yards">Yards (yd)</option>
                <option value="km">Kilometers (km)</option>
                <option value="miles">Miles (mi)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
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
                <tr><td className="p-2 font-bold font-sans">Millimeters (mm)</td><td className="p-2">{resultConv.mm.r}</td><td className="p-2">{resultConv.mm.d}</td><td className="p-2 font-bold">{resultConv.mm.c}</td><td className="p-2 font-bold">{resultConv.mm.a} mm²</td></tr>
                <tr><td className="p-2 font-bold font-sans">Feet (ft)</td><td className="p-2">{resultConv.feet.r}</td><td className="p-2">{resultConv.feet.d}</td><td className="p-2 font-bold">{resultConv.feet.c}</td><td className="p-2 font-bold">{resultConv.feet.a} ft²</td></tr>
                <tr><td className="p-2 font-bold font-sans">Inches (in)</td><td className="p-2">{resultConv.inches.r}</td><td className="p-2">{resultConv.inches.d}</td><td className="p-2 font-bold">{resultConv.inches.c}</td><td className="p-2 font-bold">{resultConv.inches.a} in²</td></tr>
                <tr><td className="p-2 font-bold font-sans">Yards (yd)</td><td className="p-2">{resultConv.yards.r}</td><td className="p-2">{resultConv.yards.d}</td><td className="p-2 font-bold">{resultConv.yards.c}</td><td className="p-2 font-bold">{resultConv.yards.a} yd²</td></tr>
                <tr><td className="p-2 font-bold font-sans">Kilometers (km)</td><td className="p-2">{resultConv.km.r}</td><td className="p-2">{resultConv.km.d}</td><td className="p-2 font-bold">{resultConv.km.c}</td><td className="p-2 font-bold">{resultConv.km.a} km²</td></tr>
                <tr><td className="p-2 font-bold font-sans">Miles (mi)</td><td className="p-2">{resultConv.miles.r}</td><td className="p-2">{resultConv.miles.d}</td><td className="p-2 font-bold">{resultConv.miles.c}</td><td className="p-2 font-bold">{resultConv.miles.a} mi²</td></tr>
              </tbody>
            </table>
          </div>

          {/* EMBEDDED SAVED CONVERTER CALCULATIONS */}
          {renderSavedCardsGroup(
            "Saved Converter Calculations",
            savedConvItems,
            () => { setSavedConvItems([]); try { localStorage.removeItem("saved_circle_conv"); } catch(e){} },
            (id) => { const updated = savedConvItems.filter(i => i.id !== id); setSavedConvItems(updated); try { localStorage.setItem("saved_circle_conv", JSON.stringify(updated)); } catch(e){} },
            "saved_circle_conv"
          )}
        </div>
      </div>
    </div>
  );
}

export default CircleCalculator;
