"use client";

import React, { useState, useMemo } from "react";
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
import { AnnuityPayoutContent } from "./AnnuityPayoutContent";
import {
  calculateFixedLengthPayout,
  calculateFixedPaymentPayout,
  calculateLifeExpectancyPayout,
  calculateJointLifePayout,
  calculateImmediateVsDeferred,
  generateSmartInsights,
} from "@/lib/calculator-engine/formulas/annuity-payout";

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

  // Mode 6: Immediate vs Deferred Inputs
  const [deferralYearsInput, setDeferralYearsInput] = useState<string>("10");
  const [deferralGrowthInput, setDeferralGrowthInput] = useState<string>("6.0");

  // Schedule Search
  const [tableSearch, setTableSearch] = useState("");

  // Modal & Notification State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Compute Mode 1 Results (Fixed Length Baseline)
  const mode1Results = useMemo(() => {
    return calculateFixedLengthPayout({
      startingPrincipal: Number(principalInput) || 500000,
      interestRatePercent: Number(rateInput) || 6.0,
      yearsToPayout: Number(yearsInput) || 10,
      payoutFrequency: frequencyInput,
    });
  }, [principalInput, rateInput, yearsInput, frequencyInput]);

  // Compute Mode 2 Results (Fixed Payment Depletion)
  const mode2Results = useMemo(() => {
    return calculateFixedPaymentPayout({
      startingPrincipal: Number(principalInput) || 500000,
      interestRatePercent: Number(rateInput) || 6.0,
      desiredPaymentAmount: Number(desiredPaymentInput) || 5000,
      payoutFrequency: frequencyInput,
    });
  }, [principalInput, rateInput, desiredPaymentInput, frequencyInput]);

  // Compute Mode 3 Results (Life Expectancy)
  const mode3Results = useMemo(() => {
    return calculateLifeExpectancyPayout({
      currentAge: Number(currentAgeInput) || 65,
      gender: genderInput,
      startingPrincipal: Number(principalInput) || 500000,
      expectedReturnPercent: Number(rateInput) || 6.0,
      inflationRatePercent: Number(inflationInput) || 2.5,
    });
  }, [currentAgeInput, genderInput, principalInput, rateInput, inflationInput]);

  // Compute Mode 4 Results (Joint Life)
  const mode4Results = useMemo(() => {
    return calculateJointLifePayout({
      primaryAge: Number(currentAgeInput) || 65,
      spouseAge: Number(spouseAgeInput) || 63,
      startingPrincipal: Number(principalInput) || 500000,
      expectedReturnPercent: Number(rateInput) || 6.0,
    });
  }, [currentAgeInput, spouseAgeInput, principalInput, rateInput]);

  // Compute Mode 6 Results (Immediate vs Deferred)
  const mode6Results = useMemo(() => {
    return calculateImmediateVsDeferred({
      startingPrincipal: Number(principalInput) || 500000,
      currentAge: Number(currentAgeInput) || 65,
      deferralYears: Number(deferralYearsInput) || 10,
      growthDuringDeferralPercent: Number(deferralGrowthInput) || 6.0,
      payoutReturnPercent: Number(rateInput) || 6.0,
      payoutYears: Number(yearsInput) || 10,
    });
  }, [principalInput, currentAgeInput, deferralYearsInput, deferralGrowthInput, rateInput, yearsInput]);

  // Compute Smart Insights
  const smartInsights = useMemo(() => {
    return generateSmartInsights(mode1Results, Number(inflationInput) || 2.5);
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

  // Copy Summary
  const copySummary = () => {
    const text = `Annuity Payout Summary:
------------------------------------------------
Starting Principal: ${fmt(mode1Results.startingPrincipal)}
Interest/Return Rate: ${rateInput}%
Years to Payout: ${yearsInput} Years (${frequencyInput})
------------------------------------------------
Monthly Payout Check: ${fmt(mode1Results.monthlyWithdrawal)}/mo
Total Amount Withdrawn: ${fmt(mode1Results.totalAmountWithdrawn)}
Total Interest Earned: ${fmt(mode1Results.totalInterestEarned)}
Withdrawal Rate: ${mode1Results.withdrawalRatePercent}% (${mode1Results.sustainabilityScore})`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
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
      r.beginningBalance,
      r.interestEarned,
      r.withdrawals,
      r.endingBalance,
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

  // Recharts Donut Data
  const donutData = [
    { name: "Starting Principal", value: mode1Results.startingPrincipal, color: "#3b82f6" },
    { name: "Interest / Return", value: mode1Results.totalInterestEarned, color: "#10b981" },
  ];

  // Report Modal Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Annuity Payout & Income Strategy Suite",
      reportTitle: "Annuity Payout Analysis Report",
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
        label: "Total Amount Withdrawn",
        value: fmt(mode1Results.totalAmountWithdrawn),
        subtitle: `${mode1Results.totalPaymentsCount} total payments`,
        colorTheme: "blue",
      },
      {
        label: "Total Interest Earned",
        value: fmt(mode1Results.totalInterestEarned),
        subtitle: `${mode1Results.interestPercentage}% generated from growth`,
        colorTheme: "purple",
      },
    ],
    sections: [
      {
        title: "Fixed Length Payout Summary",
        items: [
          { label: "Starting Principal", value: fmt(mode1Results.startingPrincipal) },
          { label: "Interest / Return Rate", value: `${rateInput}%` },
          { label: "Years to Payout", value: `${yearsInput} Years` },
          { label: "Payout Frequency", value: frequencyInput },
          { label: "Monthly Withdrawal", value: fmt(mode1Results.monthlyWithdrawal), highlight: true },
          { label: "Annual Withdrawal", value: fmt(mode1Results.annualWithdrawal), highlight: true },
          { label: "Total Amount Withdrawn", value: fmt(mode1Results.totalAmountWithdrawn) },
          { label: "Total Interest Earned", value: fmt(mode1Results.totalInterestEarned) },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
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
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            Calculator.net Baseline ($500k @ 6% for 10 Yrs)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(300000, 5.0, 20)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            $300k @ 5% for 20 Yrs
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(750000, 7.0, 15)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            $750k @ 7% for 15 Yrs
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Monthly Check:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-sans tabular-nums text-sm">
            {fmt(mode1Results.monthlyWithdrawal)}/mo
          </span>
        </div>
      </div>

      {/* Navigation Tabs for all 6 Calculation Modes */}
      <div className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
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

      {/* MODE 1: FIXED LENGTH PAYOUT (Calculator.net Tab 1) */}
      {activeTab === "fixedLength" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Fixed Length Payout Inputs
              </h3>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Starting Principal ($)</label>
                <Input
                  type="number"
                  min="10000"
                  step="25000"
                  value={principalInput}
                  onChange={(e) => setPrincipalInput(e.target.value)}
                  className="text-xs font-sans tabular-nums h-9 px-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Interest/Return Rate (%)</label>
                  <Input
                    type="number"
                    min="0.1"
                    max="20"
                    step="0.25"
                    value={rateInput}
                    onChange={(e) => setRateInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Years to Payout</label>
                  <Input
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
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Payout Frequency</label>
                <select
                  value={frequencyInput}
                  onChange={(e) => setFrequencyInput(e.target.value as any)}
                  className="w-full h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-xs"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semiannual">Semi-Annual</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Panel (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  GUARANTEED MONTHLY CHECK
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

            {/* Principal vs Interest Donut Chart matching Calculator.net */}
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

      {/* MODE 2: FIXED PAYMENT PAYOUT (Calculator.net Tab 2) */}
      {activeTab === "fixedPayment" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Fixed Payment Payout Inputs
            </h3>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Starting Principal ($)</label>
              <Input type="number" value={principalInput} onChange={(e) => setPrincipalInput(e.target.value)} className="text-xs font-sans tabular-nums h-9 px-3" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Interest Rate (%)</label>
                <Input type="number" value={rateInput} onChange={(e) => setRateInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Desired Monthly Check ($)</label>
                <Input type="number" value={desiredPaymentInput} onChange={(e) => setDesiredPaymentInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
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
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Single Life Expectancy Payout Solver
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Your Current Age</label>
                  <Input type="number" min="50" max="95" value={currentAgeInput} onChange={(e) => setCurrentAgeInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Gender</label>
                  <select
                    value={genderInput}
                    onChange={(e) => setGenderInput(e.target.value as any)}
                    className="w-full h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-xs"
                  >
                    <option value="male">Male (Base 83 Yrs)</option>
                    <option value="female">Female (Base 86 Yrs)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Expected Return (%)</label>
                  <Input type="number" value={rateInput} onChange={(e) => setRateInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Inflation Rate (%)</label>
                  <Input type="number" value={inflationInput} onChange={(e) => setInflationInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
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
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Joint Life Payout Solver (Primary Worker + Spouse)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Primary Age</label>
                  <Input type="number" value={currentAgeInput} onChange={(e) => setCurrentAgeInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Spouse Age</label>
                  <Input type="number" value={spouseAgeInput} onChange={(e) => setSpouseAgeInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
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
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Immediate vs. Deferred Annuity Payout Comparison
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-sans tabular-nums">
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 block text-sm">Immediate Annuity (Start Now)</span>
              <div className="mt-2 text-xl font-extrabold text-indigo-600">{fmt(mode6Results.immediateMonthlyIncome)}/mo</div>
              <div className="font-sans text-[10px] text-zinc-500 mt-1">Total Lifetime: {fmt(mode6Results.immediateTotalLifetime)}</div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
              <span className="font-sans font-bold text-amber-900 dark:text-amber-200 block text-sm">Deferred Annuity (Defer 10 Yrs)</span>
              <div className="mt-2 text-xl font-extrabold text-amber-600">{fmt(mode6Results.deferredMonthlyIncome)}/mo</div>
              <div className="font-sans text-[10px] text-zinc-500 mt-1">Accumulated Balance: {fmt(mode6Results.deferredAccumulatedBalance)}</div>
              <div className="font-sans text-[11px] font-bold text-emerald-600 mt-1">Advantage: +{fmt(mode6Results.deferredAdvantage)}</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: VISUAL DASHBOARDS */}
      {activeTab === "charts" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Balance Depletion &amp; Interest Growth Charts
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
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Amortization Style Payout Schedule
            </h3>

            <Button type="button" size="sm" variant="outline" onClick={exportCSV} className="h-8 text-xs cursor-pointer">
              <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-2.5">Year</th>
                  <th className="p-2.5 text-right">Beginning Balance</th>
                  <th className="p-2.5 text-right text-emerald-600">Interest Earned</th>
                  <th className="p-2.5 text-right text-rose-600">Withdrawals</th>
                  <th className="p-2.5 text-right text-indigo-600">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px] font-sans tabular-nums">
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

      {/* Educational Content & 15 FAQs */}
      <AnnuityPayoutContent />
    </div>
  );
}
