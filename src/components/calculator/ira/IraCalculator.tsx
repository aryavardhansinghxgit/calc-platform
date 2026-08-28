"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  TrendingUp,
  RotateCcw,
  Download,
  Printer,
  Copy,
  Share2,
  Bookmark,
  Sparkles,
  Percent,
  ShieldCheck,
  FileSpreadsheet,
  Check,
  Trash2,
  History,
  AlertTriangle,
  Info,
  Layers,
  Landmark,
  CheckCircle2,
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
import {
  calculateIra,
  IraResult,
  IRA_2025_BASE_CAP,
  IRA_2025_TOTAL_CATCHUP_CAP,
  IRA_2026_BASE_CAP,
  IRA_2026_TOTAL_CATCHUP_CAP,
  SEP_IRA_2025_MAX,
  SEP_IRA_2026_MAX,
  SIMPLE_IRA_2025_BASE,
  SIMPLE_IRA_2026_BASE,
  SIMPLE_IRA_2026_CATCHUP,
} from "@/lib/calculator-engine/formulas/ira";

export interface SavedIraScenario {
  id: string;
  name: string;
  date: string;
  currentBalance: string;
  annualContribution: string;
  investmentReturn: string;
  currentAge: string;
  retirementAge: string;
  currentTaxRate: string;
  retirementTaxRate: string;
  taxYear: number;
  taxableCompensation: string;
}

export function IraCalculator() {
  // Tabs: 'growth' | 'optimizer' | 'checker' | 'schedule'
  const [activeTab, setActiveTab] = useState<"growth" | "optimizer" | "checker" | "schedule">("growth");

  // Core Inputs
  const [currentBalanceInput, setCurrentBalanceInput] = useState<string>("30000");
  const [annualContributionInput, setAnnualContributionInput] = useState<string>("7500");
  const [investmentReturnInput, setInvestmentReturnInput] = useState<string>("6");
  const [currentAgeInput, setCurrentAgeInput] = useState<string>("30");
  const [retirementAgeInput, setRetirementAgeInput] = useState<string>("65");
  const [currentTaxRateInput, setCurrentTaxRateInput] = useState<string>("25");
  const [retirementTaxRateInput, setRetirementTaxRateInput] = useState<string>("15");
  const [taxYearInput, setTaxYearInput] = useState<2025 | 2026>(2026);
  const [taxableCompensationInput, setTaxableCompensationInput] = useState<string>("");

  // Modal, Copy, & Save State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedScenarios, setSavedScenarios] = useState<SavedIraScenario[]>([]);

  // Load Saved Scenarios from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("saved_traditional_ira_scenarios");
      if (saved) {
        setSavedScenarios(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Safe Numerical Parsing for 0-friendly inputs
  const parseNum = (val: string, fallback: number): number => {
    if (val === "" || val === undefined || val === null) return fallback;
    const num = Number(val);
    return isNaN(num) ? fallback : num;
  };

  // Compute Results dynamically
  const results: IraResult = useMemo(() => {
    return calculateIra({
      currentBalance: currentBalanceInput !== "" ? parseNum(currentBalanceInput, 30000) : 0,
      annualContribution: annualContributionInput !== "" ? parseNum(annualContributionInput, 7500) : 0,
      investmentReturn: investmentReturnInput !== "" ? parseNum(investmentReturnInput, 6) : 0,
      currentAge: currentAgeInput !== "" ? parseNum(currentAgeInput, 30) : 30,
      retirementAge: retirementAgeInput !== "" ? parseNum(retirementAgeInput, 65) : 65,
      currentTaxRate: currentTaxRateInput !== "" ? parseNum(currentTaxRateInput, 25) : 0,
      retirementTaxRate: retirementTaxRateInput !== "" ? parseNum(retirementTaxRateInput, 15) : 0,
      taxYear: taxYearInput,
      taxableCompensation: taxableCompensationInput !== "" ? parseNum(taxableCompensationInput, 0) : undefined,
    });
  }, [
    currentBalanceInput,
    annualContributionInput,
    investmentReturnInput,
    currentAgeInput,
    retirementAgeInput,
    currentTaxRateInput,
    retirementTaxRateInput,
    taxYearInput,
    taxableCompensationInput,
  ]);

  const fmt = (val: number) =>
    `$${val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  // Quick Presets
  const applyPreset = (contrib: number, year: 2025 | 2026 = 2026, minAge?: number) => {
    setAnnualContributionInput(contrib.toString());
    setTaxYearInput(year);
    if (minAge !== undefined && parseNum(currentAgeInput, 30) < minAge) {
      setCurrentAgeInput(minAge.toString());
    }
  };

  // Reset to Canonical Baseline State
  const resetToBaseline = () => {
    setCurrentBalanceInput("30000");
    setAnnualContributionInput("7500");
    setInvestmentReturnInput("6");
    setCurrentAgeInput("30");
    setRetirementAgeInput("65");
    setCurrentTaxRateInput("25");
    setRetirementTaxRateInput("15");
    setTaxYearInput(2026);
    setTaxableCompensationInput("");
  };

  // Save Scenario
  const saveScenario = () => {
    const newScenario: SavedIraScenario = {
      id: Date.now().toString(),
      name: `Trad IRA @ Age ${results.retirementAge} ($${annualContributionInput}/yr)`,
      date: new Date().toLocaleDateString(),
      currentBalance: currentBalanceInput,
      annualContribution: annualContributionInput,
      investmentReturn: investmentReturnInput,
      currentAge: currentAgeInput,
      retirementAge: retirementAgeInput,
      currentTaxRate: currentTaxRateInput,
      retirementTaxRate: retirementTaxRateInput,
      taxYear: taxYearInput,
      taxableCompensation: taxableCompensationInput,
    };

    const updated = [newScenario, ...savedScenarios.slice(0, 9)];
    setSavedScenarios(updated);
    try {
      localStorage.setItem("saved_traditional_ira_scenarios", JSON.stringify(updated));
    } catch {
      // Ignore localStorage errors
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Restore Scenario
  const restoreScenario = (sc: SavedIraScenario) => {
    setCurrentBalanceInput(sc.currentBalance);
    setAnnualContributionInput(sc.annualContribution);
    setInvestmentReturnInput(sc.investmentReturn);
    setCurrentAgeInput(sc.currentAge);
    setRetirementAgeInput(sc.retirementAge);
    setCurrentTaxRateInput(sc.currentTaxRate);
    setRetirementTaxRateInput(sc.retirementTaxRate);
    setTaxYearInput((sc.taxYear as 2025 | 2026) || 2026);
    setTaxableCompensationInput(sc.taxableCompensation || "");
  };

  // Delete Saved Scenario
  const deleteScenario = (id: string) => {
    const updated = savedScenarios.filter((s) => s.id !== id);
    setSavedScenarios(updated);
    try {
      localStorage.setItem("saved_traditional_ira_scenarios", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Traditional IRA vs Roth Comparison Summary:
------------------------------------------------
Tax Year: ${taxYearInput} | Current Age: ${results.currentAge} | Retirement Age: ${results.retirementAge}
Traditional IRA (Pre-Tax): ${fmt(results.traditionalPreTaxBalance)}
Traditional IRA (After-Tax @ ${retirementTaxRateInput}%): ${fmt(results.traditionalPostTaxBalance)}
Roth IRA (100% Tax-Free): ${fmt(results.rothBalance)}
Regular Taxable Savings: ${fmt(results.taxableBalance)}
Total Principal Contributed: ${fmt(results.totalPrincipalInvested)}
Strategy Insight: ${results.recommendation}
Disclaimer: Contribution modeled as deductible under the selected assumptions.`;

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyNotification(true);
      setTimeout(() => setCopyNotification(false), 2500);
    }
  };

  // Share URL with Query Parameters
  const shareCalculation = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams({
        bal: currentBalanceInput,
        contrib: annualContributionInput,
        ret: investmentReturnInput,
        age: currentAgeInput,
        retAge: retirementAgeInput,
        curTax: currentTaxRateInput,
        retTax: retirementTaxRateInput,
        year: taxYearInput.toString(),
      });
      const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
      if (navigator.share) {
        navigator.share({ title: "Traditional IRA Calculator", url }).catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        setCopyNotification(true);
        setTimeout(() => setCopyNotification(false), 2500);
      }
    }
  };

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Age",
      "Year",
      "Traditional Pre-Tax ($)",
      "Traditional Post-Tax ($)",
      "Roth IRA Tax-Free ($)",
      "Taxable Savings ($)",
      "Principal Contributed ($)",
    ];
    const rows = results.schedule.map((r) => [
      r.age,
      r.year,
      r.traditionalPreTaxEnd.toFixed(2),
      r.traditionalPostTaxEnd.toFixed(2),
      r.rothEnd.toFixed(2),
      r.taxableEnd.toFixed(2),
      r.principalContributed.toFixed(2),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `traditional_ira_schedule_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Bar Chart Data at Retirement Age
  const barChartData = [
    { name: "Trad (Pre-Tax)", Balance: results.traditionalPreTaxBalance, fill: "#3b82f6" },
    { name: "Trad (Post-Tax)", Balance: results.traditionalPostTaxBalance, fill: "#6366f1" },
    { name: "Roth IRA", Balance: results.rothBalance, fill: "#10b981" },
    { name: "Taxable Savings", Balance: results.taxableBalance, fill: "#f59e0b" },
  ];

  // Timeline Accumulation Chart Data
  const timelineChartData = results.schedule.map((r) => ({
    age: `Age ${r.age}`,
    "Trad Pre-Tax": r.traditionalPreTaxEnd,
    "Trad Post-Tax": r.traditionalPostTaxEnd,
    "Roth IRA": r.rothEnd,
    "Taxable Savings": r.taxableEnd,
    "Principal": r.principalContributed,
  }));

  // Report Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Traditional IRA Calculator – Pre-Tax Growth & Tax Optimizer",
      reportTitle: "Traditional vs. Roth IRA Wealth Accumulation Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: "Traditional IRA (Pre-Tax)",
        value: fmt(results.traditionalPreTaxBalance),
        subtitle: `Tax-deferred accumulation at age ${results.retirementAge}`,
        colorTheme: "blue",
      },
      {
        label: "Traditional IRA (After-Tax)",
        value: fmt(results.traditionalPostTaxBalance),
        subtitle: `Modeled at ${retirementTaxRateInput}% retirement tax rate`,
        colorTheme: "indigo",
      },
      {
        label: "Roth IRA (100% Tax-Free)",
        value: fmt(results.rothBalance),
        subtitle: `Funded at ${currentTaxRateInput}% current tax rate`,
        colorTheme: "emerald",
      },
      {
        label: "Regular Taxable Savings",
        value: fmt(results.taxableBalance),
        subtitle: "Modeled with annual tax drag",
        colorTheme: "amber",
      },
    ],
    sections: [
      {
        title: "Simulation Parameters & IRS Assumptions",
        items: [
          { label: "Tax Year Modeled", value: taxYearInput.toString() },
          { label: "Starting Balance", value: fmt(parseNum(currentBalanceInput, 0)) },
          { label: "Annual Contribution", value: fmt(parseNum(annualContributionInput, 0)) },
          { label: "Annual Rate of Return", value: `${investmentReturnInput}%` },
          { label: "Current Age", value: results.currentAge.toString() },
          { label: "Planned Retirement Age", value: results.retirementAge.toString() },
          { label: "Current Marginal Tax Rate", value: `${currentTaxRateInput}%` },
          { label: "Expected Retirement Tax Rate", value: `${retirementTaxRateInput}%` },
          { label: "Total Principal Invested", value: fmt(results.totalPrincipalInvested) },
          { label: "Traditional Advantage over Roth", value: fmt(results.traditionalVsRothDiff), highlight: true },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6" id="traditional-ira-app">
      {/* Top Quick Presets & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 gap-1 text-xs"
          >
            <Sparkles className="h-3 w-3" /> IRA Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(7500, 2026)}
            className="h-6 text-[10px] px-2 cursor-pointer font-medium hover:border-blue-400"
          >
            💼 2026 Standard ($7,500/yr)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(8600, 2026, 50)}
            className="h-6 text-[10px] px-2 cursor-pointer font-medium hover:border-blue-400"
          >
            🌟 2026 Catch-Up 50+ ($8,600/yr)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(7000, 2025)}
            className="h-6 text-[10px] px-2 cursor-pointer font-medium hover:border-zinc-400"
          >
            📁 2025 Baseline ($7,000/yr)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(25000, 2026)}
            className="h-6 text-[10px] px-2 cursor-pointer font-medium hover:border-indigo-400"
          >
            🚀 SEP IRA ($25,000/yr)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(17000, 2026)}
            className="h-6 text-[10px] px-2 cursor-pointer font-medium hover:border-purple-400"
          >
            🏢 SIMPLE IRA ($17,000/yr)
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Roth IRA at Age {results.retirementAge}:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-sans tabular-nums text-sm">
            {fmt(results.rothBalance)}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800 gap-1" role="tablist" aria-label="IRA Calculator Tabs">
        <button
          type="button"
          role="tab"
          id="tab-growth"
          aria-selected={activeTab === "growth"}
          aria-controls="panel-growth"
          onClick={() => setActiveTab("growth")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "growth"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <TrendingUp className="h-4 w-4" /> IRA Growth &amp; Comparison
        </button>
        <button
          type="button"
          role="tab"
          id="tab-optimizer"
          aria-selected={activeTab === "optimizer"}
          aria-controls="panel-optimizer"
          onClick={() => setActiveTab("optimizer")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "optimizer"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Percent className="h-4 w-4 text-emerald-500" /> Traditional vs Roth Optimizer
        </button>
        <button
          type="button"
          role="tab"
          id="tab-checker"
          aria-selected={activeTab === "checker"}
          aria-controls="panel-checker"
          onClick={() => setActiveTab("checker")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "checker"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <ShieldCheck className="h-4 w-4 text-purple-500" /> IRS Contribution Limits
        </button>
        <button
          type="button"
          role="tab"
          id="tab-schedule"
          aria-selected={activeTab === "schedule"}
          aria-controls="panel-schedule"
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

      {/* TAB 1: IRA COMPARISON & GROWTH */}
      {activeTab === "growth" && (
        <div id="panel-growth" role="tabpanel" aria-labelledby="tab-growth" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Contributions &amp; Returns
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-zinc-500">Tax Year:</span>
                  <button
                    type="button"
                    onClick={() => setTaxYearInput(2026)}
                    className={`px-2 py-0.5 text-xs rounded font-bold cursor-pointer ${
                      taxYearInput === 2026
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    2026 ($7.5k)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTaxYearInput(2025)}
                    className={`px-2 py-0.5 text-xs rounded font-bold cursor-pointer ${
                      taxYearInput === 2025
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    2025 ($7.0k)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label htmlFor="ira-current-balance" className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Current Balance ($)
                  </label>
                  <Input
                    id="ira-current-balance"
                    type="number"
                    min="0"
                    value={currentBalanceInput}
                    onChange={(e) => setCurrentBalanceInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="ira-annual-contrib" className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Annual Before-Tax Contrib ($)
                  </label>
                  <Input
                    id="ira-annual-contrib"
                    type="number"
                    min="0"
                    value={annualContributionInput}
                    onChange={(e) => setAnnualContributionInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="space-y-1">
                  <label htmlFor="ira-current-age" className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Current Age
                  </label>
                  <Input
                    id="ira-current-age"
                    type="number"
                    min="0"
                    max="100"
                    value={currentAgeInput}
                    onChange={(e) => setCurrentAgeInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="ira-retire-age" className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Retirement Age
                  </label>
                  <Input
                    id="ira-retire-age"
                    type="number"
                    min="1"
                    max="100"
                    value={retirementAgeInput}
                    onChange={(e) => setRetirementAgeInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="ira-return" className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Return (%/yr)
                  </label>
                  <Input
                    id="ira-return"
                    type="number"
                    min="0"
                    step="0.1"
                    value={investmentReturnInput}
                    onChange={(e) => setInvestmentReturnInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Tax Rates */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Tax Brackets Today &amp; In Retirement
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label htmlFor="ira-cur-tax" className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Current Marginal Tax Rate (%)
                  </label>
                  <Input
                    id="ira-cur-tax"
                    type="number"
                    min="0"
                    max="100"
                    value={currentTaxRateInput}
                    onChange={(e) => setCurrentTaxRateInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="ira-ret-tax" className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Expected Retirement Tax Rate (%)
                  </label>
                  <Input
                    id="ira-ret-tax"
                    type="number"
                    min="0"
                    max="100"
                    value={retirementTaxRateInput}
                    onChange={(e) => setRetirementTaxRateInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              <div className="text-[11px] text-zinc-500 bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-700/60 flex items-start gap-2">
                <Info className="h-3.5 w-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Tax deductibility note:</strong> Contribution modeled as deductible under the selected assumptions. Traditional IRA deductibility depends on modified AGI, workplace retirement plan coverage, and filing status under IRS Pub 590.
                </span>
              </div>
            </div>

            {/* Action Bar: Reset, Save, Copy, Share */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={resetToBaseline}
                  className="h-8 text-xs gap-1.5 cursor-pointer text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={saveScenario}
                  className="h-8 text-xs gap-1.5 cursor-pointer text-zinc-700 dark:text-zinc-300"
                >
                  {isSaved ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Bookmark className="h-3.5 w-3.5 text-blue-500" />}
                  {isSaved ? "Saved!" : "Save Scenario"}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copySummary}
                  className="h-8 text-xs gap-1.5 cursor-pointer text-zinc-700 dark:text-zinc-300"
                >
                  {copyNotification ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copyNotification ? "Copied!" : "Copy"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={shareCalculation}
                  className="h-8 text-xs gap-1.5 cursor-pointer text-zinc-700 dark:text-zinc-300"
                >
                  <Share2 className="h-3.5 w-3.5 text-indigo-500" /> Share
                </Button>
              </div>
            </div>

            {/* Saved Scenarios Accordion / List */}
            {savedScenarios.length > 0 && (
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <History className="w-3 h-3 text-blue-500" /> Saved Scenarios ({savedScenarios.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSavedScenarios([]);
                      localStorage.removeItem("saved_traditional_ira_scenarios");
                    }}
                    className="text-[10px] text-zinc-400 hover:text-red-500 font-medium cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {savedScenarios.map((sc) => (
                    <div
                      key={sc.id}
                      className="p-2 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs"
                    >
                      <button
                        type="button"
                        onClick={() => restoreScenario(sc)}
                        className="text-left font-bold text-blue-600 dark:text-blue-400 hover:underline truncate cursor-pointer"
                      >
                        {sc.name} <span className="text-[10px] text-zinc-400 font-normal">({sc.date})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteScenario(sc.id)}
                        className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
                        title="Delete Scenario"
                        aria-label="Delete Scenario"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Results Dashboard (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Result Card */}
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  IRA BALANCES AT RETIREMENT (AGE {results.retirementAge})
                </span>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setIsReportOpen(true)}
                  className="h-7 text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold cursor-pointer"
                >
                  <Printer className="h-3 w-3 mr-1" /> PDF Report
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 my-3 font-sans tabular-nums">
                <div>
                  <div className="text-[11px] text-zinc-400">Roth IRA (100% Tax-Free)</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{fmt(results.rothBalance)}</div>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-400">Traditional (After-Tax)</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-300">
                    {fmt(results.traditionalPostTaxBalance)}
                  </div>
                </div>
              </div>

              {/* Recommendation Callout */}
              <div className="bg-white/10 p-3 rounded-xl text-xs backdrop-blur-sm border border-white/10">
                💡 <strong>Tax Strategy Insight:</strong> {results.recommendation}
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">Pre-Tax Trad IRA</div>
                  <div className="font-bold font-sans tabular-nums text-white text-sm">
                    {fmt(results.traditionalPreTaxBalance)}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Taxable Savings</div>
                  <div className="font-bold font-sans tabular-nums text-amber-300 text-sm">
                    {fmt(results.taxableBalance)}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Principal Out-of-Pocket</div>
                  <div className="font-bold font-sans tabular-nums text-zinc-300 text-sm">
                    {fmt(results.totalPrincipalInvested)}
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Bar Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex justify-between">
                <span>Side-by-Side Account Values at Age {results.retirementAge}</span>
                <span className="text-[10px] text-zinc-400 font-normal">Recharts Comparison</span>
              </h4>

              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, "Balance"]} />
                    <Bar dataKey="Balance" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Accumulation Growth Timeline Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex justify-between">
                <span>Multi-Account Growth Timeline (Age {results.currentAge} &rarr; {results.retirementAge})</span>
                <span className="text-[10px] text-zinc-400 font-normal">Compound Growth</span>
              </h4>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineChartData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorTradPre" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorRoth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="age" tick={{ fontSize: 9 }} interval={Math.max(0, Math.floor(timelineChartData.length / 6))} />
                    <YAxis tick={{ fontSize: 9 }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                    <Legend wrapperStyle={{ fontSize: "11px" }} />
                    <Area type="monotone" dataKey="Trad Pre-Tax" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTradPre)" />
                    <Area type="monotone" dataKey="Roth IRA" stroke="#10b981" fillOpacity={1} fill="url(#colorRoth)" />
                    <Area type="monotone" dataKey="Taxable Savings" stroke="#f59e0b" fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRADITIONAL VS ROTH TAX OPTIMIZER */}
      {activeTab === "optimizer" && (
        <div id="panel-optimizer" role="tabpanel" aria-labelledby="tab-optimizer" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Traditional vs. Roth Tax Optimizer &amp; Breakeven Solver
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Compare exact after-tax wealth outcomes based on your current marginal tax bracket vs expected retirement tax bracket.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans tabular-nums">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200 dark:border-blue-800 space-y-2">
              <span className="font-sans font-bold text-blue-700 dark:text-blue-300 text-sm block">
                Traditional IRA (After Retirement Tax)
              </span>
              <div className="text-2xl font-extrabold text-blue-600">{fmt(results.traditionalPostTaxBalance)}</div>
              <p className="font-sans text-[11px] text-zinc-500">
                Gross pre-tax balance of {fmt(results.traditionalPreTaxBalance)} taxed at {retirementTaxRateInput}% in retirement.
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <span className="font-sans font-bold text-emerald-700 dark:text-emerald-300 text-sm block">
                Roth IRA (100% Tax-Free)
              </span>
              <div className="text-2xl font-extrabold text-emerald-600">{fmt(results.rothBalance)}</div>
              <p className="font-sans text-[11px] text-zinc-500">
                Funded with after-tax dollars at {currentTaxRateInput}% today, compounds 100% tax-free forever.
              </p>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs leading-relaxed space-y-2">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm block">💡 Strategic Tax Rule of Thumb</span>
            <p>
              • If your current tax rate (<strong>{currentTaxRateInput}%</strong>) &gt; expected retirement tax rate (<strong>{retirementTaxRateInput}%</strong>): <strong>Traditional IRA wins</strong> because you deduct taxes at a higher rate today and pay at a lower rate later.<br />
              • If expected retirement tax rate (<strong>{retirementTaxRateInput}%</strong>) &gt; current tax rate (<strong>{currentTaxRateInput}%</strong>): <strong>Roth IRA wins</strong> because paying taxes upfront at lower rates locks in permanent tax-free compounding.<br />
              • If tax rates are equal: Traditional and Roth yield identical after-tax balances of {fmt(results.rothBalance)}, but <strong>Roth IRA provides tax diversification and no lifetime RMDs</strong>.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: IRS CONTRIBUTION LIMITS CHECKER */}
      {activeTab === "checker" && (
        <div id="panel-checker" role="tabpanel" aria-labelledby="tab-checker" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              2025 &amp; 2026 IRS Contribution Cap Validation
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Verify if your annual contributions comply with official IRS Publication 590 annual caps across Traditional, Roth, SEP, and SIMPLE IRAs.
            </p>
          </div>

          {/* Warning Banner if Exceeded */}
          {results.exceedsLimitWarning && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-800 dark:text-rose-200 text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm">
                <AlertTriangle className="h-4 w-4 text-rose-600 flex-shrink-0" />
                <span>IRS Annual Statutory Contribution Cap Warning</span>
              </div>
              <p>{results.exceedsLimitWarning}</p>
            </div>
          )}

          {/* Compensation Limitation Input */}
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                Taxable Compensation Limit Check
              </span>
              <span className="text-[11px] text-zinc-500">IRS Rule: IRA contribution &le; Taxable Earned Income</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="ira-compensation" className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Your Taxable Earned Compensation ($)
                </label>
                <Input
                  id="ira-compensation"
                  type="number"
                  placeholder="e.g. 50000 (Optional)"
                  value={taxableCompensationInput}
                  onChange={(e) => setTaxableCompensationInput(e.target.value)}
                  className="text-xs font-sans tabular-nums h-8 px-2 bg-white dark:bg-zinc-800"
                />
              </div>
              <div className="text-[11px] text-zinc-500 pt-5">
                {results.exceedsCompensationWarning ? (
                  <span className="text-rose-600 font-bold flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5" /> {results.exceedsCompensationWarning}
                  </span>
                ) : taxableCompensationInput ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Compensation meets IRS requirements.
                  </span>
                ) : (
                  <span>Enter compensation to verify you have sufficient earned income for this IRA contribution.</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* 2026 Traditional & Roth Limit */}
            <div className="bg-purple-50 dark:bg-purple-950/30 p-5 rounded-xl border border-purple-200 dark:border-purple-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-900 dark:text-purple-200 text-sm block">
                  2026 Traditional &amp; Roth IRA Limit
                </span>
                <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300 text-[10px]">
                  Current 2026 Rules
                </Badge>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                <strong>Base Limit (Under age 50):</strong> ${IRA_2026_BASE_CAP.toLocaleString()} / year<br />
                <strong>Catch-Up Limit (Age 50+):</strong> ${IRA_2026_TOTAL_CATCHUP_CAP.toLocaleString()} / year ($1,100 catch-up)
              </p>
              <div className="pt-2 border-t border-purple-200/60 dark:border-purple-800/60 text-[11px]">
                Combined IRA rule: Traditional and Roth IRAs share this single annual limit.
              </div>
            </div>

            {/* 2025 Traditional & Roth Limit */}
            <div className="bg-zinc-50 dark:bg-zinc-800/30 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900 dark:text-zinc-200 text-sm block">
                  2025 Traditional &amp; Roth IRA Limit
                </span>
                <Badge variant="outline" className="bg-zinc-100 text-zinc-700 border-zinc-300 text-[10px]">
                  Prior Year
                </Badge>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                <strong>Base Limit (Under age 50):</strong> ${IRA_2025_BASE_CAP.toLocaleString()} / year<br />
                <strong>Catch-Up Limit (Age 50+):</strong> ${IRA_2025_TOTAL_CATCHUP_CAP.toLocaleString()} / year ($1,000 catch-up)
              </p>
            </div>

            {/* SEP IRA Limit */}
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2">
              <span className="font-bold text-indigo-900 dark:text-indigo-200 text-sm block">
                SEP IRA Limit (Self-Employed)
              </span>
              <p className="text-zinc-600 dark:text-zinc-400">
                <strong>2026 Max Limit:</strong> Up to 25% of net self-employment income or <strong>${SEP_IRA_2026_MAX.toLocaleString()}</strong> max per year ($70,000 in 2025).
              </p>
            </div>

            {/* SIMPLE IRA Limit */}
            <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800 space-y-2">
              <span className="font-bold text-amber-900 dark:text-amber-200 text-sm block">
                SIMPLE IRA Limit (Small Business)
              </span>
              <p className="text-zinc-600 dark:text-zinc-400">
                <strong>2026 Limit:</strong> ${SIMPLE_IRA_2026_BASE.toLocaleString()} / year (${(SIMPLE_IRA_2026_BASE + SIMPLE_IRA_2026_CATCHUP).toLocaleString()} for age 50+) plus employer matching ($16,500 in 2025).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AGE-BY-AGE SCHEDULE */}
      {activeTab === "schedule" && (
        <div id="panel-schedule" role="tabpanel" aria-labelledby="tab-schedule" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                Age-by-Age 4-Account Comparison Schedule
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Beginning-of-year compounding schedule across 35 projection years (Age {results.currentAge} &rarr; {results.retirementAge}).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={exportCSV}
                className="h-7 text-xs cursor-pointer gap-1"
              >
                <Download className="h-3.5 w-3.5" /> Export CSV
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-2.5">Age / Year</th>
                  <th className="p-2.5 text-right">Trad Pre-Tax ($)</th>
                  <th className="p-2.5 text-right">Trad Post-Tax ($)</th>
                  <th className="p-2.5 text-right">Roth IRA ($)</th>
                  <th className="p-2.5 text-right">Taxable Savings ($)</th>
                  <th className="p-2.5 text-right">Principal ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px] font-sans tabular-nums">
                {results.schedule.map((r) => (
                  <tr key={r.age} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2.5 font-bold text-zinc-800 dark:text-zinc-200">
                      Age {r.age} ({r.year})
                    </td>
                    <td className="p-2.5 text-right text-blue-600 font-medium">{fmt(r.traditionalPreTaxEnd)}</td>
                    <td className="p-2.5 text-right font-bold text-blue-600">{fmt(r.traditionalPostTaxEnd)}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-600">{fmt(r.rothEnd)}</td>
                    <td className="p-2.5 text-right text-amber-600">{fmt(r.taxableEnd)}</td>
                    <td className="p-2.5 text-right text-zinc-500">{fmt(r.principalContributed)}</td>
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

export default IraCalculator;
