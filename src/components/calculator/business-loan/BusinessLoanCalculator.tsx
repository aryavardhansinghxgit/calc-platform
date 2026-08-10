"use client";

import React, { useState, useMemo } from "react";
import {
  Briefcase,
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
  ShieldCheck,
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
import { BusinessLoanContent } from "./BusinessLoanContent";
import {
  calculateBusinessLoan,
  calculateSbaLoan,
  calculateDscr,
} from "@/lib/calculator-engine/formulas/business-loan";

export function BusinessLoanCalculator() {
  // Navigation Tabs: 'standard' | 'schedule' | 'sba' | 'dscr' | 'charts'
  const [activeTab, setActiveTab] = useState<
    "standard" | "schedule" | "sba" | "dscr" | "charts"
  >("standard");

  // Tab 1 Inputs: Standard Business Loan ($10,000 @ 10% for 5 years, 5% orig fee + $750 doc fee)
  const [loanAmountInput, setLoanAmountInput] = useState<string>("10000");
  const [interestRateInput, setInterestRateInput] = useState<string>("10.0");
  const [loanTermYearsInput, setLoanTermYearsInput] = useState<string>("5");
  const [loanTermMonthsInput, setLoanTermMonthsInput] = useState<string>("0");
  const [originationFeeInput, setOriginationFeeInput] = useState<string>("5.0");
  const [documentationFeeInput, setDocumentationFeeInput] = useState<string>("750");
  const [otherFeesInput, setOtherFeesInput] = useState<string>("0");

  // Tab 3 Inputs: SBA Loan Estimator ($250,000 @ 7.5% for 10 yrs)
  const [sbaType, setSbaType] = useState<"7a" | "microloan" | "cdc504" | "disaster">("7a");
  const [sbaAmountInput, setSbaAmountInput] = useState<string>("250000");
  const [sbaRateInput, setSbaRateInput] = useState<string>("7.5");
  const [sbaTermInput, setSbaTermInput] = useState<string>("10");

  // Tab 4 Inputs: DSCR Coverage Analyzer ($150,000 NOI)
  const [dscrNoiInput, setDscrNoiInput] = useState<string>("150000");
  const [dscrCurrentDebtInput, setDscrCurrentDebtInput] = useState<string>("30000");
  const [dscrNewDebtInput, setDscrNewDebtInput] = useState<string>("25000");

  // Modal & Notification State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Compute Standard Business Loan Results
  const loanResults = useMemo(() => {
    return calculateBusinessLoan({
      loanAmount: Number(loanAmountInput) || 10000,
      interestRate: Number(interestRateInput) || 10.0,
      loanTermYears: Number(loanTermYearsInput) || 5,
      loanTermMonths: Number(loanTermMonthsInput) || 0,
      originationFeePercent: Number(originationFeeInput) || 5.0,
      documentationFeeDollar: Number(documentationFeeInput) || 750,
      otherFeesDollar: Number(otherFeesInput) || 0,
    });
  }, [
    loanAmountInput,
    interestRateInput,
    loanTermYearsInput,
    loanTermMonthsInput,
    originationFeeInput,
    documentationFeeInput,
    otherFeesInput,
  ]);

  // Compute SBA Results
  const sbaResults = useMemo(() => {
    return calculateSbaLoan({
      loanType: sbaType,
      loanAmount: Number(sbaAmountInput) || 250000,
      interestRate: Number(sbaRateInput) || 7.5,
      loanTermYears: Number(sbaTermInput) || 10,
    });
  }, [sbaType, sbaAmountInput, sbaRateInput, sbaTermInput]);

  // Compute DSCR Results
  const dscrResults = useMemo(() => {
    return calculateDscr({
      annualNetOperatingIncome: Number(dscrNoiInput) || 150000,
      annualDebtService: Number(dscrCurrentDebtInput) || 30000,
      newProposedAnnualDebtService: Number(dscrNewDebtInput) || 25000,
    });
  }, [dscrNoiInput, dscrCurrentDebtInput, dscrNewDebtInput]);

  const fmt = (val: number) =>
    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Quick Presets
  const applyPreset = (amt: number, rate: number, yrs: number, orig: number, doc: number) => {
    setLoanAmountInput(amt.toString());
    setInterestRateInput(rate.toString());
    setLoanTermYearsInput(yrs.toString());
    setLoanTermMonthsInput("0");
    setOriginationFeeInput(orig.toString());
    setDocumentationFeeInput(doc.toString());
    setOtherFeesInput("0");
  };

  // Export Amortization CSV
  const exportCsv = () => {
    const headers = ["Period", "Beginning Balance", "Interest", "Principal", "Ending Balance"];
    const rows = loanResults.monthlySchedule.map((r) => [
      r.period,
      r.beginningBalance,
      r.interest,
      r.principal,
      r.endingBalance,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `business_loan_amortization_${loanAmountInput}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Business Loan Calculation Summary:
------------------------------------------------
Loan Amount: ${fmt(Number(loanAmountInput))}
Interest Rate: ${interestRateInput}% APR
Loan Term: ${loanTermYearsInput} Years
------------------------------------------------
Payback Every Month: ${fmt(loanResults.paybackAmount)}
Total Payments: ${fmt(loanResults.totalPayments)}
Total Interest: ${fmt(loanResults.totalInterestPaid)}
Total Fees: ${fmt(loanResults.totalFeesPaid)}
Real Rate (APR): ${loanResults.realAprPercent}%`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Donut Data: Principal (71%) vs Interest (20%) vs Fee (9%) for Calculator.net match
  const donutData = [
    { name: "Principal", value: Number(loanAmountInput) || 10000, color: "#3b82f6" },
    { name: "Interest", value: loanResults.totalInterestPaid, color: "#10b981" },
    { name: "Fees", value: loanResults.totalFeesPaid, color: "#eab308" },
  ];

  // Report Modal Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Business Loan & Commercial Financing Calculator",
      reportTitle: "Business Loan & Commercial Financing Analysis Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: "Payback Every Month",
        value: fmt(loanResults.paybackAmount),
        subtitle: `Real APR: ${loanResults.realAprPercent}%`,
        colorTheme: "emerald",
      },
      {
        label: "Total Interest + Fees",
        value: fmt(loanResults.totalInterestAndFees),
        subtitle: `Total Payments: ${fmt(loanResults.totalPayments)}`,
        colorTheme: "amber",
      },
    ],
    sections: [
      {
        title: "Commercial Loan Parameters & Fee Summary",
        items: [
          { label: "Loan Amount", value: fmt(Number(loanAmountInput)) },
          { label: "Interest Rate (Nominal)", value: `${interestRateInput}%` },
          { label: "Loan Term", value: `${loanTermYearsInput} Years` },
          { label: "Origination Fee", value: `${originationFeeInput}% (${fmt(Number(loanAmountInput) * (Number(originationFeeInput) / 100))})` },
          { label: "Documentation Fee", value: fmt(Number(documentationFeeInput)) },
          { label: "Payback Every Month", value: fmt(loanResults.paybackAmount), highlight: true },
          { label: "Total Interest Paid", value: fmt(loanResults.totalInterestPaid), highlight: true },
          { label: "Total Interest + Fees", value: fmt(loanResults.totalInterestAndFees) },
          { label: "Real Rate (APR)", value: `${loanResults.realAprPercent}%`, highlight: true },
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
            <Briefcase className="h-3.5 w-3.5" /> Business Loan Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(10000, 10.0, 5, 5.0, 750)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            Calculator.net Baseline ($10k @ 10% 5Y)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(100000, 8.5, 5, 2.0, 500)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            $100k Commercial Loan
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(250000, 7.5, 10, 3.0, 1000)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            SBA 7(a) Preset ($250k @ 7.5%)
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Real APR:</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">
            {loanResults.realAprPercent}%
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
          <Briefcase className="h-4 w-4 text-emerald-500" /> 1. Standard Business Loan
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
          onClick={() => setActiveTab("sba")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "sba"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Building className="h-4 w-4 text-amber-500" /> 3. SBA Loan Estimator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("dscr")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "dscr"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <ShieldCheck className="h-4 w-4 text-indigo-500" /> 4. DSCR Cash Flow Coverage
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

      {/* TAB 1: STANDARD BUSINESS LOAN (Calculator.net Baseline) */}
      {activeTab === "standard" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Business Loan Parameters
              </h3>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Loan Amount ($)</label>
                  <Input
                    type="number"
                    value={loanAmountInput}
                    onChange={(e) => setLoanAmountInput(e.target.value)}
                    placeholder="e.g. 10000"
                    className="text-xs font-mono h-9 px-3"
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
                      className="text-xs font-mono h-9 px-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Term (Years)</label>
                    <Input
                      type="number"
                      value={loanTermYearsInput}
                      onChange={(e) => setLoanTermYearsInput(e.target.value)}
                      className="text-xs font-mono h-9 px-3"
                    />
                  </div>
                </div>

                {/* Fees Inputs */}
                <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 space-y-2 text-xs">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Commercial Fees (Calculator.net Match):</span>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-zinc-500">Origination Fee (%)</label>
                      <Input
                        type="number"
                        value={originationFeeInput}
                        onChange={(e) => setOriginationFeeInput(e.target.value)}
                        className="h-7 text-xs font-mono px-2"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500">Doc Fee ($)</label>
                      <Input
                        type="number"
                        value={documentationFeeInput}
                        onChange={(e) => setDocumentationFeeInput(e.target.value)}
                        className="h-7 text-xs font-mono px-2"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500">Other Fees ($)</label>
                      <Input
                        type="number"
                        value={otherFeesInput}
                        onChange={(e) => setOtherFeesInput(e.target.value)}
                        className="h-7 text-xs font-mono px-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  PAYBACK EVERY MONTH
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

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400 font-mono mb-2">
                {fmt(loanResults.paybackAmount)}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-white/90 font-medium pt-2 border-t border-white/10">
                <div>
                  Total 60 Payments: <span className="font-bold text-indigo-200 block">{fmt(loanResults.totalPayments)}</span>
                </div>
                <div>
                  Total Interest: <span className="font-bold text-emerald-300 block">{fmt(loanResults.totalInterestPaid)}</span>
                </div>
                <div>
                  Interest + Fee: <span className="font-bold text-amber-200 block">{fmt(loanResults.totalInterestAndFees)}</span>
                </div>
                <div>
                  Real Rate (APR): <span className="font-bold text-blue-200 block">{loanResults.realAprPercent}%</span>
                </div>
              </div>
            </div>

            {/* Donut Chart (Match Calculator.net 71% Principal, 20% Interest, 9% Fees) */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Capital vs. Interest vs. Fee Breakdown
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

      {/* TAB 2: AMORTIZATION SCHEDULE WITH YEAR ENDS (Match Calculator.net PDF Page 1 & 2) */}
      {activeTab === "schedule" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Table className="h-5 w-5 text-purple-600" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Commercial Amortization Schedule (Calculator.net Match)
              </h3>
            </div>
            <Button type="button" size="sm" variant="outline" onClick={exportCsv} className="h-7 text-xs cursor-pointer">
              <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60 sticky top-0 font-sans font-bold text-zinc-700 dark:text-zinc-300">
                <tr>
                  <th className="p-2.5">Month</th>
                  <th className="p-2.5">Beginning Balance</th>
                  <th className="p-2.5">Interest</th>
                  <th className="p-2.5">Principal</th>
                  <th className="p-2.5">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {loanResults.monthlySchedule.map((row) => (
                  <React.Fragment key={row.period}>
                    <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40">
                      <td className="p-2.5 font-bold">{row.period}</td>
                      <td className="p-2.5">{fmt(row.beginningBalance)}</td>
                      <td className="p-2.5 text-rose-600 font-semibold">{fmt(row.interest)}</td>
                      <td className="p-2.5 text-emerald-600 font-semibold">-{fmt(row.principal)}</td>
                      <td className="p-2.5 font-bold">{fmt(row.endingBalance)}</td>
                    </tr>

                    {/* Year End Divider Row matching Calculator.net PDF Page 1 & 2 */}
                    {row.isYearEnd && (
                      <tr className="bg-indigo-50/70 dark:bg-indigo-950/40 font-sans font-bold text-indigo-900 dark:text-indigo-200">
                        <td colSpan={5} className="p-2 text-center text-xs tracking-wider uppercase">
                          Year #{row.yearNum} End
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SBA LOAN ESTIMATOR */}
      {activeTab === "sba" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              SBA Government Guaranteed Loan Estimator
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">SBA Program Type</label>
                <select
                  value={sbaType}
                  onChange={(e) => setSbaType(e.target.value as any)}
                  className="w-full h-9 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-xs"
                >
                  <option value="7a">SBA 7(a) Standard Loan (Up to $5M Working Capital)</option>
                  <option value="cdc504">SBA CDC/504 Loan (Up to 25 Yrs Real Estate)</option>
                  <option value="microloan">SBA Microloan (Up to $50k Small Business)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">SBA Loan Amount ($)</label>
                <Input type="number" value={sbaAmountInput} onChange={(e) => setSbaAmountInput(e.target.value)} className="text-xs font-mono h-9 px-3" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Interest Rate (%)</label>
                  <Input type="number" value={sbaRateInput} onChange={(e) => setSbaRateInput(e.target.value)} className="text-xs font-mono h-8 px-2" />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Term (Years)</label>
                  <Input type="number" value={sbaTermInput} onChange={(e) => setSbaTermInput(e.target.value)} className="text-xs font-mono h-8 px-2" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-mono text-xs">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-amber-900 dark:text-amber-200 text-sm block border-b pb-1">
                SBA Program Estimated Costs
              </span>
              <div className="flex justify-between">
                <span>SBA Guarantee Fee:</span>
                <span className="font-bold">{fmt(sbaResults.sbaGuaranteeFee)}</span>
              </div>
              <div className="flex justify-between text-base border-t pt-1 font-extrabold text-amber-600">
                <span>Estimated Monthly Payment:</span>
                <span>{fmt(sbaResults.estimatedMonthlyPayment)}</span>
              </div>
              <div className="flex justify-between font-sans text-zinc-600 dark:text-zinc-400">
                <span>Total SBA Loan Cost:</span>
                <span className="font-bold font-mono">{fmt(sbaResults.totalCostOfSbaLoan)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DSCR COVERAGE ANALYZER */}
      {activeTab === "dscr" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Debt Service Coverage Ratio (DSCR) Analyzer
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Annual Net Operating Income (NOI $)</label>
                <Input type="number" value={dscrNoiInput} onChange={(e) => setDscrNoiInput(e.target.value)} className="text-xs font-mono h-8 px-2" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Current Debt ($/yr)</label>
                  <Input type="number" value={dscrCurrentDebtInput} onChange={(e) => setDscrCurrentDebtInput(e.target.value)} className="text-xs font-mono h-8 px-2" />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">New Loan Debt ($/yr)</label>
                  <Input type="number" value={dscrNewDebtInput} onChange={(e) => setDscrNewDebtInput(e.target.value)} className="text-xs font-mono h-8 px-2" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-mono text-xs">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-indigo-900 dark:text-indigo-200 text-sm block border-b pb-1">
                DSCR Commercial Underwriting Result
              </span>
              <div className="flex justify-between text-base">
                <span>DSCR Coverage Ratio:</span>
                <span className={`font-extrabold ${dscrResults.isHealthy ? "text-emerald-600" : "text-rose-600"}`}>
                  {dscrResults.dscrRatio}x ({dscrResults.isHealthy ? "Healthy >= 1.25x" : "Risky < 1.25x"})
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Debt Service:</span>
                <span className="font-bold">{fmt(dscrResults.totalAnnualDebtService)}/yr</span>
              </div>
              <div className="flex justify-between text-blue-600 font-bold border-t pt-1">
                <span>Max Allowable Annual Debt:</span>
                <span>{fmt(dscrResults.maxAllowableAnnualDebt)}/yr</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: VISUAL DASHBOARDS */}
      {activeTab === "charts" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" /> Commercial Loan Balance Amortization Over Time
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={loanResults.monthlySchedule.filter((r) => r.isYearEnd)}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="yearNum" tick={{ fontSize: 11 }} tickFormatter={(v: any) => `Year ${v}`} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}`} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                <Legend />
                <Line type="monotone" dataKey="endingBalance" name="Ending Balance ($)" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="interest" name="Interest ($)" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 15 FAQs */}
      <BusinessLoanContent />
    </div>
  );
}
