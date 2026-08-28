"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Shield,
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
  Briefcase,
  TrendingUp,
  PieChart as PieIcon,
  Sliders,
  Target,
  Layers,
  Users,
  Award,
  RotateCcw,
  Copy,
  Check,
  Bookmark,
  History,
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  calculateFixedLengthPayout,
  calculateFixedPaymentPayout,
  calculateLifeExpectancyPayout,
  calculateJointLifePayout,
  calculateImmediateVsDeferred,
  generateSmartInsights,
} from "@/lib/calculator-engine/formulas/annuity-payout";

export interface SavedAnnuityScenario {
  id: string;
  name: string;
  date: string;
  principal: string;
  rate: string;
  years: string;
  frequency: "monthly" | "quarterly" | "semiannual" | "annual";
  desiredPayment: string;
  currentAge: string;
  spouseAge: string;
  gender: "male" | "female";
  inflation: string;
  deferralYears: string;
  deferralGrowth: string;
  activeTab: "fixedLength" | "fixedPayment" | "lifeExpectancy" | "jointLife" | "immVsDef" | "charts" | "schedule";
}

function parseNum(val: string, fallback: number): number {
  if (val !== "" && !isNaN(Number(val))) {
    return Number(val);
  }
  return fallback;
}

export function AnnuityPayoutCalculator() {
  // Navigation Tabs: 'fixedLength' | 'fixedPayment' | 'lifeExpectancy' | 'jointLife' | 'immVsDef' | 'charts' | 'schedule'
  const [activeTab, setActiveTab] = useState<
    "fixedLength" | "fixedPayment" | "lifeExpectancy" | "jointLife" | "immVsDef" | "charts" | "schedule"
  >("fixedLength");

  // Mode 1: Fixed Length Inputs (Calculator.net Baseline)
  const [principalInput, setPrincipalInput] = useState<string>("500000");
  const [rateInput, setRateInput] = useState<string>("6.0");
  const [yearsInput, setYearsInput] = useState<string>("10");
  const [frequencyInput, setFrequencyInput] = useState<"monthly" | "quarterly" | "semiannual" | "annual">("monthly");

  // Mode 2: Fixed Payment Inputs
  const [desiredPaymentInput, setDesiredPaymentInput] = useState<string>("5000");

  // Mode 3 & 4: Life & Joint Inputs
  const [currentAgeInput, setCurrentAgeInput] = useState<string>("65");
  const [spouseAgeInput, setSpouseAgeInput] = useState<string>("63");
  const [genderInput, setGenderInput] = useState<"male" | "female">("male");
  const [inflationInput, setInflationInput] = useState<string>("2.5");

  // Mode 5: Immediate vs Deferred Inputs
  const [deferralYearsInput, setDeferralYearsInput] = useState<string>("10");
  const [deferralGrowthInput, setDeferralGrowthInput] = useState<string>("6.0");

  // State Management: Saved Scenarios & UI Notifications
  const [savedScenarios, setSavedScenarios] = useState<SavedAnnuityScenario[]>([]);
  const [scenarioNameInput, setScenarioNameInput] = useState<string>("");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);
  const [shareNotification, setShareNotification] = useState(false);

  // Load Saved Scenarios & URL Query Parameters on Mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_annuity_payout_scenarios");
      if (stored) {
        setSavedScenarios(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.has("p")) setPrincipalInput(params.get("p")!);
      if (params.has("r")) setRateInput(params.get("r")!);
      if (params.has("y")) setYearsInput(params.get("y")!);
      if (params.has("freq")) setFrequencyInput(params.get("freq") as any);
      if (params.has("pmt")) setDesiredPaymentInput(params.get("pmt")!);
      if (params.has("age")) setCurrentAgeInput(params.get("age")!);
      if (params.has("tab")) {
        const t = params.get("tab");
        if (
          t === "fixedLength" ||
          t === "fixedPayment" ||
          t === "lifeExpectancy" ||
          t === "jointLife" ||
          t === "immVsDef" ||
          t === "charts" ||
          t === "schedule"
        ) {
          setActiveTab(t);
        }
      }
    }
  }, []);

  // Compute Mode 1 Results (Fixed Length Baseline)
  const mode1Results = useMemo(() => {
    return calculateFixedLengthPayout({
      startingPrincipal: parseNum(principalInput, 500000),
      interestRatePercent: parseNum(rateInput, 6.0),
      yearsToPayout: parseNum(yearsInput, 10),
      payoutFrequency: frequencyInput,
    });
  }, [principalInput, rateInput, yearsInput, frequencyInput]);

  // Compute Mode 2 Results (Fixed Payment Depletion)
  const mode2Results = useMemo(() => {
    return calculateFixedPaymentPayout({
      startingPrincipal: parseNum(principalInput, 500000),
      interestRatePercent: parseNum(rateInput, 6.0),
      desiredPaymentAmount: parseNum(desiredPaymentInput, 5000),
      payoutFrequency: frequencyInput,
    });
  }, [principalInput, rateInput, desiredPaymentInput, frequencyInput]);

  // Compute Mode 3 Results (Life Expectancy)
  const mode3Results = useMemo(() => {
    return calculateLifeExpectancyPayout({
      currentAge: parseNum(currentAgeInput, 65),
      gender: genderInput,
      startingPrincipal: parseNum(principalInput, 500000),
      expectedReturnPercent: parseNum(rateInput, 6.0),
      inflationRatePercent: parseNum(inflationInput, 2.5),
    });
  }, [currentAgeInput, genderInput, principalInput, rateInput, inflationInput]);

  // Compute Mode 4 Results (Joint Life)
  const mode4Results = useMemo(() => {
    return calculateJointLifePayout({
      primaryAge: parseNum(currentAgeInput, 65),
      spouseAge: parseNum(spouseAgeInput, 63),
      startingPrincipal: parseNum(principalInput, 500000),
      expectedReturnPercent: parseNum(rateInput, 6.0),
    });
  }, [currentAgeInput, spouseAgeInput, principalInput, rateInput]);

  // Compute Mode 5 Results (Immediate vs Deferred)
  const mode5Results = useMemo(() => {
    return calculateImmediateVsDeferred({
      startingPrincipal: parseNum(principalInput, 500000),
      currentAge: parseNum(currentAgeInput, 65),
      deferralYears: parseNum(deferralYearsInput, 10),
      growthDuringDeferralPercent: parseNum(deferralGrowthInput, 6.0),
      payoutReturnPercent: parseNum(rateInput, 6.0),
      payoutYears: parseNum(yearsInput, 10),
    });
  }, [principalInput, currentAgeInput, deferralYearsInput, deferralGrowthInput, rateInput, yearsInput]);

  // Compute Smart Insights
  const smartInsights = useMemo(() => {
    return generateSmartInsights(mode1Results, parseNum(inflationInput, 2.5));
  }, [mode1Results, inflationInput]);

  const fmt = (val: number) =>
    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Quick Presets
  const applyPreset = (p: number, r: number, y: number, pmt?: number) => {
    setPrincipalInput(p.toString());
    setRateInput(r.toString());
    setYearsInput(y.toString());
    if (pmt) setDesiredPaymentInput(pmt.toString());
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    setPrincipalInput("500000");
    setRateInput("6.0");
    setYearsInput("10");
    setFrequencyInput("monthly");
    setDesiredPaymentInput("5000");
    setCurrentAgeInput("65");
    setSpouseAgeInput("63");
    setGenderInput("male");
    setInflationInput("2.5");
    setDeferralYearsInput("10");
    setDeferralGrowthInput("6.0");
    setActiveTab("fixedLength");
  };

  // Save Scenario
  const saveScenario = () => {
    const name = scenarioNameInput.trim() || `Annuity Plan #${savedScenarios.length + 1}`;
    const newScenario: SavedAnnuityScenario = {
      id: Date.now().toString(),
      name,
      date: new Date().toLocaleDateString(),
      principal: principalInput,
      rate: rateInput,
      years: yearsInput,
      frequency: frequencyInput,
      desiredPayment: desiredPaymentInput,
      currentAge: currentAgeInput,
      spouseAge: spouseAgeInput,
      gender: genderInput,
      inflation: inflationInput,
      deferralYears: deferralYearsInput,
      deferralGrowth: deferralGrowthInput,
      activeTab,
    };

    const updated = [newScenario, ...savedScenarios.slice(0, 7)];
    setSavedScenarios(updated);
    setScenarioNameInput("");
    try {
      localStorage.setItem("saved_annuity_payout_scenarios", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Restore Scenario
  const restoreScenario = (sc: SavedAnnuityScenario) => {
    setPrincipalInput(sc.principal);
    setRateInput(sc.rate);
    setYearsInput(sc.years);
    setFrequencyInput(sc.frequency);
    setDesiredPaymentInput(sc.desiredPayment);
    setCurrentAgeInput(sc.currentAge);
    setSpouseAgeInput(sc.spouseAge);
    setGenderInput(sc.gender);
    setInflationInput(sc.inflation);
    setDeferralYearsInput(sc.deferralYears);
    setDeferralGrowthInput(sc.deferralGrowth);
    setActiveTab(sc.activeTab);
  };

  // Delete Scenario
  const deleteScenario = (id: string) => {
    const updated = savedScenarios.filter((s) => s.id !== id);
    setSavedScenarios(updated);
    try {
      localStorage.setItem("saved_annuity_payout_scenarios", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Annuity Payout Analysis Summary:
------------------------------------------------
Starting Principal: ${fmt(mode1Results.startingPrincipal)}
Interest/Return Rate: ${rateInput}%
Years to Payout: ${yearsInput} Years (${frequencyInput})
------------------------------------------------
1. Fixed Length Payout:
   Monthly Payout: ${fmt(mode1Results.monthlyWithdrawal)}/mo
   Total Payments: ${mode1Results.totalPaymentsCount}
   Total Amount Received: ${fmt(mode1Results.totalAmountWithdrawn)}
   Total Interest Earned: ${fmt(mode1Results.totalInterestEarned)}
   Withdrawal Rate: ${mode1Results.withdrawalRatePercent}% (${mode1Results.sustainabilityScore})
   Effective Yield: ${mode1Results.effectiveYieldPercent}%
------------------------------------------------
2. Fixed Payment Payout ($${desiredPaymentInput}/mo):
   Depletion Time: ${mode2Results.isInfinite ? "Never (Infinite)" : `${mode2Results.yearsUntilDepleted} Years (${mode2Results.monthsUntilDepleted} Months)`}
   Total Amount Withdrawn: ${fmt(mode2Results.totalAmountWithdrawn)}
------------------------------------------------
3. Life Expectancy (${currentAgeInput} yr old ${genderInput}):
   Actuarial Duration: ${mode3Results.estimatedLifeExpectancyYears} Years (End Age: ${mode3Results.estimatedEndAge})
   Sustainable Monthly: ${fmt(mode3Results.sustainableMonthlyIncome)}/mo
   Purchasing Power Loss: -${mode3Results.purchasingPowerLossPercent}%
------------------------------------------------
4. Joint Life (Age ${currentAgeInput} + Spouse ${spouseAgeInput}):
   Joint Duration: ${mode4Results.jointLifeExpectancyYears} Years (End Age: ${mode4Results.jointEndAge})
   Joint Monthly Income: ${fmt(mode4Results.sustainableMonthlyIncome)}/mo
------------------------------------------------
5. Immediate vs. Deferred (10 Yr Deferral @ ${deferralGrowthInput}%):
   Immediate Monthly: ${fmt(mode5Results.immediateMonthlyIncome)}/mo
   Deferred Monthly: ${fmt(mode5Results.deferredMonthlyIncome)}/mo
   Accumulated Balance: ${fmt(mode5Results.deferredAccumulatedBalance)}
   Modeled Advantage: +${fmt(mode5Results.deferredAdvantage)}
Disclaimer: This calculator is a financial planning model, not a contract quote.`;

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyNotification(true);
      setTimeout(() => setCopyNotification(false), 2500);
    }
  };

  // Share URL with Query Parameters
  const shareCalculation = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams({
        p: principalInput,
        r: rateInput,
        y: yearsInput,
        freq: frequencyInput,
        pmt: desiredPaymentInput,
        age: currentAgeInput,
        tab: activeTab,
      });
      const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl);
        setShareNotification(true);
        setTimeout(() => setShareNotification(false), 2500);
      }
    }
  };

  // Export CSV Schedule
  const exportCSV = () => {
    const headers = [
      "Year",
      "Beginning Balance ($)",
      "Interest Earned ($)",
      "Withdrawals ($)",
      "Ending Balance ($)",
    ];

    const rows = mode1Results.schedule.map((r) => [
      r.period,
      r.beginningBalance.toFixed(2),
      r.interestEarned.toFixed(2),
      r.withdrawals.toFixed(2),
      r.endingBalance.toFixed(2),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `annuity_payout_schedule_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Donut Chart Data
  const donutData = [
    { name: "Starting Principal", value: mode1Results.startingPrincipal, color: "#3b82f6" },
    { name: "Interest / Return", value: mode1Results.totalInterestEarned, color: "#10b981" },
  ];

  // Report Modal Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Annuity Payout Calculator – Guaranteed Retirement Income Suite",
      reportTitle: "Annuity Payout & Income Strategy Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: "Guaranteed Monthly Income",
        value: fmt(mode1Results.monthlyWithdrawal),
        subtitle: `For ${yearsInput} Years @ ${rateInput}% Return`,
        colorTheme: "emerald",
      },
      {
        label: "Total Amount Received",
        value: fmt(mode1Results.totalAmountWithdrawn),
        subtitle: `${mode1Results.totalPaymentsCount} total scheduled payments`,
        colorTheme: "blue",
      },
      {
        label: "Total Interest Earned",
        value: fmt(mode1Results.totalInterestEarned),
        subtitle: `${mode1Results.interestPercentage}% generated from compound interest`,
        colorTheme: "purple",
      },
    ],
    sections: [
      {
        title: "1. Fixed Length Payout Summary",
        items: [
          { label: "Starting Principal", value: fmt(mode1Results.startingPrincipal) },
          { label: "Interest / Return Rate", value: `${rateInput}%` },
          { label: "Years to Payout", value: `${yearsInput} Years` },
          { label: "Payout Frequency", value: frequencyInput },
          { label: "Monthly Withdrawal", value: fmt(mode1Results.monthlyWithdrawal), highlight: true },
          { label: "Annual Withdrawal", value: fmt(mode1Results.annualWithdrawal), highlight: true },
          { label: "Total Amount Received", value: fmt(mode1Results.totalAmountWithdrawn) },
          { label: "Total Interest Earned", value: fmt(mode1Results.totalInterestEarned) },
          { label: "Withdrawal Rate", value: `${mode1Results.withdrawalRatePercent}% (${mode1Results.sustainabilityScore})` },
          { label: "Effective Yield", value: `${mode1Results.effectiveYieldPercent}%` },
        ],
      },
      {
        title: "2. Fixed Payment Payout Summary",
        items: [
          { label: "Desired Monthly Check", value: fmt(parseNum(desiredPaymentInput, 5000)) },
          { label: "Funds Depletion Time", value: mode2Results.isInfinite ? "Never Depletes" : `${mode2Results.yearsUntilDepleted} Years (${mode2Results.monthsUntilDepleted} Months)`, highlight: true },
          { label: "Total Amount Withdrawn", value: fmt(mode2Results.totalAmountWithdrawn) },
          { label: "Total Interest Earned", value: fmt(mode2Results.totalInterestEarned) },
        ],
      },
      {
        title: "3. Life Expectancy Payout Summary",
        items: [
          { label: "Current Age & Gender", value: `Age ${currentAgeInput} (${genderInput})` },
          { label: "Actuarial Life Expectancy", value: `${mode3Results.estimatedLifeExpectancyYears} Years (End Age: ${mode3Results.estimatedEndAge})` },
          { label: "Sustainable Monthly Income", value: fmt(mode3Results.sustainableMonthlyIncome), highlight: true },
          { label: "Purchasing Power Loss", value: `-${mode3Results.purchasingPowerLossPercent}%` },
        ],
      },
      {
        title: "4. Joint Life Payout Summary",
        items: [
          { label: "Primary & Spouse Age", value: `Primary: ${currentAgeInput} | Spouse: ${spouseAgeInput}` },
          { label: "Joint Life Duration", value: `${mode4Results.jointLifeExpectancyYears} Years (End Age: ${mode4Results.jointEndAge})` },
          { label: "Joint Monthly Income", value: fmt(mode4Results.sustainableMonthlyIncome), highlight: true },
        ],
      },
      {
        title: "5. Immediate vs. Deferred Comparison",
        items: [
          { label: "Immediate Monthly Income", value: fmt(mode5Results.immediateMonthlyIncome) },
          { label: "Deferred Monthly Income (10 Yrs)", value: fmt(mode5Results.deferredMonthlyIncome), highlight: true },
          { label: "Accumulated Deferred Balance", value: fmt(mode5Results.deferredAccumulatedBalance) },
          { label: "Deferred Advantage", value: `+${fmt(mode5Results.deferredAdvantage)}`, highlight: true },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6" id="annuity-payout-calculator-app">
      {/* Top Quick Presets Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 gap-1 text-xs"
          >
            <Shield className="h-3.5 w-3.5" /> Payout Phase Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(500000, 6.0, 10)}
            className="h-6 text-[10px] px-2 cursor-pointer hover:border-indigo-400"
          >
            Calculator.net Baseline ($500k @ 6% for 10 Yrs)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(300000, 5.0, 20)}
            className="h-6 text-[10px] px-2 cursor-pointer hover:border-indigo-400"
          >
            $300k @ 5% for 20 Yrs
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(750000, 7.0, 15)}
            className="h-6 text-[10px] px-2 cursor-pointer hover:border-indigo-400"
          >
            $750k @ 7% for 15 Yrs
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Monthly Check:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-sans tabular-nums text-sm font-extrabold">
            {fmt(mode1Results.monthlyWithdrawal)}/mo
          </span>
        </div>
      </div>

      {/* Navigation Tabs for all 5 Calculation Modes + Dashboards + Schedule */}
      <div
        className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800 gap-1"
        role="tablist"
        aria-label="Annuity Payout Calculator Modes"
      >
        <button
          type="button"
          role="tab"
          id="tab-fixedLength"
          aria-selected={activeTab === "fixedLength"}
          aria-controls="panel-fixedLength"
          onClick={() => setActiveTab("fixedLength")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "fixedLength"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Clock className="h-4 w-4 text-indigo-500" /> 1. Fixed Length Payout
        </button>
        <button
          type="button"
          role="tab"
          id="tab-fixedPayment"
          aria-selected={activeTab === "fixedPayment"}
          aria-controls="panel-fixedPayment"
          onClick={() => setActiveTab("fixedPayment")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "fixedPayment"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <DollarSign className="h-4 w-4 text-emerald-500" /> 2. Fixed Payment Payout
        </button>
        <button
          type="button"
          role="tab"
          id="tab-lifeExpectancy"
          aria-selected={activeTab === "lifeExpectancy"}
          aria-controls="panel-lifeExpectancy"
          onClick={() => setActiveTab("lifeExpectancy")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "lifeExpectancy"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Award className="h-4 w-4 text-rose-500" /> 3. Life Expectancy
        </button>
        <button
          type="button"
          role="tab"
          id="tab-jointLife"
          aria-selected={activeTab === "jointLife"}
          aria-controls="panel-jointLife"
          onClick={() => setActiveTab("jointLife")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "jointLife"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Users className="h-4 w-4 text-purple-500" /> 4. Joint Life
        </button>
        <button
          type="button"
          role="tab"
          id="tab-immVsDef"
          aria-selected={activeTab === "immVsDef"}
          aria-controls="panel-immVsDef"
          onClick={() => setActiveTab("immVsDef")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "immVsDef"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Layers className="h-4 w-4 text-amber-500" /> 5. Immediate vs Deferred
        </button>
        <button
          type="button"
          role="tab"
          id="tab-charts"
          aria-selected={activeTab === "charts"}
          aria-controls="panel-charts"
          onClick={() => setActiveTab("charts")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "charts"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <BarChart3 className="h-4 w-4 text-blue-500" /> Visual Dashboards
        </button>
        <button
          type="button"
          role="tab"
          id="tab-schedule"
          aria-selected={activeTab === "schedule"}
          aria-controls="panel-schedule"
          onClick={() => setActiveTab("schedule")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "schedule"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <FileSpreadsheet className="h-4 w-4 text-teal-500" /> Schedule &amp; Export
        </button>
      </div>

      {/* MODE 1: FIXED LENGTH PAYOUT */}
      {activeTab === "fixedLength" && (
        <div id="panel-fixedLength" role="tabpanel" aria-labelledby="tab-fixedLength" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Fixed Length Payout Inputs
              </h3>

              <div className="space-y-1 text-xs">
                <label htmlFor="annuity-principal" className="font-semibold text-zinc-700 dark:text-zinc-300">Starting Principal ($)</label>
                <Input
                  id="annuity-principal"
                  type="number"
                  min="0"
                  step="25000"
                  value={principalInput}
                  onChange={(e) => setPrincipalInput(e.target.value)}
                  className="text-xs font-sans tabular-nums h-9 px-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label htmlFor="annuity-rate" className="font-semibold text-zinc-700 dark:text-zinc-300">Interest/Return Rate (%)</label>
                  <Input
                    id="annuity-rate"
                    type="number"
                    min="0"
                    max="25"
                    step="0.25"
                    value={rateInput}
                    onChange={(e) => setRateInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="annuity-years" className="font-semibold text-zinc-700 dark:text-zinc-300">Years to Payout</label>
                  <Input
                    id="annuity-years"
                    type="number"
                    min="1"
                    max="50"
                    value={yearsInput}
                    onChange={(e) => setYearsInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label htmlFor="annuity-frequency" className="font-semibold text-zinc-700 dark:text-zinc-300">Payout Frequency</label>
                <select
                  id="annuity-frequency"
                  value={frequencyInput}
                  onChange={(e) => setFrequencyInput(e.target.value as any)}
                  className="w-full h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-xs cursor-pointer"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semiannual">Semi-Annual</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
            </div>

            {/* Action Bar: Reset, Save, Copy, Share */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
                  <Input
                    type="text"
                    placeholder="Scenario Name (e.g. 10-Yr Plan)"
                    value={scenarioNameInput}
                    onChange={(e) => setScenarioNameInput(e.target.value)}
                    className="text-xs h-8 px-2"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={saveScenario}
                    className="h-8 text-xs gap-1 cursor-pointer"
                  >
                    <Bookmark className="h-3.5 w-3.5 text-blue-600" /> Save
                  </Button>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={resetToDefaults}
                    className="h-8 text-xs gap-1 cursor-pointer text-zinc-600 dark:text-zinc-400"
                    title="Reset to Defaults"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Reset
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copySummary}
                    className="h-8 text-xs gap-1 cursor-pointer text-zinc-700 dark:text-zinc-300"
                  >
                    {copyNotification ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copyNotification ? "Copied!" : "Copy"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={shareCalculation}
                    className="h-8 text-xs gap-1 cursor-pointer text-zinc-700 dark:text-zinc-300"
                  >
                    {shareNotification ? <Check className="h-3.5 w-3.5 text-indigo-500" /> : <Share2 className="h-3.5 w-3.5 text-indigo-500" />}
                    {shareNotification ? "Link Copied!" : "Share"}
                  </Button>
                </div>
              </div>

              {/* Saved Scenarios List */}
              {savedScenarios.length > 0 && (
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                    <span className="flex items-center gap-1">
                      <History className="w-3 h-3 text-indigo-500" /> Saved Scenarios ({savedScenarios.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSavedScenarios([]);
                        localStorage.removeItem("saved_annuity_payout_scenarios");
                      }}
                      className="text-[10px] text-zinc-400 hover:text-red-500 font-medium cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {savedScenarios.map((sc) => (
                      <div
                        key={sc.id}
                        className="p-1.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-xs"
                      >
                        <button
                          type="button"
                          onClick={() => restoreScenario(sc)}
                          className="text-left font-bold text-indigo-600 dark:text-indigo-400 hover:underline truncate cursor-pointer"
                        >
                          {sc.name} <span className="text-[10px] text-zinc-400 font-normal">({sc.date})</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteScenario(sc.id)}
                          className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
                          title="Delete Scenario"
                          aria-label="Delete Scenario"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Panel (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  GUARANTEED MONTHLY CHECK
                </span>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setIsReportOpen(true)}
                  className="h-7 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold cursor-pointer"
                >
                  <Printer className="h-3 w-3 mr-1" /> PDF Report
                </Button>
              </div>

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400 font-sans tabular-nums mb-2">
                {fmt(mode1Results.monthlyWithdrawal)}/mo
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 font-medium mb-3">
                <span>
                  Total {mode1Results.totalPaymentsCount} Payments: <span className="font-bold text-white">{fmt(mode1Results.totalAmountWithdrawn)}</span>
                </span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-emerald-200">
                  Total Interest: {fmt(mode1Results.totalInterestEarned)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10 text-xs font-sans tabular-nums">
                <div>
                  <div className="text-zinc-400 text-[11px]">Withdrawal Rate</div>
                  <div className="font-bold text-white text-sm">{mode1Results.withdrawalRatePercent}% ({mode1Results.sustainabilityScore})</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Effective Yield</div>
                  <div className="font-bold text-emerald-300 text-sm">{mode1Results.effectiveYieldPercent}%</div>
                </div>
              </div>
            </div>

            {/* Principal vs Interest Donut Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Starting Principal vs. Interest Return Breakdown
              </h4>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
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

      {/* MODE 2: FIXED PAYMENT PAYOUT */}
      {activeTab === "fixedPayment" && (
        <div id="panel-fixedPayment" role="tabpanel" aria-labelledby="tab-fixedPayment" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Fixed Payment Payout Inputs
            </h3>

            <div className="space-y-1 text-xs">
              <label htmlFor="annuity-p2" className="font-semibold text-zinc-700 dark:text-zinc-300">Starting Principal ($)</label>
              <Input id="annuity-p2" type="number" value={principalInput} onChange={(e) => setPrincipalInput(e.target.value)} className="text-xs font-sans tabular-nums h-9 px-3" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label htmlFor="annuity-r2" className="font-semibold text-zinc-700 dark:text-zinc-300">Interest Rate (%)</label>
                <Input id="annuity-r2" type="number" value={rateInput} onChange={(e) => setRateInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label htmlFor="annuity-desired-pmt" className="font-semibold text-zinc-700 dark:text-zinc-300">Desired Monthly Check ($)</label>
                <Input id="annuity-desired-pmt" type="number" value={desiredPaymentInput} onChange={(e) => setDesiredPaymentInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-emerald-900 dark:text-emerald-200 text-sm block border-b pb-1">
                Funds Depletion Schedule
              </span>
              {mode2Results.isInfinite ? (
                <div className="text-xl font-extrabold text-emerald-600 font-sans">
                  Funds Will Never Deplete! (Interest exceeds withdrawal)
                </div>
              ) : (
                <>
                  <div className="text-3xl font-extrabold text-emerald-600 font-sans">
                    {mode2Results.yearsUntilDepleted} Years ({mode2Results.monthsUntilDepleted} Months)
                  </div>
                  <div className="font-sans text-zinc-600 dark:text-zinc-400">
                    Total Amount Withdrawn: <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">{fmt(mode2Results.totalAmountWithdrawn)}</span>
                  </div>
                  <div className="font-sans text-zinc-600 dark:text-zinc-400">
                    Total Interest Earned: <span className="font-bold text-indigo-600 font-sans tabular-nums">{fmt(mode2Results.totalInterestEarned)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: LIFE EXPECTANCY PAYOUT */}
      {activeTab === "lifeExpectancy" && (
        <div id="panel-lifeExpectancy" role="tabpanel" aria-labelledby="tab-lifeExpectancy" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Single Life Expectancy Payout Solver
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="annuity-age" className="font-semibold text-zinc-700 dark:text-zinc-300">Your Current Age</label>
                  <Input id="annuity-age" type="number" min="50" max="95" value={currentAgeInput} onChange={(e) => setCurrentAgeInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="annuity-gender" className="font-semibold text-zinc-700 dark:text-zinc-300">Gender</label>
                  <select
                    id="annuity-gender"
                    value={genderInput}
                    onChange={(e) => setGenderInput(e.target.value as any)}
                    className="w-full h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-xs cursor-pointer"
                  >
                    <option value="male">Male (Base 83 Yrs)</option>
                    <option value="female">Female (Base 86 Yrs)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="annuity-r3" className="font-semibold text-zinc-700 dark:text-zinc-300">Expected Return (%)</label>
                  <Input id="annuity-r3" type="number" value={rateInput} onChange={(e) => setRateInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="annuity-inf3" className="font-semibold text-zinc-700 dark:text-zinc-300">Inflation Rate (%)</label>
                  <Input id="annuity-inf3" type="number" value={inflationInput} onChange={(e) => setInflationInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
                </div>
              </div>
            </div>

            <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 p-5 rounded-xl space-y-3 font-sans tabular-nums">
              <span className="font-sans font-bold text-rose-900 dark:text-rose-200 text-sm block border-b pb-1">
                Lifetime Sustainable Payout
              </span>
              <div className="flex justify-between">
                <span>Actuarial Life Expectancy:</span>
                <span className="font-bold">{mode3Results.estimatedLifeExpectancyYears} Years (End Age: {mode3Results.estimatedEndAge})</span>
              </div>
              <div className="flex justify-between text-base">
                <span>Sustainable Monthly Income:</span>
                <span className="font-extrabold text-rose-600">{fmt(mode3Results.sustainableMonthlyIncome)}/mo</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-zinc-600">
                <span>Purchasing Power Loss:</span>
                <span className="font-bold text-amber-600">-{mode3Results.purchasingPowerLossPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 4: JOINT LIFE PAYOUT */}
      {activeTab === "jointLife" && (
        <div id="panel-jointLife" role="tabpanel" aria-labelledby="tab-jointLife" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Joint Life Payout Solver (Primary Worker + Spouse)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="annuity-primary-age" className="font-semibold text-zinc-700 dark:text-zinc-300">Primary Age</label>
                  <Input id="annuity-primary-age" type="number" value={currentAgeInput} onChange={(e) => setCurrentAgeInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="annuity-spouse-age" className="font-semibold text-zinc-700 dark:text-zinc-300">Spouse Age</label>
                  <Input id="annuity-spouse-age" type="number" value={spouseAgeInput} onChange={(e) => setSpouseAgeInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-5 rounded-xl space-y-3 font-sans tabular-nums">
              <span className="font-sans font-bold text-purple-900 dark:text-purple-200 text-sm block border-b pb-1">
                Joint Survival Payout
              </span>
              <div className="flex justify-between">
                <span>Joint Life Duration:</span>
                <span className="font-bold">{mode4Results.jointLifeExpectancyYears} Years (Joint End Age: {mode4Results.jointEndAge})</span>
              </div>
              <div className="flex justify-between text-base">
                <span>Joint Monthly Income:</span>
                <span className="font-extrabold text-purple-600">{fmt(mode4Results.sustainableMonthlyIncome)}/mo</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 5: IMMEDIATE VS DEFERRED COMPARISON */}
      {activeTab === "immVsDef" && (
        <div id="panel-immVsDef" role="tabpanel" aria-labelledby="tab-immVsDef" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Immediate vs. Deferred Annuity Payout Comparison
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-sans tabular-nums">
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 block text-sm">Immediate Annuity (Start Now)</span>
              <div className="mt-2 text-xl font-extrabold text-indigo-600">{fmt(mode5Results.immediateMonthlyIncome)}/mo</div>
              <div className="font-sans text-[10px] text-zinc-500 mt-1">Total Lifetime: {fmt(mode5Results.immediateTotalLifetime)}</div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
              <span className="font-sans font-bold text-amber-900 dark:text-amber-200 block text-sm">Deferred Annuity (Defer 10 Yrs)</span>
              <div className="mt-2 text-xl font-extrabold text-amber-600">{fmt(mode5Results.deferredMonthlyIncome)}/mo</div>
              <div className="font-sans text-[10px] text-zinc-500 mt-1">Accumulated Balance: {fmt(mode5Results.deferredAccumulatedBalance)}</div>
              <div className="font-sans text-[11px] font-bold text-emerald-600 mt-1">Advantage: +{fmt(mode5Results.deferredAdvantage)}</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: VISUAL DASHBOARDS */}
      {activeTab === "charts" && (
        <div id="panel-charts" role="tabpanel" aria-labelledby="tab-charts" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            Balance Depletion &amp; Interest Growth Charts
          </h3>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mode1Results.schedule}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="period" tick={{ fontSize: 11 }} label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v / 1000}k`} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                <Legend />
                <Area type="monotone" dataKey="beginningBalance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="Remaining Balance ($)" />
                <Area type="monotone" dataKey="interestEarned" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Interest Earned ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* TAB 7: SCHEDULES & EXPORT */}
      {activeTab === "schedule" && (
        <div id="panel-schedule" role="tabpanel" aria-labelledby="tab-schedule" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Amortization Style Payout Schedule
            </h3>

            <Button type="button" size="sm" variant="outline" onClick={exportCSV} className="h-8 text-xs cursor-pointer">
              <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-900 dark:text-zinc-100">
                <tr>
                  <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Year</th>
                  <th className="p-2.5 text-right border-b border-zinc-200 dark:border-zinc-700">Beginning Balance</th>
                  <th className="p-2.5 text-right text-emerald-600 border-b border-zinc-200 dark:border-zinc-700">Interest Earned</th>
                  <th className="p-2.5 text-right text-rose-600 border-b border-zinc-200 dark:border-zinc-700">Withdrawals</th>
                  <th className="p-2.5 text-right text-indigo-600 border-b border-zinc-200 dark:border-zinc-700">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums">
                {mode1Results.schedule.map((row) => (
                  <tr key={row.period} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2.5 font-bold font-sans text-zinc-800 dark:text-zinc-200">{row.label}</td>
                    <td className="p-2.5 text-right">{fmt(row.beginningBalance)}</td>
                    <td className="p-2.5 text-right text-emerald-600">{fmt(row.interestEarned)}</td>
                    <td className="p-2.5 text-right text-rose-600">{fmt(row.withdrawals)}</td>
                    <td className="p-2.5 text-right font-bold text-indigo-600">{fmt(row.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />
    </div>
  );
}

export default AnnuityPayoutCalculator;
