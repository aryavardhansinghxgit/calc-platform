"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Zap,
  MapPin,
  Maximize2,
  RotateCcw,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Compass,
  Gauge
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
  HaversineResult,
  SpeedDistanceTimeResult,
  PointToLineResult
} from "@/app/calculators/distance-calculator/distance-logic";

export interface SavedDistanceItem {
  id: string;
  module: "2d" | "3d" | "geo" | "sdt" | "ptline" | "conv";
  title: string;
  inputs: string;
  rawState: Record<string, any>;
  operation: string;
  result: string;
  resultsList: string[];
  stepText?: string;
  timestamp: string;
}

export function DistanceCalculator() {
  // Global precision selector (2, 4, or 6 decimals)
  const [precision, setPrecision] = useState<number>(4);

  // Copy status indicators
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ---------------------------------------------------------------------------
  // CARD 1: 2D Coordinates (String-backed for smooth typing)
  // ---------------------------------------------------------------------------
  const [rawX1, setRawX1] = useState<string>("0");
  const [rawY1, setRawY1] = useState<string>("0");
  const [rawX2, setRawX2] = useState<string>("3");
  const [rawY2, setRawY2] = useState<string>("4");

  const x1 = parseFloat(rawX1) || 0;
  const y1 = parseFloat(rawY1) || 0;
  const x2 = parseFloat(rawX2) || 0;
  const y2 = parseFloat(rawY2) || 0;

  const result2D: TwoDDistanceResult = useMemo(() => {
    return compute2DDistance(x1, y1, x2, y2, precision);
  }, [x1, y1, x2, y2, precision]);

  // ---------------------------------------------------------------------------
  // CARD 2: 3D Coordinates
  // ---------------------------------------------------------------------------
  const [rawX1_3d, setRawX1_3d] = useState<string>("1");
  const [rawY1_3d, setRawY1_3d] = useState<string>("1");
  const [rawZ1_3d, setRawZ1_3d] = useState<string>("1");
  const [rawX2_3d, setRawX2_3d] = useState<string>("4");
  const [rawY2_3d, setRawY2_3d] = useState<string>("5");
  const [rawZ2_3d, setRawZ2_3d] = useState<string>("9");

  const x1_3d = parseFloat(rawX1_3d) || 0;
  const y1_3d = parseFloat(rawY1_3d) || 0;
  const z1_3d = parseFloat(rawZ1_3d) || 0;
  const x2_3d = parseFloat(rawX2_3d) || 0;
  const y2_3d = parseFloat(rawY2_3d) || 0;
  const z2_3d = parseFloat(rawZ2_3d) || 0;

  const result3D: ThreeDDistanceResult = useMemo(() => {
    return compute3DDistance(x1_3d, y1_3d, z1_3d, x2_3d, y2_3d, z2_3d, precision);
  }, [x1_3d, y1_3d, z1_3d, x2_3d, y2_3d, z2_3d, precision]);

  // ---------------------------------------------------------------------------
  // CARD 3: Lat/Long Geodesic Suite
  // ---------------------------------------------------------------------------
  const [rawLat1, setRawLat1] = useState<string>("40.7128"); // NYC
  const [rawLon1, setRawLon1] = useState<string>("-74.0060");
  const [rawLat2, setRawLat2] = useState<string>("51.5074"); // London
  const [rawLon2, setRawLon2] = useState<string>("-0.1278");

  const lat1 = parseFloat(rawLat1) || 0;
  const lon1 = parseFloat(rawLon1) || 0;
  const lat2 = parseFloat(rawLat2) || 0;
  const lon2 = parseFloat(rawLon2) || 0;

  const resultGeo: HaversineResult = useMemo(() => {
    return computeHaversineDistance(lat1, lon1, lat2, lon2, precision);
  }, [lat1, lon1, lat2, lon2, precision]);

  // ---------------------------------------------------------------------------
  // CARD 4: Speed-Distance-Time Kinematics
  // ---------------------------------------------------------------------------
  const [sdtMode, setSdtMode] = useState<"distance" | "speed" | "time">("distance");
  const [rawSdtVal1, setRawSdtVal1] = useState<string>("60"); // mph or miles
  const [rawSdtVal2, setRawSdtVal2] = useState<string>("2.5"); // hrs or mph

  const sdtVal1 = parseFloat(rawSdtVal1) || 0;
  const sdtVal2 = parseFloat(rawSdtVal2) || 0;

  const resultSdt: SpeedDistanceTimeResult = useMemo(() => {
    return computeSpeedDistanceTime(sdtMode, sdtVal1, sdtVal2, precision);
  }, [sdtMode, sdtVal1, sdtVal2, precision]);

  // ---------------------------------------------------------------------------
  // CARD 5: Point-to-Line Orthogonal
  // ---------------------------------------------------------------------------
  const [rawPtX0, setRawPtX0] = useState<string>("2");
  const [rawPtY0, setRawPtY0] = useState<string>("3");
  const [rawLineA, setRawLineA] = useState<string>("3");
  const [rawLineB, setRawLineB] = useState<string>("4");
  const [rawLineC, setRawLineC] = useState<string>("-12");

  const ptX0 = parseFloat(rawPtX0) || 0;
  const ptY0 = parseFloat(rawPtY0) || 0;
  const lineA = parseFloat(rawLineA) || 0;
  const lineB = parseFloat(rawLineB) || 0;
  const lineC = parseFloat(rawLineC) || 0;

  const resultPtLine: PointToLineResult = useMemo(() => {
    return computePointToLineDistance(ptX0, ptY0, lineA, lineB, lineC, precision);
  }, [ptX0, ptY0, lineA, lineB, lineC, precision]);

  // ---------------------------------------------------------------------------
  // CARD 6: Master Unit Converter Matrix
  // ---------------------------------------------------------------------------
  const [rawConvVal, setRawConvVal] = useState<string>("1000");
  const [convUnit, setConvUnit] = useState<"meters" | "kilometers" | "feet" | "inches" | "yards" | "miles" | "nauticalMiles">("meters");

  const convVal = parseFloat(rawConvVal) || 0;

  const resultConv = useMemo(() => {
    let meters = convVal;
    if (convUnit === "kilometers") meters = convVal * 1000.0;
    else if (convUnit === "feet") meters = convVal * 0.3048;
    else if (convUnit === "inches") meters = convVal * 0.0254;
    else if (convUnit === "yards") meters = convVal * 0.9144;
    else if (convUnit === "miles") meters = convVal * 1609.344;
    else if (convUnit === "nauticalMiles") meters = convVal * 1852.0;
    return convertDistanceFromMeters(meters, precision);
  }, [convVal, convUnit, precision]);

  // ---------------------------------------------------------------------------
  // Saved History States & Storage
  // ---------------------------------------------------------------------------
  const [saved2DItems, setSaved2DItems] = useState<SavedDistanceItem[]>([]);
  const [saved3DItems, setSaved3DItems] = useState<SavedDistanceItem[]>([]);
  const [savedGeoItems, setSavedGeoItems] = useState<SavedDistanceItem[]>([]);
  const [savedSdtItems, setSavedSdtItems] = useState<SavedDistanceItem[]>([]);
  const [savedPtLineItems, setSavedPtLineItems] = useState<SavedDistanceItem[]>([]);
  const [savedConvItems, setSavedConvItems] = useState<SavedDistanceItem[]>([]);

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

  // ---------------------------------------------------------------------------
  // Presets Handlers
  // ---------------------------------------------------------------------------
  const handleApplyPreset2D = (preset: "345" | "diagonal" | "neg" | "coincident") => {
    if (preset === "345") { setRawX1("0"); setRawY1("0"); setRawX2("3"); setRawY2("4"); }
    else if (preset === "diagonal") { setRawX1("0"); setRawY1("0"); setRawX2("10"); setRawY2("10"); }
    else if (preset === "neg") { setRawX1("-2"); setRawY1("-3"); setRawX2("4"); setRawY2("5"); }
    else if (preset === "coincident") { setRawX1("5"); setRawY1("5"); setRawX2("5"); setRawY2("5"); }
  };

  const handleApplyPreset3D = (preset: "box" | "standard13" | "neg13") => {
    if (preset === "box") { setRawX1_3d("1"); setRawY1_3d("1"); setRawZ1_3d("1"); setRawX2_3d("4"); setRawY2_3d("5"); setRawZ2_3d("9"); }
    else if (preset === "standard13") { setRawX1_3d("0"); setRawY1_3d("0"); setRawZ1_3d("0"); setRawX2_3d("3"); setRawY2_3d("4"); setRawZ2_3d("12"); }
    else if (preset === "neg13") { setRawX1_3d("-3"); setRawY1_3d("4"); setRawZ1_3d("12"); setRawX2_3d("0"); setRawY2_3d("0"); setRawZ2_3d("0"); }
  };

  const handleApplyPresetGeo = (preset: "nylon" | "toksyd" | "parcai" | "equator") => {
    if (preset === "nylon") { setRawLat1("40.7128"); setRawLon1("-74.006"); setRawLat2("51.5074"); setRawLon2("-0.1278"); }
    else if (preset === "toksyd") { setRawLat1("35.6762"); setRawLon1("139.6503"); setRawLat2("-33.8688"); setRawLon2("151.2093"); }
    else if (preset === "parcai") { setRawLat1("48.8566"); setRawLon1("2.3522"); setRawLat2("30.0444"); setRawLon2("31.2357"); }
    else if (preset === "equator") { setRawLat1("0"); setRawLon1("0"); setRawLat2("0"); setRawLon2("90"); }
  };

  const handleApplyPresetSdt = (preset: "highway" | "marathon" | "flight") => {
    if (preset === "highway") { setSdtMode("distance"); setRawSdtVal1("60"); setRawSdtVal2("2.5"); }
    else if (preset === "marathon") { setSdtMode("time"); setRawSdtVal1("26.2188"); setRawSdtVal2("8.5"); }
    else if (preset === "flight") { setSdtMode("speed"); setRawSdtVal1("3461"); setRawSdtVal2("7"); }
  };

  const handleApplyPresetPtLine = (preset: "gold1" | "gold2" | "online") => {
    if (preset === "gold1") { setRawPtX0("2"); setRawPtY0("3"); setRawLineA("3"); setRawLineB("4"); setRawLineC("-12"); }
    else if (preset === "gold2") { setRawPtX0("4"); setRawPtY0("3"); setRawLineA("3"); setRawLineB("4"); setRawLineC("-12"); }
    else if (preset === "online") { setRawPtX0("0"); setRawPtY0("3"); setRawLineA("3"); setRawLineB("4"); setRawLineC("-12"); }
  };

  // ---------------------------------------------------------------------------
  // Save & Restore Operations
  // ---------------------------------------------------------------------------
  const handleSave2D = () => {
    if (!result2D.isValid) return;
    const inputsStr = `(${rawX1}, ${rawY1}) to (${rawX2}, ${rawY2})`;
    const resList = [
      `Euclidean Distance d = ${result2D.euclidean}`,
      `Manhattan Distance dM = ${result2D.manhattan}`,
      `Chebyshev Distance d∞ = ${result2D.chebyshev}`,
      `Midpoint M = (${result2D.midpoint.x}, ${result2D.midpoint.y})`,
      `Incline Angle θ = ${result2D.angleDeg}°`
    ];
    const newItem: SavedDistanceItem = {
      id: "2d_" + Date.now().toString(),
      module: "2d",
      title: `2D Distance d = ${result2D.euclidean}`,
      inputs: inputsStr,
      rawState: { rawX1, rawY1, rawX2, rawY2 },
      operation: `2D Coordinate Distance`,
      result: resList.join(" | "),
      resultsList: resList,
      stepText: result2D.stepText,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...saved2DItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSaved2DItems(updated);
    try { localStorage.setItem("saved_dist_2d", JSON.stringify(updated)); } catch (e) {}
  };

  const handleRestore2D = (item: SavedDistanceItem) => {
    if (item.rawState) {
      setRawX1(item.rawState.rawX1 ?? "0");
      setRawY1(item.rawState.rawY1 ?? "0");
      setRawX2(item.rawState.rawX2 ?? "3");
      setRawY2(item.rawState.rawY2 ?? "4");
    }
  };

  const handleSave3D = () => {
    if (!result3D.isValid) return;
    const inputsStr = `(${rawX1_3d}, ${rawY1_3d}, ${rawZ1_3d}) to (${rawX2_3d}, ${rawY2_3d}, ${rawZ2_3d})`;
    const resList = [
      `3D Euclidean Distance d = ${result3D.euclidean}`,
      `3D Midpoint M = (${result3D.midpoint.x}, ${result3D.midpoint.y}, ${result3D.midpoint.z})`,
      `Deltas: Δx=${result3D.deltaX}, Δy=${result3D.deltaY}, Δz=${result3D.deltaZ}`
    ];
    const newItem: SavedDistanceItem = {
      id: "3d_" + Date.now().toString(),
      module: "3d",
      title: `3D Distance d = ${result3D.euclidean}`,
      inputs: inputsStr,
      rawState: { rawX1_3d, rawY1_3d, rawZ1_3d, rawX2_3d, rawY2_3d, rawZ2_3d },
      operation: `3D Spatial Distance`,
      result: resList.join(" | "),
      resultsList: resList,
      stepText: result3D.stepText,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...saved3DItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSaved3DItems(updated);
    try { localStorage.setItem("saved_dist_3d", JSON.stringify(updated)); } catch (e) {}
  };

  const handleRestore3D = (item: SavedDistanceItem) => {
    if (item.rawState) {
      setRawX1_3d(item.rawState.rawX1_3d ?? "1");
      setRawY1_3d(item.rawState.rawY1_3d ?? "1");
      setRawZ1_3d(item.rawState.rawZ1_3d ?? "1");
      setRawX2_3d(item.rawState.rawX2_3d ?? "4");
      setRawY2_3d(item.rawState.rawY2_3d ?? "5");
      setRawZ2_3d(item.rawState.rawZ2_3d ?? "9");
    }
  };

  const handleSaveGeo = () => {
    if (!resultGeo.isValid) return;
    const inputsStr = `(${rawLat1}°, ${rawLon1}°) to (${rawLat2}°, ${rawLon2}°)`;
    const resList = [
      `Distance = ${resultGeo.miles} Statute Miles`,
      `Kilometers = ${resultGeo.km} km`,
      `Nautical Miles = ${resultGeo.nauticalMiles} NM`,
      `Bearing = ${resultGeo.initialBearingDeg}° (${resultGeo.compassDirection})`,
      `Geodesic Midpoint = (${resultGeo.midpoint.lat}°, ${resultGeo.midpoint.lon}°)`
    ];
    const newItem: SavedDistanceItem = {
      id: "geo_" + Date.now().toString(),
      module: "geo",
      title: `Earth Distance = ${resultGeo.miles} mi`,
      inputs: inputsStr,
      rawState: { rawLat1, rawLon1, rawLat2, rawLon2 },
      operation: `Haversine Earth Distance`,
      result: resList.join(" | "),
      resultsList: resList,
      stepText: resultGeo.stepText,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedGeoItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedGeoItems(updated);
    try { localStorage.setItem("saved_dist_geo", JSON.stringify(updated)); } catch (e) {}
  };

  const handleRestoreGeo = (item: SavedDistanceItem) => {
    if (item.rawState) {
      setRawLat1(item.rawState.rawLat1 ?? "40.7128");
      setRawLon1(item.rawState.rawLon1 ?? "-74.006");
      setRawLat2(item.rawState.rawLat2 ?? "51.5074");
      setRawLon2(item.rawState.rawLon2 ?? "-0.1278");
    }
  };

  const handleSaveSdt = () => {
    if (!resultSdt.isValid) return;
    const inputsStr = `${sdtMode}: val1=${rawSdtVal1}, val2=${rawSdtVal2}`;
    const resList = [
      `Distance = ${resultSdt.distanceMiles} miles`,
      `Speed = ${resultSdt.speedMph} mph`,
      `Time = ${resultSdt.timeHours} hours`,
      `Pace = ${resultSdt.paceMinPerMile} (${resultSdt.paceMinPerKm})`
    ];
    const newItem: SavedDistanceItem = {
      id: "sdt_" + Date.now().toString(),
      module: "sdt",
      title: `Kinematics (${sdtMode})`,
      inputs: inputsStr,
      rawState: { sdtMode, rawSdtVal1, rawSdtVal2 },
      operation: `Kinematics Suite`,
      result: resList.join(" | "),
      resultsList: resList,
      stepText: resultSdt.stepText,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedSdtItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedSdtItems(updated);
    try { localStorage.setItem("saved_dist_sdt", JSON.stringify(updated)); } catch (e) {}
  };

  const handleRestoreSdt = (item: SavedDistanceItem) => {
    if (item.rawState) {
      setSdtMode(item.rawState.sdtMode ?? "distance");
      setRawSdtVal1(item.rawState.rawSdtVal1 ?? "60");
      setRawSdtVal2(item.rawState.rawSdtVal2 ?? "2.5");
    }
  };

  const handleSavePtLine = () => {
    if (!resultPtLine.isValid) return;
    const inputsStr = `Point (${rawPtX0}, ${rawPtY0}) to ${rawLineA}x + ${rawLineB}y + ${rawLineC} = 0`;
    const resList = [
      `Orthogonal Distance d = ${resultPtLine.distance}`,
      `Projection Foot = (${resultPtLine.projectionPoint.x}, ${resultPtLine.projectionPoint.y})`
    ];
    const newItem: SavedDistanceItem = {
      id: "ptline_" + Date.now().toString(),
      module: "ptline",
      title: `Point-to-Line d = ${resultPtLine.distance}`,
      inputs: inputsStr,
      rawState: { rawPtX0, rawPtY0, rawLineA, rawLineB, rawLineC },
      operation: `Point-to-Line Orthogonal`,
      result: resList.join(" | "),
      resultsList: resList,
      stepText: resultPtLine.stepText,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedPtLineItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedPtLineItems(updated);
    try { localStorage.setItem("saved_dist_ptline", JSON.stringify(updated)); } catch (e) {}
  };

  const handleRestorePtLine = (item: SavedDistanceItem) => {
    if (item.rawState) {
      setRawPtX0(item.rawState.rawPtX0 ?? "2");
      setRawPtY0(item.rawState.rawPtY0 ?? "3");
      setRawLineA(item.rawState.rawLineA ?? "3");
      setRawLineB(item.rawState.rawLineB ?? "4");
      setRawLineC(item.rawState.rawLineC ?? "-12");
    }
  };

  const handleSaveConv = () => {
    const inputsStr = `${rawConvVal} ${convUnit}`;
    const resList = [
      `${resultConv.meters} meters`,
      `${resultConv.kilometers} km`,
      `${resultConv.miles} miles`,
      `${resultConv.nauticalMiles} NM`,
      `${resultConv.feet} feet`
    ];
    const newItem: SavedDistanceItem = {
      id: "conv_" + Date.now().toString(),
      module: "conv",
      title: `Converted ${rawConvVal} ${convUnit}`,
      inputs: inputsStr,
      rawState: { rawConvVal, convUnit },
      operation: `Unit Conversion Matrix`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConvItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedConvItems(updated);
    try { localStorage.setItem("saved_dist_conv", JSON.stringify(updated)); } catch (e) {}
  };

  const handleRestoreConv = (item: SavedDistanceItem) => {
    if (item.rawState) {
      setRawConvVal(item.rawState.rawConvVal ?? "1000");
      setConvUnit(item.rawState.convUnit ?? "meters");
    }
  };

  // ---------------------------------------------------------------------------
  // CSV Export Utility
  // ---------------------------------------------------------------------------
  const exportHistoryToCSV = (items: SavedDistanceItem[], filename: string) => {
    if (items.length === 0) return;
    const escapeCSV = (str: string) => `"${str.replace(/"/g, '""')}"`;
    const headers = ["ID", "Module", "Operation", "Inputs", "Result Summary", "Timestamp"];
    const rows = items.map(i => [
      escapeCSV(i.id),
      escapeCSV(i.module),
      escapeCSV(i.operation),
      escapeCSV(i.inputs),
      escapeCSV(i.result),
      escapeCSV(i.timestamp)
    ]);
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ---------------------------------------------------------------------------
  // DYNAMIC SVG DIAGRAMS
  // ---------------------------------------------------------------------------

  // 1. Dynamic 2D Cartesian SVG
  const render2DSVG = (px1: number, py1: number, px2: number, py2: number) => {
    const width = 280;
    const height = 200;
    const padding = 35;

    const minX = Math.min(px1, px2, 0) - 1.5;
    const maxX = Math.max(px1, px2, 0) + 1.5;
    const minY = Math.min(py1, py2, 0) - 1.5;
    const maxY = Math.max(py1, py2, 0) + 1.5;

    const spanX = Math.max(0.1, maxX - minX);
    const spanY = Math.max(0.1, maxY - minY);

    const scaleX = (x: number) => padding + ((x - minX) / spanX) * (width - 2 * padding);
    const scaleY = (y: number) => height - padding - ((y - minY) / spanY) * (height - 2 * padding);

    const x1Svg = scaleX(px1);
    const y1Svg = scaleY(py1);
    const x2Svg = scaleX(px2);
    const y2Svg = scaleY(py2);
    const originX = scaleX(0);
    const originY = scaleY(0);

    const midX = (x1Svg + x2Svg) / 2;
    const midY = (y1Svg + y2Svg) / 2;

    return (
      <svg
        role="img"
        aria-label="2D Cartesian Coordinate Distance Plane"
        viewBox={`0 0 ${width} ${height}`}
        className="w-64 h-48 max-w-full"
      >
        <title>2D Coordinate Distance Visualization</title>
        <desc>{`Cartesian plane plotting Point 1 at (${px1}, ${py1}) and Point 2 at (${px2}, ${py2}) with Euclidean distance ${result2D.euclidean}`}</desc>
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/50" />

        {/* Origin Axes */}
        <line x1={padding} y1={originY} x2={width - padding} y2={originY} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2,2" />
        <line x1={originX} y1={padding} x2={originX} y2={height - padding} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2,2" />

        {/* Orthogonal Run (Δx) and Rise (Δy) */}
        <line x1={x1Svg} y1={y1Svg} x2={x2Svg} y2={y1Svg} stroke="#2563eb" strokeWidth="2" strokeDasharray="3,3" />
        <line x1={x2Svg} y1={y1Svg} x2={x2Svg} y2={y2Svg} stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />

        {/* Hypotenuse Distance Vector */}
        <line x1={x1Svg} y1={y1Svg} x2={x2Svg} y2={y2Svg} stroke="#16a34a" strokeWidth="2.5" />

        {/* Midpoint Dot */}
        <circle cx={midX} cy={midY} r="3" fill="#9333ea" />

        {/* Endpoints */}
        <circle cx={x1Svg} cy={y1Svg} r="4.5" fill="#2563eb" />
        <circle cx={x2Svg} cy={y2Svg} r="4.5" fill="#16a34a" />

        {/* Text Labels */}
        <text x={x1Svg} y={y1Svg - 8} textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-300">
          P₁({px1}, {py1})
        </text>
        <text x={x2Svg} y={y2Svg - 8} textAnchor="middle" className="text-[10px] font-mono font-bold fill-emerald-700 dark:fill-emerald-300">
          P₂({px2}, {py2})
        </text>
        <text x={midX + 8} y={midY + 4} className="text-[10px] font-mono font-black fill-emerald-600 dark:fill-emerald-400">
          d = {result2D.euclidean}
        </text>
      </svg>
    );
  };

  // 2. Dynamic 3D Spatial Box SVG
  const render3DSVG = () => {
    const width = 280;
    const height = 200;

    // Normalizing deltas for proportional isometric projection
    const dx = x2_3d - x1_3d;
    const dy = y2_3d - y1_3d;
    const dz = z2_3d - z1_3d;

    // Isometric projection basis vectors
    const originX = 70;
    const originY = 140;

    const p1X = originX;
    const p1Y = originY;

    // Constrained projection offsets
    const signX = dx >= 0 ? 1 : -1;
    const signY = dy >= 0 ? 1 : -1;
    const signZ = dz >= 0 ? 1 : -1;

    const spanW = 90 * signX;
    const spanD = 50 * signY;
    const spanH = 70 * signZ;

    const p2X = p1X + spanW + spanD * 0.7;
    const p2Y = p1Y - spanH - spanD * 0.4;

    return (
      <svg
        role="img"
        aria-label="3D Spatial Coordinate Distance Box"
        viewBox={`0 0 ${width} ${height}`}
        className="w-64 h-48 max-w-full"
      >
        <title>3D Spatial Distance Visualization</title>
        <desc>{`3D space diagonal from (${x1_3d}, ${y1_3d}, ${z1_3d}) to (${x2_3d}, ${y2_3d}, ${z2_3d}) with length ${result3D.euclidean}`}</desc>
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/50" />

        {/* Bounding Box Outline */}
        <polygon
          points={`${p1X},${p1Y} ${p1X + spanW},${p1Y} ${p1X + spanW + spanD * 0.7},${p1Y - spanD * 0.4} ${p1X + spanD * 0.7},${p1Y - spanD * 0.4}`}
          fill="#3b82f6"
          fillOpacity="0.08"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />
        <polygon
          points={`${p1X},${p1Y - spanH} ${p1X + spanW},${p1Y - spanH} ${p2X},${p2Y} ${p1X + spanD * 0.7},${p1Y - spanH - spanD * 0.4}`}
          fill="#3b82f6"
          fillOpacity="0.12"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />
        <line x1={p1X} y1={p1Y} x2={p1X} y2={p1Y - spanH} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
        <line x1={p1X + spanW} y1={p1Y} x2={p1X + spanW} y2={p1Y - spanH} stroke="#94a3b8" strokeWidth="1.5" />
        <line x1={p2X} y1={p2Y + spanH} x2={p2X} y2={p2Y} stroke="#94a3b8" strokeWidth="1.5" />

        {/* 3D Space Diagonal */}
        <line x1={p1X} y1={p1Y} x2={p2X} y2={p2Y} stroke="#16a34a" strokeWidth="2.5" />

        {/* Points */}
        <circle cx={p1X} cy={p1Y} r="4" fill="#2563eb" />
        <circle cx={p2X} cy={p2Y} r="4" fill="#16a34a" />

        {/* Labels */}
        <text x={p1X - 10} y={p1Y + 16} className="text-[9px] font-mono font-bold fill-blue-700 dark:fill-blue-300">
          P₁({x1_3d}, {y1_3d}, {z1_3d})
        </text>
        <text x={p2X - 20} y={p2Y - 8} className="text-[9px] font-mono font-bold fill-emerald-700 dark:fill-emerald-300">
          P₂({x2_3d}, {y2_3d}, {z2_3d})
        </text>
        <text x={(p1X + p2X) / 2 + 6} y={(p1Y + p2Y) / 2} className="text-[10px] font-mono font-black fill-emerald-600 dark:fill-emerald-400">
          d = {result3D.euclidean}
        </text>
      </svg>
    );
  };

  // 3. Dynamic Great-Circle Earth Globe SVG
  const renderGeoSVG = () => {
    const width = 280;
    const height = 200;
    const cx = 140;
    const cy = 100;
    const r = 68;

    // Projected normalized 2D points on orthographic disk
    const toRad = (d: number) => (d * Math.PI) / 180;
    const xP1 = cx + r * Math.cos(toRad(lat1)) * Math.sin(toRad(lon1));
    const yP1 = cy - r * Math.sin(toRad(lat1));

    const xP2 = cx + r * Math.cos(toRad(lat2)) * Math.sin(toRad(lon2));
    const yP2 = cy - r * Math.sin(toRad(lat2));

    // Midpoint control for curved arc
    const midX = (xP1 + xP2) / 2;
    const midY = Math.min(yP1, yP2) - 18;

    return (
      <svg
        role="img"
        aria-label="Great-Circle Spherical Earth Arc"
        viewBox={`0 0 ${width} ${height}`}
        className="w-64 h-48 max-w-full"
      >
        <title>Great-Circle Geodesic Earth Arc</title>
        <desc>{`Earth globe displaying flight route between (${lat1}°, ${lon1}°) and (${lat2}°, ${lon2}°) with distance ${resultGeo.miles} miles`}</desc>
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/50" />

        {/* Globe Base */}
        <circle cx={cx} cy={cy} r={r} fill="#3b82f6" fillOpacity="0.12" stroke="#1d4ed8" strokeWidth="1.8" />
        <ellipse cx={cx} cy={cy} rx={r} ry={22} fill="none" stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="3,3" />
        <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="3,3" />

        {/* Great-Circle Flight Path Arc */}
        <path d={`M ${xP1} ${yP1} Q ${midX} ${midY} ${xP2} ${yP2}`} fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4,3" />

        {/* Waypoints */}
        <circle cx={xP1} cy={yP1} r="4" fill="#2563eb" />
        <circle cx={xP2} cy={yP2} r="4" fill="#16a34a" />

        {/* Flight labels */}
        <text x={xP1} y={yP1 + 14} textAnchor="middle" className="text-[9px] font-mono font-bold fill-blue-700 dark:fill-blue-300">
          Pt 1 ({lat1}°, {lon1}°)
        </text>
        <text x={xP2} y={yP2 + 14} textAnchor="middle" className="text-[9px] font-mono font-bold fill-emerald-700 dark:fill-emerald-300">
          Pt 2 ({lat2}°, {lon2}°)
        </text>
        <text x={midX} y={midY - 4} textAnchor="middle" className="text-[10px] font-mono font-extrabold fill-red-600 dark:fill-red-400">
          {resultGeo.miles} mi ({resultGeo.km} km)
        </text>
      </svg>
    );
  };

  // 4. Dynamic Kinematics Triangle SVG
  const renderKinematicsSVG = () => {
    const width = 280;
    const height = 190;
    return (
      <svg
        role="img"
        aria-label="Kinematics Speed Distance Time Triangle"
        viewBox={`0 0 ${width} ${height}`}
        className="w-64 h-44 max-w-full"
      >
        <title>Kinematics Speed-Distance-Time Triangle</title>
        <desc>{`Formula triangle: distance = speed × time. Currently solving for ${sdtMode}`}</desc>
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/50" />

        {/* Triangle Outer */}
        <polygon points="140,25 220,155 60,155" fill="#3b82f6" fillOpacity="0.15" stroke="#1d4ed8" strokeWidth="2.5" />
        {/* Horizontal dividing bar */}
        <line x1="88" y1="105" x2="192" y2="105" stroke="#1d4ed8" strokeWidth="2.5" />
        {/* Vertical dividing line */}
        <line x1="140" y1="105" x2="140" y2="155" stroke="#1d4ed8" strokeWidth="2.5" />

        {/* Variables with Dynamic Highlighting */}
        <text
          x="140"
          y="80"
          textAnchor="middle"
          className={`text-[20px] font-mono font-black ${sdtMode === "distance" ? "fill-blue-700 dark:fill-blue-300 font-extrabold underline" : "fill-slate-700 dark:fill-slate-300"}`}
        >
          d
        </text>
        <text
          x="105"
          y="138"
          textAnchor="middle"
          className={`text-[20px] font-mono font-black ${sdtMode === "speed" ? "fill-emerald-700 dark:fill-emerald-300 font-extrabold underline" : "fill-slate-700 dark:fill-slate-300"}`}
        >
          s
        </text>
        <text
          x="175"
          y="138"
          textAnchor="middle"
          className={`text-[20px] font-mono font-black ${sdtMode === "time" ? "fill-purple-700 dark:fill-purple-300 font-extrabold underline" : "fill-slate-700 dark:fill-slate-300"}`}
        >
          t
        </text>

        <text x="140" y="178" textAnchor="middle" className="text-[10px] font-bold fill-slate-500">
          {sdtMode === "distance" ? "d = speed × time" : sdtMode === "speed" ? "speed = distance / time" : "time = distance / speed"}
        </text>
      </svg>
    );
  };

  // 5. Dynamic Point-to-Line SVG
  const renderPtLineSVG = () => {
    const width = 280;
    const height = 200;
    const padding = 35;

    // Normalizing projection point & target point in coordinate window
    const xp = resultPtLine.projectionPoint.x;
    const yp = resultPtLine.projectionPoint.y;

    const minX = Math.min(ptX0, xp, 0) - 2;
    const maxX = Math.max(ptX0, xp, 0) + 2;
    const minY = Math.min(ptY0, yp, 0) - 2;
    const maxY = Math.max(ptY0, yp, 0) + 2;

    const spanX = Math.max(0.1, maxX - minX);
    const spanY = Math.max(0.1, maxY - minY);

    const scaleX = (x: number) => padding + ((x - minX) / spanX) * (width - 2 * padding);
    const scaleY = (y: number) => height - padding - ((y - minY) / spanY) * (height - 2 * padding);

    const targetX = scaleX(ptX0);
    const targetY = scaleY(ptY0);
    const footX = scaleX(xp);
    const footY = scaleY(yp);

    // Line extension points through foot
    const dxFoot = footX - targetX;
    const dyFoot = footY - targetY;
    // Orthogonal vector along the line
    const dirX = -dyFoot;
    const dirY = dxFoot;
    const len = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
    const normX = (dirX / len) * 75;
    const normY = (dirY / len) * 75;

    return (
      <svg
        role="img"
        aria-label="Point to Line Orthogonal Distance Projection"
        viewBox={`0 0 ${width} ${height}`}
        className="w-64 h-48 max-w-full"
      >
        <title>Point-to-Line Perpendicular Distance</title>
        <desc>{`Target point P0(${ptX0}, ${ptY0}) to line ${lineA}x + ${lineB}y + ${lineC} = 0 with shortest distance ${resultPtLine.distance}`}</desc>
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/50" />

        {/* Infinite line projection segment */}
        <line x1={footX - normX} y1={footY - normY} x2={footX + normX} y2={footY + normY} stroke="#1d4ed8" strokeWidth="2.5" />

        {/* Orthogonal projection drop */}
        <line x1={targetX} y1={targetY} x2={footX} y2={footY} stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />

        {/* Points */}
        <circle cx={targetX} cy={targetY} r="4.5" fill="#dc2626" />
        <circle cx={footX} cy={footY} r="4" fill="#1d4ed8" />

        {/* Labels */}
        <text x={targetX} y={targetY - 8} textAnchor="middle" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">
          P₀({ptX0}, {ptY0})
        </text>
        <text x={footX} y={footY + 14} textAnchor="middle" className="text-[9px] font-mono font-bold fill-blue-700 dark:fill-blue-300">
          Foot({resultPtLine.projectionPoint.x}, {resultPtLine.projectionPoint.y})
        </text>
        <text x={(targetX + footX) / 2 + 10} y={(targetY + footY) / 2} className="text-[10px] font-mono font-black fill-emerald-600 dark:fill-emerald-400">
          d = {resultPtLine.distance}
        </text>
      </svg>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* GLOBAL MASTER TOOLBAR: PRECISION SELECTOR */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-blue-600" />
          <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
            Distance &amp; Geodesic Suite Precision:
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setPrecision(2)}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${precision === 2 ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-300 hover:text-blue-600"}`}
          >
            2 Decimals
          </button>
          <button
            type="button"
            onClick={() => setPrecision(4)}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${precision === 4 ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-300 hover:text-blue-600"}`}
          >
            4 Decimals
          </button>
          <button
            type="button"
            onClick={() => setPrecision(6)}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${precision === 6 ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-300 hover:text-blue-600"}`}
          >
            6 Decimals
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: 2D COORDINATE DISTANCE ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> 2D Coordinate Distance Engine
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleCopyText(result2D.stepText, "copy_2d")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy 2D Calculation Report"
            >
              {copiedId === "copy_2d" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "copy_2d" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleSave2D}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>Save</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* QUICK PRESETS */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className="text-slate-500 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" /> Presets:
            </span>
            <button
              type="button"
              onClick={() => handleApplyPreset2D("345")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (0, 0) to (3, 4) [3-4-5]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset2D("diagonal")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (0, 0) to (10, 10) [Diagonal]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset2D("neg")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (-2, -3) to (4, 5) [Negative Quadrant]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset2D("coincident")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (5, 5) to (5, 5) [Zero Distance]
            </button>
          </div>

          {!result2D.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>{result2D.errorMessage}</span>
            </div>
          )}

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
                      <label htmlFor="p1_x1" className="block text-slate-500 font-bold mb-1">X₁:</label>
                      <input
                        id="p1_x1"
                        type="text"
                        value={rawX1}
                        onChange={(e) => setRawX1(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label htmlFor="p1_y1" className="block text-slate-500 font-bold mb-1">Y₁:</label>
                      <input
                        id="p1_y1"
                        type="text"
                        value={rawY1}
                        onChange={(e) => setRawY1(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block">Point 2 Coordinates (X₂, Y₂)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="p2_x2" className="block text-slate-500 font-bold mb-1">X₂:</label>
                      <input
                        id="p2_x2"
                        type="text"
                        value={rawX2}
                        onChange={(e) => setRawX2(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label htmlFor="p2_y2" className="block text-slate-500 font-bold mb-1">Y₂:</label>
                      <input
                        id="p2_y2"
                        type="text"
                        value={rawY2}
                        onChange={(e) => setRawY2(e.target.value)}
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

          {/* EMBEDDED SAVED 2D CALCULATIONS */}
          {saved2DItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved 2D Distance Calculations ({saved2DItems.length})</span>
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => exportHistoryToCSV(saved2DItems, "2d_distance_history")}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer flex items-center gap-1"
                    title="Export 2D history to CSV"
                  >
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </button>
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {saved2DItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleRestore2D(item)}
                            className="text-slate-500 hover:text-blue-600 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            title="Restore calculation inputs"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopyText(item.stepText || item.result, item.id)}
                            className="text-slate-500 hover:text-emerald-600 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            title="Copy calculation"
                          >
                            {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = saved2DItems.filter(i => i.id !== item.id);
                              setSaved2DItems(updated);
                              try { localStorage.setItem("saved_dist_2d", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            title="Delete entry"
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
                              {item.resultsList.map((resLine, idx) => (
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
          <span className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5" /> 3D Spatial Coordinate Distance Solver
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleCopyText(result3D.stepText, "copy_3d")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "copy_3d" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "copy_3d" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleSave3D}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>Save</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className="text-slate-500 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" /> Presets:
            </span>
            <button
              type="button"
              onClick={() => handleApplyPreset3D("box")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (1, 1, 1) to (4, 5, 9) [√89]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset3D("standard13")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (0, 0, 0) to (3, 4, 12) [Distance 13]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset3D("neg13")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (-3, 4, 12) to (0, 0, 0) [Negative 3D]
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <Maximize2 className="h-4 w-4 text-blue-600" />
                <span>3D Spatial Coordinates (X, Y, Z)</span>
              </h2>

              <div className="space-y-3">
                <span className="font-bold text-blue-600 dark:text-blue-400 block">Point 1 (X₁, Y₁, Z₁)</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <div>
                    <label htmlFor="p1_3d_x" className="font-bold block mb-1">X₁:</label>
                    <input id="p1_3d_x" type="text" value={rawX1_3d} onChange={(e)=>setRawX1_3d(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/>
                  </div>
                  <div>
                    <label htmlFor="p1_3d_y" className="font-bold block mb-1">Y₁:</label>
                    <input id="p1_3d_y" type="text" value={rawY1_3d} onChange={(e)=>setRawY1_3d(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/>
                  </div>
                  <div>
                    <label htmlFor="p1_3d_z" className="font-bold block mb-1">Z₁:</label>
                    <input id="p1_3d_z" type="text" value={rawZ1_3d} onChange={(e)=>setRawZ1_3d(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/>
                  </div>
                </div>

                <span className="font-bold text-emerald-600 dark:text-emerald-400 block pt-2">Point 2 (X₂, Y₂, Z₂)</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <div>
                    <label htmlFor="p2_3d_x" className="font-bold block mb-1">X₂:</label>
                    <input id="p2_3d_x" type="text" value={rawX2_3d} onChange={(e)=>setRawX2_3d(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/>
                  </div>
                  <div>
                    <label htmlFor="p2_3d_y" className="font-bold block mb-1">Y₂:</label>
                    <input id="p2_3d_y" type="text" value={rawY2_3d} onChange={(e)=>setRawY2_3d(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/>
                  </div>
                  <div>
                    <label htmlFor="p2_3d_z" className="font-bold block mb-1">Z₂:</label>
                    <input id="p2_3d_z" type="text" value={rawZ2_3d} onChange={(e)=>setRawZ2_3d(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/>
                  </div>
                </div>
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

          {/* EMBEDDED SAVED 3D CALCULATIONS */}
          {saved3DItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved 3D Distance Calculations ({saved3DItems.length})</span>
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => exportHistoryToCSV(saved3DItems, "3d_distance_history")}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </button>
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {saved3DItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => handleRestore3D(item)} className="text-slate-500 hover:text-blue-600 p-1 rounded" title="Restore"><RotateCcw className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={() => handleCopyText(item.stepText || item.result, item.id)} className="text-slate-500 hover:text-emerald-600 p-1 rounded" title="Copy">{copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}</button>
                        <button type="button" onClick={() => { const up = saved3DItems.filter(i=>i.id !== item.id); setSaved3DItems(up); try { localStorage.setItem("saved_dist_3d", JSON.stringify(up)); } catch(e){} }} className="text-slate-400 hover:text-red-600 p-1 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 text-[11px] font-mono">
                      {item.inputs}
                    </div>
                  </div>
                ))}
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
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Latitude &amp; Longitude Earth Distance Suite
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleCopyText(resultGeo.stepText, "copy_geo")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "copy_geo" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "copy_geo" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleSaveGeo}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>Save</span>
            </button>
          </div>
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
            <button
              type="button"
              onClick={() => handleApplyPresetGeo("equator")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Equatorial 90° Span
            </button>
          </div>

          {!resultGeo.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>{resultGeo.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="geo_lat1" className="font-bold block mb-1">Lat 1 (°):</label>
                  <input id="geo_lat1" type="text" value={rawLat1} onChange={(e)=>setRawLat1(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/>
                </div>
                <div>
                  <label htmlFor="geo_lon1" className="font-bold block mb-1">Lon 1 (°):</label>
                  <input id="geo_lon1" type="text" value={rawLon1} onChange={(e)=>setRawLon1(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="geo_lat2" className="font-bold block mb-1">Lat 2 (°):</label>
                  <input id="geo_lat2" type="text" value={rawLat2} onChange={(e)=>setRawLat2(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/>
                </div>
                <div>
                  <label htmlFor="geo_lon2" className="font-bold block mb-1">Lon 2 (°):</label>
                  <input id="geo_lon2" type="text" value={rawLon2} onChange={(e)=>setRawLon2(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/>
                </div>
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
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold flex items-center justify-between">
                <span>Initial Bearing = {resultGeo.initialBearingDeg}° ({resultGeo.compassDirection})</span>
                <span className="text-slate-500 font-sans">Midpoint: ({resultGeo.midpoint.lat}°, {resultGeo.midpoint.lon}°)</span>
              </div>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderGeoSVG()}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED GEO CALCULATIONS */}
          {savedGeoItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Earth Distance Calculations ({savedGeoItems.length})</span>
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => exportHistoryToCSV(savedGeoItems, "great_circle_history")}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSavedGeoItems([]); try { localStorage.removeItem("saved_dist_geo"); } catch(e){} }}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedGeoItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => handleRestoreGeo(item)} className="text-slate-500 hover:text-blue-600 p-1 rounded" title="Restore"><RotateCcw className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={() => handleCopyText(item.stepText || item.result, item.id)} className="text-slate-500 hover:text-emerald-600 p-1 rounded" title="Copy">{copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}</button>
                        <button type="button" onClick={() => { const up = savedGeoItems.filter(i=>i.id !== item.id); setSavedGeoItems(up); try { localStorage.setItem("saved_dist_geo", JSON.stringify(up)); } catch(e){} }} className="text-slate-400 hover:text-red-600 p-1 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 text-[11px] font-mono">
                      {item.inputs}
                    </div>
                  </div>
                ))}
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
          <span className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5" /> Speed, Distance &amp; Time Kinematics
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleCopyText(resultSdt.stepText, "copy_sdt")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "copy_sdt" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "copy_sdt" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleSaveSdt}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>Save</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold w-fit">
              <button type="button" onClick={()=>setSdtMode("distance")} className={`px-3 py-1 rounded-lg cursor-pointer ${sdtMode==="distance"?"bg-blue-600 text-white shadow-xs":"text-slate-600 dark:text-slate-300"}`}>Distance (d = s × t)</button>
              <button type="button" onClick={()=>setSdtMode("speed")} className={`px-3 py-1 rounded-lg cursor-pointer ${sdtMode==="speed"?"bg-blue-600 text-white shadow-xs":"text-slate-600 dark:text-slate-300"}`}>Speed (s = d / t)</button>
              <button type="button" onClick={()=>setSdtMode("time")} className={`px-3 py-1 rounded-lg cursor-pointer ${sdtMode==="time"?"bg-blue-600 text-white shadow-xs":"text-slate-600 dark:text-slate-300"}`}>Time (t = d / s)</button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
              <span className="text-slate-500">Presets:</span>
              <button type="button" onClick={()=>handleApplyPresetSdt("highway")} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:border-blue-500 border border-slate-200 dark:border-slate-700 cursor-pointer">Highway 60mph</button>
              <button type="button" onClick={()=>handleApplyPresetSdt("marathon")} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:border-blue-500 border border-slate-200 dark:border-slate-700 cursor-pointer">Marathon Run</button>
            </div>
          </div>

          {!resultSdt.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>{resultSdt.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <label htmlFor="sdt_in1" className="block font-bold mb-1">{sdtMode === "distance" ? "Speed (mph):" : "Distance (miles):"}</label>
                <input id="sdt_in1" type="text" value={rawSdtVal1} onChange={(e)=>setRawSdtVal1(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/>
              </div>
              <div>
                <label htmlFor="sdt_in2" className="block font-bold mb-1">{sdtMode === "time" ? "Speed (mph):" : "Time (hours):"}</label>
                <input id="sdt_in2" type="text" value={rawSdtVal2} onChange={(e)=>setRawSdtVal2(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Solved {sdtMode.toUpperCase()}</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {sdtMode === "distance" ? `${resultSdt.distanceMiles} miles` : sdtMode === "speed" ? `${resultSdt.speedMph} mph` : `${resultSdt.timeHours} hours`}
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Pace = {resultSdt.paceMinPerMile} ({resultSdt.paceMinPerKm})
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderKinematicsSVG()}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED KINEMATICS */}
          {savedSdtItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Kinematics Calculations ({savedSdtItems.length})</span>
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => exportHistoryToCSV(savedSdtItems, "kinematics_history")}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSavedSdtItems([]); try { localStorage.removeItem("saved_dist_sdt"); } catch(e){} }}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedSdtItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => handleRestoreSdt(item)} className="text-slate-500 hover:text-blue-600 p-1 rounded" title="Restore"><RotateCcw className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={() => handleCopyText(item.stepText || item.result, item.id)} className="text-slate-500 hover:text-emerald-600 p-1 rounded" title="Copy">{copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}</button>
                        <button type="button" onClick={() => { const up = savedSdtItems.filter(i=>i.id !== item.id); setSavedSdtItems(up); try { localStorage.setItem("saved_dist_sdt", JSON.stringify(up)); } catch(e){} }} className="text-slate-400 hover:text-red-600 p-1 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 text-[11px] font-mono">{item.inputs}</div>
                  </div>
                ))}
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
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Point-to-Line Orthogonal Distance Solver
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleCopyText(resultPtLine.stepText, "copy_ptline")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "copy_ptline" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "copy_ptline" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleSavePtLine}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>Save</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className="text-slate-500 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" /> Presets:
            </span>
            <button
              type="button"
              onClick={() => handleApplyPresetPtLine("gold1")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              P(2, 3) to 3x+4y-12=0 [d=1.2]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPresetPtLine("gold2")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              P(4, 3) to 3x+4y-12=0 [d=2.4]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPresetPtLine("online")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              P(0, 3) on Line [d=0]
            </button>
          </div>

          {!resultPtLine.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>{resultPtLine.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="pt_x0" className="font-bold block mb-1">Target X₀:</label>
                  <input id="pt_x0" type="text" value={rawPtX0} onChange={(e)=>setRawPtX0(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/>
                </div>
                <div>
                  <label htmlFor="pt_y0" className="font-bold block mb-1">Target Y₀:</label>
                  <input id="pt_y0" type="text" value={rawPtY0} onChange={(e)=>setRawPtY0(e.target.value)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <div>
                  <label htmlFor="line_a" className="font-bold block mb-1">Line A:</label>
                  <input id="line_a" type="text" value={rawLineA} onChange={(e)=>setRawLineA(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/>
                </div>
                <div>
                  <label htmlFor="line_b" className="font-bold block mb-1">Line B:</label>
                  <input id="line_b" type="text" value={rawLineB} onChange={(e)=>setRawLineB(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/>
                </div>
                <div>
                  <label htmlFor="line_c" className="font-bold block mb-1">Line C:</label>
                  <input id="line_c" type="text" value={rawLineC} onChange={(e)=>setRawLineC(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Shortest Perpendicular Distance</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {resultPtLine.distance}
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Formula: d = |Ax₀ + By₀ + C| / √(A² + B²)
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderPtLineSVG()}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED POINT-TO-LINE */}
          {savedPtLineItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Point-to-Line Calculations ({savedPtLineItems.length})</span>
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => exportHistoryToCSV(savedPtLineItems, "point_to_line_history")}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSavedPtLineItems([]); try { localStorage.removeItem("saved_dist_ptline"); } catch(e){} }}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedPtLineItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => handleRestorePtLine(item)} className="text-slate-500 hover:text-blue-600 p-1 rounded" title="Restore"><RotateCcw className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={() => handleCopyText(item.stepText || item.result, item.id)} className="text-slate-500 hover:text-emerald-600 p-1 rounded" title="Copy">{copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}</button>
                        <button type="button" onClick={() => { const up = savedPtLineItems.filter(i=>i.id !== item.id); setSavedPtLineItems(up); try { localStorage.setItem("saved_dist_ptline", JSON.stringify(up)); } catch(e){} }} className="text-slate-400 hover:text-red-600 p-1 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 text-[11px] font-mono">{item.inputs}</div>
                  </div>
                ))}
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
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Master Distance Unit Converter Matrix
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleSaveConv}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>Save</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label htmlFor="conv_val" className="block text-xs font-bold mb-1">Distance Value:</label>
              <input
                id="conv_val"
                type="text"
                value={rawConvVal}
                onChange={(e) => setRawConvVal(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
              />
            </div>

            <div>
              <label htmlFor="conv_unit" className="block text-xs font-bold mb-1">Base Distance Unit:</label>
              <select
                id="conv_unit"
                value={convUnit}
                onChange={(e) => setConvUnit(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm"
              >
                <option value="meters">Meters (m)</option>
                <option value="kilometers">Kilometers (km)</option>
                <option value="feet">Feet (ft)</option>
                <option value="inches">Inches (in)</option>
                <option value="yards">Yards (yd)</option>
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
                <tr><td className="p-2 font-bold font-sans">Centimeters (cm)</td><td className="p-2 font-bold">{resultConv.centimeters}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Millimeters (mm)</td><td className="p-2 font-bold">{resultConv.millimeters}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Feet (ft)</td><td className="p-2 font-bold">{resultConv.feet}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Inches (in)</td><td className="p-2 font-bold">{resultConv.inches}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Yards (yd)</td><td className="p-2 font-bold">{resultConv.yards}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Miles (mi)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultConv.miles}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Nautical Miles (NM)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultConv.nauticalMiles}</td></tr>
              </tbody>
            </table>
          </div>

          {/* EMBEDDED SAVED CONVERSIONS */}
          {savedConvItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Master Distance Conversions ({savedConvItems.length})</span>
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => exportHistoryToCSV(savedConvItems, "converter_history")}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSavedConvItems([]); try { localStorage.removeItem("saved_dist_conv"); } catch(e){} }}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedConvItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => handleRestoreConv(item)} className="text-slate-500 hover:text-blue-600 p-1 rounded" title="Restore"><RotateCcw className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={() => { const up = savedConvItems.filter(i=>i.id !== item.id); setSavedConvItems(up); try { localStorage.setItem("saved_dist_conv", JSON.stringify(up)); } catch(e){} }} className="text-slate-400 hover:text-red-600 p-1 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 text-[11px] font-mono">{item.inputs}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DistanceCalculator;
