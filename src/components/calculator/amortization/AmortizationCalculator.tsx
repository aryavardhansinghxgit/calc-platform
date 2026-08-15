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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Table as TableIcon,
  DollarSign,
  Calendar,
  Percent,
  TrendingUp,
  PlusCircle,
  BarChart2,
  PieChart as PieIcon,
  Sparkles,
  Bookmark,
  Trash2,
  RotateCcw,
  Check,
  X,
  Share2,
  Copy,
  AlertCircle,
  SlidersHorizontal,
  FolderOpen,
  Printer,
} from "lucide-react";
import { calculateAmortizationModule } from "@/modules/amortization/formula";
import {
  AmortizationInput,
  AmortizationOutput,
  SavedAmortizationCalculation,
} from "@/modules/amortization/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";
import AmortizationScheduleTable from "./AmortizationScheduleTable";
import ReportModal from "@/components/report/ReportModal";
import { generateLoanReportData } from "@/lib/report-generator/loan-report";

// Lazy load visual chart components
const AmortizationPieChart = dynamic(
  () => import("../charts/AmortizationPieChart").then((m) => m.AmortizationPieChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-sans tabular-nums">
        Loading pie chart...
      </div>
    ),
  }
);

const AmortizationProgressChart = dynamic(
  () => import("../charts/AmortizationProgressChart").then((m) => m.AmortizationProgressChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-sans tabular-nums">
        Loading progress chart...
      </div>
    ),
  }
);

export function AmortizationCalculator() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // Core Inputs State
  const [loanAmount, setLoanAmount] = useState<number>(200000);
  const [loanTermYears, setLoanTermYears] = useState<number>(15);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(6.0);
  const [startMonth, setStartMonth] = useState<number>(currentMonth);
  const [startYear, setStartYear] = useState<number>(currentYear);

  // Optional Extra Payments State
  const [showExtraPayments, setShowExtraPayments] = useState<boolean>(false);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(0);
  const [extraYearlyPayment, setExtraYearlyPayment] = useState<number>(0);
  const [extraOneTimePayment, setExtraOneTimePayment] = useState<number>(0);
  const [extraStartMonth, setExtraStartMonth] = useState<number>(startMonth);
  const [extraStartYear, setExtraStartYear] = useState<number>(startYear);

  // Validation Error State
  const [validationError, setValidationError] = useState<string>("");

  // Visual Chart Tab Toggle
  const [activeChartTab, setActiveChartTab] = useState<"pie" | "progress">("pie");

  // Save & Share State
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [saveName, setSaveName] = useState<string>("");
  const [savedCalculations, setSavedCalculations] = useState<SavedAmortizationCalculation[]>([]);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>("");
  const [shareSuccessMsg, setShareSuccessMsg] = useState<string>("");

  // Load query params or saved calculations on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("amount")) setLoanAmount(Number(urlParams.get("amount")));
        if (urlParams.has("years")) setLoanTermYears(Number(urlParams.get("years")));
        if (urlParams.has("months")) setLoanTermMonths(Number(urlParams.get("months")));
        if (urlParams.has("rate")) setInterestRate(Number(urlParams.get("rate")));
        if (urlParams.has("extraMonthly")) {
          setShowExtraPayments(true);
          setExtraMonthlyPayment(Number(urlParams.get("extraMonthly")));
        }

        const stored = localStorage.getItem("calcplatform_saved_amortization");
        if (stored) {
          setSavedCalculations(JSON.parse(stored));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Validate inputs
  const validateInputs = () => {
    if (loanAmount <= 0) {
      setValidationError("Loan amount must be greater than $0.");
      return false;
    }
    if (interestRate < 0 || interestRate > 100) {
      setValidationError("Interest rate must be between 0% and 100%.");
      return false;
    }
    if (loanTermYears <= 0 && loanTermMonths <= 0) {
      setValidationError("Loan term must be greater than 0.");
      return false;
    }
    if (loanTermYears > 50) {
      setValidationError("Maximum supported loan term is 50 years.");
      return false;
    }
    setValidationError("");
    return true;
  };

  // Perform Calculation
  const results: AmortizationOutput = useMemo(() => {
    const input: AmortizationInput = {
      loanAmount: Math.max(0, loanAmount),
      loanTermYears: Math.max(0, loanTermYears),
      loanTermMonths: Math.max(0, loanTermMonths),
      interestRate: Math.max(0, interestRate),
      startMonth,
      startYear,
      showExtraPayments,
      extraMonthlyPayment: Math.max(0, extraMonthlyPayment),
      extraYearlyPayment: Math.max(0, extraYearlyPayment),
      extraOneTimePayment: Math.max(0, extraOneTimePayment),
      extraStartMonth,
      extraStartYear,
    };

    return calculateAmortizationModule(input);
  }, [
    loanAmount,
    loanTermYears,
    loanTermMonths,
    interestRate,
    startMonth,
    startYear,
    showExtraPayments,
    extraMonthlyPayment,
    extraYearlyPayment,
    extraOneTimePayment,
    extraStartMonth,
    extraStartYear,
  ]);

  const reportData = useMemo(() => {
    return generateLoanReportData(
      { loanAmount, interestRate, loanTermYears, loanTermMonths },
      { monthlyPayment: results.monthlyPayment, totalInterest: results.totalInterest, totalPayment: results.totalInterest + loanAmount }
    );
  }, [loanAmount, interestRate, loanTermYears, loanTermMonths, results]);

  // Action: Calculate Button
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    validateInputs();
  };

  // Action: Clear / Reset Button
  const handleClear = () => {
    setLoanAmount(200000);
    setLoanTermYears(15);
    setLoanTermMonths(0);
    setInterestRate(6.0);
    setStartMonth(currentMonth);
    setStartYear(currentYear);
    setShowExtraPayments(false);
    setExtraMonthlyPayment(0);
    setExtraYearlyPayment(0);
    setExtraOneTimePayment(0);
    setExtraStartMonth(currentMonth);
    setExtraStartYear(currentYear);
    setValidationError("");
  };

  // Action: Save Calculation
  const handleSaveCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    const newSave: SavedAmortizationCalculation = {
      id: `amort-${Date.now()}`,
      name: saveName.trim() || `Amortization ($${loanAmount.toLocaleString()})`,
      dateSaved: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      inputs: {
        loanAmount,
        loanTermYears,
        loanTermMonths,
        interestRate,
        startMonth,
        startYear,
        showExtraPayments,
        extraMonthlyPayment,
        extraYearlyPayment,
        extraOneTimePayment,
        extraStartMonth,
        extraStartYear,
      },
      monthlyPayment: results.monthlyPayment,
    };

    const updated = [newSave, ...savedCalculations].slice(0, 50);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("calcplatform_saved_amortization", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setSaveSuccessMsg("Calculation saved successfully!");
    setTimeout(() => {
      setSaveSuccessMsg("");
      setIsSaveModalOpen(false);
      setSaveName("");
    }, 1200);
  };

  // Action: Load Saved Calculation
  const handleLoadCalculation = (saved: SavedAmortizationCalculation) => {
    const inp = saved.inputs;
    if (!inp) return;

    setLoanAmount(inp.loanAmount ?? 200000);
    setLoanTermYears(inp.loanTermYears ?? 15);
    setLoanTermMonths(inp.loanTermMonths ?? 0);
    setInterestRate(inp.interestRate ?? 6.0);
    setStartMonth(inp.startMonth ?? currentMonth);
    setStartYear(inp.startYear ?? currentYear);
    setShowExtraPayments(!!inp.showExtraPayments);
    setExtraMonthlyPayment(inp.extraMonthlyPayment ?? 0);
    setExtraYearlyPayment(inp.extraYearlyPayment ?? 0);
    setExtraOneTimePayment(inp.extraOneTimePayment ?? 0);
    setExtraStartMonth(inp.extraStartMonth ?? currentMonth);
    setExtraStartYear(inp.extraStartYear ?? currentYear);

    setIsSaveModalOpen(false);
  };

  // Action: Delete Saved Calculation
  const handleDeleteSavedCalculation = (id: string) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("calcplatform_saved_amortization", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  // Action: Share / Copy URL
  const handleShareUrl = () => {
    const params = new URLSearchParams();
    params.set("amount", loanAmount.toString());
    params.set("years", loanTermYears.toString());
    params.set("months", loanTermMonths.toString());
    params.set("rate", interestRate.toString());
    if (showExtraPayments && extraMonthlyPayment > 0) {
      params.set("extraMonthly", extraMonthlyPayment.toString());
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    if (navigator.share) {
      navigator.share({
        title: "Amortization Calculation",
        text: `Check out this loan amortization calculation on CalcPlatform`,
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
      {/* Top Action Bar: Save, Share, Clear */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-800/80 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700/80 shadow-xs">
        <div className="flex items-center gap-2">
          <TableIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
            Amortization Manager
          </span>
          {savedCalculations.length > 0 && (
            <span className="text-[10px] font-sans tabular-nums bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-semibold">
              {savedCalculations.length} Saved
            </span>
          )}
        </div>

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
            className="h-8 text-xs gap-1.5 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5 text-blue-500" /> Share Link
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsReportModalOpen(true)}
            className="h-8 text-xs gap-1.5 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-purple-500" /> Print / PDF
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => setIsSaveModalOpen(true)}
            className="h-8 text-xs gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
          >
            <Bookmark className="h-3.5 w-3.5" /> Save Calculation
          </Button>
        </div>
      </div>

      {/* Grid Layout: Left Controls (Col 5) | Right Results & Charts (Col 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs Panel (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border border-zinc-200 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                  <TableIcon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Loan Inputs
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-500">
                    Modify the values and click the Calculate button to use
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              {validationError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <form onSubmit={handleCalculate} className="space-y-3">
                {/* Loan Amount */}
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
                      onChange={(e) => {
                        setLoanAmount(Math.max(0, Number(e.target.value)));
                        setValidationError("");
                      }}
                      className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      aria-label="Loan Amount"
                    />
                  </div>
                </div>

                {/* Loan Term (Years & Months) */}
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
                      onChange={(e) => {
                        setLoanTermYears(Math.max(0, Number(e.target.value)));
                        setValidationError("");
                      }}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      aria-label="Loan Term Years"
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
                      onChange={(e) => {
                        setLoanTermMonths(Math.max(0, Number(e.target.value)));
                        setValidationError("");
                      }}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      aria-label="Loan Term Months"
                    />
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <Label htmlFor="interestRate" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Interest Rate (%)
                  </Label>
                  <div className="relative mt-1">
                    <Percent className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      id="interestRate"
                      type="number"
                      step={0.01}
                      min={0}
                      max={100}
                      value={interestRate}
                      onChange={(e) => {
                        setInterestRate(Math.max(0, Number(e.target.value)));
                        setValidationError("");
                      }}
                      className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      aria-label="Interest Rate"
                    />
                  </div>
                </div>

                {/* Start Month & Start Year */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="startMonth" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Start Month
                    </Label>
                    <select
                      id="startMonth"
                      value={startMonth}
                      onChange={(e) => setStartMonth(Number(e.target.value))}
                      className="mt-1 w-full h-9 rounded-md bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 px-3 text-xs text-zinc-900 dark:text-zinc-100 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {monthOptions.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="startYear" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Start Year
                    </Label>
                    <Input
                      id="startYear"
                      type="number"
                      min={2000}
                      max={2100}
                      value={startYear}
                      onChange={(e) => setStartYear(Number(e.target.value))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                    />
                  </div>
                </div>

                {/* Optional Extra Payments Checkbox */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={showExtraPayments}
                      onChange={(e) => setShowExtraPayments(e.target.checked)}
                      className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      Optional: make extra payments
                    </span>
                  </label>
                </div>

                {/* Extra Payments Panel */}
                {showExtraPayments && (
                  <div className="space-y-3 p-3 bg-zinc-50/80 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/80 pt-3">
                    <div>
                      <Label htmlFor="extraMonthlyPayment" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Extra Monthly Payment ($)
                      </Label>
                      <Input
                        id="extraMonthlyPayment"
                        type="number"
                        min={0}
                        step={50}
                        value={extraMonthlyPayment}
                        onChange={(e) => setExtraMonthlyPayment(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>

                    <div>
                      <Label htmlFor="extraYearlyPayment" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Extra Yearly Payment ($)
                      </Label>
                      <Input
                        id="extraYearlyPayment"
                        type="number"
                        min={0}
                        step={100}
                        value={extraYearlyPayment}
                        onChange={(e) => setExtraYearlyPayment(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>

                    <div>
                      <Label htmlFor="extraOneTimePayment" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        One-Time Extra Payment ($)
                      </Label>
                      <Input
                        id="extraOneTimePayment"
                        type="number"
                        min={0}
                        step={500}
                        value={extraOneTimePayment}
                        onChange={(e) => setExtraOneTimePayment(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <Label className="text-[10px] text-zinc-500">Extra Start Month</Label>
                        <select
                          value={extraStartMonth}
                          onChange={(e) => setExtraStartMonth(Number(e.target.value))}
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
                        <Label className="text-[10px] text-zinc-500">Extra Start Year</Label>
                        <Input
                          type="number"
                          min={2000}
                          max={2100}
                          value={extraStartYear}
                          onChange={(e) => setExtraStartYear(Number(e.target.value))}
                          className="mt-0.5 h-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-[11px]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Calculate & Clear Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 h-9 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                  >
                    Calculate
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClear}
                    className="h-9 text-xs font-semibold border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900"
                  >
                    <RotateCcw className="h-3.5 w-3.5 mr-1" /> Clear
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Results Panel (Col 7) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Large Result Summary Section */}
          <Card className="border border-blue-100 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950/30 shadow-md">
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                    Monthly Loan Payment
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
                  {formatCurrency(results.monthlyPayment)}
                </div>
              </div>

              {/* Responsive Summary Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 border-t border-blue-100 dark:border-zinc-800">
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Total Payments</span>
                  <span className="text-sm font-bold font-sans tabular-nums text-zinc-900 dark:text-zinc-100">
                    {results.totalPaymentsCount} payments
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Total Principal</span>
                  <span className="text-sm font-bold font-sans tabular-nums text-blue-600 dark:text-blue-400">
                    {formatCurrency(results.totalPrincipal)}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Total Interest</span>
                  <span className="text-sm font-bold font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(results.totalInterest)}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Total Amount Paid</span>
                  <span className="text-sm font-bold font-sans tabular-nums text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(results.totalAmountPaid)}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Loan Payoff Date</span>
                  <span className="text-sm font-bold font-sans tabular-nums text-amber-600 dark:text-amber-400 truncate block">
                    {results.loanPayoffDate}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Interest Saved</span>
                  <span className="text-sm font-bold font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(results.interestSaved)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Mode Card (Original vs Extra Payment Loan) */}
          {showExtraPayments && (results.interestSaved > 0 || results.timeSavedMonths > 0) && (
            <Card className="border border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/20 shadow-xs">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-900/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs uppercase font-bold text-emerald-900 dark:text-emerald-200">
                      Comparison: Original Loan vs. Extra Payments Loan
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white/80 dark:bg-zinc-900/80 rounded-xl border border-emerald-100 dark:border-emerald-900 space-y-1">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300 block">
                      Original Interest vs. New Interest
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
                      Saved: {formatCurrency(results.interestSaved)}
                    </div>
                  </div>

                  <div className="p-3 bg-white/80 dark:bg-zinc-900/80 rounded-xl border border-emerald-100 dark:border-emerald-900 space-y-1">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300 block">
                      Original Payoff Date vs. New Payoff Date
                    </span>
                    <div className="flex items-center justify-between font-sans tabular-nums">
                      <span className="text-zinc-500 line-through">
                        {results.baselinePayoffDate}
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {results.loanPayoffDate}
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

          {/* 2. Visual Charts Section (Chart 1 & Chart 2) */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Visual Charts & Loan Breakdown
              </h3>
              <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <button
                  type="button"
                  onClick={() => setActiveChartTab("pie")}
                  className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    activeChartTab === "pie"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  <PieIcon className="h-3 w-3" /> Chart 1: Breakdown
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChartTab("progress")}
                  className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    activeChartTab === "progress"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  <TrendingUp className="h-3 w-3" /> Chart 2: Progress
                </button>
              </div>
            </div>

            <div className="pt-1">
              {activeChartTab === "pie" ? (
                <AmortizationPieChart
                  totalPrincipal={results.totalPrincipal}
                  totalInterest={results.totalInterest}
                />
              ) : (
                <AmortizationProgressChart schedule={results.monthlySchedule} />
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
                Amortization Schedule
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500">
                Annual & Monthly breakdown tables with search, sorting, pagination, and CSV / Excel / PDF / Print export
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <AmortizationScheduleTable
            monthlySchedule={results.monthlySchedule}
            annualSchedule={results.annualSchedule}
          />
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
                <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">
                  Save Calculation
                </h3>
                <p className="text-xs text-zinc-500">
                  Save your amortization calculation setup locally to restore later
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
                    Monthly Pay: {formatCurrency(results.monthlyPayment)}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    ${loanAmount.toLocaleString()} loan, {loanTermYears} yrs @ {interestRate}% rate
                  </span>
                </div>

                <div>
                  <Label htmlFor="saveName" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Calculation Name
                  </Label>
                  <Input
                    id="saveName"
                    type="text"
                    placeholder="e.g. 15-Year Mortgage Setup"
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
                    Save Calculation
                  </Button>
                </div>
              </form>
            )}

            {/* Saved Calculations List */}
            {savedCalculations.length > 0 && (
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <FolderOpen className="h-3.5 w-3.5 text-blue-500" /> Saved Calculations ({savedCalculations.length})
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
                          {formatCurrency(item.monthlyPayment)}/mo • {item.dateSaved}
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
                          title="Delete saved calculation"
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

export default AmortizationCalculator;
