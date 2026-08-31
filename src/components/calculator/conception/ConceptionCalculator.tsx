"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Thermometer,
  Droplet,
  FileSpreadsheet,
  Share2,
  RotateCcw,
  Sliders,
  CalendarDays,
  Flame,
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
import { calculateConceptionCalculator } from "@/app/calculators/conception-calculator/calculator";
import {
  ConceptionCalculationMode,
  CervicalMucusType,
  OpkResultType,
  IvfEmbryoType,
} from "@/app/calculators/conception-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function ConceptionCalculator() {
  // Calculation Mode
  const [calculationMode, setCalculationMode] = useState<ConceptionCalculationMode>("lmp");

  // Inputs State
  const [lmpDate, setLmpDate] = useState<string>("2026-01-01");
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [lutealPhaseLength, setLutealPhaseLength] = useState<number>(14);
  const [motherAge, setMotherAge] = useState<number>(28);
  const [ovulationDate, setOvulationDate] = useState<string>("2026-01-15");
  const [dueDate, setDueDate] = useState<string>("2026-10-08");
  const [ultrasoundDate, setUltrasoundDate] = useState<string>("2026-03-01");
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState<number>(10);
  const [ultrasoundDays, setUltrasoundDays] = useState<number>(2);
  const [conceptionDate, setConceptionDate] = useState<string>("2026-01-15");
  const [ivfTransferDate, setIvfTransferDate] = useState<string>("2026-02-01");
  const [ivfEmbryoType, setIvfEmbryoType] = useState<IvfEmbryoType>("day5");

  // Advanced Tracking Biomarkers
  const [cervicalMucus, setCervicalMucus] = useState<CervicalMucusType>("egg-white");
  const [opkResult, setOpkResult] = useState<OpkResultType>("positive");
  const [bbtValue, setBbtValue] = useState<number>(97.8);

  // Active Visualization Tab
  const [activeTab, setActiveTab] = useState<
    | "probability"
    | "calendar"
    | "timeline"
    | "implantation"
    | "bbt"
  >("probability");

  // Modal & Copy/Share states
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // Mode Options Config
  const modesList: { id: ConceptionCalculationMode; label: string; icon: any; desc: string }[] = [
    { id: "lmp", label: "Last Period (LMP)", icon: Calendar, desc: "Calculate from start of last period" },
    { id: "ovulation", label: "Ovulation Date", icon: Flame, desc: "Calculate from ovulation timing" },
    { id: "due-date", label: "Due Date", icon: Baby, desc: "Reverse calculate from due date" },
    { id: "ultrasound", label: "Ultrasound Date", icon: Stethoscope, desc: "Dating from ultrasound scan" },
    { id: "ivf", label: "IVF Transfer", icon: Zap, desc: "Dating for IVF Day 3/5/6 transfers" },
    { id: "reverse", label: "Sex Date (Reverse)", icon: Clock, desc: "Evaluate specific intercourse date" },
    { id: "planner", label: "Fertility Planner", icon: CalendarDays, desc: "6-month fertility forecast" },
    { id: "timeline", label: "Pregnancy Timeline", icon: TrendingUp, desc: "Complete 40-week milestone map" },
  ];

  // URL Hydration on Mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const m = params.get("mode");
    if (m && modesList.some((item) => item.id === m)) {
      setCalculationMode(m as ConceptionCalculationMode);
    }
    if (params.get("lmp")) setLmpDate(params.get("lmp")!);
    if (params.get("cycle")) setCycleLength(Number(params.get("cycle")));
    if (params.get("period")) setPeriodLength(Number(params.get("period")));
    if (params.get("luteal")) setLutealPhaseLength(Number(params.get("luteal")));
    if (params.get("age")) setMotherAge(Number(params.get("age")));
    if (params.get("ovDate")) setOvulationDate(params.get("ovDate")!);
    if (params.get("due")) setDueDate(params.get("due")!);
    if (params.get("usDate")) setUltrasoundDate(params.get("usDate")!);
    if (params.get("usW")) setUltrasoundWeeks(Number(params.get("usW")));
    if (params.get("usD")) setUltrasoundDays(Number(params.get("usD")));
    if (params.get("conception")) setConceptionDate(params.get("conception")!);
    if (params.get("ivfDate")) setIvfTransferDate(params.get("ivfDate")!);
    if (params.get("ivfType")) setIvfEmbryoType(params.get("ivfType") as IvfEmbryoType);
    if (params.get("mucus")) setCervicalMucus(params.get("mucus") as CervicalMucusType);
    if (params.get("opk")) setOpkResult(params.get("opk") as OpkResultType);
    if (params.get("bbt")) setBbtValue(Number(params.get("bbt")));
  }, []);

  // Calculate Results
  const results = useMemo(() => {
    return calculateConceptionCalculator({
      calculationMode,
      lmpDate,
      cycleLength,
      periodLength,
      lutealPhaseLength,
      motherAge,
      ovulationDate,
      dueDate,
      ultrasoundDate,
      ultrasoundWeeks,
      ultrasoundDays,
      conceptionDate,
      ivfTransferDate,
      ivfEmbryoType,
      cervicalMucus,
      opkResult,
      bbtValue,
    });
  }, [
    calculationMode,
    lmpDate,
    cycleLength,
    periodLength,
    lutealPhaseLength,
    motherAge,
    ovulationDate,
    dueDate,
    ultrasoundDate,
    ultrasoundWeeks,
    ultrasoundDays,
    conceptionDate,
    ivfTransferDate,
    ivfEmbryoType,
    cervicalMucus,
    opkResult,
    bbtValue,
  ]);

  // Standard Blob-based CSV Export Handler
  const handleExportCSV = () => {
    let csvContent = "Category,Parameter,Value\n";
    csvContent += `Mode,"${results.mode}"\n`;
    csvContent += `Estimated Conception Date,"${results.conceptionDate}"\n`;
    csvContent += `Fertile Window Start,"${results.fertileWindow.start}"\n`;
    csvContent += `Fertile Window End,"${results.fertileWindow.end}"\n`;
    csvContent += `Estimated Ovulation Date,"${results.ovulationDate}"\n`;
    csvContent += `Estimated Due Date,"${results.estimatedDueDate}"\n`;
    csvContent += `Implantation Peak Date,"${results.implantationWindow.peakDate}"\n`;
    csvContent += `Earliest Test Date (10 DPO),"${results.earliestTestDate.sensitive10Dpo}"\n\n`;

    csvContent += "Cycle,Period Start,Ovulation Date,Fertile Window Start,Fertile Window End,Due Date If Conceived\n";
    results.forecast.forEach((fc) => {
      csvContent += `${fc.cycleNumber},"${fc.periodStartDate}","${fc.ovulationDate}","${fc.fertileWindowStart}","${fc.fertileWindowEnd}","${fc.dueDateIfConceived}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `conception_report_${results.conceptionDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy Shareable Summary
  const handleCopy = () => {
    const summaryText = `Conception Calculator Summary:
• Calculation Mode: ${results.mode.toUpperCase()}
• Estimated Conception Date: ${results.conceptionDate}
• 6-Day Fertile Window (ASRM): ${results.fertileWindow.start} to ${results.fertileWindow.end}
• Estimated Ovulation Date: ${results.ovulationDate}
• Estimated Due Date (EDD): ${results.estimatedDueDate}
• Implantation Reference Window: ${results.implantationWindow.start} to ${results.implantationWindow.end}
• Earliest Sensitive Test (10 DPO): ${results.earliestTestDate.sensitive10Dpo}
• Gestational Age: ${results.gestationalAge.formatted}
Calculated at Calculator Platform.`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Share URL Generator
  const handleShareUrl = () => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams({
      mode: calculationMode,
      cycle: cycleLength.toString(),
      period: periodLength.toString(),
      luteal: lutealPhaseLength.toString(),
      age: motherAge.toString(),
      mucus: cervicalMucus,
      opk: opkResult,
      bbt: bbtValue.toString(),
    });
    if (calculationMode === "lmp") params.set("lmp", lmpDate);
    if (calculationMode === "ovulation") params.set("ovDate", ovulationDate);
    if (calculationMode === "due-date") params.set("due", dueDate);
    if (calculationMode === "ultrasound") {
      params.set("usDate", ultrasoundDate);
      params.set("usW", ultrasoundWeeks.toString());
      params.set("usD", ultrasoundDays.toString());
    }
    if (calculationMode === "reverse" || calculationMode === "planner" || calculationMode === "timeline") {
      params.set("conception", conceptionDate);
    }
    if (calculationMode === "ivf") {
      params.set("ivfDate", ivfTransferDate);
      params.set("ivfType", ivfEmbryoType);
    }
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  };

  // Reset to Baseline Defaults
  const handleResetDefaults = () => {
    setCalculationMode("lmp");
    setLmpDate("2026-01-01");
    setCycleLength(28);
    setPeriodLength(5);
    setLutealPhaseLength(14);
    setMotherAge(28);
    setOvulationDate("2026-01-15");
    setDueDate("2026-10-08");
    setUltrasoundDate("2026-03-01");
    setUltrasoundWeeks(10);
    setUltrasoundDays(2);
    setConceptionDate("2026-01-15");
    setIvfTransferDate("2026-02-01");
    setIvfEmbryoType("day5");
    setCervicalMucus("egg-white");
    setOpkResult("positive");
    setBbtValue(97.8);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Trigger Print
  const handlePrint = () => {
    window.print();
  };

  // Report Modal Data Structure
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Professional Conception Calculator & Fertility Engine",
      reportTitle: "Clinical Fertility & Conception Assessment Report",
      generatedDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      generatedTime: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    keyMetrics: [
      {
        label: "Estimated Conception Date",
        value: results.conceptionDate,
        subtitle: "Most likely fertilization date",
        colorTheme: "rose",
      },
      {
        label: "Peak Fertile Window",
        value: `${results.fertileWindow.start} to ${results.fertileWindow.end}`,
        subtitle: "6-day ASRM clinical window",
        colorTheme: "emerald",
      },
      {
        label: "Estimated Due Date",
        value: results.estimatedDueDate,
        subtitle: "Full term 40-week estimate",
        colorTheme: "purple",
      },
      {
        label: "Fertility Status",
        value: results.fertilityStatus,
        subtitle: "Reference counseling tier",
        colorTheme: "amber",
      },
    ],
    sections: [
      {
        title: "Input Parameters & Cycle Biomarkers",
        items: [
          { label: "Calculation Mode", value: calculationMode.toUpperCase() },
          { label: "Last Menstrual Period (LMP)", value: results.estimatedLmpDate },
          { label: "Average Cycle Length", value: `${cycleLength} days` },
          { label: "Luteal Phase Duration", value: `${lutealPhaseLength} days` },
          { label: "Maternal Age", value: `${motherAge} years` },
          { label: "Cervical Mucus Quality", value: cervicalMucus.toUpperCase() },
          { label: "Ovulation Test (OPK)", value: opkResult.toUpperCase() },
        ],
      },
      {
        title: "Clinical Conception & Milestone Timeline",
        items: [
          { label: "Estimated Ovulation Date", value: results.ovulationDate },
          { label: "Conception Probability Range", value: `${results.conceptionWindow.start} to ${results.conceptionWindow.end}` },
          { label: "Implantation Window (6-12 DPO)", value: `${results.implantationWindow.start} to ${results.implantationWindow.end}` },
          { label: "Earliest Sensitive Test (10 DPO)", value: results.earliestTestDate.sensitive10Dpo },
          { label: "Standard Pregnancy Test (14 DPO)", value: results.earliestTestDate.standard14Dpo },
          { label: "Gestational Age Today", value: results.gestationalAge.formatted },
        ],
      },
    ],
    recommendation: {
      title: "Personalized Conception Strategy",
      text: results.insights[0] || "Schedule regular intercourse during peak fertile days.",
      reasons: results.recommendations,
      score: results.overallFertilityScore,
      rating: results.fertilityStatus,
    },
    table: {
      title: "Daily Conception Probability Curve (Wilcox Cohort)",
      headers: [
        { key: "date", label: "Date", align: "left" },
        { key: "dayLabel", label: "Cycle Day Timing", align: "left" },
        { key: "probability", label: "Probability (%)", align: "right" },
        { key: "status", label: "Fertility Status", align: "center" },
      ],
      rows: results.probabilities.map((p) => ({
        date: p.date,
        dayLabel: p.dayLabel,
        probability: `${p.probability}%`,
        status: p.status,
      })),
    },
    notes: [
      "Calculations use standardized clinical formulas (Naegele's rule adjusted for cycle length).",
      "Ultrasonography in early pregnancy remains the gold standard for clinical dating.",
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 print:p-0 font-sans">
      {/* Light Theme Mode Selector Bar */}
      <div className="bg-white/90 backdrop-blur-md p-2.5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2" role="tablist" aria-label="Conception Calculation Modes">
          {modesList.map((m) => {
            const Icon = m.icon;
            const isSelected = calculationMode === m.id;
            return (
              <button
                key={m.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setCalculationMode(m.id)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                  isSelected
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/20 scale-[1.01]"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/60"
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 transition-colors ${
                    isSelected ? "bg-white/20 text-white" : "bg-rose-50 text-rose-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-semibold truncate">{m.label}</div>
                  <div className="text-[11px] opacity-80 truncate hidden lg:block">
                    {m.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Calculation & Inputs Grid (Light Theme) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs Form */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm print:hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Calculation Inputs
            </h2>
            <span className="text-xs px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold uppercase tracking-wider">
              {calculationMode}
            </span>
          </div>

          {/* Mode-Specific Input Fields */}
          {calculationMode === "lmp" && (
            <div>
              <label htmlFor="conception-lmp-date" className="block text-sm font-semibold text-slate-700 mb-1.5">
                First Day of Last Period (LMP)
              </label>
              <input
                id="conception-lmp-date"
                type="date"
                value={lmpDate}
                onChange={(e) => setLmpDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
              />
            </div>
          )}

          {calculationMode === "ovulation" && (
            <div>
              <label htmlFor="conception-ovulation-date" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Estimated Ovulation Date
              </label>
              <input
                id="conception-ovulation-date"
                type="date"
                value={ovulationDate}
                onChange={(e) => setOvulationDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
              />
            </div>
          )}

          {calculationMode === "due-date" && (
            <div>
              <label htmlFor="conception-due-date" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Estimated Due Date
              </label>
              <input
                id="conception-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
              />
            </div>
          )}

          {calculationMode === "ultrasound" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="conception-ultrasound-date" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Ultrasound Scan Date
                </label>
                <input
                  id="conception-ultrasound-date"
                  type="date"
                  value={ultrasoundDate}
                  onChange={(e) => setUltrasoundDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="conception-ultrasound-weeks" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Gestational Weeks
                  </label>
                  <input
                    id="conception-ultrasound-weeks"
                    type="number"
                    min={4}
                    max={40}
                    value={ultrasoundWeeks}
                    onChange={(e) => setUltrasoundWeeks(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="conception-ultrasound-days" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Gestational Days
                  </label>
                  <input
                    id="conception-ultrasound-days"
                    type="number"
                    min={0}
                    max={6}
                    value={ultrasoundDays}
                    onChange={(e) => setUltrasoundDays(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {calculationMode === "ivf" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="conception-ivf-transfer-date" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  IVF Embryo Transfer Date
                </label>
                <input
                  id="conception-ivf-transfer-date"
                  type="date"
                  value={ivfTransferDate}
                  onChange={(e) => setIvfTransferDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label htmlFor="conception-ivf-embryo-type" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Embryo Age at Transfer
                </label>
                <select
                  id="conception-ivf-embryo-type"
                  value={ivfEmbryoType}
                  onChange={(e) => setIvfEmbryoType(e.target.value as IvfEmbryoType)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                >
                  <option value="day3">Day 3 Cleavage Embryo</option>
                  <option value="day5">Day 5 Blastocyst</option>
                  <option value="day6">Day 6 Blastocyst</option>
                </select>
              </div>
            </div>
          )}

          {(calculationMode === "reverse" || calculationMode === "planner" || calculationMode === "timeline") && (
            <div>
              <label htmlFor="conception-sex-date" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Estimated Intercourse or Conception Date
              </label>
              <input
                id="conception-sex-date"
                type="date"
                value={conceptionDate}
                onChange={(e) => setConceptionDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
              />
            </div>
          )}

          {/* Menstrual Cycle Parameters */}
          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Menstrual Cycle Parameters
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="conception-cycle-length" className="block text-xs font-medium text-slate-600 mb-1">
                  Cycle Length: <span className="text-rose-600 font-bold">{cycleLength} days</span>
                </label>
                <input
                  id="conception-cycle-length"
                  type="range"
                  min={20}
                  max={45}
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="conception-period-length" className="block text-xs font-medium text-slate-600 mb-1">
                  Period Duration: <span className="text-rose-600 font-bold">{periodLength} days</span>
                </label>
                <input
                  id="conception-period-length"
                  type="range"
                  min={1}
                  max={15}
                  value={periodLength}
                  onChange={(e) => setPeriodLength(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="conception-luteal-phase" className="block text-xs font-medium text-slate-600 mb-1">
                  Luteal Phase: <span className="text-rose-600 font-bold">{lutealPhaseLength} days</span>
                </label>
                <input
                  id="conception-luteal-phase"
                  type="range"
                  min={8}
                  max={18}
                  value={lutealPhaseLength}
                  onChange={(e) => setLutealPhaseLength(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="conception-mother-age" className="block text-xs font-medium text-slate-600 mb-1">
                  Maternal Age: <span className="text-rose-600 font-bold">{motherAge} yrs</span>
                </label>
                <input
                  id="conception-mother-age"
                  type="range"
                  min={18}
                  max={50}
                  value={motherAge}
                  onChange={(e) => setMotherAge(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Fertility Biomarkers Tracker */}
          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Fertility Biomarkers Tracker
            </h3>

            <div>
              <label htmlFor="conception-cervical-mucus" className="block text-xs font-medium text-slate-600 mb-1">
                Cervical Mucus Quality
              </label>
              <select
                id="conception-cervical-mucus"
                value={cervicalMucus}
                onChange={(e) => setCervicalMucus(e.target.value as CervicalMucusType)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              >
                <option value="dry">Dry / Minimal (Low Fertility)</option>
                <option value="sticky">Sticky / Tacky (Low Fertility)</option>
                <option value="creamy">Creamy / Lotion-Like (Moderate Fertility)</option>
                <option value="watery">Watery / Wet (High Fertility)</option>
                <option value="egg-white">Egg-White (EWCM) (PEAK Fertility)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="conception-opk-result" className="block text-xs font-medium text-slate-600 mb-1">
                  Ovulation Test (OPK)
                </label>
                <select
                  id="conception-opk-result"
                  value={opkResult}
                  onChange={(e) => setOpkResult(e.target.value as OpkResultType)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                >
                  <option value="none">Not Tested</option>
                  <option value="negative">Negative</option>
                  <option value="positive">Positive LH Surge</option>
                  <option value="peak">Peak Fertility</option>
                </select>
              </div>

              <div>
                <label htmlFor="conception-bbt-value" className="block text-xs font-medium text-slate-600 mb-1">
                  Morning BBT (°F)
                </label>
                <input
                  id="conception-bbt-value"
                  type="number"
                  step="0.1"
                  min={96.0}
                  max={100.0}
                  value={bbtValue}
                  onChange={(e) => setBbtValue(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Results & Interactive Visualizations */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Highlights Card */}
          <div className="bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 p-6 rounded-2xl text-white shadow-xl shadow-rose-500/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-rose-100 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Estimated Conception Date
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white mt-1">
                  {results.conceptionDate}
                </div>
                <div className="text-xs text-rose-100 mt-1">
                  Most Likely Fertilization Window: <span className="text-white font-semibold">{results.conceptionWindow.start}</span> to <span className="text-white font-semibold">{results.conceptionWindow.end}</span>
                </div>
              </div>

              <div className="text-right">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm"
                >
                  {results.fertilityStatus}
                </span>
              </div>
            </div>

            {/* Sub-Metrics Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                <div className="text-[11px] text-rose-100 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-amber-300" />
                  Peak Fertile Window
                </div>
                <div className="text-sm font-bold text-white mt-1 truncate">
                  {results.fertileWindow.start} – {results.fertileWindow.end}
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                <div className="text-[11px] text-rose-100 flex items-center gap-1 font-medium">
                  <Flame className="w-3.5 h-3.5 text-amber-300" />
                  Ovulation Date
                </div>
                <div className="text-sm font-bold text-white mt-1 truncate">
                  {results.ovulationDate}
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                <div className="text-[11px] text-rose-100 flex items-center gap-1 font-medium">
                  <Baby className="w-3.5 h-3.5 text-amber-300" />
                  Estimated Due Date
                </div>
                <div className="text-sm font-bold text-white mt-1 truncate">
                  {results.estimatedDueDate}
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                <div className="text-[11px] text-rose-100 flex items-center gap-1 font-medium">
                  <Layers className="w-3.5 h-3.5 text-amber-300" />
                  Implantation Window
                </div>
                <div className="text-sm font-bold text-white mt-1 truncate">
                  {results.implantationWindow.start} – {results.implantationWindow.end}
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                <div className="text-[11px] text-rose-100 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                  Earliest Test (10 DPO)
                </div>
                <div className="text-sm font-bold text-white mt-1 truncate">
                  {results.earliestTestDate.sensitive10Dpo}
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                <div className="text-[11px] text-rose-100 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  Gestational Age
                </div>
                <div className="text-sm font-bold text-white mt-1 truncate">
                  {results.gestationalAge.formatted}
                </div>
              </div>
            </div>

            {/* Action Export Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4 print:hidden">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsReportOpen(true)}
                  className="flex items-center gap-2 bg-white text-rose-700 hover:bg-rose-50 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  <Download className="w-4 h-4 text-rose-600" />
                  Generate PDF Report
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all"
                  title="Print Summary"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all"
                  title="Export CSV Data"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  CSV
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all"
                  title="Copy Summary"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>

                <button
                  onClick={handleShareUrl}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all"
                  title="Share Calculation URL"
                >
                  <Share2 className="w-4 h-4" />
                  {shared ? "Link Copied!" : "Share"}
                </button>

                <button
                  onClick={handleResetDefaults}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all"
                  title="Reset Defaults"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Defaults
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Visualizations Container */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 print:hidden">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl overflow-x-auto text-xs" role="tablist" aria-label="Conception Visualizations">
              <button
                role="tab"
                aria-selected={activeTab === "probability"}
                onClick={() => setActiveTab("probability")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "probability"
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Probability Curve
              </button>

              <button
                role="tab"
                aria-selected={activeTab === "calendar"}
                onClick={() => setActiveTab("calendar")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "calendar"
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Cycle Phases
              </button>

              <button
                role="tab"
                aria-selected={activeTab === "timeline"}
                onClick={() => setActiveTab("timeline")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "timeline"
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Pregnancy Timeline
              </button>

              <button
                role="tab"
                aria-selected={activeTab === "implantation"}
                onClick={() => setActiveTab("implantation")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "implantation"
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Implantation Map
              </button>

              <button
                role="tab"
                aria-selected={activeTab === "bbt"}
                onClick={() => setActiveTab("bbt")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "bbt"
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                BBT Shift Chart
              </button>
            </div>

            {/* TAB 1: Probability Curve */}
            {activeTab === "probability" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    Daily Conception Probability Curve (Wilcox Reference Cohort)
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Peak Window: -2 to 0 DPO</span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.probabilities}>
                      <defs>
                        <linearGradient id="probGradientLight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} unit="%" domain={[0, 40]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#cbd5e1",
                          borderRadius: "12px",
                          color: "#0f172a",
                          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                        }}
                        formatter={(val: any) => [`${val}%`, "Population Reference Fecundability"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="probability"
                        stroke="#059669"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#probGradientLight)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Probability Heatmap Bar */}
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 pt-2">
                  {results.probabilities.map((p) => (
                    <div
                      key={p.dayOffset}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        p.status === "Peak"
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold shadow-xs"
                          : p.status === "High"
                          ? "bg-purple-50 border-purple-200 text-purple-900 font-semibold"
                          : p.status === "Moderate"
                          ? "bg-blue-50 border-blue-200 text-blue-900"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold">{p.dayOffset === 0 ? "OVULATION" : `${p.dayOffset} D`}</div>
                      <div className="text-sm font-extrabold mt-0.5">{p.probability}%</div>
                      <div className="text-[9px] opacity-80 truncate">{p.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Cycle Phases */}
            {activeTab === "calendar" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  {cycleLength}-Day Menstrual Cycle Phase Breakdown
                </h3>

                <div className="space-y-3">
                  {results.cyclePhases.map((cp, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3.5 h-12 rounded-full"
                          style={{ backgroundColor: cp.color }}
                        />
                        <div>
                          <div className="text-sm font-bold text-slate-900">{cp.phaseName}</div>
                          <div className="text-xs text-slate-600 mt-0.5">{cp.description}</div>
                        </div>
                      </div>

                      <div className="text-right text-xs">
                        <div className="font-bold text-rose-700">{cp.startDate} to {cp.endDate}</div>
                        <div className="text-slate-500 mt-0.5 font-medium">{cp.durationDays} Days Duration</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Pregnancy Timeline */}
            {activeTab === "timeline" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  Clinical 40-Week Pregnancy Milestones
                </h3>

                <div className="relative border-l-2 border-slate-200 ml-3 space-y-4 pl-6 pt-2">
                  {results.milestones.map((ms, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-rose-500 border-4 border-white shadow-xs group-hover:scale-125 transition-all" />
                      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-rose-700">{ms.title}</span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                            {ms.gestationalAge}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-slate-900 mt-1">{ms.date}</div>
                        <p className="text-xs text-slate-600 mt-1">{ms.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Implantation Map */}
            {activeTab === "implantation" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  Embryo Implantation &amp; Early hCG Window
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-cyan-50/60 p-4 rounded-xl border border-cyan-200">
                    <div className="text-xs text-cyan-800 font-semibold">Earliest Implantation</div>
                    <div className="text-lg font-bold text-cyan-900 mt-1">{results.implantationWindow.start}</div>
                    <div className="text-xs text-cyan-700 mt-1">6 Days Post-Ovulation (6 DPO)</div>
                  </div>

                  <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                    <div className="text-xs text-emerald-800 font-semibold">Peak Implantation Window</div>
                    <div className="text-lg font-bold text-emerald-900 mt-1">{results.implantationWindow.peakDate}</div>
                    <div className="text-xs text-emerald-700 mt-1">8 to 10 DPO (Highest frequency)</div>
                  </div>

                  <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                    <div className="text-xs text-amber-800 font-semibold">Earliest Positive Test</div>
                    <div className="text-lg font-bold text-amber-900 mt-1">{results.earliestTestDate.sensitive10Dpo}</div>
                    <div className="text-xs text-amber-700 mt-1">10 DPO Sensitive (10–25 mIU/mL)</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: BBT Trend Chart */}
            {activeTab === "bbt" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    Basal Body Temperature (BBT) Thermal Shift Chart
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Post-Ovulation Rise: +0.5°F to +1.0°F</span>
                </div>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.sampleBBTData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="day" stroke="#64748b" fontSize={11} label={{ value: 'Cycle Day', position: 'insideBottom', offset: -2 }} />
                      <YAxis stroke="#64748b" fontSize={11} domain={[97.0, 98.8]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#cbd5e1",
                          borderRadius: "12px",
                          color: "#0f172a",
                        }}
                        formatter={(val: any) => [`${val}°F`, "Morning BBT"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#8b5cf6"
                        strokeWidth={2.5}
                        dot={{ r: 3, fill: "#8b5cf6" }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Follicular Phase (Low BBT)</span>
                  <span className="text-rose-600 font-bold">Ovulation Dip</span>
                  <span className="text-purple-600 font-bold">Luteal Phase (Sustained Thermal Shift)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clinical Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        reportData={reportData}
      />
    </div>
  );
}

export default ConceptionCalculator;
