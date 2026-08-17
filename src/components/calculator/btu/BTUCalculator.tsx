"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Download,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Zap,
  TrendingDown,
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
} from "@/lib/calculator-engine/formulas/btu";

// ─── Shared Types & Helpers ──────────────────────────────────────────────────

interface SavedBtuEstimate<T> {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: T;
  notes: string;
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

function useCardSaved<T>(storageKey: string) {
  const [saved, setSaved] = useState<SavedBtuEstimate<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: T, notes = "") => {
      const entry: SavedBtuEstimate<T> = {
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

function InputRow({
  label,
  value,
  onChange,
  unit,
  onUnitChange,
  unitOptions,
  min = 0,
  step = 0.5,
  showUnit = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  onUnitChange?: (u: any) => void;
  unitOptions?: { value: string; label: string }[];
  min?: number;
  step?: number;
  showUnit?: boolean;
}) {
  return (
    <div className="grid grid-cols-12 gap-2 items-center text-xs">
      <label className="col-span-5 font-medium text-zinc-700 dark:text-zinc-300 truncate">
        {label}
      </label>
      <div className={showUnit && unitOptions ? "col-span-4" : "col-span-7"}>
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          step={step}
          className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
        />
      </div>
      {showUnit && unitOptions && onUnitChange && (
        <div className="col-span-3">
          <select
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
  );
}

function SelectRow({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: any) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-12 gap-2 items-center text-xs">
      <label className="col-span-5 font-medium text-zinc-700 dark:text-zinc-300 truncate">
        {label}
      </label>
      <div className="col-span-7">
        <select
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

function SavedEstimatesDrawer<T>({
  saved,
  isOpen,
  setIsOpen,
  remove,
  clear,
  cardTitle,
  formatSummary,
}: {
  saved: SavedBtuEstimate<T>[];
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
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
    a.download = `btu_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_estimates.csv`;
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
  const [acSaveSuccess, setAcSaveSuccess] = useState(false);
  const acSaved = useCardSaved<AcCoolingResult>("saved_btu_ac");

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
  const [heatSaveSuccess, setHeatSaveSuccess] = useState(false);
  const heatSaved = useCardSaved<HeatingBtuResult>("saved_btu_heat");

  // ─── Card 3: Energy Cost State ───
  const [costBtu, setCostBtu] = useState("18000");
  const [costSeer, setCostSeer] = useState("16");
  const [costHours, setCostHours] = useState("8");
  const [costRate, setCostRate] = useState("0.16");
  const [costResult, setCostResult] = useState<EnergyCostResult | null>(null);
  const [costSaveSuccess, setCostSaveSuccess] = useState(false);
  const costSaved = useCardSaved<EnergyCostResult>("saved_btu_cost");

  // ─── Global Report Modal State ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // ─── Handlers ───

  const handleAcCalc = useCallback(() => {
    const l = Number(acLength) || 0;
    const w = Number(acWidth) || 0;
    const directArea = Number(acArea) || 0;
    const res = calculateAcCoolingBtu({
      length: acInputMode === "dimensions" ? l : undefined,
      width: acInputMode === "dimensions" ? w : undefined,
      areaSqFt: acInputMode === "area" ? (acAreaUnit === "sq_meters" ? directArea * 10.7639 : directArea) : undefined,
      dimensionUnit: acDimUnit,
      ceilingHeight: Number(acCeiling) || 8,
      ceilingHeightUnit: acCeilingUnit,
      occupants: Number(acOccupants) || 0,
      roomType: acRoomType,
      insulation: acInsulation,
      sunExposure: acSunExposure,
      climateZone: acClimateZone,
      quantity: Number(acQuantity) || 1,
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
    const res = calculateHeatingBtu({
      length: Number(heatLength) || 0,
      width: Number(heatWidth) || 0,
      height: Number(heatHeight) || 0,
      dimensionUnit: heatDimUnit,
      desiredIndoorTemp: Number(heatIndoorTemp) || 70,
      outdoorLowTemp: Number(heatOutdoorTemp) || 0,
      tempUnit: heatTempUnit,
      insulationCondition: heatInsulation,
      altitudeFeet: Number(heatAltitude) || 0,
      quantity: Number(heatQuantity) || 1,
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
    const res = calculateEnergyCostAndSizing({
      btuRating: Number(costBtu) || 12000,
      seerRating: Number(costSeer) || 14,
      dailyHours: Number(costHours) || 8,
      electricityRatePerKwh: Number(costRate) || 0.15,
    });
    setCostResult(res);
  }, [costBtu, costSeer, costHours, costRate]);

  // Run initial calculations on mount
  useEffect(() => {
    handleAcCalc();
    handleHeatCalc();
    handleCostCalc();
  }, [handleAcCalc, handleHeatCalc, handleCostCalc]);

  // Sync Card 1 result into Card 3 BTU rating
  const syncAcToCost = () => {
    if (acResult) {
      setCostBtu(String(acResult.totalBtuPerHour));
      setTimeout(handleCostCalc, 50);
    }
  };

  // Sync Card 2 result into Card 3 BTU rating
  const syncHeatToCost = () => {
    if (heatResult) {
      setCostBtu(String(heatResult.totalHeatingBtu));
      setTimeout(handleCostCalc, 50);
    }
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
          acSaved.save(
            `${acInputMode === "dimensions" ? `${acLength}×${acWidth} ${acDimUnit}` : `${acArea} ${acAreaUnit}`}, ${acOccupants} occ, ${acRoomType}`,
            acResult,
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
                <InputRow label="Room Length" value={acLength} onChange={setAcLength} unit={acDimUnit} onUnitChange={setAcDimUnit} unitOptions={LENGTH_UNITS} />
                <InputRow label="Room Width" value={acWidth} onChange={setAcWidth} unit={acDimUnit} onUnitChange={setAcDimUnit} unitOptions={LENGTH_UNITS} />
              </>
            ) : (
              <InputRow label="Total Floor Area" value={acArea} onChange={setAcArea} unit={acAreaUnit} onUnitChange={setAcAreaUnit} unitOptions={AREA_UNITS} />
            )}

            <InputRow label="Ceiling Height" value={acCeiling} onChange={setAcCeiling} unit={acCeilingUnit} onUnitChange={setAcCeilingUnit} unitOptions={LENGTH_UNITS} />
            <InputRow label="Number of People" value={acOccupants} onChange={setAcOccupants} min={0} step={1} showUnit={false} />

            <SelectRow
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
              label="Climate Zone"
              value={acClimateZone}
              onChange={setAcClimateZone}
              options={[
                { value: "cool", label: "Cool / Temperate (Northern)" },
                { value: "average", label: "Average / Moderate (Mid-Atlantic)" },
                { value: "hot_humid", label: "Hot & Humid (Southern / Tropical +15%)" },
              ]}
            />

            <InputRow label="Number of Rooms" value={acQuantity} onChange={setAcQuantity} min={1} step={1} showUnit={false} />

            <div className="flex gap-2 pt-1">
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
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="flex flex-col justify-between">
            {acResult ? (
              <div className="space-y-2.5">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
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
                  className="w-full text-xs font-semibold h-7 text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
                >
                  Estimate Electric Running Cost for {acResult.totalBtuPerHour.toLocaleString()} BTU ↓
                </Button>
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
          heatSaved.save(
            `${heatLength}×${heatWidth}×${heatHeight} ${heatDimUnit}, ΔT: ${heatResult.deltaTempF}°F, ${heatInsulation}`,
            heatResult,
          );
          flashSave(setHeatSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow label="Building Length" value={heatLength} onChange={setHeatLength} unit={heatDimUnit} onUnitChange={setHeatDimUnit} unitOptions={LENGTH_UNITS} />
            <InputRow label="Building Width" value={heatWidth} onChange={setHeatWidth} unit={heatDimUnit} onUnitChange={setHeatDimUnit} unitOptions={LENGTH_UNITS} />
            <InputRow label="Ceiling Height" value={heatHeight} onChange={setHeatHeight} unit={heatDimUnit} onUnitChange={setHeatDimUnit} unitOptions={LENGTH_UNITS} />
            <InputRow label="Desired Indoor Temp" value={heatIndoorTemp} onChange={setHeatIndoorTemp} unit={heatTempUnit} onUnitChange={setHeatTempUnit} unitOptions={TEMP_UNITS} min={40} />
            <InputRow label="Lowest Outdoor Temp" value={heatOutdoorTemp} onChange={setHeatOutdoorTemp} unit={heatTempUnit} onUnitChange={setHeatTempUnit} unitOptions={TEMP_UNITS} min={-40} />

            <SelectRow
              label="Insulation Condition"
              value={heatInsulation}
              onChange={setHeatInsulation}
              options={[
                { value: "poor_drafty", label: "Poor / Drafty (Older home, single pane)" },
                { value: "average_standard", label: "Average / Standard (Double pane, R-13)" },
                { value: "tight_efficient", label: "Tight / Modern (Spray foam, R-21+)" },
              ]}
            />

            <InputRow label="Altitude (feet > 2000)" value={heatAltitude} onChange={setHeatAltitude} min={0} step={500} showUnit={false} />
            <InputRow label="Number of Zones" value={heatQuantity} onChange={setHeatQuantity} min={1} step={1} showUnit={false} />

            <div className="flex gap-2 pt-1">
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
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Heating Results Summary */}
          <div className="flex flex-col justify-between">
            {heatResult ? (
              <div className="space-y-2.5">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
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
                  className="w-full text-xs font-semibold h-7 text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
                >
                  Estimate Running Cost for {heatResult.totalHeatingBtu.toLocaleString()} BTU ↓
                </Button>
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
          costSaved.save(
            `${costBtu} BTU, SEER ${costSeer}, ${costHours}h/day @ $${costRate}/kWh`,
            costResult,
          );
          flashSave(setCostSaveSuccess);
        }}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Appliance BTU Rating</label>
              <Input
                type="number"
                value={costBtu}
                onChange={(e) => setCostBtu(e.target.value)}
                min={1000}
                step={1000}
                className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">SEER / EER Rating</label>
              <select
                value={costSeer}
                onChange={(e) => setCostSeer(e.target.value)}
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
              <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Daily Running Hours</label>
              <Input
                type="number"
                value={costHours}
                onChange={(e) => setCostHours(e.target.value)}
                min={0.5}
                max={24}
                step={0.5}
                className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Electric Rate ($ / kWh)</label>
              <Input
                type="number"
                value={costRate}
                onChange={(e) => setCostRate(e.target.value)}
                min={0.01}
                step={0.01}
                className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>
          </div>

          <div className="flex gap-2">
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
              }}
              className="text-xs font-semibold h-8 px-3 cursor-pointer"
            >
              Reset
            </Button>
          </div>

          {costResult && (
            <div className="space-y-3">
              {/* Cost Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
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
                <div className="h-44 w-full">
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
            </div>
          )}
        </div>
        <SavedEstimatesDrawer
          {...costSaved}
          cardTitle="Energy Cost"
          formatSummary={(r) => `$${r.annualCost.toFixed(0)}/yr (${r.watts}W)`}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1">
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
