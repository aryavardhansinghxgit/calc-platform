"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Download, ShieldCheck, TrendingUp, BarChart2 } from "lucide-react";
import {
  calculateTVM,
  calculateInflation,
  calculateTaxDrag,
  calculateMilestone,
  calculateScenario,
} from "@/app/calculators/finance-calculator/calculator";
import { TVMMode, SavedFinanceItem } from "@/app/calculators/finance-calculator/types";

export function FinanceCalculator() {
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // =========================================================================
  // BOX 1: FINANCE CALCULATOR (CORE TVM ENGINE WITH 5 SOLVER MODES)
  // =========================================================================
  const [mode, setMode] = useState<TVMMode>("FV");
  const [nVal, setNVal] = useState<string>("10");
  const [iyVal, setIyVal] = useState<string>("6");
  const [pvVal, setPvVal] = useState<string>("20000");
  const [pmtVal, setPmtVal] = useState<string>("-2000");
  const [pyVal, setPyVal] = useState<string>("1");
  const [cyVal, setCyVal] = useState<string>("1");
  const [pmtTiming, setPmtTiming] = useState<"end" | "beginning">("end");
  const [inflationRate, setInflationRate] = useState<string>("2.5");
  const [taxRate, setTaxRate] = useState<string>("0");

  const [savedBox1Items, setSavedBox1Items] = useState<SavedFinanceItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  const tvmResult = useMemo(() => {
    return calculateTVM({
      mode,
      n: parseFloat(nVal) || 0,
      iy: parseFloat(iyVal) || 0,
      pv: parseFloat(pvVal) || 0,
      pmt: parseFloat(pmtVal) || 0,
      py: parseFloat(pyVal) || 1,
      cy: parseFloat(cyVal) || 1,
      pmtTiming,
      inflationRate: parseFloat(inflationRate) || 0,
      taxRate: parseFloat(taxRate) || 0,
      currencySymbol,
    });
  }, [mode, nVal, iyVal, pvVal, pmtVal, pyVal, cyVal, pmtTiming, inflationRate, taxRate, currencySymbol]);

  const handleSaveBox1 = () => {
    const newItem: SavedFinanceItem = {
      id: Date.now().toString(),
      title: `Finance Calculator (Solved for ${mode})`,
      inputsSummary: `Mode: ${mode} | N: ${nVal} | I/Y: ${iyVal}% | PV: ${currencySymbol}${parseFloat(pvVal || "0").toLocaleString()} | PMT: ${currencySymbol}${parseFloat(pmtVal || "0").toLocaleString()} | P/Y: ${pyVal} | C/Y: ${cyVal} | Timing: ${pmtTiming}`,
      primaryResult: `Solved ${mode}: ${mode === "IY" ? `${tvmResult.solvedValue}%` : mode === "N" ? `${tvmResult.solvedValue} periods` : `${currencySymbol}${tvmResult.solvedValue.toLocaleString()}`}`,
      detailsList: [
        `FV = ${currencySymbol}${tvmResult.fv.toLocaleString()}`,
        `PV = ${currencySymbol}${tvmResult.pv.toLocaleString()}`,
        `PMT = ${currencySymbol}${tvmResult.pmt.toLocaleString()}`,
        `Sum of Payments = ${currencySymbol}${tvmResult.sumPayments.toLocaleString()}`,
        `Total Interest = ${currencySymbol}${tvmResult.totalInterest.toLocaleString()}`,
        `Real Purchasing Power (Adjusted for ${inflationRate}% Inflation) = ${currencySymbol}${tvmResult.realPurchasingPower.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox1Items];
    setSavedBox1Items(updated);
    setShowHistoryBox1(true);
    try {
      localStorage.setItem("saved_tvm_box1", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleExportCSV = () => {
    const data = tvmResult.schedule;
    if (!data || data.length === 0) return;

    const headers = ["Period", "Present Value (PV)", "Payment (PMT)", "Interest", "Future Value (FV)"];
    const rows = data.map((row) => [
      `"Period ${row.period}"`,
      `"${currencySymbol}${row.pv}"`,
      `"${currencySymbol}${row.pmt}"`,
      `"${currencySymbol}${row.interest}"`,
      `"${currencySymbol}${row.fv}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `tvm_schedule_${mode.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // High-Quality SVG Growth & Payoff Line Chart
  const svgCharts = useMemo(() => {
    const data = tvmResult.schedule;
    if (!data || data.length === 0) return null;

    const maxFV = Math.max(...data.map((d) => Math.abs(d.fv)), Math.abs(tvmResult.pv)) || 1;

    const pointsFV = data
      .map((d, i) => {
        const x = (i / (data.length - 1)) * 320 + 35;
        const y = 135 - (Math.abs(d.fv) / maxFV) * 105;
        return `${x},${y}`;
      })
      .join(" ");

    const pointsPV = data
      .map((d, i) => {
        const x = (i / (data.length - 1)) * 320 + 35;
        const y = 135 - (Math.abs(d.pv) / maxFV) * 105;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <div className="space-y-4">
        {/* Growth & Payoff Line Curve */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold px-1">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Value Changes Over Time ($)
            </span>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-blue-600 font-bold"><span className="w-3 h-1 bg-blue-600 rounded-full inline-block"></span> FV Curve</span>
              <span className="flex items-center gap-1 text-amber-500 font-bold"><span className="w-3 h-1 bg-amber-500 rounded-full inline-block"></span> PV Base</span>
            </div>
          </div>

          <svg viewBox="0 0 380 165" className="w-full h-40 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-xs">
            <line x1="35" y1="30" x2="355" y2="30" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="35" y1="82" x2="355" y2="82" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="35" y1="135" x2="355" y2="135" stroke="#cbd5e1" />

            <polyline fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" points={pointsFV} />
            <polyline fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" points={pointsPV} />

            <text x="30" y="33" fontSize="8" fill="#94a3b8" textAnchor="end" fontWeight="bold">{currencySymbol}{Math.round(maxFV / 1000)}k</text>
            <text x="30" y="138" fontSize="8" fill="#94a3b8" textAnchor="end" fontWeight="bold">{currencySymbol}0</text>

            <text x="35" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">0</text>
            <text x="195" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">P {Math.round(data.length / 2)}</text>
            <text x="355" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">P {data.length}</text>
          </svg>
        </div>
      </div>
    );
  }, [tvmResult, currencySymbol]);

  // =========================================================================
  // BOX 2 TO 6 STATES
  // =========================================================================
  const [savedBox2Items, setSavedBox2Items] = useState<SavedFinanceItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const infCalc = useMemo(() => {
    return calculateInflation({
      nominalAmount: Math.abs(tvmResult.fv) || 100000,
      inflationRate: parseFloat(inflationRate) || 2.5,
      years: (parseFloat(nVal) || 10) / (parseFloat(pyVal) || 1),
    });
  }, [tvmResult, inflationRate, nVal, pyVal]);

  const handleSaveBox2 = () => {
    const newItem: SavedFinanceItem = {
      id: Date.now().toString(),
      title: "Real Purchasing Power & Inflation Drag Simulator",
      inputsSummary: `Nominal Amount: ${currencySymbol}${Math.abs(tvmResult.fv).toLocaleString()} @ ${inflationRate}% Inflation`,
      primaryResult: `Real Value: ${currencySymbol}${infCalc.realValue.toLocaleString()} (${infCalc.purchasingPowerLossPct}% Loss)`,
      detailsList: [infCalc.explanation],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox2Items];
    setSavedBox2Items(updated);
    setShowHistoryBox2(true);
    try {
      localStorage.setItem("saved_tvm_box2", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  const [savedBox3Items, setSavedBox3Items] = useState<SavedFinanceItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);
  const [showHistoryBox3, setShowHistoryBox3] = useState<boolean>(false);

  const taxCalc = useMemo(() => {
    return calculateTaxDrag({
      startingAmount: Math.abs(tvmResult.pv) || 50000,
      annualReturnPct: parseFloat(iyVal) || 8.0,
      taxRatePct: parseFloat(taxRate) || 20.0,
      years: (parseFloat(nVal) || 10) / (parseFloat(pyVal) || 1),
    });
  }, [tvmResult, iyVal, taxRate, nVal, pyVal]);

  const handleSaveBox3 = () => {
    const newItem: SavedFinanceItem = {
      id: Date.now().toString(),
      title: "Post-Tax Net Investment Wealth Return",
      inputsSummary: `Starting: ${currencySymbol}${taxCalc.preTaxEndBalance.toLocaleString()} @ ${taxRate}% Tax Rate`,
      primaryResult: `Post-Tax Balance: ${currencySymbol}${taxCalc.postTaxEndBalance.toLocaleString()}`,
      detailsList: [`Pre-Tax Balance = ${currencySymbol}${taxCalc.preTaxEndBalance.toLocaleString()}`, `Tax Drag Amount = ${currencySymbol}${taxCalc.taxDragAmount.toLocaleString()}`],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox3Items];
    setSavedBox3Items(updated);
    setShowHistoryBox3(true);
    try {
      localStorage.setItem("saved_tvm_box3", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const [targetMilestone, setTargetMilestone] = useState<string>("100000");
  const [savedBox4Items, setSavedBox4Items] = useState<SavedFinanceItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const milestoneCalc = useMemo(() => {
    return calculateMilestone({
      pv: Math.abs(parseFloat(pvVal) || 10000),
      pmt: Math.abs(parseFloat(pmtVal) || 500),
      iy: parseFloat(iyVal) || 7.0,
      targetAmount: parseFloat(targetMilestone) || 100000,
    });
  }, [pvVal, pmtVal, iyVal, targetMilestone]);

  const handleSaveBox4 = () => {
    const newItem: SavedFinanceItem = {
      id: Date.now().toString(),
      title: "Financial Milestone Target Tracker",
      inputsSummary: `Target: ${currencySymbol}${parseFloat(targetMilestone || "0").toLocaleString()} @ ${iyVal}% Return`,
      primaryResult: `Time Required: ${milestoneCalc.yearsToTarget} Years (${milestoneCalc.monthsToTarget} Months)`,
      detailsList: [milestoneCalc.explanation],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox4Items];
    setSavedBox4Items(updated);
    setShowHistoryBox4(true);
    try {
      localStorage.setItem("saved_tvm_box4", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  const [rateScenarioA, setRateScenarioA] = useState<string>("7");
  const [rateScenarioB, setRateScenarioB] = useState<string>("9");
  const [savedBox5Items, setSavedBox5Items] = useState<SavedFinanceItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const scenarioCalc = useMemo(() => {
    return calculateScenario({
      pv: Math.abs(parseFloat(pvVal) || 10000),
      pmt: parseFloat(pmtVal) || -500,
      n: parseFloat(nVal) || 120,
      rateA: parseFloat(rateScenarioA) || 7.0,
      rateB: parseFloat(rateScenarioB) || 9.0,
    });
  }, [pvVal, pmtVal, nVal, rateScenarioA, rateScenarioB]);

  const handleSaveBox5 = () => {
    const newItem: SavedFinanceItem = {
      id: Date.now().toString(),
      title: "Dual Scenario A vs B Comparator",
      inputsSummary: `Scenario A (${rateScenarioA}%) vs Scenario B (${rateScenarioB}%)`,
      primaryResult: `Winner: ${scenarioCalc.winner}`,
      detailsList: [
        `Scenario A Value = ${currencySymbol}${scenarioCalc.fvScenarioA.toLocaleString()}`,
        `Scenario B Value = ${currencySymbol}${scenarioCalc.fvScenarioB.toLocaleString()}`,
        `Net Dollar Difference = ${currencySymbol}${scenarioCalc.difference.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox5Items];
    setSavedBox5Items(updated);
    setShowHistoryBox5(true);
    try {
      localStorage.setItem("saved_tvm_box5", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  useEffect(() => {
    try {
      const b1 = localStorage.getItem("saved_tvm_box1");
      if (b1) setSavedBox1Items(JSON.parse(b1));
      const b2 = localStorage.getItem("saved_tvm_box2");
      if (b2) setSavedBox2Items(JSON.parse(b2));
      const b3 = localStorage.getItem("saved_tvm_box3");
      if (b3) setSavedBox3Items(JSON.parse(b3));
      const b4 = localStorage.getItem("saved_tvm_box4");
      if (b4) setSavedBox4Items(JSON.parse(b4));
      const b5 = localStorage.getItem("saved_tvm_box5");
      if (b5) setSavedBox5Items(JSON.parse(b5));
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-5 max-w-7xl mx-auto font-sans">
      {/* Currency Selector Header */}
      <div className="flex items-center justify-end gap-2 text-xs font-bold">
        <label htmlFor="tvm-currency-select" className="text-slate-500 font-medium">Currency:</label>
        <select
          id="tvm-currency-select"
          value={currencySymbol}
          onChange={(e) => setCurrencySymbol(e.target.value)}
          className="h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] cursor-pointer focus:border-blue-600 focus:outline-none"
        >
          <option value="$">USD ($)</option>
          <option value="€">EUR (€)</option>
          <option value="£">GBP (£)</option>
          <option value="C$">CAD (C$)</option>
          <option value="A$">AUD (A$)</option>
          <option value="₹">INR (₹)</option>
        </select>
      </div>

      {/* ========================================================================= */}
      {/* 1. FINANCE CALCULATOR (TWO COLUMNS INPUTS & TWO COLUMNS RESULTS) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3.5 py-2 flex items-center justify-between">
          <span className="font-extrabold text-sm">Finance Calculator</span>
          <button
            type="button"
            onClick={handleSaveBox1}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox1 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-3.5 space-y-4">
          {/* Mode Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-bold">
            <span className="text-slate-500 uppercase tracking-wider text-[10px] mr-1">Solve For:</span>
            {(["FV", "PMT", "IY", "N", "PV"] as TVMMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  mode === m
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                {m === "FV" ? "FV (Future Value)" : m === "PMT" ? "PMT (Payment)" : m === "IY" ? "I/Y (Rate %)" : m === "N" ? "N (# Periods)" : "PV (Present Value)"}
              </button>
            ))}
          </div>

          {/* TWO COLUMNS INPUT SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs text-xs">
            {/* Column 1: Core TVM Variables */}
            <div className="space-y-3">
              <span className="font-extrabold text-blue-600 dark:text-blue-400 block border-b border-slate-200 dark:border-slate-800 pb-1 uppercase tracking-wider text-[11px]">
                Core Time Value Variables
              </span>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">N (# of periods)</label>
                <input
                  type="number"
                  disabled={mode === "N"}
                  value={nVal}
                  onChange={(e) => setNVal(e.target.value)}
                  className={`w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none ${
                    mode === "N" ? "bg-slate-200 dark:bg-slate-800 text-slate-400" : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  }`}
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">I/Y (Interest rate per year %)</label>
                <input
                  type="number"
                  step="0.1"
                  disabled={mode === "IY"}
                  value={iyVal}
                  onChange={(e) => setIyVal(e.target.value)}
                  className={`w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none ${
                    mode === "IY" ? "bg-slate-200 dark:bg-slate-800 text-slate-400" : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  }`}
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">PV (Present Value $)</label>
                <input
                  type="number"
                  disabled={mode === "PV"}
                  value={pvVal}
                  onChange={(e) => setPvVal(e.target.value)}
                  className={`w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none ${
                    mode === "PV" ? "bg-slate-200 dark:bg-slate-800 text-slate-400" : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  }`}
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">PMT (Periodic Payment $)</label>
                <input
                  type="number"
                  disabled={mode === "PMT"}
                  value={pmtVal}
                  onChange={(e) => setPmtVal(e.target.value)}
                  className={`w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none ${
                    mode === "PMT" ? "bg-slate-200 dark:bg-slate-800 text-slate-400" : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  }`}
                />
              </div>
            </div>

            {/* Column 2: Periods, Timing & Advanced Drag Settings */}
            <div className="space-y-3">
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block border-b border-slate-200 dark:border-slate-800 pb-1 uppercase tracking-wider text-[11px]">
                Compounding & Advanced Drag Settings
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">P/Y (# periods/yr)</label>
                  <input type="number" value={pyVal} onChange={(e) => setPyVal(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">C/Y (Compounding/yr)</label>
                  <input type="number" value={cyVal} onChange={(e) => setCyVal(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">PMT Timing</label>
                <div className="flex items-center gap-4 pt-1 font-bold">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="pmtTiming" value="end" checked={pmtTiming === "end"} onChange={() => setPmtTiming("end")} className="text-blue-600" />
                    <span>End of Period (Ordinary)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="pmtTiming" value="beginning" checked={pmtTiming === "beginning"} onChange={() => setPmtTiming("beginning")} className="text-blue-600" />
                    <span>Beginning (Due)</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Inflation Rate %</label>
                  <input type="number" step="0.1" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tax Rate %</label>
                  <input type="number" step="0.1" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none" />
                </div>
              </div>
            </div>
          </div>

          {/* TWO COLUMNS PROFESSIONAL RESULT SECTION */}
          <div className="bg-gradient-to-br from-blue-50/90 to-indigo-50/70 dark:from-slate-900 dark:to-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-blue-200/60 dark:border-blue-900/40 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  TVM Calculation Results & Growth Curve
                </span>
              </div>
              <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-extrabold">
                Mode: {mode}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Result Column 1: Solved Hero Metric & Summary Table */}
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-blue-900/60 shadow-xs text-center space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 block">
                    Solved {mode === "FV" ? "Future Value (FV)" : mode === "PMT" ? "Periodic Payment (PMT)" : mode === "IY" ? "Interest Rate (I/Y)" : mode === "N" ? "Number of Periods (N)" : "Present Value (PV)"}
                  </span>
                  <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                    {mode === "IY" ? `${tvmResult.solvedValue}%` : mode === "N" ? `${tvmResult.solvedValue} periods` : `${currencySymbol}${tvmResult.solvedValue.toLocaleString()}`}
                  </div>
                </div>

                {/* Summary Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                  <table className="w-full text-xs text-left border-collapse font-sans">
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-700 dark:text-slate-300">Present Value (PV)</td>
                        <td className="p-2.5 font-bold text-blue-600">{currencySymbol}{tvmResult.pv.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-700 dark:text-slate-300">Periodic Payment (PMT)</td>
                        <td className="p-2.5 font-bold text-slate-800 dark:text-slate-200">{currencySymbol}{tvmResult.pmt.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-700 dark:text-slate-300">Sum of All Payments</td>
                        <td className="p-2.5 font-bold text-slate-800 dark:text-slate-200">{currencySymbol}{tvmResult.sumPayments.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-700 dark:text-slate-300">Total Interest Earned / Paid</td>
                        <td className="p-2.5 font-bold text-emerald-600">{currencySymbol}{tvmResult.totalInterest.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-blue-50/60 dark:bg-blue-950/40">
                        <td className="p-2.5 font-sans font-extrabold text-slate-900 dark:text-slate-100">Future Value (FV)</td>
                        <td className="p-2.5 font-extrabold text-blue-600 text-sm">{currencySymbol}{tvmResult.fv.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-700 dark:text-slate-300">Real Purchasing Power ({inflationRate}% Inf)</td>
                        <td className="p-2.5 font-bold text-amber-600">{currencySymbol}{tvmResult.realPurchasingPower.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Result Column 2: Dual Professional Charts */}
              <div className="space-y-4">
                {svgCharts}
              </div>
            </div>
          </div>

          {/* Schedule Growth Table */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">
                Period-by-Period TVM Amortization & Growth Schedule
              </span>
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                title="Export Schedule to CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto max-h-72 rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-center border-collapse font-mono">
                <thead className="sticky top-0 bg-blue-600 text-white font-bold font-sans">
                  <tr>
                    <th className="p-2.5 border-r border-blue-500">Period</th>
                    <th className="p-2.5 border-r border-blue-500">PV</th>
                    <th className="p-2.5 border-r border-blue-500">PMT</th>
                    <th className="p-2.5 border-r border-blue-500">Interest</th>
                    <th className="p-2.5">FV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {tvmResult.schedule.map((row) => (
                    <tr key={row.period} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-2 font-bold font-sans text-blue-600 border-r border-slate-200 dark:border-slate-800">Period {row.period}</td>
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">{currencySymbol}{row.pv.toLocaleString()}</td>
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800">{currencySymbol}{row.pmt.toLocaleString()}</td>
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800 text-emerald-600">{currencySymbol}{row.interest.toLocaleString()}</td>
                      <td className="p-2 font-bold text-blue-600">{currencySymbol}{row.fv.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* History Drawer for Box 1 */}
          {savedBox1Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox1(!showHistoryBox1)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox1Items.length})</span>
                {showHistoryBox1 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox1 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox1Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox1Items(savedBox1Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. REAL PURCHASING POWER & INFLATION DRAG SIMULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Real Purchasing Power & Inflation Drag Simulator</span>
          <button
            type="button"
            onClick={handleSaveBox2}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox2 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Annual Inflation Rate %</label>
                <input type="number" step="0.1" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none" />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Inflation Adjusted Value</span>

              <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-sans tabular-nums mt-1">
                Real Value: {currencySymbol}{infCalc.realValue.toLocaleString()}
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                {infCalc.explanation}
              </div>
            </div>
          </div>

          {savedBox2Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox2(!showHistoryBox2)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox2Items.length})</span>
                {showHistoryBox2 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox2 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox2Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox2Items(savedBox2Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. POST-TAX NET INVESTMENT WEALTH RETURN */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Post-Tax Net Investment Wealth Return</span>
          <button
            type="button"
            onClick={handleSaveBox3}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox3 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Capital Gains / Tax Drag Rate %</label>
                <input type="number" step="0.1" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none" />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Post-Tax Net Wealth</span>

              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums mt-1">
                Post-Tax: {currencySymbol}{taxCalc.postTaxEndBalance.toLocaleString()}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Pre-Tax Balance</span>
                  <span className="text-blue-600 text-sm font-extrabold">{currencySymbol}{taxCalc.preTaxEndBalance.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Tax Drag Lost</span>
                  <span className="text-red-500 text-sm font-extrabold">{currencySymbol}{taxCalc.taxDragAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {savedBox3Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox3(!showHistoryBox3)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox3Items.length})</span>
                {showHistoryBox3 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox3 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox3Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox3Items(savedBox3Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. FINANCIAL MILESTONE TARGET TRACKER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Financial Milestone Target Tracker</span>
          <button
            type="button"
            onClick={handleSaveBox4}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox4 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Wealth Milestone ($)</label>
                <select value={targetMilestone} onChange={(e) => setTargetMilestone(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none cursor-pointer">
                  <option value="100000">$100,000 Milestone</option>
                  <option value="250000">$250,000 Milestone</option>
                  <option value="500000">$500,000 Milestone</option>
                  <option value="1000000">$1,000,000 (Millionaire Milestone)</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Time to Reach Target</span>

              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {milestoneCalc.yearsToTarget} Years
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                {milestoneCalc.explanation}
              </div>
            </div>
          </div>

          {savedBox4Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox4(!showHistoryBox4)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox4Items.length})</span>
                {showHistoryBox4 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox4 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox4Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox4Items(savedBox4Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. DUAL SCENARIO A VS B COMPARATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Dual Scenario A vs B Comparator</span>
          <button
            type="button"
            onClick={handleSaveBox5}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox5 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Scenario A Rate %</label>
                  <input type="number" step="0.1" value={rateScenarioA} onChange={(e) => setRateScenarioA(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Scenario B Rate %</label>
                  <input type="number" step="0.1" value={rateScenarioB} onChange={(e) => setRateScenarioB(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Return Rate Comparison</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                Winner: {scenarioCalc.winner}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Scenario A ({rateScenarioA}%)</span>
                  <span className="text-blue-600 text-sm font-extrabold">{currencySymbol}{scenarioCalc.fvScenarioA.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Scenario B ({rateScenarioB}%)</span>
                  <span className="text-emerald-600 text-sm font-extrabold">{currencySymbol}{scenarioCalc.fvScenarioB.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {savedBox5Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox5(!showHistoryBox5)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox5Items.length})</span>
                {showHistoryBox5 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox5 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox5Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox5Items(savedBox5Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
