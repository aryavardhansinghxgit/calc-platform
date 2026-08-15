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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  Copy,
  Printer,
  FileText,
  Calendar,
  Layers,
  CheckSquare,
  Square,
  Eye,
  Download,
} from "lucide-react";
import {
  calculateIncomeAffordability,
  calculateBudgetAffordability,
} from "@/modules/house-affordability/formula";
import {
  IncomeAffordabilityInput,
  IncomeAffordabilityOutput,
  BudgetAffordabilityInput,
  BudgetAffordabilityOutput,
  DtiOption,
  DownPaymentType,
  SavedAffordabilityCalculation,
} from "@/modules/house-affordability/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";
import ReportModal from "@/components/report/ReportModal";
import { generateHouseAffordabilityReportData } from "@/lib/report-generator/house-affordability-report";

// Lazy load visual charts
const HousingCostPieChart = dynamic(
  () => import("../charts/HousingCostPieChart").then((m) => m.HousingCostPieChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-sans tabular-nums">
        Loading housing cost pie chart...
      </div>
    ),
  }
);

const AffordabilityBarChart = dynamic(
  () => import("../charts/AffordabilityBarChart").then((m) => m.AffordabilityBarChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-sans tabular-nums">
        Loading affordability bar chart...
      </div>
    ),
  }
);

export function HouseAffordabilityCalculator() {
  // Active Calculator Selector: "income" vs "budget"
  const [activeCalc, setActiveCalc] = useState<"income" | "budget">("income");

  // ==========================================
  // CALCULATOR 1: INCOME-BASED INPUTS
  // ==========================================
  const [annualIncome, setAnnualIncome] = useState<number>(120000);
  const [loanTermYears1, setLoanTermYears1] = useState<number>(30);
  const [interestRate1, setInterestRate1] = useState<number>(6.5);
  const [monthlyDebt, setMonthlyDebt] = useState<number>(500);
  const [downPayment1, setDownPayment1] = useState<number>(20);
  const [downPaymentType1, setDownPaymentType1] = useState<DownPaymentType>("percent");
  const [propertyTaxRate1, setPropertyTaxRate1] = useState<number>(1.2);
  const [hoaFeeRate1, setHoaFeeRate1] = useState<number>(0.5);
  const [insuranceRate1, setInsuranceRate1] = useState<number>(0.5);
  const [dtiOption, setDtiOption] = useState<DtiOption>("conventional");
  const [customDtiPercent, setCustomDtiPercent] = useState<number>(36);

  // ==========================================
  // CALCULATOR 2: MONTHLY BUDGET-BASED INPUTS
  // ==========================================
  const [housingBudget, setHousingBudget] = useState<number>(3500);
  const [loanTermYears2, setLoanTermYears2] = useState<number>(30);
  const [interestRate2, setInterestRate2] = useState<number>(6.5);
  const [downPayment2, setDownPayment2] = useState<number>(20);
  const [downPaymentType2, setDownPaymentType2] = useState<DownPaymentType>("percent");
  const [includeTaxesFees, setIncludeTaxesFees] = useState<boolean>(true);
  const [propertyTaxRate2, setPropertyTaxRate2] = useState<number>(1.2);
  const [hoaFeeRate2, setHoaFeeRate2] = useState<number>(0.5);
  const [insuranceRate2, setInsuranceRate2] = useState<number>(0.5);
  const [maintenanceRate2, setMaintenanceRate2] = useState<number>(1.0);

  // UI State: Full Schedule Modal, Saved Calculations, Messages
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [saveName, setSaveName] = useState<string>("");
  const [savedCalculations, setSavedCalculations] = useState<SavedAffordabilityCalculation[]>([]);
  const [copySuccessMsg, setCopySuccessMsg] = useState<string>("");
  const [shareSuccessMsg, setShareSuccessMsg] = useState<string>("");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>("");

  // Load URL query params & saved calculations on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (params.has("income")) setAnnualIncome(Number(params.get("income")));
        if (params.has("rate")) setInterestRate1(Number(params.get("rate")));
        if (params.has("term")) setLoanTermYears1(Number(params.get("term")));
        if (params.has("debt")) setMonthlyDebt(Number(params.get("debt")));

        const stored = localStorage.getItem("calcplatform_saved_house_affordability");
        if (stored) setSavedCalculations(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Perform Calculations
  const incomeResults: IncomeAffordabilityOutput = useMemo(() => {
    return calculateIncomeAffordability({
      annualIncome,
      loanTermYears: loanTermYears1,
      interestRate: interestRate1,
      monthlyDebt,
      downPayment: downPayment1,
      downPaymentType: downPaymentType1,
      propertyTaxRate: propertyTaxRate1,
      hoaFeeRate: hoaFeeRate1,
      insuranceRate: insuranceRate1,
      dtiOption,
      customDtiPercent,
    });
  }, [
    annualIncome,
    loanTermYears1,
    interestRate1,
    monthlyDebt,
    downPayment1,
    downPaymentType1,
    propertyTaxRate1,
    hoaFeeRate1,
    insuranceRate1,
    dtiOption,
    customDtiPercent,
  ]);

  const budgetResults: BudgetAffordabilityOutput = useMemo(() => {
    return calculateBudgetAffordability({
      housingBudget,
      loanTermYears: loanTermYears2,
      interestRate: interestRate2,
      downPayment: downPayment2,
      downPaymentType: downPaymentType2,
      includeTaxesFees,
      propertyTaxRate: propertyTaxRate2,
      hoaFeeRate: hoaFeeRate2,
      insuranceRate: insuranceRate2,
      maintenanceRate: maintenanceRate2,
    });
  }, [
    housingBudget,
    loanTermYears2,
    interestRate2,
    downPayment2,
    downPaymentType2,
    includeTaxesFees,
    propertyTaxRate2,
    hoaFeeRate2,
    insuranceRate2,
    maintenanceRate2,
  ]);

  // Handle Reset
  const handleResetIncome = () => {
    setAnnualIncome(120000);
    setLoanTermYears1(30);
    setInterestRate1(6.5);
    setMonthlyDebt(500);
    setDownPayment1(20);
    setDownPaymentType1("percent");
    setPropertyTaxRate1(1.2);
    setHoaFeeRate1(0.5);
    setInsuranceRate1(0.5);
    setDtiOption("conventional");
    setCustomDtiPercent(36);
  };

  const handleResetBudget = () => {
    setHousingBudget(3500);
    setLoanTermYears2(30);
    setInterestRate2(6.5);
    setDownPayment2(20);
    setDownPaymentType2("percent");
    setIncludeTaxesFees(true);
    setPropertyTaxRate2(1.2);
    setHoaFeeRate2(0.5);
    setInsuranceRate2(0.5);
    setMaintenanceRate2(1.0);
  };

  // Copy Results to Clipboard
  const handleCopyResults = () => {
    const text =
      activeCalc === "income"
        ? `House Affordability (Income-Based):\nMax Home Price: ${formatCurrency(incomeResults.maxHomePrice)}\nMax Loan Amount: ${formatCurrency(incomeResults.maxLoanAmount)}\nMonthly Housing Payment: ${formatCurrency(incomeResults.totalMonthlyHousingCost)}\nFront-End DTI: ${incomeResults.frontEndRatio}%\nBack-End DTI: ${incomeResults.backEndRatio}%`
        : `House Affordability (Budget-Based):\nMax Home Price: ${formatCurrency(budgetResults.maxHomePrice)}\nMax Loan Amount: ${formatCurrency(budgetResults.maxLoanAmount)}\nTotal Monthly Housing: ${formatCurrency(budgetResults.totalMonthlyHousingCost)}`;

    navigator.clipboard.writeText(text);
    setCopySuccessMsg("Results copied to clipboard!");
    setTimeout(() => setCopySuccessMsg(""), 2000);
  };

  // Executive Report Data
  const reportData = useMemo(() => {
    return generateHouseAffordabilityReportData(
      { annualIncome, monthlyDebt, downPayment: downPayment1 },
      {
        maxHomePrice: activeCalc === "income" ? incomeResults.maxHomePrice : budgetResults.maxHomePrice,
        maxLoanAmount: activeCalc === "income" ? incomeResults.maxLoanAmount : budgetResults.maxLoanAmount,
        maxMonthlyPayment: activeCalc === "income" ? incomeResults.totalMonthlyHousingCost : budgetResults.totalMonthlyHousingCost,
        frontEndDti: activeCalc === "income" ? incomeResults.frontEndRatio : 28,
        backEndDti: activeCalc === "income" ? incomeResults.backEndRatio : 36,
      }
    );
  }, [activeCalc, annualIncome, monthlyDebt, downPayment1, incomeResults, budgetResults]);

  // Print & PDF Export
  const handlePrint = () => {
    setIsReportModalOpen(true);
  };

  // Export Amortization Schedule CSV
  const handleExportCsv = () => {
    const schedule = incomeResults.fullSchedule || [];
    if (!schedule || schedule.length === 0) return;

    const headers = ["Month", "Date", "Payment", "Principal Paid", "Interest Paid", "Remaining Balance"];
    const rows = schedule.map((row) => [
      row.month,
      `"${row.date}"`,
      row.payment.toFixed(2),
      row.principal.toFixed(2),
      row.interest.toFixed(2),
      row.balance.toFixed(2),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `house_affordability_amortization_schedule.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareUrl = () => {
    const params = new URLSearchParams();
    params.set("income", annualIncome.toString());
    params.set("rate", interestRate1.toString());
    params.set("term", loanTermYears1.toString());
    params.set("debt", monthlyDebt.toString());

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    if (navigator.share) {
      navigator.share({
        title: "House Affordability Calculation",
        text: "Check out my house affordability calculation on CalcPlatform",
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      setShareSuccessMsg("Shareable URL copied to clipboard!");
      setTimeout(() => setShareSuccessMsg(""), 2000);
    }
  };

  // Save Setup
  const handleSaveCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    const newSave: SavedAffordabilityCalculation = {
      id: `afford-${Date.now()}`,
      name: saveName.trim() || `Affordability ($${annualIncome.toLocaleString()})`,
      dateSaved: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      incomeInputs: { annualIncome, loanTermYears: loanTermYears1, interestRate: interestRate1, monthlyDebt },
      maxHomePrice: activeCalc === "income" ? incomeResults.maxHomePrice : budgetResults.maxHomePrice,
      monthlyPayment: activeCalc === "income" ? incomeResults.totalMonthlyHousingCost : budgetResults.totalMonthlyHousingCost,
    };

    const updated = [newSave, ...savedCalculations].slice(0, 50);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("calcplatform_saved_house_affordability", JSON.stringify(updated));
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

  const handleDeleteSavedCalculation = (id: string) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("calcplatform_saved_house_affordability", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Main Mode Switcher: Calculator 1 vs Calculator 2 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-800/80 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700/80 shadow-xs">
        <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveCalc("income")}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeCalc === "income"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            1. Affordability Based on Income
          </button>
          <button
            type="button"
            onClick={() => setActiveCalc("budget")}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeCalc === "budget"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            2. Affordability Based on Monthly Budget
          </button>
        </div>

        {/* Global Toolbar Actions */}
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

      {/* ========================================================================= */}
      {/* CALCULATOR 1: AFFORDABILITY BASED ON INCOME                               */}
      {/* ========================================================================= */}
      {activeCalc === "income" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Inputs Panel (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="border border-zinc-200 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900">
              <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  How Much House Can I Afford?
                </CardTitle>
                <CardDescription className="text-xs text-zinc-500">
                  Estimate maximum purchase price based on household income & DTI ratios
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-xs">
                {/* 1. Annual Household Income */}
                <div>
                  <Label htmlFor="annualIncome" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Annual Household Income ($)
                  </Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      id="annualIncome"
                      type="number"
                      min={0}
                      step={5000}
                      value={annualIncome}
                      onChange={(e) => setAnnualIncome(Math.max(0, Number(e.target.value)))}
                      className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                    />
                  </div>
                </div>

                {/* 2. Loan Term & Interest Rate */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="loanTermYears1" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Mortgage Loan Term
                    </Label>
                    <select
                      id="loanTermYears1"
                      value={loanTermYears1}
                      onChange={(e) => setLoanTermYears1(Number(e.target.value))}
                      className="mt-1 w-full h-9 rounded-md bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs px-2 text-zinc-900 dark:text-zinc-100 font-sans tabular-nums"
                    >
                      <option value={10}>10 Years</option>
                      <option value={15}>15 Years</option>
                      <option value={20}>20 Years</option>
                      <option value={25}>25 Years</option>
                      <option value={30}>30 Years</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="interestRate1" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Interest Rate (%)
                    </Label>
                    <div className="relative mt-1">
                      <Percent className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                      <Input
                        id="interestRate1"
                        type="number"
                        step={0.1}
                        min={0}
                        max={100}
                        value={interestRate1}
                        onChange={(e) => setInterestRate1(Math.max(0, Number(e.target.value)))}
                        className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Monthly Debt Payments */}
                <div>
                  <Label htmlFor="monthlyDebt" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Monthly Debt Payments ($)
                  </Label>
                  <span className="text-[10px] text-zinc-400 block mb-1">
                    Existing debts, credit card minimums, student & auto loans
                  </span>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      id="monthlyDebt"
                      type="number"
                      min={0}
                      step={100}
                      value={monthlyDebt}
                      onChange={(e) => setMonthlyDebt(Math.max(0, Number(e.target.value)))}
                      className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                    />
                  </div>
                </div>

                {/* 4. Down Payment with Type Toggle */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="downPayment1" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Down Payment
                    </Label>
                    <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-md text-[10px]">
                      <button
                        type="button"
                        onClick={() => setDownPaymentType1("percent")}
                        className={`px-1.5 py-0.5 rounded ${
                          downPaymentType1 === "percent"
                            ? "bg-white dark:bg-zinc-700 font-bold text-blue-600 dark:text-blue-400 shadow-2xs"
                            : "text-zinc-500"
                        }`}
                      >
                        %
                      </button>
                      <button
                        type="button"
                        onClick={() => setDownPaymentType1("amount")}
                        className={`px-1.5 py-0.5 rounded ${
                          downPaymentType1 === "amount"
                            ? "bg-white dark:bg-zinc-700 font-bold text-blue-600 dark:text-blue-400 shadow-2xs"
                            : "text-zinc-500"
                        }`}
                      >
                        $
                      </button>
                    </div>
                  </div>
                  <Input
                    id="downPayment1"
                    type="number"
                    min={0}
                    step={downPaymentType1 === "percent" ? 1 : 5000}
                    value={downPayment1}
                    onChange={(e) => setDownPayment1(Math.max(0, Number(e.target.value)))}
                    className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                  />
                </div>

                {/* 5. Property Tax, HOA, Home Insurance */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="propertyTaxRate1" className="text-[10px] text-zinc-600 dark:text-zinc-400 font-medium">
                      Property Tax (%/yr)
                    </Label>
                    <Input
                      id="propertyTaxRate1"
                      type="number"
                      step={0.1}
                      min={0}
                      value={propertyTaxRate1}
                      onChange={(e) => setPropertyTaxRate1(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hoaFeeRate1" className="text-[10px] text-zinc-600 dark:text-zinc-400 font-medium">
                      HOA Fee (%/yr)
                    </Label>
                    <Input
                      id="hoaFeeRate1"
                      type="number"
                      step={0.1}
                      min={0}
                      value={hoaFeeRate1}
                      onChange={(e) => setHoaFeeRate1(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insuranceRate1" className="text-[10px] text-zinc-600 dark:text-zinc-400 font-medium">
                      Insurance (%/yr)
                    </Label>
                    <Input
                      id="insuranceRate1"
                      type="number"
                      step={0.1}
                      min={0}
                      value={insuranceRate1}
                      onChange={(e) => setInsuranceRate1(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                    />
                  </div>
                </div>

                {/* 6. Debt-To-Income (DTI) Ratio Selector */}
                <div className="space-y-1.5 pt-1">
                  <Label htmlFor="dtiOption" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Debt-To-Income (DTI) Rule Option
                  </Label>
                  <select
                    id="dtiOption"
                    value={dtiOption}
                    onChange={(e) => setDtiOption(e.target.value as DtiOption)}
                    className="w-full h-9 rounded-md bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs px-2 text-zinc-900 dark:text-zinc-100 font-semibold"
                  >
                    <option value="conventional">Conventional Loan (28/36 Rule)</option>
                    <option value="fha">FHA Loan (31/43 Rule)</option>
                    <option value="va">VA Loan (41% Back-End Rule)</option>
                    <option value="custom">Custom Ratio</option>
                  </select>

                  {dtiOption === "custom" && (
                    <div className="pt-2">
                      <Label htmlFor="customDtiPercent" className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        Custom DTI Ratio Limit (%)
                      </Label>
                      <select
                        id="customDtiPercent"
                        value={customDtiPercent}
                        onChange={(e) => setCustomDtiPercent(Number(e.target.value))}
                        className="mt-1 w-full h-8 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs px-2 text-zinc-900 dark:text-zinc-100"
                      >
                        {[10, 15, 20, 25, 30, 35, 40, 45, 50].map((val) => (
                          <option key={val} value={val}>
                            {val}% DTI ({val <= 25 ? "Conservative" : val <= 35 ? "Moderate" : val <= 45 ? "Aggressive" : "High Risk"})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetIncome}
                    className="w-full h-9 text-xs font-semibold border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900"
                  >
                    <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset Inputs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Results Dashboard (Col 7) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Large Card: Maximum Affordable Home Price */}
            <Card className="border border-blue-100 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950/30 shadow-md">
              <CardContent className="p-6 space-y-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                    Maximum Affordable Home Price
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums mt-2 tracking-tight">
                    {formatCurrency(incomeResults.maxHomePrice)}
                  </div>
                </div>

                {/* Secondary Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-blue-100 dark:border-zinc-800">
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Mortgage Loan</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-blue-600 dark:text-blue-400">
                      {formatCurrency(incomeResults.maxLoanAmount)}
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Down Payment</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(incomeResults.requiredDownPayment)}
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Monthly Mortgage (P&I)</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-zinc-900 dark:text-zinc-100">
                      {formatCurrency(incomeResults.monthlyMortgagePmt)}
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Total Housing Cost</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-purple-600 dark:text-purple-400">
                      {formatCurrency(incomeResults.totalMonthlyHousingCost)}
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Monthly Taxes</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-amber-600 dark:text-amber-400">
                      {formatCurrency(incomeResults.monthlyTax)}
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Monthly Insurance</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-teal-600 dark:text-teal-400">
                      {formatCurrency(incomeResults.monthlyInsurance)}
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Front-End Ratio</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-sky-600 dark:text-sky-400">
                      {incomeResults.frontEndRatio}%
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Back-End Ratio</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-indigo-600 dark:text-indigo-400">
                      {incomeResults.backEndRatio}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visual Charts Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-2">
                  Housing Cost Breakdown
                </h4>
                <HousingCostPieChart
                  monthlyMortgage={incomeResults.monthlyMortgagePmt}
                  monthlyTax={incomeResults.monthlyTax}
                  monthlyInsurance={incomeResults.monthlyInsurance}
                  monthlyHoa={incomeResults.monthlyHoa}
                />
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-2">
                  Affordability Budget Breakdown
                </h4>
                <AffordabilityBarChart
                  grossMonthlyIncome={annualIncome / 12}
                  monthlyDebt={monthlyDebt}
                  availableHousingBudget={incomeResults.totalMonthlyHousingCost}
                />
              </div>
            </div>

            {/* Amortization Schedule Preview (First 12 Months) */}
            <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
              <CardHeader className="pb-2 border-b border-zinc-100 dark:border-zinc-800 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Mortgage Amortization Preview (First 12 Months)
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-500">
                    Monthly principal and interest breakdown
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleExportCsv}
                    className="h-8 text-xs border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 gap-1.5 bg-white dark:bg-zinc-900 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> Export CSV
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setIsScheduleModalOpen(true)}
                    className="h-8 text-xs gap-1.5 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" /> View Full Amortization
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto max-h-72 overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 z-10 bg-zinc-100/90 dark:bg-zinc-800/90">
                      <TableRow className="border-zinc-200 dark:border-zinc-800 text-[11px]">
                        <TableHead className="py-2 font-bold">Month</TableHead>
                        <TableHead className="py-2 font-bold text-right">Payment</TableHead>
                        <TableHead className="py-2 font-bold text-right">Principal</TableHead>
                        <TableHead className="py-2 font-bold text-right">Interest</TableHead>
                        <TableHead className="py-2 font-bold text-right">Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-xs font-sans tabular-nums">
                      {incomeResults.schedulePreview.map((row) => (
                        <TableRow key={`preview-${row.month}`} className="border-zinc-100 dark:border-zinc-800/60">
                          <TableCell className="py-2 font-sans font-medium">{row.date}</TableCell>
                          <TableCell className="py-2 text-right">{formatCurrency(row.payment)}</TableCell>
                          <TableCell className="py-2 text-right text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(row.principal)}
                          </TableCell>
                          <TableCell className="py-2 text-right text-amber-600 dark:text-amber-400">
                            {formatCurrency(row.interest)}
                          </TableCell>
                          <TableCell className="py-2 text-right font-bold text-blue-600 dark:text-blue-400">
                            {formatCurrency(row.balance)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* CALCULATOR 2: AFFORDABILITY BASED ON MONTHLY BUDGET                       */
        /* ========================================================================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Inputs Panel (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="border border-zinc-200 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900">
              <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  House Affordability Based on Monthly Budget
                </CardTitle>
                <CardDescription className="text-xs text-zinc-500">
                  Estimate max purchase price from your target fixed monthly budget
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-xs">
                {/* 1. Housing Budget Per Month */}
                <div>
                  <Label htmlFor="housingBudget" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Housing Budget Per Month ($)
                  </Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      id="housingBudget"
                      type="number"
                      min={0}
                      step={100}
                      value={housingBudget}
                      onChange={(e) => setHousingBudget(Math.max(0, Number(e.target.value)))}
                      className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                    />
                  </div>
                </div>

                {/* 2. Mortgage Term & Interest Rate */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="loanTermYears2" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Mortgage Loan Term
                    </Label>
                    <select
                      id="loanTermYears2"
                      value={loanTermYears2}
                      onChange={(e) => setLoanTermYears2(Number(e.target.value))}
                      className="mt-1 w-full h-9 rounded-md bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs px-2 text-zinc-900 dark:text-zinc-100 font-sans tabular-nums"
                    >
                      <option value={10}>10 Years</option>
                      <option value={15}>15 Years</option>
                      <option value={20}>20 Years</option>
                      <option value={25}>25 Years</option>
                      <option value={30}>30 Years</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="interestRate2" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Interest Rate (%)
                    </Label>
                    <div className="relative mt-1">
                      <Percent className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                      <Input
                        id="interestRate2"
                        type="number"
                        step={0.1}
                        min={0}
                        max={100}
                        value={interestRate2}
                        onChange={(e) => setInterestRate2(Math.max(0, Number(e.target.value)))}
                        className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Down Payment with Type Toggle */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="downPayment2" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Down Payment
                    </Label>
                    <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-md text-[10px]">
                      <button
                        type="button"
                        onClick={() => setDownPaymentType2("percent")}
                        className={`px-1.5 py-0.5 rounded ${
                          downPaymentType2 === "percent"
                            ? "bg-white dark:bg-zinc-700 font-bold text-blue-600 dark:text-blue-400 shadow-2xs"
                            : "text-zinc-500"
                        }`}
                      >
                        %
                      </button>
                      <button
                        type="button"
                        onClick={() => setDownPaymentType2("amount")}
                        className={`px-1.5 py-0.5 rounded ${
                          downPaymentType2 === "amount"
                            ? "bg-white dark:bg-zinc-700 font-bold text-blue-600 dark:text-blue-400 shadow-2xs"
                            : "text-zinc-500"
                        }`}
                      >
                        $
                      </button>
                    </div>
                  </div>
                  <Input
                    id="downPayment2"
                    type="number"
                    min={0}
                    step={downPaymentType2 === "percent" ? 1 : 5000}
                    value={downPayment2}
                    onChange={(e) => setDownPayment2(Math.max(0, Number(e.target.value)))}
                    className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                  />
                </div>

                {/* 4. Checkbox: Include Taxes and Fees */}
                <div className="pt-1 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer select-none font-semibold text-zinc-800 dark:text-zinc-200">
                    <input
                      type="checkbox"
                      checked={includeTaxesFees}
                      onChange={(e) => setIncludeTaxesFees(e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-zinc-300"
                    />
                    <span>Include Property Taxes, Insurance & Fees</span>
                  </label>

                  {includeTaxesFees && (
                    <div className="grid grid-cols-2 gap-3 p-3 bg-zinc-50/80 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
                      <div>
                        <Label htmlFor="propertyTaxRate2" className="text-[10px] text-zinc-600 dark:text-zinc-400">
                          Property Tax (%/yr)
                        </Label>
                        <Input
                          id="propertyTaxRate2"
                          type="number"
                          step={0.1}
                          min={0}
                          value={propertyTaxRate2}
                          onChange={(e) => setPropertyTaxRate2(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="hoaFeeRate2" className="text-[10px] text-zinc-600 dark:text-zinc-400">
                          HOA Fee (%/yr)
                        </Label>
                        <Input
                          id="hoaFeeRate2"
                          type="number"
                          step={0.1}
                          min={0}
                          value={hoaFeeRate2}
                          onChange={(e) => setHoaFeeRate2(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="insuranceRate2" className="text-[10px] text-zinc-600 dark:text-zinc-400">
                          Insurance (%/yr)
                        </Label>
                        <Input
                          id="insuranceRate2"
                          type="number"
                          step={0.1}
                          min={0}
                          value={insuranceRate2}
                          onChange={(e) => setInsuranceRate2(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="maintenanceRate2" className="text-[10px] text-zinc-600 dark:text-zinc-400">
                          Maintenance Cost (%/yr)
                        </Label>
                        <Input
                          id="maintenanceRate2"
                          type="number"
                          step={0.1}
                          min={0}
                          value={maintenanceRate2}
                          onChange={(e) => setMaintenanceRate2(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetBudget}
                    className="w-full h-9 text-xs font-semibold border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900"
                  >
                    <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset Inputs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Results Dashboard (Col 7) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Large Card: Maximum Affordable Home Price */}
            <Card className="border border-blue-100 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950/30 shadow-md">
              <CardContent className="p-6 space-y-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                    Maximum Affordable Home Price (Budget-Based)
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums mt-2 tracking-tight">
                    {formatCurrency(budgetResults.maxHomePrice)}
                  </div>
                </div>

                {/* Secondary Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-blue-100 dark:border-zinc-800">
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Mortgage Loan</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-blue-600 dark:text-blue-400">
                      {formatCurrency(budgetResults.maxLoanAmount)}
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Down Payment</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(budgetResults.requiredDownPayment)}
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Monthly Mortgage (P&I)</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-zinc-900 dark:text-zinc-100">
                      {formatCurrency(budgetResults.monthlyMortgagePmt)}
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Total Monthly Outflow</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-purple-600 dark:text-purple-400">
                      {formatCurrency(budgetResults.totalMonthlyHousingCost)}
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Monthly Taxes</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-amber-600 dark:text-amber-400">
                      {formatCurrency(budgetResults.monthlyTax)}
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Monthly Insurance</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-teal-600 dark:text-teal-400">
                      {formatCurrency(budgetResults.monthlyInsurance)}
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Monthly HOA</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-sky-600 dark:text-sky-400">
                      {formatCurrency(budgetResults.monthlyHoa)}
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-blue-50 dark:border-zinc-700/50">
                    <span className="text-[10px] text-zinc-500 block">Maintenance Reserve</span>
                    <span className="text-sm font-bold font-sans tabular-nums text-pink-600 dark:text-pink-400">
                      {formatCurrency(budgetResults.monthlyMaintenance)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visual Charts Container */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-2">
                Monthly Housing Budget Distribution
              </h4>
              <HousingCostPieChart
                monthlyMortgage={budgetResults.monthlyMortgagePmt}
                monthlyTax={budgetResults.monthlyTax}
                monthlyInsurance={budgetResults.monthlyInsurance}
                monthlyHoa={budgetResults.monthlyHoa}
                monthlyMaintenance={budgetResults.monthlyMaintenance}
              />
            </div>
          </div>
        </div>
      )}

      {/* Full Amortization Schedule Dialog Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-4xl w-full p-6 space-y-4 relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">
                  Full Mortgage Amortization Schedule ({loanTermYears1} Years)
                </h3>
                <p className="text-xs text-zinc-500">
                  Loan Amount: {formatCurrency(incomeResults.maxLoanAmount)} @ {interestRate1}% interest rate
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleExportCsv}
                  className="h-8 text-xs border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 gap-1.5 bg-white dark:bg-zinc-900 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> Export CSV
                </Button>
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto flex-1 overflow-y-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-zinc-100/90 dark:bg-zinc-800/90">
                  <TableRow className="border-zinc-200 dark:border-zinc-800 text-xs">
                    <TableHead className="font-bold"># Month</TableHead>
                    <TableHead className="font-bold">Date</TableHead>
                    <TableHead className="font-bold text-right">Payment</TableHead>
                    <TableHead className="font-bold text-right">Principal Paid</TableHead>
                    <TableHead className="font-bold text-right">Interest Paid</TableHead>
                    <TableHead className="font-bold text-right">Remaining Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs font-sans tabular-nums">
                  {incomeResults.fullSchedule.map((row) => (
                    <TableRow key={`full-schedule-${row.month}`} className="border-zinc-100 dark:border-zinc-800/60">
                      <TableCell className="font-sans font-bold">{row.month}</TableCell>
                      <TableCell className="font-sans text-zinc-500">{row.date}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.payment)}</TableCell>
                      <TableCell className="text-right text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(row.principal)}
                      </TableCell>
                      <TableCell className="text-right text-amber-600 dark:text-amber-400">
                        {formatCurrency(row.interest)}
                      </TableCell>
                      <TableCell className="text-right font-bold text-blue-600 dark:text-blue-400">
                        {formatCurrency(row.balance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleExportCsv}
                className="h-8 text-xs border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 gap-1.5 bg-white dark:bg-zinc-900 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> Export CSV
              </Button>
              <Button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Close Schedule
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Save Setup Dialog Modal */}
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
                  Save House Affordability Calculation
                </h3>
                <p className="text-xs text-zinc-500">
                  Save your affordability setup locally to reload anytime
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
                    Max Home Price: {formatCurrency(activeCalc === "income" ? incomeResults.maxHomePrice : budgetResults.maxHomePrice)}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    ${annualIncome.toLocaleString()} annual income, {loanTermYears1} yrs @ {interestRate1}% rate
                  </span>
                </div>

                <div>
                  <Label htmlFor="saveName" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Setup Name
                  </Label>
                  <Input
                    id="saveName"
                    type="text"
                    placeholder="e.g. $120k Income Conventional Loan"
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
                        <span className="text-[10px] text-zinc-400 block font-sans tabular-nums">
                          {formatCurrency(item.maxHomePrice)} • {item.dateSaved}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
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

      {/* Executive Financial Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportData={reportData}
      />
    </div>
  );
}

export default HouseAffordabilityCalculator;
