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
  Download,
  Search,
  Flame,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import {
  addBigInt,
  subtractBigInt,
  multiplyBigInt,
  divideBigInt,
  modBigInt,
  modPowBigInt,
  gcdBigInt,
  lcmBigInt,
  factorialBigInt,
  factorialTrailingZeros,
  analyzeDigits,
  formatScientificApprox
} from "@/app/calculators/big-number-calculator/big-number-logic";

export interface SavedBigNumberItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function BigNumberCalculator() {
  // Card 1 Inputs: BigInt Arithmetic
  const [arithX, setArithX] = useState<string>("1000000000000000000000000000000");
  const [arithY, setArithY] = useState<string>("98765432109876543210987654321");
  const [arithOp, setArithOp] = useState<"add" | "sub" | "mult" | "div" | "mod" | "gcd" | "lcm">("mult");

  // Card 2 Inputs: Modular Exponentiation
  const [modX, setModX] = useState<string>("2");
  const [modY, setModY] = useState<string>("100");
  const [inputMod, setInputMod] = useState<string>("1000000007");

  // Card 3 Inputs: Factorial N
  const [nFact, setNFact] = useState<number>(100);

  // Saved calculation states for Card 1, 2, 3
  const [savedArithItems, setSavedArithItems] = useState<SavedBigNumberItem[]>([]);
  const [justSavedArith, setJustSavedArith] = useState<boolean>(false);

  const [savedModItems, setSavedModItems] = useState<SavedBigNumberItem[]>([]);
  const [justSavedMod, setJustSavedMod] = useState<boolean>(false);

  const [savedFactItems, setSavedFactItems] = useState<SavedBigNumberItem[]>([]);
  const [justSavedFact, setJustSavedFact] = useState<boolean>(false);

  // Action feedback states
  const [copiedArith, setCopiedArith] = useState<boolean>(false);
  const [copiedMod, setCopiedMod] = useState<boolean>(false);
  const [copiedFact, setCopiedFact] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedArith = localStorage.getItem("saved_bignum_arith");
      if (storedArith) setSavedArithItems(JSON.parse(storedArith));

      const storedMod = localStorage.getItem("saved_bignum_modpow");
      if (storedMod) setSavedModItems(JSON.parse(storedMod));

      const storedFact = localStorage.getItem("saved_bignum_factorial");
      if (storedFact) setSavedFactItems(JSON.parse(storedFact));
    } catch (e) {}
  }, []);

  // Card 1 Calculations: BigInt Arithmetic
  const { arithResultStr, arithError, arithRemainder } = useMemo(() => {
    try {
      if (arithOp === "add") return { arithResultStr: addBigInt(arithX, arithY) };
      if (arithOp === "sub") return { arithResultStr: subtractBigInt(arithX, arithY) };
      if (arithOp === "mult") return { arithResultStr: multiplyBigInt(arithX, arithY) };
      if (arithOp === "div") {
        const div = divideBigInt(arithX, arithY);
        return { arithResultStr: div.quotient, arithRemainder: div.remainder };
      }
      if (arithOp === "mod") return { arithResultStr: modBigInt(arithX, arithY) };
      if (arithOp === "gcd") return { arithResultStr: gcdBigInt(arithX, arithY) };
      if (arithOp === "lcm") return { arithResultStr: lcmBigInt(arithX, arithY) };
      return { arithResultStr: multiplyBigInt(arithX, arithY) };
    } catch (err: any) {
      return { arithError: err.message || "Calculation Error" };
    }
  }, [arithX, arithY, arithOp]);

  const arithAnalytics = useMemo(() => analyzeDigits(arithResultStr || "0"), [arithResultStr]);
  const arithSciApprox = useMemo(() => formatScientificApprox(arithResultStr || "0"), [arithResultStr]);

  // Card 2 Calculations: Modular Exponentiation
  const { modResultStr, modError } = useMemo(() => {
    try {
      return { modResultStr: modPowBigInt(modX, modY, inputMod) };
    } catch (err: any) {
      return { modError: err.message || "ModPow Error" };
    }
  }, [modX, modY, inputMod]);

  const modAnalytics = useMemo(() => analyzeDigits(modResultStr || "0"), [modResultStr]);
  const modSciApprox = useMemo(() => formatScientificApprox(modResultStr || "0"), [modResultStr]);

  // Card 3 Calculations: Factorial N
  const { factResultStr, factError } = useMemo(() => {
    try {
      return { factResultStr: factorialBigInt(nFact) };
    } catch (err: any) {
      return { factError: err.message || "Factorial Error" };
    }
  }, [nFact]);

  const factAnalytics = useMemo(() => analyzeDigits(factResultStr || "0"), [factResultStr]);
  const factSciApprox = useMemo(() => formatScientificApprox(factResultStr || "0"), [factResultStr]);
  const trailingZeros = useMemo(() => factorialTrailingZeros(nFact), [nFact]);

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      navigator.clipboard.writeText(text);
      setFn(true);
      setTimeout(() => setFn(false), 2000);
    } catch (e) {}
  };

  const handleDownloadTxt = (content: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Save Card 1 Handler
  const handleSaveArith = () => {
    const inputsStr = `X (${arithX.length} digits), Y (${arithY.length} digits), Op: ${arithOp}`;
    const opStr = `BigInt Arithmetic (${arithOp})`;
    const resList = [
      `Exact Integer = ${arithResultStr ? arithResultStr.substring(0, 80) + (arithResultStr.length > 80 ? "..." : "") : "N/A"}`,
      `Total Digits = ${arithAnalytics.digitCount}`,
      `Scientific Approx = ${arithSciApprox}`,
      `Remainder (if div) = ${arithRemainder || "N/A"}`
    ];

    const newItem: SavedBigNumberItem = {
      id: Date.now().toString(),
      title: `BigInt (${arithOp})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: arithResultStr ? arithResultStr.substring(0, 40) + "..." : "0",
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedArithItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedArithItems(updated);
    try {
      localStorage.setItem("saved_bignum_arith", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedArith(true);
    setTimeout(() => setJustSavedArith(false), 2000);
  };

  // Save Card 2 Handler
  const handleSaveMod = () => {
    const inputsStr = `Base X: (${modX.substring(0, 15)}...), Exp Y: (${modY.substring(0, 15)}...), Mod M: ${inputMod}`;
    const opStr = `Modular Exponentiation (X^Y mod M)`;
    const resList = [
      `Exact Remainder = ${modResultStr || "N/A"}`,
      `Total Digits = ${modAnalytics.digitCount}`,
      `Scientific Approx = ${modSciApprox}`
    ];

    const newItem: SavedBigNumberItem = {
      id: Date.now().toString(),
      title: `ModPow (${inputMod})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: modResultStr || "0",
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedModItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedModItems(updated);
    try {
      localStorage.setItem("saved_bignum_modpow", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedMod(true);
    setTimeout(() => setJustSavedMod(false), 2000);
  };

  // Save Card 3 Handler
  const handleSaveFact = () => {
    const inputsStr = `Factorial N: ${nFact}`;
    const opStr = `Big Factorial Computation (${nFact}!)`;
    const resList = [
      `Factorial Value = ${factResultStr ? factResultStr.substring(0, 80) + (factResultStr.length > 80 ? "..." : "") : "N/A"}`,
      `Total Digits = ${factAnalytics.digitCount}`,
      `Trailing Zeros = ${trailingZeros}`,
      `Scientific Approx = ${factSciApprox}`
    ];

    const newItem: SavedBigNumberItem = {
      id: Date.now().toString(),
      title: `Factorial (${nFact}!)`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${nFact}! (${factAnalytics.digitCount} digits)`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedFactItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedFactItems(updated);
    try {
      localStorage.setItem("saved_bignum_factorial", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedFact(true);
    setTimeout(() => setJustSavedFact(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: ARBITRARY-PRECISION BIGINT ARITHMETIC ENGINE (X & Y) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Arbitrary-Precision BigInt Arithmetic Engine (X &amp; Y)</span>
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
                  <span>Input Massive Integers</span>
                </h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Number X (Supports Thousands of Digits):
                  </label>
                  <textarea
                    rows={3}
                    value={arithX}
                    onChange={(e) => setArithX(e.target.value)}
                    placeholder="Enter integer X..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none"
                  />
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Number Y:
                  </label>
                  <textarea
                    rows={2}
                    value={arithY}
                    onChange={(e) => setArithY(e.target.value)}
                    placeholder="Enter integer Y..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT DISPLAY */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Exact Arbitrary-Precision Output
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {arithAnalytics.digitCount} Digits
                  </span>
                </div>

                {arithError ? (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold">
                    {arithError}
                  </div>
                ) : (
                  <>
                    <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 max-h-36 overflow-y-auto font-mono text-xs font-bold text-slate-900 dark:text-slate-100 break-all">
                      {arithResultStr}
                    </div>
                    {arithRemainder && (
                      <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                        Remainder R: {arithRemainder}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                        <span className="text-[10px] text-slate-400 block uppercase">Total Digits</span>
                        <span className="font-mono text-slate-900 dark:text-slate-100">{arithAnalytics.digitCount}</span>
                      </div>

                      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                        <span className="text-[10px] text-slate-400 block uppercase">Approx (Sci)</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400 truncate block">{arithSciApprox}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleCopy(arithResultStr || "", setCopiedArith)}
                        className="w-1/2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {copiedArith ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
                        <span>{copiedArith ? "Copied!" : "Copy Full Result"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadTxt(arithResultStr || "", `big_int_result_${arithAnalytics.digitCount}_digits.txt`)}
                        className="w-1/2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-blue-600" />
                        <span>Download .txt</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ARITHMETIC OP BUTTONS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-xs">
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
                onClick={() => setArithOp("div")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  arithOp === "div" ? "bg-blue-600 text-white border-blue-600 shadow-xs" : "bg-slate-50 border-slate-300"
                }`}
              >
                X / Y
              </button>
              <button
                type="button"
                onClick={() => setArithOp("mod")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  arithOp === "mod" ? "bg-blue-600 text-white border-blue-600 shadow-xs" : "bg-slate-50 border-slate-300"
                }`}
              >
                X mod Y
              </button>
              <button
                type="button"
                onClick={() => setArithOp("gcd")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  arithOp === "gcd" ? "bg-blue-600 text-white border-blue-600 shadow-xs" : "bg-slate-50 border-slate-300"
                }`}
              >
                GCD(X, Y)
              </button>
              <button
                type="button"
                onClick={() => setArithOp("lcm")}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  arithOp === "lcm" ? "bg-blue-600 text-white border-blue-600 shadow-xs" : "bg-slate-50 border-slate-300"
                }`}
              >
                LCM(X, Y)
              </button>
            </div>
          </div>

          {/* EMBEDDED SAVED BIGINT ARITHMETIC INSIDE CARD 1 */}
          {savedArithItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved BigInt Calculations ({savedArithItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedArithItems([]);
                    try { localStorage.removeItem("saved_bignum_arith"); } catch(e){}
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
                            try { localStorage.setItem("saved_bignum_arith", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 2: MODULAR EXPONENTIATION SOLVER (Xʸ mod M) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Modular Exponentiation Solver (Xʸ mod M)</span>
          <button
            type="button"
            onClick={handleSaveMod}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedMod ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Modular Power Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Base X:</label>
                  <input
                    type="text"
                    value={modX}
                    onChange={(e) => setModX(e.target.value)}
                    placeholder="e.g. 2"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Exponent Y:</label>
                  <input
                    type="text"
                    value={modY}
                    onChange={(e) => setModY(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Modulus M (X^Y mod M):</label>
                  <input
                    type="text"
                    value={inputMod}
                    onChange={(e) => setInputMod(e.target.value)}
                    placeholder="e.g. 1000000007"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: MODULAR EXPONENTIATION OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Exact Remainder (X^Y mod M)
                  </span>
                  {modError ? (
                    <p className="text-xs font-bold text-rose-500">{modError}</p>
                  ) : (
                    <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                      {modResultStr}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Total Digits</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{modAnalytics.digitCount}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Approx (Sci)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400 truncate block">{modSciApprox}</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleCopy(modResultStr || "", setCopiedMod)}
                    className="bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold rounded-xl px-3 py-1.5 text-xs transition-colors flex items-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    {copiedMod ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
                    <span>{copiedMod ? "Copied!" : "Copy Mod Result"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED MODULAR EXPONENTIATION INSIDE CARD 2 */}
          {savedModItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Modular Exponentiation ({savedModItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedModItems([]);
                    try { localStorage.removeItem("saved_bignum_modpow"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedModItems.map((item) => {
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
                            const updated = savedModItems.filter(i => i.id !== item.id);
                            setSavedModItems(updated);
                            try { localStorage.setItem("saved_bignum_modpow", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 3: BIG FACTORIALS & COMBINATORICS ENGINE (N!) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Big Factorials &amp; Combinatorics Engine (N!)</span>
          <button
            type="button"
            onClick={handleSaveFact}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedFact ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Factorial Input
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Factorial Integer N (0 to 5000):</label>
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    value={nFact}
                    onChange={(e) => setNFact(parseInt(e.target.value, 10) || 0)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: FACTORIAL OUTPUT & DIGIT STATS */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Factorial Output ({nFact}!)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {factAnalytics.digitCount} Digits
                    </span>
                  </div>

                  {factError ? (
                    <p className="text-xs font-bold text-rose-500">{factError}</p>
                  ) : (
                    <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 max-h-32 overflow-y-auto font-mono text-xs font-bold text-slate-900 dark:text-slate-100 break-all">
                      {factResultStr}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Total Digits</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{factAnalytics.digitCount}</span>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Trailing Zeros</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{trailingZeros}</span>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Approx (Sci)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100 truncate block">{factSciApprox}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(factResultStr || "", setCopiedFact)}
                    className="w-1/2 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    {copiedFact ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
                    <span>{copiedFact ? "Copied!" : "Copy Factorial"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadTxt(factResultStr || "", `factorial_${nFact}_result_${factAnalytics.digitCount}_digits.txt`)}
                    className="w-1/2 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>Download .txt</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DIGIT FREQUENCY DISTRIBUTION GRID FOR FACTORIAL */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2 shadow-xs">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Digit Frequency Distribution for {nFact}! (0 through 9):
            </h4>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 font-mono text-xs">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <div key={digit} className="bg-slate-50 dark:bg-slate-800/80 p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 block">Digit {digit}</span>
                  <p className="font-bold text-blue-600">{factAnalytics.frequencies[digit] || 0}</p>
                </div>
              ))}
            </div>
          </div>

          {/* EMBEDDED SAVED FACTORIAL SOLVES INSIDE CARD 3 */}
          {savedFactItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Factorial Calculations ({savedFactItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedFactItems([]);
                    try { localStorage.removeItem("saved_bignum_factorial"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedFactItems.map((item) => {
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
                            const updated = savedFactItems.filter(i => i.id !== item.id);
                            setSavedFactItems(updated);
                            try { localStorage.setItem("saved_bignum_factorial", JSON.stringify(updated)); } catch(e){}
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

export default BigNumberCalculator;
