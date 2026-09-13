"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Trophy,
  Plus,
  Trash2,
  Download,
  Share2,
  Printer,
  Check,
  Flag,
  Calculator,
  ShieldCheck,
  Save,
  RotateCcw,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GolfRound,
  HandicapAllowanceFormat,
  WHSHandicapResult,
} from "@/app/calculators/golf-handicap-calculator/types";
import {
  calculateWHSHandicapIndex,
  calculateCourseHandicap,
  calculateScoreDifferential,
  calculate9HoleCombinedDifferential,
  NineHoleWHSResult,
} from "@/app/calculators/golf-handicap-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

const STORAGE_KEY = "calcplatform_golf_handicap_v1";

const DEFAULT_ROUNDS: GolfRound[] = [
  { id: "1", score: 82, courseRating: 71.5, slopeRating: 124, pcc: 0, holes: 18 },
  { id: "2", score: 85, courseRating: 72.0, slopeRating: 128, pcc: 0, holes: 18 },
  { id: "3", score: 79, courseRating: 70.8, slopeRating: 120, pcc: 0, holes: 18 },
  { id: "4", score: 88, courseRating: 73.1, slopeRating: 132, pcc: 0, holes: 18 },
  { id: "5", score: 84, courseRating: 71.8, slopeRating: 122, pcc: 0, holes: 18 },
  { id: "6", score: 81, courseRating: 71.0, slopeRating: 121, pcc: 0, holes: 18 },
  { id: "7", score: 86, courseRating: 72.4, slopeRating: 126, pcc: 0, holes: 18 },
  { id: "8", score: 80, courseRating: 70.5, slopeRating: 119, pcc: 0, holes: 18 },
];

export function GolfHandicapCalculator() {
  // Tabs
  const [activeTab, setActiveTab] = useState<"whs" | "course" | "single">("whs");

  // Tab 1: WHS 20-Round Matrix State
  const [lowIndexAnchor, setLowIndexAnchor] = useState<number | undefined>(undefined);
  const [baselineIndex, setBaselineIndex] = useState<number | undefined>(undefined);
  const [rounds, setRounds] = useState<GolfRound[]>(DEFAULT_ROUNDS);

  // Tab 2: Course & Playing Handicap State
  const [targetIndex, setTargetIndex] = useState<number>(10.4);
  const [targetRating, setTargetRating] = useState<number>(72.1);
  const [targetSlope, setTargetSlope] = useState<number>(128);
  const [targetPar, setTargetPar] = useState<number>(72);
  const [allowanceFormat, setAllowanceFormat] = useState<HandicapAllowanceFormat>("100_stroke");

  // Tab 3: Single Round Differential Converter State
  const [sScore, setSScore] = useState<number>(85);
  const [sRating, setSRating] = useState<number>(72.0);
  const [sSlope, setSSlope] = useState<number>(113);
  const [sPcc, setSPcc] = useState<number>(0);
  const [sHoles, setSHoles] = useState<9 | 18>(18);
  const [sPlayerIndex, setSPlayerIndex] = useState<string>("");

  // Modals & Feedback
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>("");

  // WHS Matrix Calculation
  const whsResult: WHSHandicapResult = useMemo(() => {
    return calculateWHSHandicapIndex(rounds, lowIndexAnchor, baselineIndex);
  }, [rounds, lowIndexAnchor, baselineIndex]);

  // Course Handicap Calculation
  const courseResult = useMemo(() => {
    return calculateCourseHandicap(targetIndex, targetSlope, targetRating, targetPar, allowanceFormat);
  }, [targetIndex, targetSlope, targetRating, targetPar, allowanceFormat]);

  // Single Round Differential Calculation (18-hole or standalone 9-hole)
  const singleDiff = useMemo(() => {
    return calculateScoreDifferential(sScore, sRating, sSlope, sPcc, sHoles);
  }, [sScore, sRating, sSlope, sPcc, sHoles]);

  // 9-Hole Full WHS Combined Differential
  const single9HoleResult: NineHoleWHSResult = useMemo(() => {
    const numHi = sPlayerIndex !== "" && !isNaN(Number(sPlayerIndex)) ? Number(sPlayerIndex) : undefined;
    return calculate9HoleCombinedDifferential(sScore, sRating, sSlope, sPcc, numHi);
  }, [sScore, sRating, sSlope, sPcc, sPlayerIndex]);

  // Add Round
  const handleAddRound = () => {
    if (rounds.length >= 20) return;
    const newId = String(Date.now());
    const lastRound = rounds[0] || { score: 85, courseRating: 72.0, slopeRating: 113, pcc: 0 };
    setRounds([
      {
        id: newId,
        score: lastRound.score,
        courseRating: lastRound.courseRating,
        slopeRating: lastRound.slopeRating,
        pcc: 0,
        holes: 18,
      },
      ...rounds,
    ]);
  };

  // Remove Round
  const handleRemoveRound = (id: string) => {
    if (rounds.length <= 1) return;
    setRounds(rounds.filter((r) => r.id !== id));
  };

  // Update Round
  const handleUpdateRound = (id: string, field: keyof GolfRound, val: any) => {
    setRounds(
      rounds.map((r) => (r.id === id ? { ...r, [field]: Number(val) } : r))
    );
  };

  // Save to LocalStorage
  const handleSaveRecord = () => {
    try {
      const stateToSave = {
        version: 1,
        savedAt: new Date().toISOString(),
        rounds,
        lowIndexAnchor,
        baselineIndex,
        targetIndex,
        targetRating,
        targetSlope,
        targetPar,
        allowanceFormat,
        sScore,
        sRating,
        sSlope,
        sPcc,
        sHoles,
        sPlayerIndex,
        activeTab,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      setSaveStatus("Record Saved!");
      setTimeout(() => setSaveStatus(""), 2500);
    } catch {
      setSaveStatus("Save failed");
      setTimeout(() => setSaveStatus(""), 2500);
    }
  };

  // Restore from LocalStorage
  const handleRestoreRecord = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setSaveStatus("No saved record found");
        setTimeout(() => setSaveStatus(""), 2500);
        return;
      }
      const data = JSON.parse(saved);
      if (data && Array.isArray(data.rounds)) {
        setRounds(data.rounds);
        setLowIndexAnchor(data.lowIndexAnchor ?? undefined);
        setBaselineIndex(data.baselineIndex ?? undefined);
        if (data.targetIndex !== undefined) setTargetIndex(data.targetIndex);
        if (data.targetRating !== undefined) setTargetRating(data.targetRating);
        if (data.targetSlope !== undefined) setTargetSlope(data.targetSlope);
        if (data.targetPar !== undefined) setTargetPar(data.targetPar);
        if (data.allowanceFormat) setAllowanceFormat(data.allowanceFormat);
        if (data.sScore !== undefined) setSScore(data.sScore);
        if (data.sRating !== undefined) setSRating(data.sRating);
        if (data.sSlope !== undefined) setSSlope(data.sSlope);
        if (data.sPcc !== undefined) setSPcc(data.sPcc);
        if (data.sHoles !== undefined) setSHoles(data.sHoles);
        if (data.sPlayerIndex !== undefined) setSPlayerIndex(data.sPlayerIndex);
        if (data.activeTab) setActiveTab(data.activeTab);
        setSaveStatus("Record Restored!");
        setTimeout(() => setSaveStatus(""), 2500);
      }
    } catch {
      setSaveStatus("Error restoring record");
      setTimeout(() => setSaveStatus(""), 2500);
    }
  };

  // Reset Defaults
  const handleResetDefaults = () => {
    setRounds(DEFAULT_ROUNDS);
    setLowIndexAnchor(undefined);
    setBaselineIndex(undefined);
    setTargetIndex(10.4);
    setTargetRating(72.1);
    setTargetSlope(128);
    setTargetPar(72);
    setAllowanceFormat("100_stroke");
    setSScore(85);
    setSRating(72.0);
    setSSlope(113);
    setSPcc(0);
    setSHoles(18);
    setSPlayerIndex("");
    setSScore(85);
    setSRating(72.0);
    setSSlope(113);
    setSPcc(0);
    setSHoles(18);
    setSaveStatus("Reset to Defaults");
    setTimeout(() => setSaveStatus(""), 2500);
  };

  // Copy Summary
  const handleCopySummary = () => {
    let text = `⛳ CalcPlatform WHS Golf Handicap Card:\n`;
    text += `Handicap Index: ${whsResult.finalHandicapIndex !== null ? whsResult.finalHandicapIndex : "Unestablished (<3 rounds)"}\n`;
    text += `Rounds Submitted: ${whsResult.roundsSubmitted} (${whsResult.countingRoundsCount} counting)\n`;
    text += `WHS Rule: ${whsResult.whsRuleNote}\n`;
    if (whsResult.softCapApplied) text += `[Soft Cap Triggered]\n`;
    if (whsResult.hardCapApplied) text += `[Hard Cap Triggered]\n`;
    if (whsResult.esrApplied) text += `[ESR Adjustment: ${whsResult.totalEsrAdjustment}]\n`;
    text += `Note: Calculated WHS estimate. Official index issued through authorized club/association.\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download CSV
  const handleDownloadCSV = () => {
    let csv = "Round,Score,Course Rating,Slope Rating,PCC,Differential,Status\n";
    rounds.forEach((round, idx) => {
      const diffItem = whsResult.differentials.find((d) => d.roundId === round.id);
      const diffVal = diffItem ? diffItem.differential : calculateScoreDifferential(round.score, round.courseRating, round.slopeRating, round.pcc || 0);
      const statusText = whsResult.finalHandicapIndex === null
        ? "Unestablished (<3 rounds)"
        : diffItem?.isCounting
        ? "Counting"
        : "Dropped";

      csv += `${idx + 1},${round.score},${round.courseRating},${round.slopeRating},${round.pcc || 0},${diffVal},${statusText}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "whs_handicap_history.csv";
    a.click();
  };

  // Report Modal Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: "WHS Golf Handicap Calculation Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Golf Handicap Calculator",
      },
      keyMetrics: [
        {
          label: "Calculated Handicap Index",
          value: whsResult.finalHandicapIndex !== null ? String(whsResult.finalHandicapIndex) : "Unestablished (<3 rounds)",
          colorTheme: "emerald",
        },
        { label: "Submitted Rounds", value: `${whsResult.roundsSubmitted} Rounds` },
        { label: "Counting Differentials", value: whsResult.countingRoundsCount > 0 ? `Best ${whsResult.countingRoundsCount}` : "None" },
        { label: "Target Course Handicap", value: `${courseResult.courseHandicap} Strokes` },
      ],
      sections: [
        {
          title: "WHS Calculation Rule & Safeguard Status",
          items: [
            { label: "Active WHS Scale Rule", value: whsResult.whsRuleNote },
            { label: "Uncapped Raw Index", value: whsResult.rawUncappedIndex !== null ? String(whsResult.rawUncappedIndex) : "N/A" },
            { label: "Low Index Anchor (365-day)", value: whsResult.lowIndexAnchor ? String(whsResult.lowIndexAnchor) : "None" },
            {
              label: "Cap Safeguards Status",
              value: whsResult.hardCapApplied
                ? "Hard Cap Active (+5.0 ceiling over Low Index)"
                : whsResult.softCapApplied
                ? "Soft Cap Active (50% suppression past +3.0 strokes)"
                : whsResult.roundsSubmitted >= 20
                ? "Normal Range (Caps Eligible)"
                : "Inactive (<20 rounds submitted)",
            },
            {
              label: "Exceptional Score Reduction (ESR)",
              value: whsResult.esrApplied
                ? `${whsResult.totalEsrAdjustment} stroke adjustment applied`
                : "None",
            },
          ],
        },
        {
          title: "Target Course & Playing Handicap (Rule 6)",
          items: [
            { label: "Format Allowance", value: courseResult.allowanceLabel },
            { label: "Course Handicap", value: `${courseResult.courseHandicap} Strokes` },
            { label: "Playing Handicap", value: `${courseResult.playingHandicap} Strokes` },
          ],
        },
      ],
      table: {
        title: "20-Round Scoring History & Differentials",
        headers: [
          { key: "round", label: "Round #" },
          { key: "score", label: "Gross Score" },
          { key: "rating", label: "Rating / Slope" },
          { key: "pcc", label: "PCC" },
          { key: "diff", label: "Differential" },
          { key: "status", label: "Status" },
        ],
        rows: rounds.map((r, i) => {
          const diffItem = whsResult.differentials.find((d) => d.roundId === r.id);
          const diffVal = diffItem ? diffItem.differential : calculateScoreDifferential(r.score, r.courseRating, r.slopeRating, r.pcc || 0);
          return {
            round: `Round ${i + 1}`,
            score: r.score,
            rating: `${r.courseRating} / ${r.slopeRating}`,
            pcc: r.pcc ? (r.pcc > 0 ? `+${r.pcc}` : String(r.pcc)) : "0",
            diff: diffVal,
            status: whsResult.finalHandicapIndex === null
              ? "Unestablished (<3 rounds)"
              : diffItem?.isCounting
              ? "Counting (Best)"
              : "Dropped",
          };
        }),
      },
    };
  }, [whsResult, courseResult, rounds]);

  return (
    <div className="space-y-6">
      {/* 1. TOP TAB & ACTION NAVIGATION BAR */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mode Tabs */}
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200/70 dark:border-zinc-700">
          <button
            type="button"
            onClick={() => setActiveTab("whs")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "whs"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <Trophy className="h-3.5 w-3.5" /> 1–20 Round WHS Matrix
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("course")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "course"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <Flag className="h-3.5 w-3.5" /> Course &amp; Playing Handicap
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("single")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "single"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <Calculator className="h-3.5 w-3.5" /> Single Round Differential
          </button>
        </div>

        {/* Right: Actions (Save, Restore, PDF Report, Reset) */}
        <div className="flex items-center gap-2">
          {saveStatus && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-fade-in">
              {saveStatus}
            </span>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSaveRecord}
            title="Save Scoring Record to Local Storage"
            className="h-8 text-xs font-bold gap-1 cursor-pointer border-zinc-200 dark:border-zinc-700"
          >
            <Save className="h-3.5 w-3.5" /> Save Record
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRestoreRecord}
            title="Restore Previously Saved Record"
            className="h-8 text-xs font-bold gap-1 cursor-pointer border-zinc-200 dark:border-zinc-700"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Restore
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => setShowReportModal(true)}
            className="h-8 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="h-3.5 w-3.5" /> PDF Report
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleResetDefaults}
            title="Reset to Default Preset"
            className="h-8 text-xs text-zinc-500 hover:text-zinc-800 cursor-pointer"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* 2. TAB CONTENT PANES */}
      {activeTab === "whs" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT: 20-ROUND SCORE GRID (Col 7) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3 gap-2">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  WHS 20-Round Differential Matrix
                </h3>
                <p className="text-[11px] text-zinc-500">
                  {whsResult.whsRuleNote}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={handleDownloadCSV}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs font-bold gap-1 cursor-pointer border-zinc-200 dark:border-zinc-700"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" /> Export CSV
                </Button>

                <Button
                  type="button"
                  onClick={handleAddRound}
                  disabled={rounds.length >= 20}
                  size="sm"
                  className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer gap-1"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Round ({rounds.length}/20)
                </Button>
              </div>
            </div>

            {/* Safeguard & Baseline Anchors Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs">
              <div className="space-y-1">
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block">
                  365-Day Low Index Anchor
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="e.g. 9.5"
                    value={lowIndexAnchor ?? ""}
                    onChange={(e) =>
                      setLowIndexAnchor(e.target.value !== "" ? Number(e.target.value) : undefined)
                    }
                    step={0.1}
                    className="h-8 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                  />
                  <span className="text-[10px] text-zinc-400">Caps (≥20 scores)</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block">
                  Baseline Index (for ESR testing)
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="e.g. 15.0"
                    value={baselineIndex ?? ""}
                    onChange={(e) =>
                      setBaselineIndex(e.target.value !== "" ? Number(e.target.value) : undefined)
                    }
                    step={0.1}
                    className="h-8 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                  />
                  <span className="text-[10px] text-zinc-400">Diff ≥ 7.0 lower</span>
                </div>
              </div>
            </div>

            {/* Dynamic Rounds Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-800/60 font-bold text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
                    <th className="p-2 font-sans">#</th>
                    <th className="p-2">Score</th>
                    <th className="p-2">Rating</th>
                    <th className="p-2">Slope</th>
                    <th className="p-2" title="Published Daily PCC (manual input)">PCC (Daily)*</th>
                    <th className="p-2">Diff</th>
                    <th className="p-2 font-sans">Status</th>
                    <th className="p-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {rounds.map((roundObj, index) => {
                    const diffItem = whsResult.differentials.find((d) => d.roundId === roundObj.id);
                    const rowDiff = diffItem
                      ? diffItem.differential
                      : calculateScoreDifferential(roundObj.score, roundObj.courseRating, roundObj.slopeRating, roundObj.pcc || 0);
                    const isCounting = diffItem?.isCounting ?? false;

                    return (
                      <tr
                        key={roundObj.id}
                        className={isCounting ? "bg-emerald-50/50 dark:bg-emerald-950/20 font-bold" : ""}
                      >
                        <td className="p-2 font-sans text-zinc-400">{index + 1}</td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={roundObj.score}
                            onChange={(e) => handleUpdateRound(roundObj.id, "score", e.target.value)}
                            className="h-7 w-16 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={roundObj.courseRating}
                            onChange={(e) => handleUpdateRound(roundObj.id, "courseRating", e.target.value)}
                            step={0.1}
                            className="h-7 w-16 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            value={roundObj.slopeRating}
                            onChange={(e) => handleUpdateRound(roundObj.id, "slopeRating", e.target.value)}
                            className="h-7 w-16 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                          />
                        </td>
                        <td className="p-2">
                          <select
                            value={roundObj.pcc ?? 0}
                            onChange={(e) => handleUpdateRound(roundObj.id, "pcc", e.target.value)}
                            className="h-7 w-16 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md px-1 cursor-pointer"
                          >
                            <option value={-1}>-1.0</option>
                            <option value={0}>0.0</option>
                            <option value={1}>+1.0</option>
                            <option value={2}>+2.0</option>
                            <option value={3}>+3.0</option>
                          </select>
                        </td>
                        <td className="p-2 font-bold text-zinc-900 dark:text-zinc-100">
                          {rowDiff > 0 ? rowDiff.toFixed(1) : rowDiff.toFixed(1)}
                        </td>
                        <td className="p-2 font-sans">
                          {whsResult.roundsSubmitted < 3 ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                              &lt;3 Rounds
                            </span>
                          ) : isCounting ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                              Counting
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                              Dropped
                            </span>
                          )}
                        </td>
                        <td className="p-2 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveRound(roundObj.id)}
                            disabled={rounds.length <= 1}
                            className="text-zinc-400 hover:text-rose-500 disabled:opacity-30 cursor-pointer p-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-1">
              *Note: The PCC (Playing Conditions Calculation) value is entered from the applicable daily PCC result (-1.0 to +3.0). This calculator does not independently calculate the official course-day PCC.
            </p>
          </div>

          {/* RIGHT: HANDICAP INDEX RESULT CARD (Col 5) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1.5">
                  <Trophy className="h-4 w-4" /> WHS Formula Model
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                  {whsResult.roundsSubmitted} Rounds Entered
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-emerald-100 font-medium">Calculated WHS Handicap Index</span>
                <div className="text-6xl font-black font-sans tabular-nums tracking-tight text-white">
                  {whsResult.finalHandicapIndex !== null ? (
                    whsResult.finalHandicapIndex > 0 ? (
                      whsResult.finalHandicapIndex.toFixed(1)
                    ) : (
                      `+${Math.abs(whsResult.finalHandicapIndex).toFixed(1)}`
                    )
                  ) : (
                    <span className="text-4xl text-amber-200">N/A</span>
                  )}
                </div>
                <p className="text-xs text-emerald-100">
                  {whsResult.whsRuleNote}
                </p>
              </div>

              {/* Cap Status */}
              <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10 space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span>Cap Status (Rule 5.7 &amp; 5.8)</span>
                  <span className="text-emerald-200">
                    {whsResult.hardCapApplied
                      ? "Hard Capped"
                      : whsResult.softCapApplied
                      ? "Soft Capped"
                      : "Uncapped"}
                  </span>
                </div>
                <p className="text-emerald-100 text-[11px]">
                  {whsResult.roundsSubmitted < 20
                    ? "Low Index / Caps inactive (requires 20 submitted scores per USGA Rule 5.7)."
                    : whsResult.lowIndexAnchor === undefined
                    ? "Caps inactive (Enter 365-day Low Index to activate Soft/Hard Cap evaluation)."
                    : whsResult.hardCapApplied
                    ? `Hard Cap Active (+5.0 ceiling over Low Index ${whsResult.lowIndexAnchor}).`
                    : whsResult.softCapApplied
                    ? `Soft Cap Active (50% suppression past +3.0 strokes above Low Index ${whsResult.lowIndexAnchor}).`
                    : "No Cap Restrictions Active (Normal Range)."}
                </p>
              </div>

              {/* ESR Status */}
              {whsResult.esrApplied && (
                <div className="bg-amber-400/20 backdrop-blur-xs p-3.5 rounded-xl border border-amber-300/30 space-y-1 text-xs">
                  <span className="text-[10px] font-bold uppercase text-amber-200 block">
                    Exceptional Score Reduction (ESR Rule 5.9)
                  </span>
                  <p className="text-white">
                    {whsResult.totalEsrAdjustment}.0 stroke ESR adjustment applied across scoring record.
                  </p>
                </div>
              )}

              {/* Mandatory Regulatory Disclosure */}
              <div className="p-3 bg-black/15 rounded-xl border border-white/10 text-[11px] text-emerald-100 leading-snug">
                <AlertCircle className="h-3.5 w-3.5 inline-block mr-1 text-amber-300" />
                This calculator provides a WHS-based calculation/estimate. An official Handicap Index is issued through an authorized golf club or authorized national association.
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/20 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopySummary}
                className="h-9 text-xs bg-white text-emerald-800 hover:bg-emerald-50 border-0 cursor-pointer font-bold gap-1.5 shadow-xs"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Share Summary"}
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={() => setShowReportModal(true)}
                className="h-9 text-xs bg-emerald-950/40 hover:bg-emerald-950/60 text-white border border-white/30 cursor-pointer font-bold gap-1.5 shadow-xs"
              >
                <Download className="h-3.5 w-3.5" /> PDF Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COURSE & PLAYING HANDICAP FINDER */}
      {activeTab === "course" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Inputs Card */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              Target Course &amp; Format Details (WHS Rule 6)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Player Handicap Index
                </label>
                <Input
                  type="number"
                  value={targetIndex}
                  onChange={(e) => setTargetIndex(Number(e.target.value))}
                  step={0.1}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Course Slope Rating (55 – 155)
                </label>
                <Input
                  type="number"
                  value={targetSlope}
                  onChange={(e) => setTargetSlope(Number(e.target.value))}
                  min={55}
                  max={155}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Course Rating (e.g. 72.1)
                </label>
                <Input
                  type="number"
                  value={targetRating}
                  onChange={(e) => setTargetRating(Number(e.target.value))}
                  step={0.1}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Course Par (e.g. 72)
                </label>
                <Input
                  type="number"
                  value={targetPar}
                  onChange={(e) => setTargetPar(Number(e.target.value))}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Tournament / Format Allowance
              </label>
              <select
                value={allowanceFormat}
                onChange={(e) => setAllowanceFormat(e.target.value as HandicapAllowanceFormat)}
                className="w-full h-10 text-xs font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl cursor-pointer"
              >
                <option value="100_stroke">100% Individual Stroke Play</option>
                <option value="95_fourball">95% Four-Ball Stroke Play</option>
                <option value="85_alternate">85% Alternate Shot / Best Ball</option>
                <option value="scramble_2p">2-Player Scramble (35% A / 15% B)</option>
                <option value="scramble_4p">4-Player Scramble (25% A / 20% B / 15% C / 10% D)</option>
              </select>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 rounded-2xl shadow-md space-y-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-100 border-b border-white/20 pb-2">
                Strokes Received Summary
              </h4>

              <div className="space-y-2">
                <span className="text-xs text-emerald-100 font-medium">Target Course Handicap</span>
                <div className="text-5xl font-black font-sans tabular-nums tracking-tight text-white">
                  {courseResult.courseHandicap}{" "}
                  <span className="text-sm font-sans font-normal">Strokes</span>
                </div>
                <p className="text-[11px] text-emerald-200 font-sans">
                  Formula: {targetIndex} × ({targetSlope} / 113) + ({targetRating} - {targetPar})
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/20">
                <span className="text-xs text-emerald-100 font-medium">
                  Final Playing Handicap ({courseResult.allowancePct}%)
                </span>
                <div className="text-5xl font-black font-sans tabular-nums tracking-tight text-amber-200">
                  {courseResult.playingHandicap}{" "}
                  <span className="text-sm font-sans font-normal text-white">Strokes</span>
                </div>
                <p className="text-[11px] text-emerald-200">
                  Applied format allowance: {courseResult.allowanceLabel}
                </p>
              </div>
            </div>

            <Button
              type="button"
              size="sm"
              onClick={() => setShowReportModal(true)}
              className="w-full h-9 text-xs bg-white text-emerald-800 hover:bg-emerald-50 border-0 cursor-pointer font-bold gap-1.5 shadow-xs"
            >
              <Download className="h-3.5 w-3.5" /> PDF Course Report
            </Button>
          </div>
        </div>
      )}

      {/* TAB 3: SINGLE ROUND DIFFERENTIAL CONVERTER */}
      {activeTab === "single" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              Single Round Differential Quick Converter
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Round Format
                </label>
                <select
                  value={sHoles}
                  onChange={(e) => setSHoles(Number(e.target.value) as 9 | 18)}
                  className="w-full h-10 text-xs font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl cursor-pointer"
                >
                  <option value={18}>18 Holes (Rule 5.1a Standard)</option>
                  <option value={9}>9 Holes (Rule 5.1b Workflow)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {sHoles === 9 ? "9-Hole Adjusted Gross Score" : "18-Hole Adjusted Gross Score"}
                </label>
                <Input
                  type="number"
                  value={sScore}
                  onChange={(e) => setSScore(Number(e.target.value))}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {sHoles === 9 ? "9-Hole Course Rating" : "18-Hole Course Rating"}
                </label>
                <Input
                  type="number"
                  value={sRating}
                  onChange={(e) => setSRating(Number(e.target.value))}
                  step={0.1}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Slope Rating (55 – 155)
                </label>
                <Input
                  type="number"
                  value={sSlope}
                  onChange={(e) => setSSlope(Number(e.target.value))}
                  min={55}
                  max={155}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>

              {sHoles === 9 && (
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                    <span>Player Current Handicap Index (Optional for 2024 WHS Expected Score)</span>
                    <span className="text-[10px] font-normal text-zinc-400">Leave blank for standalone 9-hole component</span>
                  </label>
                  <Input
                    type="number"
                    value={sPlayerIndex}
                    onChange={(e) => setSPlayerIndex(e.target.value)}
                    step={0.1}
                    placeholder="e.g. 15.0"
                    className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                  />
                </div>
              )}

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  PCC Adjustment (enter published daily PCC)
                </label>
                <select
                  value={sPcc}
                  onChange={(e) => setSPcc(Number(e.target.value))}
                  className="w-full h-10 text-xs font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl cursor-pointer"
                >
                  <option value={-1}>-1.0 (Course played easier than normal)</option>
                  <option value={0}>0.0 (Normal daily course conditions)</option>
                  <option value={1}>+1.0 (Course played moderately difficult)</option>
                  <option value={2}>+2.0 (Course played difficult)</option>
                  <option value={3}>+3.0 (Course played significantly difficult)</option>
                </select>
                <p className="text-[11px] text-zinc-500 pt-0.5">
                  The PCC value is entered from the applicable daily PCC result. This calculator does not independently calculate the official course-day PCC.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 rounded-2xl shadow-md space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-100 border-b border-white/20 pb-2">
              {sHoles === 9
                ? sPlayerIndex !== "" && !isNaN(Number(sPlayerIndex))
                  ? "Full 2024 WHS 9-Hole Combined 18-Hole Differential"
                  : "9-hole Score Differential component"
                : "Calculated Score Differential"}
            </h4>

            <div className="text-6xl font-black font-sans tabular-nums tracking-tight text-white">
              {sHoles === 9
                ? sPlayerIndex !== "" && !isNaN(Number(sPlayerIndex))
                  ? single9HoleResult.combined18Differential.toFixed(1)
                  : single9HoleResult.standaloneDiff9.toFixed(1)
                : singleDiff.toFixed(1)}
            </div>

            {sHoles === 9 ? (
              sPlayerIndex !== "" && !isNaN(Number(sPlayerIndex)) ? (
                <div className="space-y-1.5 text-xs text-emerald-100 font-sans border-t border-white/20 pt-2">
                  <p>
                    <strong>1. Standalone 9-Hole Component (unrounded):</strong>{" "}
                    (113 / {sSlope}) × ({sScore} - {sRating} - 0.5 × {sPcc}) = {single9HoleResult.unroundedDiff9.toFixed(4)}
                  </p>
                  <p>
                    <strong>2. Expected 9-Hole Differential:</strong> HI / 2 = {Number(sPlayerIndex).toFixed(1)} / 2 = {single9HoleResult.expectedDiff9.toFixed(1)}
                  </p>
                  <p>
                    <strong>3. Unrounded Combined 18-Hole:</strong> {single9HoleResult.unroundedCombined18.toFixed(4)}
                  </p>
                  <p>
                    <strong>4. Final WHS Tenth-Rounded Differential:</strong> {single9HoleResult.combined18Differential.toFixed(1)}
                  </p>
                </div>
              ) : (
                <div className="space-y-1 text-xs text-emerald-100 font-sans border-t border-white/20 pt-2">
                  <p>
                    Rule 5.1b Formula: (113 / {sSlope}) × ({sScore} - {sRating} - 0.5 × {sPcc})
                  </p>
                  <p>
                    Unrounded value: {single9HoleResult.unroundedDiff9.toFixed(4)} → Rounded component: {single9HoleResult.standaloneDiff9.toFixed(1)}
                  </p>
                </div>
              )
            ) : (
              <p className="text-xs text-emerald-100 font-sans">
                Rule 5.1a Formula: (113 / {sSlope}) × ({sScore} - {sRating} - {sPcc})
              </p>
            )}

            <div className="p-3 bg-black/15 rounded-xl border border-white/10 text-[11px] text-emerald-100 leading-snug">
              {sHoles === 9 ? (
                sPlayerIndex !== "" && !isNaN(Number(sPlayerIndex)) ? (
                  "WHS Rule 5.1b (2024 Revision): The 9-hole differential remains unrounded until combined with the player's expected 9-hole differential based on their current Handicap Index, and only the resulting 18-hole differential is rounded to the nearest tenth (.5 upward)."
                ) : (
                  "9-hole Score Differential component: This is the standalone 9-hole differential component under WHS Rule 5.1b. To calculate the full 2024 WHS 18-hole differential, enter your current Handicap Index above."
                )
              ) : (
                "The Score Differential is rounded to the nearest tenth per WHS Rule 5.1a with .5 rounded upwards algebraically."
              )}
            </div>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={reportData}
      />
    </div>
  );
}
