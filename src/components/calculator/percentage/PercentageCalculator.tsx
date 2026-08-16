"use client";

import React, { useState, useEffect } from "react";

export interface SavedCalcItem {
  id: string;
  title: string;
  expression: string;
  result: string;
  timestamp: string;
}

export function PercentageCalculator() {
  const [savedItems, setSavedItems] = useState<SavedCalcItem[]>([]);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_percentage_calculations");
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const handleSaveResult = (e: React.MouseEvent, sectionId: string, sectionTitle: string, expression: string, resultStr: string) => {
    e.preventDefault();
    e.stopPropagation();

    const newItem: SavedCalcItem = {
      id: Date.now().toString(),
      title: sectionTitle,
      expression,
      result: resultStr,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedItems.filter(item => item.expression !== expression)].slice(0, 15);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_percentage_calculations", JSON.stringify(updated));
    } catch (err) {}

    setSavedSection(sectionId);
    setTimeout(() => setSavedSection(null), 2000);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_percentage_calculations", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSaved = () => {
    setSavedItems([]);
    try {
      localStorage.removeItem("saved_percentage_calculations");
    } catch (e) {}
  };

  // =========================================================================
  // SECTION 1: PERCENTAGE CALCULATOR (CORE)
  // [Input 1: P] % of [Input 2: V1] = [Input 3: V2]
  // =========================================================================
  const [s1P, setS1P] = useState<string>("4");
  const [s1V1, setS1V1] = useState<string>("6");
  const [s1V2, setS1V2] = useState<string>("");
  const [s1Result, setS1Result] = useState<{
    resultStr: string;
    summaryText: React.ReactNode;
    summaryRawText: string;
    stepText: string;
  } | null>(() => computeS1("4", "6", ""));

  function computeS1(pStr: string, v1Str: string, v2Str: string) {
    const p = parseFloat(pStr);
    const v1 = parseFloat(v1Str);
    const v2 = parseFloat(v2Str);

    const hasP = !Number.isNaN(p) && pStr.trim() !== "";
    const hasV1 = !Number.isNaN(v1) && v1Str.trim() !== "";
    const hasV2 = !Number.isNaN(v2) && v2Str.trim() !== "";

    if (hasP && hasV1) {
      const res = (p / 100) * v1;
      const resFormatted = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(6)).toString();
      const dec = p / 100;
      return {
        resultStr: resFormatted,
        summaryText: <span>{p}% of {v1} = <strong className="text-blue-600 dark:text-blue-400 font-bold">{resFormatted}</strong></span>,
        summaryRawText: `${p}% of ${v1} = ${resFormatted}`,
        stepText: `${p}% of ${v1} = ${dec} × ${v1} = ${resFormatted}`
      };
    } else if (hasV2 && hasV1) {
      if (v1 === 0) return null;
      const resP = (v2 / v1) * 100;
      const resFormatted = (Number.isInteger(resP) ? resP.toString() : parseFloat(resP.toFixed(6)).toString()) + "%";
      const ratio = v2 / v1;
      return {
        resultStr: resFormatted,
        summaryText: <span>{v2} is <strong className="text-blue-600 dark:text-blue-400 font-bold">{resFormatted}</strong> of {v1}.</span>,
        summaryRawText: `${v2} is ${resFormatted} of ${v1}`,
        stepText: `${v2} ÷ ${v1} = ${parseFloat(ratio.toFixed(6))} = ${resFormatted}`
      };
    } else if (hasV2 && hasP) {
      if (p === 0) return null;
      const resV1 = v2 / (p / 100);
      const resFormatted = Number.isInteger(resV1) ? resV1.toString() : parseFloat(resV1.toFixed(6)).toString();
      return {
        resultStr: resFormatted,
        summaryText: <span>{v2} is {p}% of <strong className="text-blue-600 dark:text-blue-400 font-bold">{resFormatted}</strong>.</span>,
        summaryRawText: `${v2} is ${p}% of ${resFormatted}`,
        stepText: `${v2} ÷ ${p}% = ${resFormatted}`
      };
    }
    return null;
  }

  const handleS1Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setS1Result(computeS1(s1P, s1V1, s1V2));
  };

  const handleS1Clear = () => {
    setS1P("");
    setS1V1("");
    setS1V2("");
    setS1Result(null);
  };


  // =========================================================================
  // SECTION 2: PERCENTAGE CALCULATOR IN COMMON PHRASES (3 ROWS)
  // Row 1: what is [ P ] % of [ V1 ]
  // Row 2: [ V2 ] is what % of [ V1 ]
  // Row 3: [ V2 ] is [ P ] % of what
  // =========================================================================
  const [s2R1P, setS2R1P] = useState<string>("5");
  const [s2R1V1, setS2R1V1] = useState<string>("8");
  const [s2R1Result, setS2R1Result] = useState<{
    resultStr: string;
    summaryText: React.ReactNode;
    summaryRawText: string;
    stepText: string;
  } | null>(() => computeS2R1("5", "8"));

  function computeS2R1(pStr: string, v1Str: string) {
    const p = parseFloat(pStr);
    const v1 = parseFloat(v1Str);
    if (Number.isNaN(p) || Number.isNaN(v1)) return null;
    const res = (p / 100) * v1;
    const resFormatted = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(6)).toString();
    return {
      resultStr: resFormatted,
      summaryText: <span><strong className="text-blue-600 dark:text-blue-400 font-bold">{resFormatted}</strong> is {p}% of {v1}.</span>,
      summaryRawText: `${resFormatted} is ${p}% of ${v1}`,
      stepText: `${p}% × ${v1} = ${resFormatted}`
    };
  }

  const handleS2R1Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setS2PhraseResult(computeS2R1(s2R1P, s2R1V1));
  };

  const [s2R2V2, setS2R2V2] = useState<string>("8");
  const [s2R2V1, setS2R2V1] = useState<string>("2");

  function computeS2R2(v2Str: string, v1Str: string) {
    const v2 = parseFloat(v2Str);
    const v1 = parseFloat(v1Str);
    if (Number.isNaN(v2) || Number.isNaN(v1) || v1 === 0) return null;
    const resP = (v2 / v1) * 100;
    const resFormatted = (Number.isInteger(resP) ? resP.toString() : parseFloat(resP.toFixed(6)).toString()) + "%";
    const ratio = v2 / v1;
    return {
      resultStr: resFormatted,
      summaryText: <span>{v2} is <strong className="text-blue-600 dark:text-blue-400 font-bold">{resFormatted}</strong> of {v1}.</span>,
      summaryRawText: `${v2} is ${resFormatted} of ${v1}`,
      stepText: `${v2} ÷ ${v1} = ${parseFloat(ratio.toFixed(6))} = ${resFormatted}`
    };
  }

  const handleS2R2Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setS2PhraseResult(computeS2R2(s2R2V2, s2R2V1));
  };

  const [s2R3V2, setS2R3V2] = useState<string>("8");
  const [s2R3P, setS2R3P] = useState<string>("2");

  function computeS2R3(v2Str: string, pStr: string) {
    const v2 = parseFloat(v2Str);
    const p = parseFloat(pStr);
    if (Number.isNaN(v2) || Number.isNaN(p) || p === 0) return null;
    const resV1 = v2 / (p / 100);
    const resFormatted = Number.isInteger(resV1) ? resV1.toString() : parseFloat(resV1.toFixed(6)).toString();
    return {
      resultStr: resFormatted,
      summaryText: <span>{v2} is {p}% of <strong className="text-blue-600 dark:text-blue-400 font-bold">{resFormatted}</strong>.</span>,
      summaryRawText: `${v2} is ${p}% of ${resFormatted}`,
      stepText: `${v2} ÷ ${p}% = ${resFormatted}`
    };
  }

  const handleS2R3Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setS2PhraseResult(computeS2R3(s2R3V2, s2R3P));
  };

  // Active Phrase Calculation Result display
  const [s2PhraseResult, setS2PhraseResult] = useState<{
    resultStr: string;
    summaryText: React.ReactNode;
    summaryRawText: string;
    stepText: string;
  } | null>(() => computeS2R1("5", "8"));


  // =========================================================================
  // SECTION 3: PERCENTAGE DIFFERENCE CALCULATOR
  // Value 1 [ V1 ], Value 2 [ V2 ]
  // =========================================================================
  const [s3V1, setS3V1] = useState<string>("5");
  const [s3V2, setS3V2] = useState<string>("9");
  const [s3Result, setS3Result] = useState<{
    v1: number;
    v2: number;
    diff: number;
    avg: number;
    pDiff: number;
    resultStr: string;
    summaryRawText: string;
  } | null>(() => computeS3("5", "9"));

  function computeS3(v1Str: string, v2Str: string) {
    const v1 = parseFloat(v1Str);
    const v2 = parseFloat(v2Str);
    if (Number.isNaN(v1) || Number.isNaN(v2)) return null;

    const diff = Math.abs(v1 - v2);
    const avg = (v1 + v2) / 2;
    if (avg === 0) return null;
    const pDiff = (diff / avg) * 100;
    const resFormatted = pDiff.toString();

    return {
      v1,
      v2,
      diff,
      avg,
      pDiff,
      resultStr: `${resFormatted}%`,
      summaryRawText: `Difference of ${v1} and ${v2} are ${resFormatted}%`
    };
  }

  const handleS3Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setS3Result(computeS3(s3V1, s3V2));
  };

  const handleS3Clear = () => {
    setS3V1("");
    setS3V2("");
    setS3Result(null);
  };


  // =========================================================================
  // SECTION 4: PERCENTAGE CHANGE CALCULATOR
  // [ V1 ] Increase/Decrease [ P ] % = [ V2 ]
  // =========================================================================
  const [s4V1, setS4V1] = useState<string>("5");
  const [s4Mode, setS4Mode] = useState<"Increase" | "Decrease">("Increase");
  const [s4P, setS4P] = useState<string>("8");
  const [s4V2, setS4V2] = useState<string>("");
  const [s4Result, setS4Result] = useState<{
    v1: number;
    p: number;
    v2: number;
    mode: "Increase" | "Decrease";
    resultStr: string;
    summaryRawText: string;
    stepText: string;
  } | null>(() => computeS4("5", "Increase", "8", ""));

  function computeS4(v1Str: string, mode: "Increase" | "Decrease", pStr: string, v2Str: string) {
    const v1 = parseFloat(v1Str);
    const p = parseFloat(pStr);
    const v2 = parseFloat(v2Str);

    const hasV1 = !Number.isNaN(v1) && v1Str.trim() !== "";
    const hasP = !Number.isNaN(p) && pStr.trim() !== "";
    const hasV2 = !Number.isNaN(v2) && v2Str.trim() !== "";

    if (hasV1 && hasP) {
      const factor = mode === "Increase" ? 1 + p / 100 : 1 - p / 100;
      const resV2 = v1 * factor;
      const resFormatted = Number.isInteger(resV2) ? resV2.toString() : parseFloat(resV2.toFixed(6)).toString();
      const decP = p / 100;
      const sign = mode === "Increase" ? "+" : "-";

      return {
        v1,
        p,
        v2: resV2,
        mode,
        resultStr: resFormatted,
        summaryRawText: `${v1} ${mode.toLowerCase()} ${p}% = ${resFormatted}`,
        stepText: `${v1} ${mode.toLowerCase()} ${p}% = ${v1} × (1 ${sign} ${p}%) = ${v1} × (1 ${sign} ${decP}) = ${resFormatted}`
      };
    } else if (hasV1 && hasV2) {
      if (v1 === 0) return null;
      const diff = v2 - v1;
      const pctChange = (diff / v1) * 100;
      const calculatedMode: "Increase" | "Decrease" = pctChange >= 0 ? "Increase" : "Decrease";
      const absP = Math.abs(pctChange);
      const pFormatted = (Number.isInteger(absP) ? absP.toString() : parseFloat(absP.toFixed(6)).toString()) + "%";

      return {
        v1,
        p: absP,
        v2,
        mode: calculatedMode,
        resultStr: pFormatted,
        summaryRawText: `${v1} to ${v2} is a ${pFormatted} ${calculatedMode.toLowerCase()}`,
        stepText: `|${v2} - ${v1}| ÷ ${v1} × 100% = ${pFormatted}`
      };
    }

    return null;
  }

  const handleS4Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setS4Result(computeS4(s4V1, s4Mode, s4P, s4V2));
  };

  const handleS4Clear = () => {
    setS4V1("");
    setS4Mode("Increase");
    setS4P("");
    setS4V2("");
    setS4Result(null);
  };

  return (
    <div className="space-y-8 font-sans text-slate-800 dark:text-slate-200">

      {/* ========================================================================= */}
      {/* SECTION 1: PERCENTAGE CALCULATOR (CORE) */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Percentage Calculator
        </h2>

        {/* Inputs Form */}
        <form onSubmit={handleS1Calculate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <input
              type="text"
              value={s1P}
              onChange={(e) => setS1P(e.target.value)}
              placeholder="4"
              aria-label="Percentage rate P"
              className="w-24 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
            <span className="font-bold">% of</span>
            <input
              type="text"
              value={s1V1}
              onChange={(e) => setS1V1(e.target.value)}
              placeholder="6"
              aria-label="Base value V1"
              className="w-28 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
            <span className="font-bold">=</span>
            <input
              type="text"
              value={s1V2}
              onChange={(e) => setS1V2(e.target.value)}
              placeholder="0.24"
              aria-label="Result part V2"
              className="w-28 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors flex items-center justify-center cursor-pointer"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={handleS1Clear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Results Banner & Steps Section */}
        {s1Result && (
          <div className="space-y-3 max-w-xl">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result: {s1Result.resultStr}</span>
                <button
                  type="button"
                  onClick={(e) => handleSaveResult(e, "s1", "Percentage Calculator", s1Result.summaryRawText, s1Result.resultStr)}
                  className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {savedSection === "s1" ? "Saved!" : "Save"}
                </button>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3.5 text-xs font-sans space-y-3">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {s1Result.summaryText}
                </div>
                <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">Steps:</div>
                  <p className="font-sans tabular-nums text-slate-700 dark:text-slate-300 font-semibold text-xs">
                    {s1Result.stepText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>


      {/* ========================================================================= */}
      {/* SECTION 2: PERCENTAGE CALCULATOR IN COMMON PHRASES */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Percentage Calculator in Common Phrases
        </h2>

        {/* Phrases Rows */}
        <div className="space-y-3 max-w-xl">
          {/* Row 1: what is [ P ] % of [ V1 ] */}
          <form onSubmit={handleS2R1Calculate} className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-semibold">
              <span>what is</span>
              <input
                type="text"
                value={s2R1P}
                onChange={(e) => setS2R1P(e.target.value)}
                placeholder="5"
                aria-label="Percentage P"
                className="w-20 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600 text-center"
              />
              <span>% of</span>
              <input
                type="text"
                value={s2R1V1}
                onChange={(e) => setS2R1V1(e.target.value)}
                placeholder="8"
                aria-label="Base V1"
                className="w-24 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600 text-center"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1 transition-colors cursor-pointer shrink-0"
            >
              Calculate
            </button>
          </form>

          {/* Row 2: [ V2 ] is what % of [ V1 ] */}
          <form onSubmit={handleS2R2Calculate} className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-semibold">
              <input
                type="text"
                value={s2R2V2}
                onChange={(e) => setS2R2V2(e.target.value)}
                placeholder="8"
                aria-label="Part V2"
                className="w-20 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600 text-center"
              />
              <span>is what % of</span>
              <input
                type="text"
                value={s2R2V1}
                onChange={(e) => setS2R2V1(e.target.value)}
                placeholder="2"
                aria-label="Base V1"
                className="w-24 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600 text-center"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1 transition-colors cursor-pointer shrink-0"
            >
              Calculate
            </button>
          </form>

          {/* Row 3: [ V2 ] is [ P ] % of what */}
          <form onSubmit={handleS2R3Calculate} className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-semibold">
              <input
                type="text"
                value={s2R3V2}
                onChange={(e) => setS2R3V2(e.target.value)}
                placeholder="8"
                aria-label="Part V2"
                className="w-20 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600 text-center"
              />
              <span>is</span>
              <input
                type="text"
                value={s2R3P}
                onChange={(e) => setS2R3P(e.target.value)}
                placeholder="2"
                aria-label="Percentage P"
                className="w-20 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600 text-center"
              />
              <span>% of what</span>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1 transition-colors cursor-pointer shrink-0"
            >
              Calculate
            </button>
          </form>
        </div>

        {/* Phrases Result Display */}
        {s2PhraseResult && (
          <div className="space-y-3 max-w-xl pt-1">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result: {s2PhraseResult.resultStr}</span>
                <button
                  type="button"
                  onClick={(e) => handleSaveResult(e, "s2", "Common Phrases", s2PhraseResult.summaryRawText, s2PhraseResult.resultStr)}
                  className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {savedSection === "s2" ? "Saved!" : "Save"}
                </button>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3.5 text-xs font-sans space-y-3">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {s2PhraseResult.summaryText}
                </div>
                <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">Steps:</div>
                  <p className="font-sans tabular-nums text-slate-700 dark:text-slate-300 font-semibold text-xs">
                    {s2PhraseResult.stepText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>


      {/* ========================================================================= */}
      {/* SECTION 3: PERCENTAGE DIFFERENCE CALCULATOR */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Percentage Difference Calculator
        </h2>

        {/* Inputs Form */}
        <form onSubmit={handleS3Calculate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-md">
          <div className="flex items-center justify-between gap-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Value 1</label>
            <input
              type="text"
              value={s3V1}
              onChange={(e) => setS3V1(e.target.value)}
              placeholder="5"
              aria-label="Value 1"
              className="w-36 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Value 2</label>
            <input
              type="text"
              value={s3V2}
              onChange={(e) => setS3V2(e.target.value)}
              placeholder="9"
              aria-label="Value 2"
              className="w-36 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={handleS3Clear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Results Banner & Formula Steps */}
        {s3Result && (
          <div className="space-y-3 max-w-xl">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result: {s3Result.resultStr}</span>
                <button
                  type="button"
                  onClick={(e) => handleSaveResult(e, "s3", "Percentage Difference", s3Result.summaryRawText, s3Result.resultStr)}
                  className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {savedSection === "s3" ? "Saved!" : "Save"}
                </button>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3.5 text-xs font-sans space-y-3">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Difference of {s3Result.v1} and {s3Result.v2} are <strong className="text-blue-600 dark:text-blue-400 font-bold">{s3Result.resultStr}</strong>
                </div>

                <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">Steps:</div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded border border-slate-200 dark:border-slate-700 font-sans tabular-nums text-xs leading-relaxed space-y-1.5 overflow-x-auto">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      Difference of {s3Result.v1} and {s3Result.v2} = <span className="inline-flex items-center align-middle mx-1"><sup>|{s3Result.v1} - {s3Result.v2}|</sup>&frasl;<sub>({s3Result.v1} + {s3Result.v2})/2</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>{s3Result.diff}</sup>&frasl;<sub>{s3Result.avg}</sub></span> = {parseFloat((s3Result.diff / s3Result.avg).toFixed(14))} = {s3Result.resultStr}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>


      {/* ========================================================================= */}
      {/* SECTION 4: PERCENTAGE CHANGE CALCULATOR */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Percentage Change Calculator
        </h2>

        {/* Inputs Form */}
        <form onSubmit={handleS4Calculate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <input
              type="text"
              value={s4V1}
              onChange={(e) => setS4V1(e.target.value)}
              placeholder="5"
              aria-label="Initial value V1"
              className="w-24 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
            <select
              value={s4Mode}
              onChange={(e) => setS4Mode(e.target.value as "Increase" | "Decrease")}
              aria-label="Change direction"
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans font-semibold outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
            >
              <option value="Increase">Increase</option>
              <option value="Decrease">Decrease</option>
            </select>
            <input
              type="text"
              value={s4P}
              onChange={(e) => setS4P(e.target.value)}
              placeholder="8"
              aria-label="Percentage P"
              className="w-24 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
            <span className="font-bold">% =</span>
            <input
              type="text"
              value={s4V2}
              onChange={(e) => setS4V2(e.target.value)}
              placeholder="5.4"
              aria-label="Final target V2"
              className="w-28 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={handleS4Clear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Results Banner & Derivation Steps */}
        {s4Result && (
          <div className="space-y-3 max-w-xl">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result: {s4Result.resultStr}</span>
                <button
                  type="button"
                  onClick={(e) => handleSaveResult(e, "s4", "Percentage Change", s4Result.summaryRawText, s4Result.resultStr)}
                  className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {savedSection === "s4" ? "Saved!" : "Save"}
                </button>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3.5 text-xs font-sans space-y-3">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {s4Result.v1} {s4Result.mode.toLowerCase()} {s4Result.p}% = <strong className="text-blue-600 dark:text-blue-400 font-bold">{s4Result.resultStr}</strong>
                </div>

                <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">Steps:</div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded border border-slate-200 dark:border-slate-700 font-sans tabular-nums text-xs leading-relaxed overflow-x-auto">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {s4Result.stepText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>


      {/* ========================================================================= */}
      {/* SAVED CALCULATIONS HISTORY */}
      {/* ========================================================================= */}
      {savedItems.length > 0 && (
        <section className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
              <span>Saved Calculations ({savedItems.length})</span>
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
                    {item.expression} = <strong className="text-blue-600 dark:text-blue-400">{item.result}</strong>
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
