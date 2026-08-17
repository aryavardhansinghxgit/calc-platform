"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Copy, Check, ArrowRightLeft, Sparkles, HelpCircle, RefreshCw, BarChart2, PieChart, Monitor, Layers, Bookmark, Trash2, ChevronDown, ChevronUp } from "lucide-react";

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

function parseNum(valStr: string): number {
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

  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);

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
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
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
    } catch (e) {}
  }, []);

  // Card 1 Calculation: Solve Proportion
  const propCalc = useMemo(() => {
    const a = parseNum(propA);
    const b = parseNum(propB);
    const c = parseNum(propC);
    const d = parseNum(propD);

    const steps: string[] = [];

    if (propTarget === "D") {
      if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) return { error: "Please enter valid values (A cannot be zero)." };
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
      if (isNaN(a) || isNaN(b) || isNaN(d) || b === 0) return { error: "Please enter valid values (B cannot be zero)." };
      const resC = (a * d) / b;
      steps.push(`Proportion Equation: A / B = C / D  ⇒  ${a} / ${b} = C / ${d}`);
      steps.push(`Cross-Multiplication: C = (A × D) / B  ⇒  (${a} × ${d}) / ${b} = ${resC.toFixed(4)}`);
      return {
        solvedVal: resC,
        solvedLabel: "Missing Term (C)",
        latex: `\\frac{${a}}{${b}} = \\frac{C}{${d}} \\implies C = \\frac{${a} \\times ${d}}{${b}} = ${resC.toFixed(4)}`,
        steps,
        error: null
      };
    } else if (propTarget === "B") {
      if (isNaN(a) || isNaN(c) || isNaN(d) || c === 0) return { error: "Please enter valid values (C cannot be zero)." };
      const resB = (a * d) / c;
      steps.push(`Proportion Equation: A / B = C / D  ⇒  ${a} / B = ${c} / ${d}`);
      steps.push(`Solve for B: B = (A × D) / C  ⇒  (${a} × ${d}) / ${c} = ${resB.toFixed(4)}`);
      return {
        solvedVal: resB,
        solvedLabel: "Missing Term (B)",
        latex: `\\frac{${a}}{B} = \\frac{${c}}{${d}} \\implies B = \\frac{${a} \\times ${d}}{${c}} = ${resB.toFixed(4)}`,
        steps,
        error: null
      };
    } else {
      if (isNaN(b) || isNaN(c) || isNaN(d) || d === 0) return { error: "Please enter valid values (D cannot be zero)." };
      const resA = (b * c) / d;
      steps.push(`Proportion Equation: A / B = C / D  ⇒  A / ${b} = ${c} / ${d}`);
      steps.push(`Solve for A: A = (B × C) / D  ⇒  (${b} × ${c}) / ${d} = ${resA.toFixed(4)}`);
      return {
        solvedVal: resA,
        solvedLabel: "Missing Term (A)",
        latex: `\\frac{A}{${b}} = \\frac{${c}}{${d}} \\implies A = \\frac{${b} \\times ${c}}{${d}} = ${resA.toFixed(4)}`,
        steps,
        error: null
      };
    }
  }, [propTarget, propA, propB, propC, propD]);

  // Card 2 Calculation: Ratio Simplifier
  const simpCalc = useMemo(() => {
    const vA = parseNum(simpA);
    const vB = parseNum(simpB);
    const vC = parseNum(simpC);

    const steps: string[] = [];

    if (isNaN(vA) || isNaN(vB)) return { error: "Please enter valid numeric values for ratio terms." };

    const factor = 10000;
    const intA = Math.round(vA * factor);
    const intB = Math.round(vB * factor);
    const intC = isNaN(vC) ? null : Math.round(vC * factor);

    const commonGcd = intC !== null ? gcdArray([intA, intB, intC]) : gcd(intA, intB);

    const simpIntA = intA / commonGcd;
    const simpIntB = intB / commonGcd;
    const simpIntC = intC !== null ? intC / commonGcd : null;

    const strRes = simpIntC !== null ? `${simpIntA} : ${simpIntB} : ${simpIntC}` : `${simpIntA} : ${simpIntB}`;
    const unitRate = vB !== 0 ? (vA / vB).toFixed(4) : "N/A";

    steps.push(`1. Convert decimal terms to integer scaling: ${vA} × 10000 = ${intA}, ${vB} × 10000 = ${intB}`);
    steps.push(`2. Calculate Greatest Common Divisor (GCD): GCD = ${commonGcd}`);
    steps.push(`3. Divide each term by GCD: ${intA}/${commonGcd} : ${intB}/${commonGcd} = ${strRes}`);
    steps.push(`4. Unit Rate (Value per 1 unit of B): ${vA} / ${vB} = ${unitRate}`);

    return {
      solvedLabel: "Simplified Integer Ratio",
      formatted: strRes,
      unitRate,
      latex: `${vA} : ${vB} = ${strRes}`,
      steps,
      error: null
    };
  }, [simpA, simpB, simpC]);

  // Card 3 Calculation: Partition / Amount Divider
  const partCalc = useMemo(() => {
    const tot = parseNum(partTotal);
    const pA = parseNum(partA);
    const pB = parseNum(partB);
    const pC = parseNum(partC);

    const steps: string[] = [];

    if (isNaN(tot) || isNaN(pA) || isNaN(pB) || tot <= 0 || pA < 0 || pB < 0) {
      return { error: "Please enter valid total sum and positive ratio terms." };
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

  // Card 4 Calculation: Aspect Ratio & Golden Ratio
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

  // Save Card 1 Handler
  const handleSaveProp = () => {
    if (propCalc.error || propCalc.solvedVal === undefined) return;

    const inputsStr = `Solve: ${propTarget}, A: ${propA}, B: ${propB}, C: ${propC}, D: ${propD}`;
    const opStr = `Proportion Calculation (${propA}:${propB} = ${propC}:${propD})`;
    const resList = [
      `Solved Unknown (${propTarget}) = ${propCalc.solvedVal?.toFixed(4)}`
    ];

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

    const updated = [newItem, ...savedPropItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedPropItems(updated);
    try {
      localStorage.setItem("saved_ratio_proportion", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedProp(true);
    setTimeout(() => setJustSavedProp(false), 2000);
  };

  // Save Card 2 Handler
  const handleSaveSimp = () => {
    if (simpCalc.error || !simpCalc.formatted) return;

    const inputsStr = `Terms: ${simpA} : ${simpB}${simpC ? " : " + simpC : ""}`;
    const opStr = `Ratio Simplification`;
    const resList = [
      `Simplified Ratio = ${simpCalc.formatted}`,
      `Unit Rate (per 1 unit of B) = ${simpCalc.unitRate}`
    ];

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

    const updated = [newItem, ...savedSimpItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedSimpItems(updated);
    try {
      localStorage.setItem("saved_ratio_simplify", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedSimp(true);
    setTimeout(() => setJustSavedSimp(false), 2000);
  };

  // Save Card 3 Handler
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

    const updated = [newItem, ...savedPartItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedPartItems(updated);
    try {
      localStorage.setItem("saved_ratio_partition", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedPart(true);
    setTimeout(() => setJustSavedPart(false), 2000);
  };

  // Save Card 4 Handler
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

    const updated = [newItem, ...savedAspectItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedAspectItems(updated);
    try {
      localStorage.setItem("saved_ratio_aspect", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedAspect(true);
    setTimeout(() => setJustSavedAspect(false), 2000);
  };

  // SVG Partition Visualizer for Card 3
  const svgPartChart = useMemo(() => {
    if (partCalc.error || partCalc.pctA === undefined) return null;

    const width = 450;
    const height = 120;
    const pA = partCalc.pctA;
    const pB = partCalc.pctB;
    const pC = partCalc.pctC || 0;

    const wA = (pA / 100) * (width - 40);
    const wB = (pB / 100) * (width - 40);
    const wC = (pC / 100) * (width - 40);

    return (
      <svg suppressHydrationWarning viewBox={`0 0 ${width} ${height}`} className="w-full h-auto text-xs font-sans tabular-nums">
        <rect x={20} y={30} width={wA} height={40} fill="#2563eb" rx={6} />
        <rect x={20 + wA} y={30} width={wB} height={40} fill="#10b981" rx={6} />
        {pC > 0 && <rect x={20 + wA + wB} y={30} width={wC} height={40} fill="#8b5cf6" rx={6} />}

        <text x={20 + wA / 2} y={55} textAnchor="middle" fill="#ffffff" className="font-extrabold text-[10px]">
          Share A ({pA.toFixed(1)}%)
        </text>
        <text x={20 + wA + wB / 2} y={55} textAnchor="middle" fill="#ffffff" className="font-extrabold text-[10px]">
          Share B ({pB.toFixed(1)}%)
        </text>
        {pC > 0 && (
          <text x={20 + wA + wB + wC / 2} y={55} textAnchor="middle" fill="#ffffff" className="font-extrabold text-[10px]">
            Share C ({pC.toFixed(1)}%)
          </text>
        )}
      </svg>
    );
  }, [partCalc]);

  // SVG Golden Visualizer for Card 4
  const svgGoldenChart = useMemo(() => {
    if (!aspectCalc.isGolden || aspectCalc.error || !aspectCalc.aPart) return null;

    const width = 450;
    const height = 120;
    const total = aspectCalc.totalL || 1;
    const pA = (aspectCalc.aPart / total) * (width - 40);
    const pB = (aspectCalc.bPart / total) * (width - 40);

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto text-xs font-sans tabular-nums">
        <rect x={20} y={35} width={pA} height={35} fill="#2563eb" rx={6} />
        <rect x={20 + pA} y={35} width={pB} height={35} fill="#f59e0b" rx={6} />
        <text x={20 + pA / 2} y={57} textAnchor="middle" fill="#ffffff" className="font-extrabold text-[10px]">
          Segment A (61.8%)
        </text>
        <text x={20 + pA + pB / 2} y={57} textAnchor="middle" fill="#ffffff" className="font-extrabold text-[10px]">
          Segment B (38.2%)
        </text>
      </svg>
    );
  }, [aspectCalc]);

  const handleCopyText = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedLatex(true);
      setTimeout(() => setCopiedLatex(false), 2000);
    } catch (e) {}
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT CONTROLS */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Proportion Inputs
                </h2>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Select Unknown Target Variable to Solve
                  </label>
                  <div className="grid grid-cols-4 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans tabular-nums">
                    {(["A", "B", "C", "D"] as PropTarget[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setPropTarget(t)}
                        className={`py-1.5 rounded-lg cursor-pointer ${propTarget === t ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                      >
                        Solve {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Proportion Equivalence</span>
                  <div className="font-sans tabular-nums font-extrabold text-xl text-blue-600 dark:text-blue-400">
                    {propTarget === "A" ? "?" : propA} : {propTarget === "B" ? "?" : propB} = {propTarget === "C" ? "?" : propC} : {propTarget === "D" ? "?" : propD}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {propTarget !== "A" && (
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Term A</label>
                      <input
                        type="text"
                        value={propA}
                        onChange={(e) => setPropA(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
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
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
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
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
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
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT CARD */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {propCalc.solvedLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => propCalc.latex && handleCopyText(propCalc.latex)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                    >
                      {copiedLatex ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                      <span>{copiedLatex ? "LaTeX Copied!" : "Copy LaTeX"}</span>
                    </button>
                  </div>

                  {propCalc.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {propCalc.error}
                    </div>
                  ) : (
                    <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
                      {propCalc.solvedVal?.toFixed(4)}
                    </div>
                  )}
                </div>

                {/* STEP-BY-STEP BREAKDOWN */}
                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Step-by-Step Mathematical Solution
                  </h3>

                  {!propCalc.error && propCalc.steps && (
                    <div className="space-y-2 text-xs font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                      {propCalc.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                          <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">{idx + 1}.</span>
                          <span className="font-sans tabular-nums">{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED PROPORTION CALCULATIONS INSIDE CARD 1 */}
          {savedPropItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Proportion Calculations ({savedPropItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPropItems([]);
                    try { localStorage.removeItem("saved_ratio_proportion"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedPropItems.map((item) => {
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
                            const updated = savedPropItems.filter(i => i.id !== item.id);
                            setSavedPropItems(updated);
                            try { localStorage.setItem("saved_ratio_proportion", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Operation: </span>
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
                              Complete Calculated Answers:
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
      {/* CARD 2: RATIO SIMPLIFIER & UNIT RATE */}
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

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">First Term (A)</label>
                  <input
                    type="text"
                    value={simpA}
                    onChange={(e) => setSimpA(e.target.value)}
                    placeholder="e.g. 12 or 0.75"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Second Term (B)</label>
                  <input
                    type="text"
                    value={simpB}
                    onChange={(e) => setSimpB(e.target.value)}
                    placeholder="e.g. 18 or 1.5"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Third Term (C - Optional)</label>
                  <input
                    type="text"
                    value={simpC}
                    onChange={(e) => setSimpC(e.target.value)}
                    placeholder="e.g. 24 or 2.25"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SIMPLIFIED RATIO & UNIT RATE */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Simplified Integer Ratio
                  </span>
                  {simpCalc.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {simpCalc.error}
                    </div>
                  ) : (
                    <div className="text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                      {simpCalc.formatted}
                    </div>
                  )}
                </div>

                {!simpCalc.error && (
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Unit Rate (per 1 unit of B)</span>
                    <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{simpCalc.unitRate}</span>
                  </div>
                )}

                {/* STEP-BY-STEP DERIVATION */}
                {simpCalc.steps && simpCalc.steps.length > 0 && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block text-[10px]">
                      Step-by-Step Simplification
                    </span>
                    <div className="space-y-1 font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      {simpCalc.steps.map((step, idx) => (
                        <div key={idx} className="p-1.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED RATIO SIMPLIFICATIONS INSIDE CARD 2 */}
          {savedSimpItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Ratio Simplifications ({savedSimpItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSimpItems([]);
                    try { localStorage.removeItem("saved_ratio_simplify"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedSimpItems.map((item) => {
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
                            const updated = savedSimpItems.filter(i => i.id !== item.id);
                            setSavedSimpItems(updated);
                            try { localStorage.setItem("saved_ratio_simplify", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Terms: </span>
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

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Total Sum / Amount to Divide</label>
                  <input
                    type="text"
                    value={partTotal}
                    onChange={(e) => setPartTotal(e.target.value)}
                    placeholder="e.g. 500"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Ratio Part A</label>
                    <input
                      type="text"
                      value={partA}
                      onChange={(e) => setPartA(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Ratio Part B</label>
                    <input
                      type="text"
                      value={partB}
                      onChange={(e) => setPartB(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Part C (Opt)</label>
                    <input
                      type="text"
                      value={partC}
                      onChange={(e) => setPartC(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PARTITION SHARES & VISUAL BAR */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Partition Shares
                  </span>
                  {partCalc.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {partCalc.error}
                    </div>
                  ) : (
                    <div className="text-2xl sm:text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                      {partCalc.formatted}
                    </div>
                  )}
                </div>

                {/* VISUAL PARTITION BAR SVG */}
                {svgPartChart && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <PieChart className="w-3.5 h-3.5" /> Visual Partition Distribution
                    </span>
                    {svgPartChart}
                  </div>
                )}

                {/* STEP-BY-STEP BREAKDOWN */}
                {partCalc.steps && partCalc.steps.length > 0 && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block text-[10px]">
                      Step-by-Step Partitioning Derivation
                    </span>
                    <div className="space-y-1 font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      {partCalc.steps.map((step, idx) => (
                        <div key={idx} className="p-1.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED RATIO PARTITIONS INSIDE CARD 3 */}
          {savedPartItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Ratio Partitions ({savedPartItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPartItems([]);
                    try { localStorage.removeItem("saved_ratio_partition"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedPartItems.map((item) => {
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
                            const updated = savedPartItems.filter(i => i.id !== item.id);
                            setSavedPartItems(updated);
                            try { localStorage.setItem("saved_ratio_partition", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Total: </span>
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
                              Complete Partition Shares:
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
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Select Tool Mode
                </label>
                <div className="grid grid-cols-2 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans tabular-nums">
                  <button
                    onClick={() => setAspectTool("aspect")}
                    className={`py-1.5 rounded-lg cursor-pointer ${aspectTool === "aspect" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    Aspect Ratio
                  </button>
                  <button
                    onClick={() => setAspectTool("golden")}
                    className={`py-1.5 rounded-lg cursor-pointer ${aspectTool === "golden" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    Golden Ratio (Φ)
                  </button>
                </div>
              </div>

              {aspectTool === "aspect" ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Source Width (px)</label>
                      <input
                        type="text"
                        value={srcW}
                        onChange={(e) => setSrcW(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Source Height (px)</label>
                      <input
                        type="text"
                        value={srcH}
                        onChange={(e) => setSrcH(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Dimension Value (px)</label>
                    <input
                      type="text"
                      value={targetDimVal}
                      onChange={(e) => setTargetDimVal(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Select Known Length</label>
                    <select
                      value={goldenGiven}
                      onChange={(e) => setGoldenGiven(e.target.value as "total" | "a" | "b")}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs"
                    >
                      <option value="total">Total Length (A + B)</option>
                      <option value="a">Long Segment (A)</option>
                      <option value="b">Short Segment (B)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Known Value</label>
                    <input
                      type="text"
                      value={goldenVal}
                      onChange={(e) => setGoldenVal(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: LIVE ASPECT / GOLDEN OUTPUT MATRIX */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    {aspectCalc.solvedLabel}
                  </span>
                  {aspectCalc.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {aspectCalc.error}
                    </div>
                  ) : (
                    <div className="text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                      {aspectCalc.formatted}
                    </div>
                  )}
                </div>

                {!aspectCalc.error && !aspectCalc.isGolden && (
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Simplified Aspect Ratio</span>
                      <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{aspectCalc.simpAspect}</span>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Total Resolution</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{aspectCalc.megapixels?.toFixed(2)} MP</span>
                    </div>
                  </div>
                )}

                {svgGoldenChart && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <PieChart className="w-3.5 h-3.5" /> Visual Golden Ratio Cut
                    </span>
                    {svgGoldenChart}
                  </div>
                )}

                {/* STEP-BY-STEP DERIVATION */}
                {aspectCalc.steps && aspectCalc.steps.length > 0 && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block text-[10px]">
                      Step-by-Step Solution Breakdown
                    </span>
                    <div className="space-y-1 font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      {aspectCalc.steps.map((step, idx) => (
                        <div key={idx} className="p-1.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED ASPECT & GOLDEN RATIOS INSIDE CARD 4 */}
          {savedAspectItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Aspect &amp; Golden Ratios ({savedAspectItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedAspectItems([]);
                    try { localStorage.removeItem("saved_ratio_aspect"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedAspectItems.map((item) => {
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
                            const updated = savedAspectItems.filter(i => i.id !== item.id);
                            setSavedAspectItems(updated);
                            try { localStorage.setItem("saved_ratio_aspect", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Dimensions: </span>
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

export default RatioCalculator;
