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
  BarChart,
  Bar,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import { FourZeroOneKContent } from "./FourZeroOneKContent";
import {
  calculate401kGrowth,
  calculate401kEarlyWithdrawal,
  calculate401kMatchMaximizer,
  FourZeroOneKResult,
} from "@/lib/calculator-engine/formulas/401k";

export function FourZeroOneKCalculator() {
  // Tabs: 'growth' | 'early' | 'match' | 'roth' | 'schedule'
  const [activeTab, setActiveTab] = useState<"growth" | "early" | "match" | "roth" | "schedule">("growth");

  // Mode 1 Growth Inputs
  const [currentAgeInput, setCurrentAgeInput] = useState<string>("30");
  const [currentSalaryInput, setCurrentSalaryInput] = useState<string>("75000");
  const [currentBalanceInput, setCurrentBalanceInput] = useState<string>("35000");
  const [contributionPercentInput, setContributionPercentInput] = useState<string>("10");
  const [employerMatchPercentInput, setEmployerMatchPercentInput] = useState<string>("50");
  const [employerMatchLimitPercentInput, setEmployerMatchLimitPercentInput] = useState<string>("6");
  const [retirementAgeInput, setRetirementAgeInput] = useState<string>("65");
  const [lifeExpectancyInput, setLifeExpectancyInput] = useState<string>("85");

  // Assumptions
  const [salaryIncreaseRateInput, setSalaryIncreaseRateInput] = useState<string>("3");
  const [investmentReturnInput, setInvestmentReturnInput] = useState<string>("6");
  const [inflationRateInput, setInflationRateInput] = useState<string>("3");

  // Mode 2 Early Withdrawal Inputs
  const [earlyWithdrawalAmountInput, setEarlyWithdrawalAmountInput] = useState<string>("10000");
  const [federalTaxRateInput, setFederalTaxRateInput] = useState<string>("25");
  const [stateTaxRateInput, setStateTaxRateInput] = useState<string>("5");
  const [localTaxRateInput, setLocalTaxRateInput] = useState<string>("0");
  const [hasDisabilityInput, setHasDisabilityInput] = useState<boolean>(false);

  // Table Search & Pagination
  const [tableSearch, setTableSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 12;

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Compute Results for Active Mode
  const results: FourZeroOneKResult = useMemo(() => {
    if (activeTab === "early") {
      return calculate401kEarlyWithdrawal({
        withdrawalAmount: Number(earlyWithdrawalAmountInput) || 10000,
        federalTaxRate: Number(federalTaxRateInput) || 25,
        stateTaxRate: Number(stateTaxRateInput) || 5,
        localTaxRate: Number(localTaxRateInput) || 0,
        hasDisability: hasDisabilityInput,
      });
    } else if (activeTab === "match") {
      return calculate401kMatchMaximizer({
        currentAge: Number(currentAgeInput) || 30,
        currentSalary: Number(currentSalaryInput) || 75000,
        match1Percent: Number(employerMatchPercentInput) || 50,
        match1LimitPercent: Number(employerMatchLimitPercentInput) || 6,
      });
    } else {
      // Default Growth Mode
      return calculate401kGrowth({
        currentAge: Number(currentAgeInput) || 30,
        currentSalary: Number(currentSalaryInput) || 75000,
        currentBalance: Number(currentBalanceInput) || 35000,
        contributionPercent: Number(contributionPercentInput) || 10,
        employerMatchPercent: Number(employerMatchPercentInput) || 50,
        employerMatchLimitPercent: Number(employerMatchLimitPercentInput) || 6,
        retirementAge: Number(retirementAgeInput) || 65,
        lifeExpectancy: Number(lifeExpectancyInput) || 85,
        salaryIncreaseRate: Number(salaryIncreaseRateInput) || 3,
        investmentReturn: Number(investmentReturnInput) || 6,
        inflationRate: Number(inflationRateInput) || 3,
      });
    }
  }, [
    activeTab,
    currentAgeInput,
    currentSalaryInput,
    currentBalanceInput,
    contributionPercentInput,
    employerMatchPercentInput,
    employerMatchLimitPercentInput,
    retirementAgeInput,
    lifeExpectancyInput,
    salaryIncreaseRateInput,
    investmentReturnInput,
    inflationRateInput,
    earlyWithdrawalAmountInput,
    federalTaxRateInput,
    stateTaxRateInput,
    localTaxRateInput,
    hasDisabilityInput,
  ]);

  const fmt = (val: number) => `$${val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  // Quick Presets
  const applyPreset = (sal: number, match: number, limit: number) => {
    setCurrentSalaryInput(sal.toString());
    setEmployerMatchPercentInput(match.toString());
    setEmployerMatchLimitPercentInput(limit.toString());
  };

  // Copy Summary
  const copySummary = () => {
    const text = `401(k) Retirement Growth Summary (${results.recommendation}):
------------------------------------------------
Current Age: ${results.currentAge} | Planned Retirement Age: ${results.retirementAge}
Gross Balance at Age ${results.retirementAge}: ${fmt(results.balanceAtRetirement)}
Purchasing Power in Today's Dollars: ${fmt(results.purchasingPowerAtRetirement)}
Total Employee Contributions: ${fmt(results.totalEmployeeContributions)}
Total Employer Matching: ${fmt(results.totalEmployerMatch)}
Total Investment Growth: ${fmt(results.totalInvestmentReturns)}
Monthly Withdrawal Capacity: ${fmt(results.monthlyWithdrawalFixedPurchasingPower)}/mo (Today's Dollars)`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Export CSV
  const exportCSV = () => {
    const headers = ["Age", "Year", "Salary ($)", "Employee Contrib ($)", "Employer Match ($)", "Investment Growth ($)", "Ending Balance ($)", "Purchasing Power ($)"];
    const rows = results.schedule.map((r) => [r.age, r.year, r.salary, r.employeeContrib, r.employerMatch, r.investmentGrowth, r.endingBalance, r.purchasingPower]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `401k_schedule_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Recharts Stacked Area Data
  const chartData = results.schedule
    .filter((_, idx) => idx % Math.max(1, Math.floor(results.schedule.length / 25)) === 0)
    .map((r) => ({
      name: `Age ${r.age}`,
      Employee: r.employeeContrib,
      Match: r.employerMatch,
      Growth: r.investmentGrowth,
      Balance: r.endingBalance,
      PurchasingPower: r.purchasingPower,
    }));

  // Report Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "401(k) Wealth & Retirement Acceleration Suite",
      reportTitle: "401(k) Growth & Purchasing Power Roadmap Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      { label: "Gross Balance at Retirement", value: fmt(results.balanceAtRetirement), subtitle: `At Age ${results.retirementAge}`, colorTheme: "blue" },
      { label: "Purchasing Power (Today's $)", value: fmt(results.purchasingPowerAtRetirement), subtitle: `Inflation adjusted @ ${inflationRateInput}%`, colorTheme: "emerald" },
      { label: "Safe Monthly Withdrawal", value: fmt(results.monthlyWithdrawalFixedPurchasingPower), subtitle: "Purchasing power $/mo", colorTheme: "purple" },
    ],
    sections: [
      {
        title: "401(k) Growth Breakdown",
        items: [
          { label: "Current Age", value: results.currentAge.toString() },
          { label: "Planned Retirement Age", value: results.retirementAge.toString() },
          { label: "Total Employee Deferrals", value: fmt(results.totalEmployeeContributions) },
          { label: "Total Employer Matching Free Money", value: fmt(results.totalEmployerMatch), highlight: true },
          { label: "Total Investment Compound Growth", value: fmt(results.totalInvestmentReturns), highlight: true },
          { label: "Gross 401(k) Balance", value: fmt(results.balanceAtRetirement), highlight: true },
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
            <Sparkles className="h-3 w-3" /> 401(k) Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Salary Scenarios:</span>
          <Button type="button" size="sm" variant="outline" onClick={() => applyPreset(75000, 50, 6)} className="h-6 text-[10px] px-2 cursor-pointer">
            💼 $75k Salary (50% to 6%)
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => applyPreset(100000, 100, 4)} className="h-6 text-[10px] px-2 cursor-pointer">
            🚀 $100k Salary (100% to 4%)
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => applyPreset(150000, 100, 5)} className="h-6 text-[10px] px-2 cursor-pointer">
            🌟 $150k Salary (100% to 5%)
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Gross 401(k) at Age {results.retirementAge}:</span>
          <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-sm">{fmt(results.balanceAtRetirement)}</span>
        </div>
      </div>

      {/* Navigation Tabs (All 3 Competitor Modes + Schedule) */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("growth")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "growth"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <TrendingUp className="h-4 w-4" /> 401(k) Growth &amp; Purchasing Power
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("early")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "early"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <AlertTriangle className="h-4 w-4 text-amber-500" /> Early Withdrawal Penalty
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("match")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "match"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Award className="h-4 w-4 text-emerald-500" /> Match Maximizer
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
          <FileSpreadsheet className="h-4 w-4 text-indigo-500" /> Age-by-Age Schedule
        </button>
      </div>

      {/* TAB 1: 401(k) GROWTH & PURCHASING POWER */}
      {activeTab === "growth" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Basic Info &amp; Salary
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Current Age</label>
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
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Expected Retirement Age</label>
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
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Current Annual Salary ($)</label>
                  <Input
                    type="number"
                    min="0"
                    value={currentSalaryInput}
                    onChange={(e) => setCurrentSalaryInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Current 401(k) Balance ($)</label>
                  <Input
                    type="number"
                    min="0"
                    value={currentBalanceInput}
                    onChange={(e) => setCurrentBalanceInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Deferrals & Employer Matching */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Contributions &amp; Employer Match
              </h3>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Your Deferral (% salary)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={contributionPercentInput}
                    onChange={(e) => setContributionPercentInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Employer Match (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 50%..."
                    value={employerMatchPercentInput}
                    onChange={(e) => setEmployerMatchPercentInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Match Limit (% salary)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="up to 6%..."
                    value={employerMatchLimitPercentInput}
                    onChange={(e) => setEmployerMatchLimitPercentInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Projections & Growth Assumptions */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Growth &amp; Inflation Assumptions
              </h3>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Salary Raise (%/yr)</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    value={salaryIncreaseRateInput}
                    onChange={(e) => setSalaryIncreaseRateInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Return Rate (%/yr)</label>
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
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Inflation (%/yr)</label>
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
          </div>

          {/* Right Results Dashboard (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Result Card */}
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  401(K) BALANCE AT AGE {results.retirementAge}
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copySummary}
                    className="h-7 text-xs bg-white/10 hover:bg-white/20 border-white/20 text-white cursor-pointer"
                  >
                    <Share2 className="h-3 w-3 mr-1" /> {copyNotification ? "Copied!" : "Copy"}
                  </Button>
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
                {fmt(results.balanceAtRetirement)}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 font-medium mb-3">
                <span>Purchasing Power (Today's $): <span className="font-bold text-emerald-300">{fmt(results.purchasingPowerAtRetirement)}</span></span>
              </div>

              {/* Recommendation Callout */}
              <div className="bg-white/10 p-3 rounded-xl text-xs backdrop-blur-sm border border-white/10">
                💡 <strong>Monthly Withdrawal:</strong> You can safely withdraw <strong className="text-emerald-300">{fmt(results.monthlyWithdrawalFixedPurchasingPower)}/month</strong> in today's purchasing power!
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">Employee Contrib</div>
                  <div className="font-bold font-sans tabular-nums text-white text-sm">{fmt(results.totalEmployeeContributions)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Employer Match</div>
                  <div className="font-bold font-sans tabular-nums text-emerald-300 text-sm">{fmt(results.totalEmployerMatch)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Investment Growth</div>
                  <div className="font-bold font-sans tabular-nums text-blue-300 text-sm">{fmt(results.totalInvestmentReturns)}</div>
                </div>
              </div>
            </div>

            {/* Trajectory Area Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex justify-between">
                <span>401(k) Growth Trajectory vs Purchasing Power</span>
                <span className="text-[10px] text-zinc-400 font-normal">Recharts Trend</span>
              </h4>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v: number) => `$${v}`} />
                    <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, "Value"]} />
                    <Area type="monotone" dataKey="Balance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="Gross Balance" />
                    <Area type="monotone" dataKey="PurchasingPower" stroke="#10b981" fill="#10b981" fillOpacity={0.1} name="Purchasing Power" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EARLY WITHDRAWAL PENALTY SOLVER */}
      {activeTab === "early" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Mode 2: 401(k) Early Withdrawal Costs &amp; IRS Penalty Solver
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Calculate exact IRS 10% early withdrawal penalty fees, federal/state/local tax withholding, and net cash received.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Early Withdrawal Amount ($)</label>
              <Input type="number" min="0" value={earlyWithdrawalAmountInput} onChange={(e) => setEarlyWithdrawalAmountInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Federal Tax Bracket (%)</label>
              <Input type="number" min="0" max="50" value={federalTaxRateInput} onChange={(e) => setFederalTaxRateInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">State Tax Rate (%)</label>
              <Input type="number" min="0" max="25" value={stateTaxRateInput} onChange={(e) => setStateTaxRateInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Local / City Tax Rate (%)</label>
              <Input type="number" min="0" max="10" value={localTaxRateInput} onChange={(e) => setLocalTaxRateInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
          </div>

          <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 p-6 rounded-xl space-y-3 font-sans tabular-nums text-xs">
            <div className="flex justify-between items-center text-sm font-sans font-bold text-rose-900 dark:text-rose-200 border-b pb-2">
              <span>Net Cash Received:</span>
              <span className="text-2xl font-extrabold font-sans tabular-nums text-emerald-600">{fmt(results.netCashReceived || 0)}</span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>IRS 10% Early Penalty Fee:</span>
              <span className="font-bold text-rose-600">{fmt(results.irsPenaltyAmount || 0)}</span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Total Income Taxes Withheld:</span>
              <span className="font-bold text-amber-600">{fmt(results.totalTaxAmount || 0)}</span>
            </div>
            <p className="font-sans text-xs text-rose-800 dark:text-rose-300 pt-2 border-t border-rose-200/50">
              🚨 {results.recommendation}
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: EMPLOYER MATCH MAXIMIZER */}
      {activeTab === "match" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Mode 3: Maximize Employer 401(k) Match Calculator
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Find the exact optimal contribution rate to capture 100% of your employer's matching free money.
            </p>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-6 rounded-xl space-y-3 font-sans tabular-nums text-xs">
            <div className="flex justify-between items-center text-sm font-sans font-bold text-emerald-900 dark:text-emerald-200 border-b pb-2">
              <span>Optimal Contribution Deferral Rate:</span>
              <span className="text-2xl font-extrabold font-sans tabular-nums text-emerald-600">{results.optimalContributionPercent}% of Salary</span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Maximum Employer Match Dollars:</span>
              <span className="font-bold text-emerald-600">{fmt(results.maxMatchDollars || 0)}/year</span>
            </div>
            <p className="font-sans text-xs text-emerald-800 dark:text-emerald-300 pt-2 border-t border-emerald-200/50">
              🎉 {results.recommendation}
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: AGE-BY-AGE SCHEDULE */}
      {activeTab === "schedule" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Age-by-Age 401(k) Schedule Table
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
                  <th className="p-2.5 text-right">Salary ($)</th>
                  <th className="p-2.5 text-right">Employee Contrib ($)</th>
                  <th className="p-2.5 text-right">Employer Match ($)</th>
                  <th className="p-2.5 text-right">Growth ($)</th>
                  <th className="p-2.5 text-right">Ending Balance ($)</th>
                  <th className="p-2.5 text-right">Purchasing Power ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px] font-sans tabular-nums">
                {results.schedule.map((r) => (
                  <tr key={r.age} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2.5 font-bold text-zinc-800 dark:text-zinc-200">
                      Age {r.age} ({r.year})
                    </td>
                    <td className="p-2.5 text-right">{fmt(r.salary)}</td>
                    <td className="p-2.5 text-right font-bold text-blue-600">{fmt(r.employeeContrib)}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-600">{fmt(r.employerMatch)}</td>
                    <td className="p-2.5 text-right text-indigo-600">{fmt(r.investmentGrowth)}</td>
                    <td className="p-2.5 text-right font-bold text-zinc-900 dark:text-zinc-100">{fmt(r.endingBalance)}</td>
                    <td className="p-2.5 text-right text-emerald-600">{fmt(r.purchasingPower)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 20 FAQs */}
      <FourZeroOneKContent />
    </div>
  );
}
