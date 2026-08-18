"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, Plus, Download, ChevronDown, ChevronUp, TrendingUp, DollarSign, Activity, BarChart2 } from "lucide-react";
import {
  calculateCashFlowReturn,
  calculateMultiPeriodReturn,
  calculateVolatilityAndRisk,
  calculateBenchmarkComparison,
  BENCHMARKS_LIST,
} from "@/app/calculators/average-return-calculator/calculator";
import { CashFlowRow, MultiPeriodLegRow, SavedAverageReturnItem } from "@/app/calculators/average-return-calculator/types";

export function AverageReturnCalculator() {
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
  // BOX 1: AVERAGE RETURN BASED ON CASH FLOW (MWRR / XIRR ENGINE)
  // =========================================================================
  const [b1StartBalance, setB1StartBalance] = useState<string>("5600");
  const [b1StartDate, setB1StartDate] = useState<string>("2023-01-01");
  const [b1EndBalance, setB1EndBalance] = useState<string>("18000");
  const [b1EndDate, setB1EndDate] = useState<string>("2026-08-17");
  const [b1Flows, setB1Flows] = useState<CashFlowRow[]>([
    { id: "1", type: "deposit", amount: 5000, date: "2024-01-15" },
    { id: "2", type: "withdraw", amount: 1500, date: "2024-06-01" },
    { id: "3", type: "deposit", amount: 3800, date: "2025-01-18" },
  ]);
  const [b1ShowLedger, setB1ShowLedger] = useState<boolean>(false);
  const [savedBox1, setSavedBox1] = useState<SavedAverageReturnItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);

  // =========================================================================
  // BOX 2: AVERAGE AND CUMULATIVE RETURN (MULTI-PERIOD TIME-WEIGHTED ENGINE)
  // =========================================================================
  const [b2Legs, setB2Legs] = useState<MultiPeriodLegRow[]>([
    { id: "1", returnPercent: 10, years: 1, months: 2 },
    { id: "2", returnPercent: -2, years: 0, months: 5 },
    { id: "3", returnPercent: 15, years: 2, months: 3 },
  ]);
  const [b2ShowSchedule, setB2ShowSchedule] = useState<boolean>(false);
  const [savedBox2, setSavedBox2] = useState<SavedAverageReturnItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);

  // =========================================================================
  // BOX 3: PORTFOLIO VOLATILITY & RISK-ADJUSTED METRIC TRACKER
  // =========================================================================
  const [b3ReturnsText, setB3ReturnsText] = useState<string>("14.5, -6.2, 21.0, 9.8, -12.4, 18.2, 7.5, 11.0");
  const [b3RiskFreeRate, setB3RiskFreeRate] = useState<string>("4.0");
  const [b3BenchmarkReturn, setB3BenchmarkReturn] = useState<string>("10.0");
  const [savedBox3, setSavedBox3] = useState<SavedAverageReturnItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);

  // =========================================================================
  // BOX 4: MARKET BENCHMARK & ASSET PERFORMANCE COMPARATOR
  // =========================================================================
  const [b4PortfolioReturn, setB4PortfolioReturn] = useState<string>("12.5");
  const [b4HorizonYears, setB4HorizonYears] = useState<string>("5");
  const [b4Capital, setB4Capital] = useState<string>("100000");
  const [b4BenchmarkId, setB4BenchmarkId] = useState<string>("sp500");
  const [savedBox4, setSavedBox4] = useState<SavedAverageReturnItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_ar_box1");
      if (s1) setSavedBox1(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_ar_box2");
      if (s2) setSavedBox2(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_ar_box3");
      if (s3) setSavedBox3(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_ar_box4");
      if (s4) setSavedBox4(JSON.parse(s4));
    } catch (e) {}
  }, []);

  // Box 1 Calculations
  const b1Calc = useMemo(() => {
    return calculateCashFlowReturn({
      startingBalance: parseFloat(b1StartBalance) || 0,
      startDate: b1StartDate,
      endingBalance: parseFloat(b1EndBalance) || 0,
      endDate: b1EndDate,
      cashFlows: b1Flows,
    });
  }, [b1StartBalance, b1StartDate, b1EndBalance, b1EndDate, b1Flows]);

  const handleAddFlowRow = () => {
    const nextDate = b1EndDate || "2025-01-01";
    setB1Flows([...b1Flows, { id: Date.now().toString(), type: "deposit", amount: 1000, date: nextDate }]);
  };

  const handleRemoveFlowRow = (id: string) => {
    setB1Flows(b1Flows.filter((r) => r.id !== id));
  };

  const handleUpdateFlow = (id: string, field: keyof CashFlowRow, value: any) => {
    setB1Flows(b1Flows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handleExportBox1CSV = () => {
    if (!b1Calc.ledger || b1Calc.ledger.length === 0) return;
    const headers = ["Date", "Transaction Type", "Cash Flow Amount ($)", "Running Net Invested ($)", "Days from Start", "Fractional Years"];
    const rows = b1Calc.ledger.map((r) => [
      r.date,
      r.type,
      r.cashFlowAmount,
      r.runningInvested,
      r.daysFromStart,
      r.fractionYears,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload(`portfolio_cash_flow_mwr_schedule.csv`, csv);
  };

  const handleSaveBox1 = () => {
    const inputsStr = `Start: $${b1StartBalance} (${b1StartDate}) | End: $${b1EndBalance} (${b1EndDate}) | ${b1Flows.length} Flow Rows`;
    const primaryStr = `Money-Weighted Return (MWRR / XIRR): ${b1Calc.mwrrPercent}% / yr | Total Gain: $${b1Calc.totalGainLoss.toLocaleString()}`;

    const detailsList = [
      `Money-Weighted Return (XIRR): ${b1Calc.mwrrPercent}% / year`,
      `Simple Accounting Rate of Return (ARR): ${b1Calc.arrPercent}% / year`,
      `Net Capital Invested: $${b1Calc.netInvested.toLocaleString()}`,
      `Total Net Dollar Gain: $${b1Calc.totalGainLoss.toLocaleString()}`,
      `Total Contributions: $${b1Calc.totalContributions.toLocaleString()} | Total Withdrawals: $${b1Calc.totalWithdrawals.toLocaleString()}`,
      `Tracking Horizon: ${b1Calc.totalDays} Days (${b1Calc.totalYears} Years)`,
    ];

    const newItem: SavedAverageReturnItem = {
      id: Date.now().toString(),
      title: "Cash Flow Money-Weighted Return (XIRR)",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox1.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_ar_box1", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleDeleteSavedBox1 = (id: string) => {
    const updated = savedBox1.filter((item) => item.id !== id);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_ar_box1", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox1 = () => {
    setSavedBox1([]);
    try {
      localStorage.removeItem("saved_ar_box1");
    } catch (e) {}
  };

  // Box 2 Calculations
  const b2Calc = useMemo(() => {
    return calculateMultiPeriodReturn({ legs: b2Legs });
  }, [b2Legs]);

  const handleAddLegRow = () => {
    setB2Legs([...b2Legs, { id: Date.now().toString(), returnPercent: 8.0, years: 1, months: 0 }]);
  };

  const handleRemoveLegRow = (id: string) => {
    setB2Legs(b2Legs.filter((l) => l.id !== id));
  };

  const handleUpdateLeg = (id: string, field: keyof MultiPeriodLegRow, value: any) => {
    setB2Legs(b2Legs.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const handleExportBox2CSV = () => {
    if (!b2Calc.schedule || b2Calc.schedule.length === 0) return;
    const headers = ["Period", "Stated Return (%)", "Holding Duration (Years)", "Cumulative Return (%)", "Growth Factor"];
    const rows = b2Calc.schedule.map((r) => [
      `Period ${r.period}`,
      `${r.returnPercent}%`,
      r.durationYears,
      `${r.cumulativeReturnPercent}%`,
      r.growthFactor,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload(`multi_period_return_schedule.csv`, csv);
  };

  const handleSaveBox2 = () => {
    const inputsStr = `${b2Legs.length} Holding Periods | Total Time: ${b2Calc.totalYears} Years`;
    const primaryStr = `Cumulative: ${b2Calc.cumulativeReturnPercent}% | Annualized Geometric (TWRR): ${b2Calc.annualizedGeometricReturnPercent}% / yr`;

    const detailsList = [
      `Total Cumulative Return: ${b2Calc.cumulativeReturnPercent}%`,
      `Annualized Geometric Time-Weighted Return (TWRR): ${b2Calc.annualizedGeometricReturnPercent}% / year`,
      `Arithmetic Average Return: ${b2Calc.arithmeticAverageReturnPercent}% / period`,
      `Annualized Arithmetic Return: ${b2Calc.annualizedArithmeticReturnPercent}% / year`,
      `Cumulative Wealth Multiplier: ${b2Calc.growthMultiplier}x`,
      `Total Holding Duration: ${b2Calc.totalYears} Years (${b2Calc.totalMonthsTotal} Months)`,
    ];

    const newItem: SavedAverageReturnItem = {
      id: Date.now().toString(),
      title: "Multi-Period Cumulative & Geometric Return",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox2.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_ar_box2", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  const handleDeleteSavedBox2 = (id: string) => {
    const updated = savedBox2.filter((item) => item.id !== id);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_ar_box2", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox2 = () => {
    setSavedBox2([]);
    try {
      localStorage.removeItem("saved_ar_box2");
    } catch (e) {}
  };

  // Box 3 Calculations
  const b3ParsedSeries = useMemo(() => {
    return b3ReturnsText
      .split(/[,;\s]+/)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));
  }, [b3ReturnsText]);

  const b3Calc = useMemo(() => {
    return calculateVolatilityAndRisk({
      returnsSeries: b3ParsedSeries,
      riskFreeRate: parseFloat(b3RiskFreeRate) || 0,
      benchmarkReturn: parseFloat(b3BenchmarkReturn) || 0,
    });
  }, [b3ParsedSeries, b3RiskFreeRate, b3BenchmarkReturn]);

  const handleExportBox3CSV = () => {
    const headers = ["Metric", "Value"];
    const rows = [
      ["Mean Return (%)", `${b3Calc.meanReturn}%`],
      ["Standard Deviation / Volatility (%)", `${b3Calc.standardDeviation}%`],
      ["Sharpe Ratio", b3Calc.sharpeRatio],
      ["Sortino Ratio", b3Calc.sortinoRatio],
      ["Maximum Drawdown (%)", `${b3Calc.maxDrawdownPercent}%`],
      ["Downside Deviation (%)", `${b3Calc.downsideDeviation}%`],
      ["Positive Periods Count", b3Calc.positivePeriods],
      ["Negative Periods Count", b3Calc.negativePeriods],
      ["Total Periods", b3Calc.totalPeriods],
    ];
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("portfolio_volatility_risk_metrics.csv", csv);
  };

  const handleSaveBox3 = () => {
    const inputsStr = `Returns (${b3Calc.totalPeriods} periods): [${b3ReturnsText}] | Rf: ${b3RiskFreeRate}%`;
    const primaryStr = `Volatility: ${b3Calc.standardDeviation}% | Sharpe: ${b3Calc.sharpeRatio} | Max Drawdown: ${b3Calc.maxDrawdownPercent}%`;

    const detailsList = [
      `Mean Period Return: ${b3Calc.meanReturn}%`,
      `Standard Deviation / Volatility: ${b3Calc.standardDeviation}%`,
      `Sharpe Ratio (Risk-Free: ${b3RiskFreeRate}%): ${b3Calc.sharpeRatio}`,
      `Sortino Ratio (Downside: ${b3Calc.downsideDeviation}%): ${b3Calc.sortinoRatio}`,
      `Maximum Portfolio Drawdown: ${b3Calc.maxDrawdownPercent}%`,
      `Winning Periods: ${b3Calc.positivePeriods} / ${b3Calc.totalPeriods} (${Math.round((b3Calc.positivePeriods / (b3Calc.totalPeriods || 1)) * 100)}%)`,
    ];

    const newItem: SavedAverageReturnItem = {
      id: Date.now().toString(),
      title: "Portfolio Volatility & Risk Metrics",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox3.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_ar_box3", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const handleDeleteSavedBox3 = (id: string) => {
    const updated = savedBox3.filter((item) => item.id !== id);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_ar_box3", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox3 = () => {
    setSavedBox3([]);
    try {
      localStorage.removeItem("saved_ar_box3");
    } catch (e) {}
  };

  // Box 4 Calculations
  const b4Calc = useMemo(() => {
    return calculateBenchmarkComparison({
      portfolioAnnualReturn: parseFloat(b4PortfolioReturn) || 0,
      timeHorizonYears: parseFloat(b4HorizonYears) || 0,
      startingCapital: parseFloat(b4Capital) || 0,
      selectedBenchmarkId: b4BenchmarkId,
    });
  }, [b4PortfolioReturn, b4HorizonYears, b4Capital, b4BenchmarkId]);

  const handleExportBox4CSV = () => {
    const headers = ["Asset Benchmark", "Annual Return (%)", "Ending Value ($)", "Total Profit ($)"];
    const rows = [
      ["Your Portfolio", `${b4PortfolioReturn}%`, b4Calc.portfolioFinalWealth, b4Calc.portfolioFinalWealth - (parseFloat(b4Capital) || 0)],
      ...b4Calc.comparisonTable.map((c) => [c.assetName, `${c.annualReturn}%`, c.endingValue, c.totalProfit]),
    ];
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("portfolio_vs_market_benchmark_comparison.csv", csv);
  };

  const handleSaveBox4 = () => {
    const inputsStr = `Portfolio: ${b4PortfolioReturn}%/yr | Principal: $${b4Capital} | Horizon: ${b4HorizonYears} Yrs vs ${b4Calc.benchmarkName}`;
    const primaryStr = `Alpha: ${b4Calc.alphaPercent > 0 ? "+" : ""}${b4Calc.alphaPercent}% | Wealth Advantage: ${b4Calc.wealthAdvantage >= 0 ? "+" : ""}$${b4Calc.wealthAdvantage.toLocaleString()}`;

    const detailsList = [
      `Your Portfolio Ending Wealth: $${b4Calc.portfolioFinalWealth.toLocaleString()}`,
      `${b4Calc.benchmarkName} Ending Wealth: $${b4Calc.benchmarkFinalWealth.toLocaleString()}`,
      `Portfolio Alpha Spread: ${b4Calc.alphaPercent > 0 ? "+" : ""}${b4Calc.alphaPercent}% / year`,
      `Net Wealth Advantage: ${b4Calc.wealthAdvantage >= 0 ? "+" : ""}$${b4Calc.wealthAdvantage.toLocaleString()}`,
      `Time Horizon: ${b4HorizonYears} Years | Initial Capital: $${parseFloat(b4Capital).toLocaleString()}`,
    ];

    const newItem: SavedAverageReturnItem = {
      id: Date.now().toString(),
      title: "Market Benchmark Performance Comparison",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox4.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_ar_box4", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  const handleDeleteSavedBox4 = (id: string) => {
    const updated = savedBox4.filter((item) => item.id !== id);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_ar_box4", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox4 = () => {
    setSavedBox4([]);
    try {
      localStorage.removeItem("saved_ar_box4");
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* =========================================================================
          BOX 1: AVERAGE RETURN BASED ON CASH FLOWS (MWRR / XIRR ENGINE)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Average Return Based on Cash Flows (Money-Weighted / XIRR Engine)</span>
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
            {/* LEFT: INPUTS & DYNAMIC ACTIVITY LOG */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Starting &amp; Ending Account State
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Starting Balance ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={b1StartBalance}
                    onChange={(e) => setB1StartBalance(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={b1StartDate}
                    onChange={(e) => setB1StartDate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Ending Balance ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={b1EndBalance}
                    onChange={(e) => setB1EndBalance(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={b1EndDate}
                    onChange={(e) => setB1EndDate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              {/* DYNAMIC CASH FLOW ROWS */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase text-slate-700 dark:text-slate-300">
                    Intermittent Deposits &amp; Withdrawals
                  </span>
                  <button
                    type="button"
                    onClick={handleAddFlowRow}
                    className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 text-[11px] font-bold flex items-center gap-1 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer border border-blue-200 dark:border-blue-800"
                  >
                    <Plus className="w-3 h-3" /> Add Flow Row
                  </button>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {b1Flows.map((flow, index) => (
                    <div key={flow.id} className="grid grid-cols-12 gap-1.5 items-center">
                      <div className="col-span-3">
                        <select
                          value={flow.type}
                          onChange={(e) => handleUpdateFlow(flow.id, "type", e.target.value)}
                          className={select3DClass}
                        >
                          <option value="deposit">Deposit (+)</option>
                          <option value="withdraw">Withdraw (-)</option>
                        </select>
                      </div>
                      <div className="col-span-4">
                        <input
                          type="number"
                          min={0}
                          step={100}
                          placeholder="Amount $"
                          value={flow.amount || ""}
                          onChange={(e) => handleUpdateFlow(flow.id, "amount", parseFloat(e.target.value) || 0)}
                          className={input3DClass}
                        />
                      </div>
                      <div className="col-span-4">
                        <input
                          type="date"
                          value={flow.date}
                          onChange={(e) => handleUpdateFlow(flow.id, "date", e.target.value)}
                          className={input3DClass}
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveFlowRow(flow.id)}
                          className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                          title="Delete Row"
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
                      Money-Weighted Return (MWRR / XIRR)
                    </span>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                      {b1Calc.mwrrPercent}% <span className="text-xs font-bold text-slate-500">/ year</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Accounting Rate (ARR)</span>
                    <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                      ARR: {b1Calc.arrPercent}% / yr
                    </span>
                  </div>
                </div>

                {/* PRIMARY METRICS GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold font-sans tabular-nums">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Net Capital Invested</span>
                    <span className="text-slate-900 dark:text-slate-100 font-extrabold">
                      ${b1Calc.netInvested.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Net Dollar Gain</span>
                    <span className={`font-extrabold ${b1Calc.totalGainLoss >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600"}`}>
                      {b1Calc.totalGainLoss >= 0 ? "+" : ""}${b1Calc.totalGainLoss.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Holding Duration</span>
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold">
                      {b1Calc.totalDays} Days ({b1Calc.totalYears}y)
                    </span>
                  </div>
                </div>

                {/* SUMMARY DETAILS */}
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium space-y-1">
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Total Periodic Deposits:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                      +${b1Calc.totalContributions.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Total Withdrawals / Redemptions:</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400 font-sans tabular-nums">
                      -${b1Calc.totalWithdrawals.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Final Ending Valuation:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                      ${parseFloat(b1EndBalance || "0").toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* TIMELINE VISUAL PROGRESSION */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> Cash Flow Progression Milestone Log
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  {b1Calc.ledger.slice(0, 4).map((row, idx) => (
                    <div key={idx} className="p-1.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">{row.type}</span>
                        <span className="text-[10px] text-slate-500">{row.date}</span>
                      </div>
                      <span className="font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
                        ${row.cashFlowAmount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SCHEDULE TOGGLE & CSV EXPORT */}
          <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setB1ShowLedger(!b1ShowLedger)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {b1ShowLedger ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{b1ShowLedger ? "Hide Cash Flow Ledger" : "View Cash Flow Valuation & Capital Ledger Table"}</span>
            </button>

            <button
              type="button"
              onClick={handleExportBox1CSV}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Export Ledger (CSV)</span>
            </button>
          </div>

          {b1ShowLedger && (
            <div className="mt-2 overflow-x-auto max-h-56 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold sticky top-0">
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="p-2">Date</th>
                    <th className="p-2">Activity Type</th>
                    <th className="p-2">Cash Flow Amount</th>
                    <th className="p-2">Running Net Invested</th>
                    <th className="p-2">Days from Start</th>
                    <th className="p-2">Fractional Years</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {b1Calc.ledger.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-1.5 font-bold text-slate-700 dark:text-slate-300">{row.date}</td>
                      <td className="p-1.5 text-blue-600 font-semibold">{row.type}</td>
                      <td className="p-1.5 font-extrabold">${row.cashFlowAmount.toLocaleString()}</td>
                      <td className="p-1.5 text-slate-600 dark:text-slate-400">${row.runningInvested.toLocaleString()}</td>
                      <td className="p-1.5">{row.daysFromStart} d</td>
                      <td className="p-1.5">{row.fractionYears} y</td>
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
                  <span>Saved Cash Flow Returns ({savedBox1.length})</span>
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
          BOX 2: AVERAGE & CUMULATIVE RETURN (MULTI-PERIOD TIME-WEIGHTED ENGINE)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Average and Cumulative Return (Multi-Period Time-Weighted Engine)</span>
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
              <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Multi-Period Holding Log
                </span>
                <button
                  type="button"
                  onClick={handleAddLegRow}
                  className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 text-[11px] font-bold flex items-center gap-1 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer border border-blue-200 dark:border-blue-800"
                >
                  <Plus className="w-3 h-3" /> Add Period Leg
                </button>
              </div>

              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                <div className="grid grid-cols-12 gap-2 text-[10px] font-bold uppercase text-slate-500 px-1">
                  <span className="col-span-1">#</span>
                  <span className="col-span-4">Stated Return (%)</span>
                  <span className="col-span-3">Years</span>
                  <span className="col-span-3">Months</span>
                  <span className="col-span-1 text-center">Del</span>
                </div>

                {b2Legs.map((leg, index) => (
                  <div key={leg.id} className="grid grid-cols-12 gap-1.5 items-center">
                    <span className="col-span-1 text-xs font-bold text-slate-400 text-center">{index + 1}.</span>
                    <div className="col-span-4">
                      <input
                        type="number"
                        step={0.1}
                        placeholder="Return %"
                        value={leg.returnPercent}
                        onChange={(e) => handleUpdateLeg(leg.id, "returnPercent", parseFloat(e.target.value) || 0)}
                        className={input3DClass}
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="number"
                        min={0}
                        step={1}
                        placeholder="Yrs"
                        value={leg.years}
                        onChange={(e) => handleUpdateLeg(leg.id, "years", parseInt(e.target.value) || 0)}
                        className={input3DClass}
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="number"
                        min={0}
                        max={11}
                        step={1}
                        placeholder="Mos"
                        value={leg.months}
                        onChange={(e) => handleUpdateLeg(leg.id, "months", parseInt(e.target.value) || 0)}
                        className={input3DClass}
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveLegRow(leg.id)}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RESULTS */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Total Cumulative Return
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    {b2Calc.cumulativeReturnPercent > 0 ? "+" : ""}{b2Calc.cumulativeReturnPercent}%
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Annualized (TWRR)</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                    {b2Calc.annualizedGeometricReturnPercent}% / yr
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Geometric Mean</span>
                  <span className="text-blue-600 dark:text-blue-400 font-extrabold">
                    {b2Calc.annualizedGeometricReturnPercent}% / yr
                  </span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Arithmetic Average</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">
                    {b2Calc.arithmeticAverageReturnPercent}% / leg
                  </span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Growth Factor</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                    {b2Calc.growthMultiplier}x
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium space-y-1">
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Total Holding Horizon:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    {b2Calc.totalYears} Years ({b2Calc.totalMonthsTotal} Months)
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Annualized Arithmetic Rate:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    {b2Calc.annualizedArithmeticReturnPercent}% / year
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SCHEDULE TOGGLE & CSV EXPORT */}
          <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setB2ShowSchedule(!b2ShowSchedule)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {b2ShowSchedule ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{b2ShowSchedule ? "Hide Period Schedule" : "View Period-by-Period Cumulative Progression Schedule"}</span>
            </button>

            <button
              type="button"
              onClick={handleExportBox2CSV}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Export Schedule (CSV)</span>
            </button>
          </div>

          {b2ShowSchedule && (
            <div className="mt-2 overflow-x-auto max-h-56 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold sticky top-0">
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="p-2">Period Leg</th>
                    <th className="p-2">Period Return</th>
                    <th className="p-2">Duration (Years)</th>
                    <th className="p-2">Cumulative Return</th>
                    <th className="p-2">Growth Factor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {b2Calc.schedule.map((row) => (
                    <tr key={row.period} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-1.5 font-bold text-slate-700 dark:text-slate-300">Period {row.period}</td>
                      <td className={`p-1.5 font-bold ${row.returnPercent >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {row.returnPercent > 0 ? "+" : ""}{row.returnPercent}%
                      </td>
                      <td className="p-1.5">{row.durationYears} yrs</td>
                      <td className="p-1.5 font-extrabold text-blue-600">{row.cumulativeReturnPercent}%</td>
                      <td className="p-1.5 text-slate-600 dark:text-slate-400">{row.growthFactor}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* SAVED CALCULATIONS INSIDE BOX 2 */}
          {savedBox2.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Multi-Period Calculations ({savedBox2.length})</span>
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
          BOX 3: ADVANCED PORTFOLIO VOLATILITY & RISK-ADJUSTED METRICS
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Advanced Portfolio Volatility &amp; Risk-Adjusted Metric Tracker</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* INPUTS */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Returns Series &amp; Risk Parameters
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Returns Series (% separated by commas)
                </label>
                <input
                  type="text"
                  value={b3ReturnsText}
                  onChange={(e) => setB3ReturnsText(e.target.value)}
                  className={input3DClass}
                  placeholder="e.g. 14.5, -6.2, 21.0, 9.8, -12.4, 18.2"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Risk-Free Rate (%)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={b3RiskFreeRate}
                    onChange={(e) => setB3RiskFreeRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Benchmark Return (%)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={b3BenchmarkReturn}
                    onChange={(e) => setB3BenchmarkReturn(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Risk-Adjusted Performance Ratios
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/50">
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">Standard Deviation</span>
                  <span className="text-lg font-extrabold text-blue-700 dark:text-blue-300">
                    {b3Calc.standardDeviation}%
                  </span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block uppercase">Sharpe Ratio</span>
                  <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                    {b3Calc.sharpeRatio}
                  </span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block uppercase">Max Drawdown</span>
                  <span className="text-lg font-extrabold text-amber-600 dark:text-amber-400">
                    {b3Calc.maxDrawdownPercent}%
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium space-y-1">
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Mean Period Return:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    {b3Calc.meanReturn}%
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Sortino Ratio (Downside: {b3Calc.downsideDeviation}%):</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                    {b3Calc.sortinoRatio}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Win Rate (Positive Periods):</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums">
                    {b3Calc.positivePeriods} / {b3Calc.totalPeriods} ({Math.round((b3Calc.positivePeriods / (b3Calc.totalPeriods || 1)) * 100)}%)
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleExportBox3CSV}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Export Risk Metrics (CSV)</span>
                </button>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 3 */}
          {savedBox3.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Volatility &amp; Risk Metrics ({savedBox3.length})</span>
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
          BOX 4: MARKET BENCHMARK & ASSET PERFORMANCE COMPARATOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Market Benchmark &amp; Asset Performance Comparator</span>
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
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Benchmark Comparison Parameters
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Portfolio Return (%/yr)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={b4PortfolioReturn}
                    onChange={(e) => setB4PortfolioReturn(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Horizon (Years)
                  </label>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={b4HorizonYears}
                    onChange={(e) => setB4HorizonYears(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Initial Capital ($)
                </label>
                <input
                  type="number"
                  step={1000}
                  value={b4Capital}
                  onChange={(e) => setB4Capital(e.target.value)}
                  className={input3DClass}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Primary Benchmark Index
                </label>
                <select
                  value={b4BenchmarkId}
                  onChange={(e) => setB4BenchmarkId(e.target.value)}
                  className={select3DClass}
                >
                  {BENCHMARKS_LIST.map((bm) => (
                    <option key={bm.id} value={bm.id}>
                      {bm.name} ({bm.historicalAnnualReturn}%/yr)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* RESULTS */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Performance Alpha &amp; Ending Wealth Spread
              </span>

              <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase font-bold">
                    Portfolio Performance Alpha
                  </span>
                  <span className={`text-2xl font-extrabold font-sans tabular-nums ${b4Calc.alphaPercent >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600"}`}>
                    {b4Calc.alphaPercent >= 0 ? "+" : ""}{b4Calc.alphaPercent}% <span className="text-xs text-slate-500">vs {b4Calc.benchmarkName}</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Wealth Advantage</span>
                  <span className="font-extrabold text-blue-700 dark:text-blue-300 font-sans tabular-nums text-sm">
                    {b4Calc.wealthAdvantage >= 0 ? "+" : ""}${b4Calc.wealthAdvantage.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* BENCHMARKS TABLE */}
              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
                <table className="w-full text-center border-collapse font-sans tabular-nums">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="p-1.5 text-left pl-2">Asset Class / Index</th>
                      <th className="p-1.5">Annual Return</th>
                      <th className="p-1.5">Ending Wealth</th>
                      <th className="p-1.5">Total Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr className="bg-blue-50/70 dark:bg-blue-950/60 font-bold">
                      <td className="p-1.5 text-left pl-2 text-blue-700 dark:text-blue-300 font-extrabold">Your Portfolio</td>
                      <td className="p-1.5 text-blue-700 dark:text-blue-300">{b4PortfolioReturn}%</td>
                      <td className="p-1.5 text-blue-700 dark:text-blue-300 font-extrabold">${b4Calc.portfolioFinalWealth.toLocaleString()}</td>
                      <td className="p-1.5 text-emerald-600 font-extrabold">+${(b4Calc.portfolioFinalWealth - (parseFloat(b4Capital) || 0)).toLocaleString()}</td>
                    </tr>
                    {b4Calc.comparisonTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-1.5 text-left pl-2 text-slate-700 dark:text-slate-300">{row.assetName}</td>
                        <td className="p-1.5">{row.annualReturn}%</td>
                        <td className="p-1.5 font-bold text-slate-800 dark:text-slate-200">${row.endingValue.toLocaleString()}</td>
                        <td className="p-1.5 text-slate-600 dark:text-slate-400">+${row.totalProfit.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleExportBox4CSV}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Export Benchmark Data (CSV)</span>
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
                  <span>Saved Benchmark Comparisons ({savedBox4.length})</span>
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
    </div>
  );
}

export default AverageReturnCalculator;
