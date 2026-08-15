"use client";

import React, { useState, useMemo } from "react";
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
  ChevronDown,
  ChevronUp,
  RotateCcw,
  ArrowRight,
  Gauge,
  Percent,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  calculateAutoLeaseFormula,
  aprToMoneyFactor,
  moneyFactorToApr,
  AutoLeaseResult,
  ExtendedAutoLeaseInput,
} from "@/lib/calculator-engine/formulas/auto-lease";
import { formatCurrency } from "@/lib/calculator-engine/formatters";
import {
  AutoLeasePaymentDoughnutChart,
  AutoLeaseTimelineChart,
  AutoLeaseVsBuyBarChart,
} from "./AutoLeaseCharts";
import { AutoLeaseContentSection } from "./AutoLeaseContentSection";
import { AutoLeaseReportModal } from "./AutoLeaseReportModal";

export function AutoLeaseCalculator() {
  // Mode selection: "total" = Total Price Method, "target" = Monthly Payment Target
  const [activeTab, setActiveTab] = useState<"total" | "target">("total");

  // Core Inputs
  const [autoPrice, setAutoPrice] = useState<number>(35000);
  const [vehicleMsrp, setVehicleMsrp] = useState<number>(36000);
  const [downPayment, setDownPayment] = useState<number>(2500);
  const [tradeInValue, setTradeInValue] = useState<number>(2000);
  const [amountOwedOnTradeIn, setAmountOwedOnTradeIn] = useState<number>(0);
  const [leaseTermMonths, setLeaseTermMonths] = useState<number>(36);

  // Interest Rate Configuration (Two-Way Live Synchronization)
  const [aprInput, setAprInput] = useState<string>("6.0");
  const [moneyFactorInput, setMoneyFactorInput] = useState<string>("0.0025");
  const [aprError, setAprError] = useState<string | null>(null);
  const [moneyFactorError, setMoneyFactorError] = useState<string | null>(null);

  const aprPercent = useMemo(() => {
    const p = parseFloat(aprInput);
    return isNaN(p) || p < 0 ? 0 : p;
  }, [aprInput]);

  const moneyFactor = useMemo(() => {
    const mf = parseFloat(moneyFactorInput);
    return isNaN(mf) || mf < 0 ? 0 : mf;
  }, [moneyFactorInput]);

  const handleAprChange = (valStr: string) => {
    setAprInput(valStr);
    const num = parseFloat(valStr);
    if (valStr.trim() === "" || isNaN(num)) {
      setAprError("Please enter a valid APR percentage.");
      return;
    }
    if (num < 0) {
      setAprError("APR must be greater than or equal to 0.");
      return;
    }
    setAprError(null);
    setMoneyFactorError(null);
    const mf = num / 2400;
    setMoneyFactorInput(Number(mf.toFixed(6)).toString());
  };

  const handleMoneyFactorChange = (valStr: string) => {
    setMoneyFactorInput(valStr);
    const num = parseFloat(valStr);
    if (valStr.trim() === "" || isNaN(num)) {
      setMoneyFactorError("Please enter a valid Money Factor.");
      return;
    }
    if (num < 0) {
      setMoneyFactorError("Money Factor must be greater than or equal to 0.");
      return;
    }
    setMoneyFactorError(null);
    setAprError(null);
    const apr = num * 2400;
    setAprInput(Number(apr.toFixed(4)).toString());
  };

  // Residual Value Selector: "percent" or "amount"
  const [residualInputType, setResidualInputType] = useState<"percent" | "amount">("percent");
  const [residualPercent, setResidualPercent] = useState<number>(55);
  const [residualValue, setResidualValue] = useState<number>(19800);

  // Tax
  const [salesTaxRate, setSalesTaxRate] = useState<number>(7.0);

  // Advanced Options / Fees Collapsible Toggle
  const [showAdvancedFees, setShowAdvancedFees] = useState<boolean>(false);

  // Advanced Fees Inputs
  const [acquisitionFee, setAcquisitionFee] = useState<number>(695);
  const [registrationFee, setRegistrationFee] = useState<number>(250);
  const [documentationFee, setDocumentationFee] = useState<number>(150);
  const [dispositionFee, setDispositionFee] = useState<number>(395);
  const [securityDeposit, setSecurityDeposit] = useState<number>(0);
  const [negativeEquityRollover, setNegativeEquityRollover] = useState<number>(0);
  const [manufacturerIncentives, setManufacturerIncentives] = useState<number>(500);
  const [leaseCashRebates, setLeaseCashRebates] = useState<number>(500);

  // Mileage Analysis Inputs
  const [mileageAllowancePerYear, setMileageAllowancePerYear] = useState<number>(12000);
  const [expectedMilesPerYear, setExpectedMilesPerYear] = useState<number>(14000);
  const [excessMileageFeeRate, setExcessMileageFeeRate] = useState<number>(0.20);

  // Tab 2 Target Solver Input
  const [targetMonthlyPayment, setTargetMonthlyPayment] = useState<number>(450);

  // Modal & Saved Scenarios
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [savedScenarios, setSavedScenarios] = useState<{ name: string; payment: number; date: string }[]>([]);
  const [shareToast, setShareToast] = useState<boolean>(false);

  // Perform Calculations
  const calculationInputs: ExtendedAutoLeaseInput = useMemo(
    () => ({
      autoPrice,
      vehicleMsrp,
      downPayment,
      tradeInValue,
      amountOwedOnTradeIn,
      leaseTermMonths,
      aprPercent,
      moneyFactor,
      residualInputType,
      residualPercent,
      residualValue,
      salesTaxRate,
      acquisitionFee,
      registrationFee,
      documentationFee,
      dispositionFee,
      securityDeposit,
      negativeEquityRollover,
      manufacturerIncentives,
      leaseCashRebates,
      mileageAllowancePerYear,
      expectedMilesPerYear,
      excessMileageFeeRate,
      targetMonthlyPayment,
    }),
    [
      autoPrice,
      vehicleMsrp,
      downPayment,
      tradeInValue,
      amountOwedOnTradeIn,
      leaseTermMonths,
      aprPercent,
      moneyFactor,
      residualInputType,
      residualPercent,
      residualValue,
      salesTaxRate,
      acquisitionFee,
      registrationFee,
      documentationFee,
      dispositionFee,
      securityDeposit,
      negativeEquityRollover,
      manufacturerIncentives,
      leaseCashRebates,
      mileageAllowancePerYear,
      expectedMilesPerYear,
      excessMileageFeeRate,
      targetMonthlyPayment,
    ]
  );

  const results: AutoLeaseResult = useMemo(
    () => calculateAutoLeaseFormula(calculationInputs),
    [calculationInputs]
  );

  // Share link handler
  const handleShare = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/calculators/auto-lease-calculator?ap=${autoPrice}&dp=${downPayment}&res=${residualPercent}&apr=${aprPercent}&term=${leaseTermMonths}`;
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
        name: `Lease ${savedScenarios.length + 1} ($${autoPrice.toLocaleString()})`,
        payment: results.monthlyLeasePayment,
        date: new Date().toLocaleDateString(),
      },
    ];
    setSavedScenarios(newSaved);
  };

  return (
    <div className="space-y-6">
      {/* ==========================================
          SECTION 1: PAGE HEADER & HERO BADGES
         ========================================== */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
              <Car className="h-3.5 w-3.5" /> Premium Auto Lease Engine
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-medium border border-emerald-400/30">
              <Zap className="h-3 w-3" /> Money Factor Auto-Converter
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Auto Lease Calculator
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 mt-1 max-w-2xl leading-relaxed">
              Estimate monthly lease payments, total lease cost, depreciation charges, money factor rent fees, sales taxes, mileage penalties, and compare leasing versus buying.
            </p>
          </div>

          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Money Factor & APR Converter
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Lease vs Buy Decision Engine
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Mileage Penalty Analyzer
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Sensitivity Analysis Matrix
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Worked Math Example
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Printable PDF Report
            </Badge>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 2: MODES TABS BAR & ACTIONS
         ========================================== */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        {/* 2 Main Mode Tabs */}
        <div className="grid grid-cols-2 gap-1 w-full sm:w-auto bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab("total")}
            className={`px-4 py-2 rounded-md text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "total"
                ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            Total Price Method
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("target")}
            className={`px-4 py-2 rounded-md text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "target"
                ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            Monthly Payment Target
          </button>
        </div>

        {/* Action Controls */}
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
          <CheckCircle2 className="h-4 w-4" /> Shareable lease calculator link copied to clipboard!
        </div>
      )}

      {/* Saved Scenarios Bar */}
      {savedScenarios.length > 0 && (
        <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3 overflow-x-auto text-xs">
          <span className="font-bold text-zinc-500 shrink-0">Saved Lease Scenarios:</span>
          {savedScenarios.map((s, i) => (
            <Badge key={`sc-l-${i}`} variant="outline" className="bg-white dark:bg-zinc-900 shrink-0 font-sans tabular-nums">
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

          {/* TAB 1: TOTAL PRICE METHOD INPUTS */}
          {activeTab === "total" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-extrabold tracking-tight text-blue-600 dark:text-blue-400 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
                <span>Lease Contract Inputs</span>
                <span className="text-[11px] font-normal text-zinc-400">Real-time Calculation</span>
              </h2>

              <div className="space-y-4">
                {/* Vehicle Price & MSRP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Negotiated Vehicle Price (Cap Cost)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">$</span>
                      <Input
                        type="number"
                        value={autoPrice}
                        onChange={(e) => setAutoPrice(Math.max(0, Number(e.target.value)))}
                        className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Vehicle MSRP Sticker Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-sans tabular-nums">$</span>
                      <Input
                        type="number"
                        value={vehicleMsrp}
                        onChange={(e) => setVehicleMsrp(Math.max(0, Number(e.target.value)))}
                        className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Lease Term & Down Payment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Lease Term Length
                    </label>
                    <select
                      value={leaseTermMonths}
                      onChange={(e) => setLeaseTermMonths(Number(e.target.value))}
                      className="w-full h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs px-3 font-sans tabular-nums text-zinc-900 dark:text-zinc-100"
                    >
                      <option value={24}>24 Months (2 Years)</option>
                      <option value={36}>36 Months (3 Years)</option>
                      <option value={39}>39 Months (3.25 Years)</option>
                      <option value={42}>42 Months (3.5 Years)</option>
                      <option value={48}>48 Months (4 Years)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Cash Down Payment
                    </label>
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

                {/* INTEREST RATE CONFIGURATION CARD */}
                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400">
                      <Percent className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        Interest Rate Configuration
                      </h3>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        Two-way live synchronization between APR % and Money Factor
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        APR (%)
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        value={aprInput}
                        onChange={(e) => handleAprChange(e.target.value)}
                        className={`h-9 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 ${
                          aprError ? "border-rose-500 focus-visible:ring-rose-500" : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      />
                      {aprError && (
                        <span className="text-[11px] text-rose-500 mt-1 block font-medium">
                          {aprError}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Money Factor
                      </label>
                      <Input
                        type="number"
                        step="0.0001"
                        value={moneyFactorInput}
                        onChange={(e) => handleMoneyFactorChange(e.target.value)}
                        className={`h-9 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 ${
                          moneyFactorError ? "border-rose-500 focus-visible:ring-rose-500" : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      />
                      {moneyFactorError && (
                        <span className="text-[11px] text-rose-500 mt-1 block font-medium">
                          {moneyFactorError}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-zinc-500 dark:text-zinc-400 space-y-1 border-t border-blue-100/60 dark:border-blue-900/30">
                    <div className="font-sans tabular-nums font-bold text-blue-700 dark:text-blue-300">
                      Money Factor = APR ÷ 2400 &nbsp;|&nbsp; APR = Money Factor × 2400
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Money Factor is commonly used by leasing companies while APR is more familiar to consumers.
                    </p>
                  </div>
                </div>

                {/* Residual Value & Sales Tax */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Residual Value (% of MSRP)
                    </label>
                    <Input
                      type="number"
                      value={residualPercent}
                      onChange={(e) => setResidualPercent(Math.max(0, Number(e.target.value)))}
                      className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Sales Tax Rate (%)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={salesTaxRate}
                      onChange={(e) => setSalesTaxRate(Math.max(0, Number(e.target.value)))}
                      className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                    />
                  </div>
                </div>

                {/* ADVANCED OPTIONS & FEES COLLAPSIBLE */}
                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedFees(!showAdvancedFees)}
                    className="flex items-center justify-between w-full text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer py-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sliders className="h-4 w-4 text-blue-600" />
                      Itemized Fees, Incentives & Mileage Options
                    </span>
                    {showAdvancedFees ? <ChevronUp className="h-4 w-4 text-zinc-400" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
                  </button>

                  {showAdvancedFees && (
                    <div className="space-y-3 pt-3">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div>
                          <label className="block text-[10px] text-zinc-500">Acquisition Fee</label>
                          <Input
                            type="number"
                            value={acquisitionFee}
                            onChange={(e) => setAcquisitionFee(Math.max(0, Number(e.target.value)))}
                            className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-zinc-500">Registration Fee</label>
                          <Input
                            type="number"
                            value={registrationFee}
                            onChange={(e) => setRegistrationFee(Math.max(0, Number(e.target.value)))}
                            className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-zinc-500">Doc Fee</label>
                          <Input
                            type="number"
                            value={documentationFee}
                            onChange={(e) => setDocumentationFee(Math.max(0, Number(e.target.value)))}
                            className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-zinc-500">Disposition Fee</label>
                          <Input
                            type="number"
                            value={dispositionFee}
                            onChange={(e) => setDispositionFee(Math.max(0, Number(e.target.value)))}
                            className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div>
                          <label className="block text-[10px] text-zinc-500">Security Deposit</label>
                          <Input
                            type="number"
                            value={securityDeposit}
                            onChange={(e) => setSecurityDeposit(Math.max(0, Number(e.target.value)))}
                            className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-zinc-500">Negative Equity</label>
                          <Input
                            type="number"
                            value={negativeEquityRollover}
                            onChange={(e) => setNegativeEquityRollover(Math.max(0, Number(e.target.value)))}
                            className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-zinc-500">Mfg Incentives</label>
                          <Input
                            type="number"
                            value={manufacturerIncentives}
                            onChange={(e) => setManufacturerIncentives(Math.max(0, Number(e.target.value)))}
                            className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-zinc-500">Lease Rebates</label>
                          <Input
                            type="number"
                            value={leaseCashRebates}
                            onChange={(e) => setLeaseCashRebates(Math.max(0, Number(e.target.value)))}
                            className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                          />
                        </div>
                      </div>

                      {/* Mileage Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                        <div>
                          <label className="block text-[10px] text-zinc-500">Annual Miles Allowed</label>
                          <select
                            value={mileageAllowancePerYear}
                            onChange={(e) => setMileageAllowancePerYear(Number(e.target.value))}
                            className="w-full h-8 rounded border border-zinc-200 dark:border-zinc-800 text-xs px-2 font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                          >
                            <option value={10000}>10,000 Mi / Yr</option>
                            <option value={12000}>12,000 Mi / Yr</option>
                            <option value={15000}>15,000 Mi / Yr</option>
                            <option value={18000}>18,000 Mi / Yr</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] text-zinc-500">Expected Miles / Yr</label>
                          <Input
                            type="number"
                            value={expectedMilesPerYear}
                            onChange={(e) => setExpectedMilesPerYear(Math.max(0, Number(e.target.value)))}
                            className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-zinc-500">Excess Fee ($/Mi)</label>
                          <Input
                            type="number"
                            step="0.05"
                            value={excessMileageFeeRate}
                            onChange={(e) => setExcessMileageFeeRate(Math.max(0, Number(e.target.value)))}
                            className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MONTHLY PAYMENT TARGET REVERSE SOLVER */}
          {activeTab === "target" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-extrabold tracking-tight text-blue-600 dark:text-blue-400 border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
                Monthly Payment Target Reverse Lease Solver
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Target Monthly Lease Payment ($)
                  </label>
                  <Input
                    type="number"
                    value={targetMonthlyPayment}
                    onChange={(e) => setTargetMonthlyPayment(Math.max(0, Number(e.target.value)))}
                    className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Lease Term (Months)
                    </label>
                    <Input
                      type="number"
                      value={leaseTermMonths}
                      onChange={(e) => setLeaseTermMonths(Math.max(1, Number(e.target.value)))}
                      className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Target APR %
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={aprInput}
                      onChange={(e) => handleAprChange(e.target.value)}
                      className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                    />
                  </div>
                </div>

                {results.targetResult && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                    <span className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">
                      Reverse Lease Capacity Output
                    </span>
                    <div className="text-2xl font-black text-emerald-900 dark:text-emerald-100 font-sans tabular-nums">
                      {formatCurrency(results.targetResult.maxVehiclePrice)}
                    </div>
                    <p className="text-xs text-emerald-800 dark:text-emerald-300">
                      Maximum affordable vehicle selling price to achieve a target lease payment of <strong>{formatCurrency(targetMonthlyPayment)}/mo</strong>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 8: MILEAGE ANALYSIS MODULE */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">Mileage Excess Penalty Analysis
              </h3>
              <Badge
                variant="outline"
                className={`font-bold text-xs ${
                  results.mileageAnalysis.status === "Within Limit"
                    ? "text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/40"
                    : results.mileageAnalysis.status === "Near Limit"
                    ? "text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/40"
                    : "text-rose-600 border-rose-200 bg-rose-50 dark:bg-rose-950/40"
                }`}
              >
                {results.mileageAnalysis.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums">
                <span className="text-[10px] text-zinc-400 block font-sans">Total Contract Miles</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{results.mileageAnalysis.totalAllowance.toLocaleString()} Mi</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums">
                <span className="text-[10px] text-zinc-400 block font-sans">Expected Driving</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{results.mileageAnalysis.expectedTotalMiles.toLocaleString()} Mi</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums">
                <span className="text-[10px] text-zinc-400 block font-sans">Mileage Penalty</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">{formatCurrency(results.mileageAnalysis.totalPenaltyCost)}</span>
              </div>
            </div>

            {results.mileageAnalysis.excessMiles > 0 && (
              <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold bg-rose-50 dark:bg-rose-950/30 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/40">
                Warning: You are projected to exceed your mileage allowance by {results.mileageAnalysis.excessMiles.toLocaleString()} miles, adding {formatCurrency(results.mileageAnalysis.totalPenaltyCost)} in excess penalty fees at lease return.
              </p>
            )}
          </div>

          {/* SECTION 7: LEASE VS BUY DECISION ENGINE */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">Lease vs Buy Decision Engine
              </h3>
              <Badge className="bg-purple-600 text-white font-bold text-xs">
                {results.leaseVsBuy.recommendation}
              </Badge>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {results.leaseVsBuy.explanation}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-1">
                <span className="font-bold text-blue-900 dark:text-blue-300 block">Leasing Choice</span>
                <div className="font-sans tabular-nums text-zinc-900 dark:text-zinc-100">
                  <div>Monthly: <strong>{formatCurrency(results.leaseVsBuy.leaseMonthlyPayment)}</strong></div>
                  <div>Outlay: <strong>{formatCurrency(results.leaseVsBuy.leaseTotalOutlay)}</strong></div>
                  <div>Net Cost: <strong className="text-blue-600">{formatCurrency(results.leaseVsBuy.leaseNetEffectiveCost)}</strong></div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 space-y-1">
                <span className="font-bold text-purple-900 dark:text-purple-300 block">Buying Choice</span>
                <div className="font-sans tabular-nums text-zinc-900 dark:text-zinc-100">
                  <div>Monthly: <strong>{formatCurrency(results.leaseVsBuy.buyMonthlyPayment)}</strong></div>
                  <div>Equity: <strong>{formatCurrency(results.leaseVsBuy.buyEquityRetained)}</strong></div>
                  <div>Net Cost: <strong className="text-purple-600">{formatCurrency(results.leaseVsBuy.buyNetEffectiveCost)}</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS DASHBOARD & CHARTS (COL 6 STICKY) */}
        <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-4">

          {/* SECTION 4: HERO RESULT DISPLAY CARD */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-2xl p-6 shadow-xl border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
                Total Monthly Lease Payment
              </span>
              <Badge className="bg-blue-600 text-white text-[10px]">
                {leaseTermMonths} Mo @ {results.effectiveAprPercent}% APR
              </Badge>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-white font-sans tabular-nums tracking-tight">
              {formatCurrency(results.monthlyLeasePayment)}
              <span className="text-sm font-normal text-zinc-400 font-sans ml-1">/month</span>
            </div>

            {/* SECTION 4 RESULT CARDS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Total Lease Cost</span>
                <span className="text-sm font-bold text-zinc-100 font-sans tabular-nums">{formatCurrency(results.totalLeaseCost)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Monthly Depreciation</span>
                <span className="text-sm font-bold text-blue-400 font-sans tabular-nums">{formatCurrency(results.monthlyDepreciation)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Monthly Rent Fee</span>
                <span className="text-sm font-bold text-emerald-400 font-sans tabular-nums">{formatCurrency(results.monthlyFinanceFee)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Total Sales Tax</span>
                <span className="text-sm font-bold text-amber-400 font-sans tabular-nums">{formatCurrency(results.totalSalesTaxPaid)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Upfront Outlay</span>
                <span className="text-sm font-bold text-purple-400 font-sans tabular-nums">{formatCurrency(results.totalUpfrontCost)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block">Cost Per Mile</span>
                <span className="text-sm font-bold text-zinc-100 font-sans tabular-nums">${results.costPerMile}</span>
              </div>
            </div>
          </div>

          {/* SECTION 5: ADVANCED BREAKDOWN TABLE */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">Itemized Capitalized Cost Breakdown
            </h3>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs font-sans tabular-nums">
              {results.breakdown.map((row, idx) => (
                <div key={`brk-${idx}`} className="py-1.5 flex items-center justify-between">
                  <span className="font-sans text-zinc-700 dark:text-zinc-300">{row.label}</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(row.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 6: VISUALIZATIONS MODULE */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">Lease Charts & Visualizers
            </h3>

            {/* Chart 1: Doughnut */}
            <div>
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Monthly Payment Composition
              </span>
              <AutoLeasePaymentDoughnutChart
                monthlyDepreciation={results.monthlyDepreciation}
                monthlyFinanceFee={results.monthlyFinanceFee}
                monthlySalesTax={results.monthlySalesTax}
                monthlyLeasePayment={results.monthlyLeasePayment}
              />
            </div>

            {/* Chart 2: Timeline */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Cumulative Cash Outlay Over Lease Term
              </span>
              <AutoLeaseTimelineChart
                monthlyPayment={results.monthlyLeasePayment}
                upfrontCost={results.totalUpfrontCost}
                termMonths={leaseTermMonths}
              />
            </div>

            {/* Chart 3: Lease vs Buy Bar Chart */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Lease vs Buy Side-by-Side Cost Comparison
              </span>
              <AutoLeaseVsBuyBarChart leaseVsBuy={results.leaseVsBuy} />
            </div>
          </div>

          {/* SECTION 9: SENSITIVITY ANALYSIS MATRIX */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">Sensitivity Matrix (APR & Residual vs Payment)
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1.5">Interest Rate (APR) Sensitivity</span>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 font-sans tabular-nums text-[11px]">
                  {results.sensitivityMatrix.aprVsPayment.map((s, i) => (
                    <div key={`apr-s-${i}`} className="py-1 flex justify-between">
                      <span className="font-sans text-zinc-600 dark:text-zinc-400">{s.valueLabel}</span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(s.monthlyPayment)}/mo</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1.5">Residual Value % Sensitivity</span>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 font-sans tabular-nums text-[11px]">
                  {results.sensitivityMatrix.residualVsPayment.map((s, i) => (
                    <div key={`res-s-${i}`} className="py-1 flex justify-between">
                      <span className="font-sans text-zinc-600 dark:text-zinc-400">{s.valueLabel}</span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(s.monthlyPayment)}/mo</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 10: MATHEMATICAL FORMULAS DISPLAY */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3 text-xs">
            <h3 className="font-bold uppercase text-zinc-500 dark:text-zinc-400 tracking-wider">
              Mathematical Lease Formulas Used
            </h3>

            <div className="space-y-2 font-sans tabular-nums text-[11px] bg-zinc-50 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
              <p>• <strong>Depreciation:</strong> (Adjusted Cap Cost - Residual Value) ÷ Lease Term</p>
              <p>• <strong>Finance Charge:</strong> (Adjusted Cap Cost + Residual Value) × Money Factor</p>
              <p>• <strong>Monthly Tax:</strong> (Monthly Depreciation + Finance Charge) × Tax Rate</p>
              <p>• <strong>Monthly Payment:</strong> Depreciation + Finance Charge + Tax</p>
            </div>
          </div>

        </div>
      </div>

      {/* ==========================================
          SECTION 11, 12, 13, 15: SEO & WORKED EXAMPLE
         ========================================== */}
      <AutoLeaseContentSection />

      {/* PRINTABLE PDF REPORT MODAL */}
      <AutoLeaseReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        inputs={calculationInputs}
        results={results}
      />
    </div>
  );
}
