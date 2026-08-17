"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Calculator as CalcIcon,
  PieChart as PieIcon,
  Clock,
  Sparkles,
  Printer,
  Share2,
  Bookmark,
  Award,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sliders,
  RotateCcw,
  ArrowRight,
  Gauge,
  Percent,
  Zap,
  BookOpen,
  HelpCircle,
  BarChart3,
  Layers,
  Repeat,
  Download,
  Copy,
  Check,
  Search,
  Target,
  Flame,
  Umbrella,
  Activity,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import {
  calculateRoiFormula,
  RoiType,
  RoiFormulaInput,
  RoiFormulaResult,
} from "@/lib/calculator-engine/formulas/roi";
import { generateRoiReportData } from "@/lib/report-generator/roi-report";
import { formatCurrency, formatPercent } from "@/lib/calculator-engine/formatters";

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

export function RoiCalculator() {
  // Mode Selection State
  const [activeTab, setActiveTab] = useState<RoiType | "sensitivity">("standard");

  // Core Inputs State
  const [amountInvested, setAmountInvested] = useState<number>(1000);
  const [amountReturned, setAmountReturned] = useState<number>(2000);
  const [timeMode, setTimeMode] = useState<"length" | "dates">("length");
  const [years, setYears] = useState<number>(4.395);
  const [fromDate, setFromDate] = useState<string>("2026-08-09");
  const [toDate, setToDate] = useState<string>("2030-12-31");
  const [targetRoi, setTargetRoi] = useState<number>(100);
  const [taxRate, setTaxRate] = useState<number>(15);
  const [inflationRate, setInflationRate] = useState<number>(4);

  // Scenario B inputs
  const [amountInvestedB, setAmountInvestedB] = useState<number>(1000);
  const [amountReturnedB, setAmountReturnedB] = useState<number>(2800);
  const [yearsB, setYearsB] = useState<number>(4.395);

  // Schedule Table Controls State
  const [scheduleView, setScheduleView] = useState<"annual" | "monthly">("annual");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<string>("year");
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Actions & Report Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);

  // Derived calculation results
  const results: RoiFormulaResult = useMemo(() => {
    const calcType: RoiType = activeTab === "sensitivity" ? "standard" : activeTab;
    return calculateRoiFormula({
      roiType: calcType,
      amountInvested,
      amountReturned,
      timeMode,
      years,
      fromDate,
      toDate,
      targetRoi,
      taxRate,
      inflationRate,
      amountInvestedB,
      amountReturnedB,
      yearsB,
    });
  }, [
    activeTab,
    amountInvested,
    amountReturned,
    timeMode,
    years,
    fromDate,
    toDate,
    targetRoi,
    taxRate,
    inflationRate,
    amountInvestedB,
    amountReturnedB,
    yearsB,
  ]);

  // Report Data
  const reportData = useMemo(() => {
    const calcType: RoiType = activeTab === "sensitivity" ? "standard" : activeTab;
    return generateRoiReportData(
      {
        roiType: calcType,
        amountInvested,
        amountReturned,
        timeMode,
        years,
        fromDate,
        toDate,
        targetRoi,
        taxRate,
        inflationRate,
      },
      results
    );
  }, [
    activeTab,
    amountInvested,
    amountReturned,
    timeMode,
    years,
    fromDate,
    toDate,
    targetRoi,
    taxRate,
    inflationRate,
    results,
  ]);

  // Doughnut Chart Data
  const doughnutData = useMemo(() => {
    return [
      { name: "Invested Capital", value: results.amountInvested, color: "#3b82f6" },
      { name: "Net Profit / Gain", value: Math.max(0, results.netProfit), color: "#10b981" },
    ];
  }, [results]);

  // Growth Trajectory Chart Data
  const chartData = useMemo(() => {
    return results.annualSchedule.map((row: any) => ({
      year: `Yr ${row.year}`,
      "Nominal Value": row.endingValue,
      "Real Purchasing Power": row.realEndingValue,
      "Invested Capital": results.amountInvested,
    }));
  }, [results]);

  // Handle Copy Summary
  const handleCopy = () => {
    const summary = `CalcPlatform Return on Investment (ROI) Summary:
- Total ROI: ${results.roiPercent}%
- Annualized ROI: ${results.annualizedRoiPercent}%
- Net Profit / Gain: ${formatCurrency(results.netProfit)}
- Amount Invested: ${formatCurrency(results.amountInvested)}
- Amount Returned: ${formatCurrency(results.amountReturned)} (${results.years} Years)
- Inflation-Adjusted Real Annualized ROI: ${results.realAnnualizedRoiPercent}%`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  // Handle Export CSV / Excel / JSON
  const handleExportData = (format: "csv" | "excel" | "json") => {
    if (format === "json") {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `ROI_Calculation_Results.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      return;
    }

    const rows = scheduleView === "annual" ? results.annualSchedule : results.monthlySchedule;
    if (rows.length === 0) return;
    const headers = Object.keys(rows[0]).join(",");
    const csvLines = rows.map((r) => Object.values(r).join(","));
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...csvLines].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ROI_Schedule_${scheduleView}_${format === "excel" ? "export.xlsx" : "export.csv"}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset Handler
  const handleReset = () => {
    setAmountInvested(1000);
    setAmountReturned(2000);
    setTimeMode("length");
    setYears(4.395);
    setFromDate("2026-08-09");
    setToDate("2030-12-31");
    setTargetRoi(100);
    setTaxRate(15);
    setInflationRate(4);
    setAmountInvestedB(1000);
    setAmountReturnedB(2800);
    setYearsB(4.395);
  };

  // Table filtering and pagination logic
  const filteredScheduleRows = useMemo(() => {
    let rows: any[] = scheduleView === "annual" ? [...results.annualSchedule] : [...results.monthlySchedule];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      rows = rows.filter((r) => {
        return Object.values(r).some((val) => String(val).toLowerCase().includes(q));
      });
    }

    rows.sort((a, b) => {
      const valA = a[sortField] ?? 0;
      const valB = b[sortField] ?? 0;
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return rows;
  }, [results, scheduleView, searchQuery, sortField, sortAsc]);

  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(filteredScheduleRows.length / itemsPerPage));
  const paginatedScheduleRows = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredScheduleRows.slice(start, start + itemsPerPage);
  }, [filteredScheduleRows, currentPage]);

  return (
    <div className="space-y-6">
      {/* 1. TOP MODE SWITCHER TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-xl shadow-xs">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => { setActiveTab("standard"); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "standard"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" /> Standard ROI
          </button>
          <button
            onClick={() => { setActiveTab("goal"); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "goal"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Target className="h-3.5 w-3.5" /> Target ROI Goal
          </button>
          <button
            onClick={() => { setActiveTab("scenario"); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "scenario"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-purple-200" /> Scenario A vs B
          </button>
          <button
            onClick={() => { setActiveTab("benchmark"); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "benchmark"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Award className="h-3.5 w-3.5" /> Asset Benchmarks
          </button>
          <button
            onClick={() => { setActiveTab("sensitivity"); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "sensitivity"
                ? "bg-rose-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" /> What-If Matrix
          </button>
        </div>

        {/* Global Toolbar Actions */}
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-8 text-xs gap-1 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="h-8 text-xs gap-1 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 cursor-pointer"
          >
            {shared ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
            {shared ? "Shared" : "Share"}
          </Button>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => setIsReportModalOpen(true)}
            className="h-8 text-xs gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" /> Print / PDF
          </Button>
        </div>
      </div>

      {/* 2. MAIN CALCULATOR LAYOUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: PARAMETER INPUT CONTROLS PANEL (Col 5) */}
        <div className="lg:col-span-5 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h2 className="text-sm font-bold tracking-tight text-blue-600 dark:text-blue-400 flex items-center gap-2"><span>Investment Parameters</span>
            </h2>
            <button
              onClick={handleReset}
              className="text-xs text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Amount Invested (PV) */}
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Amount Invested (Initial Cost)</span>
                <span className="font-bold text-blue-600">{formatCurrency(amountInvested)}</span>
              </label>
              <Input
                type="number"
                value={amountInvested}
                onChange={(e) => setAmountInvested(Number(e.target.value))}
                className="h-9 text-xs font-sans tabular-nums"
              />
              <input
                type="range"
                min="100"
                max="500000"
                step="500"
                value={amountInvested}
                onChange={(e) => setAmountInvested(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Amount Returned (FV) - Only for standard, scenario, benchmark, sensitivity */}
            {activeTab !== "goal" && (
              <div className="space-y-1.5">
                <label className="font-medium text-zinc-700 dark:text-zinc-300 flex justify-between">
                  <span>Amount Returned (Final Value)</span>
                  <span className="font-bold text-emerald-600">{formatCurrency(amountReturned)}</span>
                </label>
                <Input
                  type="number"
                  value={amountReturned}
                  onChange={(e) => setAmountReturned(Number(e.target.value))}
                  className="h-9 text-xs font-sans tabular-nums"
                />
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="1000"
                  value={amountReturned}
                  onChange={(e) => setAmountReturned(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            )}

            {/* Target ROI Goal % Input (Only when Goal tab active) */}
            {activeTab === "goal" && (
              <div className="space-y-1.5 bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-100 dark:border-amber-950">
                <label className="font-bold text-amber-900 dark:text-amber-300 flex justify-between">
                  <span>Target Desired ROI (%)</span>
                  <span>{targetRoi}%</span>
                </label>
                <Input
                  type="number"
                  step="5"
                  value={targetRoi}
                  onChange={(e) => setTargetRoi(Number(e.target.value))}
                  className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900"
                />
              </div>
            )}

            {/* TIME HORIZON MODE TOGGLE: "Use Length" vs "Use Dates" */}
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <label className="font-medium text-zinc-700 dark:text-zinc-300 block">Investment Time Mode</label>
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl text-xs gap-1">
                <button
                  type="button"
                  onClick={() => setTimeMode("length")}
                  className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                    timeMode === "length" ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs" : "text-zinc-500"
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" /> Use Length
                </button>
                <button
                  type="button"
                  onClick={() => setTimeMode("dates")}
                  className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                    timeMode === "dates" ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs" : "text-zinc-500"
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5" /> Use Dates
                </button>
              </div>

              {timeMode === "length" ? (
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between font-medium text-zinc-700 dark:text-zinc-300">
                    <span>Investment Length (Years)</span>
                    <span className="font-bold text-purple-600">{years} Years</span>
                  </div>
                  <Input
                    type="number"
                    step="0.1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="h-8 text-xs font-sans tabular-nums"
                  />
                  <input
                    type="range"
                    min="0.1"
                    max="30"
                    step="0.1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="space-y-1">
                    <label className="font-medium text-zinc-700 dark:text-zinc-300 text-[11px]">From Date</label>
                    <Input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="h-8 text-xs font-sans tabular-nums"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-medium text-zinc-700 dark:text-zinc-300 text-[11px]">To Date</label>
                    <Input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="h-8 text-xs font-sans tabular-nums"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Scenario B Inputs (Only when Scenario tab active) */}
            {activeTab === "scenario" && (
              <div className="pt-2 border-t border-purple-100 dark:border-purple-950 space-y-3 bg-purple-50/50 dark:bg-purple-950/20 p-3 rounded-xl">
                <span className="font-bold text-purple-900 dark:text-purple-300 block text-xs">Scenario B Parameters</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-medium text-purple-800 dark:text-purple-300">Invested B ($)</label>
                    <Input
                      type="number"
                      value={amountInvestedB}
                      onChange={(e) => setAmountInvestedB(Number(e.target.value))}
                      className="h-7 text-xs bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-purple-800 dark:text-purple-300">Returned B ($)</label>
                    <Input
                      type="number"
                      value={amountReturnedB}
                      onChange={(e) => setAmountReturnedB(Number(e.target.value))}
                      className="h-7 text-xs bg-white dark:bg-zinc-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Options: Tax & Inflation */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-medium text-zinc-700 dark:text-zinc-300">Capital Gains Tax (%)</label>
                <Input
                  type="number"
                  step="1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="h-8 text-xs font-sans tabular-nums"
                />
              </div>
              <div className="space-y-1">
                <label className="font-medium text-zinc-700 dark:text-zinc-300">Inflation Rate (%)</label>
                <Input
                  type="number"
                  step="0.5"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="h-8 text-xs font-sans tabular-nums"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DASHBOARD & RESULTS (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* PRIMARY KPI SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className={`p-4 rounded-2xl shadow-sm space-y-1 min-w-0 ${
              results.roiPercent >= 0 ? "bg-blue-600 text-white" : "bg-rose-600 text-white"
            }`}>
              <span className="text-xs font-semibold text-blue-100 block uppercase tracking-wider leading-tight">
                Total ROI Percentage
              </span>
              <div className="text-xl sm:text-2xl font-black tracking-tight font-sans tabular-nums leading-snug break-words my-0.5">
                {results.roiPercent}%
              </div>
              <span className="text-[11px] text-blue-200 block leading-tight">Total net return</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-1 min-w-0">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider leading-tight">
                Annualized ROI
              </span>
              <div className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 tracking-tight font-sans tabular-nums leading-snug break-words my-0.5">
                {results.annualizedRoiPercent}%
              </div>
              <span className="text-[11px] text-zinc-400 block leading-tight">{results.years} Years tenure</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-1 min-w-0">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider leading-tight">
                Net Dollar Gain / Profit
              </span>
              <div className={`text-base sm:text-lg font-black tracking-tight font-sans tabular-nums leading-snug break-words my-0.5 ${
                results.netProfit >= 0 ? "text-purple-600 dark:text-purple-400" : "text-rose-600"
              }`}>
                {formatCurrency(results.netProfit)}
              </div>
              <span className="text-[11px] text-zinc-400 block leading-tight">{results.wealthMultiplier}x Wealth Multiplier</span>
            </div>
          </div>

          {/* SECONDARY METRICS BAR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-200/60 dark:border-zinc-800 text-xs">
            <div className="overflow-hidden">
              <span className="text-zinc-400 text-[10px] block">Real Annualized ROI</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 font-sans tabular-nums block">{results.realAnnualizedRoiPercent}%</span>
            </div>
            <div className="overflow-hidden">
              <span className="text-zinc-400 text-[10px] block">Real Purchasing Power</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums block">{formatCurrency(results.realEndingValue)}</span>
            </div>
            <div className="overflow-hidden">
              <span className="text-zinc-400 text-[10px] block">Post-Tax Final Value</span>
              <span className="font-bold text-blue-600 font-sans tabular-nums block">{formatCurrency(results.postTaxFinalValue)}</span>
            </div>
            <div className="overflow-hidden">
              <span className="text-zinc-400 text-[10px] block">ROI Health Rating</span>
              <span className="font-bold text-emerald-600 block">{results.healthRating} ({results.roiHealthScore}/100)</span>
            </div>
          </div>

          {/* SCENARIO COMPARISON TAB PANEL */}
          {activeTab === "scenario" && results.scenarioB && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-3 text-xs">
              <h3 className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">Scenario A vs. Scenario B Comparison
              </h3>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 rounded-xl space-y-1">
                  <span className="font-bold text-blue-900 dark:text-blue-200 block text-xs">Scenario A</span>
                  <div>Invested: {formatCurrency(results.amountInvested)}</div>
                  <div>Returned: {formatCurrency(results.amountReturned)}</div>
                  <div className="font-bold text-blue-600">Total ROI: {results.roiPercent}%</div>
                  <div className="font-bold text-emerald-600">Annualized: {results.annualizedRoiPercent}%</div>
                </div>
                <div className="p-3 bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 rounded-xl space-y-1">
                  <span className="font-bold text-purple-900 dark:text-purple-200 block text-xs">Scenario B</span>
                  <div>Invested: {formatCurrency(results.scenarioB.amountInvested)}</div>
                  <div>Returned: {formatCurrency(results.scenarioB.amountReturned)}</div>
                  <div className="font-bold text-purple-600">Total ROI: {results.scenarioB.roiPercent}%</div>
                  <div className="font-bold text-emerald-600">Annualized: {results.scenarioB.annualizedRoiPercent}%</div>
                </div>
              </div>
            </div>
          )}

          {/* ASSET BENCHMARK TAB PANEL */}
          {activeTab === "benchmark" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-3 text-xs">
              <h3 className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">Historical Asset Class Benchmarks
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-[11px]">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700 font-bold">Asset Class</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700 font-bold text-indigo-600">Total ROI</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600">Projected Final Value</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700 font-bold text-emerald-600">Net Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-sans tabular-nums">
                    {results.benchmarkComparisons.map((b, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                        <td className="p-2 font-sans font-bold text-zinc-900 dark:text-zinc-100">{b.assetClass}</td>
                        <td className="p-2 text-indigo-600 font-bold">{b.historicalRoi}%</td>
                        <td className="p-2 text-blue-600 font-bold">{formatCurrency(b.projectedAmountReturned)}</td>
                        <td className="p-2 text-emerald-600 font-bold">{formatCurrency(b.netProfit)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SENSITIVITY MATRIX TAB PANEL */}
          {activeTab === "sensitivity" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-3 text-xs">
              <h3 className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">What-If Sensitivity Matrix (Returns vs Tenure)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-[10px]">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800">
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700">Ann. Return</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700">1 Yr</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700">2 Yrs</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700">3 Yrs</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700">5 Yrs</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700">10 Yrs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[5, 10, 15, 20, 25, 50, 100].map((r) => (
                      <tr key={r} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-sans tabular-nums">
                        <td className="p-2 font-bold border border-zinc-200 dark:border-zinc-800">{r}%</td>
                        {[1, 2, 3, 5, 10].map((t) => {
                          const cell = results.sensitivityMatrix.find((c) => c.returnRate === r && c.tenureYears === t);
                          return (
                            <td key={t} className="p-2 border border-zinc-200 dark:border-zinc-800">
                              {cell ? formatCurrency(cell.amountReturned) : "-"}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. CHARTS SECTION */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center justify-between">
              <span>ROI Breakdown & Growth Trajectory Visualizer</span>
              <span className="text-[10px] text-zinc-400 font-normal">Real-time simulation</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Doughnut Chart (Col 5) */}
              <div className="md:col-span-5 h-52 flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={doughnutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {doughnutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-3 text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Invested
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Net Profit
                  </span>
                </div>
              </div>

              {/* Area Growth Chart (Col 7) */}
              <div className="md:col-span-7 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                    <YAxis tickFormatter={(v) => `$${v / 1000}k`} tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                    <Area type="monotone" dataKey="Nominal Value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="Real Purchasing Power" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 4. INTERACTIVE SCHEDULE BREAKDOWN TABLE */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-blue-600 dark:text-blue-400">Growth Trajectory Table</h3>
                <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-[10px]">
                  <button
                    onClick={() => { setScheduleView("annual"); setCurrentPage(1); }}
                    className={`px-2 py-1 rounded-md font-semibold cursor-pointer ${scheduleView === "annual" ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs" : "text-zinc-500"}`}
                  >
                    Annual
                  </button>
                  <button
                    onClick={() => { setScheduleView("monthly"); setCurrentPage(1); }}
                    className={`px-2 py-1 rounded-md font-semibold cursor-pointer ${scheduleView === "monthly" ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs" : "text-zinc-500"}`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Table Search & Exports */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-400" />
                  <Input
                    type="text"
                    placeholder="Search table..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="pl-7 h-7 text-[11px] w-36"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExportData("csv")}
                  className="h-7 text-[11px] gap-1 cursor-pointer"
                >
                  <Download className="h-3 w-3" /> CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExportData("excel")}
                  className="h-7 text-[11px] gap-1 cursor-pointer"
                >
                  <Download className="h-3 w-3 text-emerald-600" /> Excel
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-800/60 text-slate-800 dark:text-slate-200 font-semibold font-semibold border-b border-zinc-200 dark:border-zinc-800">
                    {scheduleView === "annual" ? (
                      <>
                        <th className="p-2">Year</th>
                        <th className="p-2">Starting Capital</th>
                        <th className="p-2">Annual Growth ($)</th>
                        <th className="p-2">Nominal Ending Value</th>
                        <th className="p-2">Real Purchasing Power</th>
                        <th className="p-2">Cumulative ROI</th>
                      </>
                    ) : (
                      <>
                        <th className="p-2">Month</th>
                        <th className="p-2">Year</th>
                        <th className="p-2">Starting Capital</th>
                        <th className="p-2">Monthly Growth ($)</th>
                        <th className="p-2">Ending Value</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums">
                  {paginatedScheduleRows.length > 0 ? (
                    paginatedScheduleRows.map((r: any, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                        {scheduleView === "annual" ? (
                          <>
                            <td className="p-2 font-bold text-zinc-900 dark:text-zinc-100">Yr {r.year}</td>
                            <td className="p-2">{formatCurrency(r.startingValue)}</td>
                            <td className="p-2 text-emerald-600">{formatCurrency(r.annualGrowth)}</td>
                            <td className="p-2 font-bold text-blue-600">{formatCurrency(r.endingValue)}</td>
                            <td className="p-2 text-amber-600">{formatCurrency(r.realEndingValue)}</td>
                            <td className="p-2 text-purple-600 font-bold">{r.cumulativeRoiPercent}%</td>
                          </>
                        ) : (
                          <>
                            <td className="p-2 font-bold">M{r.month}</td>
                            <td className="p-2">Yr {r.year}</td>
                            <td className="p-2">{formatCurrency(r.startingValue)}</td>
                            <td className="p-2 text-emerald-600">{formatCurrency(r.monthlyGrowth)}</td>
                            <td className="p-2 font-bold text-blue-600">{formatCurrency(r.endingValue)}</td>
                          </>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-zinc-400 font-sans">
                        No rows found matching search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] font-sans">
                <span className="text-zinc-500">
                  Page {currentPage} of {totalPages} ({filteredScheduleRows.length} total rows)
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="h-6 text-[10px] px-2 cursor-pointer"
                  >
                    <ChevronLeft className="h-3 w-3" /> Prev
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="h-6 text-[10px] px-2 cursor-pointer"
                  >
                    Next <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportData={reportData}
      />
    </div>
  );
}
