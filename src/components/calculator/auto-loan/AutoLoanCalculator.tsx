"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Car,
  Calculator as CalcIcon,
  ShieldCheck,
  DollarSign,
  PieChart as PieIcon,
  TrendingDown,
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
  RotateCcw,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  calculateAutoLoanFormula,
  AutoLoanResult,
  ExtendedAutoLoanInput,
} from "@/lib/calculator-engine/formulas/auto-loan";
import { formatCurrency } from "@/lib/calculator-engine/formatters";
import { US_STATE_TAXES, DEFAULT_STATE_CODE } from "@/data/us-state-taxes";
import {
  AutoLoanCostBreakdownChart,
  AutoLoanBalanceOverTimeChart,
  AutoLoanPaymentCompositionChart,
} from "./AutoLoanCharts";
import { AutoLoanAmortizationTable } from "./AutoLoanAmortizationTable";
import { AutoLoanContentSection } from "./AutoLoanContentSection";
import { AutoLoanReportModal } from "./AutoLoanReportModal";

export function AutoLoanCalculator() {
  // Mode selection: 1 = Payment, 2 = Affordable Price, 3 = Scenario Comparison
  const [activeTab, setActiveTab] = useState<"payment" | "affordable" | "comparison">("payment");

  // Tab 1 Inputs
  const [vehiclePrice, setVehiclePrice] = useState<number>(35000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tradeInValue, setTradeInValue] = useState<number>(3000);
  const [amountOwedOnTradeIn, setAmountOwedOnTradeIn] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(5.9);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [stateCode, setStateCode] = useState<string>(DEFAULT_STATE_CODE);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(3.0);
  const [registrationFees, setRegistrationFees] = useState<number>(300);
  const [dealerFees, setDealerFees] = useState<number>(250);
  const [docFees, setDocFees] = useState<number>(150);
  const [extendedWarranty, setExtendedWarranty] = useState<number>(0);
  const [includeFeesInLoan, setIncludeFeesInLoan] = useState<boolean>(true);

  // Early Payoff & Affordability Inputs
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(0);
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState<number>(6500);
  const [existingMonthlyDebt, setExistingMonthlyDebt] = useState<number>(800);

  // Tab 2 Inputs
  const [desiredMonthlyPayment, setDesiredMonthlyPayment] = useState<number>(500);

  // Tab 3 Inputs
  const [scenarioBPrice, setScenarioBPrice] = useState<number>(38000);
  const [scenarioBRate, setScenarioBRate] = useState<number>(4.9);
  const [scenarioBTerm, setScenarioBTerm] = useState<number>(60);
  const [scenarioBDown, setScenarioBDown] = useState<number>(6000);

  // Modal & Save states
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [savedScenarios, setSavedScenarios] = useState<{ name: string; payment: number; date: string }[]>([]);
  const [shareToast, setShareToast] = useState<boolean>(false);

  // Auto-update sales tax and fees when US state selection changes
  const handleStateChange = (code: string) => {
    setStateCode(code);
    const stateObj = US_STATE_TAXES[code];
    if (stateObj) {
      setSalesTaxRate(stateObj.taxRate);
      setRegistrationFees(stateObj.avgFees);
    }
  };

  // Perform calculations
  const calculationInputs: ExtendedAutoLoanInput = useMemo(
    () => ({
      vehiclePrice,
      downPayment,
      tradeInValue,
      amountOwedOnTradeIn,
      interestRate,
      loanTermMonths,
      salesTaxRate,
      registrationFees,
      dealerFees,
      docFees,
      extendedWarranty,
      includeFeesInLoan,
      stateCode,
      extraMonthlyPayment,
      grossMonthlyIncome,
      existingMonthlyDebt,
      desiredMonthlyPayment,
      scenarioB: {
        vehiclePrice: scenarioBPrice,
        interestRate: scenarioBRate,
        loanTermMonths: scenarioBTerm,
        downPayment: scenarioBDown,
      },
    }),
    [
      vehiclePrice,
      downPayment,
      tradeInValue,
      amountOwedOnTradeIn,
      interestRate,
      loanTermMonths,
      salesTaxRate,
      registrationFees,
      dealerFees,
      docFees,
      extendedWarranty,
      includeFeesInLoan,
      stateCode,
      extraMonthlyPayment,
      grossMonthlyIncome,
      existingMonthlyDebt,
      desiredMonthlyPayment,
      scenarioBPrice,
      scenarioBRate,
      scenarioBTerm,
      scenarioBDown,
    ]
  );

  const results: AutoLoanResult = useMemo(
    () => calculateAutoLoanFormula(calculationInputs),
    [calculationInputs]
  );

  // Share link handler
  const handleShare = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/calculators/auto-loan-calculator?vp=${vehiclePrice}&dp=${downPayment}&tv=${tradeInValue}&ir=${interestRate}&lt=${loanTermMonths}`;
      navigator.clipboard.writeText(url);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  // Save Scenario handler
  const handleSaveScenario = () => {
    const newSaved = [
      ...savedScenarios,
      {
        name: `Scenario ${savedScenarios.length + 1} ($${vehiclePrice.toLocaleString()})`,
        payment: results.monthlyPayment,
        date: new Date().toLocaleDateString(),
      },
    ];
    setSavedScenarios(newSaved);
  };

  return (
    <div className="space-y-6">
      {/* ==========================================
          1. HERO SECTION & FEATURE BADGES
         ========================================== */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <Car className="h-3.5 w-3.5" /> Vehicle Financing Platform
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-medium border border-emerald-400/30">
              <Zap className="h-3 w-3" /> Real-time Calculation
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Auto Loan Calculator
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/80 mt-1 max-w-2xl leading-relaxed">
              Calculate monthly car payments, total loan cost, interest expenses, trade-in equity, negative equity rollover, state taxes, and vehicle affordability.
            </p>
          </div>

          {/* Feature Badges Grid */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Monthly Payment Analysis
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Trade-In Calculator
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Tax & Fees Support
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Amortization Schedule
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Early Payoff Analysis
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Printable PDF Report
            </Badge>
          </div>
        </div>
      </div>

      {/* ==========================================
          2. CALCULATOR MODES TABS BAR & ACTIONS
         ========================================== */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        {/* 3 Main Mode Tabs */}
        <div className="grid grid-cols-3 gap-1 w-full sm:w-auto bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab("payment")}
            className={`px-3 py-2 rounded-md text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "payment"
                ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            Auto Loan Payment
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("affordable")}
            className={`px-3 py-2 rounded-md text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "affordable"
                ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            Affordable Vehicle Price
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("comparison")}
            className={`px-3 py-2 rounded-md text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "comparison"
                ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            Loan Comparison
          </button>
        </div>

        {/* Save, Share & Report Buttons */}
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveScenario}
            className="h-8 text-xs gap-1.5 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <Bookmark className="h-3.5 w-3.5 text-zinc-500" /> Save
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="h-8 text-xs gap-1.5 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5 text-zinc-500" /> Share
          </Button>

          <Button
            size="sm"
            onClick={() => setIsReportOpen(true)}
            className="h-8 text-xs gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer shadow-xs"
          >
            <Printer className="h-3.5 w-3.5" /> PDF Report
          </Button>
        </div>
      </div>

      {shareToast && (
        <div className="bg-emerald-500 text-white text-xs px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Shareable calculator link copied to clipboard!
        </div>
      )}

      {/* Saved Scenarios Quick Bar */}
      {savedScenarios.length > 0 && (
        <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3 overflow-x-auto text-xs">
          <span className="font-bold text-zinc-500 shrink-0">Saved Scenarios:</span>
          {savedScenarios.map((s, i) => (
            <Badge key={`sc-${i}`} variant="outline" className="bg-white dark:bg-zinc-900 shrink-0 font-sans tabular-nums">
              {s.name}: {formatCurrency(s.payment)}/mo
            </Badge>
          ))}
        </div>
      )}

      {/* ==========================================
          MAIN GRID: INPUTS (LEFT) | RESULTS (RIGHT)
         ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: INPUT PANELS (COL 6) */}
        <div className="lg:col-span-6 space-y-6">

          {/* TAB 1: AUTO LOAN PAYMENT INPUTS */}
          {activeTab === "payment" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
                <span>Vehicle & Financing Inputs</span>
                <span className="text-[11px] font-normal text-zinc-400">Real-time Analysis</span>
              </h2>

              <div className="space-y-4">
                {/* Vehicle Price */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold text-zinc-700 dark:text-zinc-300">
                    <label>Vehicle Sticker Price</label>
                    <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400 font-bold">{formatCurrency(vehiclePrice)}</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">$</span>
                    <Input
                      type="number"
                      value={vehiclePrice}
                      onChange={(e) => setVehiclePrice(Math.max(0, Number(e.target.value)))}
                      className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                    />
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold text-zinc-700 dark:text-zinc-300">
                    <label>Cash Down Payment</label>
                    <span className="font-sans tabular-nums text-zinc-500">
                      {vehiclePrice > 0 ? ((downPayment / vehiclePrice) * 100).toFixed(1) : 0}% of price
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">$</span>
                    <Input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
                      className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                    />
                  </div>
                </div>

                {/* Trade-In Value & Amount Owed */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Trade-In Value
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">$</span>
                      <Input
                        type="number"
                        value={tradeInValue}
                        onChange={(e) => setTradeInValue(Math.max(0, Number(e.target.value)))}
                        className="pl-7 h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Amount Owed on Trade
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">$</span>
                      <Input
                        type="number"
                        value={amountOwedOnTradeIn}
                        onChange={(e) => setAmountOwedOnTradeIn(Math.max(0, Number(e.target.value)))}
                        className="pl-7 h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                      />
                    </div>
                  </div>
                </div>

                {/* APR Interest Rate & Loan Term */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Interest Rate (APR %)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                      className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Loan Term
                    </label>
                    <select
                      value={loanTermMonths}
                      onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                      className="w-full h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs px-3 font-sans tabular-nums text-zinc-900 dark:text-zinc-100"
                    >
                      <option value={24}>24 Months (2 Years)</option>
                      <option value={36}>36 Months (3 Years)</option>
                      <option value={48}>48 Months (4 Years)</option>
                      <option value={60}>60 Months (5 Years)</option>
                      <option value={72}>72 Months (6 Years)</option>
                      <option value={84}>84 Months (7 Years)</option>
                      <option value={96}>96 Months (8 Years)</option>
                    </select>
                  </div>
                </div>

                {/* State Tax Module */}
                <div className="p-3.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-300">
                      US State Tax Selector
                    </span>
                    <span className="text-[10px] text-blue-700 dark:text-blue-400 font-medium">
                      Auto-populates sales tax rate
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">State</label>
                      <select
                        value={stateCode}
                        onChange={(e) => handleStateChange(e.target.value)}
                        className="w-full h-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs px-2 font-sans tabular-nums"
                      >
                        {Object.values(US_STATE_TAXES).map((st) => (
                          <option key={st.code} value={st.code}>
                            {st.name} ({st.taxRate}%)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">Sales Tax Rate (%)</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={salesTaxRate}
                        onChange={(e) => setSalesTaxRate(Math.max(0, Number(e.target.value)))}
                        className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Fee Itemization & Include Fees Checkbox */}
                <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">
                    Registration & Dealer Fees Itemization
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <label className="block text-[10px] text-zinc-500">Reg & Title</label>
                      <Input
                        type="number"
                        value={registrationFees}
                        onChange={(e) => setRegistrationFees(Math.max(0, Number(e.target.value)))}
                        className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-500">Dealer Doc</label>
                      <Input
                        type="number"
                        value={dealerFees}
                        onChange={(e) => setDealerFees(Math.max(0, Number(e.target.value)))}
                        className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-500">Documentation</label>
                      <Input
                        type="number"
                        value={docFees}
                        onChange={(e) => setDocFees(Math.max(0, Number(e.target.value)))}
                        className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-500">Ext Warranty</label>
                      <Input
                        type="number"
                        value={extendedWarranty}
                        onChange={(e) => setExtendedWarranty(Math.max(0, Number(e.target.value)))}
                        className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="incFees"
                      checked={includeFeesInLoan}
                      onChange={(e) => setIncludeFeesInLoan(e.target.checked)}
                      className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                    />
                    <label htmlFor="incFees" className="text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                      Include sales tax and fees in financed loan balance
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AFFORDABLE VEHICLE PRICE INPUTS */}
          {activeTab === "affordable" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
                Affordable Vehicle Price Reverse Calculator
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Target Monthly Payment ($)
                  </label>
                  <Input
                    type="number"
                    value={desiredMonthlyPayment}
                    onChange={(e) => setDesiredMonthlyPayment(Math.max(0, Number(e.target.value)))}
                    className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Target APR (%)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                      className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Loan Term (Months)
                    </label>
                    <Input
                      type="number"
                      value={loanTermMonths}
                      onChange={(e) => setLoanTermMonths(Math.max(1, Number(e.target.value)))}
                      className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Available Down Payment
                    </label>
                    <Input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
                      className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Trade-In Value
                    </label>
                    <Input
                      type="number"
                      value={tradeInValue}
                      onChange={(e) => setTradeInValue(Math.max(0, Number(e.target.value)))}
                      className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                    />
                  </div>
                </div>

                {results.affordableResult && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                    <span className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">
                      Reverse Affordability Output
                    </span>
                    <div className="text-2xl font-black text-emerald-900 dark:text-emerald-100 font-sans tabular-nums">
                      {formatCurrency(results.affordableResult.maxVehiclePrice)}
                    </div>
                    <p className="text-xs text-emerald-800 dark:text-emerald-300">
                      Maximum affordable vehicle sticker price to achieve a target monthly payment of <strong>{formatCurrency(desiredMonthlyPayment)}</strong>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: LOAN SCENARIO COMPARISON */}
          {activeTab === "comparison" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
                Scenario A vs Scenario B Comparison
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Scenario A */}
                <div className="p-3.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-2">
                  <h3 className="font-bold text-xs text-blue-900 dark:text-blue-300">Scenario A (Current)</h3>
                  <div>
                    <label className="text-[10px] text-zinc-500">Price</label>
                    <Input
                      type="number"
                      value={vehiclePrice}
                      onChange={(e) => setVehiclePrice(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500">APR %</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500">Term (Mo)</label>
                    <Input
                      type="number"
                      value={loanTermMonths}
                      onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums"
                    />
                  </div>
                </div>

                {/* Scenario B */}
                <div className="p-3.5 rounded-lg bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 space-y-2">
                  <h3 className="font-bold text-xs text-purple-900 dark:text-purple-300">Scenario B</h3>
                  <div>
                    <label className="text-[10px] text-zinc-500">Price</label>
                    <Input
                      type="number"
                      value={scenarioBPrice}
                      onChange={(e) => setScenarioBPrice(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500">APR %</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={scenarioBRate}
                      onChange={(e) => setScenarioBRate(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500">Term (Mo)</label>
                    <Input
                      type="number"
                      value={scenarioBTerm}
                      onChange={(e) => setScenarioBTerm(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums"
                    />
                  </div>
                </div>
              </div>

              {results.comparisonResult && (
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                    Comparative Recommendation
                  </span>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                    {results.comparisonResult.recommendation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TRADE-IN ANALYSIS MODULE */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Car className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Trade-In Equity Analysis
            </h3>

            {results.isNegativeEquity ? (
              <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300">
                  <AlertTriangle className="h-4 w-4" /> Negative Equity Warning (Underwater Trade-In)
                </div>
                <p className="text-xs text-rose-800 dark:text-rose-200">
                  Your amount owed exceeds your trade-in allowance by <strong>{formatCurrency(results.negativeEquityRollover)}</strong>. This remaining debt will be rolled over into your new loan balance, increasing your monthly payment and total interest.
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" /> Positive Trade-In Equity Credit
                </div>
                <p className="text-xs text-emerald-800 dark:text-emerald-200">
                  You have <strong>{formatCurrency(results.netTradeInEquity)}</strong> of positive trade-in equity applied directly toward reducing your new vehicle loan amount.
                </p>
              </div>
            )}
          </div>

          {/* AFFORDABILITY ANALYZER (20/4/10 RULE) */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Income & Vehicle Affordability Analyzer (20/4/10 Rule)
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">Gross Monthly Income</label>
                <Input
                  type="number"
                  value={grossMonthlyIncome}
                  onChange={(e) => setGrossMonthlyIncome(Math.max(0, Number(e.target.value)))}
                  className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-600 dark:text-zinc-400 mb-1">Existing Monthly Debt</label>
                <Input
                  type="number"
                  value={existingMonthlyDebt}
                  onChange={(e) => setExistingMonthlyDebt(Math.max(0, Number(e.target.value)))}
                  className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                />
              </div>
            </div>

            {results.affordability && (
              <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">Affordability Rating</span>
                  <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                    {results.affordability.rating} ({results.affordability.frontEndRatio}% of Income)
                  </span>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {results.affordability.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* EARLY PAYOFF ANALYZER */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <TrendingDown className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Early Payoff Extra Payment Analyzer
            </h3>

            <div>
              <div className="flex justify-between text-xs mb-1 font-semibold text-zinc-700 dark:text-zinc-300">
                <label>Extra Monthly Principal Payment</label>
                <span className="font-sans tabular-nums text-purple-600 dark:text-purple-400 font-bold">{formatCurrency(extraMonthlyPayment)}</span>
              </div>
              <Input
                type="number"
                value={extraMonthlyPayment}
                onChange={(e) => setExtraMonthlyPayment(Math.max(0, Number(e.target.value)))}
                className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
              />
            </div>

            {results.earlyPayoff && (
              <div className="p-3.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 space-y-1 text-xs">
                <div className="flex justify-between font-bold text-purple-900 dark:text-purple-200">
                  <span>Interest Saved: {formatCurrency(results.earlyPayoff.interestSaved)}</span>
                  <span>Months Saved: {results.earlyPayoff.monthsSaved} Months</span>
                </div>
                <p className="text-[11px] text-purple-800 dark:text-purple-300">
                  Accelerated Payoff Date: <strong>{results.earlyPayoff.newPayoffDate}</strong>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS DASHBOARD & CHARTS (COL 6 STICKY) */}
        <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-4">

          {/* 3. HERO RESULT DISPLAY CARD */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-2xl p-6 shadow-xl border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
                Estimated Monthly Payment
              </span>
              <Badge className="bg-blue-600 text-white text-[10px]">
                {loanTermMonths} Mo @ {interestRate}% APR
              </Badge>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-white font-sans tabular-nums tracking-tight">
              {formatCurrency(results.monthlyPayment)}
              <span className="text-sm font-normal text-zinc-400 font-sans ml-1">/month</span>
            </div>

            {/* Key Metric Grid (Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Total Financed</span>
                <span className="text-sm font-bold text-zinc-100 font-sans tabular-nums">{formatCurrency(results.loanAmount)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Total Interest</span>
                <span className="text-sm font-bold text-emerald-400 font-sans tabular-nums">{formatCurrency(results.totalInterestPaid)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Sales Tax</span>
                <span className="text-sm font-bold text-amber-400 font-sans tabular-nums">{formatCurrency(results.totalSalesTax)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Title & Fees</span>
                <span className="text-sm font-bold text-purple-400 font-sans tabular-nums">{formatCurrency(results.totalFees)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Down Payment %</span>
                <span className="text-sm font-bold text-blue-400 font-sans tabular-nums">{results.downPaymentPercentage}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Total Vehicle Cost</span>
                <span className="text-sm font-bold text-zinc-100 font-sans tabular-nums">{formatCurrency(results.totalOutofPocketCost)}</span>
              </div>
            </div>
          </div>

          {/* LOAN HEALTH SCORE CARD */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Loan Health Score
              </h3>
              <Badge
                variant="outline"
                className={`font-bold text-xs ${
                  results.healthScore.score >= 85
                    ? "text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/40"
                    : results.healthScore.score >= 70
                    ? "text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/40"
                    : "text-rose-600 border-rose-200 bg-rose-50 dark:bg-rose-950/40"
                }`}
              >
                {results.healthScore.score} / 100 ({results.healthScore.category})
              </Badge>
            </div>

            <div className="space-y-2 pt-1">
              {results.healthScore.factors.map((fac, idx) => (
                <div key={`hf-${idx}`} className="flex items-center justify-between text-xs border-b border-zinc-100 dark:border-zinc-800/60 pb-1.5">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">{fac.label}</span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans tabular-nums">{fac.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SMART INSIGHTS BANNER */}
          {results.insights.length > 0 && (
            <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Smart Financial Insights
              </span>
              <ul className="space-y-1.5 text-xs text-blue-800 dark:text-blue-200">
                {results.insights.map((tip, i) => (
                  <li key={`tip-${i}`} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 4. VISUAL CHARTS MODULE */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <PieIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Loan Breakdown Visualizers
            </h3>

            {/* Chart 1: Cost Breakdown */}
            <div>
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Loan Cost Composition
              </span>
              <AutoLoanCostBreakdownChart
                loanAmount={results.loanAmount}
                totalInterest={results.totalInterestPaid}
                totalSalesTax={results.totalSalesTax}
                totalFees={results.totalFees}
              />
            </div>

            {/* Chart 2: Balance Over Time */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Loan Balance Trajectory
              </span>
              <AutoLoanBalanceOverTimeChart monthlySchedule={results.monthlySchedule} />
            </div>

            {/* Chart 3: Annual Payment Composition */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Annual Principal vs Interest Paid
              </span>
              <AutoLoanPaymentCompositionChart annualSchedule={results.annualSchedule} />
            </div>
          </div>

          {/* TERM COMPARISON ENGINE (36 TO 84 MONTHS) */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Loan Term Comparison Engine
            </h3>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
              {results.termComparison.map((termOpt) => (
                <div key={`term-${termOpt.months}`} className="py-2 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{termOpt.months} Months</span>
                    {termOpt.tag && (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-900">
                        {termOpt.tag}
                      </span>
                    )}
                  </div>
                  <div className="text-right font-sans tabular-nums">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(termOpt.monthlyPayment)}/mo</span>
                    <span className="text-[10px] text-zinc-400 block">Int: {formatCurrency(termOpt.totalInterest)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ==========================================
          5. AMORTIZATION SCHEDULE TABLE
         ========================================== */}
      <AutoLoanAmortizationTable
        monthlySchedule={results.monthlySchedule}
        annualSchedule={results.annualSchedule}
      />

      {/* ==========================================
          6. SEO CONTENT & FAQ SECTION
         ========================================== */}
      <AutoLoanContentSection />

      {/* PRINTABLE REPORT MODAL */}
      <AutoLoanReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        inputs={calculationInputs}
        results={results}
      />
    </div>
  );
}
