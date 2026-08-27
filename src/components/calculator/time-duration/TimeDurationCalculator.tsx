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
  ArrowRightLeft,
  Calendar as CalendarIcon,
  HelpCircle,
  Plus,
  X,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  calculateSameDayDuration,
  calculateCrossDateDuration,
  calculateMultiSegmentDuration,
  SameDayDurationParams,
  DurationBreakdownResult,
  CrossDateDurationParams,
  CrossDateDurationResult,
  TimeSegmentInput,
  MultiSegmentResult,
} from "@/lib/calculator-engine/formulas/time-duration";
import { TimeDurationContent } from "./TimeDurationContent";

interface SavedDurationRecord {
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

export function TimeDurationCalculator() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [activeTab, setActiveTab] = useState<"sameday" | "crossdate" | "multisegment">("sameday");

  // Format & Precision Settings
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [decimalPlaces, setDecimalPlaces] = useState<number>(4);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showBorrowSteps, setShowBorrowSteps] = useState<boolean>(true);

  // --- TAB 1: SAME-DAY DURATION ---
  const [startHour, setStartHour] = useState<number>(8);
  const [startMin, setStartMin] = useState<number>(30);
  const [startSec, setStartSec] = useState<number>(0);
  const [startMeridiem, setStartMeridiem] = useState<"AM" | "PM">("AM");

  const [endHour, setEndHour] = useState<number>(5);
  const [endMin, setEndMin] = useState<number>(30);
  const [endSec, setEndSec] = useState<number>(0);
  const [endMeridiem, setEndMeridiem] = useState<"AM" | "PM">("PM");

  // --- TAB 2: CROSS-DATE DURATION ---
  const today = new Date();
  const [cStartMonth, setCStartMonth] = useState<number>(today.getMonth());
  const [cStartDay, setCStartDay] = useState<number>(today.getDate());
  const [cStartYear, setCStartYear] = useState<number>(today.getFullYear());
  const [cStartHour, setCStartHour] = useState<number>(8);
  const [cStartMin, setCStartMin] = useState<number>(30);
  const [cStartSec, setCStartSec] = useState<number>(0);
  const [cStartMeridiem, setCStartMeridiem] = useState<"AM" | "PM">("AM");

  const future = new Date();
  future.setDate(future.getDate() + 3);
  const [cEndMonth, setCEndMonth] = useState<number>(future.getMonth());
  const [cEndDay, setCEndDay] = useState<number>(future.getDate());
  const [cEndYear, setCEndYear] = useState<number>(future.getFullYear());
  const [cEndHour, setCEndHour] = useState<number>(5);
  const [cEndMin, setCEndMin] = useState<number>(30);
  const [cEndSec, setCEndSec] = useState<number>(0);
  const [cEndMeridiem, setCEndMeridiem] = useState<"AM" | "PM">("PM");

  // --- TAB 3: MULTI-SEGMENT TIME ADDER ---
  const [segments, setSegments] = useState<TimeSegmentInput[]>([
    { id: "1", label: "Segment 1", hours: 1, minutes: 45, seconds: 0 },
    { id: "2", label: "Segment 2", hours: 2, minutes: 30, seconds: 0 },
    { id: "3", label: "Segment 3", hours: 0, minutes: 55, seconds: 30 },
  ]);

  // Feedback & History
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [savedRecords, setSavedRecords] = useState<SavedDurationRecord[]>([]);

  // Sync with URL query parameters on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "crossdate" || tabParam === "multisegment" || tabParam === "sameday") {
        setActiveTab(tabParam);
      }

      // Load saved records from localStorage
      try {
        const stored = localStorage.getItem("calc_saved_duration_records");
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
    const s = now.getSeconds();
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
    setStartSec(s);
    setCStartSec(s);
    setCStartMonth(now.getMonth());
    setCStartDay(now.getDate());
    setCStartYear(now.getFullYear());
  };

  const handleSetEndToNow = () => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
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
    setEndSec(s);
    setCEndSec(s);
    setCEndMonth(now.getMonth());
    setCEndDay(now.getDate());
    setCEndYear(now.getFullYear());
  };

  const handleSwapTimes = () => {
    const tempH = startHour;
    const tempM = startMin;
    const tempS = startSec;
    const tempMeridiem = startMeridiem;
    setStartHour(endHour);
    setStartMin(endMin);
    setStartSec(endSec);
    setStartMeridiem(endMeridiem);
    setEndHour(tempH);
    setEndMin(tempM);
    setEndSec(tempS);
    setEndMeridiem(tempMeridiem);
  };

  const handleReset = () => {
    setStartHour(8);
    setStartMin(30);
    setStartSec(0);
    setStartMeridiem("AM");
    setEndHour(5);
    setEndMin(30);
    setEndSec(0);
    setEndMeridiem("PM");
    setIs24Hour(false);
    setDecimalPlaces(4);
  };

  // Multi-Segment Handlers
  const handleAddSegment = () => {
    if (segments.length < 10) {
      setSegments([
        ...segments,
        { id: Date.now().toString(), label: `Segment ${segments.length + 1}`, hours: 1, minutes: 0, seconds: 0 },
      ]);
    }
  };

  const handleRemoveSegment = (id: string) => {
    if (segments.length > 1) {
      setSegments(segments.filter((s) => s.id !== id));
    }
  };

  const handleUpdateSegment = (id: string, field: keyof TimeSegmentInput, value: any) => {
    setSegments(
      segments.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  // --- COMPUTATIONS ---
  const sameDayResult: DurationBreakdownResult = useMemo(() => {
    return calculateSameDayDuration({
      startHour,
      startMinute: startMin,
      startSecond: startSec,
      startMeridiem,
      endHour,
      endMinute: endMin,
      endSecond: endSec,
      endMeridiem,
      is24Hour,
      decimalPlaces,
    });
  }, [startHour, startMin, startSec, startMeridiem, endHour, endMin, endSec, endMeridiem, is24Hour, decimalPlaces]);

  const crossDateResult: CrossDateDurationResult = useMemo(() => {
    return calculateCrossDateDuration({
      startYear: cStartYear,
      startMonth: cStartMonth,
      startDay: cStartDay,
      startHour: cStartHour,
      startMinute: cStartMin,
      startSecond: cStartSec,
      startMeridiem: cStartMeridiem,
      endYear: cEndYear,
      endMonth: cEndMonth,
      endDay: cEndDay,
      endHour: cEndHour,
      endMinute: cEndMin,
      endSecond: cEndSec,
      endMeridiem: cEndMeridiem,
      is24Hour,
      decimalPlaces,
    });
  }, [cStartYear, cStartMonth, cStartDay, cStartHour, cStartMin, cStartSec, cStartMeridiem, cEndYear, cEndMonth, cEndDay, cEndHour, cEndMin, cEndSec, cEndMeridiem, is24Hour, decimalPlaces]);

  const multiSegmentResult: MultiSegmentResult = useMemo(() => {
    return calculateMultiSegmentDuration(segments);
  }, [segments]);

  // Save calculation to LocalStorage
  const handleSaveCalculation = () => {
    let summary = "";
    let primaryResult = "";
    let decimalHours = 0;

    if (activeTab === "crossdate") {
      summary = `${crossDateResult.startDateFormatted} to ${crossDateResult.endDateFormatted}`;
      primaryResult = `${crossDateResult.formattedFull} (${crossDateResult.totalDecimalHours} hrs)`;
      decimalHours = crossDateResult.totalDecimalHours;
    } else if (activeTab === "multisegment") {
      summary = `Total of ${multiSegmentResult.segmentCount} Time Segments`;
      primaryResult = `${multiSegmentResult.totalDurationHms} (${multiSegmentResult.totalDecimalHours} hrs)`;
      decimalHours = multiSegmentResult.totalDecimalHours;
    } else {
      const sStr = `${startHour}:${String(startMin).padStart(2, "0")}:${String(startSec).padStart(2, "0")} ${!is24Hour ? startMeridiem : ""}`;
      const eStr = `${endHour}:${String(endMin).padStart(2, "0")}:${String(endSec).padStart(2, "0")} ${!is24Hour ? endMeridiem : ""}`;
      summary = `${sStr} to ${eStr}`;
      primaryResult = `${sameDayResult.formattedHms} (${sameDayResult.totalDecimalHours} hrs)`;
      decimalHours = sameDayResult.totalDecimalHours;
    }

    const newRecord: SavedDurationRecord = {
      id: Date.now().toString(),
      tab: activeTab === "crossdate" ? "Cross-Date Duration" : activeTab === "multisegment" ? "Multi-Segment Adder" : "Same-Day Duration",
      summary,
      primaryResult,
      decimalHours,
      timestamp: new Date().toLocaleString(),
    };

    const updated = [newRecord, ...savedRecords].slice(0, 15);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_duration_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  const handleDeleteRecord = (id: string) => {
    const updated = savedRecords.filter((r) => r.id !== id);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_duration_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update localStorage", e);
    }
  };

  const handleClearAllRecords = () => {
    setSavedRecords([]);
    try {
      localStorage.removeItem("calc_saved_duration_records");
    } catch (e) {
      console.error("Failed to clear localStorage", e);
    }
  };

  // Formatted Summary Copy
  const handleCopySummary = () => {
    let summary = "";
    if (activeTab === "crossdate") {
      summary = `Cross-Date Duration Result:
• Start: ${crossDateResult.startDateFormatted}
• End: ${crossDateResult.endDateFormatted}
• Duration: ${crossDateResult.formattedFull}
• Decimal Hours: ${crossDateResult.totalDecimalHours} hours
• Total Days: ${crossDateResult.totalDecimalDays} days
Generated by CalcPlatform Time Duration Calculator`;
    } else if (activeTab === "multisegment") {
      summary = `Multi-Segment Time Adder Result:
• Total Duration: ${multiSegmentResult.totalDurationHms} (${multiSegmentResult.totalDecimalHours} hrs)
• Segments Summed: ${multiSegmentResult.segmentCount}
• Average Segment: ${multiSegmentResult.averageSegmentHms}
Generated by CalcPlatform Time Duration Calculator`;
    } else {
      summary = `Time Duration Calculation:
• Start Time: ${startHour}:${String(startMin).padStart(2, "0")}:${String(startSec).padStart(2, "0")} ${!is24Hour ? startMeridiem : ""}
• End Time: ${endHour}:${String(endMin).padStart(2, "0")}:${String(endSec).padStart(2, "0")} ${!is24Hour ? endMeridiem : ""}
• Elapsed Duration: ${sameDayResult.formattedHms}
• Decimal Hours: ${sameDayResult.totalDecimalHours} hours
• Total Seconds: ${sameDayResult.totalSeconds.toLocaleString()} seconds
Generated by CalcPlatform Time Duration Calculator`;
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
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Advanced Time Duration Calculator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Exact elapsed hours, minutes & seconds • Sexagesimal borrow solver • Multi-segment adder
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
              onClick={() => setActiveTab("sameday")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "sameday"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Same-Day Duration (Two Times)
            </button>
            <button
              onClick={() => setActiveTab("crossdate")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "crossdate"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Cross-Date Duration (Dates & Times)
            </button>
            <button
              onClick={() => setActiveTab("multisegment")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "multisegment"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Multi-Segment Time Adder
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. INPUT CARD & PARAMETER SELECTORS */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* TAB 1: SAME-DAY DURATION */}
          {activeTab === "sameday" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Start Time Box */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Start Time
                    </span>
                    <button
                      onClick={handleSetStartToNow}
                      className="text-xs px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800"
                    >
                      Now
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
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
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Second</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={startSec}
                        onChange={(e) => setStartSec(parseInt(e.target.value, 10) || 0)}
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
                        End Time
                      </span>
                      <button
                        onClick={handleSwapTimes}
                        title="Swap Start and End times"
                        className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={handleSetEndToNow}
                      className="text-xs px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800"
                    >
                      Now
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
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
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Second</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={endSec}
                        onChange={(e) => setEndSec(parseInt(e.target.value, 10) || 0)}
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
            </div>
          )}

          {/* TAB 2: CROSS-DATE DURATION */}
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
                    <label className="text-xs text-slate-500 block mb-1">Month</label>
                    <select
                      value={cStartMonth}
                      onChange={(e) => setCStartMonth(parseInt(e.target.value, 10))}
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
                      value={cStartDay}
                      onChange={(e) => setCStartDay(parseInt(e.target.value, 10) || 1)}
                      className={input3DStyle}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Year</label>
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

                <div className="grid grid-cols-4 gap-2 pt-1">
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Hour</label>
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
                    <label className="text-xs text-slate-500 block mb-1">Min</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={cStartMin}
                      onChange={(e) => setCStartMin(parseInt(e.target.value, 10) || 0)}
                      className={input3DStyle}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Sec</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={cStartSec}
                      onChange={(e) => setCStartSec(parseInt(e.target.value, 10) || 0)}
                      className={input3DStyle}
                    />
                  </div>
                  {!is24Hour && (
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">AM/PM</label>
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
                    <label className="text-xs text-slate-500 block mb-1">Month</label>
                    <select
                      value={cEndMonth}
                      onChange={(e) => setCEndMonth(parseInt(e.target.value, 10))}
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
                      value={cEndDay}
                      onChange={(e) => setCEndDay(parseInt(e.target.value, 10) || 1)}
                      className={input3DStyle}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Year</label>
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

                <div className="grid grid-cols-4 gap-2 pt-1">
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Hour</label>
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
                    <label className="text-xs text-slate-500 block mb-1">Min</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={cEndMin}
                      onChange={(e) => setCEndMin(parseInt(e.target.value, 10) || 0)}
                      className={input3DStyle}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Sec</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={cEndSec}
                      onChange={(e) => setCEndSec(parseInt(e.target.value, 10) || 0)}
                      className={input3DStyle}
                    />
                  </div>
                  {!is24Hour && (
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">AM/PM</label>
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

          {/* TAB 3: MULTI-SEGMENT TIME ADDER */}
          {activeTab === "multisegment" && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Sequential Time Intervals ({segments.length} / 10)
                  </span>
                  <p className="text-xs text-slate-500">
                    Add multiple legs or task durations to calculate cumulative elapsed time.
                  </p>
                </div>

                {segments.length < 10 && (
                  <Button
                    size="sm"
                    onClick={handleAddSegment}
                    className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Interval
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                {segments.map((seg, idx) => (
                  <div
                    key={seg.id}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-xs"
                  >
                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        value={seg.label}
                        onChange={(e) => handleUpdateSegment(seg.id, "label", e.target.value)}
                        placeholder={`Interval ${idx + 1}`}
                        className="w-full h-8 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
                      />
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        value={seg.hours}
                        onChange={(e) => handleUpdateSegment(seg.id, "hours", parseInt(e.target.value, 10) || 0)}
                        className="w-full h-8 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                      />
                      <span className="text-slate-400">h</span>
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={seg.minutes}
                        onChange={(e) => handleUpdateSegment(seg.id, "minutes", parseInt(e.target.value, 10) || 0)}
                        className="w-full h-8 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                      />
                      <span className="text-slate-400">m</span>
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={seg.seconds}
                        onChange={(e) => handleUpdateSegment(seg.id, "seconds", parseInt(e.target.value, 10) || 0)}
                        className="w-full h-8 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                      />
                      <span className="text-slate-400">s</span>
                    </div>
                    <div className="sm:col-span-3 flex justify-end">
                      {segments.length > 1 && (
                        <button
                          onClick={() => handleRemoveSegment(seg.id)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. SETTINGS CONTROLS */}
          {/* ========================================================================= */}
          <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:underline"
              >
                {showSettings ? "Hide Settings" : "Calculation Settings (Decimal Precision, 12H / 24H Format)"}
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
                    <option value="24">24-Hour Military Format (00:00:00 – 23:59:59)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Decimal Output Precision:
                  </label>
                  <select
                    value={decimalPlaces}
                    onChange={(e) => setDecimalPlaces(parseInt(e.target.value, 10))}
                    className={input3DStyle}
                  >
                    <option value={2}>2 Decimal Places (e.g. 8.50 hrs)</option>
                    <option value={4}>4 Decimal Places (Standard 8.5000 hrs)</option>
                    <option value={6}>6 Decimal Places</option>
                    <option value={8}>8 Decimal Places (Scientific Precision)</option>
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
                {activeTab === "crossdate" ? "Calculated Cross-Date Duration" : activeTab === "multisegment" ? "Total Cumulative Duration" : "Calculated Elapsed Duration"}
              </span>

              {activeTab === "crossdate" ? (
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {crossDateResult.formattedFull}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {crossDateResult.totalDecimalHours.toLocaleString()} Decimal Hours
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    From <strong>{crossDateResult.startDateFormatted}</strong> to <strong>{crossDateResult.endDateFormatted}</strong>
                  </p>
                </div>
              ) : activeTab === "multisegment" ? (
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {multiSegmentResult.totalDurationHms}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {multiSegmentResult.totalDecimalHours.toLocaleString()} Decimal Hours
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Sum of {multiSegmentResult.segmentCount} segments • Average: {multiSegmentResult.averageSegmentHms}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {sameDayResult.formattedHms}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {sameDayResult.totalDecimalHours} Decimal Hours
                  </div>
                  {sameDayResult.overnightRollover && (
                    <Badge variant="secondary" className="mt-1 text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                      Overnight Duration (+1 Day Midnight Rollover)
                    </Badge>
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
                    {activeTab === "crossdate" ? crossDateResult.totalDecimalHours : activeTab === "multisegment" ? multiSegmentResult.totalDecimalHours : sameDayResult.totalDecimalHours} hrs
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Minutes</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {activeTab === "crossdate" ? crossDateResult.totalDecimalMinutes.toLocaleString() : activeTab === "multisegment" ? multiSegmentResult.totalDecimalMinutes.toLocaleString() : sameDayResult.totalDecimalMinutes.toLocaleString()} min
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Seconds</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {activeTab === "crossdate" ? crossDateResult.totalSeconds.toLocaleString() : activeTab === "multisegment" ? multiSegmentResult.totalCumulativeSeconds.toLocaleString() : sameDayResult.totalSeconds.toLocaleString()} s
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">% of Solar Day</span>
                  <span className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400">
                    {activeTab === "crossdate" ? `${(crossDateResult.totalDecimalDays * 100).toFixed(1)}%` : activeTab === "multisegment" ? `${((multiSegmentResult.totalCumulativeSeconds / 86400) * 100).toFixed(1)}%` : `${sameDayResult.percentOfDay}%`}
                  </span>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 6. STEP-BY-STEP SEXAGESIMAL BORROW DRAWER */}
            {/* ========================================================================= */}
            {activeTab === "sameday" && (
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    Step-by-Step Sexagesimal Borrow Calculation
                  </span>
                  <button
                    onClick={() => setShowBorrowSteps(!showBorrowSteps)}
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    {showBorrowSteps ? "Hide Steps" : "Show Steps"}
                  </button>
                </div>

                {showBorrowSteps && (
                  <div className="space-y-2 pt-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                    <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 whitespace-pre-line border border-slate-100 dark:border-slate-800">
                      {sameDayResult.borrowSteps.step1Conversion}
                    </div>
                    <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 whitespace-pre-line border border-slate-100 dark:border-slate-800">
                      {sameDayResult.borrowSteps.step2Borrow}
                    </div>
                    <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-bold whitespace-pre-line border border-blue-200 dark:border-blue-900">
                      {sameDayResult.borrowSteps.step3Result}
                    </div>
                  </div>
                )}
              </div>
            )}

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
              Save Duration to History
            </Button>
          </div>

          {/* Saved History Table */}
          {savedRecords.length > 0 && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Saved Duration Calculations ({savedRecords.length})
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
                      <th className="py-2 px-2">Interval</th>
                      <th className="py-2 px-2">Result</th>
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
    </div>
  );
}

export default TimeDurationCalculator;
