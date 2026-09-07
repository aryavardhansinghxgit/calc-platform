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
  RotateCcw,
  Copy,
  Check,
  FileText,
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
  parseCarpentryDimension,
  toInches,
} from "@/lib/calculator-engine/formulas/stair";

// ─── Types & Local Storage Hook ─────────────────────────────────────────────

export interface StairSavedInputs {
  runMode: "one_run" | "total_run";
  runValue: string;
  runUnit: StairLinearUnit;
  totalRise: string;
  riseUnit: StairLinearUnit;
  riseMode: "fixed_rise" | "fixed_steps";
  targetRiserHeight: string;
  fixedStepsCount: string;
  hasTread: boolean;
  treadThickness: string;
  nosingLength: string;
  mountType: MountType;
}

interface SavedStairEstimate<T> {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: T;
  rawInputs?: StairSavedInputs;
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
    (inputSummary: string, result: T, rawInputs?: StairSavedInputs, notes = "") => {
      const entry: SavedStairEstimate<T> = {
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
    <div className="border border-blue-600/30 dark:border-blue-500/30 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-zinc-900 transition-all print:break-inside-avoid">
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
                aria-label="View saved calculations"
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
              aria-label="Save current calculation"
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
  unitOptions = LINEAR_UNITS,
  showUnit = true,
  error,
  placeholder,
  parsedFeedback,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: StairLinearUnit;
  onUnitChange?: (u: StairLinearUnit) => void;
  unitOptions?: { value: StairLinearUnit; label: string }[];
  showUnit?: boolean;
  error?: string;
  placeholder?: string;
  parsedFeedback?: string;
}) {
  return (
    <div className="space-y-0.5">
      <div className="grid grid-cols-12 gap-2 items-center text-xs">
        <label htmlFor={id} className="col-span-5 font-medium text-zinc-700 dark:text-zinc-300 truncate cursor-pointer">
          {label}
        </label>
        <div className={showUnit && unitOptions ? "col-span-4" : "col-span-7"}>
          <Input
            id={id}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 ${
              error ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
          />
        </div>
        {showUnit && unitOptions && onUnitChange && (
          <div className="col-span-3">
            <select
              id={`${id}-unit`}
              value={unit}
              onChange={(e) => onUnitChange(e.target.value as StairLinearUnit)}
              aria-label={`${label} unit`}
              className="w-full h-7 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer"
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
      {parsedFeedback && !error && (
        <div className="grid grid-cols-12 gap-2 text-[10px] text-zinc-500 dark:text-zinc-400 pl-1">
          <div className="col-start-6 col-span-7 italic">{parsedFeedback}</div>
        </div>
      )}
      {error && (
        <div className="grid grid-cols-12 gap-2">
          <p role="alert" className="col-start-6 col-span-7 text-[10px] text-red-600 dark:text-red-400 font-medium">
            {error}
          </p>
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
  onRestore,
}: {
  saved: SavedStairEstimate<T>[];
  isOpen: boolean;
  remove: (id: string) => void;
  clear: () => void;
  cardTitle: string;
  formatSummary: (result: T) => string;
  onRestore?: (raw: StairSavedInputs) => void;
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
            aria-label={`Export saved ${cardTitle} calculations to CSV`}
          >
            <Download className="w-3 h-3" /> CSV
          </button>
          <button
            type="button"
            onClick={clear}
            className="text-[10px] text-zinc-400 hover:text-red-500 cursor-pointer"
            aria-label="Clear all saved stair calculations"
          >
            Clear All
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
              {item.rawInputs && onRestore && (
                <button
                  type="button"
                  onClick={() => onRestore(item.rawInputs!)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 p-1 cursor-pointer rounded hover:bg-blue-50 dark:hover:bg-blue-950/40"
                  title="Restore this saved calculation"
                  aria-label="Restore saved stair calculation"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer rounded hover:bg-red-50 dark:hover:bg-red-950/40"
                title="Delete"
                aria-label="Delete saved stair calculation"
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

// ─── Parametric 2D Scaled Engineering Diagrams ──────────────────────────────

function StairDiagram2D({
  res,
  mountType = "standard",
  showHeadroom = false,
  floorThickness = 10,
  headroomInches = 80,
  openingLength = 120,
  actualHeadroom,
}: {
  res: StairCalculationResult;
  mountType?: MountType;
  showHeadroom?: boolean;
  floorThickness?: number;
  headroomInches?: number;
  openingLength?: number;
  actualHeadroom?: number;
}) {
  // Bounded visual step count for legible, crisp rendering
  const risersCount = res.numberOfRisers;
  const treadsCount = res.numberOfTreads;
  const displaySteps = Math.min(Math.max(3, risersCount), 12);
  const displayTreads = mountType === "flush" ? displaySteps : displaySteps - 1;

  // Box dimensions
  const x0 = 35;
  const y0 = 175;
  const totalW = 220;
  const totalH = 135;

  const dx = totalW / (displayTreads || 1);
  const dy = totalH / (displaySteps || 1);

  // Generate stepped path
  let pathD = `M ${x0},${y0}`;
  let currentX = x0;
  let currentY = y0;

  for (let i = 0; i < displaySteps; i++) {
    currentY -= dy;
    pathD += ` L ${currentX},${currentY}`;
    if (i < displayTreads) {
      currentX += dx;
      pathD += ` L ${currentX},${currentY}`;
    }
  }

  // Stringer body polygon
  const stringerPoints = `${x0},${y0} ${x0 + dx},${y0} ${currentX},${currentY + 12} ${currentX},${currentY} ${currentX - 12},${currentY} ${x0},${y0 - 12}`;

  // Angle arc
  const arcRadius = 24;
  const angleRad = (res.inclineAngleDegrees * Math.PI) / 180;
  const arcX = x0 + arcRadius * Math.cos(angleRad);
  const arcY = y0 - arcRadius * Math.sin(angleRad);

  // Headroom overlay calculations
  const openingRatio = Math.min(1, Math.max(0.2, (openingLength || 120) / (res.totalRunInches || 1)));
  const openingPixelWidth = Math.max(50, totalW * openingRatio);
  const ceilingHeaderX = currentX - openingPixelWidth;
  const joistHeightPx = Math.min(28, Math.max(14, (floorThickness / (res.totalRiseInches || 1)) * totalH * 1.8));

  // Headroom compliance color
  const headroomVal = actualHeadroom !== undefined ? actualHeadroom : res.exactRiserHeightInches;
  const isHeadroomPass = headroomVal >= (headroomInches || 80);

  return (
    <svg
      viewBox="0 0 310 215"
      className="w-full max-w-[290px] mx-auto select-none print:break-inside-avoid"
      aria-label={`Parametric Staircase Diagram: ${res.numberOfRisers} risers, ${res.numberOfTreads} treads, ${res.inclineAngleDegrees} degree slope`}
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

      {/* Floor Reference Dash Lines */}
      <line x1="15" y1={y0} x2={currentX + 25} y2={y0} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
      <line x1={currentX - 40} y1={currentY} x2={currentX + 30} y2={currentY} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />

      {/* Stringer Timber Polygon */}
      <polygon
        points={stringerPoints}
        fill="#84cc16"
        fillOpacity="0.72"
        stroke="#4d7c0f"
        strokeWidth="1.2"
      />

      {/* Stepped Profile */}
      <path
        d={pathD}
        fill="none"
        stroke="#18181b"
        strokeWidth="1.8"
        className="dark:stroke-zinc-100"
      />

      {/* Stringer diagonal live length */}
      <text
        x={(x0 + currentX) / 2 - 4}
        y={(y0 + currentY) / 2 + 10}
        textAnchor="middle"
        transform={`rotate(-${Math.min(48, Math.max(25, res.inclineAngleDegrees))} ${(x0 + currentX) / 2 - 4} ${(y0 + currentY) / 2 + 10})`}
        className="text-[8px] fill-lime-950 dark:fill-lime-100 font-bold"
      >
        stringer: {res.stringerLengthFeet} ft ({res.stringerLengthInches}&quot;)
      </text>

      {/* Step Unit Run annotation */}
      <line
        x1={x0 + dx}
        y1={y0 - dy - 5}
        x2={x0 + dx * 2}
        y2={y0 - dy - 5}
        stroke="#2563eb"
        strokeWidth="0.8"
        markerStart="url(#blue-arr-l)"
        markerEnd="url(#blue-arr)"
      />
      <text
        x={x0 + dx * 1.5}
        y={y0 - dy - 7}
        textAnchor="middle"
        className="text-[7.5px] fill-blue-700 dark:fill-blue-300 font-bold"
      >
        run {res.exactTreadDepthFraction} ({res.exactTreadDepthInches}&quot;)
      </text>

      {/* Step Unit Riser annotation */}
      <line
        x1={x0 + dx * 2 + 5}
        y1={y0 - dy}
        x2={x0 + dx * 2 + 5}
        y2={y0 - dy * 2}
        stroke="#2563eb"
        strokeWidth="0.8"
        markerStart="url(#blue-arr-l)"
        markerEnd="url(#blue-arr)"
      />
      <text
        x={x0 + dx * 2 + 8}
        y={y0 - dy * 1.5 + 2}
        textAnchor="start"
        className="text-[7.5px] fill-blue-700 dark:fill-blue-300 font-bold"
      >
        rise {res.exactRiserHeightFraction}
      </text>

      {/* Angle Arc & Live Label */}
      <path
        d={`M ${x0 + arcRadius},${y0} A ${arcRadius},${arcRadius} 0 0,0 ${arcX},${arcY}`}
        fill="none"
        stroke="#2563eb"
        strokeWidth="1.2"
      />
      <text
        x={x0 + arcRadius + 4}
        y={y0 - 5}
        textAnchor="start"
        className="text-[8.5px] fill-blue-700 dark:fill-blue-400 font-bold"
      >
        {res.inclineAngleDegrees}°
      </text>

      {/* Total Rise (Left vertical dimension line) */}
      <line
        x1="22"
        y1={y0}
        x2="22"
        y2={currentY}
        stroke="#18181b"
        strokeWidth="1"
        markerStart="url(#stair-arr-l)"
        markerEnd="url(#stair-arr)"
        className="dark:stroke-zinc-300"
      />
      <line x1="16" y1={y0} x2="28" y2={y0} stroke="#18181b" strokeWidth="0.8" className="dark:stroke-zinc-300" />
      <line x1="16" y1={currentY} x2="28" y2={currentY} stroke="#18181b" strokeWidth="0.8" className="dark:stroke-zinc-300" />
      <text
        x="18"
        y={(y0 + currentY) / 2}
        textAnchor="middle"
        transform={`rotate(-90 18 ${(y0 + currentY) / 2})`}
        className="text-[8px] fill-zinc-800 dark:fill-zinc-200 font-bold"
      >
        Rise: {res.totalRiseInches}&quot; ({res.totalRiseFeet} ft)
      </text>

      {/* Total Run (Bottom horizontal dimension line) */}
      <line
        x1={x0}
        y1={y0 + 16}
        x2={currentX}
        y2={y0 + 16}
        stroke="#18181b"
        strokeWidth="1"
        markerStart="url(#stair-arr-l)"
        markerEnd="url(#stair-arr)"
        className="dark:stroke-zinc-300"
      />
      <line x1={x0} y1={y0 + 10} x2={x0} y2={y0 + 22} stroke="#18181b" strokeWidth="0.8" className="dark:stroke-zinc-300" />
      <line x1={currentX} y1={y0 + 10} x2={currentX} y2={y0 + 22} stroke="#18181b" strokeWidth="0.8" className="dark:stroke-zinc-300" />
      <text
        x={(x0 + currentX) / 2}
        y={y0 + 28}
        textAnchor="middle"
        className="text-[8px] fill-zinc-800 dark:fill-zinc-200 font-bold"
      >
        Run: {res.totalRunInches}&quot; ({res.totalRunFeet} ft)
      </text>

      {/* Headroom Overlays if Enabled */}
      {showHeadroom && (
        <>
          {/* Ceiling / Upper Floor Joist */}
          <rect
            x={ceilingHeaderX}
            y={currentY - joistHeightPx}
            width={currentX - ceilingHeaderX + 25}
            height={joistHeightPx}
            fill="#94a3b8"
            fillOpacity="0.45"
            stroke="#64748b"
            strokeWidth="1"
          />
          <text
            x={(ceilingHeaderX + currentX) / 2}
            y={currentY - joistHeightPx / 2 + 3}
            textAnchor="middle"
            className="text-[7px] fill-slate-800 dark:fill-slate-200 font-bold"
          >
            floor {floorThickness}&quot;
          </text>

          {/* Floor Opening Horizontal Arrow */}
          <line
            x1={ceilingHeaderX}
            y1={currentY - joistHeightPx - 5}
            x2={currentX}
            y2={currentY - joistHeightPx - 5}
            stroke="#2563eb"
            strokeWidth="0.9"
            markerStart="url(#blue-arr-l)"
            markerEnd="url(#blue-arr)"
          />
          <text
            x={(ceilingHeaderX + currentX) / 2}
            y={currentY - joistHeightPx - 8}
            textAnchor="middle"
            className="text-[7.5px] fill-blue-700 dark:fill-blue-300 font-bold"
          >
            opening {openingLength}&quot;
          </text>

          {/* Headroom Vertical Dimension Line */}
          <line
            x1={ceilingHeaderX}
            y1={currentY}
            x2={ceilingHeaderX}
            y2={y0 - dy * 3}
            stroke={isHeadroomPass ? "#16a34a" : "#dc2626"}
            strokeWidth="1.2"
            strokeDasharray="2 2"
            markerStart="url(#blue-arr-l)"
            markerEnd="url(#blue-arr)"
          />
          <text
            x={ceilingHeaderX - 4}
            y={(currentY + y0 - dy * 3) / 2}
            textAnchor="end"
            className={`text-[8px] font-bold ${
              isHeadroomPass ? "fill-emerald-700 dark:fill-emerald-400" : "fill-red-600 dark:fill-red-400"
            }`}
          >
            {headroomVal}&quot; headroom
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
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 bg-slate-50/50 dark:bg-zinc-900/50 text-xs no-print">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between font-bold text-zinc-700 dark:text-zinc-300 text-[11px] cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-1">
          <Info className="w-3 h-3 text-blue-500" /> Fraction to Decimal Reference Table
        </span>
        <span className="text-blue-600 dark:text-blue-400 text-[10px]">{isOpen ? "Hide" : "Show"}</span>
      </button>

      {isOpen && (
        <div className="mt-2 grid grid-cols-4 gap-1 text-center text-[10px] font-sans tabular-nums">
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">1/16&quot; = 0.0625&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">1/8&quot; = 0.1250&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">3/16&quot; = 0.1875&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">1/4&quot; = 0.2500&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">5/16&quot; = 0.3125&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">3/8&quot; = 0.3750&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">7/16&quot; = 0.4375&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">1/2&quot; = 0.5000&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">9/16&quot; = 0.5625&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">5/8&quot; = 0.6250&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">11/16&quot; = 0.6875&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">3/4&quot; = 0.7500&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">13/16&quot; = 0.8125&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">7/8&quot; = 0.8750&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">15/16&quot; = 0.9375&quot;</div>
          <div className="p-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">1&quot; = 1.0000&quot;</div>
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
  const [fixedStepsCount, setFixedStepsCount] = useState("16");
  const [hasTread, setHasTread] = useState(true);
  const [treadThickness, setTreadThickness] = useState("1.0");
  const [nosingLength, setNosingLength] = useState("0.75");
  const [mountType, setMountType] = useState<MountType>("standard");

  // Validation state
  const [riseError, setRiseError] = useState<string | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [targetRiserError, setTargetRiserError] = useState<string | null>(null);
  const [stepsError, setStepsError] = useState<string | null>(null);
  const [presetNotice, setPresetNotice] = useState<string | null>(null);

  const [stairResult, setStairResult] = useState<StairCalculationResult | null>(null);
  const [stairSaveSuccess, setStairSaveSuccess] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
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
  const [priceHandrails, setPriceHandrails] = useState("0");
  const [taxRate, setTaxRate] = useState("7");
  const [materialResult, setMaterialResult] = useState<StairMaterialResult | null>(null);
  const [materialSaveSuccess, setMaterialSaveSuccess] = useState(false);
  const materialSaved = useCardSaved<StairMaterialResult>("saved_stair_materials");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // ─── Handlers & Validation ───

  const handleStairCalc = useCallback(() => {
    const parsedRise = parseCarpentryDimension(totalRise);
    const parsedRun = parseCarpentryDimension(runValue);

    let hasErr = false;
    if (isNaN(parsedRise) || parsedRise <= 0) {
      setRiseError("Enter a positive rise (e.g. 10 or 120)");
      hasErr = true;
    } else {
      setRiseError(null);
    }

    if (isNaN(parsedRun) || parsedRun <= 0) {
      setRunError("Enter a positive run (e.g. 10 or 10 1/4)");
      hasErr = true;
    } else {
      setRunError(null);
    }

    let parsedTarget = 7.5;
    if (stairTab === "comprehensive" && riseMode === "fixed_rise") {
      parsedTarget = parseCarpentryDimension(targetRiserHeight);
      if (isNaN(parsedTarget) || parsedTarget <= 0) {
        setTargetRiserError("Enter a valid target riser height (e.g. 7.5 or 7 1/2)");
        hasErr = true;
      } else {
        setTargetRiserError(null);
      }
    }

    let parsedSteps = 16;
    if (stairTab === "comprehensive" && riseMode === "fixed_steps") {
      const s = parseInt(fixedStepsCount, 10);
      if (isNaN(s) || s < 1) {
        setStepsError("Enter at least 1 step");
        hasErr = true;
      } else {
        setStepsError(null);
        parsedSteps = s;
      }
    }

    if (hasErr) {
      return;
    }

    if (stairTab === "basic") {
      const res = calculateBasicStair({
        runMode,
        runValue: parsedRun,
        runUnit,
        totalRise: parsedRise,
        riseUnit,
      });
      setStairResult(res);
    } else {
      const parsedThickness = parseCarpentryDimension(treadThickness);
      const parsedNosing = parseCarpentryDimension(nosingLength);

      const res = calculateComprehensiveStair({
        runMode,
        runValue: parsedRun,
        runUnit,
        totalRise: parsedRise,
        riseUnit,
        riseMode,
        targetRiserHeight: parsedTarget,
        fixedStepsCount: parsedSteps,
        hasTread,
        treadThickness: !isNaN(parsedThickness) && parsedThickness > 0 ? parsedThickness : 1.0,
        nosingLength: !isNaN(parsedNosing) && parsedNosing >= 0 ? parsedNosing : 0.75,
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
    const ft = parseCarpentryDimension(floorThickness);
    const th = parseCarpentryDimension(targetHeadroom);
    const ol = parseCarpentryDimension(openingLength);

    const res = calculateHeadroomOpening({
      totalRiseInches: stairResult.totalRiseInches,
      totalRunInches: stairResult.totalRunInches,
      riserHeightInches: stairResult.exactRiserHeightInches,
      treadDepthInches: stairResult.exactTreadDepthInches,
      floorThicknessInches: !isNaN(ft) && ft > 0 ? ft : 10,
      targetHeadroomInches: !isNaN(th) && th > 0 ? th : 80,
      stairwellOpeningInches: !isNaN(ol) && ol > 0 ? ol : 120,
    });
    setHeadroomResult(res);
  }, [stairResult, floorThickness, targetHeadroom, openingLength]);

  const handleMaterialCalc = useCallback(() => {
    if (!stairResult) return;
    const pStr = parseFloat(priceStringer) || 0;
    const pTr = parseFloat(priceTread) || 0;
    const pRis = parseFloat(priceRiser) || 0;
    const pFast = parseFloat(priceFasteners) || 0;
    const pHrail = parseFloat(priceHandrails) || 0;
    const tx = parseFloat(taxRate) || 0;

    const res = calculateStairMaterials({
      stairResult,
      materialInput: {
        stairWidthInches: parseInt(stairWidth, 10) || 36,
        stringerLumberSize: stringerSize,
        treadMaterial,
        riserMaterial,
        pricePerStringerBoard: Math.max(0, pStr),
        pricePerTread: Math.max(0, pTr),
        pricePerRiser: Math.max(0, pRis),
        fastenersAndBracketsCost: Math.max(0, pFast),
        handrailCost: Math.max(0, pHrail),
        taxRatePercent: Math.max(0, Math.min(100, tx)),
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
    priceHandrails,
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

  // ─── Preset Handlers ───
  const applyPreset = (
    rise: string,
    rUnit: StairLinearUnit,
    targetRiser: string,
    run: string,
    notice?: string
  ) => {
    setTotalRise(rise);
    setRiseUnit(rUnit);
    setRunMode("one_run");
    setRunValue(run);
    setRunUnit("inches");
    setRiseMode("fixed_rise");
    setTargetRiserHeight(targetRiser);
    setMountType("standard");
    setPresetNotice(notice || null);
  };

  // ─── Save & Restore Handlers ───
  const handleRestoreState = (inputs: StairSavedInputs) => {
    setRunMode(inputs.runMode);
    setRunValue(inputs.runValue);
    setRunUnit(inputs.runUnit);
    setTotalRise(inputs.totalRise);
    setRiseUnit(inputs.riseUnit);
    setRiseMode(inputs.riseMode);
    setTargetRiserHeight(inputs.targetRiserHeight);
    setFixedStepsCount(inputs.fixedStepsCount);
    setHasTread(inputs.hasTread);
    setTreadThickness(inputs.treadThickness);
    setNosingLength(inputs.nosingLength);
    setMountType(inputs.mountType);
    setPresetNotice(null);
    flashSave(setStairSaveSuccess);
  };

  // ─── Copy Actions ───
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const copyResultText = useMemo(() => {
    if (!stairResult) return "";
    return `Stair: ${stairResult.numberOfRisers} risers × ${stairResult.exactRiserHeightInches}" (${stairResult.exactRiserHeightFraction}), ${stairResult.numberOfTreads} treads × ${stairResult.exactTreadDepthInches}" (${stairResult.exactTreadDepthFraction}), Total Run = ${stairResult.totalRunInches}" (${stairResult.totalRunFeet} ft), Incline = ${stairResult.inclineAngleDegrees}°, Stringer = ${stairResult.stringerLengthInches}" (${stairResult.stringerLengthFeet} ft)`;
  }, [stairResult]);

  const copySummaryText = useMemo(() => {
    if (!stairResult) return "";
    return [
      `STAIRCASE CALCULATION SUMMARY`,
      `----------------------------------------`,
      `Total Rise: ${stairResult.totalRiseInches}" (${stairResult.totalRiseFeet} ft)`,
      `Risers Count: ${stairResult.numberOfRisers} steps`,
      `Exact Riser Height: ${stairResult.exactRiserHeightInches}" (${stairResult.exactRiserHeightFraction})`,
      `Treads Count: ${stairResult.numberOfTreads} treads`,
      `Unit Tread Run: ${stairResult.exactTreadDepthInches}" (${stairResult.exactTreadDepthFraction})`,
      `Total Run Length: ${stairResult.totalRunInches}" (${stairResult.totalRunFeet} ft)`,
      `Incline Angle: ${stairResult.inclineAngleDegrees}°`,
      `Stringer Cut Length: ${stairResult.stringerLengthInches}" (${stairResult.stringerLengthFeet} ft)`,
      `Mount Type: ${stairResult.mountType === "standard" ? "Standard Drop" : "Flush Top Mount"}`,
      `Bottom Stringer Cut: Minus ${stairResult.treadThicknessInches}" for tread thickness`,
      `Blondel Comfort (2R+T): ${stairResult.compliance.blondelValue.toFixed(1)}"`,
      `Code Status: ${stairResult.compliance.isCompliant ? "COMPLIANT (Model Code Check)" : "WARNING (Verify Dimensions)"}`,
      `Reference: Model Code Check (IRC R311.7 / IBC 1011). Always verify locally adopted building codes.`,
    ].join("\n");
  }, [stairResult]);

  const copyLatexText = useMemo(() => {
    if (!stairResult) return "";
    return [
      `N_{\\text{risers}} = \\left\\lceil \\frac{H}{R_{\\text{target}}} \\right\\rceil = \\left\\lceil \\frac{${stairResult.totalRiseInches}}{${targetRiserHeight}} \\right\\rceil = ${stairResult.numberOfRisers}`,
      `R = \\frac{H}{N_{\\text{risers}}} = \\frac{${stairResult.totalRiseInches}}{${stairResult.numberOfRisers}} = ${stairResult.exactRiserHeightInches}\\text{ in}`,
      `N_{\\text{treads}} = ${stairResult.mountType === "standard" ? "N_{\\text{risers}} - 1" : "N_{\\text{risers}}"} = ${stairResult.numberOfTreads}`,
      `\\text{Run} = N_{\\text{treads}} \\times D = ${stairResult.numberOfTreads} \\times ${stairResult.exactTreadDepthInches} = ${stairResult.totalRunInches}\\text{ in}`,
      `\\theta = \\arctan\\left(\\frac{H}{\\text{Run}}\\right) = \\arctan\\left(\\frac{${stairResult.totalRiseInches}}{${stairResult.totalRunInches}}\\right) = ${stairResult.inclineAngleDegrees}^\\circ`,
      `L = \\sqrt{H^2 + \\text{Run}^2} = \\sqrt{${stairResult.totalRiseInches}^2 + ${stairResult.totalRunInches}^2} = ${stairResult.stringerLengthInches}\\text{ in} \\approx ${stairResult.stringerLengthFeet}\\text{ ft}`,
    ].join("\n");
  }, [stairResult, targetRiserHeight]);

  const downloadCsv = () => {
    if (!stairResult) return;
    const rows = [
      ["Parameter", "Value", "Unit"],
      ["Total Rise", stairResult.totalRiseInches, "inches"],
      ["Total Rise Feet", stairResult.totalRiseFeet, "ft"],
      ["Riser Count", stairResult.numberOfRisers, "steps"],
      ["Exact Riser Height", stairResult.exactRiserHeightInches, "inches"],
      ["Exact Riser Fraction", stairResult.exactRiserHeightFraction, "fraction"],
      ["Tread Count", stairResult.numberOfTreads, "treads"],
      ["Unit Run Depth", stairResult.exactTreadDepthInches, "inches"],
      ["Total Run Length", stairResult.totalRunInches, "inches"],
      ["Total Run Feet", stairResult.totalRunFeet, "ft"],
      ["Incline Angle", stairResult.inclineAngleDegrees, "degrees"],
      ["Stringer Length", stairResult.stringerLengthInches, "inches"],
      ["Stringer Length Feet", stairResult.stringerLengthFeet, "ft"],
      ["Mount Type", stairResult.mountType, "type"],
      ["Bottom Stringer Cut", stairResult.treadThicknessInches, "inches"],
      ["Blondel Comfort (2R+T)", stairResult.compliance.blondelValue.toFixed(1), "inches"],
      ["Timestamp", new Date().toISOString(), "ISO-8601"],
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `stair_calculation_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadTxt = () => {
    if (!stairResult) return;
    const blob = new Blob([copySummaryText], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `stair_cut_sheet_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Report Data Compilation ───
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];
    if (stairResult) {
      sections.push({
        title: "Staircase Geometry & Cut Dimensions",
        items: [
          { label: "Total Rise (Finished Floor to Floor)", value: `${stairResult.totalRiseInches}" (${stairResult.totalRiseFeet} ft)` },
          { label: "Number of Risers (Step Count)", value: `${stairResult.numberOfRisers} steps` },
          { label: "Exact Unit Riser Height", value: `${stairResult.exactRiserHeightFraction} (${stairResult.exactRiserHeightInches}")` },
          { label: "Number of Treads", value: `${stairResult.numberOfTreads} treads` },
          { label: "Unit Tread Run", value: `${stairResult.exactTreadDepthFraction} (${stairResult.exactTreadDepthInches}")` },
          { label: "Effective Tread Surface", value: `${stairResult.effectiveTreadSurfaceInches}" (incl. nosing)` },
          { label: "Total Run Length", value: `${stairResult.totalRunInches}" (${stairResult.totalRunFeet} ft)` },
          { label: "Incline Angle", value: `${stairResult.inclineAngleDegrees}°` },
          { label: "Stringer Cut Diagonal Length", value: `${stairResult.stringerLengthInches}" (${stairResult.stringerLengthFeet} ft)` },
          { label: "Mount Configuration", value: stairResult.mountType === "standard" ? "Standard Stringer Drop" : "Flush Top Mount" },
          { label: "Bottom Stringer Foot Drop", value: `Trim minus ${stairResult.treadThicknessInches}" for tread thickness` },
          { label: "Blondel Ergonomic Comfort (2R+T)", value: `${stairResult.compliance.blondelValue.toFixed(1)}" (Optimal: 24"–25")` },
          { label: "Model Code Reference Check", value: stairResult.compliance.isCompliant ? "COMPLIANT (IRC R311.7)" : "WARNING (Verify Dimensions)" },
        ],
      });
    }
    if (headroomResult) {
      sections.push({
        title: "Headroom & Stairwell Opening",
        items: [
          { label: "Upper Floor / Joist Thickness", value: `${headroomResult.floorThicknessInches}"` },
          { label: "Stairwell Opening Length", value: `${headroomResult.openingLengthInches}" (${headroomResult.openingLengthFeet} ft)` },
          { label: "Actual Headroom Clearance", value: `${headroomResult.actualHeadroomInches}" (${headroomResult.actualHeadroomFeet} ft)` },
          { label: "Minimum Required Opening Length", value: `${headroomResult.minRequiredOpeningInches}" (${headroomResult.minRequiredOpeningFeet} ft)` },
          { label: "Steps Covered Under Ceiling", value: `${headroomResult.stepsUnderCeiling} steps` },
          { label: "Headroom IRC R311.7.2 Status", value: headroomResult.isCompliant ? "PASS (≥ 80\")" : "FAIL (< 80\")" },
        ],
      });
    }
    if (materialResult) {
      sections.push({
        title: "Lumber, Treads & Cost Estimate",
        items: [
          { label: "Recommended Stringers", value: `${materialResult.stringersCount} boards (${materialResult.stringerBoardLengthFt}ft ${materialResult.stringerBoardSize})` },
          { label: "Tread Boards Needed", value: `${materialResult.totalTreadsCount} pcs` },
          { label: "Riser Boards Needed", value: `${materialResult.totalRisersCount} pcs` },
          { label: "Stringer Lumber Cost", value: `$${materialResult.stringerLumberCost.toFixed(2)}` },
          { label: "Tread Boards Cost", value: `$${materialResult.treadsCost.toFixed(2)}` },
          { label: "Riser Boards Cost", value: `$${materialResult.risersCost.toFixed(2)}` },
          { label: "Structural Hardware & Fasteners", value: `$${materialResult.fastenersCost.toFixed(2)}` },
          { label: "Handrails & Extras", value: `$${materialResult.handrailCost.toFixed(2)}` },
          { label: "Materials Subtotal", value: `$${materialResult.materialsSubtotal.toFixed(2)}` },
          { label: `Estimated Sales Tax (${taxRate}%)`, value: `$${materialResult.taxCost.toFixed(2)}` },
          { label: "Total Estimated Project Cost", value: `$${materialResult.totalEstimatedCost.toFixed(2)}` },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Stair Calculator",
        reportTitle: "Staircase Engineering, Layout & Cut Sheet Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        currencySymbol: "$",
      },
      keyMetrics: [
        { label: "Number of Risers", value: stairResult ? `${stairResult.numberOfRisers} steps` : "—", highlight: true },
        { label: "Exact Riser Height", value: stairResult ? `${stairResult.exactRiserHeightFraction} (${stairResult.exactRiserHeightInches}")` : "—" },
        { label: "Total Run", value: stairResult ? `${stairResult.totalRunFeet} ft` : "—" },
        { label: "Incline Angle", value: stairResult ? `${stairResult.inclineAngleDegrees}°` : "—" },
      ],
      sections,
    };
  }, [stairResult, headroomResult, materialResult, targetRiserHeight, taxRate]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ CARD 1: STRAIGHT RUN STAIR CALCULATOR ═══════════════════ */}
      <CardWrapper
        title="Stair Calculator (Riser, Tread &amp; Stringer Geometry)"
        hasResult={!!stairResult}
        isSaved={stairSaveSuccess}
        savedCount={stairSaved.saved.length}
        onToggleSaved={() => stairSaved.setIsOpen(!stairSaved.isOpen)}
        onSave={() => {
          if (!stairResult) return;
          stairSaved.save(
            `Rise: ${totalRise} ${riseUnit}, Run: ${runValue} ${runUnit}, ${stairResult.numberOfRisers} risers`,
            stairResult,
            {
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
            }
          );
          flashSave(setStairSaveSuccess);
        }}
      >
        {/* Version Switcher Tabs */}
        <div className="flex gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800 no-print">
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

        {/* Geometric Presets Toolbar */}
        <div className="p-2 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 text-xs space-y-1.5 no-print">
          <div className="flex items-center justify-between">
            <span className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Geometry Presets:
            </span>
            <span className="text-[10px] text-zinc-400">Click to apply standard slope ratios</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => applyPreset("9", "feet", "7.5", "10")}
              className="px-2 py-0.5 bg-white dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-zinc-200 dark:border-zinc-700 rounded text-[10.5px] font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer transition-colors"
            >
              3-4-5 (Standard 37°)
            </button>
            <button
              type="button"
              onClick={() => applyPreset("5", "feet", "6.0", "12")}
              className="px-2 py-0.5 bg-white dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-zinc-200 dark:border-zinc-700 rounded text-[10.5px] font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer transition-colors"
            >
              5-12-13 (Shallow 23°)
            </button>
            <button
              type="button"
              onClick={() => applyPreset("8", "feet", "8.0", "8")}
              className="px-2 py-0.5 bg-white dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-zinc-200 dark:border-zinc-700 rounded text-[10.5px] font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer transition-colors"
            >
              45° (Loft/Steep)
            </button>
            <button
              type="button"
              onClick={() => applyPreset("7", "feet", "7.0", "11")}
              className="px-2 py-0.5 bg-white dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-zinc-200 dark:border-zinc-700 rounded text-[10.5px] font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer transition-colors"
            >
              30° (Ergonomic)
            </button>
            <button
              type="button"
              onClick={() =>
                applyPreset(
                  "30",
                  "inches",
                  "7.5",
                  "10",
                  "Ramp reference only: ADA guidelines require 1:12 maximum slope (4.76°) for accessible ramps. Ramp geometry does not apply to stairs."
                )
              }
              className="px-2 py-0.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 border border-amber-300 dark:border-amber-800 rounded text-[10.5px] font-medium text-amber-900 dark:text-amber-200 cursor-pointer transition-colors"
            >
              1:12 ADA Ramp Ref
            </button>
          </div>
          {presetNotice && (
            <div className="p-1.5 bg-amber-100/70 dark:bg-amber-950/60 rounded border border-amber-300 dark:border-amber-800 text-[10px] text-amber-900 dark:text-amber-200">
              {presetNotice}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Column: Inputs */}
          <div className="md:col-span-7 space-y-2.5">
            {/* Run mode selector */}
            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Run Mode:</span>
              <label htmlFor="run-mode-one" className="flex items-center gap-1 cursor-pointer">
                <input
                  id="run-mode-one"
                  type="radio"
                  name="runMode"
                  checked={runMode === "one_run"}
                  onChange={() => setRunMode("one_run")}
                  className="text-blue-600"
                />
                <span>Use One Run</span>
              </label>
              <label htmlFor="run-mode-total" className="flex items-center gap-1 cursor-pointer">
                <input
                  id="run-mode-total"
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
              id="stair-run-val"
              label={runMode === "one_run" ? "Unit Run (Tread Depth)" : "Total Run"}
              value={runValue}
              onChange={setRunValue}
              unit={runUnit}
              onUnitChange={setRunUnit}
              error={runError || undefined}
              placeholder="e.g. 10 or 10 1/4"
              parsedFeedback={
                runValue.includes("/") && !isNaN(parseCarpentryDimension(runValue))
                  ? `(= ${parseCarpentryDimension(runValue).toFixed(3)}")`
                  : undefined
              }
            />

            <InputRow
              id="stair-total-rise"
              label="Total Rise (Height)"
              value={totalRise}
              onChange={setTotalRise}
              unit={riseUnit}
              onUnitChange={setRiseUnit}
              error={riseError || undefined}
              placeholder="e.g. 10 or 108"
              parsedFeedback={
                totalRise.includes("/") && !isNaN(parseCarpentryDimension(totalRise))
                  ? `(= ${parseCarpentryDimension(totalRise).toFixed(3)})`
                  : undefined
              }
            />

            {/* Comprehensive Options */}
            {stairTab === "comprehensive" && (
              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                {/* Rise mode selector */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-5 font-semibold text-zinc-700 dark:text-zinc-300">Rise Method:</span>
                  <div className="col-span-7 flex items-center gap-3">
                    <label htmlFor="rise-mode-target" className="flex items-center gap-1 cursor-pointer">
                      <input
                        id="rise-mode-target"
                        type="radio"
                        name="riseMode"
                        checked={riseMode === "fixed_rise"}
                        onChange={() => setRiseMode("fixed_rise")}
                      />
                      <span>Target Rise</span>
                    </label>
                    <label htmlFor="rise-mode-fixed" className="flex items-center gap-1 cursor-pointer">
                      <input
                        id="rise-mode-fixed"
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
                    id="stair-target-riser"
                    label="Target Step Height"
                    value={targetRiserHeight}
                    onChange={setTargetRiserHeight}
                    showUnit={false}
                    error={targetRiserError || undefined}
                    placeholder="e.g. 7.5 or 7 1/2"
                    parsedFeedback={
                      targetRiserHeight.includes("/") && !isNaN(parseCarpentryDimension(targetRiserHeight))
                        ? `(= ${parseCarpentryDimension(targetRiserHeight).toFixed(3)}")`
                        : undefined
                    }
                  />
                ) : (
                  <InputRow
                    id="stair-fixed-steps"
                    label="Fixed Number of Steps"
                    value={fixedStepsCount}
                    onChange={setFixedStepsCount}
                    showUnit={false}
                    error={stepsError || undefined}
                    placeholder="e.g. 16"
                  />
                )}

                {/* Tread Thickness & Nosing */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-5 font-semibold text-zinc-700 dark:text-zinc-300">Tread Overhang:</span>
                  <div className="col-span-7 flex items-center gap-3">
                    <label htmlFor="tread-overhang-yes" className="flex items-center gap-1 cursor-pointer">
                      <input
                        id="tread-overhang-yes"
                        type="radio"
                        name="hasTread"
                        checked={hasTread}
                        onChange={() => setHasTread(true)}
                      />
                      <span>Has Tread / Nosing</span>
                    </label>
                    <label htmlFor="tread-overhang-no" className="flex items-center gap-1 cursor-pointer">
                      <input
                        id="tread-overhang-no"
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
                      id="stair-tread-thick"
                      label="Tread Thickness"
                      value={treadThickness}
                      onChange={setTreadThickness}
                      showUnit={false}
                      placeholder="e.g. 1.0 or 1 1/8"
                    />
                    <InputRow
                      id="stair-nosing-len"
                      label="Nosing Length"
                      value={nosingLength}
                      onChange={setNosingLength}
                      showUnit={false}
                      placeholder="e.g. 0.75 or 3/4"
                    />
                  </div>
                )}

                {/* Mount type */}
                <div className="grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-5 font-semibold text-zinc-700 dark:text-zinc-300">Stringer Mount:</span>
                  <div className="col-span-7 flex items-center gap-3">
                    <label htmlFor="mount-standard" className="flex items-center gap-1 cursor-pointer">
                      <input
                        id="mount-standard"
                        type="radio"
                        name="mountType"
                        checked={mountType === "standard"}
                        onChange={() => setMountType("standard")}
                      />
                      <span>Standard Drop</span>
                    </label>
                    <label htmlFor="mount-flush" className="flex items-center gap-1 cursor-pointer">
                      <input
                        id="mount-flush"
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

            <div className="flex gap-2 pt-2 no-print">
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
                  setRiseUnit("feet");
                  setTargetRiserHeight("7.5");
                  setFixedStepsCount("16");
                  setMountType("standard");
                  setRiseError(null);
                  setRunError(null);
                  setTargetRiserError(null);
                  setStepsError(null);
                  setPresetNotice(null);
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>

            <FractionTable />
          </div>

          {/* Right Column: 2D Parametric Engineering Diagram */}
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
          <div className="space-y-3 pt-2" aria-live="polite">
            {/* Building Code Compliance & Reference Disclaimer Banner */}
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
                    ? "Model Code Reference Check (IRC R311.7 / IBC 1011)"
                    : "Building Code Compliance Warning"}
                </span>
                {stairResult.compliance.messages.length > 0 ? (
                  <ul className="list-disc list-inside text-[11px] space-y-0.5 text-zinc-700 dark:text-zinc-300">
                    {stairResult.compliance.messages.map((msg, i) => (
                      <li key={i}>{msg}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-[11px] leading-relaxed">
                    Riser height (≤ 7.75&quot;), tread depth (≥ 10&quot;), and incline angle (30°–37°) meet residential model safety codes. Verify with your local municipal building department.
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
                <span className="text-[10px] text-blue-700 dark:text-blue-300 block">({stairResult.exactRiserHeightInches}&quot;)</span>
              </div>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Total Run Length</span>
                <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {stairResult.totalRunFeet} <span className="text-xs font-normal">ft</span>
                </span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300 block">({stairResult.totalRunInches}&quot;)</span>
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
                <div>• Unit Tread Run: <strong>{stairResult.exactTreadDepthFraction}</strong> ({stairResult.exactTreadDepthInches}&quot;)</div>
                <div>• Effective Tread Width: <strong>{stairResult.effectiveTreadSurfaceInches}&quot;</strong> (incl. nosing)</div>
                <div>• Stringer Cut Length: <strong>{stairResult.stringerLengthInches}&quot;</strong> ({stairResult.stringerLengthFeet} ft)</div>
                <div>• Blondel Comfort (2R+T): <strong>{stairResult.compliance.blondelValue.toFixed(1)}&quot;</strong> (Optimal: 24&quot;–25&quot;)</div>
                <div>• Bottom Stringer Cut: <strong>Minus {stairResult.treadThicknessInches}&quot;</strong> (for tread thickness)</div>
              </div>
            </div>

            {/* Action Toolbar: Copy Result, Copy LaTeX, CSV, TXT */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800 no-print">
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => copyToClipboard(copyResultText, "Result copied!")}
                  className="px-2 py-1 text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded flex items-center gap-1 cursor-pointer transition-colors"
                  aria-label="Copy concise stair calculation result"
                >
                  <Copy className="w-3 h-3" /> Copy Result
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(copySummaryText, "Summary copied!")}
                  className="px-2 py-1 text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded flex items-center gap-1 cursor-pointer transition-colors"
                  aria-label="Copy full stair calculation summary"
                >
                  <FileText className="w-3 h-3" /> Copy Summary
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(copyLatexText, "LaTeX copied!")}
                  className="px-2 py-1 text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded flex items-center gap-1 cursor-pointer transition-colors"
                  aria-label="Copy mathematical LaTeX formulas"
                >
                  <span>LaTeX</span>
                </button>
                <button
                  type="button"
                  onClick={downloadCsv}
                  className="px-2 py-1 text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded flex items-center gap-1 cursor-pointer transition-colors"
                  aria-label="Download calculation as CSV spreadsheet"
                >
                  <Download className="w-3 h-3" /> CSV
                </button>
                <button
                  type="button"
                  onClick={downloadTxt}
                  className="px-2 py-1 text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded flex items-center gap-1 cursor-pointer transition-colors"
                  aria-label="Download text cut sheet"
                >
                  <Download className="w-3 h-3" /> TXT
                </button>
              </div>
              {copyFeedback && (
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> {copyFeedback}
                </span>
              )}
            </div>
          </div>
        )}

        <SavedEstimatesDrawer
          {...stairSaved}
          cardTitle="Stair Geometry"
          formatSummary={(r) => `${r.numberOfRisers} risers @ ${r.exactRiserHeightFraction}, Angle: ${r.inclineAngleDegrees}°`}
          onRestore={handleRestoreState}
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
              id="stair-floor-thick"
              label="Upper Floor / Joist Thickness"
              value={floorThickness}
              onChange={setFloorThickness}
              showUnit={false}
              placeholder="e.g. 10 or 12"
            />
            <InputRow
              id="stair-target-headroom"
              label="Target Headroom Clearance"
              value={targetHeadroom}
              onChange={setTargetHeadroom}
              showUnit={false}
              placeholder="e.g. 80"
            />
            <InputRow
              id="stair-opening-len"
              label="Stairwell Opening Length"
              value={openingLength}
              onChange={setOpeningLength}
              showUnit={false}
              placeholder="e.g. 120"
            />

            <div className="flex gap-2 pt-1 no-print">
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
                floorThickness={parseCarpentryDimension(floorThickness) || 10}
                headroomInches={parseCarpentryDimension(targetHeadroom) || 80}
                openingLength={parseCarpentryDimension(openingLength) || 120}
                actualHeadroom={headroomResult ? headroomResult.actualHeadroomInches : undefined}
              />
            )}
          </div>
        </div>

        {headroomResult && (
          <div className="space-y-2.5 pt-2" aria-live="polite">
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
                  {headroomResult.actualHeadroomInches}&quot; ({headroomResult.actualHeadroomFeet} ft)
                </span>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">Min Required Opening</span>
                <span className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                  {headroomResult.minRequiredOpeningInches}&quot; ({headroomResult.minRequiredOpeningFeet} ft)
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
              <label htmlFor="stair-width-select" className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Staircase Width:
              </label>
              <select
                id="stair-width-select"
                value={stairWidth}
                onChange={(e) => setStairWidth(e.target.value)}
                className="w-full h-7 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                <option value="36">36 inches (Standard 3 Stringers)</option>
                <option value="42">42 inches (4 Stringers)</option>
                <option value="48">48 inches (4 Stringers)</option>
                <option value="60">60 inches (5 Stringers)</option>
              </select>
            </div>

            <div>
              <label htmlFor="stringer-lumber-select" className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Stringer Lumber Size:
              </label>
              <select
                id="stringer-lumber-select"
                value={stringerSize}
                onChange={(e) => {
                  const size = e.target.value as "2x10" | "2x12";
                  setStringerSize(size);
                  setPriceStringer(size === "2x12" ? "38" : "28");
                }}
                className="w-full h-7 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                <option value="2x12">2x12 Dimensional Board (Recommended - $38)</option>
                <option value="2x10">2x10 Dimensional Board ($28)</option>
              </select>
            </div>

            <div>
              <label htmlFor="tread-material-select" className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Tread Material Preset:
              </label>
              <select
                id="tread-material-select"
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
                className="w-full h-7 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 cursor-pointer"
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
                  setPriceStringer("35");
                  setPriceTread("24");
                  setPriceRiser("14");
                  setPriceFasteners("45");
                  setPriceHandrails("0");
                  setTaxRate("7");
                }}
                className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer no-print"
              >
                Reset Reference Prices ($35 / $24 / $14)
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              <div>
                <label htmlFor="price-stringer-in" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Stringer Board ($/ea)</label>
                <Input
                  id="price-stringer-in"
                  type="number"
                  value={priceStringer}
                  onChange={(e) => setPriceStringer(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="price-tread-in" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Tread Board ($/ea)</label>
                <Input
                  id="price-tread-in"
                  type="number"
                  value={priceTread}
                  onChange={(e) => setPriceTread(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="price-riser-in" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Riser Board ($/ea)</label>
                <Input
                  id="price-riser-in"
                  type="number"
                  value={priceRiser}
                  onChange={(e) => setPriceRiser(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="price-fasteners-in" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Brackets &amp; Screws ($)</label>
                <Input
                  id="price-fasteners-in"
                  type="number"
                  value={priceFasteners}
                  onChange={(e) => setPriceFasteners(e.target.value)}
                  min={0}
                  step={5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="price-handrails-in" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Handrails/Extras ($)</label>
                <Input
                  id="price-handrails-in"
                  type="number"
                  value={priceHandrails}
                  onChange={(e) => setPriceHandrails(e.target.value)}
                  min={0}
                  step={10}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="price-tax-in" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Sales Tax (%)</label>
                <Input
                  id="price-tax-in"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  min={0}
                  max={100}
                  step={0.5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 no-print">
            <Button
              onClick={handleMaterialCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Recalculate Material Total
            </Button>
          </div>

          {materialResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800" aria-live="polite">
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
                    {materialResult.handrailCost > 0 && (
                      <tr>
                        <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">
                          Handrails / Code Hardware Extras
                        </td>
                        <td className="py-1">1 package</td>
                        <td className="py-1">${materialResult.handrailCost.toFixed(2)}</td>
                        <td className="py-1 text-right font-semibold">${materialResult.handrailCost.toFixed(2)}</td>
                      </tr>
                    )}
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
      <div className="flex items-center justify-end pt-1 no-print">
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
