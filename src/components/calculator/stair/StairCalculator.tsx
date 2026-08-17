"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Download,
  Trash2,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  StairLinearUnit,
  MountType,
  StairCalculationResult,
  StairHeadroomResult,
  StairMaterialResult,
  calculateBasicStair,
  calculateComprehensiveStair,
  calculateHeadroomOpening,
  calculateStairMaterials,
} from "@/lib/calculator-engine/formulas/stair";

// ─── Types & Local Storage Hook ─────────────────────────────────────────────

interface SavedStairEstimate<T> {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: T;
  notes: string;
}

const LINEAR_UNITS: { value: StairLinearUnit; label: string }[] = [
  { value: "inches", label: "inches" },
  { value: "feet", label: "feet" },
  { value: "centimeters", label: "cm" },
  { value: "meters", label: "meters" },
];

function flashSave(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
}

function useCardSaved<T>(storageKey: string) {
  const [saved, setSaved] = useState<SavedStairEstimate<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: T, notes = "") => {
      const entry: SavedStairEstimate<T> = {
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

function InputRow({
  label,
  value,
  onChange,
  unit,
  onUnitChange,
  unitOptions = LINEAR_UNITS,
  min = 0,
  max,
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
  max?: number;
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
          max={max}
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

function SavedEstimatesDrawer<T>({
  saved,
  isOpen,
  remove,
  clear,
  cardTitle,
  formatSummary,
}: {
  saved: SavedStairEstimate<T>[];
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
    a.download = `stair_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_estimates.csv`;
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

// ─── 2D SVG Scaled Diagrams ─────────────────────────────────────────────────

function StairDiagram2D({
  res,
  mountType = "standard",
  showHeadroom = false,
  floorThickness = 10,
  headroomInches = 80,
  openingLength = 120,
}: {
  res: StairCalculationResult;
  mountType?: MountType;
  showHeadroom?: boolean;
  floorThickness?: number;
  headroomInches?: number;
  openingLength?: number;
}) {
  return (
    <svg
      viewBox="0 0 280 200"
      className="w-full max-w-[270px] mx-auto select-none"
      aria-label="Staircase 2D Scaled Engineering Diagram"
    >
      <defs>
        <marker id="stair-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M1,0.5 L5,3 L1,5.5 Z" fill="#27272a" className="dark:fill-zinc-300" />
        </marker>
        <marker id="stair-arr-l" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M5,0.5 L1,3 L5,5.5 Z" fill="#27272a" className="dark:fill-zinc-300" />
        </marker>
        <marker id="blue-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M1,0.5 L5,3 L1,5.5 Z" fill="#2563eb" />
        </marker>
        <marker id="blue-arr-l" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M5,0.5 L1,3 L5,5.5 Z" fill="#2563eb" />
        </marker>
      </defs>

      {/* Background Floor Lines */}
      {/* Lower landing */}
      <line x1="10" y1="165" x2="220" y2="165" stroke="#71717a" strokeWidth="1" strokeDasharray="3 3" />
      {/* Upper floor level */}
      <line x1="150" y1="45" x2="260" y2="45" stroke="#71717a" strokeWidth="1" strokeDasharray="3 3" />

      {/* Stringer (Carriage) Diagonal Body - Green Tinted */}
      <polygon
        points="35,165 65,165 225,55 225,45 195,45 35,155"
        fill="#84cc16"
        fillOpacity="0.75"
        stroke="#4d7c0f"
        strokeWidth="1.2"
      />

      {/* Stepped Treads and Risers Path */}
      {/* 5 representative steps */}
      <path
        d="M 35,165 L 35,142 L 67,142 L 67,118 L 99,118 L 99,94 L 131,94 L 131,70 L 163,70 L 163,45 L 195,45"
        fill="none"
        stroke="#18181b"
        strokeWidth="2"
        className="dark:stroke-zinc-100"
      />

      {/* Stringer length label on diagonal */}
      <text
        x="130"
        y="118"
        textAnchor="middle"
        transform="rotate(-36 130 118)"
        className="text-[8.5px] fill-lime-950 dark:fill-lime-200 font-bold"
      >
        stringer length
      </text>

      {/* Run label and horizontal dimension */}
      <line x1="99" y1="88" x2="131" y2="88" stroke="#18181b" strokeWidth="0.9" markerStart="url(#stair-arr-l)" markerEnd="url(#stair-arr)" className="dark:stroke-zinc-300" />
      <text x="115" y="84" textAnchor="middle" className="text-[8px] fill-zinc-800 dark:fill-zinc-200 font-medium">run</text>

      {/* Rise label and vertical dimension */}
      <line x1="137" y1="94" x2="137" y2="70" stroke="#18181b" strokeWidth="0.9" markerStart="url(#stair-arr-l)" markerEnd="url(#stair-arr)" className="dark:stroke-zinc-300" />
      <text x="141" y="84" textAnchor="start" className="text-[8px] fill-zinc-800 dark:fill-zinc-200 font-medium">rise</text>

      {/* Angle Arc */}
      <path d="M 60,165 A 25,25 0 0,0 52,152" fill="none" stroke="#2563eb" strokeWidth="1.2" />
      <text x="65" y="160" textAnchor="start" className="text-[8.5px] fill-blue-700 dark:fill-blue-400 font-semibold">angle</text>

      {/* Total Rise Dimension Line on Left */}
      <line x1="22" y1="165" x2="22" y2="45" stroke="#18181b" strokeWidth="1" markerStart="url(#stair-arr-l)" markerEnd="url(#stair-arr)" className="dark:stroke-zinc-300" />
      <line x1="15" y1="165" x2="28" y2="165" stroke="#18181b" strokeWidth="0.8" className="dark:stroke-zinc-300" />
      <line x1="15" y1="45" x2="28" y2="45" stroke="#18181b" strokeWidth="0.8" className="dark:stroke-zinc-300" />
      <text x="18" y="105" textAnchor="middle" transform="rotate(-90 18 105)" className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-bold">
        total rise
      </text>

      {/* Total Run Dimension Line on Bottom */}
      <line x1="35" y1="180" x2="195" y2="180" stroke="#18181b" strokeWidth="1" markerStart="url(#stair-arr-l)" markerEnd="url(#stair-arr)" className="dark:stroke-zinc-300" />
      <line x1="35" y1="173" x2="35" y2="186" stroke="#18181b" strokeWidth="0.8" className="dark:stroke-zinc-300" />
      <line x1="195" y1="173" x2="195" y2="186" stroke="#18181b" strokeWidth="0.8" className="dark:stroke-zinc-300" />
      <text x="115" y="192" textAnchor="middle" className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-bold">
        total run
      </text>

      {/* Stringer Height on Right */}
      <line x1="235" y1="165" x2="235" y2="45" stroke="#18181b" strokeWidth="1" markerStart="url(#stair-arr-l)" markerEnd="url(#stair-arr)" className="dark:stroke-zinc-300" />
      <text x="248" y="105" textAnchor="middle" transform="rotate(90 248 105)" className="text-[8px] fill-zinc-600 dark:fill-zinc-400 font-medium">
        stringer height
      </text>

      {/* Headroom Opening Overlays if enabled */}
      {showHeadroom && (
        <>
          {/* Ceiling Header / Joist */}
          <rect x="100" y="25" width="95" height="20" fill="#94a3b8" fillOpacity="0.4" stroke="#64748b" strokeWidth="1" />
          <text x="145" y="38" textAnchor="middle" className="text-[7.5px] fill-slate-700 dark:fill-slate-300 font-semibold">
            floor thickness
          </text>

          {/* Vertical Headroom Line */}
          <line x1="100" y1="45" x2="100" y2="118" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="2 2" markerEnd="url(#blue-arr)" markerStart="url(#blue-arr-l)" />
          <text x="96" y="85" textAnchor="end" className="text-[8px] fill-blue-600 dark:fill-blue-400 font-bold">
            headroom
          </text>

          {/* Floor Opening */}
          <line x1="100" y1="18" x2="195" y2="18" stroke="#2563eb" strokeWidth="1" markerEnd="url(#blue-arr)" markerStart="url(#blue-arr-l)" />
          <text x="147" y="14" textAnchor="middle" className="text-[8px] fill-blue-600 dark:fill-blue-400 font-bold">
            floor opening
          </text>
        </>
      )}
    </svg>
  );
}

// ─── Fraction to Decimal Reference Table ────────────────────────────────────

function FractionTable() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 bg-slate-50/50 dark:bg-zinc-900/50 text-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between font-bold text-zinc-700 dark:text-zinc-300 text-[11px] cursor-pointer"
      >
        <span className="flex items-center gap-1">
          <Info className="w-3 h-3 text-blue-500" /> Fraction to Decimal Reference Table
        </span>
        <span className="text-blue-600 dark:text-blue-400 text-[10px]">{isOpen ? "Hide" : "Show"}</span>
      </button>

      {isOpen && (
        <div className="mt-2 grid grid-cols-4 gap-1 text-center text-[10px] font-sans tabular-nums">
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">1/16" = 0.0625"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">1/8" = 0.1250"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">3/16" = 0.1875"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">1/4" = 0.2500"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">5/16" = 0.3125"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">3/8" = 0.3750"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">7/16" = 0.4375"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">1/2" = 0.5000"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">9/16" = 0.5625"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">5/8" = 0.6250"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">11/16" = 0.6875"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">3/4" = 0.7500"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">13/16" = 0.8125"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">7/8" = 0.8750"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">15/16" = 0.9375"</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">1" = 1.0000"</div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN STAIR CALCULATOR SUITE ────────────────────────────────────────────

export function StairCalculator() {
  // ─── CARD 1: STRAIGHT RUN STAIRS ───
  const [stairTab, setStairTab] = useState<"basic" | "comprehensive">("comprehensive");
  const [runMode, setRunMode] = useState<"one_run" | "total_run">("one_run");
  const [runValue, setRunValue] = useState("10");
  const [runUnit, setRunUnit] = useState<StairLinearUnit>("inches");
  const [totalRise, setTotalRise] = useState("10");
  const [riseUnit, setRiseUnit] = useState<StairLinearUnit>("feet");

  // Comprehensive options
  const [riseMode, setRiseMode] = useState<"fixed_rise" | "fixed_steps">("fixed_rise");
  const [targetRiserHeight, setTargetRiserHeight] = useState("7.5");
  const [fixedStepsCount, setFixedStepsCount] = useState("14");
  const [hasTread, setHasTread] = useState(true);
  const [treadThickness, setTreadThickness] = useState("1.0");
  const [nosingLength, setNosingLength] = useState("0.75");
  const [mountType, setMountType] = useState<MountType>("standard");

  const [stairResult, setStairResult] = useState<StairCalculationResult | null>(null);
  const [stairSaveSuccess, setStairSaveSuccess] = useState(false);
  const stairSaved = useCardSaved<StairCalculationResult>("saved_stair_geometry");

  // ─── CARD 2: HEADROOM & OPENING ───
  const [floorThickness, setFloorThickness] = useState("10");
  const [targetHeadroom, setTargetHeadroom] = useState("80");
  const [openingLength, setOpeningLength] = useState("120");
  const [headroomResult, setHeadroomResult] = useState<StairHeadroomResult | null>(null);
  const [headroomSaveSuccess, setHeadroomSaveSuccess] = useState(false);
  const headroomSaved = useCardSaved<StairHeadroomResult>("saved_stair_headroom");

  // ─── CARD 3: MATERIALS ESTIMATOR ───
  const [stairWidth, setStairWidth] = useState("36");
  const [stringerSize, setStringerSize] = useState<"2x10" | "2x12">("2x12");
  const [treadMaterial, setTreadMaterial] = useState<"pine" | "oak" | "hardwood" | "composite" | "pressure_treated">("oak");
  const [riserMaterial, setRiserMaterial] = useState<"plywood" | "hardwood" | "primed_mdf" | "none">("primed_mdf");
  const [priceStringer, setPriceStringer] = useState("35");
  const [priceTread, setPriceTread] = useState("24");
  const [priceRiser, setPriceRiser] = useState("14");
  const [priceFasteners, setPriceFasteners] = useState("45");
  const [taxRate, setTaxRate] = useState("7");
  const [materialResult, setMaterialResult] = useState<StairMaterialResult | null>(null);
  const [materialSaveSuccess, setMaterialSaveSuccess] = useState(false);
  const materialSaved = useCardSaved<StairMaterialResult>("saved_stair_materials");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // ─── Handlers ───

  const handleStairCalc = useCallback(() => {
    if (stairTab === "basic") {
      const res = calculateBasicStair({
        runMode,
        runValue: Number(runValue) || 10,
        runUnit,
        totalRise: Number(totalRise) || 10,
        riseUnit,
      });
      setStairResult(res);
    } else {
      const res = calculateComprehensiveStair({
        runMode,
        runValue: Number(runValue) || 10,
        runUnit,
        totalRise: Number(totalRise) || 10,
        riseUnit,
        riseMode,
        targetRiserHeight: Number(targetRiserHeight) || 7.5,
        fixedStepsCount: Number(fixedStepsCount) || 14,
        hasTread,
        treadThickness: Number(treadThickness) || 1.0,
        nosingLength: Number(nosingLength) || 0.75,
        hasHeadroomRestriction: false,
        mountType,
      });
      setStairResult(res);
    }
  }, [
    stairTab,
    runMode,
    runValue,
    runUnit,
    totalRise,
    riseUnit,
    riseMode,
    targetRiserHeight,
    fixedStepsCount,
    hasTread,
    treadThickness,
    nosingLength,
    mountType,
  ]);

  const handleHeadroomCalc = useCallback(() => {
    if (!stairResult) return;
    const res = calculateHeadroomOpening({
      totalRiseInches: stairResult.totalRiseInches,
      totalRunInches: stairResult.totalRunInches,
      riserHeightInches: stairResult.exactRiserHeightInches,
      treadDepthInches: stairResult.exactTreadDepthInches,
      floorThicknessInches: Number(floorThickness) || 10,
      targetHeadroomInches: Number(targetHeadroom) || 80,
      stairwellOpeningInches: Number(openingLength) || 120,
    });
    setHeadroomResult(res);
  }, [stairResult, floorThickness, targetHeadroom, openingLength]);

  const handleMaterialCalc = useCallback(() => {
    if (!stairResult) return;
    const res = calculateStairMaterials({
      stairResult,
      materialInput: {
        stairWidthInches: Number(stairWidth) || 36,
        stringerLumberSize: stringerSize,
        treadMaterial,
        riserMaterial,
        pricePerStringerBoard: Number(priceStringer) || 35,
        pricePerTread: Number(priceTread) || 24,
        pricePerRiser: Number(priceRiser) || 14,
        fastenersAndBracketsCost: Number(priceFasteners) || 45,
        taxRatePercent: Number(taxRate) || 0,
      },
    });
    setMaterialResult(res);
  }, [
    stairResult,
    stairWidth,
    stringerSize,
    treadMaterial,
    riserMaterial,
    priceStringer,
    priceTread,
    priceRiser,
    priceFasteners,
    taxRate,
  ]);

  // Run calculations on initial load & when dependencies change
  useEffect(() => {
    handleStairCalc();
  }, [handleStairCalc]);

  useEffect(() => {
    if (stairResult) {
      handleHeadroomCalc();
      handleMaterialCalc();
    }
  }, [stairResult, handleHeadroomCalc, handleMaterialCalc]);

  // Report Data Compilation
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];
    if (stairResult) {
      sections.push({
        title: "Staircase Geometry & Dimensions",
        items: [
          { label: "Total Rise", value: `${stairResult.totalRiseInches}" (${stairResult.totalRiseFeet} ft)` },
          { label: "Number of Risers", value: `${stairResult.numberOfRisers}` },
          { label: "Exact Riser Height", value: `${stairResult.exactRiserHeightInches}" (${stairResult.exactRiserHeightFraction})` },
          { label: "Number of Treads", value: `${stairResult.numberOfTreads}` },
          { label: "Tread Depth (Run)", value: `${stairResult.exactTreadDepthInches}" (${stairResult.exactTreadDepthFraction})` },
          { label: "Total Run Length", value: `${stairResult.totalRunInches}" (${stairResult.totalRunFeet} ft)` },
          { label: "Incline Angle", value: `${stairResult.inclineAngleDegrees}°` },
          { label: "Stringer Cut Length", value: `${stairResult.stringerLengthInches}" (${stairResult.stringerLengthFeet} ft)` },
          { label: "Mount Configuration", value: stairResult.mountType === "standard" ? "Standard Stringer Drop" : "Flush Mount" },
          { label: "IRC Building Code Status", value: stairResult.compliance.isCompliant ? "COMPLIANT" : "NON-COMPLIANT" },
        ],
      });
    }
    if (headroomResult) {
      sections.push({
        title: "Headroom & Stairwell Opening",
        items: [
          { label: "Actual Headroom Clearance", value: `${headroomResult.actualHeadroomInches}" (${headroomResult.actualHeadroomFeet} ft)` },
          { label: "Minimum Required Opening", value: `${headroomResult.minRequiredOpeningInches}" (${headroomResult.minRequiredOpeningFeet} ft)` },
          { label: "Steps Under Ceiling", value: `${headroomResult.stepsUnderCeiling}` },
          { label: "Headroom Code Status", value: headroomResult.isCompliant ? "PASS (≥ 80\")" : "FAIL (< 80\")" },
        ],
      });
    }
    if (materialResult) {
      sections.push({
        title: "Material & Cost Breakdown",
        items: [
          { label: "Recommended Stringers", value: `${materialResult.stringersCount} boards (${materialResult.stringerBoardLengthFt}ft ${materialResult.stringerBoardSize})` },
          { label: "Tread Boards Needed", value: `${materialResult.totalTreadsCount}` },
          { label: "Riser Boards Needed", value: `${materialResult.totalRisersCount}` },
          { label: "Stringer Lumber Cost", value: `$${materialResult.stringerLumberCost}` },
          { label: "Treads Cost", value: `$${materialResult.treadsCost}` },
          { label: "Risers Cost", value: `$${materialResult.risersCost}` },
          { label: "Hardware & Brackets", value: `$${materialResult.fastenersCost}` },
          { label: "Total Estimated Cost", value: `$${materialResult.totalEstimatedCost}` },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Stair Calculator",
        reportTitle: "Staircase Engineering & Cut Sheet Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        currencySymbol: "$",
      },
      keyMetrics: [
        { label: "Number of Risers", value: stairResult ? `${stairResult.numberOfRisers}` : "—", highlight: true },
        { label: "Riser Height", value: stairResult ? `${stairResult.exactRiserHeightFraction}` : "—" },
        { label: "Total Run", value: stairResult ? `${stairResult.totalRunFeet} ft` : "—" },
        { label: "Incline Angle", value: stairResult ? `${stairResult.inclineAngleDegrees}°` : "—" },
      ],
      sections,
    };
  }, [stairResult, headroomResult, materialResult]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ CARD 1: STRAIGHT RUN STAIR CALCULATOR ═══════════════════ */}
      <CardWrapper
        title="Stair Calculator (Riser, Tread & Stringer Geometry)"
        hasResult={!!stairResult}
        isSaved={stairSaveSuccess}
        savedCount={stairSaved.saved.length}
        onToggleSaved={() => stairSaved.setIsOpen(!stairSaved.isOpen)}
        onSave={() => {
          if (!stairResult) return;
          stairSaved.save(
            `Rise: ${totalRise} ${riseUnit}, Run: ${runValue} ${runUnit}, ${stairResult.numberOfRisers} risers`,
            stairResult
          );
          flashSave(setStairSaveSuccess);
        }}
      >
        {/* Version Switcher Tabs */}
        <div className="flex gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setStairTab("basic")}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
              stairTab === "basic"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            Basic Version
          </button>
          <button
            type="button"
            onClick={() => setStairTab("comprehensive")}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              stairTab === "comprehensive"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Comprehensive Version
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Column: Inputs */}
          <div className="md:col-span-7 space-y-2.5">
            {/* Run mode selector */}
            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Run Mode:</span>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="runMode"
                  checked={runMode === "one_run"}
                  onChange={() => setRunMode("one_run")}
                  className="text-blue-600"
                />
                <span>Use One Run</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="runMode"
                  checked={runMode === "total_run"}
                  onChange={() => setRunMode("total_run")}
                  className="text-blue-600"
                />
                <span>Use Total Run</span>
              </label>
            </div>

            <InputRow
              label={runMode === "one_run" ? "Unit Run (Tread Depth)" : "Total Run"}
              value={runValue}
              onChange={setRunValue}
              unit={runUnit}
              onUnitChange={setRunUnit}
            />

            <InputRow
              label="Total Rise (Height)"
              value={totalRise}
              onChange={setTotalRise}
              unit={riseUnit}
              onUnitChange={setRiseUnit}
            />

            {/* Comprehensive Options */}
            {stairTab === "comprehensive" && (
              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                {/* Rise mode selector */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-5 font-semibold text-zinc-700 dark:text-zinc-300">Rise Method:</span>
                  <div className="col-span-7 flex items-center gap-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="riseMode"
                        checked={riseMode === "fixed_rise"}
                        onChange={() => setRiseMode("fixed_rise")}
                      />
                      <span>Target Rise</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="riseMode"
                        checked={riseMode === "fixed_steps"}
                        onChange={() => setRiseMode("fixed_steps")}
                      />
                      <span>Fixed Steps</span>
                    </label>
                  </div>
                </div>

                {riseMode === "fixed_rise" ? (
                  <InputRow
                    label="Target Step Height"
                    value={targetRiserHeight}
                    onChange={setTargetRiserHeight}
                    min={4}
                    max={11}
                    step={0.125}
                    showUnit={false}
                  />
                ) : (
                  <InputRow
                    label="Fixed Number of Steps"
                    value={fixedStepsCount}
                    onChange={setFixedStepsCount}
                    min={1}
                    max={50}
                    step={1}
                    showUnit={false}
                  />
                )}

                {/* Tread Thickness & Nosing */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-5 font-semibold text-zinc-700 dark:text-zinc-300">Tread Overhang:</span>
                  <div className="col-span-7 flex items-center gap-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="hasTread"
                        checked={hasTread}
                        onChange={() => setHasTread(true)}
                      />
                      <span>Has Tread / Nosing</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="hasTread"
                        checked={!hasTread}
                        onChange={() => setHasTread(false)}
                      />
                      <span>No Tread (Bare)</span>
                    </label>
                  </div>
                </div>

                {hasTread && (
                  <div className="grid grid-cols-2 gap-2 pl-2 border-l-2 border-blue-500">
                    <InputRow
                      label="Tread Thickness"
                      value={treadThickness}
                      onChange={setTreadThickness}
                      min={0}
                      step={0.125}
                      showUnit={false}
                    />
                    <InputRow
                      label="Nosing Length"
                      value={nosingLength}
                      onChange={setNosingLength}
                      min={0}
                      step={0.125}
                      showUnit={false}
                    />
                  </div>
                )}

                {/* Mount type */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-5 font-semibold text-zinc-700 dark:text-zinc-300">Stringer Mount:</span>
                  <div className="col-span-7 flex items-center gap-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="mountType"
                        checked={mountType === "standard"}
                        onChange={() => setMountType("standard")}
                      />
                      <span>Standard Drop</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="mountType"
                        checked={mountType === "flush"}
                        onChange={() => setMountType("flush")}
                      />
                      <span>Flush Top Mount</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleStairCalc}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
              >
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setRunValue("10");
                  setTotalRise("10");
                  setTargetRiserHeight("7.5");
                  setFixedStepsCount("14");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>

            <FractionTable />
          </div>

          {/* Right Column: 2D Scaled Engineering Diagram */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
            {stairResult ? (
              <StairDiagram2D res={stairResult} mountType={mountType} />
            ) : (
              <div className="text-zinc-400 text-xs py-8">Click Calculate to generate diagram</div>
            )}
          </div>
        </div>

        {/* Results Display */}
        {stairResult && (
          <div className="space-y-3 pt-2">
            {/* Building Code Compliance Banner */}
            <div
              className={`p-2.5 rounded-lg flex items-start gap-2 text-xs font-medium border ${
                stairResult.compliance.isCompliant
                  ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                  : "bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800"
              }`}
            >
              {stairResult.compliance.isCompliant ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <span className="font-bold uppercase tracking-wider block">
                  {stairResult.compliance.isCompliant
                    ? "IRC / IBC Building Code Compliant"
                    : "Building Code Compliance Warning"}
                </span>
                {stairResult.compliance.messages.length > 0 ? (
                  <ul className="list-disc list-inside text-[11px] space-y-0.5 text-zinc-700 dark:text-zinc-300">
                    {stairResult.compliance.messages.map((msg, i) => (
                      <li key={i}>{msg}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-[11px]">
                    Riser height ($\le 7.75"$), tread depth ($\ge 10"$), and incline angle ($30°–37°$) satisfy residential safety codes.
                  </span>
                )}
              </div>
            </div>

            {/* Compact Metric Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Number of Risers</span>
                <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {stairResult.numberOfRisers}
                </span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300 block">steps</span>
              </div>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Exact Riser Height</span>
                <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {stairResult.exactRiserHeightFraction}
                </span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300 block">({stairResult.exactRiserHeightInches}")</span>
              </div>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Total Run Length</span>
                <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {stairResult.totalRunFeet} <span className="text-xs font-normal">ft</span>
                </span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300 block">({stairResult.totalRunInches}")</span>
              </div>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Incline Angle</span>
                <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {stairResult.inclineAngleDegrees}°
                </span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300 block">Stringer: {stairResult.stringerLengthFeet} ft</span>
              </div>
            </div>

            {/* Detailed Cut Specifications */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs space-y-1.5 font-sans tabular-nums">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 block text-[11px]">
                Carpentry Cut Specifications:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-zinc-600 dark:text-zinc-300 text-[11px]">
                <div>• Number of Treads: <strong>{stairResult.numberOfTreads}</strong></div>
                <div>• Unit Tread Run: <strong>{stairResult.exactTreadDepthFraction}</strong> ({stairResult.exactTreadDepthInches}")</div>
                <div>• Effective Tread Width: <strong>{stairResult.effectiveTreadSurfaceInches}"</strong> (incl. nosing)</div>
                <div>• Stringer Cut Length: <strong>{stairResult.stringerLengthInches}"</strong> ({stairResult.stringerLengthFeet} ft)</div>
                <div>• Blondel Comfort (2R+T): <strong>{stairResult.compliance.blondelValue.toFixed(1)}"</strong> (Ideal: 24"–25")</div>
                <div>• Bottom Stringer Cut: <strong>Minus {stairResult.treadThicknessInches}"</strong> (for tread thickness)</div>
              </div>
            </div>
          </div>
        )}

        <SavedEstimatesDrawer
          {...stairSaved}
          cardTitle="Stair Geometry"
          formatSummary={(r) => `${r.numberOfRisers} risers @ ${r.exactRiserHeightFraction}, Angle: ${r.inclineAngleDegrees}°`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: HEADROOM & OPENING CALCULATOR ═══════════════════ */}
      <CardWrapper
        title="Staircase Headroom &amp; Opening Calculator"
        hasResult={!!headroomResult}
        isSaved={headroomSaveSuccess}
        savedCount={headroomSaved.saved.length}
        onToggleSaved={() => headroomSaved.setIsOpen(!headroomSaved.isOpen)}
        onSave={() => {
          if (!headroomResult) return;
          headroomSaved.save(
            `Opening: ${openingLength}", Headroom: ${headroomResult.actualHeadroomInches}"`,
            headroomResult
          );
          flashSave(setHeadroomSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-7 space-y-2.5">
            <InputRow
              label="Upper Floor / Joist Thickness"
              value={floorThickness}
              onChange={setFloorThickness}
              min={4}
              step={0.5}
              unit="inches"
              showUnit={false}
            />
            <InputRow
              label="Target Headroom Clearance"
              value={targetHeadroom}
              onChange={setTargetHeadroom}
              min={60}
              step={1}
              unit="inches"
              showUnit={false}
            />
            <InputRow
              label="Stairwell Opening Length"
              value={openingLength}
              onChange={setOpeningLength}
              min={30}
              step={1}
              unit="inches"
              showUnit={false}
            />

            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleHeadroomCalc}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
              >
                Calculate Headroom
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFloorThickness("10");
                  setTargetHeadroom("80");
                  setOpeningLength("120");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
            {stairResult && (
              <StairDiagram2D
                res={stairResult}
                showHeadroom={true}
                floorThickness={Number(floorThickness) || 10}
                headroomInches={Number(targetHeadroom) || 80}
                openingLength={Number(openingLength) || 120}
              />
            )}
          </div>
        </div>

        {headroomResult && (
          <div className="space-y-2.5 pt-2">
            <div
              className={`p-2.5 rounded-lg flex items-center gap-2 text-xs font-medium border ${
                headroomResult.isCompliant
                  ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                  : "bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200 border-red-300 dark:border-red-800"
              }`}
            >
              {headroomResult.isCompliant ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>
                {headroomResult.isCompliant
                  ? `Headroom (${headroomResult.actualHeadroomInches}") satisfies IRC Section R311.7.2 minimum clearance (≥ 80" / 6'8").`
                  : `Headroom clearance (${headroomResult.actualHeadroomInches}") is NON-COMPLIANT! Enlarge stairwell opening to at least ${headroomResult.minRequiredOpeningInches}".`}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-center">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">Actual Headroom</span>
                <span className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                  {headroomResult.actualHeadroomInches}" ({headroomResult.actualHeadroomFeet} ft)
                </span>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">Min Required Opening</span>
                <span className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                  {headroomResult.minRequiredOpeningInches}" ({headroomResult.minRequiredOpeningFeet} ft)
                </span>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">Steps Under Ceiling</span>
                <span className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                  {headroomResult.stepsUnderCeiling} steps
                </span>
              </div>
            </div>
          </div>
        )}

        <SavedEstimatesDrawer
          {...headroomSaved}
          cardTitle="Headroom"
          formatSummary={(r) => `Opening: ${r.openingLengthInches}", Headroom: ${r.actualHeadroomInches}"`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: MATERIAL & COST ESTIMATOR ═══════════════════ */}
      <CardWrapper
        title="Stair Material &amp; Lumber Cost Estimator"
        hasResult={!!materialResult}
        isSaved={materialSaveSuccess}
        savedCount={materialSaved.saved.length}
        onToggleSaved={() => materialSaved.setIsOpen(!materialSaved.isOpen)}
        onSave={() => {
          if (!materialResult) return;
          materialSaved.save(
            `${materialResult.stringersCount} stringers, ${materialResult.totalTreadsCount} treads, Total: $${materialResult.totalEstimatedCost}`,
            materialResult
          );
          flashSave(setMaterialSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          {/* Material Type Dropdowns (Preset Triggers) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Staircase Width:
              </label>
              <select
                value={stairWidth}
                onChange={(e) => setStairWidth(e.target.value)}
                className="w-full h-7 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300"
              >
                <option value="36">36 inches (Standard 3 Stringers)</option>
                <option value="42">42 inches (4 Stringers)</option>
                <option value="48">48 inches (4 Stringers)</option>
                <option value="60">60 inches (5 Stringers)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Stringer Lumber Size:
              </label>
              <select
                value={stringerSize}
                onChange={(e) => {
                  const size = e.target.value as "2x10" | "2x12";
                  setStringerSize(size);
                  setPriceStringer(size === "2x12" ? "38" : "28");
                }}
                className="w-full h-7 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300"
              >
                <option value="2x12">2x12 Dimensional Board (Recommended - $38)</option>
                <option value="2x10">2x10 Dimensional Board ($28)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Tread Material Preset:
              </label>
              <select
                value={treadMaterial}
                onChange={(e) => {
                  const mat = e.target.value as any;
                  setTreadMaterial(mat);
                  const priceMap: Record<string, string> = {
                    oak: "38",
                    pine: "18",
                    hardwood: "48",
                    pressure_treated: "24",
                    composite: "58",
                  };
                  if (priceMap[mat]) setPriceTread(priceMap[mat]);
                }}
                className="w-full h-7 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300"
              >
                <option value="oak">Solid Red/White Oak ($38)</option>
                <option value="pine">Yellow Pine / Edge Glued ($18)</option>
                <option value="hardwood">Hardwood / Maple ($48)</option>
                <option value="pressure_treated">Pressure-Treated Outdoor ($24)</option>
                <option value="composite">Composite Decking Tread ($58)</option>
              </select>
            </div>
          </div>

          {/* User-Editable Prices Section */}
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">
                Editable Material &amp; Labor Unit Prices (Free Will Adjustment)
              </span>
              <button
                type="button"
                onClick={() => {
                  setPriceStringer("38");
                  setPriceTread("38");
                  setPriceRiser("14");
                  setPriceFasteners("45");
                  setTaxRate("7");
                }}
                className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
              >
                Reset Default Market Prices
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Stringer Board ($/ea)</label>
                <Input
                  type="number"
                  value={priceStringer}
                  onChange={(e) => setPriceStringer(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Tread Board ($/ea)</label>
                <Input
                  type="number"
                  value={priceTread}
                  onChange={(e) => setPriceTread(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Riser Board ($/ea)</label>
                <Input
                  type="number"
                  value={priceRiser}
                  onChange={(e) => setPriceRiser(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Brackets &amp; Screws ($)</label>
                <Input
                  type="number"
                  value={priceFasteners}
                  onChange={(e) => setPriceFasteners(e.target.value)}
                  min={0}
                  step={5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Handrails/Extras ($)</label>
                <Input
                  type="number"
                  placeholder="0"
                  onChange={(e) => handleMaterialCalc()}
                  min={0}
                  step={10}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Sales Tax (%)</label>
                <Input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  min={0}
                  step={0.5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleMaterialCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Recalculate Material Total
            </Button>
          </div>

          {materialResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              {/* Itemized Cost Breakdown Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] font-sans tabular-nums border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700 text-zinc-500 font-semibold">
                      <th className="py-1">Material Component</th>
                      <th className="py-1">Quantity</th>
                      <th className="py-1">Unit Price</th>
                      <th className="py-1 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">
                        {materialResult.stringerBoardLengthFt}ft {materialResult.stringerBoardSize} Stringer Carriage Boards
                      </td>
                      <td className="py-1">{materialResult.stringersCount} boards</td>
                      <td className="py-1">${priceStringer}</td>
                      <td className="py-1 text-right font-semibold">${materialResult.stringerLumberCost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">
                        Tread Boards ({treadMaterial.replace("_", " ")})
                      </td>
                      <td className="py-1">{materialResult.totalTreadsCount} pcs</td>
                      <td className="py-1">${priceTread}</td>
                      <td className="py-1 text-right font-semibold">${materialResult.treadsCost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">
                        Riser Boards ({riserMaterial.replace("_", " ")})
                      </td>
                      <td className="py-1">{materialResult.totalRisersCount} pcs</td>
                      <td className="py-1">${priceRiser}</td>
                      <td className="py-1 text-right font-semibold">${materialResult.risersCost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">
                        Hardware, Simpson Brackets &amp; Structural Screws
                      </td>
                      <td className="py-1">1 kit</td>
                      <td className="py-1">${priceFasteners}</td>
                      <td className="py-1 text-right font-semibold">${materialResult.fastenersCost.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-slate-50/70 dark:bg-zinc-800/40 font-medium">
                      <td colSpan={3} className="py-1 text-zinc-600 dark:text-zinc-400">Materials Subtotal</td>
                      <td className="py-1 text-right">${materialResult.materialsSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-slate-50/70 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400">
                      <td colSpan={3} className="py-1">Estimated Sales Tax ({taxRate}%)</td>
                      <td className="py-1 text-right">${materialResult.taxCost.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-blue-50 dark:bg-blue-950/40 font-bold text-xs">
                      <td colSpan={3} className="py-1.5 text-blue-900 dark:text-blue-100">Total Estimated Project Cost</td>
                      <td className="py-1.5 text-right text-emerald-600 dark:text-emerald-400 text-sm">
                        ${materialResult.totalEstimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...materialSaved}
          cardTitle="Materials"
          formatSummary={(r) => `${r.stringersCount} stringers, Total: $${r.totalEstimatedCost}`}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Stair Cut Sheet &amp; Report
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
