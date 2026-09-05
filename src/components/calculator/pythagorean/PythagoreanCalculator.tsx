"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Printer,
  RotateCcw,
  AlertCircle
} from "lucide-react";
import {
  computePythagoreanCore,
  computeSideAngle,
  compute3DPythagorean,
  computeEuclidTriple,
  convertPythagoreanUnits,
  PythagoreanCoreResult,
  SideAngleResult,
  Pythagorean3DResult,
  EuclidTripleResult,
  ConvertedUnitsResult,
  PythagoreanLengthUnit
} from "@/app/calculators/pythagorean-theorem-calculator/pythagorean-logic";

export interface SavedPythagoreanItem {
  id: string;
  module: "core" | "sa" | "3d" | "gen" | "conv";
  title: string;
  inputs: string;
  inputPayload: Record<string, any>;
  operation: string;
  result: string;
  resultsList?: string[];
  timestamp: string;
}

export function PythagoreanCalculator() {
  // Precision state
  const [precision, setPrecision] = useState<number>(4);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Card 1: Core Inputs (Enter any 2 of a, b, c or verify all 3)
  const [coreA, setCoreA] = useState<string>("3");
  const [coreB, setCoreB] = useState<string>("4");
  const [coreC, setCoreC] = useState<string>("");
  const [showSquares, setShowSquares] = useState<boolean>(true);

  // Card 2: Side + Angle Inputs
  const [saSideType, setSaSideType] = useState<"a" | "b" | "c">("a");
  const [saSideVal, setSaSideVal] = useState<string>("5");
  const [saAngleDeg, setSaAngleDeg] = useState<string>("30");

  // Card 3: 3D Distance Inputs (supports negative coordinate offsets)
  const [distX, setDistX] = useState<string>("3");
  const [distY, setDistY] = useState<string>("4");
  const [distZ, setDistZ] = useState<string>("12");

  // Card 4: Euclid Generator Inputs
  const [euclidM, setEuclidM] = useState<string>("2");
  const [euclidN, setEuclidN] = useState<string>("1");

  // Card 5: Converter Inputs
  const [convVal, setConvVal] = useState<string>("5");
  const [convUnit, setConvUnit] = useState<PythagoreanLengthUnit>("meters");

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

  const handleCopyText = (text: string, key: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {
      console.error("Clipboard copy failed", e);
    }
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
    const numA = coreA.trim() === "" ? undefined : parseFloat(coreA);
    const numB = coreB.trim() === "" ? undefined : parseFloat(coreB);
    const numC = coreC.trim() === "" ? undefined : parseFloat(coreC);

    return computePythagoreanCore(numA, numB, numC, precision);
  }, [coreA, coreB, coreC, precision]);

  // Card 2 Calculations (Side + Angle)
  const resultSA: SideAngleResult = useMemo(() => {
    const sideNum = parseFloat(saSideVal);
    const angleNum = parseFloat(saAngleDeg);
    return computeSideAngle(saSideType, sideNum, angleNum, precision);
  }, [saSideType, saSideVal, saAngleDeg, precision]);

  // Card 3 Calculations
  const result3D: Pythagorean3DResult = useMemo(() => {
    const x = parseFloat(distX) || 0;
    const y = parseFloat(distY) || 0;
    const z = parseFloat(distZ) || 0;
    return compute3DPythagorean(x, y, z, precision);
  }, [distX, distY, distZ, precision]);

  // Card 4 Euclid Triple Calculations
  const resultEuclid: EuclidTripleResult = useMemo(() => {
    const m = parseFloat(euclidM);
    const n = parseFloat(euclidN);
    return computeEuclidTriple(m, n);
  }, [euclidM, euclidN]);

  // Card 5 Converter Calculations
  const resultConv: ConvertedUnitsResult = useMemo(() => {
    const val = parseFloat(convVal) || 0;
    return convertPythagoreanUnits(val, convUnit, precision);
  }, [convVal, convUnit, precision]);

  // Presets Handlers
  const handleApplyPreset = (aStr: string, bStr: string, cStr: string) => {
    setCoreA(aStr); setCoreB(bStr); setCoreC(cStr);
  };

  // Restore Handlers for Saved History
  const handleRestoreCore = (item: SavedPythagoreanItem) => {
    if (item.inputPayload) {
      setCoreA(item.inputPayload.coreA ?? "");
      setCoreB(item.inputPayload.coreB ?? "");
      setCoreC(item.inputPayload.coreC ?? "");
    }
  };

  const handleRestoreSA = (item: SavedPythagoreanItem) => {
    if (item.inputPayload) {
      setSaSideType(item.inputPayload.saSideType ?? "a");
      setSaSideVal(item.inputPayload.saSideVal ?? "5");
      setSaAngleDeg(item.inputPayload.saAngleDeg ?? "30");
    }
  };

  const handleRestore3D = (item: SavedPythagoreanItem) => {
    if (item.inputPayload) {
      setDistX(item.inputPayload.distX ?? "3");
      setDistY(item.inputPayload.distY ?? "4");
      setDistZ(item.inputPayload.distZ ?? "12");
    }
  };

  const handleRestoreGen = (item: SavedPythagoreanItem) => {
    if (item.inputPayload) {
      setEuclidM(item.inputPayload.euclidM ?? "2");
      setEuclidN(item.inputPayload.euclidN ?? "1");
    }
  };

  const handleRestoreConv = (item: SavedPythagoreanItem) => {
    if (item.inputPayload) {
      setConvVal(item.inputPayload.convVal ?? "5");
      setConvUnit(item.inputPayload.convUnit ?? "meters");
    }
  };

  // Save Handlers
  const handleSaveCore = () => {
    if (!resultCore.isValid) return;
    const inputsStr = `a = ${resultCore.a}, b = ${resultCore.b}, c = ${resultCore.c}`;
    const resList = [
      `Hypotenuse c = ${resultCore.c} (${resultCore.exactRadicalC || resultCore.c})`,
      `Area A = ${resultCore.area}`,
      `Perimeter P = ${resultCore.perimeter}`,
      `Altitude h_c = ${resultCore.altitudeHc}`,
      `Angle α (top) = ${resultCore.alphaDeg}°, Angle β (base) = ${resultCore.betaDeg}°`,
      `Inradius r = ${resultCore.inradius}, Circumradius R = ${resultCore.circumradius}`
    ];
    const newItem: SavedPythagoreanItem = {
      id: Date.now().toString(),
      module: "core",
      title: `Right Triangle (${resultCore.a}, ${resultCore.b}, ${resultCore.c})`,
      inputs: inputsStr,
      inputPayload: { coreA, coreB, coreC },
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
    if (!resultSA.isValid) return;
    const label = saSideType === "a" ? "Opposite Leg a" : saSideType === "b" ? "Adjacent Leg b" : "Hypotenuse c";
    const inputsStr = `${label} = ${resultSA.knownVal}, Angle θ = ${resultSA.angleDeg}°`;
    const resList = [
      `Leg a (Opposite) = ${resultSA.a}`,
      `Leg b (Adjacent) = ${resultSA.b}`,
      `Hypotenuse c = ${resultSA.c}`,
      `Area = ${resultSA.area}`,
      `Perimeter = ${resultSA.perimeter}`,
      `Altitude h_c = ${resultSA.altitudeHc}`,
      `sin(θ) = ${resultSA.sinVal}, cos(θ) = ${resultSA.cosVal}, tan(θ) = ${resultSA.tanVal}`
    ];
    const newItem: SavedPythagoreanItem = {
      id: Date.now().toString(),
      module: "sa",
      title: `Side-Angle: c = ${resultSA.c}`,
      inputs: inputsStr,
      inputPayload: { saSideType, saSideVal, saAngleDeg },
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
    const inputsStr = `X = ${result3D.x}, Y = ${result3D.y}, Z = ${result3D.z}`;
    const resList = [
      `3D Space Distance d_3D = ${result3D.spaceDiag3D} (${result3D.exactRadical3D})`,
      `2D Base Diagonal d_2D = ${result3D.baseDiag2D} (${result3D.exactRadical2D})`
    ];
    const newItem: SavedPythagoreanItem = {
      id: Date.now().toString(),
      module: "3d",
      title: `3D Distance d = ${result3D.spaceDiag3D}`,
      inputs: inputsStr,
      inputPayload: { distX, distY, distZ },
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
    if (!resultEuclid.isValid) return;
    const inputsStr = `m = ${resultEuclid.m}, n = ${resultEuclid.n}`;
    const resList = [
      `Generated Triple: (${resultEuclid.a}, ${resultEuclid.b}, ${resultEuclid.c})`,
      `a² + b² = ${resultEuclid.a * resultEuclid.a} + ${resultEuclid.b * resultEuclid.b} = ${resultEuclid.c * resultEuclid.c} (${resultEuclid.c}²)`,
      `Type: ${resultEuclid.isPrimitive ? "Primitive Triple" : "Non-Primitive Triple"}`
    ];
    const newItem: SavedPythagoreanItem = {
      id: Date.now().toString(),
      module: "gen",
      title: `Triple (${resultEuclid.a}, ${resultEuclid.b}, ${resultEuclid.c})`,
      inputs: inputsStr,
      inputPayload: { euclidM, euclidN },
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
      `${resultConv.cm} cm`,
      `${resultConv.feet} feet`,
      `${resultConv.inches} inches`,
      `${resultConv.yards} yards`
    ];
    const newItem: SavedPythagoreanItem = {
      id: Date.now().toString(),
      module: "conv",
      title: `Converted ${convVal} ${convUnit}`,
      inputs: inputsStr,
      inputPayload: { convVal, convUnit },
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

  // CSV Export
  const handleExportCSV = () => {
    const rows = [
      ["Module", "Timestamp", "Inputs", "Result Details"],
      ...savedCoreItems.map(i => [i.operation, i.timestamp, `"${i.inputs.replace(/"/g, '""')}"`, `"${i.result.replace(/"/g, '""')}"`]),
      ...savedSaItems.map(i => [i.operation, i.timestamp, `"${i.inputs.replace(/"/g, '""')}"`, `"${i.result.replace(/"/g, '""')}"`]),
      ...saved3DItems.map(i => [i.operation, i.timestamp, `"${i.inputs.replace(/"/g, '""')}"`, `"${i.result.replace(/"/g, '""')}"`]),
      ...savedGenItems.map(i => [i.operation, i.timestamp, `"${i.inputs.replace(/"/g, '""')}"`, `"${i.result.replace(/"/g, '""')}"`]),
      ...savedConvItems.map(i => [i.operation, i.timestamp, `"${i.inputs.replace(/"/g, '""')}"`, `"${i.result.replace(/"/g, '""')}"`])
    ];

    if (rows.length === 1) {
      // If no saved items, export current active state
      rows.push([
        "Core Pythagorean",
        new Date().toISOString(),
        `"a=${resultCore.a}, b=${resultCore.b}"`,
        `"c=${resultCore.c}, area=${resultCore.area}, perimeter=${resultCore.perimeter}"`
      ]);
      rows.push([
        "Side + Acute Angle",
        new Date().toISOString(),
        `"${saSideType}=${saSideVal}, angle=${saAngleDeg}"`,
        `"a=${resultSA.a}, b=${resultSA.b}, c=${resultSA.c}"`
      ]);
      rows.push([
        "3D Distance",
        new Date().toISOString(),
        `"x=${result3D.x}, y=${result3D.y}, z=${result3D.z}"`,
        `"d_3D=${result3D.spaceDiag3D}, d_2D=${result3D.baseDiag2D}"`
      ]);
      rows.push([
        "Euclid Triple",
        new Date().toISOString(),
        `"m=${euclidM}, n=${euclidN}"`,
        `"(${resultEuclid.a}, ${resultEuclid.b}, ${resultEuclid.c})"`
      ]);
      rows.push([
        "Unit Converter",
        new Date().toISOString(),
        `"${convVal} ${convUnit}"`,
        `"meters=${resultConv.meters}, feet=${resultConv.feet}, inches=${resultConv.inches}"`
      ]);
    }

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pythagorean_suite_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render Interactive Dynamic SVG Right Triangle
  const renderTriangleSVG = () => {
    const width = 300;
    const height = 230;
    const isSquares = showSquares;

    // Fixed base origin
    const ox = isSquares ? 100 : 55;
    const oy = isSquares ? 155 : 175;

    // Normalizing scale based on ratio between a and b
    const rawA = resultCore.isValid ? Math.max(0.1, resultCore.a) : 3;
    const rawB = resultCore.isValid ? Math.max(0.1, resultCore.b) : 4;
    const maxSide = Math.max(rawA, rawB);
    const targetMaxPx = isSquares ? 65 : 110;
    const scale = targetMaxPx / maxSide;

    const scaledA = rawA * scale;
    const scaledB = rawB * scale;

    const ax = ox;
    const ay = oy - scaledA; // top vertex A
    const bx = ox + scaledB;
    const by = oy; // right vertex B

    return (
      <svg
        role="img"
        aria-label="Interactive Right Triangle Diagram with labeled sides a, b, c and acute angles"
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-[280px] h-[210px] select-none"
      >
        <title>Right Triangle Geometry</title>
        <desc>{`Right triangle with leg a = ${resultCore.a}, leg b = ${resultCore.b}, and hypotenuse c = ${resultCore.c}`}</desc>
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />

        {/* Proof Squares if enabled */}
        {isSquares && (
          <g aria-label="Geometric proof squares on legs a and b">
            {/* Square on side a (left) */}
            <rect
              x={ox - scaledA}
              y={ay}
              width={scaledA}
              height={scaledA}
              fill="#3b82f6"
              fillOpacity="0.15"
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
            {/* Square on side b (bottom) */}
            <rect
              x={ox}
              y={oy}
              width={scaledB}
              height={scaledB}
              fill="#16a34a"
              fillOpacity="0.15"
              stroke="#16a34a"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
          </g>
        )}

        {/* Right Angle Corner Box */}
        <path
          d={`M ${ox} ${oy - 10} L ${ox + 10} ${oy - 10} L ${ox + 10} ${oy}`}
          fill="none"
          stroke="#2563eb"
          strokeWidth="1.5"
        />

        {/* Triangle Polygon */}
        <polygon
          points={`${ox},${oy} ${ox},${ay} ${bx},${by}`}
          fill="#3b82f6"
          fillOpacity="0.2"
          stroke="#2563eb"
          strokeWidth="2.5"
        />

        {/* Side Labels */}
        <text
          x={ox - 8}
          y={(oy + ay) / 2}
          textAnchor="end"
          dominantBaseline="middle"
          className="text-[11px] font-mono font-bold fill-blue-600 dark:fill-blue-400"
        >
          a = {resultCore.a}
        </text>
        <text
          x={(ox + bx) / 2}
          y={oy + 15}
          textAnchor="middle"
          dominantBaseline="hanging"
          className="text-[11px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400"
        >
          b = {resultCore.b}
        </text>
        <text
          x={(ox + bx) / 2 + 10}
          y={(ay + by) / 2 - 8}
          textAnchor="start"
          className="text-[11px] font-mono font-bold fill-purple-600 dark:fill-purple-400"
        >
          c = {resultCore.c}
        </text>

        {/* Angle Labels: Alpha at top vertex (opposite b), Beta at right vertex (opposite a) */}
        <text x={ox + 6} y={ay + 18} className="text-[9px] font-mono font-bold fill-slate-500">
          α={resultCore.alphaDeg}°
        </text>
        <text x={bx - 32} y={by - 5} className="text-[9px] font-mono font-bold fill-slate-500">
          β={resultCore.betaDeg}°
        </text>
      </svg>
    );
  };

  const renderSavedCardsGroup = (
    title: string,
    items: SavedPythagoreanItem[],
    onClear: () => void,
    onDelete: (id: string) => void,
    onRestore: (item: SavedPythagoreanItem) => void
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
            className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1 transition-colors"
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
                      onClick={() => handleCopyText(`${item.title}\nInputs: ${item.inputs}\nResults:\n${resParts.join("\n")}`, `saved-${item.id}`)}
                      className="text-slate-400 hover:text-blue-600 p-1 transition-colors cursor-pointer"
                      title="Copy calculation"
                      aria-label="Copy calculation"
                    >
                      {copiedKey === `saved-${item.id}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
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

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onRestore(item)}
                      className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold text-[11px] hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" /> Restore
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide" : "Details"}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3 text-blue-600" /> : <ChevronDown className="w-3 h-3 text-blue-600" />}
                    </button>
                  </div>

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
      {/* Top Suite Toolbar: Precision Selector & Global Export */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/60 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-600 dark:text-slate-400">Precision:</span>
          {[2, 4, 6].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPrecision(p)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                precision === p
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400"
              }`}
            >
              {p} Decimals
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer shadow-xs"
            title="Download complete calculation log as CSV"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" /> Export CSV
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer shadow-xs no-print"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" /> Print / PDF
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: CORE PYTHAGOREAN THEOREM SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Core Pythagorean Theorem Solver (a² + b² = c²)</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopyText(
                `Pythagorean Calculation:\nInputs: a = ${resultCore.a}, b = ${resultCore.b}, c = ${resultCore.c}\n` +
                `Formula: a² + b² = c²\n` +
                `Results:\n` +
                `- Hypotenuse c = ${resultCore.c} (${resultCore.exactRadicalC || resultCore.c})\n` +
                `- Area = ${resultCore.area}\n` +
                `- Perimeter = ${resultCore.perimeter}\n` +
                `- Altitude = ${resultCore.altitudeHc}\n` +
                `- Steps:\n${resultCore.stepText}`,
                "copy-core"
              )}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === "copy-core" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === "copy-core" ? "Copied!" : "Copy"}</span>
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
            <button type="button" onClick={()=>handleApplyPreset("3","4","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">3-4-5</button>
            <button type="button" onClick={()=>handleApplyPreset("5","12","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">5-12-13</button>
            <button type="button" onClick={()=>handleApplyPreset("8","15","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">8-15-17</button>
            <button type="button" onClick={()=>handleApplyPreset("7","24","")} className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">7-24-25</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <p className="font-bold text-slate-500 mb-1">Enter any 2 values to compute the 3rd side (or all 3 to verify):</p>
              <div>
                <label htmlFor="coreA" className="font-bold block mb-1">Side a (Leg):</label>
                <input
                  id="coreA"
                  type="number"
                  step="any"
                  placeholder="e.g. 3"
                  value={coreA}
                  onChange={(e)=>setCoreA(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
              <div>
                <label htmlFor="coreB" className="font-bold block mb-1">Side b (Leg):</label>
                <input
                  id="coreB"
                  type="number"
                  step="any"
                  placeholder="e.g. 4"
                  value={coreB}
                  onChange={(e)=>setCoreB(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
              <div>
                <label htmlFor="coreC" className="font-bold block mb-1">Side c (Hypotenuse):</label>
                <input
                  id="coreC"
                  type="number"
                  step="any"
                  placeholder="e.g. 5"
                  value={coreC}
                  onChange={(e)=>setCoreC(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
              <button
                type="button"
                onClick={()=>handleApplyPreset("","","")}
                className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer transition-colors"
              >
                Clear Inputs
              </button>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              {!resultCore.isValid ? (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Validation Alert</span>
                    <span>{resultCore.error}</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 uppercase block font-sans">Side a</span>
                      <span className="text-blue-600 dark:text-blue-400">{resultCore.a}</span>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 uppercase block font-sans">Side b</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{resultCore.b}</span>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 uppercase block font-sans">Hypotenuse c</span>
                      <span className="text-purple-600 dark:text-purple-400">{resultCore.c}</span>
                      <span className="text-[9px] text-slate-400 block font-sans">({resultCore.exactRadicalC || resultCore.exactRadicalLeg || resultCore.c})</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
                    <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 uppercase block font-sans">Area A</span>
                      <span>{resultCore.area}</span>
                    </div>
                    <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 uppercase block font-sans">Perimeter P</span>
                      <span>{resultCore.perimeter}</span>
                    </div>
                    <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 uppercase block font-sans">Altitude h_c</span>
                      <span>{resultCore.altitudeHc}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={showSquares}
                        onChange={(e)=>setShowSquares(e.target.checked)}
                        className="rounded text-blue-600"
                      />
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
                </>
              )}
            </div>
          </div>

          {renderSavedCardsGroup("Saved Core Calculations", savedCoreItems, ()=>setSavedCoreItems([]), (id)=>setSavedCoreItems(savedCoreItems.filter(i=>i.id!==id)), handleRestoreCore)}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: SIDE + ACUTE ANGLE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Side + Acute Angle Right Triangle Solver</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopyText(
                `Side + Acute Angle Right Triangle Solver:\n` +
                `Known: ${saSideType === "a" ? "Opposite Leg a" : saSideType === "b" ? "Adjacent Leg b" : "Hypotenuse c"} = ${resultSA.knownVal}, Angle θ = ${resultSA.angleDeg}°\n` +
                `Results:\n` +
                `- Leg a (Opposite) = ${resultSA.a}\n` +
                `- Leg b (Adjacent) = ${resultSA.b}\n` +
                `- Hypotenuse c = ${resultSA.c}\n` +
                `- Area = ${resultSA.area}\n` +
                `- Perimeter = ${resultSA.perimeter}\n` +
                `- Altitude h_c = ${resultSA.altitudeHc}\n` +
                `- sin(θ) = ${resultSA.sinVal}, cos(θ) = ${resultSA.cosVal}, tan(θ) = ${resultSA.tanVal}\n` +
                `- Steps:\n${resultSA.stepText}`,
                "copy-sa"
              )}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === "copy-sa" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === "copy-sa" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleSaveSA}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedSa ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div>
                <label htmlFor="saSideType" className="font-bold block mb-1">Known Side Reference:</label>
                <select
                  id="saSideType"
                  value={saSideType}
                  onChange={(e)=>setSaSideType(e.target.value as any)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                >
                  <option value="a">Leg a (Opposite to θ)</option>
                  <option value="b">Leg b (Adjacent to θ)</option>
                  <option value="c">Hypotenuse c</option>
                </select>
              </div>

              <div>
                <label htmlFor="saSideVal" className="font-bold block mb-1">Side Length:</label>
                <input
                  id="saSideVal"
                  type="number"
                  step="any"
                  value={saSideVal}
                  onChange={(e)=>setSaSideVal(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
              <div>
                <label htmlFor="saAngleDeg" className="font-bold block mb-1">Acute Angle θ (°):</label>
                <input
                  id="saAngleDeg"
                  type="number"
                  step="any"
                  placeholder="0 < θ < 90"
                  value={saAngleDeg}
                  onChange={(e)=>setSaAngleDeg(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              {!resultSA.isValid ? (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Validation Alert</span>
                    <span>{resultSA.error}</span>
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-xs font-extrabold text-blue-600 uppercase block">Solved Triangle Metrics</span>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 uppercase block font-sans">Leg a (Opposite)</span>
                      <span className="text-blue-600 dark:text-blue-400">{resultSA.a}</span>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 uppercase block font-sans">Leg b (Adjacent)</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{resultSA.b}</span>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 uppercase block font-sans">Hypotenuse c</span>
                      <span className="text-purple-600 dark:text-purple-400">{resultSA.c}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
                    <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 uppercase block font-sans">Area A</span>
                      <span>{resultSA.area}</span>
                    </div>
                    <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 uppercase block font-sans">Perimeter P</span>
                      <span>{resultSA.perimeter}</span>
                    </div>
                    <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 uppercase block font-sans">Altitude h_c</span>
                      <span>{resultSA.altitudeHc}</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between font-mono font-bold text-slate-600 dark:text-slate-300">
                      <span>sin({resultSA.angleDeg}°) = {resultSA.sinVal}</span>
                      <span>cos({resultSA.angleDeg}°) = {resultSA.cosVal}</span>
                      <span>tan({resultSA.angleDeg}°) = {resultSA.tanVal}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-sans">
                      Complementary acute angle: 90° - {resultSA.angleDeg}° = {resultSA.complementaryAngleDeg}°
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {renderSavedCardsGroup("Saved Side-Angle Calculations", savedSaItems, ()=>setSavedSaItems([]), (id)=>setSavedSaItems(savedSaItems.filter(i=>i.id!==id)), handleRestoreSA)}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: 3D PYTHAGOREAN DISTANCE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>3D Pythagorean Distance Solver (d = √(x² + y² + z²))</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopyText(
                `3D Pythagorean Space Distance:\n` +
                `Coordinates: X = ${result3D.x}, Y = ${result3D.y}, Z = ${result3D.z}\n` +
                `Results:\n` +
                `- 3D Space Distance d_3D = ${result3D.spaceDiag3D} (${result3D.exactRadical3D})\n` +
                `- 2D Base Diagonal d_2D = ${result3D.baseDiag2D} (${result3D.exactRadical2D})\n` +
                `- Calculation Steps:\n${result3D.stepText}`,
                "copy-3d"
              )}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === "copy-3d" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === "copy-3d" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleSave3D}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSaved3D ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <p className="font-bold text-slate-500 mb-1">Enter 3D coordinate offsets (positive or negative):</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label htmlFor="distX" className="font-bold block mb-1">X Offset:</label>
                  <input
                    id="distX"
                    type="number"
                    step="any"
                    value={distX}
                    onChange={(e)=>setDistX(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                  />
                </div>
                <div>
                  <label htmlFor="distY" className="font-bold block mb-1">Y Offset:</label>
                  <input
                    id="distY"
                    type="number"
                    step="any"
                    value={distY}
                    onChange={(e)=>setDistY(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                  />
                </div>
                <div>
                  <label htmlFor="distZ" className="font-bold block mb-1">Z Offset:</label>
                  <input
                    id="distZ"
                    type="number"
                    step="any"
                    value={distZ}
                    onChange={(e)=>setDistZ(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">3D Space Distance</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {result3D.spaceDiag3D} <span className="text-base text-blue-600">({result3D.exactRadical3D})</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                2D Base Diagonal d_2D = {result3D.baseDiag2D} ({result3D.exactRadical2D})
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                {result3D.stepText}
              </div>
            </div>
          </div>

          {renderSavedCardsGroup("Saved 3D Calculations", saved3DItems, ()=>setSaved3DItems([]), (id)=>setSaved3DItems(saved3DItems.filter(i=>i.id!==id)), handleRestore3D)}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: PYTHAGOREAN TRIPLE GENERATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Euclid Pythagorean Triple Generator (a = m² - n², b = 2mn, c = m² + n²)</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopyText(
                `Euclid Pythagorean Triple:\n` +
                `Parameters: m = ${resultEuclid.m}, n = ${resultEuclid.n}\n` +
                `Generated Triple: (${resultEuclid.a}, ${resultEuclid.b}, ${resultEuclid.c})\n` +
                `Formula: a = m² - n² = ${resultEuclid.a}, b = 2mn = ${resultEuclid.b}, c = m² + n² = ${resultEuclid.c}\n` +
                `Verification: ${resultEuclid.a}² + ${resultEuclid.b}² = ${resultEuclid.c}²\n` +
                `Classification: ${resultEuclid.isPrimitive ? "Primitive Triple" : "Non-Primitive Triple"}`,
                "copy-gen"
              )}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === "copy-gen" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === "copy-gen" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleSaveGen}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedGen ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <p className="font-bold text-slate-500 mb-1">Enter positive integers m and n (where m &gt; n):</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="euclidM" className="font-bold block mb-1">Parameter m (m &gt; n):</label>
                  <input
                    id="euclidM"
                    type="number"
                    step="1"
                    value={euclidM}
                    onChange={(e)=>setEuclidM(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label htmlFor="euclidN" className="font-bold block mb-1">Parameter n:</label>
                  <input
                    id="euclidN"
                    type="number"
                    step="1"
                    value={euclidN}
                    onChange={(e)=>setEuclidN(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              {!resultEuclid.isValid ? (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Validation Alert</span>
                    <span>{resultEuclid.error}</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-blue-600 uppercase block">Generated Pythagorean Triple</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                      resultEuclid.isPrimitive
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                        : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      {resultEuclid.isPrimitive ? "Primitive Triple (gcd=1)" : "Non-Primitive Triple"}
                    </span>
                  </div>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    ({resultEuclid.a}, {resultEuclid.b}, {resultEuclid.c})
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    {resultEuclid.a}² + {resultEuclid.b}² = {resultEuclid.a * resultEuclid.a} + {resultEuclid.b * resultEuclid.b} = {resultEuclid.c * resultEuclid.c} ({resultEuclid.c}²)
                  </p>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                    {resultEuclid.stepText}
                  </div>
                </>
              )}
            </div>
          </div>

          {renderSavedCardsGroup("Saved Generated Triples", savedGenItems, ()=>setSavedGenItems([]), (id)=>setSavedGenItems(savedGenItems.filter(i=>i.id!==id)), handleRestoreGen)}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: MASTER PYTHAGOREAN UNIT CONVERTER MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Master Pythagorean Unit Converter Matrix</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopyText(
                `Pythagorean Unit Conversion Matrix:\n` +
                `Input: ${convVal} ${convUnit}\n` +
                `Equivalent Measurements:\n` +
                `- Meters: ${resultConv.meters} m\n` +
                `- Centimeters: ${resultConv.cm} cm\n` +
                `- Millimeters: ${resultConv.mm} mm\n` +
                `- Kilometers: ${resultConv.km} km\n` +
                `- Feet: ${resultConv.feet} ft\n` +
                `- Inches: ${resultConv.inches} in\n` +
                `- Yards: ${resultConv.yards} yd\n` +
                `- Miles: ${resultConv.miles} mi`,
                "copy-conv"
              )}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === "copy-conv" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === "copy-conv" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleSaveConv}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedConv ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label htmlFor="convVal" className="block text-xs font-bold mb-1">Length Value:</label>
              <input
                id="convVal"
                type="number"
                step="any"
                value={convVal}
                onChange={(e)=>setConvVal(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
              />
            </div>
            <div>
              <label htmlFor="convUnit" className="block text-xs font-bold mb-1">Base Unit:</label>
              <select
                id="convUnit"
                value={convUnit}
                onChange={(e)=>setConvUnit(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm"
              >
                <option value="meters">Meters (m)</option>
                <option value="cm">Centimeters (cm)</option>
                <option value="mm">Millimeters (mm)</option>
                <option value="km">Kilometers (km)</option>
                <option value="feet">Feet (ft)</option>
                <option value="inches">Inches (in)</option>
                <option value="yards">Yards (yd)</option>
                <option value="miles">Miles (mi)</option>
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
                <tr><td className="p-2.5 font-bold font-sans">Meters (m)</td><td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">{resultConv.meters}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Centimeters (cm)</td><td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">{resultConv.cm}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Millimeters (mm)</td><td className="p-2.5 font-bold">{resultConv.mm}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Kilometers (km)</td><td className="p-2.5 font-bold">{resultConv.km}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Feet (ft)</td><td className="p-2.5 font-bold">{resultConv.feet}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Inches (in)</td><td className="p-2.5 font-bold">{resultConv.inches}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Yards (yd)</td><td className="p-2.5 font-bold">{resultConv.yards}</td></tr>
                <tr><td className="p-2.5 font-bold font-sans">Miles (mi)</td><td className="p-2.5 font-bold">{resultConv.miles}</td></tr>
              </tbody>
            </table>
          </div>

          {renderSavedCardsGroup("Saved Converter Calculations", savedConvItems, ()=>setSavedConvItems([]), (id)=>setSavedConvItems(savedConvItems.filter(i=>i.id!==id)), handleRestoreConv)}
        </div>
      </div>
    </div>
  );
}

export default PythagoreanCalculator;
