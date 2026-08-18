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
  Briefcase,
  Download,
  Printer,
  CopyCheck,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  calculateWeeklyPayroll,
  evaluateFLSAExemption,
  DayShiftInput,
  WeeklyPayrollResult,
  TimeRoundingMode,
  OvertimeRule,
  ExemptionEvaluationResult,
} from "@/lib/calculator-engine/formulas/time-card";
import { TimeCardContent } from "./TimeCardContent";

interface SavedTimeCardRecord {
  id: string;
  tab: string;
  summary: string;
  grossPay: number;
  totalHours: number;
  timestamp: string;
}

const DEFAULT_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function TimeCardCalculator() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [activeTab, setActiveTab] = useState<"weekly" | "overtime" | "exemption">("weekly");

  // 7-Day Shifts State
  const [shifts, setShifts] = useState<DayShiftInput[]>([
    { dayName: "Monday", fromTime: "8:30AM", toTime: "5:00PM", breakDeduction: "0:30" },
    { dayName: "Tuesday", fromTime: "8:30AM", toTime: "5:00PM", breakDeduction: "0:30" },
    { dayName: "Wednesday", fromTime: "8:30AM", toTime: "5:00PM", breakDeduction: "0:30" },
    { dayName: "Thursday", fromTime: "8:30AM", toTime: "5:00PM", breakDeduction: "0:30" },
    { dayName: "Friday", fromTime: "8:30AM", toTime: "5:00PM", breakDeduction: "0:30" },
    { dayName: "Saturday", fromTime: "", toTime: "", breakDeduction: "" },
    { dayName: "Sunday", fromTime: "", toTime: "", breakDeduction: "" },
  ]);

  // Wage & Overtime Settings
  const [hourlyRate, setHourlyRate] = useState<string>("25.00");
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<number>(1.5);
  const [doubleTimeMultiplier, setDoubleTimeMultiplier] = useState<number>(2.0);
  const [roundingMode, setRoundingMode] = useState<TimeRoundingMode>("none");
  const [overtimeRule, setOvertimeRule] = useState<OvertimeRule>("weekly_40");

  // Report Settings
  const [employeeName, setEmployeeName] = useState<string>("");
  const [reportNotes, setReportNotes] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Tab 3: Exemption Questionnaire State
  const [weeklySalary, setWeeklySalary] = useState<string>("950.00");
  const [isSalaryPaid, setIsSalaryPaid] = useState<boolean>(true);
  const [jobCategory, setJobCategory] = useState<"executive" | "administrative" | "professional" | "computer" | "outside_sales" | "blue_collar_first_responder">("executive");
  const [managesDepartment, setManagesDepartment] = useState<boolean>(true);
  const [supervisesTwoPlus, setSupervisesTwoPlus] = useState<boolean>(true);
  const [nonManualOfficeWork, setNonManualOfficeWork] = useState<boolean>(true);
  const [advancedSpecializedKnowledge, setAdvancedSpecializedKnowledge] = useState<boolean>(true);

  // Feedback & History
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [savedRecords, setSavedRecords] = useState<SavedTimeCardRecord[]>([]);

  // Sync with URL query parameters on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      const rateParam = params.get("rate");

      if (tabParam === "overtime" || tabParam === "exemption" || tabParam === "weekly") {
        setActiveTab(tabParam);
      }
      if (rateParam) {
        setHourlyRate(rateParam);
      }

      // Load saved records from localStorage
      try {
        const stored = localStorage.getItem("calc_saved_timecard_records");
        if (stored) {
          setSavedRecords(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load records from localStorage", e);
      }
    }
  }, []);

  // Update a single shift row
  const updateShift = (index: number, field: keyof DayShiftInput, value: string) => {
    const updated = [...shifts];
    updated[index] = { ...updated[index], [field]: value };
    setShifts(updated);
  };

  // Copy first row's data down (Mon-Fri)
  const handleCopyFirstRowDown = () => {
    const first = shifts[0];
    const updated = shifts.map((s, idx) => {
      if (idx <= 4) {
        return { ...s, fromTime: first.fromTime, toTime: first.toTime, breakDeduction: first.breakDeduction };
      }
      return s;
    });
    setShifts(updated);
  };

  // Clear all shift inputs
  const handleClearAll = () => {
    const cleared = shifts.map((s) => ({
      ...s,
      fromTime: "",
      toTime: "",
      breakDeduction: "",
    }));
    setShifts(cleared);
  };

  const handleReset = () => {
    setShifts([
      { dayName: "Monday", fromTime: "8:30AM", toTime: "5:00PM", breakDeduction: "0:30" },
      { dayName: "Tuesday", fromTime: "8:30AM", toTime: "5:00PM", breakDeduction: "0:30" },
      { dayName: "Wednesday", fromTime: "8:30AM", toTime: "5:00PM", breakDeduction: "0:30" },
      { dayName: "Thursday", fromTime: "8:30AM", toTime: "5:00PM", breakDeduction: "0:30" },
      { dayName: "Friday", fromTime: "8:30AM", toTime: "5:00PM", breakDeduction: "0:30" },
      { dayName: "Saturday", fromTime: "", toTime: "", breakDeduction: "" },
      { dayName: "Sunday", fromTime: "", toTime: "", breakDeduction: "" },
    ]);
    setHourlyRate("25.00");
    setOvertimeMultiplier(1.5);
    setDoubleTimeMultiplier(2.0);
    setRoundingMode("none");
    setOvertimeRule("weekly_40");
    setEmployeeName("");
    setReportNotes("");
  };

  // --- COMPUTATIONS ---
  const payrollResult: WeeklyPayrollResult = useMemo(() => {
    return calculateWeeklyPayroll({
      shifts,
      hourlyRate: parseFloat(hourlyRate) || 0,
      overtimeMultiplier,
      doubleTimeMultiplier,
      roundingMode,
      overtimeRule,
    });
  }, [shifts, hourlyRate, overtimeMultiplier, doubleTimeMultiplier, roundingMode, overtimeRule]);

  const exemptionResult: ExemptionEvaluationResult = useMemo(() => {
    return evaluateFLSAExemption({
      weeklySalary: parseFloat(weeklySalary) || 0,
      isSalaryPaid,
      category: jobCategory,
      managesDepartment,
      supervisesTwoPlus,
      nonManualOfficeWork,
      advancedSpecializedKnowledge,
    });
  }, [weeklySalary, isSalaryPaid, jobCategory, managesDepartment, supervisesTwoPlus, nonManualOfficeWork, advancedSpecializedKnowledge]);

  // Save calculation to LocalStorage
  const handleSaveCalculation = () => {
    const summary = `${payrollResult.totalWeeklyHours} hrs ($${payrollResult.totalGrossPay.toFixed(2)})`;
    const newRecord: SavedTimeCardRecord = {
      id: Date.now().toString(),
      tab: activeTab === "exemption" ? "FLSA Exemption" : activeTab === "overtime" ? "Daily Overtime" : "Weekly Timesheet",
      summary,
      grossPay: payrollResult.totalGrossPay,
      totalHours: payrollResult.totalWeeklyHours,
      timestamp: new Date().toLocaleString(),
    };

    const updated = [newRecord, ...savedRecords].slice(0, 15);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_timecard_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  const handleDeleteRecord = (id: string) => {
    const updated = savedRecords.filter((r) => r.id !== id);
    setSavedRecords(updated);
    try {
      localStorage.setItem("calc_saved_timecard_records", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update localStorage", e);
    }
  };

  const handleClearAllRecords = () => {
    setSavedRecords([]);
    try {
      localStorage.removeItem("calc_saved_timecard_records");
    } catch (e) {
      console.error("Failed to clear localStorage", e);
    }
  };

  // Formatted Summary Copy
  const handleCopySummary = () => {
    let summary = `Weekly Timesheet & Payroll Summary:
${employeeName ? `• Employee: ${employeeName}\n` : ""}• Total Hours Worked: ${payrollResult.totalWeeklyHours} hrs
• Regular Hours: ${payrollResult.totalRegularHours} hrs ($${payrollResult.regularPay.toFixed(2)})
• Overtime Hours: ${payrollResult.totalOvertimeHours} hrs ($${payrollResult.overtimePay.toFixed(2)})
${payrollResult.totalDoubleTimeHours > 0 ? `• Double-Time Hours: ${payrollResult.totalDoubleTimeHours} hrs ($${payrollResult.doubleTimePay.toFixed(2)})\n` : ""}• Total Gross Earnings: $${payrollResult.totalGrossPay.toFixed(2)}
• Total Unpaid Break Time: ${payrollResult.totalBreakHours} hrs
Generated by CalcPlatform Time Card Calculator`;

    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const rows = [
      ["Day", "Start Time", "End Time", "Break (min)", "Total Hours", "Regular Hours", "Overtime Hours", "Daily Gross Pay ($)"],
      ...payrollResult.dailyResults.map((r, idx) => [
        r.dayName,
        shifts[idx].fromTime || "-",
        shifts[idx].toTime || "-",
        String(r.breakMinutesDeducted),
        String(r.roundedHoursWorked),
        String(r.regularHours),
        String(r.overtimeHours),
        r.dailyGrossPay.toFixed(2),
      ]),
      [],
      ["Total Weekly Hours", String(payrollResult.totalWeeklyHours)],
      ["Regular Pay ($)", payrollResult.regularPay.toFixed(2)],
      ["Overtime Pay ($)", payrollResult.overtimePay.toFixed(2)],
      ["Total Gross Pay ($)", payrollResult.totalGrossPay.toFixed(2)],
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `timesheet_${employeeName.replace(/\s+/g, "_") || "report"}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share URL Generator
  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}?tab=${activeTab}&rate=${hourlyRate}`;
      navigator.clipboard.writeText(url);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  // Recharts Chart Data (Stacked Daily Hours)
  const chartData = useMemo(() => {
    return payrollResult.dailyResults.map((r) => ({
      day: r.dayName.substring(0, 3),
      "Regular Hours": r.regularHours,
      "Overtime Hours": r.overtimeHours,
      "Double Time": r.doubleTimeHours,
      "Break (h)": parseFloat((r.breakMinutesDeducted / 60).toFixed(2)),
    }));
  }, [payrollResult]);

  // Pure White 3D tactile input styling
  const input3DStyle = "w-full h-9 px-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold text-slate-900 dark:text-slate-100 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.06),0_1.5px_0_0_#e2e8f0] dark:shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.3),0_1.5px_0_0_#334155] focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_0_0_2px_#2563eb] focus:border-blue-600 outline-none transition-all";

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
                Advanced Time Card & Weekly Payroll Calculator
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Weekly timesheet • Break deductions • FLSA & California overtime • Exemption checker
              </p>
            </div>

            {/* Top Quick Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="h-8 text-xs border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs"
              >
                <Download className="w-3.5 h-3.5 mr-1" /> Export CSV
              </Button>
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
              onClick={() => { setActiveTab("weekly"); setOvertimeRule("weekly_40"); }}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "weekly"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Weekly Timesheet & Payroll
            </button>
            <button
              onClick={() => { setActiveTab("overtime"); setOvertimeRule("daily_8_weekly_40"); }}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "overtime"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              Daily Overtime (California Over 8h / 12h)
            </button>
            <button
              onClick={() => setActiveTab("exemption")}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === "exemption"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              FLSA Exemption Checker
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. INPUT CARD & PARAMETER SELECTORS */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* TAB 1 & TAB 2: TIMESHEET ROWS */}
          {activeTab !== "exemption" && (
            <div className="space-y-4">
              
              {/* Employee & Hourly Rate Bar */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Employee Name (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jane Doe"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    className={input3DStyle}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Hourly Pay Rate ($ / hr):
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
                    Overtime Model:
                  </label>
                  <select
                    value={overtimeRule}
                    onChange={(e) => setOvertimeRule(e.target.value as OvertimeRule)}
                    className={input3DStyle}
                  >
                    <option value="weekly_40">Standard FLSA (Over 40 Hours / Week)</option>
                    <option value="daily_8_weekly_40">California Rule (Over 8h @ 1.5x, Over 12h @ 2.0x)</option>
                    <option value="daily_10">Daily Over 10 Hours</option>
                    <option value="no_overtime">Straight Pay (No Overtime)</option>
                  </select>
                </div>
              </div>

              {/* 7-Day Timesheet Table */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Weekly Shifts (Monday – Sunday)
                  </span>
                  <div className="flex items-center gap-3 text-xs">
                    <button
                      onClick={handleCopyFirstRowDown}
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      <CopyCheck className="w-3.5 h-3.5" /> Copy Monday Down
                    </button>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <button
                      onClick={handleClearAll}
                      className="text-rose-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear All
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                        <th className="py-2 px-2 w-28">Day</th>
                        <th className="py-2 px-2">From Time</th>
                        <th className="py-2 px-2">To Time</th>
                        <th className="py-2 px-2 w-28">Break (Deduction)</th>
                        <th className="py-2 px-2 text-right">Daily Paid Hours</th>
                        <th className="py-2 px-2 text-right">Daily Pay</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {shifts.map((shift, idx) => {
                        const res = payrollResult.dailyResults[idx];
                        return (
                          <tr key={shift.dayName} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="py-2 px-2 font-bold text-slate-800 dark:text-slate-200">
                              {shift.dayName}
                            </td>
                            <td className="py-2 px-2">
                              <input
                                type="text"
                                placeholder="e.g. 8:30AM"
                                value={shift.fromTime}
                                onChange={(e) => updateShift(idx, "fromTime", e.target.value)}
                                className="w-full h-8 px-2 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <input
                                type="text"
                                placeholder="e.g. 5:00PM"
                                value={shift.toTime}
                                onChange={(e) => updateShift(idx, "toTime", e.target.value)}
                                className="w-full h-8 px-2 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <input
                                type="text"
                                placeholder="0:30 / 30m"
                                value={shift.breakDeduction}
                                onChange={(e) => updateShift(idx, "breakDeduction", e.target.value)}
                                className="w-full h-8 px-2 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                              />
                            </td>
                            <td className="py-2 px-2 text-right font-bold text-blue-600 dark:text-blue-400">
                              {res ? res.formattedDuration : "0.00h"}
                            </td>
                            <td className="py-2 px-2 text-right font-semibold text-slate-800 dark:text-slate-200">
                              ${res ? res.dailyGrossPay.toFixed(2) : "0.00"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Time Rounding & Report Notes Settings */}
              <div className="p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:underline"
                  >
                    {showSettings ? "Hide Advanced Settings" : "Time Rounding & Report Options (FLSA 7-Minute Rule, Notes)"}
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
                        Time Rounding Policy:
                      </label>
                      <select
                        value={roundingMode}
                        onChange={(e) => setRoundingMode(e.target.value as TimeRoundingMode)}
                        className={input3DStyle}
                      >
                        <option value="none">No Rounding (Exact Minute-by-Minute)</option>
                        <option value="15min_7rule">15-Minute Increment (FLSA 7-Minute Rule)</option>
                        <option value="5min">Nearest 5 Minutes</option>
                        <option value="30min">Nearest 30 Minutes</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Timesheet Memo / Notes:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Approved by supervisor"
                        value={reportNotes}
                        onChange={(e) => setReportNotes(e.target.value)}
                        className={input3DStyle}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: FLSA EXEMPTION CHECKER */}
          {activeTab === "exemption" && (
            <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  FLSA Employee Exemption Assessment
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Evaluate whether an employee qualifies as Exempt from overtime pay under federal labor laws.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Weekly Salary Earnings ($/week):
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={weeklySalary}
                    onChange={(e) => setWeeklySalary(e.target.value)}
                    className={input3DStyle}
                  />
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Federal threshold: $684.00/week ($35,568/year)
                  </span>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Compensation Method:
                  </label>
                  <select
                    value={isSalaryPaid ? "salary" : "hourly"}
                    onChange={(e) => setIsSalaryPaid(e.target.value === "salary")}
                    className={input3DStyle}
                  >
                    <option value="salary">Guaranteed Salary Basis (Fixed amount per week)</option>
                    <option value="hourly">Hourly Pay (Paid for hours recorded)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Job Classification & Primary Duties:
                </label>
                <select
                  value={jobCategory}
                  onChange={(e) => setJobCategory(e.target.value as any)}
                  className={input3DStyle}
                >
                  <option value="executive">Executive Exemption (Management / Department Supervisor)</option>
                  <option value="administrative">Administrative Exemption (Office Operations & Business Discretion)</option>
                  <option value="professional">Professional Exemption (Learned Degrees / Creative Fields)</option>
                  <option value="computer">Computer Professional Exemption (Software / Systems Analysis)</option>
                  <option value="outside_sales">Outside Sales Exemption (Sales outside office)</option>
                  <option value="blue_collar_first_responder">Blue Collar Manual Worker / First Responder (Non-Exempt)</option>
                </select>
              </div>

              {/* Exemption Status Card */}
              <div
                className={`p-4 rounded-xl border ${
                  exemptionResult.isExempt
                    ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800"
                    : "bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {exemptionResult.isExempt ? (
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  )}
                  <span
                    className={`font-bold text-sm sm:text-base ${
                      exemptionResult.isExempt ? "text-emerald-900 dark:text-emerald-200" : "text-amber-900 dark:text-amber-200"
                    }`}
                  >
                    {exemptionResult.statusTitle}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
                  {exemptionResult.reason}
                </p>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                  Reference: {exemptionResult.flsaRuleReference}
                </span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. DYNAMIC OUTPUT CARD & PRIMARY RESULTS */}
          {/* ========================================================================= */}
          {activeTab !== "exemption" && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50/40 to-blue-50/20 dark:from-slate-800/80 dark:via-slate-800/40 dark:to-slate-800/80 border border-blue-200 dark:border-blue-900/60 shadow-inner space-y-4">
              
              {/* Primary Bold Highlight Result */}
              <div className="text-center space-y-1.5">
                <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                  Total Estimated Gross Earnings
                </span>
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  ${payrollResult.totalGrossPay.toFixed(2)}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Total Paid Time: <strong>{payrollResult.totalWeeklyHours} hours</strong> (Regular: {payrollResult.totalRegularHours}h, Overtime: {payrollResult.totalOvertimeHours}h{payrollResult.totalDoubleTimeHours > 0 ? `, Double: ${payrollResult.totalDoubleTimeHours}h` : ""})
                </p>
              </div>

              {/* ========================================================================= */}
              {/* 5. ALL-UNITS BREAKDOWN MATRIX */}
              {/* ========================================================================= */}
              <div className="space-y-2.5 pt-3 border-t border-blue-200/60 dark:border-blue-900/40">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Payroll & Hours Breakdown Matrix
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Regular Pay</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      ${payrollResult.regularPay.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">{payrollResult.totalRegularHours} hrs @ ${hourlyRate}</span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Overtime Pay (1.5x)</span>
                    <span className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
                      ${payrollResult.overtimePay.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">{payrollResult.totalOvertimeHours} hrs @ ${(parseFloat(hourlyRate) * overtimeMultiplier).toFixed(2)}</span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Unpaid Break Time</span>
                    <span className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
                      {payrollResult.totalBreakHours} hrs
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Deducted from gross</span>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Effective Pay Rate</span>
                    <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400">
                      ${payrollResult.effectiveHourlyRate.toFixed(2)}/hr
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Blended average</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 6. INTERACTIVE VISUALIZER / DAILY SHIFT STACKED BAR CHART */}
          {/* ========================================================================= */}
          {activeTab !== "exemption" && (
            <div className="p-4 sm:p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Weekly Hours Distribution by Day
              </h3>

              <div className="w-full h-48 sm:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="Regular Hours" stackId="a" fill="#2563EB" />
                    <Bar dataKey="Overtime Hours" stackId="a" fill="#8B5CF6" />
                    <Bar dataKey="Break (h)" stackId="a" fill="#CBD5E1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 7. MATCHING BLUE "SAVE CALCULATION" BUTTON & HISTORY */}
          {/* ========================================================================= */}
          <div className="pt-1">
            <Button
              onClick={handleSaveCalculation}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Bookmark className="w-4 h-4" />
              Save Timesheet to History
            </Button>
          </div>

          {/* Saved History Table */}
          {savedRecords.length > 0 && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Saved Timesheets History ({savedRecords.length})
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
                      <th className="py-2 px-2">Total Hours</th>
                      <th className="py-2 px-2">Gross Pay</th>
                      <th className="py-2 px-2">Timestamp</th>
                      <th className="py-2 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {savedRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <td className="py-2.5 px-2 font-medium text-slate-900 dark:text-white">{rec.tab}</td>
                        <td className="py-2.5 px-2 font-bold text-blue-600 dark:text-blue-400">{rec.totalHours} hrs</td>
                        <td className="py-2.5 px-2 font-bold text-emerald-600 dark:text-emerald-400">${rec.grossPay.toFixed(2)}</td>
                        <td className="py-2.5 px-2 text-slate-500 font-mono">{rec.timestamp}</td>
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
      <TimeCardContent />
    </div>
  );
}

export default TimeCardCalculator;
