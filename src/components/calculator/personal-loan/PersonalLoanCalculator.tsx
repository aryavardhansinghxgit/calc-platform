"use client";

import React, { useState, useMemo } from "react";
import {
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
  TrendingUp,
  PieChart as PieIcon,
  Sliders,
  Target,
  Layers,
  Building,
  CreditCard,
  Table,
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import { PersonalLoanContent } from "./PersonalLoanContent";
import {
  calculatePersonalLoan,
  calculateDebtConsolidation,
  calculateExtraPayments,
} from "@/lib/calculator-engine/formulas/personal-loan";

export function PersonalLoanCalculator() {
  // Navigation Tabs: 'standard' | 'schedule' | 'consolidation' | 'extra' | 'charts'
  const [activeTab, setActiveTab] = useState<
    "standard" | "schedule" | "consolidation" | "extra" | "charts"
  >("standard");

  // Schedule View State: 'annual' | 'monthly'
  const [scheduleView, setScheduleView] = useState<"annual" | "monthly">("annual");

  // Tab 1 Inputs: Standard Personal Loan ($20,000 @ 10% for 5 years)
  const [loanAmountInput, setLoanAmountInput] = useState<string>("20000");
  const [interestRateInput, setInterestRateInput] = useState<string>("10.0");
  const [loanTermYearsInput, setLoanTermYearsInput] = useState<string>("5");
  const [loanTermMonthsInput, setLoanTermMonthsInput] = useState<string>("0");
  const [startDateInput, setStartDateInput] = useState<string>("2026-08");

  // Fee & Insurance Options Toggle
  const [includeFees, setIncludeFees] = useState<boolean>(false);
  const [originationFeeInput, setOriginationFeeInput] = useState<string>("3.0");
  const [upfrontFeeInput, setUpfrontFeeInput] = useState<string>("0");
  const [monthlyFeeInput, setMonthlyFeeInput] = useState<string>("0");

  // Tab 3 Inputs: Debt Consolidation ($8k @ 19.99% + $7k @ 24.99%)
  const [cardABalance, setCardABalance] = useState<string>("8000");
  const [cardARate, setCardARate] = useState<string>("19.99");
  const [cardAPmt, setCardAPmt] = useState<string>("240");

  const [cardBBalance, setCardBBalance] = useState<string>("7000");
  const [cardBRate, setCardBRate] = useState<string>("24.99");
  const [cardBPmt, setCardBPmt] = useState<string>("225");

  const [consRateInput, setConsRateInput] = useState<string>("12.0");
  const [consTermInput, setConsTermInput] = useState<string>("5");
  const [consOrigFeeInput, setConsOrigFeeInput] = useState<string>("5.0");

  // Tab 4 Inputs: Extra Monthly Payment
  const [extraPmtInput, setExtraPmtInput] = useState<string>("100");

  // Modal & Notification State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Compute Standard Results
  const loanResults = useMemo(() => {
    return calculatePersonalLoan({
      loanAmount: Number(loanAmountInput) || 20000,
      interestRate: Number(interestRateInput) || 10.0,
      loanTermYears: Number(loanTermYearsInput) || 5,
      loanTermMonths: Number(loanTermMonthsInput) || 0,
      startDate: startDateInput,
      includeFees,
      originationFeePercent: Number(originationFeeInput) || 0,
      upfrontFeeDollar: Number(upfrontFeeInput) || 0,
      monthlyFeeDollar: Number(monthlyFeeInput) || 0,
    });
  }, [
    loanAmountInput,
    interestRateInput,
    loanTermYearsInput,
    loanTermMonthsInput,
    startDateInput,
    includeFees,
    originationFeeInput,
    upfrontFeeInput,
    monthlyFeeInput,
  ]);

  // Compute Debt Consolidation
  const consResults = useMemo(() => {
    return calculateDebtConsolidation({
      debts: [
        { name: "Card A", balance: Number(cardABalance) || 8000, interestRate: Number(cardARate) || 19.99, currentMonthlyPayment: Number(cardAPmt) || 240 },
        { name: "Card B", balance: Number(cardBBalance) || 7000, interestRate: Number(cardBRate) || 24.99, currentMonthlyPayment: Number(cardBPmt) || 225 },
      ],
      newLoanInterestRate: Number(consRateInput) || 12.0,
      newLoanTermYears: Number(consTermInput) || 5,
      originationFeePercent: Number(consOrigFeeInput) || 5.0,
    });
  }, [cardABalance, cardARate, cardAPmt, cardBBalance, cardBRate, cardBPmt, consRateInput, consTermInput, consOrigFeeInput]);

  // Compute Extra Payments
  const extraResults = useMemo(() => {
    return calculateExtraPayments({
      loanAmount: Number(loanAmountInput) || 20000,
      interestRate: Number(interestRateInput) || 10.0,
      loanTermYears: Number(loanTermYearsInput) || 5,
      extraMonthlyPayment: Number(extraPmtInput) || 100,
    });
  }, [loanAmountInput, interestRateInput, loanTermYearsInput, extraPmtInput]);

  const fmt = (val: number) =>
    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Quick Presets
  const applyPreset = (amt: number, rate: number, yrs: number) => {
    setLoanAmountInput(amt.toString());
    setInterestRateInput(rate.toString());
    setLoanTermYearsInput(yrs.toString());
    setLoanTermMonthsInput("0");
    setIncludeFees(false);
  };

  // Export Amortization CSV
  const exportCsv = () => {
    const headers = ["Period", "Date", "Payment", "Principal", "Interest", "Ending Balance"];
    const rows = loanResults.monthlySchedule.map((r) => [
      r.period,
      r.dateStr,
      r.payment,
      r.principal,
      r.interest,
      r.endingBalance,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `personal_loan_amortization_${loanAmountInput}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Personal Loan Calculation Summary:
------------------------------------------------
Loan Amount: ${fmt(Number(loanAmountInput))}
Interest Rate: ${interestRateInput}% APR
Loan Term: ${loanTermYearsInput} Years
------------------------------------------------
Monthly Payment: ${fmt(loanResults.monthlyPayment)}
Total Payments: ${fmt(loanResults.totalPayments)}
Total Interest: ${fmt(loanResults.totalInterestPaid)}
Payoff Date: ${loanResults.payoffDateStr}`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Donut Data
  const donutData = [
    { name: "Loan Amount", value: Number(loanAmountInput) || 20000, color: "#3b82f6" },
    { name: "Total Interest", value: loanResults.totalInterestPaid, color: "#10b981" },
  ];

  // Report Modal Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Personal Loan & Amortization Calculator",
      reportTitle: "Personal Loan & Amortization Analysis Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: "Monthly Payment",
        value: fmt(loanResults.monthlyPayment),
        subtitle: `APR: ${interestRateInput}% | Term: ${loanTermYearsInput} Yrs`,
        colorTheme: "emerald",
      },
      {
        label: "Total Interest Paid",
        value: fmt(loanResults.totalInterestPaid),
        subtitle: `Total Payments: ${fmt(loanResults.totalPayments)}`,
        colorTheme: "blue",
      },
    ],
    sections: [
      {
        title: "Loan Parameters & Financial Summary",
        items: [
          { label: "Loan Principal", value: fmt(Number(loanAmountInput)) },
          { label: "Interest Rate (APR)", value: `${interestRateInput}%` },
          { label: "Loan Term", value: `${loanTermYearsInput} Years` },
          { label: "Monthly Payment", value: fmt(loanResults.monthlyPayment), highlight: true },
          { label: "Total Interest Paid", value: fmt(loanResults.totalInterestPaid), highlight: true },
          { label: "Total Loan Cost", value: fmt(loanResults.totalPayments) },
          { label: "Projected Payoff Date", value: loanResults.payoffDateStr },
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
            <DollarSign className="h-3.5 w-3.5" /> Personal Loan Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(20000, 10.0, 5)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            Calculator.net Baseline ($20k @ 10% 5Y)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(15000, 12.0, 3)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            $15k @ 12% 3Y
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(35000, 8.5, 5)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            $35k @ 8.5% 5Y
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Monthly Payment:</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-sans tabular-nums text-sm">
            {fmt(loanResults.monthlyPayment)}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("standard")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "standard"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <DollarSign className="h-4 w-4 text-emerald-500" /> 1. Standard Personal Loan
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
          <Table className="h-4 w-4 text-purple-500" /> 2. Amortization Schedule
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("consolidation")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "consolidation"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <CreditCard className="h-4 w-4 text-amber-500" /> 3. Debt Consolidation
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("extra")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "extra"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <TrendingUp className="h-4 w-4 text-indigo-500" /> 4. Early Payoff Simulator
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
          <BarChart3 className="h-4 w-4 text-blue-500" /> Visual Dashboards
        </button>
      </div>

      {/* TAB 1: STANDARD PERSONAL LOAN (Calculator.net Baseline) */}
      {activeTab === "standard" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Personal Loan Inputs
              </h3>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Loan Amount ($)</label>
                  <Input
                    type="number"
                    value={loanAmountInput}
                    onChange={(e) => setLoanAmountInput(e.target.value)}
                    placeholder="e.g. 20000"
                    className="text-xs font-sans tabular-nums h-9 px-3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Interest Rate (% APR)</label>
                    <Input
                      type="number"
                      value={interestRateInput}
                      onChange={(e) => setInterestRateInput(e.target.value)}
                      placeholder="e.g. 10.0"
                      className="text-xs font-sans tabular-nums h-9 px-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Start Date</label>
                    <Input
                      type="month"
                      value={startDateInput}
                      onChange={(e) => setStartDateInput(e.target.value)}
                      className="text-xs font-sans tabular-nums h-9 px-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Term (Years)</label>
                    <Input
                      type="number"
                      value={loanTermYearsInput}
                      onChange={(e) => setLoanTermYearsInput(e.target.value)}
                      className="text-xs font-sans tabular-nums h-9 px-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Term (Months)</label>
                    <Input
                      type="number"
                      value={loanTermMonthsInput}
                      onChange={(e) => setLoanTermMonthsInput(e.target.value)}
                      className="text-xs font-sans tabular-nums h-9 px-3"
                    />
                  </div>
                </div>

                {/* Include Fees Checkbox */}
                <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold">
                    <input
                      type="checkbox"
                      checked={includeFees}
                      onChange={(e) => setIncludeFees(e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span>Include Fee and Insurance Options</span>
                  </label>

                  {includeFees && (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                      <div>
                        <label className="text-[10px] text-zinc-500">Origination Fee (%)</label>
                        <Input
                          type="number"
                          value={originationFeeInput}
                          onChange={(e) => setOriginationFeeInput(e.target.value)}
                          className="h-7 text-[11px] font-sans tabular-nums px-2"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500">Monthly Fee ($)</label>
                        <Input
                          type="number"
                          value={monthlyFeeInput}
                          onChange={(e) => setMonthlyFeeInput(e.target.value)}
                          className="h-7 text-[11px] font-sans tabular-nums px-2"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  MONTHLY PAYMENT
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

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400 font-sans tabular-nums mb-2">
                {fmt(loanResults.monthlyPayment)}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-white/90 font-medium pt-2 border-t border-white/10">
                <div>
                  Total 60 Payments: <span className="font-bold text-indigo-200 block">{fmt(loanResults.totalPayments)}</span>
                </div>
                <div>
                  Total Interest: <span className="font-bold text-emerald-300 block">{fmt(loanResults.totalInterestPaid)}</span>
                </div>
                <div>
                  Payoff Date: <span className="font-bold text-amber-200 block">{loanResults.payoffDateStr}</span>
                </div>
                <div>
                  Effective APR: <span className="font-bold text-blue-200 block">{loanResults.effectiveApr}%</span>
                </div>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Loan Cost Breakdown
              </h4>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={donutData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                      {donutData.map((entry, index) => (
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

      {/* TAB 2: AMORTIZATION SCHEDULE */}
      {activeTab === "schedule" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Table className="h-5 w-5 text-purple-600" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Amortization Schedule Table</h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setScheduleView("annual")}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    scheduleView === "annual" ? "bg-white dark:bg-zinc-900 text-indigo-600 shadow-xs" : "text-zinc-500"
                  }`}
                >
                  Annual Schedule
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleView("monthly")}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    scheduleView === "monthly" ? "bg-white dark:bg-zinc-900 text-indigo-600 shadow-xs" : "text-zinc-500"
                  }`}
                >
                  Monthly Schedule
                </button>
              </div>
              <Button type="button" size="sm" variant="outline" onClick={exportCsv} className="h-7 text-xs cursor-pointer">
                <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left text-xs font-sans tabular-nums">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60 sticky top-0 font-sans font-bold text-zinc-700 dark:text-zinc-300">
                <tr>
                  <th className="p-2.5">{scheduleView === "annual" ? "Year" : "#"}</th>
                  <th className="p-2.5">Date</th>
                  <th className="p-2.5">Interest</th>
                  <th className="p-2.5">Principal</th>
                  <th className="p-2.5">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {scheduleView === "annual"
                  ? loanResults.annualSchedule.map((row) => (
                      <tr key={row.year} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40">
                        <td className="p-2.5 font-bold">{row.year}</td>
                        <td className="p-2.5">{row.dateStr}</td>
                        <td className="p-2.5 text-rose-600 font-semibold">{fmt(row.interest)}</td>
                        <td className="p-2.5 text-emerald-600 font-semibold">{fmt(row.principal)}</td>
                        <td className="p-2.5 font-bold">{fmt(row.endingBalance)}</td>
                      </tr>
                    ))
                  : loanResults.monthlySchedule.map((row) => (
                      <tr key={row.period} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40">
                        <td className="p-2.5 font-bold">{row.period}</td>
                        <td className="p-2.5">{row.dateStr}</td>
                        <td className="p-2.5 text-rose-600 font-semibold">{fmt(row.interest)}</td>
                        <td className="p-2.5 text-emerald-600 font-semibold">{fmt(row.principal)}</td>
                        <td className="p-2.5 font-bold">{fmt(row.endingBalance)}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DEBT CONSOLIDATION */}
      {activeTab === "consolidation" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Debt Consolidation vs Credit Cards Analyzer
            </h3>

            <div className="space-y-3 text-xs">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Existing Credit Cards (PDF Page 2 Baseline):</span>
              <div className="grid grid-cols-3 gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-lg border">
                <div>
                  <label className="text-[10px] text-zinc-500">Card A Balance ($)</label>
                  <Input type="number" value={cardABalance} onChange={(e) => setCardABalance(e.target.value)} className="h-7 text-xs font-sans tabular-nums px-2" />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500">Card A APR (%)</label>
                  <Input type="number" value={cardARate} onChange={(e) => setCardARate(e.target.value)} className="h-7 text-xs font-sans tabular-nums px-2" />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500">Monthly ($)</label>
                  <Input type="number" value={cardAPmt} onChange={(e) => setCardAPmt(e.target.value)} className="h-7 text-xs font-sans tabular-nums px-2" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-lg border">
                <div>
                  <label className="text-[10px] text-zinc-500">Card B Balance ($)</label>
                  <Input type="number" value={cardBBalance} onChange={(e) => setCardBBalance(e.target.value)} className="h-7 text-xs font-sans tabular-nums px-2" />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500">Card B APR (%)</label>
                  <Input type="number" value={cardBRate} onChange={(e) => setCardBRate(e.target.value)} className="h-7 text-xs font-sans tabular-nums px-2" />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500">Monthly ($)</label>
                  <Input type="number" value={cardBPmt} onChange={(e) => setCardBPmt(e.target.value)} className="h-7 text-xs font-sans tabular-nums px-2" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                <div>
                  <label className="font-semibold">New Loan Rate (%)</label>
                  <Input type="number" value={consRateInput} onChange={(e) => setConsRateInput(e.target.value)} className="h-8 text-xs font-sans tabular-nums px-2" />
                </div>
                <div>
                  <label className="font-semibold">Term (Yrs)</label>
                  <Input type="number" value={consTermInput} onChange={(e) => setConsTermInput(e.target.value)} className="h-8 text-xs font-sans tabular-nums px-2" />
                </div>
                <div>
                  <label className="font-semibold">Orig Fee (%)</label>
                  <Input type="number" value={consOrigFeeInput} onChange={(e) => setConsOrigFeeInput(e.target.value)} className="h-8 text-xs font-sans tabular-nums px-2" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-amber-900 dark:text-amber-200 text-sm block border-b pb-1">
                Consolidation Savings Breakdown
              </span>
              <div className="flex justify-between">
                <span>Total Cards Balance:</span>
                <span className="font-bold">{fmt(consResults.totalBalance)}</span>
              </div>
              <div className="flex justify-between text-indigo-600">
                <span>New Monthly Payment:</span>
                <span className="font-bold">{fmt(consResults.newMonthlyPayment)} (Saved {fmt(consResults.monthlySavings)}/mo)</span>
              </div>
              <div className="flex justify-between text-emerald-600 text-base border-t pt-1 font-extrabold">
                <span>Total Interest Saved:</span>
                <span>{fmt(consResults.totalInterestSavings)}</span>
              </div>
              <div className="flex justify-between font-sans text-zinc-600 dark:text-zinc-400">
                <span>Effective Consolidated APR:</span>
                <span className="font-bold font-sans tabular-nums text-blue-600">{consResults.effectiveApr}% (Match 14.284%)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EARLY PAYOFF SIMULATOR */}
      {activeTab === "extra" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Early Payoff &amp; Extra Monthly Payment Simulator
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Extra Monthly Principal Payment ($)</label>
                <Input
                  type="number"
                  value={extraPmtInput}
                  onChange={(e) => setExtraPmtInput(e.target.value)}
                  placeholder="e.g. 100"
                  className="text-xs font-sans tabular-nums h-9 px-3"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-indigo-900 dark:text-indigo-200 text-sm block border-b pb-1">
                Extra Payment Acceleration Results
              </span>
              <div className="flex justify-between text-emerald-600 text-base font-extrabold">
                <span>Total Interest Saved:</span>
                <span>{fmt(extraResults.interestSaved)}</span>
              </div>
              <div className="flex justify-between text-indigo-600 font-bold">
                <span>Time Saved:</span>
                <span>{extraResults.monthsSaved} Months ({ (extraResults.monthsSaved / 12).toFixed(1) } Years)</span>
              </div>
              <div className="flex justify-between">
                <span>New Payoff Duration:</span>
                <span>{extraResults.newTermMonths} Months (Down from {extraResults.originalTermMonths})</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: VISUAL DASHBOARDS */}
      {activeTab === "charts" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" /> Amortization Loan Balance Over Time
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={loanResults.annualSchedule}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}`} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                <Legend />
                <Line type="monotone" dataKey="endingBalance" name="Loan Balance ($)" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="interest" name="Annual Interest ($)" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 15 FAQs */}
      <PersonalLoanContent />
    </div>
  );
}
