"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Briefcase,
  DollarSign,
  Calendar,
  Sparkles,
  Printer,
  Share2,
  AlertTriangle,
  Info,
  CheckCircle2,
  BarChart3,
  FileSpreadsheet,
  Download,
  Plus,
  Trash2,
  Percent,
  Landmark,
  Heart,
  Clock,
  TrendingUp,
  PieChart as PieIcon,
  Sliders,
  Target,
  Layers,
  Building,
  Table,
  ShieldCheck,
  RotateCcw,
  Copy,
  Check,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  calculateBusinessLoan,
  calculateSbaLoan,
  calculateDscr,
} from "@/lib/calculator-engine/formulas/business-loan";

function parseNum(val: string, fallback: number): number {
  if (val === undefined || val === null || val.trim() === "" || isNaN(Number(val))) {
    return fallback;
  }
  return Number(val);
}

interface SavedScenario {
  id: string;
  name: string;
  date: string;
  activeTab: "standard" | "schedule" | "sba" | "dscr" | "charts";
  loanAmount: string;
  interestRate: string;
  loanTermYears: string;
  originationFee: string;
  documentationFee: string;
  otherFees: string;
  sbaType: "7a" | "microloan" | "cdc504" | "disaster";
  sbaAmount: string;
  sbaRate: string;
  sbaTerm: string;
  dscrNoi: string;
  dscrCurrentDebt: string;
  dscrNewDebt: string;
  resultSummary: string;
}

export function BusinessLoanCalculator() {
  // Navigation Tabs: 'standard' | 'schedule' | 'sba' | 'dscr' | 'charts'
  const [activeTab, setActiveTab] = useState<
    "standard" | "schedule" | "sba" | "dscr" | "charts"
  >("standard");

  // Tab 1 Inputs: Standard Business Loan ($10,000 @ 10% for 5 years, 5% orig fee + $750 doc fee)
  const [loanAmountInput, setLoanAmountInput] = useState<string>("10000");
  const [interestRateInput, setInterestRateInput] = useState<string>("10.0");
  const [loanTermYearsInput, setLoanTermYearsInput] = useState<string>("5");
  const [loanTermMonthsInput, setLoanTermMonthsInput] = useState<string>("0");
  const [originationFeeInput, setOriginationFeeInput] = useState<string>("5.0");
  const [documentationFeeInput, setDocumentationFeeInput] = useState<string>("750");
  const [otherFeesInput, setOtherFeesInput] = useState<string>("0");

  // Tab 3 Inputs: SBA Loan Estimator ($250,000 @ 7.5% for 10 yrs)
  const [sbaType, setSbaType] = useState<"7a" | "microloan" | "cdc504" | "disaster">("7a");
  const [sbaAmountInput, setSbaAmountInput] = useState<string>("250000");
  const [sbaRateInput, setSbaRateInput] = useState<string>("7.5");
  const [sbaTermInput, setSbaTermInput] = useState<string>("10");

  // Tab 4 Inputs: DSCR Coverage Analyzer ($150,000 NOI)
  const [dscrNoiInput, setDscrNoiInput] = useState<string>("150000");
  const [dscrCurrentDebtInput, setDscrCurrentDebtInput] = useState<string>("30000");
  const [dscrNewDebtInput, setDscrNewDebtInput] = useState<string>("25000");

  // Modal, Copy, & Saved Scenarios State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);
  const [shareNotification, setShareNotification] = useState(false);
  const [scenarioNameInput, setScenarioNameInput] = useState("");
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);

  // Load scenarios from localStorage & parse URL search params on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("saved_business_loan_scenarios");
      if (saved) {
        setSavedScenarios(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors in private browsing
    }

    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      if (p.has("tab")) {
        const t = p.get("tab");
        if (t === "standard" || t === "schedule" || t === "sba" || t === "dscr" || t === "charts") {
          setActiveTab(t);
        }
      }
      if (p.has("amount")) setLoanAmountInput(p.get("amount")!);
      if (p.has("rate")) setInterestRateInput(p.get("rate")!);
      if (p.has("years")) setLoanTermYearsInput(p.get("years")!);
      if (p.has("origFee")) setOriginationFeeInput(p.get("origFee")!);
      if (p.has("docFee")) setDocumentationFeeInput(p.get("docFee")!);
      if (p.has("otherFee")) setOtherFeesInput(p.get("otherFee")!);
      if (p.has("sbaType")) setSbaType(p.get("sbaType") as any);
      if (p.has("sbaAmt")) setSbaAmountInput(p.get("sbaAmt")!);
      if (p.has("sbaRate")) setSbaRateInput(p.get("sbaRate")!);
      if (p.has("sbaTerm")) setSbaTermInput(p.get("sbaTerm")!);
      if (p.has("noi")) setDscrNoiInput(p.get("noi")!);
      if (p.has("currDebt")) setDscrCurrentDebtInput(p.get("currDebt")!);
      if (p.has("newDebt")) setDscrNewDebtInput(p.get("newDebt")!);
    }
  }, []);

  // Compute Standard Business Loan Results
  const loanResults = useMemo(() => {
    return calculateBusinessLoan({
      loanAmount: parseNum(loanAmountInput, 10000),
      interestRate: parseNum(interestRateInput, 10.0),
      loanTermYears: parseNum(loanTermYearsInput, 5),
      loanTermMonths: parseNum(loanTermMonthsInput, 0),
      originationFeePercent: parseNum(originationFeeInput, 5.0),
      documentationFeeDollar: parseNum(documentationFeeInput, 750),
      otherFeesDollar: parseNum(otherFeesInput, 0),
    });
  }, [
    loanAmountInput,
    interestRateInput,
    loanTermYearsInput,
    loanTermMonthsInput,
    originationFeeInput,
    documentationFeeInput,
    otherFeesInput,
  ]);

  // Compute SBA Results
  const sbaResults = useMemo(() => {
    return calculateSbaLoan({
      loanType: sbaType,
      loanAmount: parseNum(sbaAmountInput, 250000),
      interestRate: parseNum(sbaRateInput, 7.5),
      loanTermYears: parseNum(sbaTermInput, 10),
    });
  }, [sbaType, sbaAmountInput, sbaRateInput, sbaTermInput]);

  // Compute DSCR Results
  const dscrResults = useMemo(() => {
    return calculateDscr({
      annualNetOperatingIncome: parseNum(dscrNoiInput, 150000),
      annualDebtService: parseNum(dscrCurrentDebtInput, 30000),
      newProposedAnnualDebtService: parseNum(dscrNewDebtInput, 25000),
    });
  }, [dscrNoiInput, dscrCurrentDebtInput, dscrNewDebtInput]);

  const fmt = (val: number) =>
    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Quick Presets
  const applyPreset = (amt: number, rate: number, yrs: number, orig: number, doc: number) => {
    setLoanAmountInput(amt.toString());
    setInterestRateInput(rate.toString());
    setLoanTermYearsInput(yrs.toString());
    setLoanTermMonthsInput("0");
    setOriginationFeeInput(orig.toString());
    setDocumentationFeeInput(doc.toString());
    setOtherFeesInput("0");
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    setLoanAmountInput("10000");
    setInterestRateInput("10.0");
    setLoanTermYearsInput("5");
    setLoanTermMonthsInput("0");
    setOriginationFeeInput("5.0");
    setDocumentationFeeInput("750");
    setOtherFeesInput("0");
    setSbaType("7a");
    setSbaAmountInput("250000");
    setSbaRateInput("7.5");
    setSbaTermInput("10");
    setDscrNoiInput("150000");
    setDscrCurrentDebtInput("30000");
    setDscrNewDebtInput("25000");
  };

  // Save Scenario
  const handleSaveScenario = () => {
    const name = scenarioNameInput.trim() || `Business Loan (${fmt(parseNum(loanAmountInput, 10000))})`;
    const newScenario: SavedScenario = {
      id: Date.now().toString(),
      name,
      date: new Date().toLocaleDateString(),
      activeTab,
      loanAmount: loanAmountInput,
      interestRate: interestRateInput,
      loanTermYears: loanTermYearsInput,
      originationFee: originationFeeInput,
      documentationFee: documentationFeeInput,
      otherFees: otherFeesInput,
      sbaType,
      sbaAmount: sbaAmountInput,
      sbaRate: sbaRateInput,
      sbaTerm: sbaTermInput,
      dscrNoi: dscrNoiInput,
      dscrCurrentDebt: dscrCurrentDebtInput,
      dscrNewDebt: dscrNewDebtInput,
      resultSummary: `PMT: ${fmt(loanResults.paybackAmount)} | Real APR: ${loanResults.realAprPercent}%`,
    };

    const updated = [newScenario, ...savedScenarios.slice(0, 9)];
    setSavedScenarios(updated);
    setScenarioNameInput("");
    try {
      localStorage.setItem("saved_business_loan_scenarios", JSON.stringify(updated));
    } catch {
      // Ignore localStorage write error
    }
  };

  const handleRestoreScenario = (sc: SavedScenario) => {
    setActiveTab(sc.activeTab);
    setLoanAmountInput(sc.loanAmount);
    setInterestRateInput(sc.interestRate);
    setLoanTermYearsInput(sc.loanTermYears);
    setOriginationFeeInput(sc.originationFee);
    setDocumentationFeeInput(sc.documentationFee);
    setOtherFeesInput(sc.otherFees || "0");
    if (sc.sbaType) setSbaType(sc.sbaType);
    if (sc.sbaAmount) setSbaAmountInput(sc.sbaAmount);
    if (sc.sbaRate) setSbaRateInput(sc.sbaRate);
    if (sc.sbaTerm) setSbaTermInput(sc.sbaTerm);
    if (sc.dscrNoi) setDscrNoiInput(sc.dscrNoi);
    if (sc.dscrCurrentDebt) setDscrCurrentDebtInput(sc.dscrCurrentDebt);
    if (sc.dscrNewDebt) setDscrNewDebtInput(sc.dscrNewDebt);
  };

  const handleDeleteScenario = (id: string) => {
    const updated = savedScenarios.filter((s) => s.id !== id);
    setSavedScenarios(updated);
    try {
      localStorage.setItem("saved_business_loan_scenarios", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Export Amortization CSV
  const exportCsv = () => {
    const headers = [
      "Period",
      "Payment Date",
      "Beginning Balance",
      "Payment",
      "Interest",
      "Principal",
      "Ending Balance",
    ];
    const rows = loanResults.monthlySchedule.map((r) => [
      r.period,
      `Month ${r.period}`,
      r.beginningBalance,
      r.payment,
      r.interest,
      r.principal,
      r.endingBalance,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `business_loan_amortization_${loanAmountInput}_${loanTermYearsInput}Y.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary
  const copySummary = () => {
    let text = "";
    if (activeTab === "sba") {
      text = `SBA Loan Estimation Summary:
------------------------------------------------
Program: ${sbaType.toUpperCase()}
Loan Amount: ${fmt(parseNum(sbaAmountInput, 250000))}
Interest Rate: ${sbaRateInput}%
Term: ${sbaTermInput} Years
------------------------------------------------
SBA Guarantee Fee: ${fmt(sbaResults.sbaGuaranteeFee)}
Estimated Monthly Payment: ${fmt(sbaResults.estimatedMonthlyPayment)}
Total Cost of SBA Loan: ${fmt(sbaResults.totalCostOfSbaLoan)}`;
    } else if (activeTab === "dscr") {
      text = `DSCR Cash Flow Coverage Summary:
------------------------------------------------
Annual NOI: ${fmt(parseNum(dscrNoiInput, 150000))}
Current Debt: ${fmt(parseNum(dscrCurrentDebtInput, 30000))}/yr
New Proposed Debt: ${fmt(parseNum(dscrNewDebtInput, 25000))}/yr
------------------------------------------------
Total Annual Debt Service: ${fmt(dscrResults.totalAnnualDebtService)}/yr
DSCR Ratio: ${dscrResults.dscrRatio}x (${dscrResults.isHealthy ? "Healthy >= 1.25x" : "Risky < 1.25x"})
Max Allowable Debt (1.25x): ${fmt(dscrResults.maxAllowableAnnualDebt)}/yr`;
    } else {
      text = `Business Loan Calculation Summary:
------------------------------------------------
Loan Amount: ${fmt(parseNum(loanAmountInput, 10000))}
Nominal Rate: ${interestRateInput}% APR
Loan Term: ${loanTermYearsInput} Years (${loanResults.numberOfPayments} Months)
Origination Fee: ${originationFeeInput}% (${fmt(loanResults.originationFeeAmount)})
Documentation Fee: ${fmt(loanResults.documentationFeeAmount)}
------------------------------------------------
Payback Every Month: ${fmt(loanResults.paybackAmount)}
Total of 60 Payments: ${fmt(loanResults.totalPayments)}
Total Interest: ${fmt(loanResults.totalInterestPaid)}
Total Fees: ${fmt(loanResults.totalFeesPaid)}
Total Financing Cost: ${fmt(loanResults.totalInterestAndFees)}
Real Actuarial APR (IRR): ${loanResults.realAprPercent}%
Estimated All-In Rate: ${loanResults.feeLoadRatePercent}%`;
    }

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Share URL
  const shareUrl = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", activeTab);
    url.searchParams.set("amount", loanAmountInput);
    url.searchParams.set("rate", interestRateInput);
    url.searchParams.set("years", loanTermYearsInput);
    url.searchParams.set("origFee", originationFeeInput);
    url.searchParams.set("docFee", documentationFeeInput);
    url.searchParams.set("otherFee", otherFeesInput);
    url.searchParams.set("sbaType", sbaType);
    url.searchParams.set("sbaAmt", sbaAmountInput);
    url.searchParams.set("sbaRate", sbaRateInput);
    url.searchParams.set("sbaTerm", sbaTermInput);
    url.searchParams.set("noi", dscrNoiInput);
    url.searchParams.set("currDebt", dscrCurrentDebtInput);
    url.searchParams.set("newDebt", dscrNewDebtInput);

    navigator.clipboard.writeText(url.toString());
    setShareNotification(true);
    setTimeout(() => setShareNotification(false), 2500);
  };

  // Donut Data: Principal vs Interest vs Fees
  const donutData = [
    { name: "Principal", value: parseNum(loanAmountInput, 10000), color: "#3b82f6" },
    { name: "Interest", value: loanResults.totalInterestPaid, color: "#10b981" },
    { name: "Fees", value: loanResults.totalFeesPaid, color: "#eab308" },
  ];

  // Report Modal Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Business Loan & Commercial Financing Calculator",
      reportTitle: "Commercial Financing & Business Loan Analysis Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: "Payback Every Month",
        value: fmt(loanResults.paybackAmount),
        subtitle: `Real APR: ${loanResults.realAprPercent}% (Nominal: ${interestRateInput}%)`,
        colorTheme: "emerald",
      },
      {
        label: "Total Financing Cost (Interest + Fees)",
        value: fmt(loanResults.totalInterestAndFees),
        subtitle: `Total Payments: ${fmt(loanResults.totalPayments)}`,
        colorTheme: "amber",
      },
    ],
    sections: [
      {
        title: "Commercial Loan Parameters & Fee Summary",
        items: [
          { label: "Loan Amount", value: fmt(parseNum(loanAmountInput, 10000)) },
          { label: "Nominal Interest Rate", value: `${interestRateInput}% APR` },
          { label: "Loan Term", value: `${loanTermYearsInput} Years (${loanResults.numberOfPayments} payments)` },
          {
            label: "Origination Fee",
            value: `${originationFeeInput}% (${fmt(loanResults.originationFeeAmount)})`,
          },
          { label: "Documentation Fee", value: fmt(loanResults.documentationFeeAmount) },
          { label: "Other Commercial Fees", value: fmt(loanResults.otherFeesAmount) },
          { label: "Total Commercial Fees", value: fmt(loanResults.totalFeesPaid) },
          { label: "Monthly Payback Amount", value: fmt(loanResults.paybackAmount), highlight: true },
          { label: "Total Interest Paid", value: fmt(loanResults.totalInterestPaid), highlight: true },
          { label: "Total Financing Cost", value: fmt(loanResults.totalInterestAndFees), highlight: true },
          { label: "Real Actuarial APR (IRR Method)", value: `${loanResults.realAprPercent}%`, highlight: true },
          { label: "Estimated Fee-Load Rate", value: `${loanResults.feeLoadRatePercent}%` },
        ],
      },
      {
        title: "SBA & DSCR Coverage Underwriting Context",
        items: [
          { label: "Modeled SBA Type", value: sbaType.toUpperCase() },
          { label: "SBA Estimated Monthly Payment", value: fmt(sbaResults.estimatedMonthlyPayment) },
          { label: "Annual Net Operating Income (NOI)", value: fmt(parseNum(dscrNoiInput, 150000)) },
          { label: "Total Annual Debt Service", value: `${fmt(dscrResults.totalAnnualDebtService)}/yr` },
          {
            label: "DSCR Coverage Ratio",
            value: `${dscrResults.dscrRatio}x (${dscrResults.isHealthy ? "Healthy >= 1.25x" : "Risky < 1.25x"})`,
            highlight: true,
          },
          { label: "Max Allowable Debt (1.25x)", value: `${fmt(dscrResults.maxAllowableAnnualDebt)}/yr` },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top Presets & Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 gap-1 text-xs"
          >
            <Briefcase className="h-3.5 w-3.5" /> Business Loan Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(10000, 10.0, 5, 5.0, 750)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            Calculator.net Baseline ($10k @ 10% 5Y)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(100000, 8.5, 5, 2.0, 500)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            $100k Commercial Loan
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(250000, 7.5, 10, 3.0, 1000)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            SBA 7(a) Preset ($250k @ 7.5%)
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={resetToDefaults}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-zinc-200 dark:border-zinc-700 rounded-md transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
          <button
            type="button"
            onClick={copySummary}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-zinc-200 dark:border-zinc-700 rounded-md transition-colors cursor-pointer"
          >
            {copyNotification ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
            {copyNotification ? "Copied!" : "Copy"}
          </button>
          <button
            type="button"
            onClick={shareUrl}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-zinc-200 dark:border-zinc-700 rounded-md transition-colors cursor-pointer"
          >
            {shareNotification ? <Check className="h-3 w-3 text-emerald-600" /> : <Share2 className="h-3 w-3" />}
            {shareNotification ? "Link Copied!" : "Share"}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "standard"}
          onClick={() => setActiveTab("standard")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "standard"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Briefcase className="h-4 w-4 text-emerald-500" /> 1. Standard Business Loan
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "schedule"}
          onClick={() => setActiveTab("schedule")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "schedule"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Table className="h-4 w-4 text-purple-500" /> 2. Amortization Schedule
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "sba"}
          onClick={() => setActiveTab("sba")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "sba"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Building className="h-4 w-4 text-amber-500" /> 3. SBA Loan Estimator
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "dscr"}
          onClick={() => setActiveTab("dscr")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "dscr"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <ShieldCheck className="h-4 w-4 text-indigo-500" /> 4. DSCR Cash Flow Coverage
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "charts"}
          onClick={() => setActiveTab("charts")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "charts"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <BarChart3 className="h-4 w-4 text-blue-500" /> Visual Dashboards
        </button>
      </div>

      {/* TAB 1: STANDARD BUSINESS LOAN */}
      {activeTab === "standard" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Business Loan Parameters
              </h3>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Loan Amount ($)</label>
                  <Input
                    type="number"
                    value={loanAmountInput}
                    onChange={(e) => setLoanAmountInput(e.target.value)}
                    placeholder="e.g. 10000"
                    className="text-xs font-sans tabular-nums h-9 px-3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Nominal Rate (% APR)</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={interestRateInput}
                      onChange={(e) => setInterestRateInput(e.target.value)}
                      placeholder="e.g. 10.0"
                      className="text-xs font-sans tabular-nums h-9 px-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Term (Years)</label>
                    <Input
                      type="number"
                      value={loanTermYearsInput}
                      onChange={(e) => setLoanTermYearsInput(e.target.value)}
                      className="text-xs font-sans tabular-nums h-9 px-3"
                    />
                  </div>
                </div>

                {/* Fees Inputs */}
                <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 space-y-2 text-xs">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Commercial Fees:</span>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-zinc-500">Origination Fee (%)</label>
                      <Input
                        type="number"
                        step="0.25"
                        value={originationFeeInput}
                        onChange={(e) => setOriginationFeeInput(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums px-2"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500">Doc Fee ($)</label>
                      <Input
                        type="number"
                        value={documentationFeeInput}
                        onChange={(e) => setDocumentationFeeInput(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums px-2"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500">Other Fees ($)</label>
                      <Input
                        type="number"
                        value={otherFeesInput}
                        onChange={(e) => setOtherFeesInput(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums px-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scenario Manager */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                Save / Compare Scenario
              </span>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Scenario name (e.g. Equipment Expansion)"
                  value={scenarioNameInput}
                  onChange={(e) => setScenarioNameInput(e.target.value)}
                  className="text-xs h-8"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleSaveScenario}
                  className="h-8 text-xs bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shrink-0"
                >
                  <Bookmark className="h-3.5 w-3.5 mr-1" /> Save
                </Button>
              </div>

              {savedScenarios.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 max-h-40 overflow-y-auto">
                  {savedScenarios.map((sc) => (
                    <div
                      key={sc.id}
                      className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-xs font-sans tabular-nums"
                    >
                      <div className="space-y-0.5">
                        <strong className="font-bold text-zinc-900 dark:text-zinc-100 block">{sc.name}</strong>
                        <span className="text-[11px] text-zinc-500">{sc.resultSummary}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRestoreScenario(sc)}
                          className="h-6 text-[11px] px-2 text-indigo-600 cursor-pointer"
                        >
                          Load
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteScenario(sc.id)}
                          className="h-6 text-[11px] px-1 text-rose-500 cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Results Panel (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  PAYBACK EVERY MONTH
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setIsReportOpen(true)}
                    className="h-7 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold cursor-pointer"
                  >
                    <Printer className="h-3 w-3 mr-1" /> PDF Report
                  </Button>
                </div>
              </div>

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400 font-sans tabular-nums mb-2">
                {fmt(loanResults.paybackAmount)}
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs text-white/90 font-medium pt-2 border-t border-white/10">
                <div>
                  Total {loanResults.numberOfPayments} Payments:{" "}
                  <span className="font-bold text-indigo-200 block">{fmt(loanResults.totalPayments)}</span>
                </div>
                <div>
                  Total Interest:{" "}
                  <span className="font-bold text-emerald-300 block">{fmt(loanResults.totalInterestPaid)}</span>
                </div>
                <div>
                  Interest + Fees:{" "}
                  <span className="font-bold text-amber-200 block">{fmt(loanResults.totalInterestAndFees)}</span>
                </div>
                <div>
                  Real Actuarial APR:{" "}
                  <span className="font-bold text-blue-200 block">{loanResults.realAprPercent}%</span>
                </div>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Capital vs. Interest vs. Fee Breakdown
                </h4>
                <span className="text-[11px] text-zinc-500">
                  Total Cost: {fmt(loanResults.totalInterestAndFees)}
                </span>
              </div>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={donutData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AMORTIZATION SCHEDULE */}
      {activeTab === "schedule" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Table className="h-5 w-5 text-purple-600" />
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                Commercial Amortization Schedule ({loanResults.numberOfPayments} Monthly Periods)
              </h3>
            </div>
            <Button type="button" size="sm" variant="outline" onClick={exportCsv} className="h-7 text-xs cursor-pointer">
              <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left text-xs font-sans tabular-nums">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60 sticky top-0 font-sans font-bold text-zinc-700 dark:text-zinc-300">
                <tr>
                  <th className="p-2.5">Month</th>
                  <th className="p-2.5">Beginning Balance</th>
                  <th className="p-2.5">Payment</th>
                  <th className="p-2.5">Interest</th>
                  <th className="p-2.5">Principal</th>
                  <th className="p-2.5">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {loanResults.monthlySchedule.map((row) => (
                  <React.Fragment key={row.period}>
                    <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40">
                      <td className="p-2.5 font-bold">{row.period}</td>
                      <td className="p-2.5">{fmt(row.beginningBalance)}</td>
                      <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">{fmt(row.payment)}</td>
                      <td className="p-2.5 text-rose-600 font-semibold">{fmt(row.interest)}</td>
                      <td className="p-2.5 text-emerald-600 font-semibold">{fmt(row.principal)}</td>
                      <td className="p-2.5 font-bold">{fmt(row.endingBalance)}</td>
                    </tr>

                    {/* Year End Divider */}
                    {row.isYearEnd && (
                      <tr className="bg-indigo-50/70 dark:bg-indigo-950/40 font-sans font-bold text-indigo-900 dark:text-indigo-200">
                        <td colSpan={6} className="p-2 text-center text-xs tracking-wider uppercase">
                          Year #{row.yearNum} End Summary — Balance: {fmt(row.endingBalance)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SBA LOAN ESTIMATOR */}
      {activeTab === "sba" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              SBA Government Guaranteed Loan Estimator
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">SBA Program Type</label>
                <select
                  value={sbaType}
                  onChange={(e) => setSbaType(e.target.value as any)}
                  className="w-full h-9 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-xs"
                >
                  <option value="7a">SBA 7(a) Standard Loan (Up to $5M Working Capital)</option>
                  <option value="cdc504">SBA CDC/504 Loan (Up to 25 Yrs Real Estate)</option>
                  <option value="microloan">SBA Microloan (Up to $50k Small Business)</option>
                  <option value="disaster">SBA Economic Injury Disaster Loan (EIDL)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">SBA Loan Amount ($)</label>
                <Input
                  type="number"
                  value={sbaAmountInput}
                  onChange={(e) => setSbaAmountInput(e.target.value)}
                  className="text-xs font-sans tabular-nums h-9 px-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Interest Rate (%)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={sbaRateInput}
                    onChange={(e) => setSbaRateInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Term (Years)</label>
                  <Input
                    type="number"
                    value={sbaTermInput}
                    onChange={(e) => setSbaTermInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-amber-900 dark:text-amber-200 text-sm block border-b pb-1">
                SBA Program Estimated Costs
              </span>
              <div className="flex justify-between">
                <span>SBA Guarantee Fee:</span>
                <span className="font-bold">{fmt(sbaResults.sbaGuaranteeFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Effective Financed Amount:</span>
                <span className="font-bold">{fmt(sbaResults.effectiveBorrowingAmount)}</span>
              </div>
              <div className="flex justify-between text-base border-t pt-1 font-extrabold text-amber-600">
                <span>Estimated Monthly Payment:</span>
                <span>{fmt(sbaResults.estimatedMonthlyPayment)}</span>
              </div>
              <div className="flex justify-between font-sans text-zinc-600 dark:text-zinc-400">
                <span>Total SBA Loan Cost:</span>
                <span className="font-bold font-sans tabular-nums">{fmt(sbaResults.totalCostOfSbaLoan)}</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-500">
              * Note: SBA guarantee fees and max interest spreads are subject to SBA SOP guidelines and individual lender underwriting.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: DSCR COVERAGE ANALYZER */}
      {activeTab === "dscr" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Debt Service Coverage Ratio (DSCR) Analyzer
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Annual Net Operating Income (NOI $)</label>
                <Input
                  type="number"
                  value={dscrNoiInput}
                  onChange={(e) => setDscrNoiInput(e.target.value)}
                  className="text-xs font-sans tabular-nums h-8 px-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Current Existing Debt ($/yr)</label>
                  <Input
                    type="number"
                    value={dscrCurrentDebtInput}
                    onChange={(e) => setDscrCurrentDebtInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">New Proposed Debt ($/yr)</label>
                  <Input
                    type="number"
                    value={dscrNewDebtInput}
                    onChange={(e) => setDscrNewDebtInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-indigo-900 dark:text-indigo-200 text-sm block border-b pb-1">
                DSCR Commercial Underwriting Result
              </span>
              <div className="flex justify-between text-base">
                <span>DSCR Coverage Ratio:</span>
                <span className={`font-extrabold ${dscrResults.isHealthy ? "text-emerald-600" : "text-rose-600"}`}>
                  {dscrResults.dscrRatio}x ({dscrResults.isHealthy ? "Healthy >= 1.25x" : "Risky < 1.25x"})
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Annual Debt Service:</span>
                <span className="font-bold">{fmt(dscrResults.totalAnnualDebtService)}/yr</span>
              </div>
              <div className="flex justify-between text-blue-600 font-bold border-t pt-1">
                <span>Max Allowable Annual Debt (at 1.25x):</span>
                <span>{fmt(dscrResults.maxAllowableAnnualDebt)}/yr</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: VISUAL DASHBOARDS */}
      {activeTab === "charts" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Commercial Loan Balance Amortization Over Time
            </h3>
            <span className="text-xs text-zinc-500">
              Loan Amount: {fmt(parseNum(loanAmountInput, 10000))} | Rate: {interestRateInput}%
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={loanResults.monthlySchedule.filter((r) => r.isYearEnd)}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="yearNum" tick={{ fontSize: 11 }} tickFormatter={(v: any) => `Year ${v}`} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}`} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                <Legend />
                <Line type="monotone" dataKey="endingBalance" name="Ending Balance ($)" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="interest" name="Interest ($)" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />
    </div>
  );
}

export default BusinessLoanCalculator;
