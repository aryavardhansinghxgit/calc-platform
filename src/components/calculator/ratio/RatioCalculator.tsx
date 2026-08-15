"use client";

import React, { useState, useMemo } from "react";
import { Copy, Check, ArrowRightLeft, Sparkles, HelpCircle, RefreshCw, BarChart2, PieChart, Monitor, Layers } from "lucide-react";

type CalcMode = "proportion" | "simplify" | "scaling" | "partition" | "aspect" | "golden";
type PropTarget = "A" | "B" | "C" | "D";

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
  const [calcMode, setCalcMode] = useState<CalcMode>("proportion");

  // Mode 1: Proportion (A : B = C : D)
  const [propTarget, setPropTarget] = useState<PropTarget>("D");
  const [propA, setPropA] = useState<string>("3");
  const [propB, setPropB] = useState<string>("4");
  const [propC, setPropC] = useState<string>("6");
  const [propD, setPropD] = useState<string>("8");

  // Mode 2: Ratio Simplifier (Multi-Term)
  const [simpA, setSimpA] = useState<string>("12");
  const [simpB, setSimpB] = useState<string>("18");
  const [simpC, setSimpC] = useState<string>("24");

  // Mode 3: Scaling
  const [scaleA, setScaleA] = useState<string>("2");
  const [scaleB, setScaleB] = useState<string>("5");
  const [scaleFactor, setScaleFactor] = useState<string>("3");

  // Mode 4: Partition / Total Amount
  const [partTotal, setPartTotal] = useState<string>("500");
  const [partA, setPartA] = useState<string>("2");
  const [partB, setPartB] = useState<string>("3");
  const [partC, setPartC] = useState<string>("5");

  // Mode 5: Aspect Ratio
  const [aspectPreset, setAspectPreset] = useState<string>("16:9");
  const [srcW, setSrcW] = useState<string>("1920");
  const [srcH, setSrcH] = useState<string>("1080");
  const [targetDim, setTargetDim] = useState<"width" | "height">("width");
  const [targetDimVal, setTargetDimVal] = useState<string>("1280");

  // Mode 6: Golden Ratio
  const [goldenGiven, setGoldenGiven] = useState<"total" | "a" | "b">("total");
  const [goldenVal, setGoldenVal] = useState<string>("100");

  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);

  // Quick Preset Helper
  const applyPreset = (mode: CalcMode) => {
    setCalcMode(mode);
    if (mode === "proportion") {
      setPropA("3");
      setPropB("4");
      setPropC("6");
      setPropTarget("D");
    } else if (mode === "simplify") {
      setSimpA("0.75");
      setSimpB("1.5");
      setSimpC("2.25");
    } else if (mode === "partition") {
      setPartTotal("1000");
      setPartA("2");
      setPartB("3");
      setPartC("5");
    } else if (mode === "aspect") {
      setSrcW("1920");
      setSrcH("1080");
      setTargetDimVal("1280");
    } else if (mode === "golden") {
      setGoldenGiven("total");
      setGoldenVal("100");
    }
  };

  // Main Calculation Engine
  const calculation = useMemo(() => {
    const steps: string[] = [];

    if (calcMode === "proportion") {
      const a = parseNum(propA);
      const b = parseNum(propB);
      const c = parseNum(propC);
      const d = parseNum(propD);

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
          steps
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
          steps
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
          steps
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
          steps
        };
      }

    } else if (calcMode === "simplify") {
      const vA = parseNum(simpA);
      const vB = parseNum(simpB);
      const vC = parseNum(simpC);

      if (isNaN(vA) || isNaN(vB)) return { error: "Please enter valid numeric values for ratio terms." };

      // Multiply by 1000 if decimals present
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
        steps
      };

    } else if (calcMode === "scaling") {
      const sA = parseNum(scaleA);
      const sB = parseNum(scaleB);
      const k = parseNum(scaleFactor);

      if (isNaN(sA) || isNaN(sB) || isNaN(k)) return { error: "Please enter valid numeric values." };

      const resA = sA * k;
      const resB = sB * k;
      const formatted = `${resA.toFixed(2)} : ${resB.toFixed(2)}`;

      steps.push(`1. Original Ratio: ${sA} : ${sB}`);
      steps.push(`2. Scale Multiplier: k = ${k}`);
      steps.push(`3. Scaled Terms: (${sA} × ${k}) : (${sB} × ${k}) = ${formatted}`);

      return {
        solvedLabel: "Scaled Ratio",
        formatted,
        resA,
        resB,
        latex: `(${sA} \\times ${k}) : (${sB} \\times ${k}) = ${formatted}`,
        steps
      };

    } else if (calcMode === "partition") {
      const tot = parseNum(partTotal);
      const pA = parseNum(partA);
      const pB = parseNum(partB);
      const pC = parseNum(partC);

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
        steps
      };

    } else if (calcMode === "aspect") {
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
        solvedLabel: "Resized Resolution",
        formatted: `${resWidth.toFixed(0)} × ${resHeight.toFixed(0)} px`,
        simpAspect: `${simpW} : ${simpH}`,
        aspectVal,
        megapixels,
        latex: `\\text{Resolution} = ${resWidth.toFixed(0)} \\times ${resHeight.toFixed(0)} \\text{ px}`,
        steps
      };

    } else {
      // GOLDEN RATIO (Phi ≈ 1.6180339887)
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
        solvedLabel: "Golden Cut Sections",
        formatted: `Segment A: ${aPart.toFixed(4)}, Segment B: ${bPart.toFixed(4)}`,
        aPart,
        bPart,
        totalL,
        latex: `\\Phi = \\frac{${aPart.toFixed(4)}}{${bPart.toFixed(4)}} = 1.618034`,
        steps
      };
    }
  }, [calcMode, propTarget, propA, propB, propC, propD, simpA, simpB, simpC, scaleA, scaleB, scaleFactor, partTotal, partA, partB, partC, srcW, srcH, targetDim, targetDimVal, goldenGiven, goldenVal]);

  // SVG Visual Proportion & Partition Chart
  const svgChart = useMemo(() => {
    if (calculation.error) return null;

    const width = 450;
    const height = 120;

    if (calcMode === "partition" && calculation.pctA !== undefined) {
      const pA = calculation.pctA;
      const pB = calculation.pctB;
      const pC = calculation.pctC || 0;

      const wA = (pA / 100) * (width - 40);
      const wB = (pB / 100) * (width - 40);
      const wC = (pC / 100) * (width - 40);

      return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto text-xs font-sans tabular-nums">
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
    } else if (calcMode === "golden" && calculation.aPart) {
      const total = calculation.totalL || 1;
      const pA = (calculation.aPart / total) * (width - 40);
      const pB = (calculation.bPart / total) * (width - 40);

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
    }
    return null;
  }, [calcMode, calculation]);

  const handleCopyText = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedLatex(true);
      setTimeout(() => setCopiedLatex(false), 2000);
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. TABS & PRESETS NAVIGATION */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {[
            { id: "proportion", label: "Solve Proportion (A:B=C:D)" },
            { id: "simplify", label: "Ratio Simplifier (GCD)" },
            { id: "scaling", label: "Ratio Scaling (k)" },
            { id: "partition", label: "Divide Amount (Share)" },
            { id: "aspect", label: "Aspect Ratio Resizer" },
            { id: "golden", label: "Golden Ratio (Φ)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCalcMode(tab.id as CalcMode)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                calcMode === tab.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => applyPreset(calcMode)}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors flex items-center gap-1 ml-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" /> Reset Mode
        </button>
      </div>

      {/* 2. MAIN SPLIT-PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: INPUT CONTROLS */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Ratio &amp; Proportion Inputs
            </h2>

            {/* MODE 1: PROPORTION */}
            {calcMode === "proportion" && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Select Target Unknown Variable to Solve
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
              </>
            )}

            {/* MODE 2: SIMPLIFIER */}
            {calcMode === "simplify" && (
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
            )}

            {/* MODE 4: PARTITION */}
            {calcMode === "partition" && (
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
            )}

            {/* MODE 5: ASPECT RATIO */}
            {calcMode === "aspect" && (
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
            )}

            {/* MODE 6: GOLDEN RATIO */}
            {calcMode === "golden" && (
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
        </div>

        {/* RIGHT COLUMN: HERO RESULT CARD & GRAPH */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
            {/* HERO RESULT CARD */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-5 rounded-2xl border border-blue-200 dark:border-slate-700 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {calculation.solvedLabel}
                </span>
                <button
                  type="button"
                  onClick={() => calculation.latex && handleCopyText(calculation.latex)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                >
                  {copiedLatex ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                  <span>{copiedLatex ? "LaTeX Copied!" : "Copy LaTeX"}</span>
                </button>
              </div>

              {calculation.error ? (
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {calculation.error}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
                    {calculation.solvedVal !== undefined ? calculation.solvedVal.toFixed(4) : calculation.formatted}
                  </div>

                  {calcMode === "simplify" && (
                    <div className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl">
                      Unit Rate (per 1 unit): {calculation.unitRate}
                    </div>
                  )}

                  {calcMode === "aspect" && (
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                      <div className="p-2.5 bg-white/80 dark:bg-slate-800/80 rounded-xl">
                        <span className="text-[10px] text-slate-400 block uppercase">Simplified Aspect Ratio</span>
                        <span className="font-sans tabular-nums text-blue-600">{calculation.simpAspect}</span>
                      </div>
                      <div className="p-2.5 bg-white/80 dark:bg-slate-800/80 rounded-xl">
                        <span className="text-[10px] text-slate-400 block uppercase">Total Resolution</span>
                        <span className="font-sans tabular-nums">{calculation.megapixels?.toFixed(2)} MP</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* VISUAL PROPORTION / PARTITION CHART */}
            {svgChart && (
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <PieChart className="w-3.5 h-3.5" /> Visual Proportion &amp; Partition Distribution
                </span>
                {svgChart}
              </div>
            )}

            {/* STEP-BY-STEP BREAKDOWN */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> Step-by-Step Mathematical Solution
              </h3>

              {!calculation.error && calculation.steps && (
                <div className="space-y-2 text-xs font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                  {calculation.steps.map((step, idx) => (
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
    </div>
  );
}

export default RatioCalculator;
