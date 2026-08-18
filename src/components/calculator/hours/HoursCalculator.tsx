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
  ArrowUpDown,
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
  calculateIntradayHours,
  calculateCrossDateHours,
  IntradayHoursParams,
  HoursBreakdownResult,
  CrossDateHoursParams,
  CrossDateHoursResult,
} from "@/lib/calculator-engine/formulas/hours-calculator";
import { HoursContent } from "./HoursContent";

interface SavedHoursRecord {
  id: string;
  tab: string;
  summary: string;
  primaryResult: string;
  decimalHours: number;
  timestamp: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function HoursCalculator() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [activeTab, setActiveTab] = useState<"intraday" | "crossdate" | "overtime">("intraday");

  // Format & Settings
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [breakMinutes, setBreakMinutes] = useState<number>(0);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // --- TAB 1 & TAB 3: INTRADAY / TIMECARD ---
  const [startHour, setStartHour] = useState<number>(8);
  const [startMin, setStartMin] = useState<number>(30);
  const [startMeridiem, setStartMeridiem] = useState<"AM" | "PM">("AM");

  const [endHour, setEndHour] = useState<number>(5);
  const [endMin, setEndMin] = useState<number>(30);
  const [endMeridiem, setEndMeridiem] = useState<"AM" | "PM">("PM");

  // Tab 3 Overtime Parameters
  const [hourlyRate, setHourlyRate] = useState<string>("25.00");
  const [overtimeThreshold, setOvertimeThreshold] = useState<number>(8);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<number>(1.5);

  // --- TAB 2: CROSS-DATE ---
  const today = new Date();
  const [cStartMonth, setCStartMonth] = useState<number>(today.getMonth());
  const [cStartDay, setCStartDay] = useState<number>(today.getDate());
  const [cStartYear, setCStartYear] = useState<number>(today.getFullYear());
  const [cStartHour, setCStartHour] = useState<number>(8);
  const [cStartMin, setCStartMin] = useState<number>(30);
  const [cStartMeridiem, setCStartMeridiem] = useState<"AM" | "PM">("AM");

  const future = new Date();
  future.setDate(future.getDate() + 5);
  const [cEndMonth, setCEndMonth] = useState<number>(future.getMonth());
  const [cEndDay, setCEndDay] = useState<number>(future.getDate());
  const [cEndYear, setCEndYear] = useState<number>(future.getFullYear());
  const [cEndHour, setCEndHour] = useState<number>(5);
  const [cEndMin, setCEndMin] = useState<number>(30);
  const [cEndMeridiem, setCEndMeridiem] = useState<"AM" | "PM">("PM");

  // Feedback & History
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [savedRecords, setSavedRecords] = useState<SavedHoursRecord[]>([]);

  // Sync with URL query parameters on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "crossdate" || tabParam === "overtime" || tabParam === "intraday") {
        setActiveTab(tabParam);
      }

      // Load saved records from localStorage
      try {
        const stored = localStorage.getItem("calc_saved_hours_records");
        if (stored) {
          setSavedRecords(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load records from localStorage", e);
      }
    }
  }, []);

  // Quick "Now" handlers
  const handleSetStartToNow = () => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    if (is24Hour) {
      setStartHour(h);
      setCStartHour(h);
    } else {
      setStartHour(h % 12 === 0 ? 12 : h % 12);
      setStartMeridiem(h >= 12 ? "PM" : "AM");
      setCStartHour(h % 12 === 0 ? 12 : h % 12);
      setCStartMeridiem(h >= 12 ? "PM" : "AM");
    }
    setStartMin(m);
    setCStartMin(m);
    setCStartMonth(now.getMonth());
    setCStartDay(now.getDate());
    setCStartYear(now.getFullYear());
  };

  const handleSetEndToNow = () => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    if (is24Hour) {
      setEndHour(h);
      setCEndHour(h);
    } else {
      setEndHour(h % 12 === 0 ? 12 : h % 12);
      setEndMeridiem(h >= 12 ? "PM" : "AM");
      setCEndHour(h % 12 === 0 ? 12 : h % 12);
      setCEndMeridiem(h >= 12 ? "PM" : "AM");
    }
    setEndMin(m);
    setCEndMin(m);
    setCEndMonth(now.getMonth());
    setCEndDay(now.getDate());
    setCEndYear(now.getFullYear());
  };

  const handleSwapTimes = () => {
    const tempH = startHour;
    const tempM = startMin;
    const tempMeridiem = startMeridiem;
    setStartHour(endHour);
    setStartMin(endMin);
    setStartMeridiem(endMeridiem);
    setEndHour(tempH);
    setEndMin(tempM);
    setEndMeridiem(tempMeridiem);
  };

  const handleReset = () => {
    setStartHour(8);
    setStartMin(30);
    setStartMeridiem("AM");
    setEndHour(5);
    setEndMin(30);
    setEndMeridiem("PM");
    setBreakMinutes(0);
    setHourlyRate("25.00");
    setOvertimeThreshold(8);
    setOvertimeMultiplier(1.5);
    setIs24Hour(false);
  };

  // --- COMPUTATIONS ---
  const intradayResult: HoursBreakdownResult = useMemo(() => {
    return calculateIntradayHours({
      startHour,
      startMinute: startMin,
      startMeridiem,
      endHour,
      endMinute: endMin,
      endMeridiem,
      is24Hour,
      breakMinutes,
      hourlyRate: activeTab === "overtime" ? parseFloat(hourlyRate) || 0 : undefined,
      overtimeThresholdHours: activeTab === "overtime" ? overtimeThreshold : undefined,
      overtimeMultiplier: activeTab === "overtime" ? overtimeMultiplier : undefined,
    });
  }, [startHour, startMin, startMeridiem, endHour, endMin, endMeridiem, is24Hour, breakMinutes, activeTab, hourlyRate, overtimeThreshold, overtimeMultiplier]);

  const crossDateResult: CrossDateHoursResult = useMemo(() => {
    return calculateCrossDateHours({
      startYear: cStartYear,
      startMonth: cStartMonth,
      startDay: cStartDay,
      startHour: cStartHour,
      startMinute: cStartMin,
      startMeridiem: cStartMeridiem,
      endYear: cEndYear,
      endMonth: cEndMonth,
      endDay: cEndDay,
      endHour: cEndHour,
      endMinute: cEndMin,
      endMeridiem: cEndMeridiem,
      is24Hour,
      breakMinutes,
      hourlyRate: parseFloat(hourlyRate) || 0,
    });
  }, [cStartYear, cStartMonth, cStartDay, cStartHour, cStartMin, cStartMeridiem, cEndYear, cEndMonth, cEndDay, cEndHour, cEndMin, cEndMeridiem, is24Hour, breakMinutes, hourlyRate]);

  // Save calculation to LocalStorage
  const handleSaveCalculation = () => {
    let summary = "";
    let primaryResult = "";
    let decimalHours = 0;

    if (activeTab === "crossdate") {
      summary = `${crossDateResult.startDateFormatted} to ${crossDateResult.endDateFormatted}`;
      primaryResult = `${crossDateResult.totalDecimalHours} hours (${crossDateResult.formattedDuration})`;
      decimalHours = crossDateResult.totalDecimalHours;
    } else {
      const sStr = `${startHour}:${String(startMin).padStart(2, "0")} ${!is24Hour ? startMeridiem : ""}`;
      const eStr = `${endHour}:${String(endMin).padStart(2, "0")} ${!is24Hour ? endMeridiem : ""}`;
      summary = `${sStr} to ${eStr}${breakMinutes > 0 ? ` (-${breakMinutes}m break)` : ""}`;
      primaryResult = `${intradayResult.formattedHoursMinutes} (${intradayResult.totalDecimalHours} hrs)`;
      decimalHours = intradayResult.totalDecimalHours;
    }

    const newRecord: SavedHoursRecord = {
      id: Date.now().toString(),
      tab: activeTab === "crossdate" ? "Cross-Date" : activeTab === "overtime" ? "Time Card" : "Intraday Hours",
      summary,
      primaryResult,
      decimalHours,
      timestamp: new Date().toLocaleString(),
    };

    const updated = [newRecord, ...savedRecords].slice(0, 15);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_hours_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  const handleDeleteRecord = (id: string) => {
    const updated = savedRecords.filter((r) => r.id !== id);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_hours_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update localStorage", e);
    }
  };

  const handleClearAllRecords = () => {
    setSavedRecords([]);
    try {
      localStorage.removeItem("calc_saved_hours_records");
    } catch (e) {
      console.error("Failed to clear localStorage", e);
    }
  };

  // Formatted Summary Copy
  const handleCopySummary = () => {
    let summary = "";
    if (activeTab === "crossdate") {
      summary = `Cross-Date Hours Result:
• Start: ${crossDateResult.startDateFormatted}
• End: ${crossDateResult.endDateFormatted}
• Duration: ${crossDateResult.formattedDuration}
• Decimal Hours: ${crossDateResult.totalDecimalHours} hours
• Total Days: ${crossDateResult.totalDays} days
Generated by CalcPlatform Hours Calculator`;
    } else {
      summary = `Hours Calculation Result:
• Start Time: ${startHour}:${String(startMin).padStart(2, "0")} ${!is24Hour ? startMeridiem : ""}
• End Time: ${endHour}:${String(endMin).padStart(2, "0")} ${!is24Hour ? endMeridiem : ""}
${breakMinutes > 0 ? `• Break Deducted: ${breakMinutes} minutes\n` : ""}• Total Time: ${intradayResult.formattedHoursMinutes}
• Decimal Hours: ${intradayResult.totalDecimalHours} hours
${intradayResult.grossPay ? `• Gross Pay: $${intradayResult.grossPay.toFixed(2)} (Regular: ${intradayResult.regularHours}h, OT: ${intradayResult.overtimeHours}h)` : ""}
Generated by CalcPlatform Hours Calculator`;
    }

    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  // Share URL Generator
  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}?tab=${activeTab}`;
      navigator.clipboard.writeText(url);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  // Recharts Chart Data (Regular vs Break vs Overtime)
  const chartData = useMemo(() => {
    if (activeTab === "overtime") {
      return [
        { name: "Regular Hours", value: Math.max(0, intradayResult.regularHours), color: "#2563EB" },
        { name: "Overtime Hours", value: Math.max(0, intradayResult.overtimeHours), color: "#8B5CF6" },
        { name: "Break Time (h)", value: Math.max(0, breakMinutes / 60), color: "#CBD5E1" },
      ].filter((d) => d.value > 0);
    }
    return [
      { name: "Working Hours", value: Math.max(0, intradayResult.totalDecimalHours), color: "#2563EB" },
      { name: "Break Time (h)", value: Math.max(0, breakMinutes / 60), color: "#CBD5E1" },
    ].filter((d) => d.value > 0);
  }, [activeTab, intradayResult, breakMinutes]);

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
                Advanced Hours Calculator Suite
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Exact hours between times • Multi-day durations • Timecard breaks & overtime solver
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
              onClick={() => setActiveTab("intraday")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "intraday"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Hours Between Two Times
            </button>
            <button
              onClick={() => setActiveTab("crossdate")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "crossdate"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Hours Between Two Dates
            </button>
            <button
              onClick={() => setActiveTab("overtime")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "overtime"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Time Card & Overtime Solver
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. INPUT CARD & PARAMETER SELECTORS */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* TAB 1 & TAB 3: INTRADAY / TIMECARD INPUTS */}
          {activeTab !== "crossdate" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Start Time Box */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Start Time (Clock In)
                    </span>
                    <button
                      onClick={handleSetStartToNow}
                      className="text-xs px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800"
                    >
                      Now
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Hour</label>
                      <input
                        type="number"
                        min={is24Hour ? 0 : 1}
                        max={is24Hour ? 23 : 12}
                        value={startHour}
                        onChange={(e) => setStartHour(parseInt(e.target.value, 10) || 0)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Minute</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={startMin}
                        onChange={(e) => setStartMin(parseInt(e.target.value, 10) || 0)}
                        className={input3DStyle}
                      />
                    </div>
                    {!is24Hour ? (
                      <div>
                        <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">AM / PM</label>
                        <select
                          value={startMeridiem}
                          onChange={(e) => setStartMeridiem(e.target.value as "AM" | "PM")}
                          className={input3DStyle}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    ) : (
                      <div className="flex items-end">
                        <span className="text-xs text-slate-400 font-mono pb-2">24h format</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* End Time Box */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        End Time (Clock Out)
                      </span>
                      <button
                        onClick={handleSwapTimes}
                        title="Swap Start and End times"
                        className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                      >
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={handleSetEndToNow}
                      className="text-xs px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800"
                    >
                      Now
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Hour</label>
                      <input
                        type="number"
                        min={is24Hour ? 0 : 1}
                        max={is24Hour ? 23 : 12}
                        value={endHour}
                        onChange={(e) => setEndHour(parseInt(e.target.value, 10) || 0)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Minute</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={endMin}
                        onChange={(e) => setEndMin(parseInt(e.target.value, 10) || 0)}
                        className={input3DStyle}
                      />
                    </div>
                    {!is24Hour ? (
                      <div>
                        <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">AM / PM</label>
                        <select
                          value={endMeridiem}
                          onChange={(e) => setEndMeridiem(e.target.value as "AM" | "PM")}
                          className={input3DStyle}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    ) : (
                      <div className="flex items-end">
                        <span className="text-xs text-slate-400 font-mono pb-2">24h format</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Overtime & Wage Options for Tab 3 */}
              {activeTab === "overtime" && (
                <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Hourly Wage Rate ($/hr):
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
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Daily Overtime Threshold:
                    </label>
                    <select
                      value={overtimeThreshold}
                      onChange={(e) => setOvertimeThreshold(parseInt(e.target.value, 10))}
                      className={input3DStyle}
                    >
                      <option value={8}>After 8 Hours (Standard)</option>
                      <option value={10}>After 10 Hours</option>
                      <option value={12}>After 12 Hours</option>
                      <option value={0}>No Overtime</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Overtime Multiplier:
                    </label>
                    <select
                      value={overtimeMultiplier}
                      onChange={(e) => setOvertimeMultiplier(parseFloat(e.target.value))}
                      className={input3DStyle}
                    >
                      <option value={1.5}>1.5x (Time and a Half)</option>
                      <option value={2.0}>2.0x (Double Time)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CROSS-DATE INPUTS */}
          {activeTab === "crossdate" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              {/* Start Date & Time */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Start Date & Time
                  </span>
                  <button
                    onClick={handleSetStartToNow}
                    className="text-xs px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800"
                  >
                    Now
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Month</label>
                    <select
                      value={cStartMonth}
                      onChange={(e) => setCStartMonth(parseInt(e.target.value, 10))}
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
                      value={cStartDay}
                      onChange={(e) => setCStartDay(parseInt(e.target.value, 10) || 1)}
                      className={input3DStyle}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Year</label>
                    <input
                      type="number"
                      min="1800"
                      max="2200"
                      value={cStartYear}
                      onChange={(e) => setCStartYear(parseInt(e.target.value, 10) || 2026)}
                      className={input3DStyle}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Hour</label>
                    <input
                      type="number"
                      min={is24Hour ? 0 : 1}
                      max={is24Hour ? 23 : 12}
                      value={cStartHour}
                      onChange={(e) => setCStartHour(parseInt(e.target.value, 10) || 0)}
                      className={input3DStyle}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Minute</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={cStartMin}
                      onChange={(e) => setCStartMin(parseInt(e.target.value, 10) || 0)}
                      className={input3DStyle}
                    />
                  </div>
                  {!is24Hour && (
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">AM/PM</label>
                      <select
                        value={cStartMeridiem}
                        onChange={(e) => setCStartMeridiem(e.target.value as "AM" | "PM")}
                        className={input3DStyle}
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* End Date & Time */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    End Date & Time
                  </span>
                  <button
                    onClick={handleSetEndToNow}
                    className="text-xs px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800"
                  >
                    Now
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Month</label>
                    <select
                      value={cEndMonth}
                      onChange={(e) => setCEndMonth(parseInt(e.target.value, 10))}
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
                      value={cEndDay}
                      onChange={(e) => setCEndDay(parseInt(e.target.value, 10) || 1)}
                      className={input3DStyle}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Year</label>
                    <input
                      type="number"
                      min="1800"
                      max="2200"
                      value={cEndYear}
                      onChange={(e) => setCEndYear(parseInt(e.target.value, 10) || 2026)}
                      className={input3DStyle}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Hour</label>
                    <input
                      type="number"
                      min={is24Hour ? 0 : 1}
                      max={is24Hour ? 23 : 12}
                      value={cEndHour}
                      onChange={(e) => setCEndHour(parseInt(e.target.value, 10) || 0)}
                      className={input3DStyle}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Minute</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={cEndMin}
                      onChange={(e) => setCEndMin(parseInt(e.target.value, 10) || 0)}
                      className={input3DStyle}
                    />
                  </div>
                  {!is24Hour && (
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">AM/PM</label>
                      <select
                        value={cEndMeridiem}
                        onChange={(e) => setCEndMeridiem(e.target.value as "AM" | "PM")}
                        className={input3DStyle}
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. SETTINGS CONTROLS (BREAKS, 12H/24H) */}
          {/* ========================================================================= */}
          <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:underline"
              >
                {showSettings ? "Hide Settings" : "Calculation Settings (Unpaid Break Deductions, 12H / 24H Format)"}
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
                    Unpaid Rest / Lunch Break (Minutes):
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
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 4. DYNAMIC OUTPUT CARD & PRIMARY RESULTS */}
          {/* ========================================================================= */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50/40 to-blue-50/20 dark:from-slate-800/80 dark:via-slate-800/40 dark:to-slate-800/80 border border-blue-200 dark:border-blue-900/60 shadow-inner space-y-4">
            
            {/* Primary Result Highlight */}
            <div className="text-center space-y-1.5">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                {activeTab === "crossdate" ? "Calculated Duration Between Dates" : "Total Time Worked"}
              </span>

              {activeTab === "crossdate" ? (
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {crossDateResult.totalDecimalHours.toLocaleString()} Hours
                  </div>
                  <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {crossDateResult.formattedDuration}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    From <strong>{crossDateResult.startDateFormatted}</strong> to <strong>{crossDateResult.endDateFormatted}</strong>
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {intradayResult.formattedHoursMinutes}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {intradayResult.totalDecimalHours} Decimal Hours
                  </div>
                  {intradayResult.overnightShift && (
                    <Badge variant="secondary" className="mt-1 text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                      Overnight Shift (+1 Day Midnight Rollover)
                    </Badge>
                  )}
                  {intradayResult.grossPay && (
                    <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                      Estimated Gross Earnings: ${intradayResult.grossPay.toFixed(2)} (Regular: {intradayResult.regularHours}h @ ${hourlyRate}, OT: {intradayResult.overtimeHours}h @ ${(parseFloat(hourlyRate) * overtimeMultiplier).toFixed(2)})
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* 5. ALL-UNITS BREAKDOWN MATRIX */}
            {/* ========================================================================= */}
            <div className="space-y-2.5 pt-3 border-t border-blue-200/60 dark:border-blue-900/40">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                All-Units Breakdown Matrix
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Decimal Hours</span>
                  <span className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
                    {activeTab === "crossdate" ? crossDateResult.totalDecimalHours : intradayResult.totalDecimalHours} hrs
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Minutes</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {activeTab === "crossdate" ? crossDateResult.totalMinutes.toLocaleString() : intradayResult.totalMinutes.toLocaleString()} min
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Seconds</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {activeTab === "crossdate" ? crossDateResult.totalSeconds.toLocaleString() : intradayResult.totalSeconds.toLocaleString()} s
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">% of Solar Day</span>
                  <span className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400">
                    {activeTab === "crossdate" ? `${(crossDateResult.totalDays * 100).toFixed(1)}%` : `${intradayResult.percentOfDay}%`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 6. INTERACTIVE VISUALIZER / TIMELINE BAR & DONUT */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Horizontal Timeline Bar */}
            <div className="lg:col-span-8 p-4 sm:p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Shift Timeline & Break Deductions
                </h3>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {activeTab === "crossdate" ? `${crossDateResult.totalDecimalHours}h total` : `${intradayResult.totalDecimalHours}h worked`}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700 shadow-inner flex">
                <div
                  className="bg-blue-600 h-full rounded-l-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(10, (intradayResult.regularHours / (intradayResult.totalDecimalHours + (breakMinutes / 60) || 1)) * 100))}%` }}
                  title="Regular Hours"
                />
                {intradayResult.overtimeHours > 0 && (
                  <div
                    className="bg-purple-600 h-full transition-all duration-500"
                    style={{ width: `${Math.max(5, (intradayResult.overtimeHours / (intradayResult.totalDecimalHours + (breakMinutes / 60) || 1)) * 100)}%` }}
                    title="Overtime Hours"
                  />
                )}
                {breakMinutes > 0 && (
                  <div
                    className="bg-slate-400 h-full rounded-r-full transition-all duration-500"
                    style={{ width: `${Math.max(5, ((breakMinutes / 60) / (intradayResult.totalDecimalHours + (breakMinutes / 60) || 1)) * 100)}%` }}
                    title="Break Time"
                  />
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <span className="text-blue-600 dark:text-blue-400 font-bold block text-sm sm:text-base">
                    {intradayResult.regularHours}h
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Regular Work</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <span className="text-purple-600 dark:text-purple-400 font-bold block text-sm sm:text-base">
                    {intradayResult.overtimeHours}h
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Overtime</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-700 dark:text-slate-300 font-bold block text-sm sm:text-base">
                    {breakMinutes}m
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Unpaid Break</span>
                </div>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="lg:col-span-4 p-4 sm:p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Hours Distribution
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
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {intradayResult.totalDecimalHours}h
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-slate-400">hours</span>
                </div>
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                Shift Breakdown
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
                  Saved Hours Calculations ({savedRecords.length})
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
                      <th className="py-2 px-2">Shift / Time Interval</th>
                      <th className="py-2 px-2">Output</th>
                      <th className="py-2 px-2">Decimal Hours</th>
                      <th className="py-2 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {savedRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <td className="py-2.5 px-2 font-medium text-slate-900 dark:text-white">{rec.tab}</td>
                        <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 font-mono">{rec.summary}</td>
                        <td className="py-2.5 px-2 font-bold text-blue-600 dark:text-blue-400">{rec.primaryResult}</td>
                        <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300">{rec.decimalHours.toFixed(2)} hrs</td>
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

      {/* ========================================================================= */}
      {/* 8. EDUCATIONAL KNOWLEDGE BASE */}
      {/* ========================================================================= */}
      <HoursContent />
    </div>
  );
}

export default HoursCalculator;
