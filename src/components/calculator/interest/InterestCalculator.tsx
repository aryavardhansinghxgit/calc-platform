"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Trash2,
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
  CompoundingFrequency,
  ContributionTiming,
  calculateInterestFormula,
} from "@/lib/calculator-engine/formulas/interest";
import { InterestContent } from "./InterestContent";

export function InterestCalculator() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");
  const [initialInvestmentInput, setInitialInvestmentInput] = useState<string>("20000");
  const [annualContributionInput, setAnnualContributionInput] = useState<string>("5000");
  const [monthlyContributionInput, setMonthlyContributionInput] = useState<string>("0");
  const [contributionTiming, setContributionTiming] = useState<ContributionTiming>("end");
  const [rateInput, setRateInput] = useState<string>("5.0");
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>("annual");
  const [yearsInput, setYearsInput] = useState<string>("5");
  const [monthsInput, setMonthsInput] = useState<string>("0");
  const [taxRateInput, setTaxRateInput] = useState<string>("0");
  const [inflationRateInput, setInflationRateInput] = useState<string>("3.0");
  const [targetWealthInput, setTargetWealthInput] = useState<string>("100000");

  const [scheduleMode, setScheduleMode] = useState<"annual" | "monthly">("annual");
  const [savedScenarios, setSavedScenarios] = useState<{ id: string; name: string; result: string; date: string }[]>([]);
  const [justSaved, setJustSaved] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem("saved_interest_scenarios");
      if (s) setSavedScenarios(JSON.parse(s));
    } catch (e) {}
  }, []);

  // Parse numeric values safely
  const parsedInitial = useMemo(() => Math.max(0, parseFloat(initialInvestmentInput) || 0), [initialInvestmentInput]);
  const parsedAnnualContrib = useMemo(() => Math.max(0, parseFloat(annualContributionInput) || 0), [annualContributionInput]);
  const parsedMonthlyContrib = useMemo(() => Math.max(0, parseFloat(monthlyContributionInput) || 0), [monthlyContributionInput]);
  const parsedRate = useMemo(() => Math.max(0, parseFloat(rateInput) || 0), [rateInput]);
  const parsedYears = useMemo(() => Math.max(0, parseFloat(yearsInput) || 0), [yearsInput]);
  const parsedMonths = useMemo(() => Math.max(0, parseFloat(monthsInput) || 0), [monthsInput]);
  const parsedTax = useMemo(() => Math.max(0, parseFloat(taxRateInput) || 0), [taxRateInput]);
  const parsedInflation = useMemo(() => Math.max(0, parseFloat(inflationRateInput) || 0), [inflationRateInput]);
  const parsedTargetGoal = useMemo(() => Math.max(0, parseFloat(targetWealthInput) || 0), [targetWealthInput]);

  // Execute Interest Engine Math
  const results = useMemo(
    () =>
      calculateInterestFormula({
        initialInvestment: parsedInitial,
        annualContribution: parsedAnnualContrib,
        monthlyContribution: parsedMonthlyContrib,
        contributionTiming,
        annualRatePercent: parsedRate,
        compoundingFrequency,
        investmentYears: parsedYears,
        investmentMonths: parsedMonths,
        taxRatePercent: parsedTax,
        inflationRatePercent: parsedInflation,
        currencySymbol,
        targetWealthGoal: parsedTargetGoal,
      }),
    [
      parsedInitial,
      parsedAnnualContrib,
      parsedMonthlyContrib,
      contributionTiming,
      parsedRate,
      compoundingFrequency,
      parsedYears,
      parsedMonths,
      parsedTax,
      parsedInflation,
      currencySymbol,
      parsedTargetGoal,
    ]
  );

  // Recharts Chart Data
  const doughnutData = useMemo(
    () => [
      { name: "Initial Investment", value: results.initialInvestment, color: "#3b82f6" },
      { name: "Contributions", value: results.totalContributions, color: "#8b5cf6" },
      { name: "Interest Earned", value: results.totalInterestEarned, color: "#10b981" },
    ],
    [results.initialInvestment, results.totalContributions, results.totalInterestEarned]
  );

  // Report data for Executive PDF Modal
  const reportData: CalculatorReportData = useMemo(
    () => ({
      meta: {
        calculatorName: "Interest Calculator",
        reportTitle: "Investment & Compound Interest Executive Analysis Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        currencySymbol,
      },
      keyMetrics: [
        { label: "Ending Balance", value: `${currencySymbol}${results.endingBalance.toLocaleString()}`, colorTheme: "blue" },
        { label: "Total Interest Earned", value: `${currencySymbol}${results.totalInterestEarned.toLocaleString()}`, colorTheme: "emerald" },
        { label: "Total Principal", value: `${currencySymbol}${results.totalPrincipal.toLocaleString()}`, colorTheme: "purple" },
        { label: "Inflation-Adjusted Value", value: `${currencySymbol}${results.inflationAdjustedFutureValue.toLocaleString()}`, colorTheme: "amber" },
      ],
      sections: [
        {
          title: "Calculation Input Parameters",
          items: [
            { label: "Initial Investment", value: `${currencySymbol}${results.initialInvestment.toLocaleString()}` },
            { label: "Annual Contribution", value: `${currencySymbol}${parsedAnnualContrib.toLocaleString()}` },
            { label: "Monthly Contribution", value: `${currencySymbol}${parsedMonthlyContrib.toLocaleString()}` },
            { label: "Compounding Frequency", value: compoundingFrequency.toUpperCase() },
            { label: "Interest Rate", value: `${results.effectiveAnnualYieldPercent.toFixed(2)}% APY (${parsedRate}% nominal)` },
          ],
        },
        {
          title: "Growth & Yield Analysis",
          items: [
            { label: "CAGR", value: `${results.cagrPercent.toFixed(2)}%` },
            { label: "Real Return (After Inflation)", value: `${results.realReturnPercent.toFixed(2)}%` },
            { label: "Rule of 72 Doubling Time", value: `${results.ruleOf72YearsApprox} Years` },
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
        `Compounding frequency is configured to ${compoundingFrequency.toUpperCase()}.`,
        `Inflation discount rate applied at ${parsedInflation}% per annum.`,
      ],
    }),
    [currencySymbol, results, compoundingFrequency, parsedAnnualContrib, parsedMonthlyContrib, parsedRate, parsedInflation]
  );

  // CSV Export Handler
  const handleExportCSV = () => {
    const isAnn = scheduleMode === "annual";
    const headers = isAnn
      ? ["Year", "Starting Balance", "Contributions", "Interest Earned", "Taxes Paid", "Ending Balance"]
      : ["Month", "Beginning Balance", "Contribution", "Interest", "Taxes Paid", "Ending Balance"];

    const rows = isAnn
      ? results.annualSchedule.map((r) => [r.year, r.startingBalance, r.contributions, r.interestEarned, r.taxesPaid, r.endingBalance])
      : results.monthlySchedule.map((r) => [r.month, r.beginningBalance, r.contribution, r.interest, r.taxPaid, r.endingBalance]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `interest_schedule_${scheduleMode}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveScenario = () => {
    const newItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      name: `Interest (${currencySymbol}${results.initialInvestment.toLocaleString()} @ ${parsedRate}%)`,
      result: `${currencySymbol}${results.endingBalance.toLocaleString()}`,
      date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };
    const newSaved = [newItem, ...savedScenarios].slice(0, 10);
    setSavedScenarios(newSaved);
    try {
      localStorage.setItem("saved_interest_scenarios", JSON.stringify(newSaved));
    } catch (e) {}
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2500);
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
              <TrendingUp className="h-3.5 w-3.5" /> Premium Interest Engine
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-medium border border-emerald-400/30">
              <Zap className="h-3 w-3" /> 7 Compounding Frequencies
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Interest Calculator
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/80 mt-1 max-w-3xl leading-relaxed">
              Calculate compound interest growth with initial deposits, annual or monthly contributions, timing selection, 7 compounding frequencies, tax & inflation adjustments, Rule of 72 analytics, target wealth planning, and exportable schedules.
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Daily to Continuous Compounding
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Beginning / End Contribution Timing
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Inflation & Tax Adjustments
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Rule of 72 Analytics
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
                className={`px-2 py-0.5 rounded font-sans tabular-nums font-bold text-xs transition-colors ${currencySymbol === cur
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
            className={`h-8 text-xs font-semibold gap-1.5 cursor-pointer ${
              justSaved ? "bg-emerald-500 text-white border-emerald-600 font-bold" : ""
            }`}
          >
            {justSaved ? <CheckCircle2 className="h-3.5 w-3.5 text-white" /> : <Bookmark className="h-3.5 w-3.5 text-indigo-500" />}
            <span>{justSaved ? "Saved!" : `Save${savedScenarios.length > 0 ? ` (${savedScenarios.length})` : ""}`}</span>
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

      {savedScenarios.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
              Saved Scenarios ({savedScenarios.length})
            </span>
            <button
              type="button"
              onClick={() => {
                setSavedScenarios([]);
                localStorage.removeItem("saved_interest_scenarios");
              }}
              className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Clear All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {savedScenarios.map((sc) => (
              <div key={sc.id} className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs flex justify-between items-center">
                <div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-100">{sc.name}</div>
                  <div className="font-mono text-emerald-600 font-bold">{sc.result}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-zinc-400 font-mono">{sc.date}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = savedScenarios.filter((item) => item.id !== sc.id);
                      setSavedScenarios(updated);
                      localStorage.setItem("saved_interest_scenarios", JSON.stringify(updated));
                    }}
                    className="text-zinc-400 hover:text-red-600 p-0.5 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          MAIN CALCULATOR GRID (COL-7 INPUTS | COL-5 DASHBOARD)
         ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: CALCULATOR INPUTS (COL 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2.5">Investment & Interest Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Initial Investment Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">
                  {currencySymbol}
                </span>
                <Input
                  type="number"
                  value={initialInvestmentInput}
                  onChange={(e) => setInitialInvestmentInput(e.target.value)}
                  className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Annual Interest Rate (%)
              </label>
              <Input
                type="number"
                step="0.1"
                value={rateInput}
                onChange={(e) => setRateInput(e.target.value)}
                className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Annual Contribution ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">
                  {currencySymbol}
                </span>
                <Input
                  type="number"
                  value={annualContributionInput}
                  onChange={(e) => setAnnualContributionInput(e.target.value)}
                  className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Monthly Contribution ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">
                  {currencySymbol}
                </span>
                <Input
                  type="number"
                  value={monthlyContributionInput}
                  onChange={(e) => setMonthlyContributionInput(e.target.value)}
                  className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Contribution Timing
              </label>
              <div className="flex gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => setContributionTiming("beginning")}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${contributionTiming === "beginning"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                >
                  Beginning of Period
                </button>
                <button
                  type="button"
                  onClick={() => setContributionTiming("end")}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${contributionTiming === "end"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                >
                  End of Period
                </button>
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
                <option value="continuous">Continuous (Infinite)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Investment Duration (Years & Months)
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Years"
                  value={yearsInput}
                  onChange={(e) => setYearsInput(e.target.value)}
                  className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 flex-1"
                />
                <Input
                  type="number"
                  placeholder="Months"
                  value={monthsInput}
                  onChange={(e) => setMonthsInput(e.target.value)}
                  className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 flex-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Tax Rate (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={taxRateInput}
                  onChange={(e) => setTaxRateInput(e.target.value)}
                  className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Inflation Rate (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={inflationRateInput}
                  onChange={(e) => setInflationRateInput(e.target.value)}
                  className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS DASHBOARD CARD (COL 5) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-4">
          <div className="bg-gradient-to-br from-zinc-900 via-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-xl border border-zinc-800 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-400">
                Interest Output Dashboard
              </span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 text-[10px]">
                {results.effectiveAnnualYieldPercent.toFixed(2)}% APY
              </Badge>
            </div>

            {/* Main Result Display */}
            <div>
              <span className="text-xs text-zinc-400 block font-medium">Ending Balance</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight font-sans tabular-nums mt-1">
                {currencySymbol}{results.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-blue-200/80 mt-1 font-sans">
                Total Interest Earned: <strong className="text-white">{currencySymbol}{results.totalInterestEarned.toLocaleString()}</strong>
              </p>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Total Principal</span>
                <span className="text-base font-bold text-white font-sans tabular-nums">
                  {currencySymbol}{results.totalPrincipal.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Total Contributions</span>
                <span className="text-base font-bold text-purple-300 font-sans tabular-nums">
                  {currencySymbol}{results.totalContributions.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Interest from Initial</span>
                <span className="text-base font-bold text-emerald-300 font-sans tabular-nums">
                  {currencySymbol}{results.interestFromInitial.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Interest from Contrib.</span>
                <span className="text-base font-bold text-emerald-300 font-sans tabular-nums">
                  {currencySymbol}{results.interestFromContributions.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-900/40 border border-amber-500/30 text-xs text-amber-100 flex items-center justify-between font-sans tabular-nums">
              <span>Inflation-Adjusted Value:</span>
              <span className="font-bold text-amber-300">
                {currencySymbol}{results.inflationAdjustedFutureValue.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 2: ADVANCED FINANCIAL TOOLS (RULE OF 72 & TARGET PLANNER)
         ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* RULE OF 72 MODULE */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">Rule of 72 Doubling Time Analytics
          </h3>
          <div className="p-3.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-zinc-600 dark:text-zinc-400">Rule of 72 Estimate:</span>
              <span className="font-bold font-sans tabular-nums text-amber-700 dark:text-amber-400 text-sm">
                {results.ruleOf72YearsApprox} Years
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-amber-200/60 dark:border-amber-900/40 pt-1.5">
              <span className="text-zinc-600 dark:text-zinc-400">Exact Logarithmic Doubling:</span>
              <span className="font-bold font-sans tabular-nums text-zinc-900 dark:text-zinc-100 text-sm">
                {results.ruleOf72YearsExact} Years
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 pt-1 font-sans">
              At a {parsedRate}% annual interest rate, your money doubles in approximately {results.ruleOf72YearsApprox} years.
            </p>
          </div>
        </div>

        {/* TARGET WEALTH GOAL PLANNER */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">Future Wealth Target Goal Planner
          </h3>
          <div className="space-y-2 text-xs">
            <div>
              <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">
                Target Wealth Goal ($)
              </label>
              <Input
                type="number"
                value={targetWealthInput}
                onChange={(e) => setTargetWealthInput(e.target.value)}
                className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
              />
            </div>
            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1 font-sans tabular-nums">
              <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                <span>Req. Monthly Contribution:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {currencySymbol}{results.requiredMonthlyContributionForTarget.toLocaleString()}/mo
                </span>
              </div>
              <div className="flex justify-between text-zinc-700 dark:text-zinc-300 border-t border-zinc-200 dark:border-zinc-800 pt-1">
                <span>Req. Annual Contribution:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {currencySymbol}{results.requiredAnnualContributionForTarget.toLocaleString()}/yr
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 3: COMPOUNDING FREQUENCY COMPARISON MODULE
         ========================================== */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <h2 className="text-base font-black text-blue-600 dark:text-blue-400 flex items-center gap-2">Compounding Frequency Side-by-Side Comparison
          </h2>
          <Badge variant="outline" className="text-[10px] text-indigo-600 border-indigo-200">
            7 Frequencies Analyzed
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-950 font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="p-3">Compounding Frequency</th>
                <th className="p-3">Ending Balance ({currencySymbol})</th>
                <th className="p-3">Total Interest ({currencySymbol})</th>
                <th className="p-3">Difference vs Annual ({currencySymbol})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums">
              {results.frequencyComparison.map((item) => (
                <tr key={item.frequencyKey} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="p-3 font-bold font-sans">{item.frequencyLabel}</td>
                  <td className="p-3 font-bold text-zinc-900 dark:text-zinc-100">
                    {currencySymbol}{item.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                    {currencySymbol}{item.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">
                    {item.differenceVsAnnual >= 0 ? "+" : ""}
                    {currencySymbol}{item.differenceVsAnnual.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          SECTION 4: RECHARTS VISUALIZATIONS GRID
         ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* PORTFOLIO GROWTH CHART (COL 7) */}
        <div className="md:col-span-7 bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400">
            Portfolio Accumulation & Real Buying Power over Time
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
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400">
            Portfolio Composition Breakdown
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
        </div>
      </div>

      {/* ==========================================
          SECTION 5: SCHEDULE TABLES & EXPORTS
         ========================================== */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-black text-blue-600 dark:text-blue-400 flex items-center gap-2">Accumulation Schedule Table
            </h2>

            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setScheduleMode("annual")}
                className={`px-2 py-0.5 rounded font-semibold text-xs transition-colors ${scheduleMode === "annual"
                  ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400"
                  }`}
              >
                Annual
              </button>
              <button
                type="button"
                onClick={() => setScheduleMode("monthly")}
                className={`px-2 py-0.5 rounded font-semibold text-xs transition-colors ${scheduleMode === "monthly"
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
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums">
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
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums">
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
      <InterestContent />

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
