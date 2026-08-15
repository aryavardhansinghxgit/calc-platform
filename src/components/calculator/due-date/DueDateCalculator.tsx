"use client";

import React, { useState, useMemo } from "react";
import {
  Clock,
  Calendar,
  Sparkles,
  Heart,
  Activity,
  CheckCircle2,
  AlertCircle,
  Download,
  Printer,
  Copy,
  Info,
  ShieldCheck,
  Zap,
  TrendingUp,
  Baby,
  Stethoscope,
  ChevronRight,
  Layers,
  Award,
  Apple,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { calculateDueDateCalculator } from "@/app/calculators/due-date-calculator/calculator";
import {
  DueDateCalculationMode,
  IvfTransferType,
} from "@/app/calculators/due-date-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function DueDateCalculator() {
  // Inputs State
  const [calculationMode, setCalculationMode] = useState<DueDateCalculationMode>("lmp");
  const [lmpDate, setLmpDate] = useState<string>("2026-01-01");
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [lutealPhaseLength, setLutealPhaseLength] = useState<number>(14);

  const [ultrasoundDate, setUltrasoundDate] = useState<string>("2026-03-01");
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState<number>(10);
  const [ultrasoundDays, setUltrasoundDays] = useState<number>(2);

  const [conceptionDate, setConceptionDate] = useState<string>("2026-01-15");
  const [ivfTransferDate, setIvfTransferDate] = useState<string>("2026-04-15");
  const [ivfEmbryoType, setIvfEmbryoType] = useState<IvfTransferType>("day5");

  const [targetDueDate, setTargetDueDate] = useState<string>("2026-10-08");
  const [motherAge, setMotherAge] = useState<number>(28);
  const [isFirstPregnancy, setIsFirstPregnancy] = useState<boolean>(true);

  // Tab View State
  const [activeTab, setActiveTab] = useState<"distribution" | "timeline" | "growth" | "insights">("distribution");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Calculation memo
  const results = useMemo(() => {
    return calculateDueDateCalculator({
      calculationMode,
      lmpDate,
      cycleLength,
      lutealPhaseLength,
      ultrasoundDate,
      ultrasoundWeeks,
      ultrasoundDays,
      conceptionDate,
      ivfTransferDate,
      ivfEmbryoType,
      targetDueDate,
      motherAge,
      isFirstPregnancy,
    });
  }, [
    calculationMode,
    lmpDate,
    cycleLength,
    lutealPhaseLength,
    ultrasoundDate,
    ultrasoundWeeks,
    ultrasoundDays,
    conceptionDate,
    ivfTransferDate,
    ivfEmbryoType,
    targetDueDate,
    motherAge,
    isFirstPregnancy,
  ]);

  // Copy Summary Handler
  const handleCopySummary = () => {
    const text = `Pregnancy Due Date Summary:
• Mode: ${results.calculationMode.toUpperCase()}
• Estimated Due Date (EDD): ${results.estimatedDueDateFormatted}
• Current Gestational Age: Week ${results.currentGestationalWeeks} (${results.currentGestationalWeeks}w ${results.currentGestationalDays}d)
• Full Term Window (39–40w): ${results.fullTermStartFormatted} – ${results.estimatedDueDateFormatted}
• Estimated Conception Date: ${results.estimatedConceptionDateFormatted}
• Fetal Size Comparison: ${results.fetalSizeFruit} (~${results.fetalLengthCm} cm, ~${results.fetalWeightGrams} g)
Calculated on CalcPlatform Due Date Engine.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // CSV Schedule Export Handler
  const handleExportCsv = () => {
    const headers = ["Milestone Key", "Title", "Target Date", "Gestational Age", "Category", "Description"];
    const rows = results.timelineMilestones.map((m) => [
      m.key,
      `"${m.title.replace(/"/g, '""')}"`,
      m.dateStr,
      `"${m.gestationalAge}"`,
      m.category,
      `"${m.description.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `due_date_timeline_${results.estimatedDueDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Construct PDF Report Data for ReportModal
  const reportData: CalculatorReportData = useMemo(() => {
    const now = new Date();
    return {
      meta: {
        calculatorName: "Pregnancy Due Date Platform",
        reportTitle: "Clinical Gestational Assessment & Delivery Timeline Report",
        generatedDate: now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        generatedTime: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      },
      keyMetrics: [
        {
          label: "Estimated Due Date (EDD)",
          value: results.estimatedDueDateFormatted,
          subtitle: `Confidence: ${results.confidenceRangeLabel}`,
          colorTheme: "rose",
        },
        {
          label: "Current Gestational Age",
          value: `Week ${results.currentGestationalWeeks} (${results.currentGestationalWeeks}w ${results.currentGestationalDays}d)`,
          subtitle: `Trimester ${results.currentTrimester}`,
          colorTheme: "purple",
        },
        {
          label: "Full-Term Delivery Window",
          value: `${results.fullTermStartFormatted} – ${results.estimatedDueDateFormatted}`,
          subtitle: "39 Weeks 0 Days – 40 Weeks 0 Days",
          colorTheme: "emerald",
        },
        {
          label: "Days Remaining",
          value: `${results.daysRemaining} Days`,
          subtitle: `~${results.weeksRemaining} Weeks Left`,
          colorTheme: "blue",
        },
      ],
      sections: [
        {
          title: "Maternal & Calculation Inputs",
          items: [
            { label: "Calculation Method", value: calculationMode.toUpperCase() },
            { label: "Cycle Length", value: `${cycleLength} Days` },
            { label: "Mother's Age", value: `${motherAge} Years` },
            { label: "First Pregnancy (Primipara)", value: isFirstPregnancy ? "Yes" : "No" },
            {
              label: "Primary Input Date",
              value:
                calculationMode === "lmp"
                  ? lmpDate
                  : calculationMode === "ultrasound"
                  ? `${ultrasoundDate} (${ultrasoundWeeks}w ${ultrasoundDays}d)`
                  : calculationMode === "ivf"
                  ? `${ivfTransferDate} (${ivfEmbryoType.toUpperCase()})`
                  : calculationMode === "reverse"
                  ? targetDueDate
                  : conceptionDate,
            },
          ],
        },
        {
          title: "Gestational Milestones & Delivery Categorization",
          items: [
            { label: "Estimated Conception Date", value: results.estimatedConceptionDateFormatted, highlight: true },
            { label: "Calculated LMP Baseline", value: results.estimatedLmpDateFormatted },
            { label: "Early Term Window (37–38w)", value: `${results.earlyTermStartFormatted} – ${results.fullTermStartFormatted}` },
            { label: "Optimal Full Term Window (39–40w)", value: `${results.fullTermStartFormatted} – ${results.estimatedDueDateFormatted}`, highlight: true },
            { label: "Late Term Window (41w)", value: `${results.estimatedDueDateFormatted} – ${results.lateTermStartFormatted}` },
            { label: "Postterm Threshold (42w+)", value: results.postTermStartFormatted },
            { label: "Fetal Size Fruit Analogy", value: `${results.fetalSizeFruit} (~${results.fetalLengthCm} cm, ~${results.fetalWeightGrams} g)`, highlight: true },
          ],
        },
      ],
      recommendation: {
        title: `Clinical Due Date Summary: ${results.estimatedDueDateFormatted}`,
        text: `Your estimated delivery date is ${results.estimatedDueDateFormatted}. Optimal full-term delivery is expected between ${results.fullTermStartFormatted} and ${results.estimatedDueDateFormatted}.`,
        reasons: [
          `Current Gestational Age: Week ${results.currentGestationalWeeks} (${results.progressPercent}% completed).`,
          "First-trimester Crown-Rump Length (CRL) ultrasound offers the highest precision (±3 to 5 days) for confirming EDD.",
          "Prepare hospital bag and newborn essential transport arrangements prior to Week 36.",
        ],
      },
      table: {
        title: "Pregnancy Gestational Timeline Schedule",
        headers: [
          { key: "title", label: "Milestone Event", align: "left" },
          { key: "dateStr", label: "Target Date", align: "left" },
          { key: "gestationalAge", label: "Gestational Age", align: "left" },
          { key: "description", label: "Clinical Details", align: "left" },
        ],
        rows: results.timelineMilestones.map((m) => ({
          title: m.title,
          dateStr: m.dateStr,
          gestationalAge: m.gestationalAge,
          description: m.description,
        })),
      },
      notes: [
        "Generated by CalcPlatform Due Date Clinical Engine.",
        "Grounded in ACOG Committee Opinion No. 700 & ASRM clinical guidelines.",
      ],
    };
  }, [results, calculationMode, cycleLength, motherAge, isFirstPregnancy, lmpDate, ultrasoundDate, ultrasoundWeeks, ultrasoundDays, ivfTransferDate, ivfEmbryoType, conceptionDate, targetDueDate]);

  return (
    <div className="space-y-6">
      {/* 1. Main Interactive Input & Control Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-blue-600 dark:text-blue-400">
                Pregnancy Due Date Estimator
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Calculate your estimated delivery date (EDD) using clinical ACOG algorithms
              </p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 font-semibold self-start sm:self-auto border border-pink-200 dark:border-pink-800">
            ACOG Clinical Standards
          </span>
        </div>

        {/* Calculation Mode Tabs */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Calculate Due Date Based On:
          </label>
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl">
            <button
              type="button"
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
              onClick={() => setCalculationMode("ultrasound")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                calculationMode === "ultrasound"
                  ? "bg-pink-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Ultrasound Scan
            </button>
            <button
              type="button"
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
              onClick={() => setCalculationMode("ivf")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                calculationMode === "ivf"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              IVF Transfer
            </button>
            <button
              type="button"
              onClick={() => setCalculationMode("reverse")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                calculationMode === "reverse"
                  ? "bg-pink-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Reverse Target Date
            </button>
          </div>
        </div>

        {/* Dynamic Mode Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Mode 1: LMP */}
          {calculationMode === "lmp" && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                First Day of Last Period (LMP)
              </label>
              <input
                type="date"
                value={lmpDate}
                onChange={(e) => setLmpDate(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}

          {/* Mode 2: Ultrasound */}
          {calculationMode === "ultrasound" && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Ultrasound Scan Date
                </label>
                <input
                  type="date"
                  value={ultrasoundDate}
                  onChange={(e) => setUltrasoundDate(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Gestational Age at Scan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      type="number"
                      min={4}
                      max={40}
                      value={ultrasoundWeeks}
                      onChange={(e) => setUltrasoundWeeks(Number(e.target.value))}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-zinc-400">wks</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      max={6}
                      value={ultrasoundDays}
                      onChange={(e) => setUltrasoundDays(Number(e.target.value))}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-zinc-400">days</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Mode 3: Conception Date */}
          {calculationMode === "conception-date" && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Known Conception Date
              </label>
              <input
                type="date"
                value={conceptionDate}
                onChange={(e) => setConceptionDate(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}

          {/* Mode 4: IVF */}
          {calculationMode === "ivf" && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  IVF Transfer Date
                </label>
                <input
                  type="date"
                  value={ivfTransferDate}
                  onChange={(e) => setIvfTransferDate(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Embryo Type
                </label>
                <select
                  value={ivfEmbryoType}
                  onChange={(e) => setIvfEmbryoType(e.target.value as IvfTransferType)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="day5">Day 5 Blastocyst Transfer</option>
                  <option value="day3">Day 3 Embryo Transfer</option>
                  <option value="fresh-retrieval">Fresh Egg Retrieval Date</option>
                </select>
              </div>
            </>
          )}

          {/* Mode 5: Reverse Mode */}
          {calculationMode === "reverse" && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Target Due Date
              </label>
              <input
                type="date"
                value={targetDueDate}
                onChange={(e) => setTargetDueDate(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}

          {/* Cycle Length Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <span>Menstrual Cycle Length</span>
              <span className="font-bold text-pink-600 dark:text-pink-400">
                {cycleLength} Days
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={45}
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-pink-600"
            />
          </div>

          {/* First Pregnancy Toggle */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <span>First Pregnancy? (Statistical Tuning)</span>
              <span className="text-[11px] font-bold text-pink-600 dark:text-pink-400">
                {isFirstPregnancy ? "First Baby (+3d)" : "Subsequent (-1d)"}
              </span>
            </div>
            <div className="flex items-center gap-2 p-1 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl">
              <button
                type="button"
                onClick={() => setIsFirstPregnancy(true)}
                className={`w-1/2 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isFirstPregnancy
                    ? "bg-pink-600 text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                Yes (First Baby)
              </button>
              <button
                type="button"
                onClick={() => setIsFirstPregnancy(false)}
                className={`w-1/2 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  !isFirstPregnancy
                    ? "bg-pink-600 text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                No (Subsequent)
              </button>
            </div>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
              Statistical Avg: <strong className="text-pink-600 dark:text-pink-400">{results.adjustedMittendorfDueDateFormatted}</strong> (Mittendorf-Williams Rule)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Hero Due Date Result Card & Progress Bar */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent border-pink-500/20 text-zinc-900 dark:text-zinc-100 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-pink-500/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-pink-600 text-white shadow-xs">
              <Baby className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                Estimated Delivery Due Date (EDD)
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                {results.estimatedDueDateFormatted}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 dark:bg-zinc-800 border border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300">
              {results.confidenceRangeLabel}
            </span>
          </div>
        </div>

        {/* Gestational Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-zinc-700 dark:text-zinc-300">
              Gestational Progress: Week {results.currentGestationalWeeks} ({results.currentGestationalWeeks}w {results.currentGestationalDays}d)
            </span>
            <span className="text-pink-600 dark:text-pink-400 font-bold">
              {results.progressPercent}% Complete
            </span>
          </div>
          <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, results.progressPercent))}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-0.5">
            <span className="text-zinc-500 dark:text-zinc-400">Countdown to Delivery</span>
            <p className="font-bold text-pink-600 dark:text-pink-400 text-sm">
              {results.daysRemaining} Days ({results.weeksRemaining} Weeks)
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-0.5">
            <span className="text-zinc-500 dark:text-zinc-400">Statistical Avg ({isFirstPregnancy ? "First Baby" : "Subsequent"})</span>
            <p className="font-bold text-amber-600 dark:text-amber-400 text-sm">
              {results.adjustedMittendorfDueDateFormatted}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-0.5">
            <span className="text-zinc-500 dark:text-zinc-400">Optimal Full-Term Window</span>
            <p className="font-bold text-purple-600 dark:text-purple-400 text-sm">
              {results.fullTermStartFormatted} – {results.estimatedDueDateFormatted}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-0.5">
            <span className="text-zinc-500 dark:text-zinc-400">Estimated Conception Date</span>
            <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              {results.estimatedConceptionDateFormatted}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Metric Dashboard Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Current Trimester</span>
            <Layers className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">
            Trimester {results.currentTrimester}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            {results.currentTrimester === 1
              ? "Weeks 1–13 (Organogenesis)"
              : results.currentTrimester === 2
              ? "Weeks 14–27 (Rapid Fetal Growth)"
              : "Weeks 28–40+ (Fat Deposition)"}
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Fetal Size Fruit Analogy</span>
            <Apple className="h-4 w-4 text-pink-500" />
          </div>
          <div className="text-base font-extrabold text-pink-600 dark:text-pink-400 truncate">
            {results.fetalSizeFruit}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            ~{results.fetalLengthCm} cm, ~{results.fetalWeightGrams} g
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Calculated LMP Baseline</span>
            <Calendar className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">
            {results.estimatedLmpDateFormatted}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Week 0d Gestational Baseline
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Earliest Home Pregnancy Test</span>
            <Sparkles className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
            {results.earliestHcgUrineTestDateFormatted}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Day of Missed Period (&gt;99% accuracy)
          </p>
        </div>
      </div>

      {/* 4. Tab Navigation for Detailed Views */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("distribution")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "distribution"
                ? "bg-pink-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" /> Delivery Probability Distribution
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("timeline")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "timeline"
                ? "bg-pink-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" /> 40-Week Gestational Timeline
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("growth")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "growth"
                ? "bg-pink-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Activity className="h-3.5 w-3.5" /> Fetal Growth & Weight Curve
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
            <Award className="h-3.5 w-3.5" /> Prenatal Insights
          </button>
        </div>

        {/* TAB CONTENT 1: Birth Probability Distribution Chart */}
        {activeTab === "distribution" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                Statistical Birth Timing Distribution (Weeks 36 to 42)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                ACOG & CDC birth timing data showing percentage probability of delivering by gestational week.
              </p>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={results.birthProbabilityDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="weekLabel" stroke="#9ca3af" fontSize={11} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} unit="%" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 p-3 rounded-xl border border-zinc-800 shadow-xl text-xs space-y-1">
                            <p className="font-bold text-pink-400">{data.weekLabel}</p>
                            <p>
                              Delivery Likelihood: <strong>{data.probabilityPercent}%</strong>
                            </p>
                            <p className="text-zinc-400">Classification: {data.termCategory}</p>
                            <p className="text-[11px] text-zinc-300">{data.description}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="probabilityPercent" radius={[6, 6, 0, 0]}>
                    {results.birthProbabilityDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.week === 40
                            ? "#ec4899"
                            : entry.week === 39
                            ? "#a855f7"
                            : entry.week >= 37 && entry.week <= 38
                            ? "#06b6d4"
                            : "#9ca3af"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB CONTENT 2: Gestational Milestone Timeline */}
        {activeTab === "timeline" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  Full 40-Week Gestational Timeline Schedule
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Chronological roadmap of key diagnostic scans, tests, and developmental milestones.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportCsv}
                className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" /> CSV Timeline
              </button>
            </div>

            <div className="space-y-3">
              {results.timelineMilestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-400 shrink-0 mt-0.5 sm:mt-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm m-0">
                        {m.title}
                      </h4>
                      <p className="text-zinc-500 dark:text-zinc-400 m-0 text-[11px] mt-0.5">
                        {m.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="font-extrabold text-pink-600 dark:text-pink-400 text-xs">
                      {m.dateStr}
                    </span>
                    <p className="text-[10px] text-zinc-400">{m.gestationalAge}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT 3: Fetal Growth Curve */}
        {activeTab === "growth" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                Fetal Length (cm) & Weight (g) Growth Curve (Weeks 8 to 40)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Average WHO fetal physical growth trajectory across pregnancy.
              </p>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.fetalGrowthCurve} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="weekLabel" stroke="#9ca3af" fontSize={11} tickLine={false} />
                  <YAxis yAxisId="left" stroke="#ec4899" fontSize={11} tickLine={false} unit="cm" />
                  <YAxis yAxisId="right" orientation="right" stroke="#a855f7" fontSize={11} tickLine={false} unit="g" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 p-3 rounded-xl border border-zinc-800 shadow-xl text-xs space-y-1">
                            <p className="font-bold text-pink-400">{data.weekLabel} Fetal Size</p>
                            <p>Fruit Analogy: <strong>{data.fruitAnalogy}</strong></p>
                            <p>Length: <strong>{data.lengthCm} cm</strong></p>
                            <p>Weight: <strong>{data.weightGrams} g</strong></p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="lengthCm" stroke="#ec4899" strokeWidth={2.5} name="Length (cm)" />
                  <Line yAxisId="right" type="monotone" dataKey="weightGrams" stroke="#a855f7" strokeWidth={2.5} name="Weight (g)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB CONTENT 4: Prenatal Insights */}
        {activeTab === "insights" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                Personalized Prenatal Insights
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Tailored clinical guidance based on your inputs and gestational age.
              </p>
            </div>

            <div className="space-y-3">
              {results.personalizedInsights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-pink-500/20 bg-pink-500/5 text-zinc-900 dark:text-zinc-100 space-y-1.5"
                >
                  <h4 className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider flex items-center gap-1.5">{item.title}
                  </h4>
                  <p className="text-xs font-semibold leading-relaxed">{item.text}</p>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                    <strong>Medical Tip:</strong> {item.advice}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Executive Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
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
        </div>

        <div className="flex items-center gap-2">
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

export default DueDateCalculator;
