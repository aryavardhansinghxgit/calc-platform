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
  Download,
  Search,
  Flame
} from "lucide-react";
import {
  GOOGOLOGY_PRESETS,
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
  permutationsBigInt,
  combinationsBigInt,
  millerRabinTest,
  analyzeDigits,
  formatScientificApprox
} from "@/app/calculators/big-number-calculator/big-number-logic";

export type BigNumberTab = "arithmetic" | "modpow" | "combinatorics" | "googology" | "inspector";

export function BigNumberCalculator() {
  const [inputX, setInputX] = useState<string>("1000000000000000000000000000000"); // 10^30
  const [inputY, setInputY] = useState<string>("98765432109876543210987654321");
  const [inputMod, setInputMod] = useState<string>("1000000007");

  const [nFact, setNFact] = useState<number>(100);
  const [rComb, setRComb] = useState<number>(10);

  const [activeTab, setActiveTab] = useState<BigNumberTab>("arithmetic");
  const [arithOp, setArithOp] = useState<"add" | "sub" | "mult" | "div" | "mod" | "gcd" | "lcm">("mult");

  // Feedback states
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Main Calculation Execution
  const { exactResult, resultError, divisionRemainder } = useMemo(() => {
    try {
      if (activeTab === "arithmetic") {
        if (arithOp === "add") return { exactResult: addBigInt(inputX, inputY) };
        if (arithOp === "sub") return { exactResult: subtractBigInt(inputX, inputY) };
        if (arithOp === "mult") return { exactResult: multiplyBigInt(inputX, inputY) };
        if (arithOp === "div") {
          const div = divideBigInt(inputX, inputY);
          return { exactResult: div.quotient, divisionRemainder: div.remainder };
        }
        if (arithOp === "mod") return { exactResult: modBigInt(inputX, inputY) };
        if (arithOp === "gcd") return { exactResult: gcdBigInt(inputX, inputY) };
        if (arithOp === "lcm") return { exactResult: lcmBigInt(inputX, inputY) };
      }

      if (activeTab === "modpow") {
        return { exactResult: modPowBigInt(inputX, inputY, inputMod) };
      }

      if (activeTab === "combinatorics") {
        return { exactResult: factorialBigInt(nFact) };
      }

      return { exactResult: multiplyBigInt(inputX, inputY) };
    } catch (err: any) {
      return { resultError: err.message || "Calculation Error" };
    }
  }, [activeTab, arithOp, inputX, inputY, inputMod, nFact]);

  const activeResultStr = exactResult || "0";
  const analytics = useMemo(() => analyzeDigits(activeResultStr), [activeResultStr]);
  const sciApprox = useMemo(() => formatScientificApprox(activeResultStr), [activeResultStr]);
  const trailingZeros = useMemo(() => {
    if (activeTab === "combinatorics") return factorialTrailingZeros(nFact);
    return 0;
  }, [activeTab, nFact]);

  const isPrime = useMemo(() => {
    if (activeResultStr.length > 50) return false;
    return millerRabinTest(activeResultStr);
  }, [activeResultStr]);

  // Download Result as .txt File
  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([activeResultStr], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `big_number_result_${analytics.digitCount}_digits.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("x", inputX.substring(0, 50));
    params.set("y", inputY.substring(0, 50));
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
              <span>Input Massive Integers</span>
            </h2>
            <button
              type="button"
              onClick={() => {
                setInputX("1000000000000000000000000000000");
                setInputY("98765432109876543210987654321");
                setNFact(100);
              }}
              className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Input X Textarea */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Number X (Supports Thousands of Digits):
              </label>
              <textarea
                rows={3}
                value={inputX}
                onChange={(e) => setInputX(e.target.value)}
                placeholder="Enter integer X..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none"
              />
            </div>

            {/* Input Y Textarea */}
            {activeTab !== "combinatorics" && (
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Number Y:
                </label>
                <textarea
                  rows={2}
                  value={inputY}
                  onChange={(e) => setInputY(e.target.value)}
                  placeholder="Enter integer Y..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none"
                />
              </div>
            )}

            {/* Modulo Modulus Field */}
            {activeTab === "modpow" && (
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Modulus M (for X^Y mod M):
                </label>
                <input
                  type="text"
                  value={inputMod}
                  onChange={(e) => setInputMod(e.target.value)}
                  placeholder="e.g. 1000000007"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold outline-none"
                />
              </div>
            )}

            {/* Factorial N Input */}
            {activeTab === "combinatorics" && (
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Factorial Integer N (N!):
                </label>
                <input
                  type="number"
                  min="0"
                  max="5000"
                  value={nFact}
                  onChange={(e) => setNFact(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold outline-none"
                />
              </div>
            )}

            {/* QUICK PRESET BUTTONS */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Quick Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setInputX("1" + "0".repeat(100))}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg border bg-white dark:bg-slate-800 border-slate-300 hover:border-blue-500 cursor-pointer"
                >
                  Googol (10^100)
                </button>
                <button
                  type="button"
                  onClick={() => setNFact(500)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg border bg-white dark:bg-slate-800 border-slate-300 hover:border-blue-500 cursor-pointer"
                >
                  500!
                </button>
                <button
                  type="button"
                  onClick={() => setInputX("2147483647")}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg border bg-white dark:bg-slate-800 border-slate-300 hover:border-blue-500 cursor-pointer"
                >
                  Mersenne 2^31 - 1
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD: HERO RESULT DISPLAY */}
        <div className="md:col-span-6 bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-slate-50 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 border border-blue-200 dark:border-slate-700 rounded-2xl p-6 space-y-5 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-blue-200/80 dark:border-slate-800 pb-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Exact Arbitrary-Precision Output</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              {analytics.digitCount} Digits
            </span>
          </div>

          {/* MAIN HERO NUMERIC CODE BOX RESULT */}
          {resultError ? (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold">
              {resultError}
            </div>
          ) : (
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Exact Integer Value:
              </span>
              <div className="bg-white/90 dark:bg-slate-900/90 p-3 rounded-xl border border-blue-200 dark:border-slate-800 max-h-40 overflow-y-auto font-mono text-xs font-bold text-slate-900 dark:text-slate-100 break-all">
                {activeResultStr}
              </div>
              {divisionRemainder && (
                <p className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 pt-1">
                  Remainder R: {divisionRemainder}
                </p>
              )}
            </div>
          )}

          {/* METRICS & DIGIT STAT CHIPS */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-blue-200/80 dark:border-slate-800">
            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Digits</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{analytics.digitCount}</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Approx (Sci)</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 truncate">{sciApprox}</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Trailing Zeros</span>
              <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                {activeTab === "combinatorics" ? trailingZeros : "N/A"}
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleCopy(activeResultStr, setCopiedResult)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedResult ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedResult ? "Copied!" : "Copy Full"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(`${analytics.first100Digits}`, setCopiedSnippet)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedSnippet ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <BookOpen className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedSnippet ? "Copied!" : "Copy 100 Digits"}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadTxt}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-blue-600" />
              <span>Download .txt</span>
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

      {/* MULTI-TAB ARITHMETIC SUITE & DIGIT INSPECTOR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Calculation Modes & Googology Presets</span>
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
              <span>Arithmetic</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("modpow")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "modpow"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Modular Pow</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("combinatorics")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "combinatorics"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <PieChart className="h-3.5 w-3.5" />
              <span>Factorials</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("googology")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "googology"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              <span>Googology</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("inspector")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "inspector"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Search className="h-3.5 w-3.5" />
              <span>Digit Inspector</span>
            </button>
          </div>
        </div>

        {/* ARITHMETIC OP BUTTONS */}
        {activeTab === "arithmetic" && (
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
        )}

        {/* GOOGOLOGY PRESETS TAB CONTENT */}
        {activeTab === "googology" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
            {GOOGOLOGY_PRESETS.map((p) => (
              <div
                key={p.name}
                onClick={() => setInputX("1" + "0".repeat(parseInt(p.powerOf10.replace(/[^0-9]/g, "")) || 6))}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-500 cursor-pointer space-y-1 transition-all"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{p.name}</span>
                  <span className="text-[10px] font-mono text-blue-600 font-bold">{p.powerOf10}</span>
                </div>
                <p className="text-[11px] text-slate-500">{p.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* DIGIT INSPECTOR TAB CONTENT */}
        {activeTab === "inspector" && (
          <div className="space-y-4 text-xs font-sans">
            <h4 className="font-bold text-slate-700 dark:text-slate-300">
              Digit Frequency Distribution (0 through 9):
            </h4>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 font-mono">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <div key={digit} className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl border text-center space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-500 block">Digit {digit}</span>
                  <p className="font-bold text-blue-600">{analytics.frequencies[digit] || 0}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
