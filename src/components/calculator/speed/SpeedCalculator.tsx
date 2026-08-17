"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Zap,
  Download,
  Trash2,
  FileSpreadsheet,
  Copy,
  Check,
  Search,
  ArrowRightLeft,
  Sparkles,
  Layers,
  ShieldCheck,
  Globe,
  Waves,
  HardDrive,
  Fuel,
  TrendingUp,
  Atom,
  Clock,
  Navigation,
  Compass,
  Timer,
  Car,
  Plane,
  Gauge,
  Plus,
  RotateCcw,
  ArrowUpDown,
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
  formatPace,
  formatSpeedPrecision,
  SpeedSolverResult,
  RacePaceResult,
  MultiSegmentResult,
  SpeedConversionResult,
  JourneyLeg,
  RealWorldSpeedReference,
  SpeedUnitDefinition,
} from "@/lib/calculator-engine/formulas/speed";

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
      ["Timestamp", "Input Summary", "Calculated Result"],
      ...saved.map((e) => [e.timestamp, e.inputSummary, formatSummary(e.result)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `speed_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_history.csv`;
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
    <div className="w-full space-y-2 bg-slate-50 dark:bg-zinc-800/40 p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700">
      <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
        <span>REAL-WORLD VELOCITY SCALE</span>
        <span>{speedMph.toFixed(2)} mph ({speedKmh.toFixed(2)} km/h)</span>
      </div>

      <div className="p-2 bg-white dark:bg-zinc-900 rounded-md border border-blue-200 dark:border-blue-800 flex items-center gap-3">
        <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-full text-blue-600 dark:text-blue-400">
          <Gauge className="w-5 h-5" />
        </div>
        <div className="text-xs">
          <span className="text-[10px] text-zinc-400 block font-medium">Closest Everyday Velocity Anchor</span>
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

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function SpeedCalculator() {
  // ─── CARD 1: TRI-MODAL SOLVER ───
  const [calcMode, setCalcMode] = useState<SpeedCalcMode>("speed");
  const [distanceVal, setDistanceVal] = useState<string>("100");
  const [distanceUnit, setDistanceUnit] = useState<string>("mi");
  const [timeHours, setTimeHours] = useState<string>("1");
  const [timeMinutes, setTimeMinutes] = useState<string>("30");
  const [timeSeconds, setTimeSeconds] = useState<string>("0");
  const [speedVal, setSpeedVal] = useState<string>("65");
  const [speedUnit, setSpeedUnit] = useState<string>("mph");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [card1Result, setCard1Result] = useState<SpeedSolverResult | null>(null);
  const [card1SaveSuccess, setCard1SaveSuccess] = useState(false);
  const card1Saved = useCardSaved<SpeedSolverResult>("saved_speed_solver");

  // ─── CARD 2: DEDICATED SPEED CONVERTER ───
  const [convertAmount, setConvertAmount] = useState<string>("1");
  const [convertFrom, setConvertFrom] = useState<string>("mph");
  const [convertTo, setConvertTo] = useState<string>("ms");
  const [convertResult, setConvertResult] = useState<SpeedConversionResult | null>(null);
  const [convertSaveSuccess, setConvertSaveSuccess] = useState(false);
  const convertSaved = useCardSaved<SpeedConversionResult>("saved_speed_converter");

  // ─── CARD 3: RUNNING PACE & SPLITS ───
  const [raceDistPreset, setRaceDistPreset] = useState<string>("5k");
  const [raceCustomMeters, setRaceCustomMeters] = useState<string>("5000");
  const [raceHours, setRaceHours] = useState<string>("0");
  const [raceMinutes, setRaceMinutes] = useState<string>("24");
  const [raceSeconds, setRaceSeconds] = useState<string>("30");
  const [card3Result, setCard3Result] = useState<RacePaceResult | null>(null);
  const [card3SaveSuccess, setCard3SaveSuccess] = useState(false);
  const card3Saved = useCardSaved<RacePaceResult>("saved_race_pace");

  // ─── CARD 4: MULTI-SEGMENT AVERAGE SPEED ───
  const [legs, setLegs] = useState<JourneyLeg[]>([
    { id: "1", distanceKm: 60, timeMinutes: 45 },
    { id: "2", distanceKm: 80, timeMinutes: 60 },
  ]);
  const [card4Result, setCard4Result] = useState<MultiSegmentResult | null>(null);
  const [card4SaveSuccess, setCard4SaveSuccess] = useState(false);
  const card4Saved = useCardSaved<MultiSegmentResult>("saved_multisegment_speed");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Calculations
  const computeCard1 = useCallback(() => {
    const res = calculateSpeedSolver({
      mode: calcMode,
      distanceValue: Number(distanceVal) || 0,
      distanceUnit,
      timeHours: Number(timeHours) || 0,
      timeMinutes: Number(timeMinutes) || 0,
      timeSeconds: Number(timeSeconds) || 0,
      speedValue: Number(speedVal) || 0,
      speedUnit,
    });
    setCard1Result(res);
  }, [calcMode, distanceVal, distanceUnit, timeHours, timeMinutes, timeSeconds, speedVal, speedUnit]);

  const computeConverter = useCallback(() => {
    const num = Number(convertAmount) || 0;
    const res = convertSpeedDirect(num, convertFrom, convertTo, 6);
    setConvertResult(res);
  }, [convertAmount, convertFrom, convertTo]);

  const computeCard3 = useCallback(() => {
    let meters = 5000;
    if (raceDistPreset === "custom") {
      meters = Number(raceCustomMeters) || 5000;
    } else {
      const match = DISTANCE_UNITS.find((u) => u.id === raceDistPreset);
      if (match) meters = match.toMeters;
    }
    const totSec = (Number(raceHours) || 0) * 3600 + (Number(raceMinutes) || 0) * 60 + (Number(raceSeconds) || 0);
    const res = calculateRacePace(meters, totSec);
    setCard3Result(res);
  }, [raceDistPreset, raceCustomMeters, raceHours, raceMinutes, raceSeconds]);

  const computeCard4 = useCallback(() => {
    const res = calculateMultiSegmentSpeed(legs);
    setCard4Result(res);
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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleSwapConverter = () => {
    const prevFrom = convertFrom;
    const prevTo = convertTo;
    setConvertFrom(prevTo);
    setConvertTo(prevFrom);
  };

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];

    if (card1Result) {
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
        title: "All Velocity Units Matrix",
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

    if (card3Result) {
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

    return {
      meta: {
        calculatorName: "Speed, Distance, Time & Pace Calculator",
        reportTitle: "Kinematics, Velocity & Race Pacing Metrology Sheet",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
      },
      keyMetrics: [
        { label: "Speed (mph)", value: card1Result ? `${card1Result.speedMph.toFixed(2)} mph` : "—", highlight: true },
        { label: "Speed (km/h)", value: card1Result ? `${card1Result.speedKmh.toFixed(2)} km/h` : "—" },
        { label: "Running Pace", value: card1Result ? `${card1Result.paceMinMile} /mi` : "—" },
      ],
      sections,
    };
  }, [card1Result, convertResult, card3Result]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ CARD 1: TRI-MODAL SPEED SOLVER ═══════════════════ */}
      <CardWrapper
        title="Speed, Distance &amp; Time Solver (s = d / t)"
        hasResult={!!card1Result}
        isSaved={card1SaveSuccess}
        savedCount={card1Saved.saved.length}
        onToggleSaved={() => card1Saved.setIsOpen(!card1Saved.isOpen)}
        onSave={() => {
          if (!card1Result) return;
          card1Saved.save(
            `Mode ${calcMode.toUpperCase()}: ${card1Result.speedMph.toFixed(2)} mph (${card1Result.speedKmh.toFixed(2)} km/h) | ${card1Result.distanceFormatted} in ${card1Result.timeFormatted}`,
            card1Result
          );
          flashSave(setCard1SaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Mode Switcher Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-zinc-100 dark:border-zinc-800 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Calculate:</span>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5">
                <button
                  type="button"
                  onClick={() => setCalcMode("speed")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    calcMode === "speed"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Find Speed (s)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode("distance")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    calcMode === "distance"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Find Distance (d)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode("time")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    calcMode === "time"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Find Time (t)
                </button>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => {
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

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
            {/* Distance Input (if mode is speed or time) */}
            {calcMode !== "distance" && (
              <div className="md:col-span-6 space-y-1">
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Travel Distance (d)
                </label>
                <div className="grid grid-cols-12 gap-1.5">
                  <Input
                    type="number"
                    value={distanceVal}
                    onChange={(e) => setDistanceVal(e.target.value)}
                    className="col-span-7 h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                  <select
                    value={distanceUnit}
                    onChange={(e) => setDistanceUnit(e.target.value)}
                    className="col-span-5 h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300"
                  >
                    {DISTANCE_UNITS.map((u) => (
                      <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Time Inputs (if mode is speed or distance) */}
            {calcMode !== "time" && (
              <div className="md:col-span-6 space-y-1">
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Elapsed Time (Hours, Minutes, Seconds)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="flex items-center gap-1">
                    <Input
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

            {/* Speed Input (if mode is distance or time) */}
            {calcMode !== "speed" && (
              <div className="md:col-span-6 space-y-1">
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Velocity / Speed (s)
                </label>
                <div className="grid grid-cols-12 gap-1.5">
                  <Input
                    type="number"
                    value={speedVal}
                    onChange={(e) => setSpeedVal(e.target.value)}
                    className="col-span-7 h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                  <select
                    value={speedUnit}
                    onChange={(e) => setSpeedUnit(e.target.value)}
                    className="col-span-5 h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300"
                  >
                    {SPEED_UNITS.filter((u) => u.category === "common" || u.id === "mach").map((u) => (
                      <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Primary Result Banner & Real-World Gauge */}
          {card1Result && (
            <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 flex flex-wrap items-center justify-between gap-2">
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

                <Button
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(
                      `${card1Result.speedMph.toFixed(2)} mph (${card1Result.speedKmh.toFixed(2)} km/h), Distance: ${card1Result.distanceFormatted}, Time: ${card1Result.timeFormatted}`,
                      "primary"
                    )
                  }
                  className="h-7 text-xs font-semibold gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
                >
                  {copiedId === "primary" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                  {copiedId === "primary" ? "Copied" : "Copy Result"}
                </Button>
              </div>

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
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: DEDICATED SPEED CONVERTER (LIKE REFERENCE) ═══════════════════ */}
      <CardWrapper
        title="Speed Converter (Multi-Unit Velocity Converter)"
        hasResult={!!convertResult}
        isSaved={convertSaveSuccess}
        savedCount={convertSaved.saved.length}
        onToggleSaved={() => convertSaved.setIsOpen(!convertSaved.isOpen)}
        onSave={() => {
          if (!convertResult) return;
          convertSaved.save(
            `${convertResult.amount} ${convertResult.fromUnit.symbol} = ${formatSpeedPrecision(convertResult.outputValue, 4)} ${convertResult.toUnit.symbol}`,
            convertResult
          );
          flashSave(setConvertSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
            The following converter converts between common and specialized engineering units of speed.
          </p>

          <div className="max-w-xl mx-auto bg-slate-50 dark:bg-zinc-800/40 p-3.5 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-2.5">
            {/* Amount */}
            <div className="grid grid-cols-12 gap-2 items-center">
              <label className="col-span-3 text-right font-bold text-zinc-700 dark:text-zinc-300">
                Amount:
              </label>
              <div className="col-span-9">
                <Input
                  type="number"
                  value={convertAmount}
                  onChange={(e) => setConvertAmount(e.target.value)}
                  className="h-8 text-sm font-bold font-sans tabular-nums bg-white dark:bg-zinc-800"
                  placeholder="1"
                />
              </div>
            </div>

            {/* From */}
            <div className="grid grid-cols-12 gap-2 items-center">
              <label className="col-span-3 text-right font-bold text-zinc-700 dark:text-zinc-300">
                From:
              </label>
              <div className="col-span-9">
                <select
                  value={convertFrom}
                  onChange={(e) => setConvertFrom(e.target.value)}
                  className="w-full h-8 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 font-sans text-zinc-800 dark:text-zinc-200"
                >
                  <optgroup label="Common speed units">
                    {SPEED_UNITS.filter((u) => u.category === "common").map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} [{u.symbol}]
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Other speed units">
                    {SPEED_UNITS.filter((u) => u.category === "other").map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} [{u.symbol}]
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* To */}
            <div className="grid grid-cols-12 gap-2 items-center">
              <label className="col-span-3 text-right font-bold text-zinc-700 dark:text-zinc-300">
                To:
              </label>
              <div className="col-span-9">
                <select
                  value={convertTo}
                  onChange={(e) => setConvertTo(e.target.value)}
                  className="w-full h-8 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 font-sans text-zinc-800 dark:text-zinc-200"
                >
                  <optgroup label="Common speed units">
                    {SPEED_UNITS.filter((u) => u.category === "common").map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} [{u.symbol}]
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Other speed units">
                    {SPEED_UNITS.filter((u) => u.category === "other").map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} [{u.symbol}]
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-12 gap-2 pt-1">
              <div className="col-span-3" />
              <div className="col-span-9 flex items-center gap-2">
                <Button
                  onClick={computeConverter}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
                >
                  Convert
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSwapConverter}
                  className="h-8 text-xs font-semibold gap-1 cursor-pointer"
                  title="Swap From and To"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" /> Swap
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setConvertAmount("1");
                    setConvertFrom("mph");
                    setConvertTo("ms");
                  }}
                  className="h-8 text-xs font-semibold cursor-pointer"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>

          {/* Converted Output Banner */}
          {convertResult && (
            <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
                    CONVERTED SPEED VALUE
                  </span>
                  <div className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {convertResult.amount} {convertResult.fromUnit.symbol} ={" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      {formatSpeedPrecision(convertResult.outputValue, 6)}
                    </span>{" "}
                    {convertResult.toUnit.symbol}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {convertResult.formulaDescription}
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(
                      `${convertResult.amount} ${convertResult.fromUnit.symbol} = ${formatSpeedPrecision(convertResult.outputValue, 6)} ${convertResult.toUnit.symbol}`,
                      "conv_res"
                    )
                  }
                  className="h-7 text-xs font-semibold gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
                >
                  {copiedId === "conv_res" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                  {copiedId === "conv_res" ? "Copied" : "Copy Result"}
                </Button>
              </div>

              {/* Complete Multi-Unit Conversion Matrix */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                  ALL 27 SPEED UNITS CONVERSION MATRIX
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto">
                  {convertResult.allConversions.map((c) => (
                    <div
                      key={c.unit.id}
                      className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 flex items-center justify-between text-xs font-sans tabular-nums"
                    >
                      <div className="truncate pr-1">
                        <span className="font-medium text-zinc-500 text-[10px] block">
                          {c.unit.name} [{c.unit.symbol}]
                        </span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 font-mono text-[11px]">
                          {c.formatted}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${c.formatted} ${c.unit.symbol}`, c.unit.id)}
                        className="text-zinc-400 hover:text-blue-600 p-1 cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {copiedId === c.unit.id ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
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
          cardTitle="Speed Conversion"
          formatSummary={(r) => `${r.amount} ${r.fromUnit.symbol} = ${formatSpeedPrecision(r.outputValue, 4)} ${r.toUnit.symbol}`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: ATHLETIC RACE PACE & SPLITS ═══════════════════ */}
      <CardWrapper
        title="Running &amp; Race Pace Calculator with Splits (Pace = t / d)"
        hasResult={!!card3Result}
        isSaved={card3SaveSuccess}
        savedCount={card3Saved.saved.length}
        onToggleSaved={() => card3Saved.setIsOpen(!card3Saved.isOpen)}
        onSave={() => {
          if (!card3Result) return;
          card3Saved.save(
            `${(card3Result.distanceMeters / 1000).toFixed(1)}km in ${formatTimeHoursMinutesSeconds(card3Result.totalTimeSeconds).formatted} -> Pace: ${card3Result.paceMinMile}/mi (${card3Result.paceMinKm}/km)`,
            card3Result
          );
          flashSave(setCard3SaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            {/* Event Preset */}
            <div className="sm:col-span-5 space-y-1">
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Race Distance Preset
              </label>
              <select
                value={raceDistPreset}
                onChange={(e) => setRaceDistPreset(e.target.value)}
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300"
              >
                <option value="5k">5K (5.0 km / 3.11 miles)</option>
                <option value="10k">10K (10.0 km / 6.21 miles)</option>
                <option value="half_marathon">Half Marathon (21.1 km / 13.11 mi)</option>
                <option value="marathon">Full Marathon (42.2 km / 26.22 mi)</option>
                <option value="mi">1 Mile (1.61 km)</option>
                <option value="custom">Custom Distance (Meters)</option>
              </select>

              {raceDistPreset === "custom" && (
                <div className="pt-1">
                  <Input
                    type="number"
                    value={raceCustomMeters}
                    onChange={(e) => setRaceCustomMeters(e.target.value)}
                    placeholder="Distance in meters"
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
              )}
            </div>

            {/* Target Finishing Time */}
            <div className="sm:col-span-7 space-y-1">
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Target Finish Time (Hours : Minutes : Seconds)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <div className="flex items-center gap-1">
                  <Input
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

          {card3Result && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block font-medium">Pace per Mile</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {card3Result.paceMinMile}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">min / mi</span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block font-medium">Pace per Kilometer</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {card3Result.paceMinKm}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">min / km</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">Average Speed</span>
                  <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {card3Result.speedMph.toFixed(2)} mph
                  </span>
                  <span className="text-[10px] text-zinc-400 block">{card3Result.speedKmh.toFixed(2)} km/h</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">Total Distance</span>
                  <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {(card3Result.distanceMeters / 1000).toFixed(2)} km
                  </span>
                  <span className="text-[10px] text-zinc-400 block">{(card3Result.distanceMeters / 1609.344).toFixed(2)} mi</span>
                </div>
              </div>

              {/* Race Splits Table */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                  MILESTONE SPLIT TIMES MATRIX
                </span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums text-xs">
                    <thead className="bg-slate-100 dark:bg-zinc-800 font-bold text-zinc-800 dark:text-zinc-200">
                      <tr>
                        <th className="p-1.5 border border-zinc-200 dark:border-zinc-700">Split</th>
                        <th className="p-1.5 border border-zinc-200 dark:border-zinc-700">Distance</th>
                        <th className="p-1.5 border border-zinc-200 dark:border-zinc-700">Cumulative Time</th>
                        <th className="p-1.5 border border-zinc-200 dark:border-zinc-700">Split Interval</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                      {card3Result.splits.map((s, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-zinc-800/40">
                          <td className="p-1.5 font-semibold text-blue-700 dark:text-blue-300">{s.splitName}</td>
                          <td className="p-1.5">{s.distanceKm} km ({s.distanceMiles} mi)</td>
                          <td className="p-1.5 font-bold font-mono">{s.cumulativeTimeFormatted}</td>
                          <td className="p-1.5 text-zinc-500 font-mono">{s.splitTimeFormatted}</td>
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
          formatSummary={(r) => `${(r.distanceMeters / 1000).toFixed(1)}km: ${r.paceMinMile}/mi (${r.paceMinKm}/km)`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: MULTI-SEGMENT JOURNEY SOLVER ═══════════════════ */}
      <CardWrapper
        title="Multi-Segment Trip Average Velocity (v_avg = Σd / Σt)"
        hasResult={!!card4Result}
        isSaved={card4SaveSuccess}
        savedCount={card4Saved.saved.length}
        onToggleSaved={() => card4Saved.setIsOpen(!card4Saved.isOpen)}
        onSave={() => {
          if (!card4Result) return;
          card4Saved.save(
            `${legs.length} legs (${card4Result.totalDistanceKm} km in ${card4Result.totalTimeMinutes} min) -> Avg Speed: ${card4Result.averageSpeedKmh} km/h (${card4Result.averageSpeedMph} mph)`,
            card4Result
          );
          flashSave(setCard4SaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="space-y-2">
            {legs.map((leg, index) => (
              <div
                key={leg.id}
                className="grid grid-cols-12 gap-2 items-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded border border-slate-200 dark:border-zinc-700"
              >
                <div className="col-span-1 font-bold text-zinc-500">#{index + 1}</div>
                <div className="col-span-5 flex items-center gap-1">
                  <Input
                    type="number"
                    value={leg.distanceKm}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      setLegs(legs.map((l) => (l.id === leg.id ? { ...l, distanceKm: val } : l)));
                    }}
                    placeholder="Distance"
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                  <span className="text-zinc-500">km</span>
                </div>
                <div className="col-span-5 flex items-center gap-1">
                  <Input
                    type="number"
                    value={leg.timeMinutes}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      setLegs(legs.map((l) => (l.id === leg.id ? { ...l, timeMinutes: val } : l)));
                    }}
                    placeholder="Minutes"
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                  <span className="text-zinc-500">min</span>
                </div>
                <div className="col-span-1 flex justify-end">
                  {legs.length > 1 && (
                    <button
                      type="button"
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
            >
              <Plus className="w-3 h-3" /> Add Trip Segment
            </Button>
          </div>

          {card4Result && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-1 border-t border-zinc-100 dark:border-zinc-800">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                <span className="text-[10px] text-zinc-500 block font-medium">Harmonic Avg Velocity</span>
                <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {card4Result.averageSpeedKmh}
                </span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300 block">km/h</span>
              </div>

              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                <span className="text-[10px] text-zinc-500 block font-medium">Average Speed (mph)</span>
                <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {card4Result.averageSpeedMph}
                </span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300 block">mph</span>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                <span className="text-[10px] text-zinc-500 block font-medium">Total Distance</span>
                <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                  {card4Result.totalDistanceKm.toFixed(1)} km
                </span>
                <span className="text-[10px] text-zinc-400 block">{(card4Result.totalDistanceKm * 0.621371).toFixed(1)} miles</span>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                <span className="text-[10px] text-zinc-500 block font-medium">Total Duration</span>
                <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                  {card4Result.totalTimeMinutes} min
                </span>
                <span className="text-[10px] text-zinc-400 block">{(card4Result.totalTimeMinutes / 60).toFixed(2)} hours</span>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...card4Saved}
          cardTitle="Trip Velocity"
          formatSummary={(r) => `${r.totalDistanceKm}km: Avg ${r.averageSpeedKmh} km/h (${r.averageSpeedMph} mph)`}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Kinematics Takeoff Report
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
