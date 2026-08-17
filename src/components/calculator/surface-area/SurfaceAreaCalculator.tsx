"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Zap,
  Box,
  Layers,
  Maximize2,
  Compass
} from "lucide-react";
import {
  computeSphereSurfaceArea,
  computeConeSurfaceArea,
  computeCylinderSurfaceArea,
  computeBoxSurfaceArea,
  computePyramidSurfaceArea,
  computeCapsuleSurfaceArea,
  computeEllipsoidSurfaceArea,
  convertSurfaceAreaUnits,
  SphereSAResult,
  ConeSAResult,
  CylinderSAResult,
  BoxSAResult,
  PyramidSAResult,
  CapsuleSAResult,
  EllipsoidSAResult
} from "@/app/calculators/surface-area-calculator/surface-area-logic";

export interface SavedSAItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  timestamp: string;
}

export function SurfaceAreaCalculator() {
  // Card 1: Sphere Inputs
  const [sphereR, setSphereR] = useState<number>(5);

  // Card 2: Cone / Frustum Inputs
  const [coneMode, setConeMode] = useState<"right" | "frustum">("right");
  const [coneR, setConeR] = useState<number>(4);
  const [coneH, setConeH] = useState<number>(10);
  const [frustTopR, setFrustTopR] = useState<number>(2);

  // Card 3: Cylinder / Pipe Inputs
  const [cylMode, setCylMode] = useState<"solid" | "hollow">("solid");
  const [cylR, setCylR] = useState<number>(4);
  const [cylH, setCylH] = useState<number>(10);
  const [pipeInnerR, setPipeInnerR] = useState<number>(2);

  // Card 4: Box / Tank Inputs
  const [boxL, setBoxL] = useState<number>(6);
  const [boxW, setBoxW] = useState<number>(4);
  const [boxH, setBoxH] = useState<number>(5);

  // Card 5: Pyramid / Tetrahedron Inputs
  const [pyrMode, setPyrMode] = useState<"square" | "tetra">("square");
  const [pyrA, setPyrA] = useState<number>(6);
  const [pyrH, setPyrH] = useState<number>(8);

  // Card 6: Capsule Inputs
  const [capR, setCapR] = useState<number>(3);
  const [capH, setCapH] = useState<number>(8);

  // Card 7: Ellipsoid Inputs
  const [ellA, setEllA] = useState<number>(5);
  const [ellB, setEllB] = useState<number>(4);
  const [ellC, setEllC] = useState<number>(3);

  // Card 8: Converter Inputs
  const [convVal, setConvVal] = useState<number>(100);
  const [convUnit, setConvUnit] = useState<"sqMeters" | "sqFeet" | "sqInches" | "sqCm">("sqMeters");

  const [precision1, setPrecision1] = useState<number>(4);

  // Saved calculation states
  const [savedSphereItems, setSavedSphereItems] = useState<SavedSAItem[]>([]);
  const [justSavedSphere, setJustSavedSphere] = useState<boolean>(false);

  const [savedConeItems, setSavedConeItems] = useState<SavedSAItem[]>([]);
  const [justSavedCone, setJustSavedCone] = useState<boolean>(false);

  const [savedCylItems, setSavedCylItems] = useState<SavedSAItem[]>([]);
  const [justSavedCyl, setJustSavedCyl] = useState<boolean>(false);

  const [savedBoxItems, setSavedBoxItems] = useState<SavedSAItem[]>([]);
  const [justSavedBox, setJustSavedBox] = useState<boolean>(false);

  const [savedPyrItems, setSavedPyrItems] = useState<SavedSAItem[]>([]);
  const [justSavedPyr, setJustSavedPyr] = useState<boolean>(false);

  const [savedCapItems, setSavedCapItems] = useState<SavedSAItem[]>([]);
  const [justSavedCap, setJustSavedCap] = useState<boolean>(false);

  const [savedEllItems, setSavedEllItems] = useState<SavedSAItem[]>([]);
  const [justSavedEll, setJustSavedEll] = useState<boolean>(false);

  const [savedConvItems, setSavedConvItems] = useState<SavedSAItem[]>([]);
  const [justSavedConv, setJustSavedConv] = useState<boolean>(false);

  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_sa_sphere"); if (s1) setSavedSphereItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_sa_cone"); if (s2) setSavedConeItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_sa_cyl"); if (s3) setSavedCylItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_sa_box"); if (s4) setSavedBoxItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_sa_pyr"); if (s5) setSavedPyrItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_sa_cap"); if (s6) setSavedCapItems(JSON.parse(s6));
      const s7 = localStorage.getItem("saved_sa_ell"); if (s7) setSavedEllItems(JSON.parse(s7));
      const s8 = localStorage.getItem("saved_sa_conv"); if (s8) setSavedConvItems(JSON.parse(s8));
    } catch (e) {}
  }, []);

  // Card 1 Calculations
  const resultSphere: SphereSAResult = useMemo(() => {
    return computeSphereSurfaceArea(sphereR, precision1);
  }, [sphereR, precision1]);

  // Card 2 Calculations
  const resultCone: ConeSAResult = useMemo(() => {
    return computeConeSurfaceArea(coneR, coneH, coneMode === "frustum", frustTopR, precision1);
  }, [coneR, coneH, coneMode, frustTopR, precision1]);

  // Card 3 Calculations
  const resultCyl: CylinderSAResult = useMemo(() => {
    return computeCylinderSurfaceArea(cylR, cylH, cylMode === "hollow", pipeInnerR, precision1);
  }, [cylR, cylH, cylMode, pipeInnerR, precision1]);

  // Card 4 Calculations
  const resultBox: BoxSAResult = useMemo(() => {
    return computeBoxSurfaceArea(boxL, boxW, boxH, precision1);
  }, [boxL, boxW, boxH, precision1]);

  // Card 5 Calculations
  const resultPyr: PyramidSAResult = useMemo(() => {
    return computePyramidSurfaceArea(pyrA, pyrH, pyrMode === "tetra", precision1);
  }, [pyrA, pyrH, pyrMode, precision1]);

  // Card 6 Calculations
  const resultCap: CapsuleSAResult = useMemo(() => {
    return computeCapsuleSurfaceArea(capR, capH, precision1);
  }, [capR, capH, precision1]);

  // Card 7 Calculations
  const resultEll: EllipsoidSAResult = useMemo(() => {
    return computeEllipsoidSurfaceArea(ellA, ellB, ellC, precision1);
  }, [ellA, ellB, ellC, precision1]);

  // Card 8 Calculations
  const resultConv = useMemo(() => {
    let m2 = convVal;
    if (convUnit === "sqFeet") m2 = convVal * 0.092903;
    else if (convUnit === "sqInches") m2 = convVal * 0.00064516;
    else if (convUnit === "sqCm") m2 = convVal / 10000;
    return convertSurfaceAreaUnits(m2, precision1);
  }, [convVal, convUnit, precision1]);

  // Save Handlers
  const handleSaveSphere = () => {
    const inputsStr = `Radius r = ${sphereR}`;
    const resList = [
      `Total Surface Area A = ${resultSphere.totalArea} (${resultSphere.exactPi})`,
      `Hemisphere Area = ${resultSphere.hemisphereArea}`,
      `Sphere Volume V = ${resultSphere.volume}`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      title: `Sphere SA = ${resultSphere.totalArea}`,
      inputs: inputsStr,
      operation: `Sphere Surface Area`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedSphereItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedSphereItems(updated);
    try { localStorage.setItem("saved_sa_sphere", JSON.stringify(updated)); } catch (e) {}
    setJustSavedSphere(true); setTimeout(() => setJustSavedSphere(false), 2000);
  };

  const handleSaveCone = () => {
    const inputsStr = coneMode === "right" ? `Radius r = ${coneR}, Height h = ${coneH}` : `Bottom R = ${coneR}, Top r = ${frustTopR}, Height h = ${coneH}`;
    const resList = [
      `Total Surface Area A = ${resultCone.totalArea}`,
      `Lateral Area = ${resultCone.lateralArea}`,
      `Base Area = ${resultCone.baseArea}`,
      `Slant Height s = ${resultCone.slantHeight}`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      title: `Cone SA = ${resultCone.totalArea}`,
      inputs: inputsStr,
      operation: `Cone Surface Area`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConeItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedConeItems(updated);
    try { localStorage.setItem("saved_sa_cone", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCone(true); setTimeout(() => setJustSavedCone(false), 2000);
  };

  const handleSaveCyl = () => {
    const inputsStr = cylMode === "solid" ? `Radius r = ${cylR}, Height h = ${cylH}` : `Outer R = ${cylR}, Inner r = ${pipeInnerR}, Height h = ${cylH}`;
    const resList = [
      `Total Surface Area A = ${resultCyl.totalArea}`,
      `Curved Lateral Area = ${resultCyl.lateralArea}`,
      `Bases / End Rings = ${resultCyl.baseArea}`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      title: `Cylinder SA = ${resultCyl.totalArea}`,
      inputs: inputsStr,
      operation: `Cylinder Surface Area`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedCylItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedCylItems(updated);
    try { localStorage.setItem("saved_sa_cyl", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCyl(true); setTimeout(() => setJustSavedCyl(false), 2000);
  };

  const handleSaveBox = () => {
    const inputsStr = `Length l = ${boxL}, Width w = ${boxW}, Height h = ${boxH}`;
    const resList = [
      `Total Surface Area A = ${resultBox.totalArea}`,
      `Open-Top Area = ${resultBox.openTopArea}`,
      `4 Side Walls Area = ${resultBox.lateralArea}`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      title: `Box SA = ${resultBox.totalArea}`,
      inputs: inputsStr,
      operation: `Box Surface Area`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedBoxItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedBoxItems(updated);
    try { localStorage.setItem("saved_sa_box", JSON.stringify(updated)); } catch (e) {}
    setJustSavedBox(true); setTimeout(() => setJustSavedBox(false), 2000);
  };

  const handleSavePyr = () => {
    const inputsStr = pyrMode === "square" ? `Base Edge a = ${pyrA}, Height h = ${pyrH}` : `Tetrahedron Edge a = ${pyrA}`;
    const resList = [
      `Total Surface Area A = ${resultPyr.totalArea}`,
      `Lateral Area = ${resultPyr.lateralArea}`,
      `Base Area = ${resultPyr.baseArea}`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      title: `Pyramid SA = ${resultPyr.totalArea}`,
      inputs: inputsStr,
      operation: `Pyramid Surface Area`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedPyrItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedPyrItems(updated);
    try { localStorage.setItem("saved_sa_pyr", JSON.stringify(updated)); } catch (e) {}
    setJustSavedPyr(true); setTimeout(() => setJustSavedPyr(false), 2000);
  };

  const handleSaveCap = () => {
    const inputsStr = `Radius r = ${capR}, Height h = ${capH}`;
    const resList = [
      `Total Surface Area A = ${resultCap.totalArea}`,
      `Sphere Ends Area = ${resultCap.sphereEndsArea}`,
      `Cylinder Side Area = ${resultCap.cylinderLateralArea}`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      title: `Capsule SA = ${resultCap.totalArea}`,
      inputs: inputsStr,
      operation: `Capsule Surface Area`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedCapItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedCapItems(updated);
    try { localStorage.setItem("saved_sa_cap", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCap(true); setTimeout(() => setJustSavedCap(false), 2000);
  };

  const handleSaveEll = () => {
    const inputsStr = `Semi-axes a = ${ellA}, b = ${ellB}, c = ${ellC}`;
    const resList = [
      `Ellipsoid Area A = ${resultEll.surfaceArea}`,
      `Volume V = ${resultEll.volume}`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      title: `Ellipsoid SA = ${resultEll.surfaceArea}`,
      inputs: inputsStr,
      operation: `Ellipsoid Surface Area`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedEllItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedEllItems(updated);
    try { localStorage.setItem("saved_sa_ell", JSON.stringify(updated)); } catch (e) {}
    setJustSavedEll(true); setTimeout(() => setJustSavedEll(false), 2000);
  };

  const handleSaveConv = () => {
    const inputsStr = `Area = ${convVal} ${convUnit}`;
    const resList = [
      `${resultConv.sqMeters} m²`,
      `${resultConv.sqFeet} ft²`,
      `${resultConv.sqInches} in²`
    ];
    const newItem: SavedSAItem = {
      id: Date.now().toString(),
      title: `Converted Area = ${resultConv.sqMeters} m²`,
      inputs: inputsStr,
      operation: `Surface Area Unit Conversion`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConvItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedConvItems(updated);
    try { localStorage.setItem("saved_sa_conv", JSON.stringify(updated)); } catch (e) {}
    setJustSavedConv(true); setTimeout(() => setJustSavedConv(false), 2000);
  };

  // Render 3D SVG Visualizers
  const renderSphereSVG = () => {
    const width = 240; const height = 180;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        <circle cx="120" cy="90" r="60" fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="2.5" />
        <ellipse cx="120" cy="90" rx="60" ry="20" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
        <circle cx="120" cy="90" r="3" fill="#1d4ed8" />
        <line x1="120" y1="90" x2="180" y2="90" stroke="#dc2626" strokeWidth="2" />
        <text x="145" y="85" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">r</text>
        <text x="120" y="24" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">A = 4πr²</text>
      </svg>
    );
  };

  const renderConeSVG = () => {
    const width = 240; const height = 180;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        <ellipse cx="120" cy="140" rx="55" ry="18" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2" />
        <line x1="65" y1="140" x2="120" y2="35" stroke="#2563eb" strokeWidth="2.5" />
        <line x1="175" y1="140" x2="120" y2="35" stroke="#2563eb" strokeWidth="2.5" />
        <line x1="120" y1="35" x2="120" y2="140" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3,3" />
        <text x="124" y="85" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
        <text x="155" y="80" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">s (slant)</text>
      </svg>
    );
  };

  const renderCylinderSVG = () => {
    const width = 240; const height = 180;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        <ellipse cx="120" cy="40" rx="55" ry="16" fill="#3b82f6" fillOpacity="0.25" stroke="#2563eb" strokeWidth="2" />
        <ellipse cx="120" cy="140" rx="55" ry="16" fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="2" />
        <line x1="65" y1="40" x2="65" y2="140" stroke="#2563eb" strokeWidth="2.5" />
        <line x1="175" y1="40" x2="175" y2="140" stroke="#2563eb" strokeWidth="2.5" />
        <text x="180" y="90" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">h</text>
      </svg>
    );
  };

  const renderBoxSVG = () => {
    const width = 240; const height = 180;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-56 h-44">
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />
        <polygon points="50,130 150,130 190,90 90,90" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2" />
        <polygon points="50,130 50,70 90,30 90,90" fill="#3b82f6" fillOpacity="0.1" stroke="#2563eb" strokeWidth="2" />
        <polygon points="50,70 150,70 190,30 90,30" fill="#3b82f6" fillOpacity="0.25" stroke="#2563eb" strokeWidth="2" />
        <line x1="150" y1="130" x2="150" y2="70" stroke="#2563eb" strokeWidth="2" />
        <line x1="190" y1="90" x2="190" y2="30" stroke="#2563eb" strokeWidth="2" />
        <text x="100" y="145" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">l</text>
        <text x="175" y="115" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">w</text>
        <text x="35" y="100" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">h</text>
      </svg>
    );
  };

  const renderSavedCardsGroup = (
    title: string,
    items: SavedSAItem[],
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
      {/* CARD 1: SPHERE & HEMISPHERE MODULE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Sphere &amp; Hemisphere Surface Area Module</span>
          <button type="button" onClick={handleSaveSphere} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSphere ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div><label className="font-bold block mb-1">Radius (r):</label><input type="number" step="any" value={sphereR} onChange={(e)=>setSphereR(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Total Surface Area (4πr²)</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {resultSphere.totalArea} <span className="text-base text-blue-600">({resultSphere.exactPi})</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Hemisphere SA = {resultSphere.hemisphereArea} | Volume = {resultSphere.volume}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderSphereSVG()}
              </div>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Sphere Calculations", savedSphereItems, ()=>setSavedSphereItems([]), (id)=>setSavedSphereItems(savedSphereItems.filter(i=>i.id!==id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: CONE & CONICAL FRUSTUM MODULE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Cone &amp; Conical Frustum Module</span>
          <button type="button" onClick={handleSaveCone} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCone ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div><label className="font-bold block mb-1">Base Radius (r):</label><input type="number" step="any" value={coneR} onChange={(e)=>setConeR(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              <div><label className="font-bold block mb-1">Height (h):</label><input type="number" step="any" value={coneH} onChange={(e)=>setConeH(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Total Surface Area</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {resultCone.totalArea}
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Lateral Area = {resultCone.lateralArea} | Base Area = {resultCone.baseArea} | Slant s = {resultCone.slantHeight}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderConeSVG()}
              </div>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Cone Calculations", savedConeItems, ()=>setSavedConeItems([]), (id)=>setSavedConeItems(savedConeItems.filter(i=>i.id!==id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: CYLINDER & TUBE / HOLLOW PIPE MODULE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Cylinder &amp; Tube Surface Area Module</span>
          <button type="button" onClick={handleSaveCyl} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCyl ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div><label className="font-bold block mb-1">Radius (r):</label><input type="number" step="any" value={cylR} onChange={(e)=>setCylR(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
              <div><label className="font-bold block mb-1">Height (h):</label><input type="number" step="any" value={cylH} onChange={(e)=>setCylH(parseFloat(e.target.value)||0)} className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"/></div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Total Surface Area (2πr(r+h))</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {resultCyl.totalArea}
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Curved Lateral Area = {resultCyl.lateralArea} | Bases Area = {resultCyl.baseArea}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderCylinderSVG()}
              </div>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Cylinder Calculations", savedCylItems, ()=>setSavedCylItems([]), (id)=>setSavedCylItems(savedCylItems.filter(i=>i.id!==id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: CUBE & RECTANGULAR PRISM / TANK MODULE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Cube &amp; Rectangular Prism Surface Area Module</span>
          <button type="button" onClick={handleSaveBox} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-1.5">
                <div><label className="font-bold block mb-1">Length (l):</label><input type="number" value={boxL} onChange={(e)=>setBoxL(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
                <div><label className="font-bold block mb-1">Width (w):</label><input type="number" value={boxW} onChange={(e)=>setBoxW(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
                <div><label className="font-bold block mb-1">Height (h):</label><input type="number" value={boxH} onChange={(e)=>setBoxH(parseFloat(e.target.value)||0)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"/></div>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">Total Surface Area (2(lw + lh + wh))</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {resultBox.totalArea}
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Open-Top Tank Area = {resultBox.openTopArea} | 4 Side Walls = {resultBox.lateralArea}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderBoxSVG()}
              </div>
            </div>
          </div>

          {renderSavedCardsGroup("Saved Box Calculations", savedBoxItems, ()=>setSavedBoxItems([]), (id)=>setSavedBoxItems(savedBoxItems.filter(i=>i.id!==id)))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 8: MASTER SURFACE AREA UNIT CONVERTER MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Master Surface Area Unit Converter Matrix</span>
          <button type="button" onClick={handleSaveConv} className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer">
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedConv ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold mb-1">Surface Area Value:</label>
              <input type="number" step="any" value={convVal} onChange={(e)=>setConvVal(parseFloat(e.target.value)||0)} className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"/>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Base Unit:</label>
              <select value={convUnit} onChange={(e)=>setConvUnit(e.target.value as any)} className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm">
                <option value="sqMeters">Square Meters (m²)</option>
                <option value="sqFeet">Square Feet (ft²)</option>
                <option value="sqInches">Square Inches (in²)</option>
                <option value="sqCm">Square Centimeters (cm²)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-blue-600 text-white font-bold">
                  <th className="p-2.5">Unit</th>
                  <th className="p-2.5">Converted Surface Area</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
                <tr><td className="p-2 font-bold font-sans">Square Meters (m²)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultConv.sqMeters}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Square Feet (ft²)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{resultConv.sqFeet}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Square Inches (in²)</td><td className="p-2 font-bold">{resultConv.sqInches}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Square Centimeters (cm²)</td><td className="p-2 font-bold">{resultConv.sqCm}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Acres</td><td className="p-2 font-bold">{resultConv.acres}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Hectares</td><td className="p-2 font-bold">{resultConv.hectares}</td></tr>
              </tbody>
            </table>
          </div>

          {renderSavedCardsGroup("Saved Converter Calculations", savedConvItems, ()=>setSavedConvItems([]), (id)=>setSavedConvItems(savedConvItems.filter(i=>i.id!==id)))}
        </div>
      </div>
    </div>
  );
}

export default SurfaceAreaCalculator;
