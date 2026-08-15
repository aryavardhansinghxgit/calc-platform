"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Calculator as CalcIcon,
  ShieldCheck,
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
  ArrowRightLeft,
  ArrowRight,
  Gauge,
  Percent,
  Zap,
  BookOpen,
  HelpCircle,
  BarChart3,
  Layers,
  Repeat,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  SimpleInterestMode,
  TimeUnit,
  calculateSimpleInterestFormula,
} from "@/lib/calculator-engine/formulas/simple-interest";
import { SimpleInterestContent } from "./SimpleInterestContent";

export function SimpleInterestCalculator() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [activeMode, setActiveMode] = useState<SimpleInterestMode>("balance");
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");
  const [principalInput, setPrincipalInput] = useState<string>("20000");
  const [rateInput, setRateInput] = useState<string>("3.0");
  const [termInput, setTermInput] = useState<string>("10");
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("years");
  const [targetInterestInput, setTargetInterestInput] = useState<string>("6000");
  const [targetBalanceInput, setTargetBalanceInput] = useState<string>("26000");

  const [showFormulaPanel, setShowFormulaPanel] = useState<boolean>(true);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [savedScenarios, setSavedScenarios] = useState<{ name: string; result: string; date: string }[]>([]);
  const [shareToast, setShareToast] = useState<boolean>(false);

  // Parse numeric values safely
  const parsedPrincipal = useMemo(() => {
    const p = parseFloat(principalInput);
    return isNaN(p) || p < 0 ? 0 : p;
  }, [principalInput]);

  const parsedRate = useMemo(() => {
    const r = parseFloat(rateInput);
    return isNaN(r) || r < 0 ? 0 : r;
  }, [rateInput]);

  const parsedTerm = useMemo(() => {
    const t = parseFloat(termInput);
    return isNaN(t) || t < 0 ? 0 : t;
  }, [termInput]);

  const parsedTargetInterest = useMemo(() => {
    const i = parseFloat(targetInterestInput);
    return isNaN(i) || i < 0 ? 0 : i;
  }, [targetInterestInput]);

  const parsedTargetBalance = useMemo(() => {
    const b = parseFloat(targetBalanceInput);
    return isNaN(b) || b < 0 ? 0 : b;
  }, [targetBalanceInput]);

  // Execute Simple Interest Math Engine
  const results = useMemo(
    () =>
      calculateSimpleInterestFormula({
        mode: activeMode,
        principal: parsedPrincipal,
        annualRatePercent: parsedRate,
        term: parsedTerm,
        timeUnit,
        targetInterest: parsedTargetInterest,
        targetFinalBalance: parsedTargetBalance,
        currencySymbol,
      }),
    [
      activeMode,
      parsedPrincipal,
      parsedRate,
      parsedTerm,
      timeUnit,
      parsedTargetInterest,
      parsedTargetBalance,
      currencySymbol,
    ]
  );

  // Recharts Chart Data
  const doughnutData = useMemo(
    () => [
      { name: "Principal Amount", value: results.principal, color: "#3b82f6" },
      { name: "Total Interest", value: results.totalInterest, color: "#10b981" },
    ],
    [results.principal, results.totalInterest]
  );

  const chartComparisonData = useMemo(
    () => [
      {
        name: "Simple Interest",
        Interest: results.comparison.simpleInterestTotal,
        Balance: results.comparison.simpleFinalBalance,
      },
      {
        name: "Compound Interest (Monthly)",
        Interest: results.comparison.compoundInterestTotal,
        Balance: results.comparison.compoundFinalBalance,
      },
    ],
    [results.comparison]
  );

  // Build report data for Executive PDF Modal
  const reportData: CalculatorReportData = useMemo(
    () => ({
      meta: {
        calculatorName: "Simple Interest Calculator",
        reportTitle: "Simple Interest & Yield Derivation Executive Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        currencySymbol,
      },
      keyMetrics: [
        { label: "Final Ending Balance", value: `${currencySymbol}${results.finalBalance.toLocaleString()}`, colorTheme: "blue" },
        { label: "Total Simple Interest", value: `${currencySymbol}${results.totalInterest.toLocaleString()}`, colorTheme: "emerald" },
        { label: "Initial Principal", value: `${currencySymbol}${results.principal.toLocaleString()}`, colorTheme: "purple" },
        { label: "Return on Investment (ROI)", value: `${results.roiPercent.toFixed(2)}%`, colorTheme: "amber" },
      ],
      sections: [
        {
          title: "Calculation Parameters & Outputs",
          items: [
            { label: "Calculation Mode", value: activeMode.toUpperCase() },
            { label: "Annual Rate of Interest", value: `${results.annualRatePercent}%` },
            { label: "Term Duration", value: `${results.term} ${results.timeUnit}` },
            { label: "Interest Earned Per Year", value: `${currencySymbol}${results.interestPerYear.toLocaleString()}/yr` },
            { label: "Interest Earned Per Month", value: `${currencySymbol}${results.interestPerMonth.toLocaleString()}/mo` },
          ],
        },
        {
          title: "Simple vs Compound Comparison",
          items: [
            { label: "Simple Interest Balance", value: `${currencySymbol}${results.comparison.simpleFinalBalance.toLocaleString()}` },
            { label: "Compound Interest Balance (Monthly)", value: `${currencySymbol}${results.comparison.compoundFinalBalance.toLocaleString()}` },
            { label: "Compounding Bonus Wealth", value: `+${currencySymbol}${results.comparison.interestDifference.toLocaleString()} (+${results.comparison.additionalWealthPercent.toFixed(2)}%)` },
          ],
        },
      ],
      table: {
        title: "Yearly Interest Accumulation Schedule",
        headers: [
          { key: "year", label: "Year" },
          { key: "openingBalance", label: "Opening Balance" },
          { key: "interestEarned", label: "Interest Earned" },
          { key: "closingBalance", label: "Closing Balance" },
        ],
        rows: results.schedule as any,
      },
      notes: [
        `Simple interest is calculated strictly on the initial principal base of ${currencySymbol}${results.principal.toLocaleString()}.`,
        `Annual earnings remain linear at ${currencySymbol}${results.interestPerYear.toLocaleString()}/year over the ${results.termInYears.toFixed(2)}-year horizon.`,
      ],
    }),
    [currencySymbol, results, activeMode]
  );

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = ["Year", "Opening Balance", "Interest Earned", "Closing Balance"];
    const rows = results.schedule.map((r) => [r.year, r.openingBalance, r.interestEarned, r.closingBalance]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `simple_interest_schedule_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveScenario = () => {
    const newSaved = [
      ...savedScenarios,
      {
        name: `Simple Interest (${currencySymbol}${results.principal.toLocaleString()} @ ${results.annualRatePercent}%)`,
        result: `${currencySymbol}${results.finalBalance.toLocaleString()}`,
        date: new Date().toLocaleDateString(),
      },
    ];
    setSavedScenarios(newSaved);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      {/* ==========================================
          SECTION 1: HERO HEADER & QUICK ACTIONS
         ========================================== */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <TrendingUp className="h-3.5 w-3.5" /> Simple Interest Engine
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-medium border border-emerald-400/30">
              <Zap className="h-3 w-3" /> 4 Operational Modes
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Simple Interest Calculator
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/80 mt-1 max-w-3xl leading-relaxed">
              Calculate simple interest earned or paid, solve for Principal, Rate, or Term, auto-convert time units, view step-by-step mathematical solutions, export schedule tables, and compare simple vs compound growth.
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Solve for Balance / Principal / Rate / Term
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Years / Months / Weeks / Days Support
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Export Schedule (CSV / PDF)
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Simple vs Compound Comparison
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Printable PDF Executive Report
            </Badge>
          </div>
        </div>
      </div>

      {/* ==========================================
          ACTION CONTROLS BAR
         ========================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
          <Sliders className="h-4 w-4 text-blue-600" /> Calculation Controls
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Currency Selector */}
          <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg text-xs font-medium">
            <span className="text-zinc-500 pl-1">Currency:</span>
            {["$", "€", "£", "¥", "₹"].map((cur) => (
              <button
                key={cur}
                type="button"
                onClick={() => setCurrencySymbol(cur)}
                className={`px-2 py-0.5 rounded font-sans tabular-nums font-bold text-xs transition-colors ${
                  currencySymbol === cur
                    ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                {cur}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveScenario}
            className="h-8 text-xs font-semibold gap-1.5"
          >
            <Bookmark className="h-3.5 w-3.5 text-indigo-500" /> Save
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsReportOpen(true)}
            className="h-8 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white gap-1.5"
          >
            <Printer className="h-3.5 w-3.5" /> Printable PDF Report
          </Button>
        </div>
      </div>

      {shareToast && (
        <div className="p-3 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Link copied to clipboard!
        </div>
      )}

      {/* ==========================================
          MAIN CALCULATOR GRID (COL-7 INPUTS | COL-5 DASHBOARD)
         ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: 4 OPERATIONAL MODES & FORMULAS (COL 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* MODE TABS CARD */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
            {/* Tab Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
              {[
                { id: "balance", label: "Final Balance" },
                { id: "principal", label: "Principal" },
                { id: "rate", label: "Interest Rate" },
                { id: "term", label: "Term Length" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveMode(tab.id as SimpleInterestMode)}
                  className={`py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeMode === tab.id
                      ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Inputs based on Active Mode */}
            <div className="space-y-4 pt-1">
              {/* MODE 1: BALANCE */}
              {activeMode === "balance" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Principal Deposit / Borrowed Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">
                        {currencySymbol}
                      </span>
                      <Input
                        type="number"
                        value={principalInput}
                        onChange={(e) => setPrincipalInput(e.target.value)}
                        className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Annual Interest Rate (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={rateInput}
                        onChange={(e) => setRateInput(e.target.value)}
                        className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Term Duration & Unit
                      </label>
                      <div className="flex gap-1.5">
                        <Input
                          type="number"
                          value={termInput}
                          onChange={(e) => setTermInput(e.target.value)}
                          className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 flex-1"
                        />
                        <select
                          value={timeUnit}
                          onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
                          className="h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs px-2 font-medium text-zinc-900 dark:text-zinc-100"
                        >
                          <option value="years">Years</option>
                          <option value="months">Months</option>
                          <option value="weeks">Weeks</option>
                          <option value="days">Days</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* MODE 2: PRINCIPAL */}
              {activeMode === "principal" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Target Interest Earned ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">
                        {currencySymbol}
                      </span>
                      <Input
                        type="number"
                        value={targetInterestInput}
                        onChange={(e) => setTargetInterestInput(e.target.value)}
                        className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Annual Interest Rate (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={rateInput}
                        onChange={(e) => setRateInput(e.target.value)}
                        className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Term Duration & Unit
                      </label>
                      <div className="flex gap-1.5">
                        <Input
                          type="number"
                          value={termInput}
                          onChange={(e) => setTermInput(e.target.value)}
                          className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 flex-1"
                        />
                        <select
                          value={timeUnit}
                          onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
                          className="h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs px-2 font-medium text-zinc-900 dark:text-zinc-100"
                        >
                          <option value="years">Years</option>
                          <option value="months">Months</option>
                          <option value="weeks">Weeks</option>
                          <option value="days">Days</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* MODE 3: RATE */}
              {activeMode === "rate" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Principal Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">
                          {currencySymbol}
                        </span>
                        <Input
                          type="number"
                          value={principalInput}
                          onChange={(e) => setPrincipalInput(e.target.value)}
                          className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Target Total Interest ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">
                          {currencySymbol}
                        </span>
                        <Input
                          type="number"
                          value={targetInterestInput}
                          onChange={(e) => setTargetInterestInput(e.target.value)}
                          className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Term Duration & Unit
                    </label>
                    <div className="flex gap-1.5">
                      <Input
                        type="number"
                        value={termInput}
                        onChange={(e) => setTermInput(e.target.value)}
                        className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 flex-1"
                      />
                      <select
                        value={timeUnit}
                        onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}
                        className="h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs px-2 font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                        <option value="weeks">Weeks</option>
                        <option value="days">Days</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* MODE 4: TERM */}
              {activeMode === "term" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Principal Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">
                          {currencySymbol}
                        </span>
                        <Input
                          type="number"
                          value={principalInput}
                          onChange={(e) => setPrincipalInput(e.target.value)}
                          className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Target Total Interest ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">
                          {currencySymbol}
                        </span>
                        <Input
                          type="number"
                          value={targetInterestInput}
                          onChange={(e) => setTargetInterestInput(e.target.value)}
                          className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Annual Interest Rate (%)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={rateInput}
                      onChange={(e) => setRateInput(e.target.value)}
                      className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* DYNAMIC FORMULA SOLUTION PANEL */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer select-none"
              onClick={() => setShowFormulaPanel(!showFormulaPanel)}
            >
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Step-by-Step Mathematical Solution Derivation
              </h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                {showFormulaPanel ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>

            {showFormulaPanel && (
              <div className="space-y-3 pt-2 text-xs font-sans tabular-nums">
                {results.derivationSteps.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-[11px]">
                      {step.title}
                    </span>
                    <div className="text-zinc-700 dark:text-zinc-300 font-semibold">{step.formula}</div>
                    <div className="text-zinc-500 dark:text-zinc-400">{step.substitution}</div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold">{step.result}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS DASHBOARD CARD (COL 5) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-4">
          <div className="bg-gradient-to-br from-zinc-900 via-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-xl border border-zinc-800 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-400">
                Simple Interest Output Dashboard
              </span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 text-[10px]">
                {activeMode.toUpperCase()}
              </Badge>
            </div>

            {/* Main Result Display */}
            <div>
              <span className="text-xs text-zinc-400 block font-medium">Final Ending Balance (A)</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight font-sans tabular-nums mt-1">
                {currencySymbol}{results.finalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-blue-200/80 mt-1 font-sans">
                Total Simple Interest: <strong className="text-white">{currencySymbol}{results.totalInterest.toLocaleString()}</strong>
              </p>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Initial Principal</span>
                <span className="text-base font-bold text-white font-sans tabular-nums">
                  {currencySymbol}{results.principal.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Return on Investment (ROI)</span>
                <span className="text-base font-bold text-emerald-400 font-sans tabular-nums">
                  {results.roiPercent.toFixed(2)}%
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Interest Per Year</span>
                <span className="text-base font-bold text-white font-sans tabular-nums">
                  {currencySymbol}{results.interestPerYear.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Interest Per Month</span>
                <span className="text-base font-bold text-white font-sans tabular-nums">
                  {currencySymbol}{results.interestPerMonth.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-500/30 text-xs text-blue-100 flex items-center justify-between font-sans tabular-nums">
              <span>Interest Per Day:</span>
              <span className="font-bold text-emerald-300">
                {currencySymbol}{results.interestPerDay.toLocaleString(undefined, { minimumFractionDigits: 2 })}/day
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 2: YEARLY SCHEDULE TABLE & EXPORTS
         ========================================== */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div>
            <h2 className="text-base font-black text-blue-600 dark:text-blue-400 flex items-center gap-2">Yearly Schedule Table
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Year-by-year linear breakdown of opening principal, interest earned, and ending balance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="h-8 text-xs font-bold gap-1.5"
            >
              <Download className="h-3.5 w-3.5 text-blue-600" /> Export CSV
            </Button>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-950 font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="p-3">Year</th>
                <th className="p-3">Opening Balance ({currencySymbol})</th>
                <th className="p-3">Interest Earned ({currencySymbol})</th>
                <th className="p-3">Closing Balance ({currencySymbol})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums">
              {results.schedule.map((row) => (
                <tr key={row.year} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="p-3 font-bold font-sans">Year {row.year}</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">
                    {currencySymbol}{row.openingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">
                    +{currencySymbol}{row.interestEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 font-bold text-zinc-900 dark:text-zinc-100">
                    {currencySymbol}{row.closingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          SECTION 3: RECHARTS VISUALIZATIONS GRID
         ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* BAR CHART: ACCUMULATION OVER TIME (COL 7) */}
        <div className="md:col-span-7 bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400">
            Balance Accumulation Timeline (Principal vs Cumulative Interest)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results.schedule}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(val: any) => [`${currencySymbol}${Number(val || 0).toLocaleString()}`, "Value"]} />
                <Bar dataKey="closingBalance" name="Closing Balance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DOUGHNUT CHART: BREAKDOWN (COL 5) */}
        <div className="md:col-span-5 bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400">
            Final Balance Composition
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={doughnutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {doughnutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${currencySymbol}${Number(val || 0).toLocaleString()}`, "Amount"]} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-blue-500" />
              <span>Principal: {results.principalPercentOfBalance.toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-emerald-500" />
              <span>Interest: {results.interestPercentOfBalance.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 4: SIDE-BY-SIDE SIMPLE VS COMPOUND COMPARISON MODULE
         ========================================== */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <h2 className="text-base font-black text-blue-600 dark:text-blue-400 flex items-center gap-2">Simple vs. Compound Interest Comparison Module
          </h2>
          <Badge variant="outline" className="text-[10px] text-indigo-600 border-indigo-200">
            Compounding Bonus Analysis
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-600 dark:text-zinc-400">Simple Interest Balance:</span>
                <span className="font-bold font-sans tabular-nums text-zinc-900 dark:text-zinc-100 text-sm">
                  {currencySymbol}{results.comparison.simpleFinalBalance.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-zinc-200 dark:border-zinc-800 pt-2">
                <span className="text-zinc-600 dark:text-zinc-400">Compound Balance (Monthly):</span>
                <span className="font-bold font-sans tabular-nums text-emerald-600 dark:text-emerald-400 text-sm">
                  {currencySymbol}{results.comparison.compoundFinalBalance.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-zinc-200 dark:border-zinc-800 pt-2">
                <span className="text-zinc-600 dark:text-zinc-400">Compounding Advantage:</span>
                <span className="font-bold font-sans tabular-nums text-emerald-600 dark:text-emerald-400 text-sm">
                  +{currencySymbol}{results.comparison.interestDifference.toLocaleString()} (+{results.comparison.additionalWealthPercent.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-2">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Simple Interest vs Compound Interest Ending Wealth
            </span>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(val: any) => [`${currencySymbol}${Number(val || 0).toLocaleString()}`, "Value"]} />
                  <Bar dataKey="Balance" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 5: EDUCATIONAL CONTENT & FAQS COMPONENT
         ========================================== */}
      <SimpleInterestContent />

      {/* ==========================================
          EXECUTIVE PRINT / PDF REPORT MODAL
         ========================================== */}
      {isReportOpen && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          reportData={reportData}
        />
      )}
    </div>
  );
}
