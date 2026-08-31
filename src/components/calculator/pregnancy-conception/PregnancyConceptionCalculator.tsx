"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Heart,
  Calendar,
  Activity,
  Baby,
  Sparkles,
  Download,
  Printer,
  Copy,
  Clock,
  RotateCcw,
  Share2,
  Check,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

  // Tab View State & Action Feedback
  const [activeTab, setActiveTab] = useState<"probability" | "timeline" | "implantation" | "insights">("probability");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // URL Hydration on Mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const m = params.get("mode");
    if (m && ["due-date", "lmp", "ultrasound", "conception-date", "ovulation-date", "reverse", "ivf"].includes(m)) {
      setCalculationMode(m as ConceptionCalculationMode);
    }
    if (params.get("due")) setDueDate(params.get("due")!);
    if (params.get("lmp")) setLmpDate(params.get("lmp")!);
    if (params.get("usDate")) setUltrasoundDate(params.get("usDate")!);
    if (params.get("usWeeks")) setUltrasoundWeeks(Math.max(4, Math.min(40, Number(params.get("usWeeks")))));
    if (params.get("usDays")) setUltrasoundDays(Math.max(0, Math.min(6, Number(params.get("usDays")))));
    if (params.get("conception")) setConceptionDate(params.get("conception")!);
    if (params.get("ovDate")) setOvulationDate(params.get("ovDate")!);
    if (params.get("ivfDate")) setIvfTransferDate(params.get("ivfDate")!);
    if (params.get("ivfType")) setIvfEmbryoType(params.get("ivfType") as IvfEmbryoType);
    if (params.get("cycle")) setCycleLength(Math.max(20, Math.min(45, Number(params.get("cycle")))));
    if (params.get("luteal")) setLutealPhaseLength(Math.max(9, Math.min(18, Number(params.get("luteal")))));
    if (params.get("age")) setMotherAge(Math.max(18, Math.min(50, Number(params.get("age")))));
  }, []);

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

  // Reset Defaults Handler
  const handleResetDefaults = () => {
    setCalculationMode("due-date");
    setDueDate("2026-10-08");
    setLmpDate("2026-01-01");
    setUltrasoundDate("2026-03-01");
    setUltrasoundWeeks(10);
    setUltrasoundDays(2);
    setConceptionDate("2026-01-15");
    setOvulationDate("2026-01-15");
    setIvfTransferDate("2026-04-15");
    setIvfEmbryoType("day5");
    setCycleLength(28);
    setLutealPhaseLength(14);
    setMotherAge(28);
  };

  // Share URL Handler
  const handleShareUrl = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("mode", calculationMode);
    if (calculationMode === "due-date") url.searchParams.set("due", dueDate);
    if (calculationMode === "lmp") url.searchParams.set("lmp", lmpDate);
    if (calculationMode === "ultrasound") {
      url.searchParams.set("usDate", ultrasoundDate);
      url.searchParams.set("usWeeks", String(ultrasoundWeeks));
      url.searchParams.set("usDays", String(ultrasoundDays));
    }
    if (calculationMode === "conception-date" || calculationMode === "reverse") url.searchParams.set("conception", conceptionDate);
    if (calculationMode === "ovulation-date") url.searchParams.set("ovDate", ovulationDate);
    if (calculationMode === "ivf") {
      url.searchParams.set("ivfDate", ivfTransferDate);
      url.searchParams.set("ivfType", ivfEmbryoType);
    }
    url.searchParams.set("cycle", String(cycleLength));
    url.searchParams.set("luteal", String(lutealPhaseLength));
    url.searchParams.set("age", String(motherAge));

    navigator.clipboard.writeText(url.toString());
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  // Copy Summary Handler
  const handleCopySummary = () => {
    const text = `Pregnancy Conception Assessment Summary:
• Mode: ${results.calculationMode.toUpperCase()}
• Estimated Conception Date: ${results.estimatedConceptionDateFormatted}
• 6-Day Fertile Window: ${results.fertileWindowFormatted}
• Estimated Implantation Window: ${results.implantationWindowFormatted}
• Estimated Due Date (EDD): ${results.estimatedDueDateFormatted}
• Earliest Home Pregnancy Urine Test: ${results.earliestHcgUrineTestDateFormatted}
• Clinical Confidence: ${results.confidenceRangeLabel}
Calculated on CalcPlatform Conception Engine (ASRM & ACOG Guidelines).`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // RFC-4180 Compliant CSV Export Handler via Blob
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

    const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `pregnancy_conception_timeline_${results.estimatedConceptionDate}.csv`);
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
          label: "6-Day Fertile Window",
          value: results.fertileWindowFormatted,
          subtitle: "Peak Sperm-Egg Viability Window",
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
          title: "Diagnostic Timeline & Milestone Thresholds",
          items: [
            { label: "Estimated Conception & Fertilization", value: results.estimatedConceptionDateFormatted, highlight: true },
            { label: "Embryo Implantation Window", value: results.implantationWindowFormatted },
            { label: "Earliest Quantitative Blood hCG", value: results.earliestHcgBloodTestDateFormatted },
            { label: "Earliest Home Urine hCG Test", value: results.earliestHcgUrineTestDateFormatted, highlight: true },
            { label: "Fetal Heartbeat Ultrasound (~6w)", value: results.fetalHeartbeatDateFormatted },
            { label: "Estimated Due Date (EDD)", value: results.estimatedDueDateFormatted, highlight: true },
          ],
        },
      ],
      recommendation: {
        title: `Clinical Conception Summary: ${results.estimatedConceptionDateFormatted}`,
        text: `Fertilization most likely occurred around ${results.estimatedConceptionDateFormatted}. The corresponding 6-day fertile window spans ${results.fertileWindowFormatted}.`,
        reasons: [
          `Obstetric ultrasound performed in the first trimester (Weeks 7–12) provides the gold standard for clinical dating with a margin of error of ±3 to 5 days.`,
          `Embryo implantation into the uterine endometrium typically occurs 6 to 12 days post-fertilization (${results.implantationWindowFormatted}).`,
          `Home pregnancy testing is most sensitive around the day of missed menses (${results.earliestHcgUrineTestDateFormatted}).`,
        ],
      },
      table: {
        title: "Gestational Milestone Schedule",
        headers: [
          { key: "title", label: "Milestone", align: "left" },
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
        "Grounded in ACOG, ASRM, and WHO clinical standards.",
        "Conception date estimates represent clinical probabilities and should be verified with first-trimester ultrasound.",
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
            ACOG &amp; ASRM Clinical Algorithms
          </span>
        </div>

        {/* Calculation Mode Tabs with ARIA roles */}
        <div className="space-y-2">
          <label id="preg-calc-mode-label" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Calculate Conception Based On:
          </label>
          <div
            role="tablist"
            aria-labelledby="preg-calc-mode-label"
            className="flex flex-wrap gap-1.5 p-1.5 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl"
          >
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
              Due Date
            </button>
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
              aria-selected={calculationMode === "ultrasound"}
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
              aria-selected={calculationMode === "ovulation-date"}
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
              role="tab"
              aria-selected={calculationMode === "reverse"}
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
              role="tab"
              aria-selected={calculationMode === "ivf"}
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

        {/* Dynamic Mode-Specific Inputs Grid with Accessible Labels & IDs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Mode 1: Due Date */}
          {calculationMode === "due-date" && (
            <div className="space-y-1.5">
              <label htmlFor="preg-due-date" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Estimated Due Date
              </label>
              <input
                id="preg-due-date"
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
              <label htmlFor="preg-lmp-date" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                First Day of Last Period (LMP)
              </label>
              <input
                id="preg-lmp-date"
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
                <label htmlFor="preg-ultrasound-date" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Ultrasound Scan Date
                </label>
                <input
                  id="preg-ultrasound-date"
                  type="date"
                  value={ultrasoundDate}
                  onChange={(e) => setUltrasoundDate(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="preg-ultrasound-weeks" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Gestational Age at Scan (Weeks)
                </label>
                <input
                  id="preg-ultrasound-weeks"
                  type="number"
                  min={4}
                  max={40}
                  value={ultrasoundWeeks}
                  onChange={(e) => setUltrasoundWeeks(Number(e.target.value))}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="preg-ultrasound-days" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Additional Days (+Days)
                </label>
                <input
                  id="preg-ultrasound-days"
                  type="number"
                  min={0}
                  max={6}
                  value={ultrasoundDays}
                  onChange={(e) => setUltrasoundDays(Number(e.target.value))}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </>
          )}

          {/* Mode 4: Conception Date / Reverse */}
          {(calculationMode === "conception-date" || calculationMode === "reverse") && (
            <div className="space-y-1.5">
              <label htmlFor="preg-conception-date" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Known / Target Conception Date
              </label>
              <input
                id="preg-conception-date"
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
              <label htmlFor="preg-ovulation-date" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Known Ovulation Date
              </label>
              <input
                id="preg-ovulation-date"
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
                <label htmlFor="preg-ivf-transfer-date" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  IVF Transfer Date
                </label>
                <input
                  id="preg-ivf-transfer-date"
                  type="date"
                  value={ivfTransferDate}
                  onChange={(e) => setIvfTransferDate(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="preg-ivf-embryo-type" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Embryo Development Type
                </label>
                <select
                  id="preg-ivf-embryo-type"
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
              <label htmlFor="preg-cycle-length">Menstrual Cycle Length</label>
              <span className="font-bold text-pink-600 dark:text-pink-400">
                {cycleLength} Days
              </span>
            </div>
            <input
              id="preg-cycle-length"
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
              <label htmlFor="preg-luteal-phase">Luteal Phase Duration</label>
              <span className="font-bold text-purple-600 dark:text-purple-400">
                {lutealPhaseLength} Days
              </span>
            </div>
            <input
              id="preg-luteal-phase"
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
            <label htmlFor="preg-mother-age" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Mother&apos;s Age
            </label>
            <input
              id="preg-mother-age"
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
            <span className="text-zinc-500 dark:text-zinc-400">6-Day Fertile Window (ASRM)</span>
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

        {/* Milestone Quick Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
          <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300">
              <Sparkles className="h-4 w-4" /> Embryo Implantation Window
            </div>
            <p className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
              {results.implantationWindowFormatted}
            </p>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
              6 to 12 Days Post-Ovulation
            </span>
          </div>

          <div className="p-3 rounded-xl border border-pink-500/20 bg-pink-500/5 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-pink-700 dark:text-pink-300">
              <Activity className="h-4 w-4" /> Earliest Home Urine hCG Test
            </div>
            <p className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
              {results.earliestHcgUrineTestDateFormatted}
            </p>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Day of Missed Period (High Sensitivity Window)
            </span>
          </div>

          <div className="p-3 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-purple-700 dark:text-purple-300">
              <Clock className="h-4 w-4" /> Fetal Heartbeat Detection
            </div>
            <p className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
              {results.fetalHeartbeatDateFormatted}
            </p>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
              ~6 Weeks Gestational Age Ultrasound
            </span>
          </div>

          <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-blue-700 dark:text-blue-300">
              <Calendar className="h-4 w-4" /> Calculated LMP Date
            </div>
            <p className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
              {results.lmpDateFormatted}
            </p>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Gestational Age Baseline (Week 0d)
            </span>
          </div>
        </div>
      </div>

      {/* 3. Tab Navigation for Visualizations & Timeline */}
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
            <Sparkles className="h-3.5 w-3.5" /> Implantation &amp; HCG Schedule
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
            <Heart className="h-3.5 w-3.5" /> Personalized Fertility Insights
          </button>
        </div>

        {/* TAB 1: Conception Probability Curve */}
        {activeTab === "probability" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                Daily Conception Probability Curve
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Percentage probability of successful fertilization by intercourse day relative to ovulation (Wilcox et al. cohort data).
              </p>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.probabilityCurve} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                            <p className="font-bold text-pink-600 dark:text-pink-400">{data.dateStr}</p>
                            <p>Conception Likelihood: <strong>{data.probabilityPercent}%</strong></p>
                            <p>Fertility Level: <strong>{data.fertilityLevel}</strong></p>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{data.description}</p>
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

        {/* TAB 2: Gestational Milestone Timeline */}
        {activeTab === "timeline" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  Pregnancy Development &amp; Milestone Schedule
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Calculated chronological progression from conception to full-term delivery.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportCsv}
                className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Download className="h-3.5 w-3.5" /> CSV Timeline
              </button>
            </div>

            <div className="space-y-2.5">
              {results.timelineMilestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-pink-300 dark:hover:border-pink-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-start gap-3">
                    <span className="p-2 rounded-lg bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 mt-0.5">
                      <Calendar className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">
                        {m.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="font-bold text-xs text-pink-600 dark:text-pink-400 block">
                      {m.dateStr}
                    </span>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      {m.gestationalAge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Implantation & HCG Schedule */}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {results.implantationStages.map((stage, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-pink-600 dark:text-pink-400">
                      Day {stage.dpo} Post-Ovulation
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 font-bold">
                      {stage.probabilityPercent}% Probability
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {stage.stageName}
                  </h4>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {stage.description}
                  </p>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block pt-1 font-semibold">
                    Estimated Date: {stage.dateStr}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Personalized Fertility Insights */}
        {activeTab === "insights" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                Clinical Conception Insights &amp; Guidance
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
                  <h4 className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs font-semibold leading-relaxed">{item.text}</p>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                    <strong>Medical Guidance:</strong> {item.advice}
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

export default PregnancyConceptionCalculator;
