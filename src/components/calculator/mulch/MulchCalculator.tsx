"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Download,
  Trash2,
  Plus,
  FileSpreadsheet,
  Layers,
  Sparkles,
  ShieldCheck,
  Building2,
  Hammer,
  Trees,
  Truck,
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  ShoppingBag,
  RotateCcw,
  Copy,
  FileText,
  Code2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  DimensionUnit,
  DepthUnit,
  MulchType,
  VehicleType,
  BedShape,
  MULCH_TYPES,
  VEHICLE_CAPACITIES,
  calculateRectangularMulch,
  calculateCircularMulch,
  calculateMultiBedLandscape,
  calculateTruckLoads,
  RectangularMulchResult,
  CircularMulchResult,
  MultiBedResult,
  TruckLoadResult,
  LandscapeBedSection,
} from "@/lib/calculator-engine/formulas/mulch";

// ─── Local Storage Hook with Full Raw State Persistence ─────────────────────

interface SavedMulchEstimate<T> {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: T;
  rawInputs: Record<string, any>;
  notes?: string;
}

function flashSave(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
}

function useCardSaved<T>(storageKey: string) {
  const [saved, setSaved] = useState<SavedMulchEstimate<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: T, rawInputs: Record<string, any>, notes = "") => {
      const entry: SavedMulchEstimate<T> = {
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

// ─── Clipboard Helper with Fallback ─────────────────────────────────────────

function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => fallbackCopy(text));
  }
  return Promise.resolve(fallbackCopy(text));
}

function fallbackCopy(text: string): boolean {
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textarea);
    return successful;
  } catch {
    return false;
  }
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
    <div className="border border-blue-600/30 dark:border-blue-500/30 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-zinc-900 transition-all break-inside-avoid">
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
                aria-label={`View ${savedCount} saved calculations`}
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
              aria-label="Save this calculation"
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

// ─── Card Quick Action Toolbar (Copy, LaTeX, CSV, TXT) ─────────────────────

function CardActionBar({
  onCopyResult,
  onCopySummary,
  onCopyLatex,
  onExportCsv,
  onExportTxt,
}: {
  onCopyResult: () => void;
  onCopySummary: () => void;
  onCopyLatex: () => void;
  onExportCsv?: () => void;
  onExportTxt?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs no-print">
      <button
        type="button"
        onClick={onCopyResult}
        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-[11px] transition-colors cursor-pointer"
        title="Copy primary result to clipboard"
        aria-label="Copy primary result to clipboard"
      >
        <Copy className="w-3 h-3 text-zinc-500" /> Copy Result
      </button>

      <button
        type="button"
        onClick={onCopySummary}
        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-[11px] transition-colors cursor-pointer"
        title="Copy full summary to clipboard"
        aria-label="Copy full calculation summary to clipboard"
      >
        <FileText className="w-3 h-3 text-zinc-500" /> Copy Summary
      </button>

      <button
        type="button"
        onClick={onCopyLatex}
        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-[11px] transition-colors cursor-pointer"
        title="Copy mathematical formula as LaTeX"
        aria-label="Copy mathematical formula as LaTeX"
      >
        <Code2 className="w-3 h-3 text-zinc-500" /> Copy LaTeX
      </button>

      {onExportCsv && (
        <button
          type="button"
          onClick={onExportCsv}
          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-[11px] transition-colors cursor-pointer"
          title="Export current calculation as CSV"
          aria-label="Export current calculation as CSV"
        >
          <Download className="w-3 h-3 text-zinc-500" /> CSV
        </button>
      )}

      {onExportTxt && (
        <button
          type="button"
          onClick={onExportTxt}
          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-[11px] transition-colors cursor-pointer"
          title="Export current calculation as TXT"
          aria-label="Export current calculation as TXT"
        >
          <FileText className="w-3 h-3 text-zinc-500" /> TXT
        </button>
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
  saved: SavedMulchEstimate<T>[];
  isOpen: boolean;
  remove: (id: string) => void;
  clear: () => void;
  cardTitle: string;
  formatSummary: (result: T) => string;
  onRestore?: (raw: Record<string, any>) => void;
}) {
  if (!isOpen || saved.length === 0) return null;

  const exportCsv = () => {
    const rows = [
      ["Timestamp", "Input Summary", "Result Summary"],
      ...saved.map((e) => [e.timestamp, e.inputSummary, formatSummary(e.result)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mulch_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_history.csv`;
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
            aria-label="Clear all saved calculations"
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
                  onClick={() => onRestore(item.rawInputs)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 p-1 cursor-pointer rounded hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center gap-0.5 text-[10px] font-semibold"
                  title="Restore saved calculation"
                  aria-label="Restore saved calculation"
                >
                  <RotateCcw className="w-3 h-3" /> Restore
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer rounded hover:bg-red-50 dark:hover:bg-red-950/40"
                title="Delete"
                aria-label="Delete saved calculation"
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

// ─── 2D Scaled Mulch Cross-Section Visualizer ───────────────────────────────

function MulchCrossSectionVisualizer2D({
  depthInches,
  depthCm,
  mulchName,
}: {
  depthInches: number;
  depthCm: number;
  mulchName: string;
}) {
  const mulchH = Math.min(50, Math.max(12, depthInches * 10));

  return (
    <div className="w-full flex flex-col items-center select-none">
      <svg
        viewBox="0 0 240 140"
        className="w-full max-w-[220px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 shadow-xs"
        aria-label={`2D Mulch Bed Cross Section showing ${depthInches} inches of ${mulchName}`}
      >
        <defs>
          <pattern id="mulchPattern" width="16" height="12" patternUnits="userSpaceOnUse">
            <rect width="16" height="12" fill="#78350f" fillOpacity="0.9" />
            <circle cx="4" cy="4" r="1.5" fill="#451a03" />
            <circle cx="12" cy="8" r="1.5" fill="#9a3412" />
            <rect x="7" y="2" width="4" height="2" rx="1" fill="#b45309" />
          </pattern>
          <pattern id="soilPattern" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill="#3f2e1e" />
            <circle cx="3" cy="3" r="1" fill="#291a0c" />
            <circle cx="9" cy="9" r="1" fill="#1f140a" />
          </pattern>
        </defs>

        {/* Sky / Air Background */}
        <rect x="0" y="0" width="240" height="40" fill="#e0f2fe" />

        {/* Small Garden Plant */}
        <g transform="translate(120, 20)">
          <line x1="0" y1="0" x2="0" y2="25" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 0,10 C -12,2 -14,-8 0,-5 C 14,-8 12,2 0,10" fill="#22c55e" />
          <path d="M 0,16 C -18,12 -16,2 0,5" fill="#16a34a" />
          <path d="M 0,16 C 18,12 16,2 0,5" fill="#16a34a" />
        </g>

        {/* Mulch Layer */}
        <rect x="15" y={45} width="210" height={mulchH} rx="2" fill="url(#mulchPattern)" stroke="#451a03" strokeWidth="1" />
        
        {/* Soil Bed Layer */}
        <rect x="15" y={45 + mulchH} width="210" height={90 - mulchH} fill="url(#soilPattern)" />

        {/* Plant Roots entering soil */}
        <g transform="translate(120, 45)" stroke="#a1a1aa" strokeWidth="1.2" fill="none">
          <path d={`M 0,${mulchH} Q -8,${mulchH + 15} -15,${mulchH + 30}`} />
          <path d={`M 0,${mulchH} Q 8,${mulchH + 15} 15,${mulchH + 30}`} />
          <path d={`M 0,${mulchH} L 0,${mulchH + 35}`} />
        </g>

        {/* Depth Callout Tag (Dual Imperial & Metric) */}
        <rect x="155" y={35 + mulchH / 2} width="75" height="20" rx="3" fill="#0f172a" fillOpacity="0.9" />
        <text x="192.5" y={48.5 + mulchH / 2} textAnchor="middle" className="text-[8.5px] fill-white font-bold font-mono">
          {depthInches}&quot; ({depthCm} cm)
        </text>

        {/* Soil Label */}
        <text x="25" y="125" className="text-[8px] fill-zinc-300 font-semibold tracking-wider font-sans">
          TOPSOIL BED
        </text>
      </svg>
    </div>
  );
}

// ─── 2D Tree Ring & Safety Visualizer (Fully Parametric & Responsive) ────────

function TreeRingVisualizer2D({
  mode,
  outerDiaFt,
  innerDiaFt,
  safetyStatus,
  isInvalid,
}: {
  mode: "full_circle" | "tree_ring";
  outerDiaFt: number;
  innerDiaFt: number;
  safetyStatus: "safe_donut" | "volcano_hazard";
  isInvalid?: boolean;
}) {
  if (isInvalid) {
    return (
      <div className="w-full flex flex-col items-center select-none" role="alert">
        <div className="w-full max-w-[220px] h-[140px] rounded-lg border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-3 flex flex-col items-center justify-center text-center">
          <AlertTriangle className="w-7 h-7 text-red-600 dark:text-red-400 mb-1" />
          <span className="text-[11px] font-bold text-red-800 dark:text-red-300">
            Invalid Ring Geometry
          </span>
          <span className="text-[9.5px] text-red-600 dark:text-red-400 mt-0.5 leading-tight">
            Trunk diameter ({innerDiaFt} ft) must be less than outer diameter ({outerDiaFt} ft).
          </span>
        </div>
      </div>
    );
  }

  const outer = Math.max(0.1, outerDiaFt);
  const inner = mode === "tree_ring" ? Math.max(0, innerDiaFt) : 0;
  const ratio = outer > 0 ? Math.min(0.85, Math.max(0.12, inner / outer)) : 0.2;

  const R_outer = 56;
  const R_trunk = Math.max(8, Math.min(46, R_outer * ratio));
  const R_gap = Math.min(R_outer - 4, R_trunk + 8);
  const collarWidth = ((outer - inner) / 2).toFixed(1);

  return (
    <div className="w-full flex flex-col items-center select-none">
      <svg
        viewBox="0 0 240 155"
        className="w-full max-w-[220px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 shadow-xs"
        aria-label="Parametric 2D Tree Ring Visualizer"
      >
        <rect width="240" height="155" fill="#f8fafc" />

        {/* Outer Mulch Ring */}
        <circle
          cx="120"
          cy="66"
          r={R_outer}
          fill="#78350f"
          stroke="#451a03"
          strokeWidth="2"
          strokeDasharray={mode === "tree_ring" ? "3 2" : "none"}
        />

        {/* Tree Trunk & Safety Gap */}
        {mode === "tree_ring" ? (
          <>
            {/* Bare Gap / Root Flare Zone */}
            {inner > 0 && (
              <circle
                cx="120"
                cy="66"
                r={R_gap}
                fill="#dcfce7"
                stroke="#16a34a"
                strokeWidth="1.5"
              />
            )}
            {/* Tree Trunk Base */}
            {inner > 0 ? (
              <>
                <circle
                  cx="120"
                  cy="66"
                  r={R_trunk}
                  fill="#3f2e1e"
                  stroke="#1c1917"
                  strokeWidth="2"
                />
                <text
                  x="120"
                  y="69"
                  textAnchor="middle"
                  className="text-[7.5px] fill-white font-bold font-sans"
                >
                  TRUNK
                </text>
              </>
            ) : (
              /* If trunk is 0, full circle marker */
              <circle cx="120" cy="66" r="4" fill="#15803d" />
            )}
          </>
        ) : (
          <circle cx="120" cy="66" r="5" fill="#15803d" />
        )}

        {/* Dimension Callouts */}
        <text x="12" y="18" className="text-[8px] fill-zinc-600 font-semibold font-mono">
          Outer: {outerDiaFt} ft
        </text>
        {mode === "tree_ring" && inner > 0 && (
          <>
            <text x="12" y="29" className="text-[8px] fill-zinc-600 font-semibold font-mono">
              Trunk: {innerDiaFt} ft
            </text>
            <text x="228" y="18" textAnchor="end" className="text-[8px] fill-blue-700 font-semibold font-mono">
              Collar: {collarWidth} ft
            </text>
          </>
        )}

        {/* Safety Badge */}
        <rect
          x="10"
          y="128"
          width="220"
          height="19"
          rx="4"
          fill={safetyStatus === "safe_donut" ? "#166534" : "#991b1b"}
        />
        <text
          x="120"
          y="141"
          textAnchor="middle"
          className="text-[8px] fill-white font-bold font-sans tracking-tight"
        >
          {safetyStatus === "safe_donut"
            ? "✓ ARBORICULTURAL DONUT (SAFE ROOT FLARE)"
            : "⚠ CAUTION: VOLCANO HAZARD (AVOID TRUNK CONTACT)"}
        </text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function MulchCalculator() {
  // Global toast feedback state
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2000);
  }, []);

  // ─── CARD 1: RECTANGULAR & SQUARE BED ───
  const [rectInputMode, setRectInputMode] = useState<"dimensions" | "total_area">("dimensions");
  const [rectLength, setRectLength] = useState("20");
  const [rectLengthUnit, setRectLengthUnit] = useState<DimensionUnit>("feet");
  const [rectWidth, setRectWidth] = useState("10");
  const [rectWidthUnit, setRectWidthUnit] = useState<DimensionUnit>("feet");
  const [rectTotalArea, setRectTotalArea] = useState("200");

  const [rectDepth, setRectDepth] = useState("3");
  const [rectDepthUnit, setRectDepthUnit] = useState<DepthUnit>("inches");
  const [rectMulchType, setRectMulchType] = useState<MulchType>("hardwood_bark");

  const [rectPricePerBag, setRectPricePerBag] = useState("4.25");
  const [rectBagSizeCuFt, setRectBagSizeCuFt] = useState(2.0);
  const [rectPricePerYard, setRectPricePerYard] = useState("38.00");
  const [rectPricingType, setRectPricingType] = useState<"per_bag" | "per_yard">("per_bag");

  const [rectResult, setRectResult] = useState<RectangularMulchResult>(() =>
    calculateRectangularMulch({
      inputMode: "dimensions",
      length: 20,
      lengthUnit: "feet",
      width: 10,
      widthUnit: "feet",
      depth: 3,
      depthUnit: "inches",
      mulchType: "hardwood_bark",
      pricePerBag: 4.25,
      bagSizeCuFt: 2.0,
      pricePerCubicYard: 38.00,
      pricingType: "per_bag",
    })
  );
  const [rectSaveSuccess, setRectSaveSuccess] = useState(false);
  const rectSaved = useCardSaved<RectangularMulchResult>("saved_mulch_rect");

  // ─── CARD 2: CIRCULAR & TREE RING BED ───
  const [circMode, setCircMode] = useState<"full_circle" | "tree_ring">("tree_ring");
  const [circOuterDia, setCircOuterDia] = useState("8");
  const [circOuterDiaUnit, setCircOuterDiaUnit] = useState<DimensionUnit>("feet");
  const [circInnerDia, setCircInnerDia] = useState("1.5");
  const [circInnerDiaUnit, setCircInnerDiaUnit] = useState<DimensionUnit>("feet");
  const [circDepth, setCircDepth] = useState("3");
  const [circMulchType, setCircMulchType] = useState<MulchType>("hardwood_bark");
  const [circPricePerBag, setCircPricePerBag] = useState("4.25");

  const [circResult, setCircResult] = useState<CircularMulchResult>(() =>
    calculateCircularMulch({
      mode: "tree_ring",
      outerDiameter: 8,
      outerDiameterUnit: "feet",
      innerDiameter: 1.5,
      innerDiameterUnit: "feet",
      depthInches: 3,
      mulchType: "hardwood_bark",
      pricePerBag: 4.25,
    })
  );
  const [circSaveSuccess, setCircSaveSuccess] = useState(false);
  const circSaved = useCardSaved<CircularMulchResult>("saved_mulch_circ");

  // ─── CARD 3: MULTI-BED LANDSCAPE AGGREGATOR ───
  const [beds, setBeds] = useState<LandscapeBedSection[]>([
    { id: "1", name: "Front Entry Shrub Bed", shape: "rectangle", dim1: 25, dim2: 8, depthInches: 3 },
    { id: "2", name: "Master Oak Tree Ring", shape: "ring", dim1: 10, dim2: 2, depthInches: 3 },
    { id: "3", name: "Side Property Flower Border", shape: "rectangle", dim1: 40, dim2: 4, depthInches: 2.5 },
  ]);
  const [multiMulchType, setMultiMulchType] = useState<MulchType>("hardwood_bark");
  const [multiBagCost, setMultiBagCost] = useState("4.00");
  const [multiBulkCost, setMultiBulkCost] = useState("36.00");
  const [multiDeliveryFee, setMultiDeliveryFee] = useState("45.00");

  const [multiResult, setMultiResult] = useState<MultiBedResult>(() =>
    calculateMultiBedLandscape({
      beds: [
        { id: "1", name: "Front Entry Shrub Bed", shape: "rectangle", dim1: 25, dim2: 8, depthInches: 3 },
        { id: "2", name: "Master Oak Tree Ring", shape: "ring", dim1: 10, dim2: 2, depthInches: 3 },
        { id: "3", name: "Side Property Flower Border", shape: "rectangle", dim1: 40, dim2: 4, depthInches: 2.5 },
      ],
      mulchType: "hardwood_bark",
      bagCost: 4.00,
      bulkCostPerYard: 36.00,
      deliveryFee: 45.00,
    })
  );
  const [multiSaveSuccess, setMultiSaveSuccess] = useState(false);
  const multiSaved = useCardSaved<MultiBedResult>("saved_mulch_multibed");

  // ─── CARD 4: MULCH WEIGHT & TRUCK LOAD ESTIMATOR ───
  const [truckYards, setTruckYards] = useState("1.85");
  const [truckMulchType, setTruckMulchType] = useState<MulchType>("hardwood_bark");
  const [vehicleType, setVehicleType] = useState<VehicleType>("halfton_truck");

  const [truckResult, setTruckResult] = useState<TruckLoadResult>(() =>
    calculateTruckLoads({
      totalCubicYards: 1.85,
      mulchType: "hardwood_bark",
      vehicleType: "halfton_truck",
    })
  );
  const [truckSaveSuccess, setTruckSaveSuccess] = useState(false);
  const truckSaved = useCardSaved<TruckLoadResult>("saved_mulch_truck");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // ─── Calculation Handlers (Zero-Safe Parsing) ───

  const handleRectCalc = useCallback(() => {
    const l = rectLength !== "" && !isNaN(Number(rectLength)) ? Number(rectLength) : 20;
    const w = rectWidth !== "" && !isNaN(Number(rectWidth)) ? Number(rectWidth) : 10;
    const totArea = rectTotalArea !== "" && !isNaN(Number(rectTotalArea)) ? Number(rectTotalArea) : 200;
    const d = rectDepth !== "" && !isNaN(Number(rectDepth)) ? Number(rectDepth) : 3;
    const pBag = rectPricePerBag !== "" && !isNaN(Number(rectPricePerBag)) ? Number(rectPricePerBag) : 0;
    const pYard = rectPricePerYard !== "" && !isNaN(Number(rectPricePerYard)) ? Number(rectPricePerYard) : 0;

    const res = calculateRectangularMulch({
      inputMode: rectInputMode,
      length: l,
      lengthUnit: rectLengthUnit,
      width: w,
      widthUnit: rectWidthUnit,
      totalAreaSqFt: totArea,
      depth: d,
      depthUnit: rectDepthUnit,
      mulchType: rectMulchType,
      pricePerBag: pBag,
      bagSizeCuFt: rectBagSizeCuFt,
      pricePerCubicYard: pYard,
      pricingType: rectPricingType,
    });
    setRectResult(res);
  }, [
    rectInputMode,
    rectLength,
    rectLengthUnit,
    rectWidth,
    rectWidthUnit,
    rectTotalArea,
    rectDepth,
    rectDepthUnit,
    rectMulchType,
    rectPricePerBag,
    rectBagSizeCuFt,
    rectPricePerYard,
    rectPricingType,
  ]);

  const handleCircCalc = useCallback(() => {
    const outer = circOuterDia !== "" && !isNaN(Number(circOuterDia)) ? Number(circOuterDia) : 8;
    const inner = circInnerDia !== "" && !isNaN(Number(circInnerDia)) ? Number(circInnerDia) : 1.5;
    const d = circDepth !== "" && !isNaN(Number(circDepth)) ? Number(circDepth) : 3;
    const pBag = circPricePerBag !== "" && !isNaN(Number(circPricePerBag)) ? Number(circPricePerBag) : 0;

    const res = calculateCircularMulch({
      mode: circMode,
      outerDiameter: outer,
      outerDiameterUnit: circOuterDiaUnit,
      innerDiameter: inner,
      innerDiameterUnit: circInnerDiaUnit,
      depthInches: d,
      mulchType: circMulchType,
      pricePerBag: pBag,
    });
    setCircResult(res);
  }, [
    circMode,
    circOuterDia,
    circOuterDiaUnit,
    circInnerDia,
    circInnerDiaUnit,
    circDepth,
    circMulchType,
    circPricePerBag,
  ]);

  const handleMultiCalc = useCallback(() => {
    const bagCost = multiBagCost !== "" && !isNaN(Number(multiBagCost)) ? Number(multiBagCost) : 4.0;
    const bulkCost = multiBulkCost !== "" && !isNaN(Number(multiBulkCost)) ? Number(multiBulkCost) : 36.0;
    const delivery = multiDeliveryFee !== "" && !isNaN(Number(multiDeliveryFee)) ? Number(multiDeliveryFee) : 45.0;

    const res = calculateMultiBedLandscape({
      beds,
      mulchType: multiMulchType,
      bagCost,
      bulkCostPerYard: bulkCost,
      deliveryFee: delivery,
    });
    setMultiResult(res);
  }, [beds, multiMulchType, multiBagCost, multiBulkCost, multiDeliveryFee]);

  const handleTruckCalc = useCallback(() => {
    const yds = truckYards !== "" && !isNaN(Number(truckYards)) ? Number(truckYards) : 1.85;

    const res = calculateTruckLoads({
      totalCubicYards: yds,
      mulchType: truckMulchType,
      vehicleType,
    });
    setTruckResult(res);
  }, [truckYards, truckMulchType, vehicleType]);

  // Reactive calculations
  useEffect(() => {
    handleRectCalc();
  }, [handleRectCalc]);

  useEffect(() => {
    handleCircCalc();
  }, [handleCircCalc]);

  useEffect(() => {
    handleMultiCalc();
  }, [handleMultiCalc]);

  useEffect(() => {
    handleTruckCalc();
  }, [handleTruckCalc]);

  // Multi-bed row actions
  const addBedRow = () => {
    setBeds((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        name: `Landscape Bed ${prev.length + 1}`,
        shape: "rectangle",
        dim1: 15,
        dim2: 5,
        depthInches: 3,
      },
    ]);
  };

  const removeBedRow = (id: string) => {
    if (beds.length <= 1) return;
    setBeds((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBedRow = (id: string, field: keyof LandscapeBedSection, value: any) => {
    setBeds((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
    );
  };

  // ─── State Restoration Handlers (DEFECT 5) ───

  const restoreRectInputs = useCallback((raw: Record<string, any>) => {
    if (raw.inputMode) setRectInputMode(raw.inputMode);
    if (raw.length !== undefined) setRectLength(String(raw.length));
    if (raw.lengthUnit) setRectLengthUnit(raw.lengthUnit);
    if (raw.width !== undefined) setRectWidth(String(raw.width));
    if (raw.widthUnit) setRectWidthUnit(raw.widthUnit);
    if (raw.totalAreaSqFt !== undefined) setRectTotalArea(String(raw.totalAreaSqFt));
    if (raw.depth !== undefined) setRectDepth(String(raw.depth));
    if (raw.depthUnit) setRectDepthUnit(raw.depthUnit);
    if (raw.mulchType) setRectMulchType(raw.mulchType);
    if (raw.pricePerBag !== undefined) setRectPricePerBag(String(raw.pricePerBag));
    if (raw.bagSizeCuFt !== undefined) setRectBagSizeCuFt(raw.bagSizeCuFt);
    if (raw.pricePerCubicYard !== undefined) setRectPricePerYard(String(raw.pricePerCubicYard));
    if (raw.pricingType) setRectPricingType(raw.pricingType);
    showToast("Calculation restored!");
  }, [showToast]);

  const restoreCircInputs = useCallback((raw: Record<string, any>) => {
    if (raw.mode) setCircMode(raw.mode);
    if (raw.outerDiameter !== undefined) setCircOuterDia(String(raw.outerDiameter));
    if (raw.outerDiameterUnit) setCircOuterDiaUnit(raw.outerDiameterUnit);
    if (raw.innerDiameter !== undefined) setCircInnerDia(String(raw.innerDiameter));
    if (raw.innerDiameterUnit) setCircInnerDiaUnit(raw.innerDiameterUnit);
    if (raw.depthInches !== undefined) setCircDepth(String(raw.depthInches));
    if (raw.mulchType) setCircMulchType(raw.mulchType);
    if (raw.pricePerBag !== undefined) setCircPricePerBag(String(raw.pricePerBag));
    showToast("Calculation restored!");
  }, [showToast]);

  const restoreMultiInputs = useCallback((raw: Record<string, any>) => {
    if (raw.beds) setBeds(raw.beds);
    if (raw.mulchType) setMultiMulchType(raw.mulchType);
    if (raw.bagCost !== undefined) setMultiBagCost(String(raw.bagCost));
    if (raw.bulkCostPerYard !== undefined) setMultiBulkCost(String(raw.bulkCostPerYard));
    if (raw.deliveryFee !== undefined) setMultiDeliveryFee(String(raw.deliveryFee));
    showToast("Calculation restored!");
  }, [showToast]);

  const restoreTruckInputs = useCallback((raw: Record<string, any>) => {
    if (raw.totalCubicYards !== undefined) setTruckYards(String(raw.totalCubicYards));
    if (raw.mulchType) setTruckMulchType(raw.mulchType);
    if (raw.vehicleType) setVehicleType(raw.vehicleType);
    showToast("Calculation restored!");
  }, [showToast]);

  // ─── Clipboard Copy Actions (DEFECT 6) ───

  const copyRectResult = () => {
    if (!rectResult) return;
    copyToClipboard(`${rectResult.volumeCuYards} yd³ (${rectResult.volumeCuMeters} m³), ${rectResult.bags2_0CuFt} bags (2.0 cu ft), ${rectResult.totalWeightKg} kg`);
    showToast("Result Copied!");
  };

  const copyRectSummary = () => {
    if (!rectResult) return;
    const txt = `RECTANGULAR MULCH CALCULATION:\n` +
      `• Dimensions: ${rectLength} ${rectLengthUnit} × ${rectWidth} ${rectWidthUnit} (Area: ${rectResult.areaSqFt} sq ft / ${rectResult.areaSqM} m²)\n` +
      `• Depth: ${rectResult.depthInches} inches (${rectResult.depthCm} cm)\n` +
      `• Total Volume: ${rectResult.volumeCuYards} yd³ (${rectResult.volumeCuMeters} m³ / ${rectResult.volumeLiters} L)\n` +
      `• Bags Required: ${rectResult.bags2_0CuFt} bags (2.0 cu ft each)\n` +
      `• Total Weight: ${rectResult.totalWeightKg.toLocaleString()} kg (${rectResult.totalWeightLbs.toLocaleString()} lbs)\n` +
      `• Application Density: ${rectResult.applicationRateKgPerM2} kg/m²\n` +
      `• Material: ${MULCH_TYPES[rectMulchType].name}\n` +
      (rectResult.estimatedCost > 0 ? `• Estimated Cost: $${rectResult.estimatedCost.toFixed(2)}\n` : "");
    copyToClipboard(txt);
    showToast("Summary Copied!");
  };

  const copyRectLatex = () => {
    const latex = `V = L \\times W \\times \\frac{D}{12} = ${rectLength} \\times ${rectWidth} \\times \\frac{${rectDepth}}{12} = ${rectResult?.volumeCuFt ?? 0} \\text{ ft}^3, \\quad V_{\\text{yd}^3} = \\frac{${rectResult?.volumeCuFt ?? 0}}{27} = ${rectResult?.volumeCuYards ?? 0} \\text{ yd}^3`;
    copyToClipboard(latex);
    showToast("LaTeX Copied!");
  };

  const exportRectCsv = () => {
    if (!rectResult) return;
    const csv = `Parameter,Value,Unit\n` +
      `Bed Length,${rectLength},${rectLengthUnit}\n` +
      `Bed Width,${rectWidth},${rectWidthUnit}\n` +
      `Layer Depth,${rectResult.depthInches},inches\n` +
      `Surface Area,${rectResult.areaSqFt},sq ft\n` +
      `Surface Area (SI),${rectResult.areaSqM},sq meters\n` +
      `Volume,${rectResult.volumeCuYards},cubic yards\n` +
      `Volume (SI),${rectResult.volumeCuMeters},cubic meters\n` +
      `Bags Required (2 cu ft),${rectResult.bags2_0CuFt},bags\n` +
      `Total Weight,${rectResult.totalWeightLbs},lbs\n` +
      `Total Weight (SI),${rectResult.totalWeightKg},kg\n` +
      `Application Density,${rectResult.applicationRateKgPerM2},kg/m2\n` +
      `Mulch Material,"${MULCH_TYPES[rectMulchType].name}",\n` +
      `Estimated Cost,${rectResult.estimatedCost},USD\n`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rectangular_mulch_${rectLength}x${rectWidth}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyCircResult = () => {
    if (!circResult || !circResult.isValid) return;
    copyToClipboard(`Net Area: ${circResult.netAreaSqM} m² (${circResult.netAreaSqFt} sq ft), Volume: ${circResult.volumeCuYards} yd³ (${circResult.volumeCuMeters} m³), ${circResult.bags2_0CuFt} bags`);
    showToast("Result Copied!");
  };

  const copyCircSummary = () => {
    if (!circResult || !circResult.isValid) return;
    const txt = `TREE RING / CIRCULAR MULCH CALCULATION:\n` +
      `• Mode: ${circMode === "tree_ring" ? "Tree Ring with Root Flare Gap" : "Full Circular Flower Bed"}\n` +
      `• Outer Diameter: ${circOuterDia} ${circOuterDiaUnit}\n` +
      (circMode === "tree_ring" ? `• Trunk Diameter: ${circInnerDia} ${circInnerDiaUnit}\n` : "") +
      `• Net Surface Area: ${circResult.netAreaSqM} m² (${circResult.netAreaSqFt} sq ft)\n` +
      `• Depth: ${circResult.depthInches} inches (${circResult.depthCm} cm)\n` +
      `• Volume: ${circResult.volumeCuMeters} m³ (${circResult.volumeCuYards} yd³ / ${circResult.volumeLiters} L)\n` +
      `• Bags Required: ${circResult.bags2_0CuFt} bags (2.0 cu ft each)\n` +
      `• Weight: ${circResult.weightKg.toLocaleString()} kg (${circResult.weightLbs.toLocaleString()} lbs)\n` +
      `• Safety Status: ${circResult.treeSafetyStatus === "safe_donut" ? "Safe Donut (ANSI A300 Compliant)" : "Volcano Hazard (Avoid Trunk Contact)"}\n`;
    copyToClipboard(txt);
    showToast("Summary Copied!");
  };

  const copyCircLatex = () => {
    const latex = circMode === "tree_ring"
      ? `A = \\frac{\\pi}{4}(D_{\\text{outer}}^2 - D_{\\text{inner}}^2) = \\frac{\\pi}{4}(${circOuterDia}^2 - ${circInnerDia}^2) = ${circResult?.netAreaSqFt ?? 0} \\text{ ft}^2, \\quad V = A \\times \\frac{${circDepth}}{12} = ${circResult?.volumeCuFt ?? 0} \\text{ ft}^3`
      : `A = \\frac{\\pi}{4}D^2 = \\frac{\\pi}{4}(${circOuterDia}^2) = ${circResult?.outerAreaSqFt ?? 0} \\text{ ft}^2, \\quad V = A \\times \\frac{${circDepth}}{12}`;
    copyToClipboard(latex);
    showToast("LaTeX Copied!");
  };

  const copyMultiResult = () => {
    if (!multiResult) return;
    copyToClipboard(`Total Volume: ${multiResult.totalCuMeters} m³ (${multiResult.totalCuYards} yd³), ${multiResult.total2CuFtBags} bags across ${beds.length} beds. Bagged: $${multiResult.baggedTotalCost}, Bulk: $${multiResult.bulkTotalCost}`);
    showToast("Result Copied!");
  };

  const copyMultiSummary = () => {
    if (!multiResult) return;
    const txt = `MULTI-BED LANDSCAPE PROJECT SUMMARY (${beds.length} sections):\n` +
      beds.map((b, i) => `  ${i + 1}. ${b.name} (${b.shape}): ${b.dim1}ft × ${b.dim2}ft @ ${b.depthInches}" depth`).join("\n") +
      `\n• Consolidated Area: ${multiResult.totalSqM} m² (${multiResult.totalSqFt} sq ft)\n` +
      `• Total Volume: ${multiResult.totalCuMeters} m³ (${multiResult.totalCuYards} yd³)\n` +
      `• Total Weight: ${multiResult.totalWeightKg.toLocaleString()} kg (${multiResult.totalWeightLbs.toLocaleString()} lbs)\n` +
      `• Bagged Cost (${multiResult.total2CuFtBags} bags @ $${multiBagCost}): $${multiResult.baggedTotalCost.toFixed(2)}\n` +
      `• Bulk Cost (${multiResult.totalCuYards} yd³ @ $${multiBulkCost} + $${multiDeliveryFee} delivery): $${multiResult.bulkTotalCost.toFixed(2)}\n` +
      `• Recommendation: ${multiResult.recommendedOption === "buy_bulk" ? `Buy Bulk Delivery (Save $${multiResult.costDifference.toFixed(2)})` : `Buy Bags at Store (Save $${multiResult.costDifference.toFixed(2)})`}\n`;
    copyToClipboard(txt);
    showToast("Summary Copied!");
  };

  const copyMultiLatex = () => {
    const latex = `V_{\\text{total}} = \\sum_{i=1}^{${beds.length}} A_i \\times \\frac{D_i}{12} = ${multiResult?.totalCuFt ?? 0} \\text{ ft}^3 = ${multiResult?.totalCuYards ?? 0} \\text{ yd}^3, \\quad C_{\\text{bulk}} = (${multiResult?.totalCuYards ?? 0} \\times ${multiBulkCost}) + ${multiDeliveryFee} = \\$${multiResult?.bulkTotalCost ?? 0}`;
    copyToClipboard(latex);
    showToast("LaTeX Copied!");
  };

  const copyTruckResult = () => {
    if (!truckResult) return;
    const tripText = `${truckResult.tripsRecommended} ${truckResult.tripsRecommended === 1 ? "Trip" : "Trips"}`;
    copyToClipboard(`Payload Weight: ${truckResult.totalWeightKg.toLocaleString()} kg (${truckResult.totalWeightLbs.toLocaleString()} lbs), ${tripText} in ${truckResult.vehicleName} (${truckResult.weightUtilizationPercent}% capacity)`);
    showToast("Result Copied!");
  };

  const copyTruckSummary = () => {
    if (!truckResult) return;
    const tripText = `${truckResult.tripsRecommended} ${truckResult.tripsRecommended === 1 ? "Trip" : "Trips"}`;
    const txt = `MULCH HAULING & PAYLOAD ESTIMATE:\n` +
      `• Total Volume to Haul: ${truckYards} cu yd\n` +
      `• Material: ${MULCH_TYPES[truckMulchType].name}\n` +
      `• Vehicle/Trailer: ${truckResult.vehicleName}\n` +
      `• Total Payload Weight: ${truckResult.totalWeightKg.toLocaleString()} kg (${truckResult.totalWeightLbs.toLocaleString()} lbs)\n` +
      `• Trips by Volume: ${truckResult.tripsNeededByVolume} ${truckResult.tripsNeededByVolume === 1 ? "Trip" : "Trips"}\n` +
      `• Trips by Weight: ${truckResult.tripsNeededByWeight} ${truckResult.tripsNeededByWeight === 1 ? "Trip" : "Trips"}\n` +
      `• Recommended Trips: ${tripText} (Safe Capacity)\n` +
      `• Payload Capacity: ${truckResult.weightUtilizationPercent}% (${truckResult.safetyStatus.toUpperCase()})\n` +
      `• Vehicle Limit: ${truckResult.maxPayloadKg.toLocaleString()} kg (${truckResult.maxPayloadLbs.toLocaleString()} lbs) per trip\n`;
    copyToClipboard(txt);
    showToast("Summary Copied!");
  };

  const copyTruckLatex = () => {
    const latex = `N_{\\text{trips}} = \\max\\left(\\left\\lceil \\frac{V}{V_{\\text{max}}} \\right\\rceil, \\left\\lceil \\frac{W}{W_{\\text{max}}} \\right\\rceil\\right) = \\max\\left(${truckResult?.tripsNeededByVolume ?? 1}, ${truckResult?.tripsNeededByWeight ?? 1}\\right) = ${truckResult?.tripsRecommended ?? 1}`;
    copyToClipboard(latex);
    showToast("LaTeX Copied!");
  };

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];
    if (rectResult) {
      sections.push({
        title: "Mulch Coverage & Metric/SI Summary",
        items: [
          { label: "Bed Surface Area", value: `${rectResult.areaSqFt} sq ft (${rectResult.areaSqM} m²)` },
          { label: "Mulch Layer Depth", value: `${rectResult.depthInches} inches (${rectResult.depthCm} cm)` },
          { label: "Total Volume", value: `${rectResult.volumeCuYards} Cubic Yards (${rectResult.volumeCuMeters} m³ / ${rectResult.volumeLiters} Liters)` },
          { label: "2.0 Cu Ft Bags", value: `${rectResult.bags2_0CuFt} Bags (~56.6L each)` },
          { label: "Total Material Weight", value: `${rectResult.totalWeightLbs.toLocaleString()} lbs (${rectResult.totalWeightKg.toLocaleString()} kg / ${rectResult.totalWeightMetricTonnes} t)` },
          { label: "Application Density", value: `${rectResult.applicationRateKgPerM2} kg/m²` },
          { label: "Mulch Material", value: MULCH_TYPES[rectMulchType].name },
          { label: "Estimated Material Cost", value: rectResult.estimatedCost > 0 ? `$${rectResult.estimatedCost.toFixed(2)}` : "—" },
        ],
      });
    }

    if (multiResult) {
      sections.push({
        title: `Consolidated Multi-Bed Landscaping Project (${beds.length} sections)`,
        items: [
          { label: "Total Coverage Area", value: `${multiResult.totalSqM} m² (${multiResult.totalSqFt} sq ft)` },
          { label: "Total Project Volume", value: `${multiResult.totalCuMeters} m³ (${multiResult.totalCuYards} yd³)` },
          { label: "Total 2.0 Cu Ft Bags", value: `${multiResult.total2CuFtBags} Bags` },
          { label: "Total Weight", value: `${multiResult.totalWeightKg.toLocaleString()} kg (${multiResult.totalWeightLbs.toLocaleString()} lbs)` },
          { label: "Bagged Purchasing Cost", value: `$${multiResult.baggedTotalCost.toFixed(2)}` },
          { label: "Bulk Scoop Delivery Cost", value: `$${multiResult.bulkTotalCost.toFixed(2)}` },
          {
            label: "Economic Recommendation",
            value: multiResult.recommendedOption === "buy_bulk"
              ? `Buy Bulk Delivery (Save $${multiResult.costDifference.toFixed(2)})`
              : `Buy Bags at Store (Save $${multiResult.costDifference.toFixed(2)})`,
          },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Mulch Calculator",
        reportTitle: "Mulch Material Takeoff & Landscape Bed Order Sheet",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        currencySymbol: "$",
      },
      keyMetrics: [
        { label: "Total Volume", value: rectResult ? `${rectResult.volumeCuYards} Cu Yds (${rectResult.volumeCuMeters} m³)` : "—", colorTheme: "emerald" },
        { label: "2.0 Cu Ft Bags", value: rectResult ? `${rectResult.bags2_0CuFt} Bags` : "—", colorTheme: "blue" },
        { label: "Total Weight", value: rectResult ? `${rectResult.totalWeightKg.toLocaleString()} kg (${rectResult.totalWeightLbs.toLocaleString()} lbs)` : "—", colorTheme: "purple" },
      ],
      sections,
    };
  }, [rectResult, multiResult, beds.length, rectMulchType]);

  return (
    <div className="space-y-4">
      {/* Toast Feedback Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-3.5 py-2 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-200 no-print">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          {toastMsg}
        </div>
      )}

      {/* Print Style Injector */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .no-print { display: none !important; }
            .break-inside-avoid { break-inside: avoid !important; page-break-inside: avoid !important; }
          }
        `,
      }} />

      {/* ═══════════════════ CARD 1: RECTANGULAR & SQUARE BED ═══════════════════ */}
      <CardWrapper
        title="Rectangular &amp; Square Landscape Bed Calculator"
        hasResult={!!rectResult}
        isSaved={rectSaveSuccess}
        savedCount={rectSaved.saved.length}
        onToggleSaved={() => rectSaved.setIsOpen(!rectSaved.isOpen)}
        onSave={() => {
          if (!rectResult) return;
          const rawInputs = {
            inputMode: rectInputMode,
            length: Number(rectLength),
            lengthUnit: rectLengthUnit,
            width: Number(rectWidth),
            widthUnit: rectWidthUnit,
            totalAreaSqFt: Number(rectTotalArea),
            depth: Number(rectDepth),
            depthUnit: rectDepthUnit,
            mulchType: rectMulchType,
            pricePerBag: Number(rectPricePerBag),
            bagSizeCuFt: rectBagSizeCuFt,
            pricePerCubicYard: Number(rectPricePerYard),
            pricingType: rectPricingType,
          };
          rectSaved.save(
            `${rectResult.volumeCuYards} cu yd (${rectResult.volumeCuMeters} m³), ${rectResult.totalWeightKg} kg, Area: ${rectResult.areaSqM} m²`,
            rectResult,
            rawInputs
          );
          flashSave(setRectSaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Sub-Tabs: Dimensions vs Total Area */}
          <div className="flex gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800 no-print">
            <button
              type="button"
              onClick={() => setRectInputMode("dimensions")}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                rectInputMode === "dimensions"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Bed Dimensions (L × W)
            </button>
            <button
              type="button"
              onClick={() => setRectInputMode("total_area")}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                rectInputMode === "total_area"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Direct Bed Area (sq ft / m²)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Inputs */}
            <div className="md:col-span-7 space-y-2.5">
              {rectInputMode === "dimensions" ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label htmlFor="rect-length" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                      Bed Length
                    </label>
                    <div className="flex gap-1">
                      <Input
                        id="rect-length"
                        type="number"
                        value={rectLength}
                        onChange={(e) => setRectLength(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
                        id="rect-length-unit"
                        aria-label="Bed length unit"
                        value={rectLengthUnit}
                        onChange={(e) => setRectLengthUnit(e.target.value as DimensionUnit)}
                        className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                      >
                        <option value="feet">ft</option>
                        <option value="meters">m</option>
                        <option value="inches">in</option>
                        <option value="yards">yd</option>
                        <option value="centimeters">cm</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="rect-width" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                      Bed Width
                    </label>
                    <div className="flex gap-1">
                      <Input
                        id="rect-width"
                        type="number"
                        value={rectWidth}
                        onChange={(e) => setRectWidth(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
                        id="rect-width-unit"
                        aria-label="Bed width unit"
                        value={rectWidthUnit}
                        onChange={(e) => setRectWidthUnit(e.target.value as DimensionUnit)}
                        className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                      >
                        <option value="feet">ft</option>
                        <option value="meters">m</option>
                        <option value="inches">in</option>
                        <option value="yards">yd</option>
                        <option value="centimeters">cm</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <label htmlFor="rect-total-area" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                    Total Surface Area (sq ft)
                  </label>
                  <Input
                    id="rect-total-area"
                    type="number"
                    value={rectTotalArea}
                    onChange={(e) => setRectTotalArea(e.target.value)}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
              )}

              {/* Depth & Mulch Type */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label htmlFor="rect-depth" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                    Mulch Layer Depth
                  </label>
                  <div className="flex gap-1">
                    <Input
                      id="rect-depth"
                      type="number"
                      value={rectDepth}
                      onChange={(e) => setRectDepth(e.target.value)}
                      step={0.5}
                      min={0}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <select
                      id="rect-depth-unit"
                      aria-label="Mulch layer depth unit"
                      value={rectDepthUnit}
                      onChange={(e) => setRectDepthUnit(e.target.value as DepthUnit)}
                      className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                    >
                      <option value="inches">inches</option>
                      <option value="centimeters">cm</option>
                      <option value="feet">feet</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="rect-material" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                    Mulch Material Type
                  </label>
                  <select
                    id="rect-material"
                    aria-label="Mulch material preset"
                    value={rectMulchType}
                    onChange={(e) => setRectMulchType(e.target.value as MulchType)}
                    className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
                  >
                    <option value="hardwood_bark">Hardwood Bark (~475 kg/m³ / 800 lbs/yd³)</option>
                    <option value="pine_bark">Pine Bark Nuggets (~355 kg/m³ / 600 lbs/yd³)</option>
                    <option value="shredded_cedar">Shredded Cedar (~415 kg/m³ / 700 lbs/yd³)</option>
                    <option value="rubber">Recycled Rubber Mulch (~237 kg/m³ / 400 lbs/yd³)</option>
                    <option value="compost">Compost / Soil Blend (~712 kg/m³ / 1,200 lbs/yd³)</option>
                    <option value="pea_gravel">Decorative Pea Gravel (~1,424 kg/m³ / 2,400 lbs/yd³)</option>
                  </select>
                </div>
              </div>

              {/* Price Options (Optional) */}
              <div className="grid grid-cols-12 gap-2 items-center text-xs pt-1">
                <label htmlFor="rect-price" className="col-span-4 font-medium text-zinc-700 dark:text-zinc-300">
                  Price per Unit (optional)
                </label>
                <div className="col-span-4">
                  <Input
                    id="rect-price"
                    type="number"
                    value={rectPricingType === "per_bag" ? rectPricePerBag : rectPricePerYard}
                    onChange={(e) => {
                      if (rectPricingType === "per_bag") setRectPricePerBag(e.target.value);
                      else setRectPricePerYard(e.target.value);
                    }}
                    placeholder="$0.00"
                    min={0}
                    step={0.25}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
                <div className="col-span-4">
                  <select
                    id="rect-pricing-type"
                    aria-label="Pricing type"
                    value={rectPricingType}
                    onChange={(e) => setRectPricingType(e.target.value as any)}
                    className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                  >
                    <option value="per_bag">per 2-cu-ft bag</option>
                    <option value="per_yard">per cubic yard</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-1 no-print">
                <Button
                  onClick={handleRectCalc}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
                >
                  Calculate Mulch
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setRectLength("20");
                    setRectWidth("10");
                    setRectDepth("3");
                    setRectPricePerBag("4.25");
                  }}
                  className="text-xs font-semibold h-8 px-3 cursor-pointer"
                >
                  Clear
                </Button>
              </div>
            </div>

            {/* Right: Live 2D Scaled Mulch Cross-Section */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                LAYER CROSS-SECTION
              </span>
              <MulchCrossSectionVisualizer2D
                depthInches={Number(rectDepth) || 3}
                depthCm={rectResult ? rectResult.depthCm : 7.6}
                mulchName={MULCH_TYPES[rectMulchType].name}
              />
            </div>
          </div>

          {/* Results Metric Cards */}
          {rectResult && (
            <div className="space-y-2 pt-2" aria-live="polite">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Total Volume</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {rectResult.volumeCuYards}{" "}
                    <span className="text-xs font-normal">yd³</span>
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    {rectResult.volumeCuMeters} m³ ({rectResult.volumeLiters} L)
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Bag Requirement</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {rectResult.bags2_0CuFt}{" "}
                    <span className="text-xs font-normal">Bags</span>
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">
                    (2.0 cu ft / ~56.6 Liters each)
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Total Weight (SI &amp; Imperial)</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {rectResult.totalWeightKg.toLocaleString()}{" "}
                    <span className="text-xs font-normal">kg</span>
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">
                    {rectResult.totalWeightLbs.toLocaleString()} lbs ({rectResult.totalWeightMetricTonnes} t)
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Application Density</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {rectResult.applicationRateKgPerM2}{" "}
                    <span className="text-xs font-normal">kg/m²</span>
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">
                    {rectResult.truckLoadsStandard} Pickup Loads
                  </span>
                </div>
              </div>

              {/* Dual Metric Summary Banner */}
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700 text-[11px] font-sans flex flex-wrap items-center justify-between gap-2">
                <span>• Area: <strong>{rectResult.areaSqM} m² ({rectResult.areaSqFt} sq ft)</strong></span>
                <span>• Density: <strong>{rectResult.applicationRateKgPerM2} kg/m²</strong></span>
                <span>• Material: <strong>{MULCH_TYPES[rectMulchType].name}</strong></span>
                {rectResult.estimatedCost > 0 && (
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    • Total Cost: ${rectResult.estimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>

              {/* Action Toolbar */}
              <CardActionBar
                onCopyResult={copyRectResult}
                onCopySummary={copyRectSummary}
                onCopyLatex={copyRectLatex}
                onExportCsv={exportRectCsv}
              />
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...rectSaved}
          cardTitle="Rectangular Bed"
          formatSummary={(r) => `${r.volumeCuMeters} m³ (${r.volumeCuYards} yd³), ${r.totalWeightKg} kg`}
          onRestore={restoreRectInputs}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: CIRCULAR & TREE RING BED ═══════════════════ */}
      <CardWrapper
        title="Circular &amp; Tree Ring / Donut Bed Calculator"
        hasResult={!!circResult && circResult.isValid}
        isSaved={circSaveSuccess}
        savedCount={circSaved.saved.length}
        onToggleSaved={() => circSaved.setIsOpen(!circSaved.isOpen)}
        onSave={() => {
          if (!circResult || !circResult.isValid) return;
          const rawInputs = {
            mode: circMode,
            outerDiameter: Number(circOuterDia),
            outerDiameterUnit: circOuterDiaUnit,
            innerDiameter: Number(circInnerDia),
            innerDiameterUnit: circInnerDiaUnit,
            depthInches: Number(circDepth),
            mulchType: circMulchType,
            pricePerBag: Number(circPricePerBag),
          };
          circSaved.save(
            `${circResult.volumeCuMeters} m³ (${circResult.volumeCuYards} yd³), ${circResult.weightKg} kg (${circResult.applicationRateKgPerM2} kg/m²)`,
            circResult,
            rawInputs
          );
          flashSave(setCircSaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Mode Switch */}
          <div className="flex gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800 no-print">
            <button
              type="button"
              onClick={() => setCircMode("tree_ring")}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                circMode === "tree_ring"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Tree Ring / Donut Border (with Trunk Gap)
            </button>
            <button
              type="button"
              onClick={() => setCircMode("full_circle")}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                circMode === "full_circle"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Full Circular Flower Bed
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Inputs */}
            <div className="md:col-span-7 space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label htmlFor="circ-outer-dia" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                    Outer Diameter
                  </label>
                  <div className="flex gap-1">
                    <Input
                      id="circ-outer-dia"
                      type="number"
                      value={circOuterDia}
                      onChange={(e) => setCircOuterDia(e.target.value)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <select
                      id="circ-outer-unit"
                      aria-label="Outer diameter unit"
                      value={circOuterDiaUnit}
                      onChange={(e) => setCircOuterDiaUnit(e.target.value as DimensionUnit)}
                      className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                    >
                      <option value="feet">ft</option>
                      <option value="meters">m</option>
                      <option value="inches">in</option>
                      <option value="yards">yd</option>
                      <option value="centimeters">cm</option>
                    </select>
                  </div>
                </div>

                {circMode === "tree_ring" ? (
                  <div className="space-y-1">
                    <label htmlFor="circ-inner-dia" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                      Tree Trunk Diameter
                    </label>
                    <div className="flex gap-1">
                      <Input
                        id="circ-inner-dia"
                        type="number"
                        value={circInnerDia}
                        onChange={(e) => setCircInnerDia(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
                        id="circ-inner-unit"
                        aria-label="Trunk diameter unit"
                        value={circInnerDiaUnit}
                        onChange={(e) => setCircInnerDiaUnit(e.target.value as DimensionUnit)}
                        className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                      >
                        <option value="feet">ft</option>
                        <option value="meters">m</option>
                        <option value="inches">in</option>
                        <option value="centimeters">cm</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label htmlFor="circ-depth-full" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                      Mulch Depth (in)
                    </label>
                    <Input
                      id="circ-depth-full"
                      type="number"
                      value={circDepth}
                      onChange={(e) => setCircDepth(e.target.value)}
                      step={0.5}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>
                )}
              </div>

              {circMode === "tree_ring" && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label htmlFor="circ-depth-ring" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                      Mulch Layer Depth (in)
                    </label>
                    <Input
                      id="circ-depth-ring"
                      type="number"
                      value={circDepth}
                      onChange={(e) => setCircDepth(e.target.value)}
                      step={0.5}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="circ-price" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                      Price per Bag ($)
                    </label>
                    <Input
                      id="circ-price"
                      type="number"
                      value={circPricePerBag}
                      onChange={(e) => setCircPricePerBag(e.target.value)}
                      step={0.25}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-1 no-print">
                <Button
                  onClick={handleCircCalc}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
                >
                  Calculate Tree Ring
                </Button>
              </div>
            </div>

            {/* Right: Parametric Dynamic 2D Tree Ring Visualizer */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                TREE RING &amp; ROOT FLARE
              </span>
              <TreeRingVisualizer2D
                mode={circMode}
                outerDiaFt={Number(circOuterDia) || 8}
                innerDiaFt={Number(circInnerDia) || 0}
                safetyStatus={circResult ? circResult.treeSafetyStatus : "safe_donut"}
                isInvalid={circResult ? !circResult.isValid : false}
              />
            </div>
          </div>

          {/* Validation Alert or Results */}
          {circResult && !circResult.isValid ? (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-700 dark:text-red-300 font-semibold flex items-center gap-2" role="alert">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{circResult.error || "Trunk diameter must be smaller than outer bed diameter."}</span>
            </div>
          ) : circResult && circResult.isValid && (
            <div className="space-y-2 pt-2" aria-live="polite">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Net Ring Area</span>
                  <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                    {circResult.netAreaSqM} m²
                  </span>
                  <span className="text-[10px] text-zinc-400 block">({circResult.netAreaSqFt} sq ft)</span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Volume (SI / Imperial)</span>
                  <span className="text-xl font-bold text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {circResult.volumeCuMeters} m³
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    {circResult.volumeCuYards} yd³ ({circResult.volumeLiters} L)
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Total Weight</span>
                  <span className="text-xl font-bold text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {circResult.weightKg.toLocaleString()} kg
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">
                    {circResult.weightLbs.toLocaleString()} lbs
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Application Rate</span>
                  <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                    {circResult.applicationRateKgPerM2} kg/m²
                  </span>
                  <span className="text-[10px] text-zinc-400 block">
                    {circResult.bags2_0CuFt} Bags (2 cu ft)
                  </span>
                </div>
              </div>

              {/* Action Toolbar */}
              <CardActionBar
                onCopyResult={copyCircResult}
                onCopySummary={copyCircSummary}
                onCopyLatex={copyCircLatex}
              />
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...circSaved}
          cardTitle="Circular Bed"
          formatSummary={(r) => `${r.volumeCuMeters} m³ (${r.volumeCuYards} yd³), ${r.weightKg} kg`}
          onRestore={restoreCircInputs}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: MULTI-BED LANDSCAPE AGGREGATOR ═══════════════════ */}
      <CardWrapper
        title="Multi-Bed Landscape Aggregator &amp; Bulk vs. Bagged Price Comparison"
        hasResult={!!multiResult}
        isSaved={multiSaveSuccess}
        savedCount={multiSaved.saved.length}
        onToggleSaved={() => multiSaved.setIsOpen(!multiSaved.isOpen)}
        onSave={() => {
          if (!multiResult) return;
          const rawInputs = {
            beds: JSON.parse(JSON.stringify(beds)),
            mulchType: multiMulchType,
            bagCost: Number(multiBagCost),
            bulkCostPerYard: Number(multiBulkCost),
            deliveryFee: Number(multiDeliveryFee),
          };
          multiSaved.save(
            `${beds.length} Beds: ${multiResult.totalCuMeters} m³ (${multiResult.totalCuYards} yd³), ${multiResult.totalWeightKg} kg, Total: $${multiResult.baggedTotalCost}`,
            multiResult,
            rawInputs
          );
          flashSave(setMultiSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between no-print">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              Landscape Bed Sections ({beds.length}):
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={addBedRow}
              className="text-xs h-7 gap-1 font-semibold text-blue-600 dark:text-blue-400 cursor-pointer"
              aria-label="Add a new landscape bed section"
            >
              <Plus className="w-3.5 h-3.5" /> Add Bed Section
            </Button>
          </div>

          {/* Table Column Reference Headers */}
          <div className="grid grid-cols-12 gap-1.5 px-2 py-1.5 bg-blue-50/80 dark:bg-blue-950/40 rounded-md border border-blue-200/70 dark:border-blue-900/50 text-[11px] font-bold text-blue-900 dark:text-blue-200">
            <div className="col-span-4">Bed Name / Location</div>
            <div className="col-span-2">Shape</div>
            <div className="col-span-2">Dim 1 (L / Dia ft)</div>
            <div className="col-span-2">Dim 2 (W / Trunk ft)</div>
            <div className="col-span-1">Depth (in)</div>
            <div className="col-span-1 text-right no-print">Del</div>
          </div>

          {/* Dynamic Bed Rows */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {beds.map((bed, idx) => (
              <div
                key={bed.id}
                className="grid grid-cols-12 gap-1.5 items-center bg-slate-50 dark:bg-zinc-800/40 p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs"
              >
                <div className="col-span-4">
                  <label htmlFor={`bed-name-${bed.id}`} className="sr-only">Bed Name {idx + 1}</label>
                  <Input
                    id={`bed-name-${bed.id}`}
                    type="text"
                    value={bed.name}
                    onChange={(e) => updateBedRow(bed.id, "name", e.target.value)}
                    className="h-7 text-xs bg-white dark:bg-zinc-800"
                    placeholder="e.g. Front Bed"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor={`bed-shape-${bed.id}`} className="sr-only">Bed Shape {idx + 1}</label>
                  <select
                    id={`bed-shape-${bed.id}`}
                    aria-label={`Shape for bed ${idx + 1}`}
                    value={bed.shape}
                    onChange={(e) => updateBedRow(bed.id, "shape", e.target.value as BedShape)}
                    className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                  >
                    <option value="rectangle">Rectangle</option>
                    <option value="circle">Circle</option>
                    <option value="ring">Tree Ring</option>
                    <option value="triangle">Triangle</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label htmlFor={`bed-dim1-${bed.id}`} className="sr-only">Dimension 1</label>
                  <Input
                    id={`bed-dim1-${bed.id}`}
                    type="number"
                    value={bed.dim1}
                    onChange={(e) => updateBedRow(bed.id, "dim1", Number(e.target.value))}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="L (ft)"
                    title="Length or Outer Diameter in feet"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor={`bed-dim2-${bed.id}`} className="sr-only">Dimension 2</label>
                  <Input
                    id={`bed-dim2-${bed.id}`}
                    type="number"
                    value={bed.dim2}
                    onChange={(e) => updateBedRow(bed.id, "dim2", Number(e.target.value))}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="W (ft)"
                    title="Width or Inner Trunk Diameter in feet"
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor={`bed-depth-${bed.id}`} className="sr-only">Depth</label>
                  <Input
                    id={`bed-depth-${bed.id}`}
                    type="number"
                    value={bed.depthInches}
                    onChange={(e) => updateBedRow(bed.id, "depthInches", Number(e.target.value))}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="in"
                    title="Mulch Depth in inches"
                  />
                </div>
                <div className="col-span-1 flex justify-end no-print">
                  <button
                    type="button"
                    onClick={() => removeBedRow(bed.id)}
                    disabled={beds.length <= 1}
                    className="text-zinc-400 hover:text-red-500 disabled:opacity-30 p-1 cursor-pointer"
                    title="Delete Bed Section"
                    aria-label={`Delete ${bed.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bulk vs Bagged Price Comparison Inputs */}
          <div className="p-2.5 bg-blue-50/60 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 space-y-2">
            <span className="font-bold text-blue-900 dark:text-blue-200 block text-xs">
              Bulk Delivery vs. Bagged Purchasing Comparison Rates:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="multi-bag-cost" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Bag Price ($/2 cu ft bag)
                </label>
                <Input
                  id="multi-bag-cost"
                  type="number"
                  value={multiBagCost}
                  onChange={(e) => setMultiBagCost(e.target.value)}
                  min={0}
                  step={0.25}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="multi-bulk-cost" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Bulk Price ($/cu yd)
                </label>
                <Input
                  id="multi-bulk-cost"
                  type="number"
                  value={multiBulkCost}
                  onChange={(e) => setMultiBulkCost(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="multi-delivery-fee" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Bulk Delivery Fee ($)
                </label>
                <Input
                  id="multi-delivery-fee"
                  type="number"
                  value={multiDeliveryFee}
                  onChange={(e) => setMultiDeliveryFee(e.target.value)}
                  min={0}
                  step={5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-1 no-print">
            <Button
              onClick={handleMultiCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Aggregate All Beds
            </Button>
          </div>

          {multiResult && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800" aria-live="polite">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Total Area</span>
                  <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                    {multiResult.totalSqM} m²
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-medium">({multiResult.totalSqFt} sq ft)</span>
                </div>
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Total Volume</span>
                  <span className="text-xl font-bold text-blue-900 dark:text-blue-100 font-sans tabular-nums">
                    {multiResult.totalCuMeters} m³
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    {multiResult.totalCuYards} yd³ ({multiResult.totalLiters} L)
                  </span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Total Weight</span>
                  <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {multiResult.totalWeightKg.toLocaleString()} kg
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-medium">({multiResult.totalWeightMetricTonnes} t)</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Avg Rate &amp; Bags</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {multiResult.avgApplicationRateKgPerM2} kg/m²
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-semibold">
                    {multiResult.total2CuFtBags} Bags (2 cu ft)
                  </span>
                </div>
              </div>

              {/* Bulk vs Bagged Comparison Alert */}
              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    Bagged Total: <strong>${multiResult.baggedTotalCost.toFixed(2)}</strong> | Bulk Delivery Total: <strong>${multiResult.bulkTotalCost.toFixed(2)}</strong>
                  </span>
                </div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Recommendation: {multiResult.recommendedOption === "buy_bulk"
                    ? `Buy Bulk Delivery (Save $${multiResult.costDifference.toFixed(2)})`
                    : `Buy Bags at Store (Save $${multiResult.costDifference.toFixed(2)})`}
                </div>
              </div>

              {/* Action Toolbar */}
              <CardActionBar
                onCopyResult={copyMultiResult}
                onCopySummary={copyMultiSummary}
                onCopyLatex={copyMultiLatex}
              />
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...multiSaved}
          cardTitle="Multi-Bed"
          formatSummary={(r) => `${r.totalCuMeters} m³ (${r.totalCuYards} yd³), ${r.totalWeightKg} kg across ${beds.length} beds`}
          onRestore={restoreMultiInputs}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: MULCH WEIGHT & TRUCK LOAD ESTIMATOR ═══════════════════ */}
      <CardWrapper
        title="Mulch Weight &amp; Pickup Truck Payload Safety Estimator"
        hasResult={!!truckResult}
        isSaved={truckSaveSuccess}
        savedCount={truckSaved.saved.length}
        onToggleSaved={() => truckSaved.setIsOpen(!truckSaved.isOpen)}
        onSave={() => {
          if (!truckResult) return;
          const rawInputs = {
            totalCubicYards: Number(truckYards),
            mulchType: truckMulchType,
            vehicleType,
          };
          truckSaved.save(
            `${truckYards} cu yds = ${truckResult.totalWeightKg.toLocaleString()} kg (${truckResult.totalWeightLbs.toLocaleString()} lbs), ${truckResult.tripsRecommended} Trips`,
            truckResult,
            rawInputs
          );
          flashSave(setTruckSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="truck-yards" className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Total Volume to Haul (yd³):
              </label>
              <Input
                id="truck-yards"
                type="number"
                value={truckYards}
                onChange={(e) => setTruckYards(e.target.value)}
                min={0}
                step={0.25}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>

            <div>
              <label htmlFor="truck-material" className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Mulch Material Type:
              </label>
              <select
                id="truck-material"
                aria-label="Mulch material type for truck loading"
                value={truckMulchType}
                onChange={(e) => setTruckMulchType(e.target.value as MulchType)}
                className="w-full h-7 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
              >
                <option value="hardwood_bark">Hardwood Bark (~475 kg/m³ / 800 lbs/yd³)</option>
                <option value="pine_bark">Pine Bark Nuggets (~355 kg/m³ / 600 lbs/yd³)</option>
                <option value="shredded_cedar">Shredded Cedar (~415 kg/m³ / 700 lbs/yd³)</option>
                <option value="rubber">Recycled Rubber Mulch (~237 kg/m³ / 400 lbs/yd³)</option>
                <option value="compost">Compost / Soil Blend (~712 kg/m³ / 1,200 lbs/yd³)</option>
                <option value="pea_gravel">Decorative Pea Gravel (~1,424 kg/m³ / 2,400 lbs/yd³)</option>
              </select>
            </div>

            <div>
              <label htmlFor="truck-vehicle" className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Hauling Vehicle / Trailer:
              </label>
              <select
                id="truck-vehicle"
                aria-label="Hauling vehicle or trailer type"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value as VehicleType)}
                className="w-full h-7 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
              >
                <option value="midsize_truck">Midsize Pickup (~680 kg / 1,500 lbs max)</option>
                <option value="halfton_truck">Full-Size 1/2-Ton (~907 kg / 2,000 lbs max)</option>
                <option value="threequarter_truck">Heavy Duty 3/4-Ton (~1,587 kg / 3,500 lbs max)</option>
                <option value="utility_trailer">Single-Axle Trailer (~1,814 kg / 4,000 lbs max)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 no-print">
            <Button
              onClick={handleTruckCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Truck Loads
            </Button>
          </div>

          {truckResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800" aria-live="polite">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Total Payload Weight</span>
                  <span className="text-xl font-bold text-blue-900 dark:text-blue-100 font-sans tabular-nums">
                    {truckResult.totalWeightKg.toLocaleString()} kg
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">
                    ({truckResult.totalWeightLbs.toLocaleString()} lbs / {truckResult.totalWeightMetricTonnes} t)
                  </span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Trips by Volume</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {truckResult.tripsNeededByVolume} {truckResult.tripsNeededByVolume === 1 ? "Trip" : "Trips"}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">(@{truckResult.maxCubicMetersPerTrip} m³/bed)</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Trips by Weight Limit</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {truckResult.tripsNeededByWeight} {truckResult.tripsNeededByWeight === 1 ? "Trip" : "Trips"}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">(@{truckResult.maxPayloadKg.toLocaleString()} kg max)</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Recommended Trips</span>
                  <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                    {truckResult.tripsRecommended} {truckResult.tripsRecommended === 1 ? "Trip" : "Trips"}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">Safe Capacity</span>
                </div>
              </div>

              {/* Safety Status Banner */}
              <div
                role="alert"
                className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${
                  truckResult.safetyStatus === "safe"
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                    : truckResult.safetyStatus === "caution"
                    ? "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200"
                    : "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200"
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold">
                  {truckResult.safetyStatus === "safe" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span>
                    Payload Capacity: {truckResult.weightUtilizationPercent}% ({truckResult.safetyStatus.toUpperCase()})
                  </span>
                </div>
                <span className="text-[11px]">
                  Vehicle Limit: {truckResult.maxPayloadKg.toLocaleString()} kg ({truckResult.maxPayloadLbs.toLocaleString()} lbs) per trip
                </span>
              </div>

              {/* Action Toolbar */}
              <CardActionBar
                onCopyResult={copyTruckResult}
                onCopySummary={copyTruckSummary}
                onCopyLatex={copyTruckLatex}
              />
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...truckSaved}
          cardTitle="Truck Payload"
          formatSummary={(r) => `${r.totalWeightKg.toLocaleString()} kg, ${r.tripsRecommended} ${r.tripsRecommended === 1 ? "Trip" : "Trips"} in ${r.vehicleName}`}
          onRestore={restoreTruckInputs}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1 no-print">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
          aria-label="Generate full Mulch Shopping and Takeoff Report"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Mulch Shopping Report
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

export default MulchCalculator;
