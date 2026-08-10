"use client";

import React, { useState, useMemo } from "react";
import {
  CreditCard as CardIcon,
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
  TrendingDown,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
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
import { CreditCardContent } from "./CreditCardContent";
import {
  calculateCreditCardPayoff,
  calculateBalanceTransfer,
  compareDebtPayoffStrategies,
  CreditCardPayoffInput,
} from "@/lib/calculator-engine/formulas/credit-card";

export function CreditCardCalculator() {
  // Tabs: 'payoff' | 'extra' | 'transfer' | 'strategies' | 'schedule'
  const [activeTab, setActiveTab] = useState<"payoff" | "extra" | "transfer" | "strategies" | "schedule">("payoff");

  // Solver Inputs
  const [mode, setMode] = useState<"A" | "B" | "C">("A");
  const [balanceInput, setBalanceInput] = useState<string>("8000");
  const [aprInput, setAprInput] = useState<string>("18");
  const [monthlyPaymentInput, setMonthlyPaymentInput] = useState<string>("200");
  const [targetMonthsInput, setTargetMonthsInput] = useState<string>("24");
  const [minPaymentRule, setMinPaymentRule] = useState<"1_plus_interest" | "2_percent" | "3_percent" | "4_percent" | "5_percent">("2_percent");

  // Extra / Lump Sum Simulator Inputs
  const [extraMonthlyInput, setExtraMonthlyInput] = useState<string>("50");
  const [lumpSumInput, setLumpSumInput] = useState<string>("1000");

  // Balance Transfer Inputs
  const [transferAprInput, setTransferAprInput] = useState<string>("0");
  const [introPeriodInput, setIntroPeriodInput] = useState<string>("15");
  const [transferFeePctInput, setTransferFeePctInput] = useState<string>("3");

  // Table Search & Pagination
  const [tableSearch, setTableSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 12;

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // 1. Solve Primary Payoff
  const results = useMemo(() => {
    return calculateCreditCardPayoff({
      balance: Number(balanceInput) || 0,
      apr: Number(aprInput) || 0,
      monthlyPayment: Number(monthlyPaymentInput) || 0,
      targetMonths: Number(targetMonthsInput) || 24,
      minPaymentRule,
      mode,
    });
  }, [balanceInput, aprInput, monthlyPaymentInput, targetMonthsInput, minPaymentRule, mode]);

  // 2. Extra Payment Simulator Results
  const extraResults = useMemo(() => {
    return calculateCreditCardPayoff({
      balance: Number(balanceInput) || 0,
      apr: Number(aprInput) || 0,
      monthlyPayment: Number(monthlyPaymentInput) || 0,
      mode: "A",
      extraMonthlyPayment: Number(extraMonthlyInput) || 0,
      lumpSumPayment: Number(lumpSumInput) || 0,
    });
  }, [balanceInput, aprInput, monthlyPaymentInput, extraMonthlyInput, lumpSumInput]);

  // 3. Balance Transfer Results
  const transferResults = useMemo(() => {
    return calculateBalanceTransfer({
      currentBalance: Number(balanceInput) || 0,
      currentApr: Number(aprInput) || 0,
      monthlyPayment: Number(monthlyPaymentInput) || 200,
      transferApr: Number(transferAprInput) || 0,
      introPeriodMonths: Number(introPeriodInput) || 15,
      transferFeePct: Number(transferFeePctInput) || 3,
    });
  }, [balanceInput, aprInput, monthlyPaymentInput, transferAprInput, introPeriodInput, transferFeePctInput]);

  // 4. Strategy Comparison Results
  const strategyResults = useMemo(() => {
    return compareDebtPayoffStrategies(
      Number(balanceInput) || 0,
      Number(aprInput) || 0,
      Number(monthlyPaymentInput) || 200
    );
  }, [balanceInput, aprInput, monthlyPaymentInput]);

  const fmt = (val: number) => `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Filtered Schedule
  const filteredSchedule = useMemo(() => {
    if (!tableSearch.trim()) return results.schedule;
    return results.schedule.filter((r) => r.month.toString() === tableSearch.trim());
  }, [results.schedule, tableSearch]);

  const paginatedSchedule = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredSchedule.slice(start, start + rowsPerPage);
  }, [filteredSchedule, currentPage]);

  const totalPages = Math.ceil(filteredSchedule.length / rowsPerPage) || 1;

  // Reset Inputs
  const handleReset = () => {
    setMode("A");
    setBalanceInput("8000");
    setAprInput("18");
    setMonthlyPaymentInput("200");
    setTargetMonthsInput("24");
    setMinPaymentRule("2_percent");
    setExtraMonthlyInput("50");
    setLumpSumInput("1000");
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Credit Card Payoff Summary:
------------------------------------------------
Current Balance: ${fmt(Number(balanceInput) || 0)}
APR: ${aprInput}%
Monthly Payment: ${fmt(results.monthlyPayment)}
Months to Payoff: ${results.monthsToPayoff} months (${results.yearsToPayoff} yrs)
Total Interest Paid: ${fmt(results.totalInterestPaid)}
Total Amount Paid: ${fmt(results.totalAmountPaid)}
Estimated Payoff Date: ${results.payoffDate}`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Export CSV
  const exportCSV = () => {
    const headers = ["Month", "Starting Balance ($)", "Monthly Payment ($)", "Interest Paid ($)", "Principal Paid ($)", "Ending Balance ($)"];
    const rows = results.schedule.map((r) => [
      r.month,
      r.startingBalance,
      r.monthlyPayment,
      r.interestPaid,
      r.principalPaid,
      r.endingBalance,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `credit_card_payoff_schedule_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Donut Chart Data
  const pieData = [
    { name: "Original Balance (Principal)", value: Number(balanceInput) || 0, color: "#3b82f6" },
    { name: "Total Interest Paid", value: results.totalInterestPaid, color: "#ef4444" },
  ];

  // Line Chart Data (Balance Decay)
  const lineData = results.schedule
    .filter((_, idx) => idx % Math.max(1, Math.floor(results.schedule.length / 20)) === 0)
    .map((r) => ({
      month: `M${r.month}`,
      balance: r.endingBalance,
      interest: r.cumulativeInterest,
    }));

  // Report Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Credit Card Payoff Platform",
      reportTitle: "Credit Card Payoff & Debt Elimination Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      { label: "Payoff Time", value: `${results.monthsToPayoff} months`, subtitle: `${results.yearsToPayoff} Years`, colorTheme: "blue" },
      { label: "Total Interest Paid", value: fmt(results.totalInterestPaid), subtitle: `Effective Ratio: ${results.interestRatio}%`, colorTheme: "amber" },
      { label: "Estimated Payoff Date", value: results.payoffDate, subtitle: "Target Completion Date", colorTheme: "emerald" },
    ],
    sections: [
      {
        title: "Credit Card Payoff Computation Summary",
        items: [
          { label: "Current Balance", value: fmt(Number(balanceInput) || 0), highlight: true },
          { label: "Interest Rate (APR)", value: `${aprInput}%` },
          { label: "Monthly Payment Amount", value: fmt(results.monthlyPayment), highlight: true },
          { label: "Total Interest Paid", value: fmt(results.totalInterestPaid), highlight: true },
          { label: "Total Amount Paid", value: fmt(results.totalAmountPaid), highlight: true },
          { label: "Payoff Date", value: results.payoffDate },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top Quick Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 gap-1 text-xs">
            <Sparkles className="h-3 w-3" /> Advanced Payoff Solver
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick APR Presets:</span>
          {[
            { label: "Low (14%)", val: "14" },
            { label: "Avg (18%)", val: "18" },
            { label: "High (24%)", val: "24" },
            { label: "Max (29.9%)", val: "29.9" },
          ].map((p) => (
            <button
              key={p.val}
              type="button"
              onClick={() => setAprInput(p.val)}
              className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                aprInput === p.val ? "bg-blue-600 text-white shadow-sm" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("payoff")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "payoff"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <CardIcon className="h-4 w-4" /> Payoff Solver
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("extra")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "extra"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Zap className="h-4 w-4 text-emerald-500" /> Extra &amp; Lump Sum Simulator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("transfer")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "transfer"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <RefreshCw className="h-4 w-4 text-indigo-500" /> 0% Balance Transfer
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
          onClick={() => setActiveTab("schedule")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "schedule"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <FileSpreadsheet className="h-4 w-4 text-purple-500" /> Amortization Schedule
        </button>
      </div>

      {/* TAB 1: PAYOFF SOLVER */}
      {activeTab === "payoff" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Inputs (5 Cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Card Details &amp; Payment Objective
              </h3>
            </div>

            {/* Mode Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-500 uppercase">Calculation Mode:</label>
              <div className="grid grid-cols-3 gap-1 text-[10px] font-bold">
                {[
                  { id: "A", label: "Fixed Payment", desc: "Pay certain $ / mo" },
                  { id: "B", label: "Target Time", desc: "Payoff by target date" },
                  { id: "C", label: "Min Payment", desc: "Issuer minimum rule" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id as any)}
                    className={`py-1.5 rounded text-center transition-all cursor-pointer ${
                      mode === m.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Balance Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Credit Card Balance ($)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">$</span>
                <Input
                  type="number"
                  min="0"
                  step="500"
                  value={balanceInput}
                  onChange={(e) => setBalanceInput(e.target.value)}
                  className="pl-7 text-xs font-mono"
                />
              </div>
            </div>

            {/* APR Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Interest Rate (% APR)</label>
              <Input
                type="number"
                min="0"
                max="100"
                step="0.25"
                value={aprInput}
                onChange={(e) => setAprInput(e.target.value)}
                className="text-xs font-mono"
              />
            </div>

            {/* Mode Conditional Inputs */}
            {mode === "A" && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Monthly Payment Amount ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">$</span>
                  <Input
                    type="number"
                    min="1"
                    step="25"
                    value={monthlyPaymentInput}
                    onChange={(e) => setMonthlyPaymentInput(e.target.value)}
                    className="pl-7 text-xs font-mono"
                  />
                </div>
              </div>
            )}

            {mode === "B" && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Desired Payoff Time (Months)</label>
                <Input
                  type="number"
                  min="1"
                  max="360"
                  value={targetMonthsInput}
                  onChange={(e) => setTargetMonthsInput(e.target.value)}
                  className="text-xs font-mono"
                />
              </div>
            )}

            {mode === "C" && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Issuer Minimum Payment Rule</label>
                <select
                  value={minPaymentRule}
                  onChange={(e) => setMinPaymentRule(e.target.value as any)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md p-2 text-xs font-medium cursor-pointer"
                >
                  <option value="1_plus_interest">Interest + 1% of Balance (Standard)</option>
                  <option value="2_percent">2% of Balance (Min $25)</option>
                  <option value="3_percent">3% of Balance</option>
                  <option value="4_percent">4% of Balance</option>
                  <option value="5_percent">5% of Balance</option>
                </select>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                type="button"
                onClick={() => {
                  const el = document.getElementById("payoff-results-dashboard");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Calculate Payoff
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="text-xs font-medium border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" /> Clear
              </Button>
            </div>
          </div>

          {/* Right Results Dashboard (7 Cols) */}
          <div id="payoff-results-dashboard" className="lg:col-span-7 space-y-4">
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
                  TIME TO PAY OFF CREDIT CARD
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

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-white mb-2">
                {results.monthsToPayoff} Months <span className="text-xl font-normal text-zinc-300">({results.yearsToPayoff} Yrs)</span>
              </div>

              <div className="text-xs text-white/90 font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-400" /> Payoff Date: <span className="font-bold text-emerald-300">{results.payoffDate}</span>
              </div>

              {/* Secondary Grid */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">Monthly Payment</div>
                  <div className="font-bold font-mono text-white text-sm">{fmt(results.monthlyPayment)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Total Interest Paid</div>
                  <div className="font-bold font-mono text-red-300 text-sm">{fmt(results.totalInterestPaid)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Total Amount Paid</div>
                  <div className="font-bold font-mono text-emerald-300 text-sm">{fmt(results.totalAmountPaid)}</div>
                </div>
              </div>
            </div>

            {/* Line Chart: Balance Decay */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span>Credit Card Balance Decay Curve</span>
                <span className="text-[10px] text-zinc-400">Recharts Trendline</span>
              </h4>

              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v: number) => `$${v}`} />
                    <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, "Balance"]} />
                    <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXTRA & LUMP SUM SIMULATOR */}
      {activeTab === "extra" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Zap className="h-5 w-5 text-emerald-500" /> Extra Payment &amp; One-Time Lump Sum Simulator
              </h3>
              <p className="text-xs text-zinc-500">
                Simulate how adding extra monthly payments or paying a lump sum today accelerates debt payoff.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Additional Monthly Payment ($)</label>
              <Input type="number" min="0" value={extraMonthlyInput} onChange={(e) => setExtraMonthlyInput(e.target.value)} className="text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">One-Time Lump Sum Payment ($)</label>
              <Input type="number" min="0" value={lumpSumInput} onChange={(e) => setLumpSumInput(e.target.value)} className="text-xs font-mono" />
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-2">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 text-sm block">Standard Payoff Schedule</span>
              <div>Months to Payoff: <span className="font-bold">{results.monthsToPayoff} mos</span></div>
              <div>Total Interest: <span className="font-bold text-red-500">{fmt(results.totalInterestPaid)}</span></div>
              <div>Payoff Date: <span className="font-bold">{results.payoffDate}</span></div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <span className="font-sans font-bold text-emerald-900 dark:text-emerald-200 text-sm block">Accelerated Payoff Schedule</span>
              <div>Months to Payoff: <span className="font-bold text-emerald-600">{extraResults.monthsToPayoff} mos</span></div>
              <div>Total Interest: <span className="font-bold text-emerald-600">{fmt(extraResults.totalInterestPaid)}</span></div>
              <div>Payoff Date: <span className="font-bold text-emerald-600">{extraResults.payoffDate}</span></div>
            </div>
          </div>

          {/* Savings Highlight */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-xl text-xs flex justify-between items-center font-mono shadow-sm">
            <div>
              <span className="text-emerald-100 block text-[10px] uppercase font-semibold">Total Savings</span>
              <span className="text-sm">Time Saved: <strong>{results.monthsToPayoff - extraResults.monthsToPayoff} Months</strong></span>
            </div>
            <div className="text-right">
              <span className="text-emerald-100 block text-[10px] uppercase font-semibold">Interest Saved</span>
              <span className="text-xl font-extrabold">{fmt(results.totalInterestPaid - extraResults.totalInterestPaid)}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BALANCE TRANSFER ANALYZER */}
      {activeTab === "transfer" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-indigo-500" /> 0% Intro APR Balance Transfer Analyzer
              </h3>
              <p className="text-xs text-zinc-500">
                Evaluate moving debt to a 0% introductory APR card including transfer fee trade-offs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Introductory APR (%)</label>
              <Input type="number" min="0" value={transferAprInput} onChange={(e) => setTransferAprInput(e.target.value)} className="text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Intro Period (Months)</label>
              <Input type="number" min="1" value={introPeriodInput} onChange={(e) => setIntroPeriodInput(e.target.value)} className="text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Transfer Fee (%)</label>
              <Input type="number" min="0" step="0.5" value={transferFeePctInput} onChange={(e) => setTransferFeePctInput(e.target.value)} className="text-xs font-mono" />
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 p-5 rounded-xl space-y-3 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Upfront Balance Transfer Fee ({transferFeePctInput}%):</span>
              <span className="font-bold text-red-500">{fmt(transferResults.transferFeeAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Current Interest Paid:</span>
              <span className="font-bold">{fmt(transferResults.currentTotalInterest)}</span>
            </div>
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400 border-t border-indigo-200 dark:border-indigo-800 pt-2 font-bold text-sm">
              <span>Net Interest &amp; Fee Savings:</span>
              <span>{fmt(transferResults.netSavings)}</span>
            </div>
            <p className="font-sans text-xs text-indigo-900 dark:text-indigo-200 pt-2 border-t border-indigo-200/50">
              💡 <strong>Recommendation:</strong> {transferResults.recommendation}
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: DEBT PAYOFF STRATEGY COMPARISON */}
      {activeTab === "strategies" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-amber-500" /> Debt Avalanche vs. Debt Snowball Strategy Comparison
              </h3>
              <p className="text-xs text-zinc-500">
                Compare standard monthly payments against aggressive payoff strategies.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-2.5">Payoff Strategy</th>
                  <th className="p-2.5">Payoff Time</th>
                  <th className="p-2.5 text-right">Total Interest</th>
                  <th className="p-2.5 text-right">Total Amount Paid</th>
                  <th className="p-2.5 text-right font-bold text-emerald-600">Interest Saved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px] font-mono">
                {strategyResults.map((st, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2.5 font-sans font-bold text-zinc-800 dark:text-zinc-200">{st.strategyName}</td>
                    <td className="p-2.5 font-sans">{st.monthsToPayoff} Months</td>
                    <td className="p-2.5 text-right text-red-500">{fmt(st.totalInterestPaid)}</td>
                    <td className="p-2.5 text-right font-bold">{fmt(st.totalAmountPaid)}</td>
                    <td className="p-2.5 text-right text-emerald-600 font-bold">{fmt(st.interestSavedVsStandard)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: AMORTIZATION SCHEDULE TABLE */}
      {activeTab === "schedule" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-purple-500" /> Monthly Credit Card Amortization Schedule
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
                  <th className="p-2.5 text-right">Starting Balance</th>
                  <th className="p-2.5 text-right">Monthly Payment</th>
                  <th className="p-2.5 text-right">Interest Paid</th>
                  <th className="p-2.5 text-right">Principal Paid</th>
                  <th className="p-2.5 text-right">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px] font-mono">
                {paginatedSchedule.map((row) => (
                  <tr key={row.month} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2.5 font-bold text-zinc-800 dark:text-zinc-200">Month {row.month}</td>
                    <td className="p-2.5 text-right">{fmt(row.startingBalance)}</td>
                    <td className="p-2.5 text-right text-blue-600 font-bold">{fmt(row.monthlyPayment)}</td>
                    <td className="p-2.5 text-right text-red-500">{fmt(row.interestPaid)}</td>
                    <td className="p-2.5 text-right text-emerald-600">{fmt(row.principalPaid)}</td>
                    <td className="p-2.5 text-right font-bold text-zinc-900 dark:text-zinc-100">{fmt(row.endingBalance)}</td>
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
      <CreditCardContent />
    </div>
  );
}
