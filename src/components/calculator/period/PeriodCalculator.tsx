"use client";

import React, { useState, useMemo } from "react";
import {
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
  HeartPulse,
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

  // Active View Tab
  const [activeTab, setActiveTab] = useState<
    | "probability"
    | "calendar"
    | "future-12m"
    | "timeline"
    | "trends"
    | "health"
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
    { id: "tracker", label: "Period Tracker", icon: Clock, desc: "Cycle history & trend tracking" },
    { id: "irregular", label: "Irregular Predictor", icon: Sliders, desc: "Variance bounds for irregular cycles" },
    { id: "fertility", label: "Fertility Planning", icon: Flame, desc: "Peak fertile window & ovulation" },
    { id: "pregnancy-plan", label: "Pregnancy Plan", icon: Baby, desc: "Conception & estimated due date" },
    { id: "analysis", label: "Cycle Health Analysis", icon: HeartPulse, desc: "Cycle health diagnostic score" },
  ];

  // CSV Export Handler
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Parameter,Value\n";
    csvContent += `Mode,${results.mode}\n`;
    csvContent += `Last Menstrual Period (LMP),${results.lmpDate}\n`;
    csvContent += `Next Period Start Date,${results.nextPeriodStartDate}\n`;
    csvContent += `Next Period End Date,${results.nextPeriodEndDate}\n`;
    csvContent += `Days Until Next Period,${results.daysUntilNextPeriod}\n`;
    csvContent += `Estimated Ovulation Date,${results.nextOvulationDate}\n`;
    csvContent += `Fertile Window Start,${results.fertileWindow.start}\n`;
    csvContent += `Fertile Window End,${results.fertileWindow.end}\n`;
    csvContent += `Cycle Health Status,${results.healthStatus}\n`;
    csvContent += `Cycle Health Score,${results.healthScore}%\n\n`;

    csvContent += "Cycle #,Period Start,Period End,Ovulation Date,Fertile Start,Fertile End,Due Date If Conceived\n";
    results.futurePeriods.forEach((fp) => {
      csvContent += `${fp.cycleNumber},${fp.periodStartDate},${fp.periodEndDate},${fp.ovulationDate},${fp.fertileWindowStart},${fp.fertileWindowEnd},${fp.dueDateIfConceived}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `period_report_${results.nextPeriodStartDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary Handler
  const handleCopy = () => {
    const summaryText = `Period Calculator Results:\n• Next Period Start Date: ${results.nextPeriodStartDate}\n• Next Period End Date: ${results.nextPeriodEndDate}\n• Days Until Period: ${results.daysUntilNextPeriod} days\n• Estimated Ovulation: ${results.nextOvulationDate}\n• Fertile Window: ${results.fertileWindow.start} to ${results.fertileWindow.end}\n• Cycle Health Status: ${results.healthStatus} (${results.healthScore}%)\nCalculated at Calculator Platform.`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Report Modal Structure
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Professional Period Calculator & Menstrual Cycle Suite",
      reportTitle: "Clinical Menstrual & Cycle Health Assessment Report",
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
        label: "Fertile Window Range",
        value: `${results.fertileWindow.start} to ${results.fertileWindow.end}`,
        subtitle: "6-day conception window",
        colorTheme: "purple",
      },
      {
        label: "Cycle Health Status",
        value: `${results.healthScore}% (${results.healthStatus})`,
        subtitle: "Hormonal & ovulatory rating",
        colorTheme: "amber",
      },
    ],
    sections: [
      {
        title: "Input Parameters & Cycle Parameters",
        items: [
          { label: "Calculation Mode", value: calculationMode.toUpperCase() },
          { label: "First Day of Last Period", value: results.lmpDate },
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
        title: "Upcoming Cycle Milestones",
        items: [
          { label: "Next Period End Date", value: results.nextPeriodEndDate },
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
      score: results.healthScore,
      rating: results.healthStatus,
    },
    table: {
      title: "Future 12-Month Period Predictions",
      headers: [
        { key: "cycleNumber", label: "Cycle #", align: "left" },
        { key: "monthLabel", label: "Month", align: "left" },
        { key: "periodStartDate", label: "Period Start", align: "left" },
        { key: "periodEndDate", label: "Period End", align: "left" },
        { key: "ovulationDate", label: "Ovulation Date", align: "left" },
      ],
      rows: results.futurePeriods.map((fp) => ({
        cycleNumber: `Cycle ${fp.cycleNumber}`,
        monthLabel: fp.monthLabel,
        periodStartDate: fp.periodStartDate,
        periodEndDate: fp.periodEndDate,
        ovulationDate: fp.ovulationDate,
      })),
    },
    notes: [
      "Period predictions are calculated using standardized clinical cycle math (LMP + average cycle length).",
      "Consult a qualified healthcare professional if your cycle length is under 21 days or over 35 days.",
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 print:p-0 font-sans">
      {/* Light Theme Mode Selector Bar */}
      <div className="bg-white/90 backdrop-blur-md p-2.5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
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
                    ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-500/20 font-semibold scale-[1.01]"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
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
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">Calculation Inputs
            </h2>
            <span className="text-xs px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold uppercase tracking-wider">
              {calculationMode}
            </span>
          </div>

          {/* Mode-Specific & Basic Input Fields */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              First Day of Last Period (LMP)
            </label>
            <input
              type="date"
              value={lmpDate}
              onChange={(e) => setLmpDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Period Duration: <span className="text-rose-600 font-bold">{periodLength} days</span>
              </label>
              <input
                type="range"
                min={2}
                max={10}
                value={periodLength}
                onChange={(e) => setPeriodLength(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Average Cycle Length: <span className="text-rose-600 font-bold">{cycleLength} days</span>
              </label>
              <input
                type="range"
                min={21}
                max={45}
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Advanced Inputs */}
          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Advanced Health Parameters
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  User Age: <span className="text-rose-600 font-bold">{userAge} yrs</span>
                </label>
                <input
                  type="range"
                  min={12}
                  max={55}
                  value={userAge}
                  onChange={(e) => setUserAge(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Luteal Phase: <span className="text-rose-600 font-bold">{lutealPhaseLength} days</span>
                </label>
                <input
                  type="range"
                  min={9}
                  max={16}
                  value={lutealPhaseLength}
                  onChange={(e) => setLutealPhaseLength(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Cycle Regularity
              </label>
              <select
                value={cycleRegularity}
                onChange={(e) => setCycleRegularity(e.target.value as CycleRegularityType)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              >
                <option value="regular">Regular (Varies ≤ 3 days)</option>
                <option value="slightly-irregular">Slightly Irregular (Varies 4–7 days)</option>
                <option value="moderately-irregular">Moderately Irregular (Varies 8–14 days)</option>
                <option value="highly-irregular">Highly Irregular (Varies &gt; 14 days)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Birth Control
                </label>
                <select
                  value={birthControl}
                  onChange={(e) => setBirthControl(e.target.value as BirthControlStatusType)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                >
                  <option value="none">None</option>
                  <option value="pill">Oral Pill</option>
                  <option value="iud">Hormonal/Copper IUD</option>
                  <option value="implant">Arm Implant</option>
                  <option value="injection">Depo Injection</option>
                </select>
              </div>

              <div className="space-y-2 pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={hasPcos}
                    onChange={(e) => setHasPcos(e.target.checked)}
                    className="accent-rose-600 rounded"
                  />
                  PCOS Diagnosis
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Results & Interactive Visualizations */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Highlights Hero Card */}
          <div className="bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 p-6 rounded-2xl text-white shadow-xl shadow-rose-500/10 space-y-6">
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
                  Health Score: {results.healthScore}% ({results.healthStatus})
                </span>
              </div>
            </div>

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
                  Peak Fertile Window
                </div>
                <div className="text-sm font-bold text-white mt-1 truncate">
                  {results.fertileWindow.start} – {results.fertileWindow.end}
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                <div className="text-[11px] text-rose-100 flex items-center gap-1 font-medium">
                  <Baby className="w-3.5 h-3.5 text-amber-300" />
                  Due Date If Conceived
                </div>
                <div className="text-sm font-bold text-white mt-1 truncate">
                  {results.dueDateIfConceived}
                </div>
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4 print:hidden">
              <button
                onClick={() => setIsReportOpen(true)}
                className="flex items-center gap-2 bg-white text-rose-700 hover:bg-rose-50 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all"
              >
                <Download className="w-4 h-4 text-rose-600" />
                Generate PDF Report
              </button>

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
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all"
                  title="Print Report"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Visualizations Container */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 print:hidden">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl overflow-x-auto text-xs">
              <button
                onClick={() => setActiveTab("probability")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "probability"
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Fertility Curve
              </button>

              <button
                onClick={() => setActiveTab("future-12m")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "future-12m"
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                12-Month Calendar
              </button>

              <button
                onClick={() => setActiveTab("timeline")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "timeline"
                    ? "bg-white text-rose-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Cycle Phases
              </button>

              <button
                onClick={() => setActiveTab("trends")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
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
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Daily Conception Probability Curve
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
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Predicted 12-Month Period & Ovulation Schedule
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
                        <th className="p-3">Fertile Window</th>
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
                          <td className="p-3 text-purple-700 font-medium">{fp.fertileWindowStart} to {fp.fertileWindowEnd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: Cycle Phases */}
            {activeTab === "timeline" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Menstrual Cycle Phase Architecture
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

            {/* TAB 4: Cycle Stability Trends */}
            {activeTab === "trends" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">12-Month Cycle Length Stability Trend
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
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Smart Insights & Personalized Recommendations
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
