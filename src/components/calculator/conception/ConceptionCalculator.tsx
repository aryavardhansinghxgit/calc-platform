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
  Thermometer,
  Droplet,
  FileSpreadsheet,
  Share2,
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
  BarChart,
  Bar,
  Cell,
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
    | "mucus"
    | "forecast"
    | "insights"
  >("probability");

  // Modal & Copy state
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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

  // CSV Export Handler
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Parameter,Value\n";
    csvContent += `Mode,${results.mode}\n`;
    csvContent += `Estimated Conception Date,${results.conceptionDate}\n`;
    csvContent += `Fertile Window Start,${results.fertileWindow.start}\n`;
    csvContent += `Fertile Window End,${results.fertileWindow.end}\n`;
    csvContent += `Estimated Ovulation Date,${results.ovulationDate}\n`;
    csvContent += `Estimated Due Date,${results.estimatedDueDate}\n`;
    csvContent += `Implantation Peak Date,${results.implantationWindow.peakDate}\n`;
    csvContent += `Earliest Test Date (10 DPO),${results.earliestTestDate.sensitive10Dpo}\n\n`;

    csvContent += "Cycle,Period Start,Ovulation Date,Fertile Window Start,Fertile Window End,Due Date If Conceived\n";
    results.forecast.forEach((fc) => {
      csvContent += `${fc.cycleNumber},${fc.periodStartDate},${fc.ovulationDate},${fc.fertileWindowStart},${fc.fertileWindowEnd},${fc.dueDateIfConceived}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `conception_report_${results.conceptionDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Shareable Summary
  const handleCopy = () => {
    const summaryText = `Conception Calculator Results:\n• Estimated Conception Date: ${results.conceptionDate}\n• Fertile Window: ${results.fertileWindow.start} to ${results.fertileWindow.end}\n• Estimated Ovulation: ${results.ovulationDate}\n• Estimated Due Date: ${results.estimatedDueDate}\n• Implantation Window: ${results.implantationWindow.start} to ${results.implantationWindow.end}\nCalculated at Calculator Platform.`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Trigger Print Report
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
        subtitle: "6-day maximum probability range",
        colorTheme: "emerald",
      },
      {
        label: "Estimated Due Date",
        value: results.estimatedDueDate,
        subtitle: "Full term 40-week estimate",
        colorTheme: "purple",
      },
      {
        label: "Overall Fertility Score",
        value: `${results.overallFertilityScore}%`,
        subtitle: `Rating: ${results.fertilityStatus}`,
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
      title: "Daily Conception Probability Curve",
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
    <div className="w-full max-w-7xl mx-auto space-y-8 print:p-0">
      {/* Mode Selector Tabs */}
      <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-slate-800 shadow-xl print:hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {modesList.map((m) => {
            const Icon = m.icon;
            const isSelected = calculationMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setCalculationMode(m.id)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                  isSelected
                    ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-600/30 font-semibold scale-[1.02]"
                    : "bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    isSelected ? "bg-white/20" : "bg-slate-700/50 text-rose-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm truncate">{m.label}</div>
                  <div className="text-[11px] opacity-75 truncate hidden lg:block">
                    {m.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Calculation & Input Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs Form */}
        <div className="lg:col-span-5 space-y-6 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl print:hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-rose-500" />
              Calculation Inputs
            </h2>
            <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
              Mode: {calculationMode.toUpperCase()}
            </span>
          </div>

          {/* Mode-Specific Input Fields */}
          {calculationMode === "lmp" && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                First Day of Last Menstrual Period (LMP)
              </label>
              <input
                type="date"
                value={lmpDate}
                onChange={(e) => setLmpDate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          )}

          {calculationMode === "ovulation" && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Estimated Ovulation Date
              </label>
              <input
                type="date"
                value={ovulationDate}
                onChange={(e) => setOvulationDate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          )}

          {calculationMode === "due-date" && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Estimated Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          )}

          {calculationMode === "ultrasound" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Ultrasound Scan Date
                </label>
                <input
                  type="date"
                  value={ultrasoundDate}
                  onChange={(e) => setUltrasoundDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Gestational Weeks
                  </label>
                  <input
                    type="number"
                    min={4}
                    max={40}
                    value={ultrasoundWeeks}
                    onChange={(e) => setUltrasoundWeeks(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Gestational Days
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={6}
                    value={ultrasoundDays}
                    onChange={(e) => setUltrasoundDays(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>
          )}

          {calculationMode === "ivf" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  IVF Embryo Transfer Date
                </label>
                <input
                  type="date"
                  value={ivfTransferDate}
                  onChange={(e) => setIvfTransferDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Embryo Stage / Age
                </label>
                <select
                  value={ivfEmbryoType}
                  onChange={(e) => setIvfEmbryoType(e.target.value as IvfEmbryoType)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="day3">Day 3 Embryo Transfer</option>
                  <option value="day5">Day 5 Blastocyst Transfer</option>
                  <option value="day6">Day 6 Blastocyst Transfer</option>
                </select>
              </div>
            </div>
          )}

          {calculationMode === "reverse" && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Known Sex / Intercourse Date
              </label>
              <input
                type="date"
                value={conceptionDate}
                onChange={(e) => setConceptionDate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          )}

          {/* General Cycle Adjustments */}
          <div className="border-t border-slate-800 pt-4 space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              Menstrual Cycle Parameters
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Cycle Length (Days): <span className="text-white font-semibold">{cycleLength}</span>
                </label>
                <input
                  type="range"
                  min={21}
                  max={45}
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Period Duration (Days): <span className="text-white font-semibold">{periodLength}</span>
                </label>
                <input
                  type="range"
                  min={2}
                  max={10}
                  value={periodLength}
                  onChange={(e) => setPeriodLength(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Luteal Phase (Days): <span className="text-white font-semibold">{lutealPhaseLength}</span>
                </label>
                <input
                  type="range"
                  min={9}
                  max={16}
                  value={lutealPhaseLength}
                  onChange={(e) => setLutealPhaseLength(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Maternal Age: <span className="text-white font-semibold">{motherAge} yrs</span>
                </label>
                <input
                  type="range"
                  min={18}
                  max={50}
                  value={motherAge}
                  onChange={(e) => setMotherAge(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Biomarkers Tracking Module */}
          <div className="border-t border-slate-800 pt-4 space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-cyan-400" />
              Fertility Biomarkers Tracker
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Cervical Mucus Quality
              </label>
              <select
                value={cervicalMucus}
                onChange={(e) => setCervicalMucus(e.target.value as CervicalMucusType)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
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
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Ovulation Test (OPK)
                </label>
                <select
                  value={opkResult}
                  onChange={(e) => setOpkResult(e.target.value as OpkResultType)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="none">Not Tested</option>
                  <option value="negative">Negative</option>
                  <option value="positive">Positive LH Surge</option>
                  <option value="peak">Peak Fertility</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Morning BBT (°F)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min={96.0}
                  max={100.0}
                  value={bbtValue}
                  onChange={(e) => setBbtValue(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Results & Interactive Visualizations */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Highlights Grid */}
          <div className="bg-gradient-to-br from-rose-950/80 via-slate-900 to-purple-950/80 p-6 rounded-2xl border border-rose-500/30 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rose-500/20 pb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-rose-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  Estimated Conception Date
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white mt-1">
                  {results.conceptionDate}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Most Likely Fertilization Window: <span className="text-rose-300 font-medium">{results.conceptionWindow.start}</span> to <span className="text-rose-300 font-medium">{results.conceptionWindow.end}</span>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
                    results.fertilityStatus === "Peak"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : results.fertilityStatus === "High"
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  }`}
                >
                  Fertility Score: {results.overallFertilityScore}% ({results.fertilityStatus})
                </span>
              </div>
            </div>

            {/* Sub-Metrics Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  Peak Fertile Window
                </div>
                <div className="text-sm font-bold text-emerald-400 mt-1 truncate">
                  {results.fertileWindow.start} – {results.fertileWindow.end}
                </div>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  Ovulation Date
                </div>
                <div className="text-sm font-bold text-rose-400 mt-1 truncate">
                  {results.ovulationDate}
                </div>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Baby className="w-3.5 h-3.5 text-purple-400" />
                  Estimated Due Date
                </div>
                <div className="text-sm font-bold text-purple-300 mt-1 truncate">
                  {results.estimatedDueDate}
                </div>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  Implantation Window
                </div>
                <div className="text-sm font-bold text-cyan-300 mt-1 truncate">
                  {results.implantationWindow.start} – {results.implantationWindow.end}
                </div>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  Earliest Test (10 DPO)
                </div>
                <div className="text-sm font-bold text-amber-300 mt-1 truncate">
                  {results.earliestTestDate.sensitive10Dpo}
                </div>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  Gestational Age
                </div>
                <div className="text-sm font-bold text-indigo-300 mt-1 truncate">
                  {results.gestationalAge.formatted}
                </div>
              </div>
            </div>

            {/* Action Export Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rose-500/20 pt-4 print:hidden">
              <button
                onClick={() => setIsReportOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-rose-600/20 transition-all"
              >
                <Download className="w-4 h-4" />
                Generate PDF Report
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-xl text-xs font-medium transition-all"
                  title="Export CSV Data"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  CSV
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-xl text-xs font-medium transition-all"
                  title="Copy Summary"
                >
                  <Copy className="w-4 h-4 text-cyan-400" />
                  {copied ? "Copied!" : "Copy"}
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-xl text-xs font-medium transition-all"
                  title="Print Report"
                >
                  <Printer className="w-4 h-4 text-purple-400" />
                  Print
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Visualizations Container */}
          <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6 print:hidden">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-xl overflow-x-auto text-xs">
              <button
                onClick={() => setActiveTab("probability")}
                className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === "probability"
                    ? "bg-rose-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Probability Curve
              </button>

              <button
                onClick={() => setActiveTab("calendar")}
                className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === "calendar"
                    ? "bg-rose-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Cycle Phases
              </button>

              <button
                onClick={() => setActiveTab("timeline")}
                className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === "timeline"
                    ? "bg-rose-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Pregnancy Timeline
              </button>

              <button
                onClick={() => setActiveTab("implantation")}
                className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === "implantation"
                    ? "bg-rose-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Implantation Map
              </button>

              <button
                onClick={() => setActiveTab("bbt")}
                className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === "bbt"
                    ? "bg-rose-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                BBT Shift Chart
              </button>

              <button
                onClick={() => setActiveTab("forecast")}
                className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === "forecast"
                    ? "bg-rose-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                6-Month Forecast
              </button>
            </div>

            {/* TAB 1: Conception Probability Curve */}
            {activeTab === "probability" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Daily Conception Probability Curve
                  </h3>
                  <span className="text-xs text-slate-400">Peak Window: -2 to 0 DPO</span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.probabilities}>
                      <defs>
                        <linearGradient id="probGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} unit="%" domain={[0, 50]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderColor: "#334155",
                          borderRadius: "12px",
                          color: "#fff",
                        }}
                        formatter={(val: any) => [`${val}%`, "Conception Probability"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="probability"
                        stroke="#10b981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#probGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Probability Heatmap Bar */}
                <div className="grid grid-cols-7 gap-1.5 pt-2">
                  {results.probabilities.map((p) => (
                    <div
                      key={p.dayOffset}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        p.status === "Peak"
                          ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold scale-[1.03]"
                          : p.status === "High"
                          ? "bg-purple-500/15 border-purple-500/30 text-purple-300"
                          : p.status === "Moderate"
                          ? "bg-blue-500/10 border-blue-500/20 text-blue-300"
                          : "bg-slate-800/40 border-slate-800 text-slate-400"
                      }`}
                    >
                      <div className="text-[10px] uppercase font-semibold">{p.dayOffset === 0 ? "OVULATION" : `${p.dayOffset} D`}</div>
                      <div className="text-sm font-extrabold mt-0.5">{p.probability}%</div>
                      <div className="text-[9px] opacity-75 truncate">{p.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Cycle Phases */}
            {activeTab === "calendar" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-rose-400" />
                  28-Day Menstrual Cycle Phase Breakdown
                </h3>

                <div className="space-y-3">
                  {results.cyclePhases.map((cp, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3.5 h-12 rounded-full"
                          style={{ backgroundColor: cp.color }}
                        />
                        <div>
                          <div className="text-sm font-bold text-white">{cp.phaseName}</div>
                          <div className="text-xs text-slate-300 mt-0.5">{cp.description}</div>
                        </div>
                      </div>

                      <div className="text-right text-xs">
                        <div className="font-semibold text-rose-300">{cp.startDate} to {cp.endDate}</div>
                        <div className="text-slate-400 mt-0.5">{cp.durationDays} Days Duration</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Pregnancy Timeline */}
            {activeTab === "timeline" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Baby className="w-4 h-4 text-purple-400" />
                  Clinical 40-Week Pregnancy Milestones
                </h3>

                <div className="relative border-l-2 border-slate-800 ml-3 space-y-6 pl-6 pt-2">
                  {results.milestones.map((ms, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-rose-500 border-4 border-slate-900 group-hover:scale-125 transition-all" />
                      <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-rose-400">{ms.title}</span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 font-medium">
                            {ms.gestationalAge}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-white mt-1">{ms.date}</div>
                        <p className="text-xs text-slate-300 mt-1">{ms.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Implantation Map */}
            {activeTab === "implantation" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Embryo Implantation & Early hCG Window
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-cyan-500/30">
                    <div className="text-xs text-slate-400">Earliest Implantation</div>
                    <div className="text-lg font-bold text-cyan-400 mt-1">{results.implantationWindow.start}</div>
                    <div className="text-xs text-slate-300 mt-1">6 Days Post-Ovulation (6 DPO)</div>
                  </div>

                  <div className="bg-slate-800/50 p-4 rounded-xl border border-emerald-500/30">
                    <div className="text-xs text-slate-400">Peak Implantation Window</div>
                    <div className="text-lg font-bold text-emerald-400 mt-1">{results.implantationWindow.peakDate}</div>
                    <div className="text-xs text-slate-300 mt-1">8 to 10 DPO (Highest frequency)</div>
                  </div>

                  <div className="bg-slate-800/50 p-4 rounded-xl border border-amber-500/30">
                    <div className="text-xs text-slate-400">Earliest Positive Test</div>
                    <div className="text-lg font-bold text-amber-400 mt-1">{results.earliestTestDate.sensitive10Dpo}</div>
                    <div className="text-xs text-slate-300 mt-1">10 DPO Sensitive (10 mIU/mL)</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: BBT Trend Chart */}
            {activeTab === "bbt" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-rose-400" />
                    Basal Body Temperature (BBT) Thermal Shift Chart
                  </h3>
                  <span className="text-xs text-slate-400">Post-Ovulation Rise: +0.5°F to +1.0°F</span>
                </div>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.sampleBBTData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} label={{ value: 'Cycle Day', position: 'insideBottom', offset: -2 }} />
                      <YAxis stroke="#94a3b8" fontSize={11} domain={[97.0, 98.8]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderColor: "#334155",
                          borderRadius: "12px",
                          color: "#fff",
                        }}
                        formatter={(val: any) => [`${val} °F`, "BBT Reading"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#f43f5e"
                        strokeWidth={2.5}
                        dot={{ fill: "#f43f5e", r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* TAB 6: 6-Month Forecast */}
            {activeTab === "forecast" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-purple-400" />
                  6-Month Projected Fertility & Ovulation Calendar
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-300">
                    <thead className="bg-slate-800 text-slate-200 uppercase font-semibold">
                      <tr>
                        <th className="p-3">Cycle #</th>
                        <th className="p-3">Period Start</th>
                        <th className="p-3">Ovulation Date</th>
                        <th className="p-3">Fertile Window</th>
                        <th className="p-3">Estimated Due Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {results.forecast.map((fc) => (
                        <tr key={fc.cycleNumber} className="hover:bg-slate-800/40">
                          <td className="p-3 font-bold text-rose-400">Cycle {fc.cycleNumber}</td>
                          <td className="p-3">{fc.periodStartDate}</td>
                          <td className="p-3 font-semibold text-emerald-400">{fc.ovulationDate}</td>
                          <td className="p-3">{fc.fertileWindowStart} to {fc.fertileWindowEnd}</td>
                          <td className="p-3 text-purple-300">{fc.dueDateIfConceived}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Smart Insights & Personalized Recommendations */}
          <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 print:hidden">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Smart Insights & Clinical Recommendations
            </h3>

            <div className="space-y-2">
              {results.insights.map((ins, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{ins}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PDF Report Modal */}
      {isReportOpen && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          data={reportData}
        />
      )}
    </div>
  );
}

export default ConceptionCalculator;
