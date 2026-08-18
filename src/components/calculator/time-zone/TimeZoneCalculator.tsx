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
  Globe,
  ArrowRightLeft,
  Calendar as CalendarIcon,
  Clock,
  Sun,
  Moon,
  Plus,
  X,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TIME_ZONE_DATABASE,
  TimeZoneDefinition,
  convertTimeZone,
  generateMeetingPlannerGrid,
  getActiveOffsetMinutes,
  formatOffsetString,
  ConvertTimeZoneResult,
} from "@/lib/calculator-engine/formulas/time-zone";
import { TimeZoneContent } from "./TimeZoneContent";

interface SavedTimeZoneRecord {
  id: string;
  tab: string;
  summary: string;
  sourceText: string;
  targetText: string;
  timestamp: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function TimeZoneCalculator() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [activeTab, setActiveTab] = useState<"single" | "meeting" | "worldclock">("single");

  // Date & Time Inputs
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(today.getDate());
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());

  const [inputHour, setInputHour] = useState<number>(14); // 2:00 PM
  const [inputMinute, setInputMinute] = useState<number>(30);
  const [inputSecond, setInputSecond] = useState<number>(0);
  const [inputMeridiem, setInputMeridiem] = useState<"AM" | "PM">("PM");

  // Single Converter Zones
  const [fromZoneId, setFromZoneId] = useState<string>("utc-5"); // New York (EST/EDT)
  const [toZoneId, setToZoneId] = useState<string>("utc-0-gmt"); // London (GMT/BST)

  // Settings
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [autoDst, setAutoDst] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Meeting Planner Selected Cities (Up to 5)
  const [meetingCityIds, setMeetingCityIds] = useState<string[]>([
    "utc-8",       // Los Angeles
    "utc-5",       // New York
    "utc-0-gmt",   // London
    "utc-5-30",    // India
    "utc-9-jst",   // Tokyo
  ]);

  // Feedback & History
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [savedRecords, setSavedRecords] = useState<SavedTimeZoneRecord[]>([]);

  // Search Filter for Dropdowns
  const [fromSearch, setFromSearch] = useState<string>("");
  const [toSearch, setToSearch] = useState<string>("");

  // Sync with URL query parameters on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      const fromParam = params.get("from");
      const toParam = params.get("to");

      if (tabParam === "meeting" || tabParam === "worldclock" || tabParam === "single") {
        setActiveTab(tabParam);
      }
      if (fromParam && TIME_ZONE_DATABASE.some((z) => z.id === fromParam)) {
        setFromZoneId(fromParam);
      }
      if (toParam && TIME_ZONE_DATABASE.some((z) => z.id === toParam)) {
        setToZoneId(toParam);
      }

      // Load saved records from localStorage
      try {
        const stored = localStorage.getItem("calc_saved_timezone_records");
        if (stored) {
          setSavedRecords(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load records from localStorage", e);
      }
    }
  }, []);

  // Quick "Now" handlers
  const handleSetToNow = () => {
    const now = new Date();
    setSelectedMonth(now.getMonth());
    setSelectedDay(now.getDate());
    setSelectedYear(now.getFullYear());
    const h = now.getHours();
    if (is24Hour) {
      setInputHour(h);
    } else {
      setInputHour(h % 12 === 0 ? 12 : h % 12);
      setInputMeridiem(h >= 12 ? "PM" : "AM");
    }
    setInputMinute(now.getMinutes());
    setInputSecond(now.getSeconds());
  };

  const handleSwapZones = () => {
    const temp = fromZoneId;
    setFromZoneId(toZoneId);
    setToZoneId(temp);
  };

  const handleReset = () => {
    const now = new Date();
    setSelectedMonth(now.getMonth());
    setSelectedDay(now.getDate());
    setSelectedYear(now.getFullYear());
    setInputHour(14);
    setInputMinute(30);
    setInputSecond(0);
    setInputMeridiem("PM");
    setFromZoneId("utc-5");
    setToZoneId("utc-0-gmt");
    setAutoDst(true);
    setIs24Hour(false);
  };

  // Find Zone definitions
  const fromZone = useMemo(() => {
    return TIME_ZONE_DATABASE.find((z) => z.id === fromZoneId) || TIME_ZONE_DATABASE[10]; // Default New York
  }, [fromZoneId]);

  const toZone = useMemo(() => {
    return TIME_ZONE_DATABASE.find((z) => z.id === toZoneId) || TIME_ZONE_DATABASE[17]; // Default London
  }, [toZoneId]);

  // Selected date object
  const currentDateObj = useMemo(() => {
    return new Date(selectedYear, selectedMonth, selectedDay);
  }, [selectedYear, selectedMonth, selectedDay]);

  // --- SINGLE CONVERTER COMPUTATION ---
  const conversionResult: ConvertTimeZoneResult = useMemo(() => {
    let normalizedHour = inputHour;
    if (!is24Hour) {
      normalizedHour = inputHour % 12;
      if (inputMeridiem === "PM") normalizedHour += 12;
    }

    return convertTimeZone({
      date: currentDateObj,
      timeHour: normalizedHour,
      timeMinute: inputMinute,
      timeSecond: inputSecond,
      fromZone,
      toZone,
      autoDst,
    });
  }, [currentDateObj, inputHour, inputMinute, inputSecond, inputMeridiem, is24Hour, fromZone, toZone, autoDst]);

  // --- MEETING PLANNER GRID COMPUTATION ---
  const meetingCities = useMemo(() => {
    return meetingCityIds
      .map((id) => TIME_ZONE_DATABASE.find((z) => z.id === id))
      .filter((z): z is TimeZoneDefinition => Boolean(z));
  }, [meetingCityIds]);

  const meetingSlots = useMemo(() => {
    return generateMeetingPlannerGrid(meetingCities, currentDateObj, autoDst);
  }, [meetingCities, currentDateObj, autoDst]);

  const handleAddMeetingCity = (cityId: string) => {
    if (meetingCityIds.length < 6 && !meetingCityIds.includes(cityId)) {
      setMeetingCityIds([...meetingCityIds, cityId]);
    }
  };

  const handleRemoveMeetingCity = (cityId: string) => {
    if (meetingCityIds.length > 2) {
      setMeetingCityIds(meetingCityIds.filter((id) => id !== cityId));
    }
  };

  // Save calculation to LocalStorage
  const handleSaveCalculation = () => {
    const newRecord: SavedTimeZoneRecord = {
      id: Date.now().toString(),
      tab: activeTab === "meeting" ? "Meeting Planner" : "Time Zone Conversion",
      summary: `${fromZone.city} to ${toZone.city} (${conversionResult.timeDifferenceFormatted})`,
      sourceText: conversionResult.sourceDateTimeFormatted,
      targetText: conversionResult.targetDateTimeFormatted,
      timestamp: new Date().toLocaleString(),
    };

    const updated = [newRecord, ...savedRecords].slice(0, 15);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_timezone_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  const handleDeleteRecord = (id: string) => {
    const updated = savedRecords.filter((r) => r.id !== id);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_timezone_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update localStorage", e);
    }
  };

  const handleClearAllRecords = () => {
    setSavedRecords([]);
    try {
      localStorage.removeItem("calc_saved_timezone_records");
    } catch (e) {
      console.error("Failed to clear localStorage", e);
    }
  };

  // Formatted Summary Copy
  const handleCopySummary = () => {
    const summary = `Time Zone Conversion:
• From: ${fromZone.city} (${fromZone.country}) [${conversionResult.fromOffsetFormatted}]
• Time: ${conversionResult.sourceDateTimeFormatted}
• To: ${toZone.city} (${toZone.country}) [${conversionResult.toOffsetFormatted}]
• Result: ${conversionResult.targetDateTimeFormatted}
• Difference: ${conversionResult.timeDifferenceFormatted}
${conversionResult.isFromDst || conversionResult.isToDst ? "• Note: Daylight Saving Time (DST) automatically applied.\n" : ""}Generated by CalcPlatform Time Zone Calculator`;

    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  // Share URL Generator
  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}?tab=${activeTab}&from=${fromZoneId}&to=${toZoneId}`;
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
                Global Time Zone Converter & Meeting Planner
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Precision conversions (UTC-12 to UTC+14) • Automated DST engine • Multi-city golden hour planner
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
              Single Time Zone Converter
            </button>
            <button
              onClick={() => setActiveTab("meeting")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "meeting"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Multi-City Meeting Planner
            </button>
            <button
              onClick={() => setActiveTab("worldclock")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "worldclock"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              US & Major World Clocks
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. INPUT CARD & PARAMETER SELECTORS */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* TAB 1: SINGLE TIME ZONE CONVERTER */}
          {activeTab === "single" && (
            <div className="space-y-4">
              
              {/* Date & Time Selectors */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Date Picker */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5 text-blue-600" /> Reference Date:
                    </label>
                    <button
                      onClick={handleSetToNow}
                      className="text-xs px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800"
                    >
                      Today / Now
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
                        className={input3DStyle}
                      >
                        {MONTH_NAMES.map((m, idx) => (
                          <option key={idx} value={idx}>{m.substring(0, 3)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input
                        type="number"
                        min="1"
                        max="31"
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(parseInt(e.target.value, 10) || 1)}
                        className={input3DStyle}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        min="1900"
                        max="2100"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value, 10) || 2026)}
                        className={input3DStyle}
                      />
                    </div>
                  </div>
                </div>

                {/* Time Picker */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                    <Clock className="w-3.5 h-3.5 inline text-blue-600 mr-1" />
                    Time to Convert:
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <input
                        type="number"
                        min={is24Hour ? 0 : 1}
                        max={is24Hour ? 23 : 12}
                        value={inputHour}
                        onChange={(e) => setInputHour(parseInt(e.target.value, 10) || 0)}
                        className={input3DStyle}
                        placeholder="HH"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={inputMinute}
                        onChange={(e) => setInputMinute(parseInt(e.target.value, 10) || 0)}
                        className={input3DStyle}
                        placeholder="MM"
                      />
                    </div>
                    {!is24Hour ? (
                      <div>
                        <select
                          value={inputMeridiem}
                          onChange={(e) => setInputMeridiem(e.target.value as "AM" | "PM")}
                          className={input3DStyle}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span className="text-xs text-slate-400 font-mono">24h format</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* From Zone and To Zone Selectors with Swap */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                
                {/* From Zone */}
                <div className="md:col-span-5 p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" /> Origin Zone (From):
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                      {conversionResult.fromOffsetFormatted}
                    </span>
                  </div>

                  <select
                    value={fromZoneId}
                    onChange={(e) => setFromZoneId(e.target.value)}
                    className={input3DStyle}
                  >
                    {TIME_ZONE_DATABASE.map((tz) => (
                      <option key={tz.id} value={tz.id}>
                        {tz.city} ({tz.country}) — {tz.name.split(" (")[0]}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {fromZone.name} {conversionResult.isFromDst ? "(DST Active)" : ""}
                  </p>
                </div>

                {/* Swap Button */}
                <div className="md:col-span-2 flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSwapZones}
                    title="Swap Origin and Destination"
                    className="w-10 h-10 rounded-full border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 shadow-sm hover:bg-blue-50 dark:hover:bg-blue-950 text-blue-600"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </Button>
                </div>

                {/* To Zone */}
                <div className="md:col-span-5 p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" /> Destination Zone (To):
                    </span>
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {conversionResult.toOffsetFormatted}
                    </span>
                  </div>

                  <select
                    value={toZoneId}
                    onChange={(e) => setToZoneId(e.target.value)}
                    className={input3DStyle}
                  >
                    {TIME_ZONE_DATABASE.map((tz) => (
                      <option key={tz.id} value={tz.id}>
                        {tz.city} ({tz.country}) — {tz.name.split(" (")[0]}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {toZone.name} {conversionResult.isToDst ? "(DST Active)" : ""}
                  </p>
                </div>

              </div>

              {/* Dynamic Output Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50/40 to-blue-50/20 dark:from-slate-800/80 dark:via-slate-800/40 dark:to-slate-800/80 border border-blue-200 dark:border-blue-900/60 shadow-inner space-y-3">
                <div className="text-center space-y-1.5">
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                    Converted Destination Time
                  </span>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {conversionResult.targetDateTimeFormatted}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
                    {conversionResult.timeDifferenceFormatted}
                  </div>
                  {conversionResult.dayShift !== 0 && (
                    <Badge variant="secondary" className="mt-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                      {conversionResult.dayShift > 0 ? "+1 Day Ahead in Target Zone" : "-1 Day Behind in Target Zone"}
                    </Badge>
                  )}
                </div>

                {/* Conversion Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-blue-200/60 dark:border-blue-900/40 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-slate-500 dark:text-slate-400 block mb-0.5 font-medium">Origin Time ({fromZone.city})</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white block">{conversionResult.sourceDateTimeFormatted}</span>
                    <span className="text-[11px] font-mono text-slate-500">{fromZone.name}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-slate-500 dark:text-slate-400 block mb-0.5 font-medium">Destination Time ({toZone.city})</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 block">{conversionResult.targetDateTimeFormatted}</span>
                    <span className="text-[11px] font-mono text-slate-500">{toZone.name}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MULTI-CITY MEETING PLANNER */}
          {activeTab === "meeting" && (
            <div className="space-y-4">
              
              {/* Meeting City Manager */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Selected Meeting Cities ({meetingCities.length} / 6)
                    </span>
                    <p className="text-xs text-slate-500">
                      Green indicates overlapping business working hours (9 AM–5 PM).
                    </p>
                  </div>

                  {meetingCities.length < 6 && (
                    <div className="flex items-center gap-2">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            handleAddMeetingCity(e.target.value);
                            e.target.value = "";
                          }
                        }}
                        className="h-8 px-2 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
                        defaultValue=""
                      >
                        <option value="" disabled>+ Add Another City</option>
                        {TIME_ZONE_DATABASE.filter((z) => !meetingCityIds.includes(z.id)).map((tz) => (
                          <option key={tz.id} value={tz.id}>{tz.city} ({tz.country})</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* City Chips */}
                <div className="flex flex-wrap gap-2">
                  {meetingCities.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
                    >
                      <span>{c.city}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {formatOffsetString(getActiveOffsetMinutes(c, currentDateObj, autoDst).offsetMinutes)}
                      </span>
                      {meetingCities.length > 2 && (
                        <button
                          onClick={() => handleRemoveMeetingCity(c.id)}
                          className="p-0.5 text-slate-400 hover:text-rose-500 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 24-Hour Sliding Meeting Schedule Grid */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    24-Hour Global Availability Grid
                  </h3>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Work (9am–5pm)
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Evening / Early
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" /> Night
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500">
                        <th className="py-2 px-2 w-24">UTC Time</th>
                        {meetingCities.map((c) => (
                          <th key={c.id} className="py-2 px-2 font-bold text-slate-900 dark:text-white">
                            {c.city}
                          </th>
                        ))}
                        <th className="py-2 px-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {meetingSlots.map((slot) => {
                        const ampm = slot.utcHour >= 12 ? "PM" : "AM";
                        const h12 = slot.utcHour % 12 === 0 ? 12 : slot.utcHour % 12;
                        return (
                          <tr
                            key={slot.utcHour}
                            className={`transition-colors ${
                              slot.allWorkingHours
                                ? "bg-emerald-50/80 dark:bg-emerald-950/40 font-bold"
                                : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                            }`}
                          >
                            <td className="py-2 px-2 font-mono text-slate-600 dark:text-slate-400">
                              {h12}:00 {ampm} ({String(slot.utcHour).padStart(2, "0")}:00)
                            </td>
                            {slot.cityTimes.map((ct) => {
                              const cAmpm = ct.localHour >= 12 ? "PM" : "AM";
                              const cH12 = ct.localHour % 12 === 0 ? 12 : ct.localHour % 12;
                              return (
                                <td key={ct.cityId} className="py-2 px-2">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                                      ct.status === "work"
                                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-bold"
                                        : ct.status === "evening"
                                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                                        : "text-slate-400 dark:text-slate-500"
                                    }`}
                                  >
                                    {cH12}:{String(ct.localMinute).padStart(2, "0")} {cAmpm}
                                  </span>
                                </td>
                              );
                            })}
                            <td className="py-2 px-2 text-right">
                              {slot.allWorkingHours ? (
                                <Badge className="bg-emerald-600 text-white text-[10px]">
                                  Golden Hour
                                </Badge>
                              ) : (
                                <span className="text-[11px] text-slate-400">Partial</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: US & WORLD CLOCK REFERENCE */}
          {activeTab === "worldclock" && (
            <div className="space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Major Global Clocks (Real-Time Live Offsets)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  {TIME_ZONE_DATABASE.map((tz) => {
                    const offset = getActiveOffsetMinutes(tz, currentDateObj, autoDst);
                    const utcMs = currentDateObj.getTime() + currentDateObj.getTimezoneOffset() * 60000;
                    const targetDate = new Date(utcMs + offset.offsetMinutes * 60000);
                    const h = targetDate.getHours();
                    const m = targetDate.getMinutes();
                    const ampm = h >= 12 ? "PM" : "AM";
                    const h12 = h % 12 === 0 ? 12 : h % 12;

                    return (
                      <div
                        key={tz.id}
                        onClick={() => {
                          setToZoneId(tz.id);
                          setActiveTab("single");
                        }}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:border-blue-500 cursor-pointer transition-all space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white">{tz.city}</span>
                          <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-bold">
                            {formatOffsetString(offset.offsetMinutes)}
                          </span>
                        </div>
                        <div className="text-sm font-extrabold text-slate-800 dark:text-slate-100 font-mono">
                          {h12}:{String(m).padStart(2, "0")} {ampm}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {tz.country} • {tz.name.split(" (")[0]}
                        </div>
                      </div>
                    );
                  })}
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
                {showSettings ? "Hide Settings" : "Calculation Settings (Automatic Daylight Saving Time, 12H / 24H Format)"}
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
                    <option value="24">24-Hour Format (00:00 – 23:59)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Automatic Daylight Saving Time (DST):
                  </label>
                  <select
                    value={autoDst ? "true" : "false"}
                    onChange={(e) => setAutoDst(e.target.value === "true")}
                    className={input3DStyle}
                  >
                    <option value="true">Enabled (Auto-adjust for US, EU & AU summer clocks)</option>
                    <option value="false">Disabled (Enforce standard winter UTC offsets)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 3. MATCHING BLUE "SAVE CALCULATION" BUTTON & HISTORY */}
          {/* ========================================================================= */}
          <div className="pt-1">
            <Button
              onClick={handleSaveCalculation}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Bookmark className="w-4 h-4" />
              Save Conversion to History
            </Button>
          </div>

          {/* Saved History Table */}
          {savedRecords.length > 0 && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Saved Time Zone Calculations ({savedRecords.length})
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
                      <th className="py-2 px-2">City Pair / Offset</th>
                      <th className="py-2 px-2">Origin Time</th>
                      <th className="py-2 px-2">Target Time</th>
                      <th className="py-2 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {savedRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <td className="py-2.5 px-2 font-medium text-slate-900 dark:text-white">{rec.tab}</td>
                        <td className="py-2.5 px-2 font-bold text-blue-600 dark:text-blue-400">{rec.summary}</td>
                        <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 font-mono">{rec.sourceText}</td>
                        <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300 font-mono">{rec.targetText}</td>
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
      {/* 4. EDUCATIONAL KNOWLEDGE BASE */}
      {/* ========================================================================= */}
      <TimeZoneContent />
    </div>
  );
}

export default TimeZoneCalculator;
