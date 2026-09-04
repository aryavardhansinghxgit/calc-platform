"use client";

import React, { useState, useMemo, useEffect } from "react";
import jsPDF from "jspdf";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Zap,
  Square,
  Maximize2,
  DollarSign,
  Copy,
  CheckCircle2,
  Download,
  FileText,
  Printer,
  RotateCcw,
  AlertCircle
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
  parseShoelaceCoordinates,
  convertAreaFromSquareMeters,
  toSquareMeters,
  formatNumber,
  formatSmallArea,
  computeMaterialEstimate,
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
  rawParams: Record<string, any>;
  timestamp: string;
}

export function AreaCalculator() {
  // =========================================================================
  // CARD 1 STATE: UNIVERSAL 2D SHAPE SOLVER (Controlled Strings)
  // =========================================================================
  const [uShape, setUShape] = useState<"rectangle" | "triangle" | "circle" | "trapezoid" | "sector" | "ellipse" | "parallelogram" | "rhombus" | "annulus">("rectangle");
  const [uDim1, setUDim1] = useState<string>("10");
  const [uDim2, setUDim2] = useState<string>("5");
  const [uDim3, setUDim3] = useState<string>("4");
  const [uUnit, setUUnit] = useState<AreaUnit>("m");
  const [precision1, setPrecision1] = useState<number>(4);
  const [costPerUnit, setCostPerUnit] = useState<string>("0");
  const [wasteMarginPct, setWasteMarginPct] = useState<string>("10");

  // =========================================================================
  // CARD 2 STATE: TRIANGLE MULTI-INPUT SUITE (Controlled Strings)
  // =========================================================================
  const [triMode, setTriMode] = useState<"baseHeight" | "heron">("baseHeight");
  const [triB, setTriB] = useState<string>("10");
  const [triH, setTriH] = useState<string>("6");
  const [triA, setTriA] = useState<string>("7");
  const [triBb, setTriBb] = useState<string>("8");
  const [triCc, setTriCc] = useState<string>("9");
  const [triUnit, setTriUnit] = useState<AreaUnit>("m");

  // =========================================================================
  // CARD 3 STATE: CIRCLE, SECTOR & ANNULUS SUITE (Controlled Strings)
  // =========================================================================
  const [circMode, setCircMode] = useState<"circle" | "sector" | "annulus">("circle");
  const [circR, setCircR] = useState<string>("5");
  const [secAngle, setSecAngle] = useState<string>("60");
  const [annOuterR, setAnnOuterR] = useState<string>("8");
  const [annInnerR, setAnnInnerR] = useState<string>("5");
  const [circUnit, setCircUnit] = useState<AreaUnit>("m");

  // =========================================================================
  // CARD 4 STATE: QUADRILATERAL SUITE (Controlled Strings)
  // =========================================================================
  const [quadMode, setQuadMode] = useState<"rectangle" | "trapezoid" | "parallelogram" | "rhombus">("rectangle");
  const [qDim1, setQDim1] = useState<string>("12");
  const [qDim2, setQDim2] = useState<string>("8");
  const [qDim3, setQDim3] = useState<string>("6");
  const [quadUnit, setQuadUnit] = useState<AreaUnit>("ft");

  // =========================================================================
  // CARD 5 STATE: REGULAR POLYGON SUITE (Controlled Strings)
  // =========================================================================
  const [polyN, setPolyN] = useState<string>("6");
  const [polyS, setPolyS] = useState<string>("5");
  const [polyUnit, setPolyUnit] = useState<AreaUnit>("m");

  // =========================================================================
  // CARD 6 STATE: IRREGULAR POLYGON SHOELACE SOLVER
  // =========================================================================
  const [shoeCoords, setShoeCoords] = useState<string>("0,0\n10,0\n10,6\n4,10\n0,6");
  const [shoeUnit, setShoeUnit] = useState<AreaUnit>("m");

  // =========================================================================
  // CARD 7 STATE: MASTER AREA UNIT CONVERTER MATRIX
  // =========================================================================
  const [convVal, setConvVal] = useState<string>("1");
  const [convUnit, setConvUnit] = useState<AreaUnit>("m");

  // =========================================================================
  // SAVED CALCULATIONS & ACTION FEEDBACK STATES
  // =========================================================================
  const [savedUnivItems, setSavedUnivItems] = useState<SavedAreaItem[]>([]);
  const [savedTriItems, setSavedTriItems] = useState<SavedAreaItem[]>([]);
  const [savedCircItems, setSavedCircItems] = useState<SavedAreaItem[]>([]);
  const [savedQuadItems, setSavedQuadItems] = useState<SavedAreaItem[]>([]);
  const [savedPolyItems, setSavedPolyItems] = useState<SavedAreaItem[]>([]);
  const [savedShoeItems, setSavedShoeItems] = useState<SavedAreaItem[]>([]);
  const [savedConvItems, setSavedConvItems] = useState<SavedAreaItem[]>([]);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Load from localStorage on mount
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

  // Copy Helper
  const handleCopy = (text: string, cardId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(cardId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // CSV Export Helper
  const downloadCSV = (filename: string, rows: (string | number)[][]) => {
    const escapeCsv = (val: string | number) => {
      const str = String(val ?? "");
      if (str.includes(",") || str.includes("\"") || str.includes("\n")) {
        return `"${str.replace(/"/g, "\"\"")}"`;
      }
      return str;
    };
    const content = rows.map(r => r.map(escapeCsv).join(",")).join("\n");
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // PDF Export Helper
  const downloadPDF = (title: string, lines: { label: string; value: string }[]) => {
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(30, 64, 175);
      doc.text("CalcPlatform — Area Calculator & 2D Geometry Suite", 40, 50);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 40, 68);

      doc.setDrawColor(226, 232, 240);
      doc.line(40, 80, 555, 80);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text(title, 40, 105);

      let y = 135;
      lines.forEach(({ label, value }) => {
        if (y > 770) {
          doc.addPage();
          y = 50;
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        doc.text(`${label}:`, 40, y);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        doc.text(String(value), 220, y);
        y += 22;
      });

      doc.save(`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}.pdf`);
    } catch (e) {
      console.error("PDF generation failed:", e);
    }
  };

  // =========================================================================
  // CARD 1 CALCULATIONS: UNIVERSAL 2D SHAPE AREA SOLVER
  // =========================================================================
  const univResult: AreaResult = useMemo(() => {
    const d1 = parseFloat(uDim1);
    const d2 = parseFloat(uDim2);
    const d3 = parseFloat(uDim3);

    switch (uShape) {
      case "triangle": return computeTriangleAreaBaseHeight(d1, d2, uUnit, precision1);
      case "circle": return computeCircleArea(d1, uUnit, precision1);
      case "trapezoid": return computeTrapezoidArea(d1, d2, d3, uUnit, precision1);
      case "sector": return computeSectorArea(d1, d2, uUnit, precision1);
      case "ellipse": return computeEllipseArea(d1, d2, uUnit, precision1);
      case "parallelogram": return computeParallelogramArea(d1, d2, uUnit, precision1);
      case "rhombus": return computeRhombusArea(d1, d2, uUnit, precision1);
      case "annulus": return computeAnnulusArea(d1, d2, uUnit, precision1);
      default: return computeRectangleArea(d1, d2, uUnit, precision1);
    }
  }, [uShape, uDim1, uDim2, uDim3, uUnit, precision1]);

  // Material Cost Estimate Calculation
  const estimatedMaterialCost = useMemo(() => {
    const cost = parseFloat(costPerUnit);
    const waste = parseFloat(wasteMarginPct);
    if (!Number.isFinite(cost) || cost <= 0 || !univResult.isValid) return null;
    
    const matRes = computeMaterialEstimate(univResult.area, cost, waste);
    if (!matRes.isValid) {
      return {
        error: matRes.error || "Invalid material or waste parameter.",
        totalAreaWithWaste: "0",
        totalCost: "0.00",
        wastePercent: waste
      };
    }
    return {
      totalAreaWithWaste: formatNumber(matRes.totalArea, precision1),
      totalCost: matRes.totalCost.toFixed(2),
      wastePercent: waste
    };
  }, [univResult, costPerUnit, wasteMarginPct, precision1]);

  // Presets Handler
  const handleApplyPreset = (preset: "pitch" | "tennis" | "bball" | "pool") => {
    if (preset === "pitch") {
      setUShape("rectangle"); setUDim1("105"); setUDim2("68"); setUUnit("m");
    } else if (preset === "tennis") {
      setUShape("rectangle"); setUDim1("23.77"); setUDim2("10.97"); setUUnit("m");
    } else if (preset === "bball") {
      setUShape("rectangle"); setUDim1("28"); setUDim2("15"); setUUnit("m");
    } else if (preset === "pool") {
      setUShape("circle"); setUDim1("5"); setUUnit("m");
    }
  };

  // Card 1 Save
  const handleSaveUniv = () => {
    if (!univResult.isValid) return;
    const inputsStr = `${univResult.shapeName} (Dim1=${uDim1}, Dim2=${uDim2}${uShape === "trapezoid" ? `, Dim3=${uDim3}` : ""}) ${uUnit}`;
    const resList = [
      `Area = ${univResult.formattedArea} ${uUnit}²`,
      `Perimeter / Circumference = ${univResult.formattedPerimeter || univResult.formattedCircumference || "N/A"} ${uUnit}`,
      `Conversions: ${univResult.conversions.sqFeet} ft² | ${univResult.conversions.acres} ac | ${univResult.conversions.hectares} ha`
    ];
    const newItem: SavedAreaItem = {
      id: Date.now().toString(),
      title: `${univResult.shapeName} Area = ${univResult.formattedArea} ${uUnit}²`,
      inputs: inputsStr,
      operation: `Universal Area Solver`,
      result: resList.join(" | "),
      resultsList: resList,
      rawParams: { uShape, uDim1, uDim2, uDim3, uUnit, precision1, costPerUnit, wasteMarginPct },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedUnivItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedUnivItems(updated);
    try { localStorage.setItem("saved_area_univ", JSON.stringify(updated)); } catch (e) {}
  };

  // Card 1 Load
  const handleLoadUniv = (item: SavedAreaItem) => {
    if (!item.rawParams) return;
    const p = item.rawParams;
    if (p.uShape) setUShape(p.uShape);
    if (p.uDim1 !== undefined) setUDim1(String(p.uDim1));
    if (p.uDim2 !== undefined) setUDim2(String(p.uDim2));
    if (p.uDim3 !== undefined) setUDim3(String(p.uDim3));
    if (p.uUnit) setUUnit(p.uUnit);
    if (p.precision1) setPrecision1(p.precision1);
    if (p.costPerUnit !== undefined) setCostPerUnit(String(p.costPerUnit));
    if (p.wasteMarginPct !== undefined) setWasteMarginPct(String(p.wasteMarginPct));
  };

  // =========================================================================
  // CARD 2 CALCULATIONS: TRIANGLE SUITE
  // =========================================================================
  const triResult: AreaResult = useMemo(() => {
    if (triMode === "heron") {
      const a = parseFloat(triA);
      const b = parseFloat(triBb);
      const c = parseFloat(triCc);
      return computeTriangleAreaHeron(a, b, c, triUnit, precision1);
    }
    const b = parseFloat(triB);
    const h = parseFloat(triH);
    return computeTriangleAreaBaseHeight(b, h, triUnit, precision1);
  }, [triMode, triB, triH, triA, triBb, triCc, triUnit, precision1]);

  const handleSaveTri = () => {
    if (!triResult.isValid) return;
    const inputsStr = triMode === "heron" ? `Sides a=${triA}, b=${triBb}, c=${triCc} ${triUnit}` : `Base=${triB}, Height=${triH} ${triUnit}`;
    const resList = [
      `Area = ${triResult.formattedArea} ${triUnit}²`,
      `Perimeter = ${triResult.formattedPerimeter ? `${triResult.formattedPerimeter} ${triUnit}` : "N/A"}`
    ];
    const newItem: SavedAreaItem = {
      id: Date.now().toString(),
      title: `${triResult.shapeName} Area = ${triResult.formattedArea} ${triUnit}²`,
      inputs: inputsStr,
      operation: `Triangle Suite`,
      result: resList.join(" | "),
      resultsList: resList,
      rawParams: { triMode, triB, triH, triA, triBb, triCc, triUnit },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedTriItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedTriItems(updated);
    try { localStorage.setItem("saved_area_tri", JSON.stringify(updated)); } catch (e) {}
  };

  const handleLoadTri = (item: SavedAreaItem) => {
    if (!item.rawParams) return;
    const p = item.rawParams;
    if (p.triMode) setTriMode(p.triMode);
    if (p.triB !== undefined) setTriB(String(p.triB));
    if (p.triH !== undefined) setTriH(String(p.triH));
    if (p.triA !== undefined) setTriA(String(p.triA));
    if (p.triBb !== undefined) setTriBb(String(p.triBb));
    if (p.triCc !== undefined) setTriCc(String(p.triCc));
    if (p.triUnit) setTriUnit(p.triUnit);
  };

  // =========================================================================
  // CARD 3 CALCULATIONS: CIRCLE / SECTOR / ANNULUS SUITE
  // =========================================================================
  const circResult: AreaResult = useMemo(() => {
    const r = parseFloat(circR);
    if (circMode === "sector") {
      const angle = parseFloat(secAngle);
      return computeSectorArea(r, angle, circUnit, precision1);
    }
    if (circMode === "annulus") {
      const R = parseFloat(annOuterR);
      const rInner = parseFloat(annInnerR);
      return computeAnnulusArea(R, rInner, circUnit, precision1);
    }
    return computeCircleArea(r, circUnit, precision1);
  }, [circMode, circR, secAngle, annOuterR, annInnerR, circUnit, precision1]);

  const handleSaveCirc = () => {
    if (!circResult.isValid) return;
    const inputsStr = circMode === "sector" ? `Radius=${circR}, θ=${secAngle}° ${circUnit}` : circMode === "annulus" ? `Outer R=${annOuterR}, Inner r=${annInnerR} ${circUnit}` : `Radius=${circR} ${circUnit}`;
    const resList = [
      `Area = ${circResult.formattedArea} ${circUnit}²`,
      circResult.circumference ? `Circumference = ${circResult.formattedCircumference} ${circUnit}` : circResult.arcLength ? `Arc Length = ${circResult.formattedArcLength} ${circUnit}` : ""
    ].filter(Boolean);
    const newItem: SavedAreaItem = {
      id: Date.now().toString(),
      title: `${circResult.shapeName} Area = ${circResult.formattedArea} ${circUnit}²`,
      inputs: inputsStr,
      operation: `Circle Suite`,
      result: resList.join(" | "),
      resultsList: resList,
      rawParams: { circMode, circR, secAngle, annOuterR, annInnerR, circUnit },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedCircItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedCircItems(updated);
    try { localStorage.setItem("saved_area_circ", JSON.stringify(updated)); } catch (e) {}
  };

  const handleLoadCirc = (item: SavedAreaItem) => {
    if (!item.rawParams) return;
    const p = item.rawParams;
    if (p.circMode) setCircMode(p.circMode);
    if (p.circR !== undefined) setCircR(String(p.circR));
    if (p.secAngle !== undefined) setSecAngle(String(p.secAngle));
    if (p.annOuterR !== undefined) setAnnOuterR(String(p.annOuterR));
    if (p.annInnerR !== undefined) setAnnInnerR(String(p.annInnerR));
    if (p.circUnit) setCircUnit(p.circUnit);
  };

  // =========================================================================
  // CARD 4 CALCULATIONS: QUADRILATERAL SUITE
  // =========================================================================
  const quadResult: AreaResult = useMemo(() => {
    const d1 = parseFloat(qDim1);
    const d2 = parseFloat(qDim2);
    const d3 = parseFloat(qDim3);
    if (quadMode === "trapezoid") return computeTrapezoidArea(d1, d2, d3, quadUnit, precision1);
    if (quadMode === "parallelogram") return computeParallelogramArea(d1, d2, quadUnit, precision1);
    if (quadMode === "rhombus") return computeRhombusArea(d1, d2, quadUnit, precision1);
    return computeRectangleArea(d1, d2, quadUnit, precision1);
  }, [quadMode, qDim1, qDim2, qDim3, quadUnit, precision1]);

  const handleSaveQuad = () => {
    if (!quadResult.isValid) return;
    const inputsStr = `${quadResult.shapeName} (Dim1=${qDim1}, Dim2=${qDim2}${quadMode === "trapezoid" ? `, Dim3=${qDim3}` : ""}) ${quadUnit}`;
    const resList = [
      `Area = ${quadResult.formattedArea} ${quadUnit}²`,
      quadResult.perimeter ? `Perimeter = ${quadResult.formattedPerimeter} ${quadUnit}` : ""
    ].filter(Boolean);
    const newItem: SavedAreaItem = {
      id: Date.now().toString(),
      title: `${quadResult.shapeName} Area = ${quadResult.formattedArea} ${quadUnit}²`,
      inputs: inputsStr,
      operation: `Quadrilateral Suite`,
      result: resList.join(" | "),
      resultsList: resList,
      rawParams: { quadMode, qDim1, qDim2, qDim3, quadUnit },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedQuadItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedQuadItems(updated);
    try { localStorage.setItem("saved_area_quad", JSON.stringify(updated)); } catch (e) {}
  };

  const handleLoadQuad = (item: SavedAreaItem) => {
    if (!item.rawParams) return;
    const p = item.rawParams;
    if (p.quadMode) setQuadMode(p.quadMode);
    if (p.qDim1 !== undefined) setQDim1(String(p.qDim1));
    if (p.qDim2 !== undefined) setQDim2(String(p.qDim2));
    if (p.qDim3 !== undefined) setQDim3(String(p.qDim3));
    if (p.quadUnit) setQuadUnit(p.quadUnit);
  };

  // =========================================================================
  // CARD 5 CALCULATIONS: REGULAR POLYGON SUITE (n-gon)
  // =========================================================================
  const polyResult: AreaResult = useMemo(() => {
    const n = parseFloat(polyN);
    const s = parseFloat(polyS);
    return computeRegularPolygonArea(n, s, polyUnit, precision1);
  }, [polyN, polyS, polyUnit, precision1]);

  const handleSavePoly = () => {
    if (!polyResult.isValid) return;
    const inputsStr = `Regular ${polyN}-gon (Side s=${polyS} ${polyUnit})`;
    const resList = [
      `Area = ${polyResult.formattedArea} ${polyUnit}²`,
      `Apothem = ${polyResult.formattedApothem}`,
      `Perimeter = ${polyResult.formattedPerimeter} ${polyUnit}`
    ];
    const newItem: SavedAreaItem = {
      id: Date.now().toString(),
      title: `Regular ${polyN}-gon Area = ${polyResult.formattedArea} ${polyUnit}²`,
      inputs: inputsStr,
      operation: `Regular Polygon`,
      result: resList.join(" | "),
      resultsList: resList,
      rawParams: { polyN, polyS, polyUnit },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedPolyItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedPolyItems(updated);
    try { localStorage.setItem("saved_area_poly", JSON.stringify(updated)); } catch (e) {}
  };

  const handleLoadPoly = (item: SavedAreaItem) => {
    if (!item.rawParams) return;
    const p = item.rawParams;
    if (p.polyN !== undefined) setPolyN(String(p.polyN));
    if (p.polyS !== undefined) setPolyS(String(p.polyS));
    if (p.polyUnit) setPolyUnit(p.polyUnit);
  };

  // =========================================================================
  // CARD 6 CALCULATIONS: SHOELACE POLYGON SOLVER
  // =========================================================================
  const shoeParsed = useMemo(() => {
    return parseShoelaceCoordinates(shoeCoords);
  }, [shoeCoords]);

  const shoeResult: AreaResult = useMemo(() => {
    if (shoeParsed.error) {
      const { raw, formatted } = convertAreaFromSquareMeters(0, precision1);
      return {
        isValid: false,
        error: shoeParsed.error,
        shapeName: "Irregular Polygon (Shoelace)",
        area: 0,
        formattedArea: formatNumber(0, precision1),
        formula: "A = ½ |Σ(x_i y_{i+1} - x_{i+1} y_i)|",
        conversions: formatted,
        rawConversions: raw,
        stepText: shoeParsed.error
      };
    }
    return computeShoelacePolygonArea(shoeParsed.points, shoeUnit, precision1);
  }, [shoeParsed, shoeUnit, precision1]);

  const handleSaveShoe = () => {
    if (!shoeResult.isValid) return;
    const inputsStr = `Shoelace (${shoeParsed.points.length} vertices) ${shoeUnit}`;
    const resList = [`Area = ${shoeResult.formattedArea} ${shoeUnit}²`];
    const newItem: SavedAreaItem = {
      id: Date.now().toString(),
      title: `${shoeResult.shapeName} Area = ${shoeResult.formattedArea} ${shoeUnit}²`,
      inputs: inputsStr,
      operation: `Shoelace Algorithm`,
      result: resList.join(" | "),
      resultsList: resList,
      rawParams: { shoeCoords, shoeUnit },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedShoeItems.filter(i => i.title !== newItem.title)].slice(0, 15);
    setSavedShoeItems(updated);
    try { localStorage.setItem("saved_area_shoe", JSON.stringify(updated)); } catch (e) {}
  };

  const handleLoadShoe = (item: SavedAreaItem) => {
    if (!item.rawParams) return;
    const p = item.rawParams;
    if (p.shoeCoords !== undefined) setShoeCoords(String(p.shoeCoords));
    if (p.shoeUnit) setShoeUnit(p.shoeUnit);
  };

  // =========================================================================
  // CARD 7 CALCULATIONS: MASTER CONVERTER MATRIX
  // =========================================================================
  const convMatrix = useMemo(() => {
    const val = parseFloat(convVal);
    const validVal = Number.isFinite(val) && val >= 0 ? val : 0;
    const areaM2 = toSquareMeters(validVal, convUnit);
    return convertAreaFromSquareMeters(areaM2, precision1);
  }, [convVal, convUnit, precision1]);

  const handleSaveConv = () => {
    const inputsStr = `${convVal} ${convUnit}²`;
    const resList = [
      `${convMatrix.formatted.sqFeet} ft²`,
      `${convMatrix.formatted.acres} ac`,
      `${convMatrix.formatted.hectares} ha`,
      `${convMatrix.formatted.sqInches} in²`
    ];
    const newItem: SavedAreaItem = {
      id: Date.now().toString(),
      title: `Converted ${convVal} ${convUnit}² = ${convMatrix.formatted.sqFeet} ft²`,
      inputs: inputsStr,
      operation: `Master Area Conversion`,
      result: resList.join(" | "),
      resultsList: resList,
      rawParams: { convVal, convUnit },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedConvItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedConvItems(updated);
    try { localStorage.setItem("saved_area_conv", JSON.stringify(updated)); } catch (e) {}
  };

  const handleLoadConv = (item: SavedAreaItem) => {
    if (!item.rawParams) return;
    const p = item.rawParams;
    if (p.convVal !== undefined) setConvVal(String(p.convVal));
    if (p.convUnit) setConvUnit(p.convUnit);
  };

  // =========================================================================
  // DYNAMIC SVG GENERATION
  // =========================================================================

  // Dynamic Regular Polygon Points Generator
  const getRegularPolygonPoints = (n: number, radius: number = 55, cx: number = 110, cy: number = 80) => {
    if (!Number.isInteger(n) || n < 3) return "";
    const pts: string[] = [];
    const offset = -Math.PI / 2; // top vertex points straight up
    for (let i = 0; i < n; i++) {
      const angle = offset + (2 * Math.PI * i) / n;
      const x = (cx + radius * Math.cos(angle)).toFixed(2);
      const y = (cy + radius * Math.sin(angle)).toFixed(2);
      pts.push(`${x},${y}`);
    }
    return pts.join(" ");
  };

  // Dynamic Shoelace Points Generator
  const getShoelaceSvgPath = (points: Array<{ x: number; y: number }>, w: number = 220, h: number = 160, pad: number = 28) => {
    if (!points || points.length < 3) return null;
    let minX = Infinity; let maxX = -Infinity;
    let minY = Infinity; let maxY = -Infinity;
    for (const p of points) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
    const spanX = maxX - minX || 1;
    const spanY = maxY - minY || 1;
    const scale = Math.min((w - 2 * pad) / spanX, (h - 2 * pad) / spanY);
    const offsetX = (w - spanX * scale) / 2 - minX * scale;
    const offsetY = (h - spanY * scale) / 2 + maxY * scale; // invert Y for standard Cartesian coordinates

    const svgPoints = points.map(p => ({
      x: p.x * scale + offsetX,
      y: offsetY - p.y * scale
    }));

    const pointsStr = svgPoints.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
    return { pointsStr, svgPoints };
  };

  const renderShapeSVG = (shape: string) => {
    const w = 220; const h = 160;
    const polyNSides = parseInt(polyN);

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

        {/* 10. DYNAMIC REGULAR POLYGON (n-gon) */}
        {shape.includes("gon") && (
          <g>
            {Number.isInteger(polyNSides) && polyNSides >= 3 ? (
              <>
                <polygon
                  points={getRegularPolygonPoints(polyNSides, 55, 110, 80)}
                  fill="#3b82f6"
                  fillOpacity="0.2"
                  stroke="#1d4ed8"
                  strokeWidth="2.5"
                />
                <line x1="110" y1="80" x2="110" y2="135" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
                <text x="98" y="110" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">apothem</text>
                <text x="110" y="148" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">side (s)</text>
              </>
            ) : (
              <text x="110" y="80" textAnchor="middle" className="text-xs font-bold fill-slate-400">Enter n ≥ 3</text>
            )}
          </g>
        )}

        {/* 11. DYNAMIC SHOELACE POLYGON */}
        {shape.includes("Shoelace") && (
          <g>
            {(() => {
              const svgData = getShoelaceSvgPath(shoeParsed.points, w, h, 28);
              if (!svgData) {
                return <text x="110" y="80" textAnchor="middle" className="text-xs font-bold fill-slate-400">Enter ≥ 3 vertices</text>;
              }
              return (
                <>
                  <polygon
                    points={svgData.pointsStr}
                    fill="#3b82f6"
                    fillOpacity="0.25"
                    stroke="#1d4ed8"
                    strokeWidth="2.5"
                  />
                  {svgData.svgPoints.map((pt, idx) => (
                    <circle key={idx} cx={pt.x} cy={pt.y} r="3" fill="#dc2626" />
                  ))}
                  <text x="110" y="20" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-700 dark:fill-blue-300">
                    Gauss Shoelace ({shoeParsed.points.length} vertices)
                  </text>
                </>
              );
            })()}
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
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <span>Universal 2D Shape Area Solver</span>
          <div className="flex items-center gap-1.5 no-print">
            <button
              type="button"
              onClick={handleSaveUniv}
              disabled={!univResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={() => handleCopy(`Universal Area: ${univResult.shapeName} = ${univResult.formattedArea} ${uUnit}² (${univResult.formula})`, "univ")}
              disabled={!univResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "univ" ? <CheckCircle2 className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "univ" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => downloadCSV(`universal-area-${uShape}-${Date.now()}.csv`, [
                ["Shape", "Unit", "Formula", "Calculated Area", "Perimeter/Circumference", "Material Cost", "Cutting Waste"],
                [univResult.shapeName, uUnit, univResult.formula, univResult.formattedArea, univResult.formattedPerimeter || univResult.formattedCircumference || "N/A", estimatedMaterialCost ? `$${estimatedMaterialCost.totalCost}` : "N/A", estimatedMaterialCost ? `${estimatedMaterialCost.wastePercent}%` : "N/A"]
              ])}
              disabled={!univResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export CSV"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={() => downloadPDF("Universal 2D Area Calculation", [
                { label: "Geometric Shape", value: univResult.shapeName },
                { label: "Measurement Unit", value: uUnit },
                { label: "Formula Applied", value: univResult.formula },
                { label: "Calculated Area", value: `${univResult.formattedArea} ${uUnit}²` },
                { label: "Perimeter / Circumference", value: `${univResult.formattedPerimeter || univResult.formattedCircumference || "N/A"} ${uUnit}` },
                { label: "Square Feet Equivalent", value: `${univResult.conversions.sqFeet} ft²` },
                { label: "Acres Equivalent", value: `${univResult.conversions.acres} ac` },
                { label: "Hectares Equivalent", value: `${univResult.conversions.hectares} ha` },
                { label: "Material Cost Estimate", value: estimatedMaterialCost ? `$${estimatedMaterialCost.totalCost} (with ${estimatedMaterialCost.wastePercent}% waste)` : "None specified" }
              ])}
              disabled={!univResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export PDF"
            >
              <FileText className="w-3 h-3 text-white" />
              <span>PDF</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Print Calculation"
            >
              <Printer className="w-3 h-3 text-white" />
              <span>Print</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* QUICK PRESETS BAR */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold no-print">
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
                  id="univ-unit-select"
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
                  <label htmlFor="univ-shape-select" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Select 2D Geometric Shape:
                  </label>
                  <select
                    id="univ-shape-select"
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
                    <label htmlFor="univ-dim1-circle" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Radius (r):</label>
                    <input
                      id="univ-dim1-circle"
                      type="number"
                      step="any"
                      value={uDim1}
                      onChange={(e) => setUDim1(e.target.value)}
                      placeholder="e.g. 5"
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                )}

                {(uShape === "rectangle" || uShape === "triangle" || uShape === "ellipse" || uShape === "parallelogram" || uShape === "rhombus") && (
                  <>
                    <div>
                      <label htmlFor="univ-dim1-generic" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {uShape === "rectangle" ? "Length (l):" : uShape === "triangle" || uShape === "parallelogram" ? "Base (b):" : uShape === "ellipse" ? "Semi-major Axis (a):" : "Diagonal 1 (d1):"}
                      </label>
                      <input
                        id="univ-dim1-generic"
                        type="number"
                        step="any"
                        value={uDim1}
                        onChange={(e) => setUDim1(e.target.value)}
                        placeholder="e.g. 10"
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>

                    <div>
                      <label htmlFor="univ-dim2-generic" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {uShape === "rectangle" ? "Width (w):" : uShape === "triangle" || uShape === "parallelogram" ? "Height (h):" : uShape === "ellipse" ? "Semi-minor Axis (b):" : "Diagonal 2 (d2):"}
                      </label>
                      <input
                        id="univ-dim2-generic"
                        type="number"
                        step="any"
                        value={uDim2}
                        onChange={(e) => setUDim2(e.target.value)}
                        placeholder="e.g. 5"
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>
                  </>
                )}

                {uShape === "sector" && (
                  <>
                    <div>
                      <label htmlFor="univ-dim1-sector" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Radius (r):</label>
                      <input
                        id="univ-dim1-sector"
                        type="number"
                        step="any"
                        value={uDim1}
                        onChange={(e) => setUDim1(e.target.value)}
                        placeholder="e.g. 10"
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="univ-dim2-sector" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Central Angle (θ in degrees, 0 &lt; θ ≤ 360):</label>
                      <input
                        id="univ-dim2-sector"
                        type="number"
                        step="any"
                        value={uDim2}
                        onChange={(e) => setUDim2(e.target.value)}
                        placeholder="e.g. 90"
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>
                  </>
                )}

                {uShape === "annulus" && (
                  <>
                    <div>
                      <label htmlFor="univ-dim1-annulus" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Outer Radius (R):</label>
                      <input
                        id="univ-dim1-annulus"
                        type="number"
                        step="any"
                        value={uDim1}
                        onChange={(e) => setUDim1(e.target.value)}
                        placeholder="e.g. 10"
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="univ-dim2-annulus" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Inner Radius (r &lt; R):</label>
                      <input
                        id="univ-dim2-annulus"
                        type="number"
                        step="any"
                        value={uDim2}
                        onChange={(e) => setUDim2(e.target.value)}
                        placeholder="e.g. 5"
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>
                  </>
                )}

                {uShape === "trapezoid" && (
                  <>
                    <div>
                      <label htmlFor="univ-dim1-trapezoid" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Base 1 (a):</label>
                      <input
                        id="univ-dim1-trapezoid"
                        type="number"
                        step="any"
                        value={uDim1}
                        onChange={(e) => setUDim1(e.target.value)}
                        placeholder="e.g. 10"
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="univ-dim2-trapezoid" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Base 2 (b):</label>
                      <input
                        id="univ-dim2-trapezoid"
                        type="number"
                        step="any"
                        value={uDim2}
                        onChange={(e) => setUDim2(e.target.value)}
                        placeholder="e.g. 6"
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="univ-dim3-trapezoid" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Height (h):</label>
                      <input
                        id="univ-dim3-trapezoid"
                        type="number"
                        step="any"
                        value={uDim3}
                        onChange={(e) => setUDim3(e.target.value)}
                        placeholder="e.g. 4"
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
                {!univResult.isValid ? (
                  <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900 text-xs font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                    <div>
                      <span className="font-bold block text-sm">Calculation Error</span>
                      <span>{univResult.error}</span>
                    </div>
                  </div>
                ) : (
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
                      {univResult.formattedArea} <span className="text-lg text-blue-600">{uUnit}²</span>
                    </div>

                    {(univResult.perimeter || univResult.circumference) && (
                      <p className="text-xs font-mono font-bold text-slate-500">
                        Perimeter / Circumference = {univResult.formattedPerimeter || univResult.formattedCircumference} {uUnit}
                      </p>
                    )}
                  </div>
                )}

                {/* CAPACITY & CONVERSIONS SUMMARY */}
                {univResult.isValid && (
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
                )}

                {/* MATERIAL & COVERAGE COST ESTIMATOR OPTION */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-sans">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Material &amp; Coverage Cost Estimator (Optional)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="univ-cost-per-unit" className="block text-[11px] text-slate-500 font-semibold mb-0.5">
                        Cost per {uUnit}² ($):
                      </label>
                      <input
                        id="univ-cost-per-unit"
                        type="number"
                        step="any"
                        value={costPerUnit}
                        onChange={(e) => setCostPerUnit(e.target.value)}
                        placeholder="e.g. 20"
                        className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="univ-waste-pct" className="block text-[11px] text-slate-500 font-semibold mb-0.5">
                        Cutting Waste Margin (%):
                      </label>
                      <input
                        id="univ-waste-pct"
                        type="number"
                        step="any"
                        value={wasteMarginPct}
                        onChange={(e) => setWasteMarginPct(e.target.value)}
                        placeholder="e.g. 10"
                        className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs"
                      />
                    </div>
                  </div>

                  {estimatedMaterialCost && (
                    "error" in estimatedMaterialCost && estimatedMaterialCost.error ? (
                      <div className="p-2 bg-red-50 dark:bg-red-950/40 rounded-lg border border-red-200 dark:border-red-800 text-xs font-semibold text-red-700 dark:text-red-300 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{estimatedMaterialCost.error}</span>
                      </div>
                    ) : (
                      <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 flex flex-wrap items-center justify-between gap-2">
                        <span>Total Material Needed (+{estimatedMaterialCost.wastePercent}% waste): {estimatedMaterialCost.totalAreaWithWaste} {uUnit}²</span>
                        <span>Total Cost: ${estimatedMaterialCost.totalCost}</span>
                      </div>
                    )
                  )}
                </div>

                {/* 2D VECTOR SVG VISUALIZER */}
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
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleLoadUniv(item)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-0.5 text-[10px] font-bold"
                            title="Load and restore inputs"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Load
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedUnivItems.filter(i => i.id !== item.id);
                              setSavedUnivItems(updated);
                              try { localStorage.setItem("saved_area_univ", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            title="Delete saved calculation"
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
                              Complete Results:
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
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <span>Triangle Multi-Input Suite</span>
          <div className="flex items-center gap-1.5 no-print">
            <button
              type="button"
              onClick={handleSaveTri}
              disabled={!triResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={() => handleCopy(`Triangle Area: ${triResult.formattedArea} ${triUnit}² (${triResult.formula})`, "tri")}
              disabled={!triResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "tri" ? <CheckCircle2 className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "tri" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => downloadCSV(`triangle-area-${triMode}-${Date.now()}.csv`, [
                ["Triangle Mode", "Formula", "Calculated Area", "Perimeter", "Unit"],
                [triResult.shapeName, triResult.formula, triResult.formattedArea, triResult.formattedPerimeter || "N/A", triUnit]
              ])}
              disabled={!triResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export CSV"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={() => downloadPDF("Triangle Calculation", [
                { label: "Calculation Mode", value: triResult.shapeName },
                { label: "Formula Used", value: triResult.formula },
                { label: "Calculated Area", value: `${triResult.formattedArea} ${triUnit}²` },
                { label: "Perimeter", value: `${triResult.formattedPerimeter || "N/A"} ${triUnit}` }
              ])}
              disabled={!triResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export PDF"
            >
              <FileText className="w-3 h-3 text-white" />
              <span>PDF</span>
            </button>
          </div>
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
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">Unit:</span>
                <select
                  id="tri-unit-select"
                  value={triUnit}
                  onChange={(e) => setTriUnit(e.target.value as AreaUnit)}
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

              {triMode === "baseHeight" ? (
                <>
                  <div>
                    <label htmlFor="tri-base-input" className="block font-bold mb-1">Base (b):</label>
                    <input
                      id="tri-base-input"
                      type="number"
                      step="any"
                      value={triB}
                      onChange={(e) => setTriB(e.target.value)}
                      placeholder="e.g. 10"
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label htmlFor="tri-height-input" className="block font-bold mb-1">Height (h):</label>
                    <input
                      id="tri-height-input"
                      type="number"
                      step="any"
                      value={triH}
                      onChange={(e) => setTriH(e.target.value)}
                      placeholder="e.g. 6"
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="tri-side-a" className="block font-bold mb-1">Side a:</label>
                    <input
                      id="tri-side-a"
                      type="number"
                      step="any"
                      value={triA}
                      onChange={(e) => setTriA(e.target.value)}
                      placeholder="e.g. 7"
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label htmlFor="tri-side-b" className="block font-bold mb-1">Side b:</label>
                    <input
                      id="tri-side-b"
                      type="number"
                      step="any"
                      value={triBb}
                      onChange={(e) => setTriBb(e.target.value)}
                      placeholder="e.g. 8"
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label htmlFor="tri-side-c" className="block font-bold mb-1">Side c:</label>
                    <input
                      id="tri-side-c"
                      type="number"
                      step="any"
                      value={triCc}
                      onChange={(e) => setTriCc(e.target.value)}
                      placeholder="e.g. 9"
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              {!triResult.isValid ? (
                <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900 text-xs font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                  <div>
                    <span className="font-bold block text-sm">Calculation Error</span>
                    <span>{triResult.error}</span>
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-xs font-extrabold text-blue-600 uppercase block">{triResult.shapeName} Results</span>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {triResult.formattedArea} <span className="text-base text-blue-600">{triUnit}²</span>
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Perimeter = {triResult.formattedPerimeter ? `${triResult.formattedPerimeter} ${triUnit}` : "N/A"}
                  </p>
                </>
              )}

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderShapeSVG(triResult.shapeName)}
              </div>
            </div>
          </div>

          {/* SAVED TRIANGLES */}
          {savedTriItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600">Saved Triangle Calculations ({savedTriItems.length})</span>
                <button
                  type="button"
                  onClick={() => { setSavedTriItems([]); try { localStorage.removeItem("saved_area_tri"); } catch(e){} }}
                  className="text-xs text-red-600 font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {savedTriItems.map((item) => (
                  <div key={item.id} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{item.title}</span>
                      <span className="text-[10px] text-slate-500">{item.inputs}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleLoadTri(item)}
                        className="text-blue-600 hover:text-blue-800 text-[10px] font-bold p-1 cursor-pointer flex items-center gap-0.5"
                      >
                        <RotateCcw className="w-3 h-3" /> Load
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = savedTriItems.filter(i => i.id !== item.id);
                          setSavedTriItems(updated);
                          try { localStorage.setItem("saved_area_tri", JSON.stringify(updated)); } catch(e){}
                        }}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: CIRCLE, SECTOR & ANNULUS SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <span>Circle, Sector &amp; Annulus Suite</span>
          <div className="flex items-center gap-1.5 no-print">
            <button
              type="button"
              onClick={handleSaveCirc}
              disabled={!circResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={() => handleCopy(`${circResult.shapeName}: Area = ${circResult.formattedArea} ${circUnit}² (${circResult.formula})`, "circ")}
              disabled={!circResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "circ" ? <CheckCircle2 className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "circ" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => downloadCSV(`circle-suite-${circMode}-${Date.now()}.csv`, [
                ["Shape", "Formula", "Calculated Area", "Circumference/Arc", "Unit"],
                [circResult.shapeName, circResult.formula, circResult.formattedArea, circResult.formattedCircumference || circResult.formattedArcLength || "N/A", circUnit]
              ])}
              disabled={!circResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export CSV"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={() => downloadPDF("Circle Suite Calculation", [
                { label: "Geometric Shape", value: circResult.shapeName },
                { label: "Formula Used", value: circResult.formula },
                { label: "Calculated Area", value: `${circResult.formattedArea} ${circUnit}²` },
                { label: "Circumference / Arc", value: `${circResult.formattedCircumference || circResult.formattedArcLength || "N/A"} ${circUnit}` }
              ])}
              disabled={!circResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export PDF"
            >
              <FileText className="w-3 h-3 text-white" />
              <span>PDF</span>
            </button>
          </div>
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
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">Unit:</span>
                <select
                  id="circ-unit-select"
                  value={circUnit}
                  onChange={(e) => setCircUnit(e.target.value as AreaUnit)}
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

              {circMode === "circle" && (
                <div>
                  <label htmlFor="circ-r-input" className="block font-bold mb-1">Radius (r):</label>
                  <input
                    id="circ-r-input"
                    type="number"
                    step="any"
                    value={circR}
                    onChange={(e) => setCircR(e.target.value)}
                    placeholder="e.g. 5"
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
              )}

              {circMode === "sector" && (
                <>
                  <div>
                    <label htmlFor="sector-r-input" className="block font-bold mb-1">Radius (r):</label>
                    <input
                      id="sector-r-input"
                      type="number"
                      step="any"
                      value={circR}
                      onChange={(e) => setCircR(e.target.value)}
                      placeholder="e.g. 10"
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label htmlFor="sector-angle-input" className="block font-bold mb-1">Angle (θ in degrees, 0 &lt; θ ≤ 360):</label>
                    <input
                      id="sector-angle-input"
                      type="number"
                      step="any"
                      value={secAngle}
                      onChange={(e) => setSecAngle(e.target.value)}
                      placeholder="e.g. 90"
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              )}

              {circMode === "annulus" && (
                <>
                  <div>
                    <label htmlFor="annulus-outer-r" className="block font-bold mb-1">Outer Radius (R):</label>
                    <input
                      id="annulus-outer-r"
                      type="number"
                      step="any"
                      value={annOuterR}
                      onChange={(e) => setAnnOuterR(e.target.value)}
                      placeholder="e.g. 10"
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label htmlFor="annulus-inner-r" className="block font-bold mb-1">Inner Radius (r &lt; R):</label>
                    <input
                      id="annulus-inner-r"
                      type="number"
                      step="any"
                      value={annInnerR}
                      onChange={(e) => setAnnInnerR(e.target.value)}
                      placeholder="e.g. 5"
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              {!circResult.isValid ? (
                <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900 text-xs font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                  <div>
                    <span className="font-bold block text-sm">Calculation Error</span>
                    <span>{circResult.error}</span>
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-xs font-extrabold text-blue-600 uppercase block">{circResult.shapeName} Results</span>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {circResult.formattedArea} <span className="text-base text-blue-600">{circUnit}²</span>
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    {circResult.circumference ? `Circumference = ${circResult.formattedCircumference} ${circUnit}` : circResult.arcLength ? `Arc Length L = ${circResult.formattedArcLength} ${circUnit}` : ""}
                  </p>
                </>
              )}

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderShapeSVG(circResult.shapeName)}
              </div>
            </div>
          </div>

          {/* SAVED CIRCLES */}
          {savedCircItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600">Saved Circle Suite Calculations ({savedCircItems.length})</span>
                <button
                  type="button"
                  onClick={() => { setSavedCircItems([]); try { localStorage.removeItem("saved_area_circ"); } catch(e){} }}
                  className="text-xs text-red-600 font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {savedCircItems.map((item) => (
                  <div key={item.id} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{item.title}</span>
                      <span className="text-[10px] text-slate-500">{item.inputs}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleLoadCirc(item)}
                        className="text-blue-600 hover:text-blue-800 text-[10px] font-bold p-1 cursor-pointer flex items-center gap-0.5"
                      >
                        <RotateCcw className="w-3 h-3" /> Load
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = savedCircItems.filter(i => i.id !== item.id);
                          setSavedCircItems(updated);
                          try { localStorage.setItem("saved_area_circ", JSON.stringify(updated)); } catch(e){}
                        }}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: QUADRILATERAL SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <span>Quadrilateral Suite</span>
          <div className="flex items-center gap-1.5 no-print">
            <button
              type="button"
              onClick={handleSaveQuad}
              disabled={!quadResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={() => handleCopy(`${quadResult.shapeName}: Area = ${quadResult.formattedArea} ${quadUnit}²`, "quad")}
              disabled={!quadResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "quad" ? <CheckCircle2 className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "quad" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => downloadCSV(`quadrilateral-${quadMode}-${Date.now()}.csv`, [
                ["Shape", "Formula", "Calculated Area", "Perimeter", "Unit"],
                [quadResult.shapeName, quadResult.formula, quadResult.formattedArea, quadResult.formattedPerimeter || "N/A", quadUnit]
              ])}
              disabled={!quadResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export CSV"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={() => downloadPDF("Quadrilateral Calculation", [
                { label: "Geometric Shape", value: quadResult.shapeName },
                { label: "Formula Applied", value: quadResult.formula },
                { label: "Calculated Area", value: `${quadResult.formattedArea} ${quadUnit}²` },
                { label: "Perimeter", value: `${quadResult.formattedPerimeter || "N/A"} ${quadUnit}` }
              ])}
              disabled={!quadResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export PDF"
            >
              <FileText className="w-3 h-3 text-white" />
              <span>PDF</span>
            </button>
          </div>
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
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">Unit:</span>
                <select
                  id="quad-unit-select"
                  value={quadUnit}
                  onChange={(e) => setQuadUnit(e.target.value as AreaUnit)}
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

              <div>
                <label htmlFor="quad-dim1-input" className="block font-bold mb-1">
                  {quadMode === "rectangle" ? "Length (l):" : quadMode === "trapezoid" ? "Base 1 (a):" : quadMode === "parallelogram" ? "Base (b):" : "Diagonal 1 (d1):"}
                </label>
                <input
                  id="quad-dim1-input"
                  type="number"
                  step="any"
                  value={qDim1}
                  onChange={(e) => setQDim1(e.target.value)}
                  placeholder="e.g. 12"
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>

              <div>
                <label htmlFor="quad-dim2-input" className="block font-bold mb-1">
                  {quadMode === "rectangle" ? "Width (w):" : quadMode === "trapezoid" ? "Base 2 (b):" : quadMode === "parallelogram" ? "Height (h):" : "Diagonal 2 (d2):"}
                </label>
                <input
                  id="quad-dim2-input"
                  type="number"
                  step="any"
                  value={qDim2}
                  onChange={(e) => setQDim2(e.target.value)}
                  placeholder="e.g. 8"
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>

              {quadMode === "trapezoid" && (
                <div>
                  <label htmlFor="quad-dim3-input" className="block font-bold mb-1">Height (h):</label>
                  <input
                    id="quad-dim3-input"
                    type="number"
                    step="any"
                    value={qDim3}
                    onChange={(e) => setQDim3(e.target.value)}
                    placeholder="e.g. 6"
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              {!quadResult.isValid ? (
                <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900 text-xs font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                  <div>
                    <span className="font-bold block text-sm">Calculation Error</span>
                    <span>{quadResult.error}</span>
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-xs font-extrabold text-blue-600 uppercase block">{quadResult.shapeName} Results</span>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {quadResult.formattedArea} <span className="text-base text-blue-600">{quadUnit}²</span>
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Perimeter = {quadResult.formattedPerimeter ? `${quadResult.formattedPerimeter} ${quadUnit}` : "N/A"}
                  </p>
                </>
              )}

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderShapeSVG(quadResult.shapeName)}
              </div>
            </div>
          </div>

          {/* SAVED QUADS */}
          {savedQuadItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600">Saved Quadrilateral Calculations ({savedQuadItems.length})</span>
                <button
                  type="button"
                  onClick={() => { setSavedQuadItems([]); try { localStorage.removeItem("saved_area_quad"); } catch(e){} }}
                  className="text-xs text-red-600 font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {savedQuadItems.map((item) => (
                  <div key={item.id} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{item.title}</span>
                      <span className="text-[10px] text-slate-500">{item.inputs}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleLoadQuad(item)}
                        className="text-blue-600 hover:text-blue-800 text-[10px] font-bold p-1 cursor-pointer flex items-center gap-0.5"
                      >
                        <RotateCcw className="w-3 h-3" /> Load
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = savedQuadItems.filter(i => i.id !== item.id);
                          setSavedQuadItems(updated);
                          try { localStorage.setItem("saved_area_quad", JSON.stringify(updated)); } catch(e){}
                        }}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: REGULAR POLYGON SUITE (N-GON) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <span>Regular Polygon Suite (n-gon)</span>
          <div className="flex items-center gap-1.5 no-print">
            <button
              type="button"
              onClick={handleSavePoly}
              disabled={!polyResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={() => handleCopy(`Regular ${polyN}-gon: Area = ${polyResult.formattedArea} ${polyUnit}²`, "poly")}
              disabled={!polyResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "poly" ? <CheckCircle2 className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "poly" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => downloadCSV(`regular-polygon-${polyN}gon-${Date.now()}.csv`, [
                ["Shape", "Number of Sides", "Side Length", "Calculated Area", "Apothem", "Perimeter", "Unit"],
                [polyResult.shapeName, polyN, polyS, polyResult.formattedArea, polyResult.formattedApothem || "N/A", polyResult.formattedPerimeter || "N/A", polyUnit]
              ])}
              disabled={!polyResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export CSV"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={() => downloadPDF("Regular Polygon Calculation", [
                { label: "Polygon Type", value: polyResult.shapeName },
                { label: "Number of Sides (n)", value: polyN },
                { label: "Side Length (s)", value: `${polyS} ${polyUnit}` },
                { label: "Calculated Area", value: `${polyResult.formattedArea} ${polyUnit}²` },
                { label: "Apothem", value: `${polyResult.formattedApothem || "N/A"} ${polyUnit}` },
                { label: "Perimeter", value: `${polyResult.formattedPerimeter || "N/A"} ${polyUnit}` }
              ])}
              disabled={!polyResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export PDF"
            >
              <FileText className="w-3 h-3 text-white" />
              <span>PDF</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">Unit:</span>
                <select
                  id="poly-unit-select"
                  value={polyUnit}
                  onChange={(e) => setPolyUnit(e.target.value as AreaUnit)}
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

              <div>
                <label htmlFor="poly-sides-input" className="block font-bold mb-1">Number of Sides (n &ge; 3, integer):</label>
                <input
                  id="poly-sides-input"
                  type="number"
                  step="1"
                  min="3"
                  value={polyN}
                  onChange={(e) => setPolyN(e.target.value)}
                  placeholder="e.g. 6"
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>

              <div>
                <label htmlFor="poly-side-len-input" className="block font-bold mb-1">Side Length (s):</label>
                <input
                  id="poly-side-len-input"
                  type="number"
                  step="any"
                  value={polyS}
                  onChange={(e) => setPolyS(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold"
                />
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              {!polyResult.isValid ? (
                <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900 text-xs font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                  <div>
                    <span className="font-bold block text-sm">Calculation Error</span>
                    <span>{polyResult.error}</span>
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-xs font-extrabold text-blue-600 uppercase block">{polyResult.shapeName} Results</span>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {polyResult.formattedArea} <span className="text-base text-blue-600">{polyUnit}²</span>
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Apothem a = {polyResult.formattedApothem} {polyUnit} | Perimeter P = {polyResult.formattedPerimeter} {polyUnit}
                  </p>
                </>
              )}

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderShapeSVG(polyResult.shapeName)}
              </div>
            </div>
          </div>

          {/* SAVED POLYGONS */}
          {savedPolyItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600">Saved Polygon Calculations ({savedPolyItems.length})</span>
                <button
                  type="button"
                  onClick={() => { setSavedPolyItems([]); try { localStorage.removeItem("saved_area_poly"); } catch(e){} }}
                  className="text-xs text-red-600 font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {savedPolyItems.map((item) => (
                  <div key={item.id} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{item.title}</span>
                      <span className="text-[10px] text-slate-500">{item.inputs}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleLoadPoly(item)}
                        className="text-blue-600 hover:text-blue-800 text-[10px] font-bold p-1 cursor-pointer flex items-center gap-0.5"
                      >
                        <RotateCcw className="w-3 h-3" /> Load
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = savedPolyItems.filter(i => i.id !== item.id);
                          setSavedPolyItems(updated);
                          try { localStorage.setItem("saved_area_poly", JSON.stringify(updated)); } catch(e){}
                        }}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 6: IRREGULAR POLYGON SHOELACE COORDINATE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <span>Irregular Polygon Shoelace Coordinate Solver</span>
          <div className="flex items-center gap-1.5 no-print">
            <button
              type="button"
              onClick={handleSaveShoe}
              disabled={!shoeResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={() => handleCopy(`Shoelace Polygon: Area = ${shoeResult.formattedArea} ${shoeUnit}² (${shoeParsed.points.length} vertices)`, "shoe")}
              disabled={!shoeResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "shoe" ? <CheckCircle2 className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "shoe" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => downloadCSV(`shoelace-polygon-${Date.now()}.csv`, [
                ["Shape", "Vertex Count", "Calculated Area", "Formula", "Unit"],
                [shoeResult.shapeName, shoeParsed.points.length, shoeResult.formattedArea, shoeResult.formula, shoeUnit]
              ])}
              disabled={!shoeResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export CSV"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={() => downloadPDF("Shoelace Polygon Calculation", [
                { label: "Calculation Method", value: "Gauss Shoelace Algorithm" },
                { label: "Vertex Count", value: String(shoeParsed.points.length) },
                { label: "Calculated Area", value: `${shoeResult.formattedArea} ${shoeUnit}²` },
                { label: "Formula Applied", value: shoeResult.formula }
              ])}
              disabled={!shoeResult.isValid}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export PDF"
            >
              <FileText className="w-3 h-3 text-white" />
              <span>PDF</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <label htmlFor="shoe-coords-input" className="block font-bold text-slate-700 dark:text-slate-300">
                  Enter Vertices (X, Y or X Y per line):
                </label>
                <select
                  id="shoe-unit-select"
                  value={shoeUnit}
                  onChange={(e) => setShoeUnit(e.target.value as AreaUnit)}
                  className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded text-xs font-bold"
                >
                  <option value="m">m</option>
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                  <option value="ft">ft</option>
                  <option value="in">in</option>
                  <option value="yd">yd</option>
                </select>
              </div>

              <textarea
                id="shoe-coords-input"
                rows={5}
                value={shoeCoords}
                onChange={(e) => setShoeCoords(e.target.value)}
                placeholder="0,0&#10;10,0&#10;10,6&#10;4,10&#10;0,6"
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"
              />
              <p className="text-[11px] text-slate-500">
                Supports comma or whitespace separated coordinates (e.g. &ldquo;10, 6&rdquo; or &ldquo;10 6&rdquo;). Minimum 3 vertices.
              </p>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              {!shoeResult.isValid ? (
                <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900 text-xs font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                  <div>
                    <span className="font-bold block text-sm">Coordinate Error</span>
                    <span>{shoeResult.error}</span>
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-xs font-extrabold text-blue-600 uppercase block">{shoeResult.shapeName} Results</span>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {shoeResult.formattedArea} <span className="text-base text-blue-600">{shoeUnit}²</span>
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Gauss&apos;s Shoelace Algorithm: A = ½ |&Sigma;(x_i y_i+1 - x_i+1 y_i)|
                  </p>
                </>
              )}

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderShapeSVG("Shoelace")}
              </div>
            </div>
          </div>

          {/* SAVED SHOELACE */}
          {savedShoeItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600">Saved Shoelace Calculations ({savedShoeItems.length})</span>
                <button
                  type="button"
                  onClick={() => { setSavedShoeItems([]); try { localStorage.removeItem("saved_area_shoe"); } catch(e){} }}
                  className="text-xs text-red-600 font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {savedShoeItems.map((item) => (
                  <div key={item.id} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{item.title}</span>
                      <span className="text-[10px] text-slate-500">{item.inputs}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleLoadShoe(item)}
                        className="text-blue-600 hover:text-blue-800 text-[10px] font-bold p-1 cursor-pointer flex items-center gap-0.5"
                      >
                        <RotateCcw className="w-3 h-3" /> Load
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = savedShoeItems.filter(i => i.id !== item.id);
                          setSavedShoeItems(updated);
                          try { localStorage.setItem("saved_area_shoe", JSON.stringify(updated)); } catch(e){}
                        }}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 7: MASTER AREA UNIT CONVERTER MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <span>Master Area Unit Converter Matrix</span>
          <div className="flex items-center gap-1.5 no-print">
            <button
              type="button"
              onClick={handleSaveConv}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={() => handleCopy(`Converted ${convVal} ${convUnit}² = ${convMatrix.formatted.sqFeet} ft² | ${convMatrix.formatted.acres} ac | ${convMatrix.formatted.hectares} ha`, "conv")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedId === "conv" ? <CheckCircle2 className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedId === "conv" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={() => downloadCSV(`area-conversions-${convVal}-${convUnit}-${Date.now()}.csv`, [
                ["Input Value", "Input Unit", "Square Meters", "Square Feet", "Acres", "Hectares", "Square Inches", "Square Yards", "Square Miles"],
                [convVal, `${convUnit}²`, convMatrix.formatted.sqMeters, convMatrix.formatted.sqFeet, convMatrix.formatted.acres, convMatrix.formatted.hectares, convMatrix.formatted.sqInches, convMatrix.formatted.sqYards, convMatrix.formatted.sqMiles]
              ])}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Export CSV"
            >
              <Download className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label htmlFor="conv-val-input" className="block text-xs font-bold mb-1">Area Value:</label>
              <input
                id="conv-val-input"
                type="number"
                step="any"
                value={convVal}
                onChange={(e) => setConvVal(e.target.value)}
                placeholder="e.g. 1"
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
              />
            </div>

            <div>
              <label htmlFor="conv-base-unit-select" className="block text-xs font-bold mb-1">Base Area Unit:</label>
              <select
                id="conv-base-unit-select"
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
                <tr><td className="p-2 font-bold font-sans">Square Meters (m²)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{convMatrix.formatted.sqMeters}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Square Centimeters (cm²)</td><td className="p-2 font-bold">{convMatrix.formatted.sqCentimeters}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Square Millimeters (mm²)</td><td className="p-2 font-bold">{convMatrix.formatted.sqMillimeters}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Square Feet (ft²)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{convMatrix.formatted.sqFeet}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Square Inches (in²)</td><td className="p-2 font-bold">{convMatrix.formatted.sqInches}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Square Yards (yd²)</td><td className="p-2 font-bold">{convMatrix.formatted.sqYards}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Acres (ac)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{convMatrix.formatted.acres}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Hectares (ha)</td><td className="p-2 text-blue-600 dark:text-blue-400 font-bold">{convMatrix.formatted.hectares}</td></tr>
                <tr><td className="p-2 font-bold font-sans">Square Miles (sq mi)</td><td className="p-2 font-bold">{convMatrix.formatted.sqMiles}</td></tr>
              </tbody>
            </table>
          </div>

          {/* SAVED CONVERSIONS */}
          {savedConvItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600">Saved Area Conversions ({savedConvItems.length})</span>
                <button
                  type="button"
                  onClick={() => { setSavedConvItems([]); try { localStorage.removeItem("saved_area_conv"); } catch(e){} }}
                  className="text-xs text-red-600 font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {savedConvItems.map((item) => (
                  <div key={item.id} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{item.title}</span>
                      <span className="text-[10px] text-slate-500">{item.result}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleLoadConv(item)}
                        className="text-blue-600 hover:text-blue-800 text-[10px] font-bold p-1 cursor-pointer flex items-center gap-0.5"
                      >
                        <RotateCcw className="w-3 h-3" /> Load
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = savedConvItems.filter(i => i.id !== item.id);
                          setSavedConvItems(updated);
                          try { localStorage.setItem("saved_area_conv", JSON.stringify(updated)); } catch(e){}
                        }}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
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

export default AreaCalculator;
