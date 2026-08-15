"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Copy, Check, Calculator, Bookmark, Trash2, History, Printer, RefreshCw, Download } from "lucide-react";
import {
  generateRandomNumbers,
  generateGaussianNumbers,
  RandomGenerationOutput,
} from "@/lib/calculator-engine/formulas/random";
import { RandomVisualizer } from "./RandomVisualizer";

export interface SavedRandomItem {
  id: string;
  title: string;
  expression: string;
  result: string;
  timestamp: string;
}

export function RandomCalculator() {
  const [activeTab, setActiveTab] = useState<string>("simple");

  // Inputs for Simple & Comprehensive
  const [minVal, setMinVal] = useState<string>("1");
  const [maxVal, setMaxVal] = useState<string>("100");
  const [genCount, setGenCount] = useState<string>("1");
  const [numType, setNumType] = useState<"integer" | "decimal">("integer");
  const [precision, setPrecision] = useState<string>("2");
  const [uniqueOnly, setUniqueOnly] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [useCrypto, setUseCrypto] = useState<boolean>(false);

  // Inputs for List Picker & Shuffler
  const [listInput, setListInput] = useState<string>("Apple, Banana, Cherry, Date, Elderberry, Fig, Grape");
  const [pickCount, setPickCount] = useState<string>("1");

  // Output format & triggers
  const [outputFormat, setOutputFormat] = useState<"comma" | "space" | "newline" | "json">("comma");
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [savedItems, setSavedItems] = useState<SavedRandomItem[]>([]);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_random_calculations");
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch (e) { }
  }, []);

  // Compute calculation output
  const genOutput = useMemo<RandomGenerationOutput | null>(() => {
    try {
      const count = activeTab === "simple" ? 1 : parseInt(genCount) || 1;
      const min = parseFloat(minVal) || 1;
      const max = parseFloat(maxVal) || 100;
      const prec = parseInt(precision) || 2;

      return generateRandomNumbers(
        min,
        max,
        count,
        activeTab === "simple" ? "integer" : numType,
        prec,
        uniqueOnly,
        sortOrder,
        useCrypto
      );
    } catch (e: any) {
      return null;
    }
  }, [activeTab, minVal, maxVal, genCount, numType, precision, uniqueOnly, sortOrder, useCrypto, refreshTrigger]);

  // Formatted string representation
  const formattedResults = useMemo(() => {
    if (!genOutput) return "";
    const nums = genOutput.numbers;
    if (outputFormat === "comma") return nums.join(", ");
    if (outputFormat === "space") return nums.join(" ");
    if (outputFormat === "newline") return nums.join("\n");
    if (outputFormat === "json") return JSON.stringify(nums, null, 2);
    return nums.join(", ");
  }, [genOutput, outputFormat]);

  const handleCopy = () => {
    if (!formattedResults) return;
    navigator.clipboard.writeText(formattedResults);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!formattedResults) return;
    const blob = new Blob([formattedResults], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `random-numbers-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    if (!genOutput) return;
    const newItem: SavedRandomItem = {
      id: Date.now().toString(),
      title: activeTab.toUpperCase(),
      expression: `Range [${minVal}, ${maxVal}] (N=${genOutput.count})`,
      result: genOutput.numbers.slice(0, 5).join(", ") + (genOutput.numbers.length > 5 ? "..." : ""),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedItems.filter((i) => i.expression !== newItem.expression)].slice(0, 20);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_random_calculations", JSON.stringify(updated));
    } catch (e) { }

    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter((i) => i.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_random_calculations", JSON.stringify(updated));
    } catch (e) { }
  };

  return (
    <div className="space-y-6">
      {/* MODE TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 scrollbar-none text-xs">
        {[
          { id: "simple", label: "Quick Integer Generator" },
          { id: "comprehensive", label: "Comprehensive Generator" },
          { id: "crypto", label: "Cryptographic PRNG (WebCrypto)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if (tab.id === "crypto") setUseCrypto(true);
              else setUseCrypto(false);
            }}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${activeTab === tab.id
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: CONTROLS & INPUTS (Col 7) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2"><span>Random Generator Settings</span>
              </h3>
              <button
                onClick={() => setRefreshTrigger((prev) => prev + 1)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-Generate
              </button>
            </div>

            {/* MIN & MAX RANGE INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Lower Limit (Min)</label>
                <input
                  type="number"
                  value={minVal}
                  onChange={(e) => setMinVal(e.target.value)}
                  className="w-full px-3 py-2 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Upper Limit (Max)</label>
                <input
                  type="number"
                  value={maxVal}
                  onChange={(e) => setMaxVal(e.target.value)}
                  className="w-full px-3 py-2 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            {/* COMPREHENSIVE SETTINGS */}
            {activeTab !== "simple" && (
              <div className="space-y-4 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Quantity (N)</label>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={genCount}
                      onChange={(e) => setGenCount(e.target.value)}
                      className="w-full px-3 py-2 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Number Type</label>
                    <select
                      value={numType}
                      onChange={(e: any) => setNumType(e.target.value)}
                      className="w-full px-3 py-2 font-sans tabular-nums font-bold text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl outline-none cursor-pointer"
                    >
                      <option value="integer">Integer</option>
                      <option value="decimal">Decimal</option>
                    </select>
                  </div>
                  {numType === "decimal" && (
                    <div>
                      <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Precision (Digits)</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={precision}
                        onChange={(e) => setPrecision(e.target.value)}
                        className="w-full px-3 py-2 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl outline-none"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={uniqueOnly}
                      onChange={(e) => setUniqueOnly(e.target.checked)}
                      className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>Unique Values Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={useCrypto}
                      onChange={(e) => setUseCrypto(e.target.checked)}
                      className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>Hardware Cryptographic (WebCrypto)</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* LIVE HISTOGRAM VISUALIZER */}
          {genOutput && (
            <RandomVisualizer
              numbers={genOutput.numbers}
              histogramBins={genOutput.histogramBins}
              mean={genOutput.mean}
              stdDev={genOutput.stdDev}
              min={genOutput.min}
              max={genOutput.max}
            />
          )}
        </div>

        {/* RIGHT COLUMN: RESULTS & STEP ENGINE (Col 5) */}
        <div className="lg:col-span-5 space-y-4 sticky top-4">
          <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span>🎯</span> Generated Output
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-semibold px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded transition-colors no-print"
                  title="Save results"
                >
                  {justSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5 text-blue-400" />}
                  {justSaved ? "Saved!" : "Save"}
                </button>
                <button
                  onClick={handleCopy}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-semibold no-print"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {genOutput ? (
              <div className="space-y-3">
                {/* Format Selector */}
                <div className="flex items-center justify-between text-[11px] font-sans tabular-nums text-slate-400">
                  <span>Format:</span>
                  <div className="flex gap-1">
                    {(["comma", "space", "newline", "json"] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setOutputFormat(fmt)}
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold cursor-pointer ${outputFormat === fmt ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"
                          }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Large Output Display Box */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-sans tabular-nums text-lg font-bold text-emerald-300 max-h-48 overflow-y-auto break-all">
                  {formattedResults}
                </div>

                {/* Secondary Statistical Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs font-sans tabular-nums">
                  <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-sans">Sample Mean (μ)</div>
                    <div className="font-bold text-slate-100">{genOutput.mean}</div>
                  </div>
                  <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-sans">Std Deviation (σ)</div>
                    <div className="font-bold text-slate-100">{genOutput.stdDev}</div>
                  </div>
                  <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-sans">Range [Min, Max]</div>
                    <div className="font-bold text-slate-100">[{genOutput.min}, {genOutput.max}]</div>
                  </div>
                  <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-sans">Sample Count (N)</div>
                    <div className="font-bold text-slate-100">{genOutput.count}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                Click Re-Generate to generate random numbers.
              </div>
            )}
          </div>

          {/* SAVED CALCULATIONS HISTORY */}
          {savedItems.length > 0 && (
            <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5"><span>Saved Calculations ({savedItems.length})</span>
                </h4>
                <button
                  onClick={() => {
                    setSavedItems([]);
                    localStorage.removeItem("saved_random_calculations");
                  }}
                  className="text-[10px] text-zinc-400 hover:text-red-500 font-medium cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2 text-xs font-sans tabular-nums"
                  >
                    <div className="truncate">
                      <div className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400">{item.title}</div>
                      <div className="text-zinc-700 dark:text-zinc-300 font-bold">{item.expression} ➔ <span className="text-emerald-600 dark:text-emerald-400">{item.result}</span></div>
                    </div>
                    <button
                      onClick={() => handleDeleteSaved(item.id)}
                      className="p-1 text-zinc-400 hover:text-red-500 rounded transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP-BY-STEP SOLUTION BREAKDOWN */}
          {genOutput && genOutput.steps && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <span>📘</span> Step-by-Step Generation Proof
              </h4>

              <div className="space-y-3">
                {genOutput.steps.steps.map((st) => (
                  <div key={st.stepNumber} className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      <span>Step {st.stepNumber}: {st.title}</span>
                    </div>
                    <div className="font-sans tabular-nums text-xs text-blue-600 dark:text-blue-400 font-bold py-1">
                      {st.latex}
                    </div>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                      {st.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
