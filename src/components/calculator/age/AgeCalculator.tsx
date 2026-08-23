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
  calculateDetailedAge,
  parseDateParts,
  getDaysInMonth,
  LeapYearRule,
  MonthEndRule,
  CulturalSystem,
  DetailedAgeResult,
} from "@/lib/calculator-engine/formulas/age";

interface SavedAgeRecord {
  id: string;
  birthDate: string;
  targetDate: string;
  primaryResult: string;
  totalDays: number;
  mode: string;
  timestamp: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function AgeCalculator() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [activeTab, setActiveTab] = useState<"age" | "interval" | "milestones">("age");

  // Date of Birth / Start Date Parts
  const [birthMonth, setBirthMonth] = useState<number>(0); // 0-11
  const [birthDay, setBirthDay] = useState<number>(1);
  const [birthYear, setBirthYear] = useState<number>(2000);

  // Target Date / End Date Parts
  const today = new Date();
  const [targetMonth, setTargetMonth] = useState<number>(today.getMonth());
  const [targetDay, setTargetDay] = useState<number>(today.getDate());
  const [targetYear, setTargetYear] = useState<number>(today.getFullYear());

  // Calculation Settings & Logic Toggles
  const [leapYearRule, setLeapYearRule] = useState<LeapYearRule>("feb28");
  const [monthEndRule, setMonthEndRule] = useState<MonthEndRule>("sequential");
  const [includeEndDay, setIncludeEndDay] = useState<boolean>(false);
  const [culturalSystem, setCulturalSystem] = useState<CulturalSystem>("western");
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);

  // UI Feedback
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [savedRecords, setSavedRecords] = useState<SavedAgeRecord[]>([]);

  // Construct standard YYYY-MM-DD strings
  const birthDateStr = useMemo(() => {
    const m = String(birthMonth + 1).padStart(2, "0");
    const d = String(birthDay).padStart(2, "0");
    return `${birthYear}-${m}-${d}`;
  }, [birthYear, birthMonth, birthDay]);

  const targetDateStr = useMemo(() => {
    const m = String(targetMonth + 1).padStart(2, "0");
    const d = String(targetDay).padStart(2, "0");
    return `${targetYear}-${m}-${d}`;
  }, [targetYear, targetMonth, targetDay]);

  // Sync with URL query parameters on initial mount if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const dobParam = params.get("dob");
      const targetParam = params.get("target");
      const tabParam = params.get("tab");

      if (dobParam) {
        const parts = parseDateParts(dobParam);
        if (parts) {
          setBirthYear(parts.year);
          setBirthMonth(parts.month);
          setBirthDay(parts.day);
        }
      }
      if (targetParam) {
        const parts = parseDateParts(targetParam);
        if (parts) {
          setTargetYear(parts.year);
          setTargetMonth(parts.month);
          setTargetDay(parts.day);
        }
      }
      if (tabParam === "interval" || tabParam === "milestones" || tabParam === "age") {
        setActiveTab(tabParam);
      }

      // Load saved records from localStorage
      try {
        const stored = localStorage.getItem("calc_saved_age_records");
        if (stored) {
          setSavedRecords(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load records from localStorage", e);
      }
    }
  }, []);

  // Update days dropdown max count dynamically based on month & year
  const maxBirthDays = useMemo(() => getDaysInMonth(birthYear, birthMonth), [birthYear, birthMonth]);
  const maxTargetDays = useMemo(() => getDaysInMonth(targetYear, targetMonth), [targetYear, targetMonth]);

  useEffect(() => {
    if (birthDay > maxBirthDays) setBirthDay(maxBirthDays);
  }, [birthDay, maxBirthDays]);

  useEffect(() => {
    if (targetDay > maxTargetDays) setTargetDay(maxTargetDays);
  }, [targetDay, maxTargetDays]);

  // Synchronize HTML5 date picker inputs with component state
  const handleBirthDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parts = parseDateParts(e.target.value);
    if (parts) {
      setBirthYear(parts.year);
      setBirthMonth(parts.month);
      setBirthDay(parts.day);
    }
  };

  const handleTargetDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parts = parseDateParts(e.target.value);
    if (parts) {
      setTargetYear(parts.year);
      setTargetMonth(parts.month);
      setTargetDay(parts.day);
    }
  };

  const handleSetTargetToToday = () => {
    const now = new Date();
    setTargetYear(now.getFullYear());
    setTargetMonth(now.getMonth());
    setTargetDay(now.getDate());
  };

  const handleReset = () => {
    setBirthYear(2000);
    setBirthMonth(0);
    setBirthDay(1);
    const now = new Date();
    setTargetYear(now.getFullYear());
    setTargetMonth(now.getMonth());
    setTargetDay(now.getDate());
    setLeapYearRule("feb28");
    setMonthEndRule("sequential");
    setIncludeEndDay(false);
    setCulturalSystem("western");
  };

  // Real-time calculation engine evaluation
  const result: DetailedAgeResult = useMemo(() => {
    return calculateDetailedAge({
      birthDate: birthDateStr,
      targetDate: targetDateStr,
      leapYearRule,
      monthEndRule,
      includeEndDay,
      culturalSystem,
    });
  }, [birthDateStr, targetDateStr, leapYearRule, monthEndRule, includeEndDay, culturalSystem]);

  // Save calculation to LocalStorage
  const handleSaveCalculation = () => {
    const newRecord: SavedAgeRecord = {
      id: Date.now().toString(),
      birthDate: birthDateStr,
      targetDate: targetDateStr,
      primaryResult: result.matrix.yearsMonthsDays,
      totalDays: result.matrix.totalDays,
      mode: activeTab === "interval" ? "Date Interval" : activeTab === "milestones" ? "Milestones" : "Age Calculator",
      timestamp: new Date().toLocaleString(),
    };
    const updated = [newRecord, ...savedRecords].slice(0, 15);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_age_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  const handleDeleteRecord = (id: string) => {
    const updated = savedRecords.filter((r) => r.id !== id);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_age_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update localStorage", e);
    }
  };

  const handleClearAllRecords = () => {
    setSavedRecords([]);
    try {
      localStorage.removeItem("calc_saved_age_records");
    } catch (e) {
      console.error("Failed to clear localStorage", e);
    }
  };

  const handleRestoreRecord = (rec: SavedAgeRecord) => {
    const b = parseDateParts(rec.birthDate);
    const t = parseDateParts(rec.targetDate);
    if (b) {
      setBirthYear(b.year);
      setBirthMonth(b.month);
      setBirthDay(b.day);
    }
    if (t) {
      setTargetYear(t.year);
      setTargetMonth(t.month);
      setTargetDay(t.day);
    }
  };

  // Copy Formatted Summary
  const handleCopySummary = () => {
    const summary = `Age Calculation Summary:
• Date of Birth: ${MONTH_NAMES[birthMonth]} ${birthDay}, ${birthYear}
• Target Date: ${MONTH_NAMES[targetMonth]} ${targetDay}, ${targetYear}
• Chronological Age: ${result.matrix.yearsMonthsDays}
• Total Months: ${result.matrix.totalMonthsDays}
• Total Weeks: ${result.matrix.totalWeeksDays}
• Total Days: ${result.matrix.totalDays.toLocaleString()} days
• Total Hours: ${result.matrix.totalHours.toLocaleString()} hours
• Next Birthday: in ${result.nextBirthday.daysRemaining} days (${result.nextBirthday.dayOfWeek}, ${result.nextBirthday.nextBirthdayDate})
• Western Zodiac: ${result.zodiac.westernSign} ${result.zodiac.westernSymbol}
• Chinese Zodiac: ${result.zodiac.chineseAnimal}
Generated by CalcPlatform Age Calculator`;

    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  // Share URL Generator
  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}?dob=${birthDateStr}&target=${targetDateStr}&tab=${activeTab}`;
      navigator.clipboard.writeText(url);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  // Chart Data for Next Birthday Progress Donut
  const chartData = [
    { name: "Year Elapsed", value: result.currentYearProgressPercent, color: "#2563EB" },
    { name: "Remaining to Birthday", value: Math.max(0, 100 - result.currentYearProgressPercent), color: "#E2E8F0" },
  ];

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
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Advanced Age & Date Interval Calculator
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Real-time chronological engine • Sub-unit duration matrix • Planetary & cultural aging
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
              onClick={() => setActiveTab("age")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "age"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Standard Age Calculator
            </button>
            <button
              onClick={() => setActiveTab("interval")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "interval"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Date-to-Date Duration Solver
            </button>
            <button
              onClick={() => setActiveTab("milestones")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "milestones"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Life Milestones & Planetary Age
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. INPUT CARD & PARAMETER SELECTORS */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Input Card 1: Date of Birth / Start Date */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900 dark:text-white">
                  {activeTab === "interval" ? "Start Date" : "Date of Birth"}
                </label>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                  {birthDateStr}
                </span>
              </div>

              {/* Pure White 3D Synchronized Dropdown Selectors */}
              <div className="grid grid-cols-3 gap-2">
                {/* Month Dropdown */}
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Month</label>
                  <select
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(parseInt(e.target.value, 10))}
                    className={input3DStyle}
                  >
                    {MONTH_NAMES.map((m, idx) => (
                      <option key={idx} value={idx}>
                        {m.substring(0, 3)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Day Dropdown */}
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Day</label>
                  <select
                    value={birthDay}
                    onChange={(e) => setBirthDay(parseInt(e.target.value, 10))}
                    className={input3DStyle}
                  >
                    {Array.from({ length: maxBirthDays }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year Select/Input */}
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Year</label>
                  <input
                    type="number"
                    min="1800"
                    max="2200"
                    value={birthYear}
                    onChange={(e) => setBirthYear(parseInt(e.target.value, 10) || 2000)}
                    className={input3DStyle}
                  />
                </div>
              </div>

              {/* Inline Calendar Picker Sync */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                <span className="font-medium">Quick Calendar Picker:</span>
                <input
                  type="date"
                  value={birthDateStr}
                  onChange={handleBirthDatePickerChange}
                  className="px-2.5 py-1 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),0_1.5px_0_0_#e2e8f0] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] cursor-pointer font-medium"
                />
              </div>
            </div>

            {/* Input Card 2: Target Date / End Date */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900 dark:text-white">
                  {activeTab === "interval" ? "End Date" : "Target / Age Assessment Date"}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSetTargetToToday}
                    className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    Set to Today
                  </button>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                    {targetDateStr}
                  </span>
                </div>
              </div>

              {/* Pure White 3D Synchronized Dropdown Selectors */}
              <div className="grid grid-cols-3 gap-2">
                {/* Month Dropdown */}
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Month</label>
                  <select
                    value={targetMonth}
                    onChange={(e) => setTargetMonth(parseInt(e.target.value, 10))}
                    className={input3DStyle}
                  >
                    {MONTH_NAMES.map((m, idx) => (
                      <option key={idx} value={idx}>
                        {m.substring(0, 3)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Day Dropdown */}
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Day</label>
                  <select
                    value={targetDay}
                    onChange={(e) => setTargetDay(parseInt(e.target.value, 10))}
                    className={input3DStyle}
                  >
                    {Array.from({ length: maxTargetDays }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year Select/Input */}
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Year</label>
                  <input
                    type="number"
                    min="1800"
                    max="2200"
                    value={targetYear}
                    onChange={(e) => setTargetYear(parseInt(e.target.value, 10) || 2026)}
                    className={input3DStyle}
                  />
                </div>
              </div>

              {/* Inline Calendar Picker Sync */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                <span className="font-medium">Quick Calendar Picker:</span>
                <input
                  type="date"
                  value={targetDateStr}
                  onChange={handleTargetDatePickerChange}
                  className="px-2.5 py-1 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),0_1.5px_0_0_#e2e8f0] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] cursor-pointer font-medium"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. SETTINGS CONTROLS & LOGIC CONFIGURATIONS */}
          {/* ========================================================================= */}
          <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:underline"
              >
                {showAdvancedSettings ? "Hide Calculation Settings" : "Calculation Settings & Edge Cases (Leap Year, EOM Anchor, Cultural)"}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvancedSettings ? "rotate-180" : ""}`} />
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

            {showAdvancedSettings && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                {/* Leap Year Rule */}
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Feb 29 Birthday in Non-Leap Years:
                  </label>
                  <select
                    value={leapYearRule}
                    onChange={(e) => setLeapYearRule(e.target.value as LeapYearRule)}
                    className={input3DStyle}
                  >
                    <option value="feb28">Recognize on Feb 28</option>
                    <option value="mar1">Recognize on March 1 (Legal completion)</option>
                  </select>
                </div>

                {/* Month-End Boundary */}
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Month-End Boundary Logic:
                  </label>
                  <select
                    value={monthEndRule}
                    onChange={(e) => setMonthEndRule(e.target.value as MonthEndRule)}
                    className={input3DStyle}
                  >
                    <option value="sequential">Standard Sequential (Feb 28→Mar 28)</option>
                    <option value="eom_anchor">End-of-Month Anchoring (Feb 28→Mar 31 = 1 mo)</option>
                  </select>
                </div>

                {/* Cultural Age System */}
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Cultural Age Model:
                  </label>
                  <select
                    value={culturalSystem}
                    onChange={(e) => setCulturalSystem(e.target.value as CulturalSystem)}
                    className={input3DStyle}
                  >
                    <option value="western">Western Birthday System (Age 0 at birth)</option>
                    <option value="chinese">Traditional Chinese Sui (Age 1 + Lunar CNY)</option>
                    <option value="korean">Traditional Korean (Age 1 + Jan 1st)</option>
                  </select>
                </div>

                {/* Inclusive Count Toggle */}
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Day Counting Mode:
                  </label>
                  <button
                    onClick={() => setIncludeEndDay(!includeEndDay)}
                    className={`w-full h-10 px-3 rounded-lg border text-left font-semibold flex items-center justify-between transition-colors ${
                      includeEndDay
                        ? "bg-white dark:bg-slate-900 border-blue-600 text-blue-600 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.06),0_1.5px_0_0_#2563eb]"
                        : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.06),0_1.5px_0_0_#e2e8f0] dark:shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.3),0_1.5px_0_0_#334155]"
                    }`}
                  >
                    <span>{includeEndDay ? "Inclusive (+1 End Day)" : "Standard (Exclusive)"}</span>
                    <span className={`w-3.5 h-3.5 rounded-full ${includeEndDay ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"}`} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 4. DYNAMIC OUTPUT CARD & PRIMARY RESULT */}
          {/* ========================================================================= */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50/40 to-blue-50/20 dark:from-slate-800/80 dark:via-slate-800/40 dark:to-slate-800/80 border border-blue-200 dark:border-blue-900/60 shadow-inner space-y-4">
            
            {/* Primary Bold Highlight Result */}
            <div className="text-center space-y-1.5">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                {activeTab === "interval" ? "Total Time Interval" : "Calculated Chronological Age"}
              </span>
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {result.matrix.yearsMonthsDays}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                From <strong className="text-slate-800 dark:text-slate-200">{MONTH_NAMES[birthMonth]} {birthDay}, {birthYear}</strong> to{" "}
                <strong className="text-slate-800 dark:text-slate-200">{MONTH_NAMES[targetMonth]} {targetDay}, {targetYear}</strong>
              </p>
            </div>

            {/* Cultural Age Micro-Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-blue-200/60 dark:border-blue-900/40">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Cultural Equivalents:</span>
              <Badge variant="secondary" className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold">
                Western: {result.culturalAges.western} years
              </Badge>
              <Badge variant="secondary" className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold">
                Traditional Chinese: {result.culturalAges.chineseSui} 歲 (Sui)
              </Badge>
              <Badge variant="secondary" className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold">
                Traditional Korean: {result.culturalAges.koreanAge} 세
              </Badge>
            </div>

            {/* ========================================================================= */}
            {/* 5. SUB-UNIT DURATION MATRIX */}
            {/* ========================================================================= */}
            <div className="space-y-2.5 pt-3 border-t border-blue-200/60 dark:border-blue-900/40">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Sub-Unit Duration Matrix (Alternative Units of Representation)
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Months & Days</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {result.matrix.totalMonthsDays}
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Weeks & Days</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {result.matrix.totalWeeksDays}
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Elapsed Days</span>
                  <span className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
                    {result.matrix.totalDays.toLocaleString()} days
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Hours</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {result.matrix.totalHours.toLocaleString()} hrs
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Minutes</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {result.matrix.totalMinutes.toLocaleString()} min
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Seconds</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {result.matrix.totalSeconds.toLocaleString()} s
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Working Business Days</span>
                  <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400">
                    {result.matrix.totalBusinessDays.toLocaleString()} days
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Weekend Days</span>
                  <span className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
                    {result.matrix.totalWeekendDays.toLocaleString()} days
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 6. INTERACTIVE VISUALIZATION / PROGRESS TIMELINE & COUNTDOWN WHEEL */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Timeline Progress Bar & Next Birthday Card */}
            <div className="lg:col-span-8 p-4 sm:p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Life Year Progress ({result.years} → {result.nextBirthday.turningAge} Years)
                </h3>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {result.currentYearProgressPercent}% Completed
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700 shadow-inner">
                <div
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${result.currentYearProgressPercent}%` }}
                />
              </div>

              {/* Next Birthday Countdown Ticker Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-xs">
                  <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 block">
                    {result.nextBirthday.daysRemaining}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Days Left</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-xs">
                  <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 block">
                    {result.nextBirthday.hoursRemaining.toLocaleString()}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Hours Left</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-xs">
                  <span className="text-[11px] font-semibold text-purple-700 dark:text-purple-300 block mb-0.5">
                    Turning Age
                  </span>
                  <span className="text-base sm:text-lg font-black text-purple-600 dark:text-purple-400 block">
                    {result.nextBirthday.turningAge} yrs
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-xs">
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 block mb-0.5">
                    Birthday Day
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 block">
                    {result.nextBirthday.dayOfWeek}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                <span>Next Birthday: <strong>{result.nextBirthday.nextBirthdayDate}</strong></span>
                <span>Half-Birthday in: <strong>{result.nextBirthday.halfBirthdayDays} days</strong> ({result.nextBirthday.halfBirthdayDate})</span>
              </div>
            </div>

            {/* Recharts Graphic Countdown Wheel Donut */}
            <div className="lg:col-span-4 p-4 sm:p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Next Birthday Wheel
              </h4>
              <div className="relative w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={38}
                      outerRadius={52}
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
                    {result.nextBirthday.daysRemaining}
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-slate-400">days</span>
                </div>
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                Until {result.nextBirthday.turningAge}th Birthday
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 7. ASTROLOGICAL & PLANETARY MICRO-OUTPUTS */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Zodiac Sign Card */}
            <div className="p-4 sm:p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Zodiac & Astrology Profile
              </h3>
              
              <div className="grid grid-cols-2 gap-2.5 text-sm">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold block">Western Sun Sign</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {result.zodiac.westernSign} {result.zodiac.westernSymbol}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    Element: {result.zodiac.westernElement} • {result.zodiac.westernDates}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-rose-700 dark:text-rose-400 font-semibold block">Chinese Zodiac Animal</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {result.zodiac.chineseAnimal}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    Element: {result.zodiac.chineseElement} ({result.zodiac.chineseYinYang})
                  </span>
                </div>
              </div>

              {/* Golden Birthday info */}
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">Golden Birthday:</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Turning age {result.goldenBirthday.age} on {result.goldenBirthday.date}
                  </span>
                </div>
                <Badge variant={result.goldenBirthday.isPast ? "secondary" : "default"} className="text-xs">
                  {result.goldenBirthday.isPast ? "Celebrated" : "Upcoming"}
                </Badge>
              </div>
            </div>

            {/* Planetary Age Offsets */}
            <div className="p-4 sm:p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Your Age Across the Solar System
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                {result.planetAges.slice(0, 4).map((p, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-2xs">
                    <span className="font-semibold text-slate-500 dark:text-slate-400 block">{p.planet}</span>
                    <span className="text-sm sm:text-base font-extrabold text-indigo-600 dark:text-indigo-400 block my-0.5">
                      {p.ageOnPlanet}
                    </span>
                    <span className="text-[10px] text-slate-400">years old</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                {result.planetAges.slice(4, 8).map((p, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-2xs">
                    <span className="font-semibold text-slate-500 dark:text-slate-400 block">{p.planet}</span>
                    <span className="text-sm sm:text-base font-extrabold text-indigo-600 dark:text-indigo-400 block my-0.5">
                      {p.ageOnPlanet}
                    </span>
                    <span className="text-[10px] text-slate-400">years old</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 8. HISTORICAL MILESTONES TRACKER */}
          {/* ========================================================================= */}
          <div className="p-4 sm:p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Major Life Days & Seconds Milestones
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {result.milestones.slice(0, 4).map((m, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border text-xs ${
                    m.isPast
                      ? "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 dark:text-white">{m.name}</span>
                    <Badge variant={m.isPast ? "default" : "outline"} className="text-[10px] h-5">
                      {m.isPast ? "Achieved" : `in ${m.daysRemaining}d`}
                    </Badge>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">{m.description}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {result.milestones.slice(4).map((m, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border text-xs ${
                    m.isPast
                      ? "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 dark:text-white">{m.name}</span>
                    <Badge variant={m.isPast ? "default" : "outline"} className="text-[10px] h-5">
                      {m.isPast ? "Achieved" : `in ${m.daysRemaining}d`}
                    </Badge>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">{m.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 9. MATCHING BLUE "SAVE CALCULATION" BUTTON & PERSISTENCE */}
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

          {/* Saved Calculations History Table */}
          {savedRecords.length > 0 && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Saved Calculations History ({savedRecords.length})
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
                      <th className="py-2 px-2">Birth Date</th>
                      <th className="py-2 px-2">Target Date</th>
                      <th className="py-2 px-2">Age Output</th>
                      <th className="py-2 px-2">Days</th>
                      <th className="py-2 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {savedRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <td className="py-2.5 px-2 font-medium text-slate-900 dark:text-white">{rec.mode}</td>
                        <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 font-mono">{rec.birthDate}</td>
                        <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 font-mono">{rec.targetDate}</td>
                        <td className="py-2.5 px-2 font-bold text-blue-600 dark:text-blue-400">{rec.primaryResult}</td>
                        <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300">{rec.totalDays.toLocaleString()}</td>
                        <td className="py-2.5 px-2 text-right space-x-2">
                          <button
                            onClick={() => handleRestoreRecord(rec)}
                            className="text-blue-600 hover:underline font-semibold"
                          >
                            Load
                          </button>
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

export default AgeCalculator;
