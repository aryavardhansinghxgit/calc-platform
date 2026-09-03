"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  calculatePregnancy,
  PregnancyInputs,
  PregnancyMode,
  PregnancyType,
  EmbryoAge,
  UnitSystem,
  formatDateStr,
  parseLocalDate,
  addDays,
} from "@/lib/calculator-engine/formulas/pregnancy";
import { FETAL_WEEKLY_DATA } from "./fetalData";
import { PregnancyCharts } from "./PregnancyCharts";
import { PregnancyCalendar } from "./PregnancyCalendar";
import { PregnancyReportModal } from "./PregnancyReportModal";
import {
  Baby,
  Printer,
  Copy,
  Check,
  Share2,
  RotateCcw,
  Download,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const PregnancyCalculator: React.FC = () => {
  const todayStr = formatDateStr(new Date());

  // Input states
  const [mode, setMode] = useState<PregnancyMode>("lmp");
  const [lmpDate, setLmpDate] = useState<string>("2026-01-01");
  const [dueDate, setDueDate] = useState<string>("2026-10-08");
  const [conceptionDate, setConceptionDate] = useState<string>("2026-01-15");
  const [ultrasoundDate, setUltrasoundDate] = useState<string>(todayStr);
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState<number>(8);
  const [ultrasoundDays, setUltrasoundDays] = useState<number>(0);
  const [ivfDate, setIvfDate] = useState<string>(todayStr);
  const [embryoAge, setEmbryoAge] = useState<EmbryoAge>("day5");
  const [customStartDate, setCustomStartDate] = useState<string>(todayStr);
  const [targetDueDate, setTargetDueDate] = useState<string>("2026-11-15");

  const [cycleLength, setCycleLength] = useState<number>(28);
  const [pregnancyType, setPregnancyType] = useState<PregnancyType>("single");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");

  // Maternal profile
  const [motherAge, setMotherAge] = useState<number>(28);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(5);
  const [heightCm, setHeightCm] = useState<number>(165);
  const [preWeightLbs, setPreWeightLbs] = useState<number>(135);
  const [preWeightKg, setPreWeightKg] = useState<number>(61.2);
  const [currentWeightLbs, setCurrentWeightLbs] = useState<number>(142);
  const [currentWeightKg, setCurrentWeightKg] = useState<number>(64.4);

  // Active view tab & Report modal state
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  // Sync Unit Toggles seamlessly
  const handleUnitToggle = (newUnits: UnitSystem) => {
    if (newUnits === unitSystem) return;
    if (newUnits === "metric") {
      const totalIn = heightFt * 12 + heightIn;
      setHeightCm(Math.round(totalIn * 2.54));
      setPreWeightKg(Math.round(preWeightLbs * 0.45359237 * 10) / 10);
      setCurrentWeightKg(Math.round(currentWeightLbs * 0.45359237 * 10) / 10);
    } else {
      const totalIn = heightCm / 2.54;
      setHeightFt(Math.floor(totalIn / 12));
      setHeightIn(Math.round(totalIn % 12));
      setPreWeightLbs(Math.round((preWeightKg * 2.20462262) * 10) / 10);
      setCurrentWeightLbs(Math.round((currentWeightKg * 2.20462262) * 10) / 10);
    }
    setUnitSystem(newUnits);
  };

  // Perform Calculation
  const inputs: PregnancyInputs = useMemo(
    () => ({
      mode,
      lmpDate,
      dueDate,
      conceptionDate,
      ultrasoundDate,
      ultrasoundWeeks,
      ultrasoundDays,
      ivfDate,
      embryoAge,
      customStartDate,
      targetDueDate,
      cycleLength,
      pregnancyType,
      motherAge,
      heightFt,
      heightIn,
      heightCm,
      preWeightLbs,
      preWeightKg,
      currentWeightLbs,
      currentWeightKg,
      unitSystem,
    }),
    [
      mode,
      lmpDate,
      dueDate,
      conceptionDate,
      ultrasoundDate,
      ultrasoundWeeks,
      ultrasoundDays,
      ivfDate,
      embryoAge,
      customStartDate,
      targetDueDate,
      cycleLength,
      pregnancyType,
      motherAge,
      heightFt,
      heightIn,
      heightCm,
      preWeightLbs,
      preWeightKg,
      currentWeightLbs,
      currentWeightKg,
      unitSystem,
    ]
  );

  const results = useMemo(() => calculatePregnancy(inputs), [inputs]);

  // Set default selected week to current gestational age week
  const activeWeekNumber = selectedWeek ?? Math.min(42, Math.max(1, results.gestationalAgeWeeks));
  const weekDetail = FETAL_WEEKLY_DATA[activeWeekNumber] || FETAL_WEEKLY_DATA[42];

  // Actions
  const handleCopySummary = () => {
    const summary = [
      `PREGNANCY CLINICAL SUMMARY`,
      `Calculation Mode: ${mode.toUpperCase()}`,
      `Pregnancy Type: ${pregnancyType.toUpperCase()}`,
      `Estimated Due Date (EDD): ${results.dueDateStr}`,
      `Gestational Age: ${results.gestationalAgeWeeks}w ${results.gestationalAgeDays}d`,
      `Total Days Pregnant: ${results.totalDaysPregnant} days`,
      `Days Remaining: ${results.daysRemaining} days`,
      `Estimated Conception: ${results.conceptionDateStr}`,
      `Birth Window: ${results.estimatedBirthWindowStart} – ${results.estimatedBirthWindowEnd}`,
      `Pre-Pregnancy BMI: ${results.weightMetrics.preBmi} (${results.weightMetrics.bmiCategory})`,
      `Target Gain (Total): ${results.weightMetrics.minRecommendedLbs} – ${results.weightMetrics.maxRecommendedLbs} lbs`,
      `Current Gain: ${results.weightMetrics.currentGainLbs} lbs (${results.weightMetrics.status})`,
    ].join("\n");

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleShare = () => {
    const params = new URLSearchParams({
      mode,
      type: pregnancyType,
      units: unitSystem,
      cycle: String(cycleLength),
    });
    if (mode === "lmp") params.set("lmp", lmpDate);
    if (mode === "due-date") params.set("due", dueDate);
    if (mode === "conception") params.set("conc", conceptionDate);
    if (mode === "ultrasound") {
      params.set("usDate", ultrasoundDate);
      params.set("usW", String(ultrasoundWeeks));
      params.set("usD", String(ultrasoundDays));
    }
    if (mode === "ivf") {
      params.set("ivfDate", ivfDate);
      params.set("embryo", embryoAge);
    }
    if (mode === "custom") params.set("custom", customStartDate);
    if (mode === "reverse") params.set("targetDue", targetDueDate);

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  const handleReset = () => {
    setMode("lmp");
    setLmpDate("2026-01-01");
    setDueDate("2026-10-08");
    setConceptionDate("2026-01-15");
    setUltrasoundDate(todayStr);
    setUltrasoundWeeks(8);
    setUltrasoundDays(0);
    setIvfDate(todayStr);
    setEmbryoAge("day5");
    setCustomStartDate(todayStr);
    setTargetDueDate("2026-11-15");
    setCycleLength(28);
    setPregnancyType("single");
    setUnitSystem("imperial");
    setHeightFt(5);
    setHeightIn(5);
    setHeightCm(165);
    setPreWeightLbs(135);
    setPreWeightKg(61.2);
    setCurrentWeightLbs(142);
    setCurrentWeightKg(64.4);
    setSelectedWeek(null);
  };

  const handleExportCsv = () => {
    const headers = [
      "Week",
      "Milestone",
      "Fetal Size Analogy",
      "Length (cm)",
      "Length (in)",
      "Weight (g)",
      "Weight (oz/lb)",
      "Development Summary",
    ];

    const rows = Array.from({ length: 42 }, (_, i) => {
      const w = i + 1;
      const f = FETAL_WEEKLY_DATA[w] || FETAL_WEEKLY_DATA[42];
      const m = results.milestones.find((item) => item.week === w)?.title || "Routine Prenatal Progression";
      return [
        `Week ${w}`,
        `"${m.replace(/"/g, '""')}"`,
        `"${f.sizeAnalogy.replace(/"/g, '""')}"`,
        w <= 2 ? "N/A" : f.lengthCm,
        w <= 2 ? "N/A" : f.lengthInches,
        w <= 2 ? "N/A" : f.weightGrams,
        w <= 2 ? "N/A" : `"${f.weightOunces}"`,
        `"${f.babyDevelopment.replace(/"/g, '""')}"`,
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pregnancy_timeline_${mode}_schedule.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. TOP MODE SELECTOR TABS (7 MODES) */}
      <div className="p-2 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          {[
            { id: "lmp", label: "Last Period (LMP)" },
            { id: "due-date", label: "Due Date" },
            { id: "conception", label: "Conception Date" },
            { id: "ultrasound", label: "Ultrasound Scan" },
            { id: "ivf", label: "IVF Transfer" },
            { id: "custom", label: "Custom Start" },
            { id: "reverse", label: "Reverse Due Date" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id as PregnancyMode);
                setSelectedWeek(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                mode === m.id
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/20 scale-[1.02]"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700/60"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. MAIN GRID: INPUTS (COL 5) & RESULTS (COL 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* INPUT PANEL (COL 5) */}
        <div className="lg:col-span-5 space-y-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Pregnancy Parameters
            </h2>
            <button
              onClick={() => handleUnitToggle(unitSystem === "imperial" ? "metric" : "imperial")}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              {unitSystem === "imperial" ? "Units: Imperial (lbs/ft)" : "Units: Metric (kg/cm)"}
            </button>
          </div>

          {/* DYNAMIC MODE INPUTS */}
          {mode === "lmp" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  First Day of Last Menstrual Period (LMP)
                </label>
                <input
                  type="date"
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Average Cycle Length (Days)
                  </label>
                  <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">{cycleLength} Days</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={45}
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                  className="w-full accent-rose-600"
                />
                <span className="text-[11px] text-zinc-500 block">Normal range: 21 to 35 days (Default: 28 days)</span>
              </div>
            </div>
          )}

          {mode === "due-date" && (
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Target Estimated Due Date (EDD)
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          )}

          {mode === "conception" && (
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Known or Estimated Conception Date
              </label>
              <input
                type="date"
                value={conceptionDate}
                onChange={(e) => setConceptionDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          )}

          {mode === "ultrasound" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Ultrasound Scan Date
                </label>
                <input
                  type="date"
                  value={ultrasoundDate}
                  onChange={(e) => setUltrasoundDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Gestational Weeks
                  </label>
                  <input
                    type="number"
                    min={4}
                    max={40}
                    value={ultrasoundWeeks}
                    onChange={(e) => setUltrasoundWeeks(Math.max(4, Math.min(40, Number(e.target.value))))}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Days (0–6)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={6}
                    value={ultrasoundDays}
                    onChange={(e) => setUltrasoundDays(Math.max(0, Math.min(6, Number(e.target.value))))}
                    className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {mode === "ivf" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  IVF Embryo Transfer Date
                </label>
                <input
                  type="date"
                  value={ivfDate}
                  onChange={(e) => setIvfDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Embryo Transfer Stage
                </label>
                <select
                  value={embryoAge}
                  onChange={(e) => setEmbryoAge(e.target.value as EmbryoAge)}
                  className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                >
                  <option value="day3">Day 3 Cleavage-Stage Embryo</option>
                  <option value="day5">Day 5 Blastocyst (Most Common)</option>
                  <option value="day6">Day 6 Blastocyst</option>
                </select>
              </div>
            </div>
          )}

          {mode === "custom" && (
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Custom Gestational Start Date (Day 0)
              </label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          )}

          {mode === "reverse" && (
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Desired Birth / Target Due Date
              </label>
              <input
                type="date"
                value={targetDueDate}
                onChange={(e) => setTargetDueDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
              <span className="text-[11px] text-zinc-500 block mt-1">
                Calculates required conception, IVF transfer, and LMP dates to give birth on your target date.
              </span>
            </div>
          )}

          {/* PREGNANCY MULTIPLE TYPE SELECTOR */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Pregnancy Count &amp; Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "single", label: "Single Baby", sub: "40 Weeks" },
                { id: "twins", label: "Twins", sub: "37 Weeks" },
                { id: "triplets", label: "Triplets", sub: "34 Weeks" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setPregnancyType(t.id as PregnancyType)}
                  className={`p-2 rounded-xl text-xs text-center border transition-all ${
                    pregnancyType === t.id
                      ? "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span className="block font-bold">{t.label}</span>
                  <span className="text-[10px] text-zinc-500 block">{t.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* MATERNAL HEALTH & WEIGHT GAIN PROFILE */}
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
            <h3 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              Maternal Health Profile (Optional)
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Mother's Age
                </label>
                <input
                  type="number"
                  min={14}
                  max={55}
                  value={motherAge}
                  onChange={(e) => setMotherAge(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Height {unitSystem === "imperial" ? "(ft / in)" : "(cm)"}
                </label>
                {unitSystem === "imperial" ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="number"
                      min={4}
                      max={7}
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="p-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      placeholder="ft"
                    />
                    <input
                      type="number"
                      min={0}
                      max={11}
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="p-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100"
                      placeholder="in"
                    />
                  </div>
                ) : (
                  <input
                    type="number"
                    min={120}
                    max={220}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Pre-Pregnancy Weight
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={unitSystem === "imperial" ? preWeightLbs : preWeightKg}
                  onChange={(e) =>
                    unitSystem === "imperial"
                      ? setPreWeightLbs(Number(e.target.value))
                      : setPreWeightKg(Number(e.target.value))
                  }
                  className="w-full p-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Current Weight
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={unitSystem === "imperial" ? currentWeightLbs : currentWeightKg}
                  onChange={(e) =>
                    unitSystem === "imperial"
                      ? setCurrentWeightLbs(Number(e.target.value))
                      : setCurrentWeightKg(Number(e.target.value))
                  }
                  className="w-full p-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS HERO PANEL (COL 7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* PRIMARY DUE DATE & GA HERO CARD */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-600 via-rose-500 to-pink-600 text-white shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-400/50 pb-4">
              <div>
                <span className="text-xs font-bold text-rose-100 uppercase tracking-wider block">Estimated Due Date (EDD)</span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{results.dueDateStr}</h2>
              </div>
              <div className="text-left sm:text-right">
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                  {results.trimesters[results.currentTrimester - 1].name}
                </span>
                <p className="text-[11px] text-rose-100 mt-1">
                  Birth Window: {results.estimatedBirthWindowStart} – {results.estimatedBirthWindowEnd}
                </p>
              </div>
            </div>

            {/* RADIAL PROGRESS & TIMELINE METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              {/* RADIAL RING METRIC */}
              <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 shrink-0 flex items-center justify-center">
                  <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-rose-400/30"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-white"
                      strokeDasharray={`${results.percentComplete}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-base font-black leading-none">{results.percentComplete}%</span>
                    <span className="text-[9px] font-semibold uppercase text-rose-100">Done</span>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-rose-100 block font-medium">Gestational Age</span>
                  <span className="text-lg font-black">{results.gestationalAgeWeeks}w {results.gestationalAgeDays}d</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                <span className="text-[11px] text-rose-100 block font-medium">Days Pregnant</span>
                <span className="text-lg font-extrabold">{results.totalDaysPregnant} Days</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                <span className="text-[11px] text-rose-100 block font-medium">Days Remaining</span>
                <span className="text-lg font-extrabold">{results.daysRemaining} Days</span>
              </div>
            </div>

            {/* ACTION BAR WITH COMPREHENSIVE TOOLS */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-rose-400/40 pt-4 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <Baby className="h-4 w-4 text-rose-200" />
                <span>Conception: {results.conceptionDateStr}</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Button
                  onClick={handleCopySummary}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 text-xs px-2.5 h-8 flex items-center gap-1"
                >
                  {copySuccess ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                  {copySuccess ? "Copied!" : "Copy"}
                </Button>

                <Button
                  onClick={handleShare}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 text-xs px-2.5 h-8 flex items-center gap-1"
                >
                  {shareSuccess ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Share2 className="h-3.5 w-3.5" />}
                  {shareSuccess ? "Link Copied!" : "Share"}
                </Button>

                <Button
                  onClick={handleExportCsv}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 text-xs px-2.5 h-8 flex items-center gap-1"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  CSV
                </Button>

                <Button
                  onClick={handleReset}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 text-xs px-2.5 h-8 flex items-center gap-1"
                  title="Reset to defaults"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>

                <Button
                  onClick={() => setIsReportOpen(true)}
                  variant="secondary"
                  size="sm"
                  className="bg-white text-rose-700 hover:bg-rose-50 font-bold shadow-md text-xs px-3 h-8 flex items-center gap-1.5"
                >
                  <Printer className="h-3.5 w-3.5" />
                  PDF / Print
                </Button>
              </div>
            </div>
          </div>

          {/* REVERSE MODE SPECIAL DETAILS CARD */}
          {mode === "reverse" && results.reverseDetails && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-2">
              <h3 className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">Reverse Due Date Schedule Results
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-amber-950 dark:text-amber-200 font-medium">
                <p>Required LMP Date: <strong>{results.reverseDetails.estimatedLmp}</strong></p>
                <p>Required Conception: <strong>{results.reverseDetails.estimatedConception}</strong></p>
                <p>Ideal IVF Day 5 Transfer: <strong>{results.reverseDetails.estimatedIvfDay5}</strong></p>
                <p>8-Week Ultrasound Scan: <strong>{results.reverseDetails.estimatedUltrasound8W}</strong></p>
              </div>
            </div>
          )}

          {/* CURRENT WEEK FETAL SIZE & DEVELOPMENT SNAPSHOT CARD */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">👶</span>
                <div>
                  <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {activeWeekNumber <= 2
                      ? `Week ${activeWeekNumber} Pre-Conception Status`
                      : `Week ${activeWeekNumber} Fetal Development`}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {activeWeekNumber <= 2 ? (
                      <span>Stage: <span className="font-bold text-rose-600 dark:text-rose-400">{weekDetail.sizeAnalogy}</span> (Fertilization not yet occurred)</span>
                    ) : (
                      <span>Baby is about the size of a <span className="font-bold text-rose-600 dark:text-rose-400">{weekDetail.sizeAnalogy}</span></span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  disabled={activeWeekNumber <= 1}
                  onClick={() => setSelectedWeek(Math.max(1, activeWeekNumber - 1))}
                  className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs font-bold disabled:opacity-40"
                >
                  ← Prev
                </button>
                <span className="text-xs font-extrabold px-2">W{activeWeekNumber}</span>
                <button
                  disabled={activeWeekNumber >= 42}
                  onClick={() => setSelectedWeek(Math.min(42, activeWeekNumber + 1))}
                  className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs font-bold disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Length (cm)</span>
                <span className="font-extrabold text-zinc-900 dark:text-zinc-100">
                  {activeWeekNumber <= 2 ? "N/A" : `${weekDetail.lengthCm} cm`}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Length (inches)</span>
                <span className="font-extrabold text-zinc-900 dark:text-zinc-100">
                  {activeWeekNumber <= 2 ? "N/A" : `${weekDetail.lengthInches} in`}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Weight (grams)</span>
                <span className="font-extrabold text-zinc-900 dark:text-zinc-100">
                  {activeWeekNumber <= 2 ? "N/A" : `${weekDetail.weightGrams} g`}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Weight (oz/lbs)</span>
                <span className="font-extrabold text-zinc-900 dark:text-zinc-100">
                  {activeWeekNumber <= 2 ? "N/A" : weekDetail.weightOunces}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-1">
              <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40">
                <span className="font-bold text-rose-800 dark:text-rose-300 block mb-0.5">Fetal Growth Milestone:</span>
                <p className="text-zinc-700 dark:text-zinc-300 leading-normal">{weekDetail.babyDevelopment}</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">Mother's Body Changes &amp; Symptoms:</span>
                <p className="text-zinc-700 dark:text-zinc-300 leading-normal">{weekDetail.motherChanges}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ADVANCED VISUALIZATIONS SECTION */}
      <PregnancyCharts results={results} />

      {/* 4. INTERACTIVE PREGNANCY CALENDAR & MILESTONE SCHEDULE */}
      <PregnancyCalendar results={results} />

      {/* 5. CLINICAL REPORT GENERATOR MODAL */}
      <PregnancyReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        results={results}
      />
    </div>
  );
};
