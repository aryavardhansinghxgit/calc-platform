"use client";

import React, { useState, useMemo } from "react";
import {
  GraduationCap,
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
  Table,
  BookOpen,
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
import { StudentLoanContent } from "./StudentLoanContent";
import {
  calculateSimpleStudentLoan,
  calculateStudentLoanRepayment,
  calculateStudentLoanProjection,
} from "@/lib/calculator-engine/formulas/student-loan";

export function StudentLoanCalculator() {
  // Navigation Tabs: 'simple' | 'repayment' | 'projection' | 'plans' | 'charts'
  const [activeTab, setActiveTab] = useState<
    "simple" | "repayment" | "projection" | "plans" | "charts"
  >("simple");

  // Tab 1 Inputs: Section A Simple Solver ($30,000 @ 6.8% 10 yrs)
  const [simpleBalInput, setSimpleBalInput] = useState<string>("30000");
  const [simpleTermInput, setSimpleTermInput] = useState<string>("10");
  const [simpleRateInput, setSimpleRateInput] = useState<string>("6.8");
  const [simplePmtInput, setSimplePmtInput] = useState<string>("");

  // Tab 2 Inputs: Section B Repayment Extra Payments ($30,000 @ 6.8%, $350 pmt + $150 extra)
  const [repayBalInput, setRepayBalInput] = useState<string>("30000");
  const [repayPmtInput, setRepayPmtInput] = useState<string>("350");
  const [repayRateInput, setRepayRateInput] = useState<string>("6.8");
  const [repayOption, setRepayOption] = useState<"extra" | "payoff" | "normal">("extra");
  const [extraMoInput, setExtraMoInput] = useState<string>("150");

  // Tab 3 Inputs: Section C Projection ($20k current + $10k/yr x 2 yrs @ 6.8%, 10 yr term, 6 mo grace)
  const [projGradYrsInput, setProjGradYrsInput] = useState<string>("2");
  const [projAnnualBorrowInput, setProjAnnualBorrowInput] = useState<string>("10000");
  const [projCurrentBalInput, setProjCurrentBalInput] = useState<string>("20000");
  const [projTermInput, setProjTermInput] = useState<string>("10");
  const [projGraceInput, setProjGraceInput] = useState<string>("6");
  const [projRateInput, setProjRateInput] = useState<string>("6.8");
  const [payInSchool, setPayInSchool] = useState<boolean>(false);

  // Modal & Notification State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Compute Section A Simple Solver
  const simpleResults = useMemo(() => {
    return calculateSimpleStudentLoan({
      loanBalance: simpleBalInput !== "" ? Number(simpleBalInput) : undefined,
      remainingTermYears: simpleTermInput !== "" ? Number(simpleTermInput) : undefined,
      interestRate: simpleRateInput !== "" ? Number(simpleRateInput) : undefined,
      monthlyPayment: simplePmtInput !== "" ? Number(simplePmtInput) : undefined,
    });
  }, [simpleBalInput, simpleTermInput, simpleRateInput, simplePmtInput]);

  // Compute Section B Repayment Results
  const repayResults = useMemo(() => {
    return calculateStudentLoanRepayment({
      loanBalance: Number(repayBalInput) || 30000,
      monthlyPayment: Number(repayPmtInput) || 350,
      interestRate: Number(repayRateInput) || 6.8,
      repaymentOption: repayOption,
      extraMonthlyPayment: Number(extraMoInput) || 150,
    });
  }, [repayBalInput, repayPmtInput, repayRateInput, repayOption, extraMoInput]);

  // Compute Section C Projection Results
  const projResults = useMemo(() => {
    return calculateStudentLoanProjection({
      yearsToGraduate: Number(projGradYrsInput) || 2,
      estimatedAnnualBorrowing: Number(projAnnualBorrowInput) || 10000,
      currentBalance: Number(projCurrentBalInput) || 20000,
      loanTermYears: Number(projTermInput) || 10,
      gracePeriodMonths: Number(projGraceInput) || 6,
      interestRate: Number(projRateInput) || 6.8,
      payInterestInSchool: payInSchool,
    });
  }, [
    projGradYrsInput,
    projAnnualBorrowInput,
    projCurrentBalInput,
    projTermInput,
    projGraceInput,
    projRateInput,
    payInSchool,
  ]);

  const fmt = (val: number) =>
    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Quick Presets
  const applyPresetA = (bal: number, yrs: number, rate: number) => {
    setSimpleBalInput(bal.toString());
    setSimpleTermInput(yrs.toString());
    setSimpleRateInput(rate.toString());
    setSimplePmtInput("");
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Student Loan Summary:
------------------------------------------------
Loan Balance: ${fmt(simpleResults.loanBalance)}
Interest Rate: ${simpleResults.interestRate}%
Remaining Term: ${simpleResults.remainingTermYears} Years
------------------------------------------------
Monthly Repayment: ${fmt(simpleResults.monthlyPayment)}/month
Total Interest Paid: ${fmt(simpleResults.totalInterestPaid)}
Total Repayment Cost: ${fmt(simpleResults.totalPayments)}`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Section A Donut Data (72% Principal, 28% Interest)
  const donutDataA = [
    { name: "Principal", value: simpleResults.loanBalance, color: "#3b82f6" },
    { name: "Total Interest", value: simpleResults.totalInterestPaid, color: "#10b981" },
  ];

  // Section C Donut Data (63% Principal, 37% Interest)
  const donutDataC = [
    { name: "Amount Borrowed", value: projResults.amountBorrowed, color: "#3b82f6" },
    { name: "Total Interest", value: projResults.totalInterestPaid, color: "#10b981" },
  ];

  // Report Modal Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Student Loan & Higher Education Calculator",
      reportTitle: "Student Loan & Higher Education Financing Analysis Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: "Monthly Repayment",
        value: fmt(simpleResults.monthlyPayment),
        subtitle: `Rate: ${simpleResults.interestRate}% | Term: ${simpleResults.remainingTermYears} Yrs`,
        colorTheme: "emerald",
      },
      {
        label: "Total Interest Paid",
        value: fmt(simpleResults.totalInterestPaid),
        subtitle: `Total Repayment: ${fmt(simpleResults.totalPayments)}`,
        colorTheme: "blue",
      },
    ],
    sections: [
      {
        title: "Student Loan Calculation Summary",
        items: [
          { label: "Loan Balance", value: fmt(simpleResults.loanBalance) },
          { label: "Interest Rate", value: `${simpleResults.interestRate}%` },
          { label: "Remaining Term", value: `${simpleResults.remainingTermYears} Years` },
          { label: "Monthly Repayment", value: fmt(simpleResults.monthlyPayment), highlight: true },
          { label: "Total Interest Paid", value: fmt(simpleResults.totalInterestPaid), highlight: true },
          { label: "Total Repayment Cost", value: fmt(simpleResults.totalPayments) },
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
            <GraduationCap className="h-3.5 w-3.5" /> Student Loan Suite
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPresetA(30000, 10, 6.8)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            Calculator.net Baseline ($30k @ 6.8% 10Y)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPresetA(45000, 10, 5.5)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            $45k @ 5.5% 10Y
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Monthly Repayment:</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-sans tabular-nums text-sm">
            {fmt(simpleResults.monthlyPayment)}/mo
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("simple")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "simple"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <GraduationCap className="h-4 w-4 text-emerald-500" /> 1. Simple 4-Way Solver
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("repayment")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "repayment"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <TrendingUp className="h-4 w-4 text-purple-500" /> 2. Extra Payment Repayment
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("projection")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "projection"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <BookOpen className="h-4 w-4 text-amber-500" /> 3. In-School Projection
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("plans")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "plans"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Landmark className="h-4 w-4 text-indigo-500" /> 4. Federal Plans &amp; Refinance
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

      {/* TAB 1: SIMPLE 4-WAY SOLVER (Calculator.net Section A) */}
      {activeTab === "simple" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Simple Student Loan 4-Way Solver
                </h3>
                <span className="text-[10px] text-zinc-400">Provide any THREE values to calculate the 4th field:</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Loan Balance ($)</label>
                  <Input
                    type="number"
                    value={simpleBalInput}
                    onChange={(e) => setSimpleBalInput(e.target.value)}
                    placeholder="e.g. 30000"
                    className="text-xs font-sans tabular-nums h-9 px-3"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Remaining Term (Years)</label>
                  <Input
                    type="number"
                    value={simpleTermInput}
                    onChange={(e) => setSimpleTermInput(e.target.value)}
                    placeholder="e.g. 10"
                    className="text-xs font-sans tabular-nums h-9 px-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Interest Rate (% APR)</label>
                  <Input
                    type="number"
                    value={simpleRateInput}
                    onChange={(e) => setSimpleRateInput(e.target.value)}
                    placeholder="e.g. 6.8"
                    className="text-xs font-sans tabular-nums h-9 px-3"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Monthly Payment ($/mo)</label>
                  <Input
                    type="number"
                    value={simplePmtInput}
                    onChange={(e) => setSimplePmtInput(e.target.value)}
                    placeholder="Auto calculated"
                    className="text-xs font-sans tabular-nums h-9 px-3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  REPAYMENT
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
                {fmt(simpleResults.monthlyPayment)}/month
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-white/90 font-medium pt-2 border-t border-white/10">
                <div>
                  Total Interest: <span className="font-bold text-emerald-300 block">{fmt(simpleResults.totalInterestPaid)}</span>
                </div>
                <div>
                  Total Payments: <span className="font-bold text-indigo-200 block">{fmt(simpleResults.totalPayments)}</span>
                </div>
              </div>
            </div>

            {/* Donut Chart (72% Principal, 28% Interest match) */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Principal vs. Interest Breakdown
              </h4>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={donutDataA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                      {donutDataA.map((entry, index) => (
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

      {/* TAB 2: REPAYMENT EXTRA PAYMENTS (Calculator.net Section B) */}
      {activeTab === "repayment" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Student Loan Repayment &amp; Extra Payments
            </h3>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Loan Balance ($)</label>
                <Input type="number" value={repayBalInput} onChange={(e) => setRepayBalInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Monthly ($/mo)</label>
                <Input type="number" value={repayPmtInput} onChange={(e) => setRepayPmtInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Rate (%)</label>
                <Input type="number" value={repayRateInput} onChange={(e) => setRepayRateInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>

            <div className="space-y-2 text-xs border-t pt-2">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Repayment Options:</span>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="repayOpt" checked={repayOption === "extra"} onChange={() => setRepayOption("extra")} className="text-indigo-600" />
                  <span>Repayment with extra payments ($150/mo baseline match)</span>
                </label>
                {repayOption === "extra" && (
                  <div className="pl-6 space-y-1">
                    <label className="text-[10px] text-zinc-500">Extra Payment Amount ($/month)</label>
                    <Input type="number" value={extraMoInput} onChange={(e) => setExtraMoInput(e.target.value)} className="h-7 text-xs font-sans tabular-nums w-32 px-2" />
                  </div>
                )}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="repayOpt" checked={repayOption === "normal"} onChange={() => setRepayOption("normal")} className="text-indigo-600" />
                  <span>Normal repayment</span>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-purple-900 dark:text-purple-200 text-sm block border-b pb-1">
                Payoff Comparison (6 yrs 2 mos Match!)
              </span>

              <div className="bg-white/80 dark:bg-zinc-900/80 p-3 rounded-lg border font-sans text-xs text-purple-900 dark:text-purple-200">
                {repayResults.insightMessage}
              </div>

              <div className="space-y-2 pt-1 font-sans">
                <div className="border-b pb-1 font-bold text-emerald-600">
                  If Pay Extra ${extraMoInput} per month:
                  <div className="font-sans tabular-nums text-xs text-zinc-800 dark:text-zinc-200 font-normal">
                    <div>Remaining Term: {repayResults.acceleratedSchedule.termYearsMonthsStr}</div>
                    <div>Total Payments: {fmt(repayResults.acceleratedSchedule.totalPayments)}</div>
                    <div>Total Interest: {fmt(repayResults.acceleratedSchedule.totalInterest)}</div>
                  </div>
                </div>

                <div className="font-bold text-zinc-600">
                  Original Payoff Schedule:
                  <div className="font-sans tabular-nums text-xs text-zinc-600 dark:text-zinc-400 font-normal">
                    <div>Remaining Term: {repayResults.originalSchedule.termYearsMonthsStr}</div>
                    <div>Total Payments: {fmt(repayResults.originalSchedule.totalPayments)}</div>
                    <div>Total Interest: {fmt(repayResults.originalSchedule.totalInterest)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROJECTION CALCULATOR (Calculator.net Section C) */}
      {activeTab === "projection" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              In-School Projection Calculator
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">To Graduate In (Years)</label>
                <Input type="number" value={projGradYrsInput} onChange={(e) => setProjGradYrsInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Estimated Annual Borrowing ($)</label>
                <Input type="number" value={projAnnualBorrowInput} onChange={(e) => setProjAnnualBorrowInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Current Balance ($)</label>
                <Input type="number" value={projCurrentBalInput} onChange={(e) => setProjCurrentBalInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Loan Term (Years)</label>
                <Input type="number" value={projTermInput} onChange={(e) => setProjTermInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Grace Period (Months)</label>
                <Input type="number" value={projGraceInput} onChange={(e) => setProjGraceInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Interest Rate (%)</label>
                <Input type="number" value={projRateInput} onChange={(e) => setProjRateInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-lg border text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-semibold">
                <input type="checkbox" checked={payInSchool} onChange={(e) => setPayInSchool(e.target.checked)} className="rounded text-indigo-600" />
                <span>Do you pay interest during school years?</span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-amber-900 dark:text-amber-200 text-sm block border-b pb-1">
                Projection Results ($45,790.44 Match!)
              </span>
              <div className="flex justify-between text-base border-b pb-1 font-extrabold text-amber-600 font-sans">
                <span>Repayment:</span>
                <span className="font-sans tabular-nums">{fmt(projResults.monthlyPayment)}/month</span>
              </div>
              <div className="flex justify-between">
                <span>Amount Borrowed:</span>
                <span className="font-bold">{fmt(projResults.amountBorrowed)}</span>
              </div>
              <div className="flex justify-between">
                <span>Balance At Graduation:</span>
                <span className="font-bold text-indigo-600">{fmt(projResults.balanceAtGraduation)}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-600">
                <span>Balance After Grace Period:</span>
                <span>{fmt(projResults.balanceAfterGracePeriod)}</span>
              </div>
              <div className="flex justify-between border-t pt-1 font-sans text-zinc-600 dark:text-zinc-400">
                <span>Total Interest Paid:</span>
                <span className="font-bold font-sans tabular-nums text-rose-600">{fmt(projResults.totalInterestPaid)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FEDERAL PLANS & REFINANCE */}
      {activeTab === "plans" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Federal Repayment Options &amp; Refinance Simulator
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans tabular-nums">
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border space-y-1">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 block">Standard (10 Yrs)</span>
              <div>Monthly: {fmt(simpleResults.monthlyPayment)}</div>
              <div>Total Interest: {fmt(simpleResults.totalInterestPaid)}</div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border space-y-1">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 block">Extended (25 Yrs)</span>
              <div>Monthly: {fmt(simpleResults.monthlyPayment * 0.58)}</div>
              <div>Total Interest: {fmt(simpleResults.totalInterestPaid * 2.4)}</div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border space-y-1">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 block">Private Refinance (4.5% APR)</span>
              <div>Monthly: {fmt(simpleResults.monthlyPayment * 0.89)}</div>
              <div>Savings: {fmt(simpleResults.totalInterestPaid * 0.35)}</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: VISUAL DASHBOARDS */}
      {activeTab === "charts" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Student Loan Principal vs. Total Cost Comparison
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: "Loan Principal", amount: simpleResults.loanBalance, fill: "#3b82f6" },
                { name: "Total Repayment", amount: simpleResults.totalPayments, fill: "#6366f1" },
                { name: "Total Interest", amount: simpleResults.totalInterestPaid, fill: "#10b981" },
              ]}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}`} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                <Bar dataKey="amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 15 FAQs */}
      <StudentLoanContent />
    </div>
  );
}
