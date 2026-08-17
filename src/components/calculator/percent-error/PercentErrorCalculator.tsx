"use client";

import React, { useState, useEffect } from "react";

export interface SavedErrorItem {
  id: string;
  title: string;
  expression: string;
  result: string;
  timestamp: string;
}

export function PercentErrorCalculator() {
  const [observed, setObserved] = useState<string>("10");
  const [trueValue, setTrueValue] = useState<string>("11");
  const [savedItems, setSavedItems] = useState<SavedErrorItem[]>([]);
  const [justSaved, setJustSaved] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_percent_error_calculations");
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const handleSaveResult = (e: React.MouseEvent, resultStr: string) => {
    e.preventDefault();
    e.stopPropagation();

    const expr = `Observed: ${observed}, True: ${trueValue}`;
    const newItem: SavedErrorItem = {
      id: Date.now().toString(),
      title: "Percent Error",
      expression: expr,
      result: resultStr,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedItems.filter(item => item.expression !== expr)].slice(0, 15);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_percent_error_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_percent_error_calculations", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSaved = () => {
    setSavedItems([]);
    try {
      localStorage.removeItem("saved_percent_error_calculations");
    } catch (e) {}
  };

  // Calculation Logic
  const calcResult = React.useMemo(() => {
    const obs = parseFloat(observed);
    const tru = parseFloat(trueValue);

    if (isNaN(obs) || isNaN(tru) || tru === 0) return null;

    const diff = obs - tru;
    const signedPercent = (diff / tru) * 100;
    const absPercent = Math.abs(signedPercent);

    const signedPercentFormatted = parseFloat(signedPercent.toFixed(12)).toString();
    const absPercentFormatted = parseFloat(absPercent.toFixed(12)).toString();

    // Step lines matching competitor format
    const step1Str = `Percent Error = (V_observed - V_true) / V_true`;
    const step2Str = `= (${obs} - ${tru}) / ${tru}`;
    const step3Str = `= ${diff} / ${tru}`;
    const step4Str = `= ${signedPercentFormatted}%`;
    const step5Str = `= ${absPercentFormatted}% error`;

    return {
      obs,
      tru,
      diff,
      signedPercent,
      absPercent,
      signedPercentFormatted,
      absPercentFormatted,
      resultHeaderStr: `Percent error = ${signedPercentFormatted}%`,
      step1Str,
      step2Str,
      step3Str,
      step4Str,
      step5Str,
    };
  }, [observed, trueValue]);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
  };

  const handleClear = () => {
    setObserved("");
    setTrueValue("");
  };

  return (
    <div className="space-y-8 font-sans text-slate-800 dark:text-slate-200">

      {/* PERCENT ERROR CALCULATOR MODULE */}
      <section id="percent-error-calculator" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Percent Error Calculator
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Use this calculator to find the percentage error between an observed value and a true/accepted value.
        </p>

        {/* Results Banner & Steps Layout */}
        {calcResult && (
          <div className="space-y-3 max-w-xl">
            <div className="border border-blue-600 rounded overflow-hidden">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 flex items-center justify-between">
                <span>Result</span>
                <button
                  type="button"
                  onClick={(e) => handleSaveResult(e, calcResult.resultHeaderStr)}
                  className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {justSaved ? "Saved!" : "Save"}
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 text-xs font-sans space-y-3">
                <div className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 font-sans tabular-nums">
                  <span>Percent error =</span>
                  <strong className="text-blue-600 dark:text-blue-400 font-extrabold text-xl">{calcResult.signedPercentFormatted}%</strong>
                </div>

                {/* Calculation Steps Section */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">Steps:</div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded border border-slate-200 dark:border-slate-700 font-sans tabular-nums text-xs leading-relaxed space-y-1.5 overflow-x-auto">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      Percent Error = <span className="inline-flex items-center align-middle mx-1"><sup>V<sub>observed</sub> - V<sub>true</sub></sup>&frasl;<sub>V<sub>true</sub></sub></span>
                    </p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      = <span className="inline-flex items-center align-middle mx-1"><sup>{calcResult.obs} - {calcResult.tru}</sup>&frasl;<sub>{calcResult.tru}</sub></span>
                    </p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      = <span className="inline-flex items-center align-middle mx-1"><sup>{calcResult.diff}</sup>&frasl;<sub>{calcResult.tru}</sub></span>
                    </p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">= {calcResult.signedPercentFormatted}%</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">= {calcResult.absPercentFormatted}% error</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleCalculate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-md">
          <div className="flex items-center justify-between gap-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Observed Value</label>
            <input
              type="text"
              value={observed}
              onChange={(e) => setObserved(e.target.value)}
              placeholder="10"
              aria-label="Observed Value"
              className="w-48 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">True Value</label>
            <input
              type="text"
              value={trueValue}
              onChange={(e) => setTrueValue(e.target.value)}
              placeholder="11"
              aria-label="True Value"
              className="w-48 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
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
              onClick={handleClear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>
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
