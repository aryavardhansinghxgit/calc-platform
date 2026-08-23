"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  RotateCcw,
  Share2,
  Bookmark,
  CheckCircle2,
  Copy,
  Trash2,
  ChevronDown,
  Clock,
  Briefcase,
  Code,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  calculateTimeMath,
  calculateDateTimeShift,
  parseTimeExpression,
  calculateTimeDuration,
  TimeUnits,
  TimeMathResult,
  DateTimeShiftResult,
  ExpressionParseResult,
  TimeDurationResult,
} from "@/lib/calculator-engine/formulas/time-calculator";

interface SavedTimeRecord {
  id: string;
  tab: string;
  summary: string;
  primaryResult: string;
  totalSeconds: number;
  timestamp: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function TimeCalculator() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [activeTab, setActiveTab] = useState<"math" | "shift" | "expression" | "work">("math");

  // Format & Precision Settings
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [decimalPrecision, setDecimalPrecision] = useState<number>(4);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // --- TAB 1: TIME MATH (ADD / SUBTRACT) ---
  const [t1Days, setT1Days] = useState<string>("0");
  const [t1Hours, setT1Hours] = useState<string>("4");
  const [t1Minutes, setT1Minutes] = useState<string>("45");
  const [t1Seconds, setT1Seconds] = useState<string>("50");

  const [mathOperation, setMathOperation] = useState<"+" | "-">("+");

  const [t2Days, setT2Days] = useState<string>("0");
  const [t2Hours, setT2Hours] = useState<string>("3");
  const [t2Minutes, setT2Minutes] = useState<string>("25");
  const [t2Seconds, setT2Seconds] = useState<string>("30");

  // --- TAB 2: DATE-TIME SHIFT ---
  const today = new Date();
  const [shiftMonth, setShiftMonth] = useState<number>(today.getMonth());
  const [shiftDay, setShiftDay] = useState<number>(today.getDate());
  const [shiftYear, setShiftYear] = useState<number>(today.getFullYear());
  const [shiftHour, setShiftHour] = useState<number>(10);
  const [shiftMinute, setShiftMinute] = useState<number>(30);
  const [shiftSecond, setShiftSecond] = useState<number>(0);
  const [shiftMeridiem, setShiftMeridiem] = useState<"AM" | "PM">("AM");

  const [shiftOp, setShiftOp] = useState<"add" | "subtract">("add");
  const [deltaDays, setDeltaDays] = useState<string>("1");
  const [deltaHours, setDeltaHours] = useState<string>("5");
  const [deltaMinutes, setDeltaMinutes] = useState<string>("30");
  const [deltaSeconds, setDeltaSeconds] = useState<string>("0");

  // --- TAB 3: EXPRESSION PARSER ---
  const [expressionText, setExpressionText] = useState<string>("1d 2h 3m 4s + 4h 5s - 2030s + 28h");

  // --- TAB 4: TIME DURATION & WORK TRACKER ---
  const [workStartHour, setWorkStartHour] = useState<number>(9);
  const [workStartMin, setWorkStartMin] = useState<number>(0);
  const [workStartMeridiem, setWorkStartMeridiem] = useState<"AM" | "PM">("AM");

  const [workEndHour, setWorkEndHour] = useState<number>(5);
  const [workEndMin, setWorkEndMin] = useState<number>(30);
  const [workEndMeridiem, setWorkEndMeridiem] = useState<"AM" | "PM">("PM");

  const [breakMinutes, setBreakMinutes] = useState<number>(30);
  const [hourlyRate, setHourlyRate] = useState<string>("25.00");

  // Feedback & History
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [savedRecords, setSavedRecords] = useState<SavedTimeRecord[]>([]);

  // Sync with URL query parameters on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      const exprParam = params.get("expr");

      if (tabParam === "shift" || tabParam === "expression" || tabParam === "work" || tabParam === "math") {
        setActiveTab(tabParam);
      }
      if (exprParam) {
        setExpressionText(exprParam);
      }

      // Load saved records from localStorage
      try {
        const stored = localStorage.getItem("calc_saved_time_records");
        if (stored) {
          setSavedRecords(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load records from localStorage", e);
      }
    }
  }, []);

  // Quick "Set to Now" Preset
  const handleSetToNow = () => {
    const now = new Date();
    setShiftYear(now.getFullYear());
    setShiftMonth(now.getMonth());
    setShiftDay(now.getDate());

    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    if (is24Hour) {
      setShiftHour(h);
    } else {
      setShiftHour(h % 12 === 0 ? 12 : h % 12);
      setShiftMeridiem(h >= 12 ? "PM" : "AM");
    }
    setShiftMinute(m);
    setShiftSecond(s);
  };

  const handleReset = () => {
    setT1Days("0");
    setT1Hours("4");
    setT1Minutes("45");
    setT1Seconds("50");
    setMathOperation("+");
    setT2Days("0");
    setT2Hours("3");
    setT2Minutes("25");
    setT2Seconds("30");

    handleSetToNow();
    setShiftOp("add");
    setDeltaDays("1");
    setDeltaHours("5");
    setDeltaMinutes("30");
    setDeltaSeconds("0");

    setExpressionText("1d 2h 3m 4s + 4h 5s - 2030s + 28h");
    setWorkStartHour(9);
    setWorkStartMin(0);
    setWorkStartMeridiem("AM");
    setWorkEndHour(5);
    setWorkEndMin(30);
    setWorkEndMeridiem("PM");
    setBreakMinutes(30);
    setHourlyRate("25.00");
  };

  // --- COMPUTATIONS ---
  const mathResult: TimeMathResult = useMemo(() => {
    const t1: TimeUnits = {
      days: parseInt(t1Days, 10) || 0,
      hours: parseInt(t1Hours, 10) || 0,
      minutes: parseInt(t1Minutes, 10) || 0,
      seconds: parseInt(t1Seconds, 10) || 0,
    };
    const t2: TimeUnits = {
      days: parseInt(t2Days, 10) || 0,
      hours: parseInt(t2Hours, 10) || 0,
      minutes: parseInt(t2Minutes, 10) || 0,
      seconds: parseInt(t2Seconds, 10) || 0,
    };
    return calculateTimeMath(t1, mathOperation, t2);
  }, [t1Days, t1Hours, t1Minutes, t1Seconds, mathOperation, t2Days, t2Hours, t2Minutes, t2Seconds]);

  const shiftResult: DateTimeShiftResult = useMemo(() => {
    return calculateDateTimeShift({
      year: shiftYear,
      month: shiftMonth,
      day: shiftDay,
      hour: shiftHour,
      minute: shiftMinute,
      second: shiftSecond,
      meridiem: shiftMeridiem,
      is24Hour,
      operation: shiftOp,
      shiftDays: parseInt(deltaDays, 10) || 0,
      shiftHours: parseInt(deltaHours, 10) || 0,
      shiftMinutes: parseInt(deltaMinutes, 10) || 0,
      shiftSeconds: parseInt(deltaSeconds, 10) || 0,
    });
  }, [shiftYear, shiftMonth, shiftDay, shiftHour, shiftMinute, shiftSecond, shiftMeridiem, is24Hour, shiftOp, deltaDays, deltaHours, deltaMinutes, deltaSeconds]);

  const expressionResult: ExpressionParseResult = useMemo(() => {
    return parseTimeExpression(expressionText);
  }, [expressionText]);

  const workResult: TimeDurationResult = useMemo(() => {
    return calculateTimeDuration({
      startHour: workStartHour,
      startMinute: workStartMin,
      startMeridiem: workStartMeridiem,
      endHour: workEndHour,
      endMinute: workEndMin,
      endMeridiem: workEndMeridiem,
      is24Hour,
      breakMinutes,
      hourlyRate: parseFloat(hourlyRate) || 0,
    });
  }, [workStartHour, workStartMin, workStartMeridiem, workEndHour, workEndMin, workEndMeridiem, is24Hour, breakMinutes, hourlyRate]);

  // Save calculation to LocalStorage
  const handleSaveCalculation = () => {
    let summary = "";
    let primaryResult = "";
    let totalSeconds = 0;

    if (activeTab === "math") {
      summary = `(${t1Days}d ${t1Hours}h ${t1Minutes}m ${t1Seconds}s) ${mathOperation} (${t2Days}d ${t2Hours}h ${t2Minutes}m ${t2Seconds}s)`;
      primaryResult = mathResult.formattedString;
      totalSeconds = mathResult.totalSeconds;
    } else if (activeTab === "shift") {
      const opSign = shiftOp === "add" ? "+" : "-";
      summary = `${MONTH_NAMES[shiftMonth].substring(0, 3)} ${shiftDay}, ${shiftYear} ${opSign} (${deltaDays}d ${deltaHours}h ${deltaMinutes}m)`;
      primaryResult = is24Hour ? shiftResult.fullFormatted24 : shiftResult.fullFormatted12;
      totalSeconds = shiftResult.totalSecondsShifted;
    } else if (activeTab === "expression") {
      summary = expressionText;
      primaryResult = expressionResult.result.formattedString;
      totalSeconds = expressionResult.result.totalSeconds;
    } else {
      summary = `${workStartHour}:${String(workStartMin).padStart(2, "0")} ${!is24Hour ? workStartMeridiem : ""} to ${workEndHour}:${String(workEndMin).padStart(2, "0")} ${!is24Hour ? workEndMeridiem : ""}`;
      primaryResult = `${workResult.netWorkHours} hrs (${workResult.duration.formattedString})`;
      totalSeconds = workResult.duration.totalSeconds;
    }

    const newRecord: SavedTimeRecord = {
      id: Date.now().toString(),
      tab: activeTab === "math" ? "Time Math" : activeTab === "shift" ? "Date Shift" : activeTab === "expression" ? "Expression" : "Work Tracker",
      summary,
      primaryResult,
      totalSeconds,
      timestamp: new Date().toLocaleString(),
    };

    const updated = [newRecord, ...savedRecords].slice(0, 15);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_time_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  const handleDeleteRecord = (id: string) => {
    const updated = savedRecords.filter((r) => r.id !== id);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_time_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update localStorage", e);
    }
  };

  const handleClearAllRecords = () => {
    setSavedRecords([]);
    try {
      localStorage.removeItem("calc_saved_time_records");
    } catch (e) {
      console.error("Failed to clear localStorage", e);
    }
  };

  // Formatted Summary Copy
  const handleCopySummary = () => {
    let summary = "";
    if (activeTab === "math") {
      summary = `Time Math Result:
• Time 1: ${t1Days}d ${t1Hours}h ${t1Minutes}m ${t1Seconds}s
• Operator: ${mathOperation}
• Time 2: ${t2Days}d ${t2Hours}h ${t2Minutes}m ${t2Seconds}s
• Total: ${mathResult.formattedString}
• Decimal Hours: ${mathResult.decimalHours.toFixed(decimalPrecision)} hrs
Generated by CalcPlatform Time Calculator`;
    } else if (activeTab === "shift") {
      summary = `Date-Time Shift Result:
• Start: ${MONTH_NAMES[shiftMonth]} ${shiftDay}, ${shiftYear} ${shiftHour}:${shiftMinute}:${shiftSecond} ${!is24Hour ? shiftMeridiem : ""}
• Shift: ${shiftOp === "add" ? "Add" : "Subtract"} (${deltaDays}d ${deltaHours}h ${deltaMinutes}m ${deltaSeconds}s)
• Target: ${is24Hour ? shiftResult.fullFormatted24 : shiftResult.fullFormatted12}
Generated by CalcPlatform Time Calculator`;
    } else if (activeTab === "expression") {
      summary = `Expression Result:
• Expression: ${expressionText}
• Total: ${expressionResult.result.formattedString}
• Decimal Hours: ${expressionResult.result.decimalHours.toFixed(decimalPrecision)} hrs
Generated by CalcPlatform Time Calculator`;
    } else {
      summary = `Work Duration Summary:
• Clock In: ${workStartHour}:${String(workStartMin).padStart(2, "0")} ${!is24Hour ? workStartMeridiem : ""}
• Clock Out: ${workEndHour}:${String(workEndMin).padStart(2, "0")} ${!is24Hour ? workEndMeridiem : ""}
• Lunch Break: ${breakMinutes} minutes
• Net Working Time: ${workResult.netWorkHours} hours (${workResult.duration.formattedString})
${workResult.grossPay ? `• Gross Pay: $${workResult.grossPay.toFixed(2)}` : ""}
Generated by CalcPlatform Time Calculator`;
    }

    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  // Share URL Generator
  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}?tab=${activeTab}${activeTab === "expression" ? `&expr=${encodeURIComponent(expressionText)}` : ""}`;
      navigator.clipboard.writeText(url);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  // Recharts Chart Data
  const chartData = useMemo(() => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (activeTab === "math") {
      hours = mathResult.normalized.hours;
      minutes = mathResult.normalized.minutes;
      seconds = mathResult.normalized.seconds;
    } else if (activeTab === "expression") {
      hours = expressionResult.result.normalized.hours;
      minutes = expressionResult.result.normalized.minutes;
      seconds = expressionResult.result.normalized.seconds;
    } else if (activeTab === "work") {
      hours = workResult.duration.normalized.hours;
      minutes = workResult.duration.normalized.minutes;
      seconds = workResult.duration.normalized.seconds;
    } else {
      hours = parseInt(deltaHours, 10) || 0;
      minutes = parseInt(deltaMinutes, 10) || 0;
      seconds = parseInt(deltaSeconds, 10) || 0;
    }

    return [
      { name: "Hours (s)", value: Math.max(0, hours * 3600), color: "#2563EB" },
      { name: "Minutes (s)", value: Math.max(0, minutes * 60), color: "#38BDF8" },
      { name: "Seconds (s)", value: Math.max(0, seconds), color: "#94A3B8" },
    ].filter((d) => d.value > 0);
  }, [activeTab, mathResult, expressionResult, workResult, deltaHours, deltaMinutes, deltaSeconds]);

  // Pure White 3D tactile input styling
  const input3DStyle = "w-full h-10 px-3 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold text-slate-900 dark:text-slate-100 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.06),0_1.5px_0_0_#e2e8f0] dark:shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.3),0_1.5px_0_0_#334155] focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_0_0_2px_#2563eb] focus:border-blue-600 outline-none transition-all";

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5">
      {/* ========================================================================= */}
      {/* 1. MAIN THIN BLUE BORDER ISOLATED CARD CONTAINER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-500 rounded-xl shadow-md bg-white dark:bg-slate-900 overflow-hidden">
        
        {/* Context Tabs Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Advanced Time & Duration Calculator
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Sexagesimal math • Expression parser • Date-time shifts • Work-time duration
              </p>
            </div>

            {/* Top Quick Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopySummary}
                className="h-8 text-xs border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs"
              >
                {copySuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" /> Copy Summary
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShareLink}
                className="h-8 text-xs border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs"
              >
                {shareSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-blue-600" /> Link Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 mr-1" /> Share
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Context Mode Tabs */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setActiveTab("math")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "math"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Time Math (Add / Subtract)
            </button>
            <button
              onClick={() => setActiveTab("shift")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "shift"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Add/Subtract from Date
            </button>
            <button
              onClick={() => setActiveTab("expression")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "expression"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Expression Parser
            </button>
            <button
              onClick={() => setActiveTab("work")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "work"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Time Duration & Work Tracker
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. INPUT CARD & PARAMETER SELECTORS */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* TAB 1: TIME MATH (ADD / SUBTRACT TWO TIME VALUES) */}
          {activeTab === "math" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Time Value 1 */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
                  <span className="text-sm font-bold text-slate-900 dark:text-white block">
                    Time Value 1 (Starting Duration)
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Day</label>
                      <input
                        type="number"
                        min="0"
                        value={t1Days}
                        onChange={(e) => setT1Days(e.target.value)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Hour</label>
                      <input
                        type="number"
                        min="0"
                        value={t1Hours}
                        onChange={(e) => setT1Hours(e.target.value)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Minute</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={t1Minutes}
                        onChange={(e) => setT1Minutes(e.target.value)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Second</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={t1Seconds}
                        onChange={(e) => setT1Seconds(e.target.value)}
                        className={input3DStyle}
                      />
                    </div>
                  </div>
                </div>

                {/* Time Value 2 */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Time Value 2
                    </span>
                    {/* Add / Subtract Radio Toggle */}
                    <div className="flex items-center gap-3 text-xs font-bold">
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-800 dark:text-slate-200">
                        <input
                          type="radio"
                          name="mathOp"
                          checked={mathOperation === "+"}
                          onChange={() => setMathOperation("+")}
                          className="w-3.5 h-3.5 text-blue-600"
                        />
                        <span>Add (+)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-800 dark:text-slate-200">
                        <input
                          type="radio"
                          name="mathOp"
                          checked={mathOperation === "-"}
                          onChange={() => setMathOperation("-")}
                          className="w-3.5 h-3.5 text-blue-600"
                        />
                        <span>Subtract (-)</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Day</label>
                      <input
                        type="number"
                        min="0"
                        value={t2Days}
                        onChange={(e) => setT2Days(e.target.value)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Hour</label>
                      <input
                        type="number"
                        min="0"
                        value={t2Hours}
                        onChange={(e) => setT2Hours(e.target.value)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Minute</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={t2Minutes}
                        onChange={(e) => setT2Minutes(e.target.value)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Second</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={t2Seconds}
                        onChange={(e) => setT2Seconds(e.target.value)}
                        className={input3DStyle}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: DATE-TIME SHIFT */}
          {activeTab === "shift" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* Start Date & Time */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Start Date & Timestamp
                    </span>
                    <button
                      onClick={handleSetToNow}
                      className="text-xs px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800"
                    >
                      Now
                    </button>
                  </div>

                  {/* Date Selectors */}
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Month</label>
                      <select
                        value={shiftMonth}
                        onChange={(e) => setShiftMonth(parseInt(e.target.value, 10))}
                        className={input3DStyle}
                      >
                        {MONTH_NAMES.map((m, idx) => (
                          <option key={idx} value={idx}>
                            {m.substring(0, 3)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Day</label>
                      <input
                        type="number"
                        min="1"
                        max="31"
                        value={shiftDay}
                        onChange={(e) => setShiftDay(parseInt(e.target.value, 10) || 1)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Year</label>
                      <input
                        type="number"
                        min="1800"
                        max="2200"
                        value={shiftYear}
                        onChange={(e) => setShiftYear(parseInt(e.target.value, 10) || 2026)}
                        className={input3DStyle}
                      />
                    </div>
                  </div>

                  {/* Time Selectors */}
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Hour</label>
                      <input
                        type="number"
                        min={is24Hour ? 0 : 1}
                        max={is24Hour ? 23 : 12}
                        value={shiftHour}
                        onChange={(e) => setShiftHour(parseInt(e.target.value, 10) || 0)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Minute</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={shiftMinute}
                        onChange={(e) => setShiftMinute(parseInt(e.target.value, 10) || 0)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Second</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={shiftSecond}
                        onChange={(e) => setShiftSecond(parseInt(e.target.value, 10) || 0)}
                        className={input3DStyle}
                      />
                    </div>
                    {!is24Hour && (
                      <div>
                        <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">AM/PM</label>
                        <select
                          value={shiftMeridiem}
                          onChange={(e) => setShiftMeridiem(e.target.value as "AM" | "PM")}
                          className={input3DStyle}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Duration to Shift */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Time to Add or Subtract
                    </span>
                    <div className="flex items-center gap-3 text-xs font-bold">
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-800 dark:text-slate-200">
                        <input
                          type="radio"
                          name="shiftOp"
                          checked={shiftOp === "add"}
                          onChange={() => setShiftOp("add")}
                          className="w-3.5 h-3.5 text-blue-600"
                        />
                        <span>Add (+)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-800 dark:text-slate-200">
                        <input
                          type="radio"
                          name="shiftOp"
                          checked={shiftOp === "subtract"}
                          onChange={() => setShiftOp("subtract")}
                          className="w-3.5 h-3.5 text-blue-600"
                        />
                        <span>Subtract (-)</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Days</label>
                      <input
                        type="number"
                        min="0"
                        value={deltaDays}
                        onChange={(e) => setDeltaDays(e.target.value)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Hours</label>
                      <input
                        type="number"
                        min="0"
                        value={deltaHours}
                        onChange={(e) => setDeltaHours(e.target.value)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Minutes</label>
                      <input
                        type="number"
                        min="0"
                        value={deltaMinutes}
                        onChange={(e) => setDeltaMinutes(e.target.value)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Seconds</label>
                      <input
                        type="number"
                        min="0"
                        value={deltaSeconds}
                        onChange={(e) => setDeltaSeconds(e.target.value)}
                        className={input3DStyle}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: EXPRESSION PARSER */}
          {activeTab === "expression" && (
            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Multi-Term Time Expression
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Accepts <code>d</code> (days), <code>h</code> (hours), <code>m</code> (mins), <code>s</code> (secs), <code>+</code>, <code>-</code>
                </span>
              </div>

              <textarea
                rows={3}
                value={expressionText}
                onChange={(e) => setExpressionText(e.target.value)}
                placeholder="e.g. 1d 2h 3m 4s + 4h 5s - 2030s + 28h"
                className="w-full p-3 text-xs sm:text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.06),0_1.5px_0_0_#e2e8f0] dark:shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.3)] focus:border-blue-600 outline-none"
              />

              {!expressionResult.isValid && (
                <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                  {expressionResult.errorMessage}
                </div>
              )}

              <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold">Quick Presets:</span>
                <button
                  onClick={() => setExpressionText("1d 4h 30m + 2.5h - 45s")}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 font-mono"
                >
                  1d 4h 30m + 2.5h - 45s
                </button>
                <button
                  onClick={() => setExpressionText("8h - 45m - 30m")}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 font-mono"
                >
                  8h - 45m - 30m
                </button>
                <button
                  onClick={() => setExpressionText("10000s + 120m")}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 font-mono"
                >
                  10000s + 120m
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: TIME DURATION & WORK TRACKER */}
          {activeTab === "work" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Shift Hours */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <span className="text-sm font-bold text-slate-900 dark:text-white block">
                  Work Shift Timestamps
                </span>

                {/* Clock In */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Clock In Time:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      min={is24Hour ? 0 : 1}
                      max={is24Hour ? 23 : 12}
                      value={workStartHour}
                      onChange={(e) => setWorkStartHour(parseInt(e.target.value, 10) || 0)}
                      className={input3DStyle}
                      placeholder="Hour"
                    />
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={workStartMin}
                      onChange={(e) => setWorkStartMin(parseInt(e.target.value, 10) || 0)}
                      className={input3DStyle}
                      placeholder="Min"
                    />
                    {!is24Hour && (
                      <select
                        value={workStartMeridiem}
                        onChange={(e) => setWorkStartMeridiem(e.target.value as "AM" | "PM")}
                        className={input3DStyle}
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Clock Out */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Clock Out Time:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      min={is24Hour ? 0 : 1}
                      max={is24Hour ? 23 : 12}
                      value={workEndHour}
                      onChange={(e) => setWorkEndHour(parseInt(e.target.value, 10) || 0)}
                      className={input3DStyle}
                      placeholder="Hour"
                    />
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={workEndMin}
                      onChange={(e) => setWorkEndMin(parseInt(e.target.value, 10) || 0)}
                      className={input3DStyle}
                      placeholder="Min"
                    />
                    {!is24Hour && (
                      <select
                        value={workEndMeridiem}
                        onChange={(e) => setWorkEndMeridiem(e.target.value as "AM" | "PM")}
                        className={input3DStyle}
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>

              {/* Deductions & Wage */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <span className="text-sm font-bold text-slate-900 dark:text-white block">
                  Unpaid Break & Hourly Wage
                </span>

                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Unpaid Break (Minutes):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="300"
                    value={breakMinutes}
                    onChange={(e) => setBreakMinutes(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className={input3DStyle}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Hourly Wage Rate ($ / hr):
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className={input3DStyle}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. SETTINGS CONTROLS (12H / 24H, DECIMAL PRECISION) */}
          {/* ========================================================================= */}
          <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:underline"
              >
                {showSettings ? "Hide Settings" : "Display & Format Settings (12-Hour / 24-Hour, Decimal Precision)"}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSettings ? "rotate-180" : ""}`} />
              </button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-7 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <RotateCcw className="w-3 h-3 mr-1" /> Reset Defaults
              </Button>
            </div>

            {showSettings && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Clock Format:
                  </label>
                  <select
                    value={is24Hour ? "24" : "12"}
                    onChange={(e) => setIs24Hour(e.target.value === "24")}
                    className={input3DStyle}
                  >
                    <option value="12">12-Hour Format (AM / PM)</option>
                    <option value="24">24-Hour Military Format (00:00 – 23:59)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Decimal Precision:
                  </label>
                  <select
                    value={decimalPrecision}
                    onChange={(e) => setDecimalPrecision(parseInt(e.target.value, 10))}
                    className={input3DStyle}
                  >
                    <option value={2}>2 Decimal Places (0.00)</option>
                    <option value={4}>4 Decimal Places (0.0000)</option>
                    <option value={6}>6 Decimal Places (0.000000)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 4. DYNAMIC OUTPUT CARD & PRIMARY RESULTS */}
          {/* ========================================================================= */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50/40 to-blue-50/20 dark:from-slate-800/80 dark:via-slate-800/40 dark:to-slate-800/80 border border-blue-200 dark:border-blue-900/60 shadow-inner space-y-4">
            
            {/* Primary Result Display */}
            <div className="text-center space-y-1.5">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                {activeTab === "shift" ? "Calculated Target Date & Time" : "Calculated Total Duration"}
              </span>

              {activeTab === "shift" ? (
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {is24Hour ? shiftResult.fullFormatted24 : shiftResult.fullFormatted12}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Shifted {deltaDays}d {deltaHours}h {deltaMinutes}m {deltaSeconds}s ({shiftOp === "add" ? "Future" : "Past"})
                  </p>
                </div>
              ) : activeTab === "work" ? (
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {workResult.netWorkHours.toFixed(decimalPrecision)} Hours
                  </div>
                  <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {workResult.duration.formattedString}
                  </div>
                  {workResult.grossPay && (
                    <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      Estimated Gross Earnings: ${workResult.grossPay.toFixed(2)}
                    </div>
                  )}
                </div>
              ) : activeTab === "expression" ? (
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {expressionResult.result.formattedString}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {expressionResult.result.decimalHours.toFixed(decimalPrecision)} Decimal Hours
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {mathResult.formattedString}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {mathResult.decimalHours.toFixed(decimalPrecision)} Decimal Hours
                  </div>
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* 5. ALL-UNITS CONVERSION MATRIX */}
            {/* ========================================================================= */}
            <div className="space-y-2.5 pt-3 border-t border-blue-200/60 dark:border-blue-900/40">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                All-Units Breakdown Matrix
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Days</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {activeTab === "work"
                      ? workResult.duration.totalDays.toFixed(4)
                      : activeTab === "expression"
                      ? expressionResult.result.totalDays.toFixed(4)
                      : mathResult.totalDays.toFixed(4)}{" "}
                    days
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Hours</span>
                  <span className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
                    {activeTab === "work"
                      ? workResult.duration.totalHours.toFixed(decimalPrecision)
                      : activeTab === "expression"
                      ? expressionResult.result.totalHours.toFixed(decimalPrecision)
                      : mathResult.totalHours.toFixed(decimalPrecision)}{" "}
                    hrs
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Minutes</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {activeTab === "work"
                      ? workResult.duration.totalMinutes.toLocaleString()
                      : activeTab === "expression"
                      ? expressionResult.result.totalMinutes.toLocaleString()
                      : mathResult.totalMinutes.toLocaleString()}{" "}
                    min
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Seconds</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {activeTab === "work"
                      ? workResult.duration.totalSeconds.toLocaleString()
                      : activeTab === "expression"
                      ? expressionResult.result.totalSeconds.toLocaleString()
                      : mathResult.totalSeconds.toLocaleString()}{" "}
                    s
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 6. INTERACTIVE VISUALIZER / TIME DONUT */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Timeline Progress Bar */}
            <div className="lg:col-span-8 p-4 sm:p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Sexagesimal Component Distribution
                </h3>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  Base-60 Decomposition
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700 shadow-inner flex">
                <div
                  className="bg-blue-600 h-full rounded-l-full transition-all duration-500"
                  style={{ width: "60%" }}
                  title="Hours Portion"
                />
                <div
                  className="bg-sky-400 h-full transition-all duration-500"
                  style={{ width: "30%" }}
                  title="Minutes Portion"
                />
                <div
                  className="bg-slate-400 h-full rounded-r-full transition-all duration-500"
                  style={{ width: "10%" }}
                  title="Seconds Portion"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <span className="text-blue-600 dark:text-blue-400 font-bold block text-sm sm:text-base">
                    {activeTab === "expression" ? expressionResult.result.normalized.hours : mathResult.normalized.hours}h
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Hours</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <span className="text-sky-600 dark:text-sky-400 font-bold block text-sm sm:text-base">
                    {activeTab === "expression" ? expressionResult.result.normalized.minutes : mathResult.normalized.minutes}m
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Minutes</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-700 dark:text-slate-300 font-bold block text-sm sm:text-base">
                    {activeTab === "expression" ? expressionResult.result.normalized.seconds : mathResult.normalized.seconds}s
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Seconds</span>
                </div>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="lg:col-span-4 p-4 sm:p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Time Proportions
              </h4>
              <div className="relative w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={chartData.length > 0 ? chartData : [{ name: "Zero", value: 1, color: "#E2E8F0" }]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={50}
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {activeTab === "work" ? `${workResult.netWorkHours.toFixed(1)}h` : `${mathResult.normalized.hours}h`}
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-slate-400">duration</span>
                </div>
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                Time Decomposition
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 7. MATCHING BLUE "SAVE CALCULATION" BUTTON & HISTORY */}
          {/* ========================================================================= */}
          <div className="pt-1">
            <Button
              onClick={handleSaveCalculation}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Bookmark className="w-4 h-4" />
              Save Calculation to History
            </Button>
          </div>

          {/* Saved History Table */}
          {savedRecords.length > 0 && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Saved Time Calculations ({savedRecords.length})
                </h3>
                <button
                  onClick={handleClearAllRecords}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear History
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                      <th className="py-2 px-2">Mode</th>
                      <th className="py-2 px-2">Input Summary</th>
                      <th className="py-2 px-2">Output</th>
                      <th className="py-2 px-2">Seconds</th>
                      <th className="py-2 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {savedRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <td className="py-2.5 px-2 font-medium text-slate-900 dark:text-white">{rec.tab}</td>
                        <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 font-mono">{rec.summary}</td>
                        <td className="py-2.5 px-2 font-bold text-blue-600 dark:text-blue-400">{rec.primaryResult}</td>
                        <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300">{rec.totalSeconds.toLocaleString()}s</td>
                        <td className="py-2.5 px-2 text-right space-x-2">
                          <button
                            onClick={() => handleDeleteRecord(rec.id)}
                            className="text-rose-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default TimeCalculator;
