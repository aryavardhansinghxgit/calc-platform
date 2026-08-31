"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Sparkles,
  Calendar,
  Activity,
  Download,
  Printer,
  Copy,
  RotateCcw,
  Share2,
  Check,
  TrendingUp,
  Award,
  ShieldCheck,
  Info,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { calculateOvulationCalculator } from "@/app/calculators/ovulation-calculator/calculator";
import {
  OvulationCalculationMode,
  FertilityGoal,
  CervicalMucusType,
  OpkResult,
} from "@/app/calculators/ovulation-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function OvulationCalculator() {
  // Inputs State
  const [calculationMode, setCalculationMode] = useState<OvulationCalculationMode>("lmp");
  const [lastPeriodDate, setLastPeriodDate] = useState<string>("2026-08-01");
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [lutealPhaseLength, setLutealPhaseLength] = useState<number>(14);

  const [nextPeriodDate, setNextPeriodDate] = useState<string>("2026-08-29");
  const [targetDueDate, setTargetDueDate] = useState<string>("2027-05-15");
  const [conceptionDate, setConceptionDate] = useState<string>("2026-08-15");
  const [reverseOvulationDate, setReverseOvulationDate] = useState<string>("2026-08-15");
  const [motherAge, setMotherAge] = useState<number>(28);
  const [fertilityGoal, setFertilityGoal] = useState<FertilityGoal>("general-conception");

  // Advanced Biomarkers
  const [opkTestDate, setOpkTestDate] = useState<string>("");
  const [opkResult, setOpkResult] = useState<OpkResult>("negative");
  const [cervicalMucus, setCervicalMucus] = useState<CervicalMucusType>("creamy");

  // Tab View & Feedback State
  const [activeTab, setActiveTab] = useState<"calendar" | "probability" | "hormones" | "insights">("calendar");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // URL Hydration on Mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const m = params.get("mode");
    if (m && ["lmp", "next-period", "due-date", "conception-date", "reverse", "advanced-planner"].includes(m)) {
      setCalculationMode(m as OvulationCalculationMode);
    }
    if (params.get("lmp")) setLastPeriodDate(params.get("lmp")!);
    if (params.get("nextPer")) setNextPeriodDate(params.get("nextPer")!);
    if (params.get("due")) setTargetDueDate(params.get("due")!);
    if (params.get("conception")) setConceptionDate(params.get("conception")!);
    if (params.get("revOv")) setReverseOvulationDate(params.get("revOv")!);
    if (params.get("cycle")) setCycleLength(Math.max(20, Math.min(45, Number(params.get("cycle")))));
    if (params.get("period")) setPeriodLength(Math.max(2, Math.min(10, Number(params.get("period")))));
    if (params.get("luteal")) setLutealPhaseLength(Math.max(9, Math.min(18, Number(params.get("luteal")))));
    if (params.get("goal")) setFertilityGoal(params.get("goal") as FertilityGoal);
  }, []);

  // Calculation Memo
  const results = useMemo(() => {
    return calculateOvulationCalculator({
      calculationMode,
      lastPeriodDate,
      cycleLength,
      periodLength,
      lutealPhaseLength,
      nextPeriodDate,
      targetDueDate,
      conceptionDate,
      reverseOvulationDate,
      opkTestDate,
      motherAge,
      fertilityGoal,
      opkResult,
      cervicalMucus,
    });
  }, [
    calculationMode,
    lastPeriodDate,
    cycleLength,
    periodLength,
    lutealPhaseLength,
    nextPeriodDate,
    targetDueDate,
    conceptionDate,
    reverseOvulationDate,
    opkTestDate,
    motherAge,
    fertilityGoal,
    opkResult,
    cervicalMucus,
  ]);

  // Reset Defaults Handler
  const handleResetDefaults = () => {
    setCalculationMode("lmp");
    setLastPeriodDate("2026-08-01");
    setCycleLength(28);
    setPeriodLength(5);
    setLutealPhaseLength(14);
    setNextPeriodDate("2026-08-29");
    setTargetDueDate("2027-05-15");
    setConceptionDate("2026-08-15");
    setReverseOvulationDate("2026-08-15");
    setMotherAge(28);
    setFertilityGoal("general-conception");
    setOpkTestDate("");
    setOpkResult("negative");
    setCervicalMucus("creamy");
  };

  // Share URL Handler
  const handleShareUrl = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("mode", calculationMode);
    url.searchParams.set("lmp", lastPeriodDate);
    url.searchParams.set("cycle", String(cycleLength));
    url.searchParams.set("period", String(periodLength));
    url.searchParams.set("luteal", String(lutealPhaseLength));
    if (calculationMode === "next-period") url.searchParams.set("nextPer", nextPeriodDate);
    if (calculationMode === "due-date") url.searchParams.set("due", targetDueDate);
    if (calculationMode === "conception-date") url.searchParams.set("conception", conceptionDate);
    if (calculationMode === "reverse") url.searchParams.set("revOv", reverseOvulationDate);
    url.searchParams.set("goal", fertilityGoal);

    navigator.clipboard.writeText(url.toString());
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  // Copy Summary Handler
  const handleCopySummary = () => {
    const text = `Ovulation & Fertility Assessment Summary:
• Mode: ${results.calculationMode.toUpperCase()}
• Cycle Length: ${results.cycleLength} Days | Luteal Phase: ${results.lutealPhaseLength} Days
• Predicted Ovulation Date: ${results.predictedOvulationDateFormatted}
• 6-Day Fertile Window: ${results.fertileWindowStartFormatted} – ${results.fertileWindowEndFormatted}
• Peak Fertility Window: ${results.peakFertilityStartFormatted} – ${results.peakFertilityEndFormatted}
• Daily Fertility Score: ${results.fertilityRating} (${results.dailyFertilityScore}/100 Index)
• Implantation Window: ${results.implantationWindowStartFormatted} – ${results.implantationWindowEndFormatted}
• Estimated Due Date (if conceived): ${results.estimatedDueDateFormatted}
Note: Population-level conception probability peaks at ~27%–33% (Wilcox et al. cohort).
Calculated on CalcPlatform Clinical Ovulation Engine.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // RFC-4180 Compliant CSV Export Handler via Blob
  const handleExportCsv = () => {
    const headers = ["Date ISO", "Day of Month", "Month", "Status", "Fertility Score Index", "Clinical Details"];
    const rows = results.monthlyCalendarDays.map((d) => [
      d.dateIso,
      d.dayOfMonth,
      d.monthName,
      d.status,
      d.fertilityScore,
      `"${d.description.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `fertility_schedule_${results.predictedOvulationDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Construct PDF Report Data for ReportModal
  const reportData: CalculatorReportData = useMemo(() => {
    const now = new Date();
    return {
      meta: {
        calculatorName: "Ovulation & Fertility Assessment Platform",
        reportTitle: "Clinical Ovulation Prediction & Cycle Schedule Report",
        generatedDate: now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        generatedTime: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      },
      keyMetrics: [
        {
          label: "Predicted Ovulation Date",
          value: results.predictedOvulationDateFormatted,
          subtitle: `Confidence: ${results.confidenceLabel}`,
          colorTheme: "rose",
        },
        {
          label: "6-Day Fertile Window",
          value: `${results.fertileWindowStartFormatted} – ${results.fertileWindowEndFormatted}`,
          subtitle: "Sperm Survival & Egg Viability Window",
          colorTheme: "emerald",
        },
        {
          label: "Peak Fertility Window",
          value: `${results.peakFertilityStartFormatted} – ${results.peakFertilityEndFormatted}`,
          subtitle: "High Conception Potential (-2 to 0 DPO)",
          colorTheme: "purple",
        },
        {
          label: "Estimated Due Date (If Conceived)",
          value: results.estimatedDueDateFormatted,
          subtitle: "40 Weeks Standard Gestational Age",
          colorTheme: "blue",
        },
      ],
      sections: [
        {
          title: "User Cycle Parameters & Fertility Settings",
          items: [
            { label: "Calculation Method", value: calculationMode.toUpperCase() },
            { label: "Cycle Length", value: `${cycleLength} Days` },
            { label: "Period Length", value: `${periodLength} Days` },
            { label: "Luteal Phase Length", value: `${lutealPhaseLength} Days` },
            { label: "Conception Timing Focus", value: fertilityGoal.toUpperCase() },
            {
              label: "Daily Fertility Score",
              value: `${results.dailyFertilityScore}/100 (${results.fertilityRating} Index)`,
              highlight: true,
            },
          ],
        },
        {
          title: "Diagnostic Timeline & Milestone Thresholds",
          items: [
            { label: "Estimated Ovulation Day", value: results.predictedOvulationDateFormatted, highlight: true },
            { label: "Implantation Window (6–12 DPO)", value: `${results.implantationWindowStartFormatted} – ${results.implantationWindowEndFormatted}` },
            { label: "Earliest Home Urine Test Date", value: results.earliestHcgUrineTestDateFormatted, highlight: true },
            { label: "Predicted Next Period Start", value: results.nextPeriodDateFormatted },
            { label: "Timing Guidance", value: results.timingRecommendation.bestWindow },
          ],
        },
      ],
      recommendation: {
        title: `Clinical Conception Strategy: ${results.predictedOvulationDateFormatted}`,
        text: `Your predicted ovulation date is ${results.predictedOvulationDateFormatted}. Your 6-day fertile window is ${results.fertileWindowStartFormatted} through ${results.fertileWindowEndFormatted}.`,
        reasons: [
          `Peak fertility occurs on ${results.peakFertilityStartFormatted} through ${results.predictedOvulationDateFormatted}.`,
          results.timingRecommendation.explanation,
          "Daily BBT tracking combined with OPK LH surge monitoring provides biological confirmation of physiological ovulation.",
        ],
      },
      table: {
        title: "Monthly Fertility Calendar Schedule",
        headers: [
          { key: "dateIso", label: "Date", align: "left" },
          { key: "dayOfMonth", label: "Day", align: "left" },
          { key: "status", label: "Fertility Status", align: "left" },
          { key: "fertilityScore", label: "Score Index", align: "left" },
          { key: "description", label: "Clinical Notes", align: "left" },
        ],
        rows: results.monthlyCalendarDays.slice(0, 35).map((d) => ({
          dateIso: d.dateIso,
          dayOfMonth: `${d.monthName} ${d.dayOfMonth}`,
          status: d.status.toUpperCase(),
          fertilityScore: `${d.fertilityScore}/100`,
          description: d.description,
        })),
      },
      notes: [
        "Generated by CalcPlatform Ovulation Clinical Engine.",
        "Grounded in ASRM, ACOG, and WHO reproductive clinical guidelines.",
        "Population-level conception probability peaks at ~27%–33% (Wilcox et al. cohort).",
      ],
    };
  }, [results, calculationMode, cycleLength, periodLength, lutealPhaseLength, fertilityGoal]);

  return (
    <div className="space-y-6">
      {/* 1. Main Interactive Input & Control Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-blue-600 dark:text-blue-400">
                Ovulation &amp; Fertility Assessment Platform
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Predict your fertile window, peak ovulation day, and cycle schedule using ASRM clinical algorithms
              </p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 font-semibold self-start sm:self-auto border border-pink-200 dark:border-pink-800">
            ASRM Clinical Standards
          </span>
        </div>

        {/* 6 Calculation Mode Tabs */}
        <div className="space-y-2">
          <label id="ov-calc-mode-label" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Calculate Ovulation Based On:
          </label>
          <div
            role="tablist"
            aria-labelledby="ov-calc-mode-label"
            className="flex flex-wrap gap-1.5 p-1.5 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl"
          >
            <button
              type="button"
              role="tab"
              aria-selected={calculationMode === "lmp"}
              onClick={() => setCalculationMode("lmp")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                calculationMode === "lmp"
                  ? "bg-pink-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Last Period (LMP)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={calculationMode === "next-period"}
              onClick={() => setCalculationMode("next-period")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                calculationMode === "next-period"
                  ? "bg-pink-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Next Period Date
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={calculationMode === "due-date"}
              onClick={() => setCalculationMode("due-date")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                calculationMode === "due-date"
                  ? "bg-pink-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Target Due Date
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={calculationMode === "conception-date"}
              onClick={() => setCalculationMode("conception-date")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                calculationMode === "conception-date"
                  ? "bg-pink-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Conception Date
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={calculationMode === "reverse"}
              onClick={() => setCalculationMode("reverse")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                calculationMode === "reverse"
                  ? "bg-pink-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Reverse Ovulation Date
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={calculationMode === "advanced-planner"}
              onClick={() => setCalculationMode("advanced-planner")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                calculationMode === "advanced-planner"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Symptothermal Planner
            </button>
          </div>
        </div>

        {/* Dynamic Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Mode 1 & Advanced: Last Period */}
          {(calculationMode === "lmp" || calculationMode === "advanced-planner") && (
            <div className="space-y-1.5">
              <label htmlFor="ov-lmp-date" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                First Day of Last Period (LMP)
              </label>
              <input
                id="ov-lmp-date"
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}

          {/* Mode 2: Next Period */}
          {calculationMode === "next-period" && (
            <div className="space-y-1.5">
              <label htmlFor="ov-next-period-date" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Next Expected Period Date
              </label>
              <input
                id="ov-next-period-date"
                type="date"
                value={nextPeriodDate}
                onChange={(e) => setNextPeriodDate(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}

          {/* Mode 3: Target Due Date */}
          {calculationMode === "due-date" && (
            <div className="space-y-1.5">
              <label htmlFor="ov-target-due-date" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Target Delivery Due Date
              </label>
              <input
                id="ov-target-due-date"
                type="date"
                value={targetDueDate}
                onChange={(e) => setTargetDueDate(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}

          {/* Mode 4: Conception Date */}
          {calculationMode === "conception-date" && (
            <div className="space-y-1.5">
              <label htmlFor="ov-conception-date" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Known Conception Date
              </label>
              <input
                id="ov-conception-date"
                type="date"
                value={conceptionDate}
                onChange={(e) => setConceptionDate(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}

          {/* Mode 5: Reverse Ovulation Date */}
          {calculationMode === "reverse" && (
            <div className="space-y-1.5">
              <label htmlFor="ov-reverse-ovulation-date" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Known / Confirmed Ovulation Date
              </label>
              <input
                id="ov-reverse-ovulation-date"
                type="date"
                value={reverseOvulationDate}
                onChange={(e) => setReverseOvulationDate(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}

          {/* Cycle Length Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <label htmlFor="ov-cycle-length">Average Cycle Length</label>
              <span className="font-bold text-pink-600 dark:text-pink-400">
                {cycleLength} Days
              </span>
            </div>
            <input
              id="ov-cycle-length"
              type="range"
              min={20}
              max={45}
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-pink-600"
            />
          </div>

          {/* Period Length Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <label htmlFor="ov-period-length">Menstrual Period Duration</label>
              <span className="font-bold text-purple-600 dark:text-purple-400">
                {periodLength} Days
              </span>
            </div>
            <input
              id="ov-period-length"
              type="range"
              min={2}
              max={10}
              value={periodLength}
              onChange={(e) => setPeriodLength(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          {/* Luteal Phase Length Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <label htmlFor="ov-luteal-phase">Luteal Phase Duration</label>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {lutealPhaseLength} Days
              </span>
            </div>
            <input
              id="ov-luteal-phase"
              type="range"
              min={9}
              max={18}
              value={lutealPhaseLength}
              onChange={(e) => setLutealPhaseLength(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Conception Timing Focus */}
          <div className="space-y-1.5">
            <label htmlFor="ov-fertility-goal" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Conception Timing Focus
            </label>
            <select
              id="ov-fertility-goal"
              value={fertilityGoal}
              onChange={(e) => setFertilityGoal(e.target.value as FertilityGoal)}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="general-conception">General Conception Optimization (6-Day Window)</option>
              <option value="fertile-window-optimization">Peak Fertile Window Focus (O-2 to O)</option>
              <option value="avoid-pregnancy">Natural Family Planning (Fertile Window Abstinence)</option>
            </select>
          </div>

          {/* Advanced Mode Symptothermal Inputs */}
          {calculationMode === "advanced-planner" && (
            <>
              <div className="space-y-1.5">
                <label htmlFor="ov-opk-test-date" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  OPK Positive Test Date (Optional)
                </label>
                <input
                  id="ov-opk-test-date"
                  type="date"
                  value={opkTestDate}
                  onChange={(e) => setOpkTestDate(e.target.value)}
                  placeholder="Date of positive LH surge"
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ov-opk-result" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Ovulation Predictor Kit (LH Surge)
                </label>
                <select
                  id="ov-opk-result"
                  value={opkResult}
                  onChange={(e) => setOpkResult(e.target.value as OpkResult)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="negative">Negative (Low LH)</option>
                  <option value="positive">Positive (LH Surge Detected)</option>
                  <option value="peak">Peak Surge (Highest Intensity)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ov-cervical-mucus" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Cervical Mucus Observation
                </label>
                <select
                  id="ov-cervical-mucus"
                  value={cervicalMucus}
                  onChange={(e) => setCervicalMucus(e.target.value as CervicalMucusType)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="dry">Dry / Low Fertility</option>
                  <option value="sticky">Sticky / Moderate Fertility</option>
                  <option value="creamy">Creamy / High Fertility</option>
                  <option value="egg-white">Egg-White (EWCM) / Peak Fertility</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 2. Hero Ovulation Result Card */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent border-pink-500/20 text-zinc-900 dark:text-zinc-100 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-pink-500/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-pink-600 text-white shadow-xs">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                Predicted Peak Ovulation Date
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                {results.predictedOvulationDateFormatted}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 dark:bg-zinc-800 border border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300">
              {results.confidenceLabel}
            </span>
          </div>
        </div>

        {/* Daily Fertility Score Meter (Separates relative score from population fecundability) */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-semibold">
            <span className="text-zinc-700 dark:text-zinc-300">
              Today&apos;s Fertility Index:{" "}
              <strong className="text-pink-600 dark:text-pink-400">
                {results.fertilityRating} Fertility ({results.dailyFertilityScore}/100 Score)
              </strong>
            </span>
            <span className="text-slate-600 dark:text-zinc-400 font-normal">
              Population Reference Fecundability: ~27%–33% on peak days
            </span>
          </div>
          <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-600 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, results.dailyFertilityScore))}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 italic m-0">
            {results.fecundabilityReferenceNote}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-0.5">
            <span className="text-zinc-500 dark:text-zinc-400">6-Day Fertile Window</span>
            <p className="font-bold text-pink-600 dark:text-pink-400 text-sm truncate">
              {results.fertileWindowStartFormatted} – {results.fertileWindowEndFormatted}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-0.5">
            <span className="text-zinc-500 dark:text-zinc-400">Peak Fertility Window</span>
            <p className="font-bold text-purple-600 dark:text-purple-400 text-sm truncate">
              {results.peakFertilityStartFormatted} – {results.peakFertilityEndFormatted}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-0.5">
            <span className="text-zinc-500 dark:text-zinc-400">Estimated Implantation Window</span>
            <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm truncate">
              {results.implantationWindowStartFormatted} – {results.implantationWindowEndFormatted}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-0.5">
            <span className="text-zinc-500 dark:text-zinc-400">EDD (If Conceived)</span>
            <p className="font-bold text-blue-600 dark:text-blue-400 text-sm truncate">
              {results.estimatedDueDateFormatted}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Tab Navigation for Interactive Visualizations & Calendar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("calendar")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "calendar"
                ? "bg-pink-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" /> Interactive Fertility Calendar
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("probability")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "probability"
                ? "bg-pink-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" /> Conception Probability Curve
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("hormones")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "hormones"
                ? "bg-pink-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Activity className="h-3.5 w-3.5" /> Hormone Cycle Chart
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("insights")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "insights"
                ? "bg-pink-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Award className="h-3.5 w-3.5" /> Clinical Guidance &amp; Insights
          </button>
        </div>

        {/* TAB 1: Interactive Monthly Fertility Calendar Grid */}
        {activeTab === "calendar" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  Interactive Fertility Calendar Grid ({results.monthlyCalendarDays.length} Days)
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Color-coded cycle roadmap detailing menstrual, fertile, peak, ovulation, and implantation windows.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportCsv}
                className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Download className="h-3.5 w-3.5" /> CSV Schedule
              </button>
            </div>

            {/* Legend Bar */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
              <span className="flex items-center gap-1 font-medium text-red-600">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span> Period
              </span>
              <span className="flex items-center gap-1 font-medium text-emerald-600">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> Fertile
              </span>
              <span className="flex items-center gap-1 font-medium text-purple-600">
                <span className="h-2.5 w-2.5 rounded-full bg-purple-600"></span> Peak
              </span>
              <span className="flex items-center gap-1 font-medium text-pink-600">
                <span className="h-2.5 w-2.5 rounded-full bg-pink-600"></span> Ovulation
              </span>
              <span className="flex items-center gap-1 font-medium text-amber-600">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span> Implantation
              </span>
              <span className="flex items-center gap-1 font-medium text-pink-700">
                <span className="h-2.5 w-2.5 rounded-full bg-pink-400"></span> Next Period
              </span>
            </div>

            {/* Calendar Tile Grid with dedicated calendar-grid class for print preservation */}
            <div className="calendar-grid grid grid-cols-7 gap-1.5 sm:gap-2">
              {results.monthlyCalendarDays.map((day, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-between min-h-[70px] ${
                    day.status === "ovulation"
                      ? "bg-pink-600 text-white border-pink-700 shadow-md ring-2 ring-pink-400"
                      : day.status === "peak"
                      ? "bg-purple-600 text-white border-purple-700 shadow-xs"
                      : day.status === "fertile"
                      ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                      : day.status === "menstrual"
                      ? "bg-red-500/15 border-red-500/30 text-red-900 dark:text-red-200"
                      : day.status === "implantation"
                      ? "bg-amber-500/15 border-amber-500/30 text-amber-900 dark:text-amber-200"
                      : day.status === "next-period"
                      ? "bg-pink-500/20 border-pink-500/40 text-pink-900 dark:text-pink-200 font-bold"
                      : "bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold opacity-80">
                    {day.dayOfWeekShort}
                  </span>
                  <span className="text-sm font-extrabold my-0.5">
                    {day.dayOfMonth}
                  </span>
                  <span className="text-[9px] truncate max-w-full opacity-90 px-1 font-semibold">
                    {day.status === "ovulation"
                      ? "OVULATION"
                      : day.status === "peak"
                      ? "PEAK"
                      : day.status === "fertile"
                      ? "FERTILE"
                      : day.status === "menstrual"
                      ? "PERIOD"
                      : day.status === "implantation"
                      ? "IMPLANT"
                      : day.status === "next-period"
                      ? "NEXT"
                      : day.monthName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Conception Probability Curve */}
        {activeTab === "probability" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                Daily Population Fecundability Curve (-5 DPO to +1 DPO)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Statistical population-level fertilization probabilities based on Wilcox et al. prospective cohort research data.
              </p>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.conceptionProbabilityCurve} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="probGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="dayLabel" stroke="#9ca3af" fontSize={11} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} unit="%" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 p-3 rounded-xl shadow-xl text-xs space-y-1">
                            <p className="font-bold text-pink-600 dark:text-pink-400">{data.dayLabel}</p>
                            <p>Reference Fecundability: <strong>{data.probabilityPercent}%</strong></p>
                            <p>Fertility Potential: <strong>{data.fertilityLevel}</strong></p>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{data.clinicalInterpretation}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="probabilityPercent" stroke="#ec4899" strokeWidth={2.5} fillOpacity={1} fill="url(#probGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 3: Dynamic Hormone Cycle Visualization */}
        {activeTab === "hormones" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                Modeled Hormone Fluctuations across {results.cycleLength}-Day Cycle (LH, Estrogen, Progesterone)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Conceptual endocrine curve dynamically mapped to your cycle length ({results.cycleLength} days) and luteal phase ({results.lutealPhaseLength} days).
              </p>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.hormoneCycleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="dayLabel" stroke="#9ca3af" fontSize={11} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 p-3 rounded-xl shadow-xl text-xs space-y-1">
                            <p className="font-bold text-pink-600 dark:text-pink-400">{data.dayLabel} Conceptual Levels</p>
                            <p className="text-pink-600 dark:text-pink-400">LH Relative Scale: <strong>{data.lh}</strong></p>
                            <p className="text-emerald-600 dark:text-emerald-400">Estrogen Relative Scale: <strong>{data.estrogen}</strong></p>
                            <p className="text-purple-600 dark:text-purple-400">Progesterone Relative Scale: <strong>{data.progesterone}</strong></p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line type="monotone" dataKey="lh" stroke="#ec4899" strokeWidth={2.5} name="LH Surge" dot={false} />
                  <Line type="monotone" dataKey="estrogen" stroke="#10b981" strokeWidth={2} name="Estrogen" dot={false} />
                  <Line type="monotone" dataKey="progesterone" stroke="#a855f7" strokeWidth={2} name="Progesterone" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 4: Clinical Guidance & Historical Shettles Evaluation */}
        {activeTab === "insights" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                Clinical Conception Timing &amp; Evidence-Based Insights
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Targeted timing recommendations based on your selected cycle parameters.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-pink-500/20 bg-pink-500/5 text-zinc-900 dark:text-zinc-100 space-y-2">
              <h4 className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                {results.timingRecommendation.title}
              </h4>
              <p className="text-xs font-bold">
                Optimal Intercourse Window: <span className="text-pink-600 dark:text-pink-400">{results.timingRecommendation.bestWindow}</span>
              </p>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                {results.timingRecommendation.explanation}
              </p>
            </div>

            {/* Historical Shettles Context Note */}
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-zinc-900 dark:text-zinc-100 space-y-1.5">
              <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="h-4 w-4 text-amber-600 shrink-0" />
                {results.historicalContextNote.title}
              </h4>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed m-0">
                {results.historicalContextNote.explanation}
              </p>
            </div>

            <div className="space-y-3">
              {results.personalizedInsights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 text-zinc-900 dark:text-zinc-100 space-y-1.5"
                >
                  <h5 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    {item.title}
                  </h5>
                  <p className="text-xs font-semibold leading-relaxed">{item.text}</p>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold leading-relaxed m-0">
                    <strong>Clinical Guidance:</strong> {item.advice}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Executive Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsReportOpen(true)}
            className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" /> Generate PDF Report
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" /> Print
          </button>
          <button
            type="button"
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleShareUrl}
            className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {shared ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
            {shared ? "Link Copied!" : "Share URL"}
          </button>
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Copy className="h-3.5 w-3.5" /> {copied ? "Copied!" : "Copy Summary"}
          </button>
        </div>
      </div>

      {/* PDF Report Modal Component */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        reportData={reportData}
      />
    </div>
  );
}

export default OvulationCalculator;
