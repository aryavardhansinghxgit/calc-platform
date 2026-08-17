"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Scale,
  Award,
  Download,
  Trash2,
  FileSpreadsheet,
  Copy,
  Check,
  RefreshCw,
  Info,
  Calendar,
  Target,
  ShieldCheck,
  User,
  Activity,
  HeartPulse,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  calculateIdealWeight,
  evaluateFrameSizeFromWrist,
  UnitSystem,
  Gender,
  FrameSize,
  IdealWeightResult,
} from "@/lib/formulas/idealWeight";

// ─── Local Storage Persistence Hook ─────────────────────────────────────────

interface SavedEstimate<T> {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: T;
  notes: string;
}

function flashSave(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
}

function useCardSaved<T>(storageKey: string) {
  const [saved, setSaved] = useState<SavedEstimate<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: T, notes = "") => {
      const entry: SavedEstimate<T> = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        inputSummary,
        result,
        notes,
      };
      setSaved((prev) => {
        const next = [entry, ...prev].slice(0, 15);
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [storageKey]
  );

  const remove = useCallback(
    (id: string) => {
      setSaved((prev) => {
        const next = prev.filter((e) => e.id !== id);
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [storageKey]
  );

  const clear = useCallback(() => {
    setSaved([]);
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }, [storageKey]);

  return { saved, isOpen, setIsOpen, save, remove, clear };
}

// ─── UI Helper Components ───────────────────────────────────────────────────

function CardWrapper({
  title,
  children,
  hasResult,
  isSaved,
  savedCount,
  onToggleSaved,
  onSave,
}: {
  title: string;
  children: React.ReactNode;
  hasResult?: boolean;
  isSaved?: boolean;
  savedCount?: number;
  onToggleSaved?: () => void;
  onSave?: () => void;
}) {
  return (
    <div className="border border-blue-600/30 dark:border-blue-500/30 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-zinc-900 transition-all">
      <div className="bg-blue-600 text-white px-3.5 py-1.5 flex items-center justify-between">
        <h3 className="font-bold text-xs tracking-wide text-white">{title}</h3>
        {hasResult && onSave && (
          <div className="flex items-center gap-1.5">
            {savedCount !== undefined && savedCount > 0 && onToggleSaved && (
              <button
                type="button"
                onClick={onToggleSaved}
                className="text-[10px] bg-white/20 hover:bg-white/30 text-white font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                title="View saved calculations"
              >
                {savedCount} saved
              </button>
            )}
            <button
              type="button"
              onClick={onSave}
              className={`text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer transition-all ${
                isSaved
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-blue-700 hover:bg-blue-50 shadow-xs"
              }`}
            >
              {isSaved ? "Saved!" : "Save"}
            </button>
          </div>
        )}
      </div>
      <div className="p-3.5 space-y-3">{children}</div>
    </div>
  );
}

function SavedDrawer<T>({
  saved,
  isOpen,
  remove,
  clear,
  cardTitle,
  formatSummary,
}: {
  saved: SavedEstimate<T>[];
  isOpen: boolean;
  remove: (id: string) => void;
  clear: () => void;
  cardTitle: string;
  formatSummary: (result: T) => string;
}) {
  if (!isOpen || saved.length === 0) return null;

  const exportCsv = () => {
    const rows = [
      ["Timestamp", "Input Summary", "Ideal Weight Result"],
      ...saved.map((e) => [e.timestamp, e.inputSummary, formatSummary(e.result)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ideal_weight_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_history.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-bold text-zinc-700 dark:text-zinc-300">
          Saved {cardTitle} ({saved.length})
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <Download className="w-3 h-3" /> CSV
          </button>
          <button
            onClick={clear}
            className="text-[10px] text-zinc-400 hover:text-red-500 cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="space-y-1.5 max-h-36 overflow-y-auto">
        {saved.map((item) => (
          <div
            key={item.id}
            className="p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-sans tabular-nums"
          >
            <div className="truncate pr-2">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                {formatSummary(item.result)}
              </span>
              <span className="text-zinc-400 ml-1.5">({item.inputSummary})</span>
            </div>
            <button
              onClick={() => remove(item.id)}
              className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Visual Weight Position Gauge ───────────────────────────────────────────

function IdealWeightGauge({ result }: { result: IdealWeightResult }) {
  const minBound = Math.max(50, result.whoMinLbs - 25);
  const maxBound = result.whoMaxLbs + 35;
  const range = maxBound - minBound;

  const getPercent = (val: number) => {
    return Math.max(0, Math.min(100, ((val - minBound) / range) * 100));
  };

  const whoMinPct = getPercent(result.whoMinLbs);
  const whoMaxPct = getPercent(result.whoMaxLbs);
  const consensusPct = getPercent(result.consensusLbs);
  const currentPct = result.currentWeightLbs ? getPercent(result.currentWeightLbs) : null;

  return (
    <div className="space-y-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
      <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
        <span>WEIGHT POSITION SPECTRUM (LBS)</span>
        <span>WHO HEALTHY RANGE: {result.whoMinLbs} – {result.whoMaxLbs} lbs</span>
      </div>

      <div className="relative h-6 rounded-full bg-slate-200 dark:bg-zinc-700 overflow-hidden shadow-inner">
        {/* Underweight Zone */}
        <div
          className="absolute top-0 bottom-0 left-0 bg-amber-400/80"
          style={{ width: `${whoMinPct}%` }}
          title="Underweight"
        />

        {/* Healthy WHO BMI Zone */}
        <div
          className="absolute top-0 bottom-0 bg-emerald-500/90"
          style={{ left: `${whoMinPct}%`, width: `${whoMaxPct - whoMinPct}%` }}
          title="Healthy WHO Range"
        />

        {/* Overweight Zone */}
        <div
          className="absolute top-0 bottom-0 right-0 bg-rose-400/80"
          style={{ left: `${whoMaxPct}%` }}
          title="Overweight / Obese"
        />

        {/* Consensus Ideal Weight Target Marker */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-blue-900 dark:bg-white z-10 shadow-md transform -translate-x-1/2"
          style={{ left: `${consensusPct}%` }}
          title={`Consensus IBW: ${result.consensusLbs} lbs`}
        />

        {/* Current Weight Pin (if supplied) */}
        {currentPct !== null && (
          <div
            className="absolute top-0 bottom-0 w-2.5 bg-purple-600 border-2 border-white rounded-full z-20 shadow-lg transform -translate-x-1/2"
            style={{ left: `${currentPct}%` }}
            title={`Current Weight: ${result.currentWeightLbs} lbs`}
          />
        )}
      </div>

      <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
        <span>{Math.round(minBound)} lbs</span>
        <div className="flex items-center gap-1 text-blue-700 dark:text-blue-300 font-bold">
          <Target className="w-3 h-3" /> Consensus Target: {result.consensusLbs} lbs ({result.consensusKg} kg)
        </div>
        <span>{Math.round(maxBound)} lbs</span>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function IdealWeightCalculator() {
  // Input states
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState<number>(28);

  // US Inputs
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [currentWeightLbs, setCurrentWeightLbs] = useState<string>("175");
  const [wristInches, setWristInches] = useState<string>("7.0");

  // Metric Inputs
  const [heightCm, setHeightCm] = useState<number>(178);
  const [currentWeightKg, setCurrentWeightKg] = useState<string>("79.4");
  const [wristCm, setWristCm] = useState<string>("17.8");

  // Frame size state
  const [frameSize, setFrameSize] = useState<FrameSize>("medium");

  // Card Saves
  const [card1SaveSuccess, setCard1SaveSuccess] = useState(false);
  const card1Saved = useCardSaved<IdealWeightResult>("saved_ideal_weight_main");

  const [copied, setCopied] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Synchronized Unit System Switcher
  const handleUnitSystemChange = (newSystem: UnitSystem) => {
    setUnitSystem(newSystem);
    if (newSystem === "metric") {
      const cm = Math.round((heightFeet * 12 + heightInches) * 2.54);
      setHeightCm(cm);
      if (currentWeightLbs !== "") {
        const kg = parseFloat((Number(currentWeightLbs) * 0.45359237).toFixed(1));
        setCurrentWeightKg(kg.toString());
      }
      if (wristInches !== "") {
        const wCm = parseFloat((Number(wristInches) * 2.54).toFixed(1));
        setWristCm(wCm.toString());
      }
    } else if (newSystem === "us") {
      const totalInches = Math.round(heightCm / 2.54);
      setHeightFeet(Math.floor(totalInches / 12));
      setHeightInches(parseFloat((totalInches % 12).toFixed(1)));
      if (currentWeightKg !== "") {
        const lbs = Math.round(Number(currentWeightKg) / 0.45359237);
        setCurrentWeightLbs(lbs.toString());
      }
      if (wristCm !== "") {
        const wIn = parseFloat((Number(wristCm) / 2.54).toFixed(1));
        setWristInches(wIn.toString());
      }
    }
  };

  const handleReset = () => {
    setUnitSystem("us");
    setGender("male");
    setAge(28);
    setHeightFeet(5);
    setHeightInches(10);
    setCurrentWeightLbs("175");
    setWristInches("7.0");
    setHeightCm(178);
    setCurrentWeightKg("79.4");
    setWristCm("17.8");
    setFrameSize("medium");
  };

  // Calculation Result
  const result: IdealWeightResult = useMemo(() => {
    const wLbs = currentWeightLbs !== "" ? Number(currentWeightLbs) : undefined;
    const wKg = currentWeightKg !== "" ? Number(currentWeightKg) : undefined;
    const wrIn = wristInches !== "" ? Number(wristInches) : undefined;
    const wrCm = wristCm !== "" ? Number(wristCm) : undefined;

    return calculateIdealWeight({
      unitSystem,
      gender,
      age,
      heightFeet,
      heightInches,
      currentWeightLbs: wLbs,
      wristInches: wrIn,
      heightCm,
      currentWeightKg: wKg,
      wristCm: wrCm,
      frameSize,
    });
  }, [
    unitSystem,
    gender,
    age,
    heightFeet,
    heightInches,
    currentWeightLbs,
    wristInches,
    heightCm,
    currentWeightKg,
    wristCm,
    frameSize,
  ]);

  // Copy Summary
  const handleCopySummary = () => {
    const summary = `Ideal Body Weight Clinical Assessment:
• Gender: ${gender === "male" ? "Male" : "Female"}, Age: ${age}
• Height: ${unitSystem === "us" ? `${heightFeet}'${heightInches}"` : `${heightCm} cm`}, Frame: ${frameSize}
• Consensus Ideal Weight: ${result.consensusLbs} lbs (${result.consensusKg} kg)
• WHO Healthy Range (BMI 18.5–24.9): ${result.whoMinLbs}–${result.whoMaxLbs} lbs (${result.whoMinKg}–${result.whoMaxKg} kg)
• Devine: ${result.devine.weightLbs} lbs | Robinson: ${result.robinson.weightLbs} lbs | Miller: ${result.miller.weightLbs} lbs | Hamwi: ${result.hamwi.weightLbs} lbs`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        calculatorName: "Ideal Body Weight Calculator",
        reportTitle: "Clinical Anthropometric Ideal Weight & Frame Assessment",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
      },
      keyMetrics: [
        { label: "Consensus Ideal Weight", value: `${result.consensusLbs} lbs (${result.consensusKg} kg)`, highlight: true },
        { label: "WHO Healthy Range", value: `${result.whoMinLbs} – ${result.whoMaxLbs} lbs` },
        { label: "Skeletal Frame Multiplier", value: `${result.frameMultiplier > 1 ? "+" : ""}${Math.round((result.frameMultiplier - 1) * 100)}% (${result.frameSize})` },
      ],
      sections: [
        {
          title: "Multi-Formula Anthropometric Breakdown",
          items: [
            { label: "Devine Formula (1974 - Pharmacopeia)", value: `${result.devine.weightLbs} lbs (${result.devine.weightKg} kg)` },
            { label: "Robinson Formula (1983 - Actuarial)", value: `${result.robinson.weightLbs} lbs (${result.robinson.weightKg} kg)` },
            { label: "Miller Formula (1983 - Modified)", value: `${result.miller.weightLbs} lbs (${result.miller.weightKg} kg)` },
            { label: "Hamwi Formula (1964 - Clinical Dietetics)", value: `${result.hamwi.weightLbs} lbs (${result.hamwi.weightKg} kg)` },
            { label: "Lemmens Formula (2005 - BMI 22.0 Anchor)", value: `${result.lemmens.weightLbs} lbs (${result.lemmens.weightKg} kg)` },
          ],
        },
        {
          title: "Target Weight Trajectory (Safe Deficit / Surplus)",
          items: [
            { label: "Current Delta to Consensus IBW", value: `${result.weightDeltaLbs > 0 ? "+" : ""}${result.weightDeltaLbs} lbs` },
            { label: "Weeks at 1.0 lb/week rate", value: `${result.weeksAtOneLbPerWk} weeks` },
            { label: "Weeks at 1.5 lbs/week rate", value: `${result.weeksAtOneAndHalfLbPerWk} weeks` },
          ],
        },
      ],
    };
  }, [result]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ CARD 1: PRIMARY IDEAL WEIGHT SOLVER ═══════════════════ */}
      <CardWrapper
        title="Ideal Body Weight &amp; Multi-Formula Engine"
        hasResult={!!result}
        isSaved={card1SaveSuccess}
        savedCount={card1Saved.saved.length}
        onToggleSaved={() => card1Saved.setIsOpen(!card1Saved.isOpen)}
        onSave={() => {
          card1Saved.save(
            `${gender.toUpperCase()}, ${age}y, ${unitSystem === "us" ? `${heightFeet}'${heightInches}"` : `${heightCm}cm`}, Frame: ${frameSize} -> IBW: ${result.consensusLbs} lbs (${result.consensusKg} kg)`,
            result
          );
          flashSave(setCard1SaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Top Bar: Units & Gender */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-zinc-100 dark:border-zinc-800 text-xs">
            {/* Gender Switcher */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Gender:</span>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    gender === "male"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    gender === "female"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Unit System Switcher */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Units:</span>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5">
                <button
                  type="button"
                  onClick={() => handleUnitSystemChange("us")}
                  className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    unitSystem === "us"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  US / Imperial (ft, in, lbs)
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitSystemChange("metric")}
                  className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    unitSystem === "metric"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Metric (cm, kg)
                </button>
              </div>
            </div>
          </div>

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
            {/* Age */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Age (Years)</label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(Math.max(18, Math.min(120, Number(e.target.value) || 28)))}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>

            {/* Height */}
            <div className="md:col-span-5 space-y-1">
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Height ({unitSystem === "us" ? "Feet & Inches" : "Centimeters"})
              </label>
              {unitSystem === "us" ? (
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(Number(e.target.value) || 5)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <span className="text-zinc-500 text-[11px]">ft</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={heightInches}
                      onChange={(e) => setHeightInches(Number(e.target.value) || 0)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <span className="text-zinc-500 text-[11px]">in</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value) || 178)}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                  <span className="text-zinc-500 text-[11px]">cm</span>
                </div>
              )}
            </div>

            {/* Frame Size */}
            <div className="md:col-span-4 space-y-1">
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Bone Frame Size
              </label>
              <select
                value={frameSize}
                onChange={(e) => setFrameSize(e.target.value as FrameSize)}
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300"
              >
                <option value="small">Small (-10% baseline)</option>
                <option value="medium">Medium (Standard baseline)</option>
                <option value="large">Large (+10% baseline)</option>
              </select>
            </div>

            {/* Current Weight (Optional) */}
            <div className="md:col-span-6 space-y-1">
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Current Weight (Optional for delta tracking)
              </label>
              <div className="flex items-center gap-1.5">
                <Input
                  type="number"
                  value={unitSystem === "us" ? currentWeightLbs : currentWeightKg}
                  onChange={(e) => {
                    if (unitSystem === "us") setCurrentWeightLbs(e.target.value);
                    else setCurrentWeightKg(e.target.value);
                  }}
                  placeholder={unitSystem === "us" ? "e.g. 175" : "e.g. 79.4"}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
                <span className="text-zinc-500 text-[11px] font-bold">
                  {unitSystem === "us" ? "lbs" : "kg"}
                </span>
              </div>
            </div>

            {/* Wrist Circumference (Optional auto frame) */}
            <div className="md:col-span-6 space-y-1">
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Wrist Circumference (Auto-detect frame size)
              </label>
              <div className="flex items-center gap-1.5">
                <Input
                  type="number"
                  value={unitSystem === "us" ? wristInches : wristCm}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (unitSystem === "us") {
                      setWristInches(e.target.value);
                      if (val > 0) setFrameSize(evaluateFrameSizeFromWrist(gender, result.heightCm, undefined, val));
                    } else {
                      setWristCm(e.target.value);
                      if (val > 0) setFrameSize(evaluateFrameSizeFromWrist(gender, result.heightCm, val, undefined));
                    }
                  }}
                  placeholder={unitSystem === "us" ? "e.g. 7.0" : "e.g. 17.8"}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
                <span className="text-zinc-500 text-[11px] font-bold">
                  {unitSystem === "us" ? "in" : "cm"}
                </span>
              </div>
            </div>
          </div>

          {/* Primary Result Banner & Interactive Visualizer */}
          <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
                  CONSENSUS IDEAL BODY WEIGHT (MULTI-FORMULA AVERAGE)
                </span>
                <div className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {result.consensusLbs}{" "}
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">lbs</span>{" "}
                  <span className="text-base text-zinc-500 font-normal">
                    ({result.consensusKg} kg)
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                  WHO Normal BMI Weight Range: {result.whoMinLbs} – {result.whoMaxLbs} lbs ({result.whoMinKg} – {result.whoMaxKg} kg)
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCopySummary}
                  className="h-7 text-xs font-semibold gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                  {copied ? "Copied" : "Copy Summary"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="h-7 text-xs font-semibold gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Visual Gauge */}
            <IdealWeightGauge result={result} />
          </div>
        </div>

        <SavedDrawer
          {...card1Saved}
          cardTitle="Ideal Body Weight"
          formatSummary={(r) => `IBW: ${r.consensusLbs} lbs (${r.consensusKg} kg) | WHO: ${r.whoMinLbs}-${r.whoMaxLbs} lbs`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: MULTI-FORMULA COMPARISON ═══════════════════ */}
      <CardWrapper title="Medical &amp; Pharmacopeial Formula Comparison Matrix">
        <div className="space-y-2 text-xs">
          <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
            Comparison across clinical guidelines adjusted for {result.gender} ({result.heightInches}&quot; / {result.heightCm} cm) and {result.frameSize} bone frame:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-bold text-zinc-800 dark:text-zinc-200">
                <tr>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Formula</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Year</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Pounds (lbs)</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Kilograms (kg)</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700">Clinical Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                <tr className="bg-blue-50/40 dark:bg-blue-950/20 font-semibold">
                  <td className="p-2 text-blue-900 dark:text-blue-200">{result.devine.name}</td>
                  <td className="p-2">{result.devine.year}</td>
                  <td className="p-2 font-bold text-blue-700 dark:text-blue-300">{result.devine.weightLbs} lbs</td>
                  <td className="p-2">{result.devine.weightKg} kg</td>
                  <td className="p-2 text-[10px] text-zinc-500">{result.devine.description}</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">{result.robinson.name}</td>
                  <td className="p-2">{result.robinson.year}</td>
                  <td className="p-2 font-bold">{result.robinson.weightLbs} lbs</td>
                  <td className="p-2">{result.robinson.weightKg} kg</td>
                  <td className="p-2 text-[10px] text-zinc-500">{result.robinson.description}</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">{result.miller.name}</td>
                  <td className="p-2">{result.miller.year}</td>
                  <td className="p-2 font-bold">{result.miller.weightLbs} lbs</td>
                  <td className="p-2">{result.miller.weightKg} kg</td>
                  <td className="p-2 text-[10px] text-zinc-500">{result.miller.description}</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">{result.hamwi.name}</td>
                  <td className="p-2">{result.hamwi.year}</td>
                  <td className="p-2 font-bold">{result.hamwi.weightLbs} lbs</td>
                  <td className="p-2">{result.hamwi.weightKg} kg</td>
                  <td className="p-2 text-[10px] text-zinc-500">{result.hamwi.description}</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">{result.lemmens.name}</td>
                  <td className="p-2">{result.lemmens.year}</td>
                  <td className="p-2 font-bold">{result.lemmens.weightLbs} lbs</td>
                  <td className="p-2">{result.lemmens.weightKg} kg</td>
                  <td className="p-2 text-[10px] text-zinc-500">{result.lemmens.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardWrapper>

      {/* ═══════════════════ CARD 3: TARGET TRAJECTORY & DELTA ═══════════════════ */}
      {result.currentWeightLbs && (
        <CardWrapper title="Target Weight Trajectory &amp; Deficit Planning">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 text-center">
              <span className="text-[10px] text-zinc-500 block font-medium">Difference to Consensus IBW</span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                {result.weightDeltaLbs > 0 ? (
                  <TrendingDown className="w-4 h-4 text-amber-500" />
                ) : result.weightDeltaLbs < 0 ? (
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                ) : (
                  <Check className="w-4 h-4 text-emerald-500" />
                )}
                <span className="text-lg font-black text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                  {Math.abs(result.weightDeltaLbs)} lbs
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 block">
                {result.weightDeltaLbs > 0 ? "Deficit to lose" : result.weightDeltaLbs < 0 ? "Surplus to gain" : "Exact Match"}
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 text-center">
              <span className="text-[10px] text-zinc-500 block font-medium">At 1.0 lb / week Pace</span>
              <span className="text-lg font-black text-blue-700 dark:text-blue-300 font-sans tabular-nums block mt-0.5">
                {result.weeksAtOneLbPerWk} Weeks
              </span>
              <span className="text-[10px] text-zinc-500 block">500 kcal/day energy delta</span>
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 text-center">
              <span className="text-[10px] text-zinc-500 block font-medium">At 1.5 lbs / week Pace</span>
              <span className="text-lg font-black text-blue-700 dark:text-blue-300 font-sans tabular-nums block mt-0.5">
                {result.weeksAtOneAndHalfLbPerWk} Weeks
              </span>
              <span className="text-[10px] text-zinc-500 block">750 kcal/day energy delta</span>
            </div>
          </div>
        </CardWrapper>
      )}

      {/* ═══════════════════ REPORT TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Clinical IBW Assessment Report
        </Button>
      </div>

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        reportData={reportData}
      />
    </div>
  );
}
