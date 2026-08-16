"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sliders,
  Layers,
  Copy,
  CheckCircle2,
  BarChart2,
  Zap,
  Maximize2,
  Circle,
  Triangle as TriangleIcon
} from "lucide-react";
import {
  solveUniversalTriangle,
  SolvedTriangle,
  TriangleSolveResult
} from "@/app/calculators/triangle-calculator/triangle-logic";

export interface SavedTriangleItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function TriangleCalculator() {
  // Card 1 Inputs: Universal 6-Parameter Solver
  const [inA, setInA] = useState<string>("3");
  const [inB, setInB] = useState<string>("4");
  const [inC, setInC] = useState<string>("5");
  const [inAngleA, setInAngleA] = useState<string>("");
  const [inAngleB, setInAngleB] = useState<string>("");
  const [inAngleC, setInAngleC] = useState<string>("");
  const [angleUnit, setAngleUnit] = useState<"deg" | "rad">("deg");
  const [precision1, setPrecision1] = useState<number>(4);
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState<number>(0);

  // SVG Visualizer Toggles
  const [showIncircle, setShowIncircle] = useState<boolean>(false);
  const [showCircumcircle, setShowCircumcircle] = useState<boolean>(false);

  // Card 2 Inputs: Right Triangle Solver
  const [rtLegA, setRtLegA] = useState<number>(6);
  const [rtLegB, setRtLegB] = useState<number>(8);

  // Card 3 Inputs: Inradius & Circumradius Solver
  const [crcSideA, setCrcSideA] = useState<number>(7);
  const [crcSideB, setCrcSideB] = useState<number>(8);
  const [crcSideC, setCrcSideC] = useState<number>(9);

  // Card 4 Inputs: Heron's Formula Solver
  const [heronA, setHeronA] = useState<number>(5);
  const [heronB, setHeronB] = useState<number>(6);
  const [heronC, setHeronC] = useState<number>(7);

  // Saved calculation states
  const [savedUnivItems, setSavedUnivItems] = useState<SavedTriangleItem[]>([]);
  const [justSavedUniv, setJustSavedUniv] = useState<boolean>(false);

  const [savedRtItems, setSavedRtItems] = useState<SavedTriangleItem[]>([]);
  const [justSavedRt, setJustSavedRt] = useState<boolean>(false);

  const [savedCrcItems, setSavedCrcItems] = useState<SavedTriangleItem[]>([]);
  const [justSavedCrc, setJustSavedCrc] = useState<boolean>(false);

  const [savedHeronItems, setSavedHeronItems] = useState<SavedTriangleItem[]>([]);
  const [justSavedHeron, setJustSavedHeron] = useState<boolean>(false);

  // Expand state
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_tri_univ");
      if (s1) setSavedUnivItems(JSON.parse(s1));

      const s2 = localStorage.getItem("saved_tri_rt");
      if (s2) setSavedRtItems(JSON.parse(s2));

      const s3 = localStorage.getItem("saved_tri_crc");
      if (s3) setSavedCrcItems(JSON.parse(s3));

      const s4 = localStorage.getItem("saved_tri_heron");
      if (s4) setSavedHeronItems(JSON.parse(s4));
    } catch (e) {}
  }, []);

  // Parse angle input helper (supportsdeg/rad and pi/2, pi/4)
  const parseAngleVal = (rawStr: string): number | undefined => {
    if (!rawStr || !rawStr.trim()) return undefined;
    const str = rawStr.trim().toLowerCase();
    if (str.includes("pi")) {
      let val = Math.PI;
      if (str.includes("/2")) val = Math.PI / 2;
      else if (str.includes("/3")) val = Math.PI / 3;
      else if (str.includes("/4")) val = Math.PI / 4;
      else if (str.includes("/6")) val = Math.PI / 6;
      return (val * 180.0) / Math.PI;
    }
    const num = parseFloat(str);
    if (Number.isNaN(num) || num <= 0) return undefined;
    return angleUnit === "rad" ? (num * 180.0) / Math.PI : num;
  };

  // Card 1 Calculations
  const univSolveResult: TriangleSolveResult = useMemo(() => {
    const a = parseFloat(inA) > 0 ? parseFloat(inA) : undefined;
    const b = parseFloat(inB) > 0 ? parseFloat(inB) : undefined;
    const c = parseFloat(inC) > 0 ? parseFloat(inC) : undefined;
    const A = parseAngleVal(inAngleA);
    const B = parseAngleVal(inAngleB);
    const C = parseAngleVal(inAngleC);

    return solveUniversalTriangle(a, b, c, A, B, C, precision1);
  }, [inA, inB, inC, inAngleA, inAngleB, inAngleC, angleUnit, precision1]);

  const activeSolution: SolvedTriangle | undefined =
    univSolveResult.success && univSolveResult.solutions.length > 0
      ? univSolveResult.solutions[selectedSolutionIndex] || univSolveResult.solutions[0]
      : undefined;

  // Card 2 Calculations (Right Triangle)
  const rtSolveResult = useMemo(() => {
    const a = Math.max(0.1, rtLegA);
    const b = Math.max(0.1, rtLegB);
    const c = Math.sqrt(a * a + b * b);
    const area = 0.5 * a * b;
    const perimeter = a + b + c;
    const angleA_rad = Math.atan2(a, b);
    const angleA_deg = (angleA_rad * 180.0) / Math.PI;
    const angleB_deg = 90.0 - angleA_deg;

    const sinA = Math.sin(angleA_rad);
    const cosA = Math.cos(angleA_rad);
    const tanA = Math.tan(angleA_rad);

    const fmt = (v: number) => v.toFixed(precision1);

    return {
      a,
      b,
      c: parseFloat(fmt(c)),
      area: parseFloat(fmt(area)),
      perimeter: parseFloat(fmt(perimeter)),
      angleA: parseFloat(fmt(angleA_deg)),
      angleB: parseFloat(fmt(angleB_deg)),
      sinA: parseFloat(fmt(sinA)),
      cosA: parseFloat(fmt(cosA)),
      tanA: parseFloat(fmt(tanA))
    };
  }, [rtLegA, rtLegB, precision1]);

  // Card 3 Calculations (Circle Metrics)
  const crcSolveResult = useMemo(() => {
    return solveUniversalTriangle(crcSideA, crcSideB, crcSideC, undefined, undefined, undefined, precision1);
  }, [crcSideA, crcSideB, crcSideC, precision1]);

  const activeCrcSol = crcSolveResult.success ? crcSolveResult.solutions[0] : undefined;

  // Card 4 Calculations (Heron's & Altitudes)
  const heronSolveResult = useMemo(() => {
    return solveUniversalTriangle(heronA, heronB, heronC, undefined, undefined, undefined, precision1);
  }, [heronA, heronB, heronC, precision1]);

  const activeHeronSol = heronSolveResult.success ? heronSolveResult.solutions[0] : undefined;

  // Quick Presets Handler for Card 1
  const handleApplyPreset = (preset: "345" | "equilateral" | "isosceles" | "306090") => {
    setInAngleA("");
    setInAngleB("");
    setInAngleC("");
    if (preset === "345") {
      setInA("3"); setInB("4"); setInC("5");
    } else if (preset === "equilateral") {
      setInA("6"); setInB("6"); setInC("6");
    } else if (preset === "isosceles") {
      setInA("5"); setInB("5"); setInC("8");
    } else if (preset === "306090") {
      setInA("5");
      setInB("8.6603");
      setInC("10");
    }
  };

  // Save Handlers
  const handleSaveUniv = () => {
    if (!activeSolution) return;
    const inputsStr = `a=${activeSolution.a}, b=${activeSolution.b}, c=${activeSolution.c}`;
    const opStr = `Universal Triangle Calculator (${activeSolution.caseType})`;
    const resList = [
      `Sides: a=${activeSolution.a}, b=${activeSolution.b}, c=${activeSolution.c}`,
      `Angles: A=${activeSolution.A_deg}°, B=${activeSolution.B_deg}°, C=${activeSolution.C_deg}°`,
      `Area K = ${activeSolution.area}, Perimeter P = ${activeSolution.perimeter}`,
      `Altitudes: ha=${activeSolution.ha}, hb=${activeSolution.hb}, hc=${activeSolution.hc}`,
      `Inradius r = ${activeSolution.inradius}, Circumradius R = ${activeSolution.circumradius}`
    ];

    const newItem: SavedTriangleItem = {
      id: Date.now().toString(),
      title: `Triangle [${activeSolution.a}, ${activeSolution.b}, ${activeSolution.c}] → Area = ${activeSolution.area}`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Area = ${activeSolution.area}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedUnivItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedUnivItems(updated);
    try { localStorage.setItem("saved_tri_univ", JSON.stringify(updated)); } catch (e) {}
    setJustSavedUniv(true);
    setTimeout(() => setJustSavedUniv(false), 2000);
  };

  const handleSaveRt = () => {
    const inputsStr = `Leg a = ${rtSolveResult.a}, Leg b = ${rtSolveResult.b}`;
    const opStr = `Right Triangle Solver`;
    const resList = [
      `Hypotenuse c = ${rtSolveResult.c}`,
      `Area = ${rtSolveResult.area}, Perimeter = ${rtSolveResult.perimeter}`,
      `Angle A = ${rtSolveResult.angleA}°, Angle B = ${rtSolveResult.angleB}°`,
      `sin(A) = ${rtSolveResult.sinA}, cos(A) = ${rtSolveResult.cosA}, tan(A) = ${rtSolveResult.tanA}`
    ];

    const newItem: SavedTriangleItem = {
      id: Date.now().toString(),
      title: `Right Triangle [a=${rtSolveResult.a}, b=${rtSolveResult.b}] → c = ${rtSolveResult.c}`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `c = ${rtSolveResult.c}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedRtItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedRtItems(updated);
    try { localStorage.setItem("saved_tri_rt", JSON.stringify(updated)); } catch (e) {}
    setJustSavedRt(true);
    setTimeout(() => setJustSavedRt(false), 2000);
  };

  const handleSaveCrc = () => {
    if (!activeCrcSol) return;
    const inputsStr = `a=${activeCrcSol.a}, b=${activeCrcSol.b}, c=${activeCrcSol.c}`;
    const opStr = `Inradius & Circumradius Solver`;
    const resList = [
      `Inradius r = ${activeCrcSol.inradius} (Incircle Area = ${(Math.PI * activeCrcSol.inradius * activeCrcSol.inradius).toFixed(precision1)})`,
      `Circumradius R = ${activeCrcSol.circumradius} (Circumcircle Area = ${(Math.PI * activeCrcSol.circumradius * activeCrcSol.circumradius).toFixed(precision1)})`,
      `Triangle Area K = ${activeCrcSol.area}`
    ];

    const newItem: SavedTriangleItem = {
      id: Date.now().toString(),
      title: `Circle Metrics [r=${activeCrcSol.inradius}, R=${activeCrcSol.circumradius}]`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `r = ${activeCrcSol.inradius}, R = ${activeCrcSol.circumradius}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedCrcItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedCrcItems(updated);
    try { localStorage.setItem("saved_tri_crc", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCrc(true);
    setTimeout(() => setJustSavedCrc(false), 2000);
  };

  const handleSaveHeron = () => {
    if (!activeHeronSol) return;
    const inputsStr = `a=${activeHeronSol.a}, b=${activeHeronSol.b}, c=${activeHeronSol.c}`;
    const opStr = `Heron's Formula & Altitudes`;
    const resList = [
      `Area K = ${activeHeronSol.area}`,
      `Semi-perimeter s = ${activeHeronSol.semiPerimeter}`,
      `Altitudes: ha=${activeHeronSol.ha}, hb=${activeHeronSol.hb}, hc=${activeHeronSol.hc}`,
      `Medians: ma=${activeHeronSol.ma}, mb=${activeHeronSol.mb}, mc=${activeHeronSol.mc}`
    ];

    const newItem: SavedTriangleItem = {
      id: Date.now().toString(),
      title: `Heron's Area = ${activeHeronSol.area} (s=${activeHeronSol.semiPerimeter})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Area = ${activeHeronSol.area}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedHeronItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedHeronItems(updated);
    try { localStorage.setItem("saved_tri_heron", JSON.stringify(updated)); } catch (e) {}
    setJustSavedHeron(true);
    setTimeout(() => setJustSavedHeron(false), 2000);
  };

  // Render Scaled Dynamic SVG Vector Triangle Visualizer
  const renderTriangleSVG = (sol?: SolvedTriangle, showCircles: boolean = false) => {
    if (!sol) return null;

    const width = 450;
    const height = 220;
    const pad = 50;

    // Solved points (A at (0,0), B at (c,0), C at (Cx, Cy))
    const { Ax, Ay, Bx, By, Cx, Cy } = sol.coords;

    const minX = Math.min(Ax, Bx, Cx);
    const maxX = Math.max(Ax, Bx, Cx);
    const minY = Math.min(Ay, By, Cy);
    const maxY = Math.max(Ay, By, Cy);

    const rangeX = Math.max(1, maxX - minX);
    const rangeY = Math.max(1, maxY - minY);

    const scaleX = (x: number) => pad + ((x - minX) / rangeX) * (width - 2 * pad);
    // SVG y-axis is inverted
    const scaleY = (y: number) => height - pad - ((y - minY) / rangeY) * (height - 2 * pad);

    const pA = { x: scaleX(Ax), y: scaleY(Ay) };
    const pB = { x: scaleX(Bx), y: scaleY(By) };
    const pC = { x: scaleX(Cx), y: scaleY(Cy) };

    // Incircle center & radius in SVG space
    const incenterX = (sol.a * Ax + sol.b * Bx + sol.c * Cx) / sol.perimeter;
    const incenterY = (sol.a * Ay + sol.b * By + sol.c * Cy) / sol.perimeter;
    const pIn = { x: scaleX(incenterX), y: scaleY(incenterY) };
    const svgRin = (sol.inradius / rangeX) * (width - 2 * pad);

    // Circumcircle center in SVG space
    const d = 2 * (Ax * (By - Cy) + Bx * (Cy - Ay) + Cx * (Ay - By));
    const ccX = ((Ax * Ax + Ay * Ay) * (By - Cy) + (Bx * Bx + By * By) * (Cy - Ay) + (Cx * Cx + Cy * Cy) * (Ay - By)) / d;
    const ccY = ((Ax * Ax + Ay * Ay) * (Cx - Bx) + (Bx * Bx + By * By) * (Ax - Cx) + (Cx * Cx + Cy * Cy) * (Bx - Ax)) / d;
    const pCc = { x: scaleX(ccX), y: scaleY(ccY) };
    const svgRcc = (sol.circumradius / rangeX) * (width - 2 * pad);

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-lg h-auto">
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-800" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#grid)" rx="12" />

        {/* Circumcircle Option */}
        {(showCircumcircle || showCircles) && (
          <circle cx={pCc.x} cy={pCc.y} r={svgRcc} fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3,3" />
        )}

        {/* Incircle Option */}
        {(showIncircle || showCircles) && (
          <circle cx={pIn.x} cy={pIn.y} r={svgRin} fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
        )}

        {/* Triangle Shaded Vector Body */}
        <polygon
          points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y}`}
          fill="#3b82f6"
          fillOpacity="0.2"
          stroke="#1d4ed8"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Altitude Line from C to Base AB */}
        <line x1={pC.x} y1={pC.y} x2={pC.x} y2={pA.y} stroke="#64748b" strokeWidth="1.5" strokeDasharray="2,2" />

        {/* Vertex Markers & Labels */}
        <circle cx={pA.x} cy={pA.y} r="5" fill="#1d4ed8" />
        <text x={pA.x - 12} y={pA.y + 15} className="text-[11px] font-bold font-mono fill-blue-700 dark:fill-blue-400">A</text>

        <circle cx={pB.x} cy={pB.y} r="5" fill="#1d4ed8" />
        <text x={pB.x + 8} y={pB.y + 15} className="text-[11px] font-bold font-mono fill-blue-700 dark:fill-blue-400">B</text>

        <circle cx={pC.x} cy={pC.y} r="5" fill="#1d4ed8" />
        <text x={pC.x} y={pC.y - 10} textAnchor="middle" className="text-[11px] font-bold font-mono fill-blue-700 dark:fill-blue-400">C</text>

        {/* Side Length Labels */}
        <text x={(pA.x + pB.x) / 2} y={pA.y + 18} textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:text-slate-300">
          c = {sol.c}
        </text>
        <text x={(pA.x + pC.x) / 2 - 12} y={(pA.y + pC.y) / 2} textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:text-slate-300">
          b = {sol.b}
        </text>
        <text x={(pB.x + pC.x) / 2 + 12} y={(pB.y + pC.y) / 2} textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:text-slate-300">
          a = {sol.a}
        </text>
      </svg>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: UNIVERSAL 6-PARAMETER TRIANGLE CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Universal 6-Parameter Triangle Calculator (Sides &amp; Angles)</span>
          <button
            type="button"
            onClick={handleSaveUniv}
            disabled={!activeSolution}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedUniv ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Please provide 3 values including at least one side to the following 6 fields, and click the &quot;Calculate&quot; button. When radians are selected as the angle unit, it can take values such as pi/2, pi/4, etc.
          </p>

          {/* QUICK PRESET CHIPS */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className="text-slate-500 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" /> Presets:
            </span>
            <button
              type="button"
              onClick={() => handleApplyPreset("345")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              3-4-5 Right Triangle
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("equilateral")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Equilateral 60°-60°-60°
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("isosceles")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Isosceles 5-5-8
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("306090")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              30°-60°-90° Triangle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: 6 PARAMETER INPUT GRID */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  <span>Sides &amp; Angles Inputs</span>
                </h2>
                <div className="flex bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setAngleUnit("deg")}
                    className={`px-2 py-0.5 rounded cursor-pointer ${angleUnit === "deg" ? "bg-blue-600 text-white" : ""}`}
                  >
                    deg (°)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAngleUnit("rad")}
                    className={`px-2 py-0.5 rounded cursor-pointer ${angleUnit === "rad" ? "bg-blue-600 text-white" : ""}`}
                  >
                    rad
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Side a:</label>
                  <input
                    type="text"
                    value={inA}
                    onChange={(e) => setInA(e.target.value)}
                    placeholder="Length a"
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Angle A ({angleUnit}):</label>
                  <input
                    type="text"
                    value={inAngleA}
                    onChange={(e) => setInAngleA(e.target.value)}
                    placeholder={angleUnit === "rad" ? "e.g. pi/3 or 1.047" : "Angle A°"}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Side b:</label>
                  <input
                    type="text"
                    value={inB}
                    onChange={(e) => setInB(e.target.value)}
                    placeholder="Length b"
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Angle B ({angleUnit}):</label>
                  <input
                    type="text"
                    value={inAngleB}
                    onChange={(e) => setInAngleB(e.target.value)}
                    placeholder={angleUnit === "rad" ? "e.g. pi/4 or 0.785" : "Angle B°"}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Side c:</label>
                  <input
                    type="text"
                    value={inC}
                    onChange={(e) => setInC(e.target.value)}
                    placeholder="Length c"
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Angle C ({angleUnit}):</label>
                  <input
                    type="text"
                    value={inAngleC}
                    onChange={(e) => setInAngleC(e.target.value)}
                    placeholder={angleUnit === "rad" ? "e.g. pi/2 or 1.570" : "Angle C°"}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
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

            {/* RIGHT COLUMN: METRIC DASHBOARD & AMBIGUOUS CASE */}
            <div className="md:col-span-7 space-y-4">
              {!univSolveResult.success ? (
                <div className="p-5 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold">
                  {univSolveResult.errorMessage}
                </div>
              ) : activeSolution && (
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                  {/* AMBIGUOUS SSA SOLUTION TABS */}
                  {univSolveResult.isAmbiguous && univSolveResult.solutions.length === 2 && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900 dark:text-amber-300">
                        Ambiguous SSA Case Detected! 2 Valid Triangles Exist:
                      </span>
                      <div className="flex bg-white dark:bg-slate-800 p-1 rounded-lg text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => setSelectedSolutionIndex(0)}
                          className={`px-3 py-1 rounded cursor-pointer ${selectedSolutionIndex === 0 ? "bg-blue-600 text-white" : ""}`}
                        >
                          Solution 1
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedSolutionIndex(1)}
                          className={`px-3 py-1 rounded cursor-pointer ${selectedSolutionIndex === 1 ? "bg-blue-600 text-white" : ""}`}
                        >
                          Solution 2
                        </button>
                      </div>
                    </div>
                  )}

                  {/* HERO RESULT DISPLAY */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          Solved Triangle Metrics
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          {activeSolution.sideType} &amp; {activeSolution.angleType} ({activeSolution.caseType})
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        Area K = {activeSolution.area}
                      </span>
                    </div>

                    {/* SIDES & ANGLES SUMMARY */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold">
                      <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Sides (a, b, c):</span>
                        <span className="font-mono text-slate-900 dark:text-slate-100">
                          {activeSolution.a}, {activeSolution.b}, {activeSolution.c}
                        </span>
                      </div>

                      <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Angles (A, B, C):</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400">
                          {activeSolution.A_deg}°, {activeSolution.B_deg}°, {activeSolution.C_deg}°
                        </span>
                      </div>

                      <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Perimeter P:</span>
                        <span className="font-mono text-slate-900 dark:text-slate-100">
                          {activeSolution.perimeter} (s = {activeSolution.semiPerimeter})
                        </span>
                      </div>

                      <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Altitudes (ha, hb, hc):</span>
                        <span className="font-mono text-slate-900 dark:text-slate-100">
                          {activeSolution.ha}, {activeSolution.hb}, {activeSolution.hc}
                        </span>
                      </div>

                      <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Medians (ma, mb, mc):</span>
                        <span className="font-mono text-slate-900 dark:text-slate-100">
                          {activeSolution.ma}, {activeSolution.mb}, {activeSolution.mc}
                        </span>
                      </div>

                      <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Inradius / Circumradius:</span>
                        <span className="font-mono text-slate-900 dark:text-slate-100">
                          r = {activeSolution.inradius}, R = {activeSolution.circumradius}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DYNAMIC SCALE-ACCURATE VECTOR SVG visualizer & DERIVATION TAB */}
          {activeSolution && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Maximize2 className="h-4 w-4" />
                  <span>True-to-Scale Proportional Vector Visualizer</span>
                </h3>

                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold gap-1">
                  <button
                    type="button"
                    onClick={() => setShowIncircle(!showIncircle)}
                    className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                      showIncircle ? "bg-emerald-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    Incircle (r)
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCircumcircle(!showCircumcircle)}
                    className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                      showCircumcircle ? "bg-purple-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    Circumcircle (R)
                  </button>
                </div>
              </div>

              <div className="w-full flex justify-center py-2 overflow-x-auto bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                {renderTriangleSVG(activeSolution)}
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
                <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans text-xs">Step-by-Step Derivation Breakdown:</span>
                <pre className="whitespace-pre-wrap leading-relaxed">{activeSolution.stepText}</pre>
              </div>
            </div>
          )}

          {/* EMBEDDED SAVED UNIVERSAL CALCULATIONS INSIDE CARD 1 */}
          {savedUnivItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Universal Triangle Calculations ({savedUnivItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedUnivItems([]);
                    try { localStorage.removeItem("saved_tri_univ"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedUnivItems.map((item) => {
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
                            const updated = savedUnivItems.filter(i => i.id !== item.id);
                            setSavedUnivItems(updated);
                            try { localStorage.setItem("saved_tri_univ", JSON.stringify(updated)); } catch(e){}
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
                              Complete Solved Metrics:
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
      {/* CARD 2: RIGHT TRIANGLE & PYTHAGOREAN THEOREM SOLVER (a² + b² = c²) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Right Triangle &amp; Pythagorean Theorem Solver (a&sup2; + b&sup2; = c&sup2;)</span>
          <button
            type="button"
            onClick={handleSaveRt}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedRt ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Right Triangle Legs (90° Corner)
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Leg a (Base):
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={rtLegA}
                    onChange={(e) => setRtLegA(parseFloat(e.target.value) || 0.1)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Leg b (Height):
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={rtLegB}
                    onChange={(e) => setRtLegB(parseFloat(e.target.value) || 0.1)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: RIGHT TRIANGLE METRICS */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Calculated Hypotenuse (c = &radic;[a&sup2; + b&sup2;])
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    c = {rtSolveResult.c}
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Area K = {rtSolveResult.area} | Perimeter P = {rtSolveResult.perimeter} | Angle A = {rtSolveResult.angleA}°
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">sin(A)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{rtSolveResult.sinA}</span>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">cos(A)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{rtSolveResult.cosA}</span>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">tan(A)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{rtSolveResult.tanA}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED RIGHT TRIANGLE CALCULATIONS INSIDE CARD 2 */}
          {savedRtItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Right Triangle Calculations ({savedRtItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedRtItems([]);
                    try { localStorage.removeItem("saved_tri_rt"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedRtItems.map((item) => {
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
                            const updated = savedRtItems.filter(i => i.id !== item.id);
                            setSavedRtItems(updated);
                            try { localStorage.setItem("saved_tri_rt", JSON.stringify(updated)); } catch(e){}
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
                              Complete Converted Results:
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
      {/* CARD 3: INRADIUS (r) & CIRCUMRADIUS (R) CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Inradius (r) &amp; Circumradius (R) Calculator</span>
          <button
            type="button"
            onClick={handleSaveCrc}
            disabled={!activeCrcSol}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCrc ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Triangle Side Inputs
              </h2>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Side a:</label>
                  <input
                    type="number"
                    step="any"
                    value={crcSideA}
                    onChange={(e) => setCrcSideA(parseFloat(e.target.value) || 0.1)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Side b:</label>
                  <input
                    type="number"
                    step="any"
                    value={crcSideB}
                    onChange={(e) => setCrcSideB(parseFloat(e.target.value) || 0.1)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Side c:</label>
                  <input
                    type="number"
                    step="any"
                    value={crcSideC}
                    onChange={(e) => setCrcSideC(parseFloat(e.target.value) || 0.1)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CIRCLE METRICS */}
            <div className="md:col-span-7 space-y-4">
              {activeCrcSol && (
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Calculated Radius Metrics
                    </span>
                    <div className="grid grid-cols-2 gap-3 text-sm font-mono font-extrabold">
                      <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <span className="text-[10px] text-emerald-800 dark:text-emerald-300 uppercase block">Inradius (r = Area/s)</span>
                        r = {activeCrcSol.inradius}
                      </div>

                      <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800">
                        <span className="text-[10px] text-purple-800 dark:text-purple-300 uppercase block">Circumradius (R = abc/4K)</span>
                        R = {activeCrcSol.circumradius}
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex justify-center py-2 overflow-x-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    {renderTriangleSVG(activeCrcSol, true)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* EMBEDDED SAVED CIRCLE CALCULATIONS INSIDE CARD 3 */}
          {savedCrcItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Circle Metric Calculations ({savedCrcItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCrcItems([]);
                    try { localStorage.removeItem("saved_tri_crc"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedCrcItems.map((item) => {
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
                            const updated = savedCrcItems.filter(i => i.id !== item.id);
                            setSavedCrcItems(updated);
                            try { localStorage.setItem("saved_tri_crc", JSON.stringify(updated)); } catch(e){}
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
                              Complete Converted Results:
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
      {/* CARD 4: HERON'S FORMULA & ALTITUDE / MEDIAN SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Heron&apos;s Formula &amp; Altitudes / Medians Suite</span>
          <button
            type="button"
            onClick={handleSaveHeron}
            disabled={!activeHeronSol}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedHeron ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Sides Input
              </h2>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Side a:</label>
                  <input
                    type="number"
                    step="any"
                    value={heronA}
                    onChange={(e) => setHeronA(parseFloat(e.target.value) || 0.1)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Side b:</label>
                  <input
                    type="number"
                    step="any"
                    value={heronB}
                    onChange={(e) => setHeronB(parseFloat(e.target.value) || 0.1)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Side c:</label>
                  <input
                    type="number"
                    step="any"
                    value={heronC}
                    onChange={(e) => setHeronC(parseFloat(e.target.value) || 0.1)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERON OUTPUTS */}
            <div className="md:col-span-7 space-y-4">
              {activeHeronSol && (
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Area via Heron&apos;s Formula: &radic;[s(s-a)(s-b)(s-c)]
                    </span>
                    <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                      Area K = {activeHeronSol.area}
                    </div>
                    <p className="text-xs font-mono font-bold text-slate-500">
                      Semi-perimeter s = {activeHeronSol.semiPerimeter} | Perimeter P = {activeHeronSol.perimeter}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono font-bold">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 block uppercase font-sans">Altitudes (ha, hb, hc)</span>
                      ha = {activeHeronSol.ha}<br />
                      hb = {activeHeronSol.hb}<br />
                      hc = {activeHeronSol.hc}
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 block uppercase font-sans">Medians (ma, mb, mc)</span>
                      ma = {activeHeronSol.ma}<br />
                      mb = {activeHeronSol.mb}<br />
                      mc = {activeHeronSol.mc}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* EMBEDDED SAVED HERON CALCULATIONS INSIDE CARD 4 */}
          {savedHeronItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Heron Calculations ({savedHeronItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedHeronItems([]);
                    try { localStorage.removeItem("saved_tri_heron"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedHeronItems.map((item) => {
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
                            const updated = savedHeronItems.filter(i => i.id !== item.id);
                            setSavedHeronItems(updated);
                            try { localStorage.setItem("saved_tri_heron", JSON.stringify(updated)); } catch(e){}
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
                              Complete Converted Results:
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

export default TriangleCalculator;
