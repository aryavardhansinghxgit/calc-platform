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
  Home,
  DollarSign,
  Calendar,
  Percent,
  Sliders,
  TrendingUp,
  PlusCircle,
  BarChart2,
  PieChart as PieIcon,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Trash2,
  RotateCcw,
  Check,
  X,
  Plus,
  Minus,
  RefreshCw,
  FolderOpen,
  Printer,
} from "lucide-react";
import { calculateMortgageModule } from "@/modules/mortgage/formula";
import {
  MortgageModuleInput,
  MortgageModuleOutput,
  OneTimePaymentEntry,
  SavedMortgageCalculation,
} from "@/modules/mortgage/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";
import { AmortizationTable } from "./AmortizationTable";
import ReportModal from "@/components/report/ReportModal";
import { generateMortgageReportData } from "@/lib/report-generator/mortgage-report";

// Lazy load chart components
const MortgagePieChart = dynamic(
  () => import("../charts/MortgagePieChart").then((m) => m.MortgagePieChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-sans tabular-nums">
        Loading doughnut chart...
      </div>
    ),
  }
);

const BalanceLineChart = dynamic(
  () => import("../charts/BalanceLineChart").then((m) => m.BalanceLineChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-sans tabular-nums">
        Loading line chart...
      </div>
    ),
  }
);

const AmortizationAreaChart = dynamic(
  () => import("../charts/AmortizationAreaChart").then((m) => m.AmortizationAreaChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-sans tabular-nums">
        Loading area chart...
      </div>
    ),
  }
);

export function MortgageCalculator() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // Basic Inputs State
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPayment, setDownPayment] = useState<number>(80000);
  const [downPaymentType, setDownPaymentType] = useState<"amount" | "percent">("amount");
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.706);
  const [startMonth, setStartMonth] = useState<number>(currentMonth);
  const [startYear, setStartYear] = useState<number>(currentYear);

  // Advanced Section State
  const [propertyTax, setPropertyTax] = useState<number>(1.2);
  const [propertyTaxType, setPropertyTaxType] = useState<"amount" | "percent">("percent");
  const [homeInsurance, setHomeInsurance] = useState<number>(1500);
  const [pmiRate, setPmiRate] = useState<number>(0);
  const [hoaFee, setHoaFee] = useState<number>(333.33);
  const [otherCosts, setOtherCosts] = useState<number>(4000);

  // Annual Increase Settings State
  const [propertyTaxIncrease, setPropertyTaxIncrease] = useState<number>(0);
  const [insuranceIncrease, setInsuranceIncrease] = useState<number>(0);
  const [hoaIncrease, setHoaIncrease] = useState<number>(0);
  const [otherCostsIncrease, setOtherCostsIncrease] = useState<number>(0);

  // Extra Payments State
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(0);
  const [extraMonthlyStartMonth, setExtraMonthlyStartMonth] = useState<number>(startMonth);
  const [extraMonthlyStartYear, setExtraMonthlyStartYear] = useState<number>(startYear);

  const [extraYearlyPayment, setExtraYearlyPayment] = useState<number>(0);
  const [extraYearlyStartMonth, setExtraYearlyStartMonth] = useState<number>(startMonth);
  const [extraYearlyStartYear, setExtraYearlyStartYear] = useState<number>(startYear);

  // Multiple One-Time Payments (Default 8 rows as in screenshot)
  const initialOneTimeRows: OneTimePaymentEntry[] = Array.from({ length: 8 }).map((_, idx) => ({
    id: `otp-${idx + 1}`,
    amount: 0,
    month: startMonth,
    year: startYear,
  }));
  const [extraOneTimePayments, setExtraOneTimePayments] = useState<OneTimePaymentEntry[]>(initialOneTimeRows);

  // Biweekly Toggle
  const [showBiweekly, setShowBiweekly] = useState<boolean>(false);

  // Collapsible section toggles
  const [showAdvanced, setShowAdvanced] = useState<boolean>(true);
  const [showIncreases, setShowIncreases] = useState<boolean>(true);
  const [showExtraPayments, setShowExtraPayments] = useState<boolean>(true);
  const [activeChartTab, setActiveChartTab] = useState<"doughnut" | "balance" | "area">("doughnut");

  // Save Modal & State
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [saveName, setSaveName] = useState<string>("");
  const [saveDescription, setSaveDescription] = useState<string>("");
  const [savedCalculations, setSavedCalculations] = useState<SavedMortgageCalculation[]>([]);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>("");

  // Load saved calculations from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("calcplatform_saved_mortgages");
      if (stored) {
        setSavedCalculations(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load saved calculations", e);
    }
  }, []);

  // Save calculation handler
  const handleSaveCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    const newSave: SavedMortgageCalculation = {
      id: `calc-${Date.now()}`,
      name: saveName.trim() || `Mortgage ($${homePrice.toLocaleString()})`,
      description: saveDescription.trim() || `${loanTermYears} yrs @ ${interestRate}%`,
      dateSaved: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      inputs: {
        homePrice,
        downPayment,
        downPaymentType,
        loanTermYears,
        interestRate,
        startMonth,
        startYear,
        propertyTax,
        propertyTaxType,
        homeInsurance,
        pmiRate,
        hoaFee,
        otherCosts,
        propertyTaxIncrease,
        insuranceIncrease,
        hoaIncrease,
        otherCostsIncrease,
        extraMonthlyPayment,
        extraYearlyPayment,
        extraOneTimePayments,
        showBiweekly,
      },
      monthlyPayment: results.totalInitialMonthlyPayment,
    };

    const updated = [newSave, ...savedCalculations].slice(0, 100);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("calcplatform_saved_mortgages", JSON.stringify(updated));
    } catch (err) {
      console.error("Error writing to localStorage", err);
    }

    setSaveSuccessMsg("Calculation saved successfully!");
    setTimeout(() => {
      setSaveSuccessMsg("");
      setIsSaveModalOpen(false);
      setSaveName("");
      setSaveDescription("");
    }, 1200);
  };

  // Load calculation handler
  const handleLoadCalculation = (saved: SavedMortgageCalculation) => {
    const inp = saved.inputs;
    if (!inp) return;

    setHomePrice(inp.homePrice ?? 400000);
    setDownPayment(inp.downPayment ?? 80000);
    setDownPaymentType(inp.downPaymentType ?? "amount");
    setLoanTermYears(inp.loanTermYears ?? 30);
    setInterestRate(inp.interestRate ?? 6.5);
    setStartMonth(inp.startMonth ?? currentMonth);
    setStartYear(inp.startYear ?? currentYear);

    setPropertyTax(inp.propertyTax ?? 1.2);
    setPropertyTaxType(inp.propertyTaxType ?? "percent");
    setHomeInsurance(inp.homeInsurance ?? 1500);
    setPmiRate(inp.pmiRate ?? 0);
    setHoaFee(inp.hoaFee ?? 0);
    setOtherCosts(inp.otherCosts ?? 0);

    setPropertyTaxIncrease(inp.propertyTaxIncrease ?? 0);
    setInsuranceIncrease(inp.insuranceIncrease ?? 0);
    setHoaIncrease(inp.hoaIncrease ?? 0);
    setOtherCostsIncrease(inp.otherCostsIncrease ?? 0);

    setExtraMonthlyPayment(inp.extraMonthlyPayment ?? 0);
    setExtraYearlyPayment(inp.extraYearlyPayment ?? 0);
    if (inp.extraOneTimePayments) setExtraOneTimePayments(inp.extraOneTimePayments);
    setShowBiweekly(!!inp.showBiweekly);

    setIsSaveModalOpen(false);
  };

  // Delete saved calculation handler
  const handleDeleteSavedCalculation = (id: string) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("calcplatform_saved_mortgages", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  // Sync Down Payment when toggling between amount & percentage
  const handleDownPaymentTypeToggle = (newType: "amount" | "percent") => {
    if (newType === downPaymentType) return;
    if (newType === "percent") {
      const pct = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
      setDownPayment(Number(pct.toFixed(2)));
    } else {
      const amt = (homePrice * downPayment) / 100;
      setDownPayment(Math.round(amt));
    }
    setDownPaymentType(newType);
  };

  // Sync Property Tax when toggling between amount & percentage
  const handlePropertyTaxTypeToggle = (newType: "amount" | "percent") => {
    if (newType === propertyTaxType) return;
    if (newType === "percent") {
      const pct = homePrice > 0 ? (propertyTax / homePrice) * 100 : 0;
      setPropertyTax(Number(pct.toFixed(2)));
    } else {
      const amt = (homePrice * propertyTax) / 100;
      setPropertyTax(Math.round(amt));
    }
    setPropertyTaxType(newType);
  };

  // One-time payment handlers
  const handleOneTimePaymentChange = (id: string, field: "amount" | "month" | "year", val: number) => {
    setExtraOneTimePayments((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: val } : row))
    );
  };

  const handleAddOneTimeRow = () => {
    const newId = `otp-${Date.now()}`;
    setExtraOneTimePayments((prev) => [
      ...prev,
      { id: newId, amount: 0, month: startMonth, year: startYear },
    ]);
  };

  const handleRemoveOneTimeRow = (id: string) => {
    setExtraOneTimePayments((prev) => prev.filter((r) => r.id !== id));
  };

  // Reset form inputs
  const handleResetForm = () => {
    setHomePrice(400000);
    setDownPayment(80000);
    setDownPaymentType("amount");
    setLoanTermYears(30);
    setInterestRate(6.706);
    setStartMonth(currentMonth);
    setStartYear(currentYear);

    setPropertyTax(1.2);
    setPropertyTaxType("percent");
    setHomeInsurance(1500);
    setPmiRate(0);
    setHoaFee(333.33);
    setOtherCosts(4000);

    setPropertyTaxIncrease(0);
    setInsuranceIncrease(0);
    setHoaIncrease(0);
    setOtherCostsIncrease(0);

    setExtraMonthlyPayment(0);
    setExtraYearlyPayment(0);
    setExtraOneTimePayments(initialOneTimeRows);
    setShowBiweekly(false);
  };

  // Memoized Financial Calculations
  const results: MortgageModuleOutput = useMemo(() => {
    const input: MortgageModuleInput = {
      homePrice,
      downPayment,
      downPaymentType,
      loanTermYears,
      interestRate,
      startMonth,
      startYear,

      propertyTax,
      propertyTaxType,
      homeInsurance,
      pmiRate,
      hoaFee,
      otherCosts,

      propertyTaxIncrease,
      insuranceIncrease,
      hoaIncrease,
      otherCostsIncrease,

      extraMonthlyPayment,
      extraMonthlyStartMonth,
      extraMonthlyStartYear,

      extraYearlyPayment,
      extraYearlyStartMonth,
      extraYearlyStartYear,

      extraOneTimePayments,
      showBiweekly,
    };

    return calculateMortgageModule(input);
  }, [
    homePrice,
    downPayment,
    downPaymentType,
    loanTermYears,
    interestRate,
    startMonth,
    startYear,
    propertyTax,
    propertyTaxType,
    homeInsurance,
    pmiRate,
    hoaFee,
    otherCosts,
    propertyTaxIncrease,
    insuranceIncrease,
    hoaIncrease,
    otherCostsIncrease,
    extraMonthlyPayment,
    extraMonthlyStartMonth,
    extraMonthlyStartYear,
    extraYearlyPayment,
    extraYearlyStartMonth,
    extraYearlyStartYear,
    extraOneTimePayments,
    showBiweekly,
  ]);

  const reportData = useMemo(() => {
    return generateMortgageReportData(
      {
        homePrice,
        downPayment,
        downPaymentType,
        loanTermYears,
        interestRate,
        startMonth,
        startYear,
        propertyTax,
        propertyTaxType,
        homeInsurance,
        pmiRate,
        hoaFee,
        otherCosts,
      },
      results
    );
  }, [
    homePrice,
    downPayment,
    downPaymentType,
    loanTermYears,
    interestRate,
    startMonth,
    startYear,
    propertyTax,
    propertyTaxType,
    homeInsurance,
    pmiRate,
    hoaFee,
    otherCosts,
    results,
  ]);

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
      {/* Top Action Bar: Save & Load Saved Calculations */}
      {/* Top Action Bar: Save & Load Saved Calculations */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <Bookmark className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Mortgage Calculation Manager
          </span>
          {savedCalculations.length > 0 && (
            <span className="text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full">
              {savedCalculations.length} Saved
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetForm}
            className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-medium rounded-xl px-3.5 py-2 text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Clear
          </button>

          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-medium rounded-xl px-3.5 py-2 text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-purple-500" /> Print / PDF
          </button>

          <button
            type="button"
            onClick={() => setIsSaveModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl px-4 py-2 text-xs shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Bookmark className="h-3.5 w-3.5" /> Save
          </button>
        </div>
      </div>

      {/* Grid Layout: Left Controls (Col 5) | Right Results & Charts (Col 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs Panel (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-blue-600 dark:text-blue-400">
                Mortgage Inputs
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Modify values to recalculate payments instantly
              </p>
            </div>

            {/* Basic Inputs */}
            <div className="space-y-4">
              <div className="border-b border-slate-200/80 dark:border-slate-800 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Basic Loan Details
                </h4>
              </div>

                {/* Home Price */}
                <div>
                  <Label htmlFor="homePrice" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Home Price ($)
                  </Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      id="homePrice"
                      type="number"
                      min={0}
                      step={5000}
                      value={homePrice}
                      onChange={(e) => setHomePrice(Math.max(0, Number(e.target.value)))}
                      className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                    />
                  </div>
                </div>

                {/* Down Payment with Amount / % Toggle */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="downPayment" className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Down Payment
                    </Label>
                    <div className="inline-flex rounded-lg p-0.5 bg-slate-200 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
                      <button
                        type="button"
                        onClick={() => handleDownPaymentTypeToggle("amount")}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                          downPaymentType === "amount"
                            ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-xs"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                        }`}
                      >
                        $ Amount
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownPaymentTypeToggle("percent")}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                          downPaymentType === "percent"
                            ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-xs"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                        }`}
                      >
                        % Percent
                      </button>
                    </div>
                  </div>
                  <div className="relative mt-1">
                    {downPaymentType === "amount" ? (
                      <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    ) : (
                      <Percent className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    )}
                    <Input
                      id="downPayment"
                      type="number"
                      min={0}
                      step={downPaymentType === "amount" ? 1000 : 0.5}
                      value={downPayment}
                      onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
                      className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1">
                    <span>
                      Calculated:{" "}
                      {downPaymentType === "amount"
                        ? `${results.downPaymentPercent.toFixed(1)}%`
                        : formatCurrency(results.downPaymentAmount)}
                    </span>
                    <span>Loan: {formatCurrency(results.loanAmount)}</span>
                  </div>
                </div>

                {/* Term & Rate Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="loanTermYears" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Loan Term (Years)
                    </Label>
                    <Input
                      id="loanTermYears"
                      type="number"
                      min={1}
                      max={50}
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(Math.max(1, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="interestRate" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Interest Rate (%)
                    </Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step={0.001}
                      min={0}
                      max={30}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
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
              </div>

              {/* Advanced Section Collapsible */}
              <div className="border-t border-slate-200/80 dark:border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-blue-600 py-1 cursor-pointer"
                >
                  <span>Include Taxes & Fees</span>
                  {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {showAdvanced && (
                  <div className="space-y-3 pt-3">
                    {/* Property Taxes */}
                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="propertyTax" className="text-zinc-700 dark:text-zinc-300 font-medium">
                          Property Taxes
                        </Label>
                        <div className="inline-flex rounded-lg p-0.5 bg-slate-200 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
                          <button
                            type="button"
                            onClick={() => handlePropertyTaxTypeToggle("percent")}
                            className={`px-2 py-0.5 text-xs font-semibold rounded-md transition-all ${
                              propertyTaxType === "percent"
                                ? "bg-white dark:bg-slate-700 text-blue-700 shadow-xs"
                                : "text-slate-600"
                            }`}
                          >
                            %
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePropertyTaxTypeToggle("amount")}
                            className={`px-2 py-0.5 text-xs font-semibold rounded-md transition-all ${
                              propertyTaxType === "amount"
                                ? "bg-white dark:bg-slate-700 text-blue-700 shadow-xs"
                                : "text-slate-600"
                            }`}
                          >
                            $
                          </button>
                        </div>
                      </div>
                      <Input
                        id="propertyTax"
                        type="number"
                        min={0}
                        step={propertyTaxType === "amount" ? 100 : 0.1}
                        value={propertyTax}
                        onChange={(e) => setPropertyTax(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>

                    {/* Home Insurance & PMI Rate Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="homeInsurance" className="text-zinc-700 dark:text-zinc-300 font-medium">
                          Home Insurance ($/yr)
                        </Label>
                        <Input
                          id="homeInsurance"
                          type="number"
                          min={0}
                          step={50}
                          value={homeInsurance}
                          onChange={(e) => setHomeInsurance(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pmiRate" className="text-zinc-700 dark:text-zinc-300 font-medium">
                          PMI Insurance (%/yr)
                        </Label>
                        <Input
                          id="pmiRate"
                          type="number"
                          step={0.1}
                          min={0}
                          value={pmiRate}
                          onChange={(e) => setPmiRate(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                        />
                      </div>
                    </div>

                    {/* HOA & Other Costs Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="hoaFee" className="text-zinc-700 dark:text-zinc-300 font-medium">
                          HOA Fee ($/mo)
                        </Label>
                        <Input
                          id="hoaFee"
                          type="number"
                          min={0}
                          step={10}
                          value={hoaFee}
                          onChange={(e) => setHoaFee(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="otherCosts" className="text-zinc-700 dark:text-zinc-300 font-medium">
                          Other Costs ($/yr)
                        </Label>
                        <Input
                          id="otherCosts"
                          type="number"
                          min={0}
                          step={100}
                          value={otherCosts}
                          onChange={(e) => setOtherCosts(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Annual Tax & Cost Increase Collapsible */}
              <div className="border-t border-slate-200/80 dark:border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setShowIncreases(!showIncreases)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-blue-600 py-1 cursor-pointer"
                >
                  <span>Annual Tax & Cost Increase (%)</span>
                  {showIncreases ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {showIncreases && (
                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <div>
                      <Label htmlFor="propertyTaxIncrease" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Property Tax Increase %
                      </Label>
                      <Input
                        id="propertyTaxIncrease"
                        type="number"
                        step={0.1}
                        min={0}
                        value={propertyTaxIncrease}
                        onChange={(e) => setPropertyTaxIncrease(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="insuranceIncrease" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Home Insurance Increase %
                      </Label>
                      <Input
                        id="insuranceIncrease"
                        type="number"
                        step={0.1}
                        min={0}
                        value={insuranceIncrease}
                        onChange={(e) => setInsuranceIncrease(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hoaIncrease" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        HOA Fee Increase %
                      </Label>
                      <Input
                        id="hoaIncrease"
                        type="number"
                        step={0.1}
                        min={0}
                        value={hoaIncrease}
                        onChange={(e) => setHoaIncrease(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="otherCostsIncrease" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Other Costs Increase %
                      </Label>
                      <Input
                        id="otherCostsIncrease"
                        type="number"
                        step={0.1}
                        min={0}
                        value={otherCostsIncrease}
                        onChange={(e) => setOtherCostsIncrease(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Extra Payments Section */}
              <div className="border-t border-slate-200/80 dark:border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setShowExtraPayments(!showExtraPayments)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-blue-600 py-1 cursor-pointer"
                >
                  <span>Extra Principal Payments</span>
                  {showExtraPayments ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {showExtraPayments && (
                  <div className="space-y-3 pt-3">
                    {/* Extra Monthly Payment */}
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-5">
                        <Label htmlFor="extraMonthlyPayment" className="text-zinc-700 dark:text-zinc-300 font-medium">
                          Extra Monthly Pay
                        </Label>
                        <Input
                          id="extraMonthlyPayment"
                          type="number"
                          min={0}
                          step={50}
                          value={extraMonthlyPayment}
                          onChange={(e) => setExtraMonthlyPayment(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                        />
                      </div>
                      <div className="col-span-7 flex items-center gap-1 mt-4">
                        <span className="text-[10px] text-zinc-400">from</span>
                        <select
                          value={extraMonthlyStartMonth}
                          onChange={(e) => setExtraMonthlyStartMonth(Number(e.target.value))}
                          className="h-8 rounded bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] px-1 text-zinc-900 dark:text-zinc-100"
                        >
                          {monthOptions.map((m) => (
                            <option key={m.value} value={m.value}>
                              {m.label}
                            </option>
                          ))}
                        </select>
                        <Input
                          type="number"
                          value={extraMonthlyStartYear}
                          onChange={(e) => setExtraMonthlyStartYear(Number(e.target.value))}
                          className="h-8 w-16 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-[10px] px-1"
                        />
                      </div>
                    </div>

                    {/* Extra Yearly Payment */}
                    <div className="grid grid-cols-12 gap-2 items-center pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <div className="col-span-5">
                        <Label htmlFor="extraYearlyPayment" className="text-zinc-700 dark:text-zinc-300 font-medium">
                          Extra Yearly Pay
                        </Label>
                        <Input
                          id="extraYearlyPayment"
                          type="number"
                          min={0}
                          step={100}
                          value={extraYearlyPayment}
                          onChange={(e) => setExtraYearlyPayment(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                        />
                      </div>
                      <div className="col-span-7 flex items-center gap-1 mt-4">
                        <span className="text-[10px] text-zinc-400">from</span>
                        <select
                          value={extraYearlyStartMonth}
                          onChange={(e) => setExtraYearlyStartMonth(Number(e.target.value))}
                          className="h-8 rounded bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] px-1 text-zinc-900 dark:text-zinc-100"
                        >
                          {monthOptions.map((m) => (
                            <option key={m.value} value={m.value}>
                              {m.label}
                            </option>
                          ))}
                        </select>
                        <Input
                          type="number"
                          value={extraYearlyStartYear}
                          onChange={(e) => setExtraYearlyStartYear(Number(e.target.value))}
                          className="h-8 w-16 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-[10px] px-1"
                        />
                      </div>
                    </div>

                    {/* Multiple One-Time Payments List */}
                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-zinc-700 dark:text-zinc-300 font-semibold text-xs">
                          Extra One-Time Payments
                        </Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleAddOneTimeRow}
                          className="h-6 text-[10px] px-2 text-blue-600 dark:text-blue-400 gap-1 hover:bg-blue-50 dark:hover:bg-blue-950"
                        >
                          <Plus className="h-3 w-3" /> Add Payment Row
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {extraOneTimePayments.map((row, idx) => (
                          <div
                            key={row.id}
                            className="flex items-center gap-1.5 p-1.5 rounded-lg bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80"
                          >
                            <span className="text-[10px] font-sans tabular-nums text-zinc-400 w-4 text-center">
                              {idx + 1}.
                            </span>
                            <div className="relative flex-1">
                              <DollarSign className="absolute left-2 top-2 h-3 w-3 text-zinc-400" />
                              <Input
                                type="number"
                                min={0}
                                step={100}
                                value={row.amount || ""}
                                placeholder="0"
                                onChange={(e) =>
                                  handleOneTimePaymentChange(row.id, "amount", Number(e.target.value))
                                }
                                className="pl-6 h-7 text-xs bg-white dark:bg-zinc-900 font-sans tabular-nums border-zinc-200 dark:border-zinc-700"
                              />
                            </div>
                            <span className="text-[10px] text-zinc-400">in</span>
                            <select
                              value={row.month}
                              onChange={(e) =>
                                handleOneTimePaymentChange(row.id, "month", Number(e.target.value))
                              }
                              className="h-7 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-[10px] px-1 text-zinc-900 dark:text-zinc-100"
                            >
                              {monthOptions.map((m) => (
                                <option key={m.value} value={m.value}>
                                  {m.label}
                                </option>
                              ))}
                            </select>
                            <Input
                              type="number"
                              value={row.year}
                              onChange={(e) =>
                                handleOneTimePaymentChange(row.id, "year", Number(e.target.value))
                              }
                              className="h-7 w-16 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-[10px] px-1"
                            />
                            {extraOneTimePayments.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveOneTimeRow(row.id)}
                                className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                                title="Remove row"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Biweekly Toggle Checkbox */}
              <div className="border-t border-slate-200/80 dark:border-slate-800 pt-4">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showBiweekly}
                    onChange={(e) => setShowBiweekly(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Show Biweekly Payback Results
                  </span>
                </label>
              </div>
            </div>
          </div>

        {/* Right Results Panel (Col 7) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Large Monthly Payment Hero Card */}
          <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/40 dark:from-slate-900 dark:to-blue-950/40 border border-blue-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-blue-700 dark:text-blue-400">
                  Total Estimated Monthly Payment
                </span>
                <button
                  type="button"
                  onClick={() => setIsSaveModalOpen(true)}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Bookmark className="h-3.5 w-3.5" /> Save
                </button>
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-700 dark:text-blue-400 font-sans tabular-nums mt-2 tracking-tight">
                {formatCurrency(results.totalInitialMonthlyPayment)}
              </div>
            </div>

            {/* Monthly Breakdown Sub-Metric Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-blue-100 dark:border-slate-800">
              <div className="bg-white/90 dark:bg-slate-800/80 p-3 rounded-xl border border-blue-100 dark:border-slate-700/60 shadow-2xs">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">P&I Base</span>
                <span className="text-sm font-extrabold font-sans tabular-nums text-blue-700 dark:text-blue-400">
                  {formatCurrency(results.monthlyPrincipalAndInterest)}
                </span>
              </div>
              <div className="bg-white/90 dark:bg-slate-800/80 p-3 rounded-xl border border-emerald-100 dark:border-slate-700/60 shadow-2xs">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">Property Tax</span>
                <span className="text-sm font-extrabold font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(results.monthlyPropertyTax)}
                </span>
              </div>
              <div className="bg-white/90 dark:bg-slate-800/80 p-3 rounded-xl border border-amber-100 dark:border-slate-700/60 shadow-2xs">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">Home Insurance</span>
                <span className="text-sm font-extrabold font-sans tabular-nums text-amber-600 dark:text-amber-400">
                  {formatCurrency(results.monthlyInsurance)}
                </span>
              </div>
              <div className="bg-white/90 dark:bg-slate-800/80 p-3 rounded-xl border border-purple-100 dark:border-slate-700/60 shadow-2xs">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">Other Costs</span>
                <span className="text-sm font-extrabold font-sans tabular-nums text-purple-600 dark:text-purple-400">
                  {formatCurrency(
                    results.monthlyPmi + results.monthlyHoa + results.monthlyOtherCosts
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Biweekly Results Card (Rendered if Show Biweekly is Checked) */}
          {showBiweekly && (
            <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-900/60 pb-2.5">
                <span className="text-xs uppercase font-bold text-emerald-900 dark:text-emerald-200 tracking-wider">
                  Biweekly Payback Results Summary
                </span>
                <span className="text-xs font-sans tabular-nums text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-900 px-2.5 py-0.5 rounded-full">
                  26 Pay Periods / Yr
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-xs text-emerald-800 dark:text-emerald-400 block font-medium">
                    Biweekly Payment
                  </span>
                  <span className="text-base font-extrabold text-emerald-900 dark:text-emerald-100 font-sans tabular-nums">
                    {formatCurrency(results.biweeklyPayment)}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-emerald-800 dark:text-emerald-400 block font-medium">
                    Biweekly Payoff Date
                  </span>
                  <span className="text-base font-extrabold text-emerald-900 dark:text-emerald-100 font-sans tabular-nums">
                    {results.biweeklyPayoffDate}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-emerald-800 dark:text-emerald-400 block font-medium">
                    Biweekly Total Interest
                  </span>
                  <span className="text-base font-extrabold text-emerald-900 dark:text-emerald-100 font-sans tabular-nums">
                    {formatCurrency(results.biweeklyTotalInterest)}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-emerald-800 dark:text-emerald-400 block font-medium">
                    Interest Savings
                  </span>
                  <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums">
                    {formatCurrency(results.biweeklyInterestSavings)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 2. Summary Statistics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Loan Amount</span>
              <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                {formatCurrency(results.loanAmount)}
              </span>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Total Interest</span>
              <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 font-sans tabular-nums">
                {formatCurrency(results.totalInterestPaid)}
              </span>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Total Cost of Loan</span>
              <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                {formatCurrency(results.totalCost)}
              </span>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Payoff Date</span>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums truncate block">
                {results.payoffDate}
              </span>
            </div>
          </div>

          {/* Interest Savings Banner if extra payments are present */}
          {results.interestSavings > 0 && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="font-bold text-emerald-900 dark:text-emerald-200">
                    Extra Payments Impact:
                  </span>{" "}
                  <span className="text-emerald-800 dark:text-emerald-300">
                    Saves {formatCurrency(results.interestSavings)} in interest & pays off {results.monthsSaved} months early!
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Visual Charts & Donut Section with Tab Switcher */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Visual Analytics & Charts
              </h3>
              <div className="inline-flex p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveChartTab("doughnut")}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeChartTab === "doughnut"
                      ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Doughnut
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChartTab("balance")}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeChartTab === "balance"
                      ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Balance Line
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChartTab("area")}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeChartTab === "area"
                      ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Principal vs Interest
                </button>
              </div>
            </div>

            <div className="pt-1">
              {activeChartTab === "doughnut" && (
                <MortgagePieChart
                  principalAndInterest={results.monthlyPrincipalAndInterest}
                  propertyTax={results.monthlyPropertyTax}
                  insurance={results.monthlyInsurance}
                  otherCosts={results.monthlyPmi + results.monthlyHoa + results.monthlyOtherCosts}
                  extraPayment={extraMonthlyPayment}
                />
              )}
              {activeChartTab === "balance" && (
                <BalanceLineChart schedule={results.amortizationSchedule} />
              )}
              {activeChartTab === "area" && (
                <AmortizationAreaChart schedule={results.amortizationSchedule} />
              )}
            </div>
          </div>

          {/* 4. Monthly vs Total Cost Breakdown Table */}
          <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Monthly vs. Total Lifetime Cost Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                    <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Category</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right">
                      Monthly (Year 1)
                    </TableHead>
                    <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right">
                      Lifetime Total
                    </TableHead>
                    <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right">
                      % of Total Cost
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.breakdown.map((item, idx) => (
                    <TableRow key={idx} className="border-zinc-100 dark:border-zinc-800">
                      <TableCell className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.category}
                      </TableCell>
                      <TableCell className="text-xs font-sans tabular-nums font-medium text-right text-zinc-800 dark:text-zinc-200">
                        {formatCurrency(item.monthlyFirstYear)}
                      </TableCell>
                      <TableCell className="text-xs font-sans tabular-nums font-semibold text-right text-zinc-900 dark:text-zinc-100">
                        {formatCurrency(item.totalLifetime)}
                      </TableCell>
                      <TableCell className="text-xs font-sans tabular-nums text-right text-zinc-500">
                        {item.percentageOfTotal.toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-800/80 font-bold">
                    <TableCell className="text-xs text-zinc-900 dark:text-zinc-100">Total Out of Pocket</TableCell>
                    <TableCell className="text-xs font-sans tabular-nums text-right text-blue-600 dark:text-blue-400">
                      {formatCurrency(results.totalInitialMonthlyPayment)}
                    </TableCell>
                    <TableCell className="text-xs font-sans tabular-nums text-right text-blue-600 dark:text-blue-400">
                      {formatCurrency(results.totalCost)}
                    </TableCell>
                    <TableCell className="text-xs font-sans tabular-nums text-right text-blue-600 dark:text-blue-400">
                      100.0%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Amortization Schedule Section (Full Width) */}
      <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
        <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Mortgage Amortization Schedule
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500">
                Full breakdown of payments, principal reduction, interest, and remaining balance over time
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <AmortizationTable
            schedule={results.amortizationSchedule}
            biweeklySchedule={showBiweekly ? results.biweeklyAmortizationSchedule : undefined}
          />
        </CardContent>
      </Card>

      {/* Save Modal Dialog */}
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
                  Save
                </h3>
                <p className="text-xs text-zinc-500">
                  Please provide a name and description to save it to your account (up to 100 calculations)
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
                  <span className="text-zinc-500 block">Current Calculation Summary:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm block font-sans tabular-nums">
                    Monthly Pay: {formatCurrency(results.totalInitialMonthlyPayment)}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    ${homePrice.toLocaleString()} home, ${results.loanAmount.toLocaleString()} loan @ {interestRate}% rate
                  </span>
                </div>

                <div>
                  <Label htmlFor="saveName" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Name (optional)
                  </Label>
                  <Input
                    id="saveName"
                    type="text"
                    placeholder="e.g. Primary Residence 30yr"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    className="mt-1 text-xs bg-zinc-50 dark:bg-zinc-800"
                  />
                </div>

                <div>
                  <Label htmlFor="saveDescription" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Description (optional)
                  </Label>
                  <textarea
                    id="saveDescription"
                    rows={3}
                    placeholder="e.g. Comparing 20% down vs 10% down options"
                    value={saveDescription}
                    onChange={(e) => setSaveDescription(e.target.value)}
                    className="mt-1 w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSaveName("");
                      setSaveDescription("");
                    }}
                    className="h-8 text-xs"
                  >
                    Reset
                  </Button>
                  <Button type="submit" className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                    Save
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
                          {item.description} • {formatCurrency(item.monthlyPayment)}/mo • {item.dateSaved}
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
                          Load
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

      {/* Executive Financial Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportData={reportData}
      />
    </div>
  );
}

export default MortgageCalculator;
