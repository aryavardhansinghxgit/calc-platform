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
  Download,
  Copy,
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
import { AutoLeaseReportModal } from "./AutoLeaseReportModal";

interface SavedLeaseSnapshot {
  id: string;
  name: string;
  payment: number;
  date: string;
  autoPrice: number;
  vehicleMsrp: number;
  downPayment: number;
  tradeInValue: number;
  amountOwedOnTradeIn: number;
  leaseTermMonths: number;
  aprInput: string;
  moneyFactorInput: string;
  residualPercent: number;
  salesTaxRate: number;
  acquisitionFee: number;
  registrationFee: number;
  documentationFee: number;
  dispositionFee: number;
  securityDeposit: number;
  negativeEquityRollover: number;
  manufacturerIncentives: number;
  leaseCashRebates: number;
  mileageAllowancePerYear: number;
  expectedMilesPerYear: number;
  excessMileageFeeRate: number;
  targetMonthlyPayment: number;
}

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
  const [savedScenarios, setSavedScenarios] = useState<SavedLeaseSnapshot[]>([]);
  const [showSavedList, setShowSavedList] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<boolean>(false);

  // Reset to Baseline
  const handleReset = () => {
    setActiveTab("total");
    setAutoPrice(35000);
    setVehicleMsrp(36000);
    setDownPayment(2500);
    setTradeInValue(2000);
    setAmountOwedOnTradeIn(0);
    setLeaseTermMonths(36);
    setAprInput("6.0");
    setMoneyFactorInput("0.0025");
    setAprError(null);
    setMoneyFactorError(null);
    setResidualInputType("percent");
    setResidualPercent(55);
    setResidualValue(19800);
    setSalesTaxRate(7.0);
    setAcquisitionFee(695);
    setRegistrationFee(250);
    setDocumentationFee(150);
    setDispositionFee(395);
    setSecurityDeposit(0);
    setNegativeEquityRollover(0);
    setManufacturerIncentives(500);
    setLeaseCashRebates(500);
    setMileageAllowancePerYear(12000);
    setExpectedMilesPerYear(14000);
    setExcessMileageFeeRate(0.20);
    setTargetMonthlyPayment(450);
  };

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

  // Copy Summary Handler
  const handleCopySummary = () => {
    const summary = [
      `Auto Lease Calculation Summary`,
      `------------------------------`,
      `Vehicle Negotiated Price: $${autoPrice.toLocaleString()}`,
      `MSRP: $${vehicleMsrp.toLocaleString()}`,
      `Term: ${leaseTermMonths} Months`,
      `Down Payment: $${downPayment.toLocaleString()}`,
      `Gross Cap Cost: $${results.grossCapCost.toLocaleString()}`,
      `Cap Reductions: $${results.capCostReductions.toLocaleString()}`,
      `Adjusted Cap Cost (Net Cap Cost): $${results.adjustedCapCost.toLocaleString()}`,
      `Residual Value: $${results.residualValue.toLocaleString()} (${residualPercent}%)`,
      `Monthly Depreciation: $${results.monthlyDepreciation.toFixed(2)}`,
      `Monthly Rent Fee: $${results.monthlyFinanceFee.toFixed(2)}`,
      `Monthly Sales Tax: $${results.monthlySalesTax.toFixed(2)} (${salesTaxRate}%)`,
      `Total Monthly Payment: $${results.monthlyLeasePayment.toFixed(2)}/mo`,
      `Total Out-of-Pocket Lease Cost: $${results.totalLeaseCost.toFixed(2)}`,
      `Upfront Outlay: $${results.totalUpfrontCost.toFixed(2)}`,
      `Cost Per Mile: $${results.costPerMile.toFixed(3)}/mi`,
      `Mileage Penalty: $${results.mileageAnalysis.totalPenaltyCost.toFixed(2)} (${results.mileageAnalysis.excessMiles.toLocaleString()} excess miles)`,
    ].join("\n");

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = ["Item / Metric", "Amount ($)", "Description"];
    const rows = results.breakdown.map((r) => [r.label, r.amount, r.description]);
    rows.push(["Total Lease Cost", results.totalLeaseCost, "Total out-of-pocket cost over full term"]);
    rows.push(["Upfront Outlay", results.totalUpfrontCost, "Total upfront cash paid at signing"]);
    rows.push(["Cost Per Mile", results.costPerMile, "Adjusted total cost divided by expected miles"]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.map(x => `"${x}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `auto_lease_breakdown_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save Scenario handler
  const handleSaveScenario = () => {
    const newSaved: SavedLeaseSnapshot = {
      id: `al_${Date.now()}`,
      name: `Lease (${formatCurrency(autoPrice)}, ${leaseTermMonths}mo @ ${aprPercent}%)`,
      payment: results.monthlyLeasePayment,
      date: new Date().toLocaleDateString(),
      autoPrice,
      vehicleMsrp,
      downPayment,
      tradeInValue,
      amountOwedOnTradeIn,
      leaseTermMonths,
      aprInput,
      moneyFactorInput,
      residualPercent,
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
    };
    setSavedScenarios([newSaved, ...savedScenarios]);
    setShowSavedList(true);
  };

  const handleRestoreScenario = (sc: SavedLeaseSnapshot) => {
    setAutoPrice(sc.autoPrice);
    setVehicleMsrp(sc.vehicleMsrp);
    setDownPayment(sc.downPayment);
    setTradeInValue(sc.tradeInValue);
    setAmountOwedOnTradeIn(sc.amountOwedOnTradeIn);
    setLeaseTermMonths(sc.leaseTermMonths);
    setAprInput(sc.aprInput);
    setMoneyFactorInput(sc.moneyFactorInput);
    setResidualPercent(sc.residualPercent);
    setSalesTaxRate(sc.salesTaxRate);
    setAcquisitionFee(sc.acquisitionFee);
    setRegistrationFee(sc.registrationFee);
    setDocumentationFee(sc.documentationFee);
    setDispositionFee(sc.dispositionFee);
    setSecurityDeposit(sc.securityDeposit);
    setNegativeEquityRollover(sc.negativeEquityRollover);
    setManufacturerIncentives(sc.manufacturerIncentives);
    setLeaseCashRebates(sc.leaseCashRebates);
    setMileageAllowancePerYear(sc.mileageAllowancePerYear);
    setExpectedMilesPerYear(sc.expectedMilesPerYear);
    setExcessMileageFeeRate(sc.excessMileageFeeRate);
    setTargetMonthlyPayment(sc.targetMonthlyPayment);
  };

  const handleDeleteScenario = (id: string) => {
    setSavedScenarios(savedScenarios.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* ==========================================
          SECTION 1: PAGE HEADER & HERO BADGES
         ========================================== */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
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
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Auto Lease Calculator
            </div>
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
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-8 text-xs gap-1.5 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5 text-zinc-500" /> Reset
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopySummary}
            className="h-8 text-xs gap-1.5 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <Copy className="h-3.5 w-3.5 text-blue-500" /> Copy
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="h-8 text-xs gap-1.5 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-emerald-500" /> Export CSV
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveScenario}
            className="h-8 text-xs gap-1.5 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <Bookmark className="h-3.5 w-3.5 text-indigo-500" /> Save {savedScenarios.length > 0 ? `(${savedScenarios.length})` : ""}
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

      {/* SAVED SCENARIOS DRAWER */}
      {savedScenarios.length > 0 && showSavedList && (
        <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
              <Bookmark className="h-3.5 w-3.5 text-indigo-600" /> Saved Lease Scenarios ({savedScenarios.length})
            </span>
            <Button variant="ghost" size="sm" onClick={() => setShowSavedList(false)} className="h-6 text-xs text-zinc-500">
              Hide
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {savedScenarios.map((sc) => (
              <div key={sc.id} className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-100">{sc.name}</div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{formatCurrency(sc.payment)}/mo</div>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" onClick={() => handleRestoreScenario(sc)} className="h-6 text-xs text-blue-600">
                    Restore
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteScenario(sc.id)} className="h-6 text-xs text-rose-500">
                    ×
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {shareToast && (
        <div className="bg-emerald-500 text-white text-xs px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Lease calculation summary copied to clipboard!
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
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  Lease Contract Inputs
                </h2>
                <Badge variant="outline" className="text-[10px] text-zinc-500">Real-time Calculation</Badge>
              </div>

              {/* Price and MSRP Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Negotiated Vehicle Price (Cap Cost)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
                    <Input
                      type="number"
                      value={autoPrice || ""}
                      onChange={(e) => setAutoPrice(Number(e.target.value))}
                      className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Vehicle MSRP Sticker Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
                    <Input
                      type="number"
                      value={vehicleMsrp || ""}
                      onChange={(e) => setVehicleMsrp(Number(e.target.value))}
                      className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                    />
                  </div>
                </div>
              </div>

              {/* Term & Down Payment Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Lease Term Length
                  </label>
                  <select
                    value={leaseTermMonths}
                    onChange={(e) => setLeaseTermMonths(Number(e.target.value))}
                    className="w-full h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 text-xs font-sans tabular-nums text-zinc-900 dark:text-zinc-100"
                  >
                    <option value={24}>24 Months (2 Years)</option>
                    <option value={36}>36 Months (3 Years)</option>
                    <option value={39}>39 Months (3.25 Years)</option>
                    <option value={42}>42 Months (3.5 Years)</option>
                    <option value={48}>48 Months (4 Years)</option>
                    <option value={60}>60 Months (5 Years)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Cash Down Payment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
                    <Input
                      type="number"
                      value={downPayment || ""}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                    />
                  </div>
                </div>
              </div>

              {/* Trade-in Value and Amount Owed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Trade-In Value
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
                    <Input
                      type="number"
                      value={tradeInValue || ""}
                      onChange={(e) => setTradeInValue(Number(e.target.value))}
                      className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Amount Owed on Trade
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
                    <Input
                      type="number"
                      value={amountOwedOnTradeIn || ""}
                      onChange={(e) => setAmountOwedOnTradeIn(Number(e.target.value))}
                      className="pl-7 h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                    />
                  </div>
                </div>
              </div>

              {/* TWO-WAY SYNCHRONIZED APR <-> MONEY FACTOR PANEL */}
              <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 dark:text-blue-300">
                    <Percent className="h-3.5 w-3.5 text-blue-600" />
                    Interest Rate Configuration
                  </div>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                    Two-way live synchronization between APR % and Money Factor
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      APR (%)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={aprInput}
                      onChange={(e) => handleAprChange(e.target.value)}
                      className="h-9 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900"
                    />
                    {aprError && <p className="text-[10px] text-rose-500 mt-1">{aprError}</p>}
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Money Factor
                    </label>
                    <Input
                      type="number"
                      step="0.0001"
                      value={moneyFactorInput}
                      onChange={(e) => handleMoneyFactorChange(e.target.value)}
                      className="h-9 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900"
                    />
                    {moneyFactorError && <p className="text-[10px] text-rose-500 mt-1">{moneyFactorError}</p>}
                  </div>
                </div>

                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between pt-1 border-t border-blue-200/50 dark:border-blue-900/30">
                  <span><strong>Money Factor = APR ÷ 2400</strong> | <strong>APR = Money Factor × 2400</strong></span>
                </div>
                <p className="text-[10px] text-zinc-400">
                  Money Factor is commonly used by leasing companies while APR is more familiar to consumers.
                </p>
              </div>

              {/* Residual and Sales Tax */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Residual Value (% of MSRP)
                    </label>
                  </div>
                  <Input
                    type="number"
                    value={residualPercent || ""}
                    onChange={(e) => setResidualPercent(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Sales Tax Rate (%)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={salesTaxRate || ""}
                    onChange={(e) => setSalesTaxRate(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                  />
                </div>
              </div>

              {/* ADVANCED OPTIONS & FEES TOGGLE */}
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowAdvancedFees(!showAdvancedFees)}
                  className="w-full flex items-center justify-between py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Sliders className="h-3.5 w-3.5" />
                    {showAdvancedFees ? "Hide Advanced Fees & Manufacturer Rebates" : "Show Advanced Fees, Incentives & Rebates"}
                  </span>
                  {showAdvancedFees ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {showAdvancedFees && (
                  <div className="pt-3 space-y-3 text-xs">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div>
                        <label className="block font-medium text-zinc-600 dark:text-zinc-400 mb-1">Acquisition Fee</label>
                        <Input
                          type="number"
                          value={acquisitionFee || ""}
                          onChange={(e) => setAcquisitionFee(Number(e.target.value))}
                          className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-zinc-600 dark:text-zinc-400 mb-1">Registration Fee</label>
                        <Input
                          type="number"
                          value={registrationFee || ""}
                          onChange={(e) => setRegistrationFee(Number(e.target.value))}
                          className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-zinc-600 dark:text-zinc-400 mb-1">Doc Fee</label>
                        <Input
                          type="number"
                          value={documentationFee || ""}
                          onChange={(e) => setDocumentationFee(Number(e.target.value))}
                          className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-zinc-600 dark:text-zinc-400 mb-1">Disposition Fee</label>
                        <Input
                          type="number"
                          value={dispositionFee || ""}
                          onChange={(e) => setDispositionFee(Number(e.target.value))}
                          className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div>
                        <label className="block font-medium text-zinc-600 dark:text-zinc-400 mb-1">Security Deposit</label>
                        <Input
                          type="number"
                          value={securityDeposit || ""}
                          onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                          className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-zinc-600 dark:text-zinc-400 mb-1">Neg. Equity Rollover</label>
                        <Input
                          type="number"
                          value={negativeEquityRollover || ""}
                          onChange={(e) => setNegativeEquityRollover(Number(e.target.value))}
                          className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-zinc-600 dark:text-zinc-400 mb-1">Mfg. Incentives</label>
                        <Input
                          type="number"
                          value={manufacturerIncentives || ""}
                          onChange={(e) => setManufacturerIncentives(Number(e.target.value))}
                          className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-zinc-600 dark:text-zinc-400 mb-1">Lease Cash Rebate</label>
                        <Input
                          type="number"
                          value={leaseCashRebates || ""}
                          onChange={(e) => setLeaseCashRebates(Number(e.target.value))}
                          className="h-8 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: REVERSE TARGET MONTHLY PAYMENT SOLVER */}
          {activeTab === "target" && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-emerald-600" />
                  Monthly Payment Target Reverse Lease Solver
                </h2>
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
                  Inverse Solver
                </Badge>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Target Monthly Lease Payment ($)
                </label>
                <Input
                  type="number"
                  value={targetMonthlyPayment || ""}
                  onChange={(e) => setTargetMonthlyPayment(Number(e.target.value))}
                  className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Lease Term (Months)
                  </label>
                  <Input
                    type="number"
                    value={leaseTermMonths}
                    onChange={(e) => setLeaseTermMonths(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Target APR %
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    value={aprInput}
                    onChange={(e) => handleAprChange(e.target.value)}
                    className="h-9 text-xs font-sans tabular-nums bg-zinc-50 dark:bg-zinc-950"
                  />
                </div>
              </div>

              {results.targetResult && (
                <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-700 dark:text-emerald-400 block">
                    Reverse Lease Capacity Output
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-sans tabular-nums">
                    {formatCurrency(results.targetResult.maxVehiclePrice)}
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Maximum affordable vehicle selling price to achieve a target lease payment of{" "}
                    <strong>{formatCurrency(results.targetResult.targetMonthlyPayment)}/mo</strong>.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* SECTION 4: MILEAGE PENALTY ANALYZER */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-indigo-600" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Mileage Excess Penalty Analysis
                </h3>
              </div>
              <Badge
                className={`text-[10px] ${
                  results.mileageAnalysis.status === "Over Limit"
                    ? "bg-rose-500/10 text-rose-600 border-rose-500/20"
                    : results.mileageAnalysis.status === "Near Limit"
                    ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                    : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                }`}
              >
                {results.mileageAnalysis.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">Total Contract Miles</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums text-sm">
                  {results.mileageAnalysis.totalAllowance.toLocaleString()} Mi
                </span>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">Expected Driving</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums text-sm">
                  {results.mileageAnalysis.expectedTotalMiles.toLocaleString()} Mi
                </span>
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">Mileage Penalty</span>
                <span className="font-bold text-rose-600 dark:text-rose-400 font-sans tabular-nums text-sm">
                  {formatCurrency(results.mileageAnalysis.totalPenaltyCost)}
                </span>
              </div>
            </div>

            {results.mileageAnalysis.excessMiles > 0 && (
              <div className="p-3 rounded-lg bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-700 dark:text-rose-300">
                <strong>Warning:</strong> You are projected to exceed your mileage allowance by{" "}
                <strong>{results.mileageAnalysis.excessMiles.toLocaleString()} miles</strong>, adding{" "}
                <strong>{formatCurrency(results.mileageAnalysis.totalPenaltyCost)}</strong> in excess penalty fees at lease return.
              </div>
            )}
          </div>

          {/* SECTION 5: LEASE VS BUY DECISION ENGINE */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                Lease vs Buy Decision Engine
              </h3>
              <Badge className="bg-blue-600 text-white text-[10px]">
                {results.leaseVsBuy.recommendation}
              </Badge>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              {results.leaseVsBuy.explanation}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/40 space-y-1">
                <span className="font-bold text-blue-900 dark:text-blue-300 text-xs block">Leasing Choice</span>
                <p className="text-zinc-600 dark:text-zinc-400">Monthly: <strong>{formatCurrency(results.leaseVsBuy.leaseMonthlyPayment)}</strong></p>
                <p className="text-zinc-600 dark:text-zinc-400">Outlay: <strong>{formatCurrency(results.leaseVsBuy.leaseTotalOutlay)}</strong></p>
                <p className="text-blue-600 dark:text-blue-400 font-bold">Net Cost: {formatCurrency(results.leaseVsBuy.leaseNetEffectiveCost)}</p>
              </div>

              <div className="p-3.5 bg-purple-50/50 dark:bg-purple-950/20 rounded-xl border border-purple-100 dark:border-purple-900/40 space-y-1">
                <span className="font-bold text-purple-900 dark:text-purple-300 text-xs block">Buying Choice</span>
                <p className="text-zinc-600 dark:text-zinc-400">Monthly: <strong>{formatCurrency(results.leaseVsBuy.buyMonthlyPayment)}</strong></p>
                <p className="text-zinc-600 dark:text-zinc-400">Equity: <strong>{formatCurrency(results.leaseVsBuy.buyEquityRetained)}</strong></p>
                <p className="text-purple-600 dark:text-purple-400 font-bold">Net Cost: {formatCurrency(results.leaseVsBuy.buyNetEffectiveCost)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS DASHBOARD & CHARTS (COL 6) */}
        <div className="lg:col-span-6 space-y-6">

          {/* SECTION 6: HERO RESULTS DASHBOARD */}
          <div className="bg-gradient-to-br from-zinc-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-zinc-800 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-400">
                Total Monthly Lease Payment
              </span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 text-[10px]">
                {leaseTermMonths} Mo @ {aprPercent}% APR
              </Badge>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sans tabular-nums">
                {formatCurrency(results.monthlyLeasePayment)}
                <span className="text-xs sm:text-sm font-semibold text-zinc-400 ml-1">/month</span>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/10 font-sans tabular-nums">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[10px] text-zinc-400 block">Total Lease Cost</span>
                <span className="text-xs font-bold text-white">{formatCurrency(results.totalLeaseCost)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[10px] text-zinc-400 block">Monthly Depreciation</span>
                <span className="text-xs font-bold text-blue-400">{formatCurrency(results.monthlyDepreciation)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[10px] text-zinc-400 block">Monthly Rent Fee</span>
                <span className="text-xs font-bold text-emerald-400">{formatCurrency(results.monthlyFinanceFee)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[10px] text-zinc-400 block">Total Sales Tax</span>
                <span className="text-xs font-bold text-amber-400">{formatCurrency(results.totalSalesTaxPaid)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[10px] text-zinc-400 block">Upfront Outlay</span>
                <span className="text-xs font-bold text-purple-400">{formatCurrency(results.totalUpfrontCost)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[10px] text-zinc-400 block">Cost Per Mile</span>
                <span className="text-xs font-bold text-white">${results.costPerMile.toFixed(3)}</span>
              </div>
            </div>
          </div>

          {/* SECTION 7: ITEMIZED CAPITALIZED COST BREAKDOWN TABLE */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Itemized Capitalized Cost Breakdown
            </h3>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs font-sans tabular-nums">
              {results.breakdown.map((row, idx) => (
                <div key={`brk-${idx}`} className="py-2 flex items-center justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">{row.label}</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(row.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 8: LEASE CHARTS & VISUALIZERS */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-6">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Lease Charts & Visualizers
            </h3>

            {/* Doughnut: Monthly Payment Composition */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Monthly Payment Composition</span>
              <AutoLeasePaymentDoughnutChart
                monthlyDepreciation={results.monthlyDepreciation}
                monthlyFinanceFee={results.monthlyFinanceFee}
                monthlySalesTax={results.monthlySalesTax}
                monthlyLeasePayment={results.monthlyLeasePayment}
              />
            </div>

            {/* Area: Cumulative Cash Outlay Over Lease Term */}
            <div className="space-y-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Cumulative Cash Outlay Over Lease Term</span>
              <AutoLeaseTimelineChart
                termMonths={leaseTermMonths}
                monthlyPayment={results.monthlyLeasePayment}
                upfrontCost={results.totalUpfrontCost}
              />
            </div>

            {/* Bar: Lease vs Buy Side-by-Side Comparison */}
            <div className="space-y-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Lease vs Buy Side-by-Side Cost Comparison</span>
              <AutoLeaseVsBuyBarChart leaseVsBuy={results.leaseVsBuy} />
            </div>
          </div>

          {/* SECTION 9: SENSITIVITY ANALYSIS MATRIX */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Sensitivity Matrix (APR & Residual vs Payment)
            </h3>

            <div className="space-y-4 text-xs font-sans tabular-nums">
              <div>
                <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block mb-1.5">
                  Interest Rate (APR) Sensitivity
                </span>
                <div className="space-y-1.5">
                  {results.sensitivityMatrix.aprVsPayment.map((opt, i) => (
                    <div key={`apr-s-${i}`} className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[11px]">
                      <span className="text-zinc-700 dark:text-zinc-300">{opt.valueLabel}</span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(opt.monthlyPayment)}/mo</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block mb-1.5">
                  Residual Value % Sensitivity
                </span>
                <div className="space-y-1.5">
                  {results.sensitivityMatrix.residualVsPayment.map((opt, i) => (
                    <div key={`res-s-${i}`} className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[11px]">
                      <span className="text-zinc-700 dark:text-zinc-300">{opt.valueLabel}</span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(opt.monthlyPayment)}/mo</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 10: MATHEMATICAL FORMULAS DISPLAY */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-3 text-xs">
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

export default AutoLeaseCalculator;
