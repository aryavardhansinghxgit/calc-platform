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
  calculateRothIra,
  calculateBackdoorRoth,
  RothIraResult,
  BackdoorRothResult,
  ROTH_2025_BASE_CAP,
  ROTH_2025_CATCHUP_CAP,
  ROTH_2026_BASE_CAP,
  ROTH_2026_CATCHUP_CAP,
} from "@/lib/calculator-engine/formulas/roth-ira";

export function RothIraCalculator() {
  // Tabs: 'growth' | 'backdoor' | 'magi' | 'schedule'
  const [activeTab, setActiveTab] = useState<"growth" | "backdoor" | "magi" | "schedule">("growth");

  // Core Inputs matching Calculator.net reference screenshot
  const [currentBalanceInput, setCurrentBalanceInput] = useState<string>("30000");
  const [annualContributionInput, setAnnualContributionInput] = useState<string>("7500");
  const [maximizeContributions, setMaximizeContributions] = useState<boolean>(false);
  const [investmentReturnInput, setInvestmentReturnInput] = useState<string>("6");
  const [currentAgeInput, setCurrentAgeInput] = useState<string>("30");
  const [retirementAgeInput, setRetirementAgeInput] = useState<string>("65");
  const [marginalTaxRateInput, setMarginalTaxRateInput] = useState<string>("25");

  // Backdoor Roth Specific Inputs
  const [conversionAmountInput, setConversionAmountInput] = useState<string>("50000");

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Compute Results for Roth IRA vs Taxable Account
  const results: RothIraResult = useMemo(() => {
    return calculateRothIra({
      currentBalance: Number(currentBalanceInput) || 30000,
      annualContribution: Number(annualContributionInput) || 7500,
      maximizeContributions,
      investmentReturn: Number(investmentReturnInput) || 6,
      currentAge: Number(currentAgeInput) || 30,
      retirementAge: Number(retirementAgeInput) || 65,
      marginalTaxRate: Number(marginalTaxRateInput) || 25,
    });
  }, [
    currentBalanceInput,
    annualContributionInput,
    maximizeContributions,
    investmentReturnInput,
    currentAgeInput,
    retirementAgeInput,
    marginalTaxRateInput,
  ]);

  // Compute Backdoor Roth Conversion Results
  const backdoorResults: BackdoorRothResult = useMemo(() => {
    return calculateBackdoorRoth({
      traditionalIraBalance: 100000,
      conversionAmount: Number(conversionAmountInput) || 50000,
      currentTaxRate: Number(marginalTaxRateInput) || 25,
      yearsToRetirement: Math.max(1, (Number(retirementAgeInput) || 65) - (Number(currentAgeInput) || 30)),
      investmentReturn: Number(investmentReturnInput) || 6,
    });
  }, [conversionAmountInput, marginalTaxRateInput, retirementAgeInput, currentAgeInput, investmentReturnInput]);

  const fmt = (val: number) => `$${val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  // Quick Presets
  const applyPreset = (contrib: number, max: boolean) => {
    setAnnualContributionInput(contrib.toString());
    setMaximizeContributions(max);
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Roth IRA vs. Taxable Account Summary (${results.recommendation}):
------------------------------------------------
Current Age: ${results.currentAge} | Planned Retirement Age: ${results.retirementAge}
Roth IRA (100% Tax-Free): ${fmt(results.rothBalanceAtRetirement)}
Taxable Account (After-Tax): ${fmt(results.taxableBalanceAtRetirement)}
Total Principal Contributed: ${fmt(results.totalPrincipalContributed)}
Roth Interest Earned: ${fmt(results.rothTotalInterest)} | Taxable Interest: ${fmt(results.taxableTotalInterest)}
Roth Taxes Paid: $0 | Taxable Account Taxes Paid: ${fmt(results.taxableTotalTax)}
Net Roth IRA Advantage: ${fmt(results.rothAdvantageOverTaxable)}`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Age",
      "Year",
      "Principal Start ($)",
      "Principal End ($)",
      "Roth IRA Start ($)",
      "Roth IRA End ($)",
      "Taxable Account Start ($)",
      "Taxable Account End ($)",
    ];
    const rows = results.schedule.map((r) => [
      r.age,
      r.year,
      r.principalStart,
      r.principalEnd,
      r.rothStart,
      r.rothEnd,
      r.taxableStart,
      r.taxableEnd,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `roth_ira_schedule_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Recharts Chart Data
  const chartData = results.schedule
    .filter((_, idx) => idx % Math.max(1, Math.floor(results.schedule.length / 25)) === 0)
    .map((r) => ({
      name: `Age ${r.age}`,
      RothIRA: r.rothEnd,
      TaxableAccount: r.taxableEnd,
      Principal: r.principalEnd,
    }));

  const barChartData = [
    { name: "Roth IRA (100% Tax-Free)", Balance: results.rothBalanceAtRetirement, fill: "#10b981" },
    { name: "Taxable Account", Balance: results.taxableBalanceAtRetirement, fill: "#6366f1" },
    { name: "Principal Contributed", Balance: results.totalPrincipalContributed, fill: "#64748b" },
  ];

  // Report Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Roth IRA Tax-Free Wealth Suite",
      reportTitle: "Roth IRA vs. Taxable Account Growth Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      { label: "Roth IRA (100% Tax-Free)", value: fmt(results.rothBalanceAtRetirement), subtitle: `At Age ${results.retirementAge}`, colorTheme: "emerald" },
      { label: "Taxable Account Balance", value: fmt(results.taxableBalanceAtRetirement), subtitle: `After ${fmt(results.taxableTotalTax)} in taxes`, colorTheme: "blue" },
      { label: "Net Roth Tax Savings Gain", value: fmt(results.rothAdvantageOverTaxable), subtitle: "$0 lifetime tax paid", colorTheme: "purple" },
    ],
    sections: [
      {
        title: "Roth IRA Growth Comparison Details",
        items: [
          { label: "Current Age", value: results.currentAge.toString() },
          { label: "Planned Retirement Age", value: results.retirementAge.toString() },
          { label: "Marginal Tax Rate", value: `${marginalTaxRateInput}%` },
          { label: "Total Principal Contributed", value: fmt(results.totalPrincipalContributed) },
          { label: "Roth IRA Interest Earned", value: fmt(results.rothTotalInterest), highlight: true },
          { label: "Roth IRA Taxes Paid", value: "$0 (100% Tax-Free)", highlight: true },
          { label: "Taxable Account Taxes Paid", value: fmt(results.taxableTotalTax) },
          { label: "Net Roth IRA Advantage", value: fmt(results.rothAdvantageOverTaxable), highlight: true },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top Quick Presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 gap-1 text-xs">
            <Sparkles className="h-3 w-3" /> Roth IRA Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button type="button" size="sm" variant="outline" onClick={() => applyPreset(7000, false)} className="h-6 text-[10px] px-2 cursor-pointer">
            🔒 2025 Max ($7,000/yr)
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => applyPreset(7500, false)} className="h-6 text-[10px] px-2 cursor-pointer">
            🚀 2026 Max ($7,500/yr)
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => applyPreset(8600, true)} className="h-6 text-[10px] px-2 cursor-pointer">
            🌟 2026 Age 50+ ($8,600/yr)
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Roth Advantage over Taxable:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-sans tabular-nums text-sm">+{fmt(results.rothAdvantageOverTaxable)}</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("growth")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "growth"
              ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <TrendingUp className="h-4 w-4" /> Roth IRA vs. Taxable Account
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("backdoor")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "backdoor"
              ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Zap className="h-4 w-4 text-amber-500" /> Backdoor Roth Conversion
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("magi")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "magi"
              ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <ShieldCheck className="h-4 w-4 text-purple-500" /> MAGI Limits &amp; Saver's Credit
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("schedule")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "schedule"
              ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <FileSpreadsheet className="h-4 w-4 text-indigo-500" /> Annual Schedule
        </button>
      </div>

      {/* TAB 1: ROTH IRA VS TAXABLE ACCOUNT */}
      {activeTab === "growth" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Roth IRA Contributions &amp; Profile
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
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Annual Contribution ($)</label>
                  <Input
                    type="number"
                    min="0"
                    disabled={maximizeContributions}
                    value={maximizeContributions ? (Number(currentAgeInput) >= 50 ? "8000" : "7000") : annualContributionInput}
                    onChange={(e) => setAnnualContributionInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Maximize Contributions Toggle matching Calculator.net screenshot */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">Maximize Contributions?</span>
                  <p className="text-[11px] text-zinc-500">Automatically sets to max IRS annual cap ($7,000 / $8,000)</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="maxContrib"
                      checked={maximizeContributions}
                      onChange={() => setMaximizeContributions(true)}
                      className="text-emerald-600"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="maxContrib"
                      checked={!maximizeContributions}
                      onChange={() => setMaximizeContributions(false)}
                      className="text-emerald-600"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

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
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Expected Rate of Return (%/yr)</label>
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
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Marginal Tax Rate (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="50"
                    value={marginalTaxRateInput}
                    onChange={(e) => setMarginalTaxRateInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Results Dashboard (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Result Card matching Calculator.net table */}
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  ROTH IRA VS TAXABLE ACCOUNT (AGE {results.retirementAge})
                </span>
                <div className="flex gap-2">
                  
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setIsReportOpen(true)}
                    className="h-7 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer"
                  >
                    <Printer className="h-3 w-3 mr-1" /> PDF Report
                  </Button>
                </div>
              </div>

              {/* Calculator.net Exact Output Table */}
              <div className="overflow-x-auto my-3 font-sans tabular-nums">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/20 text-white/70">
                      <th className="py-2">Metric</th>
                      <th className="py-2 text-right font-bold text-emerald-300">Roth IRA</th>
                      <th className="py-2 text-right font-bold text-blue-200">Taxable Account</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-sm">
                    <tr>
                      <td className="py-2 font-semibold">Balance at age {results.retirementAge}</td>
                      <td className="py-2 text-right font-extrabold text-emerald-400">{fmt(results.rothBalanceAtRetirement)}</td>
                      <td className="py-2 text-right font-bold text-blue-200">{fmt(results.taxableBalanceAtRetirement)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-zinc-300">Total Principal</td>
                      <td className="py-2 text-right text-zinc-200">{fmt(results.totalPrincipalContributed)}</td>
                      <td className="py-2 text-right text-zinc-200">{fmt(results.totalPrincipalContributed)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-zinc-300">Total Interest</td>
                      <td className="py-2 text-right font-bold text-emerald-300">{fmt(results.rothTotalInterest)}</td>
                      <td className="py-2 text-right text-blue-200">{fmt(results.taxableTotalInterest)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-zinc-300">Total Tax Paid</td>
                      <td className="py-2 text-right font-bold text-emerald-300">$0 (100% Tax-Free)</td>
                      <td className="py-2 text-right text-rose-300 font-bold">{fmt(results.taxableTotalTax)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Calculator.net Callout Summary */}
              <div className="bg-white/10 p-3 rounded-xl text-xs backdrop-blur-sm border border-white/10">
                🎉 {results.recommendation}
              </div>
            </div>

            {/* Trajectory Recharts Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex justify-between">
                <span>Balance Accumulation Graph (Age {results.currentAge} to {results.retirementAge})</span>
                <span className="text-[10px] text-zinc-400 font-normal">Recharts Comparison</span>
              </h4>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v: number) => `$${v}`} />
                    <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, "Value"]} />
                    <Area type="monotone" dataKey="RothIRA" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Roth IRA (100% Tax-Free)" />
                    <Area type="monotone" dataKey="TaxableAccount" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} name="Taxable Account" />
                    <Area type="monotone" dataKey="Principal" stroke="#64748b" fill="#64748b" fillOpacity={0.05} name="Principal" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BACKDOOR ROTH CONVERSION */}
      {activeTab === "backdoor" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Mode 2: Backdoor Roth IRA Conversion Calculator
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Calculate the upfront tax cost of converting traditional IRA pre-tax dollars into a Roth IRA and project your net long-term tax-free gain.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Conversion Amount ($)</label>
              <Input type="number" min="0" value={conversionAmountInput} onChange={(e) => setConversionAmountInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Current Tax Bracket (%)</label>
              <Input type="number" min="0" max="50" value={marginalTaxRateInput} onChange={(e) => setMarginalTaxRateInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-6 rounded-xl space-y-3 font-sans tabular-nums text-xs">
            <div className="flex justify-between items-center text-sm font-sans font-bold text-amber-900 dark:text-amber-200 border-b pb-2">
              <span>Upfront Conversion Tax Due:</span>
              <span className="text-2xl font-extrabold font-sans tabular-nums text-rose-600">{fmt(backdoorResults.taxDueOnConversion)}</span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Future Tax-Free Roth Balance at Age {results.retirementAge}:</span>
              <span className="font-bold text-emerald-600">{fmt(backdoorResults.rothFutureValueTaxFree)}</span>
            </div>
            <p className="font-sans text-xs text-amber-800 dark:text-amber-300 pt-2 border-t border-amber-200/50">
              💡 {backdoorResults.recommendation}
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: MAGI LIMITS & SAVER'S CREDIT */}
      {activeTab === "magi" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Mode 3: MAGI Income Eligibility &amp; Saver's Credit Checker
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Check 2025/2026 Modified Adjusted Gross Income (MAGI) phase-outs and IRS Form 8880 tax credit eligibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-purple-50 dark:bg-purple-950/30 p-5 rounded-xl border border-purple-200 dark:border-purple-800 space-y-2">
              <span className="font-bold text-purple-900 dark:text-purple-200 text-sm block">2026 MAGI Phase-Out Limits</span>
              <p className="text-zinc-600 dark:text-zinc-400">
                • <strong>Single / Head of Household:</strong> $153,000 – $168,000<br />
                • <strong>Married Filing Jointly:</strong> $242,000 – $252,000<br />
                • <strong>Married Filing Separately:</strong> $0 – $10,000
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <span className="font-bold text-emerald-900 dark:text-emerald-200 text-sm block">IRS Form 8880 Saver&apos;s Credit (2026)</span>
              <p className="text-zinc-600 dark:text-zinc-400">
                Receive up to a 50%, 20%, or 10% non-refundable tax credit on your first $2,000 contributed to a Roth IRA ($1,000 max credit) for AGI up to $80,500 (MFJ), $60,375 (HoH), or $40,250 (Single/MFS).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ANNUAL SCHEDULE TABLE MATCHING CALCULATOR.NET */}
      {activeTab === "schedule" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Annual Schedule (Principal vs. Roth IRA vs. Taxable Account)
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
                  <th className="p-2.5 border-b">Age</th>
                  <th className="p-2.5 text-right border-b" colSpan={2}>Principal ($)</th>
                  <th className="p-2.5 text-right border-b text-emerald-600" colSpan={2}>Roth IRA ($)</th>
                  <th className="p-2.5 text-right border-b text-blue-600" colSpan={2}>Taxable Account ($)</th>
                </tr>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 text-[10px]">
                  <th className="p-2">Age</th>
                  <th className="p-2 text-right">Start</th>
                  <th className="p-2 text-right">End</th>
                  <th className="p-2 text-right">Start</th>
                  <th className="p-2 text-right">End</th>
                  <th className="p-2 text-right">Start</th>
                  <th className="p-2 text-right">End</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px] font-sans tabular-nums">
                {results.schedule.map((r) => (
                  <tr key={r.age} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2.5 font-bold text-zinc-800 dark:text-zinc-200">
                      {r.age}
                    </td>
                    <td className="p-2.5 text-right">{fmt(r.principalStart)}</td>
                    <td className="p-2.5 text-right">{fmt(r.principalEnd)}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-600">{fmt(r.rothStart)}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-600">{fmt(r.rothEnd)}</td>
                    <td className="p-2.5 text-right text-blue-600">{fmt(r.taxableStart)}</td>
                    <td className="p-2.5 text-right text-blue-600">{fmt(r.taxableEnd)}</td>
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
