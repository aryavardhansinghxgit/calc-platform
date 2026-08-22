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
  Target,
  Zap,
  ShieldCheck,
  Percent,
  Globe,
  Plus,
  Trash2,
  Calendar,
  RefreshCw,
  Landmark,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  calculateRetirementMode1,
  calculateRetirementMode2,
  calculateRetirementMode3,
  calculateRetirementMode4,
  RetirementResult,
} from "@/lib/calculator-engine/formulas/retirement";

export function RetirementCalculator() {
  // Tabs: 'mode1' | 'mode2' | 'mode3' | 'mode4' | 'schedule'
  const [activeTab, setActiveTab] = useState<"mode1" | "mode2" | "mode3" | "mode4" | "schedule">("mode1");

  // Common Inputs
  const [currentAgeInput, setCurrentAgeInput] = useState<string>("35");
  const [retirementAgeInput, setRetirementAgeInput] = useState<string>("67");
  const [lifeExpectancyInput, setLifeExpectancyInput] = useState<string>("85");
  const [currentIncomeInput, setCurrentIncomeInput] = useState<string>("70000");

  // Assumptions
  const [incomeIncreaseRateInput, setIncomeIncreaseRateInput] = useState<string>("3");
  const [incomeReplacementInput, setIncomeReplacementInput] = useState<string>("75");
  const [investmentReturnInput, setInvestmentReturnInput] = useState<string>("6");
  const [inflationRateInput, setInflationRateInput] = useState<string>("3");

  // Optional Inputs
  const [otherIncomeMonthlyInput, setOtherIncomeMonthlyInput] = useState<string>("0");
  const [currentSavingsInput, setCurrentSavingsInput] = useState<string>("30000");
  const [futureSavingsPercentInput, setFutureSavingsPercentInput] = useState<string>("10");

  // Mode 2 Specific
  const [targetNestEggInputMode2, setTargetNestEggInputMode2] = useState<string>("600000");

  // Mode 3 Specific
  const [annualContribInputMode3, setAnnualContribInputMode3] = useState<string>("0");
  const [monthlyContribInputMode3, setMonthlyContribInputMode3] = useState<string>("500");

  // Mode 4 Specific
  const [nestEggInputMode4, setNestEggInputMode4] = useState<string>("600000");
  const [monthlyWithdrawalInputMode4, setMonthlyWithdrawalInputMode4] = useState<string>("5000");

  // Table Search & Pagination
  const [tableSearch, setTableSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 12;

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Compute Results for Active Mode
  const results: RetirementResult = useMemo(() => {
    if (activeTab === "mode2") {
      return calculateRetirementMode2({
        currentAge: Number(currentAgeInput) || 35,
        retirementAge: Number(retirementAgeInput) || 67,
        targetNestEgg: Number(targetNestEggInputMode2) || 600000,
        currentSavings: Number(currentSavingsInput) || 30000,
        investmentReturn: Number(investmentReturnInput) || 6,
      });
    } else if (activeTab === "mode3") {
      return calculateRetirementMode3({
        currentAge: Number(currentAgeInput) || 35,
        retirementAge: Number(retirementAgeInput) || 67,
        lifeExpectancy: Number(lifeExpectancyInput) || 85,
        currentSavings: Number(currentSavingsInput) || 30000,
        annualContribution: Number(annualContribInputMode3) || 0,
        monthlyContribution: Number(monthlyContribInputMode3) || 500,
        investmentReturn: Number(investmentReturnInput) || 6,
        inflationRate: Number(inflationRateInput) || 3,
      });
    } else if (activeTab === "mode4") {
      return calculateRetirementMode4({
        nestEgg: Number(nestEggInputMode4) || 600000,
        monthlyWithdrawal: Number(monthlyWithdrawalInputMode4) || 5000,
        investmentReturn: Number(investmentReturnInput) || 6,
        inflationRate: Number(inflationRateInput) || 3,
      });
    } else {
      // Default Mode 1
      return calculateRetirementMode1({
        currentAge: Number(currentAgeInput) || 35,
        retirementAge: Number(retirementAgeInput) || 67,
        lifeExpectancy: Number(lifeExpectancyInput) || 85,
        currentIncome: Number(currentIncomeInput) || 70000,
        incomeIncreaseRate: Number(incomeIncreaseRateInput) || 3,
        incomeReplacementPercent: Number(incomeReplacementInput) || 75,
        investmentReturn: Number(investmentReturnInput) || 6,
        inflationRate: Number(inflationRateInput) || 3,
        otherIncomeMonthly: Number(otherIncomeMonthlyInput) || 0,
        currentSavings: Number(currentSavingsInput) || 30000,
        futureSavingsPercent: Number(futureSavingsPercentInput) || 10,
      });
    }
  }, [
    activeTab,
    currentAgeInput,
    retirementAgeInput,
    lifeExpectancyInput,
    currentIncomeInput,
    incomeIncreaseRateInput,
    incomeReplacementInput,
    investmentReturnInput,
    inflationRateInput,
    otherIncomeMonthlyInput,
    currentSavingsInput,
    futureSavingsPercentInput,
    targetNestEggInputMode2,
    annualContribInputMode3,
    monthlyContribInputMode3,
    nestEggInputMode4,
    monthlyWithdrawalInputMode4,
  ]);

  const fmt = (val: number) => `$${val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  // Quick Preset Handlers
  const applyPreset = (curAge: number, retAge: number, ret: number) => {
    setCurrentAgeInput(curAge.toString());
    setRetirementAgeInput(retAge.toString());
    setInvestmentReturnInput(ret.toString());
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Retirement Planning Summary (${results.recommendation}):
------------------------------------------------
Current Age: ${results.currentAge} | Planned Retirement Age: ${results.retirementAge}
Target Nest Egg: ${fmt(results.targetNestEggAtRetirement)}
Projected Savings at Retirement: ${fmt(results.projectedSavingsAtRetirement)}
Savings Gap/Surplus: ${fmt(results.savingsGapOrSurplus)}
Monthly Income Needed in Retirement: ${fmt(results.monthlyIncomeNeededAtRetirement)}
4% Withdrawal Benchmark: ${fmt(results.fourPercentRuleAnnualIncome)}/yr`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Export CSV
  const exportCSV = () => {
    const headers = ["Age", "Year", "Phase", "Starting Balance ($)", "Contribution/Withdrawal ($)", "Growth ($)", "Ending Balance ($)"];
    const rows = results.schedule.map((r) => [r.age, r.year, r.phase, r.startingBalance, r.incomeOrWithdrawal, r.contributionOrGrowth, r.endingBalance]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `retirement_schedule_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Recharts Trajectory Data
  const chartData = results.schedule
    .filter((_, idx) => idx % Math.max(1, Math.floor(results.schedule.length / 30)) === 0)
    .map((r) => ({
      name: `Age ${r.age}`,
      Balance: r.endingBalance,
    }));

  // Report Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Retirement Acceleration & Financial Independence Suite",
      reportTitle: "Retirement Nest Egg & Income Roadmap Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      { label: "Target Nest Egg Needed", value: fmt(results.targetNestEggAtRetirement), subtitle: `At Age ${results.retirementAge}`, colorTheme: "blue" },
      { label: "Projected Retirement Savings", value: fmt(results.projectedSavingsAtRetirement), subtitle: `Years to retire: ${results.yearsToRetirement}`, colorTheme: results.savingsGapOrSurplus >= 0 ? "emerald" : "rose" },
      { label: "Monthly Income Needed", value: fmt(results.monthlyIncomeNeededAtRetirement), subtitle: `4% Benchmark: ${fmt(results.fourPercentRuleAnnualIncome)}/yr`, colorTheme: "purple" },
    ],
    sections: [
      {
        title: "Retirement Planning Details",
        items: [
          { label: "Current Age", value: results.currentAge.toString() },
          { label: "Planned Retirement Age", value: results.retirementAge.toString() },
          { label: "Years in Retirement", value: results.yearsInRetirement.toString() },
          { label: "Target Nest Egg Needed", value: fmt(results.targetNestEggAtRetirement), highlight: true },
          { label: "Projected Savings at Retirement", value: fmt(results.projectedSavingsAtRetirement), highlight: true },
          { label: "Savings Gap / Surplus", value: fmt(results.savingsGapOrSurplus), highlight: true },
          { label: "4% Benchmark Annual Payout", value: fmt(results.fourPercentRuleAnnualIncome) },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top Quick Presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 gap-1 text-xs">
            <Sparkles className="h-3 w-3" /> Retirement Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Scenarios:</span>
          <Button type="button" size="sm" variant="outline" onClick={() => applyPreset(30, 50, 8)} className="h-6 text-[10px] px-2 cursor-pointer">
            🔥 FIRE Early (Age 50)
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => applyPreset(35, 67, 6)} className="h-6 text-[10px] px-2 cursor-pointer">
            Standard (Age 67)
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => applyPreset(45, 70, 5)} className="h-6 text-[10px] px-2 cursor-pointer">
            Conservative (Age 70)
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Target Nest Egg:</span>
          <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-sm">{fmt(results.targetNestEggAtRetirement)}</span>
        </div>
      </div>

      {/* Navigation Tabs (All 4 Competitor Modes + Schedule) */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("mode1")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "mode1"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Target className="h-4 w-4" /> Mode 1: Target &amp; Gap
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("mode2")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "mode2"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Zap className="h-4 w-4 text-emerald-500" /> Mode 2: Savings Goal
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("mode3")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "mode3"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <TrendingUp className="h-4 w-4 text-purple-500" /> Mode 3: Withdrawals
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("mode4")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "mode4"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Clock className="h-4 w-4 text-amber-500" /> Mode 4: Longevity
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("schedule")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "schedule"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <FileSpreadsheet className="h-4 w-4 text-indigo-500" /> Schedule
        </button>
      </div>

      {/* TAB 1: MODE 1 TARGET NEST EGG & GAP */}
      {activeTab === "mode1" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Personal Retirement Profile
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Your Current Age</label>
                  <Input
                    type="number"
                    min="18"
                    max="100"
                    value={currentAgeInput}
                    onChange={(e) => setCurrentAgeInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Planned Retirement Age</label>
                  <Input
                    type="number"
                    min="19"
                    max="100"
                    value={retirementAgeInput}
                    onChange={(e) => setRetirementAgeInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Life Expectancy</label>
                  <Input
                    type="number"
                    min="50"
                    max="120"
                    value={lifeExpectancyInput}
                    onChange={(e) => setLifeExpectancyInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Current Pre-Tax Income ($/yr)</label>
                  <Input
                    type="number"
                    min="0"
                    value={currentIncomeInput}
                    onChange={(e) => setCurrentIncomeInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Financial Assumptions */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Financial Growth &amp; Inflation Assumptions
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Income Increase Rate (%/yr)</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    value={incomeIncreaseRateInput}
                    onChange={(e) => setIncomeIncreaseRateInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Income Needed (% of income)</label>
                  <Input
                    type="number"
                    min="10"
                    max="150"
                    value={incomeReplacementInput}
                    onChange={(e) => setIncomeReplacementInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Avg Investment Return (%/yr)</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    value={investmentReturnInput}
                    onChange={(e) => setInvestmentReturnInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Inflation Rate (%/yr)</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    value={inflationRateInput}
                    onChange={(e) => setInflationRateInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Optional Contributions & Savings */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Current Savings &amp; Other Income
              </h3>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Savings Now ($)</label>
                  <Input
                    type="number"
                    min="0"
                    value={currentSavingsInput}
                    onChange={(e) => setCurrentSavingsInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Saved (% income)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={futureSavingsPercentInput}
                    onChange={(e) => setFutureSavingsPercentInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Other Income ($/mo)</label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Social Security..."
                    value={otherIncomeMonthlyInput}
                    onChange={(e) => setOtherIncomeMonthlyInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Results Dashboard (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Result Card */}
            <div className={`rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br ${
              results.savingsGapOrSurplus >= 0 ? "from-slate-900 via-indigo-950 to-blue-950" : "from-slate-900 via-rose-950 to-red-950"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  TARGET NEST EGG NEEDED (AGE {results.retirementAge})
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

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-sans tabular-nums text-white mb-2">
                {fmt(results.targetNestEggAtRetirement)}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 font-medium mb-3">
                <span>Projected Savings: <span className="font-bold text-emerald-300">{fmt(results.projectedSavingsAtRetirement)}</span></span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  results.savingsGapOrSurplus >= 0 ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                }`}>
                  {results.savingsGapOrSurplus >= 0 ? `Surplus: ${fmt(results.savingsGapOrSurplus)}` : `Gap: ${fmt(Math.abs(results.savingsGapOrSurplus))}`}
                </span>
              </div>

              {/* Recommendation Callout */}
              <div className="bg-white/10 p-3 rounded-xl text-xs backdrop-blur-sm border border-white/10">
                💡 <strong>Retirement Status:</strong> {results.recommendation}
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">Monthly Need</div>
                  <div className="font-bold font-sans tabular-nums text-white text-sm">{fmt(results.monthlyIncomeNeededAtRetirement)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">4% Benchmark</div>
                  <div className="font-bold font-sans tabular-nums text-emerald-300 text-sm">{fmt(results.fourPercentRuleAnnualIncome)}/yr</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Years to Retire</div>
                  <div className="font-bold font-sans tabular-nums text-blue-300 text-sm">{results.yearsToRetirement} Yrs</div>
                </div>
              </div>
            </div>

            {/* Trajectory Area Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex justify-between">
                <span>Wealth Trajectory (Age {results.currentAge} to {results.retirementAge + results.yearsInRetirement})</span>
                <span className="text-[10px] text-zinc-400 font-normal">Recharts Trend</span>
              </h4>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v: number) => `$${v}`} />
                    <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, "Savings Balance"]} />
                    <Area type="monotone" dataKey="Balance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MODE 2 REQUIRED SAVINGS GOAL SOLVER */}
      {activeTab === "mode2" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Mode 2: Required Savings Goal Accumulation Solver
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Calculate exactly how much you need to save each month to accumulate your desired retirement nest egg.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Amount Needed at Retirement ($)</label>
              <Input type="number" min="0" value={targetNestEggInputMode2} onChange={(e) => setTargetNestEggInputMode2(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Retirement Savings Now ($)</label>
              <Input type="number" min="0" value={currentSavingsInput} onChange={(e) => setCurrentSavingsInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-6 rounded-xl space-y-3 font-sans tabular-nums text-xs">
            <div className="flex justify-between items-center text-sm font-sans font-bold text-emerald-900 dark:text-emerald-200 border-b pb-2">
              <span>Required Monthly Contribution:</span>
              <span className="text-2xl font-extrabold font-sans tabular-nums text-emerald-600">{fmt(results.requiredMonthlyContribution || 0)}/mo</span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Required Annual Contribution:</span>
              <span className="font-bold">{fmt(results.requiredAnnualContribution || 0)}/yr</span>
            </div>
            <p className="font-sans text-xs text-emerald-800 dark:text-emerald-300 pt-2 border-t border-emerald-200/50">
              💡 {results.recommendation}
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: MODE 3 POST-RETIREMENT INCOME SOLVER */}
      {activeTab === "mode3" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Mode 3: Post-Retirement Income &amp; Withdrawal Solver
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Calculate maximum safe monthly and annual withdrawals during retirement given your savings and contributions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Monthly Contribution ($/mo)</label>
              <Input type="number" min="0" value={monthlyContribInputMode3} onChange={(e) => setMonthlyContribInputMode3(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Annual Contribution ($/yr)</label>
              <Input type="number" min="0" value={annualContribInputMode3} onChange={(e) => setAnnualContribInputMode3(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-6 rounded-xl space-y-3 font-sans tabular-nums text-xs">
            <div className="flex justify-between items-center text-sm font-sans font-bold text-purple-900 dark:text-purple-200 border-b pb-2">
              <span>Maximum Safe Monthly Withdrawal:</span>
              <span className="text-2xl font-extrabold font-sans tabular-nums text-purple-600">{fmt(results.maxMonthlyWithdrawalInRetirement || 0)}/mo</span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Maximum Safe Annual Withdrawal:</span>
              <span className="font-bold">{fmt(results.maxAnnualWithdrawalInRetirement || 0)}/yr</span>
            </div>
            <p className="font-sans text-xs text-purple-800 dark:text-purple-300 pt-2 border-t border-purple-200/50">
              💡 {results.recommendation}
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: MODE 4 NEST EGG LONGEVITY */}
      {activeTab === "mode4" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Mode 4: Nest Egg Longevity &amp; Depletion Solver
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Calculate exact years and months your retirement savings will last at your desired monthly withdrawal rate.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Nest Egg Amount ($)</label>
              <Input type="number" min="0" value={nestEggInputMode4} onChange={(e) => setNestEggInputMode4(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Planned Monthly Withdrawal ($/mo)</label>
              <Input type="number" min="0" value={monthlyWithdrawalInputMode4} onChange={(e) => setMonthlyWithdrawalInputMode4(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-6 rounded-xl space-y-3 font-sans tabular-nums text-xs">
            <div className="flex justify-between items-center text-sm font-sans font-bold text-amber-900 dark:text-amber-200 border-b pb-2">
              <span>Nest Egg Longevity Duration:</span>
              <span className="text-2xl font-extrabold font-sans tabular-nums text-amber-600">
                {results.nestEggLongevityYears} Yrs {results.nestEggLongevityMonths} Mos
              </span>
            </div>
            <p className="font-sans text-xs text-amber-800 dark:text-amber-300 pt-2 border-t border-amber-200/50">
              💡 {results.recommendation}
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: AGE-BY-AGE SCHEDULE */}
      {activeTab === "schedule" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Age-by-Age Accumulation &amp; Decumulation Schedule
            </h3>

            <div className="flex items-center gap-2">
              <Button type="button" size="sm" variant="outline" onClick={exportCSV} className="h-7 text-xs cursor-pointer">
                <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-2.5">Age / Year</th>
                  <th className="p-2.5">Phase</th>
                  <th className="p-2.5 text-right">Starting Bal</th>
                  <th className="p-2.5 text-right">Contrib / Payout</th>
                  <th className="p-2.5 text-right">Growth</th>
                  <th className="p-2.5 text-right">Ending Bal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px] font-sans tabular-nums">
                {results.schedule.map((r) => (
                  <tr key={r.age} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2.5 font-bold text-zinc-800 dark:text-zinc-200">
                      Age {r.age} ({r.year})
                    </td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.phase === "Accumulation" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" : "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                      }`}>
                        {r.phase}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">{fmt(r.startingBalance)}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-600">{fmt(r.incomeOrWithdrawal)}</td>
                    <td className="p-2.5 text-right text-indigo-600">{fmt(r.contributionOrGrowth)}</td>
                    <td className="p-2.5 text-right font-bold text-zinc-900 dark:text-zinc-100">{fmt(r.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />
    </div>
  );
}
