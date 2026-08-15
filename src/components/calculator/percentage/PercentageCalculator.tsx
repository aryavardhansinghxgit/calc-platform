"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Copy, Check, Calculator, Bookmark, Trash2, History, Printer } from "lucide-react";
import {
  solvePercentageOf,
  solveWhatPercentageIs,
  solvePercentageOfWhat,
  solvePercentageDifference,
  solvePercentageChange,
  PercentageCalculationResult,
} from "@/lib/calculator-engine/formulas/percentage";
import { PercentageVisualizer } from "./PercentageVisualizer";

export interface SavedCalcItem {
  id: string;
  title: string;
  expression: string;
  result: string;
  timestamp: string;
}

export function PercentageCalculator() {
  const [activeTab, setActiveTab] = useState<string>("3-way");

  // Mode 1: 3-Way Solver (P% of V1 = V2)
  const [solveTarget, setSolveTarget] = useState<"V2" | "P" | "V1">("V2");
  const [inputP, setInputP] = useState<string>("15");
  const [inputV1, setInputV1] = useState<string>("200");
  const [inputV2, setInputV2] = useState<string>("30");

  // Mode 2: Percentage Difference
  const [diffV1, setDiffV1] = useState<string>("100");
  const [diffV2, setDiffV2] = useState<string>("150");

  // Mode 3: Percentage Change
  const [changeV1, setChangeV1] = useState<string>("80");
  const [changeV2, setChangeV2] = useState<string>("100");

  const [copied, setCopied] = useState(false);
  const [savedItems, setSavedItems] = useState<SavedCalcItem[]>([]);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_percentage_calculations");
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  // Compute active calculation
  const calcResult = useMemo<PercentageCalculationResult | null>(() => {
    try {
      if (activeTab === "3-way" || activeTab === "phrases") {
        const p = parseFloat(inputP) || 0;
        const v1 = parseFloat(inputV1) || 0;
        const v2 = parseFloat(inputV2) || 0;

        if (solveTarget === "V2") {
          return solvePercentageOf(p, v1);
        } else if (solveTarget === "P") {
          return solveWhatPercentageIs(v2, v1);
        } else if (solveTarget === "V1") {
          return solvePercentageOfWhat(v2, p);
        }
      }

      if (activeTab === "difference") {
        const v1 = parseFloat(diffV1) || 0;
        const v2 = parseFloat(diffV2) || 0;
        return solvePercentageDifference(v1, v2);
      }

      if (activeTab === "change") {
        const v1 = parseFloat(changeV1) || 0;
        const v2 = parseFloat(changeV2) || 0;
        return solvePercentageChange(v1, v2);
      }

      return solvePercentageOf(parseFloat(inputP) || 15, parseFloat(inputV1) || 200);
    } catch (e) {
      return null;
    }
  }, [activeTab, solveTarget, inputP, inputV1, inputV2, diffV1, diffV2, changeV1, changeV2]);

  const handleCopy = () => {
    if (!calcResult) return;
    const text = `Result: ${calcResult.primaryResult} (${calcResult.primaryLabel})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!calcResult) return;
    const newItem: SavedCalcItem = {
      id: Date.now().toString(),
      title: activeTab.toUpperCase(),
      expression: calcResult.primaryLabel,
      result: calcResult.primaryResult,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedItems.filter((i) => i.expression !== newItem.expression)].slice(0, 20);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_percentage_calculations", JSON.stringify(updated));
    } catch (e) {}

    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter((i) => i.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_percentage_calculations", JSON.stringify(updated));
    } catch (e) {}
  };

  // Values for live visualizer
  const visualPart = activeTab === "difference" ? parseFloat(diffV1) : activeTab === "change" ? parseFloat(changeV1) : parseFloat(inputV2) || 30;
  const visualTotal = activeTab === "difference" ? parseFloat(diffV2) : activeTab === "change" ? parseFloat(changeV2) : parseFloat(inputV1) || 200;

  return (
    <div className="space-y-6">
      {/* 5 MODE TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 scrollbar-none text-xs">
        {[
          { id: "3-way", label: "3-Way Percentage Solver" },
          { id: "phrases", label: "Common Phrases" },
          { id: "difference", label: "Percentage Difference" },
          { id: "change", label: "Percentage Change (±%)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: INPUT CONTROLS (Col 7) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2"><span>Percentage Input Controls</span>
              </h3>
              <span className="text-[10px] font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                REAL-TIME SOLVER
              </span>
            </div>

            {/* 3-WAY SOLVER INPUTS */}
            {activeTab === "3-way" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 pb-1">
                  <span>Solve For:</span>
                  {(["V2", "P", "V1"] as const).map((tgt) => (
                    <button
                      key={tgt}
                      onClick={() => setSolveTarget(tgt)}
                      className={`px-2.5 py-1 rounded-md text-xs font-sans tabular-nums font-bold cursor-pointer transition-all ${
                        solveTarget === tgt
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {tgt === "V2" ? "Result (V2)" : tgt === "P" ? "Percent (P%)" : "Total (V1)"}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 mb-1 block">Percentage (P%)</label>
                    <input
                      type="number"
                      value={inputP}
                      disabled={solveTarget === "P"}
                      onChange={(e) => setInputP(e.target.value)}
                      className="w-full px-3 py-2 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 mb-1 block">Base Total (V1)</label>
                    <input
                      type="number"
                      value={inputV1}
                      disabled={solveTarget === "V1"}
                      onChange={(e) => setInputV1(e.target.value)}
                      className="w-full px-3 py-2 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 mb-1 block">Part Value (V2)</label>
                    <input
                      type="number"
                      value={inputV2}
                      disabled={solveTarget === "V2"}
                      onChange={(e) => setInputV2(e.target.value)}
                      className="w-full px-3 py-2 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* COMMON PHRASES INPUTS */}
            {activeTab === "phrases" && (
              <div className="space-y-4">
                {/* Phrase 1 */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-2 text-xs font-bold">
                  <span>What is</span>
                  <input
                    type="number"
                    value={inputP}
                    onChange={(e) => {
                      setInputP(e.target.value);
                      setSolveTarget("V2");
                    }}
                    className="w-20 px-2 py-1 bg-white dark:bg-zinc-900 border rounded font-sans tabular-nums text-center"
                  />
                  <span>% of</span>
                  <input
                    type="number"
                    value={inputV1}
                    onChange={(e) => {
                      setInputV1(e.target.value);
                      setSolveTarget("V2");
                    }}
                    className="w-24 px-2 py-1 bg-white dark:bg-zinc-900 border rounded font-sans tabular-nums text-center"
                  />
                  <span>?</span>
                </div>

                {/* Phrase 2 */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-2 text-xs font-bold">
                  <input
                    type="number"
                    value={inputV2}
                    onChange={(e) => {
                      setInputV2(e.target.value);
                      setSolveTarget("P");
                    }}
                    className="w-20 px-2 py-1 bg-white dark:bg-zinc-900 border rounded font-sans tabular-nums text-center"
                  />
                  <span>is what % of</span>
                  <input
                    type="number"
                    value={inputV1}
                    onChange={(e) => {
                      setInputV1(e.target.value);
                      setSolveTarget("P");
                    }}
                    className="w-24 px-2 py-1 bg-white dark:bg-zinc-900 border rounded font-sans tabular-nums text-center"
                  />
                  <span>?</span>
                </div>
              </div>
            )}

            {/* PERCENTAGE DIFFERENCE INPUTS */}
            {activeTab === "difference" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Value 1 (V1)</label>
                  <input
                    type="number"
                    value={diffV1}
                    onChange={(e) => setDiffV1(e.target.value)}
                    className="w-full px-3 py-2 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Value 2 (V2)</label>
                  <input
                    type="number"
                    value={diffV2}
                    onChange={(e) => setDiffV2(e.target.value)}
                    className="w-full px-3 py-2 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>
            )}

            {/* PERCENTAGE CHANGE INPUTS */}
            {activeTab === "change" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Initial Starting Value (V1)</label>
                  <input
                    type="number"
                    value={changeV1}
                    onChange={(e) => setChangeV1(e.target.value)}
                    className="w-full px-3 py-2 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1 block">Final Target Value (V2)</label>
                  <input
                    type="number"
                    value={changeV2}
                    onChange={(e) => setChangeV2(e.target.value)}
                    className="w-full px-3 py-2 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* LIVE INTERACTIVE VISUALIZER */}
          <PercentageVisualizer part={visualPart} total={visualTotal} mode={activeTab as any} v1={parseFloat(changeV1 || diffV1)} v2={parseFloat(changeV2 || diffV2)} />
        </div>

        {/* RIGHT COLUMN: STICKY RESULTS & STEP ENGINE (Col 5) */}
        <div className="lg:col-span-5 space-y-4 sticky top-4">
          <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span>🎯</span> Calculation Output
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-semibold px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded transition-colors no-print"
                  title="Save calculation"
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

            {calcResult ? (
              <div className="space-y-3">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">{calcResult.primaryLabel}</span>
                  <span className="text-2xl font-sans tabular-nums font-black text-emerald-300">
                    {calcResult.primaryResult}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-sans tabular-nums">
                  <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-sans">Fraction Form</div>
                    <div className="font-bold text-slate-100">{calcResult.fractionForm}</div>
                  </div>
                  <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-sans">Decimal Form</div>
                    <div className="font-bold text-slate-100">{calcResult.decimalForm}</div>
                  </div>
                  <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-sans">Ratio Form</div>
                    <div className="font-bold text-slate-100">{calcResult.ratioForm}</div>
                  </div>
                  <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-sans">Formula Used</div>
                    <div className="font-bold text-slate-100 truncate">{calcResult.formattedOutput}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                Enter valid percentage numbers to view detailed results.
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
                    localStorage.removeItem("saved_percentage_calculations");
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
                      <div className="text-zinc-700 dark:text-zinc-300 font-bold">{item.expression} = <span className="text-emerald-600 dark:text-emerald-400">{item.result}</span></div>
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
          {calcResult && calcResult.steps && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <span>📘</span> Step-by-Step Solution Breakdown
              </h4>

              <div className="space-y-3">
                {calcResult.steps.steps.map((st) => (
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
