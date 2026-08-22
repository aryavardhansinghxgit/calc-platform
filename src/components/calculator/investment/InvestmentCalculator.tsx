"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
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
  Calendar,
} from "lucide-react";
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
  const [rateInput, setRateInput] = useState<string>("8.0");
  const [durationValInput, setDurationValInput] = useState<string>("20");
  const [durationUnit, setDurationUnit] = useState<"years" | "months">("years");
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>("annual");
  const [additionalContributionInput, setAdditionalContributionInput] = useState<string>("500");
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
  const [shareToast, setShareToast] = useState<boolean>(false);

  // ==========================================
  // PARSED NUMERIC INPUTS & CALCULATIONS
  // ==========================================
  const parsedStartingAmount = Math.max(0, Number(startingAmountInput) || 0);
  const parsedGoal = Math.max(0, Number(goalInput) || 0);
  const parsedRate = Math.max(0, Number(rateInput) || 0);
  const parsedDuration = Math.max(0.1, Number(durationValInput) || 1);
  const parsedContribution = Math.max(0, Number(additionalContributionInput) || 0);
  const parsedStepUp = Math.max(0, Number(stepUpInput) || 0);
  const parsedInflation = Math.max(0, Number(inflationInput) || 0);
  const parsedTaxRate = Math.max(0, Number(taxRateInput) || 0);
  const parsedExpenseRatio = Math.max(0, Number(expenseRatioInput) || 0);

  const results = useMemo(() => {
    return calculateInvestmentFormula({
      mode: activeMode,
      startingAmount: parsedStartingAmount,
      investmentGoal: parsedGoal,
      annualReturnRate: parsedRate,
      durationValue: parsedDuration,
      durationUnit: durationUnit,
      compoundingFrequency: compoundingFrequency,
      additionalContribution: parsedContribution,
      contributionFrequency: contributionFrequency,
      contributionTiming: contributionTiming,
      annualContributionIncrease: parsedStepUp,
      inflationRate: parsedInflation,
      taxRate: parsedTaxRate,
      expenseRatio: parsedExpenseRatio,
      currencySymbol: currencySymbol,
      monteCarloSimulationsCount: simCount,
    });
  }, [
    activeMode,
    parsedStartingAmount,
    parsedGoal,
    parsedRate,
    parsedDuration,
    durationUnit,
    compoundingFrequency,
    parsedContribution,
    contributionFrequency,
    contributionTiming,
    parsedStepUp,
    parsedInflation,
    parsedTaxRate,
    parsedExpenseRatio,
    currencySymbol,
    simCount,
  ]);

  // Doughnut Chart Data
  const doughnutData = useMemo(() => {
    return [
      { name: "Starting Principal", value: results.startingAmount, color: "#3b82f6" },
      { name: "Total Contributions", value: results.totalContributions, color: "#8b5cf6" },
      { name: "Total Growth", value: Math.max(0, results.totalInterestEarned), color: "#10b981" },
    ];
  }, [results]);

  // Reset Handler
  const handleReset = () => {
    setActiveMode("future_value");
    setStartingAmountInput("20000");
    setGoalInput("500000");
    setRateInput("8.0");
    setDurationValInput("20");
    setDurationUnit("years");
    setCompoundingFrequency("annual");
    setAdditionalContributionInput("500");
    setContributionFrequency("month");
    setContributionTiming("end");
    setStepUpInput("0");
    setInflationInput("3.0");
    setTaxRateInput("0");
    setExpenseRatioInput("0.10");
  };

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = "Year,Starting Balance,Contributions,Interest Earned,Ending Balance\n";
    const rows = results.annualSchedule
      .map(
        (r) =>
          `${r.year},${r.startingBalance.toFixed(2)},${r.contributions.toFixed(2)},${r.interestEarned.toFixed(2)},${r.endingBalance.toFixed(2)}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `investment-growth-schedule-${Date.now()}.csv`;
    a.click();
  };

  // Share link handler
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  // Report Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Investment Calculator",
      reportTitle: "Investment Portfolio & Future Value Analysis",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: currencySymbol,
    },
    keyMetrics: [
      {
        label: "Estimated Ending Portfolio Value",
        value: `${currencySymbol}${results.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        colorTheme: "blue",
      },
      {
        label: "Total Principal & Contributions",
        value: `${currencySymbol}${(results.startingAmount + results.totalContributions).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        colorTheme: "purple",
      },
      {
        label: "Total Investment Growth Earned",
        value: `${currencySymbol}${results.totalInterestEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        colorTheme: "emerald",
      },
      {
        label: "Inflation-Adjusted Real Value",
        value: `${currencySymbol}${results.inflationAdjustedFutureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        colorTheme: "amber",
      },
    ],
    sections: [
      {
        title: "Input Assumptions",
        items: [
          { label: "Starting Principal", value: `${currencySymbol}${parsedStartingAmount.toLocaleString()}` },
          { label: "Additional Contribution", value: `${currencySymbol}${parsedContribution.toLocaleString()} (${contributionFrequency})` },
          { label: "Expected Annual Return", value: `${parsedRate}%` },
          { label: "Investment Duration", value: `${parsedDuration} ${durationUnit}` },
          { label: "Compounding Frequency", value: compoundingFrequency },
          { label: "Inflation Rate", value: `${parsedInflation}%` },
        ],
      },
    ],
    table: {
      title: "Annual Accumulation Schedule",
      headers: [
        { key: "year", label: "Year" },
        { key: "starting", label: "Starting Balance" },
        { key: "contrib", label: "Contributions" },
        { key: "interest", label: "Interest Earned" },
        { key: "ending", label: "Ending Balance" },
      ],
      rows: results.annualSchedule.map((r) => ({
        year: `Year ${r.year}`,
        starting: `${currencySymbol}${r.startingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        contrib: `${currencySymbol}${r.contributions.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        interest: `${currencySymbol}${r.interestEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        ending: `${currencySymbol}${r.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      })),
    },
    notes: [
      "This investment analysis is provided for educational and illustrative purposes only. Actual market returns fluctuate and are not guaranteed.",
    ],
  };

  return (
    <div className="space-y-8 font-sans w-full">
      {/* =========================================================================
          MODE SWITCHER TABS & CURRENCY TOGGLE
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-[#EAEFF6] dark:bg-slate-800 border border-slate-300/90 dark:border-slate-700">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: "future_value", label: "Future Value" },
            { id: "contributions", label: "Target Contribution" },
            { id: "return_rate", label: "Required Return" },
            { id: "starting_amount", label: "Starting Amount" },
            { id: "retirement", label: "Retirement Goal" },
            { id: "fire", label: "FIRE Target" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveMode(tab.id as InvestmentMode)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                activeMode === tab.id
                  ? "bg-blue-600 text-white border border-blue-700"
                  : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/90 dark:hover:bg-slate-700 font-bold border border-transparent hover:border-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 px-2 self-end sm:self-auto bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
          <span className="text-[11px] font-extrabold text-slate-600 dark:text-slate-400 pl-1">Currency:</span>
          {["$", "€", "£", "₹", "C$"].map((cur) => (
            <button
              key={cur}
              type="button"
              onClick={() => setCurrencySymbol(cur)}
              className={`h-7 px-2.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                currencySymbol === cur
                  ? "bg-blue-600 text-white border border-blue-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 border border-transparent hover:border-slate-300"
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          MAIN FULL-WIDTH 2-COLUMN CALCULATOR CARD: INPUTS | RESULTS
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: INPUTS (COL 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-5">
              {/* MODE 1: FUTURE VALUE (STANDARD) */}
              {activeMode === "future_value" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Starting Principal */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Starting Principal
                      </label>
                      <div className="relative flex items-center h-12 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-600 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
                        <span className="pl-4 pr-2 text-slate-500 dark:text-slate-400 font-bold text-base select-none">
                          {currencySymbol}
                        </span>
                        <input
                          type="number"
                          value={startingAmountInput}
                          onChange={(e) => setStartingAmountInput(e.target.value)}
                          className="w-full h-full bg-transparent border-0 focus:outline-none focus:ring-0 text-base font-bold text-slate-900 dark:text-slate-100 pr-4"
                          placeholder="20000"
                        />
                      </div>
                    </div>

                    {/* Expected Annual Return */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Expected Annual Return (%)
                      </label>
                      <div className="relative flex items-center h-12 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-600 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
                        <input
                          type="number"
                          step="0.1"
                          value={rateInput}
                          onChange={(e) => setRateInput(e.target.value)}
                          className="w-full h-full bg-transparent border-0 focus:outline-none focus:ring-0 text-base font-bold text-slate-900 dark:text-slate-100 pl-4 pr-2"
                          placeholder="8.0"
                        />
                        <span className="pr-4 pl-2 text-slate-500 dark:text-slate-400 font-bold text-sm select-none">
                          %
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Additional Contribution */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Additional Contribution
                      </label>
                      <div className="relative flex items-center h-12 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-600 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
                        <span className="pl-4 pr-2 text-slate-500 dark:text-slate-400 font-bold text-base select-none">
                          {currencySymbol}
                        </span>
                        <input
                          type="number"
                          value={additionalContributionInput}
                          onChange={(e) => setAdditionalContributionInput(e.target.value)}
                          className="w-full h-full bg-transparent border-0 focus:outline-none focus:ring-0 text-base font-bold text-slate-900 dark:text-slate-100 pr-4"
                          placeholder="500"
                        />
                      </div>
                    </div>

                    {/* Frequency & Timing */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Contribution Frequency &amp; Timing
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={contributionFrequency}
                          onChange={(e) => setContributionFrequency(e.target.value as ContributionFrequency)}
                          className="h-12 rounded-xl border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 bg-[#F8FAFC] dark:bg-slate-800/90 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 px-3.5 flex-1 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        >
                          <option value="month">Monthly</option>
                          <option value="year">Annually</option>
                        </select>
                        <select
                          value={contributionTiming}
                          onChange={(e) => setContributionTiming(e.target.value as ContributionTiming)}
                          className="h-12 rounded-xl border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 bg-[#F8FAFC] dark:bg-slate-800/90 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 px-3.5 flex-1 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        >
                          <option value="end">End of Period</option>
                          <option value="beginning">Beginning</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* OTHER MODES */}
              {activeMode !== "future_value" && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                      Target Investment Goal
                    </label>
                    <div className="relative flex items-center h-12 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-600 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
                      <span className="pl-4 pr-2 text-slate-500 dark:text-slate-400 font-bold text-base select-none">
                        {currencySymbol}
                      </span>
                      <input
                        type="number"
                        value={goalInput}
                        onChange={(e) => setGoalInput(e.target.value)}
                        className="w-full h-full bg-transparent border-0 focus:outline-none focus:ring-0 text-base font-bold text-slate-900 dark:text-slate-100 pr-4"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Starting Principal Amount
                      </label>
                      <div className="relative flex items-center h-12 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-600 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
                        <span className="pl-4 pr-2 text-slate-500 dark:text-slate-400 font-bold text-base select-none">
                          {currencySymbol}
                        </span>
                        <input
                          type="number"
                          value={startingAmountInput}
                          onChange={(e) => setStartingAmountInput(e.target.value)}
                          className="w-full h-full bg-transparent border-0 focus:outline-none focus:ring-0 text-base font-bold text-slate-900 dark:text-slate-100 pr-4"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Expected Return Rate (%)
                      </label>
                      <div className="relative flex items-center h-12 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-600 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
                        <input
                          type="number"
                          step="0.1"
                          value={rateInput}
                          onChange={(e) => setRateInput(e.target.value)}
                          className="w-full h-full bg-transparent border-0 focus:outline-none focus:ring-0 text-base font-bold text-slate-900 dark:text-slate-100 pl-4 pr-2"
                        />
                        <span className="pr-4 pl-2 text-slate-500 dark:text-slate-400 font-bold text-sm select-none">
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DURATION & COMPOUNDING CONTROLS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Investment Duration
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex items-center h-12 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-600 focus-within:bg-white dark:focus-within:bg-slate-900 flex-1">
                      <input
                        type="number"
                        value={durationValInput}
                        onChange={(e) => setDurationValInput(e.target.value)}
                        className="w-full h-full bg-transparent border-0 focus:outline-none focus:ring-0 text-base font-bold text-slate-900 dark:text-slate-100 px-4"
                      />
                    </div>
                    <select
                      value={durationUnit}
                      onChange={(e) => setDurationUnit(e.target.value as "years" | "months")}
                      className="h-12 rounded-xl border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 bg-[#F8FAFC] dark:bg-slate-800/90 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 px-3.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    >
                      <option value="years">Years</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Compounding Frequency
                  </label>
                  <select
                    value={compoundingFrequency}
                    onChange={(e) => setCompoundingFrequency(e.target.value as CompoundingFrequency)}
                    className="w-full h-12 rounded-xl border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 bg-[#F8FAFC] dark:bg-slate-800/90 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 px-3.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
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

              {/* COLLAPSIBLE ADVANCED SETTINGS */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 hover:border-slate-400 transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Sliders className="h-4 w-4 text-blue-600" />
                    <span>Advanced Assumptions (Step-Up %, Inflation, Tax Drag, Expense Ratio)</span>
                  </span>
                  {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {showAdvanced && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Annual Step-Up / Contribution Increase (%)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={stepUpInput}
                        onChange={(e) => setStepUpInput(e.target.value)}
                        className="w-full h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 hover:border-slate-400 px-3.5 text-xs font-bold text-slate-900 dark:text-slate-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Inflation Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inflationInput}
                        onChange={(e) => setInflationInput(e.target.value)}
                        className="w-full h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 hover:border-slate-400 px-3.5 text-xs font-bold text-slate-900 dark:text-slate-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Tax Rate on Gains (%)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={taxRateInput}
                        onChange={(e) => setTaxRateInput(e.target.value)}
                        className="w-full h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 hover:border-slate-400 px-3.5 text-xs font-bold text-slate-900 dark:text-slate-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Expense Ratio / Management Fee (%)
                      </label>
                      <input
                        type="number"
                        step="0.05"
                        value={expenseRatioInput}
                        onChange={(e) => setExpenseRatioInput(e.target.value)}
                        className="w-full h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 hover:border-slate-400 px-3.5 text-xs font-bold text-slate-900 dark:text-slate-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS (CLEAN FLAT BORDERED BUTTONS) */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleReset}
                  className="h-12 px-4 text-xs font-bold border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4 text-slate-500" />
                  <span>Reset</span>
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="h-12 px-4 text-xs font-bold border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Share2 className="h-4 w-4 text-slate-500" />
                  <span>Share</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsReportOpen(true)}
                  className="h-12 px-6 text-sm font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 border border-blue-700 hover:border-blue-800 text-white rounded-xl transition-all ml-auto flex items-center gap-2.5 cursor-pointer"
                >
                  <Printer className="h-4 w-4" />
                  <span>Executive Report</span>
                </button>
              </div>
              {shareToast && (
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 text-right">
                  ✓ Link copied to clipboard!
                </p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: RESULTS (COL 5 - DOMINANT LAYERED RESULT PANEL) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-4">
            <div className="bg-[#F0F5FF] dark:bg-slate-900/95 border-2 border-blue-200 dark:border-blue-700/70 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
              {/* PRIMARY RESULT CARD */}
              <div className="bg-white dark:bg-slate-800/95 rounded-2xl p-5 sm:p-6 border border-blue-200/90 dark:border-blue-800/80 shadow-[0_2px_12px_-2px_rgba(37,99,235,0.08)] space-y-2">
                {activeMode === "future_value" && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                        Estimated Future Portfolio Value
                      </span>
                      <Badge className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 px-2.5 py-0.5 text-xs font-bold rounded-full">
                        {results.growthMultiple.toFixed(2)}x Growth
                      </Badge>
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-[44px] font-black text-blue-700 dark:text-blue-400 tracking-tight leading-none py-1.5">
                      {currencySymbol}{results.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <p className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 pt-1">
                      <span>Total Investment Gain:</span>
                      <span>+{currencySymbol}{results.totalInterestEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </p>
                  </>
                )}

                {activeMode === "contributions" && (
                  <>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Required Monthly Contribution
                    </span>
                    <div className="text-3xl sm:text-4xl lg:text-[44px] font-black text-blue-700 dark:text-blue-400 tracking-tight leading-none py-1.5">
                      {currencySymbol}{results.requiredMonthlyContribution.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 pt-1">
                      Annual Equivalent: <strong>{currencySymbol}{results.requiredAnnualContribution.toLocaleString()}/yr</strong>
                    </p>
                  </>
                )}

                {activeMode === "return_rate" && (
                  <>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Required Annual Return Rate
                    </span>
                    <div className="text-3xl sm:text-4xl lg:text-[44px] font-black text-blue-700 dark:text-blue-400 tracking-tight leading-none py-1.5">
                      {results.requiredReturnRate.toFixed(2)}%
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 pt-1">
                      To reach target of <strong>{currencySymbol}{parsedGoal.toLocaleString()}</strong>
                    </p>
                  </>
                )}

                {activeMode === "starting_amount" && (
                  <>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Required Starting Principal
                    </span>
                    <div className="text-3xl sm:text-4xl lg:text-[44px] font-black text-blue-700 dark:text-blue-400 tracking-tight leading-none py-1.5">
                      {currencySymbol}{results.requiredStartingAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 pt-1">
                      To reach target of <strong>{currencySymbol}{parsedGoal.toLocaleString()}</strong>
                    </p>
                  </>
                )}

                {activeMode === "retirement" && (
                  <>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Retirement Portfolio at Maturity
                    </span>
                    <div className="text-3xl sm:text-4xl lg:text-[44px] font-black text-blue-700 dark:text-blue-400 tracking-tight leading-none py-1.5">
                      {currencySymbol}{results.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 pt-1">
                      Safe Passive Income (4% Rule): <strong>{currencySymbol}{(results.estimatedPassiveIncomePerYear / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</strong>
                    </p>
                  </>
                )}

                {activeMode === "fire" && (
                  <>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      FIRE Target (25x Annual Expenses)
                    </span>
                    <div className="text-3xl sm:text-4xl lg:text-[44px] font-black text-blue-700 dark:text-blue-400 tracking-tight leading-none py-1.5">
                      {currencySymbol}{results.fireNumberTarget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 pt-1">
                      Progress: <strong>{results.goalTracker.currentProgressPercent.toFixed(1)}%</strong>
                    </p>
                  </>
                )}
              </div>

              {/* 2x2 METRICS GRID (4 DISTINCT WHITE INNER CARDS) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shadow-2xs space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Starting Principal</span>
                  <span className="text-base font-black text-slate-900 dark:text-slate-100 block">
                    {currencySymbol}{results.startingAmount.toLocaleString()}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shadow-2xs space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Total Contributions</span>
                  <span className="text-base font-black text-purple-700 dark:text-purple-400 block">
                    {currencySymbol}{results.totalContributions.toLocaleString()}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shadow-2xs space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Effective APY</span>
                  <span className="text-base font-black text-blue-700 dark:text-blue-400 block">
                    {results.effectiveAnnualReturnPercent.toFixed(2)}%
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shadow-2xs space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Est. Passive Income</span>
                  <span className="text-base font-black text-emerald-700 dark:text-emerald-400 block">
                    {currencySymbol}{results.estimatedPassiveIncomePerYear.toLocaleString()}/yr
                  </span>
                </div>
              </div>

              {/* INFLATION PURCHASING POWER CALLOUT CARD */}
              <div className="p-3.5 rounded-xl bg-amber-50/95 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs flex items-center justify-between">
                <span className="font-sans font-bold text-amber-900 dark:text-amber-200 text-xs">Real Inflation-Adjusted Power:</span>
                <span className="font-black text-amber-800 dark:text-amber-300 text-sm">
                  {currencySymbol}{results.inflationAdjustedFutureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          VISUALIZATIONS: GROWTH ACCUMULATION & ASSET BREAKDOWN (2 WHITE CARDS)
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* PORTFOLIO GROWTH AREA CHART CARD (COL 7) */}
        <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-xs sm:text-sm font-black text-blue-700 dark:text-blue-400 flex items-center gap-2 uppercase tracking-wider">
              <TrendingUp className="h-4 w-4" />
              <span>Portfolio Accumulation Over Time</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">Nominal vs Real</span>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.annualSchedule}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 10, fill: "#64748b" }} />
                <Tooltip formatter={(val: any) => [`${currencySymbol}${Number(val || 0).toLocaleString()}`, "Value"]} />
                <Area type="monotone" dataKey="endingBalance" name="Nominal Balance" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2.5} />
                <Area type="monotone" dataKey="realEndingBalance" name="Inflation Adjusted" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DOUGHNUT BREAKDOWN CARD (COL 5) */}
        <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-xs sm:text-sm font-black text-blue-700 dark:text-blue-400 flex items-center gap-2 uppercase tracking-wider">
              <PieIcon className="h-4 w-4" />
              <span>Final Portfolio Composition</span>
            </h3>
          </div>
          <div className="h-48 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={doughnutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={72}
                  paddingAngle={4}
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
          <div className="grid grid-cols-3 gap-2 text-xs pt-3 border-t border-slate-100 dark:border-slate-800 font-bold">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span>Principal: {results.percentStartingAmount.toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-purple-500" />
              <span>Contrib: {results.percentContributions.toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span>Growth: {results.percentInterest.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ACCUMULATION SCHEDULE TABLE (WHITE CARD)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>Accumulation Schedule Table</span>
            </h3>

            <div className="flex items-center gap-1 bg-[#EAEFF6] dark:bg-slate-800 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setScheduleMode("annual")}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  scheduleMode === "annual"
                    ? "bg-blue-600 text-white border border-blue-700"
                    : "text-slate-700 dark:text-slate-300 hover:text-slate-950 border border-transparent hover:border-slate-300"
                }`}
              >
                Annual
              </button>
              <button
                type="button"
                onClick={() => setScheduleMode("monthly")}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  scheduleMode === "monthly"
                    ? "bg-blue-600 text-white border border-blue-700"
                    : "text-slate-700 dark:text-slate-300 hover:text-slate-950 border border-transparent hover:border-slate-300"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="h-9 px-4 text-xs font-bold border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Download className="h-3.5 w-3.5 text-blue-600" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto max-h-80 overflow-y-auto">
          {scheduleMode === "annual" ? (
            <table className="w-full text-xs text-left">
              <thead className="bg-[#EEF4FB] dark:bg-slate-800/90 font-black text-slate-900 dark:text-slate-100 border-b-2 border-slate-300 dark:border-slate-700 sticky top-0">
                <tr>
                  <th className="p-3.5">Year</th>
                  <th className="p-3.5">Starting Balance ({currencySymbol})</th>
                  <th className="p-3.5">Contributions ({currencySymbol})</th>
                  <th className="p-3.5">Growth Earned ({currencySymbol})</th>
                  <th className="p-3.5">Ending Balance ({currencySymbol})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {results.annualSchedule.map((row) => (
                  <tr key={row.year} className="hover:bg-[#F8FAFC] dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3.5 font-bold font-sans">Year {row.year}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      {currencySymbol}{row.startingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3.5 text-purple-700 dark:text-purple-400 font-bold">
                      +{currencySymbol}{row.contributions.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-black">
                      +{currencySymbol}{row.interestEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3.5 font-black text-slate-900 dark:text-slate-100">
                      {currencySymbol}{row.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-xs text-left">
              <thead className="bg-[#EEF4FB] dark:bg-slate-800/90 font-black text-slate-900 dark:text-slate-100 border-b-2 border-slate-300 dark:border-slate-700 sticky top-0">
                <tr>
                  <th className="p-3.5">Month</th>
                  <th className="p-3.5">Beginning Balance ({currencySymbol})</th>
                  <th className="p-3.5">Contribution ({currencySymbol})</th>
                  <th className="p-3.5">Growth ({currencySymbol})</th>
                  <th className="p-3.5">Ending Balance ({currencySymbol})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {results.monthlySchedule.slice(0, 120).map((row) => (
                  <tr key={row.month} className="hover:bg-[#F8FAFC] dark:hover:bg-slate-800/60 transition-colors">
                    <td className="p-3.5 font-bold font-sans">Month {row.month}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      {currencySymbol}{row.beginningBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3.5 text-purple-700 dark:text-purple-400 font-bold">
                      +{currencySymbol}{row.contribution.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-black">
                      +{currencySymbol}{row.interest.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3.5 font-black text-slate-900 dark:text-slate-100">
                      {currencySymbol}{row.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* =========================================================================
          RELATED CALCULATORS (DIRECTLY BELOW CALCULATOR, BEFORE MAIN CONTENT)
          ========================================================================= */}
      <div className="pt-2 pb-1 space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
          RELATED CALCULATORS:
        </span>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          {[
            { label: "Compound Interest Calculator", href: "/calculators/compound-interest-calculator" },
            { label: "Savings Calculator", href: "/calculators/savings-calculator" },
            { label: "Future Value Calculator", href: "/calculators/future-value-calculator" },
            { label: "Retirement Calculator", href: "/calculators/retirement-calculator" },
            { label: "CAGR Calculator", href: "/calculators/cagr-calculator" },
            { label: "401(k) Calculator", href: "/calculators/401k-calculator" },
            { label: "SIP Calculator", href: "/calculators/sip-calculator" },
            { label: "Traditional IRA Calculator", href: "/calculators/traditional-ira-calculator" },
          ].map((item, idx, arr) => (
            <React.Fragment key={item.href}>
              <Link
                href={item.href}
                className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors"
              >
                {item.label}
              </Link>
              {idx < arr.length - 1 && (
                <span className="text-slate-400 dark:text-slate-600 select-none">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* =========================================================================
          MAIN EDUCATIONAL CONTENT & OPEN FAQS
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 space-y-8 shadow-xs text-slate-900 dark:text-slate-100">
        <InvestmentContent />
      </div>

      {/* =========================================================================
          PRINT / PDF REPORT MODAL
          ========================================================================= */}
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

export default InvestmentCalculator;
