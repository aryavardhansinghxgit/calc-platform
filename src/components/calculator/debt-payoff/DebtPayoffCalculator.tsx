"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingDown,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import { DebtPayoffContent } from "./DebtPayoffContent";
import {
  calculateDebtPayoff,
  evaluateConsolidationLoan,
  DebtItem,
} from "@/lib/calculator-engine/formulas/debt-payoff";

export function DebtPayoffCalculator() {
  // Tabs: 'solver' | 'strategies' | 'rollover' | 'consolidation' | 'schedule'
  const [activeTab, setActiveTab] = useState<"solver" | "strategies" | "rollover" | "consolidation" | "schedule">("solver");

  // Multi-Debt State
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: "1", name: "Auto Loan", balance: 25000, minPayment: 519, apr: 4.9 },
    { id: "2", name: "Home Mortgage", balance: 250000, minPayment: 1800, apr: 4.0 },
    { id: "3", name: "Credit Card 1", balance: 6000, minPayment: 150, apr: 18.99 },
    { id: "4", name: "Credit Card 2", balance: 3000, minPayment: 60, apr: 16.99 },
  ]);

  // Options State
  const [strategy, setStrategy] = useState<"avalanche" | "snowball">("avalanche");
  const [reallocateFreedCash, setReallocateFreedCash] = useState<boolean>(true);
  const [extraMonthlyInput, setExtraMonthlyInput] = useState<string>("100");
  const [extraAnnualInput, setExtraAnnualInput] = useState<string>("0");
  const [lumpSumInput, setLumpSumInput] = useState<string>("0");
  const [lumpSumMonthInput, setLumpSumMonthInput] = useState<string>("5");

  // Consolidation Loan Inputs
  const [consolidationAprInput, setConsolidationAprInput] = useState<string>("7.5");
  const [consolidationTermInput, setConsolidationTermInput] = useState<string>("48");

  // Table Search & Pagination
  const [tableSearch, setTableSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 12;

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // 1. Compute Main Payoff Results
  const results = useMemo(() => {
    return calculateDebtPayoff({
      debts,
      strategy,
      reallocateFreedCash,
      extraMonthlyPayment: Number(extraMonthlyInput) || 0,
      extraAnnualPayment: Number(extraAnnualInput) || 0,
      lumpSumPayment: Number(lumpSumInput) || 0,
      lumpSumMonth: Number(lumpSumMonthInput) || 5,
    });
  }, [debts, strategy, reallocateFreedCash, extraMonthlyInput, extraAnnualInput, lumpSumInput, lumpSumMonthInput]);

  // 2. Compute Avalanche vs Snowball Comparison Results
  const avalancheRes = useMemo(
    () =>
      calculateDebtPayoff({
        debts,
        strategy: "avalanche",
        reallocateFreedCash: true,
        extraMonthlyPayment: Number(extraMonthlyInput) || 0,
      }),
    [debts, extraMonthlyInput]
  );

  const snowballRes = useMemo(
    () =>
      calculateDebtPayoff({
        debts,
        strategy: "snowball",
        reallocateFreedCash: true,
        extraMonthlyPayment: Number(extraMonthlyInput) || 0,
      }),
    [debts, extraMonthlyInput]
  );

  // 3. Compute Rollover OFF vs ON Comparison Results
  const rolloverOffRes = useMemo(
    () =>
      calculateDebtPayoff({
        debts,
        strategy,
        reallocateFreedCash: false,
        extraMonthlyPayment: Number(extraMonthlyInput) || 0,
      }),
    [debts, strategy, extraMonthlyInput]
  );

  // 4. Compute Consolidation Results
  const consolidationRes = useMemo(
    () =>
      evaluateConsolidationLoan(
        debts,
        Number(consolidationAprInput) || 7.5,
        Number(consolidationTermInput) || 48
      ),
    [debts, consolidationAprInput, consolidationTermInput]
  );

  const fmt = (val: number) => `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Debt Handlers
  const addDebtRow = () => {
    setDebts([
      ...debts,
      { id: Date.now().toString(), name: `Debt #${debts.length + 1}`, balance: 5000, minPayment: 100, apr: 12.0 },
    ]);
  };

  const removeDebtRow = (id: string) => {
    setDebts(debts.filter((d) => d.id !== id));
  };

  const updateDebtRow = (id: string, field: keyof DebtItem, value: any) => {
    setDebts(debts.map((d) => (d.id === id ? { ...i(d, field, value) } : d)));
  };

  const i = (d: DebtItem, field: keyof DebtItem, value: any) => ({ ...d, [field]: value });

  // Add Preset Templates
  const addPresetDebt = (name: string, bal: number, minP: number, apr: number) => {
    setDebts([...debts, { id: Date.now().toString(), name, balance: bal, minPayment: minP, apr }]);
  };

  // Filtered Amortization Table
  const filteredSchedule = useMemo(() => {
    if (!tableSearch.trim()) return results.schedule;
    return results.schedule.filter((r) => r.month.toString() === tableSearch.trim());
  }, [results.schedule, tableSearch]);

  const paginatedSchedule = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredSchedule.slice(start, start + rowsPerPage);
  }, [filteredSchedule, currentPage]);

  const totalPages = Math.ceil(filteredSchedule.length / rowsPerPage) || 1;

  // Copy Summary
  const copySummary = () => {
    const text = `Debt Payoff Summary (${results.strategyUsed}):
------------------------------------------------
Initial Total Debt Balance: ${fmt(results.initialTotalBalance)}
Time to Become Debt-Free: ${results.monthsToPayoff} months (${results.yearsToPayoff} yrs)
Estimated Debt-Free Date: ${results.payoffDate}
Total Interest Paid: ${fmt(results.totalInterestPaid)}
Total Amount Paid: ${fmt(results.totalAmountPaid)}`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Month",
      "Starting Balance ($)",
      "Total Payment ($)",
      "Interest Paid ($)",
      "Principal Paid ($)",
      "Ending Balance ($)",
      "Debts Remaining",
    ];
    const rows = results.schedule.map((r) => [
      r.month,
      r.totalStartingBalance,
      r.totalMonthlyPayment,
      r.totalInterestPaid,
      r.totalPrincipalPaid,
      r.totalEndingBalance,
      r.debtsRemaining,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `debt_payoff_schedule_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Area Chart Data (Balance Decay over time)
  const areaData = results.schedule
    .filter((_, idx) => idx % Math.max(1, Math.floor(results.schedule.length / 25)) === 0)
    .map((r) => ({
      month: `M${r.month}`,
      totalBalance: r.totalEndingBalance,
    }));

  // Pie Chart Data (Interest by Debt Item)
  const pieData = debts.map((d, idx) => ({
    name: d.name,
    value: d.balance,
    color: ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#06b6d4"][idx % 6],
  }));

  // Report Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Debt Payoff Acceleration Platform",
      reportTitle: "Multi-Debt Payoff & Debt-Free Roadmap Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      { label: "Time to Debt Free", value: `${results.monthsToPayoff} months`, subtitle: `${results.yearsToPayoff} Years`, colorTheme: "emerald" },
      { label: "Total Interest Paid", value: fmt(results.totalInterestPaid), subtitle: `Strategy: ${results.strategyUsed}`, colorTheme: "blue" },
      { label: "Debt Free Date", value: results.payoffDate, subtitle: "Target Completion Date", colorTheme: "purple" },
    ],
    sections: [
      {
        title: "Multi-Debt Elimination Summary",
        items: [
          { label: "Initial Total Balance", value: fmt(results.initialTotalBalance), highlight: true },
          { label: "Initial Total Minimum Payment", value: fmt(results.initialTotalMinPayment) },
          { label: "Strategy Used", value: results.strategyUsed },
          { label: "Payment Rollover Enabled?", value: reallocateFreedCash ? "Yes (Snowballing)" : "No" },
          { label: "Total Interest Paid", value: fmt(results.totalInterestPaid), highlight: true },
          { label: "Total Amount Paid", value: fmt(results.totalAmountPaid), highlight: true },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top Quick Debt Preset Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 gap-1 text-xs">
            <Sparkles className="h-3 w-3" /> Multi-Debt Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Add Presets:</span>
          <Button type="button" size="sm" variant="outline" onClick={() => addPresetDebt("Personal Loan", 10000, 250, 9.9)} className="h-6 text-[10px] px-2">
            + Personal Loan
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => addPresetDebt("Store Card", 1500, 45, 24.9)} className="h-6 text-[10px] px-2">
            + Store Card
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => addPresetDebt("Student Loan", 18000, 200, 5.5)} className="h-6 text-[10px] px-2">
            + Student Loan
          </Button>
        </div>

        {/* Strategy Switcher Pills */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg text-xs font-bold">
          <button
            type="button"
            onClick={() => setStrategy("avalanche")}
            className={`px-3 py-1 rounded transition-all cursor-pointer ${
              strategy === "avalanche" ? "bg-blue-600 text-white shadow-sm" : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            Avalanche (High APR)
          </button>
          <button
            type="button"
            onClick={() => setStrategy("snowball")}
            className={`px-3 py-1 rounded transition-all cursor-pointer ${
              strategy === "snowball" ? "bg-blue-600 text-white shadow-sm" : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            Snowball (Low Bal)
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("solver")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "solver"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <TrendingDown className="h-4 w-4" /> Payoff Solver
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("strategies")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "strategies"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <BarChart3 className="h-4 w-4 text-amber-500" /> Avalanche vs. Snowball
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("rollover")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "rollover"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Zap className="h-4 w-4 text-emerald-500" /> Snowball Rollover Impact
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("consolidation")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "consolidation"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Landmark className="h-4 w-4 text-indigo-500" /> Consolidation Evaluator
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
          <FileSpreadsheet className="h-4 w-4 text-purple-500" /> Combined Schedule
        </button>
      </div>

      {/* TAB 1: MULTI-DEBT PAYOFF SOLVER */}
      {activeTab === "solver" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Debt Entries & Extra Payments (6 Cols) */}
          <div className="lg:col-span-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Your Debts ({debts.length} Accounts)
              </h3>
              <Button type="button" size="sm" onClick={addDebtRow} className="h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Debt Row
              </Button>
            </div>

            {/* Dynamic Debts Table */}
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-1.5 text-[10px] font-bold text-zinc-500 uppercase px-1">
                <span className="col-span-4">Debt Name</span>
                <span className="col-span-3">Balance ($)</span>
                <span className="col-span-2">Min Pmt ($)</span>
                <span className="col-span-2">APR %</span>
                <span className="col-span-1 text-center"></span>
              </div>

              {debts.map((d) => (
                <div key={d.id} className="grid grid-cols-12 gap-1.5 items-center bg-zinc-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-zinc-200/60 dark:border-zinc-700">
                  <Input
                    type="text"
                    value={d.name}
                    onChange={(e) => updateDebtRow(d.id, "name", e.target.value)}
                    className="col-span-4 h-8 text-xs font-medium px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800"
                  />
                  <Input
                    type="number"
                    min="0"
                    value={d.balance || ""}
                    onChange={(e) => updateDebtRow(d.id, "balance", Number(e.target.value))}
                    className="col-span-3 h-8 text-xs font-sans tabular-nums px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <Input
                    type="number"
                    min="0"
                    value={d.minPayment || ""}
                    onChange={(e) => updateDebtRow(d.id, "minPayment", Number(e.target.value))}
                    className="col-span-2 h-8 text-xs font-sans tabular-nums px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={d.apr || ""}
                    onChange={(e) => updateDebtRow(d.id, "apr", Number(e.target.value))}
                    className="col-span-2 h-8 text-xs font-sans tabular-nums px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="col-span-1 flex justify-center">
                    {debts.length > 1 && (
                      <button type="button" onClick={() => removeDebtRow(d.id)} className="text-red-500 hover:text-red-700 p-1 cursor-pointer transition-colors" title="Delete Debt">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Strategy Selection Section */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Payoff Strategy Method</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setStrategy("avalanche")}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    strategy === "avalanche"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <TrendingDown className="h-3.5 w-3.5 text-blue-600" />
                    <span>Debt Avalanche</span>
                  </div>
                  <div className="text-[10px] opacity-75 font-normal">Highest APR First (Minimizes Interest)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setStrategy("snowball")}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    strategy === "snowball"
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-bold"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <Zap className="h-3.5 w-3.5 text-purple-600" />
                    <span>Debt Snowball</span>
                  </div>
                  <div className="text-[10px] opacity-75 font-normal">Lowest Balance First (Fastest Wins)</div>
                </button>
              </div>
            </div>

            {/* Extra Payments Controls */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
              <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Extra Payment Contributions</h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-600 dark:text-zinc-400">Extra Per Month ($)</label>
                  <Input
                    type="number"
                    min="0"
                    value={extraMonthlyInput}
                    onChange={(e) => setExtraMonthlyInput(e.target.value)}
                    className="text-xs font-sans tabular-nums"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-600 dark:text-zinc-400">Extra Per Year ($)</label>
                  <Input
                    type="number"
                    min="0"
                    value={extraAnnualInput}
                    onChange={(e) => setExtraAnnualInput(e.target.value)}
                    className="text-xs font-sans tabular-nums"
                  />
                </div>
              </div>

              {/* Snowball Rollover Toggle */}
              <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs">
                <div>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Fixed Monthly Payment (Snowballing)?</span>
                  <span className="text-[10px] text-zinc-500">Reallocate freed cash from paid-off debts to remaining debts.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setReallocateFreedCash(!reallocateFreedCash)}
                  className={`px-3 py-1 rounded text-xs font-bold cursor-pointer transition-all ${
                    reallocateFreedCash ? "bg-blue-600 text-white" : "bg-zinc-300 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {reallocateFreedCash ? "Yes (Rollover)" : "No"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Results Dashboard (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Warning Alert if Debt Trap */}
            {results.warningMessage && (
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 p-4 rounded-xl flex items-start gap-3 text-xs">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-sm mb-0.5">Payoff Warning</span>
                  {results.warningMessage}
                </div>
              </div>
            )}

            {/* Main Result Card */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 shadow-md text-white relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  TIME TO TOTAL DEBT FREEDOM
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
                {results.monthsToPayoff} Months <span className="text-xl font-normal text-zinc-300">({results.yearsToPayoff} Yrs)</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 font-medium mb-3">
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-emerald-400" /> Debt Free: <span className="font-bold text-emerald-300">{results.payoffDate}</span></span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-blue-300">
                  ⚡ {strategy === "avalanche" ? "Debt Avalanche" : "Debt Snowball"} Active
                </span>
              </div>

              {/* Active Strategy Insight Callout */}
              <div className="bg-white/10 p-3 rounded-xl text-xs space-y-1 backdrop-blur-sm border border-white/10">
                <div className="flex justify-between font-bold">
                  <span className="text-blue-300">🎯 First Account Paid Off:</span>
                  <span className="text-emerald-300">{results.firstDebtEliminatedName} (Month {results.firstDebtEliminatedMonth})</span>
                </div>
                <div className="text-[11px] text-zinc-300">
                  {strategy === "avalanche"
                    ? "Avalanche prioritizes your highest interest rate accounts first to maximize money saved."
                    : "Snowball prioritizes your smallest balance accounts first for rapid psychological wins."}
                </div>
              </div>

              {/* Secondary Grid */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">Initial Total Debt</div>
                  <div className="font-bold font-sans tabular-nums text-white text-sm">{fmt(results.initialTotalBalance)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Total Interest Paid</div>
                  <div className="font-bold font-sans tabular-nums text-red-300 text-sm">{fmt(results.totalInterestPaid)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Total Amount Paid</div>
                  <div className="font-bold font-sans tabular-nums text-emerald-300 text-sm">{fmt(results.totalAmountPaid)}</div>
                </div>
              </div>
            </div>

            {/* Area Chart: Balance Decay over time */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span>Multi-Debt Balance Elimination Area Chart</span>
                <span className="text-[10px] text-zinc-400">Recharts Trendline</span>
              </h4>

              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v: number) => `$${v}`} />
                    <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, "Remaining Debt"]} />
                    <Area type="monotone" dataKey="totalBalance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AVALANCHE VS. SNOWBALL STRATEGY COMPARISON */}
      {activeTab === "strategies" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Debt Avalanche vs. Debt Snowball Side-by-Side Strategy Comparison
              </h3>
              <p className="text-xs text-zinc-500">
                Compare mathematical interest minimization (Avalanche) against psychological win momentum (Snowball).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans tabular-nums text-xs">
            {/* Avalanche Card */}
            <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between font-sans">
                <span className="font-bold text-sm text-blue-900 dark:text-blue-200">Debt Avalanche (Highest APR First)</span>
                <Badge className="bg-blue-600 text-white text-[10px]">Math Preferred</Badge>
              </div>
              <div className="space-y-1">
                <div>Months to Debt Free: <span className="font-bold text-blue-700 dark:text-blue-300">{avalancheRes.monthsToPayoff} mos ({avalancheRes.yearsToPayoff} yrs)</span></div>
                <div>Total Interest Paid: <span className="font-bold text-red-500">{fmt(avalancheRes.totalInterestPaid)}</span></div>
                <div>Total Cost: <span className="font-bold">{fmt(avalancheRes.totalAmountPaid)}</span></div>
                <div>Debt Free Date: <span className="font-bold text-emerald-600">{avalancheRes.payoffDate}</span></div>
              </div>
            </div>

            {/* Snowball Card */}
            <div className="bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between font-sans">
                <span className="font-bold text-sm text-purple-900 dark:text-purple-200">Debt Snowball (Lowest Balance First)</span>
                <Badge className="bg-purple-600 text-white text-[10px]">Psychology Preferred</Badge>
              </div>
              <div className="space-y-1">
                <div>Months to Debt Free: <span className="font-bold text-purple-700 dark:text-purple-300">{snowballRes.monthsToPayoff} mos ({snowballRes.yearsToPayoff} yrs)</span></div>
                <div>Total Interest Paid: <span className="font-bold text-red-500">{fmt(snowballRes.totalInterestPaid)}</span></div>
                <div>Total Cost: <span className="font-bold">{fmt(snowballRes.totalAmountPaid)}</span></div>
                <div>Debt Free Date: <span className="font-bold text-emerald-600">{snowballRes.payoffDate}</span></div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-xl text-xs flex justify-between items-center font-sans tabular-nums">
            <span>Interest Savings of Avalanche over Snowball:</span>
            <span className="font-extrabold text-amber-700 dark:text-amber-300 text-base">
              {fmt(Math.max(0, snowballRes.totalInterestPaid - avalancheRes.totalInterestPaid))}
            </span>
          </div>
        </div>
      )}

      {/* TAB 3: SNOWBALL ROLLOVER IMPACT SIMULATOR */}
      {activeTab === "rollover" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Snowball Payment Rollover Reallocation Impact
              </h3>
              <p className="text-xs text-zinc-500">
                Visualize the power of keeping your monthly payment budget constant vs letting payments shrink as debts are eliminated.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans tabular-nums text-xs">
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-2">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 text-sm block">Rollover OFF (Payments Shrink)</span>
              <div>Months to Payoff: <span className="font-bold">{rolloverOffRes.monthsToPayoff} mos</span></div>
              <div>Total Interest Paid: <span className="font-bold text-red-500">{fmt(rolloverOffRes.totalInterestPaid)}</span></div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <span className="font-sans font-bold text-emerald-900 dark:text-emerald-200 text-sm block">Rollover ON (Fixed Monthly Budget)</span>
              <div>Months to Payoff: <span className="font-bold text-emerald-600">{results.monthsToPayoff} mos</span></div>
              <div>Total Interest Paid: <span className="font-bold text-emerald-600">{fmt(results.totalInterestPaid)}</span></div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-xl text-xs flex justify-between items-center font-sans tabular-nums shadow-sm">
            <div>
              <span className="text-emerald-100 block text-[10px] uppercase font-semibold">Time Saved with Rollover</span>
              <span className="text-base font-extrabold">{rolloverOffRes.monthsToPayoff - results.monthsToPayoff} Months Faster!</span>
            </div>
            <div className="text-right">
              <span className="text-emerald-100 block text-[10px] uppercase font-semibold">Interest Saved</span>
              <span className="text-xl font-extrabold">{fmt(rolloverOffRes.totalInterestPaid - results.totalInterestPaid)}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DEBT CONSOLIDATION LOAN EVALUATOR */}
      {activeTab === "consolidation" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Single Debt Consolidation Loan Evaluator
              </h3>
              <p className="text-xs text-zinc-500">
                Compare combining your debts into a single fixed-rate consolidation loan against your current multi-debt schedule.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Consolidation Loan APR (%)</label>
              <Input type="number" min="0" step="0.25" value={consolidationAprInput} onChange={(e) => setConsolidationAprInput(e.target.value)} className="text-xs font-sans tabular-nums" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Consolidation Term (Months)</label>
              <Input type="number" min="1" max="120" value={consolidationTermInput} onChange={(e) => setConsolidationTermInput(e.target.value)} className="text-xs font-sans tabular-nums" />
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 p-5 rounded-xl space-y-3 font-sans tabular-nums text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Total Debt Balance Consolidated:</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{fmt(results.initialTotalBalance)}</span>
            </div>
            <div className="flex justify-between text-blue-600 dark:text-blue-400">
              <span>New Single Monthly Payment:</span>
              <span className="font-bold">{fmt(consolidationRes.newMonthlyPayment)}</span>
            </div>
            <div className="flex justify-between text-purple-600 dark:text-purple-400">
              <span>Consolidation Loan Total Interest:</span>
              <span className="font-bold">{fmt(consolidationRes.newTotalInterest)}</span>
            </div>
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400 border-t border-indigo-200 dark:border-indigo-800 pt-2 font-bold text-sm">
              <span>Net Interest Savings:</span>
              <span>{fmt(consolidationRes.interestSaved)}</span>
            </div>
            <p className="font-sans text-xs text-indigo-900 dark:text-indigo-200 pt-2 border-t border-indigo-200/50">
              💡 <strong>Recommendation:</strong> {consolidationRes.recommendation}
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: COMBINED AMORTIZATION SCHEDULE */}
      {activeTab === "schedule" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Multi-Debt Combined Amortization Schedule
            </h3>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search month #..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="pl-8 pr-3 py-1 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <Button type="button" size="sm" variant="outline" onClick={exportCSV} className="h-7 text-xs cursor-pointer">
                <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-2.5">Month #</th>
                  <th className="p-2.5 text-right">Starting Total Bal</th>
                  <th className="p-2.5 text-right">Total Monthly Pmt</th>
                  <th className="p-2.5 text-right">Interest Paid</th>
                  <th className="p-2.5 text-right">Principal Paid</th>
                  <th className="p-2.5 text-right">Ending Total Bal</th>
                  <th className="p-2.5 text-center">Debts Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px] font-sans tabular-nums">
                {paginatedSchedule.map((row) => (
                  <tr key={row.month} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2.5 font-bold text-zinc-800 dark:text-zinc-200">
                      Month {row.month}
                      {row.debtsEliminated.length > 0 && (
                        <span className="block text-[10px] text-emerald-600 font-normal">
                          🎉 Paid Off: {row.debtsEliminated.join(", ")}
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 text-right">{fmt(row.totalStartingBalance)}</td>
                    <td className="p-2.5 text-right text-blue-600 font-bold">{fmt(row.totalMonthlyPayment)}</td>
                    <td className="p-2.5 text-right text-red-500">{fmt(row.totalInterestPaid)}</td>
                    <td className="p-2.5 text-right text-emerald-600">{fmt(row.totalPrincipalPaid)}</td>
                    <td className="p-2.5 text-right font-bold text-zinc-900 dark:text-zinc-100">{fmt(row.totalEndingBalance)}</td>
                    <td className="p-2.5 text-center font-bold text-zinc-500">{row.debtsRemaining}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-zinc-500">
                Page {currentPage} of {totalPages} ({filteredSchedule.length} total months)
              </span>
              <div className="flex gap-1">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="h-7 text-xs"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="h-7 text-xs"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 20 FAQs */}
      <DebtPayoffContent />
    </div>
  );
}
