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
  Plus,
  Minus,
  Briefcase,
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
  calculateDateDuration,
  calculateDateOffset,
  parseDateParts,
  getDaysInMonth,
  formatDateParts,
  MONTH_NAMES,
  DAY_NAMES,
  HolidayRegion,
  DateDurationResult,
  DateOffsetResult,
} from "@/lib/calculator-engine/formulas/date-calculator";

const DEFAULT_DATE_OVERLAY = {
  locale: "en",
  title: "Date Calculator",
  description: "Calculate the number of days between two dates, add or subtract days, weeks, months, and years, and calculate working business days with leap year rules.",
  suiteTitle: "Advanced Date Calculator Suite",
  suiteSubtitle: "Exact day counter • Add/subtract dates • Business day & holiday solver",

  tabDuration: "Date Difference",
  tabOffset: "Add / Subtract Days",
  tabBusiness: "Business Days",

  startDateLabel: "Start Date",
  endDateLabel: "End Date",
  calcDurationBtn: "Calculate Difference",
  resetBtn: "Reset Defaults",
  todayBtn: "Today",
  calendarPickerLabel: "Calendar Picker:",

  yearsLabel: "Years",
  monthsLabel: "Months",
  weeksLabel: "Weeks",
  daysLabel: "Days",
  addBtn: "Add",
  subtractBtn: "Subtract",
  calcOffsetBtn: "Calculate Target Date",

  settingsToggle: "Holiday & Workweek Settings (US Federal, UK, Custom Weekends, Inclusive Count)",
  holidayCalendarLabel: "Holiday Calendar:",
  holidayHandlingLabel: "Holiday Handling:",
  holidayExcludeOption: "Exclude holidays from business days",
  holidayCountOption: "Count holidays as normal working days",
  dayCountingModeLabel: "Day Counting Mode:",
  includeEndDayLabel: "Include End Day (+1 Day)",
  exclusiveOption: "Standard (Exclusive)",
  weekendDaysLabel: "Non-Working Weekend Days:",
  dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  monthNames: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],

  resultsTitle: "Calculated Date Span",
  calcTargetDateHeader: "Calculated Target Date",
  calcDurationHeader: "Calculated Duration Between Dates",
  allUnitsTitle: "All-Units Conversion Matrix",
  totalDaysLabel: "Total Calendar Days",
  dayOfWeekLabel: "Day of the Week",
  weekendDaysSkippedLabel: "Weekend Days Skipped",
  holidaysSkippedLabel: "Holidays Skipped",
  totalWeeksDaysLabel: "Total Weeks & Days",
  workingDaysLabel: "Working Business Days",
  totalHoursLabel: "Total Hours",
  totalMinutesLabel: "Total Minutes",
  totalSecondsLabel: "Total Seconds",
  pctOfYearLabel: "% of Solar Year",

  workdayBreakdownTitle: "Workday & Calendar Breakdown",
  daysDistributionTitle: "Days Distribution",
  totalSpanLabel: "Total Span",
  exactSpanLabel: "Exact Span",
  encounteredHolidaysLabel: "Encountered Holidays:",

  copySummaryBtn: "Copy Summary",
  copiedBtn: "Copied!",
  shareBtn: "Share",
  linkCopiedBtn: "Link Copied!",
  saveToHistoryBtn: "Save Calculation to History",
  historyTitle: "Saved Calculations History",
  clearHistoryBtn: "Clear History",
  historyModeCol: "Mode",
  historyInputCol: "Dates / Offset",
  historyOutputCol: "Output",
  historyDaysCol: "Total Days",
  historyActionsCol: "Actions",
  historyLoadBtn: "Load",
  historyDeleteBtn: "Delete",

  formatYearsMonthsDays: (y: number, m: number, d: number) => {
    if (y === 0 && m === 0 && d === 0) return "0 days (Same date)";
    const parts: string[] = [];
    if (y > 0) parts.push(y === 1 ? "1 year" : `${y} years`);
    if (m > 0) parts.push(m === 1 ? "1 month" : `${m} months`);
    if (d > 0 || parts.length === 0) parts.push(d === 1 ? "1 day" : `${d} days`);
    return parts.join(", ");
  },
  formatWeeksDays: (w: number, d: number) => `${w} weeks${d > 0 ? ` and ${d} days` : ""}`,
};

interface SavedDateRecord {
  id: string;
  tab: string;
  summary: string;
  primaryResult: string;
  totalDays: number;
  timestamp: string;
}

export function DateCalculator() {
  const overlay = DEFAULT_DATE_OVERLAY;
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [activeTab, setActiveTab] = useState<"duration" | "offset" | "business">("duration");

  // Start Date Parts (Baseline 2026-08-24)
  const [startMonth, setStartMonth] = useState<number>(7); // August (0-indexed)
  const [startDay, setStartDay] = useState<number>(24);
  const [startYear, setStartYear] = useState<number>(2026);

  // End Date Parts (Baseline 2026-09-23)
  const [endMonth, setEndMonth] = useState<number>(8); // September (0-indexed)
  const [endDay, setEndDay] = useState<number>(23);
  const [endYear, setEndYear] = useState<number>(2026);

  // Offset Inputs (For Add/Subtract tab)
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [offsetYears, setOffsetYears] = useState<number>(0);
  const [offsetMonths, setOffsetMonths] = useState<number>(0);
  const [offsetWeeks, setOffsetWeeks] = useState<number>(0);
  const [offsetDays, setOffsetDays] = useState<number>(30);
  const [offsetBusinessOnly, setOffsetBusinessOnly] = useState<boolean>(false);

  // Settings & Toggles
  const [includeEndDay, setIncludeEndDay] = useState<boolean>(false);
  const [holidayRegion, setHolidayRegion] = useState<HolidayRegion>("us");
  const [countHolidays, setCountHolidays] = useState<boolean>(false); // false = exclude holidays from business days
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Custom Workweek for Business Days (0=Sun, 1=Mon, ..., 6=Sat)
  const [weekendDays, setWeekendDays] = useState<number[]>([0, 6]); // Default Saturday & Sunday

  // Feedback & History
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [savedRecords, setSavedRecords] = useState<SavedDateRecord[]>([]);

  // Construct standard YYYY-MM-DD strings
  const startDateStr = useMemo(() => {
    return formatDateParts({ year: startYear, month: startMonth, day: startDay });
  }, [startYear, startMonth, startDay]);

  const endDateStr = useMemo(() => {
    return formatDateParts({ year: endYear, month: endMonth, day: endDay });
  }, [endYear, endMonth, endDay]);

  // Sync with URL query parameters on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const startParam = params.get("start");
      const endParam = params.get("end");
      const tabParam = params.get("tab");

      if (startParam) {
        const parts = parseDateParts(startParam);
        if (parts) {
          setStartYear(parts.year);
          setStartMonth(parts.month);
          setStartDay(parts.day);
        }
      }
      if (endParam) {
        const parts = parseDateParts(endParam);
        if (parts) {
          setEndYear(parts.year);
          setEndMonth(parts.month);
          setEndDay(parts.day);
        }
      }
      if (tabParam === "offset" || tabParam === "business" || tabParam === "duration") {
        setActiveTab(tabParam);
      }

      // Load saved records from localStorage
      try {
        const stored = localStorage.getItem("calc_saved_date_records");
        if (stored) {
          setSavedRecords(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load records from localStorage", e);
      }
    }
  }, []);

  // Update days dropdown max count dynamically based on month & year
  const maxStartDays = useMemo(() => getDaysInMonth(startYear, startMonth), [startYear, startMonth]);
  const maxEndDays = useMemo(() => getDaysInMonth(endYear, endMonth), [endYear, endMonth]);

  useEffect(() => {
    if (startDay > maxStartDays) setStartDay(maxStartDays);
  }, [startDay, maxStartDays]);

  useEffect(() => {
    if (endDay > maxEndDays) setEndDay(maxEndDays);
  }, [endDay, maxEndDays]);

  // Synchronize HTML5 date picker inputs with component state
  const handleStartDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parts = parseDateParts(e.target.value);
    if (parts) {
      setStartYear(parts.year);
      setStartMonth(parts.month);
      setStartDay(parts.day);
    }
  };

  const handleEndDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parts = parseDateParts(e.target.value);
    if (parts) {
      setEndYear(parts.year);
      setEndMonth(parts.month);
      setEndDay(parts.day);
    }
  };

  const handleSetStartToToday = () => {
    const now = new Date();
    setStartYear(now.getFullYear());
    setStartMonth(now.getMonth());
    setStartDay(now.getDate());
  };

  const handleSetEndToToday = () => {
    const now = new Date();
    setEndYear(now.getFullYear());
    setEndMonth(now.getMonth());
    setEndDay(now.getDate());
  };

  const handleReset = () => {
    const now = new Date();
    setStartYear(now.getFullYear());
    setStartMonth(now.getMonth());
    setStartDay(now.getDate());

    const future = new Date();
    future.setDate(future.getDate() + 30);
    setEndYear(future.getFullYear());
    setEndMonth(future.getMonth());
    setEndDay(future.getDate());

    setOperation("add");
    setOffsetYears(0);
    setOffsetMonths(0);
    setOffsetWeeks(0);
    setOffsetDays(30);
    setOffsetBusinessOnly(false);
    setIncludeEndDay(false);
    setHolidayRegion("us");
    setCountHolidays(false);
    setWeekendDays([0, 6]);
  };

  // Toggle weekend days
  const toggleWeekendDay = (dayIndex: number) => {
    if (weekendDays.includes(dayIndex)) {
      setWeekendDays(weekendDays.filter((d) => d !== dayIndex));
    } else {
      setWeekendDays([...weekendDays, dayIndex].sort());
    }
  };

  // Real-time calculation results
  const durationResult: DateDurationResult = useMemo(() => {
    return calculateDateDuration({
      startDate: startDateStr,
      endDate: endDateStr,
      includeEndDay,
      holidayRegion,
      countHolidays,
      weekendDays,
    });
  }, [startDateStr, endDateStr, includeEndDay, holidayRegion, countHolidays, weekendDays]);

  const offsetResult: DateOffsetResult = useMemo(() => {
    return calculateDateOffset({
      startDate: startDateStr,
      operation,
      years: offsetYears,
      months: offsetMonths,
      weeks: offsetWeeks,
      days: offsetDays,
      businessDaysOnly: offsetBusinessOnly,
      holidayRegion,
      weekendDays,
    });
  }, [startDateStr, operation, offsetYears, offsetMonths, offsetWeeks, offsetDays, offsetBusinessOnly, holidayRegion, weekendDays]);

  // Localized string representations
  const localizedYearsMonthsDays = useMemo(() => {
    return overlay.formatYearsMonthsDays(durationResult.years, durationResult.months, durationResult.days);
  }, [durationResult, overlay]);

  const localizedWeeksDays = useMemo(() => {
    return overlay.formatWeeksDays(durationResult.weeks, durationResult.remDays);
  }, [durationResult, overlay]);

  const localizedStartDayName = useMemo(() => {
    return overlay.dayNames[durationResult.startDayOfWeekIndex] || durationResult.startDayOfWeek;
  }, [durationResult, overlay]);

  const localizedEndDayName = useMemo(() => {
    return overlay.dayNames[durationResult.endDayOfWeekIndex] || durationResult.endDayOfWeek;
  }, [durationResult, overlay]);

  const localizedOffsetTargetFormatted = useMemo(() => {
    const dayName = overlay.dayNames[offsetResult.targetDayOfWeekIndex] || offsetResult.targetDayOfWeek;
    const monthName = overlay.monthNames[offsetResult.targetParts.month] || MONTH_NAMES[offsetResult.targetParts.month];
    return `${dayName}, ${monthName} ${offsetResult.targetParts.day}, ${offsetResult.targetParts.year}`;
  }, [offsetResult, overlay]);

  // Save calculation to LocalStorage
  const handleSaveCalculation = () => {
    let summary = "";
    let primaryResult = "";
    let totalDays = 0;

    if (activeTab === "offset") {
      const opSign = operation === "add" ? "+" : "-";
      summary = `${startDateStr} ${opSign} (${offsetYears}y ${offsetMonths}m ${offsetWeeks}w ${offsetDays}d)`;
      primaryResult = localizedOffsetTargetFormatted;
      totalDays = offsetResult.totalCalendarDaysOffset;
    } else {
      summary = `${startDateStr} → ${endDateStr}`;
      primaryResult = `${durationResult.totalDays} ${overlay.daysLabel} (${localizedYearsMonthsDays})`;
      totalDays = durationResult.totalDays;
    }

    const newRecord: SavedDateRecord = {
      id: Date.now().toString(),
      tab: activeTab === "offset" ? overlay.tabOffset : activeTab === "business" ? overlay.tabBusiness : overlay.tabDuration,
      summary,
      primaryResult,
      totalDays,
      timestamp: new Date().toLocaleString("en-US"),
    };

    const updated = [newRecord, ...savedRecords].slice(0, 15);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_date_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  const handleDeleteRecord = (id: string) => {
    const updated = savedRecords.filter((r) => r.id !== id);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_date_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update localStorage", e);
    }
  };

  const handleClearAllRecords = () => {
    setSavedRecords([]);
    try {
      localStorage.removeItem("calc_saved_date_records");
    } catch (e) {
      console.error("Failed to clear localStorage", e);
    }
  };

  const handleRestoreRecord = (rec: SavedDateRecord) => {
    const parts = rec.summary.split(" → ");
    if (parts.length === 2) {
      const s = parseDateParts(parts[0]);
      const e = parseDateParts(parts[1]);
      if (s) {
        setStartYear(s.year);
        setStartMonth(s.month);
        setStartDay(s.day);
      }
      if (e) {
        setEndYear(e.year);
        setEndMonth(e.month);
        setEndDay(e.day);
      }
    }
  };

  // Formatted Summary Copy
  const handleCopySummary = () => {
    let summary = "";
    if (activeTab === "offset") {
      summary = `${overlay.suiteTitle}:
• ${overlay.startDateLabel}: ${startDateStr}
• ${overlay.tabOffset}: ${operation === "add" ? overlay.addBtn : overlay.subtractBtn} (${offsetYears}y ${offsetMonths}m ${offsetWeeks}w ${offsetDays}d)
• ${overlay.calcTargetDateHeader}: ${localizedOffsetTargetFormatted}
• ${overlay.totalDaysLabel}: ${offsetResult.totalCalendarDaysOffset} ${overlay.daysLabel}
Generated by CalcPlatform Date Calculator`;
    } else {
      summary = `${overlay.suiteTitle}:
• ${overlay.startDateLabel}: ${startDateStr} (${localizedStartDayName})
• ${overlay.endDateLabel}: ${endDateStr} (${localizedEndDayName})
• ${overlay.exactSpanLabel}: ${localizedYearsMonthsDays}
• ${overlay.totalDaysLabel}: ${durationResult.totalDays.toLocaleString()} ${overlay.daysLabel}
• ${overlay.totalWeeksDaysLabel}: ${localizedWeeksDays}
• ${overlay.workingDaysLabel}: ${durationResult.businessDays.toLocaleString()} ${overlay.daysLabel}
• ${overlay.weekendDaysSkippedLabel}: ${durationResult.weekendDaysCount.toLocaleString()} ${overlay.daysLabel}
• ${overlay.holidaysSkippedLabel}: ${durationResult.holidaysCount}
Generated by CalcPlatform Date Calculator`;
    }

    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  // Share URL Generator
  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}?start=${startDateStr}&end=${endDateStr}&tab=${activeTab}`;
      navigator.clipboard.writeText(url);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  // Recharts Data for Working Days vs Weekends vs Holidays Donut Chart
  const chartData = useMemo(() => {
    if (activeTab === "offset") {
      return [
        { name: overlay.totalDaysLabel, value: Math.max(1, offsetResult.totalCalendarDaysOffset), color: "#2563EB" },
      ];
    }
    return [
      { name: overlay.workingDaysLabel, value: Math.max(0, durationResult.businessDays), color: "#2563EB" },
      { name: overlay.weekendDaysLabel, value: Math.max(0, durationResult.weekendDaysCount), color: "#94A3B8" },
      { name: overlay.holidaysSkippedLabel, value: Math.max(0, durationResult.holidaysCount), color: "#F59E0B" },
    ].filter((d) => d.value > 0);
  }, [activeTab, durationResult, offsetResult, overlay]);

  // Pure White 3D tactile input styling
  const input3DStyle = "w-full h-10 px-3 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold text-slate-900 dark:text-slate-100 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.06),0_1.5px_0_0_#e2e8f0] dark:shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.3),0_1.5px_0_0_#334155] focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_0_0_2px_#2563eb] focus:border-blue-600 outline-none transition-all cursor-pointer";

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
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {overlay.suiteTitle}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {overlay.suiteSubtitle}
              </p>
            </div>

            {/* Top Quick Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopySummary}
                className="h-8 text-xs border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs cursor-pointer"
              >
                {copySuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" /> {overlay.copiedBtn}
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" /> {overlay.copySummaryBtn}
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
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-blue-600" /> {overlay.linkCopiedBtn}
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 mr-1" /> {overlay.shareBtn}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Context Mode Tabs */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setActiveTab("duration")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "duration"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              {overlay.tabDuration}
            </button>
            <button
              onClick={() => setActiveTab("offset")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "offset"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              {overlay.tabOffset}
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "business"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              {overlay.tabBusiness}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. INPUT CARD & PARAMETER SELECTORS */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* TAB 1 & TAB 3: DAYS BETWEEN DATES / BUSINESS DAYS */}
          {activeTab !== "offset" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              {/* Start Date Box */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">
                    {overlay.startDateLabel}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSetStartToToday}
                      className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                    >
                      {overlay.todayBtn}
                    </button>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                      {startDateStr}
                    </span>
                  </div>
                </div>

                {/* Pure White 3D Dropdown Selectors */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{overlay.monthsLabel}</label>
                    <select
                      value={startMonth}
                      onChange={(e) => setStartMonth(parseInt(e.target.value, 10))}
                      className={input3DStyle}
                    >
                      {(overlay.monthNames || MONTH_NAMES).map((m, idx) => (
                        <option key={idx} value={idx}>
                          {m.substring(0, 3)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{overlay.daysLabel}</label>
                    <select
                      value={startDay}
                      onChange={(e) => setStartDay(parseInt(e.target.value, 10))}
                      className={input3DStyle}
                    >
                      {Array.from({ length: maxStartDays }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{overlay.yearsLabel}</label>
                    <input
                      type="number"
                      min="1800"
                      max="2200"
                      value={startYear}
                      onChange={(e) => setStartYear(parseInt(e.target.value, 10) || 2026)}
                      className={input3DStyle}
                    />
                  </div>
                </div>

                {/* Inline Calendar Sync */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-medium">{overlay.calendarPickerLabel}</span>
                  <input
                    type="date"
                    value={startDateStr}
                    onChange={handleStartDatePickerChange}
                    className="px-2.5 py-1 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),0_1.5px_0_0_#e2e8f0] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] cursor-pointer font-medium"
                  />
                </div>
              </div>

              {/* End Date Box */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">
                    {overlay.endDateLabel}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSetEndToToday}
                      className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                    >
                      {overlay.todayBtn}
                    </button>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                      {endDateStr}
                    </span>
                  </div>
                </div>

                {/* Pure White 3D Dropdown Selectors */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{overlay.monthsLabel}</label>
                    <select
                      value={endMonth}
                      onChange={(e) => setEndMonth(parseInt(e.target.value, 10))}
                      className={input3DStyle}
                    >
                      {(overlay.monthNames || MONTH_NAMES).map((m, idx) => (
                        <option key={idx} value={idx}>
                          {m.substring(0, 3)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{overlay.daysLabel}</label>
                    <select
                      value={endDay}
                      onChange={(e) => setEndDay(parseInt(e.target.value, 10))}
                      className={input3DStyle}
                    >
                      {Array.from({ length: maxEndDays }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{overlay.yearsLabel}</label>
                    <input
                      type="number"
                      min="1800"
                      max="2200"
                      value={endYear}
                      onChange={(e) => setEndYear(parseInt(e.target.value, 10) || 2026)}
                      className={input3DStyle}
                    />
                  </div>
                </div>

                {/* Inline Calendar Sync */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-medium">{overlay.calendarPickerLabel}</span>
                  <input
                    type="date"
                    value={endDateStr}
                    onChange={handleEndDatePickerChange}
                    className="px-2.5 py-1 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),0_1.5px_0_0_#e2e8f0] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] cursor-pointer font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ADD TO OR SUBTRACT FROM A DATE */}
          {activeTab === "offset" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              {/* Start Date Box */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">
                    {overlay.startDateLabel}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSetStartToToday}
                      className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                    >
                      {overlay.todayBtn}
                    </button>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                      {startDateStr}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{overlay.monthsLabel}</label>
                    <select
                      value={startMonth}
                      onChange={(e) => setStartMonth(parseInt(e.target.value, 10))}
                      className={input3DStyle}
                    >
                      {(overlay.monthNames || MONTH_NAMES).map((m, idx) => (
                        <option key={idx} value={idx}>
                          {m.substring(0, 3)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{overlay.daysLabel}</label>
                    <select
                      value={startDay}
                      onChange={(e) => setStartDay(parseInt(e.target.value, 10))}
                      className={input3DStyle}
                    >
                      {Array.from({ length: maxStartDays }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{overlay.yearsLabel}</label>
                    <input
                      type="number"
                      min="1800"
                      max="2200"
                      value={startYear}
                      onChange={(e) => setStartYear(parseInt(e.target.value, 10) || 2026)}
                      className={input3DStyle}
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-medium">{overlay.calendarPickerLabel}</span>
                  <input
                    type="date"
                    value={startDateStr}
                    onChange={handleStartDatePickerChange}
                    className="px-2.5 py-1 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),0_1.5px_0_0_#e2e8f0] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] cursor-pointer font-medium"
                  />
                </div>
              </div>

              {/* Offset Operations Card */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 dark:text-white">
                    {overlay.tabOffset}
                  </label>
                  
                  {/* Plus / Minus Selector Button Group */}
                  <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800">
                    <button
                      onClick={() => setOperation("add")}
                      className={`px-3 py-1 text-xs font-bold rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                        operation === "add"
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-700 dark:text-slate-300 hover:text-slate-900"
                      }`}
                    >
                      <Plus className="w-3 h-3" /> {overlay.addBtn}
                    </button>
                    <button
                      onClick={() => setOperation("subtract")}
                      className={`px-3 py-1 text-xs font-bold rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                        operation === "subtract"
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-700 dark:text-slate-300 hover:text-slate-900"
                      }`}
                    >
                      <Minus className="w-3 h-3" /> {overlay.subtractBtn}
                    </button>
                  </div>
                </div>

                {/* 4 Offset Inputs: Years, Months, Weeks, Days */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{overlay.yearsLabel}</label>
                    <input
                      type="number"
                      min="0"
                      max="500"
                      value={offsetYears}
                      onChange={(e) => setOffsetYears(Math.max(0, parseInt(e.target.value, 10) || 0))}
                      className={input3DStyle}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{overlay.monthsLabel}</label>
                    <input
                      type="number"
                      min="0"
                      max="1200"
                      value={offsetMonths}
                      onChange={(e) => setOffsetMonths(Math.max(0, parseInt(e.target.value, 10) || 0))}
                      className={input3DStyle}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{overlay.weeksLabel}</label>
                    <input
                      type="number"
                      min="0"
                      max="5000"
                      value={offsetWeeks}
                      onChange={(e) => setOffsetWeeks(Math.max(0, parseInt(e.target.value, 10) || 0))}
                      className={input3DStyle}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">{overlay.daysLabel}</label>
                    <input
                      type="number"
                      min="0"
                      max="50000"
                      value={offsetDays}
                      onChange={(e) => setOffsetDays(Math.max(0, parseInt(e.target.value, 10) || 0))}
                      className={input3DStyle}
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={offsetBusinessOnly}
                      onChange={(e) => setOffsetBusinessOnly(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                    <span>
                      Calculate in <strong>Business Days</strong> (skipping weekends &amp; holidays)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. SETTINGS CONTROLS (HOLIDAYS, INCLUSIVE COUNT, WORKWEEK) */}
          {/* ========================================================================= */}
          <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:underline cursor-pointer"
              >
                {showSettings ? "Hide Calendar Settings" : overlay.settingsToggle}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSettings ? "rotate-180" : ""}`} />
              </button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-7 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 mr-1" /> {overlay.resetBtn}
              </Button>
            </div>

            {showSettings && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                
                {/* Holiday Region Select */}
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    {overlay.holidayCalendarLabel}
                  </label>
                  <select
                    value={holidayRegion}
                    onChange={(e) => setHolidayRegion(e.target.value as HolidayRegion)}
                    className={input3DStyle}
                  >
                    <option value="us">United States (Federal Holidays)</option>
                    <option value="uk">United Kingdom (Bank Holidays)</option>
                    <option value="canada">Canada (Statutory Holidays)</option>
                    <option value="australia">Australia (National Holidays)</option>
                    <option value="india">India (Gazetted Holidays)</option>
                    <option value="none">None (No holidays excluded)</option>
                  </select>
                </div>

                {/* Holiday Counting Behavior */}
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    {overlay.holidayHandlingLabel}
                  </label>
                  <select
                    value={countHolidays ? "count" : "exclude"}
                    onChange={(e) => setCountHolidays(e.target.value === "count")}
                    className={input3DStyle}
                  >
                    <option value="exclude">{overlay.holidayExcludeOption}</option>
                    <option value="count">{overlay.holidayCountOption}</option>
                  </select>
                </div>

                {/* Inclusive Count Toggle */}
                {activeTab !== "offset" && (
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      {overlay.dayCountingModeLabel}
                    </label>
                    <button
                      onClick={() => setIncludeEndDay(!includeEndDay)}
                      className={`w-full h-10 px-3 rounded-lg border text-left font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        includeEndDay
                          ? "bg-white dark:bg-slate-900 border-blue-600 text-blue-600 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.06),0_1.5px_0_0_#2563eb]"
                          : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.06),0_1.5px_0_0_#e2e8f0] dark:shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.3),0_1.5px_0_0_#334155]"
                      }`}
                    >
                      <span>{includeEndDay ? overlay.includeEndDayLabel : overlay.exclusiveOption}</span>
                      <span className={`w-3.5 h-3.5 rounded-full ${includeEndDay ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"}`} />
                    </button>
                  </div>
                )}

                {/* Custom Weekend Days Checkbox Selector */}
                <div className="sm:col-span-2 lg:col-span-3 pt-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    {overlay.weekendDaysLabel}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: overlay.dayNames[0] || "Sunday", day: 0 },
                      { label: overlay.dayNames[1] || "Monday", day: 1 },
                      { label: overlay.dayNames[2] || "Tuesday", day: 2 },
                      { label: overlay.dayNames[3] || "Wednesday", day: 3 },
                      { label: overlay.dayNames[4] || "Thursday", day: 4 },
                      { label: overlay.dayNames[5] || "Friday", day: 5 },
                      { label: overlay.dayNames[6] || "Saturday", day: 6 },
                    ].map((item) => {
                      const isSelected = weekendDays.includes(item.day);
                      return (
                        <button
                          key={item.day}
                          onClick={() => toggleWeekendDay(item.day)}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900"
                              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 4. DYNAMIC OUTPUT CARD & PRIMARY RESULTS */}
          {/* ========================================================================= */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50/40 to-blue-50/20 dark:from-slate-800/80 dark:via-slate-800/40 dark:to-slate-800/80 border border-blue-200 dark:border-blue-900/60 shadow-inner space-y-4">
            
            {/* Primary Bold Highlight Result */}
            <div className="text-center space-y-1.5">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                {activeTab === "offset" ? overlay.calcTargetDateHeader : overlay.calcDurationHeader}
              </span>

              {activeTab === "offset" ? (
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {localizedOffsetTargetFormatted}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {operation === "add" ? overlay.addBtn : overlay.subtractBtn} {offsetYears > 0 ? `${offsetYears}y ` : ""}{offsetMonths > 0 ? `${offsetMonths}m ` : ""}{offsetWeeks > 0 ? `${offsetWeeks}w ` : ""}{offsetDays}d {offsetBusinessOnly ? `(${overlay.workingDaysLabel})` : `(${overlay.totalDaysLabel})`}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {durationResult.totalDays.toLocaleString()} {overlay.daysLabel}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {localizedYearsMonthsDays}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    From <strong>{startDateStr}</strong> ({localizedStartDayName}) to <strong>{endDateStr}</strong> ({localizedEndDayName})
                  </p>
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* 5. ALL-UNITS CONVERSION MATRIX */}
            {/* ========================================================================= */}
            <div className="space-y-2.5 pt-3 border-t border-blue-200/60 dark:border-blue-900/40">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {overlay.allUnitsTitle}
              </h3>
              
              {activeTab === "offset" ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{overlay.totalDaysLabel}</span>
                    <span className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
                      {offsetResult.totalCalendarDaysOffset.toLocaleString()} {overlay.daysLabel}
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{overlay.dayOfWeekLabel}</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {overlay.dayNames[offsetResult.targetDayOfWeekIndex] || offsetResult.targetDayOfWeek}
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{overlay.weekendDaysSkippedLabel}</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {offsetResult.weekendDaysSkipped.toLocaleString()} {overlay.daysLabel}
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{overlay.holidaysSkippedLabel}</span>
                    <span className="text-sm sm:text-base font-bold text-amber-600 dark:text-amber-400">
                      {offsetResult.holidaysSkipped}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{overlay.totalWeeksDaysLabel}</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {localizedWeeksDays}
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{overlay.workingDaysLabel}</span>
                    <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400">
                      {durationResult.businessDays.toLocaleString()} {overlay.daysLabel}
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{overlay.weekendDaysLabel}</span>
                    <span className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
                      {durationResult.weekendDaysCount.toLocaleString()} {overlay.daysLabel}
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{overlay.holidaysSkippedLabel}</span>
                    <span className="text-sm sm:text-base font-bold text-amber-600 dark:text-amber-400">
                      {durationResult.holidaysCount}
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{overlay.totalHoursLabel}</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {durationResult.totalHours.toLocaleString()} hrs
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{overlay.totalMinutesLabel}</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {durationResult.totalMinutes.toLocaleString()} min
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{overlay.totalSecondsLabel}</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {durationResult.totalSeconds.toLocaleString()} s
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{overlay.pctOfYearLabel}</span>
                    <span className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400">
                      {durationResult.percentageOfYear}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 6. INTERACTIVE VISUALIZATION / WORKDAY BREAKDOWN DONUT */}
          {/* ========================================================================= */}
          {activeTab !== "offset" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Working vs Non-Working Days Summary */}
              <div className="lg:col-span-8 p-4 sm:p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    {overlay.workdayBreakdownTitle}
                  </h3>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {durationResult.totalDays > 0 ? Math.round((durationResult.businessDays / durationResult.totalDays) * 100) : 0}% Workdays
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700 shadow-inner flex">
                  <div
                    className="bg-blue-600 h-full rounded-l-full transition-all duration-500"
                    style={{ width: `${durationResult.totalDays > 0 ? (durationResult.businessDays / durationResult.totalDays) * 100 : 0}%` }}
                    title={overlay.workingDaysLabel}
                  />
                  <div
                    className="bg-slate-400 h-full transition-all duration-500"
                    style={{ width: `${durationResult.totalDays > 0 ? (durationResult.weekendDaysCount / durationResult.totalDays) * 100 : 0}%` }}
                    title={overlay.weekendDaysLabel}
                  />
                  <div
                    className="bg-amber-500 h-full rounded-r-full transition-all duration-500"
                    style={{ width: `${durationResult.totalDays > 0 ? (durationResult.holidaysCount / durationResult.totalDays) * 100 : 0}%` }}
                    title={overlay.holidaysSkippedLabel}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-blue-600 dark:text-blue-400 font-bold block text-sm sm:text-base">
                      {durationResult.businessDays.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{overlay.workingDaysLabel}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-700 dark:text-slate-300 font-bold block text-sm sm:text-base">
                      {durationResult.weekendDaysCount.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{overlay.weekendDaysLabel}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <span className="text-amber-600 dark:text-amber-400 font-bold block text-sm sm:text-base">
                      {durationResult.holidaysCount}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{overlay.holidaysSkippedLabel}</span>
                  </div>
                </div>

                {durationResult.holidaysEncountered.length > 0 && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{overlay.encounteredHolidaysLabel} </span>
                    {durationResult.holidaysEncountered.map((h, i) => (
                      <span key={i} className="inline-block mr-2">
                        • {h.name} ({h.dateStr})
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Donut Chart */}
              <div className="lg:col-span-4 p-4 sm:p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  {overlay.daysDistributionTitle}
                </h4>
                <div className="relative w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={chartData}
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
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                      {durationResult.totalDays}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-slate-400">{overlay.daysLabel}</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                  {overlay.totalSpanLabel}
                </span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 7. MATCHING BLUE "SAVE CALCULATION" BUTTON & HISTORY */}
          {/* ========================================================================= */}
          <div className="pt-1">
            <Button
              onClick={handleSaveCalculation}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
              {overlay.saveToHistoryBtn}
            </Button>
          </div>

          {/* Saved History Table */}
          {savedRecords.length > 0 && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {overlay.historyTitle} ({savedRecords.length})
                </h3>
                <button
                  onClick={handleClearAllRecords}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> {overlay.clearHistoryBtn}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                      <th className="py-2 px-2">{overlay.historyModeCol}</th>
                      <th className="py-2 px-2">{overlay.historyInputCol}</th>
                      <th className="py-2 px-2">{overlay.historyOutputCol}</th>
                      <th className="py-2 px-2">{overlay.historyDaysCol}</th>
                      <th className="py-2 px-2 text-right">{overlay.historyActionsCol}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {savedRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <td className="py-2.5 px-2 font-medium text-slate-900 dark:text-white">{rec.tab}</td>
                        <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 font-mono">{rec.summary}</td>
                        <td className="py-2.5 px-2 font-bold text-blue-600 dark:text-blue-400">{rec.primaryResult}</td>
                        <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300">{rec.totalDays.toLocaleString()}</td>
                        <td className="py-2.5 px-2 text-right space-x-2">
                          <button
                            onClick={() => handleRestoreRecord(rec)}
                            className="text-blue-600 hover:underline font-semibold cursor-pointer"
                          >
                            {overlay.historyLoadBtn}
                          </button>
                          <button
                            onClick={() => handleDeleteRecord(rec.id)}
                            className="text-rose-500 hover:underline cursor-pointer"
                          >
                            {overlay.historyDeleteBtn}
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

export default DateCalculator;
