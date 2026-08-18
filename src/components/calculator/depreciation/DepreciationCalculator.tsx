"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Check,
  Download,
} from "lucide-react";
import {
  calculateDepreciation,
  compareAllDepreciationMethods,
  calculateMacrsDepreciation,
  DepreciationMethod,
  MacrsClass,
} from "@/lib/calculator-engine/formulas/depreciation";

export interface SavedDepreciationItem {
  id: string;
  title: string;
  inputs: string;
  result: string;
  resultsList: string[];
  timestamp: string;
}

export function DepreciationCalculator() {
  // Simple Currency Selector with Dollar ($) as default
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  const triggerCsvDownload = (filename: string, csvContent: string) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==========================================
  // BOX 1: ASSET DEPRECIATION CALCULATOR
  // ==========================================
  const [costInput, setCostInput] = useState<string>("11000");
  const [salvageInput, setSalvageInput] = useState<string>("1000");
  const [lifeInput, setLifeInput] = useState<string>("5");
  const [methodInput, setMethodInput] = useState<DepreciationMethod>("straight-line");
  const [startMonthInput, setStartMonthInput] = useState<string>("1");

  // Table search and pagination
  const [tableSearch, setTableSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 6;

  // Saved state for Box 1
  const [savedCoreItems, setSavedCoreItems] = useState<SavedDepreciationItem[]>([]);
  const [justSavedCore, setJustSavedCore] = useState<boolean>(false);

  // ==========================================
  // BOX 2: MULTI-METHOD COMPARISON MATRIX
  // ==========================================
  const [compCostInput, setCompCostInput] = useState<string>("25000");
  const [compSalvageInput, setCompSalvageInput] = useState<string>("2500");
  const [compLifeInput, setCompLifeInput] = useState<string>("5");
  const [savedCompItems, setSavedCompItems] = useState<SavedDepreciationItem[]>([]);
  const [justSavedComp, setJustSavedComp] = useState<boolean>(false);

  // ==========================================
  // BOX 3: MACRS TAX DEPRECIATION SOLVER
  // ==========================================
  const [macrsCostInput, setMacrsCostInput] = useState<string>("50000");
  const [macrsClassInput, setMacrsClassInput] = useState<MacrsClass>(5);
  const [savedMacrsItems, setSavedMacrsItems] = useState<SavedDepreciationItem[]>([]);
  const [justSavedMacrs, setJustSavedMacrs] = useState<boolean>(false);

  // ==========================================
  // BOX 4: UNITS OF PRODUCTION DEPRECIATION
  // ==========================================
  const [unitsCostInput, setUnitsCostInput] = useState<string>("60000");
  const [unitsSalvageInput, setUnitsSalvageInput] = useState<string>("5000");
  const [unitsTotalEstInput, setUnitsTotalEstInput] = useState<string>("100000");
  const [unitsCurrentYrInput, setUnitsCurrentYrInput] = useState<string>("18000");
  const [savedUnitsItems, setSavedUnitsItems] = useState<SavedDepreciationItem[]>([]);
  const [justSavedUnits, setJustSavedUnits] = useState<boolean>(false);

  // ==========================================
  // BOX 5: PARTIAL-YEAR & IN-SERVICE DATE SOLVER
  // ==========================================
  const [partialCostInput, setPartialCostInput] = useState<string>("15000");
  const [partialSalvageInput, setPartialSalvageInput] = useState<string>("1500");
  const [partialLifeInput, setPartialLifeInput] = useState<string>("5");
  const [partialMonthInput, setPartialMonthInput] = useState<string>("7"); // July
  const [savedPartialItems, setSavedPartialItems] = useState<SavedDepreciationItem[]>([]);
  const [justSavedPartial, setJustSavedPartial] = useState<boolean>(false);

  // ==========================================
  // BOX 6: SALVAGE VALUE & RESIDUAL DECAY PREDICTOR
  // ==========================================
  const [predCostInput, setPredCostInput] = useState<string>("40000");
  const [predRateInput, setPredRateInput] = useState<string>("20.0");
  const [predYearsInput, setPredYearsInput] = useState<string>("5");
  const [savedPredItems, setSavedPredItems] = useState<SavedDepreciationItem[]>([]);
  const [justSavedPred, setJustSavedPred] = useState<boolean>(false);

  // Load saved calculations on mount
  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_depr_core");
      if (s1) setSavedCoreItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_depr_comp");
      if (s2) setSavedCompItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_depr_macrs");
      if (s3) setSavedMacrsItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_depr_units");
      if (s4) setSavedUnitsItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_depr_partial");
      if (s5) setSavedPartialItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_depr_pred");
      if (s6) setSavedPredItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Format currency helper
  const fmt = (num: number) => {
    return `${currencySymbol}${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // ==========================================
  // 1. COMPUTED RESULTS: SINGLE METHOD DEPRECIATION
  // ==========================================
  const coreResult = useMemo(() => {
    return calculateDepreciation({
      assetCost: Number(costInput) || 0,
      salvageValue: Number(salvageInput) || 0,
      usefulLifeYears: Number(lifeInput) || 1,
      method: methodInput,
      partialYearMonthStart: Number(startMonthInput) || 1,
    });
  }, [costInput, salvageInput, lifeInput, methodInput, startMonthInput]);

  // Schedule filtering & pagination
  const filteredSchedule = useMemo(() => {
    if (!coreResult.schedule) return [];
    if (!tableSearch.trim()) return coreResult.schedule;
    return coreResult.schedule.filter(
      (row) =>
        row.year.toString().includes(tableSearch) ||
        row.depreciationExpense.toString().includes(tableSearch) ||
        row.endingBookValue.toString().includes(tableSearch)
    );
  }, [coreResult.schedule, tableSearch]);

  const totalPages = Math.ceil(filteredSchedule.length / rowsPerPage) || 1;
  const currentSchedulePage = filteredSchedule.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ==========================================
  // 2. COMPUTED RESULTS: MULTI-METHOD COMPARISON
  // ==========================================
  const compMatrix = useMemo(() => {
    return compareAllDepreciationMethods(
      Number(compCostInput) || 0,
      Number(compSalvageInput) || 0,
      Number(compLifeInput) || 1
    );
  }, [compCostInput, compSalvageInput, compLifeInput]);

  // ==========================================
  // 3. COMPUTED RESULTS: MACRS TAX DEPRECIATION
  // ==========================================
  const macrsResult = useMemo(() => {
    return calculateMacrsDepreciation(
      Number(macrsCostInput) || 0,
      macrsClassInput
    );
  }, [macrsCostInput, macrsClassInput]);

  // ==========================================
  // 4. COMPUTED RESULTS: UNITS OF PRODUCTION
  // ==========================================
  const unitsResult = useMemo(() => {
    const cost = Number(unitsCostInput) || 0;
    const salvage = Number(unitsSalvageInput) || 0;
    const totalEst = Number(unitsTotalEstInput) || 1;
    const currentUnits = Number(unitsCurrentYrInput) || 0;

    const base = Math.max(0, cost - salvage);
    const unitRate = base / totalEst;
    const currentExp = Math.min(currentUnits * unitRate, base);
    const remainingBase = Math.max(0, base - currentExp);

    return {
      depreciableBase: base,
      ratePerUnit: unitRate,
      currentYearExpense: currentExp,
      remainingBase,
      endingBookValue: Math.max(salvage, cost - currentExp),
    };
  }, [unitsCostInput, unitsSalvageInput, unitsTotalEstInput, unitsCurrentYrInput]);

  // ==========================================
  // 5. COMPUTED RESULTS: PARTIAL YEAR
  // ==========================================
  const partialResult = useMemo(() => {
    return calculateDepreciation({
      assetCost: Number(partialCostInput) || 0,
      salvageValue: Number(partialSalvageInput) || 0,
      usefulLifeYears: Number(partialLifeInput) || 1,
      method: "straight-line",
      partialYearMonthStart: Number(partialMonthInput) || 1,
    });
  }, [partialCostInput, partialSalvageInput, partialLifeInput, partialMonthInput]);

  // ==========================================
  // 6. COMPUTED RESULTS: SALVAGE DECAY PREDICTOR
  // ==========================================
  const predResult = useMemo(() => {
    const cost = Number(predCostInput) || 0;
    const d = (Number(predRateInput) || 0) / 100;
    const t = Number(predYearsInput) || 1;

    const estResidual = cost * Math.pow(1 - d, t);
    const totalLoss = Math.max(0, cost - estResidual);
    const pct = cost > 0 ? (estResidual / cost) * 100 : 0;

    return {
      estimatedResidualValue: estResidual,
      totalLossInValue: totalLoss,
      residualPct: pct,
    };
  }, [predCostInput, predRateInput, predYearsInput]);

  // ==========================================
  // SAVE HANDLERS FOR ALL 6 BOXES
  // ==========================================
  const handleSaveCore = () => {
    const inputStr = `Cost: ${currencySymbol}${costInput} | Salvage: ${currencySymbol}${salvageInput} | Life: ${lifeInput} yrs | Method: ${coreResult.methodName}`;
    const resList = [
      `Year 1 Depreciation: ${fmt(coreResult.year1Depreciation)}`,
      `Total Depreciable Base: ${fmt(coreResult.totalDepreciableCost)}`,
      `Ending Book Value: ${fmt(coreResult.endingBookValue)}`,
    ];

    const newItem: SavedDepreciationItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Asset Depreciation",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedCoreItems].slice(0, 10);
    setSavedCoreItems(updated);
    try {
      localStorage.setItem("saved_depr_core", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedCore(true);
    setTimeout(() => setJustSavedCore(false), 2500);
  };

  const handleSaveComp = () => {
    const inputStr = `Cost: ${currencySymbol}${compCostInput} | Salvage: ${currencySymbol}${compSalvageInput} | Life: ${compLifeInput} yrs`;
    const resList = [
      `Straight-Line Y1: ${fmt(compMatrix.straightLine.year1Depreciation)}`,
      `200% DDB Y1: ${fmt(compMatrix.doubleDeclining.year1Depreciation)}`,
      `150% DB Y1: ${fmt(compMatrix.declining150.year1Depreciation)}`,
      `SYD Y1: ${fmt(compMatrix.sumOfYearsDigits.year1Depreciation)}`,
    ];

    const newItem: SavedDepreciationItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Method Comparison Matrix",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedCompItems].slice(0, 10);
    setSavedCompItems(updated);
    try {
      localStorage.setItem("saved_depr_comp", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedComp(true);
    setTimeout(() => setJustSavedComp(false), 2500);
  };

  const handleSaveMacrs = () => {
    const inputStr = `Cost Basis: ${currencySymbol}${macrsCostInput} | Class: ${macrsClassInput}-Year Property`;
    const resList = [
      `Year 1 Deduction: ${fmt(macrsResult.schedule[0]?.depreciationExpense || 0)}`,
      `Total Deductions: ${fmt(macrsResult.totalDeductions)}`,
      `Final Book Value: ${fmt(macrsResult.schedule[macrsResult.schedule.length - 1]?.endingBookValue || 0)}`,
    ];

    const newItem: SavedDepreciationItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "MACRS Tax Depreciation",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedMacrsItems].slice(0, 10);
    setSavedMacrsItems(updated);
    try {
      localStorage.setItem("saved_depr_macrs", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedMacrs(true);
    setTimeout(() => setJustSavedMacrs(false), 2500);
  };

  const handleSaveUnits = () => {
    const inputStr = `Cost: ${currencySymbol}${unitsCostInput} | Est. Units: ${Number(unitsTotalEstInput).toLocaleString()} | Current Units: ${Number(unitsCurrentYrInput).toLocaleString()}`;
    const resList = [
      `Rate Per Unit: ${fmt(unitsResult.ratePerUnit)}/unit`,
      `Current Year Expense: ${fmt(unitsResult.currentYearExpense)}`,
      `Ending Book Value: ${fmt(unitsResult.endingBookValue)}`,
    ];

    const newItem: SavedDepreciationItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Units of Production",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedUnitsItems].slice(0, 10);
    setSavedUnitsItems(updated);
    try {
      localStorage.setItem("saved_depr_units", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedUnits(true);
    setTimeout(() => setJustSavedUnits(false), 2500);
  };

  const handleSavePartial = () => {
    const inputStr = `Cost: ${currencySymbol}${partialCostInput} | In-Service Month: Month ${partialMonthInput} | Life: ${partialLifeInput} yrs`;
    const resList = [
      `Year 1 Prorated: ${fmt(partialResult.schedule[0]?.depreciationExpense || 0)}`,
      `Full Year Expense: ${fmt(partialResult.schedule[1]?.depreciationExpense || 0)}`,
      `Stub Year Expense: ${fmt(partialResult.schedule[partialResult.schedule.length - 1]?.depreciationExpense || 0)}`,
    ];

    const newItem: SavedDepreciationItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Partial-Year Depreciation",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedPartialItems].slice(0, 10);
    setSavedPartialItems(updated);
    try {
      localStorage.setItem("saved_depr_partial", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedPartial(true);
    setTimeout(() => setJustSavedPartial(false), 2500);
  };

  const handleSavePred = () => {
    const inputStr = `Cost: ${currencySymbol}${predCostInput} | Decay Rate: ${predRateInput}%/yr | Horizon: ${predYearsInput} yrs`;
    const resList = [
      `Projected Salvage: ${fmt(predResult.estimatedResidualValue)} (${predResult.residualPct.toFixed(1)}%)`,
      `Total Loss in Value: ${fmt(predResult.totalLossInValue)}`,
    ];

    const newItem: SavedDepreciationItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Salvage Value Decay Predictor",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedPredItems].slice(0, 10);
    setSavedPredItems(updated);
    try {
      localStorage.setItem("saved_depr_pred", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedPred(true);
    setTimeout(() => setJustSavedPred(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* ========================================================================= */}
      {/* BOX 1: ASSET DEPRECIATION CALCULATOR (UNIVERSAL SUITE) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Asset Depreciation Calculator</span>
          <div className="flex items-center gap-2">
            {/* Simple Currency Selector with Dollar ($) as default */}
            <div className="flex items-center gap-1 bg-blue-700 p-0.5 rounded border border-blue-500 text-[11px] font-bold">
              {["$", "€", "£", "₹"].map((cur) => (
                <button
                  key={cur}
                  type="button"
                  onClick={() => setCurrencySymbol(cur)}
                  className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                    currencySymbol === cur
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-blue-100 hover:text-white"
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSaveCore}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
                justSavedCore
                  ? "bg-emerald-500 text-white font-bold"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              {justSavedCore ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
              <span>{justSavedCore ? "Saved!" : `Save${savedCoreItems.length > 0 ? ` (${savedCoreItems.length})` : ""}`}</span>
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
            {/* LEFT COLUMN: INPUTS */}
            <div className="lg:col-span-5 space-y-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Asset Parameters
              </div>

              {/* Method Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Depreciation Method
                </label>
                <select
                  value={methodInput}
                  onChange={(e: any) => setMethodInput(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="straight-line">Straight-Line (Equal Annual)</option>
                  <option value="double-declining">200% Double Declining Balance (DDB)</option>
                  <option value="150-declining">150% Declining Balance</option>
                  <option value="sum-of-years-digits">Sum-of-the-Years&apos;-Digits (SYD)</option>
                  <option value="units-of-production">Units of Production</option>
                </select>
              </div>

              {/* Cost & Salvage */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Asset Cost ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={costInput}
                    onChange={(e) => setCostInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Salvage Value ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={salvageInput}
                    onChange={(e) => setSalvageInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Useful Life & In-Service Month */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Useful Life (Years)
                  </label>
                  <input
                    type="number"
                    value={lifeInput}
                    onChange={(e) => setLifeInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    In-Service Month
                  </label>
                  <select
                    value={startMonthInput}
                    onChange={(e) => setStartMonthInput(e.target.value)}
                    className="w-full h-9 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  >
                    <option value="1">Month 1 (Full Year)</option>
                    <option value="4">Month 4 (April)</option>
                    <option value="7">Month 7 (Mid-Year / July)</option>
                    <option value="10">Month 10 (October)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: OUTPUTS */}
            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-blue-400 block">
                      Year 1 Depreciation Expense
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                      {fmt(coreResult.year1Depreciation)}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                      Total Depreciable Base
                    </span>
                    <span className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400">
                      {fmt(coreResult.totalDepreciableCost)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Depreciation</span>
                    <span className="font-mono text-sm text-blue-600">{fmt(coreResult.totalAccumulatedDepreciation)}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Ending Book Value</span>
                    <span className="font-mono text-sm text-emerald-600">{fmt(coreResult.endingBookValue)}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Salvage Target</span>
                    <span className="font-mono text-sm text-slate-900 dark:text-slate-100">{fmt(Number(salvageInput) || 0)}</span>
                  </div>
                </div>

                {/* DEPRECIATION VS RESIDUAL PROGRESS */}
                <div className="space-y-1 pt-1">
                  <div className="w-full h-3 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex">
                    <div
                      style={{
                        width: `${
                          Number(costInput) > 0
                            ? (coreResult.totalAccumulatedDepreciation / Number(costInput)) * 100
                            : 80
                        }%`,
                      }}
                      className="bg-blue-600"
                    />
                    <div
                      style={{
                        width: `${
                          Number(costInput) > 0
                            ? (coreResult.endingBookValue / Number(costInput)) * 100
                            : 20
                        }%`,
                      }}
                      className="bg-emerald-500"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">
                    <span>Depreciated: {fmt(coreResult.totalAccumulatedDepreciation)}</span>
                    <span>Salvage / Book Value: {fmt(coreResult.endingBookValue)}</span>
                  </div>
                </div>
              </div>

              {/* AMORTIZATION / DEPRECIATION SCHEDULE */}
              {coreResult.schedule.length > 0 && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                      Annual Depreciation Schedule ({coreResult.methodName})
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const headers = ["Year", "Beginning Book Value", "Depreciation Expense", "Accumulated Depreciation", "Ending Book Value"];
                          const rows = coreResult.schedule.map((r) => [
                            `Year ${r.year}`,
                            r.beginningBookValue.toFixed(2),
                            r.depreciationExpense.toFixed(2),
                            r.accumulatedDepreciation.toFixed(2),
                            r.endingBookValue.toFixed(2),
                          ]);
                          const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
                          triggerCsvDownload(`depreciation_schedule.csv`, csv);
                        }}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 rounded-lg text-[11px] font-bold flex items-center gap-1 border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
                      >
                        <Download className="w-3 h-3" /> Export CSV
                      </button>
                      <input
                        type="text"
                        placeholder="Search year..."
                        value={tableSearch}
                        onChange={(e) => {
                          setTableSearch(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="h-6 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold focus:outline-none w-28"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto max-h-44 overflow-y-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 font-sans font-bold uppercase text-[9px]">
                          <th className="py-1 px-1.5">Year</th>
                          <th className="py-1 px-1.5">Beginning BV</th>
                          <th className="py-1 px-1.5">Depr Expense</th>
                          <th className="py-1 px-1.5">Accum Depr</th>
                          <th className="py-1 px-1.5">Ending BV</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                        {currentSchedulePage.map((row) => (
                          <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="py-1 px-1.5 font-bold font-sans">Year {row.year}</td>
                            <td className="py-1 px-1.5 text-slate-600 dark:text-slate-400">{fmt(row.beginningBookValue)}</td>
                            <td className="py-1 px-1.5 font-bold text-blue-600">{fmt(row.depreciationExpense)}</td>
                            <td className="py-1 px-1.5 text-amber-600">{fmt(row.accumulatedDepreciation)}</td>
                            <td className="py-1 px-1.5 font-bold text-slate-900 dark:text-slate-100">{fmt(row.endingBookValue)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[10px] font-bold">
                      <span className="text-slate-500">Page {currentPage} of {totalPages}</span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={currentPage <= 1}
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 disabled:opacity-40 cursor-pointer"
                        >
                          Prev
                        </button>
                        <button
                          type="button"
                          disabled={currentPage >= totalPages}
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 disabled:opacity-40 cursor-pointer"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* SAVED CALCULATIONS BOX 1 */}
          {savedCoreItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Calculations ({savedCoreItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCoreItems([]);
                    localStorage.removeItem("saved_depr_core");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedCoreItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 flex flex-col justify-between shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-bold text-blue-600 text-[11px]">{item.title}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedCoreItems.filter((i) => i.id !== item.id);
                            setSavedCoreItems(updated);
                            localStorage.setItem("saved_depr_core", JSON.stringify(updated));
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                      <div><strong className="text-slate-500">Inputs:</strong> {item.inputs}</div>
                      <div className="space-y-0.5 font-mono text-[10px]">
                        {item.resultsList?.map((line, idx) => (
                          <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-700">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 2: MULTI-METHOD COMPARISON MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Multi-Method Accounting Comparison Matrix</span>
          <button
            type="button"
            onClick={handleSaveComp}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedComp
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedComp ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedComp ? "Saved!" : `Save${savedCompItems.length > 0 ? ` (${savedCompItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-4 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Asset Parameters
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Asset Cost ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={compCostInput}
                  onChange={(e) => setCompCostInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Salvage ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={compSalvageInput}
                    onChange={(e) => setCompSalvageInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Life (Yrs)
                  </label>
                  <input
                    type="number"
                    value={compLifeInput}
                    onChange={(e) => setCompLifeInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400 border-b pb-1.5">
                  Year 1 to Year N Depreciation Comparison
                </div>

                <div className="overflow-x-auto max-h-48 overflow-y-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b text-[9px] text-slate-500 font-sans uppercase">
                        <th className="py-1 px-1.5">Year</th>
                        <th className="py-1 px-1.5">Straight-Line</th>
                        <th className="py-1 px-1.5">200% DDB</th>
                        <th className="py-1 px-1.5">150% DB</th>
                        <th className="py-1 px-1.5">Sum-of-Years (SYD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                      {Array.from({ length: Number(compLifeInput) || 1 }).map((_, idx) => (
                        <tr key={idx} className="hover:bg-slate-100 dark:hover:bg-slate-800/50">
                          <td className="py-1 px-1.5 font-bold font-sans">Yr {idx + 1}</td>
                          <td className="py-1 px-1.5">{fmt(compMatrix.straightLine.schedule[idx]?.depreciationExpense || 0)}</td>
                          <td className="py-1 px-1.5 font-bold text-blue-600">{fmt(compMatrix.doubleDeclining.schedule[idx]?.depreciationExpense || 0)}</td>
                          <td className="py-1 px-1.5 text-amber-600">{fmt(compMatrix.declining150.schedule[idx]?.depreciationExpense || 0)}</td>
                          <td className="py-1 px-1.5 text-emerald-600 font-bold">{fmt(compMatrix.sumOfYearsDigits.schedule[idx]?.depreciationExpense || 0)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED COMP LIST */}
          {savedCompItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Method Comparisons ({savedCompItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCompItems([]);
                    localStorage.removeItem("saved_depr_comp");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedCompItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 3: MACRS TAX DEPRECIATION SOLVER (IRS TAX SCHEDULES) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>MACRS (IRS Tax Depreciation) Solver</span>
          <button
            type="button"
            onClick={handleSaveMacrs}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedMacrs
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedMacrs ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedMacrs ? "Saved!" : `Save${savedMacrsItems.length > 0 ? ` (${savedMacrsItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                IRS Property Parameters
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Tax Cost Basis ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={macrsCostInput}
                  onChange={(e) => setMacrsCostInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  MACRS Property Class (Half-Year Convention)
                </label>
                <select
                  value={macrsClassInput}
                  onChange={(e: any) => setMacrsClassInput(Number(e.target.value) as MacrsClass)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                >
                  <option value={3}>3-Year (Tractor Units, Special Tools)</option>
                  <option value={5}>5-Year (Computers, Trucks, Autos, Office Equip)</option>
                  <option value={7}>7-Year (Office Furniture, Machinery)</option>
                  <option value={10}>10-Year (Vessels, Tugboats, Grain Silos)</option>
                  <option value={15}>15-Year (Land Improvements, Gas Stations)</option>
                  <option value={20}>20-Year (Farm Buildings, Municipal Sewers)</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 block">
                      Year 1 MACRS Deduction
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-blue-600">
                      {fmt(macrsResult.schedule[0]?.depreciationExpense || 0)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Tax Deductions</span>
                    <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                      {fmt(macrsResult.totalDeductions)} (100%)
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto max-h-36 overflow-y-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b text-[9px] text-slate-500 font-sans uppercase">
                        <th className="py-1 px-1.5">Tax Year</th>
                        <th className="py-1 px-1.5">Tax Deduction</th>
                        <th className="py-1 px-1.5">Accumulated</th>
                        <th className="py-1 px-1.5">Ending Tax Basis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                      {macrsResult.schedule.map((row) => (
                        <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="py-1 px-1.5 font-bold font-sans">Yr {row.year}</td>
                          <td className="py-1 px-1.5 text-blue-600 font-bold">{fmt(row.depreciationExpense)}</td>
                          <td className="py-1 px-1.5 text-amber-600">{fmt(row.accumulatedDepreciation)}</td>
                          <td className="py-1 px-1.5 font-bold">{fmt(row.endingBookValue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED MACRS LIST */}
          {savedMacrsItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved MACRS Schedules ({savedMacrsItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedMacrsItems([]);
                    localStorage.removeItem("saved_depr_macrs");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedMacrsItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 4: UNITS OF PRODUCTION DEPRECIATION SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Units of Production Depreciation Solver</span>
          <button
            type="button"
            onClick={handleSaveUnits}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedUnits
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedUnits ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedUnits ? "Saved!" : `Save${savedUnitsItems.length > 0 ? ` (${savedUnitsItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Production Output Parameters
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Asset Cost ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={unitsCostInput}
                    onChange={(e) => setUnitsCostInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Salvage ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={unitsSalvageInput}
                    onChange={(e) => setUnitsSalvageInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Total Lifetime Units
                  </label>
                  <input
                    type="number"
                    value={unitsTotalEstInput}
                    onChange={(e) => setUnitsTotalEstInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Units Produced This Year
                  </label>
                  <input
                    type="number"
                    value={unitsCurrentYrInput}
                    onChange={(e) => setUnitsCurrentYrInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 block">
                      Current Year Depreciation
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-blue-600">
                      {fmt(unitsResult.currentYearExpense)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Depreciation Per Unit</span>
                    <span className="text-sm font-bold font-mono text-emerald-600">
                      {fmt(unitsResult.ratePerUnit)}/unit
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Remaining Depreciable Base</span>
                    <span>{fmt(unitsResult.remainingBase)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Ending Book Value</span>
                    <span>{fmt(unitsResult.endingBookValue)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED UNITS LIST */}
          {savedUnitsItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Production Calculations ({savedUnitsItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedUnitsItems([]);
                    localStorage.removeItem("saved_depr_units");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedUnitsItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 5: PARTIAL-YEAR & IN-SERVICE DATE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Partial-Year & In-Service Date Depreciation Solver</span>
          <button
            type="button"
            onClick={handleSavePartial}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedPartial
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedPartial ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedPartial ? "Saved!" : `Save${savedPartialItems.length > 0 ? ` (${savedPartialItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Proration Parameters
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Asset Cost ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={partialCostInput}
                    onChange={(e) => setPartialCostInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Salvage ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={partialSalvageInput}
                    onChange={(e) => setPartialSalvageInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Useful Life (Years)
                  </label>
                  <input
                    type="number"
                    value={partialLifeInput}
                    onChange={(e) => setPartialLifeInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Service Month (1-12)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={partialMonthInput}
                    onChange={(e) => setPartialMonthInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 block">
                      Year 1 Prorated Depreciation
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-blue-600">
                      {fmt(partialResult.schedule[0]?.depreciationExpense || 0)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Months in Service Yr 1</span>
                    <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                      {13 - Number(partialMonthInput)} Months
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Full Year Expense (Yr 2-5)</span>
                    <span>{fmt(partialResult.schedule[1]?.depreciationExpense || 0)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Final Stub Period (Yr 6)</span>
                    <span>{fmt(partialResult.schedule[partialResult.schedule.length - 1]?.depreciationExpense || 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED PARTIAL LIST */}
          {savedPartialItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Partial-Year Calculations ({savedPartialItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPartialItems([]);
                    localStorage.removeItem("saved_depr_partial");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedPartialItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 6: SALVAGE VALUE & RESIDUAL DECAY PREDICTOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Asset Salvage Value & Lifetime Decay Predictor</span>
          <button
            type="button"
            onClick={handleSavePred}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedPred
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedPred ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedPred ? "Saved!" : `Save${savedPredItems.length > 0 ? ` (${savedPredItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Exponential Decay Parameters
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Starting Cost Basis ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={predCostInput}
                  onChange={(e) => setPredCostInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Annual Decay %
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={predRateInput}
                    onChange={(e) => setPredRateInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Holding Horizon (Yrs)
                  </label>
                  <input
                    type="number"
                    value={predYearsInput}
                    onChange={(e) => setPredYearsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                      Projected Terminal Salvage Value
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-emerald-600">
                      {fmt(predResult.estimatedResidualValue)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Residual Percentage</span>
                    <span className="text-sm font-bold font-mono text-blue-600">
                      {predResult.residualPct.toFixed(1)}% of Original
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-xs font-mono font-bold flex justify-between items-center">
                  <span className="text-slate-500 font-sans">Total Cumulative Value Lost:</span>
                  <span className="text-amber-600">{fmt(predResult.totalLossInValue)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED PRED LIST */}
          {savedPredItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Salvage Predictions ({savedPredItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPredItems([]);
                    localStorage.removeItem("saved_depr_pred");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedPredItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
                      ))}
                    </div>
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
