"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Download,
  Trash2,
  Plus,
  FileSpreadsheet,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  LinearUnit,
  PriceUnit,
  RectangleResult,
  CircleResult,
  RingResult,
  SectorResult,
  TriangleResult,
  RectangleBorderResult,
  RoomSection,
  calculateRectangleArea,
  calculateMultiRoomArea,
  calculateCircleArea,
  calculateRingArea,
  calculateSectorArea,
  calculateTriangleHeron,
  calculateTriangleBaseHeight,
  calculateTrapezoidArea,
  calculateParallelogramArea,
  calculateRectangleBorderArea,
  estimateMaterials,
  MaterialEstimation,
} from "@/lib/calculator-engine/formulas/square-footage";

// ─── Types & Local Storage Hook ─────────────────────────────────────────────

interface SavedAreaEstimate<T> {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: T;
  notes: string;
}

const LINEAR_UNITS: { value: LinearUnit; label: string }[] = [
  { value: "feet", label: "feet" },
  { value: "inches", label: "inches" },
  { value: "yards", label: "yards" },
  { value: "meters", label: "meters" },
  { value: "centimeters", label: "cm" },
];

const PRICE_UNITS: { value: PriceUnit; label: string }[] = [
  { value: "per_sq_ft", label: "per square feet" },
  { value: "per_sq_yd", label: "per square yard" },
  { value: "per_sq_m", label: "per square meter" },
];

function flashSave(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
}

function useCardSaved<T>(storageKey: string) {
  const [saved, setSaved] = useState<SavedAreaEstimate<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: T, notes = "") => {
      const entry: SavedAreaEstimate<T> = {
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
  saved: SavedAreaEstimate<T>[];
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
    a.download = `square_footage_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_estimates.csv`;
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

function ResultDisplay({
  sqFt,
  sqYd,
  sqM,
  acres,
  wasteSqFt,
  wastePercent = 0,
  cost = 0,
  secondaryLabel,
  secondaryValue,
}: {
  sqFt: number;
  sqYd: number;
  sqM: number;
  acres: number;
  wasteSqFt?: number;
  wastePercent?: number;
  cost?: number;
  secondaryLabel?: string;
  secondaryValue?: string;
}) {
  return (
    <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 space-y-2">
      <div className="text-center">
        <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300 block">
          Total Area
        </span>
        <div className="text-2xl font-black text-blue-900 dark:text-blue-100 font-sans tabular-nums">
          {sqFt.toLocaleString()}{" "}
          <span className="text-xs font-normal text-blue-700 dark:text-blue-300">sq ft</span>
        </div>
        <div className="text-xs font-semibold text-blue-800 dark:text-blue-300 mt-0.5">
          {sqYd.toLocaleString()} sq yd · {sqM.toLocaleString()} m² · {acres > 0.001 ? `${acres.toFixed(3)} acres` : `${acres} acres`}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-blue-200/60 dark:border-blue-800/60">
        {wastePercent > 0 && wasteSqFt !== undefined && (
          <div className="p-1.5 bg-white/70 dark:bg-zinc-900/60 rounded text-center">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">With {wastePercent}% Waste</span>
            <span className="font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums text-xs">
              {wasteSqFt.toLocaleString()} sq ft
            </span>
          </div>
        )}
        {cost > 0 && (
          <div className="p-1.5 bg-white/70 dark:bg-zinc-900/60 rounded text-center">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Estimated Material Cost</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums text-xs">
              ${cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        )}
        {secondaryLabel && secondaryValue && (
          <div className="col-span-2 p-1.5 bg-white/70 dark:bg-zinc-900/60 rounded text-center">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">{secondaryLabel}</span>
            <span className="font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums text-xs">
              {secondaryValue}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 2D SVG Diagrams Matching Calculator.net Precision ─────────────────────

function RectangleSvg({ l, w }: { l: number; w: number }) {
  return (
    <svg viewBox="0 0 160 110" className="w-full max-w-[140px] mx-auto select-none" aria-label="Rectangle 2D Diagram">
      <rect x="25" y="25" width="110" height="60" fill="none" stroke="#27272a" strokeWidth="1.5" className="dark:stroke-zinc-300" />
    </svg>
  );
}

function RectangleBorderSvg() {
  return (
    <svg viewBox="0 0 160 110" className="w-full max-w-[140px] mx-auto select-none" aria-label="Rectangle Border 2D Diagram">
      <defs>
        <marker id="rb-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M1,0.5 L5,3 L1,5.5 Z" fill="#27272a" className="dark:fill-zinc-300" />
        </marker>
      </defs>
      <rect x="15" y="15" width="100" height="75" fill="none" stroke="#27272a" strokeWidth="1.5" className="dark:stroke-zinc-300" />
      <rect x="30" y="28" width="70" height="49" fill="none" stroke="#27272a" strokeWidth="1.5" className="dark:stroke-zinc-300" />
      <text x="65" y="99" textAnchor="middle" className="text-[9px] fill-zinc-800 dark:fill-zinc-200 font-medium">Width</text>
      <text x="8" y="55" textAnchor="end" className="text-[9px] fill-zinc-800 dark:fill-zinc-200 font-medium">Height</text>
      <line x1="145" y1="52" x2="102" y2="52" stroke="#27272a" strokeWidth="1" markerEnd="url(#rb-arrow)" className="dark:stroke-zinc-300" />
      <text x="148" y="55" textAnchor="start" className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-medium">Border Width</text>
    </svg>
  );
}

function CircleSvg() {
  return (
    <svg viewBox="0 0 160 110" className="w-full max-w-[140px] mx-auto select-none" aria-label="Circle 2D Diagram">
      <circle cx="80" cy="55" r="42" fill="none" stroke="#27272a" strokeWidth="1.5" className="dark:stroke-zinc-300" />
    </svg>
  );
}

function RingSvg() {
  return (
    <svg viewBox="0 0 170 120" className="w-full max-w-[150px] mx-auto select-none" aria-label="Ring 2D Diagram">
      <defs>
        <marker id="ring-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M1,0.5 L5,3 L1,5.5 Z" fill="#27272a" className="dark:fill-zinc-300" />
        </marker>
        <marker id="ring-arr-l" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M5,0.5 L1,3 L5,5.5 Z" fill="#27272a" className="dark:fill-zinc-300" />
        </marker>
      </defs>
      <circle cx="65" cy="60" r="48" fill="none" stroke="#27272a" strokeWidth="1.5" className="dark:stroke-zinc-300" />
      <circle cx="65" cy="60" r="28" fill="none" stroke="#27272a" strokeWidth="1.5" className="dark:stroke-zinc-300" />
      <line x1="15" y1="112" x2="115" y2="112" stroke="#27272a" strokeWidth="1" markerStart="url(#ring-arr-l)" markerEnd="url(#ring-arr)" className="dark:stroke-zinc-300" />
      <text x="65" y="120" textAnchor="middle" className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-medium">Outer Diameter</text>
      <line x1="160" y1="60" x2="95" y2="60" stroke="#27272a" strokeWidth="1" markerEnd="url(#ring-arr)" className="dark:stroke-zinc-300" />
      <text x="162" y="63" textAnchor="start" className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-medium">Border Width</text>
    </svg>
  );
}

function TriangleEdgesSvg() {
  return (
    <svg viewBox="0 0 160 110" className="w-full max-w-[140px] mx-auto select-none" aria-label="Triangle Edges Diagram">
      <polygon points="40,20 135,100 15,100" fill="none" stroke="#27272a" strokeWidth="1.5" className="dark:stroke-zinc-300" />
    </svg>
  );
}

function TriangleBaseHeightSvg() {
  return (
    <svg viewBox="0 0 160 110" className="w-full max-w-[140px] mx-auto select-none" aria-label="Triangle Base Height Diagram">
      <polygon points="50,20 140,95 15,95" fill="none" stroke="#27272a" strokeWidth="1.5" className="dark:stroke-zinc-300" />
      <line x1="50" y1="20" x2="50" y2="95" stroke="#27272a" strokeWidth="1" strokeDasharray="3 2" className="dark:stroke-zinc-300" />
      <rect x="50" y="87" width="8" height="8" fill="none" stroke="#27272a" strokeWidth="0.8" className="dark:stroke-zinc-300" />
      <text x="45" y="60" textAnchor="end" className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-medium">Height</text>
      <text x="75" y="106" textAnchor="middle" className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-medium">Base</text>
    </svg>
  );
}

function TrapezoidSvg() {
  return (
    <svg viewBox="0 0 160 110" className="w-full max-w-[140px] mx-auto select-none" aria-label="Trapezoid 2D Diagram">
      <polygon points="45,30 115,30 145,90 15,90" fill="none" stroke="#27272a" strokeWidth="1.5" className="dark:stroke-zinc-300" />
    </svg>
  );
}

function SectorSvg() {
  return (
    <svg viewBox="0 0 160 115" className="w-full max-w-[145px] mx-auto select-none" aria-label="Sector 2D Diagram">
      {/* Sector Shape */}
      <path
        d="M 30,57 L 102,12 A 85,85 0 0,1 102,102 Z"
        fill="none"
        stroke="#27272a"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="dark:stroke-zinc-300"
      />
      {/* Blue Angle Arc */}
      <path
        d="M 55.4,41.1 A 30,30 0 0,1 55.4,72.9"
        fill="none"
        stroke="#2563eb"
        strokeWidth="1.2"
        className="dark:stroke-blue-400"
      />
      {/* Angle label */}
      <text
        x="44"
        y="60"
        textAnchor="middle"
        className="text-[9px] fill-blue-600 dark:fill-blue-400 font-semibold"
      >
        angle
      </text>
      {/* Radius label */}
      <text
        x="72"
        y="88"
        textAnchor="middle"
        transform="rotate(32 72 88)"
        className="text-[9px] fill-zinc-700 dark:fill-zinc-300 font-medium"
      >
        radius
      </text>
    </svg>
  );
}

function ParallelogramSvg() {
  return (
    <svg viewBox="0 0 160 110" className="w-full max-w-[140px] mx-auto select-none" aria-label="Parallelogram 2D Diagram">
      <polygon points="50,30 145,30 115,90 20,90" fill="none" stroke="#27272a" strokeWidth="1.5" className="dark:stroke-zinc-300" />
    </svg>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function SquareFootageCalculator() {
  // ─── CARD 1: RECTANGLE ───
  const [rectMode, setRectMode] = useState<"single" | "multi">("single");
  const [rectLength, setRectLength] = useState("30");
  const [rectWidth, setRectWidth] = useState("20");
  const [rectUnit, setRectUnit] = useState<LinearUnit>("feet");
  const [rectQty, setRectQty] = useState("1");
  const [rectPrice, setRectPrice] = useState("");
  const [rectPriceUnit, setRectPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [rectResult, setRectResult] = useState<RectangleResult | null>(null);
  const [rectSaveSuccess, setRectSaveSuccess] = useState(false);
  const rectSaved = useCardSaved<RectangleResult>("saved_sqft_rect");

  // Multi-room state
  const [rooms, setRooms] = useState<RoomSection[]>([
    { id: "1", name: "Living Room", length: 20, width: 16, unit: "feet", quantity: 1 },
    { id: "2", name: "Dining Room", length: 12, width: 10, unit: "feet", quantity: 1 },
  ]);
  const [multiWaste, setMultiWaste] = useState("10");
  const [multiPrice, setMultiPrice] = useState("");
  const [multiPriceUnit, setMultiPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [multiResult, setMultiResult] = useState<any>(null);

  // ─── CARD 2: RECTANGLE BORDER ───
  const [borderLength, setBorderLength] = useState("30");
  const [borderWidthVal, setBorderWidthVal] = useState("20");
  const [borderThickness, setBorderThickness] = useState("2");
  const [borderUnit, setBorderUnit] = useState<LinearUnit>("feet");
  const [borderQty, setBorderQty] = useState("1");
  const [borderPrice, setBorderPrice] = useState("");
  const [borderPriceUnit, setBorderPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [borderResult, setBorderResult] = useState<RectangleBorderResult | null>(null);
  const [borderSaveSuccess, setBorderSaveSuccess] = useState(false);
  const borderSaved = useCardSaved<RectangleBorderResult>("saved_sqft_border");

  // ─── CARD 3: CIRCLE ───
  const [circDiameter, setCircDiameter] = useState("30");
  const [circUnit, setCircUnit] = useState<LinearUnit>("feet");
  const [circQty, setCircQty] = useState("1");
  const [circPrice, setCircPrice] = useState("");
  const [circPriceUnit, setCircPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [circResult, setCircResult] = useState<CircleResult | null>(null);
  const [circSaveSuccess, setCircSaveSuccess] = useState(false);
  const circSaved = useCardSaved<CircleResult>("saved_sqft_circle");

  // ─── CARD 4: RING ───
  const [ringOuterDia, setRingOuterDia] = useState("30");
  const [ringBorderWidth, setRingBorderWidth] = useState("2");
  const [ringUnit, setRingUnit] = useState<LinearUnit>("feet");
  const [ringQty, setRingQty] = useState("1");
  const [ringPrice, setRingPrice] = useState("");
  const [ringPriceUnit, setRingPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [ringResult, setRingResult] = useState<RingResult | null>(null);
  const [ringSaveSuccess, setRingSaveSuccess] = useState(false);
  const ringSaved = useCardSaved<RingResult>("saved_sqft_ring");

  // ─── CARD 5: TRIANGLE (EDGE LENGTHS & BASE/HEIGHT) ───
  const [triMode, setTriMode] = useState<"edges" | "base_height">("edges");
  const [triEdge1, setTriEdge1] = useState("30");
  const [triEdge2, setTriEdge2] = useState("45");
  const [triEdge3, setTriEdge3] = useState("50");
  const [triBase, setTriBase] = useState("30");
  const [triHeight, setTriHeight] = useState("20");
  const [triUnit, setTriUnit] = useState<LinearUnit>("feet");
  const [triQty, setTriQty] = useState("1");
  const [triPrice, setTriPrice] = useState("");
  const [triPriceUnit, setTriPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [triResult, setTriResult] = useState<any>(null);
  const [triSaveSuccess, setTriSaveSuccess] = useState(false);
  const triSaved = useCardSaved<any>("saved_sqft_triangle");

  // ─── CARD 6: TRAPEZOID ───
  const [trapBase1, setTrapBase1] = useState("30");
  const [trapBase2, setTrapBase2] = useState("45");
  const [trapHeight, setTrapHeight] = useState("20");
  const [trapUnit, setTrapUnit] = useState<LinearUnit>("feet");
  const [trapQty, setTrapQty] = useState("1");
  const [trapPrice, setTrapPrice] = useState("");
  const [trapPriceUnit, setTrapPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [trapResult, setTrapResult] = useState<any>(null);
  const [trapSaveSuccess, setTrapSaveSuccess] = useState(false);
  const trapSaved = useCardSaved<any>("saved_sqft_trapezoid");

  // ─── CARD 7: SECTOR ───
  const [sectorRadius, setSectorRadius] = useState("30");
  const [sectorAngle, setSectorAngle] = useState("90");
  const [sectorUnit, setSectorUnit] = useState<LinearUnit>("feet");
  const [sectorQty, setSectorQty] = useState("1");
  const [sectorPrice, setSectorPrice] = useState("");
  const [sectorPriceUnit, setSectorPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [sectorResult, setSectorResult] = useState<SectorResult | null>(null);
  const [sectorSaveSuccess, setSectorSaveSuccess] = useState(false);
  const sectorSaved = useCardSaved<SectorResult>("saved_sqft_sector");

  // ─── CARD 8: PARALLELOGRAM ───
  const [paraBase, setParaBase] = useState("30");
  const [paraHeight, setParaHeight] = useState("20");
  const [paraUnit, setParaUnit] = useState<LinearUnit>("feet");
  const [paraQty, setParaQty] = useState("1");
  const [paraPrice, setParaPrice] = useState("");
  const [paraPriceUnit, setParaPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [paraResult, setParaResult] = useState<any>(null);
  const [paraSaveSuccess, setParaSaveSuccess] = useState(false);
  const paraSaved = useCardSaved<any>("saved_sqft_parallelogram");

  // ─── MATERIAL PRESET STATE ───
  const [materialPresetSqFt, setMaterialPresetSqFt] = useState("600");
  const [materials, setMaterials] = useState<MaterialEstimation | null>(null);

  // ─── GLOBAL REPORT MODAL STATE ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // ─── Handlers ───

  const handleRectCalc = useCallback(() => {
    if (rectMode === "single") {
      const res = calculateRectangleArea({
        length: Number(rectLength) || 0,
        width: Number(rectWidth) || 0,
        unit: rectUnit,
        quantity: Number(rectQty) || 1,
        wastePercent: 0,
        price: Number(rectPrice) || 0,
        priceUnit: rectPriceUnit,
      });
      setRectResult(res);
      setMaterialPresetSqFt(String(res.squareFeet));
    } else {
      const res = calculateMultiRoomArea(
        rooms,
        Number(multiWaste) || 0,
        Number(multiPrice) || 0,
        multiPriceUnit,
      );
      setMultiResult(res);
      setMaterialPresetSqFt(String(res.wasteSquareFeet || res.squareFeet));
    }
  }, [
    rectMode,
    rectLength,
    rectWidth,
    rectUnit,
    rectQty,
    rectPrice,
    rectPriceUnit,
    rooms,
    multiWaste,
    multiPrice,
    multiPriceUnit,
  ]);

  const handleBorderCalc = useCallback(() => {
    const res = calculateRectangleBorderArea({
      outerLength: Number(borderLength) || 0,
      outerWidth: Number(borderWidthVal) || 0,
      borderWidth: Number(borderThickness) || 0,
      unit: borderUnit,
      quantity: Number(borderQty) || 1,
      wastePercent: 0,
      price: Number(borderPrice) || 0,
      priceUnit: borderPriceUnit,
    });
    setBorderResult(res);
  }, [borderLength, borderWidthVal, borderThickness, borderUnit, borderQty, borderPrice, borderPriceUnit]);

  const handleCircCalc = useCallback(() => {
    const res = calculateCircleArea({
      diameter: Number(circDiameter) || 0,
      unit: circUnit,
      quantity: Number(circQty) || 1,
      wastePercent: 0,
      price: Number(circPrice) || 0,
      priceUnit: circPriceUnit,
    });
    setCircResult(res);
  }, [circDiameter, circUnit, circQty, circPrice, circPriceUnit]);

  const handleRingCalc = useCallback(() => {
    const res = calculateRingArea({
      outerDiameter: Number(ringOuterDia) || 0,
      borderWidth: Number(ringBorderWidth) || 0,
      unit: ringUnit,
      quantity: Number(ringQty) || 1,
      wastePercent: 0,
      price: Number(ringPrice) || 0,
      priceUnit: ringPriceUnit,
    });
    setRingResult(res);
  }, [ringOuterDia, ringBorderWidth, ringUnit, ringQty, ringPrice, ringPriceUnit]);

  const handleTriCalc = useCallback(() => {
    if (triMode === "edges") {
      const res = calculateTriangleHeron({
        sideA: Number(triEdge1) || 0,
        sideB: Number(triEdge2) || 0,
        sideC: Number(triEdge3) || 0,
        unit: triUnit,
        quantity: Number(triQty) || 1,
        wastePercent: 0,
        price: Number(triPrice) || 0,
        priceUnit: triPriceUnit,
      });
      setTriResult(res);
    } else {
      const res = calculateTriangleBaseHeight({
        base: Number(triBase) || 0,
        height: Number(triHeight) || 0,
        unit: triUnit,
        quantity: Number(triQty) || 1,
        wastePercent: 0,
        price: Number(triPrice) || 0,
        priceUnit: triPriceUnit,
      });
      setTriResult(res);
    }
  }, [triMode, triEdge1, triEdge2, triEdge3, triBase, triHeight, triUnit, triQty, triPrice, triPriceUnit]);

  const handleTrapCalc = useCallback(() => {
    const res = calculateTrapezoidArea({
      base1: Number(trapBase1) || 0,
      base2: Number(trapBase2) || 0,
      height: Number(trapHeight) || 0,
      unit: trapUnit,
      quantity: Number(trapQty) || 1,
      wastePercent: 0,
      price: Number(trapPrice) || 0,
      priceUnit: trapPriceUnit,
    });
    setTrapResult(res);
  }, [trapBase1, trapBase2, trapHeight, trapUnit, trapQty, trapPrice, trapPriceUnit]);

  const handleSectorCalc = useCallback(() => {
    const res = calculateSectorArea({
      radius: Number(sectorRadius) || 0,
      angleDegrees: Number(sectorAngle) || 0,
      unit: sectorUnit,
      quantity: Number(sectorQty) || 1,
      wastePercent: 0,
      price: Number(sectorPrice) || 0,
      priceUnit: sectorPriceUnit,
    });
    setSectorResult(res);
  }, [sectorRadius, sectorAngle, sectorUnit, sectorQty, sectorPrice, sectorPriceUnit]);

  const handleParaCalc = useCallback(() => {
    const res = calculateParallelogramArea({
      base: Number(paraBase) || 0,
      height: Number(paraHeight) || 0,
      unit: paraUnit,
      quantity: Number(paraQty) || 1,
      wastePercent: 0,
      price: Number(paraPrice) || 0,
      priceUnit: paraPriceUnit,
    });
    setParaResult(res);
  }, [paraBase, paraHeight, paraUnit, paraQty, paraPrice, paraPriceUnit]);

  // Recalculate material presets
  useEffect(() => {
    const sqFt = Number(materialPresetSqFt) || 0;
    setMaterials(estimateMaterials(sqFt));
  }, [materialPresetSqFt]);

  // Run initial calculations on mount
  useEffect(() => {
    handleRectCalc();
    handleBorderCalc();
    handleCircCalc();
    handleRingCalc();
    handleTriCalc();
    handleTrapCalc();
    handleSectorCalc();
    handleParaCalc();
  }, [
    handleRectCalc,
    handleBorderCalc,
    handleCircCalc,
    handleRingCalc,
    handleTriCalc,
    handleTrapCalc,
    handleSectorCalc,
    handleParaCalc,
  ]);

  // Multi-room row handlers
  const addRoomRow = () => {
    setRooms((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        name: `Section ${prev.length + 1}`,
        length: 12,
        width: 10,
        unit: "feet",
        quantity: 1,
      },
    ]);
  };

  const removeRoomRow = (id: string) => {
    if (rooms.length <= 1) return;
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRoomRow = (id: string, field: keyof RoomSection, value: any) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  };

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];
    if (rectResult) {
      sections.push({
        title: "Rectangle",
        items: [
          { label: "Total Area", value: `${rectResult.squareFeet.toLocaleString()} sq ft` },
          { label: "Square Yards", value: `${rectResult.squareYards} sq yd` },
          { label: "Square Meters", value: `${rectResult.squareMeters} m²` },
        ],
      });
    }
    if (borderResult) {
      sections.push({
        title: "Rectangle Border",
        items: [
          { label: "Border Area", value: `${borderResult.squareFeet.toLocaleString()} sq ft` },
          { label: "Outer Area", value: `${borderResult.outerAreaSqFt} sq ft` },
        ],
      });
    }
    if (circResult) {
      sections.push({
        title: "Circle",
        items: [
          { label: "Circle Area", value: `${circResult.squareFeet.toLocaleString()} sq ft` },
        ],
      });
    }
    if (ringResult) {
      sections.push({
        title: "Ring",
        items: [
          { label: "Ring Area", value: `${ringResult.squareFeet.toLocaleString()} sq ft` },
        ],
      });
    }
    if (triResult) {
      sections.push({
        title: "Triangle",
        items: [
          { label: "Triangle Area", value: `${triResult.squareFeet.toLocaleString()} sq ft` },
        ],
      });
    }
    if (trapResult) {
      sections.push({
        title: "Trapezoid",
        items: [
          { label: "Trapezoid Area", value: `${trapResult.squareFeet.toLocaleString()} sq ft` },
        ],
      });
    }
    if (sectorResult) {
      sections.push({
        title: "Sector",
        items: [
          { label: "Sector Area", value: `${sectorResult.squareFeet.toLocaleString()} sq ft` },
        ],
      });
    }
    if (paraResult) {
      sections.push({
        title: "Parallelogram",
        items: [
          { label: "Parallelogram Area", value: `${paraResult.squareFeet.toLocaleString()} sq ft` },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Square Footage Calculator",
        reportTitle: "Square Footage & Area Estimation Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        currencySymbol: "$",
      },
      keyMetrics: [
        { label: "Rectangle Area", value: rectResult ? `${rectResult.squareFeet.toLocaleString()} sq ft` : "—", highlight: true },
        { label: "Trapezoid Area", value: trapResult ? `${trapResult.squareFeet.toLocaleString()} sq ft` : "—" },
        { label: "Sector Area", value: sectorResult ? `${sectorResult.squareFeet.toLocaleString()} sq ft` : "—" },
      ],
      sections,
    };
  }, [rectResult, borderResult, circResult, ringResult, triResult, trapResult, sectorResult, paraResult]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ CARD 1: RECTANGLE ═══════════════════ */}
      <CardWrapper
        title="Rectangle"
        hasResult={rectMode === "single" ? !!rectResult : !!multiResult}
        isSaved={rectSaveSuccess}
        savedCount={rectSaved.saved.length}
        onToggleSaved={() => rectSaved.setIsOpen(!rectSaved.isOpen)}
        onSave={() => {
          if (rectMode === "single" && rectResult) {
            rectSaved.save(`${rectLength}×${rectWidth} ${rectUnit}, Qty: ${rectQty}`, rectResult);
            flashSave(setRectSaveSuccess);
          } else if (rectMode === "multi" && multiResult) {
            rectSaved.save(`Multi-room (${rooms.length} sections)`, multiResult);
            flashSave(setRectSaveSuccess);
          }
        }}
      >
        <div className="flex gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setRectMode("single")}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
              rectMode === "single"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            Single Rectangle
          </button>
          <button
            type="button"
            onClick={() => setRectMode("multi")}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              rectMode === "multi"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Multi-Room Aggregator
          </button>
        </div>

        {rectMode === "single" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <InputRow label="Length" value={rectLength} onChange={setRectLength} unit={rectUnit} onUnitChange={setRectUnit} />
              <InputRow label="Width" value={rectWidth} onChange={setRectWidth} unit={rectUnit} onUnitChange={setRectUnit} />
              <InputRow label="Quantity" value={rectQty} onChange={setRectQty} min={1} step={1} showUnit={false} />
              <InputRow label="Price (optional)" value={rectPrice} onChange={setRectPrice} unit={rectPriceUnit} onUnitChange={setRectPriceUnit} unitOptions={PRICE_UNITS} min={0} />

              <div className="flex gap-2 pt-1">
                <Button onClick={handleRectCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                  Calculate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setRectLength("30");
                    setRectWidth("20");
                    setRectQty("1");
                    setRectPrice("");
                  }}
                  className="text-xs font-semibold h-8 px-3 cursor-pointer"
                >
                  Clear
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <RectangleSvg l={Number(rectLength)} w={Number(rectWidth)} />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-2">
              {rooms.map((room) => (
                <div key={room.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs">
                  <div className="col-span-3">
                    <Input
                      type="text"
                      value={room.name}
                      onChange={(e) => updateRoomRow(room.id, "name", e.target.value)}
                      placeholder="Room Name"
                      className="h-7 text-xs bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      value={room.length}
                      onChange={(e) => updateRoomRow(room.id, "length", Number(e.target.value))}
                      placeholder="Length"
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      value={room.width}
                      onChange={(e) => updateRoomRow(room.id, "width", Number(e.target.value))}
                      placeholder="Width"
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      value={room.unit}
                      onChange={(e) => updateRoomRow(room.id, "unit", e.target.value)}
                      className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                    >
                      {LINEAR_UNITS.map((u) => (
                        <option key={u.value} value={u.value}>
                          {u.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeRoomRow(room.id)}
                      disabled={rooms.length <= 1}
                      className="text-zinc-400 hover:text-red-500 disabled:opacity-30 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={addRoomRow}
                className="text-xs h-7 gap-1 font-semibold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Room / Section
              </Button>
              <Button onClick={handleRectCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer">
                Calculate Total
              </Button>
            </div>
          </div>
        )}

        {rectMode === "single" && rectResult && (
          <ResultDisplay
            sqFt={rectResult.squareFeet}
            sqYd={rectResult.squareYards}
            sqM={rectResult.squareMeters}
            acres={rectResult.acres}
            cost={rectResult.estimatedCost}
            secondaryLabel="Perimeter"
            secondaryValue={`${rectResult.perimeterFt} ft`}
          />
        )}

        {rectMode === "multi" && multiResult && (
          <ResultDisplay
            sqFt={multiResult.squareFeet}
            sqYd={multiResult.squareYards}
            sqM={multiResult.squareMeters}
            acres={multiResult.acres}
            wasteSqFt={multiResult.wasteSquareFeet}
            wastePercent={Number(multiWaste)}
            cost={multiResult.estimatedCost}
            secondaryLabel="Sections Summed"
            secondaryValue={`${multiResult.sectionsCount} rooms`}
          />
        )}

        <SavedEstimatesDrawer
          {...rectSaved}
          cardTitle="Rectangle"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: RECTANGLE BORDER ═══════════════════ */}
      <CardWrapper
        title="Rectangle Border"
        hasResult={!!borderResult}
        isSaved={borderSaveSuccess}
        savedCount={borderSaved.saved.length}
        onToggleSaved={() => borderSaved.setIsOpen(!borderSaved.isOpen)}
        onSave={() => {
          if (!borderResult) return;
          borderSaved.save(`Outer: ${borderLength}×${borderWidthVal}, Border: ${borderThickness} ${borderUnit}`, borderResult);
          flashSave(setBorderSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow label="Length" value={borderLength} onChange={setBorderLength} unit={borderUnit} onUnitChange={setBorderUnit} />
            <InputRow label="Width" value={borderWidthVal} onChange={setBorderWidthVal} unit={borderUnit} onUnitChange={setBorderUnit} />
            <InputRow label="Border Width" value={borderThickness} onChange={setBorderThickness} unit={borderUnit} onUnitChange={setBorderUnit} />
            <InputRow label="Quantity" value={borderQty} onChange={setBorderQty} min={1} step={1} showUnit={false} />
            <InputRow label="Price (optional)" value={borderPrice} onChange={setBorderPrice} unit={borderPriceUnit} onUnitChange={setBorderPriceUnit} unitOptions={PRICE_UNITS} min={0} />

            <div className="flex gap-2 pt-1">
              <Button onClick={handleBorderCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setBorderLength("30");
                  setBorderWidthVal("20");
                  setBorderThickness("2");
                  setBorderQty("1");
                  setBorderPrice("");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <RectangleBorderSvg />
          </div>
        </div>

        {borderResult && (
          <ResultDisplay
            sqFt={borderResult.squareFeet}
            sqYd={borderResult.squareYards}
            sqM={borderResult.squareMeters}
            acres={borderResult.acres}
            cost={borderResult.estimatedCost}
            secondaryLabel="Outer vs Inner Area"
            secondaryValue={`Outer: ${borderResult.outerAreaSqFt} sq ft | Inner: ${borderResult.innerAreaSqFt} sq ft`}
          />
        )}

        <SavedEstimatesDrawer
          {...borderSaved}
          cardTitle="Border"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: CIRCLE ═══════════════════ */}
      <CardWrapper
        title="Circle"
        hasResult={!!circResult}
        isSaved={circSaveSuccess}
        savedCount={circSaved.saved.length}
        onToggleSaved={() => circSaved.setIsOpen(!circSaved.isOpen)}
        onSave={() => {
          if (!circResult) return;
          circSaved.save(`Diameter: ${circDiameter} ${circUnit}`, circResult);
          flashSave(setCircSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow label="Diameter" value={circDiameter} onChange={setCircDiameter} unit={circUnit} onUnitChange={setCircUnit} />
            <InputRow label="Quantity" value={circQty} onChange={setCircQty} min={1} step={1} showUnit={false} />
            <InputRow label="Price (optional)" value={circPrice} onChange={setCircPrice} unit={circPriceUnit} onUnitChange={setCircPriceUnit} unitOptions={PRICE_UNITS} min={0} />

            <div className="flex gap-2 pt-1">
              <Button onClick={handleCircCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCircDiameter("30");
                  setCircQty("1");
                  setCircPrice("");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <CircleSvg />
          </div>
        </div>

        {circResult && (
          <ResultDisplay
            sqFt={circResult.squareFeet}
            sqYd={circResult.squareYards}
            sqM={circResult.squareMeters}
            acres={circResult.acres}
            cost={circResult.estimatedCost}
            secondaryLabel="Circumference"
            secondaryValue={`${circResult.circumferenceFt} ft`}
          />
        )}

        <SavedEstimatesDrawer
          {...circSaved}
          cardTitle="Circle"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: RING ═══════════════════ */}
      <CardWrapper
        title="Ring"
        hasResult={!!ringResult}
        isSaved={ringSaveSuccess}
        savedCount={ringSaved.saved.length}
        onToggleSaved={() => ringSaved.setIsOpen(!ringSaved.isOpen)}
        onSave={() => {
          if (!ringResult) return;
          ringSaved.save(`Outer Dia: ${ringOuterDia}, Border: ${ringBorderWidth} ${ringUnit}`, ringResult);
          flashSave(setRingSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow label="Outer Diameter" value={ringOuterDia} onChange={setRingOuterDia} unit={ringUnit} onUnitChange={setRingUnit} />
            <InputRow label="Border Width" value={ringBorderWidth} onChange={setRingBorderWidth} unit={ringUnit} onUnitChange={setRingUnit} />
            <InputRow label="Quantity" value={ringQty} onChange={setRingQty} min={1} step={1} showUnit={false} />
            <InputRow label="Price (optional)" value={ringPrice} onChange={setRingPrice} unit={ringPriceUnit} onUnitChange={setRingPriceUnit} unitOptions={PRICE_UNITS} min={0} />

            <div className="flex gap-2 pt-1">
              <Button onClick={handleRingCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setRingOuterDia("30");
                  setRingBorderWidth("2");
                  setRingQty("1");
                  setRingPrice("");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <RingSvg />
          </div>
        </div>

        {ringResult && (
          <ResultDisplay
            sqFt={ringResult.squareFeet}
            sqYd={ringResult.squareYards}
            sqM={ringResult.squareMeters}
            acres={ringResult.acres}
            cost={ringResult.estimatedCost}
            secondaryLabel="Inner Diameter"
            secondaryValue={`${ringResult.innerDiameterFt} ft`}
          />
        )}

        <SavedEstimatesDrawer
          {...ringSaved}
          cardTitle="Ring"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 5: TRIANGLE ═══════════════════ */}
      <CardWrapper
        title="Triangle with Edge Lengths & Base/Height"
        hasResult={!!triResult}
        isSaved={triSaveSuccess}
        savedCount={triSaved.saved.length}
        onToggleSaved={() => triSaved.setIsOpen(!triSaved.isOpen)}
        onSave={() => {
          if (!triResult) return;
          triSaved.save(`Triangle: ${triResult.squareFeet} sq ft`, triResult);
          flashSave(setTriSaveSuccess);
        }}
      >
        <div className="flex gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setTriMode("edges")}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
              triMode === "edges"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            Triangle with Edge Lengths
          </button>
          <button
            type="button"
            onClick={() => setTriMode("base_height")}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
              triMode === "base_height"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            Triangle with Base &amp; Height
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {triMode === "edges" ? (
              <>
                <InputRow label="Edge 1 (a)" value={triEdge1} onChange={setTriEdge1} unit={triUnit} onUnitChange={setTriUnit} />
                <InputRow label="Edge 2 (b)" value={triEdge2} onChange={setTriEdge2} unit={triUnit} onUnitChange={setTriUnit} />
                <InputRow label="Edge 3 (c)" value={triEdge3} onChange={setTriEdge3} unit={triUnit} onUnitChange={setTriUnit} />
              </>
            ) : (
              <>
                <InputRow label="Base" value={triBase} onChange={setTriBase} unit={triUnit} onUnitChange={setTriUnit} />
                <InputRow label="Height" value={triHeight} onChange={setTriHeight} unit={triUnit} onUnitChange={setTriUnit} />
              </>
            )}

            <InputRow label="Quantity" value={triQty} onChange={setTriQty} min={1} step={1} showUnit={false} />
            <InputRow label="Price (optional)" value={triPrice} onChange={setTriPrice} unit={triPriceUnit} onUnitChange={setTriPriceUnit} unitOptions={PRICE_UNITS} min={0} />

            <div className="flex gap-2 pt-1">
              <Button onClick={handleTriCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setTriEdge1("30");
                  setTriEdge2("45");
                  setTriEdge3("50");
                  setTriBase("30");
                  setTriHeight("20");
                  setTriQty("1");
                  setTriPrice("");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {triMode === "edges" ? <TriangleEdgesSvg /> : <TriangleBaseHeightSvg />}
          </div>
        </div>

        {triResult && (
          <ResultDisplay
            sqFt={triResult.squareFeet}
            sqYd={triResult.squareYards}
            sqM={triResult.squareMeters}
            acres={triResult.acres}
            cost={triResult.estimatedCost}
          />
        )}

        <SavedEstimatesDrawer
          {...triSaved}
          cardTitle="Triangle"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 6: TRAPEZOID ═══════════════════ */}
      <CardWrapper
        title="Trapezoid"
        hasResult={!!trapResult}
        isSaved={trapSaveSuccess}
        savedCount={trapSaved.saved.length}
        onToggleSaved={() => trapSaved.setIsOpen(!trapSaved.isOpen)}
        onSave={() => {
          if (!trapResult) return;
          trapSaved.save(`Base1: ${trapBase1}, Base2: ${trapBase2}, H: ${trapHeight} ${trapUnit}`, trapResult);
          flashSave(setTrapSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow label="Base 1" value={trapBase1} onChange={setTrapBase1} unit={trapUnit} onUnitChange={setTrapUnit} />
            <InputRow label="Base 2" value={trapBase2} onChange={setTrapBase2} unit={trapUnit} onUnitChange={setTrapUnit} />
            <InputRow label="Height" value={trapHeight} onChange={setTrapHeight} unit={trapUnit} onUnitChange={setTrapUnit} />
            <InputRow label="Quantity" value={trapQty} onChange={setTrapQty} min={1} step={1} showUnit={false} />
            <InputRow label="Price (optional)" value={trapPrice} onChange={setTrapPrice} unit={trapPriceUnit} onUnitChange={setTrapPriceUnit} unitOptions={PRICE_UNITS} min={0} />

            <div className="flex gap-2 pt-1">
              <Button onClick={handleTrapCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setTrapBase1("30");
                  setTrapBase2("45");
                  setTrapHeight("20");
                  setTrapQty("1");
                  setTrapPrice("");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <TrapezoidSvg />
          </div>
        </div>

        {trapResult && (
          <ResultDisplay
            sqFt={trapResult.squareFeet}
            sqYd={trapResult.squareYards}
            sqM={trapResult.squareMeters}
            acres={trapResult.acres}
            cost={trapResult.estimatedCost}
          />
        )}

        <SavedEstimatesDrawer
          {...trapSaved}
          cardTitle="Trapezoid"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 7: SECTOR ═══════════════════ */}
      <CardWrapper
        title="Sector"
        hasResult={!!sectorResult}
        isSaved={sectorSaveSuccess}
        savedCount={sectorSaved.saved.length}
        onToggleSaved={() => sectorSaved.setIsOpen(!sectorSaved.isOpen)}
        onSave={() => {
          if (!sectorResult) return;
          sectorSaved.save(`Radius: ${sectorRadius} ${sectorUnit}, Angle: ${sectorAngle}°`, sectorResult);
          flashSave(setSectorSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow label="Radius" value={sectorRadius} onChange={setSectorRadius} unit={sectorUnit} onUnitChange={setSectorUnit} />
            <InputRow label="Angle (degree °)" value={sectorAngle} onChange={setSectorAngle} min={1} max={360} step={1} showUnit={false} />
            <InputRow label="Quantity" value={sectorQty} onChange={setSectorQty} min={1} step={1} showUnit={false} />
            <InputRow label="Price (optional)" value={sectorPrice} onChange={setSectorPrice} unit={sectorPriceUnit} onUnitChange={setSectorPriceUnit} unitOptions={PRICE_UNITS} min={0} />

            <div className="flex gap-2 pt-1">
              <Button onClick={handleSectorCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSectorRadius("30");
                  setSectorAngle("90");
                  setSectorQty("1");
                  setSectorPrice("");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <SectorSvg />
          </div>
        </div>

        {sectorResult && (
          <ResultDisplay
            sqFt={sectorResult.squareFeet}
            sqYd={sectorResult.squareYards}
            sqM={sectorResult.squareMeters}
            acres={sectorResult.acres}
            cost={sectorResult.estimatedCost}
            secondaryLabel="Arc Length"
            secondaryValue={`${sectorResult.arcLengthFt} ft`}
          />
        )}

        <SavedEstimatesDrawer
          {...sectorSaved}
          cardTitle="Sector"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 8: PARALLELOGRAM ═══════════════════ */}
      <CardWrapper
        title="Parallelogram"
        hasResult={!!paraResult}
        isSaved={paraSaveSuccess}
        savedCount={paraSaved.saved.length}
        onToggleSaved={() => paraSaved.setIsOpen(!paraSaved.isOpen)}
        onSave={() => {
          if (!paraResult) return;
          paraSaved.save(`Base: ${paraBase}, Height: ${paraHeight} ${paraUnit}`, paraResult);
          flashSave(setParaSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow label="Base" value={paraBase} onChange={setParaBase} unit={paraUnit} onUnitChange={setParaUnit} />
            <InputRow label="Height" value={paraHeight} onChange={setParaHeight} unit={paraUnit} onUnitChange={setParaUnit} />
            <InputRow label="Quantity" value={paraQty} onChange={setParaQty} min={1} step={1} showUnit={false} />
            <InputRow label="Price (optional)" value={paraPrice} onChange={setParaPrice} unit={paraPriceUnit} onUnitChange={setParaPriceUnit} unitOptions={PRICE_UNITS} min={0} />

            <div className="flex gap-2 pt-1">
              <Button onClick={handleParaCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setParaBase("30");
                  setParaHeight("20");
                  setParaQty("1");
                  setParaPrice("");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <ParallelogramSvg />
          </div>
        </div>

        {paraResult && (
          <ResultDisplay
            sqFt={paraResult.squareFeet}
            sqYd={paraResult.squareYards}
            sqM={paraResult.squareMeters}
            acres={paraResult.acres}
            cost={paraResult.estimatedCost}
          />
        )}

        <SavedEstimatesDrawer
          {...paraSaved}
          cardTitle="Parallelogram"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 9: MATERIAL ESTIMATOR ═══════════════════ */}
      <CardWrapper title="Material Packaging & Trade Estimator">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Target Surface Area:
              </label>
              <Input
                type="number"
                value={materialPresetSqFt}
                onChange={(e) => setMaterialPresetSqFt(e.target.value)}
                min={1}
                className="w-28 h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
              <span className="text-xs text-zinc-500 font-medium">sq ft</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Auto-synced from latest calculation</span>
            </div>
          </div>

          {materials && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Tile Boxes</span>
                <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                  {materials.tileBoxes}
                </span>
                <span className="text-[10px] text-zinc-400 block">@ 10 sq ft/box</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Hardwood Flooring</span>
                <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                  {materials.hardwoodCartons}
                </span>
                <span className="text-[10px] text-zinc-400 block">@ 20 sq ft/carton</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Wall Paint</span>
                <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                  {materials.paintGallons}
                </span>
                <span className="text-[10px] text-zinc-400 block">gallons (1 coat)</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Lawn Sod Turf</span>
                <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                  {materials.sodRolls}
                </span>
                <span className="text-[10px] text-zinc-400 block">rolls (10 sq ft/roll)</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Carpet Area</span>
                <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                  {materials.carpetYards}
                </span>
                <span className="text-[10px] text-zinc-400 block">square yards (yd²)</span>
              </div>
            </div>
          )}
        </div>
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
