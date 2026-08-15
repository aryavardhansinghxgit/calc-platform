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
  ArrowRight,
  RotateCcw,
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
  ComposedChart,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import { RmdContent } from "./RmdContent";
import {
  calculateRmd,
  AccountItem,
  getRmdStartingAge,
} from "@/lib/calculator-engine/formulas/rmd";

export function RmdCalculator() {
  // Tabs: 'calculator' | 'multiAccount' | 'qcdTax' | 'charts' | 'schedule'
  const [activeTab, setActiveTab] = useState<
    "calculator" | "multiAccount" | "qcdTax" | "charts" | "schedule"
  >("calculator");

  // Primary Inputs State
  const [birthYearInput, setBirthYearInput] = useState<string>("1951");
  const [rmdYearInput, setRmdYearInput] = useState<string>("2026");
  const [balanceInput, setBalanceInput] = useState<string>("300000");
  const [isSpouseSoleBeneficiary, setIsSpouseSoleBeneficiary] = useState<boolean>(false);
  const [spouseBirthYearInput, setSpouseBirthYearInput] = useState<string>("1965");
  const [growthRateInput, setGrowthRateInput] = useState<string>("5.0");
  const [taxRateInput, setTaxRateInput] = useState<string>("22.0");
  const [qcdInput, setQcdInput] = useState<string>("0");

  // Multi-Account Portfolio State
  const [accounts, setAccounts] = useState<AccountItem[]>([
    { id: "1", name: "Primary Traditional IRA", type: "traditional_ira", balance: 200000 },
    { id: "2", name: "Former Employer 401(k)", type: "401k", balance: 100000 },
  ]);

  // Modal & Notification State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Table Search Filter
  const [tableSearch, setTableSearch] = useState("");

  // Sync multi-account total balance if multi-account tab active
  const totalMultiAccountBalance = useMemo(() => {
    return accounts.reduce((sum, a) => sum + (Number(a.balance) || 0), 0);
  }, [accounts]);

  // Compute Primary RMD Results
  const results = useMemo(() => {
    const bYear = Number(birthYearInput) || 1951;
    const rYear = Number(rmdYearInput) || 2026;
    const bal = activeTab === "multiAccount" ? totalMultiAccountBalance : (Number(balanceInput) || 0);

    return calculateRmd({
      birthYear: bYear,
      rmdYear: rYear,
      priorYearBalance: bal,
      isSpouseSoleBeneficiary,
      spouseBirthYear: Number(spouseBirthYearInput) || 1965,
      growthRatePercent: Number(growthRateInput) || 5.0,
      estimatedTaxRatePercent: Number(taxRateInput) || 22.0,
      qcdAmount: Number(qcdInput) || 0,
      accounts: activeTab === "multiAccount" ? accounts : undefined,
    });
  }, [
    birthYearInput,
    rmdYearInput,
    balanceInput,
    isSpouseSoleBeneficiary,
    spouseBirthYearInput,
    growthRateInput,
    taxRateInput,
    qcdInput,
    activeTab,
    accounts,
    totalMultiAccountBalance,
  ]);

  const fmt = (val: number) =>
    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Quick Preset Handlers
  const applyPreset = (bYear: number, bal: number, rate: number) => {
    setBirthYearInput(bYear.toString());
    setBalanceInput(bal.toString());
    setGrowthRateInput(rate.toString());
  };

  // Multi-Account Handlers
  const addAccountRow = () => {
    setAccounts([
      ...accounts,
      {
        id: Date.now().toString(),
        name: `Account #${accounts.length + 1}`,
        type: "traditional_ira",
        balance: 50000,
      },
    ]);
  };

  const removeAccountRow = (id: string) => {
    setAccounts(accounts.filter((a) => a.id !== id));
  };

  const updateAccountRow = (id: string, field: keyof AccountItem, value: any) => {
    setAccounts(accounts.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Required Minimum Distribution (RMD) Summary (${results.rmdYear}):
------------------------------------------------
Birth Year: ${birthYearInput} (Age in ${results.rmdYear}: ${results.currentAge})
IRS RMD Starting Age: ${results.rmdStartingAge} (${results.isRmdRequiredThisYear ? "RMD Required" : "RMD Not Required Yet"})
Account Balance (Dec 31 Prior Year): ${fmt(results.priorYearBalance)}
IRS Distribution Factor: ${results.distributionPeriod > 0 ? results.distributionPeriod : "N/A"} (${results.tableUsed})
------------------------------------------------
Annual RMD Amount: ${fmt(results.annualRmd)}
Monthly Equivalent: ${fmt(results.monthlyRmd)}
Estimated Federal + State Tax: ${fmt(results.estimatedTaxPaid)}
Net After-Tax Income: ${fmt(results.netAfterTaxRmd)}
------------------------------------------------
Late Withdrawal Penalty (25% SECURE 2.0): ${fmt(results.penalty25Percent)}
Reduced Penalty (10% Corrected Window): ${fmt(results.penalty10Percent)}`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Export CSV Schedule
  const exportCSV = () => {
    const headers = [
      "Year",
      "Age",
      "IRS Distribution Factor",
      "RMD Amount ($)",
      "QCD Amount ($)",
      "Taxable RMD ($)",
      "Estimated Tax ($)",
      "Net After Tax ($)",
      "End of Year Balance ($)",
    ];

    const rows = results.lifetimeSchedule.map((r) => [
      r.year,
      r.age,
      r.distributionPeriod,
      r.rmdAmount,
      r.qcdOffset,
      r.taxableRmd,
      r.estimatedTax,
      r.netAfterTax,
      r.endBalance,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `irs_rmd_schedule_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Lifetime Schedule
  const filteredSchedule = useMemo(() => {
    if (!tableSearch) return results.lifetimeSchedule;
    const term = tableSearch.toLowerCase();
    return results.lifetimeSchedule.filter(
      (r) =>
        r.year.toString().includes(term) ||
        r.age.toString().includes(term) ||
        r.rmdAmount.toString().includes(term)
    );
  }, [results.lifetimeSchedule, tableSearch]);

  // Report Modal Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "IRS Required Minimum Distribution (RMD) Engine",
      reportTitle: "IRS RMD & Lifetime Withdrawal Projection Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: `Annual RMD (${results.rmdYear})`,
        value: fmt(results.annualRmd),
        subtitle: `Distribution Factor: ${results.distributionPeriod > 0 ? results.distributionPeriod : "N/A"}`,
        colorTheme: "emerald",
      },
      {
        label: "Monthly Equivalent",
        value: fmt(results.monthlyRmd),
        subtitle: `Based on Prior Year Balance ${fmt(results.priorYearBalance)}`,
        colorTheme: "blue",
      },
      {
        label: "Net After-Tax Cash Flow",
        value: fmt(results.netAfterTaxRmd),
        subtitle: `Est Tax: ${fmt(results.estimatedTaxPaid)} (${taxRateInput}%)`,
        colorTheme: "purple",
      },
    ],
    sections: [
      {
        title: "RMD Evaluation Summary",
        items: [
          { label: "Year of Birth", value: birthYearInput },
          { label: "RMD Tax Year", value: rmdYearInput },
          { label: "Age in RMD Year", value: `${results.currentAge}` },
          { label: "SECURE Act 2.0 Starting Age", value: `${results.rmdStartingAge}` },
          { label: "RMD Required Status", value: results.isRmdRequiredThisYear ? "Mandatory" : "Not Required Yet", highlight: true },
          { label: "IRS Table Applied", value: results.tableUsed },
          { label: "Distribution Factor", value: `${results.distributionPeriod}` },
          { label: "Annual RMD Amount", value: fmt(results.annualRmd), highlight: true },
          { label: "QCD Charitable Amount", value: fmt(results.qcdAmount) },
          { label: "Taxable RMD Amount", value: fmt(results.taxableRmd) },
          { label: "25% Late Excise Penalty Risk", value: fmt(results.penalty25Percent) },
          { label: "10% Corrected Penalty Risk", value: fmt(results.penalty10Percent) },
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
            <Shield className="h-3.5 w-3.5" /> SECURE Act 2.0 Compliant
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(1951, 300000, 5.0)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            Age 75 / $300k IRA
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(1946, 750000, 6.0)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            Age 80 / $750k IRA
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(1955, 500000, 5.5)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            Age 71 (Pre-RMD Planning)
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Starting RMD Age:</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-sans tabular-nums text-sm">
            Age {results.rmdStartingAge}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("calculator")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "calculator"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Landmark className="h-4 w-4" /> Standard RMD Calculator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("multiAccount")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "multiAccount"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <FileSpreadsheet className="h-4 w-4 text-purple-500" /> Multi-Account Aggregator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("qcdTax")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "qcdTax"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Heart className="h-4 w-4 text-rose-500" /> QCD &amp; Tax Savings
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
          <BarChart3 className="h-4 w-4 text-blue-500" /> Visual Lifetime Chart
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
          <Clock className="h-4 w-4 text-emerald-500" /> Lifetime Schedule Table
        </button>
      </div>

      {/* TAB 1: STANDARD CALCULATOR */}
      {activeTab === "calculator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                RMD Account &amp; Demographics
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Your Birth Year</label>
                  <Input
                    type="number"
                    min="1920"
                    max="2010"
                    value={birthYearInput}
                    onChange={(e) => setBirthYearInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800"
                  />
                  <span className="text-[10px] text-zinc-400">Determines starting age (73/75)</span>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">RMD Tax Year</label>
                  <Input
                    type="number"
                    min="2020"
                    max="2075"
                    value={rmdYearInput}
                    onChange={(e) => setRmdYearInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800"
                  />
                  <span className="text-[10px] text-zinc-400">Calculated age: {results.currentAge}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Account Balance (as of Dec 31 of Prior Year) ($)
                </label>
                <Input
                  type="number"
                  min="0"
                  step="1000"
                  value={balanceInput}
                  onChange={(e) => setBalanceInput(e.target.value)}
                  className="text-xs font-sans tabular-nums h-9 px-3 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800"
                />
              </div>

              {/* Spouse Beneficiary Toggle */}
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-200/60 dark:border-zinc-700 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    Is spouse sole beneficiary &amp; &gt; 10 years younger?
                  </span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="spouse"
                        checked={isSpouseSoleBeneficiary}
                        onChange={() => setIsSpouseSoleBeneficiary(true)}
                        className="text-indigo-600"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="spouse"
                        checked={!isSpouseSoleBeneficiary}
                        onChange={() => setIsSpouseSoleBeneficiary(false)}
                        className="text-indigo-600"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                {isSpouseSoleBeneficiary && (
                  <div className="space-y-1 border-t border-zinc-200 dark:border-zinc-700 pt-2">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Spouse Year of Birth</label>
                    <Input
                      type="number"
                      min="1920"
                      max="2010"
                      value={spouseBirthYearInput}
                      onChange={(e) => setSpouseBirthYearInput(e.target.value)}
                      className="text-xs font-sans tabular-nums h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800"
                    />
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400">
                      Triggers IRS Table II (Joint Life Expectancy)
                    </span>
                  </div>
                )}
              </div>

              {/* Growth Rate & Tax Bracket */}
              <div className="grid grid-cols-2 gap-3 text-xs border-t border-zinc-100 dark:border-zinc-800 pt-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Est. Growth Rate (%/yr)</label>
                  <Input
                    type="number"
                    min="-20"
                    max="30"
                    step="0.5"
                    value={growthRateInput}
                    onChange={(e) => setGrowthRateInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Marginal Tax Rate (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="60"
                    step="1"
                    value={taxRateInput}
                    onChange={(e) => setTaxRateInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Results Dashboard (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Status Alert if not at RMD age */}
            {!results.isRmdRequiredThisYear && (
              <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 p-4 rounded-xl flex items-start gap-3 text-xs">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-sm mb-0.5">Pre-RMD Planning Phase</span>
                  In {results.rmdYear}, you will be <strong>age {results.currentAge}</strong>. Under SECURE Act 2.0, your mandatory RMDs will begin at <strong>age {results.rmdStartingAge}</strong>.
                </div>
              </div>
            )}

            {/* Hero Result Card */}
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  YOUR RMD FOR {results.rmdYear}
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
                {fmt(results.annualRmd)}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 font-medium mb-3">
                <span>
                  Monthly Equivalent: <span className="font-bold text-emerald-300">{fmt(results.monthlyRmd)}/mo</span>
                </span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-indigo-200">
                  Distribution Factor: {results.distributionPeriod > 0 ? results.distributionPeriod : "N/A"}
                </span>
              </div>

              {/* Dynamic Formula Display Card */}
              <div className="bg-white/10 p-3 rounded-xl text-xs backdrop-blur-sm border border-white/10 font-sans tabular-nums">
                <strong>Formula:</strong> RMD = {fmt(results.priorYearBalance)} / {results.distributionPeriod > 0 ? results.distributionPeriod : "N/A"} = {fmt(results.annualRmd)}
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">IRS Table Applied</div>
                  <div className="font-bold text-white text-xs truncate">{results.tableUsed}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Est. Tax Paid ({taxRateInput}%)</div>
                  <div className="font-bold font-sans tabular-nums text-rose-300 text-sm">{fmt(results.estimatedTaxPaid)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Net After-Tax</div>
                  <div className="font-bold font-sans tabular-nums text-emerald-300 text-sm">{fmt(results.netAfterTaxRmd)}</div>
                </div>
              </div>
            </div>

            {/* Late Penalty Risk Callout Card */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3 text-xs">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-[11px] flex items-center gap-1.5">SECURE 2.0 Late Withdrawal Excise Penalty Risk
              </h4>
              <div className="grid grid-cols-2 gap-3 font-sans tabular-nums">
                <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                  <span className="font-sans text-[11px] text-zinc-500 block">Standard Penalty (25%)</span>
                  <span className="text-lg font-bold text-amber-700 dark:text-amber-300">{fmt(results.penalty25Percent)}</span>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <span className="font-sans text-[11px] text-zinc-500 block">Corrected Window (10%)</span>
                  <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{fmt(results.penalty10Percent)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-ACCOUNT PORTFOLIO AGGREGATOR */}
      {activeTab === "multiAccount" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Multi-Account Portfolio Aggregator
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Add all your tax-deferred accounts. IRS rules allow aggregating IRAs, but employer 401(k) plans must be taken separately.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={addAccountRow}
              className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Account
            </Button>
          </div>

          <div className="space-y-3">
            {accounts.map((acc) => (
              <div
                key={acc.id}
                className="grid grid-cols-12 gap-2 items-center bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-xl border border-zinc-200/70 dark:border-zinc-700 text-xs"
              >
                <Input
                  type="text"
                  value={acc.name}
                  onChange={(e) => updateAccountRow(acc.id, "name", e.target.value)}
                  placeholder="Account Name"
                  className="col-span-4 h-9 text-xs font-semibold px-2.5 bg-white dark:bg-zinc-800"
                />
                <select
                  value={acc.type}
                  onChange={(e) => updateAccountRow(acc.id, "type", e.target.value as any)}
                  className="col-span-4 h-9 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 text-xs focus:outline-none"
                >
                  <option value="traditional_ira">Traditional IRA (Aggregatable)</option>
                  <option value="401k">Employer 401(k) (Separate RMD Required)</option>
                  <option value="403b">403(b) Plan (Aggregatable with 403b only)</option>
                  <option value="sep_ira">SEP IRA (Aggregatable)</option>
                  <option value="simple_ira">SIMPLE IRA (Aggregatable)</option>
                  <option value="inherited_ira">Inherited IRA (Separate RMD Required)</option>
                </select>
                <Input
                  type="number"
                  min="0"
                  value={acc.balance || ""}
                  onChange={(e) => updateAccountRow(acc.id, "balance", Number(e.target.value))}
                  placeholder="Dec 31 Balance ($)"
                  className="col-span-3 h-9 text-xs font-sans tabular-nums px-2.5 bg-white dark:bg-zinc-800"
                />
                <div className="col-span-1 flex justify-center">
                  {accounts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAccountRow(acc.id)}
                      className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      title="Delete Account"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Account Breakdown Summary Table */}
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
              Account-Level RMD &amp; IRS Aggregation Analysis
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                    <th className="p-2.5">Account Name</th>
                    <th className="p-2.5">Type</th>
                    <th className="p-2.5 text-right">Dec 31 Balance</th>
                    <th className="p-2.5 text-right text-indigo-600">Calculated RMD</th>
                    <th className="p-2.5">IRS Withdrawal Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px] font-sans tabular-nums">
                  {results.accountBreakdown.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                      <td className="p-2.5 font-bold font-sans text-zinc-900 dark:text-zinc-100">{item.name}</td>
                      <td className="p-2.5 font-sans uppercase text-[10px] text-zinc-500">{item.type.replace("_", " ")}</td>
                      <td className="p-2.5 text-right text-zinc-800 dark:text-zinc-200">{fmt(item.balance)}</td>
                      <td className="p-2.5 text-right font-bold text-indigo-600">{fmt(item.accountRmd)}</td>
                      <td className="p-2.5 font-sans text-[10px]">
                        <span
                          className={`px-2 py-0.5 rounded-full font-semibold ${
                            item.canAggregate
                              ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                              : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                          }`}
                        >
                          {item.aggregationGroup}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: QCD & TAX SAVINGS OPTIMIZER */}
      {activeTab === "qcdTax" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Qualified Charitable Distribution (QCD) Tax Optimizer
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Transfer up to $105,000 directly from your IRA to a qualifying charity starting at age 70½ to satisfy RMDs completely tax-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Annual QCD Donation Amount ($) (Max $105,000/yr)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="105000"
                  step="1000"
                  value={qcdInput}
                  onChange={(e) => setQcdInput(e.target.value)}
                  className="text-xs font-sans tabular-nums h-9 px-3"
                />
              </div>

              <div className="bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 p-4 rounded-xl space-y-2">
                <span className="font-bold text-rose-900 dark:text-rose-200 block text-xs">
                  💡 How QCDs Save Taxes:
                </span>
                <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                  QCDs count toward your RMD requirement but are excluded from your Adjusted Gross Income (AGI). This prevents increases in your taxable income and protects you from Medicare IRMAA surcharges.
                </p>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-3 font-sans tabular-nums">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 text-sm block border-b pb-1">
                QCD Tax Savings Breakdown
              </span>
              <div className="flex justify-between">
                <span>Annual RMD:</span>
                <span className="font-bold">{fmt(results.annualRmd)}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>QCD Donation Offset:</span>
                <span className="font-bold">-{fmt(results.qcdAmount)}</span>
              </div>
              <div className="flex justify-between border-t pt-1 font-bold">
                <span>Taxable RMD Remaining:</span>
                <span className="text-indigo-600">{fmt(results.taxableRmd)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-extrabold text-sm border-t pt-2">
                <span>Estimated Tax Saved:</span>
                <span>{fmt(results.qcdAmount * (Number(taxRateInput) / 100))}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VISUAL LIFETIME CHART */}
      {activeTab === "charts" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Account Balance Trajectory &amp; Annual RMDs (Age {results.currentAge} to 120)
          </h3>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={results.lifetimeSchedule.slice(0, 35)}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="age" tick={{ fontSize: 11 }} label={{ value: "Your Age", position: "insideBottom", offset: -5 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v / 1000}k`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v / 1000}k`} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                <Legend />
                <Bar yAxisId="left" dataKey="endBalance" fill="#3b82f6" name="End of Year Account Balance ($)" />
                <Line yAxisId="right" type="monotone" dataKey="rmdAmount" stroke="#10b981" strokeWidth={2.5} name="Annual RMD ($)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* TAB 5: LIFETIME SCHEDULE TABLE */}
      {activeTab === "schedule" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Lifetime Distribution Schedule (Age {results.currentAge} to 120)
            </h3>

            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Search Year or Age..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="h-8 text-xs w-44"
              />
              <Button type="button" size="sm" variant="outline" onClick={exportCSV} className="h-8 text-xs cursor-pointer">
                <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-2.5">Year</th>
                  <th className="p-2.5">Age</th>
                  <th className="p-2.5 text-right">IRS Factor</th>
                  <th className="p-2.5 text-right text-indigo-600">Annual RMD</th>
                  <th className="p-2.5 text-right text-rose-600">QCD Offset</th>
                  <th className="p-2.5 text-right text-amber-600">Est Tax</th>
                  <th className="p-2.5 text-right text-emerald-600">Net After-Tax</th>
                  <th className="p-2.5 text-right text-blue-600">End Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px] font-sans tabular-nums">
                {filteredSchedule.slice(0, 45).map((row) => (
                  <tr key={row.year} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2.5 font-bold font-sans text-zinc-800 dark:text-zinc-200">{row.year}</td>
                    <td className="p-2.5 font-sans">{row.age}</td>
                    <td className="p-2.5 text-right">{row.distributionPeriod || "N/A"}</td>
                    <td className="p-2.5 text-right font-bold text-indigo-600">{fmt(row.rmdAmount)}</td>
                    <td className="p-2.5 text-right text-rose-600">{fmt(row.qcdOffset)}</td>
                    <td className="p-2.5 text-right text-amber-600">{fmt(row.estimatedTax)}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-600">{fmt(row.netAfterTax)}</td>
                    <td className="p-2.5 text-right font-bold text-blue-600">{fmt(row.endBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 15 FAQs */}
      <RmdContent />
    </div>
  );
}
