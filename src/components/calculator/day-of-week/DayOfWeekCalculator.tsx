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
  HelpCircle,
  Clock,
  Globe,
  Sparkles,
  ListOrdered,
  Download,
  Printer,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  calculateDayOfWeek,
  parseBatchDates,
  isLeapYear,
  getDaysInMonth,
  isValidCalendarDate,
  getWeekdayForCalendarDate,
  DayOfWeekParams,
  DayOfWeekResult,
  BatchDateResultItem,
  DAY_ETYMOLOGY_DATABASE,
  MONTH_NAMES,
  DAY_NAMES,
} from "@/lib/calculator-engine/formulas/day-of-week";

interface SavedDayRecord {
  id: string;
  tab: string;
  summary: string;
  primaryResult: string;
  dayOfYear: number;
  timestamp: string;
}

export function DayOfWeekCalculator() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [activeTab, setActiveTab] = useState<"single" | "batch" | "historical">("single");

  const today = new Date();
  const [targetMonth, setTargetMonth] = useState<number>(today.getMonth());
  const [targetDay, setTargetDay] = useState<number>(today.getDate());
  const [targetYear, setTargetYear] = useState<number>(today.getFullYear());

  // Settings
  const [calendarSystem, setCalendarSystem] = useState<"gregorian" | "julian">("gregorian");
  const [firstDaySunday, setFirstDaySunday] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showZellerSteps, setShowZellerSteps] = useState<boolean>(false);

  // Batch Parser
  const [batchText, setBatchText] = useState<string>("1969-07-20\n1776-07-04\n2000-01-01\n2026-08-18");

  // Feedback & History
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [savedRecords, setSavedRecords] = useState<SavedDayRecord[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Sync with URL query parameters on initial mount
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "batch" || tabParam === "historical" || tabParam === "single") {
        setActiveTab(tabParam);
      }
      const y = parseInt(params.get("year") || "", 10);
      const m = parseInt(params.get("month") || "", 10);
      const d = parseInt(params.get("day") || "", 10);
      const cal = params.get("calendar");
      const ws = params.get("weekStart");

      if (!isNaN(y) && y >= 1 && y <= 9999) setTargetYear(y);
      if (!isNaN(m) && m >= 0 && m <= 11) setTargetMonth(m);
      if (!isNaN(d) && d >= 1 && d <= 31) setTargetDay(d);
      if (cal === "julian" || cal === "gregorian") setCalendarSystem(cal);
      if (ws === "sunday") setFirstDaySunday(true);
      else if (ws === "monday") setFirstDaySunday(false);

      // Load saved records from localStorage
      try {
        const stored = localStorage.getItem("calc_saved_dayofweek_records");
        if (stored) {
          setSavedRecords(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load records from localStorage", e);
      }
    }
  }, []);

  // Preset Handlers (all explicitly reset to Gregorian & single mode)
  const handleSetToToday = () => {
    const now = new Date();
    setTargetMonth(now.getMonth());
    setTargetDay(now.getDate());
    setTargetYear(now.getFullYear());
    setCalendarSystem("gregorian");
    setActiveTab("single");
  };

  const handleSetToYesterday = () => {
    const yest = new Date();
    yest.setDate(yest.getDate() - 1);
    setTargetMonth(yest.getMonth());
    setTargetDay(yest.getDate());
    setTargetYear(yest.getFullYear());
    setCalendarSystem("gregorian");
    setActiveTab("single");
  };

  const handleSetApollo11 = () => {
    setTargetMonth(6); // July
    setTargetDay(20);
    setTargetYear(1969);
    setCalendarSystem("gregorian");
    setActiveTab("single");
  };

  const handleSetDeclaration = () => {
    setTargetMonth(6); // July
    setTargetDay(4);
    setTargetYear(1776);
    setCalendarSystem("gregorian");
    setActiveTab("single");
  };

  const handleReset = () => {
    const now = new Date();
    setTargetMonth(now.getMonth());
    setTargetDay(now.getDate());
    setTargetYear(now.getFullYear());
    setCalendarSystem("gregorian");
    setFirstDaySunday(true);
    setActiveTab("single");
    setBatchText("1969-07-20\n1776-07-04\n2000-01-01\n2026-08-18");
  };

  // --- COMPUTATIONS ---
  const singleResult: DayOfWeekResult = useMemo(() => {
    return calculateDayOfWeek({
      year: targetYear,
      month: targetMonth,
      day: targetDay,
      calendarSystem,
    });
  }, [targetYear, targetMonth, targetDay, calendarSystem]);

  const batchResults: BatchDateResultItem[] = useMemo(() => {
    return parseBatchDates(batchText, "gregorian");
  }, [batchText]);

  // Save calculation to LocalStorage
  const handleSaveCalculation = () => {
    if (!singleResult.isValid) return;

    const summary = `${singleResult.formattedDate} (${calendarSystem === "julian" ? "Proleptic Julian" : "Gregorian"})`;
    const primaryResult = `${singleResult.dayName} (Day ${singleResult.dayOfYear} of ${singleResult.totalDaysInYear})`;

    const newRecord: SavedDayRecord = {
      id: Date.now().toString(),
      tab: activeTab === "batch" ? "Batch Parser" : activeTab === "historical" ? "Proleptic Julian" : "Day Finder",
      summary,
      primaryResult,
      dayOfYear: singleResult.dayOfYear,
      timestamp: new Date().toLocaleString(),
    };

    const updated = [newRecord, ...savedRecords].slice(0, 15);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_dayofweek_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  const handleDeleteRecord = (id: string) => {
    const updated = savedRecords.filter((r) => r.id !== id);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_dayofweek_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update localStorage", e);
    }
  };

  const handleClearAllRecords = () => {
    setSavedRecords([]);
    try {
      localStorage.removeItem("calc_saved_dayofweek_records");
    } catch (e) {
      console.error("Failed to clear localStorage", e);
    }
  };

  // Formatted Summary Copy
  const handleCopySummary = () => {
    let summary = "";
    if (activeTab === "batch") {
      summary = `Batch Date Results:\n` + batchResults.map((r) => `• ${r.dateString}: ${r.dayName} ${r.isValid ? `(Day ${r.dayOfYear})` : "(Invalid Date)"}`).join("\n") + `\nGenerated by CalcPlatform Day of Week Calculator`;
    } else {
      if (!singleResult.isValid) {
        summary = `Day of the Week Calculation:\n• Target Date: ${targetMonth + 1}/${targetDay}/${targetYear}\n• Error: ${singleResult.errorMessage}\nGenerated by CalcPlatform Day of Week Calculator`;
      } else {
        summary = `Day of the Week Calculation:
• Target Date: ${singleResult.formattedDate}
• Day of the Week: ${singleResult.dayName}
• Day of Year: Day ${singleResult.dayOfYear} of ${singleResult.totalDaysInYear} (${singleResult.daysRemainingInYear} days remaining)
• ISO 8601 Week Number: Week ${singleResult.isoWeekNumber}
• Calendar System: ${calendarSystem === "julian" ? "Proleptic Julian Calendar" : "Gregorian Calendar"}
• Celestial Deity: ${singleResult.etymology.celestialBody}
• Japanese: ${singleResult.etymology.japaneseName} | Sanskrit: ${singleResult.etymology.sanskritName}
Generated by CalcPlatform Day of Week Calculator`;
      }
    }

    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  // Share URL Generator (with serialized state)
  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams();
      p.set("tab", activeTab);
      p.set("year", targetYear.toString());
      p.set("month", targetMonth.toString());
      p.set("day", targetDay.toString());
      p.set("calendar", calendarSystem);
      p.set("weekStart", firstDaySunday ? "sunday" : "monday");
      const url = `${window.location.origin}${window.location.pathname}?${p.toString()}`;
      navigator.clipboard.writeText(url);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  // CSV Export for Single Date
  const handleExportSingleCsv = () => {
    if (!singleResult.isValid) return;
    const escapeCsv = (val: any) => {
      let str = String(val ?? "");
      if (/^[=+\-@]/.test(str)) str = "'" + str;
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        str = '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    };
    const headers = [
      "Date",
      "Day of Week",
      "Calendar System",
      "Day of Year",
      "Days in Year",
      "ISO Week",
      "Leap Year",
      "Days Remaining",
    ];
    const row = [
      escapeCsv(singleResult.formattedDate),
      escapeCsv(singleResult.dayName),
      escapeCsv(singleResult.calendarSystem === "julian" ? "Proleptic Julian" : "Gregorian"),
      escapeCsv(singleResult.dayOfYear),
      escapeCsv(singleResult.totalDaysInYear),
      escapeCsv(singleResult.isoWeekNumber),
      escapeCsv(singleResult.isLeapYear ? "Yes" : "No"),
      escapeCsv(singleResult.daysRemainingInYear),
    ];
    const csvContent = headers.join(",") + "\n" + row.join(",");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `day_of_week_${targetYear}_${targetMonth + 1}_${targetDay}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // CSV Export for Batch Parser
  const handleExportBatchCsv = () => {
    const escapeCsv = (val: any) => {
      let str = String(val ?? "");
      if (/^[=+\-@]/.test(str)) str = "'" + str;
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        str = '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    };
    const headers = [
      "Date",
      "Day of Week",
      "Calendar System",
      "Day of Year",
      "Days in Year",
      "ISO Week",
      "Leap Year",
    ];
    const rows = batchResults.map((r) => [
      escapeCsv(r.dateString),
      escapeCsv(r.dayName),
      escapeCsv("Gregorian"),
      escapeCsv(r.isValid ? r.dayOfYear : "N/A"),
      escapeCsv(r.isValid ? r.totalDaysInYear : "N/A"),
      escapeCsv(r.isValid ? r.isoWeekNumber : "N/A"),
      escapeCsv(r.isValid ? (r.isLeapYear ? "Yes" : "No") : "N/A"),
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `batch_day_of_week_results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Dedicated Browser Print
  const handlePrintReport = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Pure White 3D tactile input styling
  const input3DStyle = "w-full h-10 px-3 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold text-slate-900 dark:text-slate-100 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.06),0_1.5px_0_0_#e2e8f0] dark:shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.3),0_1.5px_0_0_#334155] focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_0_0_2px_#2563eb] focus:border-blue-600 outline-none transition-all";

  // Build calendar matrix
  const renderCalendarMatrix = () => {
    const { daysInMonth, firstDayOfWeekIndex, selectedDay } = singleResult.calendarGrid;
    const days: (number | null)[] = [];

    // Adjust for first day of week (Sunday vs Monday)
    let offset = firstDaySunday ? firstDayOfWeekIndex : (firstDayOfWeekIndex === 0 ? 6 : firstDayOfWeekIndex - 1);
    for (let i = 0; i < offset; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }

    const dayHeaders = firstDaySunday
      ? ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
      : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    return (
      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
          <span>{MONTH_NAMES[targetMonth]} {targetYear}</span>
          <span className="text-[11px] font-normal text-slate-500">{daysInMonth} days</span>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {dayHeaders.map((dh) => (
            <span key={dh} className="text-[11px] font-bold text-slate-400 py-0.5">
              {dh}
            </span>
          ))}

          {days.map((d, idx) => {
            if (d === null) {
              return <div key={`empty-${idx}`} className="h-6 sm:h-7" />;
            }
            const isSelected = d === selectedDay;
            const dayOfWeekForCell = getWeekdayForCalendarDate(targetYear, targetMonth, d, calendarSystem);
            const calSystemLabel = calendarSystem === "julian" ? "Proleptic Julian Calendar" : "Gregorian Calendar";
            const accessibleLabel = `${MONTH_NAMES[targetMonth]} ${d}, ${targetYear}, ${dayOfWeekForCell.dayName}, ${calSystemLabel}`;

            return (
              <button
                type="button"
                key={`day-${d}`}
                role="button"
                tabIndex={0}
                aria-label={accessibleLabel}
                aria-current={isSelected ? "date" : undefined}
                onClick={() => setTargetDay(d)}
                className={`h-6 sm:h-7 flex items-center justify-center rounded text-xs font-semibold cursor-pointer transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/40"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const dayHeaders = firstDaySunday
    ? ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const printDays: (number | null)[] = useMemo(() => {
    const { daysInMonth, firstDayOfWeekIndex } = singleResult.calendarGrid;
    const arr: (number | null)[] = [];
    let offset = firstDaySunday ? firstDayOfWeekIndex : (firstDayOfWeekIndex === 0 ? 6 : firstDayOfWeekIndex - 1);
    for (let i = 0; i < offset; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [singleResult.calendarGrid, firstDaySunday]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          nav, header, footer, .no-print, [role="navigation"] {
            display: none !important;
          }
          #day-of-week-print-report {
            display: block !important;
          }
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 1. MAIN THIN BLUE BORDER ISOLATED CARD CONTAINER (Interactive Mode) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-500 rounded-xl shadow-md bg-white dark:bg-slate-900 overflow-hidden no-print print:hidden">
        
        {/* Context Tabs Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              {/* Changed h1 to h2 for single-H1 compliance */}
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Day of the Week Calculator &amp; Calendar History
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Zeller&apos;s congruence algorithm • ISO 8601 week solver • Planetary etymology &amp; trivia
              </p>
            </div>

            {/* Top Quick Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopySummary}
                className="h-8 text-xs border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs cursor-pointer"
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
                className="h-8 text-xs border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs cursor-pointer"
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
              <Button
                variant="outline"
                size="sm"
                onClick={activeTab === "batch" ? handleExportBatchCsv : handleExportSingleCsv}
                disabled={activeTab !== "batch" && !singleResult.isValid}
                className="h-8 text-xs border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Export CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrintReport}
                className="h-8 text-xs border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 mr-1 text-slate-700 dark:text-slate-300" /> Print Report
              </Button>
            </div>
          </div>

          {/* Context Mode Tabs: Mode switch explicitly resets calendarSystem */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => {
                setActiveTab("single");
                setCalendarSystem("gregorian");
              }}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "single"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Day Finder (Single Date)
            </button>
            <button
              onClick={() => {
                setActiveTab("batch");
                setCalendarSystem("gregorian");
              }}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "batch"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Batch Multi-Date Parser
            </button>
            <button
              onClick={() => {
                setActiveTab("historical");
                setCalendarSystem("julian");
              }}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "historical"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Historical Julian System Solver
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. INPUT CARD & PARAMETER SELECTORS */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* TAB 1 & 3: SINGLE DATE SELECTOR */}
          {activeTab !== "batch" && (
            <div className="space-y-3">
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Select Target Date
                  </span>

                  {/* Preset Buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={handleSetToToday}
                      className="text-xs px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800 cursor-pointer"
                    >
                      Today
                    </button>
                    <button
                      onClick={handleSetToYesterday}
                      className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 cursor-pointer"
                    >
                      Yesterday
                    </button>
                    <button
                      onClick={handleSetApollo11}
                      className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 cursor-pointer"
                    >
                      Apollo 11 (1969)
                    </button>
                    <button
                      onClick={handleSetDeclaration}
                      className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 cursor-pointer"
                    >
                      US Independence (1776)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Month</label>
                    <select
                      value={targetMonth}
                      onChange={(e) => setTargetMonth(parseInt(e.target.value, 10))}
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
                      value={targetDay}
                      onChange={(e) => setTargetDay(parseInt(e.target.value, 10) || 1)}
                      className={input3DStyle}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Year (Year 1 to 9999)</label>
                    <input
                      type="number"
                      min="1"
                      max="9999"
                      value={targetYear}
                      onChange={(e) => setTargetYear(parseInt(e.target.value, 10) || 2026)}
                      className={input3DStyle}
                    />
                  </div>
                </div>

                {/* Validation Error Alert */}
                {!singleResult.isValid && (
                  <div role="alert" className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Invalid Calendar Date</div>
                      <div>{singleResult.errorMessage}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: BATCH PARSER */}
          {activeTab === "batch" && (
            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white block">
                  Batch Date Input (One per line, format: YYYY-MM-DD)
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportBatchCsv}
                  className="h-7 text-xs border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer"
                >
                  <Download className="w-3 h-3 mr-1 text-emerald-600" /> Export CSV
                </Button>
              </div>
              <textarea
                rows={5}
                value={batchText}
                onChange={(e) => setBatchText(e.target.value)}
                placeholder="2026-08-18&#10;1969-07-20&#10;1776-07-04&#10;2026-02-30"
                className="w-full p-2.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-inner"
              />
            </div>
          )}

          {/* Settings Options */}
          <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:underline cursor-pointer"
              >
                {showSettings ? "Hide Settings" : "Calculation Settings (Calendar System, Week Start)"}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSettings ? "rotate-180" : ""}`} />
              </button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-7 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 mr-1" /> Reset Defaults
              </Button>
            </div>

            {showSettings && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Calendar Engine:
                  </label>
                  <select
                    value={calendarSystem}
                    onChange={(e) => setCalendarSystem(e.target.value as any)}
                    className={input3DStyle}
                  >
                    <option value="gregorian">Gregorian Calendar (Modern Standard)</option>
                    <option value="julian">Proleptic Julian Calendar (Historical / Astronomical)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    First Day of the Week:
                  </label>
                  <select
                    value={firstDaySunday ? "sunday" : "monday"}
                    onChange={(e) => setFirstDaySunday(e.target.value === "sunday")}
                    className={input3DStyle}
                  >
                    <option value="sunday">Sunday (US / Traditional)</option>
                    <option value="monday">Monday (ISO 8601 International Standard)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Educational Julian Banner */}
          {calendarSystem === "julian" && (
            <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/30 text-xs text-amber-900 dark:text-amber-300 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Proleptic Julian Calendar Active
              </div>
              <p>
                The proleptic Julian calendar applies Julian calendar leap rules mathematically to any selected date.
                In 2026, the Julian calendar is 13 days behind the modern civil Gregorian calendar.
                September 15 Julian corresponds to September 28 Gregorian. The month calendar grid and result card below are fully synchronized under this Julian system.
              </p>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. DYNAMIC OUTPUT CARD & PRIMARY RESULTS */}
          {/* ========================================================================= */}
          {activeTab !== "batch" ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50/40 to-blue-50/20 dark:from-slate-800/80 dark:via-slate-800/40 dark:to-slate-800/80 border border-blue-200 dark:border-blue-900/60 shadow-inner space-y-4">
              
              {/* Primary Day Highlight */}
              <div className="text-center space-y-2">
                <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                  {singleResult.isValid ? "Calculated Day of the Week" : "Validation Error"}
                </span>

                <div className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${singleResult.isValid ? "text-slate-900 dark:text-white" : "text-rose-600 dark:text-rose-400"}`}>
                  {singleResult.isValid ? singleResult.dayName : "Invalid Date"}
                </div>

                <p className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
                  {singleResult.isValid ? singleResult.formattedDate : singleResult.errorMessage}
                </p>

                {/* Sub-Badges */}
                {singleResult.isValid && (
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <Badge variant="secondary" className="text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                      Day {singleResult.dayOfYear} of {singleResult.totalDaysInYear}
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                      ISO Week {singleResult.isoWeekNumber}
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                      {singleResult.daysRemainingInYear} Days Left in Year
                    </Badge>
                    {singleResult.isLeapYear && (
                      <Badge variant="secondary" className="text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                        Leap Year (366 Days)
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs font-semibold border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                      {calendarSystem === "julian" ? "Proleptic Julian" : "Gregorian"}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Calendar Grid & Etymology Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-blue-200/60 dark:border-blue-900/40 items-start">
                
                {/* Active Interactive Calendar Grid */}
                <div>
                  <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Month Calendar View ({calendarSystem === "julian" ? "Proleptic Julian" : "Gregorian"})
                  </h3>
                  {renderCalendarMatrix()}
                </div>

                {/* Day Etymology & Trivia */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {singleResult.dayName} Trivia &amp; Etymology
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                    <div>• <strong>Celestial Body:</strong> {singleResult.etymology.celestialBody}</div>
                    <div>• <strong>Roman / Norse Deity:</strong> {singleResult.etymology.romanDeity} / {singleResult.etymology.norseDeity}</div>
                    <div>• <strong>Sanskrit:</strong> {singleResult.etymology.sanskritName} ({singleResult.etymology.sanskritMeaning})</div>
                    <div>• <strong>Japanese:</strong> {singleResult.etymology.japaneseName} ({singleResult.etymology.japaneseMeaning})</div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-slate-500 dark:text-slate-400">
                    {singleResult.etymology.keyTrivia.slice(0, 2).map((t, idx) => (
                      <p key={idx}>• {t}</p>
                    ))}
                  </div>
                </div>

              </div>

              {/* Zeller's Congruence Steps Drawer */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                    Zeller&apos;s Congruence Step-by-Step Mathematical Derivation
                  </span>
                  <button
                    onClick={() => setShowZellerSteps(!showZellerSteps)}
                    className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                  >
                    {showZellerSteps ? "Hide Steps" : "Show Steps"}
                  </button>
                </div>

                {showZellerSteps && (
                  <div className="font-mono text-[11px] p-2 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 space-y-1">
                    <div>Formula: {singleResult.zellerSteps.formula}</div>
                    <div>Inputs: q = {singleResult.zellerSteps.q}, m = {singleResult.zellerSteps.m}, K = {singleResult.zellerSteps.K}, J = {singleResult.zellerSteps.J}</div>
                    <div>Computed h = {singleResult.zellerSteps.h} → <strong>{singleResult.dayName}</strong> ({calendarSystem === "julian" ? "Proleptic Julian" : "Gregorian"})</div>
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* BATCH TABLE RESULT */
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Batch Parsed Dates ({batchResults.length})
              </span>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                      <th className="py-2 px-2">Date Input</th>
                      <th className="py-2 px-2">Day of the Week</th>
                      <th className="py-2 px-2">Day of Year</th>
                      <th className="py-2 px-2">ISO Week</th>
                      <th className="py-2 px-2">Leap Year</th>
                      <th className="py-2 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {batchResults.map((r, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                        <td className="py-2 px-2 font-mono">{r.dateString}</td>
                        <td className={`py-2 px-2 font-bold ${r.isValid ? "text-blue-600 dark:text-blue-400" : "text-rose-600 dark:text-rose-400"}`}>
                          {r.dayName}
                        </td>
                        <td className="py-2 px-2">{r.isValid ? `Day ${r.dayOfYear}` : "—"}</td>
                        <td className="py-2 px-2">{r.isValid ? `Week ${r.isoWeekNumber}` : "—"}</td>
                        <td className="py-2 px-2">{r.isValid ? (r.isLeapYear ? "Yes (366d)" : "No (365d)") : "—"}</td>
                        <td className="py-2 px-2">
                          {r.isValid ? (
                            <span className="text-emerald-600 font-semibold text-[11px]">Valid</span>
                          ) : (
                            <span className="text-rose-600 font-semibold text-[11px]">{r.errorMessage || "Invalid"}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. MATCHING BLUE "SAVE CALCULATION" BUTTON & HISTORY */}
          {/* ========================================================================= */}
          <div className="pt-1">
            <Button
              onClick={handleSaveCalculation}
              disabled={!singleResult.isValid}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
              Save Date Calculation to History
            </Button>
          </div>

          {/* Saved History Table */}
          {savedRecords.length > 0 && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Saved Date Calculations ({savedRecords.length})
                </h3>
                <button
                  onClick={handleClearAllRecords}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Clear History
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                      <th className="py-2 px-2">Mode</th>
                      <th className="py-2 px-2">Date / Calendar</th>
                      <th className="py-2 px-2">Day of Week</th>
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
                            className="text-rose-500 hover:underline cursor-pointer"
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
      {/* 5. DEDICATED PRINT REPORT CONTAINER (Visible only in print media) */}
      {/* ========================================================================= */}
      <div id="day-of-week-print-report" className="hidden print:block p-8 bg-white text-black space-y-6">
        <div className="border-b-2 border-slate-900 pb-3">
          <h2 className="text-2xl font-bold text-slate-900">Day of the Week Calculator</h2>
          <p className="text-xs text-slate-600 mt-0.5" suppressHydrationWarning>
            Authoritative Date Calculation &amp; Calendar Analysis Report • Generated on{" "}
            <span suppressHydrationWarning>
              {isMounted ? new Date().toLocaleDateString() : ""}
            </span>
          </p>
        </div>

        {/* Executive Summary Card */}
        <div className="p-4 rounded-lg border border-slate-300 bg-slate-50 space-y-2.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">Calculated Result</div>
          <div className="text-3xl font-extrabold text-slate-900">
            {singleResult.isValid ? singleResult.dayName : "Invalid Date"}
          </div>
          <div className="text-base font-bold text-blue-800">
            {singleResult.isValid ? singleResult.formattedDate : singleResult.errorMessage}
          </div>
          {singleResult.isValid && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-200">
              <div><span className="font-semibold">Calendar System:</span> {calendarSystem === "julian" ? "Proleptic Julian" : "Gregorian"}</div>
              <div><span className="font-semibold">Day of Year:</span> Day {singleResult.dayOfYear} of {singleResult.totalDaysInYear}</div>
              <div><span className="font-semibold">ISO 8601 Week:</span> Week {singleResult.isoWeekNumber}</div>
              <div><span className="font-semibold">Days Remaining:</span> {singleResult.daysRemainingInYear} days</div>
            </div>
          )}
        </div>

        {/* Compact Print Calendar (Preserving 7 columns) */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Month Calendar View ({MONTH_NAMES[targetMonth]} {targetYear} • {calendarSystem === "julian" ? "Proleptic Julian" : "Gregorian"})
          </div>
          <div className="border border-slate-300 rounded p-2">
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {dayHeaders.map((dh) => (
                <span key={dh} className="font-bold text-slate-700 py-0.5 border-b border-slate-200">{dh}</span>
              ))}
              {printDays.map((d, idx) => (
                <div
                  key={idx}
                  className={`h-6 flex items-center justify-center font-medium ${
                    d === singleResult.calendarGrid.selectedDay
                      ? "bg-slate-900 text-white font-bold rounded"
                      : "text-slate-800"
                  }`}
                >
                  {d || ""}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Zeller Mathematical Derivation */}
        <div className="p-3 border border-slate-300 rounded text-xs space-y-1 bg-slate-50 font-mono">
          <div className="font-bold font-sans">Zeller&apos;s Congruence Derivation:</div>
          <div>Formula: {singleResult.zellerSteps.formula}</div>
          <div>Parameters: q = {singleResult.zellerSteps.q}, m = {singleResult.zellerSteps.m}, K = {singleResult.zellerSteps.K}, J = {singleResult.zellerSteps.J}</div>
          <div>Computed h = {singleResult.zellerSteps.h} → {singleResult.dayName} ({calendarSystem === "julian" ? "Proleptic Julian" : "Gregorian"})</div>
        </div>

        {/* Historical Calendar Disclaimer */}
        {calendarSystem === "julian" && (
          <div className="p-3 border border-amber-300 bg-amber-50 rounded text-xs text-amber-900 space-y-1">
            <div className="font-bold">Proleptic Julian Calendar Notice:</div>
            <p>
              This report reflects the mathematical proleptic Julian calendar. For dates in 2026, the Julian calendar is 13 days behind the civil Gregorian calendar. Historical adoption occurred regionally across different countries between 1582 and 1923.
            </p>
          </div>
        )}

        <div className="text-[10px] text-slate-500 pt-3 border-t border-slate-200 text-center">
          CalcPlatform Educational Reference • Deterministic calendar modular arithmetic • https://calcplatform.org/calculators/day-of-the-week-calculator
        </div>
      </div>

    </div>
  );
}

export default DayOfWeekCalculator;
