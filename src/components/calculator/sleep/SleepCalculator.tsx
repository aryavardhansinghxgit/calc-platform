"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Moon,
  Sun,
  Clock,
  BatteryCharging,
  Coffee,
  Calendar,
  Copy,
  Check,
  Zap,
  ShieldAlert,
  Sparkles,
  UserCheck,
  Brain,
  Sliders,
  Share2,
  Printer,
  BellRing,
  FileSpreadsheet,
  Bookmark,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SleepPlannerMode,
  AgeGroupBracket,
  Chronotype,
  SleepCalculationResult,
} from "@/app/calculators/sleep-calculator/types";
import {
  calculateSleepCycles,
  calculatePowerNaps,
  calculateSleepDebt,
  evaluateChronotype,
  formatTime12h,
  parseTimeString,
  AGE_SLEEP_GUIDELINES,
} from "@/app/calculators/sleep-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

interface SavedSleepState {
  activeTab: "planner" | "naps" | "debt" | "chronotype";
  mode: SleepPlannerMode;
  targetTime: string;
  latency: number;
  ageBracket: AgeGroupBracket;
  napStartTime: string;
  dailyTargetHours: number;
  actualWeeklyHours: number;
  q1: number;
  q2: number;
  q3: number;
}

export function SleepCalculator() {
  // Tabs
  const [activeTab, setActiveTab] = useState<"planner" | "naps" | "debt" | "chronotype">("planner");

  // Tab 1: Sleep Planner State
  const [mode, setMode] = useState<SleepPlannerMode>("wakeup");
  const [targetTime, setTargetTime] = useState<string>("07:00 AM");
  const [latency, setLatency] = useState<number>(15);
  const [ageBracket, setAgeBracket] = useState<AgeGroupBracket>("adult");

  // Tab 2: Power Nap State
  const [napStartTime, setNapStartTime] = useState<string>(() => formatTime12h(new Date()));
  const [napUserEdited, setNapUserEdited] = useState<boolean>(false);

  // Tab 3: Sleep Debt State
  const [dailyTargetHours, setDailyTargetHours] = useState<number>(8);
  const [actualWeeklyHours, setActualWeeklyHours] = useState<number>(44);

  // Tab 4: Chronotype Quiz State
  const [q1, setQ1] = useState<number>(2); // Morning alertness (1-4)
  const [q2, setQ2] = useState<number>(2); // Evening energy (1-4)
  const [q3, setQ3] = useState<number>(2); // Light sensitivity (1-4)

  // Copy & Action State
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [restoreSuccess, setRestoreSuccess] = useState<boolean>(false);
  const [hasSavedState, setHasSavedState] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Check localStorage on mount
  useEffect(() => {
    try {
      if (localStorage.getItem("calc_sleep_saved_state")) {
        setHasSavedState(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Minute ticker for unedited nap time
  useEffect(() => {
    if (napUserEdited) return;
    const interval = setInterval(() => {
      setNapStartTime(formatTime12h(new Date()));
    }, 60000);
    return () => clearInterval(interval);
  }, [napUserEdited]);

  // Calculate Cycles
  const cycleResults = useMemo(() => {
    return calculateSleepCycles(targetTime, mode, latency, ageBracket);
  }, [targetTime, mode, latency, ageBracket]);

  // Calculate Power Naps from controlled napStartTime
  const napResults = useMemo(() => {
    const baseDate = parseTimeString(napStartTime);
    return calculatePowerNaps(baseDate);
  }, [napStartTime]);

  // Calculate Sleep Debt
  const debtResult = useMemo(() => {
    return calculateSleepDebt(dailyTargetHours, actualWeeklyHours);
  }, [dailyTargetHours, actualWeeklyHours]);

  // Evaluate Chronotype
  const chronotypeResult = useMemo(() => {
    return evaluateChronotype({ morningAlertness: q1, eveningEnergy: q2, lightSensitivity: q3 });
  }, [q1, q2, q3]);

  // Action: Set Nap to Now
  const handleSetNapToNow = () => {
    setNapStartTime(formatTime12h(new Date()));
    setNapUserEdited(false);
  };

  // Google Calendar Link Generator
  const handleAddToGoogleCalendar = (cycleTimeStr: string) => {
    const title = encodeURIComponent("Bedtime Reminder (Optimal 90-Min Sleep Cycle)");
    const details = encodeURIComponent(
      `Calculated via CalcPlatform Sleep Calculator. Fall asleep buffer: ${latency} mins.`
    );
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
    window.open(url, "_blank");
  };

  // Save State
  const handleSaveState = () => {
    const state: SavedSleepState = {
      activeTab,
      mode,
      targetTime,
      latency,
      ageBracket,
      napStartTime,
      dailyTargetHours,
      actualWeeklyHours,
      q1,
      q2,
      q3,
    };
    try {
      localStorage.setItem("calc_sleep_saved_state", JSON.stringify(state));
      setHasSavedState(true);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    } catch {
      // ignore
    }
  };

  // Restore State
  const handleRestoreState = () => {
    try {
      const saved = localStorage.getItem("calc_sleep_saved_state");
      if (saved) {
        const state: SavedSleepState = JSON.parse(saved);
        if (state.activeTab) setActiveTab(state.activeTab);
        if (state.mode) setMode(state.mode);
        if (state.targetTime) setTargetTime(state.targetTime);
        if (typeof state.latency === "number") setLatency(state.latency);
        if (state.ageBracket) setAgeBracket(state.ageBracket);
        if (state.napStartTime) {
          setNapStartTime(state.napStartTime);
          setNapUserEdited(true);
        }
        if (typeof state.dailyTargetHours === "number") setDailyTargetHours(state.dailyTargetHours);
        if (typeof state.actualWeeklyHours === "number") setActualWeeklyHours(state.actualWeeklyHours);
        if (typeof state.q1 === "number") setQ1(state.q1);
        if (typeof state.q2 === "number") setQ2(state.q2);
        if (typeof state.q3 === "number") setQ3(state.q3);

        setRestoreSuccess(true);
        setTimeout(() => setRestoreSuccess(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  // Copy Result to Clipboard
  const handleCopyResult = () => {
    let text = "";
    if (activeTab === "planner") {
      text = `🌙 CalcPlatform Sleep Planner Result:\n`;
      text += `Target ${mode === "wakeup" ? "Wake Time" : "Bedtime"}: ${targetTime}\n`;
      text += `Latency Buffer: ${latency} mins | Age Bracket: ${ageBracket}\n`;
      text += `Suggested Schedule (90-min planning heuristic):\n`;
      cycleResults.forEach((c) => {
        text += `  • ${c.timeFormatted}: ${c.cycles} Cycles (${c.totalSleepHours}h) — ${c.note}\n`;
      });
    } else if (activeTab === "naps") {
      text = `☕ CalcPlatform Power Nap Blueprint:\n`;
      text += `Nap Start Time: ${napStartTime}\n`;
      napResults.forEach((n) => {
        text += `  • ${n.title}: Wake up at ${n.wakeTimeFormatted} (${n.durationMinutes} mins)\n`;
      });
    } else if (activeTab === "debt") {
      text = `🔋 CalcPlatform Sleep Debt Tracker:\n`;
      text += `Daily Target: ${dailyTargetHours}h (${debtResult.weeklyTargetHours}h weekly target)\n`;
      text += `Actual Weekly Hours: ${actualWeeklyHours}h\n`;
      const diff = debtResult.weeklyTargetHours - actualWeeklyHours;
      if (diff > 0) {
        text += `Weekly Deficit: ${diff.toFixed(1)} Hours\n`;
      } else if (diff < 0) {
        text += `Weekly Surplus: ${Math.abs(diff).toFixed(1)} Hours above target\n`;
      } else {
        text += `Weekly Status: 0h deficit (target met exactly)\n`;
      }
      text += `Recovery Note: ${debtResult.recoveryPlanNotes}\n`;
    } else {
      text = `🧠 CalcPlatform Chronotype Profile:\n`;
      text += `Profile: ${chronotypeResult.name}\n`;
      text += `Ideal Bedtime Window: ${chronotypeResult.idealBedtimeWindow}\n`;
      text += `Peak Focus Window: ${chronotypeResult.peakProductivityHours}\n`;
      text += `Caffeine Cutoff: ${chronotypeResult.caffeineCutoff}\n`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download CSV
  const handleDownloadCSV = () => {
    let csv = "";
    if (activeTab === "planner") {
      csv = `Mode,Target Time,Latency (mins),Age Bracket,Cycles,Duration (hours),Calculated Time,Status,Note\n`;
      cycleResults.forEach((c) => {
        csv += `"${mode}","${targetTime}",${latency},"${ageBracket}",${c.cycles},${c.totalSleepHours},"${c.timeFormatted}","${c.status}","${c.note}"\n`;
      });
    } else if (activeTab === "naps") {
      csv = `Nap Type,Nap Start Time,Duration (mins),Wake Time,Best For\n`;
      napResults.forEach((n) => {
        csv += `"${n.type}","${napStartTime}",${n.durationMinutes},"${n.wakeTimeFormatted}","${n.bestFor}"\n`;
      });
    } else if (activeTab === "debt") {
      csv = `Target Daily Hours,Weekly Target Hours,Actual Weekly Hours,Calculated Deficit Hours,Recovery Plan Days,Daily Extra Minutes,Notes\n`;
      csv += `${dailyTargetHours},${debtResult.weeklyTargetHours},${actualWeeklyHours},${debtResult.totalDebtHours},${debtResult.recoveryDays},${debtResult.dailyExtraMinutes},"${debtResult.recoveryPlanNotes.replace(/"/g, '""')}"\n`;
    } else {
      csv = `Q1 Morning Alertness,Q2 Focus Window,Q3 Sensitivity,Chronotype,Profile Name,Bedtime Window,Focus Window,Caffeine Cutoff\n`;
      csv += `${q1},${q2},${q3},"${chronotypeResult.chronotype}","${chronotypeResult.name}","${chronotypeResult.idealBedtimeWindow}","${chronotypeResult.peakProductivityHours}","${chronotypeResult.caffeineCutoff}"\n`;
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `sleep-${activeTab}-data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Report Modal Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: "Personalized Sleep Architecture Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Sleep Calculator",
      },
      keyMetrics: [
        { label: "Optimal Bedtime (5 Cycles)", value: cycleResults[1]?.timeFormatted || targetTime, highlight: true },
        { label: "Recommended Sleep Need", value: `${AGE_SLEEP_GUIDELINES[ageBracket]?.minHours || 7} – ${AGE_SLEEP_GUIDELINES[ageBracket]?.maxHours || 9} Hours` },
        { label: "Sleep Latency Buffer", value: `${latency} Minutes` },
        { label: "Chronotype Profile", value: chronotypeResult.name },
      ],
      sections: [
        {
          title: "Calculated 90-Minute Planning Heuristics",
          items: cycleResults.map((c) => ({
            label: `${c.cycles} Cycles (${c.totalSleepHours} Hours)`,
            value: `${c.timeFormatted} (${c.note})`,
          })),
        },
        {
          title: "Sleep Debt & Recovery Analysis",
          items: [
            { label: "Weekly Sleep Deficit", value: `${debtResult.totalDebtHours} Hours` },
            { label: "Recovery Protocol", value: debtResult.recoveryPlanNotes },
          ],
        },
      ],
      table: {
        title: "Calculated Sleep Cycle Schedule",
        headers: [
          { key: "cycles", label: "Cycles" },
          { key: "duration", label: "Duration" },
          { key: "time", label: "Recommended Time" },
          { key: "status", label: "Status" },
        ],
        rows: cycleResults.map((c) => ({
          cycles: `${c.cycles} Cycles`,
          duration: `${c.totalSleepHours} Hours`,
          time: c.timeFormatted,
          status: c.status.toUpperCase(),
        })),
      },
    };
  }, [cycleResults, debtResult, chronotypeResult, latency, targetTime, ageBracket]);

  return (
    <div className="space-y-6">
      {/* 1. TOP TAB NAVIGATION & ACTION TOOLBAR BAR */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 sm:p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200/70 dark:border-zinc-700">
          <button
            id="sleep-tab-planner"
            onClick={() => setActiveTab("planner")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "planner"
                ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <Moon className="h-3.5 w-3.5" /> Sleep Planner
          </button>

          <button
            id="sleep-tab-naps"
            onClick={() => setActiveTab("naps")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "naps"
                ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <Coffee className="h-3.5 w-3.5" /> Power Nap Blueprint
          </button>

          <button
            id="sleep-tab-debt"
            onClick={() => setActiveTab("debt")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "debt"
                ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <BatteryCharging className="h-3.5 w-3.5" /> Sleep Debt Tracker
          </button>

          <button
            id="sleep-tab-chronotype"
            onClick={() => setActiveTab("chronotype")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "chronotype"
                ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <Brain className="h-3.5 w-3.5" /> Chronotype Quiz
          </button>
        </div>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            id="sleep-btn-copy"
            onClick={handleCopyResult}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold flex items-center gap-1.5 cursor-pointer"
            title="Copy current results to clipboard"
            aria-label="Copy Result"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>

          <button
            id="sleep-btn-save"
            onClick={handleSaveState}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold flex items-center gap-1 cursor-pointer"
            title="Save current calculation state"
            aria-label="Save State"
          >
            {savedSuccess ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Bookmark className="h-3.5 w-3.5" />}
            <span>{savedSuccess ? "Saved" : "Save"}</span>
          </button>

          {hasSavedState && (
            <button
              id="sleep-btn-restore"
              onClick={handleRestoreState}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold flex items-center gap-1 cursor-pointer"
              title="Restore saved calculation"
              aria-label="Restore State"
            >
              {restoreSuccess ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <RotateCcw className="h-3.5 w-3.5" />}
              <span>{restoreSuccess ? "Restored" : "Restore"}</span>
            </button>
          )}

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700 mx-0.5" />

          <button
            id="sleep-btn-csv"
            onClick={handleDownloadCSV}
            className="px-2 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold flex items-center gap-1 cursor-pointer"
            title="Download CSV report"
            aria-label="Export CSV"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
            <span className="hidden sm:inline">CSV</span>
          </button>

          <button
            id="sleep-btn-pdf"
            onClick={() => setShowReportModal(true)}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1 cursor-pointer shadow-xs"
            title="Generate full PDF sleep architecture report"
            aria-label="PDF Report"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* 2. TAB 1: SLEEP PLANNER */}
      {activeTab === "planner" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT INPUT CONTROLS (Col 6) */}
          <div className="lg:col-span-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-5">
            {/* Planner Mode Selector Chips */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider block">
                Select Planning Mode
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={() => setMode("wakeup")}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                    mode === "wakeup"
                      ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300"
                      : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-600"
                  }`}
                >
                  <span>Wake-Up Time</span>
                  <Sun className="h-4 w-4 text-amber-500" />
                </button>

                <button
                  onClick={() => setMode("bedtime")}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                    mode === "bedtime"
                      ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300"
                      : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-600"
                  }`}
                >
                  <span>Bedtime Mode</span>
                  <Moon className="h-4 w-4 text-indigo-500" />
                </button>

                <button
                  onClick={() => setMode("now")}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                    mode === "now"
                      ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300"
                      : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-600"
                  }`}
                >
                  <span>Sleep Now</span>
                  <Zap className="h-4 w-4 text-emerald-500" />
                </button>

                <button
                  onClick={() => setActiveTab("naps")}
                  className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-left flex items-center justify-between cursor-pointer"
                >
                  <span>Power Nap Mode</span>
                  <Coffee className="h-4 w-4 text-amber-600" />
                </button>
              </div>
            </div>

            {/* Target Time Input */}
            {mode !== "now" && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {mode === "wakeup" ? "I want to wake up at:" : "I plan to go to bed at:"}
                </label>
                <Input
                  type="text"
                  value={targetTime}
                  onChange={(e) => setTargetTime(e.target.value)}
                  placeholder="e.g. 07:00 AM"
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>
            )}

            {/* Customizable Sleep Latency Buffer Slider */}
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-indigo-600" /> Sleep Latency Buffer (Time to fall asleep)
                </label>
                <span className="font-sans tabular-nums font-bold text-indigo-600 dark:text-indigo-400">
                  {latency} Mins
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                step={5}
                value={latency}
                onChange={(e) => setLatency(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <p className="text-[11px] text-zinc-500">
                Healthy average latency is 10–20 minutes. Adjust slider to match your habits.
              </p>
            </div>

            {/* Age Group Selector */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Age Bracket (NSF Sleep Need Calibrator)
              </label>
              <select
                value={ageBracket}
                onChange={(e) => setAgeBracket(e.target.value as AgeGroupBracket)}
                className="w-full h-10 text-xs font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl cursor-pointer"
              >
                <option value="adult">Adult (18–64 Years: 7–9 Hours)</option>
                <option value="older_adult">Older Adult (65+ Years: 7–8 Hours)</option>
                <option value="teen">Teen (13–17 Years: 8–10 Hours)</option>
                <option value="school">School Age (6–12 Years: 9–12 Hours)</option>
                <option value="preschool">Preschool (3–5 Years: 10–13 Hours)</option>
                <option value="toddler">Toddler (1–2 Years: 11–14 Hours)</option>
                <option value="infant">Infant (4–11 Months: 12–15 Hours)</option>
                <option value="newborn">Newborn (0–3 Months: 14–17 Hours)</option>
              </select>
            </div>
          </div>

          {/* RIGHT VISUAL CYCLE ARCHITECTURE CARDS (Col 6) */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">Recommended {mode === "wakeup" ? "Bedtimes" : "Wake-Up Times"}
            </h3>

            <div className="space-y-3">
              {cycleResults.map((cycle) => (
                <div
                  key={cycle.cycles}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${cycle.colorTag}`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">
                      {cycle.cycles} Ultradian Cycles ({cycle.totalSleepHours} Hours)
                    </span>
                    <div className="text-3xl font-black font-sans tabular-nums tracking-tight">
                      {cycle.timeFormatted}
                    </div>
                    <p className="text-xs font-medium">{cycle.note}</p>
                  </div>

                  <Button
                    onClick={() => handleAddToGoogleCalendar(cycle.timeFormatted)}
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs font-bold gap-1 cursor-pointer bg-white/20 hover:bg-white/30 border-0"
                  >
                    <BellRing className="h-3.5 w-3.5" /> Alarm
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: POWER NAP BLUEPRINT */}
      {activeTab === "naps" && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">Power Nap & Recovery Blueprint
                </h3>
                <p className="text-xs text-zinc-500">
                  Calculated nap wake-up times from your planned nap start time. 90-minute option approximates a full cycle.
                </p>
              </div>

              {/* Nap Start Time Controller */}
              <div className="flex items-center gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block">
                    Nap Start Time:
                  </label>
                  <Input
                    type="text"
                    value={napStartTime}
                    onChange={(e) => {
                      setNapStartTime(e.target.value);
                      setNapUserEdited(true);
                    }}
                    placeholder="e.g. 05:44 PM"
                    className="h-9 w-32 text-xs font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                  />
                </div>
                <Button
                  onClick={handleSetNapToNow}
                  variant="outline"
                  size="sm"
                  className="h-9 mt-4 text-xs font-bold gap-1 cursor-pointer"
                  title="Reset to current clock time"
                >
                  <Clock className="h-3.5 w-3.5" /> Now
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {napResults.map((nap) => (
              <div
                key={nap.type}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl space-y-4 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 inline-block">
                    {nap.durationMinutes} Mins
                  </span>
                  <h4 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm">{nap.title}</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">{nap.bestFor}</p>
                  <p className="text-[11px] text-zinc-500 italic bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800">
                    {nap.instructions}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Wake Up At:</span>
                  <span className="text-lg font-black font-sans tabular-nums text-indigo-600 dark:text-indigo-400">
                    {nap.wakeTimeFormatted}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB 3: SLEEP DEBT TRACKER */}
      {activeTab === "debt" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">Sleep Debt Calibrator
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Target Daily Sleep Hours
                </label>
                <Input
                  type="number"
                  value={dailyTargetHours}
                  onChange={(e) => setDailyTargetHours(Number(e.target.value))}
                  step={0.5}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Actual Weekly Hours Slept (Past 7 Days)
                </label>
                <Input
                  type="number"
                  value={actualWeeklyHours}
                  onChange={(e) => setActualWeeklyHours(Number(e.target.value))}
                  step={1}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white p-6 rounded-2xl shadow-md space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-200 border-b border-white/20 pb-2">
                Sleep Deficit & Schedule Analysis
              </h4>
              <div className="text-4xl sm:text-5xl font-black font-sans tabular-nums tracking-tight text-white">
                {debtResult.totalDebtHours > 0 ? (
                  <>
                    {debtResult.totalDebtHours} <span className="text-base font-sans font-normal">Hours Deficit</span>
                  </>
                ) : actualWeeklyHours > debtResult.weeklyTargetHours ? (
                  <>
                    {(actualWeeklyHours - debtResult.weeklyTargetHours).toFixed(1)}{" "}
                    <span className="text-base font-sans font-normal">Hours Above Target (Surplus)</span>
                  </>
                ) : (
                  <>
                    0.0 <span className="text-base font-sans font-normal">Hours Deficit (Target Met)</span>
                  </>
                )}
              </div>
              <p className="text-xs text-indigo-100 leading-relaxed bg-white/10 p-3 rounded-xl border border-white/20">
                {debtResult.recoveryPlanNotes}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 4: CHRONOTYPE QUIZ */}
      {activeTab === "chronotype" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4 text-xs">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">Circadian Chronotype Quiz
            </h3>

            {/* Q1 */}
            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 dark:text-zinc-300">1. How alert do you feel immediately after waking?</label>
              <select
                value={q1}
                onChange={(e) => setQ1(Number(e.target.value))}
                className="w-full h-9 font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 rounded-xl"
              >
                <option value={1}>1 - Instant energy, fully awake</option>
                <option value={2}>2 - Awake after 15–30 minutes</option>
                <option value={3}>3 - Groggy, need coffee to function</option>
                <option value={4}>4 - Exhausted, struggle to wake before 10 AM</option>
              </select>
            </div>

            {/* Q2 */}
            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 dark:text-zinc-300">2. When is your peak energy and focus window?</label>
              <select
                value={q2}
                onChange={(e) => setQ2(Number(e.target.value))}
                className="w-full h-9 font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 rounded-xl"
              >
                <option value={1}>1 - Early morning (8:00 AM – 12:00 PM)</option>
                <option value={2}>2 - Midday (10:00 AM – 2:00 PM)</option>
                <option value={3}>3 - Late afternoon / evening (5:00 PM – 9:00 PM)</option>
                <option value={4}>4 - Irregular / burst energy</option>
              </select>
            </div>

            {/* Q3 */}
            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 dark:text-zinc-300">3. How sensitive are you to light and noise while sleeping?</label>
              <select
                value={q3}
                onChange={(e) => setQ3(Number(e.target.value))}
                className="w-full h-9 font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 rounded-xl"
              >
                <option value={1}>1 - Heavy sleeper, nothing wakes me</option>
                <option value={2}>2 - Normal sleeper</option>
                <option value={3}>3 - Slightly sensitive</option>
                <option value={4}>4 - Extremely light sleeper, easily disturbed</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white p-6 rounded-2xl shadow-md space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Your Primary Chronotype</span>
              <div className="text-3xl font-black">{chronotypeResult.name}</div>
              <p className="text-xs text-indigo-100">{chronotypeResult.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-sans tabular-nums pt-2 border-t border-white/20">
              <div className="p-2 bg-white/10 rounded-lg">
                <span className="text-[10px] text-indigo-200 font-sans block">Ideal Bedtime</span>
                <span className="font-bold">{chronotypeResult.idealBedtimeWindow}</span>
              </div>
              <div className="p-2 bg-white/10 rounded-lg">
                <span className="text-[10px] text-indigo-200 font-sans block">Caffeine Cutoff</span>
                <span className="font-bold">{chronotypeResult.caffeineCutoff}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={reportData}
      />
    </div>
  );
}
