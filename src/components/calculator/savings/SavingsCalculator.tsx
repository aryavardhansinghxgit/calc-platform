"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Calculator as CalcIcon,
  ShieldCheck,
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
  ArrowRightLeft,
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
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import {
  calculateSavings,
  CompoundFrequency,
  SavingsCalculatorInputs,
  SavingsCalculatorResults,
} from "@/lib/calculator-engine/formulas/savings";
import { generateSavingsReportData } from "@/lib/report-generator/savings-report";
import { formatCurrency, formatPercent } from "@/lib/calculator-engine/formatters";

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];

export function SavingsCalculator() {
  // Mode selection
  const [activeTab, setActiveTab] = useState<"standard" | "goal" | "retirement" | "fire">("standard");

  // Inputs state
  const [initialDeposit, setInitialDeposit] = useState<number>(20000);
  const [annualContribution, setAnnualContribution] = useState<number>(5000);
  const [annualContributionIncrease, setAnnualContributionIncrease] = useState<number>(3);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(0);
  const [monthlyContributionIncrease, setMonthlyContributionIncrease] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(3.0);
  const [compoundFrequency, setCompoundFrequency] = useState<CompoundFrequency>("annually");
  const [yearsToSave, setYearsToSave] = useState<number>(10);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [inflationRate, setInflationRate] = useState<number>(2.5);

  // Goal Planner state
  const [targetGoalAmount, setTargetGoalAmount] = useState<number>(100000);

  // Retirement & FIRE inputs
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [annualExpenses, setAnnualExpenses] = useState<number>(40000);

  // Schedule Table View state
  const [scheduleView, setScheduleView] = useState<"annual" | "monthly">("annual");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<string>("period");
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Actions & Report Modal state
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);

  // Calculate results on the fly
  const results: SavingsCalculatorResults = useMemo(() => {
    return calculateSavings({
      initialDeposit,
      annualContribution,
      annualContributionIncrease,
      monthlyContribution,
      monthlyContributionIncrease,
      interestRate,
      compoundFrequency,
      yearsToSave,
      taxRate,
      inflationRate,
      targetGoalAmount,
      currentAge,
      retirementAge,
      annualExpenses,
    });
  }, [
    initialDeposit,
    annualContribution,
    annualContributionIncrease,
    monthlyContribution,
    monthlyContributionIncrease,
    interestRate,
    compoundFrequency,
    yearsToSave,
    taxRate,
    inflationRate,
    targetGoalAmount,
    currentAge,
    retirementAge,
    annualExpenses,
  ]);

  // Report Data
  const reportData = useMemo(() => {
    return generateSavingsReportData(
      {
        initialDeposit,
        annualContribution,
        annualContributionIncrease,
        monthlyContribution,
        monthlyContributionIncrease,
        interestRate,
        compoundFrequency,
        yearsToSave,
        taxRate,
        inflationRate,
        targetGoalAmount,
      },
      results
    );
  }, [
    initialDeposit,
    annualContribution,
    annualContributionIncrease,
    monthlyContribution,
    monthlyContributionIncrease,
    interestRate,
    compoundFrequency,
    yearsToSave,
    taxRate,
    inflationRate,
    targetGoalAmount,
    results,
  ]);

  // Doughnut Chart Data
  const doughnutData = useMemo(() => {
    return [
      { name: "Initial Deposit", value: results.initialDeposit, color: "#3b82f6" },
      { name: "Total Contributions", value: Math.max(0, results.totalContributions - results.initialDeposit), color: "#10b981" },
      { name: "Total Interest Earned", value: results.totalInterestEarned, color: "#8b5cf6" },
    ];
  }, [results]);

  // Stacked Growth & Line Chart Data
  const chartData = useMemo(() => {
    return results.annualSchedule.map((row) => ({
      year: `Yr ${row.year}`,
      "Initial Deposit": results.initialDeposit,
      "Contributions": Math.max(0, row.cumulativeContributions - results.initialDeposit),
      "Interest Earned": row.cumulativeInterest,
      "Ending Balance": row.endingBalance,
      "Real Purchasing Power": row.realEndingBalance,
    }));
  }, [results]);

  // Monte Carlo Chart Data
  const monteCarloData = useMemo(() => {
    return results.monteCarlo.p50.map((val, idx) => ({
      year: `Yr ${idx}`,
      "90th Percentile (Bull)": results.monteCarlo.p90[idx],
      "50th Percentile (Median)": results.monteCarlo.p50[idx],
      "10th Percentile (Bear)": results.monteCarlo.p10[idx],
      Target: targetGoalAmount,
    }));
  }, [results, targetGoalAmount]);

  // Copy & Share Handlers
  const handleCopy = () => {
    const summary = `CalcPlatform Savings Projections:
- End Balance: ${formatCurrency(results.endBalance)}
- Total Contributions: ${formatCurrency(results.totalContributions)}
- Total Interest Earned: ${formatCurrency(results.totalInterestEarned)}
- APY: ${results.apy}%
- Inflation-Adjusted Balance: ${formatCurrency(results.inflationAdjustedBalance)}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  // CSV & Excel Export Handler
  const handleExportCSV = (isExcel = false) => {
    let rows: any[] = [];
    if (scheduleView === "annual") {
      rows = results.annualSchedule.map((r) => ({
        Year: r.year,
        "Starting Balance": r.startingBalance,
        Contributions: r.contributions,
        "Interest Earned": r.interestEarned,
        "Taxes Paid": r.taxPaid,
        "Ending Balance": r.endingBalance,
        "Real Ending Balance": r.realEndingBalance,
      }));
    } else {
      rows = results.monthlySchedule.map((r) => ({
        Month: r.month,
        Year: r.year,
        "Starting Balance": r.startingBalance,
        Contribution: r.contribution,
        "Interest Earned": r.interestEarned,
        "Taxes Paid": r.taxPaid,
        "Ending Balance": r.endingBalance,
      }));
    }

    if (rows.length === 0) return;
    const headers = Object.keys(rows[0]).join(",");
    const csvLines = rows.map((r) => Object.values(r).join(","));
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...csvLines].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Savings_Schedule_${scheduleView}_${isExcel ? "excel.csv" : "export.csv"}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset handler
  const handleReset = () => {
    setInitialDeposit(20000);
    setAnnualContribution(5000);
    setAnnualContributionIncrease(3);
    setMonthlyContribution(0);
    setMonthlyContributionIncrease(0);
    setInterestRate(3.0);
    setCompoundFrequency("annually");
    setYearsToSave(10);
    setTaxRate(0);
    setInflationRate(2.5);
    setTargetGoalAmount(100000);
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP MODE SWITCHER TABS */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-xl shadow-xs">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("standard")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "standard"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" /> Savings Accumulation
          </button>
          <button
            onClick={() => setActiveTab("goal")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "goal"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Target className="h-3.5 w-3.5" /> Goal Planner
          </button>
          <button
            onClick={() => setActiveTab("retirement")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "retirement"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Umbrella className="h-3.5 w-3.5" /> Retirement Estimator
          </button>
          <button
            onClick={() => setActiveTab("fire")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "fire"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Flame className="h-3.5 w-3.5 text-amber-300" /> FIRE Movement
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
        {/* LEFT COLUMN: INPUT CONTROLS PANEL (Col 5) */}
        <div className="lg:col-span-5 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h2 className="text-sm font-bold tracking-tight text-blue-600 dark:text-blue-400 flex items-center gap-2"><span>Savings Parameters</span>
            </h2>
            <button
              onClick={handleReset}
              className="text-xs text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Initial Deposit */}
            <div className="space-y-1.5">
              <label className="font-medium text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Initial Deposit</span>
                <span className="font-bold text-blue-600">{formatCurrency(initialDeposit)}</span>
              </label>
              <Input
                type="number"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(Number(e.target.value))}
                className="h-9 text-xs"
              />
            </div>

            {/* Annual Contribution & Escalation */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-medium text-zinc-700 dark:text-zinc-300">Annual Contribution</label>
                <Input
                  type="number"
                  value={annualContribution}
                  onChange={(e) => setAnnualContribution(Number(e.target.value))}
                  className="h-9 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-medium text-zinc-700 dark:text-zinc-300">Increase (%/yr)</label>
                <Input
                  type="number"
                  step="0.5"
                  value={annualContributionIncrease}
                  onChange={(e) => setAnnualContributionIncrease(Number(e.target.value))}
                  className="h-9 text-xs"
                />
              </div>
            </div>

            {/* Monthly Contribution & Escalation */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-medium text-zinc-700 dark:text-zinc-300">Monthly Contribution</label>
                <Input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="h-9 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-medium text-zinc-700 dark:text-zinc-300">Increase (%/yr)</label>
                <Input
                  type="number"
                  step="0.5"
                  value={monthlyContributionIncrease}
                  onChange={(e) => setMonthlyContributionIncrease(Number(e.target.value))}
                  className="h-9 text-xs"
                />
              </div>
            </div>

            {/* Interest Rate & Compounding Frequency */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-medium text-zinc-700 dark:text-zinc-300">Interest Rate (%)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="h-9 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-medium text-zinc-700 dark:text-zinc-300">Compounding</label>
                <select
                  value={compoundFrequency}
                  onChange={(e) => setCompoundFrequency(e.target.value as CompoundFrequency)}
                  className="w-full h-9 px-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                >
                  <option value="daily">Daily (365/yr)</option>
                  <option value="weekly">Weekly (52/yr)</option>
                  <option value="monthly">Monthly (12/yr)</option>
                  <option value="quarterly">Quarterly (4/yr)</option>
                  <option value="semi-annually">Semi-Annually (2/yr)</option>
                  <option value="annually">Annually (1/yr)</option>
                </select>
              </div>
            </div>

            {/* Years to Save Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium text-zinc-700 dark:text-zinc-300">
                <span>Years to Save</span>
                <span className="font-bold text-blue-600">{yearsToSave} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={yearsToSave}
                onChange={(e) => setYearsToSave(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Advanced Drag Options: Tax Rate & Inflation */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-medium text-zinc-700 dark:text-zinc-300">Tax Rate (%)</label>
                <Input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="h-9 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-medium text-zinc-700 dark:text-zinc-300">Inflation Rate (%)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="h-9 text-xs"
                />
              </div>
            </div>

            {/* Goal Seek Amount (If in Goal tab) */}
            {activeTab === "goal" && (
              <div className="pt-2 border-t border-blue-100 dark:border-blue-950 space-y-1.5 bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-xl">
                <label className="font-bold text-blue-900 dark:text-blue-200 flex justify-between">
                  <span>Target Goal Amount</span>
                  <span>{formatCurrency(targetGoalAmount)}</span>
                </label>
                <Input
                  type="number"
                  value={targetGoalAmount}
                  onChange={(e) => setTargetGoalAmount(Number(e.target.value))}
                  className="h-9 text-xs bg-white dark:bg-zinc-900"
                />
              </div>
            )}

            {/* Retirement / FIRE Controls */}
            {(activeTab === "retirement" || activeTab === "fire") && (
              <div className="pt-2 border-t border-amber-100 dark:border-amber-950 space-y-3 bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-xl">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium text-zinc-700 dark:text-zinc-300">Current Age</label>
                    <Input
                      type="number"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(Number(e.target.value))}
                      className="h-8 text-xs bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-zinc-700 dark:text-zinc-300">Retirement Age</label>
                    <Input
                      type="number"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(Number(e.target.value))}
                      className="h-8 text-xs bg-white dark:bg-zinc-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-medium text-zinc-700 dark:text-zinc-300">Annual Living Expenses ($)</label>
                  <Input
                    type="number"
                    value={annualExpenses}
                    onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                    className="h-8 text-xs bg-white dark:bg-zinc-900"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: DASHBOARD & RESULTS (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* PRIMARY KPI SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-sm space-y-1 min-w-0">
              <span className="text-xs font-semibold text-blue-100 block uppercase tracking-wider leading-tight">
                End Savings Balance
              </span>
              <div className="text-lg sm:text-xl font-black tracking-tight font-sans tabular-nums leading-snug break-words my-0.5">
                {formatCurrency(results.endBalance)}
              </div>
              <span className="text-[11px] text-blue-200 block leading-tight">In {yearsToSave} years</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-1 min-w-0">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider leading-tight">
                Total Contributions
              </span>
              <div className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 tracking-tight font-sans tabular-nums leading-snug break-words my-0.5">
                {formatCurrency(results.totalContributions)}
              </div>
              <span className="text-[11px] text-emerald-600 font-bold block leading-tight">
                {results.contributionPercentOfTotal}% of total
              </span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-1 min-w-0">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider leading-tight">
                Total Interest Earned
              </span>
              <div className="text-base sm:text-lg font-black text-purple-600 dark:text-purple-400 tracking-tight font-sans tabular-nums leading-snug break-words my-0.5">
                {formatCurrency(results.totalInterestEarned)}
              </div>
              <span className="text-[11px] text-purple-500 font-bold block leading-tight">
                {results.interestPercentOfTotal}% of total
              </span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-1 min-w-0">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider leading-tight">
                Inflation Adjusted
              </span>
              <div className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-400 tracking-tight font-sans tabular-nums leading-snug break-words my-0.5">
                {formatCurrency(results.inflationAdjustedBalance)}
              </div>
              <span className="text-[11px] text-zinc-400 block leading-tight">Today's buying power</span>
            </div>
          </div>

          {/* SECONDARY METRICS BAR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-200/60 dark:border-zinc-800 text-xs">
            <div className="overflow-hidden">
              <span className="text-zinc-400 text-[10px] block">Annual APY</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums block">{results.apy}%</span>
            </div>
            <div className="overflow-hidden">
              <span className="text-zinc-400 text-[10px] block">Real Yield (Post-Tax)</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums block">{results.realReturn}%</span>
            </div>
            <div className="overflow-hidden">
              <span className="text-zinc-400 text-[10px] block">Total Tax Drag</span>
              <span className="font-bold text-rose-500 font-sans tabular-nums block">{formatCurrency(results.totalTaxPaid)}</span>
            </div>
            <div className="overflow-hidden">
              <span className="text-zinc-400 text-[10px] block">Health Score</span>
              <span className="font-bold text-emerald-600 block">{results.savingsEfficiencyScore}/100 ({results.healthRating})</span>
            </div>
          </div>

          {/* SPECIAL TAB MODE SPECIFIC PANELS */}
          {activeTab === "goal" && (
            <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">Goal Seeking Requirements for {formatCurrency(targetGoalAmount)}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-blue-100 dark:border-blue-900 overflow-hidden">
                  <span className="text-[10px] text-zinc-500 block">Req. Lump-sum Deposit</span>
                  <span className="font-black text-blue-600 text-sm font-sans tabular-nums block">{formatCurrency(results.requiredInitialDeposit)}</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-blue-100 dark:border-blue-900 overflow-hidden">
                  <span className="text-[10px] text-zinc-500 block">Req. Monthly Savings</span>
                  <span className="font-black text-blue-600 text-sm font-sans tabular-nums block">{formatCurrency(results.requiredMonthlyContribution)}/mo</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-blue-100 dark:border-blue-900 overflow-hidden">
                  <span className="text-[10px] text-zinc-500 block">Req. Annual Savings</span>
                  <span className="font-black text-blue-600 text-sm font-sans tabular-nums block">{formatCurrency(results.requiredAnnualContribution)}/yr</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "retirement" && (
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 p-4 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">Estimated Retirement Nest Egg at Age {retirementAge}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-900 overflow-hidden">
                  <span className="text-[10px] text-zinc-500 block">Total Retirement Corpus</span>
                  <span className="font-black text-emerald-600 text-base sm:text-lg font-sans tabular-nums block">{formatCurrency(results.retirementCorpus)}</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-900 overflow-hidden">
                  <span className="text-[10px] text-zinc-500 block">Est. Monthly Drawdown (4% Rule)</span>
                  <span className="font-black text-emerald-600 text-base sm:text-lg font-sans tabular-nums block">{formatCurrency(results.monthlyRetirementIncome)}/mo</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "fire" && (
            <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">FIRE Financial Independence Projections
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs">
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-amber-100 dark:border-amber-900 overflow-hidden">
                  <span className="text-[10px] text-zinc-500 block">LeanFIRE (75%)</span>
                  <span className="font-black text-amber-600 font-sans tabular-nums block">{formatCurrency(results.leanFire)}</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-amber-100 dark:border-amber-900 overflow-hidden">
                  <span className="text-[10px] text-zinc-500 block">Standard FIRE Target</span>
                  <span className="font-black text-amber-600 text-sm font-sans tabular-nums block">{formatCurrency(results.fireNumber)}</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-amber-100 dark:border-amber-900 overflow-hidden">
                  <span className="text-[10px] text-zinc-500 block">FatFIRE (150%)</span>
                  <span className="font-black text-amber-600 font-sans tabular-nums block">{formatCurrency(results.fatFire)}</span>
                </div>
              </div>
              <p className="text-[11px] text-amber-800 dark:text-amber-300 font-medium text-center">
                {results.yearsToFire
                  ? `🚀 At current savings rate, you achieve FIRE in ${results.yearsToFire} years!`
                  : "💡 Increase contributions or expected yield to reach FIRE within your savings timeline."}
              </p>
            </div>
          )}

          {/* 3. CHARTS SECTION */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center justify-between">
              <span>Savings Growth Visualizer</span>
              <span className="text-[10px] text-zinc-400 font-normal">Real-time simulation</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Doughnut Chart (Col 5) */}
              <div className="md:col-span-5 h-56 flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={doughnutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
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
                <div className="flex flex-wrap justify-center gap-3 text-[10px] font-medium text-zinc-600 dark:text-zinc-400 mt-1">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Deposit
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Contrib
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span> Interest
                  </span>
                </div>
              </div>

              {/* Stacked Growth Bar Chart (Col 7) */}
              <div className="md:col-span-7 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                    <YAxis tickFormatter={(v) => `$${v / 1000}k`} tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                    <Bar dataKey="Initial Deposit" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="Contributions" stackId="a" fill="#10b981" />
                    <Bar dataKey="Interest Earned" stackId="a" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Growth vs Purchasing Power Line Chart */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-1">
              <h4 className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                Nominal Growth vs. Inflation-Adjusted Purchasing Power
              </h4>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                    <YAxis tickFormatter={(v) => `$${v / 1000}k`} tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                    <Line type="monotone" dataKey="Ending Balance" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Real Purchasing Power" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 4. MONTE CARLO PROBABILITY SIMULATION & SCENARIOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Scenario Comparisons */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-3 text-xs">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">Return Scenarios Side-by-Side
              </h4>
              <div className="space-y-2">
                {results.scenarios.map((scen, i) => (
                  <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                    <div>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">{scen.name}</span>
                      <span className="text-[10px] text-zinc-400">Total Interest: {formatCurrency(scen.totalInterest)}</span>
                    </div>
                    <span className="font-extrabold text-blue-600">{formatCurrency(scen.endingBalance)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monte Carlo Simulation */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-3 text-xs">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-purple-600" /> Monte Carlo Simulation (300 Runs)
                </span>
                <Badge variant="outline" className="text-[10px] border-emerald-500 text-emerald-600">
                  {results.monteCarlo.successRate}% Goal Success
                </Badge>
              </h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monteCarloData}>
                    <XAxis dataKey="year" tick={{ fontSize: 9 }} />
                    <YAxis tickFormatter={(v) => `$${v / 1000}k`} tick={{ fontSize: 9 }} />
                    <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                    <Line type="monotone" dataKey="90th Percentile (Bull)" stroke="#10b981" strokeWidth={1.5} dot={false} />
                    <Line type="monotone" dataKey="50th Percentile (Median)" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="10th Percentile (Bear)" stroke="#ef4444" strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 5. CONTRIBUTION IMPACT ANALYZER */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">What Happens If You Save Slightly More?
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {results.contributionImpacts.map((item, idx) => (
                <div key={idx} className="bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] font-bold text-blue-600 block">+{item.percentIncrease}% Savings</span>
                  <span className="font-extrabold text-zinc-900 dark:text-zinc-100 block text-xs">
                    {formatCurrency(item.newEndingBalance)}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold block">
                    +{formatCurrency(item.additionalWealth)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6. MILESTONE TRACKER */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">Savings Milestone Achievements
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
          {results.milestones.map((m, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                m.achievedYear !== null
                  ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300"
                  : "bg-zinc-50 dark:bg-zinc-800/30 border-zinc-200 dark:border-zinc-800 text-zinc-400"
              }`}
            >
              <span className="font-black block text-xs">{m.label}</span>
              <span className="text-[10px] block mt-0.5">
                {m.achievedYear !== null ? `Yr ${m.achievedYear}` : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. SCHEDULE TABLES SECTION */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">Accumulation Schedule Table</h3>
            <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg text-xs">
              <button
                onClick={() => setScheduleView("annual")}
                className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer ${
                  scheduleView === "annual" ? "bg-white dark:bg-zinc-700 text-blue-600 shadow-xs" : "text-zinc-500"
                }`}
              >
                Annual
              </button>
              <button
                onClick={() => setScheduleView("monthly")}
                className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer ${
                  scheduleView === "monthly" ? "bg-white dark:bg-zinc-700 text-blue-600 shadow-xs" : "text-zinc-500"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Search & Export Toolbar */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8 pr-3 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-600 w-32 sm:w-44"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleExportCSV(false)}
              className="h-8 text-xs gap-1 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-blue-600" /> CSV
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleExportCSV(true)}
              className="h-8 text-xs gap-1 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-emerald-600" /> Excel
            </Button>
          </div>
        </div>

        {/* SCHEDULE TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3 rounded-l-lg">{scheduleView === "annual" ? "Year" : "Month"}</th>
                <th className="py-2.5 px-3">Starting Balance</th>
                <th className="py-2.5 px-3">Contributions</th>
                <th className="py-2.5 px-3">Interest Earned</th>
                <th className="py-2.5 px-3">Taxes Paid</th>
                <th className="py-2.5 px-3 text-right rounded-r-lg">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {scheduleView === "annual"
                ? results.annualSchedule
                    .filter((row) => !searchQuery || String(row.year).includes(searchQuery))
                    .map((row) => (
                      <tr key={row.year} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 font-sans tabular-nums">
                        <td className="py-2.5 px-3 font-sans font-bold text-zinc-900 dark:text-zinc-100">Year {row.year}</td>
                        <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">{formatCurrency(row.startingBalance)}</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-semibold">+{formatCurrency(row.contributions)}</td>
                        <td className="py-2.5 px-3 text-purple-600 font-semibold">+{formatCurrency(row.interestEarned)}</td>
                        <td className="py-2.5 px-3 text-rose-500">{formatCurrency(row.taxPaid)}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-blue-600">{formatCurrency(row.endingBalance)}</td>
                      </tr>
                    ))
                : results.monthlySchedule
                    .filter((row) => !searchQuery || String(row.month).includes(searchQuery) || String(row.year).includes(searchQuery))
                    .slice(0, 60) // Show first 5 years of monthly for performance
                    .map((row) => (
                      <tr key={row.month} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 font-sans tabular-nums">
                        <td className="py-2.5 px-3 font-sans font-medium text-zinc-700 dark:text-zinc-300">
                          Month {row.month} (Yr {row.year})
                        </td>
                        <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">{formatCurrency(row.startingBalance)}</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-semibold">+{formatCurrency(row.contribution)}</td>
                        <td className="py-2.5 px-3 text-purple-600 font-semibold">+{formatCurrency(row.interestEarned)}</td>
                        <td className="py-2.5 px-3 text-rose-500">{formatCurrency(row.taxPaid)}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-blue-600">{formatCurrency(row.endingBalance)}</td>
                      </tr>
                    ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REPORT MODAL PORTAL */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportData={reportData}
      />
    </div>
  );
}

export default SavingsCalculator;
