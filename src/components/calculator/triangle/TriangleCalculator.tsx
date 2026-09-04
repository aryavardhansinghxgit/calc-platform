"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Copy,
  Download,
  FileText,
  Printer,
  CheckCircle2,
  Zap,
  Maximize2,
  Compass,
  ArrowRight
} from "lucide-react";
import jsPDF from "jspdf";
import {
  solveUniversalTriangle,
  SolvedTriangle,
  TriangleSolveResult,
  parseAngleExpression
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
  rawInputs?: Record<string, any>;
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
  const [rtLegAStr, setRtLegAStr] = useState<string>("6");
  const [rtLegBStr, setRtLegBStr] = useState<string>("8");

  // Card 3 Inputs: Inradius & Circumradius Solver
  const [crcSideAStr, setCrcSideAStr] = useState<string>("7");
  const [crcSideBStr, setCrcSideBStr] = useState<string>("8");
  const [crcSideCStr, setCrcSideCStr] = useState<string>("9");

  // Card 4 Inputs: Heron's Formula Solver
  const [heronAStr, setHeronAStr] = useState<string>("5");
  const [heronBStr, setHeronBStr] = useState<string>("6");
  const [heronCStr, setHeronCStr] = useState<string>("7");

  // Saved calculation states
  const [savedUnivItems, setSavedUnivItems] = useState<SavedTriangleItem[]>([]);
  const [justSavedUniv, setJustSavedUniv] = useState<boolean>(false);

  const [savedRtItems, setSavedRtItems] = useState<SavedTriangleItem[]>([]);
  const [justSavedRt, setJustSavedRt] = useState<boolean>(false);

  const [savedCrcItems, setSavedCrcItems] = useState<SavedTriangleItem[]>([]);
  const [justSavedCrc, setJustSavedCrc] = useState<boolean>(false);

  const [savedHeronItems, setSavedHeronItems] = useState<SavedTriangleItem[]>([]);
  const [justSavedHeron, setJustSavedHeron] = useState<boolean>(false);

  // Copy status
  const [copyFeedback, setCopyFeedback] = useState<string>("");

  // Expand state
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
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

  // Card 1 Calculations
  const univSolveResult: TriangleSolveResult = useMemo(() => {
    const a = parseFloat(inA) > 0 ? parseFloat(inA) : undefined;
    const b = parseFloat(inB) > 0 ? parseFloat(inB) : undefined;
    const c = parseFloat(inC) > 0 ? parseFloat(inC) : undefined;
    const A = parseAngleExpression(inAngleA, angleUnit);
    const B = parseAngleExpression(inAngleB, angleUnit);
    const C = parseAngleExpression(inAngleC, angleUnit);

    return solveUniversalTriangle(a, b, c, A, B, C, precision1);
  }, [inA, inB, inC, inAngleA, inAngleB, inAngleC, angleUnit, precision1]);

  const activeSolution: SolvedTriangle | undefined =
    univSolveResult.success && univSolveResult.solutions.length > 0
      ? univSolveResult.solutions[selectedSolutionIndex] || univSolveResult.solutions[0]
      : undefined;

  // Card 2 Calculations (Right Triangle with strict validation)
  const rtSolveResult = useMemo(() => {
    const a = parseFloat(rtLegAStr);
    const b = parseFloat(rtLegBStr);

    if (isNaN(a) || a <= 0 || isNaN(b) || b <= 0 || !isFinite(a) || !isFinite(b)) {
      return { success: false, errorMessage: "Please enter positive numbers greater than zero for both legs." };
    }

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
      success: true,
      a,
      b,
      c,
      area,
      perimeter,
      angleA_deg,
      angleB_deg,
      sinA,
      cosA,
      tanA,
      fmt: {
        a: fmt(a),
        b: fmt(b),
        c: fmt(c),
        area: fmt(area),
        perimeter: fmt(perimeter),
        angleA: fmt(angleA_deg),
        angleB: fmt(angleB_deg),
        sinA: fmt(sinA),
        cosA: fmt(cosA),
        tanA: fmt(tanA)
      }
    };
  }, [rtLegAStr, rtLegBStr, precision1]);

  // Card 3 Calculations (Circle Metrics)
  const crcSolveResult = useMemo(() => {
    const a = parseFloat(crcSideAStr);
    const b = parseFloat(crcSideBStr);
    const c = parseFloat(crcSideCStr);

    if (isNaN(a) || a <= 0 || isNaN(b) || b <= 0 || isNaN(c) || c <= 0) {
      return { success: false, errorMessage: "Please enter valid positive numbers for sides a, b, and c.", solutions: [] };
    }

    return solveUniversalTriangle(a, b, c, undefined, undefined, undefined, precision1);
  }, [crcSideAStr, crcSideBStr, crcSideCStr, precision1]);

  const activeCrcSol = crcSolveResult.success && crcSolveResult.solutions.length > 0 ? crcSolveResult.solutions[0] : undefined;

  // Card 4 Calculations (Heron's & Altitudes)
  const heronSolveResult = useMemo((): TriangleSolveResult => {
    const a = parseFloat(heronAStr);
    const b = parseFloat(heronBStr);
    const c = parseFloat(heronCStr);

    if (isNaN(a) || a <= 0 || isNaN(b) || b <= 0 || isNaN(c) || c <= 0) {
      return { success: false, errorMessage: "Please enter valid positive numbers for sides a, b, and c.", solutions: [] };
    }

    return solveUniversalTriangle(a, b, c, undefined, undefined, undefined, precision1);
  }, [heronAStr, heronBStr, heronCStr, precision1]);

  const activeHeronSol = heronSolveResult.success && heronSolveResult.solutions.length > 0 ? heronSolveResult.solutions[0] : undefined;

  // Quick Presets Handler for Card 1
  const handleApplyPreset = (preset: "345" | "equilateral" | "isosceles" | "306090") => {
    setInAngleA("");
    setInAngleB("");
    setInAngleC("");
    if (preset === "345") {
      setInA("3");
      setInB("4");
      setInC("5");
    } else if (preset === "equilateral") {
      setInA("6");
      setInB("6");
      setInC("6");
    } else if (preset === "isosceles") {
      setInA("5");
      setInB("5");
      setInC("8");
    } else if (preset === "306090") {
      // Set exact algebraic parameters (a=5, c=10, A=30°) ensuring exact 30°-60°-90° angles
      setInA("5");
      setInB("");
      setInC("10");
      setInAngleA("30");
      setAngleUnit("deg");
    }
  };

  // Save Handlers with rawInputs snapshot
  const handleSaveUniv = () => {
    if (!activeSolution) return;
    const inputsStr = `a=${activeSolution.a}, b=${activeSolution.b}, c=${activeSolution.c}`;
    const opStr = `Universal Triangle Calculator (${activeSolution.caseType})`;
    const resList = [
      `Sides: a=${activeSolution.fmt.a}, b=${activeSolution.fmt.b}, c=${activeSolution.fmt.c}`,
      `Angles: A=${activeSolution.fmt.A_deg}°, B=${activeSolution.fmt.B_deg}°, C=${activeSolution.fmt.C_deg}°`,
      `Area K = ${activeSolution.fmt.area}, Perimeter P = ${activeSolution.fmt.perimeter}`,
      `Altitudes: ha=${activeSolution.fmt.ha}, hb=${activeSolution.fmt.hb}, hc=${activeSolution.fmt.hc}`,
      `Inradius r = ${activeSolution.fmt.inradius}, Circumradius R = ${activeSolution.fmt.circumradius}`
    ];

    const newItem: SavedTriangleItem = {
      id: Date.now().toString(),
      title: `Triangle [${activeSolution.a}, ${activeSolution.b}, ${activeSolution.c}] → Area = ${activeSolution.fmt.area}`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Area = ${activeSolution.fmt.area}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawInputs: { inA, inB, inC, inAngleA, inAngleB, inAngleC, angleUnit, precision1 }
    };

    const updated = [newItem, ...savedUnivItems.filter((i) => i.inputs !== inputsStr)].slice(0, 15);
    setSavedUnivItems(updated);
    try {
      localStorage.setItem("saved_tri_univ", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedUniv(true);
    setTimeout(() => setJustSavedUniv(false), 2000);
  };

  const handleLoadUniv = (item: SavedTriangleItem) => {
    if (!item.rawInputs) return;
    setInA(item.rawInputs.inA ?? "");
    setInB(item.rawInputs.inB ?? "");
    setInC(item.rawInputs.inC ?? "");
    setInAngleA(item.rawInputs.inAngleA ?? "");
    setInAngleB(item.rawInputs.inAngleB ?? "");
    setInAngleC(item.rawInputs.inAngleC ?? "");
    if (item.rawInputs.angleUnit) setAngleUnit(item.rawInputs.angleUnit);
    if (item.rawInputs.precision1) setPrecision1(item.rawInputs.precision1);
  };

  const handleSaveRt = () => {
    if (!rtSolveResult.success || !rtSolveResult.fmt) return;
    const inputsStr = `Leg a = ${rtSolveResult.a}, Leg b = ${rtSolveResult.b}`;
    const opStr = `Right Triangle Solver`;
    const resList = [
      `Hypotenuse c = ${rtSolveResult.fmt.c}`,
      `Area = ${rtSolveResult.fmt.area}, Perimeter = ${rtSolveResult.fmt.perimeter}`,
      `Angle A = ${rtSolveResult.fmt.angleA}°, Angle B = ${rtSolveResult.fmt.angleB}°`,
      `sin(A) = ${rtSolveResult.fmt.sinA}, cos(A) = ${rtSolveResult.fmt.cosA}, tan(A) = ${rtSolveResult.fmt.tanA}`
    ];

    const newItem: SavedTriangleItem = {
      id: Date.now().toString(),
      title: `Right Triangle [a=${rtSolveResult.a}, b=${rtSolveResult.b}] → c = ${rtSolveResult.fmt.c}`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `c = ${rtSolveResult.fmt.c}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawInputs: { rtLegAStr, rtLegBStr, precision1 }
    };

    const updated = [newItem, ...savedRtItems.filter((i) => i.inputs !== inputsStr)].slice(0, 15);
    setSavedRtItems(updated);
    try {
      localStorage.setItem("saved_tri_rt", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedRt(true);
    setTimeout(() => setJustSavedRt(false), 2000);
  };

  const handleLoadRt = (item: SavedTriangleItem) => {
    if (!item.rawInputs) return;
    if (item.rawInputs.rtLegAStr !== undefined) setRtLegAStr(item.rawInputs.rtLegAStr);
    if (item.rawInputs.rtLegBStr !== undefined) setRtLegBStr(item.rawInputs.rtLegBStr);
    if (item.rawInputs.precision1) setPrecision1(item.rawInputs.precision1);
  };

  const handleSaveCrc = () => {
    if (!activeCrcSol) return;
    const inputsStr = `a=${activeCrcSol.a}, b=${activeCrcSol.b}, c=${activeCrcSol.c}`;
    const opStr = `Inradius & Circumradius Solver`;
    const resList = [
      `Inradius r = ${activeCrcSol.fmt.inradius}`,
      `Circumradius R = ${activeCrcSol.fmt.circumradius}`,
      `Triangle Area K = ${activeCrcSol.fmt.area}`
    ];

    const newItem: SavedTriangleItem = {
      id: Date.now().toString(),
      title: `Circle Metrics [r=${activeCrcSol.fmt.inradius}, R=${activeCrcSol.fmt.circumradius}]`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `r = ${activeCrcSol.fmt.inradius}, R = ${activeCrcSol.fmt.circumradius}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawInputs: { crcSideAStr, crcSideBStr, crcSideCStr, precision1 }
    };

    const updated = [newItem, ...savedCrcItems.filter((i) => i.inputs !== inputsStr)].slice(0, 15);
    setSavedCrcItems(updated);
    try {
      localStorage.setItem("saved_tri_crc", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedCrc(true);
    setTimeout(() => setJustSavedCrc(false), 2000);
  };

  const handleLoadCrc = (item: SavedTriangleItem) => {
    if (!item.rawInputs) return;
    if (item.rawInputs.crcSideAStr !== undefined) setCrcSideAStr(item.rawInputs.crcSideAStr);
    if (item.rawInputs.crcSideBStr !== undefined) setCrcSideBStr(item.rawInputs.crcSideBStr);
    if (item.rawInputs.crcSideCStr !== undefined) setCrcSideCStr(item.rawInputs.crcSideCStr);
    if (item.rawInputs.precision1) setPrecision1(item.rawInputs.precision1);
  };

  const handleSaveHeron = () => {
    if (!activeHeronSol) return;
    const inputsStr = `a=${activeHeronSol.a}, b=${activeHeronSol.b}, c=${activeHeronSol.c}`;
    const opStr = `Heron's Formula & Altitudes`;
    const resList = [
      `Area K = ${activeHeronSol.fmt.area}`,
      `Semi-perimeter s = ${activeHeronSol.fmt.semiPerimeter}`,
      `Altitudes: ha=${activeHeronSol.fmt.ha}, hb=${activeHeronSol.fmt.hb}, hc=${activeHeronSol.fmt.hc}`,
      `Medians: ma=${activeHeronSol.fmt.ma}, mb=${activeHeronSol.fmt.mb}, mc=${activeHeronSol.fmt.mc}`
    ];

    const newItem: SavedTriangleItem = {
      id: Date.now().toString(),
      title: `Heron's Area = ${activeHeronSol.fmt.area} (s=${activeHeronSol.fmt.semiPerimeter})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Area = ${activeHeronSol.fmt.area}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawInputs: { heronAStr, heronBStr, heronCStr, precision1 }
    };

    const updated = [newItem, ...savedHeronItems.filter((i) => i.inputs !== inputsStr)].slice(0, 15);
    setSavedHeronItems(updated);
    try {
      localStorage.setItem("saved_tri_heron", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedHeron(true);
    setTimeout(() => setJustSavedHeron(false), 2000);
  };

  const handleLoadHeron = (item: SavedTriangleItem) => {
    if (!item.rawInputs) return;
    if (item.rawInputs.heronAStr !== undefined) setHeronAStr(item.rawInputs.heronAStr);
    if (item.rawInputs.heronBStr !== undefined) setHeronBStr(item.rawInputs.heronBStr);
    if (item.rawInputs.heronCStr !== undefined) setHeronCStr(item.rawInputs.heronCStr);
    if (item.rawInputs.precision1) setPrecision1(item.rawInputs.precision1);
  };

  // CSV Export Action
  const handleExportCSV = () => {
    if (!activeSolution) return;
    const headers = [
      "Module",
      "Case",
      "Side a",
      "Side b",
      "Side c",
      "Angle A (deg)",
      "Angle B (deg)",
      "Angle C (deg)",
      "Area",
      "Perimeter",
      "Semi-perimeter",
      "Altitude ha",
      "Altitude hb",
      "Altitude hc",
      "Median ma",
      "Median mb",
      "Median mc",
      "Inradius r",
      "Circumradius R",
      "Angle Unit",
      "Precision Decimals",
      "Timestamp"
    ];

    const row = [
      "Universal 6-Parameter Triangle",
      activeSolution.caseType,
      activeSolution.fmt.a,
      activeSolution.fmt.b,
      activeSolution.fmt.c,
      activeSolution.fmt.A_deg,
      activeSolution.fmt.B_deg,
      activeSolution.fmt.C_deg,
      activeSolution.fmt.area,
      activeSolution.fmt.perimeter,
      activeSolution.fmt.semiPerimeter,
      activeSolution.fmt.ha,
      activeSolution.fmt.hb,
      activeSolution.fmt.hc,
      activeSolution.fmt.ma,
      activeSolution.fmt.mb,
      activeSolution.fmt.mc,
      activeSolution.fmt.inradius,
      activeSolution.fmt.circumradius,
      angleUnit,
      precision1,
      new Date().toISOString()
    ];

    const csvContent = [headers.join(","), row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `triangle-calculation-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Dedicated PDF Export Action via jsPDF
  const handleDownloadPDF = () => {
    if (!activeSolution) return;
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const now = new Date().toLocaleString();

    // Header banner
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 595, 65, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("CalcPlatform Pro — Triangle Solver Report", 40, 38);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${now} | Case: ${activeSolution.caseType} (${activeSolution.sideType} & ${activeSolution.angleType})`, 40, 54);

    let y = 95;
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("1. Solved Triangle Primary Metrics", 40, y);
    y += 18;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Sides: a = ${activeSolution.fmt.a},  b = ${activeSolution.fmt.b},  c = ${activeSolution.fmt.c}`, 45, y);
    y += 15;
    doc.text(`Angles: A = ${activeSolution.fmt.A_deg}°,  B = ${activeSolution.fmt.B_deg}°,  C = ${activeSolution.fmt.C_deg}°`, 45, y);
    y += 15;
    doc.text(`Area K = ${activeSolution.fmt.area},  Perimeter P = ${activeSolution.fmt.perimeter},  Semi-perimeter s = ${activeSolution.fmt.semiPerimeter}`, 45, y);
    y += 26;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("2. Altitudes, Medians & Circle Radii", 40, y);
    y += 18;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Altitudes: ha = ${activeSolution.fmt.ha},  hb = ${activeSolution.fmt.hb},  hc = ${activeSolution.fmt.hc}`, 45, y);
    y += 15;
    doc.text(`Medians: ma = ${activeSolution.fmt.ma},  mb = ${activeSolution.fmt.mb},  mc = ${activeSolution.fmt.mc}`, 45, y);
    y += 15;
    doc.text(`Inradius: r = ${activeSolution.fmt.inradius}  (Formula: r = Area / s)`, 45, y);
    y += 15;
    doc.text(`Circumradius: R = ${activeSolution.fmt.circumradius}  (Formula: R = abc / 4K)`, 45, y);
    y += 26;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("3. Mathematical Step-by-Step Derivation", 40, y);
    y += 18;

    doc.setFont("courier", "normal");
    doc.setFontSize(9);
    const splitSteps = doc.splitTextToSize(activeSolution.stepText, 510);
    doc.text(splitSteps, 45, y);

    y += splitSteps.length * 13 + 30;

    // Right Triangle section if solved
    if (rtSolveResult.success && rtSolveResult.fmt) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("4. Auxiliary Right Triangle Metrics", 40, y);
      y += 18;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Legs: a = ${rtSolveResult.fmt.a}, b = ${rtSolveResult.fmt.b}  ->  Hypotenuse c = ${rtSolveResult.fmt.c}`, 45, y);
      y += 15;
      doc.text(`Trigonometric Values: sin(A) = ${rtSolveResult.fmt.sinA},  cos(A) = ${rtSolveResult.fmt.cosA},  tan(A) = ${rtSolveResult.fmt.tanA}`, 45, y);
    }

    doc.save(`triangle-report-${Date.now()}.pdf`);
  };

  // Copy LaTeX Action
  const handleCopyLatex = () => {
    if (!activeSolution) return;
    const latexStr = `\\begin{aligned}
\\text{Sides: } & a = ${activeSolution.fmt.a}, \\quad b = ${activeSolution.fmt.b}, \\quad c = ${activeSolution.fmt.c} \\\\
\\text{Angles: } & A = ${activeSolution.fmt.A_deg}^\\circ, \\quad B = ${activeSolution.fmt.B_deg}^\\circ, \\quad C = ${activeSolution.fmt.C_deg}^\\circ \\\\
\\text{Area: } & K = \\sqrt{s(s-a)(s-b)(s-c)} = ${activeSolution.fmt.area} \\\\
\\text{Inradius: } & r = \\frac{K}{s} = ${activeSolution.fmt.inradius} \\\\
\\text{Circumradius: } & R = \\frac{abc}{4K} = ${activeSolution.fmt.circumradius}
\\end{aligned}`;

    navigator.clipboard.writeText(latexStr);
    setCopyFeedback("LaTeX copied!");
    setTimeout(() => setCopyFeedback(""), 2000);
  };

  // True-to-Scale Isometric SVG Visualizer
  const renderTriangleSVG = (sol: SolvedTriangle, showCircles = false) => {
    const width = 450;
    const height = 240;
    const pad = 42;

    const { Ax, Ay, Bx, By, Cx, Cy } = sol.coords;

    // Circumcenter (ccX, ccY) in Cartesian coordinates
    const ccX = sol.c / 2;
    const ccY = Cy !== 0 ? (sol.b * sol.b - sol.c * Cx) / (2 * Cy) : 0;

    // Incenter (incenterX, incenterY) in Cartesian coordinates
    const incenterX = (sol.a * Ax + sol.b * Bx + sol.c * Cx) / sol.perimeter;
    const incenterY = (sol.a * Ay + sol.b * By + sol.c * Cy) / sol.perimeter;

    // Compute bounding box encompassing vertices AND circles if active
    let boxMinX = Math.min(Ax, Bx, Cx);
    let boxMaxX = Math.max(Ax, Bx, Cx);
    let boxMinY = Math.min(Ay, By, Cy);
    let boxMaxY = Math.max(Ay, By, Cy);

    const shouldDrawCircum = showCircumcircle || showCircles;
    if (shouldDrawCircum) {
      boxMinX = Math.min(boxMinX, ccX - sol.circumradius);
      boxMaxX = Math.max(boxMaxX, ccX + sol.circumradius);
      boxMinY = Math.min(boxMinY, ccY - sol.circumradius);
      boxMaxY = Math.max(boxMaxY, ccY + sol.circumradius);
    }

    const rangeX = Math.max(0.001, boxMaxX - boxMinX);
    const rangeY = Math.max(0.001, boxMaxY - boxMinY);

    // UNIFORM SHARED ISOMETRIC SCALE
    const scale = Math.min((width - 2 * pad) / rangeX, (height - 2 * pad) / rangeY);

    // Center geometry in SVG viewport
    const offsetX = pad + (width - 2 * pad - rangeX * scale) / 2;
    const offsetY = height - pad - (height - 2 * pad - rangeY * scale) / 2;

    const r2 = (v: number) => Math.round(v * 100) / 100;

    const scaleX = (x: number) => r2(offsetX + (x - boxMinX) * scale);
    const scaleY = (y: number) => r2(offsetY - (y - boxMinY) * scale);

    const pA = { x: scaleX(Ax), y: scaleY(Ay) };
    const pB = { x: scaleX(Bx), y: scaleY(By) };
    const pC = { x: scaleX(Cx), y: scaleY(Cy) };

    const pIn = { x: scaleX(incenterX), y: scaleY(incenterY) };
    const svgRin = r2(sol.inradius * scale);

    const pCc = { x: scaleX(ccX), y: scaleY(ccY) };
    const svgRcc = r2(sol.circumradius * scale);

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-lg h-auto"
        suppressHydrationWarning
      >
        <defs>
          <pattern id="grid-tri" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-800" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#grid-tri)" rx="12" />

        {/* Circumcircle Option */}
        {shouldDrawCircum && (
          <circle
            cx={pCc.x}
            cy={pCc.y}
            r={svgRcc}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="1.5"
            strokeDasharray="3,3"
            suppressHydrationWarning
          />
        )}

        {/* Incircle Option */}
        {(showIncircle || showCircles) && (
          <circle
            cx={pIn.x}
            cy={pIn.y}
            r={svgRin}
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="3,3"
            suppressHydrationWarning
          />
        )}

        {/* Triangle Shaded Vector Body */}
        <polygon
          points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y}`}
          fill="#3b82f6"
          fillOpacity="0.2"
          stroke="#1d4ed8"
          strokeWidth="3"
          strokeLinejoin="round"
          suppressHydrationWarning
        />

        {/* Altitude Line from C to Base AB */}
        <line
          x1={pC.x}
          y1={pC.y}
          x2={pC.x}
          y2={pA.y}
          stroke="#64748b"
          strokeWidth="1.5"
          strokeDasharray="2,2"
          suppressHydrationWarning
        />

        {/* Vertex Markers & Labels */}
        <circle cx={pA.x} cy={pA.y} r="5" fill="#1d4ed8" suppressHydrationWarning />
        <text
          x={r2(pA.x - 12)}
          y={r2(pA.y + 15)}
          className="text-[11px] font-bold font-mono fill-blue-700 dark:fill-blue-400"
          suppressHydrationWarning
        >
          A
        </text>

        <circle cx={pB.x} cy={pB.y} r="5" fill="#1d4ed8" suppressHydrationWarning />
        <text
          x={r2(pB.x + 8)}
          y={r2(pB.y + 15)}
          className="text-[11px] font-bold font-mono fill-blue-700 dark:fill-blue-400"
          suppressHydrationWarning
        >
          B
        </text>

        <circle cx={pC.x} cy={pC.y} r="5" fill="#1d4ed8" suppressHydrationWarning />
        <text
          x={pC.x}
          y={r2(pC.y - 10)}
          textAnchor="middle"
          className="text-[11px] font-bold font-mono fill-blue-700 dark:fill-blue-400"
          suppressHydrationWarning
        >
          C
        </text>

        {/* Side Length Labels */}
        <text
          x={r2((pA.x + pB.x) / 2)}
          y={r2(pA.y + 18)}
          textAnchor="middle"
          className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300"
          suppressHydrationWarning
        >
          c = {sol.fmt.c}
        </text>
        <text
          x={r2((pA.x + pC.x) / 2 - 14)}
          y={r2((pA.y + pC.y) / 2)}
          textAnchor="middle"
          className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300"
          suppressHydrationWarning
        >
          b = {sol.fmt.b}
        </text>
        <text
          x={r2((pB.x + pC.x) / 2 + 14)}
          y={r2((pB.y + pC.y) / 2)}
          textAnchor="middle"
          className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300"
          suppressHydrationWarning
        >
          a = {sol.fmt.a}
        </text>
      </svg>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: UNIVERSAL 6-PARAMETER TRIANGLE CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid print:shadow-none print:border-slate-300 print:mb-6">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Universal 6-Parameter Triangle Calculator (Sides &amp; Angles)</span>
          <div className="flex items-center gap-1.5 no-print">
            <button
              type="button"
              onClick={handleExportCSV}
              disabled={!activeSolution}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
              title="Export Current Calculation as CSV"
            >
              <FileText className="w-3 h-3 text-white" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={!activeSolution}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
              title="Download Calculation Report as PDF"
            >
              <Download className="w-3 h-3 text-white" />
              <span>PDF</span>
            </button>
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
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Please provide 3 values including at least one side to the following 6 fields, and click or change values to calculate. When radians are selected as the angle unit, it accepts fractional &pi; inputs such as pi/2, 2*pi/3, 3*pi/4, etc.
          </p>

          {/* QUICK PRESET CHIPS */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold no-print">
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
              Equilateral 6-6-6
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

          {/* INPUT FORM & RESULT DASHBOARD */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: 6 INPUT FIELDS */}
            <div className="md:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Sides &amp; Angles Inputs
                </span>
                <div className="flex bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold no-print">
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
                  <label htmlFor="in-side-a" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Side a:
                  </label>
                  <input
                    id="in-side-a"
                    type="text"
                    value={inA}
                    onChange={(e) => setInA(e.target.value)}
                    placeholder="Length a"
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label htmlFor="in-angle-a" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Angle A ({angleUnit}):
                  </label>
                  <input
                    id="in-angle-a"
                    type="text"
                    value={inAngleA}
                    onChange={(e) => setInAngleA(e.target.value)}
                    placeholder={angleUnit === "rad" ? "e.g. pi/6 or 0.52" : "Angle A°"}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label htmlFor="in-side-b" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Side b:
                  </label>
                  <input
                    id="in-side-b"
                    type="text"
                    value={inB}
                    onChange={(e) => setInB(e.target.value)}
                    placeholder="Length b"
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label htmlFor="in-angle-b" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Angle B ({angleUnit}):
                  </label>
                  <input
                    id="in-angle-b"
                    type="text"
                    value={inAngleB}
                    onChange={(e) => setInAngleB(e.target.value)}
                    placeholder={angleUnit === "rad" ? "e.g. pi/4 or 0.785" : "Angle B°"}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label htmlFor="in-side-c" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Side c:
                  </label>
                  <input
                    id="in-side-c"
                    type="text"
                    value={inC}
                    onChange={(e) => setInC(e.target.value)}
                    placeholder="Length c"
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label htmlFor="in-angle-c" className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Angle C ({angleUnit}):
                  </label>
                  <input
                    id="in-angle-c"
                    type="text"
                    value={inAngleC}
                    onChange={(e) => setInAngleC(e.target.value)}
                    placeholder={angleUnit === "rad" ? "e.g. pi/2 or 1.570" : "Angle C°"}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>
              </div>

              {/* PRECISION TOGGLE */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800 no-print">
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
              ) : (
                activeSolution && (
                  <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                    {/* AMBIGUOUS SSA SOLUTION TABS */}
                    {univSolveResult.isAmbiguous && univSolveResult.solutions.length === 2 && (
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center justify-between no-print">
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
                          Area K = {activeSolution.fmt.area}
                        </span>
                      </div>

                      {/* SIDES & ANGLES SUMMARY */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold">
                        <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                          <span className="text-[10px] text-slate-400 block">Sides (a, b, c):</span>
                          <span className="font-mono text-slate-900 dark:text-slate-100">
                            {activeSolution.fmt.a}, {activeSolution.fmt.b}, {activeSolution.fmt.c}
                          </span>
                        </div>

                        <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                          <span className="text-[10px] text-slate-400 block">Angles (A, B, C):</span>
                          <span className="font-mono text-blue-600 dark:text-blue-400">
                            {activeSolution.fmt.A_deg}°, {activeSolution.fmt.B_deg}°, {activeSolution.fmt.C_deg}°
                          </span>
                        </div>

                        <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                          <span className="text-[10px] text-slate-400 block">Perimeter P:</span>
                          <span className="font-mono text-slate-900 dark:text-slate-100">
                            {activeSolution.fmt.perimeter} (s = {activeSolution.fmt.semiPerimeter})
                          </span>
                        </div>

                        <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                          <span className="text-[10px] text-slate-400 block">Altitudes (ha, hb, hc):</span>
                          <span className="font-mono text-slate-900 dark:text-slate-100">
                            {activeSolution.fmt.ha}, {activeSolution.fmt.hb}, {activeSolution.fmt.hc}
                          </span>
                        </div>

                        <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                          <span className="text-[10px] text-slate-400 block">Medians (ma, mb, mc):</span>
                          <span className="font-mono text-slate-900 dark:text-slate-100">
                            {activeSolution.fmt.ma}, {activeSolution.fmt.mb}, {activeSolution.fmt.mc}
                          </span>
                        </div>

                        <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                          <span className="text-[10px] text-slate-400 block">Inradius / Circumradius:</span>
                          <span className="font-mono text-slate-900 dark:text-slate-100">
                            r = {activeSolution.fmt.inradius}, R = {activeSolution.fmt.circumradius}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* DYNAMIC SCALE-ACCURATE VECTOR SVG VISUALIZER & DERIVATION TAB */}
          {activeSolution && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs print:break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Maximize2 className="h-4 w-4" />
                  <span>True-to-Scale Proportional Vector Visualizer</span>
                </h3>

                <div className="flex items-center gap-2 no-print">
                  <button
                    type="button"
                    onClick={handleCopyLatex}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copyFeedback || "Copy LaTeX"}</span>
                  </button>

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
              </div>

              <div className="w-full flex justify-center py-2 overflow-x-auto">
                {renderTriangleSVG(activeSolution)}
              </div>

              {/* STEP-BY-STEP BREAKDOWN ACCORDION */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-2">
                    Step-by-Step Derivation Breakdown:
                  </span>
                  <pre className="text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {activeSolution.stepText}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* SAVED UNIVERSAL CALCULATIONS LIST */}
          {savedUnivItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 no-print">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Universal Triangle Calculations ({savedUnivItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedUnivItems([]);
                    try {
                      localStorage.removeItem("saved_tri_univ");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedUnivItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
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
                            className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
                            title="Load to Inputs"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedUnivItems.filter((i) => i.id !== item.id);
                              setSavedUnivItems(updated);
                              try {
                                localStorage.setItem("saved_tri_univ", JSON.stringify(updated));
                              } catch (e) {}
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
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
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid print:shadow-none print:border-slate-300 print:mb-6">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Right Triangle &amp; Pythagorean Theorem Solver (a&sup2; + b&sup2; = c&sup2;)</span>
          <button
            type="button"
            onClick={handleSaveRt}
            disabled={!rtSolveResult.success}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50 no-print"
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
                  <label htmlFor="rt-leg-a" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Leg a (Base):
                  </label>
                  <input
                    id="rt-leg-a"
                    type="text"
                    value={rtLegAStr}
                    onChange={(e) => setRtLegAStr(e.target.value)}
                    placeholder="Length a"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="rt-leg-b" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Leg b (Height):
                  </label>
                  <input
                    id="rt-leg-b"
                    type="text"
                    value={rtLegBStr}
                    onChange={(e) => setRtLegBStr(e.target.value)}
                    placeholder="Length b"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: RIGHT TRIANGLE METRICS */}
            <div className="md:col-span-7 space-y-4">
              {!rtSolveResult.success ? (
                <div className="p-5 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold">
                  {rtSolveResult.errorMessage}
                </div>
              ) : (
                rtSolveResult.fmt && (
                  <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                        Calculated Hypotenuse (c = &radic;[a&sup2; + b&sup2;])
                      </span>
                      <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                        c = {rtSolveResult.fmt.c}
                      </div>
                      <p className="text-xs font-mono font-bold text-slate-500">
                        Area K = {rtSolveResult.fmt.area} | Perimeter P = {rtSolveResult.fmt.perimeter} | Angle A = {rtSolveResult.fmt.angleA}°
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                      <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block uppercase">sin(A)</span>
                        <span className="font-mono text-slate-900 dark:text-slate-100">{rtSolveResult.fmt.sinA}</span>
                      </div>

                      <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block uppercase">cos(A)</span>
                        <span className="font-mono text-slate-900 dark:text-slate-100">{rtSolveResult.fmt.cosA}</span>
                      </div>

                      <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block uppercase">tan(A)</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400">{rtSolveResult.fmt.tanA}</span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* EMBEDDED SAVED RIGHT TRIANGLE CALCULATIONS INSIDE CARD 2 */}
          {savedRtItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 no-print">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Right Triangle Calculations ({savedRtItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedRtItems([]);
                    try {
                      localStorage.removeItem("saved_tri_rt");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedRtItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
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
                            onClick={() => handleLoadRt(item)}
                            className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
                            title="Load to Inputs"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedRtItems.filter((i) => i.id !== item.id);
                              setSavedRtItems(updated);
                              try {
                                localStorage.setItem("saved_tri_rt", JSON.stringify(updated));
                              } catch (e) {}
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
                              Complete Right Triangle Metrics:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
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
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid print:shadow-none print:border-slate-300 print:mb-6">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Inradius (r) &amp; Circumradius (R) Calculator</span>
          <button
            type="button"
            onClick={handleSaveCrc}
            disabled={!activeCrcSol}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50 no-print"
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
                  <label htmlFor="crc-side-a" className="text-[11px] font-bold text-slate-500 block mb-1">
                    Side a:
                  </label>
                  <input
                    id="crc-side-a"
                    type="text"
                    value={crcSideAStr}
                    onChange={(e) => setCrcSideAStr(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label htmlFor="crc-side-b" className="text-[11px] font-bold text-slate-500 block mb-1">
                    Side b:
                  </label>
                  <input
                    id="crc-side-b"
                    type="text"
                    value={crcSideBStr}
                    onChange={(e) => setCrcSideBStr(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label htmlFor="crc-side-c" className="text-[11px] font-bold text-slate-500 block mb-1">
                    Side c:
                  </label>
                  <input
                    id="crc-side-c"
                    type="text"
                    value={crcSideCStr}
                    onChange={(e) => setCrcSideCStr(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CIRCLE METRICS */}
            <div className="md:col-span-7 space-y-4">
              {!crcSolveResult.success ? (
                <div className="p-5 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold">
                  {crcSolveResult.errorMessage}
                </div>
              ) : (
                activeCrcSol && (
                  <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                        Calculated Radius Metrics
                      </span>
                      <div className="grid grid-cols-2 gap-3 text-sm font-mono font-extrabold">
                        <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
                          <span className="text-[10px] text-emerald-800 dark:text-emerald-300 uppercase block">
                            Inradius (r = Area / s)
                          </span>
                          r = {activeCrcSol.fmt.inradius}
                        </div>

                        <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800">
                          <span className="text-[10px] text-purple-800 dark:text-purple-300 uppercase block">
                            Circumradius (R = abc / (4·Area))
                          </span>
                          R = {activeCrcSol.fmt.circumradius}
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex justify-center py-2 overflow-x-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      {renderTriangleSVG(activeCrcSol, true)}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* EMBEDDED SAVED CIRCLE CALCULATIONS INSIDE CARD 3 */}
          {savedCrcItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 no-print">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Circle Metric Calculations ({savedCrcItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCrcItems([]);
                    try {
                      localStorage.removeItem("saved_tri_crc");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedCrcItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
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
                            onClick={() => handleLoadCrc(item)}
                            className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
                            title="Load to Inputs"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedCrcItems.filter((i) => i.id !== item.id);
                              setSavedCrcItems(updated);
                              try {
                                localStorage.setItem("saved_tri_crc", JSON.stringify(updated));
                              } catch (e) {}
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
                              Complete Radius Metrics:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
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
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid print:shadow-none print:border-slate-300 print:mb-6">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Heron&apos;s Formula &amp; Altitudes / Medians Suite</span>
          <button
            type="button"
            onClick={handleSaveHeron}
            disabled={!activeHeronSol}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50 no-print"
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
                  <label htmlFor="heron-side-a" className="text-[11px] font-bold text-slate-500 block mb-1">
                    Side a:
                  </label>
                  <input
                    id="heron-side-a"
                    type="text"
                    value={heronAStr}
                    onChange={(e) => setHeronAStr(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label htmlFor="heron-side-b" className="text-[11px] font-bold text-slate-500 block mb-1">
                    Side b:
                  </label>
                  <input
                    id="heron-side-b"
                    type="text"
                    value={heronBStr}
                    onChange={(e) => setHeronBStr(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label htmlFor="heron-side-c" className="text-[11px] font-bold text-slate-500 block mb-1">
                    Side c:
                  </label>
                  <input
                    id="heron-side-c"
                    type="text"
                    value={heronCStr}
                    onChange={(e) => setHeronCStr(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERON OUTPUTS */}
            <div className="md:col-span-7 space-y-4">
              {!heronSolveResult.success ? (
                <div className="p-5 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold">
                  {heronSolveResult.errorMessage}
                </div>
              ) : (
                activeHeronSol && (
                  <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                        Area via Heron&apos;s Formula: &radic;[s(s-a)(s-b)(s-c)]
                      </span>
                      <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                        Area K = {activeHeronSol.fmt.area}
                      </div>
                      <p className="text-xs font-mono font-bold text-slate-500">
                        Semi-perimeter s = {activeHeronSol.fmt.semiPerimeter} | Perimeter P = {activeHeronSol.fmt.perimeter}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono font-bold">
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 block uppercase font-sans">Altitudes (ha, hb, hc)</span>
                        ha = {activeHeronSol.fmt.ha}
                        <br />
                        hb = {activeHeronSol.fmt.hb}
                        <br />
                        hc = {activeHeronSol.fmt.hc}
                      </div>

                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 block uppercase font-sans">Medians (ma, mb, mc)</span>
                        ma = {activeHeronSol.fmt.ma}
                        <br />
                        mb = {activeHeronSol.fmt.mb}
                        <br />
                        mc = {activeHeronSol.fmt.mc}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* EMBEDDED SAVED HERON CALCULATIONS INSIDE CARD 4 */}
          {savedHeronItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 no-print">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Heron Calculations ({savedHeronItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedHeronItems([]);
                    try {
                      localStorage.removeItem("saved_tri_heron");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedHeronItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
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
                            onClick={() => handleLoadHeron(item)}
                            className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
                            title="Load to Inputs"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedHeronItems.filter((i) => i.id !== item.id);
                              setSavedHeronItems(updated);
                              try {
                                localStorage.setItem("saved_tri_heron", JSON.stringify(updated));
                              } catch (e) {}
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
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
