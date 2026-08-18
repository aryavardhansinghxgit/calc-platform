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
  Calendar as CalendarIcon,
  Briefcase,
  ArrowRightLeft,
  HelpCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  calculateDaysBetween,
  calculateAddSubtractDays,
  calculateDoomsday,
  DaysBetweenParams,
  DaysBetweenResult,
  AddSubtractDaysParams,
  AddSubtractDaysResult,
  DoomsdayStepDetail,
} from "@/lib/calculator-engine/formulas/day-counter";
import { DayCounterContent } from "./DayCounterContent";

interface SavedDayCountRecord {
  id: string;
  tab: string;
  summary: string;
  primaryResult: string;
  totalDays: number;
  timestamp: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function DayCounterCalculator() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [activeTab, setActiveTab] = useState<"between" | "addsub" | "doomsday">("between");

  const today = new Date();

  // --- TAB 1: DAYS BETWEEN DATES ---
  const [startMonth, setStartMonth] = useState<number>(today.getMonth());
  const [startDay, setStartDay] = useState<number>(today.getDate());
  const [startYear, setStartYear] = useState<number>(today.getFullYear());

  const future = new Date();
  future.setMonth(future.getMonth() + 3);
  const [endMonth, setEndMonth] = useState<number>(future.getMonth());
  const [endDay, setEndDay] = useState<number>(future.getDate());
  const [endYear, setEndYear] = useState<number>(future.getFullYear());

  const [includeEndDay, setIncludeEndDay] = useState<boolean>(false);
  const [excludeHolidays, setExcludeHolidays] = useState<boolean>(true);
  const [workweekType, setWorkweekType] = useState<"standard" | "fourDay" | "sixDay">("standard");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // --- TAB 2: ADD / SUBTRACT DAYS ---
  const [offsetDays, setOffsetDays] = useState<number>(30);
  const [offsetOp, setOffsetOp] = useState<"add" | "subtract">("add");
  const [businessDaysOnly, setBusinessDaysOnly] = useState<boolean>(false);

  // --- TAB 3: DOOMSDAY DAY-OF-WEEK SOLVER ---
  const [doomMonth, setDoomMonth] = useState<number>(2); // March
  const [doomDay, setDoomDay] = useState<number>(15);
  const [doomYear, setDoomYear] = useState<number>(2292);

  // Feedback & History
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [savedRecords, setSavedRecords] = useState<SavedDayCountRecord[]>([]);

  // Sync with URL query parameters on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "addsub" || tabParam === "doomsday" || tabParam === "between") {
        setActiveTab(tabParam);
      }

      // Load saved records from localStorage
      try {
        const stored = localStorage.getItem("calc_saved_daycounter_records");
        if (stored) {
          setSavedRecords(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load records from localStorage", e);
      }
    }
  }, []);

  // Quick Handlers
  const handleSetStartToToday = () => {
    const now = new Date();
    setStartMonth(now.getMonth());
    setStartDay(now.getDate());
    setStartYear(now.getFullYear());
  };

  const handleSetEndToToday = () => {
    const now = new Date();
    setEndMonth(now.getMonth());
    setEndDay(now.getDate());
    setEndYear(now.getFullYear());
  };

  const handleSwapDates = () => {
    const tempM = startMonth;
    const tempD = startDay;
    const tempY = startYear;
    setStartMonth(endMonth);
    setStartDay(endDay);
    setStartYear(endYear);
    setEndMonth(tempM);
    setEndDay(tempD);
    setEndYear(tempY);
  };

  const handleReset = () => {
    const now = new Date();
    setStartMonth(now.getMonth());
    setStartDay(now.getDate());
    setStartYear(now.getFullYear());

    const fut = new Date();
    fut.setMonth(fut.getMonth() + 3);
    setEndMonth(fut.getMonth());
    setEndDay(fut.getDate());
    setEndYear(fut.getFullYear());

    setIncludeEndDay(false);
    setExcludeHolidays(true);
    setWorkweekType("standard");
    setOffsetDays(30);
    setOffsetOp("add");
    setBusinessDaysOnly(false);
  };

  // Workweek array resolution
  const workweekDays = useMemo(() => {
    if (workweekType === "fourDay") return [1, 2, 3, 4]; // Mon-Thu
    if (workweekType === "sixDay") return [1, 2, 3, 4, 5, 6]; // Mon-Sat
    return [1, 2, 3, 4, 5]; // Mon-Fri
  }, [workweekType]);

  // --- COMPUTATIONS ---
  const daysBetweenResult: DaysBetweenResult = useMemo(() => {
    return calculateDaysBetween({
      startYear,
      startMonth,
      startDay,
      endYear,
      endMonth,
      endDay,
      includeEndDay,
      workweekDays,
      excludeHolidays,
    });
  }, [startYear, startMonth, startDay, endYear, endMonth, endDay, includeEndDay, workweekDays, excludeHolidays]);

  const addSubtractResult: AddSubtractDaysResult = useMemo(() => {
    return calculateAddSubtractDays({
      startYear,
      startMonth,
      startDay,
      daysToOffset: offsetDays,
      operation: offsetOp,
      businessDaysOnly,
      workweekDays,
      excludeHolidays,
    });
  }, [startYear, startMonth, startDay, offsetDays, offsetOp, businessDaysOnly, workweekDays, excludeHolidays]);

  const doomsdayResult: DoomsdayStepDetail = useMemo(() => {
    return calculateDoomsday(doomYear, doomMonth, doomDay);
  }, [doomYear, doomMonth, doomDay]);

  // Save calculation to LocalStorage
  const handleSaveCalculation = () => {
    let summary = "";
    let primaryResult = "";
    let totalDays = 0;

    if (activeTab === "addsub") {
      summary = `${offsetOp === "add" ? "+" : "-"}${offsetDays} ${businessDaysOnly ? "business days" : "days"} from ${daysBetweenResult.startDateFormatted}`;
      primaryResult = `${addSubtractResult.targetDateFormatted} (${addSubtractResult.targetDayOfWeek})`;
      totalDays = addSubtractResult.totalCalendarDaysShifted;
    } else if (activeTab === "doomsday") {
      summary = `Doomsday rule for ${MONTH_NAMES[doomMonth]} ${doomDay}, ${doomYear}`;
      primaryResult = `${doomsdayResult.finalDayOfWeek}`;
      totalDays = 1;
    } else {
      summary = `${daysBetweenResult.startDateFormatted} to ${daysBetweenResult.endDateFormatted}${includeEndDay ? " (inclusive)" : ""}`;
      primaryResult = `${daysBetweenResult.totalCalendarDays} days (${daysBetweenResult.businessDays} working days)`;
      totalDays = daysBetweenResult.totalCalendarDays;
    }

    const newRecord: SavedDayCountRecord = {
      id: Date.now().toString(),
      tab: activeTab === "addsub" ? "Date Offset" : activeTab === "doomsday" ? "Doomsday Solver" : "Days Between Dates",
      summary,
      primaryResult,
      totalDays,
      timestamp: new Date().toLocaleString(),
    };

    const updated = [newRecord, ...savedRecords].slice(0, 15);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_daycounter_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  const handleDeleteRecord = (id: string) => {
    const updated = savedRecords.filter((r) => r.id !== id);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_daycounter_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update localStorage", e);
    }
  };

  const handleClearAllRecords = () => {
    setSavedRecords([]);
    try {
      localStorage.removeItem("calc_saved_daycounter_records");
    } catch (e) {
      console.error("Failed to clear localStorage", e);
    }
  };

  // Formatted Summary Copy
  const handleCopySummary = () => {
    let summary = "";
    if (activeTab === "addsub") {
      summary = `Date Offset Calculation:
• Start Date: ${daysBetweenResult.startDateFormatted}
• Operation: ${offsetOp === "add" ? "Add" : "Subtract"} ${offsetDays} ${businessDaysOnly ? "business days" : "calendar days"}
• Target Date: ${addSubtractResult.targetDateFormatted} (${addSubtractResult.targetDayOfWeek})
• Calendar Days Shifted: ${addSubtractResult.totalCalendarDaysShifted} days
Generated by CalcPlatform Day Counter`;
    } else if (activeTab === "doomsday") {
      summary = `Doomsday Rule Day of the Week:
• Target Date: ${MONTH_NAMES[doomMonth]} ${doomDay}, ${doomYear}
• Day of the Week: ${doomsdayResult.finalDayOfWeek}
• Century Anchor: ${doomsdayResult.anchorCentury} (${doomsdayResult.anchorCenturyDay})
• Year Doomsday: ${doomsdayResult.yearDoomsday}
Generated by CalcPlatform Day Counter`;
    } else {
      summary = `Day Counter Result:
• Date Range: ${daysBetweenResult.startDateFormatted} to ${daysBetweenResult.endDateFormatted} ${includeEndDay ? "(Inclusive)" : "(Exclusive)"}
• Total Calendar Days: ${daysBetweenResult.totalCalendarDays} days
• Business Working Days: ${daysBetweenResult.businessDays} days
• Weekend Days: ${daysBetweenResult.weekendDays} days
• Public Holidays Excluded: ${daysBetweenResult.holidaysCount}
• Total Weeks: ${daysBetweenResult.totalWeeks} weeks and ${daysBetweenResult.remainingDays} days
Generated by CalcPlatform Day Counter`;
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

  // Pure White 3D tactile input styling
  const input3DStyle = "w-full h-10 px-3 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold text-slate-900 dark:text-slate-100 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.06),0_1.5px_0_0_#e2e8f0] dark:shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.3),0_1.5px_0_0_#334155] focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_0_0_2px_#2563eb] focus:border-blue-600 outline-none transition-all";

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* ========================================================================= */}
      {/* 1. MAIN THIN BLUE BORDER ISOLATED CARD CONTAINER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-500 rounded-xl shadow-md bg-white dark:bg-slate-900 overflow-hidden">
        
        {/* Context Tabs Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Advanced Day Counter & Date Duration Suite
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Exact days between dates • Business days & holiday engine • Conway&apos;s Doomsday solver
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
              onClick={() => setActiveTab("between")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "between"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Days Between Two Dates
            </button>
            <button
              onClick={() => setActiveTab("addsub")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "addsub"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Count Days from a Date (Add/Subtract)
            </button>
            <button
              onClick={() => setActiveTab("doomsday")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "doomsday"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Conway&apos;s Doomsday Rule Solver
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. INPUT CARD & PARAMETER SELECTORS */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* TAB 1: DAYS BETWEEN DATES */}
          {activeTab === "between" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                
                {/* Start Date Box */}
                <div className="md:col-span-5 p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Start Date
                    </span>
                    <button
                      onClick={handleSetStartToToday}
                      className="text-xs px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800"
                    >
                      Today
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">Month</label>
                      <select
                        value={startMonth}
                        onChange={(e) => setStartMonth(parseInt(e.target.value, 10))}
                        className={input3DStyle}
                      >
                        {MONTH_NAMES.map((m, idx) => (
                          <option key={idx} value={idx}>{m.substring(0, 3)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">Day</label>
                      <input
                        type="number"
                        min="1"
                        max="31"
                        value={startDay}
                        onChange={(e) => setStartDay(parseInt(e.target.value, 10) || 1)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">Year</label>
                      <input
                        type="number"
                        min="1800"
                        max="2300"
                        value={startYear}
                        onChange={(e) => setStartYear(parseInt(e.target.value, 10) || 2026)}
                        className={input3DStyle}
                      />
                    </div>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="md:col-span-2 flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSwapDates}
                    title="Swap Start and End Dates"
                    className="w-10 h-10 rounded-full border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 shadow-sm hover:bg-blue-50 text-blue-600"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </Button>
                </div>

                {/* End Date Box */}
                <div className="md:col-span-5 p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      End Date
                    </span>
                    <button
                      onClick={handleSetEndToToday}
                      className="text-xs px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800"
                    >
                      Today
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">Month</label>
                      <select
                        value={endMonth}
                        onChange={(e) => setEndMonth(parseInt(e.target.value, 10))}
                        className={input3DStyle}
                      >
                        {MONTH_NAMES.map((m, idx) => (
                          <option key={idx} value={idx}>{m.substring(0, 3)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">Day</label>
                      <input
                        type="number"
                        min="1"
                        max="31"
                        value={endDay}
                        onChange={(e) => setEndDay(parseInt(e.target.value, 10) || 1)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">Year</label>
                      <input
                        type="number"
                        min="1800"
                        max="2300"
                        value={endYear}
                        onChange={(e) => setEndYear(parseInt(e.target.value, 10) || 2026)}
                        className={input3DStyle}
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Checkbox Options */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeEndDay}
                    onChange={(e) => setIncludeEndDay(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span>Include end day in count (+1 whole calendar day)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={excludeHolidays}
                    onChange={(e) => setExcludeHolidays(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span>Exclude US Federal Holidays from working days</span>
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: ADD / SUBTRACT DAYS */}
          {activeTab === "addsub" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Start Date */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Start Date
                    </span>
                    <button
                      onClick={handleSetStartToToday}
                      className="text-xs px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 font-bold border border-blue-200"
                    >
                      Today
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">Month</label>
                      <select
                        value={startMonth}
                        onChange={(e) => setStartMonth(parseInt(e.target.value, 10))}
                        className={input3DStyle}
                      >
                        {MONTH_NAMES.map((m, idx) => (
                          <option key={idx} value={idx}>{m.substring(0, 3)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">Day</label>
                      <input
                        type="number"
                        min="1"
                        max="31"
                        value={startDay}
                        onChange={(e) => setStartDay(parseInt(e.target.value, 10) || 1)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">Year</label>
                      <input
                        type="number"
                        min="1800"
                        max="2300"
                        value={startYear}
                        onChange={(e) => setStartYear(parseInt(e.target.value, 10) || 2026)}
                        className={input3DStyle}
                      />
                    </div>
                  </div>
                </div>

                {/* Offset Field */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                  <span className="text-sm font-bold text-slate-900 dark:text-white block">
                    Days to Offset
                  </span>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">Operation</label>
                      <select
                        value={offsetOp}
                        onChange={(e) => setOffsetOp(e.target.value as "add" | "subtract")}
                        className={input3DStyle}
                      >
                        <option value="add">+ Add</option>
                        <option value="subtract">- Subtract</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="text-xs text-slate-500 block mb-1">Number of Days</label>
                      <input
                        type="number"
                        min="0"
                        max="100000"
                        value={offsetDays}
                        onChange={(e) => setOffsetDays(Math.max(0, parseInt(e.target.value, 10) || 0))}
                        className={input3DStyle}
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={businessDaysOnly}
                      onChange={(e) => setBusinessDaysOnly(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <span>Count Business / Working Days Only (Skip weekends & holidays)</span>
                  </label>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: DOOMSDAY DAY-OF-WEEK SOLVER */}
          {activeTab === "doomsday" && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">
                  Select Target Date for Doomsday Mental Math
                </span>
                <p className="text-xs text-slate-500">
                  Calculates the day of the week for any Gregorian calendar date using Conway&apos;s Doomsday rule.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Month</label>
                  <select
                    value={doomMonth}
                    onChange={(e) => setDoomMonth(parseInt(e.target.value, 10))}
                    className={input3DStyle}
                  >
                    {MONTH_NAMES.map((m, idx) => (
                      <option key={idx} value={idx}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Day</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={doomDay}
                    onChange={(e) => setDoomDay(parseInt(e.target.value, 10) || 1)}
                    className={input3DStyle}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Year (e.g. 2292)</label>
                  <input
                    type="number"
                    min="1"
                    max="9999"
                    value={doomYear}
                    onChange={(e) => setDoomYear(parseInt(e.target.value, 10) || 2026)}
                    className={input3DStyle}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Settings Options */}
          <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:underline"
              >
                {showSettings ? "Hide Settings" : "Calculation Settings (Workweek Schedule, Holidays)"}
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
                    Workweek Schedule:
                  </label>
                  <select
                    value={workweekType}
                    onChange={(e) => setWorkweekType(e.target.value as any)}
                    className={input3DStyle}
                  >
                    <option value="standard">Standard 5-Day Workweek (Monday – Friday)</option>
                    <option value="fourDay">4-Day Compressed Workweek (Monday – Thursday)</option>
                    <option value="sixDay">6-Day Workweek (Monday – Saturday)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Public Holiday Calendar:
                  </label>
                  <select
                    value={excludeHolidays ? "US" : "NONE"}
                    onChange={(e) => setExcludeHolidays(e.target.value === "US")}
                    className={input3DStyle}
                  >
                    <option value="US">United States Federal Holidays (11 Standard Holidays)</option>
                    <option value="NONE">No Public Holidays (Weekends Only)</option>
                  </select>
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
                {activeTab === "addsub" ? "Calculated Target Date" : activeTab === "doomsday" ? "Day of the Week" : "Total Calendar Days"}
              </span>

              {activeTab === "addsub" ? (
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {addSubtractResult.targetDateFormatted}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {addSubtractResult.targetDayOfWeek}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Shifted {addSubtractResult.totalCalendarDaysShifted} calendar days ({addSubtractResult.weekendDaysSkipped} weekend days & {addSubtractResult.holidaysSkipped} holidays skipped)
                  </p>
                </div>
              ) : activeTab === "doomsday" ? (
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {doomsdayResult.finalDayOfWeek}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    For <strong>{MONTH_NAMES[doomMonth]} {doomDay}, {doomYear}</strong> (Year Doomsday: {doomsdayResult.yearDoomsday})
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {daysBetweenResult.totalCalendarDays.toLocaleString()} Days
                  </div>
                  <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {daysBetweenResult.businessDays} Working Days • {daysBetweenResult.weekendDays} Weekend Days
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    From <strong>{daysBetweenResult.startDateFormatted}</strong> to <strong>{daysBetweenResult.endDateFormatted}</strong> {includeEndDay ? "(Inclusive of end date)" : "(Exclusive of end date)"}
                  </p>
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* 5. ALL-UNITS BREAKDOWN MATRIX */}
            {/* ========================================================================= */}
            {activeTab === "between" && (
              <div className="space-y-2.5 pt-3 border-t border-blue-200/60 dark:border-blue-900/40">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Sub-Unit Breakdown Matrix
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Weeks</span>
                    <span className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
                      {daysBetweenResult.totalWeeks} wks, {daysBetweenResult.remainingDays} d
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Hours</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {daysBetweenResult.totalHours.toLocaleString()} hrs
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Minutes</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {daysBetweenResult.totalMinutes.toLocaleString()} min
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">% of Solar Year</span>
                    <span className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400">
                      {daysBetweenResult.percentOfYear}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Doomsday Step-by-Step Box */}
            {activeTab === "doomsday" && (
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  Doomsday Algorithm Calculation Steps:
                </span>
                <div>1. Century Anchor ({doomsdayResult.anchorCentury}s): <strong>{doomsdayResult.anchorCenturyDay}</strong></div>
                <div>2. Year Division ({doomsdayResult.yearOfCentury} ÷ 12): {doomsdayResult.div12} with remainder {doomsdayResult.rem12}</div>
                <div>3. Leap Adjustment ({doomsdayResult.rem12} ÷ 4): {doomsdayResult.div4}</div>
                <div>4. Sum & Modulo: Sum = {doomsdayResult.sum} → Year Doomsday = <strong>{doomsdayResult.yearDoomsday}</strong></div>
                <div>5. Month Anchor ({doomsdayResult.closestDoomsdayDate}): Difference = {doomsdayResult.diffDays} days → <strong>{doomsdayResult.finalDayOfWeek}</strong></div>
              </div>
            )}

          </div>

          {/* ========================================================================= */}
          {/* 6. MATCHING BLUE "SAVE CALCULATION" BUTTON & HISTORY */}
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
                  Saved Day Calculations ({savedRecords.length})
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
                      <th className="py-2 px-2">Date Interval / Calculation</th>
                      <th className="py-2 px-2">Result</th>
                      <th className="py-2 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {savedRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <td className="py-2.5 px-2 font-medium text-slate-900 dark:text-white">{rec.tab}</td>
                        <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 font-mono">{rec.summary}</td>
                        <td className="py-2.5 px-2 font-bold text-blue-600 dark:text-blue-400">{rec.primaryResult}</td>
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
      {/* 7. EDUCATIONAL KNOWLEDGE BASE */}
      {/* ========================================================================= */}
      <DayCounterContent />
    </div>
  );
}

export default DayCounterCalculator;
