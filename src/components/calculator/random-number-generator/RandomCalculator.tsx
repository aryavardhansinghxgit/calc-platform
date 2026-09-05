"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Copy, Check, RotateCcw, Download, Trash2, Bookmark, FileSpreadsheet, FileCode } from "lucide-react";
import {
  generateRandomBasicEngine,
  generateRandomComprehensiveEngine,
  isWebCryptoAvailable
} from "./random-engine";
import { RandomVisualizer } from "./RandomVisualizer";

export interface SavedRandomParams {
  generator: "basic" | "comprehensive";
  min: string;
  max: string;
  count?: string;
  type?: "integer" | "decimal";
  precision?: string;
}

export interface SavedRandomItem {
  id: string;
  title: string;
  expression: string;
  result: string;
  timestamp: string;
  params?: SavedRandomParams;
}

export function RandomCalculator() {
  const [savedItems, setSavedItems] = useState<SavedRandomItem[]>([]);
  const [savedSection, setSavedSection] = useState<string | null>(null);
  const [copiedM1, setCopiedM1] = useState(false);
  const [copiedM2, setCopiedM2] = useState(false);

  // Status message for screen-readers (aria-live)
  const [announcement, setAnnouncement] = useState<string>("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_random_calculations");
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  // Save calculation
  const handleSaveResult = (
    e: React.MouseEvent,
    sectionId: string,
    sectionTitle: string,
    expression: string,
    resultStr: string,
    params: SavedRandomParams
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const newItem: SavedRandomItem = {
      id: Date.now().toString(),
      title: sectionTitle,
      expression,
      result: resultStr,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      params
    };

    const updated = [newItem, ...savedItems.filter(item => item.result !== resultStr)].slice(0, 15);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_random_calculations", JSON.stringify(updated));
    } catch (err) {}

    setSavedSection(sectionId);
    setAnnouncement(`Calculation saved: ${sectionTitle}`);
    setTimeout(() => setSavedSection(null), 2000);
  };

  // Delete saved calculation
  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_random_calculations", JSON.stringify(updated));
    } catch (e) {}
    setAnnouncement("Saved calculation deleted.");
  };

  // Clear all saved calculations
  const handleClearAllSaved = () => {
    setSavedItems([]);
    try {
      localStorage.removeItem("saved_random_calculations");
    } catch (e) {}
    setAnnouncement("All saved calculations cleared.");
  };

  // Restore saved calculation
  const handleRestoreSaved = (item: SavedRandomItem) => {
    if (!item.params) return;

    if (item.params.generator === "basic") {
      setM1Min(item.params.min);
      setM1Max(item.params.max);
      setM1Result(item.result);
      setM1Error(null);
      const el = document.getElementById("basic-generator");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      setM2Min(item.params.min);
      setM2Max(item.params.max);
      if (item.params.count) setM2Count(item.params.count);
      if (item.params.type) setM2Type(item.params.type);
      if (item.params.precision) setM2Precision(item.params.precision);
      setM2Result(item.result);
      setM2ResultList(item.result.split(", "));
      setM2Error(null);
      const el = document.getElementById("comprehensive-version");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setAnnouncement(`Restored calculation: ${item.title}`);
  };

  // Copy to clipboard helper
  const copyToClipboard = async (text: string, isM1: boolean) => {
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      if (isM1) {
        setCopiedM1(true);
        setTimeout(() => setCopiedM1(false), 2000);
      } else {
        setCopiedM2(true);
        setTimeout(() => setCopiedM2(false), 2000);
      }
      setAnnouncement("Result copied to clipboard.");
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  // =========================================================================
  // MODULE 1: BASIC RANDOM NUMBER GENERATOR
  // =========================================================================
  const [m1Min, setM1Min] = useState<string>("1");
  const [m1Max, setM1Max] = useState<string>("100");
  const [m1Result, setM1Result] = useState<string>(() => {
    const init = generateRandomBasicEngine("1", "100");
    return init.result || "18";
  });
  const [m1Error, setM1Error] = useState<string | null>(null);

  const handleM1Generate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const outcome = generateRandomBasicEngine(m1Min, m1Max);
    if (outcome.success && outcome.result) {
      setM1Result(outcome.result);
      setM1Error(null);
      setAnnouncement(`Generated random integer: ${outcome.result}`);
    } else {
      setM1Error(outcome.error || "Generation error");
      setM1Result("");
    }
  };

  const handleM1Clear = () => {
    setM1Min("");
    setM1Max("");
    setM1Result("");
    setM1Error(null);
    setAnnouncement("Basic generator inputs cleared.");
  };

  // =========================================================================
  // MODULE 2: COMPREHENSIVE VERSION
  // =========================================================================
  const [m2Min, setM2Min] = useState<string>("0.2");
  const [m2Max, setM2Max] = useState<string>("112.5");
  const [m2Count, setM2Count] = useState<string>("1");
  const [m2Type, setM2Type] = useState<"integer" | "decimal">("decimal");
  const [m2Precision, setM2Precision] = useState<string>("50");
  const [m2ResultList, setM2ResultList] = useState<string[]>(() => {
    const init = generateRandomComprehensiveEngine("0.2", "112.5", 1, "decimal", 50);
    return init.results || [];
  });
  const [m2Result, setM2Result] = useState<string>(() => {
    const init = generateRandomComprehensiveEngine("0.2", "112.5", 1, "decimal", 50);
    return init.results ? init.results.join(", ") : "";
  });
  const [m2Error, setM2Error] = useState<string | null>(null);

  const handleM2Generate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const countVal = parseInt(m2Count.trim(), 10) || 1;
    const precVal = parseInt(m2Precision.trim(), 10) || 0;

    const outcome = generateRandomComprehensiveEngine(m2Min, m2Max, countVal, m2Type, precVal);
    if (outcome.success && outcome.results) {
      setM2ResultList(outcome.results);
      setM2Result(outcome.results.join(", "));
      setM2Error(null);
      setAnnouncement(`Generated ${outcome.results.length} random ${m2Type} numbers.`);
    } else {
      setM2Error(outcome.error || "Generation error");
      setM2Result("");
      setM2ResultList([]);
    }
  };

  const handleM2Clear = () => {
    setM2Min("");
    setM2Max("");
    setM2Count("1");
    setM2Precision("50");
    setM2Result("");
    setM2ResultList([]);
    setM2Error(null);
    setAnnouncement("Comprehensive generator inputs cleared.");
  };

  // CSV Export Handler (RFC-4180 compliant)
  const handleExportCSV = () => {
    if (!m2ResultList.length) return;

    const dateStr = new Date().toISOString();
    const fileDate = dateStr.replace(/[:.]/g, "-").slice(0, 19);

    let csvContent = `Index,Value\n`;
    m2ResultList.forEach((val, idx) => {
      // Escape if contains comma or quotes
      const escaped = val.includes(",") || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
      csvContent += `${idx + 1},${escaped}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `random-numbers-${fileDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setAnnouncement("CSV export downloaded.");
  };

  // JSON Export Handler
  const handleExportJSON = () => {
    if (!m2ResultList.length) return;

    const dateStr = new Date().toISOString();
    const fileDate = dateStr.replace(/[:.]/g, "-").slice(0, 19);

    const exportData = {
      generator: "comprehensive",
      lowerLimit: m2Min,
      upperLimit: m2Max,
      count: m2ResultList.length,
      type: m2Type,
      precision: m2Type === "decimal" ? parseInt(m2Precision, 10) || 0 : undefined,
      timestamp: dateStr,
      results: m2ResultList
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `random-numbers-${fileDate}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setAnnouncement("JSON export downloaded.");
  };

  // Statistical Visualizer Data (when count > 1)
  const visualizerData = useMemo(() => {
    if (m2ResultList.length <= 1) return null;

    const numericSamples: number[] = [];
    for (const str of m2ResultList) {
      const num = parseFloat(str);
      if (!isNaN(num)) numericSamples.push(num);
    }

    if (!numericSamples.length) return null;

    const minNum = Math.min(...numericSamples);
    const maxNum = Math.max(...numericSamples);
    const sum = numericSamples.reduce((a, b) => a + b, 0);
    const mean = parseFloat((sum / numericSamples.length).toFixed(4));

    const variance = numericSamples.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / numericSamples.length;
    const stdDev = parseFloat(Math.sqrt(variance).toFixed(4));

    // Calculate 5-10 histogram bins
    const numBins = Math.min(10, Math.max(5, Math.ceil(Math.sqrt(numericSamples.length))));
    const range = maxNum - minNum || 1;
    const binWidth = range / numBins;

    const bins: { binLabel: string; count: number }[] = [];
    for (let i = 0; i < numBins; i++) {
      const binStart = minNum + i * binWidth;
      const binEnd = minNum + (i + 1) * binWidth;
      const label = `${binStart.toFixed(1)}-${binEnd.toFixed(1)}`;
      bins.push({ binLabel: label, count: 0 });
    }

    for (const val of numericSamples) {
      let binIdx = Math.floor((val - minNum) / binWidth);
      if (binIdx >= numBins) binIdx = numBins - 1;
      if (binIdx < 0) binIdx = 0;
      bins[binIdx].count++;
    }

    return {
      numbers: numericSamples,
      histogramBins: bins,
      mean,
      stdDev,
      min: parseFloat(minNum.toFixed(4)),
      max: parseFloat(maxNum.toFixed(4))
    };
  }, [m2ResultList]);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Live region for accessibility announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* ========================================================================= */}
      {/* MODULE 1: BASIC RANDOM NUMBER GENERATOR */}
      {/* ========================================================================= */}
      <section id="basic-generator" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4 print:border-none print:shadow-none print:p-0 print:break-inside-avoid">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Random Number Generator
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          This version of the generator creates an unbiased cryptographically secure pseudo-random integer using the browser Web Crypto API. It supports arbitrary large whole numbers with exact precision.
        </p>

        {/* Result Header & Output Display */}
        {m1Result && (
          <div className="space-y-3 max-w-xl">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result</span>
                <div className="flex items-center gap-1.5 no-print">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(m1Result, true)}
                    className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                    aria-label="Copy result to clipboard"
                    title="Copy result"
                  >
                    {copiedM1 ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedM1 ? "Copied!" : "Copy"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleSaveResult(e, "m1", "Random Number Generator", `Range [${m1Min}, ${m1Max}]`, m1Result, { generator: "basic", min: m1Min, max: m1Max })}
                    className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                    aria-label="Save calculation"
                  >
                    {savedSection === "m1" ? "Saved!" : "Save"}
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-base sm:text-lg leading-relaxed break-all">
                {m1Result}
              </div>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {m1Error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded text-xs text-red-700 dark:text-red-300 font-medium">
            {m1Error}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleM1Generate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-md">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="m1-lower-limit" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Lower Limit</label>
            <input
              id="m1-lower-limit"
              type="text"
              value={m1Min}
              onChange={(e) => setM1Min(e.target.value)}
              placeholder="1"
              aria-label="Lower limit"
              className="w-44 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <label htmlFor="m1-upper-limit" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Upper Limit</label>
            <input
              id="m1-upper-limit"
              type="text"
              value={m1Max}
              onChange={(e) => setM1Max(e.target.value)}
              placeholder="100"
              aria-label="Upper limit"
              className="w-44 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2 no-print">
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
      <section id="comprehensive-version" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4 print:border-none print:shadow-none print:p-0 print:break-inside-avoid">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Comprehensive Version
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Generate one or multiple random integers or decimals with up to 999 digits of precision. Employs exact scaled uniform sampling to eliminate boundary distortion.
        </p>

        {/* Result Header & Output Display */}
        {m2Result && (
          <div className="space-y-3 max-w-2xl">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result ({m2ResultList.length} {m2ResultList.length === 1 ? "value" : "values"})</span>
                <div className="flex items-center gap-1.5 no-print">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(m2Result, false)}
                    className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                    aria-label="Copy result to clipboard"
                    title="Copy result"
                  >
                    {copiedM2 ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedM2 ? "Copied!" : "Copy"}</span>
                  </button>

                  {m2ResultList.length > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={handleExportCSV}
                        className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                        aria-label="Export CSV"
                        title="Download CSV"
                      >
                        <FileSpreadsheet className="w-3 h-3" />
                        <span>CSV</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleExportJSON}
                        className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                        aria-label="Export JSON"
                        title="Download JSON"
                      >
                        <FileCode className="w-3 h-3" />
                        <span>JSON</span>
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={(e) => handleSaveResult(
                      e,
                      "m2",
                      "Comprehensive Generator",
                      `Range [${m2Min}, ${m2Max}] (${m2Type}${m2Type === "decimal" ? `, ${m2Precision} digits` : ""}, count ${m2ResultList.length})`,
                      m2Result,
                      {
                        generator: "comprehensive",
                        min: m2Min,
                        max: m2Max,
                        count: m2Count,
                        type: m2Type,
                        precision: m2Precision
                      }
                    )}
                    className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                    aria-label="Save calculation"
                  >
                    {savedSection === "m2" ? "Saved!" : "Save"}
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-semibold text-xs sm:text-sm leading-relaxed break-all max-h-64 overflow-y-auto">
                {m2Result}
              </div>
            </div>

            {/* Render Frequency Distribution Visualization when count > 1 */}
            {visualizerData && (
              <div className="pt-2 print:break-inside-avoid">
                <RandomVisualizer
                  numbers={visualizerData.numbers}
                  histogramBins={visualizerData.histogramBins}
                  mean={visualizerData.mean}
                  stdDev={visualizerData.stdDev}
                  min={visualizerData.min}
                  max={visualizerData.max}
                />
              </div>
            )}
          </div>
        )}

        {/* Error Notification */}
        {m2Error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded text-xs text-red-700 dark:text-red-300 font-medium">
            {m2Error}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleM2Generate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-md">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="m2-lower-limit" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Lower Limit</label>
            <input
              id="m2-lower-limit"
              type="text"
              value={m2Min}
              onChange={(e) => setM2Min(e.target.value)}
              placeholder="0.2"
              aria-label="Lower limit"
              className="w-44 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <label htmlFor="m2-upper-limit" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Upper Limit</label>
            <input
              id="m2-upper-limit"
              type="text"
              value={m2Max}
              onChange={(e) => setM2Max(e.target.value)}
              placeholder="112.5"
              aria-label="Upper limit"
              className="w-44 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <label htmlFor="m2-generate-count" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Generate</label>
            <div className="flex items-center gap-2">
              <input
                id="m2-generate-count"
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
              <label htmlFor="m2-precision" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Precision</label>
              <div className="flex items-center gap-2">
                <input
                  id="m2-precision"
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
          <div className="flex items-center gap-3 pt-2 no-print">
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
        <section className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-3 print:border-none print:shadow-none print:p-0 print:break-inside-avoid">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-blue-600" />
              <span>Saved Generations ({savedItems.length})</span>
            </h3>
            <button
              type="button"
              onClick={handleClearAllSaved}
              className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer no-print"
              aria-label="Clear all saved calculations"
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

                <div className="flex items-center gap-2 no-print shrink-0">
                  {item.params && (
                    <button
                      type="button"
                      onClick={() => handleRestoreSaved(item)}
                      className="text-slate-500 hover:text-blue-600 p-1.5 transition-colors cursor-pointer rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                      title="Restore calculation"
                      aria-label="Restore saved calculation"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteSaved(item.id)}
                    className="text-slate-400 hover:text-red-600 p-1.5 transition-colors cursor-pointer rounded hover:bg-slate-200 dark:hover:bg-slate-700"
                    title="Delete calculation"
                    aria-label="Delete saved calculation"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
