"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Copy, Check, Calculator, ArrowRight, RefreshCw, Bookmark, Trash2, History, Printer } from "lucide-react";
import { calculateFractionOperation, gcdBigInt, lcmBigInt, simplifyFrac, toMixed, decimalToFrac, recurringDecimalToFrac, approximateFraction } from "@/lib/calculator-engine/formulas/fraction";
import { FractionVisualizer } from "./FractionVisualizer";

export interface SavedCalculationItem {
  id: string;
  title: string;
  expression: string;
  result: string;
  decimal: string;
  timestamp: string;
}

export function FractionCalculator() {
  const [activeTab, setActiveTab] = useState<string>("fraction-ops");

  // State for Fraction Operations & BigInt
  const [num1, setNum1] = useState<string>("3");
  const [den1, setDen1] = useState<string>("4");
  const [op, setOp] = useState<"+" | "-" | "*" | "/">("+");
  const [num2, setNum2] = useState<string>("1");
  const [den2, setDen2] = useState<string>("6");

  // State for Mixed Number Ops
  const [w1, setW1] = useState<string>("1");
  const [w2, setW2] = useState<string>("2");

  // State for Decimal / Recurring
  const [decVal, setDecVal] = useState<string>("1.375");
  const [nonRepeatStr, setNonRepeatStr] = useState<string>("16");
  const [repeatStr, setRepeatStr] = useState<string>("6");

  // State for Comparison & Ordering
  const [num3, setNum3] = useState<string>("5");
  const [den3, setDen3] = useState<string>("8");
  const [orderingInput, setOrderingInput] = useState<string>("3/4, 1/2, 5/8, 2/3");

  const [copied, setCopied] = useState(false);
  const [savedItems, setSavedItems] = useState<SavedCalculationItem[]>([]);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_fraction_calculations");
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Compute calculation output
  const calculationResult = useMemo(() => {
    try {
      if (activeTab === "fraction-ops" || activeTab === "big-int") {
        const n1 = BigInt(num1 || "0");
        const d1 = BigInt(den1 || "1");
        const n2 = BigInt(num2 || "0");
        const d2 = BigInt(den2 || "1");
        return calculateFractionOperation(op, n1, d1, n2, d2);
      }

      if (activeTab === "mixed-ops") {
        const w1Val = BigInt(w1 || "0");
        const n1Val = BigInt(num1 || "0");
        const d1Val = BigInt(den1 || "1");

        const w2Val = BigInt(w2 || "0");
        const n2Val = BigInt(num2 || "0");
        const d2Val = BigInt(den2 || "1");

        const sign1 = w1Val < BigInt(0) ? BigInt(-1) : BigInt(1);
        const absW1 = w1Val < BigInt(0) ? -w1Val : w1Val;
        const impN1 = sign1 * (absW1 * d1Val + n1Val);

        const sign2 = w2Val < BigInt(0) ? BigInt(-1) : BigInt(1);
        const absW2 = w2Val < BigInt(0) ? -w2Val : w2Val;
        const impN2 = sign2 * (absW2 * d2Val + n2Val);

        return calculateFractionOperation(op, impN1, d1Val, impN2, d2Val);
      }

      if (activeTab === "simplify") {
        const n = BigInt(num1 || "0");
        const d = BigInt(den1 || "1");
        return calculateFractionOperation("+", n, d, BigInt(0), BigInt(1));
      }

      if (activeTab === "dec-to-frac") {
        const f = decimalToFrac(decVal || "0");
        return calculateFractionOperation("+", f.n, f.d, BigInt(0), BigInt(1));
      }

      if (activeTab === "recurring-dec") {
        const f = recurringDecimalToFrac(nonRepeatStr, repeatStr);
        return calculateFractionOperation("+", f.n, f.d, BigInt(0), BigInt(1));
      }

      if (activeTab === "approximation") {
        const val = parseFloat(decVal) || 0;
        const f = approximateFraction(val, 1000);
        return calculateFractionOperation("+", f.n, f.d, BigInt(0), BigInt(1));
      }

      // Default fallback
      const n1 = BigInt(num1 || "0");
      const d1 = BigInt(den1 || "1");
      const n2 = BigInt(num2 || "0");
      const d2 = BigInt(den2 || "1");
      return calculateFractionOperation(op, n1, d1, n2, d2);
    } catch (e: any) {
      return null;
    }
  }, [activeTab, num1, den1, op, num2, den2, w1, w2, decVal, nonRepeatStr, repeatStr]);

  const handleSave = () => {
    if (!calculationResult) return;
    const newItem: SavedCalculationItem = {
      id: Date.now().toString(),
      title: activeTab.toUpperCase().replace("-", " "),
      expression: activeTab === "fraction-ops" || activeTab === "big-int"
        ? `${num1}/${den1} ${op} ${num2}/${den2}`
        : activeTab === "mixed-ops"
          ? `${w1} ${num1}/${den1} ${op} ${w2} ${num2}/${den2}`
          : activeTab === "dec-to-frac" ? decVal : `${num1}/${den1}`,
      result: calculationResult.simplifiedFraction,
      decimal: calculationResult.decimal,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [newItem, ...savedItems.filter(i => i.expression !== newItem.expression)].slice(0, 20);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_fraction_calculations", JSON.stringify(updated));
    } catch (e) { }

    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(i => i.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_fraction_calculations", JSON.stringify(updated));
    } catch (e) { }
  };

  const handleCopy = () => {
    if (!calculationResult) return;
    const text = `Result: ${calculationResult.simplifiedFraction} (${calculationResult.mixedNumber}) | Decimal: ${calculationResult.decimal}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Primary fraction for live visualizer
  const visualNum = Number(num1 || "3");
  const visualDen = Number(den1 || "4");

  return (
    <div className="space-y-6">
      {/* 20 CALCULATOR MODE TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 scrollbar-none text-xs">
        {[
          { id: "fraction-ops", label: "Fraction Ops (+,-,×,÷)" },
          { id: "mixed-ops", label: "Mixed Numbers" },
          { id: "simplify", label: "Simplify Fraction" },
          { id: "dec-to-frac", label: "Decimal ➔ Fraction" },
          { id: "frac-to-dec", label: "Fraction ➔ Decimal" },
          { id: "big-int", label: "Big Integer Fraction" },
          { id: "recurring-dec", label: "Recurring Decimal" },
          { id: "comparison", label: "Fraction Compare" },
          { id: "ordering", label: "Sort Fractions" },
          { id: "approximation", label: "Approximation" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2"><span>Fraction Input Controls</span>
              </h3>
              <span className="text-[10px] font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                REAL-TIME SOLVER
              </span>
            </div>

            {/* INPUT CONTROLS BASED ON ACTIVE TAB */}
            {activeTab === "fraction-ops" || activeTab === "big-int" ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
                {/* Fraction 1 */}
                <div className="flex flex-col items-center gap-1">
                  <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    placeholder="Num 1"
                    className="w-24 text-center py-1.5 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <div className="w-24 h-0.5 bg-zinc-900 dark:bg-zinc-100 my-0.5" />
                  <input
                    type="number"
                    value={den1}
                    onChange={(e) => setDen1(e.target.value)}
                    placeholder="Den 1"
                    className="w-24 text-center py-1.5 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>

                {/* Operator Selector */}
                <select
                  value={op}
                  onChange={(e: any) => setOp(e.target.value)}
                  className="px-3 py-2 font-sans tabular-nums font-black text-base bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-800 rounded-xl cursor-pointer"
                >
                  <option value="+">+</option>
                  <option value="-">−</option>
                  <option value="*">×</option>
                  <option value="/">÷</option>
                </select>

                {/* Fraction 2 */}
                <div className="flex flex-col items-center gap-1">
                  <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    placeholder="Num 2"
                    className="w-24 text-center py-1.5 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <div className="w-24 h-0.5 bg-zinc-900 dark:bg-zinc-100 my-0.5" />
                  <input
                    type="number"
                    value={den2}
                    onChange={(e) => setDen2(e.target.value)}
                    placeholder="Den 2"
                    className="w-24 text-center py-1.5 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>
            ) : activeTab === "mixed-ops" ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
                {/* Mixed 1 */}
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={w1}
                    onChange={(e) => setW1(e.target.value)}
                    placeholder="Whole 1"
                    className="w-16 text-center py-3 font-sans tabular-nums font-bold text-base bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <div className="flex flex-col items-center gap-1">
                    <input
                      type="number"
                      value={num1}
                      onChange={(e) => setNum1(e.target.value)}
                      className="w-16 text-center py-1 font-sans tabular-nums font-bold text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg"
                    />
                    <div className="w-16 h-0.5 bg-zinc-900 dark:bg-zinc-100" />
                    <input
                      type="number"
                      value={den1}
                      onChange={(e) => setDen1(e.target.value)}
                      className="w-16 text-center py-1 font-sans tabular-nums font-bold text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg"
                    />
                  </div>
                </div>

                <select
                  value={op}
                  onChange={(e: any) => setOp(e.target.value)}
                  className="px-3 py-2 font-sans tabular-nums font-black text-base bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-800 rounded-xl cursor-pointer"
                >
                  <option value="+">+</option>
                  <option value="-">−</option>
                  <option value="*">×</option>
                  <option value="/">÷</option>
                </select>

                {/* Mixed 2 */}
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={w2}
                    onChange={(e) => setW2(e.target.value)}
                    placeholder="Whole 2"
                    className="w-16 text-center py-3 font-sans tabular-nums font-bold text-base bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <div className="flex flex-col items-center gap-1">
                    <input
                      type="number"
                      value={num2}
                      onChange={(e) => setNum2(e.target.value)}
                      className="w-16 text-center py-1 font-sans tabular-nums font-bold text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg"
                    />
                    <div className="w-16 h-0.5 bg-zinc-900 dark:bg-zinc-100" />
                    <input
                      type="number"
                      value={den2}
                      onChange={(e) => setDen2(e.target.value)}
                      className="w-16 text-center py-1 font-sans tabular-nums font-bold text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ) : activeTab === "dec-to-frac" || activeTab === "approximation" ? (
              <div className="space-y-2 py-2">
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Decimal Value</label>
                <input
                  type="text"
                  value={decVal}
                  onChange={(e) => setDecVal(e.target.value)}
                  placeholder="e.g. 1.375 or 0.142857"
                  className="w-full px-4 py-2.5 font-sans tabular-nums font-bold text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 py-2">
                <input
                  type="number"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  placeholder="Numerator"
                  className="w-32 text-center py-2 font-sans tabular-nums font-bold text-base bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <div className="w-32 h-0.5 bg-zinc-900 dark:bg-zinc-100 my-1" />
                <input
                  type="number"
                  value={den1}
                  onChange={(e) => setDen1(e.target.value)}
                  placeholder="Denominator"
                  className="w-32 text-center py-2 font-sans tabular-nums font-bold text-base bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            )}
          </div>

          {/* REAL-TIME INTERACTIVE SVG VISUALIZER */}
          <FractionVisualizer num={visualNum} den={visualDen} />
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
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-semibold px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                  title="Save this calculation"
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

            {calculationResult ? (
              <div className="space-y-3">
                {/* Main Highlighted Simplified Result */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Simplified Form</span>
                  <span className="text-2xl font-sans tabular-nums font-black text-emerald-300">
                    {calculationResult.simplifiedFraction}
                  </span>
                </div>

                {/* Secondary Results Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-sans tabular-nums">
                  <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-sans">Mixed Number</div>
                    <div className="font-bold text-slate-100">{calculationResult.mixedNumber}</div>
                  </div>
                  <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-sans">Decimal Form</div>
                    <div className="font-bold text-slate-100">{calculationResult.decimal}</div>
                  </div>
                  <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-sans">Percentage</div>
                    <div className="font-bold text-slate-100">{calculationResult.percentage}</div>
                  </div>
                  <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] text-slate-400 font-sans">GCD / LCM</div>
                    <div className="font-bold text-slate-100">{calculationResult.gcd} / {calculationResult.lcm}</div>
                  </div>
                </div>

                {/* Equivalent Fractions List */}
                <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider">Equivalent Ratios</span>
                  <div className="text-xs font-sans tabular-nums text-emerald-400 truncate">
                    {calculationResult.equivalentFractions.join(" = ")}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                Enter valid fraction numbers to view detailed results.
              </div>
            )}
          </div>

          {/* SAVED CALCULATIONS HISTORY CARD */}
          {savedItems.length > 0 && (
            <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5"><span>Saved Calculations ({savedItems.length})</span>
                </h4>
                <button
                  onClick={() => {
                    setSavedItems([]);
                    localStorage.removeItem("saved_fraction_calculations");
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

          {/* 5-STEP MATHEMATICAL SOLUTION ENGINE */}
          {calculationResult && calculationResult.steps && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <span>📘</span> Step-by-Step Solution Breakdown
              </h4>

              <div className="space-y-3">
                {calculationResult.steps.steps.map((st) => (
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
