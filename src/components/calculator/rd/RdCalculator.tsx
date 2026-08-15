"use client";

import React, { useState, useMemo } from "react";
import {
  RefreshCw,
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
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import {
  calculateRdFormula,
  RdType,
  RdFormulaInput,
  RdFormulaResult,
} from "@/lib/calculator-engine/formulas/rd";
import { generateRdReportData } from "@/lib/report-generator/rd-report";
import { formatCurrency, formatPercent } from "@/lib/calculator-engine/formatters";

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

export function RdCalculator() {
  // Mode Selection State
  const [activeTab, setActiveTab] = useState<RdType | "sensitivity">("regular");

  // Core Inputs State
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(500);
  const [interestRate, setInterestRate] = useState<number>(6.8);
  const [tenureMonths, setTenureMonths] = useState<number>(24);
  const [stepUpRate, setStepUpRate] = useState<number>(10);
  const [stepUpAmount, setStepUpAmount] = useState<number>(0);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState<boolean>(false);
  const [taxRate, setTaxRate] = useState<number>(10.0);
  const [inflationRate, setInflationRate] = useState<number>(4.0);
  const [targetMaturityAmount, setTargetMaturityAmount] = useState<number>(15000);

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
  const results: RdFormulaResult = useMemo(() => {
    const calcType: RdType = activeTab === "sensitivity" ? "regular" : activeTab;
    return calculateRdFormula({
      rdType: calcType,
      monthlyDeposit,
      interestRate,
      tenureMonths,
      stepUpRate: activeTab === "stepup" ? stepUpRate : 0,
      stepUpAmount: activeTab === "stepup" ? stepUpAmount : 0,
      isSeniorCitizen,
      taxRate,
      inflationRate,
      targetMaturityAmount,
    });
  }, [
    activeTab,
    monthlyDeposit,
    interestRate,
    tenureMonths,
    stepUpRate,
    stepUpAmount,
    isSeniorCitizen,
    taxRate,
    inflationRate,
    targetMaturityAmount,
  ]);

  // Report Data
  const reportData = useMemo(() => {
    const calcType: RdType = activeTab === "sensitivity" ? "regular" : activeTab;
    return generateRdReportData(
      {
        rdType: calcType,
        monthlyDeposit,
        interestRate,
        tenureMonths,
        stepUpRate: activeTab === "stepup" ? stepUpRate : 0,
        isSeniorCitizen,
        taxRate,
      },
      results
    );
  }, [
    activeTab,
    monthlyDeposit,
    interestRate,
    tenureMonths,
    stepUpRate,
    isSeniorCitizen,
    taxRate,
    results,
  ]);

  // Doughnut Chart Data
  const doughnutData = useMemo(() => {
    return [
      { name: "Invested Capital", value: results.totalInvested, color: "#3b82f6" },
      { name: "Total Interest Earned", value: results.totalInterestEarned, color: "#10b981" },
    ];
  }, [results]);

  // Stacked Growth Chart Data
  const chartData = useMemo(() => {
    return results.annualSchedule.map((row) => ({
      year: `Yr ${row.year}`,
      "Invested Capital": row.cumulativeContributions,
      "Cumulative Interest": row.cumulativeInterest,
      "Maturity Value": row.endingBalance,
      "Real Purchasing Power": row.realEndingBalance,
    }));
  }, [results]);

  // Handle Copy Summary
  const handleCopy = () => {
    const summary = `CalcPlatform Recurring Deposit (RD) Summary:
- Total Maturity Value: ${formatCurrency(results.maturityAmount)}
- Total Invested Capital: ${formatCurrency(results.totalInvested)}
- Total Interest Earned: ${formatCurrency(results.totalInterestEarned)}
- Effective APY: ${results.effectiveApy}%
- Inflation-Adjusted Purchasing Power: ${formatCurrency(results.inflationAdjustedValue)}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Share Link
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
      downloadAnchor.setAttribute("download", `RD_Calculation_Results.json`);
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
    link.setAttribute("download", `RD_Schedule_${scheduleView}_${format === "excel" ? "export.xlsx" : "export.csv"}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset Handler
  const handleReset = () => {
    setMonthlyDeposit(500);
    setInterestRate(6.8);
    setTenureMonths(24);
    setStepUpRate(10);
    setStepUpAmount(0);
    setIsSeniorCitizen(false);
    setTaxRate(10.0);
    setInflationRate(4.0);
    setTargetMaturityAmount(15000);
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
            onClick={() => { setActiveTab("regular"); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "regular"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <RefreshCw className="h-3.5 w-3.5" /> Regular RD
          </button>
          <button
            onClick={() => { setActiveTab("stepup"); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "stepup"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Zap className="h-3.5 w-3.5 text-purple-200" /> Step-Up RD
          </button>
          <button
            onClick={() => { setActiveTab("simple"); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "simple"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Percent className="h-3.5 w-3.5" /> Simple Interest
          </button>
          <button
            onClick={() => { setActiveTab("goal"); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "goal"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Target className="h-3.5 w-3.5" /> Goal Planner
          </button>
          <button
            onClick={() => { setActiveTab("bank-compare"); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "bank-compare"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Award className="h-3.5 w-3.5" /> Bank Rate Matrix
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
            <h2 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-600" />
              <span>RD Deposit Parameters</span>
            </h2>
            <button
              onClick={handleReset}
              className="text-xs text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Monthly Deposit Amount */}
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Monthly RD Deposit</span>
                <span className="font-bold text-blue-600">{formatCurrency(monthlyDeposit)}/mo</span>
              </label>
              <Input
                type="number"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                className="h-9 text-xs font-sans tabular-nums"
              />
              <input
                type="range"
                min="50"
                max="50000"
                step="50"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Interest Rate Slider & Senior Citizen Bonus Checkbox */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium text-zinc-700 dark:text-zinc-300">
                <span>Interest Rate (p.a.)</span>
                <span className="font-bold text-emerald-600">
                  {results.interestRate}% {isSeniorCitizen ? "(+0.50% Senior Boost)" : ""}
                </span>
              </div>
              <Input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="h-9 text-xs font-sans tabular-nums"
              />
              <input
                type="range"
                min="1"
                max="18"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              {/* Senior Citizen Checkbox Toggle */}
              <div className="pt-1 flex items-center justify-between bg-emerald-50/60 dark:bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-200/60 dark:border-emerald-900">
                <label htmlFor="senior-toggle-rd" className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 cursor-pointer">
                  <Award className="h-4 w-4 text-emerald-600 shrink-0" /> Senior Citizen (+0.50% Rate Boost)
                </label>
                <input
                  id="senior-toggle-rd"
                  type="checkbox"
                  checked={isSeniorCitizen}
                  onChange={(e) => setIsSeniorCitizen(e.target.checked)}
                  className="h-4 w-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Tenure Months Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium text-zinc-700 dark:text-zinc-300">
                <span>Tenure (Months / Years)</span>
                <span className="font-bold text-purple-600">{tenureMonths} Months ({tenureMonths / 12} Yrs)</span>
              </div>
              <Input
                type="number"
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="h-9 text-xs font-sans tabular-nums"
              />
              <input
                type="range"
                min="6"
                max="120"
                step="6"
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            {/* Step-Up Inputs (Only when Step-Up tab active) */}
            {activeTab === "stepup" && (
              <div className="pt-2 border-t border-purple-100 dark:border-purple-950 space-y-2 bg-purple-50/50 dark:bg-purple-950/20 p-3 rounded-xl">
                <label className="font-bold text-purple-900 dark:text-purple-300 flex justify-between">
                  <span>Annual Step-Up Rate (%)</span>
                  <span>{stepUpRate}% / yr</span>
                </label>
                <Input
                  type="number"
                  value={stepUpRate}
                  onChange={(e) => setStepUpRate(Number(e.target.value))}
                  className="h-8 text-xs bg-white dark:bg-zinc-900"
                />
              </div>
            )}

            {/* Target Goal Input (Only when Goal tab active) */}
            {activeTab === "goal" && (
              <div className="pt-2 border-t border-amber-100 dark:border-amber-950 space-y-2 bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-xl">
                <label className="font-bold text-amber-900 dark:text-amber-300 flex justify-between">
                  <span>Target Maturity Goal ($ or ₹)</span>
                  <span>{formatCurrency(targetMaturityAmount)}</span>
                </label>
                <Input
                  type="number"
                  value={targetMaturityAmount}
                  onChange={(e) => setTargetMaturityAmount(Number(e.target.value))}
                  className="h-8 text-xs bg-white dark:bg-zinc-900"
                />
              </div>
            )}

            {/* Advanced Drag Options: Tax & Inflation */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-medium text-zinc-700 dark:text-zinc-300">TDS / Tax Drag (%)</label>
                <Input
                  type="number"
                  step="0.5"
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
            <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-sm space-y-1 min-w-0">
              <span className="text-xs font-semibold text-blue-100 block uppercase tracking-wider leading-tight">
                Total Maturity Amount
              </span>
              <div className="text-lg sm:text-xl font-black tracking-tight font-sans tabular-nums leading-snug break-words my-0.5">
                {formatCurrency(results.maturityAmount)}
              </div>
              <span className="text-[11px] text-blue-200 block leading-tight">In {tenureMonths} months</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-1 min-w-0">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider leading-tight">
                Total Invested Capital
              </span>
              <div className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 tracking-tight font-sans tabular-nums leading-snug break-words my-0.5">
                {formatCurrency(results.totalInvested)}
              </div>
              <span className="text-[11px] text-zinc-400 block leading-tight">Monthly contributions</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-1 min-w-0">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider leading-tight">
                Est. Interest Earned
              </span>
              <div className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 tracking-tight font-sans tabular-nums leading-snug break-words my-0.5">
                {formatCurrency(results.totalInterestEarned)}
              </div>
              <span className="text-[11px] text-emerald-600 font-bold block leading-tight">
                {results.effectiveApy}% Effective APY
              </span>
            </div>
          </div>

          {/* SECONDARY METRICS BAR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-200/60 dark:border-zinc-800 text-xs">
            <div className="overflow-hidden">
              <span className="text-zinc-400 text-[10px] block">Inflation-Adjusted</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 font-sans tabular-nums block">{formatCurrency(results.inflationAdjustedValue)}</span>
            </div>
            <div className="overflow-hidden">
              <span className="text-zinc-400 text-[10px] block">Post-Tax Maturity</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums block">{formatCurrency(results.postTaxMaturityAmount)}</span>
            </div>
            <div className="overflow-hidden">
              <span className="text-zinc-400 text-[10px] block">Total TDS / Tax Drag</span>
              <span className="font-bold text-rose-500 font-sans tabular-nums block">{formatCurrency(results.totalTaxPaid)}</span>
            </div>
            <div className="overflow-hidden">
              <span className="text-zinc-400 text-[10px] block">RD Portfolio Rating</span>
              <span className="font-bold text-emerald-600 block">{results.healthRating} ({results.rdHealthScore}/100)</span>
            </div>
          </div>

          {/* BANK COMPARISON TAB PANEL */}
          {activeTab === "bank-compare" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-3 text-xs">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Award className="h-4 w-4 text-indigo-600" /> Commercial Bank RD Rate Benchmarking
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-[11px]">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700 font-bold">Bank Name</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700 font-bold">Regular Rate</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700 font-bold text-emerald-600">Senior Rate</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600">Est. Maturity Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-sans tabular-nums">
                    {results.bankComparisons.map((b, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                        <td className="p-2 font-sans font-bold text-zinc-900 dark:text-zinc-100">{b.bankName}</td>
                        <td className="p-2">{b.regularRate}%</td>
                        <td className="p-2 text-emerald-600 font-bold">{b.seniorRate}%</td>
                        <td className="p-2 text-blue-600 font-bold">{formatCurrency(b.maturityValue)}</td>
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
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4 text-rose-600" /> What-If Sensitivity Matrix (Rate vs Tenure)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-[10px]">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800">
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700">Rate</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700">1 Yr</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700">2 Yrs</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700">3 Yrs</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700">5 Yrs</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700">7 Yrs</th>
                      <th className="p-2 border border-zinc-200 dark:border-zinc-700">10 Yrs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[5.5, 6.0, 6.5, 7.0, 7.5, 8.0].map((r) => (
                      <tr key={r} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-sans tabular-nums">
                        <td className="p-2 font-bold border border-zinc-200 dark:border-zinc-800">{r}%</td>
                        {[1, 2, 3, 5, 7, 10].map((t) => {
                          const cell = results.sensitivityMatrix.find((c) => c.returnRate === r && c.tenureYears === t);
                          return (
                            <td key={t} className="p-2 border border-zinc-200 dark:border-zinc-800">
                              {cell ? formatCurrency(cell.maturityValue) : "-"}
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
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center justify-between">
              <span>RD Growth & Breakdown Visualizer</span>
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
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Interest Earned
                  </span>
                </div>
              </div>

              {/* Stacked Growth Bar Chart (Col 7) */}
              <div className="md:col-span-7 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                    <YAxis tickFormatter={(v) => `$${v / 1000}k`} tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                    <Bar dataKey="Invested Capital" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="Cumulative Interest" stackId="a" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 4. INTERACTIVE SCHEDULE BREAKDOWN TABLE */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">RD Amortization / Schedule Table</h3>
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
                  <tr className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                    {scheduleView === "annual" ? (
                      <>
                        <th className="p-2">Year</th>
                        <th className="p-2">Starting Balance</th>
                        <th className="p-2">Deposits</th>
                        <th className="p-2">Cumulative Deposits</th>
                        <th className="p-2">Interest Earned</th>
                        <th className="p-2">Ending Balance</th>
                        <th className="p-2">Real Purchasing Power</th>
                      </>
                    ) : (
                      <>
                        <th className="p-2">Month</th>
                        <th className="p-2">Year</th>
                        <th className="p-2">Starting Balance</th>
                        <th className="p-2">Deposit</th>
                        <th className="p-2">Interest Earned</th>
                        <th className="p-2">Ending Balance</th>
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
                            <td className="p-2">{formatCurrency(r.startingBalance)}</td>
                            <td className="p-2 text-blue-600">{formatCurrency(r.contributions)}</td>
                            <td className="p-2">{formatCurrency(r.cumulativeContributions)}</td>
                            <td className="p-2 text-emerald-600">{formatCurrency(r.interestEarned)}</td>
                            <td className="p-2 font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(r.endingBalance)}</td>
                            <td className="p-2 text-amber-600">{formatCurrency(r.realEndingBalance)}</td>
                          </>
                        ) : (
                          <>
                            <td className="p-2 font-bold">M{r.month}</td>
                            <td className="p-2">Yr {r.year}</td>
                            <td className="p-2">{formatCurrency(r.startingBalance)}</td>
                            <td className="p-2 text-blue-600">{formatCurrency(r.contribution)}</td>
                            <td className="p-2 text-emerald-600">{formatCurrency(r.interestEarned)}</td>
                            <td className="p-2 font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(r.endingBalance)}</td>
                          </>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-zinc-400 font-sans">
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
