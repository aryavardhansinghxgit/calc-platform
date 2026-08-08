"use client";

import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Percent,
  Clock,
  Sparkles,
  Bookmark,
  Trash2,
  RotateCcw,
  Check,
  X,
  Share2,
  AlertCircle,
  FolderOpen,
  PieChart as PieIcon,
  TrendingUp,
  BarChart3,
  Zap,
  Sliders,
} from "lucide-react";
import { calculateEmiModule } from "@/modules/emi/formula";
import {
  EmiInput,
  EmiOutput,
  EmiCalculatorMode,
  PrepaymentStrategy,
  SavedEmiCalculation,
} from "@/modules/emi/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";
import EmiScheduleTable from "./EmiScheduleTable";

// Lazy load visual charts
const EmiBreakdownDoughnutChart = dynamic(
  () => import("../charts/EmiBreakdownDoughnutChart").then((m) => m.EmiBreakdownDoughnutChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-mono">
        Loading doughnut chart...
      </div>
    ),
  }
);

const EmiBalanceLineChart = dynamic(
  () => import("../charts/EmiBalanceLineChart").then((m) => m.EmiBalanceLineChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-mono">
        Loading balance chart...
      </div>
    ),
  }
);

const EmiYearlyBarChart = dynamic(
  () => import("../charts/EmiYearlyBarChart").then((m) => m.EmiYearlyBarChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-mono">
        Loading yearly bar chart...
      </div>
    ),
  }
);

export function EmiCalculator() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // Active Mode Tab
  const [mode, setMode] = useState<EmiCalculatorMode>("standard");

  // Core Inputs State
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(10);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(0);
  const [processingFeeRate, setProcessingFeeRate] = useState<number>(0.5);
  const [processingFeeFlat, setProcessingFeeFlat] = useState<number>(0);

  // Prepayment Inputs State
  const [extraMonthlyPrepayment, setExtraMonthlyPrepayment] = useState<number>(0);
  const [oneTimePrepayment, setOneTimePrepayment] = useState<number>(0);
  const [oneTimePrepaymentMonth, setOneTimePrepaymentMonth] = useState<number>(currentMonth);
  const [oneTimePrepaymentYear, setOneTimePrepaymentYear] = useState<number>(currentYear + 1);
  const [prepaymentStrategy, setPrepaymentStrategy] = useState<PrepaymentStrategy>("reduce-tenure");

  // Flat vs Reducing & Reverse Solver Inputs State
  const [flatInterestRate, setFlatInterestRate] = useState<number>(8.5);
  const [desiredEmi, setDesiredEmi] = useState<number>(10000);

  // Error & Chart Tabs State
  const [validationError, setValidationError] = useState<string>("");
  const [activeChartTab, setActiveChartTab] = useState<"doughnut" | "balance" | "yearly">("doughnut");

  // Save & Share State
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [saveName, setSaveName] = useState<string>("");
  const [savedCalculations, setSavedCalculations] = useState<SavedEmiCalculation[]>([]);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>("");
  const [shareSuccessMsg, setShareSuccessMsg] = useState<string>("");

  // Load URL query params & saved calculations on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (params.has("mode")) setMode(params.get("mode") as EmiCalculatorMode);
        if (params.has("amount")) setLoanAmount(Number(params.get("amount")));
        if (params.has("rate")) setInterestRate(Number(params.get("rate")));
        if (params.has("years")) setLoanTermYears(Number(params.get("years")));
        if (params.has("months")) setLoanTermMonths(Number(params.get("months")));
        if (params.has("extra")) setExtraMonthlyPrepayment(Number(params.get("extra")));

        const stored = localStorage.getItem("calcplatform_saved_emi");
        if (stored) {
          setSavedCalculations(JSON.parse(stored));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Quick Preset Handlers
  const handleApplyPreset = (preset: "home" | "car" | "personal") => {
    setMode("standard");
    setExtraMonthlyPrepayment(0);
    setOneTimePrepayment(0);
    if (preset === "home") {
      setLoanAmount(5000000);
      setLoanTermYears(20);
      setLoanTermMonths(0);
      setInterestRate(8.5);
    } else if (preset === "car") {
      setLoanAmount(1000000);
      setLoanTermYears(5);
      setLoanTermMonths(0);
      setInterestRate(9.0);
    } else if (preset === "personal") {
      setLoanAmount(500000);
      setLoanTermYears(3);
      setLoanTermMonths(0);
      setInterestRate(12.5);
    }
    setValidationError("");
  };

  // Perform Calculations
  const results: EmiOutput = useMemo(() => {
    const input: EmiInput = {
      mode,
      loanAmount: Math.max(0, loanAmount),
      interestRate: Math.max(0, interestRate),
      loanTermYears: Math.max(0, loanTermYears),
      loanTermMonths: Math.max(0, loanTermMonths),
      processingFeeRate: Math.max(0, processingFeeRate),
      processingFeeFlat: Math.max(0, processingFeeFlat),
      extraMonthlyPrepayment: Math.max(0, extraMonthlyPrepayment),
      oneTimePrepayment: Math.max(0, oneTimePrepayment),
      oneTimePrepaymentMonth,
      oneTimePrepaymentYear,
      prepaymentStrategy,
      desiredEmi: Math.max(0, desiredEmi),
      flatInterestRate: Math.max(0, flatInterestRate),
      startMonth: currentMonth,
      startYear: currentYear,
    };

    return calculateEmiModule(input);
  }, [
    mode,
    loanAmount,
    interestRate,
    loanTermYears,
    loanTermMonths,
    processingFeeRate,
    processingFeeFlat,
    extraMonthlyPrepayment,
    oneTimePrepayment,
    oneTimePrepaymentMonth,
    oneTimePrepaymentYear,
    prepaymentStrategy,
    desiredEmi,
    flatInterestRate,
    currentMonth,
    currentYear,
  ]);

  // Handle Clear / Reset
  const handleClear = () => {
    setLoanAmount(500000);
    setInterestRate(8.5);
    setLoanTermYears(10);
    setLoanTermMonths(0);
    setProcessingFeeRate(0.5);
    setProcessingFeeFlat(0);
    setExtraMonthlyPrepayment(0);
    setOneTimePrepayment(0);
    setPrepaymentStrategy("reduce-tenure");
    setDesiredEmi(10000);
    setFlatInterestRate(8.5);
    setValidationError("");
  };

  // Save Calculation
  const handleSaveCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    const newSave: SavedEmiCalculation = {
      id: `emi-${Date.now()}`,
      name: saveName.trim() || `EMI ($${loanAmount.toLocaleString()})`,
      dateSaved: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      inputs: {
        mode,
        loanAmount,
        interestRate,
        loanTermYears,
        loanTermMonths,
        processingFeeRate,
        extraMonthlyPrepayment,
      },
      monthlyEmi: results.monthlyEmi,
    };

    const updated = [newSave, ...savedCalculations].slice(0, 50);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("calcplatform_saved_emi", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setSaveSuccessMsg("EMI setup saved successfully!");
    setTimeout(() => {
      setSaveSuccessMsg("");
      setIsSaveModalOpen(false);
      setSaveName("");
    }, 1200);
  };

  // Restore Saved Calculation
  const handleLoadCalculation = (saved: SavedEmiCalculation) => {
    const inp = saved.inputs;
    if (!inp) return;
    if (inp.mode) setMode(inp.mode);
    setLoanAmount(inp.loanAmount ?? 500000);
    setInterestRate(inp.interestRate ?? 8.5);
    setLoanTermYears(inp.loanTermYears ?? 10);
    setLoanTermMonths(inp.loanTermMonths ?? 0);
    setProcessingFeeRate(inp.processingFeeRate ?? 0.5);
    setExtraMonthlyPrepayment(inp.extraMonthlyPrepayment ?? 0);
    setIsSaveModalOpen(false);
  };

  // Delete Saved Calculation
  const handleDeleteSavedCalculation = (id: string) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("calcplatform_saved_emi", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  // Share URL Generator
  const handleShareUrl = () => {
    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("amount", loanAmount.toString());
    params.set("rate", interestRate.toString());
    params.set("years", loanTermYears.toString());
    params.set("months", loanTermMonths.toString());
    if (extraMonthlyPrepayment > 0) params.set("extra", extraMonthlyPrepayment.toString());

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    if (navigator.share) {
      navigator.share({
        title: "EMI Calculation",
        text: `Check out this EMI calculation on CalcPlatform`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      setShareSuccessMsg("Shareable link copied to clipboard!");
      setTimeout(() => setShareSuccessMsg(""), 2000);
    }
  };

  const monthOptions = [
    { value: 1, label: "Jan" },
    { value: 2, label: "Feb" },
    { value: 3, label: "Mar" },
    { value: 4, label: "Apr" },
    { value: 5, label: "May" },
    { value: 6, label: "Jun" },
    { value: 7, label: "Jul" },
    { value: 8, label: "Aug" },
    { value: 9, label: "Sep" },
    { value: 10, label: "Oct" },
    { value: 11, label: "Nov" },
    { value: 12, label: "Dec" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Action Bar & Quick Scenarios */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-800/80 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700/80 shadow-xs">
        {/* Quick Loan Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-amber-500" /> Quick Presets:
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleApplyPreset("home")}
            className="h-7 text-xs px-2.5 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-blue-500"
          >
            Home Loan (₹50L)
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleApplyPreset("car")}
            className="h-7 text-xs px-2.5 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-blue-500"
          >
            Car Loan (₹10L)
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleApplyPreset("personal")}
            className="h-7 text-xs px-2.5 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-blue-500"
          >
            Personal Loan (₹5L)
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {shareSuccessMsg && (
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 animate-pulse">
              {shareSuccessMsg}
            </span>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleShareUrl}
            className="h-8 text-xs gap-1.5 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
          >
            <Share2 className="h-3.5 w-3.5 text-blue-500" /> Share Link
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => setIsSaveModalOpen(true)}
            className="h-8 text-xs gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
          >
            <Bookmark className="h-3.5 w-3.5" /> Save Setup
          </Button>
        </div>
      </div>

      {/* Main Grid: Left Controls (Col 5) | Right Results & Charts (Col 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs Panel (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border border-zinc-200 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900">
            {/* 4 Mode Tabs Header */}
            <div className="p-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/50 rounded-t-xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                <button
                  type="button"
                  onClick={() => setMode("standard")}
                  className={`py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all ${
                    mode === "standard"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800"
                  }`}
                >
                  Standard EMI
                </button>
                <button
                  type="button"
                  onClick={() => setMode("prepayment")}
                  className={`py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all ${
                    mode === "prepayment"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800"
                  }`}
                >
                  Prepayments
                </button>
                <button
                  type="button"
                  onClick={() => setMode("flat-vs-reducing")}
                  className={`py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all ${
                    mode === "flat-vs-reducing"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800"
                  }`}
                >
                  Flat vs Reducing
                </button>
                <button
                  type="button"
                  onClick={() => setMode("reverse-solver")}
                  className={`py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all ${
                    mode === "reverse-solver"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800"
                  }`}
                >
                  Max Loan
                </button>
              </div>
            </div>

            <CardContent className="p-4 space-y-4 text-xs">
              {validationError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="space-y-3">
                {/* Loan Amount Input */}
                {mode !== "reverse-solver" && (
                  <div>
                    <Label htmlFor="loanAmount" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Loan Amount ($ / ₹)
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                      <Input
                        id="loanAmount"
                        type="number"
                        min={0}
                        step={10000}
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                        className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Desired EMI (for Reverse Solver mode) */}
                {mode === "reverse-solver" && (
                  <div>
                    <Label htmlFor="desiredEmi" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Target Budget Monthly EMI ($ / ₹)
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                      <Input
                        id="desiredEmi"
                        type="number"
                        min={0}
                        step={1000}
                        value={desiredEmi}
                        onChange={(e) => setDesiredEmi(Math.max(0, Number(e.target.value)))}
                        className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Interest Rate */}
                <div>
                  <Label htmlFor="interestRate" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Interest Rate (% p.a.)
                  </Label>
                  <div className="relative mt-1">
                    <Percent className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      id="interestRate"
                      type="number"
                      step={0.1}
                      min={0}
                      max={100}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                      className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Loan Tenure (Years & Months) */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="loanTermYears" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Loan Tenure (Years)
                    </Label>
                    <Input
                      id="loanTermYears"
                      type="number"
                      min={0}
                      max={50}
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanTermMonths" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Loan Tenure (Months)
                    </Label>
                    <Input
                      id="loanTermMonths"
                      type="number"
                      min={0}
                      max={11}
                      value={loanTermMonths}
                      onChange={(e) => setLoanTermMonths(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Processing Fee */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="processingFeeRate" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Processing Fee (% rate)
                    </Label>
                    <Input
                      id="processingFeeRate"
                      type="number"
                      step={0.1}
                      min={0}
                      max={10}
                      value={processingFeeRate}
                      onChange={(e) => setProcessingFeeRate(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="processingFeeFlat" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Flat Processing Fee ($ / ₹)
                    </Label>
                    <Input
                      id="processingFeeFlat"
                      type="number"
                      min={0}
                      step={500}
                      value={processingFeeFlat}
                      onChange={(e) => setProcessingFeeFlat(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Mode 2: Prepayment Controls & Strategy */}
                {mode === "prepayment" && (
                  <div className="space-y-3 p-3 bg-zinc-50/80 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/80 pt-3">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                      Prepayment & Pre-closure Analyzer
                    </span>

                    <div>
                      <Label htmlFor="extraMonthlyPrepayment" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Extra Monthly Prepayment ($ / ₹)
                      </Label>
                      <Input
                        id="extraMonthlyPrepayment"
                        type="number"
                        min={0}
                        step={1000}
                        value={extraMonthlyPrepayment}
                        onChange={(e) => setExtraMonthlyPrepayment(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <Label htmlFor="oneTimePrepayment" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        One-Time Lump Sum Prepayment ($ / ₹)
                      </Label>
                      <Input
                        id="oneTimePrepayment"
                        type="number"
                        min={0}
                        step={10000}
                        value={oneTimePrepayment}
                        onChange={(e) => setOneTimePrepayment(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>

                    {oneTimePrepayment > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-[10px] text-zinc-500">Lump Sum Month</Label>
                          <select
                            value={oneTimePrepaymentMonth}
                            onChange={(e) => setOneTimePrepaymentMonth(Number(e.target.value))}
                            className="mt-0.5 w-full h-8 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-[11px] px-2 text-zinc-900 dark:text-zinc-100"
                          >
                            {monthOptions.map((m) => (
                              <option key={m.value} value={m.value}>
                                {m.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label className="text-[10px] text-zinc-500">Lump Sum Year</Label>
                          <Input
                            type="number"
                            min={2000}
                            max={2100}
                            value={oneTimePrepaymentYear}
                            onChange={(e) => setOneTimePrepaymentYear(Number(e.target.value))}
                            className="mt-0.5 h-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-[11px]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Strategy Toggle Radio */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block">
                        Prepayment Impact Strategy:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPrepaymentStrategy("reduce-tenure")}
                          className={`p-2 rounded-lg text-[11px] font-semibold border text-center transition-all ${
                            prepaymentStrategy === "reduce-tenure"
                              ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                          }`}
                        >
                          Reduce Loan Tenure
                        </button>
                        <button
                          type="button"
                          onClick={() => setPrepaymentStrategy("reduce-emi")}
                          className={`p-2 rounded-lg text-[11px] font-semibold border text-center transition-all ${
                            prepaymentStrategy === "reduce-emi"
                              ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                          }`}
                        >
                          Reduce Monthly EMI
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mode 3: Flat Rate Comparison Control */}
                {mode === "flat-vs-reducing" && (
                  <div className="p-3 bg-zinc-50/80 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/80 space-y-2">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                      Flat Rate Interest Settings
                    </span>
                    <div>
                      <Label htmlFor="flatInterestRate" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Flat Interest Rate (% p.a.)
                      </Label>
                      <Input
                        id="flatInterestRate"
                        type="number"
                        step={0.1}
                        min={0}
                        max={100}
                        value={flatInterestRate}
                        onChange={(e) => setFlatInterestRate(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Reset Action Button */}
                <div className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClear}
                    className="w-full h-9 text-xs font-semibold border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900"
                  >
                    <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset Inputs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Results Panel (Col 7) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Large Result Summary Card */}
          <Card className="border border-blue-100 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950/30 shadow-md">
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                    {mode === "reverse-solver" ? "Maximum Loan Affordability" : "Equated Monthly Installment (EMI)"}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSaveModalOpen(true)}
                    className="h-6 text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-100/50 dark:hover:bg-blue-950 gap-1 px-2"
                  >
                    <Bookmark className="h-3 w-3" /> Save
                  </Button>
                </div>

                <div className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 font-mono mt-2 tracking-tight">
                  {mode === "reverse-solver"
                    ? formatCurrency(results.maxLoanAmount)
                    : formatCurrency(results.monthlyEmi)}
                </div>
              </div>

              {/* Responsive Grid Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 border-t border-blue-100 dark:border-zinc-800">
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Total Principal</span>
                  <span className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400">
                    {formatCurrency(results.totalPrincipal)}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Total Interest Payable</span>
                  <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(results.totalInterestPayable)}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Processing Fee</span>
                  <span className="text-sm font-bold font-mono text-purple-600 dark:text-purple-400">
                    {formatCurrency(results.processingFeeTotal)}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Total Cost of Loan</span>
                  <span className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(results.totalCostOfLoan)}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Loan Payoff Date</span>
                  <span className="text-sm font-bold font-mono text-amber-600 dark:text-amber-400 truncate block">
                    {results.payoffDate}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Interest-to-Cost Ratio</span>
                  <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {results.interestRatio}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prepayment Impact Analysis Card */}
          {mode === "prepayment" && (extraMonthlyPrepayment > 0 || oneTimePrepayment > 0) && (
            <Card className="border border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/20 shadow-xs">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-900/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs uppercase font-bold text-emerald-900 dark:text-emerald-200">
                      Prepayment Impact Analysis ({prepaymentStrategy === "reduce-tenure" ? "Reduced Tenure" : "Reduced EMI"})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white/80 dark:bg-zinc-900/80 rounded-xl border border-emerald-100 dark:border-emerald-900 space-y-1">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300 block">
                      Total Interest Savings
                    </span>
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-zinc-500 line-through">
                        {formatCurrency(results.baselineTotalInterest)}
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(results.totalInterestPayable)}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                      Interest Saved: {formatCurrency(results.interestSaved)}
                    </div>
                  </div>

                  <div className="p-3 bg-white/80 dark:bg-zinc-900/80 rounded-xl border border-emerald-100 dark:border-emerald-900 space-y-1">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300 block">
                      Payoff Timeline Comparison
                    </span>
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-zinc-500 line-through">
                        {results.baselinePayoffDate}
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {results.payoffDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                      {prepaymentStrategy === "reduce-tenure"
                        ? `Time Saved: ${results.timeSavedYears} Yrs (${results.timeSavedMonths} Mos)`
                        : `EMI Reduced from ${formatCurrency(results.baselineTotalInterest > 0 ? results.monthlyEmi : 0)}`}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Flat Rate vs Reducing Balance Comparison Card */}
          {mode === "flat-vs-reducing" && (
            <Card className="border border-purple-200 dark:border-purple-900 bg-purple-50/60 dark:bg-purple-950/20 shadow-xs">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-purple-200 dark:border-purple-900/60 pb-2">
                  <span className="text-xs uppercase font-bold text-purple-900 dark:text-purple-200">
                    Flat Rate vs. Reducing Balance Interest Comparison
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white/80 dark:bg-zinc-900/80 rounded-xl border border-purple-100 dark:border-purple-900 space-y-1">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                      Reducing Balance Rate ({interestRate}%)
                    </span>
                    <div className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      EMI: {formatCurrency(results.monthlyEmi)} / mo
                    </div>
                    <div className="text-[11px] font-mono text-zinc-500">
                      Total Interest: {formatCurrency(results.totalInterestPayable)}
                    </div>
                  </div>

                  <div className="p-3 bg-white/80 dark:bg-zinc-900/80 rounded-xl border border-purple-100 dark:border-purple-900 space-y-1">
                    <span className="font-bold text-rose-600 dark:text-rose-400 block">
                      Flat Rate ({flatInterestRate}%)
                    </span>
                    <div className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      Payment: {formatCurrency(results.flatRateMonthlyPayment)} / mo
                    </div>
                    <div className="text-[11px] font-mono text-rose-600 dark:text-rose-400 font-bold">
                      Extra Interest Paid: {formatCurrency(results.flatVsReducingDifference)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Visual Analytics Container (3 Charts) */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2.5 gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Visual Analytics & Distribution Charts
              </h3>
              <div className="flex flex-wrap items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <button
                  type="button"
                  onClick={() => setActiveChartTab("doughnut")}
                  className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    activeChartTab === "doughnut"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  <PieIcon className="h-3 w-3" /> Breakdown
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChartTab("balance")}
                  className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    activeChartTab === "balance"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  <TrendingUp className="h-3 w-3" /> Balance Trend
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChartTab("yearly")}
                  className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    activeChartTab === "yearly"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  <BarChart3 className="h-3 w-3" /> Yearly Distribution
                </button>
              </div>
            </div>

            <div className="pt-1">
              {activeChartTab === "doughnut" ? (
                <EmiBreakdownDoughnutChart
                  totalPrincipal={results.totalPrincipal}
                  totalInterest={results.totalInterestPayable}
                  processingFee={results.processingFeeTotal}
                />
              ) : activeChartTab === "balance" ? (
                <EmiBalanceLineChart schedule={results.monthlySchedule} />
              ) : (
                <EmiYearlyBarChart annualSchedule={results.annualSchedule} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* EMI Repayment & Amortization Schedule (Full Width) */}
      <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
        <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                EMI Repayment & Amortization Schedule
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500">
                Annual & Monthly breakdown tables with search, sorting, pagination, and CSV / Excel / Print export
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <EmiScheduleTable
            monthlySchedule={results.monthlySchedule}
            annualSchedule={results.annualSchedule}
          />
        </CardContent>
      </Card>

      {/* Save Setup Modal Dialog */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-lg w-full p-6 space-y-4 relative">
            <button
              type="button"
              onClick={() => setIsSaveModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Bookmark className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Save EMI Setup
                </h3>
                <p className="text-xs text-zinc-500">
                  Store calculation setup locally to reload anytime
                </p>
              </div>
            </div>

            {saveSuccessMsg ? (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-2">
                <Check className="h-4 w-4" /> {saveSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleSaveCalculation} className="space-y-3 pt-1">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700/80 text-xs">
                  <span className="text-zinc-500 block">Calculation Summary:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm block font-mono">
                    Monthly EMI: {formatCurrency(results.monthlyEmi)}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    ${loanAmount.toLocaleString()} principal, {loanTermYears} yrs @ {interestRate}% rate
                  </span>
                </div>

                <div>
                  <Label htmlFor="saveName" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Setup Name
                  </Label>
                  <Input
                    id="saveName"
                    type="text"
                    placeholder="e.g. 20-Yr Home Loan EMI"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    className="mt-1 text-xs bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsSaveModalOpen(false)}
                    className="h-8 text-xs"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                    Save EMI Setup
                  </Button>
                </div>
              </form>
            )}

            {/* Saved Setups List */}
            {savedCalculations.length > 0 && (
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <FolderOpen className="h-3.5 w-3.5 text-blue-500" /> Saved Setups ({savedCalculations.length})
                </span>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {savedCalculations.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-zinc-400 block font-mono">
                          {formatCurrency(item.monthlyEmi)}/mo • {item.dateSaved}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLoadCalculation(item)}
                          className="h-6 text-[10px] px-2 text-blue-600 dark:text-blue-400"
                        >
                          Restore
                        </Button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSavedCalculation(item.id)}
                          className="p-1 text-zinc-400 hover:text-red-500"
                          title="Delete saved setup"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmiCalculator;
