"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  Copy,
  Check,
  Share2,
  Sparkles,
  Sliders,
  RotateCcw,
  BookOpen,
  Zap,
  Grid,
  ListOrdered,
  Layers,
  PieChart,
  CheckCircle2,
  Info,
  ShieldCheck,
  Split,
  Atom,
  Binary
} from "lucide-react";
import {
  ScientificNumber,
  PHYSICAL_CONSTANTS,
  parseToScientific,
  normalizeScientific,
  formatNormalizedScientific,
  formatEngineeringNotation,
  formatENotation,
  formatStandardDecimal,
  formatWordRepresentation,
  addScientific,
  subtractScientific,
  multiplyScientific,
  divideScientific,
  powerScientific,
  squareRootScientific,
  squareScientific,
  explainArithmeticStepByStep
} from "@/app/calculators/scientific-notation-calculator/scientific-notation-logic";

export type ScientificTab = "arithmetic" | "converter" | "sigfigs" | "constants";

export function ScientificNotationCalculator() {
  // Input Number X (Mantissa & Exponent)
  const [manX, setManX] = useState<string>("1.23");
  const [expX, setExpX] = useState<string>("7");

  // Input Number Y (Mantissa & Exponent)
  const [manY, setManY] = useState<string>("3.45");
  const [expY, setExpY] = useState<string>("2");

  // Single converter raw text input
  const [singleInput, setSingleInput] = useState<string>("1568938");

  // Precision Slider (1 to 16 decimal places)
  const [precision, setPrecision] = useState<number>(4);

  // Active Tab & Operation
  const [activeTab, setActiveTab] = useState<ScientificTab>("arithmetic");
  const [arithOp, setArithOp] = useState<"add" | "sub" | "mult" | "div" | "pow" | "sqrt" | "sq">("mult");

  // Selected Physical Constant
  const [selectedConstant, setSelectedConstant] = useState<string>("");

  // Feedback states
  const [copiedSci, setCopiedSci] = useState<boolean>(false);
  const [copiedDec, setCopiedDec] = useState<boolean>(false);
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Convert inputs to ScientificNumber objects
  const numX: ScientificNumber = useMemo(() => {
    return parseToScientific(`${manX}e${expX}`);
  }, [manX, expX]);

  const numY: ScientificNumber = useMemo(() => {
    return parseToScientific(`${manY}e${expY}`);
  }, [manY, expY]);

  const numSingle: ScientificNumber = useMemo(() => {
    return parseToScientific(singleInput);
  }, [singleInput]);

  // Main Arithmetic Result
  const { arithResult, arithError } = useMemo(() => {
    try {
      if (arithOp === "add") return { arithResult: addScientific(numX, numY) };
      if (arithOp === "sub") return { arithResult: subtractScientific(numX, numY) };
      if (arithOp === "mult") return { arithResult: multiplyScientific(numX, numY) };
      if (arithOp === "div") return { arithResult: divideScientific(numX, numY) };
      if (arithOp === "pow") return { arithResult: powerScientific(numX, numY.mantissa * Math.pow(10, numY.exponent)) };
      if (arithOp === "sqrt") return { arithResult: squareRootScientific(numX) };
      if (arithOp === "sq") return { arithResult: squareScientific(numX) };
      return { arithResult: multiplyScientific(numX, numY) };
    } catch (err: any) {
      return { arithError: err.message || "Invalid Scientific Operation" };
    }
  }, [numX, numY, arithOp]);

  // Target Result Object based on active tab
  const activeResultNum: ScientificNumber = useMemo(() => {
    if (activeTab === "converter") return numSingle;
    return arithResult || { mantissa: 0, exponent: 0 };
  }, [activeTab, numSingle, arithResult]);

  // Output Representations
  const normString = useMemo(() => formatNormalizedScientific(activeResultNum, precision), [activeResultNum, precision]);
  const engDetails = useMemo(() => formatEngineeringNotation(activeResultNum, precision), [activeResultNum, precision]);
  const eText = useMemo(() => formatENotation(activeResultNum, precision), [activeResultNum, precision]);
  const decString = useMemo(() => formatStandardDecimal(activeResultNum, precision), [activeResultNum, precision]);
  const wordString = useMemo(() => formatWordRepresentation(activeResultNum), [activeResultNum]);

  const stepExplanation = useMemo(() => {
    if (activeTab === "arithmetic" && (arithOp === "add" || arithOp === "mult" || arithOp === "div" || arithOp === "sqrt")) {
      return explainArithmeticStepByStep(numX, numY, arithOp);
    }
    return "";
  }, [activeTab, numX, numY, arithOp]);

  // Load Constant Handler
  const handleSelectConstant = (name: string) => {
    setSelectedConstant(name);
    const found = PHYSICAL_CONSTANTS.find((c) => c.name === name);
    if (found) {
      setManX(found.mantissa.toString());
      setExpX(found.exponent.toString());
    }
  };

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("mx", manX);
    params.set("ex", expX);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    handleCopy(shareableUrl, setCopiedUrl);
  };

  return (
    <div className="space-y-6">
      {/* INPUT & HERO RESULT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* LEFT CARD: INPUT FORM */}
        <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-600" />
              <span>Input Scientific Notation (X and Y)</span>
            </h2>
            <button
              type="button"
              onClick={() => {
                setManX("1.23");
                setExpX("7");
                setManY("3.45");
                setExpY("2");
                setPrecision(4);
              }}
              className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Input Number X */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Number X (Mantissa &times; 10^Exponent):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="any"
                  value={manX}
                  onChange={(e) => setManX(e.target.value)}
                  placeholder="1.23"
                  className="w-1/2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-slate-900 dark:text-slate-100 outline-none"
                />
                <span className="text-xs font-bold text-slate-500">&times; 10^</span>
                <input
                  type="number"
                  step="1"
                  value={expX}
                  onChange={(e) => setExpX(e.target.value)}
                  placeholder="7"
                  className="w-1/3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-slate-900 dark:text-slate-100 outline-none"
                />
              </div>
            </div>

            {/* Input Number Y (Arithmetic Mode) */}
            {activeTab === "arithmetic" && (
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Number Y (Mantissa &times; 10^Exponent):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="any"
                    value={manY}
                    onChange={(e) => setManY(e.target.value)}
                    placeholder="3.45"
                    className="w-1/2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-slate-900 dark:text-slate-100 outline-none"
                  />
                  <span className="text-xs font-bold text-slate-500">&times; 10^</span>
                  <input
                    type="number"
                    step="1"
                    value={expY}
                    onChange={(e) => setExpY(e.target.value)}
                    placeholder="2"
                    className="w-1/3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-slate-900 dark:text-slate-100 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Single Converter Raw Text Input */}
            {activeTab === "converter" && (
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Single Converter Raw Input (Decimal, E-notation e.g. 1.5e8):
                </label>
                <input
                  type="text"
                  value={singleInput}
                  onChange={(e) => setSingleInput(e.target.value)}
                  placeholder="e.g. 1568938 or 2.3e-12"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 dark:text-slate-100 outline-none"
                />
              </div>
            )}

            {/* Precision Slider */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Decimal Precision:</span>
                <span className="font-mono text-blue-600">{precision} Places</span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                value={precision}
                onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Physical Constants Dropdown Preset */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Load Physical Constant Preset:
              </label>
              <select
                value={selectedConstant}
                onChange={(e) => handleSelectConstant(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-slate-100 outline-none cursor-pointer"
              >
                <option value="">Select Fundamental Constant...</option>
                {PHYSICAL_CONSTANTS.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.symbol} = {c.mantissa} &times; 10^{c.exponent} {c.unit})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT CARD: HERO RESULT DISPLAY */}
        <div className="md:col-span-6 bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-slate-50 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 border border-blue-200 dark:border-slate-700 rounded-2xl p-6 space-y-5 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-blue-200/80 dark:border-slate-800 pb-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Scientific Result Dashboard</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              Normalized
            </span>
          </div>

          {/* MAIN HERO NUMERIC RESULT */}
          {arithError ? (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold">
              {arithError}
            </div>
          ) : (
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Normalized Scientific Notation:
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight break-all">
                {normString}
              </div>
              <p className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 pt-1">
                Word Representation: {wordString}
              </p>
            </div>
          )}

          {/* MULTI-FORMAT REPRESENTATIONS GRID */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-blue-200/80 dark:border-slate-800">
            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Decimal Form</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 truncate">{decString}</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Engineering</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 truncate">
                {engDetails.engineeringString} {engDetails.prefixSymbol && `(${engDetails.prefixSymbol})`}
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">E-Notation</span>
              <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 truncate">{eText}</p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleCopy(normString, setCopiedSci)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedSci ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedSci ? "Copied!" : "Copy Scientific"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(decString, setCopiedDec)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedDec ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <BookOpen className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedDec ? "Copied!" : "Copy Decimal"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(`${activeResultNum.mantissa} \\times 10^{${activeResultNum.exponent}}`, setCopiedLatex)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedLatex ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedLatex ? "Copied!" : "Copy LaTeX"}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl px-2 py-2 text-xs shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copiedUrl ? "Link Copied!" : "Share URL"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* MULTI-TAB ARITHMETIC SUITE & STEP BREAKDOWN */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Arithmetic Operations & Multi-Format Converter</span>
          </h3>

          {/* TAB BUTTONS */}
          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab("arithmetic")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "arithmetic"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Arithmetic Solver</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("converter")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "converter"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Binary className="h-3.5 w-3.5" />
              <span>Single Converter</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("constants")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "constants"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Atom className="h-3.5 w-3.5" />
              <span>Constants Library</span>
            </button>
          </div>
        </div>

        {/* ARITHMETIC OP SELECTOR BUTTONS */}
        {activeTab === "arithmetic" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              <button
                type="button"
                onClick={() => setArithOp("mult")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  arithOp === "mult" ? "bg-blue-600 text-white border-blue-600 shadow-xs" : "bg-slate-50 border-slate-300"
                }`}
              >
                X &times; Y
              </button>

              <button
                type="button"
                onClick={() => setArithOp("div")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  arithOp === "div" ? "bg-blue-600 text-white border-blue-600 shadow-xs" : "bg-slate-50 border-slate-300"
                }`}
              >
                X / Y
              </button>

              <button
                type="button"
                onClick={() => setArithOp("add")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  arithOp === "add" ? "bg-blue-600 text-white border-blue-600 shadow-xs" : "bg-slate-50 border-slate-300"
                }`}
              >
                X + Y
              </button>

              <button
                type="button"
                onClick={() => setArithOp("sub")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  arithOp === "sub" ? "bg-blue-600 text-white border-blue-600 shadow-xs" : "bg-slate-50 border-slate-300"
                }`}
              >
                X - Y
              </button>

              <button
                type="button"
                onClick={() => setArithOp("pow")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  arithOp === "pow" ? "bg-blue-600 text-white border-blue-600 shadow-xs" : "bg-slate-50 border-slate-300"
                }`}
              >
                X^Y
              </button>

              <button
                type="button"
                onClick={() => setArithOp("sqrt")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  arithOp === "sqrt" ? "bg-blue-600 text-white border-blue-600 shadow-xs" : "bg-slate-50 border-slate-300"
                }`}
              >
                &radic;X
              </button>

              <button
                type="button"
                onClick={() => setArithOp("sq")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  arithOp === "sq" ? "bg-blue-600 text-white border-blue-600 shadow-xs" : "bg-slate-50 border-slate-300"
                }`}
              >
                X&sup2;
              </button>
            </div>

            {/* STEP-BY-STEP EXPLANATION BOX */}
            {stepExplanation && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
                <span className="text-blue-600 font-bold">Step-by-Step Mathematical Derivation:</span>
                <p className="text-slate-800 dark:text-slate-200 pt-1 leading-relaxed">{stepExplanation}</p>
              </div>
            )}
          </div>
        )}

        {/* CONSTANTS LIBRARY TAB CONTENT */}
        {activeTab === "constants" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
            {PHYSICAL_CONSTANTS.map((c) => (
              <div
                key={c.name}
                onClick={() => handleSelectConstant(c.name)}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-500 cursor-pointer space-y-1 transition-all"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{c.name} ({c.symbol})</span>
                  <span className="text-[10px] font-mono text-blue-600 font-bold">{c.unit}</span>
                </div>
                <p className="font-mono text-xs font-extrabold text-blue-600">{c.mantissa} &times; 10^{c.exponent}</p>
                <p className="text-[11px] text-slate-500">{c.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
