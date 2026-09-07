"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Download,
  Trash2,
  FileSpreadsheet,
  Copy,
  Check,
  RotateCcw,
  Plus,
  Gauge,
  FileText,
  Code2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  DISTANCE_UNITS,
  SPEED_UNITS,
  REAL_WORLD_SPEED_REFERENCES,
  SpeedCalcMode,
  calculateSpeedSolver,
  calculateRacePace,
  calculateMultiSegmentSpeed,
  convertSpeedDirect,
  formatTimeHoursMinutesSeconds,
  formatSpeedPrecision,
  parseNumericInput,
  SpeedSolverResult,
  RacePaceResult,
  MultiSegmentResult,
  SpeedConversionResult,
  JourneyLeg,
  RealWorldSpeedReference,
} from "@/lib/calculator-engine/formulas/speed";

// ─── Local Storage Persistence Hook with Raw State Restoration ──────────────

interface SavedEstimate<TResult, TRawState> {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: TResult;
  rawState: TRawState;
  notes: string;
}

function flashSave(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
}

function useCardSaved<TResult, TRawState>(storageKey: string) {
  const [saved, setSaved] = useState<SavedEstimate<TResult, TRawState>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: TResult, rawState: TRawState, notes = "") => {
      const entry: SavedEstimate<TResult, TRawState> = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        inputSummary,
        result,
        rawState,
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
    <div className="border border-blue-600/30 dark:border-blue-500/30 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-zinc-900 transition-all print:break-inside-avoid print:border-zinc-300">
      <div className="bg-blue-600 text-white px-3.5 py-1.5 flex items-center justify-between print:bg-zinc-100 print:text-zinc-900 print:border-b print:border-zinc-300">
        <h3 className="font-bold text-xs tracking-wide text-white print:text-zinc-900">{title}</h3>
        {hasResult && onSave && (
          <div className="flex items-center gap-1.5 print:hidden">
            {savedCount !== undefined && savedCount > 0 && onToggleSaved && (
              <button
                type="button"
                onClick={onToggleSaved}
                className="text-[10px] bg-white/20 hover:bg-white/30 text-white font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                title="View saved calculations"
                aria-label={`View ${savedCount} saved calculations`}
              >
                {savedCount} saved
              </button>
            )}
            <button
              type="button"
              onClick={onSave}
              aria-label="Save calculation"
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

function SavedDrawer<TResult, TRawState>({
  saved,
  isOpen,
  remove,
  clear,
  cardTitle,
  formatSummary,
  onRestore,
}: {
  saved: SavedEstimate<TResult, TRawState>[];
  isOpen: boolean;
  remove: (id: string) => void;
  clear: () => void;
  cardTitle: string;
  formatSummary: (result: TResult) => string;
  onRestore?: (rawState: TRawState) => void;
}) {
  if (!isOpen || saved.length === 0) return null;

  const exportCsv = () => {
    const rows = [
      ["Timestamp", "Input Summary", "Calculated Result"],
      ...saved.map((e) => [e.timestamp, e.inputSummary, formatSummary(e.result)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `speed_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_history.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs print:hidden">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-bold text-zinc-700 dark:text-zinc-300">
          Saved {cardTitle} ({saved.length})
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
            aria-label="Export history to CSV"
          >
            <Download className="w-3 h-3" /> CSV
          </button>
          <button
            onClick={clear}
            className="text-[10px] text-zinc-400 hover:text-red-500 cursor-pointer"
            aria-label="Clear all saved records"
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
            <div className="flex items-center gap-1 shrink-0">
              {onRestore && (
                <button
                  type="button"
                  onClick={() => onRestore(item.rawState)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer"
                  title="Restore calculation"
                  aria-label="Restore saved calculation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="text-zinc-400 hover:text-red-500 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                title="Delete"
                aria-label="Delete saved calculation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardActionToolbar({
  onCopyResult,
  onCopySummary,
  onCopyLatex,
  onExportCsv,
  onDownloadTxt,
  copiedType,
}: {
  onCopyResult: () => void;
  onCopySummary: () => void;
  onCopyLatex?: () => void;
  onExportCsv: () => void;
  onDownloadTxt: () => void;
  copiedType: string | null;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800 print:hidden text-xs">
      <Button
        variant="outline"
        size="sm"
        onClick={onCopyResult}
        className="h-7 text-[11px] px-2 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
        aria-label="Copy result"
      >
        {copiedType === "result" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-zinc-400" />}
        {copiedType === "result" ? "Copied" : "Copy Result"}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onCopySummary}
        className="h-7 text-[11px] px-2 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
        aria-label="Copy summary"
      >
        {copiedType === "summary" ? <Check className="w-3 h-3 text-emerald-500" /> : <FileText className="w-3 h-3 text-zinc-400" />}
        {copiedType === "summary" ? "Copied" : "Copy Summary"}
      </Button>

      {onCopyLatex && (
        <Button
          variant="outline"
          size="sm"
          onClick={onCopyLatex}
          className="h-7 text-[11px] px-2 gap-1 bg-white dark:bg-zinc-800 cursor-pointer font-mono"
          aria-label="Copy LaTeX formula"
        >
          {copiedType === "latex" ? <Check className="w-3 h-3 text-emerald-500" /> : <Code2 className="w-3 h-3 text-zinc-400" />}
          {copiedType === "latex" ? "Copied" : "LaTeX"}
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={onExportCsv}
        className="h-7 text-[11px] px-2 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
        aria-label="Export CSV"
      >
        <FileSpreadsheet className="w-3 h-3 text-emerald-600" /> CSV
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onDownloadTxt}
        className="h-7 text-[11px] px-2 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
        aria-label="Download TXT report"
      >
        <Download className="w-3 h-3 text-blue-600" /> TXT
      </Button>
    </div>
  );
}

// ─── Real-World Speed Gauge Visualizer ──────────────────────────────────────

function RealWorldSpeedVisualizer({
  speedMph,
  speedKmh,
  closestRef,
}: {
  speedMph: number;
  speedKmh: number;
  closestRef: RealWorldSpeedReference;
}) {
  return (
    <div className="w-full space-y-2 bg-slate-50 dark:bg-zinc-800/40 p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 print:border-zinc-300">
      <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
        <span>REAL-WORLD SPEED SCALE</span>
        <span>{speedMph.toFixed(2)} mph ({speedKmh.toFixed(2)} km/h)</span>
      </div>

      <div className="p-2 bg-white dark:bg-zinc-900 rounded-md border border-blue-200 dark:border-blue-800 flex items-center gap-3 print:border-zinc-300">
        <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-full text-blue-600 dark:text-blue-400 print:hidden">
          <Gauge className="w-5 h-5" />
        </div>
        <div className="text-xs">
          <span className="text-[10px] text-zinc-400 block font-medium">Closest Everyday Speed Anchor</span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
            {closestRef.name} ({closestRef.speedMph} mph / {closestRef.speedKmh} km/h)
          </span>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">
            {closestRef.description}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Raw State Interfaces for State Hydration / Restoration ─────────────────

interface Card1RawState {
  calcMode: SpeedCalcMode;
  distanceVal: string;
  distanceUnit: string;
  timeHours: string;
  timeMinutes: string;
  timeSeconds: string;
  speedVal: string;
  speedUnit: string;
}

interface Card2RawState {
  convertAmount: string;
  convertFrom: string;
  convertTo: string;
}

interface Card3RawState {
  raceDistPreset: string;
  raceCustomMeters: string;
  raceHours: string;
  raceMinutes: string;
  raceSeconds: string;
}

interface Card4RawState {
  legs: JourneyLeg[];
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function SpeedCalculator() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  }, []);

  // ─── CARD 1: TRI-MODAL SOLVER ───
  const [calcMode, setCalcMode] = useState<SpeedCalcMode>("speed");
  const [distanceVal, setDistanceVal] = useState<string>("100");
  const [distanceUnit, setDistanceUnit] = useState<string>("mi");
  const [timeHours, setTimeHours] = useState<string>("1");
  const [timeMinutes, setTimeMinutes] = useState<string>("30");
  const [timeSeconds, setTimeSeconds] = useState<string>("0");
  const [speedVal, setSpeedVal] = useState<string>("65");
  const [speedUnit, setSpeedUnit] = useState<string>("mph");
  const [card1CopiedType, setCard1CopiedType] = useState<string | null>(null);

  const [card1Validation, setCard1Validation] = useState<{ valid: boolean; error: string | null }>({ valid: true, error: null });
  const [card1Result, setCard1Result] = useState<SpeedSolverResult | null>(null);
  const [card1SaveSuccess, setCard1SaveSuccess] = useState(false);
  const card1Saved = useCardSaved<SpeedSolverResult, Card1RawState>("saved_speed_solver");

  // ─── CARD 2: DEDICATED SPEED CONVERTER ───
  const [convertAmount, setConvertAmount] = useState<string>("1");
  const [convertFrom, setConvertFrom] = useState<string>("mph");
  const [convertTo, setConvertTo] = useState<string>("ms");
  const [card2Validation, setCard2Validation] = useState<{ valid: boolean; error: string | null }>({ valid: true, error: null });
  const [convertResult, setConvertResult] = useState<SpeedConversionResult | null>(null);
  const [convertSaveSuccess, setConvertSaveSuccess] = useState(false);
  const [card2CopiedType, setCard2CopiedType] = useState<string | null>(null);
  const convertSaved = useCardSaved<SpeedConversionResult, Card2RawState>("saved_speed_converter");

  // ─── CARD 3: RUNNING PACE & SPLITS ───
  const [raceDistPreset, setRaceDistPreset] = useState<string>("5k");
  const [raceCustomMeters, setRaceCustomMeters] = useState<string>("5000");
  const [raceHours, setRaceHours] = useState<string>("0");
  const [raceMinutes, setRaceMinutes] = useState<string>("24");
  const [raceSeconds, setRaceSeconds] = useState<string>("30");
  const [card3Validation, setCard3Validation] = useState<{ valid: boolean; error: string | null }>({ valid: true, error: null });
  const [card3Result, setCard3Result] = useState<RacePaceResult | null>(null);
  const [card3SaveSuccess, setCard3SaveSuccess] = useState(false);
  const [card3CopiedType, setCard3CopiedType] = useState<string | null>(null);
  const card3Saved = useCardSaved<RacePaceResult, Card3RawState>("saved_race_pace");

  // ─── CARD 4: MULTI-SEGMENT AVERAGE SPEED ───
  const [legs, setLegs] = useState<JourneyLeg[]>([
    { id: "1", distanceKm: 60, timeMinutes: 45 },
    { id: "2", distanceKm: 80, timeMinutes: 60 },
  ]);
  const [card4Validation, setCard4Validation] = useState<{ valid: boolean; error: string | null }>({ valid: true, error: null });
  const [card4Result, setCard4Result] = useState<MultiSegmentResult | null>(null);
  const [card4SaveSuccess, setCard4SaveSuccess] = useState(false);
  const [card4CopiedType, setCard4CopiedType] = useState<string | null>(null);
  const card4Saved = useCardSaved<MultiSegmentResult, Card4RawState>("saved_multisegment_speed");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // ─── Compute Card 1 ───
  const computeCard1 = useCallback(() => {
    // Validate inputs based on mode
    let dNum = 0;
    let sNum = 0;
    let hNum = 0;
    let mNum = 0;
    let secNum = 0;

    if (calcMode !== "distance") {
      const dParsed = parseNumericInput(distanceVal, "Distance", { allowZero: true, min: 0 });
      if (!dParsed.valid) {
        setCard1Validation({ valid: false, error: dParsed.error });
        setCard1Result(null);
        return;
      }
      dNum = dParsed.value;
    }

    if (calcMode !== "speed") {
      const sParsed = parseNumericInput(speedVal, "Speed", { allowZero: true, min: 0 });
      if (!sParsed.valid) {
        setCard1Validation({ valid: false, error: sParsed.error });
        setCard1Result(null);
        return;
      }
      sNum = sParsed.value;
    }

    if (calcMode !== "time") {
      const hParsed = parseNumericInput(timeHours, "Hours", { allowZero: true, min: 0 });
      const mParsed = parseNumericInput(timeMinutes, "Minutes", { allowZero: true, min: 0 });
      const secParsed = parseNumericInput(timeSeconds, "Seconds", { allowZero: true, min: 0 });

      if (!hParsed.valid) {
        setCard1Validation({ valid: false, error: hParsed.error });
        setCard1Result(null);
        return;
      }
      if (!mParsed.valid) {
        setCard1Validation({ valid: false, error: mParsed.error });
        setCard1Result(null);
        return;
      }
      if (!secParsed.valid) {
        setCard1Validation({ valid: false, error: secParsed.error });
        setCard1Result(null);
        return;
      }

      hNum = hParsed.value;
      mNum = mParsed.value;
      secNum = secParsed.value;
    }

    const res = calculateSpeedSolver({
      mode: calcMode,
      distanceValue: dNum,
      distanceUnit,
      timeHours: hNum,
      timeMinutes: mNum,
      timeSeconds: secNum,
      speedValue: sNum,
      speedUnit,
    });

    if (!res.valid) {
      setCard1Validation({ valid: false, error: res.error || "Invalid calculation parameters." });
      setCard1Result(null);
    } else {
      setCard1Validation({ valid: true, error: null });
      setCard1Result(res);
    }
  }, [calcMode, distanceVal, distanceUnit, timeHours, timeMinutes, timeSeconds, speedVal, speedUnit]);

  // ─── Compute Card 2 ───
  const computeConverter = useCallback(() => {
    const amtParsed = parseNumericInput(convertAmount, "Amount", { allowZero: true, min: 0 });
    if (!amtParsed.valid) {
      setCard2Validation({ valid: false, error: amtParsed.error });
      setConvertResult(null);
      return;
    }
    setCard2Validation({ valid: true, error: null });
    const res = convertSpeedDirect(amtParsed.value, convertFrom, convertTo, 6);
    setConvertResult(res);
  }, [convertAmount, convertFrom, convertTo]);

  // ─── Compute Card 3 ───
  const computeCard3 = useCallback(() => {
    let meters = 5000;
    if (raceDistPreset === "custom") {
      const mParsed = parseNumericInput(raceCustomMeters, "Custom Race Distance", { allowZero: false, min: 1 });
      if (!mParsed.valid) {
        setCard3Validation({ valid: false, error: mParsed.error });
        setCard3Result(null);
        return;
      }
      meters = mParsed.value;
    } else {
      const match = DISTANCE_UNITS.find((u) => u.id === raceDistPreset);
      if (match) meters = match.toMeters;
    }

    const hParsed = parseNumericInput(raceHours, "Target Hours", { allowZero: true, min: 0 });
    const mParsed = parseNumericInput(raceMinutes, "Target Minutes", { allowZero: true, min: 0 });
    const sParsed = parseNumericInput(raceSeconds, "Target Seconds", { allowZero: true, min: 0 });

    if (!hParsed.valid || !mParsed.valid || !sParsed.valid) {
      setCard3Validation({ valid: false, error: hParsed.error || mParsed.error || sParsed.error });
      setCard3Result(null);
      return;
    }

    const totSec = (hParsed.value * 3600) + (mParsed.value * 60) + sParsed.value;
    if (totSec <= 0) {
      setCard3Validation({ valid: false, error: "Target finish time must be greater than zero." });
      setCard3Result(null);
      return;
    }

    const res = calculateRacePace(meters, totSec);
    if (!res.valid) {
      setCard3Validation({ valid: false, error: res.error || "Invalid race parameters." });
      setCard3Result(null);
    } else {
      setCard3Validation({ valid: true, error: null });
      setCard3Result(res);
    }
  }, [raceDistPreset, raceCustomMeters, raceHours, raceMinutes, raceSeconds]);

  // ─── Compute Card 4 ───
  const computeCard4 = useCallback(() => {
    for (let i = 0; i < legs.length; i++) {
      const leg = legs[i];
      const dParsed = parseNumericInput(String(leg.distanceKm), `Segment #${i + 1} Distance`, { allowZero: true, min: 0 });
      const tParsed = parseNumericInput(String(leg.timeMinutes), `Segment #${i + 1} Duration`, { allowZero: true, min: 0 });

      if (!dParsed.valid) {
        setCard4Validation({ valid: false, error: dParsed.error });
        setCard4Result(null);
        return;
      }
      if (!tParsed.valid) {
        setCard4Validation({ valid: false, error: tParsed.error });
        setCard4Result(null);
        return;
      }
    }

    const res = calculateMultiSegmentSpeed(legs);
    if (!res.valid) {
      setCard4Validation({ valid: false, error: res.error || "Invalid multi-segment parameters." });
      setCard4Result(null);
    } else {
      setCard4Validation({ valid: true, error: null });
      setCard4Result(res);
    }
  }, [legs]);

  useEffect(() => {
    computeCard1();
  }, [computeCard1]);

  useEffect(() => {
    computeConverter();
  }, [computeConverter]);

  useEffect(() => {
    computeCard3();
  }, [computeCard3]);

  useEffect(() => {
    computeCard4();
  }, [computeCard4]);

  // ─── Generic Copy & Download Helpers ───
  const triggerCopy = (text: string, type: string, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    navigator.clipboard.writeText(text);
    setter(type);
    setTimeout(() => setter(null), 1500);
  };

  const downloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSwapConverter = () => {
    const prevFrom = convertFrom;
    const prevTo = convertTo;
    setConvertFrom(prevTo);
    setConvertTo(prevFrom);
  };

  // ─── Restoration Handlers (Defect SPEED-04) ───
  const handleRestoreCard1 = useCallback((state: Card1RawState) => {
    setCalcMode(state.calcMode);
    setDistanceVal(state.distanceVal);
    setDistanceUnit(state.distanceUnit);
    setTimeHours(state.timeHours);
    setTimeMinutes(state.timeMinutes);
    setTimeSeconds(state.timeSeconds);
    setSpeedVal(state.speedVal);
    setSpeedUnit(state.speedUnit);
    showToast("Speed Solver calculation restored");
  }, [showToast]);

  const handleRestoreCard2 = useCallback((state: Card2RawState) => {
    setConvertAmount(state.convertAmount);
    setConvertFrom(state.convertFrom);
    setConvertTo(state.convertTo);
    showToast("Speed Converter inputs restored");
  }, [showToast]);

  const handleRestoreCard3 = useCallback((state: Card3RawState) => {
    setRaceDistPreset(state.raceDistPreset);
    setRaceCustomMeters(state.raceCustomMeters);
    setRaceHours(state.raceHours);
    setRaceMinutes(state.raceMinutes);
    setRaceSeconds(state.raceSeconds);
    showToast("Race Pace calculation restored");
  }, [showToast]);

  const handleRestoreCard4 = useCallback((state: Card4RawState) => {
    setLegs(state.legs);
    showToast("Multi-Segment trip restored");
  }, [showToast]);

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];

    if (card1Result && card1Result.valid) {
      sections.push({
        title: "Kinematic Speed, Distance & Time Analysis",
        items: [
          { label: "Calculation Mode", value: `Solve for ${card1Result.mode.toUpperCase()}` },
          { label: "Total Distance", value: card1Result.distanceFormatted },
          { label: "Total Elapsed Time", value: card1Result.timeFormatted },
          { label: "Calculated Speed (mph)", value: `${card1Result.speedMph.toFixed(2)} mph` },
          { label: "Calculated Speed (km/h)", value: `${card1Result.speedKmh.toFixed(2)} km/h` },
          { label: "Calculated Speed (m/s)", value: `${card1Result.speedMs.toFixed(3)} m/s` },
          { label: "Athletic Running Pace", value: `${card1Result.paceMinMile} /mi (${card1Result.paceMinKm} /km)` },
          { label: "Formula Breakdown", value: card1Result.formulaDescription },
        ],
      });

      sections.push({
        title: "All Speed Units Matrix",
        items: card1Result.allSpeedUnits.map((c) => ({
          label: `${c.unit.name} (${c.unit.symbol})`,
          value: c.formatted,
        })),
      });
    }

    if (convertResult) {
      sections.push({
        title: "Dedicated Speed Conversion Result",
        items: [
          { label: "Input Stated", value: `${convertResult.amount} ${convertResult.fromUnit.name} [${convertResult.fromUnit.symbol}]` },
          { label: "Converted Output", value: `${formatSpeedPrecision(convertResult.outputValue, 6)} ${convertResult.toUnit.name} [${convertResult.toUnit.symbol}]` },
          { label: "SI Velocity Equivalent", value: `${convertResult.speedMs.toFixed(4)} m/s` },
          { label: "Multiplier Equation", value: convertResult.formulaDescription },
        ],
      });
    }

    if (card3Result && card3Result.valid) {
      sections.push({
        title: "Race Pacing & Splits Summary",
        items: [
          { label: "Race Distance", value: `${(card3Result.distanceMeters / 1000).toFixed(2)} km (${(card3Result.distanceMeters / 1609.344).toFixed(2)} miles)` },
          { label: "Finishing Time", value: formatTimeHoursMinutesSeconds(card3Result.totalTimeSeconds).formatted },
          { label: "Average Pace per Mile", value: `${card3Result.paceMinMile} min/mi` },
          { label: "Average Pace per KM", value: `${card3Result.paceMinKm} min/km` },
          { label: "Average Speed", value: `${card3Result.speedMph.toFixed(2)} mph (${card3Result.speedKmh.toFixed(2)} km/h)` },
        ],
      });
    }

    if (card4Result && card4Result.valid) {
      sections.push({
        title: "Multi-Segment Journey Results",
        items: [
          { label: "Total Distance", value: `${card4Result.totalDistanceKm.toFixed(1)} km (${(card4Result.totalDistanceKm * 0.621371).toFixed(1)} mi)` },
          { label: "Total Duration", value: `${card4Result.totalTimeMinutes} min (${(card4Result.totalTimeMinutes / 60).toFixed(2)} hours)` },
          { label: "Average Trip Speed (km/h)", value: `${card4Result.averageSpeedKmh} km/h` },
          { label: "Average Trip Speed (mph)", value: `${card4Result.averageSpeedMph} mph` },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Speed, Distance, Time & Pace Calculator",
        reportTitle: "Kinematics, Speed & Race Pacing Metrology Sheet",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
      },
      keyMetrics: [
        { label: "Speed (mph)", value: card1Result && card1Result.valid ? `${card1Result.speedMph.toFixed(2)} mph` : "—", highlight: true },
        { label: "Speed (km/h)", value: card1Result && card1Result.valid ? `${card1Result.speedKmh.toFixed(2)} km/h` : "—" },
        { label: "Running Pace", value: card1Result && card1Result.valid ? `${card1Result.paceMinMile} /mi` : "—" },
      ],
      sections,
    };
  }, [card1Result, convertResult, card3Result, card4Result]);

  return (
    <div className="space-y-4">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-4 right-4 z-50 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs px-3.5 py-2 rounded-lg shadow-lg flex items-center gap-2 font-medium"
        >
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          {toastMessage}
        </div>
      )}

      {/* ═══════════════════ CARD 1: TRI-MODAL SPEED SOLVER ═══════════════════ */}
      <CardWrapper
        title="Speed, Distance & Time Solver (s = d / t)"
        hasResult={!!(card1Result && card1Result.valid)}
        isSaved={card1SaveSuccess}
        savedCount={card1Saved.saved.length}
        onToggleSaved={() => card1Saved.setIsOpen(!card1Saved.isOpen)}
        onSave={() => {
          if (!card1Result || !card1Result.valid) return;
          card1Saved.save(
            `Mode ${calcMode.toUpperCase()}: ${card1Result.speedMph.toFixed(2)} mph (${card1Result.speedKmh.toFixed(2)} km/h) | ${card1Result.distanceFormatted} in ${card1Result.timeFormatted}`,
            card1Result,
            {
              calcMode,
              distanceVal,
              distanceUnit,
              timeHours,
              timeMinutes,
              timeSeconds,
              speedVal,
              speedUnit,
            }
          );
          flashSave(setCard1SaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Mode Switcher Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-zinc-100 dark:border-zinc-800 text-xs print:hidden">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Calculate:</span>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={calcMode === "speed"}
                  onClick={() => setCalcMode("speed")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    calcMode === "speed"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  Find Speed (s)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={calcMode === "distance"}
                  onClick={() => setCalcMode("distance")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    calcMode === "distance"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  Find Distance (d)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={calcMode === "time"}
                  onClick={() => setCalcMode("time")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    calcMode === "time"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  Find Time (t)
                </button>
              </div>
            </div>

            <Button
              variant="outline"
              aria-label="Reset solver inputs to default values"
              onClick={() => {
                setCalcMode("speed");
                setDistanceVal("100");
                setDistanceUnit("mi");
                setTimeHours("1");
                setTimeMinutes("30");
                setTimeSeconds("0");
                setSpeedVal("65");
                setSpeedUnit("mph");
              }}
              className="h-6 text-[11px] px-2 gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-zinc-400" /> Reset
            </Button>
          </div>

          {/* Validation Alert */}
          {!card1Validation.valid && (
            <div
              role="alert"
              className="p-2.5 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-md border border-red-200 dark:border-red-800 text-xs flex items-center gap-2 font-medium"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{card1Validation.error}</span>
            </div>
          )}

          {/* Form Inputs Grid (Interactive, Hidden in Print) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs print:hidden">
            {/* Distance Input */}
            {calcMode !== "distance" && (
              <div className="md:col-span-6 space-y-1">
                <label htmlFor="speed-distance-val" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Travel Distance (d)
                </label>
                <div className="grid grid-cols-12 gap-1.5">
                  <Input
                    id="speed-distance-val"
                    type="number"
                    value={distanceVal}
                    onChange={(e) => setDistanceVal(e.target.value)}
                    className="col-span-7 h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                  <select
                    id="speed-distance-unit"
                    aria-label="Distance unit"
                    value={distanceUnit}
                    onChange={(e) => setDistanceUnit(e.target.value)}
                    className="col-span-5 h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300 cursor-pointer"
                  >
                    {DISTANCE_UNITS.map((u) => (
                      <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Time Inputs */}
            {calcMode !== "time" && (
              <div className="md:col-span-6 space-y-1">
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Elapsed Time (Hours, Minutes, Seconds)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="flex items-center gap-1">
                    <Input
                      id="speed-time-hours"
                      aria-label="Hours"
                      type="number"
                      value={timeHours}
                      onChange={(e) => setTimeHours(e.target.value)}
                      placeholder="Hours"
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <span className="text-[10px] text-zinc-400">hr</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      id="speed-time-minutes"
                      aria-label="Minutes"
                      type="number"
                      value={timeMinutes}
                      onChange={(e) => setTimeMinutes(e.target.value)}
                      placeholder="Mins"
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <span className="text-[10px] text-zinc-400">min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      id="speed-time-seconds"
                      aria-label="Seconds"
                      type="number"
                      value={timeSeconds}
                      onChange={(e) => setTimeSeconds(e.target.value)}
                      placeholder="Secs"
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <span className="text-[10px] text-zinc-400">sec</span>
                  </div>
                </div>
              </div>
            )}

            {/* Speed Input */}
            {calcMode !== "speed" && (
              <div className="md:col-span-6 space-y-1">
                <label htmlFor="speed-val-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Speed (s)
                </label>
                <div className="grid grid-cols-12 gap-1.5">
                  <Input
                    id="speed-val-input"
                    type="number"
                    value={speedVal}
                    onChange={(e) => setSpeedVal(e.target.value)}
                    className="col-span-7 h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                  <select
                    id="speed-unit-select"
                    aria-label="Speed unit"
                    value={speedUnit}
                    onChange={(e) => setSpeedUnit(e.target.value)}
                    className="col-span-5 h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300 cursor-pointer"
                  >
                    {SPEED_UNITS.filter((u) => u.category === "common" || u.id === "mach").map((u) => (
                      <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Static Representation for Print View */}
          <div className="hidden print:block text-xs border border-zinc-300 p-2.5 rounded bg-zinc-50 space-y-1">
            <p><strong>Mode:</strong> {calcMode.toUpperCase()}</p>
            {calcMode !== "distance" && <p><strong>Travel Distance:</strong> {distanceVal} {distanceUnit}</p>}
            {calcMode !== "speed" && <p><strong>Speed:</strong> {speedVal} {speedUnit}</p>}
            {calcMode !== "time" && <p><strong>Elapsed Time:</strong> {timeHours} hr {timeMinutes} min {timeSeconds} sec</p>}
          </div>

          {/* Primary Result Banner & Real-World Gauge */}
          {card1Result && card1Result.valid && (
            <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800" aria-live="polite">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 print:bg-white print:border-zinc-300 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
                    CALCULATED PRIMARY RESULT &amp; DERIVATION
                  </span>
                  <div className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {calcMode === "speed" ? (
                      <>
                        {card1Result.speedMph.toFixed(2)}{" "}
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">mph</span>{" "}
                        <span className="text-base text-zinc-500 font-normal">
                          ({card1Result.speedKmh.toFixed(2)} km/h | {card1Result.speedMs.toFixed(2)} m/s)
                        </span>
                      </>
                    ) : calcMode === "distance" ? (
                      <>
                        {card1Result.distanceFormatted}{" "}
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                          ({(card1Result.distanceMeters / 1000).toFixed(3)} km)
                        </span>
                      </>
                    ) : (
                      <>
                        {card1Result.timeFormatted}{" "}
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                          ({(card1Result.totalTimeSeconds / 3600).toFixed(3)} hrs)
                        </span>
                      </>
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {card1Result.formulaDescription}
                  </div>
                </div>
              </div>

              {/* Standardized Card 1 Toolbar */}
              <CardActionToolbar
                copiedType={card1CopiedType}
                onCopyResult={() =>
                  triggerCopy(
                    calcMode === "speed"
                      ? `${card1Result.speedMph.toFixed(2)} mph (${card1Result.speedKmh.toFixed(2)} km/h | ${card1Result.speedMs.toFixed(2)} m/s)`
                      : calcMode === "distance"
                      ? card1Result.distanceFormatted
                      : card1Result.timeFormatted,
                    "result",
                    setCard1CopiedType
                  )
                }
                onCopySummary={() =>
                  triggerCopy(
                    `Mode: Solve for ${calcMode.toUpperCase()}\nDistance: ${card1Result.distanceFormatted}\nTime: ${card1Result.timeFormatted}\nSpeed: ${card1Result.speedMph.toFixed(2)} mph (${card1Result.speedKmh.toFixed(2)} km/h)\nFormula: ${card1Result.formulaDescription}`,
                    "summary",
                    setCard1CopiedType
                  )
                }
                onCopyLatex={() => triggerCopy(card1Result.latexFormula, "latex", setCard1CopiedType)}
                onExportCsv={() => {
                  const csv = `Module,Mode,Distance,Time,Speed_mph,Speed_kmh,Speed_ms,Pace_mile,Pace_km,Formula,Timestamp\n"Speed Solver","${calcMode}","${card1Result.distanceFormatted}","${card1Result.timeFormatted}",${card1Result.speedMph.toFixed(2)},${card1Result.speedKmh.toFixed(2)},${card1Result.speedMs.toFixed(3)},"${card1Result.paceMinMile}","${card1Result.paceMinKm}","${card1Result.formulaDescription}","${new Date().toISOString()}"`;
                  downloadFile(csv, `speed_solver_${calcMode}.csv`, "text/csv;charset=utf-8;");
                }}
                onDownloadTxt={() => {
                  const txt = `========================================\nKINEMATICS SPEED SOLVER REPORT\n========================================\nCalculation Mode: ${calcMode.toUpperCase()}\nDistance: ${card1Result.distanceFormatted}\nTravel Time: ${card1Result.timeFormatted}\nSpeed (mph): ${card1Result.speedMph.toFixed(2)} mph\nSpeed (km/h): ${card1Result.speedKmh.toFixed(2)} km/h\nSpeed (m/s): ${card1Result.speedMs.toFixed(3)} m/s\nPace: ${card1Result.paceMinMile} /mi (${card1Result.paceMinKm} /km)\nFormula: ${card1Result.formulaDescription}\nLaTeX: ${card1Result.latexFormula}\nClosest Anchor: ${card1Result.closestReference.name} (${card1Result.closestReference.speedMph} mph)\nTimestamp: ${new Date().toLocaleString()}\n========================================`;
                  downloadFile(txt, `speed_solver_${calcMode}.txt`, "text/plain;charset=utf-8;");
                }}
              />

              <RealWorldSpeedVisualizer
                speedMph={card1Result.speedMph}
                speedKmh={card1Result.speedKmh}
                closestRef={card1Result.closestReference}
              />
            </div>
          )}
        </div>

        <SavedDrawer
          {...card1Saved}
          cardTitle="Speed Solver"
          formatSummary={(r) => `${r.speedMph.toFixed(2)} mph (${r.speedKmh.toFixed(2)} km/h) | ${r.distanceFormatted}`}
          onRestore={handleRestoreCard1}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: DEDICATED SPEED CONVERTER ═══════════════════ */}
      <CardWrapper
        title="Speed Converter (Multi-Unit Speed Converter)"
        hasResult={!!convertResult}
        isSaved={convertSaveSuccess}
        savedCount={convertSaved.saved.length}
        onToggleSaved={() => convertSaved.setIsOpen(!convertSaved.isOpen)}
        onSave={() => {
          if (!convertResult) return;
          convertSaved.save(
            `${convertResult.amount} ${convertResult.fromUnit.symbol} = ${formatSpeedPrecision(convertResult.outputValue, 4)} ${convertResult.toUnit.symbol}`,
            convertResult,
            {
              convertAmount,
              convertFrom,
              convertTo,
            }
          );
          flashSave(setConvertSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <p className="text-zinc-600 dark:text-zinc-400 text-[11px] print:hidden">
            The following converter converts between common and specialized engineering units of speed.
          </p>

          {!card2Validation.valid && (
            <div
              role="alert"
              className="p-2.5 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-md border border-red-200 dark:border-red-800 text-xs flex items-center gap-2 font-medium"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{card2Validation.error}</span>
            </div>
          )}

          {/* Interactive Converter Form */}
          <div className="max-w-xl mx-auto bg-slate-50 dark:bg-zinc-800/40 p-3.5 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-2.5 print:hidden">
            <div className="grid grid-cols-12 gap-2 items-center">
              <label htmlFor="convert-amount-input" className="col-span-3 text-right font-bold text-zinc-700 dark:text-zinc-300">
                Amount:
              </label>
              <div className="col-span-9">
                <Input
                  id="convert-amount-input"
                  type="number"
                  value={convertAmount}
                  onChange={(e) => setConvertAmount(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 items-center">
              <label htmlFor="convert-from-select" className="col-span-3 text-right font-bold text-zinc-700 dark:text-zinc-300">
                From:
              </label>
              <div className="col-span-9">
                <select
                  id="convert-from-select"
                  aria-label="From speed unit"
                  value={convertFrom}
                  onChange={(e) => setConvertFrom(e.target.value)}
                  className="w-full h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 font-sans text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  <optgroup label="Common Units">
                    {SPEED_UNITS.filter((u) => u.category === "common").map((u) => (
                      <option key={u.id} value={u.id}>{u.name} [{u.symbol}]</option>
                    ))}
                  </optgroup>
                  <optgroup label="Specialized & Engineering Units">
                    {SPEED_UNITS.filter((u) => u.category === "other").map((u) => (
                      <option key={u.id} value={u.id}>{u.name} [{u.symbol}]</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 items-center">
              <label htmlFor="convert-to-select" className="col-span-3 text-right font-bold text-zinc-700 dark:text-zinc-300">
                To:
              </label>
              <div className="col-span-9">
                <select
                  id="convert-to-select"
                  aria-label="To speed unit"
                  value={convertTo}
                  onChange={(e) => setConvertTo(e.target.value)}
                  className="w-full h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 font-sans text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  <optgroup label="Common Units">
                    {SPEED_UNITS.filter((u) => u.category === "common").map((u) => (
                      <option key={u.id} value={u.id}>{u.name} [{u.symbol}]</option>
                    ))}
                  </optgroup>
                  <optgroup label="Specialized & Engineering Units">
                    {SPEED_UNITS.filter((u) => u.category === "other").map((u) => (
                      <option key={u.id} value={u.id}>{u.name} [{u.symbol}]</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1 border-t border-slate-200 dark:border-zinc-700">
              <Button
                variant="default"
                size="sm"
                onClick={computeConverter}
                className="h-6 text-[11px] px-3 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                aria-label="Convert speed units"
              >
                Convert
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwapConverter}
                className="h-6 text-[11px] px-2 gap-1 cursor-pointer"
                aria-label="Swap source and target units"
              >
                Swap
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setConvertAmount("1");
                  setConvertFrom("mph");
                  setConvertTo("ms");
                }}
                className="h-6 text-[11px] px-2 cursor-pointer"
                aria-label="Clear speed converter inputs"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Static Representation for Print */}
          <div className="hidden print:block text-xs border border-zinc-300 p-2.5 rounded bg-zinc-50 space-y-1">
            <p><strong>Conversion:</strong> {convertAmount} {convertFrom} &rarr; {convertTo}</p>
          </div>

          {/* Converted Output Display */}
          {convertResult && (
            <div className="space-y-3" aria-live="polite">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 print:bg-white print:border-zinc-300">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
                  CONVERTED SPEED VALUE
                </span>
                <div className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {convertResult.amount} {convertResult.fromUnit.symbol} ={" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    {formatSpeedPrecision(convertResult.outputValue, 5)}
                  </span>{" "}
                  <span className="text-base font-semibold">{convertResult.toUnit.symbol}</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 mt-0.5">
                  {convertResult.formulaDescription}
                </div>
              </div>

              {/* Standardized Card 2 Toolbar */}
              <CardActionToolbar
                copiedType={card2CopiedType}
                onCopyResult={() =>
                  triggerCopy(
                    `${convertResult.amount} ${convertResult.fromUnit.symbol} = ${formatSpeedPrecision(convertResult.outputValue, 5)} ${convertResult.toUnit.symbol}`,
                    "result",
                    setCard2CopiedType
                  )
                }
                onCopySummary={() =>
                  triggerCopy(
                    `Input: ${convertResult.amount} ${convertResult.fromUnit.name} [${convertResult.fromUnit.symbol}]\nOutput: ${formatSpeedPrecision(convertResult.outputValue, 6)} ${convertResult.toUnit.name} [${convertResult.toUnit.symbol}]\nSI Base: ${convertResult.speedMs.toFixed(4)} m/s\nFormula: ${convertResult.formulaDescription}`,
                    "summary",
                    setCard2CopiedType
                  )
                }
                onExportCsv={() => {
                  const csv = `Module,Amount,From_Unit,To_Unit,Converted_Value,Formula,Timestamp\n"Speed Converter",${convertResult.amount},"${convertResult.fromUnit.symbol}","${convertResult.toUnit.symbol}",${convertResult.outputValue},"${convertResult.formulaDescription}","${new Date().toISOString()}"`;
                  downloadFile(csv, `speed_conversion_${convertResult.fromUnit.id}_to_${convertResult.toUnit.id}.csv`, "text/csv;charset=utf-8;");
                }}
                onDownloadTxt={() => {
                  const txt = `========================================\nSPEED CONVERSION METROLOGY REPORT\n========================================\nInput: ${convertResult.amount} ${convertResult.fromUnit.name} (${convertResult.fromUnit.symbol})\nOutput: ${convertResult.outputValue} ${convertResult.toUnit.name} (${convertResult.toUnit.symbol})\nSI Equivalent: ${convertResult.speedMs.toFixed(6)} m/s\nFormula: ${convertResult.formulaDescription}\nTimestamp: ${new Date().toLocaleString()}\n========================================`;
                  downloadFile(txt, `speed_conversion_${convertResult.fromUnit.id}_to_${convertResult.toUnit.id}.txt`, "text/plain;charset=utf-8;");
                }}
              />

              {/* All 27 Speed Units Conversion Matrix */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-bold text-zinc-500 block uppercase tracking-wider">
                  ALL 27 SPEED UNITS CONVERSION MATRIX
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-56 overflow-y-auto p-1 bg-slate-50 dark:bg-zinc-800/30 rounded border border-slate-200 dark:border-zinc-700 print:max-h-none print:bg-white print:border-zinc-300">
                  {convertResult.allConversions.map((item) => (
                    <div
                      key={item.unit.id}
                      className="p-1.5 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-sans tabular-nums print:border-zinc-300"
                    >
                      <div className="truncate pr-1">
                        <span className="text-[10px] text-zinc-400 block truncate">{item.unit.name} [{item.unit.symbol}]</span>
                        <span className="font-bold text-zinc-800 dark:text-zinc-200">{item.formatted}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => triggerCopy(`${item.formatted} ${item.unit.symbol}`, "item", setCard2CopiedType)}
                        className="text-zinc-400 hover:text-blue-600 p-0.5 cursor-pointer print:hidden"
                        title={`Copy ${item.unit.name}`}
                        aria-label={`Copy value for ${item.unit.name}`}
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...convertSaved}
          cardTitle="Speed Converter"
          formatSummary={(r) => `${r.amount} ${r.fromUnit.symbol} = ${formatSpeedPrecision(r.outputValue, 4)} ${r.toUnit.symbol}`}
          onRestore={handleRestoreCard2}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: RUNNING & RACE PACE CALCULATOR ═══════════════════ */}
      <CardWrapper
        title="Running & Race Pace Calculator with Splits (Pace = t / d)"
        hasResult={!!(card3Result && card3Result.valid)}
        isSaved={card3SaveSuccess}
        savedCount={card3Saved.saved.length}
        onToggleSaved={() => card3Saved.setIsOpen(!card3Saved.isOpen)}
        onSave={() => {
          if (!card3Result || !card3Result.valid) return;
          card3Saved.save(
            `Pace: ${card3Result.paceMinMile} /mi (${card3Result.paceMinKm} /km) | ${(card3Result.distanceMeters / 1000).toFixed(2)} km in ${formatTimeHoursMinutesSeconds(card3Result.totalTimeSeconds).formatted}`,
            card3Result,
            {
              raceDistPreset,
              raceCustomMeters,
              raceHours,
              raceMinutes,
              raceSeconds,
            }
          );
          flashSave(setCard3SaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          {!card3Validation.valid && (
            <div
              role="alert"
              className="p-2.5 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-md border border-red-200 dark:border-red-800 text-xs flex items-center gap-2 font-medium"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{card3Validation.error}</span>
            </div>
          )}

          {/* Interactive Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 print:hidden">
            <div className="md:col-span-6 space-y-1">
              <label htmlFor="race-dist-preset-select" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Race Distance Preset
              </label>
              <select
                id="race-dist-preset-select"
                aria-label="Race Distance Preset"
                value={raceDistPreset}
                onChange={(e) => setRaceDistPreset(e.target.value)}
                className="w-full h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 font-sans text-zinc-800 dark:text-zinc-200 cursor-pointer"
              >
                <option value="5k">5K (5.0 km / 3.11 miles)</option>
                <option value="10k">10K (10.0 km / 6.21 miles)</option>
                <option value="half_marathon">Half Marathon (21.10 km / 13.11 miles)</option>
                <option value="marathon">Marathon (42.20 km / 26.22 miles)</option>
                <option value="custom">Custom Race Distance (meters)</option>
              </select>

              {raceDistPreset === "custom" && (
                <div className="pt-1">
                  <Input
                    id="race-custom-meters-input"
                    aria-label="Custom distance in meters"
                    type="number"
                    value={raceCustomMeters}
                    onChange={(e) => setRaceCustomMeters(e.target.value)}
                    placeholder="Distance in meters (e.g. 5000)"
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-6 space-y-1">
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Target Finish Time (Hours : Minutes : Seconds)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <div className="flex items-center gap-1">
                  <Input
                    id="race-time-hours"
                    aria-label="Hours"
                    type="number"
                    value={raceHours}
                    onChange={(e) => setRaceHours(e.target.value)}
                    placeholder="Hours"
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                  <span className="text-[10px] text-zinc-400">hr</span>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    id="race-time-minutes"
                    aria-label="Minutes"
                    type="number"
                    value={raceMinutes}
                    onChange={(e) => setRaceMinutes(e.target.value)}
                    placeholder="Mins"
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                  <span className="text-[10px] text-zinc-400">min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    id="race-time-seconds"
                    aria-label="Seconds"
                    type="number"
                    value={raceSeconds}
                    onChange={(e) => setRaceSeconds(e.target.value)}
                    placeholder="Secs"
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                  <span className="text-[10px] text-zinc-400">sec</span>
                </div>
              </div>
            </div>
          </div>

          {/* Static Representation for Print View */}
          <div className="hidden print:block text-xs border border-zinc-300 p-2.5 rounded bg-zinc-50 space-y-1">
            <p><strong>Race Preset:</strong> {raceDistPreset.toUpperCase()}</p>
            <p><strong>Target Time:</strong> {raceHours}h {raceMinutes}m {raceSeconds}s</p>
          </div>

          {/* Race Results Display */}
          {card3Result && card3Result.valid && (
            <div className="space-y-3" aria-live="polite">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-1 border-t border-zinc-100 dark:border-zinc-800">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 print:border-zinc-300">
                  <span className="text-[10px] text-zinc-500 block font-medium">Pace per Mile</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {card3Result.paceMinMile}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">min / mi</span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 print:border-zinc-300">
                  <span className="text-[10px] text-zinc-500 block font-medium">Pace per Kilometer</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {card3Result.paceMinKm}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">min / km</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 print:border-zinc-300">
                  <span className="text-[10px] text-zinc-500 block font-medium">Average Speed</span>
                  <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {card3Result.speedMph.toFixed(2)} mph
                  </span>
                  <span className="text-[10px] text-zinc-400 block">{card3Result.speedKmh.toFixed(2)} km/h</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 print:border-zinc-300">
                  <span className="text-[10px] text-zinc-500 block font-medium">Total Distance</span>
                  <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {(card3Result.distanceMeters / 1000).toFixed(2)} km
                  </span>
                  <span className="text-[10px] text-zinc-400 block">{(card3Result.distanceMeters / 1609.344).toFixed(2)} mi</span>
                </div>
              </div>

              {/* Standardized Card 3 Toolbar */}
              <CardActionToolbar
                copiedType={card3CopiedType}
                onCopyResult={() =>
                  triggerCopy(
                    `Pace: ${card3Result.paceMinMile} min/mi (${card3Result.paceMinKm} min/km), Speed: ${card3Result.speedMph.toFixed(2)} mph (${card3Result.speedKmh.toFixed(2)} km/h)`,
                    "result",
                    setCard3CopiedType
                  )
                }
                onCopySummary={() =>
                  triggerCopy(
                    `Distance: ${(card3Result.distanceMeters / 1000).toFixed(2)} km (${(card3Result.distanceMeters / 1609.344).toFixed(2)} mi)\nTarget Finish Time: ${formatTimeHoursMinutesSeconds(card3Result.totalTimeSeconds).formatted}\nPace per Mile: ${card3Result.paceMinMile} min/mi\nPace per KM: ${card3Result.paceMinKm} min/km\nAverage Speed: ${card3Result.speedMph.toFixed(2)} mph (${card3Result.speedKmh.toFixed(2)} km/h)`,
                    "summary",
                    setCard3CopiedType
                  )
                }
                onCopyLatex={() => triggerCopy("\\text{Pace} = \\frac{t}{d}", "latex", setCard3CopiedType)}
                onExportCsv={() => {
                  const rows = [
                    ["Split", "Distance_km", "Distance_miles", "Cumulative_Time", "Split_Interval"],
                    ...card3Result.splits.map((s) => [s.splitName, s.distanceKm, s.distanceMiles, s.cumulativeTimeFormatted, s.splitTimeFormatted]),
                  ];
                  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
                  downloadFile(csv, `race_splits_${(card3Result.distanceMeters / 1000).toFixed(1)}k.csv`, "text/csv;charset=utf-8;");
                }}
                onDownloadTxt={() => {
                  const txt = `========================================\nRACE PACE & SPLITS ENGINEERING REPORT\n========================================\nDistance: ${(card3Result.distanceMeters / 1000).toFixed(2)} km (${(card3Result.distanceMeters / 1609.344).toFixed(2)} miles)\nFinish Duration: ${formatTimeHoursMinutesSeconds(card3Result.totalTimeSeconds).formatted}\nPace per Mile: ${card3Result.paceMinMile} min/mi\nPace per KM: ${card3Result.paceMinKm} min/km\nAverage Speed: ${card3Result.speedMph.toFixed(2)} mph (${card3Result.speedKmh.toFixed(2)} km/h)\n\nMilestone Splits:\n${card3Result.splits.map((s) => `${s.splitName}: ${s.cumulativeTimeFormatted} (+${s.splitTimeFormatted})`).join("\n")}\n========================================`;
                  downloadFile(txt, `race_pace_${(card3Result.distanceMeters / 1000).toFixed(1)}k.txt`, "text/plain;charset=utf-8;");
                }}
              />

              {/* Milestone Splits Table */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-zinc-500 block uppercase tracking-wider">
                  MILESTONE SPLIT TIMES MATRIX
                </span>
                <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
                  <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
                    <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold border-b border-zinc-200 dark:border-zinc-800">
                      <tr>
                        <th className="p-2 border-r border-zinc-200 dark:border-zinc-800">Split</th>
                        <th className="p-2 border-r border-zinc-200 dark:border-zinc-800">Distance</th>
                        <th className="p-2 border-r border-zinc-200 dark:border-zinc-800">Cumulative Time</th>
                        <th className="p-2">Split Interval</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {card3Result.splits.map((split, i) => (
                        <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                          <td className="p-2 font-bold text-blue-600 dark:text-blue-400 border-r border-zinc-200 dark:border-zinc-800">
                            {split.splitName}
                          </td>
                          <td className="p-2 border-r border-zinc-200 dark:border-zinc-800">
                            {split.distanceKm} km ({split.distanceMiles} mi)
                          </td>
                          <td className="p-2 font-bold text-zinc-900 dark:text-zinc-100 border-r border-zinc-200 dark:border-zinc-800">
                            {split.cumulativeTimeFormatted}
                          </td>
                          <td className="p-2 text-zinc-500 dark:text-zinc-400">
                            {split.splitTimeFormatted}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...card3Saved}
          cardTitle="Race Pace"
          formatSummary={(r) => `${r.paceMinMile} /mi (${r.paceMinKm} /km) | ${(r.distanceMeters / 1000).toFixed(1)} km`}
          onRestore={handleRestoreCard3}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: MULTI-SEGMENT JOURNEY SOLVER ═══════════════════ */}
      <CardWrapper
        title="Multi-Segment Trip Average Speed (s_avg = Σd / Σt)"
        hasResult={!!(card4Result && card4Result.valid)}
        isSaved={card4SaveSuccess}
        savedCount={card4Saved.saved.length}
        onToggleSaved={() => card4Saved.setIsOpen(!card4Saved.isOpen)}
        onSave={() => {
          if (!card4Result || !card4Result.valid) return;
          card4Saved.save(
            `Avg Speed: ${card4Result.averageSpeedKmh} km/h (${card4Result.averageSpeedMph} mph) | ${card4Result.totalDistanceKm.toFixed(1)} km in ${card4Result.totalTimeMinutes} min`,
            card4Result,
            { legs }
          );
          flashSave(setCard4SaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          {!card4Validation.valid && (
            <div
              role="alert"
              className="p-2.5 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-md border border-red-200 dark:border-red-800 text-xs flex items-center gap-2 font-medium"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{card4Validation.error}</span>
            </div>
          )}

          {/* Interactive Segments List */}
          <div className="space-y-2 print:hidden">
            {legs.map((leg, idx) => (
              <div
                key={leg.id}
                className="p-2 bg-slate-50 dark:bg-zinc-800/40 rounded border border-slate-200 dark:border-zinc-700 flex flex-wrap items-center gap-2"
              >
                <span className="font-bold text-zinc-500 w-6">#{idx + 1}</span>
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1">
                    <label htmlFor={`segment-dist-${leg.id}`} className="sr-only">
                      Segment #{idx + 1} Distance
                    </label>
                    <Input
                      id={`segment-dist-${leg.id}`}
                      type="number"
                      value={leg.distanceKm}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setLegs(legs.map((l) => (l.id === leg.id ? { ...l, distanceKm: val } : l)));
                      }}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      placeholder="Dist (km)"
                    />
                    <span className="text-[10px] text-zinc-400">km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <label htmlFor={`segment-time-${leg.id}`} className="sr-only">
                      Segment #{idx + 1} Duration
                    </label>
                    <Input
                      id={`segment-time-${leg.id}`}
                      type="number"
                      value={leg.timeMinutes}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setLegs(legs.map((l) => (l.id === leg.id ? { ...l, timeMinutes: val } : l)));
                      }}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      placeholder="Time (min)"
                    />
                    <span className="text-[10px] text-zinc-400">min</span>
                  </div>
                </div>
                <div className="flex items-center">
                  {legs.length > 1 && (
                    <button
                      type="button"
                      aria-label={`Delete segment ${idx + 1}`}
                      onClick={() => setLegs(legs.filter((l) => l.id !== leg.id))}
                      className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setLegs([...legs, { id: Date.now().toString(), distanceKm: 50, timeMinutes: 35 }])
              }
              className="h-6 text-[11px] gap-1 cursor-pointer"
              aria-label="Add trip segment"
            >
              <Plus className="w-3 h-3" /> Add Trip Segment
            </Button>
          </div>

          {/* Static Representation for Print View */}
          <div className="hidden print:block text-xs border border-zinc-300 p-2.5 rounded bg-zinc-50 space-y-1">
            <p><strong>Trip Segments:</strong></p>
            <ul className="list-disc list-inside space-y-0.5">
              {legs.map((l, i) => (
                <li key={l.id}>Segment #{i + 1}: {l.distanceKm} km in {l.timeMinutes} minutes</li>
              ))}
            </ul>
          </div>

          {/* Results Display */}
          {card4Result && card4Result.valid && (
            <div className="space-y-3" aria-live="polite">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-1 border-t border-zinc-100 dark:border-zinc-800">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 print:border-zinc-300">
                  <span className="text-[10px] text-zinc-500 block font-medium">Average Trip Speed</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {card4Result.averageSpeedKmh}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">km/h</span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 print:border-zinc-300">
                  <span className="text-[10px] text-zinc-500 block font-medium">Average Trip Speed (mph)</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {card4Result.averageSpeedMph}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">mph</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 print:border-zinc-300">
                  <span className="text-[10px] text-zinc-500 block font-medium">Total Distance</span>
                  <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {card4Result.totalDistanceKm.toFixed(1)} km
                  </span>
                  <span className="text-[10px] text-zinc-400 block">{(card4Result.totalDistanceKm * 0.621371).toFixed(1)} miles</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 print:border-zinc-300">
                  <span className="text-[10px] text-zinc-500 block font-medium">Total Duration</span>
                  <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {card4Result.totalTimeMinutes} min
                  </span>
                  <span className="text-[10px] text-zinc-400 block">{(card4Result.totalTimeMinutes / 60).toFixed(2)} hours</span>
                </div>
              </div>

              {/* Standardized Card 4 Toolbar */}
              <CardActionToolbar
                copiedType={card4CopiedType}
                onCopyResult={() =>
                  triggerCopy(
                    `Average Trip Speed: ${card4Result.averageSpeedKmh} km/h (${card4Result.averageSpeedMph} mph), Distance: ${card4Result.totalDistanceKm.toFixed(1)} km, Duration: ${card4Result.totalTimeMinutes} min`,
                    "result",
                    setCard4CopiedType
                  )
                }
                onCopySummary={() =>
                  triggerCopy(
                    `Multi-Segment Trip Summary:\nTotal Distance: ${card4Result.totalDistanceKm.toFixed(1)} km (${(card4Result.totalDistanceKm * 0.621371).toFixed(1)} mi)\nTotal Duration: ${card4Result.totalTimeMinutes} min (${(card4Result.totalTimeMinutes / 60).toFixed(2)} hrs)\nAverage Trip Speed: ${card4Result.averageSpeedKmh} km/h (${card4Result.averageSpeedMph} mph)\nFormula: s_avg = Σd / Σt`,
                    "summary",
                    setCard4CopiedType
                  )
                }
                onCopyLatex={() => triggerCopy("s_{avg} = \\frac{\\sum d_i}{\\sum t_i}", "latex", setCard4CopiedType)}
                onExportCsv={() => {
                  const rows = [
                    ["Segment", "Distance_km", "Duration_min"],
                    ...legs.map((l, i) => [`Segment ${i + 1}`, l.distanceKm, l.timeMinutes]),
                    ["TOTAL", card4Result.totalDistanceKm, card4Result.totalTimeMinutes],
                    ["AVERAGE_SPEED_KMH", card4Result.averageSpeedKmh, ""],
                    ["AVERAGE_SPEED_MPH", card4Result.averageSpeedMph, ""],
                  ];
                  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
                  downloadFile(csv, "multi_segment_trip.csv", "text/csv;charset=utf-8;");
                }}
                onDownloadTxt={() => {
                  const txt = `========================================\nMULTI-SEGMENT TRIP METROLOGY REPORT\n========================================\nSegments Covered:\n${legs.map((l, i) => `Segment #${i + 1}: ${l.distanceKm} km in ${l.timeMinutes} min`).join("\n")}\n\nTotal Distance: ${card4Result.totalDistanceKm.toFixed(1)} km (${(card4Result.totalDistanceKm * 0.621371).toFixed(1)} mi)\nTotal Elapsed Time: ${card4Result.totalTimeMinutes} min (${(card4Result.totalTimeMinutes / 60).toFixed(2)} hours)\nAverage Trip Speed: ${card4Result.averageSpeedKmh} km/h (${card4Result.averageSpeedMph} mph)\nFormula: s_avg = Σd / Σt\nTimestamp: ${new Date().toLocaleString()}\n========================================`;
                  downloadFile(txt, "multi_segment_trip.txt", "text/plain;charset=utf-8;");
                }}
              />
            </div>
          )}
        </div>

        <SavedDrawer
          {...card4Saved}
          cardTitle="Multi-Segment Trip"
          formatSummary={(r) => `${r.averageSpeedKmh} km/h (${r.averageSpeedMph} mph) | ${r.totalDistanceKm.toFixed(1)} km`}
          onRestore={handleRestoreCard4}
        />
      </CardWrapper>

      {/* Global Kinematics Takeoff Report Button */}
      <div className="flex justify-end pt-2 print:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsReportOpen(true)}
          className="text-xs gap-1.5 cursor-pointer"
          aria-label="Generate Kinematics Takeoff Report"
        >
          <FileText className="w-3.5 h-3.5 text-blue-600" />
          Generate Kinematics Takeoff Report
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
