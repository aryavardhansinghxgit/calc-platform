"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  DollarSign,
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
  ChevronDown,
  ChevronUp,
  RotateCcw,
  BarChart3,
  Layers,
  Search,
  Download,
  FileSpreadsheet,
  FileText,
  Target,
  Zap,
  ShieldCheck,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import { FutureValueContent } from "./FutureValueContent";
import {
  calculateFutureValue,
  solveGoalParameter,
  CompoundingFrequency,
  ContributionFrequency,
  TimingOption,
  FutureValueInput,
  ScheduleRow,
} from "@/lib/calculator-engine/formulas/future-value";

const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "INR", symbol: "₹" },
  { code: "CAD", symbol: "$" },
  { code: "AUD", symbol: "$" },
  { code: "SGD", symbol: "$" },
  { code: "AED", symbol: "DH" },
];

export function FutureValueCalculator() {
  // Mode selection: 'standard' | 'goal' | 'compare'
  const [activeTab, setActiveTab] = useState<"standard" | "goal" | "compare">("standard");

  // Currency
  const [currency, setCurrency] = useState("USD");
  const currencySymbol = CURRENCIES.find((c) => c.code === currency)?.symbol || "$";

  // Standard Inputs
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [periodicContribution, setPeriodicContribution] = useState<number>(500);
  const [interestRate, setInterestRate] = useState<number>(8.0);
  const [years, setYears] = useState<number>(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>("monthly");
  const [contributionFrequency, setContributionFrequency] = useState<ContributionFrequency>("monthly");
  const [contributionTiming, setContributionTiming] = useState<TimingOption>("end");

  // Advanced Inputs
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [taxRate, setTaxRate] = useState<number>(15.0);
  const [stepUpRate, setStepUpRate] = useState<number>(3.0);
  const [marketCrashYear, setMarketCrashYear] = useState<number>(0);
  const [marketCrashPct, setMarketCrashPct] = useState<number>(0);

  // Goal Mode Inputs
  const [targetFV, setTargetFV] = useState<number>(1000000);
  const [goalSolveTarget, setGoalSolveTarget] = useState<"pmt" | "pv" | "rate" | "years">("pmt");

  // Schedule Table UI State
  const [scheduleView, setScheduleView] = useState<"yearly" | "monthly">("yearly");
  const [scheduleSearch, setScheduleSearch] = useState("");
  const [schedulePage, setSchedulePage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Report Modal
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Presets
  const applyPreset = (preset: "sp500" | "balanced" | "savings" | "fd") => {
    switch (preset) {
      case "sp500":
        setInterestRate(10.0);
        setCompoundingFrequency("monthly");
        break;
      case "balanced":
        setInterestRate(7.0);
        setCompoundingFrequency("monthly");
        break;
      case "savings":
        setInterestRate(4.5);
        setCompoundingFrequency("daily");
        break;
      case "fd":
        setInterestRate(6.5);
        setCompoundingFrequency("quarterly");
        break;
    }
  };

  // Main Calculation Result
  const calcInput: FutureValueInput = useMemo(
    () => ({
      initialInvestment,
      periodicContribution,
      interestRate,
      years,
      compoundingFrequency,
      contributionFrequency,
      contributionTiming,
      inflationRate: showAdvanced ? inflationRate : 0,
      taxRate: showAdvanced ? taxRate : 0,
      stepUpRate: showAdvanced ? stepUpRate : 0,
      marketCrashYear: showAdvanced ? marketCrashYear : 0,
      marketCrashPct: showAdvanced ? marketCrashPct : 0,
    }),
    [
      initialInvestment,
      periodicContribution,
      interestRate,
      years,
      compoundingFrequency,
      contributionFrequency,
      contributionTiming,
      showAdvanced,
      inflationRate,
      taxRate,
      stepUpRate,
      marketCrashYear,
      marketCrashPct,
    ]
  );

  const results = useMemo(() => calculateFutureValue(calcInput), [calcInput]);

  // Goal Solver Result
  const solvedGoalValue = useMemo(() => {
    return solveGoalParameter(targetFV, goalSolveTarget, {
      initialInvestment,
      periodicContribution,
      interestRate,
      years,
      compoundingFrequency,
      contributionFrequency,
      contributionTiming,
    });
  }, [
    targetFV,
    goalSolveTarget,
    initialInvestment,
    periodicContribution,
    interestRate,
    years,
    compoundingFrequency,
    contributionFrequency,
    contributionTiming,
  ]);

  // Format Helper
  const fmt = (val: number, isPct = false) => {
    if (isPct) return `${val.toFixed(2)}%`;
    return `${currencySymbol}${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Schedule Rows Filtering
  const scheduleRows = scheduleView === "yearly" ? results.yearlySchedule : results.monthlySchedule;
  const filteredScheduleRows = useMemo(() => {
    if (!scheduleSearch.trim()) return scheduleRows;
    return scheduleRows.filter((r) =>
      String(r.year).includes(scheduleSearch) ||
      (r.period && String(r.period).includes(scheduleSearch)) ||
      String(r.endBalance).includes(scheduleSearch)
    );
  }, [scheduleRows, scheduleSearch]);

  const totalPages = Math.ceil(filteredScheduleRows.length / rowsPerPage);
  const paginatedSchedule = useMemo(() => {
    const start = (schedulePage - 1) * rowsPerPage;
    return filteredScheduleRows.slice(start, start + rowsPerPage);
  }, [filteredScheduleRows, schedulePage, rowsPerPage]);

  // CSV Export
  const exportCSV = () => {
    const headers = ["Year", "Period", "Start Balance", "Contribution", "Interest Earned", "Tax Paid", "End Balance"];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...scheduleRows.map((r) =>
          [r.year, r.period || "-", r.startBalance, r.contribution, r.interestEarned, r.taxPaid, r.endBalance].join(",")
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `future_value_schedule_${scheduleView}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary
  const copySummary = () => {
    const summaryText = `Future Value Projection Summary (${currency}):
------------------------------------------------
Future Value: ${fmt(results.futureValue)}
Initial Investment: ${fmt(results.initialInvestment)}
Total Contributions: ${fmt(results.totalContributions)}
Total Invested: ${fmt(results.totalInvested)}
Total Interest Earned: ${fmt(results.totalInterestEarned)}
Return Multiple: ${results.returnMultiple}x
CAGR: ${results.cagr}%
Years to Double: ${results.yearsToDouble} yrs
Real Inflation-Adjusted FV: ${fmt(results.inflationAdjustedFV)}
Tax-Adjusted Net FV: ${fmt(results.taxAdjustedFV)}`;

    navigator.clipboard.writeText(summaryText);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Report Data Construction
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Future Value Calculator",
      reportTitle: "Future Value Analysis Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol,
    },
    keyMetrics: [
      { label: "Future Value", value: fmt(results.futureValue), subtitle: "Projected Wealth", colorTheme: "blue" },
      { label: "Total Invested", value: fmt(results.totalInvested), subtitle: "Principal + PMT", colorTheme: "emerald" },
      { label: "Interest Earned", value: fmt(results.totalInterestEarned), subtitle: "Compound Growth", colorTheme: "purple" },
      { label: "CAGR", value: `${results.cagr}%`, subtitle: "Annualized Return", colorTheme: "amber" },
    ],
    sections: [
      {
        title: "Executive Summary",
        items: [
          { label: "Projected Future Value", value: fmt(results.futureValue), highlight: true },
          { label: "Initial Investment (PV)", value: fmt(results.initialInvestment) },
          { label: "Total Periodic Contributions", value: fmt(results.totalContributions) },
          { label: "Total Capital Invested", value: fmt(results.totalInvested) },
          { label: "Total Compound Interest Earned", value: fmt(results.totalInterestEarned) },
          { label: "Total Return Multiple", value: `${results.returnMultiple}x` },
        ],
      },
      {
        title: "Growth Metrics & Adjustments",
        items: [
          { label: "Effective Annual Rate (APY)", value: `${results.effectiveAnnualYield}%` },
          { label: "Compound Annual Growth Rate (CAGR)", value: `${results.cagr}%` },
          { label: "Years to Double Investment", value: `${results.yearsToDouble} years` },
          { label: "Real Inflation-Adjusted FV", value: fmt(results.inflationAdjustedFV) },
          { label: "Tax-Adjusted Net Balance", value: fmt(results.taxAdjustedFV) },
          { label: "Growth Efficiency Ratio", value: `${results.growthEfficiencyScore}%` },
        ],
      },
      {
        title: "Inputs & Parameters",
        items: [
          { label: "Duration", value: `${years} Years` },
          { label: "Annual Interest Rate", value: `${interestRate}%` },
          { label: "Periodic Deposit", value: fmt(periodicContribution) },
          { label: "Compounding Frequency", value: compoundingFrequency },
          { label: "Contribution Timing", value: contributionTiming === "beginning" ? "Annuity Due (Start)" : "Ordinary Annuity (End)" },
        ],
      },
    ],
    table: {
      title: "Annual Accumulation Schedule",
      headers: [
        { key: "year", label: "Year" },
        { key: "startBalance", label: "Start Balance" },
        { key: "contribution", label: "Contribution" },
        { key: "interestEarned", label: "Interest Earned" },
        { key: "endBalance", label: "End Balance" },
      ],
      rows: results.yearlySchedule.map((r) => ({
        year: `Year ${r.year}`,
        startBalance: fmt(r.startBalance),
        contribution: fmt(r.contribution),
        interestEarned: fmt(r.interestEarned),
        endBalance: fmt(r.endBalance),
      })),
    },
  };

  // Colors for Recharts
  const DONUT_COLORS = ["#3b82f6", "#10b981", "#8b5cf6"];

  return (
    <div className="space-y-6">
      {/* Top Header & Preset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 gap-1 text-xs">
            <Sparkles className="h-3 w-3" /> Pro Quantitative Model
          </Badge>

          {/* Currency Dropdown */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md px-2 py-1 font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} ({c.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-zinc-500 font-medium mr-1">Presets:</span>
          <button
            type="button"
            onClick={() => applyPreset("sp500")}
            className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 rounded-md transition-colors font-medium cursor-pointer"
          >
            S&P 500 (10%)
          </button>
          <button
            type="button"
            onClick={() => applyPreset("balanced")}
            className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 rounded-md transition-colors font-medium cursor-pointer"
          >
            Balanced (7%)
          </button>
          <button
            type="button"
            onClick={() => applyPreset("fd")}
            className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 rounded-md transition-colors font-medium cursor-pointer"
          >
            Fixed Deposit (6.5%)
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("standard")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "standard"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <TrendingUp className="h-4 w-4" /> Standard FV Calculator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("goal")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "goal"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Target className="h-4 w-4 text-emerald-500" /> Goal Planning Mode
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("compare")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "compare"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <BarChart3 className="h-4 w-4 text-purple-500" /> Multi-Scenario Comparison
        </button>
      </div>

      {/* TAB 1: STANDARD CALCULATOR */}
      {activeTab === "standard" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs Column (5 Cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Investment Parameters
            </h3>

            {/* PV Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Initial Investment (PV)</span>
                <span className="font-sans tabular-nums text-blue-600">{fmt(initialInvestment)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">{currencySymbol}</span>
                <Input
                  type="number"
                  min="0"
                  step="500"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Math.max(0, Number(e.target.value)))}
                  className="pl-7 text-xs font-sans tabular-nums"
                />
              </div>
            </div>

            {/* PMT Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Periodic Contribution (PMT)</span>
                <span className="font-sans tabular-nums text-emerald-600">{fmt(periodicContribution)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">{currencySymbol}</span>
                <Input
                  type="number"
                  min="0"
                  step="50"
                  value={periodicContribution}
                  onChange={(e) => setPeriodicContribution(Math.max(0, Number(e.target.value)))}
                  className="pl-7 text-xs font-sans tabular-nums"
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Expected Interest Rate (%)</span>
                <span className="font-sans tabular-nums text-purple-600">{interestRate}%</span>
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                  className="text-xs font-sans tabular-nums"
                />
                <input
                  type="range"
                  min="0.1"
                  max="25"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Duration Years */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Investment Duration (Years)</span>
                <span className="font-sans tabular-nums text-blue-600">{years} Years</span>
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={years}
                  onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
                  className="text-xs font-sans tabular-nums"
                />
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Frequencies */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Compounding</label>
                <select
                  value={compoundingFrequency}
                  onChange={(e) => setCompoundingFrequency(e.target.value as CompoundingFrequency)}
                  className="w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semi-annually">Semi-Annually</option>
                  <option value="annually">Annually</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Contribution Freq</label>
                <select
                  value={contributionFrequency}
                  onChange={(e) => setContributionFrequency(e.target.value as ContributionFrequency)}
                  className="w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semi-annually">Semi-Annually</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            </div>

            {/* Contribution Timing */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block">Contribution Timing</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setContributionTiming("end")}
                  className={`p-2 rounded-md border font-medium cursor-pointer text-center transition-all ${
                    contributionTiming === "end"
                      ? "bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-700 dark:text-blue-300"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  End (Ordinary Annuity)
                </button>
                <button
                  type="button"
                  onClick={() => setContributionTiming("beginning")}
                  className={`p-2 rounded-md border font-medium cursor-pointer text-center transition-all ${
                    contributionTiming === "beginning"
                      ? "bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-700 dark:text-blue-300"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Beginning (Annuity Due)
                </button>
              </div>
            </div>

            {/* Collapsible Advanced Mode Toggle */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5" /> Advanced Options (Step-up, Tax, Inflation)
                </span>
                {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {showAdvanced && (
                <div className="space-y-3 mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-600">Annual Step-Up (% grow PMT)</label>
                      <Input
                        type="number"
                        min="0"
                        step="0.5"
                        value={stepUpRate}
                        onChange={(e) => setStepUpRate(Number(e.target.value))}
                        className="text-xs font-sans tabular-nums"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-600">Inflation Rate (%)</label>
                      <Input
                        type="number"
                        min="0"
                        step="0.1"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(Number(e.target.value))}
                        className="text-xs font-sans tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-600">Growth Tax Rate (%)</label>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        value={taxRate}
                        onChange={(e) => setTaxRate(Number(e.target.value))}
                        className="text-xs font-sans tabular-nums"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-600">Market Crash Year (e.g. 5)</label>
                      <Input
                        type="number"
                        min="0"
                        max={years}
                        value={marketCrashYear}
                        onChange={(e) => setMarketCrashYear(Number(e.target.value))}
                        className="text-xs font-sans tabular-nums"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Dashboard & Charts Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Result Card */}
            <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-300">
                  Projected Future Value
                </span>
                <div className="flex gap-2">
                  
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setIsReportOpen(true)}
                    className="h-7 text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold cursor-pointer"
                  >
                    <Printer className="h-3 w-3 mr-1" /> PDF Report
                  </Button>
                </div>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 font-sans tabular-nums">
                {fmt(results.futureValue)}
              </div>

              {showAdvanced && inflationRate > 0 && (
                <div className="text-xs text-blue-200 font-medium">
                  Real Purchasing Power (Inflation-Adjusted): <span className="font-bold font-sans tabular-nums text-emerald-400">{fmt(results.inflationAdjustedFV)}</span>
                </div>
              )}

              {/* Secondary Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">Total Invested</div>
                  <div className="font-bold font-sans tabular-nums text-white text-sm">{fmt(results.totalInvested)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Interest Earned</div>
                  <div className="font-bold font-sans tabular-nums text-emerald-400 text-sm">{fmt(results.totalInterestEarned)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Return Multiple</div>
                  <div className="font-bold font-sans tabular-nums text-purple-300 text-sm">{results.returnMultiple}x</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Years to Double</div>
                  <div className="font-bold font-sans tabular-nums text-amber-300 text-sm">{results.yearsToDouble} yrs</div>
                </div>
              </div>
            </div>

            {/* Insight Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-semibold">Growth Efficiency</div>
                <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-0.5">
                  {results.growthEfficiencyScore}%
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-semibold">Effective APY</div>
                <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 font-sans tabular-nums mt-0.5">
                  {results.effectiveAnnualYield}%
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-semibold">Interest Share</div>
                <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums mt-0.5">
                  {results.interestContributionRatio}%
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-semibold">Monte Carlo Goal Prob</div>
                <div className="text-base font-extrabold text-amber-600 dark:text-amber-400 font-sans tabular-nums mt-0.5">
                  {results.monteCarloProbability}%
                </div>
              </div>
            </div>

            {/* Interactive Charts */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                <span>Wealth Accumulation Curve</span>
                <span className="text-[10px] text-zinc-400">Recharts Visualization</span>
              </h4>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.yearlySchedule}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10 }}
                      tickFormatter={(v) => `${currencySymbol}${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      formatter={(value: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, ""]}
                      labelFormatter={(label) => `Year ${label}`}
                      contentStyle={{ backgroundColor: "#1f2937", borderRadius: "8px", border: "none", color: "#fff" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px" }} />
                    <Line type="monotone" dataKey="endBalance" name="Total Balance (FV)" stroke="#3b82f6" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="cumulativeContributions" name="Total Invested" stroke="#10b981" strokeWidth={2} dot={false} />
                    {showAdvanced && inflationRate > 0 && (
                      <Line type="monotone" dataKey="realEndBalance" name="Real Inflation-Adjusted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GOAL PLANNING MODE */}
      {activeTab === "goal" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <Target className="h-6 w-6 text-emerald-500" />
            <div>
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">
                Goal-Based Investment Reverse Calculator
              </h3>
              <p className="text-xs text-zinc-500">
                Determine exactly how much you need to save or earn to reach your specific wealth goal.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Inputs */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Target Financial Goal Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">{currencySymbol}</span>
                  <Input
                    type="number"
                    min="1000"
                    step="10000"
                    value={targetFV}
                    onChange={(e) => setTargetFV(Math.max(1000, Number(e.target.value)))}
                    className="pl-7 text-xs font-sans tabular-nums font-bold text-emerald-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">What parameter do you want to solve for?</label>
                <select
                  value={goalSolveTarget}
                  onChange={(e) => setGoalSolveTarget(e.target.value as any)}
                  className="w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md p-2.5 font-semibold text-blue-600 cursor-pointer"
                >
                  <option value="pmt">Required Monthly Contribution (PMT)</option>
                  <option value="pv">Required Initial Investment (PV)</option>
                  <option value="rate">Required Annual Interest Rate (%)</option>
                  <option value="years">Required Time Horizon (Years)</option>
                </select>
              </div>

              {/* Auxiliary Parameters */}
              <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                {goalSolveTarget !== "pv" && (
                  <div>
                    <label className="font-medium text-zinc-600">Current Starting Balance (PV)</label>
                    <Input
                      type="number"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(Number(e.target.value))}
                      className="text-xs font-sans tabular-nums"
                    />
                  </div>
                )}
                {goalSolveTarget !== "pmt" && (
                  <div>
                    <label className="font-medium text-zinc-600">Monthly Contribution (PMT)</label>
                    <Input
                      type="number"
                      value={periodicContribution}
                      onChange={(e) => setPeriodicContribution(Number(e.target.value))}
                      className="text-xs font-sans tabular-nums"
                    />
                  </div>
                )}
                {goalSolveTarget !== "rate" && (
                  <div>
                    <label className="font-medium text-zinc-600">Expected Rate of Return (%)</label>
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="text-xs font-sans tabular-nums"
                    />
                  </div>
                )}
                {goalSolveTarget !== "years" && (
                  <div>
                    <label className="font-medium text-zinc-600">Target Timeframe (Years)</label>
                    <Input
                      type="number"
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="text-xs font-sans tabular-nums"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Goal Solution Box */}
            <div className="lg:col-span-7 flex flex-col justify-center items-center bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-8 shadow-md text-center space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-300">
                Required Strategy to Reach {fmt(targetFV)}
              </span>

              <div className="text-4xl sm:text-5xl font-extrabold text-white font-sans tabular-nums">
                {goalSolveTarget === "pmt" && `${fmt(solvedGoalValue)} / month`}
                {goalSolveTarget === "pv" && `${fmt(solvedGoalValue)} upfront`}
                {goalSolveTarget === "rate" && `${solvedGoalValue}% annual return`}
                {goalSolveTarget === "years" && `${solvedGoalValue} Years needed`}
              </div>

              <p className="text-xs text-emerald-200 max-w-md">
                Based on compounding interest frequency ({compoundingFrequency}) and a timeframe of {years} years.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MULTI-SCENARIO COMPARISON */}
      {activeTab === "compare" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <BarChart3 className="h-6 w-6 text-purple-500" />
            <div>
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">
                Side-by-Side Scenario Analysis
              </h3>
              <p className="text-xs text-zinc-500">
                Compare conservative, moderate, and aggressive investment returns to make informed risk choices.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Conservative Card */}
            <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Conservative</span>
                <Badge variant="outline" className="text-[10px] text-blue-600">
                  {(interestRate - 2.5).toFixed(1)}% Return
                </Badge>
              </div>
              <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                {fmt(results.scenarios.conservative.futureValue)}
              </div>
              <div className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between"><span>Invested:</span> <span className="font-sans tabular-nums">{fmt(results.scenarios.conservative.totalInvested)}</span></div>
                <div className="flex justify-between"><span>Interest:</span> <span className="font-sans tabular-nums text-emerald-600">{fmt(results.scenarios.conservative.totalInterest)}</span></div>
                <div className="flex justify-between"><span>Multiple:</span> <span className="font-sans tabular-nums">{results.scenarios.conservative.returnMultiple}x</span></div>
              </div>
            </div>

            {/* Moderate Card */}
            <div className="bg-blue-50/50 dark:bg-blue-950/20 border-2 border-blue-500 rounded-xl p-5 space-y-3 relative">
              <Badge className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px]">Base Case</Badge>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300">Moderate</span>
                <Badge variant="outline" className="text-[10px] text-blue-600">
                  {interestRate.toFixed(1)}% Return
                </Badge>
              </div>
              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                {fmt(results.scenarios.moderate.futureValue)}
              </div>
              <div className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between"><span>Invested:</span> <span className="font-sans tabular-nums">{fmt(results.scenarios.moderate.totalInvested)}</span></div>
                <div className="flex justify-between"><span>Interest:</span> <span className="font-sans tabular-nums text-emerald-600">{fmt(results.scenarios.moderate.totalInterest)}</span></div>
                <div className="flex justify-between"><span>Multiple:</span> <span className="font-sans tabular-nums">{results.scenarios.moderate.returnMultiple}x</span></div>
              </div>
            </div>

            {/* Aggressive Card */}
            <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Aggressive</span>
                <Badge variant="outline" className="text-[10px] text-purple-600">
                  {(interestRate + 3.0).toFixed(1)}% Return
                </Badge>
              </div>
              <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                {fmt(results.scenarios.aggressive.futureValue)}
              </div>
              <div className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between"><span>Invested:</span> <span className="font-sans tabular-nums">{fmt(results.scenarios.aggressive.totalInvested)}</span></div>
                <div className="flex justify-between"><span>Interest:</span> <span className="font-sans tabular-nums text-emerald-600">{fmt(results.scenarios.aggressive.totalInterest)}</span></div>
                <div className="flex justify-between"><span>Multiple:</span> <span className="font-sans tabular-nums">{results.scenarios.aggressive.returnMultiple}x</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULE ACCUMULATION TABLE */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Accumulation Schedule
            </h4>
            <div className="flex border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden text-[11px]">
              <button
                type="button"
                onClick={() => setScheduleView("yearly")}
                className={`px-2.5 py-1 font-medium cursor-pointer ${
                  scheduleView === "yearly" ? "bg-blue-600 text-white" : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                Yearly
              </button>
              <button
                type="button"
                onClick={() => setScheduleView("monthly")}
                className={`px-2.5 py-1 font-medium cursor-pointer ${
                  scheduleView === "monthly" ? "bg-blue-600 text-white" : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search schedule..."
                value={scheduleSearch}
                onChange={(e) => setScheduleSearch(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <Button type="button" variant="outline" size="sm" onClick={exportCSV} className="h-7 text-xs gap-1 cursor-pointer">
              <Download className="h-3 w-3" /> Export CSV
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Period</th>
                <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Start Balance</th>
                <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Contribution</th>
                <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Interest Earned</th>
                <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700 text-right">End Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums text-[11px]">
              {paginatedSchedule.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="p-2.5 font-sans font-medium text-zinc-800 dark:text-zinc-200">
                    {scheduleView === "yearly" ? `Year ${row.year}` : `Month ${row.period}`}
                  </td>
                  <td className="p-2.5 text-zinc-600 dark:text-zinc-400">{fmt(row.startBalance)}</td>
                  <td className="p-2.5 text-emerald-600 font-medium">{fmt(row.contribution)}</td>
                  <td className="p-2.5 text-purple-600 font-medium">{fmt(row.interestEarned)}</td>
                  <td className="p-2.5 text-right font-bold text-zinc-900 dark:text-zinc-100">{fmt(row.endBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between text-xs text-zinc-500 pt-2">
          <span>
            Page {schedulePage} of {totalPages || 1} ({filteredScheduleRows.length} total rows)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={schedulePage <= 1}
              onClick={() => setSchedulePage((p) => Math.max(1, p - 1))}
              className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={schedulePage >= totalPages}
              onClick={() => setSchedulePage((p) => Math.min(totalPages, p + 1))}
              className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Article & 20 FAQs Section */}
      <FutureValueContent />
    </div>
  );
}
