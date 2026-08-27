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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  calculateDayOfWeek,
  parseBatchDates,
  isLeapYear,
  getDaysInMonth,
  DayOfWeekParams,
  DayOfWeekResult,
  BatchDateResultItem,
  DAY_ETYMOLOGY_DATABASE,
} from "@/lib/calculator-engine/formulas/day-of-week";

interface SavedDayRecord {
  id: string;
  tab: string;
  summary: string;
  primaryResult: string;
  dayOfYear: number;
  timestamp: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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

  // Sync with URL query parameters on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "batch" || tabParam === "historical" || tabParam === "single") {
        setActiveTab(tabParam);
      }

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

  // Preset Handlers
  const handleSetToToday = () => {
    const now = new Date();
    setTargetMonth(now.getMonth());
    setTargetDay(now.getDate());
    setTargetYear(now.getFullYear());
  };

  const handleSetToYesterday = () => {
    const yest = new Date();
    yest.setDate(yest.getDate() - 1);
    setTargetMonth(yest.getMonth());
    setTargetDay(yest.getDate());
    setTargetYear(yest.getFullYear());
  };

  const handleSetApollo11 = () => {
    setTargetMonth(6); // July
    setTargetDay(20);
    setTargetYear(1969);
  };

  const handleSetDeclaration = () => {
    setTargetMonth(6); // July
    setTargetDay(4);
    setTargetYear(1776);
  };

  const handleReset = () => {
    const now = new Date();
    setTargetMonth(now.getMonth());
    setTargetDay(now.getDate());
    setTargetYear(now.getFullYear());
    setCalendarSystem("gregorian");
    setFirstDaySunday(true);
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
    return parseBatchDates(batchText);
  }, [batchText]);

  // Save calculation to LocalStorage
  const handleSaveCalculation = () => {
    const summary = `${singleResult.formattedDate} (${calendarSystem === "julian" ? "Julian" : "Gregorian"})`;
    const primaryResult = `${singleResult.dayName} (Day ${singleResult.dayOfYear} of ${singleResult.totalDaysInYear})`;

    const newRecord: SavedDayRecord = {
      id: Date.now().toString(),
      tab: activeTab === "batch" ? "Batch Parser" : activeTab === "historical" ? "Julian Calendar" : "Day Finder",
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
      summary = `Batch Date Results:\n` + batchResults.map((r) => `• ${r.dateString}: ${r.dayName} (Day ${r.dayOfYear})`).join("\n") + `\nGenerated by CalcPlatform Day of Week Calculator`;
    } else {
      summary = `Day of the Week Calculation:
• Target Date: ${singleResult.formattedDate}
• Day of the Week: ${singleResult.dayName}
• Day of Year: Day ${singleResult.dayOfYear} of ${singleResult.totalDaysInYear} (${singleResult.daysRemainingInYear} days remaining)
• ISO 8601 Week Number: Week ${singleResult.isoWeekNumber}
• Calendar System: ${calendarSystem === "julian" ? "Julian Calendar" : "Gregorian Calendar"}
• Celestial Deity: ${singleResult.etymology.celestialBody}
• Japanese: ${singleResult.etymology.japaneseName} | Sanskrit: ${singleResult.etymology.sanskritName}
Generated by CalcPlatform Day of Week Calculator`;
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
            return (
              <div
                key={`day-${d}`}
                onClick={() => setTargetDay(d)}
                className={`h-6 sm:h-7 flex items-center justify-center rounded text-xs font-semibold cursor-pointer transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/40"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

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
                Day of the Week Calculator & Calendar History
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Zeller&apos;s congruence algorithm • ISO 8601 week solver • Planetary etymology & trivia
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
              onClick={() => setActiveTab("single")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "single"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Day Finder (Single Date)
            </button>
            <button
              onClick={() => setActiveTab("batch")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
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
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
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
                      className="text-xs px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800"
                    >
                      Today
                    </button>
                    <button
                      onClick={handleSetToYesterday}
                      className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200"
                    >
                      Yesterday
                    </button>
                    <button
                      onClick={handleSetApollo11}
                      className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200"
                    >
                      Apollo 11 (1969)
                    </button>
                    <button
                      onClick={handleSetDeclaration}
                      className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200"
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
              </div>
            </div>
          )}

          {/* TAB 2: BATCH PARSER */}
          {activeTab === "batch" && (
            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                Batch Date Input (One per line)
              </span>
              <textarea
                rows={5}
                value={batchText}
                onChange={(e) => setBatchText(e.target.value)}
                placeholder="2026-08-18&#10;1969-07-20&#10;1776-07-04"
                className="w-full p-2.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-inner"
              />
            </div>
          )}

          {/* Settings Options */}
          <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:underline"
              >
                {showSettings ? "Hide Settings" : "Calculation Settings (Calendar System, Week Start)"}
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
                    Calendar Engine:
                  </label>
                  <select
                    value={calendarSystem}
                    onChange={(e) => setCalendarSystem(e.target.value as any)}
                    className={input3DStyle}
                  >
                    <option value="gregorian">Gregorian Calendar (Modern Standard)</option>
                    <option value="julian">Julian Calendar (Historic Pre-1582)</option>
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

          {/* ========================================================================= */}
          {/* 3. DYNAMIC OUTPUT CARD & PRIMARY RESULTS */}
          {/* ========================================================================= */}
          {activeTab !== "batch" ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50/40 to-blue-50/20 dark:from-slate-800/80 dark:via-slate-800/40 dark:to-slate-800/80 border border-blue-200 dark:border-blue-900/60 shadow-inner space-y-4">
              
              {/* Primary Day Highlight */}
              <div className="text-center space-y-2">
                <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                  Calculated Day of the Week
                </span>

                <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {singleResult.dayName}
                </div>

                <p className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
                  {singleResult.formattedDate}
                </p>

                {/* Sub-Badges */}
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
                </div>
              </div>

              {/* Calendar Grid & Etymology Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-blue-200/60 dark:border-blue-900/40 items-start">
                
                {/* Active Interactive Calendar Grid */}
                <div>
                  <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Month Calendar View
                  </h3>
                  {renderCalendarMatrix()}
                </div>

                {/* Day Etymology & Trivia */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {singleResult.dayName} Trivia & Etymology
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
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    {showZellerSteps ? "Hide Steps" : "Show Steps"}
                  </button>
                </div>

                {showZellerSteps && (
                  <div className="font-mono text-[11px] p-2 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 space-y-1">
                    <div>Formula: {singleResult.zellerSteps.formula}</div>
                    <div>Inputs: q = {singleResult.zellerSteps.q}, m = {singleResult.zellerSteps.m}, K = {singleResult.zellerSteps.K}, J = {singleResult.zellerSteps.J}</div>
                    <div>Computed h = {singleResult.zellerSteps.h} → <strong>{singleResult.dayName}</strong></div>
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
                      <th className="py-2 px-2">Leap Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {batchResults.map((r, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                        <td className="py-2 px-2 font-mono">{r.dateString}</td>
                        <td className="py-2 px-2 font-bold text-blue-600 dark:text-blue-400">{r.dayName}</td>
                        <td className="py-2 px-2">{r.isValid ? `Day ${r.dayOfYear}` : "—"}</td>
                        <td className="py-2 px-2">{r.isValid ? (r.isLeapYear ? "Yes (366d)" : "No (365d)") : "—"}</td>
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
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
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
      {/* 5. EDUCATIONAL KNOWLEDGE BASE */}
      {/* ========================================================================= */}
    </div>
  );
}

export default DayOfWeekCalculator;
