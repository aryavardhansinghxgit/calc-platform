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
  RotateCcw,
  Copy,
  Check,
  FileText,
  AlertTriangle,
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
  formatOrdinalPercentile,
  KhamisRocheResult,
  MidParentalResult,
  ToddlerDoublingResult,
  HeightConverterResult,
} from "@/lib/calculator-engine/formulas/height";

// ─── Local Storage Hook with Full Raw State & Restore ───────────────────────

interface SavedEstimate<T, S = any> {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: T;
  rawInputs: S;
  notes: string;
}

function flashSave(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
}

function useCardSaved<T, S = any>(storageKey: string) {
  const [saved, setSaved] = useState<SavedEstimate<T, S>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: T, rawInputs: S, notes = "") => {
      const entry: SavedEstimate<T, S> = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        inputSummary,
        result,
        rawInputs,
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
  onCopy,
  isCopied,
  onDownloadTxt,
}: {
  title: string;
  children: React.ReactNode;
  hasResult?: boolean;
  isSaved?: boolean;
  savedCount?: number;
  onToggleSaved?: () => void;
  onSave?: () => void;
  onCopy?: () => void;
  isCopied?: boolean;
  onDownloadTxt?: () => void;
}) {
  return (
    <div className="border border-blue-600/30 dark:border-blue-500/30 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-zinc-900 transition-all print:break-inside-avoid">
      <div className="bg-blue-600 text-white px-3.5 py-1.5 flex items-center justify-between">
        <h3 className="font-bold text-xs tracking-wide text-white">{title}</h3>
        {hasResult && (
          <div className="flex items-center gap-1.5 print:hidden">
            {onCopy && (
              <button
                type="button"
                onClick={onCopy}
                className="text-[10px] bg-white/20 hover:bg-white/30 text-white font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors flex items-center gap-0.5"
                title="Copy calculated result"
              >
                {isCopied ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                {isCopied ? "Copied" : "Copy"}
              </button>
            )}
            {onDownloadTxt && (
              <button
                type="button"
                onClick={onDownloadTxt}
                className="text-[10px] bg-white/20 hover:bg-white/30 text-white font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors flex items-center gap-0.5"
                title="Download text summary"
              >
                <FileText className="w-2.5 h-2.5" /> TXT
              </button>
            )}
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
            {onSave && (
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
            )}
          </div>
        )}
      </div>
      <div className="p-3.5 space-y-3">{children}</div>
    </div>
  );
}

function SavedDrawer<T, S = any>({
  saved,
  isOpen,
  remove,
  clear,
  cardTitle,
  formatSummary,
  onRestore,
}: {
  saved: SavedEstimate<T, S>[];
  isOpen: boolean;
  remove: (id: string) => void;
  clear: () => void;
  cardTitle: string;
  formatSummary: (result: T) => string;
  onRestore: (raw: S) => void;
}) {
  if (!isOpen || saved.length === 0) return null;

  const exportCsv = () => {
    const rows = [
      ["Timestamp", "Input Summary", "Result Summary"],
      ...saved.map((e) => [e.timestamp, e.inputSummary, formatSummary(e.result)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `height_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_estimates.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs print:hidden">
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
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => onRestore(item.rawInputs)}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 p-0.5 cursor-pointer flex items-center gap-0.5 text-[10px] font-medium"
                title="Restore this calculation"
              >
                <RotateCcw className="w-3 h-3" /> Restore
              </button>
              <button
                onClick={() => remove(item.id)}
                className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
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
  const safeChildCur = childCurrentCm > 0 ? childCurrentCm : 111.8;
  const safeChildPred = childPredictedCm > 0 ? childPredictedCm : 171.3;
  const safeMother = motherCm > 0 ? motherCm : 165.1;
  const safeFather = fatherCm > 0 ? fatherCm : 177.8;

  const maxHt = Math.max(200, safeFather, safeMother, safeChildPred, safeChildCur);
  const minHt = 80;

  const getY = (cm: number) => {
    const clamped = Math.max(minHt, Math.min(maxHt + 10, cm));
    return 130 - ((clamped - minHt) / (maxHt + 10 - minHt)) * 105;
  };

  const childCurY = getY(safeChildCur);
  const childPredY = getY(safeChildPred);
  const motherY = getY(safeMother);
  const fatherY = getY(safeFather);

  return (
    <div className="w-full flex flex-col items-center select-none print:break-inside-avoid">
      <svg
        viewBox="0 0 260 145"
        className="w-full max-w-[250px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 shadow-xs"
        aria-label="2D Family Stature Comparison Chart"
      >
        {/* Baseline Floor */}
        <line x1="10" y1="130" x2="250" y2="130" stroke="#64748b" strokeWidth="2" />
        <text x="130" y="141" textAnchor="middle" className="text-[7.5px] fill-zinc-500 font-semibold tracking-wider">
          FAMILY STATURE COMPARISON (cm)
        </text>

        {/* 1. Child Current Stature */}
        <g transform="translate(35, 0)">
          <rect x="0" y={childCurY} width="22" height={Math.max(2, 130 - childCurY)} rx="3" fill="#93c5fd" stroke="#2563eb" strokeWidth="1" />
          <circle cx="11" cy={childCurY - 6} r="5" fill="#2563eb" />
          <text x="11" y={childCurY - 14} textAnchor="middle" className="text-[7px] fill-blue-700 dark:fill-blue-300 font-bold">
            {safeChildCur}cm
          </text>
          <text x="11" y="125" textAnchor="middle" className="text-[6.5px] fill-blue-900 font-extrabold">
            NOW
          </text>
        </g>

        {/* 2. Predicted Adult Height (Target) */}
        <g transform="translate(90, 0)">
          <rect x="0" y={childPredY} width="24" height={Math.max(2, 130 - childPredY)} rx="3" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
          <circle cx="12" cy={childPredY - 7} r="6" fill="#1d4ed8" />
          <text x="12" y={childPredY - 16} textAnchor="middle" className="text-[8px] fill-blue-800 dark:fill-blue-200 font-black">
            {safeChildPred}cm
          </text>
          <text x="12" y="125" textAnchor="middle" className="text-[6.5px] fill-white font-extrabold">
            ADULT
          </text>
        </g>

        {/* 3. Mother Stature */}
        <g transform="translate(150, 0)">
          <rect x="0" y={motherY} width="22" height={Math.max(2, 130 - motherY)} rx="3" fill="#f472b6" stroke="#db2777" strokeWidth="1" />
          <circle cx="11" cy={motherY - 6} r="5" fill="#db2777" />
          <text x="11" y={motherY - 13} textAnchor="middle" className="text-[7px] fill-pink-700 dark:fill-pink-300 font-bold">
            {safeMother}cm
          </text>
          <text x="11" y="125" textAnchor="middle" className="text-[6.5px] fill-pink-950 font-extrabold">
            MOM
          </text>
        </g>

        {/* 4. Father Stature */}
        <g transform="translate(205, 0)">
          <rect x="0" y={fatherY} width="22" height={Math.max(2, 130 - fatherY)} rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
          <circle cx="11" cy={fatherY - 6} r="5" fill="#0284c7" />
          <text x="11" y={fatherY - 13} textAnchor="middle" className="text-[7px] fill-sky-800 dark:fill-sky-300 font-bold">
            {safeFather}cm
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

  const [khamisError, setKhamisError] = useState<string | null>(null);
  const [khamisResult, setKhamisResult] = useState<KhamisRocheResult | null>(null);
  const [khamisSaveSuccess, setKhamisSaveSuccess] = useState(false);
  const [khamisCopied, setKhamisCopied] = useState(false);
  const khamisSaved = useCardSaved<KhamisRocheResult>("saved_height_khamis");

  // ─── CARD 2: MID-PARENTAL HEIGHT ───
  const [midUnitMode, setMidUnitMode] = useState<HeightUnitMode>("imperial");
  const [midGender, setMidGender] = useState<Gender>("male");
  const [midMomFeet, setMidMomFeet] = useState("5");
  const [midMomInches, setMidMomInches] = useState("2");
  const [midMomCm, setMidMomCm] = useState("157.5");
  const [midDadFeet, setMidDadFeet] = useState("5");
  const [midDadInches, setMidDadInches] = useState("10");
  const [midDadCm, setMidDadCm] = useState("177.8");

  const [midError, setMidError] = useState<string | null>(null);
  const [midResult, setMidResult] = useState<MidParentalResult | null>(null);
  const [midSaveSuccess, setMidSaveSuccess] = useState(false);
  const [midCopied, setMidCopied] = useState(false);
  const midSaved = useCardSaved<MidParentalResult>("saved_height_midparental");

  // ─── CARD 3: 2-YEAR-OLD DOUBLING ───
  const [doublingUnitMode, setDoublingUnitMode] = useState<HeightUnitMode>("imperial");
  const [doublingGender, setDoublingGender] = useState<Gender>("male");
  const [h2Feet, setH2Feet] = useState("2");
  const [h2Inches, setH2Inches] = useState("10");
  const [h2Cm, setH2Cm] = useState("86.4");

  const [doublingError, setDoublingError] = useState<string | null>(null);
  const [doublingResult, setDoublingResult] = useState<ToddlerDoublingResult | null>(null);
  const [doublingSaveSuccess, setDoublingSaveSuccess] = useState(false);
  const [doublingCopied, setDoublingCopied] = useState(false);
  const doublingSaved = useCardSaved<ToddlerDoublingResult>("saved_height_doubling");

  // ─── CARD 4: HEIGHT CONVERTER ───
  const [convUnit, setConvUnit] = useState<"feet_inches" | "inches" | "cm" | "meters" | "mm">("feet_inches");
  const [convFeet, setConvFeet] = useState("5");
  const [convInches, setConvInches] = useState("9");
  const [convValue, setConvValue] = useState("175.3");

  const [convError, setConvError] = useState<string | null>(null);
  const [convResult, setConvResult] = useState<HeightConverterResult | null>(null);
  const [convSaveSuccess, setConvSaveSuccess] = useState(false);
  const [convCopied, setConvCopied] = useState(false);
  const convSaved = useCardSaved<HeightConverterResult>("saved_height_converter");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // ─── Bidirectional Unit Mode Handlers ───
  const handleUnitModeChange = (mode: HeightUnitMode) => {
    if (mode === unitMode) return;
    setUnitMode(mode);
    if (mode === "metric") {
      const cCm = feetInchesToCm(parseFloat(childFeet) || 0, parseFloat(childInches) || 0);
      const cKg = lbsToKg(parseFloat(childWeightLbs) || 0);
      const mCm = feetInchesToCm(parseFloat(motherFeet) || 0, parseFloat(motherInches) || 0);
      const fCm = feetInchesToCm(parseFloat(fatherFeet) || 0, parseFloat(fatherInches) || 0);
      setChildCm(cCm > 0 ? cCm.toString() : "");
      setChildWeightKg(cKg > 0 ? cKg.toString() : "");
      setMotherCm(mCm > 0 ? mCm.toString() : "");
      setFatherCm(fCm > 0 ? fCm.toString() : "");
    } else {
      const cFi = cmToFeetInches(parseFloat(childCm) || 0);
      const cLbs = kgToLbs(parseFloat(childWeightKg) || 0);
      const mFi = cmToFeetInches(parseFloat(motherCm) || 0);
      const fFi = cmToFeetInches(parseFloat(fatherCm) || 0);
      setChildFeet(cFi.feet.toString());
      setChildInches(cFi.inches.toString());
      setChildWeightLbs(cLbs > 0 ? cLbs.toString() : "");
      setMotherFeet(mFi.feet.toString());
      setMotherInches(mFi.inches.toString());
      setFatherFeet(fFi.feet.toString());
      setFatherInches(fFi.inches.toString());
    }
  };

  const handleMidUnitModeChange = (mode: HeightUnitMode) => {
    if (mode === midUnitMode) return;
    setMidUnitMode(mode);
    if (mode === "metric") {
      const mCm = feetInchesToCm(parseFloat(midMomFeet) || 0, parseFloat(midMomInches) || 0);
      const fCm = feetInchesToCm(parseFloat(midDadFeet) || 0, parseFloat(midDadInches) || 0);
      setMidMomCm(mCm > 0 ? mCm.toString() : "");
      setMidDadCm(fCm > 0 ? fCm.toString() : "");
    } else {
      const mFi = cmToFeetInches(parseFloat(midMomCm) || 0);
      const fFi = cmToFeetInches(parseFloat(midDadCm) || 0);
      setMidMomFeet(mFi.feet.toString());
      setMidMomInches(mFi.inches.toString());
      setMidDadFeet(fFi.feet.toString());
      setMidDadInches(fFi.inches.toString());
    }
  };

  const handleDoublingUnitModeChange = (mode: HeightUnitMode) => {
    if (mode === doublingUnitMode) return;
    setDoublingUnitMode(mode);
    if (mode === "metric") {
      const cm = feetInchesToCm(parseFloat(h2Feet) || 0, parseFloat(h2Inches) || 0);
      setH2Cm(cm > 0 ? cm.toString() : "");
    } else {
      const fi = cmToFeetInches(parseFloat(h2Cm) || 0);
      setH2Feet(fi.feet.toString());
      setH2Inches(fi.inches.toString());
    }
  };

  // ─── Active Computed Metrics for Visualizer ───
  const activeChildCm = useMemo(() => {
    if (unitMode === "metric") {
      const val = parseFloat(childCm);
      return !isNaN(val) && val > 0 ? val : 111.8;
    }
    const ft = parseFloat(childFeet);
    const inc = parseFloat(childInches);
    const res = feetInchesToCm(isNaN(ft) ? 0 : ft, isNaN(inc) ? 0 : inc);
    return res > 0 ? res : 111.8;
  }, [unitMode, childCm, childFeet, childInches]);

  const activeMotherCm = useMemo(() => {
    if (unitMode === "metric") {
      const val = parseFloat(motherCm);
      return !isNaN(val) && val > 0 ? val : 165.1;
    }
    const ft = parseFloat(motherFeet);
    const inc = parseFloat(motherInches);
    const res = feetInchesToCm(isNaN(ft) ? 0 : ft, isNaN(inc) ? 0 : inc);
    return res > 0 ? res : 165.1;
  }, [unitMode, motherCm, motherFeet, motherInches]);

  const activeFatherCm = useMemo(() => {
    if (unitMode === "metric") {
      const val = parseFloat(fatherCm);
      return !isNaN(val) && val > 0 ? val : 177.8;
    }
    const ft = parseFloat(fatherFeet);
    const inc = parseFloat(fatherInches);
    const res = feetInchesToCm(isNaN(ft) ? 0 : ft, isNaN(inc) ? 0 : inc);
    return res > 0 ? res : 177.8;
  }, [unitMode, fatherCm, fatherFeet, fatherInches]);

  // ─── Khamis Calculation ───
  const handleKhamisCalc = useCallback(() => {
    const ageVal = parseFloat(childAge);
    if (isNaN(ageVal) || ageVal < 4.0 || ageVal > 17.0) {
      setKhamisError("Khamis-Roche linear regression is clinically validated for ages 4.0 to 17.0 years.");
      setKhamisResult(null);
      return;
    }

    let effectiveChildCm = 0;
    let effectiveChildKg = 0;
    let effectiveMotherCm = 0;
    let effectiveFatherCm = 0;

    if (unitMode === "imperial") {
      const ft = parseFloat(childFeet);
      const inc = parseFloat(childInches);
      const wt = parseFloat(childWeightLbs);
      const mFt = parseFloat(motherFeet);
      const mIn = parseFloat(motherInches);
      const fFt = parseFloat(fatherFeet);
      const fIn = parseFloat(fatherInches);

      if (isNaN(ft) && isNaN(inc)) {
        setKhamisError("Please enter the child's current height.");
        setKhamisResult(null);
        return;
      }
      effectiveChildCm = feetInchesToCm(isNaN(ft) ? 0 : ft, isNaN(inc) ? 0 : inc);
      if (effectiveChildCm <= 0) {
        setKhamisError("Child height must be greater than 0.");
        setKhamisResult(null);
        return;
      }

      if (isNaN(wt) || wt <= 0) {
        setKhamisError("Child weight must be greater than 0.");
        setKhamisResult(null);
        return;
      }
      effectiveChildKg = lbsToKg(wt);

      effectiveMotherCm = feetInchesToCm(isNaN(mFt) ? 0 : mFt, isNaN(mIn) ? 0 : mIn);
      effectiveFatherCm = feetInchesToCm(isNaN(fFt) ? 0 : fFt, isNaN(fIn) ? 0 : fIn);
      if (effectiveMotherCm <= 0 || effectiveFatherCm <= 0) {
        setKhamisError("Both mother's and father's heights must be greater than 0.");
        setKhamisResult(null);
        return;
      }
    } else {
      const cCm = parseFloat(childCm);
      const cKg = parseFloat(childWeightKg);
      const mCm = parseFloat(motherCm);
      const fCm = parseFloat(fatherCm);

      if (isNaN(cCm) || cCm <= 0) {
        setKhamisError("Child height must be greater than 0 cm.");
        setKhamisResult(null);
        return;
      }
      effectiveChildCm = cCm;

      if (isNaN(cKg) || cKg <= 0) {
        setKhamisError("Child weight must be greater than 0 kg.");
        setKhamisResult(null);
        return;
      }
      effectiveChildKg = cKg;

      if (isNaN(mCm) || mCm <= 0 || isNaN(fCm) || fCm <= 0) {
        setKhamisError("Both mother's and father's heights must be greater than 0 cm.");
        setKhamisResult(null);
        return;
      }
      effectiveMotherCm = mCm;
      effectiveFatherCm = fCm;
    }

    setKhamisError(null);
    const res = calculateKhamisRoche({
      childGender,
      childAgeYears: ageVal,
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

  // ─── Mid-Parental Calculation ───
  const handleMidCalc = useCallback(() => {
    let momCm = 0;
    let dadCm = 0;

    if (midUnitMode === "imperial") {
      const mFt = parseFloat(midMomFeet);
      const mIn = parseFloat(midMomInches);
      const dFt = parseFloat(midDadFeet);
      const dIn = parseFloat(midDadInches);

      momCm = feetInchesToCm(isNaN(mFt) ? 0 : mFt, isNaN(mIn) ? 0 : mIn);
      dadCm = feetInchesToCm(isNaN(dFt) ? 0 : dFt, isNaN(dIn) ? 0 : dIn);
    } else {
      momCm = parseFloat(midMomCm) || 0;
      dadCm = parseFloat(midDadCm) || 0;
    }

    if (momCm <= 0 || dadCm <= 0) {
      setMidError("Please enter valid positive statures for both mother and father.");
      setMidResult(null);
      return;
    }

    setMidError(null);
    const res = calculateMidParental({
      childGender: midGender,
      motherHeightCm: momCm,
      fatherHeightCm: dadCm,
    });
    setMidResult(res);
  }, [midUnitMode, midGender, midMomFeet, midMomInches, midMomCm, midDadFeet, midDadInches, midDadCm]);

  // ─── Toddler Doubling Calculation ───
  const handleDoublingCalc = useCallback(() => {
    let cm = 0;
    if (doublingUnitMode === "imperial") {
      const ft = parseFloat(h2Feet);
      const inc = parseFloat(h2Inches);
      cm = feetInchesToCm(isNaN(ft) ? 0 : ft, isNaN(inc) ? 0 : inc);
    } else {
      cm = parseFloat(h2Cm) || 0;
    }

    if (cm <= 0) {
      setDoublingError("Please enter a valid positive toddler stature.");
      setDoublingResult(null);
      return;
    }

    setDoublingError(null);
    const res = calculateToddlerDoubling({
      childGender: doublingGender,
      heightAt2YearsCm: cm,
    });
    setDoublingResult(res);
  }, [doublingUnitMode, doublingGender, h2Feet, h2Inches, h2Cm]);

  // ─── Converter Calculation ───
  const handleConvCalc = useCallback(() => {
    let val = 0;
    if (convUnit === "feet_inches") {
      const ft = parseFloat(convFeet);
      const inc = parseFloat(convInches);
      val = (isNaN(ft) ? 0 : ft) * 12 + (isNaN(inc) ? 0 : inc);
    } else {
      val = parseFloat(convValue);
    }

    if (isNaN(val) || val <= 0) {
      setConvError("Please enter a valid positive stature to convert.");
      setConvResult(null);
      return;
    }

    setConvError(null);
    const res = calculateHeightConverter({
      fromUnit: convUnit,
      feet: parseFloat(convFeet) || 0,
      inches: parseFloat(convInches) || 0,
      value: parseFloat(convValue) || 0,
    });
    setConvResult(res);
  }, [convUnit, convFeet, convInches, convValue]);

  // Auto calculate on mount or relevant dependency changes
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

  // ─── Copy Handlers ───
  const handleCopyKhamis = () => {
    if (!khamisResult) return;
    const text = `Khamis-Roche Height Prediction:
Child: ${childGender === "male" ? "Boy" : "Girl"}, Age ${childAge} yrs
Predicted Adult Height: ${khamisResult.predictedHeightFtIn.text} (${khamisResult.predictedHeightCm} cm)
90% Confidence Interval: ${khamisResult.confidenceIntervalFtIn.lowerText} – ${khamisResult.confidenceIntervalFtIn.upperText} (${khamisResult.confidenceIntervalCm.lower} – ${khamisResult.confidenceIntervalCm.upper} cm)
Growth Remaining: +${khamisResult.growthRemainingInches}" (+${khamisResult.growthRemainingCm} cm)
Adult Stature Percentile Estimate: ${formatOrdinalPercentile(khamisResult.adultPercentile)} (Adult reference-distribution percentile estimate)
Educational estimate only; not medical advice.`;
    navigator.clipboard.writeText(text);
    flashSave(setKhamisCopied);
  };

  const handleDownloadKhamisTxt = () => {
    if (!khamisResult) return;
    const text = `================================================
CALCPLATFORM — KHAMIS-ROCHE HEIGHT REPORT
================================================
Method: Khamis-Roche Linear Regression (1994)
Gender: ${childGender === "male" ? "Boy / Male" : "Girl / Female"}
Chronological Age: ${childAge} years
Current Height: ${unitMode === "imperial" ? `${childFeet}' ${childInches}"` : `${childCm} cm`}
Weight: ${unitMode === "imperial" ? `${childWeightLbs} lbs` : `${childWeightKg} kg`}
Mother's Height: ${unitMode === "imperial" ? `${motherFeet}' ${motherInches}"` : `${motherCm} cm`}
Father's Height: ${unitMode === "imperial" ? `${fatherFeet}' ${fatherInches}"` : `${fatherCm} cm`}

RESULTS:
Predicted Adult Height: ${khamisResult.predictedHeightFtIn.text} (${khamisResult.predictedHeightCm} cm)
90% Confidence Interval: ${khamisResult.confidenceIntervalFtIn.lowerText} to ${khamisResult.confidenceIntervalFtIn.upperText} (${khamisResult.confidenceIntervalCm.lower} – ${khamisResult.confidenceIntervalCm.upper} cm)
Growth Remaining: +${khamisResult.growthRemainingInches}" (+${khamisResult.growthRemainingCm} cm)
Adult Percentile: ${formatOrdinalPercentile(khamisResult.adultPercentile)}

DISCLAIMER:
This calculation provides an educational estimate based on statistical regression.
It is not a medical diagnosis or a substitute for professional pediatric evaluation.
Generated on: ${new Date().toLocaleString()}
`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `khamis_roche_prediction_${childAge}yr.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyMid = () => {
    if (!midResult) return;
    const text = `Tanner Mid-Parental Height:
Target Child: ${midGender === "male" ? "Boy" : "Girl"}
Target Genetic Stature: ${midResult.targetHeightFtIn.text} (${midResult.targetHeightCm} cm)
95% Target Range: ${midResult.targetRangeFtIn.lowerText} – ${midResult.targetRangeFtIn.upperText} (${midResult.targetRangeCm.lower} – ${midResult.targetRangeCm.upper} cm)
Adult Population Percentile: ${formatOrdinalPercentile(midResult.adultPercentile)}`;
    navigator.clipboard.writeText(text);
    flashSave(setMidCopied);
  };

  const handleCopyDoubling = () => {
    if (!doublingResult) return;
    const text = `Toddler Doubling Method:
Gender: ${doublingGender === "male" ? "Boy (at 24 mos)" : "Girl (at 18 mos)"}
Doubling Adult Prediction: ${doublingResult.predictedHeightFtIn.text} (${doublingResult.predictedHeightCm} cm)
Adult Percentile: ${formatOrdinalPercentile(doublingResult.adultPercentile)}`;
    navigator.clipboard.writeText(text);
    flashSave(setDoublingCopied);
  };

  const handleCopyConv = () => {
    if (!convResult) return;
    const text = `Height Conversion:
Stature: ${convResult.feetInches.text} = ${convResult.totalCm} cm (${convResult.totalInches} in, ${convResult.meters} m, ${convResult.millimeters} mm)
Adult Male Percentile: ${formatOrdinalPercentile(convResult.malePercentile)}
Adult Female Percentile: ${formatOrdinalPercentile(convResult.femalePercentile)}`;
    navigator.clipboard.writeText(text);
    flashSave(setConvCopied);
  };

  // ─── Restore Handlers ───
  const restoreKhamis = (raw: any) => {
    if (!raw) return;
    setChildGender(raw.childGender || "male");
    setChildAge(raw.childAge || "5.2");
    setUnitMode(raw.unitMode || "imperial");
    setChildFeet(raw.childFeet || "3");
    setChildInches(raw.childInches || "8");
    setChildCm(raw.childCm || "111.8");
    setChildWeightLbs(raw.childWeightLbs || "40");
    setChildWeightKg(raw.childWeightKg || "18.1");
    setMotherFeet(raw.motherFeet || "5");
    setMotherInches(raw.motherInches || "5");
    setMotherCm(raw.motherCm || "165.1");
    setFatherFeet(raw.fatherFeet || "5");
    setFatherInches(raw.fatherInches || "10");
    setFatherCm(raw.fatherCm || "177.8");
    flashSave(setKhamisSaveSuccess);
  };

  const restoreMid = (raw: any) => {
    if (!raw) return;
    setMidGender(raw.midGender || "male");
    setMidUnitMode(raw.midUnitMode || "imperial");
    setMidMomFeet(raw.midMomFeet || "5");
    setMidMomInches(raw.midMomInches || "2");
    setMidMomCm(raw.midMomCm || "157.5");
    setMidDadFeet(raw.midDadFeet || "5");
    setMidDadInches(raw.midDadInches || "10");
    setMidDadCm(raw.midDadCm || "177.8");
    flashSave(setMidSaveSuccess);
  };

  const restoreDoubling = (raw: any) => {
    if (!raw) return;
    setDoublingGender(raw.doublingGender || "male");
    setDoublingUnitMode(raw.doublingUnitMode || "imperial");
    setH2Feet(raw.h2Feet || "2");
    setH2Inches(raw.h2Inches || "10");
    setH2Cm(raw.h2Cm || "86.4");
    flashSave(setDoublingSaveSuccess);
  };

  const restoreConv = (raw: any) => {
    if (!raw) return;
    setConvUnit(raw.convUnit || "feet_inches");
    setConvFeet(raw.convFeet || "5");
    setConvInches(raw.convInches || "9");
    setConvValue(raw.convValue || "175.3");
    flashSave(setConvSaveSuccess);
  };

  // ─── Global Report Data ───
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];

    if (khamisResult) {
      sections.push({
        title: "Khamis-Roche Multi-Variable Height Prediction",
        items: [
          { label: "Child Profile", value: `${childGender === "male" ? "Boy" : "Girl"}, Age ${childAge} yrs` },
          { label: "Predicted Adult Height", value: `${khamisResult.predictedHeightFtIn.text} (${khamisResult.predictedHeightCm} cm)` },
          {
            label: "90% Confidence Interval",
            value: `${khamisResult.confidenceIntervalFtIn.lowerText} to ${khamisResult.confidenceIntervalFtIn.upperText} (${khamisResult.confidenceIntervalCm.lower} – ${khamisResult.confidenceIntervalCm.upper} cm)`,
          },
          { label: "Growth Remaining", value: `+${khamisResult.growthRemainingInches} inches (+${khamisResult.growthRemainingCm} cm)` },
          { label: "Adult Stature Percentile Estimate", value: formatOrdinalPercentile(khamisResult.adultPercentile) },
          { label: "Mid-Parent Stature (MPS)", value: `${cmToFeetInches(khamisResult.midParentHeightCm).text} (${khamisResult.midParentHeightCm} cm)` },
        ],
      });
    }

    if (midResult) {
      sections.push({
        title: "Tanner Mid-Parental Genetic Target Stature",
        items: [
          { label: "Target Mid-Parental Height", value: `${midResult.targetHeightFtIn.text} (${midResult.targetHeightCm} cm)` },
          {
            label: "95% Target Genetic Range",
            value: `${midResult.targetRangeFtIn.lowerText} to ${midResult.targetRangeFtIn.upperText} (${midResult.targetRangeCm.lower} – ${midResult.targetRangeCm.upper} cm)`,
          },
          { label: "Adult Population Percentile", value: formatOrdinalPercentile(midResult.adultPercentile) },
        ],
      });
    }

    if (doublingResult) {
      sections.push({
        title: "Toddler Doubling Method",
        items: [
          { label: "Method Type", value: doublingGender === "male" ? "Boys (24 months doubling)" : "Girls (18 months / age 2 adjustment)" },
          { label: "Doubling Adult Prediction", value: `${doublingResult.predictedHeightFtIn.text} (${doublingResult.predictedHeightCm} cm)` },
          { label: "Adult Percentile", value: formatOrdinalPercentile(doublingResult.adultPercentile) },
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
        { label: "Population Percentile", value: khamisResult ? formatOrdinalPercentile(khamisResult.adultPercentile) : "—" },
      ],
      sections,
      notes: [
        "This calculator provides an educational estimate and is not a medical diagnosis or a substitute for evaluation by a pediatrician or other qualified healthcare professional.",
        "Epiphyseal plate fusion, endocrine status, pubertal timing, and systemic nutrition govern individual growth trajectories.",
      ],
    };
  }, [khamisResult, midResult, doublingResult, childGender, childAge]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ MEDICAL & EDUCATIONAL ESTIMATE DISCLAIMER ═══════════════════ */}
      <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5 shadow-2xs print:break-inside-avoid">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Educational Estimate:</strong> This calculator provides mathematical predictions based on published statistical models (Khamis-Roche, Tanner, CDC references). It is <strong>not a medical diagnosis</strong> or a substitute for evaluation by a pediatrician, pediatric endocrinologist, or qualified healthcare provider.
        </p>
      </div>

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
            `${childGender === "male" ? "Boy" : "Girl"} Age ${childAge}: ${khamisResult.predictedHeightFtIn.text} (${khamisResult.predictedHeightCm}cm)`,
            khamisResult,
            {
              childGender,
              childAge,
              unitMode,
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
            }
          );
          flashSave(setKhamisSaveSuccess);
        }}
        onCopy={handleCopyKhamis}
        isCopied={khamisCopied}
        onDownloadTxt={handleDownloadKhamisTxt}
      >
        <div className="space-y-3">
          {/* Unit Toggle & Gender Selector */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-zinc-100 dark:border-zinc-800 text-xs print:hidden">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Child&apos;s Gender:</span>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5">
                <button
                  type="button"
                  id="btn-gender-boy"
                  aria-label="Select Boy"
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
                  id="btn-gender-girl"
                  aria-label="Select Girl"
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

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Units:</span>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5">
                <button
                  type="button"
                  id="btn-unit-imperial"
                  aria-label="Select US Customary units"
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
                  id="btn-unit-metric"
                  aria-label="Select Metric units"
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

          {/* Validation Alert */}
          {khamisError && (
            <div role="alert" className="p-2 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{khamisError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Column: Form Inputs */}
            <div className="md:col-span-7 space-y-2.5 text-xs">
              <div className="grid grid-cols-2 gap-2">
                {/* Child Age */}
                <div className="space-y-1">
                  <label htmlFor="khamis-child-age" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                    Child&apos;s Chronological Age (Years)
                  </label>
                  <Input
                    id="khamis-child-age"
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
                  <label htmlFor="khamis-child-weight" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                    Child&apos;s Weight ({unitMode === "imperial" ? "lbs" : "kg"})
                  </label>
                  {unitMode === "imperial" ? (
                    <Input
                      id="khamis-child-weight"
                      type="number"
                      value={childWeightLbs}
                      onChange={(e) => setChildWeightLbs(e.target.value)}
                      min={10}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  ) : (
                    <Input
                      id="khamis-child-weight"
                      type="number"
                      value={childWeightKg}
                      onChange={(e) => setChildWeightKg(e.target.value)}
                      min={5}
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
                        id="khamis-child-feet"
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
                        id="khamis-child-inches"
                        type="number"
                        value={childInches}
                        onChange={(e) => setChildInches(e.target.value)}
                        min={0}
                        max={11.9}
                        step={0.1}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <span className="text-zinc-500 font-semibold">in</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Input
                      id="khamis-child-cm"
                      type="number"
                      value={childCm}
                      onChange={(e) => setChildCm(e.target.value)}
                      min={50}
                      max={220}
                      step={0.1}
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
                        id="khamis-mother-feet"
                        type="number"
                        value={motherFeet}
                        onChange={(e) => setMotherFeet(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                        placeholder="5 ft"
                      />
                      <Input
                        id="khamis-mother-inches"
                        type="number"
                        value={motherInches}
                        onChange={(e) => setMotherInches(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                        placeholder="5 in"
                      />
                    </div>
                  ) : (
                    <Input
                      id="khamis-mother-cm"
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
                        id="khamis-father-feet"
                        type="number"
                        value={fatherFeet}
                        onChange={(e) => setFatherFeet(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                        placeholder="5 ft"
                      />
                      <Input
                        id="khamis-father-inches"
                        type="number"
                        value={fatherInches}
                        onChange={(e) => setFatherInches(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                        placeholder="10 in"
                      />
                    </div>
                  ) : (
                    <Input
                      id="khamis-father-cm"
                      type="number"
                      value={fatherCm}
                      onChange={(e) => setFatherCm(e.target.value)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-1 print:hidden">
                <Button
                  id="btn-khamis-calculate"
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
                    setChildCm("111.8");
                    setChildWeightLbs("40");
                    setChildWeightKg("18.1");
                    setMotherFeet("5");
                    setMotherInches("5");
                    setMotherCm("165.1");
                    setFatherFeet("5");
                    setFatherInches("10");
                    setFatherCm("177.8");
                    setKhamisError(null);
                  }}
                  className="text-xs font-semibold h-7 px-3 cursor-pointer"
                >
                  Reset Defaults
                </Button>
              </div>
            </div>

            {/* Right Column: 2D Stature Comparison Visualizer */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                STATURE TRAJECTORY PREVIEW
              </span>
              <StatureComparisonVisualizer2D
                childCurrentCm={activeChildCm}
                childPredictedCm={khamisResult ? khamisResult.predictedHeightCm : 171.3}
                motherCm={activeMotherCm}
                fatherCm={activeFatherCm}
                childGender={childGender}
              />
            </div>
          </div>

          {/* Results Metric Badges */}
          {khamisResult && (
            <div aria-live="polite" className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
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
                    {khamisResult.growthRemainingInches >= 0 ? `+${khamisResult.growthRemainingInches}"` : `${khamisResult.growthRemainingInches}"`}
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-medium">
                    ({khamisResult.growthRemainingCm >= 0 ? `+${khamisResult.growthRemainingCm}` : khamisResult.growthRemainingCm} cm left to grow)
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">Adult Percentile</span>
                  <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 font-sans tabular-nums">
                    {formatOrdinalPercentile(khamisResult.adultPercentile)}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">
                    Adult Stature Percentile Estimate
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...khamisSaved}
          cardTitle="Khamis-Roche"
          formatSummary={(r) => `Predicted ${r.predictedHeightFtIn.text} (${r.predictedHeightCm}cm), ${formatOrdinalPercentile(r.adultPercentile)}`}
          onRestore={restoreKhamis}
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
            midResult,
            {
              midGender,
              midUnitMode,
              midMomFeet,
              midMomInches,
              midMomCm,
              midDadFeet,
              midDadInches,
              midDadCm,
            }
          );
          flashSave(setMidSaveSuccess);
        }}
        onCopy={handleCopyMid}
        isCopied={midCopied}
      >
        <div className="space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-zinc-100 dark:border-zinc-800 print:hidden">
            <div className="flex items-center gap-1.5">
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

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Units:</span>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5">
                <button
                  type="button"
                  onClick={() => handleMidUnitModeChange("imperial")}
                  className={`px-2.5 py-0.5 rounded text-xs font-semibold cursor-pointer ${
                    midUnitMode === "imperial"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  US (ft/in)
                </button>
                <button
                  type="button"
                  onClick={() => handleMidUnitModeChange("metric")}
                  className={`px-2.5 py-0.5 rounded text-xs font-semibold cursor-pointer ${
                    midUnitMode === "metric"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  Metric (cm)
                </button>
              </div>
            </div>
          </div>

          {midError && (
            <div role="alert" className="p-2 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{midError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Mother&apos;s Height</label>
              {midUnitMode === "imperial" ? (
                <div className="flex gap-1">
                  <Input
                    id="tanner-mom-feet"
                    type="number"
                    value={midMomFeet}
                    onChange={(e) => setMidMomFeet(e.target.value)}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Feet"
                  />
                  <Input
                    id="tanner-mom-inches"
                    type="number"
                    value={midMomInches}
                    onChange={(e) => setMidMomInches(e.target.value)}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Inches"
                  />
                </div>
              ) : (
                <Input
                  id="tanner-mom-cm"
                  type="number"
                  value={midMomCm}
                  onChange={(e) => setMidMomCm(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  placeholder="cm"
                />
              )}
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Father&apos;s Height</label>
              {midUnitMode === "imperial" ? (
                <div className="flex gap-1">
                  <Input
                    id="tanner-dad-feet"
                    type="number"
                    value={midDadFeet}
                    onChange={(e) => setMidDadFeet(e.target.value)}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Feet"
                  />
                  <Input
                    id="tanner-dad-inches"
                    type="number"
                    value={midDadInches}
                    onChange={(e) => setMidDadInches(e.target.value)}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Inches"
                  />
                </div>
              ) : (
                <Input
                  id="tanner-dad-cm"
                  type="number"
                  value={midDadCm}
                  onChange={(e) => setMidDadCm(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  placeholder="cm"
                />
              )}
            </div>
          </div>

          <div className="flex gap-2 print:hidden">
            <Button
              id="btn-tanner-calculate"
              onClick={handleMidCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Mid-Parental Height
            </Button>
          </div>

          {midResult && (
            <div aria-live="polite" className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
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
                    {formatOrdinalPercentile(midResult.adultPercentile)}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">Adult reference distribution</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...midSaved}
          cardTitle="Mid-Parental"
          formatSummary={(r) => `Target ${r.targetHeightFtIn.text} (${r.targetHeightCm}cm), Range: ${r.targetRangeFtIn.lowerText}–${r.targetRangeFtIn.upperText}`}
          onRestore={restoreMid}
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
            doublingResult,
            {
              doublingGender,
              doublingUnitMode,
              h2Feet,
              h2Inches,
              h2Cm,
            }
          );
          flashSave(setDoublingSaveSuccess);
        }}
        onCopy={handleCopyDoubling}
        isCopied={doublingCopied}
      >
        <div className="space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-zinc-100 dark:border-zinc-800 print:hidden">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Gender Rule:</span>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5">
                <button
                  type="button"
                  onClick={() => setDoublingGender("male")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    doublingGender === "male" ? "bg-blue-600 text-white shadow-xs" : "text-zinc-500"
                  }`}
                >
                  Boy (Double at 24 mos)
                </button>
                <button
                  type="button"
                  onClick={() => setDoublingGender("female")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    doublingGender === "female" ? "bg-pink-600 text-white shadow-xs" : "text-zinc-500"
                  }`}
                >
                  Girl (Double at 18 mos)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Units:</span>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5">
                <button
                  type="button"
                  onClick={() => handleDoublingUnitModeChange("imperial")}
                  className={`px-2.5 py-0.5 rounded text-xs font-semibold cursor-pointer ${
                    doublingUnitMode === "imperial"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  US (ft/in)
                </button>
                <button
                  type="button"
                  onClick={() => handleDoublingUnitModeChange("metric")}
                  className={`px-2.5 py-0.5 rounded text-xs font-semibold cursor-pointer ${
                    doublingUnitMode === "metric"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  Metric (cm)
                </button>
              </div>
            </div>
          </div>

          {doublingError && (
            <div role="alert" className="p-2 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{doublingError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label htmlFor="toddler-height-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Height at 2 Years (or 18 mos for girls)
              </label>
              {doublingUnitMode === "imperial" ? (
                <div className="flex gap-1">
                  <Input
                    id="toddler-feet"
                    type="number"
                    value={h2Feet}
                    onChange={(e) => setH2Feet(e.target.value)}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Feet"
                  />
                  <Input
                    id="toddler-inches"
                    type="number"
                    value={h2Inches}
                    onChange={(e) => setH2Inches(e.target.value)}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Inches"
                  />
                </div>
              ) : (
                <Input
                  id="toddler-height-input"
                  type="number"
                  value={h2Cm}
                  onChange={(e) => setH2Cm(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  placeholder="cm"
                />
              )}
            </div>

            <div className="flex items-center">
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 italic">
                Rule of thumb heuristic: Children attain roughly 50% of adult stature around age 2 (girls slightly earlier at 18 months).
              </p>
            </div>
          </div>

          <div className="flex gap-2 print:hidden">
            <Button
              id="btn-toddler-calculate"
              onClick={handleDoublingCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Doubling Stature
            </Button>
          </div>

          {doublingResult && (
            <div aria-live="polite" className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block font-medium">Doubling Adult Prediction</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {doublingResult.predictedHeightFtIn.text}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    {doublingResult.predictedHeightCm} cm ({formatOrdinalPercentile(doublingResult.adultPercentile)})
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
          onRestore={restoreDoubling}
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
            `Converted: ${convResult.feetInches.text} = ${convResult.totalCm} cm`,
            convResult,
            {
              convUnit,
              convFeet,
              convInches,
              convValue,
            }
          );
          flashSave(setConvSaveSuccess);
        }}
        onCopy={handleCopyConv}
        isCopied={convCopied}
      >
        <div className="space-y-3 text-xs">
          {convError && (
            <div role="alert" className="p-2 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{convError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label htmlFor="conv-unit-select" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Input Format</label>
              <select
                id="conv-unit-select"
                value={convUnit}
                onChange={(e) => setConvUnit(e.target.value as any)}
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
              >
                <option value="feet_inches">Feet &amp; Inches (e.g. 5 ft 9 in)</option>
                <option value="cm">Centimeters (cm)</option>
                <option value="inches">Total Inches (in)</option>
                <option value="meters">Meters (m)</option>
                <option value="mm">Millimeters (mm)</option>
              </select>
            </div>

            <div>
              <label htmlFor={convUnit === "feet_inches" ? "conv-feet" : "conv-val"} className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Enter Stature</label>
              {convUnit === "feet_inches" ? (
                <div className="flex gap-1">
                  <Input
                    id="conv-feet"
                    type="number"
                    value={convFeet}
                    onChange={(e) => setConvFeet(e.target.value)}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Feet"
                  />
                  <Input
                    id="conv-inches"
                    type="number"
                    value={convInches}
                    onChange={(e) => setConvInches(e.target.value)}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Inches"
                  />
                </div>
              ) : (
                <Input
                  id="conv-val"
                  type="number"
                  value={convValue}
                  onChange={(e) => setConvValue(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              )}
            </div>
          </div>

          <div className="flex gap-2 print:hidden">
            <Button
              id="btn-conv-calculate"
              onClick={handleConvCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Convert Stature
            </Button>
          </div>

          {convResult && (
            <div aria-live="polite" className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
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
                    {formatOrdinalPercentile(convResult.malePercentile)}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">Ref: 5&apos;9.7&quot; (177cm)</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">Adult Female Percentile</span>
                  <span className="text-lg font-bold text-pink-700 dark:text-pink-300 font-sans tabular-nums">
                    {formatOrdinalPercentile(convResult.femalePercentile)}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">Ref: 5&apos;4.4&quot; (163.5cm)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...convSaved}
          cardTitle="Height Converter"
          formatSummary={(r) => `${r.feetInches.text} = ${r.totalCm}cm (${r.meters}m)`}
          onRestore={restoreConv}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1 print:hidden">
        <Button
          id="btn-generate-height-report"
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
