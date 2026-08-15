"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Dices,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  History,
  Copy,
  Check,
  FileText,
  Hash,
  Zap,
  SlidersHorizontal,
  Wand2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReportModal from "@/components/report/ReportModal";
import { generateGenericReportData } from "@/lib/report-generator/generic-report";
import { dice_rollerConfig } from "@/app/calculators/dice-roller/config";
import {
  rollDice,
  calculateProbabilityStats,
  parseDiceExpression,
  secureRandomInt,
} from "@/app/calculators/dice-roller/calculator";
import {
  RollResult,
  RollHistoryEntry,
  StandardPolyhedralDie,
} from "@/app/calculators/dice-roller/types";

const POLYHEDRAL_SETS: { type: StandardPolyhedralDie; sides: number; color: string; label: string }[] = [
  { type: "d4", sides: 4, color: "from-amber-500 to-orange-600", label: "d4" },
  { type: "d6", sides: 6, color: "from-blue-500 to-indigo-600", label: "d6" },
  { type: "d8", sides: 8, color: "from-emerald-500 to-teal-600", label: "d8" },
  { type: "d10", sides: 10, color: "from-purple-500 to-violet-600", label: "d10" },
  { type: "d12", sides: 12, color: "from-pink-500 to-rose-600", label: "d12" },
  { type: "d20", sides: 20, color: "from-cyan-500 to-blue-600", label: "d20" },
  { type: "d100", sides: 100, color: "from-yellow-500 to-amber-600", label: "d100" },
];

function Dice3DFace({
  value,
  sides,
  isRolling,
  isCritSuccess,
  isCritFumble,
}: {
  value: number;
  sides: number;
  isRolling: boolean;
  isCritSuccess: boolean;
  isCritFumble: boolean;
}) {
  const isPipDie = sides === 6 || (value >= 1 && value <= 6);

  if (isPipDie && value >= 1 && value <= 6) {
    return (
      <div
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-2.5 flex flex-col justify-between border-2 transition-all duration-300 transform shadow-[0_10px_25px_rgba(0,0,0,0.3)] relative overflow-hidden ${
          isRolling
            ? "rotate-[360deg] scale-110 bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-700 border-purple-300 animate-bounce"
            : isCritSuccess
            ? "bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 border-amber-200"
            : isCritFumble
            ? "bg-gradient-to-br from-rose-500 via-red-600 to-rose-700 border-rose-300"
            : "bg-gradient-to-br from-white via-slate-100 to-slate-200 border-slate-300 text-slate-900"
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

        <div className="w-full h-full grid grid-cols-3 grid-rows-3 items-center justify-items-center relative z-10">
          {value === 2 || value === 3 || value === 4 || value === 5 || value === 6 ? (
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-inner ${isRolling || isCritSuccess || isCritFumble ? "bg-white" : "bg-slate-900"}`} />
          ) : <div />}
          <div />
          {value === 4 || value === 5 || value === 6 ? (
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-inner ${isRolling || isCritSuccess || isCritFumble ? "bg-white" : "bg-slate-900"}`} />
          ) : <div />}

          {value === 6 ? (
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-inner ${isRolling || isCritSuccess || isCritFumble ? "bg-white" : "bg-slate-900"}`} />
          ) : <div />}
          {value === 1 || value === 3 || value === 5 ? (
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-inner ${isRolling || isCritSuccess || isCritFumble ? "bg-white" : "bg-slate-900"}`} />
          ) : <div />}
          {value === 6 ? (
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-inner ${isRolling || isCritSuccess || isCritFumble ? "bg-white" : "bg-slate-900"}`} />
          ) : <div />}

          {value === 4 || value === 5 || value === 6 ? (
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-inner ${isRolling || isCritSuccess || isCritFumble ? "bg-white" : "bg-slate-900"}`} />
          ) : <div />}
          <div />
          {value === 2 || value === 3 || value === 4 || value === 5 || value === 6 ? (
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-inner ${isRolling || isCritSuccess || isCritFumble ? "bg-white" : "bg-slate-900"}`} />
          ) : <div />}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl font-black font-sans tabular-nums border-2 shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all duration-300 transform relative overflow-hidden ${
        isRolling
          ? "rotate-[360deg] scale-110 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 border-purple-300 text-white animate-bounce"
          : isCritSuccess
          ? "bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 border-amber-200 text-white shadow-amber-500/40"
          : isCritFumble
          ? "bg-gradient-to-br from-rose-500 via-red-600 to-rose-700 border-rose-300 text-white shadow-rose-500/40"
          : "bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 border-purple-300 text-white"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
      <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{value}</span>
    </div>
  );
}

function RollHistoryItem({ item }: { item: RollHistoryEntry }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const diceValues = useMemo(() => {
    return item.summary
      .split(/[,|]+/)
      .map((s) => s.trim().replace(/[\[\]]/g, ""))
      .filter((s) => s.length > 0);
  }, [item.summary]);

  const hasMultipleDice = diceValues.length > 3;

  return (
    <div className="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl p-2.5 transition-all shadow-2xs space-y-2">
      <div
        onClick={() => hasMultipleDice && setIsExpanded(!isExpanded)}
        className={`flex items-center justify-between gap-2 text-xs font-sans tabular-nums font-bold ${
          hasMultipleDice ? "cursor-pointer select-none" : ""
        }`}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 font-extrabold text-[11px] shrink-0 border border-purple-200 dark:border-purple-800">
            {item.expression}
          </span>
          {!isExpanded && (
            <span className="text-slate-500 dark:text-zinc-400 truncate text-[10px]">
              {diceValues.slice(0, 4).join(", ")}
              {diceValues.length > 4 && ` (+${diceValues.length - 4} more)`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-xs">
            TOTAL: {item.total}
          </span>
          {hasMultipleDice && (
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
            >
              {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="pt-2 border-t border-slate-100 dark:border-zinc-700/80 space-y-1.5">
          <div className="flex items-center justify-between text-[9px] font-extrabold uppercase text-slate-400 dark:text-zinc-400 tracking-wider">
            <span>All Rolled Dice ({diceValues.length} Total):</span>
            <span className="text-purple-600 dark:text-purple-400 font-bold font-sans tabular-nums">{item.timestamp}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {diceValues.map((val, idx) => (
              <span
                key={idx}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-zinc-700 text-slate-800 dark:text-zinc-200 text-[11px] font-extrabold flex items-center justify-center border border-slate-200 dark:border-zinc-600 shadow-2xs"
              >
                {val}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function DiceRollerCalculator() {
  // Mode State: "simple" | "advanced"
  const [activeTab, setActiveTab] = useState<"simple" | "advanced">("simple");

  // Simple Mode Inputs
  const [simpleDiceCount, setSimpleDiceCount] = useState<number>(2);
  const [simpleDiceSides, setSimpleDiceSides] = useState<number>(6);
  const [simpleModifier, setSimpleModifier] = useState<number>(0);

  // Advanced Mode Inputs
  const [formulaInput, setFormulaInput] = useState<string>("4d6kh3 + 5");
  const [customSides, setCustomSides] = useState<number>(20);

  // Active Roll Result & Smooth Animation States
  const [currentResult, setCurrentResult] = useState<RollResult | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [animatedFaceValues, setAnimatedFaceValues] = useState<number[]>([4, 6, 5, 2]);
  const [rollHistory, setRollHistory] = useState<RollHistoryEntry[]>([]);

  // UI States
  const [copied, setCopied] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [isLogExpanded, setIsLogExpanded] = useState<boolean>(false);

  // Sync formula when simple inputs change
  useEffect(() => {
    if (activeTab === "simple") {
      let expr = `${simpleDiceCount}d${simpleDiceSides}`;
      if (simpleModifier > 0) expr += ` + ${simpleModifier}`;
      if (simpleModifier < 0) expr += ` - ${Math.abs(simpleModifier)}`;
      setFormulaInput(expr);
    }
  }, [simpleDiceCount, simpleDiceSides, simpleModifier, activeTab]);

  // Perform initial roll on mount
  useEffect(() => {
    const initialRes = rollDice("2d6");
    setCurrentResult(initialRes);
    setRollHistory([
      {
        id: "1",
        expression: "2d6",
        total: initialRes.total,
        timestamp: initialRes.timestamp,
        summary: initialRes.diceGroups.map((g) => g.rolls.map((r) => r.finalValue).join(", ")).join(" | "),
      },
    ]);
  }, []);

  // Handle Roll Action with Smooth Rolling Animation
  const handleRoll = (exprToRoll?: string) => {
    const targetExpr = exprToRoll || formulaInput || "1d20";
    setIsRolling(true);

    // Rapid numbers flickering animation interval
    let tickCount = 0;
    const animInterval = setInterval(() => {
      tickCount++;
      const tempVals = [
        secureRandomInt(1, simpleDiceSides || 6),
        secureRandomInt(1, simpleDiceSides || 6),
        secureRandomInt(1, simpleDiceSides || 6),
      ];
      setAnimatedFaceValues(tempVals);

      if (tickCount >= 10) {
        clearInterval(animInterval);
        const res = rollDice(targetExpr);
        setCurrentResult(res);
        setIsRolling(false);

        // Update active animated faces from settled result
        const settledVals = res.diceGroups.flatMap((g) => g.rolls.map((r) => r.finalValue));
        setAnimatedFaceValues(settledVals.length > 0 ? settledVals : [res.total]);

        // Add to session history
        const newEntry: RollHistoryEntry = {
          id: Date.now().toString(),
          expression: targetExpr,
          total: res.total,
          timestamp: res.timestamp,
          summary: res.diceGroups
            .map((g) => g.rolls.map((r) => (r.isKept ? `${r.finalValue}` : `[${r.finalValue}]`)).join(", "))
            .join(" | "),
        };

        setRollHistory((prev) => [newEntry, ...prev.slice(0, 19)]);
      }
    }, 50);
  };

  // Preset Handlers
  const applyPreset = (expr: string) => {
    setFormulaInput(expr);
    handleRoll(expr);
  };

  // Append a die to current formula string cleanly
  const appendDieToFormula = (dieLabel: string) => {
    setFormulaInput((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return `1${dieLabel}`;
      return `${trimmed} + 1${dieLabel}`;
    });
  };

  // Live Probability Analysis for current formula
  const probabilityAnalysis = useMemo(() => {
    try {
      const { diceTerms, constantModifier } = parseDiceExpression(formulaInput || "1d20");
      if (diceTerms.length === 1) {
        return calculateProbabilityStats(diceTerms[0].count, diceTerms[0].sides, constantModifier);
      }
      return calculateProbabilityStats(diceTerms[0].count, diceTerms[0].sides, constantModifier);
    } catch (e) {
      return calculateProbabilityStats(1, 20, 0);
    }
  }, [formulaInput]);

  // Copy Roll Log
  const handleCopyLog = () => {
    if (!currentResult) return;
    const logStr = `Roll: ${currentResult.expression} => TOTAL: ${currentResult.total}\nDetails: ${currentResult.diceGroups
      .map((g) => `${g.expression}: [${g.rolls.map((r) => r.finalValue).join(", ")}]`)
      .join("; ")}`;
    navigator.clipboard.writeText(logStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // PDF Report Data
  const reportData = useMemo(() => {
    return generateGenericReportData(
      dice_rollerConfig,
      {
        diceCount: simpleDiceCount,
        diceSides: simpleDiceSides,
        modifier: simpleModifier,
      },
      {
        success: true,
        data: {},
        formatted: {
          mean: `${probabilityAnalysis.mean}`,
          minMax: `${probabilityAnalysis.min} – ${probabilityAnalysis.max}`,
          stdDev: `${probabilityAnalysis.stdDev}`,
        },
      }
    );
  }, [simpleDiceCount, simpleDiceSides, simpleModifier, probabilityAnalysis]);

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="bg-slate-50 dark:bg-zinc-900 p-3.5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-600/10 rounded-xl text-purple-600 dark:text-purple-400">
            <Dices className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-zinc-100">
              Virtual Polyhedral &amp; TTRPG Dice Station
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">
              Cryptographically Secure CSPRNG (`window.crypto`) • Smooth Roll Physics &amp; Probability Analysis
            </p>
          </div>
        </div>

        {/* CSPRNG Security Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>CSPRNG Hardware Random</span>
        </div>
      </div>

      {/* WORKSPACE 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (Col 7) - INPUTS & MODE SELECTOR */}
        <div className="lg:col-span-7 space-y-4">
          {/* MODE SWITCHER TABS */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-zinc-800/80 rounded-xl border border-slate-200 dark:border-zinc-700">
            <button
              onClick={() => setActiveTab("simple")}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "simple"
                  ? "bg-white dark:bg-zinc-900 text-purple-700 dark:text-purple-300 shadow-xs"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Simple Quick Roller
            </button>
            <button
              onClick={() => setActiveTab("advanced")}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "advanced"
                  ? "bg-white dark:bg-zinc-900 text-purple-700 dark:text-purple-300 shadow-xs"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
              }`}
            >
              <Wand2 className="h-4 w-4" />
              Advanced TTRPG Formula Pad
            </button>
          </div>

          {/* MODE 1: SIMPLE QUICK ROLLER */}
          {activeTab === "simple" && (
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-5">
              <div className="border-b border-slate-100 dark:border-zinc-800 pb-3">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-zinc-100 uppercase tracking-wider">
                  Quick Dice Selection
                </h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Select quantity, die type, and optional modifier for an instant smooth roll.
                </p>
              </div>

              {/* Number of Dice Slider & Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-zinc-300">
                  <label htmlFor="dice-count-input-simple">Number of Dice:</label>
                  <span className="font-sans tabular-nums text-purple-600 dark:text-purple-400 text-sm font-extrabold">
                    {simpleDiceCount} {simpleDiceCount === 1 ? "Die" : "Dice"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    id="dice-count-input-simple"
                    aria-label="Number of Dice"
                    type="range"
                    min={1}
                    max={20}
                    value={simpleDiceCount}
                    onChange={(e) => setSimpleDiceCount(Number(e.target.value))}
                    className="flex-1 accent-purple-600 h-2 bg-slate-100 dark:bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <Input
                    type="number"
                    min={1}
                    max={50}
                    value={simpleDiceCount}
                    onChange={(e) => setSimpleDiceCount(Math.max(1, Number(e.target.value)))}
                    className="w-20 h-9 text-xs font-sans tabular-nums font-bold bg-slate-50 dark:bg-zinc-800 text-center"
                  />
                </div>
              </div>

              {/* Die Type Selection Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 block">
                  Die Type (Sides):
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {POLYHEDRAL_SETS.map((die) => (
                    <button
                      key={die.type}
                      type="button"
                      onClick={() => setSimpleDiceSides(die.sides)}
                      className={`h-11 rounded-xl text-xs font-extrabold flex items-center justify-center shadow-xs transition-all cursor-pointer ${
                        simpleDiceSides === die.sides
                          ? `bg-gradient-to-br ${die.color} text-white ring-2 ring-purple-500 scale-105`
                          : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {die.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Sides & Modifier Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <div className="space-y-1.5">
                  <label htmlFor="custom-sides-input-simple" className="text-xs font-bold text-slate-700 dark:text-zinc-300 block">Custom Die (Sides d):</label>
                  <Input
                    id="custom-sides-input-simple"
                    type="number"
                    min={2}
                    max={1000}
                    value={simpleDiceSides}
                    onChange={(e) => setSimpleDiceSides(Math.max(2, Number(e.target.value)))}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="simple-modifier-input-box" className="text-xs font-bold text-slate-700 dark:text-zinc-300 block">Modifier (+/-):</label>
                  <Input
                    id="simple-modifier-input-box"
                    type="number"
                    value={simpleModifier}
                    onChange={(e) => setSimpleModifier(Number(e.target.value))}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>
              </div>

              {/* BIG ROLL BUTTON */}
              <div className="pt-2">
                <Button
                  onClick={() => handleRoll()}
                  disabled={isRolling}
                  className={`w-full h-12 text-base font-extrabold uppercase tracking-wider rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md active:translate-y-0.5 transition-all cursor-pointer ${
                    isRolling ? "animate-pulse" : ""
                  }`}
                >
                  <Dices className={`h-5 w-5 mr-2 ${isRolling ? "animate-spin" : ""}`} />
                  {isRolling ? "Rolling Dice..." : "ROLL DICE NOW"}
                </Button>
              </div>
            </div>
          )}

          {/* MODE 2: ADVANCED TTRPG FORMULA PAD (STREAMLINED & UNCONFUSED) */}
          {activeTab === "advanced" && (
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                    <Hash className="h-4 w-4 text-purple-600 dark:text-purple-400" /> TTRPG Formula Expression
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Type custom RPG expressions or tap die buttons to build your formula.
                  </p>
                </div>

                <button
                  onClick={() => setFormulaInput("1d20")}
                  className="text-[10px] text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" /> Reset Formula
                </button>
              </div>

              {/* FORMULA INPUT FIELD */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="advanced-formula-input-box" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Active Formula Notation:
                  </label>
                  <span className="text-[10px] font-sans tabular-nums text-purple-600 dark:text-purple-400 font-bold">
                    Supports kh, kl, !, r&lt;=, &gt;=
                  </span>
                </div>
                <Input
                  id="advanced-formula-input-box"
                  type="text"
                  value={formulaInput}
                  onChange={(e) => setFormulaInput(e.target.value)}
                  placeholder="e.g. 4d6kh3 + 5, 2d20kh1, 3d6!"
                  className="h-11 text-base font-sans tabular-nums font-bold bg-slate-50 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-purple-700 dark:text-purple-300"
                />
              </div>

              {/* QUICK DIE TAP ATTACH BUTTONS */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 block">
                  Quick Add Die to Formula:
                </span>
                <div className="flex flex-wrap gap-2">
                  {POLYHEDRAL_SETS.map((die) => (
                    <button
                      key={die.type}
                      type="button"
                      onClick={() => appendDieToFormula(die.type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold bg-gradient-to-r ${die.color} text-white shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1`}
                    >
                      + {die.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendDieToFormula(`d${customSides}`)}
                    className="px-3 py-1.5 rounded-lg text-xs font-extrabold bg-slate-800 text-white dark:bg-zinc-700 hover:bg-slate-700 shadow-xs cursor-pointer"
                  >
                    + d{customSides}
                  </button>
                </div>
              </div>

              {/* TTRPG PRESET CHIPS */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 block">
                  Popular TTRPG Rule Presets:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "D&D Stat (4d6kh3)", expr: "4d6kh3" },
                    { label: "Advantage (2d20kh1)", expr: "2d20kh1" },
                    { label: "Disadvantage (2d20kl1)", expr: "2d20kl1" },
                    { label: "Fireball (8d6)", expr: "8d6" },
                    { label: "Exploding (3d6!)", expr: "3d6!" },
                    { label: "Percentile (d100)", expr: "1d100" },
                  ].map((chip) => (
                    <button
                      key={chip.label}
                      onClick={() => applyPreset(chip.expr)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-xs font-extrabold text-slate-800 dark:text-zinc-200 hover:bg-purple-100 hover:text-purple-800 dark:hover:bg-purple-950/60 border border-slate-200 dark:border-zinc-700 cursor-pointer active:scale-95 transition-all"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* BIG ROLL BUTTON */}
              <div className="pt-2">
                <Button
                  onClick={() => handleRoll()}
                  disabled={isRolling}
                  className={`w-full h-12 text-base font-extrabold uppercase tracking-wider rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md active:translate-y-0.5 transition-all cursor-pointer ${
                    isRolling ? "animate-pulse" : ""
                  }`}
                >
                  <Dices className={`h-5 w-5 mr-2 ${isRolling ? "animate-spin" : ""}`} />
                  {isRolling ? "Rolling Dice..." : "ROLL DICE NOW"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (Col 5) - LIGHT ADAPTIVE RESULT CARD */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4 text-slate-900 dark:text-zinc-100">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" /> Live Roll Result
            </span>
            {currentResult?.hasCritSuccess && (
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 flex items-center gap-1 shadow-xs">
                <Sparkles className="h-3 w-3 text-amber-600 dark:text-amber-400" /> CRITICAL SUCCESS!
              </span>
            )}
            {currentResult?.hasCritFumble && !currentResult.hasCritSuccess && (
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700 flex items-center gap-1 shadow-xs">
                <ShieldAlert className="h-3 w-3 text-rose-600 dark:text-rose-400" /> CRITICAL FUMBLE!
              </span>
            )}
          </div>

          {/* DYNAMIC ANIMATED SMOOTH ROLLING VISUAL CANVAS (LIGHTER THEME) */}
          <div className="text-center bg-slate-50 dark:bg-zinc-800/80 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700 relative overflow-hidden space-y-3 shadow-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              {currentResult?.isTargetSuccessMode ? "Successes Counted" : "Total Dice Sum"}
            </span>

            {/* Smooth Tumbling Visual Dice Cluster */}
            <div className="flex flex-wrap items-center justify-center gap-3 min-h-[64px] py-1">
              {animatedFaceValues.slice(0, 6).map((val, idx) => (
                <Dice3DFace
                  key={idx}
                  value={val}
                  sides={simpleDiceSides}
                  isRolling={isRolling}
                  isCritSuccess={!!currentResult?.hasCritSuccess}
                  isCritFumble={!!currentResult?.hasCritFumble}
                />
              ))}
            </div>

            <div className="text-4xl sm:text-5xl font-black font-sans tabular-nums tracking-tight text-slate-900 dark:text-zinc-100">
              {currentResult ? currentResult.total : 0}
            </div>

            <span className="text-xs font-sans tabular-nums font-bold text-purple-700 dark:text-purple-300 block">
              Formula: {currentResult?.expression || "1d20"}
            </span>
          </div>

          {/* INDIVIDUAL DICE BREAKDOWN TAGS */}
          {currentResult && currentResult.diceGroups.length > 0 && (
            <div className="bg-slate-50 dark:bg-zinc-800/60 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400 block">
                Individual Dice Breakdown
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentResult.diceGroups.map((group, gIdx) =>
                  group.rolls.map((r, rIdx) => (
                    <span
                      key={`${gIdx}-${rIdx}`}
                      className={`px-2.5 py-1 rounded-lg text-xs font-sans tabular-nums font-extrabold border transition-all ${
                        !r.isKept
                          ? "bg-slate-200 text-slate-500 dark:bg-zinc-800 dark:text-zinc-500 border-slate-300 dark:border-zinc-700 line-through opacity-60"
                          : r.isCriticalSuccess
                          ? "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 border-amber-300 dark:border-amber-700"
                          : r.isCriticalFumble
                          ? "bg-rose-100 text-rose-900 dark:bg-rose-950/60 dark:text-rose-200 border-rose-300 dark:border-rose-700"
                          : "bg-purple-50 text-purple-900 dark:bg-purple-950/50 dark:text-purple-200 border-purple-200 dark:border-purple-800"
                      }`}
                    >
                      {r.dieType}: {r.finalValue}
                      {r.isExploded && "!"}
                    </span>
                  ))
                )}
              </div>
            </div>
          )}

          {/* LIVE PROBABILITY MASS DISTRIBUTION (SVG BELL CURVE) */}
          <div className="bg-slate-50 dark:bg-zinc-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-zinc-700 space-y-2">
            <div className="flex items-center justify-between text-xs border-b border-slate-200 dark:border-zinc-700 pb-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Probability Bell Curve (PMF)
              </span>
              <span className="text-[10px] font-sans tabular-nums text-emerald-700 dark:text-emerald-400 font-extrabold">
                μ = {probabilityAnalysis.mean} | σ = {probabilityAnalysis.stdDev}
              </span>
            </div>

            {/* SVG Distribution Canvas */}
            <div className="h-32 w-full relative flex items-center justify-center pt-1">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100">
                <defs>
                  <linearGradient id="bellGradLight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {(() => {
                  const pts = probabilityAnalysis.pmf;
                  if (pts.length === 0) return null;
                  const maxP = Math.max(...pts.map((p) => p.percent)) || 1;
                  const stepX = 260 / Math.max(1, pts.length - 1);

                  const pathD = pts
                    .map((p, idx) => {
                      const x = 20 + idx * stepX;
                      const y = 85 - (p.percent / maxP) * 65;
                      return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                    })
                    .join(" ");

                  const areaD = `${pathD} L ${20 + (pts.length - 1) * stepX} 85 L 20 85 Z`;

                  return (
                    <g>
                      {/* Baseline */}
                      <line x1="20" y1="85" x2="280" y2="85" stroke="#cbd5e1" strokeWidth="1" />

                      {/* Filled Curve Area */}
                      <path d={areaD} fill="url(#bellGradLight)" />

                      {/* Stroke Curve Line */}
                      <path d={pathD} fill="none" stroke="#7e22ce" strokeWidth="2.5" />

                      {/* Expected Mean Marker */}
                      {(() => {
                        const meanIdx = Math.floor(pts.length / 2);
                        const mx = 20 + meanIdx * stepX;
                        return (
                          <g>
                            <line x1={mx} y1="15" x2={mx} y2="85" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 2" />
                            <text x={mx} y="10" textAnchor="middle" fill="#047857" fontSize="8" fontWeight="bold">
                              Mean: {probabilityAnalysis.mean}
                            </text>
                          </g>
                        );
                      })()}

                      {/* Min / Max Labels */}
                      <text x="20" y="96" textAnchor="start" fill="#64748b" fontSize="8" fontWeight="bold">
                        Min: {probabilityAnalysis.min}
                      </text>
                      <text x="280" y="96" textAnchor="end" fill="#64748b" fontSize="8" fontWeight="bold">
                        Max: {probabilityAnalysis.max}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* EXPANDABLE SESSION ROLL HISTORY & EXPORT BUTTONS */}
          <div className="bg-slate-50 dark:bg-zinc-800/60 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1">
                <History className="h-3.5 w-3.5" /> Session Roll Log ({rollHistory.length})
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyLog}
                  className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-zinc-700 hover:bg-slate-300 dark:hover:bg-zinc-600 text-[10px] font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1 cursor-pointer transition-all"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied!" : "Copy Log"}
                </button>

                <button
                  onClick={() => setShowReportModal(true)}
                  className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-[10px] font-bold text-white flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                >
                  <FileText className="h-3 w-3" /> PDF Export
                </button>
              </div>
            </div>

            {/* Expandable History Items List */}
            <div className="space-y-2">
              {(isLogExpanded ? rollHistory : rollHistory.slice(0, 3)).map((item) => (
                <RollHistoryItem key={item.id} item={item} />
              ))}
            </div>

            {/* Expand / Collapse Button */}
            {rollHistory.length > 3 && (
              <button
                type="button"
                onClick={() => setIsLogExpanded(!isLogExpanded)}
                className="w-full py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center justify-center gap-1 transition-all cursor-pointer border border-slate-200 dark:border-zinc-700"
              >
                <span>{isLogExpanded ? "Show Less" : `View All (${rollHistory.length}) Rolls`}</span>
                {isLogExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* REPORT MODAL */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={reportData}
      />
    </div>
  );
}
