"use client";

import React, { useState, useMemo } from "react";
import {
  Heart,
  Calendar,
  Sparkles,
  Clock,
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
} from "recharts";
import { calculatePregnancyConceptionCalculator } from "@/app/calculators/pregnancy-conception-calculator/calculator";
import {
  ConceptionCalculationMode,
  IvfEmbryoType,
} from "@/app/calculators/pregnancy-conception-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function PregnancyConceptionCalculator() {
  // Inputs State
  const [calculationMode, setCalculationMode] = useState<ConceptionCalculationMode>("due-date");
  const [dueDate, setDueDate] = useState<string>("2026-10-08");
  const [lmpDate, setLmpDate] = useState<string>("2026-01-01");
  const [ultrasoundDate, setUltrasoundDate] = useState<string>("2026-03-01");
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState<number>(10);
  const [ultrasoundDays, setUltrasoundDays] = useState<number>(2);
  const [conceptionDate, setConceptionDate] = useState<string>("2026-01-15");
  const [ovulationDate, setOvulationDate] = useState<string>("2026-01-15");
  const [ivfTransferDate, setIvfTransferDate] = useState<string>("2026-04-15");
  const [ivfEmbryoType, setIvfEmbryoType] = useState<IvfEmbryoType>("day5");

  // Advanced cycle options
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [lutealPhaseLength, setLutealPhaseLength] = useState<number>(14);
  const [motherAge, setMotherAge] = useState<number>(28);

  // Tab View State
  const [activeTab, setActiveTab] = useState<"probability" | "timeline" | "implantation" | "insights">("probability");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Calculation memo
  const results = useMemo(() => {
    return calculatePregnancyConceptionCalculator({
      calculationMode,
      dueDate,
      lmpDate,
      ultrasoundDate,
      ultrasoundWeeks,
      ultrasoundDays,
      conceptionDate,
      ovulationDate,
      ivfTransferDate,
      ivfEmbryoType,
      cycleLength,
      lutealPhaseLength,
      motherAge,
    });
  }, [
    calculationMode,
    dueDate,
    lmpDate,
    ultrasoundDate,
    ultrasoundWeeks,
    ultrasoundDays,
    conceptionDate,
    ovulationDate,
    ivfTransferDate,
    ivfEmbryoType,
    cycleLength,
    lutealPhaseLength,
    motherAge,
  ]);

  // Copy Summary Handler
  const handleCopySummary = () => {
    const text = `Pregnancy Conception Summary:
• Mode: ${results.calculationMode.toUpperCase()}
• Estimated Conception Date: ${results.estimatedConceptionDateFormatted}
• Most Probable Intercourse Window: ${results.fertileWindowFormatted}
• Estimated Implantation Window: ${results.implantationWindowFormatted}
• Estimated Due Date: ${results.estimatedDueDateFormatted}
• Earliest Home Pregnancy Test: ${results.earliestHcgUrineTestDateFormatted}
Calculated on CalcPlatform Fertility Engine.`;
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
    link.setAttribute("download", `pregnancy_conception_timeline_${results.estimatedConceptionDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Construct PDF Report Data for ReportModal
  const reportData: CalculatorReportData = useMemo(() => {
    const now = new Date();
    return {
      meta: {
        calculatorName: "Pregnancy Conception Platform",
        reportTitle: "Clinical Conception & Gestational Timeline Report",
        generatedDate: now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        generatedTime: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      },
      keyMetrics: [
        {
          label: "Estimated Conception Date",
          value: results.estimatedConceptionDateFormatted,
          subtitle: `Confidence: ${results.confidenceRangeLabel}`,
          colorTheme: "rose",
        },
        {
          label: "Fertile Intercourse Window",
          value: results.fertileWindowFormatted,
          subtitle: "Peak Sperm-Egg Viability",
          colorTheme: "purple",
        },
        {
          label: "Estimated Implantation Range",
          value: results.implantationWindowFormatted,
          subtitle: "6 to 12 Days Post-Conception",
          colorTheme: "emerald",
        },
        {
          label: "Estimated Due Date (EDD)",
          value: results.estimatedDueDateFormatted,
          subtitle: "40 Weeks Gestational Age",
          colorTheme: "blue",
        },
      ],
      sections: [
        {
          title: "User Inputs & Calculation Settings",
          items: [
            { label: "Calculation Mode", value: calculationMode.toUpperCase() },
            { label: "Cycle Length", value: `${cycleLength} Days` },
            { label: "Luteal Phase Length", value: `${lutealPhaseLength} Days` },
            { label: "Mother's Age", value: `${motherAge} Years` },
            {
              label: "Primary Input Date",
              value:
                calculationMode === "due-date"
                  ? dueDate
                  : calculationMode === "lmp"
                  ? lmpDate
                  : calculationMode === "ultrasound"
                  ? `${ultrasoundDate} (${ultrasoundWeeks}w ${ultrasoundDays}d)`
                  : calculationMode === "ivf"
                  ? `${ivfTransferDate} (${ivfEmbryoType.toUpperCase()})`
                  : conceptionDate,
            },
          ],
        },
        {
          title: "Key Developmental & Diagnostic Milestones",
          items: [
            { label: "Estimated Ovulation / Conception", value: results.estimatedOvulationDateFormatted, highlight: true },
            { label: "Fertile Intercourse Window", value: results.fertileWindowFormatted, highlight: true },
            { label: "Embryo Implantation Window", value: results.implantationWindowFormatted },
            { label: "Earliest Quantitative Blood hCG", value: results.earliestHcgBloodTestDateFormatted },
            { label: "Earliest Home Urine hCG Test", value: results.earliestHcgUrineTestDateFormatted, highlight: true },
            { label: "Fetal Heartbeat Ultrasound", value: results.fetalHeartbeatDateFormatted },
            { label: "Estimated Due Date (EDD)", value: results.estimatedDueDateFormatted, highlight: true },
          ],
        },
      ],
      recommendation: {
        title: `Clinical Summary for ${results.estimatedConceptionDateFormatted}`,
        text: `Based on the ${results.calculationMode} method, conception occurred on or around ${results.estimatedConceptionDateFormatted}. Fertile intercourse likely took place between ${results.fertileWindowStartFormatted} and ${results.fertileWindowEndFormatted}.`,
        reasons: [
          `Earliest reliable home urine test date: ${results.earliestHcgUrineTestDateFormatted}.`,
          "First-trimester obstetric ultrasound (Weeks 7–12) offers highest clinical accuracy for confirming gestational age.",
          "Ensure daily 600 mcg Folic Acid supplementation to protect early neural tube development.",
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
        "Generated by CalcPlatform Pregnancy Conception Engine.",
        "Clinical formulas grounded in ACOG & American Society for Reproductive Medicine (ASRM) standards.",
      ],
    };
  }, [results, calculationMode, cycleLength, lutealPhaseLength, motherAge, dueDate, lmpDate, ultrasoundDate, ultrasoundWeeks, ultrasoundDays, ivfTransferDate, ivfEmbryoType, conceptionDate]);

  return (
    <div className="space-y-6">
      {/* 1. Main Interactive Input & Control Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400">
              <Heart className="h-5 w-5 fill-pink-500/20" />
            </div>
            <div>
              <h2 className="text-base font-bold text-blue-600 dark:text-blue-400">
                Pregnancy Conception Estimator
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Select your calculation method to determine conception, ovulation, and fertile windows
              </p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 font-semibold self-start sm:self-auto border border-pink-200 dark:border-pink-800">
            ACOG & ASRM Clinical Algorithms
          </span>
        </div>

        {/* Calculation Mode Tabs */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Calculate Conception Based On:
          </label>
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl">
            <button
              type="button"
              onClick={() => setCalculationMode("due-date")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                calculationMode === "due-date"
                  ? "bg-pink-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Due Date
            </button>
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
              onClick={() => setCalculationMode("ovulation-date")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                calculationMode === "ovulation-date"
                  ? "bg-pink-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              Ovulation Date
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
              Reverse Dating
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
          </div>
        </div>

        {/* Dynamic Mode-Specific Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Mode 1: Due Date */}
          {calculationMode === "due-date" && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Estimated Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}

          {/* Mode 2: LMP */}
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

          {/* Mode 3: Ultrasound */}
          {calculationMode === "ultrasound" && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Ultrasound Date
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

          {/* Mode 4: Conception Date / Reverse */}
          {(calculationMode === "conception-date" || calculationMode === "reverse") && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Known / Target Conception Date
              </label>
              <input
                type="date"
                value={conceptionDate}
                onChange={(e) => setConceptionDate(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}

          {/* Mode 5: Ovulation Date */}
          {calculationMode === "ovulation-date" && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Known Ovulation Date
              </label>
              <input
                type="date"
                value={ovulationDate}
                onChange={(e) => setOvulationDate(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}

          {/* Mode 7: IVF Mode */}
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
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Embryo Development Type
                </label>
                <select
                  value={ivfEmbryoType}
                  onChange={(e) => setIvfEmbryoType(e.target.value as IvfEmbryoType)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="day5">Day 5 Blastocyst Transfer</option>
                  <option value="day3">Day 3 Embryo Transfer</option>
                  <option value="fresh-retrieval">Fresh Egg Retrieval Date</option>
                </select>
              </div>
            </>
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

          {/* Luteal Phase Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <span>Luteal Phase Duration</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">
                {lutealPhaseLength} Days
              </span>
            </div>
            <input
              type="range"
              min={9}
              max={18}
              value={lutealPhaseLength}
              onChange={(e) => setLutealPhaseLength(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          {/* Mother's Age */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Mother's Age
            </label>
            <input
              type="number"
              min={18}
              max={50}
              value={motherAge}
              onChange={(e) => setMotherAge(Number(e.target.value))}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      {/* 2. Hero Conception Result Card */}
      <div className="p-5 sm:p-6 rounded-2xl border bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent border-pink-500/20 text-zinc-900 dark:text-zinc-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-pink-500/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-pink-600 text-white shadow-xs">
              <Baby className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                Estimated Conception Date
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                {results.estimatedConceptionDateFormatted}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 dark:bg-zinc-800 border border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300">
              {results.confidenceRangeLabel}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-0.5">
            <span className="text-zinc-500 dark:text-zinc-400">Probable Fertilization Window</span>
            <p className="font-bold text-pink-600 dark:text-pink-400 text-sm">
              {results.conceptionRangeStartFormatted} – {results.conceptionRangeEndFormatted}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-0.5">
            <span className="text-zinc-500 dark:text-zinc-400">Most Fertile Intercourse Window</span>
            <p className="font-bold text-purple-600 dark:text-purple-400 text-sm">
              {results.fertileWindowFormatted}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-0.5">
            <span className="text-zinc-500 dark:text-zinc-400">Estimated Due Date (EDD)</span>
            <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              {results.estimatedDueDateFormatted}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Metric Dashboard Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Embryo Implantation Window</span>
            <Layers className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">
            {results.implantationWindowFormatted}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            6 to 12 Days Post-Ovulation
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Earliest Home Urine hCG Test</span>
            <Sparkles className="h-4 w-4 text-pink-500" />
          </div>
          <div className="text-base font-extrabold text-pink-600 dark:text-pink-400">
            {results.earliestHcgUrineTestDateFormatted}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Day of Missed Period (&gt;99% accuracy)
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Fetal Heartbeat Detection</span>
            <Activity className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-base font-extrabold text-purple-600 dark:text-purple-400">
            {results.fetalHeartbeatDateFormatted}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            ~6 Weeks Gestational Age Ultrasound
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Calculated LMP Date</span>
            <Calendar className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">
            {results.lmpDateFormatted}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Gestational Age Baseline (Week 0d)
          </p>
        </div>
      </div>

      {/* 4. Tab Navigation for Detailed Views */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3 overflow-x-auto">
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
            onClick={() => setActiveTab("timeline")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "timeline"
                ? "bg-pink-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" /> Gestational Milestone Timeline
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("implantation")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "implantation"
                ? "bg-pink-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Layers className="h-3.5 w-3.5" /> Implantation & HCG Schedule
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
            <Award className="h-3.5 w-3.5" /> Personalized Fertility Insights
          </button>
        </div>

        {/* TAB CONTENT 1: Conception Probability Curve */}
        {activeTab === "probability" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                Daily Conception Probability Curve
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Percentage probability of successful fertilization by intercourse day relative to ovulation.
              </p>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.probabilityCurve} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="probBand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="dayLabel" stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} unit="%" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 p-3 rounded-xl border border-zinc-800 shadow-xl text-xs space-y-1">
                            <p className="font-bold text-pink-400">{data.dateStr}</p>
                            <p>
                              Conception Likelihood: <strong>{data.probabilityPercent}%</strong>
                            </p>
                            <p className="text-zinc-400">Fertility Level: {data.fertilityLevel}</p>
                            <p className="text-[11px] text-zinc-300">{data.description}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="probabilityPercent"
                    stroke="#ec4899"
                    strokeWidth={3}
                    fill="url(#probBand)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB CONTENT 2: Pregnancy Milestone Timeline */}
        {activeTab === "timeline" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  Pregnancy Development & Milestone Schedule
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Calculated chronological progression from conception to full-term delivery.
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

        {/* TAB CONTENT 3: Implantation & HCG Schedule */}
        {activeTab === "implantation" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                Embryo Implantation Window (6 to 12 Days Post-Ovulation)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Implantation timing and biological progression after fertilization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {results.implantationStages.map((stage, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-pink-600 dark:text-pink-400">
                      Day {stage.dpo} Post-Ovulation
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-pink-100 dark:bg-pink-950 text-[10px] font-bold text-pink-700 dark:text-pink-300">
                      {stage.probabilityPercent}% Probability
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {stage.stageName}
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {stage.description}
                  </p>
                  <span className="text-[10px] font-semibold text-zinc-400 block pt-1">
                    Estimated Date: {stage.dateStr}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT 4: Personalized Insights */}
        {activeTab === "insights" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                Clinical & Fertility Insights
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Tailored recommendations based on maternal age, cycle length, and calculation mode.
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
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
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
            <Printer className="h-3.5 w-3.5" /> Print Report
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

export default PregnancyConceptionCalculator;
