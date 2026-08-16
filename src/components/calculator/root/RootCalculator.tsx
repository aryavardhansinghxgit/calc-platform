"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Calculator,
  Copy,
  Check,
  Share2,
  Sparkles,
  Sliders,
  ChevronDown,
  ChevronUp,
  Info,
  RotateCcw,
  BookOpen,
  Zap,
  Split,
  Binary,
  Bookmark,
  Trash2
} from "lucide-react";
import {
  simplifyRadical,
  evaluateFractionalExponent,
  rationalizeDenominator,
  calculateNewtonRaphson,
  calculateLongDivisionSquareRoot,
  calculateComplexRoots,
  calculateBounds
} from "@/app/calculators/root-calculator/root-logic";

export interface SavedRootItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function RootCalculator() {
  // Card 1 Inputs: N-th Root Solver
  const [rootType, setRootType] = useState<"general" | "square" | "cube">("general");
  const [radicand, setRadicand] = useState<string>("72");
  const [degree, setDegree] = useState<string>("2");
  const [precision, setPrecision] = useState<number>(6);

  // Card 2 Inputs: Radical Simplifier
  const [simpRadicand, setSimpRadicand] = useState<string>("72");
  const [simpDegree, setSimpDegree] = useState<string>("2");

  // Card 3 Inputs: Fractional Exponents
  const [fracBase, setFracBase] = useState<string>("8");
  const [fractionNum, setFractionNum] = useState<string>("2");
  const [fractionDen, setFractionDen] = useState<string>("3");

  // Controls & Derivation
  const [activeDerivationTab, setActiveDerivationTab] = useState<"factors" | "newton" | "longDivision">("factors");
  const [showDerivation, setShowDerivation] = useState<boolean>(true);

  // Action Feedback
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);
  const [copiedExplanation, setCopiedExplanation] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Saved calculation states for Card 1, 2, 3
  const [savedRootItems, setSavedRootItems] = useState<SavedRootItem[]>([]);
  const [justSavedRoot, setJustSavedRoot] = useState<boolean>(false);

  const [savedSimpItems, setSavedSimpItems] = useState<SavedRootItem[]>([]);
  const [justSavedSimp, setJustSavedSimp] = useState<boolean>(false);

  const [savedFracItems, setSavedFracItems] = useState<SavedRootItem[]>([]);
  const [justSavedFrac, setJustSavedFrac] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedRoot = localStorage.getItem("saved_root_calculations");
      if (storedRoot) setSavedRootItems(JSON.parse(storedRoot));

      const storedSimp = localStorage.getItem("saved_root_simplifier");
      if (storedSimp) setSavedSimpItems(JSON.parse(storedSimp));

      const storedFrac = localStorage.getItem("saved_root_fractional");
      if (storedFrac) setSavedFracItems(JSON.parse(storedFrac));
    } catch (e) {}
  }, []);

  // Sync Root Type to degree
  useEffect(() => {
    if (rootType === "square") setDegree("2");
    else if (rootType === "cube") setDegree("3");
  }, [rootType]);

  const numRadicand = parseFloat(radicand) || 0;
  const numDegree = rootType === "square" ? 2 : rootType === "cube" ? 3 : parseFloat(degree) || 2;

  const numSimpRadicand = parseFloat(simpRadicand) || 0;
  const numSimpDegree = parseFloat(simpDegree) || 2;

  const numFracBase = parseFloat(fracBase) || 0;
  const numFracNum = parseFloat(fractionNum) || 1;
  const numFracDen = parseFloat(fractionDen) || 1;

  // Validation
  const degreeError = numDegree === 0 ? "Degree/Index (n) cannot be 0" : null;

  // Card 1 Calculation
  const calculated = useMemo(() => {
    const isNegativeRadicand = numRadicand < 0;
    const isEvenDegree = numDegree % 2 === 0;

    let decimalVal = 0;
    let isComplex = false;
    let complexRootsList = calculateComplexRoots(numRadicand, numDegree);

    if (isNegativeRadicand && isEvenDegree) {
      isComplex = true;
      decimalVal = NaN;
    } else if (isNegativeRadicand) {
      decimalVal = -Math.pow(Math.abs(numRadicand), 1 / numDegree);
    } else {
      decimalVal = Math.pow(numRadicand, 1 / numDegree);
    }

    const simplified = simplifyRadical(numRadicand, numDegree);
    const bounds = calculateBounds(numRadicand, numDegree);
    const newtonSteps = calculateNewtonRaphson(numRadicand, numDegree, 8);
    const longDivisionSteps = numDegree === 2 && numRadicand > 0 ? calculateLongDivisionSquareRoot(Math.round(numRadicand)) : [];

    return {
      decimalVal,
      isComplex,
      complexRootsList,
      simplified,
      bounds,
      newtonSteps,
      longDivisionSteps
    };
  }, [numRadicand, numDegree]);

  // Card 2 Calculation: Simplifier
  const simpResult = useMemo(() => {
    return simplifyRadical(numSimpRadicand, numSimpDegree);
  }, [numSimpRadicand, numSimpDegree]);

  // Card 3 Calculation: Fractional Exponents
  const fracResult = useMemo(() => {
    return evaluateFractionalExponent(numFracBase, numFracNum, numFracDen);
  }, [numFracBase, numFracNum, numFracDen]);

  // Presets
  const presets = [2, 3, 5, 8, 16, 27, 32, 64, 100, 125, 256, 1000];

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      navigator.clipboard.writeText(text);
      setFn(true);
      setTimeout(() => setFn(false), 2000);
    } catch (e) {}
  };

  const formattedDecimal = Number.isNaN(calculated.decimalVal)
    ? "Complex Number (i)"
    : calculated.decimalVal.toFixed(precision);

  // Save Card 1 Handler
  const handleSaveRoot = () => {
    const inputsStr = `Radicand (x): ${radicand}, Degree (n): ${numDegree}`;
    const opStr = `N-th Root Calculation (${numDegree}√${radicand})`;
    const resList = [
      `Principal Root Value = ${formattedDecimal}`,
      `Exact Radical Form = ${calculated.simplified.formattedText}`,
      `Fractional Exponent = ${radicand}^(1/${numDegree})`,
      `Power Bounds = ${calculated.bounds ? calculated.bounds.expression : "N/A"}`
    ];

    const newItem: SavedRootItem = {
      id: Date.now().toString(),
      title: `Root (${numDegree}√${radicand})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${numDegree}√${radicand} = ${formattedDecimal}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedRootItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedRootItems(updated);
    try {
      localStorage.setItem("saved_root_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedRoot(true);
    setTimeout(() => setJustSavedRoot(false), 2000);
  };

  // Save Card 2 Handler
  const handleSaveSimp = () => {
    const inputsStr = `Radicand (x): ${simpRadicand}, Degree (n): ${simpDegree}`;
    const opStr = `Radical Simplification (${simpDegree}√${simpRadicand})`;
    const resList = [
      `Simplified Radical = ${simpResult.formattedText}`,
      `Integer Coefficient (k) = ${simpResult.coefficient}`,
      `Reduced Radicand (m) = ${simpResult.radicand}`
    ];

    const newItem: SavedRootItem = {
      id: Date.now().toString(),
      title: `Radical Simplifier (${simpDegree}√${simpRadicand})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${simpDegree}√${simpRadicand} = ${simpResult.formattedText}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedSimpItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedSimpItems(updated);
    try {
      localStorage.setItem("saved_root_simplifier", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedSimp(true);
    setTimeout(() => setJustSavedSimp(false), 2000);
  };

  // Save Card 3 Handler
  const handleSaveFrac = () => {
    const inputsStr = `Base (x): ${fracBase}, Numerator (m): ${fractionNum}, Denominator (n): ${fractionDen}`;
    const opStr = `Fractional Exponent (${fracBase}^(${fractionNum}/${fractionDen}))`;
    const resList = [
      `Evaluated Decimal Result = ${fracResult.decimalValue.toFixed(precision)}`,
      `Radical Form = ${fracResult.exactForm}`
    ];

    const newItem: SavedRootItem = {
      id: Date.now().toString(),
      title: `Fractional Power (${fracBase}^${fractionNum}/${fractionDen})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${fracBase}^(${fractionNum}/${fractionDen}) = ${fracResult.decimalValue.toFixed(precision)}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedFracItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedFracItems(updated);
    try {
      localStorage.setItem("saved_root_fractional", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedFrac(true);
    setTimeout(() => setJustSavedFrac(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: N-TH ROOT & SQUARE/CUBE ROOT SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>N-th Root &amp; Square/Cube Root Solver (ⁿ√x)</span>
          <button
            type="button"
            onClick={handleSaveRoot}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedRoot ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT CONTROLS */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  <span>Inputs &amp; Radical Parameters</span>
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setRadicand("72");
                    setDegree("2");
                    setRootType("general");
                  }}
                  className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* ROOT TYPE SELECTOR */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Root Type Presets
                </label>
                <div className="grid grid-cols-3 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans tabular-nums">
                  <button
                    type="button"
                    onClick={() => setRootType("square")}
                    className={`py-1.5 rounded-lg cursor-pointer ${rootType === "square" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    Square Root (√x)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRootType("cube")}
                    className={`py-1.5 rounded-lg cursor-pointer ${rootType === "cube" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    Cube Root (∛x)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRootType("general")}
                    className={`py-1.5 rounded-lg cursor-pointer ${rootType === "general" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    General N-th Root
                  </button>
                </div>
              </div>

              {/* VISUAL RADICAL NOTATION PREVIEW */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-center min-h-[70px] shadow-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1 font-mono">
                  <sup className="text-sm sm:text-base text-blue-600 dark:text-blue-400">
                    {rootType === "square" ? "" : numDegree || "n"}
                  </sup>
                  <span className="text-3xl sm:text-4xl text-blue-600 dark:text-blue-400 font-serif">√</span>
                  <span className="border-t-2 border-slate-900 dark:border-slate-100 pt-0.5 px-1">
                    {radicand || "x"}
                  </span>
                </div>
              </div>

              {/* DYNAMIC FORM INPUTS */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Radicand (x):
                  </label>
                  <input
                    type="number"
                    value={radicand}
                    onChange={(e) => setRadicand(e.target.value)}
                    placeholder="Enter radicand (e.g. 72)"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>

                {rootType === "general" && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Root Index / Degree (n):
                    </label>
                    <input
                      type="number"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="Enter index n (e.g. 2, 3, 4)"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                    {degreeError && (
                      <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                        <Info className="h-3.5 w-3.5" />
                        <span>{degreeError}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* PRECISION SLIDER */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Decimal Precision:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono">{precision} places</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="16"
                    value={precision}
                    onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT CARD */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Principal Root Value
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    Evaluated
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight break-all">
                  {formattedDecimal}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-slate-500">Exact Radical Form:</span>
                  <span className="font-extrabold text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg font-mono">
                    {calculated.simplified.formattedText}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-400 block uppercase">Fractional Exponent</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{radicand}<sup>1/{numDegree}</sup></span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-400 block uppercase">Power Bounds</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{calculated.bounds ? calculated.bounds.expression : "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* COMPLEX NUMBERS BADGE IF APPLICABLE */}
              {calculated.isComplex && calculated.complexRootsList.length > 0 && (
                <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-3.5 space-y-2">
                  <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-amber-600" />
                    <span>Complex Roots (Even root of negative number):</span>
                  </h4>
                  <ul className="space-y-1 text-xs font-mono text-amber-900 dark:text-amber-200">
                    {calculated.complexRootsList.map((rootItem, idx) => (
                      <li key={idx} className="flex justify-between border-b border-amber-200/50 pb-1">
                        <span>Root {idx + 1}: {rootItem.formatted}</span>
                        <span className="text-[11px] text-amber-700 dark:text-amber-400">{rootItem.polarFormatted}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* DYNAMIC DERIVATION ENGINE & STEP-BY-STEP BREAKDOWN */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <button
                type="button"
                onClick={() => setShowDerivation(!showDerivation)}
                className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>Step-by-Step Derivation &amp; Algorithm Demonstration</span>
                {showDerivation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveDerivationTab("factors")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeDerivationTab === "factors" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Prime Factorization
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDerivationTab("newton")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeDerivationTab === "newton" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Newton-Raphson
                </button>
                {numDegree === 2 && numRadicand > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveDerivationTab("longDivision")}
                    className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                      activeDerivationTab === "longDivision" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    Long Division
                  </button>
                )}
              </div>
            </div>

            {showDerivation && (
              <div className="pt-2 space-y-4">
                {activeDerivationTab === "factors" && (
                  <div className="space-y-2 text-xs">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300">
                      Prime Factor Breakdown for Radicand {numRadicand}:
                    </h4>
                    {calculated.simplified.factorization.length > 0 ? (
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                        <p className="font-mono text-slate-900 dark:text-slate-100">
                          Prime product: {numRadicand} ={" "}
                          {calculated.simplified.factorization
                            .map((f) => `${f.factor}${f.count > 1 ? `^${f.count}` : ""}`)
                            .join(" × ")}
                        </p>
                        <p className="font-mono text-blue-600 dark:text-blue-400">
                          Simplified radical: {calculated.simplified.coefficient > 1 ? `${calculated.simplified.coefficient}` : ""}{numDegree === 2 ? "√" : `${numDegree}√`}{calculated.simplified.radicand}
                        </p>
                      </div>
                    ) : (
                      <p className="text-slate-500 italic">Prime factorization applies to integer radicands.</p>
                    )}
                  </div>
                )}

                {activeDerivationTab === "newton" && (
                  <div className="space-y-2 overflow-x-auto text-xs font-mono">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 font-sans">
                      Newton-Raphson Numerical Approximation (n={numDegree}, S={numRadicand}):
                    </h4>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                          <th className="p-2">Iteration (k)</th>
                          <th className="p-2">Current Guess (xₖ)</th>
                          <th className="p-2">Next Approximation (xₖ₊₁)</th>
                          <th className="p-2">Error Margin</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {calculated.newtonSteps.map((step) => (
                          <tr key={step.iteration} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="p-2 font-bold text-blue-600">{step.iteration}</td>
                            <td className="p-2">{step.guess.toFixed(8)}</td>
                            <td className="p-2 font-bold">{step.nextGuess.toFixed(8)}</td>
                            <td className="p-2 text-slate-500">{step.error.toExponential(4)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeDerivationTab === "longDivision" && numDegree === 2 && (
                  <div className="space-y-2 overflow-x-auto text-xs font-mono">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 font-sans">
                      Digit-by-Digit Manual Square Root Division for {Math.round(numRadicand)}:
                    </h4>
                    {calculated.longDivisionSteps.length > 0 ? (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                            <th className="p-2">Step</th>
                            <th className="p-2">Pair</th>
                            <th className="p-2">Dividend</th>
                            <th className="p-2">Divisor Base</th>
                            <th className="p-2">Trial Digit</th>
                            <th className="p-2">Product</th>
                            <th className="p-2">Remainder</th>
                            <th className="p-2">Root Accumulated</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                          {calculated.longDivisionSteps.map((step) => (
                            <tr key={step.stepIndex} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-2 font-bold text-blue-600">{step.stepIndex}</td>
                              <td className="p-2">{step.currentDigitPair}</td>
                              <td className="p-2">{step.currentDividend}</td>
                              <td className="p-2">{step.divisorBase}</td>
                              <td className="p-2 font-bold text-emerald-600">{step.trialDigit}</td>
                              <td className="p-2">{step.product}</td>
                              <td className="p-2 text-rose-500">{step.remainder}</td>
                              <td className="p-2 font-bold text-blue-700 dark:text-blue-300">{step.currentRoot}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-slate-500 italic font-sans">Long division applies to positive integer square roots.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* EMBEDDED SAVED ROOT CALCULATIONS INSIDE CARD 1 */}
          {savedRootItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Root Calculations ({savedRootItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedRootItems([]);
                    try { localStorage.removeItem("saved_root_calculations"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedRootItems.map((item) => {
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
                            const updated = savedRootItems.filter(i => i.id !== item.id);
                            setSavedRootItems(updated);
                            try { localStorage.setItem("saved_root_calculations", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 2: RADICAL SIMPLIFIER (ⁿ√x ➔ k ⁿ√m) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Radical Simplifier (ⁿ√x ➔ k ⁿ√m)</span>
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
                Simplifier Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Radicand (x)</label>
                  <input
                    type="number"
                    value={simpRadicand}
                    onChange={(e) => setSimpRadicand(e.target.value)}
                    placeholder="e.g. 72"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Root Degree (n)</label>
                  <input
                    type="number"
                    value={simpDegree}
                    onChange={(e) => setSimpDegree(e.target.value)}
                    placeholder="e.g. 2"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SIMPLIFIED OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Simplified Radical Form
                  </span>
                  <div className="text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {simpResult.formattedText}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Integer Coefficient (k)</span>
                    <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{simpResult.coefficient}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Reduced Radicand (m)</span>
                    <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{simpResult.radicand}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED RADICAL SIMPLIFICATIONS INSIDE CARD 2 */}
          {savedSimpItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Radical Simplifications ({savedSimpItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSimpItems([]);
                    try { localStorage.removeItem("saved_root_simplifier"); } catch(e){}
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
                            try { localStorage.setItem("saved_root_simplifier", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Radical: </span>
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
      {/* CARD 3: FRACTIONAL EXPONENT SOLVER (xᵐ/ⁿ) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Fractional Exponent Solver (xᵐ/ⁿ)</span>
          <button
            type="button"
            onClick={handleSaveFrac}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedFrac ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Fractional Power Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Base (x)</label>
                  <input
                    type="number"
                    value={fracBase}
                    onChange={(e) => setFracBase(e.target.value)}
                    placeholder="e.g. 8"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Numerator Power (m)</label>
                    <input
                      type="number"
                      value={fractionNum}
                      onChange={(e) => setFractionNum(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Denominator Root (n)</label>
                    <input
                      type="number"
                      value={fractionDen}
                      onChange={(e) => setFractionDen(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: FRACTIONAL EXPONENT OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Evaluated Power Result
                  </span>
                  <div className="text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {fracResult.decimalValue.toFixed(precision)}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Radical Form Representation</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{fracResult.exactForm}</span>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED FRACTIONAL EXPONENTS INSIDE CARD 3 */}
          {savedFracItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Fractional Exponents ({savedFracItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedFracItems([]);
                    try { localStorage.removeItem("saved_root_fractional"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedFracItems.map((item) => {
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
                            const updated = savedFracItems.filter(i => i.id !== item.id);
                            setSavedFracItems(updated);
                            try { localStorage.setItem("saved_root_fractional", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Power: </span>
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

export default RootCalculator;
