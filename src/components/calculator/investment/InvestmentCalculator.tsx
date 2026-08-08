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
  Download,
  Flame,
  Target,
  Scale,
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  InvestmentMode,
  CompoundingFrequency,
  ContributionFrequency,
  ContributionTiming,
  calculateInvestmentFormula,
} from "@/lib/calculator-engine/formulas/investment";
import { InvestmentContent } from "./InvestmentContent";

export function InvestmentCalculator() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [activeMode, setActiveMode] = useState<InvestmentMode>("future_value");
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // Inputs State
  const [startingAmountInput, setStartingAmountInput] = useState<string>("20000");
  const [goalInput, setGoalInput] = useState<string>("500000");
  const [rateInput, setRateInput] = useState<string>("6.0");
  const [durationValInput, setDurationValInput] = useState<string>("10");
  const [durationUnit, setDurationUnit] = useState<"years" | "months">("years");
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>("annual");
  const [additionalContributionInput, setAdditionalContributionInput] = useState<string>("1000");
  const [contributionFrequency, setContributionFrequency] = useState<ContributionFrequency>("month");
  const [contributionTiming, setContributionTiming] = useState<ContributionTiming>("end");

  // Advanced Collapsible Settings State
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [stepUpInput, setStepUpInput] = useState<string>("0");
  const [inflationInput, setInflationInput] = useState<string>("3.0");
  const [taxRateInput, setTaxRateInput] = useState<string>("0");
  const [expenseRatioInput, setExpenseRatioInput] = useState<string>("0.10");
  const [simCount, setSimCount] = useState<number>(1000);

  const [scheduleMode, setScheduleMode] = useState<"annual" | "monthly">("annual");
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [savedScenarios, setSavedScenarios] = useState<{ name: string; result: string; date: string }[]>([]);
  const [shareToast, setShareToast] = useState<boolean>(false);

  // Scenario B Comparison State
  const [showScenarioComparison, setShowScenarioComparison] = useState<boolean>(false);
  const [scenarioBRate, setScenarioBRate] = useState<string>("8.0");

  // Parse numeric inputs safely
  const parsedStarting = useMemo(() => Math.max(0, parseFloat(startingAmountInput) || 0), [startingAmountInput]);
  const parsedGoal = useMemo(() => Math.max(0, parseFloat(goalInput) || 0), [goalInput]);
  const parsedRate = useMemo(() => Math.max(0, parseFloat(rateInput) || 0), [rateInput]);
  const parsedDuration = useMemo(() => Math.max(0, parseFloat(durationValInput) || 0), [durationValInput]);
  const parsedContrib = useMemo(() => Math.max(0, parseFloat(additionalContributionInput) || 0), [additionalContributionInput]);
  const parsedStepUp = useMemo(() => Math.max(0, parseFloat(stepUpInput) || 0), [stepUpInput]);
  const parsedInflation = useMemo(() => Math.max(0, parseFloat(inflationInput) || 0), [inflationInput]);
  const parsedTax = useMemo(() => Math.max(0, parseFloat(taxRateInput) || 0), [taxRateInput]);
  const parsedExpense = useMemo(() => Math.max(0, parseFloat(expenseRatioInput) || 0), [expenseRatioInput]);
  const parsedScenarioBRate = useMemo(() => Math.max(0, parseFloat(scenarioBRate) || 0), [scenarioBRate]);

  // Execute Main Investment Engine Math
  const results = useMemo(
    () =>
      calculateInvestmentFormula({
        mode: activeMode,
        startingAmount: parsedStarting,
        investmentGoal: parsedGoal,
        annualReturnRate: parsedRate,
        durationValue: parsedDuration,
        durationUnit,
        compoundingFrequency,
        additionalContribution: parsedContrib,
        contributionFrequency,
        contributionTiming,
        annualContributionIncrease: parsedStepUp,
        inflationRate: parsedInflation,
        taxRate: parsedTax,
        expenseRatio: parsedExpense,
        currencySymbol,
        monteCarloSimulationsCount: simCount,
      }),
    [
      activeMode,
      parsedStarting,
      parsedGoal,
      parsedRate,
      parsedDuration,
      durationUnit,
      compoundingFrequency,
      parsedContrib,
      contributionFrequency,
      contributionTiming,
      parsedStepUp,
      parsedInflation,
      parsedTax,
      parsedExpense,
      currencySymbol,
      simCount,
    ]
  );

  // Scenario B Results calculation for comparison
  const scenarioBResults = useMemo(
    () =>
      calculateInvestmentFormula({
        mode: activeMode,
        startingAmount: parsedStarting,
        investmentGoal: parsedGoal,
        annualReturnRate: parsedScenarioBRate,
        durationValue: parsedDuration,
        durationUnit,
        compoundingFrequency,
        additionalContribution: parsedContrib,
        contributionFrequency,
        contributionTiming,
        annualContributionIncrease: parsedStepUp,
        inflationRate: parsedInflation,
        taxRate: parsedTax,
        expenseRatio: parsedExpense,
        currencySymbol,
        monteCarloSimulationsCount: 100,
      }),
    [
      activeMode,
      parsedStarting,
      parsedGoal,
      parsedScenarioBRate,
      parsedDuration,
      durationUnit,
      compoundingFrequency,
      parsedContrib,
      contributionFrequency,
      contributionTiming,
      parsedStepUp,
      parsedInflation,
      parsedTax,
      parsedExpense,
      currencySymbol,
    ]
  );

  // Recharts Chart Data
  const doughnutData = useMemo(
    () => [
      { name: "Starting Principal", value: results.startingAmount, color: "#3b82f6" },
      { name: "Total Contributions", value: results.totalContributions, color: "#8b5cf6" },
      { name: "Total Investment Gains", value: results.totalInterestEarned, color: "#10b981" },
    ],
    [results.startingAmount, results.totalContributions, results.totalInterestEarned]
  );

  const scenarioComparisonData = useMemo(
    () => [
      { name: `Scenario A (${parsedRate}%)`, Balance: results.endingBalance, Interest: results.totalInterestEarned },
      { name: `Scenario B (${parsedScenarioBRate}%)`, Balance: scenarioBResults.endingBalance, Interest: scenarioBResults.totalInterestEarned },
    ],
    [results, scenarioBResults, parsedRate, parsedScenarioBRate]
  );

  // Executive PDF Report Data
  const reportData: CalculatorReportData = useMemo(
    () => ({
      meta: {
        calculatorName: "Investment Calculator",
        reportTitle: "Investment Portfolio & Wealth Projection Executive Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        currencySymbol,
      },
      keyMetrics: [
        { label: "Future Portfolio Value", value: `${currencySymbol}${results.endingBalance.toLocaleString()}`, colorTheme: "blue" },
        { label: "Total Investment Gain", value: `${currencySymbol}${results.totalInterestEarned.toLocaleString()}`, colorTheme: "emerald" },
        { label: "Total Principal Contributed", value: `${currencySymbol}${results.totalPrincipal.toLocaleString()}`, colorTheme: "purple" },
        { label: "Inflation-Adjusted Value", value: `${currencySymbol}${results.inflationAdjustedFutureValue.toLocaleString()}`, colorTheme: "amber" },
      ],
      sections: [
        {
          title: "Calculation Parameters",
          items: [
            { label: "Calculator Mode", value: activeMode.toUpperCase() },
            { label: "Starting Principal", value: `${currencySymbol}${results.startingAmount.toLocaleString()}` },
            { label: "Recurring Contribution", value: `${currencySymbol}${parsedContrib.toLocaleString()}/${contributionFrequency}` },
            { label: "Annual Rate of Return", value: `${parsedRate}%` },
            { label: "Investment Duration", value: `${parsedDuration} ${durationUnit}` },
          ],
        },
        {
          title: "Performance & Wealth Metrics",
          items: [
            { label: "Effective APY", value: `${results.effectiveAnnualReturnPercent.toFixed(2)}%` },
            { label: "Growth Multiple", value: `${results.growthMultiple.toFixed(2)}x` },
            { label: "Est. Passive Income (4% Rule)", value: `${currencySymbol}${results.estimatedPassiveIncomePerYear.toLocaleString()}/yr` },
            { label: "Monte Carlo Success Rate", value: `${results.monteCarlo.successProbabilityPercent.toFixed(1)}%` },
          ],
        },
      ],
      table: {
        title: "Annual Accumulation Schedule",
        headers: [
          { key: "year", label: "Year" },
          { key: "startingBalance", label: "Starting Balance" },
          { key: "contributions", label: "Contributions" },
          { key: "interestEarned", label: "Interest Earned" },
          { key: "endingBalance", label: "Ending Balance" },
        ],
        rows: results.annualSchedule as any,
      },
      notes: [
        `Portfolio simulated across ${results.annualSchedule.length} annual periods.`,
        `Inflation rate assumption configured to ${parsedInflation}% per annum.`,
      ],
    }),
    [currencySymbol, results, activeMode, parsedContrib, contributionFrequency, parsedRate, parsedDuration, durationUnit, parsedInflation]
  );

  // CSV Export Handler
  const handleExportCSV = () => {
    const isAnn = scheduleMode === "annual";
    const headers = isAnn
      ? ["Year", "Starting Balance", "Contributions", "Interest Earned", "Fees Paid", "Ending Balance"]
      : ["Month", "Beginning Balance", "Contribution", "Interest", "Fees Paid", "Ending Balance"];

    const rows = isAnn
      ? results.annualSchedule.map((r) => [r.year, r.startingBalance, r.contributions, r.interestEarned, r.feesPaid, r.endingBalance])
      : results.monthlySchedule.map((r) => [r.month, r.beginningBalance, r.contribution, r.interest, r.fees, r.endingBalance]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `investment_schedule_${scheduleMode}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveScenario = () => {
    const newSaved = [
      ...savedScenarios,
      {
        name: `Investment (${currencySymbol}${results.startingAmount.toLocaleString()} @ ${parsedRate}%)`,
        result: `${currencySymbol}${results.endingBalance.toLocaleString()}`,
        date: new Date().toLocaleDateString(),
      },
    ];
    setSavedScenarios(newSaved);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      {/* ==========================================
          SECTION 1: HERO HEADER & QUICK ACTIONS
         ========================================== */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <TrendingUp className="h-3.5 w-3.5" /> Investment Planning Suite
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-medium border border-emerald-400/30">
              <Zap className="h-3 w-3" /> Monte Carlo Engine
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Investment Calculator
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/80 mt-1 max-w-3xl leading-relaxed">
              Model portfolio growth across 6 operational modes, simulate Monte Carlo market risk (1,000-10,000 runs), track target wealth goals, evaluate fee & tax drag, and export schedule tables.
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> 6 Operational Modes
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Monte Carlo Risk Simulations
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Inflation & Fee Drag Analysis
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Goal Tracker Timeline
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Printable PDF Executive Report
            </Badge>
          </div>
        </div>
      </div>

      {/* ==========================================
          ACTION CONTROLS BAR
         ========================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
          <Sliders className="h-4 w-4 text-blue-600" /> Calculation Controls
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Currency Selector */}
          <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg text-xs font-medium">
            <span className="text-zinc-500 pl-1">Currency:</span>
            {["$", "€", "£", "¥", "₹"].map((cur) => (
              <button
                key={cur}
                type="button"
                onClick={() => setCurrencySymbol(cur)}
                className={`px-2 py-0.5 rounded font-mono font-bold text-xs transition-colors ${
                  currencySymbol === cur
                    ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                {cur}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveScenario}
            className="h-8 text-xs font-semibold gap-1.5"
          >
            <Bookmark className="h-3.5 w-3.5 text-indigo-500" /> Save Scenario
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="h-8 text-xs font-semibold gap-1.5"
          >
            <Share2 className="h-3.5 w-3.5 text-blue-500" /> Share Result
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsReportOpen(true)}
            className="h-8 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white gap-1.5"
          >
            <Printer className="h-3.5 w-3.5" /> Printable PDF Report
          </Button>
        </div>
      </div>

      {shareToast && (
        <div className="p-3 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Link copied to clipboard!
        </div>
      )}

      {/* ==========================================
          MAIN CALCULATOR GRID (COL-7 INPUTS | COL-5 DASHBOARD)
         ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: 6 MODE TABS & INPUTS (COL 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
            {/* Mode Navigation Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
              {[
                { id: "future_value", label: "Future Value" },
                { id: "contributions", label: "Contributions" },
                { id: "return_rate", label: "Return Rate" },
                { id: "starting_amount", label: "Starting Amount" },
                { id: "retirement", label: "Retirement" },
                { id: "fire", label: "FIRE Target" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveMode(tab.id as InvestmentMode)}
                  className={`py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeMode === tab.id
                      ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Core Inputs based on activeMode */}
            <div className="space-y-4 pt-1">
              {/* MODE 1: FUTURE VALUE */}
              {activeMode === "future_value" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Starting Principal Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-mono">
                          {currencySymbol}
                        </span>
                        <Input
                          type="number"
                          value={startingAmountInput}
                          onChange={(e) => setStartingAmountInput(e.target.value)}
                          className="pl-7 h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Expected Return Rate (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={rateInput}
                        onChange={(e) => setRateInput(e.target.value)}
                        className="h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Additional Contribution ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-mono">
                          {currencySymbol}
                        </span>
                        <Input
                          type="number"
                          value={additionalContributionInput}
                          onChange={(e) => setAdditionalContributionInput(e.target.value)}
                          className="pl-7 h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Contribution Frequency & Timing
                      </label>
                      <div className="flex gap-1.5">
                        <select
                          value={contributionFrequency}
                          onChange={(e) => setContributionFrequency(e.target.value as ContributionFrequency)}
                          className="h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs px-2 font-medium text-zinc-900 dark:text-zinc-100 flex-1"
                        >
                          <option value="month">Monthly</option>
                          <option value="year">Annually</option>
                        </select>
                        <select
                          value={contributionTiming}
                          onChange={(e) => setContributionTiming(e.target.value as ContributionTiming)}
                          className="h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs px-2 font-medium text-zinc-900 dark:text-zinc-100 flex-1"
                        >
                          <option value="end">End of Period</option>
                          <option value="beginning">Beginning of Period</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* MODE 2: CONTRIBUTIONS */}
              {activeMode === "contributions" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Target Investment Goal ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-mono">
                        {currencySymbol}
                      </span>
                      <Input
                        type="number"
                        value={goalInput}
                        onChange={(e) => setGoalInput(e.target.value)}
                        className="pl-7 h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Starting Principal Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-mono">
                          {currencySymbol}
                        </span>
                        <Input
                          type="number"
                          value={startingAmountInput}
                          onChange={(e) => setStartingAmountInput(e.target.value)}
                          className="pl-7 h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Expected Return Rate (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={rateInput}
                        onChange={(e) => setRateInput(e.target.value)}
                        className="h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* MODE 3: RETURN RATE */}
              {activeMode === "return_rate" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Target Investment Goal ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-mono">
                          {currencySymbol}
                        </span>
                        <Input
                          type="number"
                          value={goalInput}
                          onChange={(e) => setGoalInput(e.target.value)}
                          className="pl-7 h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Starting Principal Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-mono">
                          {currencySymbol}
                        </span>
                        <Input
                          type="number"
                          value={startingAmountInput}
                          onChange={(e) => setStartingAmountInput(e.target.value)}
                          className="pl-7 h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Additional Contribution ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-mono">
                        {currencySymbol}
                      </span>
                      <Input
                        type="number"
                        value={additionalContributionInput}
                        onChange={(e) => setAdditionalContributionInput(e.target.value)}
                        className="pl-7 h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* MODE 4: STARTING AMOUNT */}
              {activeMode === "starting_amount" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Target Investment Goal ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-mono">
                          {currencySymbol}
                        </span>
                        <Input
                          type="number"
                          value={goalInput}
                          onChange={(e) => setGoalInput(e.target.value)}
                          className="pl-7 h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Expected Return Rate (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={rateInput}
                        onChange={(e) => setRateInput(e.target.value)}
                        className="h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Additional Contribution ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-mono">
                        {currencySymbol}
                      </span>
                      <Input
                        type="number"
                        value={additionalContributionInput}
                        onChange={(e) => setAdditionalContributionInput(e.target.value)}
                        className="pl-7 h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* MODE 5: RETIREMENT */}
              {activeMode === "retirement" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Current Retirement Savings
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-mono">
                          {currencySymbol}
                        </span>
                        <Input
                          type="number"
                          value={startingAmountInput}
                          onChange={(e) => setStartingAmountInput(e.target.value)}
                          className="pl-7 h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Monthly Contribution ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-mono">
                          {currencySymbol}
                        </span>
                        <Input
                          type="number"
                          value={additionalContributionInput}
                          onChange={(e) => setAdditionalContributionInput(e.target.value)}
                          className="pl-7 h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Expected Annual Return (%)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={rateInput}
                      onChange={(e) => setRateInput(e.target.value)}
                      className="h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                    />
                  </div>
                </>
              )}

              {/* MODE 6: FIRE TARGET */}
              {activeMode === "fire" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Expected Annual Living Expenses ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-mono">
                        {currencySymbol}
                      </span>
                      <Input
                        type="number"
                        value={additionalContributionInput}
                        onChange={(e) => setAdditionalContributionInput(e.target.value)}
                        className="pl-7 h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Current Savings / Capital ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-mono">
                          {currencySymbol}
                        </span>
                        <Input
                          type="number"
                          value={startingAmountInput}
                          onChange={(e) => setStartingAmountInput(e.target.value)}
                          className="pl-7 h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Expected Annual Return (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={rateInput}
                        onChange={(e) => setRateInput(e.target.value)}
                        className="h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Common Duration & Frequency Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Investment Duration
                  </label>
                  <div className="flex gap-1.5">
                    <Input
                      type="number"
                      value={durationValInput}
                      onChange={(e) => setDurationValInput(e.target.value)}
                      className="h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950 flex-1"
                    />
                    <select
                      value={durationUnit}
                      onChange={(e) => setDurationUnit(e.target.value as "years" | "months")}
                      className="h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs px-2 font-medium text-zinc-900 dark:text-zinc-100"
                    >
                      <option value="years">Years</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Compounding Frequency
                  </label>
                  <select
                    value={compoundingFrequency}
                    onChange={(e) => setCompoundingFrequency(e.target.value as CompoundingFrequency)}
                    className="w-full h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs px-2 font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="annual">Annually (1/yr)</option>
                    <option value="semi-annual">Semi-Annually (2/yr)</option>
                    <option value="quarterly">Quarterly (4/yr)</option>
                    <option value="monthly">Monthly (12/yr)</option>
                    <option value="weekly">Weekly (52/yr)</option>
                    <option value="daily">Daily (365/yr)</option>
                  </select>
                </div>
              </div>

              {/* COLLAPSIBLE ADVANCED SETTINGS PANEL */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full text-xs font-bold text-indigo-600 dark:text-indigo-400 py-1"
                >
                  <span className="flex items-center gap-1.5">
                    <Sliders className="h-3.5 w-3.5" /> Advanced Investment Settings (Fees, Inflation, Taxes, Step-Up %)
                  </span>
                  {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {showAdvanced && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <div>
                      <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">
                        Annual Contribution Increase / Step-Up (%)
                      </label>
                      <Input
                        type="number"
                        step="0.5"
                        value={stepUpInput}
                        onChange={(e) => setStepUpInput(e.target.value)}
                        className="h-8 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">
                        Inflation Rate (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={inflationInput}
                        onChange={(e) => setInflationInput(e.target.value)}
                        className="h-8 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">
                        Tax Rate (%)
                      </label>
                      <Input
                        type="number"
                        step="0.5"
                        value={taxRateInput}
                        onChange={(e) => setTaxRateInput(e.target.value)}
                        className="h-8 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">
                        Management Fee / Expense Ratio (%)
                      </label>
                      <Input
                        type="number"
                        step="0.05"
                        value={expenseRatioInput}
                        onChange={(e) => setExpenseRatioInput(e.target.value)}
                        className="h-8 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS DASHBOARD CARD (COL 5) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-4">
          <div className="bg-gradient-to-br from-zinc-900 via-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-xl border border-zinc-800 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-400">
                Investment Portfolio Output ({activeMode.toUpperCase()})
              </span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 text-[10px]">
                {results.growthMultiple.toFixed(2)}x Growth
              </Badge>
            </div>

            {/* DYNAMIC MAIN RESULT DISPLAY PER MODE */}
            {activeMode === "future_value" && (
              <div>
                <span className="text-xs text-zinc-400 block font-medium">Future Portfolio Value</span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight font-mono mt-1">
                  {currencySymbol}{results.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-[11px] text-blue-200/80 mt-1 font-sans">
                  Total Investment Gain: <strong className="text-white">{currencySymbol}{results.totalInterestEarned.toLocaleString()}</strong>
                </p>
              </div>
            )}

            {activeMode === "contributions" && (
              <div>
                <span className="text-xs text-zinc-400 block font-medium">Required Monthly Contribution</span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight font-mono mt-1">
                  {currencySymbol}{results.requiredMonthlyContribution.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo
                </div>
                <p className="text-[11px] text-blue-200/80 mt-1 font-sans">
                  Annual Equivalent: <strong className="text-white">{currencySymbol}{results.requiredAnnualContribution.toLocaleString()}/yr</strong>
                </p>
              </div>
            )}

            {activeMode === "return_rate" && (
              <div>
                <span className="text-xs text-zinc-400 block font-medium">Required Annual Return Rate</span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight font-mono mt-1">
                  {results.requiredReturnRate.toFixed(2)}%
                </div>
                <p className="text-[11px] text-blue-200/80 mt-1 font-sans">
                  To reach goal of <strong className="text-white">{currencySymbol}{parsedGoal.toLocaleString()}</strong>
                </p>
              </div>
            )}

            {activeMode === "starting_amount" && (
              <div>
                <span className="text-xs text-zinc-400 block font-medium">Required Starting Principal</span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight font-mono mt-1">
                  {currencySymbol}{results.requiredStartingAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-[11px] text-blue-200/80 mt-1 font-sans">
                  To reach goal of <strong className="text-white">{currencySymbol}{parsedGoal.toLocaleString()}</strong>
                </p>
              </div>
            )}

            {activeMode === "retirement" && (
              <div>
                <span className="text-xs text-zinc-400 block font-medium">Retirement Portfolio at Maturity</span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight font-mono mt-1">
                  {currencySymbol}{results.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-[11px] text-blue-200/80 mt-1 font-sans">
                  Est. Safe Passive Income (4% Rule): <strong className="text-white">{currencySymbol}{(results.estimatedPassiveIncomePerYear / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</strong>
                </p>
              </div>
            )}

            {activeMode === "fire" && (
              <div>
                <span className="text-xs text-zinc-400 block font-medium">FIRE Number Target (25x Expenses)</span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight font-mono mt-1">
                  {currencySymbol}{results.fireNumberTarget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-[11px] text-blue-200/80 mt-1 font-sans">
                  Projected Portfolio: <strong className="text-white">{currencySymbol}{results.endingBalance.toLocaleString()} ({results.goalTracker.currentProgressPercent.toFixed(1)}% Progress)</strong>
                </p>
              </div>
            )}

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Starting Principal</span>
                <span className="text-base font-bold text-white font-mono">
                  {currencySymbol}{results.startingAmount.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Total Contributions</span>
                <span className="text-base font-bold text-purple-300 font-mono">
                  {currencySymbol}{results.totalContributions.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Effective APY</span>
                <span className="text-base font-bold text-emerald-300 font-mono">
                  {results.effectiveAnnualReturnPercent.toFixed(2)}%
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Est. Passive Income</span>
                <span className="text-base font-bold text-emerald-300 font-mono">
                  {currencySymbol}{results.estimatedPassiveIncomePerYear.toLocaleString()}/yr
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-900/40 border border-amber-500/30 text-xs text-amber-100 flex items-center justify-between font-mono">
              <span>Inflation-Adjusted Purchasing Power:</span>
              <span className="font-bold text-amber-300">
                {currencySymbol}{results.inflationAdjustedFutureValue.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 2: MONTE CARLO RISK SIMULATOR & GOAL TRACKER
         ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* MONTE CARLO STOCHASTIC SIMULATOR (COL 7) */}
        <div className="md:col-span-7 bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-600" /> Monte Carlo Stochastic Risk Simulation ({simCount.toLocaleString()} Runs)
            </h3>
            <div className="flex gap-1">
              {[1000, 5000].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setSimCount(cnt)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    simCount === cnt ? "bg-emerald-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600"
                  }`}
                >
                  {cnt} Runs
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
              <span className="text-[10px] text-rose-600 block font-sans font-bold">10th % (Worst Case)</span>
              <span className="font-bold text-rose-700 dark:text-rose-400">
                {currencySymbol}{results.monteCarlo.worstCase10th.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
              <span className="text-[10px] text-blue-600 block font-sans font-bold">50th % (Average Case)</span>
              <span className="font-bold text-blue-700 dark:text-blue-400">
                {currencySymbol}{results.monteCarlo.averageCase50th.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <span className="text-[10px] text-emerald-600 block font-sans font-bold">90th % (Best Case)</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                {currencySymbol}{results.monteCarlo.bestCase90th.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs flex items-center justify-between font-mono">
            <span className="font-sans text-zinc-600 dark:text-zinc-400">Probability of Achieving Target Goal:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              {results.monteCarlo.successProbabilityPercent.toFixed(1)}% Success Rate
            </span>
          </div>
        </div>

        {/* GOAL TRACKER TIMELINE (COL 5) */}
        <div className="md:col-span-5 bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <Target className="h-4 w-4 text-indigo-600" /> Target Investment Goal Tracker
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">
                Set Target Goal ($)
              </label>
              <Input
                type="number"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="h-8 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold">
                <span>Progress: {results.goalTracker.currentProgressPercent.toFixed(1)}%</span>
                <span>{currencySymbol}{results.endingBalance.toLocaleString()} / {currencySymbol}{parsedGoal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, results.goalTracker.currentProgressPercent)}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-1 font-mono text-[11px]">
              <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                <span>Req. Monthly Savings to Hit Goal:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {currencySymbol}{results.goalTracker.requiredMonthlySavingsToGoal.toLocaleString()}/mo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 3: INVESTMENT SCENARIO COMPARISON TOOL
         ========================================== */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <h2 className="text-base font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Scale className="h-5 w-5 text-purple-600" /> Investment Scenario Comparison Tool
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowScenarioComparison(!showScenarioComparison)}
            className="h-7 text-xs font-bold gap-1"
          >
            {showScenarioComparison ? "Hide Comparison" : "Compare Scenarios"}
          </Button>
        </div>

        {showScenarioComparison && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Scenario B Expected Rate (%)
                </label>
                <Input
                  type="number"
                  step="0.5"
                  value={scenarioBRate}
                  onChange={(e) => setScenarioBRate(e.target.value)}
                  className="h-8 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span>Scenario A ({parsedRate}%):</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    {currencySymbol}{results.endingBalance.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-800 pt-1.5">
                  <span>Scenario B ({parsedScenarioBRate}%):</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {currencySymbol}{scenarioBResults.endingBalance.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-800 pt-1.5">
                  <span>Wealth Difference:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {scenarioBResults.endingBalance >= results.endingBalance ? "+" : ""}
                    {currencySymbol}{(scenarioBResults.endingBalance - results.endingBalance).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-2">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Scenario A vs Scenario B Portfolio Growth Comparison
              </span>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scenarioComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(val: any) => [`${currencySymbol}${Number(val || 0).toLocaleString()}`, "Value"]} />
                    <Bar dataKey="Balance" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==========================================
          SECTION 4: RECHARTS VISUALIZATIONS GRID
         ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* PORTFOLIO GROWTH AREA CHART (COL 7) */}
        <div className="md:col-span-7 bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
            Portfolio Accumulation & Inflation-Adjusted Purchasing Power
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.annualSchedule}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(val: any) => [`${currencySymbol}${Number(val || 0).toLocaleString()}`, "Value"]} />
                <Area type="monotone" dataKey="endingBalance" name="Nominal Balance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                <Area type="monotone" dataKey="realEndingBalance" name="Inflation Adjusted" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DOUGHNUT BREAKDOWN CHART (COL 5) */}
        <div className="md:col-span-5 bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
            Final Portfolio Composition
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={doughnutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {doughnutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${currencySymbol}${Number(val || 0).toLocaleString()}`, "Amount"]} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[11px] pt-2 border-t border-zinc-100 dark:border-zinc-800 font-medium">
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-2.5 rounded bg-blue-500" />
              <span>Principal: {results.percentStartingAmount.toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-2.5 rounded bg-purple-500" />
              <span>Contrib: {results.percentContributions.toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-2.5 rounded bg-emerald-500" />
              <span>Interest: {results.percentInterest.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 5: SCHEDULE TABLES & EXPORTS
         ========================================== */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" /> Accumulation Schedule Table
            </h2>

            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setScheduleMode("annual")}
                className={`px-2 py-0.5 rounded font-semibold text-xs transition-colors ${
                  scheduleMode === "annual"
                    ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                Annual
              </button>
              <button
                type="button"
                onClick={() => setScheduleMode("monthly")}
                className={`px-2 py-0.5 rounded font-semibold text-xs transition-colors ${
                  scheduleMode === "monthly"
                    ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="h-8 text-xs font-bold gap-1.5"
          >
            <Download className="h-3.5 w-3.5 text-blue-600" /> Export CSV
          </Button>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto">
          {scheduleMode === "annual" ? (
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-950 font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3">Year</th>
                  <th className="p-3">Starting Balance ({currencySymbol})</th>
                  <th className="p-3">Contributions ({currencySymbol})</th>
                  <th className="p-3">Interest Earned ({currencySymbol})</th>
                  <th className="p-3">Ending Balance ({currencySymbol})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-mono">
                {results.annualSchedule.map((row) => (
                  <tr key={row.year} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="p-3 font-bold font-sans">Year {row.year}</td>
                    <td className="p-3 text-zinc-600 dark:text-zinc-400">
                      {currencySymbol}{row.startingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-purple-600 dark:text-purple-400 font-semibold">
                      +{currencySymbol}{row.contributions.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">
                      +{currencySymbol}{row.interestEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 font-bold text-zinc-900 dark:text-zinc-100">
                      {currencySymbol}{row.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-950 font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3">Month</th>
                  <th className="p-3">Beginning Balance ({currencySymbol})</th>
                  <th className="p-3">Contribution ({currencySymbol})</th>
                  <th className="p-3">Interest ({currencySymbol})</th>
                  <th className="p-3">Ending Balance ({currencySymbol})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-mono">
                {results.monthlySchedule.map((row) => (
                  <tr key={row.month} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="p-3 font-bold font-sans">Month {row.month}</td>
                    <td className="p-3 text-zinc-600 dark:text-zinc-400">
                      {currencySymbol}{row.beginningBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-purple-600 dark:text-purple-400 font-semibold">
                      +{currencySymbol}{row.contribution.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">
                      +{currencySymbol}{row.interest.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 font-bold text-zinc-900 dark:text-zinc-100">
                      {currencySymbol}{row.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ==========================================
          SECTION 6: EDUCATIONAL CONTENT & FAQS COMPONENT
         ========================================== */}
      <InvestmentContent />

      {/* ==========================================
          EXECUTIVE PRINT / PDF REPORT MODAL
         ========================================== */}
      {isReportOpen && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          reportData={reportData}
        />
      )}
    </div>
  );
}
