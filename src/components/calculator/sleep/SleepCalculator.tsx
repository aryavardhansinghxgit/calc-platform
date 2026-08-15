"use client";

import React, { useState, useMemo } from "react";
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
} from "@/app/calculators/sleep-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function SleepCalculator() {
  // Tabs
  const [activeTab, setActiveTab] = useState<"planner" | "naps" | "debt" | "chronotype">("planner");

  // Tab 1: Sleep Planner State
  const [mode, setMode] = useState<SleepPlannerMode>("wakeup");
  const [targetTime, setTargetTime] = useState<string>("07:00 AM");
  const [latency, setLatency] = useState<number>(15);
  const [ageBracket, setAgeBracket] = useState<AgeGroupBracket>("adult");

  // Tab 3: Sleep Debt State
  const [dailyTargetHours, setDailyTargetHours] = useState<number>(8);
  const [actualWeeklyHours, setActualWeeklyHours] = useState<number>(44);

  // Tab 4: Chronotype Quiz State
  const [q1, setQ1] = useState<number>(2); // Morning alertness (1-4)
  const [q2, setQ2] = useState<number>(2); // Evening energy (1-4)
  const [q3, setQ3] = useState<number>(2); // Light sensitivity (1-4)

  // Copy & Share State
  const [copied, setCopied] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Calculate Cycles
  const cycleResults = useMemo(() => {
    return calculateSleepCycles(targetTime, mode, latency, ageBracket);
  }, [targetTime, mode, latency, ageBracket]);

  // Calculate Power Naps
  const napResults = useMemo(() => {
    return calculatePowerNaps(new Date());
  }, []);

  // Calculate Sleep Debt
  const debtResult = useMemo(() => {
    return calculateSleepDebt(dailyTargetHours, actualWeeklyHours);
  }, [dailyTargetHours, actualWeeklyHours]);

  // Evaluate Chronotype
  const chronotypeResult = useMemo(() => {
    return evaluateChronotype({ morningAlertness: q1, eveningEnergy: q2, lightSensitivity: q3 });
  }, [q1, q2, q3]);

  // Google Calendar Link Generator
  const handleAddToGoogleCalendar = (cycleTimeStr: string) => {
    const title = encodeURIComponent("Bedtime Reminder (Optimal 90-Min Sleep Cycle)");
    const details = encodeURIComponent(
      `Calculated via CalcPlatform Sleep Calculator. Fall asleep buffer: ${latency} mins.`
    );
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
    window.open(url, "_blank");
  };

  // Copy Sleep Schedule
  const handleCopySchedule = () => {
    let text = `🌙 CalcPlatform Sleep Routine:\n`;
    text += `Target ${mode === "wakeup" ? "Wake-Up Time" : "Bedtime"}: ${targetTime}\n`;
    text += `Fall Asleep Buffer: ${latency} minutes\n\n`;
    text += `Optimal Cycle Times:\n`;
    cycleResults.forEach((c) => {
      text += `• ${c.timeFormatted} (${c.cycles} Cycles / ${c.totalSleepHours}h)\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        { label: "Recommended Sleep Need", value: "7.5 – 9.0 Hours" },
        { label: "Sleep Latency Buffer", value: `${latency} Minutes` },
        { label: "Chronotype Profile", value: chronotypeResult.name },
      ],
      sections: [
        {
          title: "Calculated 90-Minute Ultradian Cycles",
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
  }, [cycleResults, debtResult, chronotypeResult, latency, targetTime]);

  return (
    <div className="space-y-6">
      {/* 1. TOP TAB NAVIGATION BAR */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200/70 dark:border-zinc-700">
          <button
            onClick={() => setActiveTab("planner")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "planner"
                ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-zinc-500"
            }`}
          >
            <Moon className="h-3.5 w-3.5" /> Sleep Planner
          </button>

          <button
            onClick={() => setActiveTab("naps")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "naps"
                ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-zinc-500"
            }`}
          >
            <Coffee className="h-3.5 w-3.5" /> Power Nap Blueprint
          </button>

          <button
            onClick={() => setActiveTab("debt")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "debt"
                ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-zinc-500"
            }`}
          >
            <BatteryCharging className="h-3.5 w-3.5" /> Sleep Debt Tracker
          </button>

          <button
            onClick={() => setActiveTab("chronotype")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "chronotype"
                ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-zinc-500"
            }`}
          >
            <Brain className="h-3.5 w-3.5" /> Chronotype Quiz
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleCopySchedule}
            variant="outline"
            size="sm"
            className="h-8 text-xs font-bold gap-1 cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-indigo-600" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy Schedule"}
          </Button>

          <Button
            onClick={() => setShowReportModal(true)}
            variant="outline"
            size="sm"
            className="h-8 text-xs font-bold gap-1 cursor-pointer bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200"
          >
            <Printer className="h-3.5 w-3.5" /> PDF Report
          </Button>
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
                <option value="teen">Teen (14–17 Years: 8–10 Hours)</option>
                <option value="school">School Age (6–13 Years: 9–11 Hours)</option>
                <option value="preschool">Preschool (3–5 Years: 10–13 Hours)</option>
                <option value="toddler">Toddler (1–2 Years: 11–14 Hours)</option>
                <option value="older_adult">Older Adult (65+ Years: 7–8 Hours)</option>
              </select>
            </div>
          </div>

          {/* RIGHT VISUAL CYCLE ARCHITECTURE CARDS (Col 6) */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-indigo-600" /> Recommended {mode === "wakeup" ? "Bedtimes" : "Wake-Up Times"}
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
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-2">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Coffee className="h-4 w-4 text-amber-600" /> Power Nap & Recovery Blueprint
            </h3>
            <p className="text-xs text-zinc-500">
              Napping for 20 minutes boosts alertness without inducing deep sleep inertia. 90 minutes completes a full cycle.
            </p>
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
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <BatteryCharging className="h-4 w-4 text-indigo-600" /> Sleep Debt Calibrator
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
                Sleep Debt Analysis & Recovery Plan
              </h4>
              <div className="text-5xl font-black font-sans tabular-nums tracking-tight text-white">
                {debtResult.totalDebtHours} <span className="text-base font-sans font-normal">Hours Debt</span>
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
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Brain className="h-4 w-4 text-indigo-600" /> Circadian Chronotype Quiz
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
