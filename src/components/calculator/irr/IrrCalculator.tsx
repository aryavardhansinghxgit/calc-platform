"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, Plus, Download, ChevronDown, ChevronUp, TrendingUp, CheckCircle, XCircle, AlertTriangle, ArrowRight, BarChart2 } from "lucide-react";
import {
  calculateCoreIrr,
  calculateFixedCashFlowIrr,
  generateNpvSensitivityCurve,
  calculateMultiProjectComparison,
} from "@/app/calculators/irr-calculator/calculator";
import { AnnualCashFlowRow, SavedIrrItem } from "@/app/calculators/irr-calculator/types";

export function IrrCalculator() {
  const input3DClass =
    "w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none transition-all text-xs";
  const select3DClass =
    "w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none cursor-pointer text-xs";
  const outerBox3DClass =
    "border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs";

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

  // =========================================================================
  // BOX 1: CORE ANNUAL CASH FLOW IRR, MIRR & NPV SUITE
  // =========================================================================
  const [b1Outlay, setB1Outlay] = useState<string>("40000");
  const [b1Flows, setB1Flows] = useState<AnnualCashFlowRow[]>([
    { year: 1, amount: 10000 },
    { year: 2, amount: 20000 },
    { year: 3, amount: 30000 },
  ]);
  const [b1Hurdle, setB1Hurdle] = useState<string>("12.0");
  const [b1Reinvest, setB1Reinvest] = useState<string>("10.0");
  const [b1Finance, setB1Finance] = useState<string>("8.0");
  const [b1ShowSchedule, setB1ShowSchedule] = useState<boolean>(false);

  const [savedBox1, setSavedBox1] = useState<SavedIrrItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);

  // =========================================================================
  // BOX 2: FIXED / ANNUITY RECURRING CASH FLOW IRR ANALYZER
  // =========================================================================
  const [b2Initial, setB2Initial] = useState<string>("10000");
  const [b2Years, setB2Years] = useState<string>("2");
  const [b2Months, setB2Months] = useState<string>("6");
  const [b2Ending, setB2Ending] = useState<string>("15000");
  const [b2Pmt, setB2Pmt] = useState<string>("100");
  const [b2Direction, setB2Direction] = useState<"withdraw" | "deposit">("withdraw");
  const [b2Frequency, setB2Frequency] = useState<"monthly" | "quarterly" | "semiAnnually" | "annually">("monthly");
  const [b2Timing, setB2Timing] = useState<"beginning" | "end">("end");

  const [savedBox2, setSavedBox2] = useState<SavedIrrItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);

  // =========================================================================
  // BOX 3: DYNAMIC NPV PROFILE & DISCOUNT RATE SENSITIVITY CURVE
  // =========================================================================
  const [savedBox3, setSavedBox3] = useState<SavedIrrItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);

  // =========================================================================
  // BOX 4: MULTI-PROJECT CAPITAL BUDGETING COMPARATOR (PROJECT A VS B)
  // =========================================================================
  const [b4OutlayA, setB4OutlayA] = useState<string>("100000");
  const [b4FlowsA, setB4FlowsA] = useState<string>("5000, 20000, 25000, 40000, 60000");
  const [b4OutlayB, setB4OutlayB] = useState<string>("100000");
  const [b4FlowsB, setB4FlowsB] = useState<string>("0, 10000, 30000, 30000, 80000");
  const [b4CostOfCapital, setB4CostOfCapital] = useState<string>("10.0");

  const [savedBox4, setSavedBox4] = useState<SavedIrrItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);

  // =========================================================================
  // BOX 5: NON-CONVENTIONAL CASH FLOW & MULTIPLE IRR DETECTOR
  // =========================================================================
  const [b5FlowsText, setB5FlowsText] = useState<string>("-10000, 30000, -25000");
  const [b5Hurdle, setB5Hurdle] = useState<string>("10.0");
  const [savedBox5, setSavedBox5] = useState<SavedIrrItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_irr_box1");
      if (s1) setSavedBox1(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_irr_box2");
      if (s2) setSavedBox2(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_irr_box3");
      if (s3) setSavedBox3(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_irr_box4");
      if (s4) setSavedBox4(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_irr_box5");
      if (s5) setSavedBox5(JSON.parse(s5));
    } catch (e) {}
  }, []);

  // Box 1 Calculations
  const b1Calc = useMemo(() => {
    return calculateCoreIrr({
      initialOutlay: parseFloat(b1Outlay) || 0,
      cashFlows: b1Flows,
      hurdleRate: parseFloat(b1Hurdle) || 12,
      reinvestmentRate: parseFloat(b1Reinvest) || 10,
      financingRate: parseFloat(b1Finance) || 8,
    });
  }, [b1Outlay, b1Flows, b1Hurdle, b1Reinvest, b1Finance]);

  const handleAddFlowRow = () => {
    const nextYr = b1Flows.length + 1;
    setB1Flows([...b1Flows, { year: nextYr, amount: 15000 }]);
  };

  const handleRemoveFlowRow = (year: number) => {
    const updated = b1Flows.filter((f) => f.year !== year).map((f, idx) => ({ ...f, year: idx + 1 }));
    setB1Flows(updated);
  };

  const handleUpdateFlowAmount = (year: number, amount: number) => {
    setB1Flows(b1Flows.map((f) => (f.year === year ? { ...f, amount } : f)));
  };

  const handleExportBox1CSV = () => {
    if (!b1Calc.schedule || b1Calc.schedule.length === 0) return;
    const headers = ["Year", "Cash Flow ($)", "Discount Factor (PVIF)", "Discounted Present Value ($)", "Cumulative Cash Flow ($)", "Cumulative Discounted Value ($)"];
    const rows = b1Calc.schedule.map((r) => [
      r.year,
      r.cashFlow,
      r.discountFactor,
      r.presentValue,
      r.cumulativeCashFlow,
      r.cumulativeDiscountedValue,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload(`irr_npv_discount_schedule.csv`, csv);
  };

  const handleSaveBox1 = () => {
    const inputsStr = `Outlay: $${b1Outlay} | ${b1Flows.length} Yrs | Hurdle: ${b1Hurdle}% | Reinvest: ${b1Reinvest}% | Finance: ${b1Finance}%`;
    const primaryStr = `IRR: ${b1Calc.irrPercent}% / yr | MIRR: ${b1Calc.mirrPercent}% | NPV: $${b1Calc.npv.toLocaleString()} (${b1Calc.isAccept ? "ACCEPT" : "REJECT"})`;

    const detailsList = [
      `Internal Rate of Return (IRR): ${b1Calc.irrPercent}% / year`,
      `Modified Internal Rate of Return (MIRR): ${b1Calc.mirrPercent}% / year`,
      `Net Present Value (NPV @ ${b1Hurdle}% WACC): $${b1Calc.npv.toLocaleString()}`,
      `Profitability Index (PI): ${b1Calc.profitabilityIndex}`,
      `Discounted Payback Period: ${b1Calc.discountedPaybackYears} Years (Simple: ${b1Calc.simplePaybackYears}y)`,
      `Total Cash Inflows: $${b1Calc.totalInflows.toLocaleString()} | Net Profit: $${b1Calc.netProfit.toLocaleString()}`,
      `Decision: ${b1Calc.isAccept ? "ACCEPT PROJECT (IRR > Hurdle)" : "REJECT PROJECT (IRR < Hurdle)"}`,
    ];

    const newItem: SavedIrrItem = {
      id: Date.now().toString(),
      title: "Core Annual Cash Flow IRR & MIRR",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox1.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_irr_box1", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleDeleteSavedBox1 = (id: string) => {
    const updated = savedBox1.filter((item) => item.id !== id);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_irr_box1", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox1 = () => {
    setSavedBox1([]);
    try {
      localStorage.removeItem("saved_irr_box1");
    } catch (e) {}
  };

  // Box 2 Calculations
  const b2Calc = useMemo(() => {
    return calculateFixedCashFlowIrr({
      initialInvestment: parseFloat(b2Initial) || 0,
      holdingYears: parseFloat(b2Years) || 0,
      holdingMonths: parseFloat(b2Months) || 0,
      endingBalance: parseFloat(b2Ending) || 0,
      recurringPayment: parseFloat(b2Pmt) || 0,
      direction: b2Direction,
      frequency: b2Frequency,
      timing: b2Timing,
    });
  }, [b2Initial, b2Years, b2Months, b2Ending, b2Pmt, b2Direction, b2Frequency, b2Timing]);

  const handleExportBox2CSV = () => {
    const headers = ["Period", "Recurring Cash Flow ($)", "Running Valuation ($)"];
    const rows = b2Calc.schedule.map((r) => [r.period, r.cashFlow, r.endingBalance]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("fixed_cash_flow_irr_schedule.csv", csv);
  };

  const handleSaveBox2 = () => {
    const inputsStr = `Initial: $${b2Initial} | Horizon: ${b2Years}y ${b2Months}m | Ending: $${b2Ending} | Flow: $${b2Pmt} (${b2Frequency}, ${b2Direction})`;
    const primaryStr = `Annual Compounded IRR: ${b2Calc.annualCompoundedIrr}% / yr (Nominal: ${b2Calc.nominalAnnualIrr}%)`;

    const detailsList = [
      `Annual Compounded IRR: ${b2Calc.annualCompoundedIrr}% / year`,
      `Nominal Annual IRR: ${b2Calc.nominalAnnualIrr}% / year`,
      `Total Periodic Cash Flows: $${b2Calc.totalPeriodicFlows.toLocaleString()} across ${b2Calc.totalPeriods} periods`,
      `Net Cash Flow Received: $${b2Calc.netCashReceived.toLocaleString()}`,
      `Total Wealth Multiple: ${b2Calc.totalWealthMultiple}x`,
    ];

    const newItem: SavedIrrItem = {
      id: Date.now().toString(),
      title: "Fixed Recurring Cash Flow IRR",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox2.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_irr_box2", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  const handleDeleteSavedBox2 = (id: string) => {
    const updated = savedBox2.filter((item) => item.id !== id);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_irr_box2", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox2 = () => {
    setSavedBox2([]);
    try {
      localStorage.removeItem("saved_irr_box2");
    } catch (e) {}
  };

  // Box 3 Calculations (Dynamic NPV Profile Curve from Box 1 flows)
  const b3CurvePoints = useMemo(() => {
    const flows = [-Math.abs(parseFloat(b1Outlay) || 0), ...b1Flows.map((f) => f.amount)];
    return generateNpvSensitivityCurve(flows);
  }, [b1Outlay, b1Flows]);

  const handleExportBox3CSV = () => {
    const headers = ["Discount Rate (%)", "Net Present Value ($)"];
    const rows = b3CurvePoints.map((p) => [`${p.rate}%`, p.npv]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("npv_discount_rate_sensitivity_curve.csv", csv);
  };

  const handleSaveBox3 = () => {
    const inputsStr = `Outlay: $${b1Outlay} | ${b1Flows.length} Periods | IRR Intercept: ${b1Calc.irrPercent}%`;
    const primaryStr = `IRR Root Intercept: ${b1Calc.irrPercent}% | Undiscounted NPV (0%): $${b3CurvePoints[0]?.npv.toLocaleString()}`;

    const detailsList = [
      `X-Axis Intercept (NPV = $0): ${b1Calc.irrPercent}%`,
      `Undiscounted Net Profit (0% Rate): $${b3CurvePoints[0]?.npv.toLocaleString()}`,
      `NPV at 10% Discount Rate: $${b3CurvePoints.find((p) => p.rate === 10)?.npv.toLocaleString()}`,
      `NPV at 20% Discount Rate: $${b3CurvePoints.find((p) => p.rate === 20)?.npv.toLocaleString()}`,
    ];

    const newItem: SavedIrrItem = {
      id: Date.now().toString(),
      title: "NPV Sensitivity Profile Curve",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox3.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_irr_box3", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const handleDeleteSavedBox3 = (id: string) => {
    const updated = savedBox3.filter((item) => item.id !== id);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_irr_box3", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox3 = () => {
    setSavedBox3([]);
    try {
      localStorage.removeItem("saved_irr_box3");
    } catch (e) {}
  };

  // Box 4 Calculations (Multi-Project Comparator)
  const b4Calc = useMemo(() => {
    const pAFlows = b4FlowsA.split(/[,;\s]+/).map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
    const pBFlows = b4FlowsB.split(/[,;\s]+/).map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));

    return calculateMultiProjectComparison({
      projectAOutlay: parseFloat(b4OutlayA) || 0,
      projectAFlows: pAFlows,
      projectBOutlay: parseFloat(b4OutlayB) || 0,
      projectBFlows: pBFlows,
      costOfCapital: parseFloat(b4CostOfCapital) || 10,
    });
  }, [b4OutlayA, b4FlowsA, b4OutlayB, b4FlowsB, b4CostOfCapital]);

  const handleExportBox4CSV = () => {
    const headers = ["Metric", "Project A", "Project B", "Comparison / Crossover"];
    const rows = [
      ["Initial Outlay ($)", `$${b4OutlayA}`, `$${b4OutlayB}`, "-"],
      ["Internal Rate of Return (IRR)", `${b4Calc.projectAIrr}%`, `${b4Calc.projectBIrr}%`, `Spread: ${(b4Calc.projectAIrr - b4Calc.projectBIrr).toFixed(2)}%`],
      ["Net Present Value (NPV)", `$${b4Calc.projectANpv.toLocaleString()}`, `$${b4Calc.projectBNpv.toLocaleString()}`, `Advantage: $${Math.abs(b4Calc.projectANpv - b4Calc.projectBNpv).toLocaleString()}`],
      ["Fisher Crossover Rate", `${b4Calc.crossoverRate}%`, `${b4Calc.crossoverRate}%`, "-"],
      ["Recommended Decision", b4Calc.recommendedProject, "-", b4Calc.reasoning],
    ];
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("multi_project_irr_npv_comparison.csv", csv);
  };

  const handleSaveBox4 = () => {
    const inputsStr = `Project A ($${b4OutlayA}) vs Project B ($${b4OutlayB}) | WACC: ${b4CostOfCapital}%`;
    const primaryStr = `Winner: ${b4Calc.recommendedProject} | Proj A IRR: ${b4Calc.projectAIrr}% vs Proj B IRR: ${b4Calc.projectBIrr}%`;

    const detailsList = [
      `Project A: IRR ${b4Calc.projectAIrr}% | NPV $${b4Calc.projectANpv.toLocaleString()}`,
      `Project B: IRR ${b4Calc.projectBIrr}% | NPV $${b4Calc.projectBNpv.toLocaleString()}`,
      `Fisher Crossover Rate: ${b4Calc.crossoverRate}%`,
      `Optimal Recommendation: ${b4Calc.recommendedProject}`,
      `Strategic Rationale: ${b4Calc.reasoning}`,
    ];

    const newItem: SavedIrrItem = {
      id: Date.now().toString(),
      title: "Project A vs Project B Comparison",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox4.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_irr_box4", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  const handleDeleteSavedBox4 = (id: string) => {
    const updated = savedBox4.filter((item) => item.id !== id);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_irr_box4", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox4 = () => {
    setSavedBox4([]);
    try {
      localStorage.removeItem("saved_irr_box4");
    } catch (e) {}
  };

  // Box 5 Calculations (Non-Conventional Cash Flow Detector)
  const b5Calc = useMemo(() => {
    const parsed = b5FlowsText.split(/[,;\s]+/).map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
    if (parsed.length === 0) {
      return { irr: 0, mirr: 0, signChanges: 0, multiple: false };
    }
    const initial = parsed[0];
    const annualFlows = parsed.slice(1).map((amt, idx) => ({ year: idx + 1, amount: amt }));
    const res = calculateCoreIrr({
      initialOutlay: Math.abs(initial),
      cashFlows: annualFlows,
      hurdleRate: parseFloat(b5Hurdle) || 10,
      reinvestmentRate: 10,
      financingRate: 8,
    });
    return {
      irr: res.irrPercent,
      mirr: res.mirrPercent,
      signChanges: res.signChangesCount,
      multiple: res.hasMultipleRoots,
      npv: res.npv,
    };
  }, [b5FlowsText, b5Hurdle]);

  const handleSaveBox5 = () => {
    const inputsStr = `Flows: [${b5FlowsText}] | Hurdle: ${b5Hurdle}%`;
    const primaryStr = `${b5Calc.multiple ? "MULTIPLE IRRs DETECTED" : "Conventional Stream"} | Solved IRR: ${b5Calc.irr}% | MIRR: ${b5Calc.mirr}%`;

    const detailsList = [
      `Sign Changes: ${b5Calc.signChanges} (${b5Calc.multiple ? "Non-conventional cash flows" : "Conventional"})`,
      `Standard Polynomial IRR: ${b5Calc.irr}%`,
      `Unique Modified IRR (MIRR): ${b5Calc.mirr}%`,
      `Recommendation: ${b5Calc.multiple ? "Use MIRR to eliminate spurious multiple roots" : "Standard IRR is reliable"}`,
    ];

    const newItem: SavedIrrItem = {
      id: Date.now().toString(),
      title: "Non-Conventional Cash Flow Analysis",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox5.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_irr_box5", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  const handleDeleteSavedBox5 = (id: string) => {
    const updated = savedBox5.filter((item) => item.id !== id);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_irr_box5", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox5 = () => {
    setSavedBox5([]);
    try {
      localStorage.removeItem("saved_irr_box5");
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* =========================================================================
          BOX 1: CORE ANNUAL CASH FLOW IRR, MIRR & NPV SUITE
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>IRR for Annual Cash Flows (Core Corporate Capital Budgeting Suite)</span>
          <button
            type="button"
            onClick={handleSaveBox1}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox1 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT: INPUT CONTROLS */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Initial Outlay &amp; Capital Hurdle Rates
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Initial Investment Outlay ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={b1Outlay}
                    onChange={(e) => setB1Outlay(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Hurdle Rate / WACC (%)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={b1Hurdle}
                    onChange={(e) => setB1Hurdle(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Reinvestment Rate (%) (MIRR)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={b1Reinvest}
                    onChange={(e) => setB1Reinvest(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Financing Cost (%) (MIRR)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={b1Finance}
                    onChange={(e) => setB1Finance(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              {/* DYNAMIC ANNUAL CASH FLOW ROWS */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase text-slate-700 dark:text-slate-300">
                    Annual Projected Cash Inflows / Outflows
                  </span>
                  <button
                    type="button"
                    onClick={handleAddFlowRow}
                    className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 text-[11px] font-bold flex items-center gap-1 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer border border-blue-200 dark:border-blue-800"
                  >
                    <Plus className="w-3 h-3" /> Add Year
                  </button>
                </div>

                <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                  {b1Flows.map((flow) => (
                    <div key={flow.year} className="grid grid-cols-12 gap-1.5 items-center">
                      <div className="col-span-3">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Year {flow.year}:</span>
                      </div>
                      <div className="col-span-8">
                        <input
                          type="number"
                          step={500}
                          placeholder={`Year ${flow.year} Cash Flow`}
                          value={flow.amount}
                          onChange={(e) => handleUpdateFlowAmount(flow.year, parseFloat(e.target.value) || 0)}
                          className={input3DClass}
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveFlowRow(flow.year)}
                          className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: RESULTS & METRICS */}
            <div className="lg:col-span-6 space-y-3">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Internal Rate of Return (IRR)
                    </span>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                      {b1Calc.irrPercent}% <span className="text-xs font-bold text-slate-500">/ year</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Capital Budgeting Status</span>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-extrabold inline-flex items-center gap-1 font-sans ${
                        b1Calc.isAccept
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300"
                          : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-300"
                      }`}
                    >
                      {b1Calc.isAccept ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{b1Calc.isAccept ? "ACCEPT PROJECT" : "REJECT PROJECT"}</span>
                    </span>
                  </div>
                </div>

                {/* PRIMARY METRICS GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold font-sans tabular-nums">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Modified IRR (MIRR)</span>
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold">
                      {b1Calc.mirrPercent}% / yr
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Net Present Value</span>
                    <span className={`font-extrabold ${b1Calc.npv >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600"}`}>
                      ${b1Calc.npv.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Profitability Index</span>
                    <span className="text-slate-900 dark:text-slate-100 font-extrabold">
                      {b1Calc.profitabilityIndex}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Discounted Payback</span>
                    <span className="text-amber-600 dark:text-amber-400 font-extrabold">
                      {b1Calc.discountedPaybackYears} Yrs
                    </span>
                  </div>
                </div>

                {/* SUMMARY DETAILS */}
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium space-y-1">
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Total Cash Inflows Received:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                      +${b1Calc.totalInflows.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Net Cumulative Profit Created:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums">
                      +${b1Calc.netProfit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Simple Undiscounted Payback Period:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                      {b1Calc.simplePaybackYears} Years
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SCHEDULE TOGGLE & CSV EXPORT */}
          <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setB1ShowSchedule(!b1ShowSchedule)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {b1ShowSchedule ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{b1ShowSchedule ? "Hide Discounted Schedule" : "View Annual Discounted Cash Flow & Payback Amortization Table"}</span>
            </button>

            <button
              type="button"
              onClick={handleExportBox1CSV}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Export Schedule (CSV)</span>
            </button>
          </div>

          {b1ShowSchedule && (
            <div className="mt-2 overflow-x-auto max-h-56 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold sticky top-0">
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="p-2">Year</th>
                    <th className="p-2">Nominal Cash Flow</th>
                    <th className="p-2">PV Factor ({b1Hurdle}%)</th>
                    <th className="p-2">Discounted PV</th>
                    <th className="p-2">Cumulative Cash Flow</th>
                    <th className="p-2">Cumulative Discounted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {b1Calc.schedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-1.5 font-bold text-slate-700 dark:text-slate-300">Year {row.year}</td>
                      <td className={`p-1.5 font-bold ${row.cashFlow < 0 ? "text-red-600" : "text-emerald-600"}`}>
                        ${row.cashFlow.toLocaleString()}
                      </td>
                      <td className="p-1.5 text-slate-500">{row.discountFactor}</td>
                      <td className="p-1.5 text-blue-600 font-bold">${row.presentValue.toLocaleString()}</td>
                      <td className="p-1.5 text-slate-600 dark:text-slate-400">${row.cumulativeCashFlow.toLocaleString()}</td>
                      <td className={`p-1.5 font-extrabold ${row.cumulativeDiscountedValue >= 0 ? "text-emerald-600" : "text-slate-600 dark:text-slate-400"}`}>
                        ${row.cumulativeDiscountedValue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* SAVED CALCULATIONS INSIDE BOX 1 */}
          {savedBox1.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Capital Budgeting Calculations ({savedBox1.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox1}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox1.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox1(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOX 2: FIXED / ANNUITY RECURRING CASH FLOW IRR ANALYZER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>IRR Based on Fixed / Annuity Recurring Cash Flows</span>
          <button
            type="button"
            onClick={handleSaveBox2}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox2 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* INPUTS */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Fixed Annuity Configuration
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Initial Investment ($)
                  </label>
                  <input
                    type="number"
                    value={b2Initial}
                    onChange={(e) => setB2Initial(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Ending Terminal Balance ($)
                  </label>
                  <input
                    type="number"
                    value={b2Ending}
                    onChange={(e) => setB2Ending(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Holding Time (Years)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={b2Years}
                    onChange={(e) => setB2Years(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Holding Time (Months)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={11}
                    step={1}
                    value={b2Months}
                    onChange={(e) => setB2Months(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Recurring Flow ($)
                  </label>
                  <input
                    type="number"
                    value={b2Pmt}
                    onChange={(e) => setB2Pmt(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Flow Direction
                  </label>
                  <select
                    value={b2Direction}
                    onChange={(e) => setB2Direction(e.target.value as any)}
                    className={select3DClass}
                  >
                    <option value="withdraw">Withdraw (+)</option>
                    <option value="deposit">Deposit (-)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Frequency
                  </label>
                  <select
                    value={b2Frequency}
                    onChange={(e) => setB2Frequency(e.target.value as any)}
                    className={select3DClass}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="semiAnnually">Semi-Annual</option>
                    <option value="annually">Annual</option>
                  </select>
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Annual Compounded IRR
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    {b2Calc.annualCompoundedIrr}% <span className="text-xs font-bold text-slate-500">/ year</span>
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Nominal Annual IRR</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                    {b2Calc.nominalAnnualIrr}% / yr
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Total Cash Transacted</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">
                    ${b2Calc.totalPeriodicFlows.toLocaleString()}
                  </span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Net Profit / Inflow</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                    +${b2Calc.netCashReceived.toLocaleString()}
                  </span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Wealth Multiple</span>
                  <span className="text-blue-600 dark:text-blue-400 font-extrabold">
                    {b2Calc.totalWealthMultiple}x
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleExportBox2CSV}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Export Schedule (CSV)</span>
                </button>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 2 */}
          {savedBox2.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Fixed Annuity Calculations ({savedBox2.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox2}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox2.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox2(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOX 3: DYNAMIC NPV PROFILE & DISCOUNT RATE SENSITIVITY CURVE
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>NPV Profile &amp; Discount Rate Sensitivity Curve (0% to 50%)</span>
          <button
            type="button"
            onClick={handleSaveBox3}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox3 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* SVG CURVE */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Continuous NPV Decay Curve &amp; Zero Intercept
                </span>
                <span className="text-[10px] text-slate-500 font-bold">
                  Zero Intercept (IRR) = <span className="text-blue-600 font-extrabold">{b1Calc.irrPercent}%</span>
                </span>
              </div>

              {/* DYNAMIC SVG CHART */}
              <div className="h-48 w-full flex items-center justify-center relative">
                {(() => {
                  const npvValues = b3CurvePoints.map((p) => p.npv);
                  const maxNpv = Math.max(...npvValues, 1000);
                  const minNpv = Math.min(...npvValues, -1000);
                  const range = maxNpv - minNpv || 1;

                  // Dynamic Y position for NPV = 0
                  const zeroY = 15 + ((maxNpv - 0) / range) * 125;

                  const coords = b3CurvePoints.map((p) => {
                    const x = 50 + (p.rate / 50) * 430;
                    const y = 15 + ((maxNpv - p.npv) / range) * 125;
                    return { x, y, ...p };
                  });

                  const pathD = coords.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), "");

                  // IRR coordinate on curve (if within 0 to 50%)
                  const irrVal = b1Calc.irrPercent;
                  const hasValidIrr = !isNaN(irrVal) && irrVal >= 0 && irrVal <= 50;
                  const irrX = 50 + (irrVal / 50) * 430;

                  return (
                    <svg className="w-full h-full" viewBox="0 0 500 175">
                      <defs>
                        <linearGradient id="npvGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Top Grid & Label */}
                      <line x1="50" y1="15" x2="480" y2="15" stroke="#94a3b8" strokeDasharray="3 3" opacity="0.25" />
                      <text x="45" y="18" textAnchor="end" fontSize="8" fill="#64748b" fontFamily="sans-serif">
                        +${Math.round(maxNpv).toLocaleString()}
                      </text>

                      {/* Dynamic Zero Line ($NPV = $0) */}
                      <line x1="50" y1={zeroY} x2="480" y2={zeroY} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" />
                      <text x="45" y={zeroY + 3} textAnchor="end" fontSize="9" fontWeight="bold" fill="#2563eb" fontFamily="sans-serif">
                        $0
                      </text>

                      {/* Bottom Grid & Label */}
                      <line x1="50" y1="140" x2="480" y2="140" stroke="#94a3b8" strokeDasharray="3 3" opacity="0.25" />
                      <text x="45" y="143" textAnchor="end" fontSize="8" fill="#64748b" fontFamily="sans-serif">
                        -${Math.abs(Math.round(minNpv)).toLocaleString()}
                      </text>

                      {/* IRR Vertical Intercept Guide Line */}
                      {hasValidIrr && (
                        <>
                          <line x1={irrX} y1="15" x2={irrX} y2="145" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                          <circle cx={irrX} cy={zeroY} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                          <rect x={Math.max(10, Math.min(410, irrX - 35))} y="2" width="70" height="14" rx="3" fill="#10b981" />
                          <text
                            x={Math.max(10, Math.min(410, irrX - 35)) + 35}
                            y="12"
                            textAnchor="middle"
                            fontSize="8"
                            fontWeight="bold"
                            fill="#ffffff"
                            fontFamily="sans-serif"
                          >
                            IRR: {irrVal}%
                          </text>
                        </>
                      )}

                      {/* The Continuous NPV Curve */}
                      <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" />

                      {/* Data Dots along curve with tooltips */}
                      {coords.map((pt, idx) => (
                        <g key={idx} className="group cursor-pointer">
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="3"
                            fill={pt.npv >= 0 ? "#10b981" : "#ef4444"}
                            stroke="#ffffff"
                            strokeWidth="1"
                            className="transition-all hover:r-4.5"
                          />
                          <title>{`Rate: ${pt.rate}% | NPV: $${pt.npv.toLocaleString()}`}</title>
                        </g>
                      ))}

                      {/* X Axis Baseline */}
                      <line x1="50" y1="145" x2="480" y2="145" stroke="#64748b" strokeWidth="1" />

                      {/* X Axis Discount Rate Labels */}
                      <text x="50" y="160" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="sans-serif">0%</text>
                      <text x="136" y="160" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="sans-serif">10%</text>
                      <text x="222" y="160" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="sans-serif">20%</text>
                      <text x="308" y="160" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="sans-serif">30%</text>
                      <text x="394" y="160" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="sans-serif">40%</text>
                      <text x="480" y="160" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="sans-serif">50%</text>
                      <text x="265" y="172" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#64748b" fontFamily="sans-serif">
                        Discount Rate (%) &rarr;
                      </text>
                    </svg>
                  );
                })()}
              </div>
            </div>

            {/* SENSITIVITY MATRIX TABLE */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Discount Sensitivity Matrix
                </span>
                <button
                  type="button"
                  onClick={handleExportBox3CSV}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[11px] font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3 text-blue-600" /> Export CSV
                </button>
              </div>

              <div className="overflow-x-auto max-h-44 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
                <table className="w-full text-center border-collapse font-sans tabular-nums">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold sticky top-0">
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="p-1">Rate</th>
                      <th className="p-1">Net Present Value (NPV)</th>
                      <th className="p-1">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {b3CurvePoints.map((pt) => (
                      <tr key={pt.rate} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-1 font-bold text-slate-600 dark:text-slate-400">{pt.rate}%</td>
                        <td className={`p-1 font-bold ${pt.npv >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                          ${pt.npv.toLocaleString()}
                        </td>
                        <td className="p-1 text-[10px] font-bold">
                          {pt.npv >= 0 ? (
                            <span className="text-emerald-600">Value Add</span>
                          ) : (
                            <span className="text-red-600">Value Destroy</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 3 */}
          {savedBox3.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved NPV Profile Calculations ({savedBox3.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox3}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox3.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox3(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOX 4: MULTI-PROJECT CAPITAL BUDGETING COMPARATOR (PROJECT A VS B)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Multi-Project Capital Budgeting Comparator (Project A vs. Project B)</span>
          <button
            type="button"
            onClick={handleSaveBox4}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox4 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* INPUTS */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Competing Investment Proposals
              </span>

              {/* PROJECT A */}
              <div className="p-2.5 bg-blue-50/60 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900/50 space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase text-blue-700 dark:text-blue-300 block">
                  Project A (Front-Loaded / Early Payout)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Initial Outlay ($)</label>
                    <input
                      type="number"
                      value={b4OutlayA}
                      onChange={(e) => setB4OutlayA(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Annual Inflows ($)</label>
                    <input
                      type="text"
                      value={b4FlowsA}
                      onChange={(e) => setB4FlowsA(e.target.value)}
                      className={input3DClass}
                      placeholder="e.g. 5000, 20000, 25000, 40000, 60000"
                    />
                  </div>
                </div>
              </div>

              {/* PROJECT B */}
              <div className="p-2.5 bg-amber-50/60 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/50 space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase text-amber-700 dark:text-amber-300 block">
                  Project B (Back-Loaded / Late Payout)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Initial Outlay ($)</label>
                    <input
                      type="number"
                      value={b4OutlayB}
                      onChange={(e) => setB4OutlayB(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Annual Inflows ($)</label>
                    <input
                      type="text"
                      value={b4FlowsB}
                      onChange={(e) => setB4FlowsB(e.target.value)}
                      className={input3DClass}
                      placeholder="e.g. 0, 10000, 30000, 30000, 80000"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Cost of Capital / WACC (%)
                </label>
                <input
                  type="number"
                  step={0.1}
                  value={b4CostOfCapital}
                  onChange={(e) => setB4CostOfCapital(e.target.value)}
                  className={input3DClass}
                />
              </div>
            </div>

            {/* RESULTS */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Comparative Valuation &amp; Crossover Analysis
              </span>

              <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase font-bold">
                    Optimal Capital Allocation
                  </span>
                  <span className="text-2xl font-extrabold font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
                    Select {b4Calc.recommendedProject}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Fisher Crossover Rate</span>
                  <span className="font-extrabold text-blue-700 dark:text-blue-300 font-sans tabular-nums text-sm">
                    {b4Calc.crossoverRate}% / yr
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2.5 bg-blue-50/70 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900/50">
                  <span className="text-[10px] text-blue-600 block uppercase">Project A Metrics</span>
                  <div className="text-sm font-extrabold text-blue-700 dark:text-blue-300">IRR: {b4Calc.projectAIrr}%</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">NPV: ${b4Calc.projectANpv.toLocaleString()}</div>
                </div>

                <div className="p-2.5 bg-amber-50/70 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/50">
                  <span className="text-[10px] text-amber-600 block uppercase">Project B Metrics</span>
                  <div className="text-sm font-extrabold text-amber-700 dark:text-amber-300">IRR: {b4Calc.projectBIrr}%</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">NPV: ${b4Calc.projectBNpv.toLocaleString()}</div>
                </div>
              </div>

              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-300">
                {b4Calc.reasoning}
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleExportBox4CSV}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Export Comparison (CSV)</span>
                </button>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 4 */}
          {savedBox4.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Multi-Project Comparisons ({savedBox4.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox4}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox4.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox4(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOX 5: NON-CONVENTIONAL CASH FLOW & MULTIPLE IRR DETECTOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Non-Conventional Cash Flow &amp; Multiple IRR Detector</span>
          <button
            type="button"
            onClick={handleSaveBox5}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox5 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* INPUTS */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Cash Flow Stream (Comma-Separated)
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Enter Chronological Cash Flows ($)
                </label>
                <input
                  type="text"
                  value={b5FlowsText}
                  onChange={(e) => setB5FlowsText(e.target.value)}
                  className={input3DClass}
                  placeholder="e.g. -10000, 30000, -25000"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Cost of Capital (%)
                </label>
                <input
                  type="number"
                  step={0.5}
                  value={b5Hurdle}
                  onChange={(e) => setB5Hurdle(e.target.value)}
                  className={input3DClass}
                />
              </div>
            </div>

            {/* RESULTS */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Descartes&apos; Rule of Signs Diagnostic
              </span>

              <div
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  b5Calc.multiple
                    ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900/60"
                    : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-900/60"
                }`}
              >
                <div>
                  <span className="text-[10px] uppercase font-bold block text-slate-600 dark:text-slate-400">
                    Sign Changes Count
                  </span>
                  <span className="text-xl font-extrabold font-sans tabular-nums text-slate-900 dark:text-slate-100">
                    {b5Calc.signChanges} Sign Changes
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-extrabold inline-block ${
                      b5Calc.multiple
                        ? "bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200"
                        : "bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200"
                    }`}
                  >
                    {b5Calc.multiple ? "Multiple Real IRRs Possible" : "Single Real IRR"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Standard IRR</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">
                    {b5Calc.irr}% / yr
                  </span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Modified IRR (MIRR)</span>
                  <span className="text-blue-600 dark:text-blue-400 font-extrabold">
                    {b5Calc.mirr}% / yr
                  </span>
                </div>
              </div>

              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-300">
                {b5Calc.multiple
                  ? "Warning: When cash flows switch signs more than once, standard polynomial IRR can yield multiple conflicting rates of return. MIRR should be utilized for all capital budgeting decisions."
                  : "Normal cash flow sequence with a single initial investment outlay followed by positive return inflows."}
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 5 */}
          {savedBox5.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Sign Change Checks ({savedBox5.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox5}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox5.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox5(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
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

export default IrrCalculator;
