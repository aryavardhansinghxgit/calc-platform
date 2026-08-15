"use client";

import React, { useState, useMemo } from "react";
import {
  Trophy,
  Plus,
  Trash2,
  Download,
  Share2,
  Printer,
  Check,
  Globe,
  Sliders,
  Flag,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Calculator,
  ArrowRightLeft,
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
} from "@/app/calculators/golf-handicap-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function GolfHandicapCalculator() {
  // Tabs
  const [activeTab, setActiveTab] = useState<"whs" | "course" | "single">("whs");

  // Tab 1: WHS 20-Round Matrix State
  const [lowIndexAnchor, setLowIndexAnchor] = useState<number | undefined>(undefined);
  const [rounds, setRounds] = useState<GolfRound[]>([
    { id: "1", score: 82, courseRating: 71.5, slopeRating: 124, pcc: 0, holes: 18 },
    { id: "2", score: 85, courseRating: 72.0, slopeRating: 128, pcc: 0, holes: 18 },
    { id: "3", score: 79, courseRating: 70.8, slopeRating: 120, pcc: 0, holes: 18 },
    { id: "4", score: 88, courseRating: 73.1, slopeRating: 132, pcc: 0, holes: 18 },
    { id: "5", score: 84, courseRating: 71.8, slopeRating: 122, pcc: 0, holes: 18 },
    { id: "6", score: 81, courseRating: 71.0, slopeRating: 121, pcc: 0, holes: 18 },
    { id: "7", score: 86, courseRating: 72.4, slopeRating: 126, pcc: 0, holes: 18 },
    { id: "8", score: 80, courseRating: 70.5, slopeRating: 119, pcc: 0, holes: 18 },
  ]);

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

  // Modals & Copy
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // WHS Matrix Calculation
  const whsResult: WHSHandicapResult = useMemo(() => {
    return calculateWHSHandicapIndex(rounds, lowIndexAnchor);
  }, [rounds, lowIndexAnchor]);

  // Course Handicap Calculation
  const courseResult = useMemo(() => {
    return calculateCourseHandicap(targetIndex, targetSlope, targetRating, targetPar, allowanceFormat);
  }, [targetIndex, targetSlope, targetRating, targetPar, allowanceFormat]);

  // Single Round Differential Calculation
  const singleDiff = useMemo(() => {
    return calculateScoreDifferential(sScore, sRating, sSlope, sPcc);
  }, [sScore, sRating, sSlope, sPcc]);

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
      rounds.map((r) => (r.id === id ? { ...r, [field]: Number(val) || 0 } : r))
    );
  };

  // Copy Summary
  const handleCopySummary = () => {
    let text = `⛳ CalcPlatform WHS Golf Handicap Card:\n`;
    text += `Handicap Index: ${whsResult.finalHandicapIndex}\n`;
    text += `Rounds Submitted: ${whsResult.roundsSubmitted} (${whsResult.countingRoundsCount} counting)\n`;
    text += `WHS Rule: ${whsResult.whsRuleNote}\n`;
    if (whsResult.softCapApplied) text += `[Soft Cap Triggered]\n`;
    if (whsResult.hardCapApplied) text += `[Hard Cap Triggered]\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download CSV
  const handleDownloadCSV = () => {
    let csv = "Round,Score,Course Rating,Slope Rating,PCC,Differential,Status\n";
    whsResult.differentials.forEach((d, idx) => {
      csv += `${idx + 1},${d.score},${d.courseRating},${d.slopeRating},${d.pcc},${d.differential},${
        d.isCounting ? "Counting" : "Dropped"
      }\n`;
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
        reportTitle: "Official WHS Golf Handicap Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Golf Handicap Calculator",
      },
      keyMetrics: [
        { label: "WHS Handicap Index", value: String(whsResult.finalHandicapIndex), highlight: true },
        { label: "Submitted Rounds", value: `${whsResult.roundsSubmitted} Rounds` },
        { label: "Counting Differentials", value: `Best ${whsResult.countingRoundsCount}` },
        { label: "Target Course Handicap", value: `${courseResult.courseHandicap} Strokes` },
      ],
      sections: [
        {
          title: "WHS Calculation Rule & Status",
          items: [
            { label: "Active WHS Scale Rule", value: whsResult.whsRuleNote },
            { label: "Uncapped Raw Index", value: String(whsResult.rawUncappedIndex) },
            { label: "Low Index Anchor (365-day)", value: whsResult.lowIndexAnchor ? String(whsResult.lowIndexAnchor) : "None" },
            { label: "Cap Safeguards Status", value: whsResult.hardCapApplied ? "Hard Cap (Max +5.0)" : whsResult.softCapApplied ? "Soft Cap (50% suppression)" : "Normal Range" },
          ],
        },
        {
          title: "Target Course & Playing Handicap",
          items: [
            { label: "Format Allowance", value: courseResult.allowanceLabel },
            { label: "Calculated Course Handicap", value: `${courseResult.courseHandicap} Strokes` },
            { label: "Final Playing Handicap", value: `${courseResult.playingHandicap} Strokes` },
          ],
        },
      ],
      table: {
        title: "20-Round Differential History",
        headers: [
          { key: "round", label: "Round #" },
          { key: "score", label: "Gross Score" },
          { key: "rating", label: "Rating / Slope" },
          { key: "diff", label: "Differential" },
          { key: "status", label: "Status" },
        ],
        rows: whsResult.differentials.map((d, i) => ({
          round: `Round ${i + 1}`,
          score: d.score,
          rating: `${d.courseRating} / ${d.slopeRating}`,
          diff: d.differential,
          status: d.isCounting ? "Counting (Best)" : "Dropped",
        })),
      },
    };
  }, [whsResult, courseResult]);

  return (
    <div className="space-y-6">
      {/* 1. TOP TAB NAVIGATION BAR */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200/70 dark:border-zinc-700">
          <button
            onClick={() => setActiveTab("whs")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "whs"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-zinc-500"
            }`}
          >
            <Trophy className="h-3.5 w-3.5" /> 1–20 Round WHS Matrix
          </button>

          <button
            onClick={() => setActiveTab("course")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "course"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-zinc-500"
            }`}
          >
            <Flag className="h-3.5 w-3.5" /> Course & Playing Handicap
          </button>

          <button
            onClick={() => setActiveTab("single")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "single"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-zinc-500"
            }`}
          >
            <Calculator className="h-3.5 w-3.5" /> Single Round Differential
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handleDownloadCSV}
            variant="outline"
            size="sm"
            className="h-8 text-xs font-bold gap-1 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" /> CSV
          </Button>

          <Button
            onClick={() => setShowReportModal(true)}
            variant="outline"
            size="sm"
            className="h-8 text-xs font-bold gap-1 cursor-pointer bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200"
          >
            <Printer className="h-3.5 w-3.5" /> PDF Card
          </Button>
        </div>
      </div>

      {/* 2. TAB CONTENT PANES */}
      {activeTab === "whs" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT: 20-ROUND SCORE GRID (Col 7) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">WHS 20-Round Differential Matrix
                </h3>
                <p className="text-[11px] text-zinc-500">
                  {whsResult.whsRuleNote}
                </p>
              </div>

              <Button
                onClick={handleAddRound}
                disabled={rounds.length >= 20}
                size="sm"
                className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer gap-1"
              >
                <Plus className="h-3.5 w-3.5" /> Add Round ({rounds.length}/20)
              </Button>
            </div>

            {/* Optional Low Index Anchor Input */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl flex items-center justify-between text-xs gap-3">
              <label className="font-bold text-zinc-700 dark:text-zinc-300">
                Low Handicap Index Anchor (Past 365 Days)
              </label>
              <Input
                type="number"
                placeholder="e.g. 9.5"
                value={lowIndexAnchor ?? ""}
                onChange={(e) =>
                  setLowIndexAnchor(e.target.value ? Number(e.target.value) : undefined)
                }
                step={0.1}
                className="h-8 w-28 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
              />
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
                    <th className="p-2">PCC</th>
                    <th className="p-2">Diff</th>
                    <th className="p-2 font-sans">Status</th>
                    <th className="p-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {whsResult.differentials.map((diffItem, index) => {
                    const roundObj = rounds[index];
                    return (
                      <tr
                        key={roundObj.id}
                        className={diffItem.isCounting ? "bg-emerald-50/50 dark:bg-emerald-950/20 font-bold" : ""}
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
                          <Input
                            type="number"
                            value={roundObj.pcc || 0}
                            onChange={(e) => handleUpdateRound(roundObj.id, "pcc", e.target.value)}
                            className="h-7 w-14 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                          />
                        </td>
                        <td className="p-2 font-bold text-emerald-600 dark:text-emerald-400">
                          {diffItem.differential}
                        </td>
                        <td className="p-2 font-sans">
                          {diffItem.isCounting ? (
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
                            onClick={() => handleRemoveRound(roundObj.id)}
                            disabled={rounds.length <= 1}
                            className="text-zinc-400 hover:text-rose-500 disabled:opacity-30 cursor-pointer"
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
          </div>

          {/* RIGHT: HANDICAP INDEX RESULT CARD (Col 5) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 fill-white" /> Official WHS Handicap Index
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                  USGA / R&A
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-6xl font-black font-sans tabular-nums tracking-tight text-white">
                  {whsResult.finalHandicapIndex}
                </div>
                <p className="text-xs text-emerald-100 font-medium">
                  Calculated from best <strong>{whsResult.countingRoundsCount}</strong> of <strong>{whsResult.roundsSubmitted}</strong> rounds.
                </p>
              </div>

              {/* Safeguard Status */}
              <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase text-emerald-200 block">Safeguards & Caps</span>
                <p className="text-white">
                  {whsResult.hardCapApplied
                    ? "Hard Cap Active (+5.0 ceiling applied over Low Index)."
                    : whsResult.softCapApplied
                    ? "Soft Cap Active (50% suppression past +3.0 strokes)."
                    : "No Cap Restrictions Active."}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/20">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopySummary}
                className="h-9 text-xs bg-white text-emerald-800 hover:bg-emerald-50 border-0 cursor-pointer font-bold gap-1.5 shadow-xs"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                {copied ? "Copied Handicap" : "Share Handicap"}
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
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">Target Course & Format Details
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
                  {courseResult.courseHandicap} <span className="text-sm font-sans font-normal">Strokes</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/20">
                <span className="text-xs text-emerald-100 font-medium">Final Playing Handicap ({courseResult.allowancePct}%)</span>
                <div className="text-5xl font-black font-sans tabular-nums tracking-tight text-amber-200">
                  {courseResult.playingHandicap} <span className="text-sm font-sans font-normal text-white">Strokes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SINGLE ROUND DIFFERENTIAL CONVERTER */}
      {activeTab === "single" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">Single Round Differential Quick Converter
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Gross Score</label>
                <Input
                  type="number"
                  value={sScore}
                  onChange={(e) => setSScore(Number(e.target.value))}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Course Rating</label>
                <Input
                  type="number"
                  value={sRating}
                  onChange={(e) => setSRating(Number(e.target.value))}
                  step={0.1}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Slope Rating</label>
                <Input
                  type="number"
                  value={sSlope}
                  onChange={(e) => setSSlope(Number(e.target.value))}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">PCC Adjustment</label>
                <Input
                  type="number"
                  value={sPcc}
                  onChange={(e) => setSPcc(Number(e.target.value))}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 rounded-2xl shadow-md space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-100 border-b border-white/20 pb-2">
              Calculated Score Differential
            </h4>
            <div className="text-6xl font-black font-sans tabular-nums tracking-tight text-white">
              {singleDiff}
            </div>
            <p className="text-xs text-emerald-100">
              Formula: (113 / {sSlope}) × ({sScore} - {sRating} - {sPcc})
            </p>
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
