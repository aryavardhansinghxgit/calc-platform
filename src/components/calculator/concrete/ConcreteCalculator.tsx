"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Hammer,
  Ruler,
  Calculator as CalcIcon,
  Layers,
  Save,
  Trash2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Download,
  FileSpreadsheet,
  Info,
  CheckCircle2,
  DollarSign,
  Percent,
  PieChart as PieIcon,
  Box,
  Circle,
  ArrowUpDown,
  Footprints,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { ConcreteContent } from "./ConcreteContent";
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

const CHART_COLORS = ["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

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
      className="h-9 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-blue-700 dark:text-blue-300 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
    >
      {UNIT_OPTIONS.map((u) => (
        <option key={u.value} value={u.value}>
          {u.label}
        </option>
      ))}
    </select>
  );
}

function ResultDisplay({ result, showSaveSuccess }: { result: ConcreteResult | null; showSaveSuccess: boolean }) {
  if (!result) return null;
  return (
    <div className="mt-4 space-y-3">
      {/* Primary volume result */}
      <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">Volume</h4>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <span className="text-lg font-extrabold text-blue-700 dark:text-blue-300 font-sans tabular-nums">{result.cubicFeet}</span>
            <p className="text-[10px] text-blue-500 font-medium">cubic feet</p>
          </div>
          <div>
            <span className="text-lg font-extrabold text-blue-700 dark:text-blue-300 font-sans tabular-nums">{result.cubicYards}</span>
            <p className="text-[10px] text-blue-500 font-medium">cubic yards</p>
          </div>
          <div>
            <span className="text-lg font-extrabold text-blue-700 dark:text-blue-300 font-sans tabular-nums">{result.cubicMeters}</span>
            <p className="text-[10px] text-blue-500 font-medium">cubic meters</p>
          </div>
        </div>
      </div>

      {/* Weight */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-3 text-center">
          <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">{result.weightLbs.toLocaleString()}</span>
          <p className="text-[10px] text-zinc-500 font-medium">lbs</p>
        </div>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-3 text-center">
          <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">{result.weightKg.toLocaleString()}</span>
          <p className="text-[10px] text-zinc-500 font-medium">kg</p>
        </div>
      </div>

      {/* Bags */}
      <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-3">
        <h4 className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-2">Pre-Mixed Bags Needed</h4>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: "40-lb", value: result.bags40lb },
            { label: "50-lb", value: result.bags50lb },
            { label: "60-lb", value: result.bags60lb },
            { label: "80-lb", value: result.bags80lb },
          ].map((b) => (
            <div key={b.label}>
              <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">{b.value}</span>
              <p className="text-[10px] text-zinc-500 font-medium">{b.label} bags</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-zinc-400 mt-2 italic">* Different types of concrete can have very different densities</p>
      </div>

      {/* Truck loads */}
      {result.truckLoads > 0 && (
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Ready-Mix Truck Deliveries (10 yd³/truck)</span>
          <Badge variant="secondary" className="text-sm font-bold font-sans tabular-nums">{result.truckLoads}</Badge>
        </div>
      )}

      {showSaveSuccess && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
          <CheckCircle2 className="h-3.5 w-3.5" /> Calculation saved!
        </div>
      )}
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
    <div className="mt-3 border border-blue-200 dark:border-blue-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 bg-blue-50 dark:bg-blue-950/40 text-xs font-bold text-blue-700 dark:text-blue-300 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-950/60 transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <Save className="h-3.5 w-3.5" /> Saved Estimates ({saved.length})
        </span>
        {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
      {isOpen && (
        <div className="p-3 space-y-2 bg-white dark:bg-zinc-900">
          <div className="flex items-center justify-end gap-2 mb-1">
            <button onClick={exportCSV} className="flex items-center gap-1 text-[10px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
              <Download className="h-3 w-3" /> CSV
            </button>
            <button onClick={clearAll} className="flex items-center gap-1 text-[10px] font-semibold text-red-500 hover:text-red-700 cursor-pointer">
              <Trash2 className="h-3 w-3" /> Clear All
            </button>
          </div>
          <div className="max-h-48 overflow-y-auto space-y-1.5">
            {saved.map((s) => (
              <div key={s.id} className="p-2.5 bg-slate-50 dark:bg-zinc-950 rounded-lg border border-slate-200 dark:border-zinc-800 text-xs">
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

function CardWrapper({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-blue-600/30 dark:border-blue-500/20 rounded-xl shadow-sm overflow-hidden bg-white dark:bg-zinc-900">
      <div className="bg-blue-800 dark:bg-blue-900 px-4 py-3 flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
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
      <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 w-36 flex-shrink-0">
        {label}
      </label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        step={step}
        className="h-9 text-sm font-sans tabular-nums font-semibold w-28 flex-shrink-0"
      />
      {showUnit && unit && onUnitChange && <UnitSelect value={unit} onChange={onUnitChange} />}
    </div>
  );
}

// ─── SVG Diagrams ────────────────────────────────────────────────────────────

function SlabDiagram({ l, w, h }: { l: number; w: number; h: number }) {
  const scale = 0.8;
  return (
    <svg viewBox="0 0 200 140" className="w-full max-w-[180px] mx-auto" aria-label="Slab diagram">
      {/* 3D rectangular prism */}
      <g transform="translate(30, 20)">
        {/* Front face */}
        <rect x="0" y="50" width="100" height="30" fill="none" stroke="#1e40af" strokeWidth="1.5" rx="1" />
        {/* Top face (parallelogram) */}
        <polygon points="0,50 40,20 140,20 100,50" fill="none" stroke="#1e40af" strokeWidth="1.5" />
        {/* Right face (parallelogram) */}
        <polygon points="100,50 140,20 140,50 100,80" fill="none" stroke="#1e40af" strokeWidth="1.5" />
        {/* Dimension labels */}
        <text x="50" y="98" textAnchor="middle" className="text-[9px] fill-blue-700 dark:fill-blue-400 font-semibold">{l || "L"}</text>
        <text x="-8" y="68" textAnchor="middle" className="text-[9px] fill-blue-700 dark:fill-blue-400 font-semibold" transform="rotate(-90, -8, 68)">{h || "H"}</text>
        <text x="125" y="14" textAnchor="middle" className="text-[9px] fill-blue-700 dark:fill-blue-400 font-semibold">{w || "W"}</text>
        {/* Dimension arrows */}
        <line x1="0" y1="92" x2="100" y2="92" stroke="#3b82f6" strokeWidth="0.8" markerEnd="url(#arrowEnd)" markerStart="url(#arrowStart)" />
      </g>
      <defs>
        <marker id="arrowEnd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="#3b82f6" strokeWidth="0.8" />
        </marker>
        <marker id="arrowStart" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6" fill="none" stroke="#3b82f6" strokeWidth="0.8" />
        </marker>
      </defs>
    </svg>
  );
}

function ColumnDiagram({ d, h }: { d: number; h: number }) {
  return (
    <svg viewBox="0 0 160 160" className="w-full max-w-[150px] mx-auto" aria-label="Column diagram">
      <g transform="translate(30, 10)">
        {/* Cylinder body */}
        <rect x="20" y="30" width="60" height="80" fill="none" stroke="#1e40af" strokeWidth="1.5" />
        {/* Top ellipse */}
        <ellipse cx="50" cy="30" rx="30" ry="10" fill="none" stroke="#1e40af" strokeWidth="1.5" />
        {/* Bottom ellipse */}
        <ellipse cx="50" cy="110" rx="30" ry="10" fill="none" stroke="#1e40af" strokeWidth="1.5" />
        {/* Diameter label */}
        <line x1="20" y1="25" x2="80" y2="25" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="3,2" />
        <text x="50" y="18" textAnchor="middle" className="text-[9px] fill-blue-700 dark:fill-blue-400 font-semibold">{d || "d"}</text>
        {/* Height label */}
        <line x1="88" y1="30" x2="88" y2="110" stroke="#3b82f6" strokeWidth="0.8" />
        <text x="96" y="75" textAnchor="start" className="text-[9px] fill-blue-700 dark:fill-blue-400 font-semibold">{h || "h"}</text>
      </g>
    </svg>
  );
}

function TubeDiagram({ d1, d2 }: { d1: number; d2: number }) {
  return (
    <svg viewBox="0 0 180 160" className="w-full max-w-[160px] mx-auto" aria-label="Tube diagram">
      <g transform="translate(20, 10)">
        {/* Outer cylinder */}
        <ellipse cx="70" cy="30" rx="50" ry="15" fill="none" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="20" y1="30" x2="20" y2="110" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="120" y1="30" x2="120" y2="110" stroke="#1e40af" strokeWidth="1.5" />
        <ellipse cx="70" cy="110" rx="50" ry="15" fill="none" stroke="#1e40af" strokeWidth="1.5" />
        {/* Inner hole (dashed) */}
        <ellipse cx="70" cy="30" rx="25" ry="8" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,2" />
        {/* Labels */}
        <line x1="20" y1="140" x2="120" y2="140" stroke="#3b82f6" strokeWidth="0.8" />
        <text x="70" y="150" textAnchor="middle" className="text-[9px] fill-blue-700 dark:fill-blue-400 font-semibold">d1={d1 || "?"}</text>
        <line x1="45" y1="25" x2="95" y2="25" stroke="#60a5fa" strokeWidth="0.6" strokeDasharray="2,2" />
        <text x="70" y="12" textAnchor="middle" className="text-[8px] fill-blue-500 font-medium">d2={d2 || "?"}</text>
      </g>
    </svg>
  );
}

function CurbDiagram() {
  return (
    <svg viewBox="0 0 200 140" className="w-full max-w-[170px] mx-auto" aria-label="Curb and gutter diagram">
      <g transform="translate(20, 15)">
        {/* L-shaped cross section */}
        <path d="M10,10 L10,80 L100,80 L100,60 L30,60 L30,10 Z" fill="none" stroke="#1e40af" strokeWidth="1.5" />
        {/* Labels */}
        <text x="20" y="8" textAnchor="middle" className="text-[8px] fill-blue-700 dark:fill-blue-400 font-semibold">Curb Depth</text>
        <text x="5" y="50" textAnchor="middle" className="text-[8px] fill-blue-700 dark:fill-blue-400 font-semibold" transform="rotate(-90, 5, 50)">Curb Height</text>
        <text x="65" y="95" textAnchor="middle" className="text-[8px] fill-blue-700 dark:fill-blue-400 font-semibold">Gutter Width</text>
        <text x="68" y="55" textAnchor="middle" className="text-[7px] fill-blue-500 font-medium">Flag Thickness</text>
        {/* Length arrow (going into page) */}
        <text x="140" y="50" textAnchor="start" className="text-[8px] fill-blue-600 font-semibold">← Length</text>
      </g>
    </svg>
  );
}

function StairsDiagram({ run, rise, n }: { run: number; rise: number; n: number }) {
  const steps = Math.min(n || 3, 6);
  const stepW = 20;
  const stepH = 14;
  return (
    <svg viewBox="0 0 180 140" className="w-full max-w-[160px] mx-auto" aria-label="Stairs diagram">
      <g transform="translate(15, 10)">
        {/* Stair steps */}
        {Array.from({ length: steps }, (_, i) => {
          const x = i * stepW;
          const y = 120 - (i + 1) * stepH;
          return (
            <g key={i}>
              <rect x={x} y={y} width={stepW} height={(i + 1) * stepH} fill="none" stroke="#1e40af" strokeWidth="1.2" />
            </g>
          );
        })}
        {/* Platform */}
        <rect x={steps * stepW} y={120 - steps * stepH - 4} width={25} height={4} fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,2" />
        {/* Labels */}
        <text x={stepW / 2} y={132} textAnchor="middle" className="text-[8px] fill-blue-700 dark:fill-blue-400 font-semibold">Run</text>
        <text x={-6} y={120 - stepH / 2} textAnchor="middle" className="text-[8px] fill-blue-700 dark:fill-blue-400 font-semibold" transform={`rotate(-90, -6, ${120 - stepH / 2})`}>Rise</text>
        <text x={steps * stepW + 12} y={120 - steps * stepH - 8} textAnchor="middle" className="text-[7px] fill-blue-500 font-medium">Platform</text>
      </g>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════════════════════

export function ConcreteCalculator() {
  // ─── Card 1: Slab State ──────────────────────────────────────────────────
  const [slabLength, setSlabLength] = useState("10");
  const [slabWidth, setSlabWidth] = useState("10");
  const [slabHeight, setSlabHeight] = useState("4");
  const [slabLengthUnit, setSlabLengthUnit] = useState<LengthUnit>("feet");
  const [slabWidthUnit, setSlabWidthUnit] = useState<LengthUnit>("feet");
  const [slabHeightUnit, setSlabHeightUnit] = useState<LengthUnit>("inches");
  const [slabQty, setSlabQty] = useState("1");
  const [slabWastage, setSlabWastage] = useState("5");
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
  const [colWastage, setColWastage] = useState("5");
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
  const [tubeWastage, setTubeWastage] = useState("5");
  const [tubeResult, setTubeResult] = useState<ConcreteResult | null>(null);
  const [tubeSaveSuccess, setTubeSaveSuccess] = useState(false);
  const tubeSaved = useSavedEstimates("concrete_saved_tube");

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
      { name: "Water (est.)", value: mixBreakdown.waterGallons * 8.34 }, // convert gal to lbs
      ...(mixBreakdown.flyAshLbs > 0 ? [{ name: "Fly Ash", value: mixBreakdown.flyAshLbs }] : []),
    ].filter((d) => d.value > 0);
  }, [mixBreakdown]);

  // ─── Report data ─────────────────────────────────────────────────────────

  const reportData: CalculatorReportData = useMemo(() => ({
    title: "Concrete Calculator Report",
    description: "Comprehensive concrete volume and material estimation report",
    date: new Date().toLocaleDateString(),
    sections: [
      ...(slabResult ? [{
        title: "Slabs, Square Footings, or Walls",
        rows: [
          { label: "Volume (ft³)", value: String(slabResult.cubicFeet) },
          { label: "Volume (yd³)", value: String(slabResult.cubicYards) },
          { label: "Volume (m³)", value: String(slabResult.cubicMeters) },
          { label: "Weight (lbs)", value: slabResult.weightLbs.toLocaleString() },
          { label: "80-lb Bags", value: String(slabResult.bags80lb) },
          { label: "60-lb Bags", value: String(slabResult.bags60lb) },
        ],
      }] : []),
      ...(colResult ? [{
        title: "Hole, Column, or Round Footings",
        rows: [
          { label: "Volume (yd³)", value: String(colResult.cubicYards) },
          { label: "Weight (lbs)", value: colResult.weightLbs.toLocaleString() },
          { label: "80-lb Bags", value: String(colResult.bags80lb) },
        ],
      }] : []),
      ...(tubeResult ? [{
        title: "Circular Slab or Tube",
        rows: [
          { label: "Volume (yd³)", value: String(tubeResult.cubicYards) },
          { label: "80-lb Bags", value: String(tubeResult.bags80lb) },
        ],
      }] : []),
      ...(curbResult ? [{
        title: "Curb & Gutter Barrier",
        rows: [
          { label: "Volume (yd³)", value: String(curbResult.cubicYards) },
          { label: "80-lb Bags", value: String(curbResult.bags80lb) },
        ],
      }] : []),
      ...(stairResult ? [{
        title: "Stairs",
        rows: [
          { label: "Volume (yd³)", value: String(stairResult.cubicYards) },
          { label: "Weight (lbs)", value: stairResult.weightLbs.toLocaleString() },
          { label: "80-lb Bags", value: String(stairResult.bags80lb) },
        ],
      }] : []),
    ],
  }), [slabResult, colResult, tubeResult, curbResult, stairResult]);

  return (
    <div className="space-y-5">
      {/* ═══════════════════ CARD 1: SLABS ═══════════════════ */}
      <CardWrapper
        icon={<Box className="h-4.5 w-4.5 text-white/90" />}
        title="Slabs, Square Footings, or Walls"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2.5">
            <InputRow label="Length (l)" value={slabLength} onChange={setSlabLength} unit={slabLengthUnit} onUnitChange={setSlabLengthUnit} />
            <InputRow label="Width (w)" value={slabWidth} onChange={setSlabWidth} unit={slabWidthUnit} onUnitChange={setSlabWidthUnit} />
            <InputRow label="Thickness / Height (h)" value={slabHeight} onChange={setSlabHeight} unit={slabHeightUnit} onUnitChange={setSlabHeightUnit} />
            <InputRow label="Quantity" value={slabQty} onChange={setSlabQty} min={1} step={1} showUnit={false} />
            <InputRow label="Wastage Margin (%)" value={slabWastage} onChange={setSlabWastage} min={0} step={1} showUnit={false} />
            <InputRow label="Density (lbs/ft³)" value={slabDensity} onChange={setSlabDensity} min={50} step={1} showUnit={false} />
            <div className="flex gap-2 pt-2">
              <Button onClick={handleSlabCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 cursor-pointer">
                <CalcIcon className="h-3.5 w-3.5" /> Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => { setSlabResult(null); setSlabLength("10"); setSlabWidth("10"); setSlabHeight("4"); setSlabQty("1"); setSlabWastage("5"); }}
                className="text-xs font-semibold gap-1.5 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start">
            <SlabDiagram l={Number(slabLength)} w={Number(slabWidth)} h={Number(slabHeight)} />
          </div>
        </div>
        <ResultDisplay result={slabResult} showSaveSuccess={slabSaveSuccess} />
        {slabResult && (
          <div className="mt-3">
            <Button
              variant="outline"
              onClick={() => {
                slabSaved.save(
                  `${slabLength} ${slabLengthUnit} × ${slabWidth} ${slabWidthUnit} × ${slabHeight} ${slabHeightUnit}, Qty: ${slabQty}, Wastage: ${slabWastage}%`,
                  slabResult,
                );
                flashSave(setSlabSaveSuccess);
              }}
              className="h-8 text-xs font-bold gap-1.5 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/30"
            >
              <Save className="h-3.5 w-3.5" /> Save Calculation
            </Button>
          </div>
        )}
        <SavedEstimatesDrawer {...slabSaved} cardTitle="Slab" />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: COLUMN ═══════════════════ */}
      <CardWrapper
        icon={<Circle className="h-4.5 w-4.5 text-white/90" />}
        title="Hole, Column, or Round Footings"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2.5">
            <InputRow label="Diameter (d)" value={colDiameter} onChange={setColDiameter} unit={colDiaUnit} onUnitChange={setColDiaUnit} />
            <InputRow label="Depth or Height (h)" value={colHeight} onChange={setColHeight} unit={colHeightUnit} onUnitChange={setColHeightUnit} />
            <InputRow label="Quantity" value={colQty} onChange={setColQty} min={1} step={1} showUnit={false} />
            <InputRow label="Wastage Margin (%)" value={colWastage} onChange={setColWastage} min={0} step={1} showUnit={false} />
            <div className="flex gap-2 pt-2">
              <Button onClick={handleColCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 cursor-pointer">
                <CalcIcon className="h-3.5 w-3.5" /> Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => { setColResult(null); setColDiameter("2.5"); setColHeight("6"); setColQty("1"); setColWastage("5"); }}
                className="text-xs font-semibold gap-1.5 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start">
            <ColumnDiagram d={Number(colDiameter)} h={Number(colHeight)} />
          </div>
        </div>
        <ResultDisplay result={colResult} showSaveSuccess={colSaveSuccess} />
        {colResult && (
          <div className="mt-3">
            <Button
              variant="outline"
              onClick={() => {
                colSaved.save(
                  `Diameter: ${colDiameter} ${colDiaUnit}, Height: ${colHeight} ${colHeightUnit}, Qty: ${colQty}, Wastage: ${colWastage}%`,
                  colResult,
                );
                flashSave(setColSaveSuccess);
              }}
              className="h-8 text-xs font-bold gap-1.5 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/30"
            >
              <Save className="h-3.5 w-3.5" /> Save Calculation
            </Button>
          </div>
        )}
        <SavedEstimatesDrawer {...colSaved} cardTitle="Column" />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: TUBE ═══════════════════ */}
      <CardWrapper
        icon={<Layers className="h-4.5 w-4.5 text-white/90" />}
        title="Circular Slab or Tube"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2.5">
            <InputRow label="Outer Diameter (d₁)" value={tubeOuter} onChange={setTubeOuter} unit={tubeOuterUnit} onUnitChange={setTubeOuterUnit} />
            <InputRow label="Inner Diameter (d₂)" value={tubeInner} onChange={setTubeInner} unit={tubeInnerUnit} onUnitChange={setTubeInnerUnit} />
            <InputRow label="Length / Height (h)" value={tubeHeight} onChange={setTubeHeight} unit={tubeHeightUnit} onUnitChange={setTubeHeightUnit} />
            <InputRow label="Quantity" value={tubeQty} onChange={setTubeQty} min={1} step={1} showUnit={false} />
            <InputRow label="Wastage Margin (%)" value={tubeWastage} onChange={setTubeWastage} min={0} step={1} showUnit={false} />
            <div className="flex gap-2 pt-2">
              <Button onClick={handleTubeCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 cursor-pointer">
                <CalcIcon className="h-3.5 w-3.5" /> Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => { setTubeResult(null); setTubeOuter("5"); setTubeInner("4"); setTubeHeight("6"); setTubeQty("1"); setTubeWastage("5"); }}
                className="text-xs font-semibold gap-1.5 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start">
            <TubeDiagram d1={Number(tubeOuter)} d2={Number(tubeInner)} />
          </div>
        </div>
        <ResultDisplay result={tubeResult} showSaveSuccess={tubeSaveSuccess} />
        {tubeResult && (
          <div className="mt-3">
            <Button
              variant="outline"
              onClick={() => {
                tubeSaved.save(
                  `Outer: ${tubeOuter} ${tubeOuterUnit}, Inner: ${tubeInner} ${tubeInnerUnit}, Height: ${tubeHeight} ${tubeHeightUnit}, Qty: ${tubeQty}`,
                  tubeResult,
                );
                flashSave(setTubeSaveSuccess);
              }}
              className="h-8 text-xs font-bold gap-1.5 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/30"
            >
              <Save className="h-3.5 w-3.5" /> Save Calculation
            </Button>
          </div>
        )}
        <SavedEstimatesDrawer {...tubeSaved} cardTitle="Tube" />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: CURB & GUTTER ═══════════════════ */}
      <CardWrapper
        icon={<Ruler className="h-4.5 w-4.5 text-white/90" />}
        title="Curb and Gutter Barrier"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2.5">
            <InputRow label="Curb Depth" value={curbDepth} onChange={setCurbDepth} unit={curbDepthUnit} onUnitChange={setCurbDepthUnit} />
            <InputRow label="Gutter Width" value={gutterWidth} onChange={setGutterWidth} unit={gutterWidthUnit} onUnitChange={setGutterWidthUnit} />
            <InputRow label="Curb Height" value={curbHeightVal} onChange={setCurbHeightVal} unit={curbHeightUnit} onUnitChange={setCurbHeightUnit} />
            <InputRow label="Flag Thickness" value={flagThickness} onChange={setFlagThickness} unit={flagThicknessUnit} onUnitChange={setFlagThicknessUnit} />
            <InputRow label="Length" value={curbLength} onChange={setCurbLength} unit={curbLengthUnit} onUnitChange={setCurbLengthUnit} />
            <InputRow label="Quantity" value={curbQty} onChange={setCurbQty} min={1} step={1} showUnit={false} />
            <div className="flex gap-2 pt-2">
              <Button onClick={handleCurbCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 cursor-pointer">
                <CalcIcon className="h-3.5 w-3.5" /> Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => { setCurbResult(null); setCurbDepth("4"); setGutterWidth("10"); setCurbHeightVal("4"); setFlagThickness("5"); setCurbLength("10"); setCurbQty("1"); }}
                className="text-xs font-semibold gap-1.5 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start">
            <CurbDiagram />
          </div>
        </div>
        <ResultDisplay result={curbResult} showSaveSuccess={curbSaveSuccess} />
        {curbResult && (
          <div className="mt-3">
            <Button
              variant="outline"
              onClick={() => {
                curbSaved.save(
                  `Depth: ${curbDepth} ${curbDepthUnit}, Gutter: ${gutterWidth} ${gutterWidthUnit}, Height: ${curbHeightVal} ${curbHeightUnit}, Flag: ${flagThickness} ${flagThicknessUnit}, Length: ${curbLength} ${curbLengthUnit}`,
                  curbResult,
                );
                flashSave(setCurbSaveSuccess);
              }}
              className="h-8 text-xs font-bold gap-1.5 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/30"
            >
              <Save className="h-3.5 w-3.5" /> Save Calculation
            </Button>
          </div>
        )}
        <SavedEstimatesDrawer {...curbSaved} cardTitle="Curb" />
      </CardWrapper>

      {/* ═══════════════════ CARD 5: STAIRS ═══════════════════ */}
      <CardWrapper
        icon={<Footprints className="h-4.5 w-4.5 text-white/90" />}
        title="Stairs"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2.5">
            <InputRow label="Run" value={stairRun} onChange={setStairRun} unit={stairRunUnit} onUnitChange={setStairRunUnit} />
            <InputRow label="Rise" value={stairRise} onChange={setStairRise} unit={stairRiseUnit} onUnitChange={setStairRiseUnit} />
            <InputRow label="Width" value={stairWidth} onChange={setStairWidth} unit={stairWidthUnit} onUnitChange={setStairWidthUnit} />
            <InputRow label="Platform Depth" value={stairPlatform} onChange={setStairPlatform} unit={stairPlatformUnit} onUnitChange={setStairPlatformUnit} />
            <InputRow label="Number of Risers" value={stairRisers} onChange={setStairRisers} min={1} step={1} showUnit={false} />
            <div className="flex gap-2 pt-2">
              <Button onClick={handleStairCalc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 cursor-pointer">
                <CalcIcon className="h-3.5 w-3.5" /> Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => { setStairResult(null); setStairRun("12"); setStairRise("6"); setStairWidth("50"); setStairPlatform("5"); setStairRisers("5"); }}
                className="text-xs font-semibold gap-1.5 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start">
            <StairsDiagram run={Number(stairRun)} rise={Number(stairRise)} n={Number(stairRisers)} />
          </div>
        </div>
        <ResultDisplay result={stairResult} showSaveSuccess={stairSaveSuccess} />
        {stairResult && (
          <div className="mt-3">
            <Button
              variant="outline"
              onClick={() => {
                stairSaved.save(
                  `Run: ${stairRun} ${stairRunUnit}, Rise: ${stairRise} ${stairRiseUnit}, Width: ${stairWidth} ${stairWidthUnit}, Platform: ${stairPlatform} ${stairPlatformUnit}, Risers: ${stairRisers}`,
                  stairResult,
                );
                flashSave(setStairSaveSuccess);
              }}
              className="h-8 text-xs font-bold gap-1.5 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/30"
            >
              <Save className="h-3.5 w-3.5" /> Save Calculation
            </Button>
          </div>
        )}
        <SavedEstimatesDrawer {...stairSaved} cardTitle="Stairs" />
      </CardWrapper>

      {/* ═══════════════════ COST & MIX ESTIMATOR ═══════════════════ */}
      <CardWrapper
        icon={<DollarSign className="h-4.5 w-4.5 text-white/90" />}
        title="Concrete Mix & Material Cost Estimator"
      >
        {!latestResult ? (
          <div className="flex items-center gap-2 text-xs text-zinc-500 py-4">
            <Info className="h-4 w-4 text-blue-400" />
            <span>Calculate at least one shape above to see cost and material estimates.</span>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Cost inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Cost per 40-lb bag ($)</label>
                <Input type="number" value={costPer40} onChange={(e) => setCostPer40(e.target.value)} min={0} step={0.25} className="h-8 text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Cost per 50-lb bag ($)</label>
                <Input type="number" value={costPer50} onChange={(e) => setCostPer50(e.target.value)} min={0} step={0.25} className="h-8 text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Cost per 60-lb bag ($)</label>
                <Input type="number" value={costPer60} onChange={(e) => setCostPer60(e.target.value)} min={0} step={0.25} className="h-8 text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Cost per 80-lb bag ($)</label>
                <Input type="number" value={costPer80} onChange={(e) => setCostPer80(e.target.value)} min={0} step={0.25} className="h-8 text-xs font-sans tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Ready-Mix cost per yd³ ($)</label>
                <Input type="number" value={costPerYard} onChange={(e) => setCostPerYard(e.target.value)} min={0} step={5} className="h-8 text-xs font-sans tabular-nums" />
              </div>
            </div>

            {/* Cost results */}
            {costEstimate && (
              <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">Estimated Project Cost</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center text-xs">
                  {[
                    { label: "40-lb bags", cost: costEstimate.bags40Total, count: latestResult.bags40lb },
                    { label: "50-lb bags", cost: costEstimate.bags50Total, count: latestResult.bags50lb },
                    { label: "60-lb bags", cost: costEstimate.bags60Total, count: latestResult.bags60lb },
                    { label: "80-lb bags", cost: costEstimate.bags80Total, count: latestResult.bags80lb },
                    { label: "Ready-Mix", cost: costEstimate.readyMixTotal, count: latestResult.cubicYards },
                  ].map((c) => (
                    <div key={c.label} className="bg-white dark:bg-zinc-900 rounded-lg p-2 border border-blue-100 dark:border-blue-900">
                      <span className="text-sm font-extrabold text-blue-700 dark:text-blue-300 font-sans tabular-nums">${c.cost.toLocaleString()}</span>
                      <p className="text-[10px] text-zinc-500 mt-0.5">{c.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mix ratio & fly ash */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Mix Ratio (Cement:Sand:Aggregate)</label>
                <select
                  value={mixRatio}
                  onChange={(e) => setMixRatio(e.target.value as MixRatioPreset)}
                  className="w-full h-9 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="1:2:4">1 : 2 : 4 (General purpose)</option>
                  <option value="1:1.5:3">1 : 1.5 : 3 (Standard structural)</option>
                  <option value="1:2:3">1 : 2 : 3 (High strength)</option>
                  <option value="1:3:6">1 : 3 : 6 (Lean / mass concrete)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                  Fly Ash Replacement: {flyAshPct}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={flyAshPct}
                  onChange={(e) => setFlyAshPct(e.target.value)}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            {/* Mix breakdown & chart */}
            {mixBreakdown && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-3 uppercase tracking-wider">Material Quantities (lbs)</h4>
                  <div className="space-y-2 text-xs">
                    {[
                      { label: "Portland Cement", value: `${mixBreakdown.cementLbs.toLocaleString()} lbs` },
                      { label: "Sand", value: `${mixBreakdown.sandLbs.toLocaleString()} lbs` },
                      { label: "Aggregate", value: `${mixBreakdown.aggregateLbs.toLocaleString()} lbs` },
                      { label: "Water (approx.)", value: `${mixBreakdown.waterGallons.toLocaleString()} gallons` },
                      ...(mixBreakdown.flyAshLbs > 0 ? [{ label: "Fly Ash", value: `${mixBreakdown.flyAshLbs.toLocaleString()} lbs` }] : []),
                    ].map((m) => (
                      <div key={m.label} className="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                        <span className="text-zinc-600 dark:text-zinc-400 font-medium">{m.label}</span>
                        <span className="font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pie chart */}
                {pieData.length > 0 && (
                  <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <PieIcon className="h-3.5 w-3.5 text-blue-500" /> Material Breakdown
                    </h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={75}
                          dataKey="value"
                          paddingAngle={2}
                          stroke="none"
                        >
                          {pieData.map((_, i) => (
                            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => [`${value.toFixed(1)} lbs`, ""]}
                          contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                        />
                        <Legend
                          wrapperStyle={{ fontSize: "10px", fontWeight: 600 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardWrapper>

      {/* ═══════════════════ PRINT / REPORT ═══════════════════ */}
      {latestResult && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsReportOpen(true)}
            className="h-8 text-xs font-bold gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Full Report
          </Button>
        </div>
      )}

      <ReportModal
        open={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        reportData={reportData}
      />

      {/* ═══════════════════ EDUCATIONAL CONTENT ═══════════════════ */}
      <ConcreteContent />
    </div>
  );
}
