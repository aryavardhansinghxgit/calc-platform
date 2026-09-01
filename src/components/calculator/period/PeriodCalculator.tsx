"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Sparkles,
  Clock,
  Activity,
  CheckCircle2,
  Download,
  Copy,
  Info,
  Sliders,
  CalendarDays,
  Flame,
  HeartPulse,
  Baby,
  FileSpreadsheet,
  HelpCircle,
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
import { calculatePeriodCalculator } from "@/app/calculators/period-calculator/calculator";
import {
  PeriodCalculationMode,
  CycleRegularityType,
  BirthControlStatusType,
} from "@/app/calculators/period-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function PeriodCalculator() {
  // Mode State
  const [calculationMode, setCalculationMode] = useState<PeriodCalculationMode>("lmp");

  // Input States
  const [lmpDate, setLmpDate] = useState<string>("2026-01-01");
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [userAge, setUserAge] = useState<number>(28);
  const [lutealPhaseLength, setLutealPhaseLength] = useState<number>(14);
  const [cycleRegularity, setCycleRegularity] = useState<CycleRegularityType>("regular");
  const [birthControl, setBirthControl] = useState<BirthControlStatusType>("none");
  const [isPregnant, setIsPregnant] = useState<"no" | "yes" | "trying">("no");
  const [isBreastfeeding, setIsBreastfeeding] = useState<boolean>(false);
  const [hasPcos, setHasPcos] = useState<boolean>(false);

  // Active Visualization Tab
  const [activeTab, setActiveTab] = useState<
    "probability" | "future-12m" | "timeline" | "trends"
  >("probability");

  // Modal & Share State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Calculate Results Memo
  const results = useMemo(() => {
    return calculatePeriodCalculator({
      calculationMode,
      lmpDate,
      periodLength,
      cycleLength,
      userAge,
      lutealPhaseLength,
      cycleRegularity,
      birthControl,
      isPregnant,
      isBreastfeeding,
      hasPcos,
    });
  }, [
    calculationMode,
    lmpDate,
    periodLength,
    cycleLength,
    userAge,
    lutealPhaseLength,
    cycleRegularity,
    birthControl,
    isPregnant,
    isBreastfeeding,
    hasPcos,
  ]);

  // Mode List Config
  const modesList: { id: PeriodCalculationMode; label: string; icon: any; desc: string }[] = [
    { id: "lmp", label: "Last Period (LMP)", icon: Calendar, desc: "Predict from last period date" },
    { id: "cycle-length", label: "Cycle Length", icon: Activity, desc: "Calculate from cycle duration" },
    { id: "future-12m", label: "12-Month Future", icon: CalendarDays, desc: "Full 1-year period calendar" },
    { id: "tracker", label: "Period Tracker", icon: Clock, desc: "Active cycle tracking" },
    { id: "irregular", label: "Irregular Predictor", icon: Sliders, desc: "Variance bounds for irregular cycles" },
    { id: "fertility", label: "Fertility Planning", icon: Flame, desc: "Peak fertile window & ovulation" },
    { id: "pregnancy-plan", label: "Pregnancy Plan", icon: Baby, desc: "Conception & estimated due date" },
    { id: "analysis", label: "Cycle Regularity Analysis", icon: HeartPulse, desc: "Pattern predictability score" },
  ];

  // Mode Selection with View Synchronization
  const handleModeSelect = (modeId: PeriodCalculationMode) => {
    setCalculationMode(modeId);
    if (modeId === "future-12m") {
      setActiveTab("future-12m");
    } else if (modeId === "fertility") {
      setActiveTab("probability");
    } else if (modeId === "analysis") {
      setActiveTab("trends");
    } else if (modeId === "tracker") {
      setActiveTab("timeline");
    }
  };

  // Modern CSV Export (Blob & Object URL)
  const handleExportCSV = () => {
    let csvContent = "Category,Parameter,Value\n";
    csvContent += `Mode,${results.mode}\n`;
    csvContent += `First Day of Last Period (LMP),${results.lmpDate}\n`;
    csvContent += `Average Cycle Length (Days),${cycleLength}\n`;
    csvContent += `Period Duration (Days),${periodLength}\n`;
    csvContent += `Luteal Phase (Days),${lutealPhaseLength}\n`;
    csvContent += `Cycle Regularity,${cycleRegularity}\n`;
    csvContent += `Next Period Start Date,${results.nextPeriodStartDate}\n`;
    csvContent += `Next Period End Date,${results.nextPeriodEndDate}\n`;
    csvContent += `Estimated Prediction Range,${results.nextPeriodRange.earliest} to ${results.nextPeriodRange.latest} (±${results.nextPeriodRange.varianceDays} days)\n`;
    csvContent += `Days Until Next Period,${results.daysUntilNextPeriod}\n`;
    csvContent += `Estimated Ovulation Date,${results.nextOvulationDate}\n`;
    csvContent += `6-Day Fertile Window Start,${results.fertileWindow.start}\n`;
    csvContent += `6-Day Fertile Window End,${results.fertileWindow.end}\n`;
    csvContent += `Estimated Due Date If Conceived,${results.dueDateIfConceived}\n`;
    csvContent += `Cycle Regularity Score,${results.regularityScore}/100 (${results.regularityLabel})\n\n`;

    csvContent += "Cycle #,Month,Period Start,Period End,Ovulation Date,6-Day Fertile Start,6-Day Fertile End,Due Date If Conceived\n";
    results.futurePeriods.forEach((fp) => {
      csvContent += `${fp.cycleNumber},"${fp.monthLabel}",${fp.periodStartDate},${fp.periodEndDate},${fp.ovulationDate},${fp.fertileWindowStart},${fp.fertileWindowEnd},${fp.dueDateIfConceived}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `period_prediction_report_${results.nextPeriodStartDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Comprehensive Copy Summary Handler
  const handleCopy = () => {
    const summaryText = [
      `Period Calculator Results:`,
      `• Calculation Mode: ${calculationMode.toUpperCase()}`,
      `• Last Menstrual Period (LMP): ${results.lmpDate}`,
      `• Average Cycle Length: ${cycleLength} days`,
      `• Period Duration: ${periodLength} days`,
      `• Luteal Phase: ${lutealPhaseLength} days`,
      `• Cycle Regularity: ${cycleRegularity}`,
      `• Next Period Start Date: ${results.nextPeriodStartDate}`,
      `• Expected Period End Date: ${results.nextPeriodEndDate}`,
      `• Estimated Prediction Range: ${results.nextPeriodRange.earliest} to ${results.nextPeriodRange.latest} (±${results.nextPeriodRange.varianceDays} days)`,
      `• Days Until Period: ${results.daysUntilNextPeriod} days`,
      `• Estimated Ovulation Date: ${results.nextOvulationDate}`,
      `• 6-Day Fertile Window: ${results.fertileWindow.start} to ${results.fertileWindow.end}`,
      `• Due Date If Conceived: ${results.dueDateIfConceived}`,
      `• Cycle Regularity Score: ${results.regularityScore}/100 (${results.regularityLabel})`,
      `Calculated at CalcPlatform. Note: Predictions are mathematical estimates.`,
    ].join("\n");

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Report Modal Data Structure
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Period Calculator & Menstrual Cycle Suite",
      reportTitle: "Clinical Menstrual & Cycle Assessment Report",
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
        label: "Next Period Start Date",
        value: results.nextPeriodStartDate,
        subtitle: `${results.daysUntilNextPeriod} days away`,
        colorTheme: "rose",
      },
      {
        label: "Next Ovulation Date",
        value: results.nextOvulationDate,
        subtitle: "Peak fertile day",
        colorTheme: "emerald",
      },
      {
        label: "6-Day Fertile Window",
        value: `${results.fertileWindow.start} to ${results.fertileWindow.end}`,
        subtitle: "6-day conception window (O-5 to O)",
        colorTheme: "purple",
      },
      {
        label: "Cycle Regularity Score",
        value: `${results.regularityScore}/100 (${results.regularityLabel})`,
        subtitle: "Cycle predictability rating",
        colorTheme: "amber",
      },
    ],
    sections: [
      {
        title: "Input Parameters & Baseline Cycle Settings",
        items: [
          { label: "Calculation Mode", value: calculationMode.toUpperCase() },
          { label: "First Day of Last Period (LMP)", value: results.lmpDate },
          { label: "Period Duration", value: `${periodLength} days` },
          { label: "Average Cycle Length", value: `${cycleLength} days` },
          { label: "User Age", value: `${userAge} years` },
          { label: "Luteal Phase Duration", value: `${lutealPhaseLength} days` },
          { label: "Cycle Regularity", value: cycleRegularity.toUpperCase() },
          { label: "Birth Control Status", value: birthControl.toUpperCase() },
          { label: "PCOS History", value: hasPcos ? "YES" : "NO" },
        ],
      },
      {
        title: "Upcoming Cycle Milestones & Prediction Range",
        items: [
          { label: "Expected Period End Date", value: results.nextPeriodEndDate },
          { label: "Estimated Prediction Range", value: `${results.nextPeriodRange.earliest} to ${results.nextPeriodRange.latest} (±${results.nextPeriodRange.varianceDays} days)` },
          { label: "Estimated Ovulation Date", value: results.nextOvulationDate },
          { label: "Peak Fertile Window", value: `${results.fertileWindow.peakStart} to ${results.fertileWindow.peakEnd}` },
          { label: "Expected Implantation Window", value: `${results.implantationWindow.start} to ${results.implantationWindow.end}` },
          { label: "Estimated Due Date If Conceived", value: results.dueDateIfConceived },
        ],
      },
    ],
    recommendation: {
      title: "Personalized Menstrual Health Strategy",
      text: results.insights[0] || "Track the first day of full menstrual flow every month.",
      reasons: results.recommendations,
      score: results.regularityScore,
      rating: results.regularityLabel,
    },
    table: {
      title: "Future 12-Month Period Predictions",
      headers: [
        { key: "cycleNumber", label: "Cycle #", align: "left" },
        { key: "monthLabel", label: "Month", align: "left" },
        { key: "periodStartDate", label: "Period Start", align: "left" },
        { key: "periodEndDate", label: "Period End", align: "left" },
        { key: "ovulationDate", label: "Ovulation Date", align: "left" },
        { key: "fertileWindow", label: "6-Day Fertile Window", align: "left" },
      ],
      rows: results.futurePeriods.map((fp) => ({
        cycleNumber: `Cycle ${fp.cycleNumber}`,
        monthLabel: fp.monthLabel,
        periodStartDate: fp.periodStartDate,
        periodEndDate: fp.periodEndDate,
        ovulationDate: fp.ovulationDate,
        fertileWindow: `${fp.fertileWindowStart} to ${fp.fertileWindowEnd}`,
      })),
    },
    notes: [
      "Period predictions are calculated using standardized clinical cycle arithmetic (LMP + average cycle length).",
      "The 6-day fertile window encompasses the 5 days prior to ovulation plus ovulation day itself.",
      "The Cycle Regularity Score reflects input predictability, not a medical diagnosis of fertility or ovarian reserve.",
      "Consult a qualified healthcare professional if your cycle length is under 21 days or over 35 days.",
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 print:p-0 font-sans" id="calculator-main-view">
      {/* Light Theme Mode Selector Bar */}
      <div className="bg-white/90 backdrop-blur-md p-2.5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2" role="tablist" aria-label="Calculator Modes">
          {modesList.map((m) => {
            const Icon = m.icon;
            const isSelected = calculationMode === m.id;
            return (
              <button
                key={m.id}
                role="tab"
                id={`mode-tab-${m.id}`}
                aria-selected={isSelected}
                aria-controls="period-calculator-controls"
                onClick={() => handleModeSelect(m.id)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-500/20 font-semibold scale-[1.01]"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
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

      {/* Main Calculation & Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="period-calculator-controls">
        {/* Left Column: Accessible Inputs Form */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm print:hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
              Calculation Inputs
            </h2>
            <span className="text-xs px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold uppercase tracking-wider">
              {calculationMode}
            </span>
          </div>

          {/* First Day of Last Period (LMP) */}
          <div>
            <label
              htmlFor="period-lmp-date"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              First Day of Last Period (LMP)
            </label>
            <input
              id="period-lmp-date"
              name="lmpDate"
              type="date"
              value={lmpDate}
              onChange={(e) => setLmpDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all cursor-pointer"
            />
          </div>

          {/* Sliders: Period Duration and Cycle Length */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="period-duration"
                className="block text-xs font-medium text-slate-600 mb-1"
              >
                Period Duration:{" "}
                <span className="text-rose-600 font-bold">{periodLength} days</span>
              </label>
              <input
                id="period-duration"
                name="periodLength"
                type="range"
                min={2}
                max={10}
                value={periodLength}
                onChange={(e) => setPeriodLength(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
                aria-valuemin={2}
                aria-valuemax={10}
                aria-valuenow={periodLength}
              />
            </div>

            <div>
              <label
                htmlFor="period-cycle-length"
                className="block text-xs font-medium text-slate-600 mb-1"
              >
                Average Cycle Length:{" "}
                <span className="text-rose-600 font-bold">{cycleLength} days</span>
              </label>
              <input
                id="period-cycle-length"
                name="cycleLength"
                type="range"
                min={21}
                max={45}
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
                aria-valuemin={21}
                aria-valuemax={45}
                aria-valuenow={cycleLength}
              />
            </div>
          </div>

          {/* Advanced Health Parameters */}
          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
              Advanced Health Parameters
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="period-user-age"
                  className="block text-xs font-medium text-slate-600 mb-1"
                >
                  User Age:{" "}
                  <span className="text-rose-600 font-bold">{userAge} yrs</span>
                </label>
                <input
                  id="period-user-age"
                  name="userAge"
                  type="range"
                  min={12}
                  max={55}
                  value={userAge}
                  onChange={(e) => setUserAge(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                  aria-valuemin={12}
                  aria-valuemax={55}
                  aria-valuenow={userAge}
                />
              </div>

              <div>
                <label
                  htmlFor="period-luteal-phase"
                  className="block text-xs font-medium text-slate-600 mb-1"
                >
                  Luteal Phase:{" "}
                  <span className="text-rose-600 font-bold">{lutealPhaseLength} days</span>
                </label>
                <input
                  id="period-luteal-phase"
                  name="lutealPhaseLength"
                  type="range"
                  min={9}
                  max={16}
                  value={lutealPhaseLength}
                  onChange={(e) => setLutealPhaseLength(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                  aria-valuemin={9}
                  aria-valuemax={16}
                  aria-valuenow={lutealPhaseLength}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="period-cycle-regularity"
                className="block text-xs font-medium text-slate-600 mb-1"
              >
                Cycle Regularity
              </label>
              <select
                id="period-cycle-regularity"
                name="cycleRegularity"
                value={cycleRegularity}
                onChange={(e) => setCycleRegularity(e.target.value as CycleRegularityType)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white cursor-pointer"
              >
                <option value="regular">Regular (Varies ≤ 2–3 days)</option>
                <option value="slightly-irregular">Slightly Irregular (Varies 4–7 days)</option>
                <option value="moderately-irregular">Moderately Irregular (Varies 8–14 days)</option>
                <option value="highly-irregular">Highly Irregular (Varies &gt; 14 days)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="period-birth-control"
                  className="block text-xs font-medium text-slate-600 mb-1"
                >
                  Birth Control
                </label>
                <select
                  id="period-birth-control"
                  name="birthControl"
                  value={birthControl}
                  onChange={(e) => setBirthControl(e.target.value as BirthControlStatusType)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white cursor-pointer"
                >
                  <option value="none">None</option>
                  <option value="pill">Oral Pill (Combination/Progestin)</option>
                  <option value="iud">Hormonal/Copper IUD</option>
                  <option value="implant">Subdermal Arm Implant</option>
                  <option value="injection">Depo-Provera Injection</option>
                </select>
              </div>

              <div className="space-y-2 pt-4">
                <label
                  htmlFor="period-has-pcos"
                  className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700"
                >
                  <input
                    id="period-has-pcos"
                    name="hasPcos"
                    type="checkbox"
                    checked={hasPcos}
                    onChange={(e) => setHasPcos(e.target.checked)}
                    className="accent-rose-600 rounded cursor-pointer"
                  />
                  PCOS History
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Results & Interactive Visualizations */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Highlights Hero Card */}
          <div className="bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 p-6 rounded-2xl text-white shadow-xl shadow-rose-500/10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-rose-100 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  Next Period Start Date
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white mt-1">
                  {results.nextPeriodStartDate}
                </div>
                <div className="text-xs text-rose-100 mt-1">
                  Expected Period End: <span className="text-white font-semibold">{results.nextPeriodEndDate}</span> ({results.daysUntilNextPeriod} days away)
                </div>
              </div>

              <div className="text-right">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm"
                >
                  Regularity Score: {results.regularityScore}/100 ({results.regularityLabel})
                </span>
              </div>
            </div>

            {/* Irregular Prediction Range Callout */}
            {(calculationMode === "irregular" || cycleRegularity !== "regular") && (
              <div className="bg-white/15 border border-white/30 rounded-xl p-3 text-xs text-white flex items-start gap-2.5">
                <Sliders className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Estimated Prediction Range:</span>
                  <span className="text-rose-100">
                    {results.nextPeriodRange.earliest} – {results.nextPeriodRange.latest} (±{results.nextPeriodRange.varianceDays} days based on selected cycle variability)
                  </span>
                </div>
              </div>
            )}

            {/* Sub-Metrics Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                <div className="text-[11px] text-rose-100 flex items-center gap-1 font-medium">
                  <Flame className="w-3.5 h-3.5 text-amber-300" />
                  Next Ovulation Date
                </div>
                <div className="text-sm font-bold text-white mt-1 truncate">
                  {results.nextOvulationDate}
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                <div className="text-[11px] text-rose-100 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-amber-300" />
                  6-Day Fertile Window
                </div>
                <div className="text-sm font-bold text-white mt-1 truncate">
                  {results.fertileWindow.start} – {results.fertileWindow.end}
                </div>
                <div className="text-[10px] text-rose-200 mt-0.5">O-5 to Ovulation Day</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                <div className="text-[11px] text-rose-100 flex items-center gap-1 font-medium">
                  <Baby className="w-3.5 h-3.5 text-amber-300" />
                  Due Date If Conceived
                </div>
                <div className="text-sm font-bold text-white mt-1 truncate">
                  {results.dueDateIfConceived}
                </div>
                <div className="text-[10px] text-rose-200 mt-0.5">Ovulation + 266 days</div>
              </div>
            </div>

            {/* Clinical Neutrality Explanatory Note */}
            <p className="text-[11px] text-rose-100/90 leading-relaxed pt-1">
              *The Cycle Regularity Score reflects mathematical cycle consistency entered above. It does not measure ovarian reserve, fertility guarantee, or clinical health status.
            </p>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4 print:hidden">
              <button
                type="button"
                onClick={() => setIsReportOpen(true)}
                className="flex items-center gap-2 bg-white text-rose-700 hover:bg-rose-50 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-rose-600" />
                Generate PDF Report
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all cursor-pointer"
                  title="Export CSV Data"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  CSV
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all cursor-pointer"
                  title="Copy Summary"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Visualizations Container */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 print:hidden">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl overflow-x-auto text-xs" role="tablist" aria-label="Visualizations">
              <button
                role="tab"
                id="viz-tab-probability"
                aria-selected={activeTab === "probability"}
                aria-controls="viz-panel-probability"
                onClick={() => setActiveTab("probability")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "probability"
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Fertility Curve
              </button>

              <button
                role="tab"
                id="viz-tab-future-12m"
                aria-selected={activeTab === "future-12m"}
                aria-controls="viz-panel-future-12m"
                onClick={() => setActiveTab("future-12m")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "future-12m"
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                12-Month Calendar
              </button>

              <button
                role="tab"
                id="viz-tab-timeline"
                aria-selected={activeTab === "timeline"}
                aria-controls="viz-panel-timeline"
                onClick={() => setActiveTab("timeline")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "timeline"
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Cycle Phases
              </button>

              <button
                role="tab"
                id="viz-tab-trends"
                aria-selected={activeTab === "trends"}
                aria-controls="viz-panel-trends"
                onClick={() => setActiveTab("trends")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "trends"
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Cycle Stability Chart
              </button>
            </div>

            {/* TAB 1: Fertility Probability Curve */}
            {activeTab === "probability" && (
              <div className="space-y-4" id="viz-panel-probability" role="tabpanel" aria-labelledby="viz-tab-probability">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                    Daily Conception Probability Curve
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Peak Window: -2 to 0 DPO</span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.probabilities}>
                      <defs>
                        <linearGradient id="periodProbGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} unit="%" domain={[0, 50]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#cbd5e1",
                          borderRadius: "12px",
                          color: "#0f172a",
                          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                        }}
                        formatter={(val: any) => [`${val}%`, "Conception Probability"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="probability"
                        stroke="#059669"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#periodProbGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* TAB 2: 12-Month Calendar Table */}
            {activeTab === "future-12m" && (
              <div className="space-y-4" id="viz-panel-future-12m" role="tabpanel" aria-labelledby="viz-tab-future-12m">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                  Predicted 12-Month Period & Ovulation Schedule
                </h3>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 uppercase font-bold">
                      <tr>
                        <th className="p-3">Cycle #</th>
                        <th className="p-3">Month</th>
                        <th className="p-3">Period Start</th>
                        <th className="p-3">Period End</th>
                        <th className="p-3">Ovulation Date</th>
                        <th className="p-3">6-Day Fertile Window</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {results.futurePeriods.map((fp) => (
                        <tr key={fp.cycleNumber} className="hover:bg-rose-50/40">
                          <td className="p-3 font-bold text-rose-600">Cycle {fp.cycleNumber}</td>
                          <td className="p-3 font-semibold text-slate-900">{fp.monthLabel}</td>
                          <td className="p-3 font-bold text-rose-700">{fp.periodStartDate}</td>
                          <td className="p-3">{fp.periodEndDate}</td>
                          <td className="p-3 font-bold text-emerald-700">{fp.ovulationDate}</td>
                          <td className="p-3 text-purple-700 font-medium">
                            {fp.fertileWindowStart} to {fp.fertileWindowEnd}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: Cycle Phases */}
            {activeTab === "timeline" && (
              <div className="space-y-4" id="viz-panel-timeline" role="tabpanel" aria-labelledby="viz-tab-timeline">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                  Menstrual Cycle Phase Architecture
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
                        <div className="font-bold text-rose-700">
                          {cp.startDate} {cp.startDate !== cp.endDate ? `to ${cp.endDate}` : ""}
                        </div>
                        <div className="text-slate-500 mt-0.5 font-medium">{cp.durationDays} Days Duration</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Cycle Stability Trends */}
            {activeTab === "trends" && (
              <div className="space-y-4" id="viz-panel-trends" role="tabpanel" aria-labelledby="viz-tab-trends">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                  12-Month Cycle Length Stability Trend
                </h3>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.cycleTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="cycleLabel" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} domain={[15, 45]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#cbd5e1",
                          borderRadius: "12px",
                          color: "#0f172a",
                          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                        }}
                        formatter={(val: any) => [`${val} days`, "Cycle Duration"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="cycleLength"
                        stroke="#e11d48"
                        strokeWidth={2.5}
                        dot={{ fill: "#e11d48", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {/* Smart Insights & Personalized Recommendations */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 print:hidden">
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
              Smart Insights & Personalized Recommendations
            </h3>

            <div className="space-y-2.5">
              {results.insights.map((ins, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{ins}</span>
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

export default PeriodCalculator;
