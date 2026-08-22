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
  Plus,
  Target,
  Award,
  Layers,
  Calculator,
  Table as TableIcon,
} from "lucide-react";
import { calculateRefinanceModule } from "@/modules/refinance/formula";
import {
  RefinanceInput,
  RefinanceOutput,
  CurrentLoanMode,
  RefinanceType,
  RefinanceGoal,
  ConsolidatedDebtItem,
  ItemizedClosingCosts,
  SavedRefinanceCalculation,
} from "@/modules/refinance/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";
import RefinanceAmortizationTable from "./RefinanceAmortizationTable";
import RefinanceCostBreakdownModal from "./RefinanceCostBreakdownModal";
import RefinanceScenarioComparer from "./RefinanceScenarioComparer";
import RefinanceAiInsightPanel from "./RefinanceAiInsightPanel";

import PrintableReportContainer from "@/components/report/PrintableReportContainer";
import ReportModal from "@/components/report/ReportModal";
import { generateRefinanceReportData } from "@/lib/report-generator/refinance-report";

// Lazy load visual charts
const RefinancePaymentBarChart = dynamic(
  () => import("../charts/RefinancePaymentBarChart").then((m) => m.RefinancePaymentBarChart),
  { ssr: false }
);

const RefinanceInterestChart = dynamic(
  () => import("../charts/RefinanceInterestChart").then((m) => m.RefinanceInterestChart),
  { ssr: false }
);

const RefinanceBreakEvenChart = dynamic(
  () => import("../charts/RefinanceBreakEvenChart").then((m) => m.RefinanceBreakEvenChart),
  { ssr: false }
);

export function RefinanceCalculator() {
  // 1. Refinance Goal State
  const [refinanceGoal, setRefinanceGoal] = useState<RefinanceGoal>("reduce-payment");

  // 2. Current Loan State
  const [currentLoanMode, setCurrentLoanMode] = useState<CurrentLoanMode>("remaining-balance");
  const [remainingBalance, setRemainingBalance] = useState<number>(250000);
  const [originalLoanAmount, setOriginalLoanAmount] = useState<number>(300000);
  const [originalLoanTermYears, setOriginalLoanTermYears] = useState<number>(30);
  const [yearsPaid, setYearsPaid] = useState<number>(5);
  const [payoffAmount, setPayoffAmount] = useState<number>(250000);
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState<number>(1800);
  const [currentInterestRate, setCurrentInterestRate] = useState<number>(7.0);

  // 3. New Loan State
  const [newLoanTermYears, setNewLoanTermYears] = useState<number>(20);
  const [newInterestRate, setNewInterestRate] = useState<number>(6.0);
  const [discountPoints, setDiscountPoints] = useState<number>(2);
  const [closingCosts, setClosingCosts] = useState<number>(1500);
  const [cashOutAmount, setCashOutAmount] = useState<number>(0);

  // 4. Cash-Out & Equity Module State
  const [homeMarketValue, setHomeMarketValue] = useState<number>(400000);
  const [maxLtvPercent, setMaxLtvPercent] = useState<number>(80);

  // 5. Debt Consolidation Module State
  const [consolidatedDebts, setConsolidatedDebts] = useState<ConsolidatedDebtItem[]>([
    { id: "debt-1", name: "Credit Card Debt", balance: 15000, interestRate: 19.9, monthlyPayment: 450 },
    { id: "debt-2", name: "Car Loan", balance: 12000, interestRate: 8.5, monthlyPayment: 320 },
  ]);

  // 6. Itemized Closing Costs State
  const [isItemizedModalOpen, setIsItemizedModalOpen] = useState<boolean>(false);
  const [itemizedCosts, setItemizedCosts] = useState<ItemizedClosingCosts>({
    applicationFee: 300,
    appraisalFee: 450,
    originationFee: 750,
    titleFee: 800,
    recordingFee: 150,
    inspectionFee: 200,
    surveyFee: 250,
    customFee: 0,
  });

  // 7. Executive Report Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // 8. Advanced Accordion State
  const [refinanceType, setRefinanceType] = useState<RefinanceType>("rate-and-term");

  // 9. Active Results View Tab: "analytics" vs "amortization"
  const [activeResultsTab, setActiveResultsTab] = useState<"analytics" | "amortization">("analytics");
  const [activeChartTab, setActiveChartTab] = useState<"payment" | "interest" | "breakeven">("payment");

  // 10. Save & Compare State
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

  // Goal Selector Click Handler - Actively updates Goal & presets smart parameters
  const handleSelectGoal = (goal: RefinanceGoal) => {
    setRefinanceGoal(goal);
    if (goal === "shorten-loan") {
      if (newLoanTermYears >= 20) {
        setNewLoanTermYears(15);
      }
    } else if (goal === "access-equity") {
      if (cashOutAmount === 0) {
        setCashOutAmount(30000);
      }
    } else if (goal === "reduce-payment") {
      if (newLoanTermYears < 20) {
        setNewLoanTermYears(30);
      }
    }
  };

  // Debt Consolidation Handlers
  const handleAddDebtItem = () => {
    const newDebt: ConsolidatedDebtItem = {
      id: `debt-${Date.now()}`,
      name: `Debt #${consolidatedDebts.length + 1}`,
      balance: 5000,
      interestRate: 15.0,
      monthlyPayment: 150,
    };
    setConsolidatedDebts([...consolidatedDebts, newDebt]);
  };

  const handleUpdateDebtItem = (id: string, field: keyof ConsolidatedDebtItem, val: any) => {
    setConsolidatedDebts(
      consolidatedDebts.map((d) => (d.id === id ? { ...d, [field]: val } : d))
    );
  };

  const handleDeleteDebtItem = (id: string) => {
    setConsolidatedDebts(consolidatedDebts.filter((d) => d.id !== id));
  };

  // Perform Calculations
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
      cashOutAmount: refinanceGoal === "access-equity" ? cashOutAmount : 0,
      homeMarketValue,
      maxLtvPercent,
      consolidatedDebts: refinanceGoal === "consolidate-debt" ? consolidatedDebts : [],
      refinanceGoal,
      itemizedCosts,
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
    homeMarketValue,
    maxLtvPercent,
    consolidatedDebts,
    refinanceGoal,
    itemizedCosts,
    refinanceType,
  ]);

  // Executive Report Data Builder
  const reportData = useMemo(() => {
    return generateRefinanceReportData(
      {
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
        homeMarketValue,
        maxLtvPercent,
        consolidatedDebts,
        refinanceGoal,
        itemizedCosts,
        refinanceType,
      },
      results
    );
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
    homeMarketValue,
    maxLtvPercent,
    consolidatedDebts,
    refinanceGoal,
    itemizedCosts,
    refinanceType,
    results,
  ]);

  const handleReset = () => {
    setRefinanceGoal("reduce-payment");
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
    setHomeMarketValue(400000);
    setMaxLtvPercent(80);
    setRefinanceType("rate-and-term");
  };

  const handleCopyResults = () => {
    const text = `Refinance Analysis:\nGoal: ${refinanceGoal}\nScore: ${results.refinanceScore}/100 (${results.refinanceRating})\nMonthly Savings: ${formatCurrency(results.monthlySavings)}\nNet Savings: ${formatCurrency(results.netSavings)}\nBreak-Even: ${results.breakEvenMonths} mos\nNew Monthly Payment: ${formatCurrency(results.newMonthlyPayment)}`;
    navigator.clipboard.writeText(text);
    setCopySuccessMsg("Refinance summary copied!");
    setTimeout(() => setCopySuccessMsg(""), 2000);
  };

  const handleShareUrl = () => {
    const params = new URLSearchParams();
    params.set("goal", refinanceGoal);
    params.set("bal", remainingBalance.toString());
    params.set("curRate", currentInterestRate.toString());
    params.set("newRate", newInterestRate.toString());
    params.set("newTerm", newLoanTermYears.toString());

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (navigator.share) {
      navigator.share({
        title: "Refinance Analysis",
        text: "Check out my loan refinance analysis on CalcPlatform",
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
      refinanceScore: results.refinanceScore,
      refinanceRating: results.refinanceRating,
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
      {/* 1. REFINANCE GOAL SELECTOR BAR */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-zinc-900 text-white p-4 rounded-2xl shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-extrabold tracking-wider text-blue-300 flex items-center gap-1.5">
            <Target className="h-4 w-4 text-blue-400" /> Select Your Primary Refinance Goal:
          </span>
          <span className="text-[11px] text-blue-200 font-sans tabular-nums hidden sm:inline">
            Tailors scoring & recommendation algorithm
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: "reduce-payment", label: "Reduce Monthly Payment" },
            { id: "reduce-interest", label: "Reduce Lifetime Interest" },
            { id: "shorten-loan", label: "Shorten Loan Duration" },
            { id: "access-equity", label: "Access Cash Equity" },
            { id: "consolidate-debt", label: "Consolidate High-Interest Debt" },
          ].map((goal) => (
            <button
              key={goal.id}
              type="button"
              onClick={() => handleSelectGoal(goal.id as RefinanceGoal)}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer ${refinanceGoal === goal.id
                  ? "bg-white text-blue-900 border-white shadow-md scale-[1.02]"
                  : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                }`}
            >
              {goal.label}
            </button>
          ))}
        </div>
      </div>

      {/* Global Toolbar Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-800/80 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700/80 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            Selected Goal:
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase">
            {refinanceGoal.replace("-", " ")}
          </span>
        </div>

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
            className="h-8 text-xs gap-1.5 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 cursor-pointer"
          >
            <Copy className="h-3.5 w-3.5 text-blue-500" /> Copy
          </Button>



          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsReportModalOpen(true)}
            className="h-8 text-xs gap-1.5 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-purple-500" /> Print / PDF
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => setIsSaveModalOpen(true)}
            className="h-8 text-xs gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
          >
            <Bookmark className="h-3.5 w-3.5" /> Save
          </Button>
        </div>
      </div>

      {/* 2-COLUMN INPUTS CARD (Current Loan vs New Loan) */}
      <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
        <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Refinance Side-by-Side Setup
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT COLUMN: CURRENT LOAN */}
            <div className="space-y-4 p-4 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80">
              <h3 className="font-extrabold text-sm text-blue-600 dark:text-blue-400 border-b border-zinc-200 dark:border-zinc-700 pb-2">
                Current Loan
              </h3>

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
                        className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="currentMonthlyPayment" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Monthly Payment ($)
                    </Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                      <Input
                        id="currentMonthlyPayment"
                        type="number"
                        min={0}
                        step={50}
                        value={currentMonthlyPayment}
                        onChange={(e) => setCurrentMonthlyPayment(Math.max(0, Number(e.target.value)))}
                        className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentLoanMode === "original-amount" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="originalLoanAmount" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Original Loan Amount ($)
                    </Label>
                    <Input
                      id="originalLoanAmount"
                      type="number"
                      min={0}
                      step={5000}
                      value={originalLoanAmount}
                      onChange={(e) => setOriginalLoanAmount(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                    />
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
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
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
                        className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentLoanMode === "payoff-amount" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="payoffAmount" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Payoff Amount ($)
                    </Label>
                    <Input
                      id="payoffAmount"
                      type="number"
                      min={0}
                      step={5000}
                      value={payoffAmount}
                      onChange={(e) => setPayoffAmount(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                    />
                  </div>
                </div>
              )}

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
                    className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: NEW LOAN */}
            <div className="space-y-4 p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60">
              <h3 className="font-extrabold text-sm text-blue-900 dark:text-blue-100 border-b border-blue-200 dark:border-blue-900/60 pb-2">
                New Refinanced Loan
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
                    className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
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
                      className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
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
                    className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                  />
                </div>
              </div>

              {/* Itemized Closing Costs Button */}
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="closingCosts" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Closing Costs & Fees ($)
                  </Label>
                  <button
                    type="button"
                    onClick={() => setIsItemizedModalOpen(true)}
                    className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Calculator className="h-3 w-3" /> Itemize Fees
                  </button>
                </div>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                  <Input
                    id="closingCosts"
                    type="number"
                    min={0}
                    step={250}
                    value={results.itemizedTotalCosts > 0 ? results.itemizedTotalCosts : closingCosts}
                    onChange={(e) => setClosingCosts(Math.max(0, Number(e.target.value)))}
                    className="pl-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC GOAL-SPECIFIC MODULES */}

          {/* GOAL 1: SHORTEN LOAN DURATION MODULE */}
          {refinanceGoal === "shorten-loan" && (
            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-3">
              <div className="flex items-center justify-between border-b border-blue-200 dark:border-blue-900/60 pb-2">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-blue-900 dark:text-blue-200 flex items-center gap-1.5">Shorten Loan Duration Module
                </h4>
                <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-300">
                  Goal: Pay off debt years earlier
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div>
                  <Label htmlFor="shortenTermYears" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Target New Term (years)
                  </Label>
                  <Input
                    id="shortenTermYears"
                    type="number"
                    min={1}
                    max={50}
                    value={newLoanTermYears}
                    onChange={(e) => setNewLoanTermYears(Math.max(1, Number(e.target.value)))}
                    className="mt-1 bg-white dark:bg-zinc-900 font-sans tabular-nums text-xs"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-wrap gap-2 items-center">
                  <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
                  {[10, 15, 20].map((term) => (
                    <button
                      key={`preset-term-${term}`}
                      type="button"
                      onClick={() => setNewLoanTermYears(term)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors border cursor-pointer ${newLoanTermYears === term
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-blue-400"
                        }`}
                    >
                      {term} Years
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-sans tabular-nums">
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Current Remaining</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    {Math.round(results.currentRemainingMonths / 12)} Yrs ({results.currentRemainingMonths} mos)
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">New Refinanced Term</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {newLoanTermYears} Yrs ({newLoanTermYears * 12} mos)
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Time Saved</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {Math.max(0, Math.round(results.currentRemainingMonths / 12 - newLoanTermYears))} Yrs ({Math.max(0, results.currentRemainingMonths - newLoanTermYears * 12)} mos)
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Lifetime Interest Saved</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">{formatCurrency(results.interestSaved)}</span>
                </div>
              </div>
            </div>
          )}

          {/* GOAL 2: REDUCE MONTHLY PAYMENT MODULE */}
          {refinanceGoal === "reduce-payment" && (
            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-900/60 pb-2">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">Reduce Monthly Payment Module
                </h4>
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                  Goal: Maximize monthly out-of-pocket cash flow
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-sans tabular-nums">
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Current Monthly Payment</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(results.currentMonthlyPayment)}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">New Monthly Payment</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{formatCurrency(results.newMonthlyPayment)}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Monthly Out-of-Pocket Savings</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(results.monthlySavings)} / mo ({results.monthlySavingsPercent}%)</span>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Annual Cash Saved</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">{formatCurrency(results.monthlySavings * 12)} / yr</span>
                </div>
              </div>
            </div>
          )}

          {/* GOAL 3: REDUCE LIFETIME INTEREST MODULE */}
          {refinanceGoal === "reduce-interest" && (
            <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 space-y-3">
              <div className="flex items-center justify-between border-b border-purple-200 dark:border-purple-900/60 pb-2">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-purple-900 dark:text-purple-200 flex items-center gap-1.5">Reduce Lifetime Interest Module
                </h4>
                <span className="text-[11px] font-semibold text-purple-700 dark:text-purple-300">
                  Goal: Minimize total borrowing cost paid to lender
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-sans tabular-nums">
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Current Remaining Interest</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{formatCurrency(results.currentRemainingInterest)}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">New Loan Total Interest</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{formatCurrency(results.newLoanTotalInterest)}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Total Interest Saved</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(results.interestSaved)} ({results.interestReductionPercent}%)</span>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Net Lifetime Benefit</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">{formatCurrency(results.netSavings)}</span>
                </div>
              </div>
            </div>
          )}

          {/* GOAL 4: CASH-OUT REFINANCE EQUITY MODULE */}
          {refinanceGoal === "access-equity" && (
            <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/60 space-y-3">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-purple-900 dark:text-purple-200">
                Cash-Out Refinance Equity Module
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="homeMarketValue" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Home Market Value ($)
                  </Label>
                  <Input
                    id="homeMarketValue"
                    type="number"
                    min={0}
                    step={10000}
                    value={homeMarketValue}
                    onChange={(e) => setHomeMarketValue(Math.max(0, Number(e.target.value)))}
                    className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="cashOutAmount" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Desired Cash Out Amount ($)
                  </Label>
                  <Input
                    id="cashOutAmount"
                    type="number"
                    min={0}
                    step={5000}
                    value={cashOutAmount}
                    onChange={(e) => setCashOutAmount(Math.max(0, Number(e.target.value)))}
                    className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="maxLtvPercent" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Max LTV Limit (%)
                  </Label>
                  <Input
                    id="maxLtvPercent"
                    type="number"
                    min={50}
                    max={100}
                    value={maxLtvPercent}
                    onChange={(e) => setMaxLtvPercent(Math.max(50, Number(e.target.value)))}
                    className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-sans tabular-nums">
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Available Equity</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">{formatCurrency(results.availableEquity)}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Max Borrowable</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{formatCurrency(results.maxBorrowableAmount)}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Cash Received</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(results.cashReceived)}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">New LTV Ratio</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{results.newLtvRatio}%</span>
                </div>
              </div>
            </div>
          )}

          {/* GOAL 5: DEBT CONSOLIDATION MODULE */}
          {refinanceGoal === "consolidate-debt" && (
            <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/60 space-y-3">
              <div className="flex items-center justify-between border-b border-teal-200 dark:border-teal-900/60 pb-2">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-teal-900 dark:text-teal-200">
                  Debt Consolidation Refinance Module
                </h4>
                <Button type="button" size="sm" onClick={handleAddDebtItem} className="h-7 text-xs bg-teal-600 text-white gap-1 font-bold cursor-pointer">
                  <Plus className="h-3 w-3" /> Add Debt
                </Button>
              </div>

              <div className="space-y-2">
                {consolidatedDebts.map((debt) => (
                  <div key={debt.id} className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                    <Input
                      type="text"
                      value={debt.name}
                      onChange={(e) => handleUpdateDebtItem(debt.id, "name", e.target.value)}
                      className="h-8 text-xs font-medium"
                    />
                    <Input
                      type="number"
                      placeholder="Balance ($)"
                      value={debt.balance}
                      onChange={(e) => handleUpdateDebtItem(debt.id, "balance", Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums"
                    />
                    <Input
                      type="number"
                      placeholder="Rate (%)"
                      value={debt.interestRate}
                      onChange={(e) => handleUpdateDebtItem(debt.id, "interestRate", Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums"
                    />
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Payment ($)"
                        value={debt.monthlyPayment}
                        onChange={(e) => handleUpdateDebtItem(debt.id, "monthlyPayment", Number(e.target.value))}
                        className="h-8 text-xs font-sans tabular-nums"
                      />
                      <button type="button" onClick={() => handleDeleteDebtItem(debt.id)} className="text-zinc-400 hover:text-red-500 cursor-pointer">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-sans tabular-nums">
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Total Consolidating Debt</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">{formatCurrency(results.totalConsolidatedDebt)}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Blended Interest Rate</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{results.blendedInterestRate}%</span>
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-zinc-800">
                  <span className="text-zinc-500 block">Consolidation Monthly Savings</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(results.debtConsolidationMonthlySavings)}/mo</span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="h-9 text-xs font-semibold border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset Inputs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 3. REFINANCE SCORE & RATING GAUGE CARD */}
      <Card className="border border-blue-200 dark:border-blue-900 bg-gradient-to-r from-blue-900 via-indigo-900 to-zinc-900 text-white shadow-md">
        <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-amber-400" />
              <h3 className="text-lg font-extrabold text-white">
                Refinance Opportunity Score
              </h3>
            </div>
            <p className="text-xs text-blue-200 max-w-md">
              Score evaluated out of 100 based on monthly payment reduction, net lifetime savings, break-even speed, and goal alignment.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-xs">
            <div className="text-4xl font-extrabold font-sans tabular-nums text-white tracking-tight">
              {results.refinanceScore}
              <span className="text-xs text-blue-300 font-sans font-normal block text-center">/ 100</span>
            </div>
            <div className="border-l border-white/20 pl-4">
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${results.refinanceRating === "Excellent"
                  ? "bg-emerald-500 text-white shadow-md"
                  : results.refinanceRating === "Good"
                    ? "bg-blue-500 text-white"
                    : results.refinanceRating === "Average"
                      ? "bg-amber-500 text-white"
                      : "bg-rose-500 text-white"
                }`}>
                {results.refinanceRating} Rating
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. AI INSIGHT PANEL */}
      <RefinanceAiInsightPanel
        insights={results.aiInsights}
        score={results.refinanceScore}
        rating={results.refinanceRating}
      />

      {/* 5. TABBED RESULTS DASHBOARD: Analytics vs Amortization Schedule */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700/80">
          <button
            type="button"
            onClick={() => setActiveResultsTab("analytics")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeResultsTab === "analytics"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
          >
            <BarChart3 className="h-4 w-4" /> Financial Summary & Visual Analytics
          </button>
          <button
            type="button"
            onClick={() => setActiveResultsTab("amortization")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeResultsTab === "amortization"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
          >
            <TableIcon className="h-4 w-4" /> Side-by-Side Amortization Schedule
          </button>
        </div>

        {activeResultsTab === "analytics" ? (
          <div className="space-y-6">
            {/* 5 Analysis Modules (A, B, C, D, E) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                    A. Monthly Payment Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Current Payment:</span>
                    <span className="font-bold font-sans tabular-nums text-zinc-900 dark:text-zinc-100">{formatCurrency(results.currentMonthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">New Payment:</span>
                    <span className="font-bold font-sans tabular-nums text-blue-600 dark:text-blue-400">{formatCurrency(results.newMonthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 font-bold">
                    <span className="text-zinc-700 dark:text-zinc-300">Monthly Savings:</span>
                    <span className="font-sans tabular-nums text-emerald-600 dark:text-emerald-400 text-sm">
                      {formatCurrency(results.monthlySavings)} ({results.monthlySavingsPercent}%)
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase font-bold tracking-wider text-purple-600 dark:text-purple-400">
                    B. Lifetime Interest Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Current Remaining Interest:</span>
                    <span className="font-bold font-sans tabular-nums text-amber-600 dark:text-amber-400">{formatCurrency(results.currentRemainingInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">New Loan Interest:</span>
                    <span className="font-bold font-sans tabular-nums text-blue-600 dark:text-blue-400">{formatCurrency(results.newLoanTotalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 font-bold">
                    <span className="text-zinc-700 dark:text-zinc-300">Total Interest Saved:</span>
                    <span className="font-sans tabular-nums text-emerald-600 dark:text-emerald-400 text-sm">{formatCurrency(results.interestSaved)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400">
                    C. Refinance Upfront Costs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Closing Costs & Fees:</span>
                    <span className="font-bold font-sans tabular-nums text-zinc-900 dark:text-zinc-100">{formatCurrency(results.closingCosts)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Points Cost:</span>
                    <span className="font-bold font-sans tabular-nums text-zinc-900 dark:text-zinc-100">{formatCurrency(results.pointsCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 font-bold">
                    <span className="text-zinc-700 dark:text-zinc-300">Total Upfront Cost:</span>
                    <span className="font-sans tabular-nums text-purple-600 dark:text-purple-400 text-sm">{formatCurrency(results.closingCosts + results.pointsCost)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
                    D. Break-Even Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-sans tabular-nums">
                    {results.breakEvenMonths < 900 ? `${results.breakEvenMonths} Months (${results.breakEvenYears} Yrs)` : "No Break-Even"}
                  </div>
                  <p className="text-zinc-500 leading-relaxed text-[11px]">
                    After {results.breakEvenMonths} months ({results.breakEvenYears} years), your cumulative monthly savings exceed your refinancing costs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                    E. Net Lifetime Financial Benefit
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums">
                    {formatCurrency(results.netSavings)}
                  </div>
                  <p className="text-zinc-500 leading-relaxed text-[11px]">
                    Net lifetime savings after subtracting all upfront closing costs and points.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Visual Analytics Container */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2.5 gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Visual Analytics & Break-Even Timeline Chart
                </h3>
                <div className="flex flex-wrap items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                  <button
                    type="button"
                    onClick={() => setActiveChartTab("payment")}
                    className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${activeChartTab === "payment"
                        ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-zinc-500"
                      }`}
                  >
                    <BarChart3 className="h-3 w-3" /> Monthly Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveChartTab("interest")}
                    className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${activeChartTab === "interest"
                        ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-zinc-500"
                      }`}
                  >
                    <PieIcon className="h-3 w-3" /> Total Interest
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveChartTab("breakeven")}
                    className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${activeChartTab === "breakeven"
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
        ) : (
          /* Side-by-Side Amortization Schedule Tab */
          <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Monthly Side-by-Side Amortization Comparison Schedule
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500">
                Month-by-month principal, interest, and balance simulation comparing current loan vs. new refinanced loan
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <RefinanceAmortizationTable schedule={results.amortizationComparisonSchedule} />
            </CardContent>
          </Card>
        )}
      </div>

      {/* 6. SCENARIO COMPARISON MATRIX */}
      {savedCalculations.length > 0 && (
        <RefinanceScenarioComparer
          scenarios={savedCalculations}
          onDelete={handleDeleteSaved}
        />
      )}

      {/* Itemized Closing Costs Breakdown Modal */}
      <RefinanceCostBreakdownModal
        isOpen={isItemizedModalOpen}
        onClose={() => setIsItemizedModalOpen(false)}
        costs={itemizedCosts}
        onChange={(updated) => {
          setItemizedCosts(updated);
          const sum =
            (updated.applicationFee ?? 0) +
            (updated.appraisalFee ?? 0) +
            (updated.originationFee ?? 0) +
            (updated.titleFee ?? 0) +
            (updated.recordingFee ?? 0) +
            (updated.inspectionFee ?? 0) +
            (updated.surveyFee ?? 0) +
            (updated.customFee ?? 0);
          setClosingCosts(sum);
        }}
      />

      {/* Save Setup Dialog Modal */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-lg w-full p-6 space-y-4 relative">
            <button
              type="button"
              onClick={() => setIsSaveModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Bookmark className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">
                  Save Refinance Calculation
                </h3>
                <p className="text-xs text-zinc-500">
                  Store setup locally to compare side-by-side with other options
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
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm block font-sans tabular-nums">
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
                    placeholder="e.g. 20-Yr Refinance Option A"
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
                    className="h-8 text-xs cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                    Save Setup
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Executive Report Modal Preview */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportData={reportData}
      />
    </div>
  );
}

export default RefinanceCalculator;
