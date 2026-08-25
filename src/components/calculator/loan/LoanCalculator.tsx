"use client";

import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  DollarSign,
  Percent,
  Clock,
  Sparkles,
  Bookmark,
  Trash2,
  RotateCcw,
  Check,
  Share2,
  AlertCircle,
  FolderOpen,
  PieChart as PieIcon,
  TrendingUp,
  BarChart3,
  Zap,
  Printer,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Scale,
  Plus,
  Info,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  LoanInput,
  LoanOutput,
  LoanCalculatorMode,
  PaymentFrequency,
  CompoundingFrequency,
  SavedLoanCalculation,
} from "@/modules/loan/types";
import { calculateLoanModule } from "@/modules/loan/formula";
import { formatCurrency } from "@/lib/calculator-engine/formatters";
import LoanAmortizationTable from "./LoanAmortizationTable";
import LoanContentSection from "./LoanContentSection";
import ReportModal from "@/components/report/ReportModal";
import { generateLoanReportData } from "@/lib/report-generator/loan-report";

// Lazy load visual charts
const LoanBreakdownDoughnutChart = dynamic(
  () => import("../charts/LoanBreakdownDoughnutChart").then((m) => m.LoanBreakdownDoughnutChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-sans tabular-nums">
        Loading breakdown chart...
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

export function LoanCalculator() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // Active Module Mode Tab
  const [mode, setMode] = useState<LoanCalculatorMode>("standard");

  // Currency Selector
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // Standard Loan Inputs
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(6.0);
  const [loanTermYears, setLoanTermYears] = useState<number>(10);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(0);
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>("monthly");
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>("monthly");

  // Fees & Balloon
  const [originationFeePct, setOriginationFeePct] = useState<number>(0);
  const [upfrontFeesDollar, setUpfrontFeesDollar] = useState<number>(0);
  const [pointsPct, setPointsPct] = useState<number>(0);
  const [balloonAmount, setBalloonAmount] = useState<number>(0);

  // Extra Payments
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(0);
  const [extraAnnualPayment, setExtraAnnualPayment] = useState<number>(0);
  const [oneTimeLumpSum, setOneTimeLumpSum] = useState<number>(0);
  const [oneTimeLumpSumMonth, setOneTimeLumpSumMonth] = useState<number>(12);

  // Start Date
  const [startMonth, setStartMonth] = useState<number>(currentMonth);
  const [startYear, setStartYear] = useState<number>(currentYear);

  // Solvers Inputs
  const [desiredPayment, setDesiredPayment] = useState<number>(1110.21);

  // Deferred & Bond Specific
  const [faceValue, setFaceValue] = useState<number>(100000);

  // Refinance Specific
  const [currentBalance, setCurrentBalance] = useState<number>(200000);
  const [currentRate, setCurrentRate] = useState<number>(6.5);
  const [currentRemainingMonths, setCurrentRemainingMonths] = useState<number>(180);
  const [refinanceRate, setRefinanceRate] = useState<number>(5.25);
  const [refinanceTermYears, setRefinanceTermYears] = useState<number>(15);
  const [refinanceClosingCosts, setRefinanceClosingCosts] = useState<number>(3000);
  const [cashOutAmount, setCashOutAmount] = useState<number>(0);

  // Saved calculations & Modal
  const [savedCalculations, setSavedCalculations] = useState<SavedLoanCalculation[]>([]);
  const [showSavedNotification, setShowSavedNotification] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [activeChartTab, setActiveChartTab] = useState<"breakdown" | "balance">("breakdown");

  // Load saved calculations on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("saved_loan_calculations_v2");
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // Primary Calculation Execution
  const calculationResult: LoanOutput = useMemo(() => {
    return calculateLoanModule({
      mode,
      loanAmount,
      interestRate,
      loanTermYears,
      loanTermMonths,
      desiredPayment,
      paymentFrequency,
      compoundingFrequency,
      originationFeePct,
      upfrontFeesDollar,
      pointsPct,
      balloonAmount,
      extraMonthlyPayment,
      extraAnnualPayment,
      oneTimeLumpSum,
      oneTimeLumpSumMonth,
      startMonth,
      startYear,
      faceValue,
      currentBalance,
      currentRate,
      currentRemainingMonths,
      refinanceRate,
      refinanceTermYears,
      refinanceClosingCosts,
      cashOutAmount,
    });
  }, [
    mode,
    loanAmount,
    interestRate,
    loanTermYears,
    loanTermMonths,
    desiredPayment,
    paymentFrequency,
    compoundingFrequency,
    originationFeePct,
    upfrontFeesDollar,
    pointsPct,
    balloonAmount,
    extraMonthlyPayment,
    extraAnnualPayment,
    oneTimeLumpSum,
    oneTimeLumpSumMonth,
    startMonth,
    startYear,
    faceValue,
    currentBalance,
    currentRate,
    currentRemainingMonths,
    refinanceRate,
    refinanceTermYears,
    refinanceClosingCosts,
    cashOutAmount,
  ]);

  // Quick Presets
  const applyPreset = (amt: number, yrs: number, rate: number, freq: PaymentFrequency = "monthly") => {
    setLoanAmount(amt);
    setLoanTermYears(yrs);
    setLoanTermMonths(0);
    setInterestRate(rate);
    setPaymentFrequency(freq);
    setExtraMonthlyPayment(0);
    setExtraAnnualPayment(0);
    setOneTimeLumpSum(0);
    setBalloonAmount(0);
  };

  // Reset to Default
  const handleReset = () => {
    setLoanAmount(100000);
    setInterestRate(6.0);
    setLoanTermYears(10);
    setLoanTermMonths(0);
    setPaymentFrequency("monthly");
    setCompoundingFrequency("monthly");
    setOriginationFeePct(0);
    setUpfrontFeesDollar(0);
    setPointsPct(0);
    setBalloonAmount(0);
    setExtraMonthlyPayment(0);
    setExtraAnnualPayment(0);
    setOneTimeLumpSum(0);
    setDesiredPayment(1110.21);
    setFaceValue(100000);
    setCurrentBalance(200000);
    setCurrentRate(6.5);
    setCurrentRemainingMonths(180);
    setRefinanceRate(5.25);
    setRefinanceTermYears(15);
    setRefinanceClosingCosts(3000);
    setCashOutAmount(0);
  };

  // Save Scenario
  const handleSaveCalculation = () => {
    const newSaved: SavedLoanCalculation = {
      id: Date.now().toString(),
      name: `${currencySymbol}${loanAmount.toLocaleString()} @ ${interestRate}% (${loanTermYears}y - ${mode})`,
      dateSaved: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
      inputs: {
        mode,
        loanAmount,
        interestRate,
        loanTermYears,
        loanTermMonths,
        paymentFrequency,
        compoundingFrequency,
        extraMonthlyPayment,
      },
      periodicPayment: calculationResult.periodicPayment,
      totalInterest: calculationResult.totalInterest,
      totalCost: calculationResult.totalCost,
    };

    const updated = [newSaved, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("saved_loan_calculations_v2", JSON.stringify(updated));
    } catch (e) {}

    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 2500);
  };

  // Delete Saved Item
  const handleDeleteSaved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("saved_loan_calculations_v2", JSON.stringify(updated));
    } catch (e) {}
  };

  // Restore Saved Scenario
  const handleRestoreSaved = (saved: SavedLoanCalculation) => {
    if (saved.inputs.mode) setMode(saved.inputs.mode);
    if (saved.inputs.loanAmount) setLoanAmount(saved.inputs.loanAmount);
    if (saved.inputs.interestRate) setInterestRate(saved.inputs.interestRate);
    if (saved.inputs.loanTermYears) setLoanTermYears(saved.inputs.loanTermYears);
    if (saved.inputs.paymentFrequency) setPaymentFrequency(saved.inputs.paymentFrequency);
    if (saved.inputs.compoundingFrequency) setCompoundingFrequency(saved.inputs.compoundingFrequency);
    if (saved.inputs.extraMonthlyPayment) setExtraMonthlyPayment(saved.inputs.extraMonthlyPayment);
  };

  // Report Generator data
  const reportData = useMemo(() => {
    return generateLoanReportData(
      {
        loanAmount: calculationResult.loanAmount,
        interestRate: calculationResult.nominalRate,
        loanTermYears,
        loanTermMonths,
      },
      {
        monthlyPayment: calculationResult.monthlyEquivalentPayment,
        periodicPayment: calculationResult.periodicPayment,
        totalInterest: calculationResult.totalInterest,
        totalPayment: calculationResult.totalCost,
        payoffDate: calculationResult.payoffDate,
        amortizationSchedule: calculationResult.amortizationSchedule,
      }
    );
  }, [calculationResult, loanTermYears, loanTermMonths]);

  return (
    <div className="space-y-6">
      {/* 1. TOP MODULE NAVIGATION TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "standard", label: "Standard Loan", icon: DollarSign },
          { id: "extra-payment", label: "Extra Payments & Payoff", icon: Zap },
          { id: "comparison", label: "3-Loan Comparison", icon: Scale },
          { id: "affordability", label: "Affordability Solver", icon: Sparkles },
          { id: "duration", label: "Duration Solver", icon: Clock },
          { id: "refinance", label: "Refinance Analysis", icon: RotateCcw },
          { id: "deferred", label: "Deferred Loan", icon: Layers },
          { id: "bond", label: "Bond / Lump Sum", icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = mode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id as LoanCalculatorMode)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                  : "bg-white dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700/60"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2. MAIN TWO-COLUMN DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: INPUTS PANEL */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    {mode === "standard" && "Standard Loan Parameters"}
                    {mode === "extra-payment" && "Extra Payment Planner"}
                    {mode === "comparison" && "Loan Offer Comparison"}
                    {mode === "affordability" && "Affordability / Max Borrowing"}
                    {mode === "duration" && "Loan Duration Solver"}
                    {mode === "refinance" && "Refinance Analysis Parameters"}
                    {mode === "deferred" && "Deferred Payment Loan (Lump Sum)"}
                    {mode === "bond" && "Bond / Lump Sum Maturity (PV)"}
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-500 mt-0.5">
                    Adjust borrowing variables to dynamically calculate payments and schedules.
                  </CardDescription>
                </div>

                {/* Currency Selector */}
                <select
                  value={currencySymbol}
                  onChange={(e) => setCurrencySymbol(e.target.value)}
                  className="h-7 text-xs rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 font-semibold text-zinc-800 dark:text-zinc-200"
                >
                  <option value="$">$ (USD/CAD/AUD)</option>
                  <option value="£">£ (GBP)</option>
                  <option value="€">€ (EUR)</option>
                  <option value="¥">¥ (JPY/CNY)</option>
                  <option value="₹">₹ (INR)</option>
                </select>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-5 space-y-4">
              {/* Presets for Standard & Extra Payment */}
              {(mode === "standard" || mode === "extra-payment") && (
                <div>
                  <Label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
                    Quick Scenario Presets
                  </Label>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => applyPreset(100000, 10, 6.0)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 text-xs font-medium cursor-pointer border border-zinc-200 dark:border-zinc-700"
                    >
                      $100k · 10y · 6%
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset(200000, 15, 6.0)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 text-xs font-medium cursor-pointer border border-zinc-200 dark:border-zinc-700"
                    >
                      $200k · 15y · 6%
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset(300000, 30, 6.5)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 text-xs font-medium cursor-pointer border border-zinc-200 dark:border-zinc-700"
                    >
                      $300k · 30y · 6.5%
                    </button>
                  </div>
                </div>
              )}

              {/* Mode-Specific Input Fields */}
              {mode === "bond" ? (
                <div>
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                    Predetermined Due Amount / Face Value ({currencySymbol})
                  </Label>
                  <Input
                    type="number"
                    min={0}
                    value={faceValue}
                    onChange={(e) => setFaceValue(Number(e.target.value))}
                    className="font-mono text-sm font-semibold h-9"
                  />
                </div>
              ) : mode === "refinance" ? (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                      Current Loan Balance ({currencySymbol})
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      value={currentBalance}
                      onChange={(e) => setCurrentBalance(Number(e.target.value))}
                      className="font-mono text-sm font-semibold h-9"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                        Current Rate (%)
                      </Label>
                      <Input
                        type="number"
                        step={0.05}
                        value={currentRate}
                        onChange={(e) => setCurrentRate(Number(e.target.value))}
                        className="font-mono text-sm h-9"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                        Remaining Months
                      </Label>
                      <Input
                        type="number"
                        min={1}
                        value={currentRemainingMonths}
                        onChange={(e) => setCurrentRemainingMonths(Number(e.target.value))}
                        className="font-mono text-sm h-9"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <div>
                      <Label className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 block">
                        New Refinance Rate (%)
                      </Label>
                      <Input
                        type="number"
                        step={0.05}
                        value={refinanceRate}
                        onChange={(e) => setRefinanceRate(Number(e.target.value))}
                        className="font-mono text-sm h-9"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 block">
                        New Term (Years)
                      </Label>
                      <Input
                        type="number"
                        min={1}
                        value={refinanceTermYears}
                        onChange={(e) => setRefinanceTermYears(Number(e.target.value))}
                        className="font-mono text-sm h-9"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                        Closing Costs ({currencySymbol})
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        value={refinanceClosingCosts}
                        onChange={(e) => setRefinanceClosingCosts(Number(e.target.value))}
                        className="font-mono text-sm h-9"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                        Cash-Out Amount ({currencySymbol})
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        value={cashOutAmount}
                        onChange={(e) => setCashOutAmount(Number(e.target.value))}
                        className="font-mono text-sm h-9"
                      />
                    </div>
                  </div>
                </div>
              ) : mode === "affordability" ? (
                <div>
                  <Label className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 block">
                    Target Monthly Payment Budget ({currencySymbol})
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    value={desiredPayment}
                    onChange={(e) => setDesiredPayment(Number(e.target.value))}
                    className="font-mono text-sm font-semibold h-9"
                  />
                </div>
              ) : (
                <div>
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                    Loan Amount / Principal ({currencySymbol})
                  </Label>
                  <Input
                    type="number"
                    min={0}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="font-mono text-sm font-semibold h-9"
                  />
                </div>
              )}

              {/* Term & Rate Inputs for non-refinance modes */}
              {mode !== "refinance" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                        Loan Term (Years)
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        max={50}
                        value={loanTermYears}
                        onChange={(e) => setLoanTermYears(Number(e.target.value))}
                        className="font-mono text-sm h-9"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                        Months
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        max={11}
                        value={loanTermMonths}
                        onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                        className="font-mono text-sm h-9"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        Interest Rate (% APR)
                      </Label>
                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                        {interestRate}%
                      </span>
                    </div>
                    <Input
                      type="number"
                      step={0.1}
                      min={0}
                      max={50}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="font-mono text-sm h-9"
                    />
                  </div>

                  {/* Compounding & Payment Frequency */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                        Compounding
                      </Label>
                      <select
                        value={compoundingFrequency}
                        onChange={(e) => setCompoundingFrequency(e.target.value as CompoundingFrequency)}
                        className="w-full h-9 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs px-2 text-zinc-900 dark:text-zinc-100 font-medium"
                      >
                        <option value="monthly">Monthly (APR)</option>
                        <option value="annually">Annually (APY)</option>
                        <option value="semi-annually">Semi-Annually</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="daily">Daily</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                        Payment Frequency
                      </Label>
                      <select
                        value={paymentFrequency}
                        onChange={(e) => setPaymentFrequency(e.target.value as PaymentFrequency)}
                        className="w-full h-9 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs px-2 text-zinc-900 dark:text-zinc-100 font-medium"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="biweekly">Biweekly (26/yr)</option>
                        <option value="accelerated-biweekly">Accelerated Biweekly</option>
                        <option value="weekly">Weekly (52/yr)</option>
                        <option value="accelerated-weekly">Accelerated Weekly</option>
                        <option value="semi-monthly">Semi-Monthly (24/yr)</option>
                        <option value="quarterly">Quarterly</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Advanced Extra Payments (when in Extra Payment mode) */}
              {mode === "extra-payment" && (
                <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 rounded-xl space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-300">
                    <Zap className="h-4 w-4" /> Prepayment &amp; Payoff Accelerator
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                      Extra Monthly Payment ({currencySymbol})
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      value={extraMonthlyPayment}
                      onChange={(e) => setExtraMonthlyPayment(Number(e.target.value))}
                      className="font-mono text-sm h-9 bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1 block">
                        Extra Annual ({currencySymbol})
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        value={extraAnnualPayment}
                        onChange={(e) => setExtraAnnualPayment(Number(e.target.value))}
                        className="font-mono text-xs h-8 bg-white dark:bg-zinc-900"
                      />
                    </div>
                    <div>
                      <Label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1 block">
                        One-Time Lump Sum ({currencySymbol})
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        value={oneTimeLumpSum}
                        onChange={(e) => setOneTimeLumpSum(Number(e.target.value))}
                        className="font-mono text-xs h-8 bg-white dark:bg-zinc-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons: Save & Reset */}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSaveCalculation}
                  className="flex-1 text-xs border-zinc-200 dark:border-zinc-700 gap-1.5 h-8 cursor-pointer"
                >
                  {showSavedNotification ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" /> Saved!
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-3.5 w-3.5 text-blue-600" /> Save Scenario
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 h-8 gap-1 cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: RESULTS & VISUAL DASHBOARD */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Primary Result Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 sm:p-6 text-white shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/20 pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-100">
                  {mode === "deferred"
                    ? "Amount Due at Loan Maturity"
                    : mode === "bond"
                    ? "Amount Received When Loan Starts"
                    : mode === "affordability"
                    ? "Maximum Affordable Loan Principal"
                    : mode === "duration"
                    ? "Required Repayment Term"
                    : mode === "refinance"
                    ? "New Refinanced Monthly Payment"
                    : `Payment Every ${paymentFrequency === "monthly" ? "Month" : paymentFrequency}`}
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
                  {mode === "deferred"
                    ? `${currencySymbol}${calculationResult.maturityAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : mode === "bond"
                    ? `${currencySymbol}${calculationResult.initialAmountReceived?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : mode === "affordability"
                    ? `${currencySymbol}${calculationResult.maxAffordableLoan?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : mode === "duration"
                    ? `${calculationResult.requiredTermYears} Yrs ${calculationResult.requiredTermMonths} Mos`
                    : `${currencySymbol}${calculationResult.periodicPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </div>
              </div>

              {/* Header Badge */}
              <div className="bg-white/15 px-3 py-1.5 rounded-xl backdrop-blur-xs text-xs font-medium self-start sm:self-auto font-mono">
                {mode === "deferred" || mode === "bond" ? (
                  <span>Effective Yield: {calculationResult.effectiveAnnualRate.toFixed(2)}%</span>
                ) : (
                  <span>Effective APR: {calculationResult.effectiveApr.toFixed(2)}%</span>
                )}
              </div>
            </div>

            {/* Sub-Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs">
              <div className="bg-white/10 rounded-xl p-3 space-y-0.5 backdrop-blur-xs">
                <span className="text-blue-100 block text-[11px]">Total Interest</span>
                <span className="font-bold font-mono text-sm">
                  {currencySymbol}{calculationResult.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="bg-white/10 rounded-xl p-3 space-y-0.5 backdrop-blur-xs">
                <span className="text-blue-100 block text-[11px]">Total Amount Paid</span>
                <span className="font-bold font-mono text-sm">
                  {currencySymbol}{calculationResult.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="bg-white/10 rounded-xl p-3 space-y-0.5 backdrop-blur-xs">
                <span className="text-blue-100 block text-[11px]">Payoff Date</span>
                <span className="font-bold font-mono text-sm">
                  {calculationResult.payoffDate}
                </span>
              </div>

              <div className="bg-white/10 rounded-xl p-3 space-y-0.5 backdrop-blur-xs">
                <span className="text-blue-100 block text-[11px]">Total Payments</span>
                <span className="font-bold font-mono text-sm">
                  {calculationResult.totalPaymentsCount} Payments
                </span>
              </div>
            </div>

            {/* Extra Payment Savings Callout */}
            {mode === "extra-payment" && calculationResult.interestSaved > 0 && (
              <div className="bg-emerald-500/30 border border-emerald-300/40 rounded-xl p-3 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Zap className="h-4 w-4 text-emerald-200" />
                  Accelerated Payoff Savings:
                </span>
                <span className="font-mono font-bold text-emerald-100 text-sm">
                  Saves {currencySymbol}{calculationResult.interestSaved.toLocaleString()} &amp; {calculationResult.timeSavedMonths} Months
                </span>
              </div>
            )}

            {/* Refinance Benefit Callout */}
            {mode === "refinance" && calculationResult.refinanceAnalysis && (
              <div className="bg-white/15 border border-white/20 rounded-xl p-3 text-xs space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Monthly Payment Reduction:</span>
                  <span className="font-mono text-emerald-300">
                    +{currencySymbol}{calculationResult.refinanceAnalysis.monthlySavings.toFixed(2)}/mo
                  </span>
                </div>
                <div className="flex justify-between text-blue-100 text-[11px]">
                  <span>Net Lifetime Savings (after fees):</span>
                  <span className="font-mono font-bold text-white">
                    {currencySymbol}{calculationResult.refinanceAnalysis.netLifetimeSavings.toLocaleString()} (Break-even in {calculationResult.refinanceAnalysis.breakEvenMonths} mos)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Side-by-Side Comparison Module Display */}
          {mode === "comparison" && calculationResult.comparisonOffers && (
            <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Scale className="h-4 w-4 text-blue-600" /> 3-Offer Side-by-Side Comparison
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {calculationResult.comparisonOffers.map((offer) => (
                    <div
                      key={offer.id}
                      className={`p-3.5 rounded-xl border space-y-2 ${
                        offer.id === "A"
                          ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
                          : "bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700"
                      }`}
                    >
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block">{offer.name}</span>
                      <div className="space-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                        <div>Rate: <span className="font-bold text-zinc-900 dark:text-zinc-100">{offer.interestRate}%</span></div>
                        <div>Payment: <span className="font-bold text-blue-600 dark:text-blue-400">{currencySymbol}{offer.periodicPayment}/mo</span></div>
                        <div>Interest: <span className="font-bold">{currencySymbol}{offer.totalInterest.toLocaleString()}</span></div>
                        <div>Total Cost: <span className="font-bold">{currencySymbol}{offer.totalCost.toLocaleString()}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Interactive Chart Visualizations */}
          {mode !== "deferred" && mode !== "bond" && (
            <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
              <CardHeader className="pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveChartTab("breakdown")}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        activeChartTab === "breakdown"
                          ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                          : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                      }`}
                    >
                      <PieIcon className="h-3.5 w-3.5 inline mr-1" /> Cost Breakdown
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveChartTab("balance")}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        activeChartTab === "balance"
                          ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                          : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                      }`}
                    >
                      <TrendingUp className="h-3.5 w-3.5 inline mr-1" /> Balance Curve
                    </button>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReportModal(true)}
                    className="h-7 text-xs border-zinc-200 dark:border-zinc-700 gap-1 cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" /> Printable Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {activeChartTab === "breakdown" ? (
                  <LoanBreakdownDoughnutChart
                    totalPrincipal={calculationResult.totalPrincipal}
                    totalInterest={calculationResult.totalInterest}
                  />
                ) : (
                  <LoanBalanceLineChart schedule={calculationResult.amortizationSchedule} />
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* 3. AMORTIZATION SCHEDULE TABLE */}
      {mode !== "deferred" && mode !== "bond" && (
        <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Complete Loan Amortization Schedule
            </CardTitle>
            <CardDescription className="text-xs text-zinc-500">
              Inspect payment allocation, cumulative interest charges, and remaining principal balance over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-5">
            <LoanAmortizationTable
              schedule={calculationResult.amortizationSchedule}
              annualSchedule={calculationResult.annualSchedule}
            />
          </CardContent>
        </Card>
      )}

      {/* 4. SAVED SCENARIOS TRAY */}
      {savedCalculations.length > 0 && (
        <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark className="h-3.5 w-3.5 text-blue-600" /> Saved Scenarios History ({savedCalculations.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {savedCalculations.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleRestoreSaved(item)}
                  className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer flex justify-between items-center text-xs"
                >
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 block">{item.name}</span>
                    <span className="text-[11px] text-blue-600 dark:text-blue-400 font-mono">
                      {currencySymbol}{item.periodicPayment.toFixed(2)}/mo
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteSaved(item.id, e)}
                    className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 5. PRINTABLE REPORT MODAL */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={reportData}
      />

      {/* 6. EDUCATIONAL CHAPTERS & 12 CANONICAL FAQS */}
      <LoanContentSection />
    </div>
  );
}

export default LoanCalculator;
