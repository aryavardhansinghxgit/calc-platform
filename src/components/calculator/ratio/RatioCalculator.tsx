"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Copy,
  Check,
  ArrowRightLeft,
  Sparkles,
  HelpCircle,
  BarChart2,
  PieChart,
  Monitor,
  Layers,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Share2,
  RotateCcw,
  FileSpreadsheet,
  Printer
} from "lucide-react";
import { RatioReportModal } from "./RatioReportModal";

type PropTarget = "A" | "B" | "C" | "D";

export interface SavedRatioItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function parseNum(valStr: string): number {
  if (!valStr) return NaN;
  const trimmed = valStr.trim();
  if (trimmed.includes("/")) {
    const parts = trimmed.split("/");
    if (parts.length === 2) {
      const num = parseFloat(parts[0]);
      const den = parseFloat(parts[1]);
      if (!isNaN(num) && !isNaN(den) && den !== 0) return num / den;
    }
  }
  return parseFloat(trimmed);
}

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function gcdArray(arr: number[]): number {
  return arr.reduce((acc, curr) => gcd(acc, curr), arr[0] || 1);
}

function getDecimalsCount(n: number): number {
  if (Math.floor(n) === n) return 0;
  const str = n.toString();
  if (str.includes(".")) {
    return str.split(".")[1].length;
  }
  return 0;
}

export function RatioCalculator() {
  // Card 1: Proportion (A : B = C : D)
  const [propTarget, setPropTarget] = useState<PropTarget>("D");
  const [propA, setPropA] = useState<string>("3");
  const [propB, setPropB] = useState<string>("4");
  const [propC, setPropC] = useState<string>("6");
  const [propD, setPropD] = useState<string>("8");

  // Card 2: Ratio Simplifier (Multi-Term)
  const [simpA, setSimpA] = useState<string>("12");
  const [simpB, setSimpB] = useState<string>("18");
  const [simpC, setSimpC] = useState<string>("24");

  // Card 3: Partition / Total Amount
  const [partTotal, setPartTotal] = useState<string>("500");
  const [partA, setPartA] = useState<string>("2");
  const [partB, setPartB] = useState<string>("3");
  const [partC, setPartC] = useState<string>("5");

  // Card 4: Aspect Ratio & Golden Ratio
  const [aspectTool, setAspectTool] = useState<"aspect" | "golden">("aspect");
  const [srcW, setSrcW] = useState<string>("1920");
  const [srcH, setSrcH] = useState<string>("1080");
  const [targetDim, setTargetDim] = useState<"width" | "height">("width");
  const [targetDimVal, setTargetDimVal] = useState<string>("1280");

  const [goldenGiven, setGoldenGiven] = useState<"total" | "a" | "b">("total");
  const [goldenVal, setGoldenVal] = useState<string>("100");

  // Master Action Toolbar States
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Saved calculation states for Card 1, 2, 3, 4
  const [savedPropItems, setSavedPropItems] = useState<SavedRatioItem[]>([]);
  const [justSavedProp, setJustSavedProp] = useState<boolean>(false);

  const [savedSimpItems, setSavedSimpItems] = useState<SavedRatioItem[]>([]);
  const [justSavedSimp, setJustSavedSimp] = useState<boolean>(false);

  const [savedPartItems, setSavedPartItems] = useState<SavedRatioItem[]>([]);
  const [justSavedPart, setJustSavedPart] = useState<boolean>(false);

  const [savedAspectItems, setSavedAspectItems] = useState<SavedRatioItem[]>([]);
  const [justSavedAspect, setJustSavedAspect] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedProp = localStorage.getItem("saved_ratio_proportion");
      if (storedProp) setSavedPropItems(JSON.parse(storedProp));

      const storedSimp = localStorage.getItem("saved_ratio_simplify");
      if (storedSimp) setSavedSimpItems(JSON.parse(storedSimp));

      const storedPart = localStorage.getItem("saved_ratio_partition");
      if (storedPart) setSavedPartItems(JSON.parse(storedPart));

      const storedAspect = localStorage.getItem("saved_ratio_aspect");
      if (storedAspect) setSavedAspectItems(JSON.parse(storedAspect));

      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const urlTarget = params.get("target") as PropTarget;
        const urlA = params.get("a");
        const urlB = params.get("b");
        const urlC = params.get("c");
        const urlD = params.get("d");

        if (urlTarget && ["A", "B", "C", "D"].includes(urlTarget)) setPropTarget(urlTarget);
        if (urlA !== null) setPropA(urlA);
        if (urlB !== null) setPropB(urlB);
        if (urlC !== null) setPropC(urlC);
        if (urlD !== null) setPropD(urlD);
      }
    } catch (e) {}
  }, []);

  // --- CARD 1 CALCULATION: Solve Proportion ---
  const propCalc = useMemo(() => {
    const a = parseNum(propA);
    const b = parseNum(propB);
    const c = parseNum(propC);
    const d = parseNum(propD);

    const steps: string[] = [];

    if (propTarget === "D") {
      if (isNaN(a) || isNaN(b) || isNaN(c)) return { error: "Please enter valid values for A, B, and C." };
      if (b === 0) return { error: "Denominator B cannot be zero (A / B is undefined)." };
      if (a === 0) return { error: "Term A cannot be zero when solving for D (division by zero)." };

      const resD = (b * c) / a;
      steps.push(`Proportion Equation: A / B = C / D  ⇒  ${a} / ${b} = ${c} / D`);
      steps.push(`Cross-Multiplication: A × D = B × C  ⇒  ${a} × D = ${b} × ${c} = ${b * c}`);
      steps.push(`Solve for D: D = (B × C) / A = ${b * c} / ${a} = ${resD.toFixed(4)}`);
      return {
        solvedVal: resD,
        solvedLabel: "Missing Term (D)",
        latex: `\\frac{${a}}{${b}} = \\frac{${c}}{D} \\implies D = \\frac{${b} \\times ${c}}{${a}} = ${resD.toFixed(4)}`,
        steps,
        error: null
      };
    } else if (propTarget === "C") {
      if (isNaN(a) || isNaN(b) || isNaN(d)) return { error: "Please enter valid values for A, B, and D." };
      if (b === 0) return { error: "Denominator B cannot be zero (A / B is undefined)." };
      if (d === 0) return { error: "Denominator D cannot be zero (C / D is undefined)." };

      const resC = (a * d) / b;
      steps.push(`Proportion Equation: A / B = C / D  ⇒  ${a} / ${b} = C / ${d}`);
      steps.push(`Cross-Multiplication: B × C = A × D  ⇒  ${b} × C = ${a} × ${d} = ${a * d}`);
      steps.push(`Solve for C: C = (A × D) / B = ${a * d} / ${b} = ${resC.toFixed(4)}`);
      return {
        solvedVal: resC,
        solvedLabel: "Missing Term (C)",
        latex: `\\frac{${a}}{${b}} = \\frac{C}{${d}} \\implies C = \\frac{${a} \\times ${d}}{${b}} = ${resC.toFixed(4)}`,
        steps,
        error: null
      };
    } else if (propTarget === "B") {
      if (isNaN(a) || isNaN(c) || isNaN(d)) return { error: "Please enter valid values for A, C, and D." };
      if (d === 0) return { error: "Denominator D cannot be zero (C / D is undefined)." };
      if (c === 0) return { error: "Term C cannot be zero when solving for B (division by zero)." };

      const resB = (a * d) / c;
      steps.push(`Proportion Equation: A / B = C / D  ⇒  ${a} / B = ${c} / ${d}`);
      steps.push(`Cross-Multiplication: B × C = A × D  ⇒  B × ${c} = ${a} × ${d} = ${a * d}`);
      steps.push(`Solve for B: B = (A × D) / C = ${a * d} / ${c} = ${resB.toFixed(4)}`);
      return {
        solvedVal: resB,
        solvedLabel: "Missing Term (B)",
        latex: `\\frac{${a}}{B} = \\frac{${c}}{${d}} \\implies B = \\frac{${a} \\times ${d}}{${c}} = ${resB.toFixed(4)}`,
        steps,
        error: null
      };
    } else {
      // Solve for A
      if (isNaN(b) || isNaN(c) || isNaN(d)) return { error: "Please enter valid values for B, C, and D." };
      if (b === 0) return { error: "Denominator B cannot be zero (A / B is undefined)." };
      if (d === 0) return { error: "Denominator D cannot be zero (C / D is undefined)." };

      const resA = (b * c) / d;
      steps.push(`Proportion Equation: A / B = C / D  ⇒  A / ${b} = ${c} / ${d}`);
      steps.push(`Cross-Multiplication: A × D = B × C  ⇒  A × ${d} = ${b} × ${c} = ${b * c}`);
      steps.push(`Solve for A: A = (B × C) / D = ${b * c} / ${d} = ${resA.toFixed(4)}`);
      return {
        solvedVal: resA,
        solvedLabel: "Missing Term (A)",
        latex: `\\frac{A}{${b}} = \\frac{${c}}{${d}} \\implies A = \\frac{${b} \\times ${c}}{${d}} = ${resA.toFixed(4)}`,
        steps,
        error: null
      };
    }
  }, [propTarget, propA, propB, propC, propD]);

  // --- CARD 2 CALCULATION: Ratio Simplifier (Intelligent Decimal Scaling) ---
  const simpCalc = useMemo(() => {
    const vA = parseNum(simpA);
    const vB = parseNum(simpB);
    const vC = parseNum(simpC);

    const steps: string[] = [];

    if (isNaN(vA) || isNaN(vB)) return { error: "Please enter valid numeric values for ratio terms." };
    if (vA === 0 && vB === 0 && (isNaN(vC) || vC === 0)) {
      return { error: "Ratio terms cannot all be zero." };
    }

    const hasC = !isNaN(vC);

    // Determine if inputs are already integers or require decimal scaling
    const decA = getDecimalsCount(vA);
    const decB = getDecimalsCount(vB);
    const decC = hasC ? getDecimalsCount(vC) : 0;
    const maxDec = Math.min(4, Math.max(decA, decB, decC));

    const factor = Math.pow(10, maxDec);
    const intA = Math.round(vA * factor);
    const intB = Math.round(vB * factor);
    const intC = hasC ? Math.round(vC * factor) : null;

    if (factor > 1) {
      steps.push(
        `1. Convert decimal terms to integers: Multiply by ${factor} ⇒ ${vA} × ${factor} = ${intA}, ${vB} × ${factor} = ${intB}${
          hasC ? `, ${vC} × ${factor} = ${intC}` : ""
        }`
      );
    } else {
      steps.push(`1. Terms are already integers: ${intA} : ${intB}${hasC ? " : " + intC : ""}`);
    }

    const commonGcd = intC !== null ? gcdArray([intA, intB, intC]) : gcd(intA, intB);

    const simpIntA = intA / commonGcd;
    const simpIntB = intB / commonGcd;
    const simpIntC = intC !== null ? intC / commonGcd : null;

    const strRes = simpIntC !== null ? `${simpIntA} : ${simpIntB} : ${simpIntC}` : `${simpIntA} : ${simpIntB}`;
    const unitRate = vB !== 0 ? (vA / vB).toFixed(4) : "N/A";

    steps.push(`2. Calculate Greatest Common Divisor (GCD): GCD = ${commonGcd}`);
    steps.push(`3. Divide each term by GCD: ${intA}/${commonGcd} : ${intB}/${commonGcd}${hasC ? ` : ${intC}/${commonGcd}` : ""} = ${strRes}`);
    steps.push(`4. Unit Rate (Value per 1 unit of B): ${vA} / ${vB} = ${unitRate}`);

    return {
      solvedLabel: "Simplified Integer Ratio",
      formatted: strRes,
      unitRate,
      commonGcd,
      latex: `${vA} : ${vB}${hasC ? ` : ${vC}` : ""} = ${strRes}`,
      steps,
      error: null
    };
  }, [simpA, simpB, simpC]);

  // --- CARD 3 CALCULATION: Partition / Amount Divider ---
  const partCalc = useMemo(() => {
    const tot = parseNum(partTotal);
    const pA = parseNum(partA);
    const pB = parseNum(partB);
    const pC = parseNum(partC);

    const steps: string[] = [];

    if (isNaN(tot) || isNaN(pA) || isNaN(pB) || tot <= 0 || pA < 0 || pB < 0) {
      return { error: "Please enter a valid total sum and positive ratio terms." };
    }

    const hasC = !isNaN(pC) && pC > 0;
    const sumParts = pA + pB + (hasC ? pC : 0);
    if (sumParts === 0) return { error: "Sum of ratio parts cannot be zero." };

    const unitVal = tot / sumParts;
    const shareA = pA * unitVal;
    const shareB = pB * unitVal;
    const shareC = hasC ? pC * unitVal : 0;

    const pctA = (shareA / tot) * 100;
    const pctB = (shareB / tot) * 100;
    const pctC = hasC ? (shareC / tot) * 100 : 0;

    steps.push(`1. Sum of Ratio Parts: ${pA} + ${pB} ${hasC ? "+ " + pC : ""} = ${sumParts} total parts`);
    steps.push(`2. Calculate Unit Value per Part: ${tot} / ${sumParts} = ${unitVal.toFixed(4)} per part`);
    steps.push(`3. Share A (${pA} parts): ${pA} × ${unitVal.toFixed(4)} = ${shareA.toFixed(2)} (${pctA.toFixed(1)}%)`);
    steps.push(`4. Share B (${pB} parts): ${pB} × ${unitVal.toFixed(4)} = ${shareB.toFixed(2)} (${pctB.toFixed(1)}%)`);
    if (hasC) steps.push(`5. Share C (${pC} parts): ${pC} × ${unitVal.toFixed(4)} = ${shareC.toFixed(2)} (${pctC.toFixed(1)}%)`);

    return {
      solvedLabel: "Partition Shares",
      formatted: `Share A: ${shareA.toFixed(2)}, Share B: ${shareB.toFixed(2)}${hasC ? `, Share C: ${shareC.toFixed(2)}` : ""}`,
      shareA,
      shareB,
      shareC,
      pctA,
      pctB,
      pctC,
      hasC,
      latex: `\\text{Share A} = \\frac{${pA}}{${sumParts}} \\times ${tot} = ${shareA.toFixed(2)}`,
      steps,
      error: null
    };
  }, [partTotal, partA, partB, partC]);

  // --- CARD 4 CALCULATION: Aspect Ratio & Golden Ratio ---
  const aspectCalc = useMemo(() => {
    const steps: string[] = [];

    if (aspectTool === "aspect") {
      const w = parseNum(srcW);
      const h = parseNum(srcH);
      const targetVal = parseNum(targetDimVal);

      if (isNaN(w) || isNaN(h) || isNaN(targetVal) || w <= 0 || h <= 0 || targetVal <= 0) {
        return { error: "Please enter positive dimensions for width and height." };
      }

      const aspectVal = w / h;
      const commonGcd = gcd(w, h);
      const simpW = w / commonGcd;
      const simpH = h / commonGcd;

      let resWidth = 0;
      let resHeight = 0;

      if (targetDim === "width") {
        resWidth = targetVal;
        resHeight = targetVal / aspectVal;
      } else {
        resHeight = targetVal;
        resWidth = targetVal * aspectVal;
      }

      const megapixels = (resWidth * resHeight) / 1000000;

      steps.push(`1. Source Aspect Ratio: ${w} : ${h}  ⇒  Simplified: ${simpW} : ${simpH} (${aspectVal.toFixed(4)})`);
      steps.push(`2. Target Dimension (${targetDim}): ${targetVal}px`);
      steps.push(`3. Calculated Resized Dimension: ${resWidth.toFixed(0)}px × ${resHeight.toFixed(0)}px`);
      steps.push(`4. Total Resolution: ${(resWidth * resHeight).toLocaleString()} pixels (${megapixels.toFixed(2)} MP)`);

      return {
        isGolden: false,
        solvedLabel: "Resized Resolution",
        formatted: `${resWidth.toFixed(0)} × ${resHeight.toFixed(0)} px`,
        simpAspect: `${simpW} : ${simpH}`,
        aspectVal,
        megapixels,
        latex: `\\text{Resolution} = ${resWidth.toFixed(0)} \\times ${resHeight.toFixed(0)} \\text{ px}`,
        steps,
        error: null
      };
    } else {
      const Phi = 1.618033988749895;
      const gInput = parseNum(goldenVal);

      if (isNaN(gInput) || gInput <= 0) return { error: "Please enter a positive value." };

      let aPart = 0;
      let bPart = 0;
      let totalL = 0;

      if (goldenGiven === "total") {
        totalL = gInput;
        aPart = totalL / Phi;
        bPart = totalL - aPart;
      } else if (goldenGiven === "a") {
        aPart = gInput;
        bPart = aPart / Phi;
        totalL = aPart + bPart;
      } else {
        bPart = gInput;
        aPart = bPart * Phi;
        totalL = aPart + bPart;
      }

      steps.push(`Golden Ratio Definition: (A + B) / A = A / B = Φ ≈ 1.6180339887`);
      steps.push(`1. Long Segment A: ${aPart.toFixed(4)}`);
      steps.push(`2. Short Segment B: ${bPart.toFixed(4)}`);
      steps.push(`3. Total Length (A + B): ${totalL.toFixed(4)}`);
      steps.push(`Verification Ratio (A / B): ${aPart.toFixed(4)} / ${bPart.toFixed(4)} = ${(aPart / bPart).toFixed(6)}`);

      return {
        isGolden: true,
        solvedLabel: "Golden Cut Sections",
        formatted: `Segment A: ${aPart.toFixed(4)}, Segment B: ${bPart.toFixed(4)}`,
        aPart,
        bPart,
        totalL,
        latex: `\\Phi = \\frac{${aPart.toFixed(4)}}{${bPart.toFixed(4)}} = 1.618034`,
        steps,
        error: null
      };
    }
  }, [aspectTool, srcW, srcH, targetDim, targetDimVal, goldenGiven, goldenVal]);

  // --- ACTIONS: COPY, SHARE, CSV, RESET, PRINT ---
  const handleCopyText = (text: string, key: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {}
  };

  const handleCopySummary = () => {
    const summary = [
      `=== RATIO & PROPORTION ANALYSIS ===`,
      `[1] Proportion Solver:`,
      `    Equation: ${propA} / ${propB} = ${propC} / ${propD}`,
      `    Solved Variable (${propTarget}) = ${propCalc.solvedVal?.toFixed(4) || "N/A"}`,
      ``,
      `[2] Ratio Simplifier:`,
      `    Terms: ${simpA} : ${simpB}${simpC ? " : " + simpC : ""}`,
      `    Simplified Ratio = ${simpCalc.formatted || "N/A"}`,
      `    Unit Rate = ${simpCalc.unitRate || "N/A"}`,
      ``,
      `[3] Ratio Partitioning:`,
      `    Total Amount: ${partTotal} | Parts: ${partA} : ${partB}${partC ? " : " + partC : ""}`,
      `    Shares: ${partCalc.formatted || "N/A"}`,
      ``,
      `[4] ${aspectTool === "aspect" ? "Aspect Ratio Resizer:" : "Golden Ratio Suite:"}`,
      `    ${aspectCalc.formatted || "N/A"}`,
      `Generated by CalcPlatform Ratio Calculator`
    ].join("\n");

    handleCopyText(summary, "summary");
  };

  const handleShareLink = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("target", propTarget);
      url.searchParams.set("a", propA);
      url.searchParams.set("b", propB);
      url.searchParams.set("c", propC);
      url.searchParams.set("d", propD);
      navigator.clipboard.writeText(url.toString());
      setCopiedKey("share");
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {}
  };

  const handleExportCSV = () => {
    const rows = [
      ["Module", "Inputs", "Result / Solved Value", "Formula / LaTeX", "Derived Properties"],
      [
        "Proportion Solver",
        `"Target: ${propTarget}, A: ${propA}, B: ${propB}, C: ${propC}, D: ${propD}"`,
        `"${propCalc.solvedVal?.toFixed(4) || ""}"`,
        `"${propCalc.latex || ""}"`,
        `"Cross Product: A*D = B*C"`
      ],
      [
        "Ratio Simplifier",
        `"${simpA} : ${simpB}${simpC ? " : " + simpC : ""}"`,
        `"${simpCalc.formatted || ""}"`,
        `"${simpCalc.latex || ""}"`,
        `"GCD: ${simpCalc.commonGcd || ""}, Unit Rate: ${simpCalc.unitRate || ""}"`
      ],
      [
        "Ratio Partitioning",
        `"Total: ${partTotal}, Parts: ${partA}:${partB}${partC ? ":" + partC : ""}"`,
        `"${partCalc.formatted || ""}"`,
        `"${partCalc.latex || ""}"`,
        `"Share A: ${partCalc.shareA?.toFixed(2) || ""}, Share B: ${partCalc.shareB?.toFixed(2) || ""}"`
      ],
      [
        aspectTool === "aspect" ? "Aspect Ratio" : "Golden Ratio",
        aspectCalc.isGolden ? `"Given: ${goldenGiven}, Value: ${goldenVal}"` : `"Source: ${srcW}x${srcH}, Target: ${targetDimVal}"`,
        `"${aspectCalc.formatted || ""}"`,
        `"${aspectCalc.latex || ""}"`,
        aspectCalc.isGolden ? `"Phi = 1.618034"` : `"Megapixels: ${aspectCalc.megapixels?.toFixed(2) || ""}"`
      ]
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ratio_calculator_${propA}_${propB}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetDefaults = () => {
    setPropTarget("D");
    setPropA("3");
    setPropB("4");
    setPropC("6");
    setPropD("8");

    setSimpA("12");
    setSimpB("18");
    setSimpC("24");

    setPartTotal("500");
    setPartA("2");
    setPartB("3");
    setPartC("5");

    setAspectTool("aspect");
    setSrcW("1920");
    setSrcH("1080");
    setTargetDim("width");
    setTargetDimVal("1280");

    setGoldenGiven("total");
    setGoldenVal("100");

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url.toString());
    }
  };

  // --- SAVE HANDLERS ---
  const handleSaveProp = () => {
    if (propCalc.error || propCalc.solvedVal === undefined) return;

    const inputsStr = `Solve: ${propTarget}, A: ${propA}, B: ${propB}, C: ${propC}, D: ${propD}`;
    const opStr = `Proportion Calculation (${propA}:${propB} = ${propC}:${propD})`;
    const resList = [`Solved Unknown (${propTarget}) = ${propCalc.solvedVal?.toFixed(4)}`];

    const newItem: SavedRatioItem = {
      id: Date.now().toString(),
      title: `Proportion Solve (${propTarget})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `A/B = C/D`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedPropItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedPropItems(updated);
    try {
      localStorage.setItem("saved_ratio_proportion", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedProp(true);
    setTimeout(() => setJustSavedProp(false), 2000);
  };

  const handleSaveSimp = () => {
    if (simpCalc.error || !simpCalc.formatted) return;

    const inputsStr = `Terms: ${simpA} : ${simpB}${simpC ? " : " + simpC : ""}`;
    const opStr = `Ratio Simplification`;
    const resList = [`Simplified Ratio = ${simpCalc.formatted}`, `Unit Rate (per 1 unit of B) = ${simpCalc.unitRate}`];

    const newItem: SavedRatioItem = {
      id: Date.now().toString(),
      title: "Ratio Simplification",
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${simpA} : ${simpB} = ${simpCalc.formatted}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedSimpItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedSimpItems(updated);
    try {
      localStorage.setItem("saved_ratio_simplify", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedSimp(true);
    setTimeout(() => setJustSavedSimp(false), 2000);
  };

  const handleSavePart = () => {
    if (partCalc.error || !partCalc.formatted) return;

    const inputsStr = `Total Amount: ${partTotal}, Ratio Parts: ${partA} : ${partB}${partC ? " : " + partC : ""}`;
    const opStr = `Ratio Partitioning`;
    const resList = [
      `Share A = ${partCalc.shareA?.toFixed(2)} (${partCalc.pctA?.toFixed(1)}%)`,
      `Share B = ${partCalc.shareB?.toFixed(2)} (${partCalc.pctB?.toFixed(1)}%)`,
      ...(partCalc.hasC ? [`Share C = ${partCalc.shareC?.toFixed(2)} (${partCalc.pctC?.toFixed(1)}%)`] : [])
    ];

    const newItem: SavedRatioItem = {
      id: Date.now().toString(),
      title: "Ratio Partition Shares",
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Sum = ${partTotal}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedPartItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedPartItems(updated);
    try {
      localStorage.setItem("saved_ratio_partition", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedPart(true);
    setTimeout(() => setJustSavedPart(false), 2000);
  };

  const handleSaveAspect = () => {
    if (aspectCalc.error || !aspectCalc.formatted) return;

    const inputsStr = aspectCalc.isGolden
      ? `Given: ${goldenGiven}, Value: ${goldenVal}`
      : `Source: ${srcW}x${srcH}, Target ${targetDim}: ${targetDimVal}px`;

    const opStr = aspectCalc.isGolden ? `Golden Ratio (Φ)` : `Aspect Ratio Resizing`;
    const resList = aspectCalc.isGolden
      ? [
          `Segment A = ${aspectCalc.aPart?.toFixed(4)}`,
          `Segment B = ${aspectCalc.bPart?.toFixed(4)}`,
          `Total Length = ${aspectCalc.totalL?.toFixed(4)}`
        ]
      : [
          `Resized Resolution = ${aspectCalc.formatted}`,
          `Simplified Aspect Ratio = ${aspectCalc.simpAspect}`,
          `Total Resolution = ${aspectCalc.megapixels?.toFixed(2)} MP`
        ];

    const newItem: SavedRatioItem = {
      id: Date.now().toString(),
      title: aspectCalc.isGolden ? "Golden Ratio Cut" : "Aspect Ratio Resized",
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: aspectCalc.formatted,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedAspectItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedAspectItems(updated);
    try {
      localStorage.setItem("saved_ratio_aspect", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedAspect(true);
    setTimeout(() => setJustSavedAspect(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* MASTER ACTION TOOLBAR */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedKey === "summary" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === "summary" ? "Summary Copied!" : "Copy Summary"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleCopyText(propCalc.latex || "", "latex_m")}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedKey === "latex_m" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
            <span>{copiedKey === "latex_m" ? "LaTeX Copied!" : "Copy LaTeX"}</span>
          </button>

          <button
            type="button"
            onClick={handleShareLink}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedKey === "share" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-blue-600" />}
            <span>{copiedKey === "share" ? "Link Copied!" : "Share Calculation"}</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: PROPORTION SOLVER (A : B = C : D) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Proportion Solver (A : B = C : D)</span>
          <button
            type="button"
            onClick={handleSaveProp}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedProp ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: TARGET SELECTION & INPUTS */}
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Proportion Inputs
              </h2>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Select Unknown Target Variable to Solve
                </label>
                <div className="grid grid-cols-4 gap-1.5 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                  {(["A", "B", "C", "D"] as PropTarget[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPropTarget(t)}
                      className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                        propTarget === t ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                      }`}
                    >
                      Solve {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* DYNAMIC EQUATION PREVIEW */}
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-sm text-blue-600 dark:text-blue-400">
                <span className="text-[10px] text-slate-400 block font-sans uppercase mb-0.5">Proportion Equivalence</span>
                <span>
                  {propTarget === "A" ? "?" : propA} : {propTarget === "B" ? "?" : propB} = {propTarget === "C" ? "?" : propC} :{" "}
                  {propTarget === "D" ? "?" : propD}
                </span>
              </div>

              <div className="space-y-3">
                {propTarget !== "A" && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Term A</label>
                    <input
                      type="text"
                      value={propA}
                      onChange={(e) => setPropA(e.target.value)}
                      placeholder="e.g. 3"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                )}

                {propTarget !== "B" && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Term B</label>
                    <input
                      type="text"
                      value={propB}
                      onChange={(e) => setPropB(e.target.value)}
                      placeholder="e.g. 4"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                )}

                {propTarget !== "C" && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Term C</label>
                    <input
                      type="text"
                      value={propC}
                      onChange={(e) => setPropC(e.target.value)}
                      placeholder="e.g. 6"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                )}

                {propTarget !== "D" && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Term D</label>
                    <input
                      type="text"
                      value={propD}
                      onChange={(e) => setPropD(e.target.value)}
                      placeholder="e.g. 8"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: HERO OUTPUT & STEPS */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {propCalc.solvedLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => propCalc.latex && handleCopyText(propCalc.latex, "latex_prop")}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                    >
                      {copiedKey === "latex_prop" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                      <span>{copiedKey === "latex_prop" ? "LaTeX Copied!" : "Copy LaTeX"}</span>
                    </button>
                  </div>

                  {propCalc.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {propCalc.error}
                    </div>
                  ) : (
                    <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
                      {propCalc.solvedVal !== undefined ? propCalc.solvedVal.toFixed(4) : "N/A"}
                    </div>
                  )}
                </div>

                {/* STEP-BY-STEP DERIVATION */}
                {propCalc.steps && propCalc.steps.length > 0 && !propCalc.error && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block text-[10px] flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" /> Step-by-Step Mathematical Solution
                    </span>
                    <div className="space-y-1.5 font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      {propCalc.steps.map((step, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED PROPORTIONS */}
          {savedPropItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Proportion Solves ({savedPropItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPropItems([]);
                    try {
                      localStorage.removeItem("saved_ratio_proportion");
                    } catch (e) {}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedPropItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map((s) => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedPropItems.filter((i) => i.id !== item.id);
                            setSavedPropItems(updated);
                            try {
                              localStorage.setItem("saved_ratio_proportion", JSON.stringify(updated));
                            } catch (e) {}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs}</div>
                        <div className="font-bold text-blue-600">{item.result}</div>
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
      {/* CARD 2: RATIO SIMPLIFIER & UNIT RATE (GCD REDUCTION) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Ratio Simplifier &amp; Unit Rate (GCD Reduction)</span>
          <button
            type="button"
            onClick={handleSaveSimp}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSimp ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Simplifier Terms
              </h2>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">First Term (A)</label>
                <input
                  type="text"
                  value={simpA}
                  onChange={(e) => setSimpA(e.target.value)}
                  placeholder="e.g. 12"
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Second Term (B)</label>
                <input
                  type="text"
                  value={simpB}
                  onChange={(e) => setSimpB(e.target.value)}
                  placeholder="e.g. 18"
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Third Term (C - Optional)
                </label>
                <input
                  type="text"
                  value={simpC}
                  onChange={(e) => setSimpC(e.target.value)}
                  placeholder="e.g. 24"
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Simplified Integer Ratio
                  </span>
                  {simpCalc.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{simpCalc.error}</div>
                  ) : (
                    <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
                      {simpCalc.formatted}
                    </div>
                  )}

                  {!simpCalc.error && (
                    <div className="pt-2 text-xs font-bold text-slate-500">
                      Unit Rate (per 1 unit of B):{" "}
                      <span className="font-mono text-blue-600 dark:text-blue-400">{simpCalc.unitRate}</span>
                    </div>
                  )}
                </div>

                {/* STEP-BY-STEP DERIVATION */}
                {simpCalc.steps && simpCalc.steps.length > 0 && !simpCalc.error && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block text-[10px]">
                      Step-by-Step Simplification
                    </span>
                    <div className="space-y-1.5 font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      {simpCalc.steps.map((step, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: RATIO PARTITIONING & AMOUNT DIVIDER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Ratio Partitioning &amp; Amount Divider</span>
          <button
            type="button"
            onClick={handleSavePart}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedPart ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Partition Inputs
              </h2>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Total Sum / Amount to Divide
                </label>
                <input
                  type="text"
                  value={partTotal}
                  onChange={(e) => setPartTotal(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Ratio Part A</label>
                  <input
                    type="text"
                    value={partA}
                    onChange={(e) => setPartA(e.target.value)}
                    placeholder="e.g. 2"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Ratio Part B</label>
                  <input
                    type="text"
                    value={partB}
                    onChange={(e) => setPartB(e.target.value)}
                    placeholder="e.g. 3"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Part C (Opt)</label>
                  <input
                    type="text"
                    value={partC}
                    onChange={(e) => setPartC(e.target.value)}
                    placeholder="e.g. 5"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Partition Shares
                  </span>
                  {partCalc.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{partCalc.error}</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-2xl sm:text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
                        {partCalc.formatted}
                      </div>

                      {/* CONTINUOUS SEGMENTED DISTRIBUTION BAR */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                          <PieChart className="w-3 h-3 text-blue-600" /> Visual Partition Distribution
                        </span>
                        <div className="h-8 w-full rounded-xl overflow-hidden flex text-xs font-bold text-white text-center leading-8 shadow-xs">
                          <div style={{ width: `${partCalc.pctA}%` }} className="bg-blue-600 truncate px-1">
                            Share A ({partCalc.pctA?.toFixed(1)}%)
                          </div>
                          <div style={{ width: `${partCalc.pctB}%` }} className="bg-emerald-600 truncate px-1">
                            Share B ({partCalc.pctB?.toFixed(1)}%)
                          </div>
                          {partCalc.hasC && partCalc.pctC && (
                            <div style={{ width: `${partCalc.pctC}%` }} className="bg-purple-600 truncate px-1">
                              Share C ({partCalc.pctC?.toFixed(1)}%)
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* STEP-BY-STEP DERIVATION */}
                {partCalc.steps && partCalc.steps.length > 0 && !partCalc.error && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block text-[10px]">
                      Step-by-Step Partitioning Derivation
                    </span>
                    <div className="space-y-1.5 font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      {partCalc.steps.map((step, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: ASPECT RATIO RESIZER & GOLDEN RATIO (Φ) SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Aspect Ratio Resizer &amp; Golden Ratio (Φ) Suite</span>
          <button
            type="button"
            onClick={handleSaveAspect}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedAspect ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Aspect / Golden Inputs
              </h2>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Select Tool Mode</label>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setAspectTool("aspect")}
                    className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                      aspectTool === "aspect" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Aspect Ratio
                  </button>
                  <button
                    type="button"
                    onClick={() => setAspectTool("golden")}
                    className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                      aspectTool === "golden" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Golden Ratio (Φ)
                  </button>
                </div>
              </div>

              {aspectTool === "aspect" ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Source Width (px)</label>
                      <input
                        type="text"
                        value={srcW}
                        onChange={(e) => setSrcW(e.target.value)}
                        placeholder="1920"
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Source Height (px)</label>
                      <input
                        type="text"
                        value={srcH}
                        onChange={(e) => setSrcH(e.target.value)}
                        placeholder="1080"
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Target Dimension Value (px)
                    </label>
                    <input
                      type="text"
                      value={targetDimVal}
                      onChange={(e) => setTargetDimVal(e.target.value)}
                      placeholder="1280"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Select Known Length</label>
                    <select
                      value={goldenGiven}
                      onChange={(e) => setGoldenGiven(e.target.value as any)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="total">Total Length (A + B)</option>
                      <option value="a">Known Long Segment (A)</option>
                      <option value="b">Known Short Segment (B)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Known Value</label>
                    <input
                      type="text"
                      value={goldenVal}
                      onChange={(e) => setGoldenVal(e.target.value)}
                      placeholder="100"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    {aspectCalc.solvedLabel}
                  </span>
                  {aspectCalc.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{aspectCalc.error}</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
                        {aspectCalc.formatted}
                      </div>

                      {aspectCalc.isGolden ? (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                            <Layers className="w-3 h-3 text-blue-600" /> Visual Golden Ratio Cut
                          </span>
                          <div className="h-8 w-full rounded-xl overflow-hidden flex text-xs font-bold text-white text-center leading-8 shadow-xs">
                            <div style={{ width: "61.8%" }} className="bg-blue-600 truncate px-1">
                              Segment A (61.8%)
                            </div>
                            <div style={{ width: "38.2%" }} className="bg-amber-500 truncate px-1">
                              Segment B (38.2%)
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                          <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                            <span className="text-[10px] text-slate-400 block uppercase">Simplified Aspect Ratio</span>
                            <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{aspectCalc.simpAspect}</span>
                          </div>
                          <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                            <span className="text-[10px] text-slate-400 block uppercase">Total Resolution</span>
                            <span className="font-sans tabular-nums">{aspectCalc.megapixels?.toFixed(2)} MP</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* STEP-BY-STEP DERIVATION */}
                {aspectCalc.steps && aspectCalc.steps.length > 0 && !aspectCalc.error && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block text-[10px]">
                      Step-by-Step Solution Breakdown
                    </span>
                    <div className="space-y-1.5 font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      {aspectCalc.steps.map((step, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EXECUTIVE PRINT / PDF REPORT MODAL */}
      <RatioReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        propTarget={propTarget}
        propA={propA}
        propB={propB}
        propC={propC}
        propD={propD}
        propCalc={propCalc}
        simpA={simpA}
        simpB={simpB}
        simpC={simpC}
        simpCalc={simpCalc}
        partTotal={partTotal}
        partA={partA}
        partB={partB}
        partC={partC}
        partCalc={partCalc}
        aspectTool={aspectTool}
        aspectCalc={aspectCalc}
      />
    </div>
  );
}

export default RatioCalculator;
