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
  BarChart3,
  TrendingUp,
  Copy,
  Printer,
  FileText,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";
import { calculateRefinanceModule } from "@/modules/refinance/formula";
import {
  RefinanceInput,
  RefinanceOutput,
  CurrentLoanMode,
  RefinanceType,
  SavedRefinanceCalculation,
} from "@/modules/refinance/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

// Lazy load visual charts
const RefinancePaymentBarChart = dynamic(
  () => import("../charts/RefinancePaymentBarChart").then((m) => m.RefinancePaymentBarChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-mono">
        Loading payment chart...
      </div>
    ),
  }
);

const RefinanceInterestChart = dynamic(
  () => import("../charts/RefinanceInterestChart").then((m) => m.RefinanceInterestChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-mono">
        Loading interest chart...
      </div>
    ),
  }
);

const RefinanceBreakEvenChart = dynamic(
  () => import("../charts/RefinanceBreakEvenChart").then((m) => m.RefinanceBreakEvenChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-mono">
        Loading break-even chart...
      </div>
    ),
  }
);

export function RefinanceCalculator() {
  // Current Loan State
  const [currentLoanMode, setCurrentLoanMode] = useState<CurrentLoanMode>("remaining-balance");
  const [remainingBalance, setRemainingBalance] = useState<number>(250000);
  const [originalLoanAmount, setOriginalLoanAmount] = useState<number>(300000);
  const [originalLoanTermYears, setOriginalLoanTermYears] = useState<number>(30);
  const [yearsPaid, setYearsPaid] = useState<number>(5);
  const [payoffAmount, setPayoffAmount] = useState<number>(250000);
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState<number>(1800);
  const [currentInterestRate, setCurrentInterestRate] = useState<number>(7.0);

  // New Loan State
  const [newLoanTermYears, setNewLoanTermYears] = useState<number>(20);
  const [newInterestRate, setNewInterestRate] = useState<number>(6.0);
  const [discountPoints, setDiscountPoints] = useState<number>(2);
  const [closingCosts, setClosingCosts] = useState<number>(1500);
  const [cashOutAmount, setCashOutAmount] = useState<number>(0);

  // Advanced Accordion State
  const [isAdvancedOpen, setIsAdvancedOpen] = useState<boolean>(false);
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<number>(0);
  const [insuranceAnnual, setInsuranceAnnual] = useState<number>(0);
  const [hoaMonthly, setHoaMonthly] = useState<number>(0);
  const [pmiMonthly, setPmiMonthly] = useState<number>(0);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(0);
  const [refinanceType, setRefinanceType] = useState<RefinanceType>("rate-and-term");

  // Chart Tab State
  const [activeChartTab, setActiveChartTab] = useState<"payment" | "interest" | "breakeven">("payment");

  // Save / Share / Copy State
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [saveName, setSaveName] = useState<string>("");
  const [savedCalculations, setSavedCalculations] = useState<SavedRefinanceCalculation[]>([]);
  const [copySuccessMsg, setCopySuccessMsg] = useState<string>("");
  const [shareSuccessMsg, setShareSuccessMsg] = useState<string>("");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>("");

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("calcplatform_saved_refinance");
        if (stored) setSavedCalculations(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Calculation Engine Call
  const results: RefinanceOutput = useMemo(() => {
    const input: RefinanceInput = {
      currentLoanMode,
      remainingBalance,
      originalLoanAmount,
      originalLoanTermYears,
      yearsPaid,
      payoffAmount,
      currentMonthlyPayment,
      currentInterestRate,
      newLoanTermYears,
      newInterestRate,
      discountPoints,
      closingCosts,
      cashOutAmount,
      propertyTaxAnnual,
      insuranceAnnual,
      hoaMonthly,
      pmiMonthly,
      extraMonthlyPayment,
      refinanceType,
    };
    return calculateRefinanceModule(input);
  }, [
    currentLoanMode,
    remainingBalance,
    originalLoanAmount,
    originalLoanTermYears,
    yearsPaid,
    payoffAmount,
    currentMonthlyPayment,
    currentInterestRate,
    newLoanTermYears,
    newInterestRate,
    discountPoints,
    closingCosts,
    cashOutAmount,
    propertyTaxAnnual,
    insuranceAnnual,
    hoaMonthly,
    pmiMonthly,
    extraMonthlyPayment,
    refinanceType,
  ]);

  const handleReset = () => {
    setCurrentLoanMode("remaining-balance");
    setRemainingBalance(250000);
    setOriginalLoanAmount(300000);
    setOriginalLoanTermYears(30);
    setYearsPaid(5);
    setPayoffAmount(250000);
    setCurrentMonthlyPayment(1800);
    setCurrentInterestRate(7.0);
    setNewLoanTermYears(20);
    setNewInterestRate(6.0);
    setDiscountPoints(2);
    setClosingCosts(1500);
    setCashOutAmount(0);
    setPropertyTaxAnnual(0);
    setInsuranceAnnual(0);
    setHoaMonthly(0);
    setPmiMonthly(0);
    setExtraMonthlyPayment(0);
    setRefinanceType("rate-and-term");
  };

  const handleCopyResults = () => {
    const text = `Refinance Analysis Summary:\nCurrent Monthly Payment: ${formatCurrency(results.currentMonthlyPayment)}\nNew Monthly Payment: ${formatCurrency(results.newMonthlyPayment)}\nMonthly Savings: ${formatCurrency(results.monthlySavings)}\nTotal Refinance Costs: ${formatCurrency(results.totalRefinanceCost)}\nBreak-Even: ${results.breakEvenMonths} months (${results.breakEvenYears} yrs)\nTotal Interest Saved: ${formatCurrency(results.interestSaved)}\nRecommendation: ${results.isRecommended ? "Recommended" : "Not Recommended"}`;
    navigator.clipboard.writeText(text);
    setCopySuccessMsg("Refinance summary copied!");
    setTimeout(() => setCopySuccessMsg(""), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareUrl = () => {
    const params = new URLSearchParams();
    params.set("mode", currentLoanMode);
    params.set("bal", remainingBalance.toString());
    params.set("curRate", currentInterestRate.toString());
    params.set("newRate", newInterestRate.toString());
    params.set("newTerm", newLoanTermYears.toString());

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (navigator.share) {
      navigator.share({
        title: "Refinance Analysis",
        text: "Check out my loan refinance calculation on CalcPlatform",
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      setShareSuccessMsg("Shareable link copied!");
      setTimeout(() => setShareSuccessMsg(""), 2000);
    }
  };

  const handleSaveCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    const newSave: SavedRefinanceCalculation = {
      id: `refinance-${Date.now()}`,
      name: saveName.trim() || `Refinance ($${remainingBalance.toLocaleString()})`,
      dateSaved: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      inputs: { remainingBalance, currentInterestRate, newInterestRate, newLoanTermYears },
      monthlySavings: results.monthlySavings,
      netSavings: results.netSavings,
      breakEvenMonths: results.breakEvenMonths,
    };

    const updated = [newSave, ...savedCalculations].slice(0, 50);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("calcplatform_saved_refinance", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setSaveSuccessMsg("Refinance setup saved!");
    setTimeout(() => {
      setSaveSuccessMsg("");
      setIsSaveModalOpen(false);
      setSaveName("");
    }, 1200);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedCalculations.filter((s) => s.id !== id);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("calcplatform_saved_refinance", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Subtitle Hero Banner & Action Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-800/80 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700/80 shadow-xs">
        <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
          Compare your current loan with a new refinanced loan to estimate payment changes, interest savings, refinancing costs, and break-even period.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {copySuccessMsg && (
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 animate-pulse">
              {copySuccessMsg}
            </span>
          )}
          {shareSuccessMsg && (
            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 animate-pulse">
              {shareSuccessMsg}
            </span>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyResults}
            className="h-8 text-xs gap-1.5 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900"
          >
            <Copy className="h-3.5 w-3.5 text-blue-500" /> Copy
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleShareUrl}
            className="h-8 text-xs gap-1.5 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900"
          >
            <Share2 className="h-3.5 w-3.5 text-emerald-500" /> Share
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="h-8 text-xs gap-1.5 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900"
          >
            <Printer className="h-3.5 w-3.5 text-purple-500" /> Print / PDF
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => setIsSaveModalOpen(true)}
            className="h-8 text-xs gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
          >
            <Bookmark className="h-3.5 w-3.5" /> Save
          </Button>
        </div>
      </div>

      {/* 2-Column Calculator Card: LEFT: Current Loan | RIGHT: New Loan */}
      <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
        <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Loan Refinance Comparison
          </CardTitle>
          <CardDescription className="text-xs text-zinc-500">
            Enter your current loan details on the left and proposed new loan terms on the right
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT COLUMN: CURRENT LOAN */}
            <div className="space-y-4 p-4 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80">
              <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-700 pb-2">
                Current Loan
              </h3>

              {/* Mode Selector Dropdown */}
              <div>
                <Label htmlFor="currentLoanMode" className="text-zinc-700 dark:text-zinc-300 font-semibold">
                  How do you want to describe your current loan?
                </Label>
                <select
                  id="currentLoanMode"
                  value={currentLoanMode}
                  onChange={(e) => setCurrentLoanMode(e.target.value as CurrentLoanMode)}
                  className="mt-1 w-full h-9 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs px-2 text-zinc-900 dark:text-zinc-100 font-medium"
                >
                  <option value="remaining-balance">I know my remaining balance</option>
                  <option value="original-amount">I know my original loan amount</option>
                  <option value="payoff-amount">I know my payoff amount</option>
                </select>
              </div>

              {/* Mode A: Remaining Balance */}
              {currentLoanMode === "remaining-balance" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="remainingBalance" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Remaining Balance ($)
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                      <Input
                        id="remainingBalance"
                        type="number"
                        min={0}
                        step={5000}
                        value={remainingBalance}
                        onChange={(e) => setRemainingBalance(Math.max(0, Number(e.target.value)))}
                        className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="currentMonthlyPayment1" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Monthly Payment ($)
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                      <Input
                        id="currentMonthlyPayment1"
                        type="number"
                        min={0}
                        step={50}
                        value={currentMonthlyPayment}
                        onChange={(e) => setCurrentMonthlyPayment(Math.max(0, Number(e.target.value)))}
                        className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Mode B: Original Amount */}
              {currentLoanMode === "original-amount" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="originalLoanAmount" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Original Loan Amount ($)
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                      <Input
                        id="originalLoanAmount"
                        type="number"
                        min={0}
                        step={5000}
                        value={originalLoanAmount}
                        onChange={(e) => setOriginalLoanAmount(Math.max(0, Number(e.target.value)))}
                        className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="originalLoanTermYears" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Original Term (yrs)
                      </Label>
                      <Input
                        id="originalLoanTermYears"
                        type="number"
                        min={1}
                        max={50}
                        value={originalLoanTermYears}
                        onChange={(e) => setOriginalLoanTermYears(Math.max(1, Number(e.target.value)))}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="yearsPaid" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Years Paid (yrs)
                      </Label>
                      <Input
                        id="yearsPaid"
                        type="number"
                        min={0}
                        max={originalLoanTermYears}
                        value={yearsPaid}
                        onChange={(e) => setYearsPaid(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Mode C: Payoff Amount */}
              {currentLoanMode === "payoff-amount" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="payoffAmount" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Payoff Amount ($)
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                      <Input
                        id="payoffAmount"
                        type="number"
                        min={0}
                        step={5000}
                        value={payoffAmount}
                        onChange={(e) => setPayoffAmount(Math.max(0, Number(e.target.value)))}
                        className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="currentMonthlyPayment2" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Monthly Payment ($)
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                      <Input
                        id="currentMonthlyPayment2"
                        type="number"
                        min={0}
                        step={50}
                        value={currentMonthlyPayment}
                        onChange={(e) => setCurrentMonthlyPayment(Math.max(0, Number(e.target.value)))}
                        className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Current Interest Rate */}
              <div>
                <Label htmlFor="currentInterestRate" className="text-zinc-700 dark:text-zinc-300 font-medium">
                  Current Interest Rate (%)
                </Label>
                <div className="relative mt-1">
                  <Percent className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                  <Input
                    id="currentInterestRate"
                    type="number"
                    step={0.1}
                    min={0}
                    max={100}
                    value={currentInterestRate}
                    onChange={(e) => setCurrentInterestRate(Math.max(0, Number(e.target.value)))}
                    className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: NEW LOAN */}
            <div className="space-y-4 p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60">
              <h3 className="font-extrabold text-sm text-blue-900 dark:text-blue-100 border-b border-blue-200 dark:border-blue-900/60 pb-2">
                New Loan
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="newLoanTermYears" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    New Term (years)
                  </Label>
                  <Input
                    id="newLoanTermYears"
                    type="number"
                    min={1}
                    max={50}
                    value={newLoanTermYears}
                    onChange={(e) => setNewLoanTermYears(Math.max(1, Number(e.target.value)))}
                    className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="newInterestRate" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    New Rate (%)
                  </Label>
                  <div className="relative mt-1">
                    <Percent className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      id="newInterestRate"
                      type="number"
                      step={0.1}
                      min={0}
                      max={100}
                      value={newInterestRate}
                      onChange={(e) => setNewInterestRate(Math.max(0, Number(e.target.value)))}
                      className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="discountPoints" className="text-zinc-700 dark:text-zinc-300 font-medium">
                  Discount Points (%)
                </Label>
                <div className="relative mt-1">
                  <Percent className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                  <Input
                    id="discountPoints"
                    type="number"
                    step={0.5}
                    min={0}
                    max={10}
                    value={discountPoints}
                    onChange={(e) => setDiscountPoints(Math.max(0, Number(e.target.value)))}
                    className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="closingCosts" className="text-zinc-700 dark:text-zinc-300 font-medium">
                  Closing Costs & Fees ($)
                </Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                  <Input
                    id="closingCosts"
                    type="number"
                    min={0}
                    step={250}
                    value={closingCosts}
                    onChange={(e) => setClosingCosts(Math.max(0, Number(e.target.value)))}
                    className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cashOutAmount" className="text-zinc-700 dark:text-zinc-300 font-medium">
                  Cash Out Amount ($ optional)
                </Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                  <Input
                    id="cashOutAmount"
                    type="number"
                    min={0}
                    step={5000}
                    value={cashOutAmount}
                    onChange={(e) => setCashOutAmount(Math.max(0, Number(e.target.value)))}
                    className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Optional Advanced Settings Accordion */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="flex items-center justify-between w-full py-2 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Sliders className="h-4 w-4 text-blue-500" /> Optional Advanced Settings & Refinance Types
              </span>
              {isAdvancedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {isAdvancedOpen && (
              <div className="pt-3 space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <Label htmlFor="propertyTaxAnnual" className="text-[10px] text-zinc-600 dark:text-zinc-400">
                      Property Tax ($/yr)
                    </Label>
                    <Input
                      id="propertyTaxAnnual"
                      type="number"
                      min={0}
                      step={500}
                      value={propertyTaxAnnual}
                      onChange={(e) => setPropertyTaxAnnual(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insuranceAnnual" className="text-[10px] text-zinc-600 dark:text-zinc-400">
                      Home Insurance ($/yr)
                    </Label>
                    <Input
                      id="insuranceAnnual"
                      type="number"
                      min={0}
                      step={200}
                      value={insuranceAnnual}
                      onChange={(e) => setInsuranceAnnual(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hoaMonthly" className="text-[10px] text-zinc-600 dark:text-zinc-400">
                      HOA Fees ($/mo)
                    </Label>
                    <Input
                      id="hoaMonthly"
                      type="number"
                      min={0}
                      step={50}
                      value={hoaMonthly}
                      onChange={(e) => setHoaMonthly(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pmiMonthly" className="text-[10px] text-zinc-600 dark:text-zinc-400">
                      PMI Insurance ($/mo)
                    </Label>
                    <Input
                      id="pmiMonthly"
                      type="number"
                      min={0}
                      step={50}
                      value={pmiMonthly}
                      onChange={(e) => setPmiMonthly(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800 font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="refinanceType" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Refinance Type Category
                  </Label>
                  <select
                    id="refinanceType"
                    value={refinanceType}
                    onChange={(e) => setRefinanceType(e.target.value as RefinanceType)}
                    className="mt-1 w-full h-9 rounded-md bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs px-2 text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="rate-and-term">Rate & Term Refinance</option>
                    <option value="cash-out">Cash-Out Refinance</option>
                    <option value="cash-in">Cash-In Refinance</option>
                    <option value="debt-consolidation">Debt Consolidation Refinance</option>
                    <option value="mortgage">Mortgage Refinance</option>
                    <option value="student-loan">Student Loan Refinance</option>
                    <option value="auto-loan">Auto Loan Refinance</option>
                    <option value="personal-loan">Personal Loan Refinance</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="h-9 text-xs font-semibold border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset All Inputs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* RESULTS SECTION: Recommendation Engine + 5 Analysis Modules */}
      <div className="space-y-6">
        {/* Recommendation Engine Banner */}
        <Card className={`border shadow-md ${
          results.isRecommended
            ? "border-emerald-200 dark:border-emerald-900 bg-gradient-to-r from-emerald-50 via-white to-teal-50/50 dark:from-emerald-950/40 dark:via-zinc-900 dark:to-teal-950/30"
            : "border-amber-200 dark:border-amber-900 bg-gradient-to-r from-amber-50 via-white to-orange-50/50 dark:from-amber-950/40 dark:via-zinc-900 dark:to-orange-950/30"
        }`}>
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {results.isRecommended ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                )}
                <span className={`text-base font-extrabold ${
                  results.isRecommended ? "text-emerald-900 dark:text-emerald-200" : "text-amber-900 dark:text-amber-200"
                }`}>
                  {results.isRecommended ? "✓ Refinance Recommended" : "⚠ Refinance Not Recommended"}
                </span>
              </div>
            </div>

            <ul className="space-y-1 text-xs pl-8 list-disc">
              {results.recommendationReasons.map((reason, idx) => (
                <li key={`reason-${idx}`} className="text-zinc-700 dark:text-zinc-300 font-medium">
                  {reason}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 5 Result Analysis Cards (A, B, C, D, E) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* A. Monthly Payment Comparison */}
          <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                A. Monthly Payment Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Current Payment:</span>
                <span className="font-bold font-mono text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(results.currentMonthlyPayment)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">New Payment:</span>
                <span className="font-bold font-mono text-blue-600 dark:text-blue-400">
                  {formatCurrency(results.newMonthlyPayment)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 font-bold">
                <span className="text-zinc-700 dark:text-zinc-300">Monthly Savings:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatCurrency(results.monthlySavings)} ({results.monthlySavingsPercent}%)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* B. Lifetime Interest Comparison */}
          <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase font-bold tracking-wider text-purple-600 dark:text-purple-400">
                B. Lifetime Interest Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Current Remaining Interest:</span>
                <span className="font-bold font-mono text-amber-600 dark:text-amber-400">
                  {formatCurrency(results.currentRemainingInterest)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">New Loan Interest:</span>
                <span className="font-bold font-mono text-blue-600 dark:text-blue-400">
                  {formatCurrency(results.newLoanTotalInterest)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 font-bold">
                <span className="text-zinc-700 dark:text-zinc-300">Total Interest Saved:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatCurrency(results.interestSaved)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* C. Total Refinance Cost */}
          <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400">
                C. Refinance Upfront Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Closing Costs & Fees:</span>
                <span className="font-bold font-mono text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(results.closingCosts)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Discount Points Cost:</span>
                <span className="font-bold font-mono text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(results.pointsCost)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 font-bold">
                <span className="text-zinc-700 dark:text-zinc-300">Total Upfront Cost:</span>
                <span className="font-mono text-purple-600 dark:text-purple-400 text-sm">
                  {formatCurrency(results.closingCosts + results.pointsCost)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* D. Break-Even Analysis */}
          <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
                D. Break-Even Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                {results.breakEvenMonths < 900 ? `${results.breakEvenMonths} Months (${results.breakEvenYears} Yrs)` : "No Break-Even"}
              </div>
              <p className="text-zinc-500 leading-relaxed text-[11px]">
                {results.breakEvenMonths < 900
                  ? `After ${results.breakEvenMonths} months (${results.breakEvenYears} years), your monthly payment savings will completely offset your refinancing costs.`
                  : "Refinancing costs exceed monthly savings."}
              </p>
            </CardContent>
          </Card>

          {/* E. Total Net Savings */}
          <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                E. Net Lifetime Financial Benefit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                {formatCurrency(results.netSavings)}
              </div>
              <p className="text-zinc-500 leading-relaxed text-[11px]">
                Net savings after subtracting all upfront closing costs and points from your total interest savings.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Visual Analytics Container (3 Charts) */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2.5 gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Visual Refinance Analytics & Break-Even Timeline
            </h3>
            <div className="flex flex-wrap items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <button
                type="button"
                onClick={() => setActiveChartTab("payment")}
                className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                  activeChartTab === "payment"
                    ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-zinc-500"
                }`}
              >
                <BarChart3 className="h-3 w-3" /> Monthly Payment
              </button>
              <button
                type="button"
                onClick={() => setActiveChartTab("interest")}
                className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                  activeChartTab === "interest"
                    ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-zinc-500"
                }`}
              >
                <PieIcon className="h-3 w-3" /> Total Interest
              </button>
              <button
                type="button"
                onClick={() => setActiveChartTab("breakeven")}
                className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                  activeChartTab === "breakeven"
                    ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-zinc-500"
                }`}
              >
                <TrendingUp className="h-3 w-3" /> Break-Even Timeline
              </button>
            </div>
          </div>

          <div className="pt-1">
            {activeChartTab === "payment" ? (
              <RefinancePaymentBarChart
                currentMonthlyPayment={results.currentMonthlyPayment}
                newMonthlyPayment={results.newMonthlyPayment}
              />
            ) : activeChartTab === "interest" ? (
              <RefinanceInterestChart
                currentRemainingInterest={results.currentRemainingInterest}
                newLoanTotalInterest={results.newLoanTotalInterest}
              />
            ) : (
              <RefinanceBreakEvenChart
                timelineData={results.timelineData}
                breakEvenMonths={results.breakEvenMonths}
              />
            )}
          </div>
        </div>
      </div>

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
                  Save Refinance Calculation
                </h3>
                <p className="text-xs text-zinc-500">
                  Store setup locally to reload anytime
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
                  <span className="text-zinc-500 block">Summary:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm block font-mono">
                    Monthly Savings: {formatCurrency(results.monthlySavings)}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    Refinance from {currentInterestRate}% to {newInterestRate}% over {newLoanTermYears} yrs
                  </span>
                </div>

                <div>
                  <Label htmlFor="saveName" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Setup Name
                  </Label>
                  <Input
                    id="saveName"
                    type="text"
                    placeholder="e.g. 7% to 6% Refinance"
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
                    Save Setup
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
                          Savings: {formatCurrency(item.monthlySavings)}/mo • {item.dateSaved}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleDeleteSaved(item.id)}
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

export default RefinanceCalculator;
