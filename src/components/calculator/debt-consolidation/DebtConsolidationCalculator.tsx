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
  ArrowRight,
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
import { DebtConsolidationContent } from "./DebtConsolidationContent";
import {
  calculateDebtConsolidation,
  ExistingDebtItem,
} from "@/lib/calculator-engine/formulas/debt-consolidation";

export function DebtConsolidationCalculator() {
  // Tabs: 'evaluator' | 'realApr' | 'balTransfer' | 'charts' | 'schedule'
  const [activeTab, setActiveTab] = useState<"evaluator" | "realApr" | "balTransfer" | "charts" | "schedule">("evaluator");

  // Multi-Debt Existing Debts State
  const [debts, setDebts] = useState<ExistingDebtItem[]>([
    { id: "1", name: "Credit Card 1", balance: 10000, minPayment: 260, apr: 17.99 },
    { id: "2", name: "Credit Card 2", balance: 7500, minPayment: 190, apr: 19.99 },
    { id: "3", name: "High Interest Debt", balance: 6500, minPayment: 180, apr: 18.99 },
  ]);

  // Consolidation Loan State
  const [consolidationAprInput, setConsolidationAprInput] = useState<string>("10.99");
  const [loanTermYearsInput, setLoanTermYearsInput] = useState<string>("5");
  const [loanTermMonthsInput, setLoanTermMonthsInput] = useState<string>("0");
  const [customLoanAmountInput, setCustomLoanAmountInput] = useState<string>(""); // Blank means auto sum
  const [feeType, setFeeType] = useState<"percent" | "fixed">("percent");
  const [feeValueInput, setFeeValueInput] = useState<string>("5"); // 5% fee

  // Table Search & Pagination
  const [tableSearch, setTableSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 12;

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Compute Total Term Months
  const totalTermMonths = useMemo(() => {
    const yrs = Math.max(0, Number(loanTermYearsInput) || 0);
    const mos = Math.max(0, Number(loanTermMonthsInput) || 0);
    return yrs * 12 + mos || 60;
  }, [loanTermYearsInput, loanTermMonthsInput]);

  // Compute Consolidation Results
  const results = useMemo(() => {
    const customAmt = Number(customLoanAmountInput) || 0;
    return calculateDebtConsolidation({
      debts,
      loanAmount: customAmt > 0 ? customAmt : undefined,
      consolidationApr: Number(consolidationAprInput) || 10.99,
      termMonths: totalTermMonths,
      feeType,
      feeValue: Number(feeValueInput) || 0,
    });
  }, [debts, customLoanAmountInput, consolidationAprInput, totalTermMonths, feeType, feeValueInput]);

  const fmt = (val: number) => `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Existing Debt Handlers
  const addDebtRow = () => {
    setDebts([
      ...debts,
      { id: Date.now().toString(), name: `Debt #${debts.length + 1}`, balance: 5000, minPayment: 120, apr: 18.0 },
    ]);
  };

  const removeDebtRow = (id: string) => {
    setDebts(debts.filter((d) => d.id !== id));
  };

  const updateDebtRow = (id: string, field: keyof ExistingDebtItem, value: any) => {
    setDebts(debts.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const addPresetDebt = (name: string, bal: number, minP: number, apr: number) => {
    setDebts([...debts, { id: Date.now().toString(), name, balance: bal, minPayment: minP, apr }]);
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Debt Consolidation Summary:
------------------------------------------------
Existing Debt Total Balance: ${fmt(results.currentTotalBalance)}
Current Weighted APR: ${results.currentWeightedApr.toFixed(2)}%
Current Monthly Payment: ${fmt(results.currentTotalMonthlyPayment)}
------------------------------------------------
New Consolidation Loan Amount: ${fmt(results.fundedTotalLoan)} (includes ${fmt(results.upfrontFeeAmount)} fee)
New Consolidation APR: ${results.consolidationApr.toFixed(2)}% (Real Effective APR: ${results.realApr.toFixed(2)}%)
New Monthly Payment: ${fmt(results.consolidationMonthlyPayment)}
------------------------------------------------
Monthly Savings: ${fmt(results.monthlySavings)}
Net Total Savings: ${fmt(results.netTotalSavings)}
Recommendation: ${results.recommendation}`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Export CSV
  const exportCSV = () => {
    const headers = ["Month", "Current Plan Balance ($)", "Current Payment ($)", "Consolidation Loan Balance ($)", "Consolidation Payment ($)"];
    const maxMonths = Math.max(results.currentSchedule.length, results.consolidationSchedule.length);
    const rows = [];

    for (let m = 1; m <= maxMonths; m++) {
      const cRow = results.currentSchedule.find((r) => r.month === m) || { balance: 0, payment: 0 };
      const lRow = results.consolidationSchedule.find((r) => r.month === m) || { balance: 0, payment: 0 };
      rows.push([m, cRow.balance, cRow.payment, lRow.balance, lRow.payment]);
    }

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `debt_consolidation_schedule_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Recharts Data: Current vs Consolidation Cumulative Interest / Costs
  const chartData = [
    { name: "Current Multi-Debt", TotalInterest: results.currentTotalInterest, TotalCost: results.currentTotalCost },
    { name: "Consolidation Loan", TotalInterest: results.consolidationTotalInterest, TotalCost: results.consolidationTotalCost },
  ];

  // Report Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Debt Consolidation Acceleration Platform",
      reportTitle: "Debt Refinance & Real APR Analysis Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      { label: "Net Total Savings", value: fmt(results.netTotalSavings), subtitle: `Rate drop: ${results.currentWeightedApr.toFixed(2)}% -> ${results.consolidationApr.toFixed(2)}%`, colorTheme: results.netTotalSavings >= 0 ? "emerald" : "rose" },
      { label: "New Monthly Payment", value: fmt(results.consolidationMonthlyPayment), subtitle: `Monthly Savings: ${fmt(results.monthlySavings)}`, colorTheme: "blue" },
      { label: "Real Effective APR", value: `${results.realApr.toFixed(2)}%`, subtitle: `Includes ${fmt(results.upfrontFeeAmount)} upfront fee`, colorTheme: "purple" },
    ],
    sections: [
      {
        title: "Debt Consolidation Evaluation Details",
        items: [
          { label: "Current Combined Balance", value: fmt(results.currentTotalBalance) },
          { label: "Current Weighted Average APR", value: `${results.currentWeightedApr.toFixed(2)}%` },
          { label: "Current Total Monthly Payment", value: fmt(results.currentTotalMonthlyPayment) },
          { label: "Consolidation Nominal APR", value: `${results.consolidationApr.toFixed(2)}%` },
          { label: "Consolidation Real Effective APR", value: `${results.realApr.toFixed(2)}%`, highlight: true },
          { label: "Upfront Fee / Points Amount", value: fmt(results.upfrontFeeAmount) },
          { label: "Max Fee Threshold %", value: `${results.maxFeeThresholdPercent.toFixed(2)}%` },
          { label: "Net Total Savings", value: fmt(results.netTotalSavings), highlight: true },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top Quick Presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 gap-1 text-xs">
            <Landmark className="h-3 w-3" /> Consolidation Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Add Presets:</span>
          <Button type="button" size="sm" variant="outline" onClick={() => addPresetDebt("Store Card", 1500, 45, 24.9)} className="h-6 text-[10px] px-2">
            + Store Card
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => addPresetDebt("Personal Loan", 8000, 210, 14.5)} className="h-6 text-[10px] px-2">
            + Personal Loan
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => addPresetDebt("Medical Bill", 4000, 90, 8.0)} className="h-6 text-[10px] px-2">
            + Medical Bill
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Weighted Current APR:</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">{results.currentWeightedApr.toFixed(2)}%</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("evaluator")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${activeTab === "evaluator"
            ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
            : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
        >
          <Landmark className="h-4 w-4" /> Consolidation Evaluator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("realApr")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${activeTab === "realApr"
            ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
            : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
        >
          <Percent className="h-4 w-4 text-emerald-500" /> Real APR &amp; Fee Threshold
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("balTransfer")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${activeTab === "balTransfer"
            ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
            : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
        >
          <Zap className="h-4 w-4 text-amber-500" /> 0% Balance Transfer Card
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("charts")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${activeTab === "charts"
            ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
            : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
        >
          <BarChart3 className="h-4 w-4 text-blue-500" /> Cost Breakdown &amp; Charts
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("schedule")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${activeTab === "schedule"
            ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
            : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
        >
          <FileSpreadsheet className="h-4 w-4 text-purple-500" /> Amortization Comparison
        </button>
      </div>

      {/* TAB 1: CONSOLIDATION EVALUATOR */}
      {activeTab === "evaluator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Existing Debts & Proposed Loan Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Existing Debts */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Existing Debts to Consolidate ({debts.length} Accounts)
                </h3>
                <Button type="button" size="sm" onClick={addDebtRow} className="h-7 text-xs bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Debt Row
                </Button>
              </div>

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
                      className="col-span-3 h-8 text-xs font-mono px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <Input
                      type="number"
                      min="0"
                      value={d.minPayment || ""}
                      onChange={(e) => updateDebtRow(d.id, "minPayment", Number(e.target.value))}
                      className="col-span-2 h-8 text-xs font-mono px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={d.apr || ""}
                      onChange={(e) => updateDebtRow(d.id, "apr", Number(e.target.value))}
                      className="col-span-2 h-8 text-xs font-mono px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
            </div>

            {/* Proposed Consolidation Loan Inputs */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Proposed Consolidation Loan Terms
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Loan Amount ($)</label>
                  <Input
                    type="number"
                    min="0"
                    placeholder={`$${results.currentTotalBalance.toLocaleString()}`}
                    value={customLoanAmountInput}
                    onChange={(e) => setCustomLoanAmountInput(e.target.value)}
                    className="text-xs font-mono h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-[10px] text-zinc-400">Leave blank to consolidate 100% of balance.</span>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Interest Rate (% APR)</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.25"
                    value={consolidationAprInput}
                    onChange={(e) => setConsolidationAprInput(e.target.value)}
                    className="text-xs font-mono h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Term Duration */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Loan Term (Years)</label>
                  <Input
                    type="number"
                    min="0"
                    max="30"
                    value={loanTermYearsInput}
                    onChange={(e) => setLoanTermYearsInput(e.target.value)}
                    className="text-xs font-mono h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Additional Months</label>
                  <Input
                    type="number"
                    min="0"
                    max="11"
                    value={loanTermMonthsInput}
                    onChange={(e) => setLoanTermMonthsInput(e.target.value)}
                    className="text-xs font-mono h-8 px-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Fee / Points */}
              <div className="grid grid-cols-2 gap-3 text-xs border-t border-zinc-100 dark:border-zinc-800 pt-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Loan Fees / Points</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    value={feeValueInput}
                    onChange={(e) => setFeeValueInput(e.target.value)}
                    className="text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Fee Format</label>
                  <select
                    value={feeType}
                    onChange={(e) => setFeeType(e.target.value as "percent" | "fixed")}
                    className="w-full h-9 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 text-xs focus:outline-none"
                  >
                    <option value="percent">% of Loan Amount</option>
                    <option value="fixed">Fixed Dollar ($)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Results Dashboard (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Warning Alert if Net Loss */}
            {results.warningNote && (
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 p-4 rounded-xl flex items-start gap-3 text-xs">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-sm mb-0.5">Consolidation Caution</span>
                  {results.warningNote}
                </div>
              </div>
            )}

            {/* Main Hero Result Card */}
            <div className={`rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br ${results.netTotalSavings >= 0 ? "from-slate-900 via-indigo-950 to-blue-950" : "from-slate-900 via-rose-950 to-red-950"
              }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  NET TOTAL REFINANCE SAVINGS
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

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-white mb-2">
                {fmt(results.netTotalSavings)}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 font-medium mb-3">
                <span>Monthly Savings: <span className="font-bold text-emerald-300">{fmt(results.monthlySavings)}/mo</span></span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-indigo-200">
                  Real APR: {results.realApr.toFixed(2)}%
                </span>
              </div>

              {/* Recommendation Callout */}
              <div className="bg-white/10 p-3 rounded-xl text-xs backdrop-blur-sm border border-white/10">
                💡 <strong>Smart Analysis:</strong> {results.recommendation}
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">Funded Loan Total</div>
                  <div className="font-bold font-mono text-white text-sm">{fmt(results.fundedTotalLoan)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">New Monthly Pmt</div>
                  <div className="font-bold font-mono text-blue-300 text-sm">{fmt(results.consolidationMonthlyPayment)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Upfront Fees</div>
                  <div className="font-bold font-mono text-amber-300 text-sm">{fmt(results.upfrontFeeAmount)}</div>
                </div>
              </div>
            </div>

            {/* Side-by-Side Comparison Box */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Current Debts vs. Proposed Consolidation Loan
              </h4>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-2">
                  <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 text-sm block border-b pb-1">Current Debts</span>
                  <div>Combined Bal: <span className="font-bold">{fmt(results.currentTotalBalance)}</span></div>
                  <div>Weighted APR: <span className="font-bold text-amber-600">{results.currentWeightedApr.toFixed(2)}%</span></div>
                  <div>Monthly Pmt: <span className="font-bold text-red-500">{fmt(results.currentTotalMonthlyPayment)}</span></div>
                  <div>Total Interest: <span className="font-bold text-red-500">{fmt(results.currentTotalInterest)}</span></div>
                  <div>Total Cost: <span className="font-bold">{fmt(results.currentTotalCost)}</span></div>
                </div>

                <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2">
                  <span className="font-sans font-bold text-indigo-900 dark:text-indigo-200 text-sm block border-b border-indigo-200 dark:border-indigo-800 pb-1">Consolidation Loan</span>
                  <div>Loan Amount: <span className="font-bold">{fmt(results.fundedTotalLoan)}</span></div>
                  <div>Real APR: <span className="font-bold text-emerald-600">{results.realApr.toFixed(2)}%</span></div>
                  <div>Monthly Pmt: <span className="font-bold text-blue-600">{fmt(results.consolidationMonthlyPayment)}</span></div>
                  <div>Total Interest: <span className="font-bold text-purple-600">{fmt(results.consolidationTotalInterest)}</span></div>
                  <div>Total Cost: <span className="font-bold text-emerald-600">{fmt(results.consolidationTotalCost)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REAL APR & FEE THRESHOLD */}
      {activeTab === "realApr" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Percent className="h-5 w-5 text-emerald-500" /> Real Effective APR &amp; Max Fee Threshold Analysis
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Upfront fees increase your actual cost of borrowing. Real APR incorporates origination fees amortized over your loan term.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-2">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 text-sm block">Nominal APR</span>
              <div className="text-3xl font-extrabold text-blue-600">{results.consolidationApr.toFixed(2)}%</div>
              <p className="font-sans text-[11px] text-zinc-500">Advertised interest rate before adding origination fees.</p>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2">
              <span className="font-sans font-bold text-indigo-900 dark:text-indigo-200 text-sm block">Real Effective APR</span>
              <div className="text-3xl font-extrabold text-indigo-600">{results.realApr.toFixed(2)}%</div>
              <p className="font-sans text-[11px] text-zinc-500">Includes {fmt(results.upfrontFeeAmount)} upfront fee spread over {results.termMonths} months.</p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <span className="font-sans font-bold text-emerald-900 dark:text-emerald-200 text-sm block">Max Fee Threshold</span>
              <div className="text-3xl font-extrabold text-emerald-600">{results.maxFeeThresholdPercent.toFixed(2)}%</div>
              <p className="font-sans text-[11px] text-zinc-500">Maximum origination fee % before consolidation loses profitability.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 0% BALANCE TRANSFER CARD COMPARISON */}
      {activeTab === "balTransfer" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" /> 0% Intro APR Balance Transfer Card Alternative
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Compare your consolidation loan against transferring your debt to a 0% intro APR credit card with a 3% transfer fee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-indigo-900 dark:text-indigo-200 text-sm block border-b pb-1">Fixed Consolidation Loan</span>
              <div>Term Duration: <span className="font-bold">{results.termMonths} Months</span></div>
              <div>Monthly Payment: <span className="font-bold text-blue-600">{fmt(results.consolidationMonthlyPayment)}</span></div>
              <div>Total Interest Paid: <span className="font-bold text-purple-600">{fmt(results.consolidationTotalInterest)}</span></div>
              <div>Total Cost: <span className="font-bold text-emerald-600">{fmt(results.consolidationTotalCost)}</span></div>
            </div>

            <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-amber-900 dark:text-amber-200 text-sm block border-b pb-1">18-Month 0% Balance Transfer Card</span>
              <div>Transfer Fee (3%): <span className="font-bold text-amber-600">{fmt(results.btFeeAmount)}</span></div>
              <div>Required Monthly Pmt: <span className="font-bold text-blue-600">{fmt(results.btRequiredMonthlyPayment)}</span></div>
              <div>Total Interest Paid: <span className="font-bold text-emerald-600">$0.00 (0% APR)</span></div>
              <div>Total Cost: <span className="font-bold text-emerald-600">{fmt(results.btTotalCost)}</span></div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 rounded-xl text-xs flex justify-between items-center font-mono shadow-sm">
            <div>
              <span className="text-amber-100 block text-[10px] uppercase font-semibold">0% Balance Transfer Savings vs Consolidation</span>
              <span className="text-base font-extrabold">{fmt(results.consolidationTotalCost - results.btTotalCost)} Cheaper!</span>
            </div>
            <div className="text-right">
              <span className="text-amber-100 block text-[10px] uppercase font-semibold">Required Monthly Payoff</span>
              <span className="text-xl font-extrabold">{fmt(results.btRequiredMonthlyPayment)}/mo</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VISUAL COST BREAKDOWN & CHARTS */}
      {activeTab === "charts" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" /> Total Cost &amp; Interest Paid Comparison Chart
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}`} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, "Amount"]} />
                <Legend />
                <Bar dataKey="TotalInterest" fill="#ef4444" name="Total Interest Paid ($)" />
                <Bar dataKey="TotalCost" fill="#3b82f6" name="Total Cost ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* TAB 5: AMORTIZATION COMPARISON TABLE */}
      {activeTab === "schedule" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-purple-500" /> Side-by-Side Monthly Amortization Schedule
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
                  <th className="p-2.5">Month #</th>
                  <th className="p-2.5 text-right">Current Plan Bal</th>
                  <th className="p-2.5 text-right">Current Pmt</th>
                  <th className="p-2.5 text-right text-indigo-600">Consolidation Bal</th>
                  <th className="p-2.5 text-right text-indigo-600">Consolidation Pmt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px] font-mono">
                {results.consolidationSchedule.slice(0, 36).map((r) => {
                  const cRow = results.currentSchedule.find((c) => c.month === r.month) || { balance: 0, payment: 0 };
                  return (
                    <tr key={r.month} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                      <td className="p-2.5 font-bold text-zinc-800 dark:text-zinc-200">Month {r.month}</td>
                      <td className="p-2.5 text-right text-red-500">{fmt(cRow.balance)}</td>
                      <td className="p-2.5 text-right">{fmt(cRow.payment)}</td>
                      <td className="p-2.5 text-right font-bold text-indigo-600">{fmt(r.balance)}</td>
                      <td className="p-2.5 text-right font-bold text-emerald-600">{fmt(r.payment)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 20 FAQs */}
      <DebtConsolidationContent />
    </div>
  );
}
