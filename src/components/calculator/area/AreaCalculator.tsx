"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Zap,
  Square,
  Maximize2,
  Grid,
  Layers,
  DollarSign
} from "lucide-react";
import {
  computeRectangleArea,
  computeTriangleAreaBaseHeight,
  computeTriangleAreaHeron,
  computeCircleArea,
  computeSectorArea,
  computeEllipseArea,
  computeTrapezoidArea,
  computeParallelogramArea,
  computeRhombusArea,
  computeAnnulusArea,
  computeRegularPolygonArea,
  computeShoelacePolygonArea,
  convertAreaFromSquareMeters,
  toSquareMeters,
  AreaResult,
  AreaUnit
} from "@/app/calculators/area-calculator/area-logic";

export interface SavedAreaItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function AreaCalculator() {
  // Card 1 Inputs: Universal 2D Shape Solver
  const [uShape, setUShape] = useState<"rectangle" | "triangle" | "circle" | "trapezoid" | "sector" | "ellipse" | "parallelogram" | "rhombus" | "annulus">("rectangle");
  const [uDim1, setUDim1] = useState<number>(10); // l or b or r or a or R
  const [uDim2, setUDim2] = useState<number>(5);  // w or h or b2 or r
  const [uDim3, setUDim3] = useState<number>(4);  // h for trapezoid or angle
  const [uUnit, setUUnit] = useState<AreaUnit>("m");
  const [precision1, setPrecision1] = useState<number>(4);

  // Card 2 Inputs: Triangle Suite
  const [triMode, setTriMode] = useState<"baseHeight" | "heron">("baseHeight");
  const [triB, setTriB] = useState<number>(10);
  const [triH, setTriH] = useState<number>(6);
  const [triA, setTriA] = useState<number>(7);
  const [triBb, setTriBb] = useState<number>(8);
  const [triCc, setTriCc] = useState<number>(9);
  const [triUnit, setTriUnit] = useState<AreaUnit>("m");

  // Card 3 Inputs: Circle / Sector / Annulus
  const [circMode, setCircMode] = useState<"circle" | "sector" | "annulus">("circle");
  const [circR, setCircR] = useState<number>(5);
  const [secAngle, setSecAngle] = useState<number>(60);
  const [annOuterR, setAnnOuterR] = useState<number>(8);
  const [annInnerR, setAnnInnerR] = useState<number>(5);
  const [circUnit, setCircUnit] = useState<AreaUnit>("m");

  // Card 4 Inputs: Quadrilateral Suite
  const [quadMode, setQuadMode] = useState<"rectangle" | "trapezoid" | "parallelogram" | "rhombus">("rectangle");
  const [qDim1, setQDim1] = useState<number>(12);
  const [qDim2, setQDim2] = useState<number>(8);
  const [qDim3, setQDim3] = useState<number>(6);
  const [quadUnit, setQuadUnit] = useState<AreaUnit>("ft");

  // Card 5 Inputs: Regular Polygon Suite
  const [polyN, setPolyN] = useState<number>(6);
  const [polyS, setPolyS] = useState<number>(5);
  const [polyUnit, setPolyUnit] = useState<AreaUnit>("m");

  // Card 6 Inputs: Irregular Polygon Shoelace Solver
  const [shoeCoords, setShoeCoords] = useState<string>("0,0\n10,0\n10,6\n4,10\n0,6");
  const [shoeUnit, setShoeUnit] = useState<AreaUnit>("m");

  // Card 7 Inputs: Converter Matrix
  const [convVal, setConvVal] = useState<number>(1);
  const [convUnit, setConvUnit] = useState<AreaUnit>("m");

  // Material Cost Estimator State
  const [costPerUnit, setCostPerUnit] = useState<number>(0);
  const [wasteMarginPct, setWasteMarginPct] = useState<number>(10);

  // Saved calculation states
  const [savedUnivItems, setSavedUnivItems] = useState<SavedAreaItem[]>([]);
  const [justSavedUniv, setJustSavedUniv] = useState<boolean>(false);

  const [savedTriItems, setSavedTriItems] = useState<SavedAreaItem[]>([]);
  const [justSavedTri, setJustSavedTri] = useState<boolean>(false);

  const [savedCircItems, setSavedCircItems] = useState<SavedAreaItem[]>([]);
  const [justSavedCirc, setJustSavedCirc] = useState<boolean>(false);

  const [savedQuadItems, setSavedQuadItems] = useState<SavedAreaItem[]>([]);
  const [justSavedQuad, setJustSavedQuad] = useState<boolean>(false);

  const [savedPolyItems, setSavedPolyItems] = useState<SavedAreaItem[]>([]);
  const [justSavedPoly, setJustSavedPoly] = useState<boolean>(false);

  const [savedShoeItems, setSavedShoeItems] = useState<SavedAreaItem[]>([]);
  const [justSavedShoe, setJustSavedShoe] = useState<boolean>(false);

  const [savedConvItems, setSavedConvItems] = useState<SavedAreaItem[]>([]);
  const [justSavedConv, setJustSavedConv] = useState<boolean>(false);

  // Expand state
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_area_univ"); if (s1) setSavedUnivItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_area_tri"); if (s2) setSavedTriItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_area_circ"); if (s3) setSavedCircItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_area_quad"); if (s4) setSavedQuadItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_area_poly"); if (s5) setSavedPolyItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_area_shoe"); if (s6) setSavedShoeItems(JSON.parse(s6));
      const s7 = localStorage.getItem("saved_area_conv"); if (s7) setSavedConvItems(JSON.parse(s7));
    } catch (e) {}
  }, []);

  // Card 1 Calculations (Universal Shape)
  const univResult: AreaResult = useMemo(() => {
    switch (uShape) {
      case "triangle": return computeTriangleAreaBaseHeight(uDim1, uDim2, uUnit, precision1);
      case "circle": return computeCircleArea(uDim1, uUnit, precision1);
      case "trapezoid": return computeTrapezoidArea(uDim1, uDim2, uDim3, uUnit, precision1);
      case "sector": return computeSectorArea(uDim1, uDim2, uUnit, precision1);
      case "ellipse": return computeEllipseArea(uDim1, uDim2, uUnit, precision1);
      case "parallelogram": return computeParallelogramArea(uDim1, uDim2, uUnit, precision1);
      case "rhombus": return computeRhombusArea(uDim1, uDim2, uUnit, precision1);
      case "annulus": return computeAnnulusArea(uDim1, uDim2, uUnit, precision1);
      default: return computeRectangleArea(uDim1, uDim2, uUnit, precision1);
    }
  }, [uShape, uDim1, uDim2, uDim3, uUnit, precision1]);

  // Card 2 Calculations (Triangle Suite)
  const triResult: AreaResult = useMemo(() => {
    if (triMode === "heron") return computeTriangleAreaHeron(triA, triBb, triCc, triUnit, precision1);
    return computeTriangleAreaBaseHeight(triB, triH, triUnit, precision1);
  }, [triMode, triB, triH, triA, triBb, triCc, triUnit, precision1]);

  // Card 3 Calculations (Circle Suite)
  const circResult: AreaResult = useMemo(() => {
    if (circMode === "sector") return computeSectorArea(circR, secAngle, circUnit, precision1);
    if (circMode === "annulus") return computeAnnulusArea(annOuterR, annInnerR, circUnit, precision1);
    return computeCircleArea(circR, circUnit, precision1);
  }, [circMode, circR, secAngle, annOuterR, annInnerR, circUnit, precision1]);

  // Card 4 Calculations (Quadrilateral Suite)
  const quadResult: AreaResult = useMemo(() => {
    if (quadMode === "trapezoid") return computeTrapezoidArea(qDim1, qDim2, qDim3, quadUnit, precision1);
    if (quadMode === "parallelogram") return computeParallelogramArea(qDim1, qDim2, quadUnit, precision1);
    if (quadMode === "rhombus") return computeRhombusArea(qDim1, qDim2, quadUnit, precision1);
    return computeRectangleArea(qDim1, qDim2, quadUnit, precision1);
  }, [quadMode, qDim1, qDim2, qDim3, quadUnit, precision1]);

  // Card 5 Calculations (Regular Polygon Suite)
  const polyResult: AreaResult = useMemo(() => {
    return computeRegularPolygonArea(polyN, polyS, polyUnit, precision1);
  }, [polyN, polyS, polyUnit, precision1]);

  // Card 6 Calculations (Shoelace Polygon Suite)
  const shoeResult: AreaResult = useMemo(() => {
    const parsed: Array<{ x: number; y: number }> = shoeCoords
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const parts = line.split(",").map((p) => parseFloat(p.trim()));
        return { x: parts[0] || 0, y: parts[1] || 0 };
      });
    return computeShoelacePolygonArea(parsed, shoeUnit, precision1);
  }, [shoeCoords, shoeUnit, precision1]);

  // Card 7 Calculations (Master Unit Converter)
  const convMatrix = useMemo(() => {
    const areaM2 = toSquareMeters(convVal, convUnit);
    return convertAreaFromSquareMeters(areaM2, precision1);
  }, [convVal, convUnit, precision1]);

  // Material Cost Estimate Calculation
  const estimatedMaterialCost = useMemo(() => {
    if (costPerUnit <= 0) return null;
    const baseArea = univResult.area;
    const totalAreaWithWaste = baseArea * (1 + wasteMarginPct / 100.0);
    const cost = totalAreaWithWaste * costPerUnit;
    return {
      totalAreaWithWaste: totalAreaWithWaste.toFixed(precision1),
      totalCost: cost.toFixed(2)
    };
  }, [univResult.area, costPerUnit, wasteMarginPct, precision1]);

  // Quick Preset Handler
  const handleApplyPreset = (preset: "pitch" | "tennis" | "bball" | "pool") => {
    if (preset === "pitch") {
      setUShape("rectangle"); setUDim1(105); setUDim2(68); setUUnit("m");
    } else if (preset === "tennis") {
      setUShape("rectangle"); setUDim1(23.77); setUDim2(10.97); setUUnit("m");
    } else if (preset === "bball") {
      setUShape("rectangle"); setUDim1(28); setUDim2(15); setUUnit("m");
    } else if (preset === "pool") {
      setUShape("circle"); setUDim1(5); setUUnit("m");
    }
  };

  // Save Handlers
  const handleSaveUniv = () => {
    const inputsStr = `${univResult.shapeName} (${uUnit})`;
    const resList = [
      `Area = ${univResult.area} ${uUnit}²`,
      `Perimeter / Circumference = ${univResult.perimeter || univResult.circumference || "N/A"}`,
      `Conversions: ${univResult.conversions.sqFeet} ft² = ${univResult.conversions.acres} Acres`
    ];
    const newItem: SavedAreaItem = {
      id: Date.now().toString(),
      title: `${univResult.shapeName} Area = ${univResult.area} ${uUnit}²`,
      inputs: inputsStr,
      operation: `Universal Area Solver`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedUnivItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedUnivItems(updated);
    try { localStorage.setItem("saved_area_univ", JSON.stringify(updated)); } catch (e) {}
    setJustSavedUniv(true); setTimeout(() => setJustSavedUniv(false), 2000);
  };

  const handleSaveTri = () => {
    const inputsStr = `Triangle ${triMode} (${triUnit})`;
    const resList = [`Area = ${triResult.area} ${triUnit}²`, `Perimeter = ${triResult.perimeter || "N/A"}`];
    const newItem: SavedAreaItem = {
      id: Date.now().toString(),
      title: `Triangle Area = ${triResult.area} ${triUnit}²`,
      inputs: inputsStr,
      operation: `Triangle Suite`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedTriItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedTriItems(updated);
    try { localStorage.setItem("saved_area_tri", JSON.stringify(updated)); } catch (e) {}
    setJustSavedTri(true); setTimeout(() => setJustSavedTri(false), 2000);
  };

  const handleSaveCirc = () => {
    const inputsStr = `${circResult.shapeName} (${circUnit})`;
    const resList = [`Area = ${circResult.area} ${circUnit}²`];
    const newItem: SavedAreaItem = {
      id: Date.now().toString(),
      title: `${circResult.shapeName} Area = ${circResult.area} ${circUnit}²`,
      inputs: inputsStr,
      operation: `Circle Suite`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedCircItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedCircItems(updated);
    try { localStorage.setItem("saved_area_circ", JSON.stringify(updated)); } catch (e) {}
    setJustSavedCirc(true); setTimeout(() => setJustSavedCirc(false), 2000);
  };

  const handleSaveQuad = () => {
    const inputsStr = `${quadResult.shapeName} (${quadUnit})`;
    const resList = [`Area = ${quadResult.area} ${quadUnit}²`];
    const newItem: SavedAreaItem = {
      id: Date.now().toString(),
      title: `${quadResult.shapeName} Area = ${quadResult.area} ${quadUnit}²`,
      inputs: inputsStr,
      operation: `Quadrilateral Suite`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedQuadItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedQuadItems(updated);
    try { localStorage.setItem("saved_area_quad", JSON.stringify(updated)); } catch (e) {}
    setJustSavedQuad(true); setTimeout(() => setJustSavedQuad(false), 2000);
  };

  const handleSavePoly = () => {
    const inputsStr = `Regular ${polyN}-gon (s=${polyS} ${polyUnit})`;
    const resList = [`Area = ${polyResult.area} ${polyUnit}²`, `Apothem = ${polyResult.apothem}`];
    const newItem: SavedAreaItem = {
      id: Date.now().toString(),
      title: `Regular ${polyN}-gon Area = ${polyResult.area} ${polyUnit}²`,
      inputs: inputsStr,
      operation: `Regular Polygon`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedPolyItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedPolyItems(updated);
    try { localStorage.setItem("saved_area_poly", JSON.stringify(updated)); } catch (e) {}
    setJustSavedPoly(true); setTimeout(() => setJustSavedPoly(false), 2000);
  };

  const handleSaveShoe = () => {
    const inputsStr = `Shoelace Coordinate Polygon (${shoeUnit})`;
    const resList = [`Area = ${shoeResult.area} ${shoeUnit}²`];
    const newItem: SavedAreaItem = {
      id: Date.now().toString(),
      title: `Shoelace Polygon Area = ${shoeResult.area} ${shoeUnit}²`,
      inputs: inputsStr,
      operation: `Shoelace Algorithm`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedShoeItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedShoeItems(updated);
    try { localStorage.setItem("saved_area_shoe", JSON.stringify(updated)); } catch (e) {}
    setJustSavedShoe(true); setTimeout(() => setJustSavedShoe(false), 2000);
  };

  const handleSaveConv = () => {
    const inputsStr = `1 ${convUnit}²`;
    const resList = [`${convMatrix.sqFeet} sq ft`, `${convMatrix.acres} Acres`, `${convMatrix.hectares} Hectares`];
    const newItem: SavedAreaItem = {
      id: Date.now().toString(),
      title: `Converted 1 ${convUnit}² = ${convMatrix.sqFeet} ft²`,
      inputs: inputsStr,
      operation: `Master Area Conversion`,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConvItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedConvItems(updated);
    try { localStorage.setItem("saved_area_conv", JSON.stringify(updated)); } catch (e) {}
    setJustSavedConv(true); setTimeout(() => setJustSavedConv(false), 2000);
  };

  // Render Interactive 2D Vector SVG Shape Visualizer Helper with Notation
  const renderShapeSVG = (shape: string) => {
    const w = 220; const h = 160;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-52 h-40">
        <rect width={w} height={h} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />

        {/* 1. RECTANGLE / SQUARE */}
        {(shape === "Rectangle" || shape === "Square") && (
          <g>
            <rect x="40" y="40" width="140" height="80" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" rx="4" />
            <text x="110" y="32" textAnchor="middle" className="text-[11px] font-mono font-bold fill-blue-600 dark:fill-blue-400">length (l)</text>
            <text x="188" y="84" className="text-[11px] font-mono font-bold fill-red-600 dark:fill-red-400">width (w)</text>
          </g>
        )}

        {/* 2. TRIANGLE */}
        {shape.includes("Triangle") && (
          <g>
            <path d="M 110 30 L 175 125 L 45 125 Z" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <line x1="110" y1="30" x2="110" y2="125" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="100" y="75" className="text-[11px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
            <text x="110" y="140" textAnchor="middle" className="text-[11px] font-mono font-bold fill-blue-600 dark:fill-blue-400">base (b)</text>
          </g>
        )}

        {/* 3. CIRCLE */}
        {shape === "Circle" && (
          <g>
            <circle cx="110" cy="80" r="55" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <line x1="110" y1="80" x2="165" y2="80" stroke="#dc2626" strokeWidth="2" />
            <circle cx="110" cy="80" r="3" fill="#1d4ed8" />
            <text x="138" y="74" textAnchor="middle" className="text-[11px] font-mono font-bold fill-red-600 dark:fill-red-400">r</text>
          </g>
        )}

        {/* 4. SECTOR */}
        {shape.includes("Sector") && (
          <g>
            <path d="M 110 80 L 165 80 A 55 55 0 0 0 137.5 32.4 Z" fill="#3b82f6" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2.5" />
            <circle cx="110" cy="80" r="3" fill="#1d4ed8" />
            <text x="135" y="95" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">r</text>
            <path d="M 130 80 A 20 20 0 0 0 120 62.6" fill="none" stroke="#16a34a" strokeWidth="1.5" />
            <text x="132" y="68" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">θ</text>
          </g>
        )}

        {/* 5. ELLIPSE */}
        {shape === "Ellipse" && (
          <g>
            <ellipse cx="110" cy="80" rx="70" ry="45" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <line x1="110" y1="80" x2="180" y2="80" stroke="#dc2626" strokeWidth="2" />
            <text x="145" y="74" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">a</text>
            <line x1="110" y1="80" x2="110" y2="35" stroke="#16a34a" strokeWidth="2" />
            <text x="100" y="55" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">b</text>
          </g>
        )}

        {/* 6. TRAPEZOID */}
        {shape === "Trapezoid" && (
          <g>
            <path d="M 70 40 L 150 40 L 180 120 L 40 120 Z" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <line x1="70" y1="40" x2="70" y2="120" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="60" y="80" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
            <text x="110" y="32" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">b1</text>
            <text x="110" y="135" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">b2</text>
          </g>
        )}

        {/* 7. PARALLELOGRAM */}
        {shape === "Parallelogram" && (
          <g>
            <path d="M 70 40 L 170 40 L 140 120 L 40 120 Z" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <line x1="70" y1="40" x2="70" y2="120" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="60" y="80" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">h</text>
            <text x="90" y="135" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">base (b)</text>
          </g>
        )}

        {/* 8. RHOMBUS / KITE */}
        {shape.includes("Rhombus") && (
          <g>
            <path d="M 110 30 L 175 80 L 110 130 L 45 80 Z" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <line x1="45" y1="80" x2="175" y2="80" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <line x1="110" y1="30" x2="110" y2="130" stroke="#16a34a" strokeWidth="2" strokeDasharray="3,3" />
            <text x="160" y="74" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">d1</text>
            <text x="100" y="115" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">d2</text>
          </g>
        )}

        {/* 9. ANNULUS */}
        {shape.includes("Annulus") && (
          <g>
            <circle cx="110" cy="80" r="55" fill="#3b82f6" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2.5" />
            <circle cx="110" cy="80" r="30" fill="#f8fafc" stroke="#1d4ed8" strokeWidth="2" className="dark:fill-slate-900" />
            <line x1="110" y1="80" x2="165" y2="80" stroke="#dc2626" strokeWidth="2" />
            <text x="150" y="74" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">R</text>
            <line x1="110" y1="80" x2="140" y2="80" stroke="#16a34a" strokeWidth="2" />
            <text x="125" y="74" className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">r</text>
          </g>
        )}

        {/* 10. REGULAR POLYGON */}
        {shape.includes("gon") && (
          <g>
            <polygon points="110,25 158,52 158,108 110,135 62,108 62,52" fill="#3b82f6" fillOpacity="0.2" stroke="#1d4ed8" strokeWidth="2.5" />
            <line x1="110" y1="80" x2="110" y2="135" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="98" y="110" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">apothem</text>
            <text x="110" y="146" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">side (s)</text>
          </g>
        )}

        {/* 11. SHOELACE POLYGON */}
        {shape.includes("Shoelace") && (
          <g>
            <polygon points="40,110 170,110 170,50 110,20 40,50" fill="#3b82f6" fillOpacity="0.25" stroke="#1d4ed8" strokeWidth="2.5" />
            <circle cx="40" cy="110" r="3" fill="#dc2626" />
            <circle cx="170" cy="110" r="3" fill="#dc2626" />
            <circle cx="170" cy="50" r="3" fill="#dc2626" />
            <circle cx="110" cy="20" r="3" fill="#dc2626" />
            <circle cx="40" cy="50" r="3" fill="#dc2626" />
            <text x="110" y="75" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-300">Shoelace (x_i, y_i)</text>
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: UNIVERSAL 2D SHAPE AREA SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Universal 2D Shape Area Solver</span>
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
              onClick={() => handleApplyPreset("pitch")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Football Pitch (105m × 68m)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("tennis")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Standard Tennis Court
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("bball")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Basketball Court (28m × 15m)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("pool")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Pool Circle (Radius 5m)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: SHAPE & DIMENSION INPUTS */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Square className="h-4 w-4 text-blue-600" />
                  <span>2D Shape Parameters</span>
                </h2>
                <select
                  value={uUnit}
                  onChange={(e) => setUUnit(e.target.value as AreaUnit)}
                  className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded text-xs font-bold"
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
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Select 2D Geometric Shape:</label>
                  <select
                    value={uShape}
                    onChange={(e) => setUShape(e.target.value as any)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-xs"
                  >
                    <option value="rectangle">Rectangle (Length l, Width w)</option>
                    <option value="triangle">Triangle (Base b, Height h)</option>
                    <option value="circle">Circle (Radius r)</option>
                    <option value="trapezoid">Trapezoid (Base 1, Base 2, Height h)</option>
                    <option value="sector">Circular Sector (Radius r, Angle θ°)</option>
                    <option value="ellipse">Ellipse (Semi-major a, Semi-minor b)</option>
                    <option value="parallelogram">Parallelogram (Base b, Height h)</option>
                    <option value="rhombus">Rhombus / Kite (Diagonal d1, d2)</option>
                    <option value="annulus">Annulus / Ring (Outer R, Inner r)</option>
                  </select>
                </div>

                {uShape === "circle" && (
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

                {(uShape === "rectangle" || uShape === "triangle" || uShape === "ellipse" || uShape === "parallelogram" || uShape === "rhombus") && (
                  <>
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Length / Base / Semi-major / Diag 1:</label>
                      <input
                        type="number"
                        step="any"
                        value={uDim1}
                        onChange={(e) => setUDim1(parseFloat(e.target.value) || 0.1)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Width / Height / Semi-minor / Diag 2:</label>
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

                {uShape === "sector" && (
                  <>
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

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Central Angle (θ in degrees):</label>
                      <input
                        type="number"
                        step="any"
                        value={uDim2}
                        onChange={(e) => setUDim2(parseFloat(e.target.value) || 1)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>
                  </>
                )}

                {uShape === "annulus" && (
                  <>
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Outer Radius (R):</label>
                      <input
                        type="number"
                        step="any"
                        value={uDim1}
                        onChange={(e) => setUDim1(parseFloat(e.target.value) || 0.1)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Inner Radius (r):</label>
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

                {uShape === "trapezoid" && (
                  <>
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Base 1 (a):</label>
                      <input
                        type="number"
                        step="any"
                        value={uDim1}
                        onChange={(e) => setUDim1(parseFloat(e.target.value) || 0.1)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Base 2 (b):</label>
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

            {/* RIGHT COLUMN: AREA RESULTS DASHBOARD & SVG */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Calculated {univResult.shapeName} Area
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                      {univResult.formula}
                    </span>
                  </div>

                  <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-slate-100 break-all">
                    {univResult.area} <span className="text-lg text-blue-600">{uUnit}²</span>
                  </div>

                  {(univResult.perimeter || univResult.circumference) && (
                    <p className="text-xs font-mono font-bold text-slate-500">
                      Perimeter / Circumference = {univResult.perimeter || univResult.circumference} {uUnit}
                    </p>
                  )}
                </div>

                {/* CAPACITY & CONVERSIONS SUMMARY */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Square Feet</span>
                    <span className="text-blue-600 dark:text-blue-400">{univResult.conversions.sqFeet} ft²</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Acres</span>
                    <span className="text-slate-900 dark:text-slate-100">{univResult.conversions.acres} ac</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Hectares</span>
                    <span className="text-slate-900 dark:text-slate-100">{univResult.conversions.hectares} ha</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Sq Inches</span>
                    <span className="text-slate-900 dark:text-slate-100">{univResult.conversions.sqInches} in²</span>
                  </div>
                </div>

                {/* MATERIAL & COVERAGE COST ESTIMATOR OPTION */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-sans">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Material &amp; Coverage Cost Estimator (Optional)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-500 font-semibold mb-0.5">Cost per {uUnit}² ($):</label>
                      <input
                        type="number"
                        step="any"
                        value={costPerUnit}
                        onChange={(e) => setCostPerUnit(parseFloat(e.target.value) || 0)}
                        placeholder="e.g. 3.50"
                        className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 font-semibold mb-0.5">Cutting Waste Margin (%):</label>
                      <input
                        type="number"
                        step="any"
                        value={wasteMarginPct}
                        onChange={(e) => setWasteMarginPct(parseFloat(e.target.value) || 0)}
                        className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs"
                      />
                    </div>
                  </div>

                  {estimatedMaterialCost && (
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                      <span>Total Material Needed (+{wasteMarginPct}% waste): {estimatedMaterialCost.totalAreaWithWaste} {uUnit}²</span>
                      <span>Total Cost: ${estimatedMaterialCost.totalCost}</span>
                    </div>
                  )}
                </div>

                {/* 2D VECTOR SVG VISUALIZER WITH NOTATION */}
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
                  <span>Saved Universal Area Calculations ({savedUnivItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedUnivItems([]);
                    try { localStorage.removeItem("saved_area_univ"); } catch(e){}
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
                            try { localStorage.setItem("saved_area_univ", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 2: TRIANGLE MULTI-INPUT SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Triangle Multi-Input Suite</span>
          <button
            type="button"
            onClick={handleSaveTri}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedTri ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold w-fit">
            <button
              type="button"
              onClick={() => setTriMode("baseHeight")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${triMode === "baseHeight" ? "bg-blue-600 text-white" : ""}`}
            >
              Base &amp; Height (½bh)
            </button>
            <button
              type="button"
              onClick={() => setTriMode("heron")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${triMode === "heron" ? "bg-blue-600 text-white" : ""}`}
            >
              3 Sides (Heron&apos;s Formula)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              {triMode === "baseHeight" ? (
                <>
                  <div>
                    <label className="block font-bold mb-1">Base (b):</label>
                    <input
                      type="number"
                      step="any"
                      value={triB}
                      onChange={(e) => setTriB(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Height (h):</label>
                    <input
                      type="number"
                      step="any"
                      value={triH}
                      onChange={(e) => setTriH(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block font-bold mb-1">Side a:</label>
                    <input
                      type="number"
                      step="any"
                      value={triA}
                      onChange={(e) => setTriA(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Side b:</label>
                    <input
                      type="number"
                      step="any"
                      value={triBb}
                      onChange={(e) => setTriBb(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Side c:</label>
                    <input
                      type="number"
                      step="any"
                      value={triCc}
                      onChange={(e) => setTriCc(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">{triResult.shapeName} Results</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {triResult.area} <span className="text-base text-blue-600">{triUnit}²</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Perimeter = {triResult.perimeter || "N/A"} {triUnit}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderShapeSVG(triResult.shapeName)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: CIRCLE, SECTOR & ANNULUS SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Circle, Sector &amp; Annulus Suite</span>
          <button
            type="button"
            onClick={handleSaveCirc}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCirc ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold w-fit">
            <button
              type="button"
              onClick={() => setCircMode("circle")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${circMode === "circle" ? "bg-blue-600 text-white" : ""}`}
            >
              Standard Circle
            </button>
            <button
              type="button"
              onClick={() => setCircMode("sector")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${circMode === "sector" ? "bg-blue-600 text-white" : ""}`}
            >
              Circular Sector
            </button>
            <button
              type="button"
              onClick={() => setCircMode("annulus")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${circMode === "annulus" ? "bg-blue-600 text-white" : ""}`}
            >
              Annulus (Ring)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              {circMode === "circle" && (
                <div>
                  <label className="block font-bold mb-1">Radius (r):</label>
                  <input
                    type="number"
                    step="any"
                    value={circR}
                    onChange={(e) => setCircR(parseFloat(e.target.value) || 0.1)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
              )}

              {circMode === "sector" && (
                <>
                  <div>
                    <label className="block font-bold mb-1">Radius (r):</label>
                    <input
                      type="number"
                      step="any"
                      value={circR}
                      onChange={(e) => setCircR(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Angle (θ in degrees):</label>
                    <input
                      type="number"
                      step="any"
                      value={secAngle}
                      onChange={(e) => setSecAngle(parseFloat(e.target.value) || 1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              )}

              {circMode === "annulus" && (
                <>
                  <div>
                    <label className="block font-bold mb-1">Outer Radius (R):</label>
                    <input
                      type="number"
                      step="any"
                      value={annOuterR}
                      onChange={(e) => setAnnOuterR(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Inner Radius (r):</label>
                    <input
                      type="number"
                      step="any"
                      value={annInnerR}
                      onChange={(e) => setAnnInnerR(parseFloat(e.target.value) || 0.1)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">{circResult.shapeName} Results</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {circResult.area} <span className="text-base text-blue-600">{circUnit}²</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                {circResult.circumference ? `Circumference = ${circResult.circumference}` : circResult.arcLength ? `Arc Length L = ${circResult.arcLength}` : ""}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderShapeSVG(circResult.shapeName)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: QUADRILATERAL SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Quadrilateral Suite</span>
          <button
            type="button"
            onClick={handleSaveQuad}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedQuad ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold w-fit">
            <button
              type="button"
              onClick={() => setQuadMode("rectangle")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${quadMode === "rectangle" ? "bg-blue-600 text-white" : ""}`}
            >
              Rectangle
            </button>
            <button
              type="button"
              onClick={() => setQuadMode("trapezoid")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${quadMode === "trapezoid" ? "bg-blue-600 text-white" : ""}`}
            >
              Trapezoid
            </button>
            <button
              type="button"
              onClick={() => setQuadMode("parallelogram")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${quadMode === "parallelogram" ? "bg-blue-600 text-white" : ""}`}
            >
              Parallelogram
            </button>
            <button
              type="button"
              onClick={() => setQuadMode("rhombus")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${quadMode === "rhombus" ? "bg-blue-600 text-white" : ""}`}
            >
              Rhombus / Kite
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <label className="block font-bold mb-1">Dimension 1 (Length / Base 1 / Diag 1):</label>
                <input
                  type="number"
                  step="any"
                  value={qDim1}
                  onChange={(e) => setQDim1(parseFloat(e.target.value) || 0.1)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Dimension 2 (Width / Base 2 / Diag 2 / Height):</label>
                <input
                  type="number"
                  step="any"
                  value={qDim2}
                  onChange={(e) => setQDim2(parseFloat(e.target.value) || 0.1)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>

              {quadMode === "trapezoid" && (
                <div>
                  <label className="block font-bold mb-1">Height (h):</label>
                  <input
                    type="number"
                    step="any"
                    value={qDim3}
                    onChange={(e) => setQDim3(parseFloat(e.target.value) || 0.1)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">{quadResult.shapeName} Results</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {quadResult.area} <span className="text-base text-blue-600">{quadUnit}²</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Perimeter = {quadResult.perimeter || "N/A"}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderShapeSVG(quadResult.shapeName)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: REGULAR POLYGON SUITE (N-GON) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Regular Polygon Suite (n-gon)</span>
          <button
            type="button"
            onClick={handleSavePoly}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedPoly ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <label className="block font-bold mb-1">Number of Sides (n &ge; 3):</label>
                <input
                  type="number"
                  step="1"
                  min="3"
                  value={polyN}
                  onChange={(e) => setPolyN(parseInt(e.target.value) || 3)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Side Length (s):</label>
                <input
                  type="number"
                  step="any"
                  value={polyS}
                  onChange={(e) => setPolyS(parseFloat(e.target.value) || 0.1)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">{polyResult.shapeName} Results</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {polyResult.area} <span className="text-base text-blue-600">{polyUnit}²</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Apothem a = {polyResult.apothem} | Perimeter P = {polyResult.perimeter}
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderShapeSVG(polyResult.shapeName)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 6: IRREGULAR POLYGON SHOELACE COORDINATE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Irregular Polygon Shoelace Coordinate Solver</span>
          <button
            type="button"
            onClick={handleSaveShoe}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedShoe ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <label className="block font-bold mb-1">Enter Vertices (X, Y per line):</label>
              <textarea
                rows={5}
                value={shoeCoords}
                onChange={(e) => setShoeCoords(e.target.value)}
                placeholder="0,0&#10;10,0&#10;10,6&#10;4,10&#10;0,6"
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"
              />
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase block">{shoeResult.shapeName} Results</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {shoeResult.area} <span className="text-base text-blue-600">{shoeUnit}²</span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-500">
                Gauss&apos;s Shoelace Algorithm: A = ½ |&Sigma;(x_i y_i+1 - x_i+1 y_i)|
              </p>

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderShapeSVG("Shoelace")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 7: MASTER AREA UNIT CONVERTER MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Master Area Unit Converter Matrix</span>
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
              <label className="block text-xs font-bold mb-1">Area Value:</label>
              <input
                type="number"
                step="any"
                value={convVal}
                onChange={(e) => setConvVal(parseFloat(e.target.value) || 0)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Base Area Unit:</label>
              <select
                value={convUnit}
                onChange={(e) => setConvUnit(e.target.value as AreaUnit)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm"
              >
                <option value="m">square meters (m²)</option>
                <option value="cm">square centimeters (cm²)</option>
                <option value="mm">square millimeters (mm²)</option>
                <option value="ft">square feet (ft²)</option>
                <option value="in">square inches (in²)</option>
                <option value="yd">square yards (yd²)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-blue-600 text-white font-bold">
                  <th className="p-2.5">Area Unit</th>
                  <th className="p-2.5">Equivalent Converted Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-slate-900 font-mono">
                <tr><td className="p-2 font-bold font-sans">Square Meters (m²)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{convMatrix.sqMeters}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Square Centimeters (cm²)</td><td className="p-2 font-bold">{convMatrix.sqCentimeters}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Square Feet (ft²)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{convMatrix.sqFeet}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Square Inches (in²)</td><td className="p-2 font-bold">{convMatrix.sqInches}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Square Yards (yd²)</td><td className="p-2 font-bold">{convMatrix.sqYards}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Acres (ac)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{convMatrix.acres}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Hectares (ha)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{convMatrix.hectares}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Square Miles (sq mi)</td><td className="p-2 font-bold">{convMatrix.sqMiles}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreaCalculator;
