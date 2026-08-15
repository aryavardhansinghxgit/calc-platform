"use client";

import React, { useState, useMemo } from "react";
import {
  Baby,
  Scale,
  Activity,
  Calendar,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Download,
  Printer,
  Share2,
  Copy,
  Info,
  Apple,
  Clock,
  HeartPulse,
  PieChart as PieIcon,
  Table as TableIcon,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { calculatePregnancyWeightGainCalculator } from "@/app/calculators/pregnancy-weight-gain-calculator/calculator";
import { UnitSystem, PregnancyType } from "@/app/calculators/pregnancy-weight-gain-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function PregnancyWeightGainCalculator() {
  // Inputs State
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [pregnancyType, setPregnancyType] = useState<PregnancyType>("single");
  const [week, setWeek] = useState<number>(20);

  // US Inputs
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(6);
  const [preWeightLbs, setPreWeightLbs] = useState<number>(130);
  const [currentWeightLbs, setCurrentWeightLbs] = useState<number>(142);

  // Metric Inputs
  const [heightCm, setHeightCm] = useState<number>(168);
  const [preWeightKg, setPreWeightKg] = useState<number>(59);
  const [currentWeightKg, setCurrentWeightKg] = useState<number>(64.5);

  // UI state
  const [activeTab, setActiveTab] = useState<"overview" | "breakdown" | "schedule" | "nutrition">("overview");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Perform calculations
  const results = useMemo(() => {
    return calculatePregnancyWeightGainCalculator({
      unitSystem,
      pregnancyType,
      week,
      heightFeet,
      heightInches,
      preWeightLbs,
      currentWeightLbs,
      heightCm,
      preWeightKg,
      currentWeightKg,
    });
  }, [
    unitSystem,
    pregnancyType,
    week,
    heightFeet,
    heightInches,
    preWeightLbs,
    currentWeightLbs,
    heightCm,
    preWeightKg,
    currentWeightKg,
  ]);

  // Unit handler toggle
  const handleUnitToggle = (newUnit: UnitSystem) => {
    if (newUnit === unitSystem) return;
    if (newUnit === "metric") {
      const totalInches = heightFeet * 12 + heightInches;
      setHeightCm(Math.round(totalInches * 2.54));
      setPreWeightKg(parseFloat((preWeightLbs / 2.20462).toFixed(1)));
      setCurrentWeightKg(parseFloat((currentWeightLbs / 2.20462).toFixed(1)));
    } else {
      const totalInches = Math.round(heightCm / 2.54);
      setHeightFeet(Math.floor(totalInches / 12));
      setHeightInches(totalInches % 12);
      setPreWeightLbs(Math.round(preWeightKg * 2.20462));
      setCurrentWeightLbs(Math.round(currentWeightKg * 2.20462));
    }
    setUnitSystem(newUnit);
  };

  // Recharts 40-week Trajectory chart data
  const chartData = useMemo(() => {
    return results.schedule.map((item) => {
      const isCurrent = item.week === week;
      const minW = unitSystem === "metric" ? item.minWeightKg : item.minWeightLbs;
      const maxW = unitSystem === "metric" ? item.maxWeightKg : item.maxWeightLbs;
      const actualW =
        isCurrent
          ? unitSystem === "metric"
            ? results.currentWeightKg
            : results.currentWeightLbs
          : null;

      return {
        week: `W${item.week}`,
        weekNum: item.week,
        minWeight: minW,
        maxWeight: maxW,
        bandRange: [minW, maxW],
        actualWeight: actualW,
        minGain: unitSystem === "metric" ? item.minGainKg : item.minGainLbs,
        maxGain: unitSystem === "metric" ? item.maxGainKg : item.maxGainLbs,
      };
    });
  }, [results.schedule, week, unitSystem, results.currentWeightKg, results.currentWeightLbs]);

  // Copy Summary
  const handleCopySummary = () => {
    const text = `Pregnancy Weight Gain Summary (Week ${results.currentWeek}):
• Pre-Pregnancy BMI: ${results.preBmi} (${results.bmiCategory})
• Total Recommended Gain (40 wks): ${results.recommendedGainTotalFormatted}
• Week ${results.currentWeek} Target Gain Range: ${results.targetGainWeekFormatted}
• Current Weight: ${
      unitSystem === "metric" ? `${results.currentWeightKg} kg` : `${results.currentWeightLbs} lbs`
    } (${results.statusLabel})
Calculated on CalcPlatform.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Export Schedule CSV
  const handleExportCsv = () => {
    const headers = [
      "Week",
      "Trimester",
      `Min Gain (${unitSystem === "metric" ? "kg" : "lbs"})`,
      `Max Gain (${unitSystem === "metric" ? "kg" : "lbs"})`,
      `Min Weight (${unitSystem === "metric" ? "kg" : "lbs"})`,
      `Max Weight (${unitSystem === "metric" ? "kg" : "lbs"})`,
      "Daily Extra Calorie (kcal)",
      "Fetal Milestone",
    ];

    const rows = results.schedule.map((s) => [
      s.week,
      s.trimester,
      unitSystem === "metric" ? s.minGainKg : s.minGainLbs,
      unitSystem === "metric" ? s.maxGainKg : s.maxGainLbs,
      unitSystem === "metric" ? s.minWeightKg : s.minWeightLbs,
      unitSystem === "metric" ? s.maxWeightKg : s.maxWeightLbs,
      s.extraCalorieKcal,
      `"${s.fetalMilestone.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pregnancy_weight_gain_week_${week}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Construct direct CalculatorReportData for ReportModal
  const reportData: CalculatorReportData = useMemo(() => {
    const now = new Date();
    return {
      meta: {
        calculatorName: "Pregnancy Weight Gain Platform",
        reportTitle: "Clinical Maternal Weight Gain & Gestational Assessment",
        generatedDate: now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        generatedTime: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      },
      keyMetrics: [
        {
          label: "Gestational Age",
          value: `Week ${results.currentWeek}`,
          subtitle: `Trimester ${results.trimester}`,
          colorTheme: "rose",
        },
        {
          label: `Week ${results.currentWeek} Target Gain`,
          value: results.targetGainWeekFormatted,
          subtitle: `Status: ${results.statusLabel}`,
          colorTheme: "emerald",
        },
        {
          label: "40-Week Recommended Total",
          value: results.recommendedGainTotalFormatted,
          subtitle: "Institute of Medicine Target",
          colorTheme: "purple",
        },
        {
          label: "Pre-Pregnancy BMI",
          value: `${results.preBmi}`,
          subtitle: results.bmiCategory,
          colorTheme: "blue",
        },
      ],
      sections: [
        {
          title: "Maternal & Pregnancy Inputs",
          items: [
            { label: "Unit System", value: unitSystem.toUpperCase() },
            { label: "Pregnancy Type", value: results.pregnancyType === "twins" ? "Twins / Multiples" : "Single Fetus" },
            { label: "Gestational Age", value: `Week ${results.currentWeek}` },
            {
              label: "Height",
              value: unitSystem === "metric" ? `${results.heightCm} cm` : `${results.heightFeet}' ${results.heightInches}"`,
            },
            {
              label: "Pre-Pregnancy Weight",
              value: unitSystem === "metric" ? `${results.preWeightKg} kg` : `${results.preWeightLbs} lbs`,
            },
            {
              label: "Current Weight",
              value: unitSystem === "metric" ? `${results.currentWeightKg} kg` : `${results.currentWeightLbs} lbs`,
            },
          ],
        },
        {
          title: "Clinical Weight Gain Assessment",
          items: [
            { label: "Pre-Pregnancy BMI", value: `${results.preBmi} (${results.bmiCategoryKey.toUpperCase()})` },
            {
              label: "Actual Weight Gain So Far",
              value: unitSystem === "metric" ? `${results.actualGainKg} kg` : `${results.actualGainLbs} lbs`,
              highlight: true,
            },
            { label: `Week ${results.currentWeek} Target Gain Range`, value: results.targetGainWeekFormatted, highlight: true },
            { label: "Total Recommended 40-Wk Gain", value: results.recommendedGainTotalFormatted },
            { label: "Recommended T2/T3 Weekly Pace", value: results.weeklyRateFormatted },
            { label: "Clinical Weight Status", value: results.statusLabel, highlight: true },
          ],
        },
      ],
      recommendation: {
        title: `Clinical Status: ${results.statusLabel}`,
        text: `${results.statusSummary} ${results.statusAdvice}`,
        reasons: [
          `Trimester ${results.trimester} Calorie Target: +${results.extraCalorieKcal} kcal/day surplus.`,
          "Key Daily Nutrients: Folic Acid 600mcg, Protein 71g, Iron 27mg, Calcium 1,000mg, DHA 200mg.",
          "Maintain regular prenatal care visits with your Obstetrician or Certified Nurse-Midwife.",
        ],
      },
      table: {
        title: "Selected 40-Week Timeline Schedule",
        headers: [
          { key: "week", label: "Week", align: "left" },
          { key: "trimester", label: "Trimester", align: "left" },
          { key: "targetGain", label: "Target Gain", align: "left" },
          { key: "targetWeight", label: "Target Weight", align: "left" },
          { key: "calorieSurplus", label: "Calorie Surplus", align: "right" },
        ],
        rows: results.schedule
          .filter((s) => s.week % 4 === 0 || s.week === week || s.week === 1)
          .map((s) => ({
            week: `Week ${s.week}`,
            trimester: `Trimester ${s.trimester}`,
            targetGain: unitSystem === "metric" ? `${s.minGainKg}–${s.maxGainKg} kg` : `${s.minGainLbs}–${s.maxGainLbs} lbs`,
            targetWeight: unitSystem === "metric" ? `${s.minWeightKg}–${s.maxWeightKg} kg` : `${s.minWeightLbs}–${s.maxWeightLbs} lbs`,
            calorieSurplus: `+${s.extraCalorieKcal} kcal`,
          })),
      },
      notes: [
        "Generated by CalcPlatform Pregnancy Weight Gain Engine.",
        "Clinical guidelines derived from Institute of Medicine (IOM) & ACOG guidelines.",
      ],
    };
  }, [results, unitSystem, week]);

  return (
    <div className="space-y-6">
      {/* 1. Main Interactive Input & Control Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400">
              <Baby className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-blue-600 dark:text-blue-400">
                Pregnancy & Maternal Details
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Institute of Medicine (IOM) & ACOG Weight Gain Calculator
              </p>
            </div>
          </div>

          {/* Unit System Selector Toggle */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl self-start sm:self-auto">
            <button
              type="button"
              onClick={() => handleUnitToggle("us")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                unitSystem === "us"
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              US Units (lbs, ft/in)
            </button>
            <button
              type="button"
              onClick={() => handleUnitToggle("metric")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                unitSystem === "metric"
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              Metric Units (kg, cm)
            </button>
          </div>
        </div>

        {/* Input Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Pregnancy Type Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
              <span>Pregnancy Type</span>
              <span className="text-[10px] text-zinc-400">Singleton vs Twins</span>
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 rounded-xl">
              <button
                type="button"
                onClick={() => setPregnancyType("single")}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                  pregnancyType === "single"
                    ? "bg-pink-600 text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
                }`}
              >
                <Baby className="h-3.5 w-3.5" /> Single Baby
              </button>
              <button
                type="button"
                onClick={() => setPregnancyType("twins")}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                  pregnancyType === "twins"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
                }`}
              >
                <UsersIcon className="h-3.5 w-3.5" /> Twins / Multiples
              </button>
            </div>
          </div>

          {/* Height Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Height
            </label>
            {unitSystem === "us" ? (
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <input
                    type="number"
                    min={3}
                    max={7}
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-zinc-400">ft</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={11}
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-zinc-400">in</span>
                </div>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="number"
                  min={100}
                  max={230}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <span className="absolute right-3 top-2.5 text-xs text-zinc-400">cm</span>
              </div>
            )}
          </div>

          {/* Current Pregnancy Week Slider & Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <span>Pregnancy Stage</span>
              <span className="px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 text-[11px] font-bold">
                Week {week} (Trimester {results.trimester})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={40}
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-pink-600"
              />
              <input
                type="number"
                min={1}
                max={40}
                value={week}
                onChange={(e) => setWeek(Math.min(40, Math.max(1, Number(e.target.value))))}
                className="w-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-2.5 py-1.5 text-sm font-semibold text-center text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Pre-Pregnancy Weight */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Pre-Pregnancy Weight
            </label>
            <div className="relative">
              <input
                type="number"
                step={0.5}
                value={unitSystem === "us" ? preWeightLbs : preWeightKg}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (unitSystem === "us") setPreWeightLbs(val);
                  else setPreWeightKg(val);
                }}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <span className="absolute right-3 top-2.5 text-xs text-zinc-400">
                {unitSystem === "us" ? "lbs" : "kg"}
              </span>
            </div>
          </div>

          {/* Current Weight */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Current Weight (Week {week})
            </label>
            <div className="relative">
              <input
                type="number"
                step={0.5}
                value={unitSystem === "us" ? currentWeightLbs : currentWeightKg}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (unitSystem === "us") setCurrentWeightLbs(val);
                  else setCurrentWeightKg(val);
                }}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <span className="absolute right-3 top-2.5 text-xs text-zinc-400">
                {unitSystem === "us" ? "lbs" : "kg"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hero Status Alert Banner */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          results.statusKey === "on-track"
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
            : results.statusKey === "under"
            ? "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200"
            : "bg-orange-500/10 border-orange-500/30 text-orange-900 dark:text-orange-200"
        }`}
      >
        <div className="flex items-start gap-3.5">
          <div
            className={`p-2 rounded-xl shrink-0 ${
              results.statusKey === "on-track"
                ? "bg-emerald-500 text-white"
                : results.statusKey === "under"
                ? "bg-amber-500 text-white"
                : "bg-orange-500 text-white"
            }`}
          >
            {results.statusKey === "on-track" ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight">{results.statusLabel}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-white/60 dark:bg-black/40">
                Week {results.currentWeek} Status
              </span>
            </div>
            <p className="text-xs font-medium leading-relaxed">{results.statusSummary}</p>
            <p className="text-xs opacity-90 leading-relaxed">{results.statusAdvice}</p>
          </div>
        </div>
      </div>

      {/* 3. Metric Dashboard Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Pre-pregnancy BMI */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Pre-Pregnancy BMI</span>
            <Activity className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
            {results.preBmi}{" "}
            <span className="text-xs font-normal text-zinc-400">kg/m²</span>
          </div>
          <p className="text-[11px] font-semibold text-pink-600 dark:text-pink-400 truncate">
            {results.bmiCategory}
          </p>
        </div>

        {/* Card 2: Week X Target Gain */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Week {results.currentWeek} Target Gain</span>
            <Calendar className="h-4 w-4 text-pink-500" />
          </div>
          <div className="text-2xl font-black text-pink-600 dark:text-pink-400">
            {results.targetGainWeekFormatted}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Current Weight Gain:{" "}
            <strong className="text-zinc-800 dark:text-zinc-200">
              {unitSystem === "metric"
                ? `${results.actualGainKg} kg`
                : `${results.actualGainLbs} lbs`}
            </strong>
          </p>
        </div>

        {/* Card 3: Total 40-Week Recommended Gain */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Total 40-Week Gain</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
            {results.recommendedGainTotalFormatted}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Institute of Medicine guideline target
          </p>
        </div>

        {/* Card 4: Recommended T2/T3 Pace */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Weekly Gain Rate (T2/T3)</span>
            <Clock className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
            {results.weeklyRateFormatted}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Average gain rate in 2nd & 3rd trimesters
          </p>
        </div>
      </div>

      {/* 4. Tab Navigation for Detailed Views */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "overview"
                ? "bg-pink-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" /> 40-Week Trajectory Chart
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("breakdown")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "breakdown"
                ? "bg-pink-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <PieIcon className="h-3.5 w-3.5" /> Weight Composition Breakdown
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("schedule")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "schedule"
                ? "bg-pink-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <TableIcon className="h-3.5 w-3.5" /> 40-Week Gain Schedule
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("nutrition")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === "nutrition"
                ? "bg-pink-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Apple className="h-3.5 w-3.5" /> Calorie & Nutrient Targets
          </button>
        </div>

        {/* TAB CONTENT 1: 40-Week Trajectory Chart */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  Gestational Weight Gain Band (Week 1 – 40)
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Green shaded band represents optimal clinical range based on pre-pregnancy BMI.
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-emerald-500/40 border border-emerald-500 inline-block"></span>
                  Optimal Range
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-pink-600 inline-block"></span>
                  Current Weight
                </span>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="optimalBand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="week" stroke="#9ca3af" fontSize={11} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 p-3 rounded-xl border border-zinc-800 shadow-xl text-xs space-y-1">
                            <p className="font-bold text-pink-400">{data.week} Target Range</p>
                            <p>
                              Min Weight: <strong>{data.minWeight} {unitSystem === "metric" ? "kg" : "lbs"}</strong>
                            </p>
                            <p>
                              Max Weight: <strong>{data.maxWeight} {unitSystem === "metric" ? "kg" : "lbs"}</strong>
                            </p>
                            <p className="text-zinc-400">
                              Target Gain: {data.minGain} – {data.maxGain} {unitSystem === "metric" ? "kg" : "lbs"}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="maxWeight"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#optimalBand)"
                  />
                  <Area
                    type="monotone"
                    dataKey="minWeight"
                    stroke="#059669"
                    strokeWidth={2}
                    fill="#ffffff"
                    fillOpacity={0.0}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB CONTENT 2: Weight Composition Breakdown */}
        {activeTab === "breakdown" && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                Where Does the Weight Go at Week {results.currentWeek}?
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Physiological distribution of pregnancy weight gain across maternal and fetal tissues.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Pie Chart */}
              <div className="lg:col-span-5 h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={results.breakdown}
                      dataKey="weightLbs"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                    >
                      {results.breakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any) => [
                        `${value} lbs (${(
                          Number(value) / 2.20462
                        ).toFixed(1)} kg)`,
                        "Estimated Mass",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend & Breakdown Table */}
              <div className="lg:col-span-7 space-y-2.5">
                {results.breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-md shrink-0"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <div>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {item.name}
                        </span>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">
                        {unitSystem === "metric" ? `${item.weightKg} kg` : `${item.weightLbs} lbs`}
                      </span>
                      <p className="text-[10px] text-zinc-400">{item.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT 3: 40-Week Schedule Table */}
        {activeTab === "schedule" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  40-Week Gestational Weight Schedule
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Clinical weight gain boundaries and fetal development milestones by week.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportCsv}
                className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" /> CSV Schedule
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 max-h-96">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 sticky top-0 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="p-3">Week</th>
                    <th className="p-3">Trimester</th>
                    <th className="p-3">Target Gain Range</th>
                    <th className="p-3">Target Total Weight</th>
                    <th className="p-3">Calorie Surplus</th>
                    <th className="p-3">Fetal Milestone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {results.schedule.map((row) => {
                    const isSelected = row.week === week;
                    return (
                      <tr
                        key={row.week}
                        className={`transition-colors ${
                          isSelected
                            ? "bg-pink-500/10 text-pink-900 dark:text-pink-200 font-bold"
                            : "hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                        }`}
                      >
                        <td className="p-3 font-semibold">
                          Week {row.week} {isSelected && "📍"}
                        </td>
                        <td className="p-3">Trimester {row.trimester}</td>
                        <td className="p-3">
                          {unitSystem === "metric"
                            ? `${row.minGainKg} – ${row.maxGainKg} kg`
                            : `${row.minGainLbs} – ${row.maxGainLbs} lbs`}
                        </td>
                        <td className="p-3">
                          {unitSystem === "metric"
                            ? `${row.minWeightKg} – ${row.maxWeightKg} kg`
                            : `${row.minWeightLbs} – ${row.maxWeightLbs} lbs`}
                        </td>
                        <td className="p-3 text-pink-600 dark:text-pink-400 font-semibold">
                          +{row.extraCalorieKcal} kcal
                        </td>
                        <td className="p-3 text-[11px] max-w-xs truncate">
                          {row.fetalMilestone}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB CONTENT 4: Calorie & Nutrient Targets */}
        {activeTab === "nutrition" && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20 text-zinc-900 dark:text-zinc-100 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                  Trimester {results.trimester} Calorie Recommendation
                </h4>
                <p className="text-base font-extrabold">
                  +{results.extraCalorieKcal} Extra Calories / Day
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Focus on nutrient-dense foods (proteins, whole grains, healthy fats) rather than empty sugars.
                </p>
              </div>
              <Apple className="h-10 w-10 text-pink-500 shrink-0 opacity-80" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.nutrientGuidelines.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {item.nutrient}
                    </span>
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-pink-600 dark:text-pink-400">
                      {item.target}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.importance}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-500">
                    <strong>Food Sources:</strong> {item.topSources}
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

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default PregnancyWeightGainCalculator;
