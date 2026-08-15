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
  Printer,
} from "lucide-react";
import { calculateLoanModule } from "@/modules/loan/formula";
import {
  LoanInput,
  LoanOutput,
  LoanCalculatorMode,
  PaymentFrequency,
  SavedLoanCalculation,
} from "@/modules/loan/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";
import LoanAmortizationTable from "./LoanAmortizationTable";
import ReportModal from "@/components/report/ReportModal";
import { generateLoanReportData } from "@/lib/report-generator/loan-report";

// Lazy load visual charts
const LoanBreakdownDoughnutChart = dynamic(
  () => import("../charts/LoanBreakdownDoughnutChart").then((m) => m.LoanBreakdownDoughnutChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-sans tabular-nums">
        Loading doughnut chart...
      </div>
    ),
  }
);

const LoanBalanceLineChart = dynamic(
  () => import("../charts/LoanBalanceLineChart").then((m) => m.LoanBalanceLineChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-sans tabular-nums">
        Loading balance chart...
      </div>
    ),
  }
);

const LoanPrincipalInterestChart = dynamic(
  () => import("../charts/LoanPrincipalInterestChart").then((m) => m.LoanPrincipalInterestChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-sans tabular-nums">
        Loading principal vs interest chart...
      </div>
    ),
  }
);

export function LoanCalculator() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // Active Mode Tab
  const [mode, setMode] = useState<LoanCalculatorMode>("monthly-payment");

  // Core State
  const [loanAmount, setLoanAmount] = useState<number>(25000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(5);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(0);
  const [desiredPayment, setDesiredPayment] = useState<number>(500);
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>("monthly");
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(0);

  // Error & Chart Tabs State
  const [validationError, setValidationError] = useState<string>("");
  const [activeChartTab, setActiveChartTab] = useState<"doughnut" | "balance" | "principal-interest">("doughnut");

  // Save & Share State
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [saveName, setSaveName] = useState<string>("");
  const [savedCalculations, setSavedCalculations] = useState<SavedLoanCalculation[]>([]);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>("");
  const [shareSuccessMsg, setShareSuccessMsg] = useState<string>("");

  // Load URL query params & saved calculations on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (params.has("mode")) setMode(params.get("mode") as LoanCalculatorMode);
        if (params.has("amount")) setLoanAmount(Number(params.get("amount")));
        if (params.has("rate")) setInterestRate(Number(params.get("rate")));
        if (params.has("years")) setLoanTermYears(Number(params.get("years")));
        if (params.has("months")) setLoanTermMonths(Number(params.get("months")));
        if (params.has("payment")) setDesiredPayment(Number(params.get("payment")));
        if (params.has("extra")) setExtraMonthlyPayment(Number(params.get("extra")));

        const stored = localStorage.getItem("calcplatform_saved_loan");
        if (stored) {
          setSavedCalculations(JSON.parse(stored));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Quick Preset Handlers
  const handleApplyPreset = (preset: "personal" | "auto" | "mortgage") => {
    setMode("monthly-payment");
    setExtraMonthlyPayment(0);
    if (preset === "personal") {
      setLoanAmount(10000);
      setLoanTermYears(3);
      setLoanTermMonths(0);
      setInterestRate(8.5);
    } else if (preset === "auto") {
      setLoanAmount(50000);
      setLoanTermYears(5);
      setLoanTermMonths(0);
      setInterestRate(6.0);
    } else if (preset === "mortgage") {
      setLoanAmount(250000);
      setLoanTermYears(30);
      setLoanTermMonths(0);
      setInterestRate(6.5);
    }
    setValidationError("");
  };

  // Perform calculations
  const results: LoanOutput = useMemo(() => {
    const input: LoanInput = {
      mode,
      loanAmount: Math.max(0, loanAmount),
      interestRate: Math.max(0, interestRate),
      loanTermYears: Math.max(0, loanTermYears),
      loanTermMonths: Math.max(0, loanTermMonths),
      desiredPayment: Math.max(0, desiredPayment),
      paymentFrequency,
      extraMonthlyPayment: Math.max(0, extraMonthlyPayment),
      startMonth: currentMonth,
      startYear: currentYear,
    };

    return calculateLoanModule(input);
  }, [
    mode,
    loanAmount,
    interestRate,
    loanTermYears,
    loanTermMonths,
    desiredPayment,
    paymentFrequency,
    extraMonthlyPayment,
    currentMonth,
    currentYear,
  ]);

  const reportData = useMemo(() => {
    return generateLoanReportData(
      { mode, loanAmount, interestRate, loanTermYears, loanTermMonths, desiredPayment, paymentFrequency, extraMonthlyPayment },
      { monthlyPayment: results.periodicPayment, totalInterest: results.totalInterest, totalPayment: results.totalRepayment }
    );
  }, [mode, loanAmount, interestRate, loanTermYears, loanTermMonths, desiredPayment, paymentFrequency, extraMonthlyPayment, results]);

  // Handle Clear / Reset
  const handleClear = () => {
    setLoanAmount(25000);
    setInterestRate(7.5);
    setLoanTermYears(5);
    setLoanTermMonths(0);
    setDesiredPayment(500);
    setPaymentFrequency("monthly");
    setExtraMonthlyPayment(0);
    setValidationError("");
  };

  // Handle Save Calculation
  const handleSaveCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    const newSave: SavedLoanCalculation = {
      id: `loan-${Date.now()}`,
      name: saveName.trim() || `Loan ($${loanAmount.toLocaleString()})`,
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
        desiredPayment,
        paymentFrequency,
        extraMonthlyPayment,
      },
      periodicPayment: results.periodicPayment,
    };

    const updated = [newSave, ...savedCalculations].slice(0, 50);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("calcplatform_saved_loan", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setSaveSuccessMsg("Loan calculation saved successfully!");
    setTimeout(() => {
      setSaveSuccessMsg("");
      setIsSaveModalOpen(false);
      setSaveName("");
    }, 1200);
  };

  // Restore Saved Calculation
  const handleLoadCalculation = (saved: SavedLoanCalculation) => {
    const inp = saved.inputs;
    if (!inp) return;
    if (inp.mode) setMode(inp.mode);
    setLoanAmount(inp.loanAmount ?? 25000);
    setInterestRate(inp.interestRate ?? 7.5);
    setLoanTermYears(inp.loanTermYears ?? 5);
    setLoanTermMonths(inp.loanTermMonths ?? 0);
    setDesiredPayment(inp.desiredPayment ?? 500);
    setPaymentFrequency(inp.paymentFrequency ?? "monthly");
    setExtraMonthlyPayment(inp.extraMonthlyPayment ?? 0);
    setIsSaveModalOpen(false);
  };

  // Delete Saved Calculation
  const handleDeleteSavedCalculation = (id: string) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("calcplatform_saved_loan", JSON.stringify(updated));
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
    if (desiredPayment > 0) params.set("payment", desiredPayment.toString());
    if (extraMonthlyPayment > 0) params.set("extra", extraMonthlyPayment.toString());

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    if (navigator.share) {
      navigator.share({
        title: "Loan Calculation",
        text: `Check out this loan calculation on CalcPlatform`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      setShareSuccessMsg("Shareable link copied to clipboard!");
      setTimeout(() => setShareSuccessMsg(""), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Action Bar & Quick Preset Scenarios */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        {/* Quick Loan Scenarios */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Quick Scenarios:
          </span>
          <button
            type="button"
            onClick={() => handleApplyPreset("personal")}
            className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-medium rounded-xl px-3 py-1.5 text-xs shadow-xs transition-all cursor-pointer"
          >
            $10,000 Personal Loan
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset("auto")}
            className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-medium rounded-xl px-3 py-1.5 text-xs shadow-xs transition-all cursor-pointer"
          >
            $50,000 Auto Loan
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset("mortgage")}
            className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-medium rounded-xl px-3 py-1.5 text-xs shadow-xs transition-all cursor-pointer"
          >
            $300,000 Mortgage
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShareUrl}
            className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-medium rounded-xl px-3 py-1.5 text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-medium rounded-xl px-3 py-1.5 text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-purple-500" /> Print / PDF
          </button>
          <button
            type="button"
            onClick={() => setIsSaveModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl px-4 py-1.5 text-xs shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Bookmark className="h-3.5 w-3.5" /> Save Setup
          </button>
        </div>
      </div>

      {/* Main Grid: Left Controls (Col 5) | Right Results & Charts (Col 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs Panel (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs p-5 sm:p-6 space-y-5">
            {/* 4 Mode Tabs Header */}
            <div className="inline-flex w-full p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 w-full">
                <button
                  type="button"
                  onClick={() => setMode("monthly-payment")}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === "monthly-payment"
                      ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Payment
                </button>
                <button
                  type="button"
                  onClick={() => setMode("loan-amount")}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === "loan-amount"
                      ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Loan Amount
                </button>
                <button
                  type="button"
                  onClick={() => setMode("loan-term")}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === "loan-term"
                      ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Loan Term
                </button>
                <button
                  type="button"
                  onClick={() => setMode("interest-rate")}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === "interest-rate"
                      ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Interest Rate
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {validationError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Dynamic Form Inputs based on Mode */}
              <div className="space-y-3">
                {/* Loan Amount Input (for Monthly Payment, Loan Term, Interest Rate modes) */}
                {mode !== "loan-amount" && (
                  <div>
                    <Label htmlFor="loanAmount" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Loan Amount ($)
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                      <Input
                        id="loanAmount"
                        type="number"
                        min={0}
                        step={1000}
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                        className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Desired Monthly Payment Input (for Loan Amount, Loan Term, Interest Rate modes) */}
                {mode !== "monthly-payment" && (
                  <div>
                    <Label htmlFor="desiredPayment" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      {mode === "loan-amount" ? "Desired Monthly Payment ($)" : "Monthly Payment ($)"}
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                      <Input
                        id="desiredPayment"
                        type="number"
                        min={0}
                        step={50}
                        value={desiredPayment}
                        onChange={(e) => setDesiredPayment(Math.max(0, Number(e.target.value)))}
                        className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Interest Rate Input (for Monthly Payment, Loan Amount, Loan Term modes) */}
                {mode !== "interest-rate" && (
                  <div>
                    <Label htmlFor="interestRate" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Interest Rate (%)
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
                        className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Loan Term Input (for Monthly Payment, Loan Amount, Interest Rate modes) */}
                {mode !== "loan-term" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="loanTermYears" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Loan Term (Years)
                      </Label>
                      <Input
                        id="loanTermYears"
                        type="number"
                        min={0}
                        max={50}
                        value={loanTermYears}
                        onChange={(e) => setLoanTermYears(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="loanTermMonths" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Loan Term (Months)
                      </Label>
                      <Input
                        id="loanTermMonths"
                        type="number"
                        min={0}
                        max={11}
                        value={loanTermMonths}
                        onChange={(e) => setLoanTermMonths(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Payment Frequency Selector */}
                <div>
                  <Label htmlFor="paymentFrequency" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Payment Frequency
                  </Label>
                  <select
                    id="paymentFrequency"
                    value={paymentFrequency}
                    onChange={(e) => setPaymentFrequency(e.target.value as PaymentFrequency)}
                    className="mt-1 w-full h-9 rounded-md bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 px-3 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                  >
                    <option value="monthly">Monthly (12/yr)</option>
                    <option value="biweekly">Biweekly (26/yr)</option>
                    <option value="weekly">Weekly (52/yr)</option>
                  </select>
                </div>

                {/* Extra Monthly Payment */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <Label htmlFor="extraMonthlyPayment" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Extra Monthly Payment ($)
                  </Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      id="extraMonthlyPayment"
                      type="number"
                      min={0}
                      step={50}
                      value={extraMonthlyPayment}
                      onChange={(e) => setExtraMonthlyPayment(Math.max(0, Number(e.target.value)))}
                      className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                    />
                  </div>
                </div>

                {/* Clear Action Button */}
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
            </div>
          </div>
        </div>

        {/* Right Results Panel (Col 7) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Large Result Summary Cards */}
          <Card className="border border-blue-100 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950/30 shadow-md">
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                    {mode === "loan-amount"
                      ? "Maximum Affordable Loan Amount"
                      : mode === "loan-term"
                      ? "Time Required To Repay Loan"
                      : mode === "interest-rate"
                      ? "Estimated Interest Rate (p.a.)"
                      : `${paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1)} Payment`}
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

                <div className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums mt-2 tracking-tight">
                  {mode === "loan-amount"
                    ? formatCurrency(results.maxLoanAmount)
                    : mode === "loan-term"
                    ? `${results.requiredTermYears} yrs ${results.requiredTermMonths} mos`
                    : mode === "interest-rate"
                    ? `${results.estimatedInterestRate}%`
                    : formatCurrency(results.periodicPayment)}
                </div>
              </div>

              {/* Grid Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 border-t border-blue-100 dark:border-zinc-800">
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Total Repayment</span>
                  <span className="text-sm font-bold font-sans tabular-nums text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(results.totalRepayment)}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Total Interest</span>
                  <span className="text-sm font-bold font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(results.totalInterest)}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Interest Share</span>
                  <span className="text-sm font-bold font-sans tabular-nums text-amber-600 dark:text-amber-400">
                    {results.interestPercentage}%
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Number of Payments</span>
                  <span className="text-sm font-bold font-sans tabular-nums text-zinc-900 dark:text-zinc-100">
                    {results.totalPaymentsCount}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Payoff Date</span>
                  <span className="text-sm font-bold font-sans tabular-nums text-blue-600 dark:text-blue-400 truncate block">
                    {results.payoffDate}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Estimated APR</span>
                  <span className="text-sm font-bold font-sans tabular-nums text-purple-600 dark:text-purple-400">
                    {results.estimatedApr}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Extra Payment Analysis & Comparison Table */}
          {extraMonthlyPayment > 0 && (results.interestSaved > 0 || results.timeSavedMonths > 0) && (
            <Card className="border border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/20 shadow-xs">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-900/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs uppercase font-bold text-emerald-900 dark:text-emerald-200">
                      Extra Payment Impact & Savings Analysis
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white/80 dark:bg-zinc-900/80 rounded-xl border border-emerald-100 dark:border-emerald-900 space-y-1">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300 block">
                      Total Interest Comparison
                    </span>
                    <div className="flex items-center justify-between font-sans tabular-nums">
                      <span className="text-zinc-500 line-through">
                        {formatCurrency(results.baselineTotalInterest)}
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(results.totalInterest)}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                      Interest Saved: {formatCurrency(results.interestSaved)}
                    </div>
                  </div>

                  <div className="p-3 bg-white/80 dark:bg-zinc-900/80 rounded-xl border border-emerald-100 dark:border-emerald-900 space-y-1">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300 block">
                      Loan Payoff Date Comparison
                    </span>
                    <div className="flex items-center justify-between font-sans tabular-nums">
                      <span className="text-zinc-500 line-through">
                        {results.baselinePayoffDate}
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {results.payoffDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                      Time Saved: {results.timeSavedYears} Years ({results.timeSavedMonths} Months)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Visual Charts Container (3 Charts) */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2.5 gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Visual Analytics & Charts
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
                  <TrendingUp className="h-3 w-3" /> Balance
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChartTab("principal-interest")}
                  className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    activeChartTab === "principal-interest"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  <BarChart3 className="h-3 w-3" /> Principal vs Interest
                </button>
              </div>
            </div>

            <div className="pt-1">
              {activeChartTab === "doughnut" ? (
                <LoanBreakdownDoughnutChart
                  totalPrincipal={results.maxLoanAmount}
                  totalInterest={results.totalInterest}
                />
              ) : activeChartTab === "balance" ? (
                <LoanBalanceLineChart schedule={results.amortizationSchedule} />
              ) : (
                <LoanPrincipalInterestChart schedule={results.amortizationSchedule} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Amortization Schedule Section (Full Width) */}
      <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
        <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Loan Amortization Schedule
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500">
                Payment-by-payment breakdown with search, sorting, pagination, and CSV / Excel / Print export
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <LoanAmortizationTable schedule={results.amortizationSchedule} />
        </CardContent>
      </Card>

      {/* Save Calculation Modal Dialog */}
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
                  Save Loan Setup
                </h3>
                <p className="text-xs text-zinc-500">
                  Store calculation inputs locally to reload anytime
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
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm block font-sans tabular-nums">
                    Payment: {formatCurrency(results.periodicPayment)} / {paymentFrequency}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    ${loanAmount.toLocaleString()} loan, {loanTermYears} yrs @ {interestRate}% interest
                  </span>
                </div>

                <div>
                  <Label htmlFor="saveName" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Setup Name
                  </Label>
                  <Input
                    id="saveName"
                    type="text"
                    placeholder="e.g. 5-Yr Auto Loan Option"
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
                    Save Loan Setup
                  </Button>
                </div>
              </form>
            )}

            {/* Saved Calculations List */}
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
                        <span className="text-[10px] text-zinc-400 block font-sans tabular-nums">
                          {formatCurrency(item.periodicPayment)} • {item.dateSaved}
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

      {/* Executive Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportData={reportData}
      />
    </div>
  );
}

export default LoanCalculator;
