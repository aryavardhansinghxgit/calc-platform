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
  FileText,
  Target,
  Zap,
  ShieldCheck,
  Percent,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import { PresentValueContent } from "./PresentValueContent";
import {
  calculatePresentValue,
  CompoundingFrequency,
  ContributionFrequency,
  TimingOption,
  PresentValueInput,
  PVScheduleRow,
} from "@/lib/calculator-engine/formulas/present-value";

const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "INR", symbol: "₹" },
  { code: "CAD", symbol: "$" },
  { code: "AUD", symbol: "$" },
  { code: "SGD", symbol: "$" },
  { code: "AED", symbol: "DH" },
];

export function PresentValueCalculator() {
  // Tab Selection: 'standard' | 'npv' | 'sensitivity' | 'compare'
  const [activeTab, setActiveTab] = useState<"standard" | "npv" | "sensitivity" | "compare">("standard");

  // Currency
  const [currency, setCurrency] = useState("USD");
  const currencySymbol = CURRENCIES.find((c) => c.code === currency)?.symbol || "$";

  // Standard Inputs
  const [futureValue, setFutureValue] = useState<number>(50000);
  const [periodicPayment, setPeriodicPayment] = useState<number>(500);
  const [discountRate, setDiscountRate] = useState<number>(7.0);
  const [years, setYears] = useState<number>(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>("monthly");
  const [paymentFrequency, setPaymentFrequency] = useState<ContributionFrequency>("monthly");
  const [paymentTiming, setPaymentTiming] = useState<TimingOption>("end");

  // Advanced Inputs
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [growthRate, setGrowthRate] = useState<number>(0);
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [taxRate, setTaxRate] = useState<number>(0);

  // NPV Custom Cash Flows State
  const [initialOutlay, setInitialOutlay] = useState<number>(100000);
  const [unevenCashFlows, setUnevenCashFlows] = useState<number[]>([15000, 25000, 35000, 40000, 45000]);

  // Schedule Table State
  const [scheduleView, setScheduleView] = useState<"yearly" | "monthly">("yearly");
  const [scheduleSearch, setScheduleSearch] = useState("");
  const [schedulePage, setSchedulePage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modal & Clipboard Notification
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Preset Handler
  const applyPreset = (preset: "treasury" | "corporate" | "realestate" | "equity") => {
    switch (preset) {
      case "treasury":
        setDiscountRate(4.5);
        break;
      case "corporate":
        setDiscountRate(6.5);
        break;
      case "realestate":
        setDiscountRate(8.5);
        break;
      case "equity":
        setDiscountRate(10.0);
        break;
    }
  };

  // Main Calculation Result
  const calcInput: PresentValueInput = useMemo(
    () => ({
      futureValue,
      periodicPayment,
      discountRate,
      years,
      compoundingFrequency,
      paymentFrequency,
      paymentTiming,
      growthRate: showAdvanced ? growthRate : 0,
      inflationRate: showAdvanced ? inflationRate : 0,
      taxRate: showAdvanced ? taxRate : 0,
      unevenCashFlows,
      initialOutlay,
    }),
    [
      futureValue,
      periodicPayment,
      discountRate,
      years,
      compoundingFrequency,
      paymentFrequency,
      paymentTiming,
      showAdvanced,
      growthRate,
      inflationRate,
      taxRate,
      unevenCashFlows,
      initialOutlay,
    ]
  );

  const results = useMemo(() => calculatePresentValue(calcInput), [calcInput]);

  // Formatting Helper
  const fmt = (val: number) => {
    return `${currencySymbol}${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Schedule Rows Filtering
  const scheduleRows = scheduleView === "yearly" ? results.yearlySchedule : results.monthlySchedule;
  const filteredScheduleRows = useMemo(() => {
    if (!scheduleSearch.trim()) return scheduleRows;
    return scheduleRows.filter(
      (r) =>
        String(r.year).includes(scheduleSearch) ||
        (r.period && String(r.period).includes(scheduleSearch)) ||
        String(r.presentValue).includes(scheduleSearch)
    );
  }, [scheduleRows, scheduleSearch]);

  const totalPages = Math.ceil(filteredScheduleRows.length / rowsPerPage);
  const paginatedSchedule = useMemo(() => {
    const start = (schedulePage - 1) * rowsPerPage;
    return filteredScheduleRows.slice(start, start + rowsPerPage);
  }, [filteredScheduleRows, schedulePage, rowsPerPage]);

  // CSV Export
  const exportCSV = () => {
    const headers = ["Year", "Period", "Future Cash Flow", "Discount Factor", "Present Value", "Cumulative PV"];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...scheduleRows.map((r) =>
          [r.year, r.period || "-", r.futureCashFlow, r.discountFactor, r.presentValue, r.cumulativePV].join(",")
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `present_value_schedule_${scheduleView}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary
  const copySummary = () => {
    const summaryText = `Present Value Analysis Summary (${currency}):
------------------------------------------------
Present Value (PV): ${fmt(results.presentValue)}
Lump Sum PV: ${fmt(results.lumpSumPV)}
Annuity PV: ${fmt(results.annuityPV)}
Total Future Cash Flows: ${fmt(results.totalFutureCashFlows)}
Total Discount Amount: ${fmt(results.totalDiscountAmount)}
Discount Ratio: ${results.discountRatioPct}%
Effective Annual Rate: ${results.effectiveDiscountRate}%
Real Inflation-Adjusted PV: ${fmt(results.realPresentValue)}`;

    navigator.clipboard.writeText(summaryText);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Add & Remove Cash Flow rows for NPV tab
  const addCashFlow = () => {
    setUnevenCashFlows([...unevenCashFlows, 20000]);
  };
  const removeCashFlow = (index: number) => {
    setUnevenCashFlows(unevenCashFlows.filter((_, i) => i !== index));
  };
  const updateCashFlow = (index: number, val: number) => {
    const next = [...unevenCashFlows];
    next[index] = val;
    setUnevenCashFlows(next);
  };

  // Report Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Present Value Calculator",
      reportTitle: "Present Value Valuation & Discounting Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol,
    },
    keyMetrics: [
      { label: "Present Value (PV)", value: fmt(results.presentValue), subtitle: "Discounted Current Worth", colorTheme: "blue" },
      { label: "Future Cash Flows", value: fmt(results.totalFutureCashFlows), subtitle: "Nominal Sum Payout", colorTheme: "emerald" },
      { label: "Discount Amount", value: fmt(results.totalDiscountAmount), subtitle: "Time Value Discount", colorTheme: "purple" },
      { label: "Effective Discount", value: `${results.effectiveDiscountRate}%`, subtitle: "Annual Compound Discount", colorTheme: "amber" },
    ],
    sections: [
      {
        title: "Executive Summary",
        items: [
          { label: "Present Value (PV)", value: fmt(results.presentValue), highlight: true },
          { label: "Lump Sum PV", value: fmt(results.lumpSumPV) },
          { label: "Annuity Payments PV", value: fmt(results.annuityPV) },
          { label: "Total Nominal Cash Flows", value: fmt(results.totalFutureCashFlows) },
          { label: "Total Discount Amount", value: fmt(results.totalDiscountAmount) },
          { label: "Discount Ratio", value: `${results.discountRatioPct}%` },
        ],
      },
      {
        title: "Input Parameters & Rates",
        items: [
          { label: "Duration", value: `${years} Years` },
          { label: "Annual Discount Rate", value: `${discountRate}%` },
          { label: "Future Lump Sum (FV)", value: fmt(futureValue) },
          { label: "Periodic Payment (PMT)", value: fmt(periodicPayment) },
          { label: "Compounding Frequency", value: compoundingFrequency },
          { label: "Payment Timing", value: paymentTiming === "beginning" ? "Annuity Due (Start)" : "Ordinary Annuity (End)" },
        ],
      },
    ],
    table: {
      title: "Annual Discounting Schedule",
      headers: [
        { key: "year", label: "Year" },
        { key: "futureCashFlow", label: "Future Cash Flow" },
        { key: "discountFactor", label: "Discount Factor" },
        { key: "presentValue", label: "Present Value" },
        { key: "cumulativePV", label: "Cumulative PV" },
      ],
      rows: results.yearlySchedule.map((r) => ({
        year: `Year ${r.year}`,
        futureCashFlow: fmt(r.futureCashFlow),
        discountFactor: String(r.discountFactor),
        presentValue: fmt(r.presentValue),
        cumulativePV: fmt(r.cumulativePV),
      })),
    },
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 gap-1 text-xs">
            <Sparkles className="h-3 w-3" /> Pro Valuation Model
          </Badge>

          {/* Currency Dropdown */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md px-2 py-1 font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} ({c.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-zinc-500 font-medium mr-1">Hurdle Presets:</span>
          <button
            type="button"
            onClick={() => applyPreset("treasury")}
            className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 rounded-md transition-colors font-medium cursor-pointer"
          >
            Treasury (4.5%)
          </button>
          <button
            type="button"
            onClick={() => applyPreset("corporate")}
            className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 rounded-md transition-colors font-medium cursor-pointer"
          >
            Corporate (6.5%)
          </button>
          <button
            type="button"
            onClick={() => applyPreset("realestate")}
            className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 rounded-md transition-colors font-medium cursor-pointer"
          >
            Real Estate (8.5%)
          </button>
          <button
            type="button"
            onClick={() => applyPreset("equity")}
            className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 rounded-md transition-colors font-medium cursor-pointer"
          >
            Equity (10%)
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("standard")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "standard"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <DollarSign className="h-4 w-4" /> Standard PV Calculator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("npv")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "npv"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Layers className="h-4 w-4 text-emerald-500" /> Uneven Cash Flows (NPV)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("sensitivity")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "sensitivity"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Sliders className="h-4 w-4 text-purple-500" /> Sensitivity Analysis
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("compare")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "compare"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <BarChart3 className="h-4 w-4 text-amber-500" /> Scenario Comparison
        </button>
      </div>

      {/* TAB 1: STANDARD PV CALCULATOR */}
      {activeTab === "standard" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Inputs (5 Cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Discounting Inputs
            </h3>

            {/* Future Value (FV) Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Future Target Sum (FV)</span>
                <span className="font-mono text-blue-600">{fmt(futureValue)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">{currencySymbol}</span>
                <Input
                  type="number"
                  min="0"
                  step="1000"
                  value={futureValue}
                  onChange={(e) => setFutureValue(Math.max(0, Number(e.target.value)))}
                  className="pl-7 text-xs font-mono"
                />
              </div>
            </div>

            {/* Periodic Payment (PMT) Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Periodic Cash Deposit (PMT)</span>
                <span className="font-mono text-emerald-600">{fmt(periodicPayment)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">{currencySymbol}</span>
                <Input
                  type="number"
                  min="0"
                  step="50"
                  value={periodicPayment}
                  onChange={(e) => setPeriodicPayment(Math.max(0, Number(e.target.value)))}
                  className="pl-7 text-xs font-mono"
                />
              </div>
            </div>

            {/* Discount Rate */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Annual Discount Rate (%)</span>
                <span className="font-mono text-purple-600">{discountRate}%</span>
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0.1"
                  max="100"
                  step="0.1"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(Math.max(0.1, Number(e.target.value)))}
                  className="text-xs font-mono"
                />
                <input
                  type="range"
                  min="0.5"
                  max="25"
                  step="0.1"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Years */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Timeframe (Years)</span>
                <span className="font-mono text-blue-600">{years} Years</span>
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={years}
                  onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
                  className="text-xs font-mono"
                />
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Compounding & Payment Frequencies */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Compounding</label>
                <select
                  value={compoundingFrequency}
                  onChange={(e) => setCompoundingFrequency(e.target.value as CompoundingFrequency)}
                  className="w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semi-annually">Semi-Annually</option>
                  <option value="annually">Annually</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Payment Freq</label>
                <select
                  value={paymentFrequency}
                  onChange={(e) => setPaymentFrequency(e.target.value as ContributionFrequency)}
                  className="w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semi-annually">Semi-Annually</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            </div>

            {/* Payment Timing */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 block">Payment Timing</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentTiming("end")}
                  className={`p-2 rounded-md border font-medium cursor-pointer text-center transition-all ${
                    paymentTiming === "end"
                      ? "bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-700 dark:text-blue-300"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  End (Ordinary Annuity)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTiming("beginning")}
                  className={`p-2 rounded-md border font-medium cursor-pointer text-center transition-all ${
                    paymentTiming === "beginning"
                      ? "bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-700 dark:text-blue-300"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Beginning (Annuity Due)
                </button>
              </div>
            </div>

            {/* Advanced Toggle */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5" /> Advanced (Growing Annuity & Inflation)
                </span>
                {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {showAdvanced && (
                <div className="space-y-3 mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-600">PMT Growth Rate (% g)</label>
                      <Input
                        type="number"
                        min="0"
                        step="0.5"
                        value={growthRate}
                        onChange={(e) => setGrowthRate(Number(e.target.value))}
                        className="text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-600">Inflation Rate (%)</label>
                      <Input
                        type="number"
                        min="0"
                        step="0.1"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(Number(e.target.value))}
                        className="text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Results Dashboard & Recharts (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Result Card */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-300">
                  Calculated Present Value (PV)
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

              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 font-mono">
                {fmt(results.presentValue)}
              </div>

              {showAdvanced && inflationRate > 0 && (
                <div className="text-xs text-blue-200 font-medium">
                  Real Purchasing Power (Inflation-Adjusted): <span className="font-bold font-mono text-emerald-400">{fmt(results.realPresentValue)}</span>
                </div>
              )}

              {/* Secondary Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">Lump Sum PV</div>
                  <div className="font-bold font-mono text-white text-sm">{fmt(results.lumpSumPV)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Annuity PV</div>
                  <div className="font-bold font-mono text-emerald-400 text-sm">{fmt(results.annuityPV)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Future Cash Flows</div>
                  <div className="font-bold font-mono text-purple-300 text-sm">{fmt(results.totalFutureCashFlows)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Total Discount</div>
                  <div className="font-bold font-mono text-amber-300 text-sm">{fmt(results.totalDiscountAmount)}</div>
                </div>
              </div>
            </div>

            {/* Insight Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-semibold">Discount Ratio</div>
                <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                  {results.discountRatioPct}%
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-semibold">Effective Rate</div>
                <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 font-mono mt-0.5">
                  {results.effectiveDiscountRate}%
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-semibold">Lump Sum Share</div>
                <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                  {results.presentValue > 0 ? ((results.lumpSumPV / results.presentValue) * 100).toFixed(0) : 0}%
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-semibold">Annuity Share</div>
                <div className="text-base font-extrabold text-amber-600 dark:text-amber-400 font-mono mt-0.5">
                  {results.presentValue > 0 ? ((results.annuityPV / results.presentValue) * 100).toFixed(0) : 0}%
                </div>
              </div>
            </div>

            {/* Recharts Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                <span>Discounting Accumulation Curve</span>
                <span className="text-[10px] text-zinc-400">Recharts Visualization</span>
              </h4>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.yearlySchedule}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10 }}
                      tickFormatter={(v) => `${currencySymbol}${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      formatter={(value: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, ""]}
                      labelFormatter={(label) => `Year ${label}`}
                      contentStyle={{ backgroundColor: "#1f2937", borderRadius: "8px", border: "none", color: "#fff" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px" }} />
                    <Line type="monotone" dataKey="cumulativePV" name="Cumulative Present Value" stroke="#3b82f6" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="futureCashFlow" name="Nominal Cash Flow" stroke="#10b981" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UNEVEN CASH FLOWS & NPV */}
      {activeTab === "npv" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <Layers className="h-6 w-6 text-emerald-500" />
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Net Present Value (NPV) & Custom Cash Flows Calculator
                </h3>
                <p className="text-xs text-zinc-500">
                  Enter multi-year custom cash inflows and initial capital outlay to compute exact Net Present Value (NPV).
                </p>
              </div>
            </div>

            <Button type="button" size="sm" onClick={addCashFlow} className="h-8 text-xs gap-1 cursor-pointer">
              <Plus className="h-3.5 w-3.5" /> Add Year Cash Flow
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Inputs Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Initial Outlay / Investment (CF₀)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">{currencySymbol}</span>
                  <Input
                    type="number"
                    value={initialOutlay}
                    onChange={(e) => setInitialOutlay(Number(e.target.value))}
                    className="pl-7 text-xs font-mono text-rose-600 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Yearly Cash Inflows (CF₁ to CFₙ)</label>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {unevenCashFlows.map((cf, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-zinc-500 min-w-[50px]">Year {idx + 1}:</span>
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-2 text-xs text-zinc-400">{currencySymbol}</span>
                        <Input
                          type="number"
                          value={cf}
                          onChange={(e) => updateCashFlow(idx, Number(e.target.value))}
                          className="pl-7 text-xs font-mono h-8"
                        />
                      </div>
                      {unevenCashFlows.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCashFlow(idx)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-6 flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-8 shadow-md text-center space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-300">
                Calculated Net Present Value (NPV)
              </span>

              <div className={`text-4xl sm:text-5xl font-extrabold font-mono ${results.npvResult && results.npvResult >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {fmt(results.npvResult || 0)}
              </div>

              <p className="text-xs text-zinc-300 max-w-md">
                {results.npvResult && results.npvResult >= 0
                  ? "✓ Positive NPV: This project exceeds the required hurdle rate and adds net economic value."
                  : "✗ Negative NPV: The expected cash flows do not meet the minimum required discount rate."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SENSITIVITY ANALYSIS */}
      {activeTab === "sensitivity" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <Sliders className="h-6 w-6 text-purple-500" />
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Discount Rate Sensitivity Matrix
              </h3>
              <p className="text-xs text-zinc-500">
                Evaluate how Present Value responds to changes in the discount rate (±1% to ±3%).
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-3 border-b border-zinc-200 dark:border-zinc-700">Discount Rate (%)</th>
                  <th className="p-3 border-b border-zinc-200 dark:border-zinc-700">Lump Sum PV</th>
                  <th className="p-3 border-b border-zinc-200 dark:border-zinc-700">Annuity PV</th>
                  <th className="p-3 border-b border-zinc-200 dark:border-zinc-700">Total Present Value</th>
                  <th className="p-3 border-b border-zinc-200 dark:border-zinc-700 text-right">Discount Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-mono text-[11px]">
                {results.sensitivityMatrix.map((point, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${
                      point.rate === discountRate ? "bg-blue-50/70 dark:bg-blue-950/40 font-bold" : ""
                    }`}
                  >
                    <td className="p-3 text-purple-600 font-bold">{point.rate}%</td>
                    <td className="p-3 text-zinc-600 dark:text-zinc-400">{fmt(point.lumpSumPV)}</td>
                    <td className="p-3 text-emerald-600">{fmt(point.annuityPV)}</td>
                    <td className="p-3 font-bold text-blue-600">{fmt(point.totalPV)}</td>
                    <td className="p-3 text-right text-amber-600">{fmt(point.discountAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SCENARIO COMPARISON */}
      {activeTab === "compare" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <BarChart3 className="h-6 w-6 text-amber-500" />
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Side-by-Side Scenario Comparison
              </h3>
              <p className="text-xs text-zinc-500">
                Compare Conservative, Moderate (Base), and Aggressive hurdle rate valuations side by side.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Conservative */}
            <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Conservative</span>
                <Badge variant="outline" className="text-[10px] text-purple-600">
                  {results.scenarios.conservative.discountRate}% Rate
                </Badge>
              </div>
              <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 font-mono">
                {fmt(results.scenarios.conservative.presentValue)}
              </div>
              <div className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between"><span>Nominal Flows:</span> <span className="font-mono">{fmt(results.scenarios.conservative.futureCashFlowTotal)}</span></div>
                <div className="flex justify-between"><span>Discount:</span> <span className="font-mono text-amber-600">{fmt(results.scenarios.conservative.discountAmount)}</span></div>
                <div className="flex justify-between"><span>Discount Ratio:</span> <span className="font-mono">{results.scenarios.conservative.discountRatioPct}%</span></div>
              </div>
            </div>

            {/* Moderate */}
            <div className="bg-blue-50/50 dark:bg-blue-950/20 border-2 border-blue-500 rounded-xl p-5 space-y-3 relative">
              <Badge className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px]">Base Case</Badge>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300">Moderate</span>
                <Badge variant="outline" className="text-[10px] text-blue-600">
                  {results.scenarios.moderate.discountRate}% Rate
                </Badge>
              </div>
              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                {fmt(results.scenarios.moderate.presentValue)}
              </div>
              <div className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between"><span>Nominal Flows:</span> <span className="font-mono">{fmt(results.scenarios.moderate.futureCashFlowTotal)}</span></div>
                <div className="flex justify-between"><span>Discount:</span> <span className="font-mono text-amber-600">{fmt(results.scenarios.moderate.discountAmount)}</span></div>
                <div className="flex justify-between"><span>Discount Ratio:</span> <span className="font-mono">{results.scenarios.moderate.discountRatioPct}%</span></div>
              </div>
            </div>

            {/* Aggressive */}
            <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Aggressive</span>
                <Badge variant="outline" className="text-[10px] text-emerald-600">
                  {results.scenarios.aggressive.discountRate}% Rate
                </Badge>
              </div>
              <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 font-mono">
                {fmt(results.scenarios.aggressive.presentValue)}
              </div>
              <div className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between"><span>Nominal Flows:</span> <span className="font-mono">{fmt(results.scenarios.aggressive.futureCashFlowTotal)}</span></div>
                <div className="flex justify-between"><span>Discount:</span> <span className="font-mono text-amber-600">{fmt(results.scenarios.aggressive.discountAmount)}</span></div>
                <div className="flex justify-between"><span>Discount Ratio:</span> <span className="font-mono">{results.scenarios.aggressive.discountRatioPct}%</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACCUMULATION / DISCOUNT SCHEDULE TABLE */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Discounting Schedule Table
            </h4>
            <div className="flex border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden text-[11px]">
              <button
                type="button"
                onClick={() => setScheduleView("yearly")}
                className={`px-2.5 py-1 font-medium cursor-pointer ${
                  scheduleView === "yearly" ? "bg-blue-600 text-white" : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                Yearly
              </button>
              <button
                type="button"
                onClick={() => setScheduleView("monthly")}
                className={`px-2.5 py-1 font-medium cursor-pointer ${
                  scheduleView === "monthly" ? "bg-blue-600 text-white" : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search schedule..."
                value={scheduleSearch}
                onChange={(e) => setScheduleSearch(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <Button type="button" variant="outline" size="sm" onClick={exportCSV} className="h-7 text-xs gap-1 cursor-pointer">
              <Download className="h-3 w-3" /> Export CSV
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Period</th>
                <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Future Cash Flow</th>
                <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Discount Factor</th>
                <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Present Value</th>
                <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700 text-right">Cumulative PV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-mono text-[11px]">
              {paginatedSchedule.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="p-2.5 font-sans font-medium text-zinc-800 dark:text-zinc-200">
                    {scheduleView === "yearly" ? `Year ${row.year}` : `Month ${row.period}`}
                  </td>
                  <td className="p-2.5 text-zinc-600 dark:text-zinc-400">{fmt(row.futureCashFlow)}</td>
                  <td className="p-2.5 text-purple-600 font-medium">{row.discountFactor}</td>
                  <td className="p-2.5 text-emerald-600 font-medium">{fmt(row.presentValue)}</td>
                  <td className="p-2.5 text-right font-bold text-zinc-900 dark:text-zinc-100">{fmt(row.cumulativePV)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between text-xs text-zinc-500 pt-2">
          <span>
            Page {schedulePage} of {totalPages || 1} ({filteredScheduleRows.length} total rows)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={schedulePage <= 1}
              onClick={() => setSchedulePage((p) => Math.max(1, p - 1))}
              className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={schedulePage >= totalPages}
              onClick={() => setSchedulePage((p) => Math.min(totalPages, p + 1))}
              className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 20 FAQs */}
      <PresentValueContent />
    </div>
  );
}
