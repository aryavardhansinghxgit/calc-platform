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

// ─── Local Storage Hook ─────────────────────────────────────────────────────

interface SavedMulchEstimate<T> {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: T;
  notes: string;
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
    (inputSummary: string, result: T, notes = "") => {
      const entry: SavedMulchEstimate<T> = {
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

function SavedEstimatesDrawer<T>({
  saved,
  isOpen,
  remove,
  clear,
  cardTitle,
  formatSummary,
}: {
  saved: SavedMulchEstimate<T>[];
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
    a.download = `mulch_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_estimates.csv`;
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
        aria-label="2D Mulch Bed Cross Section"
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
        <rect x="0" y="0" width="240" height="40" fill="#e0f2fe" dark-fill="#1e293b" />

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
        <rect x="160" y={35 + mulchH / 2} width="65" height="20" rx="3" fill="#0f172a" fillOpacity="0.9" />
        <text x="192.5" y={48.5 + mulchH / 2} textAnchor="middle" className="text-[8.5px] fill-white font-bold">
          {depthInches}&quot; ({depthCm} cm)
        </text>

        {/* Soil Label */}
        <text x="25" y="125" className="text-[8px] fill-zinc-300 font-semibold tracking-wider">
          TOPSOIL BED
        </text>
      </svg>
    </div>
  );
}

// ─── 2D Tree Ring & Safety Visualizer ────────────────────────────────────────

function TreeRingVisualizer2D({
  mode,
  outerDiaFt,
  innerDiaFt,
  safetyStatus,
}: {
  mode: "full_circle" | "tree_ring";
  outerDiaFt: number;
  innerDiaFt: number;
  safetyStatus: "safe_donut" | "volcano_hazard";
}) {
  return (
    <div className="w-full flex flex-col items-center select-none">
      <svg
        viewBox="0 0 240 140"
        className="w-full max-w-[220px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 shadow-xs"
        aria-label="2D Tree Ring Visualizer"
      >
        <rect width="240" height="140" fill="#f1f5f9" dark-fill="#18181b" />

        {/* Outer Mulch Ring */}
        <circle cx="120" cy="70" r="55" fill="#78350f" stroke="#451a03" strokeWidth="2" strokeDasharray="3 2" />

        {/* Inner Trunk / Safety Zone */}
        {mode === "tree_ring" ? (
          <>
            {/* Bare Gap / Root Flare Zone */}
            <circle cx="120" cy="70" r="22" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            {/* Tree Trunk Base */}
            <circle cx="120" cy="70" r="12" fill="#3f2e1e" stroke="#1c1917" strokeWidth="2" />
            <text x="120" y="73" textAnchor="middle" className="text-[7.5px] fill-white font-bold">
              TRUNK
            </text>
          </>
        ) : (
          <circle cx="120" cy="70" r="5" fill="#15803d" />
        )}

        {/* Safety Badge */}
        <rect x="15" y="112" width="210" height="20" rx="4" fill={safetyStatus === "safe_donut" ? "#166534" : "#991b1b"} />
        <text x="120" y="125" textAnchor="middle" className="text-[8.5px] fill-white font-bold">
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

  const [rectResult, setRectResult] = useState<RectangularMulchResult | null>(null);
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

  const [circResult, setCircResult] = useState<CircularMulchResult | null>(null);
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

  const [multiResult, setMultiResult] = useState<MultiBedResult | null>(null);
  const [multiSaveSuccess, setMultiSaveSuccess] = useState(false);
  const multiSaved = useCardSaved<MultiBedResult>("saved_mulch_multibed");

  // ─── CARD 4: MULCH WEIGHT & TRUCK LOAD ESTIMATOR ───
  const [truckYards, setTruckYards] = useState("4.5");
  const [truckMulchType, setTruckMulchType] = useState<MulchType>("hardwood_bark");
  const [vehicleType, setVehicleType] = useState<VehicleType>("halfton_truck");

  const [truckResult, setTruckResult] = useState<TruckLoadResult | null>(null);
  const [truckSaveSuccess, setTruckSaveSuccess] = useState(false);
  const truckSaved = useCardSaved<TruckLoadResult>("saved_mulch_truck");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // ─── Calculation Handlers ───

  const handleRectCalc = useCallback(() => {
    const res = calculateRectangularMulch({
      inputMode: rectInputMode,
      length: Number(rectLength) || 20,
      lengthUnit: rectLengthUnit,
      width: Number(rectWidth) || 10,
      widthUnit: rectWidthUnit,
      totalAreaSqFt: Number(rectTotalArea) || 200,
      depth: Number(rectDepth) || 3,
      depthUnit: rectDepthUnit,
      mulchType: rectMulchType,
      pricePerBag: Number(rectPricePerBag) || 0,
      bagSizeCuFt: rectBagSizeCuFt,
      pricePerCubicYard: Number(rectPricePerYard) || 0,
      pricingType: rectPricingType,
    });
    setRectResult(res);
    setTruckYards(String(res.volumeCuYards));
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
    const res = calculateCircularMulch({
      mode: circMode,
      outerDiameter: Number(circOuterDia) || 8,
      outerDiameterUnit: circOuterDiaUnit,
      innerDiameter: Number(circInnerDia) || 1.5,
      innerDiameterUnit: circInnerDiaUnit,
      depthInches: Number(circDepth) || 3,
      mulchType: circMulchType,
      pricePerBag: Number(circPricePerBag) || 0,
    });
    setCircResult(res);
  }, [circMode, circOuterDia, circOuterDiaUnit, circInnerDia, circInnerDiaUnit, circDepth, circMulchType, circPricePerBag]);

  const handleMultiCalc = useCallback(() => {
    const res = calculateMultiBedLandscape({
      beds,
      mulchType: multiMulchType,
      bagCost: Number(multiBagCost) || 4,
      bulkCostPerYard: Number(multiBulkCost) || 36,
      deliveryFee: Number(multiDeliveryFee) || 45,
    });
    setMultiResult(res);
  }, [beds, multiMulchType, multiBagCost, multiBulkCost, multiDeliveryFee]);

  const handleTruckCalc = useCallback(() => {
    const res = calculateTruckLoads({
      totalCubicYards: Number(truckYards) || 3,
      mulchType: truckMulchType,
      vehicleType,
    });
    setTruckResult(res);
  }, [truckYards, truckMulchType, vehicleType]);

  // Reactive Calculation on state changes
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
          { label: "Standard Pickup Loads", value: `${rectResult.truckLoadsStandard} Loads (~2 yds/truck)` },
          { label: "Estimated Material Cost", value: `$${rectResult.estimatedCost.toFixed(2)}` },
        ],
      });
    }

    if (multiResult) {
      sections.push({
        title: "Landscape Master Aggregator & Price Comparison",
        items: [
          { label: "Combined Bed Area", value: `${multiResult.totalSqFt} sq ft (${multiResult.totalSqM} m² across ${beds.length} beds)` },
          { label: "Total Volume", value: `${multiResult.totalCuYards} cu yd (${multiResult.totalCuMeters} m³ / ${multiResult.totalLiters} L)` },
          { label: "Total Landscape Weight", value: `${multiResult.totalWeightLbs.toLocaleString()} lbs (${multiResult.totalWeightKg.toLocaleString()} kg / ${multiResult.totalWeightMetricTonnes} t)` },
          { label: "Average Application Rate", value: `${multiResult.avgApplicationRateKgPerM2} kg/m²` },
          { label: "Bagged Mulch Total", value: `$${multiResult.baggedTotalCost}` },
          { label: "Bulk Delivery Total", value: `$${multiResult.bulkTotalCost}` },
          { label: "Best Value Option", value: multiResult.recommendedOption === "buy_bulk" ? "Bulk Scoop Delivery (Saves Money)" : "Bagged Mulch at Store" },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Mulch Calculator",
        reportTitle: "Mulch Material Takeoff & Nursery Shopping List",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        currencySymbol: "$",
      },
      keyMetrics: [
        { label: "Total Volume", value: rectResult ? `${rectResult.volumeCuYards} Cu Yds (${rectResult.volumeCuMeters} m³)` : "—", highlight: true },
        { label: "2.0 Cu Ft Bags", value: rectResult ? `${rectResult.bags2_0CuFt} Bags` : "—" },
        { label: "Total Weight", value: rectResult ? `${rectResult.totalWeightKg.toLocaleString()} kg (${rectResult.totalWeightLbs.toLocaleString()} lbs)` : "—" },
      ],
      sections,
    };
  }, [rectResult, multiResult, beds.length]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ CARD 1: RECTANGULAR & SQUARE BED ═══════════════════ */}
      <CardWrapper
        title="Rectangular &amp; Square Landscape Bed Calculator"
        hasResult={!!rectResult}
        isSaved={rectSaveSuccess}
        savedCount={rectSaved.saved.length}
        onToggleSaved={() => rectSaved.setIsOpen(!rectSaved.isOpen)}
        onSave={() => {
          if (!rectResult) return;
          rectSaved.save(
            `${rectResult.volumeCuYards} cu yd (${rectResult.volumeCuMeters} m³), ${rectResult.totalWeightKg} kg, Area: ${rectResult.areaSqM} m²`,
            rectResult
          );
          flashSave(setRectSaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Sub-Tabs: Dimensions vs Total Area */}
          <div className="flex gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800">
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
                    <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Bed Length</label>
                    <div className="flex gap-1">
                      <Input
                        type="number"
                        value={rectLength}
                        onChange={(e) => setRectLength(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
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
                    <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Bed Width</label>
                    <div className="flex gap-1">
                      <Input
                        type="number"
                        value={rectWidth}
                        onChange={(e) => setRectWidth(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
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
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Total Surface Area (sq ft)</label>
                  <Input
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
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Mulch Layer Depth</label>
                  <div className="flex gap-1">
                    <Input
                      type="number"
                      value={rectDepth}
                      onChange={(e) => setRectDepth(e.target.value)}
                      step={0.5}
                      min={0.5}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <select
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
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Mulch Material Type</label>
                  <select
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
                <label className="col-span-4 font-medium text-zinc-700 dark:text-zinc-300">
                  Price per Unit (optional)
                </label>
                <div className="col-span-4">
                  <Input
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
                    value={rectPricingType}
                    onChange={(e) => setRectPricingType(e.target.value as any)}
                    className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                  >
                    <option value="per_bag">per 2-cu-ft bag</option>
                    <option value="per_yard">per cubic yard</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
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

          {/* Results Metric Cards (With Prominent SI Units) */}
          {rectResult && (
            <div className="space-y-2 pt-2">
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

              {/* SI Units & Dual Metric Summary Banner */}
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
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...rectSaved}
          cardTitle="Rectangular Bed"
          formatSummary={(r) => `${r.volumeCuMeters} m³ (${r.volumeCuYards} yd³), ${r.totalWeightKg} kg (${r.applicationRateKgPerM2} kg/m²)`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: CIRCULAR & TREE RING BED ═══════════════════ */}
      <CardWrapper
        title="Circular &amp; Tree Ring / Donut Bed Calculator"
        hasResult={!!circResult}
        isSaved={circSaveSuccess}
        savedCount={circSaved.saved.length}
        onToggleSaved={() => circSaved.setIsOpen(!circSaved.isOpen)}
        onSave={() => {
          if (!circResult) return;
          circSaved.save(
            `${circResult.volumeCuMeters} m³ (${circResult.volumeCuYards} yd³), ${circResult.weightKg} kg (${circResult.applicationRateKgPerM2} kg/m²)`,
            circResult
          );
          flashSave(setCircSaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Mode Switch: Full Circle vs Tree Ring Donut */}
          <div className="flex gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800">
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
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Outer Diameter</label>
                  <div className="flex gap-1">
                    <Input
                      type="number"
                      value={circOuterDia}
                      onChange={(e) => setCircOuterDia(e.target.value)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <select
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
                    <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Tree Trunk Diameter</label>
                    <div className="flex gap-1">
                      <Input
                        type="number"
                        value={circInnerDia}
                        onChange={(e) => setCircInnerDia(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
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
                    <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Mulch Depth (in)</label>
                    <Input
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
                    <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Mulch Layer Depth (in)</label>
                    <Input
                      type="number"
                      value={circDepth}
                      onChange={(e) => setCircDepth(e.target.value)}
                      step={0.5}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Price per Bag ($)</label>
                    <Input
                      type="number"
                      value={circPricePerBag}
                      onChange={(e) => setCircPricePerBag(e.target.value)}
                      step={0.25}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <Button
                  onClick={handleCircCalc}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
                >
                  Calculate Tree Ring
                </Button>
              </div>
            </div>

            {/* Right: 2D Tree Ring Visualizer */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                TREE RING &amp; ROOT FLARE
              </span>
              <TreeRingVisualizer2D
                mode={circMode}
                outerDiaFt={Number(circOuterDia) || 8}
                innerDiaFt={Number(circInnerDia) || 1.5}
                safetyStatus={circResult ? circResult.treeSafetyStatus : "safe_donut"}
              />
            </div>
          </div>

          {/* Results Summary with SI Units */}
          {circResult && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center pt-2">
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
          )}
        </div>

        <SavedEstimatesDrawer
          {...circSaved}
          cardTitle="Circular Bed"
          formatSummary={(r) => `${r.volumeCuMeters} m³ (${r.volumeCuYards} yd³), ${r.weightKg} kg (${r.applicationRateKgPerM2} kg/m²)`}
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
          multiSaved.save(
            `${beds.length} Beds: ${multiResult.totalCuMeters} m³ (${multiResult.totalCuYards} yd³), ${multiResult.totalWeightKg} kg, Total: $${multiResult.baggedTotalCost}`,
            multiResult
          );
          flashSave(setMultiSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              Landscape Bed Sections ({beds.length}):
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={addBedRow}
              className="text-xs h-7 gap-1 font-semibold text-blue-600 dark:text-blue-400 cursor-pointer"
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
            <div className="col-span-1 text-right">Del</div>
          </div>

          {/* Dynamic Bed Rows */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {beds.map((bed) => (
              <div
                key={bed.id}
                className="grid grid-cols-12 gap-1.5 items-center bg-slate-50 dark:bg-zinc-800/40 p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs"
              >
                <div className="col-span-4">
                  <Input
                    type="text"
                    value={bed.name}
                    onChange={(e) => updateBedRow(bed.id, "name", e.target.value)}
                    className="h-7 text-xs bg-white dark:bg-zinc-800"
                    placeholder="e.g. Front Bed"
                  />
                </div>
                <div className="col-span-2">
                  <select
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
                  <Input
                    type="number"
                    value={bed.dim1}
                    onChange={(e) => updateBedRow(bed.id, "dim1", Number(e.target.value))}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="L (ft)"
                    title="Length or Outer Diameter in feet"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={bed.dim2}
                    onChange={(e) => updateBedRow(bed.id, "dim2", Number(e.target.value))}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="W (ft)"
                    title="Width or Inner Trunk Diameter in feet"
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    type="number"
                    value={bed.depthInches}
                    onChange={(e) => updateBedRow(bed.id, "depthInches", Number(e.target.value))}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="in"
                    title="Mulch Depth in inches"
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeBedRow(bed.id)}
                    disabled={beds.length <= 1}
                    className="text-zinc-400 hover:text-red-500 disabled:opacity-30 p-1 cursor-pointer"
                    title="Delete Bed"
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
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Bag Price ($/2 cu ft bag)</label>
                <Input
                  type="number"
                  value={multiBagCost}
                  onChange={(e) => setMultiBagCost(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Bulk Price ($/cu yd)</label>
                <Input
                  type="number"
                  value={multiBulkCost}
                  onChange={(e) => setMultiBulkCost(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Bulk Delivery Fee ($)</label>
                <Input
                  type="number"
                  value={multiDeliveryFee}
                  onChange={(e) => setMultiDeliveryFee(e.target.value)}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              onClick={handleMultiCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Aggregate All Beds
            </Button>
          </div>

          {multiResult && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
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
                    Bagged Total: <strong>${multiResult.baggedTotalCost}</strong> | Bulk Delivery Total: <strong>${multiResult.bulkTotalCost}</strong>
                  </span>
                </div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Recommendation: {multiResult.recommendedOption === "buy_bulk" ? "Buy Bulk Delivery (Save $" + multiResult.costDifference + ")" : "Buy Bags at Store (Save $" + multiResult.costDifference + ")"}
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...multiSaved}
          cardTitle="Multi-Bed"
          formatSummary={(r) => `${r.totalCuMeters} m³ (${r.totalCuYards} yd³), ${r.totalWeightKg} kg across ${beds.length} beds`}
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
          truckSaved.save(
            `${truckYards} cu yds = ${truckResult.totalWeightKg.toLocaleString()} kg (${truckResult.totalWeightLbs.toLocaleString()} lbs), ${truckResult.tripsRecommended} Trips`,
            truckResult
          );
          flashSave(setTruckSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Total Volume to Haul (yd³):
              </label>
              <Input
                type="number"
                value={truckYards}
                onChange={(e) => setTruckYards(e.target.value)}
                min={0.5}
                step={0.5}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>

            <div>
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Mulch Material Type:
              </label>
              <select
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
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Hauling Vehicle / Trailer:
              </label>
              <select
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

          <div className="flex gap-2">
            <Button
              onClick={handleTruckCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Truck Loads
            </Button>
          </div>

          {truckResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
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
                    {truckResult.tripsNeededByVolume} Trips
                  </span>
                  <span className="text-[10px] text-zinc-400 block">(@{truckResult.maxCubicMetersPerTrip} m³/bed)</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Trips by Weight Limit</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {truckResult.tripsNeededByWeight} Trips
                  </span>
                  <span className="text-[10px] text-zinc-400 block">(@{truckResult.maxPayloadKg.toLocaleString()} kg max)</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Recommended Trips</span>
                  <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                    {truckResult.tripsRecommended} Trips
                  </span>
                  <span className="text-[10px] text-zinc-400 block">Safe Capacity</span>
                </div>
              </div>

              {/* Safety Status Banner */}
              <div
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
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  )}
                  <span>
                    Payload Capacity: {truckResult.weightUtilizationPercent}% ({truckResult.safetyStatus.toUpperCase()})
                  </span>
                </div>
                <span className="text-[11px]">
                  Vehicle Limit: {truckResult.maxPayloadKg.toLocaleString()} kg ({truckResult.maxPayloadLbs.toLocaleString()} lbs) per trip
                </span>
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...truckSaved}
          cardTitle="Truck Payload"
          formatSummary={(r) => `${r.totalWeightKg.toLocaleString()} kg (${r.totalWeightLbs.toLocaleString()} lbs), ${r.tripsRecommended} Trips in ${r.vehicleName}`}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
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
