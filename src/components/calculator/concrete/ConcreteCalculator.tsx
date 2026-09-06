"use client";

import React, { useState, useMemo, useEffect, useCallback, useId } from "react";
import {
  Download,
  Trash2,
  RotateCcw,
  Copy,
  Check,
  Code2,
  FileText,
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
  convertToFeet,
  DEFAULT_CONCRETE_DENSITY_LBS_PER_CUFT,
} from "@/lib/calculator-engine/formulas/concrete";

// ─── Shared Interfaces ────────────────────────────────────────────────────────

export interface SavedEstimate<T = any> {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: ConcreteResult;
  rawInputs: T;
  notes?: string;
}

export interface SlabInputs {
  length: string;
  width: string;
  height: string;
  lengthUnit: LengthUnit;
  widthUnit: LengthUnit;
  heightUnit: LengthUnit;
  qty: string;
  wastage: string;
  density: string;
}

export interface ColumnInputs {
  diameter: string;
  height: string;
  diameterUnit: LengthUnit;
  heightUnit: LengthUnit;
  qty: string;
  wastage: string;
}

export interface TubeInputs {
  outer: string;
  inner: string;
  height: string;
  outerUnit: LengthUnit;
  innerUnit: LengthUnit;
  heightUnit: LengthUnit;
  qty: string;
  wastage: string;
}

export interface CurbInputs {
  depth: string;
  gutter: string;
  height: string;
  flag: string;
  length: string;
  depthUnit: LengthUnit;
  gutterUnit: LengthUnit;
  heightUnit: LengthUnit;
  flagUnit: LengthUnit;
  lengthUnit: LengthUnit;
  qty: string;
}

export interface StairsInputs {
  run: string;
  rise: string;
  width: string;
  platform: string;
  risers: string;
  runUnit: LengthUnit;
  riseUnit: LengthUnit;
  widthUnit: LengthUnit;
  platformUnit: LengthUnit;
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

function useSavedEstimates<T = any>(storageKey: string) {
  const [saved, setSaved] = useState<SavedEstimate<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setSaved(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: ConcreteResult, rawInputs: T, notes: string = "") => {
      const entry: SavedEstimate<T> = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        timestamp: new Date().toLocaleString(),
        inputSummary,
        result,
        rawInputs: JSON.parse(JSON.stringify(rawInputs)),
        notes,
      };
      setSaved((prev) => {
        const updated = [entry, ...prev].slice(0, 20);
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch {
          /* ignore */
        }
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
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch {
          /* ignore */
        }
        return updated;
      });
    },
    [storageKey],
  );

  const clearAll = useCallback(() => {
    setSaved([]);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  return { saved, isOpen, setIsOpen, save, remove, clearAll };
}

function UnitSelect({ value, onChange }: { value: LengthUnit; onChange: (v: LengthUnit) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as LengthUnit)}
      aria-label="Select dimension unit"
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

// ─── Input Row with Programmatic Accessibility Association ───────────────────

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
  const uniqueId = useId();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={uniqueId} className="text-xs font-medium text-zinc-700 dark:text-zinc-300 w-36 flex-shrink-0">
        {label}
      </label>
      <Input
        id={uniqueId}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        step={step}
        className="h-8 text-xs font-sans tabular-nums font-semibold w-24 flex-shrink-0"
      />
      {showUnit && unit && onUnitChange && (
        <div className="no-print">
          <UnitSelect value={unit} onChange={onUnitChange} />
        </div>
      )}
      {showUnit && unit && (
        <span className="hidden print:inline text-xs text-zinc-600 font-semibold">{unit}</span>
      )}
    </div>
  );
}

// ─── Result Display with Copy Actions & Accessible Live Region ──────────────

function ResultDisplay({
  result,
  moduleTitle,
  inputSummary,
  latexFormula,
}: {
  result: ConcreteResult | null;
  moduleTitle: string;
  inputSummary: string;
  latexFormula?: string;
}) {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!result || result.cubicFeet <= 0) return null;

  const copyToClipboard = (text: string, type: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const fallbackCopy = (text: string) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch {
      /* ignore */
    }
    document.body.removeChild(ta);
  };

  const copyResultText = `Volume: ${result.cubicYards} yd³ (${result.cubicFeet} ft³ / ${result.cubicMeters} m³)\nWeight: ${result.weightLbs.toLocaleString()} lbs (${result.weightKg.toLocaleString()} kg)`;

  const copySummaryText = `========================================
CONCRETE ESTIMATION SUMMARY — ${moduleTitle.toUpperCase()}
========================================
Dimensions & Parameters : ${inputSummary}
Concrete Volume (yd³)   : ${result.cubicYards} yd³
Concrete Volume (ft³)   : ${result.cubicFeet} ft³
Concrete Volume (m³)    : ${result.cubicMeters} m³
Estimated Total Weight  : ${result.weightLbs.toLocaleString()} lbs (${result.weightKg.toLocaleString()} kg)

Pre-Mixed Bag Requirements:
- 40-lb bags : ${result.bags40lb} bags
- 50-lb bags : ${result.bags50lb} bags
- 60-lb bags : ${result.bags60lb} bags
- 80-lb bags : ${result.bags80lb} bags
${result.truckLoads > 0 ? `Ready-Mix Trucks: ${result.truckLoads} truck(s) (10 yd³/truck)\n` : ""}
* Includes configured wastage allowance. Calculated for standard concrete density.
========================================`;

  return (
    <div
      aria-live="polite"
      className="mt-3 p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700/60 text-xs space-y-2 break-inside-avoid print:break-inside-avoid"
    >
      {/* Volume Summary & Copy Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex flex-wrap items-baseline gap-x-2 text-zinc-800 dark:text-zinc-200">
          <span className="font-bold text-zinc-700 dark:text-zinc-300">Volume:</span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
            {result.cubicYards}
          </span>{" "}
          cubic yards
          <span className="text-zinc-400">or</span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
            {result.cubicFeet}
          </span>{" "}
          cubic feet
          <span className="text-zinc-400">or</span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
            {result.cubicMeters}
          </span>{" "}
          cubic meters
        </div>

        {/* Copy actions */}
        <div className="no-print flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => copyToClipboard(copyResultText, "result")}
            className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Copy concrete result"
          >
            {copiedType === "result" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
            {copiedType === "result" ? "Copied" : "Copy Result"}
          </button>
          <button
            type="button"
            onClick={() => copyToClipboard(copySummaryText, "summary")}
            className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Copy concrete summary"
          >
            {copiedType === "summary" ? <Check className="h-3 w-3 text-emerald-500" /> : <FileText className="h-3 w-3" />}
            {copiedType === "summary" ? "Copied" : "Summary"}
          </button>
          {latexFormula && (
            <button
              type="button"
              onClick={() => copyToClipboard(latexFormula, "latex")}
              className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer font-mono"
              aria-label="Copy concrete formula in LaTeX"
            >
              {copiedType === "latex" ? <Check className="h-3 w-3 text-emerald-500" /> : <Code2 className="h-3 w-3" />}
              {copiedType === "latex" ? "Copied" : "LaTeX"}
            </button>
          )}
        </div>
      </div>

      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-0.5 border-t border-slate-200/80 dark:border-zinc-700/50">
        Estimated requirements with configured wastage and density:
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
        * Bag calculations round up to the nearest whole bag. Different mixes and aggregates vary in density.
      </div>
    </div>
  );
}

// ─── Saved Estimates Drawer with Full Restore Action ─────────────────────────

function SavedEstimatesDrawer<T = any>({
  saved,
  isOpen,
  setIsOpen,
  remove,
  clearAll,
  onRestore,
  cardTitle,
}: {
  saved: SavedEstimate<T>[];
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  remove: (id: string) => void;
  clearAll: () => void;
  onRestore: (raw: T) => void;
  cardTitle: string;
}) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (saved.length === 0) return null;

  const handleRestore = (raw: T) => {
    onRestore(raw);
    setToastMessage("Estimate restored.");
    setTimeout(() => setToastMessage(null), 2000);
  };

  const exportCSV = () => {
    const headers = "Timestamp,Card,Inputs,Cubic Feet,Cubic Yards,Cubic Meters,Weight (lbs),Weight (kg),40lb Bags,50lb Bags,60lb Bags,80lb Bags,Trucks\n";
    const rows = saved
      .map(
        (s) =>
          `"${s.timestamp}","${cardTitle}","${s.inputSummary.replace(/"/g, '""')}",${s.result.cubicFeet},${s.result.cubicYards},${s.result.cubicMeters},${s.result.weightLbs},${s.result.weightKg},${s.result.bags40lb},${s.result.bags50lb},${s.result.bags60lb},${s.result.bags80lb},${s.result.truckLoads}`,
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cardTitle.toLowerCase().replace(/\s+/g, "-")}-estimates.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3 border border-blue-200 dark:border-blue-800/60 rounded-lg overflow-hidden no-print print:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-xs font-semibold text-blue-700 dark:text-blue-300 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-950/60 transition-colors"
      >
        <span>Saved Estimates ({saved.length})</span>
        <div className="flex items-center gap-2">
          {toastMessage && <span className="text-[10px] text-emerald-600 font-bold">{toastMessage}</span>}
          {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </div>
      </button>
      {isOpen && (
        <div className="p-2.5 space-y-2 bg-white dark:bg-zinc-900">
          <div className="flex items-center justify-end gap-2 mb-1">
            <button
              type="button"
              onClick={exportCSV}
              className="flex items-center gap-1 text-[10px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
              aria-label="Download estimates CSV"
            >
              <Download className="h-3 w-3" /> CSV
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="flex items-center gap-1 text-[10px] font-semibold text-red-500 hover:text-red-700 cursor-pointer"
              aria-label="Clear all saved estimates"
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
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleRestore(s.rawInputs)}
                      className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 cursor-pointer transition-colors"
                      aria-label="Restore saved concrete estimate"
                    >
                      <RotateCcw className="h-3 w-3" /> Restore
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(s.id)}
                      className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
                      title="Delete"
                      aria-label="Delete saved estimate"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Card Wrapper with Print Optimization ─────────────────────────────────────

function CardWrapper({
  title,
  onSave,
  isSaved,
  hasResult,
  savedCount,
  onToggleSaved,
  className = "",
  children,
}: {
  title: string;
  onSave?: () => void;
  isSaved?: boolean;
  hasResult?: boolean;
  savedCount?: number;
  onToggleSaved?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`border border-blue-600/30 dark:border-blue-500/20 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-zinc-900 break-inside-avoid print:break-inside-avoid print:shadow-none print:border-zinc-300 ${className}`}>
      {/* Subheading bar */}
      <div className="bg-blue-600 px-3.5 py-1.5 flex items-center justify-between text-white select-none">
        <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">{title}</h3>
        <div className="flex items-center gap-2 no-print print:hidden">
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

// ─── Fully Dynamic 3D Vector Diagrams with Real Synced Values ────────────────

function SlabDiagram({
  l,
  w,
  h,
  lUnit,
  wUnit,
  hUnit,
}: {
  l: number;
  w: number;
  h: number;
  lUnit: string;
  wUnit: string;
  hUnit: string;
}) {
  return (
    <svg viewBox="0 0 200 130" className="w-full max-w-[190px] mx-auto select-none break-inside-avoid print:break-inside-avoid" aria-label="Slab 3D Diagram">
      <g transform="translate(25, 15)">
        {/* Top Face */}
        <polygon points="0,35 45,10 145,10 100,35" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Front Face */}
        <polygon points="0,35 100,35 100,65 0,65" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Right Face */}
        <polygon points="100,35 145,10 145,40 100,65" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Dynamic Length */}
        <text x="50" y="80" textAnchor="middle" className="text-[10px] fill-blue-600 dark:fill-blue-400 font-semibold">
          l ({l > 0 ? `${l} ${lUnit}` : "Length"})
        </text>
        {/* Dynamic Width */}
        <text x="135" y="60" textAnchor="start" className="text-[10px] fill-blue-600 dark:fill-blue-400 font-semibold">
          w ({w > 0 ? `${w} ${wUnit}` : "Width"})
        </text>
        {/* Dynamic Height */}
        <text x="150" y="28" textAnchor="start" className="text-[10px] fill-blue-600 dark:fill-blue-400 font-semibold">
          h ({h > 0 ? `${h} ${hUnit}` : "Thickness"})
        </text>
      </g>
    </svg>
  );
}

function ColumnDiagram({
  d,
  h,
  dUnit,
  hUnit,
}: {
  d: number;
  h: number;
  dUnit: string;
  hUnit: string;
}) {
  return (
    <svg viewBox="0 0 170 140" className="w-full max-w-[160px] mx-auto select-none break-inside-avoid print:break-inside-avoid" aria-label="Column 3D Diagram">
      <g transform="translate(30, 15)">
        {/* Top Ellipse */}
        <ellipse cx="45" cy="20" rx="35" ry="10" fill="none" stroke="#2563eb" strokeWidth="1.5" />
        {/* Left and Right Side Lines */}
        <line x1="10" y1="20" x2="10" y2="85" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="80" y1="20" x2="80" y2="85" stroke="#2563eb" strokeWidth="1.5" />
        {/* Bottom Ellipse */}
        <path d="M10,85 A35,10 0 0,0 80,85 A35,10 0 0,0 10,85" fill="none" stroke="#2563eb" strokeWidth="1.5" />

        {/* Dynamic Diameter notation */}
        <line x1="10" y1="10" x2="80" y2="10" stroke="#2563eb" strokeWidth="1" strokeDasharray="3,2" />
        <text x="45" y="7" textAnchor="middle" className="text-[10px] fill-blue-600 dark:fill-blue-400 font-semibold">
          d ({d > 0 ? `${d} ${dUnit}` : "Diameter"})
        </text>

        {/* Dynamic Height notation */}
        <line x1="88" y1="20" x2="88" y2="85" stroke="#2563eb" strokeWidth="1" />
        <text x="93" y="56" textAnchor="start" className="text-[10px] fill-blue-600 dark:fill-blue-400 font-semibold">
          h ({h > 0 ? `${h} ${hUnit}` : "Height"})
        </text>
      </g>
    </svg>
  );
}

function TubeDiagram({
  d1,
  d2,
  h,
  d1Unit,
  d2Unit,
  hUnit,
}: {
  d1: number;
  d2: number;
  h: number;
  d1Unit: string;
  d2Unit: string;
  hUnit: string;
}) {
  return (
    <svg viewBox="0 0 190 145" className="w-full max-w-[180px] mx-auto select-none break-inside-avoid print:break-inside-avoid" aria-label="Tube 3D Diagram">
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
        <path d="M15,85 A50,14 0 0,1 115,85" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3,2" />

        {/* d2 dimension top */}
        <line x1="37" y1="8" x2="93" y2="8" stroke="#2563eb" strokeWidth="1" />
        <path d="M37,5 L37,11 M93,5 L93,11" stroke="#2563eb" strokeWidth="1" />
        <text x="65" y="6" textAnchor="middle" className="text-[9.5px] fill-blue-600 dark:fill-blue-400 font-semibold">
          d₂: {d2 > 0 ? `${d2} ${d2Unit}` : "inner"}
        </text>

        {/* d1 dimension bottom */}
        <line x1="15" y1="112" x2="115" y2="112" stroke="#2563eb" strokeWidth="1" />
        <path d="M15,108 L15,116 M115,108 L115,116" stroke="#2563eb" strokeWidth="1" />
        <text x="65" y="125" textAnchor="middle" className="text-[9.5px] fill-blue-600 dark:fill-blue-400 font-semibold">
          d₁: {d1 > 0 ? `${d1} ${d1Unit}` : "outer"}
        </text>

        {/* Height (h) notation */}
        <text x="125" y="58" textAnchor="start" className="text-[9.5px] fill-blue-600 dark:fill-blue-400 font-semibold">
          h: {h > 0 ? `${h} ${hUnit}` : ""}
        </text>
      </g>
    </svg>
  );
}

function CurbDiagram({
  depth,
  gutter,
  height,
  flag,
  length,
  depthUnit,
  gutterUnit,
  heightUnit,
  flagUnit,
  lengthUnit,
}: {
  depth: number;
  gutter: number;
  height: number;
  flag: number;
  length: number;
  depthUnit: string;
  gutterUnit: string;
  heightUnit: string;
  flagUnit: string;
  lengthUnit: string;
}) {
  return (
    <svg viewBox="0 0 240 150" className="w-full max-w-[210px] mx-auto select-none break-inside-avoid print:break-inside-avoid" aria-label="Curb and Gutter 3D Diagram">
      <g transform="translate(10, 10)">
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

        {/* Dynamic Curb Depth */}
        <text x="35" y="24" textAnchor="middle" className="text-[8.5px] fill-blue-600 dark:fill-blue-400 font-semibold">
          Depth: {depth > 0 ? `${depth} ${depthUnit}` : ""}
        </text>
        <line x1="25" y1="28" x2="45" y2="28" stroke="#2563eb" strokeWidth="0.8" />

        {/* Dynamic Curb Height */}
        <text x="3" y="65" textAnchor="middle" className="text-[8px] fill-blue-600 dark:fill-blue-400 font-semibold" transform="rotate(-90, 3, 65)">
          Height: {height > 0 ? `${height} ${heightUnit}` : ""}
        </text>

        {/* Dynamic Gutter Width */}
        <text x="65" y="112" textAnchor="middle" className="text-[8.5px] fill-blue-600 dark:fill-blue-400 font-semibold">
          Gutter: {gutter > 0 ? `${gutter} ${gutterUnit}` : ""}
        </text>

        {/* Dynamic Flag Thickness */}
        <text x="145" y="92" textAnchor="start" className="text-[8px] fill-blue-600 dark:fill-blue-400 font-semibold">
          Flag: {flag > 0 ? `${flag} ${flagUnit}` : ""}
        </text>

        {/* Dynamic Length */}
        <text x="120" y="32" textAnchor="start" className="text-[8.5px] fill-blue-600 dark:fill-blue-400 font-semibold" transform="rotate(-24, 120, 32)">
          Length: {length > 0 ? `${length} ${lengthUnit}` : ""}
        </text>
      </g>
    </svg>
  );
}

function StairsDiagram({
  run,
  rise,
  width,
  platform,
  numRisers,
  runUnit,
  riseUnit,
  widthUnit,
  platformUnit,
}: {
  run: number;
  rise: number;
  width: number;
  platform: number;
  numRisers: number;
  runUnit: string;
  riseUnit: string;
  widthUnit: string;
  platformUnit: string;
}) {
  // Visual riser clamping between 2 and 6 steps to render clean, readable SVG
  const displayRisers = Math.min(6, Math.max(2, numRisers || 4));
  const stepW = 100 / displayRisers;
  const stepH = 90 / displayRisers;

  return (
    <svg viewBox="0 0 280 185" className="w-full max-w-[240px] mx-auto select-none break-inside-avoid print:break-inside-avoid" aria-label="Stairs 3D Diagram">
      <g transform="translate(20, 20)">
        {/* Stair steps wireframe */}
        {Array.from({ length: displayRisers }).map((_, idx) => {
          const x = 30 + idx * stepW;
          const y = 110 - (idx + 1) * stepH;
          return (
            <g key={idx}>
              {/* Riser line */}
              <line x1={x} y1={y + stepH} x2={x} y2={y} stroke="#2563eb" strokeWidth="1.5" />
              {/* Tread line */}
              <line x1={x} y1={y} x2={x + stepW} y2={y} stroke="#2563eb" strokeWidth="1.5" />
            </g>
          );
        })}

        {/* Platform top line */}
        <line x1="5" y1={110 - displayRisers * stepH} x2="30" y2={110 - displayRisers * stepH} stroke="#2563eb" strokeWidth="1.5" />
        {/* Back vertical */}
        <line x1="5" y1={110 - displayRisers * stepH} x2="5" y2="110" stroke="#2563eb" strokeWidth="1.5" />
        {/* Base line */}
        <line x1="5" y1="110" x2={30 + displayRisers * stepW} y2="110" stroke="#2563eb" strokeWidth="1.5" />

        {/* Dimension Labels */}
        <text x="18" y={100 - displayRisers * stepH} textAnchor="middle" className="text-[8.5px] fill-blue-600 dark:fill-blue-400 font-semibold">
          Plat: {platform > 0 ? `${platform} ${platformUnit}` : "0"}
        </text>
        <text x="80" y="20" textAnchor="start" className="text-[9px] fill-blue-600 dark:fill-blue-400 font-semibold">
          Run: {run > 0 ? `${run} ${runUnit}` : ""} | Rise: {rise > 0 ? `${rise} ${riseUnit}` : ""}
        </text>
        <text x="140" y="90" textAnchor="start" className="text-[9px] fill-blue-600 dark:fill-blue-400 font-semibold">
          Width: {width > 0 ? `${width} ${widthUnit}` : ""}
        </text>
        <text x="120" y="130" textAnchor="middle" className="text-[10px] fill-blue-700 dark:fill-blue-300 font-bold">
          Total Risers = {numRisers > 0 ? numRisers : 1}
        </text>
      </g>
    </svg>
  );
}

// ─── Main Concrete Calculator Component ──────────────────────────────────────

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
  const [slabError, setSlabError] = useState<string | null>(null);
  const [slabSaveSuccess, setSlabSaveSuccess] = useState(false);
  const slabSaved = useSavedEstimates<SlabInputs>("concrete_saved_slab");

  // ─── Card 2: Column State ────────────────────────────────────────────────
  const [colDiameter, setColDiameter] = useState("2.5");
  const [colHeight, setColHeight] = useState("6");
  const [colDiaUnit, setColDiaUnit] = useState<LengthUnit>("feet");
  const [colHeightUnit, setColHeightUnit] = useState<LengthUnit>("feet");
  const [colQty, setColQty] = useState("1");
  const [colWastage, setColWastage] = useState("0");
  const [colResult, setColResult] = useState<ConcreteResult | null>(null);
  const [colError, setColError] = useState<string | null>(null);
  const [colSaveSuccess, setColSaveSuccess] = useState(false);
  const colSaved = useSavedEstimates<ColumnInputs>("concrete_saved_column");

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
  const [tubeError, setTubeError] = useState<string | null>(null);
  const [tubeSaveSuccess, setTubeSaveSuccess] = useState(false);
  const tubeSaved = useSavedEstimates<TubeInputs>("concrete_saved_tube");

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
  const [curbError, setCurbError] = useState<string | null>(null);
  const [curbSaveSuccess, setCurbSaveSuccess] = useState(false);
  const curbSaved = useSavedEstimates<CurbInputs>("concrete_saved_curb");

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
  const [stairError, setStairError] = useState<string | null>(null);
  const [stairSaveSuccess, setStairSaveSuccess] = useState(false);
  const stairSaved = useSavedEstimates<StairsInputs>("concrete_saved_stairs");

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

  // ─── Calculations with Strict Input Validation (P1-01) ───────────────────

  const handleSlabCalc = () => {
    setSlabError(null);
    const l = parseFloat(slabLength);
    const w = parseFloat(slabWidth);
    const h = parseFloat(slabHeight);
    const q = parseFloat(slabQty);
    const dens = parseFloat(slabDensity);

    if (!Number.isFinite(l) || l <= 0 || !Number.isFinite(w) || w <= 0 || !Number.isFinite(h) || h <= 0) {
      setSlabError("Dimensions must be greater than zero.");
      setSlabResult(null);
      return;
    }
    if (!Number.isFinite(q) || q < 1 || !Number.isInteger(q)) {
      setSlabError("Quantity must be a positive whole number (1 or greater).");
      setSlabResult(null);
      return;
    }
    if (!Number.isFinite(dens) || dens <= 0) {
      setSlabError("Concrete density must be greater than zero.");
      setSlabResult(null);
      return;
    }
    const waste = parseFloat(slabWastage);
    if (!Number.isFinite(waste) || waste < 0) {
      setSlabError("Wastage margin cannot be negative.");
      setSlabResult(null);
      return;
    }
    const r = calculateSlabVolume(l, w, h, slabLengthUnit, slabWidthUnit, slabHeightUnit, q, waste, dens);
    setSlabResult(r);
  };

  const handleColCalc = () => {
    setColError(null);
    const d = parseFloat(colDiameter);
    const h = parseFloat(colHeight);
    const q = parseFloat(colQty);

    if (!Number.isFinite(d) || d <= 0 || !Number.isFinite(h) || h <= 0) {
      setColError("Dimensions must be greater than zero.");
      setColResult(null);
      return;
    }
    if (!Number.isFinite(q) || q < 1 || !Number.isInteger(q)) {
      setColError("Quantity must be a positive whole number (1 or greater).");
      setColResult(null);
      return;
    }
    const waste = parseFloat(colWastage);
    if (!Number.isFinite(waste) || waste < 0) {
      setColError("Wastage margin cannot be negative.");
      setColResult(null);
      return;
    }
    const r = calculateColumnVolume(d, h, colDiaUnit, colHeightUnit, q, waste);
    setColResult(r);
  };

  const handleTubeCalc = () => {
    setTubeError(null);
    const outer = parseFloat(tubeOuter);
    const inner = parseFloat(tubeInner);
    const h = parseFloat(tubeHeight);
    const q = parseFloat(tubeQty);

    if (!Number.isFinite(outer) || outer <= 0 || !Number.isFinite(inner) || inner <= 0 || !Number.isFinite(h) || h <= 0) {
      setTubeError("Dimensions must be greater than zero.");
      setTubeResult(null);
      return;
    }
    const d1Ft = convertToFeet(outer, tubeOuterUnit);
    const d2Ft = convertToFeet(inner, tubeInnerUnit);
    if (d2Ft >= d1Ft) {
      setTubeError("Inner diameter must be smaller than outer diameter.");
      setTubeResult(null);
      return;
    }
    if (!Number.isFinite(q) || q < 1 || !Number.isInteger(q)) {
      setTubeError("Quantity must be a positive whole number (1 or greater).");
      setTubeResult(null);
      return;
    }
    const waste = parseFloat(tubeWastage);
    if (!Number.isFinite(waste) || waste < 0) {
      setTubeError("Wastage margin cannot be negative.");
      setTubeResult(null);
      return;
    }
    const r = calculateTubeVolume(outer, inner, h, tubeOuterUnit, tubeInnerUnit, tubeHeightUnit, q, waste);
    setTubeResult(r);
  };

  const handleCurbCalc = () => {
    setCurbError(null);
    const depth = parseFloat(curbDepth);
    const gutter = parseFloat(gutterWidth);
    const height = parseFloat(curbHeightVal);
    const flag = parseFloat(flagThickness);
    const length = parseFloat(curbLength);
    const q = parseFloat(curbQty);

    if (
      !Number.isFinite(depth) || depth <= 0 ||
      !Number.isFinite(gutter) || gutter <= 0 ||
      !Number.isFinite(height) || height <= 0 ||
      !Number.isFinite(flag) || flag <= 0 ||
      !Number.isFinite(length) || length <= 0
    ) {
      setCurbError("Dimensions must be greater than zero.");
      setCurbResult(null);
      return;
    }
    if (!Number.isFinite(q) || q < 1 || !Number.isInteger(q)) {
      setCurbError("Quantity must be a positive whole number (1 or greater).");
      setCurbResult(null);
      return;
    }
    const r = calculateCurbVolume(
      depth,
      gutter,
      height,
      flag,
      length,
      curbDepthUnit,
      gutterWidthUnit,
      curbHeightUnit,
      flagThicknessUnit,
      curbLengthUnit,
      q,
    );
    setCurbResult(r);
  };

  const handleStairCalc = () => {
    setStairError(null);
    const run = parseFloat(stairRun);
    const rise = parseFloat(stairRise);
    const width = parseFloat(stairWidth);
    const platform = parseFloat(stairPlatform);
    const risers = parseFloat(stairRisers);

    if (
      !Number.isFinite(run) || run <= 0 ||
      !Number.isFinite(rise) || rise <= 0 ||
      !Number.isFinite(width) || width <= 0 ||
      !Number.isFinite(platform) || platform < 0
    ) {
      setStairError("Dimensions must be greater than zero (platform depth can be 0).");
      setStairResult(null);
      return;
    }
    if (!Number.isFinite(risers) || risers < 1 || !Number.isInteger(risers)) {
      setStairError("Number of risers must be a positive whole number (1 or greater).");
      setStairResult(null);
      return;
    }
    const r = calculateStairsVolume(
      run,
      rise,
      width,
      platform,
      risers,
      stairRunUnit,
      stairRiseUnit,
      stairWidthUnit,
      stairPlatformUnit,
    );
    setStairResult(r);
  };

  // ─── Restore Handlers for Each Module (P1-02) ─────────────────────────────

  const handleRestoreSlab = (raw: SlabInputs) => {
    setSlabLength(raw.length);
    setSlabWidth(raw.width);
    setSlabHeight(raw.height);
    setSlabLengthUnit(raw.lengthUnit);
    setSlabWidthUnit(raw.widthUnit);
    setSlabHeightUnit(raw.heightUnit);
    setSlabQty(raw.qty);
    setSlabWastage(raw.wastage);
    setSlabDensity(raw.density);
    setSlabError(null);

    const l = parseFloat(raw.length);
    const w = parseFloat(raw.width);
    const h = parseFloat(raw.height);
    const q = parseFloat(raw.qty);
    const dens = parseFloat(raw.density);
    const waste = parseFloat(raw.wastage) || 0;
    if (l > 0 && w > 0 && h > 0 && q >= 1 && Number.isInteger(q) && dens > 0) {
      setSlabResult(calculateSlabVolume(l, w, h, raw.lengthUnit, raw.widthUnit, raw.heightUnit, q, waste, dens));
    }
  };

  const handleRestoreCol = (raw: ColumnInputs) => {
    setColDiameter(raw.diameter);
    setColHeight(raw.height);
    setColDiaUnit(raw.diameterUnit);
    setColHeightUnit(raw.heightUnit);
    setColQty(raw.qty);
    setColWastage(raw.wastage);
    setColError(null);

    const d = parseFloat(raw.diameter);
    const h = parseFloat(raw.height);
    const q = parseFloat(raw.qty);
    const waste = parseFloat(raw.wastage) || 0;
    if (d > 0 && h > 0 && q >= 1 && Number.isInteger(q)) {
      setColResult(calculateColumnVolume(d, h, raw.diameterUnit, raw.heightUnit, q, waste));
    }
  };

  const handleRestoreTube = (raw: TubeInputs) => {
    setTubeOuter(raw.outer);
    setTubeInner(raw.inner);
    setTubeHeight(raw.height);
    setTubeOuterUnit(raw.outerUnit);
    setTubeInnerUnit(raw.innerUnit);
    setTubeHeightUnit(raw.heightUnit);
    setTubeQty(raw.qty);
    setTubeWastage(raw.wastage);
    setTubeError(null);

    const outer = parseFloat(raw.outer);
    const inner = parseFloat(raw.inner);
    const h = parseFloat(raw.height);
    const q = parseFloat(raw.qty);
    const waste = parseFloat(raw.wastage) || 0;
    const d1Ft = convertToFeet(outer, raw.outerUnit);
    const d2Ft = convertToFeet(inner, raw.innerUnit);
    if (outer > 0 && inner > 0 && h > 0 && d2Ft < d1Ft && q >= 1 && Number.isInteger(q)) {
      setTubeResult(calculateTubeVolume(outer, inner, h, raw.outerUnit, raw.innerUnit, raw.heightUnit, q, waste));
    }
  };

  const handleRestoreCurb = (raw: CurbInputs) => {
    setCurbDepth(raw.depth);
    setGutterWidth(raw.gutter);
    setCurbHeightVal(raw.height);
    setFlagThickness(raw.flag);
    setCurbLength(raw.length);
    setCurbDepthUnit(raw.depthUnit);
    setGutterWidthUnit(raw.gutterUnit);
    setCurbHeightUnit(raw.heightUnit);
    setFlagThicknessUnit(raw.flagUnit);
    setCurbLengthUnit(raw.lengthUnit);
    setCurbQty(raw.qty);
    setCurbError(null);

    const depth = parseFloat(raw.depth);
    const gutter = parseFloat(raw.gutter);
    const height = parseFloat(raw.height);
    const flag = parseFloat(raw.flag);
    const length = parseFloat(raw.length);
    const q = parseFloat(raw.qty);
    if (depth > 0 && gutter > 0 && height > 0 && flag > 0 && length > 0 && q >= 1 && Number.isInteger(q)) {
      setCurbResult(calculateCurbVolume(depth, gutter, height, flag, length, raw.depthUnit, raw.gutterUnit, raw.heightUnit, raw.flagUnit, raw.lengthUnit, q));
    }
  };

  const handleRestoreStairs = (raw: StairsInputs) => {
    setStairRun(raw.run);
    setStairRise(raw.rise);
    setStairWidth(raw.width);
    setStairPlatform(raw.platform);
    setStairRisers(raw.risers);
    setStairRunUnit(raw.runUnit);
    setStairRiseUnit(raw.riseUnit);
    setStairWidthUnit(raw.widthUnit);
    setStairPlatformUnit(raw.platformUnit);
    setStairError(null);

    const run = parseFloat(raw.run);
    const rise = parseFloat(raw.rise);
    const width = parseFloat(raw.width);
    const platform = parseFloat(raw.platform);
    const risers = parseFloat(raw.risers);
    if (run > 0 && rise > 0 && width > 0 && platform >= 0 && risers >= 1 && Number.isInteger(risers)) {
      setStairResult(calculateStairsVolume(run, rise, width, platform, risers, raw.runUnit, raw.riseUnit, raw.widthUnit, raw.platformUnit));
    }
  };

  // ─── Most recent result for cost estimator ───────────────────────────────

  const latestResult = stairResult || curbResult || tubeResult || colResult || slabResult;

  const costEstimate = useMemo(() => {
    if (!latestResult) return null;
    return estimateCost(
      latestResult,
      parseFloat(costPer40) || 0,
      parseFloat(costPer50) || 0,
      parseFloat(costPer60) || 0,
      parseFloat(costPer80) || 0,
      parseFloat(costPerYard) || 0,
    );
  }, [latestResult, costPer40, costPer50, costPer60, costPer80, costPerYard]);

  const mixBreakdown = useMemo(() => {
    if (!latestResult) return null;
    return estimateMixMaterials(latestResult.cubicFeet, mixRatio, parseFloat(flyAshPct) || 0);
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

  const reportData: CalculatorReportData = useMemo(
    () => ({
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
          colorTheme: "blue",
        },
        {
          label: "80-lb Bags Needed",
          value: latestResult ? `${latestResult.bags80lb} bags` : "0 bags",
          subtitle: "0.60 ft³ coverage per bag",
          colorTheme: "blue",
        },
        {
          label: "Ready-Mix Loads",
          value: latestResult ? `${latestResult.truckLoads} trucks` : "0 trucks",
          subtitle: "10 yd³ capacity per truck",
          colorTheme: "blue",
        },
      ],
      sections: [
        {
          title: "Concrete Volume & Weight Summary",
          items: [
            { label: "Cubic Yards", value: latestResult ? `${latestResult.cubicYards} yd³` : "0 yd³", highlight: true },
            { label: "Cubic Feet", value: latestResult ? `${latestResult.cubicFeet} ft³` : "0 ft³" },
            { label: "Cubic Meters", value: latestResult ? `${latestResult.cubicMeters} m³` : "0 m³" },
            { label: "Total Estimated Weight", value: latestResult ? `${latestResult.weightLbs.toLocaleString()} lbs` : "0 lbs" },
          ],
        },
        {
          title: "Pre-Mixed Bag Requirements",
          items: [
            { label: "40-lb Bags (0.30 ft³ yield)", value: latestResult ? `${latestResult.bags40lb} bags` : "0" },
            { label: "50-lb Bags (0.375 ft³ yield)", value: latestResult ? `${latestResult.bags50lb} bags` : "0" },
            { label: "60-lb Bags (0.45 ft³ yield)", value: latestResult ? `${latestResult.bags60lb} bags` : "0" },
            { label: "80-lb Bags (0.60 ft³ yield)", value: latestResult ? `${latestResult.bags80lb} bags` : "0" },
            { label: "Ready-Mix Transit Trucks (10 yd³)", value: latestResult ? `${latestResult.truckLoads} truck(s)` : "0" },
          ],
        },
      ],
    }),
    [latestResult],
  );

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* ═══════════════════ CARD 1: SLAB ═══════════════════ */}
      <CardWrapper
        title="Slabs, Square Footings, or Walls"
        hasResult={!!slabResult}
        isSaved={slabSaveSuccess}
        savedCount={slabSaved.saved.length}
        onToggleSaved={() => slabSaved.setIsOpen(!slabSaved.isOpen)}
        onSave={() => {
          if (!slabResult) return;
          const rawInputs: SlabInputs = {
            length: slabLength,
            width: slabWidth,
            height: slabHeight,
            lengthUnit: slabLengthUnit,
            widthUnit: slabWidthUnit,
            heightUnit: slabHeightUnit,
            qty: slabQty,
            wastage: slabWastage,
            density: slabDensity,
          };
          slabSaved.save(
            `${slabLength} ${slabLengthUnit} × ${slabWidth} ${slabWidthUnit} × ${slabHeight} ${slabHeightUnit}, Qty: ${slabQty}`,
            slabResult,
            rawInputs,
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
            <InputRow label="Density (lbs/ft³)" value={slabDensity} onChange={setSlabDensity} min={1} step={1} showUnit={false} />

            {slabError && (
              <div className="p-2 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-[11px] text-red-600 dark:text-red-400 font-medium">
                {slabError}
              </div>
            )}

            <div className="flex gap-2 pt-1 no-print">
              <Button onClick={handleSlabCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSlabResult(null);
                  setSlabError(null);
                  setSlabLength("5");
                  setSlabWidth("2.5");
                  setSlabHeight("5");
                  setSlabQty("1");
                  setSlabWastage("0");
                  setSlabDensity(String(DEFAULT_CONCRETE_DENSITY_LBS_PER_CUFT));
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center break-inside-avoid print:break-inside-avoid">
            <SlabDiagram
              l={parseFloat(slabLength) || 0}
              w={parseFloat(slabWidth) || 0}
              h={parseFloat(slabHeight) || 0}
              lUnit={slabLengthUnit}
              wUnit={slabWidthUnit}
              hUnit={slabHeightUnit}
            />
          </div>
        </div>
        <ResultDisplay
          result={slabResult}
          moduleTitle="Slab / Wall"
          inputSummary={`${slabLength} ${slabLengthUnit} × ${slabWidth} ${slabWidthUnit} × ${slabHeight} ${slabHeightUnit}, Qty: ${slabQty}, Waste: ${slabWastage}%`}
          latexFormula={`V = L \\times W \\times H = ${slabLength}\\,\\text{${slabLengthUnit}} \\times ${slabWidth}\\,\\text{${slabWidthUnit}} \\times ${slabHeight}\\,\\text{${slabHeightUnit}} = ${slabResult?.cubicFeet ?? 0}\\,\\text{ft}^3`}
        />
        <SavedEstimatesDrawer<SlabInputs>
          {...slabSaved}
          onRestore={handleRestoreSlab}
          cardTitle="Slab"
        />
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
          const rawInputs: ColumnInputs = {
            diameter: colDiameter,
            height: colHeight,
            diameterUnit: colDiaUnit,
            heightUnit: colHeightUnit,
            qty: colQty,
            wastage: colWastage,
          };
          colSaved.save(
            `Diameter: ${colDiameter} ${colDiaUnit}, Height: ${colHeight} ${colHeightUnit}, Qty: ${colQty}`,
            colResult,
            rawInputs,
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

            {colError && (
              <div className="p-2 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-[11px] text-red-600 dark:text-red-400 font-medium">
                {colError}
              </div>
            )}

            <div className="flex gap-2 pt-1 no-print">
              <Button onClick={handleColCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setColResult(null);
                  setColError(null);
                  setColDiameter("2.5");
                  setColHeight("6");
                  setColQty("1");
                  setColWastage("0");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center break-inside-avoid print:break-inside-avoid">
            <ColumnDiagram
              d={parseFloat(colDiameter) || 0}
              h={parseFloat(colHeight) || 0}
              dUnit={colDiaUnit}
              hUnit={colHeightUnit}
            />
          </div>
        </div>
        <ResultDisplay
          result={colResult}
          moduleTitle="Column / Round Footing"
          inputSummary={`Diameter: ${colDiameter} ${colDiaUnit}, Height: ${colHeight} ${colHeightUnit}, Qty: ${colQty}, Waste: ${colWastage}%`}
          latexFormula={`V = \\pi \\left(\\frac{d}{2}\\right)^2 h = \\pi \\left(\\frac{${colDiameter}}{2}\\right)^2 (${colHeight}) = ${colResult?.cubicFeet ?? 0}\\,\\text{ft}^3`}
        />
        <SavedEstimatesDrawer<ColumnInputs>
          {...colSaved}
          onRestore={handleRestoreCol}
          cardTitle="Column"
        />
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
          const rawInputs: TubeInputs = {
            outer: tubeOuter,
            inner: tubeInner,
            height: tubeHeight,
            outerUnit: tubeOuterUnit,
            innerUnit: tubeInnerUnit,
            heightUnit: tubeHeightUnit,
            qty: tubeQty,
            wastage: tubeWastage,
          };
          tubeSaved.save(
            `Outer: ${tubeOuter} ${tubeOuterUnit}, Inner: ${tubeInner} ${tubeInnerUnit}, Height: ${tubeHeight} ${tubeHeightUnit}, Qty: ${tubeQty}`,
            tubeResult,
            rawInputs,
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

            {tubeError && (
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                {tubeError}
              </div>
            )}

            <div className="flex gap-2 pt-1 no-print">
              <Button onClick={handleTubeCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setTubeResult(null);
                  setTubeError(null);
                  setTubeOuter("5");
                  setTubeInner("4");
                  setTubeHeight("6");
                  setTubeQty("1");
                  setTubeWastage("0");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center break-inside-avoid print:break-inside-avoid">
            <TubeDiagram
              d1={parseFloat(tubeOuter) || 0}
              d2={parseFloat(tubeInner) || 0}
              h={parseFloat(tubeHeight) || 0}
              d1Unit={tubeOuterUnit}
              d2Unit={tubeInnerUnit}
              hUnit={tubeHeightUnit}
            />
          </div>
        </div>
        <ResultDisplay
          result={tubeResult}
          moduleTitle="Annular Tube"
          inputSummary={`Outer: ${tubeOuter} ${tubeOuterUnit}, Inner: ${tubeInner} ${tubeInnerUnit}, Height: ${tubeHeight} ${tubeHeightUnit}, Qty: ${tubeQty}, Waste: ${tubeWastage}%`}
          latexFormula={`V = \\pi h \\left[\\left(\\frac{d_1}{2}\\right)^2 - \\left(\\frac{d_2}{2}\\right)^2\\right] = ${tubeResult?.cubicFeet ?? 0}\\,\\text{ft}^3`}
        />
        <SavedEstimatesDrawer<TubeInputs>
          {...tubeSaved}
          onRestore={handleRestoreTube}
          cardTitle="Tube"
        />
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
          const rawInputs: CurbInputs = {
            depth: curbDepth,
            gutter: gutterWidth,
            height: curbHeightVal,
            flag: flagThickness,
            length: curbLength,
            depthUnit: curbDepthUnit,
            gutterUnit: gutterWidthUnit,
            heightUnit: curbHeightUnit,
            flagUnit: flagThicknessUnit,
            lengthUnit: curbLengthUnit,
            qty: curbQty,
          };
          curbSaved.save(
            `Depth: ${curbDepth} ${curbDepthUnit}, Gutter: ${gutterWidth} ${gutterWidthUnit}, Height: ${curbHeightVal} ${curbHeightUnit}, Length: ${curbLength} ${curbLengthUnit}`,
            curbResult,
            rawInputs,
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

            {curbError && (
              <div className="p-2 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-[11px] text-red-600 dark:text-red-400 font-medium">
                {curbError}
              </div>
            )}

            <div className="flex gap-2 pt-1 no-print">
              <Button onClick={handleCurbCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurbResult(null);
                  setCurbError(null);
                  setCurbDepth("4");
                  setGutterWidth("10");
                  setCurbHeightVal("4");
                  setFlagThickness("5");
                  setCurbLength("10");
                  setCurbQty("1");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center break-inside-avoid print:break-inside-avoid">
            <CurbDiagram
              depth={parseFloat(curbDepth) || 0}
              gutter={parseFloat(gutterWidth) || 0}
              height={parseFloat(curbHeightVal) || 0}
              flag={parseFloat(flagThickness) || 0}
              length={parseFloat(curbLength) || 0}
              depthUnit={curbDepthUnit}
              gutterUnit={gutterWidthUnit}
              heightUnit={curbHeightUnit}
              flagUnit={flagThicknessUnit}
              lengthUnit={curbLengthUnit}
            />
          </div>
        </div>
        <ResultDisplay
          result={curbResult}
          moduleTitle="Curb and Gutter Barrier"
          inputSummary={`Curb: ${curbDepth}×${curbHeightVal}, Gutter: ${gutterWidth}×${flagThickness}, Length: ${curbLength} ${curbLengthUnit}, Qty: ${curbQty}`}
          latexFormula={`A = (D_c \\times H_c) + (W_g \\times T_f),\\quad V = A \\times L = ${curbResult?.cubicFeet ?? 0}\\,\\text{ft}^3`}
        />
        <SavedEstimatesDrawer<CurbInputs>
          {...curbSaved}
          onRestore={handleRestoreCurb}
          cardTitle="Curb"
        />
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
          const rawInputs: StairsInputs = {
            run: stairRun,
            rise: stairRise,
            width: stairWidth,
            platform: stairPlatform,
            risers: stairRisers,
            runUnit: stairRunUnit,
            riseUnit: stairRiseUnit,
            widthUnit: stairWidthUnit,
            platformUnit: stairPlatformUnit,
          };
          stairSaved.save(
            `Run: ${stairRun} ${stairRunUnit}, Rise: ${stairRise} ${stairRiseUnit}, Width: ${stairWidth} ${stairWidthUnit}, Risers: ${stairRisers}`,
            stairResult,
            rawInputs,
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

            {stairError && (
              <div className="p-2 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-[11px] text-red-600 dark:text-red-400 font-medium">
                {stairError}
              </div>
            )}

            <div className="flex gap-2 pt-1 no-print">
              <Button onClick={handleStairCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer">
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setStairResult(null);
                  setStairError(null);
                  setStairRun("12");
                  setStairRise("6");
                  setStairWidth("50");
                  setStairPlatform("5");
                  setStairRisers("5");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center break-inside-avoid print:break-inside-avoid">
            <StairsDiagram
              run={parseFloat(stairRun) || 0}
              rise={parseFloat(stairRise) || 0}
              width={parseFloat(stairWidth) || 0}
              platform={parseFloat(stairPlatform) || 0}
              numRisers={parseInt(stairRisers, 10) || 5}
              runUnit={stairRunUnit}
              riseUnit={stairRiseUnit}
              widthUnit={stairWidthUnit}
              platformUnit={stairPlatformUnit}
            />
          </div>
        </div>
        <ResultDisplay
          result={stairResult}
          moduleTitle="Solid Stairs"
          inputSummary={`Run: ${stairRun} ${stairRunUnit}, Rise: ${stairRise} ${stairRiseUnit}, Width: ${stairWidth} ${stairWidthUnit}, Risers: ${stairRisers}`}
          latexFormula={`V_{\\text{steps}} = W \\times R \\times r \\times \\frac{n(n+1)}{2},\\quad V_{\\text{total}} = ${stairResult?.cubicFeet ?? 0}\\,\\text{ft}^3`}
        />
        <SavedEstimatesDrawer<StairsInputs>
          {...stairSaved}
          onRestore={handleRestoreStairs}
          cardTitle="Stairs"
        />
      </CardWrapper>

      {/* ═══════════════════ COST & MIX ESTIMATOR ═══════════════════ */}
      <CardWrapper
        title="Concrete Mix & Material Cost Estimator"
        className={!latestResult ? "print:hidden" : ""}
      >
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
                  <div className="bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 rounded-lg p-3 break-inside-avoid print:break-inside-avoid">
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
        <div className="flex items-center justify-end pt-1 no-print">
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

export default ConcreteCalculator;
