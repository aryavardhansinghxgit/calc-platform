"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Download,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  PieChart as PieIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  LengthUnit,
  ConcreteResult,
  MixRatioPreset,
  calculateSlabVolume,
  calculateColumnVolume,
  calculateTubeVolume,
  calculateCurbVolume,
  calculateStairsVolume,
  estimateMixMaterials,
  estimateCost,
  DEFAULT_CONCRETE_DENSITY_LBS_PER_CUFT,
} from "@/lib/calculator-engine/formulas/concrete";

// ─── Shared Types ────────────────────────────────────────────────────────────

interface SavedEstimate {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: ConcreteResult;
  notes: string;
}

const UNIT_OPTIONS: { value: LengthUnit; label: string }[] = [
  { value: "feet", label: "feet" },
  { value: "inches", label: "inches" },
  { value: "yards", label: "yards" },
  { value: "meters", label: "meters" },
  { value: "centimeters", label: "cm" },
];

const CHART_COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function useSavedEstimates(storageKey: string) {
  const [saved, setSaved] = useState<SavedEstimate[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setSaved(JSON.parse(stored));
    } catch { /* ignore */ }
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: ConcreteResult, notes: string = "") => {
      const entry: SavedEstimate = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        timestamp: new Date().toLocaleString(),
        inputSummary,
        result,
        notes,
      };
      setSaved((prev) => {
        const updated = [entry, ...prev].slice(0, 20);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
      setIsOpen(true);
    },
    [storageKey],
  );

  const remove = useCallback(
    (id: string) => {
      setSaved((prev) => {
        const updated = prev.filter((s) => s.id !== id);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
    },
    [storageKey],
  );

  const clearAll = useCallback(() => {
    setSaved([]);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return { saved, isOpen, setIsOpen, save, remove, clearAll };
}

function UnitSelect({ value, onChange }: { value: LengthUnit; onChange: (v: LengthUnit) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as LengthUnit)}
      className="h-8 rounded border border-blue-200 dark:border-blue-800 bg-white dark:bg-zinc-900 text-xs font-medium text-blue-700 dark:text-blue-300 px-2 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
    >
      {UNIT_OPTIONS.map((u) => (
        <option key={u.value} value={u.value}>
          {u.label}
        </option>
      ))}
    </select>
  );
}

// ─── Compact & Plain Result Display ──────────────────────────────────────────

function ResultDisplay({ result }: { result: ConcreteResult | null }) {
  if (!result) return null;
  return (
    <div className="mt-3 p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60 text-xs space-y-2">
      {/* Volume Summary */}
      <div className="flex flex-wrap items-baseline gap-x-2 text-zinc-800 dark:text-zinc-200">
        <span className="font-bold text-zinc-700 dark:text-zinc-300">Volume:</span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-sans tabular-nums">{result.cubicFeet}</span> cubic feet
        <span className="text-zinc-400">or</span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-sans tabular-nums">{result.cubicYards}</span> cubic yards
        <span className="text-zinc-400">or</span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-sans tabular-nums">{result.cubicMeters}</span> cubic meters
      </div>

      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-0.5 border-t border-slate-200/80 dark:border-zinc-700/50">
        If using pre-mixed concrete with density of 2,130 kg/m³ or 133 lbs/ft³:
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-zinc-700 dark:text-zinc-300 font-sans tabular-nums">
        <div>
          <span className="text-zinc-500 font-normal">Weight needed: </span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">{result.weightLbs.toLocaleString()}</span> lbs
          <span className="text-zinc-400 font-normal"> or </span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">{result.weightKg.toLocaleString()}</span> kg
        </div>
        <div>
          <span className="text-zinc-500 font-normal">Using 40-lb bags: </span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">{result.bags40lb}</span> bags
        </div>
        <div>
          <span className="text-zinc-500 font-normal">Using 50-lb bags: </span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">{result.bags50lb}</span> bags
        </div>
        <div>
          <span className="text-zinc-500 font-normal">Using 60-lb bags: </span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">{result.bags60lb}</span> bags
        </div>
        <div>
          <span className="text-zinc-500 font-normal">Using 80-lb bags: </span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">{result.bags80lb}</span> bags
        </div>
        {result.truckLoads > 0 && (
          <div>
            <span className="text-zinc-500 font-normal">Ready-mix trucks: </span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100">{result.truckLoads}</span> trucks (10 yd³/truck)
          </div>
        )}
      </div>

      <div className="text-[10px] text-zinc-400 dark:text-zinc-500 italic pt-0.5">
        * Different types of concrete can have very different densities.
      </div>
    </div>
  );
}

function SavedEstimatesDrawer({
  saved,
  isOpen,
  setIsOpen,
  remove,
  clearAll,
  cardTitle,
}: {
  saved: SavedEstimate[];
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  remove: (id: string) => void;
  clearAll: () => void;
  cardTitle: string;
}) {
  if (saved.length === 0) return null;

  const exportCSV = () => {
    const headers = "Timestamp,Inputs,Cubic Feet,Cubic Yards,Cubic Meters,Weight (lbs),Weight (kg),40lb Bags,50lb Bags,60lb Bags,80lb Bags,Trucks\n";
    const rows = saved
      .map(
        (s) =>
          `"${s.timestamp}","${s.inputSummary}",${s.result.cubicFeet},${s.result.cubicYards},${s.result.cubicMeters},${s.result.weightLbs},${s.result.weightKg},${s.result.bags40lb},${s.result.bags50lb},${s.result.bags60lb},${s.result.bags80lb},${s.result.truckLoads}`,
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cardTitle.toLowerCase().replace(/\s+/g, "-")}-estimates.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3 border border-blue-200 dark:border-blue-800/60 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-xs font-semibold text-blue-700 dark:text-blue-300 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-950/60 transition-colors"
      >
        <span>Saved Estimates ({saved.length})</span>
        {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
      {isOpen && (
        <div className="p-2.5 space-y-2 bg-white dark:bg-zinc-900">
          <div className="flex items-center justify-end gap-2 mb-1">
            <button
              type="button"
              onClick={exportCSV}
              className="flex items-center gap-1 text-[10px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <Download className="h-3 w-3" /> CSV
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="flex items-center gap-1 text-[10px] font-semibold text-red-500 hover:text-red-700 cursor-pointer"
            >
              <Trash2 className="h-3 w-3" /> Clear All
            </button>
          </div>
          <div className="max-h-48 overflow-y-auto space-y-1.5">
            {saved.map((s) => (
              <div key={s.id} className="p-2 bg-slate-50 dark:bg-zinc-950 rounded border border-slate-200 dark:border-zinc-800 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-blue-700 dark:text-blue-300 font-sans tabular-nums">{s.result.cubicYards} yd³</span>
                    <span className="text-zinc-400 mx-1">|</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{s.result.cubicFeet} ft³</span>
                    <span className="text-zinc-400 mx-1">|</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{s.result.cubicMeters} m³</span>
                    <p className="text-[10px] text-zinc-400 mt-0.5 truncate">{s.inputSummary}</p>
                    <p className="text-[10px] text-zinc-400">{s.timestamp}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(s.id)}
                    className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer flex-shrink-0"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Subheading Card Wrapper with Navbar Matching Color & Right Save Button ───

function CardWrapper({
  title,
  onSave,
  isSaved,
  hasResult,
  savedCount,
  onToggleSaved,
  children,
}: {
  title: string;
  onSave?: () => void;
  isSaved?: boolean;
  hasResult?: boolean;
  savedCount?: number;
  onToggleSaved?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-blue-600/30 dark:border-blue-500/20 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-zinc-900">
      {/* Subheading bar: Exact navbar bg-blue-600 color with reduced vertical padding */}
      <div className="bg-blue-600 px-3.5 py-1.5 flex items-center justify-between text-white select-none">
        <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">{title}</h3>
        <div className="flex items-center gap-2">
          {savedCount !== undefined && savedCount > 0 && onToggleSaved && (
            <button
              type="button"
              onClick={onToggleSaved}
              className="text-[11px] font-medium px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              title="Toggle Saved Estimates"
            >
              Saved ({savedCount})
            </button>
          )}
          {onSave && (
            <button
              type="button"
              onClick={onSave}
              disabled={!hasResult}
              className={`text-xs font-semibold px-2.5 py-0.5 rounded transition-all cursor-pointer ${
                isSaved
                  ? "bg-emerald-500 text-white shadow-xs"
                  : hasResult
                  ? "bg-white text-blue-600 hover:bg-blue-50 font-bold shadow-xs"
                  : "bg-white/20 text-white/60 cursor-not-allowed"
              }`}
              title={hasResult ? "Save this calculation" : "Calculate first to save"}
            >
              {isSaved ? "Saved!" : "Save"}
            </button>
          )}
        </div>
      </div>
      <div className="p-3.5 sm:p-4">{children}</div>
    </div>
  );
}

function InputRow({
  label,
  value,
  onChange,
  unit,
  onUnitChange,
  min = 0,
  step = 0.5,
  showUnit = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: LengthUnit;
  onUnitChange?: (v: LengthUnit) => void;
  min?: number;
  step?: number;
  showUnit?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 w-36 flex-shrink-0">
        {label}
      </label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        step={step}
        className="h-8 text-xs font-sans tabular-nums font-semibold w-24 flex-shrink-0"
      />
      {showUnit && unit && onUnitChange && <UnitSelect value={unit} onChange={onUnitChange} />}
    </div>
  );
}

// ─── High Quality 3D Vector Diagrams with Precision Measurement Notations ────

function SlabDiagram({ l, w, h }: { l: number; w: number; h: number }) {
  return (
    <svg viewBox="0 0 200 130" className="w-full max-w-[170px] mx-auto select-none" aria-label="Slab 3D Diagram">
      <g transform="translate(25, 15)">
        {/* Top Face */}
        <polygon points="0,35 45,10 145,10 100,35" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Front Face */}
        <polygon points="0,35 100,35 100,65 0,65" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Right Face */}
        <polygon points="100,35 145,10 145,40 100,65" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Dimension Labels matching calculator.net */}
        {/* Length (l) bottom dimension */}
        <text x="50" y="80" textAnchor="middle" className="text-[11px] fill-blue-600 dark:fill-blue-400 font-semibold">
          l {l > 0 ? `(${l})` : ""}
        </text>
        {/* Width (w) top-right dimension */}
        <text x="135" y="60" textAnchor="start" className="text-[11px] fill-blue-600 dark:fill-blue-400 font-semibold">
          w {w > 0 ? `(${w})` : ""}
        </text>
        {/* Height (h) right vertical dimension */}
        <text x="152" y="28" textAnchor="start" className="text-[11px] fill-blue-600 dark:fill-blue-400 font-semibold">
          h {h > 0 ? `(${h})` : ""}
        </text>
      </g>
    </svg>
  );
}

function ColumnDiagram({ d, h }: { d: number; h: number }) {
  return (
    <svg viewBox="0 0 160 140" className="w-full max-w-[140px] mx-auto select-none" aria-label="Column 3D Diagram">
      <g transform="translate(30, 15)">
        {/* Top Ellipse */}
        <ellipse cx="45" cy="20" rx="35" ry="10" fill="none" stroke="#2563eb" strokeWidth="1.5" />
        {/* Left and Right Side Lines */}
        <line x1="10" y1="20" x2="10" y2="85" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="80" y1="20" x2="80" y2="85" stroke="#2563eb" strokeWidth="1.5" />
        {/* Bottom Ellipse */}
        <path d="M10,85 A35,10 0 0,0 80,85 A35,10 0 0,0 10,85" fill="none" stroke="#2563eb" strokeWidth="1.5" />

        {/* Diameter (d) notation at top */}
        <line x1="10" y1="10" x2="80" y2="10" stroke="#2563eb" strokeWidth="1" strokeDasharray="3,2" />
        <text x="45" y="7" textAnchor="middle" className="text-[11px] fill-blue-600 dark:fill-blue-400 font-semibold">
          d {d > 0 ? `(${d})` : ""}
        </text>

        {/* Height (h) notation at right */}
        <line x1="88" y1="20" x2="88" y2="85" stroke="#2563eb" strokeWidth="1" />
        <text x="94" y="56" textAnchor="start" className="text-[11px] fill-blue-600 dark:fill-blue-400 font-semibold">
          h {h > 0 ? `(${h})` : ""}
        </text>
      </g>
    </svg>
  );
}

function TubeDiagram({ d1, d2 }: { d1: number; d2: number }) {
  return (
    <svg viewBox="0 0 170 145" className="w-full max-w-[150px] mx-auto select-none" aria-label="Tube 3D Diagram">
      <g transform="translate(15, 12)">
        {/* Outer Top Ellipse */}
        <ellipse cx="65" cy="25" rx="50" ry="14" fill="none" stroke="#2563eb" strokeWidth="1.5" />
        {/* Inner Top Ellipse */}
        <ellipse cx="65" cy="25" rx="28" ry="8" fill="none" stroke="#2563eb" strokeWidth="1.5" />
        
        {/* Sides */}
        <line x1="15" y1="25" x2="15" y2="85" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="115" y1="25" x2="115" y2="85" stroke="#2563eb" strokeWidth="1.5" />
        
        {/* Outer Bottom Ellipse */}
        <path d="M15,85 A50,14 0 0,0 115,85" fill="none" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M15,85 A50,14 0 0,1 115,85" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="3,2" />

        {/* d2 dimension top */}
        <line x1="37" y1="8" x2="93" y2="8" stroke="#2563eb" strokeWidth="1" />
        <path d="M37,5 L37,11 M93,5 L93,11" stroke="#2563eb" strokeWidth="1" />
        <text x="65" y="6" textAnchor="middle" className="text-[10px] fill-blue-600 dark:fill-blue-400 font-semibold">
          |--d2--|
        </text>

        {/* d1 dimension bottom */}
        <line x1="15" y1="112" x2="115" y2="112" stroke="#2563eb" strokeWidth="1" />
        <path d="M15,108 L15,116 M115,108 L115,116" stroke="#2563eb" strokeWidth="1" />
        <text x="65" y="125" textAnchor="middle" className="text-[10px] fill-blue-600 dark:fill-blue-400 font-semibold">
          |--d1--|
        </text>

        {/* Height (h) notation */}
        <text x="5" y="58" textAnchor="middle" className="text-[10px] fill-blue-600 dark:fill-blue-400 font-semibold">
          h
        </text>
      </g>
    </svg>
  );
}

function CurbDiagram() {
  return (
    <svg viewBox="0 0 220 150" className="w-full max-w-[190px] mx-auto select-none" aria-label="Curb and Gutter 3D Diagram">
      <g transform="translate(10, 10)">
        {/* 3D Isometric Extruded L-shape */}
        {/* Front L-profile */}
        <polygon
          points="25,35 25,100 95,100 95,85 45,85 45,35"
          fill="none"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Extruded Perspective lines to back */}
        <line x1="25" y1="35" x2="80" y2="10" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="45" y1="35" x2="100" y2="10" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="45" y1="85" x2="100" y2="60" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="95" y1="85" x2="150" y2="60" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="95" y1="100" x2="150" y2="75" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Back Edges */}
        <line x1="80" y1="10" x2="100" y2="10" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="100" y1="10" x2="100" y2="60" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="100" y1="60" x2="150" y2="60" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="150" y1="60" x2="150" y2="75" stroke="#2563eb" strokeWidth="1.5" />

        {/* Labels matching calculator.net */}
        {/* Curb Depth (top) */}
        <text x="35" y="24" textAnchor="middle" className="text-[8.5px] fill-blue-600 dark:fill-blue-400 font-semibold">
          Curb Depth
        </text>
        <line x1="25" y1="28" x2="45" y2="28" stroke="#2563eb" strokeWidth="0.8" />

        {/* Curb Height (vertical on left) */}
        <text x="5" y="65" textAnchor="middle" className="text-[8.5px] fill-blue-600 dark:fill-blue-400 font-semibold" transform="rotate(-90, 5, 65)">
          Curb Height
        </text>

        {/* Gutter Width */}
        <text x="65" y="112" textAnchor="middle" className="text-[8.5px] fill-blue-600 dark:fill-blue-400 font-semibold">
          Gutter Width
        </text>

        {/* Flag Thickness */}
        <text x="145" y="92" textAnchor="start" className="text-[8px] fill-blue-600 dark:fill-blue-400 font-semibold">
          Flag Thickness
        </text>

        {/* Length along extrusion */}
        <text x="120" y="32" textAnchor="start" className="text-[9px] fill-blue-600 dark:fill-blue-400 font-semibold" transform="rotate(-24, 120, 32)">
          Length →
        </text>
      </g>
    </svg>
  );
}

function StairsDiagram() {
  return (
    <svg viewBox="0 0 280 185" className="w-full max-w-[230px] mx-auto select-none" aria-label="Stairs 3D Diagram">
      <defs>
        <marker id="stair-arrow-start" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M5,0.5 L1,3 L5,5.5 Z" fill="#2563eb" />
        </marker>
        <marker id="stair-arrow-end" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M1,0.5 L5,3 L1,5.5 Z" fill="#2563eb" />
        </marker>
      </defs>

      {/* Solid Left Side Profile Face - Straight vertical back and base */}
      <path
        d="M 20,165 L 20,48 L 95,48 L 95,68 L 120,68 L 120,88 L 145,88 L 145,108 L 170,108 L 170,128 L 195,128 L 195,148 L 220,148 L 220,165 Z"
        fill="none"
        stroke="#27272a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="dark:stroke-zinc-300"
      />

      {/* Platform Top Face */}
      <polygon
        points="20,48 95,48 122,24 47,24"
        fill="none"
        stroke="#27272a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="dark:stroke-zinc-300"
      />

      {/* Step 5 Riser Face */}
      <polygon
        points="95,48 95,68 122,44 122,24"
        fill="none"
        stroke="#27272a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="dark:stroke-zinc-300"
      />
      {/* Step 5 Tread Top */}
      <polygon
        points="95,68 120,68 147,44 122,44"
        fill="none"
        stroke="#27272a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="dark:stroke-zinc-300"
      />

      {/* Step 4 Riser Face */}
      <polygon
        points="120,68 120,88 147,64 147,44"
        fill="none"
        stroke="#27272a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="dark:stroke-zinc-300"
      />
      {/* Step 4 Tread Top */}
      <polygon
        points="120,88 145,88 172,64 147,64"
        fill="none"
        stroke="#27272a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="dark:stroke-zinc-300"
      />

      {/* Step 3 Riser Face */}
      <polygon
        points="145,88 145,108 172,84 172,64"
        fill="none"
        stroke="#27272a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="dark:stroke-zinc-300"
      />
      {/* Step 3 Tread Top */}
      <polygon
        points="145,108 170,108 197,84 172,84"
        fill="none"
        stroke="#27272a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="dark:stroke-zinc-300"
      />

      {/* Step 2 Riser Face */}
      <polygon
        points="170,108 170,128 197,104 197,84"
        fill="none"
        stroke="#27272a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="dark:stroke-zinc-300"
      />
      {/* Step 2 Tread Top */}
      <polygon
        points="170,128 195,128 222,104 197,104"
        fill="none"
        stroke="#27272a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="dark:stroke-zinc-300"
      />

      {/* Step 1 Riser Face */}
      <polygon
        points="195,128 195,148 222,124 222,104"
        fill="none"
        stroke="#27272a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="dark:stroke-zinc-300"
      />
      {/* Step 1 Tread Top */}
      <polygon
        points="195,148 220,148 247,124 222,124"
        fill="none"
        stroke="#27272a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="dark:stroke-zinc-300"
      />

      {/* Step 1 Front Bottom Right Face */}
      <polygon
        points="220,148 220,165 247,141 247,124"
        fill="none"
        stroke="#27272a"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="dark:stroke-zinc-300"
      />

      {/* Step numbers on the near side riser faces */}
      <text x="89" y="60" className="text-[10px] fill-blue-600 dark:fill-blue-400 font-bold" textAnchor="middle">5</text>
      <text x="114" y="80" className="text-[10px] fill-blue-600 dark:fill-blue-400 font-bold" textAnchor="middle">4</text>
      <text x="139" y="100" className="text-[10px] fill-blue-600 dark:fill-blue-400 font-bold" textAnchor="middle">3</text>
      <text x="164" y="120" className="text-[10px] fill-blue-600 dark:fill-blue-400 font-bold" textAnchor="middle">2</text>
      <text x="189" y="140" className="text-[10px] fill-blue-600 dark:fill-blue-400 font-bold" textAnchor="middle">1</text>

      {/* ─── Blue Dimension Annotations ─── */}

      {/* 1. Platform Depth Notation */}
      <g>
        <text x="57.5" y="11" textAnchor="middle" className="text-[9.5px] fill-blue-600 dark:fill-blue-400 font-medium">
          Platform Depth
        </text>
        <line x1="20" y1="18" x2="95" y2="18" stroke="#2563eb" strokeWidth="1" markerStart="url(#stair-arrow-start)" markerEnd="url(#stair-arrow-end)" />
        <line x1="20" y1="14" x2="20" y2="22" stroke="#2563eb" strokeWidth="1" />
        <line x1="95" y1="14" x2="95" y2="22" stroke="#2563eb" strokeWidth="1" />
      </g>

      {/* 2. Run Notation (on Step 5) */}
      <g>
        <text x="133" y="27" textAnchor="middle" className="text-[9.5px] fill-blue-600 dark:fill-blue-400 font-medium">
          Run
        </text>
        <line x1="122" y1="34" x2="147" y2="34" stroke="#2563eb" strokeWidth="1" markerStart="url(#stair-arrow-start)" markerEnd="url(#stair-arrow-end)" />
        <line x1="122" y1="30" x2="122" y2="38" stroke="#2563eb" strokeWidth="1" />
        <line x1="147" y1="30" x2="147" y2="38" stroke="#2563eb" strokeWidth="1" />
      </g>

      {/* 3. Rise Notation (on the rightmost step 4 riser) */}
      <g>
        <line x1="178" y1="44" x2="178" y2="64" stroke="#2563eb" strokeWidth="1" markerStart="url(#stair-arrow-start)" markerEnd="url(#stair-arrow-end)" />
        <line x1="174" y1="44" x2="182" y2="44" stroke="#2563eb" strokeWidth="1" />
        <line x1="174" y1="64" x2="182" y2="64" stroke="#2563eb" strokeWidth="1" />
        <text x="185" y="57" textAnchor="start" className="text-[9.5px] fill-blue-600 dark:fill-blue-400 font-medium">
          Rise
        </text>
      </g>

      {/* 4. Width Notation (on bottom step diagonal edge) */}
      <g transform="translate(237, 160)">
        <text
          x="0"
          y="0"
          textAnchor="start"
          className="text-[10px] fill-blue-600 dark:fill-blue-400 font-medium"
          transform="rotate(40)"
        >
          Width
        </text>
      </g>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════════════════════

export function ConcreteCalculator() {
  // ─── Card 1: Slab State ──────────────────────────────────────────────────
  const [slabLength, setSlabLength] = useState("5");
  const [slabWidth, setSlabWidth] = useState("2.5");
  const [slabHeight, setSlabHeight] = useState("5");
  const [slabLengthUnit, setSlabLengthUnit] = useState<LengthUnit>("feet");
  const [slabWidthUnit, setSlabWidthUnit] = useState<LengthUnit>("feet");
  const [slabHeightUnit, setSlabHeightUnit] = useState<LengthUnit>("inches");
  const [slabQty, setSlabQty] = useState("1");
  const [slabWastage, setSlabWastage] = useState("0");
  const [slabDensity, setSlabDensity] = useState(String(DEFAULT_CONCRETE_DENSITY_LBS_PER_CUFT));
  const [slabResult, setSlabResult] = useState<ConcreteResult | null>(null);
  const [slabSaveSuccess, setSlabSaveSuccess] = useState(false);
  const slabSaved = useSavedEstimates("concrete_saved_slab");

  // ─── Card 2: Column State ────────────────────────────────────────────────
  const [colDiameter, setColDiameter] = useState("2.5");
  const [colHeight, setColHeight] = useState("6");
  const [colDiaUnit, setColDiaUnit] = useState<LengthUnit>("feet");
  const [colHeightUnit, setColHeightUnit] = useState<LengthUnit>("feet");
  const [colQty, setColQty] = useState("1");
  const [colWastage, setColWastage] = useState("0");
  const [colResult, setColResult] = useState<ConcreteResult | null>(null);
  const [colSaveSuccess, setColSaveSuccess] = useState(false);
  const colSaved = useSavedEstimates("concrete_saved_column");

  // ─── Card 3: Tube State ──────────────────────────────────────────────────
  const [tubeOuter, setTubeOuter] = useState("5");
  const [tubeInner, setTubeInner] = useState("4");
  const [tubeHeight, setTubeHeight] = useState("6");
  const [tubeOuterUnit, setTubeOuterUnit] = useState<LengthUnit>("feet");
  const [tubeInnerUnit, setTubeInnerUnit] = useState<LengthUnit>("feet");
  const [tubeHeightUnit, setTubeHeightUnit] = useState<LengthUnit>("inches");
  const [tubeQty, setTubeQty] = useState("1");
  const [tubeWastage, setTubeWastage] = useState("0");
  const [tubeResult, setTubeResult] = useState<ConcreteResult | null>(null);
  const [tubeSaveSuccess, setTubeSaveSuccess] = useState(false);
  const tubeSaved = useSavedEstimates("concrete_saved_tube");

  // Tube validation: d2 (inner diameter) must be less than d1 (outer diameter)
  const isTubeInvalid = useMemo(() => {
    const o = Number(tubeOuter) || 0;
    const i = Number(tubeInner) || 0;
    return o > 0 && i >= o;
  }, [tubeOuter, tubeInner]);

  // ─── Card 4: Curb State ──────────────────────────────────────────────────
  const [curbDepth, setCurbDepth] = useState("4");
  const [gutterWidth, setGutterWidth] = useState("10");
  const [curbHeightVal, setCurbHeightVal] = useState("4");
  const [flagThickness, setFlagThickness] = useState("5");
  const [curbLength, setCurbLength] = useState("10");
  const [curbDepthUnit, setCurbDepthUnit] = useState<LengthUnit>("inches");
  const [gutterWidthUnit, setGutterWidthUnit] = useState<LengthUnit>("inches");
  const [curbHeightUnit, setCurbHeightUnit] = useState<LengthUnit>("inches");
  const [flagThicknessUnit, setFlagThicknessUnit] = useState<LengthUnit>("inches");
  const [curbLengthUnit, setCurbLengthUnit] = useState<LengthUnit>("feet");
  const [curbQty, setCurbQty] = useState("1");
  const [curbResult, setCurbResult] = useState<ConcreteResult | null>(null);
  const [curbSaveSuccess, setCurbSaveSuccess] = useState(false);
  const curbSaved = useSavedEstimates("concrete_saved_curb");

  // ─── Card 5: Stairs State ────────────────────────────────────────────────
  const [stairRun, setStairRun] = useState("12");
  const [stairRise, setStairRise] = useState("6");
  const [stairWidth, setStairWidth] = useState("50");
  const [stairPlatform, setStairPlatform] = useState("5");
  const [stairRisers, setStairRisers] = useState("5");
  const [stairRunUnit, setStairRunUnit] = useState<LengthUnit>("inches");
  const [stairRiseUnit, setStairRiseUnit] = useState<LengthUnit>("inches");
  const [stairWidthUnit, setStairWidthUnit] = useState<LengthUnit>("inches");
  const [stairPlatformUnit, setStairPlatformUnit] = useState<LengthUnit>("inches");
  const [stairResult, setStairResult] = useState<ConcreteResult | null>(null);
  const [stairSaveSuccess, setStairSaveSuccess] = useState(false);
  const stairSaved = useSavedEstimates("concrete_saved_stairs");

  // ─── Cost Estimator State ────────────────────────────────────────────────
  const [costPer40, setCostPer40] = useState("3.50");
  const [costPer50, setCostPer50] = useState("4.50");
  const [costPer60, setCostPer60] = useState("5.50");
  const [costPer80, setCostPer80] = useState("6.50");
  const [costPerYard, setCostPerYard] = useState("125");
  const [mixRatio, setMixRatio] = useState<MixRatioPreset>("1:2:4");
  const [flyAshPct, setFlyAshPct] = useState("0");

  // ─── Report Modal ────────────────────────────────────────────────────────
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Helper: flash save success
  const flashSave = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  // ─── Calculations ────────────────────────────────────────────────────────

  const handleSlabCalc = () => {
    const r = calculateSlabVolume(
      Number(slabLength) || 0, Number(slabWidth) || 0, Number(slabHeight) || 0,
      slabLengthUnit, slabWidthUnit, slabHeightUnit,
      Number(slabQty) || 1, Number(slabWastage) || 0, Number(slabDensity) || DEFAULT_CONCRETE_DENSITY_LBS_PER_CUFT,
    );
    setSlabResult(r);
  };

  const handleColCalc = () => {
    const r = calculateColumnVolume(
      Number(colDiameter) || 0, Number(colHeight) || 0,
      colDiaUnit, colHeightUnit,
      Number(colQty) || 1, Number(colWastage) || 0,
    );
    setColResult(r);
  };

  const handleTubeCalc = () => {
    if (isTubeInvalid) return;
    const r = calculateTubeVolume(
      Number(tubeOuter) || 0, Number(tubeInner) || 0, Number(tubeHeight) || 0,
      tubeOuterUnit, tubeInnerUnit, tubeHeightUnit,
      Number(tubeQty) || 1, Number(tubeWastage) || 0,
    );
    setTubeResult(r);
  };

  const handleCurbCalc = () => {
    const r = calculateCurbVolume(
      Number(curbDepth) || 0, Number(gutterWidth) || 0, Number(curbHeightVal) || 0,
      Number(flagThickness) || 0, Number(curbLength) || 0,
      curbDepthUnit, gutterWidthUnit, curbHeightUnit, flagThicknessUnit, curbLengthUnit,
      Number(curbQty) || 1,
    );
    setCurbResult(r);
  };

  const handleStairCalc = () => {
    const r = calculateStairsVolume(
      Number(stairRun) || 0, Number(stairRise) || 0, Number(stairWidth) || 0,
      Number(stairPlatform) || 0, Number(stairRisers) || 1,
      stairRunUnit, stairRiseUnit, stairWidthUnit, stairPlatformUnit,
    );
    setStairResult(r);
  };

  // ─── Most recent result for cost estimator ───────────────────────────────

  const latestResult = stairResult || curbResult || tubeResult || colResult || slabResult;

  const costEstimate = useMemo(() => {
    if (!latestResult) return null;
    return estimateCost(
      latestResult,
      Number(costPer40) || 0,
      Number(costPer50) || 0,
      Number(costPer60) || 0,
      Number(costPer80) || 0,
      Number(costPerYard) || 0,
    );
  }, [latestResult, costPer40, costPer50, costPer60, costPer80, costPerYard]);

  const mixBreakdown = useMemo(() => {
    if (!latestResult) return null;
    return estimateMixMaterials(latestResult.cubicFeet, mixRatio, Number(flyAshPct) || 0);
  }, [latestResult, mixRatio, flyAshPct]);

  const pieData = useMemo(() => {
    if (!mixBreakdown) return [];
    return [
      { name: "Cement", value: mixBreakdown.cementLbs },
      { name: "Sand", value: mixBreakdown.sandLbs },
      { name: "Aggregate", value: mixBreakdown.aggregateLbs },
      { name: "Water (est.)", value: mixBreakdown.waterGallons * 8.34 },
      ...(mixBreakdown.flyAshLbs > 0 ? [{ name: "Fly Ash", value: mixBreakdown.flyAshLbs }] : []),
    ].filter((d) => d.value > 0);
  }, [mixBreakdown]);

  // ─── Report data ─────────────────────────────────────────────────────────

  const reportData: CalculatorReportData = useMemo(() => ({
    meta: {
      calculatorName: "Concrete Calculator",
      reportTitle: "Concrete Volume & Material Estimation Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: "Total Volume",
        value: latestResult ? `${latestResult.cubicYards} yd³` : "0 yd³",
        subtitle: latestResult ? `${latestResult.cubicFeet} ft³ / ${latestResult.cubicMeters} m³` : "",
        colorTheme: "blue",
      },
      {
        label: "Total Weight",
        value: latestResult ? `${latestResult.weightLbs.toLocaleString()} lbs` : "0 lbs",
        subtitle: latestResult ? `${latestResult.weightKg.toLocaleString()} kg` : "",
        colorTheme: "emerald",
      },
      {
        label: "80-lb Bags",
        value: latestResult ? `${latestResult.bags80lb}` : "0",
        subtitle: "Pre-mixed standard bags",
        colorTheme: "purple",
      },
    ],
    sections: [
      ...(slabResult
        ? [
            {
              title: "Slabs, Square Footings, or Walls",
              items: [
                { label: "Volume (ft³)", value: String(slabResult.cubicFeet) },
                { label: "Volume (yd³)", value: String(slabResult.cubicYards) },
                { label: "Volume (m³)", value: String(slabResult.cubicMeters) },
                { label: "Weight (lbs)", value: slabResult.weightLbs.toLocaleString() },
                { label: "80-lb Bags", value: String(slabResult.bags80lb) },
                { label: "60-lb Bags", value: String(slabResult.bags60lb) },
              ],
            },
          ]
        : []),
      ...(colResult
        ? [
            {
              title: "Hole, Column, or Round Footings",
              items: [
                { label: "Volume (yd³)", value: String(colResult.cubicYards) },
                { label: "Weight (lbs)", value: colResult.weightLbs.toLocaleString() },
                { label: "80-lb Bags", value: String(colResult.bags80lb) },
              ],
            },
          ]
        : []),
      ...(tubeResult
        ? [
            {
              title: "Circular Slab or Tube",
              items: [
                { label: "Volume (yd³)", value: String(tubeResult.cubicYards) },
                { label: "80-lb Bags", value: String(tubeResult.bags80lb) },
              ],
            },
          ]
        : []),
      ...(curbResult
        ? [
            {
              title: "Curb & Gutter Barrier",
              items: [
                { label: "Volume (yd³)", value: String(curbResult.cubicYards) },
                { label: "80-lb Bags", value: String(curbResult.bags80lb) },
              ],
            },
          ]
        : []),
      ...(stairResult
        ? [
            {
              title: "Stairs",
              items: [
                { label: "Volume (yd³)", value: String(stairResult.cubicYards) },
                { label: "Weight (lbs)", value: stairResult.weightLbs.toLocaleString() },
                { label: "80-lb Bags", value: String(stairResult.bags80lb) },
              ],
            },
          ]
        : []),
    ],
  }), [latestResult, slabResult, colResult, tubeResult, curbResult, stairResult]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ CARD 1: SLABS ═══════════════════ */}
      <CardWrapper
        title="Slabs, Square Footings, or Walls"
        hasResult={!!slabResult}
        isSaved={slabSaveSuccess}
        savedCount={slabSaved.saved.length}
        onToggleSaved={() => slabSaved.setIsOpen(!slabSaved.isOpen)}
        onSave={() => {
          if (!slabResult) return;
          slabSaved.save(
            `${slabLength} ${slabLengthUnit} × ${slabWidth} ${slabWidthUnit} × ${slabHeight} ${slabHeightUnit}, Qty: ${slabQty}`,
            slabResult,
          );
          flashSave(setSlabSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow label="Length (l)" value={slabLength} onChange={setSlabLength} unit={slabLengthUnit} onUnitChange={setSlabLengthUnit} />
            <InputRow label="Width (w)" value={slabWidth} onChange={setSlabWidth} unit={slabWidthUnit} onUnitChange={setSlabWidthUnit} />
            <InputRow label="Thickness or Height (h)" value={slabHeight} onChange={setSlabHeight} unit={slabHeightUnit} onUnitChange={setSlabHeightUnit} />
            <InputRow label="Quantity" value={slabQty} onChange={setSlabQty} min={1} step={1} showUnit={false} />
            <InputRow label="Wastage Margin (%)" value={slabWastage} onChange={setSlabWastage} min={0} step={1} showUnit={false} />
            <InputRow label="Density (lbs/ft³)" value={slabDensity} onChange={setSlabDensity} min={50} step={1} showUnit={false} />
            <div className="flex gap-2 pt-1">
              <Button onClick={handleSlabCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => { setSlabResult(null); setSlabLength("5"); setSlabWidth("2.5"); setSlabHeight("5"); setSlabQty("1"); setSlabWastage("0"); }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <SlabDiagram l={Number(slabLength)} w={Number(slabWidth)} h={Number(slabHeight)} />
          </div>
        </div>
        <ResultDisplay result={slabResult} />
        <SavedEstimatesDrawer {...slabSaved} cardTitle="Slab" />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: COLUMN ═══════════════════ */}
      <CardWrapper
        title="Hole, Column, or Round Footings"
        hasResult={!!colResult}
        isSaved={colSaveSuccess}
        savedCount={colSaved.saved.length}
        onToggleSaved={() => colSaved.setIsOpen(!colSaved.isOpen)}
        onSave={() => {
          if (!colResult) return;
          colSaved.save(
            `Diameter: ${colDiameter} ${colDiaUnit}, Height: ${colHeight} ${colHeightUnit}, Qty: ${colQty}`,
            colResult,
          );
          flashSave(setColSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow label="Diameter (d)" value={colDiameter} onChange={setColDiameter} unit={colDiaUnit} onUnitChange={setColDiaUnit} />
            <InputRow label="Depth or Height (h)" value={colHeight} onChange={setColHeight} unit={colHeightUnit} onUnitChange={setColHeightUnit} />
            <InputRow label="Quantity" value={colQty} onChange={setColQty} min={1} step={1} showUnit={false} />
            <InputRow label="Wastage Margin (%)" value={colWastage} onChange={setColWastage} min={0} step={1} showUnit={false} />
            <div className="flex gap-2 pt-1">
              <Button onClick={handleColCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => { setColResult(null); setColDiameter("2.5"); setColHeight("6"); setColQty("1"); setColWastage("0"); }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <ColumnDiagram d={Number(colDiameter)} h={Number(colHeight)} />
          </div>
        </div>
        <ResultDisplay result={colResult} />
        <SavedEstimatesDrawer {...colSaved} cardTitle="Column" />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: TUBE ═══════════════════ */}
      <CardWrapper
        title="Circular Slab or Tube"
        hasResult={!!tubeResult}
        isSaved={tubeSaveSuccess}
        savedCount={tubeSaved.saved.length}
        onToggleSaved={() => tubeSaved.setIsOpen(!tubeSaved.isOpen)}
        onSave={() => {
          if (!tubeResult) return;
          tubeSaved.save(
            `Outer: ${tubeOuter} ${tubeOuterUnit}, Inner: ${tubeInner} ${tubeInnerUnit}, Height: ${tubeHeight} ${tubeHeightUnit}, Qty: ${tubeQty}`,
            tubeResult,
          );
          flashSave(setTubeSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow label="Outer Diameter (d₁)" value={tubeOuter} onChange={setTubeOuter} unit={tubeOuterUnit} onUnitChange={setTubeOuterUnit} />
            <InputRow label="Inner Diameter (d₂)" value={tubeInner} onChange={setTubeInner} unit={tubeInnerUnit} onUnitChange={setTubeInnerUnit} />
            <InputRow label="Length or Height (h)" value={tubeHeight} onChange={setTubeHeight} unit={tubeHeightUnit} onUnitChange={setTubeHeightUnit} />
            <InputRow label="Quantity" value={tubeQty} onChange={setTubeQty} min={1} step={1} showUnit={false} />
            <InputRow label="Wastage Margin (%)" value={tubeWastage} onChange={setTubeWastage} min={0} step={1} showUnit={false} />

            {/* Warning when d2 >= d1 */}
            {isTubeInvalid && (
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                Inner Diameter (d₂) cannot be greater than or equal to Outer Diameter (d₁).
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleTubeCalc}
                disabled={isTubeInvalid}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer disabled:opacity-50"
              >
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => { setTubeResult(null); setTubeOuter("5"); setTubeInner("4"); setTubeHeight("6"); setTubeQty("1"); setTubeWastage("0"); }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <TubeDiagram d1={Number(tubeOuter)} d2={Number(tubeInner)} />
          </div>
        </div>
        <ResultDisplay result={tubeResult} />
        <SavedEstimatesDrawer {...tubeSaved} cardTitle="Tube" />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: CURB & GUTTER ═══════════════════ */}
      <CardWrapper
        title="Curb and Gutter Barrier"
        hasResult={!!curbResult}
        isSaved={curbSaveSuccess}
        savedCount={curbSaved.saved.length}
        onToggleSaved={() => curbSaved.setIsOpen(!curbSaved.isOpen)}
        onSave={() => {
          if (!curbResult) return;
          curbSaved.save(
            `Depth: ${curbDepth} ${curbDepthUnit}, Gutter: ${gutterWidth} ${gutterWidthUnit}, Height: ${curbHeightVal} ${curbHeightUnit}, Length: ${curbLength} ${curbLengthUnit}`,
            curbResult,
          );
          flashSave(setCurbSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow label="Curb Depth" value={curbDepth} onChange={setCurbDepth} unit={curbDepthUnit} onUnitChange={setCurbDepthUnit} />
            <InputRow label="Gutter Width" value={gutterWidth} onChange={setGutterWidth} unit={gutterWidthUnit} onUnitChange={setGutterWidthUnit} />
            <InputRow label="Curb Height" value={curbHeightVal} onChange={setCurbHeightVal} unit={curbHeightUnit} onUnitChange={setCurbHeightUnit} />
            <InputRow label="Flag Thickness" value={flagThickness} onChange={setFlagThickness} unit={flagThicknessUnit} onUnitChange={setFlagThicknessUnit} />
            <InputRow label="Length" value={curbLength} onChange={setCurbLength} unit={curbLengthUnit} onUnitChange={setCurbLengthUnit} />
            <InputRow label="Quantity" value={curbQty} onChange={setCurbQty} min={1} step={1} showUnit={false} />
            <div className="flex gap-2 pt-1">
              <Button onClick={handleCurbCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => { setCurbResult(null); setCurbDepth("4"); setGutterWidth("10"); setCurbHeightVal("4"); setFlagThickness("5"); setCurbLength("10"); setCurbQty("1"); }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <CurbDiagram />
          </div>
        </div>
        <ResultDisplay result={curbResult} />
        <SavedEstimatesDrawer {...curbSaved} cardTitle="Curb" />
      </CardWrapper>

      {/* ═══════════════════ CARD 5: STAIRS ═══════════════════ */}
      <CardWrapper
        title="Stairs"
        hasResult={!!stairResult}
        isSaved={stairSaveSuccess}
        savedCount={stairSaved.saved.length}
        onToggleSaved={() => stairSaved.setIsOpen(!stairSaved.isOpen)}
        onSave={() => {
          if (!stairResult) return;
          stairSaved.save(
            `Run: ${stairRun} ${stairRunUnit}, Rise: ${stairRise} ${stairRiseUnit}, Width: ${stairWidth} ${stairWidthUnit}, Risers: ${stairRisers}`,
            stairResult,
          );
          flashSave(setStairSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow label="Run" value={stairRun} onChange={setStairRun} unit={stairRunUnit} onUnitChange={setStairRunUnit} />
            <InputRow label="Rise" value={stairRise} onChange={setStairRise} unit={stairRiseUnit} onUnitChange={setStairRiseUnit} />
            <InputRow label="Width" value={stairWidth} onChange={setStairWidth} unit={stairWidthUnit} onUnitChange={setStairWidthUnit} />
            <InputRow label="Platform Depth" value={stairPlatform} onChange={setStairPlatform} unit={stairPlatformUnit} onUnitChange={setStairPlatformUnit} />
            <InputRow label="Number of Risers" value={stairRisers} onChange={setStairRisers} min={1} step={1} showUnit={false} />
            <div className="flex gap-2 pt-1">
              <Button onClick={handleStairCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => { setStairResult(null); setStairRun("12"); setStairRise("6"); setStairWidth("50"); setStairPlatform("5"); setStairRisers("5"); }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <StairsDiagram />
          </div>
        </div>
        <ResultDisplay result={stairResult} />
        <SavedEstimatesDrawer {...stairSaved} cardTitle="Stairs" />
      </CardWrapper>

      {/* ═══════════════════ COST & MIX ESTIMATOR ═══════════════════ */}
      <CardWrapper title="Concrete Mix & Material Cost Estimator">
        {!latestResult ? (
          <div className="text-xs text-zinc-500 py-3">
            Calculate any concrete shape above to view estimated bag prices, ready-mix truck costs, and site-mix ratios.
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cost inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">40-lb bag ($)</label>
                <Input type="number" value={costPer40} onChange={(e) => setCostPer40(e.target.value)} min={0} step={0.25} className="h-8 text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">50-lb bag ($)</label>
                <Input type="number" value={costPer50} onChange={(e) => setCostPer50(e.target.value)} min={0} step={0.25} className="h-8 text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">60-lb bag ($)</label>
                <Input type="number" value={costPer60} onChange={(e) => setCostPer60(e.target.value)} min={0} step={0.25} className="h-8 text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">80-lb bag ($)</label>
                <Input type="number" value={costPer80} onChange={(e) => setCostPer80(e.target.value)} min={0} step={0.25} className="h-8 text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Ready-Mix / yd³ ($)</label>
                <Input type="number" value={costPerYard} onChange={(e) => setCostPerYard(e.target.value)} min={0} step={5} className="h-8 text-xs font-sans tabular-nums" />
              </div>
            </div>

            {/* Cost results */}
            {costEstimate && (
              <div className="bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 rounded-lg p-3">
                <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">Estimated Project Cost</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  {[
                    { label: "40-lb bags", cost: costEstimate.bags40Total },
                    { label: "50-lb bags", cost: costEstimate.bags50Total },
                    { label: "60-lb bags", cost: costEstimate.bags60Total },
                    { label: "80-lb bags", cost: costEstimate.bags80Total },
                    { label: "Ready-Mix", cost: costEstimate.readyMixTotal },
                  ].map((c) => (
                    <div key={c.label} className="bg-white dark:bg-zinc-900 rounded p-2 border border-slate-200 dark:border-zinc-700">
                      <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">${c.cost.toLocaleString()}</span>
                      <p className="text-[10px] text-zinc-500 mt-0.5">{c.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mix ratio & fly ash */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Mix Ratio (Cement : Sand : Aggregate)</label>
                <select
                  value={mixRatio}
                  onChange={(e) => setMixRatio(e.target.value as MixRatioPreset)}
                  className="w-full h-8 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs px-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="1:2:4">1 : 2 : 4 (General purpose)</option>
                  <option value="1:1.5:3">1 : 1.5 : 3 (Standard structural)</option>
                  <option value="1:2:3">1 : 2 : 3 (High strength)</option>
                  <option value="1:3:6">1 : 3 : 6 (Lean / mass concrete)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                  Fly Ash Replacement: {flyAshPct}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={flyAshPct}
                  onChange={(e) => setFlyAshPct(e.target.value)}
                  className="w-full h-2 bg-blue-100 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            {/* Mix breakdown & chart */}
            {mixBreakdown && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 rounded-lg p-3">
                  <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">Material Quantities (lbs)</h4>
                  <div className="space-y-1.5 text-xs">
                    {[
                      { label: "Portland Cement", value: `${mixBreakdown.cementLbs.toLocaleString()} lbs` },
                      { label: "Sand", value: `${mixBreakdown.sandLbs.toLocaleString()} lbs` },
                      { label: "Aggregate", value: `${mixBreakdown.aggregateLbs.toLocaleString()} lbs` },
                      { label: "Water (approx.)", value: `${mixBreakdown.waterGallons.toLocaleString()} gallons` },
                      ...(mixBreakdown.flyAshLbs > 0 ? [{ label: "Fly Ash", value: `${mixBreakdown.flyAshLbs.toLocaleString()} lbs` }] : []),
                    ].map((m) => (
                      <div key={m.label} className="flex items-center justify-between py-0.5 border-b border-zinc-200/60 dark:border-zinc-700/50 last:border-0">
                        <span className="text-zinc-600 dark:text-zinc-400 font-medium">{m.label}</span>
                        <span className="font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pie chart */}
                {pieData.length > 0 && (
                  <div className="bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 rounded-lg p-3">
                    <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                      <PieIcon className="h-3.5 w-3.5 text-blue-500" /> Material Breakdown
                    </h4>
                    <ResponsiveContainer width="100%" height={160}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={60}
                          dataKey="value"
                          paddingAngle={2}
                          stroke="none"
                        >
                          {pieData.map((_, i) => (
                            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: any) => [`${Number(value || 0).toFixed(1)} lbs`, ""]}
                          contentStyle={{ fontSize: "11px", borderRadius: "6px", border: "1px solid #e2e8f0" }}
                        />
                        <Legend wrapperStyle={{ fontSize: "10px", fontWeight: 500 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      {latestResult && (
        <div className="flex items-center justify-end pt-1">
          <Button
            variant="outline"
            onClick={() => setIsReportOpen(true)}
            className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Full Report
          </Button>
        </div>
      )}

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        reportData={reportData}
      />
    </div>
  );
}
