"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Zap,
  Compass,
  GitBranch,
  Copy,
  Check,
  Download,
  FileSpreadsheet,
  RotateCcw,
  AlertTriangle
} from "lucide-react";
import { jsPDF } from "jspdf";
import {
  computeTwoPointSlope,
  computePointSlopeDistance,
  computeParallelPerpLine,
  computeAngleBetweenLines,
  TwoPointSlopeResult,
  PointSlopeDistanceResult,
  ParallelPerpLineResult,
  AngleBetweenLinesResult
} from "@/app/calculators/slope-calculator/slope-logic";

export interface SavedSlopeItem {
  id: string;
  moduleKey: "twopt" | "ptdist" | "par" | "angle";
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  payload: Record<string, any>;
  timestamp: string;
}

export function SlopeCalculator() {
  // CARD 1: Two-Point Slope String Inputs
  const [x1Str, setX1Str] = useState<string>("1");
  const [y1Str, setY1Str] = useState<string>("1");
  const [x2Str, setX2Str] = useState<string>("4");
  const [y2Str, setY2Str] = useState<string>("7");
  const [precision1, setPrecision1] = useState<number>(4);

  // CARD 2: Point, Slope & Distance String Inputs
  const [ptX1Str, setPtX1Str] = useState<string>("1");
  const [ptY1Str, setPtY1Str] = useState<string>("1");
  const [distStr, setDistStr] = useState<string>("5");
  const [ptKnownType, setPtKnownType] = useState<"slope" | "angle">("slope");
  const [ptValStr, setPtValStr] = useState<string>("0.75");

  // CARD 3: Parallel & Perpendicular Line String Inputs
  const [parMStr, setParMStr] = useState<string>("2");
  const [targetXStr, setTargetXStr] = useState<string>("3");
  const [targetYStr, setTargetYStr] = useState<string>("4");
  const [isParOriginalVertical, setIsParOriginalVertical] = useState<boolean>(false);

  // CARD 4: Angle Between 2 Intersecting Lines String Inputs
  const [lineM1Str, setLineM1Str] = useState<string>("1");
  const [lineM2Str, setLineM2Str] = useState<string>("-2");

  // Copy Feedback state per card
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  // Saved calculation states
  const [savedTwoPtItems, setSavedTwoPtItems] = useState<SavedSlopeItem[]>([]);
  const [justSavedTwoPt, setJustSavedTwoPt] = useState<boolean>(false);

  const [savedPtDistItems, setSavedPtDistItems] = useState<SavedSlopeItem[]>([]);
  const [justSavedPtDist, setJustSavedPtDist] = useState<boolean>(false);

  const [savedParItems, setSavedParItems] = useState<SavedSlopeItem[]>([]);
  const [justSavedPar, setJustSavedPar] = useState<boolean>(false);

  const [savedAngleItems, setSavedAngleItems] = useState<SavedSlopeItem[]>([]);
  const [justSavedAngle, setJustSavedAngle] = useState<boolean>(false);

  // Expand state
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_slope_twopt"); if (s1) setSavedTwoPtItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_slope_ptdist"); if (s2) setSavedPtDistItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_slope_par"); if (s3) setSavedParItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_slope_angle"); if (s4) setSavedAngleItems(JSON.parse(s4));
    } catch (e) {}
  }, []);

  // Parse Numbers Safely for Calculations
  const x1 = useMemo(() => (x1Str === "" || isNaN(Number(x1Str)) ? 0 : Number(x1Str)), [x1Str]);
  const y1 = useMemo(() => (y1Str === "" || isNaN(Number(y1Str)) ? 0 : Number(y1Str)), [y1Str]);
  const x2 = useMemo(() => (x2Str === "" || isNaN(Number(x2Str)) ? 0 : Number(x2Str)), [x2Str]);
  const y2 = useMemo(() => (y2Str === "" || isNaN(Number(y2Str)) ? 0 : Number(y2Str)), [y2Str]);

  const ptX1 = useMemo(() => (ptX1Str === "" || isNaN(Number(ptX1Str)) ? 0 : Number(ptX1Str)), [ptX1Str]);
  const ptY1 = useMemo(() => (ptY1Str === "" || isNaN(Number(ptY1Str)) ? 0 : Number(ptY1Str)), [ptY1Str]);
  const dist = useMemo(() => (distStr === "" || isNaN(Number(distStr)) ? 0 : Number(distStr)), [distStr]);
  const ptVal = useMemo(() => (ptValStr === "" || isNaN(Number(ptValStr)) ? 0 : Number(ptValStr)), [ptValStr]);

  const parM = useMemo(() => (parMStr === "" || isNaN(Number(parMStr)) ? 0 : Number(parMStr)), [parMStr]);
  const targetX = useMemo(() => (targetXStr === "" || isNaN(Number(targetXStr)) ? 0 : Number(targetXStr)), [targetXStr]);
  const targetY = useMemo(() => (targetYStr === "" || isNaN(Number(targetYStr)) ? 0 : Number(targetYStr)), [targetYStr]);

  const lineM1 = useMemo(() => (lineM1Str === "" || isNaN(Number(lineM1Str)) ? 0 : Number(lineM1Str)), [lineM1Str]);
  const lineM2 = useMemo(() => (lineM2Str === "" || isNaN(Number(lineM2Str)) ? 0 : Number(lineM2Str)), [lineM2Str]);

  // Card 1 Calculation
  const twoPtResult: TwoPointSlopeResult = useMemo(() => {
    return computeTwoPointSlope(x1, y1, x2, y2, precision1);
  }, [x1, y1, x2, y2, precision1]);

  // Card 2 Calculation
  const ptDistResult: PointSlopeDistanceResult = useMemo(() => {
    return computePointSlopeDistance(ptX1, ptY1, dist, ptKnownType, ptVal, precision1);
  }, [ptX1, ptY1, dist, ptKnownType, ptVal, precision1]);

  // Card 3 Calculation
  const parResult: ParallelPerpLineResult = useMemo(() => {
    return computeParallelPerpLine(isParOriginalVertical ? null : parM, targetX, targetY, precision1);
  }, [isParOriginalVertical, parM, targetX, targetY, precision1]);

  // Card 4 Calculation (Angle between 2 lines)
  const angleBetweenResult: AngleBetweenLinesResult = useMemo(() => {
    return computeAngleBetweenLines(lineM1, lineM2, precision1);
  }, [lineM1, lineM2, precision1]);

  // Presets Handler
  const handleApplyPreset = (preset: "steep" | "diagonal" | "down" | "vertical" | "horizontal" | "coincident") => {
    if (preset === "steep") {
      setX1Str("1"); setY1Str("1"); setX2Str("4"); setY2Str("7");
    } else if (preset === "diagonal") {
      setX1Str("0"); setY1Str("0"); setX2Str("5"); setY2Str("5");
    } else if (preset === "down") {
      setX1Str("2"); setY1Str("8"); setX2Str("6"); setY2Str("0");
    } else if (preset === "vertical") {
      setX1Str("3"); setY1Str("1"); setX2Str("3"); setY2Str("9");
    } else if (preset === "horizontal") {
      setX1Str("2"); setY1Str("5"); setX2Str("10"); setY2Str("5");
    } else if (preset === "coincident") {
      setX1Str("5"); setY1Str("5"); setX2Str("5"); setY2Str("5");
    }
  };

  // Save Handlers with snapshots
  const handleSaveTwoPt = () => {
    const inputsStr = `Point 1 (${x1Str}, ${y1Str}), Point 2 (${x2Str}, ${y2Str})`;
    const resList = twoPtResult.isCoincident
      ? [`Status: Invalid (Coincident Points)`, `Error: ${twoPtResult.errorMessage}`]
      : [
          `Slope m = ${twoPtResult.isVertical ? "Undefined (Vertical)" : twoPtResult.slopeFormatted}`,
          `Angle θ = ${twoPtResult.angleDegFormatted}°`,
          `Distance d = ${twoPtResult.distanceFormatted}`,
          `Line Equation: ${twoPtResult.slopeInterceptForm}`
        ];
    const newItem: SavedSlopeItem = {
      id: Date.now().toString(),
      moduleKey: "twopt",
      title: twoPtResult.isCoincident ? "Coincident Points" : `Slope m = ${twoPtResult.slopeFormatted}`,
      inputs: inputsStr,
      operation: `Two-Point Slope Engine`,
      result: resList.join(" | "),
      resultsList: resList,
      payload: { x1: x1Str, y1: y1Str, x2: x2Str, y2: y2Str, precision: precision1 },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedTwoPtItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedTwoPtItems(updated);
    try { localStorage.setItem("saved_slope_twopt", JSON.stringify(updated)); } catch (e) {}
    setJustSavedTwoPt(true); setTimeout(() => setJustSavedTwoPt(false), 2000);
  };

  const handleSavePtDist = () => {
    const inputsStr = `Point (${ptX1Str}, ${ptY1Str}), d = ${distStr}, ${ptKnownType} = ${ptValStr}`;
    const resList = ptDistResult.errorMessage
      ? [`Status: Validation Error`, `Message: ${ptDistResult.errorMessage}`]
      : [
          `Primary Endpoint: (${ptDistResult.x2Formatted}, ${ptDistResult.y2Formatted})`,
          `Opposite Endpoint: (${ptDistResult.x2OppositeFormatted}, ${ptDistResult.y2OppositeFormatted})`,
          `Slope m = ${ptDistResult.slopeFormatted}`,
          `Angle θ = ${ptDistResult.angleDegFormatted}°`
        ];
    const newItem: SavedSlopeItem = {
      id: Date.now().toString(),
      moduleKey: "ptdist",
      title: `Endpoint (${ptDistResult.x2Formatted}, ${ptDistResult.y2Formatted})`,
      inputs: inputsStr,
      operation: `Point, Slope & Distance Solver`,
      result: resList.join(" | "),
      resultsList: resList,
      payload: { ptX1: ptX1Str, ptY1: ptY1Str, dist: distStr, ptKnownType, ptVal: ptValStr },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedPtDistItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedPtDistItems(updated);
    try { localStorage.setItem("saved_slope_ptdist", JSON.stringify(updated)); } catch (e) {}
    setJustSavedPtDist(true); setTimeout(() => setJustSavedPtDist(false), 2000);
  };

  const handleSavePar = () => {
    const inputsStr = isParOriginalVertical
      ? `Original Line: Vertical (x = ${targetXStr}), Target Point (${targetXStr}, ${targetYStr})`
      : `Original Slope m = ${parMStr}, Target Point (${targetXStr}, ${targetYStr})`;
    const resList = [
      `Parallel Line: ${parResult.parallelEq}`,
      `Perpendicular Line: ${parResult.perpEq}`
    ];
    const newItem: SavedSlopeItem = {
      id: Date.now().toString(),
      moduleKey: "par",
      title: `Parallel: ${parResult.parallelEq}`,
      inputs: inputsStr,
      operation: `Parallel & Perpendicular Generator`,
      result: resList.join(" | "),
      resultsList: resList,
      payload: { parM: parMStr, targetX: targetXStr, targetY: targetYStr, isParOriginalVertical },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedParItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedParItems(updated);
    try { localStorage.setItem("saved_slope_par", JSON.stringify(updated)); } catch (e) {}
    setJustSavedPar(true); setTimeout(() => setJustSavedPar(false), 2000);
  };

  const handleSaveAngle = () => {
    const inputsStr = `m₁ = ${lineM1Str}, m₂ = ${lineM2Str}`;
    const resList = [
      `Acute Angle: ${angleBetweenResult.acuteDegFormatted}° (${angleBetweenResult.acuteRadFormatted} rad)`,
      `Obtuse Angle: ${angleBetweenResult.obtuseDegFormatted}° (${angleBetweenResult.obtuseRadFormatted} rad)`,
      `tan(θ) = ${angleBetweenResult.tanThetaStr}`
    ];
    const newItem: SavedSlopeItem = {
      id: Date.now().toString(),
      moduleKey: "angle",
      title: `Intersection Angle = ${angleBetweenResult.acuteDegFormatted}°`,
      inputs: inputsStr,
      operation: `Angle Between Intersecting Lines`,
      result: resList.join(" | "),
      resultsList: resList,
      payload: { lineM1: lineM1Str, lineM2: lineM2Str },
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...savedAngleItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedAngleItems(updated);
    try { localStorage.setItem("saved_slope_angle", JSON.stringify(updated)); } catch (e) {}
    setJustSavedAngle(true); setTimeout(() => setJustSavedAngle(false), 2000);
  };

  // Restore/Load Handlers
  const handleLoadItem = (item: SavedSlopeItem) => {
    if (item.moduleKey === "twopt" && item.payload) {
      if (item.payload.x1 !== undefined) setX1Str(String(item.payload.x1));
      if (item.payload.y1 !== undefined) setY1Str(String(item.payload.y1));
      if (item.payload.x2 !== undefined) setX2Str(String(item.payload.x2));
      if (item.payload.y2 !== undefined) setY2Str(String(item.payload.y2));
      if (item.payload.precision !== undefined) setPrecision1(Number(item.payload.precision));
    } else if (item.moduleKey === "ptdist" && item.payload) {
      if (item.payload.ptX1 !== undefined) setPtX1Str(String(item.payload.ptX1));
      if (item.payload.ptY1 !== undefined) setPtY1Str(String(item.payload.ptY1));
      if (item.payload.dist !== undefined) setDistStr(String(item.payload.dist));
      if (item.payload.ptKnownType !== undefined) setPtKnownType(item.payload.ptKnownType);
      if (item.payload.ptVal !== undefined) setPtValStr(String(item.payload.ptVal));
    } else if (item.moduleKey === "par" && item.payload) {
      if (item.payload.parM !== undefined) setParMStr(String(item.payload.parM));
      if (item.payload.targetX !== undefined) setTargetXStr(String(item.payload.targetX));
      if (item.payload.targetY !== undefined) setTargetYStr(String(item.payload.targetY));
      if (item.payload.isParOriginalVertical !== undefined) setIsParOriginalVertical(Boolean(item.payload.isParOriginalVertical));
    } else if (item.moduleKey === "angle" && item.payload) {
      if (item.payload.lineM1 !== undefined) setLineM1Str(String(item.payload.lineM1));
      if (item.payload.lineM2 !== undefined) setLineM2Str(String(item.payload.lineM2));
    }
  };

  // Copy Content Builders
  const getCopyContentCard1 = () => {
    if (twoPtResult.isCoincident) {
      return `SLOPE CALCULATOR — TWO-POINT ENGINE\nPoint 1: (${x1}, ${y1})\nPoint 2: (${x2}, ${y2})\nStatus: INVALID — ${twoPtResult.errorMessage}\nDistance: 0`;
    }
    return `SLOPE CALCULATOR — TWO-POINT ENGINE\nPoint 1: (${x1}, ${y1})\nPoint 2: (${x2}, ${y2})\nSlope m: ${twoPtResult.slopeFormatted}\nIncline Angle θ: ${twoPtResult.angleDegFormatted}° (${twoPtResult.angleRadFormatted} rad)\nDistance d: ${twoPtResult.distanceFormatted}\nRun Δx: ${twoPtResult.deltaXFormatted}\nRise Δy: ${twoPtResult.deltaYFormatted}\nSlope-Intercept Form: ${twoPtResult.slopeInterceptForm}\nPoint-Slope Form: ${twoPtResult.pointSlopeForm}\nStandard Form: ${twoPtResult.standardForm}\n\nStep-by-Step Derivation:\n${twoPtResult.stepText}`;
  };

  const getCopyContentCard2 = () => {
    if (ptDistResult.errorMessage) {
      return `ENDPOINT SOLVER\nInitial Point: (${ptX1}, ${ptY1})\nDistance: ${dist}\nStatus: ERROR — ${ptDistResult.errorMessage}`;
    }
    return `ENDPOINT SOLVER\nInitial Point: (${ptX1}, ${ptY1})\nDistance: ${dist}\nMode: ${ptKnownType === "slope" ? `Slope m = ${ptVal}` : `Angle θ = ${ptVal}°`}\nPrimary Endpoint: (${ptDistResult.x2Formatted}, ${ptDistResult.y2Formatted})\nCollinear Opposite Endpoint: (${ptDistResult.x2OppositeFormatted}, ${ptDistResult.y2OppositeFormatted})\nSlope m: ${ptDistResult.slopeFormatted}\nIncline Angle θ: ${ptDistResult.angleDegFormatted}°\n\nDerivation:\n${ptDistResult.stepText}`;
  };

  const getCopyContentCard3 = () => {
    return `PARALLEL & PERPENDICULAR LINE GENERATOR\nOriginal Line: ${isParOriginalVertical ? "Vertical Line" : `Slope m = ${parM}`}\nTarget Point: (${targetX}, ${targetY})\nParallel Line Equation: ${parResult.parallelEq}\nPerpendicular Line Equation: ${parResult.perpEq}\nPerpendicular Slope m⊥: ${parResult.perpSlopeFormatted}\n\nDerivation:\n${parResult.stepText}`;
  };

  const getCopyContentCard4 = () => {
    return `ANGLE BETWEEN INTERSECTING LINES\nLine 1 Slope m₁: ${lineM1}\nLine 2 Slope m₂: ${lineM2}\nAcute Intersection Angle: ${angleBetweenResult.acuteDegFormatted}° (${angleBetweenResult.acuteRadFormatted} rad)\nObtuse Intersection Angle: ${angleBetweenResult.obtuseDegFormatted}° (${angleBetweenResult.obtuseRadFormatted} rad)\ntan(θ): ${angleBetweenResult.tanThetaStr}\n\nDerivation:\n${angleBetweenResult.stepText}`;
  };

  // Real CSV Export Function
  const handleExportCSV = () => {
    const timestamp = new Date().toISOString();
    const rows = [
      ["Module", "Input Parameters", "Metric / Description", "Formula", "Calculated Value", "Formatted Value", "Equation", "Step / Notes", "Timestamp"],
      [
        "Two-Point Slope Engine",
        `P1=(${x1},${y1}), P2=(${x2},${y2})`,
        "Slope (m)",
        "m = (y2 - y1) / (x2 - x1)",
        twoPtResult.slope !== null ? String(twoPtResult.slope) : "Undefined",
        twoPtResult.slopeFormatted,
        twoPtResult.slopeInterceptForm,
        twoPtResult.stepText.replace(/\n/g, " | "),
        timestamp
      ],
      [
        "Two-Point Slope Engine",
        `P1=(${x1},${y1}), P2=(${x2},${y2})`,
        "Incline Angle (θ)",
        "θ = arctan(m)",
        twoPtResult.angleDeg !== null ? String(twoPtResult.angleDeg) : "N/A",
        twoPtResult.angleDegFormatted,
        "",
        `Distance d = ${twoPtResult.distanceFormatted}`,
        timestamp
      ],
      [
        "Endpoint Solver",
        `P1=(${ptX1},${ptY1}), d=${dist}, ${ptKnownType}=${ptVal}`,
        "Solved Endpoint (x2, y2)",
        "x2 = x1 + d·cos(θ), y2 = y1 + d·sin(θ)",
        `(${ptDistResult.x2}, ${ptDistResult.y2})`,
        `(${ptDistResult.x2Formatted}, ${ptDistResult.y2Formatted})`,
        "",
        ptDistResult.stepText.replace(/\n/g, " | "),
        timestamp
      ],
      [
        "Parallel & Perpendicular",
        `m=${isParOriginalVertical ? "Undefined (Vertical)" : parM}, Point=(${targetX},${targetY})`,
        "Parallel & Perpendicular Equations",
        "Parallel: y = mx + b, Perp: m⊥ = -1/m",
        "",
        "",
        `Parallel: ${parResult.parallelEq} | Perp: ${parResult.perpEq}`,
        parResult.stepText.replace(/\n/g, " | "),
        timestamp
      ],
      [
        "Angle Between Lines",
        `m1=${lineM1}, m2=${lineM2}`,
        "Intersection Angles",
        "tan(θ) = |(m2 - m1)/(1 + m1·m2)|",
        String(angleBetweenResult.acuteDeg),
        `Acute: ${angleBetweenResult.acuteDegFormatted}°, Obtuse: ${angleBetweenResult.obtuseDegFormatted}°`,
        `tan(θ) = ${angleBetweenResult.tanThetaStr}`,
        angleBetweenResult.stepText.replace(/\n/g, " | "),
        timestamp
      ]
    ];

    const csvContent = rows
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `slope_calculator_suite_export_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Real PDF Export Function using jsPDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    let y = 45;

    // Header Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235); // Blue-600
    doc.text("Slope Calculator & Line Geometry Report", margin, y);
    y += 18;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text(`Generated on ${new Date().toLocaleString()} | CalcPlatform Coordinate Geometry Suite`, margin, y);
    y += 24;

    const drawSectionHeader = (title: string) => {
      if (y > pageHeight - 100) {
        doc.addPage();
        y = 45;
      }
      doc.setFillColor(37, 99, 235);
      doc.rect(margin, y, pageWidth - margin * 2, 20, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + 8, y + 14);
      y += 26;
    };

    const drawRow = (label: string, value: string) => {
      if (y > pageHeight - 40) {
        doc.addPage();
        y = 45;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text(label, margin, y);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(15, 23, 42);
      doc.text(value, margin + 180, y);
      y += 15;
    };

    // 1. Two-Point Slope
    drawSectionHeader("1. Two-Point Slope & Line Equation Engine");
    drawRow("Input Point 1:", `(X₁ = ${x1}, Y₁ = ${y1})`);
    drawRow("Input Point 2:", `(X₂ = ${x2}, Y₂ = ${y2})`);
    if (twoPtResult.isCoincident) {
      drawRow("Geometric Status:", "INVALID — Coincident Points (P1 = P2)");
      drawRow("Validation Note:", twoPtResult.errorMessage || "");
    } else {
      drawRow("Calculated Slope (m):", twoPtResult.slopeFormatted);
      drawRow("Incline Angle (θ):", `${twoPtResult.angleDegFormatted}° (${twoPtResult.angleRadFormatted} rad)`);
      drawRow("Euclidean Distance (d):", twoPtResult.distanceFormatted);
      drawRow("Horizontal Run (Δx):", twoPtResult.deltaXFormatted);
      drawRow("Vertical Rise (Δy):", twoPtResult.deltaYFormatted);
      drawRow("Slope-Intercept Form:", twoPtResult.slopeInterceptForm);
      drawRow("Point-Slope Form:", twoPtResult.pointSlopeForm);
      drawRow("Standard Form (Ax + By = C):", twoPtResult.standardForm);
    }
    y += 10;

    // 2. Endpoint Solver
    drawSectionHeader("2. Point, Slope & Distance Endpoint Solver");
    drawRow("Initial Point:", `(X₁ = ${ptX1}, Y₁ = ${ptY1})`);
    drawRow("Displacement Distance (d):", String(dist));
    drawRow("Specified Direction:", ptKnownType === "slope" ? `Slope m = ${ptVal}` : `Angle θ = ${ptVal}°`);
    if (ptDistResult.errorMessage) {
      drawRow("Validation Status:", `ERROR — ${ptDistResult.errorMessage}`);
    } else {
      drawRow("Solved Primary Endpoint:", `(${ptDistResult.x2Formatted}, ${ptDistResult.y2Formatted})`);
      drawRow("Collinear Opposite Endpoint:", `(${ptDistResult.x2OppositeFormatted}, ${ptDistResult.y2OppositeFormatted})`);
      drawRow("Calculated Vector Slope:", ptDistResult.slopeFormatted);
      drawRow("Incline Angle:", `${ptDistResult.angleDegFormatted}°`);
    }
    y += 10;

    // 3. Parallel & Perpendicular
    drawSectionHeader("3. Parallel & Perpendicular Line Generator");
    drawRow("Source Line Orientation:", isParOriginalVertical ? "Vertical Line (Undefined Slope)" : `Slope m = ${parM}`);
    drawRow("Target Intersect Point:", `(X₀ = ${targetX}, Y₀ = ${targetY})`);
    drawRow("Parallel Line Equation:", parResult.parallelEq);
    drawRow("Perpendicular Line Equation:", parResult.perpEq);
    drawRow("Perpendicular Slope (m⊥):", parResult.perpSlopeFormatted);
    y += 10;

    // 4. Angle Between Intersecting Lines
    drawSectionHeader("4. Angle Between Intersecting Lines Engine");
    drawRow("Line 1 Slope (m₁):", String(lineM1));
    drawRow("Line 2 Slope (m₂):", String(lineM2));
    drawRow("Acute Intersection Angle:", `${angleBetweenResult.acuteDegFormatted}° (${angleBetweenResult.acuteRadFormatted} radians)`);
    drawRow("Obtuse Supplementary Angle:", `${angleBetweenResult.obtuseDegFormatted}° (${angleBetweenResult.obtuseRadFormatted} radians)`);
    drawRow("Tangent Ratio tan(θ):", angleBetweenResult.tanThetaStr);

    doc.save(`slope_line_geometry_report_${Date.now()}.pdf`);
  };

  // Robust Dynamic Cartesian SVG Renderer with Dynamic Scaling & Accessible Semantics
  const renderCartesianSVG = (px1: number, py1: number, px2: number, py2: number, isCoincident: boolean = false) => {
    const width = 260;
    const height = 190;
    const innerPadding = 30;

    // Compute bounding box with dynamic scaling to prevent clipping
    const minXVal = Math.min(px1, px2, 0);
    const maxXVal = Math.max(px1, px2, 0);
    const minYVal = Math.min(py1, py2, 0);
    const maxYVal = Math.max(py1, py2, 0);

    const spanX = Math.max(Math.abs(maxXVal - minXVal), 4);
    const spanY = Math.max(Math.abs(maxYVal - minYVal), 4);

    const padX = Math.max(2, spanX * 0.18);
    const padY = Math.max(2, spanY * 0.18);

    const minX = minXVal - padX;
    const maxX = maxXVal + padX;
    const minY = minYVal - padY;
    const maxY = maxYVal + padY;

    const scaleX = (x: number) => innerPadding + ((x - minX) / (maxX - minX)) * (width - 2 * innerPadding);
    const scaleY = (y: number) => height - innerPadding - ((y - minY) / (maxY - minY)) * (height - 2 * innerPadding);

    const x1Svg = scaleX(px1);
    const y1Svg = scaleY(py1);
    const x2Svg = scaleX(px2);
    const y2Svg = scaleY(py2);
    const originX = Math.max(innerPadding, Math.min(width - innerPadding, scaleX(0)));
    const originY = Math.max(innerPadding, Math.min(height - innerPadding, scaleY(0)));

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-64 h-48 select-none"
        role="img"
        aria-label="2D Cartesian Coordinate Visualizer"
      >
        <title>2D Cartesian Coordinate Visualizer</title>
        <desc>Graph displaying coordinates, slope rise, run, and line orientation</desc>
        <rect width={width} height={height} fill="#f8fafc" rx="12" className="dark:fill-slate-800/40" />

        {/* X and Y Axes */}
        <line x1={innerPadding / 2} y1={originY} x2={width - innerPadding / 2} y2={originY} stroke="#94a3b8" strokeWidth="1.5" />
        <line x1={originX} y1={innerPadding / 2} x2={originX} y2={height - innerPadding / 2} stroke="#94a3b8" strokeWidth="1.5" />
        <text x={width - 16} y={originY - 4} className="text-[9px] font-mono font-bold fill-slate-500">X</text>
        <text x={originX + 4} y={14} className="text-[9px] font-mono font-bold fill-slate-500">Y</text>

        {isCoincident ? (
          <g>
            <circle cx={x1Svg} cy={y1Svg} r="6" fill="#ef4444" />
            <text x={x1Svg + 8} y={y1Svg - 8} className="text-[10px] font-mono font-extrabold fill-red-600 dark:fill-red-400">
              P₁ = P₂ ({px1}, {py1})
            </text>
          </g>
        ) : (
          <g>
            {/* Rise (Δy) line */}
            <line x1={x2Svg} y1={y1Svg} x2={x2Svg} y2={y2Svg} stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x={x2Svg + 6} y={(y1Svg + y2Svg) / 2 + 3} className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">
              Δy
            </text>

            {/* Run (Δx) line */}
            <line x1={x1Svg} y1={y1Svg} x2={x2Svg} y2={y1Svg} stroke="#2563eb" strokeWidth="2" strokeDasharray="3,3" />
            <text x={(x1Svg + x2Svg) / 2} y={y1Svg + 13} textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400">
              Δx
            </text>

            {/* Hypotenuse (Distance d) / Slope Line */}
            <line x1={x1Svg} y1={y1Svg} x2={x2Svg} y2={y2Svg} stroke="#16a34a" strokeWidth="2.5" />
            <text x={(x1Svg + x2Svg) / 2 - 8} y={(y1Svg + y2Svg) / 2 - 6} className="text-[10px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400">
              d
            </text>

            {/* Point 1 */}
            <circle cx={x1Svg} cy={y1Svg} r="4" fill="#2563eb" />
            <text x={x1Svg - 12} y={y1Svg - 6} className="text-[9px] font-mono font-bold fill-blue-700 dark:fill-blue-300">
              ({px1}, {py1})
            </text>

            {/* Point 2 */}
            <circle cx={x2Svg} cy={y2Svg} r="4" fill="#16a34a" />
            <text x={x2Svg + 6} y={y2Svg - 6} className="text-[9px] font-mono font-bold fill-emerald-700 dark:fill-emerald-300">
              ({px2}, {py2})
            </text>
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* GLOBAL ACTION BAR: CSV & PDF EXPORTS */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
            Coordinate Geometry Export Suite
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
            title="Download CSV report of current calculations"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            title="Download PDF report of current calculations"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: TWO-POINT SLOPE & LINE EQUATION ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Two-Point Slope &amp; Line Equation Engine</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => copyToClipboard(getCopyContentCard1(), "card1")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy calculation results to clipboard"
            >
              {copiedKey === "card1" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedKey === "card1" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleSaveTwoPt}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedTwoPt ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* QUICK PRESETS BAR */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className="text-slate-500 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" /> Presets:
            </span>
            <button
              type="button"
              onClick={() => handleApplyPreset("steep")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (1, 1) to (4, 7) [m = 2]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("diagonal")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (0, 0) to (5, 5) [45° Incline]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("down")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (2, 8) to (6, 0) [Negative Slope]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("horizontal")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (2, 5) to (10, 5) [Horizontal]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("vertical")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (3, 1) to (3, 9) [Vertical]
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("coincident")}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-500 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              (5, 5) to (5, 5) [Coincident]
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: POINT INPUTS */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span>Known 2D Coordinates</span>
              </h2>

              <div className="space-y-4 text-xs">
                {/* POINT 1 INPUTS */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-extrabold text-blue-600 dark:text-blue-400 block">Point 1 Coordinates (X₁, Y₁)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="slope-x1" className="block text-slate-500 font-bold mb-1">X₁:</label>
                      <input
                        id="slope-x1"
                        type="text"
                        inputMode="decimal"
                        value={x1Str}
                        onChange={(e) => setX1Str(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="slope-y1" className="block text-slate-500 font-bold mb-1">Y₁:</label>
                      <input
                        id="slope-y1"
                        type="text"
                        inputMode="decimal"
                        value={y1Str}
                        onChange={(e) => setY1Str(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* POINT 2 INPUTS */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block">Point 2 Coordinates (X₂, Y₂)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="slope-x2" className="block text-slate-500 font-bold mb-1">X₂:</label>
                      <input
                        id="slope-x2"
                        type="text"
                        inputMode="decimal"
                        value={x2Str}
                        onChange={(e) => setX2Str(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="slope-y2" className="block text-slate-500 font-bold mb-1">Y₂:</label>
                      <input
                        id="slope-y2"
                        type="text"
                        inputMode="decimal"
                        value={y2Str}
                        onChange={(e) => setY2Str(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
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
                        className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${precision1 === p ? "bg-blue-600 text-white shadow-xs" : ""}`}
                      >
                        {p} Dec
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: DASHBOARD & CARTESIAN SVG */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                {/* COINCIDENT VALIDATION ALERT */}
                {twoPtResult.isCoincident ? (
                  <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-extrabold text-sm">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Degenerate Input: Coincident Points</span>
                    </div>
                    <p className="text-xs text-red-600 dark:text-red-300 font-medium leading-relaxed">
                      Point 1 ({x1}, {y1}) and Point 2 ({x2}, {y2}) are the exact same point. Coincident points do NOT uniquely define a straight line (an infinite family of lines pass through a single point). Slope and line equations cannot be determined.
                    </p>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Calculated Slope (m)
                    </span>
                    <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-slate-100 break-all">
                      {twoPtResult.isVertical ? "UNDEFINED (Vertical Line)" : twoPtResult.slopeFormatted}
                    </div>
                    <p className="text-xs font-mono font-bold text-slate-500">
                      Line Equation: <span className="text-blue-600 dark:text-blue-400">{twoPtResult.slopeInterceptForm}</span>
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Incline Angle θ</span>
                    <span className="text-slate-900 dark:text-slate-100">
                      {twoPtResult.isCoincident ? "N/A" : `${twoPtResult.angleDegFormatted}°`}
                    </span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Distance (d)</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{twoPtResult.distanceFormatted}</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Rise (Δy)</span>
                    <span className="text-red-600 dark:text-red-400">{twoPtResult.deltaYFormatted}</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Run (Δx)</span>
                    <span className="text-blue-600 dark:text-blue-400">{twoPtResult.deltaXFormatted}</span>
                  </div>
                </div>

                {/* 2D CARTESIAN SVG VISUALIZER */}
                <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  {renderCartesianSVG(x1, y1, x2, y2, twoPtResult.isCoincident)}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED CALCULATIONS INSIDE CARD 1 */}
          {savedTwoPtItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Two-Point Slope Calculations ({savedTwoPtItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedTwoPtItems([]);
                    try { localStorage.removeItem("saved_slope_twopt"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedTwoPtItems.map((item) => {
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
                            onClick={() => handleLoadItem(item)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Load / restore this calculation into inputs"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedTwoPtItems.filter(i => i.id !== item.id);
                              setSavedTwoPtItems(updated);
                              try { localStorage.setItem("saved_slope_twopt", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
                              Complete Derivation Details:
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
      {/* CARD 2: POINT, SLOPE & DISTANCE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Point, Slope &amp; Distance Endpoint Solver</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => copyToClipboard(getCopyContentCard2(), "card2")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy calculation results to clipboard"
            >
              {copiedKey === "card2" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedKey === "card2" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleSavePtDist}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedPtDist ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <Compass className="h-4 w-4 text-blue-600" />
                <span>Known Point &amp; Slope Input</span>
              </h2>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="pt-x1" className="block font-bold mb-1">X₁:</label>
                  <input
                    id="pt-x1"
                    type="text"
                    inputMode="decimal"
                    value={ptX1Str}
                    onChange={(e) => setPtX1Str(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="pt-y1" className="block font-bold mb-1">Y₁:</label>
                  <input
                    id="pt-y1"
                    type="text"
                    inputMode="decimal"
                    value={ptY1Str}
                    onChange={(e) => setPtY1Str(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="pt-dist" className="block font-bold mb-1">Line Distance (d):</label>
                <input
                  id="pt-dist"
                  type="text"
                  inputMode="decimal"
                  value={distStr}
                  onChange={(e) => setDistStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold mb-1">Select Known Vector Type:</label>
                <div className="flex bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setPtKnownType("slope")}
                    className={`flex-1 py-1 rounded cursor-pointer transition-colors ${ptKnownType === "slope" ? "bg-blue-600 text-white shadow-xs" : ""}`}
                  >
                    Slope (m)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPtKnownType("angle")}
                    className={`flex-1 py-1 rounded cursor-pointer transition-colors ${ptKnownType === "angle" ? "bg-blue-600 text-white shadow-xs" : ""}`}
                  >
                    Incline Angle (θ°)
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="pt-val" className="block font-bold mb-1">
                  Enter {ptKnownType === "slope" ? "Slope (m)" : "Angle (θ°)"}:
                </label>
                <input
                  id="pt-val"
                  type="text"
                  inputMode="decimal"
                  value={ptValStr}
                  onChange={(e) => setPtValStr(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              {ptDistResult.errorMessage ? (
                <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl space-y-1">
                  <span className="text-xs font-extrabold text-red-600 uppercase block">Input Error</span>
                  <p className="text-xs text-red-600 dark:text-red-400 font-bold">{ptDistResult.errorMessage}</p>
                </div>
              ) : (
                <>
                  <span className="text-xs font-extrabold text-blue-600 uppercase block">Solved Primary Endpoint (X₂, Y₂)</span>
                  <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                    ({ptDistResult.x2Formatted}, {ptDistResult.y2Formatted})
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Slope m = {ptDistResult.slopeFormatted} | Incline Angle θ = {ptDistResult.angleDegFormatted}°
                  </p>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Collinear Opposite Direction: <span className="font-bold text-slate-700 dark:text-slate-300">({ptDistResult.x2OppositeFormatted}, {ptDistResult.y2OppositeFormatted})</span>
                  </p>
                </>
              )}

              <div className="w-full flex justify-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {renderCartesianSVG(ptX1, ptY1, ptDistResult.x2, ptDistResult.y2)}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED CALCULATIONS INSIDE CARD 2 */}
          {savedPtDistItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Endpoint Calculations ({savedPtDistItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPtDistItems([]);
                    try { localStorage.removeItem("saved_slope_ptdist"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedPtDistItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleLoadItem(item)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Load / restore this calculation into inputs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedPtDistItems.filter(i => i.id !== item.id);
                            setSavedPtDistItems(updated);
                            try { localStorage.setItem("saved_slope_ptdist", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 font-sans">
                      <div><span className="font-bold text-slate-500">Inputs: </span>{item.inputs}</div>
                      <div className="mt-1 text-slate-900 dark:text-slate-100 font-semibold">{item.result}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: PARALLEL & PERPENDICULAR LINE GENERATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Parallel &amp; Perpendicular Line Generator</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => copyToClipboard(getCopyContentCard3(), "card3")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy calculation results to clipboard"
            >
              {copiedKey === "card3" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedKey === "card3" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleSavePar}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedPar ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <GitBranch className="h-4 w-4 text-blue-600" />
                <span>Line &amp; Target Point Input</span>
              </h2>

              <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300">Original Line Orientation:</span>
                <button
                  type="button"
                  onClick={() => setIsParOriginalVertical(!isParOriginalVertical)}
                  className={`px-2 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                    isParOriginalVertical ? "bg-purple-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {isParOriginalVertical ? "Vertical (Undefined Slope)" : "Standard (Slope m)"}
                </button>
              </div>

              {!isParOriginalVertical && (
                <div>
                  <label htmlFor="par-m" className="block font-bold mb-1">Original Line Slope (m):</label>
                  <input
                    id="par-m"
                    type="text"
                    inputMode="decimal"
                    value={parMStr}
                    onChange={(e) => setParMStr(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="target-x" className="block font-bold mb-1">Target X₀:</label>
                  <input
                    id="target-x"
                    type="text"
                    inputMode="decimal"
                    value={targetXStr}
                    onChange={(e) => setTargetXStr(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="target-y" className="block font-bold mb-1">Target Y₀:</label>
                  <input
                    id="target-y"
                    type="text"
                    inputMode="decimal"
                    value={targetYStr}
                    onChange={(e) => setTargetYStr(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs font-extrabold text-blue-600 uppercase block">Parallel Line Equation</span>
                <div className="text-xl font-mono font-black text-slate-900 dark:text-slate-100">{parResult.parallelEq}</div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs font-extrabold text-emerald-600 uppercase block">Perpendicular Line Equation</span>
                <div className="text-xl font-mono font-black text-slate-900 dark:text-slate-100">{parResult.perpEq}</div>
                <p className="text-xs font-mono font-bold text-slate-500">
                  Perpendicular Slope m⊥ = {parResult.perpSlopeFormatted}
                </p>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED CALCULATIONS INSIDE CARD 3 */}
          {savedParItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Parallel &amp; Perpendicular Calculations ({savedParItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedParItems([]);
                    try { localStorage.removeItem("saved_slope_par"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedParItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleLoadItem(item)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Load / restore this calculation into inputs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedParItems.filter(i => i.id !== item.id);
                            setSavedParItems(updated);
                            try { localStorage.setItem("saved_slope_par", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 font-sans">
                      <div><span className="font-bold text-slate-500">Inputs: </span>{item.inputs}</div>
                      <div className="mt-1 text-slate-900 dark:text-slate-100 font-semibold">{item.result}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: ANGLE BETWEEN 2 INTERSECTING LINES ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Angle Between 2 Intersecting Lines Engine</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => copyToClipboard(getCopyContentCard4(), "card4")}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy calculation results to clipboard"
            >
              {copiedKey === "card4" ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white" />}
              <span>{copiedKey === "card4" ? "Copied!" : "Copy"}</span>
            </button>
            <button
              type="button"
              onClick={handleSaveAngle}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedAngle ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <label htmlFor="line-m1" className="block font-bold mb-1">Line 1 Slope (m₁):</label>
              <input
                id="line-m1"
                type="text"
                inputMode="decimal"
                value={lineM1Str}
                onChange={(e) => setLineM1Str(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="line-m2" className="block font-bold mb-1">Line 2 Slope (m₂):</label>
              <input
                id="line-m2"
                type="text"
                inputMode="decimal"
                value={lineM2Str}
                onChange={(e) => setLineM2Str(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <span className="text-xs font-extrabold uppercase text-blue-600 block">Acute Intersection Angle</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {angleBetweenResult.acuteDegFormatted}°
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                {angleBetweenResult.acuteRadFormatted} radians
              </span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <span className="text-xs font-extrabold uppercase text-purple-600 block">Obtuse Intersection Angle</span>
              <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100">
                {angleBetweenResult.obtuseDegFormatted}°
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                tan(θ) = {angleBetweenResult.tanThetaStr}
              </span>
            </div>
          </div>

          {/* EMBEDDED SAVED CALCULATIONS INSIDE CARD 4 */}
          {savedAngleItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Angle Calculations ({savedAngleItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedAngleItems([]);
                    try { localStorage.removeItem("saved_slope_angle"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedAngleItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleLoadItem(item)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Load / restore this calculation into inputs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedAngleItems.filter(i => i.id !== item.id);
                            setSavedAngleItems(updated);
                            try { localStorage.setItem("saved_slope_angle", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 font-sans">
                      <div><span className="font-bold text-slate-500">Inputs: </span>{item.inputs}</div>
                      <div className="mt-1 text-slate-900 dark:text-slate-100 font-semibold">{item.result}</div>
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

export default SlopeCalculator;
