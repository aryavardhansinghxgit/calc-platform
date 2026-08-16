"use client";

import React, { useState, useEffect } from "react";

export interface SavedRandomItem {
  id: string;
  title: string;
  expression: string;
  result: string;
  timestamp: string;
}

// Random Generator Engine with Large Integer and 999-Digit Precision Support
function generateRandomBasic(minStr: string, maxStr: string): string {
  try {
    const minBig = BigInt(minStr.trim() || "1");
    const maxBig = BigInt(maxStr.trim() || "100");

    if (minBig > maxBig) {
      return "Error: Lower limit must be less than or equal to upper limit.";
    }

    const range = maxBig - minBig + 1n;
    if (range <= 0n) return "1";

    // For standard bounds
    if (range <= BigInt(Number.MAX_SAFE_INTEGER)) {
      const minNum = Number(minBig);
      const maxNum = Number(maxBig);
      const rand = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      return rand.toString();
    }

    // For large BigInt bounds
    const rangeStr = range.toString();
    const numDigits = rangeStr.length;
    let randStr = "";
    for (let i = 0; i < numDigits; i++) {
      randStr += Math.floor(Math.random() * 10).toString();
    }

    let randBig = BigInt(randStr) % range;
    if (randBig < 0n) randBig = -randBig;
    return (minBig + randBig).toString();
  } catch (err) {
    const min = parseFloat(minStr) || 1;
    const max = parseFloat(maxStr) || 100;
    if (min > max) return "Error: Invalid bounds";
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  }
}

function generateRandomComprehensive(
  minStr: string,
  maxStr: string,
  countStr: string,
  type: "integer" | "decimal",
  precStr: string
): string {
  const count = Math.min(Math.max(1, parseInt(countStr || "1", 10)), 100);
  const min = parseFloat(minStr || "0.2");
  const max = parseFloat(maxStr || "112.5");
  const precision = Math.min(Math.max(0, parseInt(precStr || "50", 10)), 999);

  if (isNaN(min) || isNaN(max) || min > max) {
    return "Error: Lower limit must be less than or equal to upper limit.";
  }

  const results: string[] = [];

  for (let c = 0; c < count; c++) {
    if (type === "integer") {
      const minInt = Math.ceil(min);
      const maxInt = Math.floor(max);
      if (minInt > maxInt) {
        results.push(Math.floor(min).toString());
      } else {
        const randInt = Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
        results.push(randInt.toString());
      }
    } else {
      // High precision decimal generation
      if (precision <= 14) {
        const randVal = Math.random() * (max - min) + min;
        results.push(randVal.toFixed(precision));
      } else {
        // Multi-digit precision string construction
        const integerRange = Math.floor(max) - Math.ceil(min);
        let wholePart = Math.floor(min);
        if (integerRange > 0) {
          wholePart += Math.floor(Math.random() * (integerRange + 1));
        }

        let digitsStr = "";
        for (let i = 0; i < precision; i++) {
          digitsStr += Math.floor(Math.random() * 10).toString();
        }

        const fullDec = `${wholePart}.${digitsStr}`;
        const numericVal = parseFloat(fullDec);
        if (numericVal < min) {
          results.push(min.toFixed(precision));
        } else if (numericVal > max) {
          results.push(max.toFixed(precision));
        } else {
          results.push(fullDec);
        }
      }
    }
  }

  return results.join(", ");
}

export function RandomCalculator() {
  const [savedItems, setSavedItems] = useState<SavedRandomItem[]>([]);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_random_calculations");
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const handleSaveResult = (e: React.MouseEvent, sectionId: string, sectionTitle: string, expression: string, resultStr: string) => {
    e.preventDefault();
    e.stopPropagation();

    const newItem: SavedRandomItem = {
      id: Date.now().toString(),
      title: sectionTitle,
      expression,
      result: resultStr,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedItems.filter(item => item.result !== resultStr)].slice(0, 15);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_random_calculations", JSON.stringify(updated));
    } catch (err) {}

    setSavedSection(sectionId);
    setTimeout(() => setSavedSection(null), 2000);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_random_calculations", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSaved = () => {
    setSavedItems([]);
    try {
      localStorage.removeItem("saved_random_calculations");
    } catch (e) {}
  };

  // =========================================================================
  // MODULE 1: BASIC RANDOM NUMBER GENERATOR
  // Inputs: Lower Limit = 1, Upper Limit = 100
  // Output: Generated random integer (e.g. 13)
  // =========================================================================
  const [m1Min, setM1Min] = useState<string>("1");
  const [m1Max, setM1Max] = useState<string>("100");
  const [m1Result, setM1Result] = useState<string>(() => generateRandomBasic("1", "100"));

  const handleM1Generate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setM1Result(generateRandomBasic(m1Min, m1Max));
  };

  const handleM1Clear = () => {
    setM1Min("");
    setM1Max("");
    setM1Result("");
  };


  // =========================================================================
  // MODULE 2: COMPREHENSIVE VERSION
  // Inputs: Lower Limit = 0.2, Upper Limit = 112.5, Generate 1 numbers,
  // Type: Integer / Decimal (default Decimal), Precision = 50 digits
  // Output: Generated high-precision decimal (e.g. 96.77650503355482490123...)
  // =========================================================================
  const [m2Min, setM2Min] = useState<string>("0.2");
  const [m2Max, setM2Max] = useState<string>("112.5");
  const [m2Count, setM2Count] = useState<string>("1");
  const [m2Type, setM2Type] = useState<"integer" | "decimal">("decimal");
  const [m2Precision, setM2Precision] = useState<string>("50");
  const [m2Result, setM2Result] = useState<string>(() =>
    generateRandomComprehensive("0.2", "112.5", "1", "decimal", "50")
  );

  const handleM2Generate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setM2Result(generateRandomComprehensive(m2Min, m2Max, m2Count, m2Type, m2Precision));
  };

  const handleM2Clear = () => {
    setM2Min("");
    setM2Max("");
    setM2Count("1");
    setM2Type("decimal");
    setM2Precision("50");
    setM2Result("");
  };

  return (
    <div className="space-y-8 font-sans text-slate-800 dark:text-slate-200">

      {/* ========================================================================= */}
      {/* MODULE 1: RANDOM NUMBER GENERATOR (BASIC) */}
      {/* ========================================================================= */}
      <section id="random-number-generator" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Random Number Generator
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          This version of the generator creates a random integer. It can deal with very large integers up to a few thousand digits.
        </p>

        {/* Result Header & Large Display */}
        {m1Result && (
          <div className="space-y-3 max-w-md">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result</span>
                <button
                  type="button"
                  onClick={(e) => handleSaveResult(e, "m1", "Random Number Generator", `Range [${m1Min}, ${m1Max}]`, m1Result)}
                  className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {savedSection === "m1" ? "Saved!" : "Save"}
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xl sm:text-2xl break-all">
                {m1Result}
              </div>
            </div>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleM1Generate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-md">
          <div className="flex items-center justify-between gap-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Lower Limit</label>
            <input
              type="text"
              value={m1Min}
              onChange={(e) => setM1Min(e.target.value)}
              placeholder="1"
              aria-label="Lower limit"
              className="w-48 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Upper Limit</label>
            <input
              type="text"
              value={m1Max}
              onChange={(e) => setM1Max(e.target.value)}
              placeholder="100"
              aria-label="Upper limit"
              className="w-48 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Generate
            </button>
            <button
              type="button"
              onClick={handleM1Clear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>
      </section>


      {/* ========================================================================= */}
      {/* MODULE 2: COMPREHENSIVE VERSION */}
      {/* ========================================================================= */}
      <section id="comprehensive-version" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Comprehensive Version
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          This version of the generator can create one or many random integers or decimals. It can deal with very large numbers with up to 999 digits of precision.
        </p>

        {/* Result Header & Output Display */}
        {m2Result && (
          <div className="space-y-3 max-w-xl">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result</span>
                <button
                  type="button"
                  onClick={(e) => handleSaveResult(e, "m2", "Comprehensive Generator", `Range [${m2Min}, ${m2Max}] (${m2Type}, ${m2Precision} digits)`, m2Result)}
                  className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {savedSection === "m2" ? "Saved!" : "Save"}
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-semibold text-xs sm:text-sm leading-relaxed break-all max-h-64 overflow-y-auto">
                {m2Result}
              </div>
            </div>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleM2Generate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-md">
          <div className="flex items-center justify-between gap-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Lower Limit</label>
            <input
              type="text"
              value={m2Min}
              onChange={(e) => setM2Min(e.target.value)}
              placeholder="0.2"
              aria-label="Lower limit"
              className="w-44 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Upper Limit</label>
            <input
              type="text"
              value={m2Max}
              onChange={(e) => setM2Max(e.target.value)}
              placeholder="112.5"
              aria-label="Upper limit"
              className="w-44 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Generate</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={m2Count}
                onChange={(e) => setM2Count(e.target.value)}
                placeholder="1"
                aria-label="Quantity of numbers to generate"
                className="w-24 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600 text-center"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">numbers</span>
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Type of result to generate?</label>
            <div className="flex items-center gap-4 text-xs font-medium pt-0.5">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="genType"
                  value="integer"
                  checked={m2Type === "integer"}
                  onChange={() => setM2Type("integer")}
                  className="accent-blue-600"
                />
                <span>Integer</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="genType"
                  value="decimal"
                  checked={m2Type === "decimal"}
                  onChange={() => setM2Type("decimal")}
                  className="accent-blue-600"
                />
                <span>Decimal</span>
              </label>
            </div>
          </div>

          {m2Type === "decimal" && (
            <div className="flex items-center justify-between gap-4 pt-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Precision</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={m2Precision}
                  onChange={(e) => setM2Precision(e.target.value)}
                  placeholder="50"
                  aria-label="Precision digits"
                  className="w-24 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600 text-center"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">digits</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Generate
            </button>
            <button
              type="button"
              onClick={handleM2Clear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>
      </section>


      {/* ========================================================================= */}
      {/* SAVED GENERATION HISTORY */}
      {/* ========================================================================= */}
      {savedItems.length > 0 && (
        <section className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
              <span>Saved Generations ({savedItems.length})</span>
            </h3>
            <button
              type="button"
              onClick={handleClearAllSaved}
              className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-3 rounded border border-slate-200 dark:border-slate-700 text-xs font-sans"
              >
                <div className="space-y-0.5 min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{item.title}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.timestamp}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 truncate font-sans tabular-nums">
                    {item.expression} &rarr; <strong className="text-blue-600 dark:text-blue-400">{item.result}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteSaved(item.id)}
                  className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer shrink-0"
                  title="Delete calculation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
