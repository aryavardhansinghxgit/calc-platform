"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Calculator,
  Copy,
  Check,
  Share2,
  Sparkles,
  Sliders,
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
  Binary,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp
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

export interface SavedScientificItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function ScientificNotationCalculator() {
  // Card 1 Inputs: Arithmetic Solver
  const [manX, setManX] = useState<string>("1.23");
  const [expX, setExpX] = useState<string>("7");
  const [manY, setManY] = useState<string>("3.45");
  const [expY, setExpY] = useState<string>("2");
  const [precision, setPrecision] = useState<number>(4);
  const [arithOp, setArithOp] = useState<"add" | "sub" | "mult" | "div" | "pow" | "sqrt" | "sq">("mult");

  // Card 2 Inputs: Single Converter
  const [singleInput, setSingleInput] = useState<string>("1568938");
  const [convPrecision, setConvPrecision] = useState<number>(4);

  // Card 3 Inputs: Physical Constants
  const [selectedConstantName, setSelectedConstantName] = useState<string>("Speed of Light in Vacuum");

  // Action feedback states
  const [copiedSci, setCopiedSci] = useState<boolean>(false);
  const [copiedDec, setCopiedDec] = useState<boolean>(false);

  // Saved calculation states for Card 1, 2, 3
  const [savedArithItems, setSavedArithItems] = useState<SavedScientificItem[]>([]);
  const [justSavedArith, setJustSavedArith] = useState<boolean>(false);

  const [savedConvItems, setSavedConvItems] = useState<SavedScientificItem[]>([]);
  const [justSavedConv, setJustSavedConv] = useState<boolean>(false);

  const [savedConstItems, setSavedConstItems] = useState<SavedScientificItem[]>([]);
  const [justSavedConst, setJustSavedConst] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedArith = localStorage.getItem("saved_sci_arith");
      if (storedArith) setSavedArithItems(JSON.parse(storedArith));

      const storedConv = localStorage.getItem("saved_sci_converter");
      if (storedConv) setSavedConvItems(JSON.parse(storedConv));

      const storedConst = localStorage.getItem("saved_sci_constants");
      if (storedConst) setSavedConstItems(JSON.parse(storedConst));
    } catch (e) {}
  }, []);

  // Card 1 Numbers & Calculation
  const numX: ScientificNumber = useMemo(() => parseToScientific(`${manX}e${expX}`), [manX, expX]);
  const numY: ScientificNumber = useMemo(() => parseToScientific(`${manY}e${expY}`), [manY, expY]);

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

  const arithNormString = useMemo(() => formatNormalizedScientific(arithResult || numX, precision), [arithResult, numX, precision]);
  const arithEngDetails = useMemo(() => formatEngineeringNotation(arithResult || numX, precision), [arithResult, numX, precision]);
  const arithEText = useMemo(() => formatENotation(arithResult || numX, precision), [arithResult, numX, precision]);
  const arithDecString = useMemo(() => formatStandardDecimal(arithResult || numX, precision), [arithResult, numX, precision]);
  const arithWordString = useMemo(() => formatWordRepresentation(arithResult || numX), [arithResult, numX]);
  const stepExplanation = useMemo(() => {
    if (arithOp !== "pow") {
      return explainArithmeticStepByStep(numX, numY, arithOp);
    }
    return `Exponentiation (${manX} × 10^${expX})^(${manY} × 10^${expY}) evaluated to normalized scientific form.`;
  }, [numX, numY, arithOp, manX, expX, manY, expY]);

  // Card 2 Calculation: Single Converter
  const numSingle: ScientificNumber = useMemo(() => parseToScientific(singleInput), [singleInput]);
  const convNormString = useMemo(() => formatNormalizedScientific(numSingle, convPrecision), [numSingle, convPrecision]);
  const convEngDetails = useMemo(() => formatEngineeringNotation(numSingle, convPrecision), [numSingle, convPrecision]);
  const convEText = useMemo(() => formatENotation(numSingle, convPrecision), [numSingle, convPrecision]);
  const convDecString = useMemo(() => formatStandardDecimal(numSingle, convPrecision), [numSingle, convPrecision]);
  const convWordString = useMemo(() => formatWordRepresentation(numSingle), [numSingle]);

  // Card 3 Calculation: Selected Constant
  const selectedConstObj = useMemo(() => {
    return PHYSICAL_CONSTANTS.find(c => c.name === selectedConstantName) || PHYSICAL_CONSTANTS[0];
  }, [selectedConstantName]);

  const constSciNum: ScientificNumber = useMemo(() => {
    return parseToScientific(`${selectedConstObj.mantissa}e${selectedConstObj.exponent}`);
  }, [selectedConstObj]);

  const constNormString = useMemo(() => formatNormalizedScientific(constSciNum, 6), [constSciNum]);
  const constDecString = useMemo(() => formatStandardDecimal(constSciNum, 8), [constSciNum]);
  const constWordString = useMemo(() => formatWordRepresentation(constSciNum), [constSciNum]);

  // Save Card 1 Handler
  const handleSaveArith = () => {
    const inputsStr = `X: (${manX} × 10^${expX}), Y: (${manY} × 10^${expY}), Op: ${arithOp}`;
    const opStr = `Scientific Notation Arithmetic (${arithOp})`;
    const resList = [
      `Normalized Scientific = ${arithNormString}`,
      `Decimal Form = ${arithDecString}`,
      `Engineering Form = ${arithEngDetails.engineeringString} ${arithEngDetails.prefixSymbol ? `(${arithEngDetails.prefixSymbol})` : ""}`,
      `E-Notation = ${arithEText}`,
      `Word Representation = ${arithWordString}`
    ];

    const newItem: SavedScientificItem = {
      id: Date.now().toString(),
      title: `Scientific Arithmetic (${arithOp})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: arithNormString,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedArithItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedArithItems(updated);
    try {
      localStorage.setItem("saved_sci_arith", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedArith(true);
    setTimeout(() => setJustSavedArith(false), 2000);
  };

  // Save Card 2 Handler
  const handleSaveConv = () => {
    const inputsStr = `Raw Input: ${singleInput}, Precision: ${convPrecision} Places`;
    const opStr = `Scientific & Engineering Conversion`;
    const resList = [
      `Normalized Scientific = ${convNormString}`,
      `Engineering Form = ${convEngDetails.engineeringString} ${convEngDetails.prefixSymbol ? `(${convEngDetails.prefixSymbol})` : ""}`,
      `E-Notation = ${convEText}`,
      `Decimal Expansion = ${convDecString}`,
      `Word Representation = ${convWordString}`
    ];

    const newItem: SavedScientificItem = {
      id: Date.now().toString(),
      title: `Converted (${singleInput})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: convNormString,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedConvItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedConvItems(updated);
    try {
      localStorage.setItem("saved_sci_converter", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedConv(true);
    setTimeout(() => setJustSavedConv(false), 2000);
  };

  // Save Card 3 Handler
  const handleSaveConst = () => {
    const inputsStr = `Constant: ${selectedConstObj.name} (${selectedConstObj.symbol})`;
    const opStr = `Physical Constant Lookup`;
    const resList = [
      `Scientific Form = ${selectedConstObj.mantissa} × 10^${selectedConstObj.exponent} ${selectedConstObj.unit}`,
      `Standard Decimal = ${constDecString}`,
      `Description = ${selectedConstObj.description}`
    ];

    const newItem: SavedScientificItem = {
      id: Date.now().toString(),
      title: `Constant (${selectedConstObj.symbol})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: constNormString,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedConstItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedConstItems(updated);
    try {
      localStorage.setItem("saved_sci_constants", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedConst(true);
    setTimeout(() => setJustSavedConst(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: SCIENTIFIC NOTATION ARITHMETIC SOLVER (X × 10ᵃ & Y × 10ᵇ) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Scientific Notation Arithmetic Solver (X &times; 10ᵃ &amp; Y &times; 10ᵇ)</span>
          <button
            type="button"
            onClick={handleSaveArith}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedArith ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT FORM */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  <span>Input Number X &amp; Y Parameters</span>
                </h2>
              </div>

              <div className="space-y-4">
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
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT DISPLAY */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Normalized Scientific Result
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    Evaluated
                  </span>
                </div>

                {arithError ? (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold">
                    {arithError}
                  </div>
                ) : (
                  <>
                    <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight break-all">
                      {arithNormString}
                    </div>
                    <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      Word Representation: {arithWordString}
                    </p>

                    <div className="grid grid-cols-3 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                        <span className="text-[10px] text-slate-400 block uppercase">Decimal Form</span>
                        <span className="font-mono text-slate-900 dark:text-slate-100 truncate block">{arithDecString}</span>
                      </div>

                      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                        <span className="text-[10px] text-slate-400 block uppercase">Engineering</span>
                        <span className="font-mono text-slate-900 dark:text-slate-100 truncate block">
                          {arithEngDetails.engineeringString} {arithEngDetails.prefixSymbol && `(${arithEngDetails.prefixSymbol})`}
                        </span>
                      </div>

                      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                        <span className="text-[10px] text-slate-400 block uppercase">E-Notation</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400 truncate block">{arithEText}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ARITHMETIC OP SELECTOR BUTTONS & STEP DERIVATION */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Select Arithmetic Operation
            </h3>
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

            {stepExplanation && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
                <span className="text-blue-600 font-bold block">Step-by-Step Mathematical Derivation:</span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{stepExplanation}</p>
              </div>
            )}
          </div>

          {/* EMBEDDED SAVED ARITHMETIC SOLVES INSIDE CARD 1 */}
          {savedArithItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Scientific Arithmetic ({savedArithItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedArithItems([]);
                    try { localStorage.removeItem("saved_sci_arith"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedArithItems.map((item) => {
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
                            const updated = savedArithItems.filter(i => i.id !== item.id);
                            setSavedArithItems(updated);
                            try { localStorage.setItem("saved_sci_arith", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
      {/* CARD 2: SINGLE NUMBER TO SCIENTIFIC & ENGINEERING CONVERTER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Single Number to Scientific &amp; Engineering Converter</span>
          <button
            type="button"
            onClick={handleSaveConv}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedConv ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Converter Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Raw Input (Decimal, E-notation e.g. 1.5e8)
                  </label>
                  <input
                    type="text"
                    value={singleInput}
                    onChange={(e) => setSingleInput(e.target.value)}
                    placeholder="e.g. 1568938 or 2.3e-12"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Converter Precision:</span>
                    <span className="font-mono text-blue-600">{convPrecision} Places</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="16"
                    value={convPrecision}
                    onChange={(e) => setConvPrecision(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CONVERTER OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Normalized Scientific Form
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {convNormString}
                  </div>
                  <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    Word Representation: {convWordString}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Engineering</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100 truncate block">
                      {convEngDetails.engineeringString} {convEngDetails.prefixSymbol && `(${convEngDetails.prefixSymbol})`}
                    </span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">E-Notation</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400 truncate block">{convEText}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Decimal Form</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100 truncate block">{convDecString}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED SCIENTIFIC CONVERSIONS INSIDE CARD 2 */}
          {savedConvItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Scientific Conversions ({savedConvItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedConvItems([]);
                    try { localStorage.removeItem("saved_sci_converter"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedConvItems.map((item) => {
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
                            const updated = savedConvItems.filter(i => i.id !== item.id);
                            setSavedConvItems(updated);
                            try { localStorage.setItem("saved_sci_converter", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
      {/* CARD 3: PHYSICAL CONSTANTS SCIENTIFIC LIBRARY */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Physical Constants Scientific Library</span>
          <button
            type="button"
            onClick={handleSaveConst}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedConst ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Select Fundamental Constant
              </h2>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {PHYSICAL_CONSTANTS.map((c) => (
                  <div
                    key={c.name}
                    onClick={() => setSelectedConstantName(c.name)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedConstantName === c.name
                        ? "bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-900 dark:text-blue-100 font-bold"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold">{c.name} ({c.symbol})</span>
                      <span className="text-[10px] font-mono text-blue-600 font-bold">{c.unit}</span>
                    </div>
                    <p className="font-mono text-xs font-bold text-blue-600 pt-0.5">{c.mantissa} &times; 10^{c.exponent}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: CONSTANT DETAILS OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {selectedConstObj.name} ({selectedConstObj.symbol})
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{selectedConstObj.unit}</span>
                  </div>

                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {constNormString} {selectedConstObj.unit}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                    {selectedConstObj.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Standard Decimal</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100 truncate block">{constDecString}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Word Representation</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400 truncate block">{constWordString}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED CONSTANT SOLVES INSIDE CARD 3 */}
          {savedConstItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Physical Constants ({savedConstItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedConstItems([]);
                    try { localStorage.removeItem("saved_sci_constants"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedConstItems.map((item) => {
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
                            const updated = savedConstItems.filter(i => i.id !== item.id);
                            setSavedConstItems(updated);
                            try { localStorage.setItem("saved_sci_constants", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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

export default ScientificNotationCalculator;
