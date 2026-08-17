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
  Box,
  Droplet,
  Maximize2
} from "lucide-react";
import {
  computeSphereVolume,
  computeConeVolume,
  computeCylinderVolume,
  computeCubeVolume,
  computePrismVolume,
  computeCapsuleVolume,
  computeSphericalCapVolume,
  computeFrustumVolume,
  computeEllipsoidVolume,
  computePyramidVolume,
  computeTubeVolume,
  convertVolumeFromCubicMeters,
  toMeters,
  ShapeVolumeResult
} from "@/app/calculators/volume-calculator/volume-logic";

export interface SavedVolumeItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

type LengthUnit = "m" | "cm" | "mm" | "ft" | "in" | "yd";

export function VolumeCalculator() {
  // Card 1 Inputs: Universal Shape Solver
  const [uShape, setUShape] = useState<"cylinder" | "sphere" | "cone" | "cube" | "prism">("cylinder");
  const [uDim1, setUDim1] = useState<number>(5); // r or l or a
  const [uDim2, setUDim2] = useState<number>(10); // h or w
  const [uDim3, setUDim3] = useState<number>(4); // h for prism
  const [uUnit, setUUnit] = useState<LengthUnit>("m");
  const [precision1, setPrecision1] = useState<number>(4);

  // Card 2 Inputs: Rectangular Tank & Capacity
  const [tankL, setTankL] = useState<number>(10);
  const [tankW, setTankW] = useState<number>(6);
  const [tankH, setTankH] = useState<number>(4);
  const [tankFill, setTankFill] = useState<number>(3);
  const [tankUnit, setTankUnit] = useState<LengthUnit>("ft");

  // Card 3 Inputs: Sphere, Cap & Ellipsoid
  const [sphMode, setSphMode] = useState<"sphere" | "cap" | "ellipsoid">("sphere");
  const [sphR, setSphR] = useState<number>(4);
  const [capBaseR, setCapBaseR] = useState<number>(3);
  const [capBallR, setCapBallR] = useState<number>(5);
  const [capH, setCapH] = useState<number>(2);
  const [ellA, setEllA] = useState<number>(3);
  const [ellB, setEllB] = useState<number>(4);
  const [ellC, setEllC] = useState<number>(5);
  const [sphUnit, setSphUnit] = useState<LengthUnit>("m");

  // Card 4 Inputs: Cone, Frustum & Pyramid
  const [coneMode, setConeMode] = useState<"cone" | "frustum" | "pyramid">("cone");
  const [cnR, setCnR] = useState<number>(5);
  const [cnH, setCnH] = useState<number>(12);
  const [frustTopR, setFrustTopR] = useState<number>(3);
  const [frustBotR, setFrustBotR] = useState<number>(6);
  const [frustH, setFrustH] = useState<number>(8);
  const [pyrA, setPyrA] = useState<number>(6);
  const [pyrH, setPyrH] = useState<number>(9);
  const [coneUnit, setConeUnit] = useState<LengthUnit>("m");

  // Card 5 Inputs: Cylinder, Tube & Capsule
  const [cylMode, setCylMode] = useState<"cylinder" | "tube" | "capsule">("cylinder");
  const [cyR, setCyR] = useState<number>(4);
  const [cyH, setCyH] = useState<number>(10);
  const [tbD1, setTbD1] = useState<number>(10);
  const [tbD2, setTbD2] = useState<number>(8);
  const [tbL, setTbL] = useState<number>(20);
  const [capR2, setCapR2] = useState<number>(3);
  const [capH2, setCapH2] = useState<number>(8);
  const [cylUnit, setCylUnit] = useState<LengthUnit>("m");

  // Card 6 Inputs: Converter Matrix
  const [convVal, setConvVal] = useState<number>(1);
  const [convUnit, setConvUnit] = useState<LengthUnit>("m");

  // Saved calculation states
  const [savedUnivItems, setSavedUnivItems] = useState<SavedVolumeItem[]>([]);
  const [justSavedUniv, setJustSavedUniv] = useState<boolean>(false);

  const [savedTankItems, setSavedTankItems] = useState<SavedVolumeItem[]>([]);
  const [justSavedTank, setJustSavedTank] = useState<boolean>(false);

  const [savedSphItems, setSavedSphItems] = useState<SavedVolumeItem[]>([]);
  const [justSavedSph, setJustSavedSph] = useState<boolean>(false);

  const [savedConeItems, setSavedConeItems] = useState<SavedVolumeItem[]>([]);
  const [justSavedCone, setJustSavedCone] = useState<boolean>(false);

  const [savedCylItems, setSavedCylItems] = useState<SavedVolumeItem[]>([]);
  const [justSavedCyl, setJustSavedCyl] = useState<boolean>(false);

  const [savedConvItems, setSavedConvItems] = useState<SavedVolumeItem[]>([]);
  const [justSavedConv, setJustSavedConv] = useState<boolean>(false);

  // Expand state
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_vol_univ"); if (s1) setSavedUnivItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_vol_tank"); if (s2) setSavedTankItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_vol_sph"); if (s3) setSavedSphItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_vol_cone"); if (s4) setSavedConeItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_vol_cyl"); if (s5) setSavedCylItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_vol_conv"); if (s6) setSavedConvItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Card 1 Calculations (Universal Shape)
  const univResult: ShapeVolumeResult = useMemo(() => {
    switch (uShape) {
      case "sphere": return computeSphereVolume(uDim1, uUnit, precision1);
      case "cone": return computeConeVolume(uDim1, uDim2, uUnit, precision1);
      case "cube": return computeCubeVolume(uDim1, uUnit, precision1);
      case "prism": return computePrismVolume(uDim1, uDim2, uDim3, undefined, uUnit, precision1);
      default: return computeCylinderVolume(uDim1, uDim2, uUnit, precision1);
    }
  }, [uShape, uDim1, uDim2, uDim3, uUnit, precision1]);

  // Card 2 Calculations (Tank & Capacity)
  const tankResult = useMemo(() => {
    return computePrismVolume(tankL, tankW, tankH, tankFill, tankUnit, precision1);
  }, [tankL, tankW, tankH, tankFill, tankUnit, precision1]);

  // Card 3 Calculations (Sphere/Cap/Ellipsoid)
  const sphResult: ShapeVolumeResult = useMemo(() => {
    if (sphMode === "cap") return computeSphericalCapVolume(capBaseR, capBallR, capH, sphUnit, precision1);
    if (sphMode === "ellipsoid") return computeEllipsoidVolume(ellA, ellB, ellC, sphUnit, precision1);
    return computeSphereVolume(sphR, sphUnit, precision1);
  }, [sphMode, sphR, capBaseR, capBallR, capH, ellA, ellB, ellC, sphUnit, precision1]);

  // Card 4 Calculations (Cone/Frustum/Pyramid)
  const coneResult: ShapeVolumeResult = useMemo(() => {
    if (coneMode === "frustum") return computeFrustumVolume(frustTopR, frustBotR, frustH, coneUnit, precision1);
    if (coneMode === "pyramid") return computePyramidVolume(pyrA, pyrH, coneUnit, precision1);
    return computeConeVolume(cnR, cnH, coneUnit, precision1);
  }, [coneMode, cnR, cnH, frustTopR, frustBotR, frustH, pyrA, pyrH, coneUnit, precision1]);

  // Card 5 Calculations (Cylinder/Tube/Capsule)
  const cylResult: ShapeVolumeResult = useMemo(() => {
    if (cylMode === "tube") return computeTubeVolume(tbD1, tbD2, tbL, cylUnit, precision1);
    if (cylMode === "capsule") return computeCapsuleVolume(capR2, capH2, cylUnit, precision1);
    return computeCylinderVolume(cyR, cyH, cylUnit, precision1);
  }, [cylMode, cyR, cyH, tbD1, tbD2, tbL, capR2, capH2, cylUnit, precision1]);

  // Card 6 Calculations (Master Converter)
  const convMatrix = useMemo(() => {
    const valM = toMeters(convVal, convUnit);
    const vM3 = Math.pow(valM, 3);
    return convertVolumeFromCubicMeters(vM3, precision1);
  }, [convVal, convUnit, precision1]);

  // Quick Preset Handlers
  const handleApplyPreset = (preset: "soda" | "beach" | "cube" | "pool") => {
    if (preset === "soda") {
      setUShape("cylinder"); setUDim1(3.3); setUDim2(12.2); setUUnit("cm");
    } else if (preset === "beach") {
      setUShape("sphere"); setUDim1(1.5); setUUnit("ft");
    } else if (preset === "cube") {
      setUShape("cube"); setUDim1(12); setUUnit("in");
    } else if (preset === "pool") {
      setUShape("prism"); setUDim1(25); setUDim2(10); setUDim3(2); setUUnit("m");
    }
  };

  // Save Handlers
  const handleSaveUniv = () => {
    const inputsStr = `${univResult.shapeName} (${uUnit})`;
    const opStr = `Universal Volume Calculation`;
    const resList = [
      `Volume = ${univResult.volume} ${uUnit}³`,
      `Surface Area = ${univResult.surfaceArea || "N/A"} ${uUnit}²`,
      `Capacity = ${univResult.conversions.liters} Liters = ${univResult.conversions.usGallons} US Gallons`
    ];

    const newItem: SavedVolumeItem = {
      id: Date.now().toString(),
      title: `${univResult.shapeName} Volume = ${univResult.volume} ${uUnit}³`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `V = ${univResult.volume} ${uUnit}³`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedUnivItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedUnivItems(updated);
    try { localStorage.setItem("saved_vol_univ", JSON.stringify(updated)); } catch (e) {}
    setJustSavedUniv(true);
    setTimeout(() => setJustSavedUniv(false), 2000);
  };

  const handleSaveTank = () => {
    const inputsStr = `Tank ${tankL}×${tankW}×${tankH} ${tankUnit} (Fill=${tankFill})`;
    const opStr = `Tank Liquid Capacity`;
    const resList = [
      `Total Volume = ${tankResult.volume} ${tankUnit}³`,
      `Filled Liquid = ${tankResult.filledVolume || tankResult.volume} ${tankUnit}³`,
      `Capacity = ${tankResult.capacityLiters} Liters (${tankResult.capacityUsGallons} US Gallons)`
    ];

    const newItem: SavedVolumeItem = {
      id: Date.now().toString(),
      title: `Tank Capacity = ${tankResult.capacityLiters} Liters`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${tankResult.capacityLiters} L`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedTankItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedTankItems(updated);
    try { localStorage.setItem("saved_vol_tank", JSON.stringify(updated)); } catch (e) {}
    setJustSavedTank(true);
    setTimeout(() => setJustSavedTank(false), 2000);
  };

  const handleSaveSph = () => {
    const inputsStr = `${sphResult.shapeName} (${sphUnit})`;
    const resList = [
      `Volume = ${sphResult.volume} ${sphUnit}³`,
      `Surface Area = ${sphResult.surfaceArea || "N/A"}`
    ];
    const newItem: SavedVolumeItem = {
      id: Date.now().toString(),
      title: `${sphResult.shapeName} V = ${sphResult.volume} ${sphUnit}³`,
      inputs: inputsStr,
      operation: `Sphere Suite`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedSphItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedSphItems(updated);
    try { localStorage.setItem("saved_vol_sph", JSON.stringify(updated)); } catch (e) {}
    setJustSavedSph(true); setTimeout(() => setJustSavedSph(false), 2000);
  };

  const handleSaveCone = () => {
    const inputsStr = `${coneResult.shapeName} (${coneUnit})`;
    const resList = [
      `Volume = ${coneResult.volume} ${coneUnit}³`,
      `Slant Height = ${coneResult.slantHeight || "N/A"}`,
      `Surface Area = ${coneResult.surfaceArea || "N/A"}`
    ];
    const newItem: SavedVolumeItem = {
      id: Date.now().toString(),
      title: `${coneResult.shapeName} V = ${coneResult.volume} ${coneUnit}³`,
      inputs: inputsStr,
      operation: `Cone Suite`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConeItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedConeItems(updated);
    try { localStorage.setItem("saved_vol_cone", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCone(true); setTimeout(() => setJustSavedCone(false), 2000);
  };

  const handleSaveCyl = () => {
    const inputsStr = `${cylResult.shapeName} (${cylUnit})`;
    const resList = [
      `Volume = ${cylResult.volume} ${cylUnit}³`,
      `Surface Area = ${cylResult.surfaceArea || "N/A"}`
    ];
    const newItem: SavedVolumeItem = {
      id: Date.now().toString(),
      title: `${cylResult.shapeName} V = ${cylResult.volume} ${cylUnit}³`,
      inputs: inputsStr,
      operation: `Cylinder Suite`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedCylItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedCylItems(updated);
    try { localStorage.setItem("saved_vol_cyl", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCyl(true); setTimeout(() => setJustSavedCyl(false), 2000);
  };

  const handleSaveConv = () => {
    const inputsStr = `1 ${convUnit}³`;
    const resList = [
      `${convMatrix.liters} Liters`,
      `${convMatrix.usGallons} US Gallons`,
      `${convMatrix.cubicFeet} Cubic Feet`
    ];
    const newItem: SavedVolumeItem = {
      id: Date.now().toString(),
      title: `Converted 1 ${convUnit}³ = ${convMatrix.liters} L`,
      inputs: inputsStr,
      operation: `Master Volume Conversion`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConvItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedConvItems(updated);
    try { localStorage.setItem("saved_vol_conv", JSON.stringify(updated)); } catch (e) {}
    setJustSavedConv(true); setTimeout(() => setJustSavedConv(false), 2000);
  };

  // Render Interactive 3D SVG Shape Visualizer Helper with Notation
  const renderShapeSVG = (shape: string) => {
    const w = 220; const h = 160;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-52 h-40">
        <rect width={w} height={h} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />

        {/* 1. SPHERE */}
        {(shape === "Sphere" || shape === "Standard Sphere") && (
          <g>
            <circle cx="110" cy="80" r="55" fill="#3b82f6" fillOpacity="0.25" stroke="#1d4ed8" strokeWidth="2.5" />
            <ellipse cx="110" cy="80" rx="55" ry="18" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="110" y1="80" x2="165" y2="80" stroke="#dc2626" strokeWidth="2" />
            <circle cx="110" cy="80" r="3" fill="#1d4ed8" />
            <text x="138" y="74" textAnchor="middle" className="text-[11px] font-mono font-bold fill-red-600 dark:fill-red-400">r</text>
          </g>
        )}

        {/* 2. CONE */}
        {(shape === "Cone" || shape === "Standard Cone") && (
          <g>
            <path d="M 110 25 L 165 125 L 55 125 Z" fill="#3b82f6" fillOpacity="0.25" stroke="#1d4ed8" strokeWidth="2.5" />
            <ellipse cx="110" cy="125" rx="55" ry="15" fill="#93c5fd" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="1.5" />
            <line x1="110" y1="25" x2="110" y2="125" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="100" y="75" className="text-[11px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
            <line x1="110" y1="125" x2="165" y2="125" stroke="#16a34a" strokeWidth="2" />
            <text x="138" y="120" className="text-[11px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">r</text>
          </g>
        )}

        {/* 3. CYLINDER */}
        {(shape === "Cylinder" || shape === "Solid Cylinder") && (
          <g>
            <rect x="55" y="40" width="110" height="80" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <ellipse cx="110" cy="40" rx="55" ry="15" fill="#93c5fd" fillOpacity="0.4" stroke="#1d4ed8" strokeWidth="2" />
            <ellipse cx="110" cy="120" rx="55" ry="15" fill="#93c5fd" fillOpacity="0.4" stroke="#1d4ed8" strokeWidth="2" />
            <line x1="110" y1="40" x2="165" y2="40" stroke="#16a34a" strokeWidth="2" />
            <text x="138" y="34" className="text-[11px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">r</text>
            <line x1="165" y1="40" x2="165" y2="120" stroke="#dc2626" strokeWidth="2" />
            <text x="173" y="85" className="text-[11px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
          </g>
        )}

        {/* 4. CUBE */}
        {shape === "Cube" && (
          <g>
            <rect x="65" y="55" width="70" height="70" fill="#3b82f6" fillOpacity="0.25" stroke="#1d4ed8" strokeWidth="2.5" />
            <path d="M 65 55 L 95 30 L 165 30 L 135 55 Z" fill="#60a5fa" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
            <path d="M 135 55 L 165 30 L 165 100 L 135 125 Z" fill="#2563eb" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
            <text x="100" y="142" textAnchor="middle" className="text-[11px] font-mono font-bold fill-blue-700 dark:fill-blue-300">edge (a)</text>
          </g>
        )}

        {/* 5. RECTANGULAR PRISM / TANK */}
        {(shape.includes("Prism") || shape.includes("Tank")) && (
          <g>
            <rect x="45" y="55" width="100" height="65" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <path d="M 45 55 L 75 30 L 175 30 L 145 55 Z" fill="#60a5fa" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
            <path d="M 145 55 L 175 30 L 175 95 L 145 120 Z" fill="#2563eb" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
            <text x="95" y="135" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-300">length (l)</text>
            <text x="165" y="112" textAnchor="middle" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">w</text>
            <text x="183" y="65" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
          </g>
        )}

        {/* 6. SPHERICAL CAP */}
        {shape === "Spherical Cap" && (
          <g>
            <path d="M 50 100 A 70 70 0 0 1 170 100 Z" fill="#3b82f6" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2.5" />
            <ellipse cx="110" cy="100" rx="60" ry="12" fill="#93c5fd" fillOpacity="0.4" stroke="#1d4ed8" strokeWidth="1.5" />
            <line x1="110" y1="100" x2="170" y2="100" stroke="#16a34a" strokeWidth="2" />
            <text x="140" y="95" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">r</text>
            <line x1="110" y1="30" x2="110" y2="100" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="100" y="65" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
            <line x1="110" y1="130" x2="170" y2="100" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2,2" />
            <text x="145" y="125" className="text-[10px] font-mono font-bold fill-purple-600 dark:fill-purple-400">R</text>
          </g>
        )}

        {/* 7. ELLIPSOID */}
        {shape === "Ellipsoid" && (
          <g>
            <ellipse cx="110" cy="80" rx="70" ry="45" fill="#3b82f6" fillOpacity="0.25" stroke="#1d4ed8" strokeWidth="2.5" />
            <ellipse cx="110" cy="80" rx="70" ry="18" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="110" y1="80" x2="180" y2="80" stroke="#dc2626" strokeWidth="2" />
            <text x="145" y="75" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">a</text>
            <line x1="110" y1="80" x2="110" y2="35" stroke="#16a34a" strokeWidth="2" />
            <text x="100" y="55" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">b</text>
            <line x1="110" y1="80" x2="140" y2="95" stroke="#8b5cf6" strokeWidth="2" />
            <text x="130" y="92" className="text-[10px] font-mono font-bold fill-purple-600 dark:fill-purple-400">c</text>
          </g>
        )}

        {/* 8. CONICAL FRUSTUM */}
        {shape === "Conical Frustum" && (
          <g>
            <path d="M 80 40 L 140 40 L 170 120 L 50 120 Z" fill="#3b82f6" fillOpacity="0.25" stroke="#1d4ed8" strokeWidth="2.5" />
            <ellipse cx="110" cy="40" rx="30" ry="8" fill="#93c5fd" fillOpacity="0.4" stroke="#1d4ed8" strokeWidth="1.5" />
            <ellipse cx="110" cy="120" rx="60" ry="15" fill="#93c5fd" fillOpacity="0.4" stroke="#1d4ed8" strokeWidth="1.5" />
            <line x1="110" y1="40" x2="140" y2="40" stroke="#16a34a" strokeWidth="2" />
            <text x="125" y="35" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">r</text>
            <line x1="110" y1="120" x2="170" y2="120" stroke="#8b5cf6" strokeWidth="2" />
            <text x="140" y="115" className="text-[10px] font-mono font-bold fill-purple-600 dark:fill-purple-400">R</text>
            <line x1="110" y1="40" x2="110" y2="120" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="100" y="80" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
          </g>
        )}

        {/* 9. SQUARE PYRAMID */}
        {shape === "Square Pyramid" && (
          <g>
            <path d="M 110 25 L 165 115 L 55 115 Z" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <path d="M 110 25 L 165 115 L 185 95 L 110 25 Z" fill="#2563eb" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
            <line x1="110" y1="25" x2="110" y2="115" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="100" y="70" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
            <text x="110" y="130" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-300">base (a)</text>
          </g>
        )}

        {/* 10. HOLLOW TUBE / CYLINDER */}
        {(shape.includes("Tube") || shape.includes("Hollow")) && (
          <g>
            <rect x="50" y="40" width="120" height="80" fill="#3b82f6" fillOpacity="0.15" stroke="#1d4ed8" strokeWidth="2.5" />
            <ellipse cx="110" cy="40" rx="60" ry="16" fill="none" stroke="#1d4ed8" strokeWidth="2" />
            <ellipse cx="110" cy="40" rx="40" ry="10" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2,2" />
            <ellipse cx="110" cy="120" rx="60" ry="16" fill="none" stroke="#1d4ed8" strokeWidth="2" />
            <ellipse cx="110" cy="120" rx="40" ry="10" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2,2" />
            <line x1="50" y1="20" x2="170" y2="20" stroke="#1d4ed8" strokeWidth="1.5" />
            <text x="110" y="15" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-300">d1 (outer)</text>
            <line x1="70" y1="30" x2="150" y2="30" stroke="#dc2626" strokeWidth="1.5" />
            <text x="110" y="27" textAnchor="middle" className="text-[9px] font-mono font-bold fill-red-600 dark:fill-red-400">d2</text>
            <text x="178" y="85" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">l</text>
          </g>
        )}

        {/* 11. CAPSULE */}
        {shape === "Capsule" && (
          <g>
            <rect x="60" y="50" width="100" height="60" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <path d="M 60 50 A 30 30 0 0 0 60 110 Z" fill="#60a5fa" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
            <path d="M 160 50 A 30 30 0 0 1 160 110 Z" fill="#60a5fa" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2" />
            <line x1="60" y1="80" x2="160" y2="80" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="110" y="75" textAnchor="middle" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
            <line x1="60" y1="50" x2="60" y2="80" stroke="#16a34a" strokeWidth="2" />
            <text x="52" y="68" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">r</text>
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: UNIVERSAL 3D SHAPE VOLUME ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Universal 3D Shape Volume Engine</span>
          <button
            type="button"
            onClick={handleSaveUniv}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedUniv ? "Saved!" : "Save"}</span>
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
              onClick={() => handleApplyPreset("soda")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Standard Soda Can
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("beach")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Standard Beach Ball
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("cube")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Shipping Box (12 in³)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("pool")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Pool (25m × 10m × 2m)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: SHAPE & DIMENSIONS INPUT */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Box className="h-4 w-4 text-blue-600" />
                  <span>3D Shape Parameters</span>
                </h2>
                <select
                  value={uUnit}
                  onChange={(e) => setUUnit(e.target.value as LengthUnit)}
                  className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded text-xs font-bold text-slate-800 dark:text-slate-200"
                >
                  <option value="m">meters (m)</option>
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                  <option value="ft">feet (ft)</option>
                  <option value="in">inches (in)</option>
                  <option value="yd">yards (yd)</option>
                </select>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Select 3D Shape:</label>
                  <select
                    value={uShape}
                    onChange={(e) => setUShape(e.target.value as any)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-xs"
                  >
                    <option value="cylinder">Cylinder (Radius r, Height h)</option>
                    <option value="sphere">Sphere (Radius r)</option>
                    <option value="cone">Cone (Radius r, Height h)</option>
                    <option value="cube">Cube (Edge Length a)</option>
                    <option value="prism">Rectangular Prism / Tank (l, w, h)</option>
                  </select>
                </div>

                {uShape === "sphere" && (
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Radius (r):</label>
                    <input
                      type="number"
                      step="any"
                      value={uDim1}
                      onChange={(e) => setUDim1(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                )}

                {uShape === "cube" && (
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Edge Length (a):</label>
                    <input
                      type="number"
                      step="any"
                      value={uDim1}
                      onChange={(e) => setUDim1(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                )}

                {(uShape === "cylinder" || uShape === "cone") && (
                  <>
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Base Radius (r):</label>
                      <input
                        type="number"
                        step="any"
                        value={uDim1}
                        onChange={(e) => setUDim1(parseFloat(e.target.value) || 0.1)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Height (h):</label>
                      <input
                        type="number"
                        step="any"
                        value={uDim2}
                        onChange={(e) => setUDim2(parseFloat(e.target.value) || 0.1)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>
                  </>
                )}

                {uShape === "prism" && (
                  <>
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Length (l):</label>
                      <input
                        type="number"
                        step="any"
                        value={uDim1}
                        onChange={(e) => setUDim1(parseFloat(e.target.value) || 0.1)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Width (w):</label>
                      <input
                        type="number"
                        step="any"
                        value={uDim2}
                        onChange={(e) => setUDim2(parseFloat(e.target.value) || 0.1)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Height (h):</label>
                      <input
                        type="number"
                        step="any"
                        value={uDim3}
                        onChange={(e) => setUDim3(parseFloat(e.target.value) || 0.1)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>
                  </>
                )}

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

            {/* RIGHT COLUMN: VOLUME RESULTS DASHBOARD & SVG */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Calculated {univResult.shapeName} Volume
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                      {univResult.formula}
                    </span>
                  </div>

                  <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-slate-100 break-all">
                    {univResult.volume} <span className="text-lg text-blue-600">{uUnit}³</span>
                  </div>

                  {univResult.surfaceArea && (
                    <p className="text-xs font-mono font-bold text-slate-500">
                      Total Surface Area A = {univResult.surfaceArea} {uUnit}²
                      {univResult.slantHeight && ` | Slant Height s = ${univResult.slantHeight} ${uUnit}`}
                    </p>
                  )}
                </div>

                {/* CAPACITY & CONVERSIONS SUMMARY */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Liters</span>
                    <span className="text-slate-900 dark:text-slate-100">{univResult.conversions.liters} L</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">US Gallons</span>
                    <span className="text-blue-600 dark:text-blue-400">{univResult.conversions.usGallons} gal</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Cubic Feet</span>
                    <span className="text-slate-900 dark:text-slate-100">{univResult.conversions.cubicFeet} ft³</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Cubic Inches</span>
                    <span className="text-slate-900 dark:text-slate-100">{univResult.conversions.cubicInches} in³</span>
                  </div>
                </div>

                {/* 3D VECTOR SVG VISUALIZER WITH NOTATION */}
                <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  {renderShapeSVG(univResult.shapeName)}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED CALCULATIONS INSIDE CARD 1 */}
          {savedUnivItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Universal Volume Calculations ({savedUnivItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedUnivItems([]);
                    try { localStorage.removeItem("saved_vol_univ"); } catch(e){}
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
                            try { localStorage.setItem("saved_vol_univ", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 2: RECTANGULAR TANK & LIQUID CAPACITY CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Rectangular Tank &amp; Liquid Capacity Calculator</span>
          <button
            type="button"
            onClick={handleSaveTank}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedTank ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-blue-600" />
                  <span>Tank Dimensions</span>
                </h2>
                <select
                  value={tankUnit}
                  onChange={(e) => setTankUnit(e.target.value as LengthUnit)}
                  className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded text-xs font-bold"
                >
                  <option value="ft">feet (ft)</option>
                  <option value="m">meters (m)</option>
                  <option value="cm">cm</option>
                  <option value="in">inches (in)</option>
                </select>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Length (l):</label>
                  <input
                    type="number"
                    step="any"
                    value={tankL}
                    onChange={(e) => setTankL(parseFloat(e.target.value) || 0.1)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Width (w):</label>
                  <input
                    type="number"
                    step="any"
                    value={tankW}
                    onChange={(e) => setTankW(parseFloat(e.target.value) || 0.1)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Total Height (h):</label>
                  <input
                    type="number"
                    step="any"
                    value={tankH}
                    onChange={(e) => setTankH(parseFloat(e.target.value) || 0.1)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Liquid Fill Depth (d):</label>
                  <input
                    type="number"
                    step="any"
                    value={tankFill}
                    onChange={(e) => setTankFill(parseFloat(e.target.value) || 0)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: TANK OUTPUTS & DIAGRAM */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Liquid Storage Capacity
                  </span>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100 break-all">
                    {tankResult.capacityLiters} <span className="text-lg text-blue-600">Liters</span>
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    {tankResult.capacityUsGallons} US Gallons | Total Tank Volume = {tankResult.volume} {tankUnit}³
                  </p>
                </div>

                {tankResult.filledVolume !== undefined && (
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
                      <span className="text-[10px] text-blue-800 dark:text-blue-300 block uppercase">Filled Liquid Volume</span>
                      {tankResult.filledVolume} {tankUnit}³
                    </div>

                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] text-slate-500 block uppercase">Remaining Air Volume</span>
                      {tankResult.emptyVolume} {tankUnit}³
                    </div>
                  </div>
                )}

                <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  {renderShapeSVG("Rectangular Tank")}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED TANK CALCULATIONS INSIDE CARD 2 */}
          {savedTankItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Tank Calculations ({savedTankItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedTankItems([]);
                    try { localStorage.removeItem("saved_vol_tank"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedTankItems.map((item) => {
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
                            const updated = savedTankItems.filter(i => i.id !== item.id);
                            setSavedTankItems(updated);
                            try { localStorage.setItem("saved_vol_tank", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 3: SPHERE, SPHERICAL CAP & ELLIPSOID SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Sphere, Spherical Cap &amp; Ellipsoid Suite</span>
          <button
            type="button"
            onClick={handleSaveSph}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSph ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold w-fit">
            <button
              type="button"
              onClick={() => setSphMode("sphere")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${sphMode === "sphere" ? "bg-blue-600 text-white" : ""}`}
            >
              Standard Sphere
            </button>
            <button
              type="button"
              onClick={() => setSphMode("cap")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${sphMode === "cap" ? "bg-blue-600 text-white" : ""}`}
            >
              Spherical Cap
            </button>
            <button
              type="button"
              onClick={() => setSphMode("ellipsoid")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${sphMode === "ellipsoid" ? "bg-blue-600 text-white" : ""}`}
            >
              Ellipsoid
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              {sphMode === "sphere" && (
                <div>
                  <label className="block font-bold mb-1">Radius (r):</label>
                  <input
                    type="number"
                    step="any"
                    value={sphR}
                    onChange={(e) => setSphR(parseFloat(e.target.value) || 0.1)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
              )}

              {sphMode === "cap" && (
                <>
                  <div>
                    <label className="block font-bold mb-1">Base Radius (r):</label>
                    <input
                      type="number"
                      step="any"
                      value={capBaseR}
                      onChange={(e) => setCapBaseR(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Ball Radius (R) (optional):</label>
                    <input
                      type="number"
                      step="any"
                      value={capBallR}
                      onChange={(e) => setCapBallR(parseFloat(e.target.value) || 0)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Cap Height (h):</label>
                    <input
                      type="number"
                      step="any"
                      value={capH}
                      onChange={(e) => setCapH(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              )}

              {sphMode === "ellipsoid" && (
                <>
                  <div>
                    <label className="block font-bold mb-1">Semi-axis a:</label>
                    <input
                      type="number"
                      step="any"
                      value={ellA}
                      onChange={(e) => setEllA(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Semi-axis b:</label>
                    <input
                      type="number"
                      step="any"
                      value={ellB}
                      onChange={(e) => setEllB(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Semi-axis c:</label>
                    <input
                      type="number"
                      step="any"
                      value={ellC}
                      onChange={(e) => setEllC(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">{sphResult.shapeName} Results</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {sphResult.volume} <span className="text-base text-blue-600">{sphUnit}³</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Surface Area = {sphResult.surfaceArea || "N/A"} {sphUnit}²
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderShapeSVG(sphResult.shapeName)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: CONE, CONICAL FRUSTUM & PYRAMID SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Cone, Conical Frustum &amp; Pyramid Suite</span>
          <button
            type="button"
            onClick={handleSaveCone}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCone ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold w-fit">
            <button
              type="button"
              onClick={() => setConeMode("cone")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${coneMode === "cone" ? "bg-blue-600 text-white" : ""}`}
            >
              Standard Cone
            </button>
            <button
              type="button"
              onClick={() => setConeMode("frustum")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${coneMode === "frustum" ? "bg-blue-600 text-white" : ""}`}
            >
              Conical Frustum
            </button>
            <button
              type="button"
              onClick={() => setConeMode("pyramid")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${coneMode === "pyramid" ? "bg-blue-600 text-white" : ""}`}
            >
              Square Pyramid
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              {coneMode === "cone" && (
                <>
                  <div>
                    <label className="block font-bold mb-1">Base Radius (r):</label>
                    <input
                      type="number"
                      step="any"
                      value={cnR}
                      onChange={(e) => setCnR(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Height (h):</label>
                    <input
                      type="number"
                      step="any"
                      value={cnH}
                      onChange={(e) => setCnH(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              )}

              {coneMode === "frustum" && (
                <>
                  <div>
                    <label className="block font-bold mb-1">Top Radius (r):</label>
                    <input
                      type="number"
                      step="any"
                      value={frustTopR}
                      onChange={(e) => setFrustTopR(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Bottom Radius (R):</label>
                    <input
                      type="number"
                      step="any"
                      value={frustBotR}
                      onChange={(e) => setFrustBotR(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Height (h):</label>
                    <input
                      type="number"
                      step="any"
                      value={frustH}
                      onChange={(e) => setFrustH(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              )}

              {coneMode === "pyramid" && (
                <>
                  <div>
                    <label className="block font-bold mb-1">Base Edge (a):</label>
                    <input
                      type="number"
                      step="any"
                      value={pyrA}
                      onChange={(e) => setPyrA(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Height (h):</label>
                    <input
                      type="number"
                      step="any"
                      value={pyrH}
                      onChange={(e) => setPyrH(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">{coneResult.shapeName} Results</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {coneResult.volume} <span className="text-base text-blue-600">{coneUnit}³</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Slant Height = {coneResult.slantHeight || "N/A"} | Surface Area = {coneResult.surfaceArea || "N/A"}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderShapeSVG(coneResult.shapeName)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: CYLINDER, TUBE & CAPSULE SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Cylinder, Hollow Tube &amp; Capsule Suite</span>
          <button
            type="button"
            onClick={handleSaveCyl}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCyl ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold w-fit">
            <button
              type="button"
              onClick={() => setCylMode("cylinder")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${cylMode === "cylinder" ? "bg-blue-600 text-white" : ""}`}
            >
              Solid Cylinder
            </button>
            <button
              type="button"
              onClick={() => setCylMode("tube")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${cylMode === "tube" ? "bg-blue-600 text-white" : ""}`}
            >
              Hollow Tube / Pipe
            </button>
            <button
              type="button"
              onClick={() => setCylMode("capsule")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${cylMode === "capsule" ? "bg-blue-600 text-white" : ""}`}
            >
              Capsule
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              {cylMode === "cylinder" && (
                <>
                  <div>
                    <label className="block font-bold mb-1">Radius (r):</label>
                    <input
                      type="number"
                      step="any"
                      value={cyR}
                      onChange={(e) => setCyR(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Height (h):</label>
                    <input
                      type="number"
                      step="any"
                      value={cyH}
                      onChange={(e) => setCyH(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              )}

              {cylMode === "tube" && (
                <>
                  <div>
                    <label className="block font-bold mb-1">Outer Diameter (d1):</label>
                    <input
                      type="number"
                      step="any"
                      value={tbD1}
                      onChange={(e) => setTbD1(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Inner Diameter (d2):</label>
                    <input
                      type="number"
                      step="any"
                      value={tbD2}
                      onChange={(e) => setTbD2(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Length / Height (l):</label>
                    <input
                      type="number"
                      step="any"
                      value={tbL}
                      onChange={(e) => setTbL(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              )}

              {cylMode === "capsule" && (
                <>
                  <div>
                    <label className="block font-bold mb-1">Radius (r):</label>
                    <input
                      type="number"
                      step="any"
                      value={capR2}
                      onChange={(e) => setCapR2(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Cylindrical Height (h):</label>
                    <input
                      type="number"
                      step="any"
                      value={capH2}
                      onChange={(e) => setCapH2(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">{cylResult.shapeName} Results</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {cylResult.volume} <span className="text-base text-blue-600">{cylUnit}³</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Surface Area = {cylResult.surfaceArea || "N/A"}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderShapeSVG(cylResult.shapeName)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 6: MASTER VOLUME UNIT CONVERTER MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Master Volume Unit Converter Matrix</span>
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
              <label className="block text-xs font-bold mb-1">Volume Value:</label>
              <input
                type="number"
                step="any"
                value={convVal}
                onChange={(e) => setConvVal(parseFloat(e.target.value) || 0)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Base Length Unit:</label>
              <select
                value={convUnit}
                onChange={(e) => setConvUnit(e.target.value as LengthUnit)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm"
              >
                <option value="m">cubic meters (m³)</option>
                <option value="cm">cubic centimeters (cm³)</option>
                <option value="mm">cubic millimeters (mm³)</option>
                <option value="ft">cubic feet (ft³)</option>
                <option value="in">cubic inches (in³)</option>
                <option value="yd">cubic yards (yd³)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-blue-600 text-white font-bold">
                  <th className="p-2.5">Volume Unit</th>
                  <th className="p-2.5">Equivalent Converted Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
                <tr><td className="p-2 font-bold font-sans">Cubic Meters (m³)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{convMatrix.cubicMeters}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Liters (L)</td><td className="p-2 font-bold">{convMatrix.liters}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Milliliters (mL / cc)</td><td className="p-2 font-bold">{convMatrix.milliliters}</td></tr>
                <tr><td className="p-2 font-bold font-sans">US Fluid Gallons (gal)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{convMatrix.usGallons}</td></tr>
                <tr><td className="p-2 font-bold font-sans">US Fluid Ounces (fl oz)</td><td className="p-2 font-bold">{convMatrix.usFluidOunces}</td></tr>
                <tr><td className="p-2 font-bold font-sans">UK Imperial Gallons (imp gal)</td><td className="p-2 font-bold">{convMatrix.impGallons}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Cubic Feet (ft³)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{convMatrix.cubicFeet}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Cubic Inches (in³)</td><td className="p-2 font-bold">{convMatrix.cubicInches}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Cubic Yards (yd³)</td><td className="p-2 font-bold">{convMatrix.cubicYards}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VolumeCalculator;
