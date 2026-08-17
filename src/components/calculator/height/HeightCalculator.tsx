"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Ruler,
  Download,
  Trash2,
  FileSpreadsheet,
  Layers,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  User,
  Users,
  Baby,
  ArrowRightLeft,
  CheckCircle2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  Gender,
  HeightUnitMode,
  feetInchesToCm,
  cmToFeetInches,
  lbsToKg,
  kgToLbs,
  calculateKhamisRoche,
  calculateMidParental,
  calculateToddlerDoubling,
  calculateHeightConverter,
  KhamisRocheResult,
  MidParentalResult,
  ToddlerDoublingResult,
  HeightConverterResult,
} from "@/lib/calculator-engine/formulas/height";

// ─── Local Storage Hook ─────────────────────────────────────────────────────

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
    [storageKey],
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
    [storageKey],
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
      ["Timestamp", "Input Summary", "Result Summary"],
      ...saved.map((e) => [e.timestamp, e.inputSummary, formatSummary(e.result)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `height_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_estimates.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-bold text-zinc-700 dark:text-zinc-300">
          Saved {cardTitle} History ({saved.length})
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

// ─── 2D Scaled Stature Comparison Visualizer ────────────────────────────────

function StatureComparisonVisualizer2D({
  childCurrentCm,
  childPredictedCm,
  motherCm,
  fatherCm,
  childGender,
}: {
  childCurrentCm: number;
  childPredictedCm: number;
  motherCm: number;
  fatherCm: number;
  childGender: Gender;
}) {
  const maxHt = Math.max(200, fatherCm, motherCm, childPredictedCm);
  const minHt = 80;

  const getY = (cm: number) => {
    const clamped = Math.max(minHt, Math.min(maxHt + 10, cm));
    return 130 - ((clamped - minHt) / (maxHt + 10 - minHt)) * 105;
  };

  const childCurY = getY(childCurrentCm);
  const childPredY = getY(childPredictedCm);
  const motherY = getY(motherCm);
  const fatherY = getY(fatherCm);

  return (
    <div className="w-full flex flex-col items-center select-none">
      <svg
        viewBox="0 0 260 145"
        className="w-full max-w-[250px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 shadow-xs"
        aria-label="2D Family Stature Comparison"
      >
        {/* Baseline Floor */}
        <line x1="10" y1="130" x2="250" y2="130" stroke="#64748b" strokeWidth="2" />
        <text x="130" y="141" textAnchor="middle" className="text-[7.5px] fill-zinc-500 font-semibold tracking-wider">
          FAMILY STATURE COMPARISON (cm)
        </text>

        {/* 1. Child Current Stature */}
        <g transform="translate(35, 0)">
          <rect x="0" y={childCurY} width="22" height={130 - childCurY} rx="3" fill="#93c5fd" stroke="#2563eb" strokeWidth="1" />
          <circle cx="11" cy={childCurY - 6} r="5" fill="#2563eb" />
          <text x="11" y={childCurY - 14} textAnchor="middle" className="text-[7px] fill-blue-700 dark:fill-blue-300 font-bold">
            {childCurrentCm}cm
          </text>
          <text x="11" y="125" textAnchor="middle" className="text-[6.5px] fill-blue-900 font-extrabold">
            NOW
          </text>
        </g>

        {/* 2. Predicted Adult Height (Target) */}
        <g transform="translate(90, 0)">
          <rect x="0" y={childPredY} width="24" height={130 - childPredY} rx="3" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
          <circle cx="12" cy={childPredY - 7} r="6" fill="#1d4ed8" />
          <text x="12" y={childPredY - 16} textAnchor="middle" className="text-[8px] fill-blue-800 dark:fill-blue-200 font-black">
            {childPredictedCm}cm
          </text>
          <text x="12" y="125" textAnchor="middle" className="text-[6.5px] fill-white font-extrabold">
            ADULT
          </text>
        </g>

        {/* 3. Mother Stature */}
        <g transform="translate(150, 0)">
          <rect x="0" y={motherY} width="22" height={130 - motherY} rx="3" fill="#f472b6" stroke="#db2777" strokeWidth="1" />
          <circle cx="11" cy={motherY - 6} r="5" fill="#db2777" />
          <text x="11" y={motherY - 13} textAnchor="middle" className="text-[7px] fill-pink-700 dark:fill-pink-300 font-bold">
            {motherCm}cm
          </text>
          <text x="11" y="125" textAnchor="middle" className="text-[6.5px] fill-pink-950 font-extrabold">
            MOM
          </text>
        </g>

        {/* 4. Father Stature */}
        <g transform="translate(205, 0)">
          <rect x="0" y={fatherY} width="22" height={130 - fatherY} rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
          <circle cx="11" cy={fatherY - 6} r="5" fill="#0284c7" />
          <text x="11" y={fatherY - 13} textAnchor="middle" className="text-[7px] fill-sky-800 dark:fill-sky-300 font-bold">
            {fatherCm}cm
          </text>
          <text x="11" y="125" textAnchor="middle" className="text-[6.5px] fill-sky-950 font-extrabold">
            DAD
          </text>
        </g>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function HeightCalculator() {
  // ─── CARD 1: KHAMIS-ROCHE PREDICTOR ───
  const [unitMode, setUnitMode] = useState<HeightUnitMode>("imperial");
  const [childGender, setChildGender] = useState<Gender>("male");
  const [childAge, setChildAge] = useState("5.2");

  // Child Height
  const [childFeet, setChildFeet] = useState("3");
  const [childInches, setChildInches] = useState("8");
  const [childCm, setChildCm] = useState("111.8");

  // Child Weight
  const [childWeightLbs, setChildWeightLbs] = useState("40");
  const [childWeightKg, setChildWeightKg] = useState("18.1");

  // Mother Height
  const [motherFeet, setMotherFeet] = useState("5");
  const [motherInches, setMotherInches] = useState("5");
  const [motherCm, setMotherCm] = useState("165.1");

  // Father Height
  const [fatherFeet, setFatherFeet] = useState("5");
  const [fatherInches, setFatherInches] = useState("10");
  const [fatherCm, setFatherCm] = useState("177.8");

  const [khamisResult, setKhamisResult] = useState<KhamisRocheResult | null>(null);
  const [khamisSaveSuccess, setKhamisSaveSuccess] = useState(false);
  const khamisSaved = useCardSaved<KhamisRocheResult>("saved_height_khamis");

  // ─── CARD 2: MID-PARENTAL HEIGHT ───
  const [midGender, setMidGender] = useState<Gender>("male");
  const [midMomFeet, setMidMomFeet] = useState("5");
  const [midMomInches, setMidMomInches] = useState("2");
  const [midDadFeet, setMidDadFeet] = useState("5");
  const [midDadInches, setMidDadInches] = useState("10");
  const [midResult, setMidResult] = useState<MidParentalResult | null>(null);
  const [midSaveSuccess, setMidSaveSuccess] = useState(false);
  const midSaved = useCardSaved<MidParentalResult>("saved_height_midparental");

  // ─── CARD 3: 2-YEAR-OLD DOUBLING ───
  const [doublingGender, setDoublingGender] = useState<Gender>("male");
  const [h2Feet, setH2Feet] = useState("2");
  const [h2Inches, setH2Inches] = useState("10");
  const [h2Cm, setH2Cm] = useState("86.4");
  const [doublingResult, setDoublingResult] = useState<ToddlerDoublingResult | null>(null);
  const [doublingSaveSuccess, setDoublingSaveSuccess] = useState(false);
  const doublingSaved = useCardSaved<ToddlerDoublingResult>("saved_height_doubling");

  // ─── CARD 4: HEIGHT CONVERTER ───
  const [convUnit, setConvUnit] = useState<"feet_inches" | "inches" | "cm" | "meters">("feet_inches");
  const [convFeet, setConvFeet] = useState("5");
  const [convInches, setConvInches] = useState("9");
  const [convValue, setConvValue] = useState("175.3");
  const [convResult, setConvResult] = useState<HeightConverterResult | null>(null);
  const [convSaveSuccess, setConvSaveSuccess] = useState(false);
  const convSaved = useCardSaved<HeightConverterResult>("saved_height_converter");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Sync Unit Modes
  const handleUnitModeChange = (mode: HeightUnitMode) => {
    setUnitMode(mode);
  };

  // Calculations
  const handleKhamisCalc = useCallback(() => {
    let effectiveChildCm = Number(childCm) || 111.8;
    let effectiveChildKg = Number(childWeightKg) || 18.1;
    let effectiveMotherCm = Number(motherCm) || 165.1;
    let effectiveFatherCm = Number(fatherCm) || 177.8;

    if (unitMode === "imperial") {
      effectiveChildCm = feetInchesToCm(Number(childFeet) || 0, Number(childInches) || 0);
      effectiveChildKg = lbsToKg(Number(childWeightLbs) || 40);
      effectiveMotherCm = feetInchesToCm(Number(motherFeet) || 0, Number(motherInches) || 0);
      effectiveFatherCm = feetInchesToCm(Number(fatherFeet) || 0, Number(fatherInches) || 0);
    }

    const res = calculateKhamisRoche({
      childGender,
      childAgeYears: Number(childAge) || 5.2,
      childHeightCm: effectiveChildCm,
      childWeightKg: effectiveChildKg,
      motherHeightCm: effectiveMotherCm,
      fatherHeightCm: effectiveFatherCm,
    });
    setKhamisResult(res);
  }, [
    unitMode,
    childGender,
    childAge,
    childFeet,
    childInches,
    childCm,
    childWeightLbs,
    childWeightKg,
    motherFeet,
    motherInches,
    motherCm,
    fatherFeet,
    fatherInches,
    fatherCm,
  ]);

  const handleMidCalc = useCallback(() => {
    const momCm = feetInchesToCm(Number(midMomFeet) || 5, Number(midMomInches) || 2);
    const dadCm = feetInchesToCm(Number(midDadFeet) || 5, Number(midDadInches) || 10);
    const res = calculateMidParental({
      childGender: midGender,
      motherHeightCm: momCm,
      fatherHeightCm: dadCm,
    });
    setMidResult(res);
  }, [midGender, midMomFeet, midMomInches, midDadFeet, midDadInches]);

  const handleDoublingCalc = useCallback(() => {
    const cm = feetInchesToCm(Number(h2Feet) || 2, Number(h2Inches) || 10);
    const res = calculateToddlerDoubling({
      childGender: doublingGender,
      heightAt2YearsCm: cm,
    });
    setDoublingResult(res);
  }, [doublingGender, h2Feet, h2Inches]);

  const handleConvCalc = useCallback(() => {
    const res = calculateHeightConverter({
      fromUnit: convUnit,
      feet: Number(convFeet) || 5,
      inches: Number(convInches) || 9,
      value: Number(convValue) || 175,
    });
    setConvResult(res);
  }, [convUnit, convFeet, convInches, convValue]);

  useEffect(() => {
    handleKhamisCalc();
  }, [handleKhamisCalc]);

  useEffect(() => {
    handleMidCalc();
  }, [handleMidCalc]);

  useEffect(() => {
    handleDoublingCalc();
  }, [handleDoublingCalc]);

  useEffect(() => {
    handleConvCalc();
  }, [handleConvCalc]);

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];

    if (khamisResult) {
      sections.push({
        title: "Khamis-Roche Multi-Variable Height Prediction",
        items: [
          { label: "Child Profile", value: `${childGender === "male" ? "Boy" : "Girl"}, Age ${childAge} yrs` },
          { label: "Predicted Adult Height", value: `${khamisResult.predictedHeightFtIn.text} (${khamisResult.predictedHeightCm} cm)` },
          { label: "90% Confidence Interval", value: `${khamisResult.confidenceIntervalFtIn.lowerText} to ${khamisResult.confidenceIntervalFtIn.upperText} (${khamisResult.confidenceIntervalCm.lower} – ${khamisResult.confidenceIntervalCm.upper} cm)` },
          { label: "Growth Remaining", value: `${khamisResult.growthRemainingInches} inches (${khamisResult.growthRemainingCm} cm)` },
          { label: "CDC/WHO Adult Percentile", value: `${khamisResult.adultPercentile}th Percentile` },
          { label: "Mid-Parent Stature (MPS)", value: `${cmToFeetInches(khamisResult.midParentHeightCm).text} (${khamisResult.midParentHeightCm} cm)` },
        ],
      });
    }

    if (midResult) {
      sections.push({
        title: "Tanner Mid-Parental Genetic Target Stature",
        items: [
          { label: "Target Mid-Parental Height", value: `${midResult.targetHeightFtIn.text} (${midResult.targetHeightCm} cm)` },
          { label: "95% Target Genetic Range", value: `${midResult.targetRangeFtIn.lowerText} to ${midResult.targetRangeFtIn.upperText} (${midResult.targetRangeCm.lower} – ${midResult.targetRangeCm.upper} cm)` },
          { label: "Adult Population Percentile", value: `${midResult.adultPercentile}th Percentile` },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Height Calculator",
        reportTitle: "Pediatric Stature & Adult Height Prediction Takeoff",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
      },
      keyMetrics: [
        { label: "Predicted Adult Height", value: khamisResult ? `${khamisResult.predictedHeightFtIn.text}` : "—", highlight: true },
        { label: "Adult Stature (Metric)", value: khamisResult ? `${khamisResult.predictedHeightCm} cm` : "—" },
        { label: "Population Percentile", value: khamisResult ? `${khamisResult.adultPercentile}th %` : "—" },
      ],
      sections,
    };
  }, [khamisResult, midResult, childGender, childAge]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ CARD 1: KHAMIS-ROCHE PEDIATRIC ADULT HEIGHT PREDICTOR ═══════════════════ */}
      <CardWrapper
        title="Children's Adult Height Predictor (Khamis-Roche Linear Regression)"
        hasResult={!!khamisResult}
        isSaved={khamisSaveSuccess}
        savedCount={khamisSaved.saved.length}
        onToggleSaved={() => khamisSaved.setIsOpen(!khamisSaved.isOpen)}
        onSave={() => {
          if (!khamisResult) return;
          khamisSaved.save(
            `${childGender === "male" ? "Boy" : "Girl"} Age ${childAge}: Predicted ${khamisResult.predictedHeightFtIn.text} (${khamisResult.predictedHeightCm}cm), +${khamisResult.growthRemainingInches}\" left`,
            khamisResult
          );
          flashSave(setKhamisSaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Unit Toggle & Gender Selector */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-zinc-100 dark:border-zinc-800 text-xs">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Child&apos;s Gender:</span>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5">
                <button
                  type="button"
                  onClick={() => setChildGender("male")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    childGender === "male"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Boy / Male
                </button>
                <button
                  type="button"
                  onClick={() => setChildGender("female")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    childGender === "female"
                      ? "bg-pink-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Girl / Female
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Units:</span>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5">
                <button
                  type="button"
                  onClick={() => handleUnitModeChange("imperial")}
                  className={`px-2.5 py-0.5 rounded text-xs font-semibold cursor-pointer ${
                    unitMode === "imperial"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  US (ft/in, lbs)
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitModeChange("metric")}
                  className={`px-2.5 py-0.5 rounded text-xs font-semibold cursor-pointer ${
                    unitMode === "metric"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  Metric (cm, kg)
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Column: Form Inputs */}
            <div className="md:col-span-7 space-y-2.5 text-xs">
              <div className="grid grid-cols-2 gap-2">
                {/* Child Age */}
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                    Child&apos;s Chronological Age (Years)
                  </label>
                  <Input
                    type="number"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    min={4}
                    max={17}
                    step={0.1}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>

                {/* Child Weight */}
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                    Child&apos;s Weight ({unitMode === "imperial" ? "lbs" : "kg"})
                  </label>
                  {unitMode === "imperial" ? (
                    <Input
                      type="number"
                      value={childWeightLbs}
                      onChange={(e) => setChildWeightLbs(e.target.value)}
                      min={20}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  ) : (
                    <Input
                      type="number"
                      value={childWeightKg}
                      onChange={(e) => setChildWeightKg(e.target.value)}
                      min={10}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  )}
                </div>
              </div>

              {/* Child Current Height */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Child&apos;s Current Height
                </label>
                {unitMode === "imperial" ? (
                  <div className="grid grid-cols-2 gap-1">
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        value={childFeet}
                        onChange={(e) => setChildFeet(e.target.value)}
                        min={1}
                        max={7}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <span className="text-zinc-500 font-semibold">ft</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        value={childInches}
                        onChange={(e) => setChildInches(e.target.value)}
                        min={0}
                        max={11.9}
                        step={0.5}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <span className="text-zinc-500 font-semibold">in</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={childCm}
                      onChange={(e) => setChildCm(e.target.value)}
                      min={50}
                      max={220}
                      step={0.5}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <span className="text-zinc-500 font-semibold">cm</span>
                  </div>
                )}
              </div>

              {/* Mother & Father Statures */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                {/* Mother Height */}
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                    Mother&apos;s Height
                  </label>
                  {unitMode === "imperial" ? (
                    <div className="flex gap-1">
                      <Input
                        type="number"
                        value={motherFeet}
                        onChange={(e) => setMotherFeet(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                        placeholder="5 ft"
                      />
                      <Input
                        type="number"
                        value={motherInches}
                        onChange={(e) => setMotherInches(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                        placeholder="5 in"
                      />
                    </div>
                  ) : (
                    <Input
                      type="number"
                      value={motherCm}
                      onChange={(e) => setMotherCm(e.target.value)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  )}
                </div>

                {/* Father Height */}
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                    Father&apos;s Height
                  </label>
                  {unitMode === "imperial" ? (
                    <div className="flex gap-1">
                      <Input
                        type="number"
                        value={fatherFeet}
                        onChange={(e) => setFatherFeet(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                        placeholder="5 ft"
                      />
                      <Input
                        type="number"
                        value={fatherInches}
                        onChange={(e) => setFatherInches(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                        placeholder="10 in"
                      />
                    </div>
                  ) : (
                    <Input
                      type="number"
                      value={fatherCm}
                      onChange={(e) => setFatherCm(e.target.value)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  onClick={handleKhamisCalc}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
                >
                  Predict Adult Stature
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setChildAge("5.2");
                    setChildFeet("3");
                    setChildInches("8");
                    setChildWeightLbs("40");
                  }}
                  className="text-xs font-semibold h-7 px-3 cursor-pointer"
                >
                  Clear
                </Button>
              </div>
            </div>

            {/* Right Column: 2D Stature Comparison Visualizer */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                STATURE TRAJECTORY PREVIEW
              </span>
              <StatureComparisonVisualizer2D
                childCurrentCm={feetInchesToCm(Number(childFeet), Number(childInches))}
                childPredictedCm={khamisResult ? khamisResult.predictedHeightCm : 175}
                motherCm={feetInchesToCm(Number(motherFeet), Number(motherInches))}
                fatherCm={feetInchesToCm(Number(fatherFeet), Number(fatherInches))}
                childGender={childGender}
              />
            </div>
          </div>

          {/* Results Metric Badges */}
          {khamisResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Predicted Adult Height</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {khamisResult.predictedHeightFtIn.text}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    {khamisResult.predictedHeightCm} cm
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">90% Confidence Interval</span>
                  <span className="text-sm font-bold text-blue-900 dark:text-blue-100 font-sans tabular-nums">
                    {khamisResult.confidenceIntervalFtIn.lowerText} – {khamisResult.confidenceIntervalFtIn.upperText}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-medium">
                    ({khamisResult.confidenceIntervalCm.lower} – {khamisResult.confidenceIntervalCm.upper} cm)
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">Growth Remaining</span>
                  <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    +{khamisResult.growthRemainingInches}&quot;
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-medium">
                    (+{khamisResult.growthRemainingCm} cm left to grow)
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">Adult Percentile</span>
                  <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 font-sans tabular-nums">
                    {khamisResult.adultPercentile}th %
                  </span>
                  <span className="text-[10px] text-zinc-400 block">
                    CDC/WHO Stature Curve
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...khamisSaved}
          cardTitle="Khamis-Roche"
          formatSummary={(r) => `Predicted ${r.predictedHeightFtIn.text} (${r.predictedHeightCm}cm), +${r.growthRemainingInches}\" left (${r.adultPercentile}th %)`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: MID-PARENTAL HEIGHT (TANNER METHOD) ═══════════════════ */}
      <CardWrapper
        title="Predicting Based on Parents' Heights Only (Tanner Mid-Parental)"
        hasResult={!!midResult}
        isSaved={midSaveSuccess}
        savedCount={midSaved.saved.length}
        onToggleSaved={() => midSaved.setIsOpen(!midSaved.isOpen)}
        onSave={() => {
          if (!midResult) return;
          midSaved.save(
            `Target ${midResult.targetHeightFtIn.text} (${midResult.targetHeightCm}cm), Range: ${midResult.targetRangeFtIn.lowerText}–${midResult.targetRangeFtIn.upperText}`,
            midResult
          );
          flashSave(setMidSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-zinc-600 dark:text-zinc-400">Target Child Gender:</span>
            <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5">
              <button
                type="button"
                onClick={() => setMidGender("male")}
                className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  midGender === "male"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                Boy
              </button>
              <button
                type="button"
                onClick={() => setMidGender("female")}
                className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  midGender === "female"
                    ? "bg-pink-600 text-white shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                Girl
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Mother&apos;s Height</label>
              <div className="flex gap-1">
                <Input
                  type="number"
                  value={midMomFeet}
                  onChange={(e) => setMidMomFeet(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  placeholder="Feet"
                />
                <Input
                  type="number"
                  value={midMomInches}
                  onChange={(e) => setMidMomInches(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  placeholder="Inches"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Father&apos;s Height</label>
              <div className="flex gap-1">
                <Input
                  type="number"
                  value={midDadFeet}
                  onChange={(e) => setMidDadFeet(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  placeholder="Feet"
                />
                <Input
                  type="number"
                  value={midDadInches}
                  onChange={(e) => setMidDadInches(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  placeholder="Inches"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleMidCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Mid-Parental Height
            </Button>
          </div>

          {midResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block font-medium">Target Genetic Stature</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {midResult.targetHeightFtIn.text}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    {midResult.targetHeightCm} cm
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block font-medium">95% Target Range</span>
                  <span className="text-sm font-bold text-blue-900 dark:text-blue-100 font-sans tabular-nums">
                    {midResult.targetRangeFtIn.lowerText} – {midResult.targetRangeFtIn.upperText}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">
                    ({midResult.targetRangeCm.lower} – {midResult.targetRangeCm.upper} cm)
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">Population Percentile</span>
                  <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 font-sans tabular-nums">
                    {midResult.adultPercentile}th %
                  </span>
                  <span className="text-[10px] text-zinc-400 block">Relative to adult norm</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...midSaved}
          cardTitle="Mid-Parental"
          formatSummary={(r) => `Target ${r.targetHeightFtIn.text} (${r.targetHeightCm}cm), Range: ${r.targetRangeFtIn.lowerText}–${r.targetRangeFtIn.upperText}`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: 2-YEAR-OLD TODDLER DOUBLING METHOD ═══════════════════ */}
      <CardWrapper
        title="Toddler Doubling Method (Height at Age 2.0 Years)"
        hasResult={!!doublingResult}
        isSaved={doublingSaveSuccess}
        savedCount={doublingSaved.saved.length}
        onToggleSaved={() => doublingSaved.setIsOpen(!doublingSaved.isOpen)}
        onSave={() => {
          if (!doublingResult) return;
          doublingSaved.save(
            `${doublingGender === "male" ? "Boy" : "Girl"}: Doubling estimate ${doublingResult.predictedHeightFtIn.text} (${doublingResult.predictedHeightCm}cm)`,
            doublingResult
          );
          flashSave(setDoublingSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Gender</label>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5 w-full">
                <button
                  type="button"
                  onClick={() => setDoublingGender("male")}
                  className={`flex-1 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    doublingGender === "male" ? "bg-blue-600 text-white" : "text-zinc-500"
                  }`}
                >
                  Boy (Double at 24 mos)
                </button>
                <button
                  type="button"
                  onClick={() => setDoublingGender("female")}
                  className={`flex-1 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    doublingGender === "female" ? "bg-pink-600 text-white" : "text-zinc-500"
                  }`}
                >
                  Girl (Double at 18 mos)
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Height at 2 Years (or 18 mos for girls)
              </label>
              <div className="flex gap-1">
                <Input
                  type="number"
                  value={h2Feet}
                  onChange={(e) => setH2Feet(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  placeholder="Feet"
                />
                <Input
                  type="number"
                  value={h2Inches}
                  onChange={(e) => setH2Inches(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  placeholder="Inches"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleDoublingCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Doubling Stature
            </Button>
          </div>

          {doublingResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block font-medium">Doubling Adult Prediction</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {doublingResult.predictedHeightFtIn.text}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    {doublingResult.predictedHeightCm} cm ({doublingResult.adultPercentile}th %)
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 text-left flex items-center">
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-normal">
                    {doublingResult.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...doublingSaved}
          cardTitle="Toddler Doubling"
          formatSummary={(r) => `Doubling: ${r.predictedHeightFtIn.text} (${r.predictedHeightCm}cm)`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: HEIGHT CONVERTER ═══════════════════ */}
      <CardWrapper
        title="Universal Multi-Unit Height &amp; Stature Converter"
        hasResult={!!convResult}
        isSaved={convSaveSuccess}
        savedCount={convSaved.saved.length}
        onToggleSaved={() => convSaved.setIsOpen(!convSaved.isOpen)}
        onSave={() => {
          if (!convResult) return;
          convSaved.save(
            `Converted: ${convResult.feetInches.text} = ${convResult.totalCm} cm = ${convResult.meters} m`,
            convResult
          );
          flashSave(setConvSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Input Format</label>
              <select
                value={convUnit}
                onChange={(e) => setConvUnit(e.target.value as any)}
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
              >
                <option value="feet_inches">Feet &amp; Inches (e.g. 5 ft 9 in)</option>
                <option value="cm">Centimeters (cm)</option>
                <option value="inches">Total Inches (in)</option>
                <option value="meters">Meters (m)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Enter Stature</label>
              {convUnit === "feet_inches" ? (
                <div className="flex gap-1">
                  <Input
                    type="number"
                    value={convFeet}
                    onChange={(e) => setConvFeet(e.target.value)}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Feet"
                  />
                  <Input
                    type="number"
                    value={convInches}
                    onChange={(e) => setConvInches(e.target.value)}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Inches"
                  />
                </div>
              ) : (
                <Input
                  type="number"
                  value={convValue}
                  onChange={(e) => setConvValue(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleConvCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Convert Stature
            </Button>
          </div>

          {convResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block font-medium">Feet &amp; Inches</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {convResult.feetInches.text}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">{convResult.totalInches} total inches</span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block font-medium">Metric Stature</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {convResult.totalCm} cm
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">({convResult.meters} m / {convResult.millimeters} mm)</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">Adult Male Percentile</span>
                  <span className="text-lg font-bold text-blue-700 dark:text-blue-300 font-sans tabular-nums">
                    {convResult.malePercentile}th %
                  </span>
                  <span className="text-[10px] text-zinc-400 block">Norm: 5&apos;9.7&quot; (177cm)</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">Adult Female Percentile</span>
                  <span className="text-lg font-bold text-pink-700 dark:text-pink-300 font-sans tabular-nums">
                    {convResult.femalePercentile}th %
                  </span>
                  <span className="text-[10px] text-zinc-400 block">Norm: 5&apos;4.4&quot; (163.5cm)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...convSaved}
          cardTitle="Height Converter"
          formatSummary={(r) => `${r.feetInches.text} = ${r.totalCm}cm (${r.meters}m)`}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Growth &amp; Height Report
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
