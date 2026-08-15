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
  Binary
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

export type ModeType = "general" | "square" | "cube" | "simplifier" | "fractional";

export function RootCalculator() {
  const [mode, setMode] = useState<ModeType>("general");
  
  // Inputs
  const [radicand, setRadicand] = useState<string>("72");
  const [degree, setDegree] = useState<string>("2");
  const [fractionNum, setFractionNum] = useState<string>("2");
  const [fractionDen, setFractionDen] = useState<string>("3");
  const [denomRadicand, setDenomRadicand] = useState<string>("5");
  
  // Controls
  const [precision, setPrecision] = useState<number>(6);
  const [activeDerivationTab, setActiveDerivationTab] = useState<"factors" | "newton" | "longDivision">("factors");
  const [showDerivation, setShowDerivation] = useState<boolean>(true);
  
  // Action Feedback
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);
  const [copiedExplanation, setCopiedExplanation] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Sync mode changes to defaults
  useEffect(() => {
    if (mode === "square") {
      setDegree("2");
    } else if (mode === "cube") {
      setDegree("3");
    }
  }, [mode]);

  const numRadicand = parseFloat(radicand) || 0;
  const numDegree = parseFloat(degree) || 2;
  const numFracNum = parseFloat(fractionNum) || 1;
  const numFracDen = parseFloat(fractionDen) || 1;
  const numDenomRadicand = parseFloat(denomRadicand) || 1;

  // Validation
  const degreeError = numDegree === 0 ? "Degree/Index (n) cannot be 0" : null;

  // Perform Calculations
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
    const fractionalExp = evaluateFractionalExponent(numRadicand, numFracNum, numFracDen);
    const rationalized = rationalizeDenominator(numRadicand, numDenomRadicand, numDegree);
    const bounds = calculateBounds(numRadicand, numDegree);
    const newtonSteps = calculateNewtonRaphson(numRadicand, numDegree, 8);
    const longDivisionSteps = numDegree === 2 && numRadicand > 0 ? calculateLongDivisionSquareRoot(Math.round(numRadicand)) : [];

    return {
      decimalVal,
      isComplex,
      complexRootsList,
      simplified,
      fractionalExp,
      rationalized,
      bounds,
      newtonSteps,
      longDivisionSteps
    };
  }, [numRadicand, numDegree, numFracNum, numFracDen, numDenomRadicand]);

  // Presets
  const presets = [2, 3, 5, 8, 16, 27, 32, 64, 100, 125, 256, 1000];

  // Helper copy function
  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  // Construct sharing state URL
  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("x", radicand);
    params.set("n", degree);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    handleCopy(shareableUrl, setCopiedUrl);
  };

  const formattedDecimal = Number.isNaN(calculated.decimalVal)
    ? "Complex Number (i)"
    : calculated.decimalVal.toFixed(precision);

  return (
    <div className="space-y-6">
      {/* MODE SWITCHER TABS */}
      <div className="bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => setMode("general")}
          className={`flex-1 min-w-[120px] px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            mode === "general"
              ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <Zap className="h-3.5 w-3.5" />
          <span>General N-th Root</span>
        </button>

        <button
          type="button"
          onClick={() => setMode("square")}
          className={`flex-1 min-w-[100px] px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            mode === "square"
              ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <span>Square Root (√x)</span>
        </button>

        <button
          type="button"
          onClick={() => setMode("cube")}
          className={`flex-1 min-w-[100px] px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            mode === "cube"
              ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <span>Cube Root (∛x)</span>
        </button>

        <button
          type="button"
          onClick={() => setMode("simplifier")}
          className={`flex-1 min-w-[120px] px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            mode === "simplifier"
              ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <Split className="h-3.5 w-3.5" />
          <span>Radical Simplifier</span>
        </button>

        <button
          type="button"
          onClick={() => setMode("fractional")}
          className={`flex-1 min-w-[130px] px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            mode === "fractional"
              ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <Binary className="h-3.5 w-3.5" />
          <span>Fractional Power (xᵐ/ⁿ)</span>
        </button>
      </div>

      {/* INPUT & HERO RESULT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* LEFT CARD: INPUT FORM */}
        <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-600" />
              <span>Inputs & Radical Parameters</span>
            </h2>
            <button
              type="button"
              onClick={() => {
                setRadicand("72");
                setDegree("2");
                setFractionNum("2");
                setFractionDen("3");
              }}
              className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* VISUAL RADICAL NOTATION PREVIEW */}
          <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-center min-h-[80px] shadow-inner">
            {mode === "fractional" ? (
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1 font-mono">
                <span>({radicand || "x"})</span>
                <sup className="text-sm sm:text-base text-blue-600 dark:text-blue-400">
                  {fractionNum}/{fractionDen}
                </sup>
              </div>
            ) : (
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1 font-mono">
                <sup className="text-sm sm:text-base text-blue-600 dark:text-blue-400">
                  {mode === "square" ? "" : degree || "n"}
                </sup>
                <span className="text-3xl sm:text-4xl text-blue-600 dark:text-blue-400 font-serif">√</span>
                <span className="border-t-2 border-slate-900 dark:border-slate-100 pt-0.5 px-1">
                  {radicand || "x"}
                </span>
              </div>
            )}
          </div>

          {/* DYNAMIC FORM INPUTS */}
          <div className="space-y-4">
            {/* Radicand Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Radicand (x):
              </label>
              <input
                type="number"
                value={radicand}
                onChange={(e) => setRadicand(e.target.value)}
                placeholder="Enter radicand (e.g. 72)"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
              />
            </div>

            {/* Degree/Index Input (if not square or cube mode) */}
            {mode !== "square" && mode !== "cube" && mode !== "fractional" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Root Index / Degree (n):
                </label>
                <input
                  type="number"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="Enter index n (e.g. 2, 3, 4)"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                />
                {degreeError && (
                  <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                    <Info className="h-3.5 w-3.5" />
                    <span>{degreeError}</span>
                  </p>
                )}
              </div>
            )}

            {/* Fractional Exponent Inputs */}
            {mode === "fractional" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Numerator Exponent (m):
                  </label>
                  <input
                    type="number"
                    value={fractionNum}
                    onChange={(e) => setFractionNum(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Denominator Root (n):
                  </label>
                  <input
                    type="number"
                    value={fractionDen}
                    onChange={(e) => setFractionDen(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  />
                </div>
              </div>
            )}

            {/* QUICK PRESET CHIPS */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Quick Radicand Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRadicand(val.toString())}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      radicand === val.toString()
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* PRECISION SLIDER */}
            <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
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

        {/* RIGHT CARD: HERO RESULT DISPLAY */}
        <div className="md:col-span-6 bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-slate-50 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 border border-blue-200 dark:border-slate-700 rounded-2xl p-6 space-y-6 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-blue-200/80 dark:border-slate-800 pb-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Calculation Results</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              Instant
            </span>
          </div>

          {/* MAIN HERO NUMERIC RESULT */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Principal Root Value:
            </span>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight break-all">
              {formattedDecimal}
            </div>

            {/* EXACT SIMPLIFIED RADICAL FORM */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                Exact Radical Form:
              </span>
              <span className="text-base font-extrabold text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-800 px-3 py-1 rounded-xl border border-blue-200 dark:border-slate-700 shadow-xs font-mono">
                {calculated.simplified.formattedText}
              </span>
            </div>
          </div>

          {/* METRIC DETAILS GRID */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-blue-200/80 dark:border-slate-800">
            <div className="bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-blue-100 dark:border-slate-700 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Fractional Exponent</span>
              <p className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 truncate">
                {radicand}
                <sup className="text-[10px] text-blue-600">1/{degree}</sup>
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-blue-100 dark:border-slate-700 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Power Bounds</span>
              <p className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 truncate">
                {calculated.bounds ? calculated.bounds.expression : "N/A"}
              </p>
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

          {/* ACTION BUTTONS: COPY & SHARE */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleCopy(formattedDecimal, setCopiedResult)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2.5 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedResult ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedResult ? "Copied!" : "Copy Result"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(calculated.simplified.latex, setCopiedLatex)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2.5 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedLatex ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <BookOpen className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedLatex ? "Copied!" : "Copy LaTeX"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(`√[${degree}](${radicand}) = ${formattedDecimal} = ${calculated.simplified.formattedText}`, setCopiedExplanation)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2.5 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedExplanation ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedExplanation ? "Copied!" : "Copy Steps"}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl px-2.5 py-2 text-xs shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copiedUrl ? "Link Copied!" : "Share URL"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* DYNAMIC DERIVATION ENGINE & STEP-BY-STEP BREAKDOWN */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setShowDerivation(!showDerivation)}
            className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 cursor-pointer"
          >
            <BookOpen className="h-4 w-4" />
            <span>Step-by-Step Derivation & Algorithm Demonstration</span>
            {showDerivation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveDerivationTab("factors")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeDerivationTab === "factors"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Prime Factorization
            </button>
            <button
              type="button"
              onClick={() => setActiveDerivationTab("newton")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeDerivationTab === "newton"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Newton-Raphson
            </button>
            {numDegree === 2 && numRadicand > 0 && (
              <button
                type="button"
                onClick={() => setActiveDerivationTab("longDivision")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeDerivationTab === "longDivision"
                    ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Long Division
              </button>
            )}
          </div>
        </div>

        {showDerivation && (
          <div className="pt-2 space-y-4">
            {/* DERIVATION TAB 1: PRIME FACTORIZATION TREE */}
            {activeDerivationTab === "factors" && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Prime Factor Breakdown for Radicand {numRadicand}:
                </h4>
                {calculated.simplified.factorization.length > 0 ? (
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-mono">
                      Prime product: {numRadicand} ={" "}
                      {calculated.simplified.factorization
                        .map((f) => `${f.factor}${f.count > 1 ? `^${f.count}` : ""}`)
                        .join(" × ")}
                    </p>
                    <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <p>• Grouping into power-of-{numDegree} factors:</p>
                      <p className="font-mono bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                        {nRadicalRepresentation(calculated.simplified.coefficient, calculated.simplified.radicand, numDegree)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Prime factorization applies to integer radicands. (Current radicand: {numRadicand})
                  </p>
                )}
              </div>
            )}

            {/* DERIVATION TAB 2: NEWTON-RAPHSON ITERATION TABLE */}
            {activeDerivationTab === "newton" && (
              <div className="space-y-3 overflow-x-auto">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Newton-Raphson Numerical Approximation (n={numDegree}, S={numRadicand}):
                </h4>
                <table className="w-full text-left text-xs border-collapse font-mono">
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

            {/* DERIVATION TAB 3: LONG DIVISION METHOD (SQUARE ROOTS) */}
            {activeDerivationTab === "longDivision" && numDegree === 2 && (
              <div className="space-y-3 overflow-x-auto">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Digit-by-Digit Manual Square Root Division for {Math.round(numRadicand)}:
                </h4>
                {calculated.longDivisionSteps.length > 0 ? (
                  <table className="w-full text-left text-xs border-collapse font-mono">
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
                  <p className="text-xs text-slate-500 italic">
                    Long division applies to positive integer square roots up to 99,999,999.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function nRadicalRepresentation(coeff: number, rad: number, n: number): string {
  if (rad === 1) return `Result: ${coeff}`;
  const symbol = n === 2 ? "√" : n === 3 ? "∛" : n === 4 ? "∜" : `${n}√`;
  if (coeff === 1) return `Simplified radical: ${symbol}${rad}`;
  return `Simplified radical: ${coeff} × ${symbol}${rad} = ${coeff}${symbol}${rad}`;
}
