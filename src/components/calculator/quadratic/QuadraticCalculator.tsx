"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Copy, Check, Sparkles, HelpCircle, RefreshCw, Layers, Eye, Sliders, Bookmark, Trash2, ChevronDown, ChevronUp } from "lucide-react";

type SolvingMethod = "formula" | "square" | "factoring";

export interface SavedQuadraticItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

// Helper: Parse string input (supports fraction "1/2" or decimal "-3.5")
function parseInputVal(str: string): number {
  if (!str) return 0;
  const trimmed = str.trim();
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

// Helper: Simplify radical sqrt(N) into k * sqrt(m)
function simplifyRadical(n: number): { k: number; m: number } {
  const absN = Math.abs(Math.round(n));
  let k = 1;
  let m = absN;
  for (let i = Math.floor(Math.sqrt(absN)); i >= 2; i--) {
    if (absN % (i * i) === 0) {
      k = i;
      m = absN / (i * i);
      break;
    }
  }
  return { k, m };
}

// Helper: Greatest Common Divisor
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

export function QuadraticCalculator() {
  const [aStr, setAStr] = useState<string>("1");
  const [bStr, setBStr] = useState<string>("-5");
  const [cStr, setCStr] = useState<string>("6");
  const [activeMethod, setActiveMethod] = useState<SolvingMethod>("formula");

  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);

  // Saved calculations states for Card 1 & Card 2
  const [savedQuadraticItems, setSavedQuadraticItems] = useState<SavedQuadraticItem[]>([]);
  const [justSavedQuadratic, setJustSavedQuadratic] = useState<boolean>(false);

  const [savedVertexItems, setSavedVertexItems] = useState<SavedQuadraticItem[]>([]);
  const [justSavedVertex, setJustSavedVertex] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedQuad = localStorage.getItem("saved_quadratic_calculations");
      if (storedQuad) setSavedQuadraticItems(JSON.parse(storedQuad));

      const storedVert = localStorage.getItem("saved_quadratic_vertex");
      if (storedVert) setSavedVertexItems(JSON.parse(storedVert));
    } catch (e) {}
  }, []);

  const a = parseInputVal(aStr);
  const b = parseInputVal(bStr);
  const c = parseInputVal(cStr);

  // Calculation Engine
  const calculation = useMemo(() => {
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      return { error: "Please enter valid numeric values for coefficients a, b, and c." };
    }

    if (a === 0) {
      if (b === 0) {
        return { error: "When a = 0 and b = 0, the equation is degenerate (no variable x)." };
      }
      const linRoot = -c / b;
      return {
        isLinear: true,
        linRoot,
        error: "Coefficient 'a' cannot be zero in a quadratic equation. This degenerates to the linear equation bx + c = 0.",
        steps: [
          `Equation degenerates to linear form: ${b}x + ${c} = 0`,
          `Subtract c: ${b}x = ${-c}`,
          `Divide by b: x = ${-c} / ${b} = ${linRoot.toFixed(4)}`
        ]
      };
    }

    const disc = b * b - 4 * a * c;

    const h = -b / (2 * a);
    const k = c - (b * b) / (4 * a);

    const focusY = k + 1 / (4 * a);
    const directrixY = k - 1 / (4 * a);
    const yIntercept = c;

    const stepsFormula: string[] = [];
    const stepsSquare: string[] = [];
    const stepsFactor: string[] = [];

    // --- METHOD 1: QUADRATIC FORMULA ---
    stepsFormula.push(`Standard Form Equation: ${a}x² ${b >= 0 ? "+ " + b : "- " + Math.abs(b)}x ${c >= 0 ? "+ " + c : "- " + Math.abs(c)} = 0`);
    stepsFormula.push(`Identify Coefficients: a = ${a}, b = ${b}, c = ${c}`);
    stepsFormula.push(`Discriminant (Δ = b² - 4ac): (${b})² - 4(${a})(${c}) = ${b * b} - ${4 * a * c} = ${disc}`);

    let rootsSummary = "";
    let x1Val = 0;
    let x2Val = 0;
    let x1Complex = "";
    let x2Complex = "";
    let isComplex = false;

    if (disc > 0) {
      const sqrtDisc = Math.sqrt(disc);
      x1Val = (-b + sqrtDisc) / (2 * a);
      x2Val = (-b - sqrtDisc) / (2 * a);

      const rad = simplifyRadical(disc);
      let radStr = `√${disc}`;
      if (rad.k > 1) {
        radStr = rad.m === 1 ? `${rad.k}` : `${rad.k}√${rad.m}`;
      }

      stepsFormula.push(`Substitute into Quadratic Formula: x = [-(${b}) ± √(${disc})] / (2 × ${a})`);
      stepsFormula.push(`Simplify Radical: √${disc} ${rad.k > 1 ? `= ${radStr}` : ""}`);
      stepsFormula.push(`Root 1 (x₁): [-(${b}) + ${sqrtDisc.toFixed(4)}] / ${2 * a} = ${x1Val.toFixed(4)}`);
      stepsFormula.push(`Root 2 (x₂): [-(${b}) - ${sqrtDisc.toFixed(4)}] / ${2 * a} = ${x2Val.toFixed(4)}`);
      rootsSummary = `x₁ = ${x1Val.toFixed(4)}, x₂ = ${x2Val.toFixed(4)}`;

    } else if (disc === 0) {
      x1Val = -b / (2 * a);
      x2Val = x1Val;
      stepsFormula.push(`Discriminant Δ = 0: One repeated real root.`);
      stepsFormula.push(`x = -(${b}) / (2 × ${a}) = ${x1Val.toFixed(4)}`);
      rootsSummary = `x₁ = x₂ = ${x1Val.toFixed(4)}`;

    } else {
      isComplex = true;
      const realPart = -b / (2 * a);
      const imagPart = Math.sqrt(Math.abs(disc)) / (2 * a);
      const absImag = Math.abs(imagPart);

      x1Complex = `${realPart.toFixed(4)} + ${absImag.toFixed(4)}i`;
      x2Complex = `${realPart.toFixed(4)} - ${absImag.toFixed(4)}i`;

      stepsFormula.push(`Discriminant Δ < 0: Two complex conjugate roots (imaginary unit i = √-1).`);
      stepsFormula.push(`Real Part: -b / 2a = -(${b}) / ${2 * a} = ${realPart.toFixed(4)}`);
      stepsFormula.push(`Imaginary Part: √(4ac - b²) / 2a = √(${Math.abs(disc)}) / ${2 * a} = ${absImag.toFixed(4)}i`);
      stepsFormula.push(`Complex Roots: x = ${realPart.toFixed(4)} ± ${absImag.toFixed(4)}i`);
      rootsSummary = `x = ${realPart.toFixed(4)} ± ${absImag.toFixed(4)}i`;
    }

    // --- METHOD 2: COMPLETING THE SQUARE ---
    stepsSquare.push(`1. Start with Standard Form: ${a}x² + ${b}x + ${c} = 0`);
    if (a !== 1) {
      stepsSquare.push(`2. Divide entire equation by a (${a}): x² + (${b}/${a})x + (${c}/${a}) = 0`);
    }
    stepsSquare.push(`3. Move constant term to right side: x² + (${(b/a).toFixed(4)})x = ${(-c/a).toFixed(4)}`);
    const halfB = b / (2 * a);
    const halfBSq = halfB * halfB;
    stepsSquare.push(`4. Add (b/2a)² = (${halfB.toFixed(4)})² = ${halfBSq.toFixed(4)} to both sides:`);
    stepsSquare.push(`   x² + (${(b/a).toFixed(4)})x + ${halfBSq.toFixed(4)} = ${(-c/a + halfBSq).toFixed(4)}`);
    stepsSquare.push(`5. Write left side as a perfect square: (x + ${halfB.toFixed(4)})² = ${(-c/a + halfBSq).toFixed(4)}`);
    stepsSquare.push(`6. Take square root of both sides and solve for x.`);

    // --- METHOD 3: FACTORING ---
    if (disc >= 0 && Number.isInteger(disc) && Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(c)) {
      const sqrtD = Math.round(Math.sqrt(disc));
      if (sqrtD * sqrtD === disc) {
        stepsFactor.push(`1. Calculate Discriminant: Δ = ${disc} (Perfect Square!). Can be factored over integers.`);
        stepsFactor.push(`2. Find factors of a×c = ${a*c} that sum to b = ${b}.`);
        stepsFactor.push(`3. Factored Form: (x - (${x1Val.toFixed(4)}))(x - (${x2Val.toFixed(4)})) = 0`);
        stepsFactor.push(`4. Apply Zero Product Property: x = ${x1Val.toFixed(4)} or x = ${x2Val.toFixed(4)}`);
      } else {
        stepsFactor.push(`Discriminant Δ = ${disc} is NOT a perfect square. Cannot be factored into simple integers.`);
      }
    } else {
      stepsFactor.push(`Discriminant Δ = ${disc}. Factoring over real integers is not applicable.`);
    }

    const vertexFormStr = `y = ${a === 1 ? "" : a === -1 ? "-" : a}(x ${h >= 0 ? "- " + h.toFixed(4) : "+ " + Math.abs(h).toFixed(4)})² ${k >= 0 ? "+ " + k.toFixed(4) : "- " + Math.abs(k).toFixed(4)}`;

    const latex = `x = \\frac{-(${b}) \\pm \\sqrt{(${b})^2 - 4(${a})(${c})}}{2(${a})} = ${isComplex ? `${(-b/(2*a)).toFixed(2)} \\pm ${(Math.sqrt(Math.abs(disc))/(2*a)).toFixed(2)}i` : `${x1Val.toFixed(4)}, \\, ${x2Val.toFixed(4)}`}`;

    return {
      disc,
      discType: disc > 0 ? "Two Distinct Real Roots" : disc === 0 ? "One Repeated Real Root" : "Two Complex Conjugate Roots",
      h,
      k,
      vertexFormStr,
      yIntercept,
      focusY,
      directrixY,
      isMin: a > 0,
      x1Val,
      x2Val,
      x1Complex,
      x2Complex,
      isComplex,
      rootsSummary,
      stepsFormula,
      stepsSquare,
      stepsFactor,
      latex,
      error: null
    };
  }, [a, b, c]);

  // Card 1 Save Handler
  const handleSaveQuadratic = () => {
    if (calculation.error) return;

    const inputsStr = `a: ${aStr}, b: ${bStr}, c: ${cStr}`;
    const opStr = `Quadratic Equation (${aStr}x² ${parseFloat(bStr) >= 0 ? "+ " + bStr : "- " + Math.abs(parseFloat(bStr))}x ${parseFloat(cStr) >= 0 ? "+ " + cStr : "- " + Math.abs(parseFloat(cStr))} = 0)`;

    const resList = [
      `Roots = ${calculation.isComplex ? calculation.rootsSummary : `x₁ = ${calculation.x1Val?.toFixed(4)}, x₂ = ${calculation.x2Val?.toFixed(4)}`}`,
      `Discriminant (Δ) = ${calculation.disc} (${calculation.discType})`,
      `Vertex = (${calculation.h?.toFixed(2)}, ${calculation.k?.toFixed(2)})`,
      `Axis of Symmetry = x = ${calculation.h?.toFixed(2)}`,
      `Vertex Form = ${calculation.vertexFormStr}`
    ];

    const newItem: SavedQuadraticItem = {
      id: Date.now().toString(),
      title: "Quadratic Formula Solution",
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${aStr}x² + ${bStr}x + ${cStr} = 0`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedQuadraticItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedQuadraticItems(updated);
    try {
      localStorage.setItem("saved_quadratic_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedQuadratic(true);
    setTimeout(() => setJustSavedQuadratic(false), 2000);
  };

  // Card 2 Save Handler
  const handleSaveVertex = () => {
    if (calculation.error) return;

    const inputsStr = `a: ${aStr}, b: ${bStr}, c: ${cStr}`;
    const opStr = `Vertex & Parabola Geometry Analytics`;

    const resList = [
      `Vertex (h, k) = (${calculation.h?.toFixed(4)}, ${calculation.k?.toFixed(4)})`,
      `Parabola Orientation = ${calculation.isMin ? "Opens Upwards (Global Min)" : "Opens Downwards (Global Max)"}`,
      `Axis of Symmetry = x = ${calculation.h?.toFixed(4)}`,
      `Focus Point = (${calculation.h?.toFixed(4)}, ${calculation.focusY?.toFixed(4)})`,
      `Directrix Line = y = ${calculation.directrixY?.toFixed(4)}`,
      `Y-Intercept = (0, ${calculation.yIntercept})`
    ];

    const newItem: SavedQuadraticItem = {
      id: Date.now().toString(),
      title: "Vertex & Parabola Analytics",
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: calculation.vertexFormStr,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedVertexItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedVertexItems(updated);
    try {
      localStorage.setItem("saved_quadratic_vertex", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedVertex(true);
    setTimeout(() => setJustSavedVertex(false), 2000);
  };

  // SVG Parabola Chart Generator
  const svgChart = useMemo(() => {
    if (calculation.error || calculation.isLinear) return null;

    const width = 450;
    const height = 240;
    const padding = 40;

    const h = calculation.h ?? 0;
    const k = calculation.k ?? 0;
    const x1 = calculation.x1Val ?? 0;
    const x2 = calculation.x2Val ?? 0;

    let minX = Math.min(h - 4, x1 - 2, x2 - 2);
    let maxX = Math.max(h + 4, x1 + 2, x2 + 2);
    if (minX === maxX) { minX = -5; maxX = 5; }

    const spanX = maxX - minX;

    const yAtMinX = a * minX * minX + b * minX + c;
    const yAtMaxX = a * maxX * maxX + b * maxX + c;
    let minY = Math.min(k, yAtMinX, yAtMaxX, 0);
    let maxY = Math.max(k, yAtMinX, yAtMaxX, 0);

    if (minY === maxY) { minY = -5; maxY = 5; }
    const spanY = (maxY - minY) * 1.2 || 10;
    const centerY = (maxY + minY) / 2;
    minY = centerY - spanY / 2;
    maxY = centerY + spanY / 2;

    const toSvgX = (valX: number) => parseFloat((padding + ((valX - minX) / spanX) * (width - padding * 2)).toFixed(2));
    const toSvgY = (valY: number) => parseFloat((padding + ((maxY - valY) / (maxY - minY)) * (height - padding * 2)).toFixed(2));

    const points: [number, number][] = [];
    for (let i = 0; i <= 60; i++) {
      const xVal = minX + (i / 60) * spanX;
      const yVal = a * xVal * xVal + b * xVal + c;
      points.push([toSvgX(xVal), toSvgY(yVal)]);
    }

    const pathD = points.reduce((acc, curr, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${curr[0].toFixed(2)} ${curr[1].toFixed(2)}`, "");

    const zeroX = toSvgX(0);
    const zeroY = toSvgY(0);
    const axisSymX = toSvgX(h);
    const vertexSvg = [toSvgX(h), toSvgY(k)];
    const yIntSvg = [toSvgX(0), toSvgY(c)];

    return (
      <svg suppressHydrationWarning viewBox={`0 0 ${width} ${height}`} className="w-full h-auto text-xs font-sans tabular-nums">
        <line suppressHydrationWarning x1={padding} y1={zeroY} x2={width - padding} y2={zeroY} stroke="currentColor" strokeOpacity={0.25} strokeWidth={1.5} />
        <line suppressHydrationWarning x1={zeroX} y1={padding} x2={zeroX} y2={height - padding} stroke="currentColor" strokeOpacity={0.25} strokeWidth={1.5} />

        <line suppressHydrationWarning x1={axisSymX} y1={padding} x2={axisSymX} y2={height - padding} stroke="#3b82f6" strokeDasharray="4 4" strokeWidth={1.5} />

        <path suppressHydrationWarning d={pathD} fill="none" stroke="#2563eb" strokeWidth={2.5} className="dark:stroke-blue-400" />

        <circle cx={vertexSvg[0]} cy={vertexSvg[1]} r={5} fill="#ef4444" />
        <text x={vertexSvg[0] + 7} y={vertexSvg[1] - 7} className="fill-red-600 dark:fill-red-400 font-extrabold text-[10px]">
          Vertex ({h.toFixed(2)}, {k.toFixed(2)})
        </text>

        {!calculation.isComplex && (
          <>
            <circle cx={toSvgX(x1)} cy={zeroY} r={4} fill="#10b981" />
            <circle cx={toSvgX(x2)} cy={zeroY} r={4} fill="#10b981" />
          </>
        )}

        <circle cx={yIntSvg[0]} cy={yIntSvg[1]} r={4} fill="#8b5cf6" />
      </svg>
    );
  }, [a, b, c, calculation]);

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
      {/* CARD 1: QUADRATIC FORMULA & EQUATION SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Quadratic Formula &amp; Equation Solver (ax² + bx + c = 0)</span>
          <button
            type="button"
            onClick={handleSaveQuadratic}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedQuadratic ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: FORM COEFFICIENT INPUTS */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Standard Form: ax² + bx + c = 0
                </h2>

                {/* VISUAL EQUATION PREVIEW */}
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Dynamic Quadratic Expression
                  </span>
                  <div className="font-sans tabular-nums font-extrabold text-xl text-blue-600 dark:text-blue-400">
                    {aStr || "a"}x² {parseFloat(bStr) >= 0 ? "+ " + (bStr || "b") : "- " + Math.abs(parseFloat(bStr) || 0)}x {parseFloat(cStr) >= 0 ? "+ " + (cStr || "c") : "- " + Math.abs(parseFloat(cStr) || 0)} = 0
                  </div>
                </div>

                {/* COEFFICIENT A */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Quadratic Coefficient (a)
                  </label>
                  <input
                    type="text"
                    value={aStr}
                    onChange={(e) => setAStr(e.target.value)}
                    placeholder="e.g. 1, -2, 1/2"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* COEFFICIENT B */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Linear Coefficient (b)
                  </label>
                  <input
                    type="text"
                    value={bStr}
                    onChange={(e) => setBStr(e.target.value)}
                    placeholder="e.g. -5, 4"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* COEFFICIENT C */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Constant Term (c)
                  </label>
                  <input
                    type="text"
                    value={cStr}
                    onChange={(e) => setCStr(e.target.value)}
                    placeholder="e.g. 6, -10"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT & PARABOLA GRAPH */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
                {/* HERO RESULT DISPLAY */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Evaluated Roots &amp; Analytics
                    </span>
                    <button
                      type="button"
                      onClick={() => calculation.latex && handleCopyText(calculation.latex)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
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
                      <div className="text-2xl sm:text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
                        {calculation.isComplex ? (
                          <div>
                            x = {calculation.x1Complex}
                          </div>
                        ) : (
                          <div>
                            x₁ = {calculation.x1Val?.toFixed(4)}, &nbsp; x₂ = {calculation.x2Val?.toFixed(4)}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs font-bold pt-1">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50">
                          Discriminant Δ = {calculation.disc} ({calculation.discType})
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          Vertex: ({calculation.h?.toFixed(2)}, {calculation.k?.toFixed(2)}) [{calculation.isMin ? "Global Min" : "Global Max"}]
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold">
                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">Axis of Symmetry</span>
                          <span className="font-sans tabular-nums">x = {calculation.h?.toFixed(2)}</span>
                        </div>

                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">Y-Intercept</span>
                          <span className="font-sans tabular-nums">(0, {calculation.yIntercept})</span>
                        </div>

                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl col-span-2 sm:col-span-1">
                          <span className="text-[10px] text-slate-400 block uppercase">Vertex Form</span>
                          <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{calculation.vertexFormStr}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* INTERACTIVE 2D PARABOLA GRAPH */}
                {svgChart && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> Interactive 2D Parabola Coordinate Plot
                    </span>
                    {svgChart}
                  </div>
                )}

                {/* TABBED METHOD SOLVER & STEP BREAKDOWN */}
                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" /> Multi-Method Algebraic Solution
                    </span>

                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                      <button
                        onClick={() => setActiveMethod("formula")}
                        className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                          activeMethod === "formula" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        Quadratic Formula
                      </button>
                      <button
                        onClick={() => setActiveMethod("square")}
                        className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                          activeMethod === "square" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        Completing Square
                      </button>
                      <button
                        onClick={() => setActiveMethod("factoring")}
                        className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                          activeMethod === "factoring" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        Factoring
                      </button>
                    </div>
                  </div>

                  {!calculation.error && (
                    <div className="space-y-2 text-xs font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                      {activeMethod === "formula" && calculation.stepsFormula && calculation.stepsFormula.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                          <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">{idx + 1}.</span>
                          <span className="font-sans tabular-nums">{step}</span>
                        </div>
                      ))}

                      {activeMethod === "square" && calculation.stepsSquare && calculation.stepsSquare.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                          <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">{idx + 1}.</span>
                          <span className="font-sans tabular-nums">{step}</span>
                        </div>
                      ))}

                      {activeMethod === "factoring" && calculation.stepsFactor && calculation.stepsFactor.map((step, idx) => (
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

          {/* EMBEDDED SAVED QUADRATIC CALCULATIONS INSIDE CARD 1 */}
          {savedQuadraticItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Quadratic Calculations ({savedQuadraticItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedQuadraticItems([]);
                    try { localStorage.removeItem("saved_quadratic_calculations"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedQuadraticItems.map((item) => {
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
                            const updated = savedQuadraticItems.filter(i => i.id !== item.id);
                            setSavedQuadraticItems(updated);
                            try { localStorage.setItem("saved_quadratic_calculations", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Equation: </span>
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
      {/* CARD 2: QUADRATIC VERTEX & PARABOLA GEOMETRY ANALYZER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Quadratic Vertex &amp; Parabola Geometry Analyzer</span>
          <button
            type="button"
            onClick={handleSaveVertex}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedVertex ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Parabola Inputs
              </h2>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Quadratic Coefficient (a)
                </label>
                <input
                  type="text"
                  value={aStr}
                  onChange={(e) => setAStr(e.target.value)}
                  placeholder="e.g. 1"
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Linear Coefficient (b)
                </label>
                <input
                  type="text"
                  value={bStr}
                  onChange={(e) => setBStr(e.target.value)}
                  placeholder="e.g. -5"
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Constant Term (c)
                </label>
                <input
                  type="text"
                  value={cStr}
                  onChange={(e) => setCStr(e.target.value)}
                  placeholder="e.g. 6"
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: LIVE VERTEX ANALYTICS & GEOMETRY MATRIX */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Vertex Point (h, k)
                  </span>
                  {calculation.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {calculation.error}
                    </div>
                  ) : (
                    <div className="text-2xl sm:text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                      ({calculation.h?.toFixed(4)}, {calculation.k?.toFixed(4)})
                    </div>
                  )}
                </div>

                {!calculation.error && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold">
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Parabola Orientation</span>
                      <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{calculation.isMin ? "Opens Upwards (Min)" : "Opens Downwards (Max)"}</span>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Axis of Symmetry</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">x = {calculation.h?.toFixed(4)}</span>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Focus Coordinate</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">({calculation.h?.toFixed(2)}, {calculation.focusY?.toFixed(2)})</span>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Directrix Line</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">y = {calculation.directrixY?.toFixed(4)}</span>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 col-span-2">
                      <span className="text-[10px] text-slate-400 block uppercase">Converted Vertex Form Equation</span>
                      <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{calculation.vertexFormStr}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED VERTEX ANALYTICS INSIDE CARD 2 */}
          {savedVertexItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Vertex Analytics ({savedVertexItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedVertexItems([]);
                    try { localStorage.removeItem("saved_quadratic_vertex"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedVertexItems.map((item) => {
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
                            const updated = savedVertexItems.filter(i => i.id !== item.id);
                            setSavedVertexItems(updated);
                            try { localStorage.setItem("saved_quadratic_vertex", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Equation: </span>
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

export default QuadraticCalculator;
