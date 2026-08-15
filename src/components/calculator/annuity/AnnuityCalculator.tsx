"use client";

import React, { useState, useMemo } from "react";
import {
  Shield,
  DollarSign,
  Calendar,
  Sparkles,
  Printer,
  Share2,
  AlertTriangle,
  Info,
  CheckCircle2,
  BarChart3,
  FileSpreadsheet,
  Download,
  Plus,
  Trash2,
  Percent,
  Landmark,
  Heart,
  Clock,
  Briefcase,
  TrendingUp,
  PieChart as PieIcon,
  Sliders,
  Target,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import { AnnuityContent } from "./AnnuityContent";
import {
  calculateAnnuity,
  calculateTargetPlanner,
  calculateScenarioComparison,
} from "@/lib/calculator-engine/formulas/annuity";

export function AnnuityCalculator() {
  // Navigation Tabs: 'accumulator' | 'targetPlanner' | 'scenarioCompare' | 'charts' | 'schedule'
  const [activeTab, setActiveTab] = useState<
    "accumulator" | "targetPlanner" | "scenarioCompare" | "charts" | "schedule"
  >("accumulator");

  // Tab 1 State: Standard Accumulator
  const [principalInput, setPrincipalInput] = useState<string>("20000");
  const [annualContributionInput, setAnnualContributionInput] = useState<string>("10000");
  const [monthlyContributionInput, setMonthlyContributionInput] = useState<string>("0");
  const [timingInput, setTimingInput] = useState<"beginning" | "end">("beginning");
  const [growthRateInput, setGrowthRateInput] = useState<string>("6.0");
  const [yearsInput, setYearsInput] = useState<string>("10");
  const [monthsInput, setMonthsInput] = useState<string>("0");

  // Advanced Settings State
  const [compoundingFreqInput, setCompoundingFreqInput] = useState<string>("annual");
  const [inflationInput, setInflationInput] = useState<string>("2.5");
  const [taxRateInput, setTaxRateInput] = useState<string>("20.0");
  const [feeInput, setFeeInput] = useState<string>("0.0");

  // Tab 2 State: Target Balance Planner
  const [targetBalanceInput, setTargetBalanceInput] = useState<string>("500000");

  // Tab 3 State: 4-Plan Scenario Comparison
  const [planARate, setPlanARate] = useState<string>("6.0");
  const [planBRate, setPlanBRate] = useState<string>("8.0");
  const [planCRate, setPlanCRate] = useState<string>("10.0");
  const [planDRate, setPlanDRate] = useState<string>("12.0");

  // Schedule Filter & Search
  const [scheduleMode, setScheduleMode] = useState<"annual" | "monthly">("annual");
  const [tableSearch, setTableSearch] = useState("");

  // Modal & Notification State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Compute Primary Accumulation Results
  const results = useMemo(() => {
    return calculateAnnuity({
      startingPrincipal: Number(principalInput) || 0,
      annualContribution: Number(annualContributionInput) || 0,
      monthlyContribution: Number(monthlyContributionInput) || 0,
      timing: timingInput,
      growthRatePercent: Number(growthRateInput) || 6.0,
      years: Number(yearsInput) || 10,
      months: Number(monthsInput) || 0,
      compoundingFrequency: compoundingFreqInput as any,
      inflationRatePercent: Number(inflationInput) || 2.5,
      taxRatePercent: Number(taxRateInput) || 20.0,
      managementFeePercent: Number(feeInput) || 0.0,
    });
  }, [
    principalInput,
    annualContributionInput,
    monthlyContributionInput,
    timingInput,
    growthRateInput,
    yearsInput,
    monthsInput,
    compoundingFreqInput,
    inflationInput,
    taxRateInput,
    feeInput,
  ]);

  // Compute Target Planner Results
  const targetResults = useMemo(() => {
    return calculateTargetPlanner({
      targetBalance: Number(targetBalanceInput) || 500000,
      startingPrincipal: Number(principalInput) || 20000,
      growthRatePercent: Number(growthRateInput) || 6.0,
      years: Number(yearsInput) || 10,
      timing: timingInput,
    });
  }, [targetBalanceInput, principalInput, growthRateInput, yearsInput, timingInput]);

  // Compute Scenario Comparison Results
  const scenarioResults = useMemo(() => {
    return calculateScenarioComparison(
      {
        startingPrincipal: Number(principalInput) || 20000,
        annualContribution: Number(annualContributionInput) || 10000,
        monthlyContribution: Number(monthlyContributionInput) || 0,
        timing: timingInput,
        growthRatePercent: 6.0,
        years: Number(yearsInput) || 10,
      },
      [
        { name: "Plan A (Conservative)", growthRatePercent: Number(planARate) || 6.0 },
        { name: "Plan B (Moderate)", growthRatePercent: Number(planBRate) || 8.0 },
        { name: "Plan C (Growth)", growthRatePercent: Number(planCRate) || 10.0 },
        { name: "Plan D (Aggressive)", growthRatePercent: Number(planDRate) || 12.0 },
      ]
    );
  }, [principalInput, annualContributionInput, monthlyContributionInput, timingInput, yearsInput, planARate, planBRate, planCRate, planDRate]);

  const fmt = (val: number) =>
    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Quick Presets
  const applyPreset = (p: number, ann: number, r: number, y: number) => {
    setPrincipalInput(p.toString());
    setAnnualContributionInput(ann.toString());
    setGrowthRateInput(r.toString());
    setYearsInput(y.toString());
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Annuity Accumulation Summary:
------------------------------------------------
Starting Principal: ${fmt(results.startingPrincipal)}
Total Contributions: ${fmt(results.totalContributions)}
Total Interest Earned: ${fmt(results.totalInterestEarned)}
------------------------------------------------
Ending Balance: ${fmt(results.endBalance)}
Inflation-Adjusted Real Value (${inflationInput}%): ${fmt(results.inflationAdjustedRealValue)}
Tax-Adjusted Value (${taxRateInput}%): ${fmt(results.taxAdjustedValue)}
CAGR: ${results.cagr}% | Effective Yield: ${results.effectiveAnnualYield}%`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Export CSV Schedule
  const exportCSV = () => {
    const isAnnual = scheduleMode === "annual";
    const dataset = isAnnual ? results.annualSchedule : results.monthlySchedule;

    const headers = [
      isAnnual ? "Year" : "Month",
      "Beginning Balance ($)",
      "Contributions ($)",
      "Interest Earned ($)",
      "Ending Balance ($)",
    ];

    const rows = dataset.map((r) => [
      r.period,
      r.beginningBalance,
      r.contribution,
      r.interestEarned,
      r.endingBalance,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `annuity_${scheduleMode}_schedule_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Recharts Doughnut Data
  const doughnutData = [
    { name: "Starting Principal", value: results.startingPrincipal, color: "#3b82f6" },
    { name: "Total Additions", value: Math.max(0, results.totalContributions - results.startingPrincipal), color: "#10b981" },
    { name: "Interest Earned", value: results.totalInterestEarned, color: "#eab308" },
  ];

  // Report Modal Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Annuity Accumulation & Growth Engine",
      reportTitle: "Annuity Growth Analysis Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: "Final Ending Balance",
        value: fmt(results.endBalance),
        subtitle: `Over ${yearsInput} Years @ ${growthRateInput}% Growth`,
        colorTheme: "emerald",
      },
      {
        label: "Total Interest Earned",
        value: fmt(results.totalInterestEarned),
        subtitle: `${results.interestPercentage}% of total portfolio value`,
        colorTheme: "amber",
      },
      {
        label: "Real Value (Inflation-Adjusted)",
        value: fmt(results.inflationAdjustedRealValue),
        subtitle: `Purchasing power after ${inflationInput}% inflation`,
        colorTheme: "blue",
      },
    ],
    sections: [
      {
        title: "Annuity Accumulation Summary",
        items: [
          { label: "Starting Principal", value: fmt(results.startingPrincipal) },
          { label: "Annual Contribution", value: fmt(Number(annualContributionInput) || 0) },
          { label: "Monthly Contribution", value: fmt(Number(monthlyContributionInput) || 0) },
          { label: "Contribution Timing", value: timingInput === "beginning" ? "Annuity Due (Beginning)" : "Ordinary Annuity (End)" },
          { label: "Growth Rate", value: `${growthRateInput}%` },
          { label: "Total Contributions", value: fmt(results.totalContributions) },
          { label: "Total Interest Earned", value: fmt(results.totalInterestEarned), highlight: true },
          { label: "Ending Balance", value: fmt(results.endBalance), highlight: true },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top Presets Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 gap-1 text-xs"
          >
            <Shield className="h-3.5 w-3.5" /> Compound Annuity Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(20000, 10000, 6.0, 10)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            Calculator.net Baseline ($20k + $10k/yr @ 6%)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(50000, 5000, 7.5, 15)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            $50k + $5k/yr @ 7.5% (15 Yrs)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(100000, 12000, 8.0, 20)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            $100k + $12k/yr @ 8.0% (20 Yrs)
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>End Balance:</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-sans tabular-nums text-sm">
            {fmt(results.endBalance)}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("accumulator")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "accumulator"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Landmark className="h-4 w-4" /> 1. Annuity Accumulator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("targetPlanner")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "targetPlanner"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Target className="h-4 w-4 text-emerald-500" /> 2. Target Balance Planner
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("scenarioCompare")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "scenarioCompare"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Layers className="h-4 w-4 text-purple-500" /> 3. 4-Plan Scenario Comparison
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("charts")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "charts"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <BarChart3 className="h-4 w-4 text-blue-500" /> 4. Visual Dashboards
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("schedule")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "schedule"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <FileSpreadsheet className="h-4 w-4 text-amber-500" /> 5. Schedules &amp; Export
        </button>
      </div>

      {/* TAB 1: ANNUITY ACCUMULATOR */}
      {activeTab === "accumulator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Annuity Accumulation Parameters
              </h3>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Starting Principal ($)</label>
                <Input
                  type="number"
                  min="0"
                  step="5000"
                  value={principalInput}
                  onChange={(e) => setPrincipalInput(e.target.value)}
                  className="text-xs font-sans tabular-nums h-9 px-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Annual Contribution ($)</label>
                  <Input
                    type="number"
                    min="0"
                    step="1000"
                    value={annualContributionInput}
                    onChange={(e) => setAnnualContributionInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Monthly Contribution ($)</label>
                  <Input
                    type="number"
                    min="0"
                    step="100"
                    value={monthlyContributionInput}
                    onChange={(e) => setMonthlyContributionInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
              </div>

              {/* Contribution Timing Toggle */}
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-200/70 dark:border-zinc-700 space-y-2 text-xs">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">Add at each period's:</span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="timing"
                      checked={timingInput === "beginning"}
                      onChange={() => setTimingInput("beginning")}
                      className="text-indigo-600"
                    />
                    <span>Beginning (Annuity Due)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="timing"
                      checked={timingInput === "end"}
                      onChange={() => setTimingInput("end")}
                      className="text-indigo-600"
                    />
                    <span>End (Ordinary Annuity)</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Annual Growth Rate (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="25"
                    step="0.25"
                    value={growthRateInput}
                    onChange={(e) => setGrowthRateInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Duration (Years)</label>
                  <Input
                    type="number"
                    min="1"
                    max="50"
                    value={yearsInput}
                    onChange={(e) => setYearsInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
              </div>

              {/* Advanced Controls */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">
                  Advanced Adjustments
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Inflation Rate (%)</label>
                    <Input
                      type="number"
                      min="0"
                      max="15"
                      step="0.25"
                      value={inflationInput}
                      onChange={(e) => setInflationInput(e.target.value)}
                      className="text-xs font-sans tabular-nums h-8 px-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Expected Tax Rate (%)</label>
                    <Input
                      type="number"
                      min="0"
                      max="50"
                      step="1"
                      value={taxRateInput}
                      onChange={(e) => setTaxRateInput(e.target.value)}
                      className="text-xs font-sans tabular-nums h-8 px-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Color-Coded KPI Results Cards (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  FINAL ANNUITY ENDING BALANCE
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
                    className="h-7 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold cursor-pointer"
                  >
                    <Printer className="h-3 w-3 mr-1" /> PDF Report
                  </Button>
                </div>
              </div>

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-sans tabular-nums text-white mb-2">
                {fmt(results.endBalance)}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 font-medium mb-3">
                <span>
                  Real Inflation-Adjusted Value: <span className="font-bold text-emerald-300">{fmt(results.inflationAdjustedRealValue)}</span>
                </span>
              </div>

              {/* Color-coded Breakdown Cards matching Section 3 requirement */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-xs font-sans tabular-nums">
                <div className="bg-blue-600/30 p-3 rounded-xl border border-blue-400/30">
                  <div className="text-blue-200 text-[10px] uppercase font-sans font-bold">Principal</div>
                  <div className="font-bold text-white text-sm">{fmt(results.startingPrincipal)}</div>
                  <div className="text-[10px] text-blue-300 font-sans">{results.principalPercentage}%</div>
                </div>

                <div className="bg-emerald-600/30 p-3 rounded-xl border border-emerald-400/30">
                  <div className="text-emerald-200 text-[10px] uppercase font-sans font-bold">Additions</div>
                  <div className="font-bold text-emerald-300 text-sm">{fmt(results.totalContributions - results.startingPrincipal)}</div>
                  <div className="text-[10px] text-emerald-200 font-sans">{results.contributionPercentage}%</div>
                </div>

                <div className="bg-amber-600/30 p-3 rounded-xl border border-amber-400/30">
                  <div className="text-amber-200 text-[10px] uppercase font-sans font-bold">Returns/Interest</div>
                  <div className="font-bold text-amber-300 text-sm">{fmt(results.totalInterestEarned)}</div>
                  <div className="text-[10px] text-amber-200 font-sans">{results.interestPercentage}%</div>
                </div>
              </div>
            </div>

            {/* Portfolio Composition Doughnut Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Portfolio Composition Breakdown
              </h4>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={doughnutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {doughnutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TARGET BALANCE PLANNER */}
      {activeTab === "targetPlanner" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Target Balance Planner (Reverse Financial Solver)
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Enter your future wealth goal to reverse-calculate the required monthly or annual contributions needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Target Future Wealth Goal ($)</label>
                <Input
                  type="number"
                  min="0"
                  step="25000"
                  value={targetBalanceInput}
                  onChange={(e) => setTargetBalanceInput(e.target.value)}
                  className="text-xs font-sans tabular-nums h-9 px-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Starting Principal ($)</label>
                  <Input type="number" value={principalInput} onChange={(e) => setPrincipalInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Growth Rate (%)</label>
                  <Input type="number" value={growthRateInput} onChange={(e) => setGrowthRateInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-5 rounded-xl space-y-3 font-sans tabular-nums">
              <span className="font-sans font-bold text-emerald-900 dark:text-emerald-200 text-sm block border-b pb-1">
                Required Contribution Results
              </span>
              <div className="flex justify-between">
                <span>Required Monthly Contribution:</span>
                <span className="font-extrabold text-emerald-600 text-base">{fmt(targetResults.requiredMonthlyContribution)}/mo</span>
              </div>
              <div className="flex justify-between">
                <span>Required Annual Contribution:</span>
                <span className="font-bold text-indigo-600">{fmt(targetResults.requiredAnnualContribution)}/yr</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-zinc-600">
                <span>Target Goal:</span>
                <span className="font-bold">{fmt(targetResults.targetBalance)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 4-PLAN SCENARIO COMPARISON */}
      {activeTab === "scenarioCompare" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">4-Plan Scenario Comparison
            </h3>
          </div>

          <div className="grid grid-cols-4 gap-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Plan A Rate (%)</label>
              <Input type="number" step="0.5" value={planARate} onChange={(e) => setPlanARate(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Plan B Rate (%)</label>
              <Input type="number" step="0.5" value={planBRate} onChange={(e) => setPlanBRate(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Plan C Rate (%)</label>
              <Input type="number" step="0.5" value={planCRate} onChange={(e) => setPlanCRate(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Plan D Rate (%)</label>
              <Input type="number" step="0.5" value={planDRate} onChange={(e) => setPlanDRate(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-3">Scenario Name</th>
                  <th className="p-3 text-right">Growth Rate</th>
                  <th className="p-3 text-right">Total Contributions</th>
                  <th className="p-3 text-right text-amber-600">Total Interest</th>
                  <th className="p-3 text-right text-emerald-600">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px] font-sans tabular-nums">
                {scenarioResults.map((p, i) => (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-3 font-bold font-sans text-zinc-900 dark:text-zinc-100">{p.name}</td>
                    <td className="p-3 text-right">{p.growthRatePercent}%</td>
                    <td className="p-3 text-right">{fmt(p.totalContributions)}</td>
                    <td className="p-3 text-right text-amber-600">{fmt(p.totalInterestEarned)}</td>
                    <td className="p-3 text-right font-bold text-emerald-600">{fmt(p.endBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: VISUAL DASHBOARDS */}
      {activeTab === "charts" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Portfolio Growth Trajectory Over Time
          </h3>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.annualSchedule}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="period" tick={{ fontSize: 11 }} label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v / 1000}k`} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                <Legend />
                <Area type="monotone" dataKey="endingBalance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="Total Portfolio Balance ($)" />
                <Area type="monotone" dataKey="interestEarned" stroke="#eab308" fill="#eab308" fillOpacity={0.2} name="Annual Interest ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* TAB 5: SCHEDULES & EXPORT */}
      {activeTab === "schedule" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Accumulation Schedule
              </h3>
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setScheduleMode("annual")}
                  className={`px-2.5 py-1 rounded-md font-semibold ${
                    scheduleMode === "annual" ? "bg-white dark:bg-zinc-900 shadow-sm text-indigo-600" : "text-zinc-500"
                  }`}
                >
                  Annual
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleMode("monthly")}
                  className={`px-2.5 py-1 rounded-md font-semibold ${
                    scheduleMode === "monthly" ? "bg-white dark:bg-zinc-900 shadow-sm text-indigo-600" : "text-zinc-500"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            <Button type="button" size="sm" variant="outline" onClick={exportCSV} className="h-8 text-xs cursor-pointer">
              <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-2.5">{scheduleMode === "annual" ? "Year" : "Month"}</th>
                  <th className="p-2.5 text-right">Beginning Balance</th>
                  <th className="p-2.5 text-right text-emerald-600">Contributions</th>
                  <th className="p-2.5 text-right text-amber-600">Return/Interest</th>
                  <th className="p-2.5 text-right text-indigo-600">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px] font-sans tabular-nums">
                {(scheduleMode === "annual" ? results.annualSchedule : results.monthlySchedule).slice(0, 48).map((row) => (
                  <tr key={row.period} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2.5 font-bold font-sans text-zinc-800 dark:text-zinc-200">{row.label}</td>
                    <td className="p-2.5 text-right">{fmt(row.beginningBalance)}</td>
                    <td className="p-2.5 text-right text-emerald-600">{fmt(row.contribution)}</td>
                    <td className="p-2.5 text-right text-amber-600">{fmt(row.interestEarned)}</td>
                    <td className="p-2.5 text-right font-bold text-indigo-600">{fmt(row.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 25 FAQs */}
      <AnnuityContent />
    </div>
  );
}
