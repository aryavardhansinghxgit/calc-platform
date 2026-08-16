"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Zap,
  MapPin,
  Compass,
  Navigation,
  Activity,
  Maximize2
} from "lucide-react";
import {
  compute2DDistance,
  compute3DDistance,
  computeHaversineDistance,
  computeSpeedDistanceTime,
  computePointToLineDistance,
  convertDistanceFromMeters,
  TwoDDistanceResult,
  ThreeDDistanceResult,
  HaversineResult
} from "@/app/calculators/distance-calculator/distance-logic";

export interface SavedDistanceItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function DistanceCalculator() {
  // Card 1 Inputs: 2D Distance
  const [x1, setX1] = useState<number>(0);
  const [y1, setY1] = useState<number>(0);
  const [x2, setX2] = useState<number>(3);
  const [y2, setY2] = useState<number>(4);
  const [precision1, setPrecision1] = useState<number>(4);

  // Card 2 Inputs: 3D Distance
  const [x1_3d, setX1_3d] = useState<number>(1);
  const [y1_3d, setY1_3d] = useState<number>(1);
  const [z1_3d, setZ1_3d] = useState<number>(1);
  const [x2_3d, setX2_3d] = useState<number>(4);
  const [y2_3d, setY2_3d] = useState<number>(5);
  const [z2_3d, setZ2_3d] = useState<number>(9);

  // Card 3 Inputs: Lat/Long Earth Distance
  const [lat1, setLat1] = useState<number>(40.7128); // NY
  const [lon1, setLon1] = useState<number>(-74.0060);
  const [lat2, setLat2] = useState<number>(51.5074); // London
  const [lon2, setLon2] = useState<number>(-0.1278);

  // Card 4 Inputs: Speed Distance Time
  const [sdtMode, setSdtMode] = useState<"distance" | "speed" | "time">("distance");
  const [sdtVal1, setSdtVal1] = useState<number>(60); // speed mph
  const [sdtVal2, setSdtVal2] = useState<number>(2.5); // time hrs

  // Card 5 Inputs: Point-to-Line Distance
  const [ptX0, setPtX0] = useState<number>(2);
  const [ptY0, setPtY0] = useState<number>(3);
  const [lineA, setLineA] = useState<number>(3);
  const [lineB, setLineB] = useState<number>(4);
  const [lineC, setLineC] = useState<number>(-12);

  // Card 6 Inputs: Master Unit Converter
  const [convVal, setConvVal] = useState<number>(1000);
  const [convUnit, setConvUnit] = useState<"meters" | "kilometers" | "feet" | "miles" | "nauticalMiles">("meters");

  // Saved calculation states
  const [saved2DItems, setSaved2DItems] = useState<SavedDistanceItem[]>([]);
  const [justSaved2D, setJustSaved2D] = useState<boolean>(false);

  const [saved3DItems, setSaved3DItems] = useState<SavedDistanceItem[]>([]);
  const [justSaved3D, setJustSaved3D] = useState<boolean>(false);

  const [savedGeoItems, setSavedGeoItems] = useState<SavedDistanceItem[]>([]);
  const [justSavedGeo, setJustSavedGeo] = useState<boolean>(false);

  const [savedSdtItems, setSavedSdtItems] = useState<SavedDistanceItem[]>([]);
  const [justSavedSdt, setJustSavedSdt] = useState<boolean>(false);

  const [savedPtLineItems, setSavedPtLineItems] = useState<SavedDistanceItem[]>([]);
  const [justSavedPtLine, setJustSavedPtLine] = useState<boolean>(false);

  const [savedConvItems, setSavedConvItems] = useState<SavedDistanceItem[]>([]);
  const [justSavedConv, setJustSavedConv] = useState<boolean>(false);

  // Expand state
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_dist_2d"); if (s1) setSaved2DItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_dist_3d"); if (s2) setSaved3DItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_dist_geo"); if (s3) setSavedGeoItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_dist_sdt"); if (s4) setSavedSdtItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_dist_ptline"); if (s5) setSavedPtLineItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_dist_conv"); if (s6) setSavedConvItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Card 1 Calculations
  const result2D: TwoDDistanceResult = useMemo(() => {
    return compute2DDistance(x1, y1, x2, y2, precision1);
  }, [x1, y1, x2, y2, precision1]);

  // Card 2 Calculations
  const result3D: ThreeDDistanceResult = useMemo(() => {
    return compute3DDistance(x1_3d, y1_3d, z1_3d, x2_3d, y2_3d, z2_3d, precision1);
  }, [x1_3d, y1_3d, z1_3d, x2_3d, y2_3d, z2_3d, precision1]);

  // Card 3 Calculations
  const resultGeo: HaversineResult = useMemo(() => {
    return computeHaversineDistance(lat1, lon1, lat2, lon2, precision1);
  }, [lat1, lon1, lat2, lon2, precision1]);

  // Card 4 Calculations
  const resultSdt = useMemo(() => {
    return computeSpeedDistanceTime(sdtMode, sdtVal1, sdtVal2, precision1);
  }, [sdtMode, sdtVal1, sdtVal2, precision1]);

  // Card 5 Calculations
  const resultPtLine = useMemo(() => {
    return computePointToLineDistance(ptX0, ptY0, lineA, lineB, lineC, precision1);
  }, [ptX0, ptY0, lineA, lineB, lineC, precision1]);

  // Card 6 Calculations
  const resultConv = useMemo(() => {
    let meters = convVal;
    if (convUnit === "kilometers") meters = convVal * 1000;
    else if (convUnit === "feet") meters = convVal * 0.3048;
    else if (convUnit === "miles") meters = convVal * 1609.344;
    else if (convUnit === "nauticalMiles") meters = convVal * 1852;
    return convertDistanceFromMeters(meters, precision1);
  }, [convVal, convUnit, precision1]);

  // Quick Presets
  const handleApplyPreset2D = (preset: "345" | "diagonal" | "neg") => {
    if (preset === "345") { setX1(0); setY1(0); setX2(3); setY2(4); }
    else if (preset === "diagonal") { setX1(0); setY1(0); setX2(10); setY2(10); }
    else if (preset === "neg") { setX1(-2); setY1(-3); setX2(4); setY2(5); }
  };

  const handleApplyPresetGeo = (preset: "nylon" | "toksyd" | "parcai") => {
    if (preset === "nylon") { setLat1(40.7128); setLon1(-74.006); setLat2(51.5074); setLon2(-0.1278); }
    else if (preset === "toksyd") { setLat1(35.6762); setLon1(139.6503); setLat2(-33.8688); setLon2(151.2093); }
    else if (preset === "parcai") { setLat1(48.8566); setLon1(2.3522); setLat2(30.0444); setLon2(31.2357); }
  };

  // Save Handlers
  const handleSave2D = () => {
    const inputsStr = `(${x1}, ${y1}) to (${x2}, ${y2})`;
    const resList = [
      `Euclidean Distance d = ${result2D.euclidean}`,
      `Manhattan Distance dM = ${result2D.manhattan}`,
      `Midpoint = (${result2D.midpoint.x}, ${result2D.midpoint.y})`
    ];
    const newItem: SavedDistanceItem = {
      id: Date.now().toString(),
      title: `2D Distance d = ${result2D.euclidean}`,
      inputs: inputsStr,
      operation: `2D Coordinate Distance`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...saved2DItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSaved2DItems(updated);
    try { localStorage.setItem("saved_dist_2d", JSON.stringify(updated)); } catch (e) {}
    setJustSaved2D(true); setTimeout(() => setJustSaved2D(false), 2000);
  };

  const handleSave3D = () => {
    const inputsStr = `(${x1_3d}, ${y1_3d}, ${z1_3d}) to (${x2_3d}, ${y2_3d}, ${z2_3d})`;
    const resList = [
      `3D Euclidean Distance d = ${result3D.euclidean}`,
      `3D Midpoint = (${result3D.midpoint.x}, ${result3D.midpoint.y}, ${result3D.midpoint.z})`
    ];
    const newItem: SavedDistanceItem = {
      id: Date.now().toString(),
      title: `3D Distance d = ${result3D.euclidean}`,
      inputs: inputsStr,
      operation: `3D Spatial Distance`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...saved3DItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSaved3DItems(updated);
    try { localStorage.setItem("saved_dist_3d", JSON.stringify(updated)); } catch (e) {}
    setJustSaved3D(true); setTimeout(() => setJustSaved3D(false), 2000);
  };

  const handleSaveGeo = () => {
    const inputsStr = `(${lat1}, ${lon1}) to (${lat2}, ${lon2})`;
    const resList = [
      `Distance = ${resultGeo.miles} mi (${resultGeo.km} km)`,
      `Nautical Miles = ${resultGeo.nauticalMiles} NM`,
      `Bearing = ${resultGeo.initialBearingDeg}° (${resultGeo.compassDirection})`
    ];
    const newItem: SavedDistanceItem = {
      id: Date.now().toString(),
      title: `Earth Distance = ${resultGeo.miles} miles`,
      inputs: inputsStr,
      operation: `Haversine Earth Distance`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedGeoItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedGeoItems(updated);
    try { localStorage.setItem("saved_dist_geo", JSON.stringify(updated)); } catch (e) {}
    setJustSavedGeo(true); setTimeout(() => setJustSavedGeo(false), 2000);
  };

  const handleSaveSdt = () => {
    const inputsStr = `Kinematics (${sdtMode})`;
    const resList = [
      `Distance = ${resultSdt.distanceMiles} miles`,
      `Speed = ${resultSdt.speedMph} mph`,
      `Time = ${resultSdt.timeHours} hrs (${resultSdt.paceMinPerMile})`
    ];
    const newItem: SavedDistanceItem = {
      id: Date.now().toString(),
      title: `Speed-Distance-Time (${sdtMode})`,
      inputs: inputsStr,
      operation: `Kinematics Suite`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedSdtItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedSdtItems(updated);
    try { localStorage.setItem("saved_dist_sdt", JSON.stringify(updated)); } catch (e) {}
    setJustSavedSdt(true); setTimeout(() => setJustSavedSdt(false), 2000);
  };

  const handleSavePtLine = () => {
    const inputsStr = `Point (${ptX0}, ${ptY0}) to Line ${lineA}x+${lineB}y+${lineC}=0`;
    const resList = [`Orthogonal Distance d = ${resultPtLine.distance}`];
    const newItem: SavedDistanceItem = {
      id: Date.now().toString(),
      title: `Point-to-Line Distance d = ${resultPtLine.distance}`,
      inputs: inputsStr,
      operation: `Point-to-Line Solver`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedPtLineItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedPtLineItems(updated);
    try { localStorage.setItem("saved_dist_ptline", JSON.stringify(updated)); } catch (e) {}
    setJustSavedPtLine(true); setTimeout(() => setJustSavedPtLine(false), 2000);
  };

  const handleSaveConv = () => {
    const inputsStr = `${convVal} ${convUnit}`;
    const resList = [`${resultConv.miles} miles`, `${resultConv.kilometers} km`, `${resultConv.feet} feet`];
    const newItem: SavedDistanceItem = {
      id: Date.now().toString(),
      title: `Converted ${convVal} ${convUnit} = ${resultConv.miles} mi`,
      inputs: inputsStr,
      operation: `Master Distance Conversion`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConvItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedConvItems(updated);
    try { localStorage.setItem("saved_dist_conv", JSON.stringify(updated)); } catch (e) {}
    setJustSavedConv(true); setTimeout(() => setJustSavedConv(false), 2000);
  };

  // Render 2D Cartesian Coordinate Visualizer SVG
  const render2DSVG = (px1: number, py1: number, px2: number, py2: number) => {
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

        {/* Axes */}
        <line x1={padding} y1={originY} x2={width - padding} y2={originY} stroke="#94a3b8" strokeWidth="1.5" />
        <line x1={originX} y1={padding} x2={originX} y2={height - padding} stroke="#94a3b8" strokeWidth="1.5" />

        {/* Rise & Run */}
        <line x1={x2Svg} y1={y1Svg} x2={x2Svg} y2={y2Svg} stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
        <text x={x2Svg + 6} y={(y1Svg + y2Svg) / 2} className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">Δy</text>

        <line x1={x1Svg} y1={y1Svg} x2={x2Svg} y2={y1Svg} stroke="#2563eb" strokeWidth="2" strokeDasharray="3,3" />
        <text x={(x1Svg + x2Svg) / 2} y={y1Svg + 12} textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">Δx</text>

        {/* Hypotenuse Distance line */}
        <line x1={x1Svg} y1={y1Svg} x2={x2Svg} y2={y2Svg} stroke="#16a34a" strokeWidth="2.5" />
        <text x={(x1Svg + x2Svg) / 2 - 8} y={(y1Svg + y2Svg) / 2 - 8} className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">d</text>

        {/* Points */}
        <circle cx={x1Svg} cy={y1Svg} r="4" fill="#2563eb" />
        <text x={x1Svg - 12} y={y1Svg - 6} className="text-[9px] font-mono font-bold fill-blue-700 dark:fill-blue-300">(x1, y1)</text>

        <circle cx={x2Svg} cy={y2Svg} r="4" fill="#16a34a" />
        <text x={x2Svg + 6} y={y2Svg - 6} className="text-[9px] font-mono font-bold fill-emerald-700 dark:fill-emerald-300">(x2, y2)</text>
      </svg>
    );
  };

  // Render 3D Spatial Box Projection SVG
  const render3DSVG = () => {
    const width = 240; const height = 180;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        {/* 3D Bounding Box */}
        <path d="M 50 120 L 150 120 L 190 80 L 90 80 Z" fill="#3b82f6" fillOpacity="0.15" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M 50 120 L 50 60 L 90 20 L 90 80 Z" fill="#3b82f6" fillOpacity="0.1" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M 50 60 L 150 60 L 190 20 L 90 20 Z" fill="#3b82f6" fillOpacity="0.2" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="150" y1="120" x2="150" y2="60" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="190" y1="80" x2="190" y2="20" stroke="#94a3b8" strokeWidth="1.5" />

        {/* Space Diagonal Line */}
        <line x1="50" y1="120" x2="190" y2="20" stroke="#16a34a" strokeWidth="2.5" />
        <text x="120" y="60" className="text-[11px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">d (3D)</text>

        {/* Start and End Points */}
        <circle cx="50" cy="120" r="4" fill="#2563eb" />
        <text x="35" y="138" className="text-[9px] font-mono font-bold fill-blue-700 dark:fill-blue-300">(x1, y1, z1)</text>

        <circle cx="190" cy="20" r="4" fill="#16a34a" />
        <text x="145" y="16" className="text-[9px] font-mono font-bold fill-emerald-700 dark:fill-emerald-300">(x2, y2, z2)</text>
      </svg>
    );
  };

  // Render Earth Arc / Globe SVG Visualizer
  const renderGeoSVG = () => {
    const width = 240; const height = 180;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        {/* Globe Circle */}
        <circle cx="120" cy="90" r="65" fill="#3b82f6" fillOpacity="0.15" stroke="#1d4ed8" strokeWidth="2" />
        <ellipse cx="120" cy="90" rx="65" ry="22" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
        <line x1="120" y1="25" x2="120" y2="155" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />

        {/* Great-Circle Flight Arc */}
        <path d="M 70 80 A 65 65 0 0 1 170 80" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4,4" />
        <text x="120" y="55" textAnchor="middle" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">Great-Circle Flight Path</text>

        {/* Pin 1 & Pin 2 */}
        <circle cx="70" cy="80" r="4" fill="#2563eb" />
        <text x="50" y="95" className="text-[9px] font-mono font-bold fill-blue-700 dark:fill-blue-300">Point 1</text>

        <circle cx="170" cy="80" r="4" fill="#16a34a" />
        <text x="172" y="95" className="text-[9px] font-mono font-bold fill-emerald-700 dark:fill-emerald-300">Point 2</text>
      </svg>
    );
  };

  // Render Kinematics Triangle SVG
  const renderKinematicsSVG = () => {
    const width = 240; const height = 180;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        <path d="M 120 30 L 190 140 L 50 140 Z" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
        <line x1="75" y1="95" x2="165" y2="95" stroke="#1d4ed8" strokeWidth="2" />
        <line x1="120" y1="95" x2="120" y2="140" stroke="#1d4ed8" strokeWidth="2" />
        <text x="120" y="70" textAnchor="middle" className="text-[16px] font-mono font-black fill-blue-600 dark:fill-blue-400">d</text>
        <text x="85" y="125" textAnchor="middle" className="text-[16px] font-mono font-black fill-emerald-600 dark:fill-emerald-400">s</text>
        <text x="155" y="125" textAnchor="middle" className="text-[16px] font-mono font-black fill-purple-600 dark:fill-purple-400">t</text>
      </svg>
    );
  };

  // Render Point-to-Line SVG
  const renderPtLineSVG = () => {
    const width = 240; const height = 180;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        {/* Line Ax + By + C = 0 */}
        <line x1="40" y1="140" x2="200" y2="40" stroke="#1d4ed8" strokeWidth="2.5" />
        <text x="170" y="32" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">Ax + By + C = 0</text>

        {/* Target Point */}
        <circle cx="70" cy="50" r="4" fill="#dc2626" />
        <text x="45" y="42" className="text-[9px] font-mono font-bold fill-red-600 dark:fill-red-400">(x0, y0)</text>

        {/* Perpendicular Projection Line */}
        <line x1="70" y1="50" x2="120" y2="90" stroke="#16a34a" strokeWidth="2" strokeDasharray="3,3" />
        <text x="100" y="65" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">d (orthogonal)</text>
      </svg>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: 2D COORDINATE DISTANCE ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>2D Coordinate Distance Engine</span>
          <button
            type="button"
            onClick={handleSave2D}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSaved2D ? "Saved!" : "Save"}</span>
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
              onClick={() => handleApplyPreset2D("345")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (0, 0) to (3, 4) [3-4-5 Triangle]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset2D("diagonal")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (0, 0) to (10, 10) [Square Diagonal]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset2D("neg")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (-2, -3) to (4, 5) [Negative Quadrant]
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>2D Cartesian Coordinates</span>
              </h2>

              <div className="space-y-4 text-xs">
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
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Calculated 2D Euclidean Distance (d)
                  </span>
                  <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-slate-100 break-all">
                    {result2D.euclidean}
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Midpoint M = ({result2D.midpoint.x}, {result2D.midpoint.y})
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Manhattan (L₁)</span>
                    <span className="text-slate-900 dark:text-slate-100">{result2D.manhattan}</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Chebyshev (L∞)</span>
                    <span className="text-slate-900 dark:text-slate-100">{result2D.chebyshev}</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Incline Angle θ</span>
                    <span className="text-blue-600 dark:text-blue-400">{result2D.angleDeg}°</span>
                  </div>
                </div>

                <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  {render2DSVG(x1, y1, x2, y2)}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED 2D CALCULATIONS INSIDE CARD 1 */}
          {saved2DItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved 2D Distance Calculations ({saved2DItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSaved2DItems([]);
                    try { localStorage.removeItem("saved_dist_2d"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {saved2DItems.map((item) => {
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
                            const updated = saved2DItems.filter(i => i.id !== item.id);
                            setSaved2DItems(updated);
                            try { localStorage.setItem("saved_dist_2d", JSON.stringify(updated)); } catch(e){}
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
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: 3D SPATIAL COORDINATE DISTANCE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>3D Spatial Coordinate Distance Solver</span>
          <button
            type="button"
            onClick={handleSave3D}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSaved3D ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <Maximize2 className="h-4 w-4 text-blue-600" />
                <span>3D Spatial Coordinates (X, Y, Z)</span>
              </h2>

              <div className="grid grid-cols-3 gap-1.5">
                <div><label className="font-bold block mb-1">X₁:</label><input type="number" value={x1_3d} onChange={(e)=>setX1_3d(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
                <div><label className="font-bold block mb-1">Y₁:</label><input type="number" value={y1_3d} onChange={(e)=>setY1_3d(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
                <div><label className="font-bold block mb-1">Z₁:</label><input type="number" value={z1_3d} onChange={(e)=>setZ1_3d(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <div><label className="font-bold block mb-1">X₂:</label><input type="number" value={x2_3d} onChange={(e)=>setX2_3d(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
                <div><label className="font-bold block mb-1">Y₂:</label><input type="number" value={y2_3d} onChange={(e)=>setY2_3d(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
                <div><label className="font-bold block mb-1">Z₂:</label><input type="number" value={z2_3d} onChange={(e)=>setZ2_3d(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Calculated 3D Distance</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {result3D.euclidean}
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                3D Midpoint = ({result3D.midpoint.x}, {result3D.midpoint.y}, {result3D.midpoint.z})
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {render3DSVG()}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED 3D CALCULATIONS INSIDE CARD 2 */}
          {saved3DItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved 3D Distance Calculations ({saved3DItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSaved3DItems([]);
                    try { localStorage.removeItem("saved_dist_3d"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {saved3DItems.map((item) => {
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
                            const updated = saved3DItems.filter(i => i.id !== item.id);
                            setSaved3DItems(updated);
                            try { localStorage.setItem("saved_dist_3d", JSON.stringify(updated)); } catch(e){}
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
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: LATITUDE & LONGITUDE EARTH DISTANCE SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Latitude &amp; Longitude Earth Distance Suite</span>
          <button
            type="button"
            onClick={handleSaveGeo}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedGeo ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className="text-slate-500 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" /> City Flight Presets:
            </span>
            <button
              type="button"
              onClick={() => handleApplyPresetGeo("nylon")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              New York to London
            </button>
            <button
              type="button"
              onClick={() => handleApplyPresetGeo("toksyd")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Tokyo to Sydney
            </button>
            <button
              type="button"
              onClick={() => handleApplyPresetGeo("parcai")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Paris to Cairo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div><label className="font-bold block mb-1">Lat 1 (°):</label><input type="number" step="any" value={lat1} onChange={(e)=>setLat1(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
                <div><label className="font-bold block mb-1">Lon 1 (°):</label><input type="number" step="any" value={lon1} onChange={(e)=>setLon1(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div><label className="font-bold block mb-1">Lat 2 (°):</label><input type="number" step="any" value={lat2} onChange={(e)=>setLat2(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
                <div><label className="font-bold block mb-1">Lon 2 (°):</label><input type="number" step="any" value={lon2} onChange={(e)=>setLon2(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Great-Circle Distance</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {resultGeo.miles} <span className="text-base text-blue-600">miles</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                {resultGeo.km} km | {resultGeo.nauticalMiles} Nautical Miles (NM)
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
                Initial Bearing = {resultGeo.initialBearingDeg}° ({resultGeo.compassDirection})
              </div>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderGeoSVG()}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED GEO CALCULATIONS INSIDE CARD 3 */}
          {savedGeoItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Earth Distance Calculations ({savedGeoItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedGeoItems([]);
                    try { localStorage.removeItem("saved_dist_geo"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedGeoItems.map((item) => {
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
                            const updated = savedGeoItems.filter(i => i.id !== item.id);
                            setSavedGeoItems(updated);
                            try { localStorage.setItem("saved_dist_geo", JSON.stringify(updated)); } catch(e){}
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
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: SPEED, DISTANCE & TIME KINEMATICS */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Speed, Distance &amp; Time Kinematics</span>
          <button
            type="button"
            onClick={handleSaveSdt}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSdt ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold w-fit">
            <button type="button" onClick={()=>setSdtMode("distance")} className={`px-3 py-1 rounded-lg cursor-pointer ${sdtMode==="distance"?"bg-blue-600 text-white":""}`}>Distance (d = s × t)</button>
            <button type="button" onClick={()=>setSdtMode("speed")} className={`px-3 py-1 rounded-lg cursor-pointer ${sdtMode==="speed"?"bg-blue-600 text-white":""}`}>Speed (s = d / t)</button>
            <button type="button" onClick={()=>setSdtMode("time")} className={`px-3 py-1 rounded-lg cursor-pointer ${sdtMode==="time"?"bg-blue-600 text-white":""}`}>Time (t = d / s)</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <label className="block font-bold mb-1">{sdtMode === "distance" ? "Speed (mph):" : "Distance (miles):"}</label>
                <input type="number" step="any" value={sdtVal1} onChange={(e)=>setSdtVal1(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/>
              </div>
              <div>
                <label className="block font-bold mb-1">{sdtMode === "time" ? "Speed (mph):" : "Time (hours):"}</label>
                <input type="number" step="any" value={sdtVal2} onChange={(e)=>setSdtVal2(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Solved {sdtMode.toUpperCase()}</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {sdtMode === "distance" ? `${resultSdt.distanceMiles} miles` : sdtMode === "speed" ? `${resultSdt.speedMph} mph` : `${resultSdt.timeHours} hours`}
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Pace = {resultSdt.paceMinPerMile}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderKinematicsSVG()}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED KINEMATICS CALCULATIONS INSIDE CARD 4 */}
          {savedSdtItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Kinematics Calculations ({savedSdtItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSdtItems([]);
                    try { localStorage.removeItem("saved_dist_sdt"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedSdtItems.map((item) => {
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
                            const updated = savedSdtItems.filter(i => i.id !== item.id);
                            setSavedSdtItems(updated);
                            try { localStorage.setItem("saved_dist_sdt", JSON.stringify(updated)); } catch(e){}
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
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: POINT-TO-LINE ORTHOGONAL DISTANCE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Point-to-Line Orthogonal Distance Solver</span>
          <button
            type="button"
            onClick={handleSavePtLine}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedPtLine ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div><label className="font-bold block mb-1">Target X₀:</label><input type="number" value={ptX0} onChange={(e)=>setPtX0(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
                <div><label className="font-bold block mb-1">Target Y₀:</label><input type="number" value={ptY0} onChange={(e)=>setPtY0(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <div><label className="font-bold block mb-1">Line A:</label><input type="number" value={lineA} onChange={(e)=>setLineA(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
                <div><label className="font-bold block mb-1">Line B:</label><input type="number" value={lineB} onChange={(e)=>setLineB(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
                <div><label className="font-bold block mb-1">Line C:</label><input type="number" value={lineC} onChange={(e)=>setLineC(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Shortest Perpendicular Distance</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {resultPtLine.distance}
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Formula: d = |Ax0 + By0 + C| / √(A² + B²)
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderPtLineSVG()}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED POINT-TO-LINE CALCULATIONS INSIDE CARD 5 */}
          {savedPtLineItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Point-to-Line Calculations ({savedPtLineItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPtLineItems([]);
                    try { localStorage.removeItem("saved_dist_ptline"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedPtLineItems.map((item) => {
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
                            const updated = savedPtLineItems.filter(i => i.id !== item.id);
                            setSavedPtLineItems(updated);
                            try { localStorage.setItem("saved_dist_ptline", JSON.stringify(updated)); } catch(e){}
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
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 6: MASTER DISTANCE UNIT CONVERTER MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Master Distance Unit Converter Matrix</span>
          <button
            type="button"
            onClick={handleSaveConv}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedConv ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold mb-1">Distance Value:</label>
              <input
                type="number"
                step="any"
                value={convVal}
                onChange={(e) => setConvVal(parseFloat(e.target.value) || 0)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Base Distance Unit:</label>
              <select
                value={convUnit}
                onChange={(e) => setConvUnit(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm"
              >
                <option value="meters">Meters (m)</option>
                <option value="kilometers">Kilometers (km)</option>
                <option value="feet">Feet (ft)</option>
                <option value="miles">Miles (mi)</option>
                <option value="nauticalMiles">Nautical Miles (NM)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-blue-600 text-white font-bold">
                  <th className="p-2.5">Distance Unit</th>
                  <th className="p-2.5">Equivalent Converted Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
                <tr><td className="p-2 font-bold font-sans">Meters (m)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultConv.meters}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Kilometers (km)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultConv.kilometers}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Feet (ft)</td><td className="p-2 font-bold">{resultConv.feet}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Inches (in)</td><td className="p-2 font-bold">{resultConv.inches}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Yards (yd)</td><td className="p-2 font-bold">{resultConv.yards}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Miles (mi)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultConv.miles}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Nautical Miles (NM)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultConv.nauticalMiles}</td></tr>
              </tbody>
            </table>
          </div>

          {/* EMBEDDED SAVED CONVERTER CALCULATIONS INSIDE CARD 6 */}
          {savedConvItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Master Distance Conversions ({savedConvItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedConvItems([]);
                    try { localStorage.removeItem("saved_dist_conv"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedConvItems.map((item) => {
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
                            const updated = savedConvItems.filter(i => i.id !== item.id);
                            setSavedConvItems(updated);
                            try { localStorage.setItem("saved_dist_conv", JSON.stringify(updated)); } catch(e){}
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
          )}
        </div>
      </div>
    </div>
  );
}

export default DistanceCalculator;
