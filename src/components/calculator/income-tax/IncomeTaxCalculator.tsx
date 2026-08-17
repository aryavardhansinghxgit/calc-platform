"use client";

import React, { useState, useMemo } from "react";
import {
  FileText,
  DollarSign,
  PieChart as PieIcon,
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
  BarChart3,
  Layers,
  Search,
  Download,
  FileSpreadsheet,
  Target,
  Zap,
  ShieldCheck,
  Percent,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import { IncomeTaxContent } from "./IncomeTaxContent";
import {
  calculateIncomeTax,
  FilingStatus,
  TaxYear,
  IncomeTaxInput,
  TaxFormStepRow,
} from "@/lib/calculator-engine/formulas/income-tax";

export function IncomeTaxCalculator() {
  // Tabs: 'quick' | 'detailed' | 'compare' | 'brackets'
  const [activeTab, setActiveTab] = useState<"quick" | "detailed" | "compare" | "brackets">("quick");

  // Core Inputs
  const [taxYear, setTaxYear] = useState<TaxYear>("2026");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [youngDependents, setYoungDependents] = useState<number>(0);
  const [otherDependents, setOtherDependents] = useState<number>(0);
  const [age, setAge] = useState<number>(30);

  // W-2 & Primary Income
  const [wagesW2, setWagesW2] = useState<number>(85000);
  const [fedTaxWithheld, setFedTaxWithheld] = useState<number>(9500);
  const [stateTaxWithheld, setStateTaxWithheld] = useState<number>(2500);
  const [localTaxWithheld, setLocalTaxWithheld] = useState<number>(0);

  // Self Employment & Business Toggle
  const [hasBusinessIncome, setHasBusinessIncome] = useState<boolean>(false);
  const [selfEmploymentIncome, setSelfEmploymentIncome] = useState<number>(0);
  const [socialSecurityIncome, setSocialSecurityIncome] = useState<number>(0);
  const [interestIncome, setInterestIncome] = useState<number>(0);
  const [ordinaryDividends, setOrdinaryDividends] = useState<number>(0);
  const [qualifiedDividends, setQualifiedDividends] = useState<number>(0);
  const [shortTermCapitalGains, setShortTermCapitalGains] = useState<number>(0);
  const [longTermCapitalGains, setLongTermCapitalGains] = useState<number>(0);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [stateLocalTaxRate, setStateLocalTaxRate] = useState<number>(0);

  // Deductions (ATL & Itemized & 2025-2028 Tax Bill Provisions)
  const [tipsIncome, setTipsIncome] = useState<number>(0);
  const [overtimeIncome, setOvertimeIncome] = useState<number>(0);
  const [carLoanInterest, setCarLoanInterest] = useState<number>(0);
  const [iraContributions, setIraContributions] = useState<number>(0);
  const [studentLoanInterest, setStudentLoanInterest] = useState<number>(0);
  const [hsaContributions, setHsaContributions] = useState<number>(0);

  const [mortgageInterest, setMortgageInterest] = useState<number>(0);
  const [realEstateTax, setRealEstateTax] = useState<number>(0);
  const [charitableDonations, setCharitableDonations] = useState<number>(0);
  const [medicalExpenses, setMedicalExpenses] = useState<number>(0);
  const [otherDeductions, setOtherDeductions] = useState<number>(0);

  // Credits & College Students 1-4
  const [childCareExpenses, setChildCareExpenses] = useState<number>(0);
  const [student1College, setStudent1College] = useState<number>(0);
  const [student2College, setStudent2College] = useState<number>(0);
  const [student3College, setStudent3College] = useState<number>(0);
  const [student4College, setStudent4College] = useState<number>(0);
  const [energyPropertyCredits, setEnergyPropertyCredits] = useState<number>(0);

  // Table Search & Modal State
  const [tableSearch, setTableSearch] = useState("");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Clear / Reset All Inputs
  const handleReset = () => {
    setTaxYear("2026");
    setFilingStatus("single");
    setYoungDependents(0);
    setOtherDependents(0);
    setAge(30);
    setWagesW2(0);
    setFedTaxWithheld(0);
    setStateTaxWithheld(0);
    setLocalTaxWithheld(0);
    setHasBusinessIncome(false);
    setSelfEmploymentIncome(0);
    setSocialSecurityIncome(0);
    setInterestIncome(0);
    setOrdinaryDividends(0);
    setQualifiedDividends(0);
    setShortTermCapitalGains(0);
    setLongTermCapitalGains(0);
    setOtherIncome(0);
    setStateLocalTaxRate(0);
    setTipsIncome(0);
    setOvertimeIncome(0);
    setCarLoanInterest(0);
    setIraContributions(0);
    setStudentLoanInterest(0);
    setHsaContributions(0);
    setMortgageInterest(0);
    setRealEstateTax(0);
    setCharitableDonations(0);
    setMedicalExpenses(0);
    setOtherDeductions(0);
    setChildCareExpenses(0);
    setStudent1College(0);
    setStudent2College(0);
    setStudent3College(0);
    setStudent4College(0);
    setEnergyPropertyCredits(0);
  };

  // Presets
  const applyPreset = (preset: "entry" | "median" | "freelancer" | "high") => {
    switch (preset) {
      case "entry":
        setFilingStatus("single");
        setWagesW2(60000);
        setFedTaxWithheld(6500);
        setSelfEmploymentIncome(0);
        setYoungDependents(0);
        break;
      case "median":
        setFilingStatus("joint");
        setWagesW2(85000);
        setFedTaxWithheld(8000);
        setSelfEmploymentIncome(0);
        setYoungDependents(2);
        break;
      case "freelancer":
        setFilingStatus("single");
        setWagesW2(30000);
        setFedTaxWithheld(3000);
        setSelfEmploymentIncome(90000);
        setYoungDependents(0);
        break;
      case "high":
        setFilingStatus("joint");
        setWagesW2(220000);
        setFedTaxWithheld(35000);
        setSelfEmploymentIncome(0);
        setYoungDependents(2);
        break;
    }
  };

  // Main Tax Calculation
  const calcInput: IncomeTaxInput = useMemo(
    () => ({
      taxYear,
      filingStatus,
      youngDependents,
      otherDependents,
      age,
      wagesW2,
      fedTaxWithheld,
      stateTaxWithheld,
      localTaxWithheld,
      hasBusinessIncome,
      selfEmploymentIncome,
      socialSecurityIncome,
      interestIncome,
      ordinaryDividends,
      qualifiedDividends,
      shortTermCapitalGains,
      longTermCapitalGains,
      otherIncome,
      stateLocalTaxRate,
      tipsIncome,
      overtimeIncome,
      carLoanInterest,
      iraContributions,
      studentLoanInterest,
      hsaContributions,
      mortgageInterest,
      realEstateTax,
      charitableDonations,
      medicalExpenses,
      otherDeductions,
      childCareExpenses,
      student1College,
      student2College,
      student3College,
      student4College,
      energyPropertyCredits,
    }),
    [
      taxYear,
      filingStatus,
      youngDependents,
      otherDependents,
      age,
      wagesW2,
      fedTaxWithheld,
      stateTaxWithheld,
      localTaxWithheld,
      hasBusinessIncome,
      selfEmploymentIncome,
      socialSecurityIncome,
      interestIncome,
      ordinaryDividends,
      qualifiedDividends,
      shortTermCapitalGains,
      longTermCapitalGains,
      otherIncome,
      stateLocalTaxRate,
      tipsIncome,
      overtimeIncome,
      carLoanInterest,
      iraContributions,
      studentLoanInterest,
      hsaContributions,
      mortgageInterest,
      realEstateTax,
      charitableDonations,
      medicalExpenses,
      otherDeductions,
      childCareExpenses,
      student1College,
      student2College,
      student3College,
      student4College,
      energyPropertyCredits,
    ]
  );

  const results = useMemo(() => calculateIncomeTax(calcInput), [calcInput]);

  const fmt = (val: number) => {
    return `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Filter Form 1040 Table
  const filteredForm1040 = useMemo(() => {
    if (!tableSearch.trim()) return results.form1040Summary;
    return results.form1040Summary.filter(
      (r) =>
        r.description.toLowerCase().includes(tableSearch.toLowerCase()) ||
        r.line.includes(tableSearch)
    );
  }, [results.form1040Summary, tableSearch]);

  // Export CSV
  const exportCSV = () => {
    const headers = ["Form 1040 Line", "Description", "Amount ($)"];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...results.form1040Summary.map((r) => [r.line, `"${r.description}"`, r.amount].join(",")),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `form_1040_tax_summary_${taxYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary
  const copySummary = () => {
    const summaryText = `US Federal Income Tax Summary (${taxYear}):
------------------------------------------------
Filing Status: ${filingStatus.toUpperCase()}
Total Gross Income: ${fmt(results.totalGrossIncome)}
Adjusted Gross Income (AGI): ${fmt(results.adjustedGrossIncome)}
Deduction (${results.deductionUsed}): ${fmt(results.effectiveDeduction)}
Taxable Income: ${fmt(results.totalTaxableIncome)}
Federal Tax Liability: ${fmt(results.totalTaxLiability)}
Federal Tax Withheld: ${fmt(results.totalTaxWithheld)}
${results.isRefund ? "ESTIMATED TAX REFUND" : "ESTIMATED TAX OWED"}: ${fmt(Math.abs(results.netTaxRefundOrOwed))}
Effective Tax Rate: ${results.effectiveTaxRate}%
Marginal Bracket: ${results.marginalTaxBracketLabel}`;

    navigator.clipboard.writeText(summaryText);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Report Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Income Tax Calculator",
      reportTitle: `US Federal Income Tax & Refund Analysis (${taxYear})`,
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: results.isRefund ? "Estimated Tax Refund" : "Estimated Tax Owed",
        value: fmt(Math.abs(results.netTaxRefundOrOwed)),
        subtitle: results.isRefund ? "Overwithheld IRS Refund" : "Amount Due to IRS",
        colorTheme: results.isRefund ? "emerald" : "rose",
      },
      { label: "Total Gross Income", value: fmt(results.totalGrossIncome), subtitle: "W-2 + 1099 Profits", colorTheme: "blue" },
      { label: "Federal Tax Liability", value: fmt(results.totalTaxLiability), subtitle: "Net After Credits", colorTheme: "purple" },
      { label: "Effective Tax Rate", value: `${results.effectiveTaxRate}%`, subtitle: `Marginal Bracket: ${results.marginalTaxBracketLabel}`, colorTheme: "amber" },
    ],
    sections: [
      {
        title: "Income & Deduction Summary",
        items: [
          { label: "Filing Status", value: filingStatus.toUpperCase() },
          { label: "Total Gross Income", value: fmt(results.totalGrossIncome), highlight: true },
          { label: "Adjusted Gross Income (AGI)", value: fmt(results.adjustedGrossIncome) },
          { label: "Deduction Selected", value: `${results.deductionUsed.toUpperCase()} (${fmt(results.effectiveDeduction)})` },
          { label: "Total Taxable Income", value: fmt(results.totalTaxableIncome) },
        ],
      },
      {
        title: "Tax Computation & Refund Status",
        items: [
          { label: "Ordinary Income Tax", value: fmt(results.ordinaryIncomeTax) },
          { label: "Self-Employment Tax (SE)", value: fmt(results.selfEmploymentTax) },
          { label: "Total Tax Credits", value: fmt(results.totalTaxCredits) },
          { label: "Total Tax Liability", value: fmt(results.totalTaxLiability), highlight: true },
          { label: "Federal Tax Withheld (Box 2)", value: fmt(results.totalTaxWithheld) },
          { label: results.isRefund ? "Estimated IRS Refund" : "Estimated Balance Owed", value: fmt(Math.abs(results.netTaxRefundOrOwed)), highlight: true },
        ],
      },
    ],
    table: {
      title: "IRS Form 1040 Step-by-Step Breakdown",
      headers: [
        { key: "line", label: "Line" },
        { key: "description", label: "Form 1040 Description" },
        { key: "amount", label: "Amount ($)" },
      ],
      rows: results.form1040Summary.map((r) => ({
        line: r.line,
        description: r.description,
        amount: fmt(r.amount),
      })),
    },
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 gap-1 text-xs">
            <Sparkles className="h-3 w-3" /> IRS Tax Engine 2026/2025
          </Badge>

          {/* Tax Year Selection */}
          <select
            value={taxYear}
            onChange={(e) => setTaxYear(e.target.value as TaxYear)}
            className="text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md px-2 py-1 font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="2026">Tax Year 2026</option>
            <option value="2025">Tax Year 2025</option>
          </select>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-zinc-500 font-medium mr-1">Presets:</span>
          <button
            type="button"
            onClick={() => applyPreset("entry")}
            className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 rounded-md transition-colors font-medium cursor-pointer"
          >
            $60k Single
          </button>
          <button
            type="button"
            onClick={() => applyPreset("median")}
            className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 rounded-md transition-colors font-medium cursor-pointer"
          >
            $85k Joint
          </button>
          <button
            type="button"
            onClick={() => applyPreset("freelancer")}
            className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 rounded-md transition-colors font-medium cursor-pointer"
          >
            1099 Freelancer
          </button>
          <button
            type="button"
            onClick={() => applyPreset("high")}
            className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 rounded-md transition-colors font-medium cursor-pointer"
          >
            $220k High Earner
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("quick")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "quick"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <FileText className="h-4 w-4" /> Quick Estimator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("detailed")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "detailed"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Sliders className="h-4 w-4 text-emerald-500" /> W-2, 1099 & Deductions
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("compare")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "compare"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <BarChart3 className="h-4 w-4 text-purple-500" /> Filing Status Comparison
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("brackets")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "brackets"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Layers className="h-4 w-4 text-amber-500" /> Bracket Waterfall
        </button>
      </div>

      {/* TAB 1: QUICK ESTIMATOR */}
      {activeTab === "quick" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Input Controls (5 Cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Primary Tax Information
            </h3>

            {/* Filing Status */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Filing Status</label>
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
                className="w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md p-2.5 font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="single">Single</option>
                <option value="joint">Married Filing Jointly</option>
                <option value="separately">Married Filing Separately</option>
                <option value="head">Head of Household</option>
              </select>
            </div>

            {/* W-2 Wages */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>W-2 Wages & Salary (Box 1)</span>
                <span className="font-sans tabular-nums text-blue-600">{fmt(wagesW2)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">$</span>
                <Input
                  type="number"
                  min="0"
                  step="1000"
                  value={wagesW2}
                  onChange={(e) => setWagesW2(Math.max(0, Number(e.target.value)))}
                  className="pl-7 text-xs font-sans tabular-nums"
                />
              </div>
            </div>

            {/* Federal Tax Withheld */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Federal Tax Withheld (Box 2)</span>
                <span className="font-sans tabular-nums text-emerald-600">{fmt(fedTaxWithheld)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">$</span>
                <Input
                  type="number"
                  min="0"
                  step="500"
                  value={fedTaxWithheld}
                  onChange={(e) => setFedTaxWithheld(Math.max(0, Number(e.target.value)))}
                  className="pl-7 text-xs font-sans tabular-nums"
                />
              </div>
            </div>

            {/* Dependents Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Child Dependents (0-16)</label>
                <Input
                  type="number"
                  min="0"
                  max="10"
                  value={youngDependents}
                  onChange={(e) => setYoungDependents(Math.max(0, Number(e.target.value)))}
                  className="text-xs font-sans tabular-nums"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Other Dependents (17+)</label>
                <Input
                  type="number"
                  min="0"
                  max="10"
                  value={otherDependents}
                  onChange={(e) => setOtherDependents(Math.max(0, Number(e.target.value)))}
                  className="text-xs font-sans tabular-nums"
                />
              </div>
            </div>

            {/* Age Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Your Age</label>
              <Input
                type="number"
                min="18"
                max="100"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="text-xs font-sans tabular-nums"
              />
            </div>

            {/* Action Buttons: Calculate & Clear */}
            <div className="flex gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                type="button"
                onClick={() => {
                  const el = document.getElementById("tax-results-dashboard");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Calculate Tax
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="text-xs font-medium border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" /> Clear
              </Button>
            </div>
          </div>

          {/* Right Results Dashboard (7 Cols) */}
          <div id="tax-results-dashboard" className="lg:col-span-7 space-y-4">
            {/* Primary Highlight Card (Refund vs Owed) */}
            <div
              className={`rounded-2xl p-6 shadow-md text-white relative overflow-hidden transition-all ${
                results.isRefund
                  ? "bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900"
                  : "bg-gradient-to-br from-amber-950 via-rose-950 to-slate-900"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  {results.isRefund ? "ESTIMATED IRS TAX REFUND" : "ESTIMATED TAX OWED TO IRS"}
                </span>
                <div className="flex gap-2">
                  
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setIsReportOpen(true)}
                    className="h-7 text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold cursor-pointer"
                  >
                    <Printer className="h-3 w-3 mr-1" /> PDF Report
                  </Button>
                </div>
              </div>

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-sans tabular-nums text-white mb-2">
                {fmt(Math.abs(results.netTaxRefundOrOwed))}
              </div>

              <div className="text-xs text-white/90 font-medium">
                {results.isRefund
                  ? "✓ You have overwithheld taxes and are due a refund check from the IRS."
                  : "⚠ Your tax withholding was lower than your calculated tax liability."}
              </div>

              {/* Secondary Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">Gross Income</div>
                  <div className="font-bold font-sans tabular-nums text-white text-sm">{fmt(results.totalGrossIncome)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Taxable Income</div>
                  <div className="font-bold font-sans tabular-nums text-emerald-300 text-sm">{fmt(results.totalTaxableIncome)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Federal Tax Liability</div>
                  <div className="font-bold font-sans tabular-nums text-purple-300 text-sm">{fmt(results.totalTaxLiability)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Tax Withheld</div>
                  <div className="font-bold font-sans tabular-nums text-amber-300 text-sm">{fmt(results.totalTaxWithheld)}</div>
                </div>
              </div>
            </div>

            {/* Insight Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-semibold">Effective Tax Rate</div>
                <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-0.5">
                  {results.effectiveTaxRate}%
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-semibold">Top Bracket</div>
                <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 font-sans tabular-nums mt-0.5">
                  {results.marginalTaxBracketLabel}
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-semibold">Deduction Saved</div>
                <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums mt-0.5">
                  {fmt(results.effectiveDeduction)}
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm text-center">
                <div className="text-[10px] text-zinc-500 uppercase font-semibold">Estimated Take-Home</div>
                <div className="text-base font-extrabold text-teal-600 dark:text-teal-400 font-sans tabular-nums mt-0.5">
                  {fmt(results.takeHomePay)}
                </div>
              </div>
            </div>

            {/* Recharts Waterfall Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                <span>Tax Bracket Waterfall Breakdown</span>
                <span className="text-[10px] text-zinc-400">Recharts Visualization</span>
              </h4>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.bracketBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="rate" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10 }} />
                    <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, "Tax Amount"]} />
                    <Bar dataKey="taxAmount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DETAILED W-2, 1099 & DEDUCTIONS */}
      {activeTab === "detailed" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="flex items-center gap-3">
              <Sliders className="h-6 w-6 text-emerald-500" />
              <div>
                <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">
                  Comprehensive W-2, 1099 & Schedule A/C Input Panel
                </h3>
                <p className="text-xs text-zinc-500">
                  Enter every W-2 box figure, self-employment profit, capital gains, 2025–2028 special provisions, and itemized deductions.
                </p>
              </div>
            </div>

            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Column 1: Additional Income & W-2 Boxes */}
            <div className="space-y-3 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block border-b pb-1">W-2 Boxes & Additional Income</span>
              
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">State Tax Withheld (W-2 Box 17)</label>
                <Input type="number" value={stateTaxWithheld} onChange={(e) => setStateTaxWithheld(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Local Tax Withheld (W-2 Box 19)</label>
                <Input type="number" value={localTaxWithheld} onChange={(e) => setLocalTaxWithheld(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>

              {/* Business Income Toggle */}
              <div className="space-y-1 pt-1 border-t">
                <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 block">Has Business or Self-Employment Income?</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="hasBusiness"
                      checked={hasBusinessIncome}
                      onChange={() => setHasBusinessIncome(true)}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="hasBusiness"
                      checked={!hasBusinessIncome}
                      onChange={() => {
                        setHasBusinessIncome(false);
                        setSelfEmploymentIncome(0);
                      }}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {hasBusinessIncome && (
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-600">Self-Employment Net Profit (1099)</label>
                  <Input type="number" value={selfEmploymentIncome} onChange={(e) => setSelfEmploymentIncome(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Social Security Income (SSA-1099)</label>
                <Input type="number" value={socialSecurityIncome} onChange={(e) => setSocialSecurityIncome(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Interest Income (1099-INT)</label>
                <Input type="number" value={interestIncome} onChange={(e) => setInterestIncome(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Ordinary Dividends</label>
                <Input type="number" value={ordinaryDividends} onChange={(e) => setOrdinaryDividends(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Qualified Dividends (1099-DIV)</label>
                <Input type="number" value={qualifiedDividends} onChange={(e) => setQualifiedDividends(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Short-Term Capital Gains</label>
                <Input type="number" value={shortTermCapitalGains} onChange={(e) => setShortTermCapitalGains(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Long-Term Capital Gains</label>
                <Input type="number" value={longTermCapitalGains} onChange={(e) => setLongTermCapitalGains(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Other Income (1099-G / 1099-R)</label>
                <Input type="number" value={otherIncome} onChange={(e) => setOtherIncome(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
            </div>

            {/* Column 2: Above-the-line & 2025-2028 Provisions */}
            <div className="space-y-3 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block border-b pb-1">Above-The-Line & Special Provisions</span>
              
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Tips Income (Deductible up to $25k)</label>
                <Input type="number" value={tipsIncome} onChange={(e) => setTipsIncome(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Overtime Income (Deductible up to $12.5k/$25k)</label>
                <Input type="number" value={overtimeIncome} onChange={(e) => setOvertimeIncome(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Car Loan Interest (Max $10k qualified vehicle)</label>
                <Input type="number" value={carLoanInterest} onChange={(e) => setCarLoanInterest(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Traditional IRA Contributions</label>
                <Input type="number" value={iraContributions} onChange={(e) => setIraContributions(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Student Loan Interest (Max $2,500/Person)</label>
                <Input type="number" value={studentLoanInterest} onChange={(e) => setStudentLoanInterest(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">HSA Contributions</label>
                <Input type="number" value={hsaContributions} onChange={(e) => setHsaContributions(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
            </div>

            {/* Column 3: Itemized Deductions & Credits */}
            <div className="space-y-3 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block border-b pb-1">Itemized Deductions & Credits</span>
              
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Mortgage Interest Paid</label>
                <Input type="number" value={mortgageInterest} onChange={(e) => setMortgageInterest(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Real Estate Property Tax</label>
                <Input type="number" value={realEstateTax} onChange={(e) => setRealEstateTax(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Charitable Donations</label>
                <Input type="number" value={charitableDonations} onChange={(e) => setCharitableDonations(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Medical Expenses (&gt;7.5% AGI)</label>
                <Input type="number" value={medicalExpenses} onChange={(e) => setMedicalExpenses(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Other Deductions</label>
                <Input type="number" value={otherDeductions} onChange={(e) => setOtherDeductions(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>

              {/* Dependent Care & College Expenses */}
              <div className="space-y-1 pt-2 border-t">
                <label className="text-[11px] font-semibold text-zinc-600">Child & Dependent Care Expenses (Max $3k/1, $6k/2+)</label>
                <Input type="number" value={childCareExpenses} onChange={(e) => setChildCareExpenses(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block">College Education Expenses (Students 1-4)</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="Student 1" value={student1College || ""} onChange={(e) => setStudent1College(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
                  <Input type="number" placeholder="Student 2" value={student2College || ""} onChange={(e) => setStudent2College(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
                  <Input type="number" placeholder="Student 3" value={student3College || ""} onChange={(e) => setStudent3College(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
                  <Input type="number" placeholder="Student 4" value={student4College || ""} onChange={(e) => setStudent4College(Number(e.target.value))} className="text-xs font-sans tabular-nums" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FILING STATUS COMPARISON */}
      {activeTab === "compare" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <BarChart3 className="h-6 w-6 text-purple-500" />
            <div>
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">
                Filing Status Side-by-Side Comparison
              </h3>
              <p className="text-xs text-zinc-500">
                Compare Single, Married Filing Jointly, Married Filing Separately, and Head of Household tax outcomes simultaneously.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.filingStatusComparison.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-5 space-y-3 border transition-all ${
                  item.status === filingStatus
                    ? "bg-blue-50/50 dark:bg-blue-950/20 border-2 border-blue-500 shadow-sm"
                    : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{item.statusLabel}</span>
                  {item.status === filingStatus && <Badge className="bg-blue-600 text-white text-[10px]">Selected</Badge>}
                </div>
                <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                  {fmt(item.federalTax)}
                </div>
                <div className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
                  <div className="flex justify-between"><span>Deduction:</span> <span className="font-sans tabular-nums">{fmt(item.standardDeduction)}</span></div>
                  <div className="flex justify-between"><span>Taxable:</span> <span className="font-sans tabular-nums">{fmt(item.taxableIncome)}</span></div>
                  <div className="flex justify-between"><span>Effective Rate:</span> <span className="font-sans tabular-nums text-purple-600">{item.effectiveTaxRate}%</span></div>
                  <div className="flex justify-between font-bold pt-1 border-t">
                    <span>{item.refundOrOwed >= 0 ? "Refund:" : "Owed:"}</span>
                    <span className={`font-sans tabular-nums ${item.refundOrOwed >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {fmt(Math.abs(item.refundOrOwed))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FORM 1040 BREAKDOWN TABLE */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            IRS Form 1040 Step-by-Step Breakdown Table
          </h4>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search Form 1040..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <Button type="button" variant="outline" size="sm" onClick={exportCSV} className="h-7 text-xs gap-1 cursor-pointer">
              <Download className="h-3 w-3" /> Export CSV
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Line</th>
                <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Form 1040 Description</th>
                <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700 text-right">Amount ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums text-[11px]">
              {filteredForm1040.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${
                    row.isHeader ? "bg-zinc-50 dark:bg-zinc-800/70 font-bold" : ""
                  } ${row.isTotal ? "bg-blue-50/70 dark:bg-blue-950/40 font-bold" : ""}`}
                >
                  <td className="p-2.5 font-sans font-semibold text-blue-600">{row.line}</td>
                  <td className="p-2.5 font-sans text-zinc-800 dark:text-zinc-200">{row.description}</td>
                  <td
                    className={`p-2.5 text-right font-bold ${
                      row.description.includes("REFUND")
                        ? "text-emerald-600"
                        : row.description.includes("OWED")
                        ? "text-rose-600"
                        : "text-zinc-900 dark:text-zinc-100"
                    }`}
                  >
                    {fmt(row.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Article & 20 FAQs */}
      <IncomeTaxContent />
    </div>
  );
}
