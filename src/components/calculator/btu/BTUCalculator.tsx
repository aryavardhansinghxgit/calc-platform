"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Download,
  Trash2,
  FileSpreadsheet,
  TrendingDown,
  RotateCcw,
  Copy,
  Check,
  Code2,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  LengthUnit,
  AreaUnit,
  TempUnit,
  InsulationLevel,
  SunExposure,
  RoomType,
  ClimateZone,
  BuildingTightness,
  AcCoolingResult,
  HeatingBtuResult,
  EnergyCostResult,
  calculateAcCoolingBtu,
  calculateHeatingBtu,
  calculateEnergyCostAndSizing,
  toFahrenheit,
} from "@/lib/calculator-engine/formulas/btu";

// ─── Shared Types & Helpers ──────────────────────────────────────────────────

interface SavedBtuEstimate<T, R = any> {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: T;
  rawInputs: R;
  notes: string;
}

export interface AcRawInputs {
  mode: "dimensions" | "area";
  length: string;
  width: string;
  dimUnit: LengthUnit;
  area: string;
  areaUnit: AreaUnit;
  ceiling: string;
  ceilingUnit: LengthUnit;
  occupants: string;
  roomType: RoomType;
  insulation: InsulationLevel;
  sunExposure: SunExposure;
  climateZone: ClimateZone;
  quantity: string;
}

export interface HeatRawInputs {
  length: string;
  width: string;
  height: string;
  dimUnit: LengthUnit;
  indoorTemp: string;
  outdoorTemp: string;
  tempUnit: TempUnit;
  insulation: BuildingTightness;
  altitude: string;
  quantity: string;
}

export interface CostRawInputs {
  btu: string;
  seer: string;
  hours: string;
  rate: string;
}

const LENGTH_UNITS: { value: LengthUnit; label: string }[] = [
  { value: "feet", label: "feet" },
  { value: "inches", label: "inches" },
  { value: "meters", label: "meters" },
];

const AREA_UNITS: { value: AreaUnit; label: string }[] = [
  { value: "sq_feet", label: "sq feet" },
  { value: "sq_meters", label: "sq meters" },
];

const TEMP_UNITS: { value: TempUnit; label: string }[] = [
  { value: "fahrenheit", label: "°F" },
  { value: "celsius", label: "°C" },
];

function flashSave(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
}

function useCardSaved<T, R = any>(storageKey: string) {
  const [saved, setSaved] = useState<SavedBtuEstimate<T, R>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: T, rawInputs: R, notes = "") => {
      const entry: SavedBtuEstimate<T, R> = {
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

// ─── Reusable Sub-Components ────────────────────────────────────────────────

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
          <div className="flex items-center gap-1.5 no-print">
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

function InputRow({
  id,
  label,
  value,
  onChange,
  unit,
  onUnitChange,
  unitOptions,
  min,
  max,
  step = 0.5,
  showUnit = true,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  onUnitChange?: (u: any) => void;
  unitOptions?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  showUnit?: boolean;
  error?: string;
}) {
  return (
    <div className="space-y-0.5">
      <div className="grid grid-cols-12 gap-2 items-center text-xs">
        <label htmlFor={id} className="col-span-5 font-medium text-zinc-700 dark:text-zinc-300 truncate">
          {label}
        </label>
        <div className={showUnit && unitOptions ? "col-span-4" : "col-span-7"}>
          <Input
            id={id}
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            min={min}
            max={max}
            step={step}
            className={`h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 ${
              error ? "border-red-500 dark:border-red-400 focus-visible:ring-red-500" : ""
            }`}
          />
        </div>
        {showUnit && unitOptions && onUnitChange && (
          <div className="col-span-3">
            <select
              id={`${id}-unit`}
              value={unit}
              onChange={(e) => onUnitChange(e.target.value)}
              aria-label={`${label} unit`}
              className="w-full h-7 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-medium text-zinc-700 dark:text-zinc-300"
            >
              {unitOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {error && (
        <div role="alert" className="text-[11px] text-red-600 dark:text-red-400 pl-1 font-medium">
          {error}
        </div>
      )}
    </div>
  );
}

function SelectRow({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: any) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-12 gap-2 items-center text-xs">
      <label htmlFor={id} className="col-span-5 font-medium text-zinc-700 dark:text-zinc-300 truncate">
        {label}
      </label>
      <div className="col-span-7">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className="w-full h-7 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 font-medium text-zinc-700 dark:text-zinc-300"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function SavedEstimatesDrawer<T, R = any>({
  saved,
  isOpen,
  setIsOpen,
  remove,
  clear,
  cardTitle,
  formatSummary,
  onRestore,
}: {
  saved: SavedBtuEstimate<T, R>[];
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  remove: (id: string) => void;
  clear: () => void;
  cardTitle: string;
  formatSummary: (result: T) => string;
  onRestore?: (raw: R) => void;
}) {
  if (!isOpen || saved.length === 0) return null;

  const exportCsv = () => {
    const rows = [
      ["Timestamp", "Input Summary", "Result Summary"],
      ...saved.map((e) => [e.timestamp, e.inputSummary, formatSummary(e.result)]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `btu_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_history.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs no-print">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-bold text-zinc-700 dark:text-zinc-300">
          Saved {cardTitle} History ({saved.length})
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportCsv}
            className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <Download className="w-3 h-3" /> CSV
          </button>
          <button
            type="button"
            onClick={clear}
            aria-label="Clear saved calculations"
            className="text-[10px] text-zinc-400 hover:text-red-500 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      </div>
      <div className="space-y-1.5 max-h-36 overflow-y-auto">
        {saved.map((item) => (
          <div
            key={item.id}
            className="p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-sans tabular-nums gap-2"
          >
            <div className="truncate pr-1 flex-1">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                {formatSummary(item.result)}
              </span>
              <span className="text-zinc-400 ml-1.5">({item.inputSummary})</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {onRestore && item.rawInputs && (
                <button
                  type="button"
                  onClick={() => onRestore(item.rawInputs)}
                  aria-label="Restore saved calculation"
                  title="Restore saved calculation"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 p-1 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(item.id)}
                aria-label="Delete saved calculation"
                title="Delete saved calculation"
                className="text-zinc-400 hover:text-red-500 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded cursor-pointer transition-colors"
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

// ─── Card Quick Action Toolbar (Copy, LaTeX, CSV) ───────────────────────────

function ResultActionToolbar({
  onCopyResult,
  onCopySummary,
  onCopyLatex,
  onExportCsv,
  feedback,
}: {
  onCopyResult: () => void;
  onCopySummary: () => void;
  onCopyLatex: () => void;
  onExportCsv: () => void;
  feedback: string | null;
}) {
  return (
    <div className="space-y-1 pt-1 no-print">
      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
        <button
          type="button"
          onClick={onCopyResult}
          aria-label="Copy primary result to clipboard"
          className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300 font-medium transition-colors cursor-pointer"
        >
          <Copy className="w-3 h-3 text-zinc-500" /> Copy Result
        </button>
        <button
          type="button"
          onClick={onCopySummary}
          aria-label="Copy calculation summary to clipboard"
          className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300 font-medium transition-colors cursor-pointer"
        >
          <FileText className="w-3 h-3 text-zinc-500" /> Copy Summary
        </button>
        <button
          type="button"
          onClick={onCopyLatex}
          aria-label="Copy LaTeX formula to clipboard"
          className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300 font-medium transition-colors cursor-pointer"
        >
          <Code2 className="w-3 h-3 text-zinc-500" /> Copy LaTeX
        </button>
        <button
          type="button"
          onClick={onExportCsv}
          aria-label="Download active calculation as CSV"
          className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300 font-medium transition-colors cursor-pointer"
        >
          <Download className="w-3 h-3 text-zinc-500" /> Export CSV
        </button>
      </div>
      {feedback && (
        <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <Check className="w-3 h-3" /> {feedback}
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function BTUCalculator() {
  // ─── Card 1: AC Cooling State ───
  const [acInputMode, setAcInputMode] = useState<"dimensions" | "area">("dimensions");
  const [acLength, setAcLength] = useState("15");
  const [acWidth, setAcWidth] = useState("20");
  const [acDimUnit, setAcDimUnit] = useState<LengthUnit>("feet");
  const [acArea, setAcArea] = useState("300");
  const [acAreaUnit, setAcAreaUnit] = useState<AreaUnit>("sq_feet");
  const [acCeiling, setAcCeiling] = useState("9");
  const [acCeilingUnit, setAcCeilingUnit] = useState<LengthUnit>("feet");
  const [acOccupants, setAcOccupants] = useState("2");
  const [acRoomType, setAcRoomType] = useState<RoomType>("bedroom");
  const [acInsulation, setAcInsulation] = useState<InsulationLevel>("average");
  const [acSunExposure, setAcSunExposure] = useState<SunExposure>("moderate");
  const [acClimateZone, setAcClimateZone] = useState<ClimateZone>("average");
  const [acQuantity, setAcQuantity] = useState("1");
  const [acResult, setAcResult] = useState<AcCoolingResult | null>(null);
  const [acError, setAcError] = useState<string | null>(null);
  const [acFieldErrors, setAcFieldErrors] = useState<Record<string, string>>({});
  const [acSaveSuccess, setAcSaveSuccess] = useState(false);
  const [acFeedback, setAcFeedback] = useState<string | null>(null);
  const acSaved = useCardSaved<AcCoolingResult, AcRawInputs>("saved_btu_ac");

  // ─── Card 2: Heating State ───
  const [heatLength, setHeatLength] = useState("30");
  const [heatWidth, setHeatWidth] = useState("40");
  const [heatHeight, setHeatHeight] = useState("9");
  const [heatDimUnit, setHeatDimUnit] = useState<LengthUnit>("feet");
  const [heatIndoorTemp, setHeatIndoorTemp] = useState("70");
  const [heatOutdoorTemp, setHeatOutdoorTemp] = useState("20");
  const [heatTempUnit, setHeatTempUnit] = useState<TempUnit>("fahrenheit");
  const [heatInsulation, setHeatInsulation] = useState<BuildingTightness>("average_standard");
  const [heatAltitude, setHeatAltitude] = useState("0");
  const [heatQuantity, setHeatQuantity] = useState("1");
  const [heatResult, setHeatResult] = useState<HeatingBtuResult | null>(null);
  const [heatError, setHeatError] = useState<string | null>(null);
  const [heatFieldErrors, setHeatFieldErrors] = useState<Record<string, string>>({});
  const [heatSaveSuccess, setHeatSaveSuccess] = useState(false);
  const [heatFeedback, setHeatFeedback] = useState<string | null>(null);
  const heatSaved = useCardSaved<HeatingBtuResult, HeatRawInputs>("saved_btu_heat");

  // ─── Card 3: Energy Cost State ───
  const [costBtu, setCostBtu] = useState("18000");
  const [costSeer, setCostSeer] = useState("16");
  const [costHours, setCostHours] = useState("8");
  const [costRate, setCostRate] = useState("0.16");
  const [costResult, setCostResult] = useState<EnergyCostResult | null>(null);
  const [costError, setCostError] = useState<string | null>(null);
  const [costFieldErrors, setCostFieldErrors] = useState<Record<string, string>>({});
  const [costSaveSuccess, setCostSaveSuccess] = useState(false);
  const [costFeedback, setCostFeedback] = useState<string | null>(null);
  const costSaved = useCardSaved<EnergyCostResult, CostRawInputs>("saved_btu_cost");

  // Global Report Modal
  const [isReportOpen, setIsReportOpen] = useState(false);

  const showToast = (setter: (v: string | null) => void, msg: string) => {
    setter(msg);
    setTimeout(() => setter(null), 2500);
  };

  // ─── Calculation Handlers with Strict Validation ───

  const handleAcCalc = useCallback(() => {
    const fieldErrs: Record<string, string> = {};

    if (acInputMode === "dimensions") {
      const l = Number(acLength);
      const w = Number(acWidth);
      if (acLength.trim() === "" || isNaN(l) || l <= 0) {
        fieldErrs.length = "Length must be greater than 0.";
      }
      if (acWidth.trim() === "" || isNaN(w) || w <= 0) {
        fieldErrs.width = "Width must be greater than 0.";
      }
    } else {
      const a = Number(acArea);
      if (acArea.trim() === "" || isNaN(a) || a <= 0) {
        fieldErrs.area = "Area must be greater than 0.";
      }
    }

    const c = Number(acCeiling);
    if (acCeiling.trim() === "" || isNaN(c) || c <= 0) {
      fieldErrs.ceiling = "Ceiling height must be greater than 0.";
    }

    const occ = Number(acOccupants);
    if (acOccupants.trim() === "" || isNaN(occ) || occ < 0) {
      fieldErrs.occupants = "Number of people cannot be negative.";
    }

    const q = Number(acQuantity);
    if (acQuantity.trim() === "" || isNaN(q) || q < 1) {
      fieldErrs.quantity = "Number of rooms must be at least 1.";
    }

    setAcFieldErrors(fieldErrs);

    if (Object.keys(fieldErrs).length > 0) {
      setAcError("Please correct the invalid inputs above to calculate cooling capacity.");
      setAcResult(null);
      return;
    }

    setAcError(null);

    const directArea = Number(acArea);
    const res = calculateAcCoolingBtu({
      length: acInputMode === "dimensions" ? Number(acLength) : undefined,
      width: acInputMode === "dimensions" ? Number(acWidth) : undefined,
      areaSqFt:
        acInputMode === "area"
          ? acAreaUnit === "sq_meters"
            ? directArea * 10.7639
            : directArea
          : undefined,
      dimensionUnit: acDimUnit,
      ceilingHeight: Number(acCeiling),
      ceilingHeightUnit: acCeilingUnit,
      occupants: Number(acOccupants),
      roomType: acRoomType,
      insulation: acInsulation,
      sunExposure: acSunExposure,
      climateZone: acClimateZone,
      quantity: Number(acQuantity),
    });
    setAcResult(res);
  }, [
    acInputMode,
    acLength,
    acWidth,
    acArea,
    acAreaUnit,
    acDimUnit,
    acCeiling,
    acCeilingUnit,
    acOccupants,
    acRoomType,
    acInsulation,
    acSunExposure,
    acClimateZone,
    acQuantity,
  ]);

  const handleHeatCalc = useCallback(() => {
    const fieldErrs: Record<string, string> = {};

    const l = Number(heatLength);
    if (heatLength.trim() === "" || isNaN(l) || l <= 0) {
      fieldErrs.length = "Building length must be greater than 0.";
    }

    const w = Number(heatWidth);
    if (heatWidth.trim() === "" || isNaN(w) || w <= 0) {
      fieldErrs.width = "Building width must be greater than 0.";
    }

    const h = Number(heatHeight);
    if (heatHeight.trim() === "" || isNaN(h) || h <= 0) {
      fieldErrs.height = "Ceiling height must be greater than 0.";
    }

    const inT = Number(heatIndoorTemp);
    if (heatIndoorTemp.trim() === "" || isNaN(inT)) {
      fieldErrs.indoorTemp = "Desired indoor temperature must be a valid number.";
    }

    const outT = Number(heatOutdoorTemp);
    if (heatOutdoorTemp.trim() === "" || isNaN(outT)) {
      fieldErrs.outdoorTemp = "Lowest outdoor temperature must be a valid number.";
    }

    const alt = Number(heatAltitude);
    if (heatAltitude.trim() === "" || isNaN(alt) || alt < 0) {
      fieldErrs.altitude = "Altitude cannot be negative.";
    }

    const q = Number(heatQuantity);
    if (heatQuantity.trim() === "" || isNaN(q) || q < 1) {
      fieldErrs.quantity = "Number of zones must be at least 1.";
    }

    setHeatFieldErrors(fieldErrs);

    if (Object.keys(fieldErrs).length > 0) {
      setHeatError("Please correct the invalid inputs above to calculate heating capacity.");
      setHeatResult(null);
      return;
    }

    const indoorF = toFahrenheit(inT, heatTempUnit);
    const outdoorF = toFahrenheit(outT, heatTempUnit);

    if (outdoorF >= indoorF) {
      setHeatError(
        "For heating-load estimation, the outdoor design temperature should be below the desired indoor temperature."
      );
      setHeatResult(null);
      return;
    }

    setHeatError(null);

    const res = calculateHeatingBtu({
      length: l,
      width: w,
      height: h,
      dimensionUnit: heatDimUnit,
      desiredIndoorTemp: inT,
      outdoorLowTemp: outT,
      tempUnit: heatTempUnit,
      insulationCondition: heatInsulation,
      altitudeFeet: alt,
      quantity: q,
    });
    setHeatResult(res);
  }, [
    heatLength,
    heatWidth,
    heatHeight,
    heatDimUnit,
    heatIndoorTemp,
    heatOutdoorTemp,
    heatTempUnit,
    heatInsulation,
    heatAltitude,
    heatQuantity,
  ]);

  const handleCostCalc = useCallback(() => {
    const fieldErrs: Record<string, string> = {};

    const b = Number(costBtu);
    if (costBtu.trim() === "" || isNaN(b) || b <= 0) {
      fieldErrs.btu = "Appliance BTU rating must be greater than 0.";
    }

    const s = Number(costSeer);
    if (costSeer.trim() === "" || isNaN(s) || s <= 0) {
      fieldErrs.seer = "SEER rating must be greater than 0.";
    }

    const h = Number(costHours);
    if (costHours.trim() === "" || isNaN(h) || h < 0 || h > 24) {
      fieldErrs.hours = "Running hours must be between 0 and 24.";
    }

    const r = Number(costRate);
    if (costRate.trim() === "" || isNaN(r) || r < 0) {
      fieldErrs.rate = "Electricity rate cannot be negative.";
    }

    setCostFieldErrors(fieldErrs);

    if (Object.keys(fieldErrs).length > 0) {
      setCostError("Please correct the invalid energy inputs above.");
      setCostResult(null);
      return;
    }

    setCostError(null);

    const res = calculateEnergyCostAndSizing({
      btuRating: b,
      seerRating: s,
      dailyHours: h,
      electricityRatePerKwh: r,
    });
    setCostResult(res);
  }, [costBtu, costSeer, costHours, costRate]);

  // Run initial calculations on mount
  useEffect(() => {
    handleAcCalc();
    handleHeatCalc();
    handleCostCalc();
  }, [handleAcCalc, handleHeatCalc, handleCostCalc]);

  // Sync helpers
  const syncAcToCost = () => {
    if (acResult) {
      setCostBtu(String(acResult.totalBtuPerHour));
      setTimeout(handleCostCalc, 50);
    }
  };

  const syncHeatToCost = () => {
    if (heatResult) {
      setCostBtu(String(heatResult.totalHeatingBtu));
      setTimeout(handleCostCalc, 50);
    }
  };

  // Restore Handlers (DEFECT-BTU-03)
  const restoreAc = (raw: AcRawInputs) => {
    setAcInputMode(raw.mode);
    setAcLength(raw.length);
    setAcWidth(raw.width);
    setAcDimUnit(raw.dimUnit);
    setAcArea(raw.area);
    setAcAreaUnit(raw.areaUnit);
    setAcCeiling(raw.ceiling);
    setAcCeilingUnit(raw.ceilingUnit);
    setAcOccupants(raw.occupants);
    setAcRoomType(raw.roomType);
    setAcInsulation(raw.insulation);
    setAcSunExposure(raw.sunExposure);
    setAcClimateZone(raw.climateZone);
    setAcQuantity(raw.quantity);
    showToast(setAcFeedback, "Calculation restored");
  };

  const restoreHeat = (raw: HeatRawInputs) => {
    setHeatLength(raw.length);
    setHeatWidth(raw.width);
    setHeatHeight(raw.height);
    setHeatDimUnit(raw.dimUnit);
    setHeatIndoorTemp(raw.indoorTemp);
    setHeatOutdoorTemp(raw.outdoorTemp);
    setHeatTempUnit(raw.tempUnit);
    setHeatInsulation(raw.insulation);
    setHeatAltitude(raw.altitude);
    setHeatQuantity(raw.quantity);
    showToast(setHeatFeedback, "Calculation restored");
  };

  const restoreCost = (raw: CostRawInputs) => {
    setCostBtu(raw.btu);
    setCostSeer(raw.seer);
    setCostHours(raw.hours);
    setCostRate(raw.rate);
    showToast(setCostFeedback, "Calculation restored");
  };

  // Clipboard & Direct Export Handlers (DEFECT-BTU-04)
  const copyText = (text: string, feedbackSetter: (v: string | null) => void, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(feedbackSetter, `${label} copied!`);
      });
    }
  };

  const downloadCsvFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // AC Card Exports
  const copyAcResult = () => {
    if (!acResult) return;
    copyText(`BTU Cooling Load: ${acResult.totalBtuPerHour.toLocaleString()} BTU/hr`, setAcFeedback, "Result");
  };

  const copyAcSummary = () => {
    if (!acResult) return;
    const txt = [
      "AC COOLING BTU ESTIMATE",
      `Room Dimensions: ${acInputMode === "dimensions" ? `${acLength}×${acWidth} ${acDimUnit}` : `${acArea} ${acAreaUnit}`}`,
      `Ceiling Height: ${acCeiling} ${acCeilingUnit}`,
      `Occupants: ${acOccupants}`,
      `Room Type: ${acRoomType}`,
      `Insulation: ${acInsulation}`,
      `Solar Exposure: ${acSunExposure}`,
      `Climate Zone: ${acClimateZone}`,
      `Rooms/Quantity: ${acQuantity}`,
      "---------------------------",
      `Required Cooling: ${acResult.totalBtuPerHour.toLocaleString()} BTU/hr`,
      `AC Tonnage: ${acResult.recommendedTons} Ton (${acResult.exactTons} exact)`,
      `Power Equivalent: ${acResult.powerKw} kW (${acResult.powerHp} HP)`,
      `Recommended Unit: ${acResult.unitTypeRecommendation}`,
      `Base Floor Load: ${acResult.breakdown.areaBtu.toLocaleString()} BTU`,
      `Ceiling Offset: +${acResult.breakdown.ceilingOffsetBtu.toLocaleString()} BTU`,
    ].join("\n");
    copyText(txt, setAcFeedback, "Summary");
  };

  const copyAcLatex = () => {
    if (!acResult) return;
    const latex = [
      `% AC Cooling Load Calculation`,
      `Q_{\\text{base}} = ${acResult.breakdown.areaBtu.toLocaleString()}\\text{ BTU/hr}`,
      `Q_{\\text{ceiling}} = ${acResult.breakdown.ceilingOffsetBtu.toLocaleString()}\\text{ BTU/hr}`,
      `Q_{\\text{cool}} = (Q_{\\text{base}} + Q_{\\text{ceiling}} + Q_{\\text{occ}} + Q_{\\text{app}}) \\times F_{\\text{sun}} \\times F_{\\text{ins}} \\times F_{\\text{clim}}`,
      `Q_{\\text{cool}} = ${acResult.totalBtuPerHour.toLocaleString()}\\text{ BTU/hr}`,
      `\\text{Tons} = \\frac{${acResult.totalBtuPerHour.toLocaleString()}}{12{,}000} = ${acResult.exactTons}\\text{ Ton}\\;(\\text{Recommended: } ${acResult.recommendedTons}\\text{ Ton})`,
      `P_{\\text{kW}} = \\frac{${acResult.totalBtuPerHour.toLocaleString()}}{3{,}412.14} = ${acResult.powerKw}\\text{ kW}`,
    ].join("\n");
    copyText(latex, setAcFeedback, "LaTeX");
  };

  const exportAcCsv = () => {
    if (!acResult) return;
    const rows = [
      ["Metric", "Value", "Unit"],
      ["Calculation", "AC Cooling Load", ""],
      ["Floor Area / Size", acInputMode === "dimensions" ? `${acLength}x${acWidth}` : acArea, acInputMode === "dimensions" ? acDimUnit : acAreaUnit],
      ["Ceiling Height", acCeiling, acCeilingUnit],
      ["Occupants", acOccupants, "people"],
      ["Room Type", acRoomType, ""],
      ["Insulation", acInsulation, ""],
      ["Sun Exposure", acSunExposure, ""],
      ["Climate Zone", acClimateZone, ""],
      ["Cooling Capacity", acResult.totalBtuPerHour.toString(), "BTU/hr"],
      ["Commercial Tonnage", acResult.recommendedTons.toString(), "Tons"],
      ["Exact Tonnage", acResult.exactTons.toString(), "Tons"],
      ["Electrical Power", acResult.powerKw.toString(), "kW"],
      ["Mechanical Power", acResult.powerHp.toString(), "HP"],
      ["Equipment Type", acResult.unitTypeRecommendation, ""],
      ["Timestamp", new Date().toISOString(), ""],
    ];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\r\n");
    downloadCsvFile("ac_cooling_btu_calculation.csv", csv);
    showToast(setAcFeedback, "CSV downloaded!");
  };

  // Heat Card Exports
  const copyHeatResult = () => {
    if (!heatResult) return;
    copyText(`Heating Load: ${heatResult.totalHeatingBtu.toLocaleString()} BTU/hr`, setHeatFeedback, "Result");
  };

  const copyHeatSummary = () => {
    if (!heatResult) return;
    const txt = [
      "BUILDING HEATING LOAD ESTIMATE",
      `Building Dimensions: ${heatLength}×${heatWidth}×${heatHeight} ${heatDimUnit}`,
      `Indoor Setpoint: ${heatIndoorTemp} ${heatTempUnit}`,
      `Outdoor Design Low: ${heatOutdoorTemp} ${heatTempUnit}`,
      `Design Delta (ΔT): ${heatResult.deltaTempF} °F`,
      `Building Volume: ${heatResult.volumeCuFt.toLocaleString()} ft³ (${heatResult.volumeCuM} m³)`,
      `Insulation: ${heatInsulation}`,
      `Altitude: ${heatAltitude} ft`,
      `Zones: ${heatQuantity}`,
      "---------------------------",
      `Total Heating Required: ${heatResult.totalHeatingBtu.toLocaleString()} BTU/hr`,
      `Heating Power: ${heatResult.heatingKw} kW`,
      `Natural Gas Rate (85% AFUE): ${heatResult.fuelEquivalents.naturalGasThermsPerHour} therms/hr`,
      `Propane Rate (85% AFUE): ${heatResult.fuelEquivalents.propaneGallonsPerHour} gal/hr`,
      `Electric Resistance: ${heatResult.fuelEquivalents.electricKwhPerHour} kWh/hr`,
    ].join("\n");
    copyText(txt, setHeatFeedback, "Summary");
  };

  const copyHeatLatex = () => {
    if (!heatResult) return;
    const latex = [
      `% Heating Load Calculation`,
      `V = ${heatLength} \\times ${heatWidth} \\times ${heatHeight} = ${heatResult.volumeCuFt.toLocaleString()}\\text{ ft}^3`,
      `\\Delta T = T_{\\text{indoor}} - T_{\\text{outdoor}} = ${heatIndoorTemp}^\\circ\\text{F} - ${heatOutdoorTemp}^\\circ\\text{F} = ${heatResult.deltaTempF}^\\circ\\text{F}`,
      `Q_{\\text{heat}} = V \\times \\Delta T \\times H = ${heatResult.totalHeatingBtu.toLocaleString()}\\text{ BTU/hr}`,
      `P_{\\text{heat}} = \\frac{${heatResult.totalHeatingBtu.toLocaleString()}}{3{,}412.14} = ${heatResult.heatingKw}\\text{ kW}`,
    ].join("\n");
    copyText(latex, setHeatFeedback, "LaTeX");
  };

  const exportHeatCsv = () => {
    if (!heatResult) return;
    const rows = [
      ["Metric", "Value", "Unit"],
      ["Calculation", "Heating BTU Load", ""],
      ["Building Dimensions", `${heatLength}x${heatWidth}x${heatHeight}`, heatDimUnit],
      ["Building Volume", heatResult.volumeCuFt.toString(), "cu ft"],
      ["Indoor Temp", heatIndoorTemp, heatTempUnit],
      ["Outdoor Low Temp", heatOutdoorTemp, heatTempUnit],
      ["Temp Delta (ΔT)", heatResult.deltaTempF.toString(), "deg F"],
      ["Total Heating Load", heatResult.totalHeatingBtu.toString(), "BTU/hr"],
      ["Equivalent Power", heatResult.heatingKw.toString(), "kW"],
      ["Natural Gas (85% AFUE)", heatResult.fuelEquivalents.naturalGasThermsPerHour.toString(), "therms/hr"],
      ["Propane (85% AFUE)", heatResult.fuelEquivalents.propaneGallonsPerHour.toString(), "gal/hr"],
      ["Electric Resistance", heatResult.fuelEquivalents.electricKwhPerHour.toString(), "kWh/hr"],
      ["Timestamp", new Date().toISOString(), ""],
    ];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\r\n");
    downloadCsvFile("heating_btu_calculation.csv", csv);
    showToast(setHeatFeedback, "CSV downloaded!");
  };

  // Energy Card Exports
  const copyCostResult = () => {
    if (!costResult) return;
    copyText(
      `Daily Cost: $${costResult.dailyCost.toFixed(2)} | Monthly Cost: $${costResult.monthlyCost.toFixed(2)} | Annual Cost: $${costResult.annualCost.toFixed(2)}`,
      setCostFeedback,
      "Result"
    );
  };

  const copyCostSummary = () => {
    if (!costResult) return;
    const txt = [
      "ENERGY OPERATING COST & SEER SIZING",
      `Appliance Rating: ${costBtu} BTU/hr`,
      `SEER Rating: ${costSeer}`,
      `Daily Running Hours: ${costHours} h/day`,
      `Electric Rate: $${costRate}/kWh`,
      "---------------------------",
      `Power Consumption: ${costResult.watts} W (${costResult.kilowatts} kW)`,
      `Daily Cost: $${costResult.dailyCost.toFixed(2)}/day`,
      `Monthly Cost: $${costResult.monthlyCost.toFixed(2)}/month`,
      `Annual Cost: $${costResult.annualCost.toFixed(2)}/year`,
      `Carbon Footprint: ${costResult.co2KgPerYear.toLocaleString()} kg CO₂/year`,
    ].join("\n");
    copyText(txt, setCostFeedback, "Summary");
  };

  const copyCostLatex = () => {
    if (!costResult) return;
    const latex = [
      `% Energy Operating Cost & SEER Relationship`,
      `P = \\frac{\\text{BTU}}{\\text{SEER}} = \\frac{${costBtu}}{${costSeer}} = ${costResult.watts}\\text{ W} = ${costResult.kilowatts}\\text{ kW}`,
      `E_{\\text{daily}} = ${costResult.kilowatts}\\text{ kW} \\times ${costHours}\\text{ h} = ${(costResult.kilowatts * Number(costHours)).toFixed(2)}\\text{ kWh/day}`,
      `\\text{Daily Cost} = E_{\\text{daily}} \\times \\$${costRate}/\\text{kWh} = \\$${costResult.dailyCost.toFixed(2)}`,
      `\\text{Annual Cost} = \\text{Daily Cost} \\times 365 = \\$${costResult.annualCost.toFixed(2)}`,
    ].join("\n");
    copyText(latex, setCostFeedback, "LaTeX");
  };

  const exportCostCsv = () => {
    if (!costResult) return;
    const rows = [
      ["Metric", "Value", "Unit"],
      ["Calculation", "Energy Cost & SEER Sizing", ""],
      ["Appliance BTU", costBtu, "BTU/hr"],
      ["Selected SEER", costSeer, "SEER"],
      ["Daily Operating Hours", costHours, "hours/day"],
      ["Electricity Rate", costRate, "$/kWh"],
      ["Power Consumption", costResult.watts.toString(), "Watts"],
      ["Daily Cost", costResult.dailyCost.toFixed(2), "USD"],
      ["Monthly Cost", costResult.monthlyCost.toFixed(2), "USD"],
      ["Annual Cost", costResult.annualCost.toFixed(2), "USD"],
      ["CO2 Footprint", costResult.co2KgPerYear.toString(), "kg CO2/year"],
      ["Timestamp", new Date().toISOString(), ""],
    ];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\r\n");
    downloadCsvFile("energy_cost_seer_calculation.csv", csv);
    showToast(setCostFeedback, "CSV downloaded!");
  };

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];
    if (acResult) {
      sections.push({
        title: "AC Cooling BTU Calculation",
        items: [
          { label: "Cooling Load", value: `${acResult.totalBtuPerHour.toLocaleString()} BTU/hr` },
          { label: "AC Tonnage", value: `${acResult.recommendedTons} Tons (${acResult.exactTons} exact)` },
          { label: "Power Equivalent", value: `${acResult.powerKw} kW (${acResult.powerHp} HP)` },
          { label: "Recommended Type", value: acResult.unitTypeRecommendation },
        ],
      });
    }
    if (heatResult) {
      sections.push({
        title: "Heating Load Calculation",
        items: [
          { label: "Total Heating Required", value: `${heatResult.totalHeatingBtu.toLocaleString()} BTU/hr` },
          { label: "Heating Power", value: `${heatResult.heatingKw} kW` },
          { label: "Building Volume", value: `${heatResult.volumeCuFt.toLocaleString()} ft³ (${heatResult.volumeCuM} m³)` },
          { label: "Design Temp Delta (ΔT)", value: `${heatResult.deltaTempF} °F` },
          { label: "Natural Gas Rate", value: `${heatResult.fuelEquivalents.naturalGasThermsPerHour} therms/hr` },
          { label: "Electric Resistance", value: `${heatResult.fuelEquivalents.electricKwhPerHour} kWh/hr` },
        ],
      });
    }
    if (costResult) {
      sections.push({
        title: "Operating Cost & Efficiency",
        items: [
          { label: "Power Consumption", value: `${costResult.watts} W (${costResult.kilowatts} kW)` },
          { label: "Daily Operating Cost", value: `$${costResult.dailyCost.toFixed(2)} / day` },
          { label: "Monthly Operating Cost", value: `$${costResult.monthlyCost.toFixed(2)} / month` },
          { label: "Annual Operating Cost", value: `$${costResult.annualCost.toFixed(2)} / year` },
          { label: "CO₂ Footprint", value: `${costResult.co2KgPerYear.toLocaleString()} kg CO₂/yr` },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "BTU Calculator",
        reportTitle: "HVAC Heating & Cooling BTU Load Estimation Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        currencySymbol: "$",
      },
      keyMetrics: [
        { label: "AC Cooling", value: acResult ? `${acResult.totalBtuPerHour.toLocaleString()} BTU/hr` : "—", highlight: true },
        { label: "Heating Load", value: heatResult ? `${heatResult.totalHeatingBtu.toLocaleString()} BTU/hr` : "—", highlight: true },
        { label: "Annual Energy Cost", value: costResult ? `$${costResult.annualCost.toFixed(0)}/yr` : "—" },
      ],
      sections,
    };
  }, [acResult, heatResult, costResult]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ CARD 1: AC COOLING BTU ═══════════════════ */}
      <CardWrapper
        title="AC Cooling BTU Calculator"
        hasResult={!!acResult}
        isSaved={acSaveSuccess}
        savedCount={acSaved.saved.length}
        onToggleSaved={() => acSaved.setIsOpen(!acSaved.isOpen)}
        onSave={() => {
          if (!acResult) return;
          const raw: AcRawInputs = {
            mode: acInputMode,
            length: acLength,
            width: acWidth,
            dimUnit: acDimUnit,
            area: acArea,
            areaUnit: acAreaUnit,
            ceiling: acCeiling,
            ceilingUnit: acCeilingUnit,
            occupants: acOccupants,
            roomType: acRoomType,
            insulation: acInsulation,
            sunExposure: acSunExposure,
            climateZone: acClimateZone,
            quantity: acQuantity,
          };
          acSaved.save(
            `${acInputMode === "dimensions" ? `${acLength}×${acWidth} ${acDimUnit}` : `${acArea} ${acAreaUnit}`}, ${acOccupants} occ, ${acRoomType}`,
            acResult,
            raw
          );
          flashSave(setAcSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {/* Mode switch */}
            <div className="flex gap-2 text-xs pb-1">
              <button
                type="button"
                onClick={() => setAcInputMode("dimensions")}
                className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                  acInputMode === "dimensions"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                Room Dimensions
              </button>
              <button
                type="button"
                onClick={() => setAcInputMode("area")}
                className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                  acInputMode === "area"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                Direct Area (sq ft/m²)
              </button>
            </div>

            {acInputMode === "dimensions" ? (
              <>
                <InputRow
                  id="ac-length"
                  label="Room Length"
                  value={acLength}
                  onChange={setAcLength}
                  unit={acDimUnit}
                  onUnitChange={setAcDimUnit}
                  unitOptions={LENGTH_UNITS}
                  error={acFieldErrors.length}
                />
                <InputRow
                  id="ac-width"
                  label="Room Width"
                  value={acWidth}
                  onChange={setAcWidth}
                  unit={acDimUnit}
                  onUnitChange={setAcDimUnit}
                  unitOptions={LENGTH_UNITS}
                  error={acFieldErrors.width}
                />
              </>
            ) : (
              <InputRow
                id="ac-direct-area"
                label="Total Floor Area"
                value={acArea}
                onChange={setAcArea}
                unit={acAreaUnit}
                onUnitChange={setAcAreaUnit}
                unitOptions={AREA_UNITS}
                error={acFieldErrors.area}
              />
            )}

            <InputRow
              id="ac-ceiling-height"
              label="Ceiling Height"
              value={acCeiling}
              onChange={setAcCeiling}
              unit={acCeilingUnit}
              onUnitChange={setAcCeilingUnit}
              unitOptions={LENGTH_UNITS}
              error={acFieldErrors.ceiling}
            />
            <InputRow
              id="ac-occupants"
              label="Number of People"
              value={acOccupants}
              onChange={setAcOccupants}
              min={0}
              step={1}
              showUnit={false}
              error={acFieldErrors.occupants}
            />

            <SelectRow
              id="ac-room-type"
              label="Room Type"
              value={acRoomType}
              onChange={setAcRoomType}
              options={[
                { value: "bedroom", label: "Bedroom (Standard)" },
                { value: "living_room", label: "Living Room (+1,000 BTU)" },
                { value: "kitchen", label: "Kitchen (+4,000 BTU for stove)" },
                { value: "office", label: "Home Office (+1,500 BTU electronics)" },
                { value: "server_room", label: "Server Room (+5,000 BTU heavy gear)" },
              ]}
            />

            <SelectRow
              id="ac-insulation"
              label="Insulation Quality"
              value={acInsulation}
              onChange={setAcInsulation}
              options={[
                { value: "poor", label: "Poor (Older home, single pane)" },
                { value: "average", label: "Average (Standard insulation)" },
                { value: "good", label: "Good (Double pane, tight walls)" },
                { value: "excellent", label: "Excellent (Modern foam, Low-E)" },
              ]}
            />

            <SelectRow
              id="ac-sun-exposure"
              label="Sun Exposure"
              value={acSunExposure}
              onChange={setAcSunExposure}
              options={[
                { value: "shaded", label: "Heavily Shaded (-10% BTU)" },
                { value: "moderate", label: "Moderate / Average Sun" },
                { value: "high_sun", label: "High Direct Sunlight (+10% BTU)" },
              ]}
            />

            <SelectRow
              id="ac-climate-zone"
              label="Climate Zone"
              value={acClimateZone}
              onChange={setAcClimateZone}
              options={[
                { value: "cool", label: "Cool / Temperate (Northern)" },
                { value: "average", label: "Average / Moderate (Mid-Atlantic)" },
                { value: "hot_humid", label: "Hot & Humid (Southern / Tropical +15%)" },
              ]}
            />

            <InputRow
              id="ac-quantity"
              label="Number of Rooms"
              value={acQuantity}
              onChange={setAcQuantity}
              min={1}
              step={1}
              showUnit={false}
              error={acFieldErrors.quantity}
            />

            <div className="flex gap-2 pt-1 no-print">
              <Button onClick={handleAcCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setAcLength("15");
                  setAcWidth("20");
                  setAcArea("300");
                  setAcCeiling("9");
                  setAcOccupants("2");
                  setAcRoomType("bedroom");
                  setAcInsulation("average");
                  setAcSunExposure("moderate");
                  setAcClimateZone("average");
                  setAcQuantity("1");
                  setAcError(null);
                  setAcFieldErrors({});
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="flex flex-col justify-between">
            {acError ? (
              <div role="alert" className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Validation Alert</div>
                  <div>{acError}</div>
                </div>
              </div>
            ) : acResult ? (
              <div className="space-y-2.5">
                <div aria-live="polite" className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300 block">
                    Required Cooling Capacity
                  </span>
                  <div className="text-2xl font-black text-blue-900 dark:text-blue-100 font-sans tabular-nums">
                    {acResult.totalBtuPerHour.toLocaleString()}{" "}
                    <span className="text-xs font-normal text-blue-700 dark:text-blue-300">BTU/hr</span>
                  </div>
                  <div className="text-xs font-semibold text-blue-800 dark:text-blue-300 mt-0.5">
                    or {acResult.powerKw.toLocaleString()} kW ({acResult.powerHp} HP)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Recommended AC Size</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums text-sm">
                      {acResult.recommendedTons} Ton
                    </span>
                    <span className="text-[10px] text-zinc-400 block">({acResult.exactTons} exact)</span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Recommended Unit</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 text-xs block truncate" title={acResult.unitTypeRecommendation}>
                      {acResult.unitTypeRecommendation}
                    </span>
                  </div>
                </div>

                {/* Sizing Breakdown */}
                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60 text-[11px] space-y-1">
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                    <span>Base Floor Area Load:</span>
                    <span className="font-semibold font-sans tabular-nums">{acResult.breakdown.areaBtu.toLocaleString()} BTU</span>
                  </div>
                  {acResult.breakdown.ceilingOffsetBtu > 0 && (
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                      <span>High Ceiling Offset:</span>
                      <span className="font-semibold font-sans tabular-nums">+{acResult.breakdown.ceilingOffsetBtu.toLocaleString()} BTU</span>
                    </div>
                  )}
                  {acResult.breakdown.kitchenBtu > 0 && (
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                      <span>Room Appliance Load:</span>
                      <span className="font-semibold font-sans tabular-nums">+{acResult.breakdown.kitchenBtu.toLocaleString()} BTU</span>
                    </div>
                  )}
                  {acResult.breakdown.occupantsBtu !== 0 && (
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                      <span>Occupancy Adjustment:</span>
                      <span className="font-semibold font-sans tabular-nums">
                        {acResult.breakdown.occupantsBtu > 0 ? `+${acResult.breakdown.occupantsBtu}` : acResult.breakdown.occupantsBtu} BTU
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={syncAcToCost}
                  className="w-full text-xs font-semibold h-7 text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer no-print"
                >
                  Estimate Electric Running Cost for {acResult.totalBtuPerHour.toLocaleString()} BTU ↓
                </Button>

                <ResultActionToolbar
                  onCopyResult={copyAcResult}
                  onCopySummary={copyAcSummary}
                  onCopyLatex={copyAcLatex}
                  onExportCsv={exportAcCsv}
                  feedback={acFeedback}
                />
              </div>
            ) : (
              <div className="text-xs text-zinc-500 text-center py-8">
                Click Calculate to view required AC cooling BTUs.
              </div>
            )}
          </div>
        </div>
        <SavedEstimatesDrawer
          {...acSaved}
          cardTitle="AC Cooling"
          formatSummary={(r) => `${r.totalBtuPerHour.toLocaleString()} BTU/hr (${r.recommendedTons} Ton)`}
          onRestore={restoreAc}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: HEATING BTU ═══════════════════ */}
      <CardWrapper
        title="Heating & Temperature Difference BTU Calculator"
        hasResult={!!heatResult}
        isSaved={heatSaveSuccess}
        savedCount={heatSaved.saved.length}
        onToggleSaved={() => heatSaved.setIsOpen(!heatSaved.isOpen)}
        onSave={() => {
          if (!heatResult) return;
          const raw: HeatRawInputs = {
            length: heatLength,
            width: heatWidth,
            height: heatHeight,
            dimUnit: heatDimUnit,
            indoorTemp: heatIndoorTemp,
            outdoorTemp: heatOutdoorTemp,
            tempUnit: heatTempUnit,
            insulation: heatInsulation,
            altitude: heatAltitude,
            quantity: heatQuantity,
          };
          heatSaved.save(
            `${heatLength}×${heatWidth}×${heatHeight} ${heatDimUnit}, ΔT: ${heatResult.deltaTempF}°F, ${heatInsulation}`,
            heatResult,
            raw
          );
          flashSave(setHeatSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow
              id="heat-length"
              label="Building Length"
              value={heatLength}
              onChange={setHeatLength}
              unit={heatDimUnit}
              onUnitChange={setHeatDimUnit}
              unitOptions={LENGTH_UNITS}
              error={heatFieldErrors.length}
            />
            <InputRow
              id="heat-width"
              label="Building Width"
              value={heatWidth}
              onChange={setHeatWidth}
              unit={heatDimUnit}
              onUnitChange={setHeatDimUnit}
              unitOptions={LENGTH_UNITS}
              error={heatFieldErrors.width}
            />
            <InputRow
              id="heat-height"
              label="Ceiling Height"
              value={heatHeight}
              onChange={setHeatHeight}
              unit={heatDimUnit}
              onUnitChange={setHeatDimUnit}
              unitOptions={LENGTH_UNITS}
              error={heatFieldErrors.height}
            />
            <InputRow
              id="heat-indoor-temp"
              label="Desired Indoor Temp"
              value={heatIndoorTemp}
              onChange={setHeatIndoorTemp}
              unit={heatTempUnit}
              onUnitChange={setHeatTempUnit}
              unitOptions={TEMP_UNITS}
              error={heatFieldErrors.indoorTemp}
            />
            <InputRow
              id="heat-outdoor-temp"
              label="Lowest Outdoor Temp"
              value={heatOutdoorTemp}
              onChange={setHeatOutdoorTemp}
              unit={heatTempUnit}
              onUnitChange={setHeatTempUnit}
              unitOptions={TEMP_UNITS}
              error={heatFieldErrors.outdoorTemp}
            />

            <SelectRow
              id="heat-insulation"
              label="Insulation Condition"
              value={heatInsulation}
              onChange={setHeatInsulation}
              options={[
                { value: "poor_drafty", label: "Poor / Drafty (Older home, single pane)" },
                { value: "average_standard", label: "Average / Standard (Double pane, R-13)" },
                { value: "tight_efficient", label: "Tight / Modern (Spray foam, R-21+)" },
              ]}
            />

            <InputRow
              id="heat-altitude"
              label="Altitude (feet > 2000)"
              value={heatAltitude}
              onChange={setHeatAltitude}
              min={0}
              step={500}
              showUnit={false}
              error={heatFieldErrors.altitude}
            />
            <InputRow
              id="heat-quantity"
              label="Number of Zones"
              value={heatQuantity}
              onChange={setHeatQuantity}
              min={1}
              step={1}
              showUnit={false}
              error={heatFieldErrors.quantity}
            />

            <div className="flex gap-2 pt-1 no-print">
              <Button onClick={handleHeatCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setHeatLength("30");
                  setHeatWidth("40");
                  setHeatHeight("9");
                  setHeatIndoorTemp("70");
                  setHeatOutdoorTemp("20");
                  setHeatInsulation("average_standard");
                  setHeatAltitude("0");
                  setHeatQuantity("1");
                  setHeatError(null);
                  setHeatFieldErrors({});
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Heating Results Summary */}
          <div className="flex flex-col justify-between">
            {heatError ? (
              <div role="alert" className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Validation Alert</div>
                  <div>{heatError}</div>
                </div>
              </div>
            ) : heatResult ? (
              <div className="space-y-2.5">
                <div aria-live="polite" className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300 block">
                    Total Heating Capacity Required
                  </span>
                  <div className="text-2xl font-black text-blue-900 dark:text-blue-100 font-sans tabular-nums">
                    {heatResult.totalHeatingBtu.toLocaleString()}{" "}
                    <span className="text-xs font-normal text-blue-700 dark:text-blue-300">BTU/hr</span>
                  </div>
                  <div className="text-xs font-semibold text-blue-800 dark:text-blue-300 mt-0.5">
                    or {heatResult.heatingKw.toLocaleString()} kW
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Building Volume</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums text-xs">
                      {heatResult.volumeCuFt.toLocaleString()} ft³
                    </span>
                    <span className="text-[10px] text-zinc-400 block">({heatResult.volumeCuM} m³)</span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Temp Difference (ΔT)</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums text-xs">
                      {heatResult.deltaTempF} °F
                    </span>
                  </div>
                </div>

                {/* Fuel equivalents */}
                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60 text-[11px] space-y-1">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300 block text-[11px]">
                    Estimated Hourly Fuel Consumption (at 85% AFUE):
                  </span>
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                    <span>Natural Gas:</span>
                    <span className="font-semibold font-sans tabular-nums">{heatResult.fuelEquivalents.naturalGasThermsPerHour} therms/hr</span>
                  </div>
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                    <span>Propane:</span>
                    <span className="font-semibold font-sans tabular-nums">{heatResult.fuelEquivalents.propaneGallonsPerHour} gal/hr</span>
                  </div>
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                    <span>Electric Resistance:</span>
                    <span className="font-semibold font-sans tabular-nums">{heatResult.fuelEquivalents.electricKwhPerHour} kWh/hr</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={syncHeatToCost}
                  className="w-full text-xs font-semibold h-7 text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer no-print"
                >
                  Estimate Running Cost for {heatResult.totalHeatingBtu.toLocaleString()} BTU ↓
                </Button>

                <ResultActionToolbar
                  onCopyResult={copyHeatResult}
                  onCopySummary={copyHeatSummary}
                  onCopyLatex={copyHeatLatex}
                  onExportCsv={exportHeatCsv}
                  feedback={heatFeedback}
                />
              </div>
            ) : (
              <div className="text-xs text-zinc-500 text-center py-8">
                Click Calculate to view required heating BTUs.
              </div>
            )}
          </div>
        </div>
        <SavedEstimatesDrawer
          {...heatSaved}
          cardTitle="Heating"
          formatSummary={(r) => `${r.totalHeatingBtu.toLocaleString()} BTU/hr (${r.heatingKw} kW)`}
          onRestore={restoreHeat}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: ENERGY COST & SEER SIZING ═══════════════════ */}
      <CardWrapper
        title="Energy Cost & SEER Efficiency Calculator"
        hasResult={!!costResult}
        isSaved={costSaveSuccess}
        savedCount={costSaved.saved.length}
        onToggleSaved={() => costSaved.setIsOpen(!costSaved.isOpen)}
        onSave={() => {
          if (!costResult) return;
          const raw: CostRawInputs = {
            btu: costBtu,
            seer: costSeer,
            hours: costHours,
            rate: costRate,
          };
          costSaved.save(
            `${costBtu} BTU, SEER ${costSeer}, ${costHours}h/day @ $${costRate}/kWh`,
            costResult,
            raw
          );
          flashSave(setCostSaveSuccess);
        }}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="space-y-1">
              <label htmlFor="cost-btu-rating" className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                Appliance BTU Rating
              </label>
              <Input
                id="cost-btu-rating"
                type="number"
                value={costBtu}
                onChange={(e) => setCostBtu(e.target.value)}
                min={1000}
                step={1000}
                className={`h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 ${
                  costFieldErrors.btu ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
              />
              {costFieldErrors.btu && (
                <div role="alert" className="text-[10px] text-red-600 dark:text-red-400 font-medium">
                  {costFieldErrors.btu}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="cost-seer-rating" className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                SEER / EER Rating
              </label>
              <select
                id="cost-seer-rating"
                value={costSeer}
                onChange={(e) => setCostSeer(e.target.value)}
                aria-label="SEER / EER Rating"
                className="w-full h-8 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 font-medium text-zinc-700 dark:text-zinc-300"
              >
                <option value="10">SEER 10 (Older Standard)</option>
                <option value="14">SEER 14 (Previous Code Min)</option>
                <option value="16">SEER 16 (Energy Star Standard)</option>
                <option value="18">SEER 18 (High Efficiency)</option>
                <option value="20">SEER 20 (Premium Inverter)</option>
                <option value="24">SEER 24 (Ultra High Inverter)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="cost-daily-hours" className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                Daily Running Hours
              </label>
              <Input
                id="cost-daily-hours"
                type="number"
                value={costHours}
                onChange={(e) => setCostHours(e.target.value)}
                min={0}
                max={24}
                step={0.5}
                className={`h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 ${
                  costFieldErrors.hours ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
              />
              {costFieldErrors.hours && (
                <div role="alert" className="text-[10px] text-red-600 dark:text-red-400 font-medium">
                  {costFieldErrors.hours}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="cost-electric-rate" className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                Electric Rate ($ / kWh)
              </label>
              <Input
                id="cost-electric-rate"
                type="number"
                value={costRate}
                onChange={(e) => setCostRate(e.target.value)}
                min={0}
                step={0.01}
                className={`h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 ${
                  costFieldErrors.rate ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
              />
              {costFieldErrors.rate && (
                <div role="alert" className="text-[10px] text-red-600 dark:text-red-400 font-medium">
                  {costFieldErrors.rate}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 no-print">
            <Button onClick={handleCostCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
              Recalculate Cost
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCostBtu("18000");
                setCostSeer("16");
                setCostHours("8");
                setCostRate("0.16");
                setCostError(null);
                setCostFieldErrors({});
              }}
              className="text-xs font-semibold h-8 px-3 cursor-pointer"
            >
              Reset
            </Button>
          </div>

          {costError ? (
            <div role="alert" className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Validation Alert</div>
                <div>{costError}</div>
              </div>
            </div>
          ) : costResult ? (
            <div className="space-y-3">
              {/* Cost Metric Cards */}
              <div aria-live="polite" className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Daily Cost</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    ${costResult.dailyCost.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">({costResult.kilowatts} kW × {costHours}h)</span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Monthly Cost</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    ${costResult.monthlyCost.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">~30 days</span>
                </div>
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded border border-blue-200 dark:border-blue-800/60">
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-bold">Annual Cost</span>
                  <span className="text-base font-black text-blue-900 dark:text-blue-100 font-sans tabular-nums">
                    ${costResult.annualCost.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block">365 days</span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Carbon Footprint</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {costResult.co2KgPerYear.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">kg CO₂ / year</span>
                </div>
              </div>

              {/* SEER Efficiency Comparison Chart */}
              <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-500" /> Annual Operating Cost vs SEER Rating
                  </h4>
                  <span className="text-[10px] text-zinc-400">Blue bar = Your Selection</span>
                </div>
                <div className="h-44 w-full" role="img" aria-label="Annual operating cost comparison chart across SEER ratings">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costResult.seerComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="seer" tickFormatter={(v) => `SEER ${v}`} tick={{ fontSize: 10 }} />
                      <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 10 }} />
                      <Tooltip
                        formatter={(value: any) => [`$${Number(value).toFixed(2)}/yr`, "Annual Cost"]}
                        labelFormatter={(label) => `SEER ${label} Rating`}
                        contentStyle={{ fontSize: "11px", borderRadius: "8px" }}
                      />
                      <Bar dataKey="annualCost" radius={[4, 4, 0, 0]}>
                        {costResult.seerComparison.map((entry) => (
                          <Cell
                            key={entry.seer}
                            fill={entry.seer === Number(costSeer) ? "#2563eb" : "#94a3b8"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 text-center text-[10px] text-zinc-500 dark:text-zinc-400">
                  {costResult.seerComparison.map((s) => (
                    <div key={s.seer} className={s.seer === Number(costSeer) ? "font-bold text-blue-600 dark:text-blue-400" : ""}>
                      <div>SEER {s.seer}</div>
                      <div>${s.annualCost.toFixed(0)}/yr</div>
                    </div>
                  ))}
                </div>
              </div>

              <ResultActionToolbar
                onCopyResult={copyCostResult}
                onCopySummary={copyCostSummary}
                onCopyLatex={copyCostLatex}
                onExportCsv={exportCostCsv}
                feedback={costFeedback}
              />
            </div>
          ) : null}
        </div>
        <SavedEstimatesDrawer
          {...costSaved}
          cardTitle="Energy Cost"
          formatSummary={(r) => `$${r.annualCost.toFixed(0)}/yr (${r.watts}W)`}
          onRestore={restoreCost}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1 no-print">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Full Report
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
