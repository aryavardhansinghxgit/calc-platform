"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Download,
  Trash2,
  Plus,
  FileSpreadsheet,
  Layers,
  RotateCcw,
  Copy,
  Check,
  FileText,
  Code2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  DimensionUnit,
  DepthUnit,
  GravelShape,
  GravelType,
  GRAVEL_TYPES,
  calculateGravelEstimator,
  calculateGravelCost,
  calculateMultiZoneGravel,
  calculateDrainageTrench,
  GravelEstimatorResult,
  GravelCostResult,
  MultiZoneGravelResult,
  DrainageTrenchResult,
  GravelZoneSection,
} from "@/lib/calculator-engine/formulas/gravel";

// ─── Local Storage Hook with Full Raw State Persistence ─────────────────────

export interface SavedGravelRecord {
  id: string;
  timestamp: string;
  shape: GravelShape;
  length: string;
  lengthUnit: DimensionUnit;
  width: string;
  widthUnit: DimensionUnit;
  diameter: string;
  diameterUnit: DimensionUnit;
  totalAreaSqFt: string;
  quantity: string;
  depth: string;
  depthUnit: DepthUnit;
  gravelType: GravelType;
  customDensity: string;
  compactionPct: string;
  wastePct: string;
  pricePerUnit: string;
  pricingType: "per_ton" | "per_yard" | "per_bag";
  costTons: string;
  costYards: string;
  costPricingBasis: "per_ton" | "per_yard";
  materialUnitPrice: string;
  deliveryFlatFee: string;
  laborCostPerTon: string;
  salesTaxPct: string;
  zones: GravelZoneSection[];
  multiCompaction: string;
  multiWaste: string;
  multiPricePerTon: string;
  multiDeliveryFee: string;
  trenchLength: string;
  trenchWidth: string;
  trenchDepth: string;
  pipeDiameter: number;
  trenchGravelType: GravelType;
  summary: string;
}

function flashSave(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
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
    <div className="border border-blue-600/30 dark:border-blue-500/30 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-zinc-900 transition-all print:border-slate-300 print:shadow-none print:break-inside-avoid">
      <div className="bg-blue-600 text-white px-3.5 py-1.5 flex items-center justify-between no-print">
        <h3 className="font-bold text-xs tracking-wide text-white">{title}</h3>
        {hasResult && onSave && (
          <div className="flex items-center gap-1.5">
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
              aria-label="Save calculation"
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
      <div className="hidden print:block border-b border-slate-300 px-3.5 py-1 font-bold text-xs text-slate-800">
        {title}
      </div>
      <div className="p-3.5 space-y-3">{children}</div>
    </div>
  );
}

function SavedEstimatesDrawer({
  saved,
  isOpen,
  remove,
  clear,
  restore,
  cardTitle,
}: {
  saved: SavedGravelRecord[];
  isOpen: boolean;
  remove: (id: string) => void;
  clear: () => void;
  restore: (record: SavedGravelRecord) => void;
  cardTitle: string;
}) {
  if (!isOpen || saved.length === 0) return null;

  const exportCsv = () => {
    const rows = [
      ["Timestamp", "Shape", "Dimensions", "Material", "Compaction %", "Waste %", "Quantity", "Summary"],
      ...saved.map((e) => [
        e.timestamp,
        e.shape,
        e.shape === "circle" ? `Dia: ${e.diameter}${e.diameterUnit}` : `${e.length}${e.lengthUnit} x ${e.width}${e.widthUnit}`,
        e.gravelType,
        e.compactionPct,
        e.wastePct,
        e.quantity,
        e.summary,
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gravel_saved_history.csv`;
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
            aria-label="Export history as CSV"
          >
            <Download className="w-3 h-3" /> CSV
          </button>
          <button
            type="button"
            onClick={clear}
            className="text-[10px] text-zinc-400 hover:text-red-500 cursor-pointer"
            aria-label="Clear all saved history"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="space-y-1.5 max-h-40 overflow-y-auto">
        {saved.map((item) => (
          <div
            key={item.id}
            className="p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-sans tabular-nums"
          >
            <div className="truncate pr-2">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                {item.summary}
              </span>
              <span className="text-zinc-400 ml-1.5">
                ({item.shape}, Qty: {item.quantity}, {item.timestamp})
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => restore(item)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-50 dark:bg-blue-950/40 rounded border border-blue-200 dark:border-blue-800 cursor-pointer"
                title="Restore this calculation"
                aria-label={`Restore calculation from ${item.timestamp}`}
              >
                <RotateCcw className="w-3 h-3" /> Restore
              </button>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
                title="Delete"
                aria-label="Delete saved calculation"
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

// ─── Parametric 2D Scaled Visualizer for Card 1 ─────────────────────────────

function GravelShapeVisualizer2D({
  shape,
  length,
  lengthUnit,
  width,
  widthUnit,
  diameter,
  diameterUnit,
  depthInches,
  depthCm,
  gravelName,
  areaSqFt,
  quantity,
}: {
  shape: GravelShape;
  length: number;
  lengthUnit: DimensionUnit;
  width: number;
  widthUnit: DimensionUnit;
  diameter: number;
  diameterUnit: DimensionUnit;
  depthInches: number;
  depthCm: number;
  gravelName: string;
  areaSqFt: number;
  quantity: number;
}) {
  const gravelH = Math.min(50, Math.max(14, depthInches * 6));

  if (shape === "circle") {
    const r = 45;
    return (
      <div className="w-full flex flex-col items-center select-none">
        <svg
          viewBox="0 0 240 140"
          className="w-full max-w-[220px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 shadow-xs"
          aria-label="Circular gravel patio live diagram"
        >
          <defs>
            <pattern id="circGravelPattern" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect width="12" height="12" fill="#94a3b8" />
              <circle cx="3" cy="3" r="2" fill="#64748b" />
              <circle cx="9" cy="8" r="1.8" fill="#475569" />
            </pattern>
          </defs>
          <rect width="240" height="140" fill="#f8fafc" className="dark:fill-zinc-900" />
          {/* Ground Outline */}
          <circle cx="120" cy="70" r={r} fill="url(#circGravelPattern)" stroke="#1e3a8a" strokeWidth="2" />
          {/* Center Point */}
          <circle cx="120" cy="70" r="2" fill="#1e3a8a" />
          {/* Diameter Indicator Line */}
          <line x1={120 - r} y1="70" x2={120 + r} y2="70" stroke="#1e3a8a" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Dimension Text */}
          <rect x="75" y="58" width="90" height="16" rx="3" fill="#0f172a" fillOpacity="0.85" />
          <text x="120" y="70" textAnchor="middle" className="text-[7.5px] fill-white font-bold">
            Ø {diameter} {diameterUnit} ({depthInches}&quot; D)
          </text>
          {/* Area Callout */}
          <text x="120" y="128" textAnchor="middle" className="text-[8px] fill-zinc-600 dark:fill-zinc-400 font-semibold">
            Area: {areaSqFt} sq ft {quantity > 1 ? `(×${quantity} units)` : ""}
          </text>
        </svg>
      </div>
    );
  }

  if (shape === "triangle") {
    return (
      <div className="w-full flex flex-col items-center select-none">
        <svg
          viewBox="0 0 240 140"
          className="w-full max-w-[220px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 shadow-xs"
          aria-label="Triangular gravel area live diagram"
        >
          <defs>
            <pattern id="triGravelPattern" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect width="12" height="12" fill="#94a3b8" />
              <circle cx="4" cy="4" r="2" fill="#64748b" />
              <circle cx="8" cy="9" r="1.8" fill="#475569" />
            </pattern>
          </defs>
          <rect width="240" height="140" fill="#f8fafc" className="dark:fill-zinc-900" />
          {/* Triangular Polygon: Base along bottom, apex at top */}
          <polygon points="35,110 205,110 120,25" fill="url(#triGravelPattern)" stroke="#1e3a8a" strokeWidth="2" />
          {/* Perpendicular Height dashed line */}
          <line x1="120" y1="25" x2="120" y2="110" stroke="#1e3a8a" strokeWidth="1.2" strokeDasharray="3 2" />
          {/* Base Label */}
          <rect x="75" y="114" width="90" height="14" rx="2" fill="#0f172a" fillOpacity="0.85" />
          <text x="120" y="124" textAnchor="middle" className="text-[7.5px] fill-white font-bold">
            Base: {length} {lengthUnit}
          </text>
          {/* Height Label */}
          <rect x="124" y="55" width="60" height="14" rx="2" fill="#0f172a" fillOpacity="0.85" />
          <text x="154" y="65" textAnchor="middle" className="text-[7px] fill-white font-bold">
            H: {width} {widthUnit}
          </text>
          {/* Layer Depth Badge */}
          <text x="120" y="16" textAnchor="middle" className="text-[7.5px] fill-blue-900 dark:fill-blue-300 font-bold uppercase">
            Depth: {depthInches}&quot; ({depthCm} cm)
          </text>
        </svg>
      </div>
    );
  }

  // Rectangle / Cross-Section Subgrade View
  return (
    <div className="w-full flex flex-col items-center select-none">
      <svg
        viewBox="0 0 240 140"
        className="w-full max-w-[220px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 shadow-xs"
        aria-label="2D Gravel Sub-Base Cross Section"
      >
        <defs>
          <pattern id="gravelPattern" width="16" height="12" patternUnits="userSpaceOnUse">
            <rect width="16" height="12" fill="#94a3b8" />
            <circle cx="4" cy="4" r="2.5" fill="#64748b" stroke="#475569" strokeWidth="0.5" />
            <circle cx="12" cy="8" r="2" fill="#cbd5e1" stroke="#475569" strokeWidth="0.5" />
            <polygon points="7,2 10,4 8,7 6,4" fill="#475569" />
          </pattern>
          <pattern id="basePattern" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill="#d6d3d1" />
            <circle cx="3" cy="3" r="1.5" fill="#a8a29e" />
            <circle cx="9" cy="9" r="1.2" fill="#78716c" />
          </pattern>
          <pattern id="subgradePattern" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill="#44403c" />
            <circle cx="3" cy="3" r="1" fill="#292524" />
            <circle cx="9" cy="9" r="1" fill="#1c1917" />
          </pattern>
        </defs>

        {/* Top Air Banner */}
        <rect x="0" y="0" width="240" height="22" fill="#e0f2fe" className="dark:fill-slate-800" />
        <text x="120" y="14" textAnchor="middle" className="text-[7.5px] fill-blue-900 dark:fill-blue-200 font-bold uppercase tracking-wider">
          SURFACE GRADE • {length} {lengthUnit} × {width} {widthUnit} {quantity > 1 ? `(×${quantity})` : ""}
        </text>

        {/* Top Gravel Layer */}
        <rect x="15" y={22} width="210" height={gravelH} rx="1" fill="url(#gravelPattern)" stroke="#475569" strokeWidth="1" />
        
        {/* Geotextile Membrane Line */}
        <line x1="15" y1={22 + gravelH} x2="225" y2={22 + gravelH} stroke="#1e3a8a" strokeWidth="2" strokeDasharray="4 2" />

        {/* Compacted Base Course */}
        <rect x="15" y={22 + gravelH} width="210" height="32" fill="url(#basePattern)" stroke="#a8a29e" strokeWidth="0.8" />

        {/* Subgrade Native Soil */}
        <rect x="15" y={54 + gravelH} width="210" height={Math.max(20, 86 - gravelH)} fill="url(#subgradePattern)" />

        {/* Depth Dimension Badge */}
        <rect x="150" y={15 + gravelH / 2} width="75" height="18" rx="3" fill="#0f172a" fillOpacity="0.9" />
        <text x="187" y={27.5 + gravelH / 2} textAnchor="middle" className="text-[8px] fill-white font-bold">
          {depthInches}&quot; ({depthCm} cm)
        </text>

        {/* Subgrade Label */}
        <text x="25" y="132" className="text-[7px] fill-zinc-300 font-semibold tracking-wider">
          COMPACTED SUBGRADE SOIL
        </text>
      </svg>
    </div>
  );
}

// ─── Parametric 2D French Drain Trench Visualizer ───────────────────────────

function FrenchDrainVisualizer2D({
  lengthFt,
  widthIn,
  depthIn,
  pipeDiaIn,
  netTons,
  isValidGeometry,
  validationError,
}: {
  lengthFt: number;
  widthIn: number;
  depthIn: number;
  pipeDiaIn: number;
  netTons: number;
  isValidGeometry: boolean;
  validationError?: string;
}) {
  // Parametric scaling of trench within 240x140 SVG
  const minW = 60;
  const maxW = 160;
  const clampedWidthIn = Math.min(36, Math.max(6, widthIn));
  const trenchW = minW + ((clampedWidthIn - 6) / 30) * (maxW - minW);

  const minH = 60;
  const maxH = 105;
  const clampedDepthIn = Math.min(48, Math.max(10, depthIn));
  const trenchH = minH + ((clampedDepthIn - 10) / 38) * (maxH - minH);

  const startX = (240 - trenchW) / 2;
  const startY = 16;

  // Pipe radius proportional to trench width
  const pipeRadius = pipeDiaIn > 0 ? Math.max(8, Math.min(26, (pipeDiaIn / widthIn) * (trenchW / 2))) : 0;
  const pipeCenterY = startY + trenchH - pipeRadius - 8;

  return (
    <div className="w-full flex flex-col items-center select-none">
      <svg
        viewBox="0 0 240 140"
        className="w-full max-w-[220px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 shadow-xs"
        aria-label="2D French Drain Cross Section"
      >
        <defs>
          <pattern id="trenchGravel" width="12" height="10" patternUnits="userSpaceOnUse">
            <rect width="12" height="10" fill="#94a3b8" />
            <circle cx="3" cy="3" r="2" fill="#475569" />
            <circle cx="9" cy="7" r="1.8" fill="#64748b" />
          </pattern>
        </defs>

        {/* Native Soil Background */}
        <rect width="240" height="140" fill="#57534e" />

        {/* Top Grass Cap */}
        <rect x="0" y="0" width="240" height="16" fill="#15803d" />

        {/* Excavated Trench Box */}
        <rect
          x={startX}
          y={startY}
          width={trenchW}
          height={trenchH}
          fill="url(#trenchGravel)"
          stroke="#1e3a8a"
          strokeWidth="2.5"
          strokeDasharray="3 2"
        />

        {/* Perforated Pipe (Rendered only when pipeDiaIn > 0 and geometry is valid) */}
        {pipeDiaIn > 0 && isValidGeometry ? (
          <g transform={`translate(120, ${pipeCenterY})`}>
            <circle cx="0" cy="0" r={pipeRadius} fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
            <circle cx="0" cy="0" r={Math.max(4, pipeRadius - 4)} fill="#0284c7" />
            <circle cx="-5" cy="-5" r="1.2" fill="#ffffff" />
            <circle cx="5" cy="-5" r="1.2" fill="#ffffff" />
            <circle cx="-5" cy="5" r="1.2" fill="#ffffff" />
            <circle cx="5" cy="5" r="1.2" fill="#ffffff" />
            <text x="0" y="3" textAnchor="middle" className="text-[7px] fill-white font-bold">
              {pipeDiaIn}&quot; PIPE
            </text>
          </g>
        ) : null}

        {/* No-Pipe Swale Banner */}
        {pipeDiaIn === 0 && (
          <g transform={`translate(120, ${startY + trenchH / 2})`}>
            <rect x="-65" y="-9" width="130" height="18" rx="3" fill="#0f172a" fillOpacity="0.85" />
            <text x="0" y="3.5" textAnchor="middle" className="text-[7px] fill-white font-bold tracking-wider">
              GRAVEL-FILLED SWALE (NO PIPE)
            </text>
          </g>
        )}

        {/* Invalid Geometry Warning Overlay */}
        {!isValidGeometry && (
          <g transform={`translate(120, ${startY + trenchH / 2})`}>
            <rect x="-75" y="-12" width="150" height="24" rx="4" fill="#991b1b" fillOpacity="0.95" />
            <text x="0" y="3" textAnchor="middle" className="text-[6.5px] fill-white font-bold">
              {validationError || "INVALID GEOMETRY"}
            </text>
          </g>
        )}

        {/* Dimension Callouts */}
        <text x="120" y="134" textAnchor="middle" className="text-[7.5px] fill-white font-bold">
          {widthIn}&quot; W × {depthIn}&quot; D Trench ({netTons} Tons Stone)
        </text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function GravelCalculator() {
  // ─── Notification Toast State ───
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  }, []);

  // ─── CARD 1: RECTANGULAR, CIRCULAR & TRIANGULAR ESTIMATOR ───
  const [shape, setShape] = useState<GravelShape>("rectangle");
  const [length, setLength] = useState("30");
  const [lengthUnit, setLengthUnit] = useState<DimensionUnit>("feet");
  const [width, setWidth] = useState("10");
  const [widthUnit, setWidthUnit] = useState<DimensionUnit>("feet");
  const [diameter, setDiameter] = useState("16");
  const [diameterUnit, setDiameterUnit] = useState<DimensionUnit>("feet");
  const [totalAreaSqFt, setTotalAreaSqFt] = useState("");
  const [quantity, setQuantity] = useState("1");

  const [depth, setDepth] = useState("4");
  const [depthUnit, setDepthUnit] = useState<DepthUnit>("inches");
  const [gravelType, setGravelType] = useState<GravelType>("crushed_stone_57");
  const [customDensity, setCustomDensity] = useState("2840");

  const [compactionPct, setCompactionPct] = useState("8");
  const [wastePct, setWastePct] = useState("5");

  const [pricePerUnit, setPricePerUnit] = useState("45.00");
  const [pricingType, setPricingType] = useState<"per_ton" | "per_yard" | "per_bag">("per_ton");

  const [gravelResult, setGravelResult] = useState<GravelEstimatorResult>(() =>
    calculateGravelEstimator({
      shape: "rectangle",
      length: 30,
      lengthUnit: "feet",
      width: 10,
      widthUnit: "feet",
      depth: 4,
      depthUnit: "inches",
      gravelType: "crushed_stone_57",
      compactionPct: 8,
      wastePct: 5,
      quantity: 1,
      pricePerUnit: 45,
      pricingType: "per_ton",
    })
  );
  const [gravelSaveSuccess, setGravelSaveSuccess] = useState(false);

  // ─── CARD 2: GRAVEL COST & DELIVERY BUDGET ───
  const [costTons, setCostTons] = useState("5.96");
  const [costYards, setCostYards] = useState("4.2");
  const [costPricingBasis, setCostPricingBasis] = useState<"per_ton" | "per_yard">("per_ton");
  const [materialUnitPrice, setMaterialUnitPrice] = useState("45.00");
  const [deliveryFlatFee, setDeliveryFlatFee] = useState("75.00");
  const [laborCostPerTon, setLaborCostPerTon] = useState("20.00");
  const [salesTaxPct, setSalesTaxPct] = useState("7");
  const [costResult, setCostResult] = useState<GravelCostResult>(() =>
    calculateGravelCost({
      totalTons: 5.96,
      totalCuYards: 4.2,
      pricingBasis: "per_ton",
      materialUnitPrice: 45,
      deliveryFlatFee: 75,
      laborCostPerTon: 20,
      salesTaxPct: 7,
      totalSqFt: 300,
    })
  );
  const [costSaveSuccess, setCostSaveSuccess] = useState(false);

  // ─── CARD 3: MULTI-ZONE MASTER AGGREGATOR ───
  const [zones, setZones] = useState<GravelZoneSection[]>([
    { id: "1", name: "Main Driveway", shape: "rectangle", dim1: 50, dim2: 12, depthInches: 4, gravelType: "crushed_stone_57" },
    { id: "2", name: "Driveway Sub-Base", shape: "rectangle", dim1: 50, dim2: 12, depthInches: 4, gravelType: "crusher_run" },
    { id: "3", name: "Garden Walkway", shape: "rectangle", dim1: 30, dim2: 3.5, depthInches: 2.5, gravelType: "pea_gravel" },
  ]);
  const [multiCompaction, setMultiCompaction] = useState("10");
  const [multiWaste, setMultiWaste] = useState("5");
  const [multiPricePerTon, setMultiPricePerTon] = useState("45.00");
  const [multiDeliveryFee, setMultiDeliveryFee] = useState("75.00");
  const [multiResult, setMultiResult] = useState<MultiZoneGravelResult>(() =>
    calculateMultiZoneGravel({
      zones: [
        { id: "1", name: "Main Driveway", shape: "rectangle", dim1: 50, dim2: 12, depthInches: 4, gravelType: "crushed_stone_57" },
        { id: "2", name: "Driveway Sub-Base", shape: "rectangle", dim1: 50, dim2: 12, depthInches: 4, gravelType: "crusher_run" },
        { id: "3", name: "Garden Walkway", shape: "rectangle", dim1: 30, dim2: 3.5, depthInches: 2.5, gravelType: "pea_gravel" },
      ],
      compactionPct: 10,
      wastePct: 5,
      pricePerTon: 45,
      deliveryFee: 75,
    })
  );
  const [multiSaveSuccess, setMultiSaveSuccess] = useState(false);

  // ─── CARD 4: SUB-BASE & FRENCH DRAIN / DRAINAGE TRENCH ───
  const [trenchLength, setTrenchLength] = useState("50");
  const [trenchWidth, setTrenchWidth] = useState("12"); // inches
  const [trenchDepth, setTrenchDepth] = useState("18"); // inches
  const [pipeDiameter, setPipeDiameter] = useState(4); // inches (0 = No Pipe)
  const [trenchGravelType, setTrenchGravelType] = useState<GravelType>("crushed_stone_57");
  const [trenchResult, setTrenchResult] = useState<DrainageTrenchResult>(() =>
    calculateDrainageTrench({
      trenchLengthFt: 50,
      trenchWidthInches: 12,
      totalDepthInches: 18,
      pipeDiameterInches: 4,
      gravelType: "crushed_stone_57",
    })
  );
  const [trenchSaveSuccess, setTrenchSaveSuccess] = useState(false);

  // ─── Saved Records Full State ───
  const [savedRecords, setSavedRecords] = useState<SavedGravelRecord[]>([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("saved_gravel_master_records");
      if (raw) setSavedRecords(JSON.parse(raw));
    } catch {}
  }, []);

  const saveRecord = useCallback((summary: string) => {
    const entry: SavedGravelRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      shape,
      length,
      lengthUnit,
      width,
      widthUnit,
      diameter,
      diameterUnit,
      totalAreaSqFt,
      quantity,
      depth,
      depthUnit,
      gravelType,
      customDensity,
      compactionPct,
      wastePct,
      pricePerUnit,
      pricingType,
      costTons,
      costYards,
      costPricingBasis,
      materialUnitPrice,
      deliveryFlatFee,
      laborCostPerTon,
      salesTaxPct,
      zones,
      multiCompaction,
      multiWaste,
      multiPricePerTon,
      multiDeliveryFee,
      trenchLength,
      trenchWidth,
      trenchDepth,
      pipeDiameter,
      trenchGravelType,
      summary,
    };
    setSavedRecords((prev) => {
      const next = [entry, ...prev].slice(0, 15);
      try {
        localStorage.setItem("saved_gravel_master_records", JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast("Calculation Saved!");
  }, [
    shape, length, lengthUnit, width, widthUnit, diameter, diameterUnit, totalAreaSqFt, quantity,
    depth, depthUnit, gravelType, customDensity, compactionPct, wastePct, pricePerUnit, pricingType,
    costTons, costYards, costPricingBasis, materialUnitPrice, deliveryFlatFee, laborCostPerTon,
    salesTaxPct, zones, multiCompaction, multiWaste, multiPricePerTon, multiDeliveryFee,
    trenchLength, trenchWidth, trenchDepth, pipeDiameter, trenchGravelType, showToast,
  ]);

  const removeSavedRecord = useCallback((id: string) => {
    setSavedRecords((prev) => {
      const next = prev.filter((r) => r.id !== id);
      try {
        localStorage.setItem("saved_gravel_master_records", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const clearSavedRecords = useCallback(() => {
    setSavedRecords([]);
    try {
      localStorage.removeItem("saved_gravel_master_records");
    } catch {}
  }, []);

  const restoreSavedRecord = useCallback((record: SavedGravelRecord) => {
    setShape(record.shape);
    setLength(record.length);
    setLengthUnit(record.lengthUnit);
    setWidth(record.width);
    setWidthUnit(record.widthUnit);
    setDiameter(record.diameter);
    setDiameterUnit(record.diameterUnit);
    setTotalAreaSqFt(record.totalAreaSqFt || "");
    setQuantity(record.quantity || "1");
    setDepth(record.depth);
    setDepthUnit(record.depthUnit);
    setGravelType(record.gravelType);
    setCustomDensity(record.customDensity || "2840");
    setCompactionPct(record.compactionPct);
    setWastePct(record.wastePct);
    setPricePerUnit(record.pricePerUnit);
    setPricingType(record.pricingType);

    setCostTons(record.costTons);
    setCostYards(record.costYards);
    setCostPricingBasis(record.costPricingBasis);
    setMaterialUnitPrice(record.materialUnitPrice);
    setDeliveryFlatFee(record.deliveryFlatFee);
    setLaborCostPerTon(record.laborCostPerTon);
    setSalesTaxPct(record.salesTaxPct);

    if (record.zones && record.zones.length > 0) setZones(record.zones);
    setMultiCompaction(record.multiCompaction);
    setMultiWaste(record.multiWaste);
    setMultiPricePerTon(record.multiPricePerTon);
    setMultiDeliveryFee(record.multiDeliveryFee);

    setTrenchLength(record.trenchLength);
    setTrenchWidth(record.trenchWidth);
    setTrenchDepth(record.trenchDepth);
    setPipeDiameter(record.pipeDiameter);
    setTrenchGravelType(record.trenchGravelType);

    showToast("Configuration Restored!");
  }, [showToast]);

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // ─── Calculation Handlers ───

  const handleGravelCalc = useCallback(() => {
    const res = calculateGravelEstimator({
      shape,
      length: length.trim() !== "" ? Number(length) : 0,
      lengthUnit,
      width: width.trim() !== "" ? Number(width) : 0,
      widthUnit,
      diameter: diameter.trim() !== "" ? Number(diameter) : 0,
      diameterUnit,
      totalAreaSqFt: totalAreaSqFt.trim() !== "" ? Number(totalAreaSqFt) : 0,
      quantity: quantity.trim() !== "" ? Number(quantity) : 1,
      depth: depth.trim() !== "" ? Number(depth) : 0,
      depthUnit,
      gravelType,
      customDensityLbsPerCuYd: customDensity.trim() !== "" ? Number(customDensity) : 2840,
      compactionPct: compactionPct.trim() !== "" ? Number(compactionPct) : 0,
      wastePct: wastePct.trim() !== "" ? Number(wastePct) : 0,
      pricePerUnit: pricePerUnit.trim() !== "" ? Number(pricePerUnit) : 0,
      pricingType,
    });
    setGravelResult(res);
    setCostTons(String(res.weightShortTons));
    setCostYards(String(res.adjustedVolumeCuYards));
  }, [
    shape, length, lengthUnit, width, widthUnit, diameter, diameterUnit, totalAreaSqFt, quantity,
    depth, depthUnit, gravelType, customDensity, compactionPct, wastePct, pricePerUnit, pricingType,
  ]);

  const handleCostCalc = useCallback(() => {
    const res = calculateGravelCost({
      totalTons: costTons.trim() !== "" ? Number(costTons) : 0,
      totalCuYards: costYards.trim() !== "" ? Number(costYards) : 0,
      pricingBasis: costPricingBasis,
      materialUnitPrice: materialUnitPrice.trim() !== "" ? Number(materialUnitPrice) : 0,
      deliveryFlatFee: deliveryFlatFee.trim() !== "" ? Number(deliveryFlatFee) : 0,
      salesTaxPct: salesTaxPct.trim() !== "" ? Number(salesTaxPct) : 0,
      laborCostPerTon: laborCostPerTon.trim() !== "" ? Number(laborCostPerTon) : 0,
      totalSqFt: gravelResult ? gravelResult.areaSqFt : 300,
    });
    setCostResult(res);
  }, [costTons, costYards, costPricingBasis, materialUnitPrice, deliveryFlatFee, salesTaxPct, laborCostPerTon, gravelResult]);

  const handleMultiCalc = useCallback(() => {
    const res = calculateMultiZoneGravel({
      zones,
      compactionPct: multiCompaction.trim() !== "" ? Number(multiCompaction) : 0,
      wastePct: multiWaste.trim() !== "" ? Number(multiWaste) : 0,
      pricePerTon: multiPricePerTon.trim() !== "" ? Number(multiPricePerTon) : 0,
      deliveryFee: multiDeliveryFee.trim() !== "" ? Number(multiDeliveryFee) : 0,
    });
    setMultiResult(res);
  }, [zones, multiCompaction, multiWaste, multiPricePerTon, multiDeliveryFee]);

  const handleTrenchCalc = useCallback(() => {
    const res = calculateDrainageTrench({
      trenchLengthFt: trenchLength.trim() !== "" ? Number(trenchLength) : 0,
      trenchWidthInches: trenchWidth.trim() !== "" ? Number(trenchWidth) : 0,
      totalDepthInches: trenchDepth.trim() !== "" ? Number(trenchDepth) : 0,
      pipeDiameterInches: pipeDiameter,
      gravelType: trenchGravelType,
    });
    setTrenchResult(res);
  }, [trenchLength, trenchWidth, trenchDepth, pipeDiameter, trenchGravelType]);

  // Reactive Calculation on state changes
  useEffect(() => {
    handleGravelCalc();
  }, [handleGravelCalc]);

  useEffect(() => {
    handleCostCalc();
  }, [handleCostCalc]);

  useEffect(() => {
    handleMultiCalc();
  }, [handleMultiCalc]);

  useEffect(() => {
    handleTrenchCalc();
  }, [handleTrenchCalc]);

  // Multi-zone row actions
  const addZoneRow = () => {
    setZones((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        name: `Zone ${prev.length + 1}`,
        shape: "rectangle",
        dim1: 20,
        dim2: 10,
        depthInches: 4,
        gravelType: "crushed_stone_57",
      },
    ]);
  };

  const removeZoneRow = (id: string) => {
    if (zones.length <= 1) return;
    setZones((prev) => prev.filter((z) => z.id !== id));
  };

  const updateZoneRow = (id: string, field: keyof GravelZoneSection, value: any) => {
    setZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, [field]: value } : z)),
    );
  };

  // ─── Export Action Handlers ───

  const copyResultText = () => {
    if (!gravelResult) return;
    const text = `Gravel Takeoff: ${gravelResult.weightShortTons} Short Tons (${gravelResult.weightMetricTonnes} Tonnes / ${gravelResult.weightKg.toLocaleString()} kg), Volume: ${gravelResult.adjustedVolumeCuYards} yd³ (${gravelResult.adjustedVolumeCuMeters} m³), Surface Area: ${gravelResult.areaSqFt} sq ft (${gravelResult.areaSqM} m²), 50-lb Bags: ${gravelResult.bags50lb}, 10-Ton Loads: ${gravelResult.truckLoads10Ton}${gravelResult.estimatedCost > 0 ? `, Estimated Cost: $${gravelResult.estimatedCost.toFixed(2)}` : ""}.`;
    navigator.clipboard.writeText(text).then(() => {
      showToast("Result copied to clipboard!");
    });
  };

  const copySummaryText = () => {
    if (!gravelResult) return;
    const summary = [
      "=== GRAVEL & AGGREGATE CALCULATION SUMMARY ===",
      `Project Shape: ${shape}`,
      shape === "circle" ? `Diameter: ${diameter} ${diameterUnit}` : `Dimensions: ${length} ${lengthUnit} × ${width} ${widthUnit}`,
      `Quantity: ${quantity}`,
      `Layer Depth: ${depth} ${depthUnit} (${gravelResult.depthInches} in / ${gravelResult.depthCm} cm)`,
      `Aggregate Type: ${GRAVEL_TYPES[gravelType].name}`,
      `Compaction / Settling: +${compactionPct}%`,
      `Waste Allowance: +${wastePct}%`,
      "--- RESULTS ---",
      `Total Coverage Area: ${gravelResult.areaSqFt} sq ft (${gravelResult.areaSqM} m²)`,
      `Net Volume: ${gravelResult.netVolumeCuYards} yd³ (${gravelResult.netVolumeCuMeters} m³)`,
      `Compacted Volume: ${gravelResult.adjustedVolumeCuYards} yd³ (${gravelResult.adjustedVolumeCuMeters} m³)`,
      `Total Weight: ${gravelResult.weightShortTons} Short Tons (${gravelResult.weightMetricTonnes} Metric Tonnes)`,
      `Weight in Pounds: ${gravelResult.weightLbs.toLocaleString()} lbs`,
      `Application Rate: ${gravelResult.applicationRateKgPerM2} kg/m²`,
      `50-lb Bags Required: ${gravelResult.bags50lb} Bags`,
      `Dump Truck Loads: ${gravelResult.truckLoads10Ton} loads (10-ton tandem)`,
      gravelResult.estimatedCost > 0 ? `Material Cost: $${gravelResult.estimatedCost.toFixed(2)}` : "",
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(summary).then(() => {
      showToast("Summary copied to clipboard!");
    });
  };

  const copyLatexFormula = () => {
    if (!gravelResult) return;
    const latex = [
      `% Gravel Volume & Tonnage Formulation`,
      `V_{\\text{raw}} = \\frac{A \\times d}{27} = \\frac{${gravelResult.areaSqFt} \\times (${gravelResult.depthInches}/12)}{27} = ${gravelResult.netVolumeCuYards}\\,\\text{yd}^3`,
      `V_{\\text{adj}} = V_{\\text{raw}} \\times \\left(1 + \\frac{${compactionPct}}{100}\\right) \\times \\left(1 + \\frac{${wastePct}}{100}\\right) = ${gravelResult.adjustedVolumeCuYards}\\,\\text{yd}^3`,
      `W = V_{\\text{adj}} \\times \\rho = ${gravelResult.adjustedVolumeCuYards} \\times ${GRAVEL_TYPES[gravelType].lbsPerCubicYard}\\,\\text{lbs/yd}^3 = ${gravelResult.weightLbs}\\,\\text{lbs}`,
      `\\text{Short Tons} = \\frac{${gravelResult.weightLbs}}{2000} = ${gravelResult.weightShortTons}\\,\\text{Tons}`,
    ].join("\n");
    navigator.clipboard.writeText(latex).then(() => {
      showToast("LaTeX copied to clipboard!");
    });
  };

  const exportDirectCsv = () => {
    if (!gravelResult) return;
    const rows = [
      ["Parameter", "Value", "Unit"],
      ["Shape", shape, ""],
      ["Quantity", quantity, "units"],
      ["Dimensions", shape === "circle" ? `Dia: ${diameter} ${diameterUnit}` : `${length} ${lengthUnit} x ${width} ${widthUnit}`, ""],
      ["Layer Depth", depth, depthUnit],
      ["Aggregate Type", GRAVEL_TYPES[gravelType].name, ""],
      ["Density (Tons/yd³)", GRAVEL_TYPES[gravelType].tonsPerCubicYard, "tons/yd³"],
      ["Compaction Settling", compactionPct, "%"],
      ["Waste Allowance", wastePct, "%"],
      ["Total Coverage Area", gravelResult.areaSqFt, "sq ft"],
      ["Total Coverage Area (Metric)", gravelResult.areaSqM, "m²"],
      ["Net Volume", gravelResult.netVolumeCuYards, "cu yd"],
      ["Adjusted Volume", gravelResult.adjustedVolumeCuYards, "cu yd"],
      ["Adjusted Volume (Metric)", gravelResult.adjustedVolumeCuMeters, "m³"],
      ["Total Weight (Short Tons)", gravelResult.weightShortTons, "Tons"],
      ["Total Weight (Metric Tonnes)", gravelResult.weightMetricTonnes, "Tonnes"],
      ["Total Weight (Pounds)", gravelResult.weightLbs, "lbs"],
      ["50-lb Bag Equivalent", gravelResult.bags50lb, "bags"],
      ["10-Ton Dump Truck Loads", gravelResult.truckLoads10Ton, "loads"],
      ["Unit Price", pricePerUnit, `$/${pricingType.replace("per_", "")}`],
      ["Estimated Cost", gravelResult.estimatedCost.toFixed(2), "$"],
      ["Timestamp", new Date().toISOString(), ""],
    ];
    const csvContent = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gravel_takeoff_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("CSV Downloaded!");
  };

  const downloadDirectTxt = () => {
    if (!gravelResult) return;
    const lines = [
      "============================================================",
      "             CALCPLATFORM GRAVEL TAKEOFF SHEET              ",
      "============================================================",
      `Date / Time : ${new Date().toLocaleString()}`,
      `Shape       : ${shape.toUpperCase()}`,
      shape === "circle" ? `Diameter    : ${diameter} ${diameterUnit}` : `Dimensions  : ${length} ${lengthUnit} × ${width} ${widthUnit}`,
      `Quantity    : ${quantity}`,
      `Layer Depth : ${depth} ${depthUnit} (${gravelResult.depthInches} in / ${gravelResult.depthCm} cm)`,
      `Material    : ${GRAVEL_TYPES[gravelType].name}`,
      `Density     : ${GRAVEL_TYPES[gravelType].tonsPerCubicYard} tons/yd³ (${GRAVEL_TYPES[gravelType].lbsPerCubicYard} lbs/yd³)`,
      `Compaction  : +${compactionPct}% settling`,
      `Waste       : +${wastePct}% allowance`,
      "------------------------------------------------------------",
      "                     PRIMARY RESULTS                        ",
      "------------------------------------------------------------",
      `Surface Area      : ${gravelResult.areaSqFt} sq ft (${gravelResult.areaSqM} m²)`,
      `Net Volume        : ${gravelResult.netVolumeCuYards} yd³ (${gravelResult.netVolumeCuMeters} m³)`,
      `Compacted Volume  : ${gravelResult.adjustedVolumeCuYards} yd³ (${gravelResult.adjustedVolumeCuMeters} m³)`,
      `Total Weight      : ${gravelResult.weightShortTons} Short Tons (${gravelResult.weightMetricTonnes} Tonnes)`,
      `Weight in Pounds  : ${gravelResult.weightLbs.toLocaleString()} lbs`,
      `50-lb Bags        : ${gravelResult.bags50lb} Bags`,
      `10-Ton Truckloads : ${gravelResult.truckLoads10Ton} Loads`,
      gravelResult.estimatedCost > 0 ? `Estimated Cost    : $${gravelResult.estimatedCost.toFixed(2)}` : "",
      "============================================================",
      "Civil Engineering Note: Always compact subgrade thoroughly  ",
      "and separate native soil with geotextile fabric.            ",
      "============================================================",
    ].filter(Boolean).join("\n");
    const blob = new Blob([lines], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gravel_takeoff_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("TXT Report Downloaded!");
  };

  // Report Data for Modal
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];
    if (gravelResult) {
      sections.push({
        title: "Gravel Tonnage & Volume Takeoff",
        items: [
          { label: "Quantity", value: `${gravelResult.quantity} units` },
          { label: "Surface Coverage Area", value: `${gravelResult.areaSqFt} sq ft (${gravelResult.areaSqM} m²)` },
          { label: "Gravel Layer Depth", value: `${gravelResult.depthInches} inches (${gravelResult.depthCm} cm)` },
          { label: "Net Volume", value: `${gravelResult.netVolumeCuYards} yd³ (${gravelResult.netVolumeCuMeters} m³)` },
          { label: "Compacted Volume (+comp/waste)", value: `${gravelResult.adjustedVolumeCuYards} yd³ (${gravelResult.adjustedVolumeCuMeters} m³)` },
          { label: "Total Weight (Short Tons)", value: `${gravelResult.weightShortTons} Tons (${gravelResult.weightLbs.toLocaleString()} lbs)` },
          { label: "Total Weight (SI Metric)", value: `${gravelResult.weightMetricTonnes} Tonnes (${gravelResult.weightKg.toLocaleString()} kg)` },
          { label: "Application Density", value: `${gravelResult.applicationRateKgPerM2} kg/m²` },
          { label: "50-lb Bags Equivalent", value: `${gravelResult.bags50lb} Bags` },
          { label: "10-Ton Dumptruck Loads", value: `${gravelResult.truckLoads10Ton} Loads` },
          { label: "Material Cost", value: `$${gravelResult.estimatedCost.toFixed(2)}` },
        ],
      });
    }

    if (multiResult) {
      sections.push({
        title: "Multi-Zone Master Project Summary",
        items: [
          { label: "Total Project Area", value: `${multiResult.totalSqFt} sq ft (${multiResult.totalSqM} m² across ${zones.length} zones)` },
          { label: "Total Master Volume", value: `${multiResult.totalCuYards} cu yd (${multiResult.totalCuMeters} m³)` },
          { label: "Total Master Weight", value: `${multiResult.totalShortTons} Tons (${multiResult.totalMetricTonnes} Tonnes)` },
          { label: "Average Application Rate", value: `${multiResult.avgApplicationRateKgPerM2} kg/m²` },
          { label: "Estimated Quarry Investment", value: `$${multiResult.grandTotalCost.toLocaleString()}` },
        ],
      });
    }

    if (trenchResult) {
      sections.push({
        title: "French Drain & Trench Takeoff",
        items: [
          { label: "Trench Dimensions", value: `${trenchResult.trenchLengthFt} ft L × ${trenchWidth}\" W × ${trenchDepth}\" D` },
          { label: "Net Gravel Required", value: `${trenchResult.netGravelCuYards} yd³ (${trenchResult.gravelWeightShortTons} Tons / ${trenchResult.gravelWeightMetricTonnes} Tonnes)` },
          { label: "Pipe Displacement Offset", value: `${trenchResult.pipeDisplacementCuYards} yd³ (${pipeDiameter === 0 ? "No Pipe" : `${pipeDiameter}\" pipe`})` },
          { label: "Geotextile Fabric Required", value: `${trenchResult.fabricAreaSqFt} sq ft (${trenchResult.fabricAreaSqM} m²)` },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Gravel Calculator",
        reportTitle: "Gravel Material Takeoff & Quarry Order Sheet",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        currencySymbol: "$",
      },
      keyMetrics: [
        { label: "Total Weight Needed", value: gravelResult ? `${gravelResult.weightShortTons} Tons (${gravelResult.weightMetricTonnes} t)` : "—", highlight: true },
        { label: "Adjusted Volume", value: gravelResult ? `${gravelResult.adjustedVolumeCuYards} Cu Yds` : "—" },
        { label: "Estimated Project Cost", value: costResult ? `$${costResult.grandTotalCost.toLocaleString()}` : "—" },
      ],
      sections,
    };
  }, [gravelResult, multiResult, trenchResult, costResult, zones.length, trenchWidth, trenchDepth, pipeDiameter]);

  return (
    <div className="space-y-4">
      {/* ─── Notification Toast Banner ─── */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ═══════════════════ CARD 1: RECTANGULAR, CIRCULAR & TRIANGULAR ESTIMATOR ═══════════════════ */}
      <CardWrapper
        title="Rectangular, Circular &amp; Triangular Gravel Estimator"
        hasResult={!!gravelResult}
        isSaved={gravelSaveSuccess}
        savedCount={savedRecords.length}
        onToggleSaved={() => setIsSavedDrawerOpen(!isSavedDrawerOpen)}
        onSave={() => {
          if (!gravelResult) return;
          saveRecord(
            `${gravelResult.weightShortTons} Tons (${gravelResult.weightMetricTonnes} t), ${gravelResult.adjustedVolumeCuYards} cu yd, Area: ${gravelResult.areaSqFt} sq ft`
          );
          flashSave(setGravelSaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Shape Selector Sub-Tabs */}
          <div className="flex flex-wrap gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800 no-print">
            <button
              type="button"
              id="gravel-shape-rect"
              onClick={() => setShape("rectangle")}
              aria-pressed={shape === "rectangle"}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                shape === "rectangle"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Rectangular / Driveway
            </button>
            <button
              type="button"
              id="gravel-shape-circle"
              onClick={() => setShape("circle")}
              aria-pressed={shape === "circle"}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                shape === "circle"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Circular / Patio
            </button>
            <button
              type="button"
              id="gravel-shape-triangle"
              onClick={() => setShape("triangle")}
              aria-pressed={shape === "triangle"}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                shape === "triangle"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Triangular Area
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Column Inputs */}
            <div className="md:col-span-7 space-y-2.5">
              {shape === "circle" ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label htmlFor="gravel-diameter" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                      Diameter
                    </label>
                    <div className="flex gap-1">
                      <Input
                        id="gravel-diameter"
                        type="number"
                        value={diameter}
                        onChange={(e) => setDiameter(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
                        id="gravel-diameter-unit"
                        aria-label="Diameter unit"
                        value={diameterUnit}
                        onChange={(e) => setDiameterUnit(e.target.value as DimensionUnit)}
                        className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                      >
                        <option value="feet">ft</option>
                        <option value="meters">m</option>
                        <option value="inches">in</option>
                        <option value="yards">yd</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="gravel-quantity" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                      Quantity
                    </label>
                    <Input
                      id="gravel-quantity"
                      type="number"
                      min={1}
                      step={1}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label htmlFor="gravel-length" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                      {shape === "triangle" ? "Base Length" : "Length"}
                    </label>
                    <div className="flex gap-1">
                      <Input
                        id="gravel-length"
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
                        id="gravel-length-unit"
                        aria-label="Length unit"
                        value={lengthUnit}
                        onChange={(e) => setLengthUnit(e.target.value as DimensionUnit)}
                        className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                      >
                        <option value="feet">ft</option>
                        <option value="meters">m</option>
                        <option value="inches">in</option>
                        <option value="yards">yd</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="gravel-width" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                      {shape === "triangle" ? "Perp. Height" : "Width"}
                    </label>
                    <div className="flex gap-1">
                      <Input
                        id="gravel-width"
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
                        id="gravel-width-unit"
                        aria-label="Width unit"
                        value={widthUnit}
                        onChange={(e) => setWidthUnit(e.target.value as DimensionUnit)}
                        className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                      >
                        <option value="feet">ft</option>
                        <option value="meters">m</option>
                        <option value="inches">in</option>
                        <option value="yards">yd</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="gravel-quantity" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                      Quantity
                    </label>
                    <Input
                      id="gravel-quantity"
                      type="number"
                      min={1}
                      step={1}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>
                </div>
              )}

              {/* Depth & Gravel Material Type */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label htmlFor="gravel-depth" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                    Gravel Layer Depth
                  </label>
                  <div className="flex gap-1">
                    <Input
                      id="gravel-depth"
                      type="number"
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      step={0.5}
                      min={0}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <select
                      id="gravel-depth-unit"
                      aria-label="Depth unit"
                      value={depthUnit}
                      onChange={(e) => setDepthUnit(e.target.value as DepthUnit)}
                      className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                    >
                      <option value="inches">inches</option>
                      <option value="centimeters">cm</option>
                      <option value="feet">feet</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="gravel-type" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                    Gravel / Aggregate Type
                  </label>
                  <select
                    id="gravel-type"
                    value={gravelType}
                    onChange={(e) => {
                      const t = e.target.value as GravelType;
                      setGravelType(t);
                      setCompactionPct(String(GRAVEL_TYPES[t].defaultCompactionPct));
                    }}
                    className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
                  >
                    <option value="crushed_stone_57">#57 Crushed Stone 3/4&quot; (1.42 tons/yd³)</option>
                    <option value="crusher_run">Crusher Run / Road Base (1.60 tons/yd³)</option>
                    <option value="pea_gravel">Pea Gravel 3/8&quot; (1.39 tons/yd³)</option>
                    <option value="river_rock">River Rock 1&quot;-3&quot; (1.50 tons/yd³)</option>
                    <option value="decomposed_granite">Decomposed Granite (1.45 tons/yd³)</option>
                    <option value="crushed_stone_411">#411 Stone with Dust (1.55 tons/yd³)</option>
                  </select>
                </div>
              </div>

              {/* Compaction % & Waste % */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label htmlFor="gravel-compaction" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block">
                    Compaction / Settling (%)
                  </label>
                  <div className="flex gap-1 items-center">
                    <Input
                      id="gravel-compaction"
                      type="number"
                      min={0}
                      value={compactionPct}
                      onChange={(e) => setCompactionPct(e.target.value)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <span className="text-xs text-zinc-500 font-medium">%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="gravel-waste" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block">
                    Waste Allowance (%)
                  </label>
                  <div className="flex gap-1 items-center">
                    <Input
                      id="gravel-waste"
                      type="number"
                      min={0}
                      value={wastePct}
                      onChange={(e) => setWastePct(e.target.value)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <span className="text-xs text-zinc-500 font-medium">%</span>
                  </div>
                </div>
              </div>

              {/* Pricing (Optional) */}
              <div className="grid grid-cols-12 gap-2 items-center text-xs pt-1">
                <label htmlFor="gravel-price" className="col-span-4 font-medium text-zinc-700 dark:text-zinc-300">
                  Unit Price (optional)
                </label>
                <div className="col-span-4">
                  <Input
                    id="gravel-price"
                    type="number"
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(e.target.value)}
                    placeholder="$0.00"
                    min={0}
                    step={1}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
                <div className="col-span-4">
                  <select
                    id="gravel-pricing-type"
                    aria-label="Pricing unit basis"
                    value={pricingType}
                    onChange={(e) => setPricingType(e.target.value as any)}
                    className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                  >
                    <option value="per_ton">per Short Ton</option>
                    <option value="per_yard">per Cubic Yard</option>
                    <option value="per_bag">per 50-lb Bag</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-1 no-print">
                <Button
                  onClick={handleGravelCalc}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
                >
                  Calculate Gravel
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setLength("30");
                    setWidth("10");
                    setDiameter("16");
                    setQuantity("1");
                    setDepth("4");
                    setCompactionPct("8");
                    setWastePct("5");
                  }}
                  className="text-xs font-semibold h-8 px-3 cursor-pointer"
                >
                  Clear
                </Button>
              </div>
            </div>

            {/* Right: Live Parametric Scaled Visualizer */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                {shape === "circle" ? "CIRCULAR PATIO GEOMETRY" : shape === "triangle" ? "TRIANGULAR AREA GEOMETRY" : "SUB-BASE LAYER CROSS-SECTION"}
              </span>
              <GravelShapeVisualizer2D
                shape={shape}
                length={Number(length) || 30}
                lengthUnit={lengthUnit}
                width={Number(width) || 10}
                widthUnit={widthUnit}
                diameter={Number(diameter) || 16}
                diameterUnit={diameterUnit}
                depthInches={gravelResult ? gravelResult.depthInches : 4}
                depthCm={gravelResult ? gravelResult.depthCm : 10.2}
                gravelName={GRAVEL_TYPES[gravelType].name}
                areaSqFt={gravelResult ? gravelResult.areaSqFt : 300}
                quantity={Number(quantity) || 1}
              />
            </div>
          </div>

          {/* Results Metric Cards (With Dual SI / Metric & Imperial Units) */}
          {gravelResult && (
            <div className="space-y-2 pt-2" aria-live="polite">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Total Weight (Tonnage)</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {gravelResult.weightShortTons}{" "}
                    <span className="text-xs font-normal">Tons</span>
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    {gravelResult.weightMetricTonnes} Tonnes ({gravelResult.weightKg.toLocaleString()} kg)
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Adjusted Volume</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {gravelResult.adjustedVolumeCuYards}{" "}
                    <span className="text-xs font-normal">yd³</span>
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">
                    ({gravelResult.adjustedVolumeCuMeters} m³ / {gravelResult.adjustedVolumeCuFt} ft³)
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">50-lb Bag Equivalent</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {gravelResult.bags50lb}{" "}
                    <span className="text-xs font-normal">Bags</span>
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">
                    (or {gravelResult.truckLoads10Ton} × 10-ton dump truck loads)
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Application Density</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {gravelResult.applicationRateKgPerM2}{" "}
                    <span className="text-xs font-normal">kg/m²</span>
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">
                    ({gravelResult.areaSqM} m² / {gravelResult.areaSqFt} sq ft)
                  </span>
                </div>
              </div>

              {/* Summary Banner */}
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700 text-[11px] font-sans flex flex-wrap items-center justify-between gap-2">
                <span>• Material: <strong>{GRAVEL_TYPES[gravelType].name}</strong></span>
                <span>• Quantity: <strong>{gravelResult.quantity} unit{gravelResult.quantity > 1 ? "s" : ""}</strong></span>
                <span>• Compaction factored in: <strong>+{compactionPct}% settling</strong></span>
                {gravelResult.estimatedCost > 0 && (
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    • Estimated Material Cost: ${gravelResult.estimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                )}
              </div>

              {/* Quick Actions Toolbar */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1.5 no-print">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyResultText}
                  className="h-7 text-xs gap-1 cursor-pointer font-medium"
                  aria-label="Copy primary result to clipboard"
                >
                  <Copy className="w-3 h-3 text-blue-500" /> Copy Result
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copySummaryText}
                  className="h-7 text-xs gap-1 cursor-pointer font-medium"
                  aria-label="Copy complete calculation summary"
                >
                  <FileText className="w-3 h-3 text-blue-500" /> Copy Summary
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyLatexFormula}
                  className="h-7 text-xs gap-1 cursor-pointer font-medium"
                  aria-label="Copy calculation formula in LaTeX"
                >
                  <Code2 className="w-3 h-3 text-purple-500" /> Copy LaTeX
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportDirectCsv}
                  className="h-7 text-xs gap-1 cursor-pointer font-medium"
                  aria-label="Download calculation as CSV"
                >
                  <Download className="w-3 h-3 text-emerald-500" /> Export CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadDirectTxt}
                  className="h-7 text-xs gap-1 cursor-pointer font-medium"
                  aria-label="Download calculation as TXT sheet"
                >
                  <FileSpreadsheet className="w-3 h-3 text-amber-500" /> Download TXT
                </Button>
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          saved={savedRecords}
          isOpen={isSavedDrawerOpen}
          remove={removeSavedRecord}
          clear={clearSavedRecords}
          restore={restoreSavedRecord}
          cardTitle="Gravel Estimator"
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: GRAVEL COST & DELIVERY BUDGET ═══════════════════ */}
      <CardWrapper
        title="Gravel Cost &amp; Delivery Freight Budget Calculator"
        hasResult={!!costResult}
        isSaved={costSaveSuccess}
        savedCount={savedRecords.length}
        onToggleSaved={() => setIsSavedDrawerOpen(!isSavedDrawerOpen)}
        onSave={() => {
          if (!costResult) return;
          saveRecord(
            `${costTons} Tons: Total $${costResult.grandTotalCost} ($${costResult.costPerSqFt}/sq ft)`
          );
          flashSave(setCostSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <div>
                <label htmlFor="gravel-cost-tons" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Total Tons Needed</label>
                <Input
                  id="gravel-cost-tons"
                  type="number"
                  value={costTons}
                  onChange={(e) => setCostTons(e.target.value)}
                  min={0}
                  step={0.5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="gravel-material-price" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Quarry Price ($/ton)</label>
                <Input
                  id="gravel-material-price"
                  type="number"
                  value={materialUnitPrice}
                  onChange={(e) => setMaterialUnitPrice(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="gravel-delivery-fee" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Delivery Fee ($)</label>
                <Input
                  id="gravel-delivery-fee"
                  type="number"
                  value={deliveryFlatFee}
                  onChange={(e) => setDeliveryFlatFee(e.target.value)}
                  min={0}
                  step={5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="gravel-labor-cost" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Spreading Labor ($/ton)</label>
                <Input
                  id="gravel-labor-cost"
                  type="number"
                  value={laborCostPerTon}
                  onChange={(e) => setLaborCostPerTon(e.target.value)}
                  min={0}
                  step={5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="gravel-sales-tax" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Sales Tax (%)</label>
                <Input
                  id="gravel-sales-tax"
                  type="number"
                  value={salesTaxPct}
                  onChange={(e) => setSalesTaxPct(e.target.value)}
                  min={0}
                  step={0.5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 no-print">
            <Button
              onClick={handleCostCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Project Budget
            </Button>
          </div>

          {costResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800" aria-live="polite">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] font-sans tabular-nums border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700 text-zinc-500 font-semibold">
                      <th className="py-1">Line Item Description</th>
                      <th className="py-1">Rate Basis</th>
                      <th className="py-1 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">Gravel / Aggregate Material</td>
                      <td className="py-1">{costTons} Tons @ ${materialUnitPrice}/ton</td>
                      <td className="py-1 text-right font-semibold">${costResult.materialSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">Dump Truck Freight &amp; Delivery</td>
                      <td className="py-1">Flat Delivery Fee</td>
                      <td className="py-1 text-right font-semibold">${costResult.deliveryFee.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">Spreading / Grading Labor</td>
                      <td className="py-1">{costTons} Tons @ ${laborCostPerTon}/ton</td>
                      <td className="py-1 text-right font-semibold">${costResult.laborSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr className="text-zinc-600 dark:text-zinc-400">
                      <td colSpan={2} className="py-1">Material Sales Tax ({salesTaxPct}%)</td>
                      <td className="py-1 text-right">${costResult.salesTaxAmount.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-blue-50 dark:bg-blue-950/40 font-bold text-xs">
                      <td colSpan={2} className="py-1.5 text-blue-900 dark:text-blue-100">Estimated Total Investment</td>
                      <td className="py-1.5 text-right text-emerald-600 dark:text-emerald-400 text-sm">
                        ${costResult.grandTotalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-2 bg-blue-50/60 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-blue-900 dark:text-blue-200">Unit Project Cost:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                  ${costResult.costPerSqFt.toFixed(2)} per Square Foot
                </span>
              </div>
            </div>
          )}
        </div>
      </CardWrapper>

      {/* ═══════════════════ CARD 3: MULTI-ZONE MASTER AGGREGATOR ═══════════════════ */}
      <CardWrapper
        title="Multi-Zone Project Master Aggregator &amp; Quarry Order Sheet"
        hasResult={!!multiResult}
        isSaved={multiSaveSuccess}
        savedCount={savedRecords.length}
        onToggleSaved={() => setIsSavedDrawerOpen(!isSavedDrawerOpen)}
        onSave={() => {
          if (!multiResult) return;
          saveRecord(
            `${zones.length} Zones: ${multiResult.totalShortTons} Tons (${multiResult.totalMetricTonnes} t), ${multiResult.totalCuYards} yd³, Total: $${multiResult.grandTotalCost}`
          );
          flashSave(setMultiSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              Project Sections &amp; Zones ({zones.length}):
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={addZoneRow}
              className="text-xs h-7 gap-1 font-semibold text-blue-600 dark:text-blue-400 cursor-pointer no-print"
              aria-label="Add new project zone"
            >
              <Plus className="w-3.5 h-3.5" /> Add Project Zone
            </Button>
          </div>

          {/* Table Column Reference Headers */}
          <div className="grid grid-cols-12 gap-1.5 px-2 py-1.5 bg-blue-50/80 dark:bg-blue-950/40 rounded-md border border-blue-200/70 dark:border-blue-900/50 text-[11px] font-bold text-blue-900 dark:text-blue-200">
            <div className="col-span-3">Zone / Location Name</div>
            <div className="col-span-2">Shape</div>
            <div className="col-span-2">Dim 1 (L / Dia ft)</div>
            <div className="col-span-2">Dim 2 (W ft)</div>
            <div className="col-span-2">Aggregate Type</div>
            <div className="col-span-1 text-right no-print">Del</div>
          </div>

          {/* Dynamic Zone Rows */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 print:max-h-none print:overflow-visible">
            {zones.map((zone, idx) => (
              <div
                key={zone.id}
                className="grid grid-cols-12 gap-1.5 items-center bg-slate-50 dark:bg-zinc-800/40 p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs"
              >
                <div className="col-span-3">
                  <Input
                    id={`zone-name-${idx}`}
                    aria-label={`Zone ${idx + 1} Name`}
                    type="text"
                    value={zone.name}
                    onChange={(e) => updateZoneRow(zone.id, "name", e.target.value)}
                    className="h-7 text-xs bg-white dark:bg-zinc-800"
                    placeholder="Zone Name"
                  />
                </div>
                <div className="col-span-2">
                  <select
                    id={`zone-shape-${idx}`}
                    aria-label={`Zone ${idx + 1} Shape`}
                    value={zone.shape}
                    onChange={(e) => updateZoneRow(zone.id, "shape", e.target.value as GravelShape)}
                    className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                  >
                    <option value="rectangle">Rectangle</option>
                    <option value="circle">Circle</option>
                    <option value="triangle">Triangle</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <Input
                    id={`zone-dim1-${idx}`}
                    aria-label={`Zone ${idx + 1} Length or Diameter`}
                    type="number"
                    value={zone.dim1}
                    onChange={(e) => updateZoneRow(zone.id, "dim1", e.target.value)}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="L (ft)"
                    title="Length or Diameter in feet"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    id={`zone-dim2-${idx}`}
                    aria-label={`Zone ${idx + 1} Width`}
                    type="number"
                    value={zone.dim2}
                    onChange={(e) => updateZoneRow(zone.id, "dim2", e.target.value)}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="W (ft)"
                    title="Width in feet"
                  />
                </div>
                <div className="col-span-2">
                  <select
                    id={`zone-rock-${idx}`}
                    aria-label={`Zone ${idx + 1} Aggregate Type`}
                    value={zone.gravelType}
                    onChange={(e) => updateZoneRow(zone.id, "gravelType", e.target.value as GravelType)}
                    className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300 font-sans"
                  >
                    <option value="crushed_stone_57">#57 Stone</option>
                    <option value="crusher_run">Road Base</option>
                    <option value="pea_gravel">Pea Gravel</option>
                    <option value="river_rock">River Rock</option>
                    <option value="decomposed_granite">DG</option>
                  </select>
                </div>
                <div className="col-span-1 flex justify-end no-print">
                  <button
                    type="button"
                    onClick={() => removeZoneRow(zone.id)}
                    disabled={zones.length <= 1}
                    className="text-zinc-400 hover:text-red-500 disabled:opacity-30 p-1 cursor-pointer"
                    title="Delete Zone"
                    aria-label={`Delete zone ${zone.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-1 no-print">
            <Button
              onClick={handleMultiCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Consolidate Quarry Order
            </Button>
          </div>

          {multiResult && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800" aria-live="polite">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Total Master Weight</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {multiResult.totalShortTons}{" "}
                    <span className="text-xs font-normal">Tons</span>
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    {multiResult.totalMetricTonnes} Tonnes ({multiResult.totalWeightKg.toLocaleString()} kg)
                  </span>
                </div>

                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Total Volume</span>
                  <span className="text-xl font-bold text-blue-900 dark:text-blue-100 font-sans tabular-nums">
                    {multiResult.totalCuYards} cu yd
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">({multiResult.totalCuMeters} m³)</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Total Coverage Area</span>
                  <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {multiResult.totalSqM} m²
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-medium">({multiResult.totalSqFt} sq ft)</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Trucks &amp; Cost</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {multiResult.totalTruckloads} Trucks (~${multiResult.grandTotalCost.toLocaleString()})
                  </span>
                  <span className="text-[10px] text-zinc-400 block">10-Ton Tandem Loads</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardWrapper>

      {/* ═══════════════════ CARD 4: SUB-BASE & DRAINAGE TRENCH ═══════════════════ */}
      <CardWrapper
        title="French Drain &amp; Drainage Trench Gravel Calculator"
        hasResult={!!trenchResult}
        isSaved={trenchSaveSuccess}
        savedCount={savedRecords.length}
        onToggleSaved={() => setIsSavedDrawerOpen(!isSavedDrawerOpen)}
        onSave={() => {
          if (!trenchResult) return;
          saveRecord(
            `Trench: ${trenchLength}ft L × ${trenchWidth}\" W, Gravel: ${trenchResult.gravelWeightShortTons} Tons (${trenchResult.gravelWeightMetricTonnes} t), Fabric: ${trenchResult.fabricAreaSqFt} sq ft`
          );
          flashSave(setTrenchSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Inputs */}
            <div className="md:col-span-7 space-y-2.5">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label htmlFor="gravel-trench-length" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Trench Length (ft)</label>
                  <Input
                    id="gravel-trench-length"
                    type="number"
                    value={trenchLength}
                    onChange={(e) => setTrenchLength(e.target.value)}
                    min={1}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
                <div>
                  <label htmlFor="gravel-trench-width" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Trench Width (in)</label>
                  <Input
                    id="gravel-trench-width"
                    type="number"
                    value={trenchWidth}
                    onChange={(e) => setTrenchWidth(e.target.value)}
                    min={4}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
                <div>
                  <label htmlFor="gravel-trench-depth" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Total Depth (in)</label>
                  <Input
                    id="gravel-trench-depth"
                    type="number"
                    value={trenchDepth}
                    onChange={(e) => setTrenchDepth(e.target.value)}
                    min={6}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="gravel-pipe-dia" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Drain Pipe Diameter</label>
                  <select
                    id="gravel-pipe-dia"
                    value={pipeDiameter}
                    onChange={(e) => setPipeDiameter(Number(e.target.value))}
                    className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
                  >
                    <option value={4}>4&quot; Perforated Corrugated Pipe (Standard)</option>
                    <option value={6}>6&quot; Heavy Drainage Pipe</option>
                    <option value={0}>No Pipe (Gravel Only Swale / French Ditch)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="gravel-trench-rock" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Drainage Rock Type</label>
                  <select
                    id="gravel-trench-rock"
                    value={trenchGravelType}
                    onChange={(e) => setTrenchGravelType(e.target.value as GravelType)}
                    className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
                  >
                    <option value="crushed_stone_57">#57 Washed Crushed Stone (3/4&quot;)</option>
                    <option value="river_rock">River Rock (1&quot;–2&quot; Smooth)</option>
                    <option value="pea_gravel">Pea Gravel (3/8&quot;)</option>
                  </select>
                </div>
              </div>

              {/* Validation Alert if Geometry is impossible */}
              {trenchResult && !trenchResult.isValidGeometry && (
                <div role="alert" className="p-2 bg-red-50 dark:bg-red-950/40 rounded border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-1.5 font-semibold">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{trenchResult.validationError}</span>
                </div>
              )}

              <div className="flex gap-2 pt-1 no-print">
                <Button
                  onClick={handleTrenchCalc}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
                >
                  Calculate Trench Gravel &amp; Fabric
                </Button>
              </div>
            </div>

            {/* Right: Parametric 2D French Drain Diagram */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                FRENCH DRAIN CROSS-SECTION
              </span>
              <FrenchDrainVisualizer2D
                lengthFt={Number(trenchLength) || 50}
                widthIn={Number(trenchWidth) || 12}
                depthIn={Number(trenchDepth) || 18}
                pipeDiaIn={pipeDiameter}
                netTons={trenchResult ? trenchResult.gravelWeightShortTons : 2.5}
                isValidGeometry={trenchResult ? trenchResult.isValidGeometry : true}
                validationError={trenchResult?.validationError}
              />
            </div>
          </div>

          {/* Results Metric Cards */}
          {trenchResult && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800" aria-live="polite">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Gravel Weight</span>
                  <span className="text-xl font-bold text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {trenchResult.gravelWeightShortTons} Tons
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    ({trenchResult.gravelWeightMetricTonnes} Tonnes / {trenchResult.gravelWeightKg.toLocaleString()} kg)
                  </span>
                </div>

                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Net Gravel Volume</span>
                  <span className="text-xl font-bold text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {trenchResult.netGravelCuYards} yd³
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">({trenchResult.netGravelCuMeters} m³)</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Geotextile Fabric</span>
                  <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {trenchResult.fabricAreaSqFt} sq ft
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-medium">({trenchResult.fabricAreaSqM} m²)</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Bag Equivalent</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {trenchResult.bags50lb} Bags
                  </span>
                  <span className="text-[10px] text-zinc-400 block">(50-lb bags)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1 no-print">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
          aria-label="Generate full quarry order report"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Quarry Order Report
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
