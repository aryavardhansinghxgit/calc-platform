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
import {
  calculateIra,
  IraResult,
  IRA_2025_BASE_CAP,
  IRA_2025_CATCHUP_CAP,
} from "@/lib/calculator-engine/formulas/ira";

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

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Compute Results
  const results: IraResult = useMemo(() => {
    return calculateIra({
      currentBalance: Number(currentBalanceInput) || 30000,
      annualContribution: Number(annualContributionInput) || 7500,
      investmentReturn: Number(investmentReturnInput) || 6,
      currentAge: Number(currentAgeInput) || 30,
      retirementAge: Number(retirementAgeInput) || 65,
      currentTaxRate: Number(currentTaxRateInput) || 25,
      retirementTaxRate: Number(retirementTaxRateInput) || 15,
    });
  }, [
    currentBalanceInput,
    annualContributionInput,
    investmentReturnInput,
    currentAgeInput,
    retirementAgeInput,
    currentTaxRateInput,
    retirementTaxRateInput,
  ]);

  const fmt = (val: number) => `$${val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  // Quick Presets
  const applyPreset = (contrib: number) => {
    setAnnualContributionInput(contrib.toString());
  };

  // Copy Summary
  const copySummary = () => {
    const text = `IRA Retirement Comparison Summary (${results.recommendation}):
------------------------------------------------
Current Age: ${results.currentAge} | Planned Retirement Age: ${results.retirementAge}
Traditional IRA (Pre-Tax): ${fmt(results.traditionalPreTaxBalance)}
Traditional IRA (After-Tax): ${fmt(results.traditionalPostTaxBalance)}
Roth IRA (Tax-Free): ${fmt(results.rothBalance)}
Regular Taxable Savings: ${fmt(results.taxableBalance)}
Total Principal Invested: ${fmt(results.totalPrincipalInvested)}`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
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
      "Principal Invested ($)",
    ];
    const rows = results.schedule.map((r) => [
      r.age,
      r.year,
      r.traditionalPreTaxEnd,
      r.traditionalPostTaxEnd,
      r.rothEnd,
      r.taxableEnd,
      r.principalContributed,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ira_schedule_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Recharts Chart Data
  const chartData = results.schedule
    .filter((_, idx) => idx % Math.max(1, Math.floor(results.schedule.length / 25)) === 0)
    .map((r) => ({
      name: `Age ${r.age}`,
      TraditionalPreTax: r.traditionalPreTaxEnd,
      TraditionalPostTax: r.traditionalPostTaxEnd,
      RothIRA: r.rothEnd,
      TaxableSavings: r.taxableEnd,
    }));

  const barChartData = [
    { name: "Trad (Pre-Tax)", Balance: results.traditionalPreTaxBalance, fill: "#3b82f6" },
    { name: "Trad (Post-Tax)", Balance: results.traditionalPostTaxBalance, fill: "#6366f1" },
    { name: "Roth IRA", Balance: results.rothBalance, fill: "#10b981" },
    { name: "Taxable Savings", Balance: results.taxableBalance, fill: "#f59e0b" },
  ];

  // Report Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "IRA Retirement & Tax Optimization Suite",
      reportTitle: "IRA Comparison & Wealth Growth Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      { label: "Traditional IRA (Post-Tax)", value: fmt(results.traditionalPostTaxBalance), subtitle: `Pre-tax balance: ${fmt(results.traditionalPreTaxBalance)}`, colorTheme: "blue" },
      { label: "Roth IRA (100% Tax-Free)", value: fmt(results.rothBalance), subtitle: `Tax-free growth at age ${results.retirementAge}`, colorTheme: "emerald" },
      { label: "Regular Taxable Savings", value: fmt(results.taxableBalance), subtitle: "After annual tax drag", colorTheme: "amber" },
    ],
    sections: [
      {
        title: "IRA Retirement Comparison Details",
        items: [
          { label: "Current Age", value: results.currentAge.toString() },
          { label: "Planned Retirement Age", value: results.retirementAge.toString() },
          { label: "Current Marginal Tax Rate", value: `${currentTaxRateInput}%` },
          { label: "Expected Retirement Tax Rate", value: `${retirementTaxRateInput}%` },
          { label: "Traditional IRA (Post-Tax)", value: fmt(results.traditionalPostTaxBalance), highlight: true },
          { label: "Roth IRA (100% Tax-Free)", value: fmt(results.rothBalance), highlight: true },
          { label: "Taxable Savings Balance", value: fmt(results.taxableBalance), highlight: true },
          { label: "Total Principal Invested", value: fmt(results.totalPrincipalInvested) },
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
            <Sparkles className="h-3 w-3" /> IRA Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button type="button" size="sm" variant="outline" onClick={() => applyPreset(7000)} className="h-6 text-[10px] px-2 cursor-pointer">
            💼 Standard IRA ($7,000/yr)
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => applyPreset(8000)} className="h-6 text-[10px] px-2 cursor-pointer">
            🌟 Catch-Up Age 50+ ($8,000/yr)
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => applyPreset(25000)} className="h-6 text-[10px] px-2 cursor-pointer">
            🚀 SEP IRA ($25,000/yr)
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Roth IRA at Age {results.retirementAge}:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-sans tabular-nums text-sm">{fmt(results.rothBalance)}</span>
        </div>
      </div>

      {/* Navigation Tabs */}
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
          <TrendingUp className="h-4 w-4" /> IRA Growth &amp; Comparison
        </button>
        <button
          type="button"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Contributions &amp; Returns
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Current Balance ($)</label>
                  <Input
                    type="number"
                    min="0"
                    value={currentBalanceInput}
                    onChange={(e) => setCurrentBalanceInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Annual Before-Tax Contrib ($)</label>
                  <Input
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
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Retirement Age</label>
                  <Input
                    type="number"
                    min="19"
                    max="100"
                    value={retirementAgeInput}
                    onChange={(e) => setRetirementAgeInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Return (%/yr)</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
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
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Current Marginal Tax Rate (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="50"
                    value={currentTaxRateInput}
                    onChange={(e) => setCurrentTaxRateInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Expected Retirement Tax Rate (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="50"
                    value={retirementTaxRateInput}
                    onChange={(e) => setRetirementTaxRateInput(e.target.value)}
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
                  IRA BALANCES AT RETIREMENT (AGE {results.retirementAge})
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

              <div className="grid grid-cols-2 gap-4 my-3 font-sans tabular-nums">
                <div>
                  <div className="text-[11px] text-zinc-400">Roth IRA (100% Tax-Free)</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{fmt(results.rothBalance)}</div>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-400">Traditional (After-Tax)</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-300">{fmt(results.traditionalPostTaxBalance)}</div>
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
                  <div className="font-bold font-sans tabular-nums text-white text-sm">{fmt(results.traditionalPreTaxBalance)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Taxable Savings</div>
                  <div className="font-bold font-sans tabular-nums text-amber-300 text-sm">{fmt(results.taxableBalance)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Principal Out-of-Pocket</div>
                  <div className="font-bold font-sans tabular-nums text-zinc-300 text-sm">{fmt(results.totalPrincipalInvested)}</div>
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
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v: number) => `$${v}`} />
                    <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, "Balance"]} />
                    <Bar dataKey="Balance" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRADITIONAL VS ROTH TAX OPTIMIZER */}
      {activeTab === "optimizer" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Traditional vs. Roth Tax Optimizer &amp; Breakeven Solver
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Compare exact after-tax wealth outcomes based on your current marginal tax bracket vs expected retirement tax bracket.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-sans tabular-nums">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200 dark:border-blue-800 space-y-2">
              <span className="font-sans font-bold text-blue-700 dark:text-blue-300 text-sm block">Traditional IRA (After Retirement Tax)</span>
              <div className="text-2xl font-extrabold text-blue-600">{fmt(results.traditionalPostTaxBalance)}</div>
              <p className="font-sans text-[11px] text-zinc-500">
                Gross pre-tax balance of {fmt(results.traditionalPreTaxBalance)} taxed at {retirementTaxRateInput}% in retirement.
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <span className="font-sans font-bold text-emerald-700 dark:text-emerald-300 text-sm block">Roth IRA (100% Tax-Free)</span>
              <div className="text-2xl font-extrabold text-emerald-600">{fmt(results.rothBalance)}</div>
              <p className="font-sans text-[11px] text-zinc-500">
                Funded with after-tax dollars at {currentTaxRateInput}% today, compounds 100% tax-free forever.
              </p>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs leading-relaxed space-y-2">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm block">💡 Strategic Tax Rule of Thumb</span>
            <p>
              • If your current tax rate (<strong>{currentTaxRateInput}%</strong>) &gt; expected retirement tax rate (<strong>{retirementTaxRateInput}%</strong>): <strong>Traditional IRA wins</strong> because you deduct taxes at a higher rate now.<br />
              • If expected retirement tax rate &gt; current tax rate: <strong>Roth IRA wins</strong> because you pay lower taxes today to lock in tax-free growth.<br />
              • If tax rates are equal: Traditional and Roth yield identical after-tax balances, but <strong>Roth IRA provides tax diversification and no RMDs</strong>.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: IRS CONTRIBUTION LIMITS CHECKER */}
      {activeTab === "checker" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">2025 &amp; 2026 IRS Contribution Cap Validation
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Verify if your annual contributions comply with official IRS Publication 590 annual caps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-purple-50 dark:bg-purple-950/30 p-5 rounded-xl border border-purple-200 dark:border-purple-800 space-y-2">
              <span className="font-bold text-purple-900 dark:text-purple-200 text-sm block">Traditional &amp; Roth IRA Limit</span>
              <p className="text-zinc-600 dark:text-zinc-400">
                <strong>Base Limit (Under age 50):</strong> $7,000 / year<br />
                <strong>Catch-Up Limit (Age 50+):</strong> $8,000 / year
              </p>
              <div className="pt-2 border-t border-purple-200">
                Current Input: <strong className="font-sans tabular-nums text-purple-600 text-sm">{fmt(Number(annualContributionInput))}</strong>
                {Number(annualContributionInput) > 7000 && Number(currentAgeInput) < 50 && (
                  <span className="block text-rose-600 font-bold text-[11px] mt-1">
                    ⚠️ WARNING: Contributions exceed $7,000 IRS limit for under age 50!
                  </span>
                )}
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2">
              <span className="font-bold text-indigo-900 dark:text-indigo-200 text-sm block">SEP IRA Limit (Self-Employed)</span>
              <p className="text-zinc-600 dark:text-zinc-400">
                <strong>2025/2026 Max Limit:</strong> Up to 25% of net self-employment income or <strong>$70,000</strong> max per year.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AGE-BY-AGE SCHEDULE */}
      {activeTab === "schedule" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Age-by-Age 4-Account Comparison Schedule
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
                    <td className="p-2.5 text-right text-blue-600">{fmt(r.traditionalPreTaxEnd)}</td>
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

      {/* Educational Content & EXACTLY 10 FAQs */}
    </div>
  );
}
